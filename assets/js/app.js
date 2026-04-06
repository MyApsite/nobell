(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _scrollTo = _interopRequireDefault(require("./components/scroll-to"));
var _slider = _interopRequireDefault(require("./components/slider"));
var _burgerMenu = _interopRequireDefault(require("./components/burger-menu"));
var _popup = _interopRequireDefault(require("./components/popup"));
var _secondSection = _interopRequireDefault(require("./components/second-section"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// You can write a call and import your functions in this file.
//
// This file will be compiled into app.js and will not be minified.
// Feel free with using ES6 here.

(function ($) {
  // When DOM is ready
  $(function () {
    _scrollTo["default"].init();
    _slider["default"].init();
    _burgerMenu["default"].init();
    _popup["default"].init();
    _secondSection["default"].init();
    AOS.init();

    //VIDEO
    var video = document.getElementById('video');
    var button = document.querySelector('.video-btn');
    if (video && button) {
      button.addEventListener('click', function () {
        video.play().then(function () {
          button.classList.add('hidden');
        })["catch"](function (err) {
          console.log('Video play error:', err);
        });
      });
      video.addEventListener('click', function () {
        video.pause();
        button.classList.remove('hidden');
      });
    }

    //FAQ
    var items = document.querySelectorAll('.faq__item');
    if (!items.length) return;
    items.forEach(function (item) {
      var button = item.querySelector('.faq__question');
      var answer = item.querySelector('.faq__answer');
      if (!button || !answer) return;
      button.addEventListener('click', function () {
        var isOpen = item.classList.contains('active');
        items.forEach(function (i) {
          var a = i.querySelector('.faq__answer');
          i.classList.remove('active');
          if (a) a.style.height = 0;
        });
        if (!isOpen) {
          item.classList.add('active');
          answer.style.height = answer.scrollHeight + 'px';
        }
      });
    });

    //BURGER
    var burger = document.querySelector('.js-burger-toggle');
    if (burger) {
      var toggleBurgerClass = function toggleBurgerClass() {
        var shouldBeActive = window.scrollY >= window.innerHeight;
        if (shouldBeActive !== isActive) {
          burger.classList.toggle('scroll', shouldBeActive);
          isActive = shouldBeActive;
        }
      };
      var isActive = false;
      window.addEventListener('scroll', toggleBurgerClass, {
        passive: true
      });
    }

    //TO SLIDE
    // =========================
    // Бегущая строка
    // =========================
    var slider = document.querySelector(".js-slider-line");
    var speed = 0.8; // скорость в пикселях за кадр
    var scrollPos = 0;
    var animationId;
    var started = false;
    if (slider) {
      var step = function step() {
        scrollPos += speed;
        if (scrollPos >= slider.scrollWidth / 2) {
          scrollPos = 0;
        }
        slider.style.transform = "translateX(-".concat(scrollPos, "px)");
        animationId = requestAnimationFrame(step);
      };
      var startMarquee = function startMarquee() {
        if (!started) {
          started = true;
          step();
        }
      };
      var checkScroll = function checkScroll() {
        if (started) return; // если уже стартовали, не проверяем
        var rect = slider.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 4) {
          startMarquee();
        }
      };
      // Дублируем содержимое для бесконечной прокрутки
      slider.innerHTML += slider.innerHTML;
      window.addEventListener("scroll", checkScroll);
      checkScroll(); // проверка сразу при загрузке
    }

    // =========================
    // Плавный скролл по карточкам
    // =========================
    var links = document.querySelectorAll('.js-to-slide');
    if (links.length) {
      var DURATION = 1800;
      links.forEach(function (link) {
        link.addEventListener('click', function (e) {
          var href = this.getAttribute('href');
          if (!href || !href.startsWith('#')) return;
          var target = document.getElementById(href.substring(1));
          if (!target) return;
          e.preventDefault();
          var offset = 180;
          var startPosition = window.pageYOffset;
          var targetPosition = target.getBoundingClientRect().top + startPosition - offset;
          var distance = targetPosition - startPosition;
          var startTime = null;
          function animation(currentTime) {
            if (!startTime) startTime = currentTime;
            var timeElapsed = currentTime - startTime;
            var progress = Math.min(timeElapsed / DURATION, 1);
            var ease = easeInOutCubic(progress);
            window.scrollTo(0, startPosition + distance * ease);
            if (timeElapsed < DURATION) {
              requestAnimationFrame(animation);
            }
          }
          requestAnimationFrame(animation);
        });
      });
    }
    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
  });
})(jQuery);

},{"./components/burger-menu":2,"./components/popup":3,"./components/scroll-to":4,"./components/second-section":5,"./components/slider":6}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var BURGER = document.querySelector('.js-burger-open');
var BURGER_CLOSE = document.querySelector('.js-burger-close');
var NAV = document.querySelector('.js-burger');
var OVERLAY = document.querySelector('.js-overlay');
var BODY = document.querySelector('body');
var CLASS_OVERFLOW = 'overflow';
var CLASS_ACTIVE = 'active';
var CLASS_PANEL_ACTIVE = 'nav__panel--active';
var ROOT_PANEL = 'root';
var burgerMenu = function () {
  var burgerInit = function burgerInit() {
    if (!BURGER || !NAV) return;
    BURGER.addEventListener('click', toggleBurger);
    if (BURGER_CLOSE) {
      BURGER_CLOSE.addEventListener('click', closeBurger);
    }
    if (OVERLAY) {
      OVERLAY.addEventListener('click', closeBurger);
    }
    NAV.addEventListener('click', onNavClick);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && NAV.classList.contains(CLASS_ACTIVE)) {
        closeBurger();
      }
    });
  };
  var setActivePanel = function setActivePanel() {
    var panelId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ROOT_PANEL;
    if (!NAV) return;
    var panels = NAV.querySelectorAll('.js-burger-panel');
    if (!panels.length) return;
    panels.forEach(function (panel) {
      panel.classList.toggle(CLASS_PANEL_ACTIVE, panel.dataset.panel === panelId);
    });
  };
  var onNavClick = function onNavClick(e) {
    var submenuBtn = e.target.closest('.js-burger-submenu');
    if (submenuBtn && NAV.contains(submenuBtn)) {
      e.preventDefault();
      setActivePanel(submenuBtn.dataset.target);
      return;
    }
    var backBtn = e.target.closest('.js-burger-back');
    if (backBtn && NAV.contains(backBtn)) {
      e.preventDefault();
      setActivePanel(backBtn.dataset.target || ROOT_PANEL);
      return;
    }
    var link = e.target.closest('a');
    if (link && NAV.contains(link)) {
      closeBurger();
      setActivePanel(ROOT_PANEL);
    }
  };
  var toggleBurger = function toggleBurger() {
    if (BURGER.classList.contains(CLASS_ACTIVE)) {
      closeBurger();
    } else {
      openBurger();
    }
  };
  var openBurger = function openBurger() {
    BURGER.classList.add(CLASS_ACTIVE);
    NAV.classList.add(CLASS_ACTIVE);
    BODY.classList.add(CLASS_OVERFLOW);
    setActivePanel(ROOT_PANEL);
    if (OVERLAY) {
      OVERLAY.classList.add(CLASS_ACTIVE);
    }
  };
  var closeBurger = function closeBurger() {
    BURGER.classList.remove(CLASS_ACTIVE);
    NAV.classList.remove(CLASS_ACTIVE);
    BODY.classList.remove(CLASS_OVERFLOW);
    setActivePanel(ROOT_PANEL);
    if (OVERLAY) {
      OVERLAY.classList.remove(CLASS_ACTIVE);
    }
  };
  var init = function init() {
    burgerInit();
  };
  return {
    init: init,
    closeBurger: closeBurger
  };
}();
var _default = burgerMenu;
exports["default"] = _default;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var popup = function () {
  var OPEN_BTN = '.js-popup-open';
  var POPUP = '.js-popup';
  var OVERLAY = '.js-overlay';
  var CLASS_ACTIVE = 'active';
  var openButtons = null;
  var popupEl = null;
  var overlayEl = null;
  var openPopup = function openPopup(e) {
    if (e) e.preventDefault();
    if (!popupEl || !overlayEl) return;
    popupEl.classList.add(CLASS_ACTIVE);
    overlayEl.classList.add(CLASS_ACTIVE);
  };
  var closePopup = function closePopup() {
    if (!popupEl || !overlayEl) return;
    popupEl.classList.remove(CLASS_ACTIVE);
    overlayEl.classList.remove(CLASS_ACTIVE);
  };
  var bindEvents = function bindEvents() {
    openButtons.forEach(function (btn) {
      btn.addEventListener('click', openPopup);
    });
    overlayEl.addEventListener('click', closePopup);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closePopup();
      }
    });
  };
  var init = function init() {
    openButtons = document.querySelectorAll(OPEN_BTN);
    popupEl = document.querySelector(POPUP);
    overlayEl = document.querySelector(OVERLAY);
    if (!openButtons.length || !popupEl || !overlayEl) return;
    bindEvents();
  };
  return {
    init: init,
    open: openPopup,
    close: closePopup
  };
}();
var _default = popup;
exports["default"] = _default;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var NAV_LINKS = document.querySelectorAll('.js-link-to');
var scrollTo = function () {
  var DURATION = 800; // время анимации в ms

  var initScroll = function initScroll() {
    if (!NAV_LINKS.length) return;
    NAV_LINKS.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var href = e.currentTarget.getAttribute('href').substring(1);
        scrollToId(href);
      });
    });
  };
  var scrollToId = function scrollToId(id) {
    var target = document.getElementById(id);
    if (!target) return;
    var topOffset = 0;
    var fixHeader = document.querySelector('.js-fixed-header');
    if (fixHeader) {
      topOffset = fixHeader.offsetHeight;
    }
    var startPosition = window.pageYOffset;
    var targetPosition = target.getBoundingClientRect().top + startPosition - topOffset;
    var distance = targetPosition - startPosition;
    var startTime = null;
    var animation = function animation(currentTime) {
      if (!startTime) startTime = currentTime;
      var timeElapsed = currentTime - startTime;
      var progress = Math.min(timeElapsed / DURATION, 1);
      var ease = easeInOutQuad(progress);
      window.scrollTo(0, startPosition + distance * ease);
      if (timeElapsed < DURATION) {
        requestAnimationFrame(animation);
      }
    };
    requestAnimationFrame(animation);
  };
  var easeInOutQuad = function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  };
  var init = function init() {
    initScroll();
  };
  return {
    init: init,
    scrollToId: scrollToId
  };
}();
var _default = scrollTo;
exports["default"] = _default;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var autoScrollSection = function () {
  var DURATION = 800;
  var trigger;
  var target;
  var triggered = false;
  var checkPosition = function checkPosition() {
    if (triggered || !trigger || !target) return;
    var rect = trigger.getBoundingClientRect();
    var viewportHeight = window.innerHeight;
    var triggerPoint = viewportHeight * 0.8;
    if (rect.top <= triggerPoint) {
      triggered = true;
      scrollToTarget();
    }
  };
  var scrollToTarget = function scrollToTarget() {
    var topOffset = 0;
    var fixHeader = document.querySelector('.js-fixed-header');
    if (fixHeader) {
      topOffset = fixHeader.offsetHeight;
    }
    var startPosition = window.pageYOffset;
    var targetPosition = target.getBoundingClientRect().top + startPosition - topOffset;
    var distance = targetPosition - startPosition;
    var startTime = null;
    var animation = function animation(currentTime) {
      if (!startTime) startTime = currentTime;
      var timeElapsed = currentTime - startTime;
      var progress = Math.min(timeElapsed / DURATION, 1);
      var ease = easeInOutQuad(progress);
      window.scrollTo(0, startPosition + distance * ease);
      if (timeElapsed < DURATION) {
        requestAnimationFrame(animation);
      }
    };
    requestAnimationFrame(animation);
  };
  var easeInOutQuad = function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  };
  var init = function init() {
    trigger = document.querySelector('.js-second-section');
    target = document.getElementById('slider-section');
    if (!trigger || !target) return;
    window.addEventListener('scroll', checkPosition);
  };
  return {
    init: init
  };
}();
var _default = autoScrollSection;
exports["default"] = _default;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var swiperSlider = function () {
  var accountantInit = new Swiper('.js-card-slider', {
    slidesPerView: 1.285,
    spaceBetween: 10,
    // loop: true,
    freeMode: true,
    // speed: 10000,
    simulateTouch: true,
    allowTouchMove: true,
    // autoplay: {
    //   delay: 0,
    //   disableOnInteraction: false,
    // },

    mousewheel: {
      forceToAxis: true,
      sensitivity: 1
    },
    breakpoints: {
      768: {
        slidesPerView: 3
      },
      1024: {
        spaceBetween: 20
      },
      1440: {
        slidesPerView: 2.9,
        spaceBetween: 40
      }
    }
  });
  var newsSwiper = new Swiper('.news-blocks-swiper', {
    loop: true,
    slidesPerView: 'auto',
    spaceBetween: 10,
    speed: 6000,
    freeMode: true,
    freeModeMomentum: false,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
      pauseOnMouseEnter: false
    },
    allowTouchMove: true,
    grabCursor: true,
    breakpoints: {
      1024: {
        spaceBetween: 16
      }
    }
  });
  var recSlider = new Swiper('.js-rec-slider', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    speed: 800,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    navigation: {
      nextEl: '.js-next',
      prevEl: '.js-prev'
    },
    pagination: {
      el: '.js-pagination',
      clickable: true
    }
  });
  var init = function init() {};
  return {
    init: init
  };
}();
var _default = swiperSlider;
exports["default"] = _default;

},{}]},{},[1]);
