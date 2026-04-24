/**
 * Clean neon grid background — soft glowing lines that read as
 * "tech / future / arcade" without being noisy.
 */

const TILE = 600;

const buildGridSvg = () => `
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${TILE} ${TILE}'>
  <defs>
    <pattern id='minor' x='0' y='0' width='40' height='40' patternUnits='userSpaceOnUse'>
      <path d='M 40 0 L 0 0 0 40' fill='none' stroke='%237c4dff' stroke-width='0.6' stroke-opacity='0.35'/>
    </pattern>
    <pattern id='major' x='0' y='0' width='200' height='200' patternUnits='userSpaceOnUse'>
      <path d='M 200 0 L 0 0 0 200' fill='none' stroke='%2300e5ff' stroke-width='1' stroke-opacity='0.55'/>
    </pattern>
  </defs>
  <rect width='${TILE}' height='${TILE}' fill='url(%23minor)'/>
  <rect width='${TILE}' height='${TILE}' fill='url(%23major)'/>
</svg>`.replace(/\n/g, "").replace(/\s{2,}/g, " ");

// Encode the SVG so it works reliably as a CSS data URI.
const encoded = encodeURIComponent(buildGridSvg())
  .replace(/'/g, "%27")
  .replace(/"/g, "%22");

export const gridBackgroundUrl = `url("data:image/svg+xml;charset=utf-8,${encoded}")`;

// Backwards-compat export name in case anything still imports it.
export const circuitTileUrl = (_opacity = 1) => gridBackgroundUrl;
