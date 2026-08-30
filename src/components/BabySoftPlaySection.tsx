import { motion, useInView } from "framer-motion";
import { Baby, Users, Loader2, Check, Plus, Minus, Info } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import DateStrip from "./softplay/DateStrip";
import { getAvailableDates, getSlotsForDate, getBabyPrice, getBabyFullPrice, isOpeningWeekend, isSlotForcedFull, isBabySlotBlocked } from "./softplay/dateSlots";

const MAX_CAPACITY = 15;
// Price is now date-dependent — see getBabyPrice in dateSlots.ts
const MAX_BABIES_PER_BOOKING = 4;

const BabySoftPlaySection = () => {
  const initialDate = getAvailableDates()[0]?.iso;
  const [selectedDate, setSelectedDate] = useState<string>(initialDate);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [bookedCounts, setBookedCounts] = useState<Record<string, number>>({});
  const [babyCount, setBabyCount] = useState<number>(1);
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
        .from("baby_soft_play_availability")
        .select("session_time, booked_count")
        .eq("session_date", selectedDate);

      if (data) {
        const counts: Record<string, number> = {};
        data.forEach((b) => {
          counts[b.session_time] = Number(b.booked_count) || 0;
        });
        setBookedCounts(counts);
      }
    };
    fetchCounts();
  }, [selectedDate]);


  const decBaby = () => setBabyCount((n) => Math.max(1, n - 1));
  const incBaby = () =>
    setBabyCount((n) => Math.min(MAX_BABIES_PER_BOOKING, n + 1));

  const pricePerBaby = getBabyPrice(selectedDate);
  const fullPrice = getBabyFullPrice(selectedDate);
  const totalPrice = babyCount * pricePerBaby;
  const isOpening = isOpeningWeekend(selectedDate);
  

  const handleBook = async () => {
    if (!selectedSession || babyCount < 1 || !parentName.trim()) {
      toast({
        title: "Missing info",
        description:
          "Please choose a session, number of babies and enter one parent or guardian name.",
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
    if (spotsLeft < babyCount) {
      toast({
        title: "Not enough baby spots",
        description: `Only ${spotsLeft} baby spot${spotsLeft === 1 ? "" : "s"} left in this session.`,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke(
        "create-baby-softplay-checkout",
        {
          body: {
            sessionTime: selectedSession,
            sessionDate: selectedDate,
            babyCount,
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
    <section id="baby-softplay" className="relative overflow-hidden bg-white" ref={ref}>
      <div className="relative z-10 px-4 py-14 max-w-md mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <span className="inline-block rounded-full bg-neon-cyan px-4 py-1 font-display text-xs font-extrabold tracking-widest mb-3">
            UNDER 3'S ONLY
          </span>
          <h2 className="font-display text-4xl tracking-tighter font-extrabold text-foreground mb-2">
            BABY SOFT PLAY
          </h2>
          <p className="font-body text-foreground/60 text-sm">
            Max 15 babies/session
          </p>
          <div className="mt-3 inline-block rounded-2xl bg-neon-pink px-6 py-2" style={{ boxShadow: "0 6px 0 0 #C7106F" }}>
            <span className="font-display text-3xl font-extrabold text-white">
              £{getBabyFullPrice(selectedDate).toFixed(2)}
            </span>
          </div>
        </motion.div>

        {/* 2 ADULTS PER BABY banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-8 rounded-3xl bg-neon-cyan text-foreground text-center py-4 px-4"
          style={{ boxShadow: "0 8px 0 0 #0091BF" }}
        >
          <p className="font-display text-xl font-extrabold tracking-tight">2 ADULTS FREE</p>
          <p className="font-body text-xs mt-1 opacity-80">Per baby — no extra charge</p>
        </motion.div>

        {/* Step 1: Date */}
        <DateStrip selectedDate={selectedDate} onSelect={setSelectedDate} accent="pink" />

        {/* Step 2: Time */}
        <div className="mb-6">
          <p className="font-display text-xs tracking-widest text-foreground/50 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-neon-cyan text-foreground flex items-center justify-center text-[11px] font-extrabold">2</span>
            PICK A TIME
          </p>

          <div className="grid grid-cols-2 gap-3">
            {SESSIONS.map((s, i) => {
              const partyBooked = isBabySlotBlocked(selectedDate, s.time);
              const forcedFull = isSlotForcedFull(selectedDate, s.time) || partyBooked;
              const booked = forcedFull ? MAX_CAPACITY : (bookedCounts[s.time] || 0);
              const spotsLeft = MAX_CAPACITY - booked;
              const isFull = spotsLeft <= 0;
              const isSelected = selectedSession === s.time;
              const isLow = spotsLeft > 0 && spotsLeft <= 4;

              return (
                <motion.button
                  key={s.time}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  disabled={isFull}
                  onClick={() => setSelectedSession(s.time)}
                  className={`relative rounded-2xl min-h-[64px] px-3 py-3 text-center transition-transform active:translate-y-1 ${
                    isFull
                      ? "bg-muted opacity-40 cursor-not-allowed"
                      : isSelected
                      ? "bg-neon-pink text-white"
                      : "bg-muted text-foreground"
                  }`}
                  style={{
                    boxShadow: isFull
                      ? "none"
                      : isSelected
                      ? "0 6px 0 0 #C7106F"
                      : "0 6px 0 0 #D9D9DE",
                  }}
                >
                  <p className="font-display text-base font-extrabold tracking-tight mb-0.5">
                    {s.label}
                  </p>
                  <div className="flex items-center justify-center gap-1">
                    {partyBooked ? (
                      <span className="font-display text-[10px] tracking-wide">🎉 PARTY BOOKED</span>
                    ) : (
                      <>
                        <Users className="w-3 h-3" />
                        <span className="font-body text-[11px]">
                          {isFull ? "FULL" : `${spotsLeft} left`}
                        </span>
                      </>
                    )}
                  </div>
                  {isSelected && (
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-neon-cyan rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-foreground" />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Numbers + Book */}
        {selectedSession && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl bg-muted p-5"
            style={{ boxShadow: "0 8px 0 0 #D9D9DE" }}
          >
            <p className="font-display text-xs tracking-widest text-foreground/50 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-neon-cyan text-foreground flex items-center justify-center text-[11px] font-extrabold">3</span>
              NUMBERS & DETAILS
            </p>

            <div className="space-y-4 mb-5">
              <div>
                <label className="font-display text-[11px] tracking-widest text-foreground/50 mb-2 block">
                  BABIES
                </label>
                <div className="flex items-center justify-between bg-white rounded-2xl px-2 py-2">
                  <button
                    type="button"
                    onClick={decBaby}
                    disabled={babyCount <= 1}
                    aria-label="Decrease number of babies"
                    className="w-12 h-12 rounded-xl flex items-center justify-center bg-neon-pink disabled:opacity-30 disabled:cursor-not-allowed active:translate-y-1 transition-transform"
                  >
                    <Minus className="w-5 h-5 text-white" />
                  </button>
                  <div className="text-center">
                    <p className="font-display text-3xl font-extrabold text-foreground">{babyCount}</p>
                    <p className="font-body text-[11px] text-foreground/50 uppercase">
                      {babyCount === 1 ? "baby" : "babies"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={incBaby}
                    disabled={babyCount >= MAX_BABIES_PER_BOOKING}
                    aria-label="Increase number of babies"
                    className="w-12 h-12 rounded-xl flex items-center justify-center bg-neon-pink disabled:opacity-30 disabled:cursor-not-allowed active:translate-y-1 transition-transform"
                  >
                    <Plus className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              <div>
                <label className="font-display text-[11px] tracking-widest text-foreground/50 mb-1 block">
                  PARENT / GUARDIAN NAME *
                </label>
                <input
                  type="text"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="e.g. Sarah Johnson"
                  className="w-full bg-white rounded-2xl text-foreground font-body text-sm px-4 py-3 placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-neon-pink"
                />
              </div>
              <div>
                <label className="font-display text-[11px] tracking-widest text-foreground/50 mb-1 block">
                  PHONE (OPTIONAL)
                </label>
                <input
                  type="tel"
                  value={parentPhone}
                  onChange={(e) => setParentPhone(e.target.value)}
                  placeholder="e.g. 07700 900000"
                  className="w-full bg-white rounded-2xl text-foreground font-body text-sm px-4 py-3 placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-neon-pink"
                />
              </div>
            </div>

            <div className="rounded-2xl bg-white px-4 py-3 mb-2 flex items-center justify-between">
              <span className="font-body text-foreground/60 text-sm">
                {babyCount} × £{pricePerBaby.toFixed(2)}
              </span>
              <span className="font-display text-foreground text-lg font-extrabold">
                £{totalPrice.toFixed(2)}
              </span>
            </div>
            <p className="font-display text-[11px] tracking-widest text-neon-cyan/80 mb-4 text-center bg-foreground/5 rounded-full py-1">
              + 2 ADULTS FREE PER BABY
            </p>

            <button
              onClick={handleBook}
              disabled={loading}
              className="w-full rounded-2xl font-display text-base font-extrabold tracking-tight py-4 bg-neon-pink text-white active:translate-y-1 transition-transform disabled:opacity-50 flex items-center justify-center gap-2"
              style={{ boxShadow: "0 8px 0 0 #C7106F" }}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Baby className="w-5 h-5" />
                  BOOK — £{totalPrice.toFixed(2)}
                </>
              )}
            </button>
          </motion.div>
        )}

        {/* Rules */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-6 rounded-3xl bg-muted p-4"
        >
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-foreground/50 shrink-0 mt-0.5" />
            <ul className="font-body text-foreground/70 text-xs space-y-1 list-disc list-inside">
              <li>Under 3s only</li>
              <li>Up to 2 adults free per baby</li>
              <li>3+? Book main Soft Play</li>
              <li>Supervisors must be 13+</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BabySoftPlaySection;
