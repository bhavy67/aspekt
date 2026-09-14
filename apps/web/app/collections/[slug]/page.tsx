import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Chip } from '@/components/chip';
import { WallpaperCard } from '@/components/wallpaper-card';
import { getCollection, getCollections } from '@/lib/queries';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const cols = await getCollections();
  return cols.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const col = await getCollection(slug);
  if (!col) return { title: 'Not found' };
  return {
    title: col.name,
    description: col.description ?? `Explore the ${col.name} collection on ASPEKT.`,
    openGraph: {
      title: `${col.name} — ASPEKT`,
      images: col.cover_url ? [{ url: col.cover_url }] : [],
    },
    alternates: { canonical: `/collections/${slug}` },
  };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const collection = await getCollection(slug);
  if (!collection) notFound();

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div
        className="relative flex min-h-[240px] items-end bg-surface px-6 pb-10 pt-24"
        style={
          collection.cover_url
            ? {
                backgroundImage: `url(${collection.cover_url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : undefined
        }
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
        <div className="relative mx-auto w-full max-w-[1440px]">
          <Chip variant="accent" className="mb-3">
            Collection
          </Chip>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">{collection.name}</h1>
          {collection.description && (
            <p className="mt-2 max-w-xl text-sm text-muted">{collection.description}</p>
          )}
          {collection.curator_name && (
            <p className="mt-3 text-xs text-subtle">Curated by {collection.curator_name}</p>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-[1440px] px-6 py-12">
        {collection.wallpapers.length === 0 ? (
          <p className="py-24 text-center text-muted">No wallpapers in this collection yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {collection.wallpapers.map((w, i) => (
              <WallpaperCard key={w.id} wallpaper={w} priority={i < 4} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
