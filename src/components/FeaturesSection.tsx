import { motion } from "framer-motion";
import founderBaz from "@/assets/founder-baz.jpg";
import arcadeHero from "@/assets/arcade-hero.jpg";

const FeaturesSection = () => {
  return (
    <section
      id="about"
      className="relative overflow-hidden"
    >
      {/* ============================================================
          BLOCK 1 — CINEMATIC FOUNDER HERO (full viewport)
          Portrait left, massive headline + statements right
          ============================================================ */}
      <div className="relative min-h-screen flex flex-col">
        {/* Blurred arcade background for depth — no dead black */}
        <img
          src={arcadeHero}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.12] blur-sm scale-105 pointer-events-none"
        />
        <div className="absolute inset-0 bg-background/80" />

        {/* Rainbow top divider */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-rainbow-bar z-20" />

        {/* Main content — grows to fill viewport */}
        <div className="relative z-10 flex-1 flex flex-col px-6 md:px-12 lg:px-20 pt-12 md:pt-16 lg:pt-20 pb-8">
          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 md:mb-12"
          >
            <p className="font-display text-sm md:text-lg lg:text-2xl font-bold uppercase tracking-[0.2em] text-foreground/80">
              While Everyone Is Closing —
            </p>
            <h2 className="font-display text-5xl md:text-7xl lg:text-9xl font-black uppercase leading-[0.85] mt-1">
              <span className="text-gradient-rainbow">We're Opening!</span>
            </h2>
          </motion.div>

          {/* Portrait + Statements — fills remaining space */}
          <div className="flex-1 flex flex-col md:flex-row gap-6 md:gap-10 lg:gap-16 items-stretch">
            {/* Portrait — LARGE, fills height on desktop */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-[42%] lg:w-[40%] flex-shrink-0"
            >
              <div className="relative h-full">
                <img
                  src={founderBaz}
                  alt="Baz — Founder of LuxPlay"
                  className="w-full h-full object-cover rounded-sm md:min-h-[400px] lg:min-h-[500px]"
                />
                {/* Gradient overlay on portrait for neon effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent rounded-sm" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <div className="inline-block bg-neon-green text-background font-display text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold px-4 md:px-6 py-2">
                    Baz — Founder
                  </div>
                </div>
                {/* Neon glow border effect */}
                <div className="absolute inset-0 rounded-sm ring-1 ring-neon-cyan/20 shadow-[0_0_40px_hsl(var(--neon-cyan)/0.1)]" />
              </div>
            </motion.div>

            {/* Statements + values — fills right side completely */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex-1 flex flex-col justify-between py-2 md:py-4"
            >
              {/* Personal statements */}
              <div className="space-y-4 md:space-y-6 mb-8 md:mb-10">
                <p className="text-muted-foreground text-xl md:text-2xl lg:text-3xl leading-relaxed">
                  Yes, the economy is tough.
                </p>
                <p className="text-muted-foreground text-xl md:text-2xl lg:text-3xl leading-relaxed">
                  Yes, the high street is struggling.
                </p>
                <p className="text-foreground text-2xl md:text-3xl lg:text-5xl font-bold leading-tight">
                  But we refuse to give up on Bournemouth.
                </p>
              </div>

              {/* About text */}
              <div className="mb-8 md:mb-10">
                <p className="text-muted-foreground text-lg md:text-xl lg:text-2xl leading-relaxed">
                  LuxPlay is a new family entertainment centre opening right here in Sovereign Centre. Built from the ground up for this community.
                </p>
              </div>

              {/* Neon value bullets — MASSIVE */}
              <div>
                <p className="font-display text-[10px] md:text-xs tracking-[0.3em] text-muted-foreground uppercase mb-4 font-bold">
                  What We Stand For
                </p>
                <div className="space-y-2 md:space-y-3">
                  {[
                    { text: "Local Jobs.", color: "text-neon-green" },
                    { text: "Local Families.", color: "text-neon-cyan" },
                    { text: "Local Community.", color: "text-neon-pink" },
                  ].map((item, i) => (
                    <motion.p
                      key={item.text}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="font-display text-2xl md:text-4xl lg:text-6xl font-bold uppercase leading-tight"
                    >
                      <span className="text-neon-cyan mr-3">◆</span>
                      <span className={item.color}>{item.text}</span>
                    </motion.p>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ============================================================
          BLOCK 2 — QUOTE + MANIFESTO (fills another full section)
          No dead space — rich background, big type
          ============================================================ */}
      <div className="relative min-h-[60vh] md:min-h-[70vh] flex flex-col justify-center overflow-hidden">
        {/* Background — neon gradient glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-background" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[120px]" />

        {/* Rainbow divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-rainbow-bar" />

        <div className="relative z-10 px-6 md:px-12 lg:px-20 py-16 md:py-20">
          {/* Quote block — MASSIVE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-16"
          >
            <div className="bg-muted/30 border-l-4 border-neon-purple rounded-r-lg p-8 md:p-12 lg:p-16">
              <p className="text-foreground font-semibold text-xl md:text-3xl lg:text-4xl leading-relaxed">
                We're not afraid to work hard and build a better Bournemouth. Because while others walk away —{" "}
                <span className="text-neon-cyan font-bold">we're doubling down on this town.</span>
              </p>
              <p className="mt-6 font-display text-xs md:text-sm tracking-[0.2em] text-muted-foreground uppercase">
                — Baz, Founder of LuxPlay
              </p>
            </div>
          </motion.div>

          {/* Manifesto statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <p className="text-foreground font-bold text-3xl md:text-5xl lg:text-7xl leading-tight">
              This is just the{" "}
              <span className="text-gradient-rainbow">beginning.</span>
            </p>
            <p className="text-muted-foreground text-lg md:text-xl lg:text-2xl mt-4 md:mt-6 max-w-3xl mx-auto">
              Come in. Have fun. Be part of the journey.
            </p>
          </motion.div>

          {/* LUXPLAY anchor — big and centered */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="font-display text-4xl md:text-6xl lg:text-8xl font-black tracking-[0.15em] uppercase">
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
                  <span key={i} className={colors[i]}>
                    {char}
                  </span>
                );
              })}
            </p>
            <p className="font-display text-xs md:text-sm tracking-[0.25em] text-muted-foreground uppercase mt-3">
              Opening May 2026 · Sovereign Centre · Bournemouth
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
