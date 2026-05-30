import { motion } from "framer-motion";
import { Flame, Loader2, ChevronsRight } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

// In-store price → credits. Online = 10% off in-store price.
const tiers = [
  { id: "c50",   amount: 5,   credits: 50,   color: "neon-green" },
  { id: "c110",  amount: 10,  credits: 110,  color: "neon-green" },
  { id: "c160",  amount: 15,  credits: 160,  color: "neon-cyan" },
  { id: "c230",  amount: 20,  credits: 230,  color: "neon-cyan" },
  { id: "c360",  amount: 30,  credits: 360,  color: "neon-purple" },
  { id: "c500",  amount: 40,  credits: 500,  color: "neon-purple" },
  { id: "c800",  amount: 60,  credits: 800,  color: "neon-pink" },
  { id: "c1500", amount: 100, credits: 1500, color: "neon-pink", best: true },
];

const fmt = (n: number) =>
  n % 1 === 0 ? `£${n.toFixed(0)}` : `£${n.toFixed(2)}`;

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
            10% OFF WHEN YOU BOOK ONLINE
            <Flame className="w-3.5 h-3.5 text-neon-green" />
          </span>
          <p className="font-body text-white/50 text-xs md:text-sm mt-3 max-w-md mx-auto">
            Credits load straight to your card. Walk in, tap on, play.
          </p>
        </motion.div>

        {/* Credits table */}
        <div className="max-w-3xl mx-auto space-y-2.5 md:space-y-3">
          {/* Column headers */}
          <div className="grid grid-cols-[1fr_auto_1fr_auto] md:grid-cols-[1fr_auto_1fr_auto] items-center gap-3 md:gap-6 px-3 md:px-5 pb-1">
            <p className="font-display text-[10px] md:text-xs tracking-[0.3em] text-neon-green/80">AMOUNT</p>
            <span className="opacity-0">»</span>
            <p className="font-display text-[10px] md:text-xs tracking-[0.3em] text-neon-cyan/80">CREDITS</p>
            <span className="opacity-0 font-display text-xs">BUY</span>
          </div>

          {tiers.map((t, i) => {
            const online = t.amount * 0.9;
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                className={`relative grid grid-cols-[1fr_auto_1fr_auto] items-center gap-3 md:gap-6 px-3 md:px-5 py-3 md:py-4 border bg-[#0a0a16] transition-all duration-300 ${
                  t.best
                    ? "border-neon-pink shadow-[0_0_25px_rgba(255,0,204,0.25)]"
                    : "border-white/10 hover:border-white/25"
                }`}
              >
                {t.best && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-neon-pink text-[#070710] font-display text-[10px] tracking-[0.2em] px-3 py-0.5 animate-pulse">
                    BEST VALUE
                  </span>
                )}

                {/* Amount */}
                <div className="flex flex-col">
                  <span className={`font-display text-2xl md:text-4xl tracking-wide text-${t.color}`}>
                    {fmt(online)} <span className="text-lg md:text-2xl">online</span>
                  </span>
                  <span className="text-white/40 text-[10px] md:text-xs font-body line-through">
                    {fmt(t.amount)} in store
                  </span>
                </div>

                {/* Arrow */}
                <ChevronsRight className={`w-5 h-5 md:w-7 md:h-7 text-${t.color}`} />

                {/* Credits */}
                <div className="flex flex-col">
                  <span className={`font-display text-2xl md:text-4xl tracking-wide text-${t.color}`}>
                    {t.credits}
                  </span>
                  <span className="text-white/40 text-[10px] md:text-xs font-body uppercase tracking-wider">
                    credits
                  </span>
                </div>

                {/* Buy */}
                <button
                  onClick={() => handleBuy(t.id)}
                  disabled={loading === t.id}
                  className={`font-display text-[11px] md:text-xs tracking-widest px-3 md:px-5 py-2 md:py-2.5 transition-all duration-300 disabled:opacity-50 whitespace-nowrap ${
                    t.best
                      ? "bg-neon-pink text-[#070710] hover:shadow-[0_0_30px_rgba(255,0,204,0.5)]"
                      : "bg-neon-green text-[#070710] hover:shadow-[0_0_30px_rgba(170,255,0,0.5)]"
                  }`}
                >
                  {loading === t.id ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
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
            All online purchases save <strong className="text-neon-pink">10%</strong> vs in-store.
          </p>
          <p className="text-white/40 font-body text-xs mt-2">
            Credits never expire. Use for any arcade or redemption game.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PreSaleSection;
