## Presentation
- Calculate promotional daily membership equivalents in the shared client pricing helper using 30 days for monthly and 365 for yearly; label them approximate and keep the actual billed price visible to avoid implying daily billing.
- Scope playful promotional typography and CSS-only animated backgrounds through the public-page style boundary; exclude the app, staff tools, transaction screens, memorials and booking controls so presentation changes cannot compromise practical workflows.
- Keep the membership preview separate from existing checkouts; sample passes link only to membership information and must never grant entry before real billing and staff checks exist.
- Keep the homepage membership promotion in its own live-text component with reduced-motion-aware CSS and shared membership terms, so marketing remains separate from billing and entry checks.
- Render membership tier prices and benefits from one shared typed catalog and comparison component on both pages to prevent conflicting offers.
- Render the family-support banner once above the shared route outlet, using memorial tokens and reduced-motion-aware CSS so every page shows it without duplicating page content.
- Keep Steve’s homepage tribute and permanent memorial page in one shared presentation component; memorial-specific tokens isolate its respectful appearance from promotions and booking logic.
- Keep the heated-venue promotion in its own component with CSS-only motion and reduced-motion support, so seasonal presentation stays isolated from booking logic.
- Keep seasonal coming-soon announcements in an isolated live-text component with CSS-only motion and reduced-motion support; removing a promotion must preserve paid tickets and staff check-in flows.
- Use dedicated offer pages with the existing booking and credit components; redirect legacy homepage anchors to their destinations so shortening the homepage never strands existing links.
- Keep dated full-day and partial-session closures in the shared date helpers and every checkout, reward and membership map; use shared closure labels and test unaffected sessions and dates so closures never inflate paid booking counts.

## Booking communication
- Membership billing periods use shared server/client price helpers and distinct Square plan keys, defaulting existing passes to monthly; preserve the chosen period through sign-in so the displayed offer and charged amount agree while arcade allowances stay monthly.
- Send booking-change notices through the existing admin-password-protected action and transactional email queue, looking up the recipient from the booking rather than accepting an arbitrary address, so notices preserve booking records and delivery tracking.- Memberships bill through Square subscription payment links; pass status is re-checked with Square on member actions and staff scans (no webhooks), with rules in `supabase/functions/_shared/membership-rules.ts` shared by functions and tests so billing, grace and booking limits cannot drift.
