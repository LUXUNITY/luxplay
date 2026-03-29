import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Unsubscribe = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "valid" | "already" | "invalid" | "done" | "error">("loading");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }

    const validate = async () => {
      try {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
        const res = await fetch(
          `${supabaseUrl}/functions/v1/handle-email-unsubscribe?token=${token}`,
          { headers: { apikey: supabaseKey } }
        );
        const data = await res.json();
        if (data.valid === true) setStatus("valid");
        else if (data.reason === "already_unsubscribed") setStatus("already");
        else setStatus("invalid");
      } catch {
        setStatus("error");
      }
    };
    validate();
  }, [token]);

  const handleUnsubscribe = async () => {
    setSubmitting(true);
    try {
      const { data } = await supabase.functions.invoke("handle-email-unsubscribe", {
        body: { token },
      });
      if (data?.success) setStatus("done");
      else if (data?.reason === "already_unsubscribed") setStatus("already");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
    setSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-[#070710] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center border border-white/10 bg-[#0a0a16] p-10">
        {status === "loading" && <p className="text-white/50 font-body">Loading...</p>}
        {status === "valid" && (
          <>
            <h1 className="font-display text-2xl tracking-wider text-white mb-4">UNSUBSCRIBE</h1>
            <p className="font-body text-white/60 text-sm mb-6">
              Click below to unsubscribe from LuxPlay emails.
            </p>
            <button
              onClick={handleUnsubscribe}
              disabled={submitting}
              className="font-display text-sm tracking-widest text-[#070710] bg-neon-green px-8 py-3 disabled:opacity-50"
            >
              {submitting ? "PROCESSING..." : "CONFIRM UNSUBSCRIBE"}
            </button>
          </>
        )}
        {status === "done" && (
          <>
            <h1 className="font-display text-2xl tracking-wider text-neon-green mb-4">UNSUBSCRIBED</h1>
            <p className="font-body text-white/60 text-sm">You've been unsubscribed from LuxPlay emails.</p>
          </>
        )}
        {status === "already" && (
          <>
            <h1 className="font-display text-2xl tracking-wider text-white mb-4">ALREADY UNSUBSCRIBED</h1>
            <p className="font-body text-white/60 text-sm">You're already unsubscribed.</p>
          </>
        )}
        {status === "invalid" && (
          <>
            <h1 className="font-display text-2xl tracking-wider text-white mb-4">INVALID LINK</h1>
            <p className="font-body text-white/60 text-sm">This unsubscribe link is invalid or expired.</p>
          </>
        )}
        {status === "error" && (
          <>
            <h1 className="font-display text-2xl tracking-wider text-white mb-4">SOMETHING WENT WRONG</h1>
            <p className="font-body text-white/60 text-sm">Please try again later.</p>
          </>
        )}
      </div>
    </main>
  );
};

export default Unsubscribe;
