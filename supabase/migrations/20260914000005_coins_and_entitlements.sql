-- ================================================================
-- ASPEKT Phase 9 — Coins & Entitlements
-- ================================================================
-- Applied via Supabase MCP. This file is the on-disk record.

ALTER TABLE public.wallpapers
  ADD COLUMN IF NOT EXISTS coin_cost INTEGER NOT NULL DEFAULT 0;

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS coin_balance INTEGER NOT NULL DEFAULT 0;

CREATE TABLE IF NOT EXISTS public.coin_transactions (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount       integer     NOT NULL,
  reason       text        NOT NULL,
  wallpaper_id uuid        REFERENCES public.wallpapers(id) ON DELETE SET NULL,
  created_at   timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_coin_transactions_user
  ON public.coin_transactions (user_id, created_at DESC);

ALTER TABLE public.coin_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "coin_tx_owner_select" ON public.coin_transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "coin_tx_owner_insert" ON public.coin_transactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Atomic coin mutation: updates balance + inserts ledger row.
-- Raises 'insufficient_coins' if balance would go negative.
CREATE OR REPLACE FUNCTION public.mutate_coins(
  p_user_id      uuid,
  p_amount       integer,
  p_reason       text,
  p_wallpaper_id uuid DEFAULT NULL
) RETURNS integer LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_new_balance integer;
BEGIN
  UPDATE public.profiles
     SET coin_balance = coin_balance + p_amount,
         updated_at   = now()
   WHERE id = p_user_id
  RETURNING coin_balance INTO v_new_balance;

  IF v_new_balance < 0 THEN
    RAISE EXCEPTION 'insufficient_coins';
  END IF;

  INSERT INTO public.coin_transactions (user_id, amount, reason, wallpaper_id)
  VALUES (p_user_id, p_amount, p_reason, p_wallpaper_id);

  RETURN v_new_balance;
END;
$$;

-- Daily check-in: awards 5 coins once per calendar day (UTC).
CREATE OR REPLACE FUNCTION public.claim_daily_checkin(
  p_user_id uuid
) RETURNS integer LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_last_checkin timestamptz;
BEGIN
  SELECT created_at INTO v_last_checkin
    FROM public.coin_transactions
   WHERE user_id = p_user_id AND reason = 'daily_checkin'
   ORDER BY created_at DESC
   LIMIT 1;

  IF v_last_checkin IS NOT NULL AND v_last_checkin::date = CURRENT_DATE THEN
    RAISE EXCEPTION 'already_claimed_today';
  END IF;

  RETURN public.mutate_coins(p_user_id, 5, 'daily_checkin');
END;
$$;
