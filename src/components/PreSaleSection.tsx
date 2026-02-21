import { motion } from "framer-motion";
import { Check, Star, Zap } from "lucide-react";

const creditDeals = [
  {
    price: "£10",
    credits: "100 Credits",
    worth: "Worth £13",
    bonus: "30% bonus credits",
    limited: 500,
    features: ["30% bonus credits", "Valid from opening day"],
    highlight: false,
  },
  {
    price: "£25",
    credits: "300 Credits",
    worth: "Worth £39",
    bonus: "56% bonus credits",
    limited: 300,
    features: ["56% bonus credits", "Valid from opening day"],
    highlight: false,
  },
  {
    price: "£75",
    credits: "1000 Credits",
    worth: "Worth £130+",
    bonus: "73% bonus credits",
    limited: 200,
    features: [
      "73% bonus credits",
      "VIP entry on opening day — skip the queue",
      "Exclusive LuxPlay Founder hoodie",
      "10% off all future top-ups for 12 months",
    ],
    highlight: true,
    badge: "Founder Pass",
  },
];

const PreSaleSection = () => {
  const handleBuy = (index: number) => {
    const deal = creditDeals[index];
    alert(`You selected the ${deal.credits} deal for ${deal.price}. Payment integration coming soon!`);
  };

  return (
    <section id="presale" className="relative">
      {/* Rainbow top divider */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-rainbow-bar" />

      <div className="px-6 md:px-12 lg:px-20 pt-16 md:pt-20 pb-16 md:pb-20">
        {/* Pre-Launch Exclusive badge — exactly matching PDF */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <span className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 text-primary-foreground font-display text-[10px] md:text-xs tracking-[0.2em] uppercase px-5 py-2 rounded-full">
            <Zap className="w-3.5 h-3.5 text-neon-yellow" />
            Pre-Launch Exclusive
          </span>
        </motion.div>

        {/* BUY YOUR CREDITS NOW — massive rainbow, exactly matching PDF */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-5xl lg:text-6xl font-black uppercase text-center mb-3"
        >
          <span className="text-gradient-rainbow">Buy Your Credits Now</span>
        </motion.h2>

        {/* Subtitle + SAVE BIG — exactly matching PDF */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-3"
        >
          <p className="text-muted-foreground text-sm md:text-base">
            LuxPlay opens May 2026. Buy before we open and
          </p>
          <p className="font-display text-2xl md:text-4xl font-black uppercase text-neon-green glow-green mt-1">
            Save Big.
          </p>
        </motion.div>

        <p className="text-center text-muted-foreground text-xs md:text-sm mb-4">
          Credits loaded to your account on opening day.
        </p>

        {/* Cyan diamond divider — exactly matching PDF */}
        <div className="flex items-center gap-4 my-8 md:my-10 max-w-2xl mx-auto">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />
          <div className="w-2 h-2 rotate-45 bg-neon-cyan" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />
        </div>

        {/* Credit deal cards — stacked, exactly matching PDF layout */}
        <div className="max-w-3xl mx-auto space-y-5">
          {creditDeals.map((deal, i) => (
            <motion.div
              key={deal.credits}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-lg p-5 md:p-8 ${
                deal.highlight ? "founder-card-border bg-card" : "card-neon-border bg-card"
              }`}
            >
              {deal.badge && (
                <div className="absolute -top-3 right-4 flex items-center gap-1.5 bg-neon-pink text-background text-[10px] md:text-xs font-display font-bold tracking-wider uppercase px-4 py-1.5 rounded-full">
                  <Star className="w-3 h-3" /> {deal.badge}
                </div>
              )}

              {/* Layout: Price left | divider | details center | limited+buy right */}
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
                {/* Price — large, left side */}
                <div className="flex items-center gap-4 md:flex-shrink-0">
                  <span className={`font-display text-4xl md:text-5xl font-black ${
                    deal.highlight ? "text-neon-pink glow-pink" : "text-neon-green glow-green"
                  }`}>
                    {deal.price}
                  </span>
                  {/* Mobile: show credits inline */}
                  <div className="md:hidden">
                    <h3 className={`font-display text-base font-bold uppercase tracking-wider ${
                      deal.highlight ? "text-neon-pink" : "text-neon-green"
                    }`}>
                      {deal.credits}
                    </h3>
                    <p className="text-muted-foreground text-xs">
                      <span className="line-through">{deal.worth}</span> · {deal.bonus}
                    </p>
                  </div>
                </div>

                {/* Vertical divider — desktop only */}
                <div className="hidden md:block w-px h-20 bg-border" />

                {/* Details */}
                <div className="flex-1">
                  <h3 className={`hidden md:block font-display text-lg md:text-xl font-bold uppercase tracking-wider ${
                    deal.highlight ? "text-neon-pink" : "text-neon-green"
                  }`}>
                    {deal.credits}
                  </h3>
                  <p className="hidden md:block text-muted-foreground text-sm">
                    <span className="line-through">{deal.worth}</span> · {deal.bonus}
                  </p>
                  <div className="space-y-1 mt-2 md:mt-3">
                    {deal.features.map((feat) => (
                      <p key={feat} className="text-xs md:text-sm text-muted-foreground flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-neon-green mt-0.5 flex-shrink-0" />
                        {feat}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Limited count + Buy button — right side */}
                <div className="flex items-center justify-between md:flex-col md:flex-shrink-0 md:text-right gap-3">
                  <div>
                    <span className="font-display text-2xl md:text-3xl font-bold text-foreground">{deal.limited}</span>
                    <p className={`text-[10px] md:text-xs font-display tracking-wider uppercase ${
                      deal.highlight ? "text-neon-pink" : "text-muted-foreground"
                    }`}>
                      Limited —<br className="hidden md:block" /> Going Fast
                    </p>
                  </div>
                  <button
                    onClick={() => handleBuy(i)}
                    className={`font-display text-[10px] md:text-xs uppercase tracking-widest font-bold px-5 md:px-6 py-2.5 md:py-3 rounded-md transition-all duration-300 ${
                      deal.highlight
                        ? "bg-neon-pink text-background hover:shadow-[0_0_30px_hsl(var(--neon-pink)/0.5)]"
                        : "bg-neon-green text-background hover:shadow-[0_0_30px_hsl(var(--neon-green)/0.5)]"
                    }`}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Urgency block — exactly matching PDF */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 md:mt-12 max-w-3xl mx-auto bg-muted/50 border border-border rounded-lg p-6 md:p-8 text-center"
        >
          <p className="text-foreground text-sm md:text-base font-semibold">
            These prices <strong>will not be available after opening day.</strong> Once we open, credits are full price.
          </p>
          <p className="text-neon-pink font-bold mt-3 text-sm md:text-base glow-pink">
            Founder Passes are strictly limited to 200 — once they're gone, they're gone.
          </p>
        </motion.div>

        {/* Scan to buy section — matching PDF */}
        <div className="mt-10 md:mt-12 flex flex-col md:flex-row items-center justify-between max-w-3xl mx-auto">
          <div>
            <p className="font-display text-[10px] md:text-xs tracking-[0.2em] text-muted-foreground uppercase">
              Scan To Buy Your Pass Now
            </p>
            <p className="font-display text-[10px] md:text-xs tracking-[0.15em] text-neon-cyan uppercase font-bold mt-1">
              QR Code Coming Soon
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreSaleSection;
