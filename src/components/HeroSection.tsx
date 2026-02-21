import { motion } from "framer-motion";
import arcadeHero from "@/assets/arcade-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      {/* Rainbow top bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-rainbow-bar z-20" />

      {/* Full-bleed cinematic arcade image */}
      <img
        src={arcadeHero}
        alt="LuxPlay Arcade — 40+ machines, opening May 2026"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Heavy gradient overlay — bottom-heavy for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/50 to-transparent" />

      {/* Content pinned to bottom */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20 pb-12 md:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display text-sm md:text-xl lg:text-2xl font-bold uppercase tracking-[0.2em] text-foreground/90 mb-2 md:mb-3"
        >
          While Everyone Is Closing —
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-display text-6xl md:text-8xl lg:text-[10rem] font-black uppercase leading-[0.85] tracking-tight"
        >
          <span className="text-gradient-rainbow">We're</span>
          <br />
          <span className="text-gradient-rainbow">Opening!</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-display text-[10px] md:text-sm tracking-[0.25em] text-foreground/70 uppercase mt-4 md:mt-6"
        >
          40+ Arcade Machines · Mini Golf · Prizes · Café — Opening May 2026
        </motion.p>

        {/* CTA — immediate, loud, unmissable */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-6 md:mt-10 flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#presale"
            className="inline-block font-display text-sm md:text-base uppercase tracking-[0.2em] font-bold px-8 md:px-12 py-4 md:py-5 bg-neon-green text-background rounded-md hover:shadow-[0_0_40px_hsl(var(--neon-green)/0.5)] transition-all duration-300 text-center"
          >
            Buy Credits Now
          </a>
          <a
            href="#about"
            className="inline-block font-display text-xs md:text-sm uppercase tracking-[0.2em] font-bold px-8 py-4 border border-foreground/20 text-foreground/80 rounded-md hover:border-neon-cyan hover:text-neon-cyan transition-all duration-300 text-center"
          >
            Learn More
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-5 h-8 rounded-full border-2 border-foreground/30 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-neon-cyan" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
