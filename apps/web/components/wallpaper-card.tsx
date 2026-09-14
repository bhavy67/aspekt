import Image from 'next/image';
import Link from 'next/link';
import type { Wallpaper } from '@aspekt/types';

interface WallpaperCardProps {
  wallpaper: Wallpaper;
  priority?: boolean;
}

export function WallpaperCard({ wallpaper, priority = false }: WallpaperCardProps) {
  const isPortrait = wallpaper.height > wallpaper.width;

  return (
    <Link
      href={`/wallpaper/${wallpaper.slug}`}
      className="group relative block overflow-hidden rounded-xl bg-surface"
      style={{ aspectRatio: isPortrait ? '9/16' : '16/9' }}
    >
      <Image
        src={wallpaper.thumbnail_url}
        alt={wallpaper.title}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        priority={priority}
      />

      {/* gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

      {/* title + badge on hover */}
      <div className="absolute inset-x-0 bottom-0 translate-y-1 p-3 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
        <p className="truncate text-[13px] font-semibold text-foreground">{wallpaper.title}</p>
        {wallpaper.is_free && (
          <span
            className="mt-1 inline-block rounded bg-accent-gradient px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide"
            style={{ color: '#0B0B0E' }}
          >
            Free
          </span>
        )}
      </div>
    </Link>
  );
}
