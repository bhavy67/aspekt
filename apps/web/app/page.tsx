import Image from 'next/image';
import Link from 'next/link';
import type { Wallpaper } from '@aspekt/types';
import { WallpaperCard } from '@/components/wallpaper-card';
import { getCategories, getCollections, getWallpapers } from '@/lib/queries';

export const revalidate = 3600;

/* ── Phone mockup component ──────────────────────────────────────────────── */
function PhoneFrame({
  wallpaper,
  style,
  className = '',
}: {
  wallpaper: Wallpaper;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <div
      className={`absolute ${className}`}
      style={{ width: 190, aspectRatio: '9/19.5', ...style }}
    >
      {/* Outer shell */}
      <div className="absolute inset-0 rounded-[44px] bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 shadow-[0_32px_80px_rgba(0,0,0,0.45)]" />
      {/* Screen */}
      <div className="absolute inset-[3px] overflow-hidden rounded-[41px] bg-black">
        <Image
          src={wallpaper.thumbnail_url}
          alt={wallpaper.title}
          fill
          className="object-cover"
          priority
        />
        {/* Dynamic island */}
        <div className="absolute left-1/2 top-[11px] z-10 h-[14px] w-[72px] -translate-x-1/2 rounded-full bg-black" />
      </div>
      {/* Volume buttons */}
      <div className="absolute left-[-2.5px] top-[22%] h-8 w-[3px] rounded-full bg-zinc-600" />
      <div className="absolute left-[-2.5px] top-[33%] h-6 w-[3px] rounded-full bg-zinc-600" />
      {/* Power button */}
      <div className="absolute right-[-2.5px] top-[27%] h-10 w-[3px] rounded-full bg-zinc-600" />
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */
export default async function HomePage() {
  const [wallpapers, categories, collections] = await Promise.all([
    getWallpapers({ limit: 12 }),
    getCategories(),
    getCollections(),
  ]);

  const heroWallpapers = wallpapers.slice(0, 3);
  const freshWallpapers = wallpapers.slice(0, 8);

  return (
    <main className="min-h-screen bg-background">
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/4 h-[600px] w-[600px] rounded-full bg-accent/5 blur-[120px]" />
          <div className="absolute top-20 right-0 h-[400px] w-[400px] rounded-full bg-cyan-400/5 blur-[100px]" />
        </div>

        <div className="relative mx-auto grid min-h-[92vh] max-w-[1440px] items-center gap-8 px-6 py-20 lg:grid-cols-2 lg:py-0">
          {/* Left: copy */}
          <div className="flex flex-col items-start">
            {/* Live badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-medium text-muted shadow-card">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              New drops daily
            </div>

            <h1 className="text-[clamp(3rem,7vw,5.5rem)] font-bold leading-[1.03] tracking-tight text-foreground">
              Your phone
              <br />
              deserves
              <br />
              <span className="text-accent-gradient">better.</span>
            </h1>

            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              Hand-picked mobile wallpapers. Minimal, dark, vivid — dropped fresh every day. Always
              free.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/browse"
                className="inline-flex h-12 items-center rounded-full bg-accent-gradient px-7 text-sm font-bold tracking-wide text-[#0B0B0E] shadow-glow transition-opacity hover:opacity-90"
              >
                Browse wallpapers
              </Link>
              <Link
                href="/download"
                className="inline-flex h-12 items-center rounded-full border border-border bg-surface px-7 text-sm font-semibold text-foreground shadow-card transition-colors hover:border-border-strong"
              >
                Get the App ↗
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-14 flex gap-10 border-t border-border pt-8">
              {[
                { value: `${wallpapers.length}+`, label: 'Wallpapers' },
                { value: 'Daily', label: 'New drops' },
                { value: '100%', label: 'Free' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-2xl font-bold text-foreground">{value}</p>
                  <p className="mt-0.5 text-xs text-muted">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: phone stack */}
          <div className="relative hidden h-[600px] items-center justify-center lg:flex">
            {/* Glow blob behind phones */}
            <div className="absolute h-[420px] w-[420px] rounded-full bg-accent/8 blur-[80px]" />

            {heroWallpapers[2] && (
              <PhoneFrame
                wallpaper={heroWallpapers[2]}
                style={{
                  transform: 'rotate(10deg) translate(160px, 30px) scale(0.78)',
                  opacity: 0.7,
                  zIndex: 0,
                }}
              />
            )}
            {heroWallpapers[1] && (
              <PhoneFrame
                wallpaper={heroWallpapers[1]}
                style={{
                  transform: 'rotate(-10deg) translate(-160px, 30px) scale(0.78)',
                  opacity: 0.7,
                  zIndex: 0,
                }}
              />
            )}
            {heroWallpapers[0] && (
              <PhoneFrame
                wallpaper={heroWallpapers[0]}
                style={{ transform: 'rotate(0deg) translate(0, -10px) scale(1)', zIndex: 10 }}
              />
            )}
          </div>
        </div>
      </section>

      {/* ── FRESH DROPS ───────────────────────────────────────────────────── */}
      {freshWallpapers.length > 0 && (
        <section className="pb-20 pt-4">
          <div className="mb-5 flex items-baseline justify-between px-6">
            <div>
              <h2 className="text-xl font-bold text-foreground">Fresh drops</h2>
              <p className="mt-0.5 text-sm text-muted">Latest from the collection</p>
            </div>
            <Link
              href="/browse"
              className="text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              See all →
            </Link>
          </div>

          {/* Horizontal scroll strip */}
          <div className="flex gap-3 overflow-x-auto px-6 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {freshWallpapers.map((w, i) => (
              <div key={w.id} className="w-[140px] flex-none sm:w-[160px]">
                <WallpaperCard wallpaper={w} priority={i < 3} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── BROWSE BY VIBE ────────────────────────────────────────────────── */}
      {categories.length > 0 && (
        <section className="mx-auto max-w-[1440px] px-6 pb-20">
          <div className="mb-6 flex items-baseline justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground">Browse by vibe</h2>
              <p className="mt-0.5 text-sm text-muted">What are you in the mood for?</p>
            </div>
            <Link
              href="/explore"
              className="text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              All categories →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="group relative overflow-hidden rounded-2xl bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                style={{ aspectRatio: '3/4' }}
              >
                {cat.cover_url && (
                  <Image
                    src={cat.cover_url}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-sm font-bold text-white">{cat.name}</p>
                  {cat.description && (
                    <p className="mt-0.5 line-clamp-1 text-[10px] text-white/60">
                      {cat.description}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── COLLECTIONS ───────────────────────────────────────────────────── */}
      {collections.length > 0 && (
        <section className="border-t border-border bg-raised/40">
          <div className="mx-auto max-w-[1440px] px-6 py-20">
            <div className="mb-8 flex items-baseline justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">Curated collections</h2>
                <p className="mt-0.5 text-sm text-muted">Wallpapers grouped by theme</p>
              </div>
              <Link
                href="/collections"
                className="text-sm font-medium text-muted transition-colors hover:text-foreground"
              >
                All collections →
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {collections.map((col) => (
                <Link
                  key={col.id}
                  href={`/collections/${col.slug}`}
                  className="group relative flex aspect-[16/7] overflow-hidden rounded-2xl bg-surface shadow-card transition-all duration-300 hover:shadow-card-hover"
                >
                  {col.cover_url && (
                    <Image
                      src={col.cover_url}
                      alt={col.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                  <div className="relative flex flex-col justify-end p-6">
                    <p className="text-base font-bold text-white">{col.name}</p>
                    {col.description && (
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/60">
                        {col.description}
                      </p>
                    )}
                    {col.curator_name && (
                      <p className="mt-3 text-[10px] font-semibold uppercase tracking-widest text-white/40">
                        by {col.curator_name}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── APP CTA ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-border">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -bottom-20 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-accent/6 blur-[80px]" />
        </div>
        <div className="relative mx-auto max-w-[1440px] px-6 py-24 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">
            Available on iOS &amp; Android
          </p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Take your wallpapers everywhere
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-muted">
            Browse, save, and apply directly from your phone. New wallpapers waiting every morning.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/download"
              className="inline-flex h-12 items-center rounded-full bg-accent-gradient px-8 text-sm font-bold text-[#0B0B0E] shadow-glow transition-opacity hover:opacity-90"
            >
              Download Free
            </Link>
            <Link
              href="/browse"
              className="inline-flex h-12 items-center rounded-full border border-border bg-surface px-8 text-sm font-semibold text-foreground shadow-card transition-colors hover:border-border-strong"
            >
              Browse first
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
