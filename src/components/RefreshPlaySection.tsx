import { useEffect, useMemo, useState } from "react";
import { Loader2, Snowflake, Zap, Gift, Clock, Users, Plus, Minus, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import DateStrip from "./softplay/DateStrip";
import { getAvailableDates, getSlotsForDate } from "./softplay/dateSlots";

const MAX_CAPACITY = 40;
const MAX_CHILDREN_PER_BOOKING = 6;
const BUNDLE_PRICE = 9.99;

const RefreshPlaySection = () => {
  const initialDate = getAvailableDates()[0]?.iso;
  const [selectedDate, setSelectedDate] = useState<string>(initialDate);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [bookedCounts, setBookedCounts] = useState<Record<string, number>>({});
  const [childCount, setChildCount] = useState<number>(1);
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const SESSIONS = useMemo(() => getSlotsForDate(selectedDate), [selectedDate]);

  useEffect(() => {
    setSelectedSession(null);
    setBookedCounts({});
    if (!open) return;
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
  }, [selectedDate, open]);

  const totalPrice = childCount * BUNDLE_PRICE;

  const handleBook = async () => {
    if (!selectedSession || !parentName.trim()) {
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
    <section id="refresh-play" className="relative overflow-hidden">
      {/* Icy gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#04243f] via-[#06182a] to-[#070710] pointer-events-none" />
      {/* Aurora wash */}
      <div className="absolute -top-20 left-1/4 w-[40rem] h-[40rem] bg-neon-cyan/25 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-[32rem] h-[32rem] bg-[#7ee8ff]/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[28rem] h-[28rem] bg-neon-purple/20 rounded-full blur-[110px] pointer-events-none" />

      {/* Drifting snowflakes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {[
          { left: "6%", size: 14, dur: 14, delay: 0, drift: "30px" },
          { left: "14%", size: 8, dur: 18, delay: 3, drift: "-20px" },
          { left: "22%", size: 18, dur: 12, delay: 1, drift: "40px" },
          { left: "31%", size: 10, dur: 16, delay: 5, drift: "-30px" },
          { left: "42%", size: 12, dur: 20, delay: 2, drift: "25px" },
          { left: "51%", size: 16, dur: 13, delay: 6, drift: "-35px" },
          { left: "60%", size: 9, dur: 17, delay: 4, drift: "20px" },
          { left: "69%", size: 14, dur: 15, delay: 0, drift: "-25px" },
          { left: "78%", size: 11, dur: 19, delay: 7, drift: "35px" },
          { left: "87%", size: 17, dur: 11, delay: 2, drift: "-30px" },
          { left: "94%", size: 10, dur: 16, delay: 4, drift: "25px" },
        ].map((f, i) => (
          <Snowflake
            key={i}
            className="snowflake"
            style={{
              left: f.left,
              width: f.size,
              height: f.size,
              animationDuration: `${f.dur}s`,
              animationDelay: `${f.delay}s`,
              ["--drift" as any]: f.drift,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 px-4 md:px-12 lg:px-20 py-10 md:py-16">
        {/* Limited-time tag — frosted */}
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-2 border border-neon-cyan/60 bg-neon-cyan/10 backdrop-blur-md text-neon-cyan font-display text-xs md:text-sm tracking-[0.3em] uppercase px-4 py-2 shadow-[0_0_30px_rgba(0,238,255,0.35)]">
            <Snowflake className="w-4 h-4 animate-spin" style={{ animationDuration: "6s" }} />
            HEATWAVE RESCUE · THIS WEEK ONLY
            <Snowflake className="w-4 h-4 animate-spin" style={{ animationDuration: "6s", animationDirection: "reverse" }} />
          </span>
        </div>

        {/* Title — smaller, sits above the hero stack */}
        <h2 className="text-center font-display tracking-[0.15em] leading-none mb-6">
          <span className="block text-2xl md:text-4xl text-neon-cyan"
            style={{ textShadow: "0 0 18px rgba(0,238,255,0.8)" }}>
            REFRESH <span className="text-white/80">&amp;</span> <span className="text-neon-green" style={{ textShadow: "0 0 18px rgba(46,255,99,0.8)" }}>PLAY!</span>
          </span>
        </h2>

        {/* HERO STACK — "what you get" is the loudest thing on the page */}
        <div className="relative max-w-3xl mx-auto">
          {/* Price burst — sits in the corner, smaller than the bundle */}
          <div className="absolute -top-4 -right-2 md:-top-6 md:-right-6 z-20 rotate-[8deg]">
            <div className="relative bg-neon-pink border-4 border-white px-4 py-2 md:px-6 md:py-3 shadow-[0_0_40px_rgba(255,0,204,0.7)] animate-pulse">
              <span className="block font-display text-[10px] md:text-xs tracking-[0.3em] text-white/90 leading-none">ONLY</span>
              <span className="block font-display text-3xl md:text-5xl text-white leading-none"
                style={{ textShadow: "2px 2px 0 #070710" }}>
                £9.99
              </span>
              <span className="block font-body text-[8px] md:text-[10px] tracking-wider text-white/90 leading-tight mt-0.5">per child</span>
            </div>
          </div>

          {/* Frosted card with shimmering icy rim */}
          <div className="relative animate-chill-pulse">
            {/* shimmer rim */}
            <div className="absolute inset-0 frost-shimmer pointer-events-none opacity-70" />
            <div
              className="relative border-2 border-neon-cyan/50 bg-gradient-to-b from-[#0a2436]/90 via-[#070d18]/95 to-[#0a1426]/90 backdrop-blur-md p-5 md:p-10"
              style={{ boxShadow: "inset 0 1px 0 rgba(180,240,255,0.4), inset 0 -1px 0 rgba(0,238,255,0.2)" }}
            >
              {/* corner frost crystals */}
              <Snowflake className="absolute top-2 left-2 w-4 h-4 md:w-6 md:h-6 text-neon-cyan/60" />
              <Snowflake className="absolute top-2 right-2 w-4 h-4 md:w-6 md:h-6 text-neon-cyan/60" />
              <Snowflake className="absolute bottom-2 left-2 w-4 h-4 md:w-6 md:h-6 text-neon-cyan/60" />
              <Snowflake className="absolute bottom-2 right-2 w-4 h-4 md:w-6 md:h-6 text-neon-cyan/60" />

              {/* Massive headline item */}
              <div className="text-center">
                <p className="font-display text-base md:text-2xl tracking-[0.3em] text-[#aef0ff] mb-2"
                  style={{ textShadow: "0 0 12px rgba(120,230,255,0.7)" }}>
                  ❄ YOU GET ❄
                </p>
                <p className="font-display text-[44px] leading-[0.95] sm:text-6xl md:text-8xl text-neon-cyan"
                  style={{ textShadow: "0 0 25px rgba(0,238,255,0.9), 0 0 55px rgba(0,238,255,0.5)" }}>
                  2 HOURS
                </p>
                <p className="font-display text-3xl sm:text-5xl md:text-7xl text-white mt-1"
                  style={{ textShadow: "0 0 18px rgba(180,240,255,0.6)" }}>
                  SOFT PLAY
                </p>
              </div>

              {/* Big PLUS chain */}
              <div className="my-5 md:my-8 grid gap-3 md:gap-4">
                {[
                  { icon: <Snowflake className="w-7 h-7 md:w-10 md:h-10" />, big: "ICE-COLD DRINK", color: "text-neon-cyan", border: "border-neon-cyan", shadow: "0 0 20px rgba(0,238,255,0.7)" },
                  { icon: <Gift className="w-7 h-7 md:w-10 md:h-10" />, big: "ICE POP", color: "text-[#aef0ff]", border: "border-[#aef0ff]", shadow: "0 0 20px rgba(174,240,255,0.7)" },
                  { icon: <Snowflake className="w-7 h-7 md:w-10 md:h-10" />, big: "FREE 30-MIN", small: "MIDWEEK RETURN (MON–THU)", color: "text-white", border: "border-white/70", shadow: "0 0 20px rgba(255,255,255,0.6)" },
                ].map((item) => (
                  <div key={item.big} className="flex items-center gap-3 md:gap-5">
                    <span className={`font-display text-4xl md:text-6xl text-neon-pink leading-none shrink-0`}
                      style={{ textShadow: "0 0 18px rgba(255,0,204,0.8)" }}>
                      +
                    </span>
                    <div className={`relative flex-1 flex items-center gap-3 md:gap-5 border-2 md:border-4 ${item.border} bg-[#06141f]/80 backdrop-blur-sm px-4 py-3 md:px-6 md:py-4 overflow-hidden`}>
                      <div className="absolute inset-0 frost-shimmer opacity-30 pointer-events-none" />
                      <span className={`relative shrink-0 ${item.color}`}>{item.icon}</span>
                      <div className="relative flex-1 min-w-0">
                        <p className={`font-display text-2xl sm:text-3xl md:text-5xl tracking-wider leading-none ${item.color}`}
                          style={{ textShadow: item.shadow }}>
                          {item.big}
                        </p>
                        {item.small && (
                          <p className="font-display text-[10px] sm:text-xs md:text-sm tracking-[0.2em] text-white/70 mt-1">
                            {item.small}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-center font-body text-[#aef0ff]/60 text-[10px] md:text-xs">
                Free 30-minute return valid Mon–Thu within 14 days. Show your booking code on the day. Adults go free.

            </p>
          </div>
        </div>

        {/* Primary CTA */}
        {!open && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setOpen(true)}
              className="font-display text-lg md:text-2xl tracking-widest px-10 md:px-16 py-5 md:py-6 bg-neon-green text-[#070710] animate-btn-flash-green hover:scale-105 transition-transform"
            >
              GRAB THIS DEAL — £9.99
            </button>
          </div>
        )}


        {/* Booking flow (collapsible) */}
        {open && (
          <div className="mt-10 max-w-2xl mx-auto">
            <DateStrip selectedDate={selectedDate} onSelect={setSelectedDate} accent="cyan" />

            <p className="font-display text-xs tracking-[0.3em] text-white/40 text-center mt-6 mb-4">
              <Clock className="w-4 h-4 inline mr-2" />
              PICK YOUR SESSION
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {SESSIONS.map((s) => {
                const booked = bookedCounts[s.time] || 0;
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
                  <span className="font-body text-white/60 text-sm">{childCount} × £{BUNDLE_PRICE.toFixed(2)}</span>
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

export default RefreshPlaySection;
