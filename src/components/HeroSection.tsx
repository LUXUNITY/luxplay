import { motion } from "framer-motion";
import arcadeHero from "@/assets/arcade-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Rainbow top bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-rainbow-bar z-20" />

      {/* LUXPLAY Logo at very top */}
      <div className="bg-background pt-6 pb-4 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-black tracking-[0.2em] uppercase"
        >
          {"LUXPLAY".split("").map((char, i) => {
            const colors = [
              "text-neon-green",
              "text-neon-cyan",
              "text-neon-blue",
              "text-neon-purple",
              "text-neon-pink",
              "text-neon-yellow",
            ];
            return (
              <span key={i} className={`${colors[i]} drop-shadow-[0_0_20px_currentColor]`}>
                {char}
              </span>
            );
          })}
        </motion.h1>
        <p className="font-display text-[10px] md:text-xs tracking-[0.4em] text-muted-foreground uppercase mt-2">
          Bournemouth's Biggest New Arcade & Entertainment Centre
        </p>
      </div>

      {/* Hero arcade image */}
      <div className="relative w-full">
        <img
          src={arcadeHero}
          alt="LuxPlay Arcade — 40+ machines"
          className="w-full h-[60vw] min-h-[280px] max-h-[600px] object-cover object-center"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/30 to-transparent" />

        {/* Massive headline */}
        <div className="absolute inset-0 flex flex-col justify-end px-5 pb-6 md:px-10 md:pb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-display text-xs md:text-sm tracking-[0.3em] text-neon-cyan uppercase mb-2 md:mb-4"
          >
            While Everyone Is Closing —
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-5xl md:text-8xl lg:text-9xl font-black uppercase leading-[0.9]"
          >
            <span className="text-gradient-rainbow">We're</span>
            <br />
            <span className="text-gradient-rainbow">Opening!</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="font-display text-xs md:text-sm tracking-[0.15em] text-foreground uppercase mt-3 md:mt-5"
          >
            40+ Arcade Machines & Counting — More On The Way
          </motion.p>
        </div>
      </div>

      {/* Feature strip under hero */}
      <div className="bg-background px-4 py-8 md:py-12">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-2xl mx-auto"
          >
            {[
              { icon: "🎮", label: "Arcade Games", sub: "40+ Machines", color: "text-neon-green" },
              { icon: "⛳", label: "Mini Golf", sub: "9 Holes", color: "text-neon-cyan" },
              { icon: "🏆", label: "Prizes", sub: "Win Big", color: "text-neon-yellow" },
              { icon: "☕", label: "Café", sub: "Food & Drinks", color: "text-neon-pink" },
            ].map((f) => (
              <div key={f.label} className="card-neon-border rounded-lg bg-card p-4 text-center">
                <span className="text-2xl md:text-3xl">{f.icon}</span>
                <p className={`font-display text-[10px] md:text-xs uppercase font-bold tracking-wider mt-2 ${f.color}`}>
                  {f.label}
                </p>
                <p className="text-muted-foreground text-[10px] md:text-xs mt-1">{f.sub}</p>
              </div>
            ))}
          </motion.div>

          {/* Opening callout */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8 font-display text-sm md:text-lg text-muted-foreground tracking-wider uppercase"
          >
            Opening <span className="text-neon-pink font-bold glow-pink">May 2026</span> · Sovereign Centre, Boscombe
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
