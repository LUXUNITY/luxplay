import { motion } from "framer-motion";

type Tier = {
  name: string;
  price: number;
  accent: "cyan" | "pink" | "green";
  highlight?: boolean;
  perks: string[];
  emojis: string[];
};

const TIERS: Tier[] = [
  {
    name: "STARTER",
    price: 19.99,
    accent: "cyan",
    emojis: ["🕹️", "🍟", "🧸"],
    perks: [
      "2hrs soft play + £10 credits",
      "Hot meal & drink",
      "Adults go free",
    ],
  },
  {
    name: "CLASSIC",
    price: 24.99,
    accent: "pink",
    highlight: true,
    emojis: ["🎮", "🍕", "🥤"],
    perks: [
      "2hrs soft play + £15 credits",
      "Hot meal + extra snack",
      "Adults go free",
    ],
  },
  {
    name: "ULTIMATE",
    price: 29.99,
    accent: "green",
    emojis: ["🏆", "🎂", "🎁"],
    perks: [
      "2hrs soft play + £20 credits",
      "Hot meal + snack",
      "Cake OR gift included",
    ],
  },
];

const accentMap = {
  cyan: { bg: "bg-neon-cyan", shadow: "#0089B3" },
  pink: { bg: "bg-neon-pink", shadow: "#C22B72" },
  green: { bg: "bg-neon-green", shadow: "#C9AC1F" },
} as const;

const PartiesSection = () => {
  return (
    <section id="parties" className="relative bg-white">
      <div className="relative z-10 px-4 py-16 md:py-20 max-w-md mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-2"
        >
          <span className="inline-block bg-neon-pink text-foreground font-display font-extrabold text-xs uppercase px-5 py-2 rounded-full">
            🎉 Birthday Parties
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display font-extrabold text-4xl tracking-tighter text-foreground text-center mt-4 mb-2"
        >
          Party Packages
        </motion.h2>

        <p className="text-center font-body text-foreground/60 text-sm mb-8">
          Per child · adults go free
        </p>

        {/* Tiers */}
        <div className="flex flex-col gap-5">
          {TIERS.map((t, i) => {
            const a = accentMap[t.accent];
            return (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-3xl bg-white border-2 border-foreground/10 p-6 flex flex-col ${
                  t.highlight ? "scale-[1.03]" : ""
                }`}
                style={{ boxShadow: `0 8px 0 0 ${a.shadow}` }}
              >
                {t.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-foreground text-white font-display font-extrabold text-[10px] tracking-wide px-4 py-1 rounded-full whitespace-nowrap">
                    ⭐ MOST POPULAR
                  </span>
                )}

                <div className="flex items-center justify-between mb-3">
                  <p className="font-display font-extrabold text-lg tracking-tighter text-foreground">
                    {t.name}
                  </p>
                  <span className="font-display font-extrabold text-3xl text-foreground">
                    £{t.price.toFixed(2)}
                  </span>
                </div>

                <div className="flex gap-2 mb-4">
                  {t.emojis.map((e, idx) => (
                    <span
                      key={idx}
                      className={`w-11 h-11 rounded-full ${a.bg} flex items-center justify-center text-xl`}
                    >
                      {e}
                    </span>
                  ))}
                </div>

                <ul className="space-y-1.5 mb-6">
                  {t.perks.map((p) => (
                    <li key={p} className="font-body text-sm text-foreground/70">
                      • {p}
                    </li>
                  ))}
                </ul>

                <a
                  href={`mailto:luxplayuk@gmail.com?subject=${encodeURIComponent(
                    `Party Enquiry — ${t.name} Package (£${t.price.toFixed(2)}/child)`
                  )}&body=${encodeURIComponent(
                    `Hi LuxPlay,\n\nI'd like to enquire about the ${t.name} party package (£${t.price.toFixed(2)} per child).\n\nPreferred date:\nNumber of children:\nChild's name & age:\nContact number:\n\nThanks!`
                  )}`}
                  className={`block text-center rounded-full font-display font-extrabold text-sm tracking-wide py-3.5 ${a.bg} text-foreground active:translate-y-1 transition-transform`}
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
          className="mt-8 rounded-3xl bg-neon-green px-5 py-5 text-center"
          style={{ boxShadow: "0 8px 0 0 #C9AC1F" }}
        >
          <p className="font-body text-foreground text-sm">
            🍟 Hot meal included in every package
          </p>
        </motion.div>

        {/* Info footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-5 rounded-3xl bg-muted p-5"
        >
          <p className="font-display font-extrabold text-xs tracking-wide text-foreground mb-2">
            HOW IT WORKS
          </p>
          <ul className="font-body text-foreground/60 text-xs space-y-1.5">
            <li>• Min 8 children per booking</li>
            <li>• Credits load to each child's card</li>
            <li>• Message us via the footer to book</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default PartiesSection;
