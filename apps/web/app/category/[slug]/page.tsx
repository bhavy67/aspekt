import type { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

// Phase 7: replace stub with real category data from Supabase
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug} Wallpapers — ASPEKT`,
    description: `Browse ${slug} wallpapers on ASPEKT.`,
    openGraph: {
      title: `${slug} Wallpapers — ASPEKT`,
      description: `Browse ${slug} wallpapers on ASPEKT.`,
      images: [],
    },
    alternates: { canonical: `/category/${slug}` },
  };
}

// Category Browse — Phase 5: category header, description, wallpaper grid
export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  return (
    <main>
      <p>Category: {slug}</p>
    </main>
  );
}
