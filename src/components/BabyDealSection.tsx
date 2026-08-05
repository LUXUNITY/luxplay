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
      <div className="max-w-3xl mx-auto relative border-2 md:border-4 border-neon-purple bg-[#12061f]/85 px-4 py-6 md:px-8 md:py-8 overflow-hidden">
        <div className="absolute inset-0 frost-shimmer opacity-20 pointer-events-none" />
        <div className="relative text-center">
          <p className="font-display text-[11px] md:text-sm tracking-[0.3em] text-[#e9c8ff]">
            ❄ BABY SOFT PLAY DEAL (0–3 YRS) ❄
          </p>
          <p
            className="font-display text-5xl sm:text-6xl md:text-8xl text-neon-purple leading-none mt-1 animate-big-throb"
            style={{ textShadow: "0 0 22px rgba(178,102,255,0.9)" }}
          >
            £5.99
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-display text-base sm:text-xl md:text-3xl text-[#f0dcff] tracking-wide">
            <span className="animate-icon-bob text-2xl md:text-4xl">🧸</span>
            <span>2 HOURS BABY SOFT PLAY</span>
            <span className="text-neon-pink">+</span>
            <span>ICE-COLD DRINK</span>
            <span className="text-neon-pink">+</span>
            <span>ICE POP</span>
            <span className="animate-icon-bob text-2xl md:text-4xl" style={{ animationDelay: "0.5s" }}>👶</span>
          </div>
          <div className="mt-4 flex justify-center">
            <span className="inline-flex items-center gap-2 border-2 border-neon-green bg-neon-green/15 text-neon-green font-display text-[11px] sm:text-sm md:text-base tracking-[0.25em] uppercase px-3 py-1.5 md:px-4 md:py-2 animate-big-throb">
              👨‍👩‍👧 ADULTS GO FREE 👩‍👦
            </span>
          </div>
          {!open && <button onClick={() => setOpen(true)} className="mt-5 font-display text-sm md:text-lg tracking-widest px-6 md:px-10 py-3 md:py-4 bg-neon-purple text-[#070710] hover:scale-105 transition-transform">GRAB BABY DEAL — £5.99</button>}
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
