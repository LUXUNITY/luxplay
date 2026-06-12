DROP VIEW IF EXISTS public.soft_play_availability;
DROP VIEW IF EXISTS public.baby_soft_play_availability;

CREATE VIEW public.soft_play_availability
WITH (security_barrier=on) AS
SELECT
  session_date,
  session_time,
  count(*)::integer AS booked_count
FROM public.soft_play_bookings
GROUP BY session_date, session_time;

CREATE VIEW public.baby_soft_play_availability
WITH (security_barrier=on) AS
SELECT
  session_date,
  session_time,
  count(*)::integer AS booked_count
FROM public.baby_soft_play_bookings
GROUP BY session_date, session_time;

GRANT SELECT ON public.soft_play_availability TO anon, authenticated;
GRANT SELECT ON public.baby_soft_play_availability TO anon, authenticated;
GRANT ALL ON public.soft_play_availability TO service_role;
GRANT ALL ON public.baby_soft_play_availability TO service_role;

REVOKE SELECT ON public.soft_play_bookings FROM anon, authenticated;
REVOKE SELECT ON public.baby_soft_play_bookings FROM anon, authenticated;
GRANT ALL ON public.soft_play_bookings TO service_role;
GRANT ALL ON public.baby_soft_play_bookings TO service_role;