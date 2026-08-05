import { useEffect, useMemo, useState } from "react";
import { Loader2, Snowflake, Zap, Gift, Clock, Users, Plus, Minus, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import DateStrip from "./softplay/DateStrip";
import { getAvailableDates, getSlotsForDate, isSlotForcedFull } from "./softplay/dateSlots";

const MAX_CAPACITY = 40;
const MAX_CHILDREN_PER_BOOKING = 6;
const BUNDLE_PRICE = 14.99;

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
      {/* Sky → ice gradient: scorching top, frozen bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#ff6a00] via-[#0a2440] to-[#070710] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#06182a]/40 to-[#070710] pointer-events-none" />

      {/* ANGRY SUN — top right */}
      <div className="absolute -top-16 -right-16 md:-top-20 md:-right-20 pointer-events-none" aria-hidden="true">
        <div className="relative w-56 h-56 md:w-80 md:h-80 animate-sun-throb">
          {/* Rays */}
          <div className="absolute inset-0 animate-sun-spin">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {Array.from({ length: 16 }).map((_, i) => (
                <rect key={i}
                  x="98" y="6" width="4" height="40"
                  fill="url(#rayGrad)"
                  transform={`rotate(${i * 22.5} 100 100)`}
                />
              ))}
              <defs>
                <linearGradient id="rayGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#fff2a8" />
                  <stop offset="100%" stopColor="#ff7a00" stopOpacity="0" />
                </linearGradient>
                <radialGradient id="sunCore">
                  <stop offset="0%" stopColor="#fff7c2" />
                  <stop offset="50%" stopColor="#ffd24a" />
                  <stop offset="100%" stopColor="#ff5a00" />
                </radialGradient>
              </defs>
            </svg>
          </div>
          {/* Sun core */}
          <div className="absolute inset-[22%] rounded-full" style={{ background: "radial-gradient(circle at 35% 30%, #fff7c2, #ffd24a 45%, #ff5a00 85%)", boxShadow: "0 0 60px rgba(255,160,0,0.9), inset 0 0 30px rgba(255,255,200,0.6)" }} />
        </div>
      </div>

      {/* Heat haze bands near top */}
      <div className="absolute top-10 left-0 right-0 h-24 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 animate-heat-haze" style={{ background: "repeating-linear-gradient(180deg, transparent 0 6px, rgba(255,180,80,0.08) 6px 8px)" }} />
      </div>

      {/* Aurora / icy wash bottom half — smaller blur on mobile to save GPU */}
      <div className="absolute top-1/3 -right-20 w-80 h-80 md:w-[32rem] md:h-[32rem] bg-neon-cyan/25 rounded-full blur-[60px] md:blur-[110px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 md:w-[28rem] md:h-[28rem] bg-neon-purple/20 rounded-full blur-[60px] md:blur-[110px] pointer-events-none" />

      {/* Floating ice cubes — fewer on mobile, no backdrop-blur */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {[
          { left: "6%", top: "30%", size: 28, dur: 5, delay: 0, mobile: true },
          { left: "88%", top: "55%", size: 36, dur: 6, delay: 1, mobile: true },
          { left: "12%", top: "72%", size: 22, dur: 4.5, delay: 2, mobile: false },
          { left: "78%", top: "20%", size: 24, dur: 5.5, delay: 0.6, mobile: false },
          { left: "45%", top: "88%", size: 30, dur: 6.5, delay: 1.4, mobile: true },
        ].map((c, i) => (
          <div key={i} className={`absolute animate-ice-float ${c.mobile ? "" : "hidden md:block"}`}
            style={{ left: c.left, top: c.top, width: c.size, height: c.size, animationDuration: `${c.dur}s`, animationDelay: `${c.delay}s` }}>
            <div className="w-full h-full rounded-[6px] border border-white/70 bg-gradient-to-br from-white/60 via-cyan-200/40 to-cyan-400/30"
              style={{ boxShadow: "inset 0 0 12px rgba(255,255,255,0.6), 0 0 14px rgba(0,238,255,0.45)" }} />
          </div>
        ))}
      </div>

      {/* Water drips falling from top */}
      <div className="absolute inset-x-0 top-0 h-40 pointer-events-none" aria-hidden="true">
        {[
          { left: "15%", delay: 0 },
          { left: "30%", delay: 0.9 },
          { left: "48%", delay: 0.3 },
          { left: "62%", delay: 1.4 },
          { left: "82%", delay: 0.6 },
        ].map((d, i) => (
          <span key={i} className="water-drip" style={{ left: d.left, top: 0, animationDelay: `${d.delay}s` }} />
        ))}
      </div>

      {/* Drifting snowflakes (kept, fewer) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {[
          { left: "8%", size: 12, dur: 16, delay: 0, drift: "30px" },
          { left: "26%", size: 16, dur: 13, delay: 2, drift: "-25px" },
          { left: "42%", size: 10, dur: 18, delay: 4, drift: "20px" },
          { left: "58%", size: 14, dur: 14, delay: 1, drift: "-30px" },
          { left: "74%", size: 11, dur: 17, delay: 3, drift: "25px" },
          { left: "92%", size: 15, dur: 12, delay: 5, drift: "-20px" },
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

      {/* Wavy water surface at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute bottom-0 left-0 h-full w-[200%] animate-wave-roll"
          style={{ background: "repeating-linear-gradient(90deg, rgba(0,238,255,0.35) 0 40px, rgba(120,230,255,0.55) 40px 80px)", clipPath: "polygon(0 60%, 5% 40%, 10% 60%, 15% 40%, 20% 60%, 25% 40%, 30% 60%, 35% 40%, 40% 60%, 45% 40%, 50% 60%, 55% 40%, 60% 60%, 65% 40%, 70% 60%, 75% 40%, 80% 60%, 85% 40%, 90% 60%, 95% 40%, 100% 60%, 100% 100%, 0 100%)" }} />
      </div>

      <div className="relative z-10 px-4 md:px-12 lg:px-20 py-10 md:py-16">
        {/* Hot bothered face — TOP LEFT, away from the sun */}
        <div
          className="absolute top-2 left-3 md:top-6 md:left-10 text-5xl md:text-7xl select-none z-10 animate-sun-throb"
          style={{ filter: "drop-shadow(0 0 14px rgba(255,90,0,0.7))" }}
          aria-hidden="true"
        >
          🥵
        </div>


        {/* Limited-time tag — BIGGER */}
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-2 md:gap-3 border-2 border-neon-cyan/70 bg-neon-cyan/10 backdrop-blur-md text-neon-cyan font-display text-lg sm:text-2xl md:text-4xl tracking-[0.2em] uppercase px-5 py-3 md:px-8 md:py-4 shadow-[0_0_40px_rgba(0,238,255,0.45)]">
            <Snowflake className="w-5 h-5 md:w-7 md:h-7 animate-spin shrink-0" style={{ animationDuration: "6s" }} />
            SUMMER CHILL & PLAY
            <Snowflake className="w-5 h-5 md:w-7 md:h-7 animate-spin shrink-0" style={{ animationDuration: "6s", animationDirection: "reverse" }} />
          </span>
        </div>
        <p className="text-center font-display text-[10px] md:text-xs tracking-[0.4em] text-neon-cyan/70 mb-6">
          SUMMER HOLIDAYS SPECIAL
        </p>

        {/* Title — smaller, sits above the hero stack */}
        <h2 className="text-center font-display tracking-[0.15em] leading-none mb-6">
          <span className="block text-2xl md:text-4xl text-neon-cyan"
            style={{ textShadow: "0 0 18px rgba(0,238,255,0.8)" }}>
            SUMMER CHILL <span className="text-white/80">&amp;</span> <span className="text-neon-green" style={{ textShadow: "0 0 18px rgba(46,255,99,0.8)" }}>PLAY!</span>
          </span>
        </h2>

        {/* HERO STACK — "what you get" is the loudest thing on the page */}
        <div className="relative max-w-3xl mx-auto">
          {/* Cool refreshed face with sunglasses + cold drink — sits on the deal card */}
          <div
            className="absolute -top-1 -left-3 md:-top-3 md:-left-8 text-5xl md:text-7xl select-none z-20 -rotate-[12deg] pointer-events-none"
            style={{ filter: "drop-shadow(0 0 14px rgba(0,238,255,0.85))", animation: "ice-float 3s ease-in-out infinite" }}
            aria-hidden="true"
          >
            😎🥤
          </div>

          {/* Price burst — sits in the corner, smaller than the bundle */}

          <div className="absolute -top-4 -right-2 md:-top-6 md:-right-6 z-20 rotate-[8deg]">
            <div className="relative bg-neon-pink border-4 border-white px-4 py-2 md:px-6 md:py-3 shadow-[0_0_40px_rgba(255,0,204,0.7)] animate-pulse">
              <span className="block font-display text-[10px] md:text-xs tracking-[0.3em] text-white/90 leading-none">ONLY</span>
              <span className="block font-display text-3xl md:text-5xl text-white leading-none"
                style={{ textShadow: "2px 2px 0 #070710" }}>
                £14.99
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
                <div className="mt-3 flex justify-center">
                  <span className="inline-flex items-center gap-2 border-2 border-neon-cyan/70 bg-neon-cyan/10 text-neon-cyan font-display text-[11px] sm:text-sm md:text-base tracking-[0.25em] uppercase px-3 py-1.5 md:px-4 md:py-2 shadow-[0_0_20px_rgba(0,238,255,0.4)]">
                    ❄ FULLY AIR CONDITIONED ❄
                  </span>
                </div>
              </div>


              {/* Big PLUS chain */}
              <div className="my-5 md:my-8 grid gap-3 md:gap-4">
                {[
                  { icon: <Snowflake className="w-7 h-7 md:w-10 md:h-10" />, big: "ICE-COLD DRINK", color: "text-neon-cyan", border: "border-neon-cyan", shadow: "0 0 20px rgba(0,238,255,0.7)" },
                  { icon: <Gift className="w-7 h-7 md:w-10 md:h-10" />, big: "ICE POP", color: "text-[#aef0ff]", border: "border-[#aef0ff]", shadow: "0 0 20px rgba(174,240,255,0.7)" },
                  { icon: <Zap className="w-7 h-7 md:w-10 md:h-10" />, big: "60 ARCADE CREDITS", small: "MOST GAMES 5–10 CREDITS PER PLAY", color: "text-neon-pink", border: "border-neon-pink", shadow: "0 0 20px rgba(255,0,204,0.7)" },
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
                Arcade credits load straight onto your LuxPlay card. Show your booking code on the day. Adults go free.
              </p>
            </div>
          </div>
        </div>


        {/* Primary CTA */}
        {!open && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setOpen(true)}
              className="font-display text-lg md:text-2xl tracking-widest px-10 md:px-16 py-5 md:py-6 bg-neon-green text-[#070710] animate-btn-flash-green hover:scale-105 transition-transform"
            >
              GRAB THIS DEAL — £14.99
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
                const forcedFull = isSlotForcedFull(selectedDate, s.time);
                const booked = forcedFull ? MAX_CAPACITY : (bookedCounts[s.time] || 0);
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
