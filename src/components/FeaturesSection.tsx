import { motion } from "framer-motion";
import founderBazAsset from "@/assets/founder-baz-clean.png.asset.json";
import founderMartinAsset from "@/assets/founder-martin-clean.png.asset.json";

import { gridBackgroundUrl } from "@/components/circuitTile";

const sharedBusinesses = [
  { name: "LuxPlay", color: "text-neon-cyan", shadow: "0 0 8px rgba(0,238,255,0.55)" },
  { name: "MJlux cafè", color: "text-neon-pink", shadow: "0 0 8px rgba(255,0,204,0.55)" },
  { name: "LuxKey", color: "text-neon-purple", shadow: "0 0 8px rgba(119,0,255,0.55)" },
  { name: "LuxRenovations", color: "text-neon-green", shadow: "0 0 8px rgba(170,255,0,0.55)" },
];

const founders = [
  {
    img: founderBazAsset.url,
    objectPos: "object-bottom",
    first: "Sarbaz",
    name: '"BAZ"',
    last: "Roushbaiani",
    role: "Owner & Director",
    accent: "text-neon-cyan",
    shadow: "0 0 10px rgba(0, 255, 255, 0.6), 0 0 20px rgba(0, 255, 255, 0.3)",
    glow: "0 0 8px rgba(0, 229, 255, 0.5), 0 0 18px rgba(0, 229, 255, 0.25), 0 0 40px rgba(0, 229, 255, 0.12)",
  },
  {
    img: founderMartinAsset.url,
    objectPos: "object-top",
    first: "",
    name: "MARTIN",
    last: "MacGillivray",
    role: "Owner & Director",
    accent: "text-neon-purple",
    shadow: "0 0 10px rgba(168, 85, 247, 0.6), 0 0 20px rgba(168, 85, 247, 0.3)",
    glow: "0 0 8px rgba(168, 85, 247, 0.5), 0 0 18px rgba(168, 85, 247, 0.25), 0 0 40px rgba(168, 85, 247, 0.12)",
  },
];

