import { motion } from "framer-motion";
import arcadeHero from "@/assets/arcade-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="absolute inset-0 hidden lg:block">
        <img
          src={arcadeHero}
          alt="LuxPlay opening with arcade machines, soft play, prizes and café"
          className="h-full w-full object-cover object-[42%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/20 to-background/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/35 via-background/10 to-background/35" />
        <div className="hero-circuit-overlay absolute inset-0" />
      </div>

      <div className="absolute top-0 left-0 right-0 z-20 h-1.5 bg-gradient-neon-bar" />

      <div className="relative z-10 min-h-[100svh] px-4 pb-8 pt-14 sm:px-6 md:px-10 lg:px-16 lg:pt-20">
        <div className="mx-auto flex min-h-[calc(100svh-5.5rem)] max-w-[1500px] flex-col justify-between gap-5 lg:gap-8">
          <div className="grid gap-5 lg:grid-cols-[1.04fr_0.96fr] lg:items-end lg:gap-10">
            <div className="max-w-[760px] pt-2 sm:pt-6 lg:pt-10">
              <div className="relative mb-5 overflow-hidden border border-white/10 bg-background/35 lg:hidden">
                <img
                  src={arcadeHero}
                  alt="LuxPlay opening with arcade machines, soft play, prizes and café"
                  className="h-auto w-full object-cover object-[46%_center]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background/5 via-background/10 to-background/35" />
                <div className="hero-circuit-overlay absolute inset-0" />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="mb-3 inline-flex flex-wrap gap-2"
              >
                <span className="hero-mini-label border border-neon-pink/60 px-2.5 py-1 font-display text-sm tracking-widest text-neon-pink glow-pink sm:text-base">
                  ARCADE
                </span>
                <span className="hero-mini-label border border-neon-cyan/60 px-2.5 py-1 font-display text-sm tracking-widest text-neon-cyan glow-cyan sm:text-base">
                  SOFT PLAY
                </span>
                <span className="hero-mini-label border border-neon-green/60 px-2.5 py-1 font-display text-sm tracking-widest text-neon-green glow-green sm:text-base">
                  PRIZES
                </span>
                <span className="hero-mini-label border border-neon-purple/60 px-2.5 py-1 font-display text-sm tracking-widest text-neon-purple glow-purple sm:text-base">
                  CAFÉ
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.05 }}
                className="hero-heading font-display text-[clamp(4.2rem,21vw,12rem)] leading-[0.82] [-webkit-text-stroke:1px_rgba(255,255,255,0.18)]"
              >
                WE&apos;RE
                <br />
                OPENING!
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.12 }}
                className="mt-2 max-w-[34rem] font-body text-[11px] font-semibold uppercase tracking-[0.28em] text-white/72 sm:text-xs md:text-sm"
              >
                40+ Arcade Machines • 3-Level Soft Play • Amazing Prizes • Café Treats
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.16 }}
                className="mt-4 inline-flex flex-wrap items-center border border-neon-cyan/55 bg-background/55 px-3 py-2 font-display text-sm tracking-widest text-white sm:text-lg"
              >
                <span className="text-neon-pink glow-pink">NEW CENTRE</span>
                <span className="mx-2 text-white/40">•</span>
                <span className="text-neon-green glow-green">NEW FUN</span>
                <span className="mx-2 text-white/40">•</span>
                <span className="text-neon-cyan glow-cyan">NEW MEMORIES</span>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15 }}
              className="grid grid-cols-2 gap-3 lg:grid-cols-1 xl:grid-cols-2"
            >
              <div className="hero-panel hero-panel-green border p-3 sm:p-5" style={{ borderColor: "rgba(170,255,0,0.55)" }}>
                <div className="mb-2 flex items-end justify-between gap-2">
                  <div>
                    <p className="font-display text-2xl leading-none text-neon-green glow-green sm:text-4xl">50% OFF</p>
                    <p className="mt-1 font-display text-sm tracking-widest text-white sm:text-xl">SOFT PLAY</p>
                  </div>
                  <div className="font-display text-3xl text-neon-green/75 sm:text-4xl">+</div>
                </div>
                <p className="mb-3 font-body text-[10px] uppercase tracking-[0.2em] text-white/68 sm:mb-4 sm:text-sm sm:tracking-[0.24em]">
                  Opening day sessions at half price
                </p>
                <a
                  href="#softplay"
                  className="block border border-neon-green bg-neon-green px-3 py-2 text-center font-display text-sm tracking-widest text-background transition-transform duration-200 hover:scale-[1.02] sm:px-4 sm:py-3 sm:text-xl"
                >
                  BOOK SOFT PLAY
                </a>
              </div>

              <div className="hero-panel hero-panel-pink border p-3 sm:p-5" style={{ borderColor: "rgba(255,0,204,0.55)" }}>
                <p className="font-display text-2xl leading-none text-neon-pink glow-pink sm:text-4xl">DISCOUNTED</p>
                <p className="mt-1 font-display text-lg tracking-widest text-white sm:text-3xl">ARCADE CREDITS</p>
                <p className="mb-3 mt-2 font-body text-[10px] uppercase tracking-[0.2em] text-white/68 sm:mb-4 sm:text-sm sm:tracking-[0.24em]">
                  Grab opening offers before launch day
                </p>
                <a
                  href="#presale"
                  className="block border border-neon-pink bg-neon-pink px-3 py-2 text-center font-display text-sm tracking-widest text-background transition-transform duration-200 hover:scale-[1.02] sm:px-4 sm:py-3 sm:text-xl"
                >
                  BUY CREDITS NOW
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="hero-panel border border-white/10 p-4 sm:p-5"
          >
            <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
              <p className="font-body text-[10px] uppercase tracking-[0.22em] text-white/68 sm:text-sm sm:tracking-[0.24em]">
                Unit 7, Sovereign Centre · Boscombe · Bournemouth · BH1 4SX
              </p>
              <p className="font-body text-[10px] uppercase tracking-[0.22em] text-white/58 sm:text-sm sm:tracking-[0.24em]">
                Electro-galaxy launch · Big energy · Family fun all day
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-gradient-neon-bar" />
    </section>
  );
};

export default HeroSection;
