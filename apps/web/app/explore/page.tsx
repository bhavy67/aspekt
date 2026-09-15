import Image from 'next/image';
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
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-foreground">Explore</h1>
          <p className="mt-2 text-base text-muted">Find the right wallpaper for how you feel.</p>
        </div>

        {/* Categories — portrait cards matching wallpaper shape */}
        {categories.length > 0 && (
          <section className="mb-16">
            <h2 className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted">
              Categories
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className="group relative overflow-hidden rounded-2xl bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                  style={{ aspectRatio: '3/4' }}
                >
                  {cat.cover_url && (
                    <Image
                      src={cat.cover_url}
                      alt={cat.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="font-bold text-white">{cat.name}</p>
                    {cat.description && (
                      <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-white/55">
                        {cat.description}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Moods — wide landscape cards with left-to-right gradient */}
        {moods.length > 0 && (
          <section>
            <h2 className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted">
              Moods
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {moods.map((m) => (
                <Link
                  key={m.id}
                  href={`/mood/${m.slug}`}
                  className="group relative overflow-hidden rounded-2xl bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                  style={{ aspectRatio: '4/3' }}
                >
                  {m.cover_url && (
                    <Image
                      src={m.cover_url}
                      alt={m.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-lg font-bold text-white">{m.name}</p>
                    {m.description && <p className="mt-1 text-xs text-white/55">{m.description}</p>}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
