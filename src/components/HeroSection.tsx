import { motion } from "framer-motion";
import arcadeHero from "@/assets/arcade-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="absolute inset-0">
        <img
          src={arcadeHero}
          alt="LuxPlay opening with arcade machines, soft play, prizes and café"
          className="h-full w-full object-cover object-[34%_center] sm:object-[38%_center] lg:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/8 via-background/18 to-background/82" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/48 via-background/18 to-background/46 lg:from-background/34 lg:to-background/34" />
        <div className="hero-circuit-overlay absolute inset-0" />
      </div>

      <div className="absolute top-0 left-0 right-0 z-20 h-1.5 bg-gradient-neon-bar" />

      <div className="relative z-10 min-h-[100svh] px-4 pb-8 pt-14 sm:px-6 md:px-10 lg:px-16 lg:pt-20">
        <div className="mx-auto flex min-h-[calc(100svh-5.5rem)] max-w-[1500px] flex-col justify-between gap-5 lg:gap-8">
          <div className="grid gap-5 lg:grid-cols-[1.04fr_0.96fr] lg:items-end lg:gap-10">
            <div className="max-w-[720px] pt-3 sm:pt-8 lg:pt-10">
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
                className="hero-heading font-display text-[clamp(5.4rem,25vw,12rem)] leading-[0.8] [-webkit-text-stroke:1px_rgba(255,255,255,0.18)]"
              >
                WE&apos;RE
                <br />
                OPENING!
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.12 }}
                className="mt-2 max-w-[32rem] font-body text-[11px] font-semibold uppercase tracking-[0.36em] text-white/72 sm:text-xs md:text-sm"
              >
                40+ Arcade Machines • 3-Level Soft Play • Amazing Prizes • Café Treats
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.16 }}
                className="mt-4 inline-flex border border-neon-cyan/55 bg-background/55 px-3 py-2 font-display text-base tracking-widest text-white sm:text-lg"
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
              className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
            >
              <div className="hero-panel hero-panel-green border p-4 sm:p-5" style={{ borderColor: "rgba(170,255,0,0.55)" }}>
                <div className="mb-3 flex items-end justify-between gap-3">
                  <div>
                    <p className="font-display text-3xl leading-none text-neon-green glow-green sm:text-4xl">50% OFF</p>
                    <p className="mt-1 font-display text-lg tracking-widest text-white sm:text-xl">SOFT PLAY</p>
                  </div>
                  <div className="font-display text-4xl text-neon-green/75">+</div>
                </div>
                <p className="mb-4 font-body text-xs uppercase tracking-[0.24em] text-white/68 sm:text-sm">
                  Opening day sessions at half price
                </p>
                <a
                  href="#softplay"
                  className="block border border-neon-green bg-neon-green px-4 py-3 text-center font-display text-xl tracking-widest text-background transition-transform duration-200 hover:scale-[1.02]"
                >
                  BOOK SOFT PLAY
                </a>
              </div>

              <div className="hero-panel hero-panel-pink border p-4 sm:p-5" style={{ borderColor: "rgba(255,0,204,0.55)" }}>
                <p className="font-display text-3xl leading-none text-neon-pink glow-pink sm:text-4xl">DISCOUNTED</p>
                <p className="mt-1 font-display text-2xl tracking-widest text-white sm:text-3xl">ARCADE CREDITS</p>
                <p className="mb-4 mt-2 font-body text-xs uppercase tracking-[0.24em] text-white/68 sm:text-sm">
                  Grab opening offers before launch day
                </p>
                <a
                  href="#presale"
                  className="block border border-neon-pink bg-neon-pink px-4 py-3 text-center font-display text-xl tracking-widest text-background transition-transform duration-200 hover:scale-[1.02]"
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
              <p className="font-body text-xs uppercase tracking-[0.24em] text-white/68 sm:text-sm">
                Unit 7, Sovereign Centre · Boscombe · Bournemouth · BH1 4SX
              </p>
              <p className="font-body text-xs uppercase tracking-[0.24em] text-white/58 sm:text-sm">
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
