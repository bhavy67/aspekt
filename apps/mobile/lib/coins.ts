import { supabase } from './supabase';
import { COIN_REWARDS } from '@aspekt/core';

export async function getCoinBalance(userId: string): Promise<number> {
  const { data } = await supabase.from('profiles').select('coin_balance').eq('id', userId).single();
  return data?.coin_balance ?? 0;
}

export async function awardCoins(
  userId: string,
  reason: keyof typeof COIN_REWARDS,
  wallpaperId?: string,
): Promise<number> {
  const { data, error } = await supabase.rpc('mutate_coins', {
    p_user_id: userId,
    p_amount: COIN_REWARDS[reason],
    p_reason: reason,
    p_wallpaper_id: wallpaperId ?? null,
  });
  if (error) throw error;
  return data as number;
}

export async function spendCoins(
  userId: string,
  amount: number,
  wallpaperId: string,
): Promise<number> {
  const { data, error } = await supabase.rpc('mutate_coins', {
    p_user_id: userId,
    p_amount: -amount,
    p_reason: 'spend_premium',
    p_wallpaper_id: wallpaperId,
  });
  if (error) throw error;
  return data as number;
}

export async function claimDailyCheckin(userId: string): Promise<number> {
  const { data, error } = await supabase.rpc('claim_daily_checkin', {
    p_user_id: userId,
  });
  if (error) throw error;
  return data as number;
}

export async function hasClaimedToday(userId: string): Promise<boolean> {
  const today = new Date().toISOString().split('T')[0];
  const { data } = await supabase
    .from('coin_transactions')
    .select('id')
    .eq('user_id', userId)
    .eq('reason', 'daily_checkin')
    .gte('created_at', `${today}T00:00:00.000Z`)
    .limit(1);
  return (data?.length ?? 0) > 0;
}
