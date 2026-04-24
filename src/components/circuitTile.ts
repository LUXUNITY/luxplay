/**
 * Tileable neon circuit pattern, hand-drawn in SVG.
 * Used as a CSS background-image (data URI) so it tiles cleanly
 * vertically on tall mobile sections AND horizontally on wide desktops.
 *
 * The traces flow inward from the left and right edges, leaving the
 * center clear. One tile = 800w × 600h. Edges seam horizontally and
 * vertically (top/bottom anchor points line up).
 */

const buildTileSvg = (opacity = 1) => `
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600' preserveAspectRatio='xMidYMid slice'>
  <defs>
    <filter id='g' x='-30%' y='-30%' width='160%' height='160%'>
      <feGaussianBlur stdDeviation='1.2' result='b1'/>
      <feGaussianBlur stdDeviation='3' result='b2'/>
      <feMerge><feMergeNode in='b2'/><feMergeNode in='b1'/><feMergeNode in='SourceGraphic'/></feMerge>
    </filter>
  </defs>
  <g opacity='${opacity}' fill='none' stroke-linecap='round' stroke-linejoin='round' filter='url(%23g)'>

    <!-- LEFT: green/yellow-green traces flowing in from the left edge -->
    <g stroke='%2339ff14' stroke-width='1.8'>
      <path d='M 8 0 L 8 80 L 32 104 L 32 180 L 14 196 L 14 280 L 40 304 L 40 400 L 18 420 L 18 520 L 46 548 L 46 600'/>
      <path d='M 28 0 L 28 60 L 52 84 L 52 150'/>
      <path d='M 0 130 L 24 130 L 44 150 L 44 240'/>
      <path d='M 0 360 L 28 360 L 28 410'/>
    </g>
    <g fill='%2339ff14'>
      <circle cx='8' cy='0' r='2.6'/>
      <circle cx='32' cy='104' r='2.2'/>
      <circle cx='14' cy='280' r='2.2'/>
      <circle cx='52' cy='150' r='2.2'/>
      <circle cx='44' cy='240' r='2.2'/>
      <circle cx='46' cy='600' r='2.6'/>
      <circle cx='28' cy='410' r='2'/>
    </g>

    <g stroke='%23caff33' stroke-width='1.4'>
      <path d='M 18 30 L 18 100 L 40 124'/>
      <path d='M 0 220 L 20 220 L 42 240'/>
      <path d='M 24 460 L 24 500 L 50 524'/>
    </g>
    <g fill='%23caff33'>
      <circle cx='40' cy='124' r='1.8'/>
      <circle cx='42' cy='240' r='1.8'/>
      <circle cx='50' cy='524' r='1.8'/>
    </g>

    <!-- BOTTOM-LEFT: cyan band sweeping right -->
    <g stroke='%2300e5ff' stroke-width='1.5'>
      <path d='M 0 540 L 120 540 L 150 568 L 280 568'/>
      <path d='M 0 562 L 100 562 L 130 584 L 240 584 L 260 568 L 380 568'/>
      <path d='M 70 600 L 160 600 L 190 580 L 300 580'/>
    </g>
    <g fill='%2300e5ff'>
      <circle cx='120' cy='540' r='2'/>
      <circle cx='150' cy='568' r='2'/>
      <circle cx='260' cy='568' r='2'/>
      <circle cx='190' cy='580' r='1.8'/>
    </g>

    <!-- RIGHT: blue/purple traces flowing in from the right edge -->
    <g stroke='%237c4dff' stroke-width='1.8'>
      <path d='M 792 0 L 792 90 L 766 116 L 766 190 L 786 210 L 786 290 L 758 318 L 758 410 L 784 432 L 784 520 L 754 548 L 754 600'/>
      <path d='M 772 0 L 772 64 L 748 88 L 748 160'/>
      <path d='M 800 150 L 774 150 L 754 170 L 754 260'/>
      <path d='M 800 380 L 770 380 L 770 430'/>
    </g>
    <g fill='%237c4dff'>
      <circle cx='792' cy='0' r='2.6'/>
      <circle cx='766' cy='116' r='2.2'/>
      <circle cx='786' cy='290' r='2.2'/>
      <circle cx='748' cy='160' r='2.2'/>
      <circle cx='754' cy='260' r='2.2'/>
      <circle cx='754' cy='600' r='2.6'/>
      <circle cx='770' cy='430' r='2'/>
    </g>

    <!-- TOP-RIGHT: pink/magenta accents -->
    <g stroke='%23ff2bd6' stroke-width='1.5'>
      <path d='M 740 0 L 740 60 L 716 84 L 716 150'/>
      <path d='M 780 35 L 780 105'/>
      <path d='M 760 470 L 760 520 L 736 544'/>
    </g>
    <g fill='%23ff2bd6'>
      <circle cx='740' cy='0' r='2.2'/>
      <circle cx='716' cy='150' r='2'/>
      <circle cx='780' cy='105' r='2'/>
      <circle cx='736' cy='544' r='2'/>
    </g>

    <!-- BOTTOM-RIGHT: pink band -->
    <g stroke='%23ff44a8' stroke-width='1.4'>
      <path d='M 800 552 L 700 552 L 670 580 L 580 580'/>
      <path d='M 800 588 L 720 588 L 690 600'/>
    </g>
    <g fill='%23ff44a8'>
      <circle cx='700' cy='552' r='2'/>
      <circle cx='670' cy='580' r='2'/>
    </g>

    <!-- Star specks -->
    <g fill='%23ffffff' opacity='0.55'>
      <circle cx='180' cy='80' r='0.9'/>
      <circle cx='250' cy='160' r='0.7'/>
      <circle cx='320' cy='110' r='0.8'/>
      <circle cx='400' cy='60' r='0.7'/>
      <circle cx='460' cy='180' r='0.9'/>
      <circle cx='540' cy='100' r='0.7'/>
      <circle cx='620' cy='160' r='0.8'/>
      <circle cx='200' cy='280' r='0.7'/>
      <circle cx='300' cy='340' r='0.9'/>
      <circle cx='380' cy='240' r='0.7'/>
      <circle cx='450' cy='320' r='0.8'/>
      <circle cx='560' cy='280' r='0.7'/>
      <circle cx='640' cy='360' r='0.9'/>
      <circle cx='220' cy='420' r='0.7'/>
      <circle cx='340' cy='460' r='0.8'/>
      <circle cx='420' cy='400' r='0.7'/>
      <circle cx='500' cy='480' r='0.9'/>
      <circle cx='600' cy='440' r='0.7'/>
    </g>
  </g>
</svg>`.replace(/\n/g, "").replace(/\s{2,}/g, " ");

export const circuitTileUrl = (opacity = 1) =>
  `url("data:image/svg+xml;utf8,${buildTileSvg(opacity)}")`;
