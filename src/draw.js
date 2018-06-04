'use strict';

import LeaderLine from 'leader-line';
import raf from 'raf';
import cache from './cache';
import { default as Flow } from './flow';
import ActionButton from './components/ActionButton.svelte';
import Text from './components/Text.svelte';
import Overlay from './components/Overlay.svelte';

const COLOR = '#fff';

// Spacing between line and node
const lineOffset = 20; // TODO: remove? it's unused
const elmNames = ['text', 'textContainer', 'overlay', 'actionButton'];

export function clear() {
  hideAll();

  elmNames.forEach(name => {
    const node = cache(name);
    if (!node) return;
    if (node instanceof Node) { // regular node
      node.remove();
      cache.remove(name);
    } else if (node.destroy) { // svelte.js node
      node.destroy();
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

  raf(() => {
    const coached = coach(mark);
    const text = addText(mark.text);

    // arrow(coached, text);
    leaderLine(text.getTextElement(), coached);
  });
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

  const body = document.querySelector('body');
  const overlay = cache.default('overlay', () => new Overlay({ target: body }));
  overlay.show(elm);

  // const actionBtn = createActionButton(mark);
  // document.body.appendChild(actionBtn);

  const actionBtn = cache.default('actionButton', () => new ActionButton({
    target: body,
  }));
  actionBtn.set({ coachmark: mark });
  actionBtn.on('clear', () => clear());
  actionBtn.on('next', event => draw(event.next));

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

  const text = cache.default('text', () => new Text({
    target: document.querySelector('body'),
    data: {
      target: elm,
    },
  }));
  text.set({ text: textStr });
  text.position();

  return text;
}

function leaderLine(from, to) {
  if (!from || !to) return;

  let line = cache.get('leaderLine');
  if (line) line.remove();

  line = new LeaderLine(
    LeaderLine.areaAnchor(from, { color: 'transparency' }),
    LeaderLine.areaAnchor(to, { color: 'transparency' }),
    {
      endPlugColor: COLOR,
      startPlugColor: COLOR,
      endPlugSize: 0.5,
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

/* Calculations Methods */

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
