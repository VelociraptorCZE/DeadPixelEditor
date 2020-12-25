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
})({"../../node_modules/grumpydi/src/GrumpyDI.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GrumpyDI;

/**
 * GrumpyDI
 * Copyright (c) Simon Raichl 2019
 * MIT License
 */
function GrumpyDI(container) {
  const objectNames = Object.keys(container);

  const registerObject = _registerObject.bind(container);

  const callOnInitFunction = _callOnInitFunction.bind(container);

  const objectRegisterCallback = objectName => {
    registerObject({
      object: container[objectName],
      alias: objectName
    });
  };

  objectNames.forEach(objectRegisterCallback);
  objectNames.forEach(callOnInitFunction);
  return {
    container,
    registerObject
  };
}

function _callOnInitFunction(objectName) {
  const instance = this[objectName];

  if (typeof instance.onInit === "function") {
    instance.onInit(this);
  }
}

function _registerObject({
  alias,
  object
}) {
  if (!(object instanceof Object)) {
    throw TypeError("Cannot register a non-object into DI!");
  }

  if (Array.isArray(object)) {
    const [_object, ...params] = object;
    this[alias] = new _object(this, ...params);
  } else {
    this[alias] = new object(this);
  }
}
},{}],"../../node_modules/grumpydi/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _GrumpyDI = _interopRequireDefault(require("./src/GrumpyDI.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _GrumpyDI.default;
exports.default = _default;
},{"./src/GrumpyDI.js":"../../node_modules/grumpydi/src/GrumpyDI.js"}],"core/Brush.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _default = function _default() {
  var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "#000";
  var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 32;

  _classCallCheck(this, _default);

  this.color = color;
  this.width = width;
};

exports.default = _default;
},{}],"core/PreviewCanvas.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _default = /*#__PURE__*/function () {
  function _default() {
    _classCallCheck(this, _default);
  }

  _createClass(_default, [{
    key: "onInit",
    value: function onInit(_ref) {
      var brush = _ref.brush,
          canvasManager = _ref.canvasManager;
      this.brush = brush;
      this.canvasManager = canvasManager;
      this.initCanvas();
    }
  }, {
    key: "initCanvas",
    value: function initCanvas() {
      var brush = this.brush,
          canvasManager = this.canvasManager;
      var previewContext = canvasManager.previewContext,
          mainContext = canvasManager.mainContext;
      mainContext.canvas.addEventListener("mousemove", function (_ref2) {
        var layerX = _ref2.layerX,
            layerY = _ref2.layerY;
        previewContext.clearRect(0, 0, previewContext.canvas.width, previewContext.canvas.height);
        previewContext.fillStyle = brush.color;
        previewContext.fillRect(canvasManager.getClosestCoordinate(layerX), canvasManager.getClosestCoordinate(layerY), brush.width, brush.width);
      });
    }
  }]);

  return _default;
}();

exports.default = _default;
},{}],"core/CanvasManager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _default = /*#__PURE__*/function () {
  function _default() {
    var _document$getElementB, _document$getElementB2;

    _classCallCheck(this, _default);

    this.previewContext = (_document$getElementB = document.getElementById("previewLayer")) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.getContext("2d");
    this.mainContext = (_document$getElementB2 = document.getElementById("mainLayer")) === null || _document$getElementB2 === void 0 ? void 0 : _document$getElementB2.getContext("2d");
  }

  _createClass(_default, [{
    key: "onInit",
    value: function onInit(_ref) {
      var brush = _ref.brush;
      this.brush = brush;
    }
  }, {
    key: "getClosestCoordinate",
    value: function getClosestCoordinate(position) {
      var brush = this.brush;
      var coordinatesCount = Math.ceil(position / brush.width) || 1;
      var possibleCoordinates = Array(coordinatesCount).fill().map(function (_, i) {
        return brush.width * i;
      });
      return possibleCoordinates.map(function (coordinate) {
        return {
          diff: Math.abs(position - coordinate),
          coordinate: coordinate
        };
      }).sort(function (_ref2, _ref3) {
        var diff1 = _ref2.diff;
        var diff2 = _ref3.diff;
        return diff1 - diff2;
      })[0].coordinate;
    }
  }]);

  return _default;
}();

exports.default = _default;
},{}],"app.js":[function(require,module,exports) {
"use strict";

var _grumpydi = _interopRequireDefault(require("grumpydi"));

var _Brush = _interopRequireDefault(require("./core/Brush"));

var _PreviewCanvas = _interopRequireDefault(require("./core/PreviewCanvas"));

var _CanvasManager = _interopRequireDefault(require("./core/CanvasManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _grumpydi.default)({
  brush: _Brush.default,
  previewCanvas: _PreviewCanvas.default,
  canvasManager: _CanvasManager.default
});
},{"grumpydi":"../../node_modules/grumpydi/index.js","./core/Brush":"core/Brush.js","./core/PreviewCanvas":"core/PreviewCanvas.js","./core/CanvasManager":"core/CanvasManager.js"}]},{},["app.js"], null)