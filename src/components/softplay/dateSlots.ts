// Shared date + time-slot helpers for Soft Play & Baby Soft Play

export const OPENING_DATE = "2026-06-13"; // Sat 13 Jun 2026 — soft play opens
export const NEW_SCHEDULE_FROM = "2026-06-13"; // single schedule from opening
export const BOOKING_WINDOW_DAYS = 14; // Max 2 weeks ahead

// Daily 2-hour sessions, 10AM – 8PM
const STANDARD_SLOTS = [
  { time: "10:00", label: "10AM–12PM" },
  { time: "12:00", label: "12–2PM" },
  { time: "14:00", label: "2–4PM" },
  { time: "16:00", label: "4–6PM" },
  { time: "18:00", label: "6–8PM" },
];

const REMOVED_TODAY_SLOTS = ["14:00", "16:00"];

const getUKTDateISO = () => {
  const now = new Date();
  const uk = new Date(now.toLocaleString("en-GB", { timeZone: "Europe/London" }));
  return `${uk.getFullYear()}-${pad(uk.getMonth() + 1)}-${pad(uk.getDate())}`;
};

export const getSlotsForDate = (dateISO: string) => {
  if (dateISO === getUKTDateISO()) {
    return STANDARD_SLOTS.filter((s) => !REMOVED_TODAY_SLOTS.includes(s.time));
  }
  return STANDARD_SLOTS;
};

export const getSoftPlayFullPrice = (_dateISO: string) => 8;
export const getBabyFullPrice = (_dateISO: string) => 4;
export const getSoftPlayPrice = (_dateISO: string) => 8;
export const getBabyPrice = (_dateISO: string) => 4;
export const isOpeningWeekend = (_dateISO: string) => false;

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
