import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { WallpaperCard } from '@/components/wallpaper-card';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export const metadata: Metadata = { title: 'Favourites' };

export default async function FavouritesPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/auth/sign-in?next=/account/favourites');

  const { data: favLinks } = await supabase
    .from('favourites')
    .select('wallpaper_id, wallpapers(*)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const wallpapers = (favLinks ?? []).map((r: any) => r.wallpapers);

  return (
    <main className="mx-auto max-w-[1440px] px-6 py-12">
      <div className="mb-8 flex items-center gap-3">
        <a href="/account" className="text-sm text-muted hover:text-foreground">
          ← Account
        </a>
        <h1 className="text-2xl font-700 text-foreground">Favourites</h1>
        <span className="ml-auto text-sm text-subtle">{wallpapers.length} saved</span>
      </div>

      {wallpapers.length === 0 ? (
        <div className="rounded-2xl border border-border bg-surface py-16 text-center">
          <p className="text-sm text-muted">Your favourites will appear here.</p>
          <p className="mt-1 text-xs text-subtle">Tap the ♡ on any wallpaper to save it.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {wallpapers.map((w) => (
            <WallpaperCard key={w.id} wallpaper={w} />
          ))}
        </div>
      )}
    </main>
  );
}
