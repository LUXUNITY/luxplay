import { motion } from "framer-motion";
import arcadeHero from "@/assets/arcade-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-background">
      <div className="absolute inset-0">
        <img
          src={arcadeHero}
          alt="LuxPlay opening with arcade machines, soft play, prizes and café"
          className="h-full w-full object-contain object-center md:object-cover"
        />
        <div className="absolute inset-0 bg-background/58 md:bg-background/42" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--background)/0.08),hsl(var(--background)/0.82)_72%)]" />
        <div className="hero-circuit-overlay absolute inset-0" />
      </div>

      <div className="absolute top-0 left-0 right-0 z-20 h-1.5 bg-gradient-neon-bar" />

      <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-4 pt-16 pb-8 text-center sm:px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-4 flex flex-wrap justify-center gap-2"
        >
          <span className="hero-mini-label border border-neon-pink/65 px-2.5 py-1 font-display text-sm tracking-widest text-neon-pink glow-pink sm:text-base">
            ARCADE
          </span>
          <span className="hero-mini-label border border-neon-cyan/65 px-2.5 py-1 font-display text-sm tracking-widest text-neon-cyan glow-cyan sm:text-base">
            SOFT PLAY
          </span>
          <span className="hero-mini-label border border-neon-green/65 px-2.5 py-1 font-display text-sm tracking-widest text-neon-green glow-green sm:text-base">
            PRIZES
          </span>
          <span className="hero-mini-label border border-neon-purple/65 px-2.5 py-1 font-display text-sm tracking-widest text-neon-purple glow-purple sm:text-base">
            CAFÉ
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.05 }}
          className="hero-heading font-display text-[clamp(4.8rem,24vw,12rem)] leading-[0.8]"
        >
          WE&apos;RE
          <br />
          OPENING!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="mt-3 max-w-[42rem] font-body text-[11px] font-semibold uppercase tracking-[0.28em] text-white/80 sm:text-xs md:text-sm"
        >
          40+ Arcade Machines • 3-Level Soft Play • Amazing Prizes • Café Treats
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16 }}
          className="mt-4 inline-flex flex-wrap items-center justify-center border border-neon-cyan/55 bg-background/55 px-3 py-2 font-display text-sm tracking-widest text-white sm:text-lg"
        >
          <span className="text-neon-pink glow-pink">NEW CENTRE</span>
          <span className="mx-2 text-white/40">•</span>
          <span className="text-neon-green glow-green">NEW FUN</span>
          <span className="mx-2 text-white/40">•</span>
          <span className="text-neon-cyan glow-cyan">NEW MEMORIES</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="mt-6 grid w-full max-w-[780px] gap-3 sm:grid-cols-2"
        >
          <div className="hero-panel hero-panel-green border p-4" style={{ borderColor: "rgba(170,255,0,0.55)" }}>
            <div className="mb-2 flex items-end justify-center gap-2">
              <p className="font-display text-3xl leading-none text-neon-green glow-green sm:text-4xl">50% OFF</p>
              <span className="font-display text-3xl text-neon-green/75">+</span>
            </div>
            <p className="font-display text-lg tracking-widest text-white sm:text-xl">SOFT PLAY</p>
            <p className="mb-3 mt-2 font-body text-[10px] uppercase tracking-[0.2em] text-white/68 sm:text-sm">
              Opening day sessions at half price
            </p>
            <a
              href="#softplay"
              className="block border border-neon-green bg-neon-green px-3 py-2 text-center font-display text-sm tracking-widest text-background transition-transform duration-200 hover:scale-[1.02] sm:text-lg"
            >
              BOOK SOFT PLAY
            </a>
          </div>

          <div className="hero-panel hero-panel-pink border p-4" style={{ borderColor: "rgba(255,0,204,0.55)" }}>
            <p className="font-display text-3xl leading-none text-neon-pink glow-pink sm:text-4xl">DISCOUNTED</p>
            <p className="mt-1 font-display text-xl tracking-widest text-white sm:text-2xl">ARCADE CREDITS</p>
            <p className="mb-3 mt-2 font-body text-[10px] uppercase tracking-[0.2em] text-white/68 sm:text-sm">
              Grab opening offers before launch day
            </p>
            <a
              href="#presale"
              className="block border border-neon-pink bg-neon-pink px-3 py-2 text-center font-display text-sm tracking-widest text-background transition-transform duration-200 hover:scale-[1.02] sm:text-lg"
            >
              BUY CREDITS NOW
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.24 }}
          className="hero-panel mt-5 w-full max-w-[920px] border border-white/10 px-4 py-3"
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="font-body text-[10px] uppercase tracking-[0.22em] text-white/72 sm:text-sm">
              Unit 7, Sovereign Centre · Boscombe · Bournemouth · BH1 4SX
            </p>
            <p className="font-body text-[10px] uppercase tracking-[0.22em] text-white/58 sm:text-sm">
              Electro-galaxy launch · Big energy · Family fun all day
            </p>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-gradient-neon-bar" />
    </section>
  );
};

export default HeroSection;
