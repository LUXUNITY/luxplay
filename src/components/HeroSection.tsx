import { motion } from "framer-motion";
import arcadeHero from "@/assets/arcade-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Rainbow top bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-rainbow-bar z-20" />

      {/* Hero image */}
      <div className="absolute inset-0">
        <img
          src={arcadeHero}
          alt="LuxPlay Arcade - neon lit arcade machines"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-6 pb-20 pt-40">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-display text-sm tracking-[0.3em] text-muted-foreground uppercase mb-4"
        >
          Sovereign Centre, Boscombe
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-tight mb-2"
        >
          <span className="text-foreground">While Everyone Is Closing —</span>
          <br />
          <span className="text-gradient-rainbow">We're Opening!</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-lg md:text-xl text-muted-foreground mt-6 max-w-xl"
        >
          Bournemouth's biggest new family entertainment destination. Arcade games, mini golf, prizes and a café — <strong className="text-foreground">all under one roof.</strong>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <a
            href="#presale"
            className="font-display text-sm uppercase tracking-widest bg-neon-green text-background px-8 py-4 rounded-md font-bold hover:shadow-[0_0_30px_hsl(var(--neon-green)/0.5)] transition-all duration-300"
          >
            Buy Pre-Sale Credits
          </a>
          <a
            href="#about"
            className="font-display text-sm uppercase tracking-widest border border-foreground/30 text-foreground px-8 py-4 rounded-md font-bold hover:border-neon-cyan hover:text-neon-cyan transition-all duration-300"
          >
            Learn More
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="font-display text-xs tracking-[0.2em] text-neon-yellow uppercase mt-6"
        >
          Opening May 2026
        </motion.p>
      </div>
    </section>
  );
};

export default HeroSection;
