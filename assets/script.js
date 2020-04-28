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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/script.js":
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

var playerList = document.querySelectorAll(".video-wrapper"); // Регистриуем обработчики событий

playerList.forEach(function (p) {
  p.addEventListener("click", handlePlayerClick);
  var video = p.querySelector(".video");
  var contrast = p.querySelector(".contrast .settings_input");
  var brightness = p.querySelector(".brightness .settings_input");
  video.style.filter = "brightness(1) contrast(1)"; // Регистрируем яркость контраст

  contrast.addEventListener("input", function (e) {
    var filters = video.style.filter.split(" ");
    video.style.filter = "".concat(filters[0], " contrast(").concat(e.target.value, ")");
  });
  brightness.addEventListener("input", function (e) {
    var filters = video.style.filter.split(" ");
    video.style.filter = "brightness(".concat(e.target.value, ") ").concat(filters[1]);
  });
}); // Обработчик кликов

function handlePlayerClick(e) {
  this.classList.add("video-wrapper__fullscreen");
  var minimizeBtn = e.target.closest(".btn__minimize");
  var settingsBtn = e.target.closest(".btn__settings");
  var volumeBtn = e.target.closest(".btn__volume");
  var video = this.querySelector(".video");
  var settings = this.querySelector(".settings"); // MINIMIZE

  if (minimizeBtn) {
    video.muted = true;
    this.querySelector(".btn__volume .btn_icon").src = "assets/img/muted.svg";
    this.classList.remove("video-wrapper__fullscreen");
    settings.classList.remove("settings__visible");
  } // MUTE/UNMUTE


  if (volumeBtn) {
    video.muted = !video.muted;
    var volumeIcon = volumeBtn.querySelector(".btn_icon");

    if (video.muted) {
      volumeIcon.src = "assets/img/muted.svg";
    } else {
      volumeIcon.src = "assets/img/volume.svg"; // Инициализируем аналайзер

      initAnalazer();
    }
  } // Переключаем отоброжение панели Яркость/Контраст


  if (settingsBtn) {
    settings.classList.toggle("settings__visible");
  }
} // Создаем аналайзеры


var initAnalazer = function () {
  var audioCtx;

  function init() {
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
    playerList.forEach(function (p) {
      var video = p.querySelector(".video");
      var analyser = createAnalizer(audioCtx);
      var source = audioCtx.createMediaElementSource(video);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
      var bufferLength = analyser.frequencyBinCount;
      var ctxData = new Uint8Array(bufferLength);
      var volumeLevel = p.querySelector(".volume-bar");
      setInterval(function () {
        analyser.getByteFrequencyData(ctxData);
        var total = ctxData.reduce(function (acc, c) {
          return acc + c;
        }, 0);
        var everage = total / ctxData.length;
        var volumeIdx = everage / 100;
        volumeLevel.style.transform = "scaleY(".concat(volumeIdx, ")");
      }, 100);
    });
  }

  return function () {
    if (!audioCtx) {
      init();
    }
  };
}(playerList);

function createAnalizer(context) {
  var fftSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 32;
  var timeConstant = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var analyser = context.createAnalyser();
  analyser.fftSize = fftSize;
  analyser.smoothingTimeConstant = timeConstant;
  return analyser;
}

/***/ })

/******/ });
//# sourceMappingURL=script.js.map