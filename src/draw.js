'use strict';

import LeaderLine from 'leader-line';
import raf from 'raf';
import cache from './cache';
import { default as Flow } from './flow';

const COLOR = '#fff';

// Spacing between line and node
const lineOffset = 20;
const elmNames = ['text', 'textContainer', 'coachTop', 'coachLeft', 'coachRight', 'coachBottom', 'glow', 'actionButton', 'svg', 'path'];

export function clear() {
  hideAll();

  elmNames.forEach(name => {
    const node = cache(name);
    if (node instanceof Node) {
      node.remove();
      cache.remove(name);
    }
  });

  const l = cache.get('leaderLine');
  if (l) {
    l.remove();
    cache.remove('leaderLine');
  }
}

export function redrawAll() {
  raf(() => {
    Object.keys(cache.all()).forEach(key => {
      const item = cache(key);
      if (!(item instanceof Node)) {
        if (item.showing) draw(key);
      }
    });
  });
}

function hideAll() {
  Object.values(cache.all()).forEach(val => {
    if (val && val.showing) val.showing = false;
  });
}

export function draw(name) {
  if (name.indexOf('mark.') !== 0) name = `mark.${name}`;

  const mark = cache(name);
  if (!mark) {
    console.error(`Coachmark with name '${name}' not found`);
    return;
  }

  mark.showing = true;
  mark.name = name;

  const coached = coach(mark);
  const text = addText(mark.text);

  // arrow(coached, text);
  leaderLine(text, coached);
}

function coach(mark) {
  if (!mark) {
    console.error(`No mark specified`);
    return;
  }

  const elm = document.querySelector(mark.target);
  if (!elm) {
    console.error(`Couldn't find element '${mark.target}' for mark ${mark.name}`);
    return;
  }

  cache.set('elm', elm);

  // if (elm.className.indexOf('draggable-source') === -1) elm.className += ' draggable-source';

  // elm.style.position = 'absolute';
  // elm.style['z-index'] = 102;

  const borderRadius = window.getComputedStyle(elm).getPropertyValue('border-radius');
  // borderRadius = parseInt(borderRadius, 10);

  const rect = elm.getBoundingClientRect();

  const top = rect.top;
  const left = rect.left;
  const width = rect.width;
  const height = rect.height;
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

  const actionBtn = createActionButton(mark);

  [coachTop, coachLeft, coachRight, coachBottom, glow, actionBtn].forEach(c => {
    if (!c.parentNode) {
      document.body.appendChild(c);
    }
  });

  // TODO: Make this a setting, to close on click anywhere
  // setTimeout(() => {
  //   document.addEventListener('click', clear, { once: true });
  // });

  return elm;
}

// TODO
export function flow(name) {
  const mark = cache(`mark.${name}`);

  if (!mark) throw new Error(`Could not find coachmark named '${name}'. Make sure you create it before building a flow with it`);

  const f = new Flow(name);
  mark.flow = f;

  return f;
}

export function addText(textStr) {
  const elm = cache('elm');
  if (!elm) return;

  const text = cache.default('text', () => document.createElement('div'));

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
  textContainer.style.top = box.top + 'px';
  textContainer.style.left = box.left + 'px';
  textContainer.style.width = box.width + 'px';
  textContainer.style.height = box.height + 'px';

  textContainer.appendChild(text);
  document.body.appendChild(textContainer);

  text.className = 'coachmark-text draggable-source';
  // const ref = (text.innerText || text.textContent);
  text.textContent = textStr;

  return text;
}

function leaderLine(from, to) {
  if (!from || !to) return;

  let line = cache.get('leaderLine');
  if (line) {
    line.remove();
  }

  line = new LeaderLine(
    // from, to,
    LeaderLine.areaAnchor(from, { color: 'transparency' }),
    LeaderLine.areaAnchor(to, { color: 'transparency' }),
    {
      endPlugColor: COLOR,
      startPlugColor: COLOR,
      // endPlug: 'arrow2',
      endPlugSize: 0.5,
      // markerEnd: 'url(#coachmark-arrow)',
    },
  );
  cache.set('leaderLine', line);

  window.line = line;
  line.path = 'magnet'; // magnet, fluid, arc, straight, grid
  line.position();

  // Put filter on lines after they've been drawn
  const lines = document.querySelectorAll('.leader-line-line-path');
  Array.prototype.forEach.call(lines, line => {
    // TODO: I've disabled the chalk roughness for now, until I can find a way to make the text rough as well
    // line.setAttribute('filter', 'url(#coachmark-chalk)');
  });
}

function createSVG() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('height', '100%');
  svg.setAttribute('width', '100%');
  svg.setAttribute('class', 'coachmark-svg');
  return svg;
}

function createActionButton(mark) {
  let icon = 'X';
  let action = clear;

  let flow = cache('flow');
  if (mark.flow) flow = cache.set('flow', mark.flow);

  if (flow) {
    const next = flow.getNext(mark.name);
    if (next) {
      icon = nextButtonHTML();
      action = () => {
        draw(next);
      };
    } else cache.remove('flow');
  }

  const close = cache.default('actionButton', () => document.createElement('div'));
  close.setAttribute('class', 'coachmark-action-btn');
  close.innerHTML = icon;
  close.addEventListener('click', () => {
    action();
  });

  return close;
}

function nextButtonHTML() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); // ok
  svg.setAttribute('class', 'coachmark-next-button');
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.setAttribute('transform', 'scale(0.065), translate(100, 140)');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttribute('xlink:href', '#right-arrow');
  g.appendChild(use);
  svg.appendChild(g);
  return svg.outerHTML;
}

/* Calculations Methods */

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
