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
    <section className="relative bg-background py-16 md:py-24">
      {/* Header */}
      <div className="px-6 max-w-md mx-auto text-center mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter leading-[0.92]"
        >
          <span className="text-neon-pink">ONE</span>{" "}
          <span className="text-neon-cyan">VENUE.</span>
          <br />
          <span className="text-neon-green">ENDLESS</span>{" "}
          <span className="animate-fun-bubble inline-block rounded-full px-5 pb-1 text-ink align-middle">
            FUN!
          </span>
        </motion.h2>

        <p className="mt-4 font-body text-base sm:text-lg font-bold tracking-wide text-neon-cyan">
          Sovereign Centre · Boscombe
        </p>
      </div>

      {/* Grid */}
      <div className="px-6 max-w-md mx-auto flex flex-col gap-6">
        {venues.map((v, i) => (
          <motion.div
            key={v.altLabel}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl"
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
              className={`absolute bottom-3 left-3 ${v.bg} text-ink font-display text-2xl sm:text-3xl tracking-tight px-5 py-1.5 rounded-full`}
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
