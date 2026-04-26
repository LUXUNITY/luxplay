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
  -- Babies (under 2) do NOT count toward the per-session capacity.
  -- Baby rows are stored with child_name like "Baby 1", "Baby 2", etc.
  IF NEW.child_name LIKE 'Baby%' THEN
    RETURN NEW;
  END IF;

  PERFORM pg_advisory_xact_lock(
    hashtextextended(NEW.session_date::text || '|' || NEW.session_time, 0)
  );

  -- Count only paying children, not babies
  SELECT COUNT(*) INTO current_count
  FROM public.soft_play_bookings
  WHERE session_date = NEW.session_date
    AND session_time = NEW.session_time
    AND child_name NOT LIKE 'Baby%';

  IF current_count >= max_capacity THEN
    RAISE EXCEPTION 'SESSION_FULL: Session % at % is fully booked (% / % spots taken)',
      NEW.session_date, NEW.session_time, current_count, max_capacity
      USING ERRCODE = 'check_violation';
  END IF;

  RETURN NEW;
END;
$function$;