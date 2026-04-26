import { motion } from "framer-motion";
import venueArcade from "@/assets/venue-arcade.webp";
import venueSoftplay from "@/assets/softplay.webp";
import venuePrizes from "@/assets/venue-prizes.webp";
import venueCafe from "@/assets/venue-cafe.webp";
import venueBabyPlay from "@/assets/baby-play.png";

const venues = [
  { img: venueArcade, label: "ARCADE ZONE", color: "text-neon-green" },
  { img: venueSoftplay, label: "SOFT PLAY", color: "text-neon-cyan" },
  { img: venuePrizes, label: "PRIZE REDEMPTION", color: "text-neon-pink" },
  { img: venueCafe, label: "CAFÉ", color: "text-neon-purple" },
  { img: venueBabyPlay, label: "BABY SOFT PLAY", color: "text-neon-pink", wide: true },
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

      {/* 2x2 grid */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {venues.map((v, i) => (
          <motion.div
            key={v.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`relative aspect-[16/10] overflow-hidden group ${v.wide ? "md:col-span-2" : ""}`}
          >
            <img
              src={v.img}
              alt={v.label}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-[#070710]/50 group-hover:bg-[#070710]/40 transition-colors duration-500" />
            {/* Label */}
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className={`font-display text-4xl md:text-5xl lg:text-6xl tracking-wider ${v.color} drop-shadow-[0_0_20px_currentColor]`}>
                {v.label}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default VenueSection;
