CREATE OR REPLACE FUNCTION public.enforce_softplay_capacity()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  current_count INTEGER;
  max_capacity INTEGER := 40;
BEGIN
  -- Special event sessions (e.g. Halloween 4PM–9PM) have their own larger cap
  IF NEW.session_time = 'HALLOWEEN' THEN
    max_capacity := 100;
  END IF;

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