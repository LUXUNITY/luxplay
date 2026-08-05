import { useEffect, useMemo, useState } from "react";
import { Check, Clock, Loader2, Minus, Plus, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import DateStrip from "./softplay/DateStrip";
import { getAvailableDates, getSlotsForDate, isSlotForcedFull } from "./softplay/dateSlots";

const DEAL_PRICE = 5.99;
const MAX_CAPACITY = 15;
const MAX_BABIES = 4;

const BabyDealSection = () => {
  const initialDate = getAvailableDates()[0]?.iso;
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [bookedCounts, setBookedCounts] = useState<Record<string, number>>({});
  const [babyCount, setBabyCount] = useState(1);
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const sessions = useMemo(() => getSlotsForDate(selectedDate), [selectedDate]);

  useEffect(() => {
    setSelectedSession(null);
    if (!open) return;
    supabase.from("baby_soft_play_availability")
      .select("session_time, booked_count")
      .eq("session_date", selectedDate)
      .then(({ data }) => {
        const counts: Record<string, number> = {};
        data?.forEach((row) => { counts[row.session_time] = Number(row.booked_count) || 0; });
        setBookedCounts(counts);
      });
  }, [selectedDate, open]);

  const handleBook = async () => {
    if (!selectedSession || !parentName.trim()) {
      toast({ title: "Missing details", description: "Choose a session and enter a parent name.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-baby-deal-checkout", {
        body: { sessionDate: selectedDate, sessionTime: selectedSession, babyCount, parentName: parentName.trim(), parentPhone: parentPhone.trim() },
      });
      if (error) throw error;
      if (!data?.url) throw new Error(data?.error || "Checkout could not be created");
      window.location.href = data.url;
    } catch (error) {
      toast({ title: "Booking failed", description: error instanceof Error ? error.message : "Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="baby-deal" className="relative w-full py-10 md:py-16 px-4 overflow-hidden bg-background">
      <div className="relative max-w-3xl mx-auto">
        {/* Soft pastel rays behind the card */}
        <div className="absolute -inset-12 md:-inset-24 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute inset-0 animate-baby-rays rounded-full opacity-70"
            style={{ maskImage: "radial-gradient(circle at center, #000 25%, transparent 72%)", WebkitMaskImage: "radial-gradient(circle at center, #000 25%, transparent 72%)" }} />
        </div>

        {/* Cute floating stickers around the card */}
        <div className="absolute -top-2 -left-2 md:-top-6 md:-left-8 text-4xl md:text-6xl z-30 animate-cute-wobble select-none pointer-events-none"
          style={{ filter: "drop-shadow(0 0 14px rgba(255,140,220,0.85))" }} aria-hidden="true">👶🍼</div>
        <div className="absolute -bottom-3 -right-1 md:-bottom-5 md:-right-6 text-3xl md:text-5xl z-30 animate-cute-wobble select-none pointer-events-none"
          style={{ animationDelay: "1.1s", filter: "drop-shadow(0 0 12px rgba(178,102,255,0.85))" }} aria-hidden="true">🧸</div>

        <div className="relative border-2 md:border-4 border-neon-purple bg-[#12061f]/90 px-4 py-7 md:px-8 md:py-10 overflow-hidden z-20"
          style={{ boxShadow: "0 0 45px rgba(178,102,255,0.45), inset 0 0 60px rgba(255,140,220,0.08)" }}>
          <div className="absolute inset-0 frost-shimmer opacity-20 pointer-events-none" />

          {/* Rising pastel bubbles inside the card */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            {[
              { left: "8%", size: 14, color: "rgba(255,160,230,0.55)", dur: 7, delay: 0, drift: "18px", mobile: true },
              { left: "26%", size: 9, color: "rgba(178,102,255,0.55)", dur: 8.5, delay: 1.5, drift: "-14px", mobile: true },
              { left: "45%", size: 18, color: "rgba(0,238,255,0.35)", dur: 9, delay: 2.6, drift: "12px", mobile: false },
              { left: "63%", size: 11, color: "rgba(255,160,230,0.5)", dur: 7.6, delay: 0.9, drift: "-20px", mobile: true },
              { left: "82%", size: 15, color: "rgba(178,102,255,0.45)", dur: 8.2, delay: 3.2, drift: "16px", mobile: false },
            ].map((b, i) => (
              <span key={i} className={`baby-bubble ${b.mobile ? "" : "hidden md:block"}`}
                style={{
                  left: b.left, width: b.size, height: b.size, background: b.color,
                  boxShadow: `0 0 12px ${b.color}`,
                  animationDuration: `${b.dur}s`, animationDelay: `${b.delay}s`,
                  ["--bdrift" as any]: b.drift,
                }} />
            ))}
          </div>

          {/* Twinkles */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            {[
              { left: "4%", top: "16%", size: "text-lg md:text-2xl", delay: "0s" },
              { left: "92%", top: "26%", size: "text-base md:text-xl", delay: "0.6s" },
              { left: "88%", top: "76%", size: "text-lg md:text-2xl", delay: "1.1s" },
            ].map((s, i) => (
              <span key={i} className={`absolute animate-sparkle leading-none ${s.size}`}
                style={{ left: s.left, top: s.top, animationDelay: s.delay, filter: "drop-shadow(0 0 8px rgba(255,255,255,0.8))" }}>✨</span>
            ))}
          </div>

          <div className="relative text-center">
            <p className="inline-block font-display text-[11px] md:text-sm tracking-[0.3em] text-[#12061f] bg-gradient-to-r from-neon-pink via-[#ffa0e6] to-neon-purple px-3 py-1 animate-big-throb">
              ❄ BABY SOFT PLAY DEAL · 0–3 YRS ❄
            </p>

            {/* What you get — the loudest part */}
            <div className="mt-5 space-y-2 md:space-y-3">
              <div className="flex items-center justify-center gap-2 md:gap-4">
                <span className="animate-icon-bob text-3xl md:text-5xl">🛝</span>
                <span className="font-display text-2xl sm:text-4xl md:text-6xl leading-none text-neon-green animate-big-throb"
                  style={{ textShadow: "0 0 20px rgba(46,255,99,0.85)" }}>2 HOURS BABY SOFT PLAY</span>
                <span className="relative inline-block">
                  <span className="animate-baby-cute inline-block text-3xl md:text-5xl" style={{ filter: "drop-shadow(0 0 10px rgba(255,140,220,0.8))" }}>👶</span>
                  <span className="animate-baby-sparkle absolute -top-1 -right-2 text-xs md:text-base">✨</span>
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-display text-lg sm:text-2xl md:text-4xl text-[#f0dcff] tracking-wide">
                <span className="animate-icon-bob text-2xl md:text-4xl" style={{ animationDelay: "0.3s" }}>🥤</span>
                <span>ICE-COLD DRINK</span>
                <span className="text-neon-pink animate-big-throb">+</span>
                <span>ICE POP</span>
                <span className="animate-icon-bob text-2xl md:text-4xl" style={{ animationDelay: "0.7s" }}>🧊</span>
              </div>
            </div>

            {/* Price sticker */}
            <div className="mt-6 flex justify-center">
              <div className="relative -rotate-[6deg] bg-neon-purple border-4 border-white px-5 py-2 md:px-8 md:py-3 animate-cute-wobble"
                style={{ boxShadow: "0 0 40px rgba(178,102,255,0.75)" }}>
                <span className="block font-display text-[10px] md:text-xs tracking-[0.3em] text-white/90 leading-none">ONLY</span>
                <span className="block font-display text-4xl sm:text-5xl md:text-7xl text-white leading-none" style={{ textShadow: "2px 2px 0 #070710" }}>£5.99</span>
                <span className="block font-body text-[8px] md:text-[10px] tracking-wider text-white/90 mt-0.5">per baby</span>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <span className="inline-flex items-center gap-2 border-2 border-neon-green bg-neon-green/15 text-neon-green font-display text-[11px] sm:text-sm md:text-base tracking-[0.25em] uppercase px-3 py-1.5 md:px-4 md:py-2 animate-big-throb">
                👨‍👩‍👧 ADULTS GO FREE 👩‍👦
              </span>
              <span className="inline-flex items-center gap-2 border-2 border-neon-cyan bg-neon-cyan/10 text-neon-cyan font-display text-[11px] sm:text-sm md:text-base tracking-[0.25em] uppercase px-3 py-1.5 md:px-4 md:py-2">
                ❄ FULLY AIR CONDITIONED ❄
              </span>
            </div>

            {!open && <button onClick={() => setOpen(true)} className="mt-6 font-display text-sm md:text-lg tracking-widest px-6 md:px-10 py-3 md:py-4 bg-gradient-to-r from-neon-pink to-neon-purple text-[#070710] hover:scale-105 transition-transform animate-big-throb"
              style={{ boxShadow: "0 0 30px rgba(255,0,204,0.6)" }}>👶 GRAB BABY DEAL — £5.99</button>}
          </div>
        </div>
      </div>


      {open && (
        <div className="max-w-2xl mx-auto mt-8">
          <DateStrip selectedDate={selectedDate} onSelect={setSelectedDate} accent="pink" />
          <p className="font-display text-xs tracking-[0.3em] text-white/40 text-center mb-4"><Clock className="w-4 h-4 inline mr-2" />PICK YOUR BABY SESSION</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {sessions.map((session) => {
              const booked = isSlotForcedFull(selectedDate, session.time) ? MAX_CAPACITY : (bookedCounts[session.time] || 0);
              const spotsLeft = MAX_CAPACITY - booked;
              const isFull = spotsLeft <= 0;
              const selected = selectedSession === session.time;
              return <button key={session.time} disabled={isFull} onClick={() => setSelectedSession(session.time)} className={`relative p-3 ${isFull ? "border border-white/5 opacity-40" : selected ? "border-2 border-neon-purple bg-neon-purple/10" : "border border-white/10 bg-[#0a0a16]"}`}>
                <p className={`font-display text-base ${selected ? "text-neon-purple" : "text-white/80"}`}>{session.label}</p>
                <span className="font-display text-[10px] text-white/40"><Users className="inline w-3 h-3 mr-1" />{isFull ? "FULL" : `${spotsLeft} LEFT`}</span>
                {selected && <span className="absolute -top-2 -right-2 w-5 h-5 bg-neon-purple rounded-full flex items-center justify-center"><Check className="w-3 h-3 text-[#070710]" /></span>}
              </button>;
            })}
          </div>

          {selectedSession && <div className="mt-6 border border-neon-purple/30 bg-[#0a0a16] p-6 space-y-4">
            <div>
              <label className="font-display text-[10px] tracking-[0.2em] text-white/40 block mb-2">NUMBER OF BABIES *</label>
              <div className="flex items-center justify-between border border-white/10 bg-[#070710] p-2">
                <button aria-label="Decrease babies" onClick={() => setBabyCount((count) => Math.max(1, count - 1))} className="w-12 h-12 flex items-center justify-center"><Minus /></button>
                <span className="font-display text-3xl text-neon-purple">{babyCount}</span>
                <button aria-label="Increase babies" onClick={() => setBabyCount((count) => Math.min(MAX_BABIES, count + 1))} className="w-12 h-12 flex items-center justify-center"><Plus /></button>
              </div>
            </div>
            <input value={parentName} onChange={(event) => setParentName(event.target.value)} placeholder="Parent / guardian name *" className="w-full bg-[#070710] border border-white/10 text-white px-4 py-3" />
            <input type="tel" value={parentPhone} onChange={(event) => setParentPhone(event.target.value)} placeholder="Phone number (optional)" className="w-full bg-[#070710] border border-white/10 text-white px-4 py-3" />
            <div className="flex justify-between border border-white/10 p-3"><span className="text-white/60">{babyCount} × £5.99</span><strong className="font-display text-neon-purple">£{(babyCount * DEAL_PRICE).toFixed(2)}</strong></div>
            <button onClick={handleBook} disabled={loading} className="w-full py-4 bg-neon-purple text-[#070710] font-display tracking-widest flex justify-center gap-2 disabled:opacity-50">{loading ? <Loader2 className="animate-spin" /> : `PAY £${(babyCount * DEAL_PRICE).toFixed(2)} & BOOK`}</button>
          </div>}
        </div>
      )}
    </section>
  );
};

export default BabyDealSection;
