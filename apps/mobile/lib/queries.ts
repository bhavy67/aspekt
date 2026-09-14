import type {
  Category,
  Collection,
  CollectionDetail,
  DownloadHistoryItem,
  Mood,
  Wallpaper,
  WallpaperDetail,
} from '@aspekt/types';
import { supabase } from './supabase';

export async function getWallpapers({ limit = 30, offset = 0 } = {}): Promise<Wallpaper[]> {
  const { data } = await supabase
    .from('wallpapers')
    .select('*')
    .order('published_at', { ascending: false })
    .range(offset, offset + limit - 1);
  return (data ?? []) as Wallpaper[];
}

export async function getWallpaper(slug: string): Promise<WallpaperDetail | null> {
  const { data: w } = await supabase.from('wallpapers').select('*').eq('slug', slug).single();
  if (!w) return null;

  const [{ data: catLinks }, { data: moodLinks }, { data: colLinks }] = await Promise.all([
    supabase.from('wallpaper_categories').select('categories(*)').eq('wallpaper_id', w.id),
    supabase.from('wallpaper_moods').select('moods(*)').eq('wallpaper_id', w.id),
    supabase.from('wallpaper_collections').select('collections(*)').eq('wallpaper_id', w.id),
  ]);

  return {
    ...(w as Wallpaper),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    categories: (catLinks ?? []).map((r: any) => r.categories as Category),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    moods: (moodLinks ?? []).map((r: any) => r.moods as Mood),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    collections: (colLinks ?? []).map((r: any) => r.collections as Collection),
  };
}

export async function getCategories(): Promise<Category[]> {
  const { data } = await supabase.from('categories').select('*').order('sort_order');
  return (data ?? []) as Category[];
}

export async function getCategory(slug: string): Promise<Category | null> {
  const { data } = await supabase.from('categories').select('*').eq('slug', slug).single();
  return (data ?? null) as Category | null;
}

export async function getMoods(): Promise<Mood[]> {
  const { data } = await supabase.from('moods').select('*').order('sort_order');
  return (data ?? []) as Mood[];
}

export async function getMood(slug: string): Promise<Mood | null> {
  const { data } = await supabase.from('moods').select('*').eq('slug', slug).single();
  return (data ?? null) as Mood | null;
}

export async function getCollections(): Promise<Collection[]> {
  const { data } = await supabase
    .from('collections')
    .select('*')
    .order('published_at', { ascending: false });
  return (data ?? []) as Collection[];
}

export async function getCollection(slug: string): Promise<CollectionDetail | null> {
  const { data: col } = await supabase.from('collections').select('*').eq('slug', slug).single();
  if (!col) return null;

  const { data: links } = await supabase
    .from('wallpaper_collections')
    .select('wallpapers(*)')
    .eq('collection_id', col.id)
    .order('sort_order');

  return {
    ...(col as Collection),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    wallpapers: (links ?? []).map((r: any) => r.wallpapers as Wallpaper),
  };
}

export async function getWallpapersByCategory(slug: string): Promise<Wallpaper[]> {
  const { data: cat } = await supabase.from('categories').select('id').eq('slug', slug).single();
  if (!cat) return [];
  const { data: links } = await supabase
    .from('wallpaper_categories')
    .select('wallpaper_id')
    .eq('category_id', cat.id);
  if (!links?.length) return [];
  const { data } = await supabase
    .from('wallpapers')
    .select('*')
    .in(
      'id',
      links.map((l: { wallpaper_id: string }) => l.wallpaper_id),
    )
    .order('published_at', { ascending: false });
  return (data ?? []) as Wallpaper[];
}

export async function getWallpapersByMood(slug: string): Promise<Wallpaper[]> {
  const { data: mood } = await supabase.from('moods').select('id').eq('slug', slug).single();
  if (!mood) return [];
  const { data: links } = await supabase
    .from('wallpaper_moods')
    .select('wallpaper_id')
    .eq('mood_id', mood.id);
  if (!links?.length) return [];
  const { data } = await supabase
    .from('wallpapers')
    .select('*')
    .in(
      'id',
      links.map((l: { wallpaper_id: string }) => l.wallpaper_id),
    )
    .order('published_at', { ascending: false });
  return (data ?? []) as Wallpaper[];
}

export async function searchWallpapers(query: string): Promise<Wallpaper[]> {
  if (!query.trim()) return [];
  const { data } = await supabase
    .from('wallpapers')
    .select('*')
    .textSearch('fts', query, { type: 'websearch' })
    .order('published_at', { ascending: false })
    .limit(40);
  return (data ?? []) as Wallpaper[];
}

// ── Favourites ────────────────────────────────────────────────────────────────

export async function getFavourites(userId: string): Promise<Wallpaper[]> {
  const { data } = await supabase
    .from('favourites')
    .select('wallpapers(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data ?? []).map((r: any) => r.wallpapers as Wallpaper);
}

export async function isFavourited(userId: string, wallpaperId: string): Promise<boolean> {
  const { data } = await supabase
    .from('favourites')
    .select('id')
    .eq('user_id', userId)
    .eq('wallpaper_id', wallpaperId)
    .maybeSingle();
  return data !== null;
}

export async function addFavourite(userId: string, wallpaperId: string): Promise<void> {
  await supabase.from('favourites').insert({ user_id: userId, wallpaper_id: wallpaperId });
}

export async function removeFavourite(userId: string, wallpaperId: string): Promise<void> {
  await supabase.from('favourites').delete().eq('user_id', userId).eq('wallpaper_id', wallpaperId);
}

// ── Download history ──────────────────────────────────────────────────────────

export async function logDownload(userId: string, wallpaperId: string): Promise<void> {
  await supabase.from('download_history').insert({ user_id: userId, wallpaper_id: wallpaperId });
}

export async function getDownloadHistory(userId: string): Promise<DownloadHistoryItem[]> {
  const { data } = await supabase
    .from('download_history')
    .select('*')
    .eq('user_id', userId)
    .order('downloaded_at', { ascending: false })
    .limit(50);
  return (data ?? []) as DownloadHistoryItem[];
}
