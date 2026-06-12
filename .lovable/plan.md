## Goal
Rip out Stripe entirely. Replace with Square (faster payouts — next business day vs Stripe's 2–7 days) across all three payment flows: credit packs, soft play, baby soft play.

## What changes

### 1. Square account setup (you do this)
- Create products + prices in Square Dashboard, OR let the code create payment links on the fly (recommended — simpler, no price IDs to wire up).
- Generate a **Production Access Token** and grab your **Location ID** from Square Dashboard → Developer → Applications.
- I'll ask for `SQUARE_ACCESS_TOKEN` and `SQUARE_LOCATION_ID` as secrets when ready.
- Sandbox token first for testing, then swap to production.

### 2. Replace 3 edge functions (create-checkout)
Rewrite using Square's **Checkout API → Quick Pay**, which creates a hosted payment link (Stripe Checkout equivalent):
- `create-checkout` → 8 credit packages (£/credits hardcoded in function, no more `price_xxx` IDs)
- `create-softplay-checkout` → £4 opening / £7.20 standard, keeps capacity check
- `create-baby-softplay-checkout` → £2 opening / £3.60 standard, keeps capacity check

Each returns a `checkout_url` we redirect to. Success URL routing (`/payment-success`, `/softplay-success`, `/baby-softplay-success`) stays the same.

### 3. Replace 3 verify functions
- `verify-payment`, `verify-softplay-payment`, `verify-baby-softplay-payment`
- Square returns an `order_id` on the success redirect (not a session ID). We call `Orders.retrieveOrder` + `Payments.listPayments` to confirm `COMPLETED` state, then insert into `orders` / `soft_play_bookings` / `baby_soft_play_bookings` exactly as today.

### 4. Database migration
- Rename `stripe_session_id` → `payment_reference` on `orders`, `soft_play_bookings`, `baby_soft_play_bookings` (keeps old Stripe orders intact, new Square orders use same column).
- No data loss — existing rows keep their Stripe session IDs in that column.

### 5. Frontend
- `PreSaleSection.tsx`, `SoftPlaySection.tsx`, `BabySoftPlaySection.tsx`: success pages already read `?session_id=…` — swap to `?order_id=…` from Square redirect. Minimal change.
- Admin dashboard (`/admin`): no change, still reads `orders` table.

### 6. Remove Stripe
- Delete Stripe imports from all 6 edge functions.
- Leave `STRIPE_SECRET_KEY` secret in place for now (harmless, can be deleted later).
- Stripe Dashboard: you'll want to cancel any pending payouts and disable the account separately — I can't do that for you.

## Risks / things to know
- **Square sandbox ≠ production.** We'll test in sandbox first; you'll need to add the production token before going live.
- **Refunds**: existing Stripe orders refund via Stripe Dashboard. New Square orders refund via Square Dashboard. Two separate refund queues until the old Stripe orders are all consumed/expired.
- **Receipts**: Square auto-sends a payment receipt by email — same UX as Stripe.
- **Apple Pay / Google Pay** are enabled by default on Square Checkout — no extra config.

## What I need from you to start
1. Confirm this plan.
2. A Square **sandbox** access token + location ID (I'll request as secrets when you confirm). We test end-to-end, then swap to production tokens.