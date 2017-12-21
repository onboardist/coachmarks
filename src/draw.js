'use strict';

import distance from 'euclidean-distance';
import polar from 'array-polar';
import SvgPath from 'path-svg/svg-path';
import cache from './cache';

// TODO: for positioning choose biggest delta between x and y, it will be one of two (i.e. bottom or left), so choose the one that's the largest delta from the other point's (maybe)

// Spacing between line and node
const lineOffset = 20;
const elmNames = ['text', 'textContainer', 'coachTop', 'coachLeft', 'coachRight', 'coachBottom', 'glow', 'closeButton', 'svg', 'path'];

export function clear() {
  hideAll();

  elmNames.forEach(name => {
    const node = cache(name);
    if (node instanceof Node) {
      node.remove();
      cache.remove(name);
    }
  });
}

export function redrawAll() {
  Object.keys(cache.all()).forEach(key => {
    const item = cache(key);
    if (!(item instanceof Node)) {
      if (item.showing) draw(key);
    }
  });
}

function hideAll() {
  Object.values(cache.all()).forEach(val => {
    if (val.showing) val.showing = false;
  });
}

export function draw(name) {
  const mark = cache(name);
  if (!mark) throw new Error(`Coachmark with name '${name}' not found`);
  mark.showing = true;

  const coached = coach(mark);
  const text = addText(mark.text);
  arrow(coached, text);
}

function coach(mark) {
  if (!mark) throw new Error(`Coachmark with name '${name}' not found`);

  const elm = cache.default('elm', () => document.querySelector(mark.target));

  if (elm.className.indexOf('draggable-source') === -1) elm.className += ' draggable-source';

  elm.style.position = 'absolute';
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

  const glow = cache.default('glow', () => document.createElement('div'));

  glow.className = 'coachmark-glow';
  glow.style.top = (top) + 'px';
  glow.style.left = (left) + 'px';
  glow.style.width = (width) + 'px';
  glow.style.height = (height) + 'px';
  glow.style['border-radius'] = borderRadius;
  glow.style['box-shadow'] = '0 0 ' + 20 + 'px ' + 10 + 'px #fff'; //  TODO: this style should probably be dynamic

  const close = createCloseButton();

  [coachTop, coachLeft, coachRight, coachBottom, glow, close].forEach(c => {
    if (!c.parentNode) {
      document.body.appendChild(c);
    }
  });

  return elm;
}

export function addText(textStr) {
  const text = cache.default('text', () => document.createElement('div'));

  const elm = cache('elm');
  if (!elm) throw new Error('Could not get element from cache');

  const [box1, box2] = splitScreen();

  // See if the element is in box1 or box2;
  let elmMiddle = middleOf(elm);
  elmMiddle = { x: Math.floor(elmMiddle[0]), y: Math.floor(elmMiddle[1]) };

  let box;
  if (rectContains(elmMiddle, box1)) {
    box = box2;
  } else {
    box = box1;
  }

  const textContainer = cache.default('textContainer', () => document.createElement('div'));
  textContainer.className = 'coachmark-text-container';
  textContainer.style.top = box.top;
  textContainer.style.left = box.left;
  textContainer.style.width = box.width;
  textContainer.style.height = box.height;

  textContainer.appendChild(text);
  document.body.appendChild(textContainer);

  text.className = 'coachmark-text draggable-source';
  // const ref = (text.innerText || text.textContent);
  text.textContent = textStr;

  return text;
}

