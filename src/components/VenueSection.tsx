import { motion } from "framer-motion";
import arcadeAsset from "@/assets/real-arcade.jpeg.asset.json";
import softplayAsset from "@/assets/real-softplay-v2.png.asset.json";
import babySoftplayAsset from "@/assets/real-baby-softplay.png.asset.json";
import prizeAsset from "@/assets/real-prize-redemption.jpg.asset.json";

const venues = [
  { img: arcadeAsset.url, label: "ARCADE ZONE", color: "text-neon-green", comingSoon: false },
  { img: softplayAsset.url, label: "SOFT PLAY", color: "text-neon-cyan", comingSoon: false },
  { img: babySoftplayAsset.url, label: "BABY SOFT PLAY", color: "text-neon-pink", comingSoon: false },
  { img: prizeAsset.url, label: "PRIZE REDEMPTION", color: "text-neon-pink", comingSoon: false },
  { img: null, label: "CAFÉ", color: "text-neon-purple", comingSoon: true },
];

const VenueSection = () => {
  return (
    <section className="relative">
      {/* Header */}
      <div className="px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wider text-center"
        >
          <span className="text-white">ONE VENUE. </span>
          <span className="text-gradient-neon">ENDLESS FUN.</span>
        </motion.h2>
        <p className="mt-6 text-center font-body text-sm md:text-base tracking-widest text-white/40 uppercase">
          Unit 7, Sovereign Centre · Boscombe · Bournemouth · BH1 4SX
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {venues.map((v, i) => (
          <motion.div
            key={v.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative aspect-[16/10] overflow-hidden group bg-[#070710]"
          >
            {v.img && (
              <img
                src={v.img}
                alt={v.label}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            )}
            <div className="absolute inset-0 bg-[#070710]/50 group-hover:bg-[#070710]/40 transition-colors duration-500" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <h3 className={`font-display text-4xl md:text-5xl lg:text-6xl tracking-wider ${v.color} drop-shadow-[0_0_20px_currentColor] text-center px-4`}>
                {v.label}
              </h3>
              {v.comingSoon && (
                <span className="font-display text-sm md:text-base tracking-[0.3em] text-white/70 border border-white/30 px-4 py-1.5">
                  COMING SOON
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default VenueSection;
