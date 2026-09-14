import type { Metadata } from 'next';
import { LogoMark } from '@/components/logo';
import { Chip } from '@/components/chip';

export const metadata: Metadata = {
  title: 'Get the App',
  description: 'Download ASPEKT for iOS and Android.',
};

const FEATURES = [
  { label: 'New wallpapers daily', desc: 'Fresh picks every day, curated by the ASPEKT team.' },
  {
    label: 'One-tap apply',
    desc: 'Set wallpapers directly from the app — home screen, lock screen, or both.',
  },
  { label: 'Browse by mood', desc: 'Find the right wallpaper for how you feel right now.' },
  {
    label: 'Free to use',
    desc: 'The full library is free. No account needed to browse and download.',
  },
];

export default function DownloadPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-6 py-24 text-center">
        <div className="mb-8 flex justify-center">
          <LogoMark size={64} variant="gradient" />
        </div>

        <Chip variant="accent" className="mb-6">
          Available now
        </Chip>

        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
          ASPEKT for <span className="text-accent-gradient">iOS & Android</span>
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-base text-muted">
          The best wallpaper experience — curated library, daily updates, and one-tap apply. Free to
          download.
        </p>

        {/* Store badges — placeholder links */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <div className="flex h-14 items-center gap-3 rounded-xl bg-raised border border-border-strong px-5">
            <div className="text-left">
              <p className="text-[10px] font-medium uppercase tracking-widest text-muted">
                Download on the
              </p>
              <p className="text-sm font-bold text-foreground">App Store</p>
            </div>
          </div>
          <div className="flex h-14 items-center gap-3 rounded-xl bg-raised border border-border-strong px-5">
            <div className="text-left">
              <p className="text-[10px] font-medium uppercase tracking-widest text-muted">
                Get it on
              </p>
              <p className="text-sm font-bold text-foreground">Google Play</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid gap-6 text-left sm:grid-cols-2">
          {FEATURES.map((f) => (
            <div key={f.label} className="rounded-xl border border-border bg-surface p-5">
              <p className="text-sm font-semibold text-foreground">{f.label}</p>
              <p className="mt-1 text-sm text-muted">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
