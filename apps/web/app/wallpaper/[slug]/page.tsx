import type { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

// Phase 7: replace stub with real wallpaper data from Supabase
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Wallpaper — ASPEKT`,
    description: `Discover and apply this wallpaper on ASPEKT.`,
    openGraph: {
      title: `Wallpaper — ASPEKT`,
      description: `Discover and apply this wallpaper on ASPEKT.`,
      // Phase 7: populate with CDN preview URL
      images: [],
    },
    // Phase 7: add JSON-LD ImageObject structured data
    alternates: { canonical: `/wallpaper/${slug}` },
  };
}

// Wallpaper Detail — Phase 5: CDN preview, metadata, download button, related wallpapers
// SEO: OG tags + JSON-LD ImageObject schema
// Web download: direct file download, no auth, no interstitial (free wallpapers)
// Non-blocking app CTA alongside download
export default async function WallpaperPage({ params }: Props) {
  const { slug } = await params;
  return (
    <main>
      <p>Wallpaper: {slug}</p>
    </main>
  );
}
