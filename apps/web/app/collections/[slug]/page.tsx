import type { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

// Phase 7: replace stub with real collection data from Supabase
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Collection — ASPEKT`,
    description: `Explore this curated wallpaper collection on ASPEKT.`,
    openGraph: {
      title: `Collection — ASPEKT`,
      description: `Explore this curated wallpaper collection on ASPEKT.`,
      images: [],
    },
    alternates: { canonical: `/collections/${slug}` },
  };
}

// Collection Detail — Phase 5: cover, name, description, curator credit, wallpaper grid
export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  return (
    <main>
      <p>Collection: {slug}</p>
    </main>
  );
}
