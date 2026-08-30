import { motion } from "framer-motion";
import arcadeAsset from "@/assets/real-arcade.jpeg.asset.json";
import softplayAsset from "@/assets/real-softplay-v2.png.asset.json";
import babySoftplayAsset from "@/assets/real-baby-softplay.png.asset.json";
import prizeAsset from "@/assets/real-prize-redemption.jpg.asset.json";
import cafeAsset from "@/assets/real-cafe.png.asset.json";

const venues = [
  { img: arcadeAsset.url, label: "ARCADE", altLabel: "ARCADE ZONE", bg: "bg-neon-green", shadow: "#24B00C" },
  { img: softplayAsset.url, label: "PLAY", altLabel: "SOFT PLAY", bg: "bg-neon-cyan", shadow: "#00A3B8" },
  { img: babySoftplayAsset.url, label: "BABIES", altLabel: "BABY SOFT PLAY", bg: "bg-neon-pink", shadow: "#B80AAA" },
  { img: prizeAsset.url, label: "PRIZES", altLabel: "PRIZE REDEMPTION", bg: "bg-neon-pink", shadow: "#B80AAA" },
  { img: cafeAsset.url, label: "CAFÉ", altLabel: "CAFÈ", bg: "bg-neon-cyan", shadow: "#00A3B8" },
];

const VenueSection = () => {
  return (
    <section className="relative bg-card py-16 md:py-24">
      {/* Header */}
      <div className="px-6 max-w-md mx-auto text-center mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-5xl font-extrabold tracking-tighter text-foreground"
        >
          ONE VENUE. ENDLESS FUN.
        </motion.h2>
        <p className="mt-3 font-body text-xs tracking-wide text-foreground/60">
          Sovereign Centre · Boscombe
        </p>
      </div>

      {/* Grid */}
      <div className="px-6 max-w-md mx-auto grid grid-cols-2 gap-4">
        {venues.map((v, i) => (
          <motion.div
            key={v.altLabel}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="relative aspect-square overflow-hidden rounded-3xl"
            style={{ boxShadow: `0 8px 0 0 ${v.shadow}` }}
          >
            {v.img && (
              <img
                src={v.img}
                alt={v.altLabel}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            )}
            <span
              className={`absolute bottom-2 left-2 ${v.bg} text-foreground font-display font-extrabold text-xs tracking-tight px-3 py-1 rounded-full`}
            >
              {v.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default VenueSection;
