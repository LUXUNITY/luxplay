import { motion } from "framer-motion";
import venueArcade from "@/assets/venue-arcade.jpg";
import venueMinigolf from "@/assets/venue-minigolf.jpg";
import venuePrizes from "@/assets/venue-prizes.jpg";
import venueCafe from "@/assets/venue-cafe.jpg";

const venues = [
  { img: venueArcade, label: "Arcade Zone", sub: "40+ machines and growing", color: "text-neon-green" },
  { img: venueMinigolf, label: "Mini Golf", sub: "9-hole neon course", color: "text-neon-cyan" },
  { img: venuePrizes, label: "Prize Redemption", sub: "Play. Win. Collect.", color: "text-neon-yellow" },
  { img: venueCafe, label: "Café & Refreshments", sub: "Fuel up between games", color: "text-neon-pink" },
];

const VenueSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
        >
          <p className="font-display text-xs tracking-[0.3em] text-neon-cyan uppercase mb-3">
            What's Inside
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-black uppercase">
            <span className="text-foreground">One Venue.</span>{" "}
            <span className="text-gradient-rainbow">Endless Fun.</span>
          </h2>
        </motion.div>

        {/* 2x2 venue grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {venues.map((v, i) => (
            <motion.div
              key={v.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative aspect-[4/3] rounded-lg overflow-hidden group"
            >
              <img
                src={v.img}
                alt={v.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <p className={`font-display text-sm md:text-base uppercase font-bold tracking-wider ${v.color}`}>
                  {v.label}
                </p>
                <p className="text-foreground/70 text-xs md:text-sm mt-1">{v.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 md:mt-14 max-w-3xl mx-auto text-center"
        >
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Bournemouth's biggest new family entertainment destination. Arcade games, mini golf, prizes and a café — <strong className="text-foreground">all under one roof. Something for everyone.</strong>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default VenueSection;
