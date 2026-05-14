// Shared date + time-slot helpers for Soft Play & Baby Soft Play

export const OPENING_DATE = "2026-05-23"; // Sat 23 May 2026
export const NEW_SCHEDULE_FROM = "2026-05-25"; // Mon 25 May 2026 onwards
export const BOOKING_WINDOW_DAYS = 14; // Max 2 weeks ahead

// Opening weekend (23 & 24 May 2026)
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
