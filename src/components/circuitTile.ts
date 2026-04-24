/**
 * Neon circuit board pattern — orthogonal traces with rounded bends,
 * solder pads and vias. Tiles seamlessly.
 */

const TILE = 400;

type Trace = { d: string; stroke: string; opacity: number; width: number };
type Pad = { cx: number; cy: number; fill: string; opacity: number; r: number };

const TRACES: Trace[] = [
  // Cyan horizontal — top band
  { d: "M0 60 L80 60 Q90 60 90 70 L90 110 Q90 120 100 120 L280 120 Q290 120 290 110 L290 70 Q290 60 300 60 L400 60", stroke: "#00e5ff", opacity: 0.6, width: 1.4 },
  // Purple vertical-then-horizontal — left side
  { d: "M40 0 L40 150 Q40 160 50 160 L130 160 Q140 160 140 170 L140 400", stroke: "#7c4dff", opacity: 0.55, width: 1.3 },
  // Green — bottom-right routing
  { d: "M400 260 L320 260 Q310 260 310 270 L310 330 Q310 340 300 340 L200 340 Q190 340 190 350 L190 400", stroke: "#39ff14", opacity: 0.5, width: 1.2 },
  // Pink connector — bottom-left
  { d: "M0 320 L70 320 Q80 320 80 310 L80 260", stroke: "#ff2bd6", opacity: 0.5, width: 1.1 },
  // Cyan vertical — right
  { d: "M360 0 L360 90 Q360 100 350 100 L240 100", stroke: "#00e5ff", opacity: 0.45, width: 1.1 },
  // Purple — bottom strand
  { d: "M0 380 L110 380 Q120 380 120 370 L120 340", stroke: "#7c4dff", opacity: 0.45, width: 1.1 },
];

const PADS: Pad[] = [
  { cx: 90, cy: 70, fill: "#00e5ff", opacity: 0.8, r: 3.2 },
  { cx: 290, cy: 110, fill: "#00e5ff", opacity: 0.8, r: 3.2 },
  { cx: 140, cy: 170, fill: "#7c4dff", opacity: 0.8, r: 3.2 },
  { cx: 310, cy: 270, fill: "#39ff14", opacity: 0.8, r: 3.2 },
  { cx: 190, cy: 350, fill: "#39ff14", opacity: 0.8, r: 3.2 },
  { cx: 80, cy: 310, fill: "#ff2bd6", opacity: 0.8, r: 2.8 },
  { cx: 240, cy: 100, fill: "#00e5ff", opacity: 0.7, r: 2.8 },
  { cx: 120, cy: 370, fill: "#7c4dff", opacity: 0.7, r: 2.8 },
];

const buildCircuitSvg = () => {
  const glow = TRACES.map(
    (t) =>
      `<path d="${t.d}" fill="none" stroke="${t.stroke}" stroke-width="${t.width * 3.5}" stroke-opacity="${t.opacity * 0.22}" stroke-linecap="round" stroke-linejoin="round"/>`,
  ).join("");
  const lines = TRACES.map(
    (t) =>
      `<path d="${t.d}" fill="none" stroke="${t.stroke}" stroke-width="${t.width}" stroke-opacity="${t.opacity}" stroke-linecap="round" stroke-linejoin="round"/>`,
  ).join("");
  const pads = PADS.map(
    (p) =>
      `<circle cx="${p.cx}" cy="${p.cy}" r="${p.r * 2.2}" fill="${p.fill}" fill-opacity="${p.opacity * 0.22}"/>` +
      `<circle cx="${p.cx}" cy="${p.cy}" r="${p.r}" fill="${p.fill}" fill-opacity="${p.opacity}"/>` +
      `<circle cx="${p.cx}" cy="${p.cy}" r="${p.r * 0.4}" fill="#070710"/>`,
  ).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${TILE} ${TILE}" width="${TILE}" height="${TILE}">${glow}${lines}${pads}</svg>`;
};

// Use base64 — fully avoids any % / # encoding issues across browsers.
const toB64 = (str: string) => {
  if (typeof window !== "undefined" && typeof window.btoa === "function") {
    return window.btoa(str);
  }
  // SSR / build-time fallback
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const B: any = (globalThis as any).Buffer;
  return B ? B.from(str, "utf-8").toString("base64") : "";
};

export const gridBackgroundUrl = `url("data:image/svg+xml;base64,${toB64(buildCircuitSvg())}")`;

// Backwards-compat
export const circuitTileUrl = (_opacity = 1) => gridBackgroundUrl;
