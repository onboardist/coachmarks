(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.coachmarks = factory());
}(this, (function () { 'use strict';

function ___$insertStyle(css) {
  if (!css) {
    return;
  }
  if (typeof window === 'undefined') {
    return;
  }

  var style = document.createElement('style');

  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);

  return css;
}

function cache(...args) {
  return cache.addOrGet(...args);
}

cache.init = () => {
  if (!cache.cache) {
    cache.cache = {};
  }
};

cache.addOrGet = (name, obj) => {
  cache.init();
  if (typeof obj === 'undefined') {
    // Get
    return cache.get(name);
  }

  // Set
  cache.add(name, obj);

  return obj;
};

cache.get = name => {
  cache.init();
  return cache.cache[name];
};

cache.add = (name, obj) => {
  cache.init();
  cache.cache[name] = obj;
  return obj;
};

cache.remove = name => {
  cache.init();
  if (name) delete cache.cache[name];
};

cache.clear = () => {
  cache.init();
  for (const c of cache.cache) {
    cache.cache[c] = undefined;
  }
};

cache.default = (name, defaultFn) => {
  const obj = cache(name);

  if (obj === undefined) return cache(name, defaultFn.call());
  return obj;
};

cache.all = () => {
  cache.init();
  return cache.cache;
};

cache.allArray = () => {
  cache.init();
  const elms = [];
  for (const key in cache) {
    if (Object.prototype.hasOwnProperty.call(cache.cache, key)) {
      elms.push({ key: cache.cache[key] });
    }
  }

  return elms;
};

var squared = function (a, b) {
  var sum = 0;
  var n;
  for (n = 0; n < a.length; n++) {
    sum += Math.pow(a[n] - b[n], 2);
  }
  return sum
};

var euclideanDistance = function (a, b) {
  return Math.sqrt(squared(a,b))
};

'use strict';

var arrayPolar = toPolar;
var polar = toPolar;
var cartesian = toCartesian;

function toPolar (arr, center) {
	if (!arr || arr.length == null) throw Error('Argument should be an array')

	if (center == null) center = [0, 0];

	var i = 0, l = arr.length, x, y, cx = center[0], cy = center[1];

	for (; i < l; i+=2) {
		x = arr[i] - cx, y = arr[i+1] - cy;
		arr[i] = Math.sqrt(x*x+y*y);
		arr[i+1] = Math.atan2(y, x);
	}

	return arr;
}

function toCartesian (arr, center) {
	if (!arr || arr.length == null) throw Error('Argument should be an array')

	if (center == null) center = [0, 0];

	var i = 0, l = arr.length, r, a, cx = center[0], cy = center[1];

	for (; i < l; i+=2) {
		r = arr[i], a = arr[i+1];
		arr[i] = r*Math.cos(a) + cx;
		arr[i+1] = r*Math.sin(a) + cy;
	}

	return arr;
}

arrayPolar.polar = polar;
arrayPolar.cartesian = cartesian;

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var svgPath = createCommonjsModule(function (module, exports) {
/**
 * SvgPath
 * Chainable SVG path string generator with some sugar added
 * Supports Node, AMD and browser environments (EcmaScript 5+ or shims)
 * No dependencies
 * @version 0.2.1
 * @author Igor Zalutsky
 * @license MIT
 */
(function (root, factory) {
    if (typeof undefined === 'function' && undefined.amd) {
        undefined([], factory);
    } else {
        module.exports = factory();
    }
}(commonjsGlobal, function () {
    "use strict";

    var absCommands = ['M', 'Z', 'L', 'H', 'V', 'C', 'S', 'Q', 'T', 'A'];
    var relCommands = absCommands.map(function(letter){
        return letter.toLowerCase();
    });
    var commands = absCommands.concat(relCommands);

    /**
     * Creates a path builder. Can be invoked without new.
     * @returns {SvgPath}
     * @constructor
     */
    function SvgPath(){
        //TODO is this check robust enough?
        if (this instanceof SvgPath){
            this.relative = false;
            this.commands = [];
        } else {
            return new SvgPath();
        }
    }

    /**
     * Turns relative mode on (lowercase commands will be used)
     * @returns {SvgPath}
     */
    SvgPath.prototype.rel = function(){
        this.relative = true;
        return this;
    };

    /**
     * Turns relative mode off (uppercase commands will be used)
     * @returns {SvgPath}
     */
    SvgPath.prototype.abs = function(){
        this.relative = false;
        return this;
    };

    /**
     * Closes subpath (Z command)
     * @returns {SvgPath}
     */
    SvgPath.prototype.close = function(){
        return this.Z();
    };

    /**
     * Moves pen (M or m command)
     * Also accepts point, i.e. { x: 10, y: 20 }
     * @param x
     * @param y
     * @returns {SvgPath}
     */
    SvgPath.prototype.to = function(x, y){
        var point = (typeof x === 'object') ? x : { x: x, y: y };
        return this._cmd('M')(point.x, point.y);
    };

    /**
     * Draws line (L or l command)
     * Also accepts point, i.e. { x: 10, y: 20 }
     * @param x
     * @param y
     * @returns {SvgPath}
     */
    SvgPath.prototype.line = function(x, y){
        var point = (typeof x === 'object') ? x : { x: x, y: y };
        return this._cmd('L')(point.x, point.y);
    };

    /**
     * Draws horizontal line (H or h command)
     * @param x
     * @returns {SvgPath}
     */
    SvgPath.prototype.hline = function(x){
        return this._cmd('H')(x);
    };

    /**
     * Draws vertical line (V or v command)
     * @param y
     * @returns {SvgPath}
     */
    SvgPath.prototype.vline = function(y){
        return this._cmd('V')(y);
    };

    /**
     * Draws cubic bezier curve (C or c command)
     * Also accepts 2 or 3 points, i.e. { x: 10, y: 20 }
     * If last point is omitted, acts like shortcut (S or s command)
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @param x
     * @param y
     * @returns {SvgPath}
     */
    SvgPath.prototype.bezier3 = function(x1, y1, x2, y2, x, y){
        var usePoints = (typeof x1 === 'object');
        var shortcut = usePoints ? arguments.length < 3 : arguments.length < 6;
        var p1 = { x: x1, y: y1 };
        var p2 = { x: x2, y: y2 };
        var end = shortcut ? p2 : { x: x, y: y };
        if (usePoints){
            p1 = x1;
            p2 = y1;
            end = shortcut ? p2 : x2;
        }
        if (!shortcut) {
            return this._cmd('C')(p1.x, p1.y, p2.x, p2.y, end.x, end.y);
        } else {
            return this._cmd('S')(p1.x, p1.y, end.x, end.y);
        }
    };

    /**
     * Draws quadratic bezier curve (Q or q command)
     * Also accepts 1 or 2 points, i.e. { x: 10, y: 20 }
     * If last point is omitted, acts like shortcut (T or t command)
     * @param x1
     * @param y1
     * @param x
     * @param y
     * @returns {SvgPath}
     */
    SvgPath.prototype.bezier2 = function(x1, y1, x, y){
        var usePoints = (typeof x1 === 'object');
        var shortcut = usePoints ? arguments.length < 2 : arguments.length < 4;
        var p1 = { x: x1, y: y1 };
        var end = shortcut ? p1 : { x: x, y: y };
        if (usePoints){
            p1 = x1;
            end = shortcut ? p1 : y1;
        }
        if (!shortcut) {
            return this._cmd('Q')(p1.x, p1.y, end.x, end.y);
        } else {
            return this._cmd('T')(end.x, end.y);
        }
    };

    /**
     * Draws an arc (A or a command)
     * Also accepts end point, i.e. { x: 10, y: 20 }
     * @param rx
     * @param ry
     * @param rotation
     * @param large
     * @param sweep
     * @param x
     * @param y
     * @returns {*}
     */
    SvgPath.prototype.arc = function(rx, ry, rotation, large, sweep, x, y){
        var point = (typeof x === 'object') ? x : { x: x, y: y };
        return this._cmd('A')(rx, ry, rotation, large, sweep, point.x, point.y);
    };

    /**
     * String representation of command chain
     * @returns {string}
     */
    SvgPath.prototype.str = function(){
        return this.commands.map(function(command){
            return command.toString();
        }).join(' ');
    };

    //setting letter commands
    commands.forEach(function(commandName){
        SvgPath.prototype[commandName] = function(){
            var args = Array.prototype.slice.call(arguments, 0);
            args.unshift(commandName);
            var command = new Command(args);
            this.commands.push(command);
            return this;
        };
    });

    /**
     * Gets either absolute (uppercase) or relative (lowercase) version of command depending on mode
     * @param letter
     * @returns {function}
     * @private
     */
    SvgPath.prototype._cmd = function(letter){
        var actualName = this.relative ?
            letter.toLowerCase() : letter.toUpperCase();
        //TODO maybe direct invokation is better than binding?
        return this[actualName].bind(this);
    };

    /**
     * Represents a single command
     * @param name
     * @constructor
     */
    function Command(name){
        //TODO more robust array detection
        var args = name.length > 0 && name.slice ?
            name : Array.prototype.slice.call(arguments, 0);
        this.name = args[0];
        this.args = args.slice(1);
    }

    /**
     * String representation of a command
     * @returns {string}
     */
    Command.prototype.toString = function(){
        return this.name + ' ' + this.args.join(' ');
    };

    return SvgPath;

}));
});

'use strict';

// TODO: for positioning choose biggest delta between x and y, it will be one of two (i.e. bottom or left), so choose the one that's the largest delta from the other point's (maybe)

// Spacing between line and node
const lineOffset = 20;
const elmNames = ['text', 'textContainer', 'coachTop', 'coachLeft', 'coachRight', 'coachBottom', 'glow', 'closeButton', 'svg', 'path'];

function clear() {
  hideAll();

  elmNames.forEach(name => {
    const node = cache(name);
    if (node instanceof Node) {
      node.remove();
      cache.remove(name);
    }
  });
}

function redrawAll() {
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

function draw(name) {
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

function addText(textStr) {
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

  // let fromPos = nearestEdgePoint(fromRect, toRect, { useCorners: false });
  // let toPos = nearestEdgePoint(toRect, fromRect, { useCorners: false });
  // fromPos = nearestEdgePoint(fromPos, toRect);
  // toPos = nearestEdgePoint(toPos, fromRect);
  const fromPos = arrowPoints(fromRect, toRect);
  const toPos = arrowPoints(toRect, fromRect);

  // NOTE: for curved line
  const mid = midPoint(fromPos[0], fromPos[1], toPos[0], toPos[1]);
  // let c1x = mid[0];
  // let c1y = toPos[1];
  // const c2x = fromPos[0];
  // const c2y = mid[1];

  // Find point, 50% of segment length away from midPoint
  const dist = lineDist(fromPos[0], fromPos[1], toPos[0], toPos[1]);
  // const vMid = viewportMid();
  const coords = arrayPolar([fromPos[0], fromPos[1], toPos[0], toPos[1]], [fromPos[0], fromPos[1]]);
  // const midCoords = polar([fromPos[0], fromPos[1], mid[0], mid[1]], [fromPos[0], fromPos[1]]);
  const angle = coords[3];
  let deg = angle * 180 / Math.PI;
  deg = deg < 0 ? deg + 360 : deg;
  const degPerp = deg - 90;
  const degPerpRad = degPerp * Math.PI / 180;
  const newCoords = arrayPolar.cartesian([0, Math.PI, dist * 0.33, degPerpRad]);
  const midCtrl = [mid[0] + newCoords[2], mid[1] + newCoords[3]];

  // const sl = slope(fromPos[0], fromPos[1], toPos[0], toPos[1]);
  // const recip = -1 / sl;
  // console.log('SLOPE', sl, recip);

  // const pathStr = SvgPath().M(fromPos[0], fromPos[1]).C(c2x, c2y, c1x, c1y, toPos[0], toPos[1]).str();
  // NOTE: quadratic curve using these args looks better. Also arrowhead orients right

  // const pathStr = SvgPath().M(fromPos[0], fromPos[1]).Q(c1x, c1y, toPos[0], toPos[1]).str();

  // NOTE: This is a nice smooth quadratic bezier curve
  const pathStr = svgPath().M(fromPos[0], fromPos[1]).Q(midCtrl[0], midCtrl[1], toPos[0], toPos[1]).str();

  // const pathStr = SvgPath().M(fromPos[0], fromPos[1]).L(toPos[0], toPos[1]).str();

  // Bezier S-Curve
  // const dx = toPos[0] - fromPos[0];
  // const dy = toPos[1] - fromPos[1];
  // pathStr = SvgPath().M(fromPos[0], fromPos[1]).C(fromPos[0] + (dx * 0.33), fromPos[1], fromPos[0] + (dx * 0.67), toPos[1], toPos[0], toPos[1]).str();
  // End Bezier S-Curve

  const svg = cache.default('svg', () => createSVG());
  const path = cache.default('path', () => document.createElementNS('http://www.w3.org/2000/svg', 'path'));

  path.setAttribute('d', pathStr);
  path.setAttribute('class', 'coachmark-line');
  path.setAttribute('stroke-width', '5');
  path.setAttribute('fill', 'none');
  path.setAttribute('filter', 'url(#coachmark-chalk)');
  path.setAttribute('marker-end', 'url(#arrow)');
  path.setAttribute('stroke-dasharray', '50, 15');

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

function arrowPoints(from, to, opts = {}) {
  // From is a rect, calc line from middle of rectangle
  // const fromPt = middleOf(from);
  // const toPt = middleOf(to);

  const nearestFrom = nearestEdgePoint(from, to);
  const nearestTo = nearestEdgePoint(to, from);

  const dx = nearestTo[0] - nearestFrom[0];
  const dy = nearestTo[1] - nearestFrom[1];

  opts.favor = (dx > dy) ? 'x' : 'y';

  return nearestEdgePoint(nearestFrom, to, opts);
}

function nearestEdgePoint(from, toRect, { useCorners, favor } = {}) {
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

  if (favor && favor === 'x') {
    // Remove top/bottom edges
    Object.keys(points).forEach(key => {
      if (/left|right/i.test(key)) delete points[key];
    });
  } else if (favor && favor === 'y') {
    // Remove left/right edges
    Object.keys(points).forEach(key => {
      if (/top|bottom/i.test(key)) delete points[key];
    });
  }

  let nearest = { point: [0, 0], dist: Infinity };
  let nearestName = '';
  Object.keys(points).forEach(key => {
    const point = points[key];
    const dist = euclideanDistance(from, point);
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

___$insertStyle(".coachmark {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  margin: 0;\n  padding: 0;\n  /*background: #000;*/\n  /*opacity: 0.60;*/\n  z-index: 100; }\n\n.coachmark-top,\n.coachmark-left,\n.coachmark-right,\n.coachmark-bottom {\n  position: fixed;\n  background: #000;\n  opacity: 0.66;\n  margin: 0;\n  padding: 0; }\n\n.coachmark-top {\n  top: 0;\n  left: 0;\n  right: 0;\n  width: 100%; }\n\n.coachmark-left {\n  left: 0; }\n\n.coachmark-right {\n  right: 0; }\n\n.coachmark-bottom {\n  bottom: 0;\n  left: 0;\n  right: 0;\n  width: 100%; }\n\n.coachmark-glow {\n  position: absolute;\n  /*z-index: 101;*/\n  /*box-shadow: 0 0 120px 50px #fff;*/ }\n\n.coachmark-text-container {\n  position: fixed;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 5vmin; }\n\n.coachmark-text {\n  font-size: 15vmin;\n  line-height: 15vmin;\n  color: #fefefe;\n  text-shadow: 2px 2px #333;\n  z-index: 2; }\n\n.coachmark-svg {\n  position: fixed;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  z-index: 1; }\n\n.coachmark-line {\n  stroke: #A7CC6B; }\n\npath.coachmark-line {\n  stroke-width: 1vmin; }\n\n.coachmark-close {\n  z-index: 9999;\n  background-color: #A7CC6B;\n  border-radius: 50%;\n  height: 56px;\n  width: 56px;\n  position: fixed;\n  top: 0;\n  right: 0;\n  color: #fff;\n  margin: 5vmin;\n  font-size: 36px;\n  line-height: 56px;\n  text-align: center;\n  cursor: pointer;\n  box-shadow: 0 2px 2px 0 rgba(255, 255, 255, 0.12), 0 1px 5px 0 rgba(255, 255, 255, 0.12), 0 3px 1px -2px rgba(255, 255, 255, 0.2); }\n");

var svg = "  <defs>\n    <filter id=\"coachmark-chalk\" x=\"0\" y=\"0\" height=\"5000px\" width=\"5000px\" color-interpolation-filters=\"sRGB\" filterUnits=\"userSpaceOnUse\">\n      <feTurbulence baseFrequency=\"0.133\" seed=\"500\" result=\"result1\" numOctaves=\"1\" type=\"turbulence\"/>\n      <feOffset result=\"result2\" dx=\"0\" dy=\"0\"/>\n      <feDisplacementMap scale=\"5\" yChannelSelector=\"G\" in2=\"result1\" xChannelSelector=\"R\" in=\"SourceGraphic\"/>\n      <feGaussianBlur stdDeviation=\"0.5\"/>\n    </filter>\n    <marker id=\"arrow\" class=\"coachmark-line\" markerWidth=\"500\" markerHeight=\"800\" refX=\"9.5\" refY=\"4.5\" orient=\"auto\" overflow=\"visible\" markerUnits=\"strokeWidth\">\n      <!--<path d=\"M0,0 L0,6 L9,3 z\" stroke=\"#fff\" fill=\"#fff\" />-->\n      <!--<polyline points=\"-2,-2 0,0 -2,2\" stroke=\"#fff\" fill=\"none\" vector-effect=\"non-scaling-stroke\" />-->\n\n      <!-- <polyline points=\"1 1, 9 5, 1 7\" fill=\"none\" /> -->\n      <polyline points=\"1 1.5, 10 4.5, 2 7\" fill=\"none\" />\n    </marker>\n\n    <!-- NOTE: arrowhead is not being used -->\n    <!-- <marker id=\"arrowhead\" viewBox=\"0 0 10 10\" refX=\"3\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto\">\n      <path d=\"M 0 0 L 10 5 L 0 10 z\" />\n    </marker> -->\n\n    <filter id=\"coachmark-drop-shadow\" x=\"0\" y=\"0\" height=\"5000px\" width=\"5000px\">\n       <feOffset result=\"offOut\" in=\"SourceAlpha\" dx=\"0\" dy=\"5\" />\n       <feGaussianBlur result=\"blurOut\" in=\"offOut\" stdDeviation=\"3\" />\n       <feBlend in=\"SourceGraphic\" in2=\"blurOut\" mode=\"normal\" />\n    </filter>\n\n    <filter id=\"test-filter\">\n      <feMorphology operator=\"dilate\" radius=\"4\" in=\"SourceAlpha\" result=\"BEVEL_10\" />\n      <feConvolveMatrix order=\"3,3\" kernelMatrix=\n   \"1 0 0\n   0 1 0\n   0 0 1\" in=\"BEVEL_10\" result=\"BEVEL_20\" />\n      <feOffset dx=\"10\" dy=\"10\" in=\"BEVEL_20\" result=\"BEVEL_30\"/>\n      <feComposite operator=\"out\" in=\"BEVEL_20\" in2=\"BEVEL_10\" result=\"BEVEL_30\"/>\n      <feFlood flood-color=\"#fff\" result=\"COLOR-red\" />\n      <feComposite in=\"COLOR-red\" in2=\"BEVEL_30\" operator=\"in\" result=\"BEVEL_40\" />\n\n      <feMerge result=\"BEVEL_50\">\n         <feMergeNode in=\"BEVEL_40\" />\n         <feMergeNode in=\"SourceGraphic\" />\n      </feMerge>\n    </filter>\n  </defs>\n";

function injectSVG() {
  const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  s.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  s.setAttribute('width', 0);
  s.setAttribute('height', 0);
  s.innerHTML = svg;
  document.body.insertBefore(s, document.body.firstChild);
  return s;
}

init();

var index = {
  // Add a coachmark
  add(name, config = {}) {
    if (!(typeof name === 'string')) {
      config = name;
      name = Math.random().toString(36).substr(2);
    }

    cache(name, config);
  },
  // Show a coachmark given a name
  show(name) {
    clear();
    draw(name);
  },
  cache: () => cache.cache,
  draw,
  redrawAll,
};

function init() {
  document.addEventListener('DOMContentLoaded', () => {
    // injectCSS();
    injectSVG();
    addListeners();
  });
}

function addListeners() {
  window.addEventListener('resize', () => {
    requestAnimationFrame(() => {
      redrawAll();
    });
  });
}

return index;

})));
//# sourceMappingURL=coachmarks.js.map
