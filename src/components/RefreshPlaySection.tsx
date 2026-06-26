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
      <div className="absolute inset-0 bg-gradient-to-br from-[#001a2e] via-[#070710] to-[#2a0014] opacity-90 pointer-events-none" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-neon-cyan/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-neon-pink/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 px-4 md:px-12 lg:px-20 py-12 md:py-20">
        {/* Limited-time tag */}
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-2 border-2 border-neon-yellow bg-neon-yellow/10 text-neon-yellow font-display text-xs md:text-sm tracking-[0.3em] uppercase px-4 py-2 animate-pulse">
            <Zap className="w-4 h-4" />
            THIS WEEK ONLY
            <Zap className="w-4 h-4" />
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-center font-display tracking-wider leading-[0.9]">
          <span className="block text-4xl md:text-7xl text-neon-cyan glow-cyan"
            style={{ textShadow: "0 0 25px rgba(0,238,255,0.9), 0 0 55px rgba(0,238,255,0.5)" }}>
            REFRESH
          </span>
          <span className="block text-3xl md:text-6xl text-white/90 my-1">&amp;</span>
          <span className="block text-5xl md:text-8xl text-neon-green glow-green"
            style={{ textShadow: "0 0 25px rgba(46,255,99,0.9), 0 0 55px rgba(46,255,99,0.5)" }}>
            PLAY!
          </span>
        </h2>

        {/* Price block */}
        <div className="mt-6 flex flex-col items-center">
          <span className="font-display text-white/60 text-xs md:text-sm tracking-[0.4em] mb-1">ONLY</span>
          <div className="relative inline-block bg-neon-pink px-8 py-3 md:px-12 md:py-4 border-4 border-white shadow-[0_0_50px_rgba(255,0,204,0.6)]">
            <span className="font-display text-6xl md:text-8xl text-white leading-none"
              style={{ textShadow: "3px 3px 0 #070710" }}>
              £9.99
            </span>
          </div>
          <span className="font-body text-white/70 text-xs md:text-sm mt-2 tracking-wider">per child · adults go free</span>
        </div>

        {/* What's included — 4 bold rows */}
        <ul className="max-w-2xl mx-auto mt-8 space-y-3">
          {[
            { icon: <Clock className="w-5 h-5" />, text: "2 HOURS OF SOFT PLAY", color: "neon-pink" },
            { icon: <Snowflake className="w-5 h-5" />, text: "ICE-COLD DRINK", color: "neon-cyan" },
            { icon: <Gift className="w-5 h-5" />, text: "ICE POP", color: "neon-green" },
            { icon: <Zap className="w-5 h-5" />, text: "FREE 30-MIN MIDWEEK RETURN (MON–THU)", color: "neon-yellow" },
          ].map((item) => (
            <li key={item.text}
              className={`flex items-center gap-4 border-2 border-${item.color}/60 bg-[#0a0a16]/80 px-4 py-3 md:px-6 md:py-4`}>
              <span className={`text-${item.color} shrink-0`}>{item.icon}</span>
              <span className={`font-display text-base md:text-xl tracking-wider text-${item.color}`}>
                {item.text}
              </span>
            </li>
          ))}
        </ul>

        <p className="text-center font-body text-white/60 text-xs mt-4 max-w-xl mx-auto">
          Free 30-minute return session valid Mon–Thu within 14 days. Show your booking code on the day.
        </p>

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
