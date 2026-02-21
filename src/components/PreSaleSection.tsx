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
    <section id="presale" className="py-24 relative">
      {/* Rainbow divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-rainbow-bar" />

      <div className="container mx-auto px-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 text-primary-foreground font-display text-xs tracking-[0.2em] uppercase px-6 py-2 rounded-full">
            <Zap className="w-3.5 h-3.5 text-neon-yellow" />
            Pre-Launch Exclusive
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-6xl font-black uppercase text-center mb-4"
        >
          <span className="text-gradient-rainbow">Buy Your Credits Now</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <p className="text-muted-foreground text-lg">
            LuxPlay opens May 2026. Buy before we open and{" "}
            <strong className="font-display text-foreground text-2xl uppercase glow-green">Save Big.</strong>
          </p>
          <p className="text-muted-foreground mt-2">Credits loaded to your account on opening day.</p>
        </motion.div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-10 max-w-2xl mx-auto">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />
          <div className="w-2 h-2 rotate-45 bg-neon-cyan" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />
        </div>

        {/* Credit deal cards */}
        <div className="max-w-3xl mx-auto space-y-6">
          {creditDeals.map((deal, i) => (
            <motion.div
              key={deal.credits}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-lg p-6 md:p-8 ${
                deal.highlight ? "founder-card-border bg-card" : "card-neon-border bg-card"
              }`}
            >
              {deal.badge && (
                <div className="absolute -top-3 right-4 flex items-center gap-1.5 bg-neon-pink text-background text-xs font-display font-bold tracking-wider uppercase px-4 py-1.5 rounded-full">
                  <Star className="w-3 h-3" /> {deal.badge}
                </div>
              )}

              <div className="flex flex-col md:flex-row md:items-center gap-6">
                {/* Price */}
                <div className="flex-shrink-0">
                  <span className={`font-display text-4xl md:text-5xl font-black ${
                    deal.highlight ? "text-neon-pink glow-pink" : "text-neon-green glow-green"
                  }`}>
                    {deal.price}
                  </span>
                </div>

                <div className="hidden md:block w-px h-20 bg-border" />

                {/* Details */}
                <div className="flex-1">
                  <h3 className={`font-display text-lg md:text-xl font-bold uppercase tracking-wider ${
                    deal.highlight ? "text-neon-pink" : "text-neon-green"
                  }`}>
                    {deal.credits}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    <span className="line-through">{deal.worth}</span> · {deal.bonus}
                  </p>
                  <div className="mt-3 space-y-1">
                    {deal.features.map((feat) => (
                      <p key={feat} className="text-sm text-muted-foreground flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-neon-green mt-0.5 flex-shrink-0" />
                        {feat}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Limited count + Buy */}
                <div className="flex-shrink-0 text-right space-y-3">
                  <div>
                    <span className="font-display text-2xl md:text-3xl font-bold text-foreground">{deal.limited}</span>
                    <p className={`text-xs font-display tracking-wider uppercase ${
                      deal.highlight ? "text-neon-pink" : "text-muted-foreground"
                    }`}>
                      Limited —<br />Going Fast
                    </p>
                  </div>
                  <button
                    onClick={() => handleBuy(i)}
                    className={`font-display text-xs uppercase tracking-widest font-bold px-6 py-3 rounded-md transition-all duration-300 ${
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

        {/* Urgency block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 max-w-2xl mx-auto bg-muted/50 border border-border rounded-lg p-8 text-center"
        >
          <p className="text-foreground text-lg font-semibold">
            These prices <strong>will not be available after opening day.</strong>
          </p>
          <p className="text-muted-foreground mt-1">Once we open, credits are full price.</p>
          <p className="text-neon-pink font-bold mt-3 text-lg glow-pink">
            Founder Passes are strictly limited to 200 — once they're gone, they're gone.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PreSaleSection;
