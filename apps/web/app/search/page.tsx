import type { Metadata } from 'next';
import { WallpaperCard } from '@/components/wallpaper-card';
import { searchWallpapers } from '@/lib/queries';

export const metadata: Metadata = { title: 'Search' };

type Props = { searchParams: Promise<{ q?: string }> };

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const wallpapers = q ? await searchWallpapers(q) : [];

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1440px] px-6 py-12">
        <h1 className="mb-2 text-2xl font-bold text-foreground">
          {q ? `Results for "${q}"` : 'Search'}
        </h1>
        {q && <p className="mb-8 text-sm text-muted">{wallpapers.length} wallpapers found</p>}

        {!q && (
          <p className="py-24 text-center text-muted">
            Use the search bar in the nav to find wallpapers.
          </p>
        )}

        {q && wallpapers.length === 0 && (
          <p className="py-24 text-center text-muted">No wallpapers matched "{q}".</p>
        )}

        {wallpapers.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {wallpapers.map((w, i) => (
              <WallpaperCard key={w.id} wallpaper={w} priority={i < 4} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
