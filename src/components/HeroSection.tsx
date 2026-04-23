import { motion } from "framer-motion";
import arcadeHero from "@/assets/arcade-hero.jpg";
import arcadeHeroMobile from "@/assets/arcade-hero-mobile.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-background">
      <div className="absolute inset-0">
        <picture>
          <source media="(max-width: 767px)" srcSet={arcadeHeroMobile} />
          <img
            src={arcadeHero}
            alt="LuxPlay opening with arcade machines, soft play, prizes and café"
            className="h-full w-full object-cover object-center"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-background/18 via-background/22 to-background/72 md:from-background/18 md:via-background/26 md:to-background/76" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--background)/0.02),hsl(var(--background)/0.72)_78%)] md:bg-[radial-gradient(circle_at_center,hsl(var(--background)/0.08),hsl(var(--background)/0.78)_72%)]" />
        <div className="hero-circuit-overlay absolute inset-0" />
      </div>

      <div className="absolute top-0 left-0 right-0 z-20 h-1.5 bg-gradient-neon-bar" />

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-4 pb-6 pt-16 text-center sm:px-6 md:items-center md:justify-center md:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-[880px]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="hidden flex-wrap justify-center gap-2 md:flex"
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
            className="hero-heading hidden font-display text-[clamp(5rem,18vw,12rem)] leading-[0.8] md:block"
          >
            WE&apos;RE
            <br />
            OPENING!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="hidden max-w-[42rem] font-body text-[11px] font-semibold uppercase tracking-[0.28em] text-white/80 md:mx-auto md:mt-3 md:block md:text-sm"
          >
            40+ Arcade Machines • 3-Level Soft Play • Amazing Prizes • Café Treats
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="hidden inline-flex flex-wrap items-center justify-center border border-neon-cyan/55 bg-background/55 px-3 py-2 font-display text-sm tracking-widest text-white md:mt-4 md:inline-flex md:text-lg"
          >
            <span className="text-neon-pink glow-pink">NEW CENTRE</span>
            <span className="mx-2 text-white/40">•</span>
            <span className="text-neon-green glow-green">NEW FUN</span>
            <span className="mx-2 text-white/40">•</span>
            <span className="text-neon-cyan glow-cyan">NEW MEMORIES</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="mx-auto mt-5 grid w-full max-w-[860px] gap-3 sm:grid-cols-2 md:mt-8"
        >
          <div className="hero-panel hero-panel-green border p-3.5 sm:p-4" style={{ borderColor: "rgba(170,255,0,0.55)" }}>
            <div className="mb-2 flex items-end justify-center gap-2">
              <p className="font-display text-2xl leading-none text-neon-green glow-green sm:text-3xl">50% OFF</p>
              <span className="font-display text-2xl text-neon-green/75 sm:text-3xl">+</span>
            </div>
            <p className="font-display text-base tracking-widest text-white sm:text-lg">SOFT PLAY</p>
            <p className="mb-3 mt-2 font-body text-[10px] uppercase tracking-[0.18em] text-white/68 sm:text-xs">
              Opening day sessions at half price
            </p>
            <a
              href="#softplay"
              className="block border border-neon-green bg-neon-green px-3 py-2 text-center font-display text-sm tracking-widest text-background transition-transform duration-200 hover:scale-[1.02] sm:text-base"
            >
              BOOK SOFT PLAY
            </a>
          </div>

          <div className="hero-panel hero-panel-pink border p-3.5 sm:p-4" style={{ borderColor: "rgba(255,0,204,0.55)" }}>
            <p className="font-display text-2xl leading-none text-neon-pink glow-pink sm:text-3xl">DISCOUNTED</p>
            <p className="mt-1 font-display text-lg tracking-widest text-white sm:text-xl">ARCADE CREDITS</p>
            <p className="mb-3 mt-2 font-body text-[10px] uppercase tracking-[0.18em] text-white/68 sm:text-xs">
              Grab opening offers before launch day
            </p>
            <a
              href="#presale"
              className="block border border-neon-pink bg-neon-pink px-3 py-2 text-center font-display text-sm tracking-widest text-background transition-transform duration-200 hover:scale-[1.02] sm:text-base"
            >
              BUY CREDITS NOW
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.24 }}
          className="hero-panel mx-auto mt-4 w-full max-w-[920px] border border-white/10 px-4 py-3"
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="font-body text-[10px] uppercase tracking-[0.2em] text-white/72 sm:text-xs md:text-sm">
              Unit 7, Sovereign Centre · Boscombe · Bournemouth · BH1 4SX
            </p>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-gradient-neon-bar" />
    </section>
  );
};

export default HeroSection;