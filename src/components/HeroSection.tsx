import { motion } from "framer-motion";
import arcadeHero from "@/assets/arcade-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="absolute inset-0">
        <img
          src={arcadeHero}
          alt="Arcade machines, soft play, prizes and café at LuxPlay"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/45 via-background/35 to-background" />
        <div className="hero-circuit-overlay absolute inset-0" />
      </div>

      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-neon-bar z-20" />

      <div className="relative z-10 min-h-[100svh] px-4 pb-10 pt-20 sm:px-6 md:px-10 lg:px-16 lg:pt-24">
        <div className="mx-auto flex min-h-[calc(100svh-7rem)] max-w-[1500px] flex-col justify-between gap-8 lg:gap-10">
          <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.95fr] lg:gap-10">
            <div className="max-w-[760px]">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-3 font-body text-[11px] font-semibold uppercase tracking-[0.45em] text-white/65 sm:text-xs"
              >
                Arcade • Soft Play • Prizes • Café
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="hero-heading font-display text-[clamp(4rem,14vw,10rem)] leading-[0.84] text-white"
              >
                WE&apos;RE
                <br />
                OPENING!
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-5 flex flex-wrap gap-2.5 sm:gap-3"
              >
                <span className="border border-neon-pink/60 bg-background/55 px-3 py-2 font-display text-base tracking-widest text-neon-pink glow-pink sm:text-lg">
                  40+ ARCADE MACHINES
                </span>
                <span className="border border-neon-cyan/60 bg-background/55 px-3 py-2 font-display text-base tracking-widest text-neon-cyan glow-cyan sm:text-lg">
                  3-LEVEL SOFT PLAY
                </span>
                <span className="border border-neon-green/60 bg-background/55 px-3 py-2 font-display text-base tracking-widest text-neon-green glow-green sm:text-lg">
                  AMAZING PRIZES
                </span>
                <span className="border border-neon-purple/60 bg-background/55 px-3 py-2 font-display text-base tracking-widest text-neon-purple glow-purple sm:text-lg">
                  CAFÉ TREATS
                </span>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="grid gap-4 self-end sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
            >
              <div className="hero-panel hero-panel-green border border-neon-green/60 p-4 sm:p-5">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-3xl leading-none text-neon-green glow-green sm:text-4xl">50% OFF</p>
                    <p className="mt-1 font-display text-lg tracking-widest text-white sm:text-xl">SOFT PLAY</p>
                  </div>
                  <div className="font-display text-5xl leading-none text-neon-green/85">+</div>
                </div>
                <p className="mb-4 font-body text-sm uppercase tracking-[0.24em] text-white/65">Opening day sessions are half price</p>
                <a
                  href="#softplay"
                  className="block border border-neon-green bg-neon-green px-4 py-3 text-center font-display text-xl tracking-widest text-background transition-transform duration-200 hover:scale-[1.02]"
                >
                  BOOK SOFT PLAY
                </a>
              </div>

              <div className="hero-panel hero-panel-pink border border-neon-pink/60 p-4 sm:p-5">
                <div className="mb-3">
                  <p className="font-display text-3xl leading-none text-neon-pink glow-pink sm:text-4xl">DISCOUNTED</p>
                  <p className="mt-1 font-display text-2xl tracking-widest text-white sm:text-3xl">ARCADE CREDITS</p>
                </div>
                <p className="mb-4 font-body text-sm uppercase tracking-[0.24em] text-white/65">Grab opening offers before launch day</p>
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
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hero-panel border border-white/10 p-4 sm:p-5"
          >
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <p className="font-body text-xs uppercase tracking-[0.28em] text-white/60 sm:text-sm">
                Unit 7, Sovereign Centre · Boscombe · Bournemouth · BH1 4SX
              </p>
              <p className="font-body text-xs uppercase tracking-[0.28em] text-white/55 sm:text-sm">
                Bright prizes · Neon café drinks · Big launch energy
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-neon-bar z-20" />
    </section>
  );
};

export default HeroSection;
