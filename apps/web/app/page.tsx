import Link from 'next/link';
import { Button } from '@/components/button';
import { Chip } from '@/components/chip';

// Homepage — Phase 5: replace placeholder cards with real wallpaper data
export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-6 pb-24 pt-28 text-center sm:pt-36">
        <Chip variant="accent" className="mb-6">
          Curated for every screen
        </Chip>

        <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Wallpapers <span className="text-accent-gradient">worth keeping</span>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-base text-muted sm:text-lg">
          A beautifully curated library of desktop and mobile wallpapers. Every image hand-selected
          for colour, composition, and feel.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/browse">
            <Button variant="primary" size="lg">
              Browse Wallpapers
            </Button>
          </Link>
          <Link href="/collections">
            <Button variant="secondary" size="lg">
              View Collections
            </Button>
          </Link>
        </div>
      </section>

      {/* Placeholder wallpaper grid — replaced in Phase 5 */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Featured</h2>
          <Link
            href="/browse"
            className="text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {PLACEHOLDER_CARDS.map((card) => (
            <div
              key={card.id}
              className="group relative overflow-hidden rounded-xl bg-surface"
              style={{ aspectRatio: card.ratio }}
            >
              <div className="absolute inset-0 opacity-60" style={{ background: card.gradient }} />
              <div className="absolute inset-0 flex items-end p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <span className="rounded-md bg-background/80 px-2 py-1 text-[11px] font-medium text-foreground backdrop-blur-sm">
                  {card.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* App download CTA */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-16 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h2 className="text-xl font-bold text-foreground">Take it with you</h2>
            <p className="mt-1 text-sm text-muted">
              New wallpapers daily. Available on iOS and Android.
            </p>
          </div>
          <Link href="/download">
            <Button variant="primary" size="md">
              Get the App
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}

const PLACEHOLDER_CARDS = [
  {
    id: 1,
    ratio: '3/4',
    label: 'Abstract',
    gradient: 'linear-gradient(135deg, #818CF8 0%, #22D3EE 100%)',
  },
  {
    id: 2,
    ratio: '3/4',
    label: 'Nature',
    gradient: 'linear-gradient(135deg, #34D399 0%, #059669 100%)',
  },
  {
    id: 3,
    ratio: '3/4',
    label: 'Minimal',
    gradient: 'linear-gradient(135deg, #1C1C26 0%, #2E2E3E 100%)',
  },
  {
    id: 4,
    ratio: '3/4',
    label: 'Dark',
    gradient: 'linear-gradient(135deg, #22222E 0%, #13131A 100%)',
  },
  {
    id: 5,
    ratio: '3/4',
    label: 'Gradient',
    gradient: 'linear-gradient(135deg, #F472B6 0%, #818CF8 100%)',
  },
  {
    id: 6,
    ratio: '3/4',
    label: 'Moody',
    gradient: 'linear-gradient(135deg, #0B0B0E 0%, #818CF8 100%)',
  },
  {
    id: 7,
    ratio: '3/4',
    label: 'Warm',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
  },
  {
    id: 8,
    ratio: '3/4',
    label: 'Space',
    gradient: 'linear-gradient(135deg, #0B0B0E 0%, #22D3EE 100%)',
  },
];
