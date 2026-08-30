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
  bg: string;
  shadow: string;
  items: { emoji: string; text: string }[];
  tag?: string;
}[] = [
  {
    id: "allin",
    name: "ALL-IN DEAL",
    price: 19.99,
    bg: "bg-neon-cyan",
    shadow: "#00A3B8",
    tag: "BEST VALUE",
    items: [
      { emoji: "🛝", text: "2 hours soft play" },
      { emoji: "🕹️", text: "60 arcade credits" },
      { emoji: "🥤", text: "Can / soft drink" },
      { emoji: "🥪", text: "Sandwich" },
      { emoji: "🧁", text: "Cupcake + ice pop" },
    ],
  },
  {
    id: "play",
    name: "PLAY DEAL",
    price: 14.99,
    bg: "bg-neon-green",
    shadow: "#24B00C",
    items: [
      { emoji: "🛝", text: "2 hours soft play" },
      { emoji: "🕹️", text: "60 arcade credits" },
      { emoji: "🧃", text: "Juice" },
      { emoji: "🍡", text: "Ice pop" },
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
    <section id="deals" className="relative bg-background py-12 md:py-20 px-4">
      <div className="max-w-md md:max-w-3xl mx-auto">
        <div className="flex justify-center mb-4">
          <span className="bg-neon-pink text-ink font-display font-extrabold text-sm tracking-tighter uppercase px-5 py-2 rounded-full">
            🎉 Deals
          </span>
        </div>
        <h2 className="text-center font-display font-extrabold tracking-tighter text-3xl md:text-5xl text-foreground mb-1">
          Pick your deal
        </h2>
        <p className="text-center font-body text-foreground/60 text-sm mb-8">
          Per child · adults go free
        </p>

        {/* Deal cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {DEALS.map((d) => {
            const active = selectedDeal === d.id;
            const isBest = d.id === "allin";
            return (
              <div
                key={d.id}
                onClick={() => {
                  setSelectedDeal(d.id);
                  setChildCount(1);
                  setTimeout(() => document.getElementById("deal-booking")?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
                }}
                className={`relative cursor-pointer rounded-3xl p-5 md:p-6 ${d.bg} transition-transform duration-150 active:translate-y-1 hover:-translate-y-1 ${isBest ? "md:-mt-3 animate-deal-glow-cyan" : "animate-deal-glow-green"} ${active ? "ring-4 ring-neon-pink" : ""}`}
              >
                {d.tag && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 animate-fun-bubble text-ink font-display font-extrabold text-xs tracking-tighter px-4 py-1 rounded-full whitespace-nowrap">
                    ⭐ {d.tag}
                  </span>
                )}

                <div className="text-center pt-3">
                  <p className="font-display font-extrabold tracking-tighter text-xl md:text-2xl text-ink">
                    {d.name}
                  </p>
                  <p className="animate-price-throb font-display font-extrabold text-5xl md:text-6xl leading-none mt-1 text-ink">
                    £{d.price.toFixed(2)}
                  </p>
                  <p className="font-body text-xs text-ink/60 mt-1">per child</p>
                </div>

                <div className="mt-5 space-y-2">
                  {d.items.map((it) => (
                    <div key={it.text} className="flex items-center gap-3 bg-ink/15 rounded-2xl px-3 py-2">
                      <span className="w-9 h-9 shrink-0 rounded-full bg-background flex items-center justify-center text-lg">
                        {it.emoji}
                      </span>
                      <span className="font-display font-bold text-sm md:text-base text-ink">{it.text}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedDeal(d.id);
                    setChildCount(1);
                    setTimeout(() => document.getElementById("deal-booking")?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
                  }}
                  className={`mt-5 w-full min-h-[56px] rounded-2xl font-display font-extrabold text-lg tracking-tighter bg-ink text-white active:translate-y-1 transition-transform ${
                    d.id === "allin" ? "animate-btn-flash-cyan" : "animate-btn-flash-green"
                  }`}
                >
                  {active ? "Selected ✓" : `Book now → £${d.price.toFixed(2)}`}
                </button>
              </div>


            );
          })}
        </div>

        {/* Booking flow */}
        {deal && (
          <div id="deal-booking" className="mt-10 scroll-mt-8">
            <p className="text-center font-display font-extrabold text-base tracking-tighter mb-4 text-foreground">
              {deal.name} · £{deal.price.toFixed(2)} per child
            </p>
            <DateStrip selectedDate={selectedDate} onSelect={setSelectedDate} accent="cyan" />

            <p className="font-display font-bold text-xs text-foreground/60 text-center mt-6 mb-3">
              <Clock className="w-4 h-4 inline mr-1" />
              Pick your session
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
                    className={`relative rounded-2xl p-3 min-h-[56px] transition-all ${
                      isFull
                        ? "bg-muted opacity-40 cursor-not-allowed"
                        : isSelected
                        ? "bg-neon-green"
                        : "bg-muted hover:bg-neon-green/30"
                    }`}
                  >
                    <p className="font-display font-bold text-base text-foreground">{s.label}</p>
                    <div className="flex items-center justify-center gap-1.5 mt-1">
                      <Users className="w-3 h-3 text-foreground/50" />
                      <span className="font-body text-[10px] text-foreground/50">{isFull ? "Full" : `${spotsLeft} left`}</span>
                    </div>
                    {isSelected && (
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-ink rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {selectedSession && (
              <div className="mt-6 rounded-3xl bg-muted p-5 space-y-4">
                <div>
                  <label className="font-display font-bold text-xs text-foreground/60 mb-2 block">Number of children *</label>
                  <div className="flex items-center justify-between bg-card rounded-2xl px-2 py-2">
                    <button type="button" onClick={() => setChildCount((n) => Math.max(1, n - 1))} className="w-12 h-12 flex items-center justify-center text-foreground/70 rounded-full active:bg-muted">
                      <Minus className="w-5 h-5" />
                    </button>
                    <div className="text-center">
                      <p className="font-display font-extrabold text-3xl text-foreground">{childCount}</p>
                      <p className="font-body text-[10px] text-foreground/50 uppercase mt-0.5">{childCount === 1 ? "child" : "children"}</p>
                    </div>
                    <button type="button" onClick={() => setChildCount((n) => Math.min(MAX_CHILDREN_PER_BOOKING, n + 1))} className="w-12 h-12 flex items-center justify-center text-foreground/70 rounded-full active:bg-muted">
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="font-display font-bold text-xs text-foreground/60 mb-1 block">Parent name *</label>
                  <input
                    type="text"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder="e.g. Sarah Johnson"
                    className="w-full bg-card rounded-2xl text-foreground font-body text-sm px-4 py-3 placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-neon-cyan"
                  />
                </div>
                <div>
                  <label className="font-display font-bold text-xs text-foreground/60 mb-1 block">Phone (optional)</label>
                  <input
                    type="tel"
                    value={parentPhone}
                    onChange={(e) => setParentPhone(e.target.value)}
                    placeholder="e.g. 07700 900000"
                    className="w-full bg-card rounded-2xl text-foreground font-body text-sm px-4 py-3 placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-neon-cyan"
                  />
                </div>

                <div className="rounded-2xl bg-card p-3 flex items-center justify-between">
                  <span className="font-body text-foreground/60 text-sm">{childCount} × £{deal.price.toFixed(2)}</span>
                  <span className="font-display font-extrabold text-foreground text-lg">£{totalPrice.toFixed(2)}</span>
                </div>

                <button
                  onClick={handleBook}
                  disabled={loading}
                  className="w-full min-h-[56px] rounded-2xl font-display font-extrabold text-base tracking-tighter py-4 bg-neon-green text-ink active:translate-y-1 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  style={{ boxShadow: "0 8px 0 0 #24B00C" }}
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Pay £{totalPrice.toFixed(2)} & lock it in</>}
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
