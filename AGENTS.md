## Presentation
- Keep the heated-venue promotion in its own component with CSS-only motion and reduced-motion support, so seasonal presentation stays isolated from booking logic.

## Booking communication
- Send booking-change notices through the existing admin-password-protected action and transactional email queue, looking up the recipient from the booking rather than accepting an arbitrary address, so notices preserve booking records and delivery tracking.