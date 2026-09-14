import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { WallpaperCard } from '@/components/wallpaper-card';
import { getWallpaper, getWallpapers } from '@/lib/queries';
import { DownloadButton } from './download-button';
import { ScrollReset } from './scroll-reset';

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
    description: `Download ${w.title} — free mobile wallpaper on ASPEKT.`,
    openGraph: {
      title: `${w.title} — ASPEKT`,
      description: `Free mobile wallpaper. Download ${w.title} on ASPEKT.`,
      images: [{ url: w.thumbnail_url, width: w.width, height: w.height }],
    },
    alternates: { canonical: `/wallpaper/${slug}` },
  };
}

export default async function WallpaperPage({ params }: Props) {
  const { slug } = await params;
  const [wallpaper, all] = await Promise.all([getWallpaper(slug), getWallpapers({ limit: 10 })]);
  if (!wallpaper) notFound();

  const related = all.filter((w) => w.slug !== slug).slice(0, 6);

  return (
    <main className="min-h-screen bg-background">
      <ScrollReset />
      <div className="mx-auto max-w-[1440px] px-6 py-10">
        <div className="grid gap-10 lg:grid-cols-[380px_1fr]">
          {/* Portrait wallpaper preview — phone-proportioned column */}
          <div className="flex flex-col gap-4">
            {/* Phone-context frame */}
            <div
              className="relative w-full overflow-hidden rounded-3xl bg-surface shadow-card-hover"
              style={{ aspectRatio: '9/16' }}
            >
              <Image
                src={wallpaper.image_url}
                alt={wallpaper.title}
                fill
                sizes="(max-width: 1024px) 100vw, 380px"
                className="object-cover"
                priority
              />
              {/* Screen overlay hint */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
            </div>

            {/* Download — below image on mobile */}
            <div className="lg:hidden">
              <DownloadButton
                wallpaperId={wallpaper.id}
                wallpaperSlug={wallpaper.slug}
                imageUrl={wallpaper.image_url}
                isPremium={wallpaper.is_premium}
                coinCost={wallpaper.coin_cost}
              />
            </div>
          </div>

          {/* Info sidebar */}
          <div className="flex flex-col gap-6 pt-2">
            {/* Title + artist */}
            <div>
              <div className="mb-2 flex flex-wrap gap-1.5">
                {wallpaper.is_free && (
                  <span className="rounded-full bg-accent-gradient px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#0B0B0E]">
                    Free
                  </span>
                )}
                {wallpaper.categories.map((c) => (
                  <Link
                    key={c.id}
                    href={`/category/${c.slug}`}
                    className="rounded-full bg-raised px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-muted transition-colors hover:text-foreground"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
              <h1 className="text-2xl font-bold text-foreground">{wallpaper.title}</h1>
              {wallpaper.artist_name && (
                <p className="mt-1 text-sm text-muted">by {wallpaper.artist_name}</p>
              )}
            </div>

            {/* Resolution */}
            <div className="rounded-2xl border border-border bg-surface p-4">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">
                Resolution
              </p>
              <p className="mt-1.5 text-base font-bold text-foreground">
                {wallpaper.width} × {wallpaper.height}
              </p>
              <p className="mt-0.5 text-xs text-muted">
                {wallpaper.width > wallpaper.height ? 'Landscape' : 'Portrait · Mobile'}
              </p>
            </div>

            {/* Download — desktop */}
            <div className="hidden lg:block">
              <DownloadButton
                wallpaperId={wallpaper.id}
                wallpaperSlug={wallpaper.slug}
                imageUrl={wallpaper.image_url}
                isPremium={wallpaper.is_premium}
                coinCost={wallpaper.coin_cost}
              />
            </div>

            {/* App nudge */}
            <Link
              href="/download"
              className="flex items-center justify-between rounded-2xl border border-border bg-surface px-4 py-3.5 transition-colors hover:border-border-strong"
            >
              <div>
                <p className="text-sm font-semibold text-foreground">Apply from the app</p>
                <p className="mt-0.5 text-xs text-muted">Set as wallpaper in one tap</p>
              </div>
              <span className="rounded-full bg-raised px-3 py-1.5 text-xs font-semibold text-muted">
                Get App →
              </span>
            </Link>

            {/* Tags */}
            {wallpaper.tags.length > 0 && (
              <div>
                <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-widest text-muted">
                  Tags
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {wallpaper.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg bg-raised px-2.5 py-1 text-[11px] font-medium text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Moods */}
            {wallpaper.moods.length > 0 && (
              <div>
                <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-widest text-muted">
                  Mood
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {wallpaper.moods.map((m) => (
                    <Link
                      key={m.id}
                      href={`/mood/${m.slug}`}
                      className="rounded-lg bg-raised px-2.5 py-1 text-[11px] font-medium text-muted transition-colors hover:text-foreground"
                    >
                      {m.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Collections */}
            {wallpaper.collections.length > 0 && (
              <div>
                <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-widest text-muted">
                  In collection
                </p>
                <div className="flex flex-col gap-2">
                  {wallpaper.collections.map((col) => (
                    <Link
                      key={col.id}
                      href={`/collections/${col.slug}`}
                      className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-border-strong"
                    >
                      <span className="text-base">🗂</span>
                      {col.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-20 border-t border-border pt-12">
            <h2 className="mb-6 text-base font-semibold text-foreground">More wallpapers</h2>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
              {related.map((w) => (
                <WallpaperCard key={w.id} wallpaper={w} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
