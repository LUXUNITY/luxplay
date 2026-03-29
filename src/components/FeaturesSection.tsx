import { motion } from "framer-motion";
import founderBaz from "@/assets/founder-baz.jpg";

const FeaturesSection = () => {
  return (
    <section id="about" className="relative bg-[#070710] overflow-hidden">
      {/* Neon top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-neon-bar z-10" />

      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-neon-purple/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-neon-pink/5 rounded-full blur-3xl pointer-events-none" />

      {/* LAYOUT: Portrait left 40% | Statement right 60% */}
      <div className="relative z-10 flex flex-col md:flex-row min-h-screen">
        {/* LEFT — Founder portrait, full height, NO cropping into a card */}
        <div className="w-full md:w-[40%] flex flex-col items-center justify-center px-6 py-10 md:py-20">
          <img
            src={founderBaz}
            alt="Baz — Founder of LuxPlay"
            className="w-full max-w-md object-contain rounded-sm"
            style={{
              boxShadow: '0 0 15px #7700ff, 0 0 30px rgba(119, 0, 255, 0.5), 0 0 60px rgba(119, 0, 255, 0.3)',
            }}
          />
          <div className="mt-6 text-center">
            <p className="font-display text-sm md:text-base tracking-[0.25em] text-white/60">Sarbaz</p>
            <p className="font-display text-4xl md:text-5xl tracking-widest text-white mt-0.5">"BAZ"</p>
            <p className="font-display text-sm md:text-base tracking-[0.25em] text-white/60 mt-0.5">Roushbaiani</p>
            <p className="font-display text-base md:text-lg tracking-[0.3em] text-neon-purple mt-2">— Founder of LUXPLAY</p>
          </div>
        </div>

        {/* RIGHT — Statement content, fills space */}
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
              — BAZ, FOUNDER OF LUXPLAY
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
