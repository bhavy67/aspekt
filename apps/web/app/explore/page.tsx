import Link from 'next/link';
import type { Metadata } from 'next';
import { getCategories, getMoods } from '@/lib/queries';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Explore',
  description: 'Discover ASPEKT wallpapers by category and mood.',
};

export default async function ExplorePage() {
  const [categories, moods] = await Promise.all([getCategories(), getMoods()]);

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1440px] px-6 py-12">
        <h1 className="mb-2 text-2xl font-bold text-foreground">Explore</h1>
        <p className="mb-12 text-sm text-muted">
          Discover the perfect wallpaper by category or feeling.
        </p>

        {/* Categories */}
        <section className="mb-16">
          <h2 className="mb-5 text-base font-semibold text-foreground">Categories</h2>
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="group relative flex aspect-square items-end overflow-hidden rounded-xl bg-surface p-3 transition-shadow hover:shadow-card-hover"
              >
                {cat.cover_url && (
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-50 transition-opacity duration-200 group-hover:opacity-70"
                    style={{ backgroundImage: `url(${cat.cover_url})` }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
                <span className="relative text-sm font-semibold text-foreground drop-shadow">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Moods */}
        <section>
          <h2 className="mb-5 text-base font-semibold text-foreground">Moods</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {moods.map((m) => (
              <Link
                key={m.id}
                href={`/mood/${m.slug}`}
                className="group relative flex aspect-video items-end overflow-hidden rounded-xl bg-surface p-4 transition-shadow hover:shadow-card-hover"
              >
                {m.cover_url && (
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-50 transition-opacity duration-200 group-hover:opacity-70"
                    style={{ backgroundImage: `url(${m.cover_url})` }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="relative">
                  <p className="text-base font-bold text-foreground">{m.name}</p>
                  {m.description && <p className="mt-0.5 text-xs text-muted">{m.description}</p>}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
