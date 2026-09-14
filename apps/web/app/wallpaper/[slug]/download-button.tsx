'use client';

type Props = {
  wallpaperId: string;
  wallpaperSlug: string;
  imageUrl: string;
  isPremium: boolean;
  coinCost: number;
};

export function DownloadButton({ wallpaperSlug, imageUrl }: Props) {
  const downloadUrl = `/api/download?url=${encodeURIComponent(imageUrl)}&filename=${wallpaperSlug}.jpg`;

  return (
    <a
      href={downloadUrl}
      download={`${wallpaperSlug}.jpg`}
      className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-accent-gradient px-7 text-sm font-bold shadow-glow-sm transition-all duration-150 hover:opacity-95"
      style={{ color: '#0B0B0E' }}
    >
      Download
    </a>
  );
}
