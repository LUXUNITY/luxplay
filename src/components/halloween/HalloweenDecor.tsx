// Lightweight CSS-only floating bats & ghosts across the whole site (Halloween theme)
const ITEMS = [
  { e: "🦇", left: "6%", top: "12%", d: "0s", s: "text-2xl" },
  { e: "👻", left: "88%", top: "22%", d: "1.5s", s: "text-3xl" },
  { e: "🦇", left: "78%", top: "55%", d: "3s", s: "text-xl" },
  { e: "🕸️", left: "2%", top: "70%", d: "0.8s", s: "text-3xl" },
  { e: "🦇", left: "45%", top: "85%", d: "2.2s", s: "text-lg" },
];

const HalloweenDecor = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
    {ITEMS.map((it, i) => (
      <span
        key={i}
        className={`absolute opacity-60 animate-spooky-float ${it.s}`}
        style={{ left: it.left, top: it.top, animationDelay: it.d }}
      >
        {it.e}
      </span>
    ))}
  </div>
);

export default HalloweenDecor;
