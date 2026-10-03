// Halloween Spooktacular event — mirrored in supabase/functions/create-halloween-checkout
export const HALLOWEEN_SESSION = "HALLOWEEN";
export const HALLOWEEN_PRICE = 19.99;
export const HALLOWEEN_CAPACITY = 100;
export const HALLOWEEN_MAX_PER_BOOKING = 8;
export const HALLOWEEN_NIGHTS = [
  { iso: "2026-10-30", weekday: "FRI", day: 30, label: "Friday 30th" },
  { iso: "2026-10-31", weekday: "SAT", day: 31, label: "Saturday 31st" },
];
// Doors open 4PM on the 30th (UK time, BST)
export const HALLOWEEN_START = new Date("2026-10-30T16:00:00+01:00");
