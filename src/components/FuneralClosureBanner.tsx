import { Heart } from "lucide-react";
import { STEVE_FUNERAL_CLOSURE_DATE } from "@/components/softplay/dateSlots";

export default function FuneralClosureBanner() {
  if (new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/London" }).format(new Date()) > STEVE_FUNERAL_CLOSURE_DATE) return null;
  return (
    <section className="funeral-closure-banner border-y-2 border-memorial-gold bg-memorial-gold px-5 py-5 text-center text-memorial-ink" aria-labelledby="funeral-closure-title">
      <p className="flex items-center justify-center gap-2 font-body text-xs font-extrabold"><Heart size={16} aria-hidden="true" /> IN LOVING MEMORY OF STEVE <Heart size={16} aria-hidden="true" /></p>
      <h2 id="funeral-closure-title" className="mt-2 font-display text-3xl leading-tight">TUESDAY 24 NOVEMBER<br />LUXPLAY CLOSED ALL DAY</h2>
      <p className="mx-auto mt-2 max-w-lg font-body text-sm font-semibold leading-relaxed">We will be closed for the entire day as we attend Steve’s funeral and remember our much-loved friend.</p>
      <p className="mt-2 font-body text-xs font-bold">No sessions or bookings on this day. Thank you for your understanding. ❤️</p>
    </section>
  );
}