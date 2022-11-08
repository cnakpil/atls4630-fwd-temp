/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/fullpage.js/dist/fullpage.js":
/*!***************************************************!*\
  !*** ./node_modules/fullpage.js/dist/fullpage.js ***!
  \***************************************************/
/***/ (function(module) {

/*!
* fullPage 4.0.12
* https://github.com/alvarotrigo/fullPage.js
*
* @license GPLv3 for open source use only
* or Fullpage Commercial License for commercial use
* http://alvarotrigo.com/fullPage/pricing/
*
* Copyright (C) 2018 http://alvarotrigo.com/fullPage - A project by Alvaro Trigo
*/

(function (global, factory) {
     true ? module.exports = factory() :
    0;
})(this, (function () { 'use strict';

    // https://tc39.github.io/ecma262/#sec-array.prototype.find
    if (!Array.prototype.find) {
      Object.defineProperty(Array.prototype, 'find', {
        value: function value(predicate) {
          // 1. Let O be ? ToObject(this value).
          if (this == null) {
            throw new TypeError('"this" is null or not defined');
          }

          var o = Object(this); // 2. Let len be ? ToLength(? Get(O, "length")).

          var len = o.length >>> 0; // 3. If IsCallable(predicate) is false, throw a TypeError exception.

          if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
          } // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.


          var thisArg = arguments[1]; // 5. Let k be 0.

          var k = 0; // 6. Repeat, while k < len

          while (k < len) {
            // a. Let Pk be ! ToString(k).
            // b. Let kValue be ? Get(O, Pk).
            // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
            // d. If testResult is true, return kValue.
            var kValue = o[k];

            if (predicate.call(thisArg, kValue, k, o)) {
              return kValue;
            } // e. Increase k by 1.


            k++;
          } // 7. Return undefined.


          return undefined;
        }
      });
    }

    // Production steps of ECMA-262, Edition 6, 22.1.2.1
    if (!Array.from) {
      Array.from = function () {
        var toStr = Object.prototype.toString;

        var isCallable = function isCallable(fn) {
          return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
        };

        var toInteger = function toInteger(value) {
          var number = Number(value);

          if (isNaN(number)) {
            return 0;
          }

          if (number === 0 || !isFinite(number)) {
            return number;
          }

          return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
        };

        var maxSafeInteger = Math.pow(2, 53) - 1;

        var toLength = function toLength(value) {
          var len = toInteger(value);
          return Math.min(Math.max(len, 0), maxSafeInteger);
        }; // The length property of the from method is 1.


        return function from(arrayLike
        /*, mapFn, thisArg */
        ) {
          // 1. Let C be the this value.
          var C = this; // 2. Let items be ToObject(arrayLike).

          var items = Object(arrayLike); // 3. ReturnIfAbrupt(items).

          if (arrayLike == null) {
            throw new TypeError('Array.from requires an array-like object - not null or undefined');
          } // 4. If mapfn is undefined, then let mapping be false.


          var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
          var T;

          if (typeof mapFn !== 'undefined') {
            // 5. else
            // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
            if (!isCallable(mapFn)) {
              throw new TypeError('Array.from: when provided, the second argument must be a function');
            } // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.


            if (arguments.length > 2) {
              T = arguments[2];
            }
          } // 10. Let lenValue be Get(items, "length").
          // 11. Let len be ToLength(lenValue).


          var len = toLength(items.length); // 13. If IsConstructor(C) is true, then
          // 13. a. Let A be the result of calling the [[Construct]] internal method
          // of C with an argument list containing the single item len.
          // 14. a. Else, Let A be ArrayCreate(len).

          var A = isCallable(C) ? Object(new C(len)) : new Array(len); // 16. Let k be 0.

          var k = 0; // 17. Repeat, while k < len… (also steps a - h)

          var kValue;

          while (k < len) {
            kValue = items[k];

            if (mapFn) {
              A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
            } else {
              A[k] = kValue;
            }

            k += 1;
          } // 18. Let putStatus be Put(A, "length", len, true).


          A.length = len; // 20. Return A.

          return A;
        };
      }();
    }

    var win = window;
    var doc = document;
    var isTouchDevice = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/);
    var isMacDevice = /(Mac|iPhone|iPod|iPad)/i.test(win.navigator.userAgent); // @ts-ignore

    var isTouch = 'ontouchstart' in win || navigator.msMaxTouchPoints > 0 || navigator.maxTouchPoints;
    var isIE11 = !!window.MSInputMethodContext && !!document.documentMode; // taken from https://github.com/udacity/ud891/blob/gh-pages/lesson2-focus/07-modals-and-keyboard-traps/solution/modal.js

    var focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]'; // cache common elements

    var FP = {
      test: {},
      shared: {}
    };
    var extensions = ['parallax', 'scrollOverflowReset', 'dragAndMove', 'offsetSections', 'fadingEffect', 'responsiveSlides', 'continuousHorizontal', 'interlockedSlides', 'scrollHorizontally', 'resetSliders', 'cards', 'dropEffect', 'waterEffect'];

    /**
    * forEach polyfill for IE
    * https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach#Browser_Compatibility
    */

    if (win.NodeList && !NodeList.prototype.forEach) {
      NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;

        for (var i = 0; i < this.length; i++) {
          callback.call(thisArg, this[i], i, this);
        }
      };
    }

    if (typeof Object.assign != 'function') {
      // Must be writable: true, enumerable: false, configurable: true
      Object.defineProperty(Object, 'assign', {
        value: function assign(target, varArgs) {

          if (target == null) {
            // TypeError if undefined or null
            throw new TypeError('Cannot convert undefined or null to object');
          }

          var to = Object(target);

          for (var index = 1; index < arguments.length; index++) {
            var nextSource = arguments[index];

            if (nextSource != null) {
              // Skip over if undefined or null
              for (var nextKey in nextSource) {
                // Avoid bugs when hasOwnProperty is shadowed
                if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                  to[nextKey] = nextSource[nextKey];
                }
              }
            }
          }

          return to;
        },
        writable: true,
        configurable: true
      });
    }

    // https://stackoverflow.com/questions/51719553/padstart-not-working-in-ie11
    // https://github.com/behnammodi/polyfill/blob/master/string.polyfill.js
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
    if (!String.prototype.padStart) {
      String.prototype.padStart = function padStart(targetLength, padString) {
        targetLength = targetLength >> 0; //truncate if number or convert non-number to 0;

        padString = String(typeof padString !== 'undefined' ? padString : ' ');

        if (this.length > targetLength) {
          return String(this);
        } else {
          targetLength = targetLength - this.length;

          if (targetLength > padString.length) {
            padString += Array.apply(null, Array(targetLength)).map(function () {
              return padString;
            }).join("");
          }

          return padString.slice(0, targetLength) + String(this);
        }
      };
    }

    //utils
    /**
    * Shows a message in the console of the given type.
    */

    function showError(type, text) {
      win.console && win.console[type] && win.console[type]('fullPage: ' + text);
    }
    function isVisible(el) {
      var style = win.getComputedStyle(el);
      return style.display !== 'none';
    }
    function getVisible(elements) {
      return Array.from(elements).filter(function (e) {
        return isVisible(e);
      });
    }
    /**
    * Equivalent of jQuery function $().
    */

    function $(selector, context) {
      context = arguments.length > 1 ? context : document;
      return context ? context.querySelectorAll(selector) : null;
    }
    /**
    * Extends a given Object properties and its childs.
    */

    function deepExtend(out) {
      out = out || {};

      for (var i = 1, len = arguments.length; i < len; ++i) {
        var obj = arguments[i];

        if (!obj) {
          continue;
        }

        for (var key in obj) {
          if (!obj.hasOwnProperty(key) || key == '__proto__' || key == 'constructor') {
            continue;
          } // based on https://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/


          if (Object.prototype.toString.call(obj[key]) === '[object Object]') {
            out[key] = deepExtend(out[key], obj[key]);
            continue;
          }

          out[key] = obj[key];
        }
      }

      return out;
    }
    /**
    * Checks if the passed element contains the passed class.
    */

    function hasClass(el, className) {
      if (el == null) {
        return false;
      }

      return el.classList.contains(className);
    }
    /**
    * Gets the window height. Crossbrowser.
    */

    function getWindowHeight() {
      return 'innerHeight' in win ? win.innerHeight : doc.documentElement.offsetHeight;
    }
    /**
    * Gets the window width.
    */

    function getWindowWidth() {
      return win.innerWidth;
    }
    /**
    * Set's the CSS properties for the passed item/s.
    * @param {NodeList|HTMLElement|Object} items
    * @param {Object} props css properties and values.
    */

    function css(items, props) {
      items = getList(items);
      var key;

      for (key in props) {
        if (props.hasOwnProperty(key)) {
          if (key !== null) {
            for (var i = 0; i < items.length; i++) {
              var item = items[i];
              item.style[key] = props[key];
            }
          }
        }
      }

      return items;
    }
    /**
    * Gets the previous element to the passed element.
    */

    function prev(item) {
      return item.previousElementSibling;
    }
    /**
    * Gets the next element to the passed element.
    */

    function next(item) {
      return item.nextElementSibling;
    }
    /**
    * Gets the last element from the passed list of elements.
    */

    function last(item) {
      return item[item.length - 1];
    }
    /**
    * Gets index from the passed element.
    * @param {String} selector is optional.
    */

    function index(item, selector) {
      item = isArrayOrList(item) ? item[0] : item;
      var children = selector != null ? $(selector, item.parentNode) : item.parentNode.childNodes;
      var num = 0;

      for (var i = 0; i < children.length; i++) {
        if (children[i] == item) return num;
        if (children[i].nodeType == 1) num++;
      }

      return -1;
    }
    /**
    * Gets an iterable element for the passed element/s
    */

    function getList(item) {
      return !isArrayOrList(item) ? [item] : item;
    }
    /**
    * Adds the display=none property for the passed element/s
    */

    function hide(el) {
      el = getList(el);

      for (var i = 0; i < el.length; i++) {
        el[i].style.display = 'none';
      }

      return el;
    }
    /**
    * Adds the display=block property for the passed element/s
    */

    function show(el) {
      el = getList(el);

      for (var i = 0; i < el.length; i++) {
        el[i].style.display = 'block';
      }

      return el;
    }
    /**
    * Checks if the passed element is an iterable element or not
    */

    function isArrayOrList(el) {
      return Object.prototype.toString.call(el) === '[object Array]' || Object.prototype.toString.call(el) === '[object NodeList]';
    }
    /**
    * Adds the passed class to the passed element/s
    */

    function addClass(el, className) {
      el = getList(el);

      for (var i = 0; i < el.length; i++) {
        var item = el[i];
        item.classList.add(className);
      }

      return el;
    }
    /**
    * Removes the passed class to the passed element/s
    * @param {String} `className` can be multiple classnames separated by whitespace
    */

    function removeClass(el, className) {
      el = getList(el);
      var classNames = className.split(' ');

      for (var a = 0; a < classNames.length; a++) {
        className = classNames[a];

        for (var i = 0; i < el.length; i++) {
          var item = el[i];
          item.classList.remove(className);
        }
      }

      return el;
    }
    /**
    * Appends the given element ot the given parent.
    */

    function appendTo(el, parent) {
      parent.appendChild(el);
    }
    /**
    Usage:

    var wrapper = document.createElement('div');
    wrapper.className = 'fp-slides';
    wrap($('.slide'), wrapper);

    https://jsfiddle.net/qwzc7oy3/15/ (vanilla)
    https://jsfiddle.net/oya6ndka/1/ (jquery equivalent)
    */

    function wrap(toWrap, wrapper, isWrapAll) {
      var newParent;
      wrapper = wrapper || doc.createElement('div');

      for (var i = 0; i < toWrap.length; i++) {
        var item = toWrap[i];

        if (isWrapAll && !i || !isWrapAll) {
          newParent = wrapper.cloneNode(true);
          item.parentNode.insertBefore(newParent, item);
        }

        newParent.appendChild(item);
      }

      return toWrap;
    }
    /**
    Usage:
    var wrapper = document.createElement('div');
    wrapper.className = 'fp-slides';
    wrap($('.slide'), wrapper);

    https://jsfiddle.net/qwzc7oy3/27/ (vanilla)
    https://jsfiddle.net/oya6ndka/4/ (jquery equivalent)
    */

    function wrapAll(toWrap, wrapper) {
      wrap(toWrap, wrapper, true);
    }
    /**
    * Usage:
    * wrapInner(document.querySelector('#pepe'), '<div class="test">afdas</div>');
    * wrapInner(document.querySelector('#pepe'), element);
    *
    * https://jsfiddle.net/zexxz0tw/6/
    *
    * https://stackoverflow.com/a/21817590/1081396
    */

    function wrapInner(parent, wrapper) {
      parent.appendChild(wrapper);

      while (parent.firstChild !== wrapper) {
        wrapper.appendChild(parent.firstChild);
      }
    }
    /**
    * Usage:
    * unwrap(document.querySelector('#pepe'));
    * unwrap(element);
    *
    * https://jsfiddle.net/szjt0hxq/1/
    *
    */

    function unwrap(wrapper) {
      var wrapperContent = doc.createDocumentFragment();

      while (wrapper.firstChild) {
        wrapperContent.appendChild(wrapper.firstChild);
      }

      wrapper.parentNode.replaceChild(wrapperContent, wrapper);
    }
    /**
    * http://stackoverflow.com/questions/22100853/dom-pure-javascript-solution-to-jquery-closest-implementation
    * Returns the element or `false` if there's none
    */

    function closest(el, selector) {
      if (el && el.nodeType === 1) {
        if (matches(el, selector)) {
          return el;
        }

        return closest(el.parentNode, selector);
      }

      return null;
    }
    /**
    * Places one element (rel) after another one or group of them (reference).
    * @param {HTMLElement} reference
    * @param {HTMLElement|NodeList|String|Array} el
    * https://jsfiddle.net/9s97hhzv/1/
    */

    function after(reference, el) {
      insertBefore(reference, reference.nextSibling, el);
    }
    /**
    * Places one element (rel) before another one or group of them (reference).
    * @param {HTMLElement} reference
    * @param {HTMLElement|NodeList|String|Array} el
    * https://jsfiddle.net/9s97hhzv/1/
    */

    function before(reference, el) {
      insertBefore(reference, reference, el);
    }
    /**
    * Based in https://stackoverflow.com/a/19316024/1081396
    * and https://stackoverflow.com/a/4793630/1081396
    */

    function insertBefore(reference, beforeElement, el) {
      if (!isArrayOrList(el)) {
        if (typeof el == 'string') {
          el = createElementFromHTML(el);
        }

        el = [el];
      }

      for (var i = 0; i < el.length; i++) {
        reference.parentNode.insertBefore(el[i], beforeElement);
      }
    } //http://stackoverflow.com/questions/3464876/javascript-get-window-x-y-position-for-scroll

    function getScrollTop() {
      var docElement = doc.documentElement;
      return (win.pageYOffset || docElement.scrollTop) - (docElement.clientTop || 0);
    }
    /**
    * Gets the siblings of the passed element
    */

    function siblings(el) {
      return Array.prototype.filter.call(el.parentNode.children, function (child) {
        return child !== el;
      });
    }
    function preventDefault(event) {
      event.preventDefault();
    }
    function getAttr(el, attr) {
      return el.getAttribute(attr);
    }
    function docAddEvent(event, callback, options) {
      doc.addEventListener(event, callback, options === 'undefined' ? null : options);
    }
    function windowAddEvent(event, callback, options) {
      win.addEventListener(event, callback, options === 'undefined' ? null : options);
    }
    function docRemoveEvent(event, callback, options) {
      doc.removeEventListener(event, callback, options === 'undefined' ? null : options);
    }
    function windowRemoveEvent(event, callback, options) {
      win.removeEventListener(event, callback, options === 'undefined' ? null : options);
    }
    /**
    * Determines whether the passed item is of function type.
    */

    function isFunction(item) {
      if (typeof item === 'function') {
        return true;
      }

      var type = Object.prototype.toString.call(item);
      return type === '[object Function]' || type === '[object GeneratorFunction]';
    }
    /**
    * Trigger custom events
    */

    function trigger(el, eventName, data) {
      var event;
      data = typeof data === 'undefined' ? {} : data; // Native

      if (typeof win.CustomEvent === "function") {
        event = new CustomEvent(eventName, {
          detail: data
        });
      } else {
        event = doc.createEvent('CustomEvent');
        event.initCustomEvent(eventName, true, true, data);
      }

      el.dispatchEvent(event);
    }
    /**
    * Polyfill of .matches()
    */

    function matches(el, selector) {
      return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
    }
    /**
    * Toggles the visibility of the passed element el.
    */

    function toggle(el, value) {
      if (typeof value === "boolean") {
        for (var i = 0; i < el.length; i++) {
          el[i].style.display = value ? 'block' : 'none';
        }
      } //we don't use it in other way, so no else :)


      return el;
    }
    /**
    * Creates a HTMLElement from the passed HTML string.
    * https://stackoverflow.com/a/494348/1081396
    */

    function createElementFromHTML(htmlString) {
      var div = doc.createElement('div');
      div.innerHTML = htmlString.trim(); // Change this to div.childNodes to support multiple top-level nodes

      return div.firstChild;
    }
    /**
    * Removes the passed item/s from the DOM.
    */

    function remove(items) {
      items = getList(items);

      for (var i = 0; i < items.length; i++) {
        var item = items[i];

        if (item && item.parentElement) {
          item.parentNode.removeChild(item);
        }
      }
    } //https://jsfiddle.net/w1rktecz/

    function untilAll(item, selector, fn) {
      var sibling = item[fn];
      var siblings = [];

      while (sibling) {
        if (matches(sibling, selector) || selector == null) {
          siblings.push(sibling);
        }

        sibling = sibling[fn];
      }

      return siblings;
    }
    /**
    * Gets all next elements matching the passed selector.
    */

    function nextAll(item, selector) {
      return untilAll(item, selector, 'nextElementSibling');
    }
    /**
    * Gets all previous elements matching the passed selector.
    */

    function prevAll(item, selector) {
      return untilAll(item, selector, 'previousElementSibling');
    }
    /**
    * Converts an object to an array.
    */

    function toArray(objectData) {
      return Object.keys(objectData).map(function (key) {
        return objectData[key];
      });
    }
    function getLast(items) {
      return items[items.length - 1];
    }
    /**
    * Gets the average of the last `number` elements of the given array.
    */

    function getAverage(elements, number) {
      var sum = 0; //taking `number` elements from the end to make the average, if there are not enought, 1

      var lastElements = elements.slice(Math.max(elements.length - number, 1));

      for (var i = 0; i < lastElements.length; i++) {
        sum = sum + lastElements[i];
      }

      return Math.ceil(sum / number);
    }
    /**
    * Sets the value for the given attribute from the `data-` attribute with the same suffix
    * ie: data-srcset ==> srcset  |  data-src ==> src
    */

    function setSrc(element, attribute) {
      element.setAttribute(attribute, getAttr(element, 'data-' + attribute));
      element.removeAttribute('data-' + attribute);
    }
    function getParentsUntil(item, topParentSelector) {
      var parents = [item];

      do {
        item = item.parentNode;
        parents.push(item);
      } while (!matches(item, topParentSelector));

      return parents;
    } //utils are public, so we can use it wherever we want
    // @ts-ignore

    window["fp_utils"] = {
      "$": $,
      "deepExtend": deepExtend,
      "hasClass": hasClass,
      "getWindowHeight": getWindowHeight,
      "css": css,
      "prev": prev,
      "next": next,
      "last": last,
      "index": index,
      "getList": getList,
      "hide": hide,
      "show": show,
      "isArrayOrList": isArrayOrList,
      "addClass": addClass,
      "removeClass": removeClass,
      "appendTo": appendTo,
      "wrap": wrap,
      "wrapAll": wrapAll,
      "unwrap": unwrap,
      "closest": closest,
      "after": after,
      "before": before,
      "insertBefore": insertBefore,
      "getScrollTop": getScrollTop,
      "siblings": siblings,
      "preventDefault": preventDefault,
      "isFunction": isFunction,
      "trigger": trigger,
      "matches": matches,
      "toggle": toggle,
      "createElementFromHTML": createElementFromHTML,
      "remove": remove,
      // "filter": filter,
      "untilAll": untilAll,
      "nextAll": nextAll,
      "prevAll": prevAll,
      "showError": showError
    };

    var utils = /*#__PURE__*/Object.freeze({
        __proto__: null,
        showError: showError,
        isVisible: isVisible,
        getVisible: getVisible,
        $: $,
        deepExtend: deepExtend,
        hasClass: hasClass,
        getWindowHeight: getWindowHeight,
        getWindowWidth: getWindowWidth,
        css: css,
        prev: prev,
        next: next,
        last: last,
        index: index,
        getList: getList,
        hide: hide,
        show: show,
        isArrayOrList: isArrayOrList,
        addClass: addClass,
        removeClass: removeClass,
        appendTo: appendTo,
        wrap: wrap,
        wrapAll: wrapAll,
        wrapInner: wrapInner,
        unwrap: unwrap,
        closest: closest,
        after: after,
        before: before,
        insertBefore: insertBefore,
        getScrollTop: getScrollTop,
        siblings: siblings,
        preventDefault: preventDefault,
        getAttr: getAttr,
        docAddEvent: docAddEvent,
        windowAddEvent: windowAddEvent,
        docRemoveEvent: docRemoveEvent,
        windowRemoveEvent: windowRemoveEvent,
        isFunction: isFunction,
        trigger: trigger,
        matches: matches,
        toggle: toggle,
        createElementFromHTML: createElementFromHTML,
        remove: remove,
        untilAll: untilAll,
        nextAll: nextAll,
        prevAll: prevAll,
        toArray: toArray,
        getLast: getLast,
        getAverage: getAverage,
        setSrc: setSrc,
        getParentsUntil: getParentsUntil
    });

    function _typeof(obj) {
      "@babel/helpers - typeof";

      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function (obj) {
          return typeof obj;
        };
      } else {
        _typeof = function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
      }

      return _typeof(obj);
    }

    var EventEmitter = {
      events: {},
      on: function on(event, listener) {
        var _this = this;

        if (_typeof(this.events[event]) !== 'object') {
          this.events[event] = [];
        }

        this.events[event].push(listener);
        return function () {
          return _this.removeListener(event, listener);
        };
      },
      removeListener: function removeListener(event, listener) {
        if (_typeof(this.events[event]) === 'object') {
          var idx = this.events[event].indexOf(listener);

          if (idx > -1) {
            this.events[event].splice(idx, 1);
          }
        }
      },
      emit: function emit(event) {
        var _this2 = this;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        if (_typeof(this.events[event]) === 'object') {
          this.events[event].forEach(function (listener) {
            return listener.apply(_this2, args);
          });
        }
      },
      once: function once(event, listener) {
        var _this3 = this;

        var remove = this.on(event, function () {
          remove();

          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          listener.apply(_this3, args);
        });
      }
    };

    var state = {
      numSections: 0,
      numSlides: 0,
      slides: [],
      sections: [],
      activeSection: null,
      scrollTrigger: null,
      isBeyondFullpage: false,
      aboutToScrollToFullPage: false,
      slideMoving: false,
      isResizing: false,
      isScrolling: false,
      lastScrolledDestiny: undefined,
      lastScrolledSlide: undefined,
      activeAnimation: false,
      canScroll: true,
      touchDirection: 'none',
      wheelDirection: 'none',
      isGrabbing: false,
      isUsingWheel: false,
      isWindowFocused: true,
      previousDestTop: 0,
      windowsHeight: getWindowHeight(),
      isDoingContinousVertical: false,
      timeouts: {},
      scrollY: 0,
      scrollX: 0
    }; // @ts-ignore

    win.state = state;
    function setState(props) {
      Object.assign(state, props);
    }
    function getState() {
      return state;
    }
    function getActivePanel() {
      return state.activeSection && state.activeSection.activeSlide ? state.activeSection.activeSlide : state.activeSection;
    }

    var events = {
      onAfterRenderNoAnchor: 'onAfterRenderNoAnchor',
      onClickOrTouch: 'onClickOrTouch',
      moveSlideLeft: 'moveSlideLeft',
      moveSlideRight: 'moveSlideRight',
      onInitialise: 'onInitialise',
      beforeInit: 'beforeInit',
      bindEvents: 'bindEvents',
      onDestroy: 'onDestroy',
      contentChanged: 'contentChanged',
      onScrollOverflowScrolled: 'onScrollOverflowScrolled',
      onScrollPageAndSlide: 'onScrollPageAndSlide',
      onKeyDown: 'onKeyDown',
      onMenuClick: 'onMenuClick',
      scrollPage: 'scrollPage',
      landscapeScroll: 'landscapeScroll',
      scrollBeyondFullpage: 'scrollBeyondFullpage',
      onPerformMovement: 'onPerformMovement',
      afterSectionLoads: 'afterSectionLoads',
      afterSlideLoads: 'afterSlideLoads'
    };

    EventEmitter.on(events.bindEvents, bindEvents$c);

    function bindEvents$c() {
      //Scrolls to the section when clicking the navigation bullet
      //simulating the jQuery .on('click') event using delegation
      ['click', 'touchstart'].forEach(function (eventName) {
        docAddEvent(eventName, delegatedEvents);
      });
      windowAddEvent('focus', focusHandler);
      internalEvents();
    }

    function internalEvents() {
      EventEmitter.on(events.onDestroy, onDestroy$8);
    }

    function delegatedEvents(e) {
      EventEmitter.emit(events.onClickOrTouch, {
        e: e,
        target: e.target
      });
    }

    function onDestroy$8() {
      ['click', 'touchstart'].forEach(function (eventName) {
        docRemoveEvent(eventName, delegatedEvents);
      });
    } // changing isWindowFocused to true on focus event


    function focusHandler() {
      setState({
        isWindowFocused: true
      });
    }

    // keeping central set of classnames and selectors
    var WRAPPER = 'fullpage-wrapper';
    var WRAPPER_SEL = '.' + WRAPPER; // slimscroll

    var RESPONSIVE = 'fp-responsive';
    var NO_TRANSITION = 'fp-notransition';
    var DESTROYED = 'fp-destroyed';
    var ENABLED = 'fp-enabled';
    var VIEWING_PREFIX = 'fp-viewing';
    var ACTIVE = 'active';
    var ACTIVE_SEL = '.' + ACTIVE;
    var COMPLETELY = 'fp-completely';
    var COMPLETELY_SEL = '.' + COMPLETELY; // section

    var SECTION_DEFAULT_SEL = '.section';
    var SECTION = 'fp-section';
    var SECTION_SEL = '.' + SECTION;
    var SECTION_ACTIVE_SEL = SECTION_SEL + ACTIVE_SEL;
    var TABLE_CELL = 'fp-tableCell';
    var TABLE_CELL_SEL = '.' + TABLE_CELL;
    var AUTO_HEIGHT = 'fp-auto-height';
    var AUTO_HEIGHT_SEL = '.' + AUTO_HEIGHT;
    var AUTO_HEIGHT_RESPONSIVE = 'fp-auto-height-responsive';
    var AUTO_HEIGHT_RESPONSIVE_SEL = '.' + AUTO_HEIGHT_RESPONSIVE;
    var NORMAL_SCROLL = 'fp-normal-scroll';

    var SECTION_NAV = 'fp-nav';
    var SECTION_NAV_SEL = '#' + SECTION_NAV;
    var SECTION_NAV_TOOLTIP = 'fp-tooltip';
    var SECTION_NAV_TOOLTIP_SEL = '.' + SECTION_NAV_TOOLTIP;
    var SHOW_ACTIVE_TOOLTIP = 'fp-show-active'; // slide

    var SLIDE_DEFAULT_SEL = '.slide';
    var SLIDE = 'fp-slide';
    var SLIDE_SEL = '.' + SLIDE;
    var SLIDE_ACTIVE_SEL = SLIDE_SEL + ACTIVE_SEL;
    var SLIDES_WRAPPER = 'fp-slides';
    var SLIDES_WRAPPER_SEL = '.' + SLIDES_WRAPPER;
    var SLIDES_CONTAINER = 'fp-slidesContainer';
    var SLIDES_CONTAINER_SEL = '.' + SLIDES_CONTAINER;
    var TABLE = 'fp-table';
    var OVERFLOW = 'fp-overflow';
    var OVERFLOW_SEL = '.' + OVERFLOW;
    var IS_OVERFLOW = 'fp-is-overflow'; // slide nav

    var SLIDES_NAV = 'fp-slidesNav';
    var SLIDES_NAV_SEL = '.' + SLIDES_NAV;
    var SLIDES_NAV_LINK_SEL = SLIDES_NAV_SEL + ' a';
    var SLIDES_STYLED_ARROW = 'fp-arrow';
    var SLIDES_ARROW = 'fp-controlArrow';
    var SLIDES_ARROW_SEL = '.' + SLIDES_ARROW;
    var SLIDES_PREV = 'fp-prev';
    var SLIDES_PREV_SEL = '.' + SLIDES_PREV;
    var SLIDES_ARROW_PREV_SEL = SLIDES_ARROW_SEL + SLIDES_PREV_SEL;
    var SLIDES_NEXT = 'fp-next';
    var SLIDES_NEXT_SEL = '.' + SLIDES_NEXT;
    var SLIDES_ARROW_NEXT_SEL = SLIDES_ARROW_SEL + SLIDES_NEXT_SEL;

    var defaultOptions = {
      //navigation
      menu: false,
      anchors: [],
      lockAnchors: false,
      navigation: false,
      navigationPosition: 'right',
      navigationTooltips: [],
      showActiveTooltip: false,
      slidesNavigation: false,
      slidesNavPosition: 'bottom',
      scrollBar: false,
      hybrid: false,
      licenseKey: '',
      credits: {
        "enabled": true,
        "label": 'Made with fullPage.js',
        "position": 'right'
      },
      //scrolling
      css3: true,
      scrollingSpeed: 700,
      autoScrolling: true,
      fitToSection: true,
      fitToSectionDelay: 600,
      easing: 'easeInOutCubic',
      easingcss3: 'ease',
      loopBottom: false,
      loopTop: false,
      loopHorizontal: true,
      continuousVertical: false,
      continuousHorizontal: false,
      scrollHorizontally: false,
      interlockedSlides: false,
      dragAndMove: false,
      offsetSections: false,
      resetSliders: false,
      fadingEffect: false,
      normalScrollElements: null,
      scrollOverflow: true,
      scrollOverflowReset: false,
      touchSensitivity: 5,
      touchWrapper: null,
      bigSectionsDestination: null,
      //Accessibility
      keyboardScrolling: true,
      animateAnchor: true,
      recordHistory: true,
      allowCorrectDirection: false,
      //design
      scrollOverflowMacStyle: true,
      controlArrows: true,
      controlArrowsHTML: ['<div class="' + SLIDES_STYLED_ARROW + '"></div>', '<div class="' + SLIDES_STYLED_ARROW + '"></div>'],
      controlArrowColor: '#fff',
      verticalCentered: true,
      sectionsColor: [],
      paddingTop: 0,
      paddingBottom: 0,
      fixedElements: null,
      responsive: 0,
      //backwards compabitility with responsiveWiddth
      responsiveWidth: 0,
      responsiveHeight: 0,
      responsiveSlides: false,
      parallax: false,
      parallaxOptions: {
        type: 'reveal',
        percentage: 62,
        property: 'translate'
      },
      cards: false,
      cardsOptions: {
        perspective: 100,
        fadeContent: true,
        fadeBackground: true
      },
      //Custom selectors
      sectionSelector: SECTION_DEFAULT_SEL,
      slideSelector: SLIDE_DEFAULT_SEL,
      //events
      afterLoad: null,
      beforeLeave: null,
      onLeave: null,
      afterRender: null,
      afterResize: null,
      afterReBuild: null,
      afterSlideLoad: null,
      onSlideLeave: null,
      afterResponsive: null,
      onScrollOverflow: null,
      lazyLoading: true,
      observer: true
    };

    var container = null;
    var g_initialAnchorsInDom = false;
    var originals = deepExtend({}, defaultOptions); //deep copy

    var g_options = null;
    function getInitialAnchorsInDom() {
      return g_initialAnchorsInDom;
    }
    function setContainer(value) {
      container = value;
    }
    function getContainer(value) {
      return container;
    }
    function getOptions() {
      return g_options || defaultOptions;
    }
    function setOptions(options) {
      g_options = deepExtend({}, defaultOptions, options);
      originals = Object.assign({}, g_options);
    }
    function getOriginals() {
      return originals;
    }
    function setOption(name, value) {
      defaultOptions[name] = value;
    }
    /*
    * Sets the state for a variable with multiple states (original, and temporal)
    * Some variables such as `autoScrolling` or `recordHistory` might change automatically its state when using `responsive` or `autoScrolling:false`.
    * This function is used to keep track of both states, the original and the temporal one.
    * If type is not 'internal', then we assume the user is globally changing the variable.
    */

    function setVariableState(variable, value, type) {
      g_options[variable] = value;

      if (type !== 'internal') {
        originals[variable] = value;
      }
    }
    /**
    * Setting options from DOM elements if they are not provided.
    */

    function setOptionsFromDOM() {
      //no anchors option? Checking for them in the DOM attributes
      if (!getOptions().anchors.length) {
        var anchorsAttribute = '[data-anchor]';
        var anchors = $(getOptions().sectionSelector.split(',').join(anchorsAttribute + ',') + anchorsAttribute, container);

        if (anchors.length && anchors.length === $(getOptions().sectionSelector, container).length) {
          g_initialAnchorsInDom = true;
          anchors.forEach(function (item) {
            getOptions().anchors.push(getAttr(item, 'data-anchor').toString());
          });
        }
      } //no tooltips option? Checking for them in the DOM attributes


      if (!getOptions().navigationTooltips.length) {
        var tooltipsAttribute = '[data-tooltip]';
        var tooltips = $(getOptions().sectionSelector.split(',').join(tooltipsAttribute + ',') + tooltipsAttribute, container);

        if (tooltips.length) {
          tooltips.forEach(function (item) {
            getOptions().navigationTooltips.push(getAttr(item, 'data-tooltip').toString());
          });
        }
      }
    }

    var plainItem = function plainItem(panel) {
      this.anchor = panel.anchor;
      this.item = panel.item;
      this.index = panel.index();
      this.isLast = this.index === panel.item.parentElement.querySelectorAll(panel.selector).length - 1;
      this.isFirst = !this.index;
      this.isActive = panel.isActive;
    };
    /**
    * Item. Slide or Section objects share the same properties.
    */

    var Item = function Item(el, selector) {
      this.parent = this.parent || null;
      this.selector = selector;
      this.anchor = getAttr(el, 'data-anchor') || getOptions().anchors[index(el, getOptions().sectionSelector)];
      this.item = el;
      this.isVisible = isVisible(el);
      this.isActive = hasClass(el, ACTIVE);
      this.hasScroll = hasClass(el, OVERFLOW) || $(OVERFLOW_SEL, el)[0] != null;
      this.isSection = selector === getOptions().sectionSelector;
      this.container = closest(el, SLIDES_CONTAINER_SEL) || closest(el, WRAPPER_SEL);

      this.index = function () {
        return this.siblings().indexOf(this);
      };
    };

    Item.prototype.siblings = function () {
      if (this.isSection) {
        if (this.isVisible) {
          return state.sections;
        } else {
          return state.sectionsIncludingHidden;
        }
      }

      return this.parent ? this.parent.slides : 0;
    };

    Item.prototype.prev = function () {
      var siblings = this.siblings();
      var currentIndex = this.isSection ? siblings.indexOf(this) : this.parent.slides.indexOf(this);
      var prevIndex = currentIndex - 1;

      if (prevIndex >= 0) {
        return siblings[prevIndex];
      }

      return null;
    };

    Item.prototype.next = function () {
      var siblings = this.siblings();
      var currentIndex = this.isSection ? siblings.indexOf(this) : this.parent.slides.indexOf(this);
      var nextIndex = currentIndex + 1;

      if (nextIndex < siblings.length) {
        return siblings[nextIndex];
      }

      return null;
    };

    Item.prototype["prevPanel"] = function () {
      return this.prev() || (this.parent ? this.parent.prev() : null);
    };

    Item.prototype["nextPanel"] = function () {
      return this.next() || (this.parent ? this.parent.next() : null);
    };

    Item.prototype.getSiblings = function () {
      if (this.isSection) {
        return state.sections;
      }

      return state.panels;
    };

    function getNodes(panels) {
      return panels.map(function (panel) {
        return panel.item;
      });
    }
    function getPanelByElement(panels, el) {
      return panels.find(function (panel) {
        return panel.item === el;
      });
    }
    var Section = function Section(el) {
      plainItem.call(this, el);
    };
    var Slide = function Slide(el) {
      plainItem.call(this, el);
    };

    /**
    * Gets the active slide (or section) for the given section
    */

    function getSlideOrSection(destiny) {
      var slide = $(SLIDE_ACTIVE_SEL, destiny);

      if (slide.length) {
        destiny = slide[0];
      }

      return destiny;
    }
    function getSlideOrSectionPanel(panel) {
      if (!panel) {
        return null;
      }

      return panel.activeSlide ? panel.activeSlide : panel;
    }
    function isFullPageAbove() {
      return getContainer().getBoundingClientRect().bottom >= 0;
    }
    /**
    * Gets the scrolling settings depending on the plugin autoScrolling option
    */

    function getScrollSettings(top) {
      var options = getOptions();
      var position;
      var element; //top property animation

      if (options.autoScrolling && !options.scrollBar) {
        position = -top;
        element = $(WRAPPER_SEL)[0];
      } //window real scrolling
      else {
        position = top;
        element = window;
      }

      return {
        options: position,
        element: element
      };
    }
    /**
    * Scrolls the page / slider the given number of pixels.
    * It will do it one or another way dependiong on the library's config.
    */

    function setScrolling(element, val) {
      if (!getOptions().autoScrolling || getOptions().scrollBar || element.self != window && hasClass(element, SLIDES_WRAPPER)) {
        //scrolling horizontally through the slides?
        if (element.self != window && hasClass(element, SLIDES_WRAPPER)) {
          element.scrollLeft = val;
        } //vertical scroll
        else {
          element.scrollTo(0, val);
        }
      } else {
        element.style.top = val + 'px';
      }
    }
    /**
    * Adds transition animations for the given element
    */

    function addAnimation(element) {
      var transition = 'transform ' + getOptions().scrollingSpeed + 'ms ' + getOptions().easingcss3;
      removeClass(element, NO_TRANSITION);
      return css(element, {
        '-webkit-transition': transition,
        'transition': transition
      });
    }
    /**
    * Retuns `up` or `down` depending on the scrolling movement to reach its destination
    * from the current section.
    */

    function getYmovement(activeSection, destiny) {
      var fromIndex = activeSection.index();
      var toIndex = index(destiny, SECTION_SEL);

      if (fromIndex == toIndex) {
        return 'none';
      }

      if (fromIndex > toIndex) {
        return 'up';
      }

      return 'down';
    }
    /**
    * Remove transition animations for the given element
    */

    function removeAnimation(element) {
      return addClass(element, NO_TRANSITION);
    }
    /**
    * Returns the cross-browser transform string.
    */

    function getTransforms(translate3d) {
      return {
        '-webkit-transform': translate3d,
        '-moz-transform': translate3d,
        '-ms-transform': translate3d,
        'transform': translate3d
      };
    }

    var silentScrollId;
    /**
    * Adds a css3 transform property to the container class with or without animation depending on the animated param.
    */

    function transformContainer(translate3d, animated) {
      if (animated) {
        addAnimation(getContainer());
      } else {
        removeAnimation(getContainer());
      }

      clearTimeout(silentScrollId);
      css(getContainer(), getTransforms(translate3d));
      FP.test.translate3d = translate3d; //syncronously removing the class after the animation has been applied.

      silentScrollId = setTimeout(function () {
        removeClass(getContainer(), NO_TRANSITION);
      }, 10);
    }

    /**
    * Scrolls silently (with no animation) the page to the given Y position.
    */

    function silentScroll(top) {
      // The first section can have a negative value in iOS 10. Not quite sure why: -0.0142822265625
      // that's why we round it to 0.
      var roundedTop = Math.round(top);

      if (getOptions().css3 && getOptions().autoScrolling && !getOptions().scrollBar) {
        var translate3d = 'translate3d(0px, -' + roundedTop + 'px, 0px)';
        transformContainer(translate3d, false);
      } else if (getOptions().autoScrolling && !getOptions().scrollBar) {
        css(getContainer(), {
          'top': -roundedTop + 'px'
        });
        FP.test.top = -roundedTop + 'px';
      } else {
        var scrollSettings = getScrollSettings(roundedTop);
        setScrolling(scrollSettings.element, scrollSettings.options);
      }
    }

    FP.setScrollingSpeed = setScrollingSpeed;
    /**
    * Defines the scrolling speed
    */

    function setScrollingSpeed(value, type) {
      setVariableState('scrollingSpeed', value, type);
    }

    var $body = null;
    var $html = null;
    var $htmlBody = null; // caching common elements

    function setCache() {
      $body = $('body')[0];
      $html = $('html')[0];
      $htmlBody = $('html, body');
    }

    //@ts-check

    var _g_animateScroll;
    /**
    * Simulates the animated scrollTop of jQuery. Used when css3:false or scrollBar:true or autoScrolling:false
    * http://stackoverflow.com/a/16136789/1081396
    */


    function scrollTo(element, to, duration, callback) {
      var start = getScrolledPosition(element);
      var change = to - start;
      var isCallbackFired = false;
      var startTime;
      var wasAnimationActive = state.activeAnimation;
      setState({
        activeAnimation: true
      }); // Cancelling any possible previous animations (io: clicking on nav dots very fast)

      if (_g_animateScroll) {
        window.cancelAnimationFrame(_g_animateScroll);
      }

      _g_animateScroll = function g_animateScroll(timestamp) {
        if (!startTime) {
          startTime = timestamp;
        }

        var currentTime = Math.floor(timestamp - startTime);

        if (state.activeAnimation) {
          //in order to stope it from other function whenever we want
          var val = to;

          if (duration) {
            // @ts-ignore
            val = win.fp_easings[getOptions().easing](currentTime, start, change, duration);
          }

          if (currentTime <= duration) {
            setScrolling(element, val);
          }

          if (currentTime < duration) {
            window.requestAnimationFrame(_g_animateScroll);
          } else if (typeof callback !== 'undefined' && !isCallbackFired) {
            callback();
            setState({
              activeAnimation: false
            });
            isCallbackFired = true;
          }
        } else if (!isCallbackFired && !wasAnimationActive) {
          callback();
          setState({
            activeAnimation: false
          });
          isCallbackFired = true;
        }
      };

      window.requestAnimationFrame(_g_animateScroll);
    }
    /**
    * Getting the position of the element to scroll when using jQuery animations
    */

    function getScrolledPosition(element) {
      var position; //is not the window element and is a slide?

      if (element.self != win && hasClass(element, SLIDES_WRAPPER)) {
        position = element.scrollLeft;
      } else if (!getOptions().autoScrolling || getOptions().scrollBar) {
        position = getScrollTop();
      } else {
        position = element.offsetTop;
      } //gets the top property of the wrapper


      return position;
    }

    /**
    * Makes sure to only create a Panel object if the element exist
    */

    function nullOrSection(el) {
      if (el && !el.item) {
        return new Section(new SectionPanel(el));
      }

      return el ? new Section(el) : null;
    }

    function nullOrSlide(el) {
      return el ? new Slide(el) : null;
    }

    /**
    * Dispatch events & callbacks
    */

    function fireCallback(eventName, v) {
      var eventData = getEventData(eventName, v);
      trigger(getContainer(), eventName, eventData);

      if (getOptions()[eventName].apply(eventData[Object.keys(eventData)[0]], toArray(eventData)) === false) {
        return false;
      }

      return true;
    }
    /**
    * Gets the event's data for the given event on the right format.
    */

    function getEventData(eventName, v) {
      //using functions to run only the necessary bits within the object
      var paramsPerEvent = {
        afterRender: function afterRender() {
          return {
            section: nullOrSection(getState().activeSection),
            slide: nullOrSlide(getState().activeSection.activeSlide)
          };
        },
        onLeave: function onLeave() {
          return {
            origin: nullOrSection(v.items.origin),
            destination: nullOrSection(v.items.destination),
            direction: v.direction,
            trigger: getState().scrollTrigger
          };
        },
        afterLoad: function afterLoad() {
          return paramsPerEvent.onLeave();
        },
        afterSlideLoad: function afterSlideLoad() {
          return {
            section: nullOrSection(v.items.section),
            origin: nullOrSection(v.items.origin),
            destination: nullOrSection(v.items.destination),
            direction: v.direction,
            trigger: getState().scrollTrigger
          };
        },
        onSlideLeave: function onSlideLeave() {
          return paramsPerEvent.afterSlideLoad();
        },
        beforeLeave: function beforeLeave() {
          return paramsPerEvent.onLeave();
        },
        onScrollOverflow: function onScrollOverflow() {
          return {
            section: nullOrSection(getState().activeSection),
            slide: nullOrSlide(getState().activeSection.activeSlide),
            position: v.position,
            direction: v.direction
          };
        }
      };
      return paramsPerEvent[eventName]();
    }

    /**
    * Plays video and audio elements.
    */

    function playMedia(destiny) {
      var panel = getSlideOrSection(destiny); //playing HTML5 media elements

      $('video, audio', panel).forEach(function (element) {
        if (element.hasAttribute('data-autoplay') && typeof element.play === 'function') {
          element.play();
        }
      }); //youtube videos

      $('iframe[src*="youtube.com/embed/"]', panel).forEach(function (element) {
        if (element.hasAttribute('data-autoplay')) {
          playYoutube(element);
        } //in case the URL was not loaded yet. On page load we need time for the new URL (with the API string) to load.


        element.onload = function () {
          if (element.hasAttribute('data-autoplay')) {
            playYoutube(element);
          }
        };
      });
    }
    /**
    * Plays a youtube video
    */

    function playYoutube(element) {
      element.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    }
    /**
    * Stops video and audio elements.
    */


    function stopMedia(destiny) {
      var panel = getSlideOrSection(destiny); //stopping HTML5 media elements

      $('video, audio', panel).forEach(function (element) {
        if (!element.hasAttribute('data-keepplaying') && typeof element.pause === 'function') {
          element.pause();
        }
      }); //youtube videos

      $('iframe[src*="youtube.com/embed/"]', panel).forEach(function (element) {
        if (/youtube\.com\/embed\//.test(getAttr(element, 'src')) && !element.hasAttribute('data-keepplaying')) {
          element.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        }
      });
    }
    /*
    * Enables the Youtube videos API so we can control their flow if necessary.
    */

    function enableYoutubeAPI() {
      $('iframe[src*="youtube.com/embed/"]', getContainer()).forEach(function (item) {
        addURLParam(item, 'enablejsapi=1');
      });
    }
    /**
    * Adds a new parameter and its value to the `src` of a given element
    */

    function addURLParam(element, newParam) {
      var originalSrc = getAttr(element, 'src');
      element.setAttribute('src', originalSrc + getUrlParamSign(originalSrc) + newParam);
    }
    /*
    * Returns the prefix sign to use for a new parameter in an existen URL.
    *
    * @return {String}  ? | &
    */


    function getUrlParamSign(url) {
      return !/\?/.test(url) ? '?' : '&';
    }

    /**
    * Lazy loads image, video and audio elements.
    */

    function lazyLoad(destiny) {
      if (!getOptions().lazyLoading) {
        return;
      }

      var panel = getSlideOrSection(destiny);
      $('img[data-src], img[data-srcset], source[data-src], source[data-srcset], video[data-src], audio[data-src], iframe[data-src]', panel).forEach(function (element) {
        ['src', 'srcset'].forEach(function (type) {
          var attribute = getAttr(element, 'data-' + type);

          if (attribute != null && attribute) {
            setSrc(element, type);
            element.addEventListener('load', function () {
            });
          }
        });

        if (matches(element, 'source')) {
          var elementToPlay = closest(element, 'video, audio');

          if (elementToPlay) {
            elementToPlay.load();

            elementToPlay.onloadeddata = function () {
            };
          }
        }
      });
    }

    /**
    * Sets a class for the body of the page depending on the active section / slide
    */

    function setBodyClass() {
      var section = getState().activeSection.item;
      var slide = getState().activeSection.activeSlide;
      var sectionAnchor = getAnchor(section);
      var text = String(sectionAnchor);

      if (slide) {
        var slideAnchor = getAnchor(slide.item);
        text = text + '-' + slideAnchor;
      } //changing slash for dash to make it a valid CSS style


      text = text.replace('/', '-').replace('#', ''); //removing previous anchor classes

      var classRe = new RegExp('\\b\\s?' + VIEWING_PREFIX + '-[^\\s]+\\b', "g");
      $body.className = $body.className.replace(classRe, ''); //adding the current anchor

      addClass($body, VIEWING_PREFIX + '-' + text);
    }
    /**
    * Gets the anchor for the given slide / section. Its index will be used if there's none.
    */

    function getAnchor(element) {
      if (!element) {
        return null;
      }

      var anchor = getAttr(element, 'data-anchor');
      var elementIndex = index(element); //Slide without anchor link? We take the index instead.

      if (anchor == null) {
        anchor = elementIndex;
      }

      return anchor;
    }

    /**
    * Sets the state of the website depending on the active section/slide.
    * It changes the URL hash when needed and updates the body class.
    */

    function setPageStatus(slideIndex, slideAnchor, anchorLink) {
      var sectionHash = '';

      if (getOptions().anchors.length && !getOptions().lockAnchors) {
        //isn't it the first slide?
        if (slideIndex) {
          if (anchorLink != null) {
            sectionHash = anchorLink;
          } //slide without anchor link? We take the index instead.


          if (slideAnchor == null) {
            slideAnchor = slideIndex;
          }

          setState({
            lastScrolledSlide: slideAnchor
          });
          setUrlHash(sectionHash + '/' + slideAnchor); //first slide won't have slide anchor, just the section one
        } else if (slideIndex != null) {
          setState({
            lastScrolledSlide: slideAnchor
          });
          setUrlHash(anchorLink);
        } //section without slides
        else {
          setUrlHash(anchorLink);
        }
      }

      setBodyClass();
    }
    /**
    * Sets the URL hash.
    */

    function setUrlHash(url) {
      if (getOptions().recordHistory) {
        location.hash = url;
      } else {
        //Mobile Chrome doesn't work the normal way, so... lets use HTML5 for phones :)
        if (isTouchDevice || isTouch) {
          win.history.replaceState(undefined, undefined, '#' + url);
        } else {
          var baseUrl = win.location.href.split('#')[0];
          win.location.replace(baseUrl + '#' + url);
        }
      }
    }

    /**
    * Gets the name for screen readers for a section/slide navigation bullet.
    */

    function getBulletLinkName(i, defaultName, item) {
      var anchor = defaultName === 'Section' ? getOptions().anchors[i] : getAttr(item, 'data-anchor');
      return encodeURI(getOptions().navigationTooltips[i] || anchor || defaultName + ' ' + (i + 1));
    }

    function slideBulletHandler(e) {
      preventDefault(e);
      setState({
        scrollTrigger: 'horizontalNav'
      });
      /*jshint validthis:true */

      var sectionElem = closest(this, SECTION_SEL);
      var slides = $(SLIDES_WRAPPER_SEL, closest(this, SECTION_SEL))[0];
      var section = getPanelByElement(getState().sections, sectionElem);
      var destiny = section.slides[index(closest(this, 'li'))];
      EventEmitter.emit(events.landscapeScroll, {
        slides: slides,
        destination: destiny.item
      });
    }
    /**
    * Sets the state for the horizontal bullet navigations.
    */

    function activeSlidesNavigation(slidesNav, slideIndex) {
      if (getOptions().slidesNavigation && slidesNav != null) {
        removeClass($(ACTIVE_SEL, slidesNav), ACTIVE);
        addClass($('a', $('li', slidesNav)[slideIndex]), ACTIVE);
      }
    }
    /**
    * Creates a landscape navigation bar with dots for horizontal sliders.
    */

    function addSlidesNavigation(section) {
      var sectionElem = section.item;
      var numSlides = section.slides.length;
      appendTo(createElementFromHTML('<div class="' + SLIDES_NAV + '"><ul></ul></div>'), sectionElem);
      var nav = $(SLIDES_NAV_SEL, sectionElem)[0]; //top or bottom

      addClass(nav, 'fp-' + getOptions().slidesNavPosition);

      for (var i = 0; i < numSlides; i++) {
        var slide = $(SLIDE_SEL, sectionElem)[i];
        appendTo(createElementFromHTML('<li><a href="#"><span class="fp-sr-only">' + getBulletLinkName(i, 'Slide', slide) + '</span><span></span></a></li>'), $('ul', nav)[0]);
      } //centering it


      css(nav, {
        'margin-left': '-' + nav.innerWidth / 2 + 'px'
      });
      var activeSlideIndex = section.activeSlide ? section.activeSlide.index() : 0;
      addClass($('a', $('li', nav)[activeSlideIndex]), ACTIVE);
    }

    var isScrollAllowed = {};
    isScrollAllowed.m = {
      'up': true,
      'down': true,
      'left': true,
      'right': true
    };
    isScrollAllowed.k = deepExtend({}, isScrollAllowed.m);
    /**
    * Allowing or disallowing the mouse/swipe scroll in a given direction. (not for keyboard)
    * @param type m (mouse) or k (keyboard)
    */

    function setIsScrollAllowed(value, direction, type) {
      //up, down, left, right
      if (direction !== 'all') {
        isScrollAllowed[type][direction] = value;
      } //all directions?
      else {
        Object.keys(isScrollAllowed[type]).forEach(function (key) {
          isScrollAllowed[type][key] = value;
        });
      }
    }
    function getIsScrollAllowed() {
      return isScrollAllowed;
    }

    EventEmitter.on(events.onClickOrTouch, onClickOrTouch$2);

    function onClickOrTouch$2(params) {
      var target = params.target;

      if (matches(target, SLIDES_ARROW_SEL) || closest(target, SLIDES_ARROW_SEL)) {
        slideArrowHandler.call(target, params);
      }
    } //Scrolling horizontally when clicking on the slider controls.


    function slideArrowHandler() {
      /*jshint validthis:true */
      var section = closest(this, SECTION_SEL);
      /*jshint validthis:true */

      if (hasClass(this, SLIDES_PREV)) {
        if (getIsScrollAllowed().m.left) {
          setState({
            scrollTrigger: 'slideArrow'
          });
          EventEmitter.emit(events.moveSlideLeft, {
            section: section
          });
        }
      } else {
        if (getIsScrollAllowed().m.right) {
          setState({
            scrollTrigger: 'slideArrow'
          });
          EventEmitter.emit(events.moveSlideRight, {
            section: section
          });
        }
      }
    }
    /**
    * Creates the control arrows for the given section
    */


    function createSlideArrows(section) {
      var sectionElem = section.item;
      var arrows = [createElementFromHTML(getOptions().controlArrowsHTML[0]), createElementFromHTML(getOptions().controlArrowsHTML[1])];
      after($(SLIDES_WRAPPER_SEL, sectionElem)[0], arrows);
      addClass(arrows, SLIDES_ARROW);
      addClass(arrows[0], SLIDES_PREV);
      addClass(arrows[1], SLIDES_NEXT);

      if (getOptions().controlArrowColor !== '#fff') {
        css($(SLIDES_ARROW_NEXT_SEL, sectionElem), {
          'border-color': 'transparent transparent transparent ' + getOptions().controlArrowColor
        });
        css($(SLIDES_ARROW_PREV_SEL, sectionElem), {
          'border-color': 'transparent ' + getOptions().controlArrowColor + ' transparent transparent'
        });
      }

      if (!getOptions().loopHorizontal) {
        hide($(SLIDES_ARROW_PREV_SEL, sectionElem));
      }
    }
    function toggleControlArrows(v) {
      if (!getOptions().loopHorizontal && getOptions().controlArrows) {
        //hidding it for the fist slide, showing for the rest
        toggle($(SLIDES_ARROW_PREV_SEL, v.section), v.slideIndex !== 0); //hidding it for the last slide, showing for the rest

        toggle($(SLIDES_ARROW_NEXT_SEL, v.section), next(v.destiny) != null);
      }
    }

    var g_afterSlideLoadsId;
    FP.landscapeScroll = landscapeScroll;
    EventEmitter.on(events.bindEvents, bindEvents$b);

    function bindEvents$b() {
      EventEmitter.on(events.onPerformMovement, onPerformMovement);
    }

    function onPerformMovement() {
      clearTimeout(g_afterSlideLoadsId);
      setState({
        slideMoving: false
      });
    }
    /**
    * Scrolls horizontal sliders.
    */


    function landscapeScroll(slides, destiny, direction) {
      var sectionElem = closest(slides, SECTION_SEL);
      var section = getState().sections.filter(function (section) {
        return section.item == sectionElem;
      })[0];
      var slide = section.slides.filter(function (slide) {
        return slide.item == destiny;
      })[0];
      var v = {
        "slides": slides,
        "destiny": destiny,
        "direction": direction,
        "destinyPos": {
          "left": destiny.offsetLeft
        },
        "slideIndex": slide.index(),
        "section": sectionElem,
        "sectionIndex": section.index(),
        "anchorLink": section.anchor,
        "slidesNav": $(SLIDES_NAV_SEL, sectionElem)[0],
        "slideAnchor": slide.anchor,
        "prevSlide": section.activeSlide.item,
        "prevSlideIndex": section.activeSlide.index(),
        "items": {
          "section": section,
          "origin": section.activeSlide,
          "destination": slide
        },
        //caching the value of isResizing at the momment the function is called
        //because it will be checked later inside a setTimeout and the value might change
        "localIsResizing": state.isResizing
      };
      v.xMovement = getXmovement(v.prevSlideIndex, v.slideIndex);
      v.direction = v.direction ? v.direction : v.xMovement; //important!! Only do it when not resizing

      if (!v.localIsResizing) {
        //preventing from scrolling to the next/prev section when using scrollHorizontally
        setState({
          canScroll: false
        });
      }

      if (getOptions().onSlideLeave) {
        //if the site is not just resizing and readjusting the slides
        if (!v.localIsResizing && v.xMovement !== 'none') {
          if (isFunction(getOptions().onSlideLeave)) {
            if (fireCallback('onSlideLeave', v) === false) {
              setState({
                slideMoving: false
              });
              return;
            }
          }
        }
      }

      addClass(destiny, ACTIVE);
      removeClass(siblings(destiny), ACTIVE);
      updateState();

      if (!v.localIsResizing) {
        stopMedia(v.prevSlide);
        lazyLoad(destiny);
      }

      toggleControlArrows(v); //only changing the URL if the slides are in the current section (not for resize re-adjusting)

      if (section.isActive && !v.localIsResizing) {
        setPageStatus(v.slideIndex, v.slideAnchor, v.anchorLink);
      }

      performHorizontalMove(slides, v, true);
    }
    /**
    * Performs the horizontal movement. (CSS3 or jQuery)
    *
    * @param fireCallback {Boolean} - determines whether or not to fire the callback
    */

    function performHorizontalMove(slides, v, fireCallback) {
      var destinyPos = v.destinyPos;
      activeSlidesNavigation(v.slidesNav, v.slideIndex);
      setState({
        scrollX: Math.round(destinyPos.left)
      });

      if (getOptions().css3) {
        var translate3d = 'translate3d(-' + Math.round(destinyPos.left) + 'px, 0px, 0px)';
        FP.test.translate3dH[v.sectionIndex] = translate3d;
        css(addAnimation($(SLIDES_CONTAINER_SEL, slides)), getTransforms(translate3d));
        clearTimeout(g_afterSlideLoadsId);
        g_afterSlideLoadsId = setTimeout(function () {
          if (fireCallback) {
            afterSlideLoads(v);
          }
        }, getOptions().scrollingSpeed);
      } else {
        FP.test.left[v.sectionIndex] = Math.round(destinyPos.left);
        scrollTo(slides, Math.round(destinyPos.left), getOptions().scrollingSpeed, function () {
          if (fireCallback) {
            afterSlideLoads(v);
          }
        });
      }
    }
    /**
    * Retuns `right` or `left` depending on the scrolling movement to reach its destination
    * from the current slide.
    */


    function getXmovement(fromIndex, toIndex) {
      if (fromIndex == toIndex) {
        return 'none';
      }

      if (fromIndex > toIndex) {
        return 'left';
      }

      return 'right';
    }

    function onDestroy$7() {
      clearTimeout(g_afterSlideLoadsId);
    }

    function afterSlideLoads(v) {
      //if the site is not just resizing and readjusting the slides
      if (!v.localIsResizing) {
        if (isFunction(getOptions().afterSlideLoad)) {
          fireCallback('afterSlideLoad', v);
        } //needs to be inside the condition to prevent problems with continuousVertical and scrollHorizontally
        //and to prevent double scroll right after a windows resize


        setState({
          canScroll: true
        });
        playMedia(v.destiny);
        EventEmitter.emit(events.afterSlideLoads, v);
      } //letting them slide again


      setState({
        slideMoving: false
      });
    }

    /**
    * Slides silently (with no animation) the active slider to the given slide.
    * @param noCallback {bool} true or defined -> no callbacks
    */

    function silentLandscapeScroll(activeSlide, noCallbacks) {
      setScrollingSpeed(0, 'internal');

      if (typeof noCallbacks !== 'undefined') {
        //preventing firing callbacks afterSlideLoad etc.
        setState({
          isResizing: true
        });
      }

      landscapeScroll(closest(activeSlide, SLIDES_WRAPPER_SEL), activeSlide);

      if (typeof noCallbacks !== 'undefined') {
        setState({
          isResizing: false
        });
      }

      setScrollingSpeed(getOriginals().scrollingSpeed, 'internal');
    }

    FP.setRecordHistory = setRecordHistory;
    /**
    * Defines wheter to record the history for each hash change in the URL.
    */

    function setRecordHistory(value, type) {
      setVariableState('recordHistory', value, type);
    }

    FP.setAutoScrolling = setAutoScrolling;
    FP.test.setAutoScrolling = setAutoScrolling;
    /**
    * Sets the autoScroll option.
    * It changes the scroll bar visibility and the history of the site as a result.
    */

    function setAutoScrolling(value, type) {
      //removing the transformation
      if (!value) {
        silentScroll(0);
      }

      setVariableState('autoScrolling', value, type);
      var element = getState().activeSection.item;

      if (getOptions().autoScrolling && !getOptions().scrollBar) {
        css($htmlBody, {
          'overflow': 'hidden',
          'height': '100%'
        });
        removeClass($body, 'fp-scrollable');
        setRecordHistory(getOriginals().recordHistory, 'internal'); //for IE touch devices

        css(getContainer(), {
          '-ms-touch-action': 'none',
          'touch-action': 'none'
        });

        if (element != null) {
          //moving the container up
          silentScroll(element.offsetTop);
        }
      } else {
        css($htmlBody, {
          'overflow': 'visible',
          'height': 'initial'
        });
        addClass($body, 'fp-scrollable');
        var recordHistory = !getOptions().autoScrolling ? false : getOriginals().recordHistory;
        setRecordHistory(recordHistory, 'internal'); //for IE touch devices

        css(getContainer(), {
          '-ms-touch-action': '',
          'touch-action': ''
        }); //scrolling the page to the section with no animation

        if (element != null) {
          var scrollSettings = getScrollSettings(element.offsetTop);
          scrollSettings.element.scrollTo(0, scrollSettings.options);
        }
      }
    }

    //@ts-check
    /**
    * Adds sections before or after the current one to create the infinite effect.
    */

    function createInfiniteSections(v) {
      setState({
        isDoingContinousVertical: true
      });
      var activeSectionItem = getState().activeSection.item; // Scrolling down

      if (!v.isMovementUp) {
        // Move all previous sections to after the active section
        after(activeSectionItem, prevAll(activeSectionItem, SECTION_SEL).reverse());
      } else {
        // Scrolling up
        // Move all next sections to before the active section
        before(activeSectionItem, nextAll(activeSectionItem, SECTION_SEL));
      } // Maintain the displayed position (now that we changed the element order)


      silentScroll(getState().activeSection.item.offsetTop); // Maintain the active slides visible in the viewport

      keepSlidesPosition$1(); // save for later the elements that still need to be reordered

      v.wrapAroundElements = activeSectionItem; // Recalculate animation variables

      v.dtop = v.element.offsetTop;
      v.yMovement = getYmovement(getState().activeSection, v.element);
      return v;
    }
    /**
    * Maintains the active slides in the viewport
    * (Because the `scroll` animation might get lost with some actions, such as when using continuousVertical)
    */

    function keepSlidesPosition$1() {
      var activeSlides = $(SLIDE_ACTIVE_SEL);

      for (var i = 0; i < activeSlides.length; i++) {
        silentLandscapeScroll(activeSlides[i], 'internal');
      }
    }

    //@ts-check
    /**
    * Maintains the active slides in the viewport
    * (Because the `scroll` animation might get lost with some actions, such as when using continuousVertical)
    */

    function keepSlidesPosition() {
      var activeSlides = $(SLIDE_ACTIVE_SEL);

      for (var i = 0; i < activeSlides.length; i++) {
        silentLandscapeScroll(activeSlides[i], 'internal');
      }
    }
    /**
    * Fix section order after continuousVertical changes have been animated
    */


    function continuousVerticalFixSectionOrder(v) {
      // If continuousVertical is in effect (and autoScrolling would also be in effect then),
      // finish moving the elements around so the direct navigation will function more simply
      if (v.wrapAroundElements == null) {
        return;
      }

      if (v.isMovementUp) {
        before($(SECTION_SEL)[0], v.wrapAroundElements);
      } else {
        after($(SECTION_SEL)[getState().sections.length - 1], v.wrapAroundElements);
      }

      silentScroll(getState().activeSection.item.offsetTop); // Maintain the active slides visible in the viewport

      keepSlidesPosition();
      setState({
        isDoingContinousVertical: false
      });
    }

    /**
    * Makes sure lazyload is done for other sections in the viewport that are not the
    * active one. 
    */

    function lazyLoadOthers() {
      var hasAutoHeightSections = $(AUTO_HEIGHT_SEL)[0] || isResponsiveMode() && $(AUTO_HEIGHT_RESPONSIVE_SEL)[0]; //quitting when it doesn't apply

      if (!getOptions().lazyLoading || !hasAutoHeightSections) {
        return;
      } //making sure to lazy load auto-height sections that are in the viewport


      $(SECTION_SEL + ':not(' + ACTIVE_SEL + ')').forEach(function (section) {
        if (isSectionInViewport(section)) {
          lazyLoad(section);
        }
      });
    }
    /**
    * Determines whether a section is in the viewport or not.
    */

    function isSectionInViewport(el) {
      var rect = el.getBoundingClientRect();
      var top = rect.top;
      var bottom = rect.bottom; //sometimes there's a 1px offset on the bottom of the screen even when the 
      //section's height is the window.innerHeight one. I guess because pixels won't allow decimals.
      //using this prevents from lazyLoading the section that is not yet visible 
      //(only 1 pixel offset is)

      var pixelOffset = 2;
      var isTopInView = top + pixelOffset < state.windowsHeight && top > 0;
      var isBottomInView = bottom > pixelOffset && bottom < state.windowsHeight;
      return isTopInView || isBottomInView;
    }

    function tooltipTextHandler() {
      /*jshint validthis:true */
      trigger(prev(this), 'click');
    }
    /**
    * Activating the vertical navigation bullets according to the given slide name.
    */

    function activateNavDots(name, sectionIndex) {
      var nav = $(SECTION_NAV_SEL)[0];

      if (getOptions().navigation && nav != null && nav.style.display !== 'none') {
        removeClass($(ACTIVE_SEL, nav), ACTIVE);

        if (name) {
          addClass($('a[href="#' + name + '"]', nav), ACTIVE);
        } else {
          addClass($('a', $('li', nav)[sectionIndex]), ACTIVE);
        }
      }
    }
    /**
    * Creates a vertical navigation bar.
    */

    function addVerticalNavigation() {
      remove($(SECTION_NAV_SEL));
      var navigation = doc.createElement('div');
      navigation.setAttribute('id', SECTION_NAV);
      var divUl = doc.createElement('ul');
      navigation.appendChild(divUl);
      appendTo(navigation, $body);
      var nav = $(SECTION_NAV_SEL)[0];
      addClass(nav, 'fp-' + getOptions().navigationPosition);

      if (getOptions().showActiveTooltip) {
        addClass(nav, SHOW_ACTIVE_TOOLTIP);
      }

      var li = '';

      for (var i = 0; i < getState().sections.length; i++) {
        var section = getState().sections[i];
        var link = '';

        if (getOptions().anchors.length) {
          link = section.anchor;
        }

        li += '<li><a href="#' + encodeURI(link) + '"><span class="fp-sr-only">' + getBulletLinkName(section.index(), 'Section') + '</span><span></span></a>'; // Only add tooltip if needed (defined by user)

        var tooltip = getOptions().navigationTooltips[section.index()];

        if (typeof tooltip !== 'undefined' && tooltip !== '') {
          li += '<div class="' + SECTION_NAV_TOOLTIP + ' fp-' + getOptions().navigationPosition + '">' + tooltip + '</div>';
        }

        li += '</li>';
      }

      $('ul', nav)[0].innerHTML = li; //activating the current active section

      var bullet = $('li', $(SECTION_NAV_SEL)[0])[getState().activeSection.index()];
      addClass($('a', bullet), ACTIVE);
    } //Scrolls to the section when clicking the navigation bullet

    function sectionBulletHandler(e) {
      if (e.preventDefault) {
        preventDefault(e);
      }

      setState({
        scrollTrigger: 'verticalNav'
      });
      /*jshint validthis:true */
      // @ts-ignore

      var indexBullet = index(closest(this, SECTION_NAV_SEL + ' li'));
      EventEmitter.emit(events.scrollPage, {
        destination: getState().sections[indexBullet]
      });
    }

    /**
    * Sets to active the current menu and vertical nav items.
    */

    function activateMenuAndNav(anchor, index) {
      activateMenuElement(anchor);
      activateNavDots(anchor, index);
    }
    /**
    * Activating the website main menu elements according to the given slide name.
    */

    function activateMenuElement(name) {
      if (getOptions().menu && getOptions().menu.length) {
        $(getOptions().menu).forEach(function (menu) {
          if (menu != null) {
            removeClass($(ACTIVE_SEL, menu), ACTIVE);
            addClass($('[data-menuanchor="' + name + '"]', menu), ACTIVE);
          }
        });
      }
    }

    new Date().getTime();
    /**
     * Triggers the callback once per scroll wheel action.
     * Based on scrolling speed delay.
     */

    var oncePerScroll = function () {
      var canTriggerEvent = true;
      var prevWheelTime = new Date().getTime();
      var result;
      var isScrollingOnInit = !win.fullpage_api;
      return function (scrollTrigger, callback) {
        var currentTime = new Date().getTime();
        var timeThreshold = scrollTrigger === 'wheel' ? getOptions().scrollingSpeed : 100;
        canTriggerEvent = isScrollingOnInit || currentTime - prevWheelTime >= timeThreshold;
        isScrollingOnInit = !win.fullpage_api;

        if (canTriggerEvent) {
          result = callback();
          prevWheelTime = currentTime;
        }

        return typeof result !== 'undefined' ? result : true;
      };
    }();

    /**
    * Fires the wheel event once per mouse wheel trigger.
    */

    function fireCallbackOncePerScroll(callbackName, params) {
      if (!isFunction(getOptions().beforeLeave)) {
        return;
      }

      var result = oncePerScroll(getState().scrollTrigger, function () {
        return fireCallback(callbackName, params);
      });
      return result;
    }

    FP.moveTo = moveTo;

    FP.getScrollY = function () {
      return state.scrollY;
    };

    var g_afterSectionLoadsId;
    var g_transitionLapseId;
    EventEmitter.on(events.onDestroy, onDestroy$6);
    /**
    * Scrolls the site to the given element and scrolls to the slide if a callback is given.
    */

    function scrollPage(section, callback, isMovementUp) {
      var element = section.item;

      if (element == null) {
        return;
      } //there's no element to scroll, leaving the function


      var dtop = getDestinationPosition(element);
      var slideAnchorLink;
      var slideIndex; //local variables

      var v = {
        "element": element,
        "callback": callback,
        "isMovementUp": isMovementUp,
        "dtop": dtop,
        "yMovement": getYmovement(getState().activeSection, element),
        "anchorLink": section.anchor,
        "sectionIndex": section.index(),
        "activeSlide": section.activeSlide ? section.activeSlide.item : null,
        "leavingSection": getState().activeSection.index() + 1,
        //caching the value of isResizing at the momment the function is called
        //because it will be checked later inside a setTimeout and the value might change
        "localIsResizing": state.isResizing,
        "items": {
          "origin": getState().activeSection,
          "destination": section
        },
        "direction": null
      }; //quiting when destination scroll is the same as the current one

      if (getState().activeSection.item == element && !state.isResizing || getOptions().scrollBar && getScrollTop() === v.dtop && !hasClass(element, AUTO_HEIGHT)) {
        return;
      }

      if (v.activeSlide != null) {
        slideAnchorLink = getAttr(v.activeSlide, 'data-anchor');
        slideIndex = index(v.activeSlide, null);
      } //callback (onLeave) if the site is not just resizing and readjusting the slides


      if (!v.localIsResizing) {
        var direction = v.yMovement; //required for continousVertical

        if (typeof isMovementUp !== 'undefined') {
          direction = isMovementUp ? 'up' : 'down';
        } //for the callback


        v.direction = direction;

        if (isFunction(getOptions().beforeLeave)) {
          if (fireCallbackOncePerScroll('beforeLeave', v) === false) {
            return;
          }
        }

        if (isFunction(getOptions().onLeave)) {
          if (!fireCallback('onLeave', v)) {
            return;
          }
        }
      } // If continuousVertical && we need to wrap around


      if (getOptions().autoScrolling && getOptions().continuousVertical && typeof v.isMovementUp !== "undefined" && (!v.isMovementUp && v.yMovement == 'up' || // Intending to scroll down but about to go up or
      v.isMovementUp && v.yMovement == 'down')) {
        // intending to scroll up but about to go down
        v = createInfiniteSections(v);
      } //pausing media of the leaving section (if we are not just resizing, as destinatino will be the same one)


      if (!v.localIsResizing) {
        stopMedia(getState().activeSection.item);
      }

      addClass(element, ACTIVE);
      removeClass(siblings(element), ACTIVE);
      updateState();
      lazyLoad(element); //preventing from activating the MouseWheelHandler event
      //more than once if the page is scrolling

      setState({
        canScroll: FP.test.isTesting
      });
      setPageStatus(slideIndex, slideAnchorLink, v.anchorLink);
      performMovement(v); //flag to avoid callingn `scrollPage()` twice in case of using anchor links

      setState({
        lastScrolledDestiny: v.anchorLink
      }); //avoid firing it twice (as it does also on scroll)

      activateMenuAndNav(v.anchorLink, v.sectionIndex);
    }

    function onDestroy$6() {
      clearTimeout(g_afterSectionLoadsId);
      clearTimeout(g_transitionLapseId);
    }
    /**
    * Returns the destination Y position based on the scrolling direction and
    * the height of the section.
    */


    function getDestinationPosition(element) {
      var elementHeight = element.offsetHeight;
      var elementTop = element.offsetTop; //top of the desination will be at the top of the viewport

      var position = elementTop;
      var isScrollingDown = elementTop > state.previousDestTop;
      var sectionBottom = position - getWindowHeight() + elementHeight;
      var bigSectionsDestination = getOptions().bigSectionsDestination; //is the destination element bigger than the viewport?

      if (elementHeight > getWindowHeight()) {
        //scrolling up?
        if (!isScrollingDown && !bigSectionsDestination || bigSectionsDestination === 'bottom') {
          position = sectionBottom;
        }
      } //sections equal or smaller than the viewport height && scrolling down? ||  is resizing and its in the last section
      else if (isScrollingDown || state.isResizing && next(element) == null) {
        //The bottom of the destination will be at the bottom of the viewport
        position = sectionBottom;
      }
      /*
      Keeping record of the last scrolled position to determine the scrolling direction.
      No conventional methods can be used as the scroll bar might not be present
      AND the section might not be active if it is auto-height and didnt reach the middle
      of the viewport.
      */


      setState({
        previousDestTop: position
      });
      return position;
    }
    /**
    * Performs the vertical movement (by CSS3 or by jQuery)
    */


    function performMovement(v) {
      var isFastSpeed = getOptions().scrollingSpeed < 700;
      var transitionLapse = isFastSpeed ? 700 : getOptions().scrollingSpeed;
      setState({
        touchDirection: 'none',
        scrollY: Math.round(v.dtop)
      });
      EventEmitter.emit(events.onPerformMovement); // using CSS3 translate functionality

      if (getOptions().css3 && getOptions().autoScrolling && !getOptions().scrollBar) {
        // The first section can have a negative value in iOS 10. Not quite sure why: -0.0142822265625
        // that's why we round it to 0.
        var translate3d = 'translate3d(0px, -' + Math.round(v.dtop) + 'px, 0px)';
        transformContainer(translate3d, true); //even when the scrollingSpeed is 0 there's a little delay, which might cause the
        //scrollingSpeed to change in case of using silentMoveTo();ç

        if (getOptions().scrollingSpeed) {
          clearTimeout(g_afterSectionLoadsId);
          g_afterSectionLoadsId = setTimeout(function () {
            afterSectionLoads$1(v); //disabling canScroll when using fastSpeed

            setState({
              canScroll: !isFastSpeed || FP.test.isTesting
            });
          }, getOptions().scrollingSpeed);
        } else {
          afterSectionLoads$1(v);
        }
      } // using JS to animate
      else {
        var scrollSettings = getScrollSettings(v.dtop);
        FP.test.top = -v.dtop + 'px';
        clearTimeout(g_afterSectionLoadsId);
        scrollTo(scrollSettings.element, scrollSettings.options, getOptions().scrollingSpeed, function () {
          if (getOptions().scrollBar) {
            /* Hack!
            The timeout prevents setting the most dominant section in the viewport as "active" when the user
            scrolled to a smaller section by using the mousewheel (auto scrolling) rather than draging the scroll bar.
             When using scrollBar:true It seems like the scroll events still getting propagated even after the scrolling animation has finished.
            */
            g_afterSectionLoadsId = setTimeout(function () {
              afterSectionLoads$1(v);
            }, 30);
          } else {
            afterSectionLoads$1(v); //disabling canScroll when using fastSpeed

            setState({
              canScroll: !isFastSpeed || FP.test.isTesting
            });
          }
        });
      } // enabling canScroll after the minimum transition laps


      if (isFastSpeed) {
        clearTimeout(g_transitionLapseId);
        g_transitionLapseId = setTimeout(function () {
          setState({
            canScroll: true
          });
        }, transitionLapse);
      }
    }
    /**
    * Actions to do once the section is loaded.
    */


    function afterSectionLoads$1(v) {
      setState({
        isBeyondFullpage: false
      });
      continuousVerticalFixSectionOrder(v); //callback (afterLoad) if the site is not just resizing and readjusting the slides

      if (isFunction(getOptions().afterLoad) && !v.localIsResizing) {
        fireCallback('afterLoad', v);
      }

      updateState();

      if (!v.localIsResizing) {
        playMedia(v.element);
      }

      addClass(v.element, COMPLETELY);
      removeClass(siblings(v.element), COMPLETELY);
      lazyLoadOthers();
      scrollOverflowHandler.afterSectionLoads();
      setState({
        canScroll: true
      });
      EventEmitter.emit(events.afterSectionLoads, v);

      if (isFunction(v.callback)) {
        v.callback();
      }
    }

    FP.setFitToSection = setFitToSection;
    FP.fitToSection = fitToSection;
    /**
    * Sets fitToSection
    */

    function setFitToSection(value, type) {
      setVariableState('fitToSection', value, type);
    }
    /**
    * Fits the site to the nearest active section
    */

    function fitToSection() {
      //checking fitToSection again in case it was set to false before the timeout delay
      if (state.canScroll) {
        //allows to scroll to an active section and
        //if the section is already active, we prevent firing callbacks
        setState({
          isResizing: true
        });
        scrollPage(state.activeSection);
        setState({
          isResizing: false
        });
      }
    }

    FP.setResponsive = setResponsive;
    /**
    * Checks if the site needs to get responsive and disables autoScrolling if so.
    * A class `fp-responsive` is added to the plugin's container in case the user wants to use it for his own responsive CSS.
    */

    function responsive() {
      var widthLimit = getOptions().responsive || getOptions().responsiveWidth; //backwards compatiblity

      var heightLimit = getOptions().responsiveHeight; //only calculating what we need. Remember its called on the resize event.

      var isBreakingPointWidth = widthLimit && win.innerWidth < widthLimit;
      var isBreakingPointHeight = heightLimit && win.innerHeight < heightLimit;

      if (widthLimit && heightLimit) {
        setResponsive(isBreakingPointWidth || isBreakingPointHeight);
      } else if (widthLimit) {
        setResponsive(isBreakingPointWidth);
      } else if (heightLimit) {
        setResponsive(isBreakingPointHeight);
      }
    }
    /**
    * Turns fullPage.js to normal scrolling mode when the viewport `width` or `height`
    * are smaller than the set limit values.
    */

    function setResponsive(active) {
      var isResponsive = isResponsiveMode();

      if (active) {
        if (!isResponsive) {
          setAutoScrolling(false, 'internal');
          setFitToSection(false, 'internal');
          hide($(SECTION_NAV_SEL));
          addClass($body, RESPONSIVE);

          if (isFunction(getOptions().afterResponsive)) {
            getOptions().afterResponsive.call(getContainer(), active);
          }
        }
      } else if (isResponsive) {
        setAutoScrolling(getOriginals().autoScrolling, 'internal');
        setFitToSection(getOriginals().autoScrolling, 'internal');
        show($(SECTION_NAV_SEL));
        removeClass($body, RESPONSIVE);

        if (isFunction(getOptions().afterResponsive)) {
          getOptions().afterResponsive.call(getContainer(), active);
        }
      }
    }
    /**
    * Determines whether fullpage.js is in responsive mode or not.
    */


    function isResponsiveMode() {
      return hasClass($body, RESPONSIVE);
    }

    function addTableClass(element) {
      if (!getOptions().verticalCentered) {
        return;
      } // Overflowing sections when scrollOverflow is disabled will be autoHeight
      // and won't require vertical aligment


      if (!getOptions().scrollOverflow && scrollOverflowHandler.shouldBeScrollable(element.item)) {
        return;
      }

      if (!scrollOverflowHandler.isScrollable(element)) {
        //In case we are styling for the 2nd time as in with reponsiveSlides
        if (!hasClass(element.item, TABLE)) {
          addClass(element.item, TABLE);
        }
      }
    }

    var startingSection = null;
    FP.getActiveSection = getActiveSection;
    function getStartingSection() {
      return startingSection;
    }
    /**
    * Styling vertical sections
    */

    function styleSection(section) {
      var sectionElem = section.item;
      var hasSlides = section.allSlidesItems.length;
      var index = section.index(); //if no active section is defined, the 1st one will be the default one

      if (!getState().activeSection && section.isVisible) {
        addClass(sectionElem, ACTIVE);
        updateState();
      }

      startingSection = getState().activeSection.item;

      if (getOptions().paddingTop) {
        css(sectionElem, {
          'padding-top': getOptions().paddingTop
        });
      }

      if (getOptions().paddingBottom) {
        css(sectionElem, {
          'padding-bottom': getOptions().paddingBottom
        });
      }

      if (typeof getOptions().sectionsColor[index] !== 'undefined') {
        css(sectionElem, {
          'background-color': getOptions().sectionsColor[index]
        });
      }

      if (typeof getOptions().anchors[index] !== 'undefined') {
        sectionElem.setAttribute('data-anchor', section.anchor);
      }

      if (!hasSlides) {
        addTableClass(section);
      }
    }
    /**
    * Gets the active section.
    */

    function getActiveSection() {
      return getState().activeSection;
    }

    function getSectionFromPanel(panel) {
      return panel.isSection ? panel : panel.parent;
    }

    EventEmitter.on(events.bindEvents, bindEvents$a);

    function bindEvents$a() {
      // We can't focus scrollOverflow before scrolling
      // to the anchor (if we need to)
      EventEmitter.on(events.onAfterRenderNoAnchor, afterRender);
      EventEmitter.on(events.afterSlideLoads, scrollOverflowHandler.afterSectionLoads);
    }

    function afterRender() {
      if (getOptions().scrollOverflow && !getOptions().scrollBar) {
        scrollOverflowHandler.makeScrollable();
        scrollOverflowHandler.afterSectionLoads();
      }
    }

    var scrollOverflowHandler = {
      focusedElem: null,
      timeBeforeReachingLimit: null,
      timeLastScroll: null,
      preventScrollWhileMoving: function preventScrollWhileMoving(e) {
        if (!state.canScroll) {
          preventDefault(e);
          return false;
        }
      },
      afterSectionLoads: function afterSectionLoads() {
        if (!getOptions().scrollOverflow) {
          return;
        } // Unfocusing the scrollable element from the orgin section/slide


        if (doc.activeElement === this.focusedElem) {
          // @ts-ignore
          this.focusedElem.blur();
        }

        var scrollableItem = scrollOverflowHandler.getScrollableItem(getState().activeSection.item); // On desktop we focus the scrollable to be able to use the mouse wheel
        // We avoid it on mobile due to a bug in iOS Safari

        if (scrollableItem && !isTouchDevice && !isTouch) {
          this.focusedElem = scrollableItem;
          this.focusedElem.focus();
        }
      },
      makeScrollable: function makeScrollable() {
        if (getOptions().scrollOverflowMacStyle && !isMacDevice) {
          addClass($body, 'fp-scroll-mac');
        }

        getState().panels.forEach(function (el) {
          if (el.slides && el.slides.length) {
            return;
          }

          if (hasClass(el.item, AUTO_HEIGHT_RESPONSIVE) && isResponsiveMode()) {
            return;
          } else {
            var item = getSlideOrSection(el.item);
            var shouldBeScrollable = scrollOverflowHandler.shouldBeScrollable(el.item);
            var section = getSectionFromPanel(el);

            if (isIE11) {
              var toggleAction = shouldBeScrollable ? 'addClass' : 'removeClass';
              utils[toggleAction](section.item, IS_OVERFLOW);
              utils[toggleAction](el.item, IS_OVERFLOW);
            } else {
              addClass(section.item, IS_OVERFLOW);
              addClass(el.item, IS_OVERFLOW);
            }

            if (!el.hasScroll) {
              scrollOverflowHandler.createWrapper(item);
              scrollOverflowHandler.bindEvents(item);
            } // updating the state now in case 
            // this is executed on page load (after images load)


            el.hasScroll = true;
          }
        });
      },
      bindEvents: function bindEvents(item) {
        scrollOverflowHandler.getScrollableItem(item).addEventListener('scroll', scrollOverflowHandler.onPanelScroll);
        item.addEventListener('wheel', scrollOverflowHandler.preventScrollWhileMoving, {
          passive: false
        });
        item.addEventListener('keydown', scrollOverflowHandler.preventScrollWhileMoving, {
          passive: false
        });
      },
      createWrapper: function createWrapper(item) {
        var overflowWrapper = document.createElement('div');
        overflowWrapper.className = OVERFLOW;
        wrapInner(item, overflowWrapper);
        overflowWrapper.setAttribute('tabindex', '-1');
      },
      destroyWrapper: function destroyWrapper(item) {
        var overflowWrapper = $(OVERFLOW_SEL, item)[0];

        if (overflowWrapper) {
          unwrap(overflowWrapper);
          item.removeAttribute('tabindex');
        }
      },
      getScrollableItem: function getScrollableItem(sectionItem) {
        var panel = getSlideOrSection(sectionItem);
        return $(OVERFLOW_SEL, panel)[0] || panel;
      },
      hasScroll: function hasScroll(panelItem) {
        return hasClass(panelItem, OVERFLOW) || $(OVERFLOW_SEL, panelItem)[0] != null;
      },
      isScrollable: function isScrollable(panel) {
        return panel.isSection && panel.activeSlide ? panel.activeSlide.hasScroll : panel.hasScroll;
      },
      shouldBeScrollable: function shouldBeScrollable(item) {
        var scrollable = scrollOverflowHandler.getScrollableItem(item);
        return scrollable.scrollHeight > win.innerHeight;
      },
      isScrolled: function isScrolled(direction, el) {
        if (!state.canScroll) {
          return false;
        }

        var scrollableItem = scrollOverflowHandler.getScrollableItem(el);

        if (!getOptions().scrollOverflow || !hasClass(scrollableItem, OVERFLOW) || hasClass(getSlideOrSection(el), 'fp-noscroll')) {
          return true;
        } // ie11 wrongly calculates scrollHeight when using the CSS style
        // overflow: auto   It adds 1 more pixel compared to offsetHeight


        var ie11offset = isIE11 ? 1 : 0;
        var positionY = scrollableItem.scrollTop;
        var isTopReached = direction === 'up' && positionY <= 0;
        var isBottomReached = direction === 'down' && scrollableItem.scrollHeight <= Math.ceil(scrollableItem.offsetHeight + positionY) + ie11offset;
        var isScrolled = isTopReached || isBottomReached;

        if (!isScrolled) {
          this.timeBeforeReachingLimit = new Date().getTime();
        }

        return isScrolled;
      },
      shouldMovePage: function shouldMovePage() {
        this.timeLastScroll = new Date().getTime();
        var timeDiff = this.timeLastScroll - scrollOverflowHandler.timeBeforeReachingLimit;
        var isUsingTouch = isTouchDevice || isTouch;
        var isGrabbing = isUsingTouch && state.isGrabbing;
        var isNotFirstTimeReachingLimit = state.isUsingWheel && timeDiff > 600;
        return isGrabbing && timeDiff > 400 || isNotFirstTimeReachingLimit;
      },
      onPanelScroll: function () {
        var prevPosition = 0;
        return function (e) {
          var currentPosition = e.target.scrollTop;
          var direction = state.touchDirection !== 'none' ? state.touchDirection : prevPosition < currentPosition ? 'down' : 'up';
          prevPosition = currentPosition;

          if (isFunction(getOptions().onScrollOverflow)) {
            fireCallback('onScrollOverflow', {
              position: currentPosition,
              direction: direction
            });
          }

          if (hasClass(e.target, OVERFLOW) && state.canScroll) {
            if (scrollOverflowHandler.isScrolled(direction, e.target) && scrollOverflowHandler.shouldMovePage()) {
              EventEmitter.emit(events.onScrollOverflowScrolled, {
                direction: direction
              });
            }
          }
        };
      }()
    };

    var g_prevActiveSectionIndex = null;
    var g_prevActiveSlideIndex = null;
    /** 
     * Updates the state of the app.
     */

    function updateState() {
      state.activeSection = null;
      state.sections.map(function (section) {
        var isActive = hasClass(section.item, ACTIVE);
        section.isActive = isActive;
        section.hasScroll = scrollOverflowHandler.hasScroll(section.item);

        if (isActive) {
          state.activeSection = section;
        }

        if (section.slides.length) {
          section.activeSlide = null;
          section.slides.map(function (slide) {
            var isActiveSlide = hasClass(slide.item, ACTIVE);
            slide.hasScroll = scrollOverflowHandler.hasScroll(section.item);
            slide.isActive = isActiveSlide;

            if (isActiveSlide) {
              section.activeSlide = slide;
            }
          });
        }
      });
      scrollToNewActivePanel();
    }
    function updateStructuralState() {
      var allSectionItems = $(getOptions().sectionSelector, getContainer());
      var sectionsItems = getVisible(allSectionItems);
      var allSections = Array.from(allSectionItems).map(function (item) {
        return new SectionPanel(item);
      });
      var sections = allSections.filter(function (item) {
        return item.isVisible;
      });
      var slides = sections.reduce(function (acc, section) {
        return acc.concat(section.slides);
      }, []); // keeping track of the previously active section

      g_prevActiveSectionIndex = getPrevActivePanelIndex(state.activeSection);
      g_prevActiveSlideIndex = getPrevActivePanelIndex(state.activeSection ? state.activeSection.activeSlide : null);
      state.numSections = sectionsItems.length;
      state.numSlides = sections.reduce(function (acc, section) {
        return acc + section.slides.length;
      }, 0);
      state.sections = sections;
      state.sectionsIncludingHidden = allSections;
      state.slides = slides;
      state.panels = state.sections.concat(state.slides);
    }

    function getPrevActivePanelIndex(activePanel) {
      if (!activePanel) {
        return null;
      }

      var prevActivePanelItem = activePanel ? activePanel.item : null;
      var hiddenPanels = activePanel.isSection ? state.sectionsIncludingHidden : state.activeSection.slidesIncludingHidden;

      if (prevActivePanelItem) {
        var panel = getPanelByElement(hiddenPanels, prevActivePanelItem);
        return panel ? panel.index() : null;
      }

      return null;
    }
    /**
     * When changes in the DOM take place there's a change 
     * the active section is now hidden or removed. 
     * fullPage.js will scroll to the closest section nearby.
     */


    function scrollToNewActivePanel() {
      var activeSection = state.activeSection;
      var activeSectionHasSlides = state.activeSection ? state.activeSection.slides.length : false;
      var activeSlide = state.activeSection ? state.activeSection.activeSlide : null; // Hidding / removing the active section ?

      if (!activeSection && state.sections.length && !getState().isBeyondFullpage && g_prevActiveSectionIndex) {
        var newActiveSection = getNewActivePanel(g_prevActiveSectionIndex, state.sections);

        if (newActiveSection) {
          state.activeSection = newActiveSection;
          state.activeSection.isActive = true;
          addClass(state.activeSection.item, ACTIVE);
        }

        if (state.activeSection) {
          silentScroll(state.activeSection.item.offsetTop);
        }
      }

      if (activeSectionHasSlides && !activeSlide && g_prevActiveSlideIndex) {
        var newActiveSlide = getNewActivePanel(g_prevActiveSlideIndex, state.activeSection.slides);

        if (newActiveSlide) {
          state.activeSection.activeSlide = newActiveSlide;
          state.activeSection.activeSlide.isActive = true;
          addClass(state.activeSection.activeSlide.item, ACTIVE);
        }

        if (state.activeSection.activeSlide) {
          silentLandscapeScroll(state.activeSection.activeSlide.item, 'internal');
        }
      }
    }

    function getNewActivePanel(prevActivePanelIndex, siblings) {
      var newActiveSection;
      var prevIndex = prevActivePanelIndex - 1;
      var nextIndex = prevActivePanelIndex;

      do {
        newActiveSection = siblings[prevIndex] || siblings[nextIndex];

        if (newActiveSection) {
          break;
        }

        prevIndex = prevIndex - 1;
        nextIndex = nextIndex + 1;
      } while (prevIndex >= 0 || nextIndex < siblings.length);

      return newActiveSection;
    }
    /**
    * Section object
    */


    var SectionPanel = function SectionPanel(el) {
      var _this = this;

      [].push.call(arguments, getOptions().sectionSelector);
      Item.apply(this, arguments);
      this.allSlidesItems = $(getOptions().slideSelector, el);
      this.slidesIncludingHidden = Array.from(this.allSlidesItems).map(function (item) {
        return new SlidePanel(item, _this);
      });
      this.slides = this.slidesIncludingHidden.filter(function (slidePanel) {
        return slidePanel.isVisible;
      });
      this.activeSlide = this.slides.length ? this.slides.filter(function (slide) {
        return slide.isActive;
      })[0] || this.slides[0] : null;
    };
    SectionPanel.prototype = Item.prototype;
    SectionPanel.prototype.constructor = SectionPanel;
    /**
    * Slide object
    */

    var SlidePanel = function SlidePanel(el, section) {
      this.parent = section;
      Item.call(this, el, getOptions().slideSelector);
    };

    SlidePanel.prototype = Item.prototype;
    SlidePanel.prototype.constructor = SectionPanel;

    /**
    * Adds internal classes to be able to provide customizable selectors
    * keeping the link with the style sheet.
    */

    function addInternalSelectors() {
      addClass($(getOptions().sectionSelector, getContainer()), SECTION);
      addClass($(getOptions().slideSelector, getContainer()), SLIDE);
    }

    /**
    * Styles the horizontal slides for a section.
    */

    function styleSlides(section) {
      var numSlides = section.slides.length;
      var slidesElems = section.allSlidesItems;
      var slides = section.slides;
      var sliderWidth = numSlides * 100;
      var slideWidth = 100 / numSlides;

      if (!$(SLIDES_WRAPPER_SEL, section.item)[0]) {
        var slidesWrapper = doc.createElement('div');
        slidesWrapper.className = SLIDES_WRAPPER; //fp-slides

        wrapAll(slidesElems, slidesWrapper);
        var slidesContainer = doc.createElement('div');
        slidesContainer.className = SLIDES_CONTAINER; //fp-slidesContainer

        wrapAll(slidesElems, slidesContainer);
      }

      css($(SLIDES_CONTAINER_SEL, section.item), {
        'width': sliderWidth + '%'
      });

      if (numSlides > 1) {
        if (getOptions().controlArrows) {
          createSlideArrows(section);
        }

        if (getOptions().slidesNavigation) {
          addSlidesNavigation(section);
        }
      }

      slides.forEach(function (slide) {
        css(slide.item, {
          'width': slideWidth + '%'
        });

        if (getOptions().verticalCentered) {
          addTableClass(slide);
        }
      });
      var startingSlide = section.activeSlide || null; //if the slide won't be an starting point, the default will be the first one
      //the active section isn't the first one? Is not the first slide of the first section? Then we load that section/slide by default.

      if (startingSlide != null && state.activeSection && (state.activeSection.index() !== 0 || state.activeSection.index() === 0 && startingSlide.index() !== 0)) {
        silentLandscapeScroll(startingSlide.item, 'internal');
      } else {
        addClass(slidesElems[0], ACTIVE);
      }
    }

    var g_wrapperObserver;
    var g_wrapperObserveConfig = {
      attributes: false,
      subtree: true,
      childList: true,
      characterData: true
    };
    EventEmitter.on(events.bindEvents, bindEvents$9);
    FP.render = onContentChange;

    function bindEvents$9() {
      if (getOptions().observer && "MutationObserver" in window && $(WRAPPER_SEL)[0]) {
        g_wrapperObserver = createObserver($(WRAPPER_SEL)[0], onContentChange, g_wrapperObserveConfig);
      }

      EventEmitter.on(events.contentChanged, onContentChange);
    }
    /**
     * Creates a Mutation observer.
     */


    function createObserver(target, callback, config) {
      var observer = new MutationObserver(callback);
      observer.observe(target, config);
      return observer;
    }

    function didSlidesChange() {
      return getVisible($(getOptions().slideSelector, getContainer())).length !== getState().numSlides;
    }

    function didSectionsChange() {
      return getVisible($(getOptions().sectionSelector, getContainer())).length !== getState().numSections;
    }

    function didSectionsOrSlidesChange() {
      return didSlidesChange() || didSectionsChange();
    }
    /**
     * Listen to changes on sections and fires reBuild
     * when those changes affect the section height.
     */


    function onContentChange(mutations) {
      var _didSlidesChange = didSlidesChange();

      if (didSectionsOrSlidesChange() && !state.isDoingContinousVertical) {
        if (getOptions().observer && g_wrapperObserver) {
          // Temporally disabling the observer while 
          // we modidy the DOM again
          g_wrapperObserver.disconnect();
        }

        updateStructuralState();
        updateState(); // Removing navs and anchors options

        getOptions().anchors = [];
        remove($(SECTION_NAV_SEL));
        addInternalSelectors();
        setOptionsFromDOM();

        if (getOptions().navigation) {
          addVerticalNavigation();
        }

        if (_didSlidesChange) {
          remove($(SLIDES_NAV_SEL));
          remove($(SLIDES_ARROW_SEL));
        }

        getState().sections.forEach(function (section) {
          if (section.slides.length) {
            if (_didSlidesChange) {
              styleSlides(section);
            }
          } else {
            styleSection(section);
          }
        });
      }

      if (getOptions().observer && g_wrapperObserver && $(WRAPPER_SEL)[0]) {
        g_wrapperObserver.observe($(WRAPPER_SEL)[0], g_wrapperObserveConfig);
      }
    }

    var supportsPassiveEvents = function () {
      //cheks for passive event support
      var g_supportsPassive = false;

      try {
        var opts = Object.defineProperty({}, 'passive', {
          get: function get() {
            g_supportsPassive = true;
          }
        });
        windowAddEvent("testPassive", null, opts);
        windowRemoveEvent("testPassive", null, opts);
      } catch (e) {}

      return function () {
        return g_supportsPassive;
      };
    }();

    function getPassiveOptionsIfPossible() {
      return supportsPassiveEvents() ? {
        passive: false
      } : false;
    }

    var wheelDataHandler = function () {
      var _prevTime = new Date().getTime();

      var _scrollings = [];
      var isScrollingVertically;
      var direction;
      return {
        registerEvent: function registerEvent(e) {
          e = e || win.event;
          var value = e.wheelDelta || -e.deltaY || -e.detail;
          var delta = Math.max(-1, Math.min(1, value));
          var horizontalDetection = typeof e.wheelDeltaX !== 'undefined' || typeof e.deltaX !== 'undefined';
          isScrollingVertically = Math.abs(e.wheelDeltaX) < Math.abs(e.wheelDelta) || Math.abs(e.deltaX) < Math.abs(e.deltaY) || !horizontalDetection;
          var curTime = new Date().getTime();
          direction = delta < 0 ? 'down' : 'up'; //Limiting the array to 150 (lets not waste memory!)

          if (_scrollings.length > 149) {
            _scrollings.shift();
          } //keeping record of the previous scrollings


          _scrollings.push(Math.abs(value)); //time difference between the last scroll and the current one


          var timeDiff = curTime - _prevTime;
          _prevTime = curTime; //haven't they scrolled in a while?
          //(enough to be consider a different scrolling action to scroll another section)

          if (timeDiff > 200) {
            //emptying the array, we dont care about old scrollings for our averages
            _scrollings = [];
          }
        },
        isAccelerating: function isAccelerating() {
          var averageEnd = getAverage(_scrollings, 10);
          var averageMiddle = getAverage(_scrollings, 70);
          var isAccelerating = averageEnd >= averageMiddle;
          return _scrollings.length ? isAccelerating && isScrollingVertically : false;
        },
        getDirection: function getDirection() {
          return direction;
        }
      };
    }();

    function scrollBeyondFullPage() {
      var dtop = getDestinationOffset();
      var scrollSettings = getScrollSettings(dtop);
      FP.test.top = -dtop + 'px';
      setState({
        canScroll: false
      });
      scrollTo(scrollSettings.element, scrollSettings.options, getOptions().scrollingSpeed, function () {
        setTimeout(function () {
          setState({
            isBeyondFullpage: true
          });
          setState({
            canScroll: true
          });
        }, 30);
      });
    }
    function onKeyDown() {
      if (!isFullPageAbove()) {
        return;
      } else {
        scrollUpToFullpage();
      }
    }
    function scrollUpToFullpage() {
      var scrollSettings = getScrollSettings(getLast(getState().sections).item.offsetTop);
      setState({
        canScroll: false
      });
      scrollTo(scrollSettings.element, scrollSettings.options, getOptions().scrollingSpeed, function () {
        setState({
          canScroll: true
        });
        setState({
          isBeyondFullpage: false
        });
        setState({
          isAboutToScrollToFullPage: false
        });
      });
    }

    function getDestinationOffset() {
      if (!getOptions().css3) {
        return getLast(getState().sections).item.offsetTop + getLast(getState().sections).item.offsetHeight;
      }

      return getScrollTop() + getWindowHeight();
    }

    function beyondFullPageHandler(container, e) {
      new Date().getTime();
      var pauseScroll = getState().isBeyondFullpage && container.getBoundingClientRect().bottom >= 0 && wheelDataHandler.getDirection() === 'up';
      var g_isAboutToScrollToFullPage = getState().isAboutToScrollToFullPage;

      if (g_isAboutToScrollToFullPage) {
        preventDefault(e);
        return false;
      }

      if (getState().isBeyondFullpage) {
        if (!pauseScroll) {
          keyframeTime('set', 'beyondFullpage', 1000);
        } else {
          var shouldSetFixedPosition = !g_isAboutToScrollToFullPage && (!keyframeTime('isNewKeyframe', 'beyondFullpage') || !wheelDataHandler.isAccelerating());
          var scrollSettings;

          if (shouldSetFixedPosition) {
            scrollSettings = getScrollSettings(getLast(getState().sections).item.offsetTop + getLast(getState().sections).item.offsetHeight);
            scrollSettings.element.scrollTo(0, scrollSettings.options);
            setState({
              isAboutToScrollToFullPage: false
            });
            preventDefault(e);
            return false;
          } else if (wheelDataHandler.isAccelerating()) {
            pauseScroll = false;
            setState({
              isAboutToScrollToFullPage: true
            });
            setState({
              scrollTrigger: 'wheel'
            });
            scrollUpToFullpage();
            preventDefault(e);
            return false;
          }
        }

        if (!g_isAboutToScrollToFullPage) {
          // allow normal scrolling, but quitting
          if (!pauseScroll) {
            return true;
          }
        }
      }
    }

    var keyframeTime = function () {
      var isNew = false;
      var frames = {};
      var timeframes = {};
      return function (action, name, timeframe) {
        switch (action) {
          case 'set':
            frames[name] = new Date().getTime();
            timeframes[name] = timeframe;
            break;

          case 'isNewKeyframe':
            var current = new Date().getTime();
            isNew = current - frames[name] > timeframes[name];
            break;
        }

        return isNew;
      };
    }();

    FP.moveSectionDown = moveSectionDown;
    /**
    * Moves the page down one section.
    */

    function moveSectionDown() {
      var next = getState().activeSection.next(); //looping to the top if there's no more sections below

      if (!next && (getOptions().loopBottom || getOptions().continuousVertical)) {
        next = getState().sections[0];
      }

      if (next != null) {
        scrollPage(next, null, false);
      } else if (hasContentBeyondFullPage()) {
        EventEmitter.emit(events.scrollBeyondFullpage);
      }
    }

    function hasContentBeyondFullPage() {
      return getContainer().scrollHeight < $body.scrollHeight;
    }

    FP.moveSectionUp = moveSectionUp;
    /**
    * Moves the page up one section.
    */

    function moveSectionUp() {
      var prev = getState().activeSection.prev(); //looping to the bottom if there's no more sections above

      if (!prev && (getOptions().loopTop || getOptions().continuousVertical)) {
        prev = getLast(getState().sections);
      }

      if (prev != null) {
        scrollPage(prev, null, true);
      }
    }

    var oldPageY = 0;
    /**
    * Detecting the direction of the mouse movement.
    * Used only for the middle button of the mouse.
    */

    function mouseMoveHandler(e) {
      if (!getOptions().autoScrolling) {
        return;
      }

      if (state.canScroll) {
        // moving up
        if (e.pageY < oldPageY && getIsScrollAllowed().m.up) {
          moveSectionUp();
        } // moving down
        else if (e.pageY > oldPageY && getIsScrollAllowed().m.down) {
          moveSectionDown();
        }
      }

      oldPageY = e.pageY;
    }
    function setOldPageY(value) {
      oldPageY = value;
    }

    /**
    * Determines the way of scrolling up or down:
    * by 'automatically' scrolling a section or by using the default and normal scrolling.
    */

    function scrolling(type) {
      if (!getIsScrollAllowed().m[type]) {
        return;
      }

      var scrollSection = type === 'down' ? moveSectionDown : moveSectionUp;

      if (getOptions().scrollOverflow && scrollOverflowHandler.isScrollable(getState().activeSection)) {
        //is the scrollbar at the start/end of the scroll?
        if (scrollOverflowHandler.isScrolled(type, getState().activeSection.item) && scrollOverflowHandler.shouldMovePage()) {
          scrollSection();
        }
      } else {
        scrollSection();
      }
    }

    var touchStartY = 0;
    var touchStartX = 0;
    var touchEndY = 0;
    var touchEndX = 0;
    var MSPointer = getMSPointer();
    var pointers = {
      touchmove: 'ontouchmove' in window ? 'touchmove' : MSPointer ? MSPointer.move : null,
      touchstart: 'ontouchstart' in window ? 'touchstart' : MSPointer ? MSPointer.down : null
    };
    /**
    * Adds the possibility to auto scroll through sections on touch devices.
    */

    function addTouchHandler() {
      if (!pointers.touchmove) {
        return;
      }

      if (isTouchDevice || isTouch) {
        if (getOptions().autoScrolling) {
          $body.removeEventListener(pointers.touchmove, preventBouncing, {
            passive: false
          });
          $body.addEventListener(pointers.touchmove, preventBouncing, {
            passive: false
          });
        }

        var touchWrapper = getOptions().touchWrapper;
        touchWrapper.removeEventListener(pointers.touchstart, touchStartHandler);
        touchWrapper.removeEventListener(pointers.touchmove, touchMoveHandler, {
          passive: false
        });
        touchWrapper.addEventListener(pointers.touchstart, touchStartHandler);
        touchWrapper.addEventListener(pointers.touchmove, touchMoveHandler, {
          passive: false
        });
      }
    }
    /**
    * Removes the auto scrolling for touch devices.
    */

    function removeTouchHandler() {
      if (!pointers.touchmove) {
        return;
      }

      if (isTouchDevice || isTouch) {
        // normalScrollElements requires it off #2691
        if (getOptions().autoScrolling) {
          $body.removeEventListener(pointers.touchmove, touchMoveHandler, {
            passive: false
          });
          $body.removeEventListener(pointers.touchmove, preventBouncing, {
            passive: false
          });
        }

        var touchWrapper = getOptions().touchWrapper;
        touchWrapper.removeEventListener(pointers.touchstart, touchStartHandler);
        touchWrapper.removeEventListener(pointers.touchmove, touchMoveHandler, {
          passive: false
        });
      }
    }
    /* Detecting touch events

    * As we are changing the top property of the page on scrolling, we can not use the traditional way to detect it.
    * This way, the touchstart and the touch moves shows an small difference between them which is the
    * used one to determine the direction.
    */

    function touchMoveHandler(e) {
      var activeSection = closest(e.target, SECTION_SEL) || getState().activeSection.item;
      var hasActiveSectionOverflow = scrollOverflowHandler.isScrollable(getState().activeSection);

      if (isReallyTouch(e)) {
        setState({
          isGrabbing: true,
          isUsingWheel: false
        });

        if (getOptions().autoScrolling) {
          if (hasActiveSectionOverflow && !state.canScroll) {
            //preventing the easing on iOS devices
            preventDefault(e);
          }
        }

        var touchEvents = getEventsPage(e);
        touchEndY = touchEvents.y;
        touchEndX = touchEvents.x;
        var isVerticalMovementEnough = Math.abs(touchStartY - touchEndY) > win.innerHeight / 100 * getOptions().touchSensitivity;
        var isHorizontalMovementEnough = Math.abs(touchStartX - touchEndX) > getWindowWidth() / 100 * getOptions().touchSensitivity;
        var isHorizontalPredominantMove = $(SLIDES_WRAPPER_SEL, activeSection).length && Math.abs(touchStartX - touchEndX) > Math.abs(touchStartY - touchEndY);
        var directionH = touchStartX > touchEndX ? 'right' : 'left';
        var directionV = touchStartY > touchEndY ? 'down' : 'up';
        var direction = isHorizontalPredominantMove ? directionH : directionV;
        setState({
          touchDirection: direction
        }); //if movement in the X axys is greater than in the Y and the currect section has slides...

        if (isHorizontalPredominantMove) {
          //is the movement greater than the minimum resistance to scroll?
          if (!state.slideMoving && isHorizontalMovementEnough) {
            if (touchStartX > touchEndX) {
              if (getIsScrollAllowed().m.right) {
                EventEmitter.emit(events.moveSlideRight, {
                  section: activeSection
                });
              }
            } else {
              if (getIsScrollAllowed().m.left) {
                EventEmitter.emit(events.moveSlideLeft, {
                  section: activeSection
                });
              }
            }
          }
        } //vertical scrolling (only when autoScrolling is enabled)
        else if (getOptions().autoScrolling && state.canScroll) {
          //is the movement greater than the minimum resistance to scroll?
          if (isVerticalMovementEnough) {
            scrolling(directionV);
          }
        }
      }
    }
    /**
    * As IE >= 10 fires both touch and mouse events when using a mouse in a touchscreen
    * this way we make sure that is really a touch event what IE is detecting.
    */


    function isReallyTouch(e) {
      //if is not IE   ||  IE is detecting `touch` or `pen`
      return typeof e.pointerType === 'undefined' || e.pointerType != 'mouse';
    }
    /**
    * Handler for the touch start event.
    */


    function touchStartHandler(e) {
      //stopping the auto scroll to adjust to a section
      if (getOptions().fitToSection) {
        setState({
          activeAnimation: false
        });
      }

      if (isReallyTouch(e)) {
        var touchEvents = getEventsPage(e);
        touchStartY = touchEvents.y;
        touchStartX = touchEvents.x;
      }

      windowAddEvent('touchend', touchEndHandler);
    }
    /**
    * Handler for the touch end event.
    */


    function touchEndHandler() {
      windowRemoveEvent('touchend', touchEndHandler);
      setState({
        isGrabbing: false
      });
    }
    /**
    * Gets the pageX and pageY properties depending on the browser.
    * https://github.com/alvarotrigo/fullPage.js/issues/194#issuecomment-34069854
    */


    function getEventsPage(e) {
      var events = {};
      events.y = typeof e.pageY !== 'undefined' && (e.pageY || e.pageX) ? e.pageY : e.touches[0].pageY;
      events.x = typeof e.pageX !== 'undefined' && (e.pageY || e.pageX) ? e.pageX : e.touches[0].pageX; //in touch devices with scrollBar:true, e.pageY is detected, but we have to deal with touch events. #1008

      if (isTouch && isReallyTouch(e) && getOptions().scrollBar && typeof e.touches !== 'undefined') {
        events.y = e.touches[0].pageY;
        events.x = e.touches[0].pageX;
      }

      return events;
    }
    /*
    * Returns and object with Microsoft pointers (for IE<11 and for IE >= 11)
    * http://msdn.microsoft.com/en-us/library/ie/dn304886(v=vs.85).aspx
    */


    function getMSPointer() {
      var pointer; //IE >= 11 & rest of browsers

      if (win.PointerEvent) {
        pointer = {
          down: 'pointerdown',
          move: 'pointermove'
        };
      }

      return pointer;
    }
    /*
    * Preventing bouncing in iOS #2285
    */


    function preventBouncing(e) {
      if (getOptions().autoScrolling && isReallyTouch(e) && getIsScrollAllowed().m.up) {
        //preventing the easing on iOS devices
        if (!state.canScroll) {
          preventDefault(e);
        }
      }
    }

    FP.moveSlideLeft = moveSlideLeft;
    FP.moveSlideRight = moveSlideRight;
    /**
    * Slides a slider to the given direction.
    * Optional `section` param.
    */

    function moveSlide(direction, section) {
      var activeSectionItem = section == null ? getState().activeSection.item : section;
      var activeSection = getPanelByElement(state.sections, activeSectionItem);
      var slides = $(SLIDES_WRAPPER_SEL, activeSectionItem)[0]; // more than one slide needed and nothing should be sliding

      if (slides == null || state.slideMoving || activeSection.slides.length < 2) {
        return;
      }

      var currentSlide = activeSection.activeSlide;
      var destiny = direction === 'left' ? currentSlide.prev() : currentSlide.next(); //isn't there a next slide in the secuence?

      if (!destiny) {
        //respect loopHorizontal setting
        if (!getOptions().loopHorizontal) return;
        destiny = direction === 'left' ? getLast(activeSection.slides) : activeSection.slides[0];
      }

      setState({
        slideMoving: !FP.test.isTesting
      });
      landscapeScroll(slides, destiny.item, direction);
    }
    /**
    * Slides left the slider of the active section.
    * Optional `section` param.
    */

    function moveSlideLeft(section) {
      moveSlide('left', section);
    }
    /**
    * Slides right the slider of the active section.
    * Optional `section` param.
    */

    function moveSlideRight(section) {
      moveSlide('right', section);
    }

    /**
    * Gets a section by its anchor / index
    */

    function getSectionByAnchor(sectionAnchor) {
      var section = getState().sections.filter(function (section) {
        return section.anchor === sectionAnchor;
      })[0];

      if (!section) {
        var sectionIndex = typeof sectionAnchor !== 'undefined' ? sectionAnchor - 1 : 0;
        section = getState().sections[sectionIndex];
      }

      return section;
    }

    /**
    * Scrolls the slider to the given slide destination for the given section
    */

    function scrollSlider(slideElem) {
      if (slideElem != null) {
        landscapeScroll(closest(slideElem, SLIDES_WRAPPER_SEL), slideElem);
      }
    }

    /**
    * Scrolls to the given section and slide anchors
    */

    function scrollPageAndSlide(sectionAnchor, slideAnchor) {
      var section = getSectionByAnchor(sectionAnchor); //do nothing if there's no section with the given anchor name

      if (section == null) return;
      var slideElem = getSlideByAnchor(slideAnchor, section); //we need to scroll to the section and then to the slide

      if (section.anchor !== state.lastScrolledDestiny && !hasClass(section.item, ACTIVE)) {
        scrollPage(section, function () {
          scrollSlider(slideElem);
        });
      } //if we were already in the section
      else {
        scrollSlider(slideElem);
      }
    }
    /**
    * Gets a slide inside a given section by its anchor / index
    */

    function getSlideByAnchor(slideAnchor, section) {
      var slide = section.slides.filter(function (slide) {
        return slide.anchor === slideAnchor;
      })[0];

      if (slide == null) {
        slideAnchor = typeof slideAnchor !== 'undefined' ? slideAnchor : 0;
        slide = section.slides[slideAnchor];
      }

      return slide ? slide.item : null;
    }

    FP.moveTo = moveTo$1;
    /**
    * Moves the page to the given section and slide.
    * Anchors or index positions can be used as params.
    */

    function moveTo$1(sectionAnchor, slideAnchor) {
      var destiny = getSectionByAnchor(sectionAnchor);

      if (typeof slideAnchor !== 'undefined') {
        scrollPageAndSlide(sectionAnchor, slideAnchor);
      } else if (destiny != null) {
        scrollPage(destiny);
      }
    }

    //@ts-check
    var g_controlPressed;
    var g_keydownId;
    var g_elToFocus;
    EventEmitter.on(events.bindEvents, bindEvents$8);

    function bindEvents$8() {
      //when opening a new tab (ctrl + t), `control` won't be pressed when coming back.
      windowAddEvent('blur', blurHandler); //Sliding with arrow keys, both, vertical and horizontal

      docAddEvent('keydown', keydownHandler); //to prevent scrolling while zooming

      docAddEvent('keyup', keyUpHandler);
      EventEmitter.on(events.onDestroy, onDestroy$5);
      EventEmitter.on(events.afterSlideLoads, onAfterSlideLoads);
      EventEmitter.on(events.afterSectionLoads, afterSectionLoads);
    }

    function onDestroy$5() {
      clearTimeout(g_keydownId);
      docRemoveEvent('keydown', keydownHandler);
      docRemoveEvent('keyup', keyUpHandler);
    }

    function isInsideInput() {
      var activeElement = doc.activeElement;
      return matches(activeElement, 'textarea') || matches(activeElement, 'input') || matches(activeElement, 'select') || getAttr(activeElement, 'contentEditable') == "true" || getAttr(activeElement, 'contentEditable') == '';
    } //Sliding with arrow keys, both, vertical and horizontal


    function keydownHandler(e) {
      clearTimeout(g_keydownId);
      var keyCode = e.keyCode;
      var isPressingHorizontalArrows = [37, 39].indexOf(keyCode) > -1;
      var canScrollWithKeyboard = getOptions().autoScrolling || getOptions().fitToSection || isPressingHorizontalArrows; //tab?

      if (keyCode === 9) {
        onTab(e);
      } else if (!isInsideInput() && getOptions().keyboardScrolling && canScrollWithKeyboard) {
        g_controlPressed = e.ctrlKey;
        g_keydownId = setTimeout(function () {
          onkeydown(e);
        }, 0);
      }
    }
    /**
    * Keydown event
    */


    function onkeydown(e) {
      var shiftPressed = e.shiftKey;
      var activeElement = doc.activeElement;
      var isMediaFocused = matches(activeElement, 'video') || matches(activeElement, 'audio');
      var isScrolled = {
        up: scrollOverflowHandler.isScrolled('up', getState().activeSection.item),
        down: scrollOverflowHandler.isScrolled('down', getState().activeSection.item)
      };
      var isUsingHorizontalArrowKeys = [37, 39].indexOf(e.keyCode) > -1;
      cancelDirectionKeyEvents(e); //do nothing if we can not scroll or we are not using horizotnal key arrows.

      if (!state.canScroll && !isUsingHorizontalArrowKeys) {
        return;
      }

      setState({
        scrollTrigger: 'keydown'
      });

      switch (e.keyCode) {
        //up
        case 38:
        case 33:
          if (getIsScrollAllowed().k.up && isScrolled.up) {
            if (state.isBeyondFullpage) {
              EventEmitter.emit(events.onKeyDown, {
                e: e
              });
            } else {
              moveSectionUp();
            }
          }

          break;
        //down

        case 32:
          //spacebar
          if (shiftPressed && getIsScrollAllowed().k.up && !isMediaFocused && isScrolled.up) {
            moveSectionUp();
            break;
          }

        /* falls through */

        case 40:
        case 34:
          if (getIsScrollAllowed().k.down && isScrolled.down) {
            if (state.isBeyondFullpage) {
              return;
            } // space bar?


            if (e.keyCode !== 32 || !isMediaFocused) {
              moveSectionDown();
            }
          }

          break;
        //Home

        case 36:
          if (getIsScrollAllowed().k.up) {
            moveTo$1(1);
          }

          break;
        //End

        case 35:
          if (getIsScrollAllowed().k.down) {
            moveTo$1(getState().sections.length);
          }

          break;
        //left

        case 37:
          if (getIsScrollAllowed().k.left) {
            moveSlideLeft();
          }

          break;
        //right

        case 39:
          if (getIsScrollAllowed().k.right) {
            moveSlideRight();
          }

          break;

        default:
          return;
        // exit this handler for other keys
      }
    } //to prevent scrolling while zooming


    function keyUpHandler(e) {
      if (state.isWindowFocused) {
        //the keyup gets fired on new tab ctrl + t in Firefox
        g_controlPressed = e.ctrlKey;
      }
    } //when opening a new tab (ctrl + t), `control` won't be pressed when coming back.


    function blurHandler() {
      setState({
        isWindowFocused: false
      });
      g_controlPressed = false;
    }
    /**
    * Makes sure the tab key will only focus elements within the current section/slide
    * preventing this way from breaking the page.
    * Based on "Modals and keyboard traps"
    * from https://developers.google.com/web/fundamentals/accessibility/focus/using-tabindex
    */


    function onTab(e) {
      var isShiftPressed = e.shiftKey;
      var activeElement = doc.activeElement;
      var focusableElements = getFocusables(getSlideOrSection(getState().activeSection.item));

      function preventAndFocusFirst(e) {
        preventDefault(e);
        return focusableElements[0] ? focusableElements[0].focus() : null;
      } //outside any section or slide? Let's not hijack the tab!


      if (isFocusOutside(e)) {
        return;
      } //is there an element with focus?


      if (activeElement) {
        if (closest(activeElement, SECTION_ACTIVE_SEL + ',' + SECTION_ACTIVE_SEL + ' ' + SLIDE_ACTIVE_SEL) == null) {
          activeElement = preventAndFocusFirst(e);
        }
      } //no element if focused? Let's focus the first one of the section/slide
      else {
        preventAndFocusFirst(e);
      } //when reached the first or last focusable element of the section/slide
      //we prevent the tab action to keep it in the last focusable element


      var isFirstFocusableInSection = activeElement == focusableElements[0];
      var isLastFocusableInSection = activeElement == focusableElements[focusableElements.length - 1];
      var isNextItem = !isShiftPressed && isLastFocusableInSection;
      var isPrevItem = isShiftPressed && isFirstFocusableInSection;

      if (isPrevItem || isNextItem) {
        preventDefault(e);
        var focusInfo = getPanelWithFocusable(isPrevItem);
        var destinationPanel = focusInfo ? focusInfo.panel : null;

        if (destinationPanel) {
          var destinationSection = destinationPanel.isSection ? destinationPanel : destinationPanel.parent;
          EventEmitter.emit(events.onScrollPageAndSlide, {
            sectionAnchor: destinationSection.index() + 1,
            slideAnchor: destinationPanel.isSection ? 0 : destinationPanel.index()
          });
          g_elToFocus = focusInfo.itemToFocus;
          preventDefault(e);
        }
      }
    }

    function onAfterSlideLoads(v) {
      focusItem();
    }

    function afterSectionLoads(v) {
      if (!closest(g_elToFocus, SLIDE_SEL) || closest(g_elToFocus, SLIDE_ACTIVE_SEL)) {
        focusItem();
      }
    }

    function focusItem() {
      if (g_elToFocus) {
        g_elToFocus.focus();
        g_elToFocus = null;
      }
    }
    /**
     * Get's the panel containing the element to focus.
     *
     */


    function getPanelWithFocusable(isPrevItem) {
      var action = isPrevItem ? 'prevPanel' : 'nextPanel';
      var focusableElements = [];
      var panelWithFocusables;
      var currentPanel = getSlideOrSectionPanel(getActivePanel()[action]());

      do {
        focusableElements = getFocusables(currentPanel.item);

        if (focusableElements.length) {
          panelWithFocusables = {
            panel: currentPanel,
            itemToFocus: focusableElements[isPrevItem ? focusableElements.length - 1 : 0]
          };
        }

        currentPanel = getSlideOrSectionPanel(currentPanel[action]());
      } while (currentPanel && focusableElements.length === 0);

      return panelWithFocusables;
    }
    /**
    * Gets all the focusable elements inside the passed element.
    */


    function getFocusables(el) {
      return [].slice.call($(focusableElementsString, el)).filter(function (item) {
        return getAttr(item, 'tabindex') !== '-1' && //are also not hidden elements (or with hidden parents)
        item.offsetParent !== null;
      });
    }
    /**
    * Determines whether the focus is outside fullpage.js sections/slides or not.
    */


    function isFocusOutside(e) {
      var allFocusables = getFocusables(doc);
      var currentFocusIndex = allFocusables.indexOf(doc.activeElement);
      var focusDestinationIndex = e.shiftKey ? currentFocusIndex - 1 : currentFocusIndex + 1;
      var focusDestination = allFocusables[focusDestinationIndex];
      var destinationItemSlide = closest(focusDestination, SLIDE_SEL);
      var destinationItemSection = closest(focusDestination, SECTION_SEL);
      return !destinationItemSlide && !destinationItemSection;
    }

    function shouldCancelKeyboardNavigation(e) {
      // https://keycode.info/for/34
      // 40 = arrow down
      // 38 = arrow up
      // 32 = spacebar
      // 33  = PageUp
      // 34 = PageDown
      var keyControls = [40, 38, 32, 33, 34];
      return keyControls.indexOf(e.keyCode) > -1 && !state.isBeyondFullpage;
    } //preventing the scroll with arrow keys & spacebar & Page Up & Down keys


    function cancelDirectionKeyEvents(e) {
      if (shouldCancelKeyboardNavigation(e) && !closest(e.target, OVERFLOW_SEL)) {
        e.preventDefault();
      }
    }

    function getControlPressed() {
      return g_controlPressed;
    }

    var prevTime = new Date().getTime();
    var scrollings = [];
    FP.setMouseWheelScrolling = setMouseWheelScrolling;
    /**
    * Adds or remove the possibility of scrolling through sections by using the mouse wheel or the trackpad.
    */

    function setMouseWheelScrolling(value) {
      if (value) {
        addMouseWheelHandler();
        addMiddleWheelHandler();
      } else {
        removeMouseWheelHandler();
        removeMiddleWheelHandler();
      }
    }
    /**
    * Adds the auto scrolling action for the mouse wheel and trackpad.
    * After this function is called, the mousewheel and trackpad movements will scroll through sections
    * https://developer.mozilla.org/en-US/docs/Web/Events/wheel
    */


    function addMouseWheelHandler() {
      var prefix = '';

      var _addEventListener;

      if (win.addEventListener) {
        _addEventListener = "addEventListener";
      } else {
        _addEventListener = "attachEvent";
        prefix = 'on';
      } // detect available wheel event


      var support = 'onwheel' in doc.createElement('div') ? 'wheel' : // Modern browsers support "wheel"
      // @ts-ignore
      doc.onmousewheel !== undefined ? 'mousewheel' : // Webkit and IE support at least "mousewheel"
      'DOMMouseScroll'; // let's assume that remaining browsers are older Firefox

      var passiveEvent = getPassiveOptionsIfPossible();

      if (support == 'DOMMouseScroll') {
        doc[_addEventListener](prefix + 'MozMousePixelScroll', MouseWheelHandler, passiveEvent);
      } //handle MozMousePixelScroll in older Firefox
      else {
        doc[_addEventListener](prefix + support, MouseWheelHandler, passiveEvent);
      }
    }
    /**
    * Binding the mousemove when the mouse's middle button is pressed
    */


    function addMiddleWheelHandler() {
      getContainer().addEventListener('mousedown', mouseDownHandler);
      getContainer().addEventListener('mouseup', mouseUpHandler);
    }
    /**
    * Removes the auto scrolling action fired by the mouse wheel and trackpad.
    * After this function is called, the mousewheel and trackpad movements won't scroll through sections.
    */


    function removeMouseWheelHandler() {
      if (doc.addEventListener) {
        docRemoveEvent('mousewheel', MouseWheelHandler, false); //IE9, Chrome, Safari, Oper

        docRemoveEvent('wheel', MouseWheelHandler, false); //Firefox

        docRemoveEvent('MozMousePixelScroll', MouseWheelHandler, false); //old Firefox
      } else {
        // @ts-ignore
        doc.detachEvent('onmousewheel', MouseWheelHandler); //IE 6/7/8
      }
    }
    /**
    * Unbinding the mousemove when the mouse's middle button is released
    */


    function removeMiddleWheelHandler() {
      getContainer().removeEventListener('mousedown', mouseDownHandler);
      getContainer().removeEventListener('mouseup', mouseUpHandler);
    }
    /**
     * Detecting mousewheel scrolling
     *
     * http://blogs.sitepointstatic.com/examples/tech/mouse-wheel/index.html
     * http://www.sitepoint.com/html5-javascript-mouse-wheel/
     */


    function MouseWheelHandler(e) {
      var curTime = new Date().getTime();
      var isNormalScroll = hasClass($(COMPLETELY_SEL)[0], NORMAL_SCROLL);
      var isScrollAllowedBeyondFullPage = beyondFullPageHandler(getContainer(), e);

      if (!state.isUsingWheel) {
        setState({
          isGrabbing: false,
          isUsingWheel: true,
          touchDirection: 'none'
        });
      } //is scroll allowed?


      if (!getIsScrollAllowed().m.down && !getIsScrollAllowed().m.up) {
        preventDefault(e);
        return false;
      }

      if (isScrollAllowedBeyondFullPage) {
        return true;
      } else if (isScrollAllowedBeyondFullPage === false) {
        preventDefault(e);
        return false;
      } //autoscrolling and not zooming?


      if (getOptions().autoScrolling && !getControlPressed() && !isNormalScroll) {
        // cross-browser wheel delta
        e = e || win.event;
        var value = e.wheelDelta || -e.deltaY || -e.detail;
        var delta = Math.max(-1, Math.min(1, value));
        var horizontalDetection = typeof e.wheelDeltaX !== 'undefined' || typeof e.deltaX !== 'undefined';
        var isScrollingVertically = Math.abs(e.wheelDeltaX) < Math.abs(e.wheelDelta) || Math.abs(e.deltaX) < Math.abs(e.deltaY) || !horizontalDetection;
        var direction = delta < 0 ? 'down' : delta > 0 ? 'up' : 'none'; //Limiting the array to 150 (lets not waste memory!)

        if (scrollings.length > 149) {
          scrollings.shift();
        } //keeping record of the previous scrollings


        scrollings.push(Math.abs(value)); //preventing to scroll the site on mouse wheel when scrollbar is present

        if (getOptions().scrollBar) {
          preventDefault(e);
        } //time difference between the last scroll and the current one


        var timeDiff = curTime - prevTime;
        prevTime = curTime; //haven't they scrolled in a while?
        //(enough to be consider a different scrolling action to scroll another section)

        if (timeDiff > 200) {
          //emptying the array, we dont care about old scrollings for our averages
          scrollings = [];
        }

        setState({
          wheelDirection: direction
        });

        if (state.canScroll) {
          var averageEnd = getAverage(scrollings, 10);
          var averageMiddle = getAverage(scrollings, 70);
          var isAccelerating = averageEnd >= averageMiddle; //to avoid double swipes...

          if (isAccelerating && isScrollingVertically) {
            setState({
              scrollTrigger: 'wheel'
            }); //scrolling down?

            if (delta < 0) {
              scrolling('down');
            } //scrolling up?
            else {
              scrolling('up');
            }
          }
        }

        return false;
      }

      if (getOptions().fitToSection) {
        //stopping the auto scroll to adjust to a section
        setState({
          activeAnimation: false
        });
      }
    } //binding the mousemove when the mouse's middle button is released


    function mouseDownHandler(e) {
      //middle button
      if (e.which == 2) {
        setOldPageY(e.pageY);
        getContainer().addEventListener('mousemove', mouseMoveHandler);
      }
    } //unbinding the mousemove when the mouse's middle button is released


    function mouseUpHandler(e) {
      //middle button
      if (e.which == 2) {
        getContainer().removeEventListener('mousemove', mouseMoveHandler);
      }
    }
    /**
    * Adds or remove the mouse wheel hijacking
    */


    function setMouseHijack(value) {
      if (value) {
        setMouseWheelScrolling(true);
        addTouchHandler();
      } else {
        setMouseWheelScrolling(false);
        removeTouchHandler();
      }
    }

    var g_canFireMouseEnterNormalScroll = true;
    EventEmitter.on(events.bindEvents, bindEvents$7);

    function bindEvents$7() {
      /**
      * Applying normalScroll elements.
      * Ignoring the scrolls over the specified selectors.
      */
      if (getOptions().normalScrollElements) {
        ['mouseenter', 'touchstart'].forEach(function (eventName) {
          forMouseLeaveOrTouch(eventName, false);
        });
        ['mouseleave', 'touchend'].forEach(function (eventName) {
          forMouseLeaveOrTouch(eventName, true);
        });
      }

      EventEmitter.on(events.onDestroy, onDestroy$4);
    }

    function onDestroy$4() {
      ['mouseenter', 'touchstart', 'mouseleave', 'touchend'].forEach(function (eventName) {
        docRemoveEvent(eventName, onMouseEnterOrLeave, true); //true is required!
      });
    }

    function forMouseLeaveOrTouch(eventName, allowScrolling) {
      //a way to pass arguments to the onMouseEnterOrLeave function
      document['fp_' + eventName] = allowScrolling;
      docAddEvent(eventName, onMouseEnterOrLeave, true); //capturing phase
    }

    function onMouseEnterOrLeave(e) {
      var type = e.type;
      var isInsideOneNormalScroll = false; //onMouseLeave will use the destination target, not the one we are moving away from

      var target = type === 'mouseleave' ? e.toElement || e.relatedTarget : e.target; //coming from closing a normalScrollElements modal or moving outside viewport?

      if (target == document || !target) {
        setMouseHijack(true);
        return;
      }

      if (type === 'touchend') {
        g_canFireMouseEnterNormalScroll = false;
        setTimeout(function () {
          g_canFireMouseEnterNormalScroll = true;
        }, 800);
      } //preventing mouseenter event to do anything when coming from a touchEnd event
      //fixing issue #3576


      if (type === 'mouseenter' && !g_canFireMouseEnterNormalScroll) {
        return;
      }

      var normalSelectors = getOptions().normalScrollElements.split(',');
      normalSelectors.forEach(function (normalSelector) {
        if (!isInsideOneNormalScroll) {
          var isNormalScrollTarget = matches(target, normalSelector); //leaving a child inside the normalScoll element is not leaving the normalScroll #3661

          var isNormalScrollChildFocused = closest(target, normalSelector);

          if (isNormalScrollTarget || isNormalScrollChildFocused) {
            if (!FP.shared.isNormalScrollElement) {
              setMouseHijack(false);
            }

            FP.shared.isNormalScrollElement = true;
            isInsideOneNormalScroll = true;
          }
        }
      }); //not inside a single normal scroll element anymore?

      if (!isInsideOneNormalScroll && FP.shared.isNormalScrollElement) {
        setMouseHijack(true);
        FP.shared.isNormalScrollElement = false;
      }
    }

    FP.silentMoveTo = silentMoveTo;
    /**
    * Moves the page to the given section and slide with no animation.
    * Anchors or index positions can be used as params.
    */

    function silentMoveTo(sectionAnchor, slideAnchor) {
      setScrollingSpeed(0, 'internal');
      moveTo$1(sectionAnchor, slideAnchor);
      setScrollingSpeed(getOriginals().scrollingSpeed, 'internal');
    }

    var previousHeight = getWindowHeight();
    var windowsWidth = getWindowWidth();
    var g_resizeId;
    var g_isConsecutiveResize = false;
    var g_resizeMobileHandlerId;
    FP.reBuild = reBuild;
    EventEmitter.on(events.bindEvents, bindEvents$6);

    function bindEvents$6() {
      // Setting VH correctly in mobile devices
      resizeHandler(); //when resizing the site, we adjust the heights of the sections, slimScroll...

      windowAddEvent('resize', resizeHandler);
      EventEmitter.on(events.onDestroy, onDestroy$3);
    }

    function onDestroy$3() {
      clearTimeout(g_resizeId);
      clearTimeout(g_resizeMobileHandlerId);
      windowRemoveEvent('resize', resizeHandler);
    }
    /*
    * Resize event handler.
    */


    function resizeHandler() {
      if (!g_isConsecutiveResize) {
        if (getOptions().autoScrolling && !getOptions().scrollBar || !getOptions().fitToSection) {
          setSectionsHeight(getWindowHeight());
        }
      }

      fitToActiveSection();
      g_isConsecutiveResize = true; //in order to call the functions only when the resize is finished
      //http://stackoverflow.com/questions/4298612/jquery-how-to-call-resize-event-only-once-its-finished-resizing    

      clearTimeout(g_resizeId);
      g_resizeId = setTimeout(function () {
        //issue #3336 
        //(some apps or browsers, like Chrome/Firefox for Mobile take time to report the real height)
        //so we check it 3 times with intervals in that case
        // for(var i = 0; i< 4; i++){
        resizeActions();
        g_isConsecutiveResize = false; // }
      }, 400);
    }

    function fitToActiveSection() {
      if (isTouchDevice) {
        // Issue #4393 and previously in v3, #3336
        // (some apps or browsers, like Chrome/Firefox will delay a bit to scroll 
        // to the focused input
        for (var i = 0; i < 4; i++) {
          g_resizeMobileHandlerId = setTimeout(function () {
            window.requestAnimationFrame(function () {
              // on Android devices the browser scrolls to the focused element
              // messing up the whole page structure. So we need to update the
              // translate3d value when the keyboard shows/hides
              if (getOptions().autoScrolling && !getOptions().scrollBar) {
                setState({
                  isResizing: true
                });
                silentMoveTo(state.activeSection.index() + 1);
                setState({
                  isResizing: false
                });
              }
            });
          }, 200 * i);
        }
      }
    }
    /**
    * When resizing the site, we adjust the heights of the sections, slimScroll...
    */


    function resizeActions() {
      setState({
        isResizing: true
      });
      setSectionsHeight('');

      if (!getOptions().autoScrolling && !state.isBeyondFullpage) {
        setVhUnits();
      }

      EventEmitter.emit(events.contentChanged);
      updateState(); //checking if it needs to get responsive

      responsive(); // rebuild immediately on touch devices

      if (isTouchDevice) {
        var activeElement = doc.activeElement; //if the keyboard is NOT visible

        if (!matches(activeElement, 'textarea') && !matches(activeElement, 'input') && !matches(activeElement, 'select')) {
          var currentHeight = getWindowHeight(); //making sure the change in the viewport size is enough to force a rebuild. (20 % of the window to avoid problems when hidding scroll bars)

          if (Math.abs(currentHeight - previousHeight) > 20 * Math.max(previousHeight, currentHeight) / 100) {
            reBuild(true);
            previousHeight = currentHeight;
          }
        }
      } else {
        adjustToNewViewport();
      }

      setState({
        isResizing: false
      });
    }
    /**
     * When resizing is finished, we adjust the slides sizes and positions
     */


    function reBuild(resizing) {
      if (hasClass(getContainer(), DESTROYED)) {
        return;
      } //nothing to do if the plugin was destroyed
      //updating global vars


      setState({
        isResizing: true,
        windowsHeight: getWindowHeight(),
        windowsWidth: getWindowWidth()
      });
      var sections = getState().sections;

      for (var i = 0; i < sections.length; ++i) {
        var section = sections[i];
        var slidesWrap = $(SLIDES_WRAPPER_SEL, section.item)[0];
        var slides = section.slides; //adjusting the position fo the FULL WIDTH slides...

        if (slides.length > 1) {
          landscapeScroll(slidesWrap, section.activeSlide.item);
        }
      }

      if (getOptions().scrollOverflow) {
        scrollOverflowHandler.makeScrollable();
      }

      var sectionIndex = getState().activeSection.index();

      if (!state.isBeyondFullpage) {
        //isn't it the first section?
        if (sectionIndex) {
          //adjusting the position for the current section
          silentMoveTo(sectionIndex + 1);
        }
      }

      setState({
        isResizing: false
      });

      if (isFunction(getOptions().afterResize) && resizing) {
        getOptions().afterResize.call(getContainer(), win.innerWidth, win.innerHeight);
      }

      if (isFunction(getOptions().afterReBuild) && !resizing) {
        getOptions().afterReBuild.call(getContainer());
      }

      trigger(getContainer(), 'afterRebuild');
    }
    /**
    * Adjusts a section to the viewport if it has changed.
    */


    function adjustToNewViewport() {
      var newWindowHeight = getWindowHeight();
      var newWindowWidth = getWindowWidth();

      if (state.windowsHeight !== newWindowHeight || windowsWidth !== newWindowWidth) {
        setState({
          windowsHeight: newWindowHeight
        });
        windowsWidth = newWindowWidth;
        reBuild(true);
      }
    }

    function setSectionsHeight(value) {
      var propertyValue = value === '' ? '' : value + 'px';
      getState().sections.forEach(function (section) {
        css(section.item, {
          'height': propertyValue
        });
      });
    }
    /**
     * Defining the value in px of a VH unit. (Used for autoScrolling: false)
     * To fix the height issue on mobile devices when using VH units.
     * https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
     */


    function setVhUnits() {
      if (!getOptions().autoScrolling || getOptions().scrollBar) {
        // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
        var vh = win.innerHeight * 0.01; // Then we set the value in the --vh custom property to the root of the document

        doc.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
      }
    }

    function getAnchorsURL() {
      var section;
      var slide;
      var hash = win.location.hash;

      if (hash.length) {
        //getting the anchor link in the URL and deleting the `#`
        var anchorsParts = hash.replace('#', '').split('/'); //using / for visual reasons and not as a section/slide separator #2803

        var isFunkyAnchor = hash.indexOf('#/') > -1;
        section = isFunkyAnchor ? '/' + anchorsParts[1] : decodeURIComponent(anchorsParts[0]);
        var slideAnchor = isFunkyAnchor ? anchorsParts[2] : anchorsParts[1];

        if (slideAnchor && slideAnchor.length) {
          slide = decodeURIComponent(slideAnchor);
        }
      }

      return {
        section: section,
        slide: slide
      };
    }

    FP.setLockAnchors = setLockAnchors;
    EventEmitter.on(events.bindEvents, bindEvents$5);

    function bindEvents$5() {
      //detecting any change on the URL to scroll to the given anchor link
      //(a way to detect back history button as we play with the hashes on the URL)
      windowAddEvent('hashchange', hashChangeHandler);
      EventEmitter.on(events.onDestroy, onDestroy$2);
    }

    function onDestroy$2() {
      windowRemoveEvent('hashchange', hashChangeHandler);
    }
    /**
    * Sets lockAnchors
    */


    function setLockAnchors(value) {
      getOptions().lockAnchors = value;
    }
    /**
    * Detecting any change on the URL to scroll to the given anchor link
    * (a way to detect back history button as we play with the hashes on the URL)
    */


    function hashChangeHandler() {
      if (!state.isScrolling && !getOptions().lockAnchors) {
        var anchors = getAnchorsURL();
        var sectionAnchor = anchors.section;
        var slideAnchor = anchors.slide; //when moving to a slide in the first section for the first time (first time to add an anchor to the URL)

        var isFirstSlideMove = typeof state.lastScrolledDestiny === 'undefined';
        var isFirstScrollMove = typeof state.lastScrolledDestiny === 'undefined' && typeof slideAnchor === 'undefined' && !state.slideMoving;

        if (sectionAnchor && sectionAnchor.length) {
          /*in order to call scrollpage() only once for each destination at a time
          It is called twice for each scroll otherwise, as in case of using anchorlinks `hashChange`
          event is fired on every scroll too.*/
          if (sectionAnchor && sectionAnchor !== state.lastScrolledDestiny && !isFirstSlideMove || isFirstScrollMove || !state.slideMoving && state.lastScrolledSlide != slideAnchor) {
            EventEmitter.emit(events.onScrollPageAndSlide, {
              sectionAnchor: sectionAnchor,
              slideAnchor: slideAnchor
            });
          }
        }
      }
    }

    EventEmitter.on(events.bindEvents, bindEvents$4);

    function bindEvents$4() {
      docAddEvent('wheel', wheelDataHandler.registerEvent, getPassiveOptionsIfPossible());
      EventEmitter.on(events.scrollBeyondFullpage, scrollBeyondFullPage);
      EventEmitter.on(events.onKeyDown, onKeyDown);
    }

    EventEmitter.on(events.bindEvents, bindEvents$3);

    function bindEvents$3() {
      EventEmitter.on(events.onClickOrTouch, onClickOrTouch$1);
    }

    function onClickOrTouch$1(params) {
      var target = params.target;

      if (closest(target, getOptions().menu + ' [data-menuanchor]')) {
        menuItemsHandler.call(target, params);
      }
    } //Menu item handler when not using anchors or using lockAnchors:true


    function menuItemsHandler(e) {
      setState({
        scrollTrigger: 'menu'
      });

      if ($(getOptions().menu)[0] && (getOptions().lockAnchors || !getOptions().anchors.length)) {
        preventDefault(e);
        /*jshint validthis:true */

        EventEmitter.emit(events.onMenuClick, {
          anchor: getAttr(this, 'data-menuanchor')
        });
      }
    }

    EventEmitter.on(events.bindEvents, bindEvents$2);

    function bindEvents$2() {
      EventEmitter.on(events.onClickOrTouch, onClickOrTouch);
    }

    function onClickOrTouch(params) {
      var target = params.target;

      if (target && closest(target, SECTION_NAV_SEL + ' a')) {
        sectionBulletHandler.call(target, params.e);
      } else if (matches(target, SECTION_NAV_TOOLTIP_SEL)) {
        tooltipTextHandler.call(target);
      } else if (matches(target, SLIDES_NAV_LINK_SEL) || closest(target, SLIDES_NAV_LINK_SEL) != null) {
        slideBulletHandler.call(target, params.e);
      }
    }

    var lastScroll = 0;
    var g_scrollId;
    var g_scrollId2;
    EventEmitter.on(events.onDestroy, onDestroy$1); //when scrolling...

    function scrollHandler(e) {
      var currentSection;
      var currentSectionElem;

      if (state.isResizing || !getState().activeSection) {
        return;
      }

      getLast(getState().sections);

      if (getState().isBeyondFullpage || getState().isAboutToScrollToFullPage) {
        return;
      }

      if (!getOptions().autoScrolling || getOptions().scrollBar) {
        var currentScroll = getScrollTop();
        var scrollDirection = getScrollDirection(currentScroll);
        var visibleSectionIndex = 0;
        var screen_mid = currentScroll + getWindowHeight() / 2.0;
        var isAtBottom = $body.scrollHeight - getWindowHeight() === currentScroll;
        var sections = getState().sections;
        setState({
          scrollY: currentScroll
        }); //when using `auto-height` for a small last section it won't be centered in the viewport

        if (isAtBottom) {
          visibleSectionIndex = sections.length - 1;
        } //is at top? when using `auto-height` for a small first section it won't be centered in the viewport
        else if (!currentScroll) {
          visibleSectionIndex = 0;
        } //taking the section which is showing more content in the viewport
        else {
          for (var i = 0; i < sections.length; ++i) {
            var section = sections[i].item; // Pick the the last section which passes the middle line of the screen.

            if (section.offsetTop <= screen_mid) {
              visibleSectionIndex = i;
            }
          }
        }

        if (isCompletelyInViewPort(scrollDirection)) {
          if (!hasClass(getState().activeSection.item, COMPLETELY)) {
            addClass(getState().activeSection.item, COMPLETELY);
            removeClass(siblings(getState().activeSection.item), COMPLETELY);
          }
        } //geting the last one, the current one on the screen


        currentSection = sections[visibleSectionIndex];
        currentSectionElem = currentSection.item; //setting the visible section as active when manually scrolling
        //executing only once the first time we reach the section

        if (!currentSection.isActive) {
          setState({
            isScrolling: true
          });
          var leavingSection = getState().activeSection.item;
          var leavingSectionIndex = getState().activeSection.index() + 1;
          var yMovement = getYmovement(getState().activeSection, currentSectionElem);
          var anchorLink = currentSection.anchor;
          var sectionIndex = currentSection.index() + 1;
          var activeSlide = currentSection.activeSlide;
          var slideIndex;
          var slideAnchorLink;
          var callbacksParams = {
            activeSection: leavingSection,
            sectionIndex: sectionIndex - 1,
            anchorLink: anchorLink,
            element: currentSectionElem,
            leavingSection: leavingSectionIndex,
            direction: yMovement,
            items: {
              origin: getState().activeSection,
              destination: currentSection
            }
          };

          if (activeSlide) {
            slideAnchorLink = activeSlide.anchor;
            slideIndex = activeSlide.index();
          }

          if (state.canScroll) {
            addClass(currentSectionElem, ACTIVE);
            removeClass(siblings(currentSectionElem), ACTIVE);

            if (isFunction(getOptions().beforeLeave)) {
              fireCallbackOncePerScroll('beforeLeave', callbacksParams);
            }

            if (isFunction(getOptions().onLeave)) {
              fireCallback('onLeave', callbacksParams);
            }

            if (isFunction(getOptions().afterLoad)) {
              fireCallback('afterLoad', callbacksParams);
            }

            stopMedia(leavingSection);
            lazyLoad(currentSectionElem);
            playMedia(currentSectionElem);
            activateMenuAndNav(anchorLink, sectionIndex - 1);

            if (getOptions().anchors.length) {
              //needed to enter in hashChange event when using the menu with anchor links
              setState({
                lastScrolledDestiny: anchorLink
              });
            }

            setPageStatus(slideIndex, slideAnchorLink, anchorLink);
            updateState();
          } //small timeout in order to avoid entering in hashChange event when scrolling is not finished yet


          clearTimeout(g_scrollId);
          g_scrollId = setTimeout(function () {
            setState({
              isScrolling: false
            });
          }, 100);
        }

        if (getOptions().fitToSection && state.canScroll) {
          clearTimeout(g_scrollId2);
          g_scrollId2 = setTimeout(function () {
            var fixedSections = state.sections.filter(function (section) {
              var sectionValues = section.item.getBoundingClientRect();
              return Math.round(sectionValues.bottom) === Math.round(getWindowHeight()) || Math.round(sectionValues.top) === 0;
            }); // No section is fitting the viewport? Let's fix that!

            if (!fixedSections.length) {
              fitToSection();
            }
          }, getOptions().fitToSectionDelay);
        }
      }
    }

    function onDestroy$1() {
      clearTimeout(g_scrollId);
      clearTimeout(g_scrollId2);
    }
    /**
    * Gets the directon of the the scrolling fired by the scroll event.
    */


    function getScrollDirection(currentScroll) {
      var direction = currentScroll > lastScroll ? 'down' : 'up';
      lastScroll = currentScroll; //needed for auto-height sections to determine if we want to scroll to the top or bottom of the destination

      setState({
        previousDestTop: currentScroll
      });
      return direction;
    }
    /**
    * Determines whether the active section has seen in its whole or not.
    */


    function isCompletelyInViewPort(movement) {
      var top = getState().activeSection.item.offsetTop;
      var bottom = top + getWindowHeight();

      if (movement == 'up') {
        return bottom >= getScrollTop() + getWindowHeight();
      }

      return top <= getScrollTop();
    }

    EventEmitter.on(events.bindEvents, bindEvents$1);
    EventEmitter.on(events.onDestroy, onDestroy);

    function onDestroy() {
      windowRemoveEvent('scroll', scrollHandler);
    }

    function bindEvents$1() {
      windowAddEvent('scroll', scrollHandler);
      doc.body.addEventListener('scroll', scrollHandler);
      EventEmitter.on(events.onScrollPageAndSlide, function (params) {
        scrollPageAndSlide(params.sectionAnchor, params.slideAnchor);
      });
      EventEmitter.on(events.onMenuClick, function (params) {
        moveTo$1(params.anchor, undefined);
      });
      EventEmitter.on(events.onScrollOverflowScrolled, function (params) {
        var scrollSection = params.direction === 'down' ? moveSectionDown : moveSectionUp;
        scrollSection();
      });
      EventEmitter.on(events.scrollPage, function (params) {
        scrollPage(params.destination);
      });
    }

    FP.getActiveSlide = getActiveSlide;

    FP.getScrollX = function () {
      return state.scrollX;
    };

    EventEmitter.on(events.bindEvents, bindEvents);

    function bindEvents() {
      EventEmitter.on(events.onDestroy, onDestroy$7);
      EventEmitter.on(events.landscapeScroll, function (params) {
        landscapeScroll(params.slides, params.destination);
      });
      EventEmitter.on(events.moveSlideRight, function (params) {
        moveSlideRight(params.section);
      });
      EventEmitter.on(events.moveSlideLeft, function (params) {
        moveSlideLeft(params.section);
      });
    }
    /**
    * Gets the active slide.
    */


    function getActiveSlide() {
      return nullOrSlide(getState().activeSection.activeSlide);
    }

    EventEmitter.on(events.bindEvents, init$1);

    function init$1() {
      var position = getOptions().credits.position;
      var positionStyle = ['left', 'right'].indexOf(position) > -1 ? "".concat(position, ": 0;") : '';
      var waterMark = "\n        <div class=\"fp-watermark\" style=\"".concat(positionStyle, "\">\n            <a href=\"https://alvarotrigo.com/fullPage/\" \n                rel=\"nofollow noopener\" \n                target=\"_blank\" \n                style=\"text-decoration:none; color: #000;\">\n                    ").concat(getOptions().credits.label, "\n            </a>\n        </div>\n    ");
      var lastSection = getLast(state.sections);
      var shouldUseWaterMark = !state.isValid || getOptions().credits.enabled;

      if (lastSection && lastSection.item && shouldUseWaterMark) {
        lastSection.item.insertAdjacentHTML('beforeend', waterMark);
      }
    }

    !function () {
      EventEmitter.on(events.onInitialise, function () {
        var n, a, l;
        setState({
          isValid: (getOptions().licenseKey, n = getOptions().licenseKey, a = function (n) {
            var e = parseInt("\x35\x31\x34").toString(16);
            if (!n || n.length < 29 || 4 === n.split(t[0]).length) return null;
            var i = ["\x45\x61\x63\x68", "\x66\x6f\x72"][r()]().join(""),
                a = n[["\x73\x70\x6c\x69\x74"]]("-"),
                l = [];
            a[i](function (t, n) {
              if (n < 4) {
                var i = function (t) {
                  var n = t[t.length - 1],
                      e = ["\x4e\x61\x4e", "\x69\x73"][r()]().join("");
                  return window[e](n) ? o(n) : function (t) {
                    return t - ACTIVE.length;
                  }(n);
                }(t);

                l.push(i);
                var s = o(t[i]);

                if (1 === n) {
                  var a = ["\x70\x61", "\x64\x53", "\x74", "\x61\x72\x74"].join("");
                  s = s.toString()[a](2, "0");
                }

                e += s, 0 !== n && 1 !== n || (e += "-");
              }
            });
            var m = 0,
                p = "";
            return n.split("-").forEach(function (t, n) {
              if (n < 4) {
                var _r = 0;

                for (var e = 0; e < 4; e++) {
                  e !== l[n] && (_r += Math.abs(o(t[e])), isNaN(t[e]) || m++);
                }

                var i = s(_r);
                p += i;
              }
            }), p += s(m), {
              v: new Date(e + "T00:00"),
              o: e.split("-")[2] === 8 * (ACTIVE.length - 2) + "",
              l: p
            };
          }(n), l = function (t) {
            var n = i[r()]().join("");
            return t && 0 === n.indexOf(t) && t.length === n.length;
          }(n), (a || l) && (getOptions().credits && a && e <= a.v && a.l === n.split(t[0])[4] || l || a.o) || !1)
        });
      });
      var t = ["-"];
      var n = "2022-9-25".split("-"),
          e = new Date(n[0], n[1], n[2]),
          i = ["se", "licen", "-", "v3", "l", "gp"];

      function r() {
        return [["\x72\x65", "\x76\x65\x72\x73\x65"].join("")]["".length];
      }

      function o(t) {
        return t ? isNaN(t) ? t.charCodeAt(0) - 72 : t : "";
      }

      function s(t) {
        var n = 72 + t;
        return n > 90 && n < 97 && (n += 15), String.fromCharCode(n).toUpperCase();
      }
    }();

    //@ts-check
    FP.setKeyboardScrolling = setKeyboardScrolling;
    /**
    * Adds or remove the possibility of scrolling through sections by using the keyboard arrow keys
    */

    function setKeyboardScrolling(value, directions) {
      if (typeof directions !== 'undefined') {
        directions = directions.replace(/ /g, '').split(',');
        directions.forEach(function (direction) {
          setIsScrollAllowed(value, direction, 'k');
        });
      } else {
        setIsScrollAllowed(value, 'all', 'k');
        getOptions().keyboardScrolling = value;
      }
    }

    /**
    * Sets the data-anchor attributes to the menu elements and activates the current one.
    */

    function styleMenu(section) {
      var index = section.index();

      if (typeof getOptions().anchors[index] !== 'undefined') {
        //activating the menu / nav element on load
        if (section.isActive) {
          activateMenuAndNav(getOptions().anchors[index], index);
        }
      } //moving the menu outside the main container if it is inside (avoid problems with fixed positions when using CSS3 tranforms)


      if (getOptions().menu && getOptions().css3 && closest($(getOptions().menu)[0], WRAPPER_SEL) != null) {
        $(getOptions().menu).forEach(function (menu) {
          $body.appendChild(menu);
        });
      }
    }

    /**
    * Works over the DOM structure to set it up for the current fullpage getOptions().
    */

    function prepareDom() {
      css(getParentsUntil(getContainer(), 'body'), {
        'height': '100%',
        'position': 'relative'
      }); //adding a class to recognize the container internally in the code

      addClass(getContainer(), WRAPPER);
      addClass($html, ENABLED); //due to https://github.com/alvarotrigo/fullPage.js/issues/1502

      setState({
        windowsHeight: getWindowHeight()
      });
      removeClass(getContainer(), DESTROYED); //in case it was destroyed before initializing it again

      addInternalSelectors();
      var sections = getState().sectionsIncludingHidden; //styling the sections / slides / menu

      for (var i = 0; i < sections.length; i++) {
        var section = sections[i];
        var slides = section.allSlidesItems; //caching the original styles to add them back on destroy('all')

        section.item.setAttribute('data-fp-styles', getAttr(section.item, 'style'));
        styleSection(section);
        styleMenu(section); // if there's any slide

        if (slides.length > 0) {
          styleSlides(section);
        }
      } //fixed elements need to be moved out of the plugin container due to problems with CSS3.


      if (getOptions().fixedElements && getOptions().css3) {
        $(getOptions().fixedElements).forEach(function (item) {
          $body.appendChild(item);
        });
      } //vertical centered of the navigation + active bullet


      if (getOptions().navigation) {
        addVerticalNavigation();
      }

      enableYoutubeAPI();

      if (getOptions().scrollOverflow) {
        scrollOverflowHandler.makeScrollable();
      }
    }

    FP.shared.afterRenderActions = afterRenderActions;
    /**
    * Actions and callbacks to fire afterRender
    */

    function afterRenderActions() {
      var section = getState().activeSection;
      var sectionElem = getState().activeSection.item;
      addClass(sectionElem, COMPLETELY);
      lazyLoad(sectionElem);
      lazyLoadOthers();
      playMedia(sectionElem);

      if (isDestinyTheStartingSection() && isFunction(getOptions().afterLoad)) {
        fireCallback('afterLoad', {
          activeSection: sectionElem,
          element: sectionElem,
          direction: null,
          //for backwards compatibility callback (to be removed in a future!)
          anchorLink: section.anchor,
          sectionIndex: section.index(),
          items: {
            origin: getState().activeSection,
            destination: getState().activeSection
          }
        });
      }

      if (isFunction(getOptions().afterRender)) {
        fireCallback('afterRender');
      }
    }
    /**
    * Determines if the URL anchor destiny is the starting section (the one using 'active' class before initialization)
    */

    function isDestinyTheStartingSection() {
      var anchor = getAnchorsURL();
      var destinationSection = getSectionByAnchor(anchor.section);
      return !anchor.section || !destinationSection || typeof destinationSection !== 'undefined' && destinationSection.index() === index(getStartingSection());
    }

    FP.setAllowScrolling = setAllowScrolling;
    /**
    * Adds or remove the possibility of scrolling through sections by using the mouse wheel/trackpad or touch gestures.
    * Optionally a second parameter can be used to specify the direction for which the action will be applied.
    *
    * @param directions string containing the direction or directions separated by comma.
    */

    function setAllowScrolling(value, directions) {
      if (typeof directions !== 'undefined') {
        directions = directions.replace(/ /g, '').split(',');
        directions.forEach(function (direction) {
          setIsScrollAllowed(value, direction, 'm');
        });
      } else {
        setIsScrollAllowed(value, 'all', 'm');
      }
    }

    /**
    * Scrolls to the anchor in the URL when loading the site
    */

    function scrollToAnchor() {
      var anchors = getAnchorsURL();
      var sectionAnchor = anchors.section;
      var slideAnchor = anchors.slide;

      if (sectionAnchor) {
        //if theres any #
        if (getOptions().animateAnchor) {
          scrollPageAndSlide(sectionAnchor, slideAnchor);
        } else {
          silentMoveTo(sectionAnchor, slideAnchor);
        }
      } else {
        EventEmitter.emit(events.onAfterRenderNoAnchor, null);
      }
    }

    /*
    * Removes inline styles added by fullpage.js
    */

    function destroyStructure() {
      //reseting the `top` or `translate` properties to 0
      silentScroll(0); //loading all the lazy load content

      $('img[data-src], source[data-src], audio[data-src], iframe[data-src]', getContainer()).forEach(function (item) {
        setSrc(item, 'src');
      });
      $('img[data-srcset]').forEach(function (item) {
        setSrc(item, 'srcset');
      });
      remove($(SECTION_NAV_SEL + ', ' + SLIDES_NAV_SEL + ', ' + SLIDES_ARROW_SEL)); //removing inline styles

      css(getNodes(getState().sections), {
        'height': '',
        'background-color': '',
        'padding': ''
      });
      css(getNodes(getState().slides), {
        'width': ''
      });
      css(getContainer(), {
        'height': '',
        'position': '',
        '-ms-touch-action': '',
        'touch-action': ''
      });
      css($htmlBody, {
        'overflow': '',
        'height': ''
      }); // remove .fp-enabled class

      removeClass($html, ENABLED); // remove .fp-responsive class

      removeClass($body, RESPONSIVE); // remove all of the .fp-viewing- classes

      $body.className.split(/\s+/).forEach(function (className) {
        if (className.indexOf(VIEWING_PREFIX) === 0) {
          removeClass($body, className);
        }
      }); //removing added classes

      getNodes(getState().panels).forEach(function (item) {
        if (getOptions().scrollOverflow) {
          scrollOverflowHandler.destroyWrapper(item);
        }

        removeClass(item, TABLE + ' ' + ACTIVE + ' ' + COMPLETELY);
        var previousStyles = getAttr(item, 'data-fp-styles');

        if (previousStyles) {
          item.setAttribute('style', getAttr(item, 'data-fp-styles'));
        } //removing anchors if they were not set using the HTML markup


        if (hasClass(item, SECTION) && !getInitialAnchorsInDom()) {
          item.removeAttribute('data-anchor');
        }
      }); //removing the applied transition from the fullpage wrapper

      removeAnimation(getContainer()); //Unwrapping content

      [TABLE_CELL_SEL, SLIDES_CONTAINER_SEL, SLIDES_WRAPPER_SEL].forEach(function (selector) {
        $(selector, getContainer()).forEach(function (item) {
          //unwrap not being use in case there's no child element inside and its just text
          unwrap(item);
        });
      }); //removing the applied transition from the fullpage wrapper

      css(getContainer(), {
        '-webkit-transition': 'none',
        'transition': 'none'
      }); //scrolling the page to the top with no animation

      win.scrollTo(0, 0); //removing selectors

      var usedSelectors = [SECTION, SLIDE, SLIDES_CONTAINER];
      usedSelectors.forEach(function (item) {
        removeClass($('.' + item), item);
      });
    }

    FP.destroy = destroy;
    function init() {
      updateStructuralState();
      updateState();
      getOptions().scrollBar = getOptions().scrollBar || getOptions().hybrid;
      setOptionsFromDOM();
      prepareDom();
      setAllowScrolling(true);
      setMouseHijack(true);
      setAutoScrolling(getOptions().autoScrolling, 'internal');
      responsive(); //setting the class for the body element

      setBodyClass();

      if (doc.readyState === 'complete') {
        scrollToAnchor();
      }

      windowAddEvent('load', scrollToAnchor);
      afterRenderActions(); // Updating the state again with the new DOM

      updateStructuralState();
      updateState();
    }
    /*
    * Destroys fullpage.js plugin events and optinally its html markup and styles
    */

    function destroy(all) {
      setAutoScrolling(false, 'internal');
      setAllowScrolling(true);
      setMouseHijack(false);
      setKeyboardScrolling(false);
      addClass(getContainer(), DESTROYED);
      EventEmitter.emit(events.onDestroy); //lets make a mess!

      if (all) {
        destroyStructure();
      }
    }

    var isOK = function isOK() {
      return getOptions() && state.isValid || doc.domain.indexOf('al' + 'varotri' + 'go' + '.' + 'com') > -1;
    };
    /**
    * Displays warnings
    */


    function displayWarnings() {
      var l = getOptions()['li' + 'c' + 'enseK' + 'e' + 'y'];
      var msgStyle = 'font-size: 15px;background:yellow;';

      if (getOptions().licenseKey.trim() === '') {
        showError('error', 'Fullpage.js requires a `licenseKey` option. Read about it on the following URL:');
        showError('error', 'https://github.com/alvarotrigo/fullPage.js#options');
      } else if (!isOK()) {
        showError('error', 'Incorrect `licenseKey`. Get one for fullPage.js version 4 here:');
        showError('error', 'https://alvarotrigo.com/fullPage/pricing');
      } else if (l && l.length < 20) {
        console.warn('%c This website was made using fullPage.js slider. More info on the following website:', msgStyle);
        console.warn('%c https://alvarotrigo.com/fullPage/', msgStyle);
      }

      if (hasClass($html, ENABLED)) {
        showError('error', 'Fullpage.js can only be initialized once and you are doing it multiple times!');
        return;
      } // Disable mutually exclusive settings


      if (getOptions().continuousVertical && (getOptions().loopTop || getOptions().loopBottom)) {
        getOptions().continuousVertical = false;
        showError('warn', 'Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled');
      }

      if (getOptions().scrollOverflow && (getOptions().scrollBar || !getOptions().autoScrolling)) {
        showError('warn', 'Options scrollBar:true and autoScrolling:false are mutually exclusive with scrollOverflow:true. Sections with scrollOverflow might not work well in Firefox');
      }

      if (getOptions().continuousVertical && (getOptions().scrollBar || !getOptions().autoScrolling)) {
        getOptions().continuousVertical = false;
        showError('warn', 'Scroll bars (`scrollBar:true` or `autoScrolling:false`) are mutually exclusive with `continuousVertical`; `continuousVertical` disabled');
      } //using extensions? Wrong file!


      extensions.forEach(function (extension) {
        //is the option set to true?
        if (getOptions()[extension]) {
          showError('warn', 'fullpage.js extensions require fullpage.extensions.min.js file instead of the usual fullpage.js. Requested: ' + extension);
        }
      }); //anchors can not have the same value as any element ID or NAME

      getOptions().anchors.forEach(function (name) {
        //case insensitive selectors (http://stackoverflow.com/a/19465187/1081396)
        var nameAttr = [].slice.call($('[name]')).filter(function (item) {
          return getAttr(item, 'name') && getAttr(item, 'name').toLowerCase() == name.toLowerCase();
        });
        var idAttr = [].slice.call($('[id]')).filter(function (item) {
          return getAttr(item, 'id') && getAttr(item, 'id').toLowerCase() == name.toLowerCase();
        });

        if (idAttr.length || nameAttr.length) {
          showError('error', 'data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE).');
          var propertyName = idAttr.length ? 'id' : 'name';

          if (idAttr.length || nameAttr.length) {
            showError('error', '"' + name + '" is is being used by another element `' + propertyName + '` property');
          }
        }
      });
    }

    function fullpage(containerSelector, options) {
      setCache(); //only once my friend!

      if (hasClass($html, ENABLED)) {
        displayWarnings();
        return;
      }

      setOption('touchWrapper', typeof containerSelector === 'string' ? $(containerSelector)[0] : containerSelector); // Creating some defaults, extending them with any options that were provided

      setOptions(options);
      setContainer(typeof containerSelector === 'string' ? $(containerSelector)[0] : containerSelector);
      EventEmitter.emit(events.onInitialise);
      displayWarnings();
      setAPI();

      if (getContainer()) {
        EventEmitter.emit(events.beforeInit);
        init();
        EventEmitter.emit(events.bindEvents);
      } // @ts-ignore


      return win.fullpage_api;
    }

    function setAPI() {
      FP.getFullpageData = function () {
        return {
          options: getOptions()
        };
      }; //public functions


      FP.version = '4.0.12';
      FP.test = Object.assign(FP.test, {
        top: '0px',
        translate3d: 'translate3d(0px, 0px, 0px)',
        translate3dH: function () {
          var a = [];

          for (var i = 0; i < $(getOptions().sectionSelector, getContainer()).length; i++) {
            a.push('translate3d(0px, 0px, 0px)');
          }

          return a;
        }(),
        left: function () {
          var a = [];

          for (var i = 0; i < $(getOptions().sectionSelector, getContainer()).length; i++) {
            a.push(0);
          }

          return a;
        }(),
        options: getOptions(),
        setAutoScrolling: null
      }); //functions we want to share across files but which are not
      //mean to be used on their own by developers

      FP.shared = Object.assign(FP.shared, {
        afterRenderActions: null,
        isNormalScrollElement: false
      }); // @ts-ignore

      win.fullpage_api = FP;
    }

    // @ts-ignore

    win.fp_easings = deepExtend(win.fp_easings, {
      easeInOutCubic: function easeInOutCubic(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
      }
    });

    /**
     * jQuery adapter for fullPage.js 3.0.0
     */
    // @ts-ignore

    if (win.jQuery) {
      (function ($, fullpage) {

        if (!$ || !fullpage) {
          showError('error', 'jQuery is required to use the jQuery fullpage adapter!');
          return;
        }

        $.fn.fullpage = function (options) {
          options = $.extend({}, options, {
            '$': $
          });
          new fullpage(this[0], options); // Creating the $.fn.fullpage object

          Object.keys(FP).forEach(function (key) {
            getOptions().$.fn.fullpage[key] = FP[key];
          });
        }; // @ts-ignore

      })(win.jQuery, fullpage);
    }

    return fullpage;

}));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var fullpage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fullpage.js */ "./node_modules/fullpage.js/dist/fullpage.js");
/* harmony import */ var fullpage_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fullpage_js__WEBPACK_IMPORTED_MODULE_0__);

var fullPageInstance = new (fullpage_js__WEBPACK_IMPORTED_MODULE_0___default())('#myFullpage', {
    navigation: true,
    sectionsColor: ['#ff5f45', '#0798ec', '#fc6c7c', 'grey']
});
console.log("Hello, world!");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1COztBQUVuQjs7QUFFQSxzQkFBc0IseUJBQXlCO0FBQy9DO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFROztBQUVSO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FB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QUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxRQUFROzs7QUFHUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjs7QUFFbkI7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseUNBQXlDOztBQUV6QztBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBCQUEwQjs7QUFFMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyxHQUFHOztBQUVWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9COztBQUVwQjtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTs7O0FBR1I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4Q0FBOEM7O0FBRTlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyxHQUFHOztBQUVWO0FBQ0E7QUFDQTtBQUNBLFVBQVU7OztBQUdWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQ0FBMEMsK0NBQStDO0FBQ3pGO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBLDhDQUE4Qzs7QUFFOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPLEdBQUc7O0FBRVY7QUFDQTtBQUNBLDhDQUE4QyxnREFBZ0Q7QUFDOUY7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxTQUFTO0FBQ3hCOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7OztBQUdSLHNEQUFzRDs7QUFFdEQ7QUFDQSw4REFBOEQ7O0FBRTlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx5Q0FBeUM7O0FBRXpDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7OztBQUdaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVztBQUNYLHVEQUF1RDtBQUN2RCxVQUFVO0FBQ1Y7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1EOztBQUVuRDs7QUFFQSxzQkFBc0IsZUFBZTtBQUNyQztBQUNBO0FBQ0EsUUFBUTs7O0FBR1I7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNOzs7QUFHTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5RUFBeUU7O0FBRXpFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RDs7QUFFN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdGQUFnRjs7QUFFaEYsdURBQXVEOztBQUV2RDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DOztBQUVuQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxVQUFVOzs7QUFHVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxR0FBcUc7QUFDckc7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDs7O0FBR0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTyxPQUFPOztBQUVkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxzRkFBc0Y7O0FBRXRGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUTs7QUFFUjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtEQUFrRDs7QUFFbEQ7QUFDQTtBQUNBLHNEQUFzRDs7QUFFdEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCx1REFBdUQ7QUFDdkQ7O0FBRUE7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUI7O0FBRXZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsUUFBUTs7QUFFUjtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQ7O0FBRWpEO0FBQ0E7QUFDQSxZQUFZOzs7QUFHWiw2Q0FBNkM7OztBQUc3QztBQUNBLCtCQUErQjtBQUMvQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0RBQWtEOztBQUVsRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0RBQWtEOztBQUVsRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7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QXFCO0FBQzNDO0FBQ0E7QUFDQSxxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7O0FBRXpDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNkRBQTZEOztBQUU3RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5Qzs7QUFFekM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7O0FBR047QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtB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QWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTm1DO0FBRW5DLElBQUksZ0JBQWdCLEdBQWEsSUFBSSxvREFBUSxDQUFDLGFBQWEsRUFBRTtJQUN6RCxVQUFVLEVBQUUsSUFBSTtJQUNoQixhQUFhLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUM7Q0FDM0QsQ0FBQyxDQUFDO0FBR0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3Rhc2s1Ly4vbm9kZV9tb2R1bGVzL2Z1bGxwYWdlLmpzL2Rpc3QvZnVsbHBhZ2UuanMiLCJ3ZWJwYWNrOi8vdGFzazUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdGFzazUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vdGFzazUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Rhc2s1L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdGFzazUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90YXNrNS8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiogZnVsbFBhZ2UgNC4wLjEyXG4qIGh0dHBzOi8vZ2l0aHViLmNvbS9hbHZhcm90cmlnby9mdWxsUGFnZS5qc1xuKlxuKiBAbGljZW5zZSBHUEx2MyBmb3Igb3BlbiBzb3VyY2UgdXNlIG9ubHlcbiogb3IgRnVsbHBhZ2UgQ29tbWVyY2lhbCBMaWNlbnNlIGZvciBjb21tZXJjaWFsIHVzZVxuKiBodHRwOi8vYWx2YXJvdHJpZ28uY29tL2Z1bGxQYWdlL3ByaWNpbmcvXG4qXG4qIENvcHlyaWdodCAoQykgMjAxOCBodHRwOi8vYWx2YXJvdHJpZ28uY29tL2Z1bGxQYWdlIC0gQSBwcm9qZWN0IGJ5IEFsdmFybyBUcmlnb1xuKi9cblxuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XG4gICAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcbiAgICAoZ2xvYmFsID0gdHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsVGhpcyA6IGdsb2JhbCB8fCBzZWxmLCBnbG9iYWwuZnVsbHBhZ2UgPSBmYWN0b3J5KCkpO1xufSkodGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZpbmRcbiAgICBpZiAoIUFycmF5LnByb3RvdHlwZS5maW5kKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJyYXkucHJvdG90eXBlLCAnZmluZCcsIHtcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKHByZWRpY2F0ZSkge1xuICAgICAgICAgIC8vIDEuIExldCBPIGJlID8gVG9PYmplY3QodGhpcyB2YWx1ZSkuXG4gICAgICAgICAgaWYgKHRoaXMgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJ0aGlzXCIgaXMgbnVsbCBvciBub3QgZGVmaW5lZCcpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBvID0gT2JqZWN0KHRoaXMpOyAvLyAyLiBMZXQgbGVuIGJlID8gVG9MZW5ndGgoPyBHZXQoTywgXCJsZW5ndGhcIikpLlxuXG4gICAgICAgICAgdmFyIGxlbiA9IG8ubGVuZ3RoID4+PiAwOyAvLyAzLiBJZiBJc0NhbGxhYmxlKHByZWRpY2F0ZSkgaXMgZmFsc2UsIHRocm93IGEgVHlwZUVycm9yIGV4Y2VwdGlvbi5cblxuICAgICAgICAgIGlmICh0eXBlb2YgcHJlZGljYXRlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdwcmVkaWNhdGUgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gICAgICAgICAgfSAvLyA0LiBJZiB0aGlzQXJnIHdhcyBzdXBwbGllZCwgbGV0IFQgYmUgdGhpc0FyZzsgZWxzZSBsZXQgVCBiZSB1bmRlZmluZWQuXG5cblxuICAgICAgICAgIHZhciB0aGlzQXJnID0gYXJndW1lbnRzWzFdOyAvLyA1LiBMZXQgayBiZSAwLlxuXG4gICAgICAgICAgdmFyIGsgPSAwOyAvLyA2LiBSZXBlYXQsIHdoaWxlIGsgPCBsZW5cblxuICAgICAgICAgIHdoaWxlIChrIDwgbGVuKSB7XG4gICAgICAgICAgICAvLyBhLiBMZXQgUGsgYmUgISBUb1N0cmluZyhrKS5cbiAgICAgICAgICAgIC8vIGIuIExldCBrVmFsdWUgYmUgPyBHZXQoTywgUGspLlxuICAgICAgICAgICAgLy8gYy4gTGV0IHRlc3RSZXN1bHQgYmUgVG9Cb29sZWFuKD8gQ2FsbChwcmVkaWNhdGUsIFQsIMKrIGtWYWx1ZSwgaywgTyDCuykpLlxuICAgICAgICAgICAgLy8gZC4gSWYgdGVzdFJlc3VsdCBpcyB0cnVlLCByZXR1cm4ga1ZhbHVlLlxuICAgICAgICAgICAgdmFyIGtWYWx1ZSA9IG9ba107XG5cbiAgICAgICAgICAgIGlmIChwcmVkaWNhdGUuY2FsbCh0aGlzQXJnLCBrVmFsdWUsIGssIG8pKSB7XG4gICAgICAgICAgICAgIHJldHVybiBrVmFsdWU7XG4gICAgICAgICAgICB9IC8vIGUuIEluY3JlYXNlIGsgYnkgMS5cblxuXG4gICAgICAgICAgICBrKys7XG4gICAgICAgICAgfSAvLyA3LiBSZXR1cm4gdW5kZWZpbmVkLlxuXG5cbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBQcm9kdWN0aW9uIHN0ZXBzIG9mIEVDTUEtMjYyLCBFZGl0aW9uIDYsIDIyLjEuMi4xXG4gICAgaWYgKCFBcnJheS5mcm9tKSB7XG4gICAgICBBcnJheS5mcm9tID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4gICAgICAgIHZhciBpc0NhbGxhYmxlID0gZnVuY3Rpb24gaXNDYWxsYWJsZShmbikge1xuICAgICAgICAgIHJldHVybiB0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicgfHwgdG9TdHIuY2FsbChmbikgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHRvSW50ZWdlciA9IGZ1bmN0aW9uIHRvSW50ZWdlcih2YWx1ZSkge1xuICAgICAgICAgIHZhciBudW1iZXIgPSBOdW1iZXIodmFsdWUpO1xuXG4gICAgICAgICAgaWYgKGlzTmFOKG51bWJlcikpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChudW1iZXIgPT09IDAgfHwgIWlzRmluaXRlKG51bWJlcikpIHtcbiAgICAgICAgICAgIHJldHVybiBudW1iZXI7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIChudW1iZXIgPiAwID8gMSA6IC0xKSAqIE1hdGguZmxvb3IoTWF0aC5hYnMobnVtYmVyKSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIG1heFNhZmVJbnRlZ2VyID0gTWF0aC5wb3coMiwgNTMpIC0gMTtcblxuICAgICAgICB2YXIgdG9MZW5ndGggPSBmdW5jdGlvbiB0b0xlbmd0aCh2YWx1ZSkge1xuICAgICAgICAgIHZhciBsZW4gPSB0b0ludGVnZXIodmFsdWUpO1xuICAgICAgICAgIHJldHVybiBNYXRoLm1pbihNYXRoLm1heChsZW4sIDApLCBtYXhTYWZlSW50ZWdlcik7XG4gICAgICAgIH07IC8vIFRoZSBsZW5ndGggcHJvcGVydHkgb2YgdGhlIGZyb20gbWV0aG9kIGlzIDEuXG5cblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gZnJvbShhcnJheUxpa2VcbiAgICAgICAgLyosIG1hcEZuLCB0aGlzQXJnICovXG4gICAgICAgICkge1xuICAgICAgICAgIC8vIDEuIExldCBDIGJlIHRoZSB0aGlzIHZhbHVlLlxuICAgICAgICAgIHZhciBDID0gdGhpczsgLy8gMi4gTGV0IGl0ZW1zIGJlIFRvT2JqZWN0KGFycmF5TGlrZSkuXG5cbiAgICAgICAgICB2YXIgaXRlbXMgPSBPYmplY3QoYXJyYXlMaWtlKTsgLy8gMy4gUmV0dXJuSWZBYnJ1cHQoaXRlbXMpLlxuXG4gICAgICAgICAgaWYgKGFycmF5TGlrZSA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcnJheS5mcm9tIHJlcXVpcmVzIGFuIGFycmF5LWxpa2Ugb2JqZWN0IC0gbm90IG51bGwgb3IgdW5kZWZpbmVkJyk7XG4gICAgICAgICAgfSAvLyA0LiBJZiBtYXBmbiBpcyB1bmRlZmluZWQsIHRoZW4gbGV0IG1hcHBpbmcgYmUgZmFsc2UuXG5cblxuICAgICAgICAgIHZhciBtYXBGbiA9IGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdm9pZCB1bmRlZmluZWQ7XG4gICAgICAgICAgdmFyIFQ7XG5cbiAgICAgICAgICBpZiAodHlwZW9mIG1hcEZuICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgLy8gNS4gZWxzZVxuICAgICAgICAgICAgLy8gNS4gYSBJZiBJc0NhbGxhYmxlKG1hcGZuKSBpcyBmYWxzZSwgdGhyb3cgYSBUeXBlRXJyb3IgZXhjZXB0aW9uLlxuICAgICAgICAgICAgaWYgKCFpc0NhbGxhYmxlKG1hcEZuKSkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcnJheS5mcm9tOiB3aGVuIHByb3ZpZGVkLCB0aGUgc2Vjb25kIGFyZ3VtZW50IG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICAgICAgICAgICAgfSAvLyA1LiBiLiBJZiB0aGlzQXJnIHdhcyBzdXBwbGllZCwgbGV0IFQgYmUgdGhpc0FyZzsgZWxzZSBsZXQgVCBiZSB1bmRlZmluZWQuXG5cblxuICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICAgIFQgPSBhcmd1bWVudHNbMl07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSAvLyAxMC4gTGV0IGxlblZhbHVlIGJlIEdldChpdGVtcywgXCJsZW5ndGhcIikuXG4gICAgICAgICAgLy8gMTEuIExldCBsZW4gYmUgVG9MZW5ndGgobGVuVmFsdWUpLlxuXG5cbiAgICAgICAgICB2YXIgbGVuID0gdG9MZW5ndGgoaXRlbXMubGVuZ3RoKTsgLy8gMTMuIElmIElzQ29uc3RydWN0b3IoQykgaXMgdHJ1ZSwgdGhlblxuICAgICAgICAgIC8vIDEzLiBhLiBMZXQgQSBiZSB0aGUgcmVzdWx0IG9mIGNhbGxpbmcgdGhlIFtbQ29uc3RydWN0XV0gaW50ZXJuYWwgbWV0aG9kXG4gICAgICAgICAgLy8gb2YgQyB3aXRoIGFuIGFyZ3VtZW50IGxpc3QgY29udGFpbmluZyB0aGUgc2luZ2xlIGl0ZW0gbGVuLlxuICAgICAgICAgIC8vIDE0LiBhLiBFbHNlLCBMZXQgQSBiZSBBcnJheUNyZWF0ZShsZW4pLlxuXG4gICAgICAgICAgdmFyIEEgPSBpc0NhbGxhYmxlKEMpID8gT2JqZWN0KG5ldyBDKGxlbikpIDogbmV3IEFycmF5KGxlbik7IC8vIDE2LiBMZXQgayBiZSAwLlxuXG4gICAgICAgICAgdmFyIGsgPSAwOyAvLyAxNy4gUmVwZWF0LCB3aGlsZSBrIDwgbGVu4oCmIChhbHNvIHN0ZXBzIGEgLSBoKVxuXG4gICAgICAgICAgdmFyIGtWYWx1ZTtcblxuICAgICAgICAgIHdoaWxlIChrIDwgbGVuKSB7XG4gICAgICAgICAgICBrVmFsdWUgPSBpdGVtc1trXTtcblxuICAgICAgICAgICAgaWYgKG1hcEZuKSB7XG4gICAgICAgICAgICAgIEFba10gPSB0eXBlb2YgVCA9PT0gJ3VuZGVmaW5lZCcgPyBtYXBGbihrVmFsdWUsIGspIDogbWFwRm4uY2FsbChULCBrVmFsdWUsIGspO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgQVtrXSA9IGtWYWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgayArPSAxO1xuICAgICAgICAgIH0gLy8gMTguIExldCBwdXRTdGF0dXMgYmUgUHV0KEEsIFwibGVuZ3RoXCIsIGxlbiwgdHJ1ZSkuXG5cblxuICAgICAgICAgIEEubGVuZ3RoID0gbGVuOyAvLyAyMC4gUmV0dXJuIEEuXG5cbiAgICAgICAgICByZXR1cm4gQTtcbiAgICAgICAgfTtcbiAgICAgIH0oKTtcbiAgICB9XG5cbiAgICB2YXIgd2luID0gd2luZG93O1xuICAgIHZhciBkb2MgPSBkb2N1bWVudDtcbiAgICB2YXIgaXNUb3VjaERldmljZSA9IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goLyhpUGhvbmV8aVBvZHxpUGFkfEFuZHJvaWR8cGxheWJvb2t8c2lsa3xCbGFja0JlcnJ5fEJCMTB8V2luZG93cyBQaG9uZXxUaXplbnxCYWRhfHdlYk9TfElFTW9iaWxlfE9wZXJhIE1pbmkpLyk7XG4gICAgdmFyIGlzTWFjRGV2aWNlID0gLyhNYWN8aVBob25lfGlQb2R8aVBhZCkvaS50ZXN0KHdpbi5uYXZpZ2F0b3IudXNlckFnZW50KTsgLy8gQHRzLWlnbm9yZVxuXG4gICAgdmFyIGlzVG91Y2ggPSAnb250b3VjaHN0YXJ0JyBpbiB3aW4gfHwgbmF2aWdhdG9yLm1zTWF4VG91Y2hQb2ludHMgPiAwIHx8IG5hdmlnYXRvci5tYXhUb3VjaFBvaW50cztcbiAgICB2YXIgaXNJRTExID0gISF3aW5kb3cuTVNJbnB1dE1ldGhvZENvbnRleHQgJiYgISFkb2N1bWVudC5kb2N1bWVudE1vZGU7IC8vIHRha2VuIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL3VkYWNpdHkvdWQ4OTEvYmxvYi9naC1wYWdlcy9sZXNzb24yLWZvY3VzLzA3LW1vZGFscy1hbmQta2V5Ym9hcmQtdHJhcHMvc29sdXRpb24vbW9kYWwuanNcblxuICAgIHZhciBmb2N1c2FibGVFbGVtZW50c1N0cmluZyA9ICdhW2hyZWZdLCBhcmVhW2hyZWZdLCBpbnB1dDpub3QoW2Rpc2FibGVkXSksIHNlbGVjdDpub3QoW2Rpc2FibGVkXSksIHRleHRhcmVhOm5vdChbZGlzYWJsZWRdKSwgYnV0dG9uOm5vdChbZGlzYWJsZWRdKSwgaWZyYW1lLCBvYmplY3QsIGVtYmVkLCBbdGFiaW5kZXg9XCIwXCJdLCBbY29udGVudGVkaXRhYmxlXSc7IC8vIGNhY2hlIGNvbW1vbiBlbGVtZW50c1xuXG4gICAgdmFyIEZQID0ge1xuICAgICAgdGVzdDoge30sXG4gICAgICBzaGFyZWQ6IHt9XG4gICAgfTtcbiAgICB2YXIgZXh0ZW5zaW9ucyA9IFsncGFyYWxsYXgnLCAnc2Nyb2xsT3ZlcmZsb3dSZXNldCcsICdkcmFnQW5kTW92ZScsICdvZmZzZXRTZWN0aW9ucycsICdmYWRpbmdFZmZlY3QnLCAncmVzcG9uc2l2ZVNsaWRlcycsICdjb250aW51b3VzSG9yaXpvbnRhbCcsICdpbnRlcmxvY2tlZFNsaWRlcycsICdzY3JvbGxIb3Jpem9udGFsbHknLCAncmVzZXRTbGlkZXJzJywgJ2NhcmRzJywgJ2Ryb3BFZmZlY3QnLCAnd2F0ZXJFZmZlY3QnXTtcblxuICAgIC8qKlxuICAgICogZm9yRWFjaCBwb2x5ZmlsbCBmb3IgSUVcbiAgICAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9Ob2RlTGlzdC9mb3JFYWNoI0Jyb3dzZXJfQ29tcGF0aWJpbGl0eVxuICAgICovXG5cbiAgICBpZiAod2luLk5vZGVMaXN0ICYmICFOb2RlTGlzdC5wcm90b3R5cGUuZm9yRWFjaCkge1xuICAgICAgTm9kZUxpc3QucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICAgICAgdGhpc0FyZyA9IHRoaXNBcmcgfHwgd2luZG93O1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNhbGxiYWNrLmNhbGwodGhpc0FyZywgdGhpc1tpXSwgaSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBPYmplY3QuYXNzaWduICE9ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIE11c3QgYmUgd3JpdGFibGU6IHRydWUsIGVudW1lcmFibGU6IGZhbHNlLCBjb25maWd1cmFibGU6IHRydWVcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPYmplY3QsICdhc3NpZ24nLCB7XG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCB2YXJBcmdzKSB7XG5cbiAgICAgICAgICBpZiAodGFyZ2V0ID09IG51bGwpIHtcbiAgICAgICAgICAgIC8vIFR5cGVFcnJvciBpZiB1bmRlZmluZWQgb3IgbnVsbFxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgdW5kZWZpbmVkIG9yIG51bGwgdG8gb2JqZWN0Jyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIHRvID0gT2JqZWN0KHRhcmdldCk7XG5cbiAgICAgICAgICBmb3IgKHZhciBpbmRleCA9IDE7IGluZGV4IDwgYXJndW1lbnRzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgdmFyIG5leHRTb3VyY2UgPSBhcmd1bWVudHNbaW5kZXhdO1xuXG4gICAgICAgICAgICBpZiAobmV4dFNvdXJjZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIC8vIFNraXAgb3ZlciBpZiB1bmRlZmluZWQgb3IgbnVsbFxuICAgICAgICAgICAgICBmb3IgKHZhciBuZXh0S2V5IGluIG5leHRTb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAvLyBBdm9pZCBidWdzIHdoZW4gaGFzT3duUHJvcGVydHkgaXMgc2hhZG93ZWRcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG5leHRTb3VyY2UsIG5leHRLZXkpKSB7XG4gICAgICAgICAgICAgICAgICB0b1tuZXh0S2V5XSA9IG5leHRTb3VyY2VbbmV4dEtleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHRvO1xuICAgICAgICB9LFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81MTcxOTU1My9wYWRzdGFydC1ub3Qtd29ya2luZy1pbi1pZTExXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2JlaG5hbW1vZGkvcG9seWZpbGwvYmxvYi9tYXN0ZXIvc3RyaW5nLnBvbHlmaWxsLmpzXG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvU3RyaW5nL3BhZFN0YXJ0XG4gICAgaWYgKCFTdHJpbmcucHJvdG90eXBlLnBhZFN0YXJ0KSB7XG4gICAgICBTdHJpbmcucHJvdG90eXBlLnBhZFN0YXJ0ID0gZnVuY3Rpb24gcGFkU3RhcnQodGFyZ2V0TGVuZ3RoLCBwYWRTdHJpbmcpIHtcbiAgICAgICAgdGFyZ2V0TGVuZ3RoID0gdGFyZ2V0TGVuZ3RoID4+IDA7IC8vdHJ1bmNhdGUgaWYgbnVtYmVyIG9yIGNvbnZlcnQgbm9uLW51bWJlciB0byAwO1xuXG4gICAgICAgIHBhZFN0cmluZyA9IFN0cmluZyh0eXBlb2YgcGFkU3RyaW5nICE9PSAndW5kZWZpbmVkJyA/IHBhZFN0cmluZyA6ICcgJyk7XG5cbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoID4gdGFyZ2V0TGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIFN0cmluZyh0aGlzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0YXJnZXRMZW5ndGggPSB0YXJnZXRMZW5ndGggLSB0aGlzLmxlbmd0aDtcblxuICAgICAgICAgIGlmICh0YXJnZXRMZW5ndGggPiBwYWRTdHJpbmcubGVuZ3RoKSB7XG4gICAgICAgICAgICBwYWRTdHJpbmcgKz0gQXJyYXkuYXBwbHkobnVsbCwgQXJyYXkodGFyZ2V0TGVuZ3RoKSkubWFwKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHBhZFN0cmluZztcbiAgICAgICAgICAgIH0pLmpvaW4oXCJcIik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHBhZFN0cmluZy5zbGljZSgwLCB0YXJnZXRMZW5ndGgpICsgU3RyaW5nKHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vdXRpbHNcbiAgICAvKipcbiAgICAqIFNob3dzIGEgbWVzc2FnZSBpbiB0aGUgY29uc29sZSBvZiB0aGUgZ2l2ZW4gdHlwZS5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gc2hvd0Vycm9yKHR5cGUsIHRleHQpIHtcbiAgICAgIHdpbi5jb25zb2xlICYmIHdpbi5jb25zb2xlW3R5cGVdICYmIHdpbi5jb25zb2xlW3R5cGVdKCdmdWxsUGFnZTogJyArIHRleHQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc1Zpc2libGUoZWwpIHtcbiAgICAgIHZhciBzdHlsZSA9IHdpbi5nZXRDb21wdXRlZFN0eWxlKGVsKTtcbiAgICAgIHJldHVybiBzdHlsZS5kaXNwbGF5ICE9PSAnbm9uZSc7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldFZpc2libGUoZWxlbWVudHMpIHtcbiAgICAgIHJldHVybiBBcnJheS5mcm9tKGVsZW1lbnRzKS5maWx0ZXIoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgcmV0dXJuIGlzVmlzaWJsZShlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAqIEVxdWl2YWxlbnQgb2YgalF1ZXJ5IGZ1bmN0aW9uICQoKS5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gJChzZWxlY3RvciwgY29udGV4dCkge1xuICAgICAgY29udGV4dCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxID8gY29udGV4dCA6IGRvY3VtZW50O1xuICAgICAgcmV0dXJuIGNvbnRleHQgPyBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpIDogbnVsbDtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBFeHRlbmRzIGEgZ2l2ZW4gT2JqZWN0IHByb3BlcnRpZXMgYW5kIGl0cyBjaGlsZHMuXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIGRlZXBFeHRlbmQob3V0KSB7XG4gICAgICBvdXQgPSBvdXQgfHwge307XG5cbiAgICAgIGZvciAodmFyIGkgPSAxLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgdmFyIG9iaiA9IGFyZ3VtZW50c1tpXTtcblxuICAgICAgICBpZiAoIW9iaikge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICAgIGlmICghb2JqLmhhc093blByb3BlcnR5KGtleSkgfHwga2V5ID09ICdfX3Byb3RvX18nIHx8IGtleSA9PSAnY29uc3RydWN0b3InKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9IC8vIGJhc2VkIG9uIGh0dHBzOi8vamF2YXNjcmlwdHdlYmxvZy53b3JkcHJlc3MuY29tLzIwMTEvMDgvMDgvZml4aW5nLXRoZS1qYXZhc2NyaXB0LXR5cGVvZi1vcGVyYXRvci9cblxuXG4gICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmpba2V5XSkgPT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgICAgICAgICBvdXRba2V5XSA9IGRlZXBFeHRlbmQob3V0W2tleV0sIG9ialtrZXldKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIG91dFtrZXldID0gb2JqW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBDaGVja3MgaWYgdGhlIHBhc3NlZCBlbGVtZW50IGNvbnRhaW5zIHRoZSBwYXNzZWQgY2xhc3MuXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIGhhc0NsYXNzKGVsLCBjbGFzc05hbWUpIHtcbiAgICAgIGlmIChlbCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGVsLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAqIEdldHMgdGhlIHdpbmRvdyBoZWlnaHQuIENyb3NzYnJvd3Nlci5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gZ2V0V2luZG93SGVpZ2h0KCkge1xuICAgICAgcmV0dXJuICdpbm5lckhlaWdodCcgaW4gd2luID8gd2luLmlubmVySGVpZ2h0IDogZG9jLmRvY3VtZW50RWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICogR2V0cyB0aGUgd2luZG93IHdpZHRoLlxuICAgICovXG5cbiAgICBmdW5jdGlvbiBnZXRXaW5kb3dXaWR0aCgpIHtcbiAgICAgIHJldHVybiB3aW4uaW5uZXJXaWR0aDtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBTZXQncyB0aGUgQ1NTIHByb3BlcnRpZXMgZm9yIHRoZSBwYXNzZWQgaXRlbS9zLlxuICAgICogQHBhcmFtIHtOb2RlTGlzdHxIVE1MRWxlbWVudHxPYmplY3R9IGl0ZW1zXG4gICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgY3NzIHByb3BlcnRpZXMgYW5kIHZhbHVlcy5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gY3NzKGl0ZW1zLCBwcm9wcykge1xuICAgICAgaXRlbXMgPSBnZXRMaXN0KGl0ZW1zKTtcbiAgICAgIHZhciBrZXk7XG5cbiAgICAgIGZvciAoa2V5IGluIHByb3BzKSB7XG4gICAgICAgIGlmIChwcm9wcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgaWYgKGtleSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICB2YXIgaXRlbSA9IGl0ZW1zW2ldO1xuICAgICAgICAgICAgICBpdGVtLnN0eWxlW2tleV0gPSBwcm9wc1trZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaXRlbXM7XG4gICAgfVxuICAgIC8qKlxuICAgICogR2V0cyB0aGUgcHJldmlvdXMgZWxlbWVudCB0byB0aGUgcGFzc2VkIGVsZW1lbnQuXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIHByZXYoaXRlbSkge1xuICAgICAgcmV0dXJuIGl0ZW0ucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICB9XG4gICAgLyoqXG4gICAgKiBHZXRzIHRoZSBuZXh0IGVsZW1lbnQgdG8gdGhlIHBhc3NlZCBlbGVtZW50LlxuICAgICovXG5cbiAgICBmdW5jdGlvbiBuZXh0KGl0ZW0pIHtcbiAgICAgIHJldHVybiBpdGVtLm5leHRFbGVtZW50U2libGluZztcbiAgICB9XG4gICAgLyoqXG4gICAgKiBHZXRzIHRoZSBsYXN0IGVsZW1lbnQgZnJvbSB0aGUgcGFzc2VkIGxpc3Qgb2YgZWxlbWVudHMuXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIGxhc3QoaXRlbSkge1xuICAgICAgcmV0dXJuIGl0ZW1baXRlbS5sZW5ndGggLSAxXTtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBHZXRzIGluZGV4IGZyb20gdGhlIHBhc3NlZCBlbGVtZW50LlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yIGlzIG9wdGlvbmFsLlxuICAgICovXG5cbiAgICBmdW5jdGlvbiBpbmRleChpdGVtLCBzZWxlY3Rvcikge1xuICAgICAgaXRlbSA9IGlzQXJyYXlPckxpc3QoaXRlbSkgPyBpdGVtWzBdIDogaXRlbTtcbiAgICAgIHZhciBjaGlsZHJlbiA9IHNlbGVjdG9yICE9IG51bGwgPyAkKHNlbGVjdG9yLCBpdGVtLnBhcmVudE5vZGUpIDogaXRlbS5wYXJlbnROb2RlLmNoaWxkTm9kZXM7XG4gICAgICB2YXIgbnVtID0gMDtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoY2hpbGRyZW5baV0gPT0gaXRlbSkgcmV0dXJuIG51bTtcbiAgICAgICAgaWYgKGNoaWxkcmVuW2ldLm5vZGVUeXBlID09IDEpIG51bSsrO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuICAgIC8qKlxuICAgICogR2V0cyBhbiBpdGVyYWJsZSBlbGVtZW50IGZvciB0aGUgcGFzc2VkIGVsZW1lbnQvc1xuICAgICovXG5cbiAgICBmdW5jdGlvbiBnZXRMaXN0KGl0ZW0pIHtcbiAgICAgIHJldHVybiAhaXNBcnJheU9yTGlzdChpdGVtKSA/IFtpdGVtXSA6IGl0ZW07XG4gICAgfVxuICAgIC8qKlxuICAgICogQWRkcyB0aGUgZGlzcGxheT1ub25lIHByb3BlcnR5IGZvciB0aGUgcGFzc2VkIGVsZW1lbnQvc1xuICAgICovXG5cbiAgICBmdW5jdGlvbiBoaWRlKGVsKSB7XG4gICAgICBlbCA9IGdldExpc3QoZWwpO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGVsW2ldLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBlbDtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBBZGRzIHRoZSBkaXNwbGF5PWJsb2NrIHByb3BlcnR5IGZvciB0aGUgcGFzc2VkIGVsZW1lbnQvc1xuICAgICovXG5cbiAgICBmdW5jdGlvbiBzaG93KGVsKSB7XG4gICAgICBlbCA9IGdldExpc3QoZWwpO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGVsW2ldLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZWw7XG4gICAgfVxuICAgIC8qKlxuICAgICogQ2hlY2tzIGlmIHRoZSBwYXNzZWQgZWxlbWVudCBpcyBhbiBpdGVyYWJsZSBlbGVtZW50IG9yIG5vdFxuICAgICovXG5cbiAgICBmdW5jdGlvbiBpc0FycmF5T3JMaXN0KGVsKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGVsKSA9PT0gJ1tvYmplY3QgQXJyYXldJyB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZWwpID09PSAnW29iamVjdCBOb2RlTGlzdF0nO1xuICAgIH1cbiAgICAvKipcbiAgICAqIEFkZHMgdGhlIHBhc3NlZCBjbGFzcyB0byB0aGUgcGFzc2VkIGVsZW1lbnQvc1xuICAgICovXG5cbiAgICBmdW5jdGlvbiBhZGRDbGFzcyhlbCwgY2xhc3NOYW1lKSB7XG4gICAgICBlbCA9IGdldExpc3QoZWwpO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBpdGVtID0gZWxbaV07XG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZWw7XG4gICAgfVxuICAgIC8qKlxuICAgICogUmVtb3ZlcyB0aGUgcGFzc2VkIGNsYXNzIHRvIHRoZSBwYXNzZWQgZWxlbWVudC9zXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gYGNsYXNzTmFtZWAgY2FuIGJlIG11bHRpcGxlIGNsYXNzbmFtZXMgc2VwYXJhdGVkIGJ5IHdoaXRlc3BhY2VcbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gcmVtb3ZlQ2xhc3MoZWwsIGNsYXNzTmFtZSkge1xuICAgICAgZWwgPSBnZXRMaXN0KGVsKTtcbiAgICAgIHZhciBjbGFzc05hbWVzID0gY2xhc3NOYW1lLnNwbGl0KCcgJyk7XG5cbiAgICAgIGZvciAodmFyIGEgPSAwOyBhIDwgY2xhc3NOYW1lcy5sZW5ndGg7IGErKykge1xuICAgICAgICBjbGFzc05hbWUgPSBjbGFzc05hbWVzW2FdO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWwubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgaXRlbSA9IGVsW2ldO1xuICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBlbDtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBBcHBlbmRzIHRoZSBnaXZlbiBlbGVtZW50IG90IHRoZSBnaXZlbiBwYXJlbnQuXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIGFwcGVuZFRvKGVsLCBwYXJlbnQpIHtcbiAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChlbCk7XG4gICAgfVxuICAgIC8qKlxuICAgIFVzYWdlOlxuXG4gICAgdmFyIHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB3cmFwcGVyLmNsYXNzTmFtZSA9ICdmcC1zbGlkZXMnO1xuICAgIHdyYXAoJCgnLnNsaWRlJyksIHdyYXBwZXIpO1xuXG4gICAgaHR0cHM6Ly9qc2ZpZGRsZS5uZXQvcXd6YzdveTMvMTUvICh2YW5pbGxhKVxuICAgIGh0dHBzOi8vanNmaWRkbGUubmV0L295YTZuZGthLzEvIChqcXVlcnkgZXF1aXZhbGVudClcbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gd3JhcCh0b1dyYXAsIHdyYXBwZXIsIGlzV3JhcEFsbCkge1xuICAgICAgdmFyIG5ld1BhcmVudDtcbiAgICAgIHdyYXBwZXIgPSB3cmFwcGVyIHx8IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b1dyYXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGl0ZW0gPSB0b1dyYXBbaV07XG5cbiAgICAgICAgaWYgKGlzV3JhcEFsbCAmJiAhaSB8fCAhaXNXcmFwQWxsKSB7XG4gICAgICAgICAgbmV3UGFyZW50ID0gd3JhcHBlci5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgICAgaXRlbS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXdQYXJlbnQsIGl0ZW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgbmV3UGFyZW50LmFwcGVuZENoaWxkKGl0ZW0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdG9XcmFwO1xuICAgIH1cbiAgICAvKipcbiAgICBVc2FnZTpcbiAgICB2YXIgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHdyYXBwZXIuY2xhc3NOYW1lID0gJ2ZwLXNsaWRlcyc7XG4gICAgd3JhcCgkKCcuc2xpZGUnKSwgd3JhcHBlcik7XG5cbiAgICBodHRwczovL2pzZmlkZGxlLm5ldC9xd3pjN295My8yNy8gKHZhbmlsbGEpXG4gICAgaHR0cHM6Ly9qc2ZpZGRsZS5uZXQvb3lhNm5ka2EvNC8gKGpxdWVyeSBlcXVpdmFsZW50KVxuICAgICovXG5cbiAgICBmdW5jdGlvbiB3cmFwQWxsKHRvV3JhcCwgd3JhcHBlcikge1xuICAgICAgd3JhcCh0b1dyYXAsIHdyYXBwZXIsIHRydWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAqIFVzYWdlOlxuICAgICogd3JhcElubmVyKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwZXBlJyksICc8ZGl2IGNsYXNzPVwidGVzdFwiPmFmZGFzPC9kaXY+Jyk7XG4gICAgKiB3cmFwSW5uZXIoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BlcGUnKSwgZWxlbWVudCk7XG4gICAgKlxuICAgICogaHR0cHM6Ly9qc2ZpZGRsZS5uZXQvemV4eHowdHcvNi9cbiAgICAqXG4gICAgKiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjE4MTc1OTAvMTA4MTM5NlxuICAgICovXG5cbiAgICBmdW5jdGlvbiB3cmFwSW5uZXIocGFyZW50LCB3cmFwcGVyKSB7XG4gICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQod3JhcHBlcik7XG5cbiAgICAgIHdoaWxlIChwYXJlbnQuZmlyc3RDaGlsZCAhPT0gd3JhcHBlcikge1xuICAgICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHBhcmVudC5maXJzdENoaWxkKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgKiBVc2FnZTpcbiAgICAqIHVud3JhcChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGVwZScpKTtcbiAgICAqIHVud3JhcChlbGVtZW50KTtcbiAgICAqXG4gICAgKiBodHRwczovL2pzZmlkZGxlLm5ldC9zemp0MGh4cS8xL1xuICAgICpcbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gdW53cmFwKHdyYXBwZXIpIHtcbiAgICAgIHZhciB3cmFwcGVyQ29udGVudCA9IGRvYy5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cbiAgICAgIHdoaWxlICh3cmFwcGVyLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgd3JhcHBlckNvbnRlbnQuYXBwZW5kQ2hpbGQod3JhcHBlci5maXJzdENoaWxkKTtcbiAgICAgIH1cblxuICAgICAgd3JhcHBlci5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZCh3cmFwcGVyQ29udGVudCwgd3JhcHBlcik7XG4gICAgfVxuICAgIC8qKlxuICAgICogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yMjEwMDg1My9kb20tcHVyZS1qYXZhc2NyaXB0LXNvbHV0aW9uLXRvLWpxdWVyeS1jbG9zZXN0LWltcGxlbWVudGF0aW9uXG4gICAgKiBSZXR1cm5zIHRoZSBlbGVtZW50IG9yIGBmYWxzZWAgaWYgdGhlcmUncyBub25lXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIGNsb3Nlc3QoZWwsIHNlbGVjdG9yKSB7XG4gICAgICBpZiAoZWwgJiYgZWwubm9kZVR5cGUgPT09IDEpIHtcbiAgICAgICAgaWYgKG1hdGNoZXMoZWwsIHNlbGVjdG9yKSkge1xuICAgICAgICAgIHJldHVybiBlbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjbG9zZXN0KGVsLnBhcmVudE5vZGUsIHNlbGVjdG9yKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8qKlxuICAgICogUGxhY2VzIG9uZSBlbGVtZW50IChyZWwpIGFmdGVyIGFub3RoZXIgb25lIG9yIGdyb3VwIG9mIHRoZW0gKHJlZmVyZW5jZSkuXG4gICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSByZWZlcmVuY2VcbiAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR8Tm9kZUxpc3R8U3RyaW5nfEFycmF5fSBlbFxuICAgICogaHR0cHM6Ly9qc2ZpZGRsZS5uZXQvOXM5N2hoenYvMS9cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gYWZ0ZXIocmVmZXJlbmNlLCBlbCkge1xuICAgICAgaW5zZXJ0QmVmb3JlKHJlZmVyZW5jZSwgcmVmZXJlbmNlLm5leHRTaWJsaW5nLCBlbCk7XG4gICAgfVxuICAgIC8qKlxuICAgICogUGxhY2VzIG9uZSBlbGVtZW50IChyZWwpIGJlZm9yZSBhbm90aGVyIG9uZSBvciBncm91cCBvZiB0aGVtIChyZWZlcmVuY2UpLlxuICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcmVmZXJlbmNlXG4gICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fE5vZGVMaXN0fFN0cmluZ3xBcnJheX0gZWxcbiAgICAqIGh0dHBzOi8vanNmaWRkbGUubmV0LzlzOTdoaHp2LzEvXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIGJlZm9yZShyZWZlcmVuY2UsIGVsKSB7XG4gICAgICBpbnNlcnRCZWZvcmUocmVmZXJlbmNlLCByZWZlcmVuY2UsIGVsKTtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBCYXNlZCBpbiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTkzMTYwMjQvMTA4MTM5NlxuICAgICogYW5kIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS80NzkzNjMwLzEwODEzOTZcbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gaW5zZXJ0QmVmb3JlKHJlZmVyZW5jZSwgYmVmb3JlRWxlbWVudCwgZWwpIHtcbiAgICAgIGlmICghaXNBcnJheU9yTGlzdChlbCkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBlbCA9PSAnc3RyaW5nJykge1xuICAgICAgICAgIGVsID0gY3JlYXRlRWxlbWVudEZyb21IVE1MKGVsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVsID0gW2VsXTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbC5sZW5ndGg7IGkrKykge1xuICAgICAgICByZWZlcmVuY2UucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZWxbaV0sIGJlZm9yZUVsZW1lbnQpO1xuICAgICAgfVxuICAgIH0gLy9odHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM0NjQ4NzYvamF2YXNjcmlwdC1nZXQtd2luZG93LXgteS1wb3NpdGlvbi1mb3Itc2Nyb2xsXG5cbiAgICBmdW5jdGlvbiBnZXRTY3JvbGxUb3AoKSB7XG4gICAgICB2YXIgZG9jRWxlbWVudCA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICByZXR1cm4gKHdpbi5wYWdlWU9mZnNldCB8fCBkb2NFbGVtZW50LnNjcm9sbFRvcCkgLSAoZG9jRWxlbWVudC5jbGllbnRUb3AgfHwgMCk7XG4gICAgfVxuICAgIC8qKlxuICAgICogR2V0cyB0aGUgc2libGluZ3Mgb2YgdGhlIHBhc3NlZCBlbGVtZW50XG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIHNpYmxpbmdzKGVsKSB7XG4gICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmZpbHRlci5jYWxsKGVsLnBhcmVudE5vZGUuY2hpbGRyZW4sIGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICByZXR1cm4gY2hpbGQgIT09IGVsO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHByZXZlbnREZWZhdWx0KGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRBdHRyKGVsLCBhdHRyKSB7XG4gICAgICByZXR1cm4gZWwuZ2V0QXR0cmlidXRlKGF0dHIpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBkb2NBZGRFdmVudChldmVudCwgY2FsbGJhY2ssIG9wdGlvbnMpIHtcbiAgICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBjYWxsYmFjaywgb3B0aW9ucyA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogb3B0aW9ucyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHdpbmRvd0FkZEV2ZW50KGV2ZW50LCBjYWxsYmFjaywgb3B0aW9ucykge1xuICAgICAgd2luLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGNhbGxiYWNrLCBvcHRpb25zID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiBvcHRpb25zKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZG9jUmVtb3ZlRXZlbnQoZXZlbnQsIGNhbGxiYWNrLCBvcHRpb25zKSB7XG4gICAgICBkb2MucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgY2FsbGJhY2ssIG9wdGlvbnMgPT09ICd1bmRlZmluZWQnID8gbnVsbCA6IG9wdGlvbnMpO1xuICAgIH1cbiAgICBmdW5jdGlvbiB3aW5kb3dSZW1vdmVFdmVudChldmVudCwgY2FsbGJhY2ssIG9wdGlvbnMpIHtcbiAgICAgIHdpbi5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBjYWxsYmFjaywgb3B0aW9ucyA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogb3B0aW9ucyk7XG4gICAgfVxuICAgIC8qKlxuICAgICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBwYXNzZWQgaXRlbSBpcyBvZiBmdW5jdGlvbiB0eXBlLlxuICAgICovXG5cbiAgICBmdW5jdGlvbiBpc0Z1bmN0aW9uKGl0ZW0pIHtcbiAgICAgIGlmICh0eXBlb2YgaXRlbSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgdmFyIHR5cGUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaXRlbSk7XG4gICAgICByZXR1cm4gdHlwZSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJyB8fCB0eXBlID09PSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nO1xuICAgIH1cbiAgICAvKipcbiAgICAqIFRyaWdnZXIgY3VzdG9tIGV2ZW50c1xuICAgICovXG5cbiAgICBmdW5jdGlvbiB0cmlnZ2VyKGVsLCBldmVudE5hbWUsIGRhdGEpIHtcbiAgICAgIHZhciBldmVudDtcbiAgICAgIGRhdGEgPSB0eXBlb2YgZGF0YSA9PT0gJ3VuZGVmaW5lZCcgPyB7fSA6IGRhdGE7IC8vIE5hdGl2ZVxuXG4gICAgICBpZiAodHlwZW9mIHdpbi5DdXN0b21FdmVudCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KGV2ZW50TmFtZSwge1xuICAgICAgICAgIGRldGFpbDogZGF0YVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGV2ZW50ID0gZG9jLmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICAgICAgICBldmVudC5pbml0Q3VzdG9tRXZlbnQoZXZlbnROYW1lLCB0cnVlLCB0cnVlLCBkYXRhKTtcbiAgICAgIH1cblxuICAgICAgZWwuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfVxuICAgIC8qKlxuICAgICogUG9seWZpbGwgb2YgLm1hdGNoZXMoKVxuICAgICovXG5cbiAgICBmdW5jdGlvbiBtYXRjaGVzKGVsLCBzZWxlY3Rvcikge1xuICAgICAgcmV0dXJuIChlbC5tYXRjaGVzIHx8IGVsLm1hdGNoZXNTZWxlY3RvciB8fCBlbC5tc01hdGNoZXNTZWxlY3RvciB8fCBlbC5tb3pNYXRjaGVzU2VsZWN0b3IgfHwgZWwud2Via2l0TWF0Y2hlc1NlbGVjdG9yIHx8IGVsLm9NYXRjaGVzU2VsZWN0b3IpLmNhbGwoZWwsIHNlbGVjdG9yKTtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBUb2dnbGVzIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBwYXNzZWQgZWxlbWVudCBlbC5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gdG9nZ2xlKGVsLCB2YWx1ZSkge1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCIpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGVsW2ldLnN0eWxlLmRpc3BsYXkgPSB2YWx1ZSA/ICdibG9jaycgOiAnbm9uZSc7XG4gICAgICAgIH1cbiAgICAgIH0gLy93ZSBkb24ndCB1c2UgaXQgaW4gb3RoZXIgd2F5LCBzbyBubyBlbHNlIDopXG5cblxuICAgICAgcmV0dXJuIGVsO1xuICAgIH1cbiAgICAvKipcbiAgICAqIENyZWF0ZXMgYSBIVE1MRWxlbWVudCBmcm9tIHRoZSBwYXNzZWQgSFRNTCBzdHJpbmcuXG4gICAgKiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNDk0MzQ4LzEwODEzOTZcbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudEZyb21IVE1MKGh0bWxTdHJpbmcpIHtcbiAgICAgIHZhciBkaXYgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBkaXYuaW5uZXJIVE1MID0gaHRtbFN0cmluZy50cmltKCk7IC8vIENoYW5nZSB0aGlzIHRvIGRpdi5jaGlsZE5vZGVzIHRvIHN1cHBvcnQgbXVsdGlwbGUgdG9wLWxldmVsIG5vZGVzXG5cbiAgICAgIHJldHVybiBkaXYuZmlyc3RDaGlsZDtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBSZW1vdmVzIHRoZSBwYXNzZWQgaXRlbS9zIGZyb20gdGhlIERPTS5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gcmVtb3ZlKGl0ZW1zKSB7XG4gICAgICBpdGVtcyA9IGdldExpc3QoaXRlbXMpO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBpdGVtID0gaXRlbXNbaV07XG5cbiAgICAgICAgaWYgKGl0ZW0gJiYgaXRlbS5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgaXRlbS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSAvL2h0dHBzOi8vanNmaWRkbGUubmV0L3cxcmt0ZWN6L1xuXG4gICAgZnVuY3Rpb24gdW50aWxBbGwoaXRlbSwgc2VsZWN0b3IsIGZuKSB7XG4gICAgICB2YXIgc2libGluZyA9IGl0ZW1bZm5dO1xuICAgICAgdmFyIHNpYmxpbmdzID0gW107XG5cbiAgICAgIHdoaWxlIChzaWJsaW5nKSB7XG4gICAgICAgIGlmIChtYXRjaGVzKHNpYmxpbmcsIHNlbGVjdG9yKSB8fCBzZWxlY3RvciA9PSBudWxsKSB7XG4gICAgICAgICAgc2libGluZ3MucHVzaChzaWJsaW5nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNpYmxpbmcgPSBzaWJsaW5nW2ZuXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNpYmxpbmdzO1xuICAgIH1cbiAgICAvKipcbiAgICAqIEdldHMgYWxsIG5leHQgZWxlbWVudHMgbWF0Y2hpbmcgdGhlIHBhc3NlZCBzZWxlY3Rvci5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gbmV4dEFsbChpdGVtLCBzZWxlY3Rvcikge1xuICAgICAgcmV0dXJuIHVudGlsQWxsKGl0ZW0sIHNlbGVjdG9yLCAnbmV4dEVsZW1lbnRTaWJsaW5nJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICogR2V0cyBhbGwgcHJldmlvdXMgZWxlbWVudHMgbWF0Y2hpbmcgdGhlIHBhc3NlZCBzZWxlY3Rvci5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gcHJldkFsbChpdGVtLCBzZWxlY3Rvcikge1xuICAgICAgcmV0dXJuIHVudGlsQWxsKGl0ZW0sIHNlbGVjdG9yLCAncHJldmlvdXNFbGVtZW50U2libGluZycpO1xuICAgIH1cbiAgICAvKipcbiAgICAqIENvbnZlcnRzIGFuIG9iamVjdCB0byBhbiBhcnJheS5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gdG9BcnJheShvYmplY3REYXRhKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqZWN0RGF0YSkubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdERhdGFba2V5XTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRMYXN0KGl0ZW1zKSB7XG4gICAgICByZXR1cm4gaXRlbXNbaXRlbXMubGVuZ3RoIC0gMV07XG4gICAgfVxuICAgIC8qKlxuICAgICogR2V0cyB0aGUgYXZlcmFnZSBvZiB0aGUgbGFzdCBgbnVtYmVyYCBlbGVtZW50cyBvZiB0aGUgZ2l2ZW4gYXJyYXkuXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIGdldEF2ZXJhZ2UoZWxlbWVudHMsIG51bWJlcikge1xuICAgICAgdmFyIHN1bSA9IDA7IC8vdGFraW5nIGBudW1iZXJgIGVsZW1lbnRzIGZyb20gdGhlIGVuZCB0byBtYWtlIHRoZSBhdmVyYWdlLCBpZiB0aGVyZSBhcmUgbm90IGVub3VnaHQsIDFcblxuICAgICAgdmFyIGxhc3RFbGVtZW50cyA9IGVsZW1lbnRzLnNsaWNlKE1hdGgubWF4KGVsZW1lbnRzLmxlbmd0aCAtIG51bWJlciwgMSkpO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RFbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBzdW0gPSBzdW0gKyBsYXN0RWxlbWVudHNbaV07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBNYXRoLmNlaWwoc3VtIC8gbnVtYmVyKTtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBTZXRzIHRoZSB2YWx1ZSBmb3IgdGhlIGdpdmVuIGF0dHJpYnV0ZSBmcm9tIHRoZSBgZGF0YS1gIGF0dHJpYnV0ZSB3aXRoIHRoZSBzYW1lIHN1ZmZpeFxuICAgICogaWU6IGRhdGEtc3Jjc2V0ID09PiBzcmNzZXQgIHwgIGRhdGEtc3JjID09PiBzcmNcbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gc2V0U3JjKGVsZW1lbnQsIGF0dHJpYnV0ZSkge1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlLCBnZXRBdHRyKGVsZW1lbnQsICdkYXRhLScgKyBhdHRyaWJ1dGUpKTtcbiAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdkYXRhLScgKyBhdHRyaWJ1dGUpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRQYXJlbnRzVW50aWwoaXRlbSwgdG9wUGFyZW50U2VsZWN0b3IpIHtcbiAgICAgIHZhciBwYXJlbnRzID0gW2l0ZW1dO1xuXG4gICAgICBkbyB7XG4gICAgICAgIGl0ZW0gPSBpdGVtLnBhcmVudE5vZGU7XG4gICAgICAgIHBhcmVudHMucHVzaChpdGVtKTtcbiAgICAgIH0gd2hpbGUgKCFtYXRjaGVzKGl0ZW0sIHRvcFBhcmVudFNlbGVjdG9yKSk7XG5cbiAgICAgIHJldHVybiBwYXJlbnRzO1xuICAgIH0gLy91dGlscyBhcmUgcHVibGljLCBzbyB3ZSBjYW4gdXNlIGl0IHdoZXJldmVyIHdlIHdhbnRcbiAgICAvLyBAdHMtaWdub3JlXG5cbiAgICB3aW5kb3dbXCJmcF91dGlsc1wiXSA9IHtcbiAgICAgIFwiJFwiOiAkLFxuICAgICAgXCJkZWVwRXh0ZW5kXCI6IGRlZXBFeHRlbmQsXG4gICAgICBcImhhc0NsYXNzXCI6IGhhc0NsYXNzLFxuICAgICAgXCJnZXRXaW5kb3dIZWlnaHRcIjogZ2V0V2luZG93SGVpZ2h0LFxuICAgICAgXCJjc3NcIjogY3NzLFxuICAgICAgXCJwcmV2XCI6IHByZXYsXG4gICAgICBcIm5leHRcIjogbmV4dCxcbiAgICAgIFwibGFzdFwiOiBsYXN0LFxuICAgICAgXCJpbmRleFwiOiBpbmRleCxcbiAgICAgIFwiZ2V0TGlzdFwiOiBnZXRMaXN0LFxuICAgICAgXCJoaWRlXCI6IGhpZGUsXG4gICAgICBcInNob3dcIjogc2hvdyxcbiAgICAgIFwiaXNBcnJheU9yTGlzdFwiOiBpc0FycmF5T3JMaXN0LFxuICAgICAgXCJhZGRDbGFzc1wiOiBhZGRDbGFzcyxcbiAgICAgIFwicmVtb3ZlQ2xhc3NcIjogcmVtb3ZlQ2xhc3MsXG4gICAgICBcImFwcGVuZFRvXCI6IGFwcGVuZFRvLFxuICAgICAgXCJ3cmFwXCI6IHdyYXAsXG4gICAgICBcIndyYXBBbGxcIjogd3JhcEFsbCxcbiAgICAgIFwidW53cmFwXCI6IHVud3JhcCxcbiAgICAgIFwiY2xvc2VzdFwiOiBjbG9zZXN0LFxuICAgICAgXCJhZnRlclwiOiBhZnRlcixcbiAgICAgIFwiYmVmb3JlXCI6IGJlZm9yZSxcbiAgICAgIFwiaW5zZXJ0QmVmb3JlXCI6IGluc2VydEJlZm9yZSxcbiAgICAgIFwiZ2V0U2Nyb2xsVG9wXCI6IGdldFNjcm9sbFRvcCxcbiAgICAgIFwic2libGluZ3NcIjogc2libGluZ3MsXG4gICAgICBcInByZXZlbnREZWZhdWx0XCI6IHByZXZlbnREZWZhdWx0LFxuICAgICAgXCJpc0Z1bmN0aW9uXCI6IGlzRnVuY3Rpb24sXG4gICAgICBcInRyaWdnZXJcIjogdHJpZ2dlcixcbiAgICAgIFwibWF0Y2hlc1wiOiBtYXRjaGVzLFxuICAgICAgXCJ0b2dnbGVcIjogdG9nZ2xlLFxuICAgICAgXCJjcmVhdGVFbGVtZW50RnJvbUhUTUxcIjogY3JlYXRlRWxlbWVudEZyb21IVE1MLFxuICAgICAgXCJyZW1vdmVcIjogcmVtb3ZlLFxuICAgICAgLy8gXCJmaWx0ZXJcIjogZmlsdGVyLFxuICAgICAgXCJ1bnRpbEFsbFwiOiB1bnRpbEFsbCxcbiAgICAgIFwibmV4dEFsbFwiOiBuZXh0QWxsLFxuICAgICAgXCJwcmV2QWxsXCI6IHByZXZBbGwsXG4gICAgICBcInNob3dFcnJvclwiOiBzaG93RXJyb3JcbiAgICB9O1xuXG4gICAgdmFyIHV0aWxzID0gLyojX19QVVJFX18qL09iamVjdC5mcmVlemUoe1xuICAgICAgICBfX3Byb3RvX186IG51bGwsXG4gICAgICAgIHNob3dFcnJvcjogc2hvd0Vycm9yLFxuICAgICAgICBpc1Zpc2libGU6IGlzVmlzaWJsZSxcbiAgICAgICAgZ2V0VmlzaWJsZTogZ2V0VmlzaWJsZSxcbiAgICAgICAgJDogJCxcbiAgICAgICAgZGVlcEV4dGVuZDogZGVlcEV4dGVuZCxcbiAgICAgICAgaGFzQ2xhc3M6IGhhc0NsYXNzLFxuICAgICAgICBnZXRXaW5kb3dIZWlnaHQ6IGdldFdpbmRvd0hlaWdodCxcbiAgICAgICAgZ2V0V2luZG93V2lkdGg6IGdldFdpbmRvd1dpZHRoLFxuICAgICAgICBjc3M6IGNzcyxcbiAgICAgICAgcHJldjogcHJldixcbiAgICAgICAgbmV4dDogbmV4dCxcbiAgICAgICAgbGFzdDogbGFzdCxcbiAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICBnZXRMaXN0OiBnZXRMaXN0LFxuICAgICAgICBoaWRlOiBoaWRlLFxuICAgICAgICBzaG93OiBzaG93LFxuICAgICAgICBpc0FycmF5T3JMaXN0OiBpc0FycmF5T3JMaXN0LFxuICAgICAgICBhZGRDbGFzczogYWRkQ2xhc3MsXG4gICAgICAgIHJlbW92ZUNsYXNzOiByZW1vdmVDbGFzcyxcbiAgICAgICAgYXBwZW5kVG86IGFwcGVuZFRvLFxuICAgICAgICB3cmFwOiB3cmFwLFxuICAgICAgICB3cmFwQWxsOiB3cmFwQWxsLFxuICAgICAgICB3cmFwSW5uZXI6IHdyYXBJbm5lcixcbiAgICAgICAgdW53cmFwOiB1bndyYXAsXG4gICAgICAgIGNsb3Nlc3Q6IGNsb3Nlc3QsXG4gICAgICAgIGFmdGVyOiBhZnRlcixcbiAgICAgICAgYmVmb3JlOiBiZWZvcmUsXG4gICAgICAgIGluc2VydEJlZm9yZTogaW5zZXJ0QmVmb3JlLFxuICAgICAgICBnZXRTY3JvbGxUb3A6IGdldFNjcm9sbFRvcCxcbiAgICAgICAgc2libGluZ3M6IHNpYmxpbmdzLFxuICAgICAgICBwcmV2ZW50RGVmYXVsdDogcHJldmVudERlZmF1bHQsXG4gICAgICAgIGdldEF0dHI6IGdldEF0dHIsXG4gICAgICAgIGRvY0FkZEV2ZW50OiBkb2NBZGRFdmVudCxcbiAgICAgICAgd2luZG93QWRkRXZlbnQ6IHdpbmRvd0FkZEV2ZW50LFxuICAgICAgICBkb2NSZW1vdmVFdmVudDogZG9jUmVtb3ZlRXZlbnQsXG4gICAgICAgIHdpbmRvd1JlbW92ZUV2ZW50OiB3aW5kb3dSZW1vdmVFdmVudCxcbiAgICAgICAgaXNGdW5jdGlvbjogaXNGdW5jdGlvbixcbiAgICAgICAgdHJpZ2dlcjogdHJpZ2dlcixcbiAgICAgICAgbWF0Y2hlczogbWF0Y2hlcyxcbiAgICAgICAgdG9nZ2xlOiB0b2dnbGUsXG4gICAgICAgIGNyZWF0ZUVsZW1lbnRGcm9tSFRNTDogY3JlYXRlRWxlbWVudEZyb21IVE1MLFxuICAgICAgICByZW1vdmU6IHJlbW92ZSxcbiAgICAgICAgdW50aWxBbGw6IHVudGlsQWxsLFxuICAgICAgICBuZXh0QWxsOiBuZXh0QWxsLFxuICAgICAgICBwcmV2QWxsOiBwcmV2QWxsLFxuICAgICAgICB0b0FycmF5OiB0b0FycmF5LFxuICAgICAgICBnZXRMYXN0OiBnZXRMYXN0LFxuICAgICAgICBnZXRBdmVyYWdlOiBnZXRBdmVyYWdlLFxuICAgICAgICBzZXRTcmM6IHNldFNyYyxcbiAgICAgICAgZ2V0UGFyZW50c1VudGlsOiBnZXRQYXJlbnRzVW50aWxcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7XG5cbiAgICAgIGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikge1xuICAgICAgICBfdHlwZW9mID0gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgIHJldHVybiB0eXBlb2Ygb2JqO1xuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX3R5cGVvZiA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIF90eXBlb2Yob2JqKTtcbiAgICB9XG5cbiAgICB2YXIgRXZlbnRFbWl0dGVyID0ge1xuICAgICAgZXZlbnRzOiB7fSxcbiAgICAgIG9uOiBmdW5jdGlvbiBvbihldmVudCwgbGlzdGVuZXIpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICBpZiAoX3R5cGVvZih0aGlzLmV2ZW50c1tldmVudF0pICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50XSA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ldmVudHNbZXZlbnRdLnB1c2gobGlzdGVuZXIpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBfdGhpcy5yZW1vdmVMaXN0ZW5lcihldmVudCwgbGlzdGVuZXIpO1xuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIHJlbW92ZUxpc3RlbmVyOiBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcihldmVudCwgbGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKF90eXBlb2YodGhpcy5ldmVudHNbZXZlbnRdKSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICB2YXIgaWR4ID0gdGhpcy5ldmVudHNbZXZlbnRdLmluZGV4T2YobGlzdGVuZXIpO1xuXG4gICAgICAgICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50c1tldmVudF0uc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZW1pdDogZnVuY3Rpb24gZW1pdChldmVudCkge1xuICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoX3R5cGVvZih0aGlzLmV2ZW50c1tldmVudF0pID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50XS5mb3JFYWNoKGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgICAgICAgICAgcmV0dXJuIGxpc3RlbmVyLmFwcGx5KF90aGlzMiwgYXJncyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBvbmNlOiBmdW5jdGlvbiBvbmNlKGV2ZW50LCBsaXN0ZW5lcikge1xuICAgICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgICB2YXIgcmVtb3ZlID0gdGhpcy5vbihldmVudCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJlbW92ZSgpO1xuXG4gICAgICAgICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4yKSwgX2tleTIgPSAwOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgICAgICBhcmdzW19rZXkyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGlzdGVuZXIuYXBwbHkoX3RoaXMzLCBhcmdzKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciBzdGF0ZSA9IHtcbiAgICAgIG51bVNlY3Rpb25zOiAwLFxuICAgICAgbnVtU2xpZGVzOiAwLFxuICAgICAgc2xpZGVzOiBbXSxcbiAgICAgIHNlY3Rpb25zOiBbXSxcbiAgICAgIGFjdGl2ZVNlY3Rpb246IG51bGwsXG4gICAgICBzY3JvbGxUcmlnZ2VyOiBudWxsLFxuICAgICAgaXNCZXlvbmRGdWxscGFnZTogZmFsc2UsXG4gICAgICBhYm91dFRvU2Nyb2xsVG9GdWxsUGFnZTogZmFsc2UsXG4gICAgICBzbGlkZU1vdmluZzogZmFsc2UsXG4gICAgICBpc1Jlc2l6aW5nOiBmYWxzZSxcbiAgICAgIGlzU2Nyb2xsaW5nOiBmYWxzZSxcbiAgICAgIGxhc3RTY3JvbGxlZERlc3Rpbnk6IHVuZGVmaW5lZCxcbiAgICAgIGxhc3RTY3JvbGxlZFNsaWRlOiB1bmRlZmluZWQsXG4gICAgICBhY3RpdmVBbmltYXRpb246IGZhbHNlLFxuICAgICAgY2FuU2Nyb2xsOiB0cnVlLFxuICAgICAgdG91Y2hEaXJlY3Rpb246ICdub25lJyxcbiAgICAgIHdoZWVsRGlyZWN0aW9uOiAnbm9uZScsXG4gICAgICBpc0dyYWJiaW5nOiBmYWxzZSxcbiAgICAgIGlzVXNpbmdXaGVlbDogZmFsc2UsXG4gICAgICBpc1dpbmRvd0ZvY3VzZWQ6IHRydWUsXG4gICAgICBwcmV2aW91c0Rlc3RUb3A6IDAsXG4gICAgICB3aW5kb3dzSGVpZ2h0OiBnZXRXaW5kb3dIZWlnaHQoKSxcbiAgICAgIGlzRG9pbmdDb250aW5vdXNWZXJ0aWNhbDogZmFsc2UsXG4gICAgICB0aW1lb3V0czoge30sXG4gICAgICBzY3JvbGxZOiAwLFxuICAgICAgc2Nyb2xsWDogMFxuICAgIH07IC8vIEB0cy1pZ25vcmVcblxuICAgIHdpbi5zdGF0ZSA9IHN0YXRlO1xuICAgIGZ1bmN0aW9uIHNldFN0YXRlKHByb3BzKSB7XG4gICAgICBPYmplY3QuYXNzaWduKHN0YXRlLCBwcm9wcyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldFN0YXRlKCkge1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRBY3RpdmVQYW5lbCgpIHtcbiAgICAgIHJldHVybiBzdGF0ZS5hY3RpdmVTZWN0aW9uICYmIHN0YXRlLmFjdGl2ZVNlY3Rpb24uYWN0aXZlU2xpZGUgPyBzdGF0ZS5hY3RpdmVTZWN0aW9uLmFjdGl2ZVNsaWRlIDogc3RhdGUuYWN0aXZlU2VjdGlvbjtcbiAgICB9XG5cbiAgICB2YXIgZXZlbnRzID0ge1xuICAgICAgb25BZnRlclJlbmRlck5vQW5jaG9yOiAnb25BZnRlclJlbmRlck5vQW5jaG9yJyxcbiAgICAgIG9uQ2xpY2tPclRvdWNoOiAnb25DbGlja09yVG91Y2gnLFxuICAgICAgbW92ZVNsaWRlTGVmdDogJ21vdmVTbGlkZUxlZnQnLFxuICAgICAgbW92ZVNsaWRlUmlnaHQ6ICdtb3ZlU2xpZGVSaWdodCcsXG4gICAgICBvbkluaXRpYWxpc2U6ICdvbkluaXRpYWxpc2UnLFxuICAgICAgYmVmb3JlSW5pdDogJ2JlZm9yZUluaXQnLFxuICAgICAgYmluZEV2ZW50czogJ2JpbmRFdmVudHMnLFxuICAgICAgb25EZXN0cm95OiAnb25EZXN0cm95JyxcbiAgICAgIGNvbnRlbnRDaGFuZ2VkOiAnY29udGVudENoYW5nZWQnLFxuICAgICAgb25TY3JvbGxPdmVyZmxvd1Njcm9sbGVkOiAnb25TY3JvbGxPdmVyZmxvd1Njcm9sbGVkJyxcbiAgICAgIG9uU2Nyb2xsUGFnZUFuZFNsaWRlOiAnb25TY3JvbGxQYWdlQW5kU2xpZGUnLFxuICAgICAgb25LZXlEb3duOiAnb25LZXlEb3duJyxcbiAgICAgIG9uTWVudUNsaWNrOiAnb25NZW51Q2xpY2snLFxuICAgICAgc2Nyb2xsUGFnZTogJ3Njcm9sbFBhZ2UnLFxuICAgICAgbGFuZHNjYXBlU2Nyb2xsOiAnbGFuZHNjYXBlU2Nyb2xsJyxcbiAgICAgIHNjcm9sbEJleW9uZEZ1bGxwYWdlOiAnc2Nyb2xsQmV5b25kRnVsbHBhZ2UnLFxuICAgICAgb25QZXJmb3JtTW92ZW1lbnQ6ICdvblBlcmZvcm1Nb3ZlbWVudCcsXG4gICAgICBhZnRlclNlY3Rpb25Mb2FkczogJ2FmdGVyU2VjdGlvbkxvYWRzJyxcbiAgICAgIGFmdGVyU2xpZGVMb2FkczogJ2FmdGVyU2xpZGVMb2FkcydcbiAgICB9O1xuXG4gICAgRXZlbnRFbWl0dGVyLm9uKGV2ZW50cy5iaW5kRXZlbnRzLCBiaW5kRXZlbnRzJGMpO1xuXG4gICAgZnVuY3Rpb24gYmluZEV2ZW50cyRjKCkge1xuICAgICAgLy9TY3JvbGxzIHRvIHRoZSBzZWN0aW9uIHdoZW4gY2xpY2tpbmcgdGhlIG5hdmlnYXRpb24gYnVsbGV0XG4gICAgICAvL3NpbXVsYXRpbmcgdGhlIGpRdWVyeSAub24oJ2NsaWNrJykgZXZlbnQgdXNpbmcgZGVsZWdhdGlvblxuICAgICAgWydjbGljaycsICd0b3VjaHN0YXJ0J10uZm9yRWFjaChmdW5jdGlvbiAoZXZlbnROYW1lKSB7XG4gICAgICAgIGRvY0FkZEV2ZW50KGV2ZW50TmFtZSwgZGVsZWdhdGVkRXZlbnRzKTtcbiAgICAgIH0pO1xuICAgICAgd2luZG93QWRkRXZlbnQoJ2ZvY3VzJywgZm9jdXNIYW5kbGVyKTtcbiAgICAgIGludGVybmFsRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW50ZXJuYWxFdmVudHMoKSB7XG4gICAgICBFdmVudEVtaXR0ZXIub24oZXZlbnRzLm9uRGVzdHJveSwgb25EZXN0cm95JDgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlbGVnYXRlZEV2ZW50cyhlKSB7XG4gICAgICBFdmVudEVtaXR0ZXIuZW1pdChldmVudHMub25DbGlja09yVG91Y2gsIHtcbiAgICAgICAgZTogZSxcbiAgICAgICAgdGFyZ2V0OiBlLnRhcmdldFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25EZXN0cm95JDgoKSB7XG4gICAgICBbJ2NsaWNrJywgJ3RvdWNoc3RhcnQnXS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudE5hbWUpIHtcbiAgICAgICAgZG9jUmVtb3ZlRXZlbnQoZXZlbnROYW1lLCBkZWxlZ2F0ZWRFdmVudHMpO1xuICAgICAgfSk7XG4gICAgfSAvLyBjaGFuZ2luZyBpc1dpbmRvd0ZvY3VzZWQgdG8gdHJ1ZSBvbiBmb2N1cyBldmVudFxuXG5cbiAgICBmdW5jdGlvbiBmb2N1c0hhbmRsZXIoKSB7XG4gICAgICBzZXRTdGF0ZSh7XG4gICAgICAgIGlzV2luZG93Rm9jdXNlZDogdHJ1ZVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8ga2VlcGluZyBjZW50cmFsIHNldCBvZiBjbGFzc25hbWVzIGFuZCBzZWxlY3RvcnNcbiAgICB2YXIgV1JBUFBFUiA9ICdmdWxscGFnZS13cmFwcGVyJztcbiAgICB2YXIgV1JBUFBFUl9TRUwgPSAnLicgKyBXUkFQUEVSOyAvLyBzbGltc2Nyb2xsXG5cbiAgICB2YXIgUkVTUE9OU0lWRSA9ICdmcC1yZXNwb25zaXZlJztcbiAgICB2YXIgTk9fVFJBTlNJVElPTiA9ICdmcC1ub3RyYW5zaXRpb24nO1xuICAgIHZhciBERVNUUk9ZRUQgPSAnZnAtZGVzdHJveWVkJztcbiAgICB2YXIgRU5BQkxFRCA9ICdmcC1lbmFibGVkJztcbiAgICB2YXIgVklFV0lOR19QUkVGSVggPSAnZnAtdmlld2luZyc7XG4gICAgdmFyIEFDVElWRSA9ICdhY3RpdmUnO1xuICAgIHZhciBBQ1RJVkVfU0VMID0gJy4nICsgQUNUSVZFO1xuICAgIHZhciBDT01QTEVURUxZID0gJ2ZwLWNvbXBsZXRlbHknO1xuICAgIHZhciBDT01QTEVURUxZX1NFTCA9ICcuJyArIENPTVBMRVRFTFk7IC8vIHNlY3Rpb25cblxuICAgIHZhciBTRUNUSU9OX0RFRkFVTFRfU0VMID0gJy5zZWN0aW9uJztcbiAgICB2YXIgU0VDVElPTiA9ICdmcC1zZWN0aW9uJztcbiAgICB2YXIgU0VDVElPTl9TRUwgPSAnLicgKyBTRUNUSU9OO1xuICAgIHZhciBTRUNUSU9OX0FDVElWRV9TRUwgPSBTRUNUSU9OX1NFTCArIEFDVElWRV9TRUw7XG4gICAgdmFyIFRBQkxFX0NFTEwgPSAnZnAtdGFibGVDZWxsJztcbiAgICB2YXIgVEFCTEVfQ0VMTF9TRUwgPSAnLicgKyBUQUJMRV9DRUxMO1xuICAgIHZhciBBVVRPX0hFSUdIVCA9ICdmcC1hdXRvLWhlaWdodCc7XG4gICAgdmFyIEFVVE9fSEVJR0hUX1NFTCA9ICcuJyArIEFVVE9fSEVJR0hUO1xuICAgIHZhciBBVVRPX0hFSUdIVF9SRVNQT05TSVZFID0gJ2ZwLWF1dG8taGVpZ2h0LXJlc3BvbnNpdmUnO1xuICAgIHZhciBBVVRPX0hFSUdIVF9SRVNQT05TSVZFX1NFTCA9ICcuJyArIEFVVE9fSEVJR0hUX1JFU1BPTlNJVkU7XG4gICAgdmFyIE5PUk1BTF9TQ1JPTEwgPSAnZnAtbm9ybWFsLXNjcm9sbCc7XG5cbiAgICB2YXIgU0VDVElPTl9OQVYgPSAnZnAtbmF2JztcbiAgICB2YXIgU0VDVElPTl9OQVZfU0VMID0gJyMnICsgU0VDVElPTl9OQVY7XG4gICAgdmFyIFNFQ1RJT05fTkFWX1RPT0xUSVAgPSAnZnAtdG9vbHRpcCc7XG4gICAgdmFyIFNFQ1RJT05fTkFWX1RPT0xUSVBfU0VMID0gJy4nICsgU0VDVElPTl9OQVZfVE9PTFRJUDtcbiAgICB2YXIgU0hPV19BQ1RJVkVfVE9PTFRJUCA9ICdmcC1zaG93LWFjdGl2ZSc7IC8vIHNsaWRlXG5cbiAgICB2YXIgU0xJREVfREVGQVVMVF9TRUwgPSAnLnNsaWRlJztcbiAgICB2YXIgU0xJREUgPSAnZnAtc2xpZGUnO1xuICAgIHZhciBTTElERV9TRUwgPSAnLicgKyBTTElERTtcbiAgICB2YXIgU0xJREVfQUNUSVZFX1NFTCA9IFNMSURFX1NFTCArIEFDVElWRV9TRUw7XG4gICAgdmFyIFNMSURFU19XUkFQUEVSID0gJ2ZwLXNsaWRlcyc7XG4gICAgdmFyIFNMSURFU19XUkFQUEVSX1NFTCA9ICcuJyArIFNMSURFU19XUkFQUEVSO1xuICAgIHZhciBTTElERVNfQ09OVEFJTkVSID0gJ2ZwLXNsaWRlc0NvbnRhaW5lcic7XG4gICAgdmFyIFNMSURFU19DT05UQUlORVJfU0VMID0gJy4nICsgU0xJREVTX0NPTlRBSU5FUjtcbiAgICB2YXIgVEFCTEUgPSAnZnAtdGFibGUnO1xuICAgIHZhciBPVkVSRkxPVyA9ICdmcC1vdmVyZmxvdyc7XG4gICAgdmFyIE9WRVJGTE9XX1NFTCA9ICcuJyArIE9WRVJGTE9XO1xuICAgIHZhciBJU19PVkVSRkxPVyA9ICdmcC1pcy1vdmVyZmxvdyc7IC8vIHNsaWRlIG5hdlxuXG4gICAgdmFyIFNMSURFU19OQVYgPSAnZnAtc2xpZGVzTmF2JztcbiAgICB2YXIgU0xJREVTX05BVl9TRUwgPSAnLicgKyBTTElERVNfTkFWO1xuICAgIHZhciBTTElERVNfTkFWX0xJTktfU0VMID0gU0xJREVTX05BVl9TRUwgKyAnIGEnO1xuICAgIHZhciBTTElERVNfU1RZTEVEX0FSUk9XID0gJ2ZwLWFycm93JztcbiAgICB2YXIgU0xJREVTX0FSUk9XID0gJ2ZwLWNvbnRyb2xBcnJvdyc7XG4gICAgdmFyIFNMSURFU19BUlJPV19TRUwgPSAnLicgKyBTTElERVNfQVJST1c7XG4gICAgdmFyIFNMSURFU19QUkVWID0gJ2ZwLXByZXYnO1xuICAgIHZhciBTTElERVNfUFJFVl9TRUwgPSAnLicgKyBTTElERVNfUFJFVjtcbiAgICB2YXIgU0xJREVTX0FSUk9XX1BSRVZfU0VMID0gU0xJREVTX0FSUk9XX1NFTCArIFNMSURFU19QUkVWX1NFTDtcbiAgICB2YXIgU0xJREVTX05FWFQgPSAnZnAtbmV4dCc7XG4gICAgdmFyIFNMSURFU19ORVhUX1NFTCA9ICcuJyArIFNMSURFU19ORVhUO1xuICAgIHZhciBTTElERVNfQVJST1dfTkVYVF9TRUwgPSBTTElERVNfQVJST1dfU0VMICsgU0xJREVTX05FWFRfU0VMO1xuXG4gICAgdmFyIGRlZmF1bHRPcHRpb25zID0ge1xuICAgICAgLy9uYXZpZ2F0aW9uXG4gICAgICBtZW51OiBmYWxzZSxcbiAgICAgIGFuY2hvcnM6IFtdLFxuICAgICAgbG9ja0FuY2hvcnM6IGZhbHNlLFxuICAgICAgbmF2aWdhdGlvbjogZmFsc2UsXG4gICAgICBuYXZpZ2F0aW9uUG9zaXRpb246ICdyaWdodCcsXG4gICAgICBuYXZpZ2F0aW9uVG9vbHRpcHM6IFtdLFxuICAgICAgc2hvd0FjdGl2ZVRvb2x0aXA6IGZhbHNlLFxuICAgICAgc2xpZGVzTmF2aWdhdGlvbjogZmFsc2UsXG4gICAgICBzbGlkZXNOYXZQb3NpdGlvbjogJ2JvdHRvbScsXG4gICAgICBzY3JvbGxCYXI6IGZhbHNlLFxuICAgICAgaHlicmlkOiBmYWxzZSxcbiAgICAgIGxpY2Vuc2VLZXk6ICcnLFxuICAgICAgY3JlZGl0czoge1xuICAgICAgICBcImVuYWJsZWRcIjogdHJ1ZSxcbiAgICAgICAgXCJsYWJlbFwiOiAnTWFkZSB3aXRoIGZ1bGxQYWdlLmpzJyxcbiAgICAgICAgXCJwb3NpdGlvblwiOiAncmlnaHQnXG4gICAgICB9LFxuICAgICAgLy9zY3JvbGxpbmdcbiAgICAgIGNzczM6IHRydWUsXG4gICAgICBzY3JvbGxpbmdTcGVlZDogNzAwLFxuICAgICAgYXV0b1Njcm9sbGluZzogdHJ1ZSxcbiAgICAgIGZpdFRvU2VjdGlvbjogdHJ1ZSxcbiAgICAgIGZpdFRvU2VjdGlvbkRlbGF5OiA2MDAsXG4gICAgICBlYXNpbmc6ICdlYXNlSW5PdXRDdWJpYycsXG4gICAgICBlYXNpbmdjc3MzOiAnZWFzZScsXG4gICAgICBsb29wQm90dG9tOiBmYWxzZSxcbiAgICAgIGxvb3BUb3A6IGZhbHNlLFxuICAgICAgbG9vcEhvcml6b250YWw6IHRydWUsXG4gICAgICBjb250aW51b3VzVmVydGljYWw6IGZhbHNlLFxuICAgICAgY29udGludW91c0hvcml6b250YWw6IGZhbHNlLFxuICAgICAgc2Nyb2xsSG9yaXpvbnRhbGx5OiBmYWxzZSxcbiAgICAgIGludGVybG9ja2VkU2xpZGVzOiBmYWxzZSxcbiAgICAgIGRyYWdBbmRNb3ZlOiBmYWxzZSxcbiAgICAgIG9mZnNldFNlY3Rpb25zOiBmYWxzZSxcbiAgICAgIHJlc2V0U2xpZGVyczogZmFsc2UsXG4gICAgICBmYWRpbmdFZmZlY3Q6IGZhbHNlLFxuICAgICAgbm9ybWFsU2Nyb2xsRWxlbWVudHM6IG51bGwsXG4gICAgICBzY3JvbGxPdmVyZmxvdzogdHJ1ZSxcbiAgICAgIHNjcm9sbE92ZXJmbG93UmVzZXQ6IGZhbHNlLFxuICAgICAgdG91Y2hTZW5zaXRpdml0eTogNSxcbiAgICAgIHRvdWNoV3JhcHBlcjogbnVsbCxcbiAgICAgIGJpZ1NlY3Rpb25zRGVzdGluYXRpb246IG51bGwsXG4gICAgICAvL0FjY2Vzc2liaWxpdHlcbiAgICAgIGtleWJvYXJkU2Nyb2xsaW5nOiB0cnVlLFxuICAgICAgYW5pbWF0ZUFuY2hvcjogdHJ1ZSxcbiAgICAgIHJlY29yZEhpc3Rvcnk6IHRydWUsXG4gICAgICBhbGxvd0NvcnJlY3REaXJlY3Rpb246IGZhbHNlLFxuICAgICAgLy9kZXNpZ25cbiAgICAgIHNjcm9sbE92ZXJmbG93TWFjU3R5bGU6IHRydWUsXG4gICAgICBjb250cm9sQXJyb3dzOiB0cnVlLFxuICAgICAgY29udHJvbEFycm93c0hUTUw6IFsnPGRpdiBjbGFzcz1cIicgKyBTTElERVNfU1RZTEVEX0FSUk9XICsgJ1wiPjwvZGl2PicsICc8ZGl2IGNsYXNzPVwiJyArIFNMSURFU19TVFlMRURfQVJST1cgKyAnXCI+PC9kaXY+J10sXG4gICAgICBjb250cm9sQXJyb3dDb2xvcjogJyNmZmYnLFxuICAgICAgdmVydGljYWxDZW50ZXJlZDogdHJ1ZSxcbiAgICAgIHNlY3Rpb25zQ29sb3I6IFtdLFxuICAgICAgcGFkZGluZ1RvcDogMCxcbiAgICAgIHBhZGRpbmdCb3R0b206IDAsXG4gICAgICBmaXhlZEVsZW1lbnRzOiBudWxsLFxuICAgICAgcmVzcG9uc2l2ZTogMCxcbiAgICAgIC8vYmFja3dhcmRzIGNvbXBhYml0aWxpdHkgd2l0aCByZXNwb25zaXZlV2lkZHRoXG4gICAgICByZXNwb25zaXZlV2lkdGg6IDAsXG4gICAgICByZXNwb25zaXZlSGVpZ2h0OiAwLFxuICAgICAgcmVzcG9uc2l2ZVNsaWRlczogZmFsc2UsXG4gICAgICBwYXJhbGxheDogZmFsc2UsXG4gICAgICBwYXJhbGxheE9wdGlvbnM6IHtcbiAgICAgICAgdHlwZTogJ3JldmVhbCcsXG4gICAgICAgIHBlcmNlbnRhZ2U6IDYyLFxuICAgICAgICBwcm9wZXJ0eTogJ3RyYW5zbGF0ZSdcbiAgICAgIH0sXG4gICAgICBjYXJkczogZmFsc2UsXG4gICAgICBjYXJkc09wdGlvbnM6IHtcbiAgICAgICAgcGVyc3BlY3RpdmU6IDEwMCxcbiAgICAgICAgZmFkZUNvbnRlbnQ6IHRydWUsXG4gICAgICAgIGZhZGVCYWNrZ3JvdW5kOiB0cnVlXG4gICAgICB9LFxuICAgICAgLy9DdXN0b20gc2VsZWN0b3JzXG4gICAgICBzZWN0aW9uU2VsZWN0b3I6IFNFQ1RJT05fREVGQVVMVF9TRUwsXG4gICAgICBzbGlkZVNlbGVjdG9yOiBTTElERV9ERUZBVUxUX1NFTCxcbiAgICAgIC8vZXZlbnRzXG4gICAgICBhZnRlckxvYWQ6IG51bGwsXG4gICAgICBiZWZvcmVMZWF2ZTogbnVsbCxcbiAgICAgIG9uTGVhdmU6IG51bGwsXG4gICAgICBhZnRlclJlbmRlcjogbnVsbCxcbiAgICAgIGFmdGVyUmVzaXplOiBudWxsLFxuICAgICAgYWZ0ZXJSZUJ1aWxkOiBudWxsLFxuICAgICAgYWZ0ZXJTbGlkZUxvYWQ6IG51bGwsXG4gICAgICBvblNsaWRlTGVhdmU6IG51bGwsXG4gICAgICBhZnRlclJlc3BvbnNpdmU6IG51bGwsXG4gICAgICBvblNjcm9sbE92ZXJmbG93OiBudWxsLFxuICAgICAgbGF6eUxvYWRpbmc6IHRydWUsXG4gICAgICBvYnNlcnZlcjogdHJ1ZVxuICAgIH07XG5cbiAgICB2YXIgY29udGFpbmVyID0gbnVsbDtcbiAgICB2YXIgZ19pbml0aWFsQW5jaG9yc0luRG9tID0gZmFsc2U7XG4gICAgdmFyIG9yaWdpbmFscyA9IGRlZXBFeHRlbmQoe30sIGRlZmF1bHRPcHRpb25zKTsgLy9kZWVwIGNvcHlcblxuICAgIHZhciBnX29wdGlvbnMgPSBudWxsO1xuICAgIGZ1bmN0aW9uIGdldEluaXRpYWxBbmNob3JzSW5Eb20oKSB7XG4gICAgICByZXR1cm4gZ19pbml0aWFsQW5jaG9yc0luRG9tO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzZXRDb250YWluZXIodmFsdWUpIHtcbiAgICAgIGNvbnRhaW5lciA9IHZhbHVlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRDb250YWluZXIodmFsdWUpIHtcbiAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldE9wdGlvbnMoKSB7XG4gICAgICByZXR1cm4gZ19vcHRpb25zIHx8IGRlZmF1bHRPcHRpb25zO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgIGdfb3B0aW9ucyA9IGRlZXBFeHRlbmQoe30sIGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcbiAgICAgIG9yaWdpbmFscyA9IE9iamVjdC5hc3NpZ24oe30sIGdfb3B0aW9ucyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldE9yaWdpbmFscygpIHtcbiAgICAgIHJldHVybiBvcmlnaW5hbHM7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNldE9wdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgICAgZGVmYXVsdE9wdGlvbnNbbmFtZV0gPSB2YWx1ZTtcbiAgICB9XG4gICAgLypcbiAgICAqIFNldHMgdGhlIHN0YXRlIGZvciBhIHZhcmlhYmxlIHdpdGggbXVsdGlwbGUgc3RhdGVzIChvcmlnaW5hbCwgYW5kIHRlbXBvcmFsKVxuICAgICogU29tZSB2YXJpYWJsZXMgc3VjaCBhcyBgYXV0b1Njcm9sbGluZ2Agb3IgYHJlY29yZEhpc3RvcnlgIG1pZ2h0IGNoYW5nZSBhdXRvbWF0aWNhbGx5IGl0cyBzdGF0ZSB3aGVuIHVzaW5nIGByZXNwb25zaXZlYCBvciBgYXV0b1Njcm9sbGluZzpmYWxzZWAuXG4gICAgKiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8ga2VlcCB0cmFjayBvZiBib3RoIHN0YXRlcywgdGhlIG9yaWdpbmFsIGFuZCB0aGUgdGVtcG9yYWwgb25lLlxuICAgICogSWYgdHlwZSBpcyBub3QgJ2ludGVybmFsJywgdGhlbiB3ZSBhc3N1bWUgdGhlIHVzZXIgaXMgZ2xvYmFsbHkgY2hhbmdpbmcgdGhlIHZhcmlhYmxlLlxuICAgICovXG5cbiAgICBmdW5jdGlvbiBzZXRWYXJpYWJsZVN0YXRlKHZhcmlhYmxlLCB2YWx1ZSwgdHlwZSkge1xuICAgICAgZ19vcHRpb25zW3ZhcmlhYmxlXSA9IHZhbHVlO1xuXG4gICAgICBpZiAodHlwZSAhPT0gJ2ludGVybmFsJykge1xuICAgICAgICBvcmlnaW5hbHNbdmFyaWFibGVdID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICogU2V0dGluZyBvcHRpb25zIGZyb20gRE9NIGVsZW1lbnRzIGlmIHRoZXkgYXJlIG5vdCBwcm92aWRlZC5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gc2V0T3B0aW9uc0Zyb21ET00oKSB7XG4gICAgICAvL25vIGFuY2hvcnMgb3B0aW9uPyBDaGVja2luZyBmb3IgdGhlbSBpbiB0aGUgRE9NIGF0dHJpYnV0ZXNcbiAgICAgIGlmICghZ2V0T3B0aW9ucygpLmFuY2hvcnMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBhbmNob3JzQXR0cmlidXRlID0gJ1tkYXRhLWFuY2hvcl0nO1xuICAgICAgICB2YXIgYW5jaG9ycyA9ICQoZ2V0T3B0aW9ucygpLnNlY3Rpb25TZWxlY3Rvci5zcGxpdCgnLCcpLmpvaW4oYW5jaG9yc0F0dHJpYnV0ZSArICcsJykgKyBhbmNob3JzQXR0cmlidXRlLCBjb250YWluZXIpO1xuXG4gICAgICAgIGlmIChhbmNob3JzLmxlbmd0aCAmJiBhbmNob3JzLmxlbmd0aCA9PT0gJChnZXRPcHRpb25zKCkuc2VjdGlvblNlbGVjdG9yLCBjb250YWluZXIpLmxlbmd0aCkge1xuICAgICAgICAgIGdfaW5pdGlhbEFuY2hvcnNJbkRvbSA9IHRydWU7XG4gICAgICAgICAgYW5jaG9ycy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICBnZXRPcHRpb25zKCkuYW5jaG9ycy5wdXNoKGdldEF0dHIoaXRlbSwgJ2RhdGEtYW5jaG9yJykudG9TdHJpbmcoKSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gLy9ubyB0b29sdGlwcyBvcHRpb24/IENoZWNraW5nIGZvciB0aGVtIGluIHRoZSBET00gYXR0cmlidXRlc1xuXG5cbiAgICAgIGlmICghZ2V0T3B0aW9ucygpLm5hdmlnYXRpb25Ub29sdGlwcy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIHRvb2x0aXBzQXR0cmlidXRlID0gJ1tkYXRhLXRvb2x0aXBdJztcbiAgICAgICAgdmFyIHRvb2x0aXBzID0gJChnZXRPcHRpb25zKCkuc2VjdGlvblNlbGVjdG9yLnNwbGl0KCcsJykuam9pbih0b29sdGlwc0F0dHJpYnV0ZSArICcsJykgKyB0b29sdGlwc0F0dHJpYnV0ZSwgY29udGFpbmVyKTtcblxuICAgICAgICBpZiAodG9vbHRpcHMubGVuZ3RoKSB7XG4gICAgICAgICAgdG9vbHRpcHMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgZ2V0T3B0aW9ucygpLm5hdmlnYXRpb25Ub29sdGlwcy5wdXNoKGdldEF0dHIoaXRlbSwgJ2RhdGEtdG9vbHRpcCcpLnRvU3RyaW5nKCkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHBsYWluSXRlbSA9IGZ1bmN0aW9uIHBsYWluSXRlbShwYW5lbCkge1xuICAgICAgdGhpcy5hbmNob3IgPSBwYW5lbC5hbmNob3I7XG4gICAgICB0aGlzLml0ZW0gPSBwYW5lbC5pdGVtO1xuICAgICAgdGhpcy5pbmRleCA9IHBhbmVsLmluZGV4KCk7XG4gICAgICB0aGlzLmlzTGFzdCA9IHRoaXMuaW5kZXggPT09IHBhbmVsLml0ZW0ucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHBhbmVsLnNlbGVjdG9yKS5sZW5ndGggLSAxO1xuICAgICAgdGhpcy5pc0ZpcnN0ID0gIXRoaXMuaW5kZXg7XG4gICAgICB0aGlzLmlzQWN0aXZlID0gcGFuZWwuaXNBY3RpdmU7XG4gICAgfTtcbiAgICAvKipcbiAgICAqIEl0ZW0uIFNsaWRlIG9yIFNlY3Rpb24gb2JqZWN0cyBzaGFyZSB0aGUgc2FtZSBwcm9wZXJ0aWVzLlxuICAgICovXG5cbiAgICB2YXIgSXRlbSA9IGZ1bmN0aW9uIEl0ZW0oZWwsIHNlbGVjdG9yKSB7XG4gICAgICB0aGlzLnBhcmVudCA9IHRoaXMucGFyZW50IHx8IG51bGw7XG4gICAgICB0aGlzLnNlbGVjdG9yID0gc2VsZWN0b3I7XG4gICAgICB0aGlzLmFuY2hvciA9IGdldEF0dHIoZWwsICdkYXRhLWFuY2hvcicpIHx8IGdldE9wdGlvbnMoKS5hbmNob3JzW2luZGV4KGVsLCBnZXRPcHRpb25zKCkuc2VjdGlvblNlbGVjdG9yKV07XG4gICAgICB0aGlzLml0ZW0gPSBlbDtcbiAgICAgIHRoaXMuaXNWaXNpYmxlID0gaXNWaXNpYmxlKGVsKTtcbiAgICAgIHRoaXMuaXNBY3RpdmUgPSBoYXNDbGFzcyhlbCwgQUNUSVZFKTtcbiAgICAgIHRoaXMuaGFzU2Nyb2xsID0gaGFzQ2xhc3MoZWwsIE9WRVJGTE9XKSB8fCAkKE9WRVJGTE9XX1NFTCwgZWwpWzBdICE9IG51bGw7XG4gICAgICB0aGlzLmlzU2VjdGlvbiA9IHNlbGVjdG9yID09PSBnZXRPcHRpb25zKCkuc2VjdGlvblNlbGVjdG9yO1xuICAgICAgdGhpcy5jb250YWluZXIgPSBjbG9zZXN0KGVsLCBTTElERVNfQ09OVEFJTkVSX1NFTCkgfHwgY2xvc2VzdChlbCwgV1JBUFBFUl9TRUwpO1xuXG4gICAgICB0aGlzLmluZGV4ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zaWJsaW5ncygpLmluZGV4T2YodGhpcyk7XG4gICAgICB9O1xuICAgIH07XG5cbiAgICBJdGVtLnByb3RvdHlwZS5zaWJsaW5ncyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLmlzU2VjdGlvbikge1xuICAgICAgICBpZiAodGhpcy5pc1Zpc2libGUpIHtcbiAgICAgICAgICByZXR1cm4gc3RhdGUuc2VjdGlvbnM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHN0YXRlLnNlY3Rpb25zSW5jbHVkaW5nSGlkZGVuO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnBhcmVudCA/IHRoaXMucGFyZW50LnNsaWRlcyA6IDA7XG4gICAgfTtcblxuICAgIEl0ZW0ucHJvdG90eXBlLnByZXYgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgc2libGluZ3MgPSB0aGlzLnNpYmxpbmdzKCk7XG4gICAgICB2YXIgY3VycmVudEluZGV4ID0gdGhpcy5pc1NlY3Rpb24gPyBzaWJsaW5ncy5pbmRleE9mKHRoaXMpIDogdGhpcy5wYXJlbnQuc2xpZGVzLmluZGV4T2YodGhpcyk7XG4gICAgICB2YXIgcHJldkluZGV4ID0gY3VycmVudEluZGV4IC0gMTtcblxuICAgICAgaWYgKHByZXZJbmRleCA+PSAwKSB7XG4gICAgICAgIHJldHVybiBzaWJsaW5nc1twcmV2SW5kZXhdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuXG4gICAgSXRlbS5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBzaWJsaW5ncyA9IHRoaXMuc2libGluZ3MoKTtcbiAgICAgIHZhciBjdXJyZW50SW5kZXggPSB0aGlzLmlzU2VjdGlvbiA/IHNpYmxpbmdzLmluZGV4T2YodGhpcykgOiB0aGlzLnBhcmVudC5zbGlkZXMuaW5kZXhPZih0aGlzKTtcbiAgICAgIHZhciBuZXh0SW5kZXggPSBjdXJyZW50SW5kZXggKyAxO1xuXG4gICAgICBpZiAobmV4dEluZGV4IDwgc2libGluZ3MubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBzaWJsaW5nc1tuZXh0SW5kZXhdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuXG4gICAgSXRlbS5wcm90b3R5cGVbXCJwcmV2UGFuZWxcIl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcmV2KCkgfHwgKHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQucHJldigpIDogbnVsbCk7XG4gICAgfTtcblxuICAgIEl0ZW0ucHJvdG90eXBlW1wibmV4dFBhbmVsXCJdID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMubmV4dCgpIHx8ICh0aGlzLnBhcmVudCA/IHRoaXMucGFyZW50Lm5leHQoKSA6IG51bGwpO1xuICAgIH07XG5cbiAgICBJdGVtLnByb3RvdHlwZS5nZXRTaWJsaW5ncyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLmlzU2VjdGlvbikge1xuICAgICAgICByZXR1cm4gc3RhdGUuc2VjdGlvbnM7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzdGF0ZS5wYW5lbHM7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGdldE5vZGVzKHBhbmVscykge1xuICAgICAgcmV0dXJuIHBhbmVscy5tYXAoZnVuY3Rpb24gKHBhbmVsKSB7XG4gICAgICAgIHJldHVybiBwYW5lbC5pdGVtO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldFBhbmVsQnlFbGVtZW50KHBhbmVscywgZWwpIHtcbiAgICAgIHJldHVybiBwYW5lbHMuZmluZChmdW5jdGlvbiAocGFuZWwpIHtcbiAgICAgICAgcmV0dXJuIHBhbmVsLml0ZW0gPT09IGVsO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHZhciBTZWN0aW9uID0gZnVuY3Rpb24gU2VjdGlvbihlbCkge1xuICAgICAgcGxhaW5JdGVtLmNhbGwodGhpcywgZWwpO1xuICAgIH07XG4gICAgdmFyIFNsaWRlID0gZnVuY3Rpb24gU2xpZGUoZWwpIHtcbiAgICAgIHBsYWluSXRlbS5jYWxsKHRoaXMsIGVsKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgKiBHZXRzIHRoZSBhY3RpdmUgc2xpZGUgKG9yIHNlY3Rpb24pIGZvciB0aGUgZ2l2ZW4gc2VjdGlvblxuICAgICovXG5cbiAgICBmdW5jdGlvbiBnZXRTbGlkZU9yU2VjdGlvbihkZXN0aW55KSB7XG4gICAgICB2YXIgc2xpZGUgPSAkKFNMSURFX0FDVElWRV9TRUwsIGRlc3RpbnkpO1xuXG4gICAgICBpZiAoc2xpZGUubGVuZ3RoKSB7XG4gICAgICAgIGRlc3RpbnkgPSBzbGlkZVswXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRlc3Rpbnk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldFNsaWRlT3JTZWN0aW9uUGFuZWwocGFuZWwpIHtcbiAgICAgIGlmICghcGFuZWwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwYW5lbC5hY3RpdmVTbGlkZSA/IHBhbmVsLmFjdGl2ZVNsaWRlIDogcGFuZWw7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzRnVsbFBhZ2VBYm92ZSgpIHtcbiAgICAgIHJldHVybiBnZXRDb250YWluZXIoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5ib3R0b20gPj0gMDtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBHZXRzIHRoZSBzY3JvbGxpbmcgc2V0dGluZ3MgZGVwZW5kaW5nIG9uIHRoZSBwbHVnaW4gYXV0b1Njcm9sbGluZyBvcHRpb25cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gZ2V0U2Nyb2xsU2V0dGluZ3ModG9wKSB7XG4gICAgICB2YXIgb3B0aW9ucyA9IGdldE9wdGlvbnMoKTtcbiAgICAgIHZhciBwb3NpdGlvbjtcbiAgICAgIHZhciBlbGVtZW50OyAvL3RvcCBwcm9wZXJ0eSBhbmltYXRpb25cblxuICAgICAgaWYgKG9wdGlvbnMuYXV0b1Njcm9sbGluZyAmJiAhb3B0aW9ucy5zY3JvbGxCYXIpIHtcbiAgICAgICAgcG9zaXRpb24gPSAtdG9wO1xuICAgICAgICBlbGVtZW50ID0gJChXUkFQUEVSX1NFTClbMF07XG4gICAgICB9IC8vd2luZG93IHJlYWwgc2Nyb2xsaW5nXG4gICAgICBlbHNlIHtcbiAgICAgICAgcG9zaXRpb24gPSB0b3A7XG4gICAgICAgIGVsZW1lbnQgPSB3aW5kb3c7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIG9wdGlvbnM6IHBvc2l0aW9uLFxuICAgICAgICBlbGVtZW50OiBlbGVtZW50XG4gICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAqIFNjcm9sbHMgdGhlIHBhZ2UgLyBzbGlkZXIgdGhlIGdpdmVuIG51bWJlciBvZiBwaXhlbHMuXG4gICAgKiBJdCB3aWxsIGRvIGl0IG9uZSBvciBhbm90aGVyIHdheSBkZXBlbmRpb25nIG9uIHRoZSBsaWJyYXJ5J3MgY29uZmlnLlxuICAgICovXG5cbiAgICBmdW5jdGlvbiBzZXRTY3JvbGxpbmcoZWxlbWVudCwgdmFsKSB7XG4gICAgICBpZiAoIWdldE9wdGlvbnMoKS5hdXRvU2Nyb2xsaW5nIHx8IGdldE9wdGlvbnMoKS5zY3JvbGxCYXIgfHwgZWxlbWVudC5zZWxmICE9IHdpbmRvdyAmJiBoYXNDbGFzcyhlbGVtZW50LCBTTElERVNfV1JBUFBFUikpIHtcbiAgICAgICAgLy9zY3JvbGxpbmcgaG9yaXpvbnRhbGx5IHRocm91Z2ggdGhlIHNsaWRlcz9cbiAgICAgICAgaWYgKGVsZW1lbnQuc2VsZiAhPSB3aW5kb3cgJiYgaGFzQ2xhc3MoZWxlbWVudCwgU0xJREVTX1dSQVBQRVIpKSB7XG4gICAgICAgICAgZWxlbWVudC5zY3JvbGxMZWZ0ID0gdmFsO1xuICAgICAgICB9IC8vdmVydGljYWwgc2Nyb2xsXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGVsZW1lbnQuc2Nyb2xsVG8oMCwgdmFsKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS50b3AgPSB2YWwgKyAncHgnO1xuICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAqIEFkZHMgdHJhbnNpdGlvbiBhbmltYXRpb25zIGZvciB0aGUgZ2l2ZW4gZWxlbWVudFxuICAgICovXG5cbiAgICBmdW5jdGlvbiBhZGRBbmltYXRpb24oZWxlbWVudCkge1xuICAgICAgdmFyIHRyYW5zaXRpb24gPSAndHJhbnNmb3JtICcgKyBnZXRPcHRpb25zKCkuc2Nyb2xsaW5nU3BlZWQgKyAnbXMgJyArIGdldE9wdGlvbnMoKS5lYXNpbmdjc3MzO1xuICAgICAgcmVtb3ZlQ2xhc3MoZWxlbWVudCwgTk9fVFJBTlNJVElPTik7XG4gICAgICByZXR1cm4gY3NzKGVsZW1lbnQsIHtcbiAgICAgICAgJy13ZWJraXQtdHJhbnNpdGlvbic6IHRyYW5zaXRpb24sXG4gICAgICAgICd0cmFuc2l0aW9uJzogdHJhbnNpdGlvblxuICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICogUmV0dW5zIGB1cGAgb3IgYGRvd25gIGRlcGVuZGluZyBvbiB0aGUgc2Nyb2xsaW5nIG1vdmVtZW50IHRvIHJlYWNoIGl0cyBkZXN0aW5hdGlvblxuICAgICogZnJvbSB0aGUgY3VycmVudCBzZWN0aW9uLlxuICAgICovXG5cbiAgICBmdW5jdGlvbiBnZXRZbW92ZW1lbnQoYWN0aXZlU2VjdGlvbiwgZGVzdGlueSkge1xuICAgICAgdmFyIGZyb21JbmRleCA9IGFjdGl2ZVNlY3Rpb24uaW5kZXgoKTtcbiAgICAgIHZhciB0b0luZGV4ID0gaW5kZXgoZGVzdGlueSwgU0VDVElPTl9TRUwpO1xuXG4gICAgICBpZiAoZnJvbUluZGV4ID09IHRvSW5kZXgpIHtcbiAgICAgICAgcmV0dXJuICdub25lJztcbiAgICAgIH1cblxuICAgICAgaWYgKGZyb21JbmRleCA+IHRvSW5kZXgpIHtcbiAgICAgICAgcmV0dXJuICd1cCc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAnZG93bic7XG4gICAgfVxuICAgIC8qKlxuICAgICogUmVtb3ZlIHRyYW5zaXRpb24gYW5pbWF0aW9ucyBmb3IgdGhlIGdpdmVuIGVsZW1lbnRcbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gcmVtb3ZlQW5pbWF0aW9uKGVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBhZGRDbGFzcyhlbGVtZW50LCBOT19UUkFOU0lUSU9OKTtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBSZXR1cm5zIHRoZSBjcm9zcy1icm93c2VyIHRyYW5zZm9ybSBzdHJpbmcuXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIGdldFRyYW5zZm9ybXModHJhbnNsYXRlM2QpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICctd2Via2l0LXRyYW5zZm9ybSc6IHRyYW5zbGF0ZTNkLFxuICAgICAgICAnLW1vei10cmFuc2Zvcm0nOiB0cmFuc2xhdGUzZCxcbiAgICAgICAgJy1tcy10cmFuc2Zvcm0nOiB0cmFuc2xhdGUzZCxcbiAgICAgICAgJ3RyYW5zZm9ybSc6IHRyYW5zbGF0ZTNkXG4gICAgICB9O1xuICAgIH1cblxuICAgIHZhciBzaWxlbnRTY3JvbGxJZDtcbiAgICAvKipcbiAgICAqIEFkZHMgYSBjc3MzIHRyYW5zZm9ybSBwcm9wZXJ0eSB0byB0aGUgY29udGFpbmVyIGNsYXNzIHdpdGggb3Igd2l0aG91dCBhbmltYXRpb24gZGVwZW5kaW5nIG9uIHRoZSBhbmltYXRlZCBwYXJhbS5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gdHJhbnNmb3JtQ29udGFpbmVyKHRyYW5zbGF0ZTNkLCBhbmltYXRlZCkge1xuICAgICAgaWYgKGFuaW1hdGVkKSB7XG4gICAgICAgIGFkZEFuaW1hdGlvbihnZXRDb250YWluZXIoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZW1vdmVBbmltYXRpb24oZ2V0Q29udGFpbmVyKCkpO1xuICAgICAgfVxuXG4gICAgICBjbGVhclRpbWVvdXQoc2lsZW50U2Nyb2xsSWQpO1xuICAgICAgY3NzKGdldENvbnRhaW5lcigpLCBnZXRUcmFuc2Zvcm1zKHRyYW5zbGF0ZTNkKSk7XG4gICAgICBGUC50ZXN0LnRyYW5zbGF0ZTNkID0gdHJhbnNsYXRlM2Q7IC8vc3luY3Jvbm91c2x5IHJlbW92aW5nIHRoZSBjbGFzcyBhZnRlciB0aGUgYW5pbWF0aW9uIGhhcyBiZWVuIGFwcGxpZWQuXG5cbiAgICAgIHNpbGVudFNjcm9sbElkID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJlbW92ZUNsYXNzKGdldENvbnRhaW5lcigpLCBOT19UUkFOU0lUSU9OKTtcbiAgICAgIH0sIDEwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIFNjcm9sbHMgc2lsZW50bHkgKHdpdGggbm8gYW5pbWF0aW9uKSB0aGUgcGFnZSB0byB0aGUgZ2l2ZW4gWSBwb3NpdGlvbi5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gc2lsZW50U2Nyb2xsKHRvcCkge1xuICAgICAgLy8gVGhlIGZpcnN0IHNlY3Rpb24gY2FuIGhhdmUgYSBuZWdhdGl2ZSB2YWx1ZSBpbiBpT1MgMTAuIE5vdCBxdWl0ZSBzdXJlIHdoeTogLTAuMDE0MjgyMjI2NTYyNVxuICAgICAgLy8gdGhhdCdzIHdoeSB3ZSByb3VuZCBpdCB0byAwLlxuICAgICAgdmFyIHJvdW5kZWRUb3AgPSBNYXRoLnJvdW5kKHRvcCk7XG5cbiAgICAgIGlmIChnZXRPcHRpb25zKCkuY3NzMyAmJiBnZXRPcHRpb25zKCkuYXV0b1Njcm9sbGluZyAmJiAhZ2V0T3B0aW9ucygpLnNjcm9sbEJhcikge1xuICAgICAgICB2YXIgdHJhbnNsYXRlM2QgPSAndHJhbnNsYXRlM2QoMHB4LCAtJyArIHJvdW5kZWRUb3AgKyAncHgsIDBweCknO1xuICAgICAgICB0cmFuc2Zvcm1Db250YWluZXIodHJhbnNsYXRlM2QsIGZhbHNlKTtcbiAgICAgIH0gZWxzZSBpZiAoZ2V0T3B0aW9ucygpLmF1dG9TY3JvbGxpbmcgJiYgIWdldE9wdGlvbnMoKS5zY3JvbGxCYXIpIHtcbiAgICAgICAgY3NzKGdldENvbnRhaW5lcigpLCB7XG4gICAgICAgICAgJ3RvcCc6IC1yb3VuZGVkVG9wICsgJ3B4J1xuICAgICAgICB9KTtcbiAgICAgICAgRlAudGVzdC50b3AgPSAtcm91bmRlZFRvcCArICdweCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgc2Nyb2xsU2V0dGluZ3MgPSBnZXRTY3JvbGxTZXR0aW5ncyhyb3VuZGVkVG9wKTtcbiAgICAgICAgc2V0U2Nyb2xsaW5nKHNjcm9sbFNldHRpbmdzLmVsZW1lbnQsIHNjcm9sbFNldHRpbmdzLm9wdGlvbnMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIEZQLnNldFNjcm9sbGluZ1NwZWVkID0gc2V0U2Nyb2xsaW5nU3BlZWQ7XG4gICAgLyoqXG4gICAgKiBEZWZpbmVzIHRoZSBzY3JvbGxpbmcgc3BlZWRcbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gc2V0U2Nyb2xsaW5nU3BlZWQodmFsdWUsIHR5cGUpIHtcbiAgICAgIHNldFZhcmlhYmxlU3RhdGUoJ3Njcm9sbGluZ1NwZWVkJywgdmFsdWUsIHR5cGUpO1xuICAgIH1cblxuICAgIHZhciAkYm9keSA9IG51bGw7XG4gICAgdmFyICRodG1sID0gbnVsbDtcbiAgICB2YXIgJGh0bWxCb2R5ID0gbnVsbDsgLy8gY2FjaGluZyBjb21tb24gZWxlbWVudHNcblxuICAgIGZ1bmN0aW9uIHNldENhY2hlKCkge1xuICAgICAgJGJvZHkgPSAkKCdib2R5JylbMF07XG4gICAgICAkaHRtbCA9ICQoJ2h0bWwnKVswXTtcbiAgICAgICRodG1sQm9keSA9ICQoJ2h0bWwsIGJvZHknKTtcbiAgICB9XG5cbiAgICAvL0B0cy1jaGVja1xuXG4gICAgdmFyIF9nX2FuaW1hdGVTY3JvbGw7XG4gICAgLyoqXG4gICAgKiBTaW11bGF0ZXMgdGhlIGFuaW1hdGVkIHNjcm9sbFRvcCBvZiBqUXVlcnkuIFVzZWQgd2hlbiBjc3MzOmZhbHNlIG9yIHNjcm9sbEJhcjp0cnVlIG9yIGF1dG9TY3JvbGxpbmc6ZmFsc2VcbiAgICAqIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzE2MTM2Nzg5LzEwODEzOTZcbiAgICAqL1xuXG5cbiAgICBmdW5jdGlvbiBzY3JvbGxUbyhlbGVtZW50LCB0bywgZHVyYXRpb24sIGNhbGxiYWNrKSB7XG4gICAgICB2YXIgc3RhcnQgPSBnZXRTY3JvbGxlZFBvc2l0aW9uKGVsZW1lbnQpO1xuICAgICAgdmFyIGNoYW5nZSA9IHRvIC0gc3RhcnQ7XG4gICAgICB2YXIgaXNDYWxsYmFja0ZpcmVkID0gZmFsc2U7XG4gICAgICB2YXIgc3RhcnRUaW1lO1xuICAgICAgdmFyIHdhc0FuaW1hdGlvbkFjdGl2ZSA9IHN0YXRlLmFjdGl2ZUFuaW1hdGlvbjtcbiAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgYWN0aXZlQW5pbWF0aW9uOiB0cnVlXG4gICAgICB9KTsgLy8gQ2FuY2VsbGluZyBhbnkgcG9zc2libGUgcHJldmlvdXMgYW5pbWF0aW9ucyAoaW86IGNsaWNraW5nIG9uIG5hdiBkb3RzIHZlcnkgZmFzdClcblxuICAgICAgaWYgKF9nX2FuaW1hdGVTY3JvbGwpIHtcbiAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKF9nX2FuaW1hdGVTY3JvbGwpO1xuICAgICAgfVxuXG4gICAgICBfZ19hbmltYXRlU2Nyb2xsID0gZnVuY3Rpb24gZ19hbmltYXRlU2Nyb2xsKHRpbWVzdGFtcCkge1xuICAgICAgICBpZiAoIXN0YXJ0VGltZSkge1xuICAgICAgICAgIHN0YXJ0VGltZSA9IHRpbWVzdGFtcDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjdXJyZW50VGltZSA9IE1hdGguZmxvb3IodGltZXN0YW1wIC0gc3RhcnRUaW1lKTtcblxuICAgICAgICBpZiAoc3RhdGUuYWN0aXZlQW5pbWF0aW9uKSB7XG4gICAgICAgICAgLy9pbiBvcmRlciB0byBzdG9wZSBpdCBmcm9tIG90aGVyIGZ1bmN0aW9uIHdoZW5ldmVyIHdlIHdhbnRcbiAgICAgICAgICB2YXIgdmFsID0gdG87XG5cbiAgICAgICAgICBpZiAoZHVyYXRpb24pIHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIHZhbCA9IHdpbi5mcF9lYXNpbmdzW2dldE9wdGlvbnMoKS5lYXNpbmddKGN1cnJlbnRUaW1lLCBzdGFydCwgY2hhbmdlLCBkdXJhdGlvbik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGN1cnJlbnRUaW1lIDw9IGR1cmF0aW9uKSB7XG4gICAgICAgICAgICBzZXRTY3JvbGxpbmcoZWxlbWVudCwgdmFsKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoY3VycmVudFRpbWUgPCBkdXJhdGlvbikge1xuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShfZ19hbmltYXRlU2Nyb2xsKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ3VuZGVmaW5lZCcgJiYgIWlzQ2FsbGJhY2tGaXJlZCkge1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICAgICAgYWN0aXZlQW5pbWF0aW9uOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpc0NhbGxiYWNrRmlyZWQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICghaXNDYWxsYmFja0ZpcmVkICYmICF3YXNBbmltYXRpb25BY3RpdmUpIHtcbiAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICAgIGFjdGl2ZUFuaW1hdGlvbjogZmFsc2VcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpc0NhbGxiYWNrRmlyZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKF9nX2FuaW1hdGVTY3JvbGwpO1xuICAgIH1cbiAgICAvKipcbiAgICAqIEdldHRpbmcgdGhlIHBvc2l0aW9uIG9mIHRoZSBlbGVtZW50IHRvIHNjcm9sbCB3aGVuIHVzaW5nIGpRdWVyeSBhbmltYXRpb25zXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIGdldFNjcm9sbGVkUG9zaXRpb24oZWxlbWVudCkge1xuICAgICAgdmFyIHBvc2l0aW9uOyAvL2lzIG5vdCB0aGUgd2luZG93IGVsZW1lbnQgYW5kIGlzIGEgc2xpZGU/XG5cbiAgICAgIGlmIChlbGVtZW50LnNlbGYgIT0gd2luICYmIGhhc0NsYXNzKGVsZW1lbnQsIFNMSURFU19XUkFQUEVSKSkge1xuICAgICAgICBwb3NpdGlvbiA9IGVsZW1lbnQuc2Nyb2xsTGVmdDtcbiAgICAgIH0gZWxzZSBpZiAoIWdldE9wdGlvbnMoKS5hdXRvU2Nyb2xsaW5nIHx8IGdldE9wdGlvbnMoKS5zY3JvbGxCYXIpIHtcbiAgICAgICAgcG9zaXRpb24gPSBnZXRTY3JvbGxUb3AoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBvc2l0aW9uID0gZWxlbWVudC5vZmZzZXRUb3A7XG4gICAgICB9IC8vZ2V0cyB0aGUgdG9wIHByb3BlcnR5IG9mIHRoZSB3cmFwcGVyXG5cblxuICAgICAgcmV0dXJuIHBvc2l0aW9uO1xuICAgIH1cblxuICAgIC8qKlxuICAgICogTWFrZXMgc3VyZSB0byBvbmx5IGNyZWF0ZSBhIFBhbmVsIG9iamVjdCBpZiB0aGUgZWxlbWVudCBleGlzdFxuICAgICovXG5cbiAgICBmdW5jdGlvbiBudWxsT3JTZWN0aW9uKGVsKSB7XG4gICAgICBpZiAoZWwgJiYgIWVsLml0ZW0pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZWN0aW9uKG5ldyBTZWN0aW9uUGFuZWwoZWwpKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGVsID8gbmV3IFNlY3Rpb24oZWwpIDogbnVsbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBudWxsT3JTbGlkZShlbCkge1xuICAgICAgcmV0dXJuIGVsID8gbmV3IFNsaWRlKGVsKSA6IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBEaXNwYXRjaCBldmVudHMgJiBjYWxsYmFja3NcbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gZmlyZUNhbGxiYWNrKGV2ZW50TmFtZSwgdikge1xuICAgICAgdmFyIGV2ZW50RGF0YSA9IGdldEV2ZW50RGF0YShldmVudE5hbWUsIHYpO1xuICAgICAgdHJpZ2dlcihnZXRDb250YWluZXIoKSwgZXZlbnROYW1lLCBldmVudERhdGEpO1xuXG4gICAgICBpZiAoZ2V0T3B0aW9ucygpW2V2ZW50TmFtZV0uYXBwbHkoZXZlbnREYXRhW09iamVjdC5rZXlzKGV2ZW50RGF0YSlbMF1dLCB0b0FycmF5KGV2ZW50RGF0YSkpID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAvKipcbiAgICAqIEdldHMgdGhlIGV2ZW50J3MgZGF0YSBmb3IgdGhlIGdpdmVuIGV2ZW50IG9uIHRoZSByaWdodCBmb3JtYXQuXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIGdldEV2ZW50RGF0YShldmVudE5hbWUsIHYpIHtcbiAgICAgIC8vdXNpbmcgZnVuY3Rpb25zIHRvIHJ1biBvbmx5IHRoZSBuZWNlc3NhcnkgYml0cyB3aXRoaW4gdGhlIG9iamVjdFxuICAgICAgdmFyIHBhcmFtc1BlckV2ZW50ID0ge1xuICAgICAgICBhZnRlclJlbmRlcjogZnVuY3Rpb24gYWZ0ZXJSZW5kZXIoKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNlY3Rpb246IG51bGxPclNlY3Rpb24oZ2V0U3RhdGUoKS5hY3RpdmVTZWN0aW9uKSxcbiAgICAgICAgICAgIHNsaWRlOiBudWxsT3JTbGlkZShnZXRTdGF0ZSgpLmFjdGl2ZVNlY3Rpb24uYWN0aXZlU2xpZGUpXG4gICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgb25MZWF2ZTogZnVuY3Rpb24gb25MZWF2ZSgpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb3JpZ2luOiBudWxsT3JTZWN0aW9uKHYuaXRlbXMub3JpZ2luKSxcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uOiBudWxsT3JTZWN0aW9uKHYuaXRlbXMuZGVzdGluYXRpb24pLFxuICAgICAgICAgICAgZGlyZWN0aW9uOiB2LmRpcmVjdGlvbixcbiAgICAgICAgICAgIHRyaWdnZXI6IGdldFN0YXRlKCkuc2Nyb2xsVHJpZ2dlclxuICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIGFmdGVyTG9hZDogZnVuY3Rpb24gYWZ0ZXJMb2FkKCkge1xuICAgICAgICAgIHJldHVybiBwYXJhbXNQZXJFdmVudC5vbkxlYXZlKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGFmdGVyU2xpZGVMb2FkOiBmdW5jdGlvbiBhZnRlclNsaWRlTG9hZCgpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2VjdGlvbjogbnVsbE9yU2VjdGlvbih2Lml0ZW1zLnNlY3Rpb24pLFxuICAgICAgICAgICAgb3JpZ2luOiBudWxsT3JTZWN0aW9uKHYuaXRlbXMub3JpZ2luKSxcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uOiBudWxsT3JTZWN0aW9uKHYuaXRlbXMuZGVzdGluYXRpb24pLFxuICAgICAgICAgICAgZGlyZWN0aW9uOiB2LmRpcmVjdGlvbixcbiAgICAgICAgICAgIHRyaWdnZXI6IGdldFN0YXRlKCkuc2Nyb2xsVHJpZ2dlclxuICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIG9uU2xpZGVMZWF2ZTogZnVuY3Rpb24gb25TbGlkZUxlYXZlKCkge1xuICAgICAgICAgIHJldHVybiBwYXJhbXNQZXJFdmVudC5hZnRlclNsaWRlTG9hZCgpO1xuICAgICAgICB9LFxuICAgICAgICBiZWZvcmVMZWF2ZTogZnVuY3Rpb24gYmVmb3JlTGVhdmUoKSB7XG4gICAgICAgICAgcmV0dXJuIHBhcmFtc1BlckV2ZW50Lm9uTGVhdmUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25TY3JvbGxPdmVyZmxvdzogZnVuY3Rpb24gb25TY3JvbGxPdmVyZmxvdygpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2VjdGlvbjogbnVsbE9yU2VjdGlvbihnZXRTdGF0ZSgpLmFjdGl2ZVNlY3Rpb24pLFxuICAgICAgICAgICAgc2xpZGU6IG51bGxPclNsaWRlKGdldFN0YXRlKCkuYWN0aXZlU2VjdGlvbi5hY3RpdmVTbGlkZSksXG4gICAgICAgICAgICBwb3NpdGlvbjogdi5wb3NpdGlvbixcbiAgICAgICAgICAgIGRpcmVjdGlvbjogdi5kaXJlY3Rpb25cbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHBhcmFtc1BlckV2ZW50W2V2ZW50TmFtZV0oKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIFBsYXlzIHZpZGVvIGFuZCBhdWRpbyBlbGVtZW50cy5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gcGxheU1lZGlhKGRlc3RpbnkpIHtcbiAgICAgIHZhciBwYW5lbCA9IGdldFNsaWRlT3JTZWN0aW9uKGRlc3RpbnkpOyAvL3BsYXlpbmcgSFRNTDUgbWVkaWEgZWxlbWVudHNcblxuICAgICAgJCgndmlkZW8sIGF1ZGlvJywgcGFuZWwpLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdkYXRhLWF1dG9wbGF5JykgJiYgdHlwZW9mIGVsZW1lbnQucGxheSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGVsZW1lbnQucGxheSgpO1xuICAgICAgICB9XG4gICAgICB9KTsgLy95b3V0dWJlIHZpZGVvc1xuXG4gICAgICAkKCdpZnJhbWVbc3JjKj1cInlvdXR1YmUuY29tL2VtYmVkL1wiXScsIHBhbmVsKS5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnZGF0YS1hdXRvcGxheScpKSB7XG4gICAgICAgICAgcGxheVlvdXR1YmUoZWxlbWVudCk7XG4gICAgICAgIH0gLy9pbiBjYXNlIHRoZSBVUkwgd2FzIG5vdCBsb2FkZWQgeWV0LiBPbiBwYWdlIGxvYWQgd2UgbmVlZCB0aW1lIGZvciB0aGUgbmV3IFVSTCAod2l0aCB0aGUgQVBJIHN0cmluZykgdG8gbG9hZC5cblxuXG4gICAgICAgIGVsZW1lbnQub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnZGF0YS1hdXRvcGxheScpKSB7XG4gICAgICAgICAgICBwbGF5WW91dHViZShlbGVtZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBQbGF5cyBhIHlvdXR1YmUgdmlkZW9cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gcGxheVlvdXR1YmUoZWxlbWVudCkge1xuICAgICAgZWxlbWVudC5jb250ZW50V2luZG93LnBvc3RNZXNzYWdlKCd7XCJldmVudFwiOlwiY29tbWFuZFwiLFwiZnVuY1wiOlwicGxheVZpZGVvXCIsXCJhcmdzXCI6XCJcIn0nLCAnKicpO1xuICAgIH1cbiAgICAvKipcbiAgICAqIFN0b3BzIHZpZGVvIGFuZCBhdWRpbyBlbGVtZW50cy5cbiAgICAqL1xuXG5cbiAgICBmdW5jdGlvbiBzdG9wTWVkaWEoZGVzdGlueSkge1xuICAgICAgdmFyIHBhbmVsID0gZ2V0U2xpZGVPclNlY3Rpb24oZGVzdGlueSk7IC8vc3RvcHBpbmcgSFRNTDUgbWVkaWEgZWxlbWVudHNcblxuICAgICAgJCgndmlkZW8sIGF1ZGlvJywgcGFuZWwpLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKCFlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnZGF0YS1rZWVwcGxheWluZycpICYmIHR5cGVvZiBlbGVtZW50LnBhdXNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgZWxlbWVudC5wYXVzZSgpO1xuICAgICAgICB9XG4gICAgICB9KTsgLy95b3V0dWJlIHZpZGVvc1xuXG4gICAgICAkKCdpZnJhbWVbc3JjKj1cInlvdXR1YmUuY29tL2VtYmVkL1wiXScsIHBhbmVsKS5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIGlmICgveW91dHViZVxcLmNvbVxcL2VtYmVkXFwvLy50ZXN0KGdldEF0dHIoZWxlbWVudCwgJ3NyYycpKSAmJiAhZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2RhdGEta2VlcHBsYXlpbmcnKSkge1xuICAgICAgICAgIGVsZW1lbnQuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZSgne1wiZXZlbnRcIjpcImNvbW1hbmRcIixcImZ1bmNcIjpcInBhdXNlVmlkZW9cIixcImFyZ3NcIjpcIlwifScsICcqJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICAvKlxuICAgICogRW5hYmxlcyB0aGUgWW91dHViZSB2aWRlb3MgQVBJIHNvIHdlIGNhbiBjb250cm9sIHRoZWlyIGZsb3cgaWYgbmVjZXNzYXJ5LlxuICAgICovXG5cbiAgICBmdW5jdGlvbiBlbmFibGVZb3V0dWJlQVBJKCkge1xuICAgICAgJCgnaWZyYW1lW3NyYyo9XCJ5b3V0dWJlLmNvbS9lbWJlZC9cIl0nLCBnZXRDb250YWluZXIoKSkuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICBhZGRVUkxQYXJhbShpdGVtLCAnZW5hYmxlanNhcGk9MScpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICogQWRkcyBhIG5ldyBwYXJhbWV0ZXIgYW5kIGl0cyB2YWx1ZSB0byB0aGUgYHNyY2Agb2YgYSBnaXZlbiBlbGVtZW50XG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIGFkZFVSTFBhcmFtKGVsZW1lbnQsIG5ld1BhcmFtKSB7XG4gICAgICB2YXIgb3JpZ2luYWxTcmMgPSBnZXRBdHRyKGVsZW1lbnQsICdzcmMnKTtcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdzcmMnLCBvcmlnaW5hbFNyYyArIGdldFVybFBhcmFtU2lnbihvcmlnaW5hbFNyYykgKyBuZXdQYXJhbSk7XG4gICAgfVxuICAgIC8qXG4gICAgKiBSZXR1cm5zIHRoZSBwcmVmaXggc2lnbiB0byB1c2UgZm9yIGEgbmV3IHBhcmFtZXRlciBpbiBhbiBleGlzdGVuIFVSTC5cbiAgICAqXG4gICAgKiBAcmV0dXJuIHtTdHJpbmd9ICA/IHwgJlxuICAgICovXG5cblxuICAgIGZ1bmN0aW9uIGdldFVybFBhcmFtU2lnbih1cmwpIHtcbiAgICAgIHJldHVybiAhL1xcPy8udGVzdCh1cmwpID8gJz8nIDogJyYnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICogTGF6eSBsb2FkcyBpbWFnZSwgdmlkZW8gYW5kIGF1ZGlvIGVsZW1lbnRzLlxuICAgICovXG5cbiAgICBmdW5jdGlvbiBsYXp5TG9hZChkZXN0aW55KSB7XG4gICAgICBpZiAoIWdldE9wdGlvbnMoKS5sYXp5TG9hZGluZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBwYW5lbCA9IGdldFNsaWRlT3JTZWN0aW9uKGRlc3RpbnkpO1xuICAgICAgJCgnaW1nW2RhdGEtc3JjXSwgaW1nW2RhdGEtc3Jjc2V0XSwgc291cmNlW2RhdGEtc3JjXSwgc291cmNlW2RhdGEtc3Jjc2V0XSwgdmlkZW9bZGF0YS1zcmNdLCBhdWRpb1tkYXRhLXNyY10sIGlmcmFtZVtkYXRhLXNyY10nLCBwYW5lbCkuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICBbJ3NyYycsICdzcmNzZXQnXS5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAgICAgdmFyIGF0dHJpYnV0ZSA9IGdldEF0dHIoZWxlbWVudCwgJ2RhdGEtJyArIHR5cGUpO1xuXG4gICAgICAgICAgaWYgKGF0dHJpYnV0ZSAhPSBudWxsICYmIGF0dHJpYnV0ZSkge1xuICAgICAgICAgICAgc2V0U3JjKGVsZW1lbnQsIHR5cGUpO1xuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAobWF0Y2hlcyhlbGVtZW50LCAnc291cmNlJykpIHtcbiAgICAgICAgICB2YXIgZWxlbWVudFRvUGxheSA9IGNsb3Nlc3QoZWxlbWVudCwgJ3ZpZGVvLCBhdWRpbycpO1xuXG4gICAgICAgICAgaWYgKGVsZW1lbnRUb1BsYXkpIHtcbiAgICAgICAgICAgIGVsZW1lbnRUb1BsYXkubG9hZCgpO1xuXG4gICAgICAgICAgICBlbGVtZW50VG9QbGF5Lm9ubG9hZGVkZGF0YSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIFNldHMgYSBjbGFzcyBmb3IgdGhlIGJvZHkgb2YgdGhlIHBhZ2UgZGVwZW5kaW5nIG9uIHRoZSBhY3RpdmUgc2VjdGlvbiAvIHNsaWRlXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIHNldEJvZHlDbGFzcygpIHtcbiAgICAgIHZhciBzZWN0aW9uID0gZ2V0U3RhdGUoKS5hY3RpdmVTZWN0aW9uLml0ZW07XG4gICAgICB2YXIgc2xpZGUgPSBnZXRTdGF0ZSgpLmFjdGl2ZVNlY3Rpb24uYWN0aXZlU2xpZGU7XG4gICAgICB2YXIgc2VjdGlvbkFuY2hvciA9IGdldEFuY2hvcihzZWN0aW9uKTtcbiAgICAgIHZhciB0ZXh0ID0gU3RyaW5nKHNlY3Rpb25BbmNob3IpO1xuXG4gICAgICBpZiAoc2xpZGUpIHtcbiAgICAgICAgdmFyIHNsaWRlQW5jaG9yID0gZ2V0QW5jaG9yKHNsaWRlLml0ZW0pO1xuICAgICAgICB0ZXh0ID0gdGV4dCArICctJyArIHNsaWRlQW5jaG9yO1xuICAgICAgfSAvL2NoYW5naW5nIHNsYXNoIGZvciBkYXNoIHRvIG1ha2UgaXQgYSB2YWxpZCBDU1Mgc3R5bGVcblxuXG4gICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKCcvJywgJy0nKS5yZXBsYWNlKCcjJywgJycpOyAvL3JlbW92aW5nIHByZXZpb3VzIGFuY2hvciBjbGFzc2VzXG5cbiAgICAgIHZhciBjbGFzc1JlID0gbmV3IFJlZ0V4cCgnXFxcXGJcXFxccz8nICsgVklFV0lOR19QUkVGSVggKyAnLVteXFxcXHNdK1xcXFxiJywgXCJnXCIpO1xuICAgICAgJGJvZHkuY2xhc3NOYW1lID0gJGJvZHkuY2xhc3NOYW1lLnJlcGxhY2UoY2xhc3NSZSwgJycpOyAvL2FkZGluZyB0aGUgY3VycmVudCBhbmNob3JcblxuICAgICAgYWRkQ2xhc3MoJGJvZHksIFZJRVdJTkdfUFJFRklYICsgJy0nICsgdGV4dCk7XG4gICAgfVxuICAgIC8qKlxuICAgICogR2V0cyB0aGUgYW5jaG9yIGZvciB0aGUgZ2l2ZW4gc2xpZGUgLyBzZWN0aW9uLiBJdHMgaW5kZXggd2lsbCBiZSB1c2VkIGlmIHRoZXJlJ3Mgbm9uZS5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gZ2V0QW5jaG9yKGVsZW1lbnQpIHtcbiAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIGFuY2hvciA9IGdldEF0dHIoZWxlbWVudCwgJ2RhdGEtYW5jaG9yJyk7XG4gICAgICB2YXIgZWxlbWVudEluZGV4ID0gaW5kZXgoZWxlbWVudCk7IC8vU2xpZGUgd2l0aG91dCBhbmNob3IgbGluaz8gV2UgdGFrZSB0aGUgaW5kZXggaW5zdGVhZC5cblxuICAgICAgaWYgKGFuY2hvciA9PSBudWxsKSB7XG4gICAgICAgIGFuY2hvciA9IGVsZW1lbnRJbmRleDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGFuY2hvcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIFNldHMgdGhlIHN0YXRlIG9mIHRoZSB3ZWJzaXRlIGRlcGVuZGluZyBvbiB0aGUgYWN0aXZlIHNlY3Rpb24vc2xpZGUuXG4gICAgKiBJdCBjaGFuZ2VzIHRoZSBVUkwgaGFzaCB3aGVuIG5lZWRlZCBhbmQgdXBkYXRlcyB0aGUgYm9keSBjbGFzcy5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gc2V0UGFnZVN0YXR1cyhzbGlkZUluZGV4LCBzbGlkZUFuY2hvciwgYW5jaG9yTGluaykge1xuICAgICAgdmFyIHNlY3Rpb25IYXNoID0gJyc7XG5cbiAgICAgIGlmIChnZXRPcHRpb25zKCkuYW5jaG9ycy5sZW5ndGggJiYgIWdldE9wdGlvbnMoKS5sb2NrQW5jaG9ycykge1xuICAgICAgICAvL2lzbid0IGl0IHRoZSBmaXJzdCBzbGlkZT9cbiAgICAgICAgaWYgKHNsaWRlSW5kZXgpIHtcbiAgICAgICAgICBpZiAoYW5jaG9yTGluayAhPSBudWxsKSB7XG4gICAgICAgICAgICBzZWN0aW9uSGFzaCA9IGFuY2hvckxpbms7XG4gICAgICAgICAgfSAvL3NsaWRlIHdpdGhvdXQgYW5jaG9yIGxpbms/IFdlIHRha2UgdGhlIGluZGV4IGluc3RlYWQuXG5cblxuICAgICAgICAgIGlmIChzbGlkZUFuY2hvciA9PSBudWxsKSB7XG4gICAgICAgICAgICBzbGlkZUFuY2hvciA9IHNsaWRlSW5kZXg7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgICAgbGFzdFNjcm9sbGVkU2xpZGU6IHNsaWRlQW5jaG9yXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgc2V0VXJsSGFzaChzZWN0aW9uSGFzaCArICcvJyArIHNsaWRlQW5jaG9yKTsgLy9maXJzdCBzbGlkZSB3b24ndCBoYXZlIHNsaWRlIGFuY2hvciwganVzdCB0aGUgc2VjdGlvbiBvbmVcbiAgICAgICAgfSBlbHNlIGlmIChzbGlkZUluZGV4ICE9IG51bGwpIHtcbiAgICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgICBsYXN0U2Nyb2xsZWRTbGlkZTogc2xpZGVBbmNob3JcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBzZXRVcmxIYXNoKGFuY2hvckxpbmspO1xuICAgICAgICB9IC8vc2VjdGlvbiB3aXRob3V0IHNsaWRlc1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBzZXRVcmxIYXNoKGFuY2hvckxpbmspO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHNldEJvZHlDbGFzcygpO1xuICAgIH1cbiAgICAvKipcbiAgICAqIFNldHMgdGhlIFVSTCBoYXNoLlxuICAgICovXG5cbiAgICBmdW5jdGlvbiBzZXRVcmxIYXNoKHVybCkge1xuICAgICAgaWYgKGdldE9wdGlvbnMoKS5yZWNvcmRIaXN0b3J5KSB7XG4gICAgICAgIGxvY2F0aW9uLmhhc2ggPSB1cmw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvL01vYmlsZSBDaHJvbWUgZG9lc24ndCB3b3JrIHRoZSBub3JtYWwgd2F5LCBzby4uLiBsZXRzIHVzZSBIVE1MNSBmb3IgcGhvbmVzIDopXG4gICAgICAgIGlmIChpc1RvdWNoRGV2aWNlIHx8IGlzVG91Y2gpIHtcbiAgICAgICAgICB3aW4uaGlzdG9yeS5yZXBsYWNlU3RhdGUodW5kZWZpbmVkLCB1bmRlZmluZWQsICcjJyArIHVybCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIGJhc2VVcmwgPSB3aW4ubG9jYXRpb24uaHJlZi5zcGxpdCgnIycpWzBdO1xuICAgICAgICAgIHdpbi5sb2NhdGlvbi5yZXBsYWNlKGJhc2VVcmwgKyAnIycgKyB1cmwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBHZXRzIHRoZSBuYW1lIGZvciBzY3JlZW4gcmVhZGVycyBmb3IgYSBzZWN0aW9uL3NsaWRlIG5hdmlnYXRpb24gYnVsbGV0LlxuICAgICovXG5cbiAgICBmdW5jdGlvbiBnZXRCdWxsZXRMaW5rTmFtZShpLCBkZWZhdWx0TmFtZSwgaXRlbSkge1xuICAgICAgdmFyIGFuY2hvciA9IGRlZmF1bHROYW1lID09PSAnU2VjdGlvbicgPyBnZXRPcHRpb25zKCkuYW5jaG9yc1tpXSA6IGdldEF0dHIoaXRlbSwgJ2RhdGEtYW5jaG9yJyk7XG4gICAgICByZXR1cm4gZW5jb2RlVVJJKGdldE9wdGlvbnMoKS5uYXZpZ2F0aW9uVG9vbHRpcHNbaV0gfHwgYW5jaG9yIHx8IGRlZmF1bHROYW1lICsgJyAnICsgKGkgKyAxKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2xpZGVCdWxsZXRIYW5kbGVyKGUpIHtcbiAgICAgIHByZXZlbnREZWZhdWx0KGUpO1xuICAgICAgc2V0U3RhdGUoe1xuICAgICAgICBzY3JvbGxUcmlnZ2VyOiAnaG9yaXpvbnRhbE5hdidcbiAgICAgIH0pO1xuICAgICAgLypqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi9cblxuICAgICAgdmFyIHNlY3Rpb25FbGVtID0gY2xvc2VzdCh0aGlzLCBTRUNUSU9OX1NFTCk7XG4gICAgICB2YXIgc2xpZGVzID0gJChTTElERVNfV1JBUFBFUl9TRUwsIGNsb3Nlc3QodGhpcywgU0VDVElPTl9TRUwpKVswXTtcbiAgICAgIHZhciBzZWN0aW9uID0gZ2V0UGFuZWxCeUVsZW1lbnQoZ2V0U3RhdGUoKS5zZWN0aW9ucywgc2VjdGlvbkVsZW0pO1xuICAgICAgdmFyIGRlc3RpbnkgPSBzZWN0aW9uLnNsaWRlc1tpbmRleChjbG9zZXN0KHRoaXMsICdsaScpKV07XG4gICAgICBFdmVudEVtaXR0ZXIuZW1pdChldmVudHMubGFuZHNjYXBlU2Nyb2xsLCB7XG4gICAgICAgIHNsaWRlczogc2xpZGVzLFxuICAgICAgICBkZXN0aW5hdGlvbjogZGVzdGlueS5pdGVtXG4gICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBTZXRzIHRoZSBzdGF0ZSBmb3IgdGhlIGhvcml6b250YWwgYnVsbGV0IG5hdmlnYXRpb25zLlxuICAgICovXG5cbiAgICBmdW5jdGlvbiBhY3RpdmVTbGlkZXNOYXZpZ2F0aW9uKHNsaWRlc05hdiwgc2xpZGVJbmRleCkge1xuICAgICAgaWYgKGdldE9wdGlvbnMoKS5zbGlkZXNOYXZpZ2F0aW9uICYmIHNsaWRlc05hdiAhPSBudWxsKSB7XG4gICAgICAgIHJlbW92ZUNsYXNzKCQoQUNUSVZFX1NFTCwgc2xpZGVzTmF2KSwgQUNUSVZFKTtcbiAgICAgICAgYWRkQ2xhc3MoJCgnYScsICQoJ2xpJywgc2xpZGVzTmF2KVtzbGlkZUluZGV4XSksIEFDVElWRSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICogQ3JlYXRlcyBhIGxhbmRzY2FwZSBuYXZpZ2F0aW9uIGJhciB3aXRoIGRvdHMgZm9yIGhvcml6b250YWwgc2xpZGVycy5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gYWRkU2xpZGVzTmF2aWdhdGlvbihzZWN0aW9uKSB7XG4gICAgICB2YXIgc2VjdGlvbkVsZW0gPSBzZWN0aW9uLml0ZW07XG4gICAgICB2YXIgbnVtU2xpZGVzID0gc2VjdGlvbi5zbGlkZXMubGVuZ3RoO1xuICAgICAgYXBwZW5kVG8oY3JlYXRlRWxlbWVudEZyb21IVE1MKCc8ZGl2IGNsYXNzPVwiJyArIFNMSURFU19OQVYgKyAnXCI+PHVsPjwvdWw+PC9kaXY+JyksIHNlY3Rpb25FbGVtKTtcbiAgICAgIHZhciBuYXYgPSAkKFNMSURFU19OQVZfU0VMLCBzZWN0aW9uRWxlbSlbMF07IC8vdG9wIG9yIGJvdHRvbVxuXG4gICAgICBhZGRDbGFzcyhuYXYsICdmcC0nICsgZ2V0T3B0aW9ucygpLnNsaWRlc05hdlBvc2l0aW9uKTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1TbGlkZXM7IGkrKykge1xuICAgICAgICB2YXIgc2xpZGUgPSAkKFNMSURFX1NFTCwgc2VjdGlvbkVsZW0pW2ldO1xuICAgICAgICBhcHBlbmRUbyhjcmVhdGVFbGVtZW50RnJvbUhUTUwoJzxsaT48YSBocmVmPVwiI1wiPjxzcGFuIGNsYXNzPVwiZnAtc3Itb25seVwiPicgKyBnZXRCdWxsZXRMaW5rTmFtZShpLCAnU2xpZGUnLCBzbGlkZSkgKyAnPC9zcGFuPjxzcGFuPjwvc3Bhbj48L2E+PC9saT4nKSwgJCgndWwnLCBuYXYpWzBdKTtcbiAgICAgIH0gLy9jZW50ZXJpbmcgaXRcblxuXG4gICAgICBjc3MobmF2LCB7XG4gICAgICAgICdtYXJnaW4tbGVmdCc6ICctJyArIG5hdi5pbm5lcldpZHRoIC8gMiArICdweCdcbiAgICAgIH0pO1xuICAgICAgdmFyIGFjdGl2ZVNsaWRlSW5kZXggPSBzZWN0aW9uLmFjdGl2ZVNsaWRlID8gc2VjdGlvbi5hY3RpdmVTbGlkZS5pbmRleCgpIDogMDtcbiAgICAgIGFkZENsYXNzKCQoJ2EnLCAkKCdsaScsIG5hdilbYWN0aXZlU2xpZGVJbmRleF0pLCBBQ1RJVkUpO1xuICAgIH1cblxuICAgIHZhciBpc1Njcm9sbEFsbG93ZWQgPSB7fTtcbiAgICBpc1Njcm9sbEFsbG93ZWQubSA9IHtcbiAgICAgICd1cCc6IHRydWUsXG4gICAgICAnZG93bic6IHRydWUsXG4gICAgICAnbGVmdCc6IHRydWUsXG4gICAgICAncmlnaHQnOiB0cnVlXG4gICAgfTtcbiAgICBpc1Njcm9sbEFsbG93ZWQuayA9IGRlZXBFeHRlbmQoe30sIGlzU2Nyb2xsQWxsb3dlZC5tKTtcbiAgICAvKipcbiAgICAqIEFsbG93aW5nIG9yIGRpc2FsbG93aW5nIHRoZSBtb3VzZS9zd2lwZSBzY3JvbGwgaW4gYSBnaXZlbiBkaXJlY3Rpb24uIChub3QgZm9yIGtleWJvYXJkKVxuICAgICogQHBhcmFtIHR5cGUgbSAobW91c2UpIG9yIGsgKGtleWJvYXJkKVxuICAgICovXG5cbiAgICBmdW5jdGlvbiBzZXRJc1Njcm9sbEFsbG93ZWQodmFsdWUsIGRpcmVjdGlvbiwgdHlwZSkge1xuICAgICAgLy91cCwgZG93biwgbGVmdCwgcmlnaHRcbiAgICAgIGlmIChkaXJlY3Rpb24gIT09ICdhbGwnKSB7XG4gICAgICAgIGlzU2Nyb2xsQWxsb3dlZFt0eXBlXVtkaXJlY3Rpb25dID0gdmFsdWU7XG4gICAgICB9IC8vYWxsIGRpcmVjdGlvbnM/XG4gICAgICBlbHNlIHtcbiAgICAgICAgT2JqZWN0LmtleXMoaXNTY3JvbGxBbGxvd2VkW3R5cGVdKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICBpc1Njcm9sbEFsbG93ZWRbdHlwZV1ba2V5XSA9IHZhbHVlO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0SXNTY3JvbGxBbGxvd2VkKCkge1xuICAgICAgcmV0dXJuIGlzU2Nyb2xsQWxsb3dlZDtcbiAgICB9XG5cbiAgICBFdmVudEVtaXR0ZXIub24oZXZlbnRzLm9uQ2xpY2tPclRvdWNoLCBvbkNsaWNrT3JUb3VjaCQyKTtcblxuICAgIGZ1bmN0aW9uIG9uQ2xpY2tPclRvdWNoJDIocGFyYW1zKSB7XG4gICAgICB2YXIgdGFyZ2V0ID0gcGFyYW1zLnRhcmdldDtcblxuICAgICAgaWYgKG1hdGNoZXModGFyZ2V0LCBTTElERVNfQVJST1dfU0VMKSB8fCBjbG9zZXN0KHRhcmdldCwgU0xJREVTX0FSUk9XX1NFTCkpIHtcbiAgICAgICAgc2xpZGVBcnJvd0hhbmRsZXIuY2FsbCh0YXJnZXQsIHBhcmFtcyk7XG4gICAgICB9XG4gICAgfSAvL1Njcm9sbGluZyBob3Jpem9udGFsbHkgd2hlbiBjbGlja2luZyBvbiB0aGUgc2xpZGVyIGNvbnRyb2xzLlxuXG5cbiAgICBmdW5jdGlvbiBzbGlkZUFycm93SGFuZGxlcigpIHtcbiAgICAgIC8qanNoaW50IHZhbGlkdGhpczp0cnVlICovXG4gICAgICB2YXIgc2VjdGlvbiA9IGNsb3Nlc3QodGhpcywgU0VDVElPTl9TRUwpO1xuICAgICAgLypqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi9cblxuICAgICAgaWYgKGhhc0NsYXNzKHRoaXMsIFNMSURFU19QUkVWKSkge1xuICAgICAgICBpZiAoZ2V0SXNTY3JvbGxBbGxvd2VkKCkubS5sZWZ0KSB7XG4gICAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgICAgc2Nyb2xsVHJpZ2dlcjogJ3NsaWRlQXJyb3cnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgRXZlbnRFbWl0dGVyLmVtaXQoZXZlbnRzLm1vdmVTbGlkZUxlZnQsIHtcbiAgICAgICAgICAgIHNlY3Rpb246IHNlY3Rpb25cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGdldElzU2Nyb2xsQWxsb3dlZCgpLm0ucmlnaHQpIHtcbiAgICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgICBzY3JvbGxUcmlnZ2VyOiAnc2xpZGVBcnJvdydcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBFdmVudEVtaXR0ZXIuZW1pdChldmVudHMubW92ZVNsaWRlUmlnaHQsIHtcbiAgICAgICAgICAgIHNlY3Rpb246IHNlY3Rpb25cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAqIENyZWF0ZXMgdGhlIGNvbnRyb2wgYXJyb3dzIGZvciB0aGUgZ2l2ZW4gc2VjdGlvblxuICAgICovXG5cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVNsaWRlQXJyb3dzKHNlY3Rpb24pIHtcbiAgICAgIHZhciBzZWN0aW9uRWxlbSA9IHNlY3Rpb24uaXRlbTtcbiAgICAgIHZhciBhcnJvd3MgPSBbY3JlYXRlRWxlbWVudEZyb21IVE1MKGdldE9wdGlvbnMoKS5jb250cm9sQXJyb3dzSFRNTFswXSksIGNyZWF0ZUVsZW1lbnRGcm9tSFRNTChnZXRPcHRpb25zKCkuY29udHJvbEFycm93c0hUTUxbMV0pXTtcbiAgICAgIGFmdGVyKCQoU0xJREVTX1dSQVBQRVJfU0VMLCBzZWN0aW9uRWxlbSlbMF0sIGFycm93cyk7XG4gICAgICBhZGRDbGFzcyhhcnJvd3MsIFNMSURFU19BUlJPVyk7XG4gICAgICBhZGRDbGFzcyhhcnJvd3NbMF0sIFNMSURFU19QUkVWKTtcbiAgICAgIGFkZENsYXNzKGFycm93c1sxXSwgU0xJREVTX05FWFQpO1xuXG4gICAgICBpZiAoZ2V0T3B0aW9ucygpLmNvbnRyb2xBcnJvd0NvbG9yICE9PSAnI2ZmZicpIHtcbiAgICAgICAgY3NzKCQoU0xJREVTX0FSUk9XX05FWFRfU0VMLCBzZWN0aW9uRWxlbSksIHtcbiAgICAgICAgICAnYm9yZGVyLWNvbG9yJzogJ3RyYW5zcGFyZW50IHRyYW5zcGFyZW50IHRyYW5zcGFyZW50ICcgKyBnZXRPcHRpb25zKCkuY29udHJvbEFycm93Q29sb3JcbiAgICAgICAgfSk7XG4gICAgICAgIGNzcygkKFNMSURFU19BUlJPV19QUkVWX1NFTCwgc2VjdGlvbkVsZW0pLCB7XG4gICAgICAgICAgJ2JvcmRlci1jb2xvcic6ICd0cmFuc3BhcmVudCAnICsgZ2V0T3B0aW9ucygpLmNvbnRyb2xBcnJvd0NvbG9yICsgJyB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCdcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghZ2V0T3B0aW9ucygpLmxvb3BIb3Jpem9udGFsKSB7XG4gICAgICAgIGhpZGUoJChTTElERVNfQVJST1dfUFJFVl9TRUwsIHNlY3Rpb25FbGVtKSk7XG4gICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRvZ2dsZUNvbnRyb2xBcnJvd3Modikge1xuICAgICAgaWYgKCFnZXRPcHRpb25zKCkubG9vcEhvcml6b250YWwgJiYgZ2V0T3B0aW9ucygpLmNvbnRyb2xBcnJvd3MpIHtcbiAgICAgICAgLy9oaWRkaW5nIGl0IGZvciB0aGUgZmlzdCBzbGlkZSwgc2hvd2luZyBmb3IgdGhlIHJlc3RcbiAgICAgICAgdG9nZ2xlKCQoU0xJREVTX0FSUk9XX1BSRVZfU0VMLCB2LnNlY3Rpb24pLCB2LnNsaWRlSW5kZXggIT09IDApOyAvL2hpZGRpbmcgaXQgZm9yIHRoZSBsYXN0IHNsaWRlLCBzaG93aW5nIGZvciB0aGUgcmVzdFxuXG4gICAgICAgIHRvZ2dsZSgkKFNMSURFU19BUlJPV19ORVhUX1NFTCwgdi5zZWN0aW9uKSwgbmV4dCh2LmRlc3RpbnkpICE9IG51bGwpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBnX2FmdGVyU2xpZGVMb2Fkc0lkO1xuICAgIEZQLmxhbmRzY2FwZVNjcm9sbCA9IGxhbmRzY2FwZVNjcm9sbDtcbiAgICBFdmVudEVtaXR0ZXIub24oZXZlbnRzLmJpbmRFdmVudHMsIGJpbmRFdmVudHMkYik7XG5cbiAgICBmdW5jdGlvbiBiaW5kRXZlbnRzJGIoKSB7XG4gICAgICBFdmVudEVtaXR0ZXIub24oZXZlbnRzLm9uUGVyZm9ybU1vdmVtZW50LCBvblBlcmZvcm1Nb3ZlbWVudCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25QZXJmb3JtTW92ZW1lbnQoKSB7XG4gICAgICBjbGVhclRpbWVvdXQoZ19hZnRlclNsaWRlTG9hZHNJZCk7XG4gICAgICBzZXRTdGF0ZSh7XG4gICAgICAgIHNsaWRlTW92aW5nOiBmYWxzZVxuICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICogU2Nyb2xscyBob3Jpem9udGFsIHNsaWRlcnMuXG4gICAgKi9cblxuXG4gICAgZnVuY3Rpb24gbGFuZHNjYXBlU2Nyb2xsKHNsaWRlcywgZGVzdGlueSwgZGlyZWN0aW9uKSB7XG4gICAgICB2YXIgc2VjdGlvbkVsZW0gPSBjbG9zZXN0KHNsaWRlcywgU0VDVElPTl9TRUwpO1xuICAgICAgdmFyIHNlY3Rpb24gPSBnZXRTdGF0ZSgpLnNlY3Rpb25zLmZpbHRlcihmdW5jdGlvbiAoc2VjdGlvbikge1xuICAgICAgICByZXR1cm4gc2VjdGlvbi5pdGVtID09IHNlY3Rpb25FbGVtO1xuICAgICAgfSlbMF07XG4gICAgICB2YXIgc2xpZGUgPSBzZWN0aW9uLnNsaWRlcy5maWx0ZXIoZnVuY3Rpb24gKHNsaWRlKSB7XG4gICAgICAgIHJldHVybiBzbGlkZS5pdGVtID09IGRlc3Rpbnk7XG4gICAgICB9KVswXTtcbiAgICAgIHZhciB2ID0ge1xuICAgICAgICBcInNsaWRlc1wiOiBzbGlkZXMsXG4gICAgICAgIFwiZGVzdGlueVwiOiBkZXN0aW55LFxuICAgICAgICBcImRpcmVjdGlvblwiOiBkaXJlY3Rpb24sXG4gICAgICAgIFwiZGVzdGlueVBvc1wiOiB7XG4gICAgICAgICAgXCJsZWZ0XCI6IGRlc3Rpbnkub2Zmc2V0TGVmdFxuICAgICAgICB9LFxuICAgICAgICBcInNsaWRlSW5kZXhcIjogc2xpZGUuaW5kZXgoKSxcbiAgICAgICAgXCJzZWN0aW9uXCI6IHNlY3Rpb25FbGVtLFxuICAgICAgICBcInNlY3Rpb25JbmRleFwiOiBzZWN0aW9uLmluZGV4KCksXG4gICAgICAgIFwiYW5jaG9yTGlua1wiOiBzZWN0aW9uLmFuY2hvcixcbiAgICAgICAgXCJzbGlkZXNOYXZcIjogJChTTElERVNfTkFWX1NFTCwgc2VjdGlvbkVsZW0pWzBdLFxuICAgICAgICBcInNsaWRlQW5jaG9yXCI6IHNsaWRlLmFuY2hvcixcbiAgICAgICAgXCJwcmV2U2xpZGVcIjogc2VjdGlvbi5hY3RpdmVTbGlkZS5pdGVtLFxuICAgICAgICBcInByZXZTbGlkZUluZGV4XCI6IHNlY3Rpb24uYWN0aXZlU2xpZGUuaW5kZXgoKSxcbiAgICAgICAgXCJpdGVtc1wiOiB7XG4gICAgICAgICAgXCJzZWN0aW9uXCI6IHNlY3Rpb24sXG4gICAgICAgICAgXCJvcmlnaW5cIjogc2VjdGlvbi5hY3RpdmVTbGlkZSxcbiAgICAgICAgICBcImRlc3RpbmF0aW9uXCI6IHNsaWRlXG4gICAgICAgIH0sXG4gICAgICAgIC8vY2FjaGluZyB0aGUgdmFsdWUgb2YgaXNSZXNpemluZyBhdCB0aGUgbW9tbWVudCB0aGUgZnVuY3Rpb24gaXMgY2FsbGVkXG4gICAgICAgIC8vYmVjYXVzZSBpdCB3aWxsIGJlIGNoZWNrZWQgbGF0ZXIgaW5zaWRlIGEgc2V0VGltZW91dCBhbmQgdGhlIHZhbHVlIG1pZ2h0IGNoYW5nZVxuICAgICAgICBcImxvY2FsSXNSZXNpemluZ1wiOiBzdGF0ZS5pc1Jlc2l6aW5nXG4gICAgICB9O1xuICAgICAgdi54TW92ZW1lbnQgPSBnZXRYbW92ZW1lbnQodi5wcmV2U2xpZGVJbmRleCwgdi5zbGlkZUluZGV4KTtcbiAgICAgIHYuZGlyZWN0aW9uID0gdi5kaXJlY3Rpb24gPyB2LmRpcmVjdGlvbiA6IHYueE1vdmVtZW50OyAvL2ltcG9ydGFudCEhIE9ubHkgZG8gaXQgd2hlbiBub3QgcmVzaXppbmdcblxuICAgICAgaWYgKCF2LmxvY2FsSXNSZXNpemluZykge1xuICAgICAgICAvL3ByZXZlbnRpbmcgZnJvbSBzY3JvbGxpbmcgdG8gdGhlIG5leHQvcHJldiBzZWN0aW9uIHdoZW4gdXNpbmcgc2Nyb2xsSG9yaXpvbnRhbGx5XG4gICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICBjYW5TY3JvbGw6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoZ2V0T3B0aW9ucygpLm9uU2xpZGVMZWF2ZSkge1xuICAgICAgICAvL2lmIHRoZSBzaXRlIGlzIG5vdCBqdXN0IHJlc2l6aW5nIGFuZCByZWFkanVzdGluZyB0aGUgc2xpZGVzXG4gICAgICAgIGlmICghdi5sb2NhbElzUmVzaXppbmcgJiYgdi54TW92ZW1lbnQgIT09ICdub25lJykge1xuICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKGdldE9wdGlvbnMoKS5vblNsaWRlTGVhdmUpKSB7XG4gICAgICAgICAgICBpZiAoZmlyZUNhbGxiYWNrKCdvblNsaWRlTGVhdmUnLCB2KSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHNsaWRlTW92aW5nOiBmYWxzZVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBhZGRDbGFzcyhkZXN0aW55LCBBQ1RJVkUpO1xuICAgICAgcmVtb3ZlQ2xhc3Moc2libGluZ3MoZGVzdGlueSksIEFDVElWRSk7XG4gICAgICB1cGRhdGVTdGF0ZSgpO1xuXG4gICAgICBpZiAoIXYubG9jYWxJc1Jlc2l6aW5nKSB7XG4gICAgICAgIHN0b3BNZWRpYSh2LnByZXZTbGlkZSk7XG4gICAgICAgIGxhenlMb2FkKGRlc3RpbnkpO1xuICAgICAgfVxuXG4gICAgICB0b2dnbGVDb250cm9sQXJyb3dzKHYpOyAvL29ubHkgY2hhbmdpbmcgdGhlIFVSTCBpZiB0aGUgc2xpZGVzIGFyZSBpbiB0aGUgY3VycmVudCBzZWN0aW9uIChub3QgZm9yIHJlc2l6ZSByZS1hZGp1c3RpbmcpXG5cbiAgICAgIGlmIChzZWN0aW9uLmlzQWN0aXZlICYmICF2LmxvY2FsSXNSZXNpemluZykge1xuICAgICAgICBzZXRQYWdlU3RhdHVzKHYuc2xpZGVJbmRleCwgdi5zbGlkZUFuY2hvciwgdi5hbmNob3JMaW5rKTtcbiAgICAgIH1cblxuICAgICAgcGVyZm9ybUhvcml6b250YWxNb3ZlKHNsaWRlcywgdiwgdHJ1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICogUGVyZm9ybXMgdGhlIGhvcml6b250YWwgbW92ZW1lbnQuIChDU1MzIG9yIGpRdWVyeSlcbiAgICAqXG4gICAgKiBAcGFyYW0gZmlyZUNhbGxiYWNrIHtCb29sZWFufSAtIGRldGVybWluZXMgd2hldGhlciBvciBub3QgdG8gZmlyZSB0aGUgY2FsbGJhY2tcbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gcGVyZm9ybUhvcml6b250YWxNb3ZlKHNsaWRlcywgdiwgZmlyZUNhbGxiYWNrKSB7XG4gICAgICB2YXIgZGVzdGlueVBvcyA9IHYuZGVzdGlueVBvcztcbiAgICAgIGFjdGl2ZVNsaWRlc05hdmlnYXRpb24odi5zbGlkZXNOYXYsIHYuc2xpZGVJbmRleCk7XG4gICAgICBzZXRTdGF0ZSh7XG4gICAgICAgIHNjcm9sbFg6IE1hdGgucm91bmQoZGVzdGlueVBvcy5sZWZ0KVxuICAgICAgfSk7XG5cbiAgICAgIGlmIChnZXRPcHRpb25zKCkuY3NzMykge1xuICAgICAgICB2YXIgdHJhbnNsYXRlM2QgPSAndHJhbnNsYXRlM2QoLScgKyBNYXRoLnJvdW5kKGRlc3RpbnlQb3MubGVmdCkgKyAncHgsIDBweCwgMHB4KSc7XG4gICAgICAgIEZQLnRlc3QudHJhbnNsYXRlM2RIW3Yuc2VjdGlvbkluZGV4XSA9IHRyYW5zbGF0ZTNkO1xuICAgICAgICBjc3MoYWRkQW5pbWF0aW9uKCQoU0xJREVTX0NPTlRBSU5FUl9TRUwsIHNsaWRlcykpLCBnZXRUcmFuc2Zvcm1zKHRyYW5zbGF0ZTNkKSk7XG4gICAgICAgIGNsZWFyVGltZW91dChnX2FmdGVyU2xpZGVMb2Fkc0lkKTtcbiAgICAgICAgZ19hZnRlclNsaWRlTG9hZHNJZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChmaXJlQ2FsbGJhY2spIHtcbiAgICAgICAgICAgIGFmdGVyU2xpZGVMb2Fkcyh2KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIGdldE9wdGlvbnMoKS5zY3JvbGxpbmdTcGVlZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBGUC50ZXN0LmxlZnRbdi5zZWN0aW9uSW5kZXhdID0gTWF0aC5yb3VuZChkZXN0aW55UG9zLmxlZnQpO1xuICAgICAgICBzY3JvbGxUbyhzbGlkZXMsIE1hdGgucm91bmQoZGVzdGlueVBvcy5sZWZ0KSwgZ2V0T3B0aW9ucygpLnNjcm9sbGluZ1NwZWVkLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKGZpcmVDYWxsYmFjaykge1xuICAgICAgICAgICAgYWZ0ZXJTbGlkZUxvYWRzKHYpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICogUmV0dW5zIGByaWdodGAgb3IgYGxlZnRgIGRlcGVuZGluZyBvbiB0aGUgc2Nyb2xsaW5nIG1vdmVtZW50IHRvIHJlYWNoIGl0cyBkZXN0aW5hdGlvblxuICAgICogZnJvbSB0aGUgY3VycmVudCBzbGlkZS5cbiAgICAqL1xuXG5cbiAgICBmdW5jdGlvbiBnZXRYbW92ZW1lbnQoZnJvbUluZGV4LCB0b0luZGV4KSB7XG4gICAgICBpZiAoZnJvbUluZGV4ID09IHRvSW5kZXgpIHtcbiAgICAgICAgcmV0dXJuICdub25lJztcbiAgICAgIH1cblxuICAgICAgaWYgKGZyb21JbmRleCA+IHRvSW5kZXgpIHtcbiAgICAgICAgcmV0dXJuICdsZWZ0JztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICdyaWdodCc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25EZXN0cm95JDcoKSB7XG4gICAgICBjbGVhclRpbWVvdXQoZ19hZnRlclNsaWRlTG9hZHNJZCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWZ0ZXJTbGlkZUxvYWRzKHYpIHtcbiAgICAgIC8vaWYgdGhlIHNpdGUgaXMgbm90IGp1c3QgcmVzaXppbmcgYW5kIHJlYWRqdXN0aW5nIHRoZSBzbGlkZXNcbiAgICAgIGlmICghdi5sb2NhbElzUmVzaXppbmcpIHtcbiAgICAgICAgaWYgKGlzRnVuY3Rpb24oZ2V0T3B0aW9ucygpLmFmdGVyU2xpZGVMb2FkKSkge1xuICAgICAgICAgIGZpcmVDYWxsYmFjaygnYWZ0ZXJTbGlkZUxvYWQnLCB2KTtcbiAgICAgICAgfSAvL25lZWRzIHRvIGJlIGluc2lkZSB0aGUgY29uZGl0aW9uIHRvIHByZXZlbnQgcHJvYmxlbXMgd2l0aCBjb250aW51b3VzVmVydGljYWwgYW5kIHNjcm9sbEhvcml6b250YWxseVxuICAgICAgICAvL2FuZCB0byBwcmV2ZW50IGRvdWJsZSBzY3JvbGwgcmlnaHQgYWZ0ZXIgYSB3aW5kb3dzIHJlc2l6ZVxuXG5cbiAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgIGNhblNjcm9sbDogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgcGxheU1lZGlhKHYuZGVzdGlueSk7XG4gICAgICAgIEV2ZW50RW1pdHRlci5lbWl0KGV2ZW50cy5hZnRlclNsaWRlTG9hZHMsIHYpO1xuICAgICAgfSAvL2xldHRpbmcgdGhlbSBzbGlkZSBhZ2FpblxuXG5cbiAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgc2xpZGVNb3Zpbmc6IGZhbHNlXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIFNsaWRlcyBzaWxlbnRseSAod2l0aCBubyBhbmltYXRpb24pIHRoZSBhY3RpdmUgc2xpZGVyIHRvIHRoZSBnaXZlbiBzbGlkZS5cbiAgICAqIEBwYXJhbSBub0NhbGxiYWNrIHtib29sfSB0cnVlIG9yIGRlZmluZWQgLT4gbm8gY2FsbGJhY2tzXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIHNpbGVudExhbmRzY2FwZVNjcm9sbChhY3RpdmVTbGlkZSwgbm9DYWxsYmFja3MpIHtcbiAgICAgIHNldFNjcm9sbGluZ1NwZWVkKDAsICdpbnRlcm5hbCcpO1xuXG4gICAgICBpZiAodHlwZW9mIG5vQ2FsbGJhY2tzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAvL3ByZXZlbnRpbmcgZmlyaW5nIGNhbGxiYWNrcyBhZnRlclNsaWRlTG9hZCBldGMuXG4gICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICBpc1Jlc2l6aW5nOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBsYW5kc2NhcGVTY3JvbGwoY2xvc2VzdChhY3RpdmVTbGlkZSwgU0xJREVTX1dSQVBQRVJfU0VMKSwgYWN0aXZlU2xpZGUpO1xuXG4gICAgICBpZiAodHlwZW9mIG5vQ2FsbGJhY2tzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgaXNSZXNpemluZzogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHNldFNjcm9sbGluZ1NwZWVkKGdldE9yaWdpbmFscygpLnNjcm9sbGluZ1NwZWVkLCAnaW50ZXJuYWwnKTtcbiAgICB9XG5cbiAgICBGUC5zZXRSZWNvcmRIaXN0b3J5ID0gc2V0UmVjb3JkSGlzdG9yeTtcbiAgICAvKipcbiAgICAqIERlZmluZXMgd2hldGVyIHRvIHJlY29yZCB0aGUgaGlzdG9yeSBmb3IgZWFjaCBoYXNoIGNoYW5nZSBpbiB0aGUgVVJMLlxuICAgICovXG5cbiAgICBmdW5jdGlvbiBzZXRSZWNvcmRIaXN0b3J5KHZhbHVlLCB0eXBlKSB7XG4gICAgICBzZXRWYXJpYWJsZVN0YXRlKCdyZWNvcmRIaXN0b3J5JywgdmFsdWUsIHR5cGUpO1xuICAgIH1cblxuICAgIEZQLnNldEF1dG9TY3JvbGxpbmcgPSBzZXRBdXRvU2Nyb2xsaW5nO1xuICAgIEZQLnRlc3Quc2V0QXV0b1Njcm9sbGluZyA9IHNldEF1dG9TY3JvbGxpbmc7XG4gICAgLyoqXG4gICAgKiBTZXRzIHRoZSBhdXRvU2Nyb2xsIG9wdGlvbi5cbiAgICAqIEl0IGNoYW5nZXMgdGhlIHNjcm9sbCBiYXIgdmlzaWJpbGl0eSBhbmQgdGhlIGhpc3Rvcnkgb2YgdGhlIHNpdGUgYXMgYSByZXN1bHQuXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIHNldEF1dG9TY3JvbGxpbmcodmFsdWUsIHR5cGUpIHtcbiAgICAgIC8vcmVtb3ZpbmcgdGhlIHRyYW5zZm9ybWF0aW9uXG4gICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgIHNpbGVudFNjcm9sbCgwKTtcbiAgICAgIH1cblxuICAgICAgc2V0VmFyaWFibGVTdGF0ZSgnYXV0b1Njcm9sbGluZycsIHZhbHVlLCB0eXBlKTtcbiAgICAgIHZhciBlbGVtZW50ID0gZ2V0U3RhdGUoKS5hY3RpdmVTZWN0aW9uLml0ZW07XG5cbiAgICAgIGlmIChnZXRPcHRpb25zKCkuYXV0b1Njcm9sbGluZyAmJiAhZ2V0T3B0aW9ucygpLnNjcm9sbEJhcikge1xuICAgICAgICBjc3MoJGh0bWxCb2R5LCB7XG4gICAgICAgICAgJ292ZXJmbG93JzogJ2hpZGRlbicsXG4gICAgICAgICAgJ2hlaWdodCc6ICcxMDAlJ1xuICAgICAgICB9KTtcbiAgICAgICAgcmVtb3ZlQ2xhc3MoJGJvZHksICdmcC1zY3JvbGxhYmxlJyk7XG4gICAgICAgIHNldFJlY29yZEhpc3RvcnkoZ2V0T3JpZ2luYWxzKCkucmVjb3JkSGlzdG9yeSwgJ2ludGVybmFsJyk7IC8vZm9yIElFIHRvdWNoIGRldmljZXNcblxuICAgICAgICBjc3MoZ2V0Q29udGFpbmVyKCksIHtcbiAgICAgICAgICAnLW1zLXRvdWNoLWFjdGlvbic6ICdub25lJyxcbiAgICAgICAgICAndG91Y2gtYWN0aW9uJzogJ25vbmUnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChlbGVtZW50ICE9IG51bGwpIHtcbiAgICAgICAgICAvL21vdmluZyB0aGUgY29udGFpbmVyIHVwXG4gICAgICAgICAgc2lsZW50U2Nyb2xsKGVsZW1lbnQub2Zmc2V0VG9wKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3NzKCRodG1sQm9keSwge1xuICAgICAgICAgICdvdmVyZmxvdyc6ICd2aXNpYmxlJyxcbiAgICAgICAgICAnaGVpZ2h0JzogJ2luaXRpYWwnXG4gICAgICAgIH0pO1xuICAgICAgICBhZGRDbGFzcygkYm9keSwgJ2ZwLXNjcm9sbGFibGUnKTtcbiAgICAgICAgdmFyIHJlY29yZEhpc3RvcnkgPSAhZ2V0T3B0aW9ucygpLmF1dG9TY3JvbGxpbmcgPyBmYWxzZSA6IGdldE9yaWdpbmFscygpLnJlY29yZEhpc3Rvcnk7XG4gICAgICAgIHNldFJlY29yZEhpc3RvcnkocmVjb3JkSGlzdG9yeSwgJ2ludGVybmFsJyk7IC8vZm9yIElFIHRvdWNoIGRldmljZXNcblxuICAgICAgICBjc3MoZ2V0Q29udGFpbmVyKCksIHtcbiAgICAgICAgICAnLW1zLXRvdWNoLWFjdGlvbic6ICcnLFxuICAgICAgICAgICd0b3VjaC1hY3Rpb24nOiAnJ1xuICAgICAgICB9KTsgLy9zY3JvbGxpbmcgdGhlIHBhZ2UgdG8gdGhlIHNlY3Rpb24gd2l0aCBubyBhbmltYXRpb25cblxuICAgICAgICBpZiAoZWxlbWVudCAhPSBudWxsKSB7XG4gICAgICAgICAgdmFyIHNjcm9sbFNldHRpbmdzID0gZ2V0U2Nyb2xsU2V0dGluZ3MoZWxlbWVudC5vZmZzZXRUb3ApO1xuICAgICAgICAgIHNjcm9sbFNldHRpbmdzLmVsZW1lbnQuc2Nyb2xsVG8oMCwgc2Nyb2xsU2V0dGluZ3Mub3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvL0B0cy1jaGVja1xuICAgIC8qKlxuICAgICogQWRkcyBzZWN0aW9ucyBiZWZvcmUgb3IgYWZ0ZXIgdGhlIGN1cnJlbnQgb25lIHRvIGNyZWF0ZSB0aGUgaW5maW5pdGUgZWZmZWN0LlxuICAgICovXG5cbiAgICBmdW5jdGlvbiBjcmVhdGVJbmZpbml0ZVNlY3Rpb25zKHYpIHtcbiAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgaXNEb2luZ0NvbnRpbm91c1ZlcnRpY2FsOiB0cnVlXG4gICAgICB9KTtcbiAgICAgIHZhciBhY3RpdmVTZWN0aW9uSXRlbSA9IGdldFN0YXRlKCkuYWN0aXZlU2VjdGlvbi5pdGVtOyAvLyBTY3JvbGxpbmcgZG93blxuXG4gICAgICBpZiAoIXYuaXNNb3ZlbWVudFVwKSB7XG4gICAgICAgIC8vIE1vdmUgYWxsIHByZXZpb3VzIHNlY3Rpb25zIHRvIGFmdGVyIHRoZSBhY3RpdmUgc2VjdGlvblxuICAgICAgICBhZnRlcihhY3RpdmVTZWN0aW9uSXRlbSwgcHJldkFsbChhY3RpdmVTZWN0aW9uSXRlbSwgU0VDVElPTl9TRUwpLnJldmVyc2UoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBTY3JvbGxpbmcgdXBcbiAgICAgICAgLy8gTW92ZSBhbGwgbmV4dCBzZWN0aW9ucyB0byBiZWZvcmUgdGhlIGFjdGl2ZSBzZWN0aW9uXG4gICAgICAgIGJlZm9yZShhY3RpdmVTZWN0aW9uSXRlbSwgbmV4dEFsbChhY3RpdmVTZWN0aW9uSXRlbSwgU0VDVElPTl9TRUwpKTtcbiAgICAgIH0gLy8gTWFpbnRhaW4gdGhlIGRpc3BsYXllZCBwb3NpdGlvbiAobm93IHRoYXQgd2UgY2hhbmdlZCB0aGUgZWxlbWVudCBvcmRlcilcblxuXG4gICAgICBzaWxlbnRTY3JvbGwoZ2V0U3RhdGUoKS5hY3RpdmVTZWN0aW9uLml0ZW0ub2Zmc2V0VG9wKTsgLy8gTWFpbnRhaW4gdGhlIGFjdGl2ZSBzbGlkZXMgdmlzaWJsZSBpbiB0aGUgdmlld3BvcnRcblxuICAgICAga2VlcFNsaWRlc1Bvc2l0aW9uJDEoKTsgLy8gc2F2ZSBmb3IgbGF0ZXIgdGhlIGVsZW1lbnRzIHRoYXQgc3RpbGwgbmVlZCB0byBiZSByZW9yZGVyZWRcblxuICAgICAgdi53cmFwQXJvdW5kRWxlbWVudHMgPSBhY3RpdmVTZWN0aW9uSXRlbTsgLy8gUmVjYWxjdWxhdGUgYW5pbWF0aW9uIHZhcmlhYmxlc1xuXG4gICAgICB2LmR0b3AgPSB2LmVsZW1lbnQub2Zmc2V0VG9wO1xuICAgICAgdi55TW92ZW1lbnQgPSBnZXRZbW92ZW1lbnQoZ2V0U3RhdGUoKS5hY3RpdmVTZWN0aW9uLCB2LmVsZW1lbnQpO1xuICAgICAgcmV0dXJuIHY7XG4gICAgfVxuICAgIC8qKlxuICAgICogTWFpbnRhaW5zIHRoZSBhY3RpdmUgc2xpZGVzIGluIHRoZSB2aWV3cG9ydFxuICAgICogKEJlY2F1c2UgdGhlIGBzY3JvbGxgIGFuaW1hdGlvbiBtaWdodCBnZXQgbG9zdCB3aXRoIHNvbWUgYWN0aW9ucywgc3VjaCBhcyB3aGVuIHVzaW5nIGNvbnRpbnVvdXNWZXJ0aWNhbClcbiAgICAqL1xuXG4gICAgZnVuY3Rpb24ga2VlcFNsaWRlc1Bvc2l0aW9uJDEoKSB7XG4gICAgICB2YXIgYWN0aXZlU2xpZGVzID0gJChTTElERV9BQ1RJVkVfU0VMKTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhY3RpdmVTbGlkZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc2lsZW50TGFuZHNjYXBlU2Nyb2xsKGFjdGl2ZVNsaWRlc1tpXSwgJ2ludGVybmFsJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy9AdHMtY2hlY2tcbiAgICAvKipcbiAgICAqIE1haW50YWlucyB0aGUgYWN0aXZlIHNsaWRlcyBpbiB0aGUgdmlld3BvcnRcbiAgICAqIChCZWNhdXNlIHRoZSBgc2Nyb2xsYCBhbmltYXRpb24gbWlnaHQgZ2V0IGxvc3Qgd2l0aCBzb21lIGFjdGlvbnMsIHN1Y2ggYXMgd2hlbiB1c2luZyBjb250aW51b3VzVmVydGljYWwpXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIGtlZXBTbGlkZXNQb3NpdGlvbigpIHtcbiAgICAgIHZhciBhY3RpdmVTbGlkZXMgPSAkKFNMSURFX0FDVElWRV9TRUwpO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFjdGl2ZVNsaWRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBzaWxlbnRMYW5kc2NhcGVTY3JvbGwoYWN0aXZlU2xpZGVzW2ldLCAnaW50ZXJuYWwnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgKiBGaXggc2VjdGlvbiBvcmRlciBhZnRlciBjb250aW51b3VzVmVydGljYWwgY2hhbmdlcyBoYXZlIGJlZW4gYW5pbWF0ZWRcbiAgICAqL1xuXG5cbiAgICBmdW5jdGlvbiBjb250aW51b3VzVmVydGljYWxGaXhTZWN0aW9uT3JkZXIodikge1xuICAgICAgLy8gSWYgY29udGludW91c1ZlcnRpY2FsIGlzIGluIGVmZmVjdCAoYW5kIGF1dG9TY3JvbGxpbmcgd291bGQgYWxzbyBiZSBpbiBlZmZlY3QgdGhlbiksXG4gICAgICAvLyBmaW5pc2ggbW92aW5nIHRoZSBlbGVtZW50cyBhcm91bmQgc28gdGhlIGRpcmVjdCBuYXZpZ2F0aW9uIHdpbGwgZnVuY3Rpb24gbW9yZSBzaW1wbHlcbiAgICAgIGlmICh2LndyYXBBcm91bmRFbGVtZW50cyA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHYuaXNNb3ZlbWVudFVwKSB7XG4gICAgICAgIGJlZm9yZSgkKFNFQ1RJT05fU0VMKVswXSwgdi53cmFwQXJvdW5kRWxlbWVudHMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWZ0ZXIoJChTRUNUSU9OX1NFTClbZ2V0U3RhdGUoKS5zZWN0aW9ucy5sZW5ndGggLSAxXSwgdi53cmFwQXJvdW5kRWxlbWVudHMpO1xuICAgICAgfVxuXG4gICAgICBzaWxlbnRTY3JvbGwoZ2V0U3RhdGUoKS5hY3RpdmVTZWN0aW9uLml0ZW0ub2Zmc2V0VG9wKTsgLy8gTWFpbnRhaW4gdGhlIGFjdGl2ZSBzbGlkZXMgdmlzaWJsZSBpbiB0aGUgdmlld3BvcnRcblxuICAgICAga2VlcFNsaWRlc1Bvc2l0aW9uKCk7XG4gICAgICBzZXRTdGF0ZSh7XG4gICAgICAgIGlzRG9pbmdDb250aW5vdXNWZXJ0aWNhbDogZmFsc2VcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICogTWFrZXMgc3VyZSBsYXp5bG9hZCBpcyBkb25lIGZvciBvdGhlciBzZWN0aW9ucyBpbiB0aGUgdmlld3BvcnQgdGhhdCBhcmUgbm90IHRoZVxuICAgICogYWN0aXZlIG9uZS4gXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIGxhenlMb2FkT3RoZXJzKCkge1xuICAgICAgdmFyIGhhc0F1dG9IZWlnaHRTZWN0aW9ucyA9ICQoQVVUT19IRUlHSFRfU0VMKVswXSB8fCBpc1Jlc3BvbnNpdmVNb2RlKCkgJiYgJChBVVRPX0hFSUdIVF9SRVNQT05TSVZFX1NFTClbMF07IC8vcXVpdHRpbmcgd2hlbiBpdCBkb2Vzbid0IGFwcGx5XG5cbiAgICAgIGlmICghZ2V0T3B0aW9ucygpLmxhenlMb2FkaW5nIHx8ICFoYXNBdXRvSGVpZ2h0U2VjdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSAvL21ha2luZyBzdXJlIHRvIGxhenkgbG9hZCBhdXRvLWhlaWdodCBzZWN0aW9ucyB0aGF0IGFyZSBpbiB0aGUgdmlld3BvcnRcblxuXG4gICAgICAkKFNFQ1RJT05fU0VMICsgJzpub3QoJyArIEFDVElWRV9TRUwgKyAnKScpLmZvckVhY2goZnVuY3Rpb24gKHNlY3Rpb24pIHtcbiAgICAgICAgaWYgKGlzU2VjdGlvbkluVmlld3BvcnQoc2VjdGlvbikpIHtcbiAgICAgICAgICBsYXp5TG9hZChzZWN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICogRGV0ZXJtaW5lcyB3aGV0aGVyIGEgc2VjdGlvbiBpcyBpbiB0aGUgdmlld3BvcnQgb3Igbm90LlxuICAgICovXG5cbiAgICBmdW5jdGlvbiBpc1NlY3Rpb25JblZpZXdwb3J0KGVsKSB7XG4gICAgICB2YXIgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgdmFyIHRvcCA9IHJlY3QudG9wO1xuICAgICAgdmFyIGJvdHRvbSA9IHJlY3QuYm90dG9tOyAvL3NvbWV0aW1lcyB0aGVyZSdzIGEgMXB4IG9mZnNldCBvbiB0aGUgYm90dG9tIG9mIHRoZSBzY3JlZW4gZXZlbiB3aGVuIHRoZSBcbiAgICAgIC8vc2VjdGlvbidzIGhlaWdodCBpcyB0aGUgd2luZG93LmlubmVySGVpZ2h0IG9uZS4gSSBndWVzcyBiZWNhdXNlIHBpeGVscyB3b24ndCBhbGxvdyBkZWNpbWFscy5cbiAgICAgIC8vdXNpbmcgdGhpcyBwcmV2ZW50cyBmcm9tIGxhenlMb2FkaW5nIHRoZSBzZWN0aW9uIHRoYXQgaXMgbm90IHlldCB2aXNpYmxlIFxuICAgICAgLy8ob25seSAxIHBpeGVsIG9mZnNldCBpcylcblxuICAgICAgdmFyIHBpeGVsT2Zmc2V0ID0gMjtcbiAgICAgIHZhciBpc1RvcEluVmlldyA9IHRvcCArIHBpeGVsT2Zmc2V0IDwgc3RhdGUud2luZG93c0hlaWdodCAmJiB0b3AgPiAwO1xuICAgICAgdmFyIGlzQm90dG9tSW5WaWV3ID0gYm90dG9tID4gcGl4ZWxPZmZzZXQgJiYgYm90dG9tIDwgc3RhdGUud2luZG93c0hlaWdodDtcbiAgICAgIHJldHVybiBpc1RvcEluVmlldyB8fCBpc0JvdHRvbUluVmlldztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b29sdGlwVGV4dEhhbmRsZXIoKSB7XG4gICAgICAvKmpzaGludCB2YWxpZHRoaXM6dHJ1ZSAqL1xuICAgICAgdHJpZ2dlcihwcmV2KHRoaXMpLCAnY2xpY2snKTtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBBY3RpdmF0aW5nIHRoZSB2ZXJ0aWNhbCBuYXZpZ2F0aW9uIGJ1bGxldHMgYWNjb3JkaW5nIHRvIHRoZSBnaXZlbiBzbGlkZSBuYW1lLlxuICAgICovXG5cbiAgICBmdW5jdGlvbiBhY3RpdmF0ZU5hdkRvdHMobmFtZSwgc2VjdGlvbkluZGV4KSB7XG4gICAgICB2YXIgbmF2ID0gJChTRUNUSU9OX05BVl9TRUwpWzBdO1xuXG4gICAgICBpZiAoZ2V0T3B0aW9ucygpLm5hdmlnYXRpb24gJiYgbmF2ICE9IG51bGwgJiYgbmF2LnN0eWxlLmRpc3BsYXkgIT09ICdub25lJykge1xuICAgICAgICByZW1vdmVDbGFzcygkKEFDVElWRV9TRUwsIG5hdiksIEFDVElWRSk7XG5cbiAgICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgICBhZGRDbGFzcygkKCdhW2hyZWY9XCIjJyArIG5hbWUgKyAnXCJdJywgbmF2KSwgQUNUSVZFKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhZGRDbGFzcygkKCdhJywgJCgnbGknLCBuYXYpW3NlY3Rpb25JbmRleF0pLCBBQ1RJVkUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICogQ3JlYXRlcyBhIHZlcnRpY2FsIG5hdmlnYXRpb24gYmFyLlxuICAgICovXG5cbiAgICBmdW5jdGlvbiBhZGRWZXJ0aWNhbE5hdmlnYXRpb24oKSB7XG4gICAgICByZW1vdmUoJChTRUNUSU9OX05BVl9TRUwpKTtcbiAgICAgIHZhciBuYXZpZ2F0aW9uID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgbmF2aWdhdGlvbi5zZXRBdHRyaWJ1dGUoJ2lkJywgU0VDVElPTl9OQVYpO1xuICAgICAgdmFyIGRpdlVsID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgICBuYXZpZ2F0aW9uLmFwcGVuZENoaWxkKGRpdlVsKTtcbiAgICAgIGFwcGVuZFRvKG5hdmlnYXRpb24sICRib2R5KTtcbiAgICAgIHZhciBuYXYgPSAkKFNFQ1RJT05fTkFWX1NFTClbMF07XG4gICAgICBhZGRDbGFzcyhuYXYsICdmcC0nICsgZ2V0T3B0aW9ucygpLm5hdmlnYXRpb25Qb3NpdGlvbik7XG5cbiAgICAgIGlmIChnZXRPcHRpb25zKCkuc2hvd0FjdGl2ZVRvb2x0aXApIHtcbiAgICAgICAgYWRkQ2xhc3MobmF2LCBTSE9XX0FDVElWRV9UT09MVElQKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGxpID0gJyc7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZ2V0U3RhdGUoKS5zZWN0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgc2VjdGlvbiA9IGdldFN0YXRlKCkuc2VjdGlvbnNbaV07XG4gICAgICAgIHZhciBsaW5rID0gJyc7XG5cbiAgICAgICAgaWYgKGdldE9wdGlvbnMoKS5hbmNob3JzLmxlbmd0aCkge1xuICAgICAgICAgIGxpbmsgPSBzZWN0aW9uLmFuY2hvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxpICs9ICc8bGk+PGEgaHJlZj1cIiMnICsgZW5jb2RlVVJJKGxpbmspICsgJ1wiPjxzcGFuIGNsYXNzPVwiZnAtc3Itb25seVwiPicgKyBnZXRCdWxsZXRMaW5rTmFtZShzZWN0aW9uLmluZGV4KCksICdTZWN0aW9uJykgKyAnPC9zcGFuPjxzcGFuPjwvc3Bhbj48L2E+JzsgLy8gT25seSBhZGQgdG9vbHRpcCBpZiBuZWVkZWQgKGRlZmluZWQgYnkgdXNlcilcblxuICAgICAgICB2YXIgdG9vbHRpcCA9IGdldE9wdGlvbnMoKS5uYXZpZ2F0aW9uVG9vbHRpcHNbc2VjdGlvbi5pbmRleCgpXTtcblxuICAgICAgICBpZiAodHlwZW9mIHRvb2x0aXAgIT09ICd1bmRlZmluZWQnICYmIHRvb2x0aXAgIT09ICcnKSB7XG4gICAgICAgICAgbGkgKz0gJzxkaXYgY2xhc3M9XCInICsgU0VDVElPTl9OQVZfVE9PTFRJUCArICcgZnAtJyArIGdldE9wdGlvbnMoKS5uYXZpZ2F0aW9uUG9zaXRpb24gKyAnXCI+JyArIHRvb2x0aXAgKyAnPC9kaXY+JztcbiAgICAgICAgfVxuXG4gICAgICAgIGxpICs9ICc8L2xpPic7XG4gICAgICB9XG5cbiAgICAgICQoJ3VsJywgbmF2KVswXS5pbm5lckhUTUwgPSBsaTsgLy9hY3RpdmF0aW5nIHRoZSBjdXJyZW50IGFjdGl2ZSBzZWN0aW9uXG5cbiAgICAgIHZhciBidWxsZXQgPSAkKCdsaScsICQoU0VDVElPTl9OQVZfU0VMKVswXSlbZ2V0U3RhdGUoKS5hY3RpdmVTZWN0aW9uLmluZGV4KCldO1xuICAgICAgYWRkQ2xhc3MoJCgnYScsIGJ1bGxldCksIEFDVElWRSk7XG4gICAgfSAvL1Njcm9sbHMgdG8gdGhlIHNlY3Rpb24gd2hlbiBjbGlja2luZyB0aGUgbmF2aWdhdGlvbiBidWxsZXRcblxuICAgIGZ1bmN0aW9uIHNlY3Rpb25CdWxsZXRIYW5kbGVyKGUpIHtcbiAgICAgIGlmIChlLnByZXZlbnREZWZhdWx0KSB7XG4gICAgICAgIHByZXZlbnREZWZhdWx0KGUpO1xuICAgICAgfVxuXG4gICAgICBzZXRTdGF0ZSh7XG4gICAgICAgIHNjcm9sbFRyaWdnZXI6ICd2ZXJ0aWNhbE5hdidcbiAgICAgIH0pO1xuICAgICAgLypqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi9cbiAgICAgIC8vIEB0cy1pZ25vcmVcblxuICAgICAgdmFyIGluZGV4QnVsbGV0ID0gaW5kZXgoY2xvc2VzdCh0aGlzLCBTRUNUSU9OX05BVl9TRUwgKyAnIGxpJykpO1xuICAgICAgRXZlbnRFbWl0dGVyLmVtaXQoZXZlbnRzLnNjcm9sbFBhZ2UsIHtcbiAgICAgICAgZGVzdGluYXRpb246IGdldFN0YXRlKCkuc2VjdGlvbnNbaW5kZXhCdWxsZXRdXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIFNldHMgdG8gYWN0aXZlIHRoZSBjdXJyZW50IG1lbnUgYW5kIHZlcnRpY2FsIG5hdiBpdGVtcy5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gYWN0aXZhdGVNZW51QW5kTmF2KGFuY2hvciwgaW5kZXgpIHtcbiAgICAgIGFjdGl2YXRlTWVudUVsZW1lbnQoYW5jaG9yKTtcbiAgICAgIGFjdGl2YXRlTmF2RG90cyhhbmNob3IsIGluZGV4KTtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBBY3RpdmF0aW5nIHRoZSB3ZWJzaXRlIG1haW4gbWVudSBlbGVtZW50cyBhY2NvcmRpbmcgdG8gdGhlIGdpdmVuIHNsaWRlIG5hbWUuXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIGFjdGl2YXRlTWVudUVsZW1lbnQobmFtZSkge1xuICAgICAgaWYgKGdldE9wdGlvbnMoKS5tZW51ICYmIGdldE9wdGlvbnMoKS5tZW51Lmxlbmd0aCkge1xuICAgICAgICAkKGdldE9wdGlvbnMoKS5tZW51KS5mb3JFYWNoKGZ1bmN0aW9uIChtZW51KSB7XG4gICAgICAgICAgaWYgKG1lbnUgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmVtb3ZlQ2xhc3MoJChBQ1RJVkVfU0VMLCBtZW51KSwgQUNUSVZFKTtcbiAgICAgICAgICAgIGFkZENsYXNzKCQoJ1tkYXRhLW1lbnVhbmNob3I9XCInICsgbmFtZSArICdcIl0nLCBtZW51KSwgQUNUSVZFKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIC8qKlxuICAgICAqIFRyaWdnZXJzIHRoZSBjYWxsYmFjayBvbmNlIHBlciBzY3JvbGwgd2hlZWwgYWN0aW9uLlxuICAgICAqIEJhc2VkIG9uIHNjcm9sbGluZyBzcGVlZCBkZWxheS5cbiAgICAgKi9cblxuICAgIHZhciBvbmNlUGVyU2Nyb2xsID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGNhblRyaWdnZXJFdmVudCA9IHRydWU7XG4gICAgICB2YXIgcHJldldoZWVsVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgdmFyIHJlc3VsdDtcbiAgICAgIHZhciBpc1Njcm9sbGluZ09uSW5pdCA9ICF3aW4uZnVsbHBhZ2VfYXBpO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzY3JvbGxUcmlnZ2VyLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgY3VycmVudFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgdmFyIHRpbWVUaHJlc2hvbGQgPSBzY3JvbGxUcmlnZ2VyID09PSAnd2hlZWwnID8gZ2V0T3B0aW9ucygpLnNjcm9sbGluZ1NwZWVkIDogMTAwO1xuICAgICAgICBjYW5UcmlnZ2VyRXZlbnQgPSBpc1Njcm9sbGluZ09uSW5pdCB8fCBjdXJyZW50VGltZSAtIHByZXZXaGVlbFRpbWUgPj0gdGltZVRocmVzaG9sZDtcbiAgICAgICAgaXNTY3JvbGxpbmdPbkluaXQgPSAhd2luLmZ1bGxwYWdlX2FwaTtcblxuICAgICAgICBpZiAoY2FuVHJpZ2dlckV2ZW50KSB7XG4gICAgICAgICAgcmVzdWx0ID0gY2FsbGJhY2soKTtcbiAgICAgICAgICBwcmV2V2hlZWxUaW1lID0gY3VycmVudFRpbWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHlwZW9mIHJlc3VsdCAhPT0gJ3VuZGVmaW5lZCcgPyByZXN1bHQgOiB0cnVlO1xuICAgICAgfTtcbiAgICB9KCk7XG5cbiAgICAvKipcbiAgICAqIEZpcmVzIHRoZSB3aGVlbCBldmVudCBvbmNlIHBlciBtb3VzZSB3aGVlbCB0cmlnZ2VyLlxuICAgICovXG5cbiAgICBmdW5jdGlvbiBmaXJlQ2FsbGJhY2tPbmNlUGVyU2Nyb2xsKGNhbGxiYWNrTmFtZSwgcGFyYW1zKSB7XG4gICAgICBpZiAoIWlzRnVuY3Rpb24oZ2V0T3B0aW9ucygpLmJlZm9yZUxlYXZlKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciByZXN1bHQgPSBvbmNlUGVyU2Nyb2xsKGdldFN0YXRlKCkuc2Nyb2xsVHJpZ2dlciwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZmlyZUNhbGxiYWNrKGNhbGxiYWNrTmFtZSwgcGFyYW1zKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBGUC5tb3ZlVG8gPSBtb3ZlVG87XG5cbiAgICBGUC5nZXRTY3JvbGxZID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHN0YXRlLnNjcm9sbFk7XG4gICAgfTtcblxuICAgIHZhciBnX2FmdGVyU2VjdGlvbkxvYWRzSWQ7XG4gICAgdmFyIGdfdHJhbnNpdGlvbkxhcHNlSWQ7XG4gICAgRXZlbnRFbWl0dGVyLm9uKGV2ZW50cy5vbkRlc3Ryb3ksIG9uRGVzdHJveSQ2KTtcbiAgICAvKipcbiAgICAqIFNjcm9sbHMgdGhlIHNpdGUgdG8gdGhlIGdpdmVuIGVsZW1lbnQgYW5kIHNjcm9sbHMgdG8gdGhlIHNsaWRlIGlmIGEgY2FsbGJhY2sgaXMgZ2l2ZW4uXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIHNjcm9sbFBhZ2Uoc2VjdGlvbiwgY2FsbGJhY2ssIGlzTW92ZW1lbnRVcCkge1xuICAgICAgdmFyIGVsZW1lbnQgPSBzZWN0aW9uLml0ZW07XG5cbiAgICAgIGlmIChlbGVtZW50ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSAvL3RoZXJlJ3Mgbm8gZWxlbWVudCB0byBzY3JvbGwsIGxlYXZpbmcgdGhlIGZ1bmN0aW9uXG5cblxuICAgICAgdmFyIGR0b3AgPSBnZXREZXN0aW5hdGlvblBvc2l0aW9uKGVsZW1lbnQpO1xuICAgICAgdmFyIHNsaWRlQW5jaG9yTGluaztcbiAgICAgIHZhciBzbGlkZUluZGV4OyAvL2xvY2FsIHZhcmlhYmxlc1xuXG4gICAgICB2YXIgdiA9IHtcbiAgICAgICAgXCJlbGVtZW50XCI6IGVsZW1lbnQsXG4gICAgICAgIFwiY2FsbGJhY2tcIjogY2FsbGJhY2ssXG4gICAgICAgIFwiaXNNb3ZlbWVudFVwXCI6IGlzTW92ZW1lbnRVcCxcbiAgICAgICAgXCJkdG9wXCI6IGR0b3AsXG4gICAgICAgIFwieU1vdmVtZW50XCI6IGdldFltb3ZlbWVudChnZXRTdGF0ZSgpLmFjdGl2ZVNlY3Rpb24sIGVsZW1lbnQpLFxuICAgICAgICBcImFuY2hvckxpbmtcIjogc2VjdGlvbi5hbmNob3IsXG4gICAgICAgIFwic2VjdGlvbkluZGV4XCI6IHNlY3Rpb24uaW5kZXgoKSxcbiAgICAgICAgXCJhY3RpdmVTbGlkZVwiOiBzZWN0aW9uLmFjdGl2ZVNsaWRlID8gc2VjdGlvbi5hY3RpdmVTbGlkZS5pdGVtIDogbnVsbCxcbiAgICAgICAgXCJsZWF2aW5nU2VjdGlvblwiOiBnZXRTdGF0ZSgpLmFjdGl2ZVNlY3Rpb24uaW5kZXgoKSArIDEsXG4gICAgICAgIC8vY2FjaGluZyB0aGUgdmFsdWUgb2YgaXNSZXNpemluZyBhdCB0aGUgbW9tbWVudCB0aGUgZnVuY3Rpb24gaXMgY2FsbGVkXG4gICAgICAgIC8vYmVjYXVzZSBpdCB3aWxsIGJlIGNoZWNrZWQgbGF0ZXIgaW5zaWRlIGEgc2V0VGltZW91dCBhbmQgdGhlIHZhbHVlIG1pZ2h0IGNoYW5nZVxuICAgICAgICBcImxvY2FsSXNSZXNpemluZ1wiOiBzdGF0ZS5pc1Jlc2l6aW5nLFxuICAgICAgICBcIml0ZW1zXCI6IHtcbiAgICAgICAgICBcIm9yaWdpblwiOiBnZXRTdGF0ZSgpLmFjdGl2ZVNlY3Rpb24sXG4gICAgICAgICAgXCJkZXN0aW5hdGlvblwiOiBzZWN0aW9uXG4gICAgICAgIH0sXG4gICAgICAgIFwiZGlyZWN0aW9uXCI6IG51bGxcbiAgICAgIH07IC8vcXVpdGluZyB3aGVuIGRlc3RpbmF0aW9uIHNjcm9sbCBpcyB0aGUgc2FtZSBhcyB0aGUgY3VycmVudCBvbmVcblxuICAgICAgaWYgKGdldFN0YXRlKCkuYWN0aXZlU2VjdGlvbi5pdGVtID09IGVsZW1lbnQgJiYgIXN0YXRlLmlzUmVzaXppbmcgfHwgZ2V0T3B0aW9ucygpLnNjcm9sbEJhciAmJiBnZXRTY3JvbGxUb3AoKSA9PT0gdi5kdG9wICYmICFoYXNDbGFzcyhlbGVtZW50LCBBVVRPX0hFSUdIVCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodi5hY3RpdmVTbGlkZSAhPSBudWxsKSB7XG4gICAgICAgIHNsaWRlQW5jaG9yTGluayA9IGdldEF0dHIodi5hY3RpdmVTbGlkZSwgJ2RhdGEtYW5jaG9yJyk7XG4gICAgICAgIHNsaWRlSW5kZXggPSBpbmRleCh2LmFjdGl2ZVNsaWRlLCBudWxsKTtcbiAgICAgIH0gLy9jYWxsYmFjayAob25MZWF2ZSkgaWYgdGhlIHNpdGUgaXMgbm90IGp1c3QgcmVzaXppbmcgYW5kIHJlYWRqdXN0aW5nIHRoZSBzbGlkZXNcblxuXG4gICAgICBpZiAoIXYubG9jYWxJc1Jlc2l6aW5nKSB7XG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSB2LnlNb3ZlbWVudDsgLy9yZXF1aXJlZCBmb3IgY29udGlub3VzVmVydGljYWxcblxuICAgICAgICBpZiAodHlwZW9mIGlzTW92ZW1lbnRVcCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBkaXJlY3Rpb24gPSBpc01vdmVtZW50VXAgPyAndXAnIDogJ2Rvd24nO1xuICAgICAgICB9IC8vZm9yIHRoZSBjYWxsYmFja1xuXG5cbiAgICAgICAgdi5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24oZ2V0T3B0aW9ucygpLmJlZm9yZUxlYXZlKSkge1xuICAgICAgICAgIGlmIChmaXJlQ2FsbGJhY2tPbmNlUGVyU2Nyb2xsKCdiZWZvcmVMZWF2ZScsIHYpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKGdldE9wdGlvbnMoKS5vbkxlYXZlKSkge1xuICAgICAgICAgIGlmICghZmlyZUNhbGxiYWNrKCdvbkxlYXZlJywgdikpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gLy8gSWYgY29udGludW91c1ZlcnRpY2FsICYmIHdlIG5lZWQgdG8gd3JhcCBhcm91bmRcblxuXG4gICAgICBpZiAoZ2V0T3B0aW9ucygpLmF1dG9TY3JvbGxpbmcgJiYgZ2V0T3B0aW9ucygpLmNvbnRpbnVvdXNWZXJ0aWNhbCAmJiB0eXBlb2Ygdi5pc01vdmVtZW50VXAgIT09IFwidW5kZWZpbmVkXCIgJiYgKCF2LmlzTW92ZW1lbnRVcCAmJiB2LnlNb3ZlbWVudCA9PSAndXAnIHx8IC8vIEludGVuZGluZyB0byBzY3JvbGwgZG93biBidXQgYWJvdXQgdG8gZ28gdXAgb3JcbiAgICAgIHYuaXNNb3ZlbWVudFVwICYmIHYueU1vdmVtZW50ID09ICdkb3duJykpIHtcbiAgICAgICAgLy8gaW50ZW5kaW5nIHRvIHNjcm9sbCB1cCBidXQgYWJvdXQgdG8gZ28gZG93blxuICAgICAgICB2ID0gY3JlYXRlSW5maW5pdGVTZWN0aW9ucyh2KTtcbiAgICAgIH0gLy9wYXVzaW5nIG1lZGlhIG9mIHRoZSBsZWF2aW5nIHNlY3Rpb24gKGlmIHdlIGFyZSBub3QganVzdCByZXNpemluZywgYXMgZGVzdGluYXRpbm8gd2lsbCBiZSB0aGUgc2FtZSBvbmUpXG5cblxuICAgICAgaWYgKCF2LmxvY2FsSXNSZXNpemluZykge1xuICAgICAgICBzdG9wTWVkaWEoZ2V0U3RhdGUoKS5hY3RpdmVTZWN0aW9uLml0ZW0pO1xuICAgICAgfVxuXG4gICAgICBhZGRDbGFzcyhlbGVtZW50LCBBQ1RJVkUpO1xuICAgICAgcmVtb3ZlQ2xhc3Moc2libGluZ3MoZWxlbWVudCksIEFDVElWRSk7XG4gICAgICB1cGRhdGVTdGF0ZSgpO1xuICAgICAgbGF6eUxvYWQoZWxlbWVudCk7IC8vcHJldmVudGluZyBmcm9tIGFjdGl2YXRpbmcgdGhlIE1vdXNlV2hlZWxIYW5kbGVyIGV2ZW50XG4gICAgICAvL21vcmUgdGhhbiBvbmNlIGlmIHRoZSBwYWdlIGlzIHNjcm9sbGluZ1xuXG4gICAgICBzZXRTdGF0ZSh7XG4gICAgICAgIGNhblNjcm9sbDogRlAudGVzdC5pc1Rlc3RpbmdcbiAgICAgIH0pO1xuICAgICAgc2V0UGFnZVN0YXR1cyhzbGlkZUluZGV4LCBzbGlkZUFuY2hvckxpbmssIHYuYW5jaG9yTGluayk7XG4gICAgICBwZXJmb3JtTW92ZW1lbnQodik7IC8vZmxhZyB0byBhdm9pZCBjYWxsaW5nbiBgc2Nyb2xsUGFnZSgpYCB0d2ljZSBpbiBjYXNlIG9mIHVzaW5nIGFuY2hvciBsaW5rc1xuXG4gICAgICBzZXRTdGF0ZSh7XG4gICAgICAgIGxhc3RTY3JvbGxlZERlc3Rpbnk6IHYuYW5jaG9yTGlua1xuICAgICAgfSk7IC8vYXZvaWQgZmlyaW5nIGl0IHR3aWNlIChhcyBpdCBkb2VzIGFsc28gb24gc2Nyb2xsKVxuXG4gICAgICBhY3RpdmF0ZU1lbnVBbmROYXYodi5hbmNob3JMaW5rLCB2LnNlY3Rpb25JbmRleCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25EZXN0cm95JDYoKSB7XG4gICAgICBjbGVhclRpbWVvdXQoZ19hZnRlclNlY3Rpb25Mb2Fkc0lkKTtcbiAgICAgIGNsZWFyVGltZW91dChnX3RyYW5zaXRpb25MYXBzZUlkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBSZXR1cm5zIHRoZSBkZXN0aW5hdGlvbiBZIHBvc2l0aW9uIGJhc2VkIG9uIHRoZSBzY3JvbGxpbmcgZGlyZWN0aW9uIGFuZFxuICAgICogdGhlIGhlaWdodCBvZiB0aGUgc2VjdGlvbi5cbiAgICAqL1xuXG5cbiAgICBmdW5jdGlvbiBnZXREZXN0aW5hdGlvblBvc2l0aW9uKGVsZW1lbnQpIHtcbiAgICAgIHZhciBlbGVtZW50SGVpZ2h0ID0gZWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgICB2YXIgZWxlbWVudFRvcCA9IGVsZW1lbnQub2Zmc2V0VG9wOyAvL3RvcCBvZiB0aGUgZGVzaW5hdGlvbiB3aWxsIGJlIGF0IHRoZSB0b3Agb2YgdGhlIHZpZXdwb3J0XG5cbiAgICAgIHZhciBwb3NpdGlvbiA9IGVsZW1lbnRUb3A7XG4gICAgICB2YXIgaXNTY3JvbGxpbmdEb3duID0gZWxlbWVudFRvcCA+IHN0YXRlLnByZXZpb3VzRGVzdFRvcDtcbiAgICAgIHZhciBzZWN0aW9uQm90dG9tID0gcG9zaXRpb24gLSBnZXRXaW5kb3dIZWlnaHQoKSArIGVsZW1lbnRIZWlnaHQ7XG4gICAgICB2YXIgYmlnU2VjdGlvbnNEZXN0aW5hdGlvbiA9IGdldE9wdGlvbnMoKS5iaWdTZWN0aW9uc0Rlc3RpbmF0aW9uOyAvL2lzIHRoZSBkZXN0aW5hdGlvbiBlbGVtZW50IGJpZ2dlciB0aGFuIHRoZSB2aWV3cG9ydD9cblxuICAgICAgaWYgKGVsZW1lbnRIZWlnaHQgPiBnZXRXaW5kb3dIZWlnaHQoKSkge1xuICAgICAgICAvL3Njcm9sbGluZyB1cD9cbiAgICAgICAgaWYgKCFpc1Njcm9sbGluZ0Rvd24gJiYgIWJpZ1NlY3Rpb25zRGVzdGluYXRpb24gfHwgYmlnU2VjdGlvbnNEZXN0aW5hdGlvbiA9PT0gJ2JvdHRvbScpIHtcbiAgICAgICAgICBwb3NpdGlvbiA9IHNlY3Rpb25Cb3R0b207XG4gICAgICAgIH1cbiAgICAgIH0gLy9zZWN0aW9ucyBlcXVhbCBvciBzbWFsbGVyIHRoYW4gdGhlIHZpZXdwb3J0IGhlaWdodCAmJiBzY3JvbGxpbmcgZG93bj8gfHwgIGlzIHJlc2l6aW5nIGFuZCBpdHMgaW4gdGhlIGxhc3Qgc2VjdGlvblxuICAgICAgZWxzZSBpZiAoaXNTY3JvbGxpbmdEb3duIHx8IHN0YXRlLmlzUmVzaXppbmcgJiYgbmV4dChlbGVtZW50KSA9PSBudWxsKSB7XG4gICAgICAgIC8vVGhlIGJvdHRvbSBvZiB0aGUgZGVzdGluYXRpb24gd2lsbCBiZSBhdCB0aGUgYm90dG9tIG9mIHRoZSB2aWV3cG9ydFxuICAgICAgICBwb3NpdGlvbiA9IHNlY3Rpb25Cb3R0b207XG4gICAgICB9XG4gICAgICAvKlxuICAgICAgS2VlcGluZyByZWNvcmQgb2YgdGhlIGxhc3Qgc2Nyb2xsZWQgcG9zaXRpb24gdG8gZGV0ZXJtaW5lIHRoZSBzY3JvbGxpbmcgZGlyZWN0aW9uLlxuICAgICAgTm8gY29udmVudGlvbmFsIG1ldGhvZHMgY2FuIGJlIHVzZWQgYXMgdGhlIHNjcm9sbCBiYXIgbWlnaHQgbm90IGJlIHByZXNlbnRcbiAgICAgIEFORCB0aGUgc2VjdGlvbiBtaWdodCBub3QgYmUgYWN0aXZlIGlmIGl0IGlzIGF1dG8taGVpZ2h0IGFuZCBkaWRudCByZWFjaCB0aGUgbWlkZGxlXG4gICAgICBvZiB0aGUgdmlld3BvcnQuXG4gICAgICAqL1xuXG5cbiAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgcHJldmlvdXNEZXN0VG9wOiBwb3NpdGlvblxuICAgICAgfSk7XG4gICAgICByZXR1cm4gcG9zaXRpb247XG4gICAgfVxuICAgIC8qKlxuICAgICogUGVyZm9ybXMgdGhlIHZlcnRpY2FsIG1vdmVtZW50IChieSBDU1MzIG9yIGJ5IGpRdWVyeSlcbiAgICAqL1xuXG5cbiAgICBmdW5jdGlvbiBwZXJmb3JtTW92ZW1lbnQodikge1xuICAgICAgdmFyIGlzRmFzdFNwZWVkID0gZ2V0T3B0aW9ucygpLnNjcm9sbGluZ1NwZWVkIDwgNzAwO1xuICAgICAgdmFyIHRyYW5zaXRpb25MYXBzZSA9IGlzRmFzdFNwZWVkID8gNzAwIDogZ2V0T3B0aW9ucygpLnNjcm9sbGluZ1NwZWVkO1xuICAgICAgc2V0U3RhdGUoe1xuICAgICAgICB0b3VjaERpcmVjdGlvbjogJ25vbmUnLFxuICAgICAgICBzY3JvbGxZOiBNYXRoLnJvdW5kKHYuZHRvcClcbiAgICAgIH0pO1xuICAgICAgRXZlbnRFbWl0dGVyLmVtaXQoZXZlbnRzLm9uUGVyZm9ybU1vdmVtZW50KTsgLy8gdXNpbmcgQ1NTMyB0cmFuc2xhdGUgZnVuY3Rpb25hbGl0eVxuXG4gICAgICBpZiAoZ2V0T3B0aW9ucygpLmNzczMgJiYgZ2V0T3B0aW9ucygpLmF1dG9TY3JvbGxpbmcgJiYgIWdldE9wdGlvbnMoKS5zY3JvbGxCYXIpIHtcbiAgICAgICAgLy8gVGhlIGZpcnN0IHNlY3Rpb24gY2FuIGhhdmUgYSBuZWdhdGl2ZSB2YWx1ZSBpbiBpT1MgMTAuIE5vdCBxdWl0ZSBzdXJlIHdoeTogLTAuMDE0MjgyMjI2NTYyNVxuICAgICAgICAvLyB0aGF0J3Mgd2h5IHdlIHJvdW5kIGl0IHRvIDAuXG4gICAgICAgIHZhciB0cmFuc2xhdGUzZCA9ICd0cmFuc2xhdGUzZCgwcHgsIC0nICsgTWF0aC5yb3VuZCh2LmR0b3ApICsgJ3B4LCAwcHgpJztcbiAgICAgICAgdHJhbnNmb3JtQ29udGFpbmVyKHRyYW5zbGF0ZTNkLCB0cnVlKTsgLy9ldmVuIHdoZW4gdGhlIHNjcm9sbGluZ1NwZWVkIGlzIDAgdGhlcmUncyBhIGxpdHRsZSBkZWxheSwgd2hpY2ggbWlnaHQgY2F1c2UgdGhlXG4gICAgICAgIC8vc2Nyb2xsaW5nU3BlZWQgdG8gY2hhbmdlIGluIGNhc2Ugb2YgdXNpbmcgc2lsZW50TW92ZVRvKCk7w6dcblxuICAgICAgICBpZiAoZ2V0T3B0aW9ucygpLnNjcm9sbGluZ1NwZWVkKSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KGdfYWZ0ZXJTZWN0aW9uTG9hZHNJZCk7XG4gICAgICAgICAgZ19hZnRlclNlY3Rpb25Mb2Fkc0lkID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBhZnRlclNlY3Rpb25Mb2FkcyQxKHYpOyAvL2Rpc2FibGluZyBjYW5TY3JvbGwgd2hlbiB1c2luZyBmYXN0U3BlZWRcblxuICAgICAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgICAgICBjYW5TY3JvbGw6ICFpc0Zhc3RTcGVlZCB8fCBGUC50ZXN0LmlzVGVzdGluZ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSwgZ2V0T3B0aW9ucygpLnNjcm9sbGluZ1NwZWVkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhZnRlclNlY3Rpb25Mb2FkcyQxKHYpO1xuICAgICAgICB9XG4gICAgICB9IC8vIHVzaW5nIEpTIHRvIGFuaW1hdGVcbiAgICAgIGVsc2Uge1xuICAgICAgICB2YXIgc2Nyb2xsU2V0dGluZ3MgPSBnZXRTY3JvbGxTZXR0aW5ncyh2LmR0b3ApO1xuICAgICAgICBGUC50ZXN0LnRvcCA9IC12LmR0b3AgKyAncHgnO1xuICAgICAgICBjbGVhclRpbWVvdXQoZ19hZnRlclNlY3Rpb25Mb2Fkc0lkKTtcbiAgICAgICAgc2Nyb2xsVG8oc2Nyb2xsU2V0dGluZ3MuZWxlbWVudCwgc2Nyb2xsU2V0dGluZ3Mub3B0aW9ucywgZ2V0T3B0aW9ucygpLnNjcm9sbGluZ1NwZWVkLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKGdldE9wdGlvbnMoKS5zY3JvbGxCYXIpIHtcbiAgICAgICAgICAgIC8qIEhhY2shXG4gICAgICAgICAgICBUaGUgdGltZW91dCBwcmV2ZW50cyBzZXR0aW5nIHRoZSBtb3N0IGRvbWluYW50IHNlY3Rpb24gaW4gdGhlIHZpZXdwb3J0IGFzIFwiYWN0aXZlXCIgd2hlbiB0aGUgdXNlclxuICAgICAgICAgICAgc2Nyb2xsZWQgdG8gYSBzbWFsbGVyIHNlY3Rpb24gYnkgdXNpbmcgdGhlIG1vdXNld2hlZWwgKGF1dG8gc2Nyb2xsaW5nKSByYXRoZXIgdGhhbiBkcmFnaW5nIHRoZSBzY3JvbGwgYmFyLlxuICAgICAgICAgICAgIFdoZW4gdXNpbmcgc2Nyb2xsQmFyOnRydWUgSXQgc2VlbXMgbGlrZSB0aGUgc2Nyb2xsIGV2ZW50cyBzdGlsbCBnZXR0aW5nIHByb3BhZ2F0ZWQgZXZlbiBhZnRlciB0aGUgc2Nyb2xsaW5nIGFuaW1hdGlvbiBoYXMgZmluaXNoZWQuXG4gICAgICAgICAgICAqL1xuICAgICAgICAgICAgZ19hZnRlclNlY3Rpb25Mb2Fkc0lkID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIGFmdGVyU2VjdGlvbkxvYWRzJDEodik7XG4gICAgICAgICAgICB9LCAzMCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFmdGVyU2VjdGlvbkxvYWRzJDEodik7IC8vZGlzYWJsaW5nIGNhblNjcm9sbCB3aGVuIHVzaW5nIGZhc3RTcGVlZFxuXG4gICAgICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgICAgIGNhblNjcm9sbDogIWlzRmFzdFNwZWVkIHx8IEZQLnRlc3QuaXNUZXN0aW5nXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSAvLyBlbmFibGluZyBjYW5TY3JvbGwgYWZ0ZXIgdGhlIG1pbmltdW0gdHJhbnNpdGlvbiBsYXBzXG5cblxuICAgICAgaWYgKGlzRmFzdFNwZWVkKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChnX3RyYW5zaXRpb25MYXBzZUlkKTtcbiAgICAgICAgZ190cmFuc2l0aW9uTGFwc2VJZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICAgIGNhblNjcm9sbDogdHJ1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9LCB0cmFuc2l0aW9uTGFwc2UpO1xuICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAqIEFjdGlvbnMgdG8gZG8gb25jZSB0aGUgc2VjdGlvbiBpcyBsb2FkZWQuXG4gICAgKi9cblxuXG4gICAgZnVuY3Rpb24gYWZ0ZXJTZWN0aW9uTG9hZHMkMSh2KSB7XG4gICAgICBzZXRTdGF0ZSh7XG4gICAgICAgIGlzQmV5b25kRnVsbHBhZ2U6IGZhbHNlXG4gICAgICB9KTtcbiAgICAgIGNvbnRpbnVvdXNWZXJ0aWNhbEZpeFNlY3Rpb25PcmRlcih2KTsgLy9jYWxsYmFjayAoYWZ0ZXJMb2FkKSBpZiB0aGUgc2l0ZSBpcyBub3QganVzdCByZXNpemluZyBhbmQgcmVhZGp1c3RpbmcgdGhlIHNsaWRlc1xuXG4gICAgICBpZiAoaXNGdW5jdGlvbihnZXRPcHRpb25zKCkuYWZ0ZXJMb2FkKSAmJiAhdi5sb2NhbElzUmVzaXppbmcpIHtcbiAgICAgICAgZmlyZUNhbGxiYWNrKCdhZnRlckxvYWQnLCB2KTtcbiAgICAgIH1cblxuICAgICAgdXBkYXRlU3RhdGUoKTtcblxuICAgICAgaWYgKCF2LmxvY2FsSXNSZXNpemluZykge1xuICAgICAgICBwbGF5TWVkaWEodi5lbGVtZW50KTtcbiAgICAgIH1cblxuICAgICAgYWRkQ2xhc3Modi5lbGVtZW50LCBDT01QTEVURUxZKTtcbiAgICAgIHJlbW92ZUNsYXNzKHNpYmxpbmdzKHYuZWxlbWVudCksIENPTVBMRVRFTFkpO1xuICAgICAgbGF6eUxvYWRPdGhlcnMoKTtcbiAgICAgIHNjcm9sbE92ZXJmbG93SGFuZGxlci5hZnRlclNlY3Rpb25Mb2FkcygpO1xuICAgICAgc2V0U3RhdGUoe1xuICAgICAgICBjYW5TY3JvbGw6IHRydWVcbiAgICAgIH0pO1xuICAgICAgRXZlbnRFbWl0dGVyLmVtaXQoZXZlbnRzLmFmdGVyU2VjdGlvbkxvYWRzLCB2KTtcblxuICAgICAgaWYgKGlzRnVuY3Rpb24odi5jYWxsYmFjaykpIHtcbiAgICAgICAgdi5jYWxsYmFjaygpO1xuICAgICAgfVxuICAgIH1cblxuICAgIEZQLnNldEZpdFRvU2VjdGlvbiA9IHNldEZpdFRvU2VjdGlvbjtcbiAgICBGUC5maXRUb1NlY3Rpb24gPSBmaXRUb1NlY3Rpb247XG4gICAgLyoqXG4gICAgKiBTZXRzIGZpdFRvU2VjdGlvblxuICAgICovXG5cbiAgICBmdW5jdGlvbiBzZXRGaXRUb1NlY3Rpb24odmFsdWUsIHR5cGUpIHtcbiAgICAgIHNldFZhcmlhYmxlU3RhdGUoJ2ZpdFRvU2VjdGlvbicsIHZhbHVlLCB0eXBlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBGaXRzIHRoZSBzaXRlIHRvIHRoZSBuZWFyZXN0IGFjdGl2ZSBzZWN0aW9uXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIGZpdFRvU2VjdGlvbigpIHtcbiAgICAgIC8vY2hlY2tpbmcgZml0VG9TZWN0aW9uIGFnYWluIGluIGNhc2UgaXQgd2FzIHNldCB0byBmYWxzZSBiZWZvcmUgdGhlIHRpbWVvdXQgZGVsYXlcbiAgICAgIGlmIChzdGF0ZS5jYW5TY3JvbGwpIHtcbiAgICAgICAgLy9hbGxvd3MgdG8gc2Nyb2xsIHRvIGFuIGFjdGl2ZSBzZWN0aW9uIGFuZFxuICAgICAgICAvL2lmIHRoZSBzZWN0aW9uIGlzIGFscmVhZHkgYWN0aXZlLCB3ZSBwcmV2ZW50IGZpcmluZyBjYWxsYmFja3NcbiAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgIGlzUmVzaXppbmc6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIHNjcm9sbFBhZ2Uoc3RhdGUuYWN0aXZlU2VjdGlvbik7XG4gICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICBpc1Jlc2l6aW5nOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBGUC5zZXRSZXNwb25zaXZlID0gc2V0UmVzcG9uc2l2ZTtcbiAgICAvKipcbiAgICAqIENoZWNrcyBpZiB0aGUgc2l0ZSBuZWVkcyB0byBnZXQgcmVzcG9uc2l2ZSBhbmQgZGlzYWJsZXMgYXV0b1Njcm9sbGluZyBpZiBzby5cbiAgICAqIEEgY2xhc3MgYGZwLXJlc3BvbnNpdmVgIGlzIGFkZGVkIHRvIHRoZSBwbHVnaW4ncyBjb250YWluZXIgaW4gY2FzZSB0aGUgdXNlciB3YW50cyB0byB1c2UgaXQgZm9yIGhpcyBvd24gcmVzcG9uc2l2ZSBDU1MuXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIHJlc3BvbnNpdmUoKSB7XG4gICAgICB2YXIgd2lkdGhMaW1pdCA9IGdldE9wdGlvbnMoKS5yZXNwb25zaXZlIHx8IGdldE9wdGlvbnMoKS5yZXNwb25zaXZlV2lkdGg7IC8vYmFja3dhcmRzIGNvbXBhdGlibGl0eVxuXG4gICAgICB2YXIgaGVpZ2h0TGltaXQgPSBnZXRPcHRpb25zKCkucmVzcG9uc2l2ZUhlaWdodDsgLy9vbmx5IGNhbGN1bGF0aW5nIHdoYXQgd2UgbmVlZC4gUmVtZW1iZXIgaXRzIGNhbGxlZCBvbiB0aGUgcmVzaXplIGV2ZW50LlxuXG4gICAgICB2YXIgaXNCcmVha2luZ1BvaW50V2lkdGggPSB3aWR0aExpbWl0ICYmIHdpbi5pbm5lcldpZHRoIDwgd2lkdGhMaW1pdDtcbiAgICAgIHZhciBpc0JyZWFraW5nUG9pbnRIZWlnaHQgPSBoZWlnaHRMaW1pdCAmJiB3aW4uaW5uZXJIZWlnaHQgPCBoZWlnaHRMaW1pdDtcblxuICAgICAgaWYgKHdpZHRoTGltaXQgJiYgaGVpZ2h0TGltaXQpIHtcbiAgICAgICAgc2V0UmVzcG9uc2l2ZShpc0JyZWFraW5nUG9pbnRXaWR0aCB8fCBpc0JyZWFraW5nUG9pbnRIZWlnaHQpO1xuICAgICAgfSBlbHNlIGlmICh3aWR0aExpbWl0KSB7XG4gICAgICAgIHNldFJlc3BvbnNpdmUoaXNCcmVha2luZ1BvaW50V2lkdGgpO1xuICAgICAgfSBlbHNlIGlmIChoZWlnaHRMaW1pdCkge1xuICAgICAgICBzZXRSZXNwb25zaXZlKGlzQnJlYWtpbmdQb2ludEhlaWdodCk7XG4gICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICogVHVybnMgZnVsbFBhZ2UuanMgdG8gbm9ybWFsIHNjcm9sbGluZyBtb2RlIHdoZW4gdGhlIHZpZXdwb3J0IGB3aWR0aGAgb3IgYGhlaWdodGBcbiAgICAqIGFyZSBzbWFsbGVyIHRoYW4gdGhlIHNldCBsaW1pdCB2YWx1ZXMuXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIHNldFJlc3BvbnNpdmUoYWN0aXZlKSB7XG4gICAgICB2YXIgaXNSZXNwb25zaXZlID0gaXNSZXNwb25zaXZlTW9kZSgpO1xuXG4gICAgICBpZiAoYWN0aXZlKSB7XG4gICAgICAgIGlmICghaXNSZXNwb25zaXZlKSB7XG4gICAgICAgICAgc2V0QXV0b1Njcm9sbGluZyhmYWxzZSwgJ2ludGVybmFsJyk7XG4gICAgICAgICAgc2V0Rml0VG9TZWN0aW9uKGZhbHNlLCAnaW50ZXJuYWwnKTtcbiAgICAgICAgICBoaWRlKCQoU0VDVElPTl9OQVZfU0VMKSk7XG4gICAgICAgICAgYWRkQ2xhc3MoJGJvZHksIFJFU1BPTlNJVkUpO1xuXG4gICAgICAgICAgaWYgKGlzRnVuY3Rpb24oZ2V0T3B0aW9ucygpLmFmdGVyUmVzcG9uc2l2ZSkpIHtcbiAgICAgICAgICAgIGdldE9wdGlvbnMoKS5hZnRlclJlc3BvbnNpdmUuY2FsbChnZXRDb250YWluZXIoKSwgYWN0aXZlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaXNSZXNwb25zaXZlKSB7XG4gICAgICAgIHNldEF1dG9TY3JvbGxpbmcoZ2V0T3JpZ2luYWxzKCkuYXV0b1Njcm9sbGluZywgJ2ludGVybmFsJyk7XG4gICAgICAgIHNldEZpdFRvU2VjdGlvbihnZXRPcmlnaW5hbHMoKS5hdXRvU2Nyb2xsaW5nLCAnaW50ZXJuYWwnKTtcbiAgICAgICAgc2hvdygkKFNFQ1RJT05fTkFWX1NFTCkpO1xuICAgICAgICByZW1vdmVDbGFzcygkYm9keSwgUkVTUE9OU0lWRSk7XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24oZ2V0T3B0aW9ucygpLmFmdGVyUmVzcG9uc2l2ZSkpIHtcbiAgICAgICAgICBnZXRPcHRpb25zKCkuYWZ0ZXJSZXNwb25zaXZlLmNhbGwoZ2V0Q29udGFpbmVyKCksIGFjdGl2ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgZnVsbHBhZ2UuanMgaXMgaW4gcmVzcG9uc2l2ZSBtb2RlIG9yIG5vdC5cbiAgICAqL1xuXG5cbiAgICBmdW5jdGlvbiBpc1Jlc3BvbnNpdmVNb2RlKCkge1xuICAgICAgcmV0dXJuIGhhc0NsYXNzKCRib2R5LCBSRVNQT05TSVZFKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRUYWJsZUNsYXNzKGVsZW1lbnQpIHtcbiAgICAgIGlmICghZ2V0T3B0aW9ucygpLnZlcnRpY2FsQ2VudGVyZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSAvLyBPdmVyZmxvd2luZyBzZWN0aW9ucyB3aGVuIHNjcm9sbE92ZXJmbG93IGlzIGRpc2FibGVkIHdpbGwgYmUgYXV0b0hlaWdodFxuICAgICAgLy8gYW5kIHdvbid0IHJlcXVpcmUgdmVydGljYWwgYWxpZ21lbnRcblxuXG4gICAgICBpZiAoIWdldE9wdGlvbnMoKS5zY3JvbGxPdmVyZmxvdyAmJiBzY3JvbGxPdmVyZmxvd0hhbmRsZXIuc2hvdWxkQmVTY3JvbGxhYmxlKGVsZW1lbnQuaXRlbSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXNjcm9sbE92ZXJmbG93SGFuZGxlci5pc1Njcm9sbGFibGUoZWxlbWVudCkpIHtcbiAgICAgICAgLy9JbiBjYXNlIHdlIGFyZSBzdHlsaW5nIGZvciB0aGUgMm5kIHRpbWUgYXMgaW4gd2l0aCByZXBvbnNpdmVTbGlkZXNcbiAgICAgICAgaWYgKCFoYXNDbGFzcyhlbGVtZW50Lml0ZW0sIFRBQkxFKSkge1xuICAgICAgICAgIGFkZENsYXNzKGVsZW1lbnQuaXRlbSwgVEFCTEUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHN0YXJ0aW5nU2VjdGlvbiA9IG51bGw7XG4gICAgRlAuZ2V0QWN0aXZlU2VjdGlvbiA9IGdldEFjdGl2ZVNlY3Rpb247XG4gICAgZnVuY3Rpb24gZ2V0U3RhcnRpbmdTZWN0aW9uKCkge1xuICAgICAgcmV0dXJuIHN0YXJ0aW5nU2VjdGlvbjtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBTdHlsaW5nIHZlcnRpY2FsIHNlY3Rpb25zXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIHN0eWxlU2VjdGlvbihzZWN0aW9uKSB7XG4gICAgICB2YXIgc2VjdGlvbkVsZW0gPSBzZWN0aW9uLml0ZW07XG4gICAgICB2YXIgaGFzU2xpZGVzID0gc2VjdGlvbi5hbGxTbGlkZXNJdGVtcy5sZW5ndGg7XG4gICAgICB2YXIgaW5kZXggPSBzZWN0aW9uLmluZGV4KCk7IC8vaWYgbm8gYWN0aXZlIHNlY3Rpb24gaXMgZGVmaW5lZCwgdGhlIDFzdCBvbmUgd2lsbCBiZSB0aGUgZGVmYXVsdCBvbmVcblxuICAgICAgaWYgKCFnZXRTdGF0ZSgpLmFjdGl2ZVNlY3Rpb24gJiYgc2VjdGlvbi5pc1Zpc2libGUpIHtcbiAgICAgICAgYWRkQ2xhc3Moc2VjdGlvbkVsZW0sIEFDVElWRSk7XG4gICAgICAgIHVwZGF0ZVN0YXRlKCk7XG4gICAgICB9XG5cbiAgICAgIHN0YXJ0aW5nU2VjdGlvbiA9IGdldFN0YXRlKCkuYWN0aXZlU2VjdGlvbi5pdGVtO1xuXG4gICAgICBpZiAoZ2V0T3B0aW9ucygpLnBhZGRpbmdUb3ApIHtcbiAgICAgICAgY3NzKHNlY3Rpb25FbGVtLCB7XG4gICAgICAgICAgJ3BhZGRpbmctdG9wJzogZ2V0T3B0aW9ucygpLnBhZGRpbmdUb3BcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChnZXRPcHRpb25zKCkucGFkZGluZ0JvdHRvbSkge1xuICAgICAgICBjc3Moc2VjdGlvbkVsZW0sIHtcbiAgICAgICAgICAncGFkZGluZy1ib3R0b20nOiBnZXRPcHRpb25zKCkucGFkZGluZ0JvdHRvbVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBnZXRPcHRpb25zKCkuc2VjdGlvbnNDb2xvcltpbmRleF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNzcyhzZWN0aW9uRWxlbSwge1xuICAgICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogZ2V0T3B0aW9ucygpLnNlY3Rpb25zQ29sb3JbaW5kZXhdXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGdldE9wdGlvbnMoKS5hbmNob3JzW2luZGV4XSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgc2VjdGlvbkVsZW0uc2V0QXR0cmlidXRlKCdkYXRhLWFuY2hvcicsIHNlY3Rpb24uYW5jaG9yKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFoYXNTbGlkZXMpIHtcbiAgICAgICAgYWRkVGFibGVDbGFzcyhzZWN0aW9uKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgKiBHZXRzIHRoZSBhY3RpdmUgc2VjdGlvbi5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gZ2V0QWN0aXZlU2VjdGlvbigpIHtcbiAgICAgIHJldHVybiBnZXRTdGF0ZSgpLmFjdGl2ZVNlY3Rpb247XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2VjdGlvbkZyb21QYW5lbChwYW5lbCkge1xuICAgICAgcmV0dXJuIHBhbmVsLmlzU2VjdGlvbiA/IHBhbmVsIDogcGFuZWwucGFyZW50O1xuICAgIH1cblxuICAgIEV2ZW50RW1pdHRlci5vbihldmVudHMuYmluZEV2ZW50cywgYmluZEV2ZW50cyRhKTtcblxuICAgIGZ1bmN0aW9uIGJpbmRFdmVudHMkYSgpIHtcbiAgICAgIC8vIFdlIGNhbid0IGZvY3VzIHNjcm9sbE92ZXJmbG93IGJlZm9yZSBzY3JvbGxpbmdcbiAgICAgIC8vIHRvIHRoZSBhbmNob3IgKGlmIHdlIG5lZWQgdG8pXG4gICAgICBFdmVudEVtaXR0ZXIub24oZXZlbnRzLm9uQWZ0ZXJSZW5kZXJOb0FuY2hvciwgYWZ0ZXJSZW5kZXIpO1xuICAgICAgRXZlbnRFbWl0dGVyLm9uKGV2ZW50cy5hZnRlclNsaWRlTG9hZHMsIHNjcm9sbE92ZXJmbG93SGFuZGxlci5hZnRlclNlY3Rpb25Mb2Fkcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWZ0ZXJSZW5kZXIoKSB7XG4gICAgICBpZiAoZ2V0T3B0aW9ucygpLnNjcm9sbE92ZXJmbG93ICYmICFnZXRPcHRpb25zKCkuc2Nyb2xsQmFyKSB7XG4gICAgICAgIHNjcm9sbE92ZXJmbG93SGFuZGxlci5tYWtlU2Nyb2xsYWJsZSgpO1xuICAgICAgICBzY3JvbGxPdmVyZmxvd0hhbmRsZXIuYWZ0ZXJTZWN0aW9uTG9hZHMoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgc2Nyb2xsT3ZlcmZsb3dIYW5kbGVyID0ge1xuICAgICAgZm9jdXNlZEVsZW06IG51bGwsXG4gICAgICB0aW1lQmVmb3JlUmVhY2hpbmdMaW1pdDogbnVsbCxcbiAgICAgIHRpbWVMYXN0U2Nyb2xsOiBudWxsLFxuICAgICAgcHJldmVudFNjcm9sbFdoaWxlTW92aW5nOiBmdW5jdGlvbiBwcmV2ZW50U2Nyb2xsV2hpbGVNb3ZpbmcoZSkge1xuICAgICAgICBpZiAoIXN0YXRlLmNhblNjcm9sbCkge1xuICAgICAgICAgIHByZXZlbnREZWZhdWx0KGUpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGFmdGVyU2VjdGlvbkxvYWRzOiBmdW5jdGlvbiBhZnRlclNlY3Rpb25Mb2FkcygpIHtcbiAgICAgICAgaWYgKCFnZXRPcHRpb25zKCkuc2Nyb2xsT3ZlcmZsb3cpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gLy8gVW5mb2N1c2luZyB0aGUgc2Nyb2xsYWJsZSBlbGVtZW50IGZyb20gdGhlIG9yZ2luIHNlY3Rpb24vc2xpZGVcblxuXG4gICAgICAgIGlmIChkb2MuYWN0aXZlRWxlbWVudCA9PT0gdGhpcy5mb2N1c2VkRWxlbSkge1xuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICB0aGlzLmZvY3VzZWRFbGVtLmJsdXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzY3JvbGxhYmxlSXRlbSA9IHNjcm9sbE92ZXJmbG93SGFuZGxlci5nZXRTY3JvbGxhYmxlSXRlbShnZXRTdGF0ZSgpLmFjdGl2ZVNlY3Rpb24uaXRlbSk7IC8vIE9uIGRlc2t0b3Agd2UgZm9jdXMgdGhlIHNjcm9sbGFibGUgdG8gYmUgYWJsZSB0byB1c2UgdGhlIG1vdXNlIHdoZWVsXG4gICAgICAgIC8vIFdlIGF2b2lkIGl0IG9uIG1vYmlsZSBkdWUgdG8gYSBidWcgaW4gaU9TIFNhZmFyaVxuXG4gICAgICAgIGlmIChzY3JvbGxhYmxlSXRlbSAmJiAhaXNUb3VjaERldmljZSAmJiAhaXNUb3VjaCkge1xuICAgICAgICAgIHRoaXMuZm9jdXNlZEVsZW0gPSBzY3JvbGxhYmxlSXRlbTtcbiAgICAgICAgICB0aGlzLmZvY3VzZWRFbGVtLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBtYWtlU2Nyb2xsYWJsZTogZnVuY3Rpb24gbWFrZVNjcm9sbGFibGUoKSB7XG4gICAgICAgIGlmIChnZXRPcHRpb25zKCkuc2Nyb2xsT3ZlcmZsb3dNYWNTdHlsZSAmJiAhaXNNYWNEZXZpY2UpIHtcbiAgICAgICAgICBhZGRDbGFzcygkYm9keSwgJ2ZwLXNjcm9sbC1tYWMnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFN0YXRlKCkucGFuZWxzLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgaWYgKGVsLnNsaWRlcyAmJiBlbC5zbGlkZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGhhc0NsYXNzKGVsLml0ZW0sIEFVVE9fSEVJR0hUX1JFU1BPTlNJVkUpICYmIGlzUmVzcG9uc2l2ZU1vZGUoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IGdldFNsaWRlT3JTZWN0aW9uKGVsLml0ZW0pO1xuICAgICAgICAgICAgdmFyIHNob3VsZEJlU2Nyb2xsYWJsZSA9IHNjcm9sbE92ZXJmbG93SGFuZGxlci5zaG91bGRCZVNjcm9sbGFibGUoZWwuaXRlbSk7XG4gICAgICAgICAgICB2YXIgc2VjdGlvbiA9IGdldFNlY3Rpb25Gcm9tUGFuZWwoZWwpO1xuXG4gICAgICAgICAgICBpZiAoaXNJRTExKSB7XG4gICAgICAgICAgICAgIHZhciB0b2dnbGVBY3Rpb24gPSBzaG91bGRCZVNjcm9sbGFibGUgPyAnYWRkQ2xhc3MnIDogJ3JlbW92ZUNsYXNzJztcbiAgICAgICAgICAgICAgdXRpbHNbdG9nZ2xlQWN0aW9uXShzZWN0aW9uLml0ZW0sIElTX09WRVJGTE9XKTtcbiAgICAgICAgICAgICAgdXRpbHNbdG9nZ2xlQWN0aW9uXShlbC5pdGVtLCBJU19PVkVSRkxPVyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBhZGRDbGFzcyhzZWN0aW9uLml0ZW0sIElTX09WRVJGTE9XKTtcbiAgICAgICAgICAgICAgYWRkQ2xhc3MoZWwuaXRlbSwgSVNfT1ZFUkZMT1cpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWVsLmhhc1Njcm9sbCkge1xuICAgICAgICAgICAgICBzY3JvbGxPdmVyZmxvd0hhbmRsZXIuY3JlYXRlV3JhcHBlcihpdGVtKTtcbiAgICAgICAgICAgICAgc2Nyb2xsT3ZlcmZsb3dIYW5kbGVyLmJpbmRFdmVudHMoaXRlbSk7XG4gICAgICAgICAgICB9IC8vIHVwZGF0aW5nIHRoZSBzdGF0ZSBub3cgaW4gY2FzZSBcbiAgICAgICAgICAgIC8vIHRoaXMgaXMgZXhlY3V0ZWQgb24gcGFnZSBsb2FkIChhZnRlciBpbWFnZXMgbG9hZClcblxuXG4gICAgICAgICAgICBlbC5oYXNTY3JvbGwgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgYmluZEV2ZW50czogZnVuY3Rpb24gYmluZEV2ZW50cyhpdGVtKSB7XG4gICAgICAgIHNjcm9sbE92ZXJmbG93SGFuZGxlci5nZXRTY3JvbGxhYmxlSXRlbShpdGVtKS5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBzY3JvbGxPdmVyZmxvd0hhbmRsZXIub25QYW5lbFNjcm9sbCk7XG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCBzY3JvbGxPdmVyZmxvd0hhbmRsZXIucHJldmVudFNjcm9sbFdoaWxlTW92aW5nLCB7XG4gICAgICAgICAgcGFzc2l2ZTogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHNjcm9sbE92ZXJmbG93SGFuZGxlci5wcmV2ZW50U2Nyb2xsV2hpbGVNb3ZpbmcsIHtcbiAgICAgICAgICBwYXNzaXZlOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBjcmVhdGVXcmFwcGVyOiBmdW5jdGlvbiBjcmVhdGVXcmFwcGVyKGl0ZW0pIHtcbiAgICAgICAgdmFyIG92ZXJmbG93V3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBvdmVyZmxvd1dyYXBwZXIuY2xhc3NOYW1lID0gT1ZFUkZMT1c7XG4gICAgICAgIHdyYXBJbm5lcihpdGVtLCBvdmVyZmxvd1dyYXBwZXIpO1xuICAgICAgICBvdmVyZmxvd1dyYXBwZXIuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICctMScpO1xuICAgICAgfSxcbiAgICAgIGRlc3Ryb3lXcmFwcGVyOiBmdW5jdGlvbiBkZXN0cm95V3JhcHBlcihpdGVtKSB7XG4gICAgICAgIHZhciBvdmVyZmxvd1dyYXBwZXIgPSAkKE9WRVJGTE9XX1NFTCwgaXRlbSlbMF07XG5cbiAgICAgICAgaWYgKG92ZXJmbG93V3JhcHBlcikge1xuICAgICAgICAgIHVud3JhcChvdmVyZmxvd1dyYXBwZXIpO1xuICAgICAgICAgIGl0ZW0ucmVtb3ZlQXR0cmlidXRlKCd0YWJpbmRleCcpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ2V0U2Nyb2xsYWJsZUl0ZW06IGZ1bmN0aW9uIGdldFNjcm9sbGFibGVJdGVtKHNlY3Rpb25JdGVtKSB7XG4gICAgICAgIHZhciBwYW5lbCA9IGdldFNsaWRlT3JTZWN0aW9uKHNlY3Rpb25JdGVtKTtcbiAgICAgICAgcmV0dXJuICQoT1ZFUkZMT1dfU0VMLCBwYW5lbClbMF0gfHwgcGFuZWw7XG4gICAgICB9LFxuICAgICAgaGFzU2Nyb2xsOiBmdW5jdGlvbiBoYXNTY3JvbGwocGFuZWxJdGVtKSB7XG4gICAgICAgIHJldHVybiBoYXNDbGFzcyhwYW5lbEl0ZW0sIE9WRVJGTE9XKSB8fCAkKE9WRVJGTE9XX1NFTCwgcGFuZWxJdGVtKVswXSAhPSBudWxsO1xuICAgICAgfSxcbiAgICAgIGlzU2Nyb2xsYWJsZTogZnVuY3Rpb24gaXNTY3JvbGxhYmxlKHBhbmVsKSB7XG4gICAgICAgIHJldHVybiBwYW5lbC5pc1NlY3Rpb24gJiYgcGFuZWwuYWN0aXZlU2xpZGUgPyBwYW5lbC5hY3RpdmVTbGlkZS5oYXNTY3JvbGwgOiBwYW5lbC5oYXNTY3JvbGw7XG4gICAgICB9LFxuICAgICAgc2hvdWxkQmVTY3JvbGxhYmxlOiBmdW5jdGlvbiBzaG91bGRCZVNjcm9sbGFibGUoaXRlbSkge1xuICAgICAgICB2YXIgc2Nyb2xsYWJsZSA9IHNjcm9sbE92ZXJmbG93SGFuZGxlci5nZXRTY3JvbGxhYmxlSXRlbShpdGVtKTtcbiAgICAgICAgcmV0dXJuIHNjcm9sbGFibGUuc2Nyb2xsSGVpZ2h0ID4gd2luLmlubmVySGVpZ2h0O1xuICAgICAgfSxcbiAgICAgIGlzU2Nyb2xsZWQ6IGZ1bmN0aW9uIGlzU2Nyb2xsZWQoZGlyZWN0aW9uLCBlbCkge1xuICAgICAgICBpZiAoIXN0YXRlLmNhblNjcm9sbCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzY3JvbGxhYmxlSXRlbSA9IHNjcm9sbE92ZXJmbG93SGFuZGxlci5nZXRTY3JvbGxhYmxlSXRlbShlbCk7XG5cbiAgICAgICAgaWYgKCFnZXRPcHRpb25zKCkuc2Nyb2xsT3ZlcmZsb3cgfHwgIWhhc0NsYXNzKHNjcm9sbGFibGVJdGVtLCBPVkVSRkxPVykgfHwgaGFzQ2xhc3MoZ2V0U2xpZGVPclNlY3Rpb24oZWwpLCAnZnAtbm9zY3JvbGwnKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IC8vIGllMTEgd3JvbmdseSBjYWxjdWxhdGVzIHNjcm9sbEhlaWdodCB3aGVuIHVzaW5nIHRoZSBDU1Mgc3R5bGVcbiAgICAgICAgLy8gb3ZlcmZsb3c6IGF1dG8gICBJdCBhZGRzIDEgbW9yZSBwaXhlbCBjb21wYXJlZCB0byBvZmZzZXRIZWlnaHRcblxuXG4gICAgICAgIHZhciBpZTExb2Zmc2V0ID0gaXNJRTExID8gMSA6IDA7XG4gICAgICAgIHZhciBwb3NpdGlvblkgPSBzY3JvbGxhYmxlSXRlbS5zY3JvbGxUb3A7XG4gICAgICAgIHZhciBpc1RvcFJlYWNoZWQgPSBkaXJlY3Rpb24gPT09ICd1cCcgJiYgcG9zaXRpb25ZIDw9IDA7XG4gICAgICAgIHZhciBpc0JvdHRvbVJlYWNoZWQgPSBkaXJlY3Rpb24gPT09ICdkb3duJyAmJiBzY3JvbGxhYmxlSXRlbS5zY3JvbGxIZWlnaHQgPD0gTWF0aC5jZWlsKHNjcm9sbGFibGVJdGVtLm9mZnNldEhlaWdodCArIHBvc2l0aW9uWSkgKyBpZTExb2Zmc2V0O1xuICAgICAgICB2YXIgaXNTY3JvbGxlZCA9IGlzVG9wUmVhY2hlZCB8fCBpc0JvdHRvbVJlYWNoZWQ7XG5cbiAgICAgICAgaWYgKCFpc1Njcm9sbGVkKSB7XG4gICAgICAgICAgdGhpcy50aW1lQmVmb3JlUmVhY2hpbmdMaW1pdCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGlzU2Nyb2xsZWQ7XG4gICAgICB9LFxuICAgICAgc2hvdWxkTW92ZVBhZ2U6IGZ1bmN0aW9uIHNob3VsZE1vdmVQYWdlKCkge1xuICAgICAgICB0aGlzLnRpbWVMYXN0U2Nyb2xsID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIHZhciB0aW1lRGlmZiA9IHRoaXMudGltZUxhc3RTY3JvbGwgLSBzY3JvbGxPdmVyZmxvd0hhbmRsZXIudGltZUJlZm9yZVJlYWNoaW5nTGltaXQ7XG4gICAgICAgIHZhciBpc1VzaW5nVG91Y2ggPSBpc1RvdWNoRGV2aWNlIHx8IGlzVG91Y2g7XG4gICAgICAgIHZhciBpc0dyYWJiaW5nID0gaXNVc2luZ1RvdWNoICYmIHN0YXRlLmlzR3JhYmJpbmc7XG4gICAgICAgIHZhciBpc05vdEZpcnN0VGltZVJlYWNoaW5nTGltaXQgPSBzdGF0ZS5pc1VzaW5nV2hlZWwgJiYgdGltZURpZmYgPiA2MDA7XG4gICAgICAgIHJldHVybiBpc0dyYWJiaW5nICYmIHRpbWVEaWZmID4gNDAwIHx8IGlzTm90Rmlyc3RUaW1lUmVhY2hpbmdMaW1pdDtcbiAgICAgIH0sXG4gICAgICBvblBhbmVsU2Nyb2xsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwcmV2UG9zaXRpb24gPSAwO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICB2YXIgY3VycmVudFBvc2l0aW9uID0gZS50YXJnZXQuc2Nyb2xsVG9wO1xuICAgICAgICAgIHZhciBkaXJlY3Rpb24gPSBzdGF0ZS50b3VjaERpcmVjdGlvbiAhPT0gJ25vbmUnID8gc3RhdGUudG91Y2hEaXJlY3Rpb24gOiBwcmV2UG9zaXRpb24gPCBjdXJyZW50UG9zaXRpb24gPyAnZG93bicgOiAndXAnO1xuICAgICAgICAgIHByZXZQb3NpdGlvbiA9IGN1cnJlbnRQb3NpdGlvbjtcblxuICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKGdldE9wdGlvbnMoKS5vblNjcm9sbE92ZXJmbG93KSkge1xuICAgICAgICAgICAgZmlyZUNhbGxiYWNrKCdvblNjcm9sbE92ZXJmbG93Jywge1xuICAgICAgICAgICAgICBwb3NpdGlvbjogY3VycmVudFBvc2l0aW9uLFxuICAgICAgICAgICAgICBkaXJlY3Rpb246IGRpcmVjdGlvblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGhhc0NsYXNzKGUudGFyZ2V0LCBPVkVSRkxPVykgJiYgc3RhdGUuY2FuU2Nyb2xsKSB7XG4gICAgICAgICAgICBpZiAoc2Nyb2xsT3ZlcmZsb3dIYW5kbGVyLmlzU2Nyb2xsZWQoZGlyZWN0aW9uLCBlLnRhcmdldCkgJiYgc2Nyb2xsT3ZlcmZsb3dIYW5kbGVyLnNob3VsZE1vdmVQYWdlKCkpIHtcbiAgICAgICAgICAgICAgRXZlbnRFbWl0dGVyLmVtaXQoZXZlbnRzLm9uU2Nyb2xsT3ZlcmZsb3dTY3JvbGxlZCwge1xuICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogZGlyZWN0aW9uXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0oKVxuICAgIH07XG5cbiAgICB2YXIgZ19wcmV2QWN0aXZlU2VjdGlvbkluZGV4ID0gbnVsbDtcbiAgICB2YXIgZ19wcmV2QWN0aXZlU2xpZGVJbmRleCA9IG51bGw7XG4gICAgLyoqIFxuICAgICAqIFVwZGF0ZXMgdGhlIHN0YXRlIG9mIHRoZSBhcHAuXG4gICAgICovXG5cbiAgICBmdW5jdGlvbiB1cGRhdGVTdGF0ZSgpIHtcbiAgICAgIHN0YXRlLmFjdGl2ZVNlY3Rpb24gPSBudWxsO1xuICAgICAgc3RhdGUuc2VjdGlvbnMubWFwKGZ1bmN0aW9uIChzZWN0aW9uKSB7XG4gICAgICAgIHZhciBpc0FjdGl2ZSA9IGhhc0NsYXNzKHNlY3Rpb24uaXRlbSwgQUNUSVZFKTtcbiAgICAgICAgc2VjdGlvbi5pc0FjdGl2ZSA9IGlzQWN0aXZlO1xuICAgICAgICBzZWN0aW9uLmhhc1Njcm9sbCA9IHNjcm9sbE92ZXJmbG93SGFuZGxlci5oYXNTY3JvbGwoc2VjdGlvbi5pdGVtKTtcblxuICAgICAgICBpZiAoaXNBY3RpdmUpIHtcbiAgICAgICAgICBzdGF0ZS5hY3RpdmVTZWN0aW9uID0gc2VjdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWN0aW9uLnNsaWRlcy5sZW5ndGgpIHtcbiAgICAgICAgICBzZWN0aW9uLmFjdGl2ZVNsaWRlID0gbnVsbDtcbiAgICAgICAgICBzZWN0aW9uLnNsaWRlcy5tYXAoZnVuY3Rpb24gKHNsaWRlKSB7XG4gICAgICAgICAgICB2YXIgaXNBY3RpdmVTbGlkZSA9IGhhc0NsYXNzKHNsaWRlLml0ZW0sIEFDVElWRSk7XG4gICAgICAgICAgICBzbGlkZS5oYXNTY3JvbGwgPSBzY3JvbGxPdmVyZmxvd0hhbmRsZXIuaGFzU2Nyb2xsKHNlY3Rpb24uaXRlbSk7XG4gICAgICAgICAgICBzbGlkZS5pc0FjdGl2ZSA9IGlzQWN0aXZlU2xpZGU7XG5cbiAgICAgICAgICAgIGlmIChpc0FjdGl2ZVNsaWRlKSB7XG4gICAgICAgICAgICAgIHNlY3Rpb24uYWN0aXZlU2xpZGUgPSBzbGlkZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBzY3JvbGxUb05ld0FjdGl2ZVBhbmVsKCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHVwZGF0ZVN0cnVjdHVyYWxTdGF0ZSgpIHtcbiAgICAgIHZhciBhbGxTZWN0aW9uSXRlbXMgPSAkKGdldE9wdGlvbnMoKS5zZWN0aW9uU2VsZWN0b3IsIGdldENvbnRhaW5lcigpKTtcbiAgICAgIHZhciBzZWN0aW9uc0l0ZW1zID0gZ2V0VmlzaWJsZShhbGxTZWN0aW9uSXRlbXMpO1xuICAgICAgdmFyIGFsbFNlY3Rpb25zID0gQXJyYXkuZnJvbShhbGxTZWN0aW9uSXRlbXMpLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICByZXR1cm4gbmV3IFNlY3Rpb25QYW5lbChpdGVtKTtcbiAgICAgIH0pO1xuICAgICAgdmFyIHNlY3Rpb25zID0gYWxsU2VjdGlvbnMuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHJldHVybiBpdGVtLmlzVmlzaWJsZTtcbiAgICAgIH0pO1xuICAgICAgdmFyIHNsaWRlcyA9IHNlY3Rpb25zLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBzZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiBhY2MuY29uY2F0KHNlY3Rpb24uc2xpZGVzKTtcbiAgICAgIH0sIFtdKTsgLy8ga2VlcGluZyB0cmFjayBvZiB0aGUgcHJldmlvdXNseSBhY3RpdmUgc2VjdGlvblxuXG4gICAgICBnX3ByZXZBY3RpdmVTZWN0aW9uSW5kZXggPSBnZXRQcmV2QWN0aXZlUGFuZWxJbmRleChzdGF0ZS5hY3RpdmVTZWN0aW9uKTtcbiAgICAgIGdfcHJldkFjdGl2ZVNsaWRlSW5kZXggPSBnZXRQcmV2QWN0aXZlUGFuZWxJbmRleChzdGF0ZS5hY3RpdmVTZWN0aW9uID8gc3RhdGUuYWN0aXZlU2VjdGlvbi5hY3RpdmVTbGlkZSA6IG51bGwpO1xuICAgICAgc3RhdGUubnVtU2VjdGlvbnMgPSBzZWN0aW9uc0l0ZW1zLmxlbmd0aDtcbiAgICAgIHN0YXRlLm51bVNsaWRlcyA9IHNlY3Rpb25zLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBzZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiBhY2MgKyBzZWN0aW9uLnNsaWRlcy5sZW5ndGg7XG4gICAgICB9LCAwKTtcbiAgICAgIHN0YXRlLnNlY3Rpb25zID0gc2VjdGlvbnM7XG4gICAgICBzdGF0ZS5zZWN0aW9uc0luY2x1ZGluZ0hpZGRlbiA9IGFsbFNlY3Rpb25zO1xuICAgICAgc3RhdGUuc2xpZGVzID0gc2xpZGVzO1xuICAgICAgc3RhdGUucGFuZWxzID0gc3RhdGUuc2VjdGlvbnMuY29uY2F0KHN0YXRlLnNsaWRlcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UHJldkFjdGl2ZVBhbmVsSW5kZXgoYWN0aXZlUGFuZWwpIHtcbiAgICAgIGlmICghYWN0aXZlUGFuZWwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciBwcmV2QWN0aXZlUGFuZWxJdGVtID0gYWN0aXZlUGFuZWwgPyBhY3RpdmVQYW5lbC5pdGVtIDogbnVsbDtcbiAgICAgIHZhciBoaWRkZW5QYW5lbHMgPSBhY3RpdmVQYW5lbC5pc1NlY3Rpb24gPyBzdGF0ZS5zZWN0aW9uc0luY2x1ZGluZ0hpZGRlbiA6IHN0YXRlLmFjdGl2ZVNlY3Rpb24uc2xpZGVzSW5jbHVkaW5nSGlkZGVuO1xuXG4gICAgICBpZiAocHJldkFjdGl2ZVBhbmVsSXRlbSkge1xuICAgICAgICB2YXIgcGFuZWwgPSBnZXRQYW5lbEJ5RWxlbWVudChoaWRkZW5QYW5lbHMsIHByZXZBY3RpdmVQYW5lbEl0ZW0pO1xuICAgICAgICByZXR1cm4gcGFuZWwgPyBwYW5lbC5pbmRleCgpIDogbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdoZW4gY2hhbmdlcyBpbiB0aGUgRE9NIHRha2UgcGxhY2UgdGhlcmUncyBhIGNoYW5nZSBcbiAgICAgKiB0aGUgYWN0aXZlIHNlY3Rpb24gaXMgbm93IGhpZGRlbiBvciByZW1vdmVkLiBcbiAgICAgKiBmdWxsUGFnZS5qcyB3aWxsIHNjcm9sbCB0byB0aGUgY2xvc2VzdCBzZWN0aW9uIG5lYXJieS5cbiAgICAgKi9cblxuXG4gICAgZnVuY3Rpb24gc2Nyb2xsVG9OZXdBY3RpdmVQYW5lbCgpIHtcbiAgICAgIHZhciBhY3RpdmVTZWN0aW9uID0gc3RhdGUuYWN0aXZlU2VjdGlvbjtcbiAgICAgIHZhciBhY3RpdmVTZWN0aW9uSGFzU2xpZGVzID0gc3RhdGUuYWN0aXZlU2VjdGlvbiA/IHN0YXRlLmFjdGl2ZVNlY3Rpb24uc2xpZGVzLmxlbmd0aCA6IGZhbHNlO1xuICAgICAgdmFyIGFjdGl2ZVNsaWRlID0gc3RhdGUuYWN0aXZlU2VjdGlvbiA/IHN0YXRlLmFjdGl2ZVNlY3Rpb24uYWN0aXZlU2xpZGUgOiBudWxsOyAvLyBIaWRkaW5nIC8gcmVtb3ZpbmcgdGhlIGFjdGl2ZSBzZWN0aW9uID9cblxuICAgICAgaWYgKCFhY3RpdmVTZWN0aW9uICYmIHN0YXRlLnNlY3Rpb25zLmxlbmd0aCAmJiAhZ2V0U3RhdGUoKS5pc0JleW9uZEZ1bGxwYWdlICYmIGdfcHJldkFjdGl2ZVNlY3Rpb25JbmRleCkge1xuICAgICAgICB2YXIgbmV3QWN0aXZlU2VjdGlvbiA9IGdldE5ld0FjdGl2ZVBhbmVsKGdfcHJldkFjdGl2ZVNlY3Rpb25JbmRleCwgc3RhdGUuc2VjdGlvbnMpO1xuXG4gICAgICAgIGlmIChuZXdBY3RpdmVTZWN0aW9uKSB7XG4gICAgICAgICAgc3RhdGUuYWN0aXZlU2VjdGlvbiA9IG5ld0FjdGl2ZVNlY3Rpb247XG4gICAgICAgICAgc3RhdGUuYWN0aXZlU2VjdGlvbi5pc0FjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgYWRkQ2xhc3Moc3RhdGUuYWN0aXZlU2VjdGlvbi5pdGVtLCBBQ1RJVkUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0YXRlLmFjdGl2ZVNlY3Rpb24pIHtcbiAgICAgICAgICBzaWxlbnRTY3JvbGwoc3RhdGUuYWN0aXZlU2VjdGlvbi5pdGVtLm9mZnNldFRvcCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGFjdGl2ZVNlY3Rpb25IYXNTbGlkZXMgJiYgIWFjdGl2ZVNsaWRlICYmIGdfcHJldkFjdGl2ZVNsaWRlSW5kZXgpIHtcbiAgICAgICAgdmFyIG5ld0FjdGl2ZVNsaWRlID0gZ2V0TmV3QWN0aXZlUGFuZWwoZ19wcmV2QWN0aXZlU2xpZGVJbmRleCwgc3RhdGUuYWN0aXZlU2VjdGlvbi5zbGlkZXMpO1xuXG4gICAgICAgIGlmIChuZXdBY3RpdmVTbGlkZSkge1xuICAgICAgICAgIHN0YXRlLmFjdGl2ZVNlY3Rpb24uYWN0aXZlU2xpZGUgPSBuZXdBY3RpdmVTbGlkZTtcbiAgICAgICAgICBzdGF0ZS5hY3RpdmVTZWN0aW9uLmFjdGl2ZVNsaWRlLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICBhZGRDbGFzcyhzdGF0ZS5hY3RpdmVTZWN0aW9uLmFjdGl2ZVNsaWRlLml0ZW0sIEFDVElWRSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdGUuYWN0aXZlU2VjdGlvbi5hY3RpdmVTbGlkZSkge1xuICAgICAgICAgIHNpbGVudExhbmRzY2FwZVNjcm9sbChzdGF0ZS5hY3RpdmVTZWN0aW9uLmFjdGl2ZVNsaWRlLml0ZW0sICdpbnRlcm5hbCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0TmV3QWN0aXZlUGFuZWwocHJldkFjdGl2ZVBhbmVsSW5kZXgsIHNpYmxpbmdzKSB7XG4gICAgICB2YXIgbmV3QWN0aXZlU2VjdGlvbjtcbiAgICAgIHZhciBwcmV2SW5kZXggPSBwcmV2QWN0aXZlUGFuZWxJbmRleCAtIDE7XG4gICAgICB2YXIgbmV4dEluZGV4ID0gcHJldkFjdGl2ZVBhbmVsSW5kZXg7XG5cbiAgICAgIGRvIHtcbiAgICAgICAgbmV3QWN0aXZlU2VjdGlvbiA9IHNpYmxpbmdzW3ByZXZJbmRleF0gfHwgc2libGluZ3NbbmV4dEluZGV4XTtcblxuICAgICAgICBpZiAobmV3QWN0aXZlU2VjdGlvbikge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJldkluZGV4ID0gcHJldkluZGV4IC0gMTtcbiAgICAgICAgbmV4dEluZGV4ID0gbmV4dEluZGV4ICsgMTtcbiAgICAgIH0gd2hpbGUgKHByZXZJbmRleCA+PSAwIHx8IG5leHRJbmRleCA8IHNpYmxpbmdzLmxlbmd0aCk7XG5cbiAgICAgIHJldHVybiBuZXdBY3RpdmVTZWN0aW9uO1xuICAgIH1cbiAgICAvKipcbiAgICAqIFNlY3Rpb24gb2JqZWN0XG4gICAgKi9cblxuXG4gICAgdmFyIFNlY3Rpb25QYW5lbCA9IGZ1bmN0aW9uIFNlY3Rpb25QYW5lbChlbCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgW10ucHVzaC5jYWxsKGFyZ3VtZW50cywgZ2V0T3B0aW9ucygpLnNlY3Rpb25TZWxlY3Rvcik7XG4gICAgICBJdGVtLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB0aGlzLmFsbFNsaWRlc0l0ZW1zID0gJChnZXRPcHRpb25zKCkuc2xpZGVTZWxlY3RvciwgZWwpO1xuICAgICAgdGhpcy5zbGlkZXNJbmNsdWRpbmdIaWRkZW4gPSBBcnJheS5mcm9tKHRoaXMuYWxsU2xpZGVzSXRlbXMpLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICByZXR1cm4gbmV3IFNsaWRlUGFuZWwoaXRlbSwgX3RoaXMpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnNsaWRlcyA9IHRoaXMuc2xpZGVzSW5jbHVkaW5nSGlkZGVuLmZpbHRlcihmdW5jdGlvbiAoc2xpZGVQYW5lbCkge1xuICAgICAgICByZXR1cm4gc2xpZGVQYW5lbC5pc1Zpc2libGU7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuYWN0aXZlU2xpZGUgPSB0aGlzLnNsaWRlcy5sZW5ndGggPyB0aGlzLnNsaWRlcy5maWx0ZXIoZnVuY3Rpb24gKHNsaWRlKSB7XG4gICAgICAgIHJldHVybiBzbGlkZS5pc0FjdGl2ZTtcbiAgICAgIH0pWzBdIHx8IHRoaXMuc2xpZGVzWzBdIDogbnVsbDtcbiAgICB9O1xuICAgIFNlY3Rpb25QYW5lbC5wcm90b3R5cGUgPSBJdGVtLnByb3RvdHlwZTtcbiAgICBTZWN0aW9uUGFuZWwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU2VjdGlvblBhbmVsO1xuICAgIC8qKlxuICAgICogU2xpZGUgb2JqZWN0XG4gICAgKi9cblxuICAgIHZhciBTbGlkZVBhbmVsID0gZnVuY3Rpb24gU2xpZGVQYW5lbChlbCwgc2VjdGlvbikge1xuICAgICAgdGhpcy5wYXJlbnQgPSBzZWN0aW9uO1xuICAgICAgSXRlbS5jYWxsKHRoaXMsIGVsLCBnZXRPcHRpb25zKCkuc2xpZGVTZWxlY3Rvcik7XG4gICAgfTtcblxuICAgIFNsaWRlUGFuZWwucHJvdG90eXBlID0gSXRlbS5wcm90b3R5cGU7XG4gICAgU2xpZGVQYW5lbC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTZWN0aW9uUGFuZWw7XG5cbiAgICAvKipcbiAgICAqIEFkZHMgaW50ZXJuYWwgY2xhc3NlcyB0byBiZSBhYmxlIHRvIHByb3ZpZGUgY3VzdG9taXphYmxlIHNlbGVjdG9yc1xuICAgICoga2VlcGluZyB0aGUgbGluayB3aXRoIHRoZSBzdHlsZSBzaGVldC5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gYWRkSW50ZXJuYWxTZWxlY3RvcnMoKSB7XG4gICAgICBhZGRDbGFzcygkKGdldE9wdGlvbnMoKS5zZWN0aW9uU2VsZWN0b3IsIGdldENvbnRhaW5lcigpKSwgU0VDVElPTik7XG4gICAgICBhZGRDbGFzcygkKGdldE9wdGlvbnMoKS5zbGlkZVNlbGVjdG9yLCBnZXRDb250YWluZXIoKSksIFNMSURFKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIFN0eWxlcyB0aGUgaG9yaXpvbnRhbCBzbGlkZXMgZm9yIGEgc2VjdGlvbi5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gc3R5bGVTbGlkZXMoc2VjdGlvbikge1xuICAgICAgdmFyIG51bVNsaWRlcyA9IHNlY3Rpb24uc2xpZGVzLmxlbmd0aDtcbiAgICAgIHZhciBzbGlkZXNFbGVtcyA9IHNlY3Rpb24uYWxsU2xpZGVzSXRlbXM7XG4gICAgICB2YXIgc2xpZGVzID0gc2VjdGlvbi5zbGlkZXM7XG4gICAgICB2YXIgc2xpZGVyV2lkdGggPSBudW1TbGlkZXMgKiAxMDA7XG4gICAgICB2YXIgc2xpZGVXaWR0aCA9IDEwMCAvIG51bVNsaWRlcztcblxuICAgICAgaWYgKCEkKFNMSURFU19XUkFQUEVSX1NFTCwgc2VjdGlvbi5pdGVtKVswXSkge1xuICAgICAgICB2YXIgc2xpZGVzV3JhcHBlciA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc2xpZGVzV3JhcHBlci5jbGFzc05hbWUgPSBTTElERVNfV1JBUFBFUjsgLy9mcC1zbGlkZXNcblxuICAgICAgICB3cmFwQWxsKHNsaWRlc0VsZW1zLCBzbGlkZXNXcmFwcGVyKTtcbiAgICAgICAgdmFyIHNsaWRlc0NvbnRhaW5lciA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc2xpZGVzQ29udGFpbmVyLmNsYXNzTmFtZSA9IFNMSURFU19DT05UQUlORVI7IC8vZnAtc2xpZGVzQ29udGFpbmVyXG5cbiAgICAgICAgd3JhcEFsbChzbGlkZXNFbGVtcywgc2xpZGVzQ29udGFpbmVyKTtcbiAgICAgIH1cblxuICAgICAgY3NzKCQoU0xJREVTX0NPTlRBSU5FUl9TRUwsIHNlY3Rpb24uaXRlbSksIHtcbiAgICAgICAgJ3dpZHRoJzogc2xpZGVyV2lkdGggKyAnJSdcbiAgICAgIH0pO1xuXG4gICAgICBpZiAobnVtU2xpZGVzID4gMSkge1xuICAgICAgICBpZiAoZ2V0T3B0aW9ucygpLmNvbnRyb2xBcnJvd3MpIHtcbiAgICAgICAgICBjcmVhdGVTbGlkZUFycm93cyhzZWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChnZXRPcHRpb25zKCkuc2xpZGVzTmF2aWdhdGlvbikge1xuICAgICAgICAgIGFkZFNsaWRlc05hdmlnYXRpb24oc2VjdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgc2xpZGVzLmZvckVhY2goZnVuY3Rpb24gKHNsaWRlKSB7XG4gICAgICAgIGNzcyhzbGlkZS5pdGVtLCB7XG4gICAgICAgICAgJ3dpZHRoJzogc2xpZGVXaWR0aCArICclJ1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoZ2V0T3B0aW9ucygpLnZlcnRpY2FsQ2VudGVyZWQpIHtcbiAgICAgICAgICBhZGRUYWJsZUNsYXNzKHNsaWRlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB2YXIgc3RhcnRpbmdTbGlkZSA9IHNlY3Rpb24uYWN0aXZlU2xpZGUgfHwgbnVsbDsgLy9pZiB0aGUgc2xpZGUgd29uJ3QgYmUgYW4gc3RhcnRpbmcgcG9pbnQsIHRoZSBkZWZhdWx0IHdpbGwgYmUgdGhlIGZpcnN0IG9uZVxuICAgICAgLy90aGUgYWN0aXZlIHNlY3Rpb24gaXNuJ3QgdGhlIGZpcnN0IG9uZT8gSXMgbm90IHRoZSBmaXJzdCBzbGlkZSBvZiB0aGUgZmlyc3Qgc2VjdGlvbj8gVGhlbiB3ZSBsb2FkIHRoYXQgc2VjdGlvbi9zbGlkZSBieSBkZWZhdWx0LlxuXG4gICAgICBpZiAoc3RhcnRpbmdTbGlkZSAhPSBudWxsICYmIHN0YXRlLmFjdGl2ZVNlY3Rpb24gJiYgKHN0YXRlLmFjdGl2ZVNlY3Rpb24uaW5kZXgoKSAhPT0gMCB8fCBzdGF0ZS5hY3RpdmVTZWN0aW9uLmluZGV4KCkgPT09IDAgJiYgc3RhcnRpbmdTbGlkZS5pbmRleCgpICE9PSAwKSkge1xuICAgICAgICBzaWxlbnRMYW5kc2NhcGVTY3JvbGwoc3RhcnRpbmdTbGlkZS5pdGVtLCAnaW50ZXJuYWwnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFkZENsYXNzKHNsaWRlc0VsZW1zWzBdLCBBQ1RJVkUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBnX3dyYXBwZXJPYnNlcnZlcjtcbiAgICB2YXIgZ193cmFwcGVyT2JzZXJ2ZUNvbmZpZyA9IHtcbiAgICAgIGF0dHJpYnV0ZXM6IGZhbHNlLFxuICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgIGNoYXJhY3RlckRhdGE6IHRydWVcbiAgICB9O1xuICAgIEV2ZW50RW1pdHRlci5vbihldmVudHMuYmluZEV2ZW50cywgYmluZEV2ZW50cyQ5KTtcbiAgICBGUC5yZW5kZXIgPSBvbkNvbnRlbnRDaGFuZ2U7XG5cbiAgICBmdW5jdGlvbiBiaW5kRXZlbnRzJDkoKSB7XG4gICAgICBpZiAoZ2V0T3B0aW9ucygpLm9ic2VydmVyICYmIFwiTXV0YXRpb25PYnNlcnZlclwiIGluIHdpbmRvdyAmJiAkKFdSQVBQRVJfU0VMKVswXSkge1xuICAgICAgICBnX3dyYXBwZXJPYnNlcnZlciA9IGNyZWF0ZU9ic2VydmVyKCQoV1JBUFBFUl9TRUwpWzBdLCBvbkNvbnRlbnRDaGFuZ2UsIGdfd3JhcHBlck9ic2VydmVDb25maWcpO1xuICAgICAgfVxuXG4gICAgICBFdmVudEVtaXR0ZXIub24oZXZlbnRzLmNvbnRlbnRDaGFuZ2VkLCBvbkNvbnRlbnRDaGFuZ2UpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgTXV0YXRpb24gb2JzZXJ2ZXIuXG4gICAgICovXG5cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZU9ic2VydmVyKHRhcmdldCwgY2FsbGJhY2ssIGNvbmZpZykge1xuICAgICAgdmFyIG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoY2FsbGJhY2spO1xuICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXQsIGNvbmZpZyk7XG4gICAgICByZXR1cm4gb2JzZXJ2ZXI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGlkU2xpZGVzQ2hhbmdlKCkge1xuICAgICAgcmV0dXJuIGdldFZpc2libGUoJChnZXRPcHRpb25zKCkuc2xpZGVTZWxlY3RvciwgZ2V0Q29udGFpbmVyKCkpKS5sZW5ndGggIT09IGdldFN0YXRlKCkubnVtU2xpZGVzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRpZFNlY3Rpb25zQ2hhbmdlKCkge1xuICAgICAgcmV0dXJuIGdldFZpc2libGUoJChnZXRPcHRpb25zKCkuc2VjdGlvblNlbGVjdG9yLCBnZXRDb250YWluZXIoKSkpLmxlbmd0aCAhPT0gZ2V0U3RhdGUoKS5udW1TZWN0aW9ucztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkaWRTZWN0aW9uc09yU2xpZGVzQ2hhbmdlKCkge1xuICAgICAgcmV0dXJuIGRpZFNsaWRlc0NoYW5nZSgpIHx8IGRpZFNlY3Rpb25zQ2hhbmdlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExpc3RlbiB0byBjaGFuZ2VzIG9uIHNlY3Rpb25zIGFuZCBmaXJlcyByZUJ1aWxkXG4gICAgICogd2hlbiB0aG9zZSBjaGFuZ2VzIGFmZmVjdCB0aGUgc2VjdGlvbiBoZWlnaHQuXG4gICAgICovXG5cblxuICAgIGZ1bmN0aW9uIG9uQ29udGVudENoYW5nZShtdXRhdGlvbnMpIHtcbiAgICAgIHZhciBfZGlkU2xpZGVzQ2hhbmdlID0gZGlkU2xpZGVzQ2hhbmdlKCk7XG5cbiAgICAgIGlmIChkaWRTZWN0aW9uc09yU2xpZGVzQ2hhbmdlKCkgJiYgIXN0YXRlLmlzRG9pbmdDb250aW5vdXNWZXJ0aWNhbCkge1xuICAgICAgICBpZiAoZ2V0T3B0aW9ucygpLm9ic2VydmVyICYmIGdfd3JhcHBlck9ic2VydmVyKSB7XG4gICAgICAgICAgLy8gVGVtcG9yYWxseSBkaXNhYmxpbmcgdGhlIG9ic2VydmVyIHdoaWxlIFxuICAgICAgICAgIC8vIHdlIG1vZGlkeSB0aGUgRE9NIGFnYWluXG4gICAgICAgICAgZ193cmFwcGVyT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdXBkYXRlU3RydWN0dXJhbFN0YXRlKCk7XG4gICAgICAgIHVwZGF0ZVN0YXRlKCk7IC8vIFJlbW92aW5nIG5hdnMgYW5kIGFuY2hvcnMgb3B0aW9uc1xuXG4gICAgICAgIGdldE9wdGlvbnMoKS5hbmNob3JzID0gW107XG4gICAgICAgIHJlbW92ZSgkKFNFQ1RJT05fTkFWX1NFTCkpO1xuICAgICAgICBhZGRJbnRlcm5hbFNlbGVjdG9ycygpO1xuICAgICAgICBzZXRPcHRpb25zRnJvbURPTSgpO1xuXG4gICAgICAgIGlmIChnZXRPcHRpb25zKCkubmF2aWdhdGlvbikge1xuICAgICAgICAgIGFkZFZlcnRpY2FsTmF2aWdhdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF9kaWRTbGlkZXNDaGFuZ2UpIHtcbiAgICAgICAgICByZW1vdmUoJChTTElERVNfTkFWX1NFTCkpO1xuICAgICAgICAgIHJlbW92ZSgkKFNMSURFU19BUlJPV19TRUwpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFN0YXRlKCkuc2VjdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoc2VjdGlvbikge1xuICAgICAgICAgIGlmIChzZWN0aW9uLnNsaWRlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChfZGlkU2xpZGVzQ2hhbmdlKSB7XG4gICAgICAgICAgICAgIHN0eWxlU2xpZGVzKHNlY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdHlsZVNlY3Rpb24oc2VjdGlvbik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGdldE9wdGlvbnMoKS5vYnNlcnZlciAmJiBnX3dyYXBwZXJPYnNlcnZlciAmJiAkKFdSQVBQRVJfU0VMKVswXSkge1xuICAgICAgICBnX3dyYXBwZXJPYnNlcnZlci5vYnNlcnZlKCQoV1JBUFBFUl9TRUwpWzBdLCBnX3dyYXBwZXJPYnNlcnZlQ29uZmlnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgc3VwcG9ydHNQYXNzaXZlRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgLy9jaGVrcyBmb3IgcGFzc2l2ZSBldmVudCBzdXBwb3J0XG4gICAgICB2YXIgZ19zdXBwb3J0c1Bhc3NpdmUgPSBmYWxzZTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIG9wdHMgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdwYXNzaXZlJywge1xuICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgICAgZ19zdXBwb3J0c1Bhc3NpdmUgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHdpbmRvd0FkZEV2ZW50KFwidGVzdFBhc3NpdmVcIiwgbnVsbCwgb3B0cyk7XG4gICAgICAgIHdpbmRvd1JlbW92ZUV2ZW50KFwidGVzdFBhc3NpdmVcIiwgbnVsbCwgb3B0cyk7XG4gICAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZ19zdXBwb3J0c1Bhc3NpdmU7XG4gICAgICB9O1xuICAgIH0oKTtcblxuICAgIGZ1bmN0aW9uIGdldFBhc3NpdmVPcHRpb25zSWZQb3NzaWJsZSgpIHtcbiAgICAgIHJldHVybiBzdXBwb3J0c1Bhc3NpdmVFdmVudHMoKSA/IHtcbiAgICAgICAgcGFzc2l2ZTogZmFsc2VcbiAgICAgIH0gOiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgd2hlZWxEYXRhSGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfcHJldlRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAgICAgdmFyIF9zY3JvbGxpbmdzID0gW107XG4gICAgICB2YXIgaXNTY3JvbGxpbmdWZXJ0aWNhbGx5O1xuICAgICAgdmFyIGRpcmVjdGlvbjtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJlZ2lzdGVyRXZlbnQ6IGZ1bmN0aW9uIHJlZ2lzdGVyRXZlbnQoZSkge1xuICAgICAgICAgIGUgPSBlIHx8IHdpbi5ldmVudDtcbiAgICAgICAgICB2YXIgdmFsdWUgPSBlLndoZWVsRGVsdGEgfHwgLWUuZGVsdGFZIHx8IC1lLmRldGFpbDtcbiAgICAgICAgICB2YXIgZGVsdGEgPSBNYXRoLm1heCgtMSwgTWF0aC5taW4oMSwgdmFsdWUpKTtcbiAgICAgICAgICB2YXIgaG9yaXpvbnRhbERldGVjdGlvbiA9IHR5cGVvZiBlLndoZWVsRGVsdGFYICE9PSAndW5kZWZpbmVkJyB8fCB0eXBlb2YgZS5kZWx0YVggIT09ICd1bmRlZmluZWQnO1xuICAgICAgICAgIGlzU2Nyb2xsaW5nVmVydGljYWxseSA9IE1hdGguYWJzKGUud2hlZWxEZWx0YVgpIDwgTWF0aC5hYnMoZS53aGVlbERlbHRhKSB8fCBNYXRoLmFicyhlLmRlbHRhWCkgPCBNYXRoLmFicyhlLmRlbHRhWSkgfHwgIWhvcml6b250YWxEZXRlY3Rpb247XG4gICAgICAgICAgdmFyIGN1clRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICBkaXJlY3Rpb24gPSBkZWx0YSA8IDAgPyAnZG93bicgOiAndXAnOyAvL0xpbWl0aW5nIHRoZSBhcnJheSB0byAxNTAgKGxldHMgbm90IHdhc3RlIG1lbW9yeSEpXG5cbiAgICAgICAgICBpZiAoX3Njcm9sbGluZ3MubGVuZ3RoID4gMTQ5KSB7XG4gICAgICAgICAgICBfc2Nyb2xsaW5ncy5zaGlmdCgpO1xuICAgICAgICAgIH0gLy9rZWVwaW5nIHJlY29yZCBvZiB0aGUgcHJldmlvdXMgc2Nyb2xsaW5nc1xuXG5cbiAgICAgICAgICBfc2Nyb2xsaW5ncy5wdXNoKE1hdGguYWJzKHZhbHVlKSk7IC8vdGltZSBkaWZmZXJlbmNlIGJldHdlZW4gdGhlIGxhc3Qgc2Nyb2xsIGFuZCB0aGUgY3VycmVudCBvbmVcblxuXG4gICAgICAgICAgdmFyIHRpbWVEaWZmID0gY3VyVGltZSAtIF9wcmV2VGltZTtcbiAgICAgICAgICBfcHJldlRpbWUgPSBjdXJUaW1lOyAvL2hhdmVuJ3QgdGhleSBzY3JvbGxlZCBpbiBhIHdoaWxlP1xuICAgICAgICAgIC8vKGVub3VnaCB0byBiZSBjb25zaWRlciBhIGRpZmZlcmVudCBzY3JvbGxpbmcgYWN0aW9uIHRvIHNjcm9sbCBhbm90aGVyIHNlY3Rpb24pXG5cbiAgICAgICAgICBpZiAodGltZURpZmYgPiAyMDApIHtcbiAgICAgICAgICAgIC8vZW1wdHlpbmcgdGhlIGFycmF5LCB3ZSBkb250IGNhcmUgYWJvdXQgb2xkIHNjcm9sbGluZ3MgZm9yIG91ciBhdmVyYWdlc1xuICAgICAgICAgICAgX3Njcm9sbGluZ3MgPSBbXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGlzQWNjZWxlcmF0aW5nOiBmdW5jdGlvbiBpc0FjY2VsZXJhdGluZygpIHtcbiAgICAgICAgICB2YXIgYXZlcmFnZUVuZCA9IGdldEF2ZXJhZ2UoX3Njcm9sbGluZ3MsIDEwKTtcbiAgICAgICAgICB2YXIgYXZlcmFnZU1pZGRsZSA9IGdldEF2ZXJhZ2UoX3Njcm9sbGluZ3MsIDcwKTtcbiAgICAgICAgICB2YXIgaXNBY2NlbGVyYXRpbmcgPSBhdmVyYWdlRW5kID49IGF2ZXJhZ2VNaWRkbGU7XG4gICAgICAgICAgcmV0dXJuIF9zY3JvbGxpbmdzLmxlbmd0aCA/IGlzQWNjZWxlcmF0aW5nICYmIGlzU2Nyb2xsaW5nVmVydGljYWxseSA6IGZhbHNlO1xuICAgICAgICB9LFxuICAgICAgICBnZXREaXJlY3Rpb246IGZ1bmN0aW9uIGdldERpcmVjdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gZGlyZWN0aW9uO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0oKTtcblxuICAgIGZ1bmN0aW9uIHNjcm9sbEJleW9uZEZ1bGxQYWdlKCkge1xuICAgICAgdmFyIGR0b3AgPSBnZXREZXN0aW5hdGlvbk9mZnNldCgpO1xuICAgICAgdmFyIHNjcm9sbFNldHRpbmdzID0gZ2V0U2Nyb2xsU2V0dGluZ3MoZHRvcCk7XG4gICAgICBGUC50ZXN0LnRvcCA9IC1kdG9wICsgJ3B4JztcbiAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgY2FuU2Nyb2xsOiBmYWxzZVxuICAgICAgfSk7XG4gICAgICBzY3JvbGxUbyhzY3JvbGxTZXR0aW5ncy5lbGVtZW50LCBzY3JvbGxTZXR0aW5ncy5vcHRpb25zLCBnZXRPcHRpb25zKCkuc2Nyb2xsaW5nU3BlZWQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgICAgaXNCZXlvbmRGdWxscGFnZTogdHJ1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICAgIGNhblNjcm9sbDogdHJ1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9LCAzMCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gb25LZXlEb3duKCkge1xuICAgICAgaWYgKCFpc0Z1bGxQYWdlQWJvdmUoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzY3JvbGxVcFRvRnVsbHBhZ2UoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gc2Nyb2xsVXBUb0Z1bGxwYWdlKCkge1xuICAgICAgdmFyIHNjcm9sbFNldHRpbmdzID0gZ2V0U2Nyb2xsU2V0dGluZ3MoZ2V0TGFzdChnZXRTdGF0ZSgpLnNlY3Rpb25zKS5pdGVtLm9mZnNldFRvcCk7XG4gICAgICBzZXRTdGF0ZSh7XG4gICAgICAgIGNhblNjcm9sbDogZmFsc2VcbiAgICAgIH0pO1xuICAgICAgc2Nyb2xsVG8oc2Nyb2xsU2V0dGluZ3MuZWxlbWVudCwgc2Nyb2xsU2V0dGluZ3Mub3B0aW9ucywgZ2V0T3B0aW9ucygpLnNjcm9sbGluZ1NwZWVkLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICBjYW5TY3JvbGw6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICBpc0JleW9uZEZ1bGxwYWdlOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgIGlzQWJvdXRUb1Njcm9sbFRvRnVsbFBhZ2U6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RGVzdGluYXRpb25PZmZzZXQoKSB7XG4gICAgICBpZiAoIWdldE9wdGlvbnMoKS5jc3MzKSB7XG4gICAgICAgIHJldHVybiBnZXRMYXN0KGdldFN0YXRlKCkuc2VjdGlvbnMpLml0ZW0ub2Zmc2V0VG9wICsgZ2V0TGFzdChnZXRTdGF0ZSgpLnNlY3Rpb25zKS5pdGVtLm9mZnNldEhlaWdodDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGdldFNjcm9sbFRvcCgpICsgZ2V0V2luZG93SGVpZ2h0KCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYmV5b25kRnVsbFBhZ2VIYW5kbGVyKGNvbnRhaW5lciwgZSkge1xuICAgICAgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICB2YXIgcGF1c2VTY3JvbGwgPSBnZXRTdGF0ZSgpLmlzQmV5b25kRnVsbHBhZ2UgJiYgY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmJvdHRvbSA+PSAwICYmIHdoZWVsRGF0YUhhbmRsZXIuZ2V0RGlyZWN0aW9uKCkgPT09ICd1cCc7XG4gICAgICB2YXIgZ19pc0Fib3V0VG9TY3JvbGxUb0Z1bGxQYWdlID0gZ2V0U3RhdGUoKS5pc0Fib3V0VG9TY3JvbGxUb0Z1bGxQYWdlO1xuXG4gICAgICBpZiAoZ19pc0Fib3V0VG9TY3JvbGxUb0Z1bGxQYWdlKSB7XG4gICAgICAgIHByZXZlbnREZWZhdWx0KGUpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChnZXRTdGF0ZSgpLmlzQmV5b25kRnVsbHBhZ2UpIHtcbiAgICAgICAgaWYgKCFwYXVzZVNjcm9sbCkge1xuICAgICAgICAgIGtleWZyYW1lVGltZSgnc2V0JywgJ2JleW9uZEZ1bGxwYWdlJywgMTAwMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHNob3VsZFNldEZpeGVkUG9zaXRpb24gPSAhZ19pc0Fib3V0VG9TY3JvbGxUb0Z1bGxQYWdlICYmICgha2V5ZnJhbWVUaW1lKCdpc05ld0tleWZyYW1lJywgJ2JleW9uZEZ1bGxwYWdlJykgfHwgIXdoZWVsRGF0YUhhbmRsZXIuaXNBY2NlbGVyYXRpbmcoKSk7XG4gICAgICAgICAgdmFyIHNjcm9sbFNldHRpbmdzO1xuXG4gICAgICAgICAgaWYgKHNob3VsZFNldEZpeGVkUG9zaXRpb24pIHtcbiAgICAgICAgICAgIHNjcm9sbFNldHRpbmdzID0gZ2V0U2Nyb2xsU2V0dGluZ3MoZ2V0TGFzdChnZXRTdGF0ZSgpLnNlY3Rpb25zKS5pdGVtLm9mZnNldFRvcCArIGdldExhc3QoZ2V0U3RhdGUoKS5zZWN0aW9ucykuaXRlbS5vZmZzZXRIZWlnaHQpO1xuICAgICAgICAgICAgc2Nyb2xsU2V0dGluZ3MuZWxlbWVudC5zY3JvbGxUbygwLCBzY3JvbGxTZXR0aW5ncy5vcHRpb25zKTtcbiAgICAgICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICAgICAgaXNBYm91dFRvU2Nyb2xsVG9GdWxsUGFnZTogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcHJldmVudERlZmF1bHQoZSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSBlbHNlIGlmICh3aGVlbERhdGFIYW5kbGVyLmlzQWNjZWxlcmF0aW5nKCkpIHtcbiAgICAgICAgICAgIHBhdXNlU2Nyb2xsID0gZmFsc2U7XG4gICAgICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgICAgIGlzQWJvdXRUb1Njcm9sbFRvRnVsbFBhZ2U6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgICAgICBzY3JvbGxUcmlnZ2VyOiAnd2hlZWwnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNjcm9sbFVwVG9GdWxscGFnZSgpO1xuICAgICAgICAgICAgcHJldmVudERlZmF1bHQoZSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFnX2lzQWJvdXRUb1Njcm9sbFRvRnVsbFBhZ2UpIHtcbiAgICAgICAgICAvLyBhbGxvdyBub3JtYWwgc2Nyb2xsaW5nLCBidXQgcXVpdHRpbmdcbiAgICAgICAgICBpZiAoIXBhdXNlU2Nyb2xsKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIga2V5ZnJhbWVUaW1lID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGlzTmV3ID0gZmFsc2U7XG4gICAgICB2YXIgZnJhbWVzID0ge307XG4gICAgICB2YXIgdGltZWZyYW1lcyA9IHt9O1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhY3Rpb24sIG5hbWUsIHRpbWVmcmFtZSkge1xuICAgICAgICBzd2l0Y2ggKGFjdGlvbikge1xuICAgICAgICAgIGNhc2UgJ3NldCc6XG4gICAgICAgICAgICBmcmFtZXNbbmFtZV0gPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgIHRpbWVmcmFtZXNbbmFtZV0gPSB0aW1lZnJhbWU7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ2lzTmV3S2V5ZnJhbWUnOlxuICAgICAgICAgICAgdmFyIGN1cnJlbnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgIGlzTmV3ID0gY3VycmVudCAtIGZyYW1lc1tuYW1lXSA+IHRpbWVmcmFtZXNbbmFtZV07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpc05ldztcbiAgICAgIH07XG4gICAgfSgpO1xuXG4gICAgRlAubW92ZVNlY3Rpb25Eb3duID0gbW92ZVNlY3Rpb25Eb3duO1xuICAgIC8qKlxuICAgICogTW92ZXMgdGhlIHBhZ2UgZG93biBvbmUgc2VjdGlvbi5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gbW92ZVNlY3Rpb25Eb3duKCkge1xuICAgICAgdmFyIG5leHQgPSBnZXRTdGF0ZSgpLmFjdGl2ZVNlY3Rpb24ubmV4dCgpOyAvL2xvb3BpbmcgdG8gdGhlIHRvcCBpZiB0aGVyZSdzIG5vIG1vcmUgc2VjdGlvbnMgYmVsb3dcblxuICAgICAgaWYgKCFuZXh0ICYmIChnZXRPcHRpb25zKCkubG9vcEJvdHRvbSB8fCBnZXRPcHRpb25zKCkuY29udGludW91c1ZlcnRpY2FsKSkge1xuICAgICAgICBuZXh0ID0gZ2V0U3RhdGUoKS5zZWN0aW9uc1swXTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5leHQgIT0gbnVsbCkge1xuICAgICAgICBzY3JvbGxQYWdlKG5leHQsIG51bGwsIGZhbHNlKTtcbiAgICAgIH0gZWxzZSBpZiAoaGFzQ29udGVudEJleW9uZEZ1bGxQYWdlKCkpIHtcbiAgICAgICAgRXZlbnRFbWl0dGVyLmVtaXQoZXZlbnRzLnNjcm9sbEJleW9uZEZ1bGxwYWdlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYXNDb250ZW50QmV5b25kRnVsbFBhZ2UoKSB7XG4gICAgICByZXR1cm4gZ2V0Q29udGFpbmVyKCkuc2Nyb2xsSGVpZ2h0IDwgJGJvZHkuc2Nyb2xsSGVpZ2h0O1xuICAgIH1cblxuICAgIEZQLm1vdmVTZWN0aW9uVXAgPSBtb3ZlU2VjdGlvblVwO1xuICAgIC8qKlxuICAgICogTW92ZXMgdGhlIHBhZ2UgdXAgb25lIHNlY3Rpb24uXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIG1vdmVTZWN0aW9uVXAoKSB7XG4gICAgICB2YXIgcHJldiA9IGdldFN0YXRlKCkuYWN0aXZlU2VjdGlvbi5wcmV2KCk7IC8vbG9vcGluZyB0byB0aGUgYm90dG9tIGlmIHRoZXJlJ3Mgbm8gbW9yZSBzZWN0aW9ucyBhYm92ZVxuXG4gICAgICBpZiAoIXByZXYgJiYgKGdldE9wdGlvbnMoKS5sb29wVG9wIHx8IGdldE9wdGlvbnMoKS5jb250aW51b3VzVmVydGljYWwpKSB7XG4gICAgICAgIHByZXYgPSBnZXRMYXN0KGdldFN0YXRlKCkuc2VjdGlvbnMpO1xuICAgICAgfVxuXG4gICAgICBpZiAocHJldiAhPSBudWxsKSB7XG4gICAgICAgIHNjcm9sbFBhZ2UocHJldiwgbnVsbCwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIG9sZFBhZ2VZID0gMDtcbiAgICAvKipcbiAgICAqIERldGVjdGluZyB0aGUgZGlyZWN0aW9uIG9mIHRoZSBtb3VzZSBtb3ZlbWVudC5cbiAgICAqIFVzZWQgb25seSBmb3IgdGhlIG1pZGRsZSBidXR0b24gb2YgdGhlIG1vdXNlLlxuICAgICovXG5cbiAgICBmdW5jdGlvbiBtb3VzZU1vdmVIYW5kbGVyKGUpIHtcbiAgICAgIGlmICghZ2V0T3B0aW9ucygpLmF1dG9TY3JvbGxpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUuY2FuU2Nyb2xsKSB7XG4gICAgICAgIC8vIG1vdmluZyB1cFxuICAgICAgICBpZiAoZS5wYWdlWSA8IG9sZFBhZ2VZICYmIGdldElzU2Nyb2xsQWxsb3dlZCgpLm0udXApIHtcbiAgICAgICAgICBtb3ZlU2VjdGlvblVwKCk7XG4gICAgICAgIH0gLy8gbW92aW5nIGRvd25cbiAgICAgICAgZWxzZSBpZiAoZS5wYWdlWSA+IG9sZFBhZ2VZICYmIGdldElzU2Nyb2xsQWxsb3dlZCgpLm0uZG93bikge1xuICAgICAgICAgIG1vdmVTZWN0aW9uRG93bigpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG9sZFBhZ2VZID0gZS5wYWdlWTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc2V0T2xkUGFnZVkodmFsdWUpIHtcbiAgICAgIG9sZFBhZ2VZID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBEZXRlcm1pbmVzIHRoZSB3YXkgb2Ygc2Nyb2xsaW5nIHVwIG9yIGRvd246XG4gICAgKiBieSAnYXV0b21hdGljYWxseScgc2Nyb2xsaW5nIGEgc2VjdGlvbiBvciBieSB1c2luZyB0aGUgZGVmYXVsdCBhbmQgbm9ybWFsIHNjcm9sbGluZy5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gc2Nyb2xsaW5nKHR5cGUpIHtcbiAgICAgIGlmICghZ2V0SXNTY3JvbGxBbGxvd2VkKCkubVt0eXBlXSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBzY3JvbGxTZWN0aW9uID0gdHlwZSA9PT0gJ2Rvd24nID8gbW92ZVNlY3Rpb25Eb3duIDogbW92ZVNlY3Rpb25VcDtcblxuICAgICAgaWYgKGdldE9wdGlvbnMoKS5zY3JvbGxPdmVyZmxvdyAmJiBzY3JvbGxPdmVyZmxvd0hhbmRsZXIuaXNTY3JvbGxhYmxlKGdldFN0YXRlKCkuYWN0aXZlU2VjdGlvbikpIHtcbiAgICAgICAgLy9pcyB0aGUgc2Nyb2xsYmFyIGF0IHRoZSBzdGFydC9lbmQgb2YgdGhlIHNjcm9sbD9cbiAgICAgICAgaWYgKHNjcm9sbE92ZXJmbG93SGFuZGxlci5pc1Njcm9sbGVkKHR5cGUsIGdldFN0YXRlKCkuYWN0aXZlU2VjdGlvbi5pdGVtKSAmJiBzY3JvbGxPdmVyZmxvd0hhbmRsZXIuc2hvdWxkTW92ZVBhZ2UoKSkge1xuICAgICAgICAgIHNjcm9sbFNlY3Rpb24oKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2Nyb2xsU2VjdGlvbigpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciB0b3VjaFN0YXJ0WSA9IDA7XG4gICAgdmFyIHRvdWNoU3RhcnRYID0gMDtcbiAgICB2YXIgdG91Y2hFbmRZID0gMDtcbiAgICB2YXIgdG91Y2hFbmRYID0gMDtcbiAgICB2YXIgTVNQb2ludGVyID0gZ2V0TVNQb2ludGVyKCk7XG4gICAgdmFyIHBvaW50ZXJzID0ge1xuICAgICAgdG91Y2htb3ZlOiAnb250b3VjaG1vdmUnIGluIHdpbmRvdyA/ICd0b3VjaG1vdmUnIDogTVNQb2ludGVyID8gTVNQb2ludGVyLm1vdmUgOiBudWxsLFxuICAgICAgdG91Y2hzdGFydDogJ29udG91Y2hzdGFydCcgaW4gd2luZG93ID8gJ3RvdWNoc3RhcnQnIDogTVNQb2ludGVyID8gTVNQb2ludGVyLmRvd24gOiBudWxsXG4gICAgfTtcbiAgICAvKipcbiAgICAqIEFkZHMgdGhlIHBvc3NpYmlsaXR5IHRvIGF1dG8gc2Nyb2xsIHRocm91Z2ggc2VjdGlvbnMgb24gdG91Y2ggZGV2aWNlcy5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gYWRkVG91Y2hIYW5kbGVyKCkge1xuICAgICAgaWYgKCFwb2ludGVycy50b3VjaG1vdmUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNUb3VjaERldmljZSB8fCBpc1RvdWNoKSB7XG4gICAgICAgIGlmIChnZXRPcHRpb25zKCkuYXV0b1Njcm9sbGluZykge1xuICAgICAgICAgICRib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIocG9pbnRlcnMudG91Y2htb3ZlLCBwcmV2ZW50Qm91bmNpbmcsIHtcbiAgICAgICAgICAgIHBhc3NpdmU6IGZhbHNlXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgJGJvZHkuYWRkRXZlbnRMaXN0ZW5lcihwb2ludGVycy50b3VjaG1vdmUsIHByZXZlbnRCb3VuY2luZywge1xuICAgICAgICAgICAgcGFzc2l2ZTogZmFsc2VcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0b3VjaFdyYXBwZXIgPSBnZXRPcHRpb25zKCkudG91Y2hXcmFwcGVyO1xuICAgICAgICB0b3VjaFdyYXBwZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihwb2ludGVycy50b3VjaHN0YXJ0LCB0b3VjaFN0YXJ0SGFuZGxlcik7XG4gICAgICAgIHRvdWNoV3JhcHBlci5yZW1vdmVFdmVudExpc3RlbmVyKHBvaW50ZXJzLnRvdWNobW92ZSwgdG91Y2hNb3ZlSGFuZGxlciwge1xuICAgICAgICAgIHBhc3NpdmU6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgICB0b3VjaFdyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcihwb2ludGVycy50b3VjaHN0YXJ0LCB0b3VjaFN0YXJ0SGFuZGxlcik7XG4gICAgICAgIHRvdWNoV3JhcHBlci5hZGRFdmVudExpc3RlbmVyKHBvaW50ZXJzLnRvdWNobW92ZSwgdG91Y2hNb3ZlSGFuZGxlciwge1xuICAgICAgICAgIHBhc3NpdmU6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAqIFJlbW92ZXMgdGhlIGF1dG8gc2Nyb2xsaW5nIGZvciB0b3VjaCBkZXZpY2VzLlxuICAgICovXG5cbiAgICBmdW5jdGlvbiByZW1vdmVUb3VjaEhhbmRsZXIoKSB7XG4gICAgICBpZiAoIXBvaW50ZXJzLnRvdWNobW92ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChpc1RvdWNoRGV2aWNlIHx8IGlzVG91Y2gpIHtcbiAgICAgICAgLy8gbm9ybWFsU2Nyb2xsRWxlbWVudHMgcmVxdWlyZXMgaXQgb2ZmICMyNjkxXG4gICAgICAgIGlmIChnZXRPcHRpb25zKCkuYXV0b1Njcm9sbGluZykge1xuICAgICAgICAgICRib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIocG9pbnRlcnMudG91Y2htb3ZlLCB0b3VjaE1vdmVIYW5kbGVyLCB7XG4gICAgICAgICAgICBwYXNzaXZlOiBmYWxzZVxuICAgICAgICAgIH0pO1xuICAgICAgICAgICRib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIocG9pbnRlcnMudG91Y2htb3ZlLCBwcmV2ZW50Qm91bmNpbmcsIHtcbiAgICAgICAgICAgIHBhc3NpdmU6IGZhbHNlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdG91Y2hXcmFwcGVyID0gZ2V0T3B0aW9ucygpLnRvdWNoV3JhcHBlcjtcbiAgICAgICAgdG91Y2hXcmFwcGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIocG9pbnRlcnMudG91Y2hzdGFydCwgdG91Y2hTdGFydEhhbmRsZXIpO1xuICAgICAgICB0b3VjaFdyYXBwZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihwb2ludGVycy50b3VjaG1vdmUsIHRvdWNoTW92ZUhhbmRsZXIsIHtcbiAgICAgICAgICBwYXNzaXZlOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgLyogRGV0ZWN0aW5nIHRvdWNoIGV2ZW50c1xuXG4gICAgKiBBcyB3ZSBhcmUgY2hhbmdpbmcgdGhlIHRvcCBwcm9wZXJ0eSBvZiB0aGUgcGFnZSBvbiBzY3JvbGxpbmcsIHdlIGNhbiBub3QgdXNlIHRoZSB0cmFkaXRpb25hbCB3YXkgdG8gZGV0ZWN0IGl0LlxuICAgICogVGhpcyB3YXksIHRoZSB0b3VjaHN0YXJ0IGFuZCB0aGUgdG91Y2ggbW92ZXMgc2hvd3MgYW4gc21hbGwgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZW0gd2hpY2ggaXMgdGhlXG4gICAgKiB1c2VkIG9uZSB0byBkZXRlcm1pbmUgdGhlIGRpcmVjdGlvbi5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gdG91Y2hNb3ZlSGFuZGxlcihlKSB7XG4gICAgICB2YXIgYWN0aXZlU2VjdGlvbiA9IGNsb3Nlc3QoZS50YXJnZXQsIFNFQ1RJT05fU0VMKSB8fCBnZXRTdGF0ZSgpLmFjdGl2ZVNlY3Rpb24uaXRlbTtcbiAgICAgIHZhciBoYXNBY3RpdmVTZWN0aW9uT3ZlcmZsb3cgPSBzY3JvbGxPdmVyZmxvd0hhbmRsZXIuaXNTY3JvbGxhYmxlKGdldFN0YXRlKCkuYWN0aXZlU2VjdGlvbik7XG5cbiAgICAgIGlmIChpc1JlYWxseVRvdWNoKGUpKSB7XG4gICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICBpc0dyYWJiaW5nOiB0cnVlLFxuICAgICAgICAgIGlzVXNpbmdXaGVlbDogZmFsc2VcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGdldE9wdGlvbnMoKS5hdXRvU2Nyb2xsaW5nKSB7XG4gICAgICAgICAgaWYgKGhhc0FjdGl2ZVNlY3Rpb25PdmVyZmxvdyAmJiAhc3RhdGUuY2FuU2Nyb2xsKSB7XG4gICAgICAgICAgICAvL3ByZXZlbnRpbmcgdGhlIGVhc2luZyBvbiBpT1MgZGV2aWNlc1xuICAgICAgICAgICAgcHJldmVudERlZmF1bHQoZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRvdWNoRXZlbnRzID0gZ2V0RXZlbnRzUGFnZShlKTtcbiAgICAgICAgdG91Y2hFbmRZID0gdG91Y2hFdmVudHMueTtcbiAgICAgICAgdG91Y2hFbmRYID0gdG91Y2hFdmVudHMueDtcbiAgICAgICAgdmFyIGlzVmVydGljYWxNb3ZlbWVudEVub3VnaCA9IE1hdGguYWJzKHRvdWNoU3RhcnRZIC0gdG91Y2hFbmRZKSA+IHdpbi5pbm5lckhlaWdodCAvIDEwMCAqIGdldE9wdGlvbnMoKS50b3VjaFNlbnNpdGl2aXR5O1xuICAgICAgICB2YXIgaXNIb3Jpem9udGFsTW92ZW1lbnRFbm91Z2ggPSBNYXRoLmFicyh0b3VjaFN0YXJ0WCAtIHRvdWNoRW5kWCkgPiBnZXRXaW5kb3dXaWR0aCgpIC8gMTAwICogZ2V0T3B0aW9ucygpLnRvdWNoU2Vuc2l0aXZpdHk7XG4gICAgICAgIHZhciBpc0hvcml6b250YWxQcmVkb21pbmFudE1vdmUgPSAkKFNMSURFU19XUkFQUEVSX1NFTCwgYWN0aXZlU2VjdGlvbikubGVuZ3RoICYmIE1hdGguYWJzKHRvdWNoU3RhcnRYIC0gdG91Y2hFbmRYKSA+IE1hdGguYWJzKHRvdWNoU3RhcnRZIC0gdG91Y2hFbmRZKTtcbiAgICAgICAgdmFyIGRpcmVjdGlvbkggPSB0b3VjaFN0YXJ0WCA+IHRvdWNoRW5kWCA/ICdyaWdodCcgOiAnbGVmdCc7XG4gICAgICAgIHZhciBkaXJlY3Rpb25WID0gdG91Y2hTdGFydFkgPiB0b3VjaEVuZFkgPyAnZG93bicgOiAndXAnO1xuICAgICAgICB2YXIgZGlyZWN0aW9uID0gaXNIb3Jpem9udGFsUHJlZG9taW5hbnRNb3ZlID8gZGlyZWN0aW9uSCA6IGRpcmVjdGlvblY7XG4gICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICB0b3VjaERpcmVjdGlvbjogZGlyZWN0aW9uXG4gICAgICAgIH0pOyAvL2lmIG1vdmVtZW50IGluIHRoZSBYIGF4eXMgaXMgZ3JlYXRlciB0aGFuIGluIHRoZSBZIGFuZCB0aGUgY3VycmVjdCBzZWN0aW9uIGhhcyBzbGlkZXMuLi5cblxuICAgICAgICBpZiAoaXNIb3Jpem9udGFsUHJlZG9taW5hbnRNb3ZlKSB7XG4gICAgICAgICAgLy9pcyB0aGUgbW92ZW1lbnQgZ3JlYXRlciB0aGFuIHRoZSBtaW5pbXVtIHJlc2lzdGFuY2UgdG8gc2Nyb2xsP1xuICAgICAgICAgIGlmICghc3RhdGUuc2xpZGVNb3ZpbmcgJiYgaXNIb3Jpem9udGFsTW92ZW1lbnRFbm91Z2gpIHtcbiAgICAgICAgICAgIGlmICh0b3VjaFN0YXJ0WCA+IHRvdWNoRW5kWCkge1xuICAgICAgICAgICAgICBpZiAoZ2V0SXNTY3JvbGxBbGxvd2VkKCkubS5yaWdodCkge1xuICAgICAgICAgICAgICAgIEV2ZW50RW1pdHRlci5lbWl0KGV2ZW50cy5tb3ZlU2xpZGVSaWdodCwge1xuICAgICAgICAgICAgICAgICAgc2VjdGlvbjogYWN0aXZlU2VjdGlvblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoZ2V0SXNTY3JvbGxBbGxvd2VkKCkubS5sZWZ0KSB7XG4gICAgICAgICAgICAgICAgRXZlbnRFbWl0dGVyLmVtaXQoZXZlbnRzLm1vdmVTbGlkZUxlZnQsIHtcbiAgICAgICAgICAgICAgICAgIHNlY3Rpb246IGFjdGl2ZVNlY3Rpb25cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSAvL3ZlcnRpY2FsIHNjcm9sbGluZyAob25seSB3aGVuIGF1dG9TY3JvbGxpbmcgaXMgZW5hYmxlZClcbiAgICAgICAgZWxzZSBpZiAoZ2V0T3B0aW9ucygpLmF1dG9TY3JvbGxpbmcgJiYgc3RhdGUuY2FuU2Nyb2xsKSB7XG4gICAgICAgICAgLy9pcyB0aGUgbW92ZW1lbnQgZ3JlYXRlciB0aGFuIHRoZSBtaW5pbXVtIHJlc2lzdGFuY2UgdG8gc2Nyb2xsP1xuICAgICAgICAgIGlmIChpc1ZlcnRpY2FsTW92ZW1lbnRFbm91Z2gpIHtcbiAgICAgICAgICAgIHNjcm9sbGluZyhkaXJlY3Rpb25WKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgKiBBcyBJRSA+PSAxMCBmaXJlcyBib3RoIHRvdWNoIGFuZCBtb3VzZSBldmVudHMgd2hlbiB1c2luZyBhIG1vdXNlIGluIGEgdG91Y2hzY3JlZW5cbiAgICAqIHRoaXMgd2F5IHdlIG1ha2Ugc3VyZSB0aGF0IGlzIHJlYWxseSBhIHRvdWNoIGV2ZW50IHdoYXQgSUUgaXMgZGV0ZWN0aW5nLlxuICAgICovXG5cblxuICAgIGZ1bmN0aW9uIGlzUmVhbGx5VG91Y2goZSkge1xuICAgICAgLy9pZiBpcyBub3QgSUUgICB8fCAgSUUgaXMgZGV0ZWN0aW5nIGB0b3VjaGAgb3IgYHBlbmBcbiAgICAgIHJldHVybiB0eXBlb2YgZS5wb2ludGVyVHlwZSA9PT0gJ3VuZGVmaW5lZCcgfHwgZS5wb2ludGVyVHlwZSAhPSAnbW91c2UnO1xuICAgIH1cbiAgICAvKipcbiAgICAqIEhhbmRsZXIgZm9yIHRoZSB0b3VjaCBzdGFydCBldmVudC5cbiAgICAqL1xuXG5cbiAgICBmdW5jdGlvbiB0b3VjaFN0YXJ0SGFuZGxlcihlKSB7XG4gICAgICAvL3N0b3BwaW5nIHRoZSBhdXRvIHNjcm9sbCB0byBhZGp1c3QgdG8gYSBzZWN0aW9uXG4gICAgICBpZiAoZ2V0T3B0aW9ucygpLmZpdFRvU2VjdGlvbikge1xuICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgYWN0aXZlQW5pbWF0aW9uOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzUmVhbGx5VG91Y2goZSkpIHtcbiAgICAgICAgdmFyIHRvdWNoRXZlbnRzID0gZ2V0RXZlbnRzUGFnZShlKTtcbiAgICAgICAgdG91Y2hTdGFydFkgPSB0b3VjaEV2ZW50cy55O1xuICAgICAgICB0b3VjaFN0YXJ0WCA9IHRvdWNoRXZlbnRzLng7XG4gICAgICB9XG5cbiAgICAgIHdpbmRvd0FkZEV2ZW50KCd0b3VjaGVuZCcsIHRvdWNoRW5kSGFuZGxlcik7XG4gICAgfVxuICAgIC8qKlxuICAgICogSGFuZGxlciBmb3IgdGhlIHRvdWNoIGVuZCBldmVudC5cbiAgICAqL1xuXG5cbiAgICBmdW5jdGlvbiB0b3VjaEVuZEhhbmRsZXIoKSB7XG4gICAgICB3aW5kb3dSZW1vdmVFdmVudCgndG91Y2hlbmQnLCB0b3VjaEVuZEhhbmRsZXIpO1xuICAgICAgc2V0U3RhdGUoe1xuICAgICAgICBpc0dyYWJiaW5nOiBmYWxzZVxuICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICogR2V0cyB0aGUgcGFnZVggYW5kIHBhZ2VZIHByb3BlcnRpZXMgZGVwZW5kaW5nIG9uIHRoZSBicm93c2VyLlxuICAgICogaHR0cHM6Ly9naXRodWIuY29tL2FsdmFyb3RyaWdvL2Z1bGxQYWdlLmpzL2lzc3Vlcy8xOTQjaXNzdWVjb21tZW50LTM0MDY5ODU0XG4gICAgKi9cblxuXG4gICAgZnVuY3Rpb24gZ2V0RXZlbnRzUGFnZShlKSB7XG4gICAgICB2YXIgZXZlbnRzID0ge307XG4gICAgICBldmVudHMueSA9IHR5cGVvZiBlLnBhZ2VZICE9PSAndW5kZWZpbmVkJyAmJiAoZS5wYWdlWSB8fCBlLnBhZ2VYKSA/IGUucGFnZVkgOiBlLnRvdWNoZXNbMF0ucGFnZVk7XG4gICAgICBldmVudHMueCA9IHR5cGVvZiBlLnBhZ2VYICE9PSAndW5kZWZpbmVkJyAmJiAoZS5wYWdlWSB8fCBlLnBhZ2VYKSA/IGUucGFnZVggOiBlLnRvdWNoZXNbMF0ucGFnZVg7IC8vaW4gdG91Y2ggZGV2aWNlcyB3aXRoIHNjcm9sbEJhcjp0cnVlLCBlLnBhZ2VZIGlzIGRldGVjdGVkLCBidXQgd2UgaGF2ZSB0byBkZWFsIHdpdGggdG91Y2ggZXZlbnRzLiAjMTAwOFxuXG4gICAgICBpZiAoaXNUb3VjaCAmJiBpc1JlYWxseVRvdWNoKGUpICYmIGdldE9wdGlvbnMoKS5zY3JvbGxCYXIgJiYgdHlwZW9mIGUudG91Y2hlcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgZXZlbnRzLnkgPSBlLnRvdWNoZXNbMF0ucGFnZVk7XG4gICAgICAgIGV2ZW50cy54ID0gZS50b3VjaGVzWzBdLnBhZ2VYO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZXZlbnRzO1xuICAgIH1cbiAgICAvKlxuICAgICogUmV0dXJucyBhbmQgb2JqZWN0IHdpdGggTWljcm9zb2Z0IHBvaW50ZXJzIChmb3IgSUU8MTEgYW5kIGZvciBJRSA+PSAxMSlcbiAgICAqIGh0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9pZS9kbjMwNDg4Nih2PXZzLjg1KS5hc3B4XG4gICAgKi9cblxuXG4gICAgZnVuY3Rpb24gZ2V0TVNQb2ludGVyKCkge1xuICAgICAgdmFyIHBvaW50ZXI7IC8vSUUgPj0gMTEgJiByZXN0IG9mIGJyb3dzZXJzXG5cbiAgICAgIGlmICh3aW4uUG9pbnRlckV2ZW50KSB7XG4gICAgICAgIHBvaW50ZXIgPSB7XG4gICAgICAgICAgZG93bjogJ3BvaW50ZXJkb3duJyxcbiAgICAgICAgICBtb3ZlOiAncG9pbnRlcm1vdmUnXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwb2ludGVyO1xuICAgIH1cbiAgICAvKlxuICAgICogUHJldmVudGluZyBib3VuY2luZyBpbiBpT1MgIzIyODVcbiAgICAqL1xuXG5cbiAgICBmdW5jdGlvbiBwcmV2ZW50Qm91bmNpbmcoZSkge1xuICAgICAgaWYgKGdldE9wdGlvbnMoKS5hdXRvU2Nyb2xsaW5nICYmIGlzUmVhbGx5VG91Y2goZSkgJiYgZ2V0SXNTY3JvbGxBbGxvd2VkKCkubS51cCkge1xuICAgICAgICAvL3ByZXZlbnRpbmcgdGhlIGVhc2luZyBvbiBpT1MgZGV2aWNlc1xuICAgICAgICBpZiAoIXN0YXRlLmNhblNjcm9sbCkge1xuICAgICAgICAgIHByZXZlbnREZWZhdWx0KGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgRlAubW92ZVNsaWRlTGVmdCA9IG1vdmVTbGlkZUxlZnQ7XG4gICAgRlAubW92ZVNsaWRlUmlnaHQgPSBtb3ZlU2xpZGVSaWdodDtcbiAgICAvKipcbiAgICAqIFNsaWRlcyBhIHNsaWRlciB0byB0aGUgZ2l2ZW4gZGlyZWN0aW9uLlxuICAgICogT3B0aW9uYWwgYHNlY3Rpb25gIHBhcmFtLlxuICAgICovXG5cbiAgICBmdW5jdGlvbiBtb3ZlU2xpZGUoZGlyZWN0aW9uLCBzZWN0aW9uKSB7XG4gICAgICB2YXIgYWN0aXZlU2VjdGlvbkl0ZW0gPSBzZWN0aW9uID09IG51bGwgPyBnZXRTdGF0ZSgpLmFjdGl2ZVNlY3Rpb24uaXRlbSA6IHNlY3Rpb247XG4gICAgICB2YXIgYWN0aXZlU2VjdGlvbiA9IGdldFBhbmVsQnlFbGVtZW50KHN0YXRlLnNlY3Rpb25zLCBhY3RpdmVTZWN0aW9uSXRlbSk7XG4gICAgICB2YXIgc2xpZGVzID0gJChTTElERVNfV1JBUFBFUl9TRUwsIGFjdGl2ZVNlY3Rpb25JdGVtKVswXTsgLy8gbW9yZSB0aGFuIG9uZSBzbGlkZSBuZWVkZWQgYW5kIG5vdGhpbmcgc2hvdWxkIGJlIHNsaWRpbmdcblxuICAgICAgaWYgKHNsaWRlcyA9PSBudWxsIHx8IHN0YXRlLnNsaWRlTW92aW5nIHx8IGFjdGl2ZVNlY3Rpb24uc2xpZGVzLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgY3VycmVudFNsaWRlID0gYWN0aXZlU2VjdGlvbi5hY3RpdmVTbGlkZTtcbiAgICAgIHZhciBkZXN0aW55ID0gZGlyZWN0aW9uID09PSAnbGVmdCcgPyBjdXJyZW50U2xpZGUucHJldigpIDogY3VycmVudFNsaWRlLm5leHQoKTsgLy9pc24ndCB0aGVyZSBhIG5leHQgc2xpZGUgaW4gdGhlIHNlY3VlbmNlP1xuXG4gICAgICBpZiAoIWRlc3RpbnkpIHtcbiAgICAgICAgLy9yZXNwZWN0IGxvb3BIb3Jpem9udGFsIHNldHRpbmdcbiAgICAgICAgaWYgKCFnZXRPcHRpb25zKCkubG9vcEhvcml6b250YWwpIHJldHVybjtcbiAgICAgICAgZGVzdGlueSA9IGRpcmVjdGlvbiA9PT0gJ2xlZnQnID8gZ2V0TGFzdChhY3RpdmVTZWN0aW9uLnNsaWRlcykgOiBhY3RpdmVTZWN0aW9uLnNsaWRlc1swXTtcbiAgICAgIH1cblxuICAgICAgc2V0U3RhdGUoe1xuICAgICAgICBzbGlkZU1vdmluZzogIUZQLnRlc3QuaXNUZXN0aW5nXG4gICAgICB9KTtcbiAgICAgIGxhbmRzY2FwZVNjcm9sbChzbGlkZXMsIGRlc3RpbnkuaXRlbSwgZGlyZWN0aW9uKTtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBTbGlkZXMgbGVmdCB0aGUgc2xpZGVyIG9mIHRoZSBhY3RpdmUgc2VjdGlvbi5cbiAgICAqIE9wdGlvbmFsIGBzZWN0aW9uYCBwYXJhbS5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gbW92ZVNsaWRlTGVmdChzZWN0aW9uKSB7XG4gICAgICBtb3ZlU2xpZGUoJ2xlZnQnLCBzZWN0aW9uKTtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBTbGlkZXMgcmlnaHQgdGhlIHNsaWRlciBvZiB0aGUgYWN0aXZlIHNlY3Rpb24uXG4gICAgKiBPcHRpb25hbCBgc2VjdGlvbmAgcGFyYW0uXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIG1vdmVTbGlkZVJpZ2h0KHNlY3Rpb24pIHtcbiAgICAgIG1vdmVTbGlkZSgncmlnaHQnLCBzZWN0aW9uKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIEdldHMgYSBzZWN0aW9uIGJ5IGl0cyBhbmNob3IgLyBpbmRleFxuICAgICovXG5cbiAgICBmdW5jdGlvbiBnZXRTZWN0aW9uQnlBbmNob3Ioc2VjdGlvbkFuY2hvcikge1xuICAgICAgdmFyIHNlY3Rpb24gPSBnZXRTdGF0ZSgpLnNlY3Rpb25zLmZpbHRlcihmdW5jdGlvbiAoc2VjdGlvbikge1xuICAgICAgICByZXR1cm4gc2VjdGlvbi5hbmNob3IgPT09IHNlY3Rpb25BbmNob3I7XG4gICAgICB9KVswXTtcblxuICAgICAgaWYgKCFzZWN0aW9uKSB7XG4gICAgICAgIHZhciBzZWN0aW9uSW5kZXggPSB0eXBlb2Ygc2VjdGlvbkFuY2hvciAhPT0gJ3VuZGVmaW5lZCcgPyBzZWN0aW9uQW5jaG9yIC0gMSA6IDA7XG4gICAgICAgIHNlY3Rpb24gPSBnZXRTdGF0ZSgpLnNlY3Rpb25zW3NlY3Rpb25JbmRleF07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzZWN0aW9uO1xuICAgIH1cblxuICAgIC8qKlxuICAgICogU2Nyb2xscyB0aGUgc2xpZGVyIHRvIHRoZSBnaXZlbiBzbGlkZSBkZXN0aW5hdGlvbiBmb3IgdGhlIGdpdmVuIHNlY3Rpb25cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gc2Nyb2xsU2xpZGVyKHNsaWRlRWxlbSkge1xuICAgICAgaWYgKHNsaWRlRWxlbSAhPSBudWxsKSB7XG4gICAgICAgIGxhbmRzY2FwZVNjcm9sbChjbG9zZXN0KHNsaWRlRWxlbSwgU0xJREVTX1dSQVBQRVJfU0VMKSwgc2xpZGVFbGVtKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAqIFNjcm9sbHMgdG8gdGhlIGdpdmVuIHNlY3Rpb24gYW5kIHNsaWRlIGFuY2hvcnNcbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gc2Nyb2xsUGFnZUFuZFNsaWRlKHNlY3Rpb25BbmNob3IsIHNsaWRlQW5jaG9yKSB7XG4gICAgICB2YXIgc2VjdGlvbiA9IGdldFNlY3Rpb25CeUFuY2hvcihzZWN0aW9uQW5jaG9yKTsgLy9kbyBub3RoaW5nIGlmIHRoZXJlJ3Mgbm8gc2VjdGlvbiB3aXRoIHRoZSBnaXZlbiBhbmNob3IgbmFtZVxuXG4gICAgICBpZiAoc2VjdGlvbiA9PSBudWxsKSByZXR1cm47XG4gICAgICB2YXIgc2xpZGVFbGVtID0gZ2V0U2xpZGVCeUFuY2hvcihzbGlkZUFuY2hvciwgc2VjdGlvbik7IC8vd2UgbmVlZCB0byBzY3JvbGwgdG8gdGhlIHNlY3Rpb24gYW5kIHRoZW4gdG8gdGhlIHNsaWRlXG5cbiAgICAgIGlmIChzZWN0aW9uLmFuY2hvciAhPT0gc3RhdGUubGFzdFNjcm9sbGVkRGVzdGlueSAmJiAhaGFzQ2xhc3Moc2VjdGlvbi5pdGVtLCBBQ1RJVkUpKSB7XG4gICAgICAgIHNjcm9sbFBhZ2Uoc2VjdGlvbiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHNjcm9sbFNsaWRlcihzbGlkZUVsZW0pO1xuICAgICAgICB9KTtcbiAgICAgIH0gLy9pZiB3ZSB3ZXJlIGFscmVhZHkgaW4gdGhlIHNlY3Rpb25cbiAgICAgIGVsc2Uge1xuICAgICAgICBzY3JvbGxTbGlkZXIoc2xpZGVFbGVtKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgKiBHZXRzIGEgc2xpZGUgaW5zaWRlIGEgZ2l2ZW4gc2VjdGlvbiBieSBpdHMgYW5jaG9yIC8gaW5kZXhcbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gZ2V0U2xpZGVCeUFuY2hvcihzbGlkZUFuY2hvciwgc2VjdGlvbikge1xuICAgICAgdmFyIHNsaWRlID0gc2VjdGlvbi5zbGlkZXMuZmlsdGVyKGZ1bmN0aW9uIChzbGlkZSkge1xuICAgICAgICByZXR1cm4gc2xpZGUuYW5jaG9yID09PSBzbGlkZUFuY2hvcjtcbiAgICAgIH0pWzBdO1xuXG4gICAgICBpZiAoc2xpZGUgPT0gbnVsbCkge1xuICAgICAgICBzbGlkZUFuY2hvciA9IHR5cGVvZiBzbGlkZUFuY2hvciAhPT0gJ3VuZGVmaW5lZCcgPyBzbGlkZUFuY2hvciA6IDA7XG4gICAgICAgIHNsaWRlID0gc2VjdGlvbi5zbGlkZXNbc2xpZGVBbmNob3JdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2xpZGUgPyBzbGlkZS5pdGVtIDogbnVsbDtcbiAgICB9XG5cbiAgICBGUC5tb3ZlVG8gPSBtb3ZlVG8kMTtcbiAgICAvKipcbiAgICAqIE1vdmVzIHRoZSBwYWdlIHRvIHRoZSBnaXZlbiBzZWN0aW9uIGFuZCBzbGlkZS5cbiAgICAqIEFuY2hvcnMgb3IgaW5kZXggcG9zaXRpb25zIGNhbiBiZSB1c2VkIGFzIHBhcmFtcy5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gbW92ZVRvJDEoc2VjdGlvbkFuY2hvciwgc2xpZGVBbmNob3IpIHtcbiAgICAgIHZhciBkZXN0aW55ID0gZ2V0U2VjdGlvbkJ5QW5jaG9yKHNlY3Rpb25BbmNob3IpO1xuXG4gICAgICBpZiAodHlwZW9mIHNsaWRlQW5jaG9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBzY3JvbGxQYWdlQW5kU2xpZGUoc2VjdGlvbkFuY2hvciwgc2xpZGVBbmNob3IpO1xuICAgICAgfSBlbHNlIGlmIChkZXN0aW55ICE9IG51bGwpIHtcbiAgICAgICAgc2Nyb2xsUGFnZShkZXN0aW55KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvL0B0cy1jaGVja1xuICAgIHZhciBnX2NvbnRyb2xQcmVzc2VkO1xuICAgIHZhciBnX2tleWRvd25JZDtcbiAgICB2YXIgZ19lbFRvRm9jdXM7XG4gICAgRXZlbnRFbWl0dGVyLm9uKGV2ZW50cy5iaW5kRXZlbnRzLCBiaW5kRXZlbnRzJDgpO1xuXG4gICAgZnVuY3Rpb24gYmluZEV2ZW50cyQ4KCkge1xuICAgICAgLy93aGVuIG9wZW5pbmcgYSBuZXcgdGFiIChjdHJsICsgdCksIGBjb250cm9sYCB3b24ndCBiZSBwcmVzc2VkIHdoZW4gY29taW5nIGJhY2suXG4gICAgICB3aW5kb3dBZGRFdmVudCgnYmx1cicsIGJsdXJIYW5kbGVyKTsgLy9TbGlkaW5nIHdpdGggYXJyb3cga2V5cywgYm90aCwgdmVydGljYWwgYW5kIGhvcml6b250YWxcblxuICAgICAgZG9jQWRkRXZlbnQoJ2tleWRvd24nLCBrZXlkb3duSGFuZGxlcik7IC8vdG8gcHJldmVudCBzY3JvbGxpbmcgd2hpbGUgem9vbWluZ1xuXG4gICAgICBkb2NBZGRFdmVudCgna2V5dXAnLCBrZXlVcEhhbmRsZXIpO1xuICAgICAgRXZlbnRFbWl0dGVyLm9uKGV2ZW50cy5vbkRlc3Ryb3ksIG9uRGVzdHJveSQ1KTtcbiAgICAgIEV2ZW50RW1pdHRlci5vbihldmVudHMuYWZ0ZXJTbGlkZUxvYWRzLCBvbkFmdGVyU2xpZGVMb2Fkcyk7XG4gICAgICBFdmVudEVtaXR0ZXIub24oZXZlbnRzLmFmdGVyU2VjdGlvbkxvYWRzLCBhZnRlclNlY3Rpb25Mb2Fkcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25EZXN0cm95JDUoKSB7XG4gICAgICBjbGVhclRpbWVvdXQoZ19rZXlkb3duSWQpO1xuICAgICAgZG9jUmVtb3ZlRXZlbnQoJ2tleWRvd24nLCBrZXlkb3duSGFuZGxlcik7XG4gICAgICBkb2NSZW1vdmVFdmVudCgna2V5dXAnLCBrZXlVcEhhbmRsZXIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzSW5zaWRlSW5wdXQoKSB7XG4gICAgICB2YXIgYWN0aXZlRWxlbWVudCA9IGRvYy5hY3RpdmVFbGVtZW50O1xuICAgICAgcmV0dXJuIG1hdGNoZXMoYWN0aXZlRWxlbWVudCwgJ3RleHRhcmVhJykgfHwgbWF0Y2hlcyhhY3RpdmVFbGVtZW50LCAnaW5wdXQnKSB8fCBtYXRjaGVzKGFjdGl2ZUVsZW1lbnQsICdzZWxlY3QnKSB8fCBnZXRBdHRyKGFjdGl2ZUVsZW1lbnQsICdjb250ZW50RWRpdGFibGUnKSA9PSBcInRydWVcIiB8fCBnZXRBdHRyKGFjdGl2ZUVsZW1lbnQsICdjb250ZW50RWRpdGFibGUnKSA9PSAnJztcbiAgICB9IC8vU2xpZGluZyB3aXRoIGFycm93IGtleXMsIGJvdGgsIHZlcnRpY2FsIGFuZCBob3Jpem9udGFsXG5cblxuICAgIGZ1bmN0aW9uIGtleWRvd25IYW5kbGVyKGUpIHtcbiAgICAgIGNsZWFyVGltZW91dChnX2tleWRvd25JZCk7XG4gICAgICB2YXIga2V5Q29kZSA9IGUua2V5Q29kZTtcbiAgICAgIHZhciBpc1ByZXNzaW5nSG9yaXpvbnRhbEFycm93cyA9IFszNywgMzldLmluZGV4T2Yoa2V5Q29kZSkgPiAtMTtcbiAgICAgIHZhciBjYW5TY3JvbGxXaXRoS2V5Ym9hcmQgPSBnZXRPcHRpb25zKCkuYXV0b1Njcm9sbGluZyB8fCBnZXRPcHRpb25zKCkuZml0VG9TZWN0aW9uIHx8IGlzUHJlc3NpbmdIb3Jpem9udGFsQXJyb3dzOyAvL3RhYj9cblxuICAgICAgaWYgKGtleUNvZGUgPT09IDkpIHtcbiAgICAgICAgb25UYWIoZSk7XG4gICAgICB9IGVsc2UgaWYgKCFpc0luc2lkZUlucHV0KCkgJiYgZ2V0T3B0aW9ucygpLmtleWJvYXJkU2Nyb2xsaW5nICYmIGNhblNjcm9sbFdpdGhLZXlib2FyZCkge1xuICAgICAgICBnX2NvbnRyb2xQcmVzc2VkID0gZS5jdHJsS2V5O1xuICAgICAgICBnX2tleWRvd25JZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIG9ua2V5ZG93bihlKTtcbiAgICAgICAgfSwgMCk7XG4gICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICogS2V5ZG93biBldmVudFxuICAgICovXG5cblxuICAgIGZ1bmN0aW9uIG9ua2V5ZG93bihlKSB7XG4gICAgICB2YXIgc2hpZnRQcmVzc2VkID0gZS5zaGlmdEtleTtcbiAgICAgIHZhciBhY3RpdmVFbGVtZW50ID0gZG9jLmFjdGl2ZUVsZW1lbnQ7XG4gICAgICB2YXIgaXNNZWRpYUZvY3VzZWQgPSBtYXRjaGVzKGFjdGl2ZUVsZW1lbnQsICd2aWRlbycpIHx8IG1hdGNoZXMoYWN0aXZlRWxlbWVudCwgJ2F1ZGlvJyk7XG4gICAgICB2YXIgaXNTY3JvbGxlZCA9IHtcbiAgICAgICAgdXA6IHNjcm9sbE92ZXJmbG93SGFuZGxlci5pc1Njcm9sbGVkKCd1cCcsIGdldFN0YXRlKCkuYWN0aXZlU2VjdGlvbi5pdGVtKSxcbiAgICAgICAgZG93bjogc2Nyb2xsT3ZlcmZsb3dIYW5kbGVyLmlzU2Nyb2xsZWQoJ2Rvd24nLCBnZXRTdGF0ZSgpLmFjdGl2ZVNlY3Rpb24uaXRlbSlcbiAgICAgIH07XG4gICAgICB2YXIgaXNVc2luZ0hvcml6b250YWxBcnJvd0tleXMgPSBbMzcsIDM5XS5pbmRleE9mKGUua2V5Q29kZSkgPiAtMTtcbiAgICAgIGNhbmNlbERpcmVjdGlvbktleUV2ZW50cyhlKTsgLy9kbyBub3RoaW5nIGlmIHdlIGNhbiBub3Qgc2Nyb2xsIG9yIHdlIGFyZSBub3QgdXNpbmcgaG9yaXpvdG5hbCBrZXkgYXJyb3dzLlxuXG4gICAgICBpZiAoIXN0YXRlLmNhblNjcm9sbCAmJiAhaXNVc2luZ0hvcml6b250YWxBcnJvd0tleXMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzZXRTdGF0ZSh7XG4gICAgICAgIHNjcm9sbFRyaWdnZXI6ICdrZXlkb3duJ1xuICAgICAgfSk7XG5cbiAgICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICAgIC8vdXBcbiAgICAgICAgY2FzZSAzODpcbiAgICAgICAgY2FzZSAzMzpcbiAgICAgICAgICBpZiAoZ2V0SXNTY3JvbGxBbGxvd2VkKCkuay51cCAmJiBpc1Njcm9sbGVkLnVwKSB7XG4gICAgICAgICAgICBpZiAoc3RhdGUuaXNCZXlvbmRGdWxscGFnZSkge1xuICAgICAgICAgICAgICBFdmVudEVtaXR0ZXIuZW1pdChldmVudHMub25LZXlEb3duLCB7XG4gICAgICAgICAgICAgICAgZTogZVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG1vdmVTZWN0aW9uVXAoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgLy9kb3duXG5cbiAgICAgICAgY2FzZSAzMjpcbiAgICAgICAgICAvL3NwYWNlYmFyXG4gICAgICAgICAgaWYgKHNoaWZ0UHJlc3NlZCAmJiBnZXRJc1Njcm9sbEFsbG93ZWQoKS5rLnVwICYmICFpc01lZGlhRm9jdXNlZCAmJiBpc1Njcm9sbGVkLnVwKSB7XG4gICAgICAgICAgICBtb3ZlU2VjdGlvblVwKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuXG4gICAgICAgIGNhc2UgNDA6XG4gICAgICAgIGNhc2UgMzQ6XG4gICAgICAgICAgaWYgKGdldElzU2Nyb2xsQWxsb3dlZCgpLmsuZG93biAmJiBpc1Njcm9sbGVkLmRvd24pIHtcbiAgICAgICAgICAgIGlmIChzdGF0ZS5pc0JleW9uZEZ1bGxwYWdlKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gLy8gc3BhY2UgYmFyP1xuXG5cbiAgICAgICAgICAgIGlmIChlLmtleUNvZGUgIT09IDMyIHx8ICFpc01lZGlhRm9jdXNlZCkge1xuICAgICAgICAgICAgICBtb3ZlU2VjdGlvbkRvd24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgLy9Ib21lXG5cbiAgICAgICAgY2FzZSAzNjpcbiAgICAgICAgICBpZiAoZ2V0SXNTY3JvbGxBbGxvd2VkKCkuay51cCkge1xuICAgICAgICAgICAgbW92ZVRvJDEoMSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vRW5kXG5cbiAgICAgICAgY2FzZSAzNTpcbiAgICAgICAgICBpZiAoZ2V0SXNTY3JvbGxBbGxvd2VkKCkuay5kb3duKSB7XG4gICAgICAgICAgICBtb3ZlVG8kMShnZXRTdGF0ZSgpLnNlY3Rpb25zLmxlbmd0aCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vbGVmdFxuXG4gICAgICAgIGNhc2UgMzc6XG4gICAgICAgICAgaWYgKGdldElzU2Nyb2xsQWxsb3dlZCgpLmsubGVmdCkge1xuICAgICAgICAgICAgbW92ZVNsaWRlTGVmdCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICAvL3JpZ2h0XG5cbiAgICAgICAgY2FzZSAzOTpcbiAgICAgICAgICBpZiAoZ2V0SXNTY3JvbGxBbGxvd2VkKCkuay5yaWdodCkge1xuICAgICAgICAgICAgbW92ZVNsaWRlUmlnaHQoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgLy8gZXhpdCB0aGlzIGhhbmRsZXIgZm9yIG90aGVyIGtleXNcbiAgICAgIH1cbiAgICB9IC8vdG8gcHJldmVudCBzY3JvbGxpbmcgd2hpbGUgem9vbWluZ1xuXG5cbiAgICBmdW5jdGlvbiBrZXlVcEhhbmRsZXIoZSkge1xuICAgICAgaWYgKHN0YXRlLmlzV2luZG93Rm9jdXNlZCkge1xuICAgICAgICAvL3RoZSBrZXl1cCBnZXRzIGZpcmVkIG9uIG5ldyB0YWIgY3RybCArIHQgaW4gRmlyZWZveFxuICAgICAgICBnX2NvbnRyb2xQcmVzc2VkID0gZS5jdHJsS2V5O1xuICAgICAgfVxuICAgIH0gLy93aGVuIG9wZW5pbmcgYSBuZXcgdGFiIChjdHJsICsgdCksIGBjb250cm9sYCB3b24ndCBiZSBwcmVzc2VkIHdoZW4gY29taW5nIGJhY2suXG5cblxuICAgIGZ1bmN0aW9uIGJsdXJIYW5kbGVyKCkge1xuICAgICAgc2V0U3RhdGUoe1xuICAgICAgICBpc1dpbmRvd0ZvY3VzZWQ6IGZhbHNlXG4gICAgICB9KTtcbiAgICAgIGdfY29udHJvbFByZXNzZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBNYWtlcyBzdXJlIHRoZSB0YWIga2V5IHdpbGwgb25seSBmb2N1cyBlbGVtZW50cyB3aXRoaW4gdGhlIGN1cnJlbnQgc2VjdGlvbi9zbGlkZVxuICAgICogcHJldmVudGluZyB0aGlzIHdheSBmcm9tIGJyZWFraW5nIHRoZSBwYWdlLlxuICAgICogQmFzZWQgb24gXCJNb2RhbHMgYW5kIGtleWJvYXJkIHRyYXBzXCJcbiAgICAqIGZyb20gaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vd2ViL2Z1bmRhbWVudGFscy9hY2Nlc3NpYmlsaXR5L2ZvY3VzL3VzaW5nLXRhYmluZGV4XG4gICAgKi9cblxuXG4gICAgZnVuY3Rpb24gb25UYWIoZSkge1xuICAgICAgdmFyIGlzU2hpZnRQcmVzc2VkID0gZS5zaGlmdEtleTtcbiAgICAgIHZhciBhY3RpdmVFbGVtZW50ID0gZG9jLmFjdGl2ZUVsZW1lbnQ7XG4gICAgICB2YXIgZm9jdXNhYmxlRWxlbWVudHMgPSBnZXRGb2N1c2FibGVzKGdldFNsaWRlT3JTZWN0aW9uKGdldFN0YXRlKCkuYWN0aXZlU2VjdGlvbi5pdGVtKSk7XG5cbiAgICAgIGZ1bmN0aW9uIHByZXZlbnRBbmRGb2N1c0ZpcnN0KGUpIHtcbiAgICAgICAgcHJldmVudERlZmF1bHQoZSk7XG4gICAgICAgIHJldHVybiBmb2N1c2FibGVFbGVtZW50c1swXSA/IGZvY3VzYWJsZUVsZW1lbnRzWzBdLmZvY3VzKCkgOiBudWxsO1xuICAgICAgfSAvL291dHNpZGUgYW55IHNlY3Rpb24gb3Igc2xpZGU/IExldCdzIG5vdCBoaWphY2sgdGhlIHRhYiFcblxuXG4gICAgICBpZiAoaXNGb2N1c091dHNpZGUoZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSAvL2lzIHRoZXJlIGFuIGVsZW1lbnQgd2l0aCBmb2N1cz9cblxuXG4gICAgICBpZiAoYWN0aXZlRWxlbWVudCkge1xuICAgICAgICBpZiAoY2xvc2VzdChhY3RpdmVFbGVtZW50LCBTRUNUSU9OX0FDVElWRV9TRUwgKyAnLCcgKyBTRUNUSU9OX0FDVElWRV9TRUwgKyAnICcgKyBTTElERV9BQ1RJVkVfU0VMKSA9PSBudWxsKSB7XG4gICAgICAgICAgYWN0aXZlRWxlbWVudCA9IHByZXZlbnRBbmRGb2N1c0ZpcnN0KGUpO1xuICAgICAgICB9XG4gICAgICB9IC8vbm8gZWxlbWVudCBpZiBmb2N1c2VkPyBMZXQncyBmb2N1cyB0aGUgZmlyc3Qgb25lIG9mIHRoZSBzZWN0aW9uL3NsaWRlXG4gICAgICBlbHNlIHtcbiAgICAgICAgcHJldmVudEFuZEZvY3VzRmlyc3QoZSk7XG4gICAgICB9IC8vd2hlbiByZWFjaGVkIHRoZSBmaXJzdCBvciBsYXN0IGZvY3VzYWJsZSBlbGVtZW50IG9mIHRoZSBzZWN0aW9uL3NsaWRlXG4gICAgICAvL3dlIHByZXZlbnQgdGhlIHRhYiBhY3Rpb24gdG8ga2VlcCBpdCBpbiB0aGUgbGFzdCBmb2N1c2FibGUgZWxlbWVudFxuXG5cbiAgICAgIHZhciBpc0ZpcnN0Rm9jdXNhYmxlSW5TZWN0aW9uID0gYWN0aXZlRWxlbWVudCA9PSBmb2N1c2FibGVFbGVtZW50c1swXTtcbiAgICAgIHZhciBpc0xhc3RGb2N1c2FibGVJblNlY3Rpb24gPSBhY3RpdmVFbGVtZW50ID09IGZvY3VzYWJsZUVsZW1lbnRzW2ZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aCAtIDFdO1xuICAgICAgdmFyIGlzTmV4dEl0ZW0gPSAhaXNTaGlmdFByZXNzZWQgJiYgaXNMYXN0Rm9jdXNhYmxlSW5TZWN0aW9uO1xuICAgICAgdmFyIGlzUHJldkl0ZW0gPSBpc1NoaWZ0UHJlc3NlZCAmJiBpc0ZpcnN0Rm9jdXNhYmxlSW5TZWN0aW9uO1xuXG4gICAgICBpZiAoaXNQcmV2SXRlbSB8fCBpc05leHRJdGVtKSB7XG4gICAgICAgIHByZXZlbnREZWZhdWx0KGUpO1xuICAgICAgICB2YXIgZm9jdXNJbmZvID0gZ2V0UGFuZWxXaXRoRm9jdXNhYmxlKGlzUHJldkl0ZW0pO1xuICAgICAgICB2YXIgZGVzdGluYXRpb25QYW5lbCA9IGZvY3VzSW5mbyA/IGZvY3VzSW5mby5wYW5lbCA6IG51bGw7XG5cbiAgICAgICAgaWYgKGRlc3RpbmF0aW9uUGFuZWwpIHtcbiAgICAgICAgICB2YXIgZGVzdGluYXRpb25TZWN0aW9uID0gZGVzdGluYXRpb25QYW5lbC5pc1NlY3Rpb24gPyBkZXN0aW5hdGlvblBhbmVsIDogZGVzdGluYXRpb25QYW5lbC5wYXJlbnQ7XG4gICAgICAgICAgRXZlbnRFbWl0dGVyLmVtaXQoZXZlbnRzLm9uU2Nyb2xsUGFnZUFuZFNsaWRlLCB7XG4gICAgICAgICAgICBzZWN0aW9uQW5jaG9yOiBkZXN0aW5hdGlvblNlY3Rpb24uaW5kZXgoKSArIDEsXG4gICAgICAgICAgICBzbGlkZUFuY2hvcjogZGVzdGluYXRpb25QYW5lbC5pc1NlY3Rpb24gPyAwIDogZGVzdGluYXRpb25QYW5lbC5pbmRleCgpXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgZ19lbFRvRm9jdXMgPSBmb2N1c0luZm8uaXRlbVRvRm9jdXM7XG4gICAgICAgICAgcHJldmVudERlZmF1bHQoZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkFmdGVyU2xpZGVMb2Fkcyh2KSB7XG4gICAgICBmb2N1c0l0ZW0oKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZnRlclNlY3Rpb25Mb2Fkcyh2KSB7XG4gICAgICBpZiAoIWNsb3Nlc3QoZ19lbFRvRm9jdXMsIFNMSURFX1NFTCkgfHwgY2xvc2VzdChnX2VsVG9Gb2N1cywgU0xJREVfQUNUSVZFX1NFTCkpIHtcbiAgICAgICAgZm9jdXNJdGVtKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9jdXNJdGVtKCkge1xuICAgICAgaWYgKGdfZWxUb0ZvY3VzKSB7XG4gICAgICAgIGdfZWxUb0ZvY3VzLmZvY3VzKCk7XG4gICAgICAgIGdfZWxUb0ZvY3VzID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0J3MgdGhlIHBhbmVsIGNvbnRhaW5pbmcgdGhlIGVsZW1lbnQgdG8gZm9jdXMuXG4gICAgICpcbiAgICAgKi9cblxuXG4gICAgZnVuY3Rpb24gZ2V0UGFuZWxXaXRoRm9jdXNhYmxlKGlzUHJldkl0ZW0pIHtcbiAgICAgIHZhciBhY3Rpb24gPSBpc1ByZXZJdGVtID8gJ3ByZXZQYW5lbCcgOiAnbmV4dFBhbmVsJztcbiAgICAgIHZhciBmb2N1c2FibGVFbGVtZW50cyA9IFtdO1xuICAgICAgdmFyIHBhbmVsV2l0aEZvY3VzYWJsZXM7XG4gICAgICB2YXIgY3VycmVudFBhbmVsID0gZ2V0U2xpZGVPclNlY3Rpb25QYW5lbChnZXRBY3RpdmVQYW5lbCgpW2FjdGlvbl0oKSk7XG5cbiAgICAgIGRvIHtcbiAgICAgICAgZm9jdXNhYmxlRWxlbWVudHMgPSBnZXRGb2N1c2FibGVzKGN1cnJlbnRQYW5lbC5pdGVtKTtcblxuICAgICAgICBpZiAoZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgcGFuZWxXaXRoRm9jdXNhYmxlcyA9IHtcbiAgICAgICAgICAgIHBhbmVsOiBjdXJyZW50UGFuZWwsXG4gICAgICAgICAgICBpdGVtVG9Gb2N1czogZm9jdXNhYmxlRWxlbWVudHNbaXNQcmV2SXRlbSA/IGZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aCAtIDEgOiAwXVxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBjdXJyZW50UGFuZWwgPSBnZXRTbGlkZU9yU2VjdGlvblBhbmVsKGN1cnJlbnRQYW5lbFthY3Rpb25dKCkpO1xuICAgICAgfSB3aGlsZSAoY3VycmVudFBhbmVsICYmIGZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aCA9PT0gMCk7XG5cbiAgICAgIHJldHVybiBwYW5lbFdpdGhGb2N1c2FibGVzO1xuICAgIH1cbiAgICAvKipcbiAgICAqIEdldHMgYWxsIHRoZSBmb2N1c2FibGUgZWxlbWVudHMgaW5zaWRlIHRoZSBwYXNzZWQgZWxlbWVudC5cbiAgICAqL1xuXG5cbiAgICBmdW5jdGlvbiBnZXRGb2N1c2FibGVzKGVsKSB7XG4gICAgICByZXR1cm4gW10uc2xpY2UuY2FsbCgkKGZvY3VzYWJsZUVsZW1lbnRzU3RyaW5nLCBlbCkpLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICByZXR1cm4gZ2V0QXR0cihpdGVtLCAndGFiaW5kZXgnKSAhPT0gJy0xJyAmJiAvL2FyZSBhbHNvIG5vdCBoaWRkZW4gZWxlbWVudHMgKG9yIHdpdGggaGlkZGVuIHBhcmVudHMpXG4gICAgICAgIGl0ZW0ub2Zmc2V0UGFyZW50ICE9PSBudWxsO1xuICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBmb2N1cyBpcyBvdXRzaWRlIGZ1bGxwYWdlLmpzIHNlY3Rpb25zL3NsaWRlcyBvciBub3QuXG4gICAgKi9cblxuXG4gICAgZnVuY3Rpb24gaXNGb2N1c091dHNpZGUoZSkge1xuICAgICAgdmFyIGFsbEZvY3VzYWJsZXMgPSBnZXRGb2N1c2FibGVzKGRvYyk7XG4gICAgICB2YXIgY3VycmVudEZvY3VzSW5kZXggPSBhbGxGb2N1c2FibGVzLmluZGV4T2YoZG9jLmFjdGl2ZUVsZW1lbnQpO1xuICAgICAgdmFyIGZvY3VzRGVzdGluYXRpb25JbmRleCA9IGUuc2hpZnRLZXkgPyBjdXJyZW50Rm9jdXNJbmRleCAtIDEgOiBjdXJyZW50Rm9jdXNJbmRleCArIDE7XG4gICAgICB2YXIgZm9jdXNEZXN0aW5hdGlvbiA9IGFsbEZvY3VzYWJsZXNbZm9jdXNEZXN0aW5hdGlvbkluZGV4XTtcbiAgICAgIHZhciBkZXN0aW5hdGlvbkl0ZW1TbGlkZSA9IGNsb3Nlc3QoZm9jdXNEZXN0aW5hdGlvbiwgU0xJREVfU0VMKTtcbiAgICAgIHZhciBkZXN0aW5hdGlvbkl0ZW1TZWN0aW9uID0gY2xvc2VzdChmb2N1c0Rlc3RpbmF0aW9uLCBTRUNUSU9OX1NFTCk7XG4gICAgICByZXR1cm4gIWRlc3RpbmF0aW9uSXRlbVNsaWRlICYmICFkZXN0aW5hdGlvbkl0ZW1TZWN0aW9uO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNob3VsZENhbmNlbEtleWJvYXJkTmF2aWdhdGlvbihlKSB7XG4gICAgICAvLyBodHRwczovL2tleWNvZGUuaW5mby9mb3IvMzRcbiAgICAgIC8vIDQwID0gYXJyb3cgZG93blxuICAgICAgLy8gMzggPSBhcnJvdyB1cFxuICAgICAgLy8gMzIgPSBzcGFjZWJhclxuICAgICAgLy8gMzMgID0gUGFnZVVwXG4gICAgICAvLyAzNCA9IFBhZ2VEb3duXG4gICAgICB2YXIga2V5Q29udHJvbHMgPSBbNDAsIDM4LCAzMiwgMzMsIDM0XTtcbiAgICAgIHJldHVybiBrZXlDb250cm9scy5pbmRleE9mKGUua2V5Q29kZSkgPiAtMSAmJiAhc3RhdGUuaXNCZXlvbmRGdWxscGFnZTtcbiAgICB9IC8vcHJldmVudGluZyB0aGUgc2Nyb2xsIHdpdGggYXJyb3cga2V5cyAmIHNwYWNlYmFyICYgUGFnZSBVcCAmIERvd24ga2V5c1xuXG5cbiAgICBmdW5jdGlvbiBjYW5jZWxEaXJlY3Rpb25LZXlFdmVudHMoZSkge1xuICAgICAgaWYgKHNob3VsZENhbmNlbEtleWJvYXJkTmF2aWdhdGlvbihlKSAmJiAhY2xvc2VzdChlLnRhcmdldCwgT1ZFUkZMT1dfU0VMKSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Q29udHJvbFByZXNzZWQoKSB7XG4gICAgICByZXR1cm4gZ19jb250cm9sUHJlc3NlZDtcbiAgICB9XG5cbiAgICB2YXIgcHJldlRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICB2YXIgc2Nyb2xsaW5ncyA9IFtdO1xuICAgIEZQLnNldE1vdXNlV2hlZWxTY3JvbGxpbmcgPSBzZXRNb3VzZVdoZWVsU2Nyb2xsaW5nO1xuICAgIC8qKlxuICAgICogQWRkcyBvciByZW1vdmUgdGhlIHBvc3NpYmlsaXR5IG9mIHNjcm9sbGluZyB0aHJvdWdoIHNlY3Rpb25zIGJ5IHVzaW5nIHRoZSBtb3VzZSB3aGVlbCBvciB0aGUgdHJhY2twYWQuXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIHNldE1vdXNlV2hlZWxTY3JvbGxpbmcodmFsdWUpIHtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBhZGRNb3VzZVdoZWVsSGFuZGxlcigpO1xuICAgICAgICBhZGRNaWRkbGVXaGVlbEhhbmRsZXIoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlbW92ZU1vdXNlV2hlZWxIYW5kbGVyKCk7XG4gICAgICAgIHJlbW92ZU1pZGRsZVdoZWVsSGFuZGxlcigpO1xuICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAqIEFkZHMgdGhlIGF1dG8gc2Nyb2xsaW5nIGFjdGlvbiBmb3IgdGhlIG1vdXNlIHdoZWVsIGFuZCB0cmFja3BhZC5cbiAgICAqIEFmdGVyIHRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkLCB0aGUgbW91c2V3aGVlbCBhbmQgdHJhY2twYWQgbW92ZW1lbnRzIHdpbGwgc2Nyb2xsIHRocm91Z2ggc2VjdGlvbnNcbiAgICAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0V2ZW50cy93aGVlbFxuICAgICovXG5cblxuICAgIGZ1bmN0aW9uIGFkZE1vdXNlV2hlZWxIYW5kbGVyKCkge1xuICAgICAgdmFyIHByZWZpeCA9ICcnO1xuXG4gICAgICB2YXIgX2FkZEV2ZW50TGlzdGVuZXI7XG5cbiAgICAgIGlmICh3aW4uYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICBfYWRkRXZlbnRMaXN0ZW5lciA9IFwiYWRkRXZlbnRMaXN0ZW5lclwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX2FkZEV2ZW50TGlzdGVuZXIgPSBcImF0dGFjaEV2ZW50XCI7XG4gICAgICAgIHByZWZpeCA9ICdvbic7XG4gICAgICB9IC8vIGRldGVjdCBhdmFpbGFibGUgd2hlZWwgZXZlbnRcblxuXG4gICAgICB2YXIgc3VwcG9ydCA9ICdvbndoZWVsJyBpbiBkb2MuY3JlYXRlRWxlbWVudCgnZGl2JykgPyAnd2hlZWwnIDogLy8gTW9kZXJuIGJyb3dzZXJzIHN1cHBvcnQgXCJ3aGVlbFwiXG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBkb2Mub25tb3VzZXdoZWVsICE9PSB1bmRlZmluZWQgPyAnbW91c2V3aGVlbCcgOiAvLyBXZWJraXQgYW5kIElFIHN1cHBvcnQgYXQgbGVhc3QgXCJtb3VzZXdoZWVsXCJcbiAgICAgICdET01Nb3VzZVNjcm9sbCc7IC8vIGxldCdzIGFzc3VtZSB0aGF0IHJlbWFpbmluZyBicm93c2VycyBhcmUgb2xkZXIgRmlyZWZveFxuXG4gICAgICB2YXIgcGFzc2l2ZUV2ZW50ID0gZ2V0UGFzc2l2ZU9wdGlvbnNJZlBvc3NpYmxlKCk7XG5cbiAgICAgIGlmIChzdXBwb3J0ID09ICdET01Nb3VzZVNjcm9sbCcpIHtcbiAgICAgICAgZG9jW19hZGRFdmVudExpc3RlbmVyXShwcmVmaXggKyAnTW96TW91c2VQaXhlbFNjcm9sbCcsIE1vdXNlV2hlZWxIYW5kbGVyLCBwYXNzaXZlRXZlbnQpO1xuICAgICAgfSAvL2hhbmRsZSBNb3pNb3VzZVBpeGVsU2Nyb2xsIGluIG9sZGVyIEZpcmVmb3hcbiAgICAgIGVsc2Uge1xuICAgICAgICBkb2NbX2FkZEV2ZW50TGlzdGVuZXJdKHByZWZpeCArIHN1cHBvcnQsIE1vdXNlV2hlZWxIYW5kbGVyLCBwYXNzaXZlRXZlbnQpO1xuICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAqIEJpbmRpbmcgdGhlIG1vdXNlbW92ZSB3aGVuIHRoZSBtb3VzZSdzIG1pZGRsZSBidXR0b24gaXMgcHJlc3NlZFxuICAgICovXG5cblxuICAgIGZ1bmN0aW9uIGFkZE1pZGRsZVdoZWVsSGFuZGxlcigpIHtcbiAgICAgIGdldENvbnRhaW5lcigpLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIG1vdXNlRG93bkhhbmRsZXIpO1xuICAgICAgZ2V0Q29udGFpbmVyKCkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG1vdXNlVXBIYW5kbGVyKTtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBSZW1vdmVzIHRoZSBhdXRvIHNjcm9sbGluZyBhY3Rpb24gZmlyZWQgYnkgdGhlIG1vdXNlIHdoZWVsIGFuZCB0cmFja3BhZC5cbiAgICAqIEFmdGVyIHRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkLCB0aGUgbW91c2V3aGVlbCBhbmQgdHJhY2twYWQgbW92ZW1lbnRzIHdvbid0IHNjcm9sbCB0aHJvdWdoIHNlY3Rpb25zLlxuICAgICovXG5cblxuICAgIGZ1bmN0aW9uIHJlbW92ZU1vdXNlV2hlZWxIYW5kbGVyKCkge1xuICAgICAgaWYgKGRvYy5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgIGRvY1JlbW92ZUV2ZW50KCdtb3VzZXdoZWVsJywgTW91c2VXaGVlbEhhbmRsZXIsIGZhbHNlKTsgLy9JRTksIENocm9tZSwgU2FmYXJpLCBPcGVyXG5cbiAgICAgICAgZG9jUmVtb3ZlRXZlbnQoJ3doZWVsJywgTW91c2VXaGVlbEhhbmRsZXIsIGZhbHNlKTsgLy9GaXJlZm94XG5cbiAgICAgICAgZG9jUmVtb3ZlRXZlbnQoJ01vek1vdXNlUGl4ZWxTY3JvbGwnLCBNb3VzZVdoZWVsSGFuZGxlciwgZmFsc2UpOyAvL29sZCBGaXJlZm94XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGRvYy5kZXRhY2hFdmVudCgnb25tb3VzZXdoZWVsJywgTW91c2VXaGVlbEhhbmRsZXIpOyAvL0lFIDYvNy84XG4gICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICogVW5iaW5kaW5nIHRoZSBtb3VzZW1vdmUgd2hlbiB0aGUgbW91c2UncyBtaWRkbGUgYnV0dG9uIGlzIHJlbGVhc2VkXG4gICAgKi9cblxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlTWlkZGxlV2hlZWxIYW5kbGVyKCkge1xuICAgICAgZ2V0Q29udGFpbmVyKCkucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgbW91c2VEb3duSGFuZGxlcik7XG4gICAgICBnZXRDb250YWluZXIoKS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2VVcEhhbmRsZXIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZXRlY3RpbmcgbW91c2V3aGVlbCBzY3JvbGxpbmdcbiAgICAgKlxuICAgICAqIGh0dHA6Ly9ibG9ncy5zaXRlcG9pbnRzdGF0aWMuY29tL2V4YW1wbGVzL3RlY2gvbW91c2Utd2hlZWwvaW5kZXguaHRtbFxuICAgICAqIGh0dHA6Ly93d3cuc2l0ZXBvaW50LmNvbS9odG1sNS1qYXZhc2NyaXB0LW1vdXNlLXdoZWVsL1xuICAgICAqL1xuXG5cbiAgICBmdW5jdGlvbiBNb3VzZVdoZWVsSGFuZGxlcihlKSB7XG4gICAgICB2YXIgY3VyVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgdmFyIGlzTm9ybWFsU2Nyb2xsID0gaGFzQ2xhc3MoJChDT01QTEVURUxZX1NFTClbMF0sIE5PUk1BTF9TQ1JPTEwpO1xuICAgICAgdmFyIGlzU2Nyb2xsQWxsb3dlZEJleW9uZEZ1bGxQYWdlID0gYmV5b25kRnVsbFBhZ2VIYW5kbGVyKGdldENvbnRhaW5lcigpLCBlKTtcblxuICAgICAgaWYgKCFzdGF0ZS5pc1VzaW5nV2hlZWwpIHtcbiAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgIGlzR3JhYmJpbmc6IGZhbHNlLFxuICAgICAgICAgIGlzVXNpbmdXaGVlbDogdHJ1ZSxcbiAgICAgICAgICB0b3VjaERpcmVjdGlvbjogJ25vbmUnXG4gICAgICAgIH0pO1xuICAgICAgfSAvL2lzIHNjcm9sbCBhbGxvd2VkP1xuXG5cbiAgICAgIGlmICghZ2V0SXNTY3JvbGxBbGxvd2VkKCkubS5kb3duICYmICFnZXRJc1Njcm9sbEFsbG93ZWQoKS5tLnVwKSB7XG4gICAgICAgIHByZXZlbnREZWZhdWx0KGUpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc1Njcm9sbEFsbG93ZWRCZXlvbmRGdWxsUGFnZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAoaXNTY3JvbGxBbGxvd2VkQmV5b25kRnVsbFBhZ2UgPT09IGZhbHNlKSB7XG4gICAgICAgIHByZXZlbnREZWZhdWx0KGUpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IC8vYXV0b3Njcm9sbGluZyBhbmQgbm90IHpvb21pbmc/XG5cblxuICAgICAgaWYgKGdldE9wdGlvbnMoKS5hdXRvU2Nyb2xsaW5nICYmICFnZXRDb250cm9sUHJlc3NlZCgpICYmICFpc05vcm1hbFNjcm9sbCkge1xuICAgICAgICAvLyBjcm9zcy1icm93c2VyIHdoZWVsIGRlbHRhXG4gICAgICAgIGUgPSBlIHx8IHdpbi5ldmVudDtcbiAgICAgICAgdmFyIHZhbHVlID0gZS53aGVlbERlbHRhIHx8IC1lLmRlbHRhWSB8fCAtZS5kZXRhaWw7XG4gICAgICAgIHZhciBkZWx0YSA9IE1hdGgubWF4KC0xLCBNYXRoLm1pbigxLCB2YWx1ZSkpO1xuICAgICAgICB2YXIgaG9yaXpvbnRhbERldGVjdGlvbiA9IHR5cGVvZiBlLndoZWVsRGVsdGFYICE9PSAndW5kZWZpbmVkJyB8fCB0eXBlb2YgZS5kZWx0YVggIT09ICd1bmRlZmluZWQnO1xuICAgICAgICB2YXIgaXNTY3JvbGxpbmdWZXJ0aWNhbGx5ID0gTWF0aC5hYnMoZS53aGVlbERlbHRhWCkgPCBNYXRoLmFicyhlLndoZWVsRGVsdGEpIHx8IE1hdGguYWJzKGUuZGVsdGFYKSA8IE1hdGguYWJzKGUuZGVsdGFZKSB8fCAhaG9yaXpvbnRhbERldGVjdGlvbjtcbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IGRlbHRhIDwgMCA/ICdkb3duJyA6IGRlbHRhID4gMCA/ICd1cCcgOiAnbm9uZSc7IC8vTGltaXRpbmcgdGhlIGFycmF5IHRvIDE1MCAobGV0cyBub3Qgd2FzdGUgbWVtb3J5ISlcblxuICAgICAgICBpZiAoc2Nyb2xsaW5ncy5sZW5ndGggPiAxNDkpIHtcbiAgICAgICAgICBzY3JvbGxpbmdzLnNoaWZ0KCk7XG4gICAgICAgIH0gLy9rZWVwaW5nIHJlY29yZCBvZiB0aGUgcHJldmlvdXMgc2Nyb2xsaW5nc1xuXG5cbiAgICAgICAgc2Nyb2xsaW5ncy5wdXNoKE1hdGguYWJzKHZhbHVlKSk7IC8vcHJldmVudGluZyB0byBzY3JvbGwgdGhlIHNpdGUgb24gbW91c2Ugd2hlZWwgd2hlbiBzY3JvbGxiYXIgaXMgcHJlc2VudFxuXG4gICAgICAgIGlmIChnZXRPcHRpb25zKCkuc2Nyb2xsQmFyKSB7XG4gICAgICAgICAgcHJldmVudERlZmF1bHQoZSk7XG4gICAgICAgIH0gLy90aW1lIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgbGFzdCBzY3JvbGwgYW5kIHRoZSBjdXJyZW50IG9uZVxuXG5cbiAgICAgICAgdmFyIHRpbWVEaWZmID0gY3VyVGltZSAtIHByZXZUaW1lO1xuICAgICAgICBwcmV2VGltZSA9IGN1clRpbWU7IC8vaGF2ZW4ndCB0aGV5IHNjcm9sbGVkIGluIGEgd2hpbGU/XG4gICAgICAgIC8vKGVub3VnaCB0byBiZSBjb25zaWRlciBhIGRpZmZlcmVudCBzY3JvbGxpbmcgYWN0aW9uIHRvIHNjcm9sbCBhbm90aGVyIHNlY3Rpb24pXG5cbiAgICAgICAgaWYgKHRpbWVEaWZmID4gMjAwKSB7XG4gICAgICAgICAgLy9lbXB0eWluZyB0aGUgYXJyYXksIHdlIGRvbnQgY2FyZSBhYm91dCBvbGQgc2Nyb2xsaW5ncyBmb3Igb3VyIGF2ZXJhZ2VzXG4gICAgICAgICAgc2Nyb2xsaW5ncyA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgIHdoZWVsRGlyZWN0aW9uOiBkaXJlY3Rpb25cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHN0YXRlLmNhblNjcm9sbCkge1xuICAgICAgICAgIHZhciBhdmVyYWdlRW5kID0gZ2V0QXZlcmFnZShzY3JvbGxpbmdzLCAxMCk7XG4gICAgICAgICAgdmFyIGF2ZXJhZ2VNaWRkbGUgPSBnZXRBdmVyYWdlKHNjcm9sbGluZ3MsIDcwKTtcbiAgICAgICAgICB2YXIgaXNBY2NlbGVyYXRpbmcgPSBhdmVyYWdlRW5kID49IGF2ZXJhZ2VNaWRkbGU7IC8vdG8gYXZvaWQgZG91YmxlIHN3aXBlcy4uLlxuXG4gICAgICAgICAgaWYgKGlzQWNjZWxlcmF0aW5nICYmIGlzU2Nyb2xsaW5nVmVydGljYWxseSkge1xuICAgICAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgICAgICBzY3JvbGxUcmlnZ2VyOiAnd2hlZWwnXG4gICAgICAgICAgICB9KTsgLy9zY3JvbGxpbmcgZG93bj9cblxuICAgICAgICAgICAgaWYgKGRlbHRhIDwgMCkge1xuICAgICAgICAgICAgICBzY3JvbGxpbmcoJ2Rvd24nKTtcbiAgICAgICAgICAgIH0gLy9zY3JvbGxpbmcgdXA/XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgc2Nyb2xsaW5nKCd1cCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGdldE9wdGlvbnMoKS5maXRUb1NlY3Rpb24pIHtcbiAgICAgICAgLy9zdG9wcGluZyB0aGUgYXV0byBzY3JvbGwgdG8gYWRqdXN0IHRvIGEgc2VjdGlvblxuICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgYWN0aXZlQW5pbWF0aW9uOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IC8vYmluZGluZyB0aGUgbW91c2Vtb3ZlIHdoZW4gdGhlIG1vdXNlJ3MgbWlkZGxlIGJ1dHRvbiBpcyByZWxlYXNlZFxuXG5cbiAgICBmdW5jdGlvbiBtb3VzZURvd25IYW5kbGVyKGUpIHtcbiAgICAgIC8vbWlkZGxlIGJ1dHRvblxuICAgICAgaWYgKGUud2hpY2ggPT0gMikge1xuICAgICAgICBzZXRPbGRQYWdlWShlLnBhZ2VZKTtcbiAgICAgICAgZ2V0Q29udGFpbmVyKCkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW91c2VNb3ZlSGFuZGxlcik7XG4gICAgICB9XG4gICAgfSAvL3VuYmluZGluZyB0aGUgbW91c2Vtb3ZlIHdoZW4gdGhlIG1vdXNlJ3MgbWlkZGxlIGJ1dHRvbiBpcyByZWxlYXNlZFxuXG5cbiAgICBmdW5jdGlvbiBtb3VzZVVwSGFuZGxlcihlKSB7XG4gICAgICAvL21pZGRsZSBidXR0b25cbiAgICAgIGlmIChlLndoaWNoID09IDIpIHtcbiAgICAgICAgZ2V0Q29udGFpbmVyKCkucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW91c2VNb3ZlSGFuZGxlcik7XG4gICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICogQWRkcyBvciByZW1vdmUgdGhlIG1vdXNlIHdoZWVsIGhpamFja2luZ1xuICAgICovXG5cblxuICAgIGZ1bmN0aW9uIHNldE1vdXNlSGlqYWNrKHZhbHVlKSB7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgc2V0TW91c2VXaGVlbFNjcm9sbGluZyh0cnVlKTtcbiAgICAgICAgYWRkVG91Y2hIYW5kbGVyKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRNb3VzZVdoZWVsU2Nyb2xsaW5nKGZhbHNlKTtcbiAgICAgICAgcmVtb3ZlVG91Y2hIYW5kbGVyKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGdfY2FuRmlyZU1vdXNlRW50ZXJOb3JtYWxTY3JvbGwgPSB0cnVlO1xuICAgIEV2ZW50RW1pdHRlci5vbihldmVudHMuYmluZEV2ZW50cywgYmluZEV2ZW50cyQ3KTtcblxuICAgIGZ1bmN0aW9uIGJpbmRFdmVudHMkNygpIHtcbiAgICAgIC8qKlxuICAgICAgKiBBcHBseWluZyBub3JtYWxTY3JvbGwgZWxlbWVudHMuXG4gICAgICAqIElnbm9yaW5nIHRoZSBzY3JvbGxzIG92ZXIgdGhlIHNwZWNpZmllZCBzZWxlY3RvcnMuXG4gICAgICAqL1xuICAgICAgaWYgKGdldE9wdGlvbnMoKS5ub3JtYWxTY3JvbGxFbGVtZW50cykge1xuICAgICAgICBbJ21vdXNlZW50ZXInLCAndG91Y2hzdGFydCddLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50TmFtZSkge1xuICAgICAgICAgIGZvck1vdXNlTGVhdmVPclRvdWNoKGV2ZW50TmFtZSwgZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICAgICAgWydtb3VzZWxlYXZlJywgJ3RvdWNoZW5kJ10uZm9yRWFjaChmdW5jdGlvbiAoZXZlbnROYW1lKSB7XG4gICAgICAgICAgZm9yTW91c2VMZWF2ZU9yVG91Y2goZXZlbnROYW1lLCB0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIEV2ZW50RW1pdHRlci5vbihldmVudHMub25EZXN0cm95LCBvbkRlc3Ryb3kkNCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25EZXN0cm95JDQoKSB7XG4gICAgICBbJ21vdXNlZW50ZXInLCAndG91Y2hzdGFydCcsICdtb3VzZWxlYXZlJywgJ3RvdWNoZW5kJ10uZm9yRWFjaChmdW5jdGlvbiAoZXZlbnROYW1lKSB7XG4gICAgICAgIGRvY1JlbW92ZUV2ZW50KGV2ZW50TmFtZSwgb25Nb3VzZUVudGVyT3JMZWF2ZSwgdHJ1ZSk7IC8vdHJ1ZSBpcyByZXF1aXJlZCFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvck1vdXNlTGVhdmVPclRvdWNoKGV2ZW50TmFtZSwgYWxsb3dTY3JvbGxpbmcpIHtcbiAgICAgIC8vYSB3YXkgdG8gcGFzcyBhcmd1bWVudHMgdG8gdGhlIG9uTW91c2VFbnRlck9yTGVhdmUgZnVuY3Rpb25cbiAgICAgIGRvY3VtZW50WydmcF8nICsgZXZlbnROYW1lXSA9IGFsbG93U2Nyb2xsaW5nO1xuICAgICAgZG9jQWRkRXZlbnQoZXZlbnROYW1lLCBvbk1vdXNlRW50ZXJPckxlYXZlLCB0cnVlKTsgLy9jYXB0dXJpbmcgcGhhc2VcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbk1vdXNlRW50ZXJPckxlYXZlKGUpIHtcbiAgICAgIHZhciB0eXBlID0gZS50eXBlO1xuICAgICAgdmFyIGlzSW5zaWRlT25lTm9ybWFsU2Nyb2xsID0gZmFsc2U7IC8vb25Nb3VzZUxlYXZlIHdpbGwgdXNlIHRoZSBkZXN0aW5hdGlvbiB0YXJnZXQsIG5vdCB0aGUgb25lIHdlIGFyZSBtb3ZpbmcgYXdheSBmcm9tXG5cbiAgICAgIHZhciB0YXJnZXQgPSB0eXBlID09PSAnbW91c2VsZWF2ZScgPyBlLnRvRWxlbWVudCB8fCBlLnJlbGF0ZWRUYXJnZXQgOiBlLnRhcmdldDsgLy9jb21pbmcgZnJvbSBjbG9zaW5nIGEgbm9ybWFsU2Nyb2xsRWxlbWVudHMgbW9kYWwgb3IgbW92aW5nIG91dHNpZGUgdmlld3BvcnQ/XG5cbiAgICAgIGlmICh0YXJnZXQgPT0gZG9jdW1lbnQgfHwgIXRhcmdldCkge1xuICAgICAgICBzZXRNb3VzZUhpamFjayh0cnVlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZSA9PT0gJ3RvdWNoZW5kJykge1xuICAgICAgICBnX2NhbkZpcmVNb3VzZUVudGVyTm9ybWFsU2Nyb2xsID0gZmFsc2U7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGdfY2FuRmlyZU1vdXNlRW50ZXJOb3JtYWxTY3JvbGwgPSB0cnVlO1xuICAgICAgICB9LCA4MDApO1xuICAgICAgfSAvL3ByZXZlbnRpbmcgbW91c2VlbnRlciBldmVudCB0byBkbyBhbnl0aGluZyB3aGVuIGNvbWluZyBmcm9tIGEgdG91Y2hFbmQgZXZlbnRcbiAgICAgIC8vZml4aW5nIGlzc3VlICMzNTc2XG5cblxuICAgICAgaWYgKHR5cGUgPT09ICdtb3VzZWVudGVyJyAmJiAhZ19jYW5GaXJlTW91c2VFbnRlck5vcm1hbFNjcm9sbCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBub3JtYWxTZWxlY3RvcnMgPSBnZXRPcHRpb25zKCkubm9ybWFsU2Nyb2xsRWxlbWVudHMuc3BsaXQoJywnKTtcbiAgICAgIG5vcm1hbFNlbGVjdG9ycy5mb3JFYWNoKGZ1bmN0aW9uIChub3JtYWxTZWxlY3Rvcikge1xuICAgICAgICBpZiAoIWlzSW5zaWRlT25lTm9ybWFsU2Nyb2xsKSB7XG4gICAgICAgICAgdmFyIGlzTm9ybWFsU2Nyb2xsVGFyZ2V0ID0gbWF0Y2hlcyh0YXJnZXQsIG5vcm1hbFNlbGVjdG9yKTsgLy9sZWF2aW5nIGEgY2hpbGQgaW5zaWRlIHRoZSBub3JtYWxTY29sbCBlbGVtZW50IGlzIG5vdCBsZWF2aW5nIHRoZSBub3JtYWxTY3JvbGwgIzM2NjFcblxuICAgICAgICAgIHZhciBpc05vcm1hbFNjcm9sbENoaWxkRm9jdXNlZCA9IGNsb3Nlc3QodGFyZ2V0LCBub3JtYWxTZWxlY3Rvcik7XG5cbiAgICAgICAgICBpZiAoaXNOb3JtYWxTY3JvbGxUYXJnZXQgfHwgaXNOb3JtYWxTY3JvbGxDaGlsZEZvY3VzZWQpIHtcbiAgICAgICAgICAgIGlmICghRlAuc2hhcmVkLmlzTm9ybWFsU2Nyb2xsRWxlbWVudCkge1xuICAgICAgICAgICAgICBzZXRNb3VzZUhpamFjayhmYWxzZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIEZQLnNoYXJlZC5pc05vcm1hbFNjcm9sbEVsZW1lbnQgPSB0cnVlO1xuICAgICAgICAgICAgaXNJbnNpZGVPbmVOb3JtYWxTY3JvbGwgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7IC8vbm90IGluc2lkZSBhIHNpbmdsZSBub3JtYWwgc2Nyb2xsIGVsZW1lbnQgYW55bW9yZT9cblxuICAgICAgaWYgKCFpc0luc2lkZU9uZU5vcm1hbFNjcm9sbCAmJiBGUC5zaGFyZWQuaXNOb3JtYWxTY3JvbGxFbGVtZW50KSB7XG4gICAgICAgIHNldE1vdXNlSGlqYWNrKHRydWUpO1xuICAgICAgICBGUC5zaGFyZWQuaXNOb3JtYWxTY3JvbGxFbGVtZW50ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgRlAuc2lsZW50TW92ZVRvID0gc2lsZW50TW92ZVRvO1xuICAgIC8qKlxuICAgICogTW92ZXMgdGhlIHBhZ2UgdG8gdGhlIGdpdmVuIHNlY3Rpb24gYW5kIHNsaWRlIHdpdGggbm8gYW5pbWF0aW9uLlxuICAgICogQW5jaG9ycyBvciBpbmRleCBwb3NpdGlvbnMgY2FuIGJlIHVzZWQgYXMgcGFyYW1zLlxuICAgICovXG5cbiAgICBmdW5jdGlvbiBzaWxlbnRNb3ZlVG8oc2VjdGlvbkFuY2hvciwgc2xpZGVBbmNob3IpIHtcbiAgICAgIHNldFNjcm9sbGluZ1NwZWVkKDAsICdpbnRlcm5hbCcpO1xuICAgICAgbW92ZVRvJDEoc2VjdGlvbkFuY2hvciwgc2xpZGVBbmNob3IpO1xuICAgICAgc2V0U2Nyb2xsaW5nU3BlZWQoZ2V0T3JpZ2luYWxzKCkuc2Nyb2xsaW5nU3BlZWQsICdpbnRlcm5hbCcpO1xuICAgIH1cblxuICAgIHZhciBwcmV2aW91c0hlaWdodCA9IGdldFdpbmRvd0hlaWdodCgpO1xuICAgIHZhciB3aW5kb3dzV2lkdGggPSBnZXRXaW5kb3dXaWR0aCgpO1xuICAgIHZhciBnX3Jlc2l6ZUlkO1xuICAgIHZhciBnX2lzQ29uc2VjdXRpdmVSZXNpemUgPSBmYWxzZTtcbiAgICB2YXIgZ19yZXNpemVNb2JpbGVIYW5kbGVySWQ7XG4gICAgRlAucmVCdWlsZCA9IHJlQnVpbGQ7XG4gICAgRXZlbnRFbWl0dGVyLm9uKGV2ZW50cy5iaW5kRXZlbnRzLCBiaW5kRXZlbnRzJDYpO1xuXG4gICAgZnVuY3Rpb24gYmluZEV2ZW50cyQ2KCkge1xuICAgICAgLy8gU2V0dGluZyBWSCBjb3JyZWN0bHkgaW4gbW9iaWxlIGRldmljZXNcbiAgICAgIHJlc2l6ZUhhbmRsZXIoKTsgLy93aGVuIHJlc2l6aW5nIHRoZSBzaXRlLCB3ZSBhZGp1c3QgdGhlIGhlaWdodHMgb2YgdGhlIHNlY3Rpb25zLCBzbGltU2Nyb2xsLi4uXG5cbiAgICAgIHdpbmRvd0FkZEV2ZW50KCdyZXNpemUnLCByZXNpemVIYW5kbGVyKTtcbiAgICAgIEV2ZW50RW1pdHRlci5vbihldmVudHMub25EZXN0cm95LCBvbkRlc3Ryb3kkMyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25EZXN0cm95JDMoKSB7XG4gICAgICBjbGVhclRpbWVvdXQoZ19yZXNpemVJZCk7XG4gICAgICBjbGVhclRpbWVvdXQoZ19yZXNpemVNb2JpbGVIYW5kbGVySWQpO1xuICAgICAgd2luZG93UmVtb3ZlRXZlbnQoJ3Jlc2l6ZScsIHJlc2l6ZUhhbmRsZXIpO1xuICAgIH1cbiAgICAvKlxuICAgICogUmVzaXplIGV2ZW50IGhhbmRsZXIuXG4gICAgKi9cblxuXG4gICAgZnVuY3Rpb24gcmVzaXplSGFuZGxlcigpIHtcbiAgICAgIGlmICghZ19pc0NvbnNlY3V0aXZlUmVzaXplKSB7XG4gICAgICAgIGlmIChnZXRPcHRpb25zKCkuYXV0b1Njcm9sbGluZyAmJiAhZ2V0T3B0aW9ucygpLnNjcm9sbEJhciB8fCAhZ2V0T3B0aW9ucygpLmZpdFRvU2VjdGlvbikge1xuICAgICAgICAgIHNldFNlY3Rpb25zSGVpZ2h0KGdldFdpbmRvd0hlaWdodCgpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmaXRUb0FjdGl2ZVNlY3Rpb24oKTtcbiAgICAgIGdfaXNDb25zZWN1dGl2ZVJlc2l6ZSA9IHRydWU7IC8vaW4gb3JkZXIgdG8gY2FsbCB0aGUgZnVuY3Rpb25zIG9ubHkgd2hlbiB0aGUgcmVzaXplIGlzIGZpbmlzaGVkXG4gICAgICAvL2h0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDI5ODYxMi9qcXVlcnktaG93LXRvLWNhbGwtcmVzaXplLWV2ZW50LW9ubHktb25jZS1pdHMtZmluaXNoZWQtcmVzaXppbmcgICAgXG5cbiAgICAgIGNsZWFyVGltZW91dChnX3Jlc2l6ZUlkKTtcbiAgICAgIGdfcmVzaXplSWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy9pc3N1ZSAjMzMzNiBcbiAgICAgICAgLy8oc29tZSBhcHBzIG9yIGJyb3dzZXJzLCBsaWtlIENocm9tZS9GaXJlZm94IGZvciBNb2JpbGUgdGFrZSB0aW1lIHRvIHJlcG9ydCB0aGUgcmVhbCBoZWlnaHQpXG4gICAgICAgIC8vc28gd2UgY2hlY2sgaXQgMyB0aW1lcyB3aXRoIGludGVydmFscyBpbiB0aGF0IGNhc2VcbiAgICAgICAgLy8gZm9yKHZhciBpID0gMDsgaTwgNDsgaSsrKXtcbiAgICAgICAgcmVzaXplQWN0aW9ucygpO1xuICAgICAgICBnX2lzQ29uc2VjdXRpdmVSZXNpemUgPSBmYWxzZTsgLy8gfVxuICAgICAgfSwgNDAwKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaXRUb0FjdGl2ZVNlY3Rpb24oKSB7XG4gICAgICBpZiAoaXNUb3VjaERldmljZSkge1xuICAgICAgICAvLyBJc3N1ZSAjNDM5MyBhbmQgcHJldmlvdXNseSBpbiB2MywgIzMzMzZcbiAgICAgICAgLy8gKHNvbWUgYXBwcyBvciBicm93c2VycywgbGlrZSBDaHJvbWUvRmlyZWZveCB3aWxsIGRlbGF5IGEgYml0IHRvIHNjcm9sbCBcbiAgICAgICAgLy8gdG8gdGhlIGZvY3VzZWQgaW5wdXRcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgICBnX3Jlc2l6ZU1vYmlsZUhhbmRsZXJJZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIC8vIG9uIEFuZHJvaWQgZGV2aWNlcyB0aGUgYnJvd3NlciBzY3JvbGxzIHRvIHRoZSBmb2N1c2VkIGVsZW1lbnRcbiAgICAgICAgICAgICAgLy8gbWVzc2luZyB1cCB0aGUgd2hvbGUgcGFnZSBzdHJ1Y3R1cmUuIFNvIHdlIG5lZWQgdG8gdXBkYXRlIHRoZVxuICAgICAgICAgICAgICAvLyB0cmFuc2xhdGUzZCB2YWx1ZSB3aGVuIHRoZSBrZXlib2FyZCBzaG93cy9oaWRlc1xuICAgICAgICAgICAgICBpZiAoZ2V0T3B0aW9ucygpLmF1dG9TY3JvbGxpbmcgJiYgIWdldE9wdGlvbnMoKS5zY3JvbGxCYXIpIHtcbiAgICAgICAgICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICBpc1Jlc2l6aW5nOiB0cnVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgc2lsZW50TW92ZVRvKHN0YXRlLmFjdGl2ZVNlY3Rpb24uaW5kZXgoKSArIDEpO1xuICAgICAgICAgICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgIGlzUmVzaXppbmc6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sIDIwMCAqIGkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICogV2hlbiByZXNpemluZyB0aGUgc2l0ZSwgd2UgYWRqdXN0IHRoZSBoZWlnaHRzIG9mIHRoZSBzZWN0aW9ucywgc2xpbVNjcm9sbC4uLlxuICAgICovXG5cblxuICAgIGZ1bmN0aW9uIHJlc2l6ZUFjdGlvbnMoKSB7XG4gICAgICBzZXRTdGF0ZSh7XG4gICAgICAgIGlzUmVzaXppbmc6IHRydWVcbiAgICAgIH0pO1xuICAgICAgc2V0U2VjdGlvbnNIZWlnaHQoJycpO1xuXG4gICAgICBpZiAoIWdldE9wdGlvbnMoKS5hdXRvU2Nyb2xsaW5nICYmICFzdGF0ZS5pc0JleW9uZEZ1bGxwYWdlKSB7XG4gICAgICAgIHNldFZoVW5pdHMoKTtcbiAgICAgIH1cblxuICAgICAgRXZlbnRFbWl0dGVyLmVtaXQoZXZlbnRzLmNvbnRlbnRDaGFuZ2VkKTtcbiAgICAgIHVwZGF0ZVN0YXRlKCk7IC8vY2hlY2tpbmcgaWYgaXQgbmVlZHMgdG8gZ2V0IHJlc3BvbnNpdmVcblxuICAgICAgcmVzcG9uc2l2ZSgpOyAvLyByZWJ1aWxkIGltbWVkaWF0ZWx5IG9uIHRvdWNoIGRldmljZXNcblxuICAgICAgaWYgKGlzVG91Y2hEZXZpY2UpIHtcbiAgICAgICAgdmFyIGFjdGl2ZUVsZW1lbnQgPSBkb2MuYWN0aXZlRWxlbWVudDsgLy9pZiB0aGUga2V5Ym9hcmQgaXMgTk9UIHZpc2libGVcblxuICAgICAgICBpZiAoIW1hdGNoZXMoYWN0aXZlRWxlbWVudCwgJ3RleHRhcmVhJykgJiYgIW1hdGNoZXMoYWN0aXZlRWxlbWVudCwgJ2lucHV0JykgJiYgIW1hdGNoZXMoYWN0aXZlRWxlbWVudCwgJ3NlbGVjdCcpKSB7XG4gICAgICAgICAgdmFyIGN1cnJlbnRIZWlnaHQgPSBnZXRXaW5kb3dIZWlnaHQoKTsgLy9tYWtpbmcgc3VyZSB0aGUgY2hhbmdlIGluIHRoZSB2aWV3cG9ydCBzaXplIGlzIGVub3VnaCB0byBmb3JjZSBhIHJlYnVpbGQuICgyMCAlIG9mIHRoZSB3aW5kb3cgdG8gYXZvaWQgcHJvYmxlbXMgd2hlbiBoaWRkaW5nIHNjcm9sbCBiYXJzKVxuXG4gICAgICAgICAgaWYgKE1hdGguYWJzKGN1cnJlbnRIZWlnaHQgLSBwcmV2aW91c0hlaWdodCkgPiAyMCAqIE1hdGgubWF4KHByZXZpb3VzSGVpZ2h0LCBjdXJyZW50SGVpZ2h0KSAvIDEwMCkge1xuICAgICAgICAgICAgcmVCdWlsZCh0cnVlKTtcbiAgICAgICAgICAgIHByZXZpb3VzSGVpZ2h0ID0gY3VycmVudEhlaWdodDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFkanVzdFRvTmV3Vmlld3BvcnQoKTtcbiAgICAgIH1cblxuICAgICAgc2V0U3RhdGUoe1xuICAgICAgICBpc1Jlc2l6aW5nOiBmYWxzZVxuICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdoZW4gcmVzaXppbmcgaXMgZmluaXNoZWQsIHdlIGFkanVzdCB0aGUgc2xpZGVzIHNpemVzIGFuZCBwb3NpdGlvbnNcbiAgICAgKi9cblxuXG4gICAgZnVuY3Rpb24gcmVCdWlsZChyZXNpemluZykge1xuICAgICAgaWYgKGhhc0NsYXNzKGdldENvbnRhaW5lcigpLCBERVNUUk9ZRUQpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gLy9ub3RoaW5nIHRvIGRvIGlmIHRoZSBwbHVnaW4gd2FzIGRlc3Ryb3llZFxuICAgICAgLy91cGRhdGluZyBnbG9iYWwgdmFyc1xuXG5cbiAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgaXNSZXNpemluZzogdHJ1ZSxcbiAgICAgICAgd2luZG93c0hlaWdodDogZ2V0V2luZG93SGVpZ2h0KCksXG4gICAgICAgIHdpbmRvd3NXaWR0aDogZ2V0V2luZG93V2lkdGgoKVxuICAgICAgfSk7XG4gICAgICB2YXIgc2VjdGlvbnMgPSBnZXRTdGF0ZSgpLnNlY3Rpb25zO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlY3Rpb25zLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBzZWN0aW9uID0gc2VjdGlvbnNbaV07XG4gICAgICAgIHZhciBzbGlkZXNXcmFwID0gJChTTElERVNfV1JBUFBFUl9TRUwsIHNlY3Rpb24uaXRlbSlbMF07XG4gICAgICAgIHZhciBzbGlkZXMgPSBzZWN0aW9uLnNsaWRlczsgLy9hZGp1c3RpbmcgdGhlIHBvc2l0aW9uIGZvIHRoZSBGVUxMIFdJRFRIIHNsaWRlcy4uLlxuXG4gICAgICAgIGlmIChzbGlkZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgIGxhbmRzY2FwZVNjcm9sbChzbGlkZXNXcmFwLCBzZWN0aW9uLmFjdGl2ZVNsaWRlLml0ZW0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChnZXRPcHRpb25zKCkuc2Nyb2xsT3ZlcmZsb3cpIHtcbiAgICAgICAgc2Nyb2xsT3ZlcmZsb3dIYW5kbGVyLm1ha2VTY3JvbGxhYmxlKCk7XG4gICAgICB9XG5cbiAgICAgIHZhciBzZWN0aW9uSW5kZXggPSBnZXRTdGF0ZSgpLmFjdGl2ZVNlY3Rpb24uaW5kZXgoKTtcblxuICAgICAgaWYgKCFzdGF0ZS5pc0JleW9uZEZ1bGxwYWdlKSB7XG4gICAgICAgIC8vaXNuJ3QgaXQgdGhlIGZpcnN0IHNlY3Rpb24/XG4gICAgICAgIGlmIChzZWN0aW9uSW5kZXgpIHtcbiAgICAgICAgICAvL2FkanVzdGluZyB0aGUgcG9zaXRpb24gZm9yIHRoZSBjdXJyZW50IHNlY3Rpb25cbiAgICAgICAgICBzaWxlbnRNb3ZlVG8oc2VjdGlvbkluZGV4ICsgMSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgc2V0U3RhdGUoe1xuICAgICAgICBpc1Jlc2l6aW5nOiBmYWxzZVxuICAgICAgfSk7XG5cbiAgICAgIGlmIChpc0Z1bmN0aW9uKGdldE9wdGlvbnMoKS5hZnRlclJlc2l6ZSkgJiYgcmVzaXppbmcpIHtcbiAgICAgICAgZ2V0T3B0aW9ucygpLmFmdGVyUmVzaXplLmNhbGwoZ2V0Q29udGFpbmVyKCksIHdpbi5pbm5lcldpZHRoLCB3aW4uaW5uZXJIZWlnaHQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNGdW5jdGlvbihnZXRPcHRpb25zKCkuYWZ0ZXJSZUJ1aWxkKSAmJiAhcmVzaXppbmcpIHtcbiAgICAgICAgZ2V0T3B0aW9ucygpLmFmdGVyUmVCdWlsZC5jYWxsKGdldENvbnRhaW5lcigpKTtcbiAgICAgIH1cblxuICAgICAgdHJpZ2dlcihnZXRDb250YWluZXIoKSwgJ2FmdGVyUmVidWlsZCcpO1xuICAgIH1cbiAgICAvKipcbiAgICAqIEFkanVzdHMgYSBzZWN0aW9uIHRvIHRoZSB2aWV3cG9ydCBpZiBpdCBoYXMgY2hhbmdlZC5cbiAgICAqL1xuXG5cbiAgICBmdW5jdGlvbiBhZGp1c3RUb05ld1ZpZXdwb3J0KCkge1xuICAgICAgdmFyIG5ld1dpbmRvd0hlaWdodCA9IGdldFdpbmRvd0hlaWdodCgpO1xuICAgICAgdmFyIG5ld1dpbmRvd1dpZHRoID0gZ2V0V2luZG93V2lkdGgoKTtcblxuICAgICAgaWYgKHN0YXRlLndpbmRvd3NIZWlnaHQgIT09IG5ld1dpbmRvd0hlaWdodCB8fCB3aW5kb3dzV2lkdGggIT09IG5ld1dpbmRvd1dpZHRoKSB7XG4gICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICB3aW5kb3dzSGVpZ2h0OiBuZXdXaW5kb3dIZWlnaHRcbiAgICAgICAgfSk7XG4gICAgICAgIHdpbmRvd3NXaWR0aCA9IG5ld1dpbmRvd1dpZHRoO1xuICAgICAgICByZUJ1aWxkKHRydWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFNlY3Rpb25zSGVpZ2h0KHZhbHVlKSB7XG4gICAgICB2YXIgcHJvcGVydHlWYWx1ZSA9IHZhbHVlID09PSAnJyA/ICcnIDogdmFsdWUgKyAncHgnO1xuICAgICAgZ2V0U3RhdGUoKS5zZWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChzZWN0aW9uKSB7XG4gICAgICAgIGNzcyhzZWN0aW9uLml0ZW0sIHtcbiAgICAgICAgICAnaGVpZ2h0JzogcHJvcGVydHlWYWx1ZVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZWZpbmluZyB0aGUgdmFsdWUgaW4gcHggb2YgYSBWSCB1bml0LiAoVXNlZCBmb3IgYXV0b1Njcm9sbGluZzogZmFsc2UpXG4gICAgICogVG8gZml4IHRoZSBoZWlnaHQgaXNzdWUgb24gbW9iaWxlIGRldmljZXMgd2hlbiB1c2luZyBWSCB1bml0cy5cbiAgICAgKiBodHRwczovL2Nzcy10cmlja3MuY29tL3RoZS10cmljay10by12aWV3cG9ydC11bml0cy1vbi1tb2JpbGUvXG4gICAgICovXG5cblxuICAgIGZ1bmN0aW9uIHNldFZoVW5pdHMoKSB7XG4gICAgICBpZiAoIWdldE9wdGlvbnMoKS5hdXRvU2Nyb2xsaW5nIHx8IGdldE9wdGlvbnMoKS5zY3JvbGxCYXIpIHtcbiAgICAgICAgLy8gRmlyc3Qgd2UgZ2V0IHRoZSB2aWV3cG9ydCBoZWlnaHQgYW5kIHdlIG11bHRpcGxlIGl0IGJ5IDElIHRvIGdldCBhIHZhbHVlIGZvciBhIHZoIHVuaXRcbiAgICAgICAgdmFyIHZoID0gd2luLmlubmVySGVpZ2h0ICogMC4wMTsgLy8gVGhlbiB3ZSBzZXQgdGhlIHZhbHVlIGluIHRoZSAtLXZoIGN1c3RvbSBwcm9wZXJ0eSB0byB0aGUgcm9vdCBvZiB0aGUgZG9jdW1lbnRcblxuICAgICAgICBkb2MuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLXZoJywgXCJcIi5jb25jYXQodmgsIFwicHhcIikpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEFuY2hvcnNVUkwoKSB7XG4gICAgICB2YXIgc2VjdGlvbjtcbiAgICAgIHZhciBzbGlkZTtcbiAgICAgIHZhciBoYXNoID0gd2luLmxvY2F0aW9uLmhhc2g7XG5cbiAgICAgIGlmIChoYXNoLmxlbmd0aCkge1xuICAgICAgICAvL2dldHRpbmcgdGhlIGFuY2hvciBsaW5rIGluIHRoZSBVUkwgYW5kIGRlbGV0aW5nIHRoZSBgI2BcbiAgICAgICAgdmFyIGFuY2hvcnNQYXJ0cyA9IGhhc2gucmVwbGFjZSgnIycsICcnKS5zcGxpdCgnLycpOyAvL3VzaW5nIC8gZm9yIHZpc3VhbCByZWFzb25zIGFuZCBub3QgYXMgYSBzZWN0aW9uL3NsaWRlIHNlcGFyYXRvciAjMjgwM1xuXG4gICAgICAgIHZhciBpc0Z1bmt5QW5jaG9yID0gaGFzaC5pbmRleE9mKCcjLycpID4gLTE7XG4gICAgICAgIHNlY3Rpb24gPSBpc0Z1bmt5QW5jaG9yID8gJy8nICsgYW5jaG9yc1BhcnRzWzFdIDogZGVjb2RlVVJJQ29tcG9uZW50KGFuY2hvcnNQYXJ0c1swXSk7XG4gICAgICAgIHZhciBzbGlkZUFuY2hvciA9IGlzRnVua3lBbmNob3IgPyBhbmNob3JzUGFydHNbMl0gOiBhbmNob3JzUGFydHNbMV07XG5cbiAgICAgICAgaWYgKHNsaWRlQW5jaG9yICYmIHNsaWRlQW5jaG9yLmxlbmd0aCkge1xuICAgICAgICAgIHNsaWRlID0gZGVjb2RlVVJJQ29tcG9uZW50KHNsaWRlQW5jaG9yKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBzZWN0aW9uOiBzZWN0aW9uLFxuICAgICAgICBzbGlkZTogc2xpZGVcbiAgICAgIH07XG4gICAgfVxuXG4gICAgRlAuc2V0TG9ja0FuY2hvcnMgPSBzZXRMb2NrQW5jaG9ycztcbiAgICBFdmVudEVtaXR0ZXIub24oZXZlbnRzLmJpbmRFdmVudHMsIGJpbmRFdmVudHMkNSk7XG5cbiAgICBmdW5jdGlvbiBiaW5kRXZlbnRzJDUoKSB7XG4gICAgICAvL2RldGVjdGluZyBhbnkgY2hhbmdlIG9uIHRoZSBVUkwgdG8gc2Nyb2xsIHRvIHRoZSBnaXZlbiBhbmNob3IgbGlua1xuICAgICAgLy8oYSB3YXkgdG8gZGV0ZWN0IGJhY2sgaGlzdG9yeSBidXR0b24gYXMgd2UgcGxheSB3aXRoIHRoZSBoYXNoZXMgb24gdGhlIFVSTClcbiAgICAgIHdpbmRvd0FkZEV2ZW50KCdoYXNoY2hhbmdlJywgaGFzaENoYW5nZUhhbmRsZXIpO1xuICAgICAgRXZlbnRFbWl0dGVyLm9uKGV2ZW50cy5vbkRlc3Ryb3ksIG9uRGVzdHJveSQyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkRlc3Ryb3kkMigpIHtcbiAgICAgIHdpbmRvd1JlbW92ZUV2ZW50KCdoYXNoY2hhbmdlJywgaGFzaENoYW5nZUhhbmRsZXIpO1xuICAgIH1cbiAgICAvKipcbiAgICAqIFNldHMgbG9ja0FuY2hvcnNcbiAgICAqL1xuXG5cbiAgICBmdW5jdGlvbiBzZXRMb2NrQW5jaG9ycyh2YWx1ZSkge1xuICAgICAgZ2V0T3B0aW9ucygpLmxvY2tBbmNob3JzID0gdmFsdWU7XG4gICAgfVxuICAgIC8qKlxuICAgICogRGV0ZWN0aW5nIGFueSBjaGFuZ2Ugb24gdGhlIFVSTCB0byBzY3JvbGwgdG8gdGhlIGdpdmVuIGFuY2hvciBsaW5rXG4gICAgKiAoYSB3YXkgdG8gZGV0ZWN0IGJhY2sgaGlzdG9yeSBidXR0b24gYXMgd2UgcGxheSB3aXRoIHRoZSBoYXNoZXMgb24gdGhlIFVSTClcbiAgICAqL1xuXG5cbiAgICBmdW5jdGlvbiBoYXNoQ2hhbmdlSGFuZGxlcigpIHtcbiAgICAgIGlmICghc3RhdGUuaXNTY3JvbGxpbmcgJiYgIWdldE9wdGlvbnMoKS5sb2NrQW5jaG9ycykge1xuICAgICAgICB2YXIgYW5jaG9ycyA9IGdldEFuY2hvcnNVUkwoKTtcbiAgICAgICAgdmFyIHNlY3Rpb25BbmNob3IgPSBhbmNob3JzLnNlY3Rpb247XG4gICAgICAgIHZhciBzbGlkZUFuY2hvciA9IGFuY2hvcnMuc2xpZGU7IC8vd2hlbiBtb3ZpbmcgdG8gYSBzbGlkZSBpbiB0aGUgZmlyc3Qgc2VjdGlvbiBmb3IgdGhlIGZpcnN0IHRpbWUgKGZpcnN0IHRpbWUgdG8gYWRkIGFuIGFuY2hvciB0byB0aGUgVVJMKVxuXG4gICAgICAgIHZhciBpc0ZpcnN0U2xpZGVNb3ZlID0gdHlwZW9mIHN0YXRlLmxhc3RTY3JvbGxlZERlc3RpbnkgPT09ICd1bmRlZmluZWQnO1xuICAgICAgICB2YXIgaXNGaXJzdFNjcm9sbE1vdmUgPSB0eXBlb2Ygc3RhdGUubGFzdFNjcm9sbGVkRGVzdGlueSA9PT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHNsaWRlQW5jaG9yID09PSAndW5kZWZpbmVkJyAmJiAhc3RhdGUuc2xpZGVNb3Zpbmc7XG5cbiAgICAgICAgaWYgKHNlY3Rpb25BbmNob3IgJiYgc2VjdGlvbkFuY2hvci5sZW5ndGgpIHtcbiAgICAgICAgICAvKmluIG9yZGVyIHRvIGNhbGwgc2Nyb2xscGFnZSgpIG9ubHkgb25jZSBmb3IgZWFjaCBkZXN0aW5hdGlvbiBhdCBhIHRpbWVcbiAgICAgICAgICBJdCBpcyBjYWxsZWQgdHdpY2UgZm9yIGVhY2ggc2Nyb2xsIG90aGVyd2lzZSwgYXMgaW4gY2FzZSBvZiB1c2luZyBhbmNob3JsaW5rcyBgaGFzaENoYW5nZWBcbiAgICAgICAgICBldmVudCBpcyBmaXJlZCBvbiBldmVyeSBzY3JvbGwgdG9vLiovXG4gICAgICAgICAgaWYgKHNlY3Rpb25BbmNob3IgJiYgc2VjdGlvbkFuY2hvciAhPT0gc3RhdGUubGFzdFNjcm9sbGVkRGVzdGlueSAmJiAhaXNGaXJzdFNsaWRlTW92ZSB8fCBpc0ZpcnN0U2Nyb2xsTW92ZSB8fCAhc3RhdGUuc2xpZGVNb3ZpbmcgJiYgc3RhdGUubGFzdFNjcm9sbGVkU2xpZGUgIT0gc2xpZGVBbmNob3IpIHtcbiAgICAgICAgICAgIEV2ZW50RW1pdHRlci5lbWl0KGV2ZW50cy5vblNjcm9sbFBhZ2VBbmRTbGlkZSwge1xuICAgICAgICAgICAgICBzZWN0aW9uQW5jaG9yOiBzZWN0aW9uQW5jaG9yLFxuICAgICAgICAgICAgICBzbGlkZUFuY2hvcjogc2xpZGVBbmNob3JcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIEV2ZW50RW1pdHRlci5vbihldmVudHMuYmluZEV2ZW50cywgYmluZEV2ZW50cyQ0KTtcblxuICAgIGZ1bmN0aW9uIGJpbmRFdmVudHMkNCgpIHtcbiAgICAgIGRvY0FkZEV2ZW50KCd3aGVlbCcsIHdoZWVsRGF0YUhhbmRsZXIucmVnaXN0ZXJFdmVudCwgZ2V0UGFzc2l2ZU9wdGlvbnNJZlBvc3NpYmxlKCkpO1xuICAgICAgRXZlbnRFbWl0dGVyLm9uKGV2ZW50cy5zY3JvbGxCZXlvbmRGdWxscGFnZSwgc2Nyb2xsQmV5b25kRnVsbFBhZ2UpO1xuICAgICAgRXZlbnRFbWl0dGVyLm9uKGV2ZW50cy5vbktleURvd24sIG9uS2V5RG93bik7XG4gICAgfVxuXG4gICAgRXZlbnRFbWl0dGVyLm9uKGV2ZW50cy5iaW5kRXZlbnRzLCBiaW5kRXZlbnRzJDMpO1xuXG4gICAgZnVuY3Rpb24gYmluZEV2ZW50cyQzKCkge1xuICAgICAgRXZlbnRFbWl0dGVyLm9uKGV2ZW50cy5vbkNsaWNrT3JUb3VjaCwgb25DbGlja09yVG91Y2gkMSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25DbGlja09yVG91Y2gkMShwYXJhbXMpIHtcbiAgICAgIHZhciB0YXJnZXQgPSBwYXJhbXMudGFyZ2V0O1xuXG4gICAgICBpZiAoY2xvc2VzdCh0YXJnZXQsIGdldE9wdGlvbnMoKS5tZW51ICsgJyBbZGF0YS1tZW51YW5jaG9yXScpKSB7XG4gICAgICAgIG1lbnVJdGVtc0hhbmRsZXIuY2FsbCh0YXJnZXQsIHBhcmFtcyk7XG4gICAgICB9XG4gICAgfSAvL01lbnUgaXRlbSBoYW5kbGVyIHdoZW4gbm90IHVzaW5nIGFuY2hvcnMgb3IgdXNpbmcgbG9ja0FuY2hvcnM6dHJ1ZVxuXG5cbiAgICBmdW5jdGlvbiBtZW51SXRlbXNIYW5kbGVyKGUpIHtcbiAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgc2Nyb2xsVHJpZ2dlcjogJ21lbnUnXG4gICAgICB9KTtcblxuICAgICAgaWYgKCQoZ2V0T3B0aW9ucygpLm1lbnUpWzBdICYmIChnZXRPcHRpb25zKCkubG9ja0FuY2hvcnMgfHwgIWdldE9wdGlvbnMoKS5hbmNob3JzLmxlbmd0aCkpIHtcbiAgICAgICAgcHJldmVudERlZmF1bHQoZSk7XG4gICAgICAgIC8qanNoaW50IHZhbGlkdGhpczp0cnVlICovXG5cbiAgICAgICAgRXZlbnRFbWl0dGVyLmVtaXQoZXZlbnRzLm9uTWVudUNsaWNrLCB7XG4gICAgICAgICAgYW5jaG9yOiBnZXRBdHRyKHRoaXMsICdkYXRhLW1lbnVhbmNob3InKVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBFdmVudEVtaXR0ZXIub24oZXZlbnRzLmJpbmRFdmVudHMsIGJpbmRFdmVudHMkMik7XG5cbiAgICBmdW5jdGlvbiBiaW5kRXZlbnRzJDIoKSB7XG4gICAgICBFdmVudEVtaXR0ZXIub24oZXZlbnRzLm9uQ2xpY2tPclRvdWNoLCBvbkNsaWNrT3JUb3VjaCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25DbGlja09yVG91Y2gocGFyYW1zKSB7XG4gICAgICB2YXIgdGFyZ2V0ID0gcGFyYW1zLnRhcmdldDtcblxuICAgICAgaWYgKHRhcmdldCAmJiBjbG9zZXN0KHRhcmdldCwgU0VDVElPTl9OQVZfU0VMICsgJyBhJykpIHtcbiAgICAgICAgc2VjdGlvbkJ1bGxldEhhbmRsZXIuY2FsbCh0YXJnZXQsIHBhcmFtcy5lKTtcbiAgICAgIH0gZWxzZSBpZiAobWF0Y2hlcyh0YXJnZXQsIFNFQ1RJT05fTkFWX1RPT0xUSVBfU0VMKSkge1xuICAgICAgICB0b29sdGlwVGV4dEhhbmRsZXIuY2FsbCh0YXJnZXQpO1xuICAgICAgfSBlbHNlIGlmIChtYXRjaGVzKHRhcmdldCwgU0xJREVTX05BVl9MSU5LX1NFTCkgfHwgY2xvc2VzdCh0YXJnZXQsIFNMSURFU19OQVZfTElOS19TRUwpICE9IG51bGwpIHtcbiAgICAgICAgc2xpZGVCdWxsZXRIYW5kbGVyLmNhbGwodGFyZ2V0LCBwYXJhbXMuZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGxhc3RTY3JvbGwgPSAwO1xuICAgIHZhciBnX3Njcm9sbElkO1xuICAgIHZhciBnX3Njcm9sbElkMjtcbiAgICBFdmVudEVtaXR0ZXIub24oZXZlbnRzLm9uRGVzdHJveSwgb25EZXN0cm95JDEpOyAvL3doZW4gc2Nyb2xsaW5nLi4uXG5cbiAgICBmdW5jdGlvbiBzY3JvbGxIYW5kbGVyKGUpIHtcbiAgICAgIHZhciBjdXJyZW50U2VjdGlvbjtcbiAgICAgIHZhciBjdXJyZW50U2VjdGlvbkVsZW07XG5cbiAgICAgIGlmIChzdGF0ZS5pc1Jlc2l6aW5nIHx8ICFnZXRTdGF0ZSgpLmFjdGl2ZVNlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBnZXRMYXN0KGdldFN0YXRlKCkuc2VjdGlvbnMpO1xuXG4gICAgICBpZiAoZ2V0U3RhdGUoKS5pc0JleW9uZEZ1bGxwYWdlIHx8IGdldFN0YXRlKCkuaXNBYm91dFRvU2Nyb2xsVG9GdWxsUGFnZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICghZ2V0T3B0aW9ucygpLmF1dG9TY3JvbGxpbmcgfHwgZ2V0T3B0aW9ucygpLnNjcm9sbEJhcikge1xuICAgICAgICB2YXIgY3VycmVudFNjcm9sbCA9IGdldFNjcm9sbFRvcCgpO1xuICAgICAgICB2YXIgc2Nyb2xsRGlyZWN0aW9uID0gZ2V0U2Nyb2xsRGlyZWN0aW9uKGN1cnJlbnRTY3JvbGwpO1xuICAgICAgICB2YXIgdmlzaWJsZVNlY3Rpb25JbmRleCA9IDA7XG4gICAgICAgIHZhciBzY3JlZW5fbWlkID0gY3VycmVudFNjcm9sbCArIGdldFdpbmRvd0hlaWdodCgpIC8gMi4wO1xuICAgICAgICB2YXIgaXNBdEJvdHRvbSA9ICRib2R5LnNjcm9sbEhlaWdodCAtIGdldFdpbmRvd0hlaWdodCgpID09PSBjdXJyZW50U2Nyb2xsO1xuICAgICAgICB2YXIgc2VjdGlvbnMgPSBnZXRTdGF0ZSgpLnNlY3Rpb25zO1xuICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgc2Nyb2xsWTogY3VycmVudFNjcm9sbFxuICAgICAgICB9KTsgLy93aGVuIHVzaW5nIGBhdXRvLWhlaWdodGAgZm9yIGEgc21hbGwgbGFzdCBzZWN0aW9uIGl0IHdvbid0IGJlIGNlbnRlcmVkIGluIHRoZSB2aWV3cG9ydFxuXG4gICAgICAgIGlmIChpc0F0Qm90dG9tKSB7XG4gICAgICAgICAgdmlzaWJsZVNlY3Rpb25JbmRleCA9IHNlY3Rpb25zLmxlbmd0aCAtIDE7XG4gICAgICAgIH0gLy9pcyBhdCB0b3A/IHdoZW4gdXNpbmcgYGF1dG8taGVpZ2h0YCBmb3IgYSBzbWFsbCBmaXJzdCBzZWN0aW9uIGl0IHdvbid0IGJlIGNlbnRlcmVkIGluIHRoZSB2aWV3cG9ydFxuICAgICAgICBlbHNlIGlmICghY3VycmVudFNjcm9sbCkge1xuICAgICAgICAgIHZpc2libGVTZWN0aW9uSW5kZXggPSAwO1xuICAgICAgICB9IC8vdGFraW5nIHRoZSBzZWN0aW9uIHdoaWNoIGlzIHNob3dpbmcgbW9yZSBjb250ZW50IGluIHRoZSB2aWV3cG9ydFxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlY3Rpb25zLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB2YXIgc2VjdGlvbiA9IHNlY3Rpb25zW2ldLml0ZW07IC8vIFBpY2sgdGhlIHRoZSBsYXN0IHNlY3Rpb24gd2hpY2ggcGFzc2VzIHRoZSBtaWRkbGUgbGluZSBvZiB0aGUgc2NyZWVuLlxuXG4gICAgICAgICAgICBpZiAoc2VjdGlvbi5vZmZzZXRUb3AgPD0gc2NyZWVuX21pZCkge1xuICAgICAgICAgICAgICB2aXNpYmxlU2VjdGlvbkluZGV4ID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNDb21wbGV0ZWx5SW5WaWV3UG9ydChzY3JvbGxEaXJlY3Rpb24pKSB7XG4gICAgICAgICAgaWYgKCFoYXNDbGFzcyhnZXRTdGF0ZSgpLmFjdGl2ZVNlY3Rpb24uaXRlbSwgQ09NUExFVEVMWSkpIHtcbiAgICAgICAgICAgIGFkZENsYXNzKGdldFN0YXRlKCkuYWN0aXZlU2VjdGlvbi5pdGVtLCBDT01QTEVURUxZKTtcbiAgICAgICAgICAgIHJlbW92ZUNsYXNzKHNpYmxpbmdzKGdldFN0YXRlKCkuYWN0aXZlU2VjdGlvbi5pdGVtKSwgQ09NUExFVEVMWSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IC8vZ2V0aW5nIHRoZSBsYXN0IG9uZSwgdGhlIGN1cnJlbnQgb25lIG9uIHRoZSBzY3JlZW5cblxuXG4gICAgICAgIGN1cnJlbnRTZWN0aW9uID0gc2VjdGlvbnNbdmlzaWJsZVNlY3Rpb25JbmRleF07XG4gICAgICAgIGN1cnJlbnRTZWN0aW9uRWxlbSA9IGN1cnJlbnRTZWN0aW9uLml0ZW07IC8vc2V0dGluZyB0aGUgdmlzaWJsZSBzZWN0aW9uIGFzIGFjdGl2ZSB3aGVuIG1hbnVhbGx5IHNjcm9sbGluZ1xuICAgICAgICAvL2V4ZWN1dGluZyBvbmx5IG9uY2UgdGhlIGZpcnN0IHRpbWUgd2UgcmVhY2ggdGhlIHNlY3Rpb25cblxuICAgICAgICBpZiAoIWN1cnJlbnRTZWN0aW9uLmlzQWN0aXZlKSB7XG4gICAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgICAgaXNTY3JvbGxpbmc6IHRydWVcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB2YXIgbGVhdmluZ1NlY3Rpb24gPSBnZXRTdGF0ZSgpLmFjdGl2ZVNlY3Rpb24uaXRlbTtcbiAgICAgICAgICB2YXIgbGVhdmluZ1NlY3Rpb25JbmRleCA9IGdldFN0YXRlKCkuYWN0aXZlU2VjdGlvbi5pbmRleCgpICsgMTtcbiAgICAgICAgICB2YXIgeU1vdmVtZW50ID0gZ2V0WW1vdmVtZW50KGdldFN0YXRlKCkuYWN0aXZlU2VjdGlvbiwgY3VycmVudFNlY3Rpb25FbGVtKTtcbiAgICAgICAgICB2YXIgYW5jaG9yTGluayA9IGN1cnJlbnRTZWN0aW9uLmFuY2hvcjtcbiAgICAgICAgICB2YXIgc2VjdGlvbkluZGV4ID0gY3VycmVudFNlY3Rpb24uaW5kZXgoKSArIDE7XG4gICAgICAgICAgdmFyIGFjdGl2ZVNsaWRlID0gY3VycmVudFNlY3Rpb24uYWN0aXZlU2xpZGU7XG4gICAgICAgICAgdmFyIHNsaWRlSW5kZXg7XG4gICAgICAgICAgdmFyIHNsaWRlQW5jaG9yTGluaztcbiAgICAgICAgICB2YXIgY2FsbGJhY2tzUGFyYW1zID0ge1xuICAgICAgICAgICAgYWN0aXZlU2VjdGlvbjogbGVhdmluZ1NlY3Rpb24sXG4gICAgICAgICAgICBzZWN0aW9uSW5kZXg6IHNlY3Rpb25JbmRleCAtIDEsXG4gICAgICAgICAgICBhbmNob3JMaW5rOiBhbmNob3JMaW5rLFxuICAgICAgICAgICAgZWxlbWVudDogY3VycmVudFNlY3Rpb25FbGVtLFxuICAgICAgICAgICAgbGVhdmluZ1NlY3Rpb246IGxlYXZpbmdTZWN0aW9uSW5kZXgsXG4gICAgICAgICAgICBkaXJlY3Rpb246IHlNb3ZlbWVudCxcbiAgICAgICAgICAgIGl0ZW1zOiB7XG4gICAgICAgICAgICAgIG9yaWdpbjogZ2V0U3RhdGUoKS5hY3RpdmVTZWN0aW9uLFxuICAgICAgICAgICAgICBkZXN0aW5hdGlvbjogY3VycmVudFNlY3Rpb25cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgaWYgKGFjdGl2ZVNsaWRlKSB7XG4gICAgICAgICAgICBzbGlkZUFuY2hvckxpbmsgPSBhY3RpdmVTbGlkZS5hbmNob3I7XG4gICAgICAgICAgICBzbGlkZUluZGV4ID0gYWN0aXZlU2xpZGUuaW5kZXgoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc3RhdGUuY2FuU2Nyb2xsKSB7XG4gICAgICAgICAgICBhZGRDbGFzcyhjdXJyZW50U2VjdGlvbkVsZW0sIEFDVElWRSk7XG4gICAgICAgICAgICByZW1vdmVDbGFzcyhzaWJsaW5ncyhjdXJyZW50U2VjdGlvbkVsZW0pLCBBQ1RJVkUpO1xuXG4gICAgICAgICAgICBpZiAoaXNGdW5jdGlvbihnZXRPcHRpb25zKCkuYmVmb3JlTGVhdmUpKSB7XG4gICAgICAgICAgICAgIGZpcmVDYWxsYmFja09uY2VQZXJTY3JvbGwoJ2JlZm9yZUxlYXZlJywgY2FsbGJhY2tzUGFyYW1zKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24oZ2V0T3B0aW9ucygpLm9uTGVhdmUpKSB7XG4gICAgICAgICAgICAgIGZpcmVDYWxsYmFjaygnb25MZWF2ZScsIGNhbGxiYWNrc1BhcmFtcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKGdldE9wdGlvbnMoKS5hZnRlckxvYWQpKSB7XG4gICAgICAgICAgICAgIGZpcmVDYWxsYmFjaygnYWZ0ZXJMb2FkJywgY2FsbGJhY2tzUGFyYW1zKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3RvcE1lZGlhKGxlYXZpbmdTZWN0aW9uKTtcbiAgICAgICAgICAgIGxhenlMb2FkKGN1cnJlbnRTZWN0aW9uRWxlbSk7XG4gICAgICAgICAgICBwbGF5TWVkaWEoY3VycmVudFNlY3Rpb25FbGVtKTtcbiAgICAgICAgICAgIGFjdGl2YXRlTWVudUFuZE5hdihhbmNob3JMaW5rLCBzZWN0aW9uSW5kZXggLSAxKTtcblxuICAgICAgICAgICAgaWYgKGdldE9wdGlvbnMoKS5hbmNob3JzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAvL25lZWRlZCB0byBlbnRlciBpbiBoYXNoQ2hhbmdlIGV2ZW50IHdoZW4gdXNpbmcgdGhlIG1lbnUgd2l0aCBhbmNob3IgbGlua3NcbiAgICAgICAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGxhc3RTY3JvbGxlZERlc3Rpbnk6IGFuY2hvckxpbmtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNldFBhZ2VTdGF0dXMoc2xpZGVJbmRleCwgc2xpZGVBbmNob3JMaW5rLCBhbmNob3JMaW5rKTtcbiAgICAgICAgICAgIHVwZGF0ZVN0YXRlKCk7XG4gICAgICAgICAgfSAvL3NtYWxsIHRpbWVvdXQgaW4gb3JkZXIgdG8gYXZvaWQgZW50ZXJpbmcgaW4gaGFzaENoYW5nZSBldmVudCB3aGVuIHNjcm9sbGluZyBpcyBub3QgZmluaXNoZWQgeWV0XG5cblxuICAgICAgICAgIGNsZWFyVGltZW91dChnX3Njcm9sbElkKTtcbiAgICAgICAgICBnX3Njcm9sbElkID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgICAgIGlzU2Nyb2xsaW5nOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChnZXRPcHRpb25zKCkuZml0VG9TZWN0aW9uICYmIHN0YXRlLmNhblNjcm9sbCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dChnX3Njcm9sbElkMik7XG4gICAgICAgICAgZ19zY3JvbGxJZDIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBmaXhlZFNlY3Rpb25zID0gc3RhdGUuc2VjdGlvbnMuZmlsdGVyKGZ1bmN0aW9uIChzZWN0aW9uKSB7XG4gICAgICAgICAgICAgIHZhciBzZWN0aW9uVmFsdWVzID0gc2VjdGlvbi5pdGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChzZWN0aW9uVmFsdWVzLmJvdHRvbSkgPT09IE1hdGgucm91bmQoZ2V0V2luZG93SGVpZ2h0KCkpIHx8IE1hdGgucm91bmQoc2VjdGlvblZhbHVlcy50b3ApID09PSAwO1xuICAgICAgICAgICAgfSk7IC8vIE5vIHNlY3Rpb24gaXMgZml0dGluZyB0aGUgdmlld3BvcnQ/IExldCdzIGZpeCB0aGF0IVxuXG4gICAgICAgICAgICBpZiAoIWZpeGVkU2VjdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIGZpdFRvU2VjdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIGdldE9wdGlvbnMoKS5maXRUb1NlY3Rpb25EZWxheSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkRlc3Ryb3kkMSgpIHtcbiAgICAgIGNsZWFyVGltZW91dChnX3Njcm9sbElkKTtcbiAgICAgIGNsZWFyVGltZW91dChnX3Njcm9sbElkMik7XG4gICAgfVxuICAgIC8qKlxuICAgICogR2V0cyB0aGUgZGlyZWN0b24gb2YgdGhlIHRoZSBzY3JvbGxpbmcgZmlyZWQgYnkgdGhlIHNjcm9sbCBldmVudC5cbiAgICAqL1xuXG5cbiAgICBmdW5jdGlvbiBnZXRTY3JvbGxEaXJlY3Rpb24oY3VycmVudFNjcm9sbCkge1xuICAgICAgdmFyIGRpcmVjdGlvbiA9IGN1cnJlbnRTY3JvbGwgPiBsYXN0U2Nyb2xsID8gJ2Rvd24nIDogJ3VwJztcbiAgICAgIGxhc3RTY3JvbGwgPSBjdXJyZW50U2Nyb2xsOyAvL25lZWRlZCBmb3IgYXV0by1oZWlnaHQgc2VjdGlvbnMgdG8gZGV0ZXJtaW5lIGlmIHdlIHdhbnQgdG8gc2Nyb2xsIHRvIHRoZSB0b3Agb3IgYm90dG9tIG9mIHRoZSBkZXN0aW5hdGlvblxuXG4gICAgICBzZXRTdGF0ZSh7XG4gICAgICAgIHByZXZpb3VzRGVzdFRvcDogY3VycmVudFNjcm9sbFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gZGlyZWN0aW9uO1xuICAgIH1cbiAgICAvKipcbiAgICAqIERldGVybWluZXMgd2hldGhlciB0aGUgYWN0aXZlIHNlY3Rpb24gaGFzIHNlZW4gaW4gaXRzIHdob2xlIG9yIG5vdC5cbiAgICAqL1xuXG5cbiAgICBmdW5jdGlvbiBpc0NvbXBsZXRlbHlJblZpZXdQb3J0KG1vdmVtZW50KSB7XG4gICAgICB2YXIgdG9wID0gZ2V0U3RhdGUoKS5hY3RpdmVTZWN0aW9uLml0ZW0ub2Zmc2V0VG9wO1xuICAgICAgdmFyIGJvdHRvbSA9IHRvcCArIGdldFdpbmRvd0hlaWdodCgpO1xuXG4gICAgICBpZiAobW92ZW1lbnQgPT0gJ3VwJykge1xuICAgICAgICByZXR1cm4gYm90dG9tID49IGdldFNjcm9sbFRvcCgpICsgZ2V0V2luZG93SGVpZ2h0KCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0b3AgPD0gZ2V0U2Nyb2xsVG9wKCk7XG4gICAgfVxuXG4gICAgRXZlbnRFbWl0dGVyLm9uKGV2ZW50cy5iaW5kRXZlbnRzLCBiaW5kRXZlbnRzJDEpO1xuICAgIEV2ZW50RW1pdHRlci5vbihldmVudHMub25EZXN0cm95LCBvbkRlc3Ryb3kpO1xuXG4gICAgZnVuY3Rpb24gb25EZXN0cm95KCkge1xuICAgICAgd2luZG93UmVtb3ZlRXZlbnQoJ3Njcm9sbCcsIHNjcm9sbEhhbmRsZXIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJpbmRFdmVudHMkMSgpIHtcbiAgICAgIHdpbmRvd0FkZEV2ZW50KCdzY3JvbGwnLCBzY3JvbGxIYW5kbGVyKTtcbiAgICAgIGRvYy5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHNjcm9sbEhhbmRsZXIpO1xuICAgICAgRXZlbnRFbWl0dGVyLm9uKGV2ZW50cy5vblNjcm9sbFBhZ2VBbmRTbGlkZSwgZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgICBzY3JvbGxQYWdlQW5kU2xpZGUocGFyYW1zLnNlY3Rpb25BbmNob3IsIHBhcmFtcy5zbGlkZUFuY2hvcik7XG4gICAgICB9KTtcbiAgICAgIEV2ZW50RW1pdHRlci5vbihldmVudHMub25NZW51Q2xpY2ssIGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICAgICAgbW92ZVRvJDEocGFyYW1zLmFuY2hvciwgdW5kZWZpbmVkKTtcbiAgICAgIH0pO1xuICAgICAgRXZlbnRFbWl0dGVyLm9uKGV2ZW50cy5vblNjcm9sbE92ZXJmbG93U2Nyb2xsZWQsIGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICAgICAgdmFyIHNjcm9sbFNlY3Rpb24gPSBwYXJhbXMuZGlyZWN0aW9uID09PSAnZG93bicgPyBtb3ZlU2VjdGlvbkRvd24gOiBtb3ZlU2VjdGlvblVwO1xuICAgICAgICBzY3JvbGxTZWN0aW9uKCk7XG4gICAgICB9KTtcbiAgICAgIEV2ZW50RW1pdHRlci5vbihldmVudHMuc2Nyb2xsUGFnZSwgZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgICBzY3JvbGxQYWdlKHBhcmFtcy5kZXN0aW5hdGlvbik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBGUC5nZXRBY3RpdmVTbGlkZSA9IGdldEFjdGl2ZVNsaWRlO1xuXG4gICAgRlAuZ2V0U2Nyb2xsWCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBzdGF0ZS5zY3JvbGxYO1xuICAgIH07XG5cbiAgICBFdmVudEVtaXR0ZXIub24oZXZlbnRzLmJpbmRFdmVudHMsIGJpbmRFdmVudHMpO1xuXG4gICAgZnVuY3Rpb24gYmluZEV2ZW50cygpIHtcbiAgICAgIEV2ZW50RW1pdHRlci5vbihldmVudHMub25EZXN0cm95LCBvbkRlc3Ryb3kkNyk7XG4gICAgICBFdmVudEVtaXR0ZXIub24oZXZlbnRzLmxhbmRzY2FwZVNjcm9sbCwgZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgICBsYW5kc2NhcGVTY3JvbGwocGFyYW1zLnNsaWRlcywgcGFyYW1zLmRlc3RpbmF0aW9uKTtcbiAgICAgIH0pO1xuICAgICAgRXZlbnRFbWl0dGVyLm9uKGV2ZW50cy5tb3ZlU2xpZGVSaWdodCwgZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgICBtb3ZlU2xpZGVSaWdodChwYXJhbXMuc2VjdGlvbik7XG4gICAgICB9KTtcbiAgICAgIEV2ZW50RW1pdHRlci5vbihldmVudHMubW92ZVNsaWRlTGVmdCwgZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgICBtb3ZlU2xpZGVMZWZ0KHBhcmFtcy5zZWN0aW9uKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAqIEdldHMgdGhlIGFjdGl2ZSBzbGlkZS5cbiAgICAqL1xuXG5cbiAgICBmdW5jdGlvbiBnZXRBY3RpdmVTbGlkZSgpIHtcbiAgICAgIHJldHVybiBudWxsT3JTbGlkZShnZXRTdGF0ZSgpLmFjdGl2ZVNlY3Rpb24uYWN0aXZlU2xpZGUpO1xuICAgIH1cblxuICAgIEV2ZW50RW1pdHRlci5vbihldmVudHMuYmluZEV2ZW50cywgaW5pdCQxKTtcblxuICAgIGZ1bmN0aW9uIGluaXQkMSgpIHtcbiAgICAgIHZhciBwb3NpdGlvbiA9IGdldE9wdGlvbnMoKS5jcmVkaXRzLnBvc2l0aW9uO1xuICAgICAgdmFyIHBvc2l0aW9uU3R5bGUgPSBbJ2xlZnQnLCAncmlnaHQnXS5pbmRleE9mKHBvc2l0aW9uKSA+IC0xID8gXCJcIi5jb25jYXQocG9zaXRpb24sIFwiOiAwO1wiKSA6ICcnO1xuICAgICAgdmFyIHdhdGVyTWFyayA9IFwiXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmcC13YXRlcm1hcmtcXFwiIHN0eWxlPVxcXCJcIi5jb25jYXQocG9zaXRpb25TdHlsZSwgXCJcXFwiPlxcbiAgICAgICAgICAgIDxhIGhyZWY9XFxcImh0dHBzOi8vYWx2YXJvdHJpZ28uY29tL2Z1bGxQYWdlL1xcXCIgXFxuICAgICAgICAgICAgICAgIHJlbD1cXFwibm9mb2xsb3cgbm9vcGVuZXJcXFwiIFxcbiAgICAgICAgICAgICAgICB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgXFxuICAgICAgICAgICAgICAgIHN0eWxlPVxcXCJ0ZXh0LWRlY29yYXRpb246bm9uZTsgY29sb3I6ICMwMDA7XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIFwiKS5jb25jYXQoZ2V0T3B0aW9ucygpLmNyZWRpdHMubGFiZWwsIFwiXFxuICAgICAgICAgICAgPC9hPlxcbiAgICAgICAgPC9kaXY+XFxuICAgIFwiKTtcbiAgICAgIHZhciBsYXN0U2VjdGlvbiA9IGdldExhc3Qoc3RhdGUuc2VjdGlvbnMpO1xuICAgICAgdmFyIHNob3VsZFVzZVdhdGVyTWFyayA9ICFzdGF0ZS5pc1ZhbGlkIHx8IGdldE9wdGlvbnMoKS5jcmVkaXRzLmVuYWJsZWQ7XG5cbiAgICAgIGlmIChsYXN0U2VjdGlvbiAmJiBsYXN0U2VjdGlvbi5pdGVtICYmIHNob3VsZFVzZVdhdGVyTWFyaykge1xuICAgICAgICBsYXN0U2VjdGlvbi5pdGVtLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgd2F0ZXJNYXJrKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAhZnVuY3Rpb24gKCkge1xuICAgICAgRXZlbnRFbWl0dGVyLm9uKGV2ZW50cy5vbkluaXRpYWxpc2UsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG4sIGEsIGw7XG4gICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICBpc1ZhbGlkOiAoZ2V0T3B0aW9ucygpLmxpY2Vuc2VLZXksIG4gPSBnZXRPcHRpb25zKCkubGljZW5zZUtleSwgYSA9IGZ1bmN0aW9uIChuKSB7XG4gICAgICAgICAgICB2YXIgZSA9IHBhcnNlSW50KFwiXFx4MzVcXHgzMVxceDM0XCIpLnRvU3RyaW5nKDE2KTtcbiAgICAgICAgICAgIGlmICghbiB8fCBuLmxlbmd0aCA8IDI5IHx8IDQgPT09IG4uc3BsaXQodFswXSkubGVuZ3RoKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIHZhciBpID0gW1wiXFx4NDVcXHg2MVxceDYzXFx4NjhcIiwgXCJcXHg2NlxceDZmXFx4NzJcIl1bcigpXSgpLmpvaW4oXCJcIiksXG4gICAgICAgICAgICAgICAgYSA9IG5bW1wiXFx4NzNcXHg3MFxceDZjXFx4NjlcXHg3NFwiXV0oXCItXCIpLFxuICAgICAgICAgICAgICAgIGwgPSBbXTtcbiAgICAgICAgICAgIGFbaV0oZnVuY3Rpb24gKHQsIG4pIHtcbiAgICAgICAgICAgICAgaWYgKG4gPCA0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGkgPSBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgICAgICAgdmFyIG4gPSB0W3QubGVuZ3RoIC0gMV0sXG4gICAgICAgICAgICAgICAgICAgICAgZSA9IFtcIlxceDRlXFx4NjFcXHg0ZVwiLCBcIlxceDY5XFx4NzNcIl1bcigpXSgpLmpvaW4oXCJcIik7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93W2VdKG4pID8gbyhuKSA6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0IC0gQUNUSVZFLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgIH0obik7XG4gICAgICAgICAgICAgICAgfSh0KTtcblxuICAgICAgICAgICAgICAgIGwucHVzaChpKTtcbiAgICAgICAgICAgICAgICB2YXIgcyA9IG8odFtpXSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoMSA9PT0gbikge1xuICAgICAgICAgICAgICAgICAgdmFyIGEgPSBbXCJcXHg3MFxceDYxXCIsIFwiXFx4NjRcXHg1M1wiLCBcIlxceDc0XCIsIFwiXFx4NjFcXHg3MlxceDc0XCJdLmpvaW4oXCJcIik7XG4gICAgICAgICAgICAgICAgICBzID0gcy50b1N0cmluZygpW2FdKDIsIFwiMFwiKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBlICs9IHMsIDAgIT09IG4gJiYgMSAhPT0gbiB8fCAoZSArPSBcIi1cIik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIG0gPSAwLFxuICAgICAgICAgICAgICAgIHAgPSBcIlwiO1xuICAgICAgICAgICAgcmV0dXJuIG4uc3BsaXQoXCItXCIpLmZvckVhY2goZnVuY3Rpb24gKHQsIG4pIHtcbiAgICAgICAgICAgICAgaWYgKG4gPCA0KSB7XG4gICAgICAgICAgICAgICAgdmFyIF9yID0gMDtcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIGUgPSAwOyBlIDwgNDsgZSsrKSB7XG4gICAgICAgICAgICAgICAgICBlICE9PSBsW25dICYmIChfciArPSBNYXRoLmFicyhvKHRbZV0pKSwgaXNOYU4odFtlXSkgfHwgbSsrKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgaSA9IHMoX3IpO1xuICAgICAgICAgICAgICAgIHAgKz0gaTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSksIHAgKz0gcyhtKSwge1xuICAgICAgICAgICAgICB2OiBuZXcgRGF0ZShlICsgXCJUMDA6MDBcIiksXG4gICAgICAgICAgICAgIG86IGUuc3BsaXQoXCItXCIpWzJdID09PSA4ICogKEFDVElWRS5sZW5ndGggLSAyKSArIFwiXCIsXG4gICAgICAgICAgICAgIGw6IHBcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfShuKSwgbCA9IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICB2YXIgbiA9IGlbcigpXSgpLmpvaW4oXCJcIik7XG4gICAgICAgICAgICByZXR1cm4gdCAmJiAwID09PSBuLmluZGV4T2YodCkgJiYgdC5sZW5ndGggPT09IG4ubGVuZ3RoO1xuICAgICAgICAgIH0obiksIChhIHx8IGwpICYmIChnZXRPcHRpb25zKCkuY3JlZGl0cyAmJiBhICYmIGUgPD0gYS52ICYmIGEubCA9PT0gbi5zcGxpdCh0WzBdKVs0XSB8fCBsIHx8IGEubykgfHwgITEpXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICB2YXIgdCA9IFtcIi1cIl07XG4gICAgICB2YXIgbiA9IFwiMjAyMi05LTI1XCIuc3BsaXQoXCItXCIpLFxuICAgICAgICAgIGUgPSBuZXcgRGF0ZShuWzBdLCBuWzFdLCBuWzJdKSxcbiAgICAgICAgICBpID0gW1wic2VcIiwgXCJsaWNlblwiLCBcIi1cIiwgXCJ2M1wiLCBcImxcIiwgXCJncFwiXTtcblxuICAgICAgZnVuY3Rpb24gcigpIHtcbiAgICAgICAgcmV0dXJuIFtbXCJcXHg3MlxceDY1XCIsIFwiXFx4NzZcXHg2NVxceDcyXFx4NzNcXHg2NVwiXS5qb2luKFwiXCIpXVtcIlwiLmxlbmd0aF07XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIG8odCkge1xuICAgICAgICByZXR1cm4gdCA/IGlzTmFOKHQpID8gdC5jaGFyQ29kZUF0KDApIC0gNzIgOiB0IDogXCJcIjtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gcyh0KSB7XG4gICAgICAgIHZhciBuID0gNzIgKyB0O1xuICAgICAgICByZXR1cm4gbiA+IDkwICYmIG4gPCA5NyAmJiAobiArPSAxNSksIFN0cmluZy5mcm9tQ2hhckNvZGUobikudG9VcHBlckNhc2UoKTtcbiAgICAgIH1cbiAgICB9KCk7XG5cbiAgICAvL0B0cy1jaGVja1xuICAgIEZQLnNldEtleWJvYXJkU2Nyb2xsaW5nID0gc2V0S2V5Ym9hcmRTY3JvbGxpbmc7XG4gICAgLyoqXG4gICAgKiBBZGRzIG9yIHJlbW92ZSB0aGUgcG9zc2liaWxpdHkgb2Ygc2Nyb2xsaW5nIHRocm91Z2ggc2VjdGlvbnMgYnkgdXNpbmcgdGhlIGtleWJvYXJkIGFycm93IGtleXNcbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gc2V0S2V5Ym9hcmRTY3JvbGxpbmcodmFsdWUsIGRpcmVjdGlvbnMpIHtcbiAgICAgIGlmICh0eXBlb2YgZGlyZWN0aW9ucyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgZGlyZWN0aW9ucyA9IGRpcmVjdGlvbnMucmVwbGFjZSgvIC9nLCAnJykuc3BsaXQoJywnKTtcbiAgICAgICAgZGlyZWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChkaXJlY3Rpb24pIHtcbiAgICAgICAgICBzZXRJc1Njcm9sbEFsbG93ZWQodmFsdWUsIGRpcmVjdGlvbiwgJ2snKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRJc1Njcm9sbEFsbG93ZWQodmFsdWUsICdhbGwnLCAnaycpO1xuICAgICAgICBnZXRPcHRpb25zKCkua2V5Ym9hcmRTY3JvbGxpbmcgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAqIFNldHMgdGhlIGRhdGEtYW5jaG9yIGF0dHJpYnV0ZXMgdG8gdGhlIG1lbnUgZWxlbWVudHMgYW5kIGFjdGl2YXRlcyB0aGUgY3VycmVudCBvbmUuXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIHN0eWxlTWVudShzZWN0aW9uKSB7XG4gICAgICB2YXIgaW5kZXggPSBzZWN0aW9uLmluZGV4KCk7XG5cbiAgICAgIGlmICh0eXBlb2YgZ2V0T3B0aW9ucygpLmFuY2hvcnNbaW5kZXhdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAvL2FjdGl2YXRpbmcgdGhlIG1lbnUgLyBuYXYgZWxlbWVudCBvbiBsb2FkXG4gICAgICAgIGlmIChzZWN0aW9uLmlzQWN0aXZlKSB7XG4gICAgICAgICAgYWN0aXZhdGVNZW51QW5kTmF2KGdldE9wdGlvbnMoKS5hbmNob3JzW2luZGV4XSwgaW5kZXgpO1xuICAgICAgICB9XG4gICAgICB9IC8vbW92aW5nIHRoZSBtZW51IG91dHNpZGUgdGhlIG1haW4gY29udGFpbmVyIGlmIGl0IGlzIGluc2lkZSAoYXZvaWQgcHJvYmxlbXMgd2l0aCBmaXhlZCBwb3NpdGlvbnMgd2hlbiB1c2luZyBDU1MzIHRyYW5mb3JtcylcblxuXG4gICAgICBpZiAoZ2V0T3B0aW9ucygpLm1lbnUgJiYgZ2V0T3B0aW9ucygpLmNzczMgJiYgY2xvc2VzdCgkKGdldE9wdGlvbnMoKS5tZW51KVswXSwgV1JBUFBFUl9TRUwpICE9IG51bGwpIHtcbiAgICAgICAgJChnZXRPcHRpb25zKCkubWVudSkuZm9yRWFjaChmdW5jdGlvbiAobWVudSkge1xuICAgICAgICAgICRib2R5LmFwcGVuZENoaWxkKG1lbnUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAqIFdvcmtzIG92ZXIgdGhlIERPTSBzdHJ1Y3R1cmUgdG8gc2V0IGl0IHVwIGZvciB0aGUgY3VycmVudCBmdWxscGFnZSBnZXRPcHRpb25zKCkuXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIHByZXBhcmVEb20oKSB7XG4gICAgICBjc3MoZ2V0UGFyZW50c1VudGlsKGdldENvbnRhaW5lcigpLCAnYm9keScpLCB7XG4gICAgICAgICdoZWlnaHQnOiAnMTAwJScsXG4gICAgICAgICdwb3NpdGlvbic6ICdyZWxhdGl2ZSdcbiAgICAgIH0pOyAvL2FkZGluZyBhIGNsYXNzIHRvIHJlY29nbml6ZSB0aGUgY29udGFpbmVyIGludGVybmFsbHkgaW4gdGhlIGNvZGVcblxuICAgICAgYWRkQ2xhc3MoZ2V0Q29udGFpbmVyKCksIFdSQVBQRVIpO1xuICAgICAgYWRkQ2xhc3MoJGh0bWwsIEVOQUJMRUQpOyAvL2R1ZSB0byBodHRwczovL2dpdGh1Yi5jb20vYWx2YXJvdHJpZ28vZnVsbFBhZ2UuanMvaXNzdWVzLzE1MDJcblxuICAgICAgc2V0U3RhdGUoe1xuICAgICAgICB3aW5kb3dzSGVpZ2h0OiBnZXRXaW5kb3dIZWlnaHQoKVxuICAgICAgfSk7XG4gICAgICByZW1vdmVDbGFzcyhnZXRDb250YWluZXIoKSwgREVTVFJPWUVEKTsgLy9pbiBjYXNlIGl0IHdhcyBkZXN0cm95ZWQgYmVmb3JlIGluaXRpYWxpemluZyBpdCBhZ2FpblxuXG4gICAgICBhZGRJbnRlcm5hbFNlbGVjdG9ycygpO1xuICAgICAgdmFyIHNlY3Rpb25zID0gZ2V0U3RhdGUoKS5zZWN0aW9uc0luY2x1ZGluZ0hpZGRlbjsgLy9zdHlsaW5nIHRoZSBzZWN0aW9ucyAvIHNsaWRlcyAvIG1lbnVcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWN0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgc2VjdGlvbiA9IHNlY3Rpb25zW2ldO1xuICAgICAgICB2YXIgc2xpZGVzID0gc2VjdGlvbi5hbGxTbGlkZXNJdGVtczsgLy9jYWNoaW5nIHRoZSBvcmlnaW5hbCBzdHlsZXMgdG8gYWRkIHRoZW0gYmFjayBvbiBkZXN0cm95KCdhbGwnKVxuXG4gICAgICAgIHNlY3Rpb24uaXRlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtZnAtc3R5bGVzJywgZ2V0QXR0cihzZWN0aW9uLml0ZW0sICdzdHlsZScpKTtcbiAgICAgICAgc3R5bGVTZWN0aW9uKHNlY3Rpb24pO1xuICAgICAgICBzdHlsZU1lbnUoc2VjdGlvbik7IC8vIGlmIHRoZXJlJ3MgYW55IHNsaWRlXG5cbiAgICAgICAgaWYgKHNsaWRlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgc3R5bGVTbGlkZXMoc2VjdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0gLy9maXhlZCBlbGVtZW50cyBuZWVkIHRvIGJlIG1vdmVkIG91dCBvZiB0aGUgcGx1Z2luIGNvbnRhaW5lciBkdWUgdG8gcHJvYmxlbXMgd2l0aCBDU1MzLlxuXG5cbiAgICAgIGlmIChnZXRPcHRpb25zKCkuZml4ZWRFbGVtZW50cyAmJiBnZXRPcHRpb25zKCkuY3NzMykge1xuICAgICAgICAkKGdldE9wdGlvbnMoKS5maXhlZEVsZW1lbnRzKS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgJGJvZHkuYXBwZW5kQ2hpbGQoaXRlbSk7XG4gICAgICAgIH0pO1xuICAgICAgfSAvL3ZlcnRpY2FsIGNlbnRlcmVkIG9mIHRoZSBuYXZpZ2F0aW9uICsgYWN0aXZlIGJ1bGxldFxuXG5cbiAgICAgIGlmIChnZXRPcHRpb25zKCkubmF2aWdhdGlvbikge1xuICAgICAgICBhZGRWZXJ0aWNhbE5hdmlnYXRpb24oKTtcbiAgICAgIH1cblxuICAgICAgZW5hYmxlWW91dHViZUFQSSgpO1xuXG4gICAgICBpZiAoZ2V0T3B0aW9ucygpLnNjcm9sbE92ZXJmbG93KSB7XG4gICAgICAgIHNjcm9sbE92ZXJmbG93SGFuZGxlci5tYWtlU2Nyb2xsYWJsZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIEZQLnNoYXJlZC5hZnRlclJlbmRlckFjdGlvbnMgPSBhZnRlclJlbmRlckFjdGlvbnM7XG4gICAgLyoqXG4gICAgKiBBY3Rpb25zIGFuZCBjYWxsYmFja3MgdG8gZmlyZSBhZnRlclJlbmRlclxuICAgICovXG5cbiAgICBmdW5jdGlvbiBhZnRlclJlbmRlckFjdGlvbnMoKSB7XG4gICAgICB2YXIgc2VjdGlvbiA9IGdldFN0YXRlKCkuYWN0aXZlU2VjdGlvbjtcbiAgICAgIHZhciBzZWN0aW9uRWxlbSA9IGdldFN0YXRlKCkuYWN0aXZlU2VjdGlvbi5pdGVtO1xuICAgICAgYWRkQ2xhc3Moc2VjdGlvbkVsZW0sIENPTVBMRVRFTFkpO1xuICAgICAgbGF6eUxvYWQoc2VjdGlvbkVsZW0pO1xuICAgICAgbGF6eUxvYWRPdGhlcnMoKTtcbiAgICAgIHBsYXlNZWRpYShzZWN0aW9uRWxlbSk7XG5cbiAgICAgIGlmIChpc0Rlc3RpbnlUaGVTdGFydGluZ1NlY3Rpb24oKSAmJiBpc0Z1bmN0aW9uKGdldE9wdGlvbnMoKS5hZnRlckxvYWQpKSB7XG4gICAgICAgIGZpcmVDYWxsYmFjaygnYWZ0ZXJMb2FkJywge1xuICAgICAgICAgIGFjdGl2ZVNlY3Rpb246IHNlY3Rpb25FbGVtLFxuICAgICAgICAgIGVsZW1lbnQ6IHNlY3Rpb25FbGVtLFxuICAgICAgICAgIGRpcmVjdGlvbjogbnVsbCxcbiAgICAgICAgICAvL2ZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSBjYWxsYmFjayAodG8gYmUgcmVtb3ZlZCBpbiBhIGZ1dHVyZSEpXG4gICAgICAgICAgYW5jaG9yTGluazogc2VjdGlvbi5hbmNob3IsXG4gICAgICAgICAgc2VjdGlvbkluZGV4OiBzZWN0aW9uLmluZGV4KCksXG4gICAgICAgICAgaXRlbXM6IHtcbiAgICAgICAgICAgIG9yaWdpbjogZ2V0U3RhdGUoKS5hY3RpdmVTZWN0aW9uLFxuICAgICAgICAgICAgZGVzdGluYXRpb246IGdldFN0YXRlKCkuYWN0aXZlU2VjdGlvblxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc0Z1bmN0aW9uKGdldE9wdGlvbnMoKS5hZnRlclJlbmRlcikpIHtcbiAgICAgICAgZmlyZUNhbGxiYWNrKCdhZnRlclJlbmRlcicpO1xuICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAqIERldGVybWluZXMgaWYgdGhlIFVSTCBhbmNob3IgZGVzdGlueSBpcyB0aGUgc3RhcnRpbmcgc2VjdGlvbiAodGhlIG9uZSB1c2luZyAnYWN0aXZlJyBjbGFzcyBiZWZvcmUgaW5pdGlhbGl6YXRpb24pXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIGlzRGVzdGlueVRoZVN0YXJ0aW5nU2VjdGlvbigpIHtcbiAgICAgIHZhciBhbmNob3IgPSBnZXRBbmNob3JzVVJMKCk7XG4gICAgICB2YXIgZGVzdGluYXRpb25TZWN0aW9uID0gZ2V0U2VjdGlvbkJ5QW5jaG9yKGFuY2hvci5zZWN0aW9uKTtcbiAgICAgIHJldHVybiAhYW5jaG9yLnNlY3Rpb24gfHwgIWRlc3RpbmF0aW9uU2VjdGlvbiB8fCB0eXBlb2YgZGVzdGluYXRpb25TZWN0aW9uICE9PSAndW5kZWZpbmVkJyAmJiBkZXN0aW5hdGlvblNlY3Rpb24uaW5kZXgoKSA9PT0gaW5kZXgoZ2V0U3RhcnRpbmdTZWN0aW9uKCkpO1xuICAgIH1cblxuICAgIEZQLnNldEFsbG93U2Nyb2xsaW5nID0gc2V0QWxsb3dTY3JvbGxpbmc7XG4gICAgLyoqXG4gICAgKiBBZGRzIG9yIHJlbW92ZSB0aGUgcG9zc2liaWxpdHkgb2Ygc2Nyb2xsaW5nIHRocm91Z2ggc2VjdGlvbnMgYnkgdXNpbmcgdGhlIG1vdXNlIHdoZWVsL3RyYWNrcGFkIG9yIHRvdWNoIGdlc3R1cmVzLlxuICAgICogT3B0aW9uYWxseSBhIHNlY29uZCBwYXJhbWV0ZXIgY2FuIGJlIHVzZWQgdG8gc3BlY2lmeSB0aGUgZGlyZWN0aW9uIGZvciB3aGljaCB0aGUgYWN0aW9uIHdpbGwgYmUgYXBwbGllZC5cbiAgICAqXG4gICAgKiBAcGFyYW0gZGlyZWN0aW9ucyBzdHJpbmcgY29udGFpbmluZyB0aGUgZGlyZWN0aW9uIG9yIGRpcmVjdGlvbnMgc2VwYXJhdGVkIGJ5IGNvbW1hLlxuICAgICovXG5cbiAgICBmdW5jdGlvbiBzZXRBbGxvd1Njcm9sbGluZyh2YWx1ZSwgZGlyZWN0aW9ucykge1xuICAgICAgaWYgKHR5cGVvZiBkaXJlY3Rpb25zICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBkaXJlY3Rpb25zID0gZGlyZWN0aW9ucy5yZXBsYWNlKC8gL2csICcnKS5zcGxpdCgnLCcpO1xuICAgICAgICBkaXJlY3Rpb25zLmZvckVhY2goZnVuY3Rpb24gKGRpcmVjdGlvbikge1xuICAgICAgICAgIHNldElzU2Nyb2xsQWxsb3dlZCh2YWx1ZSwgZGlyZWN0aW9uLCAnbScpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldElzU2Nyb2xsQWxsb3dlZCh2YWx1ZSwgJ2FsbCcsICdtJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBTY3JvbGxzIHRvIHRoZSBhbmNob3IgaW4gdGhlIFVSTCB3aGVuIGxvYWRpbmcgdGhlIHNpdGVcbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gc2Nyb2xsVG9BbmNob3IoKSB7XG4gICAgICB2YXIgYW5jaG9ycyA9IGdldEFuY2hvcnNVUkwoKTtcbiAgICAgIHZhciBzZWN0aW9uQW5jaG9yID0gYW5jaG9ycy5zZWN0aW9uO1xuICAgICAgdmFyIHNsaWRlQW5jaG9yID0gYW5jaG9ycy5zbGlkZTtcblxuICAgICAgaWYgKHNlY3Rpb25BbmNob3IpIHtcbiAgICAgICAgLy9pZiB0aGVyZXMgYW55ICNcbiAgICAgICAgaWYgKGdldE9wdGlvbnMoKS5hbmltYXRlQW5jaG9yKSB7XG4gICAgICAgICAgc2Nyb2xsUGFnZUFuZFNsaWRlKHNlY3Rpb25BbmNob3IsIHNsaWRlQW5jaG9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzaWxlbnRNb3ZlVG8oc2VjdGlvbkFuY2hvciwgc2xpZGVBbmNob3IpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBFdmVudEVtaXR0ZXIuZW1pdChldmVudHMub25BZnRlclJlbmRlck5vQW5jaG9yLCBudWxsKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKlxuICAgICogUmVtb3ZlcyBpbmxpbmUgc3R5bGVzIGFkZGVkIGJ5IGZ1bGxwYWdlLmpzXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIGRlc3Ryb3lTdHJ1Y3R1cmUoKSB7XG4gICAgICAvL3Jlc2V0aW5nIHRoZSBgdG9wYCBvciBgdHJhbnNsYXRlYCBwcm9wZXJ0aWVzIHRvIDBcbiAgICAgIHNpbGVudFNjcm9sbCgwKTsgLy9sb2FkaW5nIGFsbCB0aGUgbGF6eSBsb2FkIGNvbnRlbnRcblxuICAgICAgJCgnaW1nW2RhdGEtc3JjXSwgc291cmNlW2RhdGEtc3JjXSwgYXVkaW9bZGF0YS1zcmNdLCBpZnJhbWVbZGF0YS1zcmNdJywgZ2V0Q29udGFpbmVyKCkpLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgc2V0U3JjKGl0ZW0sICdzcmMnKTtcbiAgICAgIH0pO1xuICAgICAgJCgnaW1nW2RhdGEtc3Jjc2V0XScpLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgc2V0U3JjKGl0ZW0sICdzcmNzZXQnKTtcbiAgICAgIH0pO1xuICAgICAgcmVtb3ZlKCQoU0VDVElPTl9OQVZfU0VMICsgJywgJyArIFNMSURFU19OQVZfU0VMICsgJywgJyArIFNMSURFU19BUlJPV19TRUwpKTsgLy9yZW1vdmluZyBpbmxpbmUgc3R5bGVzXG5cbiAgICAgIGNzcyhnZXROb2RlcyhnZXRTdGF0ZSgpLnNlY3Rpb25zKSwge1xuICAgICAgICAnaGVpZ2h0JzogJycsXG4gICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogJycsXG4gICAgICAgICdwYWRkaW5nJzogJydcbiAgICAgIH0pO1xuICAgICAgY3NzKGdldE5vZGVzKGdldFN0YXRlKCkuc2xpZGVzKSwge1xuICAgICAgICAnd2lkdGgnOiAnJ1xuICAgICAgfSk7XG4gICAgICBjc3MoZ2V0Q29udGFpbmVyKCksIHtcbiAgICAgICAgJ2hlaWdodCc6ICcnLFxuICAgICAgICAncG9zaXRpb24nOiAnJyxcbiAgICAgICAgJy1tcy10b3VjaC1hY3Rpb24nOiAnJyxcbiAgICAgICAgJ3RvdWNoLWFjdGlvbic6ICcnXG4gICAgICB9KTtcbiAgICAgIGNzcygkaHRtbEJvZHksIHtcbiAgICAgICAgJ292ZXJmbG93JzogJycsXG4gICAgICAgICdoZWlnaHQnOiAnJ1xuICAgICAgfSk7IC8vIHJlbW92ZSAuZnAtZW5hYmxlZCBjbGFzc1xuXG4gICAgICByZW1vdmVDbGFzcygkaHRtbCwgRU5BQkxFRCk7IC8vIHJlbW92ZSAuZnAtcmVzcG9uc2l2ZSBjbGFzc1xuXG4gICAgICByZW1vdmVDbGFzcygkYm9keSwgUkVTUE9OU0lWRSk7IC8vIHJlbW92ZSBhbGwgb2YgdGhlIC5mcC12aWV3aW5nLSBjbGFzc2VzXG5cbiAgICAgICRib2R5LmNsYXNzTmFtZS5zcGxpdCgvXFxzKy8pLmZvckVhY2goZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xuICAgICAgICBpZiAoY2xhc3NOYW1lLmluZGV4T2YoVklFV0lOR19QUkVGSVgpID09PSAwKSB7XG4gICAgICAgICAgcmVtb3ZlQ2xhc3MoJGJvZHksIGNsYXNzTmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH0pOyAvL3JlbW92aW5nIGFkZGVkIGNsYXNzZXNcblxuICAgICAgZ2V0Tm9kZXMoZ2V0U3RhdGUoKS5wYW5lbHMpLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgaWYgKGdldE9wdGlvbnMoKS5zY3JvbGxPdmVyZmxvdykge1xuICAgICAgICAgIHNjcm9sbE92ZXJmbG93SGFuZGxlci5kZXN0cm95V3JhcHBlcihpdGVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZUNsYXNzKGl0ZW0sIFRBQkxFICsgJyAnICsgQUNUSVZFICsgJyAnICsgQ09NUExFVEVMWSk7XG4gICAgICAgIHZhciBwcmV2aW91c1N0eWxlcyA9IGdldEF0dHIoaXRlbSwgJ2RhdGEtZnAtc3R5bGVzJyk7XG5cbiAgICAgICAgaWYgKHByZXZpb3VzU3R5bGVzKSB7XG4gICAgICAgICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgZ2V0QXR0cihpdGVtLCAnZGF0YS1mcC1zdHlsZXMnKSk7XG4gICAgICAgIH0gLy9yZW1vdmluZyBhbmNob3JzIGlmIHRoZXkgd2VyZSBub3Qgc2V0IHVzaW5nIHRoZSBIVE1MIG1hcmt1cFxuXG5cbiAgICAgICAgaWYgKGhhc0NsYXNzKGl0ZW0sIFNFQ1RJT04pICYmICFnZXRJbml0aWFsQW5jaG9yc0luRG9tKCkpIHtcbiAgICAgICAgICBpdGVtLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1hbmNob3InKTtcbiAgICAgICAgfVxuICAgICAgfSk7IC8vcmVtb3ZpbmcgdGhlIGFwcGxpZWQgdHJhbnNpdGlvbiBmcm9tIHRoZSBmdWxscGFnZSB3cmFwcGVyXG5cbiAgICAgIHJlbW92ZUFuaW1hdGlvbihnZXRDb250YWluZXIoKSk7IC8vVW53cmFwcGluZyBjb250ZW50XG5cbiAgICAgIFtUQUJMRV9DRUxMX1NFTCwgU0xJREVTX0NPTlRBSU5FUl9TRUwsIFNMSURFU19XUkFQUEVSX1NFTF0uZm9yRWFjaChmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgJChzZWxlY3RvciwgZ2V0Q29udGFpbmVyKCkpLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAvL3Vud3JhcCBub3QgYmVpbmcgdXNlIGluIGNhc2UgdGhlcmUncyBubyBjaGlsZCBlbGVtZW50IGluc2lkZSBhbmQgaXRzIGp1c3QgdGV4dFxuICAgICAgICAgIHVud3JhcChpdGVtKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTsgLy9yZW1vdmluZyB0aGUgYXBwbGllZCB0cmFuc2l0aW9uIGZyb20gdGhlIGZ1bGxwYWdlIHdyYXBwZXJcblxuICAgICAgY3NzKGdldENvbnRhaW5lcigpLCB7XG4gICAgICAgICctd2Via2l0LXRyYW5zaXRpb24nOiAnbm9uZScsXG4gICAgICAgICd0cmFuc2l0aW9uJzogJ25vbmUnXG4gICAgICB9KTsgLy9zY3JvbGxpbmcgdGhlIHBhZ2UgdG8gdGhlIHRvcCB3aXRoIG5vIGFuaW1hdGlvblxuXG4gICAgICB3aW4uc2Nyb2xsVG8oMCwgMCk7IC8vcmVtb3Zpbmcgc2VsZWN0b3JzXG5cbiAgICAgIHZhciB1c2VkU2VsZWN0b3JzID0gW1NFQ1RJT04sIFNMSURFLCBTTElERVNfQ09OVEFJTkVSXTtcbiAgICAgIHVzZWRTZWxlY3RvcnMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICByZW1vdmVDbGFzcygkKCcuJyArIGl0ZW0pLCBpdGVtKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIEZQLmRlc3Ryb3kgPSBkZXN0cm95O1xuICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICB1cGRhdGVTdHJ1Y3R1cmFsU3RhdGUoKTtcbiAgICAgIHVwZGF0ZVN0YXRlKCk7XG4gICAgICBnZXRPcHRpb25zKCkuc2Nyb2xsQmFyID0gZ2V0T3B0aW9ucygpLnNjcm9sbEJhciB8fCBnZXRPcHRpb25zKCkuaHlicmlkO1xuICAgICAgc2V0T3B0aW9uc0Zyb21ET00oKTtcbiAgICAgIHByZXBhcmVEb20oKTtcbiAgICAgIHNldEFsbG93U2Nyb2xsaW5nKHRydWUpO1xuICAgICAgc2V0TW91c2VIaWphY2sodHJ1ZSk7XG4gICAgICBzZXRBdXRvU2Nyb2xsaW5nKGdldE9wdGlvbnMoKS5hdXRvU2Nyb2xsaW5nLCAnaW50ZXJuYWwnKTtcbiAgICAgIHJlc3BvbnNpdmUoKTsgLy9zZXR0aW5nIHRoZSBjbGFzcyBmb3IgdGhlIGJvZHkgZWxlbWVudFxuXG4gICAgICBzZXRCb2R5Q2xhc3MoKTtcblxuICAgICAgaWYgKGRvYy5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKSB7XG4gICAgICAgIHNjcm9sbFRvQW5jaG9yKCk7XG4gICAgICB9XG5cbiAgICAgIHdpbmRvd0FkZEV2ZW50KCdsb2FkJywgc2Nyb2xsVG9BbmNob3IpO1xuICAgICAgYWZ0ZXJSZW5kZXJBY3Rpb25zKCk7IC8vIFVwZGF0aW5nIHRoZSBzdGF0ZSBhZ2FpbiB3aXRoIHRoZSBuZXcgRE9NXG5cbiAgICAgIHVwZGF0ZVN0cnVjdHVyYWxTdGF0ZSgpO1xuICAgICAgdXBkYXRlU3RhdGUoKTtcbiAgICB9XG4gICAgLypcbiAgICAqIERlc3Ryb3lzIGZ1bGxwYWdlLmpzIHBsdWdpbiBldmVudHMgYW5kIG9wdGluYWxseSBpdHMgaHRtbCBtYXJrdXAgYW5kIHN0eWxlc1xuICAgICovXG5cbiAgICBmdW5jdGlvbiBkZXN0cm95KGFsbCkge1xuICAgICAgc2V0QXV0b1Njcm9sbGluZyhmYWxzZSwgJ2ludGVybmFsJyk7XG4gICAgICBzZXRBbGxvd1Njcm9sbGluZyh0cnVlKTtcbiAgICAgIHNldE1vdXNlSGlqYWNrKGZhbHNlKTtcbiAgICAgIHNldEtleWJvYXJkU2Nyb2xsaW5nKGZhbHNlKTtcbiAgICAgIGFkZENsYXNzKGdldENvbnRhaW5lcigpLCBERVNUUk9ZRUQpO1xuICAgICAgRXZlbnRFbWl0dGVyLmVtaXQoZXZlbnRzLm9uRGVzdHJveSk7IC8vbGV0cyBtYWtlIGEgbWVzcyFcblxuICAgICAgaWYgKGFsbCkge1xuICAgICAgICBkZXN0cm95U3RydWN0dXJlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGlzT0sgPSBmdW5jdGlvbiBpc09LKCkge1xuICAgICAgcmV0dXJuIGdldE9wdGlvbnMoKSAmJiBzdGF0ZS5pc1ZhbGlkIHx8IGRvYy5kb21haW4uaW5kZXhPZignYWwnICsgJ3Zhcm90cmknICsgJ2dvJyArICcuJyArICdjb20nKSA+IC0xO1xuICAgIH07XG4gICAgLyoqXG4gICAgKiBEaXNwbGF5cyB3YXJuaW5nc1xuICAgICovXG5cblxuICAgIGZ1bmN0aW9uIGRpc3BsYXlXYXJuaW5ncygpIHtcbiAgICAgIHZhciBsID0gZ2V0T3B0aW9ucygpWydsaScgKyAnYycgKyAnZW5zZUsnICsgJ2UnICsgJ3knXTtcbiAgICAgIHZhciBtc2dTdHlsZSA9ICdmb250LXNpemU6IDE1cHg7YmFja2dyb3VuZDp5ZWxsb3c7JztcblxuICAgICAgaWYgKGdldE9wdGlvbnMoKS5saWNlbnNlS2V5LnRyaW0oKSA9PT0gJycpIHtcbiAgICAgICAgc2hvd0Vycm9yKCdlcnJvcicsICdGdWxscGFnZS5qcyByZXF1aXJlcyBhIGBsaWNlbnNlS2V5YCBvcHRpb24uIFJlYWQgYWJvdXQgaXQgb24gdGhlIGZvbGxvd2luZyBVUkw6Jyk7XG4gICAgICAgIHNob3dFcnJvcignZXJyb3InLCAnaHR0cHM6Ly9naXRodWIuY29tL2FsdmFyb3RyaWdvL2Z1bGxQYWdlLmpzI29wdGlvbnMnKTtcbiAgICAgIH0gZWxzZSBpZiAoIWlzT0soKSkge1xuICAgICAgICBzaG93RXJyb3IoJ2Vycm9yJywgJ0luY29ycmVjdCBgbGljZW5zZUtleWAuIEdldCBvbmUgZm9yIGZ1bGxQYWdlLmpzIHZlcnNpb24gNCBoZXJlOicpO1xuICAgICAgICBzaG93RXJyb3IoJ2Vycm9yJywgJ2h0dHBzOi8vYWx2YXJvdHJpZ28uY29tL2Z1bGxQYWdlL3ByaWNpbmcnKTtcbiAgICAgIH0gZWxzZSBpZiAobCAmJiBsLmxlbmd0aCA8IDIwKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignJWMgVGhpcyB3ZWJzaXRlIHdhcyBtYWRlIHVzaW5nIGZ1bGxQYWdlLmpzIHNsaWRlci4gTW9yZSBpbmZvIG9uIHRoZSBmb2xsb3dpbmcgd2Vic2l0ZTonLCBtc2dTdHlsZSk7XG4gICAgICAgIGNvbnNvbGUud2FybignJWMgaHR0cHM6Ly9hbHZhcm90cmlnby5jb20vZnVsbFBhZ2UvJywgbXNnU3R5bGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaGFzQ2xhc3MoJGh0bWwsIEVOQUJMRUQpKSB7XG4gICAgICAgIHNob3dFcnJvcignZXJyb3InLCAnRnVsbHBhZ2UuanMgY2FuIG9ubHkgYmUgaW5pdGlhbGl6ZWQgb25jZSBhbmQgeW91IGFyZSBkb2luZyBpdCBtdWx0aXBsZSB0aW1lcyEnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSAvLyBEaXNhYmxlIG11dHVhbGx5IGV4Y2x1c2l2ZSBzZXR0aW5nc1xuXG5cbiAgICAgIGlmIChnZXRPcHRpb25zKCkuY29udGludW91c1ZlcnRpY2FsICYmIChnZXRPcHRpb25zKCkubG9vcFRvcCB8fCBnZXRPcHRpb25zKCkubG9vcEJvdHRvbSkpIHtcbiAgICAgICAgZ2V0T3B0aW9ucygpLmNvbnRpbnVvdXNWZXJ0aWNhbCA9IGZhbHNlO1xuICAgICAgICBzaG93RXJyb3IoJ3dhcm4nLCAnT3B0aW9uIGBsb29wVG9wL2xvb3BCb3R0b21gIGlzIG11dHVhbGx5IGV4Y2x1c2l2ZSB3aXRoIGBjb250aW51b3VzVmVydGljYWxgOyBgY29udGludW91c1ZlcnRpY2FsYCBkaXNhYmxlZCcpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZ2V0T3B0aW9ucygpLnNjcm9sbE92ZXJmbG93ICYmIChnZXRPcHRpb25zKCkuc2Nyb2xsQmFyIHx8ICFnZXRPcHRpb25zKCkuYXV0b1Njcm9sbGluZykpIHtcbiAgICAgICAgc2hvd0Vycm9yKCd3YXJuJywgJ09wdGlvbnMgc2Nyb2xsQmFyOnRydWUgYW5kIGF1dG9TY3JvbGxpbmc6ZmFsc2UgYXJlIG11dHVhbGx5IGV4Y2x1c2l2ZSB3aXRoIHNjcm9sbE92ZXJmbG93OnRydWUuIFNlY3Rpb25zIHdpdGggc2Nyb2xsT3ZlcmZsb3cgbWlnaHQgbm90IHdvcmsgd2VsbCBpbiBGaXJlZm94Jyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChnZXRPcHRpb25zKCkuY29udGludW91c1ZlcnRpY2FsICYmIChnZXRPcHRpb25zKCkuc2Nyb2xsQmFyIHx8ICFnZXRPcHRpb25zKCkuYXV0b1Njcm9sbGluZykpIHtcbiAgICAgICAgZ2V0T3B0aW9ucygpLmNvbnRpbnVvdXNWZXJ0aWNhbCA9IGZhbHNlO1xuICAgICAgICBzaG93RXJyb3IoJ3dhcm4nLCAnU2Nyb2xsIGJhcnMgKGBzY3JvbGxCYXI6dHJ1ZWAgb3IgYGF1dG9TY3JvbGxpbmc6ZmFsc2VgKSBhcmUgbXV0dWFsbHkgZXhjbHVzaXZlIHdpdGggYGNvbnRpbnVvdXNWZXJ0aWNhbGA7IGBjb250aW51b3VzVmVydGljYWxgIGRpc2FibGVkJyk7XG4gICAgICB9IC8vdXNpbmcgZXh0ZW5zaW9ucz8gV3JvbmcgZmlsZSFcblxuXG4gICAgICBleHRlbnNpb25zLmZvckVhY2goZnVuY3Rpb24gKGV4dGVuc2lvbikge1xuICAgICAgICAvL2lzIHRoZSBvcHRpb24gc2V0IHRvIHRydWU/XG4gICAgICAgIGlmIChnZXRPcHRpb25zKClbZXh0ZW5zaW9uXSkge1xuICAgICAgICAgIHNob3dFcnJvcignd2FybicsICdmdWxscGFnZS5qcyBleHRlbnNpb25zIHJlcXVpcmUgZnVsbHBhZ2UuZXh0ZW5zaW9ucy5taW4uanMgZmlsZSBpbnN0ZWFkIG9mIHRoZSB1c3VhbCBmdWxscGFnZS5qcy4gUmVxdWVzdGVkOiAnICsgZXh0ZW5zaW9uKTtcbiAgICAgICAgfVxuICAgICAgfSk7IC8vYW5jaG9ycyBjYW4gbm90IGhhdmUgdGhlIHNhbWUgdmFsdWUgYXMgYW55IGVsZW1lbnQgSUQgb3IgTkFNRVxuXG4gICAgICBnZXRPcHRpb25zKCkuYW5jaG9ycy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIC8vY2FzZSBpbnNlbnNpdGl2ZSBzZWxlY3RvcnMgKGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzE5NDY1MTg3LzEwODEzOTYpXG4gICAgICAgIHZhciBuYW1lQXR0ciA9IFtdLnNsaWNlLmNhbGwoJCgnW25hbWVdJykpLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgIHJldHVybiBnZXRBdHRyKGl0ZW0sICduYW1lJykgJiYgZ2V0QXR0cihpdGVtLCAnbmFtZScpLnRvTG93ZXJDYXNlKCkgPT0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIGlkQXR0ciA9IFtdLnNsaWNlLmNhbGwoJCgnW2lkXScpKS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICByZXR1cm4gZ2V0QXR0cihpdGVtLCAnaWQnKSAmJiBnZXRBdHRyKGl0ZW0sICdpZCcpLnRvTG93ZXJDYXNlKCkgPT0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoaWRBdHRyLmxlbmd0aCB8fCBuYW1lQXR0ci5sZW5ndGgpIHtcbiAgICAgICAgICBzaG93RXJyb3IoJ2Vycm9yJywgJ2RhdGEtYW5jaG9yIHRhZ3MgY2FuIG5vdCBoYXZlIHRoZSBzYW1lIHZhbHVlIGFzIGFueSBgaWRgIGVsZW1lbnQgb24gdGhlIHNpdGUgKG9yIGBuYW1lYCBlbGVtZW50IGZvciBJRSkuJyk7XG4gICAgICAgICAgdmFyIHByb3BlcnR5TmFtZSA9IGlkQXR0ci5sZW5ndGggPyAnaWQnIDogJ25hbWUnO1xuXG4gICAgICAgICAgaWYgKGlkQXR0ci5sZW5ndGggfHwgbmFtZUF0dHIubGVuZ3RoKSB7XG4gICAgICAgICAgICBzaG93RXJyb3IoJ2Vycm9yJywgJ1wiJyArIG5hbWUgKyAnXCIgaXMgaXMgYmVpbmcgdXNlZCBieSBhbm90aGVyIGVsZW1lbnQgYCcgKyBwcm9wZXJ0eU5hbWUgKyAnYCBwcm9wZXJ0eScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZnVsbHBhZ2UoY29udGFpbmVyU2VsZWN0b3IsIG9wdGlvbnMpIHtcbiAgICAgIHNldENhY2hlKCk7IC8vb25seSBvbmNlIG15IGZyaWVuZCFcblxuICAgICAgaWYgKGhhc0NsYXNzKCRodG1sLCBFTkFCTEVEKSkge1xuICAgICAgICBkaXNwbGF5V2FybmluZ3MoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzZXRPcHRpb24oJ3RvdWNoV3JhcHBlcicsIHR5cGVvZiBjb250YWluZXJTZWxlY3RvciA9PT0gJ3N0cmluZycgPyAkKGNvbnRhaW5lclNlbGVjdG9yKVswXSA6IGNvbnRhaW5lclNlbGVjdG9yKTsgLy8gQ3JlYXRpbmcgc29tZSBkZWZhdWx0cywgZXh0ZW5kaW5nIHRoZW0gd2l0aCBhbnkgb3B0aW9ucyB0aGF0IHdlcmUgcHJvdmlkZWRcblxuICAgICAgc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICAgIHNldENvbnRhaW5lcih0eXBlb2YgY29udGFpbmVyU2VsZWN0b3IgPT09ICdzdHJpbmcnID8gJChjb250YWluZXJTZWxlY3RvcilbMF0gOiBjb250YWluZXJTZWxlY3Rvcik7XG4gICAgICBFdmVudEVtaXR0ZXIuZW1pdChldmVudHMub25Jbml0aWFsaXNlKTtcbiAgICAgIGRpc3BsYXlXYXJuaW5ncygpO1xuICAgICAgc2V0QVBJKCk7XG5cbiAgICAgIGlmIChnZXRDb250YWluZXIoKSkge1xuICAgICAgICBFdmVudEVtaXR0ZXIuZW1pdChldmVudHMuYmVmb3JlSW5pdCk7XG4gICAgICAgIGluaXQoKTtcbiAgICAgICAgRXZlbnRFbWl0dGVyLmVtaXQoZXZlbnRzLmJpbmRFdmVudHMpO1xuICAgICAgfSAvLyBAdHMtaWdub3JlXG5cblxuICAgICAgcmV0dXJuIHdpbi5mdWxscGFnZV9hcGk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0QVBJKCkge1xuICAgICAgRlAuZ2V0RnVsbHBhZ2VEYXRhID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG9wdGlvbnM6IGdldE9wdGlvbnMoKVxuICAgICAgICB9O1xuICAgICAgfTsgLy9wdWJsaWMgZnVuY3Rpb25zXG5cblxuICAgICAgRlAudmVyc2lvbiA9ICc0LjAuMTInO1xuICAgICAgRlAudGVzdCA9IE9iamVjdC5hc3NpZ24oRlAudGVzdCwge1xuICAgICAgICB0b3A6ICcwcHgnLFxuICAgICAgICB0cmFuc2xhdGUzZDogJ3RyYW5zbGF0ZTNkKDBweCwgMHB4LCAwcHgpJyxcbiAgICAgICAgdHJhbnNsYXRlM2RIOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIGEgPSBbXTtcblxuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgJChnZXRPcHRpb25zKCkuc2VjdGlvblNlbGVjdG9yLCBnZXRDb250YWluZXIoKSkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGEucHVzaCgndHJhbnNsYXRlM2QoMHB4LCAwcHgsIDBweCknKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gYTtcbiAgICAgICAgfSgpLFxuICAgICAgICBsZWZ0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIGEgPSBbXTtcblxuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgJChnZXRPcHRpb25zKCkuc2VjdGlvblNlbGVjdG9yLCBnZXRDb250YWluZXIoKSkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGEucHVzaCgwKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gYTtcbiAgICAgICAgfSgpLFxuICAgICAgICBvcHRpb25zOiBnZXRPcHRpb25zKCksXG4gICAgICAgIHNldEF1dG9TY3JvbGxpbmc6IG51bGxcbiAgICAgIH0pOyAvL2Z1bmN0aW9ucyB3ZSB3YW50IHRvIHNoYXJlIGFjcm9zcyBmaWxlcyBidXQgd2hpY2ggYXJlIG5vdFxuICAgICAgLy9tZWFuIHRvIGJlIHVzZWQgb24gdGhlaXIgb3duIGJ5IGRldmVsb3BlcnNcblxuICAgICAgRlAuc2hhcmVkID0gT2JqZWN0LmFzc2lnbihGUC5zaGFyZWQsIHtcbiAgICAgICAgYWZ0ZXJSZW5kZXJBY3Rpb25zOiBudWxsLFxuICAgICAgICBpc05vcm1hbFNjcm9sbEVsZW1lbnQ6IGZhbHNlXG4gICAgICB9KTsgLy8gQHRzLWlnbm9yZVxuXG4gICAgICB3aW4uZnVsbHBhZ2VfYXBpID0gRlA7XG4gICAgfVxuXG4gICAgLy8gQHRzLWlnbm9yZVxuXG4gICAgd2luLmZwX2Vhc2luZ3MgPSBkZWVwRXh0ZW5kKHdpbi5mcF9lYXNpbmdzLCB7XG4gICAgICBlYXNlSW5PdXRDdWJpYzogZnVuY3Rpb24gZWFzZUluT3V0Q3ViaWModCwgYiwgYywgZCkge1xuICAgICAgICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkgcmV0dXJuIGMgLyAyICogdCAqIHQgKiB0ICsgYjtcbiAgICAgICAgcmV0dXJuIGMgLyAyICogKCh0IC09IDIpICogdCAqIHQgKyAyKSArIGI7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBqUXVlcnkgYWRhcHRlciBmb3IgZnVsbFBhZ2UuanMgMy4wLjBcbiAgICAgKi9cbiAgICAvLyBAdHMtaWdub3JlXG5cbiAgICBpZiAod2luLmpRdWVyeSkge1xuICAgICAgKGZ1bmN0aW9uICgkLCBmdWxscGFnZSkge1xuXG4gICAgICAgIGlmICghJCB8fCAhZnVsbHBhZ2UpIHtcbiAgICAgICAgICBzaG93RXJyb3IoJ2Vycm9yJywgJ2pRdWVyeSBpcyByZXF1aXJlZCB0byB1c2UgdGhlIGpRdWVyeSBmdWxscGFnZSBhZGFwdGVyIScpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgICQuZm4uZnVsbHBhZ2UgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgIG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgb3B0aW9ucywge1xuICAgICAgICAgICAgJyQnOiAkXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgbmV3IGZ1bGxwYWdlKHRoaXNbMF0sIG9wdGlvbnMpOyAvLyBDcmVhdGluZyB0aGUgJC5mbi5mdWxscGFnZSBvYmplY3RcblxuICAgICAgICAgIE9iamVjdC5rZXlzKEZQKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIGdldE9wdGlvbnMoKS4kLmZuLmZ1bGxwYWdlW2tleV0gPSBGUFtrZXldO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9OyAvLyBAdHMtaWdub3JlXG5cbiAgICAgIH0pKHdpbi5qUXVlcnksIGZ1bGxwYWdlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVsbHBhZ2U7XG5cbn0pKTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgZnVsbHBhZ2UgZnJvbSAnZnVsbHBhZ2UuanMnO1xyXG5cclxudmFyIGZ1bGxQYWdlSW5zdGFuY2U6IGZ1bGxwYWdlID0gbmV3IGZ1bGxwYWdlKCcjbXlGdWxscGFnZScsIHtcclxuICAgIG5hdmlnYXRpb246IHRydWUsXHJcbiAgICBzZWN0aW9uc0NvbG9yOiBbJyNmZjVmNDUnLCAnIzA3OThlYycsICcjZmM2YzdjJywgJ2dyZXknXVxyXG59KTtcclxuXHJcblxyXG5jb25zb2xlLmxvZyhcIkhlbGxvLCB3b3JsZCFcIik7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9