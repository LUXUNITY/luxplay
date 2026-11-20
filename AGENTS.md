## Presentation
- Keep the membership preview separate from existing checkouts; sample passes link only to membership information and must never grant entry before real billing and staff checks exist.
- Keep the homepage membership promotion in its own live-text component with reduced-motion-aware CSS and shared membership terms, so marketing remains separate from billing and entry checks.
- Render membership tier prices and benefits from one shared typed catalog and comparison component on both pages to prevent conflicting offers.
- Render the family-support banner once above the shared route outlet, using memorial tokens and reduced-motion-aware CSS so every page shows it without duplicating page content.
- Keep Steve’s homepage tribute and permanent memorial page in one shared presentation component; memorial-specific tokens isolate its respectful appearance from promotions and booking logic.
- Keep the heated-venue promotion in its own component with CSS-only motion and reduced-motion support, so seasonal presentation stays isolated from booking logic.
- Keep seasonal coming-soon announcements in an isolated live-text component with CSS-only motion and reduced-motion support; removing a promotion must preserve paid tickets and staff check-in flows.

## Booking communication
- Send booking-change notices through the existing admin-password-protected action and transactional email queue, looking up the recipient from the booking rather than accepting an arbitrary address, so notices preserve booking records and delivery tracking.