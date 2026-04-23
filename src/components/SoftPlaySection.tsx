import { motion, useInView } from "framer-motion";
import { Baby, Clock, Users, Loader2, Check, Sparkles, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const MAX_CAPACITY = 40;

const SESSIONS = [
  { time: "10:00", label: "10:00 AM" },
  { time: "12:00", label: "12:00 PM" },
  { time: "14:00", label: "2:00 PM" },
  { time: "16:00", label: "4:00 PM" },
  { time: "18:00", label: "6:00 PM" },
  { time: "20:00", label: "8:00 PM" },
];

// Opening day date — update this when confirmed
const OPENING_DATE = "2026-05-01";

const SoftPlaySection = () => {
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [bookedCounts, setBookedCounts] = useState<Record<string, number>>({});
  const [childName, setChildName] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const fetchCounts = async () => {
    const { data } = await supabase
      .from("soft_play_bookings")
      .select("session_time")
      .eq("session_date", OPENING_DATE);

    if (data) {
      const counts: Record<string, number> = {};
      data.forEach((b) => {
        counts[b.session_time] = (counts[b.session_time] || 0) + 1;
      });
      setBookedCounts(counts);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  const handleBook = async () => {
    if (!selectedSession || !childName.trim() || !parentName.trim()) {
      toast({
        title: "Missing info",
        description: "Please fill in your child's name, your name, and select a session.",
        variant: "destructive",
      });
      return;
    }

    const spotsLeft = MAX_CAPACITY - (bookedCounts[selectedSession] || 0);
    if (spotsLeft <= 0) {
      toast({ title: "Session full", description: "This session is fully booked. Please try another time.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-softplay-checkout", {
        body: {
          sessionTime: selectedSession,
          sessionDate: OPENING_DATE,
          childName: childName.trim(),
          parentName: parentName.trim(),
          parentPhone: parentPhone.trim(),
        },
      });

      // Server returned a session-full error (HTTP 409)
      const serverError = (data as any)?.error || (error as any)?.context?.error;
      if (serverError === "SESSION_FULL") {
        toast({
          title: "Session just filled up",
          description: "Sorry — that slot was booked seconds ago. Please choose another time.",
          variant: "destructive",
        });
        await fetchCounts();
        setSelectedSession(null);
        return;
      }

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
    <section id="softplay" className="relative bg-[#070710] overflow-hidden" ref={ref}>
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
          className="text-center mb-12"
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
              <div>
                <label className="font-display text-[10px] tracking-[0.2em] text-white/40 mb-1 block">
                  CHILD'S NAME *
                </label>
                <input
                  type="text"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  placeholder="e.g. Sophie"
                  className="w-full bg-[#070710] border border-white/10 text-white font-body text-sm px-4 py-3 placeholder:text-white/20 focus:outline-none focus:border-neon-cyan/50"
                />
              </div>
              <div>
                <label className="font-display text-[10px] tracking-[0.2em] text-white/40 mb-1 block">
                  PARENT / GUARDIAN NAME *
                </label>
                <input
                  type="text"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="e.g. Sarah Johnson"
                  className="w-full bg-[#070710] border border-white/10 text-white font-body text-sm px-4 py-3 placeholder:text-white/20 focus:outline-none focus:border-neon-cyan/50"
                />
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
              <span className="font-body text-white/60 text-sm">Opening Day Session</span>
              <span className="font-display text-neon-cyan text-lg">£4.00</span>
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
                  BOOK NOW — £4.00
                </>
              )}
            </button>
          </motion.div>
        )}

        {/* Info footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 max-w-3xl mx-auto border border-white/10 p-6 md:p-8 text-center bg-[#0a0a16]"
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
