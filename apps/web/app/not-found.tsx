import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Not Found' };

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="text-center">
        <p className="mb-2 text-[80px] font-black leading-none text-surface">404</p>
        <h1 className="mb-3 text-2xl font-bold text-foreground">Page not found</h1>
        <p className="mb-8 text-sm text-muted">
          The wallpaper or page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/browse"
          className="rounded-full bg-accent-gradient px-6 py-2.5 text-sm font-semibold text-[#0B0B0E] transition-opacity hover:opacity-90"
        >
          Browse wallpapers
        </Link>
      </div>
    </main>
  );
}
