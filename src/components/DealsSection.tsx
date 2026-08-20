import { useEffect, useMemo, useState } from "react";
import { Loader2, Clock, Users, Plus, Minus, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import DateStrip from "./softplay/DateStrip";
import { getAvailableDates, getSlotsForDate, isSlotForcedFull, isSoftPlaySlotBlocked } from "./softplay/dateSlots";

const MAX_CAPACITY = 40;
const MAX_CHILDREN_PER_BOOKING = 6;

type DealId = "play" | "allin";

const DEALS: {
  id: DealId;
  name: string;
  price: number;
  accent: string;
  glow: string;
  items: { emoji: string; text: string }[];
  tag?: string;
}[] = [
  {
    id: "allin",
    name: "ALL-IN DEAL",
    price: 19.99,
    accent: "#ff00cc",
    glow: "rgba(255,0,204,0.6)",
    tag: "BEST VALUE",
    items: [
      { emoji: "🛝", text: "2 HOURS SOFT PLAY" },
      { emoji: "🕹️", text: "60 ARCADE CREDITS" },
      { emoji: "🥤", text: "CAN / SOFT DRINK" },
      { emoji: "🥪", text: "SANDWICH" },
      { emoji: "🧁", text: "CUPCAKE + ICE POP" },
    ],
  },
  {
    id: "play",
    name: "PLAY DEAL",
    price: 14.99,
    accent: "#00eeff",
    glow: "rgba(0,238,255,0.6)",
    items: [
      { emoji: "🛝", text: "2 HOURS SOFT PLAY" },
      { emoji: "🕹️", text: "60 ARCADE CREDITS" },
      { emoji: "🧃", text: "JUICE" },
      { emoji: "🍡", text: "ICE POP" },
    ],
  },
];

const DealsSection = () => {
  const initialDate = getAvailableDates()[0]?.iso;
  const [selectedDeal, setSelectedDeal] = useState<DealId | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(initialDate);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [bookedCounts, setBookedCounts] = useState<Record<string, number>>({});
  const [childCount, setChildCount] = useState<number>(1);
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const SESSIONS = useMemo(() => getSlotsForDate(selectedDate), [selectedDate]);
  const deal = DEALS.find((d) => d.id === selectedDeal) ?? null;
  const totalPrice = (deal?.price ?? 0) * childCount;

  useEffect(() => {
    setSelectedSession(null);
    setBookedCounts({});
    if (!selectedDeal) return;
    supabase
      .from("soft_play_availability")
      .select("session_time, booked_count")
      .eq("session_date", selectedDate)
      .then(({ data }) => {
        if (!data) return;
        const counts: Record<string, number> = {};
        data.forEach((b) => (counts[b.session_time] = Number(b.booked_count) || 0));
        setBookedCounts(counts);
      });
  }, [selectedDate, selectedDeal]);

  const handleBook = async () => {
    if (!deal || !selectedSession || !parentName.trim()) {
      toast({
        title: "Almost there",
        description: "Pick a session and add a parent name to lock it in.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-refresh-play-checkout", {
        body: {
          deal: deal.id,
          sessionTime: selectedSession,
          sessionDate: selectedDate,
          childCount,
          parentName: parentName.trim(),
          parentPhone: parentPhone.trim(),
        },
      });
      if (error) throw error;
      if (data?.url) window.location.href = data.url;
    } catch (err: any) {
      toast({
        title: "Booking failed",
        description: err.message || "Something went wrong. Try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="deals" className="relative overflow-hidden bg-[#070710]">
      <div className="absolute top-0 -right-24 w-72 h-72 md:w-[26rem] md:h-[26rem] bg-neon-cyan/20 rounded-full blur-[70px] pointer-events-none" />
      <div className="absolute bottom-0 -left-24 w-72 h-72 md:w-[26rem] md:h-[26rem] bg-neon-pink/20 rounded-full blur-[70px] pointer-events-none" />

      <div className="relative z-10 px-4 md:px-12 lg:px-20 py-12 md:py-20">
        <div className="flex justify-center mb-3">
          <span className="border-2 border-neon-green/70 bg-neon-green/10 text-neon-green font-display text-sm md:text-2xl tracking-[0.25em] uppercase px-5 py-2.5 md:px-8 md:py-3 shadow-[0_0_30px_rgba(170,255,0,0.35)]">
            🎉 LUXPLAY DEALS 🎉
          </span>
        </div>
        <h2 className="text-center font-display tracking-[0.15em] text-3xl md:text-6xl text-white mb-2">
          PICK YOUR <span className="text-neon-pink" style={{ textShadow: "0 0 20px rgba(255,0,204,0.7)" }}>DEAL</span>
        </h2>
        <p className="text-center font-body text-white/50 text-xs md:text-sm mb-8 md:mb-12">
          Per child · adults go free
        </p>

        {/* Deal cards */}
        <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
          {DEALS.map((d) => {
            const active = selectedDeal === d.id;
            const isBest = d.id === "allin";
            return (
              <div
                key={d.id}
                className={`deal-card p-5 md:p-8 bg-[#0b0b18]/95 transition-transform hover:scale-[1.03] ${
                  isBest ? "animate-chill-pulse md:-mt-4" : ""
                }`}
                style={{
                  ["--deal-accent" as any]: d.accent,
                  boxShadow: active ? `0 0 65px ${d.glow}` : `0 0 30px ${d.glow}`,
                }}
              >
                <div className="deal-stripes" />
                <div className="deal-shine" />
                <div
                  className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full blur-[60px] opacity-40"
                  style={{ background: d.accent }}
                />
                {isBest && (
                  <>
                    <span className="pointer-events-none absolute top-3 left-4 text-lg animate-sparkle z-[2]">✨</span>
                    <span className="pointer-events-none absolute bottom-6 right-5 text-lg animate-sparkle z-[2]" style={{ animationDelay: "0.7s" }}>✨</span>
                    <span className="pointer-events-none absolute top-1/3 right-8 text-base animate-sparkle z-[2]" style={{ animationDelay: "1.2s" }}>⭐</span>
                  </>
                )}

                {d.tag && (
                  <span
                    className="absolute top-4 left-1/2 font-display text-[10px] md:text-xs tracking-[0.25em] px-4 py-1.5 text-[#070710] animate-party-tag z-10"
                    style={{ background: d.accent, boxShadow: `0 0 30px ${d.glow}` }}
                  >
                    🔥 {d.tag} 🔥
                  </span>
                )}

                <div className="relative z-[2] text-center pt-8">
                  <p
                    className="font-display text-2xl md:text-4xl tracking-[0.18em]"
                    style={{ color: d.accent, textShadow: `0 0 20px ${d.glow}` }}
                  >
                    {d.name}
                  </p>
                  <p
                    className={`deal-price-shimmer font-display text-6xl md:text-8xl leading-none mt-1 ${isBest ? "animate-big-throb" : ""}`}
                    style={{ filter: `drop-shadow(0 0 22px ${d.glow})` }}
                  >
                    £{d.price.toFixed(2)}
                  </p>
                  <p className="font-body text-[10px] tracking-[0.3em] uppercase text-white/40 mt-2">per child</p>
                </div>

                <div className="relative z-[2] mt-6 space-y-2">
                  {d.items.map((it, i) => (
                    <div
                      key={it.text}
                      className="animate-deal-row flex items-center gap-3 border border-white/10 bg-white/[0.04] px-3 py-2"
                      style={{ animationDelay: `${i * 0.25}s`, borderLeft: `3px solid ${d.accent}` }}
                    >
                      <span
                        className="text-2xl md:text-3xl leading-none shrink-0 animate-icon-bob"
                        style={{ animationDelay: `${i * 0.18}s` }}
                      >
                        {it.emoji}
                      </span>
                      <span className="font-display text-base md:text-2xl tracking-wider text-white/90">{it.text}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setSelectedDeal(d.id);
                    setChildCount(1);
                    setTimeout(() => document.getElementById("deal-booking")?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
                  }}
                  className={`relative z-[2] mt-6 w-full font-display text-lg md:text-2xl tracking-widest py-4 text-[#070710] hover:scale-[1.04] transition-transform ${
                    isBest ? "animate-btn-flash-pink" : "animate-btn-flash-cyan"
                  }`}
                  style={{ background: d.accent, boxShadow: `0 0 34px ${d.glow}` }}
                >
                  {active ? "SELECTED ✓" : `BOOK NOW → £${d.price.toFixed(2)}`}
                </button>
              </div>

            );
          })}
        </div>

        {/* Booking flow */}
        {deal && (
          <div id="deal-booking" className="mt-12 max-w-2xl mx-auto scroll-mt-8">
            <p className="text-center font-display text-sm md:text-lg tracking-[0.2em] mb-5" style={{ color: deal.accent }}>
              {deal.name} · £{deal.price.toFixed(2)} PER CHILD
            </p>
            <DateStrip selectedDate={selectedDate} onSelect={setSelectedDate} accent="cyan" />

            <p className="font-display text-xs tracking-[0.3em] text-white/40 text-center mt-6 mb-4">
              <Clock className="w-4 h-4 inline mr-2" />
              PICK YOUR SESSION
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {SESSIONS.map((s) => {
                const forcedFull = isSlotForcedFull(selectedDate, s.time) || isSoftPlaySlotBlocked(selectedDate, s.time);
                const booked = forcedFull ? MAX_CAPACITY : bookedCounts[s.time] || 0;
                const spotsLeft = MAX_CAPACITY - booked;
                const isFull = spotsLeft <= 0;
                const isSelected = selectedSession === s.time;
                return (
                  <button
                    key={s.time}
                    disabled={isFull}
                    onClick={() => setSelectedSession(s.time)}
                    className={`relative p-3 transition-all ${
                      isFull
                        ? "border border-white/5 bg-white/[0.02] opacity-40 cursor-not-allowed"
                        : isSelected
                        ? "border-2 border-neon-green bg-neon-green/10 shadow-[0_0_25px_rgba(46,255,99,0.3)]"
                        : "border border-white/10 bg-[#0a0a16] hover:border-neon-green/40"
                    }`}
                  >
                    <p className={`font-display text-base tracking-wider ${isSelected ? "text-neon-green" : "text-white/80"}`}>{s.label}</p>
                    <div className="flex items-center justify-center gap-1.5 mt-1">
                      <Users className="w-3 h-3 text-white/40" />
                      <span className="font-display text-[10px] text-white/40">{isFull ? "FULL" : `${spotsLeft} LEFT`}</span>
                    </div>
                    {isSelected && (
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-neon-green rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-[#070710]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {selectedSession && (
              <div className="mt-6 border border-neon-green/30 bg-[#0a0a16] p-6 space-y-4">
                <div>
                  <label className="font-display text-[10px] tracking-[0.2em] text-white/40 mb-2 block">NUMBER OF CHILDREN *</label>
                  <div className="flex items-center justify-between bg-[#070710] border border-white/10 px-2 py-2">
                    <button type="button" onClick={() => setChildCount((n) => Math.max(1, n - 1))} className="w-12 h-12 flex items-center justify-center text-white/70 hover:text-neon-green">
                      <Minus className="w-5 h-5" />
                    </button>
                    <div className="text-center">
                      <p className="font-display text-3xl text-neon-green glow-green">{childCount}</p>
                      <p className="font-body text-[10px] tracking-[0.2em] text-white/30 uppercase mt-0.5">{childCount === 1 ? "child" : "children"}</p>
                    </div>
                    <button type="button" onClick={() => setChildCount((n) => Math.min(MAX_CHILDREN_PER_BOOKING, n + 1))} className="w-12 h-12 flex items-center justify-center text-white/70 hover:text-neon-green">
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="font-display text-[10px] tracking-[0.2em] text-white/40 mb-1 block">PARENT NAME *</label>
                  <input
                    type="text"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder="e.g. Sarah Johnson"
                    className="w-full bg-[#070710] border border-white/10 text-white font-body text-sm px-4 py-3 placeholder:text-white/20 focus:outline-none focus:border-neon-green/50"
                  />
                </div>
                <div>
                  <label className="font-display text-[10px] tracking-[0.2em] text-white/40 mb-1 block">PHONE (OPTIONAL)</label>
                  <input
                    type="tel"
                    value={parentPhone}
                    onChange={(e) => setParentPhone(e.target.value)}
                    placeholder="e.g. 07700 900000"
                    className="w-full bg-[#070710] border border-white/10 text-white font-body text-sm px-4 py-3 placeholder:text-white/20 focus:outline-none focus:border-neon-green/50"
                  />
                </div>

                <div className="border border-white/10 bg-[#0d0d1a] p-3 flex items-center justify-between">
                  <span className="font-body text-white/60 text-sm">{childCount} × £{deal.price.toFixed(2)}</span>
                  <span className="font-display text-neon-green text-lg">£{totalPrice.toFixed(2)}</span>
                </div>

                <button
                  onClick={handleBook}
                  disabled={loading}
                  className="w-full font-display text-base tracking-widest py-4 bg-neon-green text-[#070710] hover:shadow-[0_0_40px_rgba(46,255,99,0.5)] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>PAY £{totalPrice.toFixed(2)} & LOCK IT IN</>}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default DealsSection;
