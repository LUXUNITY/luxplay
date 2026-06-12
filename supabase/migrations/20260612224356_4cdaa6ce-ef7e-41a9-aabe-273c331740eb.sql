DROP VIEW IF EXISTS public.soft_play_availability;
DROP VIEW IF EXISTS public.baby_soft_play_availability;

CREATE TABLE public.soft_play_availability (
  session_date date NOT NULL,
  session_time text NOT NULL,
  booked_count integer NOT NULL DEFAULT 0,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  PRIMARY KEY (session_date, session_time)
);
GRANT SELECT ON public.soft_play_availability TO anon, authenticated;
GRANT ALL ON public.soft_play_availability TO service_role;
ALTER TABLE public.soft_play_availability ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read soft play availability"
  ON public.soft_play_availability FOR SELECT
  TO anon, authenticated
  USING (true);
CREATE POLICY "Service role can manage soft play availability"
  ON public.soft_play_availability FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE TABLE public.baby_soft_play_availability (
  session_date date NOT NULL,
  session_time text NOT NULL,
  booked_count integer NOT NULL DEFAULT 0,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  PRIMARY KEY (session_date, session_time)
);
GRANT SELECT ON public.baby_soft_play_availability TO anon, authenticated;
GRANT ALL ON public.baby_soft_play_availability TO service_role;
ALTER TABLE public.baby_soft_play_availability ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read baby soft play availability"
  ON public.baby_soft_play_availability FOR SELECT
  TO anon, authenticated
  USING (true);
CREATE POLICY "Service role can manage baby soft play availability"
  ON public.baby_soft_play_availability FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

INSERT INTO public.soft_play_availability (session_date, session_time, booked_count)
SELECT session_date, session_time, count(*)::integer
FROM public.soft_play_bookings
GROUP BY session_date, session_time
ON CONFLICT (session_date, session_time) DO UPDATE
SET booked_count = EXCLUDED.booked_count,
    updated_at = now();

INSERT INTO public.baby_soft_play_availability (session_date, session_time, booked_count)
SELECT session_date, session_time, count(*)::integer
FROM public.baby_soft_play_bookings
GROUP BY session_date, session_time
ON CONFLICT (session_date, session_time) DO UPDATE
SET booked_count = EXCLUDED.booked_count,
    updated_at = now();

CREATE OR REPLACE FUNCTION public.sync_softplay_availability()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.soft_play_availability (session_date, session_time, booked_count, updated_at)
    VALUES (NEW.session_date, NEW.session_time, 1, now())
    ON CONFLICT (session_date, session_time) DO UPDATE
    SET booked_count = public.soft_play_availability.booked_count + 1,
        updated_at = now();
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.soft_play_availability
    SET booked_count = greatest(booked_count - 1, 0),
        updated_at = now()
    WHERE session_date = OLD.session_date
      AND session_time = OLD.session_time;
    RETURN OLD;
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.session_date IS DISTINCT FROM NEW.session_date OR OLD.session_time IS DISTINCT FROM NEW.session_time THEN
      UPDATE public.soft_play_availability
      SET booked_count = greatest(booked_count - 1, 0),
          updated_at = now()
      WHERE session_date = OLD.session_date
        AND session_time = OLD.session_time;

      INSERT INTO public.soft_play_availability (session_date, session_time, booked_count, updated_at)
      VALUES (NEW.session_date, NEW.session_time, 1, now())
      ON CONFLICT (session_date, session_time) DO UPDATE
      SET booked_count = public.soft_play_availability.booked_count + 1,
          updated_at = now();
    END IF;
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$;

CREATE OR REPLACE FUNCTION public.sync_baby_softplay_availability()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.baby_soft_play_availability (session_date, session_time, booked_count, updated_at)
    VALUES (NEW.session_date, NEW.session_time, 1, now())
    ON CONFLICT (session_date, session_time) DO UPDATE
    SET booked_count = public.baby_soft_play_availability.booked_count + 1,
        updated_at = now();
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.baby_soft_play_availability
    SET booked_count = greatest(booked_count - 1, 0),
        updated_at = now()
    WHERE session_date = OLD.session_date
      AND session_time = OLD.session_time;
    RETURN OLD;
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.session_date IS DISTINCT FROM NEW.session_date OR OLD.session_time IS DISTINCT FROM NEW.session_time THEN
      UPDATE public.baby_soft_play_availability
      SET booked_count = greatest(booked_count - 1, 0),
          updated_at = now()
      WHERE session_date = OLD.session_date
        AND session_time = OLD.session_time;

      INSERT INTO public.baby_soft_play_availability (session_date, session_time, booked_count, updated_at)
      VALUES (NEW.session_date, NEW.session_time, 1, now())
      ON CONFLICT (session_date, session_time) DO UPDATE
      SET booked_count = public.baby_soft_play_availability.booked_count + 1,
          updated_at = now();
    END IF;
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$;

DROP TRIGGER IF EXISTS enforce_softplay_capacity_trigger ON public.soft_play_bookings;
CREATE TRIGGER enforce_softplay_capacity_trigger
  BEFORE INSERT ON public.soft_play_bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_softplay_capacity();

DROP TRIGGER IF EXISTS sync_softplay_availability_trigger ON public.soft_play_bookings;
CREATE TRIGGER sync_softplay_availability_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.soft_play_bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_softplay_availability();

DROP TRIGGER IF EXISTS enforce_baby_softplay_capacity_trigger ON public.baby_soft_play_bookings;
CREATE TRIGGER enforce_baby_softplay_capacity_trigger
  BEFORE INSERT ON public.baby_soft_play_bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_baby_softplay_capacity();

DROP TRIGGER IF EXISTS sync_baby_softplay_availability_trigger ON public.baby_soft_play_bookings;
CREATE TRIGGER sync_baby_softplay_availability_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.baby_soft_play_bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_baby_softplay_availability();