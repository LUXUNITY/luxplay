import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";


// Pricing — matches the in-store credits poster exactly.
const tiers = [
  { id: "c50",   credits: 50,   price: 5,   color: "green" },
  { id: "c130",  credits: 130,  price: 10,  color: "cyan" },
  { id: "c300",  credits: 300,  price: 20,  color: "pink",   best: true },
  { id: "c800",  credits: 800,  price: 50,  color: "cyan" },
  { id: "c2000", credits: 2000, price: 100, color: "green" },
];

// Format £X.XX without trailing .00
const fmtPrice = (n: number) =>
  Number.isInteger(n) ? `£${n}` : `£${n.toFixed(2)}`;

// Bright Play Pop palette + matching darker Memphis shadow tones.
const colorClasses: Record<string, { bg: string; shadow: string }> = {
  green: { bg: "bg-neon-green", shadow: "#24B00C" },
  pink: { bg: "bg-neon-pink", shadow: "#B80AAA" },
  cyan: { bg: "bg-neon-cyan", shadow: "#00A3B8" },
};

const PreSaleSection = () => {
  const [loading, setLoading] = useState<string | null>(null);

  const handleBuy = async (id: string) => {
    setLoading(id);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { packageId: id },
      });
      if (error) throw error;
      if (data?.url) window.location.href = data.url;
    } catch (err: any) {
      toast({
        title: "Checkout failed",
        description: err.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <section id="presale" className="relative bg-card">
      <div className="relative z-10 px-4 py-16 md:py-20 max-w-md mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <h2 className="font-display font-extrabold text-5xl tracking-tighter text-foreground">
            LUXPLAY
          </h2>
          <p className="font-display font-extrabold text-xl tracking-tighter text-neon-pink mt-1">
            CREDITS
          </p>
        </motion.div>

        {/* Online discount badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span
            className="inline-block bg-neon-cyan text-ink font-display font-extrabold text-xs uppercase px-5 py-2.5 rounded-full"
            style={{ boxShadow: "0 6px 0 0 #00A3B8" }}
          >
            🎮 Buy online, play instantly
          </span>
          <p className="font-body text-foreground/60 text-xs mt-3">
            5–10 credits per play · Never expires
          </p>
        </motion.div>

        {/* Credits list */}
        <div className="space-y-3">
          {tiers.map((t, i) => {
            const c = colorClasses[t.color];
            const isBest = !!t.best;
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className={`relative rounded-3xl ${c.bg} flex items-center justify-between gap-3 px-5 ${
                  isBest ? "py-7" : "py-4"
                }`}
                style={{
                  boxShadow: `0 8px 0 0 ${c.shadow}`,
                  animation: isBest ? "luxpulse 1.8s ease-in-out infinite" : undefined,
                }}
              >
                {isBest && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-ink text-white font-display font-extrabold text-[10px] tracking-wide px-4 py-1 rounded-full whitespace-nowrap">
                    ⭐ BEST VALUE
                  </span>
                )}

                <div className="flex flex-col">
                  <span
                    className={`font-display font-extrabold tracking-tighter text-ink leading-none ${
                      isBest ? "text-4xl" : "text-2xl"
                    }`}
                  >
                    {t.credits.toLocaleString()}
                  </span>
                  <span className="font-body text-ink/70 text-[11px] uppercase tracking-wide">
                    credits
                  </span>
                </div>

                <span
                  className={`font-display font-extrabold text-ink ${
                    isBest ? "text-4xl" : "text-2xl"
                  }`}
                >
                  {fmtPrice(t.price)}
                </span>

                <button
                  onClick={() => handleBuy(t.id)}
                  disabled={loading === t.id}
                  className={`rounded-full bg-ink text-white font-display font-extrabold tracking-wide active:translate-y-1 transition-transform disabled:opacity-50 whitespace-nowrap ${
                    isBest ? "text-sm px-6 py-3" : "text-xs px-4 py-2.5"
                  }`}
                >
                  {loading === t.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "BUY"
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 rounded-3xl bg-muted p-5 text-center"
        >
          <p className="text-foreground/70 font-body text-sm">
            Credits load straight to your LuxPlay card.
          </p>
        </motion.div>
      </div>

      {/* Local keyframes for the pulse on the £20 tier */}
      <style>{`
        @keyframes luxpulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
      `}</style>
    </section>
  );
};

export default PreSaleSection;
