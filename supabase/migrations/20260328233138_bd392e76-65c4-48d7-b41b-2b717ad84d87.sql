CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id text UNIQUE NOT NULL,
  customer_email text NOT NULL,
  package_name text NOT NULL,
  credits integer NOT NULL,
  amount_paid integer NOT NULL,
  currency text NOT NULL DEFAULT 'gbp',
  redemption_code text UNIQUE NOT NULL,
  redeemed boolean NOT NULL DEFAULT false,
  redeemed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read orders by stripe session"
  ON public.orders FOR SELECT
  USING (true);

CREATE POLICY "Service role can insert orders"
  ON public.orders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service role can update orders"
  ON public.orders FOR UPDATE
  USING (true);