const FeaturesSection = () => {
  return (
    <section id="about" className="relative bg-[#070710] overflow-hidden">

      {/* Neon top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-neon-bar z-20" />

      {/* NEON CIRCUIT BOARD — strongest at edges, fades toward centre
          so traces appear to spread outward from the portraits. */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: gridBackgroundUrl,
          backgroundRepeat: "repeat",
          backgroundSize: "400px 400px",
          backgroundPosition: "center",
          opacity: 0.45,
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 55% at 50% 50%, transparent 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.75) 100%)",
          maskImage:
            "radial-gradient(ellipse 60% 55% at 50% 50%, transparent 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      {/* Aurora glows */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full blur-3xl z-0"
        style={{ background: "radial-gradient(circle, rgba(57,255,20,0.18) 0%, rgba(57,255,20,0) 70%)" }}
      />
      <div
        className="pointer-events-none absolute -top-24 -right-24 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full blur-3xl z-0"
        style={{ background: "radial-gradient(circle, rgba(124,77,255,0.22) 0%, rgba(124,77,255,0) 70%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-24 w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full blur-3xl z-0"
        style={{ background: "radial-gradient(circle, rgba(0,229,255,0.18) 0%, rgba(0,229,255,0) 70%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-32 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full blur-3xl z-0"
        style={{ background: "radial-gradient(circle, rgba(255,43,214,0.18) 0%, rgba(255,43,214,0) 70%)" }}
      />

      <div className="relative z-10 flex flex-col md:flex-row md:min-h-screen">
        {/* LEFT — Founders stacked, clean photo + live-text description */}
        <div className="relative w-full md:w-[40%] flex flex-col items-center justify-center gap-12 md:gap-16 px-6 py-12 md:py-20">
          {founders.map((f) => (
            <div key={f.name + f.last} className="relative z-10 flex flex-col items-center w-full">
              <div className="w-full max-w-[200px] md:max-w-[260px] aspect-[4/5] overflow-hidden rounded-sm bg-[#070710]"
                   style={{ boxShadow: f.glow }}>
                <img
                  src={f.img}
                  alt={`${f.name} ${f.last} — LuxPlay`}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="mt-6 text-center">
                {f.first && (
                  <p className="font-display text-sm md:text-base tracking-[0.25em] text-white/60">{f.first}</p>
                )}
                <p className="font-display text-4xl md:text-5xl tracking-widest text-white mt-0.5">{f.name}</p>
                <p className="font-display text-sm md:text-base tracking-[0.25em] text-white/60 mt-0.5">{f.last}</p>
                <p
                  className={`font-display text-sm md:text-base tracking-[0.3em] ${f.accent} mt-3`}
                  style={{ textShadow: f.shadow }}
                >
                  — {f.role}
                </p>
                <div className="mt-4 pt-3 border-t border-white/10">
                  <p className="font-display text-[10px] md:text-xs tracking-[0.35em] text-white/30 mb-2">
                    CO-OWNERS OF
                  </p>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                    {sharedBusinesses.map((b) => (
                      <span
                        key={b.name}
                        className={`font-display text-xs md:text-sm tracking-wider ${b.color}`}
                        style={{ textShadow: b.shadow }}
                      >
                        {b.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


        {/* RIGHT — Statement content */}
        <div className="w-full md:w-[60%] flex flex-col justify-center px-6 md:px-14 lg:px-20 py-16 md:py-20">
          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl md:text-3xl lg:text-4xl tracking-wider text-white/70 mb-2"
          >
            While others wait for better times —
          </motion.p>

          {/* Main headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-6xl md:text-8xl lg:text-9xl tracking-wider leading-[0.9] mb-10 md:mb-14"
          >
            <span className="text-gradient-neon">WE'RE CREATING THEM!</span>
          </motion.h2>

          {/* Statements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4 md:space-y-5 mb-10 md:mb-14"
          >
            <p className="font-body text-white/50 text-lg md:text-xl lg:text-2xl">
              Yes, the economy is tough.
            </p>
            <p className="font-body text-white/50 text-lg md:text-xl lg:text-2xl">
              Yes, the high street is struggling.
            </p>
            <p className="font-body text-white text-xl md:text-2xl lg:text-3xl font-bold">
              But we refuse to give up on Bournemouth.
            </p>
          </motion.div>

          {/* About */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-body text-white/50 text-base md:text-lg lg:text-xl leading-relaxed mb-10 md:mb-14 max-w-2xl"
          >
            LuxPlay is a new family entertainment centre opening right here in Sovereign Centre.
            Built from the ground up for this community. This is just the beginning.
          </motion.p>

          {/* Value bullets — BIG neon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 md:mb-14"
          >
            <p className="font-display text-sm tracking-[0.3em] text-white/30 mb-4">
              WHAT WE STAND FOR
            </p>
            <div className="space-y-2">
              {[
                { text: "LOCAL JOBS.", color: "text-neon-green" },
                { text: "LOCAL FAMILIES.", color: "text-neon-cyan" },
                { text: "LOCAL COMMUNITY.", color: "text-neon-pink" },
              ].map((item, i) => (
                <motion.p
                  key={item.text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`font-display text-4xl md:text-5xl lg:text-7xl tracking-wider ${item.color}`}
                >
                  {item.text}
                </motion.p>
              ))}
            </div>
          </motion.div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-l-4 border-neon-purple pl-6 md:pl-8"
          >
            <p className="font-body text-white/90 font-semibold text-lg md:text-xl lg:text-2xl leading-relaxed">
              We're not afraid to work hard and build a better Bournemouth.
              Because while others walk away —{" "}
              <span className="text-neon-cyan font-bold">we're doubling down on this town.</span>
            </p>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default FeaturesSection;
