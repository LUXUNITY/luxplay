/**
 * Hand-drawn neon circuit decor.
 * Styled after the reference: glowing PCB traces flowing in from
 * the edges with terminator dots, plus tiny star specks across
 * the dark center. Drawn entirely as SVG paths (no images).
 *
 * Variants:
 *   - "section": large background traces flowing from all four edges,
 *                with a clear dark center for content.
 *   - "frame":   tighter traces wrapping around a small element
 *                (used behind team portraits).
 */
type Props = {
  className?: string;
  variant?: "section" | "frame";
  opacity?: number;
};

const CircuitDecor = ({ className, variant = "section", opacity = 1 }: Props) => {
  const isSection = variant === "section";

  return (
    <svg
      viewBox="0 0 400 600"
      preserveAspectRatio={isSection ? "xMidYMid slice" : "xMidYMid meet"}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      style={{ opacity }}
    >
      <defs>
        <filter id="cd-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.4" result="b1" />
          <feGaussianBlur stdDeviation="3" result="b2" />
          <feMerge>
            <feMergeNode in="b2" />
            <feMergeNode in="b1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Soft star specks pattern */}
        <pattern id="cd-stars" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <circle cx="12" cy="18" r="0.6" fill="#ffffff" opacity="0.5" />
          <circle cx="55" cy="9" r="0.4" fill="#bde0ff" opacity="0.45" />
          <circle cx="34" cy="44" r="0.5" fill="#ffffff" opacity="0.4" />
          <circle cx="68" cy="60" r="0.4" fill="#caffd6" opacity="0.45" />
          <circle cx="20" cy="70" r="0.55" fill="#ffffff" opacity="0.5" />
          <circle cx="46" cy="28" r="0.35" fill="#ffd3f6" opacity="0.4" />
        </pattern>
      </defs>

      {/* Star specks across the whole canvas */}
      <rect width="400" height="600" fill="url(#cd-stars)" />

      <g
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#cd-glow)"
      >
        {/* ─── LEFT EDGE: green → yellow-green traces flowing in & down ─── */}
        <g stroke="#39ff14" strokeWidth="1.6">
          <path d="M 8 0 L 8 70 L 30 92 L 30 160 L 14 176 L 14 250 L 38 274 L 38 360 L 18 380 L 18 470 L 44 496 L 44 600" />
          <path d="M 28 0 L 28 50 L 50 72 L 50 130" />
          <path d="M 0 110 L 22 110 L 42 130 L 42 220" />
          <path d="M 0 320 L 26 320 L 26 360" />
        </g>
        <g fill="#39ff14">
          <circle cx="8" cy="0" r="2.4" />
          <circle cx="30" cy="92" r="2" />
          <circle cx="14" cy="250" r="2" />
          <circle cx="50" cy="130" r="2" />
          <circle cx="42" cy="220" r="2" />
          <circle cx="44" cy="600" r="2.4" />
          <circle cx="26" cy="360" r="1.8" />
        </g>

        <g stroke="#caff33" strokeWidth="1.2">
          <path d="M 18 30 L 18 88 L 38 108" />
          <path d="M 0 200 L 18 200 L 38 220" />
          <path d="M 22 410 L 22 450 L 46 470" />
        </g>
        <g fill="#caff33">
          <circle cx="38" cy="108" r="1.6" />
          <circle cx="38" cy="220" r="1.6" />
          <circle cx="46" cy="470" r="1.6" />
        </g>

        {/* ─── BOTTOM-LEFT: cyan band sweeping right ─── */}
        <g stroke="#00e5ff" strokeWidth="1.4">
          <path d="M 0 540 L 100 540 L 130 568 L 240 568" />
          <path d="M 0 562 L 80 562 L 110 584 L 200 584 L 220 568 L 320 568" />
          <path d="M 60 600 L 140 600 L 170 580 L 260 580" />
        </g>
        <g fill="#00e5ff">
          <circle cx="100" cy="540" r="1.8" />
          <circle cx="130" cy="568" r="1.8" />
          <circle cx="220" cy="568" r="1.8" />
          <circle cx="170" cy="580" r="1.6" />
        </g>

        {/* ─── RIGHT EDGE: blue → purple traces flowing in & down ─── */}
        <g stroke="#7c4dff" strokeWidth="1.6">
          <path d="M 392 0 L 392 80 L 368 104 L 368 170 L 386 188 L 386 260 L 360 286 L 360 370 L 384 392 L 384 480 L 356 506 L 356 600" />
          <path d="M 372 0 L 372 56 L 350 78 L 350 140" />
          <path d="M 400 130 L 376 130 L 356 150 L 356 230" />
          <path d="M 400 340 L 372 340 L 372 380" />
        </g>
        <g fill="#7c4dff">
          <circle cx="392" cy="0" r="2.4" />
          <circle cx="368" cy="104" r="2" />
          <circle cx="386" cy="260" r="2" />
          <circle cx="350" cy="140" r="2" />
          <circle cx="356" cy="230" r="2" />
          <circle cx="356" cy="600" r="2.4" />
          <circle cx="372" cy="380" r="1.8" />
        </g>

        {/* ─── TOP-RIGHT: pink/magenta traces ─── */}
        <g stroke="#ff2bd6" strokeWidth="1.4">
          <path d="M 340 0 L 340 50 L 318 72 L 318 130" />
          <path d="M 380 30 L 380 90" />
          <path d="M 360 420 L 360 480 L 336 504" />
        </g>
        <g fill="#ff2bd6">
          <circle cx="340" cy="0" r="2" />
          <circle cx="318" cy="130" r="1.8" />
          <circle cx="380" cy="90" r="1.8" />
          <circle cx="336" cy="504" r="1.8" />
        </g>

        {/* ─── BOTTOM-RIGHT: pink band ─── */}
        <g stroke="#ff44a8" strokeWidth="1.3">
          <path d="M 400 552 L 320 552 L 290 580 L 200 580" />
          <path d="M 400 588 L 340 588 L 310 600" />
        </g>
        <g fill="#ff44a8">
          <circle cx="320" cy="552" r="1.8" />
          <circle cx="290" cy="580" r="1.8" />
        </g>
      </g>
    </svg>
  );
};

export default CircuitDecor;
