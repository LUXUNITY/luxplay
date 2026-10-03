import { useEffect, useState } from "react";
import { Loader2, Minus, Plus, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import {
  HALLOWEEN_CAPACITY, HALLOWEEN_MAX_PER_BOOKING, HALLOWEEN_NIGHTS, HALLOWEEN_PRICE, HALLOWEEN_SESSION,
} from "./halloweenEvent";

const HalloweenBookingSection = () => {
  const [night, setNight] = useState(HALLOWEEN_NIGHTS[0].iso);
  const [booked, setBooked] = useState<Record<string, number>>({});
  const [count, setCount] = useState(1);
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase
      .from("soft_play_availability")
      .select("session_date, booked_count")
      .eq("session_time", HALLOWEEN_SESSION)
      .in("session_date", HALLOWEEN_NIGHTS.map((n) => n.iso))
      .then(({ data }) => {
        const c: Record<string, number> = {};
        data?.forEach((r) => (c[r.session_date] = Number(r.booked_count) || 0));
        setBooked(c);
      });
  }, []);

  const left = (iso: string) => Math.max(0, HALLOWEEN_CAPACITY - (booked[iso] || 0));
  const total = count * HALLOWEEN_PRICE;

  const handleBook = async () => {
    if (!parentName.trim()) {
      toast({ title: "Nearly there 🎃", description: "Add a parent or guardian name to grab your tickets.", variant: "destructive" });
      return;
    }
    if (left(night) < count) {
      toast({ title: "Not enough tickets", description: `Only ${left(night)} left for this night.`, variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-halloween-checkout", {
        body: { sessionDate: night, ticketCount: count, parentName: parentName.trim(), parentPhone: parentPhone.trim() },
      });
      if (error) {
        const ctx: any = (error as any).context;
        let msg = error.message;
        try { const b = await ctx?.json?.(); msg = b?.message || b?.error || msg; } catch { /* ignore */ }
        throw new Error(msg);
      }
      if (data?.url) window.location.href = data.url;
    } catch (e: any) {
      toast({ title: "Booking failed", description: e?.message || "Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="halloween" className="relative overflow-hidden bg-card">
      <div className="relative z-10 mx-auto max-w-md px-4 py-14">
        <div className="mb-6 text-center">
          <p className="text-4xl">🎃👻🦇</p>
          <h2 className="mt-2 font-display text-5xl leading-[0.9] text-neon-pink" style={{ textShadow: "0 0 20px rgba(255,122,26,0.6)" }}>
            BOOK THE<br />SPOOKTACULAR
          </h2>
          <p className="mt-2 font-body text-sm text-foreground/70">
            4PM–9PM · Unlimited free play arcade · Spooky soft play till close · Pumpkin painting · Best dressed prize
          </p>
          <div className="mt-3 inline-block rounded-2xl bg-neon-green px-6 py-2" style={{ boxShadow: "0 6px 0 0 #5EA80F" }}>
            <span className="font-display text-3xl text-ink">£{HALLOWEEN_PRICE.toFixed(2)}</span>
            <span className="ml-1 font-body text-xs font-bold text-ink">per ticket</span>
          </div>
        </div>

        <div className="mb-6 rounded-3xl bg-neon-purple px-4 py-3 text-center text-foreground animate-spooky-flicker">
          <p className="font-display text-xl">🧟 FANCY DRESS IS A MUST</p>
          <p className="font-body text-xs">Everyone must come in costume — no costume, no entry!</p>
        </div>

        {/* Night picker */}
        <p className="mb-3 font-display text-xs tracking-widest text-foreground/50">1 · PICK YOUR NIGHT</p>
        <div className="mb-6 grid grid-cols-2 gap-3">
          {HALLOWEEN_NIGHTS.map((n) => {
            const l = left(n.iso);
            const sold = l <= 0;
            const sel = night === n.iso;
            const pct = Math.round(((HALLOWEEN_CAPACITY - l) / HALLOWEEN_CAPACITY) * 100);
            return (
              <button
                key={n.iso}
                disabled={sold}
                onClick={() => setNight(n.iso)}
                className={`relative rounded-2xl px-3 py-4 text-center transition-transform active:translate-y-1 ${
                  sold ? "bg-muted opacity-40" : sel ? "bg-neon-pink text-ink" : "bg-muted text-foreground"
                }`}
                style={{ boxShadow: sold ? "none" : sel ? "0 6px 0 0 #B34A00" : "0 6px 0 0 #241C3D" }}
              >
                <p className="font-display text-sm tracking-widest opacity-70">{n.weekday} OCT</p>
                <p className="font-display text-4xl leading-none">{n.day}</p>
                <p className="mt-1 font-body text-[11px] font-bold">
                  {sold ? "SOLD OUT 💀" : l <= 20 ? `🔥 ONLY ${l} LEFT!` : `${l} tickets left`}
                </p>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
                  <div className="h-full rounded-full bg-neon-green" style={{ width: `${Math.max(4, pct)}%` }} />
                </div>
                {sel && (
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-neon-cyan">
                    <Check className="h-3 w-3 text-ink" />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Details */}
        <div className="rounded-3xl bg-muted p-5" style={{ boxShadow: "0 8px 0 0 #241C3D" }}>
          <p className="mb-4 font-display text-xs tracking-widest text-foreground/50">2 · TICKETS &amp; DETAILS</p>
          <div className="mb-4 flex items-center justify-between rounded-2xl bg-card px-2 py-2">
            <button
              onClick={() => setCount((c) => Math.max(1, c - 1))}
              disabled={count <= 1}
              aria-label="Fewer tickets"
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-neon-cyan text-ink disabled:opacity-30"
            >
              <Minus className="h-5 w-5" />
            </button>
            <div className="text-center">
              <p className="font-display text-3xl">{count}</p>
              <p className="font-body text-[11px] uppercase text-foreground/50">{count === 1 ? "ticket" : "tickets"}</p>
            </div>
            <button
              onClick={() => setCount((c) => Math.min(HALLOWEEN_MAX_PER_BOOKING, c + 1))}
              disabled={count >= HALLOWEEN_MAX_PER_BOOKING}
              aria-label="More tickets"
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-neon-cyan text-ink disabled:opacity-30"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
          <label className="mb-1 block font-display text-[11px] tracking-widest text-foreground/50">PARENT / GUARDIAN NAME *</label>
          <input
            value={parentName}
            onChange={(e) => setParentName(e.target.value)}
            placeholder="e.g. Sarah Johnson"
            className="mb-4 w-full rounded-2xl bg-card px-4 py-3 font-body text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-neon-pink"
          />
          <label className="mb-1 block font-display text-[11px] tracking-widest text-foreground/50">PHONE (OPTIONAL)</label>
          <input
            type="tel"
            value={parentPhone}
            onChange={(e) => setParentPhone(e.target.value)}
            placeholder="e.g. 07700 900000"
            className="mb-5 w-full rounded-2xl bg-card px-4 py-3 font-body text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-neon-pink"
          />
          <div className="mb-5 flex items-center justify-between rounded-2xl bg-card px-4 py-3">
            <span className="font-body text-sm text-foreground/60">{count} × £{HALLOWEEN_PRICE.toFixed(2)}</span>
            <span className="font-display text-xl">£{total.toFixed(2)}</span>
          </div>
          <button
            onClick={handleBook}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-neon-pink py-4 font-display text-xl text-ink animate-spooky-pulse-btn disabled:opacity-50"
            style={{ boxShadow: "0 8px 0 0 #B34A00" }}
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>🎃 BOOK NOW — £{total.toFixed(2)}</>}
          </button>
          <p className="mt-3 text-center font-body text-[11px] text-foreground/50">
            Only {HALLOWEEN_CAPACITY} tickets per night. Every ticket gets a QR code by email for quick check-in.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HalloweenBookingSection;
