import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Button } from '@/components/button';
import { Chip } from '@/components/chip';
import { WallpaperCard } from '@/components/wallpaper-card';
import { getWallpaper, getWallpapers } from '@/lib/queries';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const wallpapers = await getWallpapers({ limit: 100 });
  return wallpapers.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const w = await getWallpaper(slug);
  if (!w) return { title: 'Not found' };
  return {
    title: w.title,
    description: `Download ${w.title} — a free wallpaper on ASPEKT.`,
    openGraph: {
      title: `${w.title} — ASPEKT`,
      description: `Download ${w.title} wallpaper free on ASPEKT.`,
      images: [{ url: w.thumbnail_url, width: 640, height: 360 }],
    },
    alternates: { canonical: `/wallpaper/${slug}` },
  };
}

export default async function WallpaperPage({ params }: Props) {
  const { slug } = await params;
  const [wallpaper, related] = await Promise.all([getWallpaper(slug), getWallpapers({ limit: 4 })]);
  if (!wallpaper) notFound();

  const relatedWallpapers = related.filter((w) => w.slug !== slug).slice(0, 4);
  const aspectRatio = `${wallpaper.width}/${wallpaper.height}`;

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Preview */}
          <div>
            <div
              className="relative w-full overflow-hidden rounded-2xl bg-surface shadow-card-hover"
              style={{ aspectRatio }}
            >
              <Image
                src={wallpaper.image_url}
                alt={wallpaper.title}
                fill
                sizes="(max-width: 1024px) 100vw, 720px"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            <div>
              <div className="mb-3 flex flex-wrap gap-2">
                {wallpaper.is_free && <Chip variant="gradient">Free</Chip>}
                {wallpaper.is_premium && <Chip variant="accent">Premium</Chip>}
              </div>
              <h1 className="text-xl font-bold text-foreground">{wallpaper.title}</h1>
              {wallpaper.artist_name && (
                <p className="mt-1 text-sm text-muted">by {wallpaper.artist_name}</p>
              )}
            </div>

            {/* Resolution */}
            <div className="rounded-xl border border-border bg-surface p-4">
              <p className="text-xs font-medium uppercase tracking-widest text-muted">Resolution</p>
              <p className="mt-1 text-sm font-semibold text-foreground">
                {wallpaper.width} × {wallpaper.height}
              </p>
            </div>

            {/* Download */}
            <a
              href={wallpaper.image_url}
              download={`${wallpaper.slug}.jpg`}
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="primary" size="lg" className="w-full">
                Download Free
              </Button>
            </a>

            {/* App CTA */}
            <Link href="/download">
              <Button variant="secondary" size="md" className="w-full">
                Also in the ASPEKT App
              </Button>
            </Link>

            {/* Categories */}
            {wallpaper.categories.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted">
                  Category
                </p>
                <div className="flex flex-wrap gap-2">
                  {wallpaper.categories.map((cat) => (
                    <Link key={cat.id} href={`/category/${cat.slug}`}>
                      <Chip variant="default">{cat.name}</Chip>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Moods */}
            {wallpaper.moods.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted">
                  Mood
                </p>
                <div className="flex flex-wrap gap-2">
                  {wallpaper.moods.map((m) => (
                    <Link key={m.id} href={`/mood/${m.slug}`}>
                      <Chip variant="default">{m.name}</Chip>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {wallpaper.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {wallpaper.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-raised px-2 py-0.5 text-[11px] text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        {relatedWallpapers.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-base font-semibold text-foreground">More Wallpapers</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {relatedWallpapers.map((w) => (
                <WallpaperCard key={w.id} wallpaper={w} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
