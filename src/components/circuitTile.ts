/**
 * Neon circuit board pattern — orthogonal traces with rounded bends,
 * solder pads and vias. Designed to tile seamlessly and to read as
 * "PCB / arcade tech" while remaining tidy.
 */

const TILE = 400;

// Each trace: a polyline path (M ... L ...) plus colour + glow strength.
// Coordinates are picked to (a) connect at tile edges so the pattern
// is seamless and (b) leave a calm centre where text/imagery sits.
const TRACES: { d: string; stroke: string; opacity: number; width: number }[] = [
  // Cyan horizontal trace top — enters left, bends down, runs along, exits right
  { d: "M 0 60 L 80 60 Q 90 60 90 70 L 90 110 Q 90 120 100 120 L 280 120 Q 290 120 290 110 L 290 70 Q 290 60 300 60 L 400 60", stroke: "%2300e5ff", opacity: 0.55, width: 1.2 },
  // Purple vertical trace left
  { d: "M 40 0 L 40 150 Q 40 160 50 160 L 130 160 Q 140 160 140 170 L 140 400", stroke: "%237c4dff", opacity: 0.5, width: 1.1 },
  // Green diagonal-ish trace bottom-right
  { d: "M 400 260 L 320 260 Q 310 260 310 270 L 310 330 Q 310 340 300 340 L 200 340 Q 190 340 190 350 L 190 400", stroke: "%2339ff14", opacity: 0.45, width: 1.0 },
  // Pink short connector
  { d: "M 0 320 L 70 320 Q 80 320 80 310 L 80 260", stroke: "%23ff2bd6", opacity: 0.4, width: 0.9 },
  // Cyan vertical right
  { d: "M 360 0 L 360 90 Q 360 100 350 100 L 240 100", stroke: "%2300e5ff", opacity: 0.4, width: 1.0 },
  // Purple bottom horizontal
  { d: "M 0 380 L 110 380 Q 120 380 120 370 L 120 340", stroke: "%237c4dff", opacity: 0.4, width: 1.0 },
];

// Solder pads / vias placed at trace endpoints + a few junctions.
const PADS: { cx: number; cy: number; fill: string; opacity: number; r: number }[] = [
  { cx: 90, cy: 70, fill: "%2300e5ff", opacity: 0.7, r: 3 },
  { cx: 290, cy: 110, fill: "%2300e5ff", opacity: 0.7, r: 3 },
  { cx: 140, cy: 170, fill: "%237c4dff", opacity: 0.7, r: 3 },
  { cx: 310, cy: 270, fill: "%2339ff14", opacity: 0.7, r: 3 },
  { cx: 190, cy: 350, fill: "%2339ff14", opacity: 0.7, r: 3 },
  { cx: 80, cy: 310, fill: "%23ff2bd6", opacity: 0.7, r: 2.5 },
  { cx: 240, cy: 100, fill: "%2300e5ff", opacity: 0.6, r: 2.5 },
  { cx: 120, cy: 370, fill: "%237c4dff", opacity: 0.6, r: 2.5 },
];

const buildCircuitSvg = () => {
  const traceEls = TRACES.map(
    (t) =>
      `<path d='${t.d}' fill='none' stroke='${t.stroke}' stroke-width='${t.width}' stroke-opacity='${t.opacity}' stroke-linecap='round' stroke-linejoin='round'/>`,
  ).join("");

  // Glow halo: a wider, softer copy of each trace under the bright one.
  const glowEls = TRACES.map(
    (t) =>
      `<path d='${t.d}' fill='none' stroke='${t.stroke}' stroke-width='${t.width * 3}' stroke-opacity='${t.opacity * 0.25}' stroke-linecap='round' stroke-linejoin='round'/>`,
  ).join("");

  const padEls = PADS.map(
    (p) =>
      // outer glow ring
      `<circle cx='${p.cx}' cy='${p.cy}' r='${p.r * 2}' fill='${p.fill}' fill-opacity='${p.opacity * 0.25}'/>` +
      // bright pad
      `<circle cx='${p.cx}' cy='${p.cy}' r='${p.r}' fill='${p.fill}' fill-opacity='${p.opacity}'/>` +
      // dark via centre
      `<circle cx='${p.cx}' cy='${p.cy}' r='${p.r * 0.4}' fill='%23070710'/>`,
  ).join("");

  return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${TILE} ${TILE}'>${glowEls}${traceEls}${padEls}</svg>`;
};

const encoded = encodeURIComponent(buildCircuitSvg())
  .replace(/'/g, "%27")
  .replace(/"/g, "%22");

export const gridBackgroundUrl = `url("data:image/svg+xml;charset=utf-8,${encoded}")`;

// Backwards-compat export name in case anything still imports it.
export const circuitTileUrl = (_opacity = 1) => gridBackgroundUrl;
