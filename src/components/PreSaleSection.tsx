import { motion, useInView } from "framer-motion";
import { Check, Star, Zap, Flame, Clock, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const creditDeals = [
  {
    price: "£10",
    name: "Explorer",
    packageId: "explorer",
    credits: "130 Credits",
    bonus: "23% off",
    worth: "Normal price £13",
    plays: "13 plays",
    remaining: 250,
    total: 250,
    features: ["23% pre-launch discount", "Valid from opening weekend"],
    highlight: false,
    color: "neon-green",
  },
  {
    price: "£25",
    name: "Champion",
    packageId: "champion",
    credits: "350 Credits",
    bonus: "29% off",
    worth: "Normal price £35",
    plays: "35 plays",
    remaining: 250,
    total: 250,
    features: ["29% pre-launch discount", "Valid from opening weekend"],
    highlight: false,
    color: "neon-cyan",
  },
  {
    price: "£50",
    name: "Legend",
    packageId: "legend",
    credits: "800 Credits",
    bonus: "38% off",
    worth: "Normal price £80",
    plays: "80 plays",
    remaining: 250,
    total: 250,
    features: ["38% pre-launch discount", "The smart choice", "Valid from opening weekend"],
    highlight: true,
    badge: "BEST VALUE",
    color: "neon-pink",
  },
];

const ultimateDeal = {
  price: "£100",
  name: "Ultimate Pass",
  packageId: "ultimate",
  credits: "2,000 Credits",
  bonus: "50% off",
  worth: "Normal price £200",
  plays: "200 plays",
  remaining: 250,
  total: 250,
  features: [
    "50% pre-launch discount",
    "VIP early access before public opening",
    "Exclusive LuxPlay hoodie",
    "10% off all future top-ups for life",
  ],
  badge: "ULTIMATE",
  color: "neon-purple",
};

/* Animated countdown number */
const AnimatedCounter = ({ target, color }: { target: number; color: string }) => {
  const [count, setCount] = useState(target + Math.floor(Math.random() * 30) + 10);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const start = count;
    const duration = 2000;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(start - (start - target) * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, target]);

  return (
    <span ref={ref} className={`font-display text-4xl md:text-5xl text-${color} tabular-nums`}>
      {count}
    </span>
  );
};

// All caps set to 250. Remaining = 250 - real DB sales (no padding).
const BASE_SOLD: Record<string, number> = {
  explorer: 0,
  champion: 0,
  legend: 0,
  ultimate: 0,
};

const PACKAGE_TOTALS: Record<string, number> = {
  explorer: 250,
  champion: 250,
  legend: 250,
  ultimate: 250,
};

