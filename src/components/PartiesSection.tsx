import { motion } from "framer-motion";
import { Cake, Gift, Sparkles, PartyPopper, Check } from "lucide-react";

type Tier = {
  name: string;
  price: number;
  accent: "cyan" | "pink" | "purple";
  highlight?: boolean;
  perks: string[];
  tagline: string;
};

const TIERS: Tier[] = [
  {
    name: "STARTER",
    price: 19.99,
    accent: "cyan",
    tagline: "Soft play + arcade credits",
    perks: [
      "2 hours of soft play",
      "£10 arcade credits per child",
      "Hot meal: nuggets, chips & drink",
      "Small toy inside every meal",
      "Adults go free",
    ],
  },
  {
    name: "CLASSIC",
    price: 24.99,
    accent: "pink",
    highlight: true,
    tagline: "Most popular party",
    perks: [
      "2 hours of soft play",
      "£15 arcade credits per child",
      "Hot meal: nuggets, chips & drink",
      "Extra snack & drink included",
      "Small toy inside every meal",
      "Adults go free",
    ],
  },
  {
    name: "ULTIMATE",
    price: 29.99,
    accent: "purple",
    tagline: "The full birthday blowout",
    perks: [
      "2 hours of soft play",
      "£20 arcade credits per child",
      "Hot meal: nuggets, chips & drink",
      "Extra snack & drink included",
      "Small toy inside every meal",
      "Birthday cake OR gift included",
      "Adults go free",
    ],
  },
];


const accentMap = {
  cyan: {
    text: "text-neon-cyan",
    border: "border-neon-cyan",
    bg: "bg-neon-cyan",
    shadow: "shadow-[0_0_40px_rgba(0,238,255,0.25)]",
    glow: "0 0 25px rgba(0,238,255,0.9), 0 0 55px rgba(0,238,255,0.4)",
  },
  pink: {
    text: "text-neon-pink",
    border: "border-neon-pink",
    bg: "bg-neon-pink",
    shadow: "shadow-[0_0_60px_rgba(255,0,204,0.35)]",
    glow: "0 0 25px rgba(255,0,204,0.9), 0 0 55px rgba(255,0,204,0.4)",
  },
  purple: {
    text: "text-neon-purple",
    border: "border-neon-purple",
    bg: "bg-neon-purple",
    shadow: "shadow-[0_0_40px_rgba(170,0,255,0.25)]",
    glow: "0 0 25px rgba(170,0,255,0.9), 0 0 55px rgba(170,0,255,0.4)",
  },
} as const;

const BALLOONS = [
  { left: "6%", color: "rgba(255,0,204,0.45)", dur: "13s", delay: "0s", drift: "30px" },
  { left: "18%", color: "rgba(0,238,255,0.4)", dur: "16s", delay: "2.5s", drift: "-24px" },
  { left: "34%", color: "rgba(170,255,0,0.35)", dur: "14.5s", delay: "5s", drift: "18px" },
  { left: "52%", color: "rgba(119,0,255,0.45)", dur: "17s", delay: "1.2s", drift: "-32px" },
  { left: "68%", color: "rgba(255,0,204,0.35)", dur: "15s", delay: "6.5s", drift: "26px" },
  { left: "84%", color: "rgba(0,238,255,0.4)", dur: "18s", delay: "3.6s", drift: "-20px" },
  { left: "93%", color: "rgba(255,235,0,0.32)", dur: "14s", delay: "8s", drift: "16px" },
];

const CONFETTI = [
  { left: "10%", color: "#ff00cc", dur: "6.5s", delay: "0s", drift: "40px" },
  { left: "25%", color: "#00eeff", dur: "8s", delay: "1.5s", drift: "-30px" },
  { left: "40%", color: "#aaff00", dur: "7s", delay: "3s", drift: "25px" },
  { left: "58%", color: "#7700ff", dur: "9s", delay: "0.8s", drift: "-45px" },
  { left: "72%", color: "#ff00cc", dur: "7.5s", delay: "4.2s", drift: "35px" },
  { left: "88%", color: "#00eeff", dur: "8.5s", delay: "2.2s", drift: "-28px" },
];

