// Shared date + time-slot helpers for Soft Play & Baby Soft Play

export const OPENING_DATE = "2026-05-30"; // Sat 30 May 2026 — soft play opens
export const NEW_SCHEDULE_FROM = "2026-06-01"; // Mon 1 Jun 2026 onwards
export const BOOKING_WINDOW_DAYS = 14; // Max 2 weeks ahead

// Pre-June slots (25–31 May 2026) — shorter hourly sessions during launch period
const OPENING_SLOTS = [
  { time: "10:00", label: "10AM" },
  { time: "12:00", label: "12PM" },
  { time: "14:00", label: "2PM" },
  { time: "16:00", label: "4PM" },
  { time: "18:00", label: "6PM" },
  { time: "20:00", label: "8PM" },
];

// From 25 May 2026 onwards
const STANDARD_SLOTS = [
  { time: "09:00", label: "9–11AM" },
  { time: "11:00", label: "11–1PM" },
  { time: "13:00", label: "1–3PM" },
  { time: "15:00", label: "3–5PM" },
  { time: "17:00", label: "5–7PM" },
  { time: "19:00", label: "7–9PM" },
];

export const getSlotsForDate = (dateISO: string) => {
  return dateISO < NEW_SCHEDULE_FROM ? OPENING_SLOTS : STANDARD_SLOTS;
};

// Pricing helpers — opening weekend = 50% off launch price; weekdays onwards = 10% online discount
export const getSoftPlayPrice = (dateISO: string) =>
  dateISO < NEW_SCHEDULE_FROM ? 4 : 7.2;
export const getBabyPrice = (dateISO: string) =>
  dateISO < NEW_SCHEDULE_FROM ? 2 : 3.6;
export const getSoftPlayFullPrice = (dateISO: string) =>
  dateISO < NEW_SCHEDULE_FROM ? 8 : 8;
export const getBabyFullPrice = (dateISO: string) =>
  dateISO < NEW_SCHEDULE_FROM ? 4 : 4;
export const isOpeningWeekend = (dateISO: string) => dateISO < NEW_SCHEDULE_FROM;

const pad = (n: number) => String(n).padStart(2, "0");
const toISO = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

// Returns up to BOOKING_WINDOW_DAYS dates starting from max(today, OPENING_DATE)
export const getAvailableDates = (): { iso: string; date: Date }[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const opening = new Date(OPENING_DATE + "T00:00:00");
  const start = today > opening ? today : opening;

  const dates: { iso: string; date: Date }[] = [];
  for (let i = 0; i < BOOKING_WINDOW_DAYS; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    dates.push({ iso: toISO(d), date: d });
  }
  return dates;
};

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

export const formatDateTile = (d: Date) => ({
  weekday: WEEKDAYS[d.getDay()],
  day: d.getDate(),
  month: MONTHS[d.getMonth()],
});
