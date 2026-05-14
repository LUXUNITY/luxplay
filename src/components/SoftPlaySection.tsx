import { motion, useInView } from "framer-motion";
import { Baby, Clock, Users, Loader2, Check, Sparkles, Plus, Minus, Info } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import DateStrip from "./softplay/DateStrip";
import { getAvailableDates, getSlotsForDate, getSoftPlayPrice, getSoftPlayFullPrice, isOpeningWeekend } from "./softplay/dateSlots";

const MAX_CAPACITY = 40;
// Price is now date-dependent — see getSoftPlayPrice in dateSlots.ts
const MAX_CHILDREN_PER_BOOKING = 6;

const SoftPlaySection = () => {
  const initialDate = getAvailableDates()[0]?.iso;
  const [selectedDate, setSelectedDate] = useState<string>(initialDate);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [bookedCounts, setBookedCounts] = useState<Record<string, number>>({});
  const [childCount, setChildCount] = useState<number>(1);
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const SESSIONS = useMemo(() => getSlotsForDate(selectedDate), [selectedDate]);

  useEffect(() => {
    setSelectedSession(null);
    setBookedCounts({});
    const fetchCounts = async () => {
      const { data } = await supabase
        .from("soft_play_bookings")
        .select("session_time")
        .eq("session_date", selectedDate);

      if (data) {
        const counts: Record<string, number> = {};
        data.forEach((b) => {
          counts[b.session_time] = (counts[b.session_time] || 0) + 1;
        });
        setBookedCounts(counts);
      }
    };
    fetchCounts();
  }, [selectedDate]);


  const decChild = () => setChildCount((n) => Math.max(1, n - 1));
  const incChild = () =>
    setChildCount((n) => Math.min(MAX_CHILDREN_PER_BOOKING, n + 1));

  const pricePerChild = getSoftPlayPrice(selectedDate);
  const fullPrice = getSoftPlayFullPrice(selectedDate);
  const totalPrice = childCount * pricePerChild;
  const isOpening = isOpeningWeekend(selectedDate);

  const handleBook = async () => {
    if (!selectedSession || childCount < 1 || !parentName.trim()) {
      toast({
        title: "Missing info",
        description:
          "Please choose a session, number of children and enter one parent or guardian name.",
        variant: "destructive",
      });
      return;
    }

    if (/[\/,]/.test(parentName)) {
      toast({
        title: "One parent name only",
        description: "Please enter one parent or guardian name in that field.",
        variant: "destructive",
      });
      return;
    }

    const spotsLeft = MAX_CAPACITY - (bookedCounts[selectedSession] || 0);
    if (spotsLeft < childCount) {
      toast({
        title: "Not enough spots",
        description: `Only ${spotsLeft} spot${spotsLeft === 1 ? "" : "s"} left in this session.`,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke(
        "create-softplay-checkout",
        {
          body: {
            sessionTime: selectedSession,
            sessionDate: selectedDate,
            childCount,
            parentName: parentName.trim(),
            parentPhone: parentPhone.trim(),
          },
        },
      );
      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      toast({
        title: "Booking failed",
        description: err.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="softplay" className="relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-cyan via-neon-pink to-neon-purple" />

      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-neon-cyan/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-neon-pink/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 px-6 md:px-12 lg:px-20 py-20 md:py-28">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <span className="inline-flex items-center gap-2 border-2 border-neon-cyan bg-neon-cyan/10 text-neon-cyan font-display text-sm tracking-[0.3em] uppercase px-6 py-3 animate-pulse mb-6">
            <Sparkles className="w-4 h-4" />
            OPENING DAY SPECIAL
            <Sparkles className="w-4 h-4" />
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-2"
        >
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wider">
            <span className="text-gradient-neon">SOFT PLAY</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="font-body text-white/50 text-sm md:text-base mb-2">
            Book your child's spot for opening day — limited to 40 kids per session
          </p>
          <div className="flex items-center justify-center gap-4 mt-3">
            <span className="font-display text-2xl text-white/30 line-through">£8.00</span>
            <span className="font-display text-5xl md:text-6xl text-neon-cyan glow-cyan">£4.00</span>
            <span className="bg-neon-pink text-[#070710] font-display text-xs tracking-widest px-3 py-1 animate-pulse">
              50% OFF
            </span>
          </div>
        </motion.div>

        {/* ADULTS FREE — big, in-your-face badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="relative border-4 border-neon-pink bg-neon-pink/10 px-6 py-5 md:py-6 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/0 via-neon-pink/20 to-neon-pink/0 animate-pulse pointer-events-none" />
            <p className="relative font-display text-3xl md:text-5xl lg:text-6xl tracking-wider text-neon-pink glow-pink leading-tight">
              ADULTS GO FREE!
            </p>
            <p className="relative font-body text-white/80 text-xs md:text-sm tracking-[0.2em] uppercase mt-2">
              Up to <span className="text-white font-bold">2 adults free per child</span> — no extra charge
            </p>
          </div>
        </motion.div>

        {/* Date Strip */}
        <DateStrip selectedDate={selectedDate} onSelect={setSelectedDate} accent="cyan" />

        {/* Session Grid */}
        <div className="max-w-4xl mx-auto mb-10">
          <p className="font-display text-xs tracking-[0.3em] text-white/40 text-center mb-6">
            <Clock className="w-4 h-4 inline mr-2" />
            CHOOSE YOUR SESSION
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {SESSIONS.map((s, i) => {
              const booked = bookedCounts[s.time] || 0;
              const spotsLeft = MAX_CAPACITY - booked;
              const isFull = spotsLeft <= 0;
              const isSelected = selectedSession === s.time;
              const isLow = spotsLeft > 0 && spotsLeft <= 10;

              return (
                <motion.button
                  key={s.time}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  disabled={isFull}
                  onClick={() => setSelectedSession(s.time)}
                  className={`relative p-4 text-center transition-all duration-300 ${
                    isFull
                      ? "border border-white/5 bg-white/[0.02] opacity-40 cursor-not-allowed"
                      : isSelected
                      ? "border-2 border-neon-cyan bg-neon-cyan/10 shadow-[0_0_25px_rgba(0,238,255,0.2)]"
                      : "border border-white/10 bg-[#0a0a16] hover:border-neon-cyan/40"
                  }`}
                >
                  <p className={`font-display text-lg tracking-wider mb-1 ${
                    isSelected ? "text-neon-cyan" : "text-white/80"
                  }`}>
                    {s.label}
                  </p>
                  <div className="flex items-center justify-center gap-1.5">
                    <Users className={`w-3 h-3 ${isFull ? "text-red-400" : isLow ? "text-neon-pink" : "text-neon-green"}`} />
                    <span className={`font-display text-xs tracking-wider ${
                      isFull ? "text-red-400" : isLow ? "text-neon-pink" : "text-white/40"
                    }`}>
                      {isFull ? "FULL" : `${spotsLeft} LEFT`}
                    </span>
                  </div>
                  {/* Capacity bar */}
                  <div className="w-full h-1 bg-white/5 mt-2 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        isFull ? "bg-red-500" : isLow ? "bg-neon-pink" : "bg-neon-green"
                      }`}
                      style={{ width: `${(booked / MAX_CAPACITY) * 100}%` }}
                    />
                  </div>
                  {isSelected && (
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-neon-cyan rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-[#070710]" />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Booking Form */}
        {selectedSession && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg mx-auto border border-neon-cyan/30 bg-[#0a0a16] p-8"
          >
            <p className="font-display text-xs tracking-[0.3em] text-neon-cyan text-center mb-6">
              BOOKING FOR {SESSIONS.find(s => s.time === selectedSession)?.label} SESSION
            </p>

            <div className="space-y-4 mb-6">
              {/* Number of children */}
              <div>
                <label className="font-display text-[10px] tracking-[0.2em] text-white/40 mb-2 block">
                  NUMBER OF CHILDREN *
                </label>
                <div className="flex items-center justify-between bg-[#070710] border border-white/10 px-2 py-2">
                  <button
                    type="button"
                    onClick={decChild}
                    disabled={childCount <= 1}
                    aria-label="Decrease number of children"
                    className="w-12 h-12 flex items-center justify-center text-white/70 hover:text-neon-cyan disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <div className="text-center">
                    <p className="font-display text-3xl text-neon-cyan glow-cyan">{childCount}</p>
                    <p className="font-body text-[10px] tracking-[0.2em] text-white/30 uppercase mt-0.5">
                      {childCount === 1 ? "child" : "children"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={incChild}
                    disabled={childCount >= MAX_CHILDREN_PER_BOOKING}
                    aria-label="Increase number of children"
                    className="w-12 h-12 flex items-center justify-center text-white/70 hover:text-neon-cyan disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <p className="mt-2 font-body text-[11px] text-white/35">
                  Max {MAX_CHILDREN_PER_BOOKING} children per booking. Names not required.
                </p>
              </div>

              <div>
                <label className="font-display text-[10px] tracking-[0.2em] text-white/40 mb-1 block">
                  PARENT / GUARDIAN NAME (ONE ONLY) *
                </label>
                <input
                  type="text"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="e.g. Sarah Johnson"
                  className="w-full bg-[#070710] border border-white/10 text-white font-body text-sm px-4 py-3 placeholder:text-white/20 focus:outline-none focus:border-neon-cyan/50"
                />
                <p className="mt-2 font-body text-[11px] text-white/35">
                  Enter one parent or guardian name only.
                </p>
              </div>
              <div>
                <label className="font-display text-[10px] tracking-[0.2em] text-white/40 mb-1 block">
                  PHONE NUMBER (OPTIONAL)
                </label>
                <input
                  type="tel"
                  value={parentPhone}
                  onChange={(e) => setParentPhone(e.target.value)}
                  placeholder="e.g. 07700 900000"
                  className="w-full bg-[#070710] border border-white/10 text-white font-body text-sm px-4 py-3 placeholder:text-white/20 focus:outline-none focus:border-neon-cyan/50"
                />
              </div>
            </div>

            <div className="border border-white/10 bg-[#0d0d1a] p-3 mb-6 flex items-center justify-between">
              <span className="font-body text-white/60 text-sm">
                {childCount} {childCount === 1 ? "child" : "children"} × £{pricePerChild.toFixed(2)}
              </span>
              <span className="font-display text-neon-cyan text-lg">
                £{totalPrice.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleBook}
              disabled={loading}
              className="w-full font-display text-sm tracking-widest py-4 bg-neon-cyan text-[#070710] hover:shadow-[0_0_40px_rgba(0,238,255,0.4)] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Baby className="w-4 h-4" />
                  BOOK NOW — £{totalPrice.toFixed(2)}
                </>
              )}
            </button>
          </motion.div>
        )}

        {/* Policy / safety info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 max-w-3xl mx-auto border border-white/10 bg-[#0a0a16]/60 p-4 md:p-5"
        >
          <div className="flex items-start gap-3">
            <Info className="w-4 h-4 text-neon-cyan shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <p className="font-display text-[10px] tracking-[0.25em] text-neon-cyan/80">
                GOOD TO KNOW
              </p>
              <ul className="font-body text-white/60 text-xs md:text-sm space-y-1 list-disc list-inside marker:text-white/30">
                <li>Height limit: <span className="text-white/80">145 cm maximum</span>.</li>
                <li>Babies under 2: see our separate <span className="text-white/80">Baby Soft Play</span> section below — £3 per baby.</li>
                <li>Up to <span className="text-white/80">2 adults free per child</span> — additional adults are charged on the day.</li>
                <li>Anyone supervising a child must be <span className="text-white/80">13 years or older</span>.</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Info footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-6 max-w-3xl mx-auto border border-white/10 p-6 md:p-8 text-center bg-[#0a0a16]"
        >
          <p className="text-white/80 font-body text-sm md:text-base font-semibold">
            Opening day only — <strong className="text-white">normal price £8 after launch.</strong>
          </p>
          <p className="text-neon-cyan font-bold mt-3 text-sm md:text-base glow-cyan font-body">
            Limited to 40 kids per session. Book now to guarantee your spot.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SoftPlaySection;
