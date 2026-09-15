import Image from 'next/image';
import Link from 'next/link';
import type { Wallpaper } from '@aspekt/types';

interface WallpaperCardProps {
  wallpaper: Wallpaper;
  priority?: boolean;
}

export function WallpaperCard({ wallpaper, priority = false }: WallpaperCardProps) {
  const isNew = new Date(wallpaper.published_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  return (
    <Link
      href={`/wallpaper/${wallpaper.slug}`}
      className="group relative block overflow-hidden rounded-[20px] bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
      style={{ aspectRatio: '9/16' }}
    >
      <Image
        src={wallpaper.thumbnail_url}
        alt={wallpaper.title}
        fill
        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        priority={priority}
        unoptimized
      />

      {/* Permanent subtle vignette at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* New badge */}
      {isNew && (
        <div className="absolute left-2.5 top-2.5">
          <span className="rounded-full bg-accent-gradient px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-[#0B0B0E]">
            New
          </span>
        </div>
      )}

      {/* Title pill — always visible */}
      <div className="absolute inset-x-2.5 bottom-2.5">
        <div className="rounded-[10px] bg-black/50 px-2.5 py-1.5 backdrop-blur-md">
          <p className="truncate text-[11px] font-semibold leading-none text-white">
            {wallpaper.title}
          </p>
        </div>
      </div>
    </Link>
  );
}
