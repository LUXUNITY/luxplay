import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Clock, Gift, Loader2, LogOut, Star, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import DateStrip from "@/components/softplay/DateStrip";
import BookingQr from "@/components/BookingQr";
import {
  getAvailableDates,
  getSlotsForDate,
  isSlotForcedFull,
  isSoftPlaySlotBlocked,
} from "@/components/softplay/dateSlots";

const STAMPS_PER_REWARD = 6;
const MAX_CAPACITY = 40;

interface Stamp {
  id: string;
  booking_code: string | null;
  session_date: string | null;
  created_at: string;
}

interface Redemption {
  id: string;
  booking_code: string;
  session_date: string;
  session_time: string;
  created_at: string;
}

const Loyalty = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();

  const [stamps, setStamps] = useState<Stamp[]>([]);
  const [redemptions, setRedemptions] = useState<Redemption[]>([]);
  const [loadingCard, setLoadingCard] = useState(true);

  const [claiming, setClaiming] = useState(false);
  const [showClaim, setShowClaim] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(getAvailableDates()[0]?.iso);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [bookedCounts, setBookedCounts] = useState<Record<string, number>>({});
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [newCode, setNewCode] = useState<string | null>(null);

  const SESSIONS = useMemo(() => getSlotsForDate(selectedDate), [selectedDate]);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth", { replace: true });
  }, [authLoading, user, navigate]);

  const loadCard = async () => {
    if (!user) return;
    setLoadingCard(true);
    const [stampRes, redemptionRes] = await Promise.all([
      supabase
        .from("loyalty_stamps")
        .select("id, booking_code, session_date, created_at")
        .eq("consumed", false)
        .order("created_at", { ascending: true }),
      supabase
        .from("loyalty_redemptions")
        .select("id, booking_code, session_date, session_time, created_at")
        .order("created_at", { ascending: false }),
    ]);
    setStamps((stampRes.data as Stamp[]) || []);
    setRedemptions((redemptionRes.data as Redemption[]) || []);
    setLoadingCard(false);
  };

  useEffect(() => {
    if (user) loadCard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  useEffect(() => {
    setSelectedSession(null);
    setBookedCounts({});
    const fetchCounts = async () => {
      const { data } = await supabase
        .from("soft_play_availability")
        .select("session_time, booked_count")
        .eq("session_date", selectedDate);
      if (data) {
        const counts: Record<string, number> = {};
        data.forEach((b: any) => {
          counts[b.session_time] = Number(b.booked_count) || 0;
        });
        setBookedCounts(counts);
      }
    };
    fetchCounts();
  }, [selectedDate]);

  const stampCount = stamps.length;
  const progress = stampCount % STAMPS_PER_REWARD;
  const rewardsReady = Math.floor(stampCount / STAMPS_PER_REWARD);
  const filled = rewardsReady > 0 ? STAMPS_PER_REWARD : progress;

  const handleClaim = async () => {
    if (!selectedSession || !parentName.trim()) {
      toast({
        title: "Missing info",
        description: "Pick a session and enter the parent or guardian name.",
        variant: "destructive",
      });
      return;
    }
    setClaiming(true);
    try {
      const { data, error } = await supabase.functions.invoke("redeem-loyalty-session", {
        body: {
          sessionDate: selectedDate,
          sessionTime: selectedSession,
          parentName: parentName.trim(),
          parentPhone: parentPhone.trim(),
        },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setNewCode(data.bookingCode);
      setShowClaim(false);
      await loadCard();
      toast({
        title: "Free session booked!",
        description: "Your booking code is on screen and in your email.",
      });
    } catch (err: any) {
      toast({
        title: "Could not claim reward",
        description: err.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setClaiming(false);
    }
  };

  if (authLoading || !user) {
    return (
      <main className="min-h-screen bg-[#070710] flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-neon-green animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#070710] px-5 md:px-10 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-display text-[11px] tracking-[0.25em] text-white/40 hover:text-neon-cyan"
          >
            <ArrowLeft className="w-3 h-3" /> LUXPLAY
          </Link>
          <button
            onClick={async () => {
              await signOut();
              navigate("/");
            }}
            className="inline-flex items-center gap-2 font-display text-[11px] tracking-[0.25em] text-white/40 hover:text-neon-pink"
          >
            SIGN OUT <LogOut className="w-3 h-3" />
          </button>
        </div>

        <div className="text-center mb-10">
          <h1 className="font-display text-5xl md:text-7xl tracking-wider text-gradient-neon">
            MY REWARDS
          </h1>
          <p className="font-body text-white/50 text-sm mt-3">
            6 paid soft play sessions = 1 free session. One stamp per child, every time.
          </p>
          <p className="font-body text-white/30 text-xs mt-1">{user.email}</p>
        </div>

        {/* Stamp card */}
        <div className="border-2 border-neon-green/40 bg-[#0a0a16] p-6 md:p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <p className="font-display text-[11px] tracking-[0.3em] text-neon-green">
              STAMP CARD
            </p>
            <p className="font-display text-sm tracking-widest text-white/60">
              {filled}/{STAMPS_PER_REWARD}
            </p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6">
            {Array.from({ length: STAMPS_PER_REWARD }).map((_, i) => {
              const done = i < filled;
              return (
                <div
                  key={i}
                  className={`aspect-square flex items-center justify-center border-2 transition-all duration-300 ${
                    done
                      ? "border-neon-green bg-neon-green/15 shadow-[0_0_20px_rgba(170,255,0,0.25)]"
                      : "border-white/10 bg-white/[0.02]"
                  }`}
                >
                  {done ? (
                    <Star className="w-7 h-7 text-neon-green" fill="currentColor" />
                  ) : (
                    <span className="font-display text-white/20 text-xl">{i + 1}</span>
                  )}
                </div>
              );
            })}
          </div>

          {loadingCard ? (
            <Loader2 className="w-4 h-4 text-neon-green animate-spin mx-auto" />
          ) : rewardsReady > 0 ? (
            <div className="border-2 border-neon-pink bg-neon-pink/10 p-5 text-center">
              <p className="font-display text-2xl md:text-3xl tracking-wider text-neon-pink glow-pink">
                FREE SESSION UNLOCKED!
              </p>
              <p className="font-body text-white/70 text-xs mt-2">
                You have {rewardsReady} free soft play session
                {rewardsReady === 1 ? "" : "s"} waiting.
              </p>
              <button
                onClick={() => setShowClaim(true)}
                className="mt-4 w-full font-display text-sm tracking-widest py-4 bg-neon-pink text-[#070710] hover:shadow-[0_0_40px_rgba(255,0,153,0.4)] transition-all flex items-center justify-center gap-2"
              >
                <Gift className="w-4 h-4" /> BOOK MY FREE SESSION
              </button>
            </div>
          ) : (
            <p className="font-body text-white/50 text-sm text-center">
              {STAMPS_PER_REWARD - progress} more session
              {STAMPS_PER_REWARD - progress === 1 ? "" : "s"} until your free one.{" "}
              <Link to="/#softplay" className="text-neon-cyan underline">
                Book soft play
              </Link>
            </p>
          )}
        </div>

        {/* Newly claimed code */}
        {newCode && (
          <div className="border-2 border-neon-green bg-[#0a0a16] p-6 mb-8 text-center">
            <p className="font-display text-[11px] tracking-[0.3em] text-neon-green mb-4">
              YOUR FREE SESSION BOOKING
            </p>
            <BookingQr value={newCode} label="SHOW THIS AT THE DESK" accent="#aaff00" />
          </div>
        )}

        {/* Claim flow */}
        {showClaim && (
          <div className="border border-neon-pink/40 bg-[#0a0a16] p-6 mb-8">
            <p className="font-display text-[11px] tracking-[0.3em] text-neon-pink mb-5">
              CHOOSE YOUR FREE SESSION
            </p>

            <DateStrip selectedDate={selectedDate} onSelect={setSelectedDate} accent="pink" />

            <p className="font-display text-[10px] tracking-[0.3em] text-white/40 text-center my-5">
              <Clock className="w-3 h-3 inline mr-2" />
              PICK A TIME
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {SESSIONS.map((s) => {
                const forcedFull =
                  isSlotForcedFull(selectedDate, s.time) ||
                  isSoftPlaySlotBlocked(selectedDate, s.time);
                const booked = forcedFull ? MAX_CAPACITY : bookedCounts[s.time] || 0;
                const spotsLeft = MAX_CAPACITY - booked;
                const isFull = spotsLeft <= 0;
                const isSelected = selectedSession === s.time;
                return (
                  <button
                    key={s.time}
                    disabled={isFull}
                    onClick={() => setSelectedSession(s.time)}
                    className={`relative p-4 text-center transition-all ${
                      isFull
                        ? "border border-white/5 bg-white/[0.02] opacity-40 cursor-not-allowed"
                        : isSelected
                        ? "border-2 border-neon-pink bg-neon-pink/10"
                        : "border border-white/10 bg-[#070710] hover:border-neon-pink/40"
                    }`}
                  >
                    <p
                      className={`font-display text-lg tracking-wider mb-1 ${
                        isSelected ? "text-neon-pink" : "text-white/80"
                      }`}
                    >
                      {s.label}
                    </p>
                    <span className="font-display text-[10px] tracking-wider text-white/40 inline-flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {isFull ? "FULL" : `${spotsLeft} LEFT`}
                    </span>
                    {isSelected && (
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-neon-pink rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-[#070710]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="font-display text-[10px] tracking-[0.2em] text-white/40 mb-1 block">
                  PARENT / GUARDIAN NAME *
                </label>
                <input
                  type="text"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="e.g. Sarah Johnson"
                  className="w-full bg-[#070710] border border-white/10 text-white font-body text-sm px-4 py-3 placeholder:text-white/20 focus:outline-none focus:border-neon-pink/50"
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
                  className="w-full bg-[#070710] border border-white/10 text-white font-body text-sm px-4 py-3 placeholder:text-white/20 focus:outline-none focus:border-neon-pink/50"
                />
              </div>
            </div>

            <button
              onClick={handleClaim}
              disabled={claiming}
              className="w-full font-display text-sm tracking-widest py-4 bg-neon-pink text-[#070710] hover:shadow-[0_0_40px_rgba(255,0,153,0.4)] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {claiming ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Gift className="w-4 h-4" /> CLAIM FREE SESSION — £0.00
                </>
              )}
            </button>
          </div>
        )}

        {/* History */}
        {redemptions.length > 0 && (
          <div className="border border-white/10 bg-[#0a0a16] p-6">
            <p className="font-display text-[11px] tracking-[0.3em] text-white/40 mb-4">
              FREE SESSIONS CLAIMED
            </p>
            <ul className="space-y-2">
              {redemptions.map((r) => (
                <li
                  key={r.id}
                  className="flex items-center justify-between font-body text-sm text-white/60 border-b border-white/5 pb-2"
                >
                  <span>
                    {new Date(`${r.session_date}T12:00:00Z`).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      timeZone: "UTC",
                    })}{" "}
                    · {r.session_time}
                  </span>
                  <span className="font-display tracking-[0.2em] text-neon-green">
                    {r.booking_code}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
};

export default Loyalty;
