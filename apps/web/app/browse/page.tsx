import Link from 'next/link';
import type { Metadata } from 'next';
import { WallpaperCard } from '@/components/wallpaper-card';
import {
  getCategories,
  getMoods,
  getWallpapers,
  getWallpapersByCategory,
  getWallpapersByMood,
  searchWallpapers,
} from '@/lib/queries';

export const metadata: Metadata = {
  title: 'Browse Wallpapers',
  description: 'Browse the full ASPEKT wallpaper library. Filter by category or mood.',
};

type Props = {
  searchParams: Promise<{ category?: string; mood?: string; q?: string }>;
};

export default async function BrowsePage({ searchParams }: Props) {
  const { category, mood, q } = await searchParams;

  const [wallpapers, categories, moods] = await Promise.all([
    q
      ? searchWallpapers(q)
      : category
        ? getWallpapersByCategory(category)
        : mood
          ? getWallpapersByMood(mood)
          : getWallpapers({ limit: 60 }),
    getCategories(),
    getMoods(),
  ]);

  const activeLabel = q
    ? `"${q}"`
    : category
      ? (categories.find((c) => c.slug === category)?.name ?? category)
      : mood
        ? (moods.find((m) => m.slug === mood)?.name ?? mood)
        : null;

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1440px] px-6 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">
            {activeLabel ? activeLabel : 'Browse'}
          </h1>
          <p className="mt-1 text-sm text-muted">{wallpapers.length} wallpapers</p>
        </div>

        {/* Filter chips */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Link
            href="/browse"
            className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${!category && !mood && !q ? 'bg-accent-gradient text-[#0B0B0E]' : 'bg-raised text-muted hover:text-foreground'}`}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/browse?category=${cat.slug}`}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${category === cat.slug ? 'bg-accent-gradient text-[#0B0B0E]' : 'bg-raised text-muted hover:text-foreground'}`}
            >
              {cat.name}
            </Link>
          ))}
          {moods.map((m) => (
            <Link
              key={m.id}
              href={`/browse?mood=${m.slug}`}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${mood === m.slug ? 'bg-accent-gradient text-[#0B0B0E]' : 'bg-raised text-muted hover:text-foreground'}`}
            >
              {m.name}
            </Link>
          ))}
        </div>

        {wallpapers.length === 0 ? (
          <p className="py-24 text-center text-muted">No wallpapers found.</p>
        ) : (
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
