import { motion } from "framer-motion";
import designHero from "@/assets/design-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Rainbow top bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-rainbow-bar z-20" />

      {/* Hero arcade image — cropped from top of user's design */}
      <div className="relative w-full h-[50vw] min-h-[300px] max-h-[520px]">
        <img
          src={designHero}
          alt="LuxPlay Arcade machines"
          className="w-full h-full object-cover object-top"
        />
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

        {/* Headline overlaid on the arcade photo */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 md:pb-12">
          <div className="container mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-display text-3xl md:text-5xl lg:text-6xl font-black uppercase leading-tight"
            >
              <span className="text-foreground">While Everyone Is Closing —</span>
              <br />
              <span className="text-gradient-rainbow">We're Opening!</span>
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Venue photo grid — 2x2 matching design */}
      <VenueGrid />

      {/* Description + Features */}
      <div className="container mx-auto px-6 py-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl text-muted-foreground max-w-3xl"
        >
          Bournemouth's biggest new family entertainment destination. Arcade games, mini golf, prizes and a café — <strong className="text-foreground">all under one roof. Something for everyone.</strong>
        </motion.p>

        {/* Feature strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-4 mt-10 max-w-xl"
        >
          {[
            { icon: "🎮", label: "Arcade Games", sub: "35+ Machines", color: "text-neon-green" },
            { icon: "⛳", label: "Mini Golf", sub: "9 Holes", color: "text-neon-cyan" },
            { icon: "☕", label: "Café", sub: "Food & Drinks", color: "text-neon-pink" },
          ].map((f) => (
            <div key={f.label} className="card-neon-border rounded-lg bg-card p-5 text-center">
              <span className="text-2xl">{f.icon}</span>
              <p className={`font-display text-xs uppercase font-bold tracking-wider mt-2 ${f.color}`}>{f.label}</p>
              <p className="text-muted-foreground text-xs mt-1">{f.sub}</p>
            </div>
          ))}
        </motion.div>

        {/* Pre-launch callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 bg-muted/50 border-l-4 border-neon-pink rounded-r-lg p-6 max-w-3xl"
        >
          <p className="text-foreground font-medium text-lg">
            Pre-launch passes available now. Buy your credits before we open and save big.{" "}
            <span className="text-neon-pink font-bold">Limited Founder Passes — first come, first served.</span>
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-foreground font-semibold text-lg"
        >
          35+ arcade machines. 9-hole mini golf. Prize redemption. Café.
          <br />
          <span className="text-muted-foreground font-normal">One incredible venue. Opening May 2026.</span>
        </motion.p>
      </div>
    </section>
  );
};

/* 2x2 venue grid matching the design */
const VenueGrid = () => {
  const venues = [
    { label: "Arcade Zone", color: "text-neon-green" },
    { label: "Mini Golf", color: "text-neon-cyan" },
    { label: "Prize Redemption", color: "text-neon-yellow" },
    { label: "Café & Refreshments", color: "text-neon-pink" },
  ];

  return (
    <div className="grid grid-cols-2 gap-0.5">
      {venues.map((v) => (
        <div
          key={v.label}
          className="relative aspect-[4/3] bg-card overflow-hidden group"
        >
          {/* Gradient placeholder matching neon theme */}
          <div className="absolute inset-0 bg-gradient-to-br from-muted via-card to-muted/80" />
          <div className="absolute inset-0 flex items-end p-4">
            <p className={`font-display text-xs md:text-sm uppercase font-bold tracking-wider ${v.color}`}>
              {v.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroSection;
