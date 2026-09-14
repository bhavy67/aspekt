'use client';

import { Button } from '@/components/button';

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
    <a href={downloadUrl} download={`${wallpaperSlug}.jpg`}>
      <Button variant="primary" size="lg" className="w-full">
        Download
      </Button>
    </a>
  );
}
