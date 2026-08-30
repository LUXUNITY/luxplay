import { useEffect, useMemo, useState } from "react";
import { Check, Clock, Loader2, Minus, Plus, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import DateStrip from "./softplay/DateStrip";
import { getAvailableDates, getSlotsForDate, isSlotForcedFull, isBabySlotBlocked } from "./softplay/dateSlots";

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
    <section id="baby-deal" className="relative w-full py-10 md:py-16 px-4 bg-muted">
      <div className="max-w-md mx-auto">
        <div
          className="relative rounded-3xl bg-neon-pink px-5 py-8 text-center"
          style={{ boxShadow: "0 8px 0 0 #B80AAA" }}
        >
          <span className="inline-block bg-white text-foreground font-display font-extrabold text-xs tracking-tighter uppercase px-4 py-1.5 rounded-full">
            👶 Under 3s deal
          </span>

          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl shrink-0">🛝</span>
            <span className="font-display font-extrabold text-2xl md:text-3xl tracking-tighter text-white">2hr under 3s soft play</span>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
            <span className="flex items-center gap-2 bg-white/80 rounded-full px-3 py-1.5">
              <span className="text-lg">🥤</span>
              <span className="font-display font-bold text-sm text-foreground">Drink</span>
            </span>
            <span className="flex items-center gap-2 bg-white/80 rounded-full px-3 py-1.5">
              <span className="text-lg">🧊</span>
              <span className="font-display font-bold text-sm text-foreground">Ice pop</span>
            </span>
          </div>

          <div className="mt-6 flex justify-center">
            <div className="rounded-3xl bg-white px-6 py-3" style={{ boxShadow: "0 8px 0 0 #d9d9d9" }}>
              <span className="block font-display font-bold text-[10px] tracking-tighter text-foreground/60">Only</span>
              <span className="block font-display font-extrabold text-5xl text-foreground leading-none">£5.99</span>
              <span className="block font-body text-[10px] text-foreground/60 mt-0.5">per baby</span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <span className="inline-flex items-center gap-1 bg-neon-green text-foreground font-display font-bold text-xs tracking-tighter px-3 py-1.5 rounded-full">
              👨‍👩‍👧 Adults go free
            </span>
            <span className="inline-flex items-center gap-1 bg-neon-cyan text-foreground font-display font-bold text-xs tracking-tighter px-3 py-1.5 rounded-full">
              ❄️ Air conditioned
            </span>
          </div>

          {!open && (
            <button
              onClick={() => setOpen(true)}
              className="mt-6 w-full min-h-[56px] rounded-2xl font-display font-extrabold text-base tracking-tighter bg-foreground text-white active:translate-y-1 transition-transform"
              style={{ boxShadow: "0 8px 0 0 #000000" }}
            >
              👶 Grab under 3s deal — £5.99
            </button>
          )}
        </div>

        {open && (
          <div className="mt-8">
            <DateStrip selectedDate={selectedDate} onSelect={setSelectedDate} accent="pink" />
            <p className="font-display font-bold text-xs text-foreground/60 text-center my-4">
              <Clock className="w-4 h-4 inline mr-1" />Pick your session
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {sessions.map((session) => {
                const booked = (isSlotForcedFull(selectedDate, session.time) || isBabySlotBlocked(selectedDate, session.time)) ? MAX_CAPACITY : (bookedCounts[session.time] || 0);
                const spotsLeft = MAX_CAPACITY - booked;
                const isFull = spotsLeft <= 0;
                const selected = selectedSession === session.time;
                return (
                  <button
                    key={session.time}
                    disabled={isFull}
                    onClick={() => setSelectedSession(session.time)}
                    className={`relative rounded-2xl p-3 min-h-[56px] ${isFull ? "bg-white opacity-40" : selected ? "bg-neon-pink" : "bg-white hover:bg-neon-pink/20"}`}
                  >
                    <p className={`font-display font-bold text-base ${selected ? "text-white" : "text-foreground"}`}>{session.label}</p>
                    <span className={`font-body text-[10px] ${selected ? "text-white/80" : "text-foreground/50"}`}><Users className="inline w-3 h-3 mr-1" />{isFull ? "Full" : `${spotsLeft} left`}</span>
                    {selected && <span className="absolute -top-2 -right-2 w-5 h-5 bg-foreground rounded-full flex items-center justify-center"><Check className="w-3 h-3 text-white" /></span>}
                  </button>
                );
              })}
            </div>

            {selectedSession && (
              <div className="mt-6 rounded-3xl bg-white p-5 space-y-4">
                <div>
                  <label className="font-display font-bold text-xs text-foreground/60 block mb-2">Number of babies *</label>
                  <div className="flex items-center justify-between rounded-2xl bg-muted p-2">
                    <button aria-label="Decrease babies" onClick={() => setBabyCount((count) => Math.max(1, count - 1))} className="w-12 h-12 flex items-center justify-center rounded-full active:bg-white text-foreground"><Minus /></button>
                    <span className="font-display font-extrabold text-3xl text-foreground">{babyCount}</span>
                    <button aria-label="Increase babies" onClick={() => setBabyCount((count) => Math.min(MAX_BABIES, count + 1))} className="w-12 h-12 flex items-center justify-center rounded-full active:bg-white text-foreground"><Plus /></button>
                  </div>
                </div>
                <input value={parentName} onChange={(event) => setParentName(event.target.value)} placeholder="Parent / guardian name *" className="w-full bg-muted rounded-2xl text-foreground px-4 py-3 placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-neon-pink" />
                <input type="tel" value={parentPhone} onChange={(event) => setParentPhone(event.target.value)} placeholder="Phone number (optional)" className="w-full bg-muted rounded-2xl text-foreground px-4 py-3 placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-neon-pink" />
                <div className="flex justify-between rounded-2xl bg-muted p-3"><span className="text-foreground/60">{babyCount} × £5.99</span><strong className="font-display font-extrabold text-foreground">£{(babyCount * DEAL_PRICE).toFixed(2)}</strong></div>
                <button
                  onClick={handleBook}
                  disabled={loading}
                  className="w-full min-h-[56px] py-4 rounded-2xl bg-neon-pink text-white font-display font-extrabold tracking-tighter flex justify-center items-center gap-2 disabled:opacity-50 active:translate-y-1 transition-transform"
                  style={{ boxShadow: "0 8px 0 0 #B80AAA" }}
                >
                  {loading ? <Loader2 className="animate-spin" /> : `Pay £${(babyCount * DEAL_PRICE).toFixed(2)} & book`}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default BabyDealSection;