// Draw arrow from one node to another
function arrow(from, to) {
  const fromRect = elementRect(from);
  const toRect = elementRect(to);

  let fromPos = nearestEdgePoint(fromRect, toRect, { useCorners: false });
  let toPos = nearestEdgePoint(toRect, fromRect);
  fromPos = nearestEdgePoint(fromPos, toRect);
  toPos = nearestEdgePoint(toPos, fromRect);

  // NOTE: for curved line
  const mid = midPoint(fromPos[0], fromPos[1], toPos[0], toPos[1]);
  // let c1x = mid[0];
  // let c1y = toPos[1];
  // const c2x = fromPos[0];
  // const c2y = mid[1];

  // Find point, 50% of segment length away from midPoint
  const dist = lineDist(fromPos[0], fromPos[1], toPos[0], toPos[1]);
  // const vMid = viewportMid();
  const coords = polar([fromPos[0], fromPos[1], toPos[0], toPos[1]], [fromPos[0], fromPos[1]]);
  // const midCoords = polar([fromPos[0], fromPos[1], mid[0], mid[1]], [fromPos[0], fromPos[1]]);
  const angle = coords[3];
  let deg = angle * 180 / Math.PI;
  deg = deg < 0 ? deg + 360 : deg;
  const degPerp = deg - 90;
  const degPerpRad = degPerp * Math.PI / 180;
  const newCoords = polar.cartesian([0, Math.PI, dist * 0.33, degPerpRad]);
  const midCtrl = [mid[0] + newCoords[2], mid[1] + newCoords[3]];

  // const sl = slope(fromPos[0], fromPos[1], toPos[0], toPos[1]);
  // const recip = -1 / sl;
  // console.log('SLOPE', sl, recip);

  // const pathStr = SvgPath().M(fromPos[0], fromPos[1]).C(c2x, c2y, c1x, c1y, toPos[0], toPos[1]).str();
  // NOTE: quadratic curve using these args looks better. Also arrowhead orients right

  // const pathStr = SvgPath().M(fromPos[0], fromPos[1]).Q(c1x, c1y, toPos[0], toPos[1]).str();
  const pathStr = SvgPath().M(fromPos[0], fromPos[1]).Q(midCtrl[0], midCtrl[1], toPos[0], toPos[1]).str();

  // const pathStr = SvgPath().M(fromPos[0], fromPos[1]).L(toPos[0], toPos[1]).str();

  const svg = cache.default('svg', () => createSVG());
  const path = cache.default('path', () => document.createElementNS('http://www.w3.org/2000/svg', 'path'));

  path.setAttribute('d', pathStr);
  path.setAttribute('class', 'coachmark-line');
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

function createCloseButton() {
  const close = cache.default('closeButton', () => document.createElement('div'));
  close.setAttribute('class', 'coachmark-close');
  close.innerHTML = 'X';
  close.addEventListener('click', () => clear());
  return close;
}

/* Calculations Methods */

// function dist(pt1, pt2) {
//   return Math.sqrt(
//     Math.pow(pt2[0] - pt1[0], 2)
//     *
//     Math.pow(pt2[1] - pt1[1], 2)
//   );
// }

function nearestEdgePoint(from, toRect, { useCorners } = {}) {
  /*
    rect: {
      top, left, width, height
    }
  */

  // From is a rect, calc line from middle of rectangle
  if (Object.prototype.hasOwnProperty.call(from, 'top')) {
    from = middleOf(from);
  }

  // NOTE: overall I think snapping to middle only actually looks a bit better, assuming that we calculated the edges properly
  // Get list of point around toRect;
  const points = {
    leftTop: [toRect.left, toRect.top],
    middleTop: [toRect.left + (toRect.width / 2), toRect.top],
    rightTop: [toRect.left + toRect.width, toRect.top],
    rightMiddle: [toRect.left + toRect.width, toRect.top + (toRect.height / 2)],
    rightBottom: [toRect.left + toRect.width, toRect.top + toRect.height],
    middleBottom: [toRect.left + (toRect.width / 2), toRect.top + toRect.height],
    leftBottom: [toRect.left, toRect.top + toRect.height],
    leftMiddle: [toRect.left, toRect.top + (toRect.height / 2)],
  };

  if (useCorners === false) {
    Object.keys(points).forEach(key => {
      if (key.toLowerCase().indexOf('middle') === -1) delete points[key];
    });
  }

  let nearest = { point: [0, 0], dist: Infinity };
  let nearestName = '';
  Object.keys(points).forEach(key => {
    const point = points[key];
    const dist = distance(from, point);
    if (dist < nearest.dist) {
      nearest = { point, dist };
      nearestName = key;
    }
  });

  nearestName = nearestName.toLowerCase();
  const point = nearest.point;

  if (nearestName.indexOf('top') !== -1) point[1] -= lineOffset;
  if (nearestName.indexOf('bottom') !== -1) point[1] += lineOffset;
  if (nearestName.indexOf('left') !== -1) point[0] -= lineOffset;
  if (nearestName.indexOf('right') !== -1) point[0] += lineOffset;

  return point;
}

function middleOf(node) {
  let rect = node;
  if (node instanceof Node) {
    rect = elementRect(node);
  }

  return [rect.left + (rect.width / 2), rect.top + (rect.height / 2)];
}

function rectContains({ x, y }, { left, top, width, height }) {
  return left <= x && x <= left + width &&
         top <= y && y <= top + height;
}

function splitScreen() {
  const w = document.body.offsetWidth;
  const h = document.body.offsetHeight;

  let box1;
  let box2;

  // Split vertically
  if (w > h) {
    const boxWidth = Math.floor(w / 2);
    box1 = {
      top: 0,
      left: 0,
      height: h,
      width: boxWidth,
    };
    box2 = {
      top: 0,
      left: boxWidth,
      height: h,
      width: w - boxWidth,
    };
  } else {
    const boxHeight = Math.floor(h / 2);
    box1 = {
      top: 0,
      left: 0,
      height: boxHeight,
      width: w,
    };
    box2 = {
      top: boxHeight,
      left: 0,
      height: h - boxHeight,
      width: w,
    };
  }

  return [box1, box2];
}

/* NOTE: not in use currently
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
*/

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

function midPoint(x1, y1, x2, y2) {
  return [(x1 + x2) / 2, (y1 + y2) / 2];
}

function lineDist(x1, y1, x2, y2) {
  return Math.sqrt(((x2 - x1) ** 2) + ((y2 - y1) ** 2));
}

// function slope(x1, y1, x2, y2) {
//   return (y2 - y1) / (x2 - x1);
// }

function viewportMid() {
  return [
    Math.max(document.documentElement.clientWidth, window.innerWidth || 0) / 2,
    Math.max(document.documentElement.clientHeight, window.innerHeight || 0) / 2,
  ];
}

// function dirToViewportMid(pos) {
//   const mid = viewportMid();
//   return [
//     pos[0] > mid[0] ? -1 : 1,
//     pos[1] > mid[1] ? -1 : 1,
//   ];
// }

/* NOTE: not in use currently
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
    if (rect.left >= point.x) {
          // right edge;
      return 'right'; // [TOPRIGHT, BOTTOMRIGHT];
    } else if (rect.left < point.x) {
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
*/
