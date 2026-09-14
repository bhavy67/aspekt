-- iap_purchases: records every credited in-app purchase.
-- The unique constraint on transaction_id prevents double-crediting the same receipt.
CREATE TABLE public.iap_purchases (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          uuid        NOT NULL REFERENCES auth.users(id),
  transaction_id   text        NOT NULL UNIQUE,
  product_id       text        NOT NULL,
  coins_credited   integer     NOT NULL,
  created_at       timestamptz DEFAULT now()
);

ALTER TABLE public.iap_purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "owner_select" ON public.iap_purchases
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "owner_insert" ON public.iap_purchases
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Atomically record purchase and credit coins.
-- Raises a unique_violation if transaction_id was already credited (safe no-op for retries).
CREATE OR REPLACE FUNCTION public.record_iap_purchase(
  p_user_id        uuid,
  p_transaction_id text,
  p_product_id     text,
  p_coins          integer
) RETURNS integer LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_new_balance integer;
BEGIN
  INSERT INTO public.iap_purchases (user_id, transaction_id, product_id, coins_credited)
  VALUES (p_user_id, p_transaction_id, p_product_id, p_coins);

  UPDATE public.profiles
  SET coin_balance = coin_balance + p_coins
  WHERE id = p_user_id
  RETURNING coin_balance INTO v_new_balance;

  INSERT INTO public.coin_transactions (user_id, amount, reason)
  VALUES (p_user_id, p_coins, 'iap_purchase');

  RETURN v_new_balance;
END;
$$;
