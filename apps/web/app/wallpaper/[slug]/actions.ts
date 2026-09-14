'use server';

import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export async function spendCoinsForDownload(
  wallpaperId: string,
  coinCost: number,
): Promise<
  { error: 'insufficient_coins' | 'unauthenticated' | 'unknown' } | { newBalance: number }
> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/sign-in');
  }

  const { data, error } = await supabase.rpc('mutate_coins', {
    p_user_id: user.id,
    p_amount: -coinCost,
    p_reason: 'spend_premium',
    p_wallpaper_id: wallpaperId,
  });

  if (error?.message?.includes('insufficient_coins')) return { error: 'insufficient_coins' };
  if (error) return { error: 'unknown' };

  return { newBalance: data as number };
}
