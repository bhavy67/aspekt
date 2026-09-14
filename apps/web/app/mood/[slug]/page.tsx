import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { WallpaperCard } from '@/components/wallpaper-card';
import { getMood, getMoods, getWallpapersByMood } from '@/lib/queries';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const moods = await getMoods();
  return moods.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const mood = await getMood(slug);
  if (!mood) return { title: 'Not found' };
  return {
    title: `${mood.name} Wallpapers`,
    description: mood.description ?? `Browse ${mood.name} mood wallpapers on ASPEKT.`,
    openGraph: {
      title: `${mood.name} Wallpapers — ASPEKT`,
      images: mood.cover_url ? [{ url: mood.cover_url }] : [],
    },
    alternates: { canonical: `/mood/${slug}` },
  };
}

export default async function MoodPage({ params }: Props) {
  const { slug } = await params;
  const [mood, wallpapers] = await Promise.all([getMood(slug), getWallpapersByMood(slug)]);
  if (!mood) notFound();

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">{mood.name}</h1>
          {mood.description && <p className="mt-2 text-sm text-muted">{mood.description}</p>}
          <p className="mt-3 text-xs text-subtle">{wallpapers.length} wallpapers</p>
        </div>

        {wallpapers.length === 0 ? (
          <p className="py-24 text-center text-muted">No wallpapers for this mood yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {wallpapers.map((w, i) => (
              <WallpaperCard key={w.id} wallpaper={w} priority={i < 4} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
