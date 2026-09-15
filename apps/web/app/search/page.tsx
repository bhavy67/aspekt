import type { Metadata } from 'next';
import { WallpaperCard } from '@/components/wallpaper-card';
import { searchWallpapers } from '@/lib/queries';
import { SearchInput } from './search-input';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search the ASPEKT wallpaper collection.',
};

type Props = { searchParams: Promise<{ q?: string }> };

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const wallpapers = q?.trim() ? await searchWallpapers(q.trim()) : [];

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1440px] px-6 py-12">
        <h1 className="mb-6 text-2xl font-bold text-foreground">Search</h1>

        <SearchInput defaultValue={q ?? ''} />

        {q && (
          <p className="mt-6 mb-8 text-sm text-muted">
            {wallpapers.length === 0
              ? `No wallpapers matched "${q}"`
              : `${wallpapers.length} result${wallpapers.length === 1 ? '' : 's'} for "${q}"`}
          </p>
        )}

        {!q && (
          <p className="mt-16 text-center text-sm text-muted">Type something above to search.</p>
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
