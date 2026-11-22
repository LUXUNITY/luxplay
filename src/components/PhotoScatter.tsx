import slide from "@/assets/gallery-softplay-slide.jpg.asset.json";
import baby from "@/assets/gallery-baby-softplay-area.jpg.asset.json";
import view from "@/assets/gallery-softplay-cafe-view.jpg.asset.json";
import floor from "@/assets/gallery-arcade-floor.jpg.asset.json";
import games from "@/assets/gallery-arcade-games.jpg.asset.json";
import choc from "@/assets/gallery-cafe-hot-chocolate.jpg.asset.json";
import shakes from "@/assets/gallery-cafe-milkshakes.jpg.asset.json";

const photos = [
  { src: slide.url, alt: "Big soft play frame with red tube slide", cap: "Whoosh! 🛝", tilt: "-rotate-3", frame: "border-neon-pink", wide: true },
  { src: baby.url, alt: "Baby and toddler soft play area", cap: "Tiny tots 🍼", tilt: "rotate-3", frame: "border-neon-green" },
  { src: choc.url, alt: "Café Lux hot chocolate with cream and marshmallows", cap: "Cosy cocoa ☕", tilt: "-rotate-2", frame: "border-neon-cyan", tall: true },
  { src: floor.url, alt: "LuxPlay arcade floor full of games", cap: "60+ games 🕹️", tilt: "rotate-2", frame: "border-neon-purple", wide: true },
  { src: shakes.url, alt: "Three Café Lux milkshakes topped with cream", cap: "Shake it up! 🥤", tilt: "rotate-3", frame: "border-neon-pink" },
  { src: view.url, alt: "Soft play beside café seating", cap: "Grown-ups relax 💚", tilt: "-rotate-2", frame: "border-neon-green" },
  { src: games.url, alt: "Coin pushers and claw machines in the arcade", cap: "Win prizes! 🎁", tilt: "rotate-2", frame: "border-neon-cyan" },
];

export default function PhotoScatter() {
  return (
    <section aria-label="Photos from inside LuxPlay" className="mx-auto mt-10 max-w-3xl px-5">
      <h2 className="font-display text-3xl leading-none text-neon-cyan">PEEK INSIDE! 👀</h2>
      <p className="mt-2 font-body text-xs font-bold text-muted-foreground">Real photos from our Boscombe venue</p>
      <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3" style={{ gridAutoFlow: "dense" }}>
        {photos.map((p, i) => (
          <figure key={p.src} className={`photo-snap ${p.tilt} ${p.wide ? "col-span-2" : ""} ${p.tall ? "row-span-2" : ""} rounded-xl border-4 ${p.frame} bg-card p-1.5 pb-2 shadow-lg`} style={{ animationDelay: `${i * 0.4}s` }}>
            <img src={p.src} alt={p.alt} loading="lazy" className={`w-full rounded-lg object-cover ${p.tall ? "h-[calc(100%-1.75rem)] min-h-56" : "aspect-[4/3]"}`} />
            <figcaption className="mt-1.5 font-body text-xs font-black text-foreground">{p.cap}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
