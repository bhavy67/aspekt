import {
  FilterChipsSkeleton,
  PageHeaderSkeleton,
  WallpaperGridSkeleton,
} from '@/components/skeleton';

export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1440px] px-6 py-12">
        <PageHeaderSkeleton />
        <FilterChipsSkeleton />
        <WallpaperGridSkeleton />
      </div>
    </main>
  );
}
