import { motion } from "framer-motion";
import founderBaz from "@/assets/founder-baz.jpg";
import teamRares from "@/assets/team-rares.jpg";
import teamJack from "@/assets/team-jack.jpg";
import teamMartin from "@/assets/team-martin.png";
import neonCircuit from "@/assets/neon-circuit.png";

const TEAM = [
  {
    img: teamJack,
    alt: "Jack Oswell",
    name: "JACK OSWELL",
    role: "Arcade Systems & Technical Operations",
    company: "Co-Owner & Director, JNR Innovations",
  },
  {
    img: teamRares,
    alt: "Rares Cucos",
    name: "RARES CUCOS",
    role: "Arcade Systems & Technical Operations",
    company: "Co-Owner & Director, JNR Innovations",
  },
  {
    img: teamMartin,
    alt: "Martin MacGillivray",
    name: "MARTIN MACGILLIVRAY",
    role: "Lead Construction & Development Director",
    company: "Owner & Director, MasterClass Exteriors",
  },
];

const TeamGrid = () => (
  <>
    <p className="font-display text-xs tracking-[0.3em] text-white/30 mb-6 text-center">
      THE TEAM
    </p>
    <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
      {TEAM.map((m) => (
        <div key={m.name} className="text-center">
          <div className="relative w-full max-w-[220px] mx-auto">
            {/* (Circuit pattern is now provided by the section-wide background) */}
            <div
              className="relative aspect-square w-full overflow-hidden rounded-sm border border-white/10"
              style={{
                boxShadow:
                  "0 0 8px rgba(119, 0, 255, 0.35), 0 0 16px rgba(119, 0, 255, 0.18)",
              }}
            >
              <img
                src={m.img}
                alt={m.alt}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
          <p className="font-display text-[11px] md:text-xs tracking-[0.18em] text-white mt-3 leading-tight">
            {m.name}
          </p>
          <p className="font-body text-[10px] md:text-[11px] text-neon-purple/90 mt-1 leading-snug">
            {m.role}
          </p>
          <p className="font-body text-[10px] md:text-[11px] text-white/40 mt-1 leading-snug">
            {m.company}
          </p>
        </div>
      ))}
    </div>
  </>
);

const FeaturesSection = () => {
  return (
    <section id="about" className="relative bg-[#070710] overflow-hidden">

      {/* Neon top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-neon-bar z-20" />

      {/* MAIN CIRCUIT BACKGROUND — covers the whole section, sits behind everything */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${neonCircuit})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.55,
          mixBlendMode: "screen",
        }}
      />
      {/* Mirrored copy on the right for symmetry */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${neonCircuit})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.45,
          mixBlendMode: "screen",
          transform: "scaleX(-1)",
        }}
      />
      {/* Soft vignette so center stays readable */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at center, rgba(7,7,16,0.85) 0%, rgba(7,7,16,0.4) 50%, rgba(7,7,16,0) 100%)",
        }}
      />

      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-neon-purple/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-neon-pink/5 rounded-full blur-3xl pointer-events-none" />

      {/* LAYOUT: Portrait left | Statement right (on mobile, team is forced between them via flex order) */}
      <div className="relative z-10 flex flex-col md:flex-row md:min-h-screen">
        {/* LEFT — Founder portrait with neon circuit patterns flanking it */}
        <div className="relative w-full md:w-[40%] flex flex-col items-center justify-center px-6 py-10 md:py-20">
          {/* (Circuit pattern is now provided by the section-wide background) */}

          <div className="relative z-10 flex flex-col items-center">
            <img
              src={founderBaz}
              alt="Baz — Founder of LuxPlay"
              className="w-full max-w-[240px] md:max-w-[300px] object-contain rounded-sm"
              loading="lazy"
              decoding="async"
              style={{
                boxShadow:
                  '0 0 8px rgba(119, 0, 255, 0.5), 0 0 18px rgba(119, 0, 255, 0.25), 0 0 40px rgba(119, 0, 255, 0.12)',
              }}
            />
            <div className="mt-6 text-center">
              <p className="font-display text-sm md:text-base tracking-[0.25em] text-white/60">Sarbaz</p>
              <p className="font-display text-4xl md:text-5xl tracking-widest text-white mt-0.5">"BAZ"</p>
              <p className="font-display text-sm md:text-base tracking-[0.25em] text-white/60 mt-0.5">Roushbaiani</p>
              <p
                className="font-display text-base md:text-lg tracking-[0.3em] text-neon-cyan mt-3"
                style={{ textShadow: '0 0 10px rgba(0, 255, 255, 0.6), 0 0 20px rgba(0, 255, 255, 0.3)' }}
              >
                — Founder &amp; Managing Director
              </p>
              <p className="font-display text-xs md:text-sm tracking-[0.25em] text-white/70 mt-1.5">Owner &amp; Director of Lux Unity Ltd</p>
            </div>
          </div>
        </div>

        {/* MOBILE-ONLY team grid, sits directly under Baz */}
        <div className="md:hidden w-full px-6 pb-12">
          <TeamGrid />
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
            <p className="font-display text-sm tracking-widest text-white/30 mt-4">
              — SARBAZ "BAZ" ROUSHBAIANI, FOUNDER OF LUXPLAY
            </p>
          </motion.div>
        </div>
      </div>

      {/* THE TEAM — desktop: full-width row below the two-column layout (mobile version is inside the flex above) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="hidden md:block relative z-10 px-6 md:px-14 lg:px-20 pb-16 md:pb-24"
      >
        <TeamGrid />
      </motion.div>
    </section>
  );
};

export default FeaturesSection;
