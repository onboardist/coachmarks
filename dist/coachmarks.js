var coachmarks =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 27);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(22)('wks');
var uid = __webpack_require__(23);
var Symbol = __webpack_require__(0).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.0' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(10);
var createDesc = __webpack_require__(20);
module.exports = __webpack_require__(6) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(11);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(12)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 7 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(34);
var defined = __webpack_require__(9);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(5);
var IE8_DOM_DEFINE = __webpack_require__(38);
var toPrimitive = __webpack_require__(39);
var dP = Object.defineProperty;

exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(22)('keys');
var uid = __webpack_require__(23);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getIterator2 = __webpack_require__(28);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cache() {
  return cache.addOrGet.apply(cache, arguments);
}

cache.init = function () {
  if (!cache.cache) {
    cache.cache = {};
  }
};

cache.addOrGet = function (name, obj) {
  cache.init();
  if (typeof obj === 'undefined') {
    // Get
    return cache.get(name);
  }

  // Set
  cache.add(name, obj);

  return obj;
};

cache.get = function (name) {
  cache.init();
  return cache.cache[name];
};

cache.add = function (name, obj) {
  cache.init();
  cache.cache[name] = obj;
  return obj;
};

cache.remove = function (name) {
  cache.init();
  if (name) cache.cache[name] = undefined;
};

cache.clear = function () {
  cache.init();
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(cache.cache), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var c = _step.value;

      cache.cache[c] = undefined;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};

cache.default = function (name, defaultFn) {
  var obj = cache(name);

  if (obj === undefined) return cache(name, defaultFn.call());
  return obj;
};

cache.all = function () {
  cache.init();
  return cache.cache;
};

cache.allArray = function () {
  cache.init();
  var elms = [];
  for (var key in cache) {
    if (Object.prototype.hasOwnProperty.call(cache.cache, key)) {
      elms.push({ key: cache.cache[key] });
    }
  }

  return elms;
};

module.exports = cache;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(35);
var $export = __webpack_require__(18);
var redefine = __webpack_require__(40);
var hide = __webpack_require__(3);
var has = __webpack_require__(7);
var Iterators = __webpack_require__(4);
var $iterCreate = __webpack_require__(41);
var setToStringTag = __webpack_require__(25);
var getPrototypeOf = __webpack_require__(49);
var ITERATOR = __webpack_require__(1)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var core = __webpack_require__(2);
var ctx = __webpack_require__(36);
var hide = __webpack_require__(3);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(11);
var document = __webpack_require__(0).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(44);
var enumBugKeys = __webpack_require__(24);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(10).f;
var has = __webpack_require__(7);
var TAG = __webpack_require__(1)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(9);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _cache2 = __webpack_require__(15);

var _cache3 = _interopRequireDefault(_cache2);

var _draw = __webpack_require__(55);

var _main = __webpack_require__(63);

var _main2 = _interopRequireDefault(_main);

var _injectSvg = __webpack_require__(68);

var _injectSvg2 = _interopRequireDefault(_injectSvg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Run on module load

// import injectCSS from './inject-css';
init(); /* eslint no-unused-vars: 0 */


module.exports = {
  // Add a coachmark
  add: function add(name) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!(typeof name === 'string')) {
      config = name;
      name = Math.random().toString(36).substr(2);
    }

    (0, _cache3.default)(name, config);
  },

  // Show a coachmark given a name
  show: function show(name) {
    (0, _draw.clear)();
    (0, _draw.draw)(name);
  },

  cache: function cache() {
    return _cache3.default.cache;
  },
  draw: _draw.draw,
  redrawAll: _draw.redrawAll
};

function init() {
  document.addEventListener('DOMContentLoaded', function () {
    // injectCSS();
    (0, _injectSvg2.default)();
    addListeners();
  });
}

