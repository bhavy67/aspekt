import Link from 'next/link';
import { Button } from '@/components/button';
import { Chip } from '@/components/chip';
import { WallpaperCard } from '@/components/wallpaper-card';
import { getCategories, getCollections, getWallpapers } from '@/lib/queries';

export const revalidate = 3600;

export default async function HomePage() {
  const [wallpapers, categories, collections] = await Promise.all([
    getWallpapers({ limit: 8 }),
    getCategories(),
    getCollections(),
  ]);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="flex flex-col items-center px-6 pb-20 pt-28 text-center sm:pt-36">
        <Chip variant="accent" className="mb-6">
          Curated for every screen
        </Chip>
        <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Wallpapers <span className="text-accent-gradient">worth keeping</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base text-muted sm:text-lg">
          A beautifully curated library of desktop and mobile wallpapers. Every image hand-selected
          for colour, composition, and feel.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/browse">
            <Button variant="primary" size="lg">
              Browse Wallpapers
            </Button>
          </Link>
          <Link href="/collections">
            <Button variant="secondary" size="lg">
              View Collections
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured grid */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Featured</h2>
          <Link
            href="/browse"
            className="text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {wallpapers.map((w, i) => (
            <WallpaperCard key={w.id} wallpaper={w} priority={i < 4} />
          ))}
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-20">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Browse by Category</h2>
            <Link
              href="/explore"
              className="text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              Explore →
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="group relative flex aspect-square items-end overflow-hidden rounded-xl bg-surface p-3"
              >
                {cat.cover_url && (
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-50 transition-opacity duration-200 group-hover:opacity-70"
                    style={{ backgroundImage: `url(${cat.cover_url})` }}
                  />
                )}
                <span className="relative text-sm font-semibold text-foreground drop-shadow">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Collections */}
      {collections.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-20">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Curated Collections</h2>
            <Link
              href="/collections"
              className="text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              All collections →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {collections.map((col) => (
              <Link
                key={col.id}
                href={`/collections/${col.slug}`}
                className="group relative flex aspect-video items-end overflow-hidden rounded-xl bg-surface p-4"
              >
                {col.cover_url && (
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-60 transition-opacity duration-200 group-hover:opacity-75"
                    style={{ backgroundImage: `url(${col.cover_url})` }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="relative">
                  <p className="text-sm font-bold text-foreground">{col.name}</p>
                  {col.description && (
                    <p className="mt-0.5 line-clamp-1 text-xs text-muted">{col.description}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* App CTA */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-16 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h2 className="text-xl font-bold text-foreground">Take it with you</h2>
            <p className="mt-1 text-sm text-muted">
              New wallpapers daily. Available on iOS and Android.
            </p>
          </div>
          <Link href="/download">
            <Button variant="primary" size="md">
              Get the App
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
