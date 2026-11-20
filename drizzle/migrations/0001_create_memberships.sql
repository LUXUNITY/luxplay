CREATE TABLE public.memberships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  parent_name text NOT NULL,
  parent_email text NOT NULL,
  parent_phone text,
  child_name text NOT NULL,
  child_dob date,
  tier text NOT NULL,
  pass_code text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'pending',
  square_order_id text,
  square_customer_id text,
  square_subscription_id text,
  paid_until date,
  payment_issue_since timestamptz,
  credits_month text,
  credits_given integer NOT NULL DEFAULT 0,
  cancel_requested boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.memberships TO authenticated;
GRANT ALL ON public.memberships TO service_role;
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Parents view own memberships" ON public.memberships FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE INDEX memberships_user_idx ON public.memberships(user_id);

CREATE TABLE public.membership_checkins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  membership_id uuid NOT NULL REFERENCES public.memberships(id) ON DELETE CASCADE,
  session_date date NOT NULL,
  session_time text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (membership_id, session_date, session_time)
);
GRANT ALL ON public.membership_checkins TO service_role;
ALTER TABLE public.membership_checkins ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.membership_square_plans (
  tier text PRIMARY KEY,
  plan_id text NOT NULL,
  variation_id text NOT NULL,
  price_pence integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.membership_square_plans TO service_role;
ALTER TABLE public.membership_square_plans ENABLE ROW LEVEL SECURITY;