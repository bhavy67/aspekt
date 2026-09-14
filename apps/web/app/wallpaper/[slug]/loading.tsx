import { WallpaperGridSkeleton } from '@/components/skeleton';

export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1440px] px-6 py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px]">
          {/* Main image skeleton */}
          <div>
            <div className="animate-pulse aspect-video w-full rounded-2xl bg-raised" />
          </div>

          {/* Sidebar skeleton */}
          <div className="space-y-4">
            <div className="animate-pulse h-8 w-3/4 rounded-lg bg-raised" />
            <div className="animate-pulse h-4 w-1/2 rounded-md bg-raised" />
            <div className="flex gap-2 pt-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse h-6 w-16 rounded-full bg-raised" />
              ))}
            </div>
            <div className="animate-pulse mt-4 h-12 w-full rounded-full bg-raised" />
            <div className="animate-pulse h-12 w-full rounded-full bg-raised" />
          </div>
        </div>

        {/* Related section */}
        <div className="mt-16">
          <div className="animate-pulse mb-6 h-6 w-32 rounded-lg bg-raised" />
          <WallpaperGridSkeleton count={6} />
        </div>
      </div>
    </main>
  );
}