const PartiesSection = () => {
  return (
    <section id="parties" className="relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan" />

      <div className="absolute top-1/4 left-1/4 w-[420px] h-[420px] bg-neon-pink/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[420px] h-[420px] bg-neon-purple/5 rounded-full blur-3xl pointer-events-none" />

      {/* Floating balloons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {BALLOONS.map((b, i) => (
          <span
            key={i}
            className="party-balloon"
            style={{
              left: b.left,
              background: b.color,
              animationDuration: b.dur,
              animationDelay: b.delay,
              ["--bx" as string]: b.drift,
            }}
          />
        ))}
        {CONFETTI.map((c, i) => (
          <span
            key={`c${i}`}
            className="confetti"
            style={{
              left: c.left,
              background: c.color,
              animationDuration: c.dur,
              animationDelay: c.delay,
              ["--cdrift" as string]: c.drift,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 px-6 md:px-12 lg:px-20 py-20 md:py-28">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <span className="inline-flex items-center gap-2 border-2 border-neon-pink bg-neon-pink/10 text-neon-pink font-display text-sm tracking-[0.3em] uppercase px-6 py-3 animate-pulse">
            <PartyPopper className="w-4 h-4 animate-icon-bob" />
            BIRTHDAY PARTIES
            <PartyPopper className="w-4 h-4 animate-icon-bob" />
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-3 mt-6"
        >
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wider">
            <span className="text-gradient-neon animate-big-throb inline-block">PARTY PACKAGES</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center font-body text-white/60 text-sm md:text-base max-w-2xl mx-auto mb-14"
        >
          Pick a package, pick a date, leave the rest to us. All prices per child — adults go free.
        </motion.p>

        {/* Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {TIERS.map((t, i) => {
            const a = accentMap[t.accent];
            return (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`party-card bg-[#0a0a16] border-2 ${a.border} p-7 md:p-8 flex flex-col ${
                  t.highlight ? a.shadow + " md:-translate-y-3" : ""
                }`}
              >
                {t.highlight && (
                  <div
                    className="absolute -inset-24 animate-party-rays opacity-40 pointer-events-none"
                    aria-hidden="true"
                  />
                )}
                {t.highlight && (
                  <span
                    className={`absolute -top-4 left-1/2 -translate-x-1/2 ${a.bg} text-[#070710] font-display text-[10px] tracking-[0.3em] px-4 py-1.5 animate-party-tag whitespace-nowrap`}
                  >
                    ★ MOST POPULAR ★
                  </span>
                )}

                <p className={`font-display text-xs tracking-[0.3em] ${a.text} mb-2`}>
                  {t.name}
                </p>
                <p className="font-body text-white/50 text-xs mb-6">{t.tagline}</p>

                <div className="flex items-end gap-2 mb-6">
                  <span
                    className={`font-display text-6xl md:text-7xl ${a.text} leading-none ${
                      t.highlight ? "animate-credit-flash" : ""
                    }`}
                    style={t.highlight ? undefined : { textShadow: a.glow }}
                  >
                    £{t.price.toFixed(2)}
                  </span>
                  <span className="font-body text-white/40 text-xs mb-2 tracking-wider">
                    / child
                  </span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {t.perks.map((p) => (
                    <li key={p} className="flex items-start gap-3 font-body text-sm text-white/80">
                      <Check className={`w-4 h-4 mt-0.5 shrink-0 ${a.text}`} />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={`mailto:luxplayuk@gmail.com?subject=${encodeURIComponent(
                    `Party Enquiry — ${t.name} Package (£${t.price.toFixed(2)}/child)`
                  )}&body=${encodeURIComponent(
                    `Hi LuxPlay,\n\nI'd like to enquire about the ${t.name} party package (£${t.price.toFixed(2)} per child).\n\nPreferred date:\nNumber of children:\nChild's name & age:\nContact number:\n\nThanks!`
                  )}`}
                  className={`neon-cta block text-center font-display text-sm tracking-widest py-4 ${a.bg} text-[#070710] hover:scale-105 transition-transform duration-300 ${
                    t.highlight ? "animate-btn-flash-pink" : ""
                  }`}
                >
                  ENQUIRE NOW
                </a>
              </motion.div>
            );
          })}
        </div>


        {/* Food add-on highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 max-w-3xl mx-auto border-2 border-neon-yellow bg-neon-yellow/5 px-6 py-5 text-center"
          style={{ boxShadow: "0 0 30px rgba(255,235,0,0.15)" }}
        >
          <p className="font-display text-[10px] tracking-[0.3em] text-neon-yellow/80 mb-2">
            ★ HOT FOOD INCLUDED IN EVERY PACKAGE ★
          </p>
          <p className="font-body text-white/85 text-sm md:text-base">
            Every child gets a{" "}
            <span className="font-display text-neon-yellow text-base md:text-lg tracking-wider"
                  style={{ textShadow: "0 0 12px rgba(255,235,0,0.7)" }}>
              hot meal — nuggets, chips & a drink
            </span>
            , with a small toy tucked inside. Classic & Ultimate also include an extra snack and drink.
          </p>
        </motion.div>

        {/* Info footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 max-w-3xl mx-auto border border-white/10 bg-[#0a0a16]/60 p-6 md:p-7"
        >
          <div className="flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-neon-pink shrink-0 mt-1" />
            <div className="space-y-2">
              <p className="font-display text-[10px] tracking-[0.3em] text-neon-pink/80">
                HOW IT WORKS
              </p>
              <ul className="font-body text-white/60 text-xs md:text-sm space-y-1.5 list-disc list-inside marker:text-white/30">
                <li>Minimum <span className="text-white/80">8 children</span> per party booking.</li>
                <li>Credits load straight onto each child's LuxPlay card.</li>
                
                <li>To book, message us via the contact details in the footer with your preferred date.</li>
              </ul>
            </div>
          </div>
        </motion.div>

        <p className="text-center font-display text-xs tracking-[0.3em] text-white/30 mt-8 flex items-center justify-center gap-2">
          <Cake className="w-3 h-3" />
          MAKE IT UNFORGETTABLE
          <Gift className="w-3 h-3" />
        </p>
      </div>
    </section>
  );
};

export default PartiesSection;