const PreSaleSection = () => {
  const [loadingPackage, setLoadingPackage] = useState<string | null>(null);
  const [realSoldCounts, setRealSoldCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchSoldCounts = async () => {
      const { data } = await supabase
        .from("orders")
        .select("package_name");

      if (data) {
        const counts: Record<string, number> = {};
        data.forEach((order) => {
          const key = order.package_name.toLowerCase().replace(" pass", "").replace(" ", "-");
          counts[key] = (counts[key] || 0) + 1;
        });
        setRealSoldCounts(counts);
      }
    };
    fetchSoldCounts();
  }, []);

  const getTotalSold = (packageId: string) => {
    return (BASE_SOLD[packageId] || 0) + (realSoldCounts[packageId] || 0);
  };

  const getRemaining = (packageId: string) => {
    const total = PACKAGE_TOTALS[packageId] || 1000;
    return Math.max(total - getTotalSold(packageId), 0);
  };

  const handleBuy = async (packageId: string) => {
    setLoadingPackage(packageId);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { packageId },
      });
      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      toast({
        title: "Checkout failed",
        description: err.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoadingPackage(null);
    }
  };

  return (
    <section id="presale" className="relative overflow-hidden">
      {/* Neon top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-neon-bar" />

      {/* Glow orbs — use smaller blur for performance */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-neon-purple/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-neon-pink/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 px-6 md:px-12 lg:px-20 py-20 md:py-28">
        {/* ========== MASSIVE ANIMATED LUXPLAY LOGO ========== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2
            className="font-display text-[6rem] md:text-[12rem] lg:text-[16rem] leading-none tracking-[0.1em] text-gradient-neon select-none"
            style={{ textShadow: "0 0 30px rgba(170,255,0,0.4), 0 0 60px rgba(0,238,255,0.2)" }}
          >
            LUXPLAY
          </h2>
        </motion.div>

        {/* Flashing urgency badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <span
            className="inline-flex items-center gap-2 border-2 border-neon-pink bg-neon-pink/10 text-neon-pink font-display text-sm md:text-base tracking-[0.3em] uppercase px-6 py-3 animate-pulse"
          >
            <Flame className="w-4 h-4 text-neon-green" />
            PRE-LAUNCH EXCLUSIVE
            <Flame className="w-4 h-4 text-neon-green" />
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-2"
        >
          <h3 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wider">
            <span className="text-gradient-neon">BUY YOUR ARCADE CREDITS NOW</span>
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <p className="font-body text-white/50 text-sm md:text-base">
            Arcade opens 25 May · Soft Play opens 30 May. Buy before we open and
          </p>
          <p
            className="font-display text-4xl md:text-5xl text-neon-green glow-green tracking-wider mt-1 animate-pulse"
          >
            SAVE BIG.
          </p>
        </motion.div>

        {/* Going fast warning */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <Clock className="w-4 h-4 text-neon-pink animate-pulse" />
          <p className="font-display text-sm md:text-base tracking-[0.2em] text-neon-pink glow-pink">
            SPACES ARE GOING FAST — DON'T MISS OUT
          </p>
          <Clock className="w-4 h-4 text-neon-pink animate-pulse" />
        </motion.div>

        {/* ========== THREE TIER CARDS ========== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
          {creditDeals.map((deal, i) => (
            <motion.div
              key={deal.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className={`relative p-6 md:p-8 flex flex-col transition-all duration-300 ${
                deal.highlight
                  ? "border-2 border-neon-pink bg-[#0d0d1a] shadow-[0_0_40px_rgba(255,0,204,0.2)]"
                  : "border border-white/10 bg-[#0a0a16] hover:border-white/20"
              }`}
            >
              {deal.badge && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-neon-pink text-[#070710] text-xs font-display tracking-widest px-4 py-1 animate-pulse"
                >
                  <Star className="w-3 h-3" /> {deal.badge}
                </div>
              )}

              {/* Tier name */}
              <p className={`font-display text-sm tracking-[0.3em] text-center mb-2 mt-1 text-${deal.color}`}>
                {deal.name.toUpperCase()}
              </p>

              {/* Price */}
              <div className="text-center mb-4">
                <span className={`font-display text-6xl md:text-7xl tracking-wide ${
                  deal.highlight ? "text-neon-pink glow-pink" : `text-${deal.color}`
                } ${deal.color === 'neon-green' ? 'glow-green' : deal.color === 'neon-cyan' ? 'glow-cyan' : ''}`}>
                  {deal.price}
                </span>
              </div>

              {/* Credits */}
              <h4 className={`font-display text-2xl md:text-3xl tracking-wider text-center mb-1 text-${deal.color}`}>
                {deal.credits}
              </h4>
              <p className="text-white/40 text-xs text-center mb-1">
                <span className="line-through">{deal.worth}</span> · {deal.bonus}
              </p>
              <p className="text-white/30 text-[10px] text-center mb-5 font-body">
                {deal.plays}
              </p>

              {/* Features */}
              <div className="space-y-2 mb-6 flex-1">
                {deal.features.map((feat) => (
                  <p key={feat} className="text-xs text-white/60 flex items-start gap-2 font-body">
                    <Check className="w-3.5 h-3.5 text-neon-green mt-0.5 flex-shrink-0" />
                    {feat}
                  </p>
                ))}
              </div>

              {/* Remaining counter */}
              <div className="text-center mb-4">
                <AnimatedCounter target={getRemaining(deal.packageId)} color={deal.color} />
                <p className="font-display text-xs tracking-[0.25em] text-white/50">
                  REMAINING
                </p>
                {/* Progress bar */}
                <div className="w-full h-1.5 bg-white/5 mt-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(getRemaining(deal.packageId) / (PACKAGE_TOTALS[deal.packageId] || deal.total)) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5 + i * 0.1 }}
                    className={`h-full bg-${deal.color}`}
                  />
                </div>
              </div>

              {/* Buy */}
              <button
                onClick={() => handleBuy(deal.packageId)}
                disabled={loadingPackage === deal.packageId}
                className={`w-full font-display text-sm tracking-widest py-3 transition-all duration-300 disabled:opacity-50 ${
                  deal.highlight
                    ? "bg-neon-pink text-[#070710] hover:shadow-[0_0_40px_rgba(255,0,204,0.5)]"
                    : "bg-neon-green text-[#070710] hover:shadow-[0_0_40px_rgba(170,255,0,0.5)]"
                }`}
              >
                {loadingPackage === deal.packageId ? (
                  <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                ) : "BUY NOW"}
              </button>
            </motion.div>
          ))}
        </div>

        {/* ========== ULTIMATE PASS — FULL WIDTH, MASSIVE ========== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto relative border-2 border-neon-purple bg-[#0d0d1a] p-8 md:p-12 shadow-[0_0_30px_rgba(119,0,255,0.15)]"
        >
          {/* Badge */}
          <div
            className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-neon-purple text-[#070710] font-display text-sm tracking-[0.3em] px-6 py-1.5 animate-pulse"
          >
            <Star className="w-4 h-4" /> ULTIMATE <Star className="w-4 h-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-4">
            {/* Left — Price & Credits */}
            <div className="text-center md:text-left">
              <p className="font-display text-sm tracking-[0.3em] text-neon-purple mb-2">ULTIMATE PASS</p>
              <span
                className="font-display text-8xl md:text-9xl tracking-wide text-neon-purple inline-block glow-purple"
              >
                {ultimateDeal.price}
              </span>
              <h4 className="font-display text-3xl md:text-4xl tracking-wider text-neon-purple mt-2">
                {ultimateDeal.credits}
              </h4>
              <p className="text-white/40 text-sm mt-1">
                <span className="line-through">{ultimateDeal.worth}</span> · {ultimateDeal.bonus} · {ultimateDeal.plays}
              </p>
            </div>

            {/* Right — Features + Counter */}
            <div>
              <div className="space-y-3 mb-6">
                {ultimateDeal.features.map((feat) => (
                  <p key={feat} className="text-sm text-white/70 flex items-start gap-3 font-body">
                    <Check className="w-4 h-4 text-neon-purple mt-0.5 flex-shrink-0" />
                    {feat}
                  </p>
                ))}
              </div>

              {/* Remaining */}
              <div className="flex items-center gap-4 mb-6">
                <div>
                  <AnimatedCounter target={getRemaining("ultimate")} color="neon-purple" />
                  <p className="font-display text-xs tracking-[0.25em] text-white/50">
                    REMAINING
                  </p>
                </div>
                <div className="flex-1 h-2 bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(getRemaining("ultimate") / PACKAGE_TOTALS["ultimate"]) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.8 }}
                    className="h-full bg-neon-purple"
                  />
                </div>
              </div>

              <button
                onClick={() => handleBuy(ultimateDeal.packageId)}
                disabled={loadingPackage === ultimateDeal.packageId}
                className="w-full font-display text-base tracking-widest py-4 bg-neon-purple text-[#070710] hover:shadow-[0_0_50px_rgba(119,0,255,0.5)] transition-all duration-300 disabled:opacity-50"
              >
                {loadingPackage === ultimateDeal.packageId ? (
                  <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                ) : "GET THE ULTIMATE PASS"}
              </button>
            </div>
          </div>
        </motion.div>

        {/* ========== URGENCY FOOTER ========== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 max-w-3xl mx-auto border border-white/10 p-6 md:p-8 text-center bg-[#0a0a16]"
        >
          <p
            className="text-white/80 font-body text-sm md:text-base font-semibold"
          >
            Pre-launch only — <strong className="text-white">these discounts disappear when we open.</strong>
          </p>
          <p className="text-neon-pink font-bold mt-3 text-sm md:text-base glow-pink font-body">
            Full price from opening weekend. Lock in your savings now.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PreSaleSection;
