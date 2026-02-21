import { motion } from "framer-motion";
import venueArcade from "@/assets/venue-arcade.jpg";
import venueMinigolf from "@/assets/venue-minigolf.jpg";
import venuePrizes from "@/assets/venue-prizes.jpg";
import venueCafe from "@/assets/venue-cafe.jpg";

const venues = [
  {
    img: venueArcade,
    label: "Arcade Zone",
    sub: "40+ machines and counting. Racing, shooting, classics, claw machines — and more arriving every month.",
    color: "text-neon-green",
  },
  {
    img: venueMinigolf,
    label: "Mini Golf",
    sub: "9 holes of countryside-themed fun. Perfect for families, dates, and groups.",
    color: "text-neon-cyan",
  },
  {
    img: venuePrizes,
    label: "Prize Redemption",
    sub: "Play. Win. Collect. Redeem your tickets for toys, tech and more.",
    color: "text-neon-pink",
  },
  {
    img: venueCafe,
    label: "Café & Refreshments",
    sub: "Fuel up between games. Hot drinks, snacks, and meals for the whole family.",
    color: "text-neon-yellow",
  },
];

const VenueSection = () => {
  return (
    <section className="relative">
      {/* Section header */}
      <div className="px-6 md:px-12 lg:px-20 pt-16 md:pt-24 pb-8 md:pb-12">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-[10px] md:text-xs tracking-[0.3em] text-neon-cyan uppercase mb-3"
        >
          What's Inside
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-5xl lg:text-6xl font-black uppercase leading-[0.9]"
        >
          <span className="text-foreground">One Venue.</span>{" "}
          <span className="text-gradient-rainbow">Endless Fun.</span>
        </motion.h2>
      </div>

      {/* Two large cinematic horizontal splits — NOT 4 equal tiles */}
      {venues.map((v, i) => {
        const isEven = i % 2 === 0;
        return (
          <motion.div
            key={v.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className={`relative flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
          >
            {/* Image — takes 60% on desktop, full on mobile */}
            <div className="relative w-full md:w-[60%] aspect-[16/9] md:aspect-auto md:min-h-[400px] lg:min-h-[500px] overflow-hidden">
              <img
                src={v.img}
                alt={v.label}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              {/* Subtle gradient toward text side */}
              <div className={`absolute inset-0 ${
                isEven
                  ? "bg-gradient-to-r from-transparent via-transparent to-background/60"
                  : "bg-gradient-to-l from-transparent via-transparent to-background/60"
              }`} />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent md:hidden" />
            </div>

            {/* Text — takes 40% on desktop */}
            <div className={`relative w-full md:w-[40%] flex items-center bg-background ${
              isEven ? "md:pl-0" : "md:pr-0"
            }`}>
              <div className="px-6 md:px-10 lg:px-14 py-8 md:py-0">
                <p className={`font-display text-xs md:text-sm uppercase font-bold tracking-[0.2em] ${v.color}`}>
                  {v.label}
                </p>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed mt-3 max-w-md">
                  {v.sub}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </section>
  );
};

export default VenueSection;
