ALTER TABLE public.soft_play_bookings ADD COLUMN IF NOT EXISTS user_id uuid;
ALTER TABLE public.baby_soft_play_bookings ADD COLUMN IF NOT EXISTS user_id uuid;

CREATE TABLE IF NOT EXISTS public.loyalty_stamps (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  source text NOT NULL DEFAULT 'softplay',
  booking_code text,
  session_date date,
  consumed boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS loyalty_stamps_booking_code_key ON public.loyalty_stamps (booking_code) WHERE booking_code IS NOT NULL;
CREATE INDEX IF NOT EXISTS loyalty_stamps_user_idx ON public.loyalty_stamps (user_id, consumed);

GRANT SELECT ON public.loyalty_stamps TO authenticated;
GRANT ALL ON public.loyalty_stamps TO service_role;
ALTER TABLE public.loyalty_stamps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own stamps" ON public.loyalty_stamps FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.loyalty_redemptions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  booking_code text NOT NULL,
  session_date date NOT NULL,
  session_time text NOT NULL,
  reward_type text NOT NULL DEFAULT 'free-softplay',
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS loyalty_redemptions_user_idx ON public.loyalty_redemptions (user_id);

GRANT SELECT ON public.loyalty_redemptions TO authenticated;
GRANT ALL ON public.loyalty_redemptions TO service_role;
ALTER TABLE public.loyalty_redemptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own rewards" ON public.loyalty_redemptions FOR SELECT TO authenticated USING (auth.uid() = user_id);