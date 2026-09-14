import { WallpaperGridSkeleton } from '@/components/skeleton';

export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1440px] px-6 py-12">
        <div className="mb-8">
          <div className="animate-pulse mb-2 h-8 w-32 rounded-lg bg-raised" />
          <div className="animate-pulse h-4 w-20 rounded-md bg-raised" />
        </div>
        <WallpaperGridSkeleton />
      </div>
    </main>
  );
}
