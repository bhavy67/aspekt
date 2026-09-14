import Link from 'next/link';
import type { Metadata } from 'next';
import { getCollections } from '@/lib/queries';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Collections',
  description: 'Hand-curated ASPEKT wallpaper collections.',
};

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1440px] px-6 py-12">
        <h1 className="mb-2 text-2xl font-bold text-foreground">Collections</h1>
        <p className="mb-12 text-sm text-muted">
          Hand-curated sets of wallpapers for every context.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {collections.map((col) => (
            <Link
              key={col.id}
              href={`/collections/${col.slug}`}
              className="group relative flex aspect-video items-end overflow-hidden rounded-2xl bg-surface p-5 transition-shadow hover:shadow-card-hover"
            >
              {col.cover_url && (
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-60 transition-opacity duration-300 group-hover:opacity-75"
                  style={{ backgroundImage: `url(${col.cover_url})` }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
              <div className="relative">
                <p className="text-lg font-bold text-foreground">{col.name}</p>
                {col.description && (
                  <p className="mt-1 line-clamp-2 text-sm text-muted">{col.description}</p>
                )}
                {col.curator_name && (
                  <p className="mt-2 text-xs text-subtle">by {col.curator_name}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
