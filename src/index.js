
const isElement = require('iselement');
// const filter = require('lodash/filter');
const SvgPath = require('path-svg/svg-path');
const cache = require('./cache');

// Code goes here
// TODO: relative-size the arrow marker based on viewport size
// TODO: Fix positioning of arrow head
// TODO: content needs to not scroll, which means scrolling elements into view.
// TODO: handle rezizing, orientation changes, and media query changes

// TODO: for positioning choose biggest delta between x and y, it will be one of two (i.e. bottom or left), so choose the one that's the largest delta from the other point's (maybe)

const target = '#btn';

// Distance from line to
const lineOffset = 20;

// Options for arrows
// const arrowOpts = {
//   textPos: 'middle';
// }

document.addEventListener('DOMContentLoaded', () => {
  draw();
});

window.addEventListener('resize', () => {
  requestAnimationFrame(() => {
    draw();
  });
});

function draw() {
  const coached = coach();
  const text = addText('Click this button to do stuff!');

  arrow(
    // middleOfEdge(text, 'bottom'),
    // middleOfEdge(coached, 'right'),
    coached,
    text,

  );
}
window.draw = draw;

function coach() {
  const elm = cache.default('elm', () => document.querySelector(target));

  if (elm.className.indexOf('draggable-source') === -1) elm.className += ' draggable-source';

  elm.style.position = 'absolute';
  // elm.style['box-shadow'] = '0 0 150px 30px #fff';
  elm.style['z-index'] = 102;

  const borderRadius = window.getComputedStyle(elm).getPropertyValue('border-radius');
  // borderRadius = parseInt(borderRadius, 10);

  const top = elm.offsetTop;
  const left = elm.offsetLeft;
  const width = elm.offsetWidth;
  const height = elm.offsetHeight;
  const right = left + width;
  const bottom = top + height;

  const coachTop = cache.default('coachTop', () => document.createElement('div'));
  coachTop.className = 'coachmark-top';
  const coachLeft = cache.default('coachLeft', () => document.createElement('div'));
  coachLeft.className = 'coachmark-left';
  const coachRight = cache.default('coachRight', () => document.createElement('div'));
  coachRight.className = 'coachmark-right';
  const coachBottom = cache.default('coachBottom', () => document.createElement('div'));
  coachBottom.className = 'coachmark-bottom';

  coachTop.style.height = top + 'px';
  coachLeft.style.top = top + 'px';
  coachRight.style.top = coachLeft.style.top;
  coachLeft.style.height = height + 'px';
  coachRight.style.height = coachLeft.style.height;
  coachLeft.style.width = left + 'px';
  coachRight.style.left = right + 'px';
  coachBottom.style.top = bottom + 'px';

  // const longDim = height > width ? height : width;

  const glow = cache.default('glow', () => document.createElement('div'));

  glow.className = 'coachmark-glow';
  // glow.style.top = (top + height / 4) + 'px';
  // glow.style.left = (left + width / 4) + 'px';
  // glow.style.width = width - width / 2 + 'px';
  // glow.style.height = height - height / 2 + 'px';
  glow.style.top = (top) + 'px';
  glow.style.left = (left) + 'px';
  glow.style.width = (width) + 'px';
  glow.style.height = (height) + 'px';
  glow.style['border-radius'] = borderRadius;
  glow.style['box-shadow'] = '0 0 ' + 20 + 'px ' + 10 + 'px #fff';

  [coachTop, coachLeft, coachRight, coachBottom, glow].forEach(c => {
    if (!c.parentNode) {
      document.body.appendChild(c);
    }
  });

  return elm;
}

function addText(textStr) {
  const text = cache.default('text', () => {
    const text = document.createElement('div');
    document.body.appendChild(text);
    return text;
  });

  text.className = 'coachmark-text draggable-source';
  // const ref = (text.innerText || text.textContent);
  text.textContent = textStr;

  return text;
}

// Draw arrow from one node to another
function arrow(from, to) {
  const fromRect = elementRect(from);
  const toRect = elementRect(to);

  const toMiddle = middleOf(to);
  const fromEdge = intersectionEdge({ x: toMiddle[0], y: toMiddle[1] }, fromRect);
  const fromPos = middleOfEdge(to, fromEdge);

  const fromMiddle = middleOf(from);
  const toEdge = intersectionEdge({ x: fromMiddle[0], y: fromMiddle[1] }, toRect);
  const toPos = middleOfEdge(from, toEdge);

  // console.log(fromEdge, toEdge, fromPos, toPos);

  const s = slope(fromPos[0], fromPos[1], toPos[0], toPos[1]);
  const recipS = (1 / s) * -1;

  const arrowDist = lineDist(fromPos[0], fromPos[1], toPos[0], toPos[1]);
  const mid = midPoint(fromPos[0], fromPos[1], toPos[0], toPos[1]);

  const r = Math.sqrt(1 + (recipS ** recipS));
  let ctrlX = mid[0] + (arrowDist / r);
  let ctrlY = mid[1] + (arrowDist * recipS / r);
  const dir = dirToViewportMid(mid[0], mid[1]);

  ctrlX *= dir[0];
  ctrlY *= dir[1];

  // console.log(recipS, arrowDist, mid, r, ctrlX, ctrlY);

  const c1x = mid[0];
  const c1y = toPos[1];
  const c2x = fromPos[0];
  const c2y = mid[1];
  const pathStr = SvgPath().M(fromPos[0], fromPos[1]).C(c2x, c2y, c1x, c1y, toPos[0], toPos[1]).str();

  const svg = cache.default('svg', () => createSVG());
  const path = cache.default('path', () => document.createElementNS('http://www.w3.org/2000/svg', 'path'));

  path.setAttribute('d', pathStr);
  path.setAttribute('stroke', '#fff');
  path.setAttribute('stroke-width', '5');
  path.setAttribute('fill', 'none');
  path.setAttribute('filter', 'url(#coachmark-chalk)');
  path.setAttribute('marker-end', 'url(#arrow)');

  if (!path.parentNode) {
    svg.appendChild(path);
  }

  if (!svg.parentNode) {
    document.body.insertBefore(svg, document.body.firstChild);
  }
}

