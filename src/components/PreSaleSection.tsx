import { motion } from "framer-motion";
import { Check, Star, Zap } from "lucide-react";

const creditDeals = [
  {
    price: "£10",
    credits: "100 Credits",
    bonus: "30% bonus",
    worth: "Worth £13",
    limited: 500,
    features: ["30% bonus credits", "Valid from opening day"],
    highlight: false,
  },
  {
    price: "£25",
    credits: "300 Credits",
    bonus: "56% bonus",
    worth: "Worth £39",
    limited: 300,
    features: ["56% bonus credits", "Valid from opening day"],
    highlight: false,
  },
  {
    price: "£75",
    credits: "1000 Credits",
    bonus: "73% bonus",
    worth: "Worth £130+",
    limited: 200,
    features: [
      "73% bonus credits",
      "VIP entry — skip the queue",
      "Exclusive Founder hoodie",
      "10% off top-ups for 12 months",
    ],
    highlight: true,
    badge: "FOUNDER PASS",
  },
];

const PreSaleSection = () => {
  const handleBuy = (index: number) => {
    const deal = creditDeals[index];
    alert(`You selected ${deal.credits} for ${deal.price}. Payment coming soon!`);
  };

  return (
    <section id="presale" className="relative bg-[#070710]">
      {/* Neon top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-neon-bar" />

      {/* Subtle glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-neon-pink/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 px-6 md:px-12 lg:px-20 py-20 md:py-28">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <span className="inline-flex items-center gap-2 border border-neon-purple/50 text-neon-purple font-body text-xs tracking-widest uppercase px-5 py-2">
            <Zap className="w-3.5 h-3.5 text-neon-green" />
            Pre-Launch Exclusive
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-5xl md:text-7xl lg:text-8xl text-center tracking-wider mb-2"
        >
          <span className="text-gradient-neon">BUY YOUR CREDITS NOW</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <p className="font-body text-white/50 text-sm md:text-base">
            LuxPlay opens May 2026. Buy before we open and
          </p>
          <p className="font-display text-4xl md:text-5xl text-neon-green glow-green tracking-wider mt-1">
            SAVE BIG.
          </p>
        </motion.div>

        <p className="text-center text-white/40 font-body text-xs md:text-sm mb-12">
          Credits loaded to your account on opening day.
        </p>

        {/* Three cards SIDE BY SIDE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {creditDeals.map((deal, i) => (
            <motion.div
              key={deal.credits}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-6 md:p-8 flex flex-col ${
                deal.highlight
                  ? "border-2 border-neon-pink bg-[#0d0d1a] shadow-[0_0_30px_rgba(255,0,204,0.15)]"
                  : "border border-white/10 bg-[#0a0a16]"
              }`}
            >
              {deal.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-neon-pink text-[#070710] text-xs font-display tracking-widest px-4 py-1">
                  <Star className="w-3 h-3" /> {deal.badge}
                </div>
              )}

              {/* Price */}
              <div className="text-center mb-6 mt-2">
                <span className={`font-display text-6xl md:text-7xl tracking-wide ${
                  deal.highlight ? "text-neon-pink glow-pink" : "text-neon-green glow-green"
                }`}>
                  {deal.price}
                </span>
              </div>

              {/* Credits */}
              <h3 className={`font-display text-2xl md:text-3xl tracking-wider text-center mb-1 ${
                deal.highlight ? "text-neon-pink" : "text-neon-cyan"
              }`}>
                {deal.credits}
              </h3>
              <p className="text-white/40 text-xs text-center mb-6">
                <span className="line-through">{deal.worth}</span> · {deal.bonus}
              </p>

              {/* Features */}
              <div className="space-y-2 mb-8 flex-1">
                {deal.features.map((feat) => (
                  <p key={feat} className="text-xs text-white/60 flex items-start gap-2 font-body">
                    <Check className="w-3.5 h-3.5 text-neon-green mt-0.5 flex-shrink-0" />
                    {feat}
                  </p>
                ))}
              </div>

              {/* Limited + Buy */}
              <div className="text-center">
                <p className="font-display text-3xl text-white tracking-wide">{deal.limited}</p>
                <p className={`font-display text-xs tracking-widest mb-4 ${
                  deal.highlight ? "text-neon-pink" : "text-white/40"
                }`}>
                  LIMITED — GOING FAST
                </p>
                <button
                  onClick={() => handleBuy(i)}
                  className={`w-full font-display text-sm tracking-widest py-3 transition-all duration-300 ${
                    deal.highlight
                      ? "bg-neon-pink text-[#070710] hover:shadow-[0_0_40px_rgba(255,0,204,0.5)]"
                      : "bg-neon-green text-[#070710] hover:shadow-[0_0_40px_rgba(170,255,0,0.5)]"
                  }`}
                >
                  BUY NOW
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Urgency */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 max-w-3xl mx-auto border border-white/10 p-6 md:p-8 text-center bg-[#0a0a16]"
        >
          <p className="text-white/80 font-body text-sm md:text-base font-semibold">
            These prices <strong className="text-white">will not be available after opening day.</strong> Once we open, credits are full price.
          </p>
          <p className="text-neon-pink font-bold mt-3 text-sm md:text-base glow-pink font-body">
            Founder Passes are strictly limited to 200 — once they're gone, they're gone.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PreSaleSection;
