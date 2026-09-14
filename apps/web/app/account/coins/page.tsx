'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createSupabaseBrowserClient } from '@/lib/supabase-browser';

const supabase = createSupabaseBrowserClient();

const EARN_ACTIONS = [
  { label: 'Daily Check-in', desc: 'Claim once per day from the mobile app', coins: 5 },
  { label: 'Share a Wallpaper', desc: 'Use the share button in the mobile app', coins: 3 },
  { label: 'Apply a Wallpaper', desc: 'Save a wallpaper to Photos in the mobile app', coins: 1 },
];

export default function CoinsPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [claimed, setClaimed] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [claimError, setClaimError] = useState('');

  const load = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.push('/auth/sign-in?next=/account/coins');
      return;
    }
    setUserId(user.id);
    const { data: profile } = await supabase
      .from('profiles')
      .select('coin_balance')
      .eq('id', user.id)
      .single();
    setBalance(profile?.coin_balance ?? 0);

    const today = new Date().toISOString().split('T')[0];
    const { data: tx } = await supabase
      .from('coin_transactions')
      .select('id')
      .eq('user_id', user.id)
      .eq('reason', 'daily_checkin')
      .gte('created_at', `${today}T00:00:00.000Z`)
      .limit(1);
    setClaimed((tx?.length ?? 0) > 0);
  }, [router]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleClaim() {
    if (!userId || claiming || claimed) return;
    setClaiming(true);
    setClaimError('');
    const { data, error } = await supabase.rpc('claim_daily_checkin', { p_user_id: userId });
    setClaiming(false);
    if (error?.message?.includes('already_claimed_today')) {
      setClaimed(true);
      return;
    }
    if (error) {
      setClaimError('Could not claim. Try again.');
      return;
    }
    setBalance(data as number);
    setClaimed(true);
  }

  return (
    <main className="mx-auto max-w-lg px-6 py-12">
      <div className="mb-6 flex items-center gap-3">
        <Link href="/account" className="text-sm text-muted hover:text-foreground">
          ← Account
        </Link>
        <span className="text-muted">/</span>
        <span className="text-sm text-foreground">Coins</span>
      </div>

      <h1 className="mb-8 text-2xl font-700 text-foreground">Coins</h1>

      {/* Balance */}
      <div className="mb-6 rounded-2xl border border-[rgba(129,140,248,0.25)] bg-[rgba(129,140,248,0.08)] p-8 text-center">
        <p className="text-5xl font-800 text-accent">{balance === null ? '—' : balance}</p>
        <p className="mt-2 text-sm text-muted">coins available</p>
      </div>

      {/* Daily claim */}
      <div className="mb-2 flex items-center justify-between rounded-xl border border-border bg-surface p-4">
        <div>
          <p className="text-sm font-600 text-foreground">Daily Check-in</p>
          <p className="text-xs text-muted">+5 coins · once per day</p>
        </div>
        <button
          onClick={handleClaim}
          disabled={claimed || claiming}
          className="rounded-lg bg-accent-gradient px-4 py-2 text-xs font-700 uppercase tracking-widest disabled:opacity-50"
          style={{ color: '#0B0B0E' }}
        >
          {claiming ? '…' : claimed ? '✓ Claimed' : 'Claim'}
        </button>
      </div>
      {claimError && <p className="mb-4 text-xs text-red-400">{claimError}</p>}

      {/* Earn table */}
      <h2 className="mb-3 mt-8 text-xs font-600 uppercase tracking-widest text-muted">
        How to Earn
      </h2>
      <div className="flex flex-col gap-2">
        {EARN_ACTIONS.map((a) => (
          <div
            key={a.label}
            className="flex items-center justify-between rounded-xl border border-border bg-surface p-4"
          >
            <div>
              <p className="text-sm font-600 text-foreground">{a.label}</p>
              <p className="text-xs text-muted">{a.desc}</p>
            </div>
            <span className="rounded-lg bg-[rgba(129,140,248,0.15)] px-3 py-1 text-xs font-700 text-accent">
              +{a.coins}
            </span>
          </div>
        ))}
      </div>

      {/* Spend info */}
      <h2 className="mb-3 mt-8 text-xs font-600 uppercase tracking-widest text-muted">
        How to Spend
      </h2>
      <div className="rounded-xl border border-border bg-surface p-4">
        <p className="text-sm font-600 text-foreground">Premium Wallpapers</p>
        <p className="mt-1 text-xs text-muted">
          Unlock premium wallpapers with coins. Each premium wallpaper shows its coin cost on the
          detail page.
        </p>
      </div>
    </main>
  );
}
