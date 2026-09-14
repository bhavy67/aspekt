import type { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

// Phase 7: replace stub with real mood data from Supabase
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug} Wallpapers — ASPEKT`,
    description: `Browse ${slug} mood wallpapers on ASPEKT.`,
    openGraph: {
      title: `${slug} Wallpapers — ASPEKT`,
      description: `Browse ${slug} mood wallpapers on ASPEKT.`,
      images: [],
    },
    alternates: { canonical: `/mood/${slug}` },
  };
}

// Mood Browse — Phase 5: mood header, description, wallpaper grid
export default async function MoodPage({ params }: Props) {
  const { slug } = await params;
  return (
    <main>
      <p>Mood: {slug}</p>
    </main>
  );
}
