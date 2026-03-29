import { Check, ArrowLeft, Copy, Loader2, Baby, Clock } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Booking {
  booking_code: string;
  child_name: string;
  parent_name: string;
  parent_email: string;
  session_time: string;
  session_date: string;
}

const SESSION_LABELS: Record<string, string> = {
  "10:00": "10:00 AM",
  "12:00": "12:00 PM",
  "14:00": "2:00 PM",
  "16:00": "4:00 PM",
  "18:00": "6:00 PM",
  "20:00": "8:00 PM",
};

const SoftPlaySuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      setError("No session found.");
      return;
    }

    const fetchBooking = async () => {
      try {
        const { data, error: fnError } = await supabase.functions.invoke("verify-softplay-payment", {
          body: { sessionId },
        });
        if (fnError) throw fnError;
        if (data?.booking) {
          setBooking(data.booking);
          // Send confirmation email
          await supabase.functions.invoke("send-transactional-email", {
            body: {
              templateName: "softplay-booking",
              recipientEmail: data.booking.parent_email,
              idempotencyKey: `softplay-${data.booking.stripe_session_id || sessionId}`,
              templateData: {
                childName: data.booking.child_name,
                parentName: data.booking.parent_name,
                sessionTime: SESSION_LABELS[data.booking.session_time] || data.booking.session_time,
                sessionDate: new Date(data.booking.session_date).toLocaleDateString("en-GB", {
                  weekday: "long", day: "numeric", month: "long", year: "numeric",
                }),
                bookingCode: data.booking.booking_code,
              },
            },
          });
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
      <div className="max-w-lg w-full text-center border border-neon-cyan/30 bg-[#0a0a16] p-10 md:p-14">
        {loading ? (
          <div className="py-12">
            <Loader2 className="w-12 h-12 text-neon-cyan animate-spin mx-auto mb-4" />
            <p className="font-display text-sm tracking-widest text-white/50">
              CONFIRMING YOUR BOOKING...
            </p>
          </div>
        ) : error ? (
          <div className="py-12">
            <p className="font-body text-white/70 text-base mb-6">{error}</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-display text-sm tracking-widest text-[#070710] bg-neon-cyan px-8 py-3"
            >
              <ArrowLeft className="w-4 h-4" />
              BACK TO LUXPLAY
            </Link>
          </div>
        ) : booking ? (
          <>
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-neon-cyan/10 flex items-center justify-center">
              <Baby className="w-10 h-10 text-neon-cyan" />
            </div>

            <h1
              className="font-display text-3xl md:text-4xl tracking-wider text-neon-cyan mb-4"
              style={{ textShadow: "0 0 20px rgba(0,238,255,0.3)" }}
            >
              BOOKING CONFIRMED
            </h1>

            <p className="font-body text-white/70 text-base mb-2">
              <strong className="text-white">{booking.child_name}</strong> is booked in! 🎉
            </p>
            <p className="font-body text-white/40 text-sm mb-6 flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              {SESSION_LABELS[booking.session_time] || booking.session_time} —{" "}
              {new Date(booking.session_date).toLocaleDateString("en-GB", {
                weekday: "long", day: "numeric", month: "long",
              })}
            </p>

            {/* Booking Code */}
            <div className="border-2 border-neon-cyan/40 bg-neon-cyan/5 p-6 mb-6">
              <p className="font-display text-xs tracking-[0.3em] text-white/50 mb-2">
                YOUR BOOKING CODE
              </p>
              <p
                className="font-display text-3xl md:text-4xl tracking-[0.2em] text-neon-cyan mb-3"
                style={{ textShadow: "0 0 15px rgba(0,238,255,0.3)" }}
              >
                {booking.booking_code}
              </p>
              <button
                onClick={copyCode}
                className="inline-flex items-center gap-2 font-display text-xs tracking-widest text-white/60 hover:text-neon-cyan transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                COPY CODE
              </button>
            </div>

            <div className="border border-white/10 bg-[#0d0d1a] p-4 mb-8 text-left space-y-2">
              <p className="font-body text-white/60 text-sm">
                📧 Confirmation sent to <strong className="text-white/80">{booking.parent_email}</strong>
              </p>
              <p className="font-body text-white/60 text-sm">
                🏪 Show this code at the LuxPlay soft play entrance
              </p>
              <p className="font-body text-white/60 text-sm">
                👶 Your child's name will be on the check-in list
              </p>
              <p className="font-body text-neon-pink/70 text-xs mt-2">
                ⚠️ Save this code — screenshot this page or check your email
              </p>
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-2 font-display text-sm tracking-widest text-[#070710] bg-neon-cyan px-8 py-3 hover:shadow-[0_0_30px_rgba(0,238,255,0.4)] transition-all duration-300"
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

export default SoftPlaySuccess;
