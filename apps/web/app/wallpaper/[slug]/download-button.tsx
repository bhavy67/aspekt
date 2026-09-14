'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/button';
import { createSupabaseBrowserClient } from '@/lib/supabase-browser';
import { spendCoinsForDownload } from './actions';

const supabase = createSupabaseBrowserClient();

type Props = {
  wallpaperId: string;
  wallpaperSlug: string;
  imageUrl: string;
  isPremium: boolean;
  coinCost: number;
};

export function DownloadButton({
  wallpaperId,
  wallpaperSlug,
  imageUrl,
  isPremium,
  coinCost,
}: Props) {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [coinBalance, setCoinBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [spent, setSpent] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return;
      setUserId(data.user.id);
      const { data: profile } = await supabase
        .from('profiles')
        .select('coin_balance')
        .eq('id', data.user.id)
        .single();
      setCoinBalance(profile?.coin_balance ?? 0);
    });
  }, []);

  if (!isPremium || coinCost === 0 || spent) {
    return (
      <a href={imageUrl} download={`${wallpaperSlug}.jpg`} target="_blank" rel="noreferrer">
        <Button variant="primary" size="lg" className="w-full">
          {spent ? `Downloaded (balance: ${coinBalance})` : 'Download Free'}
        </Button>
      </a>
    );
  }

  if (!userId) {
    return (
      <Button
        variant="primary"
        size="lg"
        className="w-full"
        onClick={() => router.push(`/auth/sign-in?next=/wallpaper/${wallpaperSlug}`)}
      >
        Sign in to Download · {coinCost} coins
      </Button>
    );
  }

  if (coinBalance !== null && coinBalance < coinCost) {
    return (
      <Button
        variant="secondary"
        size="lg"
        className="w-full"
        onClick={() => router.push('/account/coins')}
      >
        Not enough coins · Earn more
      </Button>
    );
  }

  async function handleSpend() {
    setLoading(true);
    const result = await spendCoinsForDownload(wallpaperId, coinCost);
    setLoading(false);
    if ('error' in result) {
      if (result.error === 'insufficient_coins') {
        setCoinBalance(0);
      }
      return;
    }
    setCoinBalance(result.newBalance);
    setSpent(true);
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = `${wallpaperSlug}.jpg`;
    a.target = '_blank';
    a.click();
  }

  return (
    <Button variant="primary" size="lg" className="w-full" onClick={handleSpend} disabled={loading}>
      {loading ? 'Processing…' : `Download · ${coinCost} coins`}
    </Button>
  );
}
