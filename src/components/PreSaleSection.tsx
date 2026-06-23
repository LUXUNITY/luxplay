import { motion } from "framer-motion";
import { Flame, Loader2, ChevronsRight } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

// Pricing — matches the in-store credits poster exactly.
const tiers = [
  { id: "c50",   credits: 50,   price: 5,   color: "neon-yellow" },
  { id: "c130",  credits: 130,  price: 10,  color: "neon-green" },
  { id: "c300",  credits: 300,  price: 20,  color: "neon-pink",   best: true },
  { id: "c800",  credits: 800,  price: 50,  color: "neon-cyan" },
  { id: "c2000", credits: 2000, price: 100, color: "neon-purple" },
];

// Tailwind needs to see full class strings — map color tokens explicitly.
const colorClasses: Record<string, { text: string; border: string; shadow: string; bg: string; arrow: string }> = {
  "neon-yellow": {
    text: "text-[#ffeb00]",
    border: "border-[#ffeb00]/70",
    shadow: "shadow-[0_0_25px_rgba(255,235,0,0.35)]",
    bg: "bg-[#ffeb00]",
    arrow: "text-[#ffeb00]",
  },
  "neon-green": {
    text: "text-[#aaff00]",
    border: "border-[#aaff00]/70",
    shadow: "shadow-[0_0_25px_rgba(170,255,0,0.35)]",
    bg: "bg-[#aaff00]",
    arrow: "text-[#aaff00]",
  },
  "neon-pink": {
    text: "text-[#ff00cc]",
    border: "border-[#ff00cc]",
    shadow: "shadow-[0_0_45px_rgba(255,0,204,0.6)]",
    bg: "bg-[#ff00cc]",
    arrow: "text-[#ff00cc]",
  },
  "neon-cyan": {
    text: "text-[#00eeff]",
    border: "border-[#00eeff]/70",
    shadow: "shadow-[0_0_25px_rgba(0,238,255,0.35)]",
    bg: "bg-[#00eeff]",
    arrow: "text-[#00eeff]",
  },
  "neon-purple": {
    text: "text-[#b366ff]",
    border: "border-[#b366ff]/70",
    shadow: "shadow-[0_0_25px_rgba(179,102,255,0.35)]",
    bg: "bg-[#b366ff]",
    arrow: "text-[#b366ff]",
  },
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
    <section id="presale" className="relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-neon-bar" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-neon-purple/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-neon-pink/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 px-4 md:px-12 lg:px-20 py-16 md:py-24">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mb-3"
        >
          <h2
            className="font-display text-[4.5rem] md:text-[10rem] lg:text-[14rem] leading-none tracking-[0.08em] text-gradient-neon select-none"
            style={{ textShadow: "0 0 30px rgba(170,255,0,0.4), 0 0 60px rgba(0,238,255,0.2)" }}
          >
            LUXPLAY
          </h2>
          <p className="font-display text-2xl md:text-4xl tracking-[0.4em] text-gradient-neon mt-1">
            CREDITS
          </p>
        </motion.div>

        {/* Online discount badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-10"
        >
          <span className="inline-flex items-center gap-2 border-2 border-neon-pink bg-neon-pink/10 text-neon-pink font-display text-xs md:text-sm tracking-[0.3em] uppercase px-5 py-2.5 animate-pulse">
            <Flame className="w-3.5 h-3.5 text-neon-green" />
            BUY ONLINE — LOAD STRAIGHT TO YOUR CARD
            <Flame className="w-3.5 h-3.5 text-neon-green" />
          </span>
          <p className="font-body text-white/50 text-xs md:text-sm mt-3 max-w-md mx-auto">
            Most games cost <span className="text-neon-pink font-semibold">5–10 credits per play</span> · Credits never expire · Walk in, tap on, play.
          </p>
        </motion.div>

        {/* Column headers */}
        <div className="max-w-3xl mx-auto grid grid-cols-[1fr_auto_1fr_auto] items-center gap-3 md:gap-6 px-3 md:px-5 pb-3">
          <p className="font-display text-[11px] md:text-sm tracking-[0.3em] text-neon-green/90">AMOUNT</p>
          <span className="opacity-0">»</span>
          <p className="font-display text-[11px] md:text-sm tracking-[0.3em] text-neon-pink/90">PRICE</p>
          <span className="opacity-0 font-display text-xs">BUY</span>
        </div>

        {/* Credits table */}
        <div className="max-w-3xl mx-auto space-y-3 md:space-y-4">
          {tiers.map((t, i) => {
            const c = colorClasses[t.color];
            const isBest = !!t.best;
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className={`relative grid grid-cols-[1fr_auto_1fr_auto] items-center gap-3 md:gap-6 px-3 md:px-6 bg-[#0a0a16] border-2 ${c.border} ${c.shadow} ${
                  isBest
                    ? "py-6 md:py-10 animate-pulse"
                    : "py-3 md:py-5"
                }`}
                style={
                  isBest
                    ? { animation: "luxpulse 1.6s ease-in-out infinite" }
                    : undefined
                }
              >
                {isBest && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ff00cc] text-[#070710] font-display text-[10px] md:text-xs tracking-[0.25em] px-4 py-1 shadow-[0_0_20px_rgba(255,0,204,0.7)]">
                    ★ MOST POPULAR ★
                  </span>
                )}

                {/* Credits (amount column) */}
                <div className="flex flex-col">
                  <span
                    className={`font-display tracking-wide ${c.text} ${
                      isBest
                        ? "text-5xl md:text-8xl leading-none"
                        : "text-3xl md:text-5xl leading-none"
                    }`}
                    style={
                      isBest
                        ? { textShadow: "0 0 25px rgba(255,0,204,0.7), 0 0 50px rgba(255,0,204,0.4)" }
                        : { textShadow: "0 0 12px currentColor" }
                    }
                  >
                    {t.credits.toLocaleString()}
                  </span>
                  <span
                    className={`${c.text} font-display tracking-[0.2em] uppercase ${
                      isBest ? "text-sm md:text-xl mt-1" : "text-[10px] md:text-sm"
                    }`}
                  >
                    credits
                  </span>
                </div>

                {/* Arrow */}
                <ChevronsRight
                  className={`${c.arrow} ${isBest ? "w-8 h-8 md:w-16 md:h-16" : "w-5 h-5 md:w-8 md:h-8"}`}
                />

                {/* Price */}
                <div className="flex flex-col">
                  <span
                    className={`font-display tracking-wide ${c.text} ${
                      isBest
                        ? "text-5xl md:text-8xl leading-none"
                        : "text-3xl md:text-5xl leading-none"
                    }`}
                    style={
                      isBest
                        ? { textShadow: "0 0 25px rgba(255,0,204,0.7), 0 0 50px rgba(255,0,204,0.4)" }
                        : { textShadow: "0 0 12px currentColor" }
                    }
                  >
                    £{t.price}
                  </span>
                </div>

                {/* Buy */}
                <button
                  onClick={() => handleBuy(t.id)}
                  disabled={loading === t.id}
                  className={`font-display tracking-widest transition-all duration-300 disabled:opacity-50 whitespace-nowrap text-[#070710] ${c.bg} ${
                    isBest
                      ? "text-sm md:text-base px-4 md:px-8 py-3 md:py-4 hover:shadow-[0_0_40px_rgba(255,0,204,0.8)]"
                      : "text-[11px] md:text-sm px-3 md:px-5 py-2 md:py-2.5 hover:shadow-[0_0_25px_currentColor]"
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
          className="mt-10 max-w-3xl mx-auto border border-white/10 p-5 md:p-6 text-center bg-[#0a0a16]"
        >
          <p className="text-white/80 font-body text-sm">
            Credits load straight to your LuxPlay card on opening day.
          </p>
          <p className="text-white/40 font-body text-xs mt-2">
            Credits never expire. Use for any arcade or redemption game.
          </p>
        </motion.div>
      </div>

      {/* Local keyframes for the "in your face" pulse on the £20 tier */}
      <style>{`
        @keyframes luxpulse {
          0%, 100% {
            box-shadow: 0 0 35px rgba(255,0,204,0.55), 0 0 70px rgba(255,0,204,0.25);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 60px rgba(255,0,204,0.95), 0 0 120px rgba(255,0,204,0.55);
            transform: scale(1.015);
          }
        }
      `}</style>
    </section>
  );
};

export default PreSaleSection;
