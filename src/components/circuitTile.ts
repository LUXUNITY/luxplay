/**
 * Tileable neon CIRCUIT BOARD pattern (PCB-style).
 *
 * - True orthogonal traces with rounded 90° corners (the way real
 *   copper traces are routed on a board).
 * - Solder pads (filled discs with darker centers = vias) at junctions.
 * - Multi-color "signal layers" (green, cyan, purple, pink) with glow.
 * - Tiles seamlessly horizontally and vertically — anchor points at
 *   x = 0/1200 and y = 0/900 line up across edges.
 */

const TILE_W = 1200;
const TILE_H = 900;

const buildTileSvg = (opacity = 1) => `
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${TILE_W} ${TILE_H}' preserveAspectRatio='xMidYMid slice'>
  <defs>
    <filter id='g' x='-20%' y='-20%' width='140%' height='140%'>
      <feGaussianBlur stdDeviation='1.2' result='b1'/>
      <feGaussianBlur stdDeviation='3.5' result='b2'/>
      <feMerge>
        <feMergeNode in='b2'/>
        <feMergeNode in='b1'/>
        <feMergeNode in='SourceGraphic'/>
      </feMerge>
    </filter>
    <radialGradient id='via' cx='50%' cy='50%' r='50%'>
      <stop offset='0%' stop-color='%23070710'/>
      <stop offset='60%' stop-color='%23070710'/>
      <stop offset='100%' stop-color='%23070710' stop-opacity='0'/>
    </radialGradient>
  </defs>

  <g opacity='${opacity}' fill='none' stroke-linecap='round' stroke-linejoin='round' filter='url(%23g)'>

    <!-- ============ LEFT EDGE — GREEN signal layer ============ -->
    <g stroke='%2339ff14' stroke-width='2'>
      <!-- Long vertical bus near left edge with stepped jogs -->
      <path d='M 40 0 L 40 120 Q 40 132 52 132 L 96 132 Q 108 132 108 144 L 108 280 Q 108 292 96 292 L 52 292 Q 40 292 40 304 L 40 460 Q 40 472 52 472 L 110 472 Q 122 472 122 484 L 122 640 Q 122 652 110 652 L 60 652 Q 48 652 48 664 L 48 900'/>
      <!-- Branch traces flowing right into the board -->
      <path d='M 40 80 L 200 80 Q 212 80 212 92 L 212 180'/>
      <path d='M 108 220 L 280 220 Q 292 220 292 232 L 292 320'/>
      <path d='M 122 560 L 320 560 Q 332 560 332 572 L 332 700'/>
      <path d='M 48 800 L 240 800'/>
    </g>
    <!-- Solder pads -->
    <g>
      <circle cx='40' cy='0' r='6' fill='%2339ff14'/>
      <circle cx='40' cy='0' r='2.5' fill='url(%23via)'/>
      <circle cx='212' cy='180' r='5' fill='%2339ff14'/>
      <circle cx='212' cy='180' r='2' fill='url(%23via)'/>
      <circle cx='292' cy='320' r='5' fill='%2339ff14'/>
      <circle cx='292' cy='320' r='2' fill='url(%23via)'/>
      <circle cx='332' cy='700' r='5' fill='%2339ff14'/>
      <circle cx='332' cy='700' r='2' fill='url(%23via)'/>
      <circle cx='240' cy='800' r='5' fill='%2339ff14'/>
      <circle cx='240' cy='800' r='2' fill='url(%23via)'/>
      <circle cx='48' cy='900' r='6' fill='%2339ff14'/>
      <circle cx='48' cy='900' r='2.5' fill='url(%23via)'/>
    </g>

    <!-- ============ LEFT EDGE — yellow-green accent layer ============ -->
    <g stroke='%23caff33' stroke-width='1.4'>
      <path d='M 70 40 L 70 100 Q 70 112 82 112 L 160 112'/>
      <path d='M 80 380 Q 80 392 92 392 L 200 392 Q 212 392 212 404 L 212 480'/>
      <path d='M 60 720 L 180 720 Q 192 720 192 732 L 192 820'/>
    </g>
    <g fill='%23caff33'>
      <circle cx='160' cy='112' r='3.5'/>
      <circle cx='212' cy='480' r='3.5'/>
      <circle cx='192' cy='820' r='3.5'/>
    </g>

    <!-- ============ RIGHT EDGE — PURPLE signal layer ============ -->
    <g stroke='%237c4dff' stroke-width='2'>
      <path d='M 1160 0 L 1160 130 Q 1160 142 1148 142 L 1100 142 Q 1088 142 1088 154 L 1088 290 Q 1088 302 1100 302 L 1148 302 Q 1160 302 1160 314 L 1160 470 Q 1160 482 1148 482 L 1090 482 Q 1078 482 1078 494 L 1078 650 Q 1078 662 1090 662 L 1140 662 Q 1152 662 1152 674 L 1152 900'/>
      <path d='M 1160 90 L 1000 90 Q 988 90 988 102 L 988 190'/>
      <path d='M 1088 230 L 920 230 Q 908 230 908 242 L 908 330'/>
      <path d='M 1078 570 L 880 570 Q 868 570 868 582 L 868 710'/>
      <path d='M 1152 810 L 960 810'/>
    </g>
    <g>
      <circle cx='1160' cy='0' r='6' fill='%237c4dff'/>
      <circle cx='1160' cy='0' r='2.5' fill='url(%23via)'/>
      <circle cx='988' cy='190' r='5' fill='%237c4dff'/>
      <circle cx='988' cy='190' r='2' fill='url(%23via)'/>
      <circle cx='908' cy='330' r='5' fill='%237c4dff'/>
      <circle cx='908' cy='330' r='2' fill='url(%23via)'/>
      <circle cx='868' cy='710' r='5' fill='%237c4dff'/>
      <circle cx='868' cy='710' r='2' fill='url(%23via)'/>
      <circle cx='960' cy='810' r='5' fill='%237c4dff'/>
      <circle cx='960' cy='810' r='2' fill='url(%23via)'/>
      <circle cx='1152' cy='900' r='6' fill='%237c4dff'/>
      <circle cx='1152' cy='900' r='2.5' fill='url(%23via)'/>
    </g>

    <!-- ============ RIGHT EDGE — pink/magenta accent layer ============ -->
    <g stroke='%23ff2bd6' stroke-width='1.4'>
      <path d='M 1130 50 L 1130 110 Q 1130 122 1118 122 L 1040 122'/>
      <path d='M 1120 390 Q 1120 402 1108 402 L 1000 402 Q 988 402 988 414 L 988 490'/>
      <path d='M 1140 730 L 1020 730 Q 1008 730 1008 742 L 1008 830'/>
    </g>
    <g fill='%23ff2bd6'>
      <circle cx='1040' cy='122' r='3.5'/>
      <circle cx='988' cy='490' r='3.5'/>
      <circle cx='1008' cy='830' r='3.5'/>
    </g>

    <!-- ============ TOP & BOTTOM — cyan horizontal buses ============ -->
    <g stroke='%2300e5ff' stroke-width='1.6'>
      <!-- Top bus -->
      <path d='M 0 28 L 360 28 Q 372 28 372 40 L 372 90'/>
      <path d='M 1200 50 L 840 50 Q 828 50 828 62 L 828 110'/>
      <!-- Bottom bus -->
      <path d='M 0 870 L 380 870 Q 392 870 392 858 L 392 800'/>
      <path d='M 1200 850 L 820 850 Q 808 850 808 838 L 808 780'/>
    </g>
    <g fill='%2300e5ff'>
      <circle cx='372' cy='90' r='3.5'/>
      <circle cx='828' cy='110' r='3.5'/>
      <circle cx='392' cy='800' r='3.5'/>
      <circle cx='808' cy='780' r='3.5'/>
    </g>

    <!-- ============ Faint star/dust specks across center ============ -->
    <g fill='%23ffffff' opacity='0.5'>
      <circle cx='420' cy='180' r='0.9'/>
      <circle cx='560' cy='240' r='0.7'/>
      <circle cx='700' cy='160' r='0.8'/>
      <circle cx='860' cy='220' r='0.7'/>
      <circle cx='480' cy='380' r='0.9'/>
      <circle cx='620' cy='460' r='0.7'/>
      <circle cx='760' cy='400' r='0.8'/>
      <circle cx='540' cy='580' r='0.9'/>
      <circle cx='680' cy='640' r='0.7'/>
      <circle cx='820' cy='560' r='0.8'/>
      <circle cx='460' cy='720' r='0.7'/>
      <circle cx='600' cy='760' r='0.9'/>
      <circle cx='740' cy='700' r='0.7'/>
    </g>
  </g>
</svg>`.replace(/\n/g, "").replace(/\s{2,}/g, " ");

export const circuitTileUrl = (opacity = 1) =>
  `url("data:image/svg+xml;utf8,${buildTileSvg(opacity)}")`;
