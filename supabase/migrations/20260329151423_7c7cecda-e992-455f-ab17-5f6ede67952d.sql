CREATE TABLE public.soft_play_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_time text NOT NULL,
  session_date date NOT NULL,
  child_name text NOT NULL,
  parent_name text NOT NULL,
  parent_email text NOT NULL,
  parent_phone text,
  amount_paid integer NOT NULL DEFAULT 250,
  currency text NOT NULL DEFAULT 'gbp',
  stripe_session_id text NOT NULL,
  booking_code text NOT NULL,
  checked_in boolean NOT NULL DEFAULT false,
  checked_in_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(stripe_session_id)
);

ALTER TABLE public.soft_play_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read bookings" ON public.soft_play_bookings FOR SELECT USING (true);
CREATE POLICY "Service role can insert bookings" ON public.soft_play_bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role can update bookings" ON public.soft_play_bookings FOR UPDATE USING (true);