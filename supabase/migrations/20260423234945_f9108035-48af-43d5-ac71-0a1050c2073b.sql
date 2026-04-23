-- Hard capacity guard for soft play bookings
-- Prevents overbooking even under simultaneous concurrent inserts.

CREATE OR REPLACE FUNCTION public.enforce_softplay_capacity()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_count INTEGER;
  max_capacity CONSTANT INTEGER := 40;
BEGIN
  -- Lock all rows for this session so concurrent inserts are serialized.
  -- pg_advisory_xact_lock takes a lock keyed on date+time hash for the
  -- duration of the transaction, blocking any other insert for the same
  -- session until this one commits or rolls back.
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
$$;

DROP TRIGGER IF EXISTS softplay_capacity_check ON public.soft_play_bookings;

CREATE TRIGGER softplay_capacity_check
BEFORE INSERT ON public.soft_play_bookings
FOR EACH ROW
EXECUTE FUNCTION public.enforce_softplay_capacity();

-- Helpful index for the capacity COUNT query
CREATE INDEX IF NOT EXISTS soft_play_bookings_session_idx
  ON public.soft_play_bookings (session_date, session_time);