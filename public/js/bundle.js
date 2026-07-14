// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../../node_modules/core-js/modules/_global.js":[function(require,module,exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],"../../node_modules/core-js/modules/_core.js":[function(require,module,exports) {
var core = module.exports = { version: '2.6.12' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],"../../node_modules/core-js/modules/_is-object.js":[function(require,module,exports) {
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],"../../node_modules/core-js/modules/_an-object.js":[function(require,module,exports) {
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":"../../node_modules/core-js/modules/_is-object.js"}],"../../node_modules/core-js/modules/_fails.js":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],"../../node_modules/core-js/modules/_descriptors.js":[function(require,module,exports) {
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":"../../node_modules/core-js/modules/_fails.js"}],"../../node_modules/core-js/modules/_dom-create.js":[function(require,module,exports) {
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_is-object":"../../node_modules/core-js/modules/_is-object.js","./_global":"../../node_modules/core-js/modules/_global.js"}],"../../node_modules/core-js/modules/_ie8-dom-define.js":[function(require,module,exports) {
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":"../../node_modules/core-js/modules/_descriptors.js","./_fails":"../../node_modules/core-js/modules/_fails.js","./_dom-create":"../../node_modules/core-js/modules/_dom-create.js"}],"../../node_modules/core-js/modules/_to-primitive.js":[function(require,module,exports) {
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
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

},{"./_is-object":"../../node_modules/core-js/modules/_is-object.js"}],"../../node_modules/core-js/modules/_object-dp.js":[function(require,module,exports) {
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
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

},{"./_an-object":"../../node_modules/core-js/modules/_an-object.js","./_ie8-dom-define":"../../node_modules/core-js/modules/_ie8-dom-define.js","./_to-primitive":"../../node_modules/core-js/modules/_to-primitive.js","./_descriptors":"../../node_modules/core-js/modules/_descriptors.js"}],"../../node_modules/core-js/modules/_property-desc.js":[function(require,module,exports) {
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],"../../node_modules/core-js/modules/_hide.js":[function(require,module,exports) {
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_object-dp":"../../node_modules/core-js/modules/_object-dp.js","./_property-desc":"../../node_modules/core-js/modules/_property-desc.js","./_descriptors":"../../node_modules/core-js/modules/_descriptors.js"}],"../../node_modules/core-js/modules/_has.js":[function(require,module,exports) {
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],"../../node_modules/core-js/modules/_uid.js":[function(require,module,exports) {
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],"../../node_modules/core-js/modules/_library.js":[function(require,module,exports) {
module.exports = false;

},{}],"../../node_modules/core-js/modules/_shared.js":[function(require,module,exports) {

var core = require('./_core');
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: require('./_library') ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});

},{"./_core":"../../node_modules/core-js/modules/_core.js","./_global":"../../node_modules/core-js/modules/_global.js","./_library":"../../node_modules/core-js/modules/_library.js"}],"../../node_modules/core-js/modules/_function-to-string.js":[function(require,module,exports) {
module.exports = require('./_shared')('native-function-to-string', Function.toString);

},{"./_shared":"../../node_modules/core-js/modules/_shared.js"}],"../../node_modules/core-js/modules/_redefine.js":[function(require,module,exports) {

var global = require('./_global');
var hide = require('./_hide');
var has = require('./_has');
var SRC = require('./_uid')('src');
var $toString = require('./_function-to-string');
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

require('./_core').inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

},{"./_global":"../../node_modules/core-js/modules/_global.js","./_hide":"../../node_modules/core-js/modules/_hide.js","./_has":"../../node_modules/core-js/modules/_has.js","./_uid":"../../node_modules/core-js/modules/_uid.js","./_function-to-string":"../../node_modules/core-js/modules/_function-to-string.js","./_core":"../../node_modules/core-js/modules/_core.js"}],"../../node_modules/core-js/modules/_a-function.js":[function(require,module,exports) {
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],"../../node_modules/core-js/modules/_ctx.js":[function(require,module,exports) {
// optional / simple context binding
var aFunction = require('./_a-function');
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

},{"./_a-function":"../../node_modules/core-js/modules/_a-function.js"}],"../../node_modules/core-js/modules/_export.js":[function(require,module,exports) {

var global = require('./_global');
var core = require('./_core');
var hide = require('./_hide');
var redefine = require('./_redefine');
var ctx = require('./_ctx');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
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

},{"./_global":"../../node_modules/core-js/modules/_global.js","./_core":"../../node_modules/core-js/modules/_core.js","./_hide":"../../node_modules/core-js/modules/_hide.js","./_redefine":"../../node_modules/core-js/modules/_redefine.js","./_ctx":"../../node_modules/core-js/modules/_ctx.js"}],"../../node_modules/core-js/modules/_cof.js":[function(require,module,exports) {
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],"../../node_modules/core-js/modules/_is-array.js":[function(require,module,exports) {
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};

},{"./_cof":"../../node_modules/core-js/modules/_cof.js"}],"../../node_modules/core-js/modules/_to-integer.js":[function(require,module,exports) {
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],"../../node_modules/core-js/modules/_to-length.js":[function(require,module,exports) {
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":"../../node_modules/core-js/modules/_to-integer.js"}],"../../node_modules/core-js/modules/_wks.js":[function(require,module,exports) {
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_shared":"../../node_modules/core-js/modules/_shared.js","./_uid":"../../node_modules/core-js/modules/_uid.js","./_global":"../../node_modules/core-js/modules/_global.js"}],"../../node_modules/core-js/modules/_flatten-into-array.js":[function(require,module,exports) {
'use strict';
// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = require('./_is-array');
var isObject = require('./_is-object');
var toLength = require('./_to-length');
var ctx = require('./_ctx');
var IS_CONCAT_SPREADABLE = require('./_wks')('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;

},{"./_is-array":"../../node_modules/core-js/modules/_is-array.js","./_is-object":"../../node_modules/core-js/modules/_is-object.js","./_to-length":"../../node_modules/core-js/modules/_to-length.js","./_ctx":"../../node_modules/core-js/modules/_ctx.js","./_wks":"../../node_modules/core-js/modules/_wks.js"}],"../../node_modules/core-js/modules/_defined.js":[function(require,module,exports) {
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],"../../node_modules/core-js/modules/_to-object.js":[function(require,module,exports) {
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":"../../node_modules/core-js/modules/_defined.js"}],"../../node_modules/core-js/modules/_array-species-constructor.js":[function(require,module,exports) {
var isObject = require('./_is-object');
var isArray = require('./_is-array');
var SPECIES = require('./_wks')('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};

},{"./_is-object":"../../node_modules/core-js/modules/_is-object.js","./_is-array":"../../node_modules/core-js/modules/_is-array.js","./_wks":"../../node_modules/core-js/modules/_wks.js"}],"../../node_modules/core-js/modules/_array-species-create.js":[function(require,module,exports) {
// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = require('./_array-species-constructor');

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};

},{"./_array-species-constructor":"../../node_modules/core-js/modules/_array-species-constructor.js"}],"../../node_modules/core-js/modules/_add-to-unscopables.js":[function(require,module,exports) {
// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = require('./_wks')('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) require('./_hide')(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};

},{"./_wks":"../../node_modules/core-js/modules/_wks.js","./_hide":"../../node_modules/core-js/modules/_hide.js"}],"../../node_modules/core-js/modules/es7.array.flat-map.js":[function(require,module,exports) {
'use strict';
// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = require('./_export');
var flattenIntoArray = require('./_flatten-into-array');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var aFunction = require('./_a-function');
var arraySpeciesCreate = require('./_array-species-create');

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

require('./_add-to-unscopables')('flatMap');

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_flatten-into-array":"../../node_modules/core-js/modules/_flatten-into-array.js","./_to-object":"../../node_modules/core-js/modules/_to-object.js","./_to-length":"../../node_modules/core-js/modules/_to-length.js","./_a-function":"../../node_modules/core-js/modules/_a-function.js","./_array-species-create":"../../node_modules/core-js/modules/_array-species-create.js","./_add-to-unscopables":"../../node_modules/core-js/modules/_add-to-unscopables.js"}],"../../node_modules/core-js/modules/_strict-method.js":[function(require,module,exports) {
'use strict';
var fails = require('./_fails');

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};

},{"./_fails":"../../node_modules/core-js/modules/_fails.js"}],"../../node_modules/core-js/modules/es6.array.sort.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var aFunction = require('./_a-function');
var toObject = require('./_to-object');
var fails = require('./_fails');
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !require('./_strict-method')($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_a-function":"../../node_modules/core-js/modules/_a-function.js","./_to-object":"../../node_modules/core-js/modules/_to-object.js","./_fails":"../../node_modules/core-js/modules/_fails.js","./_strict-method":"../../node_modules/core-js/modules/_strict-method.js"}],"../../node_modules/core-js/modules/_species-constructor.js":[function(require,module,exports) {
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = require('./_an-object');
var aFunction = require('./_a-function');
var SPECIES = require('./_wks')('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

},{"./_an-object":"../../node_modules/core-js/modules/_an-object.js","./_a-function":"../../node_modules/core-js/modules/_a-function.js","./_wks":"../../node_modules/core-js/modules/_wks.js"}],"../../node_modules/core-js/modules/_new-promise-capability.js":[function(require,module,exports) {
'use strict';
// 25.4.1.5 NewPromiseCapability(C)
var aFunction = require('./_a-function');

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};

},{"./_a-function":"../../node_modules/core-js/modules/_a-function.js"}],"../../node_modules/core-js/modules/_promise-resolve.js":[function(require,module,exports) {
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var newPromiseCapability = require('./_new-promise-capability');

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

},{"./_an-object":"../../node_modules/core-js/modules/_an-object.js","./_is-object":"../../node_modules/core-js/modules/_is-object.js","./_new-promise-capability":"../../node_modules/core-js/modules/_new-promise-capability.js"}],"../../node_modules/core-js/modules/es7.promise.finally.js":[function(require,module,exports) {

// https://github.com/tc39/proposal-promise-finally
'use strict';
var $export = require('./_export');
var core = require('./_core');
var global = require('./_global');
var speciesConstructor = require('./_species-constructor');
var promiseResolve = require('./_promise-resolve');

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_core":"../../node_modules/core-js/modules/_core.js","./_global":"../../node_modules/core-js/modules/_global.js","./_species-constructor":"../../node_modules/core-js/modules/_species-constructor.js","./_promise-resolve":"../../node_modules/core-js/modules/_promise-resolve.js"}],"../../node_modules/core-js/modules/_wks-ext.js":[function(require,module,exports) {
exports.f = require('./_wks');

},{"./_wks":"../../node_modules/core-js/modules/_wks.js"}],"../../node_modules/core-js/modules/_wks-define.js":[function(require,module,exports) {

var global = require('./_global');
var core = require('./_core');
var LIBRARY = require('./_library');
var wksExt = require('./_wks-ext');
var defineProperty = require('./_object-dp').f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};

},{"./_global":"../../node_modules/core-js/modules/_global.js","./_core":"../../node_modules/core-js/modules/_core.js","./_library":"../../node_modules/core-js/modules/_library.js","./_wks-ext":"../../node_modules/core-js/modules/_wks-ext.js","./_object-dp":"../../node_modules/core-js/modules/_object-dp.js"}],"../../node_modules/core-js/modules/es7.symbol.async-iterator.js":[function(require,module,exports) {
require('./_wks-define')('asyncIterator');

},{"./_wks-define":"../../node_modules/core-js/modules/_wks-define.js"}],"../../node_modules/core-js/modules/_string-ws.js":[function(require,module,exports) {
module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

},{}],"../../node_modules/core-js/modules/_string-trim.js":[function(require,module,exports) {
var $export = require('./_export');
var defined = require('./_defined');
var fails = require('./_fails');
var spaces = require('./_string-ws');
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_defined":"../../node_modules/core-js/modules/_defined.js","./_fails":"../../node_modules/core-js/modules/_fails.js","./_string-ws":"../../node_modules/core-js/modules/_string-ws.js"}],"../../node_modules/core-js/modules/es7.string.trim-left.js":[function(require,module,exports) {
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
require('./_string-trim')('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');

},{"./_string-trim":"../../node_modules/core-js/modules/_string-trim.js"}],"../../node_modules/core-js/modules/es7.string.trim-right.js":[function(require,module,exports) {
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
require('./_string-trim')('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');

},{"./_string-trim":"../../node_modules/core-js/modules/_string-trim.js"}],"../../node_modules/core-js/modules/_user-agent.js":[function(require,module,exports) {

var global = require('./_global');
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';

},{"./_global":"../../node_modules/core-js/modules/_global.js"}],"../../node_modules/core-js/modules/web.timers.js":[function(require,module,exports) {

// ie9- setTimeout & setInterval additional parameters fix
var global = require('./_global');
var $export = require('./_export');
var userAgent = require('./_user-agent');
var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});

},{"./_global":"../../node_modules/core-js/modules/_global.js","./_export":"../../node_modules/core-js/modules/_export.js","./_user-agent":"../../node_modules/core-js/modules/_user-agent.js"}],"../../node_modules/core-js/modules/_invoke.js":[function(require,module,exports) {
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};

},{}],"../../node_modules/core-js/modules/_html.js":[function(require,module,exports) {
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":"../../node_modules/core-js/modules/_global.js"}],"../../node_modules/core-js/modules/_task.js":[function(require,module,exports) {


var ctx = require('./_ctx');
var invoke = require('./_invoke');
var html = require('./_html');
var cel = require('./_dom-create');
var global = require('./_global');
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (require('./_cof')(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};

},{"./_ctx":"../../node_modules/core-js/modules/_ctx.js","./_invoke":"../../node_modules/core-js/modules/_invoke.js","./_html":"../../node_modules/core-js/modules/_html.js","./_dom-create":"../../node_modules/core-js/modules/_dom-create.js","./_global":"../../node_modules/core-js/modules/_global.js","./_cof":"../../node_modules/core-js/modules/_cof.js"}],"../../node_modules/core-js/modules/web.immediate.js":[function(require,module,exports) {
var $export = require('./_export');
var $task = require('./_task');
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_task":"../../node_modules/core-js/modules/_task.js"}],"../../node_modules/core-js/modules/_iter-step.js":[function(require,module,exports) {
module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],"../../node_modules/core-js/modules/_iterators.js":[function(require,module,exports) {
module.exports = {};

},{}],"../../node_modules/core-js/modules/_iobject.js":[function(require,module,exports) {
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":"../../node_modules/core-js/modules/_cof.js"}],"../../node_modules/core-js/modules/_to-iobject.js":[function(require,module,exports) {
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_iobject":"../../node_modules/core-js/modules/_iobject.js","./_defined":"../../node_modules/core-js/modules/_defined.js"}],"../../node_modules/core-js/modules/_to-absolute-index.js":[function(require,module,exports) {
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":"../../node_modules/core-js/modules/_to-integer.js"}],"../../node_modules/core-js/modules/_array-includes.js":[function(require,module,exports) {
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
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

},{"./_to-iobject":"../../node_modules/core-js/modules/_to-iobject.js","./_to-length":"../../node_modules/core-js/modules/_to-length.js","./_to-absolute-index":"../../node_modules/core-js/modules/_to-absolute-index.js"}],"../../node_modules/core-js/modules/_shared-key.js":[function(require,module,exports) {
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":"../../node_modules/core-js/modules/_shared.js","./_uid":"../../node_modules/core-js/modules/_uid.js"}],"../../node_modules/core-js/modules/_object-keys-internal.js":[function(require,module,exports) {
var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

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

},{"./_has":"../../node_modules/core-js/modules/_has.js","./_to-iobject":"../../node_modules/core-js/modules/_to-iobject.js","./_array-includes":"../../node_modules/core-js/modules/_array-includes.js","./_shared-key":"../../node_modules/core-js/modules/_shared-key.js"}],"../../node_modules/core-js/modules/_enum-bug-keys.js":[function(require,module,exports) {
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],"../../node_modules/core-js/modules/_object-keys.js":[function(require,module,exports) {
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_object-keys-internal":"../../node_modules/core-js/modules/_object-keys-internal.js","./_enum-bug-keys":"../../node_modules/core-js/modules/_enum-bug-keys.js"}],"../../node_modules/core-js/modules/_object-dps.js":[function(require,module,exports) {
var dP = require('./_object-dp');
var anObject = require('./_an-object');
var getKeys = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

},{"./_object-dp":"../../node_modules/core-js/modules/_object-dp.js","./_an-object":"../../node_modules/core-js/modules/_an-object.js","./_object-keys":"../../node_modules/core-js/modules/_object-keys.js","./_descriptors":"../../node_modules/core-js/modules/_descriptors.js"}],"../../node_modules/core-js/modules/_object-create.js":[function(require,module,exports) {
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = require('./_an-object');
var dPs = require('./_object-dps');
var enumBugKeys = require('./_enum-bug-keys');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
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

},{"./_an-object":"../../node_modules/core-js/modules/_an-object.js","./_object-dps":"../../node_modules/core-js/modules/_object-dps.js","./_enum-bug-keys":"../../node_modules/core-js/modules/_enum-bug-keys.js","./_shared-key":"../../node_modules/core-js/modules/_shared-key.js","./_dom-create":"../../node_modules/core-js/modules/_dom-create.js","./_html":"../../node_modules/core-js/modules/_html.js"}],"../../node_modules/core-js/modules/_set-to-string-tag.js":[function(require,module,exports) {
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_object-dp":"../../node_modules/core-js/modules/_object-dp.js","./_has":"../../node_modules/core-js/modules/_has.js","./_wks":"../../node_modules/core-js/modules/_wks.js"}],"../../node_modules/core-js/modules/_iter-create.js":[function(require,module,exports) {
'use strict';
var create = require('./_object-create');
var descriptor = require('./_property-desc');
var setToStringTag = require('./_set-to-string-tag');
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

},{"./_object-create":"../../node_modules/core-js/modules/_object-create.js","./_property-desc":"../../node_modules/core-js/modules/_property-desc.js","./_set-to-string-tag":"../../node_modules/core-js/modules/_set-to-string-tag.js","./_hide":"../../node_modules/core-js/modules/_hide.js","./_wks":"../../node_modules/core-js/modules/_wks.js"}],"../../node_modules/core-js/modules/_object-gpo.js":[function(require,module,exports) {
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = require('./_has');
var toObject = require('./_to-object');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

},{"./_has":"../../node_modules/core-js/modules/_has.js","./_to-object":"../../node_modules/core-js/modules/_to-object.js","./_shared-key":"../../node_modules/core-js/modules/_shared-key.js"}],"../../node_modules/core-js/modules/_iter-define.js":[function(require,module,exports) {
'use strict';
var LIBRARY = require('./_library');
var $export = require('./_export');
var redefine = require('./_redefine');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var $iterCreate = require('./_iter-create');
var setToStringTag = require('./_set-to-string-tag');
var getPrototypeOf = require('./_object-gpo');
var ITERATOR = require('./_wks')('iterator');
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
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
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

},{"./_library":"../../node_modules/core-js/modules/_library.js","./_export":"../../node_modules/core-js/modules/_export.js","./_redefine":"../../node_modules/core-js/modules/_redefine.js","./_hide":"../../node_modules/core-js/modules/_hide.js","./_iterators":"../../node_modules/core-js/modules/_iterators.js","./_iter-create":"../../node_modules/core-js/modules/_iter-create.js","./_set-to-string-tag":"../../node_modules/core-js/modules/_set-to-string-tag.js","./_object-gpo":"../../node_modules/core-js/modules/_object-gpo.js","./_wks":"../../node_modules/core-js/modules/_wks.js"}],"../../node_modules/core-js/modules/es6.array.iterator.js":[function(require,module,exports) {
'use strict';
var addToUnscopables = require('./_add-to-unscopables');
var step = require('./_iter-step');
var Iterators = require('./_iterators');
var toIObject = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function (iterated, kind) {
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

},{"./_add-to-unscopables":"../../node_modules/core-js/modules/_add-to-unscopables.js","./_iter-step":"../../node_modules/core-js/modules/_iter-step.js","./_iterators":"../../node_modules/core-js/modules/_iterators.js","./_to-iobject":"../../node_modules/core-js/modules/_to-iobject.js","./_iter-define":"../../node_modules/core-js/modules/_iter-define.js"}],"../../node_modules/core-js/modules/web.dom.iterable.js":[function(require,module,exports) {

var $iterators = require('./es6.array.iterator');
var getKeys = require('./_object-keys');
var redefine = require('./_redefine');
var global = require('./_global');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var wks = require('./_wks');
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}

},{"./es6.array.iterator":"../../node_modules/core-js/modules/es6.array.iterator.js","./_object-keys":"../../node_modules/core-js/modules/_object-keys.js","./_redefine":"../../node_modules/core-js/modules/_redefine.js","./_global":"../../node_modules/core-js/modules/_global.js","./_hide":"../../node_modules/core-js/modules/_hide.js","./_iterators":"../../node_modules/core-js/modules/_iterators.js","./_wks":"../../node_modules/core-js/modules/_wks.js"}],"../../node_modules/validator/lib/util/assertString.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = assertString;
function assertString(input) {
  if (input === undefined || input === null) throw new TypeError("Expected a string but received a ".concat(input));
  if (input.constructor.name !== 'String') throw new TypeError("Expected a string but received a ".concat(input.constructor.name));
}
module.exports = exports.default;
module.exports.default = exports.default;
},{}],"../../node_modules/validator/lib/toDate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toDate;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function toDate(date) {
  (0, _assertString.default)(date);
  date = Date.parse(date);
  return !isNaN(date) ? new Date(date) : null;
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/util/nullUndefinedCheck.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isNullOrUndefined;
function isNullOrUndefined(value) {
  return value === null || value === undefined;
}
module.exports = exports.default;
module.exports.default = exports.default;
},{}],"../../node_modules/validator/lib/alpha.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.farsiLocales = exports.englishLocales = exports.dotDecimal = exports.decimal = exports.commaDecimal = exports.bengaliLocales = exports.arabicLocales = exports.alphanumeric = exports.alpha = void 0;
var alpha = exports.alpha = {
  'en-US': /^[A-Z]+$/i,
  'az-AZ': /^[A-VXYZÇƏĞİıÖŞÜ]+$/i,
  'bg-BG': /^[А-Я]+$/i,
  'cs-CZ': /^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,
  'da-DK': /^[A-ZÆØÅ]+$/i,
  'de-DE': /^[A-ZÄÖÜß]+$/i,
  'el-GR': /^[Α-ώ]+$/i,
  'es-ES': /^[A-ZÁÉÍÑÓÚÜ]+$/i,
  'fa-IR': /^[ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی]+$/i,
  'fi-FI': /^[A-ZÅÄÖ]+$/i,
  'fr-FR': /^[A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,
  'it-IT': /^[A-ZÀÉÈÌÎÓÒÙ]+$/i,
  'ja-JP': /^[ぁ-んァ-ヶｦ-ﾟ一-龠ー・。、]+$/i,
  'nb-NO': /^[A-ZÆØÅ]+$/i,
  'nl-NL': /^[A-ZÁÉËÏÓÖÜÚ]+$/i,
  'nn-NO': /^[A-ZÆØÅ]+$/i,
  'hu-HU': /^[A-ZÁÉÍÓÖŐÚÜŰ]+$/i,
  'pl-PL': /^[A-ZĄĆĘŚŁŃÓŻŹ]+$/i,
  'pt-PT': /^[A-ZÃÁÀÂÄÇÉÊËÍÏÕÓÔÖÚÜ]+$/i,
  'ru-RU': /^[А-ЯЁ]+$/i,
  'kk-KZ': /^[А-ЯЁ\u04D8\u04B0\u0406\u04A2\u0492\u04AE\u049A\u04E8\u04BA]+$/i,
  'sl-SI': /^[A-ZČĆĐŠŽ]+$/i,
  'sk-SK': /^[A-ZÁČĎÉÍŇÓŠŤÚÝŽĹŔĽÄÔ]+$/i,
  'sr-RS@latin': /^[A-ZČĆŽŠĐ]+$/i,
  'sr-RS': /^[А-ЯЂЈЉЊЋЏ]+$/i,
  'sv-SE': /^[A-ZÅÄÖ]+$/i,
  'th-TH': /^[ก-๐\s]+$/i,
  'tr-TR': /^[A-ZÇĞİıÖŞÜ]+$/i,
  'uk-UA': /^[А-ЩЬЮЯЄIЇҐі]+$/i,
  'vi-VN': /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴĐÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸ]+$/i,
  'ko-KR': /^[ㄱ-ㅎㅏ-ㅣ가-힣]*$/,
  'ku-IQ': /^[ئابپتجچحخدرڕزژسشعغفڤقکگلڵمنوۆھەیێيطؤثآإأكضصةظذ]+$/i,
  ar: /^[ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+$/,
  he: /^[א-ת]+$/,
  fa: /^['آاءأؤئبپتثجچحخدذرزژسشصضطظعغفقکگلمنوهةی']+$/i,
  bn: /^['ঀঁংঃঅআইঈউঊঋঌএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহ়ঽািীুূৃৄেৈোৌ্ৎৗড়ঢ়য়ৠৡৢৣৰৱ৲৳৴৵৶৷৸৹৺৻']+$/,
  eo: /^[ABCĈD-GĜHĤIJĴK-PRSŜTUŬVZ]+$/i,
  'hi-IN': /^[\u0900-\u0961]+[\u0972-\u097F]*$/i,
  'si-LK': /^[\u0D80-\u0DFF]+$/,
  'ta-IN': /^[\u0B80-\u0BFF]+$/i,
  'te-IN': /^[\u0C00-\u0C7F]+$/i,
  'kn-IN': /^[\u0C80-\u0CFF]+$/i,
  'ml-IN': /^[\u0D00-\u0D7F]+$/i,
  'gu-IN': /^[\u0A80-\u0AFF]+$/i,
  'pa-IN': /^[\u0A00-\u0A7F]+$/i,
  'or-IN': /^[\u0B00-\u0B7F]+$/i
};
var alphanumeric = exports.alphanumeric = {
  'en-US': /^[0-9A-Z]+$/i,
  'az-AZ': /^[0-9A-VXYZÇƏĞİıÖŞÜ]+$/i,
  'bg-BG': /^[0-9А-Я]+$/i,
  'cs-CZ': /^[0-9A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,
  'da-DK': /^[0-9A-ZÆØÅ]+$/i,
  'de-DE': /^[0-9A-ZÄÖÜß]+$/i,
  'el-GR': /^[0-9Α-ω]+$/i,
  'es-ES': /^[0-9A-ZÁÉÍÑÓÚÜ]+$/i,
  'fi-FI': /^[0-9A-ZÅÄÖ]+$/i,
  'fr-FR': /^[0-9A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,
  'it-IT': /^[0-9A-ZÀÉÈÌÎÓÒÙ]+$/i,
  'ja-JP': /^[0-9０-９ぁ-んァ-ヶｦ-ﾟ一-龠ー・。、]+$/i,
  'hu-HU': /^[0-9A-ZÁÉÍÓÖŐÚÜŰ]+$/i,
  'nb-NO': /^[0-9A-ZÆØÅ]+$/i,
  'nl-NL': /^[0-9A-ZÁÉËÏÓÖÜÚ]+$/i,
  'nn-NO': /^[0-9A-ZÆØÅ]+$/i,
  'pl-PL': /^[0-9A-ZĄĆĘŚŁŃÓŻŹ]+$/i,
  'pt-PT': /^[0-9A-ZÃÁÀÂÄÇÉÊËÍÏÕÓÔÖÚÜ]+$/i,
  'ru-RU': /^[0-9А-ЯЁ]+$/i,
  'kk-KZ': /^[0-9А-ЯЁ\u04D8\u04B0\u0406\u04A2\u0492\u04AE\u049A\u04E8\u04BA]+$/i,
  'sl-SI': /^[0-9A-ZČĆĐŠŽ]+$/i,
  'sk-SK': /^[0-9A-ZÁČĎÉÍŇÓŠŤÚÝŽĹŔĽÄÔ]+$/i,
  'sr-RS@latin': /^[0-9A-ZČĆŽŠĐ]+$/i,
  'sr-RS': /^[0-9А-ЯЂЈЉЊЋЏ]+$/i,
  'sv-SE': /^[0-9A-ZÅÄÖ]+$/i,
  'th-TH': /^[ก-๙\s]+$/i,
  'tr-TR': /^[0-9A-ZÇĞİıÖŞÜ]+$/i,
  'uk-UA': /^[0-9А-ЩЬЮЯЄIЇҐі]+$/i,
  'ko-KR': /^[0-9ㄱ-ㅎㅏ-ㅣ가-힣]*$/,
  'ku-IQ': /^[٠١٢٣٤٥٦٧٨٩0-9ئابپتجچحخدرڕزژسشعغفڤقکگلڵمنوۆھەیێيطؤثآإأكضصةظذ]+$/i,
  'vi-VN': /^[0-9A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴĐÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸ]+$/i,
  ar: /^[٠١٢٣٤٥٦٧٨٩0-9ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+$/,
  he: /^[0-9א-ת]+$/,
  fa: /^['0-9آاءأؤئبپتثجچحخدذرزژسشصضطظعغفقکگلمنوهةی۱۲۳۴۵۶۷۸۹۰']+$/i,
  bn: /^['ঀঁংঃঅআইঈউঊঋঌএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহ়ঽািীুূৃৄেৈোৌ্ৎৗড়ঢ়য়ৠৡৢৣ০১২৩৪৫৬৭৮৯ৰৱ৲৳৴৵৶৷৸৹৺৻']+$/,
  eo: /^[0-9ABCĈD-GĜHĤIJĴK-PRSŜTUŬVZ]+$/i,
  'hi-IN': /^[\u0900-\u0963]+[\u0966-\u097F]*$/i,
  'si-LK': /^[0-9\u0D80-\u0DFF]+$/,
  'ta-IN': /^[0-9\u0B80-\u0BFF.]+$/i,
  'te-IN': /^[0-9\u0C00-\u0C7F.]+$/i,
  'kn-IN': /^[0-9\u0C80-\u0CFF.]+$/i,
  'ml-IN': /^[0-9\u0D00-\u0D7F.]+$/i,
  'gu-IN': /^[0-9\u0A80-\u0AFF.]+$/i,
  'pa-IN': /^[0-9\u0A00-\u0A7F.]+$/i,
  'or-IN': /^[0-9\u0B00-\u0B7F.]+$/i
};
var decimal = exports.decimal = {
  'en-US': '.',
  ar: '٫'
};
var englishLocales = exports.englishLocales = ['AU', 'GB', 'HK', 'IN', 'NZ', 'ZA', 'ZM'];
for (var locale, i = 0; i < englishLocales.length; i++) {
  locale = "en-".concat(englishLocales[i]);
  alpha[locale] = alpha['en-US'];
  alphanumeric[locale] = alphanumeric['en-US'];
  decimal[locale] = decimal['en-US'];
}

// Source: http://www.localeplanet.com/java/
var arabicLocales = exports.arabicLocales = ['AE', 'BH', 'DZ', 'EG', 'IQ', 'JO', 'KW', 'LB', 'LY', 'MA', 'QM', 'QA', 'SA', 'SD', 'SY', 'TN', 'YE'];
for (var _locale, _i = 0; _i < arabicLocales.length; _i++) {
  _locale = "ar-".concat(arabicLocales[_i]);
  alpha[_locale] = alpha.ar;
  alphanumeric[_locale] = alphanumeric.ar;
  decimal[_locale] = decimal.ar;
}
var farsiLocales = exports.farsiLocales = ['IR', 'AF'];
for (var _locale2, _i2 = 0; _i2 < farsiLocales.length; _i2++) {
  _locale2 = "fa-".concat(farsiLocales[_i2]);
  alphanumeric[_locale2] = alphanumeric.fa;
  decimal[_locale2] = decimal.ar;
}
var bengaliLocales = exports.bengaliLocales = ['BD', 'IN'];
for (var _locale3, _i3 = 0; _i3 < bengaliLocales.length; _i3++) {
  _locale3 = "bn-".concat(bengaliLocales[_i3]);
  alpha[_locale3] = alpha.bn;
  alphanumeric[_locale3] = alphanumeric.bn;
  decimal[_locale3] = decimal['en-US'];
}

// Source: https://en.wikipedia.org/wiki/Decimal_mark
var dotDecimal = exports.dotDecimal = ['ar-EG', 'ar-LB', 'ar-LY'];
var commaDecimal = exports.commaDecimal = ['bg-BG', 'cs-CZ', 'da-DK', 'de-DE', 'el-GR', 'en-ZM', 'eo', 'es-ES', 'fr-CA', 'fr-FR', 'gu-IN', 'hi-IN', 'hu-HU', 'id-ID', 'it-IT', 'kk-KZ', 'kn-IN', 'ku-IQ', 'ml-IN', 'nb-NO', 'nl-NL', 'nn-NO', 'or-IN', 'pa-IN', 'pl-PL', 'pt-PT', 'ru-RU', 'si-LK', 'sl-SI', 'sr-RS', 'sr-RS@latin', 'sv-SE', 'ta-IN', 'te-IN', 'tr-TR', 'uk-UA', 'vi-VN'];
for (var _i4 = 0; _i4 < dotDecimal.length; _i4++) {
  decimal[dotDecimal[_i4]] = decimal['en-US'];
}
for (var _i5 = 0; _i5 < commaDecimal.length; _i5++) {
  decimal[commaDecimal[_i5]] = ',';
}
alpha['fr-CA'] = alpha['fr-FR'];
alphanumeric['fr-CA'] = alphanumeric['fr-FR'];
alpha['pt-BR'] = alpha['pt-PT'];
alphanumeric['pt-BR'] = alphanumeric['pt-PT'];
decimal['pt-BR'] = decimal['pt-PT'];

// see #862
alpha['pl-Pl'] = alpha['pl-PL'];
alphanumeric['pl-Pl'] = alphanumeric['pl-PL'];
decimal['pl-Pl'] = decimal['pl-PL'];

// see #1455
alpha['fa-AF'] = alpha.fa;
},{}],"../../node_modules/validator/lib/isFloat.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isFloat;
exports.locales = void 0;
var _assertString = _interopRequireDefault(require("./util/assertString"));
var _nullUndefinedCheck = _interopRequireDefault(require("./util/nullUndefinedCheck"));
var _alpha = require("./alpha");
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function isFloat(str, options) {
  (0, _assertString.default)(str);
  options = options || {};
  var float = new RegExp("^(?:[-+])?(?:[0-9]+)?(?:\\".concat(options.locale ? _alpha.decimal[options.locale] : '.', "[0-9]*)?(?:[eE][\\+\\-]?(?:[0-9]+))?$"));
  if (str === '' || str === '.' || str === ',' || str === '-' || str === '+') {
    return false;
  }
  var value = parseFloat(str.replace(',', '.'));
  return float.test(str) && (!options.hasOwnProperty('min') || (0, _nullUndefinedCheck.default)(options.min) || value >= options.min) && (!options.hasOwnProperty('max') || (0, _nullUndefinedCheck.default)(options.max) || value <= options.max) && (!options.hasOwnProperty('lt') || (0, _nullUndefinedCheck.default)(options.lt) || value < options.lt) && (!options.hasOwnProperty('gt') || (0, _nullUndefinedCheck.default)(options.gt) || value > options.gt);
}
var locales = exports.locales = Object.keys(_alpha.decimal);
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js","./util/nullUndefinedCheck":"../../node_modules/validator/lib/util/nullUndefinedCheck.js","./alpha":"../../node_modules/validator/lib/alpha.js"}],"../../node_modules/validator/lib/toFloat.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toFloat;
var _isFloat = _interopRequireDefault(require("./isFloat"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function toFloat(str) {
  if (!(0, _isFloat.default)(str)) return NaN;
  return parseFloat(str);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./isFloat":"../../node_modules/validator/lib/isFloat.js"}],"../../node_modules/validator/lib/toInt.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toInt;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function toInt(str, radix) {
  (0, _assertString.default)(str);
  return parseInt(str, radix || 10);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/toBoolean.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toBoolean;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function toBoolean(str, strict) {
  (0, _assertString.default)(str);
  if (strict) {
    return str === '1' || /^true$/i.test(str);
  }
  return str !== '0' && !/^false$/i.test(str) && str !== '';
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/equals.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = equals;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function equals(str, comparison) {
  (0, _assertString.default)(str);
  return str === comparison;
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/util/toString.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toString;
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function toString(input) {
  if (_typeof(input) === 'object' && input !== null) {
    if (typeof input.toString === 'function') {
      input = input.toString();
    } else {
      input = '[object Object]';
    }
  } else if (input === null || typeof input === 'undefined' || isNaN(input) && !input.length) {
    input = '';
  }
  return String(input);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{}],"../../node_modules/validator/lib/util/merge.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = merge;
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function merge() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaults = arguments.length > 1 ? arguments[1] : undefined;
  if (_typeof(obj) !== 'object' || obj === null) {
    obj = {};
  }
  for (var key in defaults) {
    if (typeof obj[key] === 'undefined') {
      obj[key] = defaults[key];
    }
  }
  return obj;
}
module.exports = exports.default;
module.exports.default = exports.default;
},{}],"../../node_modules/validator/lib/contains.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = contains;
var _assertString = _interopRequireDefault(require("./util/assertString"));
var _toString = _interopRequireDefault(require("./util/toString"));
var _merge = _interopRequireDefault(require("./util/merge"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
var defaultContainsOptions = {
  ignoreCase: false,
  minOccurrences: 1
};
function contains(str, elem, options) {
  (0, _assertString.default)(str);
  options = (0, _merge.default)(options, defaultContainsOptions);
  if (options.ignoreCase) {
    return str.toLowerCase().split((0, _toString.default)(elem).toLowerCase()).length > options.minOccurrences;
  }
  return str.split((0, _toString.default)(elem)).length > options.minOccurrences;
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js","./util/toString":"../../node_modules/validator/lib/util/toString.js","./util/merge":"../../node_modules/validator/lib/util/merge.js"}],"../../node_modules/validator/lib/matches.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = matches;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function matches(str, pattern, modifiers) {
  (0, _assertString.default)(str);
  if (Object.prototype.toString.call(pattern) !== '[object RegExp]') {
    pattern = new RegExp(pattern, modifiers);
  }
  return !!str.match(pattern);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/util/checkHost.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = checkHost;
function isRegExp(obj) {
  return Object.prototype.toString.call(obj) === '[object RegExp]';
}
function checkHost(host, matches) {
  for (var i = 0; i < matches.length; i++) {
    var match = matches[i];
    if (host === match || isRegExp(match) && match.test(host)) {
      return true;
    }
  }
  return false;
}
module.exports = exports.default;
module.exports.default = exports.default;
},{}],"../../node_modules/validator/lib/isByteLength.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isByteLength;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
/* eslint-disable prefer-rest-params */
function isByteLength(str, options) {
  (0, _assertString.default)(str);
  var min;
  var max;
  if (_typeof(options) === 'object') {
    min = options.min || 0;
    max = options.max;
  } else {
    // backwards compatibility: isByteLength(str, min [, max])
    min = arguments[1];
    max = arguments[2];
  }
  var len = encodeURI(str).split(/%..|./).length - 1;
  return len >= min && (typeof max === 'undefined' || len <= max);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isFQDN.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isFQDN;
var _assertString = _interopRequireDefault(require("./util/assertString"));
var _merge = _interopRequireDefault(require("./util/merge"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
var default_fqdn_options = {
  require_tld: true,
  allow_underscores: false,
  allow_trailing_dot: false,
  allow_numeric_tld: false,
  allow_wildcard: false,
  ignore_max_length: false
};
function isFQDN(str, options) {
  (0, _assertString.default)(str);
  options = (0, _merge.default)(options, default_fqdn_options);

  /* Remove the optional trailing dot before checking validity */
  if (options.allow_trailing_dot && str[str.length - 1] === '.') {
    str = str.substring(0, str.length - 1);
  }

  /* Remove the optional wildcard before checking validity */
  if (options.allow_wildcard === true && str.indexOf('*.') === 0) {
    str = str.substring(2);
  }
  var parts = str.split('.');
  var tld = parts[parts.length - 1];
  if (options.require_tld) {
    // disallow fqdns without tld
    if (parts.length < 2) {
      return false;
    }
    if (!options.allow_numeric_tld && !/^([a-z\u00A1-\u00A8\u00AA-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
      return false;
    }

    // disallow spaces
    if (/\s/.test(tld)) {
      return false;
    }
  }

  // reject numeric TLDs
  if (!options.allow_numeric_tld && /^\d+$/.test(tld)) {
    return false;
  }
  return parts.every(function (part) {
    if (part.length > 63 && !options.ignore_max_length) {
      return false;
    }
    if (!/^[a-z_\u00a1-\uffff0-9-]+$/i.test(part)) {
      return false;
    }

    // disallow full-width chars
    if (/[\uff01-\uff5e]/.test(part)) {
      return false;
    }

    // disallow parts starting or ending with hyphen
    if (/^-|-$/.test(part)) {
      return false;
    }
    if (!options.allow_underscores && /_/.test(part)) {
      return false;
    }
    return true;
  });
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js","./util/merge":"../../node_modules/validator/lib/util/merge.js"}],"../../node_modules/validator/lib/isIP.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isIP;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
/**
11.3.  Examples

   The following addresses

             fe80::1234 (on the 1st link of the node)
             ff02::5678 (on the 5th link of the node)
             ff08::9abc (on the 10th organization of the node)

   would be represented as follows:

             fe80::1234%1
             ff02::5678%5
             ff08::9abc%10

   (Here we assume a natural translation from a zone index to the
   <zone_id> part, where the Nth zone of any scope is translated into
   "N".)

   If we use interface names as <zone_id>, those addresses could also be
   represented as follows:

            fe80::1234%ne0
            ff02::5678%pvc1.3
            ff08::9abc%interface10

   where the interface "ne0" belongs to the 1st link, "pvc1.3" belongs
   to the 5th link, and "interface10" belongs to the 10th organization.
 * * */
var IPv4SegmentFormat = '(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])';
var IPv4AddressFormat = "(".concat(IPv4SegmentFormat, "[.]){3}").concat(IPv4SegmentFormat);
var IPv4AddressRegExp = new RegExp("^".concat(IPv4AddressFormat, "$"));
var IPv6SegmentFormat = '(?:[0-9a-fA-F]{1,4})';
var IPv6AddressRegExp = new RegExp('^(' + "(?:".concat(IPv6SegmentFormat, ":){7}(?:").concat(IPv6SegmentFormat, "|:)|") + "(?:".concat(IPv6SegmentFormat, ":){6}(?:").concat(IPv4AddressFormat, "|:").concat(IPv6SegmentFormat, "|:)|") + "(?:".concat(IPv6SegmentFormat, ":){5}(?::").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,2}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){4}(?:(:").concat(IPv6SegmentFormat, "){0,1}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,3}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){3}(?:(:").concat(IPv6SegmentFormat, "){0,2}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,4}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){2}(?:(:").concat(IPv6SegmentFormat, "){0,3}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,5}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){1}(?:(:").concat(IPv6SegmentFormat, "){0,4}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,6}|:)|") + "(?::((?::".concat(IPv6SegmentFormat, "){0,5}:").concat(IPv4AddressFormat, "|(?::").concat(IPv6SegmentFormat, "){1,7}|:))") + ')(%[0-9a-zA-Z.]{1,})?$');
function isIP(ipAddress) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _assertString.default)(ipAddress);

  // accessing 'arguments' for backwards compatibility: isIP(ipAddress [, version])
  // eslint-disable-next-line prefer-rest-params
  var version = (_typeof(options) === 'object' ? options.version : arguments[1]) || '';
  if (!version) {
    return isIP(ipAddress, {
      version: 4
    }) || isIP(ipAddress, {
      version: 6
    });
  }
  if (version.toString() === '4') {
    return IPv4AddressRegExp.test(ipAddress);
  }
  if (version.toString() === '6') {
    return IPv6AddressRegExp.test(ipAddress);
  }
  return false;
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isEmail.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isEmail;
var _assertString = _interopRequireDefault(require("./util/assertString"));
var _checkHost = _interopRequireDefault(require("./util/checkHost"));
var _isByteLength = _interopRequireDefault(require("./isByteLength"));
var _isFQDN = _interopRequireDefault(require("./isFQDN"));
var _isIP = _interopRequireDefault(require("./isIP"));
var _merge = _interopRequireDefault(require("./util/merge"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
var default_email_options = {
  allow_display_name: false,
  allow_underscores: false,
  require_display_name: false,
  allow_utf8_local_part: true,
  require_tld: true,
  blacklisted_chars: '',
  ignore_max_length: false,
  host_blacklist: [],
  host_whitelist: []
};

/* eslint-disable max-len */
/* eslint-disable no-control-regex */
var splitNameAddress = /^([^\x00-\x1F\x7F-\x9F\cX]+)</i;
var emailUserPart = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i;
var gmailUserPart = /^[a-z\d]+$/;
var quotedEmailUser = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i;
var emailUserUtf8Part = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A1-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
var quotedEmailUserUtf8 = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;
var defaultMaxEmailLength = 254;
/* eslint-enable max-len */
/* eslint-enable no-control-regex */

/**
 * Validate display name according to the RFC2822: https://tools.ietf.org/html/rfc2822#appendix-A.1.2
 * @param {String} display_name
 */
function validateDisplayName(display_name) {
  var display_name_without_quotes = display_name.replace(/^"(.+)"$/, '$1');
  // display name with only spaces is not valid
  if (!display_name_without_quotes.trim()) {
    return false;
  }

  // check whether display name contains illegal character
  var contains_illegal = /[\.";<>]/.test(display_name_without_quotes);
  if (contains_illegal) {
    // if contains illegal characters,
    // must to be enclosed in double-quotes, otherwise it's not a valid display name
    if (display_name_without_quotes === display_name) {
      return false;
    }

    // the quotes in display name must start with character symbol \
    var all_start_with_back_slash = display_name_without_quotes.split('"').length === display_name_without_quotes.split('\\"').length;
    if (!all_start_with_back_slash) {
      return false;
    }
  }
  return true;
}
function isEmail(str, options) {
  (0, _assertString.default)(str);
  options = (0, _merge.default)(options, default_email_options);
  if (options.require_display_name || options.allow_display_name) {
    var display_email = str.match(splitNameAddress);
    if (display_email) {
      var display_name = display_email[1];

      // Remove display name and angle brackets to get email address
      // Can be done in the regex but will introduce a ReDOS (See  #1597 for more info)
      str = str.replace(display_name, '').replace(/(^<|>$)/g, '');

      // sometimes need to trim the last space to get the display name
      // because there may be a space between display name and email address
      // eg. myname <address@gmail.com>
      // the display name is `myname` instead of `myname `, so need to trim the last space
      if (display_name.endsWith(' ')) {
        display_name = display_name.slice(0, -1);
      }
      if (!validateDisplayName(display_name)) {
        return false;
      }
    } else if (options.require_display_name) {
      return false;
    }
  }
  if (!options.ignore_max_length && str.length > defaultMaxEmailLength) {
    return false;
  }
  var parts = str.split('@');
  var domain = parts.pop();
  var lower_domain = domain.toLowerCase();
  if (options.host_blacklist.length > 0 && (0, _checkHost.default)(lower_domain, options.host_blacklist)) {
    return false;
  }
  if (options.host_whitelist.length > 0 && !(0, _checkHost.default)(lower_domain, options.host_whitelist)) {
    return false;
  }
  var user = parts.join('@');
  if (options.domain_specific_validation && (lower_domain === 'gmail.com' || lower_domain === 'googlemail.com')) {
    /*
    Previously we removed dots for gmail addresses before validating.
    This was removed because it allows `multiple..dots@gmail.com`
    to be reported as valid, but it is not.
    Gmail only normalizes single dots, removing them from here is pointless,
    should be done in normalizeEmail
    */
    user = user.toLowerCase();

    // Removing sub-address from username before gmail validation
    var username = user.split('+')[0];

    // Dots are not included in gmail length restriction
    if (!(0, _isByteLength.default)(username.replace(/\./g, ''), {
      min: 6,
      max: 30
    })) {
      return false;
    }
    var _user_parts = username.split('.');
    for (var i = 0; i < _user_parts.length; i++) {
      if (!gmailUserPart.test(_user_parts[i])) {
        return false;
      }
    }
  }
  if (options.ignore_max_length === false && (!(0, _isByteLength.default)(user, {
    max: 64
  }) || !(0, _isByteLength.default)(domain, {
    max: 254
  }))) {
    return false;
  }
  if (!(0, _isFQDN.default)(domain, {
    require_tld: options.require_tld,
    ignore_max_length: options.ignore_max_length,
    allow_underscores: options.allow_underscores
  })) {
    if (!options.allow_ip_domain) {
      return false;
    }
    if (!(0, _isIP.default)(domain)) {
      if (!domain.startsWith('[') || !domain.endsWith(']')) {
        return false;
      }
      var noBracketdomain = domain.slice(1, -1);
      if (noBracketdomain.length === 0 || !(0, _isIP.default)(noBracketdomain)) {
        return false;
      }
    }
  }
  if (options.blacklisted_chars) {
    if (user.search(new RegExp("[".concat(options.blacklisted_chars, "]+"), 'g')) !== -1) return false;
  }
  if (user[0] === '"' && user[user.length - 1] === '"') {
    user = user.slice(1, user.length - 1);
    return options.allow_utf8_local_part ? quotedEmailUserUtf8.test(user) : quotedEmailUser.test(user);
  }
  var pattern = options.allow_utf8_local_part ? emailUserUtf8Part : emailUserPart;
  var user_parts = user.split('.');
  for (var _i = 0; _i < user_parts.length; _i++) {
    if (!pattern.test(user_parts[_i])) {
      return false;
    }
  }
  return true;
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js","./util/checkHost":"../../node_modules/validator/lib/util/checkHost.js","./isByteLength":"../../node_modules/validator/lib/isByteLength.js","./isFQDN":"../../node_modules/validator/lib/isFQDN.js","./isIP":"../../node_modules/validator/lib/isIP.js","./util/merge":"../../node_modules/validator/lib/util/merge.js"}],"../../node_modules/validator/lib/util/includesString.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var includes = function includes(str, val) {
  return str.indexOf(val) !== -1;
};
var _default = exports.default = includes;
module.exports = exports.default;
module.exports.default = exports.default;
},{}],"../../node_modules/validator/lib/isURL.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isURL;
var _assertString = _interopRequireDefault(require("./util/assertString"));
var _checkHost = _interopRequireDefault(require("./util/checkHost"));
var _includesString = _interopRequireDefault(require("./util/includesString"));
var _isFQDN = _interopRequireDefault(require("./isFQDN"));
var _isIP = _interopRequireDefault(require("./isIP"));
var _merge = _interopRequireDefault(require("./util/merge"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
/*
options for isURL method

protocols - valid protocols can be modified with this option.
require_tld - If set to false isURL will not check if the URL's host includes a top-level domain.
require_protocol - if set to true isURL will return false if protocol is not present in the URL.
require_host - if set to false isURL will not check if host is present in the URL.
require_port - if set to true isURL will check if port is present in the URL.
require_valid_protocol - isURL will check if the URL's protocol is present in the protocols option.
allow_underscores - if set to true, the validator will allow underscores in the URL.
host_whitelist - if set to an array of strings or regexp, and the domain matches none of the strings
                 defined in it, the validation fails.
host_blacklist - if set to an array of strings or regexp, and the domain matches any of the strings
                 defined in it, the validation fails.
allow_trailing_dot - if set to true, the validator will allow the domain to end with
                     a `.` character.
allow_protocol_relative_urls - if set to true protocol relative URLs will be allowed.
allow_fragments - if set to false isURL will return false if fragments are present.
allow_query_components - if set to false isURL will return false if query components are present.
disallow_auth - if set to true, the validator will fail if the URL contains an authentication
                component, e.g. `http://username:password@example.com`
validate_length - if set to false isURL will skip string length validation. `max_allowed_length`
                  will be ignored if this is set as `false`.
max_allowed_length - if set, isURL will not allow URLs longer than the specified value (default is
                     2084 that IE maximum URL length).

*/

var default_url_options = {
  protocols: ['http', 'https', 'ftp'],
  require_tld: true,
  require_protocol: false,
  require_host: true,
  require_port: false,
  require_valid_protocol: true,
  allow_underscores: false,
  allow_trailing_dot: false,
  allow_protocol_relative_urls: false,
  allow_fragments: true,
  allow_query_components: true,
  validate_length: true,
  max_allowed_length: 2084
};
var wrapped_ipv6 = /^\[([^\]]+)\](?::([0-9]+))?$/;
function isURL(url, options) {
  (0, _assertString.default)(url);
  if (!url || /[\s<>]/.test(url)) {
    return false;
  }
  if (url.indexOf('mailto:') === 0) {
    return false;
  }
  options = (0, _merge.default)(options, default_url_options);
  if (options.validate_length && url.length > options.max_allowed_length) {
    return false;
  }
  if (!options.allow_fragments && (0, _includesString.default)(url, '#')) {
    return false;
  }
  if (!options.allow_query_components && ((0, _includesString.default)(url, '?') || (0, _includesString.default)(url, '&'))) {
    return false;
  }
  var protocol, auth, host, hostname, port, port_str, split, ipv6;
  split = url.split('#');
  url = split.shift();
  split = url.split('?');
  url = split.shift();

  // Replaced the 'split("://")' logic with a regex to match the protocol.
  // This correctly identifies schemes like `javascript:` which don't use `//`.
  // However, we need to be careful not to confuse authentication credentials (user:password@host)
  // with protocols. A colon before an @ symbol might be part of auth, not a protocol separator.
  var protocol_match = url.match(/^([a-z][a-z0-9+\-.]*):/i);
  var had_explicit_protocol = false;
  var cleanUpProtocol = function cleanUpProtocol(potential_protocol) {
    had_explicit_protocol = true;
    protocol = potential_protocol.toLowerCase();
    if (options.require_valid_protocol && options.protocols.indexOf(protocol) === -1) {
      // The identified protocol is not in the allowed list.
      return false;
    }

    // Remove the protocol from the URL string.
    return url.substring(protocol_match[0].length);
  };
  if (protocol_match) {
    var potential_protocol = protocol_match[1];
    var after_colon = url.substring(protocol_match[0].length);

    // Check if what follows looks like authentication credentials (user:password@host)
    // rather than a protocol. This happens when:
    // 1. There's no `//` after the colon (protocols like `http://` have this)
    // 2. There's an `@` symbol before any `/`
    // 3. The part before `@` contains only valid auth characters (alphanumeric, -, _, ., %, :)
    var starts_with_slashes = after_colon.slice(0, 2) === '//';
    if (!starts_with_slashes) {
      var first_slash_position = after_colon.indexOf('/');
      var before_slash = first_slash_position === -1 ? after_colon : after_colon.substring(0, first_slash_position);
      var at_position = before_slash.indexOf('@');
      if (at_position !== -1) {
        var before_at = before_slash.substring(0, at_position);
        var valid_auth_regex = /^[a-zA-Z0-9\-_.%:]*$/;
        var is_valid_auth = valid_auth_regex.test(before_at);

        // Check if this contains URL-encoded content that could be malicious
        // For example: javascript:%61%6c%65%72%74%28%31%29@example.com
        // The encoded part decodes to: alert(1)
        var has_encoded_content = /%[0-9a-fA-F]{2}/.test(before_at);
        if (is_valid_auth && !has_encoded_content) {
          // This looks like authentication (e.g., user:password@host), not a protocol
          if (options.require_protocol) {
            return false;
          }

          // Don't consume the colon; let the auth parsing handle it later
        } else {
          // This looks like a malicious protocol (e.g., javascript:alert();@host)
          // or URL-encoded protocol handler (e.g., javascript:%61%6c%65%72%74%28%31%29@host)
          url = cleanUpProtocol(potential_protocol);
          if (url === false) {
            return false;
          }
        }
      } else {
        // No @ symbol found. Check if this could be a port number instead of a protocol.
        // If what's after the colon is numeric (or starts with a digit and contains only
        // valid port characters until a path separator), it's likely hostname:port, not a protocol.
        var looks_like_port = /^[0-9]/.test(after_colon);
        if (looks_like_port) {
          // This looks like hostname:port, not a protocol
          if (options.require_protocol) {
            return false;
          }
          // Don't consume anything; let it be parsed as hostname:port
        } else {
          // This is definitely a protocol
          url = cleanUpProtocol(potential_protocol);
          if (url === false) {
            return false;
          }
        }
      }
    } else {
      // Starts with '//', this is definitely a protocol like http://
      url = cleanUpProtocol(potential_protocol);
      if (url === false) {
        return false;
      }
    }
  } else if (options.require_protocol) {
    return false;
  }

  // Handle leading '//' only as protocol-relative when there was NO explicit protocol.
  // If there was an explicit protocol, '//' is the normal separator
  // and should be stripped unconditionally.
  if (url.slice(0, 2) === '//') {
    if (!had_explicit_protocol && !options.allow_protocol_relative_urls) {
      return false;
    }
    url = url.slice(2);
  }
  if (url === '') {
    return false;
  }
  split = url.split('/');
  url = split.shift();
  if (url === '' && !options.require_host) {
    return true;
  }
  split = url.split('@');
  if (split.length > 1) {
    if (options.disallow_auth) {
      return false;
    }
    if (split[0] === '') {
      return false;
    }
    auth = split.shift();
    if (auth.indexOf(':') >= 0 && auth.split(':').length > 2) {
      return false;
    }
    var _auth$split = auth.split(':'),
      _auth$split2 = _slicedToArray(_auth$split, 2),
      user = _auth$split2[0],
      password = _auth$split2[1];
    if (user === '' && password === '') {
      return false;
    }
  }
  hostname = split.join('@');
  port_str = null;
  ipv6 = null;
  var ipv6_match = hostname.match(wrapped_ipv6);
  if (ipv6_match) {
    host = '';
    ipv6 = ipv6_match[1];
    port_str = ipv6_match[2] || null;
  } else {
    split = hostname.split(':');
    host = split.shift();
    if (split.length) {
      port_str = split.join(':');
    }
  }
  if (port_str !== null && port_str.length > 0) {
    port = parseInt(port_str, 10);
    if (!/^[0-9]+$/.test(port_str) || port <= 0 || port > 65535) {
      return false;
    }
  } else if (options.require_port) {
    return false;
  }
  if (options.host_whitelist) {
    return (0, _checkHost.default)(host, options.host_whitelist);
  }
  if (host === '' && !options.require_host) {
    return true;
  }
  if (!(0, _isIP.default)(host) && !(0, _isFQDN.default)(host, options) && (!ipv6 || !(0, _isIP.default)(ipv6, 6))) {
    return false;
  }
  host = host || ipv6;
  if (options.host_blacklist && (0, _checkHost.default)(host, options.host_blacklist)) {
    return false;
  }
  return true;
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js","./util/checkHost":"../../node_modules/validator/lib/util/checkHost.js","./util/includesString":"../../node_modules/validator/lib/util/includesString.js","./isFQDN":"../../node_modules/validator/lib/isFQDN.js","./isIP":"../../node_modules/validator/lib/isIP.js","./util/merge":"../../node_modules/validator/lib/util/merge.js"}],"../../node_modules/validator/lib/isMACAddress.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isMACAddress;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
var macAddress48 = /^(?:[0-9a-fA-F]{2}([-:\s]))([0-9a-fA-F]{2}\1){4}([0-9a-fA-F]{2})$/;
var macAddress48NoSeparators = /^([0-9a-fA-F]){12}$/;
var macAddress48WithDots = /^([0-9a-fA-F]{4}\.){2}([0-9a-fA-F]{4})$/;
var macAddress64 = /^(?:[0-9a-fA-F]{2}([-:\s]))([0-9a-fA-F]{2}\1){6}([0-9a-fA-F]{2})$/;
var macAddress64NoSeparators = /^([0-9a-fA-F]){16}$/;
var macAddress64WithDots = /^([0-9a-fA-F]{4}\.){3}([0-9a-fA-F]{4})$/;
function isMACAddress(str, options) {
  (0, _assertString.default)(str);
  if (options !== null && options !== void 0 && options.eui) {
    options.eui = String(options.eui);
  }
  /**
   * @deprecated `no_colons` TODO: remove it in the next major
  */
  if (options !== null && options !== void 0 && options.no_colons || options !== null && options !== void 0 && options.no_separators) {
    if (options.eui === '48') {
      return macAddress48NoSeparators.test(str);
    }
    if (options.eui === '64') {
      return macAddress64NoSeparators.test(str);
    }
    return macAddress48NoSeparators.test(str) || macAddress64NoSeparators.test(str);
  }
  if ((options === null || options === void 0 ? void 0 : options.eui) === '48') {
    return macAddress48.test(str) || macAddress48WithDots.test(str);
  }
  if ((options === null || options === void 0 ? void 0 : options.eui) === '64') {
    return macAddress64.test(str) || macAddress64WithDots.test(str);
  }
  return isMACAddress(str, {
    eui: '48'
  }) || isMACAddress(str, {
    eui: '64'
  });
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isIPRange.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isIPRange;
var _assertString = _interopRequireDefault(require("./util/assertString"));
var _isIP = _interopRequireDefault(require("./isIP"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
var subnetMaybe = /^\d{1,3}$/;
var v4Subnet = 32;
var v6Subnet = 128;
function isIPRange(str) {
  var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  (0, _assertString.default)(str);
  var parts = str.split('/');

  // parts[0] -> ip, parts[1] -> subnet
  if (parts.length !== 2) {
    return false;
  }
  if (!subnetMaybe.test(parts[1])) {
    return false;
  }

  // Disallow preceding 0 i.e. 01, 02, ...
  if (parts[1].length > 1 && parts[1].startsWith('0')) {
    return false;
  }
  var isValidIP = (0, _isIP.default)(parts[0], version);
  if (!isValidIP) {
    return false;
  }

  // Define valid subnet according to IP's version
  var expectedSubnet = null;
  switch (String(version)) {
    case '4':
      expectedSubnet = v4Subnet;
      break;
    case '6':
      expectedSubnet = v6Subnet;
      break;
    default:
      expectedSubnet = (0, _isIP.default)(parts[0], '6') ? v6Subnet : v4Subnet;
  }
  return parts[1] <= expectedSubnet && parts[1] >= 0;
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js","./isIP":"../../node_modules/validator/lib/isIP.js"}],"../../node_modules/validator/lib/isDate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isDate;
var _merge = _interopRequireDefault(require("./util/merge"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function _createForOfIteratorHelper(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
      t && (r = t);
      var _n = 0,
        F = function F() {};
      return {
        s: F,
        n: function n() {
          return _n >= r.length ? {
            done: !0
          } : {
            done: !1,
            value: r[_n++]
          };
        },
        e: function e(r) {
          throw r;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o,
    a = !0,
    u = !1;
  return {
    s: function s() {
      t = t.call(r);
    },
    n: function n() {
      var r = t.next();
      return a = r.done, r;
    },
    e: function e(r) {
      u = !0, o = r;
    },
    f: function f() {
      try {
        a || null == t.return || t.return();
      } finally {
        if (u) throw o;
      }
    }
  };
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
var default_date_options = {
  format: 'YYYY/MM/DD',
  delimiters: ['/', '-'],
  strictMode: false
};
function isValidFormat(format) {
  return /(^(y{4}|y{2})[.\/-](m{1,2})[.\/-](d{1,2})$)|(^(m{1,2})[.\/-](d{1,2})[.\/-]((y{4}|y{2})$))|(^(d{1,2})[.\/-](m{1,2})[.\/-]((y{4}|y{2})$))/gi.test(format);
}
function zip(date, format) {
  var zippedArr = [],
    len = Math.max(date.length, format.length);
  for (var i = 0; i < len; i++) {
    zippedArr.push([date[i], format[i]]);
  }
  return zippedArr;
}
function isDate(input, options) {
  if (typeof options === 'string') {
    // Allow backward compatibility for old format isDate(input [, format])
    options = (0, _merge.default)({
      format: options
    }, default_date_options);
  } else {
    options = (0, _merge.default)(options, default_date_options);
  }
  if (typeof input === 'string' && isValidFormat(options.format)) {
    if (options.strictMode && input.length !== options.format.length) return false;
    var formatDelimiter = options.delimiters.find(function (delimiter) {
      return options.format.indexOf(delimiter) !== -1;
    });
    var dateDelimiter = options.strictMode ? formatDelimiter : options.delimiters.find(function (delimiter) {
      return input.indexOf(delimiter) !== -1;
    });
    var dateAndFormat = zip(input.split(dateDelimiter), options.format.toLowerCase().split(formatDelimiter));
    var dateObj = {};
    var _iterator = _createForOfIteratorHelper(dateAndFormat),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _step$value = _slicedToArray(_step.value, 2),
          dateWord = _step$value[0],
          formatWord = _step$value[1];
        if (!dateWord || !formatWord || dateWord.length !== formatWord.length) {
          return false;
        }
        dateObj[formatWord.charAt(0)] = dateWord;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    var fullYear = dateObj.y;

    // Check if the year starts with a hyphen
    if (fullYear.startsWith('-')) {
      return false; // Hyphen before year is not allowed
    }
    if (dateObj.y.length === 2) {
      var parsedYear = parseInt(dateObj.y, 10);
      if (isNaN(parsedYear)) {
        return false;
      }
      var currentYearLastTwoDigits = new Date().getFullYear() % 100;
      if (parsedYear < currentYearLastTwoDigits) {
        fullYear = "20".concat(dateObj.y);
      } else {
        fullYear = "19".concat(dateObj.y);
      }
    }
    var month = dateObj.m;
    if (dateObj.m.length === 1) {
      month = "0".concat(dateObj.m);
    }
    var day = dateObj.d;
    if (dateObj.d.length === 1) {
      day = "0".concat(dateObj.d);
    }
    return new Date("".concat(fullYear, "-").concat(month, "-").concat(day, "T00:00:00.000Z")).getUTCDate() === +dateObj.d;
  }
  if (!options.strictMode) {
    return Object.prototype.toString.call(input) === '[object Date]' && isFinite(input);
  }
  return false;
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/merge":"../../node_modules/validator/lib/util/merge.js"}],"../../node_modules/validator/lib/isTime.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isTime;
var _merge = _interopRequireDefault(require("./util/merge"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
var default_time_options = {
  hourFormat: 'hour24',
  mode: 'default'
};
var formats = {
  hour24: {
    default: /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/,
    withSeconds: /^([01]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/,
    withOptionalSeconds: /^([01]?[0-9]|2[0-3]):([0-5][0-9])(?::([0-5][0-9]))?$/
  },
  hour12: {
    default: /^(0?[1-9]|1[0-2]):([0-5][0-9]) (A|P)M$/,
    withSeconds: /^(0?[1-9]|1[0-2]):([0-5][0-9]):([0-5][0-9]) (A|P)M$/,
    withOptionalSeconds: /^(0?[1-9]|1[0-2]):([0-5][0-9])(?::([0-5][0-9]))? (A|P)M$/
  }
};
function isTime(input, options) {
  options = (0, _merge.default)(options, default_time_options);
  if (typeof input !== 'string') return false;
  return formats[options.hourFormat][options.mode].test(input);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/merge":"../../node_modules/validator/lib/util/merge.js"}],"../../node_modules/validator/lib/util/includesArray.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var includes = function includes(arr, val) {
  return arr.some(function (arrVal) {
    return val === arrVal;
  });
};
var _default = exports.default = includes;
module.exports = exports.default;
module.exports.default = exports.default;
},{}],"../../node_modules/validator/lib/isBoolean.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isBoolean;
var _assertString = _interopRequireDefault(require("./util/assertString"));
var _includesArray = _interopRequireDefault(require("./util/includesArray"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
var defaultOptions = {
  loose: false
};
var strictBooleans = ['true', 'false', '1', '0'];
var looseBooleans = [].concat(strictBooleans, ['yes', 'no']);
function isBoolean(str) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOptions;
  (0, _assertString.default)(str);
  if (options.loose) {
    return (0, _includesArray.default)(looseBooleans, str.toLowerCase());
  }
  return (0, _includesArray.default)(strictBooleans, str);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js","./util/includesArray":"../../node_modules/validator/lib/util/includesArray.js"}],"../../node_modules/validator/lib/isLocale.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isLocale;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
/*
  = 3ALPHA              ; selected ISO 639 codes
    *2("-" 3ALPHA)      ; permanently reserved
 */
var extlang = '([A-Za-z]{3}(-[A-Za-z]{3}){0,2})';

/*
  = 2*3ALPHA            ; shortest ISO 639 code
    ["-" extlang]       ; sometimes followed by
                        ; extended language subtags
  / 4ALPHA              ; or reserved for future use
  / 5*8ALPHA            ; or registered language subtag
 */
var language = "(([a-zA-Z]{2,3}(-".concat(extlang, ")?)|([a-zA-Z]{5,8}))");

/*
  = 4ALPHA              ; ISO 15924 code
 */
var script = '([A-Za-z]{4})';

/*
  = 2ALPHA              ; ISO 3166-1 code
  / 3DIGIT              ; UN M.49 code
 */
var region = '([A-Za-z]{2}|\\d{3})';

/*
  = 5*8alphanum         ; registered variants
  / (DIGIT 3alphanum)
 */
var variant = '([A-Za-z0-9]{5,8}|(\\d[A-Z-a-z0-9]{3}))';

/*
  = DIGIT               ; 0 - 9
  / %x41-57             ; A - W
  / %x59-5A             ; Y - Z
  / %x61-77             ; a - w
  / %x79-7A             ; y - z
 */
var singleton = '(\\d|[A-W]|[Y-Z]|[a-w]|[y-z])';

/*
  = singleton 1*("-" (2*8alphanum))
                        ; Single alphanumerics
                        ; "x" reserved for private use
 */
var extension = "(".concat(singleton, "(-[A-Za-z0-9]{2,8})+)");

/*
  = "x" 1*("-" (1*8alphanum))
 */
var privateuse = '(x(-[A-Za-z0-9]{1,8})+)';

// irregular tags do not match the 'langtag' production and would not
// otherwise be considered 'well-formed'. These tags are all valid, but
// most are deprecated in favor of more modern subtags or subtag combination

var irregular = '((en-GB-oed)|(i-ami)|(i-bnn)|(i-default)|(i-enochian)|' + '(i-hak)|(i-klingon)|(i-lux)|(i-mingo)|(i-navajo)|(i-pwn)|(i-tao)|' + '(i-tay)|(i-tsu)|(sgn-BE-FR)|(sgn-BE-NL)|(sgn-CH-DE))';

// regular tags match the 'langtag' production, but their subtags are not
// extended language or variant subtags: their meaning is defined by
// their registration and all of these are deprecated in favor of a more
// modern subtag or sequence of subtags

var regular = '((art-lojban)|(cel-gaulish)|(no-bok)|(no-nyn)|(zh-guoyu)|' + '(zh-hakka)|(zh-min)|(zh-min-nan)|(zh-xiang))';

/*
  = irregular           ; non-redundant tags registered
  / regular             ; during the RFC 3066 era

 */
var grandfathered = "(".concat(irregular, "|").concat(regular, ")");

/*
  RFC 5646 defines delimitation of subtags via a hyphen:

      "Subtag" refers to a specific section of a tag, delimited by a
      hyphen, such as the subtags 'zh', 'Hant', and 'CN' in the tag "zh-
      Hant-CN".  Examples of subtags in this document are enclosed in
      single quotes ('Hant')

  However, we need to add "_" to maintain the existing behaviour.
 */
var delimiter = '(-|_)';

/*
  = language
    ["-" script]
    ["-" region]
    *("-" variant)
    *("-" extension)
    ["-" privateuse]
 */
var langtag = "".concat(language, "(").concat(delimiter).concat(script, ")?(").concat(delimiter).concat(region, ")?(").concat(delimiter).concat(variant, ")*(").concat(delimiter).concat(extension, ")*(").concat(delimiter).concat(privateuse, ")?");

/*
  Regex implementation based on BCP RFC 5646
  Tags for Identifying Languages
  https://www.rfc-editor.org/rfc/rfc5646.html
 */
var languageTagRegex = new RegExp("(^".concat(privateuse, "$)|(^").concat(grandfathered, "$)|(^").concat(langtag, "$)"));
function isLocale(str) {
  (0, _assertString.default)(str);
  return languageTagRegex.test(str);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isAbaRouting.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isAbaRouting;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
// http://www.brainjar.com/js/validation/
// https://www.aba.com/news-research/research-analysis/routing-number-policy-procedures
// series reserved for future use are excluded
var isRoutingReg = /^(?!(1[3-9])|(20)|(3[3-9])|(4[0-9])|(5[0-9])|(60)|(7[3-9])|(8[1-9])|(9[0-2])|(9[3-9]))[0-9]{9}$/;
function isAbaRouting(str) {
  (0, _assertString.default)(str);
  if (!isRoutingReg.test(str)) return false;
  var checkSumVal = 0;
  for (var i = 0; i < str.length; i++) {
    if (i % 3 === 0) checkSumVal += str[i] * 3;else if (i % 3 === 1) checkSumVal += str[i] * 7;else checkSumVal += str[i] * 1;
  }
  return checkSumVal % 10 === 0;
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isAlpha.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isAlpha;
exports.locales = void 0;
var _assertString = _interopRequireDefault(require("./util/assertString"));
var _alpha = require("./alpha");
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function isAlpha(_str) {
  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en-US';
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  (0, _assertString.default)(_str);
  var str = _str;
  var ignore = options.ignore;
  if (ignore) {
    if (ignore instanceof RegExp) {
      str = str.replace(ignore, '');
    } else if (typeof ignore === 'string') {
      str = str.replace(new RegExp("[".concat(ignore.replace(/[-[\]{}()*+?.,\\^$|#\\s]/g, '\\$&'), "]"), 'g'), ''); // escape regex for ignore
    } else {
      throw new Error('ignore should be instance of a String or RegExp');
    }
  }
  if (locale in _alpha.alpha) {
    return _alpha.alpha[locale].test(str);
  }
  throw new Error("Invalid locale '".concat(locale, "'"));
}
var locales = exports.locales = Object.keys(_alpha.alpha);
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js","./alpha":"../../node_modules/validator/lib/alpha.js"}],"../../node_modules/validator/lib/isAlphanumeric.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isAlphanumeric;
exports.locales = void 0;
var _assertString = _interopRequireDefault(require("./util/assertString"));
var _alpha = require("./alpha");
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function isAlphanumeric(_str) {
  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en-US';
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  (0, _assertString.default)(_str);
  var str = _str;
  var ignore = options.ignore;
  if (ignore) {
    if (ignore instanceof RegExp) {
      str = str.replace(ignore, '');
    } else if (typeof ignore === 'string') {
      str = str.replace(new RegExp("[".concat(ignore.replace(/[-[\]{}()*+?.,\\^$|#\\s]/g, '\\$&'), "]"), 'g'), ''); // escape regex for ignore
    } else {
      throw new Error('ignore should be instance of a String or RegExp');
    }
  }
  if (locale in _alpha.alphanumeric) {
    return _alpha.alphanumeric[locale].test(str);
  }
  throw new Error("Invalid locale '".concat(locale, "'"));
}
var locales = exports.locales = Object.keys(_alpha.alphanumeric);
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js","./alpha":"../../node_modules/validator/lib/alpha.js"}],"../../node_modules/validator/lib/isNumeric.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isNumeric;
var _assertString = _interopRequireDefault(require("./util/assertString"));
var _alpha = require("./alpha");
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
var numericNoSymbols = /^[0-9]+$/;
function isNumeric(str, options) {
  (0, _assertString.default)(str);
  if (options && options.no_symbols) {
    return numericNoSymbols.test(str);
  }
  return new RegExp("^[+-]?([0-9]*[".concat((options || {}).locale ? _alpha.decimal[options.locale] : '.', "])?[0-9]+$")).test(str);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js","./alpha":"../../node_modules/validator/lib/alpha.js"}],"../../node_modules/validator/lib/isPassportNumber.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isPassportNumber;
exports.locales = void 0;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
/**
 * Reference:
 * https://en.wikipedia.org/ -- Wikipedia
 * https://docs.microsoft.com/en-us/microsoft-365/compliance/eu-passport-number -- EU Passport Number
 * https://countrycode.org/ -- Country Codes
 */
var passportRegexByCountryCode = {
  AM: /^[A-Z]{2}\d{7}$/,
  // ARMENIA
  AR: /^[A-Z]{3}\d{6}$/,
  // ARGENTINA
  AT: /^[A-Z]\d{7}$/,
  // AUSTRIA
  AU: /^[A-Z]\d{7}$/,
  // AUSTRALIA
  AZ: /^[A-Z]{1}\d{8}$/,
  // AZERBAIJAN
  BE: /^[A-Z]{2}\d{6}$/,
  // BELGIUM
  BG: /^\d{9}$/,
  // BULGARIA
  BR: /^[A-Z]{2}\d{6}$/,
  // BRAZIL
  BY: /^[A-Z]{2}\d{7}$/,
  // BELARUS
  CA: /^[A-Z]{2}\d{6}$|^[A-Z]\d{6}[A-Z]{2}$/,
  // CANADA
  CH: /^[A-Z]\d{7}$/,
  // SWITZERLAND
  CN: /^G\d{8}$|^E(?![IO])[A-Z0-9]\d{7}$/,
  // CHINA [G=Ordinary, E=Electronic] followed by 8-digits, or E followed by any UPPERCASE letter (except I and O) followed by 7 digits
  CY: /^[A-Z](\d{6}|\d{8})$/,
  // CYPRUS
  CZ: /^\d{8}$/,
  // CZECH REPUBLIC
  DE: /^[CFGHJKLMNPRTVWXYZ0-9]{9}$/,
  // GERMANY
  DK: /^\d{9}$/,
  // DENMARK
  DZ: /^\d{9}$/,
  // ALGERIA
  EE: /^([A-Z]\d{7}|[A-Z]{2}\d{7})$/,
  // ESTONIA (K followed by 7-digits), e-passports have 2 UPPERCASE followed by 7 digits
  ES: /^[A-Z0-9]{2}([A-Z0-9]?)\d{6}$/,
  // SPAIN
  FI: /^[A-Z]{2}\d{7}$/,
  // FINLAND
  FR: /^\d{2}[A-Z]{2}\d{5}$/,
  // FRANCE
  GB: /^\d{9}$/,
  // UNITED KINGDOM
  GR: /^[A-Z]{2}\d{7}$/,
  // GREECE
  HR: /^\d{9}$/,
  // CROATIA
  HU: /^[A-Z]{2}(\d{6}|\d{7})$/,
  // HUNGARY
  IE: /^[A-Z0-9]{2}\d{7}$/,
  // IRELAND
  IN: /^[A-Z]{1}-?\d{7}$/,
  // INDIA
  ID: /^[A-C]\d{7}$/,
  // INDONESIA
  IR: /^[A-Z]\d{8}$/,
  // IRAN
  IS: /^(A)\d{7}$/,
  // ICELAND
  IT: /^[A-Z0-9]{2}\d{7}$/,
  // ITALY
  JM: /^[Aa]\d{7}$/,
  // JAMAICA
  JP: /^[A-Z]{2}\d{7}$/,
  // JAPAN
  KR: /^[MS]\d{8}$/,
  // SOUTH KOREA, REPUBLIC OF KOREA, [S=PS Passports, M=PM Passports]
  KZ: /^[a-zA-Z]\d{7}$/,
  // KAZAKHSTAN
  LI: /^[a-zA-Z]\d{5}$/,
  // LIECHTENSTEIN
  LT: /^[A-Z0-9]{8}$/,
  // LITHUANIA
  LU: /^[A-Z0-9]{8}$/,
  // LUXEMBURG
  LV: /^[A-Z0-9]{2}\d{7}$/,
  // LATVIA
  LY: /^[A-Z0-9]{8}$/,
  // LIBYA
  MT: /^\d{7}$/,
  // MALTA
  MZ: /^([A-Z]{2}\d{7})|(\d{2}[A-Z]{2}\d{5})$/,
  // MOZAMBIQUE
  MY: /^[AHK]\d{8}$/,
  // MALAYSIA
  MX: /^[A-Z]\d{8}$/,
  // MEXICO
  NL: /^[A-Z]{2}[A-Z0-9]{6}\d$/,
  // NETHERLANDS
  NZ: /^([Ll]([Aa]|[Dd]|[Ff]|[Hh])|[Ee]([Aa]|[Pp])|[Nn])\d{6}$/,
  // NEW ZEALAND
  PH: /^([A-Z](\d{6}|\d{7}[A-Z]))|([A-Z]{2}(\d{6}|\d{7}))$/,
  // PHILIPPINES
  PK: /^[A-Z]{2}\d{7}$/,
  // PAKISTAN
  PL: /^[A-Z]{2}\d{7}$/,
  // POLAND
  PT: /^[A-Z]\d{6}$/,
  // PORTUGAL
  RO: /^\d{8,9}$/,
  // ROMANIA
  RU: /^\d{9}$/,
  // RUSSIAN FEDERATION
  SE: /^\d{8}$/,
  // SWEDEN
  SL: /^(P)[A-Z]\d{7}$/,
  // SLOVENIA
  SK: /^[0-9A-Z]\d{7}$/,
  // SLOVAKIA
  TH: /^[A-Z]{1,2}\d{6,7}$/,
  // THAILAND
  TR: /^[A-Z]\d{8}$/,
  // TURKEY
  UA: /^[A-Z]{2}\d{6}$/,
  // UKRAINE
  US: /^\d{9}$|^[A-Z]\d{8}$/,
  // UNITED STATES
  ZA: /^[TAMD]\d{8}$/ // SOUTH AFRICA
};
var locales = exports.locales = Object.keys(passportRegexByCountryCode);

/**
 * Check if str is a valid passport number
 * relative to provided ISO Country Code.
 *
 * @param {string} str
 * @param {string} countryCode
 * @return {boolean}
 */
function isPassportNumber(str, countryCode) {
  (0, _assertString.default)(str);
  /** Remove All Whitespaces, Convert to UPPERCASE */
  var normalizedStr = str.replace(/\s/g, '').toUpperCase();
  return countryCode.toUpperCase() in passportRegexByCountryCode && passportRegexByCountryCode[countryCode].test(normalizedStr);
}
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isInt.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isInt;
var _assertString = _interopRequireDefault(require("./util/assertString"));
var _nullUndefinedCheck = _interopRequireDefault(require("./util/nullUndefinedCheck"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
var int = /^(?:[-+]?(?:0|[1-9][0-9]*))$/;
var intLeadingZeroes = /^[-+]?[0-9]+$/;
function isInt(str, options) {
  (0, _assertString.default)(str);
  options = options || {};

  // Get the regex to use for testing, based on whether
  // leading zeroes are allowed or not.
  var regex = options.allow_leading_zeroes === false ? int : intLeadingZeroes;

  // Check min/max/lt/gt
  var minCheckPassed = !options.hasOwnProperty('min') || (0, _nullUndefinedCheck.default)(options.min) || str >= options.min;
  var maxCheckPassed = !options.hasOwnProperty('max') || (0, _nullUndefinedCheck.default)(options.max) || str <= options.max;
  var ltCheckPassed = !options.hasOwnProperty('lt') || (0, _nullUndefinedCheck.default)(options.lt) || str < options.lt;
  var gtCheckPassed = !options.hasOwnProperty('gt') || (0, _nullUndefinedCheck.default)(options.gt) || str > options.gt;
  return regex.test(str) && minCheckPassed && maxCheckPassed && ltCheckPassed && gtCheckPassed;
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js","./util/nullUndefinedCheck":"../../node_modules/validator/lib/util/nullUndefinedCheck.js"}],"../../node_modules/validator/lib/isPort.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isPort;
var _isInt = _interopRequireDefault(require("./isInt"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function isPort(str) {
  return (0, _isInt.default)(str, {
    allow_leading_zeroes: false,
    min: 0,
    max: 65535
  });
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./isInt":"../../node_modules/validator/lib/isInt.js"}],"../../node_modules/validator/lib/isLowercase.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isLowercase;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function isLowercase(str) {
  (0, _assertString.default)(str);
  return str === str.toLowerCase();
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isUppercase.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isUppercase;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function isUppercase(str) {
  (0, _assertString.default)(str);
  return str === str.toUpperCase();
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isIMEI.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isIMEI;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
var imeiRegexWithoutHyphens = /^[0-9]{15}$/;
var imeiRegexWithHyphens = /^\d{2}-\d{6}-\d{6}-\d{1}$/;
function isIMEI(str, options) {
  (0, _assertString.default)(str);
  options = options || {};

  // default regex for checking imei is the one without hyphens

  var imeiRegex = imeiRegexWithoutHyphens;
  if (options.allow_hyphens) {
    imeiRegex = imeiRegexWithHyphens;
  }
  if (!imeiRegex.test(str)) {
    return false;
  }
  str = str.replace(/-/g, '');
  var sum = 0,
    mul = 2,
    l = 14;
  for (var i = 0; i < l; i++) {
    var digit = str.substring(l - i - 1, l - i);
    var tp = parseInt(digit, 10) * mul;
    if (tp >= 10) {
      sum += tp % 10 + 1;
    } else {
      sum += tp;
    }
    if (mul === 1) {
      mul += 1;
    } else {
      mul -= 1;
    }
  }
  var chk = (10 - sum % 10) % 10;
  if (chk !== parseInt(str.substring(14, 15), 10)) {
    return false;
  }
  return true;
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isAscii.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isAscii;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
/* eslint-disable no-control-regex */
var ascii = /^[\x00-\x7F]+$/;
/* eslint-enable no-control-regex */

function isAscii(str) {
  (0, _assertString.default)(str);
  return ascii.test(str);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isFullWidth.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isFullWidth;
exports.fullWidth = void 0;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
var fullWidth = exports.fullWidth = /[^\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;
function isFullWidth(str) {
  (0, _assertString.default)(str);
  return fullWidth.test(str);
}
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isHalfWidth.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isHalfWidth;
exports.halfWidth = void 0;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
var halfWidth = exports.halfWidth = /[\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;
function isHalfWidth(str) {
  (0, _assertString.default)(str);
  return halfWidth.test(str);
}
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isVariableWidth.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isVariableWidth;
var _assertString = _interopRequireDefault(require("./util/assertString"));
var _isFullWidth = require("./isFullWidth");
var _isHalfWidth = require("./isHalfWidth");
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function isVariableWidth(str) {
  (0, _assertString.default)(str);
  return _isFullWidth.fullWidth.test(str) && _isHalfWidth.halfWidth.test(str);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js","./isFullWidth":"../../node_modules/validator/lib/isFullWidth.js","./isHalfWidth":"../../node_modules/validator/lib/isHalfWidth.js"}],"../../node_modules/validator/lib/isMultibyte.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isMultibyte;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
/* eslint-disable no-control-regex */
var multibyte = /[^\x00-\x7F]/;
/* eslint-enable no-control-regex */

function isMultibyte(str) {
  (0, _assertString.default)(str);
  return multibyte.test(str);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/util/multilineRegex.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = multilineRegexp;
/**
 * Build RegExp object from an array
 * of multiple/multi-line regexp parts
 *
 * @param {string[]} parts
 * @param {string} flags
 * @return {object} - RegExp object
 */
function multilineRegexp(parts, flags) {
  var regexpAsStringLiteral = parts.join('');
  return new RegExp(regexpAsStringLiteral, flags);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{}],"../../node_modules/validator/lib/isSemVer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSemVer;
var _assertString = _interopRequireDefault(require("./util/assertString"));
var _multilineRegex = _interopRequireDefault(require("./util/multilineRegex"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
/**
 * Regular Expression to match
 * semantic versioning (SemVer)
 * built from multi-line, multi-parts regexp
 * Reference: https://semver.org/
 */
var semanticVersioningRegex = (0, _multilineRegex.default)(['^(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)', '(?:-((?:0|[1-9]\\d*|\\d*[a-z-][0-9a-z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-z-][0-9a-z-]*))*))', '?(?:\\+([0-9a-z-]+(?:\\.[0-9a-z-]+)*))?$'], 'i');
function isSemVer(str) {
  (0, _assertString.default)(str);
  return semanticVersioningRegex.test(str);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js","./util/multilineRegex":"../../node_modules/validator/lib/util/multilineRegex.js"}],"../../node_modules/validator/lib/isSurrogatePair.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSurrogatePair;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
var surrogatePair = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;
function isSurrogatePair(str) {
  (0, _assertString.default)(str);
  return surrogatePair.test(str);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isDecimal.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isDecimal;
var _merge = _interopRequireDefault(require("./util/merge"));
var _assertString = _interopRequireDefault(require("./util/assertString"));
var _includesArray = _interopRequireDefault(require("./util/includesArray"));
var _alpha = require("./alpha");
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function decimalRegExp(options) {
  var regExp = new RegExp("^[-+]?([0-9]+)?(\\".concat(_alpha.decimal[options.locale], "[0-9]{").concat(options.decimal_digits, "})").concat(options.force_decimal ? '' : '?', "$"));
  return regExp;
}
var default_decimal_options = {
  force_decimal: false,
  decimal_digits: '1,',
  locale: 'en-US'
};
var blacklist = ['', '-', '+'];
function isDecimal(str, options) {
  (0, _assertString.default)(str);
  options = (0, _merge.default)(options, default_decimal_options);
  if (options.locale in _alpha.decimal) {
    return !(0, _includesArray.default)(blacklist, str.replace(/ /g, '')) && decimalRegExp(options).test(str);
  }
  throw new Error("Invalid locale '".concat(options.locale, "'"));
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/merge":"../../node_modules/validator/lib/util/merge.js","./util/assertString":"../../node_modules/validator/lib/util/assertString.js","./util/includesArray":"../../node_modules/validator/lib/util/includesArray.js","./alpha":"../../node_modules/validator/lib/alpha.js"}],"../../node_modules/validator/lib/isHexadecimal.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isHexadecimal;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
var hexadecimal = /^(0x|0h)?[0-9A-F]+$/i;
function isHexadecimal(str) {
  (0, _assertString.default)(str);
  return hexadecimal.test(str);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isOctal.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isOctal;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
var octal = /^(0o)?[0-7]+$/i;
function isOctal(str) {
  (0, _assertString.default)(str);
  return octal.test(str);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isDivisibleBy.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isDivisibleBy;
var _assertString = _interopRequireDefault(require("./util/assertString"));
var _toFloat = _interopRequireDefault(require("./toFloat"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function isDivisibleBy(str, num) {
  (0, _assertString.default)(str);
  return (0, _toFloat.default)(str) % parseInt(num, 10) === 0;
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js","./toFloat":"../../node_modules/validator/lib/toFloat.js"}],"../../node_modules/validator/lib/isHexColor.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isHexColor;
var _assertString = _interopRequireDefault(require("./util/assertString"));
var _merge = _interopRequireDefault(require("./util/merge"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
var hexcolor = /^#?([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i;
var hexcolor_with_prefix = /^#([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i;
var default_is_hexcolor_options = {
  require_hashtag: false
};
function isHexColor(str, options) {
  (0, _assertString.default)(str);
  options = (0, _merge.default)(options, default_is_hexcolor_options);
  var hexcolor_regex = options.require_hashtag ? hexcolor_with_prefix : hexcolor;
  return hexcolor_regex.test(str);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js","./util/merge":"../../node_modules/validator/lib/util/merge.js"}],"../../node_modules/validator/lib/isRgbColor.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isRgbColor;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
} /* eslint-disable prefer-rest-params */
var rgbColor = /^rgb\((([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]),){2}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\)$/;
var rgbaColor = /^rgba\((([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]),){3}(0?\.\d\d?|1(\.0)?|0(\.0)?)\)$/;
var rgbColorPercent = /^rgb\((([0-9]%|[1-9][0-9]%|100%),){2}([0-9]%|[1-9][0-9]%|100%)\)$/;
var rgbaColorPercent = /^rgba\((([0-9]%|[1-9][0-9]%|100%),){3}(0?\.\d\d?|1(\.0)?|0(\.0)?)\)$/;
var startsWithRgb = /^rgba?/;
function isRgbColor(str, options) {
  (0, _assertString.default)(str);
  // default options to true for percent and false for spaces
  var allowSpaces = false;
  var includePercentValues = true;
  if (_typeof(options) !== 'object') {
    if (arguments.length >= 2) {
      includePercentValues = arguments[1];
    }
  } else {
    allowSpaces = options.allowSpaces !== undefined ? options.allowSpaces : allowSpaces;
    includePercentValues = options.includePercentValues !== undefined ? options.includePercentValues : includePercentValues;
  }
  if (allowSpaces) {
    // make sure it starts with continuous rgba? without spaces before stripping
    if (!startsWithRgb.test(str)) {
      return false;
    }
    // strip all whitespace
    str = str.replace(/\s/g, '');
  }
  if (!includePercentValues) {
    return rgbColor.test(str) || rgbaColor.test(str);
  }
  return rgbColor.test(str) || rgbaColor.test(str) || rgbColorPercent.test(str) || rgbaColorPercent.test(str);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isHSL.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isHSL;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
var hslComma = /^hsla?\(((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?))(deg|grad|rad|turn)?(,(\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%){2}(,((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%?))?\)$/i;
var hslSpace = /^hsla?\(((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?))(deg|grad|rad|turn)?(\s(\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%){2}\s?(\/\s((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%?)\s?)?\)$/i;
function isHSL(str) {
  (0, _assertString.default)(str);

  // Strip duplicate spaces before calling the validation regex (See  #1598 for more info)
  var strippedStr = str.replace(/\s+/g, ' ').replace(/\s?(hsla?\(|\)|,)\s?/ig, '$1');
  if (strippedStr.indexOf(',') !== -1) {
    return hslComma.test(strippedStr);
  }
  return hslSpace.test(strippedStr);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isISRC.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isISRC;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
// see http://isrc.ifpi.org/en/isrc-standard/code-syntax
var isrc = /^[A-Z]{2}[0-9A-Z]{3}\d{2}\d{5}$/;
function isISRC(str) {
  (0, _assertString.default)(str);
  return isrc.test(str);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isIBAN.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isIBAN;
exports.locales = void 0;
var _assertString = _interopRequireDefault(require("./util/assertString"));
var _includesArray = _interopRequireDefault(require("./util/includesArray"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
/**
 * List of country codes with
 * corresponding IBAN regular expression
 * Reference: https://en.wikipedia.org/wiki/International_Bank_Account_Number
 */
var ibanRegexThroughCountryCode = {
  AD: /^(AD[0-9]{2})\d{8}[A-Z0-9]{12}$/,
  AE: /^(AE[0-9]{2})\d{3}\d{16}$/,
  AL: /^(AL[0-9]{2})\d{8}[A-Z0-9]{16}$/,
  AT: /^(AT[0-9]{2})\d{16}$/,
  AZ: /^(AZ[0-9]{2})[A-Z0-9]{4}\d{20}$/,
  BA: /^(BA[0-9]{2})\d{16}$/,
  BE: /^(BE[0-9]{2})\d{12}$/,
  BG: /^(BG[0-9]{2})[A-Z]{4}\d{6}[A-Z0-9]{8}$/,
  BH: /^(BH[0-9]{2})[A-Z]{4}[A-Z0-9]{14}$/,
  BR: /^(BR[0-9]{2})\d{23}[A-Z]{1}[A-Z0-9]{1}$/,
  BY: /^(BY[0-9]{2})[A-Z0-9]{4}\d{20}$/,
  CH: /^(CH[0-9]{2})\d{5}[A-Z0-9]{12}$/,
  CR: /^(CR[0-9]{2})\d{18}$/,
  CY: /^(CY[0-9]{2})\d{8}[A-Z0-9]{16}$/,
  CZ: /^(CZ[0-9]{2})\d{20}$/,
  DE: /^(DE[0-9]{2})\d{18}$/,
  DK: /^(DK[0-9]{2})\d{14}$/,
  DO: /^(DO[0-9]{2})[A-Z]{4}\d{20}$/,
  DZ: /^(DZ\d{24})$/,
  EE: /^(EE[0-9]{2})\d{16}$/,
  EG: /^(EG[0-9]{2})\d{25}$/,
  ES: /^(ES[0-9]{2})\d{20}$/,
  FI: /^(FI[0-9]{2})\d{14}$/,
  FO: /^(FO[0-9]{2})\d{14}$/,
  FR: /^(FR[0-9]{2})\d{10}[A-Z0-9]{11}\d{2}$/,
  GB: /^(GB[0-9]{2})[A-Z]{4}\d{14}$/,
  GE: /^(GE[0-9]{2})[A-Z0-9]{2}\d{16}$/,
  GI: /^(GI[0-9]{2})[A-Z]{4}[A-Z0-9]{15}$/,
  GL: /^(GL[0-9]{2})\d{14}$/,
  GR: /^(GR[0-9]{2})\d{7}[A-Z0-9]{16}$/,
  GT: /^(GT[0-9]{2})[A-Z0-9]{4}[A-Z0-9]{20}$/,
  HR: /^(HR[0-9]{2})\d{17}$/,
  HU: /^(HU[0-9]{2})\d{24}$/,
  IE: /^(IE[0-9]{2})[A-Z]{4}\d{14}$/,
  IL: /^(IL[0-9]{2})\d{19}$/,
  IQ: /^(IQ[0-9]{2})[A-Z]{4}\d{15}$/,
  IR: /^(IR[0-9]{2})\d{22}$/,
  IS: /^(IS[0-9]{2})\d{22}$/,
  IT: /^(IT[0-9]{2})[A-Z]{1}\d{10}[A-Z0-9]{12}$/,
  JO: /^(JO[0-9]{2})[A-Z]{4}\d{22}$/,
  KW: /^(KW[0-9]{2})[A-Z]{4}[A-Z0-9]{22}$/,
  KZ: /^(KZ[0-9]{2})\d{3}[A-Z0-9]{13}$/,
  LB: /^(LB[0-9]{2})\d{4}[A-Z0-9]{20}$/,
  LC: /^(LC[0-9]{2})[A-Z]{4}[A-Z0-9]{24}$/,
  LI: /^(LI[0-9]{2})\d{5}[A-Z0-9]{12}$/,
  LT: /^(LT[0-9]{2})\d{16}$/,
  LU: /^(LU[0-9]{2})\d{3}[A-Z0-9]{13}$/,
  LV: /^(LV[0-9]{2})[A-Z]{4}[A-Z0-9]{13}$/,
  MA: /^(MA[0-9]{26})$/,
  MC: /^(MC[0-9]{2})\d{10}[A-Z0-9]{11}\d{2}$/,
  MD: /^(MD[0-9]{2})[A-Z0-9]{20}$/,
  ME: /^(ME[0-9]{2})\d{18}$/,
  MK: /^(MK[0-9]{2})\d{3}[A-Z0-9]{10}\d{2}$/,
  MR: /^(MR[0-9]{2})\d{23}$/,
  MT: /^(MT[0-9]{2})[A-Z]{4}\d{5}[A-Z0-9]{18}$/,
  MU: /^(MU[0-9]{2})[A-Z]{4}\d{19}[A-Z]{3}$/,
  MZ: /^(MZ[0-9]{2})\d{21}$/,
  NL: /^(NL[0-9]{2})[A-Z]{4}\d{10}$/,
  NO: /^(NO[0-9]{2})\d{11}$/,
  PK: /^(PK[0-9]{2})[A-Z0-9]{4}\d{16}$/,
  PL: /^(PL[0-9]{2})\d{24}$/,
  PS: /^(PS[0-9]{2})[A-Z]{4}[A-Z0-9]{21}$/,
  PT: /^(PT[0-9]{2})\d{21}$/,
  QA: /^(QA[0-9]{2})[A-Z]{4}[A-Z0-9]{21}$/,
  RO: /^(RO[0-9]{2})[A-Z]{4}[A-Z0-9]{16}$/,
  RS: /^(RS[0-9]{2})\d{18}$/,
  SA: /^(SA[0-9]{2})\d{2}[A-Z0-9]{18}$/,
  SC: /^(SC[0-9]{2})[A-Z]{4}\d{20}[A-Z]{3}$/,
  SE: /^(SE[0-9]{2})\d{20}$/,
  SI: /^(SI[0-9]{2})\d{15}$/,
  SK: /^(SK[0-9]{2})\d{20}$/,
  SM: /^(SM[0-9]{2})[A-Z]{1}\d{10}[A-Z0-9]{12}$/,
  SV: /^(SV[0-9]{2})[A-Z0-9]{4}\d{20}$/,
  TL: /^(TL[0-9]{2})\d{19}$/,
  TN: /^(TN[0-9]{2})\d{20}$/,
  TR: /^(TR[0-9]{2})\d{5}[A-Z0-9]{17}$/,
  UA: /^(UA[0-9]{2})\d{6}[A-Z0-9]{19}$/,
  VA: /^(VA[0-9]{2})\d{18}$/,
  VG: /^(VG[0-9]{2})[A-Z]{4}\d{16}$/,
  XK: /^(XK[0-9]{2})\d{16}$/
};

/**
 * Check if the country codes passed are valid using the
 * ibanRegexThroughCountryCode as a reference
 *
 * @param {array} countryCodeArray
 * @return {boolean}
 */

function hasOnlyValidCountryCodes(countryCodeArray) {
  var countryCodeArrayFilteredWithObjectIbanCode = countryCodeArray.filter(function (countryCode) {
    return !(countryCode in ibanRegexThroughCountryCode);
  });
  return countryCodeArrayFilteredWithObjectIbanCode.length === 0;
}

/**
 * Check whether string has correct universal IBAN format
 * The IBAN consists of up to 34 alphanumeric characters, as follows:
 * Country Code using ISO 3166-1 alpha-2, two letters
 * check digits, two digits and
 * Basic Bank Account Number (BBAN), up to 30 alphanumeric characters.
 * NOTE: Permitted IBAN characters are: digits [0-9] and the 26 latin alphabetic [A-Z]
 *
 * @param {string} str - string under validation
 * @param {object} options - object to pass the countries to be either whitelisted or blacklisted
 * @return {boolean}
 */
function hasValidIbanFormat(str, options) {
  // Strip white spaces and hyphens
  var strippedStr = str.replace(/[\s\-]+/gi, '').toUpperCase();
  var isoCountryCode = strippedStr.slice(0, 2).toUpperCase();
  var isoCountryCodeInIbanRegexCodeObject = isoCountryCode in ibanRegexThroughCountryCode;
  if (options.whitelist) {
    if (!hasOnlyValidCountryCodes(options.whitelist)) {
      return false;
    }
    var isoCountryCodeInWhiteList = (0, _includesArray.default)(options.whitelist, isoCountryCode);
    if (!isoCountryCodeInWhiteList) {
      return false;
    }
  }
  if (options.blacklist) {
    var isoCountryCodeInBlackList = (0, _includesArray.default)(options.blacklist, isoCountryCode);
    if (isoCountryCodeInBlackList) {
      return false;
    }
  }
  return isoCountryCodeInIbanRegexCodeObject && ibanRegexThroughCountryCode[isoCountryCode].test(strippedStr);
}

/**
   * Check whether string has valid IBAN Checksum
   * by performing basic mod-97 operation and
   * the remainder should equal 1
   * -- Start by rearranging the IBAN by moving the four initial characters to the end of the string
   * -- Replace each letter in the string with two digits, A -> 10, B = 11, Z = 35
   * -- Interpret the string as a decimal integer and
   * -- compute the remainder on division by 97 (mod 97)
   * Reference: https://en.wikipedia.org/wiki/International_Bank_Account_Number
   *
   * @param {string} str
   * @return {boolean}
   */
function hasValidIbanChecksum(str) {
  var strippedStr = str.replace(/[^A-Z0-9]+/gi, '').toUpperCase(); // Keep only digits and A-Z latin alphabetic
  var rearranged = strippedStr.slice(4) + strippedStr.slice(0, 4);
  var alphaCapsReplacedWithDigits = rearranged.replace(/[A-Z]/g, function (char) {
    return char.charCodeAt(0) - 55;
  });
  var remainder = alphaCapsReplacedWithDigits.match(/\d{1,7}/g).reduce(function (acc, value) {
    return Number(acc + value) % 97;
  }, '');
  return remainder === 1;
}
function isIBAN(str) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _assertString.default)(str);
  return hasValidIbanFormat(str, options) && hasValidIbanChecksum(str);
}
var locales = exports.locales = Object.keys(ibanRegexThroughCountryCode);
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js","./util/includesArray":"../../node_modules/validator/lib/util/includesArray.js"}],"../../node_modules/validator/lib/isISO31661Alpha2.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CountryCodes = void 0;
exports.default = isISO31661Alpha2;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
// from https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
var validISO31661Alpha2CountriesCodes = new Set(['AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AQ', 'AR', 'AS', 'AT', 'AU', 'AW', 'AX', 'AZ', 'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BR', 'BS', 'BT', 'BV', 'BW', 'BY', 'BZ', 'CA', 'CC', 'CD', 'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CN', 'CO', 'CR', 'CU', 'CV', 'CW', 'CX', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE', 'EG', 'EH', 'ER', 'ES', 'ET', 'FI', 'FJ', 'FK', 'FM', 'FO', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF', 'GG', 'GH', 'GI', 'GL', 'GM', 'GN', 'GP', 'GQ', 'GR', 'GS', 'GT', 'GU', 'GW', 'GY', 'HK', 'HM', 'HN', 'HR', 'HT', 'HU', 'ID', 'IE', 'IL', 'IM', 'IN', 'IO', 'IQ', 'IR', 'IS', 'IT', 'JE', 'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KP', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MH', 'MK', 'ML', 'MM', 'MN', 'MO', 'MP', 'MQ', 'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NC', 'NE', 'NF', 'NG', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU', 'NZ', 'OM', 'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM', 'PN', 'PR', 'PS', 'PT', 'PW', 'PY', 'QA', 'RE', 'RO', 'RS', 'RU', 'RW', 'SA', 'SB', 'SC', 'SD', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SR', 'SS', 'ST', 'SV', 'SX', 'SY', 'SZ', 'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO', 'TR', 'TT', 'TV', 'TW', 'TZ', 'UA', 'UG', 'UM', 'US', 'UY', 'UZ', 'VA', 'VC', 'VE', 'VG', 'VI', 'VN', 'VU', 'WF', 'WS', 'YE', 'YT', 'ZA', 'ZM', 'ZW']);
var alpha2CountryCode = /^[a-zA-Z]{2}$/;
function isISO31661Alpha2(str) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _assertString.default)(str);
  var userAssignedCodes = options.userAssignedCodes;
  var validUserAssignedCodes = (userAssignedCodes || []).reduce(function (accumulator, userAssignedCode) {
    if (alpha2CountryCode.test(userAssignedCode)) {
      accumulator.push(userAssignedCode.toUpperCase());
    }
    return accumulator;
  }, []);
  if (validUserAssignedCodes.includes(str.toUpperCase())) {
    return true;
  }
  return validISO31661Alpha2CountriesCodes.has(str.toUpperCase());
}
var CountryCodes = exports.CountryCodes = validISO31661Alpha2CountriesCodes;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isBIC.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isBIC;
var _assertString = _interopRequireDefault(require("./util/assertString"));
var _isISO31661Alpha = require("./isISO31661Alpha2");
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
// https://en.wikipedia.org/wiki/ISO_9362
var isBICReg = /^[A-Za-z]{6}[A-Za-z0-9]{2}([A-Za-z0-9]{3})?$/;
function isBIC(str) {
  (0, _assertString.default)(str);

  // toUpperCase() should be removed when a new major version goes out that changes
  // the regex to [A-Z] (per the spec).
  var countryCode = str.slice(4, 6).toUpperCase();
  if (!_isISO31661Alpha.CountryCodes.has(countryCode) && countryCode !== 'XK') {
    return false;
  }
  return isBICReg.test(str);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js","./isISO31661Alpha2":"../../node_modules/validator/lib/isISO31661Alpha2.js"}],"../../node_modules/validator/lib/isMD5.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isMD5;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
var md5 = /^[a-f0-9]{32}$/;
function isMD5(str) {
  (0, _assertString.default)(str);
  return md5.test(str);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isHash.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isHash;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
var lengths = {
  md5: 32,
  md4: 32,
  sha1: 40,
  sha256: 64,
  sha384: 96,
  sha512: 128,
  ripemd128: 32,
  ripemd160: 40,
  tiger128: 32,
  tiger160: 40,
  tiger192: 48,
  crc32: 8,
  crc32b: 8
};
function isHash(str, algorithm) {
  (0, _assertString.default)(str);
  var hash = new RegExp("^[a-fA-F0-9]{".concat(lengths[algorithm], "}$"));
  return hash.test(str);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isBase64.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isBase64;
var _assertString = _interopRequireDefault(require("./util/assertString"));
var _merge = _interopRequireDefault(require("./util/merge"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
var base64WithPadding = /^[A-Za-z0-9+/]+={0,2}$/;
var base64WithoutPadding = /^[A-Za-z0-9+/]+$/;
var base64UrlWithPadding = /^[A-Za-z0-9_-]+={0,2}$/;
var base64UrlWithoutPadding = /^[A-Za-z0-9_-]+$/;
function isBase64(str, options) {
  var _options;
  (0, _assertString.default)(str);
  options = (0, _merge.default)(options, {
    urlSafe: false,
    padding: !((_options = options) !== null && _options !== void 0 && _options.urlSafe)
  });
  if (str === '') return true;
  if (options.padding && str.length % 4 !== 0) return false;
  var regex;
  if (options.urlSafe) {
    regex = options.padding ? base64UrlWithPadding : base64UrlWithoutPadding;
  } else {
    regex = options.padding ? base64WithPadding : base64WithoutPadding;
  }
  return (!options.padding || str.length % 4 === 0) && regex.test(str);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js","./util/merge":"../../node_modules/validator/lib/util/merge.js"}],"../../node_modules/validator/lib/isJWT.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isJWT;
var _assertString = _interopRequireDefault(require("./util/assertString"));
var _isBase = _interopRequireDefault(require("./isBase64"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function isJWT(str) {
  (0, _assertString.default)(str);
  var dotSplit = str.split('.');
  var len = dotSplit.length;
  if (len !== 3) {
    return false;
  }
  return dotSplit.reduce(function (acc, currElem) {
    return acc && (0, _isBase.default)(currElem, {
      urlSafe: true
    });
  }, true);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js","./isBase64":"../../node_modules/validator/lib/isBase64.js"}],"../../node_modules/validator/lib/isJSON.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isJSON;
var _assertString = _interopRequireDefault(require("./util/assertString"));
var _includesArray = _interopRequireDefault(require("./util/includesArray"));
var _merge = _interopRequireDefault(require("./util/merge"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
var default_json_options = {
  allow_primitives: false,
  allow_any_value: false
};
function isJSON(str, options) {
  (0, _assertString.default)(str);
  try {
    options = (0, _merge.default)(options, default_json_options);
    var obj = JSON.parse(str);

    // When allow_any_value is true, accept anything that JSON.parse successfully parses
    if (options.allow_any_value) {
      return true;
    }
    var primitives = [];
    if (options.allow_primitives) {
      primitives = [null, false, true];
    }
    return (0, _includesArray.default)(primitives, obj) || !!obj && _typeof(obj) === 'object';
  } catch (e) {/* ignore */}
  return false;
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js","./util/includesArray":"../../node_modules/validator/lib/util/includesArray.js","./util/merge":"../../node_modules/validator/lib/util/merge.js"}],"../../node_modules/validator/lib/isEmpty.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isEmpty;
var _assertString = _interopRequireDefault(require("./util/assertString"));
var _merge = _interopRequireDefault(require("./util/merge"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
var default_is_empty_options = {
  ignore_whitespace: false
};
function isEmpty(str, options) {
  (0, _assertString.default)(str);
  options = (0, _merge.default)(options, default_is_empty_options);
  return (options.ignore_whitespace ? str.trim().length : str.length) === 0;
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js","./util/merge":"../../node_modules/validator/lib/util/merge.js"}],"../../node_modules/validator/lib/isLength.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isLength;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
/* eslint-disable prefer-rest-params */
function isLength(str, options) {
  (0, _assertString.default)(str);
  var min;
  var max;
  if (_typeof(options) === 'object') {
    min = options.min || 0;
    max = options.max;
  } else {
    // backwards compatibility: isLength(str, min [, max])
    min = arguments[1] || 0;
    max = arguments[2];
  }
  var presentationSequences = str.match(/[^\uFE0F\uFE0E][\uFE0F\uFE0E]/g) || [];
  var surrogatePairs = str.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || [];
  var len = str.length - presentationSequences.length - surrogatePairs.length;
  var isInsideRange = len >= min && (typeof max === 'undefined' || len <= max);
  if (isInsideRange && Array.isArray(options === null || options === void 0 ? void 0 : options.discreteLengths)) {
    return options.discreteLengths.some(function (discreteLen) {
      return discreteLen === len;
    });
  }
  return isInsideRange;
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isULID.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isULID;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function isULID(str) {
  (0, _assertString.default)(str);
  return /^[0-7][0-9A-HJKMNP-TV-Z]{25}$/i.test(str);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isUUID.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isUUID;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
var uuid = {
  1: /^[0-9A-F]{8}-[0-9A-F]{4}-1[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  2: /^[0-9A-F]{8}-[0-9A-F]{4}-2[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  3: /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  4: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  5: /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  6: /^[0-9A-F]{8}-[0-9A-F]{4}-6[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  7: /^[0-9A-F]{8}-[0-9A-F]{4}-7[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  8: /^[0-9A-F]{8}-[0-9A-F]{4}-8[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  nil: /^00000000-0000-0000-0000-000000000000$/i,
  max: /^ffffffff-ffff-ffff-ffff-ffffffffffff$/i,
  loose: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
  // From https://github.com/uuidjs/uuid/blob/main/src/regex.js
  all: /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i
};
function isUUID(str, version) {
  (0, _assertString.default)(str);
  if (version === undefined || version === null) {
    version = 'all';
  }
  return version in uuid ? uuid[version].test(str) : false;
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isMongoId.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isMongoId;
var _assertString = _interopRequireDefault(require("./util/assertString"));
var _isHexadecimal = _interopRequireDefault(require("./isHexadecimal"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function isMongoId(str) {
  (0, _assertString.default)(str);
  return (0, _isHexadecimal.default)(str) && str.length === 24;
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js","./isHexadecimal":"../../node_modules/validator/lib/isHexadecimal.js"}],"../../node_modules/validator/lib/isAfter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isAfter;
var _toDate = _interopRequireDefault(require("./toDate"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function isAfter(date, options) {
  // For backwards compatibility:
  // isAfter(str [, date]), i.e. `options` could be used as argument for the legacy `date`
  var comparisonDate = (_typeof(options) === 'object' ? options.comparisonDate : options) || Date().toString();
  var comparison = (0, _toDate.default)(comparisonDate);
  var original = (0, _toDate.default)(date);
  return !!(original && comparison && original > comparison);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./toDate":"../../node_modules/validator/lib/toDate.js"}],"../../node_modules/validator/lib/isBefore.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isBefore;
var _toDate = _interopRequireDefault(require("./toDate"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function isBefore(date, options) {
  // For backwards compatibility:
  // isBefore(str [, date]), i.e. `options` could be used as argument for the legacy `date`
  var comparisonDate = (_typeof(options) === 'object' ? options.comparisonDate : options) || Date().toString();
  var comparison = (0, _toDate.default)(comparisonDate);
  var original = (0, _toDate.default)(date);
  return !!(original && comparison && original < comparison);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./toDate":"../../node_modules/validator/lib/toDate.js"}],"../../node_modules/validator/lib/isIn.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isIn;
var _assertString = _interopRequireDefault(require("./util/assertString"));
var _toString = _interopRequireDefault(require("./util/toString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function isIn(str, options) {
  (0, _assertString.default)(str);
  var i;
  if (Object.prototype.toString.call(options) === '[object Array]') {
    var array = [];
    for (i in options) {
      // https://github.com/gotwarlost/istanbul/blob/master/ignoring-code-for-coverage.md#ignoring-code-for-coverage-purposes
      // istanbul ignore else
      if ({}.hasOwnProperty.call(options, i)) {
        array[i] = (0, _toString.default)(options[i]);
      }
    }
    return array.indexOf(str) >= 0;
  } else if (_typeof(options) === 'object') {
    return options.hasOwnProperty(str);
  } else if (options && typeof options.indexOf === 'function') {
    return options.indexOf(str) >= 0;
  }
  return false;
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js","./util/toString":"../../node_modules/validator/lib/util/toString.js"}],"../../node_modules/validator/lib/isLuhnNumber.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isLuhnNumber;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function isLuhnNumber(str) {
  (0, _assertString.default)(str);
  var sanitized = str.replace(/[- ]+/g, '');
  var sum = 0;
  var digit;
  var tmpNum;
  var shouldDouble;
  for (var i = sanitized.length - 1; i >= 0; i--) {
    digit = sanitized.substring(i, i + 1);
    tmpNum = parseInt(digit, 10);
    if (shouldDouble) {
      tmpNum *= 2;
      if (tmpNum >= 10) {
        sum += tmpNum % 10 + 1;
      } else {
        sum += tmpNum;
      }
    } else {
      sum += tmpNum;
    }
    shouldDouble = !shouldDouble;
  }
  return !!(sum % 10 === 0 ? sanitized : false);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isCreditCard.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isCreditCard;
var _assertString = _interopRequireDefault(require("./util/assertString"));
var _isLuhnNumber = _interopRequireDefault(require("./isLuhnNumber"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
var cards = {
  amex: /^3[47][0-9]{13}$/,
  dinersclub: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
  discover: /^6(?:011|5[0-9][0-9])[0-9]{12,15}$/,
  jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
  mastercard: /^5[1-5][0-9]{2}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/,
  // /^[25][1-7][0-9]{14}$/;
  unionpay: /^(6[27][0-9]{14}|^(81[0-9]{14,17}))$/,
  visa: /^(?:4[0-9]{12})(?:[0-9]{3,6})?$/
};
var allCards = function () {
  var tmpCardsArray = [];
  for (var cardProvider in cards) {
    // istanbul ignore else
    if (cards.hasOwnProperty(cardProvider)) {
      tmpCardsArray.push(cards[cardProvider]);
    }
  }
  return tmpCardsArray;
}();
function isCreditCard(card) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _assertString.default)(card);
  var provider = options.provider;
  var sanitized = card.replace(/[- ]+/g, '');
  if (provider && provider.toLowerCase() in cards) {
    // specific provider in the list
    if (!cards[provider.toLowerCase()].test(sanitized)) {
      return false;
    }
  } else if (provider && !(provider.toLowerCase() in cards)) {
    /* specific provider not in the list */
    throw new Error("".concat(provider, " is not a valid credit card provider."));
  } else if (!allCards.some(function (cardProvider) {
    return cardProvider.test(sanitized);
  })) {
    // no specific provider
    return false;
  }
  return (0, _isLuhnNumber.default)(card);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js","./isLuhnNumber":"../../node_modules/validator/lib/isLuhnNumber.js"}],"../../node_modules/validator/lib/isIdentityCard.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isIdentityCard;
var _assertString = _interopRequireDefault(require("./util/assertString"));
var _includesArray = _interopRequireDefault(require("./util/includesArray"));
var _isInt = _interopRequireDefault(require("./isInt"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
var validators = {
  PL: function PL(str) {
    (0, _assertString.default)(str);
    var weightOfDigits = {
      1: 1,
      2: 3,
      3: 7,
      4: 9,
      5: 1,
      6: 3,
      7: 7,
      8: 9,
      9: 1,
      10: 3,
      11: 0
    };
    if (str != null && str.length === 11 && (0, _isInt.default)(str, {
      allow_leading_zeroes: true
    })) {
      var digits = str.split('').slice(0, -1);
      var sum = digits.reduce(function (acc, digit, index) {
        return acc + Number(digit) * weightOfDigits[index + 1];
      }, 0);
      var modulo = sum % 10;
      var lastDigit = Number(str.charAt(str.length - 1));
      if (modulo === 0 && lastDigit === 0 || lastDigit === 10 - modulo) {
        return true;
      }
    }
    return false;
  },
  ES: function ES(str) {
    (0, _assertString.default)(str);
    var DNI = /^[0-9X-Z][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/;
    var charsValue = {
      X: 0,
      Y: 1,
      Z: 2
    };
    var controlDigits = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E'];

    // sanitize user input
    var sanitized = str.trim().toUpperCase();

    // validate the data structure
    if (!DNI.test(sanitized)) {
      return false;
    }

    // validate the control digit
    var number = sanitized.slice(0, -1).replace(/[X,Y,Z]/g, function (char) {
      return charsValue[char];
    });
    return sanitized.endsWith(controlDigits[number % 23]);
  },
  FI: function FI(str) {
    // https://dvv.fi/en/personal-identity-code#:~:text=control%20character%20for%20a-,personal,-identity%20code%20calculated
    (0, _assertString.default)(str);
    if (str.length !== 11) {
      return false;
    }
    if (!str.match(/^\d{6}[\-A\+]\d{3}[0-9ABCDEFHJKLMNPRSTUVWXY]{1}$/)) {
      return false;
    }
    var checkDigits = '0123456789ABCDEFHJKLMNPRSTUVWXY';
    var idAsNumber = parseInt(str.slice(0, 6), 10) * 1000 + parseInt(str.slice(7, 10), 10);
    var remainder = idAsNumber % 31;
    var checkDigit = checkDigits[remainder];
    return checkDigit === str.slice(10, 11);
  },
  IN: function IN(str) {
    var DNI = /^[1-9]\d{3}\s?\d{4}\s?\d{4}$/;

    // multiplication table
    var d = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 0, 6, 7, 8, 9, 5], [2, 3, 4, 0, 1, 7, 8, 9, 5, 6], [3, 4, 0, 1, 2, 8, 9, 5, 6, 7], [4, 0, 1, 2, 3, 9, 5, 6, 7, 8], [5, 9, 8, 7, 6, 0, 4, 3, 2, 1], [6, 5, 9, 8, 7, 1, 0, 4, 3, 2], [7, 6, 5, 9, 8, 2, 1, 0, 4, 3], [8, 7, 6, 5, 9, 3, 2, 1, 0, 4], [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]];

    // permutation table
    var p = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 5, 7, 6, 2, 8, 3, 0, 9, 4], [5, 8, 0, 3, 7, 9, 6, 1, 4, 2], [8, 9, 1, 6, 0, 4, 3, 5, 2, 7], [9, 4, 5, 3, 1, 2, 6, 8, 7, 0], [4, 2, 8, 6, 5, 7, 3, 9, 0, 1], [2, 7, 9, 3, 8, 0, 6, 4, 1, 5], [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]];

    // sanitize user input
    var sanitized = str.trim();

    // validate the data structure
    if (!DNI.test(sanitized)) {
      return false;
    }
    var c = 0;
    var invertedArray = sanitized.replace(/\s/g, '').split('').map(Number).reverse();
    invertedArray.forEach(function (val, i) {
      c = d[c][p[i % 8][val]];
    });
    return c === 0;
  },
  IR: function IR(str) {
    if (!str.match(/^\d{10}$/)) return false;
    str = "0000".concat(str).slice(str.length - 6);
    if (parseInt(str.slice(3, 9), 10) === 0) return false;
    var lastNumber = parseInt(str.slice(9, 10), 10);
    var sum = 0;
    for (var i = 0; i < 9; i++) {
      sum += parseInt(str.slice(i, i + 1), 10) * (10 - i);
    }
    sum %= 11;
    return sum < 2 && lastNumber === sum || sum >= 2 && lastNumber === 11 - sum;
  },
  IT: function IT(str) {
    if (str.length !== 9) return false;
    if (str === 'CA00000AA') return false; // https://it.wikipedia.org/wiki/Carta_d%27identit%C3%A0_elettronica_italiana
    return str.search(/C[A-Z]\d{5}[A-Z]{2}/i) > -1;
  },
  NO: function NO(str) {
    var sanitized = str.trim();
    if (isNaN(Number(sanitized))) return false;
    if (sanitized.length !== 11) return false;
    if (sanitized === '00000000000') return false;

    // https://no.wikipedia.org/wiki/F%C3%B8dselsnummer
    var f = sanitized.split('').map(Number);
    var k1 = (11 - (3 * f[0] + 7 * f[1] + 6 * f[2] + 1 * f[3] + 8 * f[4] + 9 * f[5] + 4 * f[6] + 5 * f[7] + 2 * f[8]) % 11) % 11;
    var k2 = (11 - (5 * f[0] + 4 * f[1] + 3 * f[2] + 2 * f[3] + 7 * f[4] + 6 * f[5] + 5 * f[6] + 4 * f[7] + 3 * f[8] + 2 * k1) % 11) % 11;
    if (k1 !== f[9] || k2 !== f[10]) return false;
    return true;
  },
  TH: function TH(str) {
    if (!str.match(/^[1-8]\d{12}$/)) return false;

    // validate check digit
    var sum = 0;
    for (var i = 0; i < 12; i++) {
      sum += parseInt(str[i], 10) * (13 - i);
    }
    return str[12] === ((11 - sum % 11) % 10).toString();
  },
  LK: function LK(str) {
    var old_nic = /^[1-9]\d{8}[vx]$/i;
    var new_nic = /^[1-9]\d{11}$/i;
    if (str.length === 10 && old_nic.test(str)) return true;else if (str.length === 12 && new_nic.test(str)) return true;
    return false;
  },
  'he-IL': function heIL(str) {
    var DNI = /^\d{9}$/;

    // sanitize user input
    var sanitized = str.trim();

    // validate the data structure
    if (!DNI.test(sanitized)) {
      return false;
    }
    var id = sanitized;
    var sum = 0,
      incNum;
    for (var i = 0; i < id.length; i++) {
      incNum = Number(id[i]) * (i % 2 + 1); // Multiply number by 1 or 2
      sum += incNum > 9 ? incNum - 9 : incNum; // Sum the digits up and add to total
    }
    return sum % 10 === 0;
  },
  'ar-LY': function arLY(str) {
    // Libya National Identity Number NIN is 12 digits, the first digit is either 1 or 2
    var NIN = /^(1|2)\d{11}$/;

    // sanitize user input
    var sanitized = str.trim();
    return NIN.test(sanitized);
  },
  'ar-TN': function arTN(str) {
    var DNI = /^\d{8}$/;

    // sanitize user input
    var sanitized = str.trim();
    return DNI.test(sanitized);
  },
  'zh-CN': function zhCN(str) {
    var provincesAndCities = ['11',
    // 北京
    '12',
    // 天津
    '13',
    // 河北
    '14',
    // 山西
    '15',
    // 内蒙古
    '21',
    // 辽宁
    '22',
    // 吉林
    '23',
    // 黑龙江
    '31',
    // 上海
    '32',
    // 江苏
    '33',
    // 浙江
    '34',
    // 安徽
    '35',
    // 福建
    '36',
    // 江西
    '37',
    // 山东
    '41',
    // 河南
    '42',
    // 湖北
    '43',
    // 湖南
    '44',
    // 广东
    '45',
    // 广西
    '46',
    // 海南
    '50',
    // 重庆
    '51',
    // 四川
    '52',
    // 贵州
    '53',
    // 云南
    '54',
    // 西藏
    '61',
    // 陕西
    '62',
    // 甘肃
    '63',
    // 青海
    '64',
    // 宁夏
    '65',
    // 新疆
    '71',
    // 台湾
    '81',
    // 香港
    '82',
    // 澳门
    '91' // 国外
    ];
    var powers = ['7', '9', '10', '5', '8', '4', '2', '1', '6', '3', '7', '9', '10', '5', '8', '4', '2'];
    var parityBit = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
    var checkAddressCode = function checkAddressCode(addressCode) {
      return (0, _includesArray.default)(provincesAndCities, addressCode);
    };
    var checkBirthDayCode = function checkBirthDayCode(birDayCode) {
      var yyyy = parseInt(birDayCode.substring(0, 4), 10);
      var mm = parseInt(birDayCode.substring(4, 6), 10);
      var dd = parseInt(birDayCode.substring(6), 10);
      var xdata = new Date(yyyy, mm - 1, dd);
      if (xdata > new Date()) {
        return false;
        // eslint-disable-next-line max-len
      } else if (xdata.getFullYear() === yyyy && xdata.getMonth() === mm - 1 && xdata.getDate() === dd) {
        return true;
      }
      return false;
    };
    var getParityBit = function getParityBit(idCardNo) {
      var id17 = idCardNo.substring(0, 17);
      var power = 0;
      for (var i = 0; i < 17; i++) {
        power += parseInt(id17.charAt(i), 10) * parseInt(powers[i], 10);
      }
      var mod = power % 11;
      return parityBit[mod];
    };
    var checkParityBit = function checkParityBit(idCardNo) {
      return getParityBit(idCardNo) === idCardNo.charAt(17).toUpperCase();
    };
    var check15IdCardNo = function check15IdCardNo(idCardNo) {
      var check = /^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}$/.test(idCardNo);
      if (!check) return false;
      var addressCode = idCardNo.substring(0, 2);
      check = checkAddressCode(addressCode);
      if (!check) return false;
      var birDayCode = "19".concat(idCardNo.substring(6, 12));
      check = checkBirthDayCode(birDayCode);
      if (!check) return false;
      return true;
    };
    var check18IdCardNo = function check18IdCardNo(idCardNo) {
      var check = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/.test(idCardNo);
      if (!check) return false;
      var addressCode = idCardNo.substring(0, 2);
      check = checkAddressCode(addressCode);
      if (!check) return false;
      var birDayCode = idCardNo.substring(6, 14);
      check = checkBirthDayCode(birDayCode);
      if (!check) return false;
      return checkParityBit(idCardNo);
    };
    var checkIdCardNo = function checkIdCardNo(idCardNo) {
      var check = /^\d{15}|(\d{17}(\d|x|X))$/.test(idCardNo);
      if (!check) return false;
      if (idCardNo.length === 15) {
        return check15IdCardNo(idCardNo);
      }
      return check18IdCardNo(idCardNo);
    };
    return checkIdCardNo(str);
  },
  'zh-HK': function zhHK(str) {
    // sanitize user input
    str = str.trim();

    // HKID number starts with 1 or 2 letters, followed by 6 digits,
    // then a checksum contained in square / round brackets or nothing
    var regexHKID = /^[A-Z]{1,2}[0-9]{6}((\([0-9A]\))|(\[[0-9A]\])|([0-9A]))$/;
    var regexIsDigit = /^[0-9]$/;

    // convert the user input to all uppercase and apply regex
    str = str.toUpperCase();
    if (!regexHKID.test(str)) return false;
    str = str.replace(/\[|\]|\(|\)/g, '');
    if (str.length === 8) str = "3".concat(str);
    var checkSumVal = 0;
    for (var i = 0; i <= 7; i++) {
      var convertedChar = void 0;
      if (!regexIsDigit.test(str[i])) convertedChar = (str[i].charCodeAt(0) - 55) % 11;else convertedChar = str[i];
      checkSumVal += convertedChar * (9 - i);
    }
    checkSumVal %= 11;
    var checkSumConverted;
    if (checkSumVal === 0) checkSumConverted = '0';else if (checkSumVal === 1) checkSumConverted = 'A';else checkSumConverted = String(11 - checkSumVal);
    if (checkSumConverted === str[str.length - 1]) return true;
    return false;
  },
  'zh-TW': function zhTW(str) {
    var ALPHABET_CODES = {
      A: 10,
      B: 11,
      C: 12,
      D: 13,
      E: 14,
      F: 15,
      G: 16,
      H: 17,
      I: 34,
      J: 18,
      K: 19,
      L: 20,
      M: 21,
      N: 22,
      O: 35,
      P: 23,
      Q: 24,
      R: 25,
      S: 26,
      T: 27,
      U: 28,
      V: 29,
      W: 32,
      X: 30,
      Y: 31,
      Z: 33
    };
    var sanitized = str.trim().toUpperCase();
    if (!/^[A-Z][0-9]{9}$/.test(sanitized)) return false;
    return Array.from(sanitized).reduce(function (sum, number, index) {
      if (index === 0) {
        var code = ALPHABET_CODES[number];
        return code % 10 * 9 + Math.floor(code / 10);
      }
      if (index === 9) {
        return (10 - sum % 10 - Number(number)) % 10 === 0;
      }
      return sum + Number(number) * (9 - index);
    }, 0);
  },
  PK: function PK(str) {
    // Pakistani National Identity Number CNIC is 13 digits
    var CNIC = /^[1-7][0-9]{4}-[0-9]{7}-[1-9]$/;

    // sanitize user input
    var sanitized = str.trim();

    // validate the data structure
    return CNIC.test(sanitized);
  }
};
function isIdentityCard(str, locale) {
  (0, _assertString.default)(str);
  if (locale in validators) {
    return validators[locale](str);
  } else if (locale === 'any') {
    for (var key in validators) {
      // https://github.com/gotwarlost/istanbul/blob/master/ignoring-code-for-coverage.md#ignoring-code-for-coverage-purposes
      // istanbul ignore else
      if (validators.hasOwnProperty(key)) {
        var validator = validators[key];
        if (validator(str)) {
          return true;
        }
      }
    }
    return false;
  }
  throw new Error("Invalid locale '".concat(locale, "'"));
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js","./util/includesArray":"../../node_modules/validator/lib/util/includesArray.js","./isInt":"../../node_modules/validator/lib/isInt.js"}],"../../node_modules/validator/lib/isEAN.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isEAN;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
/**
 * The most commonly used EAN standard is
 * the thirteen-digit EAN-13, while the
 * less commonly used 8-digit EAN-8 barcode was
 * introduced for use on small packages.
 * Also EAN/UCC-14 is used for Grouping of individual
 * trade items above unit level(Intermediate, Carton or Pallet).
 * For more info about EAN-14 checkout: https://www.gtin.info/itf-14-barcodes/
 * EAN consists of:
 * GS1 prefix, manufacturer code, product code and check digit
 * Reference: https://en.wikipedia.org/wiki/International_Article_Number
 * Reference: https://www.gtin.info/
 */

/**
 * Define EAN Lengths; 8 for EAN-8; 13 for EAN-13; 14 for EAN-14
 * and Regular Expression for valid EANs (EAN-8, EAN-13, EAN-14),
 * with exact numeric matching of 8 or 13 or 14 digits [0-9]
 */
var LENGTH_EAN_8 = 8;
var LENGTH_EAN_14 = 14;
var validEanRegex = /^(\d{8}|\d{13}|\d{14})$/;

/**
 * Get position weight given:
 * EAN length and digit index/position
 *
 * @param {number} length
 * @param {number} index
 * @return {number}
 */
function getPositionWeightThroughLengthAndIndex(length, index) {
  if (length === LENGTH_EAN_8 || length === LENGTH_EAN_14) {
    return index % 2 === 0 ? 3 : 1;
  }
  return index % 2 === 0 ? 1 : 3;
}

/**
 * Calculate EAN Check Digit
 * Reference: https://en.wikipedia.org/wiki/International_Article_Number#Calculation_of_checksum_digit
 *
 * @param {string} ean
 * @return {number}
 */
function calculateCheckDigit(ean) {
  var checksum = ean.slice(0, -1).split('').map(function (char, index) {
    return Number(char) * getPositionWeightThroughLengthAndIndex(ean.length, index);
  }).reduce(function (acc, partialSum) {
    return acc + partialSum;
  }, 0);
  var remainder = 10 - checksum % 10;
  return remainder < 10 ? remainder : 0;
}

/**
 * Check if string is valid EAN:
 * Matches EAN-8/EAN-13/EAN-14 regex
 * Has valid check digit.
 *
 * @param {string} str
 * @return {boolean}
 */
function isEAN(str) {
  (0, _assertString.default)(str);
  var actualCheckDigit = Number(str.slice(-1));
  return validEanRegex.test(str) && actualCheckDigit === calculateCheckDigit(str);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isISIN.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isISIN;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
var isin = /^[A-Z]{2}[0-9A-Z]{9}[0-9]$/;

// this link details how the check digit is calculated:
// https://www.isin.org/isin-format/. it is a little bit
// odd in that it works with digits, not numbers. in order
// to make only one pass through the ISIN characters, the
// each alpha character is handled as 2 characters within
// the loop.

function isISIN(str) {
  (0, _assertString.default)(str);
  if (!isin.test(str)) {
    return false;
  }
  var double = true;
  var sum = 0;
  // convert values
  for (var i = str.length - 2; i >= 0; i--) {
    if (str[i] >= 'A' && str[i] <= 'Z') {
      var value = str[i].charCodeAt(0) - 55;
      var lo = value % 10;
      var hi = Math.trunc(value / 10);
      // letters have two digits, so handle the low order
      // and high order digits separately.
      for (var _i = 0, _arr = [lo, hi]; _i < _arr.length; _i++) {
        var digit = _arr[_i];
        if (double) {
          if (digit >= 5) {
            sum += 1 + (digit - 5) * 2;
          } else {
            sum += digit * 2;
          }
        } else {
          sum += digit;
        }
        double = !double;
      }
    } else {
      var _digit = str[i].charCodeAt(0) - '0'.charCodeAt(0);
      if (double) {
        if (_digit >= 5) {
          sum += 1 + (_digit - 5) * 2;
        } else {
          sum += _digit * 2;
        }
      } else {
        sum += _digit;
      }
      double = !double;
    }
  }
  var check = Math.trunc((sum + 9) / 10) * 10 - sum;
  return +str[str.length - 1] === check;
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isISBN.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isISBN;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
var possibleIsbn10 = /^(?:[0-9]{9}X|[0-9]{10})$/;
var possibleIsbn13 = /^(?:[0-9]{13})$/;
var factor = [1, 3];
function isISBN(isbn, options) {
  (0, _assertString.default)(isbn);

  // For backwards compatibility:
  // isISBN(str [, version]), i.e. `options` could be used as argument for the legacy `version`
  var version = String((options === null || options === void 0 ? void 0 : options.version) || options);
  if (!(options !== null && options !== void 0 && options.version || options)) {
    return isISBN(isbn, {
      version: 10
    }) || isISBN(isbn, {
      version: 13
    });
  }
  var sanitizedIsbn = isbn.replace(/[\s-]+/g, '');
  var checksum = 0;
  if (version === '10') {
    if (!possibleIsbn10.test(sanitizedIsbn)) {
      return false;
    }
    for (var i = 0; i < version - 1; i++) {
      checksum += (i + 1) * sanitizedIsbn.charAt(i);
    }
    if (sanitizedIsbn.charAt(9) === 'X') {
      checksum += 10 * 10;
    } else {
      checksum += 10 * sanitizedIsbn.charAt(9);
    }
    if (checksum % 11 === 0) {
      return true;
    }
  } else if (version === '13') {
    if (!possibleIsbn13.test(sanitizedIsbn)) {
      return false;
    }
    for (var _i = 0; _i < 12; _i++) {
      checksum += factor[_i % 2] * sanitizedIsbn.charAt(_i);
    }
    if (sanitizedIsbn.charAt(12) - (10 - checksum % 10) % 10 === 0) {
      return true;
    }
  }
  return false;
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isISSN.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isISSN;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
var issn = '^\\d{4}-?\\d{3}[\\dX]$';
function isISSN(str) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _assertString.default)(str);
  var testIssn = issn;
  testIssn = options.require_hyphen ? testIssn.replace('?', '') : testIssn;
  testIssn = options.case_sensitive ? new RegExp(testIssn) : new RegExp(testIssn, 'i');
  if (!testIssn.test(str)) {
    return false;
  }
  var digits = str.replace('-', '').toUpperCase();
  var checksum = 0;
  for (var i = 0; i < digits.length; i++) {
    var digit = digits[i];
    checksum += (digit === 'X' ? 10 : +digit) * (8 - i);
  }
  return checksum % 11 === 0;
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/util/algorithms.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iso7064Check = iso7064Check;
exports.luhnCheck = luhnCheck;
exports.reverseMultiplyAndSum = reverseMultiplyAndSum;
exports.verhoeffCheck = verhoeffCheck;
/**
 * Algorithmic validation functions
 * May be used as is or implemented in the workflow of other validators.
 */

/*
 * ISO 7064 validation function
 * Called with a string of numbers (incl. check digit)
 * to validate according to ISO 7064 (MOD 11, 10).
 */
function iso7064Check(str) {
  var checkvalue = 10;
  for (var i = 0; i < str.length - 1; i++) {
    checkvalue = (parseInt(str[i], 10) + checkvalue) % 10 === 0 ? 10 * 2 % 11 : (parseInt(str[i], 10) + checkvalue) % 10 * 2 % 11;
  }
  checkvalue = checkvalue === 1 ? 0 : 11 - checkvalue;
  return checkvalue === parseInt(str[10], 10);
}

/*
 * Luhn (mod 10) validation function
 * Called with a string of numbers (incl. check digit)
 * to validate according to the Luhn algorithm.
 */
function luhnCheck(str) {
  var checksum = 0;
  var second = false;
  for (var i = str.length - 1; i >= 0; i--) {
    if (second) {
      var product = parseInt(str[i], 10) * 2;
      if (product > 9) {
        // sum digits of product and add to checksum
        checksum += product.toString().split('').map(function (a) {
          return parseInt(a, 10);
        }).reduce(function (a, b) {
          return a + b;
        }, 0);
      } else {
        checksum += product;
      }
    } else {
      checksum += parseInt(str[i], 10);
    }
    second = !second;
  }
  return checksum % 10 === 0;
}

/*
 * Reverse TIN multiplication and summation helper function
 * Called with an array of single-digit integers and a base multiplier
 * to calculate the sum of the digits multiplied in reverse.
 * Normally used in variations of MOD 11 algorithmic checks.
 */
function reverseMultiplyAndSum(digits, base) {
  var total = 0;
  for (var i = 0; i < digits.length; i++) {
    total += digits[i] * (base - i);
  }
  return total;
}

/*
 * Verhoeff validation helper function
 * Called with a string of numbers
 * to validate according to the Verhoeff algorithm.
 */
function verhoeffCheck(str) {
  var d_table = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 0, 6, 7, 8, 9, 5], [2, 3, 4, 0, 1, 7, 8, 9, 5, 6], [3, 4, 0, 1, 2, 8, 9, 5, 6, 7], [4, 0, 1, 2, 3, 9, 5, 6, 7, 8], [5, 9, 8, 7, 6, 0, 4, 3, 2, 1], [6, 5, 9, 8, 7, 1, 0, 4, 3, 2], [7, 6, 5, 9, 8, 2, 1, 0, 4, 3], [8, 7, 6, 5, 9, 3, 2, 1, 0, 4], [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]];
  var p_table = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 5, 7, 6, 2, 8, 3, 0, 9, 4], [5, 8, 0, 3, 7, 9, 6, 1, 4, 2], [8, 9, 1, 6, 0, 4, 3, 5, 2, 7], [9, 4, 5, 3, 1, 2, 6, 8, 7, 0], [4, 2, 8, 6, 5, 7, 3, 9, 0, 1], [2, 7, 9, 3, 8, 0, 6, 4, 1, 5], [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]];

  // Copy (to prevent replacement) and reverse
  var str_copy = str.split('').reverse().join('');
  var checksum = 0;
  for (var i = 0; i < str_copy.length; i++) {
    checksum = d_table[checksum][p_table[i % 8][parseInt(str_copy[i], 10)]];
  }
  return checksum === 0;
}
},{}],"../../node_modules/validator/lib/isTaxID.js":[function(require,module,exports) {
"use strict";

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isTaxID;
var _assertString = _interopRequireDefault(require("./util/assertString"));
var algorithms = _interopRequireWildcard(require("./util/algorithms"));
var _isDate = _interopRequireDefault(require("./isDate"));
function _interopRequireWildcard(e, t) {
  if ("function" == typeof WeakMap) var r = new WeakMap(),
    n = new WeakMap();
  return (_interopRequireWildcard = function _interopRequireWildcard(e, t) {
    if (!t && e && e.__esModule) return e;
    var o,
      i,
      f = {
        __proto__: null,
        default: e
      };
    if (null === e || "object" != _typeof(e) && "function" != typeof e) return f;
    if (o = t ? n : r) {
      if (o.has(e)) return o.get(e);
      o.set(e, f);
    }
    for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]);
    return f;
  })(e, t);
}
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
/**
 * TIN Validation
 * Validates Tax Identification Numbers (TINs) from the US, EU member states and the United Kingdom.
 *
 * EU-UK:
 * National TIN validity is calculated using public algorithms as made available by DG TAXUD.
 *
 * See `https://ec.europa.eu/taxation_customs/tin/specs/FS-TIN%20Algorithms-Public.docx` for more information.
 *
 * US:
 * An Employer Identification Number (EIN), also known as a Federal Tax Identification Number,
 *  is used to identify a business entity.
 *
 * NOTES:
 *  - Prefix 47 is being reserved for future use
 *  - Prefixes 26, 27, 45, 46 and 47 were previously assigned by the Philadelphia campus.
 *
 * See `http://www.irs.gov/Businesses/Small-Businesses-&-Self-Employed/How-EINs-are-Assigned-and-Valid-EIN-Prefixes`
 * for more information.
 */

// Locale functions

/*
 * bg-BG validation function
 * (Edinen graždanski nomer (EGN/ЕГН), persons only)
 * Checks if birth date (first six digits) is valid and calculates check (last) digit
 */
function bgBgCheck(tin) {
  // Extract full year, normalize month and check birth date validity
  var century_year = tin.slice(0, 2);
  var month = parseInt(tin.slice(2, 4), 10);
  if (month > 40) {
    month -= 40;
    century_year = "20".concat(century_year);
  } else if (month > 20) {
    month -= 20;
    century_year = "18".concat(century_year);
  } else {
    century_year = "19".concat(century_year);
  }
  if (month < 10) {
    month = "0".concat(month);
  }
  var date = "".concat(century_year, "/").concat(month, "/").concat(tin.slice(4, 6));
  if (!(0, _isDate.default)(date, 'YYYY/MM/DD')) {
    return false;
  }

  // split digits into an array for further processing
  var digits = tin.split('').map(function (a) {
    return parseInt(a, 10);
  });

  // Calculate checksum by multiplying digits with fixed values
  var multip_lookup = [2, 4, 8, 5, 10, 9, 7, 3, 6];
  var checksum = 0;
  for (var i = 0; i < multip_lookup.length; i++) {
    checksum += digits[i] * multip_lookup[i];
  }
  checksum = checksum % 11 === 10 ? 0 : checksum % 11;
  return checksum === digits[9];
}

/**
 * Check if an input is a valid Canadian SIN (Social Insurance Number)
 *
 * The Social Insurance Number (SIN) is a 9 digit number that
 * you need to work in Canada or to have access to government programs and benefits.
 *
 * https://en.wikipedia.org/wiki/Social_Insurance_Number
 * https://www.canada.ca/en/employment-social-development/services/sin.html
 * https://www.codercrunch.com/challenge/819302488/sin-validator
 *
 * @param {string} input
 * @return {boolean}
 */
function isCanadianSIN(input) {
  var digitsArray = input.split('');
  var even = digitsArray.filter(function (_, idx) {
    return idx % 2;
  }).map(function (i) {
    return Number(i) * 2;
  }).join('').split('');
  var total = digitsArray.filter(function (_, idx) {
    return !(idx % 2);
  }).concat(even).map(function (i) {
    return Number(i);
  }).reduce(function (acc, cur) {
    return acc + cur;
  });
  return total % 10 === 0;
}

/*
 * cs-CZ validation function
 * (Rodné číslo (RČ), persons only)
 * Checks if birth date (first six digits) is valid and divisibility by 11
 * Material not in DG TAXUD document sourced from:
 * -`https://lorenc.info/3MA381/overeni-spravnosti-rodneho-cisla.htm`
 * -`https://www.mvcr.cz/clanek/rady-a-sluzby-dokumenty-rodne-cislo.aspx`
 */
function csCzCheck(tin) {
  tin = tin.replace(/\W/, '');

  // Extract full year from TIN length
  var full_year = parseInt(tin.slice(0, 2), 10);
  if (tin.length === 10) {
    if (full_year < 54) {
      full_year = "20".concat(full_year);
    } else {
      full_year = "19".concat(full_year);
    }
  } else {
    if (tin.slice(6) === '000') {
      return false;
    } // Three-zero serial not assigned before 1954
    if (full_year < 54) {
      full_year = "19".concat(full_year);
    } else {
      return false; // No 18XX years seen in any of the resources
    }
  }
  // Add missing zero if needed
  if (full_year.length === 3) {
    full_year = [full_year.slice(0, 2), '0', full_year.slice(2)].join('');
  }

  // Extract month from TIN and normalize
  var month = parseInt(tin.slice(2, 4), 10);
  if (month > 50) {
    month -= 50;
  }
  if (month > 20) {
    // Month-plus-twenty was only introduced in 2004
    if (parseInt(full_year, 10) < 2004) {
      return false;
    }
    month -= 20;
  }
  if (month < 10) {
    month = "0".concat(month);
  }

  // Check date validity
  var date = "".concat(full_year, "/").concat(month, "/").concat(tin.slice(4, 6));
  if (!(0, _isDate.default)(date, 'YYYY/MM/DD')) {
    return false;
  }

  // Verify divisibility by 11
  if (tin.length === 10) {
    if (parseInt(tin, 10) % 11 !== 0) {
      // Some numbers up to and including 1985 are still valid if
      // check (last) digit equals 0 and modulo of first 9 digits equals 10
      var checkdigit = parseInt(tin.slice(0, 9), 10) % 11;
      if (parseInt(full_year, 10) < 1986 && checkdigit === 10) {
        if (parseInt(tin.slice(9), 10) !== 0) {
          return false;
        }
      } else {
        return false;
      }
    }
  }
  return true;
}

/*
 * de-AT validation function
 * (Abgabenkontonummer, persons/entities)
 * Verify TIN validity by calling luhnCheck()
 */
function deAtCheck(tin) {
  return algorithms.luhnCheck(tin);
}

/*
 * de-DE validation function
 * (Steueridentifikationsnummer (Steuer-IdNr.), persons only)
 * Tests for single duplicate/triplicate value, then calculates ISO 7064 check (last) digit
 * Partial implementation of spec (same result with both algorithms always)
 */
function deDeCheck(tin) {
  // Split digits into an array for further processing
  var digits = tin.split('').map(function (a) {
    return parseInt(a, 10);
  });

  // Fill array with strings of number positions
  var occurrences = [];
  for (var i = 0; i < digits.length - 1; i++) {
    occurrences.push('');
    for (var j = 0; j < digits.length - 1; j++) {
      if (digits[i] === digits[j]) {
        occurrences[i] += j;
      }
    }
  }

  // Remove digits with one occurrence and test for only one duplicate/triplicate
  occurrences = occurrences.filter(function (a) {
    return a.length > 1;
  });
  if (occurrences.length !== 2 && occurrences.length !== 3) {
    return false;
  }

  // In case of triplicate value only two digits are allowed next to each other
  if (occurrences[0].length === 3) {
    var trip_locations = occurrences[0].split('').map(function (a) {
      return parseInt(a, 10);
    });
    var recurrent = 0; // Amount of neighbor occurrences
    for (var _i = 0; _i < trip_locations.length - 1; _i++) {
      if (trip_locations[_i] + 1 === trip_locations[_i + 1]) {
        recurrent += 1;
      }
    }
    if (recurrent === 2) {
      return false;
    }
  }
  return algorithms.iso7064Check(tin);
}

/*
 * dk-DK validation function
 * (CPR-nummer (personnummer), persons only)
 * Checks if birth date (first six digits) is valid and assigned to century (seventh) digit,
 * and calculates check (last) digit
 */
function dkDkCheck(tin) {
  tin = tin.replace(/\W/, '');

  // Extract year, check if valid for given century digit and add century
  var year = parseInt(tin.slice(4, 6), 10);
  var century_digit = tin.slice(6, 7);
  switch (century_digit) {
    case '0':
    case '1':
    case '2':
    case '3':
      year = "19".concat(year);
      break;
    case '4':
    case '9':
      if (year < 37) {
        year = "20".concat(year);
      } else {
        year = "19".concat(year);
      }
      break;
    default:
      if (year < 37) {
        year = "20".concat(year);
      } else if (year > 58) {
        year = "18".concat(year);
      } else {
        return false;
      }
      break;
  }
  // Add missing zero if needed
  if (year.length === 3) {
    year = [year.slice(0, 2), '0', year.slice(2)].join('');
  }
  // Check date validity
  var date = "".concat(year, "/").concat(tin.slice(2, 4), "/").concat(tin.slice(0, 2));
  if (!(0, _isDate.default)(date, 'YYYY/MM/DD')) {
    return false;
  }

  // Split digits into an array for further processing
  var digits = tin.split('').map(function (a) {
    return parseInt(a, 10);
  });
  var checksum = 0;
  var weight = 4;
  // Multiply by weight and add to checksum
  for (var i = 0; i < 9; i++) {
    checksum += digits[i] * weight;
    weight -= 1;
    if (weight === 1) {
      weight = 7;
    }
  }
  checksum %= 11;
  if (checksum === 1) {
    return false;
  }
  return checksum === 0 ? digits[9] === 0 : digits[9] === 11 - checksum;
}

/*
 * el-CY validation function
 * (Arithmos Forologikou Mitroou (AFM/ΑΦΜ), persons only)
 * Verify TIN validity by calculating ASCII value of check (last) character
 */
function elCyCheck(tin) {
  // split digits into an array for further processing
  var digits = tin.slice(0, 8).split('').map(function (a) {
    return parseInt(a, 10);
  });
  var checksum = 0;
  // add digits in even places
  for (var i = 1; i < digits.length; i += 2) {
    checksum += digits[i];
  }

  // add digits in odd places
  for (var _i2 = 0; _i2 < digits.length; _i2 += 2) {
    if (digits[_i2] < 2) {
      checksum += 1 - digits[_i2];
    } else {
      checksum += 2 * (digits[_i2] - 2) + 5;
      if (digits[_i2] > 4) {
        checksum += 2;
      }
    }
  }
  return String.fromCharCode(checksum % 26 + 65) === tin.charAt(8);
}

/*
 * el-GR validation function
 * (Arithmos Forologikou Mitroou (AFM/ΑΦΜ), persons/entities)
 * Verify TIN validity by calculating check (last) digit
 * Algorithm not in DG TAXUD document- sourced from:
 * - `http://epixeirisi.gr/%CE%9A%CE%A1%CE%99%CE%A3%CE%99%CE%9C%CE%91-%CE%98%CE%95%CE%9C%CE%91%CE%A4%CE%91-%CE%A6%CE%9F%CE%A1%CE%9F%CE%9B%CE%9F%CE%93%CE%99%CE%91%CE%A3-%CE%9A%CE%91%CE%99-%CE%9B%CE%9F%CE%93%CE%99%CE%A3%CE%A4%CE%99%CE%9A%CE%97%CE%A3/23791/%CE%91%CF%81%CE%B9%CE%B8%CE%BC%CF%8C%CF%82-%CE%A6%CE%BF%CF%81%CE%BF%CE%BB%CE%BF%CE%B3%CE%B9%CE%BA%CE%BF%CF%8D-%CE%9C%CE%B7%CF%84%CF%81%CF%8E%CE%BF%CF%85`
 */
function elGrCheck(tin) {
  // split digits into an array for further processing
  var digits = tin.split('').map(function (a) {
    return parseInt(a, 10);
  });
  var checksum = 0;
  for (var i = 0; i < 8; i++) {
    checksum += digits[i] * Math.pow(2, 8 - i);
  }
  return checksum % 11 % 10 === digits[8];
}

/*
 * en-GB validation function (should go here if needed)
 * (National Insurance Number (NINO) or Unique Taxpayer Reference (UTR),
 * persons/entities respectively)
 */

/*
 * en-IE validation function
 * (Personal Public Service Number (PPS No), persons only)
 * Verify TIN validity by calculating check (second to last) character
 */
function enIeCheck(tin) {
  var checksum = algorithms.reverseMultiplyAndSum(tin.split('').slice(0, 7).map(function (a) {
    return parseInt(a, 10);
  }), 8);
  if (tin.length === 9 && tin[8] !== 'W') {
    checksum += (tin[8].charCodeAt(0) - 64) * 9;
  }
  checksum %= 23;
  if (checksum === 0) {
    return tin[7].toUpperCase() === 'W';
  }
  return tin[7].toUpperCase() === String.fromCharCode(64 + checksum);
}

// Valid US IRS campus prefixes
var enUsCampusPrefix = {
  andover: ['10', '12'],
  atlanta: ['60', '67'],
  austin: ['50', '53'],
  brookhaven: ['01', '02', '03', '04', '05', '06', '11', '13', '14', '16', '21', '22', '23', '25', '34', '51', '52', '54', '55', '56', '57', '58', '59', '65'],
  cincinnati: ['30', '32', '35', '36', '37', '38', '61'],
  fresno: ['15', '24'],
  internet: ['20', '26', '27', '45', '46', '47'],
  kansas: ['40', '44'],
  memphis: ['94', '95'],
  ogden: ['80', '90'],
  philadelphia: ['33', '39', '41', '42', '43', '46', '48', '62', '63', '64', '66', '68', '71', '72', '73', '74', '75', '76', '77', '81', '82', '83', '84', '85', '86', '87', '88', '91', '92', '93', '98', '99'],
  sba: ['31']
};

// Return an array of all US IRS campus prefixes
function enUsGetPrefixes() {
  var prefixes = [];
  for (var location in enUsCampusPrefix) {
    // https://github.com/gotwarlost/istanbul/blob/master/ignoring-code-for-coverage.md#ignoring-code-for-coverage-purposes
    // istanbul ignore else
    if (enUsCampusPrefix.hasOwnProperty(location)) {
      prefixes.push.apply(prefixes, _toConsumableArray(enUsCampusPrefix[location]));
    }
  }
  return prefixes;
}

/*
 * en-US validation function
 * Verify that the TIN starts with a valid IRS campus prefix
 */
function enUsCheck(tin) {
  return enUsGetPrefixes().indexOf(tin.slice(0, 2)) !== -1;
}

/*
 * es-AR validation function
 * Clave Única de Identificación Tributaria (CUIT/CUIL)
 * Sourced from:
 * - https://servicioscf.afip.gob.ar/publico/abc/ABCpaso2.aspx?id_nivel1=3036&id_nivel2=3040&p=Conceptos%20b%C3%A1sicos
 * - https://es.wikipedia.org/wiki/Clave_%C3%9Anica_de_Identificaci%C3%B3n_Tributaria
 */

function esArCheck(tin) {
  var accum = 0;
  var digits = tin.split('');
  var digit = parseInt(digits.pop(), 10);
  for (var i = 0; i < digits.length; i++) {
    accum += digits[9 - i] * (2 + i % 6);
  }
  var verif = 11 - accum % 11;
  if (verif === 11) {
    verif = 0;
  } else if (verif === 10) {
    verif = 9;
  }
  return digit === verif;
}

/*
 * es-ES validation function
 * (Documento Nacional de Identidad (DNI)
 * or Número de Identificación de Extranjero (NIE), persons only)
 * Verify TIN validity by calculating check (last) character
 */
function esEsCheck(tin) {
  // Split characters into an array for further processing
  var chars = tin.toUpperCase().split('');

  // Replace initial letter if needed
  if (isNaN(parseInt(chars[0], 10)) && chars.length > 1) {
    var lead_replace = 0;
    switch (chars[0]) {
      case 'Y':
        lead_replace = 1;
        break;
      case 'Z':
        lead_replace = 2;
        break;
      default:
    }
    chars.splice(0, 1, lead_replace);
    // Fill with zeros if smaller than proper
  } else {
    while (chars.length < 9) {
      chars.unshift(0);
    }
  }

  // Calculate checksum and check according to lookup
  var lookup = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E'];
  chars = chars.join('');
  var checksum = parseInt(chars.slice(0, 8), 10) % 23;
  return chars[8] === lookup[checksum];
}

/*
 * et-EE validation function
 * (Isikukood (IK), persons only)
 * Checks if birth date (century digit and six following) is valid and calculates check (last) digit
 * Material not in DG TAXUD document sourced from:
 * - `https://www.oecd.org/tax/automatic-exchange/crs-implementation-and-assistance/tax-identification-numbers/Estonia-TIN.pdf`
 */
function etEeCheck(tin) {
  // Extract year and add century
  var full_year = tin.slice(1, 3);
  var century_digit = tin.slice(0, 1);
  switch (century_digit) {
    case '1':
    case '2':
      full_year = "18".concat(full_year);
      break;
    case '3':
    case '4':
      full_year = "19".concat(full_year);
      break;
    default:
      full_year = "20".concat(full_year);
      break;
  }
  // Check date validity
  var date = "".concat(full_year, "/").concat(tin.slice(3, 5), "/").concat(tin.slice(5, 7));
  if (!(0, _isDate.default)(date, 'YYYY/MM/DD')) {
    return false;
  }

  // Split digits into an array for further processing
  var digits = tin.split('').map(function (a) {
    return parseInt(a, 10);
  });
  var checksum = 0;
  var weight = 1;
  // Multiply by weight and add to checksum
  for (var i = 0; i < 10; i++) {
    checksum += digits[i] * weight;
    weight += 1;
    if (weight === 10) {
      weight = 1;
    }
  }
  // Do again if modulo 11 of checksum is 10
  if (checksum % 11 === 10) {
    checksum = 0;
    weight = 3;
    for (var _i3 = 0; _i3 < 10; _i3++) {
      checksum += digits[_i3] * weight;
      weight += 1;
      if (weight === 10) {
        weight = 1;
      }
    }
    if (checksum % 11 === 10) {
      return digits[10] === 0;
    }
  }
  return checksum % 11 === digits[10];
}

/*
 * fi-FI validation function
 * (Henkilötunnus (HETU), persons only)
 * Checks if birth date (first six digits plus century symbol) is valid
 * and calculates check (last) digit
 */
function fiFiCheck(tin) {
  // Extract year and add century
  var full_year = tin.slice(4, 6);
  var century_symbol = tin.slice(6, 7);
  switch (century_symbol) {
    case '+':
      full_year = "18".concat(full_year);
      break;
    case '-':
      full_year = "19".concat(full_year);
      break;
    default:
      full_year = "20".concat(full_year);
      break;
  }
  // Check date validity
  var date = "".concat(full_year, "/").concat(tin.slice(2, 4), "/").concat(tin.slice(0, 2));
  if (!(0, _isDate.default)(date, 'YYYY/MM/DD')) {
    return false;
  }

  // Calculate check character
  var checksum = parseInt(tin.slice(0, 6) + tin.slice(7, 10), 10) % 31;
  if (checksum < 10) {
    return checksum === parseInt(tin.slice(10), 10);
  }
  checksum -= 10;
  var letters_lookup = ['A', 'B', 'C', 'D', 'E', 'F', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y'];
  return letters_lookup[checksum] === tin.slice(10);
}

/*
 * fr/nl-BE validation function
 * (Numéro national (N.N.), persons only)
 * Checks if birth date (first six digits) is valid and calculates check (last two) digits
 */
function frBeCheck(tin) {
  // Zero month/day value is acceptable
  if (tin.slice(2, 4) !== '00' || tin.slice(4, 6) !== '00') {
    // Extract date from first six digits of TIN
    var date = "".concat(tin.slice(0, 2), "/").concat(tin.slice(2, 4), "/").concat(tin.slice(4, 6));
    if (!(0, _isDate.default)(date, 'YY/MM/DD')) {
      return false;
    }
  }
  var checksum = 97 - parseInt(tin.slice(0, 9), 10) % 97;
  var checkdigits = parseInt(tin.slice(9, 11), 10);
  if (checksum !== checkdigits) {
    checksum = 97 - parseInt("2".concat(tin.slice(0, 9)), 10) % 97;
    if (checksum !== checkdigits) {
      return false;
    }
  }
  return true;
}

/*
 * fr-FR validation function
 * (Numéro fiscal de référence (numéro SPI), persons only)
 * Verify TIN validity by calculating check (last three) digits
 */
function frFrCheck(tin) {
  tin = tin.replace(/\s/g, '');
  var checksum = parseInt(tin.slice(0, 10), 10) % 511;
  var checkdigits = parseInt(tin.slice(10, 13), 10);
  return checksum === checkdigits;
}

/*
 * fr/lb-LU validation function
 * (numéro d’identification personnelle, persons only)
 * Verify birth date validity and run Luhn and Verhoeff checks
 */
function frLuCheck(tin) {
  // Extract date and check validity
  var date = "".concat(tin.slice(0, 4), "/").concat(tin.slice(4, 6), "/").concat(tin.slice(6, 8));
  if (!(0, _isDate.default)(date, 'YYYY/MM/DD')) {
    return false;
  }

  // Run Luhn check
  if (!algorithms.luhnCheck(tin.slice(0, 12))) {
    return false;
  }
  // Remove Luhn check digit and run Verhoeff check
  return algorithms.verhoeffCheck("".concat(tin.slice(0, 11)).concat(tin[12]));
}

/*
 * hr-HR validation function
 * (Osobni identifikacijski broj (OIB), persons/entities)
 * Verify TIN validity by calling iso7064Check(digits)
 */
function hrHrCheck(tin) {
  return algorithms.iso7064Check(tin);
}

/*
 * hu-HU validation function
 * (Adóazonosító jel, persons only)
 * Verify TIN validity by calculating check (last) digit
 */
function huHuCheck(tin) {
  // split digits into an array for further processing
  var digits = tin.split('').map(function (a) {
    return parseInt(a, 10);
  });
  var checksum = 8;
  for (var i = 1; i < 9; i++) {
    checksum += digits[i] * (i + 1);
  }
  return checksum % 11 === digits[9];
}

/*
 * lt-LT validation function (should go here if needed)
 * (Asmens kodas, persons/entities respectively)
 * Current validation check is alias of etEeCheck- same format applies
 */

/*
 * it-IT first/last name validity check
 * Accepts it-IT TIN-encoded names as a three-element character array and checks their validity
 * Due to lack of clarity between resources ("Are only Italian consonants used?
 * What happens if a person has X in their name?" etc.) only two test conditions
 * have been implemented:
 * Vowels may only be followed by other vowels or an X character
 * and X characters after vowels may only be followed by other X characters.
 */
function itItNameCheck(name) {
  // true at the first occurrence of a vowel
  var vowelflag = false;

  // true at the first occurrence of an X AFTER vowel
  // (to properly handle last names with X as consonant)
  var xflag = false;
  for (var i = 0; i < 3; i++) {
    if (!vowelflag && /[AEIOU]/.test(name[i])) {
      vowelflag = true;
    } else if (!xflag && vowelflag && name[i] === 'X') {
      xflag = true;
    } else if (i > 0) {
      if (vowelflag && !xflag) {
        if (!/[AEIOU]/.test(name[i])) {
          return false;
        }
      }
      if (xflag) {
        if (!/X/.test(name[i])) {
          return false;
        }
      }
    }
  }
  return true;
}

/*
 * it-IT validation function
 * (Codice fiscale (TIN-IT), persons only)
 * Verify name, birth date and codice catastale validity
 * and calculate check character.
 * Material not in DG-TAXUD document sourced from:
 * `https://en.wikipedia.org/wiki/Italian_fiscal_code`
 */
function itItCheck(tin) {
  // Capitalize and split characters into an array for further processing
  var chars = tin.toUpperCase().split('');

  // Check first and last name validity calling itItNameCheck()
  if (!itItNameCheck(chars.slice(0, 3))) {
    return false;
  }
  if (!itItNameCheck(chars.slice(3, 6))) {
    return false;
  }

  // Convert letters in number spaces back to numbers if any
  var number_locations = [6, 7, 9, 10, 12, 13, 14];
  var number_replace = {
    L: '0',
    M: '1',
    N: '2',
    P: '3',
    Q: '4',
    R: '5',
    S: '6',
    T: '7',
    U: '8',
    V: '9'
  };
  for (var _i4 = 0, _number_locations = number_locations; _i4 < _number_locations.length; _i4++) {
    var i = _number_locations[_i4];
    if (chars[i] in number_replace) {
      chars.splice(i, 1, number_replace[chars[i]]);
    }
  }

  // Extract month and day, and check date validity
  var month_replace = {
    A: '01',
    B: '02',
    C: '03',
    D: '04',
    E: '05',
    H: '06',
    L: '07',
    M: '08',
    P: '09',
    R: '10',
    S: '11',
    T: '12'
  };
  var month = month_replace[chars[8]];
  var day = parseInt(chars[9] + chars[10], 10);
  if (day > 40) {
    day -= 40;
  }
  if (day < 10) {
    day = "0".concat(day);
  }
  var date = "".concat(chars[6]).concat(chars[7], "/").concat(month, "/").concat(day);
  if (!(0, _isDate.default)(date, 'YY/MM/DD')) {
    return false;
  }

  // Calculate check character by adding up even and odd characters as numbers
  var checksum = 0;
  for (var _i5 = 1; _i5 < chars.length - 1; _i5 += 2) {
    var char_to_int = parseInt(chars[_i5], 10);
    if (isNaN(char_to_int)) {
      char_to_int = chars[_i5].charCodeAt(0) - 65;
    }
    checksum += char_to_int;
  }
  var odd_convert = {
    // Maps of characters at odd places
    A: 1,
    B: 0,
    C: 5,
    D: 7,
    E: 9,
    F: 13,
    G: 15,
    H: 17,
    I: 19,
    J: 21,
    K: 2,
    L: 4,
    M: 18,
    N: 20,
    O: 11,
    P: 3,
    Q: 6,
    R: 8,
    S: 12,
    T: 14,
    U: 16,
    V: 10,
    W: 22,
    X: 25,
    Y: 24,
    Z: 23,
    0: 1,
    1: 0
  };
  for (var _i6 = 0; _i6 < chars.length - 1; _i6 += 2) {
    var _char_to_int = 0;
    if (chars[_i6] in odd_convert) {
      _char_to_int = odd_convert[chars[_i6]];
    } else {
      var multiplier = parseInt(chars[_i6], 10);
      _char_to_int = 2 * multiplier + 1;
      if (multiplier > 4) {
        _char_to_int += 2;
      }
    }
    checksum += _char_to_int;
  }
  if (String.fromCharCode(65 + checksum % 26) !== chars[15]) {
    return false;
  }
  return true;
}

/*
 * lv-LV validation function
 * (Personas kods (PK), persons only)
 * Check validity of birth date and calculate check (last) digit
 * Support only for old format numbers (not starting with '32', issued before 2017/07/01)
 * Material not in DG TAXUD document sourced from:
 * `https://boot.ritakafija.lv/forums/index.php?/topic/88314-personas-koda-algoritms-%C4%8Deksumma/`
 */
function lvLvCheck(tin) {
  tin = tin.replace(/\W/, '');
  // Extract date from TIN
  var day = tin.slice(0, 2);
  if (day !== '32') {
    // No date/checksum check if new format
    var month = tin.slice(2, 4);
    if (month !== '00') {
      // No date check if unknown month
      var full_year = tin.slice(4, 6);
      switch (tin[6]) {
        case '0':
          full_year = "18".concat(full_year);
          break;
        case '1':
          full_year = "19".concat(full_year);
          break;
        default:
          full_year = "20".concat(full_year);
          break;
      }
      // Check date validity
      var date = "".concat(full_year, "/").concat(tin.slice(2, 4), "/").concat(day);
      if (!(0, _isDate.default)(date, 'YYYY/MM/DD')) {
        return false;
      }
    }

    // Calculate check digit
    var checksum = 1101;
    var multip_lookup = [1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    for (var i = 0; i < tin.length - 1; i++) {
      checksum -= parseInt(tin[i], 10) * multip_lookup[i];
    }
    return parseInt(tin[10], 10) === checksum % 11;
  }
  return true;
}

/*
 * mt-MT validation function
 * (Identity Card Number or Unique Taxpayer Reference, persons/entities)
 * Verify Identity Card Number structure (no other tests found)
 */
function mtMtCheck(tin) {
  if (tin.length !== 9) {
    // No tests for UTR
    var chars = tin.toUpperCase().split('');
    // Fill with zeros if smaller than proper
    while (chars.length < 8) {
      chars.unshift(0);
    }
    // Validate format according to last character
    switch (tin[7]) {
      case 'A':
      case 'P':
        if (parseInt(chars[6], 10) === 0) {
          return false;
        }
        break;
      default:
        {
          var first_part = parseInt(chars.join('').slice(0, 5), 10);
          if (first_part > 32000) {
            return false;
          }
          var second_part = parseInt(chars.join('').slice(5, 7), 10);
          if (first_part === second_part) {
            return false;
          }
        }
    }
  }
  return true;
}

/*
 * nl-NL validation function
 * (Burgerservicenummer (BSN) or Rechtspersonen Samenwerkingsverbanden Informatie Nummer (RSIN),
 * persons/entities respectively)
 * Verify TIN validity by calculating check (last) digit (variant of MOD 11)
 */
function nlNlCheck(tin) {
  return algorithms.reverseMultiplyAndSum(tin.split('').slice(0, 8).map(function (a) {
    return parseInt(a, 10);
  }), 9) % 11 === parseInt(tin[8], 10);
}

/*
 * pl-PL validation function
 * (Powszechny Elektroniczny System Ewidencji Ludności (PESEL)
 * or Numer identyfikacji podatkowej (NIP), persons/entities)
 * Verify TIN validity by validating birth date (PESEL) and calculating check (last) digit
 */
function plPlCheck(tin) {
  // NIP
  if (tin.length === 10) {
    // Calculate last digit by multiplying with lookup
    var lookup = [6, 5, 7, 2, 3, 4, 5, 6, 7];
    var _checksum = 0;
    for (var i = 0; i < lookup.length; i++) {
      _checksum += parseInt(tin[i], 10) * lookup[i];
    }
    _checksum %= 11;
    if (_checksum === 10) {
      return false;
    }
    return _checksum === parseInt(tin[9], 10);
  }

  // PESEL
  // Extract full year using month
  var full_year = tin.slice(0, 2);
  var month = parseInt(tin.slice(2, 4), 10);
  if (month > 80) {
    full_year = "18".concat(full_year);
    month -= 80;
  } else if (month > 60) {
    full_year = "22".concat(full_year);
    month -= 60;
  } else if (month > 40) {
    full_year = "21".concat(full_year);
    month -= 40;
  } else if (month > 20) {
    full_year = "20".concat(full_year);
    month -= 20;
  } else {
    full_year = "19".concat(full_year);
  }
  // Add leading zero to month if needed
  if (month < 10) {
    month = "0".concat(month);
  }
  // Check date validity
  var date = "".concat(full_year, "/").concat(month, "/").concat(tin.slice(4, 6));
  if (!(0, _isDate.default)(date, 'YYYY/MM/DD')) {
    return false;
  }

  // Calculate last digit by multiplying with odd one-digit numbers except 5
  var checksum = 0;
  var multiplier = 1;
  for (var _i7 = 0; _i7 < tin.length - 1; _i7++) {
    checksum += parseInt(tin[_i7], 10) * multiplier % 10;
    multiplier += 2;
    if (multiplier > 10) {
      multiplier = 1;
    } else if (multiplier === 5) {
      multiplier += 2;
    }
  }
  checksum = 10 - checksum % 10;
  return checksum === parseInt(tin[10], 10);
}

/*
 * pt-BR validation function
 * (Cadastro de Pessoas Físicas (CPF, persons)
 * Cadastro Nacional de Pessoas Jurídicas (CNPJ, entities)
 * Both inputs will be validated.
 * CPF accepts formatted (XXX.XXX.XXX-XX) and unformatted input;
 * formatting is stripped before validation.
 * CNPJ supports both numeric (legacy) and alphanumeric format (starting July 2026).
 */

/**
 * Convert a CNPJ character to its numeric value for check digit calculation.
 * Numbers 0-9 map to values 0-9, letters A-Z map to values 17-42.
 * This is done by subtracting 48 from the ASCII code.
 */
function cnpjCharToValue(char) {
  return char.charCodeAt(0) - 48;
}

/**
 * Validate CNPJ (both numeric and alphanumeric formats).
 * Algorithm: module 11 with weights 2-9 from right to left.
 */
function validateCnpj(cnpj) {
  // Get the 12 identifier characters and 2 check digits
  var identifiers = cnpj.substring(0, 12).toUpperCase();
  var checkDigits = cnpj.substring(12);

  // Reject CNPJs with all same characters (e.g., '00000000000000', 'AAAAAAAAAAAAAA')
  if (/^(.)\1+$/.test(cnpj.toUpperCase())) {
    return false;
  }

  // Calculate first check digit
  var sum = 0;
  var weight = 5;
  for (var i = 0; i < 12; i++) {
    sum += cnpjCharToValue(identifiers.charAt(i)) * weight;
    weight = weight === 2 ? 9 : weight - 1;
  }
  var remainder = sum % 11;
  var firstDV = remainder < 2 ? 0 : 11 - remainder;
  if (firstDV !== parseInt(checkDigits.charAt(0), 10)) {
    return false;
  }

  // Calculate second check digit (includes first check digit)
  sum = 0;
  weight = 6;
  for (var _i8 = 0; _i8 < 12; _i8++) {
    sum += cnpjCharToValue(identifiers.charAt(_i8)) * weight;
    weight = weight === 2 ? 9 : weight - 1;
  }
  sum += firstDV * 2;
  remainder = sum % 11;
  var secondDV = remainder < 2 ? 0 : 11 - remainder;
  return secondDV === parseInt(checkDigits.charAt(1), 10);
}
function ptBrCheck(tin) {
  // Strip CPF formatting (XXX.XXX.XXX-XX)
  tin = tin.replace(/[.\-/]/g, '');
  if (tin.length === 11) {
    var sum;
    var remainder;
    sum = 0;
    if (
    // Reject known invalid CPFs
    tin === '11111111111' || tin === '22222222222' || tin === '33333333333' || tin === '44444444444' || tin === '55555555555' || tin === '66666666666' || tin === '77777777777' || tin === '88888888888' || tin === '99999999999' || tin === '00000000000') return false;
    for (var i = 1; i <= 9; i++) sum += parseInt(tin.substring(i - 1, i), 10) * (11 - i);
    remainder = sum * 10 % 11;
    if (remainder === 10) remainder = 0;
    if (remainder !== parseInt(tin.substring(9, 10), 10)) return false;
    sum = 0;
    for (var _i9 = 1; _i9 <= 10; _i9++) sum += parseInt(tin.substring(_i9 - 1, _i9), 10) * (12 - _i9);
    remainder = sum * 10 % 11;
    if (remainder === 10) remainder = 0;
    if (remainder !== parseInt(tin.substring(10, 11), 10)) return false;
    return true;
  }

  // CNPJ validation (supports both numeric and alphanumeric formats)
  return validateCnpj(tin);
}

/*
 * pt-PT validation function
 * (Número de identificação fiscal (NIF), persons/entities)
 * Verify TIN validity by calculating check (last) digit (variant of MOD 11)
 */
function ptPtCheck(tin) {
  var checksum = 11 - algorithms.reverseMultiplyAndSum(tin.split('').slice(0, 8).map(function (a) {
    return parseInt(a, 10);
  }), 9) % 11;
  if (checksum > 9) {
    return parseInt(tin[8], 10) === 0;
  }
  return checksum === parseInt(tin[8], 10);
}

/*
 * ro-RO validation function
 * (Cod Numeric Personal (CNP) or Cod de înregistrare fiscală (CIF),
 * persons only)
 * Verify CNP validity by calculating check (last) digit (test not found for CIF)
 * Material not in DG TAXUD document sourced from:
 * `https://en.wikipedia.org/wiki/National_identification_number#Romania`
 */
function roRoCheck(tin) {
  if (tin.slice(0, 4) !== '9000') {
    // No test found for this format
    // Extract full year using century digit if possible
    var full_year = tin.slice(1, 3);
    switch (tin[0]) {
      case '1':
      case '2':
        full_year = "19".concat(full_year);
        break;
      case '3':
      case '4':
        full_year = "18".concat(full_year);
        break;
      case '5':
      case '6':
        full_year = "20".concat(full_year);
        break;
      default:
    }

    // Check date validity
    var date = "".concat(full_year, "/").concat(tin.slice(3, 5), "/").concat(tin.slice(5, 7));
    if (date.length === 8) {
      if (!(0, _isDate.default)(date, 'YY/MM/DD')) {
        return false;
      }
    } else if (!(0, _isDate.default)(date, 'YYYY/MM/DD')) {
      return false;
    }

    // Calculate check digit
    var digits = tin.split('').map(function (a) {
      return parseInt(a, 10);
    });
    var multipliers = [2, 7, 9, 1, 4, 6, 3, 5, 8, 2, 7, 9];
    var checksum = 0;
    for (var i = 0; i < multipliers.length; i++) {
      checksum += digits[i] * multipliers[i];
    }
    if (checksum % 11 === 10) {
      return digits[12] === 1;
    }
    return digits[12] === checksum % 11;
  }
  return true;
}

/*
 * sk-SK validation function
 * (Rodné číslo (RČ) or bezvýznamové identifikačné číslo (BIČ), persons only)
 * Checks validity of pre-1954 birth numbers (rodné číslo) only
 * Due to the introduction of the pseudo-random BIČ it is not possible to test
 * post-1954 birth numbers without knowing whether they are BIČ or RČ beforehand
 */
function skSkCheck(tin) {
  if (tin.length === 9) {
    tin = tin.replace(/\W/, '');
    if (tin.slice(6) === '000') {
      return false;
    } // Three-zero serial not assigned before 1954

    // Extract full year from TIN length
    var full_year = parseInt(tin.slice(0, 2), 10);
    if (full_year > 53) {
      return false;
    }
    if (full_year < 10) {
      full_year = "190".concat(full_year);
    } else {
      full_year = "19".concat(full_year);
    }

    // Extract month from TIN and normalize
    var month = parseInt(tin.slice(2, 4), 10);
    if (month > 50) {
      month -= 50;
    }
    if (month < 10) {
      month = "0".concat(month);
    }

    // Check date validity
    var date = "".concat(full_year, "/").concat(month, "/").concat(tin.slice(4, 6));
    if (!(0, _isDate.default)(date, 'YYYY/MM/DD')) {
      return false;
    }
  }
  return true;
}

/*
 * sl-SI validation function
 * (Davčna številka, persons/entities)
 * Verify TIN validity by calculating check (last) digit (variant of MOD 11)
 */
function slSiCheck(tin) {
  var checksum = 11 - algorithms.reverseMultiplyAndSum(tin.split('').slice(0, 7).map(function (a) {
    return parseInt(a, 10);
  }), 8) % 11;
  if (checksum === 10) {
    return parseInt(tin[7], 10) === 0;
  }
  return checksum === parseInt(tin[7], 10);
}

/*
 * sv-SE validation function
 * (Personnummer or samordningsnummer, persons only)
 * Checks validity of birth date and calls luhnCheck() to validate check (last) digit
 */
function svSeCheck(tin) {
  // Make copy of TIN and normalize to two-digit year form
  var tin_copy = tin.slice(0);
  if (tin.length > 11) {
    tin_copy = tin_copy.slice(2);
  }

  // Extract date of birth
  var full_year = '';
  var month = tin_copy.slice(2, 4);
  var day = parseInt(tin_copy.slice(4, 6), 10);
  if (tin.length > 11) {
    full_year = tin.slice(0, 4);
  } else {
    full_year = tin.slice(0, 2);
    if (tin.length === 11 && day < 60) {
      // Extract full year from centenarian symbol
      // Should work just fine until year 10000 or so
      var current_year = new Date().getFullYear().toString();
      var current_century = parseInt(current_year.slice(0, 2), 10);
      current_year = parseInt(current_year, 10);
      if (tin[6] === '-') {
        if (parseInt("".concat(current_century).concat(full_year), 10) > current_year) {
          full_year = "".concat(current_century - 1).concat(full_year);
        } else {
          full_year = "".concat(current_century).concat(full_year);
        }
      } else {
        full_year = "".concat(current_century - 1).concat(full_year);
        if (current_year - parseInt(full_year, 10) < 100) {
          return false;
        }
      }
    }
  }

  // Normalize day and check date validity
  if (day > 60) {
    day -= 60;
  }
  if (day < 10) {
    day = "0".concat(day);
  }
  var date = "".concat(full_year, "/").concat(month, "/").concat(day);
  if (date.length === 8) {
    if (!(0, _isDate.default)(date, 'YY/MM/DD')) {
      return false;
    }
  } else if (!(0, _isDate.default)(date, 'YYYY/MM/DD')) {
    return false;
  }
  return algorithms.luhnCheck(tin.replace(/\W/, ''));
}

/**
 * uk-UA validation function
 * Verify TIN validity by calculating check (last) digit (variant of MOD 11)
 */
function ukUaCheck(tin) {
  // Calculate check digit
  var digits = tin.split('').map(function (a) {
    return parseInt(a, 10);
  });
  var multipliers = [-1, 5, 7, 9, 4, 6, 10, 5, 7];
  var checksum = 0;
  for (var i = 0; i < multipliers.length; i++) {
    checksum += digits[i] * multipliers[i];
  }
  return checksum % 11 === 10 ? digits[9] === 0 : digits[9] === checksum % 11;
}

// Locale lookup objects

/*
 * Tax id regex formats for various locales
 *
 * Where not explicitly specified in DG-TAXUD document both
 * uppercase and lowercase letters are acceptable.
 */
var taxIdFormat = {
  'bg-BG': /^\d{10}$/,
  'cs-CZ': /^\d{6}\/{0,1}\d{3,4}$/,
  'de-AT': /^\d{9}$/,
  'de-DE': /^[1-9]\d{10}$/,
  'dk-DK': /^\d{6}-{0,1}\d{4}$/,
  'el-CY': /^[09]\d{7}[A-Z]$/,
  'el-GR': /^([0-4]|[7-9])\d{8}$/,
  'en-CA': /^\d{9}$/,
  'en-GB': /^\d{10}$|^(?!GB|NK|TN|ZZ)(?![DFIQUV])[A-Z](?![DFIQUVO])[A-Z]\d{6}[ABCD ]$/i,
  'en-IE': /^\d{7}[A-W][A-IW]{0,1}$/i,
  'en-US': /^\d{2}[- ]{0,1}\d{7}$/,
  'es-AR': /(20|23|24|27|30|33|34)[0-9]{8}[0-9]/,
  'es-ES': /^(\d{0,8}|[XYZKLM]\d{7})[A-HJ-NP-TV-Z]$/i,
  'et-EE': /^[1-6]\d{6}(00[1-9]|0[1-9][0-9]|[1-6][0-9]{2}|70[0-9]|710)\d$/,
  'fi-FI': /^\d{6}[-+A]\d{3}[0-9A-FHJ-NPR-Y]$/i,
  'fr-BE': /^\d{11}$/,
  'fr-FR': /^[0-3]\d{12}$|^[0-3]\d\s\d{2}(\s\d{3}){3}$/,
  // Conforms both to official spec and provided example
  'fr-LU': /^\d{13}$/,
  'hr-HR': /^\d{11}$/,
  'hu-HU': /^8\d{9}$/,
  'it-IT': /^[A-Z]{6}[L-NP-V0-9]{2}[A-EHLMPRST][L-NP-V0-9]{2}[A-ILMZ][L-NP-V0-9]{3}[A-Z]$/i,
  'lv-LV': /^\d{6}-{0,1}\d{5}$/,
  // Conforms both to DG TAXUD spec and original research
  'mt-MT': /^\d{3,7}[APMGLHBZ]$|^([1-8])\1\d{7}$/i,
  'nl-NL': /^\d{9}$/,
  'pl-PL': /^\d{10,11}$/,
  'pt-BR': /(?:^\d{3}\.\d{3}\.\d{3}-\d{2}$)|(?:^\d{11}$)|(?:^[A-Z0-9]{12}\d{2}$)/i,
  'pt-PT': /^\d{9}$/,
  'ro-RO': /^\d{13}$/,
  'sk-SK': /^\d{6}\/{0,1}\d{3,4}$/,
  'sl-SI': /^[1-9]\d{7}$/,
  'sv-SE': /^(\d{6}[-+]{0,1}\d{4}|(18|19|20)\d{6}[-+]{0,1}\d{4})$/,
  'uk-UA': /^\d{10}$/
};
// taxIdFormat locale aliases
taxIdFormat['lb-LU'] = taxIdFormat['fr-LU'];
taxIdFormat['lt-LT'] = taxIdFormat['et-EE'];
taxIdFormat['nl-BE'] = taxIdFormat['fr-BE'];
taxIdFormat['fr-CA'] = taxIdFormat['en-CA'];

// Algorithmic tax id check functions for various locales
var taxIdCheck = {
  'bg-BG': bgBgCheck,
  'cs-CZ': csCzCheck,
  'de-AT': deAtCheck,
  'de-DE': deDeCheck,
  'dk-DK': dkDkCheck,
  'el-CY': elCyCheck,
  'el-GR': elGrCheck,
  'en-CA': isCanadianSIN,
  'en-IE': enIeCheck,
  'en-US': enUsCheck,
  'es-AR': esArCheck,
  'es-ES': esEsCheck,
  'et-EE': etEeCheck,
  'fi-FI': fiFiCheck,
  'fr-BE': frBeCheck,
  'fr-FR': frFrCheck,
  'fr-LU': frLuCheck,
  'hr-HR': hrHrCheck,
  'hu-HU': huHuCheck,
  'it-IT': itItCheck,
  'lv-LV': lvLvCheck,
  'mt-MT': mtMtCheck,
  'nl-NL': nlNlCheck,
  'pl-PL': plPlCheck,
  'pt-BR': ptBrCheck,
  'pt-PT': ptPtCheck,
  'ro-RO': roRoCheck,
  'sk-SK': skSkCheck,
  'sl-SI': slSiCheck,
  'sv-SE': svSeCheck,
  'uk-UA': ukUaCheck
};
// taxIdCheck locale aliases
taxIdCheck['lb-LU'] = taxIdCheck['fr-LU'];
taxIdCheck['lt-LT'] = taxIdCheck['et-EE'];
taxIdCheck['nl-BE'] = taxIdCheck['fr-BE'];
taxIdCheck['fr-CA'] = taxIdCheck['en-CA'];

// Regexes for locales where characters should be omitted before checking format
var allsymbols = /[-\\\/!@#$%\^&\*\(\)\+\=\[\]]+/g;
var sanitizeRegexes = {
  'de-AT': allsymbols,
  'de-DE': /[\/\\]/g,
  'fr-BE': allsymbols
};
// sanitizeRegexes locale aliases
sanitizeRegexes['nl-BE'] = sanitizeRegexes['fr-BE'];

/*
 * Validator function
 * Return true if the passed string is a valid tax identification number
 * for the specified locale.
 * Throw an error exception if the locale is not supported.
 */
function isTaxID(str) {
  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en-US';
  (0, _assertString.default)(str);
  // Copy TIN to avoid replacement if sanitized
  var strcopy = str.slice(0);
  if (locale in taxIdFormat) {
    if (locale in sanitizeRegexes) {
      strcopy = strcopy.replace(sanitizeRegexes[locale], '');
    }
    if (!taxIdFormat[locale].test(strcopy)) {
      return false;
    }
    if (locale in taxIdCheck) {
      return taxIdCheck[locale](strcopy);
    }
    // Fallthrough; not all locales have algorithmic checks
    return true;
  }
  throw new Error("Invalid locale '".concat(locale, "'"));
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js","./util/algorithms":"../../node_modules/validator/lib/util/algorithms.js","./isDate":"../../node_modules/validator/lib/isDate.js"}],"../../node_modules/validator/lib/isMobilePhone.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isMobilePhone;
exports.locales = void 0;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
/* eslint-disable max-len */
var phones = {
  'am-AM': /^(\+?374|0)(33|4[134]|55|77|88|9[13-689])\d{6}$/,
  'ar-AE': /^((\+?971)|0)?5[024568]\d{7}$/,
  'ar-BH': /^(\+?973)?(3|6)\d{7}$/,
  'ar-DZ': /^(\+?213|0)(5|6|7)\d{8}$/,
  'ar-LB': /^(\+?961)?((3|81)\d{6}|7\d{7})$/,
  'ar-EG': /^((\+?20)|0)?1[0125]\d{8}$/,
  'ar-IQ': /^(\+?964|0)?7[0-9]\d{8}$/,
  'ar-JO': /^(\+?962|0)?7[789]\d{7}$/,
  'ar-KW': /^(\+?965)([569]\d{7}|41\d{6})$/,
  'ar-LY': /^((\+?218)|0)?(9[1-6]\d{7}|[1-8]\d{7,9})$/,
  'ar-MA': /^(?:(?:\+|00)212|0)[5-7]\d{8}$/,
  'ar-OM': /^((\+|00)968)?([79][1-9])\d{6}$/,
  'ar-PS': /^(\+?970|0)5[6|9](\d{7})$/,
  'ar-SA': /^(!?(\+?966)|0)?5\d{8}$/,
  'ar-SD': /^((\+?249)|0)?(9[012369]|1[012])\d{7}$/,
  'ar-SY': /^(!?(\+?963)|0)?9\d{8}$/,
  'ar-TN': /^(\+?216)?[2459]\d{7}$/,
  'az-AZ': /^(\+994|0)(10|5[015]|7[07]|99)\d{7}$/,
  'ar-QA': /^(\+?974|0)?([3567]\d{7})$/,
  'bs-BA': /^((((\+|00)3876)|06))((([0-3]|[5-6])\d{6})|(4\d{7}))$/,
  'be-BY': /^(\+?375)?(24|25|29|33|44)\d{7}$/,
  'bg-BG': /^(\+?359|0)?8[789]\d{7}$/,
  'bn-BD': /^(\+?880|0)1[13456789][0-9]{8}$/,
  'ca-AD': /^(\+376)?[346]\d{5}$/,
  'cs-CZ': /^(\+?420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
  'da-DK': /^(\+?45)?\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}$/,
  'de-DE': /^((\+49|0)1)(5[0-25-9]\d|6([23]|0\d?)|7([0-57-9]|6\d))\d{7,9}$/,
  'de-AT': /^(\+43|0)\d{1,4}\d{3,12}$/,
  'de-CH': /^(\+41|0)([1-9])\d{1,9}$/,
  'de-LU': /^(\+352)?((6\d1)\d{6})$/,
  'dv-MV': /^(\+?960)?(7[2-9]|9[1-9])\d{5}$/,
  'el-GR': /^(\+?30|0)?6(8[5-9]|9(?![26])[0-9])\d{7}$/,
  'el-CY': /^(\+?357?)?(9(9|7|6|5|4)\d{6})$/,
  'en-AI': /^(\+?1|0)264(?:2(35|92)|4(?:6[1-2]|76|97)|5(?:3[6-9]|8[1-4])|7(?:2(4|9)|72))\d{4}$/,
  'en-AU': /^(\+?61|0)4\d{8}$/,
  'en-AG': /^(?:\+1|1)268(?:464|7(?:1[3-9]|[28]\d|3[0246]|64|7[0-689]))\d{4}$/,
  'en-BM': /^(\+?1)?441(((3|7)\d{6}$)|(5[0-3][0-9]\d{4}$)|(59\d{5}$))/,
  'en-BS': /^(\+?1[-\s]?|0)?\(?242\)?[-\s]?\d{3}[-\s]?\d{4}$/,
  'en-GB': /^(\+?44|0)7[1-9]\d{8}$/,
  'en-GG': /^(\+?44|0)1481\d{6}$/,
  'en-GH': /^(\+233|0)(20|50|24|54|27|57|26|56|23|53|28|55|59)\d{7}$/,
  'en-GY': /^(\+592|0)6\d{6}$/,
  'en-HK': /^(\+?852[-\s]?)?[456789]\d{3}[-\s]?\d{4}$/,
  'en-MO': /^(\+?853[-\s]?)?[6]\d{3}[-\s]?\d{4}$/,
  'en-IE': /^(\+?353|0)8[356789]\d{7}$/,
  'en-IN': /^(\+?91|0)?[6789]\d{9}$/,
  'en-JM': /^(\+?876)?\d{7}$/,
  'en-KE': /^(\+?254|0)(7|1)\d{8}$/,
  'fr-CF': /^(\+?236| ?)(70|75|77|72|21|22)\d{6}$/,
  'en-SS': /^(\+?211|0)(9[1257])\d{7}$/,
  'en-KI': /^((\+686|686)?)?( )?((6|7)(2|3|8)[0-9]{6})$/,
  'en-KN': /^(?:\+1|1)869(?:46\d|48[89]|55[6-8]|66\d|76[02-7])\d{4}$/,
  'en-LS': /^(\+?266)(22|28|57|58|59|27|52)\d{6}$/,
  'en-MT': /^(\+?356|0)?(99|79|77|21|27|22|25)[0-9]{6}$/,
  'en-MU': /^(\+?230|0)?\d{8}$/,
  'en-MW': /^(\+?265|0)(((77|88|31|99|98|21)\d{7})|(((111)|1)\d{6})|(32000\d{4}))$/,
  'en-NA': /^(\+?264|0)(6|8)\d{7}$/,
  'en-NG': /^(\+?234|0)?[789]\d{9}$/,
  'en-NZ': /^(\+?64|0)[28]\d{7,9}$/,
  'en-PG': /^(\+?675|0)?(7\d|8[18])\d{6}$/,
  'en-PK': /^((00|\+)?92|0)3[0-6]\d{8}$/,
  'en-PH': /^(09|\+639)\d{9}$/,
  'en-RW': /^(\+?250|0)?[7]\d{8}$/,
  'en-SG': /^(\+65)?[3689]\d{7}$/,
  'en-SL': /^(\+?232|0)\d{8}$/,
  'en-TZ': /^(\+?255|0)?[67]\d{8}$/,
  'en-UG': /^(\+?256|0)?[7]\d{8}$/,
  'en-US': /^((\+1|1)?( |-)?)?(\([2-9][0-9]{2}\)|[2-9][0-9]{2})( |-)?([2-9][0-9]{2}( |-)?[0-9]{4})$/,
  'en-ZA': /^(\+?27|0)\d{9}$/,
  'en-ZM': /^(\+?26)?0[79][567]\d{7}$/,
  'en-ZW': /^(\+263)[0-9]{9}$/,
  'en-BW': /^(\+?267)?(7[1-8]{1})\d{6}$/,
  'es-AR': /^\+?549(11|[2368]\d)\d{8}$/,
  'es-BO': /^(\+?591)?(6|7)\d{7}$/,
  'es-CO': /^(\+?57)?3(0(0|1|2|4|5)|1\d|2[0-4]|5(0|1))\d{7}$/,
  'es-CL': /^(\+?56|0)[2-9]\d{1}\d{7}$/,
  'es-CR': /^(\+506)?[2-8]\d{7}$/,
  'es-CU': /^(\+53|0053)?5\d{7}$/,
  'es-DO': /^(\+?1)?8[024]9\d{7}$/,
  'es-HN': /^(\+?504)?[9|8|3|2]\d{7}$/,
  'es-EC': /^(\+?593|0)([2-7]|9[2-9])\d{7}$/,
  'es-ES': /^(\+?34)?[6|7]\d{8}$/,
  'es-GT': /^(\+?502)?[2|6|7]\d{7}$/,
  'es-PE': /^(\+?51)?9\d{8}$/,
  'es-MX': /^(\+?52)?(1|01)?\d{10,11}$/,
  'es-NI': /^(\+?505)\d{7,8}$/,
  'es-PA': /^(\+?507)\d{7,8}$/,
  'es-PY': /^(\+?595|0)9[9876]\d{7}$/,
  'es-SV': /^(\+?503)?[67]\d{7}$/,
  'es-UY': /^(\+598|0)9[1-9][\d]{6}$/,
  'es-VE': /^(\+?58)?(2|4)\d{9}$/,
  'et-EE': /^(\+?372)?\s?(5|8[1-4])\s?([0-9]\s?){6,7}$/,
  'fa-IR': /^(\+?98[\-\s]?|0)9[0-39]\d[\-\s]?\d{3}[\-\s]?\d{4}$/,
  'fi-FI': /^(\+?358|0)\s?(4[0-6]|50)\s?(\d\s?){4,8}$/,
  'fj-FJ': /^(\+?679)?\s?\d{3}\s?\d{4}$/,
  'fo-FO': /^(\+?298)?\s?\d{2}\s?\d{2}\s?\d{2}$/,
  'fr-BF': /^(\+226|0)[67]\d{7}$/,
  'fr-BJ': /^(\+229)\d{8}$/,
  'fr-CD': /^(\+?243|0)?(8|9)\d{8}$/,
  'fr-CM': /^(\+?237)6[0-9]{8}$/,
  'fr-DJ': /^(?:\+253)?77[6-8]\d{5}$/,
  'fr-FR': /^(\+?33|0)[67]\d{8}$/,
  'fr-GF': /^(\+?594|0|00594)[67]\d{8}$/,
  'fr-GP': /^(\+?590|0|00590)[67]\d{8}$/,
  'fr-MQ': /^(\+?596|0|00596)[67]\d{8}$/,
  'fr-PF': /^(\+?689)?8[789]\d{6}$/,
  'fr-RE': /^(\+?262|0|00262)[67]\d{8}$/,
  'fr-WF': /^(\+681)?\d{6}$/,
  'he-IL': /^(\+972|0)([23489]|5[012345689]|77)[1-9]\d{6}$/,
  'hu-HU': /^(\+?36|06)(20|30|31|50|70)\d{7}$/,
  'id-ID': /^(\+?62|0)8(1[123456789]|2[1238]|3[1238]|5[12356789]|7[78]|9[56789]|8[123456789])([\s?|\d]{5,11})$/,
  'ir-IR': /^(\+98|0)?9\d{9}$/,
  'it-IT': /^(\+?39)?\s?3\d{2} ?\d{6,7}$/,
  'it-SM': /^((\+378)|(0549)|(\+390549)|(\+3780549))?6\d{5,9}$/,
  'ja-JP': /^(\+81[ \-]?(\(0\))?|0)[6789]0[ \-]?\d{4}[ \-]?\d{4}$/,
  'ka-GE': /^(\+?995)?(79\d{7}|5\d{8})$/,
  'kk-KZ': /^(\+?7|8)?7\d{9}$/,
  'kl-GL': /^(\+?299)?\s?\d{2}\s?\d{2}\s?\d{2}$/,
  'ko-KR': /^((\+?82)[ \-]?)?0?1([0|1|6|7|8|9]{1})[ \-]?\d{3,4}[ \-]?\d{4}$/,
  'ky-KG': /^(\+996\s?)?(22[0-9]|50[0-9]|55[0-9]|70[0-9]|75[0-9]|77[0-9]|880|990|995|996|997|998)\s?\d{3}\s?\d{3}$/,
  'lt-LT': /^(\+370|8)\d{8}$/,
  'lv-LV': /^(\+?371)2\d{7}$/,
  'mg-MG': /^((\+?261|0)(2|3)\d)?\d{7}$/,
  'mn-MN': /^(\+|00|011)?976(77|81|88|91|94|95|96|99)\d{6}$/,
  'my-MM': /^(\+?959|09|9)(2[5-7]|3[1-2]|4[0-5]|6[6-9]|7[5-9]|9[6-9])[0-9]{7}$/,
  'ms-MY': /^(\+?60|0)1(([0145](-|\s)?\d{7,8})|([236-9](-|\s)?\d{7}))$/,
  'mz-MZ': /^(\+?258)?8[234567]\d{7}$/,
  'nb-NO': /^(\+?47)?[49]\d{7}$/,
  'ne-NP': /^(\+?977)?9[78]\d{8}$/,
  'nl-BE': /^(\+?32|0)4\d{8}$/,
  'nl-NL': /^(((\+|00)?31\(0\))|((\+|00)?31)|0)6{1}\d{8}$/,
  'nl-AW': /^(\+)?297(56|59|64|73|74|99)\d{5}$/,
  'nn-NO': /^(\+?47)?[49]\d{7}$/,
  'pl-PL': /^(\+?48)? ?([5-8]\d|45) ?\d{3} ?\d{2} ?\d{2}$/,
  'pt-BR': /^((\+?55\ ?[1-9]{2}\ ?)|(\+?55\ ?\([1-9]{2}\)\ ?)|(0[1-9]{2}\ ?)|(\([1-9]{2}\)\ ?)|([1-9]{2}\ ?))((\d{4}\-?\d{4})|(9[1-9]{1}\d{3}\-?\d{4}))$/,
  'pt-PT': /^(\+?351)?9[1236]\d{7}$/,
  'pt-AO': /^(\+?244)?9\d{8}$/,
  'ro-MD': /^(\+?373|0)((6(0|1|2|6|7|8|9))|(7(6|7|8|9)))\d{6}$/,
  'ro-RO': /^(\+?40|0)\s?7\d{2}(\/|\s|\.|-)?\d{3}(\s|\.|-)?\d{3}$/,
  'ru-RU': /^(\+?7|8)?9\d{9}$/,
  'si-LK': /^(?:0|94|\+94)?(7(0|1|2|4|5|6|7|8)( |-)?)\d{7}$/,
  'sl-SI': /^(\+386\s?|0)(\d{1}\s?\d{3}\s?\d{2}\s?\d{2}|\d{2}\s?\d{3}\s?\d{3})$/,
  'sk-SK': /^(\+?421)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
  'so-SO': /^(\+?252|0)((6[0-9])\d{7}|(7[1-9])\d{7})$/,
  'sq-AL': /^(\+355|0)6[2-9]\d{7}$/,
  'sr-RS': /^(\+3816|06)[- \d]{5,9}$/,
  'sv-SE': /^(\+?46|0)[\s\-]?7[\s\-]?[02369]([\s\-]?\d){7}$/,
  'tg-TJ': /^(\+?992)?[5][5]\d{7}$/,
  'th-TH': /^(\+66|66|0)\d{9}$/,
  'tr-TR': /^(\+?90|0)?5\d{9}$/,
  'tk-TM': /^(\+993|993|8)\d{8}$/,
  'uk-UA': /^(\+?38)?0(50|6[36-8]|7[357]|9[1-9])\d{7}$/,
  'uz-UZ': /^(\+?998)?(6[125-79]|7[1-69]|88|9\d)\d{7}$/,
  'vi-VN': /^((\+?84)|0)((3([2-9]))|(5([25689]))|(7([0|6-9]))|(8([1-9]))|(9([0-9])))([0-9]{7})$/,
  'zh-CN': /^((\+|00)86)?(1[3-9]|9[28])\d{9}$/,
  'zh-TW': /^(\+?886\-?|0)?9\d{8}$/,
  'dz-BT': /^(\+?975|0)?(17|16|77|02)\d{6}$/,
  'ar-YE': /^(((\+|00)9677|0?7)[0137]\d{7}|((\+|00)967|0)[1-7]\d{6})$/,
  'ar-EH': /^(\+?212|0)[\s\-]?(5288|5289)[\s\-]?\d{5}$/,
  'fa-AF': /^(\+93|0)?(2{1}[0-8]{1}|[3-5]{1}[0-4]{1})(\d{7})$/,
  'mk-MK': /^(\+?389|0)?((?:2[2-9]\d{6}|(?:3[1-4]|4[2-8])\d{6}|500\d{5}|5[2-9]\d{6}|7[0-9][2-9]\d{5}|8[1-9]\d{6}|800\d{5}|8009\d{4}))$/
};
/* eslint-enable max-len */

// aliases
phones['en-CA'] = phones['en-US'];
phones['fr-CA'] = phones['en-CA'];
phones['fr-BE'] = phones['nl-BE'];
phones['zh-HK'] = phones['en-HK'];
phones['zh-MO'] = phones['en-MO'];
phones['ga-IE'] = phones['en-IE'];
phones['fr-CH'] = phones['de-CH'];
phones['it-CH'] = phones['fr-CH'];
function isMobilePhone(str, locale, options) {
  (0, _assertString.default)(str);
  if (options && options.strictMode && !str.startsWith('+')) {
    return false;
  }
  if (Array.isArray(locale)) {
    return locale.some(function (key) {
      // https://github.com/gotwarlost/istanbul/blob/master/ignoring-code-for-coverage.md#ignoring-code-for-coverage-purposes
      // istanbul ignore else
      if (phones.hasOwnProperty(key)) {
        var phone = phones[key];
        if (phone.test(str)) {
          return true;
        }
      }
      return false;
    });
  } else if (locale in phones) {
    return phones[locale].test(str);
    // alias falsey locale as 'any'
  } else if (!locale || locale === 'any') {
    for (var key in phones) {
      // istanbul ignore else
      if (phones.hasOwnProperty(key)) {
        var phone = phones[key];
        if (phone.test(str)) {
          return true;
        }
      }
    }
    return false;
  }
  throw new Error("Invalid locale '".concat(locale, "'"));
}
var locales = exports.locales = Object.keys(phones);
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isEthereumAddress.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isEthereumAddress;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
var eth = /^(0x)[0-9a-f]{40}$/i;
function isEthereumAddress(str) {
  (0, _assertString.default)(str);
  return eth.test(str);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isCurrency.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isCurrency;
var _merge = _interopRequireDefault(require("./util/merge"));
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function currencyRegex(options) {
  var decimal_digits = "\\d{".concat(options.digits_after_decimal[0], "}");
  options.digits_after_decimal.forEach(function (digit, index) {
    if (index !== 0) decimal_digits = "".concat(decimal_digits, "|\\d{").concat(digit, "}");
  });
  var symbol = "(".concat(options.symbol.replace(/\W/, function (m) {
      return "\\".concat(m);
    }), ")").concat(options.require_symbol ? '' : '?'),
    negative = '-?',
    whole_dollar_amount_without_sep = '[1-9]\\d*',
    whole_dollar_amount_with_sep = "[1-9]\\d{0,2}(\\".concat(options.thousands_separator, "\\d{3})*"),
    valid_whole_dollar_amounts = ['0', whole_dollar_amount_without_sep, whole_dollar_amount_with_sep],
    whole_dollar_amount = "(".concat(valid_whole_dollar_amounts.join('|'), ")?"),
    decimal_amount = "(\\".concat(options.decimal_separator, "(").concat(decimal_digits, "))").concat(options.require_decimal ? '' : '?');
  var pattern = whole_dollar_amount + (options.allow_decimal || options.require_decimal ? decimal_amount : '');

  // default is negative sign before symbol, but there are two other options (besides parens)
  if (options.allow_negatives && !options.parens_for_negatives) {
    if (options.negative_sign_after_digits) {
      pattern += negative;
    } else if (options.negative_sign_before_digits) {
      pattern = negative + pattern;
    }
  }

  // South African Rand, for example, uses R 123 (space) and R-123 (no space)
  if (options.allow_negative_sign_placeholder) {
    pattern = "( (?!\\-))?".concat(pattern);
  } else if (options.allow_space_after_symbol) {
    pattern = " ?".concat(pattern);
  } else if (options.allow_space_after_digits) {
    pattern += '( (?!$))?';
  }
  if (options.symbol_after_digits) {
    pattern += symbol;
  } else {
    pattern = symbol + pattern;
  }
  if (options.allow_negatives) {
    if (options.parens_for_negatives) {
      pattern = "(\\(".concat(pattern, "\\)|").concat(pattern, ")");
    } else if (!(options.negative_sign_before_digits || options.negative_sign_after_digits)) {
      pattern = negative + pattern;
    }
  }

  // ensure there's a dollar and/or decimal amount, and that
  // it doesn't start with a space or a negative sign followed by a space
  return new RegExp("^(?!-? )(?=.*\\d)".concat(pattern, "$"));
}
var default_currency_options = {
  symbol: '$',
  require_symbol: false,
  allow_space_after_symbol: false,
  symbol_after_digits: false,
  allow_negatives: true,
  parens_for_negatives: false,
  negative_sign_before_digits: false,
  negative_sign_after_digits: false,
  allow_negative_sign_placeholder: false,
  thousands_separator: ',',
  decimal_separator: '.',
  allow_decimal: true,
  require_decimal: false,
  digits_after_decimal: [2],
  allow_space_after_digits: false
};
function isCurrency(str, options) {
  (0, _assertString.default)(str);
  options = (0, _merge.default)(options, default_currency_options);
  return currencyRegex(options).test(str);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/merge":"../../node_modules/validator/lib/util/merge.js","./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isBtcAddress.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isBtcAddress;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
var bech32 = /^(bc1|tb1|bc1p|tb1p)[ac-hj-np-z02-9]{39,58}$/;
var base58 = /^(1|2|3|m)[A-HJ-NP-Za-km-z1-9]{25,39}$/;
function isBtcAddress(str) {
  (0, _assertString.default)(str);
  return bech32.test(str) || base58.test(str);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isISO6346.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFreightContainerID = void 0;
exports.isISO6346 = isISO6346;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
// https://en.wikipedia.org/wiki/ISO_6346
// according to ISO6346 standard, checksum digit is mandatory for freight container but recommended
// for other container types (J and Z)
var isISO6346Str = /^[A-Z]{3}(U[0-9]{7})|([J,Z][0-9]{6,7})$/;
var isDigit = /^[0-9]$/;
function isISO6346(str) {
  (0, _assertString.default)(str);
  str = str.toUpperCase();
  if (!isISO6346Str.test(str)) return false;
  if (str.length === 11) {
    var sum = 0;
    for (var i = 0; i < str.length - 1; i++) {
      if (!isDigit.test(str[i])) {
        var convertedCode = void 0;
        var letterCode = str.charCodeAt(i) - 55;
        if (letterCode < 11) convertedCode = letterCode;else if (letterCode >= 11 && letterCode <= 20) convertedCode = 12 + letterCode % 11;else if (letterCode >= 21 && letterCode <= 30) convertedCode = 23 + letterCode % 21;else convertedCode = 34 + letterCode % 31;
        sum += convertedCode * Math.pow(2, i);
      } else sum += str[i] * Math.pow(2, i);
    }
    var checkSumDigit = sum % 11;
    if (checkSumDigit === 10) checkSumDigit = 0;
    return Number(str[str.length - 1]) === checkSumDigit;
  }
  return true;
}
var isFreightContainerID = exports.isFreightContainerID = isISO6346;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isISO6391.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isISO6391;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
var isISO6391Set = new Set(['aa', 'ab', 'ae', 'af', 'ak', 'am', 'an', 'ar', 'as', 'av', 'ay', 'az', 'az', 'ba', 'be', 'bg', 'bh', 'bi', 'bm', 'bn', 'bo', 'br', 'bs', 'ca', 'ce', 'ch', 'co', 'cr', 'cs', 'cu', 'cv', 'cy', 'da', 'de', 'dv', 'dz', 'ee', 'el', 'en', 'eo', 'es', 'et', 'eu', 'fa', 'ff', 'fi', 'fj', 'fo', 'fr', 'fy', 'ga', 'gd', 'gl', 'gn', 'gu', 'gv', 'ha', 'he', 'hi', 'ho', 'hr', 'ht', 'hu', 'hy', 'hz', 'ia', 'id', 'ie', 'ig', 'ii', 'ik', 'io', 'is', 'it', 'iu', 'ja', 'jv', 'ka', 'kg', 'ki', 'kj', 'kk', 'kl', 'km', 'kn', 'ko', 'kr', 'ks', 'ku', 'kv', 'kw', 'ky', 'la', 'lb', 'lg', 'li', 'ln', 'lo', 'lt', 'lu', 'lv', 'mg', 'mh', 'mi', 'mk', 'ml', 'mn', 'mr', 'ms', 'mt', 'my', 'na', 'nb', 'nd', 'ne', 'ng', 'nl', 'nn', 'no', 'nr', 'nv', 'ny', 'oc', 'oj', 'om', 'or', 'os', 'pa', 'pi', 'pl', 'ps', 'pt', 'qu', 'rm', 'rn', 'ro', 'ru', 'rw', 'sa', 'sc', 'sd', 'se', 'sg', 'si', 'sk', 'sl', 'sm', 'sn', 'so', 'sq', 'sr', 'ss', 'st', 'su', 'sv', 'sw', 'ta', 'te', 'tg', 'th', 'ti', 'tk', 'tl', 'tn', 'to', 'tr', 'ts', 'tt', 'tw', 'ty', 'ug', 'uk', 'ur', 'uz', 've', 'vi', 'vo', 'wa', 'wo', 'xh', 'yi', 'yo', 'za', 'zh', 'zu']);
function isISO6391(str) {
  (0, _assertString.default)(str);
  return isISO6391Set.has(str);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isISO8601.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isISO8601;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
/* eslint-disable max-len */
// from http://goo.gl/0ejHHW
var iso8601 = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-3])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
// same as above, except with a strict 'T' separator between date and time
var iso8601StrictSeparator = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-3])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
/* eslint-enable max-len */
var isValidDate = function isValidDate(str) {
  // str must have passed the ISO8601 check
  // this check is meant to catch invalid dates
  // like 2009-02-31
  // first check for ordinal dates
  var ordinalMatch = str.match(/^(\d{4})-?(\d{3})([ T]{1}\.*|$)/);
  if (ordinalMatch) {
    var oYear = Number(ordinalMatch[1]);
    var oDay = Number(ordinalMatch[2]);
    // if is leap year
    if (oYear % 4 === 0 && oYear % 100 !== 0 || oYear % 400 === 0) return oDay <= 366;
    return oDay <= 365;
  }
  var match = str.match(/(\d{4})-?(\d{0,2})-?(\d*)/).map(Number);
  var year = match[1];
  var month = match[2];
  var day = match[3];
  var monthString = month ? "0".concat(month).slice(-2) : month;
  var dayString = day ? "0".concat(day).slice(-2) : day;

  // create a date object and compare
  var d = new Date("".concat(year, "-").concat(monthString || '01', "-").concat(dayString || '01'));
  if (month && day) {
    return d.getUTCFullYear() === year && d.getUTCMonth() + 1 === month && d.getUTCDate() === day;
  }
  return true;
};
function isISO8601(str) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _assertString.default)(str);
  var check = options.strictSeparator ? iso8601StrictSeparator.test(str) : iso8601.test(str);
  if (check && options.strict) return isValidDate(str);
  return check;
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isRFC3339.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isRFC3339;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
/* Based on https://tools.ietf.org/html/rfc3339#section-5.6 */

var dateFullYear = /[0-9]{4}/;
var dateMonth = /(0[1-9]|1[0-2])/;
var dateMDay = /([12]\d|0[1-9]|3[01])/;
var timeHour = /([01][0-9]|2[0-3])/;
var timeMinute = /[0-5][0-9]/;
var timeSecond = /([0-5][0-9]|60)/;
var timeSecFrac = /(\.[0-9]+)?/;
var timeNumOffset = new RegExp("[-+]".concat(timeHour.source, ":").concat(timeMinute.source));
var timeOffset = new RegExp("([zZ]|".concat(timeNumOffset.source, ")"));
var partialTime = new RegExp("".concat(timeHour.source, ":").concat(timeMinute.source, ":").concat(timeSecond.source).concat(timeSecFrac.source));
var fullDate = new RegExp("".concat(dateFullYear.source, "-").concat(dateMonth.source, "-").concat(dateMDay.source));
var fullTime = new RegExp("".concat(partialTime.source).concat(timeOffset.source));
var rfc3339 = new RegExp("^".concat(fullDate.source, "[ tT]").concat(fullTime.source, "$"));
function isRFC3339(str) {
  (0, _assertString.default)(str);
  return rfc3339.test(str);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isISO15924.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScriptCodes = void 0;
exports.default = isISO15924;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
// from https://www.unicode.org/iso15924/iso15924-codes.html
var validISO15924Codes = new Set(['Adlm', 'Afak', 'Aghb', 'Ahom', 'Arab', 'Aran', 'Armi', 'Armn', 'Avst', 'Bali', 'Bamu', 'Bass', 'Batk', 'Beng', 'Bhks', 'Blis', 'Bopo', 'Brah', 'Brai', 'Bugi', 'Buhd', 'Cakm', 'Cans', 'Cari', 'Cham', 'Cher', 'Chis', 'Chrs', 'Cirt', 'Copt', 'Cpmn', 'Cprt', 'Cyrl', 'Cyrs', 'Deva', 'Diak', 'Dogr', 'Dsrt', 'Dupl', 'Egyd', 'Egyh', 'Egyp', 'Elba', 'Elym', 'Ethi', 'Gara', 'Geok', 'Geor', 'Glag', 'Gong', 'Gonm', 'Goth', 'Gran', 'Grek', 'Gujr', 'Gukh', 'Guru', 'Hanb', 'Hang', 'Hani', 'Hano', 'Hans', 'Hant', 'Hatr', 'Hebr', 'Hira', 'Hluw', 'Hmng', 'Hmnp', 'Hrkt', 'Hung', 'Inds', 'Ital', 'Jamo', 'Java', 'Jpan', 'Jurc', 'Kali', 'Kana', 'Kawi', 'Khar', 'Khmr', 'Khoj', 'Kitl', 'Kits', 'Knda', 'Kore', 'Kpel', 'Krai', 'Kthi', 'Lana', 'Laoo', 'Latf', 'Latg', 'Latn', 'Leke', 'Lepc', 'Limb', 'Lina', 'Linb', 'Lisu', 'Loma', 'Lyci', 'Lydi', 'Mahj', 'Maka', 'Mand', 'Mani', 'Marc', 'Maya', 'Medf', 'Mend', 'Merc', 'Mero', 'Mlym', 'Modi', 'Mong', 'Moon', 'Mroo', 'Mtei', 'Mult', 'Mymr', 'Nagm', 'Nand', 'Narb', 'Nbat', 'Newa', 'Nkdb', 'Nkgb', 'Nkoo', 'Nshu', 'Ogam', 'Olck', 'Onao', 'Orkh', 'Orya', 'Osge', 'Osma', 'Ougr', 'Palm', 'Pauc', 'Pcun', 'Pelm', 'Perm', 'Phag', 'Phli', 'Phlp', 'Phlv', 'Phnx', 'Plrd', 'Piqd', 'Prti', 'Psin', 'Qaaa', 'Qaab', 'Qaac', 'Qaad', 'Qaae', 'Qaaf', 'Qaag', 'Qaah', 'Qaai', 'Qaaj', 'Qaak', 'Qaal', 'Qaam', 'Qaan', 'Qaao', 'Qaap', 'Qaaq', 'Qaar', 'Qaas', 'Qaat', 'Qaau', 'Qaav', 'Qaaw', 'Qaax', 'Qaay', 'Qaaz', 'Qaba', 'Qabb', 'Qabc', 'Qabd', 'Qabe', 'Qabf', 'Qabg', 'Qabh', 'Qabi', 'Qabj', 'Qabk', 'Qabl', 'Qabm', 'Qabn', 'Qabo', 'Qabp', 'Qabq', 'Qabr', 'Qabs', 'Qabt', 'Qabu', 'Qabv', 'Qabw', 'Qabx', 'Ranj', 'Rjng', 'Rohg', 'Roro', 'Runr', 'Samr', 'Sara', 'Sarb', 'Saur', 'Sgnw', 'Shaw', 'Shrd', 'Shui', 'Sidd', 'Sidt', 'Sind', 'Sinh', 'Sogd', 'Sogo', 'Sora', 'Soyo', 'Sund', 'Sunu', 'Sylo', 'Syrc', 'Syre', 'Syrj', 'Syrn', 'Tagb', 'Takr', 'Tale', 'Talu', 'Taml', 'Tang', 'Tavt', 'Tayo', 'Telu', 'Teng', 'Tfng', 'Tglg', 'Thaa', 'Thai', 'Tibt', 'Tirh', 'Tnsa', 'Todr', 'Tols', 'Toto', 'Tutg', 'Ugar', 'Vaii', 'Visp', 'Vith', 'Wara', 'Wcho', 'Wole', 'Xpeo', 'Xsux', 'Yezi', 'Yiii', 'Zanb', 'Zinh', 'Zmth', 'Zsye', 'Zsym', 'Zxxx', 'Zyyy', 'Zzzz']);
function isISO15924(str) {
  (0, _assertString.default)(str);
  return validISO15924Codes.has(str);
}
var ScriptCodes = exports.ScriptCodes = validISO15924Codes;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isISO31661Alpha3.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isISO31661Alpha3;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
// from https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3
var validISO31661Alpha3CountriesCodes = new Set(['AFG', 'ALA', 'ALB', 'DZA', 'ASM', 'AND', 'AGO', 'AIA', 'ATA', 'ATG', 'ARG', 'ARM', 'ABW', 'AUS', 'AUT', 'AZE', 'BHS', 'BHR', 'BGD', 'BRB', 'BLR', 'BEL', 'BLZ', 'BEN', 'BMU', 'BTN', 'BOL', 'BES', 'BIH', 'BWA', 'BVT', 'BRA', 'IOT', 'BRN', 'BGR', 'BFA', 'BDI', 'KHM', 'CMR', 'CAN', 'CPV', 'CYM', 'CAF', 'TCD', 'CHL', 'CHN', 'CXR', 'CCK', 'COL', 'COM', 'COG', 'COD', 'COK', 'CRI', 'CIV', 'HRV', 'CUB', 'CUW', 'CYP', 'CZE', 'DNK', 'DJI', 'DMA', 'DOM', 'ECU', 'EGY', 'SLV', 'GNQ', 'ERI', 'EST', 'ETH', 'FLK', 'FRO', 'FJI', 'FIN', 'FRA', 'GUF', 'PYF', 'ATF', 'GAB', 'GMB', 'GEO', 'DEU', 'GHA', 'GIB', 'GRC', 'GRL', 'GRD', 'GLP', 'GUM', 'GTM', 'GGY', 'GIN', 'GNB', 'GUY', 'HTI', 'HMD', 'VAT', 'HND', 'HKG', 'HUN', 'ISL', 'IND', 'IDN', 'IRN', 'IRQ', 'IRL', 'IMN', 'ISR', 'ITA', 'JAM', 'JPN', 'JEY', 'JOR', 'KAZ', 'KEN', 'KIR', 'PRK', 'KOR', 'KWT', 'KGZ', 'LAO', 'LVA', 'LBN', 'LSO', 'LBR', 'LBY', 'LIE', 'LTU', 'LUX', 'MAC', 'MKD', 'MDG', 'MWI', 'MYS', 'MDV', 'MLI', 'MLT', 'MHL', 'MTQ', 'MRT', 'MUS', 'MYT', 'MEX', 'FSM', 'MDA', 'MCO', 'MNG', 'MNE', 'MSR', 'MAR', 'MOZ', 'MMR', 'NAM', 'NRU', 'NPL', 'NLD', 'NCL', 'NZL', 'NIC', 'NER', 'NGA', 'NIU', 'NFK', 'MNP', 'NOR', 'OMN', 'PAK', 'PLW', 'PSE', 'PAN', 'PNG', 'PRY', 'PER', 'PHL', 'PCN', 'POL', 'PRT', 'PRI', 'QAT', 'REU', 'ROU', 'RUS', 'RWA', 'BLM', 'SHN', 'KNA', 'LCA', 'MAF', 'SPM', 'VCT', 'WSM', 'SMR', 'STP', 'SAU', 'SEN', 'SRB', 'SYC', 'SLE', 'SGP', 'SXM', 'SVK', 'SVN', 'SLB', 'SOM', 'ZAF', 'SGS', 'SSD', 'ESP', 'LKA', 'SDN', 'SUR', 'SJM', 'SWZ', 'SWE', 'CHE', 'SYR', 'TWN', 'TJK', 'TZA', 'THA', 'TLS', 'TGO', 'TKL', 'TON', 'TTO', 'TUN', 'TUR', 'TKM', 'TCA', 'TUV', 'UGA', 'UKR', 'ARE', 'GBR', 'USA', 'UMI', 'URY', 'UZB', 'VUT', 'VEN', 'VNM', 'VGB', 'VIR', 'WLF', 'ESH', 'YEM', 'ZMB', 'ZWE']);
var alpha3CountryCode = /^[a-zA-Z]{3}$/;
function isISO31661Alpha3(str) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _assertString.default)(str);
  var userAssignedCodes = options.userAssignedCodes;
  var validUserAssignedCodes = (userAssignedCodes || []).reduce(function (accumulator, userAssignedCode) {
    if (alpha3CountryCode.test(userAssignedCode)) {
      accumulator.push(userAssignedCode.toUpperCase());
    }
    return accumulator;
  }, []);
  if (validUserAssignedCodes.includes(str.toUpperCase())) {
    return true;
  }
  return validISO31661Alpha3CountriesCodes.has(str.toUpperCase());
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isISO31661Numeric.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isISO31661Numeric;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
// from https://en.wikipedia.org/wiki/ISO_3166-1_numeric
var validISO31661NumericCountriesCodes = new Set(['004', '008', '010', '012', '016', '020', '024', '028', '031', '032', '036', '040', '044', '048', '050', '051', '052', '056', '060', '064', '068', '070', '072', '074', '076', '084', '086', '090', '092', '096', '100', '104', '108', '112', '116', '120', '124', '132', '136', '140', '144', '148', '152', '156', '158', '162', '166', '170', '174', '175', '178', '180', '184', '188', '191', '192', '196', '203', '204', '208', '212', '214', '218', '222', '226', '231', '232', '233', '234', '238', '239', '242', '246', '248', '250', '254', '258', '260', '262', '266', '268', '270', '275', '276', '288', '292', '296', '300', '304', '308', '312', '316', '320', '324', '328', '332', '334', '336', '340', '344', '348', '352', '356', '360', '364', '368', '372', '376', '380', '384', '388', '392', '398', '400', '404', '408', '410', '414', '417', '418', '422', '426', '428', '430', '434', '438', '440', '442', '446', '450', '454', '458', '462', '466', '470', '474', '478', '480', '484', '492', '496', '498', '499', '500', '504', '508', '512', '516', '520', '524', '528', '531', '533', '534', '535', '540', '548', '554', '558', '562', '566', '570', '574', '578', '580', '581', '583', '584', '585', '586', '591', '598', '600', '604', '608', '612', '616', '620', '624', '626', '630', '634', '638', '642', '643', '646', '652', '654', '659', '660', '662', '663', '666', '670', '674', '678', '682', '686', '688', '690', '694', '702', '703', '704', '705', '706', '710', '716', '724', '728', '729', '732', '740', '744', '748', '752', '756', '760', '762', '764', '768', '772', '776', '780', '784', '788', '792', '795', '796', '798', '800', '804', '807', '818', '826', '831', '832', '833', '834', '840', '850', '854', '858', '860', '862', '876', '882', '887', '894']);
function isISO31661Numeric(str) {
  (0, _assertString.default)(str);
  return validISO31661NumericCountriesCodes.has(str);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isISO4217.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CurrencyCodes = void 0;
exports.default = isISO4217;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
// from https://en.wikipedia.org/wiki/ISO_4217
var validISO4217CurrencyCodes = new Set(['AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BOV', 'BRL', 'BSD', 'BTN', 'BWP', 'BYN', 'BZD', 'CAD', 'CDF', 'CHE', 'CHF', 'CHW', 'CLF', 'CLP', 'CNY', 'COP', 'COU', 'CRC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HTG', 'HUF', 'IDR', 'ILS', 'INR', 'IQD', 'IRR', 'ISK', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KPW', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LYD', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRU', 'MUR', 'MVR', 'MWK', 'MXN', 'MXV', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SDG', 'SEK', 'SGD', 'SHP', 'SLE', 'SLL', 'SOS', 'SRD', 'SSP', 'STN', 'SVC', 'SYP', 'SZL', 'THB', 'TJS', 'TMT', 'TND', 'TOP', 'TRY', 'TTD', 'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'USN', 'UYI', 'UYU', 'UYW', 'UZS', 'VED', 'VES', 'VND', 'VUV', 'WST', 'XAF', 'XAG', 'XAU', 'XBA', 'XBB', 'XBC', 'XBD', 'XCD', 'XDR', 'XOF', 'XPD', 'XPF', 'XPT', 'XSU', 'XTS', 'XUA', 'XXX', 'YER', 'ZAR', 'ZMW', 'ZWL']);
function isISO4217(str) {
  (0, _assertString.default)(str);
  return validISO4217CurrencyCodes.has(str.toUpperCase());
}
var CurrencyCodes = exports.CurrencyCodes = validISO4217CurrencyCodes;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isBase32.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isBase32;
var _assertString = _interopRequireDefault(require("./util/assertString"));
var _merge = _interopRequireDefault(require("./util/merge"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
var base32 = /^[A-Z2-7]+=*$/;
var crockfordBase32 = /^[A-HJKMNP-TV-Z0-9]+$/;
var defaultBase32Options = {
  crockford: false
};
function isBase32(str, options) {
  (0, _assertString.default)(str);
  options = (0, _merge.default)(options, defaultBase32Options);
  if (options.crockford) {
    return crockfordBase32.test(str);
  }
  return str.length % 8 === 0 && base32.test(str);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js","./util/merge":"../../node_modules/validator/lib/util/merge.js"}],"../../node_modules/validator/lib/isBase58.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isBase58;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
// Accepted chars - 123456789ABCDEFGH JKLMN PQRSTUVWXYZabcdefghijk mnopqrstuvwxyz
var base58Reg = /^[A-HJ-NP-Za-km-z1-9]*$/;
function isBase58(str) {
  (0, _assertString.default)(str);
  return base58Reg.test(str);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isDataURI.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isDataURI;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
var validMediaType = /^[a-z]+\/[a-z0-9\-\+\._]+$/i;
var validAttribute = /^[a-z\-]+=[a-z0-9\-]+$/i;
var validData = /^[a-z0-9!\$&'\(\)\*\+,;=\-\._~:@\/\?%\s]*$/i;
function isDataURI(str) {
  (0, _assertString.default)(str);
  var data = str.split(',');
  if (data.length < 2) {
    return false;
  }
  var attributes = data.shift().trim().split(';');
  var schemeAndMediaType = attributes.shift();
  if (schemeAndMediaType.slice(0, 5) !== 'data:') {
    return false;
  }
  var mediaType = schemeAndMediaType.slice(5);
  if (mediaType !== '' && !validMediaType.test(mediaType)) {
    return false;
  }
  for (var i = 0; i < attributes.length; i++) {
    if (!(i === attributes.length - 1 && attributes[i].toLowerCase() === 'base64') && !validAttribute.test(attributes[i])) {
      return false;
    }
  }
  for (var _i = 0; _i < data.length; _i++) {
    if (!validData.test(data[_i])) {
      return false;
    }
  }
  return true;
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isMagnetURI.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isMagnetURI;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
var magnetURIComponent = /(?:^magnet:\?|[^?&]&)xt(?:\.1)?=urn:(?:(?:aich|bitprint|btih|ed2k|ed2khash|kzhash|md5|sha1|tree:tiger):[a-z0-9]{32}(?:[a-z0-9]{8})?|btmh:1220[a-z0-9]{64})(?:$|&)/i;
function isMagnetURI(url) {
  (0, _assertString.default)(url);
  if (url.indexOf('magnet:?') !== 0) {
    return false;
  }
  return magnetURIComponent.test(url);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/rtrim.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rtrim;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function rtrim(str, chars) {
  (0, _assertString.default)(str);
  if (chars) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
    var pattern = new RegExp("[".concat(chars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "]+$"), 'g');
    return str.replace(pattern, '');
  }
  // Use a faster and more safe than regex trim method https://blog.stevenlevithan.com/archives/faster-trim-javascript
  var strIndex = str.length - 1;
  while (/\s/.test(str.charAt(strIndex))) {
    strIndex -= 1;
  }
  return str.slice(0, strIndex + 1);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/ltrim.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ltrim;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function ltrim(str, chars) {
  (0, _assertString.default)(str);
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
  var pattern = chars ? new RegExp("^[".concat(chars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "]+"), 'g') : /^\s+/g;
  return str.replace(pattern, '');
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/trim.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = trim;
var _rtrim = _interopRequireDefault(require("./rtrim"));
var _ltrim = _interopRequireDefault(require("./ltrim"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function trim(str, chars) {
  return (0, _rtrim.default)((0, _ltrim.default)(str, chars), chars);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./rtrim":"../../node_modules/validator/lib/rtrim.js","./ltrim":"../../node_modules/validator/lib/ltrim.js"}],"../../node_modules/validator/lib/isMailtoURI.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isMailtoURI;
var _trim = _interopRequireDefault(require("./trim"));
var _isEmail = _interopRequireDefault(require("./isEmail"));
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function _createForOfIteratorHelper(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
      t && (r = t);
      var _n = 0,
        F = function F() {};
      return {
        s: F,
        n: function n() {
          return _n >= r.length ? {
            done: !0
          } : {
            done: !1,
            value: r[_n++]
          };
        },
        e: function e(r) {
          throw r;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o,
    a = !0,
    u = !1;
  return {
    s: function s() {
      t = t.call(r);
    },
    n: function n() {
      var r = t.next();
      return a = r.done, r;
    },
    e: function e(r) {
      u = !0, o = r;
    },
    f: function f() {
      try {
        a || null == t.return || t.return();
      } finally {
        if (u) throw o;
      }
    }
  };
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function parseMailtoQueryString(queryString) {
  var allowedParams = new Set(['subject', 'body', 'cc', 'bcc']),
    query = {
      cc: '',
      bcc: ''
    };
  var isParseFailed = false;
  var queryParams = queryString.split('&');
  if (queryParams.length > 4) {
    return false;
  }
  var _iterator = _createForOfIteratorHelper(queryParams),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var q = _step.value;
      var _q$split = q.split('='),
        _q$split2 = _slicedToArray(_q$split, 2),
        key = _q$split2[0],
        value = _q$split2[1];

      // checked for invalid and duplicated query params
      if (key && !allowedParams.has(key)) {
        isParseFailed = true;
        break;
      }
      if (value && (key === 'cc' || key === 'bcc')) {
        query[key] = value;
      }
      if (key) {
        allowedParams.delete(key);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return isParseFailed ? false : query;
}
function isMailtoURI(url, options) {
  (0, _assertString.default)(url);
  if (url.indexOf('mailto:') !== 0) {
    return false;
  }
  var _url$replace$split = url.replace('mailto:', '').split('?'),
    _url$replace$split2 = _slicedToArray(_url$replace$split, 2),
    to = _url$replace$split2[0],
    _url$replace$split2$ = _url$replace$split2[1],
    queryString = _url$replace$split2$ === void 0 ? '' : _url$replace$split2$;
  if (!to && !queryString) {
    return true;
  }
  var query = parseMailtoQueryString(queryString);
  if (!query) {
    return false;
  }
  return "".concat(to, ",").concat(query.cc, ",").concat(query.bcc).split(',').every(function (email) {
    email = (0, _trim.default)(email, ' ');
    if (email) {
      return (0, _isEmail.default)(email, options);
    }
    return true;
  });
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./trim":"../../node_modules/validator/lib/trim.js","./isEmail":"../../node_modules/validator/lib/isEmail.js","./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isMimeType.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isMimeType;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
/*
  Checks if the provided string matches to a correct Media type format (MIME type)

  This function only checks is the string format follows the
  established rules by the according RFC specifications.
  This function supports 'charset' in textual media types
  (https://tools.ietf.org/html/rfc6657).

  This function does not check against all the media types listed
  by the IANA (https://www.iana.org/assignments/media-types/media-types.xhtml)
  because of lightness purposes : it would require to include
  all these MIME types in this library, which would weigh it
  significantly. This kind of effort maybe is not worth for the use that
  this function has in this entire library.

  More information in the RFC specifications :
  - https://tools.ietf.org/html/rfc2045
  - https://tools.ietf.org/html/rfc2046
  - https://tools.ietf.org/html/rfc7231#section-3.1.1.1
  - https://tools.ietf.org/html/rfc7231#section-3.1.1.5
*/

// Match simple MIME types
// NB :
//   Subtype length must not exceed 100 characters.
//   This rule does not comply to the RFC specs (what is the max length ?).
var mimeTypeSimple = /^(application|audio|font|image|message|model|multipart|text|video)\/[a-zA-Z0-9\.\-\+_]{1,100}$/i; // eslint-disable-line max-len

// Handle "charset" in "text/*"
var mimeTypeText = /^text\/[a-zA-Z0-9\.\-\+]{1,100};\s?charset=("[a-zA-Z0-9\.\-\+\s]{0,70}"|[a-zA-Z0-9\.\-\+]{0,70})(\s?\([a-zA-Z0-9\.\-\+\s]{1,20}\))?$/i; // eslint-disable-line max-len

// Handle "boundary" in "multipart/*"
var mimeTypeMultipart = /^multipart\/[a-zA-Z0-9\.\-\+]{1,100}(;\s?(boundary|charset)=("[a-zA-Z0-9\.\-\+\s]{0,70}"|[a-zA-Z0-9\.\-\+]{0,70})(\s?\([a-zA-Z0-9\.\-\+\s]{1,20}\))?){0,2}$/i; // eslint-disable-line max-len

function isMimeType(str) {
  (0, _assertString.default)(str);
  return mimeTypeSimple.test(str) || mimeTypeText.test(str) || mimeTypeMultipart.test(str);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isLatLong.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isLatLong;
var _assertString = _interopRequireDefault(require("./util/assertString"));
var _merge = _interopRequireDefault(require("./util/merge"));
var _includesString = _interopRequireDefault(require("./util/includesString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
var lat = /^\(?[+-]?(90(\.0+)?|[1-8]?\d(\.\d+)?)$/;
var long = /^\s?[+-]?(180(\.0+)?|1[0-7]\d(\.\d+)?|\d{1,2}(\.\d+)?)\)?$/;
var latDMS = /^(([1-8]?\d)\D+([1-5]?\d|60)\D+([1-5]?\d|60)(\.\d+)?|90\D+0\D+0)\D+[NSns]?$/i;
var longDMS = /^\s*([1-7]?\d{1,2}\D+([1-5]?\d|60)\D+([1-5]?\d|60)(\.\d+)?|180\D+0\D+0)\D+[EWew]?$/i;
var defaultLatLongOptions = {
  checkDMS: false
};
function isLatLong(str, options) {
  (0, _assertString.default)(str);
  options = (0, _merge.default)(options, defaultLatLongOptions);
  if (!(0, _includesString.default)(str, ',')) return false;
  var pair = str.split(',');
  if (pair[0].startsWith('(') && !pair[1].endsWith(')') || pair[1].endsWith(')') && !pair[0].startsWith('(')) return false;
  if (options.checkDMS) {
    return latDMS.test(pair[0]) && longDMS.test(pair[1]);
  }
  return lat.test(pair[0]) && long.test(pair[1]);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js","./util/merge":"../../node_modules/validator/lib/util/merge.js","./util/includesString":"../../node_modules/validator/lib/util/includesString.js"}],"../../node_modules/validator/lib/isPostalCode.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isPostalCode;
exports.locales = void 0;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
// common patterns
var threeDigit = /^\d{3}$/;
var fourDigit = /^\d{4}$/;
var fiveDigit = /^\d{5}$/;
var sixDigit = /^\d{6}$/;
var patterns = {
  AD: /^AD\d{3}$/,
  AT: fourDigit,
  AU: fourDigit,
  AZ: /^AZ\d{4}$/,
  BA: /^([7-8]\d{4}$)/,
  BD: /^([1-8][0-9]{3}|9[0-4][0-9]{2})$/,
  BE: fourDigit,
  BG: fourDigit,
  BR: /^\d{5}-?\d{3}$/,
  BY: /^2[1-4]\d{4}$/,
  CA: /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][\s\-]?\d[ABCEGHJ-NPRSTV-Z]\d$/i,
  CH: fourDigit,
  CN: /^(0[1-7]|1[012356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[1-5]|8[1345]|9[09])\d{4}$/,
  CO: /^(05|08|11|13|15|17|18|19|20|23|25|27|41|44|47|50|52|54|63|66|68|70|73|76|81|85|86|88|91|94|95|97|99)(\d{4})$/,
  CZ: /^\d{3}\s?\d{2}$/,
  DE: fiveDigit,
  DK: fourDigit,
  DO: fiveDigit,
  DZ: fiveDigit,
  EE: fiveDigit,
  ES: /^(5[0-2]{1}|[0-4]{1}\d{1})\d{3}$/,
  FI: fiveDigit,
  FR: /^(?:(?:0[1-9]|[1-8]\d|9[0-5])\d{3}|97[1-46]\d{2})$/,
  GB: /^(gir\s?0aa|[a-z]{1,2}\d[\da-z]?\s?(\d[a-z]{2})?)$/i,
  GR: /^\d{3}\s?\d{2}$/,
  HR: /^([1-5]\d{4}$)/,
  HT: /^HT\d{4}$/,
  HU: fourDigit,
  ID: fiveDigit,
  IE: /^(?!.*(?:o))[A-Za-z]\d[\dw]\s\w{4}$/i,
  IL: /^(\d{5}|\d{7})$/,
  IN: /^((?!10|29|35|54|55|65|66|86|87|88|89)[1-9][0-9]{5})$/,
  IR: /^(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}$/,
  IS: threeDigit,
  IT: fiveDigit,
  JP: /^\d{3}\-\d{4}$/,
  KE: fiveDigit,
  KR: /^(\d{5}|\d{6})$/,
  LI: /^(948[5-9]|949[0-7])$/,
  LT: /^LT\-\d{5}$/,
  LU: fourDigit,
  LV: /^LV\-\d{4}$/,
  LK: fiveDigit,
  MC: /^980\d{2}$/,
  MG: threeDigit,
  MX: fiveDigit,
  MT: /^[A-Za-z]{3}\s{0,1}\d{4}$/,
  MY: fiveDigit,
  NL: /^[1-9]\d{3}\s?(?!sa|sd|ss)[a-z]{2}$/i,
  NO: fourDigit,
  NP: /^(10|21|22|32|33|34|44|45|56|57)\d{3}$|^(977)$/i,
  NZ: fourDigit,
  // https://www.pakpost.gov.pk/postcodes.php
  PK: fiveDigit,
  PL: /^\d{2}\-\d{3}$/,
  PR: /^00[679]\d{2}([ -]\d{4})?$/,
  PT: /^\d{4}\-\d{3}?$/,
  RO: sixDigit,
  RU: sixDigit,
  SA: fiveDigit,
  SE: /^[1-9]\d{2}\s?\d{2}$/,
  SG: sixDigit,
  SI: fourDigit,
  SK: /^\d{3}\s?\d{2}$/,
  TH: fiveDigit,
  TN: fourDigit,
  TW: /^\d{3}(\d{2,3})?$/,
  UA: fiveDigit,
  US: /^\d{5}(-\d{4})?$/,
  ZA: fourDigit,
  ZM: fiveDigit
};
var locales = exports.locales = Object.keys(patterns);
function isPostalCode(str, locale) {
  (0, _assertString.default)(str);
  if (locale in patterns) {
    return patterns[locale].test(str);
  } else if (locale === 'any') {
    for (var key in patterns) {
      // https://github.com/gotwarlost/istanbul/blob/master/ignoring-code-for-coverage.md#ignoring-code-for-coverage-purposes
      // istanbul ignore else
      if (patterns.hasOwnProperty(key)) {
        var pattern = patterns[key];
        if (pattern.test(str)) {
          return true;
        }
      }
    }
    return false;
  }
  throw new Error("Invalid locale '".concat(locale, "'"));
}
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/escape.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = escape;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function escape(str) {
  (0, _assertString.default)(str);
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\//g, '&#x2F;').replace(/\\/g, '&#x5C;').replace(/`/g, '&#96;');
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/unescape.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = unescape;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function unescape(str) {
  (0, _assertString.default)(str);
  return str.replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#x2F;/g, '/').replace(/&#x5C;/g, '\\').replace(/&#96;/g, '`').replace(/&amp;/g, '&');
  // &amp; replacement has to be the last one to prevent
  // bugs with intermediate strings containing escape sequences
  // See: https://github.com/validatorjs/validator.js/issues/1827
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/blacklist.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = blacklist;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function blacklist(str, chars) {
  (0, _assertString.default)(str);
  return str.replace(new RegExp("[".concat(chars, "]+"), 'g'), '');
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/stripLow.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = stripLow;
var _assertString = _interopRequireDefault(require("./util/assertString"));
var _blacklist = _interopRequireDefault(require("./blacklist"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function stripLow(str, keep_new_lines) {
  (0, _assertString.default)(str);
  var chars = keep_new_lines ? '\\x00-\\x09\\x0B\\x0C\\x0E-\\x1F\\x7F' : '\\x00-\\x1F\\x7F';
  return (0, _blacklist.default)(str, chars);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js","./blacklist":"../../node_modules/validator/lib/blacklist.js"}],"../../node_modules/validator/lib/whitelist.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = whitelist;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function whitelist(str, chars) {
  (0, _assertString.default)(str);
  return str.replace(new RegExp("[^".concat(chars, "]+"), 'g'), '');
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isWhitelisted.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isWhitelisted;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function isWhitelisted(str, chars) {
  (0, _assertString.default)(str);
  for (var i = str.length - 1; i >= 0; i--) {
    if (chars.indexOf(str[i]) === -1) {
      return false;
    }
  }
  return true;
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/normalizeEmail.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = normalizeEmail;
var _merge = _interopRequireDefault(require("./util/merge"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
var default_normalize_email_options = {
  // The following options apply to all email addresses
  // Lowercases the local part of the email address.
  // Please note this may violate RFC 5321 as per http://stackoverflow.com/a/9808332/192024).
  // The domain is always lowercased, as per RFC 1035
  all_lowercase: true,
  // The following conversions are specific to GMail
  // Lowercases the local part of the GMail address (known to be case-insensitive)
  gmail_lowercase: true,
  // Removes dots from the local part of the email address, as that's ignored by GMail
  gmail_remove_dots: true,
  // Removes the subaddress (e.g. "+foo") from the email address
  gmail_remove_subaddress: true,
  // Conversts the googlemail.com domain to gmail.com
  gmail_convert_googlemaildotcom: true,
  // The following conversions are specific to Outlook.com / Windows Live / Hotmail
  // Lowercases the local part of the Outlook.com address (known to be case-insensitive)
  outlookdotcom_lowercase: true,
  // Removes the subaddress (e.g. "+foo") from the email address
  outlookdotcom_remove_subaddress: true,
  // The following conversions are specific to Yahoo
  // Lowercases the local part of the Yahoo address (known to be case-insensitive)
  yahoo_lowercase: true,
  // Removes the subaddress (e.g. "-foo") from the email address
  yahoo_remove_subaddress: true,
  // The following conversions are specific to Yandex
  // Lowercases the local part of the Yandex address (known to be case-insensitive)
  yandex_lowercase: true,
  // all yandex domains are equal, this explicitly sets the domain to 'yandex.ru'
  yandex_convert_yandexru: true,
  // The following conversions are specific to iCloud
  // Lowercases the local part of the iCloud address (known to be case-insensitive)
  icloud_lowercase: true,
  // Removes the subaddress (e.g. "+foo") from the email address
  icloud_remove_subaddress: true
};

// List of domains used by iCloud
var icloud_domains = ['icloud.com', 'me.com'];

// List of domains used by Outlook.com and its predecessors
// This list is likely incomplete.
// Partial reference:
// https://blogs.office.com/2013/04/17/outlook-com-gets-two-step-verification-sign-in-by-alias-and-new-international-domains/
var outlookdotcom_domains = ['hotmail.at', 'hotmail.be', 'hotmail.ca', 'hotmail.cl', 'hotmail.co.il', 'hotmail.co.nz', 'hotmail.co.th', 'hotmail.co.uk', 'hotmail.com', 'hotmail.com.ar', 'hotmail.com.au', 'hotmail.com.br', 'hotmail.com.gr', 'hotmail.com.mx', 'hotmail.com.pe', 'hotmail.com.tr', 'hotmail.com.vn', 'hotmail.cz', 'hotmail.de', 'hotmail.dk', 'hotmail.es', 'hotmail.fr', 'hotmail.hu', 'hotmail.id', 'hotmail.ie', 'hotmail.in', 'hotmail.it', 'hotmail.jp', 'hotmail.kr', 'hotmail.lv', 'hotmail.my', 'hotmail.ph', 'hotmail.pt', 'hotmail.sa', 'hotmail.sg', 'hotmail.sk', 'live.be', 'live.co.uk', 'live.com', 'live.com.ar', 'live.com.mx', 'live.de', 'live.es', 'live.eu', 'live.fr', 'live.it', 'live.nl', 'msn.com', 'outlook.at', 'outlook.be', 'outlook.cl', 'outlook.co.il', 'outlook.co.nz', 'outlook.co.th', 'outlook.com', 'outlook.com.ar', 'outlook.com.au', 'outlook.com.br', 'outlook.com.gr', 'outlook.com.pe', 'outlook.com.tr', 'outlook.com.vn', 'outlook.cz', 'outlook.de', 'outlook.dk', 'outlook.es', 'outlook.fr', 'outlook.hu', 'outlook.id', 'outlook.ie', 'outlook.in', 'outlook.it', 'outlook.jp', 'outlook.kr', 'outlook.lv', 'outlook.my', 'outlook.ph', 'outlook.pt', 'outlook.sa', 'outlook.sg', 'outlook.sk', 'passport.com'];

// List of domains used by Yahoo Mail
// This list is likely incomplete
var yahoo_domains = ['rocketmail.com', 'yahoo.ca', 'yahoo.co.uk', 'yahoo.com', 'yahoo.de', 'yahoo.fr', 'yahoo.in', 'yahoo.it', 'ymail.com'];

// List of domains used by yandex.ru
var yandex_domains = ['yandex.ru', 'yandex.ua', 'yandex.kz', 'yandex.com', 'yandex.by', 'ya.ru'];

// replace single dots, but not multiple consecutive dots
function dotsReplacer(match) {
  if (match.length > 1) {
    return match;
  }
  return '';
}
function normalizeEmail(email, options) {
  options = (0, _merge.default)(options, default_normalize_email_options);
  var raw_parts = email.split('@');
  var domain = raw_parts.pop();
  var user = raw_parts.join('@');
  var parts = [user, domain];

  // The domain is always lowercased, as it's case-insensitive per RFC 1035
  parts[1] = parts[1].toLowerCase();
  if (parts[1] === 'gmail.com' || parts[1] === 'googlemail.com') {
    // Address is GMail
    if (options.gmail_remove_subaddress) {
      parts[0] = parts[0].split('+')[0];
    }
    if (options.gmail_remove_dots) {
      // this does not replace consecutive dots like example..email@gmail.com
      parts[0] = parts[0].replace(/\.+/g, dotsReplacer);
    }
    if (!parts[0].length) {
      return false;
    }
    if (options.all_lowercase || options.gmail_lowercase) {
      parts[0] = parts[0].toLowerCase();
    }
    parts[1] = options.gmail_convert_googlemaildotcom ? 'gmail.com' : parts[1];
  } else if (icloud_domains.indexOf(parts[1]) >= 0) {
    // Address is iCloud
    if (options.icloud_remove_subaddress) {
      parts[0] = parts[0].split('+')[0];
    }
    if (!parts[0].length) {
      return false;
    }
    if (options.all_lowercase || options.icloud_lowercase) {
      parts[0] = parts[0].toLowerCase();
    }
  } else if (outlookdotcom_domains.indexOf(parts[1]) >= 0) {
    // Address is Outlook.com
    if (options.outlookdotcom_remove_subaddress) {
      parts[0] = parts[0].split('+')[0];
    }
    if (!parts[0].length) {
      return false;
    }
    if (options.all_lowercase || options.outlookdotcom_lowercase) {
      parts[0] = parts[0].toLowerCase();
    }
  } else if (yahoo_domains.indexOf(parts[1]) >= 0) {
    // Address is Yahoo
    if (options.yahoo_remove_subaddress) {
      var components = parts[0].split('-');
      parts[0] = components.length > 1 ? components.slice(0, -1).join('-') : components[0];
    }
    if (!parts[0].length) {
      return false;
    }
    if (options.all_lowercase || options.yahoo_lowercase) {
      parts[0] = parts[0].toLowerCase();
    }
  } else if (yandex_domains.indexOf(parts[1]) >= 0) {
    if (options.all_lowercase || options.yandex_lowercase) {
      parts[0] = parts[0].toLowerCase();
    }
    parts[1] = options.yandex_convert_yandexru ? 'yandex.ru' : parts[1];
  } else if (options.all_lowercase) {
    // Any other address
    parts[0] = parts[0].toLowerCase();
  }
  return parts.join('@');
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/merge":"../../node_modules/validator/lib/util/merge.js"}],"../../node_modules/validator/lib/isSlug.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSlug;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
var charsetRegex = /^[a-z0-9](?!.*[-_]{2,})(?:[a-z0-9_-]*[a-z0-9])?$/;
function isSlug(str) {
  (0, _assertString.default)(str);
  return charsetRegex.test(str);
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isLicensePlate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isLicensePlate;
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
var validators = {
  'cs-CZ': function csCZ(str) {
    return /^(([ABCDEFHIJKLMNPRSTUVXYZ]|[0-9])-?){5,8}$/.test(str);
  },
  'de-DE': function deDE(str) {
    return /^((A|AA|AB|AC|AE|AH|AK|AM|AN|AÖ|AP|AS|AT|AU|AW|AZ|B|BA|BB|BC|BE|BF|BH|BI|BK|BL|BM|BN|BO|BÖ|BS|BT|BZ|C|CA|CB|CE|CO|CR|CW|D|DA|DD|DE|DH|DI|DL|DM|DN|DO|DU|DW|DZ|E|EA|EB|ED|EE|EF|EG|EH|EI|EL|EM|EN|ER|ES|EU|EW|F|FB|FD|FF|FG|FI|FL|FN|FO|FR|FS|FT|FÜ|FW|FZ|G|GA|GC|GD|GE|GF|GG|GI|GK|GL|GM|GN|GÖ|GP|GR|GS|GT|GÜ|GV|GW|GZ|H|HA|HB|HC|HD|HE|HF|HG|HH|HI|HK|HL|HM|HN|HO|HP|HR|HS|HU|HV|HX|HY|HZ|IK|IL|IN|IZ|J|JE|JL|K|KA|KB|KC|KE|KF|KG|KH|KI|KK|KL|KM|KN|KO|KR|KS|KT|KU|KW|KY|L|LA|LB|LC|LD|LF|LG|LH|LI|LL|LM|LN|LÖ|LP|LR|LU|M|MA|MB|MC|MD|ME|MG|MH|MI|MK|ML|MM|MN|MO|MQ|MR|MS|MÜ|MW|MY|MZ|N|NB|ND|NE|NF|NH|NI|NK|NM|NÖ|NP|NR|NT|NU|NW|NY|NZ|OA|OB|OC|OD|OE|OF|OG|OH|OK|OL|OP|OS|OZ|P|PA|PB|PE|PF|PI|PL|PM|PN|PR|PS|PW|PZ|R|RA|RC|RD|RE|RG|RH|RI|RL|RM|RN|RO|RP|RS|RT|RU|RV|RW|RZ|S|SB|SC|SE|SG|SI|SK|SL|SM|SN|SO|SP|SR|ST|SU|SW|SY|SZ|TE|TF|TG|TO|TP|TR|TS|TT|TÜ|ÜB|UE|UH|UL|UM|UN|V|VB|VG|VK|VR|VS|W|WA|WB|WE|WF|WI|WK|WL|WM|WN|WO|WR|WS|WT|WÜ|WW|WZ|Z|ZE|ZI|ZP|ZR|ZW|ZZ)[- ]?[A-Z]{1,2}[- ]?\d{1,4}|(ABG|ABI|AIB|AIC|ALF|ALZ|ANA|ANG|ANK|APD|ARN|ART|ASL|ASZ|AUR|AZE|BAD|BAR|BBG|BCH|BED|BER|BGD|BGL|BID|BIN|BIR|BIT|BIW|BKS|BLB|BLK|BNA|BOG|BOH|BOR|BOT|BRA|BRB|BRG|BRK|BRL|BRV|BSB|BSK|BTF|BÜD|BUL|BÜR|BÜS|BÜZ|CAS|CHA|CLP|CLZ|COC|COE|CUX|DAH|DAN|DAU|DBR|DEG|DEL|DGF|DIL|DIN|DIZ|DKB|DLG|DON|DUD|DÜW|EBE|EBN|EBS|ECK|EIC|EIL|EIN|EIS|EMD|EMS|ERB|ERH|ERK|ERZ|ESB|ESW|FDB|FDS|FEU|FFB|FKB|FLÖ|FOR|FRG|FRI|FRW|FTL|FÜS|GAN|GAP|GDB|GEL|GEO|GER|GHA|GHC|GLA|GMN|GNT|GOA|GOH|GRA|GRH|GRI|GRM|GRZ|GTH|GUB|GUN|GVM|HAB|HAL|HAM|HAS|HBN|HBS|HCH|HDH|HDL|HEB|HEF|HEI|HER|HET|HGN|HGW|HHM|HIG|HIP|HMÜ|HOG|HOH|HOL|HOM|HOR|HÖS|HOT|HRO|HSK|HST|HVL|HWI|IGB|ILL|JÜL|KEH|KEL|KEM|KIB|KLE|KLZ|KÖN|KÖT|KÖZ|KRU|KÜN|KUS|KYF|LAN|LAU|LBS|LBZ|LDK|LDS|LEO|LER|LEV|LIB|LIF|LIP|LÖB|LOS|LRO|LSZ|LÜN|LUP|LWL|MAB|MAI|MAK|MAL|MED|MEG|MEI|MEK|MEL|MER|MET|MGH|MGN|MHL|MIL|MKK|MOD|MOL|MON|MOS|MSE|MSH|MSP|MST|MTK|MTL|MÜB|MÜR|MYK|MZG|NAB|NAI|NAU|NDH|NEA|NEB|NEC|NEN|NES|NEW|NMB|NMS|NOH|NOL|NOM|NOR|NVP|NWM|OAL|OBB|OBG|OCH|OHA|ÖHR|OHV|OHZ|OPR|OSL|OVI|OVL|OVP|PAF|PAN|PAR|PCH|PEG|PIR|PLÖ|PRÜ|QFT|QLB|RDG|REG|REH|REI|RID|RIE|ROD|ROF|ROK|ROL|ROS|ROT|ROW|RSL|RÜD|RÜG|SAB|SAD|SAN|SAW|SBG|SBK|SCZ|SDH|SDL|SDT|SEB|SEE|SEF|SEL|SFB|SFT|SGH|SHA|SHG|SHK|SHL|SIG|SIM|SLE|SLF|SLK|SLN|SLS|SLÜ|SLZ|SMÜ|SOB|SOG|SOK|SÖM|SON|SPB|SPN|SRB|SRO|STA|STB|STD|STE|STL|SUL|SÜW|SWA|SZB|TBB|TDO|TET|TIR|TÖL|TUT|UEM|UER|UFF|USI|VAI|VEC|VER|VIB|VIE|VIT|VOH|WAF|WAK|WAN|WAR|WAT|WBS|WDA|WEL|WEN|WER|WES|WHV|WIL|WIS|WIT|WIZ|WLG|WMS|WND|WOB|WOH|WOL|WOR|WOS|WRN|WSF|WST|WSW|WTL|WTM|WUG|WÜM|WUN|WUR|WZL|ZEL|ZIG)[- ]?(([A-Z][- ]?\d{1,4})|([A-Z]{2}[- ]?\d{1,3})))[- ]?(E|H)?$/.test(str);
  },
  'de-LI': function deLI(str) {
    return /^FL[- ]?\d{1,5}[UZ]?$/.test(str);
  },
  'en-IN': function enIN(str) {
    return /^[A-Z]{2}[ -]?[0-9]{1,2}(?:[ -]?[A-Z])(?:[ -]?[A-Z]*)?[ -]?[0-9]{4}$/.test(str);
  },
  'en-SG': function enSG(str) {
    return /^[A-Z]{3}[ -]?[\d]{4}[ -]?[A-Z]{1}$/.test(str);
  },
  'es-AR': function esAR(str) {
    return /^(([A-Z]{2} ?[0-9]{3} ?[A-Z]{2})|([A-Z]{3} ?[0-9]{3}))$/.test(str);
  },
  'fi-FI': function fiFI(str) {
    return /^(?=.{4,7})(([A-Z]{1,3}|[0-9]{1,3})[\s-]?([A-Z]{1,3}|[0-9]{1,5}))$/.test(str);
  },
  'hu-HU': function huHU(str) {
    return /^((((?!AAA)(([A-NPRSTVZWXY]{1})([A-PR-Z]{1})([A-HJ-NPR-Z]))|(A[ABC]I)|A[ABC]O|A[A-W]Q|BPI|BPO|UCO|UDO|XAO)-(?!000)\d{3})|(M\d{6})|((CK|DT|CD|HC|H[ABEFIKLMNPRSTVX]|MA|OT|R[A-Z]) \d{2}-\d{2})|(CD \d{3}-\d{3})|(C-(C|X) \d{4})|(X-(A|B|C) \d{4})|(([EPVZ]-\d{5}))|(S A[A-Z]{2} \d{2})|(SP \d{2}-\d{2}))$/.test(str);
  },
  'pt-BR': function ptBR(str) {
    return /^[A-Z]{3}[ -]?[0-9][A-Z][0-9]{2}|[A-Z]{3}[ -]?[0-9]{4}$/.test(str);
  },
  'pt-PT': function ptPT(str) {
    return /^(([A-Z]{2}[ -·]?[0-9]{2}[ -·]?[0-9]{2})|([0-9]{2}[ -·]?[A-Z]{2}[ -·]?[0-9]{2})|([0-9]{2}[ -·]?[0-9]{2}[ -·]?[A-Z]{2})|([A-Z]{2}[ -·]?[0-9]{2}[ -·]?[A-Z]{2}))$/.test(str);
  },
  'sq-AL': function sqAL(str) {
    return /^[A-Z]{2}[- ]?((\d{3}[- ]?(([A-Z]{2})|T))|(R[- ]?\d{3}))$/.test(str);
  },
  'sv-SE': function svSE(str) {
    return /^[A-HJ-PR-UW-Z]{3} ?[\d]{2}[A-HJ-PR-UW-Z1-9]$|(^[A-ZÅÄÖ ]{2,7}$)/.test(str.trim());
  },
  'en-PK': function enPK(str) {
    return /(^[A-Z]{2}((\s|-){0,1})[0-9]{3,4}((\s|-)[0-9]{2}){0,1}$)|(^[A-Z]{3}((\s|-){0,1})[0-9]{3,4}((\s|-)[0-9]{2}){0,1}$)|(^[A-Z]{4}((\s|-){0,1})[0-9]{3,4}((\s|-)[0-9]{2}){0,1}$)|(^[A-Z]((\s|-){0,1})[0-9]{4}((\s|-)[0-9]{2}){0,1}$)/.test(str.trim());
  }
};
function isLicensePlate(str, locale) {
  (0, _assertString.default)(str);
  if (locale in validators) {
    return validators[locale](str);
  } else if (locale === 'any') {
    for (var key in validators) {
      /* eslint guard-for-in: 0 */
      var validator = validators[key];
      if (validator(str)) {
        return true;
      }
    }
    return false;
  }
  throw new Error("Invalid locale '".concat(locale, "'"));
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isStrongPassword.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isStrongPassword;
var _merge = _interopRequireDefault(require("./util/merge"));
var _assertString = _interopRequireDefault(require("./util/assertString"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
var upperCaseRegex = /^[A-Z]$/;
var lowerCaseRegex = /^[a-z]$/;
var numberRegex = /^[0-9]$/;
var symbolRegex = /^[-#!$@£%^&*()_+|~=`{}\[\]:";'<>?,.\/\\ ]$/;
var defaultOptions = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
  returnScore: false,
  pointsPerUnique: 1,
  pointsPerRepeat: 0.5,
  pointsForContainingLower: 10,
  pointsForContainingUpper: 10,
  pointsForContainingNumber: 10,
  pointsForContainingSymbol: 10
};

/* Counts number of occurrences of each char in a string
 * could be moved to util/ ?
*/
function countChars(str) {
  var result = {};
  Array.from(str).forEach(function (char) {
    var curVal = result[char];
    if (curVal) {
      result[char] += 1;
    } else {
      result[char] = 1;
    }
  });
  return result;
}

/* Return information about a password */
function analyzePassword(password) {
  var charMap = countChars(password);
  var analysis = {
    length: password.length,
    uniqueChars: Object.keys(charMap).length,
    uppercaseCount: 0,
    lowercaseCount: 0,
    numberCount: 0,
    symbolCount: 0
  };
  Object.keys(charMap).forEach(function (char) {
    /* istanbul ignore else */
    if (upperCaseRegex.test(char)) {
      analysis.uppercaseCount += charMap[char];
    } else if (lowerCaseRegex.test(char)) {
      analysis.lowercaseCount += charMap[char];
    } else if (numberRegex.test(char)) {
      analysis.numberCount += charMap[char];
    } else if (symbolRegex.test(char)) {
      analysis.symbolCount += charMap[char];
    }
  });
  return analysis;
}
function scorePassword(analysis, scoringOptions) {
  var points = 0;
  points += analysis.uniqueChars * scoringOptions.pointsPerUnique;
  points += (analysis.length - analysis.uniqueChars) * scoringOptions.pointsPerRepeat;
  if (analysis.lowercaseCount > 0) {
    points += scoringOptions.pointsForContainingLower;
  }
  if (analysis.uppercaseCount > 0) {
    points += scoringOptions.pointsForContainingUpper;
  }
  if (analysis.numberCount > 0) {
    points += scoringOptions.pointsForContainingNumber;
  }
  if (analysis.symbolCount > 0) {
    points += scoringOptions.pointsForContainingSymbol;
  }
  return points;
}
function isStrongPassword(str) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  (0, _assertString.default)(str);
  var analysis = analyzePassword(str);
  options = (0, _merge.default)(options || {}, defaultOptions);
  if (options.returnScore) {
    return scorePassword(analysis, options);
  }
  return analysis.length >= options.minLength && analysis.lowercaseCount >= options.minLowercase && analysis.uppercaseCount >= options.minUppercase && analysis.numberCount >= options.minNumbers && analysis.symbolCount >= options.minSymbols;
}
module.exports = exports.default;
module.exports.default = exports.default;
},{"./util/merge":"../../node_modules/validator/lib/util/merge.js","./util/assertString":"../../node_modules/validator/lib/util/assertString.js"}],"../../node_modules/validator/lib/isVAT.js":[function(require,module,exports) {
"use strict";

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isVAT;
exports.vatMatchers = void 0;
var _assertString = _interopRequireDefault(require("./util/assertString"));
var algorithms = _interopRequireWildcard(require("./util/algorithms"));
function _interopRequireWildcard(e, t) {
  if ("function" == typeof WeakMap) var r = new WeakMap(),
    n = new WeakMap();
  return (_interopRequireWildcard = function _interopRequireWildcard(e, t) {
    if (!t && e && e.__esModule) return e;
    var o,
      i,
      f = {
        __proto__: null,
        default: e
      };
    if (null === e || "object" != _typeof(e) && "function" != typeof e) return f;
    if (o = t ? n : r) {
      if (o.has(e)) return o.get(e);
      o.set(e, f);
    }
    for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]);
    return f;
  })(e, t);
}
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
var AU = function AU(str) {
  var match = str.match(/^(AU)?(\d{11})$/);
  if (!match) {
    return false;
  }
  // @see {@link https://abr.business.gov.au/Help/AbnFormat}
  var weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
  str = str.replace(/^AU/, '');
  var ABN = (parseInt(str.slice(0, 1), 10) - 1).toString() + str.slice(1);
  var total = 0;
  for (var i = 0; i < 11; i++) {
    total += weights[i] * ABN.charAt(i);
  }
  return total !== 0 && total % 89 === 0;
};
var CH = function CH(str) {
  // @see {@link https://www.ech.ch/de/ech/ech-0097/5.2.0}
  var hasValidCheckNumber = function hasValidCheckNumber(digits) {
    var lastDigit = digits.pop(); // used as check number
    var weights = [5, 4, 3, 2, 7, 6, 5, 4];
    var calculatedCheckNumber = (11 - digits.reduce(function (acc, el, idx) {
      return acc + el * weights[idx];
    }, 0) % 11) % 11;
    return lastDigit === calculatedCheckNumber;
  };

  // @see {@link https://www.estv.admin.ch/estv/de/home/mehrwertsteuer/uid/mwst-uid-nummer.html}
  return /^(CHE[- ]?)?(\d{9}|(\d{3}\.\d{3}\.\d{3})|(\d{3} \d{3} \d{3})) ?(TVA|MWST|IVA)?$/.test(str) && hasValidCheckNumber(str.match(/\d/g).map(function (el) {
    return +el;
  }));
};
var PT = function PT(str) {
  var match = str.match(/^(PT)?(\d{9})$/);
  if (!match) {
    return false;
  }
  var tin = match[2];
  var checksum = 11 - algorithms.reverseMultiplyAndSum(tin.split('').slice(0, 8).map(function (a) {
    return parseInt(a, 10);
  }), 9) % 11;
  if (checksum > 9) {
    return parseInt(tin[8], 10) === 0;
  }
  return checksum === parseInt(tin[8], 10);
};
var vatMatchers = exports.vatMatchers = {
  /**
   * European Union VAT identification numbers
   */
  AT: function AT(str) {
    return /^(AT)?U\d{8}$/.test(str);
  },
  BE: function BE(str) {
    return /^(BE)?\d{10}$/.test(str);
  },
  BG: function BG(str) {
    return /^(BG)?\d{9,10}$/.test(str);
  },
  HR: function HR(str) {
    return /^(HR)?\d{11}$/.test(str);
  },
  CY: function CY(str) {
    return /^(CY)?\w{9}$/.test(str);
  },
  CZ: function CZ(str) {
    return /^(CZ)?\d{8,10}$/.test(str);
  },
  DK: function DK(str) {
    return /^(DK)?\d{8}$/.test(str);
  },
  EE: function EE(str) {
    return /^(EE)?\d{9}$/.test(str);
  },
  FI: function FI(str) {
    return /^(FI)?\d{8}$/.test(str);
  },
  FR: function FR(str) {
    return /^(FR)([A-Z0-9]{2}\d{9})$/.test(str);
  },
  DE: function DE(str) {
    return /^(DE)?\d{9}$/.test(str);
  },
  EL: function EL(str) {
    return /^(EL)?\d{9}$/.test(str);
  },
  HU: function HU(str) {
    return /^(HU)?\d{8}$/.test(str);
  },
  IE: function IE(str) {
    return /^(IE)?\d{7}\w{1}(W)?$/.test(str);
  },
  IT: function IT(str) {
    return /^(IT)?\d{11}$/.test(str);
  },
  LV: function LV(str) {
    return /^(LV)?\d{11}$/.test(str);
  },
  LT: function LT(str) {
    return /^(LT)?\d{9,12}$/.test(str);
  },
  LU: function LU(str) {
    return /^(LU)?\d{8}$/.test(str);
  },
  MT: function MT(str) {
    return /^(MT)?\d{8}$/.test(str);
  },
  NL: function NL(str) {
    return /^(NL)?\d{9}B\d{2}$/.test(str);
  },
  PL: function PL(str) {
    return /^(PL)?(\d{10}|(\d{3}-\d{3}-\d{2}-\d{2})|(\d{3}-\d{2}-\d{2}-\d{3}))$/.test(str);
  },
  PT: PT,
  RO: function RO(str) {
    return /^(RO)?\d{2,10}$/.test(str);
  },
  SK: function SK(str) {
    return /^(SK)?\d{10}$/.test(str);
  },
  SI: function SI(str) {
    return /^(SI)?\d{8}$/.test(str);
  },
  ES: function ES(str) {
    return /^(ES)?\w\d{7}[A-Z]$/.test(str);
  },
  SE: function SE(str) {
    return /^(SE)?\d{12}$/.test(str);
  },
  /**
   * VAT numbers of non-EU countries
   */
  AL: function AL(str) {
    return /^(AL)?\w{9}[A-Z]$/.test(str);
  },
  MK: function MK(str) {
    return /^(MK)?\d{13}$/.test(str);
  },
  AU: AU,
  BY: function BY(str) {
    return /^(УНП )?\d{9}$/.test(str);
  },
  CA: function CA(str) {
    return /^(CA)?\d{9}$/.test(str);
  },
  IS: function IS(str) {
    return /^(IS)?\d{5,6}$/.test(str);
  },
  IN: function IN(str) {
    return /^(IN)?\d{15}$/.test(str);
  },
  ID: function ID(str) {
    return /^(ID)?(\d{15}|(\d{2}.\d{3}.\d{3}.\d{1}-\d{3}.\d{3}))$/.test(str);
  },
  IL: function IL(str) {
    return /^(IL)?\d{9}$/.test(str);
  },
  KZ: function KZ(str) {
    return /^(KZ)?\d{12}$/.test(str);
  },
  NZ: function NZ(str) {
    return /^(NZ)?\d{9}$/.test(str);
  },
  NG: function NG(str) {
    return /^(NG)?(\d{12}|(\d{8}-\d{4}))$/.test(str);
  },
  NO: function NO(str) {
    return /^(NO)?\d{9}MVA$/.test(str);
  },
  PH: function PH(str) {
    return /^(PH)?(\d{12}|\d{3} \d{3} \d{3} \d{3})$/.test(str);
  },
  RU: function RU(str) {
    return /^(RU)?(\d{10}|\d{12})$/.test(str);
  },
  SM: function SM(str) {
    return /^(SM)?\d{5}$/.test(str);
  },
  SA: function SA(str) {
    return /^(SA)?\d{15}$/.test(str);
  },
  RS: function RS(str) {
    return /^(RS)?\d{9}$/.test(str);
  },
  CH: CH,
  TR: function TR(str) {
    return /^(TR)?\d{10}$/.test(str);
  },
  UA: function UA(str) {
    return /^(UA)?\d{12}$/.test(str);
  },
  GB: function GB(str) {
    return /^GB((\d{3} \d{4} ([0-8][0-9]|9[0-6]))|(\d{9} \d{3})|(((GD[0-4])|(HA[5-9]))[0-9]{2}))$/.test(str);
  },
  UZ: function UZ(str) {
    return /^(UZ)?\d{9}$/.test(str);
  },
  /**
   * VAT numbers of Latin American countries
   */
  AR: function AR(str) {
    return /^(AR)?\d{11}$/.test(str);
  },
  BO: function BO(str) {
    return /^(BO)?\d{7}$/.test(str);
  },
  BR: function BR(str) {
    return /^(BR)?((\d{2}.\d{3}.\d{3}\/\d{4}-\d{2})|(\d{3}.\d{3}.\d{3}-\d{2}))$/.test(str);
  },
  CL: function CL(str) {
    return /^(CL)?\d{8}-\d{1}$/.test(str);
  },
  CO: function CO(str) {
    return /^(CO)?\d{10}$/.test(str);
  },
  CR: function CR(str) {
    return /^(CR)?\d{9,12}$/.test(str);
  },
  EC: function EC(str) {
    return /^(EC)?\d{13}$/.test(str);
  },
  SV: function SV(str) {
    return /^(SV)?\d{4}-\d{6}-\d{3}-\d{1}$/.test(str);
  },
  GT: function GT(str) {
    return /^(GT)?\d{7}-\d{1}$/.test(str);
  },
  HN: function HN(str) {
    return /^(HN)?$/.test(str);
  },
  MX: function MX(str) {
    return /^(MX)?\w{3,4}\d{6}\w{3}$/.test(str);
  },
  NI: function NI(str) {
    return /^(NI)?\d{3}-\d{6}-\d{4}\w{1}$/.test(str);
  },
  PA: function PA(str) {
    return /^(PA)?$/.test(str);
  },
  PY: function PY(str) {
    return /^(PY)?\d{6,8}-\d{1}$/.test(str);
  },
  PE: function PE(str) {
    return /^(PE)?\d{11}$/.test(str);
  },
  DO: function DO(str) {
    return /^(DO)?(\d{11}|(\d{3}-\d{7}-\d{1})|[1,4,5]{1}\d{8}|([1,4,5]{1})-\d{2}-\d{5}-\d{1})$/.test(str);
  },
  UY: function UY(str) {
    return /^(UY)?\d{12}$/.test(str);
  },
  VE: function VE(str) {
    return /^(VE)?[J,G,V,E]{1}-(\d{9}|(\d{8}-\d{1}))$/.test(str);
  }
};
function isVAT(str, countryCode) {
  (0, _assertString.default)(str);
  (0, _assertString.default)(countryCode);
  if (countryCode in vatMatchers) {
    return vatMatchers[countryCode](str);
  }
  throw new Error("Invalid country code: '".concat(countryCode, "'"));
}
},{"./util/assertString":"../../node_modules/validator/lib/util/assertString.js","./util/algorithms":"../../node_modules/validator/lib/util/algorithms.js"}],"../../node_modules/validator/index.js":[function(require,module,exports) {
"use strict";

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _toDate = _interopRequireDefault(require("./lib/toDate"));
var _toFloat = _interopRequireDefault(require("./lib/toFloat"));
var _toInt = _interopRequireDefault(require("./lib/toInt"));
var _toBoolean = _interopRequireDefault(require("./lib/toBoolean"));
var _equals = _interopRequireDefault(require("./lib/equals"));
var _contains = _interopRequireDefault(require("./lib/contains"));
var _matches = _interopRequireDefault(require("./lib/matches"));
var _isEmail = _interopRequireDefault(require("./lib/isEmail"));
var _isURL = _interopRequireDefault(require("./lib/isURL"));
var _isMACAddress = _interopRequireDefault(require("./lib/isMACAddress"));
var _isIP = _interopRequireDefault(require("./lib/isIP"));
var _isIPRange = _interopRequireDefault(require("./lib/isIPRange"));
var _isFQDN = _interopRequireDefault(require("./lib/isFQDN"));
var _isDate = _interopRequireDefault(require("./lib/isDate"));
var _isTime = _interopRequireDefault(require("./lib/isTime"));
var _isBoolean = _interopRequireDefault(require("./lib/isBoolean"));
var _isLocale = _interopRequireDefault(require("./lib/isLocale"));
var _isAbaRouting = _interopRequireDefault(require("./lib/isAbaRouting"));
var _isAlpha = _interopRequireWildcard(require("./lib/isAlpha"));
var _isAlphanumeric = _interopRequireWildcard(require("./lib/isAlphanumeric"));
var _isNumeric = _interopRequireDefault(require("./lib/isNumeric"));
var _isPassportNumber = _interopRequireWildcard(require("./lib/isPassportNumber"));
var _isPort = _interopRequireDefault(require("./lib/isPort"));
var _isLowercase = _interopRequireDefault(require("./lib/isLowercase"));
var _isUppercase = _interopRequireDefault(require("./lib/isUppercase"));
var _isIMEI = _interopRequireDefault(require("./lib/isIMEI"));
var _isAscii = _interopRequireDefault(require("./lib/isAscii"));
var _isFullWidth = _interopRequireDefault(require("./lib/isFullWidth"));
var _isHalfWidth = _interopRequireDefault(require("./lib/isHalfWidth"));
var _isVariableWidth = _interopRequireDefault(require("./lib/isVariableWidth"));
var _isMultibyte = _interopRequireDefault(require("./lib/isMultibyte"));
var _isSemVer = _interopRequireDefault(require("./lib/isSemVer"));
var _isSurrogatePair = _interopRequireDefault(require("./lib/isSurrogatePair"));
var _isInt = _interopRequireDefault(require("./lib/isInt"));
var _isFloat = _interopRequireWildcard(require("./lib/isFloat"));
var _isDecimal = _interopRequireDefault(require("./lib/isDecimal"));
var _isHexadecimal = _interopRequireDefault(require("./lib/isHexadecimal"));
var _isOctal = _interopRequireDefault(require("./lib/isOctal"));
var _isDivisibleBy = _interopRequireDefault(require("./lib/isDivisibleBy"));
var _isHexColor = _interopRequireDefault(require("./lib/isHexColor"));
var _isRgbColor = _interopRequireDefault(require("./lib/isRgbColor"));
var _isHSL = _interopRequireDefault(require("./lib/isHSL"));
var _isISRC = _interopRequireDefault(require("./lib/isISRC"));
var _isIBAN = _interopRequireWildcard(require("./lib/isIBAN"));
var _isBIC = _interopRequireDefault(require("./lib/isBIC"));
var _isMD = _interopRequireDefault(require("./lib/isMD5"));
var _isHash = _interopRequireDefault(require("./lib/isHash"));
var _isJWT = _interopRequireDefault(require("./lib/isJWT"));
var _isJSON = _interopRequireDefault(require("./lib/isJSON"));
var _isEmpty = _interopRequireDefault(require("./lib/isEmpty"));
var _isLength = _interopRequireDefault(require("./lib/isLength"));
var _isByteLength = _interopRequireDefault(require("./lib/isByteLength"));
var _isULID = _interopRequireDefault(require("./lib/isULID"));
var _isUUID = _interopRequireDefault(require("./lib/isUUID"));
var _isMongoId = _interopRequireDefault(require("./lib/isMongoId"));
var _isAfter = _interopRequireDefault(require("./lib/isAfter"));
var _isBefore = _interopRequireDefault(require("./lib/isBefore"));
var _isIn = _interopRequireDefault(require("./lib/isIn"));
var _isLuhnNumber = _interopRequireDefault(require("./lib/isLuhnNumber"));
var _isCreditCard = _interopRequireDefault(require("./lib/isCreditCard"));
var _isIdentityCard = _interopRequireDefault(require("./lib/isIdentityCard"));
var _isEAN = _interopRequireDefault(require("./lib/isEAN"));
var _isISIN = _interopRequireDefault(require("./lib/isISIN"));
var _isISBN = _interopRequireDefault(require("./lib/isISBN"));
var _isISSN = _interopRequireDefault(require("./lib/isISSN"));
var _isTaxID = _interopRequireDefault(require("./lib/isTaxID"));
var _isMobilePhone = _interopRequireWildcard(require("./lib/isMobilePhone"));
var _isEthereumAddress = _interopRequireDefault(require("./lib/isEthereumAddress"));
var _isCurrency = _interopRequireDefault(require("./lib/isCurrency"));
var _isBtcAddress = _interopRequireDefault(require("./lib/isBtcAddress"));
var _isISO = require("./lib/isISO6346");
var _isISO2 = _interopRequireDefault(require("./lib/isISO6391"));
var _isISO3 = _interopRequireDefault(require("./lib/isISO8601"));
var _isRFC = _interopRequireDefault(require("./lib/isRFC3339"));
var _isISO4 = _interopRequireDefault(require("./lib/isISO15924"));
var _isISO31661Alpha = _interopRequireDefault(require("./lib/isISO31661Alpha2"));
var _isISO31661Alpha2 = _interopRequireDefault(require("./lib/isISO31661Alpha3"));
var _isISO31661Numeric = _interopRequireDefault(require("./lib/isISO31661Numeric"));
var _isISO5 = _interopRequireDefault(require("./lib/isISO4217"));
var _isBase = _interopRequireDefault(require("./lib/isBase32"));
var _isBase2 = _interopRequireDefault(require("./lib/isBase58"));
var _isBase3 = _interopRequireDefault(require("./lib/isBase64"));
var _isDataURI = _interopRequireDefault(require("./lib/isDataURI"));
var _isMagnetURI = _interopRequireDefault(require("./lib/isMagnetURI"));
var _isMailtoURI = _interopRequireDefault(require("./lib/isMailtoURI"));
var _isMimeType = _interopRequireDefault(require("./lib/isMimeType"));
var _isLatLong = _interopRequireDefault(require("./lib/isLatLong"));
var _isPostalCode = _interopRequireWildcard(require("./lib/isPostalCode"));
var _ltrim = _interopRequireDefault(require("./lib/ltrim"));
var _rtrim = _interopRequireDefault(require("./lib/rtrim"));
var _trim = _interopRequireDefault(require("./lib/trim"));
var _escape = _interopRequireDefault(require("./lib/escape"));
var _unescape = _interopRequireDefault(require("./lib/unescape"));
var _stripLow = _interopRequireDefault(require("./lib/stripLow"));
var _whitelist = _interopRequireDefault(require("./lib/whitelist"));
var _blacklist = _interopRequireDefault(require("./lib/blacklist"));
var _isWhitelisted = _interopRequireDefault(require("./lib/isWhitelisted"));
var _normalizeEmail = _interopRequireDefault(require("./lib/normalizeEmail"));
var _isSlug = _interopRequireDefault(require("./lib/isSlug"));
var _isLicensePlate = _interopRequireDefault(require("./lib/isLicensePlate"));
var _isStrongPassword = _interopRequireDefault(require("./lib/isStrongPassword"));
var _isVAT = _interopRequireDefault(require("./lib/isVAT"));
function _interopRequireWildcard(e, t) {
  if ("function" == typeof WeakMap) var r = new WeakMap(),
    n = new WeakMap();
  return (_interopRequireWildcard = function _interopRequireWildcard(e, t) {
    if (!t && e && e.__esModule) return e;
    var o,
      i,
      f = {
        __proto__: null,
        default: e
      };
    if (null === e || "object" != _typeof(e) && "function" != typeof e) return f;
    if (o = t ? n : r) {
      if (o.has(e)) return o.get(e);
      o.set(e, f);
    }
    for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]);
    return f;
  })(e, t);
}
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
var version = '13.15.35';
var validator = {
  version: version,
  toDate: _toDate.default,
  toFloat: _toFloat.default,
  toInt: _toInt.default,
  toBoolean: _toBoolean.default,
  equals: _equals.default,
  contains: _contains.default,
  matches: _matches.default,
  isEmail: _isEmail.default,
  isURL: _isURL.default,
  isMACAddress: _isMACAddress.default,
  isIP: _isIP.default,
  isIPRange: _isIPRange.default,
  isFQDN: _isFQDN.default,
  isBoolean: _isBoolean.default,
  isIBAN: _isIBAN.default,
  isBIC: _isBIC.default,
  isAbaRouting: _isAbaRouting.default,
  isAlpha: _isAlpha.default,
  isAlphaLocales: _isAlpha.locales,
  isAlphanumeric: _isAlphanumeric.default,
  isAlphanumericLocales: _isAlphanumeric.locales,
  isNumeric: _isNumeric.default,
  isPassportNumber: _isPassportNumber.default,
  passportNumberLocales: _isPassportNumber.locales,
  isPort: _isPort.default,
  isLowercase: _isLowercase.default,
  isUppercase: _isUppercase.default,
  isAscii: _isAscii.default,
  isFullWidth: _isFullWidth.default,
  isHalfWidth: _isHalfWidth.default,
  isVariableWidth: _isVariableWidth.default,
  isMultibyte: _isMultibyte.default,
  isSemVer: _isSemVer.default,
  isSurrogatePair: _isSurrogatePair.default,
  isInt: _isInt.default,
  isIMEI: _isIMEI.default,
  isFloat: _isFloat.default,
  isFloatLocales: _isFloat.locales,
  isDecimal: _isDecimal.default,
  isHexadecimal: _isHexadecimal.default,
  isOctal: _isOctal.default,
  isDivisibleBy: _isDivisibleBy.default,
  isHexColor: _isHexColor.default,
  isRgbColor: _isRgbColor.default,
  isHSL: _isHSL.default,
  isISRC: _isISRC.default,
  isMD5: _isMD.default,
  isHash: _isHash.default,
  isJWT: _isJWT.default,
  isJSON: _isJSON.default,
  isEmpty: _isEmpty.default,
  isLength: _isLength.default,
  isLocale: _isLocale.default,
  isByteLength: _isByteLength.default,
  isULID: _isULID.default,
  isUUID: _isUUID.default,
  isMongoId: _isMongoId.default,
  isAfter: _isAfter.default,
  isBefore: _isBefore.default,
  isIn: _isIn.default,
  isLuhnNumber: _isLuhnNumber.default,
  isCreditCard: _isCreditCard.default,
  isIdentityCard: _isIdentityCard.default,
  isEAN: _isEAN.default,
  isISIN: _isISIN.default,
  isISBN: _isISBN.default,
  isISSN: _isISSN.default,
  isMobilePhone: _isMobilePhone.default,
  isMobilePhoneLocales: _isMobilePhone.locales,
  isPostalCode: _isPostalCode.default,
  isPostalCodeLocales: _isPostalCode.locales,
  isEthereumAddress: _isEthereumAddress.default,
  isCurrency: _isCurrency.default,
  isBtcAddress: _isBtcAddress.default,
  isISO6346: _isISO.isISO6346,
  isFreightContainerID: _isISO.isFreightContainerID,
  isISO6391: _isISO2.default,
  isISO8601: _isISO3.default,
  isISO15924: _isISO4.default,
  isRFC3339: _isRFC.default,
  isISO31661Alpha2: _isISO31661Alpha.default,
  isISO31661Alpha3: _isISO31661Alpha2.default,
  isISO31661Numeric: _isISO31661Numeric.default,
  isISO4217: _isISO5.default,
  isBase32: _isBase.default,
  isBase58: _isBase2.default,
  isBase64: _isBase3.default,
  isDataURI: _isDataURI.default,
  isMagnetURI: _isMagnetURI.default,
  isMailtoURI: _isMailtoURI.default,
  isMimeType: _isMimeType.default,
  isLatLong: _isLatLong.default,
  ltrim: _ltrim.default,
  rtrim: _rtrim.default,
  trim: _trim.default,
  escape: _escape.default,
  unescape: _unescape.default,
  stripLow: _stripLow.default,
  whitelist: _whitelist.default,
  blacklist: _blacklist.default,
  isWhitelisted: _isWhitelisted.default,
  normalizeEmail: _normalizeEmail.default,
  toString: toString,
  isSlug: _isSlug.default,
  isStrongPassword: _isStrongPassword.default,
  isTaxID: _isTaxID.default,
  isDate: _isDate.default,
  isTime: _isTime.default,
  isLicensePlate: _isLicensePlate.default,
  isVAT: _isVAT.default,
  ibanLocales: _isIBAN.locales
};
var _default = exports.default = validator;
module.exports = exports.default;
module.exports.default = exports.default;
},{"./lib/toDate":"../../node_modules/validator/lib/toDate.js","./lib/toFloat":"../../node_modules/validator/lib/toFloat.js","./lib/toInt":"../../node_modules/validator/lib/toInt.js","./lib/toBoolean":"../../node_modules/validator/lib/toBoolean.js","./lib/equals":"../../node_modules/validator/lib/equals.js","./lib/contains":"../../node_modules/validator/lib/contains.js","./lib/matches":"../../node_modules/validator/lib/matches.js","./lib/isEmail":"../../node_modules/validator/lib/isEmail.js","./lib/isURL":"../../node_modules/validator/lib/isURL.js","./lib/isMACAddress":"../../node_modules/validator/lib/isMACAddress.js","./lib/isIP":"../../node_modules/validator/lib/isIP.js","./lib/isIPRange":"../../node_modules/validator/lib/isIPRange.js","./lib/isFQDN":"../../node_modules/validator/lib/isFQDN.js","./lib/isDate":"../../node_modules/validator/lib/isDate.js","./lib/isTime":"../../node_modules/validator/lib/isTime.js","./lib/isBoolean":"../../node_modules/validator/lib/isBoolean.js","./lib/isLocale":"../../node_modules/validator/lib/isLocale.js","./lib/isAbaRouting":"../../node_modules/validator/lib/isAbaRouting.js","./lib/isAlpha":"../../node_modules/validator/lib/isAlpha.js","./lib/isAlphanumeric":"../../node_modules/validator/lib/isAlphanumeric.js","./lib/isNumeric":"../../node_modules/validator/lib/isNumeric.js","./lib/isPassportNumber":"../../node_modules/validator/lib/isPassportNumber.js","./lib/isPort":"../../node_modules/validator/lib/isPort.js","./lib/isLowercase":"../../node_modules/validator/lib/isLowercase.js","./lib/isUppercase":"../../node_modules/validator/lib/isUppercase.js","./lib/isIMEI":"../../node_modules/validator/lib/isIMEI.js","./lib/isAscii":"../../node_modules/validator/lib/isAscii.js","./lib/isFullWidth":"../../node_modules/validator/lib/isFullWidth.js","./lib/isHalfWidth":"../../node_modules/validator/lib/isHalfWidth.js","./lib/isVariableWidth":"../../node_modules/validator/lib/isVariableWidth.js","./lib/isMultibyte":"../../node_modules/validator/lib/isMultibyte.js","./lib/isSemVer":"../../node_modules/validator/lib/isSemVer.js","./lib/isSurrogatePair":"../../node_modules/validator/lib/isSurrogatePair.js","./lib/isInt":"../../node_modules/validator/lib/isInt.js","./lib/isFloat":"../../node_modules/validator/lib/isFloat.js","./lib/isDecimal":"../../node_modules/validator/lib/isDecimal.js","./lib/isHexadecimal":"../../node_modules/validator/lib/isHexadecimal.js","./lib/isOctal":"../../node_modules/validator/lib/isOctal.js","./lib/isDivisibleBy":"../../node_modules/validator/lib/isDivisibleBy.js","./lib/isHexColor":"../../node_modules/validator/lib/isHexColor.js","./lib/isRgbColor":"../../node_modules/validator/lib/isRgbColor.js","./lib/isHSL":"../../node_modules/validator/lib/isHSL.js","./lib/isISRC":"../../node_modules/validator/lib/isISRC.js","./lib/isIBAN":"../../node_modules/validator/lib/isIBAN.js","./lib/isBIC":"../../node_modules/validator/lib/isBIC.js","./lib/isMD5":"../../node_modules/validator/lib/isMD5.js","./lib/isHash":"../../node_modules/validator/lib/isHash.js","./lib/isJWT":"../../node_modules/validator/lib/isJWT.js","./lib/isJSON":"../../node_modules/validator/lib/isJSON.js","./lib/isEmpty":"../../node_modules/validator/lib/isEmpty.js","./lib/isLength":"../../node_modules/validator/lib/isLength.js","./lib/isByteLength":"../../node_modules/validator/lib/isByteLength.js","./lib/isULID":"../../node_modules/validator/lib/isULID.js","./lib/isUUID":"../../node_modules/validator/lib/isUUID.js","./lib/isMongoId":"../../node_modules/validator/lib/isMongoId.js","./lib/isAfter":"../../node_modules/validator/lib/isAfter.js","./lib/isBefore":"../../node_modules/validator/lib/isBefore.js","./lib/isIn":"../../node_modules/validator/lib/isIn.js","./lib/isLuhnNumber":"../../node_modules/validator/lib/isLuhnNumber.js","./lib/isCreditCard":"../../node_modules/validator/lib/isCreditCard.js","./lib/isIdentityCard":"../../node_modules/validator/lib/isIdentityCard.js","./lib/isEAN":"../../node_modules/validator/lib/isEAN.js","./lib/isISIN":"../../node_modules/validator/lib/isISIN.js","./lib/isISBN":"../../node_modules/validator/lib/isISBN.js","./lib/isISSN":"../../node_modules/validator/lib/isISSN.js","./lib/isTaxID":"../../node_modules/validator/lib/isTaxID.js","./lib/isMobilePhone":"../../node_modules/validator/lib/isMobilePhone.js","./lib/isEthereumAddress":"../../node_modules/validator/lib/isEthereumAddress.js","./lib/isCurrency":"../../node_modules/validator/lib/isCurrency.js","./lib/isBtcAddress":"../../node_modules/validator/lib/isBtcAddress.js","./lib/isISO6346":"../../node_modules/validator/lib/isISO6346.js","./lib/isISO6391":"../../node_modules/validator/lib/isISO6391.js","./lib/isISO8601":"../../node_modules/validator/lib/isISO8601.js","./lib/isRFC3339":"../../node_modules/validator/lib/isRFC3339.js","./lib/isISO15924":"../../node_modules/validator/lib/isISO15924.js","./lib/isISO31661Alpha2":"../../node_modules/validator/lib/isISO31661Alpha2.js","./lib/isISO31661Alpha3":"../../node_modules/validator/lib/isISO31661Alpha3.js","./lib/isISO31661Numeric":"../../node_modules/validator/lib/isISO31661Numeric.js","./lib/isISO4217":"../../node_modules/validator/lib/isISO4217.js","./lib/isBase32":"../../node_modules/validator/lib/isBase32.js","./lib/isBase58":"../../node_modules/validator/lib/isBase58.js","./lib/isBase64":"../../node_modules/validator/lib/isBase64.js","./lib/isDataURI":"../../node_modules/validator/lib/isDataURI.js","./lib/isMagnetURI":"../../node_modules/validator/lib/isMagnetURI.js","./lib/isMailtoURI":"../../node_modules/validator/lib/isMailtoURI.js","./lib/isMimeType":"../../node_modules/validator/lib/isMimeType.js","./lib/isLatLong":"../../node_modules/validator/lib/isLatLong.js","./lib/isPostalCode":"../../node_modules/validator/lib/isPostalCode.js","./lib/ltrim":"../../node_modules/validator/lib/ltrim.js","./lib/rtrim":"../../node_modules/validator/lib/rtrim.js","./lib/trim":"../../node_modules/validator/lib/trim.js","./lib/escape":"../../node_modules/validator/lib/escape.js","./lib/unescape":"../../node_modules/validator/lib/unescape.js","./lib/stripLow":"../../node_modules/validator/lib/stripLow.js","./lib/whitelist":"../../node_modules/validator/lib/whitelist.js","./lib/blacklist":"../../node_modules/validator/lib/blacklist.js","./lib/isWhitelisted":"../../node_modules/validator/lib/isWhitelisted.js","./lib/normalizeEmail":"../../node_modules/validator/lib/normalizeEmail.js","./lib/isSlug":"../../node_modules/validator/lib/isSlug.js","./lib/isLicensePlate":"../../node_modules/validator/lib/isLicensePlate.js","./lib/isStrongPassword":"../../node_modules/validator/lib/isStrongPassword.js","./lib/isVAT":"../../node_modules/validator/lib/isVAT.js"}],"../../node_modules/axios/lib/helpers/bind.js":[function(require,module,exports) {
'use strict';

module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

},{}],"../../node_modules/is-buffer/index.js":[function(require,module,exports) {
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

module.exports = function isBuffer(obj) {
  return obj != null && obj.constructor != null && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);
};
},{}],"../../node_modules/axios/lib/utils.js":[function(require,module,exports) {
'use strict';

var bind = require('./helpers/bind');
var isBuffer = require('is-buffer');

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};

},{"./helpers/bind":"../../node_modules/axios/lib/helpers/bind.js","is-buffer":"../../node_modules/is-buffer/index.js"}],"../../node_modules/axios/lib/helpers/normalizeHeaderName.js":[function(require,module,exports) {
'use strict';

var utils = require('../utils');

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

},{"../utils":"../../node_modules/axios/lib/utils.js"}],"../../node_modules/axios/lib/core/enhanceError.js":[function(require,module,exports) {
'use strict';

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};

},{}],"../../node_modules/axios/lib/core/createError.js":[function(require,module,exports) {
'use strict';

var enhanceError = require('./enhanceError');

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

},{"./enhanceError":"../../node_modules/axios/lib/core/enhanceError.js"}],"../../node_modules/axios/lib/core/settle.js":[function(require,module,exports) {
'use strict';

var createError = require('./createError');

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};

},{"./createError":"../../node_modules/axios/lib/core/createError.js"}],"../../node_modules/axios/lib/helpers/buildURL.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

},{"./../utils":"../../node_modules/axios/lib/utils.js"}],"../../node_modules/axios/lib/helpers/parseHeaders.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

},{"./../utils":"../../node_modules/axios/lib/utils.js"}],"../../node_modules/axios/lib/helpers/isURLSameOrigin.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);

},{"./../utils":"../../node_modules/axios/lib/utils.js"}],"../../node_modules/axios/lib/helpers/cookies.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);

},{"./../utils":"../../node_modules/axios/lib/utils.js"}],"../../node_modules/axios/lib/adapters/xhr.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');
var settle = require('./../core/settle');
var buildURL = require('./../helpers/buildURL');
var parseHeaders = require('./../helpers/parseHeaders');
var isURLSameOrigin = require('./../helpers/isURLSameOrigin');
var createError = require('../core/createError');

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = require('./../helpers/cookies');

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

},{"./../utils":"../../node_modules/axios/lib/utils.js","./../core/settle":"../../node_modules/axios/lib/core/settle.js","./../helpers/buildURL":"../../node_modules/axios/lib/helpers/buildURL.js","./../helpers/parseHeaders":"../../node_modules/axios/lib/helpers/parseHeaders.js","./../helpers/isURLSameOrigin":"../../node_modules/axios/lib/helpers/isURLSameOrigin.js","../core/createError":"../../node_modules/axios/lib/core/createError.js","./../helpers/cookies":"../../node_modules/axios/lib/helpers/cookies.js"}],"../../node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;
function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}
(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }
  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();
function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  }
  // if setTimeout wasn't available but was latter defined
  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}
function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  }
  // if clearTimeout wasn't available but was latter defined
  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;
function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }
  draining = false;
  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }
  if (queue.length) {
    drainQueue();
  }
}
function drainQueue() {
  if (draining) {
    return;
  }
  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;
  while (len) {
    currentQueue = queue;
    queue = [];
    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}
process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }
  queue.push(new Item(fun, args));
  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
};

// v8 likes predictible objects
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};
process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};
function noop() {}
process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;
process.listeners = function (name) {
  return [];
};
process.binding = function (name) {
  throw new Error('process.binding is not supported');
};
process.cwd = function () {
  return '/';
};
process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};
process.umask = function () {
  return 0;
};
},{}],"../../node_modules/axios/lib/defaults.js":[function(require,module,exports) {
var process = require("process");
'use strict';

var utils = require('./utils');
var normalizeHeaderName = require('./helpers/normalizeHeaderName');

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = require('./adapters/xhr');
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = require('./adapters/http');
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

},{"./utils":"../../node_modules/axios/lib/utils.js","./helpers/normalizeHeaderName":"../../node_modules/axios/lib/helpers/normalizeHeaderName.js","./adapters/xhr":"../../node_modules/axios/lib/adapters/xhr.js","./adapters/http":"../../node_modules/axios/lib/adapters/xhr.js","process":"../../node_modules/process/browser.js"}],"../../node_modules/axios/lib/core/InterceptorManager.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

},{"./../utils":"../../node_modules/axios/lib/utils.js"}],"../../node_modules/axios/lib/core/transformData.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};

},{"./../utils":"../../node_modules/axios/lib/utils.js"}],"../../node_modules/axios/lib/cancel/isCancel.js":[function(require,module,exports) {
'use strict';

module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

},{}],"../../node_modules/axios/lib/helpers/isAbsoluteURL.js":[function(require,module,exports) {
'use strict';

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

},{}],"../../node_modules/axios/lib/helpers/combineURLs.js":[function(require,module,exports) {
'use strict';

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};

},{}],"../../node_modules/axios/lib/core/dispatchRequest.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');
var transformData = require('./transformData');
var isCancel = require('../cancel/isCancel');
var defaults = require('../defaults');
var isAbsoluteURL = require('./../helpers/isAbsoluteURL');
var combineURLs = require('./../helpers/combineURLs');

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};

},{"./../utils":"../../node_modules/axios/lib/utils.js","./transformData":"../../node_modules/axios/lib/core/transformData.js","../cancel/isCancel":"../../node_modules/axios/lib/cancel/isCancel.js","../defaults":"../../node_modules/axios/lib/defaults.js","./../helpers/isAbsoluteURL":"../../node_modules/axios/lib/helpers/isAbsoluteURL.js","./../helpers/combineURLs":"../../node_modules/axios/lib/helpers/combineURLs.js"}],"../../node_modules/axios/lib/core/Axios.js":[function(require,module,exports) {
'use strict';

var defaults = require('./../defaults');
var utils = require('./../utils');
var InterceptorManager = require('./InterceptorManager');
var dispatchRequest = require('./dispatchRequest');

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;

},{"./../defaults":"../../node_modules/axios/lib/defaults.js","./../utils":"../../node_modules/axios/lib/utils.js","./InterceptorManager":"../../node_modules/axios/lib/core/InterceptorManager.js","./dispatchRequest":"../../node_modules/axios/lib/core/dispatchRequest.js"}],"../../node_modules/axios/lib/cancel/Cancel.js":[function(require,module,exports) {
'use strict';

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;

},{}],"../../node_modules/axios/lib/cancel/CancelToken.js":[function(require,module,exports) {
'use strict';

var Cancel = require('./Cancel');

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;

},{"./Cancel":"../../node_modules/axios/lib/cancel/Cancel.js"}],"../../node_modules/axios/lib/helpers/spread.js":[function(require,module,exports) {
'use strict';

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

},{}],"../../node_modules/axios/lib/axios.js":[function(require,module,exports) {
'use strict';

var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var defaults = require('./defaults');

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = require('./helpers/spread');

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;

},{"./utils":"../../node_modules/axios/lib/utils.js","./helpers/bind":"../../node_modules/axios/lib/helpers/bind.js","./core/Axios":"../../node_modules/axios/lib/core/Axios.js","./defaults":"../../node_modules/axios/lib/defaults.js","./cancel/Cancel":"../../node_modules/axios/lib/cancel/Cancel.js","./cancel/CancelToken":"../../node_modules/axios/lib/cancel/CancelToken.js","./cancel/isCancel":"../../node_modules/axios/lib/cancel/isCancel.js","./helpers/spread":"../../node_modules/axios/lib/helpers/spread.js"}],"../../node_modules/axios/index.js":[function(require,module,exports) {
module.exports = require('./lib/axios');
},{"./lib/axios":"../../node_modules/axios/lib/axios.js"}],"alerts.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showAlert = exports.hideAlert = void 0;
/* eslint-disable */

const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) {
    el.classList.remove('show');
    el.classList.add('hide');
    setTimeout(() => el.remove(), 500); // after 0.5s remove the element
  }
};

// type could be 'success' or 'error'
exports.hideAlert = hideAlert;
const showAlert = (type, msg) => {
  // hide previous alert before creating a new one
  hideAlert();
  const markup = "<div class=\"alert alert--".concat(type, "\">").concat(msg, "</div>");
  // afterbegin means add the element before the first child [add it in the beginning]
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  const alertBox = document.querySelector('.alert');
  setTimeout(() => alertBox.classList.add('show'), 50); // Delay 0.05s to trigger animation
  // after 5 seconds hide the alert
  window.setTimeout(hideAlert, 5000);
};
exports.showAlert = showAlert;
},{}],"login.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.login = exports.forgotPassword = exports.deleteAccount = void 0;
var _axios = _interopRequireDefault(require("axios"));
var _alerts = require("./alerts");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable */

const login = async (email, password) => {
  try {
    const res = await (0, _axios.default)({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password
      }
    });
    if (res.data.status === 'success') {
      (0, _alerts.showAlert)('success', 'Logged in successful!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    (0, _alerts.showAlert)('error', err.response.data.message); // Server response with error
  }
};
exports.login = login;
const logout = async () => {
  try {
    const res = await (0, _axios.default)({
      method: 'GET',
      url: '/api/v1/users/logout',
      withCredentials: true // Tell browser to include cookies in request if don't write it the backend won’t know who you are (so req.cookies will be undefined).
    });
    if (res.data.status = 'success') {
      location.assign('/');
      // location.reload(true);
    }
  } catch (err) {
    console.log(err.response);
    (0, _alerts.showAlert)('error', 'Error logging out! Try again.');
  }
};
exports.logout = logout;
const deleteAccount = async () => {
  try {
    const res = await (0, _axios.default)({
      method: 'DELETE',
      url: '/api/v1/users/deleteMyAccount'
    });
    if (res.data.status = 'success') {
      (0, _alerts.showAlert)('success', 'Account deleted successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    console.log(err.response);
    (0, _alerts.showAlert)('error', 'Error deleting account! Try again.');
  }
};
exports.deleteAccount = deleteAccount;
const forgotPassword = async email => {
  try {
    const res = await _axios.default.post('/api/v1/users/forgotPassword', {
      email
    });
    if (res.data.status === 'success') {
      (0, _alerts.showAlert)('success', 'Check your email');
    }
  } catch (err) {
    (0, _alerts.showAlert)('error', err.response.data.message); // Server response with error
  }
};
exports.forgotPassword = forgotPassword;
},{"axios":"../../node_modules/axios/index.js","./alerts":"alerts.js"}],"updateSettings.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateSettings = void 0;
var _axios = _interopRequireDefault(require("axios"));
var _alerts = require("./alerts");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable */

const updateSettings = async (data, type) => {
  try {
    const url = type === 'password' ? '/api/v1/users/updatePassword' : '/api/v1/users/updateProfile';
    const res = await (0, _axios.default)({
      method: 'PATCH',
      url,
      data
    });
    if (res.data.status === 'success') {
      (0, _alerts.showAlert)('success', "".concat(type.charAt(0).toUpperCase() + type.slice(1), " updated successfully!"));
      if (type !== 'password') {
        window.setTimeout(() => {
          location.reload();
        }, 1500);
      }
    }
  } catch (err) {
    (0, _alerts.showAlert)('error', err.response.data.message);
  }
};
exports.updateSettings = updateSettings;
},{"axios":"../../node_modules/axios/index.js","./alerts":"alerts.js"}],"signup.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signup = exports.resetPassword = void 0;
var _axios = _interopRequireDefault(require("axios"));
var _alerts = require("./alerts");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable */

function showFieldError(field, message) {
  const errorElement = document.getElementById("".concat(field, "-error"));
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.color = 'red';
    errorElement.style.fontWeight = 'bold';
    errorElement.style.fontSize = '14px';
  }
}
function clearFieldError(field) {
  const errorElement = document.getElementById("".concat(field, "-error"));
  if (errorElement) {
    errorElement.textContent = '';
  }
}
const signup = async (name, email, password, passwordConfirm, role) => {
  try {
    const res = await (0, _axios.default)({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm,
        role
      }
    });
    if (res.data.status === 'success') {
      (0, _alerts.showAlert)('success', 'Signed up successfully!');
      window.setTimeout(() => {
        location.assign('/confirm-email');
      }, 1500);
    }
  } catch (err) {
    // Clear all previous errors first
    clearFieldError('name');
    clearFieldError('email');
    clearFieldError('password');
    clearFieldError('password-confirm');
    clearFieldError('role');

    // Display the specific error messages under each field
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => {
        showFieldError(error.field, error.message);
      });
    } else {
      // Show a generic error message if no specific field error is returned
      (0, _alerts.showAlert)('error', err.response.data.message);
    }
  }
};
exports.signup = signup;
const resetPassword = async (password, passwordConfirm, token) => {
  try {
    const res = await _axios.default.patch("/api/v1/users/resetPassword/".concat(token), {
      password,
      passwordConfirm
    });
    if (res.data.status === 'success') {
      (0, _alerts.showAlert)('success', 'Logged in successful!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    // Clear all previous errors first
    clearFieldError('password');
    clearFieldError('password-confirm');

    // Display the specific error messages under each field
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => {
        showFieldError(error.field, error.message);
      });
    } else {
      // Show a generic error message if no specific field error is returned
      (0, _alerts.showAlert)('error', err.response.data.message);
    }
  }
};
exports.resetPassword = resetPassword;
},{"axios":"../../node_modules/axios/index.js","./alerts":"alerts.js"}],"stripe.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bookTour = void 0;
var _axios = _interopRequireDefault(require("axios"));
var _alerts = require("./alerts");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable */

const stripe = Stripe('pk_test_51QmfEHI28N508uXGe5DpOhvZrIbC3b9m0kb5tW8bBSv19GHjyXsCBFwB0xDIEI2Q7VmuvNHZ2874OdjG5rfuqnWF00Zqc3vcsk');
const bookTour = async (tourId, date, price) => {
  try {
    // 1) Get checkout session from API
    const session = await (0, _axios.default)("/api/v1/bookings/checkout-session/".concat(tourId, "/").concat(date, "/").concat(price));
    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    (0, _alerts.showAlert)('error', err.response.data.message);
    window.setTimeout(() => {
      // location.assign('/');
      location.reload();
    }, 1500);
  }
};
exports.bookTour = bookTour;
},{"axios":"../../node_modules/axios/index.js","./alerts":"alerts.js"}],"review.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateReviewTour = exports.reviewTour = exports.deleteReviewTour = void 0;
var _axios = _interopRequireDefault(require("axios"));
var _alerts = require("./alerts");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable */

const reviewTour = async function (tourId, review, rating) {
  try {
    const res = await (0, _axios.default)({
      method: 'POST',
      url: "/api/v1/tours/".concat(tourId, "/reviews"),
      data: {
        review,
        rating
      }
    });
    if (res.data.status === 'success') {
      (0, _alerts.showAlert)('success', 'Review submitted successfully!');
      window.setTimeout(() => {
        location.assign('/my-reviews');
      }, 1500);
    }
  } catch (err) {
    (0, _alerts.showAlert)('error', err.response.data.message);
  }
};
exports.reviewTour = reviewTour;
const updateReviewTour = async function (reviewId, review, rating) {
  try {
    const res = await (0, _axios.default)({
      method: 'PATCH',
      url: "/api/v1/reviews/".concat(reviewId),
      data: {
        review,
        rating
      }
    });
    if (res.data.status === 'success') {
      (0, _alerts.showAlert)('success', 'Review updated successfully!');
      window.setTimeout(() => {
        location.assign('/my-reviews');
      }, 1500);
    }
  } catch (err) {
    (0, _alerts.showAlert)('error', err.response.data.message);
  }
};
exports.updateReviewTour = updateReviewTour;
const deleteReviewTour = async function (reviewId) {
  try {
    const res = await (0, _axios.default)({
      method: 'DELETE',
      url: "/api/v1/reviews/".concat(reviewId)
    });

    // 204 => No content
    if (res.status === 204) {
      (0, _alerts.showAlert)('success', 'Review deleted successfully!');
      window.setTimeout(() => {
        location.assign('/my-reviews');
      }, 1500);
    }
  } catch (err) {
    (0, _alerts.showAlert)('error', err.response.data.message);
  }
};
exports.deleteReviewTour = deleteReviewTour;
},{"axios":"../../node_modules/axios/index.js","./alerts":"alerts.js"}],"admin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateSectionByAdmin = exports.deleteSectionByAdmin = exports.createSectionByAdmin = exports.bookTourForUser = void 0;
var _axios = _interopRequireDefault(require("axios"));
var _alerts = require("./alerts");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable */

const stripe = Stripe('pk_test_51QmfEHI28N508uXGe5DpOhvZrIbC3b9m0kb5tW8bBSv19GHjyXsCBFwB0xDIEI2Q7VmuvNHZ2874OdjG5rfuqnWF00Zqc3vcsk');
const createSectionByAdmin = async (data, section) => {
  try {
    let url = '';
    let returnPage = '';
    switch (section) {
      case 'user':
        url = '/api/v1/users/signup';
        returnPage = '/dashboard/users';
        break;
      case 'tour':
        url = '/api/v1/tours';
        returnPage = '/dashboard/tours';
        break;
      case 'review':
        url = '/api/v1/reviews';
        returnPage = '/dashboard/reviews';
        break;
      case 'booking':
        return await bookTourForUser(data.tour, data.user, data.DateSelect, data.price);
      default:
        return;
    }
    // console.log(url);
    // console.log(data);
    const res = await (0, _axios.default)({
      method: 'POST',
      url,
      data
    });
    if (res.data.status === 'success') {
      (0, _alerts.showAlert)('success', "".concat(section.charAt(0).toUpperCase() + section.slice(1), " created successfully!"));
      window.setTimeout(() => {
        location.assign(returnPage);
      }, 1500);
    }
  } catch (err) {
    (0, _alerts.showAlert)('error', err.response.data.message);
  }
};
exports.createSectionByAdmin = createSectionByAdmin;
const updateSectionByAdmin = async (data, section, id) => {
  try {
    let url = '';
    let returnPage = '';
    switch (section) {
      case 'user':
        url = "/api/v1/users/".concat(id);
        returnPage = '/dashboard/users';
        break;
      case 'tour':
        url = "/api/v1/tours/".concat(id);
        returnPage = '/dashboard/tours';
        break;
      case 'review':
        url = "/api/v1/reviews/".concat(id);
        returnPage = '/dashboard/reviews';
        break;
      case 'booking':
        url = "/api/v1/bookings/".concat(id);
        returnPage = '/dashboard/bookings';
        break;
      default:
        return;
    }
    const res = await (0, _axios.default)({
      method: 'PATCH',
      url,
      data
    });
    if (res.data.status === 'success') {
      (0, _alerts.showAlert)('success', "".concat(section.charAt(0).toUpperCase() + section.slice(1), " updated successfully!"));
      window.setTimeout(() => {
        location.assign(returnPage);
      }, 1500);
    }
  } catch (err) {
    (0, _alerts.showAlert)('error', err.response.data.message);
  }
};
exports.updateSectionByAdmin = updateSectionByAdmin;
const deleteSectionByAdmin = async (id, section) => {
  try {
    let url = '';
    switch (section) {
      case 'user':
        url = "/api/v1/users/".concat(id);
        break;
      case 'tour':
        url = "/api/v1/tours/".concat(id);
        break;
      case 'review':
        url = "/api/v1/reviews/".concat(id);
        break;
      case 'booking':
        url = "/api/v1/bookings/".concat(id);
        break;
      default:
        return;
    }
    const res = await (0, _axios.default)({
      method: 'DELETE',
      url
    });
    if (res.status === 204) {
      (0, _alerts.showAlert)('success', "".concat(section.charAt(0).toUpperCase() + section.slice(1, -1), " deleted successfully!"));
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    (0, _alerts.showAlert)('error', err.response.data.message);
  }
};

/**
 * Admin books a tour for another user
 */
exports.deleteSectionByAdmin = deleteSectionByAdmin;
const bookTourForUser = async (tourId, userId, date, price) => {
  try {
    // 1) Get checkout session from API (admin endpoint)
    const session = await _axios.default.get("/api/v1/bookings/checkout-session/".concat(tourId, "/").concat(date, "/").concat(price, "/").concat(userId));

    // 2) Redirect to Stripe Checkout
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    (0, _alerts.showAlert)('error', err.response.data.message);
    window.setTimeout(() => {
      location.assign('/add/booking');
    }, 1500);
  }
};
exports.bookTourForUser = bookTourForUser;
},{"axios":"../../node_modules/axios/index.js","./alerts":"alerts.js"}],"index.js":[function(require,module,exports) {
"use strict";

require("core-js/modules/es7.array.flat-map.js");
require("core-js/modules/es6.array.sort.js");
require("core-js/modules/es7.promise.finally.js");
require("core-js/modules/es7.symbol.async-iterator.js");
require("core-js/modules/es7.string.trim-left.js");
require("core-js/modules/es7.string.trim-right.js");
require("core-js/modules/web.timers.js");
require("core-js/modules/web.immediate.js");
require("core-js/modules/web.dom.iterable.js");
var _axios = _interopRequireDefault(require("axios"));
var _alerts = require("./alerts");
var _login = require("./login");
var _updateSettings = require("./updateSettings");
var _signup = require("./signup");
var _stripe = require("./stripe");
var _review = require("./review");
var _admin = require("./admin");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/* eslint-disable */
const validator = require('validator');
// DOM ELEMENTS
const signupForm = document.querySelector('.form--signup');
const loginForm = document.querySelector('.form--login');
const forgetPasswordform = document.querySelector('.form--forgot-password');
const resetPasswordForm = document.querySelector('.form--reset-password');
const logoutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const createReview = document.getElementById('btn--review');
const reviewForm = document.querySelector('.form--review');
const updateReview = document.querySelector('.update-review');
const deleteReview = document.querySelector('.delete-review');
const addSection = document.getElementById('add-item');
const updateSection = document.getElementById('update-section');
const deleteItem = document.querySelector('.delete-item');
const deleteMyAccount = document.querySelector('.nav__el--delete_my_account');

// VALIDATION
// Generic validation function
async function validateTourName(value, errorSelector, message) {
  const errorElement = document.querySelector(errorSelector);
  if (!value || value.trim() === '') {
    showError(errorElement, 'Tour name is required!');
    return false;
  }
  try {
    const res = await _axios.default.get("/api/v1/tours/checkTourName/".concat(value));
    if (res.data.exists) {
      showError(errorElement, message); // e.g. "Tour name already exists!"
      return false;
    }
  } catch (err) {
    console.error(err);
    showError(errorElement, 'Error checking tour name!');
    return false;
  }
  hideError(errorElement);
  return true;
}
function validateDates(dates, errorSelector, message) {
  const errorElement = document.querySelector(errorSelector);
  const allFilled = dates.every(d => d && d.trim() !== '');
  if (!allFilled) {
    showError(errorElement, message); // e.g. "All 3 start dates are required!"
    return false;
  }
  hideError(errorElement);
  return true;
}
function validateImages(files, errorSelector, message) {
  const errorElement = document.querySelector(errorSelector);
  if (!files || files.length < 3) {
    showError(errorElement, message); // e.g. "Please upload at least one image!"
    return false;
  }
  hideError(errorElement);
  return true;
}
function validateImageCover(file, errorSelector, message) {
  const errorElement = document.querySelector(errorSelector);
  if (!file) {
    showError(errorElement, message); // e.g. "Cover image is required!"
    return false;
  }
  hideError(errorElement);
  return true;
}
function validateFieldForAddSection(value, errorSelector, message) {
  const errorElement = document.querySelector(errorSelector);
  if (value === '0') {
    showError(errorElement, message);
    return false;
  }
  if (!value || value.trim() === '') {
    showError(errorElement, message);
    return false;
  } else {
    hideError(errorElement);
    return true;
  }
}
async function validateEmailForAddSection(value, errorSelector, message) {
  const errorElement = document.querySelector(errorSelector);
  if (!value || value.trim() === '' || !/\S+@\S+\.\S+/.test(value)) {
    showError(errorElement, 'email is required!');
    return false;
  }
  // check if email already exists in database or not
  try {
    const res = await _axios.default.get("/api/v1/users/checkEmail/".concat(value));
    if (res.data.exists) {
      showError(errorElement, message);
      return false;
    }
  } catch (err) {
    console.error(err);
    showError(errorElement, 'Error checking email!');
    return false;
  }
  hideError(errorElement);
  return true;
}
function validatePasswordForAddSection(value, errorSelector, message) {
  const errorElement = document.querySelector(errorSelector);
  if (!value || value.trim() === '') {
    showError(errorElement, 'Password is required!');
    return false;
  } else if (!validator.isStrongPassword(value)) {
    showError(errorElement, message);
    return false;
  } else {
    hideError(errorElement);
    return true;
  }
}
function validatePasswordConfirmForAddSection(value1, value2, errorSelector, message) {
  const errorElement = document.querySelector(errorSelector);
  if (!value2 || value2.trim() === '') {
    showError(errorElement, 'Password confirmation is required!');
    return false;
  } else if (value1 !== value2) {
    showError(errorElement, message);
    return false;
  } else {
    hideError(errorElement);
    return true;
  }
}

// SHOW ERRORS
function showError(error, message) {
  error.textContent = message;
  error.style.color = 'red';
  error.style.fontSize = '14px';
  error.style.marginTop = '5px';
  error.style.marginBottom = '1rem';
}

// HIDE ERRORS
function hideError(error) {
  error.textContent = '';
}

// DELEGATION

// Book tour [/tour/:slug]
document.addEventListener('DOMContentLoaded', function () {
  // i want that only when user want to book tour => /tour/:id
  if (!window.location.pathname.includes('/tour/') || window.location.pathname.includes('/view/tour/') || window.location.pathname.includes('/update/tour/')) {
    return;
  }
  const dateInputs = document.querySelectorAll('input[name="tour-date"]');
  const ticketInput = document.getElementById('numTickets');
  const totalPrice = document.querySelector('.total');
  const bookButton = document.getElementById('book-tour');
  const basePrice = parseFloat(bookButton.getAttribute('data-tour-price'));
  const errorDate = document.querySelector('.error-date');
  const errorTickets = document.querySelector('.error-tickets');
  let selectedDate = '';
  let ticketCount = parseInt(ticketInput.value) || 1;
  let availableTickets = 0;
  function updateBookingInfo() {
    const total = basePrice * ticketCount;
    totalPrice.textContent = "".concat(total, " $");
    if (!selectedDate) {
      showError(errorDate, 'Please select a date!');
      return;
    }
    hideError(errorDate);
    bookButton.setAttribute('data-tour-date', selectedDate);
    bookButton.setAttribute('data-tour-price', total);
  }
  function showError(error, message) {
    error.textContent = message;
    error.style.color = 'red';
    error.style.fontSize = '14px';
    error.style.marginTop = '5px';
    error.style.marginBottom = '1rem';
  }
  function hideError(error) {
    error.textContent = '';
  }
  async function fetchTourDetails(tourId, tourDate) {
    try {
      const response = await _axios.default.get("/api/v1/tours/".concat(tourId));
      if (response.data.status !== 'success') throw new Error('Tour not found');
      const tour = response.data.data.data;
      const startDateEntry = tour.startDates.find(d => d.date === tourDate);
      if (startDateEntry) {
        availableTickets = tour.maxGroupSize - startDateEntry.bookedPersons;
        if (availableTickets == 0) {
          showError(errorTickets, 'There are no tickets available. Sold Out!');
          return;
        }
      } else {
        availableTickets = 0;
      }
      checkTicketAvailability();
    } catch (err) {
      (0, _alerts.showAlert)('error', err.response.data.message);
    }
  }
  function checkTicketAvailability() {
    if (!selectedDate) showError(errorDate, 'Please select a date!');else if (availableTickets == 0 && selectedDate) showError(errorTickets, 'There are no tickets available. Sold Out!');else if (ticketCount > availableTickets) showError(errorTickets, 'There are no tickets available. Please decrease the number of tickets.');else hideError(errorTickets);
  }
  ticketInput.addEventListener('input', function () {
    ticketCount = Math.max(1, parseInt(this.value) || 1);
    checkTicketAvailability();
    updateBookingInfo();
  });
  dateInputs.forEach(input => {
    input.addEventListener('change', async function (e) {
      selectedDate = this.value;
      hideError(errorDate);
      updateBookingInfo();
      const tourId = bookButton.getAttribute('data-tour-id');
      await fetchTourDetails(tourId, selectedDate);
    });
  });
  bookButton.addEventListener('click', function (event) {
    if (!selectedDate) {
      showError(errorDate, 'Please select a date!');
      event.preventDefault();
      return;
    }
    if (availableTickets == 0 && selectedDate) {
      showError(errorTickets, 'There are no tickets available. Sold Out!');
      event.preventDefault();
      return;
    }
    if (ticketCount > availableTickets) {
      showError(errorTickets, 'There are no tickets available. Please decrease the number of tickets.');
      event.preventDefault();
      return;
    }
    event.target.textContent = 'Processing...';
    // data-tour-id = tourId in javascript
    // data-tour-date = tourDate in javascript
    // tourId = event.target.dataset.tourId  === { tourId } = event.target.dataset
    const _event$target$dataset = event.target.dataset,
      tourId = _event$target$dataset.tourId,
      tourDate = _event$target$dataset.tourDate,
      tourPrice = _event$target$dataset.tourPrice;
    (0, _stripe.bookTour)(tourId, tourDate, tourPrice);
  });
});
if (signupForm) {
  signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    const role = document.getElementById('role').value;
    (0, _signup.signup)(name, email, password, passwordConfirm, role);
  });
}
if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    (0, _login.login)(email, password);
  });
}
if (logoutBtn) {
  logoutBtn.addEventListener('click', _login.logout);
}
if (forgetPasswordform) {
  forgetPasswordform.addEventListener('submit', async e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    (0, _login.forgotPassword)(email);
  });
}
if (resetPasswordForm) {
  resetPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    const token = document.querySelector('.form--reset-password').dataset.token;
    (0, _signup.resetPassword)(password, passwordConfirm, token);
  });
}
if (userDataForm) {
  // Preview user photo => show user photo when selecting a photo but not saved yet in database, should submit to be saved
  document.getElementById('photo').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document.querySelector('.form__user-photo').src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    // create form-data to send it as object with file inside it
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    // console.log(document.getElementById('photo').files[0]);
    (0, _updateSettings.updateSettings)(form, 'data');
  });
}
if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await (0, _updateSettings.updateSettings)({
      passwordCurrent,
      password,
      passwordConfirm
    }, 'password');
    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}
if (deleteMyAccount) {
  deleteMyAccount.addEventListener('click', async e => {
    e.preventDefault();
    const confirmDelete = confirm('Are you sure you want to delete your account?');
    if (!confirmDelete) return; // Stop execution if user clicks "Cancel"

    await (0, _login.deleteAccount)();
  });
}

// favorite tours
document.addEventListener('DOMContentLoaded', async () => {
  var _document$querySelect;
  if (!(window.location.origin + '/' === window.location.href || window.location.pathname.includes('overview') || window.location.pathname.includes('my-favorites-tours'))) {
    return;
  }
  const favoriteCountEl = document.querySelector('.nav__favorite-count');
  let userDataText = (_document$querySelect = document.querySelector('.user-hide')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.textContent.trim();

  // If user is logged in
  if (userDataText) {
    // Convert to valid JSON format
    // const validJsonText = userDataText
    //   .replace(/new ObjectId\('([^']+)'\)/g, '"$1"') // Convert ObjectId to string
    //   .replace(/(\w+):/g, '"$1":') // Ensure property names are quoted
    //   .replace(/'/g, '"'); // Replace single quotes with double quotes
    //   const userData = JSON.parse(validJsonText);
    const userData = JSON.parse(userDataText);
    const favoriteTours = userData.favoriteTours;

    // Highlight favorite tours
    document.querySelectorAll('.heart-icon').forEach(icon => {
      const tourId = icon.dataset.tourId;
      if (favoriteTours.includes(tourId)) {
        icon.classList.add('liked');
      }
    });

    // Add click event for logged-in users
    document.querySelectorAll('.heart-icon').forEach(icon => {
      icon.addEventListener('click', async function () {
        const tourId = this.dataset.tourId;
        try {
          const response = await _axios.default.patch('/api/v1/users/favorite-tour', {
            tourId
          });
          const count = response.data.favoriteCount;
          favoriteCountEl.textContent = count;
          favoriteCountEl.style.display = count === 0 ? 'none' : 'flex';
          if (response.data.status === 'success') {
            if (response.data.action === 'removed') {
              this.classList.remove('liked');
              (0, _alerts.showAlert)('remove', 'Removed from favorite tours');

              // Check the user in favoritesTours page and removed tour should reload to show the page after removed tour
              if (window.location.href.includes('my-favorites-tours')) {
                setTimeout(() => window.location.reload(), 2000);
              }
            } else {
              this.classList.add('liked');
              (0, _alerts.showAlert)('success', 'Added to favorite tours');
            }
          }
        } catch (err) {
          (0, _alerts.showAlert)('error', err.response.data.message);
        }
      });
    });
  } else {
    // If user is NOT logged in, show alert when clicking heart icon
    document.querySelectorAll('.heart-icon').forEach(icon => {
      icon.addEventListener('click', () => {
        (0, _alerts.showAlert)('error', 'You need to log in to favorite this tour!');
      });
    });
  }
});

// show and hide dropdown
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('/login') || window.location.pathname.includes('/signup') || window.location.pathname.includes('/confirm-email')) {
    return;
  }
  let userDataText = document.querySelector('.user-hide').textContent.trim();
  if (!userDataText) return;
  const userToggle = document.querySelector('.nav__user-toggle');
  const dropdown = document.querySelector('.nav__dropdown');
  userToggle.addEventListener('click', e => {
    e.preventDefault();
    dropdown.classList.toggle('show');
  });

  // Close dropdown if clicking outside
  document.addEventListener('click', e => {
    if (!userToggle.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove('show');
    }
  });
});

// if the user booked the tour from tour/:slug will go to create review
if (createReview) {
  createReview.addEventListener('click', async event => {
    event.preventDefault();
    const tourId = event.target.dataset.tourId;
    const userId = event.target.dataset.userId;
    const tourSlug = event.target.dataset.tourSlug;
    const errorMessageElement = document.getElementById('error-review');
    try {
      const response = await _axios.default.get("/api/v1/bookings/".concat(userId, "/").concat(tourId, "/bookings"));
      const isBooked = response.data.results;
      if (!isBooked) {
        errorMessageElement.textContent = 'You have not booked this tour.';
        errorMessageElement.style.display = 'flex';
        return;
      }
      window.location.href = "/".concat(tourSlug, "/create-review");
    } catch (error) {
      errorMessageElement.textContent = 'Something went wrong. Please try again.';
      errorMessageElement.style.display = 'flex';
    }
  });
}
if (reviewForm) {
  reviewForm.addEventListener('submit', e => {
    e.preventDefault();
    const btnReview = document.querySelector('.btn--createReview');
    const review = document.getElementById('review').value;
    const rating = document.getElementById('rating').value;
    const tourId = btnReview.getAttribute('data-tour-id');
    (0, _review.reviewTour)(tourId, review, rating);
  });
}
if (updateReview) {
  updateReview.addEventListener('click', e => {
    e.preventDefault();
    const reviewId = e.target.dataset.reviewId;
    const review = document.getElementById('review').value;
    const rating = document.getElementById('rating').value;
    (0, _review.updateReviewTour)(reviewId, review, rating);
  });
}
if (deleteReview) {
  deleteReview.addEventListener('click', async e => {
    e.preventDefault();
    const confirmDelete = confirm('Are you sure you want to delete this review?');
    if (!confirmDelete) return; // Stop execution if user clicks "Cancel"

    const reviewId = e.target.dataset.reviewId;
    await (0, _review.deleteReviewTour)(reviewId);
  });
}
if (addSection) {
  addSection.addEventListener('click', async e => {
    e.preventDefault();
    let data;
    let name = '';
    let price;
    let tour;
    let user;
    const section = e.target.dataset.section;
    switch (section) {
      case 'user':
        name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('password-confirm').value;
        const role = document.getElementById('role').value;
        let isValidUser = true;
        isValidUser &= validateFieldForAddSection(name, '.error-name', 'Name is required!');
        isValidUser &= await validateEmailForAddSection(email, '.error-email', 'Email already exists!');
        isValidUser &= validatePasswordForAddSection(password, '.error-password', 'Password must be strong. Please include at least 8 characters, one uppercase, one lowercase, one number, and one special character!');
        isValidUser &= validatePasswordConfirmForAddSection(password, passwordConfirm, '.error-password-confirm', 'Passwords do not match!');
        if (!isValidUser) return;
        data = {
          name,
          email,
          password,
          passwordConfirm,
          role
        };
        break;
      case 'tour':
        name = document.getElementById('name').value;
        price = document.getElementById('price').value;
        const duration = document.getElementById('duration').value;
        const maxGroupSize = document.getElementById('maxGroupSize').value;
        const difficulty = document.getElementById('difficulty').value;
        const summary = document.getElementById('summary').value;
        const description = document.getElementById('description').value;
        const imageCoverFile = document.getElementById('imageCover').files[0];
        const imagesFiles = document.getElementById('images').files;
        const startDate1 = document.getElementById('startDate1').value;
        const startDate2 = document.getElementById('startDate2').value;
        const startDate3 = document.getElementById('startDate3').value;
        const address = document.getElementById('address').value;
        const descriptionLocation = document.getElementById('description-location').value;
        const coordinates = document.getElementById('coordinates').value;
        let isValidTour = true;
        if (!(await validateTourName(name, '.error-name', 'Tour name already exists!'))) isValidTour = false;
        if (!validateFieldForAddSection(price, '.error-price', 'Price must be greater than 0!')) isValidTour = false;
        if (!validateFieldForAddSection(duration, '.error-duration', 'Duration  must be greater than 0!')) isValidTour = false;
        if (!validateFieldForAddSection(maxGroupSize, '.error-maxGroupSize', 'MaxGroupSize must be greater than 0!')) isValidTour = false;
        if (!validateFieldForAddSection(summary, '.error-summary', 'Summary is required!')) isValidTour = false;
        if (!validateFieldForAddSection(description, '.error-description', 'Description is required!')) isValidTour = false;
        if (!validateFieldForAddSection(coordinates, '.error-coordinates', 'Coordinates are required!')) isValidTour = false;
        if (!validateFieldForAddSection(address, '.error-address', 'Address is required!')) isValidTour = false;
        if (!validateFieldForAddSection(coordinates, '.error-description-location', 'Description Location are required!')) isValidTour = false;
        if (!validateImageCover(imageCoverFile, '.error-imageCover', 'Cover image is required!')) isValidTour = false;
        if (!validateImages(imagesFiles, '.error-images', 'three image are required!')) isValidTour = false;
        if (!validateDates([startDate1, startDate2, startDate3], '.error-dates', 'Please select three start date!')) isValidTour = false;

        // stop if invalid
        if (!isValidTour) return;

        // Convert startDates to the required format
        const startDates = [{
          date: new Date(startDate1).toISOString()
        }, {
          date: new Date(startDate2).toISOString()
        }, {
          date: new Date(startDate3).toISOString()
        }];

        // Convert coordinates to an array of numbers
        const _coordinates$split$ma = coordinates.split(',').map(Number),
          _coordinates$split$ma2 = _slicedToArray(_coordinates$split$ma, 2),
          lat = _coordinates$split$ma2[0],
          lng = _coordinates$split$ma2[1];

        // Create startLocation object
        const startLocation = {
          description: descriptionLocation,
          type: 'Point',
          coordinates: [lng, lat],
          address: address
        };
        data = new FormData();
        data.append('name', name);
        data.append('price', price);
        data.append('duration', duration);
        data.append('maxGroupSize', maxGroupSize);
        data.append('difficulty', difficulty);
        data.append('summary', summary);
        data.append('description', description);
        data.append('startDates', JSON.stringify(startDates));
        data.append('startLocation', JSON.stringify(startLocation));
        if (imageCoverFile) {
          data.append('imageCover', imageCoverFile);
        }
        for (let i = 0; i < imagesFiles.length; i++) {
          data.append('images', imagesFiles[i]);
        }
        break;
      case 'review':
        tour = document.getElementById('tour_name').value;
        user = document.getElementById('user_name').value;
        const review = document.getElementById('review').value;
        const rating = document.getElementById('rating').value;
        let isValidReview = true;

        // if at least one field have error[false] not sent data to createSectionByAdmin
        isValidReview &= validateFieldForAddSection(tour, '.error-tour', 'Please select a tour!');
        isValidReview &= validateFieldForAddSection(user, '.error-user', 'Please select a user!');
        isValidReview &= validateFieldForAddSection(review, '.error-review', 'Please enter a review!');
        isValidReview &= validateFieldForAddSection(rating, '.error-rating', 'Please enter a rating greater than 0!');
        if (!isValidReview) return;
        data = {
          tour,
          user,
          review,
          rating
        };
        break;
      case 'booking':
        tour = document.getElementById('tour_name').value;
        user = document.getElementById('user_name').value;
        price = document.querySelector('.total').textContent;
        const DateSelect = document.getElementById('tour_date').value;
        let isValid = true;
        // if at least one field have error[false] not sent data to createSectionByAdmin
        isValid &= validateFieldForAddSection(tour, '.error-tour', 'Please select a tour!');
        isValid &= validateFieldForAddSection(user, '.error-user', 'Please select a user!');
        isValid &= validateFieldForAddSection(DateSelect, '.error-date', 'Please select a date!');
        if (!isValid) return;
        data = {
          tour,
          user,
          price,
          DateSelect
        };
        break;
      default:
        return;
    }
    (0, _admin.createSectionByAdmin)(data, section);
  });
}

// add section => review, booking
document.addEventListener('DOMContentLoaded', () => {
  var _document$querySelect2;
  if (!window.location.pathname.includes('/add/')) return;
  const sectionType = (_document$querySelect2 = document.querySelector('[data-section]')) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.dataset.section;
  if (sectionType === 'review') {
    HandelReview();
  } else if (sectionType === 'booking') {
    HandelBooking();
  }
  function HandelReview() {
    // review
    const tourSelectAtReview = document.getElementById('tour_name');
    const userSelectAtReview = document.getElementById('user_name');
    const reviewInput = document.getElementById('review');
    const ratingInput = document.getElementById('rating');
    const errorTourAtReview = document.querySelector('.error-tour');
    const errorUserAtReview = document.querySelector('.error-user');
    const errorReview = document.querySelector('.error-review');
    const errorRating = document.querySelector('.error-rating');

    // Handle tour selection at review
    tourSelectAtReview.addEventListener('change', e => {
      const tourId = e.target.value;
      if (!tourId) {
        showError(errorTourAtReview, 'Please select a Tour!');
        return;
      }
      hideError(errorTourAtReview);
    });

    // Handle user selection at review
    userSelectAtReview.addEventListener('change', e => {
      const userId = e.target.value;
      if (!userId) {
        showError(errorUserAtReview, 'Please select a User!');
        return;
      }
      hideError(errorUserAtReview);
    });

    // Handle review input
    reviewInput.addEventListener('input', e => {
      const review = e.target.value;
      if (!review) {
        showError(errorReview, 'Please enter a review!');
        return;
      }
      hideError(errorReview);
    });

    // Handle rating input
    ratingInput.addEventListener('input', e => {
      const rating = e.target.value;
      if (!rating || rating <= 0) {
        showError(errorRating, 'Please enter a rating greater than 0!');
        return;
      }
      hideError(errorRating);
    });
  }
  function HandelBooking() {
    // booking
    const tourSelect = document.getElementById('tour_name');
    const userSelect = document.getElementById('user_name');
    const tourDateSelect = document.getElementById('tour_date');
    const numTicketsInput = document.getElementById('numOfTickets');
    const totalSpan = document.querySelector('.total');
    const errorTour = document.querySelector('.error-tour');
    const errorUser = document.querySelector('.error-user');
    const errorDate = document.querySelector('.error-date');
    const errorTickets = document.querySelector('.error-tickets');
    let selectedDate = '';
    let ticketCount = parseInt(numTicketsInput.value) || 1;
    let availableTickets = 0;
    let tourData = null;

    // Handle tour selection
    tourSelect.addEventListener('change', async e => {
      const tourId = e.target.value;
      if (!tourId) {
        showError(errorTour, 'Please select a Tour!');
        return;
      }
      try {
        const response = await _axios.default.get("/api/v1/tours/".concat(tourId));
        if (response.data.status !== 'success') throw new Error('Tour not found');
        tourData = response.data.data.data;
        hideError(errorTour);

        // Reset dates
        selectedDate = '';
        availableTickets = 0;
        tourDateSelect.innerHTML = "<option value=\"\">Select a tour date</option>";
        tourData.startDates.forEach(dateObj => {
          const dateStr = new Date(dateObj.date).toISOString();
          const opt = document.createElement('option');
          opt.value = dateStr;
          opt.textContent = new Date(dateStr).toLocaleDateString('en-GB', {
            weekday: 'short',
            day: 'numeric',
            month: 'long'
          });
          tourDateSelect.appendChild(opt);
        });
        ticketCount = Math.max(1, parseInt(numTicketsInput.value) || 1);
        updateTotal();
      } catch (err) {
        var _err$response;
        (0, _alerts.showAlert)('error', ((_err$response = err.response) === null || _err$response === void 0 || (_err$response = _err$response.data) === null || _err$response === void 0 ? void 0 : _err$response.message) || 'Error fetching tour data');
      }
    });
    userSelect.addEventListener('change', async e => {
      const userId = e.target.value;
      if (userId) {
        hideError(errorUser);
      }
    });

    // Handle tour date selection
    tourDateSelect.addEventListener('change', function () {
      if (!tourData) {
        showError(errorTour, 'Please select a Tour!');
        return;
      }
      selectedDate = this.value;
      if (!selectedDate) {
        showError(errorDate, 'Please select a tour date!');
        return;
      }
      hideError(errorDate);
      const startDateEntry = tourData.startDates.find(d => new Date(d.date).toISOString() === selectedDate);
      if (startDateEntry) {
        availableTickets = tourData.maxGroupSize - startDateEntry.bookedPersons;
        if (availableTickets === 0) {
          showError(errorTickets, 'There are no tickets available. Sold Out!');
          return;
        }
        if (ticketCount > availableTickets) {
          showError(errorTickets, 'Not enough tickets. Please decrease the number.');
          return;
        }
        hideError(errorTickets);
      }
      updateTotal();
    });

    // Handle ticket input changes
    numTicketsInput.addEventListener('input', function () {
      if (!tourData) {
        showError(errorTour, 'Please select a Tour!');
        return;
      } else {
        hideError(errorTour);
      }
      ticketCount = Math.max(1, parseInt(this.value) || 1);
      if (!selectedDate) {
        showError(errorDate, 'Please select a tour date!');
        return;
      } else {
        hideError(errorDate);
      }
      if (availableTickets === 0) {
        showError(errorTickets, 'There are no tickets available. Sold Out!');
      } else if (ticketCount > availableTickets) {
        showError(errorTickets, 'Not enough tickets. Please decrease the number.');
      } else {
        hideError(errorTickets);
      }
      updateTotal();
    });
    function updateTotal() {
      if (!tourData) {
        totalSpan.textContent = '0';
        return;
      }
      totalSpan.textContent = tourData.price * ticketCount;
    }
  }
});
if (updateSection) {
  updateSection.addEventListener('click', e => {
    e.preventDefault();
    let data;
    let name = '';
    let price;
    const section = e.target.dataset.section;
    const id = e.target.dataset.id;
    switch (section) {
      case 'user':
        name = document.getElementById('name').value;
        const role = document.getElementById('role').value;
        const active = document.querySelector('input[name="active"]:checked').value;
        data = {
          name,
          role,
          active
        };
        break;
      case 'tour':
        name = document.getElementById('name').value;
        price = document.getElementById('price').value;
        const duration = document.getElementById('duration').value;
        const maxGroupSize = document.getElementById('maxGroupSize').value;
        const difficulty = document.getElementById('difficulty').value;
        const summary = document.getElementById('summary').value;
        const description = document.getElementById('description').value;
        const imageCover = document.getElementById('imageCover').files[0];
        const secretTour = document.querySelector('input[name="secretTour"]:checked').value;
        data = new FormData();
        data.append('name', name);
        data.append('price', price);
        data.append('duration', duration);
        data.append('maxGroupSize', maxGroupSize);
        data.append('difficulty', difficulty);
        data.append('summary', summary);
        data.append('description', description);
        data.append('secretTour', secretTour);

        // Append the cover image if selected
        if (imageCover) {
          data.append('imageCover', imageCover);
        }
        break;
      case 'review':
        const review = document.getElementById('review').value;
        const rating = document.getElementById('rating').value;
        data = {
          review,
          rating
        };
        break;
      case 'booking':
        price = document.getElementById('price').value;
        const numbersOfPeople = document.getElementById('numbersOfPeople').value;
        data = {
          price,
          numbersOfPeople
        };
        break;
      default:
        return;
    }
    (0, _admin.updateSectionByAdmin)(data, section, id);
  });
}

// preview cover image on add and update tour using admin
document.addEventListener('DOMContentLoaded', function () {
  const imageInput = document.getElementById('imageCover');
  const imagePreview = document.querySelector('.form__tour-imageCover');
  if (imageInput) {
    imageInput.addEventListener('change', function (event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          if (imagePreview) {
            imagePreview.src = e.target.result; // Update preview image
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }
});
if (deleteItem) {
  document.querySelectorAll('.delete-item').forEach(button => {
    button.addEventListener('click', async e => {
      e.preventDefault();
      const confirmDelete = confirm('Are you sure you want to delete?');
      if (!confirmDelete) return; // Stop execution if user clicks "Cancel"
      const itemId = button.getAttribute('data-id');
      const section = button.getAttribute('data-section');
      await (0, _admin.deleteSectionByAdmin)(itemId, section);
    });
  });
}
},{"core-js/modules/es7.array.flat-map.js":"../../node_modules/core-js/modules/es7.array.flat-map.js","core-js/modules/es6.array.sort.js":"../../node_modules/core-js/modules/es6.array.sort.js","core-js/modules/es7.promise.finally.js":"../../node_modules/core-js/modules/es7.promise.finally.js","core-js/modules/es7.symbol.async-iterator.js":"../../node_modules/core-js/modules/es7.symbol.async-iterator.js","core-js/modules/es7.string.trim-left.js":"../../node_modules/core-js/modules/es7.string.trim-left.js","core-js/modules/es7.string.trim-right.js":"../../node_modules/core-js/modules/es7.string.trim-right.js","core-js/modules/web.timers.js":"../../node_modules/core-js/modules/web.timers.js","core-js/modules/web.immediate.js":"../../node_modules/core-js/modules/web.immediate.js","core-js/modules/web.dom.iterable.js":"../../node_modules/core-js/modules/web.dom.iterable.js","validator":"../../node_modules/validator/index.js","axios":"../../node_modules/axios/index.js","./alerts":"alerts.js","./login":"login.js","./updateSettings":"updateSettings.js","./signup":"signup.js","./stripe":"stripe.js","./review":"review.js","./admin":"admin.js"}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54593" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/bundle.js.map