function addListeners() {
  window.addEventListener('resize', function () {
    requestAnimationFrame(function () {
      (0, _draw.redrawAll)();
    });
  });

  window.addEventListener('resize', function () {
    requestAnimationFrame(function () {
      (0, _draw.redrawAll)();
    });
  });
}

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(29), __esModule: true };

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(30);
__webpack_require__(50);
module.exports = __webpack_require__(52);


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(31);
var global = __webpack_require__(0);
var hide = __webpack_require__(3);
var Iterators = __webpack_require__(4);
var TO_STRING_TAG = __webpack_require__(1)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(32);
var step = __webpack_require__(33);
var Iterators = __webpack_require__(4);
var toIObject = __webpack_require__(8);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(17)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(16);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(37);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(6) && !__webpack_require__(12)(function () {
  return Object.defineProperty(__webpack_require__(19)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(11);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(42);
var descriptor = __webpack_require__(20);
var setToStringTag = __webpack_require__(25);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(3)(IteratorPrototype, __webpack_require__(1)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(5);
var dPs = __webpack_require__(43);
var enumBugKeys = __webpack_require__(24);
var IE_PROTO = __webpack_require__(14)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(19)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(48).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(10);
var anObject = __webpack_require__(5);
var getKeys = __webpack_require__(21);

module.exports = __webpack_require__(6) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(7);
var toIObject = __webpack_require__(8);
var arrayIndexOf = __webpack_require__(45)(false);
var IE_PROTO = __webpack_require__(14)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(8);
var toLength = __webpack_require__(46);
var toAbsoluteIndex = __webpack_require__(47);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(13);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(13);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(0).document;
module.exports = document && document.documentElement;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(7);
var toObject = __webpack_require__(26);
var IE_PROTO = __webpack_require__(14)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(51)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(17)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(13);
var defined = __webpack_require__(9);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(5);
var get = __webpack_require__(53);
module.exports = __webpack_require__(2).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(54);
var ITERATOR = __webpack_require__(1)('iterator');
var Iterators = __webpack_require__(4);
module.exports = __webpack_require__(2).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(16);
var TAG = __webpack_require__(1)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = __webpack_require__(56);

var _keys2 = _interopRequireDefault(_keys);

exports.clear = clear;
exports.redrawAll = redrawAll;
exports.draw = draw;
exports.addText = addText;

var _euclideanDistance = __webpack_require__(60);

var _euclideanDistance2 = _interopRequireDefault(_euclideanDistance);

var _svgPath = __webpack_require__(62);

var _svgPath2 = _interopRequireDefault(_svgPath);

var _cache = __webpack_require__(15);

var _cache2 = _interopRequireDefault(_cache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: for positioning choose biggest delta between x and y, it will be one of two (i.e. bottom or left), so choose the one that's the largest delta from the other point's (maybe)

// Spacing between line and node
var lineOffset = 20;
var elmNames = ['text', 'coachTop', 'coachLeft', 'coachRight', 'coachBottom', 'glow', 'closeButton', 'svg', 'path'];

function clear() {
  // debugger;
  elmNames.forEach(function (name) {
    var node = (0, _cache2.default)(name);
    if (node instanceof Node) {
      node.remove();
      _cache2.default.remove(name);
    }
  });
}

function redrawAll() {
  var all = _cache2.default.all();

  (0, _keys2.default)(all).forEach(function (key) {
    var item = (0, _cache2.default)(key);
    if (!(item instanceof Node)) {
      draw(key);
    }
  });
}

function draw(name) {
  var mark = (0, _cache2.default)(name);
  if (!mark) throw new Error('Coachmark with name \'' + name + '\' not found');

  var coached = coach(mark);
  var text = addText(mark.text);
  arrow(coached, text);
}

function coach(mark) {
  if (!mark) throw new Error('Coachmark with name \'' + name + '\' not found');

  var elm = _cache2.default.default('elm', function () {
    return document.querySelector(mark.target);
  });

  if (elm.className.indexOf('draggable-source') === -1) elm.className += ' draggable-source';

  elm.style.position = 'absolute';
  elm.style['z-index'] = 102;

  var borderRadius = window.getComputedStyle(elm).getPropertyValue('border-radius');
  // borderRadius = parseInt(borderRadius, 10);

  var top = elm.offsetTop;
  var left = elm.offsetLeft;
  var width = elm.offsetWidth;
  var height = elm.offsetHeight;
  var right = left + width;
  var bottom = top + height;

  var coachTop = _cache2.default.default('coachTop', function () {
    return document.createElement('div');
  });
  coachTop.className = 'coachmark-top';
  var coachLeft = _cache2.default.default('coachLeft', function () {
    return document.createElement('div');
  });
  coachLeft.className = 'coachmark-left';
  var coachRight = _cache2.default.default('coachRight', function () {
    return document.createElement('div');
  });
  coachRight.className = 'coachmark-right';
  var coachBottom = _cache2.default.default('coachBottom', function () {
    return document.createElement('div');
  });
  coachBottom.className = 'coachmark-bottom';

  coachTop.style.height = top + 'px';
  coachLeft.style.top = top + 'px';
  coachRight.style.top = coachLeft.style.top;
  coachLeft.style.height = height + 'px';
  coachRight.style.height = coachLeft.style.height;
  coachLeft.style.width = left + 'px';
  coachRight.style.left = right + 'px';
  coachBottom.style.top = bottom + 'px';

  var glow = _cache2.default.default('glow', function () {
    return document.createElement('div');
  });

  glow.className = 'coachmark-glow';
  glow.style.top = top + 'px';
  glow.style.left = left + 'px';
  glow.style.width = width + 'px';
  glow.style.height = height + 'px';
  glow.style['border-radius'] = borderRadius;
  glow.style['box-shadow'] = '0 0 ' + 20 + 'px ' + 10 + 'px #fff';

  var close = createCloseButton();

  [coachTop, coachLeft, coachRight, coachBottom, glow, close].forEach(function (c) {
    if (!c.parentNode) {
      document.body.appendChild(c);
    }
  });

  return elm;
}

function addText(textStr) {
  var text = _cache2.default.default('text', function () {
    var text = document.createElement('div');
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
  var fromRect = elementRect(from);
  var toRect = elementRect(to);

  var fromPos = nearestEdgePoint(fromRect, toRect);
  var toPos = nearestEdgePoint(toRect, fromRect);
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

  var pathStr = (0, _svgPath2.default)().M(fromPos[0], fromPos[1]).L(toPos[0], toPos[1]).str();

  var svg = _cache2.default.default('svg', function () {
    return createSVG();
  });
  var path = _cache2.default.default('path', function () {
    return document.createElementNS('http://www.w3.org/2000/svg', 'path');
  });

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
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('height', '100%');
  svg.setAttribute('width', '100%');
  svg.setAttribute('class', 'coachmark-svg');
  return svg;
}

function createCloseButton() {
  var close = _cache2.default.default('closeButton', function () {
    return document.createElement('div');
  });
  close.setAttribute('class', 'coachmark-close');
  close.innerHTML = 'X';
  close.addEventListener('click', function () {
    return clear();
  });
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

  // Get list of point around toRect;
  var points = {
    leftTop: [toRect.left, toRect.top],
    middleTop: [toRect.left + toRect.width / 2, toRect.top],
    rightTop: [toRect.left + toRect.width, toRect.top],
    rightMiddle: [toRect.left + toRect.width, toRect.top + toRect.height / 2],
    rightBottom: [toRect.left + toRect.width, toRect.top + toRect.height],
    middleBottom: [toRect.left + toRect.width / 2, toRect.top + toRect.height],
    leftBottom: [toRect.left, toRect.top + toRect.height],
    leftMiddle: [toRect.left, toRect.top + toRect.height / 2]
  };

  var nearest = { point: [0, 0], dist: Infinity };
  var nearestName = '';
  (0, _keys2.default)(points).forEach(function (key) {
    var point = points[key];
    var dist = (0, _euclideanDistance2.default)(from, point);
    if (dist < nearest.dist) {
      nearest = { point: point, dist: dist };
      nearestName = key;
    }
  });

  nearestName = nearestName.toLowerCase();
  var point = nearest.point;

  if (nearestName.indexOf('top') !== -1) point[1] -= lineOffset;
  if (nearestName.indexOf('bottom') !== -1) point[1] += lineOffset;
  if (nearestName.indexOf('left') !== -1) point[0] -= lineOffset;
  if (nearestName.indexOf('right') !== -1) point[0] += lineOffset;

  return point;
}

function middleOf(node) {
  var rect = node;
  if (node instanceof Node) {
    rect = elementRect(node);
  }

  return [rect.left + rect.width / 2, rect.top + rect.height / 2];
}

function middleOfEdge(node, edge) {
  var rect = elementRect(node);

  var width = rect.width;
  var height = rect.height;
  var middleX = rect.width / 2;
  var middleY = rect.height / 2;
  var x = rect.left + middleX;
  var y = rect.top + middleY;

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

  var rect = node.getBoundingClientRect();
  var prect = offsetParent ? offsetParent.getBoundingClientRect() : { left: 0, top: 0 };

  return {
    left: rect.left - prect.left,
    top: rect.top - prect.top,
    width: rect.width,
    height: rect.height
  };
}

function midPoint(x1, y1, x2, y2) {
  return [(x1 + x2) / 2, (y1 + y2) / 2];
}

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

function intersectionEdge(point, rect) {
  var slope = (rect.top - point.y) / (rect.left - point.x);
  var hsw = slope * rect.width / 2;
  var hsh = rect.height / 2 / slope;
  var hh = rect.height / 2;
  var hw = rect.width / 2;
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

// function clear() {
//   const vals = cache.all();
//
//   for (const key in vals) {
//     if (Object.hasOwnProperty.call(vals, key)) {
//       const val = vals[key];
//       if (isElement(val)) {
//         val.remove();
//         cache.remove(key);
//       }
//     }
//   }
// }

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

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(57), __esModule: true };

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(58);
module.exports = __webpack_require__(2).Object.keys;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(26);
var $keys = __webpack_require__(21);

__webpack_require__(59)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(18);
var core = __webpack_require__(2);
var fails = __webpack_require__(12);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// http://en.wikipedia.org/wiki/Euclidean_distance#Three_dimensions

var distanceSquared = __webpack_require__(61)

module.exports = function (a, b) {
  return Math.sqrt(distanceSquared(a,b))
}


/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = function (a, b) {
  var sum = 0
  var n
  for (n = 0; n < a.length; n++) {
    sum += Math.pow(a[n] - b[n], 2)
  }
  return sum
}


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * SvgPath
 * Chainable SVG path string generator with some sugar added
 * Supports Node, AMD and browser environments (EcmaScript 5+ or shims)
 * No dependencies
 * @version 0.2.1
 * @author Igor Zalutsky
 * @license MIT
 */
(function (root, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.SvgPath = factory();
    }
}(this, function () {
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


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(64);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(66)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./main.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./main.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(65)(undefined);
// imports


// module
exports.push([module.i, ".coachmark {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  margin: 0;\n  padding: 0;\n  /*background: #000;*/\n  /*opacity: 0.60;*/\n  z-index: 100; }\n\n.coachmark-top,\n.coachmark-left,\n.coachmark-right,\n.coachmark-bottom {\n  position: fixed;\n  background: #000;\n  opacity: 0.66;\n  margin: 0;\n  padding: 0; }\n\n.coachmark-top {\n  top: 0;\n  left: 0;\n  right: 0;\n  width: 100%; }\n\n.coachmark-left {\n  left: 0; }\n\n.coachmark-right {\n  right: 0; }\n\n.coachmark-bottom {\n  bottom: 0;\n  left: 0;\n  right: 0;\n  width: 100%; }\n\n.coachmark-glow {\n  position: absolute;\n  /*z-index: 101;*/\n  /*box-shadow: 0 0 120px 50px #fff;*/ }\n\n.coachmark-text {\n  font-size: 15vmin;\n  line-height: 15vmin;\n  color: #fefefe;\n  /* text-decoration: underline; */\n  position: fixed;\n  top: 134;\n  left: 596px;\n  text-shadow: 2px 2px #333;\n  /*margin: 20px;*/\n  z-index: 2; }\n\n.coachmark-svg {\n  position: fixed;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  z-index: 1; }\n\n.coachmark-line {\n  stroke: #A7CC6B; }\n\npath.coachmark-line {\n  stroke-width: 1.25vmin; }\n\n.coachmark-close {\n  z-index: 9999;\n  background-color: #A7CC6B;\n  border-radius: 50%;\n  height: 56px;\n  width: 56px;\n  position: fixed;\n  top: 0;\n  right: 0;\n  color: #fff;\n  margin: 5vmin;\n  font-size: 36px;\n  line-height: 56px;\n  text-align: center;\n  cursor: pointer;\n  box-shadow: 0 2px 2px 0 rgba(255, 255, 255, 0.12), 0 1px 5px 0 rgba(255, 255, 255, 0.12), 0 3px 1px -2px rgba(255, 255, 255, 0.2); }\n", ""]);

// exports


/***/ }),
/* 65 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(67);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 67 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = injectSVG;

var _svgDefs = __webpack_require__(69);

var _svgDefs2 = _interopRequireDefault(_svgDefs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// <svg width="0" height="0" xmlns="http://www.w3.org/2000/svg">
// const content = `
//   <defs>
//     <filter id="coachmark-chalk" x="0" y="0" height="5000px" width="5000px" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
//       <feTurbulence baseFrequency="0.133" seed="500" result="result1" numOctaves="1" type="turbulence"/>
//       <feOffset result="result2" dx="0" dy="0"/>
//       <feDisplacementMap scale="5" yChannelSelector="G" in2="result1" xChannelSelector="R" in="SourceGraphic"/>
//       <feGaussianBlur stdDeviation="0.5"/>
//     </filter>
//     <marker id="arrow" class="coachmark-line" markerWidth="10" markerHeight="8" refX="9.5" refY="4.5" orient="auto" markerUnits="strokeWidth">
//       <!--<path d="M0,0 L0,6 L9,3 z" stroke="#fff" fill="#fff" />-->
//       <!--<polyline points="-2,-2 0,0 -2,2" stroke="#fff" fill="none" vector-effect="non-scaling-stroke" />-->
//
//       <!-- <polyline points="1 1, 9 5, 1 7" fill="none" /> -->
//       <polyline points="1 1.5, 10 4.5, 2 7" fill="none" />
//     </marker>
//
//     <!-- NOTE: arrowhead is not being used -->
//     <marker id="arrowhead" viewBox="0 0 10 10" refX="3" refY="5" markerWidth="6" markerHeight="6" orient="auto">
//       <path d="M 0 0 L 10 5 L 0 10 z" />
//     </marker>
//   </defs>
// `;
// </svg>

function injectSVG() {
  var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  s.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  s.setAttribute('width', 0);
  s.setAttribute('height', 0);
  s.innerHTML = _svgDefs2.default;
  // const div = document.createElement('div');
  // div.innerHTML = svg;
  document.body.appendChild(s);
  return s;
}

/***/ }),
/* 69 */
/***/ (function(module, exports) {

module.exports = "  <defs>\n    <filter id=\"coachmark-chalk\" x=\"0\" y=\"0\" height=\"5000px\" width=\"5000px\" color-interpolation-filters=\"sRGB\" filterUnits=\"userSpaceOnUse\">\n      <feTurbulence baseFrequency=\"0.133\" seed=\"500\" result=\"result1\" numOctaves=\"1\" type=\"turbulence\"/>\n      <feOffset result=\"result2\" dx=\"0\" dy=\"0\"/>\n      <feDisplacementMap scale=\"5\" yChannelSelector=\"G\" in2=\"result1\" xChannelSelector=\"R\" in=\"SourceGraphic\"/>\n      <feGaussianBlur stdDeviation=\"0.5\"/>\n    </filter>\n    <marker id=\"arrow\" class=\"coachmark-line\" markerWidth=\"10\" markerHeight=\"8\" refX=\"9.5\" refY=\"4.5\" orient=\"auto\" markerUnits=\"strokeWidth\">\n      <!--<path d=\"M0,0 L0,6 L9,3 z\" stroke=\"#fff\" fill=\"#fff\" />-->\n      <!--<polyline points=\"-2,-2 0,0 -2,2\" stroke=\"#fff\" fill=\"none\" vector-effect=\"non-scaling-stroke\" />-->\n\n      <!-- <polyline points=\"1 1, 9 5, 1 7\" fill=\"none\" /> -->\n      <polyline points=\"1 1.5, 10 4.5, 2 7\" fill=\"none\" />\n    </marker>\n\n    <!-- NOTE: arrowhead is not being used -->\n    <marker id=\"arrowhead\" viewBox=\"0 0 10 10\" refX=\"3\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto\">\n      <path d=\"M 0 0 L 10 5 L 0 10 z\" />\n    </marker>\n  </defs>\n"

/***/ })
/******/ ]);
//# sourceMappingURL=coachmarks.js.map