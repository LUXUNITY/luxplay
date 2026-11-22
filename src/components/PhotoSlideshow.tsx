import { useEffect, useState } from "react";
import softplay from "@/assets/real-softplay-v2.png.asset.json";
import slide from "@/assets/gallery-softplay-slide.jpg.asset.json";
import baby from "@/assets/gallery-baby-softplay-area.jpg.asset.json";
import view from "@/assets/gallery-softplay-cafe-view.jpg.asset.json";
import floor from "@/assets/gallery-arcade-floor.jpg.asset.json";
import games from "@/assets/gallery-arcade-games.jpg.asset.json";
import choc from "@/assets/gallery-cafe-hot-chocolate.jpg.asset.json";
import shakes from "@/assets/gallery-cafe-milkshakes.jpg.asset.json";
import prizes from "@/assets/gallery-prize-shop.jpg.asset.json";
import carousel from "@/assets/gallery-coin-carousel.jpg.asset.json";
import climb from "@/assets/gallery-softplay-climbing-frame.jpg.asset.json";
import pusher from "@/assets/gallery-coin-pusher-prizes.jpg.asset.json";

const photos: { src: string; cap: string; pos?: string }[] = [
  { src: slide.url, cap: "Whoosh! 🛝 3-level soft play" },
  { src: floor.url, cap: "60+ arcade games 🕹️" },
  { src: baby.url, cap: "Baby soft play 🍼" },
  { src: prizes.url, cap: "Win amazing prizes 🎁" },
  { src: choc.url, cap: "Cosy hot chocolate ☕" },
  { src: softplay.url, cap: "Climb, slide & explore 🏰" },
  { src: climb.url, cap: "Climb to the top! 🧗", pos: "object-bottom" },
  { src: shakes.url, cap: "Shake it up! 🥤" },
  { src: carousel.url, cap: "Coin pusher fun 🪙" },
  { src: view.url, cap: "Grown-ups relax nearby 💚" },
  { src: pusher.url, cap: "Push for prizes! 🦆" },
  { src: games.url, cap: "Games in every corner 🎮" },
];

export default function PhotoSlideshow() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI(n => (n + 1) % photos.length), 2800);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative mx-3 mt-3 aspect-[4/3] overflow-hidden rounded-2xl border-4 border-neon-pink sm:aspect-[16/9]" aria-roledescription="carousel" aria-label="Inside LuxPlay">
      {photos.map((p, n) => (
        <img key={p.src} src={p.src} alt={p.cap} loading={n < 2 ? "eager" : "lazy"}
          className={`absolute inset-0 h-full w-full object-cover ${p.pos ?? ""} transition-opacity duration-1000 ${n === i ? "opacity-100" : "opacity-0"}`} />
      ))}
      <p className="absolute left-1/2 top-3 -translate-x-1/2 whitespace-nowrap rounded-full bg-background/85 px-4 py-1.5 font-body text-xs font-black text-foreground" aria-live="polite">{photos[i].cap}</p>
      <div className="absolute bottom-14 left-0 right-0 flex justify-center gap-1.5" aria-hidden="true">
        {photos.map((_, n) => <span key={n} className={`h-1.5 rounded-full transition-all ${n === i ? "w-5 bg-neon-cyan" : "w-1.5 bg-foreground/60"}`} />)}
      </div>
    </div>
  );
}
