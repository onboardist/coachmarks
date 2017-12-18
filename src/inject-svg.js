
// <svg width="0" height="0" xmlns="http://www.w3.org/2000/svg">
const content = `
  <defs>
    <filter id="coachmark-chalk" x="0" y="0" height="5000px" width="5000px" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
      <feTurbulence baseFrequency="0.133" seed="500" result="result1" numOctaves="1" type="turbulence"/>
      <feOffset result="result2" dx="0" dy="0"/>
      <feDisplacementMap scale="5" yChannelSelector="G" in2="result1" xChannelSelector="R" in="SourceGraphic"/>
      <feGaussianBlur stdDeviation="0.5"/>
    </filter>
    <marker id="arrow" class="coachmark-line" markerWidth="10" markerHeight="8" refX="9.5" refY="4.5" orient="auto" markerUnits="strokeWidth">
      <!--<path d="M0,0 L0,6 L9,3 z" stroke="#fff" fill="#fff" />-->
      <!--<polyline points="-2,-2 0,0 -2,2" stroke="#fff" fill="none" vector-effect="non-scaling-stroke" />-->

      <!-- <polyline points="1 1, 9 5, 1 7" fill="none" /> -->
      <polyline points="1 1.5, 10 4.5, 2 7" fill="none" />
    </marker>

    <!-- NOTE: arrowhead is not being used -->
    <marker id="arrowhead" viewBox="0 0 10 10" refX="3" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" />
    </marker>
  </defs>
`;
// </svg>

export default function injectSVG() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', 0);
  svg.setAttribute('height', 0);
  // svg.setAttribute('xmlns', '');
  svg.innerHTML = content;
  document.body.prepend(svg);
  return svg;
}
