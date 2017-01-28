/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _oscring = __webpack_require__(1);

	var _oscring2 = _interopRequireDefault(_oscring);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var canvas = document.getElementById('container');
	var context = canvas.getContext('2d');

	var ring = new _oscring2.default({
	    canvas: canvas,
	    context: context
	});

	//init
	onResize();

	// keep canvas size same as window
	window.addEventListener('resize', onResize, true);
	function onResize() {
	    spreadCanvas();
	    ring.render();
	}
	function spreadCanvas() {
	    canvas.style.width = window.innerWidth + 'px';
	    canvas.style.height = window.innerHeight + 'px';
	    canvas.width = window.innerWidth;
	    canvas.height = window.innerHeight;
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var dots = [{
	    r: 100,
	    fi: 0
	}, {
	    r: 200,
	    fi: Math.PI / 4
	}, {
	    r: 100,
	    fi: Math.PI / 2
	}, {
	    r: 200,
	    fi: 3 * Math.PI / 4
	}, {
	    r: 100,
	    fi: Math.PI
	}, {
	    r: 200,
	    fi: 5 * Math.PI / 4
	}, {
	    r: 100,
	    fi: 3 * Math.PI / 2
	}, {
	    r: 200,
	    fi: 7 * Math.PI / 4
	}];

	var center = {
	    x: .5,
	    y: .5
	};

	var Oscring = function () {
	    function Oscring(_ref) {
	        var context = _ref.context,
	            canvas = _ref.canvas;

	        _classCallCheck(this, Oscring);

	        Object.assign(this, { context: context, canvas: canvas });
	    }

	    _createClass(Oscring, [{
	        key: 'render',
	        value: function render() {
	            var context = this.context;
	            var canvas = this.canvas;
	            var tx = void 0,
	                ty = void 0;
	            context.beginPath();
	            for (var i = 0; i < dots.length; i++) {
	                tx = Math.round(center.x * canvas.width + dots[i].r * Math.cos(dots[i].fi));
	                ty = Math.round(center.y * canvas.height + dots[i].r * Math.sin(dots[i].fi));
	                context.lineTo(tx, ty);
	            }
	            context.closePath();
	            context.strokeStyle = 'rgba(255, 170, 190, .5)';
	            context.lineWidth = 120;
	            context.lineJoin = 'round';
	            context.stroke();
	        }
	    }]);

	    return Oscring;
	}();

	exports.default = Oscring;

/***/ }
/******/ ]);