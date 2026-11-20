# Make LuxPlay Memberships live

## What customers will get
- Pick **Little Lux £24.99**, **Lux Plus £34.99** or **Lux VIP £49.99** on the Memberships page.
- Create a free LuxPlay account, enter the **child's name and date of birth** (one pass per named child), then pay monthly by card through **Square** (same as current checkouts). They're charged automatically every month until they cancel.
- After paying they get a **membership QR pass** in their account and by email.
- Members **book sessions free** online (counts against the normal 40-space limit), up to **1 upcoming booking per child at a time** so spaces stay fair. They can also walk in if there's space.
- Grown-ups free, as now. Lux Plus/VIP perks are shown on the pass: café discount (10% / 20%) and monthly arcade credits (200 / 600).

## Staff
- Scanning the membership QR in the existing staff scanner shows: child's name, tier, **ACTIVE / SUSPENDED**, today's booking, café discount, and credits left this month, with a button to mark credits given.
- One check-in per child per session, so one pass can't bring in 10 kids.

## Missed payments
- Payment fails → 24 hours to fix it → pass shows **SUSPENDED** (no entry, no booking). Paying again reactivates the same pass and QR.
- Payment status is checked directly with Square when staff scan and when members book (no webhooks, in line with how the site already works).

## Cancelling
- Members can cancel from their account; the pass stays active until the end of the paid month.

## Test first
- Built and tested with Square **test** payments, then switched to live. You'll do one real £24.99 sign-up yourself before announcing it.

## Technical details
- New tables: `memberships` (user, child name, DOB, tier, Square customer/subscription/card ids, status, period end, credits used), `membership_checkins`. GRANTs + RLS scoped to owner; staff via existing admin-action.
- Square Subscriptions API: catalog subscription plans for the three tiers (GBP monthly), card-on-file via Web Payments SDK, edge functions `create-membership`, `membership-status` (Square lookup + 24h grace), `cancel-membership`, `book-member-session`, staff actions added to `admin-action`.
- Tier prices read from shared `src/lib/membership.ts`; tests for prices, 24h grace, one-booking-per-child, one-check-in-per-session.
- Existing paid booking/checkout flows untouched.
