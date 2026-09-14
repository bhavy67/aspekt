function SkeletonBox({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-xl bg-raised ${className ?? ''}`} />;
}

export function WallpaperCardSkeleton() {
  return <SkeletonBox className="aspect-video w-full" />;
}

export function WallpaperGridSkeleton({ count = 18 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {Array.from({ length: count }).map((_, i) => (
        <WallpaperCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function PageHeaderSkeleton() {
  return (
    <div className="mb-8">
      <SkeletonBox className="mb-2 h-8 w-48 rounded-lg" />
      <SkeletonBox className="h-4 w-24 rounded-md" />
    </div>
  );
}

export function FilterChipsSkeleton() {
  return (
    <div className="mb-8 flex flex-wrap gap-2">
      {Array.from({ length: 10 }).map((_, i) => (
        <SkeletonBox key={i} className="h-7 w-20 rounded-full" />
      ))}
    </div>
  );
}

export function CollectionGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonBox key={i} className="aspect-video w-full rounded-2xl" />
      ))}
    </div>
  );
}
