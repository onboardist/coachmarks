'use strict';

import distance from 'euclidean-distance';
import SvgPath from 'path-svg/svg-path';
import cache from './cache';

// TODO: for positioning choose biggest delta between x and y, it will be one of two (i.e. bottom or left), so choose the one that's the largest delta from the other point's (maybe)

// Spacing between line and node
const lineOffset = 20;
const elmNames = ['text', 'coachTop', 'coachLeft', 'coachRight', 'coachBottom', 'glow', 'closeButton', 'svg', 'path'];

export function clear() {
  // debugger;
  elmNames.forEach(name => {
    const node = cache(name);
    if (node instanceof Node) {
      node.remove();
      cache.remove(name);
    }
  });
}

export function redrawAll() {
  const all = cache.all();

  Object.keys(all).forEach(key => {
    const item = cache(key);
    if (!(item instanceof Node)) {
      draw(key);
    }
  });
}

export function draw(name) {
  const mark = cache(name);
  if (!mark) throw new Error(`Coachmark with name '${name}' not found`);

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

  let fromPos = nearestEdgePoint(fromRect, toRect);
  let toPos = nearestEdgePoint(toRect, fromRect);
  fromPos = nearestEdgePoint(fromPos, toRect);
  toPos = nearestEdgePoint(toPos, fromRect);

  /* NOTE: for curved linbe
  // const mid = midPoint(fromPos[0], fromPos[1], toPos[0], toPos[1]);
  // const c1x = mid[0];
  // const c1y = toPos[1];
  // const c2x = fromPos[0];
  // const c2y = mid[1];
  // const pathStr = SvgPath().M(fromPos[0], fromPos[1]).C(c2x, c2y, c1x, c1y, toPos[0], toPos[1]).str();
  // NOTE: quadratic curve using these args looks better. Also arrowhead orients right
  // const pathStr = SvgPath().M(fromPos[0], fromPos[1]).Q(c2x, c2y, toPos[0], toPos[1]).str();
  */

  const pathStr = SvgPath().M(fromPos[0], fromPos[1]).L(toPos[0], toPos[1]).str();

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

function nearestEdgePoint(from, toRect) {
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

/* NOTE: not in use currently
function midPoint(x1, y1, x2, y2) {
  return [(x1 + x2) / 2, (y1 + y2) / 2];
}
*/

// function lineDist(x1, y1, x2, y2) {
//   return Math.sqrt(((x2 - x1) ** 2) + ((y2 - y1) ** 2));
// }
//
// function slope(x1, y1, x2, y2) {
//   return (y2 - y1) / (x2 - x1);
// }
//
// function viewportMid() {
//   return [
//     Math.max(document.documentElement.clientWidth, window.innerWidth || 0) / 2,
//     Math.max(document.documentElement.clientHeight, window.innerHeight || 0) / 2,
//   ];
// }

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
