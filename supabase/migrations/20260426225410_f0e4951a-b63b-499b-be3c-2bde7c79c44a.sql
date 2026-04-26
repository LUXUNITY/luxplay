-- Restore the original soft play capacity rule (babies are no longer stored in this table)
CREATE OR REPLACE FUNCTION public.enforce_softplay_capacity()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  current_count INTEGER;
  max_capacity CONSTANT INTEGER := 40;
BEGIN
  PERFORM pg_advisory_xact_lock(
    hashtextextended(NEW.session_date::text || '|' || NEW.session_time, 0)
  );

  SELECT COUNT(*) INTO current_count
  FROM public.soft_play_bookings
  WHERE session_date = NEW.session_date
    AND session_time = NEW.session_time;

  IF current_count >= max_capacity THEN
    RAISE EXCEPTION 'SESSION_FULL: Session % at % is fully booked (% / % spots taken)',
      NEW.session_date, NEW.session_time, current_count, max_capacity
      USING ERRCODE = 'check_violation';
  END IF;

  RETURN NEW;
END;
$function$;

-- New baby soft play table
CREATE TABLE public.baby_soft_play_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  stripe_session_id TEXT NOT NULL,
  booking_code TEXT NOT NULL,
  session_date DATE NOT NULL,
  session_time TEXT NOT NULL,
  parent_name TEXT NOT NULL,
  parent_email TEXT NOT NULL,
  parent_phone TEXT,
  amount_paid INTEGER NOT NULL DEFAULT 300,
  currency TEXT NOT NULL DEFAULT 'gbp',
  checked_in BOOLEAN NOT NULL DEFAULT false,
  checked_in_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_baby_softplay_session ON public.baby_soft_play_bookings(session_date, session_time);
CREATE INDEX idx_baby_softplay_stripe ON public.baby_soft_play_bookings(stripe_session_id);

ALTER TABLE public.baby_soft_play_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read baby bookings"
  ON public.baby_soft_play_bookings
  FOR SELECT
  USING (true);

CREATE POLICY "Service role can insert baby bookings"
  ON public.baby_soft_play_bookings
  FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role can update baby bookings"
  ON public.baby_soft_play_bookings
  FOR UPDATE
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Capacity trigger: 15 babies max per session
CREATE OR REPLACE FUNCTION public.enforce_baby_softplay_capacity()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  current_count INTEGER;
  max_capacity CONSTANT INTEGER := 15;
BEGIN
  PERFORM pg_advisory_xact_lock(
    hashtextextended('baby|' || NEW.session_date::text || '|' || NEW.session_time, 0)
  );

  SELECT COUNT(*) INTO current_count
  FROM public.baby_soft_play_bookings
  WHERE session_date = NEW.session_date
    AND session_time = NEW.session_time;

  IF current_count >= max_capacity THEN
    RAISE EXCEPTION 'SESSION_FULL: Baby session % at % is fully booked (% / % babies)',
      NEW.session_date, NEW.session_time, current_count, max_capacity
      USING ERRCODE = 'check_violation';
  END IF;

  RETURN NEW;
END;
$function$;

CREATE TRIGGER enforce_baby_softplay_capacity_trigger
  BEFORE INSERT ON public.baby_soft_play_bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_baby_softplay_capacity();