function createSVG() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('height', '100%');
  svg.setAttribute('width', '100%');
  svg.setAttribute('class', 'coachmark-svg');
  return svg;
}

function middleOf(node) {
  const rect = elementRect(node);

  return [rect.left + (rect.width / 2), rect.top + (rect.height / 2)];
}

function middleOfEdge(node, edge) {
  const rect = elementRect(node);

  const width = rect.width;
  const height = rect.height;
  const middleX = rect.width / 2;
  const middleY = rect.height / 2;
  let x = rect.left + middleX;
  let y = rect.top + middleY;

  switch (edge) {
    case 'top':
      x = rect.left + middleX;
      y = rect.top - lineOffset;
      break;
    case 'right':
      x = rect.left + width + lineOffset;
      y = rect.top + middleY;
      break;
    case 'bottom':
      x = rect.left + middleX;
      y = rect.top + height + lineOffset;
      break;
    case 'left':
      x = rect.left - lineOffset;
      y = rect.top + middleY;
      break;
    default:
      // do nothing
  }

  return [x, y];
}

function elementRect(node, offsetParent) {
  if (offsetParent === true) offsetParent = node.offsetParent;

  const rect = node.getBoundingClientRect();
  const prect = offsetParent ?
    offsetParent.getBoundingClientRect() :
    { left: 0, top: 0 };

  return {
    left: rect.left - prect.left,
    top: rect.top - prect.top,
    width: rect.width,
    height: rect.height,
  };
}
window.elementRect = elementRect;

function midPoint(x1, y1, x2, y2) {
  return [(x1 + x2) / 2, (y1 + y2) / 2];
}

function lineDist(x1, y1, x2, y2) {
  return Math.sqrt(((x2 - x1) ** 2) + ((y2 - y1) ** 2));
}

function slope(x1, y1, x2, y2) {
  return (y2 - y1) / (x2 - x1);
}

function viewportMid() {
  return [
    Math.max(document.documentElement.clientWidth, window.innerWidth || 0) / 2,
    Math.max(document.documentElement.clientHeight, window.innerHeight || 0) / 2,
  ];
}

function dirToViewportMid(pos) {
  const mid = viewportMid();
  return [
    pos[0] > mid[0] ? -1 : 1,
    pos[1] > mid[1] ? -1 : 1,
  ];
}

function intersectionEdge(point, rect) {
  const slope = (rect.top - point.y) / (rect.left - point.x);
  const hsw = slope * rect.width / 2;
  const hsh = (rect.height / 2) / slope;
  const hh = rect.height / 2;
  const hw = rect.width / 2;
  // const TOPLEFT = {x: rect.x - hw, y: rect.y + hh};
  // const BOTTOMLEFT = {x: rect.x - hw, y: rect.y - hh};
  // const BOTTOMRIGHT = {x: rect.x + hw, y: rect.y - hh};
  // const TOPRIGHT = {x: rect.x + hw, y: rect.y + hh};
  if (-hh <= hsw && hsw <= hh) {
      // line intersects
    if (rect.left < point.x) {
          // right edge;
      return 'right'; // [TOPRIGHT, BOTTOMRIGHT];
    } else if (rect.left > point.x) {
          // left edge
      return 'left'; // [TOPLEFT, BOTTOMLEFT];
    }
  }
  if (-hw <= hsh && hsh <= hw) {
    if (rect.top < point.y) {
          // top edge
      return 'top'; // [TOPLEFT, TOPRIGHT];
    } else if (rect.top > point.y) {
          // bottom edge
      return 'bottom'; // [BOTTOMLEFT, BOTTOMRIGHT];
    }
  }
}

function clear() {
  const vals = cache.all();

  for (const key in vals) {
    if (Object.hasOwnProperty.call(vals, key)) {
      const val = vals[key];
      if (isElement(val)) {
        val.remove();
        cache.remove(key);
      }
    }
  }
}

// function controlPointLength(x1, y1, x2, y2) {
//
// }
//
// function controlPointPos() {
//
// }
//
// function intersection(point, box) {
//   const s = (Ay - By) / (Ax - Bx);
// }
