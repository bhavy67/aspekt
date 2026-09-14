import { WallpaperGridSkeleton } from '@/components/skeleton';

export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero header skeleton */}
      <div className="relative flex min-h-[240px] items-end bg-surface px-6 pb-10 pt-24">
        <div className="animate-pulse absolute inset-0 bg-raised" />
        <div className="relative mx-auto w-full max-w-[1440px]">
          <div className="animate-pulse mb-3 h-5 w-20 rounded-full bg-raised/60" />
          <div className="animate-pulse mb-2 h-9 w-64 rounded-lg bg-raised/60" />
          <div className="animate-pulse h-4 w-80 rounded-md bg-raised/60" />
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 py-12">
        <WallpaperGridSkeleton />
      </div>
    </main>
  );
}
