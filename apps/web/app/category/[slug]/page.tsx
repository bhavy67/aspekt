import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { WallpaperCard } from '@/components/wallpaper-card';
import { getCategories, getCategory, getWallpapersByCategory } from '@/lib/queries';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const cats = await getCategories();
  return cats.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = await getCategory(slug);
  if (!cat) return { title: 'Not found' };
  return {
    title: `${cat.name} Wallpapers`,
    description: cat.description ?? `Browse ${cat.name} wallpapers on ASPEKT.`,
    openGraph: {
      title: `${cat.name} Wallpapers — ASPEKT`,
      images: cat.cover_url ? [{ url: cat.cover_url }] : [],
    },
    alternates: { canonical: `/category/${slug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const [category, wallpapers] = await Promise.all([
    getCategory(slug),
    getWallpapersByCategory(slug),
  ]);
  if (!category) notFound();

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1440px] px-6 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">{category.name}</h1>
          {category.description && (
            <p className="mt-2 text-sm text-muted">{category.description}</p>
          )}
          <p className="mt-3 text-xs text-subtle">{wallpapers.length} wallpapers</p>
        </div>

        {wallpapers.length === 0 ? (
          <p className="py-24 text-center text-muted">No wallpapers in this category yet.</p>
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
