
DROP POLICY IF EXISTS "Anyone can read orders by stripe session" ON public.orders;
DROP POLICY IF EXISTS "Anyone can read bookings" ON public.soft_play_bookings;
DROP POLICY IF EXISTS "Anyone can read baby bookings" ON public.baby_soft_play_bookings;

REVOKE SELECT ON public.orders FROM anon, authenticated;
REVOKE SELECT ON public.soft_play_bookings FROM anon, authenticated;
REVOKE SELECT ON public.baby_soft_play_bookings FROM anon, authenticated;

CREATE POLICY "Service role can read orders"
  ON public.orders FOR SELECT
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role can read bookings"
  ON public.soft_play_bookings FOR SELECT
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role can read baby bookings"
  ON public.baby_soft_play_bookings FOR SELECT
  USING (auth.role() = 'service_role');
