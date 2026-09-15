'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createAdminClient } from '@/lib/supabase-admin';
import { getSessionToken } from '@/lib/admin-auth';

async function checkAdminAuth(): Promise<boolean> {
  const jar = await cookies();
  return jar.get('admin_session')?.value === getSessionToken();
}

export async function loginAction(formData: FormData) {
  const password = formData.get('password') as string;
  if (password !== process.env.ADMIN_PASSWORD) {
    redirect('/admin?error=1');
  }
  const jar = await cookies();
  jar.set('admin_session', getSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });
  redirect('/admin');
}

export async function logoutAdmin() {
  const jar = await cookies();
  jar.delete('admin_session');
  redirect('/admin');
}

function generateSlug(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  const suffix = Math.random().toString(16).slice(2, 6);
  return `${base}-${suffix}`;
}

export async function uploadWallpaper(
  formData: FormData,
): Promise<{ error?: string; slug?: string; imageUrl?: string }> {
  if (!(await checkAdminAuth())) return { error: 'Unauthorized' };

  const file = formData.get('image') as File | null;
  if (!file || file.size === 0) return { error: 'No image selected' };

  const title = (formData.get('title') as string)?.trim();
  if (!title) return { error: 'Title is required' };

  const categoryId = formData.get('category_id') as string;
  if (!categoryId) return { error: 'Category is required' };

  const collectionId = (formData.get('collection_id') as string) || null;
  const artistName = (formData.get('artist_name') as string)?.trim() || 'ASPEKT';
  const tagsRaw = (formData.get('tags') as string) || '';
  const tags = tagsRaw
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
  const width = parseInt(formData.get('width') as string) || 1080;
  const height = parseInt(formData.get('height') as string) || 1920;

  const slug = generateSlug(title);
  const ext = (file.name.split('.').pop() ?? 'jpg').toLowerCase();
  const storagePath = `${slug}.${ext}`;

  const admin = createAdminClient();

  const bytes = await file.arrayBuffer();
  const { error: uploadError } = await admin.storage
    .from('wallpapers')
    .upload(storagePath, Buffer.from(bytes), {
      contentType: file.type || 'image/jpeg',
      upsert: false,
    });

  if (uploadError) return { error: `Upload failed: ${uploadError.message}` };

  const {
    data: { publicUrl },
  } = admin.storage.from('wallpapers').getPublicUrl(storagePath);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const thumbnailUrl = `${supabaseUrl}/storage/v1/render/image/public/wallpapers/${storagePath}?width=360&height=640&resize=cover&quality=80`;

  const { data: wallpaper, error: dbError } = await admin
    .from('wallpapers')
    .insert({
      title,
      slug,
      image_url: publicUrl,
      thumbnail_url: thumbnailUrl,
      width,
      height,
      is_free: true,
      is_premium: false,
      tags,
      artist_name: artistName,
      color_palette: [],
      published_at: new Date().toISOString(),
    })
    .select('id')
    .single();

  if (dbError || !wallpaper) {
    await admin.storage.from('wallpapers').remove([storagePath]);
    return { error: `Database error: ${dbError?.message}` };
  }

  await admin
    .from('wallpaper_categories')
    .insert({ wallpaper_id: wallpaper.id, category_id: categoryId });

  if (collectionId) {
    const { data: last } = await admin
      .from('wallpaper_collections')
      .select('sort_order')
      .eq('collection_id', collectionId)
      .order('sort_order', { ascending: false })
      .limit(1)
      .single();

    await admin.from('wallpaper_collections').insert({
      wallpaper_id: wallpaper.id,
      collection_id: collectionId,
      sort_order: last ? last.sort_order + 1 : 0,
    });
  }

  revalidatePath('/admin');
  revalidatePath('/browse');
  revalidatePath('/');

  return { slug, imageUrl: publicUrl };
}

export async function deleteWallpaper(
  wallpaperId: string,
  imageUrl: string,
): Promise<{ error?: string }> {
  if (!(await checkAdminAuth())) return { error: 'Unauthorized' };

  const admin = createAdminClient();

  // Extract storage path from the public URL
  let storagePath: string | null = null;
  try {
    const url = new URL(imageUrl);
    const segment = url.pathname.split('/wallpapers/')[1];
    if (segment) storagePath = segment.split('?')[0];
  } catch {
    // ignore — storage cleanup is best-effort
  }

  // Delete junction table rows first
  await Promise.all([
    admin.from('wallpaper_categories').delete().eq('wallpaper_id', wallpaperId),
    admin.from('wallpaper_moods').delete().eq('wallpaper_id', wallpaperId),
    admin.from('wallpaper_collections').delete().eq('wallpaper_id', wallpaperId),
  ]);

  // Delete DB row
  const { error: dbError } = await admin.from('wallpapers').delete().eq('id', wallpaperId);
  if (dbError) return { error: `Database error: ${dbError.message}` };

  // Delete from storage (best-effort)
  if (storagePath) {
    await admin.storage.from('wallpapers').remove([storagePath]);
  }

  revalidatePath('/admin');
  revalidatePath('/browse');
  revalidatePath('/');

  return {};
}
