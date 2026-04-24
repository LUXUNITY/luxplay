/**
 * Clean, tasteful neon background pattern.
 *
 * Two layers:
 *  1. A soft neon grid (very subtle thin lines, fading toward center)
 *  2. Soft aurora-style color glows in the brand palette
 *
 * Far calmer than circuit traces — designed to recede behind content.
 */

const TILE = 600;

const buildGridSvg = (opacity = 1) => `
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${TILE} ${TILE}'>
  <defs>
    <pattern id='grid' x='0' y='0' width='60' height='60' patternUnits='userSpaceOnUse'>
      <path d='M 60 0 L 0 0 0 60' fill='none' stroke='%23ffffff' stroke-width='0.5' stroke-opacity='0.18'/>
    </pattern>
    <pattern id='gridMajor' x='0' y='0' width='240' height='240' patternUnits='userSpaceOnUse'>
      <path d='M 240 0 L 0 0 0 240' fill='none' stroke='%237c4dff' stroke-width='0.6' stroke-opacity='0.35'/>
    </pattern>
  </defs>
  <g opacity='${opacity}'>
    <rect width='${TILE}' height='${TILE}' fill='url(%23grid)'/>
    <rect width='${TILE}' height='${TILE}' fill='url(%23gridMajor)'/>
  </g>
</svg>`.replace(/\n/g, "").replace(/\s{2,}/g, " ");

export const circuitTileUrl = (opacity = 1) =>
  `url("data:image/svg+xml;utf8,${buildGridSvg(opacity)}")`;
