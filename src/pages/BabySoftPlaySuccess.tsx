import { ArrowLeft, Copy, Loader2, Baby, Clock } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Booking {
  stripe_session_id?: string;
  booking_code: string;
  parent_name: string;
  parent_email: string;
  session_time: string;
  session_date: string;
  amount_paid?: number;
}

const SESSION_LABELS: Record<string, string> = {
  "10:00": "10:00 AM",
  "12:00": "12:00 PM",
  "14:00": "2:00 PM",
  "16:00": "4:00 PM",
  "18:00": "6:00 PM",
  "20:00": "8:00 PM",
};

const BabySoftPlaySuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("orderId") || searchParams.get("session_id");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const booking = bookings[0] ?? null;

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      setError("No session found.");
      return;
    }

    const fetchBooking = async () => {
      try {
        const { data, error: fnError } = await supabase.functions.invoke("verify-baby-softplay-payment", {
          body: { sessionId },
        });
        if (fnError) throw fnError;
        if (data?.bookings?.length) {
          const allBookings = data.bookings as Booking[];
          const primaryBooking = allBookings[0];
          const bookingCodes = allBookings.map((entry) => entry.booking_code);
          const babyCount = allBookings.length;
          const totalAmount = allBookings.reduce((sum, entry) => sum + (entry.amount_paid || 0), 0);

          setBookings(allBookings);

          // Customer confirmation — reuse the soft play email template
          await supabase.functions.invoke("send-transactional-email", {
            body: {
              templateName: "softplay-booking",
              recipientEmail: primaryBooking.parent_email,
              idempotencyKey: `baby-softplay-${primaryBooking.stripe_session_id || sessionId}`,
              templateData: {
                childCount: babyCount,
                parentName: primaryBooking.parent_name,
                sessionTime: SESSION_LABELS[primaryBooking.session_time] || primaryBooking.session_time,
                sessionDate: new Date(primaryBooking.session_date).toLocaleDateString("en-GB", {
                  weekday: "long", day: "numeric", month: "long", year: "numeric",
                }),
                bookingCode: primaryBooking.booking_code,
                bookingCodes,
                totalAmount: `£${(totalAmount / 100).toFixed(2)}`,
              },
            },
          });
          // Admin notification
          await supabase.functions.invoke("send-transactional-email", {
            body: {
              templateName: "admin-purchase-notification",
              recipientEmail: "luxplayuk@gmail.com",
              idempotencyKey: `admin-baby-softplay-${primaryBooking.stripe_session_id || sessionId}`,
              templateData: {
                type: "softplay",
                customerEmail: primaryBooking.parent_email,
                childCount: babyCount,
                parentName: `[BABY SOFT PLAY] ${primaryBooking.parent_name}`,
                sessionTime: SESSION_LABELS[primaryBooking.session_time] || primaryBooking.session_time,
                sessionDate: new Date(primaryBooking.session_date).toLocaleDateString("en-GB", {
                  weekday: "long", day: "numeric", month: "long", year: "numeric",
                }),
                bookingCode: primaryBooking.booking_code,
                bookingCodes,
                amountPaid: `£${(totalAmount / 100).toFixed(2)}`,
              },
            },
          });
        } else if (data?.booking) {
          setBookings([data.booking as Booking]);
        } else {
          setError(data?.error || "Could not find your booking.");
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [sessionId]);

  const copyCode = () => {
    if (booking?.booking_code) {
      navigator.clipboard.writeText(booking.booking_code);
      toast({ title: "Code copied!", description: "Your booking code has been copied to clipboard." });
    }
  };

  return (
    <main className="min-h-screen bg-[#070710] flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center border border-neon-pink/30 bg-[#0a0a16] p-10 md:p-14">
        {loading ? (
          <div className="py-12">
            <Loader2 className="w-12 h-12 text-neon-pink animate-spin mx-auto mb-4" />
            <p className="font-display text-sm tracking-widest text-white/50">
              CONFIRMING YOUR BOOKING...
            </p>
          </div>
        ) : error ? (
          <div className="py-12">
            <p className="font-body text-white/70 text-base mb-6">{error}</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-display text-sm tracking-widest text-[#070710] bg-neon-pink px-8 py-3"
            >
              <ArrowLeft className="w-4 h-4" />
              BACK TO LUXPLAY
            </Link>
          </div>
        ) : booking ? (
          <>
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-neon-pink/10 flex items-center justify-center">
              <Baby className="w-10 h-10 text-neon-pink" />
            </div>

            <h1
              className="font-display text-3xl md:text-4xl tracking-wider text-neon-pink mb-4"
              style={{ textShadow: "0 0 20px rgba(255,0,204,0.3)" }}
            >
              BABY BOOKING CONFIRMED
            </h1>

            <p className="font-body text-white/70 text-base mb-2">
              <strong className="text-white">
                {bookings.length} {bookings.length === 1 ? "baby" : "babies"}
              </strong>{" "}
              {bookings.length === 1 ? "is" : "are"} booked in! 🎉
            </p>
            <p className="font-body text-white/40 text-sm mb-6 flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              {SESSION_LABELS[booking.session_time] || booking.session_time} —{" "}
              {new Date(booking.session_date).toLocaleDateString("en-GB", {
                weekday: "long", day: "numeric", month: "long",
              })}
            </p>

            <div className="border border-white/10 bg-[#0d0d1a] p-4 mb-6 text-left space-y-2">
              <p className="font-display text-[10px] tracking-[0.3em] text-neon-pink/80 mb-3">
                BOOKING CODE{bookings.length > 1 ? "S" : ""}
              </p>
              <ul className="space-y-2">
                {bookings.map((entry, idx) => (
                  <li key={entry.booking_code} className="flex items-start justify-between gap-3 border-b border-white/5 pb-2 last:border-b-0 last:pb-0">
                    <span className="font-body text-white/80 text-sm">🍼 Baby {idx + 1}</span>
                    <span className="font-display text-[11px] tracking-[0.2em] text-neon-pink">{entry.booking_code}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={copyCode}
                className="inline-flex items-center gap-2 pt-2 font-display text-xs tracking-widest text-white/60 hover:text-neon-pink transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                COPY FIRST CODE
              </button>
            </div>

            <div className="border border-white/10 bg-[#0d0d1a] p-4 mb-8 text-left space-y-2">
              <p className="font-body text-white/60 text-sm">
                📧 Confirmation sent to <strong className="text-white/80">{booking.parent_email}</strong>
              </p>
              <p className="font-body text-white/60 text-sm">
                🏪 Show {bookings.length > 1 ? "these codes" : "this code"} at the LuxPlay baby soft play entrance
              </p>
              <p className="font-body text-neon-cyan/70 text-xs mt-2">
                ⚠️ Save {bookings.length > 1 ? "these codes" : "this code"} — screenshot this page or check your email
              </p>
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-2 font-display text-sm tracking-widest text-[#070710] bg-neon-pink px-8 py-3 hover:shadow-[0_0_30px_rgba(255,0,204,0.4)] transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              BACK TO LUXPLAY
            </Link>
          </>
        ) : null}
      </div>
    </main>
  );
};

export default BabySoftPlaySuccess;
