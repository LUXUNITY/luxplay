/**
 * Hand-drawn SVG circuit/PCB pattern.
 * Uses neon brand colors (cyan, purple, pink, green) drawn as
 * orthogonal traces with terminator dots — same vibe as the
 * uploaded reference image but rendered in code.
 */
type Props = {
  className?: string;
  /** 0 - 1 */
  opacity?: number;
  /** "left" draws traces flowing in from the left edge, "right" mirrors */
  side?: "left" | "right" | "full";
};

const CircuitPattern = ({ className, opacity = 0.6, side = "full" }: Props) => {
  return (
    <svg
      viewBox="0 0 200 300"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      style={{
        opacity,
        transform: side === "right" ? "scaleX(-1)" : undefined,
      }}
    >
      <defs>
        <filter id="cp-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="0.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g
        fill="none"
        strokeWidth="0.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#cp-glow)"
      >
        {/* GREEN traces — top-left flowing down */}
        <g stroke="#00ff88">
          <path d="M 5 10 L 5 60 L 25 80 L 25 130 L 10 145 L 10 200 L 30 220 L 30 280" />
          <path d="M 18 5 L 18 40 L 38 60 L 38 110" />
          <path d="M 2 90 L 2 170 L 22 190" />
          <circle cx="5" cy="10" r="1.4" fill="#00ff88" />
          <circle cx="25" cy="80" r="1.2" fill="#00ff88" />
          <circle cx="10" cy="200" r="1.2" fill="#00ff88" />
          <circle cx="38" cy="110" r="1.2" fill="#00ff88" />
          <circle cx="30" cy="280" r="1.4" fill="#00ff88" />
        </g>

        {/* YELLOW-GREEN accents */}
        <g stroke="#caff33">
          <path d="M 12 50 L 12 75 L 32 95" />
          <path d="M 8 230 L 28 250" />
          <circle cx="32" cy="95" r="1" fill="#caff33" />
          <circle cx="28" cy="250" r="1" fill="#caff33" />
        </g>

        {/* CYAN traces — bottom band */}
        <g stroke="#00e5ff">
          <path d="M 5 260 L 60 260 L 80 280 L 140 280" />
          <path d="M 0 245 L 70 245 L 90 265 L 200 265" />
          <path d="M 40 290 L 100 290 L 120 275 L 180 275" />
          <circle cx="60" cy="260" r="1.2" fill="#00e5ff" />
          <circle cx="90" cy="265" r="1.2" fill="#00e5ff" />
          <circle cx="120" cy="275" r="1.2" fill="#00e5ff" />
        </g>

        {/* PURPLE-BLUE traces — right side */}
        <g stroke="#7c4dff">
          <path d="M 195 20 L 195 70 L 175 90 L 175 140 L 190 155 L 190 210" />
          <path d="M 180 5 L 180 50 L 160 70 L 160 120" />
          <path d="M 198 100 L 198 180 L 178 200" />
          <circle cx="195" cy="20" r="1.4" fill="#7c4dff" />
          <circle cx="175" cy="90" r="1.2" fill="#7c4dff" />
          <circle cx="160" cy="120" r="1.2" fill="#7c4dff" />
          <circle cx="190" cy="210" r="1.2" fill="#7c4dff" />
        </g>

        {/* PINK/MAGENTA traces — top-right */}
        <g stroke="#ff2bd6">
          <path d="M 165 15 L 165 45 L 145 65 L 145 95" />
          <path d="M 188 35 L 188 80" />
          <path d="M 170 220 L 170 260 L 150 280" />
          <circle cx="165" cy="15" r="1.4" fill="#ff2bd6" />
          <circle cx="145" cy="95" r="1.2" fill="#ff2bd6" />
          <circle cx="188" cy="80" r="1.2" fill="#ff2bd6" />
          <circle cx="150" cy="280" r="1.2" fill="#ff2bd6" />
        </g>

        {/* Faint star dots in background */}
        <g fill="#ffffff" opacity="0.35">
          <circle cx="55" cy="30" r="0.4" />
          <circle cx="80" cy="55" r="0.3" />
          <circle cx="110" cy="40" r="0.4" />
          <circle cx="135" cy="25" r="0.3" />
          <circle cx="60" cy="120" r="0.3" />
          <circle cx="100" cy="150" r="0.4" />
          <circle cx="130" cy="180" r="0.3" />
          <circle cx="75" cy="200" r="0.4" />
          <circle cx="115" cy="225" r="0.3" />
          <circle cx="50" cy="170" r="0.3" />
          <circle cx="160" cy="160" r="0.4" />
          <circle cx="90" cy="90" r="0.3" />
        </g>
      </g>
    </svg>
  );
};

export default CircuitPattern;
