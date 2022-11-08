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
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var fullpage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fullpage.js */ "./node_modules/fullpage.js/dist/fullpage.js");
/* harmony import */ var fullpage_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fullpage_js__WEBPACK_IMPORTED_MODULE_0__);
// import 'fullpage.js';
console.log("Hello, world!");



var fullPageInstance = new (fullpage_js__WEBPACK_IMPORTED_MODULE_0___default())('#myFullpage', {
    navigation: true,
    sectionsColor: ['#ff5f45', '#0798ec', '#fc6c7c', 'grey']
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1COztBQUVuQjs7QUFFQSxzQkFBc0IseUJBQXlCO0FBQy9DO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFROztBQUVSO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FB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QUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxRQUFROzs7QUFHUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjs7QUFFbkI7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseUNBQXlDOztBQUV6QztBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBCQUEwQjs7QUFFMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyxHQUFHOztBQUVWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9COztBQUVwQjtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FB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O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNOzs7QUFHTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5RUFBeUU7O0FBRXpFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RDs7QUFFN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdGQUFnRjs7QUFFaEYsdURBQXVEOztBQUV2RDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DOztBQUVuQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxVQUFVOzs7QUFHVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxR0FBcUc7QUFDckc7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDs7O0FBR0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTyxPQUFPOztBQUVkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxzRkFBc0Y7O0FBRXRGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUTs7QUFFUjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtEQUFrRDs7QUFFbEQ7QUFDQTtBQUNBLHNEQUFzRDs7QUFFdEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCx1REFBdUQ7QUFDdkQ7O0FBRUE7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUI7O0FBRXZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsUUFBUTs7QUFFUjtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQ7O0FBRWpEO0FBQ0E7QUFDQSxZQUFZOzs7QUFHWiw2Q0FBNkM7OztBQUc3QztBQUNBLCtCQUErQjtBQUMvQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0RBQWtEOztBQUVsRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0RBQWtEOztBQUVsRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7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QXFCO0FBQzNDO0FBQ0E7QUFDQSxxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7O0FBRXpDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNkRBQTZEOztBQUU3RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5Qzs7QUFFekM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7O0FBR047QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtB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QWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ21DO0FBQ25DO0FBQ0EsMkJBQTJCLG9EQUFRO0FBQ25DO0FBQ0E7QUFDQSxDQUFDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90YXNrNS8uL25vZGVfbW9kdWxlcy9mdWxscGFnZS5qcy9kaXN0L2Z1bGxwYWdlLmpzIiwid2VicGFjazovL3Rhc2s1L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Rhc2s1L3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3Rhc2s1L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90YXNrNS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Rhc2s1L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdGFzazUvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohXG4qIGZ1bGxQYWdlIDQuMC4xMlxuKiBodHRwczovL2dpdGh1Yi5jb20vYWx2YXJvdHJpZ28vZnVsbFBhZ2UuanNcbipcbiogQGxpY2Vuc2UgR1BMdjMgZm9yIG9wZW4gc291cmNlIHVzZSBvbmx5XG4qIG9yIEZ1bGxwYWdlIENvbW1lcmNpYWwgTGljZW5zZSBmb3IgY29tbWVyY2lhbCB1c2VcbiogaHR0cDovL2FsdmFyb3RyaWdvLmNvbS9mdWxsUGFnZS9wcmljaW5nL1xuKlxuKiBDb3B5cmlnaHQgKEMpIDIwMTggaHR0cDovL2FsdmFyb3RyaWdvLmNvbS9mdWxsUGFnZSAtIEEgcHJvamVjdCBieSBBbHZhcm8gVHJpZ29cbiovXG5cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gICAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuICAgIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG4gICAgKGdsb2JhbCA9IHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbFRoaXMgOiBnbG9iYWwgfHwgc2VsZiwgZ2xvYmFsLmZ1bGxwYWdlID0gZmFjdG9yeSgpKTtcbn0pKHRoaXMsIChmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxuICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5maW5kXG4gICAgaWYgKCFBcnJheS5wcm90b3R5cGUuZmluZCkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFycmF5LnByb3RvdHlwZSwgJ2ZpbmQnLCB7XG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShwcmVkaWNhdGUpIHtcbiAgICAgICAgICAvLyAxLiBMZXQgTyBiZSA/IFRvT2JqZWN0KHRoaXMgdmFsdWUpLlxuICAgICAgICAgIGlmICh0aGlzID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1widGhpc1wiIGlzIG51bGwgb3Igbm90IGRlZmluZWQnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgbyA9IE9iamVjdCh0aGlzKTsgLy8gMi4gTGV0IGxlbiBiZSA/IFRvTGVuZ3RoKD8gR2V0KE8sIFwibGVuZ3RoXCIpKS5cblxuICAgICAgICAgIHZhciBsZW4gPSBvLmxlbmd0aCA+Pj4gMDsgLy8gMy4gSWYgSXNDYWxsYWJsZShwcmVkaWNhdGUpIGlzIGZhbHNlLCB0aHJvdyBhIFR5cGVFcnJvciBleGNlcHRpb24uXG5cbiAgICAgICAgICBpZiAodHlwZW9mIHByZWRpY2F0ZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncHJlZGljYXRlIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICAgICAgICAgIH0gLy8gNC4gSWYgdGhpc0FyZyB3YXMgc3VwcGxpZWQsIGxldCBUIGJlIHRoaXNBcmc7IGVsc2UgbGV0IFQgYmUgdW5kZWZpbmVkLlxuXG5cbiAgICAgICAgICB2YXIgdGhpc0FyZyA9IGFyZ3VtZW50c1sxXTsgLy8gNS4gTGV0IGsgYmUgMC5cblxuICAgICAgICAgIHZhciBrID0gMDsgLy8gNi4gUmVwZWF0LCB3aGlsZSBrIDwgbGVuXG5cbiAgICAgICAgICB3aGlsZSAoayA8IGxlbikge1xuICAgICAgICAgICAgLy8gYS4gTGV0IFBrIGJlICEgVG9TdHJpbmcoaykuXG4gICAgICAgICAgICAvLyBiLiBMZXQga1ZhbHVlIGJlID8gR2V0KE8sIFBrKS5cbiAgICAgICAgICAgIC8vIGMuIExldCB0ZXN0UmVzdWx0IGJlIFRvQm9vbGVhbig/IENhbGwocHJlZGljYXRlLCBULCDCqyBrVmFsdWUsIGssIE8gwrspKS5cbiAgICAgICAgICAgIC8vIGQuIElmIHRlc3RSZXN1bHQgaXMgdHJ1ZSwgcmV0dXJuIGtWYWx1ZS5cbiAgICAgICAgICAgIHZhciBrVmFsdWUgPSBvW2tdO1xuXG4gICAgICAgICAgICBpZiAocHJlZGljYXRlLmNhbGwodGhpc0FyZywga1ZhbHVlLCBrLCBvKSkge1xuICAgICAgICAgICAgICByZXR1cm4ga1ZhbHVlO1xuICAgICAgICAgICAgfSAvLyBlLiBJbmNyZWFzZSBrIGJ5IDEuXG5cblxuICAgICAgICAgICAgaysrO1xuICAgICAgICAgIH0gLy8gNy4gUmV0dXJuIHVuZGVmaW5lZC5cblxuXG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gUHJvZHVjdGlvbiBzdGVwcyBvZiBFQ01BLTI2MiwgRWRpdGlvbiA2LCAyMi4xLjIuMVxuICAgIGlmICghQXJyYXkuZnJvbSkge1xuICAgICAgQXJyYXkuZnJvbSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuICAgICAgICB2YXIgaXNDYWxsYWJsZSA9IGZ1bmN0aW9uIGlzQ2FsbGFibGUoZm4pIHtcbiAgICAgICAgICByZXR1cm4gdHlwZW9mIGZuID09PSAnZnVuY3Rpb24nIHx8IHRvU3RyLmNhbGwoZm4pID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciB0b0ludGVnZXIgPSBmdW5jdGlvbiB0b0ludGVnZXIodmFsdWUpIHtcbiAgICAgICAgICB2YXIgbnVtYmVyID0gTnVtYmVyKHZhbHVlKTtcblxuICAgICAgICAgIGlmIChpc05hTihudW1iZXIpKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAobnVtYmVyID09PSAwIHx8ICFpc0Zpbml0ZShudW1iZXIpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVtYmVyO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiAobnVtYmVyID4gMCA/IDEgOiAtMSkgKiBNYXRoLmZsb29yKE1hdGguYWJzKG51bWJlcikpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBtYXhTYWZlSW50ZWdlciA9IE1hdGgucG93KDIsIDUzKSAtIDE7XG5cbiAgICAgICAgdmFyIHRvTGVuZ3RoID0gZnVuY3Rpb24gdG9MZW5ndGgodmFsdWUpIHtcbiAgICAgICAgICB2YXIgbGVuID0gdG9JbnRlZ2VyKHZhbHVlKTtcbiAgICAgICAgICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgobGVuLCAwKSwgbWF4U2FmZUludGVnZXIpO1xuICAgICAgICB9OyAvLyBUaGUgbGVuZ3RoIHByb3BlcnR5IG9mIHRoZSBmcm9tIG1ldGhvZCBpcyAxLlxuXG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGZyb20oYXJyYXlMaWtlXG4gICAgICAgIC8qLCBtYXBGbiwgdGhpc0FyZyAqL1xuICAgICAgICApIHtcbiAgICAgICAgICAvLyAxLiBMZXQgQyBiZSB0aGUgdGhpcyB2YWx1ZS5cbiAgICAgICAgICB2YXIgQyA9IHRoaXM7IC8vIDIuIExldCBpdGVtcyBiZSBUb09iamVjdChhcnJheUxpa2UpLlxuXG4gICAgICAgICAgdmFyIGl0ZW1zID0gT2JqZWN0KGFycmF5TGlrZSk7IC8vIDMuIFJldHVybklmQWJydXB0KGl0ZW1zKS5cblxuICAgICAgICAgIGlmIChhcnJheUxpa2UgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJyYXkuZnJvbSByZXF1aXJlcyBhbiBhcnJheS1saWtlIG9iamVjdCAtIG5vdCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuICAgICAgICAgIH0gLy8gNC4gSWYgbWFwZm4gaXMgdW5kZWZpbmVkLCB0aGVuIGxldCBtYXBwaW5nIGJlIGZhbHNlLlxuXG5cbiAgICAgICAgICB2YXIgbWFwRm4gPSBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHZvaWQgdW5kZWZpbmVkO1xuICAgICAgICAgIHZhciBUO1xuXG4gICAgICAgICAgaWYgKHR5cGVvZiBtYXBGbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIC8vIDUuIGVsc2VcbiAgICAgICAgICAgIC8vIDUuIGEgSWYgSXNDYWxsYWJsZShtYXBmbikgaXMgZmFsc2UsIHRocm93IGEgVHlwZUVycm9yIGV4Y2VwdGlvbi5cbiAgICAgICAgICAgIGlmICghaXNDYWxsYWJsZShtYXBGbikpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJyYXkuZnJvbTogd2hlbiBwcm92aWRlZCwgdGhlIHNlY29uZCBhcmd1bWVudCBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgICAgICAgICAgIH0gLy8gNS4gYi4gSWYgdGhpc0FyZyB3YXMgc3VwcGxpZWQsIGxldCBUIGJlIHRoaXNBcmc7IGVsc2UgbGV0IFQgYmUgdW5kZWZpbmVkLlxuXG5cbiAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgICBUID0gYXJndW1lbnRzWzJdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gLy8gMTAuIExldCBsZW5WYWx1ZSBiZSBHZXQoaXRlbXMsIFwibGVuZ3RoXCIpLlxuICAgICAgICAgIC8vIDExLiBMZXQgbGVuIGJlIFRvTGVuZ3RoKGxlblZhbHVlKS5cblxuXG4gICAgICAgICAgdmFyIGxlbiA9IHRvTGVuZ3RoKGl0ZW1zLmxlbmd0aCk7IC8vIDEzLiBJZiBJc0NvbnN0cnVjdG9yKEMpIGlzIHRydWUsIHRoZW5cbiAgICAgICAgICAvLyAxMy4gYS4gTGV0IEEgYmUgdGhlIHJlc3VsdCBvZiBjYWxsaW5nIHRoZSBbW0NvbnN0cnVjdF1dIGludGVybmFsIG1ldGhvZFxuICAgICAgICAgIC8vIG9mIEMgd2l0aCBhbiBhcmd1bWVudCBsaXN0IGNvbnRhaW5pbmcgdGhlIHNpbmdsZSBpdGVtIGxlbi5cbiAgICAgICAgICAvLyAxNC4gYS4gRWxzZSwgTGV0IEEgYmUgQXJyYXlDcmVhdGUobGVuKS5cblxuICAgICAgICAgIHZhciBBID0gaXNDYWxsYWJsZShDKSA/IE9iamVjdChuZXcgQyhsZW4pKSA6IG5ldyBBcnJheShsZW4pOyAvLyAxNi4gTGV0IGsgYmUgMC5cblxuICAgICAgICAgIHZhciBrID0gMDsgLy8gMTcuIFJlcGVhdCwgd2hpbGUgayA8IGxlbuKApiAoYWxzbyBzdGVwcyBhIC0gaClcblxuICAgICAgICAgIHZhciBrVmFsdWU7XG5cbiAgICAgICAgICB3aGlsZSAoayA8IGxlbikge1xuICAgICAgICAgICAga1ZhbHVlID0gaXRlbXNba107XG5cbiAgICAgICAgICAgIGlmIChtYXBGbikge1xuICAgICAgICAgICAgICBBW2tdID0gdHlwZW9mIFQgPT09ICd1bmRlZmluZWQnID8gbWFwRm4oa1ZhbHVlLCBrKSA6IG1hcEZuLmNhbGwoVCwga1ZhbHVlLCBrKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIEFba10gPSBrVmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGsgKz0gMTtcbiAgICAgICAgICB9IC8vIDE4LiBMZXQgcHV0U3RhdHVzIGJlIFB1dChBLCBcImxlbmd0aFwiLCBsZW4sIHRydWUpLlxuXG5cbiAgICAgICAgICBBLmxlbmd0aCA9IGxlbjsgLy8gMjAuIFJldHVybiBBLlxuXG4gICAgICAgICAgcmV0dXJuIEE7XG4gICAgICAgIH07XG4gICAgICB9KCk7XG4gICAgfVxuXG4gICAgdmFyIHdpbiA9IHdpbmRvdztcbiAgICB2YXIgZG9jID0gZG9jdW1lbnQ7XG4gICAgdmFyIGlzVG91Y2hEZXZpY2UgPSBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC8oaVBob25lfGlQb2R8aVBhZHxBbmRyb2lkfHBsYXlib29rfHNpbGt8QmxhY2tCZXJyeXxCQjEwfFdpbmRvd3MgUGhvbmV8VGl6ZW58QmFkYXx3ZWJPU3xJRU1vYmlsZXxPcGVyYSBNaW5pKS8pO1xuICAgIHZhciBpc01hY0RldmljZSA9IC8oTWFjfGlQaG9uZXxpUG9kfGlQYWQpL2kudGVzdCh3aW4ubmF2aWdhdG9yLnVzZXJBZ2VudCk7IC8vIEB0cy1pZ25vcmVcblxuICAgIHZhciBpc1RvdWNoID0gJ29udG91Y2hzdGFydCcgaW4gd2luIHx8IG5hdmlnYXRvci5tc01heFRvdWNoUG9pbnRzID4gMCB8fCBuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHM7XG4gICAgdmFyIGlzSUUxMSA9ICEhd2luZG93Lk1TSW5wdXRNZXRob2RDb250ZXh0ICYmICEhZG9jdW1lbnQuZG9jdW1lbnRNb2RlOyAvLyB0YWtlbiBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS91ZGFjaXR5L3VkODkxL2Jsb2IvZ2gtcGFnZXMvbGVzc29uMi1mb2N1cy8wNy1tb2RhbHMtYW5kLWtleWJvYXJkLXRyYXBzL3NvbHV0aW9uL21vZGFsLmpzXG5cbiAgICB2YXIgZm9jdXNhYmxlRWxlbWVudHNTdHJpbmcgPSAnYVtocmVmXSwgYXJlYVtocmVmXSwgaW5wdXQ6bm90KFtkaXNhYmxlZF0pLCBzZWxlY3Q6bm90KFtkaXNhYmxlZF0pLCB0ZXh0YXJlYTpub3QoW2Rpc2FibGVkXSksIGJ1dHRvbjpub3QoW2Rpc2FibGVkXSksIGlmcmFtZSwgb2JqZWN0LCBlbWJlZCwgW3RhYmluZGV4PVwiMFwiXSwgW2NvbnRlbnRlZGl0YWJsZV0nOyAvLyBjYWNoZSBjb21tb24gZWxlbWVudHNcblxuICAgIHZhciBGUCA9IHtcbiAgICAgIHRlc3Q6IHt9LFxuICAgICAgc2hhcmVkOiB7fVxuICAgIH07XG4gICAgdmFyIGV4dGVuc2lvbnMgPSBbJ3BhcmFsbGF4JywgJ3Njcm9sbE92ZXJmbG93UmVzZXQnLCAnZHJhZ0FuZE1vdmUnLCAnb2Zmc2V0U2VjdGlvbnMnLCAnZmFkaW5nRWZmZWN0JywgJ3Jlc3BvbnNpdmVTbGlkZXMnLCAnY29udGludW91c0hvcml6b250YWwnLCAnaW50ZXJsb2NrZWRTbGlkZXMnLCAnc2Nyb2xsSG9yaXpvbnRhbGx5JywgJ3Jlc2V0U2xpZGVycycsICdjYXJkcycsICdkcm9wRWZmZWN0JywgJ3dhdGVyRWZmZWN0J107XG5cbiAgICAvKipcbiAgICAqIGZvckVhY2ggcG9seWZpbGwgZm9yIElFXG4gICAgKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvTm9kZUxpc3QvZm9yRWFjaCNCcm93c2VyX0NvbXBhdGliaWxpdHlcbiAgICAqL1xuXG4gICAgaWYgKHdpbi5Ob2RlTGlzdCAmJiAhTm9kZUxpc3QucHJvdG90eXBlLmZvckVhY2gpIHtcbiAgICAgIE5vZGVMaXN0LnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgICAgIHRoaXNBcmcgPSB0aGlzQXJnIHx8IHdpbmRvdztcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHRoaXNbaV0sIGksIHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgT2JqZWN0LmFzc2lnbiAhPSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBNdXN0IGJlIHdyaXRhYmxlOiB0cnVlLCBlbnVtZXJhYmxlOiBmYWxzZSwgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoT2JqZWN0LCAnYXNzaWduJywge1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgdmFyQXJncykge1xuXG4gICAgICAgICAgaWYgKHRhcmdldCA9PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBUeXBlRXJyb3IgaWYgdW5kZWZpbmVkIG9yIG51bGxcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0IHVuZGVmaW5lZCBvciBudWxsIHRvIG9iamVjdCcpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciB0byA9IE9iamVjdCh0YXJnZXQpO1xuXG4gICAgICAgICAgZm9yICh2YXIgaW5kZXggPSAxOyBpbmRleCA8IGFyZ3VtZW50cy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgIHZhciBuZXh0U291cmNlID0gYXJndW1lbnRzW2luZGV4XTtcblxuICAgICAgICAgICAgaWYgKG5leHRTb3VyY2UgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAvLyBTa2lwIG92ZXIgaWYgdW5kZWZpbmVkIG9yIG51bGxcbiAgICAgICAgICAgICAgZm9yICh2YXIgbmV4dEtleSBpbiBuZXh0U291cmNlKSB7XG4gICAgICAgICAgICAgICAgLy8gQXZvaWQgYnVncyB3aGVuIGhhc093blByb3BlcnR5IGlzIHNoYWRvd2VkXG4gICAgICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChuZXh0U291cmNlLCBuZXh0S2V5KSkge1xuICAgICAgICAgICAgICAgICAgdG9bbmV4dEtleV0gPSBuZXh0U291cmNlW25leHRLZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB0bztcbiAgICAgICAgfSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTE3MTk1NTMvcGFkc3RhcnQtbm90LXdvcmtpbmctaW4taWUxMVxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9iZWhuYW1tb2RpL3BvbHlmaWxsL2Jsb2IvbWFzdGVyL3N0cmluZy5wb2x5ZmlsbC5qc1xuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL1N0cmluZy9wYWRTdGFydFxuICAgIGlmICghU3RyaW5nLnByb3RvdHlwZS5wYWRTdGFydCkge1xuICAgICAgU3RyaW5nLnByb3RvdHlwZS5wYWRTdGFydCA9IGZ1bmN0aW9uIHBhZFN0YXJ0KHRhcmdldExlbmd0aCwgcGFkU3RyaW5nKSB7XG4gICAgICAgIHRhcmdldExlbmd0aCA9IHRhcmdldExlbmd0aCA+PiAwOyAvL3RydW5jYXRlIGlmIG51bWJlciBvciBjb252ZXJ0IG5vbi1udW1iZXIgdG8gMDtcblxuICAgICAgICBwYWRTdHJpbmcgPSBTdHJpbmcodHlwZW9mIHBhZFN0cmluZyAhPT0gJ3VuZGVmaW5lZCcgPyBwYWRTdHJpbmcgOiAnICcpO1xuXG4gICAgICAgIGlmICh0aGlzLmxlbmd0aCA+IHRhcmdldExlbmd0aCkge1xuICAgICAgICAgIHJldHVybiBTdHJpbmcodGhpcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGFyZ2V0TGVuZ3RoID0gdGFyZ2V0TGVuZ3RoIC0gdGhpcy5sZW5ndGg7XG5cbiAgICAgICAgICBpZiAodGFyZ2V0TGVuZ3RoID4gcGFkU3RyaW5nLmxlbmd0aCkge1xuICAgICAgICAgICAgcGFkU3RyaW5nICs9IEFycmF5LmFwcGx5KG51bGwsIEFycmF5KHRhcmdldExlbmd0aCkpLm1hcChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwYWRTdHJpbmc7XG4gICAgICAgICAgICB9KS5qb2luKFwiXCIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBwYWRTdHJpbmcuc2xpY2UoMCwgdGFyZ2V0TGVuZ3RoKSArIFN0cmluZyh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvL3V0aWxzXG4gICAgLyoqXG4gICAgKiBTaG93cyBhIG1lc3NhZ2UgaW4gdGhlIGNvbnNvbGUgb2YgdGhlIGdpdmVuIHR5cGUuXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIHNob3dFcnJvcih0eXBlLCB0ZXh0KSB7XG4gICAgICB3aW4uY29uc29sZSAmJiB3aW4uY29uc29sZVt0eXBlXSAmJiB3aW4uY29uc29sZVt0eXBlXSgnZnVsbFBhZ2U6ICcgKyB0ZXh0KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNWaXNpYmxlKGVsKSB7XG4gICAgICB2YXIgc3R5bGUgPSB3aW4uZ2V0Q29tcHV0ZWRTdHlsZShlbCk7XG4gICAgICByZXR1cm4gc3R5bGUuZGlzcGxheSAhPT0gJ25vbmUnO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRWaXNpYmxlKGVsZW1lbnRzKSB7XG4gICAgICByZXR1cm4gQXJyYXkuZnJvbShlbGVtZW50cykuZmlsdGVyKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHJldHVybiBpc1Zpc2libGUoZSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBFcXVpdmFsZW50IG9mIGpRdWVyeSBmdW5jdGlvbiAkKCkuXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uICQoc2VsZWN0b3IsIGNvbnRleHQpIHtcbiAgICAgIGNvbnRleHQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGNvbnRleHQgOiBkb2N1bWVudDtcbiAgICAgIHJldHVybiBjb250ZXh0ID8gY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSA6IG51bGw7XG4gICAgfVxuICAgIC8qKlxuICAgICogRXh0ZW5kcyBhIGdpdmVuIE9iamVjdCBwcm9wZXJ0aWVzIGFuZCBpdHMgY2hpbGRzLlxuICAgICovXG5cbiAgICBmdW5jdGlvbiBkZWVwRXh0ZW5kKG91dCkge1xuICAgICAgb3V0ID0gb3V0IHx8IHt9O1xuXG4gICAgICBmb3IgKHZhciBpID0gMSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgIHZhciBvYmogPSBhcmd1bWVudHNbaV07XG5cbiAgICAgICAgaWYgKCFvYmopIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgICAgICBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShrZXkpIHx8IGtleSA9PSAnX19wcm90b19fJyB8fCBrZXkgPT0gJ2NvbnN0cnVjdG9yJykge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfSAvLyBiYXNlZCBvbiBodHRwczovL2phdmFzY3JpcHR3ZWJsb2cud29yZHByZXNzLmNvbS8yMDExLzA4LzA4L2ZpeGluZy10aGUtamF2YXNjcmlwdC10eXBlb2Ytb3BlcmF0b3IvXG5cblxuICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqW2tleV0pID09PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgICAgICAgICAgb3V0W2tleV0gPSBkZWVwRXh0ZW5kKG91dFtrZXldLCBvYmpba2V5XSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBvdXRba2V5XSA9IG9ialtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICogQ2hlY2tzIGlmIHRoZSBwYXNzZWQgZWxlbWVudCBjb250YWlucyB0aGUgcGFzc2VkIGNsYXNzLlxuICAgICovXG5cbiAgICBmdW5jdGlvbiBoYXNDbGFzcyhlbCwgY2xhc3NOYW1lKSB7XG4gICAgICBpZiAoZWwgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBlbC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBHZXRzIHRoZSB3aW5kb3cgaGVpZ2h0LiBDcm9zc2Jyb3dzZXIuXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIGdldFdpbmRvd0hlaWdodCgpIHtcbiAgICAgIHJldHVybiAnaW5uZXJIZWlnaHQnIGluIHdpbiA/IHdpbi5pbm5lckhlaWdodCA6IGRvYy5kb2N1bWVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgIH1cbiAgICAvKipcbiAgICAqIEdldHMgdGhlIHdpbmRvdyB3aWR0aC5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gZ2V0V2luZG93V2lkdGgoKSB7XG4gICAgICByZXR1cm4gd2luLmlubmVyV2lkdGg7XG4gICAgfVxuICAgIC8qKlxuICAgICogU2V0J3MgdGhlIENTUyBwcm9wZXJ0aWVzIGZvciB0aGUgcGFzc2VkIGl0ZW0vcy5cbiAgICAqIEBwYXJhbSB7Tm9kZUxpc3R8SFRNTEVsZW1lbnR8T2JqZWN0fSBpdGVtc1xuICAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIGNzcyBwcm9wZXJ0aWVzIGFuZCB2YWx1ZXMuXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIGNzcyhpdGVtcywgcHJvcHMpIHtcbiAgICAgIGl0ZW1zID0gZ2V0TGlzdChpdGVtcyk7XG4gICAgICB2YXIga2V5O1xuXG4gICAgICBmb3IgKGtleSBpbiBwcm9wcykge1xuICAgICAgICBpZiAocHJvcHMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIGlmIChrZXkgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBpdGVtc1tpXTtcbiAgICAgICAgICAgICAgaXRlbS5zdHlsZVtrZXldID0gcHJvcHNba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgIH1cbiAgICAvKipcbiAgICAqIEdldHMgdGhlIHByZXZpb3VzIGVsZW1lbnQgdG8gdGhlIHBhc3NlZCBlbGVtZW50LlxuICAgICovXG5cbiAgICBmdW5jdGlvbiBwcmV2KGl0ZW0pIHtcbiAgICAgIHJldHVybiBpdGVtLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgfVxuICAgIC8qKlxuICAgICogR2V0cyB0aGUgbmV4dCBlbGVtZW50IHRvIHRoZSBwYXNzZWQgZWxlbWVudC5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gbmV4dChpdGVtKSB7XG4gICAgICByZXR1cm4gaXRlbS5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgfVxuICAgIC8qKlxuICAgICogR2V0cyB0aGUgbGFzdCBlbGVtZW50IGZyb20gdGhlIHBhc3NlZCBsaXN0IG9mIGVsZW1lbnRzLlxuICAgICovXG5cbiAgICBmdW5jdGlvbiBsYXN0KGl0ZW0pIHtcbiAgICAgIHJldHVybiBpdGVtW2l0ZW0ubGVuZ3RoIC0gMV07XG4gICAgfVxuICAgIC8qKlxuICAgICogR2V0cyBpbmRleCBmcm9tIHRoZSBwYXNzZWQgZWxlbWVudC5cbiAgICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciBpcyBvcHRpb25hbC5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gaW5kZXgoaXRlbSwgc2VsZWN0b3IpIHtcbiAgICAgIGl0ZW0gPSBpc0FycmF5T3JMaXN0KGl0ZW0pID8gaXRlbVswXSA6IGl0ZW07XG4gICAgICB2YXIgY2hpbGRyZW4gPSBzZWxlY3RvciAhPSBudWxsID8gJChzZWxlY3RvciwgaXRlbS5wYXJlbnROb2RlKSA6IGl0ZW0ucGFyZW50Tm9kZS5jaGlsZE5vZGVzO1xuICAgICAgdmFyIG51bSA9IDA7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGNoaWxkcmVuW2ldID09IGl0ZW0pIHJldHVybiBudW07XG4gICAgICAgIGlmIChjaGlsZHJlbltpXS5ub2RlVHlwZSA9PSAxKSBudW0rKztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgICAvKipcbiAgICAqIEdldHMgYW4gaXRlcmFibGUgZWxlbWVudCBmb3IgdGhlIHBhc3NlZCBlbGVtZW50L3NcbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gZ2V0TGlzdChpdGVtKSB7XG4gICAgICByZXR1cm4gIWlzQXJyYXlPckxpc3QoaXRlbSkgPyBbaXRlbV0gOiBpdGVtO1xuICAgIH1cbiAgICAvKipcbiAgICAqIEFkZHMgdGhlIGRpc3BsYXk9bm9uZSBwcm9wZXJ0eSBmb3IgdGhlIHBhc3NlZCBlbGVtZW50L3NcbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gaGlkZShlbCkge1xuICAgICAgZWwgPSBnZXRMaXN0KGVsKTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbC5sZW5ndGg7IGkrKykge1xuICAgICAgICBlbFtpXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZWw7XG4gICAgfVxuICAgIC8qKlxuICAgICogQWRkcyB0aGUgZGlzcGxheT1ibG9jayBwcm9wZXJ0eSBmb3IgdGhlIHBhc3NlZCBlbGVtZW50L3NcbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gc2hvdyhlbCkge1xuICAgICAgZWwgPSBnZXRMaXN0KGVsKTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbC5sZW5ndGg7IGkrKykge1xuICAgICAgICBlbFtpXS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGVsO1xuICAgIH1cbiAgICAvKipcbiAgICAqIENoZWNrcyBpZiB0aGUgcGFzc2VkIGVsZW1lbnQgaXMgYW4gaXRlcmFibGUgZWxlbWVudCBvciBub3RcbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gaXNBcnJheU9yTGlzdChlbCkge1xuICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlbCkgPT09ICdbb2JqZWN0IEFycmF5XScgfHwgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGVsKSA9PT0gJ1tvYmplY3QgTm9kZUxpc3RdJztcbiAgICB9XG4gICAgLyoqXG4gICAgKiBBZGRzIHRoZSBwYXNzZWQgY2xhc3MgdG8gdGhlIHBhc3NlZCBlbGVtZW50L3NcbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gYWRkQ2xhc3MoZWwsIGNsYXNzTmFtZSkge1xuICAgICAgZWwgPSBnZXRMaXN0KGVsKTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbC5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgaXRlbSA9IGVsW2ldO1xuICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGVsO1xuICAgIH1cbiAgICAvKipcbiAgICAqIFJlbW92ZXMgdGhlIHBhc3NlZCBjbGFzcyB0byB0aGUgcGFzc2VkIGVsZW1lbnQvc1xuICAgICogQHBhcmFtIHtTdHJpbmd9IGBjbGFzc05hbWVgIGNhbiBiZSBtdWx0aXBsZSBjbGFzc25hbWVzIHNlcGFyYXRlZCBieSB3aGl0ZXNwYWNlXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIHJlbW92ZUNsYXNzKGVsLCBjbGFzc05hbWUpIHtcbiAgICAgIGVsID0gZ2V0TGlzdChlbCk7XG4gICAgICB2YXIgY2xhc3NOYW1lcyA9IGNsYXNzTmFtZS5zcGxpdCgnICcpO1xuXG4gICAgICBmb3IgKHZhciBhID0gMDsgYSA8IGNsYXNzTmFtZXMubGVuZ3RoOyBhKyspIHtcbiAgICAgICAgY2xhc3NOYW1lID0gY2xhc3NOYW1lc1thXTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGl0ZW0gPSBlbFtpXTtcbiAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZWw7XG4gICAgfVxuICAgIC8qKlxuICAgICogQXBwZW5kcyB0aGUgZ2l2ZW4gZWxlbWVudCBvdCB0aGUgZ2l2ZW4gcGFyZW50LlxuICAgICovXG5cbiAgICBmdW5jdGlvbiBhcHBlbmRUbyhlbCwgcGFyZW50KSB7XG4gICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoZWwpO1xuICAgIH1cbiAgICAvKipcbiAgICBVc2FnZTpcblxuICAgIHZhciB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgd3JhcHBlci5jbGFzc05hbWUgPSAnZnAtc2xpZGVzJztcbiAgICB3cmFwKCQoJy5zbGlkZScpLCB3cmFwcGVyKTtcblxuICAgIGh0dHBzOi8vanNmaWRkbGUubmV0L3F3emM3b3kzLzE1LyAodmFuaWxsYSlcbiAgICBodHRwczovL2pzZmlkZGxlLm5ldC9veWE2bmRrYS8xLyAoanF1ZXJ5IGVxdWl2YWxlbnQpXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIHdyYXAodG9XcmFwLCB3cmFwcGVyLCBpc1dyYXBBbGwpIHtcbiAgICAgIHZhciBuZXdQYXJlbnQ7XG4gICAgICB3cmFwcGVyID0gd3JhcHBlciB8fCBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG9XcmFwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBpdGVtID0gdG9XcmFwW2ldO1xuXG4gICAgICAgIGlmIChpc1dyYXBBbGwgJiYgIWkgfHwgIWlzV3JhcEFsbCkge1xuICAgICAgICAgIG5ld1BhcmVudCA9IHdyYXBwZXIuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICAgIGl0ZW0ucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobmV3UGFyZW50LCBpdGVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG5ld1BhcmVudC5hcHBlbmRDaGlsZChpdGVtKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRvV3JhcDtcbiAgICB9XG4gICAgLyoqXG4gICAgVXNhZ2U6XG4gICAgdmFyIHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB3cmFwcGVyLmNsYXNzTmFtZSA9ICdmcC1zbGlkZXMnO1xuICAgIHdyYXAoJCgnLnNsaWRlJyksIHdyYXBwZXIpO1xuXG4gICAgaHR0cHM6Ly9qc2ZpZGRsZS5uZXQvcXd6YzdveTMvMjcvICh2YW5pbGxhKVxuICAgIGh0dHBzOi8vanNmaWRkbGUubmV0L295YTZuZGthLzQvIChqcXVlcnkgZXF1aXZhbGVudClcbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gd3JhcEFsbCh0b1dyYXAsIHdyYXBwZXIpIHtcbiAgICAgIHdyYXAodG9XcmFwLCB3cmFwcGVyLCB0cnVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBVc2FnZTpcbiAgICAqIHdyYXBJbm5lcihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGVwZScpLCAnPGRpdiBjbGFzcz1cInRlc3RcIj5hZmRhczwvZGl2PicpO1xuICAgICogd3JhcElubmVyKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwZXBlJyksIGVsZW1lbnQpO1xuICAgICpcbiAgICAqIGh0dHBzOi8vanNmaWRkbGUubmV0L3pleHh6MHR3LzYvXG4gICAgKlxuICAgICogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIxODE3NTkwLzEwODEzOTZcbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gd3JhcElubmVyKHBhcmVudCwgd3JhcHBlcikge1xuICAgICAgcGFyZW50LmFwcGVuZENoaWxkKHdyYXBwZXIpO1xuXG4gICAgICB3aGlsZSAocGFyZW50LmZpcnN0Q2hpbGQgIT09IHdyYXBwZXIpIHtcbiAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZChwYXJlbnQuZmlyc3RDaGlsZCk7XG4gICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICogVXNhZ2U6XG4gICAgKiB1bndyYXAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BlcGUnKSk7XG4gICAgKiB1bndyYXAoZWxlbWVudCk7XG4gICAgKlxuICAgICogaHR0cHM6Ly9qc2ZpZGRsZS5uZXQvc3pqdDBoeHEvMS9cbiAgICAqXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIHVud3JhcCh3cmFwcGVyKSB7XG4gICAgICB2YXIgd3JhcHBlckNvbnRlbnQgPSBkb2MuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXG4gICAgICB3aGlsZSAod3JhcHBlci5maXJzdENoaWxkKSB7XG4gICAgICAgIHdyYXBwZXJDb250ZW50LmFwcGVuZENoaWxkKHdyYXBwZXIuZmlyc3RDaGlsZCk7XG4gICAgICB9XG5cbiAgICAgIHdyYXBwZXIucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQod3JhcHBlckNvbnRlbnQsIHdyYXBwZXIpO1xuICAgIH1cbiAgICAvKipcbiAgICAqIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjIxMDA4NTMvZG9tLXB1cmUtamF2YXNjcmlwdC1zb2x1dGlvbi10by1qcXVlcnktY2xvc2VzdC1pbXBsZW1lbnRhdGlvblxuICAgICogUmV0dXJucyB0aGUgZWxlbWVudCBvciBgZmFsc2VgIGlmIHRoZXJlJ3Mgbm9uZVxuICAgICovXG5cbiAgICBmdW5jdGlvbiBjbG9zZXN0KGVsLCBzZWxlY3Rvcikge1xuICAgICAgaWYgKGVsICYmIGVsLm5vZGVUeXBlID09PSAxKSB7XG4gICAgICAgIGlmIChtYXRjaGVzKGVsLCBzZWxlY3RvcikpIHtcbiAgICAgICAgICByZXR1cm4gZWw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2xvc2VzdChlbC5wYXJlbnROb2RlLCBzZWxlY3Rvcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICAvKipcbiAgICAqIFBsYWNlcyBvbmUgZWxlbWVudCAocmVsKSBhZnRlciBhbm90aGVyIG9uZSBvciBncm91cCBvZiB0aGVtIChyZWZlcmVuY2UpLlxuICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcmVmZXJlbmNlXG4gICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fE5vZGVMaXN0fFN0cmluZ3xBcnJheX0gZWxcbiAgICAqIGh0dHBzOi8vanNmaWRkbGUubmV0LzlzOTdoaHp2LzEvXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIGFmdGVyKHJlZmVyZW5jZSwgZWwpIHtcbiAgICAgIGluc2VydEJlZm9yZShyZWZlcmVuY2UsIHJlZmVyZW5jZS5uZXh0U2libGluZywgZWwpO1xuICAgIH1cbiAgICAvKipcbiAgICAqIFBsYWNlcyBvbmUgZWxlbWVudCAocmVsKSBiZWZvcmUgYW5vdGhlciBvbmUgb3IgZ3JvdXAgb2YgdGhlbSAocmVmZXJlbmNlKS5cbiAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHJlZmVyZW5jZVxuICAgICogQHBhcmFtIHtIVE1MRWxlbWVudHxOb2RlTGlzdHxTdHJpbmd8QXJyYXl9IGVsXG4gICAgKiBodHRwczovL2pzZmlkZGxlLm5ldC85czk3aGh6di8xL1xuICAgICovXG5cbiAgICBmdW5jdGlvbiBiZWZvcmUocmVmZXJlbmNlLCBlbCkge1xuICAgICAgaW5zZXJ0QmVmb3JlKHJlZmVyZW5jZSwgcmVmZXJlbmNlLCBlbCk7XG4gICAgfVxuICAgIC8qKlxuICAgICogQmFzZWQgaW4gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzE5MzE2MDI0LzEwODEzOTZcbiAgICAqIGFuZCBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNDc5MzYzMC8xMDgxMzk2XG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIGluc2VydEJlZm9yZShyZWZlcmVuY2UsIGJlZm9yZUVsZW1lbnQsIGVsKSB7XG4gICAgICBpZiAoIWlzQXJyYXlPckxpc3QoZWwpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZWwgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBlbCA9IGNyZWF0ZUVsZW1lbnRGcm9tSFRNTChlbCk7XG4gICAgICAgIH1cblxuICAgICAgICBlbCA9IFtlbF07XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWwubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVmZXJlbmNlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGVsW2ldLCBiZWZvcmVFbGVtZW50KTtcbiAgICAgIH1cbiAgICB9IC8vaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zNDY0ODc2L2phdmFzY3JpcHQtZ2V0LXdpbmRvdy14LXktcG9zaXRpb24tZm9yLXNjcm9sbFxuXG4gICAgZnVuY3Rpb24gZ2V0U2Nyb2xsVG9wKCkge1xuICAgICAgdmFyIGRvY0VsZW1lbnQgPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgcmV0dXJuICh3aW4ucGFnZVlPZmZzZXQgfHwgZG9jRWxlbWVudC5zY3JvbGxUb3ApIC0gKGRvY0VsZW1lbnQuY2xpZW50VG9wIHx8IDApO1xuICAgIH1cbiAgICAvKipcbiAgICAqIEdldHMgdGhlIHNpYmxpbmdzIG9mIHRoZSBwYXNzZWQgZWxlbWVudFxuICAgICovXG5cbiAgICBmdW5jdGlvbiBzaWJsaW5ncyhlbCkge1xuICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5maWx0ZXIuY2FsbChlbC5wYXJlbnROb2RlLmNoaWxkcmVuLCBmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgICAgcmV0dXJuIGNoaWxkICE9PSBlbDtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwcmV2ZW50RGVmYXVsdChldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0QXR0cihlbCwgYXR0cikge1xuICAgICAgcmV0dXJuIGVsLmdldEF0dHJpYnV0ZShhdHRyKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZG9jQWRkRXZlbnQoZXZlbnQsIGNhbGxiYWNrLCBvcHRpb25zKSB7XG4gICAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgY2FsbGJhY2ssIG9wdGlvbnMgPT09ICd1bmRlZmluZWQnID8gbnVsbCA6IG9wdGlvbnMpO1xuICAgIH1cbiAgICBmdW5jdGlvbiB3aW5kb3dBZGRFdmVudChldmVudCwgY2FsbGJhY2ssIG9wdGlvbnMpIHtcbiAgICAgIHdpbi5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBjYWxsYmFjaywgb3B0aW9ucyA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogb3B0aW9ucyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRvY1JlbW92ZUV2ZW50KGV2ZW50LCBjYWxsYmFjaywgb3B0aW9ucykge1xuICAgICAgZG9jLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGNhbGxiYWNrLCBvcHRpb25zID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiBvcHRpb25zKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gd2luZG93UmVtb3ZlRXZlbnQoZXZlbnQsIGNhbGxiYWNrLCBvcHRpb25zKSB7XG4gICAgICB3aW4ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgY2FsbGJhY2ssIG9wdGlvbnMgPT09ICd1bmRlZmluZWQnID8gbnVsbCA6IG9wdGlvbnMpO1xuICAgIH1cbiAgICAvKipcbiAgICAqIERldGVybWluZXMgd2hldGhlciB0aGUgcGFzc2VkIGl0ZW0gaXMgb2YgZnVuY3Rpb24gdHlwZS5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gaXNGdW5jdGlvbihpdGVtKSB7XG4gICAgICBpZiAodHlwZW9mIGl0ZW0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIHZhciB0eXBlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGl0ZW0pO1xuICAgICAgcmV0dXJuIHR5cGUgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXScgfHwgdHlwZSA9PT0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJztcbiAgICB9XG4gICAgLyoqXG4gICAgKiBUcmlnZ2VyIGN1c3RvbSBldmVudHNcbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gdHJpZ2dlcihlbCwgZXZlbnROYW1lLCBkYXRhKSB7XG4gICAgICB2YXIgZXZlbnQ7XG4gICAgICBkYXRhID0gdHlwZW9mIGRhdGEgPT09ICd1bmRlZmluZWQnID8ge30gOiBkYXRhOyAvLyBOYXRpdmVcblxuICAgICAgaWYgKHR5cGVvZiB3aW4uQ3VzdG9tRXZlbnQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBldmVudCA9IG5ldyBDdXN0b21FdmVudChldmVudE5hbWUsIHtcbiAgICAgICAgICBkZXRhaWw6IGRhdGFcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBldmVudCA9IGRvYy5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgICAgICAgZXZlbnQuaW5pdEN1c3RvbUV2ZW50KGV2ZW50TmFtZSwgdHJ1ZSwgdHJ1ZSwgZGF0YSk7XG4gICAgICB9XG5cbiAgICAgIGVsLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgIH1cbiAgICAvKipcbiAgICAqIFBvbHlmaWxsIG9mIC5tYXRjaGVzKClcbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gbWF0Y2hlcyhlbCwgc2VsZWN0b3IpIHtcbiAgICAgIHJldHVybiAoZWwubWF0Y2hlcyB8fCBlbC5tYXRjaGVzU2VsZWN0b3IgfHwgZWwubXNNYXRjaGVzU2VsZWN0b3IgfHwgZWwubW96TWF0Y2hlc1NlbGVjdG9yIHx8IGVsLndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fCBlbC5vTWF0Y2hlc1NlbGVjdG9yKS5jYWxsKGVsLCBzZWxlY3Rvcik7XG4gICAgfVxuICAgIC8qKlxuICAgICogVG9nZ2xlcyB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgcGFzc2VkIGVsZW1lbnQgZWwuXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIHRvZ2dsZShlbCwgdmFsdWUpIHtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWwubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBlbFtpXS5zdHlsZS5kaXNwbGF5ID0gdmFsdWUgPyAnYmxvY2snIDogJ25vbmUnO1xuICAgICAgICB9XG4gICAgICB9IC8vd2UgZG9uJ3QgdXNlIGl0IGluIG90aGVyIHdheSwgc28gbm8gZWxzZSA6KVxuXG5cbiAgICAgIHJldHVybiBlbDtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBDcmVhdGVzIGEgSFRNTEVsZW1lbnQgZnJvbSB0aGUgcGFzc2VkIEhUTUwgc3RyaW5nLlxuICAgICogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzQ5NDM0OC8xMDgxMzk2XG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnRGcm9tSFRNTChodG1sU3RyaW5nKSB7XG4gICAgICB2YXIgZGl2ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgZGl2LmlubmVySFRNTCA9IGh0bWxTdHJpbmcudHJpbSgpOyAvLyBDaGFuZ2UgdGhpcyB0byBkaXYuY2hpbGROb2RlcyB0byBzdXBwb3J0IG11bHRpcGxlIHRvcC1sZXZlbCBub2Rlc1xuXG4gICAgICByZXR1cm4gZGl2LmZpcnN0Q2hpbGQ7XG4gICAgfVxuICAgIC8qKlxuICAgICogUmVtb3ZlcyB0aGUgcGFzc2VkIGl0ZW0vcyBmcm9tIHRoZSBET00uXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIHJlbW92ZShpdGVtcykge1xuICAgICAgaXRlbXMgPSBnZXRMaXN0KGl0ZW1zKTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgaXRlbSA9IGl0ZW1zW2ldO1xuXG4gICAgICAgIGlmIChpdGVtICYmIGl0ZW0ucGFyZW50RWxlbWVudCkge1xuICAgICAgICAgIGl0ZW0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChpdGVtKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gLy9odHRwczovL2pzZmlkZGxlLm5ldC93MXJrdGVjei9cblxuICAgIGZ1bmN0aW9uIHVudGlsQWxsKGl0ZW0sIHNlbGVjdG9yLCBmbikge1xuICAgICAgdmFyIHNpYmxpbmcgPSBpdGVtW2ZuXTtcbiAgICAgIHZhciBzaWJsaW5ncyA9IFtdO1xuXG4gICAgICB3aGlsZSAoc2libGluZykge1xuICAgICAgICBpZiAobWF0Y2hlcyhzaWJsaW5nLCBzZWxlY3RvcikgfHwgc2VsZWN0b3IgPT0gbnVsbCkge1xuICAgICAgICAgIHNpYmxpbmdzLnB1c2goc2libGluZyk7XG4gICAgICAgIH1cblxuICAgICAgICBzaWJsaW5nID0gc2libGluZ1tmbl07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzaWJsaW5ncztcbiAgICB9XG4gICAgLyoqXG4gICAgKiBHZXRzIGFsbCBuZXh0IGVsZW1lbnRzIG1hdGNoaW5nIHRoZSBwYXNzZWQgc2VsZWN0b3IuXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIG5leHRBbGwoaXRlbSwgc2VsZWN0b3IpIHtcbiAgICAgIHJldHVybiB1bnRpbEFsbChpdGVtLCBzZWxlY3RvciwgJ25leHRFbGVtZW50U2libGluZycpO1xuICAgIH1cbiAgICAvKipcbiAgICAqIEdldHMgYWxsIHByZXZpb3VzIGVsZW1lbnRzIG1hdGNoaW5nIHRoZSBwYXNzZWQgc2VsZWN0b3IuXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIHByZXZBbGwoaXRlbSwgc2VsZWN0b3IpIHtcbiAgICAgIHJldHVybiB1bnRpbEFsbChpdGVtLCBzZWxlY3RvciwgJ3ByZXZpb3VzRWxlbWVudFNpYmxpbmcnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBDb252ZXJ0cyBhbiBvYmplY3QgdG8gYW4gYXJyYXkuXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIHRvQXJyYXkob2JqZWN0RGF0YSkge1xuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iamVjdERhdGEpLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHJldHVybiBvYmplY3REYXRhW2tleV07XG4gICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0TGFzdChpdGVtcykge1xuICAgICAgcmV0dXJuIGl0ZW1zW2l0ZW1zLmxlbmd0aCAtIDFdO1xuICAgIH1cbiAgICAvKipcbiAgICAqIEdldHMgdGhlIGF2ZXJhZ2Ugb2YgdGhlIGxhc3QgYG51bWJlcmAgZWxlbWVudHMgb2YgdGhlIGdpdmVuIGFycmF5LlxuICAgICovXG5cbiAgICBmdW5jdGlvbiBnZXRBdmVyYWdlKGVsZW1lbnRzLCBudW1iZXIpIHtcbiAgICAgIHZhciBzdW0gPSAwOyAvL3Rha2luZyBgbnVtYmVyYCBlbGVtZW50cyBmcm9tIHRoZSBlbmQgdG8gbWFrZSB0aGUgYXZlcmFnZSwgaWYgdGhlcmUgYXJlIG5vdCBlbm91Z2h0LCAxXG5cbiAgICAgIHZhciBsYXN0RWxlbWVudHMgPSBlbGVtZW50cy5zbGljZShNYXRoLm1heChlbGVtZW50cy5sZW5ndGggLSBudW1iZXIsIDEpKTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0RWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc3VtID0gc3VtICsgbGFzdEVsZW1lbnRzW2ldO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gTWF0aC5jZWlsKHN1bSAvIG51bWJlcik7XG4gICAgfVxuICAgIC8qKlxuICAgICogU2V0cyB0aGUgdmFsdWUgZm9yIHRoZSBnaXZlbiBhdHRyaWJ1dGUgZnJvbSB0aGUgYGRhdGEtYCBhdHRyaWJ1dGUgd2l0aCB0aGUgc2FtZSBzdWZmaXhcbiAgICAqIGllOiBkYXRhLXNyY3NldCA9PT4gc3Jjc2V0ICB8ICBkYXRhLXNyYyA9PT4gc3JjXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIHNldFNyYyhlbGVtZW50LCBhdHRyaWJ1dGUpIHtcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZSwgZ2V0QXR0cihlbGVtZW50LCAnZGF0YS0nICsgYXR0cmlidXRlKSk7XG4gICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS0nICsgYXR0cmlidXRlKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0UGFyZW50c1VudGlsKGl0ZW0sIHRvcFBhcmVudFNlbGVjdG9yKSB7XG4gICAgICB2YXIgcGFyZW50cyA9IFtpdGVtXTtcblxuICAgICAgZG8ge1xuICAgICAgICBpdGVtID0gaXRlbS5wYXJlbnROb2RlO1xuICAgICAgICBwYXJlbnRzLnB1c2goaXRlbSk7XG4gICAgICB9IHdoaWxlICghbWF0Y2hlcyhpdGVtLCB0b3BQYXJlbnRTZWxlY3RvcikpO1xuXG4gICAgICByZXR1cm4gcGFyZW50cztcbiAgICB9IC8vdXRpbHMgYXJlIHB1YmxpYywgc28gd2UgY2FuIHVzZSBpdCB3aGVyZXZlciB3ZSB3YW50XG4gICAgLy8gQHRzLWlnbm9yZVxuXG4gICAgd2luZG93W1wiZnBfdXRpbHNcIl0gPSB7XG4gICAgICBcIiRcIjogJCxcbiAgICAgIFwiZGVlcEV4dGVuZFwiOiBkZWVwRXh0ZW5kLFxuICAgICAgXCJoYXNDbGFzc1wiOiBoYXNDbGFzcyxcbiAgICAgIFwiZ2V0V2luZG93SGVpZ2h0XCI6IGdldFdpbmRvd0hlaWdodCxcbiAgICAgIFwiY3NzXCI6IGNzcyxcbiAgICAgIFwicHJldlwiOiBwcmV2LFxuICAgICAgXCJuZXh0XCI6IG5leHQsXG4gICAgICBcImxhc3RcIjogbGFzdCxcbiAgICAgIFwiaW5kZXhcIjogaW5kZXgsXG4gICAgICBcImdldExpc3RcIjogZ2V0TGlzdCxcbiAgICAgIFwiaGlkZVwiOiBoaWRlLFxuICAgICAgXCJzaG93XCI6IHNob3csXG4gICAgICBcImlzQXJyYXlPckxpc3RcIjogaXNBcnJheU9yTGlzdCxcbiAgICAgIFwiYWRkQ2xhc3NcIjogYWRkQ2xhc3MsXG4gICAgICBcInJlbW92ZUNsYXNzXCI6IHJlbW92ZUNsYXNzLFxuICAgICAgXCJhcHBlbmRUb1wiOiBhcHBlbmRUbyxcbiAgICAgIFwid3JhcFwiOiB3cmFwLFxuICAgICAgXCJ3cmFwQWxsXCI6IHdyYXBBbGwsXG4gICAgICBcInVud3JhcFwiOiB1bndyYXAsXG4gICAgICBcImNsb3Nlc3RcIjogY2xvc2VzdCxcbiAgICAgIFwiYWZ0ZXJcIjogYWZ0ZXIsXG4gICAgICBcImJlZm9yZVwiOiBiZWZvcmUsXG4gICAgICBcImluc2VydEJlZm9yZVwiOiBpbnNlcnRCZWZvcmUsXG4gICAgICBcImdldFNjcm9sbFRvcFwiOiBnZXRTY3JvbGxUb3AsXG4gICAgICBcInNpYmxpbmdzXCI6IHNpYmxpbmdzLFxuICAgICAgXCJwcmV2ZW50RGVmYXVsdFwiOiBwcmV2ZW50RGVmYXVsdCxcbiAgICAgIFwiaXNGdW5jdGlvblwiOiBpc0Z1bmN0aW9uLFxuICAgICAgXCJ0cmlnZ2VyXCI6IHRyaWdnZXIsXG4gICAgICBcIm1hdGNoZXNcIjogbWF0Y2hlcyxcbiAgICAgIFwidG9nZ2xlXCI6IHRvZ2dsZSxcbiAgICAgIFwiY3JlYXRlRWxlbWVudEZyb21IVE1MXCI6IGNyZWF0ZUVsZW1lbnRGcm9tSFRNTCxcbiAgICAgIFwicmVtb3ZlXCI6IHJlbW92ZSxcbiAgICAgIC8vIFwiZmlsdGVyXCI6IGZpbHRlcixcbiAgICAgIFwidW50aWxBbGxcIjogdW50aWxBbGwsXG4gICAgICBcIm5leHRBbGxcIjogbmV4dEFsbCxcbiAgICAgIFwicHJldkFsbFwiOiBwcmV2QWxsLFxuICAgICAgXCJzaG93RXJyb3JcIjogc2hvd0Vycm9yXG4gICAgfTtcblxuICAgIHZhciB1dGlscyA9IC8qI19fUFVSRV9fKi9PYmplY3QuZnJlZXplKHtcbiAgICAgICAgX19wcm90b19fOiBudWxsLFxuICAgICAgICBzaG93RXJyb3I6IHNob3dFcnJvcixcbiAgICAgICAgaXNWaXNpYmxlOiBpc1Zpc2libGUsXG4gICAgICAgIGdldFZpc2libGU6IGdldFZpc2libGUsXG4gICAgICAgICQ6ICQsXG4gICAgICAgIGRlZXBFeHRlbmQ6IGRlZXBFeHRlbmQsXG4gICAgICAgIGhhc0NsYXNzOiBoYXNDbGFzcyxcbiAgICAgICAgZ2V0V2luZG93SGVpZ2h0OiBnZXRXaW5kb3dIZWlnaHQsXG4gICAgICAgIGdldFdpbmRvd1dpZHRoOiBnZXRXaW5kb3dXaWR0aCxcbiAgICAgICAgY3NzOiBjc3MsXG4gICAgICAgIHByZXY6IHByZXYsXG4gICAgICAgIG5leHQ6IG5leHQsXG4gICAgICAgIGxhc3Q6IGxhc3QsXG4gICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgZ2V0TGlzdDogZ2V0TGlzdCxcbiAgICAgICAgaGlkZTogaGlkZSxcbiAgICAgICAgc2hvdzogc2hvdyxcbiAgICAgICAgaXNBcnJheU9yTGlzdDogaXNBcnJheU9yTGlzdCxcbiAgICAgICAgYWRkQ2xhc3M6IGFkZENsYXNzLFxuICAgICAgICByZW1vdmVDbGFzczogcmVtb3ZlQ2xhc3MsXG4gICAgICAgIGFwcGVuZFRvOiBhcHBlbmRUbyxcbiAgICAgICAgd3JhcDogd3JhcCxcbiAgICAgICAgd3JhcEFsbDogd3JhcEFsbCxcbiAgICAgICAgd3JhcElubmVyOiB3cmFwSW5uZXIsXG4gICAgICAgIHVud3JhcDogdW53cmFwLFxuICAgICAgICBjbG9zZXN0OiBjbG9zZXN0LFxuICAgICAgICBhZnRlcjogYWZ0ZXIsXG4gICAgICAgIGJlZm9yZTogYmVmb3JlLFxuICAgICAgICBpbnNlcnRCZWZvcmU6IGluc2VydEJlZm9yZSxcbiAgICAgICAgZ2V0U2Nyb2xsVG9wOiBnZXRTY3JvbGxUb3AsXG4gICAgICAgIHNpYmxpbmdzOiBzaWJsaW5ncyxcbiAgICAgICAgcHJldmVudERlZmF1bHQ6IHByZXZlbnREZWZhdWx0LFxuICAgICAgICBnZXRBdHRyOiBnZXRBdHRyLFxuICAgICAgICBkb2NBZGRFdmVudDogZG9jQWRkRXZlbnQsXG4gICAgICAgIHdpbmRvd0FkZEV2ZW50OiB3aW5kb3dBZGRFdmVudCxcbiAgICAgICAgZG9jUmVtb3ZlRXZlbnQ6IGRvY1JlbW92ZUV2ZW50LFxuICAgICAgICB3aW5kb3dSZW1vdmVFdmVudDogd2luZG93UmVtb3ZlRXZlbnQsXG4gICAgICAgIGlzRnVuY3Rpb246IGlzRnVuY3Rpb24sXG4gICAgICAgIHRyaWdnZXI6IHRyaWdnZXIsXG4gICAgICAgIG1hdGNoZXM6IG1hdGNoZXMsXG4gICAgICAgIHRvZ2dsZTogdG9nZ2xlLFxuICAgICAgICBjcmVhdGVFbGVtZW50RnJvbUhUTUw6IGNyZWF0ZUVsZW1lbnRGcm9tSFRNTCxcbiAgICAgICAgcmVtb3ZlOiByZW1vdmUsXG4gICAgICAgIHVudGlsQWxsOiB1bnRpbEFsbCxcbiAgICAgICAgbmV4dEFsbDogbmV4dEFsbCxcbiAgICAgICAgcHJldkFsbDogcHJldkFsbCxcbiAgICAgICAgdG9BcnJheTogdG9BcnJheSxcbiAgICAgICAgZ2V0TGFzdDogZ2V0TGFzdCxcbiAgICAgICAgZ2V0QXZlcmFnZTogZ2V0QXZlcmFnZSxcbiAgICAgICAgc2V0U3JjOiBzZXRTcmMsXG4gICAgICAgIGdldFBhcmVudHNVbnRpbDogZ2V0UGFyZW50c1VudGlsXG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiO1xuXG4gICAgICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHtcbiAgICAgICAgX3R5cGVvZiA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICByZXR1cm4gdHlwZW9mIG9iajtcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF90eXBlb2YgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfdHlwZW9mKG9iaik7XG4gICAgfVxuXG4gICAgdmFyIEV2ZW50RW1pdHRlciA9IHtcbiAgICAgIGV2ZW50czoge30sXG4gICAgICBvbjogZnVuY3Rpb24gb24oZXZlbnQsIGxpc3RlbmVyKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKF90eXBlb2YodGhpcy5ldmVudHNbZXZlbnRdKSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICB0aGlzLmV2ZW50c1tldmVudF0gPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50XS5wdXNoKGxpc3RlbmVyKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMucmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyKTtcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICByZW1vdmVMaXN0ZW5lcjogZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyKSB7XG4gICAgICAgIGlmIChfdHlwZW9mKHRoaXMuZXZlbnRzW2V2ZW50XSkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgdmFyIGlkeCA9IHRoaXMuZXZlbnRzW2V2ZW50XS5pbmRleE9mKGxpc3RlbmVyKTtcblxuICAgICAgICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgICAgICAgdGhpcy5ldmVudHNbZXZlbnRdLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGVtaXQ6IGZ1bmN0aW9uIGVtaXQoZXZlbnQpIHtcbiAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF90eXBlb2YodGhpcy5ldmVudHNbZXZlbnRdKSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICB0aGlzLmV2ZW50c1tldmVudF0uZm9yRWFjaChmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBsaXN0ZW5lci5hcHBseShfdGhpczIsIGFyZ3MpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgb25jZTogZnVuY3Rpb24gb25jZShldmVudCwgbGlzdGVuZXIpIHtcbiAgICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgICAgdmFyIHJlbW92ZSA9IHRoaXMub24oZXZlbnQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZW1vdmUoKTtcblxuICAgICAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuMiksIF9rZXkyID0gMDsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICAgICAgYXJnc1tfa2V5Ml0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxpc3RlbmVyLmFwcGx5KF90aGlzMywgYXJncyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgc3RhdGUgPSB7XG4gICAgICBudW1TZWN0aW9uczogMCxcbiAgICAgIG51bVNsaWRlczogMCxcbiAgICAgIHNsaWRlczogW10sXG4gICAgICBzZWN0aW9uczogW10sXG4gICAgICBhY3RpdmVTZWN0aW9uOiBudWxsLFxuICAgICAgc2Nyb2xsVHJpZ2dlcjogbnVsbCxcbiAgICAgIGlzQmV5b25kRnVsbHBhZ2U6IGZhbHNlLFxuICAgICAgYWJvdXRUb1Njcm9sbFRvRnVsbFBhZ2U6IGZhbHNlLFxuICAgICAgc2xpZGVNb3Zpbmc6IGZhbHNlLFxuICAgICAgaXNSZXNpemluZzogZmFsc2UsXG4gICAgICBpc1Njcm9sbGluZzogZmFsc2UsXG4gICAgICBsYXN0U2Nyb2xsZWREZXN0aW55OiB1bmRlZmluZWQsXG4gICAgICBsYXN0U2Nyb2xsZWRTbGlkZTogdW5kZWZpbmVkLFxuICAgICAgYWN0aXZlQW5pbWF0aW9uOiBmYWxzZSxcbiAgICAgIGNhblNjcm9sbDogdHJ1ZSxcbiAgICAgIHRvdWNoRGlyZWN0aW9uOiAnbm9uZScsXG4gICAgICB3aGVlbERpcmVjdGlvbjogJ25vbmUnLFxuICAgICAgaXNHcmFiYmluZzogZmFsc2UsXG4gICAgICBpc1VzaW5nV2hlZWw6IGZhbHNlLFxuICAgICAgaXNXaW5kb3dGb2N1c2VkOiB0cnVlLFxuICAgICAgcHJldmlvdXNEZXN0VG9wOiAwLFxuICAgICAgd2luZG93c0hlaWdodDogZ2V0V2luZG93SGVpZ2h0KCksXG4gICAgICBpc0RvaW5nQ29udGlub3VzVmVydGljYWw6IGZhbHNlLFxuICAgICAgdGltZW91dHM6IHt9LFxuICAgICAgc2Nyb2xsWTogMCxcbiAgICAgIHNjcm9sbFg6IDBcbiAgICB9OyAvLyBAdHMtaWdub3JlXG5cbiAgICB3aW4uc3RhdGUgPSBzdGF0ZTtcbiAgICBmdW5jdGlvbiBzZXRTdGF0ZShwcm9wcykge1xuICAgICAgT2JqZWN0LmFzc2lnbihzdGF0ZSwgcHJvcHMpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRTdGF0ZSgpIHtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0QWN0aXZlUGFuZWwoKSB7XG4gICAgICByZXR1cm4gc3RhdGUuYWN0aXZlU2VjdGlvbiAmJiBzdGF0ZS5hY3RpdmVTZWN0aW9uLmFjdGl2ZVNsaWRlID8gc3RhdGUuYWN0aXZlU2VjdGlvbi5hY3RpdmVTbGlkZSA6IHN0YXRlLmFjdGl2ZVNlY3Rpb247XG4gICAgfVxuXG4gICAgdmFyIGV2ZW50cyA9IHtcbiAgICAgIG9uQWZ0ZXJSZW5kZXJOb0FuY2hvcjogJ29uQWZ0ZXJSZW5kZXJOb0FuY2hvcicsXG4gICAgICBvbkNsaWNrT3JUb3VjaDogJ29uQ2xpY2tPclRvdWNoJyxcbiAgICAgIG1vdmVTbGlkZUxlZnQ6ICdtb3ZlU2xpZGVMZWZ0JyxcbiAgICAgIG1vdmVTbGlkZVJpZ2h0OiAnbW92ZVNsaWRlUmlnaHQnLFxuICAgICAgb25Jbml0aWFsaXNlOiAnb25Jbml0aWFsaXNlJyxcbiAgICAgIGJlZm9yZUluaXQ6ICdiZWZvcmVJbml0JyxcbiAgICAgIGJpbmRFdmVudHM6ICdiaW5kRXZlbnRzJyxcbiAgICAgIG9uRGVzdHJveTogJ29uRGVzdHJveScsXG4gICAgICBjb250ZW50Q2hhbmdlZDogJ2NvbnRlbnRDaGFuZ2VkJyxcbiAgICAgIG9uU2Nyb2xsT3ZlcmZsb3dTY3JvbGxlZDogJ29uU2Nyb2xsT3ZlcmZsb3dTY3JvbGxlZCcsXG4gICAgICBvblNjcm9sbFBhZ2VBbmRTbGlkZTogJ29uU2Nyb2xsUGFnZUFuZFNsaWRlJyxcbiAgICAgIG9uS2V5RG93bjogJ29uS2V5RG93bicsXG4gICAgICBvbk1lbnVDbGljazogJ29uTWVudUNsaWNrJyxcbiAgICAgIHNjcm9sbFBhZ2U6ICdzY3JvbGxQYWdlJyxcbiAgICAgIGxhbmRzY2FwZVNjcm9sbDogJ2xhbmRzY2FwZVNjcm9sbCcsXG4gICAgICBzY3JvbGxCZXlvbmRGdWxscGFnZTogJ3Njcm9sbEJleW9uZEZ1bGxwYWdlJyxcbiAgICAgIG9uUGVyZm9ybU1vdmVtZW50OiAnb25QZXJmb3JtTW92ZW1lbnQnLFxuICAgICAgYWZ0ZXJTZWN0aW9uTG9hZHM6ICdhZnRlclNlY3Rpb25Mb2FkcycsXG4gICAgICBhZnRlclNsaWRlTG9hZHM6ICdhZnRlclNsaWRlTG9hZHMnXG4gICAgfTtcblxuICAgIEV2ZW50RW1pdHRlci5vbihldmVudHMuYmluZEV2ZW50cywgYmluZEV2ZW50cyRjKTtcblxuICAgIGZ1bmN0aW9uIGJpbmRFdmVudHMkYygpIHtcbiAgICAgIC8vU2Nyb2xscyB0byB0aGUgc2VjdGlvbiB3aGVuIGNsaWNraW5nIHRoZSBuYXZpZ2F0aW9uIGJ1bGxldFxuICAgICAgLy9zaW11bGF0aW5nIHRoZSBqUXVlcnkgLm9uKCdjbGljaycpIGV2ZW50IHVzaW5nIGRlbGVnYXRpb25cbiAgICAgIFsnY2xpY2snLCAndG91Y2hzdGFydCddLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50TmFtZSkge1xuICAgICAgICBkb2NBZGRFdmVudChldmVudE5hbWUsIGRlbGVnYXRlZEV2ZW50cyk7XG4gICAgICB9KTtcbiAgICAgIHdpbmRvd0FkZEV2ZW50KCdmb2N1cycsIGZvY3VzSGFuZGxlcik7XG4gICAgICBpbnRlcm5hbEV2ZW50cygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGludGVybmFsRXZlbnRzKCkge1xuICAgICAgRXZlbnRFbWl0dGVyLm9uKGV2ZW50cy5vbkRlc3Ryb3ksIG9uRGVzdHJveSQ4KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWxlZ2F0ZWRFdmVudHMoZSkge1xuICAgICAgRXZlbnRFbWl0dGVyLmVtaXQoZXZlbnRzLm9uQ2xpY2tPclRvdWNoLCB7XG4gICAgICAgIGU6IGUsXG4gICAgICAgIHRhcmdldDogZS50YXJnZXRcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRGVzdHJveSQ4KCkge1xuICAgICAgWydjbGljaycsICd0b3VjaHN0YXJ0J10uZm9yRWFjaChmdW5jdGlvbiAoZXZlbnROYW1lKSB7XG4gICAgICAgIGRvY1JlbW92ZUV2ZW50KGV2ZW50TmFtZSwgZGVsZWdhdGVkRXZlbnRzKTtcbiAgICAgIH0pO1xuICAgIH0gLy8gY2hhbmdpbmcgaXNXaW5kb3dGb2N1c2VkIHRvIHRydWUgb24gZm9jdXMgZXZlbnRcblxuXG4gICAgZnVuY3Rpb24gZm9jdXNIYW5kbGVyKCkge1xuICAgICAgc2V0U3RhdGUoe1xuICAgICAgICBpc1dpbmRvd0ZvY3VzZWQ6IHRydWVcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGtlZXBpbmcgY2VudHJhbCBzZXQgb2YgY2xhc3NuYW1lcyBhbmQgc2VsZWN0b3JzXG4gICAgdmFyIFdSQVBQRVIgPSAnZnVsbHBhZ2Utd3JhcHBlcic7XG4gICAgdmFyIFdSQVBQRVJfU0VMID0gJy4nICsgV1JBUFBFUjsgLy8gc2xpbXNjcm9sbFxuXG4gICAgdmFyIFJFU1BPTlNJVkUgPSAnZnAtcmVzcG9uc2l2ZSc7XG4gICAgdmFyIE5PX1RSQU5TSVRJT04gPSAnZnAtbm90cmFuc2l0aW9uJztcbiAgICB2YXIgREVTVFJPWUVEID0gJ2ZwLWRlc3Ryb3llZCc7XG4gICAgdmFyIEVOQUJMRUQgPSAnZnAtZW5hYmxlZCc7XG4gICAgdmFyIFZJRVdJTkdfUFJFRklYID0gJ2ZwLXZpZXdpbmcnO1xuICAgIHZhciBBQ1RJVkUgPSAnYWN0aXZlJztcbiAgICB2YXIgQUNUSVZFX1NFTCA9ICcuJyArIEFDVElWRTtcbiAgICB2YXIgQ09NUExFVEVMWSA9ICdmcC1jb21wbGV0ZWx5JztcbiAgICB2YXIgQ09NUExFVEVMWV9TRUwgPSAnLicgKyBDT01QTEVURUxZOyAvLyBzZWN0aW9uXG5cbiAgICB2YXIgU0VDVElPTl9ERUZBVUxUX1NFTCA9ICcuc2VjdGlvbic7XG4gICAgdmFyIFNFQ1RJT04gPSAnZnAtc2VjdGlvbic7XG4gICAgdmFyIFNFQ1RJT05fU0VMID0gJy4nICsgU0VDVElPTjtcbiAgICB2YXIgU0VDVElPTl9BQ1RJVkVfU0VMID0gU0VDVElPTl9TRUwgKyBBQ1RJVkVfU0VMO1xuICAgIHZhciBUQUJMRV9DRUxMID0gJ2ZwLXRhYmxlQ2VsbCc7XG4gICAgdmFyIFRBQkxFX0NFTExfU0VMID0gJy4nICsgVEFCTEVfQ0VMTDtcbiAgICB2YXIgQVVUT19IRUlHSFQgPSAnZnAtYXV0by1oZWlnaHQnO1xuICAgIHZhciBBVVRPX0hFSUdIVF9TRUwgPSAnLicgKyBBVVRPX0hFSUdIVDtcbiAgICB2YXIgQVVUT19IRUlHSFRfUkVTUE9OU0lWRSA9ICdmcC1hdXRvLWhlaWdodC1yZXNwb25zaXZlJztcbiAgICB2YXIgQVVUT19IRUlHSFRfUkVTUE9OU0lWRV9TRUwgPSAnLicgKyBBVVRPX0hFSUdIVF9SRVNQT05TSVZFO1xuICAgIHZhciBOT1JNQUxfU0NST0xMID0gJ2ZwLW5vcm1hbC1zY3JvbGwnO1xuXG4gICAgdmFyIFNFQ1RJT05fTkFWID0gJ2ZwLW5hdic7XG4gICAgdmFyIFNFQ1RJT05fTkFWX1NFTCA9ICcjJyArIFNFQ1RJT05fTkFWO1xuICAgIHZhciBTRUNUSU9OX05BVl9UT09MVElQID0gJ2ZwLXRvb2x0aXAnO1xuICAgIHZhciBTRUNUSU9OX05BVl9UT09MVElQX1NFTCA9ICcuJyArIFNFQ1RJT05fTkFWX1RPT0xUSVA7XG4gICAgdmFyIFNIT1dfQUNUSVZFX1RPT0xUSVAgPSAnZnAtc2hvdy1hY3RpdmUnOyAvLyBzbGlkZVxuXG4gICAgdmFyIFNMSURFX0RFRkFVTFRfU0VMID0gJy5zbGlkZSc7XG4gICAgdmFyIFNMSURFID0gJ2ZwLXNsaWRlJztcbiAgICB2YXIgU0xJREVfU0VMID0gJy4nICsgU0xJREU7XG4gICAgdmFyIFNMSURFX0FDVElWRV9TRUwgPSBTTElERV9TRUwgKyBBQ1RJVkVfU0VMO1xuICAgIHZhciBTTElERVNfV1JBUFBFUiA9ICdmcC1zbGlkZXMnO1xuICAgIHZhciBTTElERVNfV1JBUFBFUl9TRUwgPSAnLicgKyBTTElERVNfV1JBUFBFUjtcbiAgICB2YXIgU0xJREVTX0NPTlRBSU5FUiA9ICdmcC1zbGlkZXNDb250YWluZXInO1xuICAgIHZhciBTTElERVNfQ09OVEFJTkVSX1NFTCA9ICcuJyArIFNMSURFU19DT05UQUlORVI7XG4gICAgdmFyIFRBQkxFID0gJ2ZwLXRhYmxlJztcbiAgICB2YXIgT1ZFUkZMT1cgPSAnZnAtb3ZlcmZsb3cnO1xuICAgIHZhciBPVkVSRkxPV19TRUwgPSAnLicgKyBPVkVSRkxPVztcbiAgICB2YXIgSVNfT1ZFUkZMT1cgPSAnZnAtaXMtb3ZlcmZsb3cnOyAvLyBzbGlkZSBuYXZcblxuICAgIHZhciBTTElERVNfTkFWID0gJ2ZwLXNsaWRlc05hdic7XG4gICAgdmFyIFNMSURFU19OQVZfU0VMID0gJy4nICsgU0xJREVTX05BVjtcbiAgICB2YXIgU0xJREVTX05BVl9MSU5LX1NFTCA9IFNMSURFU19OQVZfU0VMICsgJyBhJztcbiAgICB2YXIgU0xJREVTX1NUWUxFRF9BUlJPVyA9ICdmcC1hcnJvdyc7XG4gICAgdmFyIFNMSURFU19BUlJPVyA9ICdmcC1jb250cm9sQXJyb3cnO1xuICAgIHZhciBTTElERVNfQVJST1dfU0VMID0gJy4nICsgU0xJREVTX0FSUk9XO1xuICAgIHZhciBTTElERVNfUFJFViA9ICdmcC1wcmV2JztcbiAgICB2YXIgU0xJREVTX1BSRVZfU0VMID0gJy4nICsgU0xJREVTX1BSRVY7XG4gICAgdmFyIFNMSURFU19BUlJPV19QUkVWX1NFTCA9IFNMSURFU19BUlJPV19TRUwgKyBTTElERVNfUFJFVl9TRUw7XG4gICAgdmFyIFNMSURFU19ORVhUID0gJ2ZwLW5leHQnO1xuICAgIHZhciBTTElERVNfTkVYVF9TRUwgPSAnLicgKyBTTElERVNfTkVYVDtcbiAgICB2YXIgU0xJREVTX0FSUk9XX05FWFRfU0VMID0gU0xJREVTX0FSUk9XX1NFTCArIFNMSURFU19ORVhUX1NFTDtcblxuICAgIHZhciBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICAgIC8vbmF2aWdhdGlvblxuICAgICAgbWVudTogZmFsc2UsXG4gICAgICBhbmNob3JzOiBbXSxcbiAgICAgIGxvY2tBbmNob3JzOiBmYWxzZSxcbiAgICAgIG5hdmlnYXRpb246IGZhbHNlLFxuICAgICAgbmF2aWdhdGlvblBvc2l0aW9uOiAncmlnaHQnLFxuICAgICAgbmF2aWdhdGlvblRvb2x0aXBzOiBbXSxcbiAgICAgIHNob3dBY3RpdmVUb29sdGlwOiBmYWxzZSxcbiAgICAgIHNsaWRlc05hdmlnYXRpb246IGZhbHNlLFxuICAgICAgc2xpZGVzTmF2UG9zaXRpb246ICdib3R0b20nLFxuICAgICAgc2Nyb2xsQmFyOiBmYWxzZSxcbiAgICAgIGh5YnJpZDogZmFsc2UsXG4gICAgICBsaWNlbnNlS2V5OiAnJyxcbiAgICAgIGNyZWRpdHM6IHtcbiAgICAgICAgXCJlbmFibGVkXCI6IHRydWUsXG4gICAgICAgIFwibGFiZWxcIjogJ01hZGUgd2l0aCBmdWxsUGFnZS5qcycsXG4gICAgICAgIFwicG9zaXRpb25cIjogJ3JpZ2h0J1xuICAgICAgfSxcbiAgICAgIC8vc2Nyb2xsaW5nXG4gICAgICBjc3MzOiB0cnVlLFxuICAgICAgc2Nyb2xsaW5nU3BlZWQ6IDcwMCxcbiAgICAgIGF1dG9TY3JvbGxpbmc6IHRydWUsXG4gICAgICBmaXRUb1NlY3Rpb246IHRydWUsXG4gICAgICBmaXRUb1NlY3Rpb25EZWxheTogNjAwLFxuICAgICAgZWFzaW5nOiAnZWFzZUluT3V0Q3ViaWMnLFxuICAgICAgZWFzaW5nY3NzMzogJ2Vhc2UnLFxuICAgICAgbG9vcEJvdHRvbTogZmFsc2UsXG4gICAgICBsb29wVG9wOiBmYWxzZSxcbiAgICAgIGxvb3BIb3Jpem9udGFsOiB0cnVlLFxuICAgICAgY29udGludW91c1ZlcnRpY2FsOiBmYWxzZSxcbiAgICAgIGNvbnRpbnVvdXNIb3Jpem9udGFsOiBmYWxzZSxcbiAgICAgIHNjcm9sbEhvcml6b250YWxseTogZmFsc2UsXG4gICAgICBpbnRlcmxvY2tlZFNsaWRlczogZmFsc2UsXG4gICAgICBkcmFnQW5kTW92ZTogZmFsc2UsXG4gICAgICBvZmZzZXRTZWN0aW9uczogZmFsc2UsXG4gICAgICByZXNldFNsaWRlcnM6IGZhbHNlLFxuICAgICAgZmFkaW5nRWZmZWN0OiBmYWxzZSxcbiAgICAgIG5vcm1hbFNjcm9sbEVsZW1lbnRzOiBudWxsLFxuICAgICAgc2Nyb2xsT3ZlcmZsb3c6IHRydWUsXG4gICAgICBzY3JvbGxPdmVyZmxvd1Jlc2V0OiBmYWxzZSxcbiAgICAgIHRvdWNoU2Vuc2l0aXZpdHk6IDUsXG4gICAgICB0b3VjaFdyYXBwZXI6IG51bGwsXG4gICAgICBiaWdTZWN0aW9uc0Rlc3RpbmF0aW9uOiBudWxsLFxuICAgICAgLy9BY2Nlc3NpYmlsaXR5XG4gICAgICBrZXlib2FyZFNjcm9sbGluZzogdHJ1ZSxcbiAgICAgIGFuaW1hdGVBbmNob3I6IHRydWUsXG4gICAgICByZWNvcmRIaXN0b3J5OiB0cnVlLFxuICAgICAgYWxsb3dDb3JyZWN0RGlyZWN0aW9uOiBmYWxzZSxcbiAgICAgIC8vZGVzaWduXG4gICAgICBzY3JvbGxPdmVyZmxvd01hY1N0eWxlOiB0cnVlLFxuICAgICAgY29udHJvbEFycm93czogdHJ1ZSxcbiAgICAgIGNvbnRyb2xBcnJvd3NIVE1MOiBbJzxkaXYgY2xhc3M9XCInICsgU0xJREVTX1NUWUxFRF9BUlJPVyArICdcIj48L2Rpdj4nLCAnPGRpdiBjbGFzcz1cIicgKyBTTElERVNfU1RZTEVEX0FSUk9XICsgJ1wiPjwvZGl2PiddLFxuICAgICAgY29udHJvbEFycm93Q29sb3I6ICcjZmZmJyxcbiAgICAgIHZlcnRpY2FsQ2VudGVyZWQ6IHRydWUsXG4gICAgICBzZWN0aW9uc0NvbG9yOiBbXSxcbiAgICAgIHBhZGRpbmdUb3A6IDAsXG4gICAgICBwYWRkaW5nQm90dG9tOiAwLFxuICAgICAgZml4ZWRFbGVtZW50czogbnVsbCxcbiAgICAgIHJlc3BvbnNpdmU6IDAsXG4gICAgICAvL2JhY2t3YXJkcyBjb21wYWJpdGlsaXR5IHdpdGggcmVzcG9uc2l2ZVdpZGR0aFxuICAgICAgcmVzcG9uc2l2ZVdpZHRoOiAwLFxuICAgICAgcmVzcG9uc2l2ZUhlaWdodDogMCxcbiAgICAgIHJlc3BvbnNpdmVTbGlkZXM6IGZhbHNlLFxuICAgICAgcGFyYWxsYXg6IGZhbHNlLFxuICAgICAgcGFyYWxsYXhPcHRpb25zOiB7XG4gICAgICAgIHR5cGU6ICdyZXZlYWwnLFxuICAgICAgICBwZXJjZW50YWdlOiA2MixcbiAgICAgICAgcHJvcGVydHk6ICd0cmFuc2xhdGUnXG4gICAgICB9LFxuICAgICAgY2FyZHM6IGZhbHNlLFxuICAgICAgY2FyZHNPcHRpb25zOiB7XG4gICAgICAgIHBlcnNwZWN0aXZlOiAxMDAsXG4gICAgICAgIGZhZGVDb250ZW50OiB0cnVlLFxuICAgICAgICBmYWRlQmFja2dyb3VuZDogdHJ1ZVxuICAgICAgfSxcbiAgICAgIC8vQ3VzdG9tIHNlbGVjdG9yc1xuICAgICAgc2VjdGlvblNlbGVjdG9yOiBTRUNUSU9OX0RFRkFVTFRfU0VMLFxuICAgICAgc2xpZGVTZWxlY3RvcjogU0xJREVfREVGQVVMVF9TRUwsXG4gICAgICAvL2V2ZW50c1xuICAgICAgYWZ0ZXJMb2FkOiBudWxsLFxuICAgICAgYmVmb3JlTGVhdmU6IG51bGwsXG4gICAgICBvbkxlYXZlOiBudWxsLFxuICAgICAgYWZ0ZXJSZW5kZXI6IG51bGwsXG4gICAgICBhZnRlclJlc2l6ZTogbnVsbCxcbiAgICAgIGFmdGVyUmVCdWlsZDogbnVsbCxcbiAgICAgIGFmdGVyU2xpZGVMb2FkOiBudWxsLFxuICAgICAgb25TbGlkZUxlYXZlOiBudWxsLFxuICAgICAgYWZ0ZXJSZXNwb25zaXZlOiBudWxsLFxuICAgICAgb25TY3JvbGxPdmVyZmxvdzogbnVsbCxcbiAgICAgIGxhenlMb2FkaW5nOiB0cnVlLFxuICAgICAgb2JzZXJ2ZXI6IHRydWVcbiAgICB9O1xuXG4gICAgdmFyIGNvbnRhaW5lciA9IG51bGw7XG4gICAgdmFyIGdfaW5pdGlhbEFuY2hvcnNJbkRvbSA9IGZhbHNlO1xuICAgIHZhciBvcmlnaW5hbHMgPSBkZWVwRXh0ZW5kKHt9LCBkZWZhdWx0T3B0aW9ucyk7IC8vZGVlcCBjb3B5XG5cbiAgICB2YXIgZ19vcHRpb25zID0gbnVsbDtcbiAgICBmdW5jdGlvbiBnZXRJbml0aWFsQW5jaG9yc0luRG9tKCkge1xuICAgICAgcmV0dXJuIGdfaW5pdGlhbEFuY2hvcnNJbkRvbTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc2V0Q29udGFpbmVyKHZhbHVlKSB7XG4gICAgICBjb250YWluZXIgPSB2YWx1ZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0Q29udGFpbmVyKHZhbHVlKSB7XG4gICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRPcHRpb25zKCkge1xuICAgICAgcmV0dXJuIGdfb3B0aW9ucyB8fCBkZWZhdWx0T3B0aW9ucztcbiAgICB9XG4gICAgZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgICBnX29wdGlvbnMgPSBkZWVwRXh0ZW5kKHt9LCBkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICBvcmlnaW5hbHMgPSBPYmplY3QuYXNzaWduKHt9LCBnX29wdGlvbnMpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRPcmlnaW5hbHMoKSB7XG4gICAgICByZXR1cm4gb3JpZ2luYWxzO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzZXRPcHRpb24obmFtZSwgdmFsdWUpIHtcbiAgICAgIGRlZmF1bHRPcHRpb25zW25hbWVdID0gdmFsdWU7XG4gICAgfVxuICAgIC8qXG4gICAgKiBTZXRzIHRoZSBzdGF0ZSBmb3IgYSB2YXJpYWJsZSB3aXRoIG11bHRpcGxlIHN0YXRlcyAob3JpZ2luYWwsIGFuZCB0ZW1wb3JhbClcbiAgICAqIFNvbWUgdmFyaWFibGVzIHN1Y2ggYXMgYGF1dG9TY3JvbGxpbmdgIG9yIGByZWNvcmRIaXN0b3J5YCBtaWdodCBjaGFuZ2UgYXV0b21hdGljYWxseSBpdHMgc3RhdGUgd2hlbiB1c2luZyBgcmVzcG9uc2l2ZWAgb3IgYGF1dG9TY3JvbGxpbmc6ZmFsc2VgLlxuICAgICogVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIGtlZXAgdHJhY2sgb2YgYm90aCBzdGF0ZXMsIHRoZSBvcmlnaW5hbCBhbmQgdGhlIHRlbXBvcmFsIG9uZS5cbiAgICAqIElmIHR5cGUgaXMgbm90ICdpbnRlcm5hbCcsIHRoZW4gd2UgYXNzdW1lIHRoZSB1c2VyIGlzIGdsb2JhbGx5IGNoYW5naW5nIHRoZSB2YXJpYWJsZS5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gc2V0VmFyaWFibGVTdGF0ZSh2YXJpYWJsZSwgdmFsdWUsIHR5cGUpIHtcbiAgICAgIGdfb3B0aW9uc1t2YXJpYWJsZV0gPSB2YWx1ZTtcblxuICAgICAgaWYgKHR5cGUgIT09ICdpbnRlcm5hbCcpIHtcbiAgICAgICAgb3JpZ2luYWxzW3ZhcmlhYmxlXSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAqIFNldHRpbmcgb3B0aW9ucyBmcm9tIERPTSBlbGVtZW50cyBpZiB0aGV5IGFyZSBub3QgcHJvdmlkZWQuXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIHNldE9wdGlvbnNGcm9tRE9NKCkge1xuICAgICAgLy9ubyBhbmNob3JzIG9wdGlvbj8gQ2hlY2tpbmcgZm9yIHRoZW0gaW4gdGhlIERPTSBhdHRyaWJ1dGVzXG4gICAgICBpZiAoIWdldE9wdGlvbnMoKS5hbmNob3JzLmxlbmd0aCkge1xuICAgICAgICB2YXIgYW5jaG9yc0F0dHJpYnV0ZSA9ICdbZGF0YS1hbmNob3JdJztcbiAgICAgICAgdmFyIGFuY2hvcnMgPSAkKGdldE9wdGlvbnMoKS5zZWN0aW9uU2VsZWN0b3Iuc3BsaXQoJywnKS5qb2luKGFuY2hvcnNBdHRyaWJ1dGUgKyAnLCcpICsgYW5jaG9yc0F0dHJpYnV0ZSwgY29udGFpbmVyKTtcblxuICAgICAgICBpZiAoYW5jaG9ycy5sZW5ndGggJiYgYW5jaG9ycy5sZW5ndGggPT09ICQoZ2V0T3B0aW9ucygpLnNlY3Rpb25TZWxlY3RvciwgY29udGFpbmVyKS5sZW5ndGgpIHtcbiAgICAgICAgICBnX2luaXRpYWxBbmNob3JzSW5Eb20gPSB0cnVlO1xuICAgICAgICAgIGFuY2hvcnMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgZ2V0T3B0aW9ucygpLmFuY2hvcnMucHVzaChnZXRBdHRyKGl0ZW0sICdkYXRhLWFuY2hvcicpLnRvU3RyaW5nKCkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9IC8vbm8gdG9vbHRpcHMgb3B0aW9uPyBDaGVja2luZyBmb3IgdGhlbSBpbiB0aGUgRE9NIGF0dHJpYnV0ZXNcblxuXG4gICAgICBpZiAoIWdldE9wdGlvbnMoKS5uYXZpZ2F0aW9uVG9vbHRpcHMubGVuZ3RoKSB7XG4gICAgICAgIHZhciB0b29sdGlwc0F0dHJpYnV0ZSA9ICdbZGF0YS10b29sdGlwXSc7XG4gICAgICAgIHZhciB0b29sdGlwcyA9ICQoZ2V0T3B0aW9ucygpLnNlY3Rpb25TZWxlY3Rvci5zcGxpdCgnLCcpLmpvaW4odG9vbHRpcHNBdHRyaWJ1dGUgKyAnLCcpICsgdG9vbHRpcHNBdHRyaWJ1dGUsIGNvbnRhaW5lcik7XG5cbiAgICAgICAgaWYgKHRvb2x0aXBzLmxlbmd0aCkge1xuICAgICAgICAgIHRvb2x0aXBzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIGdldE9wdGlvbnMoKS5uYXZpZ2F0aW9uVG9vbHRpcHMucHVzaChnZXRBdHRyKGl0ZW0sICdkYXRhLXRvb2x0aXAnKS50b1N0cmluZygpKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwbGFpbkl0ZW0gPSBmdW5jdGlvbiBwbGFpbkl0ZW0ocGFuZWwpIHtcbiAgICAgIHRoaXMuYW5jaG9yID0gcGFuZWwuYW5jaG9yO1xuICAgICAgdGhpcy5pdGVtID0gcGFuZWwuaXRlbTtcbiAgICAgIHRoaXMuaW5kZXggPSBwYW5lbC5pbmRleCgpO1xuICAgICAgdGhpcy5pc0xhc3QgPSB0aGlzLmluZGV4ID09PSBwYW5lbC5pdGVtLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChwYW5lbC5zZWxlY3RvcikubGVuZ3RoIC0gMTtcbiAgICAgIHRoaXMuaXNGaXJzdCA9ICF0aGlzLmluZGV4O1xuICAgICAgdGhpcy5pc0FjdGl2ZSA9IHBhbmVsLmlzQWN0aXZlO1xuICAgIH07XG4gICAgLyoqXG4gICAgKiBJdGVtLiBTbGlkZSBvciBTZWN0aW9uIG9iamVjdHMgc2hhcmUgdGhlIHNhbWUgcHJvcGVydGllcy5cbiAgICAqL1xuXG4gICAgdmFyIEl0ZW0gPSBmdW5jdGlvbiBJdGVtKGVsLCBzZWxlY3Rvcikge1xuICAgICAgdGhpcy5wYXJlbnQgPSB0aGlzLnBhcmVudCB8fCBudWxsO1xuICAgICAgdGhpcy5zZWxlY3RvciA9IHNlbGVjdG9yO1xuICAgICAgdGhpcy5hbmNob3IgPSBnZXRBdHRyKGVsLCAnZGF0YS1hbmNob3InKSB8fCBnZXRPcHRpb25zKCkuYW5jaG9yc1tpbmRleChlbCwgZ2V0T3B0aW9ucygpLnNlY3Rpb25TZWxlY3RvcildO1xuICAgICAgdGhpcy5pdGVtID0gZWw7XG4gICAgICB0aGlzLmlzVmlzaWJsZSA9IGlzVmlzaWJsZShlbCk7XG4gICAgICB0aGlzLmlzQWN0aXZlID0gaGFzQ2xhc3MoZWwsIEFDVElWRSk7XG4gICAgICB0aGlzLmhhc1Njcm9sbCA9IGhhc0NsYXNzKGVsLCBPVkVSRkxPVykgfHwgJChPVkVSRkxPV19TRUwsIGVsKVswXSAhPSBudWxsO1xuICAgICAgdGhpcy5pc1NlY3Rpb24gPSBzZWxlY3RvciA9PT0gZ2V0T3B0aW9ucygpLnNlY3Rpb25TZWxlY3RvcjtcbiAgICAgIHRoaXMuY29udGFpbmVyID0gY2xvc2VzdChlbCwgU0xJREVTX0NPTlRBSU5FUl9TRUwpIHx8IGNsb3Nlc3QoZWwsIFdSQVBQRVJfU0VMKTtcblxuICAgICAgdGhpcy5pbmRleCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2libGluZ3MoKS5pbmRleE9mKHRoaXMpO1xuICAgICAgfTtcbiAgICB9O1xuXG4gICAgSXRlbS5wcm90b3R5cGUuc2libGluZ3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodGhpcy5pc1NlY3Rpb24pIHtcbiAgICAgICAgaWYgKHRoaXMuaXNWaXNpYmxlKSB7XG4gICAgICAgICAgcmV0dXJuIHN0YXRlLnNlY3Rpb25zO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBzdGF0ZS5zZWN0aW9uc0luY2x1ZGluZ0hpZGRlbjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC5zbGlkZXMgOiAwO1xuICAgIH07XG5cbiAgICBJdGVtLnByb3RvdHlwZS5wcmV2ID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHNpYmxpbmdzID0gdGhpcy5zaWJsaW5ncygpO1xuICAgICAgdmFyIGN1cnJlbnRJbmRleCA9IHRoaXMuaXNTZWN0aW9uID8gc2libGluZ3MuaW5kZXhPZih0aGlzKSA6IHRoaXMucGFyZW50LnNsaWRlcy5pbmRleE9mKHRoaXMpO1xuICAgICAgdmFyIHByZXZJbmRleCA9IGN1cnJlbnRJbmRleCAtIDE7XG5cbiAgICAgIGlmIChwcmV2SW5kZXggPj0gMCkge1xuICAgICAgICByZXR1cm4gc2libGluZ3NbcHJldkluZGV4XTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcblxuICAgIEl0ZW0ucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgc2libGluZ3MgPSB0aGlzLnNpYmxpbmdzKCk7XG4gICAgICB2YXIgY3VycmVudEluZGV4ID0gdGhpcy5pc1NlY3Rpb24gPyBzaWJsaW5ncy5pbmRleE9mKHRoaXMpIDogdGhpcy5wYXJlbnQuc2xpZGVzLmluZGV4T2YodGhpcyk7XG4gICAgICB2YXIgbmV4dEluZGV4ID0gY3VycmVudEluZGV4ICsgMTtcblxuICAgICAgaWYgKG5leHRJbmRleCA8IHNpYmxpbmdzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gc2libGluZ3NbbmV4dEluZGV4XTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcblxuICAgIEl0ZW0ucHJvdG90eXBlW1wicHJldlBhbmVsXCJdID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMucHJldigpIHx8ICh0aGlzLnBhcmVudCA/IHRoaXMucGFyZW50LnByZXYoKSA6IG51bGwpO1xuICAgIH07XG5cbiAgICBJdGVtLnByb3RvdHlwZVtcIm5leHRQYW5lbFwiXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLm5leHQoKSB8fCAodGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC5uZXh0KCkgOiBudWxsKTtcbiAgICB9O1xuXG4gICAgSXRlbS5wcm90b3R5cGUuZ2V0U2libGluZ3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodGhpcy5pc1NlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIHN0YXRlLnNlY3Rpb25zO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc3RhdGUucGFuZWxzO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBnZXROb2RlcyhwYW5lbHMpIHtcbiAgICAgIHJldHVybiBwYW5lbHMubWFwKGZ1bmN0aW9uIChwYW5lbCkge1xuICAgICAgICByZXR1cm4gcGFuZWwuaXRlbTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRQYW5lbEJ5RWxlbWVudChwYW5lbHMsIGVsKSB7XG4gICAgICByZXR1cm4gcGFuZWxzLmZpbmQoZnVuY3Rpb24gKHBhbmVsKSB7XG4gICAgICAgIHJldHVybiBwYW5lbC5pdGVtID09PSBlbDtcbiAgICAgIH0pO1xuICAgIH1cbiAgICB2YXIgU2VjdGlvbiA9IGZ1bmN0aW9uIFNlY3Rpb24oZWwpIHtcbiAgICAgIHBsYWluSXRlbS5jYWxsKHRoaXMsIGVsKTtcbiAgICB9O1xuICAgIHZhciBTbGlkZSA9IGZ1bmN0aW9uIFNsaWRlKGVsKSB7XG4gICAgICBwbGFpbkl0ZW0uY2FsbCh0aGlzLCBlbCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICogR2V0cyB0aGUgYWN0aXZlIHNsaWRlIChvciBzZWN0aW9uKSBmb3IgdGhlIGdpdmVuIHNlY3Rpb25cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gZ2V0U2xpZGVPclNlY3Rpb24oZGVzdGlueSkge1xuICAgICAgdmFyIHNsaWRlID0gJChTTElERV9BQ1RJVkVfU0VMLCBkZXN0aW55KTtcblxuICAgICAgaWYgKHNsaWRlLmxlbmd0aCkge1xuICAgICAgICBkZXN0aW55ID0gc2xpZGVbMF07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkZXN0aW55O1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRTbGlkZU9yU2VjdGlvblBhbmVsKHBhbmVsKSB7XG4gICAgICBpZiAoIXBhbmVsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcGFuZWwuYWN0aXZlU2xpZGUgPyBwYW5lbC5hY3RpdmVTbGlkZSA6IHBhbmVsO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc0Z1bGxQYWdlQWJvdmUoKSB7XG4gICAgICByZXR1cm4gZ2V0Q29udGFpbmVyKCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuYm90dG9tID49IDA7XG4gICAgfVxuICAgIC8qKlxuICAgICogR2V0cyB0aGUgc2Nyb2xsaW5nIHNldHRpbmdzIGRlcGVuZGluZyBvbiB0aGUgcGx1Z2luIGF1dG9TY3JvbGxpbmcgb3B0aW9uXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIGdldFNjcm9sbFNldHRpbmdzKHRvcCkge1xuICAgICAgdmFyIG9wdGlvbnMgPSBnZXRPcHRpb25zKCk7XG4gICAgICB2YXIgcG9zaXRpb247XG4gICAgICB2YXIgZWxlbWVudDsgLy90b3AgcHJvcGVydHkgYW5pbWF0aW9uXG5cbiAgICAgIGlmIChvcHRpb25zLmF1dG9TY3JvbGxpbmcgJiYgIW9wdGlvbnMuc2Nyb2xsQmFyKSB7XG4gICAgICAgIHBvc2l0aW9uID0gLXRvcDtcbiAgICAgICAgZWxlbWVudCA9ICQoV1JBUFBFUl9TRUwpWzBdO1xuICAgICAgfSAvL3dpbmRvdyByZWFsIHNjcm9sbGluZ1xuICAgICAgZWxzZSB7XG4gICAgICAgIHBvc2l0aW9uID0gdG9wO1xuICAgICAgICBlbGVtZW50ID0gd2luZG93O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBvcHRpb25zOiBwb3NpdGlvbixcbiAgICAgICAgZWxlbWVudDogZWxlbWVudFxuICAgICAgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBTY3JvbGxzIHRoZSBwYWdlIC8gc2xpZGVyIHRoZSBnaXZlbiBudW1iZXIgb2YgcGl4ZWxzLlxuICAgICogSXQgd2lsbCBkbyBpdCBvbmUgb3IgYW5vdGhlciB3YXkgZGVwZW5kaW9uZyBvbiB0aGUgbGlicmFyeSdzIGNvbmZpZy5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gc2V0U2Nyb2xsaW5nKGVsZW1lbnQsIHZhbCkge1xuICAgICAgaWYgKCFnZXRPcHRpb25zKCkuYXV0b1Njcm9sbGluZyB8fCBnZXRPcHRpb25zKCkuc2Nyb2xsQmFyIHx8IGVsZW1lbnQuc2VsZiAhPSB3aW5kb3cgJiYgaGFzQ2xhc3MoZWxlbWVudCwgU0xJREVTX1dSQVBQRVIpKSB7XG4gICAgICAgIC8vc2Nyb2xsaW5nIGhvcml6b250YWxseSB0aHJvdWdoIHRoZSBzbGlkZXM/XG4gICAgICAgIGlmIChlbGVtZW50LnNlbGYgIT0gd2luZG93ICYmIGhhc0NsYXNzKGVsZW1lbnQsIFNMSURFU19XUkFQUEVSKSkge1xuICAgICAgICAgIGVsZW1lbnQuc2Nyb2xsTGVmdCA9IHZhbDtcbiAgICAgICAgfSAvL3ZlcnRpY2FsIHNjcm9sbFxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBlbGVtZW50LnNjcm9sbFRvKDAsIHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUudG9wID0gdmFsICsgJ3B4JztcbiAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgKiBBZGRzIHRyYW5zaXRpb24gYW5pbWF0aW9ucyBmb3IgdGhlIGdpdmVuIGVsZW1lbnRcbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gYWRkQW5pbWF0aW9uKGVsZW1lbnQpIHtcbiAgICAgIHZhciB0cmFuc2l0aW9uID0gJ3RyYW5zZm9ybSAnICsgZ2V0T3B0aW9ucygpLnNjcm9sbGluZ1NwZWVkICsgJ21zICcgKyBnZXRPcHRpb25zKCkuZWFzaW5nY3NzMztcbiAgICAgIHJlbW92ZUNsYXNzKGVsZW1lbnQsIE5PX1RSQU5TSVRJT04pO1xuICAgICAgcmV0dXJuIGNzcyhlbGVtZW50LCB7XG4gICAgICAgICctd2Via2l0LXRyYW5zaXRpb24nOiB0cmFuc2l0aW9uLFxuICAgICAgICAndHJhbnNpdGlvbic6IHRyYW5zaXRpb25cbiAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAqIFJldHVucyBgdXBgIG9yIGBkb3duYCBkZXBlbmRpbmcgb24gdGhlIHNjcm9sbGluZyBtb3ZlbWVudCB0byByZWFjaCBpdHMgZGVzdGluYXRpb25cbiAgICAqIGZyb20gdGhlIGN1cnJlbnQgc2VjdGlvbi5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gZ2V0WW1vdmVtZW50KGFjdGl2ZVNlY3Rpb24sIGRlc3RpbnkpIHtcbiAgICAgIHZhciBmcm9tSW5kZXggPSBhY3RpdmVTZWN0aW9uLmluZGV4KCk7XG4gICAgICB2YXIgdG9JbmRleCA9IGluZGV4KGRlc3RpbnksIFNFQ1RJT05fU0VMKTtcblxuICAgICAgaWYgKGZyb21JbmRleCA9PSB0b0luZGV4KSB7XG4gICAgICAgIHJldHVybiAnbm9uZSc7XG4gICAgICB9XG5cbiAgICAgIGlmIChmcm9tSW5kZXggPiB0b0luZGV4KSB7XG4gICAgICAgIHJldHVybiAndXAnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gJ2Rvd24nO1xuICAgIH1cbiAgICAvKipcbiAgICAqIFJlbW92ZSB0cmFuc2l0aW9uIGFuaW1hdGlvbnMgZm9yIHRoZSBnaXZlbiBlbGVtZW50XG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIHJlbW92ZUFuaW1hdGlvbihlbGVtZW50KSB7XG4gICAgICByZXR1cm4gYWRkQ2xhc3MoZWxlbWVudCwgTk9fVFJBTlNJVElPTik7XG4gICAgfVxuICAgIC8qKlxuICAgICogUmV0dXJucyB0aGUgY3Jvc3MtYnJvd3NlciB0cmFuc2Zvcm0gc3RyaW5nLlxuICAgICovXG5cbiAgICBmdW5jdGlvbiBnZXRUcmFuc2Zvcm1zKHRyYW5zbGF0ZTNkKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAnLXdlYmtpdC10cmFuc2Zvcm0nOiB0cmFuc2xhdGUzZCxcbiAgICAgICAgJy1tb3otdHJhbnNmb3JtJzogdHJhbnNsYXRlM2QsXG4gICAgICAgICctbXMtdHJhbnNmb3JtJzogdHJhbnNsYXRlM2QsXG4gICAgICAgICd0cmFuc2Zvcm0nOiB0cmFuc2xhdGUzZFxuICAgICAgfTtcbiAgICB9XG5cbiAgICB2YXIgc2lsZW50U2Nyb2xsSWQ7XG4gICAgLyoqXG4gICAgKiBBZGRzIGEgY3NzMyB0cmFuc2Zvcm0gcHJvcGVydHkgdG8gdGhlIGNvbnRhaW5lciBjbGFzcyB3aXRoIG9yIHdpdGhvdXQgYW5pbWF0aW9uIGRlcGVuZGluZyBvbiB0aGUgYW5pbWF0ZWQgcGFyYW0uXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIHRyYW5zZm9ybUNvbnRhaW5lcih0cmFuc2xhdGUzZCwgYW5pbWF0ZWQpIHtcbiAgICAgIGlmIChhbmltYXRlZCkge1xuICAgICAgICBhZGRBbmltYXRpb24oZ2V0Q29udGFpbmVyKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVtb3ZlQW5pbWF0aW9uKGdldENvbnRhaW5lcigpKTtcbiAgICAgIH1cblxuICAgICAgY2xlYXJUaW1lb3V0KHNpbGVudFNjcm9sbElkKTtcbiAgICAgIGNzcyhnZXRDb250YWluZXIoKSwgZ2V0VHJhbnNmb3Jtcyh0cmFuc2xhdGUzZCkpO1xuICAgICAgRlAudGVzdC50cmFuc2xhdGUzZCA9IHRyYW5zbGF0ZTNkOyAvL3N5bmNyb25vdXNseSByZW1vdmluZyB0aGUgY2xhc3MgYWZ0ZXIgdGhlIGFuaW1hdGlvbiBoYXMgYmVlbiBhcHBsaWVkLlxuXG4gICAgICBzaWxlbnRTY3JvbGxJZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICByZW1vdmVDbGFzcyhnZXRDb250YWluZXIoKSwgTk9fVFJBTlNJVElPTik7XG4gICAgICB9LCAxMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBTY3JvbGxzIHNpbGVudGx5ICh3aXRoIG5vIGFuaW1hdGlvbikgdGhlIHBhZ2UgdG8gdGhlIGdpdmVuIFkgcG9zaXRpb24uXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIHNpbGVudFNjcm9sbCh0b3ApIHtcbiAgICAgIC8vIFRoZSBmaXJzdCBzZWN0aW9uIGNhbiBoYXZlIGEgbmVnYXRpdmUgdmFsdWUgaW4gaU9TIDEwLiBOb3QgcXVpdGUgc3VyZSB3aHk6IC0wLjAxNDI4MjIyNjU2MjVcbiAgICAgIC8vIHRoYXQncyB3aHkgd2Ugcm91bmQgaXQgdG8gMC5cbiAgICAgIHZhciByb3VuZGVkVG9wID0gTWF0aC5yb3VuZCh0b3ApO1xuXG4gICAgICBpZiAoZ2V0T3B0aW9ucygpLmNzczMgJiYgZ2V0T3B0aW9ucygpLmF1dG9TY3JvbGxpbmcgJiYgIWdldE9wdGlvbnMoKS5zY3JvbGxCYXIpIHtcbiAgICAgICAgdmFyIHRyYW5zbGF0ZTNkID0gJ3RyYW5zbGF0ZTNkKDBweCwgLScgKyByb3VuZGVkVG9wICsgJ3B4LCAwcHgpJztcbiAgICAgICAgdHJhbnNmb3JtQ29udGFpbmVyKHRyYW5zbGF0ZTNkLCBmYWxzZSk7XG4gICAgICB9IGVsc2UgaWYgKGdldE9wdGlvbnMoKS5hdXRvU2Nyb2xsaW5nICYmICFnZXRPcHRpb25zKCkuc2Nyb2xsQmFyKSB7XG4gICAgICAgIGNzcyhnZXRDb250YWluZXIoKSwge1xuICAgICAgICAgICd0b3AnOiAtcm91bmRlZFRvcCArICdweCdcbiAgICAgICAgfSk7XG4gICAgICAgIEZQLnRlc3QudG9wID0gLXJvdW5kZWRUb3AgKyAncHgnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHNjcm9sbFNldHRpbmdzID0gZ2V0U2Nyb2xsU2V0dGluZ3Mocm91bmRlZFRvcCk7XG4gICAgICAgIHNldFNjcm9sbGluZyhzY3JvbGxTZXR0aW5ncy5lbGVtZW50LCBzY3JvbGxTZXR0aW5ncy5vcHRpb25zKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBGUC5zZXRTY3JvbGxpbmdTcGVlZCA9IHNldFNjcm9sbGluZ1NwZWVkO1xuICAgIC8qKlxuICAgICogRGVmaW5lcyB0aGUgc2Nyb2xsaW5nIHNwZWVkXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIHNldFNjcm9sbGluZ1NwZWVkKHZhbHVlLCB0eXBlKSB7XG4gICAgICBzZXRWYXJpYWJsZVN0YXRlKCdzY3JvbGxpbmdTcGVlZCcsIHZhbHVlLCB0eXBlKTtcbiAgICB9XG5cbiAgICB2YXIgJGJvZHkgPSBudWxsO1xuICAgIHZhciAkaHRtbCA9IG51bGw7XG4gICAgdmFyICRodG1sQm9keSA9IG51bGw7IC8vIGNhY2hpbmcgY29tbW9uIGVsZW1lbnRzXG5cbiAgICBmdW5jdGlvbiBzZXRDYWNoZSgpIHtcbiAgICAgICRib2R5ID0gJCgnYm9keScpWzBdO1xuICAgICAgJGh0bWwgPSAkKCdodG1sJylbMF07XG4gICAgICAkaHRtbEJvZHkgPSAkKCdodG1sLCBib2R5Jyk7XG4gICAgfVxuXG4gICAgLy9AdHMtY2hlY2tcblxuICAgIHZhciBfZ19hbmltYXRlU2Nyb2xsO1xuICAgIC8qKlxuICAgICogU2ltdWxhdGVzIHRoZSBhbmltYXRlZCBzY3JvbGxUb3Agb2YgalF1ZXJ5LiBVc2VkIHdoZW4gY3NzMzpmYWxzZSBvciBzY3JvbGxCYXI6dHJ1ZSBvciBhdXRvU2Nyb2xsaW5nOmZhbHNlXG4gICAgKiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xNjEzNjc4OS8xMDgxMzk2XG4gICAgKi9cblxuXG4gICAgZnVuY3Rpb24gc2Nyb2xsVG8oZWxlbWVudCwgdG8sIGR1cmF0aW9uLCBjYWxsYmFjaykge1xuICAgICAgdmFyIHN0YXJ0ID0gZ2V0U2Nyb2xsZWRQb3NpdGlvbihlbGVtZW50KTtcbiAgICAgIHZhciBjaGFuZ2UgPSB0byAtIHN0YXJ0O1xuICAgICAgdmFyIGlzQ2FsbGJhY2tGaXJlZCA9IGZhbHNlO1xuICAgICAgdmFyIHN0YXJ0VGltZTtcbiAgICAgIHZhciB3YXNBbmltYXRpb25BY3RpdmUgPSBzdGF0ZS5hY3RpdmVBbmltYXRpb247XG4gICAgICBzZXRTdGF0ZSh7XG4gICAgICAgIGFjdGl2ZUFuaW1hdGlvbjogdHJ1ZVxuICAgICAgfSk7IC8vIENhbmNlbGxpbmcgYW55IHBvc3NpYmxlIHByZXZpb3VzIGFuaW1hdGlvbnMgKGlvOiBjbGlja2luZyBvbiBuYXYgZG90cyB2ZXJ5IGZhc3QpXG5cbiAgICAgIGlmIChfZ19hbmltYXRlU2Nyb2xsKSB7XG4gICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShfZ19hbmltYXRlU2Nyb2xsKTtcbiAgICAgIH1cblxuICAgICAgX2dfYW5pbWF0ZVNjcm9sbCA9IGZ1bmN0aW9uIGdfYW5pbWF0ZVNjcm9sbCh0aW1lc3RhbXApIHtcbiAgICAgICAgaWYgKCFzdGFydFRpbWUpIHtcbiAgICAgICAgICBzdGFydFRpbWUgPSB0aW1lc3RhbXA7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY3VycmVudFRpbWUgPSBNYXRoLmZsb29yKHRpbWVzdGFtcCAtIHN0YXJ0VGltZSk7XG5cbiAgICAgICAgaWYgKHN0YXRlLmFjdGl2ZUFuaW1hdGlvbikge1xuICAgICAgICAgIC8vaW4gb3JkZXIgdG8gc3RvcGUgaXQgZnJvbSBvdGhlciBmdW5jdGlvbiB3aGVuZXZlciB3ZSB3YW50XG4gICAgICAgICAgdmFyIHZhbCA9IHRvO1xuXG4gICAgICAgICAgaWYgKGR1cmF0aW9uKSB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICB2YWwgPSB3aW4uZnBfZWFzaW5nc1tnZXRPcHRpb25zKCkuZWFzaW5nXShjdXJyZW50VGltZSwgc3RhcnQsIGNoYW5nZSwgZHVyYXRpb24pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChjdXJyZW50VGltZSA8PSBkdXJhdGlvbikge1xuICAgICAgICAgICAgc2V0U2Nyb2xsaW5nKGVsZW1lbnQsIHZhbCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGN1cnJlbnRUaW1lIDwgZHVyYXRpb24pIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoX2dfYW5pbWF0ZVNjcm9sbCk7XG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICd1bmRlZmluZWQnICYmICFpc0NhbGxiYWNrRmlyZWQpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgICAgIGFjdGl2ZUFuaW1hdGlvbjogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaXNDYWxsYmFja0ZpcmVkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoIWlzQ2FsbGJhY2tGaXJlZCAmJiAhd2FzQW5pbWF0aW9uQWN0aXZlKSB7XG4gICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgICBhY3RpdmVBbmltYXRpb246IGZhbHNlXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaXNDYWxsYmFja0ZpcmVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShfZ19hbmltYXRlU2Nyb2xsKTtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBHZXR0aW5nIHRoZSBwb3NpdGlvbiBvZiB0aGUgZWxlbWVudCB0byBzY3JvbGwgd2hlbiB1c2luZyBqUXVlcnkgYW5pbWF0aW9uc1xuICAgICovXG5cbiAgICBmdW5jdGlvbiBnZXRTY3JvbGxlZFBvc2l0aW9uKGVsZW1lbnQpIHtcbiAgICAgIHZhciBwb3NpdGlvbjsgLy9pcyBub3QgdGhlIHdpbmRvdyBlbGVtZW50IGFuZCBpcyBhIHNsaWRlP1xuXG4gICAgICBpZiAoZWxlbWVudC5zZWxmICE9IHdpbiAmJiBoYXNDbGFzcyhlbGVtZW50LCBTTElERVNfV1JBUFBFUikpIHtcbiAgICAgICAgcG9zaXRpb24gPSBlbGVtZW50LnNjcm9sbExlZnQ7XG4gICAgICB9IGVsc2UgaWYgKCFnZXRPcHRpb25zKCkuYXV0b1Njcm9sbGluZyB8fCBnZXRPcHRpb25zKCkuc2Nyb2xsQmFyKSB7XG4gICAgICAgIHBvc2l0aW9uID0gZ2V0U2Nyb2xsVG9wKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwb3NpdGlvbiA9IGVsZW1lbnQub2Zmc2V0VG9wO1xuICAgICAgfSAvL2dldHMgdGhlIHRvcCBwcm9wZXJ0eSBvZiB0aGUgd3JhcHBlclxuXG5cbiAgICAgIHJldHVybiBwb3NpdGlvbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIE1ha2VzIHN1cmUgdG8gb25seSBjcmVhdGUgYSBQYW5lbCBvYmplY3QgaWYgdGhlIGVsZW1lbnQgZXhpc3RcbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gbnVsbE9yU2VjdGlvbihlbCkge1xuICAgICAgaWYgKGVsICYmICFlbC5pdGVtKSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VjdGlvbihuZXcgU2VjdGlvblBhbmVsKGVsKSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBlbCA/IG5ldyBTZWN0aW9uKGVsKSA6IG51bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbnVsbE9yU2xpZGUoZWwpIHtcbiAgICAgIHJldHVybiBlbCA/IG5ldyBTbGlkZShlbCkgOiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICogRGlzcGF0Y2ggZXZlbnRzICYgY2FsbGJhY2tzXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIGZpcmVDYWxsYmFjayhldmVudE5hbWUsIHYpIHtcbiAgICAgIHZhciBldmVudERhdGEgPSBnZXRFdmVudERhdGEoZXZlbnROYW1lLCB2KTtcbiAgICAgIHRyaWdnZXIoZ2V0Q29udGFpbmVyKCksIGV2ZW50TmFtZSwgZXZlbnREYXRhKTtcblxuICAgICAgaWYgKGdldE9wdGlvbnMoKVtldmVudE5hbWVdLmFwcGx5KGV2ZW50RGF0YVtPYmplY3Qua2V5cyhldmVudERhdGEpWzBdXSwgdG9BcnJheShldmVudERhdGEpKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBHZXRzIHRoZSBldmVudCdzIGRhdGEgZm9yIHRoZSBnaXZlbiBldmVudCBvbiB0aGUgcmlnaHQgZm9ybWF0LlxuICAgICovXG5cbiAgICBmdW5jdGlvbiBnZXRFdmVudERhdGEoZXZlbnROYW1lLCB2KSB7XG4gICAgICAvL3VzaW5nIGZ1bmN0aW9ucyB0byBydW4gb25seSB0aGUgbmVjZXNzYXJ5IGJpdHMgd2l0aGluIHRoZSBvYmplY3RcbiAgICAgIHZhciBwYXJhbXNQZXJFdmVudCA9IHtcbiAgICAgICAgYWZ0ZXJSZW5kZXI6IGZ1bmN0aW9uIGFmdGVyUmVuZGVyKCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzZWN0aW9uOiBudWxsT3JTZWN0aW9uKGdldFN0YXRlKCkuYWN0aXZlU2VjdGlvbiksXG4gICAgICAgICAgICBzbGlkZTogbnVsbE9yU2xpZGUoZ2V0U3RhdGUoKS5hY3RpdmVTZWN0aW9uLmFjdGl2ZVNsaWRlKVxuICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIG9uTGVhdmU6IGZ1bmN0aW9uIG9uTGVhdmUoKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9yaWdpbjogbnVsbE9yU2VjdGlvbih2Lml0ZW1zLm9yaWdpbiksXG4gICAgICAgICAgICBkZXN0aW5hdGlvbjogbnVsbE9yU2VjdGlvbih2Lml0ZW1zLmRlc3RpbmF0aW9uKSxcbiAgICAgICAgICAgIGRpcmVjdGlvbjogdi5kaXJlY3Rpb24sXG4gICAgICAgICAgICB0cmlnZ2VyOiBnZXRTdGF0ZSgpLnNjcm9sbFRyaWdnZXJcbiAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBhZnRlckxvYWQ6IGZ1bmN0aW9uIGFmdGVyTG9hZCgpIHtcbiAgICAgICAgICByZXR1cm4gcGFyYW1zUGVyRXZlbnQub25MZWF2ZSgpO1xuICAgICAgICB9LFxuICAgICAgICBhZnRlclNsaWRlTG9hZDogZnVuY3Rpb24gYWZ0ZXJTbGlkZUxvYWQoKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNlY3Rpb246IG51bGxPclNlY3Rpb24odi5pdGVtcy5zZWN0aW9uKSxcbiAgICAgICAgICAgIG9yaWdpbjogbnVsbE9yU2VjdGlvbih2Lml0ZW1zLm9yaWdpbiksXG4gICAgICAgICAgICBkZXN0aW5hdGlvbjogbnVsbE9yU2VjdGlvbih2Lml0ZW1zLmRlc3RpbmF0aW9uKSxcbiAgICAgICAgICAgIGRpcmVjdGlvbjogdi5kaXJlY3Rpb24sXG4gICAgICAgICAgICB0cmlnZ2VyOiBnZXRTdGF0ZSgpLnNjcm9sbFRyaWdnZXJcbiAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBvblNsaWRlTGVhdmU6IGZ1bmN0aW9uIG9uU2xpZGVMZWF2ZSgpIHtcbiAgICAgICAgICByZXR1cm4gcGFyYW1zUGVyRXZlbnQuYWZ0ZXJTbGlkZUxvYWQoKTtcbiAgICAgICAgfSxcbiAgICAgICAgYmVmb3JlTGVhdmU6IGZ1bmN0aW9uIGJlZm9yZUxlYXZlKCkge1xuICAgICAgICAgIHJldHVybiBwYXJhbXNQZXJFdmVudC5vbkxlYXZlKCk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uU2Nyb2xsT3ZlcmZsb3c6IGZ1bmN0aW9uIG9uU2Nyb2xsT3ZlcmZsb3coKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNlY3Rpb246IG51bGxPclNlY3Rpb24oZ2V0U3RhdGUoKS5hY3RpdmVTZWN0aW9uKSxcbiAgICAgICAgICAgIHNsaWRlOiBudWxsT3JTbGlkZShnZXRTdGF0ZSgpLmFjdGl2ZVNlY3Rpb24uYWN0aXZlU2xpZGUpLFxuICAgICAgICAgICAgcG9zaXRpb246IHYucG9zaXRpb24sXG4gICAgICAgICAgICBkaXJlY3Rpb246IHYuZGlyZWN0aW9uXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJldHVybiBwYXJhbXNQZXJFdmVudFtldmVudE5hbWVdKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBQbGF5cyB2aWRlbyBhbmQgYXVkaW8gZWxlbWVudHMuXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIHBsYXlNZWRpYShkZXN0aW55KSB7XG4gICAgICB2YXIgcGFuZWwgPSBnZXRTbGlkZU9yU2VjdGlvbihkZXN0aW55KTsgLy9wbGF5aW5nIEhUTUw1IG1lZGlhIGVsZW1lbnRzXG5cbiAgICAgICQoJ3ZpZGVvLCBhdWRpbycsIHBhbmVsKS5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnZGF0YS1hdXRvcGxheScpICYmIHR5cGVvZiBlbGVtZW50LnBsYXkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBlbGVtZW50LnBsYXkoKTtcbiAgICAgICAgfVxuICAgICAgfSk7IC8veW91dHViZSB2aWRlb3NcblxuICAgICAgJCgnaWZyYW1lW3NyYyo9XCJ5b3V0dWJlLmNvbS9lbWJlZC9cIl0nLCBwYW5lbCkuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2RhdGEtYXV0b3BsYXknKSkge1xuICAgICAgICAgIHBsYXlZb3V0dWJlKGVsZW1lbnQpO1xuICAgICAgICB9IC8vaW4gY2FzZSB0aGUgVVJMIHdhcyBub3QgbG9hZGVkIHlldC4gT24gcGFnZSBsb2FkIHdlIG5lZWQgdGltZSBmb3IgdGhlIG5ldyBVUkwgKHdpdGggdGhlIEFQSSBzdHJpbmcpIHRvIGxvYWQuXG5cblxuICAgICAgICBlbGVtZW50Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2RhdGEtYXV0b3BsYXknKSkge1xuICAgICAgICAgICAgcGxheVlvdXR1YmUoZWxlbWVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICogUGxheXMgYSB5b3V0dWJlIHZpZGVvXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIHBsYXlZb3V0dWJlKGVsZW1lbnQpIHtcbiAgICAgIGVsZW1lbnQuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZSgne1wiZXZlbnRcIjpcImNvbW1hbmRcIixcImZ1bmNcIjpcInBsYXlWaWRlb1wiLFwiYXJnc1wiOlwiXCJ9JywgJyonKTtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBTdG9wcyB2aWRlbyBhbmQgYXVkaW8gZWxlbWVudHMuXG4gICAgKi9cblxuXG4gICAgZnVuY3Rpb24gc3RvcE1lZGlhKGRlc3RpbnkpIHtcbiAgICAgIHZhciBwYW5lbCA9IGdldFNsaWRlT3JTZWN0aW9uKGRlc3RpbnkpOyAvL3N0b3BwaW5nIEhUTUw1IG1lZGlhIGVsZW1lbnRzXG5cbiAgICAgICQoJ3ZpZGVvLCBhdWRpbycsIHBhbmVsKS5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIGlmICghZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2RhdGEta2VlcHBsYXlpbmcnKSAmJiB0eXBlb2YgZWxlbWVudC5wYXVzZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGVsZW1lbnQucGF1c2UoKTtcbiAgICAgICAgfVxuICAgICAgfSk7IC8veW91dHViZSB2aWRlb3NcblxuICAgICAgJCgnaWZyYW1lW3NyYyo9XCJ5b3V0dWJlLmNvbS9lbWJlZC9cIl0nLCBwYW5lbCkuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICBpZiAoL3lvdXR1YmVcXC5jb21cXC9lbWJlZFxcLy8udGVzdChnZXRBdHRyKGVsZW1lbnQsICdzcmMnKSkgJiYgIWVsZW1lbnQuaGFzQXR0cmlidXRlKCdkYXRhLWtlZXBwbGF5aW5nJykpIHtcbiAgICAgICAgICBlbGVtZW50LmNvbnRlbnRXaW5kb3cucG9zdE1lc3NhZ2UoJ3tcImV2ZW50XCI6XCJjb21tYW5kXCIsXCJmdW5jXCI6XCJwYXVzZVZpZGVvXCIsXCJhcmdzXCI6XCJcIn0nLCAnKicpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgLypcbiAgICAqIEVuYWJsZXMgdGhlIFlvdXR1YmUgdmlkZW9zIEFQSSBzbyB3ZSBjYW4gY29udHJvbCB0aGVpciBmbG93IGlmIG5lY2Vzc2FyeS5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gZW5hYmxlWW91dHViZUFQSSgpIHtcbiAgICAgICQoJ2lmcmFtZVtzcmMqPVwieW91dHViZS5jb20vZW1iZWQvXCJdJywgZ2V0Q29udGFpbmVyKCkpLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgYWRkVVJMUGFyYW0oaXRlbSwgJ2VuYWJsZWpzYXBpPTEnKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAqIEFkZHMgYSBuZXcgcGFyYW1ldGVyIGFuZCBpdHMgdmFsdWUgdG8gdGhlIGBzcmNgIG9mIGEgZ2l2ZW4gZWxlbWVudFxuICAgICovXG5cbiAgICBmdW5jdGlvbiBhZGRVUkxQYXJhbShlbGVtZW50LCBuZXdQYXJhbSkge1xuICAgICAgdmFyIG9yaWdpbmFsU3JjID0gZ2V0QXR0cihlbGVtZW50LCAnc3JjJyk7XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnc3JjJywgb3JpZ2luYWxTcmMgKyBnZXRVcmxQYXJhbVNpZ24ob3JpZ2luYWxTcmMpICsgbmV3UGFyYW0pO1xuICAgIH1cbiAgICAvKlxuICAgICogUmV0dXJucyB0aGUgcHJlZml4IHNpZ24gdG8gdXNlIGZvciBhIG5ldyBwYXJhbWV0ZXIgaW4gYW4gZXhpc3RlbiBVUkwuXG4gICAgKlxuICAgICogQHJldHVybiB7U3RyaW5nfSAgPyB8ICZcbiAgICAqL1xuXG5cbiAgICBmdW5jdGlvbiBnZXRVcmxQYXJhbVNpZ24odXJsKSB7XG4gICAgICByZXR1cm4gIS9cXD8vLnRlc3QodXJsKSA/ICc/JyA6ICcmJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIExhenkgbG9hZHMgaW1hZ2UsIHZpZGVvIGFuZCBhdWRpbyBlbGVtZW50cy5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gbGF6eUxvYWQoZGVzdGlueSkge1xuICAgICAgaWYgKCFnZXRPcHRpb25zKCkubGF6eUxvYWRpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgcGFuZWwgPSBnZXRTbGlkZU9yU2VjdGlvbihkZXN0aW55KTtcbiAgICAgICQoJ2ltZ1tkYXRhLXNyY10sIGltZ1tkYXRhLXNyY3NldF0sIHNvdXJjZVtkYXRhLXNyY10sIHNvdXJjZVtkYXRhLXNyY3NldF0sIHZpZGVvW2RhdGEtc3JjXSwgYXVkaW9bZGF0YS1zcmNdLCBpZnJhbWVbZGF0YS1zcmNdJywgcGFuZWwpLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgWydzcmMnLCAnc3Jjc2V0J10uZm9yRWFjaChmdW5jdGlvbiAodHlwZSkge1xuICAgICAgICAgIHZhciBhdHRyaWJ1dGUgPSBnZXRBdHRyKGVsZW1lbnQsICdkYXRhLScgKyB0eXBlKTtcblxuICAgICAgICAgIGlmIChhdHRyaWJ1dGUgIT0gbnVsbCAmJiBhdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgIHNldFNyYyhlbGVtZW50LCB0eXBlKTtcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKG1hdGNoZXMoZWxlbWVudCwgJ3NvdXJjZScpKSB7XG4gICAgICAgICAgdmFyIGVsZW1lbnRUb1BsYXkgPSBjbG9zZXN0KGVsZW1lbnQsICd2aWRlbywgYXVkaW8nKTtcblxuICAgICAgICAgIGlmIChlbGVtZW50VG9QbGF5KSB7XG4gICAgICAgICAgICBlbGVtZW50VG9QbGF5LmxvYWQoKTtcblxuICAgICAgICAgICAgZWxlbWVudFRvUGxheS5vbmxvYWRlZGRhdGEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBTZXRzIGEgY2xhc3MgZm9yIHRoZSBib2R5IG9mIHRoZSBwYWdlIGRlcGVuZGluZyBvbiB0aGUgYWN0aXZlIHNlY3Rpb24gLyBzbGlkZVxuICAgICovXG5cbiAgICBmdW5jdGlvbiBzZXRCb2R5Q2xhc3MoKSB7XG4gICAgICB2YXIgc2VjdGlvbiA9IGdldFN0YXRlKCkuYWN0aXZlU2VjdGlvbi5pdGVtO1xuICAgICAgdmFyIHNsaWRlID0gZ2V0U3RhdGUoKS5hY3RpdmVTZWN0aW9uLmFjdGl2ZVNsaWRlO1xuICAgICAgdmFyIHNlY3Rpb25BbmNob3IgPSBnZXRBbmNob3Ioc2VjdGlvbik7XG4gICAgICB2YXIgdGV4dCA9IFN0cmluZyhzZWN0aW9uQW5jaG9yKTtcblxuICAgICAgaWYgKHNsaWRlKSB7XG4gICAgICAgIHZhciBzbGlkZUFuY2hvciA9IGdldEFuY2hvcihzbGlkZS5pdGVtKTtcbiAgICAgICAgdGV4dCA9IHRleHQgKyAnLScgKyBzbGlkZUFuY2hvcjtcbiAgICAgIH0gLy9jaGFuZ2luZyBzbGFzaCBmb3IgZGFzaCB0byBtYWtlIGl0IGEgdmFsaWQgQ1NTIHN0eWxlXG5cblxuICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSgnLycsICctJykucmVwbGFjZSgnIycsICcnKTsgLy9yZW1vdmluZyBwcmV2aW91cyBhbmNob3IgY2xhc3Nlc1xuXG4gICAgICB2YXIgY2xhc3NSZSA9IG5ldyBSZWdFeHAoJ1xcXFxiXFxcXHM/JyArIFZJRVdJTkdfUFJFRklYICsgJy1bXlxcXFxzXStcXFxcYicsIFwiZ1wiKTtcbiAgICAgICRib2R5LmNsYXNzTmFtZSA9ICRib2R5LmNsYXNzTmFtZS5yZXBsYWNlKGNsYXNzUmUsICcnKTsgLy9hZGRpbmcgdGhlIGN1cnJlbnQgYW5jaG9yXG5cbiAgICAgIGFkZENsYXNzKCRib2R5LCBWSUVXSU5HX1BSRUZJWCArICctJyArIHRleHQpO1xuICAgIH1cbiAgICAvKipcbiAgICAqIEdldHMgdGhlIGFuY2hvciBmb3IgdGhlIGdpdmVuIHNsaWRlIC8gc2VjdGlvbi4gSXRzIGluZGV4IHdpbGwgYmUgdXNlZCBpZiB0aGVyZSdzIG5vbmUuXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIGdldEFuY2hvcihlbGVtZW50KSB7XG4gICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciBhbmNob3IgPSBnZXRBdHRyKGVsZW1lbnQsICdkYXRhLWFuY2hvcicpO1xuICAgICAgdmFyIGVsZW1lbnRJbmRleCA9IGluZGV4KGVsZW1lbnQpOyAvL1NsaWRlIHdpdGhvdXQgYW5jaG9yIGxpbms/IFdlIHRha2UgdGhlIGluZGV4IGluc3RlYWQuXG5cbiAgICAgIGlmIChhbmNob3IgPT0gbnVsbCkge1xuICAgICAgICBhbmNob3IgPSBlbGVtZW50SW5kZXg7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhbmNob3I7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBTZXRzIHRoZSBzdGF0ZSBvZiB0aGUgd2Vic2l0ZSBkZXBlbmRpbmcgb24gdGhlIGFjdGl2ZSBzZWN0aW9uL3NsaWRlLlxuICAgICogSXQgY2hhbmdlcyB0aGUgVVJMIGhhc2ggd2hlbiBuZWVkZWQgYW5kIHVwZGF0ZXMgdGhlIGJvZHkgY2xhc3MuXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIHNldFBhZ2VTdGF0dXMoc2xpZGVJbmRleCwgc2xpZGVBbmNob3IsIGFuY2hvckxpbmspIHtcbiAgICAgIHZhciBzZWN0aW9uSGFzaCA9ICcnO1xuXG4gICAgICBpZiAoZ2V0T3B0aW9ucygpLmFuY2hvcnMubGVuZ3RoICYmICFnZXRPcHRpb25zKCkubG9ja0FuY2hvcnMpIHtcbiAgICAgICAgLy9pc24ndCBpdCB0aGUgZmlyc3Qgc2xpZGU/XG4gICAgICAgIGlmIChzbGlkZUluZGV4KSB7XG4gICAgICAgICAgaWYgKGFuY2hvckxpbmsgIT0gbnVsbCkge1xuICAgICAgICAgICAgc2VjdGlvbkhhc2ggPSBhbmNob3JMaW5rO1xuICAgICAgICAgIH0gLy9zbGlkZSB3aXRob3V0IGFuY2hvciBsaW5rPyBXZSB0YWtlIHRoZSBpbmRleCBpbnN0ZWFkLlxuXG5cbiAgICAgICAgICBpZiAoc2xpZGVBbmNob3IgPT0gbnVsbCkge1xuICAgICAgICAgICAgc2xpZGVBbmNob3IgPSBzbGlkZUluZGV4O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICAgIGxhc3RTY3JvbGxlZFNsaWRlOiBzbGlkZUFuY2hvclxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHNldFVybEhhc2goc2VjdGlvbkhhc2ggKyAnLycgKyBzbGlkZUFuY2hvcik7IC8vZmlyc3Qgc2xpZGUgd29uJ3QgaGF2ZSBzbGlkZSBhbmNob3IsIGp1c3QgdGhlIHNlY3Rpb24gb25lXG4gICAgICAgIH0gZWxzZSBpZiAoc2xpZGVJbmRleCAhPSBudWxsKSB7XG4gICAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgICAgbGFzdFNjcm9sbGVkU2xpZGU6IHNsaWRlQW5jaG9yXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgc2V0VXJsSGFzaChhbmNob3JMaW5rKTtcbiAgICAgICAgfSAvL3NlY3Rpb24gd2l0aG91dCBzbGlkZXNcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgc2V0VXJsSGFzaChhbmNob3JMaW5rKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBzZXRCb2R5Q2xhc3MoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBTZXRzIHRoZSBVUkwgaGFzaC5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gc2V0VXJsSGFzaCh1cmwpIHtcbiAgICAgIGlmIChnZXRPcHRpb25zKCkucmVjb3JkSGlzdG9yeSkge1xuICAgICAgICBsb2NhdGlvbi5oYXNoID0gdXJsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy9Nb2JpbGUgQ2hyb21lIGRvZXNuJ3Qgd29yayB0aGUgbm9ybWFsIHdheSwgc28uLi4gbGV0cyB1c2UgSFRNTDUgZm9yIHBob25lcyA6KVxuICAgICAgICBpZiAoaXNUb3VjaERldmljZSB8fCBpc1RvdWNoKSB7XG4gICAgICAgICAgd2luLmhpc3RvcnkucmVwbGFjZVN0YXRlKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCAnIycgKyB1cmwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBiYXNlVXJsID0gd2luLmxvY2F0aW9uLmhyZWYuc3BsaXQoJyMnKVswXTtcbiAgICAgICAgICB3aW4ubG9jYXRpb24ucmVwbGFjZShiYXNlVXJsICsgJyMnICsgdXJsKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICogR2V0cyB0aGUgbmFtZSBmb3Igc2NyZWVuIHJlYWRlcnMgZm9yIGEgc2VjdGlvbi9zbGlkZSBuYXZpZ2F0aW9uIGJ1bGxldC5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gZ2V0QnVsbGV0TGlua05hbWUoaSwgZGVmYXVsdE5hbWUsIGl0ZW0pIHtcbiAgICAgIHZhciBhbmNob3IgPSBkZWZhdWx0TmFtZSA9PT0gJ1NlY3Rpb24nID8gZ2V0T3B0aW9ucygpLmFuY2hvcnNbaV0gOiBnZXRBdHRyKGl0ZW0sICdkYXRhLWFuY2hvcicpO1xuICAgICAgcmV0dXJuIGVuY29kZVVSSShnZXRPcHRpb25zKCkubmF2aWdhdGlvblRvb2x0aXBzW2ldIHx8IGFuY2hvciB8fCBkZWZhdWx0TmFtZSArICcgJyArIChpICsgMSkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNsaWRlQnVsbGV0SGFuZGxlcihlKSB7XG4gICAgICBwcmV2ZW50RGVmYXVsdChlKTtcbiAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgc2Nyb2xsVHJpZ2dlcjogJ2hvcml6b250YWxOYXYnXG4gICAgICB9KTtcbiAgICAgIC8qanNoaW50IHZhbGlkdGhpczp0cnVlICovXG5cbiAgICAgIHZhciBzZWN0aW9uRWxlbSA9IGNsb3Nlc3QodGhpcywgU0VDVElPTl9TRUwpO1xuICAgICAgdmFyIHNsaWRlcyA9ICQoU0xJREVTX1dSQVBQRVJfU0VMLCBjbG9zZXN0KHRoaXMsIFNFQ1RJT05fU0VMKSlbMF07XG4gICAgICB2YXIgc2VjdGlvbiA9IGdldFBhbmVsQnlFbGVtZW50KGdldFN0YXRlKCkuc2VjdGlvbnMsIHNlY3Rpb25FbGVtKTtcbiAgICAgIHZhciBkZXN0aW55ID0gc2VjdGlvbi5zbGlkZXNbaW5kZXgoY2xvc2VzdCh0aGlzLCAnbGknKSldO1xuICAgICAgRXZlbnRFbWl0dGVyLmVtaXQoZXZlbnRzLmxhbmRzY2FwZVNjcm9sbCwge1xuICAgICAgICBzbGlkZXM6IHNsaWRlcyxcbiAgICAgICAgZGVzdGluYXRpb246IGRlc3RpbnkuaXRlbVxuICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICogU2V0cyB0aGUgc3RhdGUgZm9yIHRoZSBob3Jpem9udGFsIGJ1bGxldCBuYXZpZ2F0aW9ucy5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gYWN0aXZlU2xpZGVzTmF2aWdhdGlvbihzbGlkZXNOYXYsIHNsaWRlSW5kZXgpIHtcbiAgICAgIGlmIChnZXRPcHRpb25zKCkuc2xpZGVzTmF2aWdhdGlvbiAmJiBzbGlkZXNOYXYgIT0gbnVsbCkge1xuICAgICAgICByZW1vdmVDbGFzcygkKEFDVElWRV9TRUwsIHNsaWRlc05hdiksIEFDVElWRSk7XG4gICAgICAgIGFkZENsYXNzKCQoJ2EnLCAkKCdsaScsIHNsaWRlc05hdilbc2xpZGVJbmRleF0pLCBBQ1RJVkUpO1xuICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAqIENyZWF0ZXMgYSBsYW5kc2NhcGUgbmF2aWdhdGlvbiBiYXIgd2l0aCBkb3RzIGZvciBob3Jpem9udGFsIHNsaWRlcnMuXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIGFkZFNsaWRlc05hdmlnYXRpb24oc2VjdGlvbikge1xuICAgICAgdmFyIHNlY3Rpb25FbGVtID0gc2VjdGlvbi5pdGVtO1xuICAgICAgdmFyIG51bVNsaWRlcyA9IHNlY3Rpb24uc2xpZGVzLmxlbmd0aDtcbiAgICAgIGFwcGVuZFRvKGNyZWF0ZUVsZW1lbnRGcm9tSFRNTCgnPGRpdiBjbGFzcz1cIicgKyBTTElERVNfTkFWICsgJ1wiPjx1bD48L3VsPjwvZGl2PicpLCBzZWN0aW9uRWxlbSk7XG4gICAgICB2YXIgbmF2ID0gJChTTElERVNfTkFWX1NFTCwgc2VjdGlvbkVsZW0pWzBdOyAvL3RvcCBvciBib3R0b21cblxuICAgICAgYWRkQ2xhc3MobmF2LCAnZnAtJyArIGdldE9wdGlvbnMoKS5zbGlkZXNOYXZQb3NpdGlvbik7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtU2xpZGVzOyBpKyspIHtcbiAgICAgICAgdmFyIHNsaWRlID0gJChTTElERV9TRUwsIHNlY3Rpb25FbGVtKVtpXTtcbiAgICAgICAgYXBwZW5kVG8oY3JlYXRlRWxlbWVudEZyb21IVE1MKCc8bGk+PGEgaHJlZj1cIiNcIj48c3BhbiBjbGFzcz1cImZwLXNyLW9ubHlcIj4nICsgZ2V0QnVsbGV0TGlua05hbWUoaSwgJ1NsaWRlJywgc2xpZGUpICsgJzwvc3Bhbj48c3Bhbj48L3NwYW4+PC9hPjwvbGk+JyksICQoJ3VsJywgbmF2KVswXSk7XG4gICAgICB9IC8vY2VudGVyaW5nIGl0XG5cblxuICAgICAgY3NzKG5hdiwge1xuICAgICAgICAnbWFyZ2luLWxlZnQnOiAnLScgKyBuYXYuaW5uZXJXaWR0aCAvIDIgKyAncHgnXG4gICAgICB9KTtcbiAgICAgIHZhciBhY3RpdmVTbGlkZUluZGV4ID0gc2VjdGlvbi5hY3RpdmVTbGlkZSA/IHNlY3Rpb24uYWN0aXZlU2xpZGUuaW5kZXgoKSA6IDA7XG4gICAgICBhZGRDbGFzcygkKCdhJywgJCgnbGknLCBuYXYpW2FjdGl2ZVNsaWRlSW5kZXhdKSwgQUNUSVZFKTtcbiAgICB9XG5cbiAgICB2YXIgaXNTY3JvbGxBbGxvd2VkID0ge307XG4gICAgaXNTY3JvbGxBbGxvd2VkLm0gPSB7XG4gICAgICAndXAnOiB0cnVlLFxuICAgICAgJ2Rvd24nOiB0cnVlLFxuICAgICAgJ2xlZnQnOiB0cnVlLFxuICAgICAgJ3JpZ2h0JzogdHJ1ZVxuICAgIH07XG4gICAgaXNTY3JvbGxBbGxvd2VkLmsgPSBkZWVwRXh0ZW5kKHt9LCBpc1Njcm9sbEFsbG93ZWQubSk7XG4gICAgLyoqXG4gICAgKiBBbGxvd2luZyBvciBkaXNhbGxvd2luZyB0aGUgbW91c2Uvc3dpcGUgc2Nyb2xsIGluIGEgZ2l2ZW4gZGlyZWN0aW9uLiAobm90IGZvciBrZXlib2FyZClcbiAgICAqIEBwYXJhbSB0eXBlIG0gKG1vdXNlKSBvciBrIChrZXlib2FyZClcbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gc2V0SXNTY3JvbGxBbGxvd2VkKHZhbHVlLCBkaXJlY3Rpb24sIHR5cGUpIHtcbiAgICAgIC8vdXAsIGRvd24sIGxlZnQsIHJpZ2h0XG4gICAgICBpZiAoZGlyZWN0aW9uICE9PSAnYWxsJykge1xuICAgICAgICBpc1Njcm9sbEFsbG93ZWRbdHlwZV1bZGlyZWN0aW9uXSA9IHZhbHVlO1xuICAgICAgfSAvL2FsbCBkaXJlY3Rpb25zP1xuICAgICAgZWxzZSB7XG4gICAgICAgIE9iamVjdC5rZXlzKGlzU2Nyb2xsQWxsb3dlZFt0eXBlXSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgaXNTY3JvbGxBbGxvd2VkW3R5cGVdW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldElzU2Nyb2xsQWxsb3dlZCgpIHtcbiAgICAgIHJldHVybiBpc1Njcm9sbEFsbG93ZWQ7XG4gICAgfVxuXG4gICAgRXZlbnRFbWl0dGVyLm9uKGV2ZW50cy5vbkNsaWNrT3JUb3VjaCwgb25DbGlja09yVG91Y2gkMik7XG5cbiAgICBmdW5jdGlvbiBvbkNsaWNrT3JUb3VjaCQyKHBhcmFtcykge1xuICAgICAgdmFyIHRhcmdldCA9IHBhcmFtcy50YXJnZXQ7XG5cbiAgICAgIGlmIChtYXRjaGVzKHRhcmdldCwgU0xJREVTX0FSUk9XX1NFTCkgfHwgY2xvc2VzdCh0YXJnZXQsIFNMSURFU19BUlJPV19TRUwpKSB7XG4gICAgICAgIHNsaWRlQXJyb3dIYW5kbGVyLmNhbGwodGFyZ2V0LCBwYXJhbXMpO1xuICAgICAgfVxuICAgIH0gLy9TY3JvbGxpbmcgaG9yaXpvbnRhbGx5IHdoZW4gY2xpY2tpbmcgb24gdGhlIHNsaWRlciBjb250cm9scy5cblxuXG4gICAgZnVuY3Rpb24gc2xpZGVBcnJvd0hhbmRsZXIoKSB7XG4gICAgICAvKmpzaGludCB2YWxpZHRoaXM6dHJ1ZSAqL1xuICAgICAgdmFyIHNlY3Rpb24gPSBjbG9zZXN0KHRoaXMsIFNFQ1RJT05fU0VMKTtcbiAgICAgIC8qanNoaW50IHZhbGlkdGhpczp0cnVlICovXG5cbiAgICAgIGlmIChoYXNDbGFzcyh0aGlzLCBTTElERVNfUFJFVikpIHtcbiAgICAgICAgaWYgKGdldElzU2Nyb2xsQWxsb3dlZCgpLm0ubGVmdCkge1xuICAgICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICAgIHNjcm9sbFRyaWdnZXI6ICdzbGlkZUFycm93J1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIEV2ZW50RW1pdHRlci5lbWl0KGV2ZW50cy5tb3ZlU2xpZGVMZWZ0LCB7XG4gICAgICAgICAgICBzZWN0aW9uOiBzZWN0aW9uXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChnZXRJc1Njcm9sbEFsbG93ZWQoKS5tLnJpZ2h0KSB7XG4gICAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgICAgc2Nyb2xsVHJpZ2dlcjogJ3NsaWRlQXJyb3cnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgRXZlbnRFbWl0dGVyLmVtaXQoZXZlbnRzLm1vdmVTbGlkZVJpZ2h0LCB7XG4gICAgICAgICAgICBzZWN0aW9uOiBzZWN0aW9uXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgKiBDcmVhdGVzIHRoZSBjb250cm9sIGFycm93cyBmb3IgdGhlIGdpdmVuIHNlY3Rpb25cbiAgICAqL1xuXG5cbiAgICBmdW5jdGlvbiBjcmVhdGVTbGlkZUFycm93cyhzZWN0aW9uKSB7XG4gICAgICB2YXIgc2VjdGlvbkVsZW0gPSBzZWN0aW9uLml0ZW07XG4gICAgICB2YXIgYXJyb3dzID0gW2NyZWF0ZUVsZW1lbnRGcm9tSFRNTChnZXRPcHRpb25zKCkuY29udHJvbEFycm93c0hUTUxbMF0pLCBjcmVhdGVFbGVtZW50RnJvbUhUTUwoZ2V0T3B0aW9ucygpLmNvbnRyb2xBcnJvd3NIVE1MWzFdKV07XG4gICAgICBhZnRlcigkKFNMSURFU19XUkFQUEVSX1NFTCwgc2VjdGlvbkVsZW0pWzBdLCBhcnJvd3MpO1xuICAgICAgYWRkQ2xhc3MoYXJyb3dzLCBTTElERVNfQVJST1cpO1xuICAgICAgYWRkQ2xhc3MoYXJyb3dzWzBdLCBTTElERVNfUFJFVik7XG4gICAgICBhZGRDbGFzcyhhcnJvd3NbMV0sIFNMSURFU19ORVhUKTtcblxuICAgICAgaWYgKGdldE9wdGlvbnMoKS5jb250cm9sQXJyb3dDb2xvciAhPT0gJyNmZmYnKSB7XG4gICAgICAgIGNzcygkKFNMSURFU19BUlJPV19ORVhUX1NFTCwgc2VjdGlvbkVsZW0pLCB7XG4gICAgICAgICAgJ2JvcmRlci1jb2xvcic6ICd0cmFuc3BhcmVudCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCAnICsgZ2V0T3B0aW9ucygpLmNvbnRyb2xBcnJvd0NvbG9yXG4gICAgICAgIH0pO1xuICAgICAgICBjc3MoJChTTElERVNfQVJST1dfUFJFVl9TRUwsIHNlY3Rpb25FbGVtKSwge1xuICAgICAgICAgICdib3JkZXItY29sb3InOiAndHJhbnNwYXJlbnQgJyArIGdldE9wdGlvbnMoKS5jb250cm9sQXJyb3dDb2xvciArICcgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQnXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWdldE9wdGlvbnMoKS5sb29wSG9yaXpvbnRhbCkge1xuICAgICAgICBoaWRlKCQoU0xJREVTX0FSUk9XX1BSRVZfU0VMLCBzZWN0aW9uRWxlbSkpO1xuICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiB0b2dnbGVDb250cm9sQXJyb3dzKHYpIHtcbiAgICAgIGlmICghZ2V0T3B0aW9ucygpLmxvb3BIb3Jpem9udGFsICYmIGdldE9wdGlvbnMoKS5jb250cm9sQXJyb3dzKSB7XG4gICAgICAgIC8vaGlkZGluZyBpdCBmb3IgdGhlIGZpc3Qgc2xpZGUsIHNob3dpbmcgZm9yIHRoZSByZXN0XG4gICAgICAgIHRvZ2dsZSgkKFNMSURFU19BUlJPV19QUkVWX1NFTCwgdi5zZWN0aW9uKSwgdi5zbGlkZUluZGV4ICE9PSAwKTsgLy9oaWRkaW5nIGl0IGZvciB0aGUgbGFzdCBzbGlkZSwgc2hvd2luZyBmb3IgdGhlIHJlc3RcblxuICAgICAgICB0b2dnbGUoJChTTElERVNfQVJST1dfTkVYVF9TRUwsIHYuc2VjdGlvbiksIG5leHQodi5kZXN0aW55KSAhPSBudWxsKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgZ19hZnRlclNsaWRlTG9hZHNJZDtcbiAgICBGUC5sYW5kc2NhcGVTY3JvbGwgPSBsYW5kc2NhcGVTY3JvbGw7XG4gICAgRXZlbnRFbWl0dGVyLm9uKGV2ZW50cy5iaW5kRXZlbnRzLCBiaW5kRXZlbnRzJGIpO1xuXG4gICAgZnVuY3Rpb24gYmluZEV2ZW50cyRiKCkge1xuICAgICAgRXZlbnRFbWl0dGVyLm9uKGV2ZW50cy5vblBlcmZvcm1Nb3ZlbWVudCwgb25QZXJmb3JtTW92ZW1lbnQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uUGVyZm9ybU1vdmVtZW50KCkge1xuICAgICAgY2xlYXJUaW1lb3V0KGdfYWZ0ZXJTbGlkZUxvYWRzSWQpO1xuICAgICAgc2V0U3RhdGUoe1xuICAgICAgICBzbGlkZU1vdmluZzogZmFsc2VcbiAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAqIFNjcm9sbHMgaG9yaXpvbnRhbCBzbGlkZXJzLlxuICAgICovXG5cblxuICAgIGZ1bmN0aW9uIGxhbmRzY2FwZVNjcm9sbChzbGlkZXMsIGRlc3RpbnksIGRpcmVjdGlvbikge1xuICAgICAgdmFyIHNlY3Rpb25FbGVtID0gY2xvc2VzdChzbGlkZXMsIFNFQ1RJT05fU0VMKTtcbiAgICAgIHZhciBzZWN0aW9uID0gZ2V0U3RhdGUoKS5zZWN0aW9ucy5maWx0ZXIoZnVuY3Rpb24gKHNlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIHNlY3Rpb24uaXRlbSA9PSBzZWN0aW9uRWxlbTtcbiAgICAgIH0pWzBdO1xuICAgICAgdmFyIHNsaWRlID0gc2VjdGlvbi5zbGlkZXMuZmlsdGVyKGZ1bmN0aW9uIChzbGlkZSkge1xuICAgICAgICByZXR1cm4gc2xpZGUuaXRlbSA9PSBkZXN0aW55O1xuICAgICAgfSlbMF07XG4gICAgICB2YXIgdiA9IHtcbiAgICAgICAgXCJzbGlkZXNcIjogc2xpZGVzLFxuICAgICAgICBcImRlc3RpbnlcIjogZGVzdGlueSxcbiAgICAgICAgXCJkaXJlY3Rpb25cIjogZGlyZWN0aW9uLFxuICAgICAgICBcImRlc3RpbnlQb3NcIjoge1xuICAgICAgICAgIFwibGVmdFwiOiBkZXN0aW55Lm9mZnNldExlZnRcbiAgICAgICAgfSxcbiAgICAgICAgXCJzbGlkZUluZGV4XCI6IHNsaWRlLmluZGV4KCksXG4gICAgICAgIFwic2VjdGlvblwiOiBzZWN0aW9uRWxlbSxcbiAgICAgICAgXCJzZWN0aW9uSW5kZXhcIjogc2VjdGlvbi5pbmRleCgpLFxuICAgICAgICBcImFuY2hvckxpbmtcIjogc2VjdGlvbi5hbmNob3IsXG4gICAgICAgIFwic2xpZGVzTmF2XCI6ICQoU0xJREVTX05BVl9TRUwsIHNlY3Rpb25FbGVtKVswXSxcbiAgICAgICAgXCJzbGlkZUFuY2hvclwiOiBzbGlkZS5hbmNob3IsXG4gICAgICAgIFwicHJldlNsaWRlXCI6IHNlY3Rpb24uYWN0aXZlU2xpZGUuaXRlbSxcbiAgICAgICAgXCJwcmV2U2xpZGVJbmRleFwiOiBzZWN0aW9uLmFjdGl2ZVNsaWRlLmluZGV4KCksXG4gICAgICAgIFwiaXRlbXNcIjoge1xuICAgICAgICAgIFwic2VjdGlvblwiOiBzZWN0aW9uLFxuICAgICAgICAgIFwib3JpZ2luXCI6IHNlY3Rpb24uYWN0aXZlU2xpZGUsXG4gICAgICAgICAgXCJkZXN0aW5hdGlvblwiOiBzbGlkZVxuICAgICAgICB9LFxuICAgICAgICAvL2NhY2hpbmcgdGhlIHZhbHVlIG9mIGlzUmVzaXppbmcgYXQgdGhlIG1vbW1lbnQgdGhlIGZ1bmN0aW9uIGlzIGNhbGxlZFxuICAgICAgICAvL2JlY2F1c2UgaXQgd2lsbCBiZSBjaGVja2VkIGxhdGVyIGluc2lkZSBhIHNldFRpbWVvdXQgYW5kIHRoZSB2YWx1ZSBtaWdodCBjaGFuZ2VcbiAgICAgICAgXCJsb2NhbElzUmVzaXppbmdcIjogc3RhdGUuaXNSZXNpemluZ1xuICAgICAgfTtcbiAgICAgIHYueE1vdmVtZW50ID0gZ2V0WG1vdmVtZW50KHYucHJldlNsaWRlSW5kZXgsIHYuc2xpZGVJbmRleCk7XG4gICAgICB2LmRpcmVjdGlvbiA9IHYuZGlyZWN0aW9uID8gdi5kaXJlY3Rpb24gOiB2LnhNb3ZlbWVudDsgLy9pbXBvcnRhbnQhISBPbmx5IGRvIGl0IHdoZW4gbm90IHJlc2l6aW5nXG5cbiAgICAgIGlmICghdi5sb2NhbElzUmVzaXppbmcpIHtcbiAgICAgICAgLy9wcmV2ZW50aW5nIGZyb20gc2Nyb2xsaW5nIHRvIHRoZSBuZXh0L3ByZXYgc2VjdGlvbiB3aGVuIHVzaW5nIHNjcm9sbEhvcml6b250YWxseVxuICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgY2FuU2Nyb2xsOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGdldE9wdGlvbnMoKS5vblNsaWRlTGVhdmUpIHtcbiAgICAgICAgLy9pZiB0aGUgc2l0ZSBpcyBub3QganVzdCByZXNpemluZyBhbmQgcmVhZGp1c3RpbmcgdGhlIHNsaWRlc1xuICAgICAgICBpZiAoIXYubG9jYWxJc1Jlc2l6aW5nICYmIHYueE1vdmVtZW50ICE9PSAnbm9uZScpIHtcbiAgICAgICAgICBpZiAoaXNGdW5jdGlvbihnZXRPcHRpb25zKCkub25TbGlkZUxlYXZlKSkge1xuICAgICAgICAgICAgaWYgKGZpcmVDYWxsYmFjaygnb25TbGlkZUxlYXZlJywgdikgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBzbGlkZU1vdmluZzogZmFsc2VcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgYWRkQ2xhc3MoZGVzdGlueSwgQUNUSVZFKTtcbiAgICAgIHJlbW92ZUNsYXNzKHNpYmxpbmdzKGRlc3RpbnkpLCBBQ1RJVkUpO1xuICAgICAgdXBkYXRlU3RhdGUoKTtcblxuICAgICAgaWYgKCF2LmxvY2FsSXNSZXNpemluZykge1xuICAgICAgICBzdG9wTWVkaWEodi5wcmV2U2xpZGUpO1xuICAgICAgICBsYXp5TG9hZChkZXN0aW55KTtcbiAgICAgIH1cblxuICAgICAgdG9nZ2xlQ29udHJvbEFycm93cyh2KTsgLy9vbmx5IGNoYW5naW5nIHRoZSBVUkwgaWYgdGhlIHNsaWRlcyBhcmUgaW4gdGhlIGN1cnJlbnQgc2VjdGlvbiAobm90IGZvciByZXNpemUgcmUtYWRqdXN0aW5nKVxuXG4gICAgICBpZiAoc2VjdGlvbi5pc0FjdGl2ZSAmJiAhdi5sb2NhbElzUmVzaXppbmcpIHtcbiAgICAgICAgc2V0UGFnZVN0YXR1cyh2LnNsaWRlSW5kZXgsIHYuc2xpZGVBbmNob3IsIHYuYW5jaG9yTGluayk7XG4gICAgICB9XG5cbiAgICAgIHBlcmZvcm1Ib3Jpem9udGFsTW92ZShzbGlkZXMsIHYsIHRydWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAqIFBlcmZvcm1zIHRoZSBob3Jpem9udGFsIG1vdmVtZW50LiAoQ1NTMyBvciBqUXVlcnkpXG4gICAgKlxuICAgICogQHBhcmFtIGZpcmVDYWxsYmFjayB7Qm9vbGVhbn0gLSBkZXRlcm1pbmVzIHdoZXRoZXIgb3Igbm90IHRvIGZpcmUgdGhlIGNhbGxiYWNrXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIHBlcmZvcm1Ib3Jpem9udGFsTW92ZShzbGlkZXMsIHYsIGZpcmVDYWxsYmFjaykge1xuICAgICAgdmFyIGRlc3RpbnlQb3MgPSB2LmRlc3RpbnlQb3M7XG4gICAgICBhY3RpdmVTbGlkZXNOYXZpZ2F0aW9uKHYuc2xpZGVzTmF2LCB2LnNsaWRlSW5kZXgpO1xuICAgICAgc2V0U3RhdGUoe1xuICAgICAgICBzY3JvbGxYOiBNYXRoLnJvdW5kKGRlc3RpbnlQb3MubGVmdClcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoZ2V0T3B0aW9ucygpLmNzczMpIHtcbiAgICAgICAgdmFyIHRyYW5zbGF0ZTNkID0gJ3RyYW5zbGF0ZTNkKC0nICsgTWF0aC5yb3VuZChkZXN0aW55UG9zLmxlZnQpICsgJ3B4LCAwcHgsIDBweCknO1xuICAgICAgICBGUC50ZXN0LnRyYW5zbGF0ZTNkSFt2LnNlY3Rpb25JbmRleF0gPSB0cmFuc2xhdGUzZDtcbiAgICAgICAgY3NzKGFkZEFuaW1hdGlvbigkKFNMSURFU19DT05UQUlORVJfU0VMLCBzbGlkZXMpKSwgZ2V0VHJhbnNmb3Jtcyh0cmFuc2xhdGUzZCkpO1xuICAgICAgICBjbGVhclRpbWVvdXQoZ19hZnRlclNsaWRlTG9hZHNJZCk7XG4gICAgICAgIGdfYWZ0ZXJTbGlkZUxvYWRzSWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAoZmlyZUNhbGxiYWNrKSB7XG4gICAgICAgICAgICBhZnRlclNsaWRlTG9hZHModik7XG4gICAgICAgICAgfVxuICAgICAgICB9LCBnZXRPcHRpb25zKCkuc2Nyb2xsaW5nU3BlZWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgRlAudGVzdC5sZWZ0W3Yuc2VjdGlvbkluZGV4XSA9IE1hdGgucm91bmQoZGVzdGlueVBvcy5sZWZ0KTtcbiAgICAgICAgc2Nyb2xsVG8oc2xpZGVzLCBNYXRoLnJvdW5kKGRlc3RpbnlQb3MubGVmdCksIGdldE9wdGlvbnMoKS5zY3JvbGxpbmdTcGVlZCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChmaXJlQ2FsbGJhY2spIHtcbiAgICAgICAgICAgIGFmdGVyU2xpZGVMb2Fkcyh2KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAqIFJldHVucyBgcmlnaHRgIG9yIGBsZWZ0YCBkZXBlbmRpbmcgb24gdGhlIHNjcm9sbGluZyBtb3ZlbWVudCB0byByZWFjaCBpdHMgZGVzdGluYXRpb25cbiAgICAqIGZyb20gdGhlIGN1cnJlbnQgc2xpZGUuXG4gICAgKi9cblxuXG4gICAgZnVuY3Rpb24gZ2V0WG1vdmVtZW50KGZyb21JbmRleCwgdG9JbmRleCkge1xuICAgICAgaWYgKGZyb21JbmRleCA9PSB0b0luZGV4KSB7XG4gICAgICAgIHJldHVybiAnbm9uZSc7XG4gICAgICB9XG5cbiAgICAgIGlmIChmcm9tSW5kZXggPiB0b0luZGV4KSB7XG4gICAgICAgIHJldHVybiAnbGVmdCc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAncmlnaHQnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRGVzdHJveSQ3KCkge1xuICAgICAgY2xlYXJUaW1lb3V0KGdfYWZ0ZXJTbGlkZUxvYWRzSWQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFmdGVyU2xpZGVMb2Fkcyh2KSB7XG4gICAgICAvL2lmIHRoZSBzaXRlIGlzIG5vdCBqdXN0IHJlc2l6aW5nIGFuZCByZWFkanVzdGluZyB0aGUgc2xpZGVzXG4gICAgICBpZiAoIXYubG9jYWxJc1Jlc2l6aW5nKSB7XG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKGdldE9wdGlvbnMoKS5hZnRlclNsaWRlTG9hZCkpIHtcbiAgICAgICAgICBmaXJlQ2FsbGJhY2soJ2FmdGVyU2xpZGVMb2FkJywgdik7XG4gICAgICAgIH0gLy9uZWVkcyB0byBiZSBpbnNpZGUgdGhlIGNvbmRpdGlvbiB0byBwcmV2ZW50IHByb2JsZW1zIHdpdGggY29udGludW91c1ZlcnRpY2FsIGFuZCBzY3JvbGxIb3Jpem9udGFsbHlcbiAgICAgICAgLy9hbmQgdG8gcHJldmVudCBkb3VibGUgc2Nyb2xsIHJpZ2h0IGFmdGVyIGEgd2luZG93cyByZXNpemVcblxuXG4gICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICBjYW5TY3JvbGw6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIHBsYXlNZWRpYSh2LmRlc3RpbnkpO1xuICAgICAgICBFdmVudEVtaXR0ZXIuZW1pdChldmVudHMuYWZ0ZXJTbGlkZUxvYWRzLCB2KTtcbiAgICAgIH0gLy9sZXR0aW5nIHRoZW0gc2xpZGUgYWdhaW5cblxuXG4gICAgICBzZXRTdGF0ZSh7XG4gICAgICAgIHNsaWRlTW92aW5nOiBmYWxzZVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBTbGlkZXMgc2lsZW50bHkgKHdpdGggbm8gYW5pbWF0aW9uKSB0aGUgYWN0aXZlIHNsaWRlciB0byB0aGUgZ2l2ZW4gc2xpZGUuXG4gICAgKiBAcGFyYW0gbm9DYWxsYmFjayB7Ym9vbH0gdHJ1ZSBvciBkZWZpbmVkIC0+IG5vIGNhbGxiYWNrc1xuICAgICovXG5cbiAgICBmdW5jdGlvbiBzaWxlbnRMYW5kc2NhcGVTY3JvbGwoYWN0aXZlU2xpZGUsIG5vQ2FsbGJhY2tzKSB7XG4gICAgICBzZXRTY3JvbGxpbmdTcGVlZCgwLCAnaW50ZXJuYWwnKTtcblxuICAgICAgaWYgKHR5cGVvZiBub0NhbGxiYWNrcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgLy9wcmV2ZW50aW5nIGZpcmluZyBjYWxsYmFja3MgYWZ0ZXJTbGlkZUxvYWQgZXRjLlxuICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgaXNSZXNpemluZzogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgbGFuZHNjYXBlU2Nyb2xsKGNsb3Nlc3QoYWN0aXZlU2xpZGUsIFNMSURFU19XUkFQUEVSX1NFTCksIGFjdGl2ZVNsaWRlKTtcblxuICAgICAgaWYgKHR5cGVvZiBub0NhbGxiYWNrcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgIGlzUmVzaXppbmc6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBzZXRTY3JvbGxpbmdTcGVlZChnZXRPcmlnaW5hbHMoKS5zY3JvbGxpbmdTcGVlZCwgJ2ludGVybmFsJyk7XG4gICAgfVxuXG4gICAgRlAuc2V0UmVjb3JkSGlzdG9yeSA9IHNldFJlY29yZEhpc3Rvcnk7XG4gICAgLyoqXG4gICAgKiBEZWZpbmVzIHdoZXRlciB0byByZWNvcmQgdGhlIGhpc3RvcnkgZm9yIGVhY2ggaGFzaCBjaGFuZ2UgaW4gdGhlIFVSTC5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gc2V0UmVjb3JkSGlzdG9yeSh2YWx1ZSwgdHlwZSkge1xuICAgICAgc2V0VmFyaWFibGVTdGF0ZSgncmVjb3JkSGlzdG9yeScsIHZhbHVlLCB0eXBlKTtcbiAgICB9XG5cbiAgICBGUC5zZXRBdXRvU2Nyb2xsaW5nID0gc2V0QXV0b1Njcm9sbGluZztcbiAgICBGUC50ZXN0LnNldEF1dG9TY3JvbGxpbmcgPSBzZXRBdXRvU2Nyb2xsaW5nO1xuICAgIC8qKlxuICAgICogU2V0cyB0aGUgYXV0b1Njcm9sbCBvcHRpb24uXG4gICAgKiBJdCBjaGFuZ2VzIHRoZSBzY3JvbGwgYmFyIHZpc2liaWxpdHkgYW5kIHRoZSBoaXN0b3J5IG9mIHRoZSBzaXRlIGFzIGEgcmVzdWx0LlxuICAgICovXG5cbiAgICBmdW5jdGlvbiBzZXRBdXRvU2Nyb2xsaW5nKHZhbHVlLCB0eXBlKSB7XG4gICAgICAvL3JlbW92aW5nIHRoZSB0cmFuc2Zvcm1hdGlvblxuICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICBzaWxlbnRTY3JvbGwoMCk7XG4gICAgICB9XG5cbiAgICAgIHNldFZhcmlhYmxlU3RhdGUoJ2F1dG9TY3JvbGxpbmcnLCB2YWx1ZSwgdHlwZSk7XG4gICAgICB2YXIgZWxlbWVudCA9IGdldFN0YXRlKCkuYWN0aXZlU2VjdGlvbi5pdGVtO1xuXG4gICAgICBpZiAoZ2V0T3B0aW9ucygpLmF1dG9TY3JvbGxpbmcgJiYgIWdldE9wdGlvbnMoKS5zY3JvbGxCYXIpIHtcbiAgICAgICAgY3NzKCRodG1sQm9keSwge1xuICAgICAgICAgICdvdmVyZmxvdyc6ICdoaWRkZW4nLFxuICAgICAgICAgICdoZWlnaHQnOiAnMTAwJSdcbiAgICAgICAgfSk7XG4gICAgICAgIHJlbW92ZUNsYXNzKCRib2R5LCAnZnAtc2Nyb2xsYWJsZScpO1xuICAgICAgICBzZXRSZWNvcmRIaXN0b3J5KGdldE9yaWdpbmFscygpLnJlY29yZEhpc3RvcnksICdpbnRlcm5hbCcpOyAvL2ZvciBJRSB0b3VjaCBkZXZpY2VzXG5cbiAgICAgICAgY3NzKGdldENvbnRhaW5lcigpLCB7XG4gICAgICAgICAgJy1tcy10b3VjaC1hY3Rpb24nOiAnbm9uZScsXG4gICAgICAgICAgJ3RvdWNoLWFjdGlvbic6ICdub25lJ1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoZWxlbWVudCAhPSBudWxsKSB7XG4gICAgICAgICAgLy9tb3ZpbmcgdGhlIGNvbnRhaW5lciB1cFxuICAgICAgICAgIHNpbGVudFNjcm9sbChlbGVtZW50Lm9mZnNldFRvcCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNzcygkaHRtbEJvZHksIHtcbiAgICAgICAgICAnb3ZlcmZsb3cnOiAndmlzaWJsZScsXG4gICAgICAgICAgJ2hlaWdodCc6ICdpbml0aWFsJ1xuICAgICAgICB9KTtcbiAgICAgICAgYWRkQ2xhc3MoJGJvZHksICdmcC1zY3JvbGxhYmxlJyk7XG4gICAgICAgIHZhciByZWNvcmRIaXN0b3J5ID0gIWdldE9wdGlvbnMoKS5hdXRvU2Nyb2xsaW5nID8gZmFsc2UgOiBnZXRPcmlnaW5hbHMoKS5yZWNvcmRIaXN0b3J5O1xuICAgICAgICBzZXRSZWNvcmRIaXN0b3J5KHJlY29yZEhpc3RvcnksICdpbnRlcm5hbCcpOyAvL2ZvciBJRSB0b3VjaCBkZXZpY2VzXG5cbiAgICAgICAgY3NzKGdldENvbnRhaW5lcigpLCB7XG4gICAgICAgICAgJy1tcy10b3VjaC1hY3Rpb24nOiAnJyxcbiAgICAgICAgICAndG91Y2gtYWN0aW9uJzogJydcbiAgICAgICAgfSk7IC8vc2Nyb2xsaW5nIHRoZSBwYWdlIHRvIHRoZSBzZWN0aW9uIHdpdGggbm8gYW5pbWF0aW9uXG5cbiAgICAgICAgaWYgKGVsZW1lbnQgIT0gbnVsbCkge1xuICAgICAgICAgIHZhciBzY3JvbGxTZXR0aW5ncyA9IGdldFNjcm9sbFNldHRpbmdzKGVsZW1lbnQub2Zmc2V0VG9wKTtcbiAgICAgICAgICBzY3JvbGxTZXR0aW5ncy5lbGVtZW50LnNjcm9sbFRvKDAsIHNjcm9sbFNldHRpbmdzLm9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy9AdHMtY2hlY2tcbiAgICAvKipcbiAgICAqIEFkZHMgc2VjdGlvbnMgYmVmb3JlIG9yIGFmdGVyIHRoZSBjdXJyZW50IG9uZSB0byBjcmVhdGUgdGhlIGluZmluaXRlIGVmZmVjdC5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlSW5maW5pdGVTZWN0aW9ucyh2KSB7XG4gICAgICBzZXRTdGF0ZSh7XG4gICAgICAgIGlzRG9pbmdDb250aW5vdXNWZXJ0aWNhbDogdHJ1ZVxuICAgICAgfSk7XG4gICAgICB2YXIgYWN0aXZlU2VjdGlvbkl0ZW0gPSBnZXRTdGF0ZSgpLmFjdGl2ZVNlY3Rpb24uaXRlbTsgLy8gU2Nyb2xsaW5nIGRvd25cblxuICAgICAgaWYgKCF2LmlzTW92ZW1lbnRVcCkge1xuICAgICAgICAvLyBNb3ZlIGFsbCBwcmV2aW91cyBzZWN0aW9ucyB0byBhZnRlciB0aGUgYWN0aXZlIHNlY3Rpb25cbiAgICAgICAgYWZ0ZXIoYWN0aXZlU2VjdGlvbkl0ZW0sIHByZXZBbGwoYWN0aXZlU2VjdGlvbkl0ZW0sIFNFQ1RJT05fU0VMKS5yZXZlcnNlKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gU2Nyb2xsaW5nIHVwXG4gICAgICAgIC8vIE1vdmUgYWxsIG5leHQgc2VjdGlvbnMgdG8gYmVmb3JlIHRoZSBhY3RpdmUgc2VjdGlvblxuICAgICAgICBiZWZvcmUoYWN0aXZlU2VjdGlvbkl0ZW0sIG5leHRBbGwoYWN0aXZlU2VjdGlvbkl0ZW0sIFNFQ1RJT05fU0VMKSk7XG4gICAgICB9IC8vIE1haW50YWluIHRoZSBkaXNwbGF5ZWQgcG9zaXRpb24gKG5vdyB0aGF0IHdlIGNoYW5nZWQgdGhlIGVsZW1lbnQgb3JkZXIpXG5cblxuICAgICAgc2lsZW50U2Nyb2xsKGdldFN0YXRlKCkuYWN0aXZlU2VjdGlvbi5pdGVtLm9mZnNldFRvcCk7IC8vIE1haW50YWluIHRoZSBhY3RpdmUgc2xpZGVzIHZpc2libGUgaW4gdGhlIHZpZXdwb3J0XG5cbiAgICAgIGtlZXBTbGlkZXNQb3NpdGlvbiQxKCk7IC8vIHNhdmUgZm9yIGxhdGVyIHRoZSBlbGVtZW50cyB0aGF0IHN0aWxsIG5lZWQgdG8gYmUgcmVvcmRlcmVkXG5cbiAgICAgIHYud3JhcEFyb3VuZEVsZW1lbnRzID0gYWN0aXZlU2VjdGlvbkl0ZW07IC8vIFJlY2FsY3VsYXRlIGFuaW1hdGlvbiB2YXJpYWJsZXNcblxuICAgICAgdi5kdG9wID0gdi5lbGVtZW50Lm9mZnNldFRvcDtcbiAgICAgIHYueU1vdmVtZW50ID0gZ2V0WW1vdmVtZW50KGdldFN0YXRlKCkuYWN0aXZlU2VjdGlvbiwgdi5lbGVtZW50KTtcbiAgICAgIHJldHVybiB2O1xuICAgIH1cbiAgICAvKipcbiAgICAqIE1haW50YWlucyB0aGUgYWN0aXZlIHNsaWRlcyBpbiB0aGUgdmlld3BvcnRcbiAgICAqIChCZWNhdXNlIHRoZSBgc2Nyb2xsYCBhbmltYXRpb24gbWlnaHQgZ2V0IGxvc3Qgd2l0aCBzb21lIGFjdGlvbnMsIHN1Y2ggYXMgd2hlbiB1c2luZyBjb250aW51b3VzVmVydGljYWwpXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIGtlZXBTbGlkZXNQb3NpdGlvbiQxKCkge1xuICAgICAgdmFyIGFjdGl2ZVNsaWRlcyA9ICQoU0xJREVfQUNUSVZFX1NFTCk7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWN0aXZlU2xpZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHNpbGVudExhbmRzY2FwZVNjcm9sbChhY3RpdmVTbGlkZXNbaV0sICdpbnRlcm5hbCcpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vQHRzLWNoZWNrXG4gICAgLyoqXG4gICAgKiBNYWludGFpbnMgdGhlIGFjdGl2ZSBzbGlkZXMgaW4gdGhlIHZpZXdwb3J0XG4gICAgKiAoQmVjYXVzZSB0aGUgYHNjcm9sbGAgYW5pbWF0aW9uIG1pZ2h0IGdldCBsb3N0IHdpdGggc29tZSBhY3Rpb25zLCBzdWNoIGFzIHdoZW4gdXNpbmcgY29udGludW91c1ZlcnRpY2FsKVxuICAgICovXG5cbiAgICBmdW5jdGlvbiBrZWVwU2xpZGVzUG9zaXRpb24oKSB7XG4gICAgICB2YXIgYWN0aXZlU2xpZGVzID0gJChTTElERV9BQ1RJVkVfU0VMKTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhY3RpdmVTbGlkZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc2lsZW50TGFuZHNjYXBlU2Nyb2xsKGFjdGl2ZVNsaWRlc1tpXSwgJ2ludGVybmFsJyk7XG4gICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICogRml4IHNlY3Rpb24gb3JkZXIgYWZ0ZXIgY29udGludW91c1ZlcnRpY2FsIGNoYW5nZXMgaGF2ZSBiZWVuIGFuaW1hdGVkXG4gICAgKi9cblxuXG4gICAgZnVuY3Rpb24gY29udGludW91c1ZlcnRpY2FsRml4U2VjdGlvbk9yZGVyKHYpIHtcbiAgICAgIC8vIElmIGNvbnRpbnVvdXNWZXJ0aWNhbCBpcyBpbiBlZmZlY3QgKGFuZCBhdXRvU2Nyb2xsaW5nIHdvdWxkIGFsc28gYmUgaW4gZWZmZWN0IHRoZW4pLFxuICAgICAgLy8gZmluaXNoIG1vdmluZyB0aGUgZWxlbWVudHMgYXJvdW5kIHNvIHRoZSBkaXJlY3QgbmF2aWdhdGlvbiB3aWxsIGZ1bmN0aW9uIG1vcmUgc2ltcGx5XG4gICAgICBpZiAodi53cmFwQXJvdW5kRWxlbWVudHMgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh2LmlzTW92ZW1lbnRVcCkge1xuICAgICAgICBiZWZvcmUoJChTRUNUSU9OX1NFTClbMF0sIHYud3JhcEFyb3VuZEVsZW1lbnRzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFmdGVyKCQoU0VDVElPTl9TRUwpW2dldFN0YXRlKCkuc2VjdGlvbnMubGVuZ3RoIC0gMV0sIHYud3JhcEFyb3VuZEVsZW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgc2lsZW50U2Nyb2xsKGdldFN0YXRlKCkuYWN0aXZlU2VjdGlvbi5pdGVtLm9mZnNldFRvcCk7IC8vIE1haW50YWluIHRoZSBhY3RpdmUgc2xpZGVzIHZpc2libGUgaW4gdGhlIHZpZXdwb3J0XG5cbiAgICAgIGtlZXBTbGlkZXNQb3NpdGlvbigpO1xuICAgICAgc2V0U3RhdGUoe1xuICAgICAgICBpc0RvaW5nQ29udGlub3VzVmVydGljYWw6IGZhbHNlXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIE1ha2VzIHN1cmUgbGF6eWxvYWQgaXMgZG9uZSBmb3Igb3RoZXIgc2VjdGlvbnMgaW4gdGhlIHZpZXdwb3J0IHRoYXQgYXJlIG5vdCB0aGVcbiAgICAqIGFjdGl2ZSBvbmUuIFxuICAgICovXG5cbiAgICBmdW5jdGlvbiBsYXp5TG9hZE90aGVycygpIHtcbiAgICAgIHZhciBoYXNBdXRvSGVpZ2h0U2VjdGlvbnMgPSAkKEFVVE9fSEVJR0hUX1NFTClbMF0gfHwgaXNSZXNwb25zaXZlTW9kZSgpICYmICQoQVVUT19IRUlHSFRfUkVTUE9OU0lWRV9TRUwpWzBdOyAvL3F1aXR0aW5nIHdoZW4gaXQgZG9lc24ndCBhcHBseVxuXG4gICAgICBpZiAoIWdldE9wdGlvbnMoKS5sYXp5TG9hZGluZyB8fCAhaGFzQXV0b0hlaWdodFNlY3Rpb25zKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gLy9tYWtpbmcgc3VyZSB0byBsYXp5IGxvYWQgYXV0by1oZWlnaHQgc2VjdGlvbnMgdGhhdCBhcmUgaW4gdGhlIHZpZXdwb3J0XG5cblxuICAgICAgJChTRUNUSU9OX1NFTCArICc6bm90KCcgKyBBQ1RJVkVfU0VMICsgJyknKS5mb3JFYWNoKGZ1bmN0aW9uIChzZWN0aW9uKSB7XG4gICAgICAgIGlmIChpc1NlY3Rpb25JblZpZXdwb3J0KHNlY3Rpb24pKSB7XG4gICAgICAgICAgbGF6eUxvYWQoc2VjdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAqIERldGVybWluZXMgd2hldGhlciBhIHNlY3Rpb24gaXMgaW4gdGhlIHZpZXdwb3J0IG9yIG5vdC5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gaXNTZWN0aW9uSW5WaWV3cG9ydChlbCkge1xuICAgICAgdmFyIHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHZhciB0b3AgPSByZWN0LnRvcDtcbiAgICAgIHZhciBib3R0b20gPSByZWN0LmJvdHRvbTsgLy9zb21ldGltZXMgdGhlcmUncyBhIDFweCBvZmZzZXQgb24gdGhlIGJvdHRvbSBvZiB0aGUgc2NyZWVuIGV2ZW4gd2hlbiB0aGUgXG4gICAgICAvL3NlY3Rpb24ncyBoZWlnaHQgaXMgdGhlIHdpbmRvdy5pbm5lckhlaWdodCBvbmUuIEkgZ3Vlc3MgYmVjYXVzZSBwaXhlbHMgd29uJ3QgYWxsb3cgZGVjaW1hbHMuXG4gICAgICAvL3VzaW5nIHRoaXMgcHJldmVudHMgZnJvbSBsYXp5TG9hZGluZyB0aGUgc2VjdGlvbiB0aGF0IGlzIG5vdCB5ZXQgdmlzaWJsZSBcbiAgICAgIC8vKG9ubHkgMSBwaXhlbCBvZmZzZXQgaXMpXG5cbiAgICAgIHZhciBwaXhlbE9mZnNldCA9IDI7XG4gICAgICB2YXIgaXNUb3BJblZpZXcgPSB0b3AgKyBwaXhlbE9mZnNldCA8IHN0YXRlLndpbmRvd3NIZWlnaHQgJiYgdG9wID4gMDtcbiAgICAgIHZhciBpc0JvdHRvbUluVmlldyA9IGJvdHRvbSA+IHBpeGVsT2Zmc2V0ICYmIGJvdHRvbSA8IHN0YXRlLndpbmRvd3NIZWlnaHQ7XG4gICAgICByZXR1cm4gaXNUb3BJblZpZXcgfHwgaXNCb3R0b21JblZpZXc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9vbHRpcFRleHRIYW5kbGVyKCkge1xuICAgICAgLypqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi9cbiAgICAgIHRyaWdnZXIocHJldih0aGlzKSwgJ2NsaWNrJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICogQWN0aXZhdGluZyB0aGUgdmVydGljYWwgbmF2aWdhdGlvbiBidWxsZXRzIGFjY29yZGluZyB0byB0aGUgZ2l2ZW4gc2xpZGUgbmFtZS5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gYWN0aXZhdGVOYXZEb3RzKG5hbWUsIHNlY3Rpb25JbmRleCkge1xuICAgICAgdmFyIG5hdiA9ICQoU0VDVElPTl9OQVZfU0VMKVswXTtcblxuICAgICAgaWYgKGdldE9wdGlvbnMoKS5uYXZpZ2F0aW9uICYmIG5hdiAhPSBudWxsICYmIG5hdi5zdHlsZS5kaXNwbGF5ICE9PSAnbm9uZScpIHtcbiAgICAgICAgcmVtb3ZlQ2xhc3MoJChBQ1RJVkVfU0VMLCBuYXYpLCBBQ1RJVkUpO1xuXG4gICAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgICAgYWRkQ2xhc3MoJCgnYVtocmVmPVwiIycgKyBuYW1lICsgJ1wiXScsIG5hdiksIEFDVElWRSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWRkQ2xhc3MoJCgnYScsICQoJ2xpJywgbmF2KVtzZWN0aW9uSW5kZXhdKSwgQUNUSVZFKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAqIENyZWF0ZXMgYSB2ZXJ0aWNhbCBuYXZpZ2F0aW9uIGJhci5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gYWRkVmVydGljYWxOYXZpZ2F0aW9uKCkge1xuICAgICAgcmVtb3ZlKCQoU0VDVElPTl9OQVZfU0VMKSk7XG4gICAgICB2YXIgbmF2aWdhdGlvbiA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIG5hdmlnYXRpb24uc2V0QXR0cmlidXRlKCdpZCcsIFNFQ1RJT05fTkFWKTtcbiAgICAgIHZhciBkaXZVbCA9IGRvYy5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgICAgbmF2aWdhdGlvbi5hcHBlbmRDaGlsZChkaXZVbCk7XG4gICAgICBhcHBlbmRUbyhuYXZpZ2F0aW9uLCAkYm9keSk7XG4gICAgICB2YXIgbmF2ID0gJChTRUNUSU9OX05BVl9TRUwpWzBdO1xuICAgICAgYWRkQ2xhc3MobmF2LCAnZnAtJyArIGdldE9wdGlvbnMoKS5uYXZpZ2F0aW9uUG9zaXRpb24pO1xuXG4gICAgICBpZiAoZ2V0T3B0aW9ucygpLnNob3dBY3RpdmVUb29sdGlwKSB7XG4gICAgICAgIGFkZENsYXNzKG5hdiwgU0hPV19BQ1RJVkVfVE9PTFRJUCk7XG4gICAgICB9XG5cbiAgICAgIHZhciBsaSA9ICcnO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGdldFN0YXRlKCkuc2VjdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHNlY3Rpb24gPSBnZXRTdGF0ZSgpLnNlY3Rpb25zW2ldO1xuICAgICAgICB2YXIgbGluayA9ICcnO1xuXG4gICAgICAgIGlmIChnZXRPcHRpb25zKCkuYW5jaG9ycy5sZW5ndGgpIHtcbiAgICAgICAgICBsaW5rID0gc2VjdGlvbi5hbmNob3I7XG4gICAgICAgIH1cblxuICAgICAgICBsaSArPSAnPGxpPjxhIGhyZWY9XCIjJyArIGVuY29kZVVSSShsaW5rKSArICdcIj48c3BhbiBjbGFzcz1cImZwLXNyLW9ubHlcIj4nICsgZ2V0QnVsbGV0TGlua05hbWUoc2VjdGlvbi5pbmRleCgpLCAnU2VjdGlvbicpICsgJzwvc3Bhbj48c3Bhbj48L3NwYW4+PC9hPic7IC8vIE9ubHkgYWRkIHRvb2x0aXAgaWYgbmVlZGVkIChkZWZpbmVkIGJ5IHVzZXIpXG5cbiAgICAgICAgdmFyIHRvb2x0aXAgPSBnZXRPcHRpb25zKCkubmF2aWdhdGlvblRvb2x0aXBzW3NlY3Rpb24uaW5kZXgoKV07XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0b29sdGlwICE9PSAndW5kZWZpbmVkJyAmJiB0b29sdGlwICE9PSAnJykge1xuICAgICAgICAgIGxpICs9ICc8ZGl2IGNsYXNzPVwiJyArIFNFQ1RJT05fTkFWX1RPT0xUSVAgKyAnIGZwLScgKyBnZXRPcHRpb25zKCkubmF2aWdhdGlvblBvc2l0aW9uICsgJ1wiPicgKyB0b29sdGlwICsgJzwvZGl2Pic7XG4gICAgICAgIH1cblxuICAgICAgICBsaSArPSAnPC9saT4nO1xuICAgICAgfVxuXG4gICAgICAkKCd1bCcsIG5hdilbMF0uaW5uZXJIVE1MID0gbGk7IC8vYWN0aXZhdGluZyB0aGUgY3VycmVudCBhY3RpdmUgc2VjdGlvblxuXG4gICAgICB2YXIgYnVsbGV0ID0gJCgnbGknLCAkKFNFQ1RJT05fTkFWX1NFTClbMF0pW2dldFN0YXRlKCkuYWN0aXZlU2VjdGlvbi5pbmRleCgpXTtcbiAgICAgIGFkZENsYXNzKCQoJ2EnLCBidWxsZXQpLCBBQ1RJVkUpO1xuICAgIH0gLy9TY3JvbGxzIHRvIHRoZSBzZWN0aW9uIHdoZW4gY2xpY2tpbmcgdGhlIG5hdmlnYXRpb24gYnVsbGV0XG5cbiAgICBmdW5jdGlvbiBzZWN0aW9uQnVsbGV0SGFuZGxlcihlKSB7XG4gICAgICBpZiAoZS5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICBwcmV2ZW50RGVmYXVsdChlKTtcbiAgICAgIH1cblxuICAgICAgc2V0U3RhdGUoe1xuICAgICAgICBzY3JvbGxUcmlnZ2VyOiAndmVydGljYWxOYXYnXG4gICAgICB9KTtcbiAgICAgIC8qanNoaW50IHZhbGlkdGhpczp0cnVlICovXG4gICAgICAvLyBAdHMtaWdub3JlXG5cbiAgICAgIHZhciBpbmRleEJ1bGxldCA9IGluZGV4KGNsb3Nlc3QodGhpcywgU0VDVElPTl9OQVZfU0VMICsgJyBsaScpKTtcbiAgICAgIEV2ZW50RW1pdHRlci5lbWl0KGV2ZW50cy5zY3JvbGxQYWdlLCB7XG4gICAgICAgIGRlc3RpbmF0aW9uOiBnZXRTdGF0ZSgpLnNlY3Rpb25zW2luZGV4QnVsbGV0XVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBTZXRzIHRvIGFjdGl2ZSB0aGUgY3VycmVudCBtZW51IGFuZCB2ZXJ0aWNhbCBuYXYgaXRlbXMuXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIGFjdGl2YXRlTWVudUFuZE5hdihhbmNob3IsIGluZGV4KSB7XG4gICAgICBhY3RpdmF0ZU1lbnVFbGVtZW50KGFuY2hvcik7XG4gICAgICBhY3RpdmF0ZU5hdkRvdHMoYW5jaG9yLCBpbmRleCk7XG4gICAgfVxuICAgIC8qKlxuICAgICogQWN0aXZhdGluZyB0aGUgd2Vic2l0ZSBtYWluIG1lbnUgZWxlbWVudHMgYWNjb3JkaW5nIHRvIHRoZSBnaXZlbiBzbGlkZSBuYW1lLlxuICAgICovXG5cbiAgICBmdW5jdGlvbiBhY3RpdmF0ZU1lbnVFbGVtZW50KG5hbWUpIHtcbiAgICAgIGlmIChnZXRPcHRpb25zKCkubWVudSAmJiBnZXRPcHRpb25zKCkubWVudS5sZW5ndGgpIHtcbiAgICAgICAgJChnZXRPcHRpb25zKCkubWVudSkuZm9yRWFjaChmdW5jdGlvbiAobWVudSkge1xuICAgICAgICAgIGlmIChtZW51ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJlbW92ZUNsYXNzKCQoQUNUSVZFX1NFTCwgbWVudSksIEFDVElWRSk7XG4gICAgICAgICAgICBhZGRDbGFzcygkKCdbZGF0YS1tZW51YW5jaG9yPVwiJyArIG5hbWUgKyAnXCJdJywgbWVudSksIEFDVElWRSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAvKipcbiAgICAgKiBUcmlnZ2VycyB0aGUgY2FsbGJhY2sgb25jZSBwZXIgc2Nyb2xsIHdoZWVsIGFjdGlvbi5cbiAgICAgKiBCYXNlZCBvbiBzY3JvbGxpbmcgc3BlZWQgZGVsYXkuXG4gICAgICovXG5cbiAgICB2YXIgb25jZVBlclNjcm9sbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBjYW5UcmlnZ2VyRXZlbnQgPSB0cnVlO1xuICAgICAgdmFyIHByZXZXaGVlbFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgIHZhciByZXN1bHQ7XG4gICAgICB2YXIgaXNTY3JvbGxpbmdPbkluaXQgPSAhd2luLmZ1bGxwYWdlX2FwaTtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoc2Nyb2xsVHJpZ2dlciwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGN1cnJlbnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIHZhciB0aW1lVGhyZXNob2xkID0gc2Nyb2xsVHJpZ2dlciA9PT0gJ3doZWVsJyA/IGdldE9wdGlvbnMoKS5zY3JvbGxpbmdTcGVlZCA6IDEwMDtcbiAgICAgICAgY2FuVHJpZ2dlckV2ZW50ID0gaXNTY3JvbGxpbmdPbkluaXQgfHwgY3VycmVudFRpbWUgLSBwcmV2V2hlZWxUaW1lID49IHRpbWVUaHJlc2hvbGQ7XG4gICAgICAgIGlzU2Nyb2xsaW5nT25Jbml0ID0gIXdpbi5mdWxscGFnZV9hcGk7XG5cbiAgICAgICAgaWYgKGNhblRyaWdnZXJFdmVudCkge1xuICAgICAgICAgIHJlc3VsdCA9IGNhbGxiYWNrKCk7XG4gICAgICAgICAgcHJldldoZWVsVGltZSA9IGN1cnJlbnRUaW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHR5cGVvZiByZXN1bHQgIT09ICd1bmRlZmluZWQnID8gcmVzdWx0IDogdHJ1ZTtcbiAgICAgIH07XG4gICAgfSgpO1xuXG4gICAgLyoqXG4gICAgKiBGaXJlcyB0aGUgd2hlZWwgZXZlbnQgb25jZSBwZXIgbW91c2Ugd2hlZWwgdHJpZ2dlci5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gZmlyZUNhbGxiYWNrT25jZVBlclNjcm9sbChjYWxsYmFja05hbWUsIHBhcmFtcykge1xuICAgICAgaWYgKCFpc0Z1bmN0aW9uKGdldE9wdGlvbnMoKS5iZWZvcmVMZWF2ZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVzdWx0ID0gb25jZVBlclNjcm9sbChnZXRTdGF0ZSgpLnNjcm9sbFRyaWdnZXIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGZpcmVDYWxsYmFjayhjYWxsYmFja05hbWUsIHBhcmFtcyk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgRlAubW92ZVRvID0gbW92ZVRvO1xuXG4gICAgRlAuZ2V0U2Nyb2xsWSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBzdGF0ZS5zY3JvbGxZO1xuICAgIH07XG5cbiAgICB2YXIgZ19hZnRlclNlY3Rpb25Mb2Fkc0lkO1xuICAgIHZhciBnX3RyYW5zaXRpb25MYXBzZUlkO1xuICAgIEV2ZW50RW1pdHRlci5vbihldmVudHMub25EZXN0cm95LCBvbkRlc3Ryb3kkNik7XG4gICAgLyoqXG4gICAgKiBTY3JvbGxzIHRoZSBzaXRlIHRvIHRoZSBnaXZlbiBlbGVtZW50IGFuZCBzY3JvbGxzIHRvIHRoZSBzbGlkZSBpZiBhIGNhbGxiYWNrIGlzIGdpdmVuLlxuICAgICovXG5cbiAgICBmdW5jdGlvbiBzY3JvbGxQYWdlKHNlY3Rpb24sIGNhbGxiYWNrLCBpc01vdmVtZW50VXApIHtcbiAgICAgIHZhciBlbGVtZW50ID0gc2VjdGlvbi5pdGVtO1xuXG4gICAgICBpZiAoZWxlbWVudCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gLy90aGVyZSdzIG5vIGVsZW1lbnQgdG8gc2Nyb2xsLCBsZWF2aW5nIHRoZSBmdW5jdGlvblxuXG5cbiAgICAgIHZhciBkdG9wID0gZ2V0RGVzdGluYXRpb25Qb3NpdGlvbihlbGVtZW50KTtcbiAgICAgIHZhciBzbGlkZUFuY2hvckxpbms7XG4gICAgICB2YXIgc2xpZGVJbmRleDsgLy9sb2NhbCB2YXJpYWJsZXNcblxuICAgICAgdmFyIHYgPSB7XG4gICAgICAgIFwiZWxlbWVudFwiOiBlbGVtZW50LFxuICAgICAgICBcImNhbGxiYWNrXCI6IGNhbGxiYWNrLFxuICAgICAgICBcImlzTW92ZW1lbnRVcFwiOiBpc01vdmVtZW50VXAsXG4gICAgICAgIFwiZHRvcFwiOiBkdG9wLFxuICAgICAgICBcInlNb3ZlbWVudFwiOiBnZXRZbW92ZW1lbnQoZ2V0U3RhdGUoKS5hY3RpdmVTZWN0aW9uLCBlbGVtZW50KSxcbiAgICAgICAgXCJhbmNob3JMaW5rXCI6IHNlY3Rpb24uYW5jaG9yLFxuICAgICAgICBcInNlY3Rpb25JbmRleFwiOiBzZWN0aW9uLmluZGV4KCksXG4gICAgICAgIFwiYWN0aXZlU2xpZGVcIjogc2VjdGlvbi5hY3RpdmVTbGlkZSA/IHNlY3Rpb24uYWN0aXZlU2xpZGUuaXRlbSA6IG51bGwsXG4gICAgICAgIFwibGVhdmluZ1NlY3Rpb25cIjogZ2V0U3RhdGUoKS5hY3RpdmVTZWN0aW9uLmluZGV4KCkgKyAxLFxuICAgICAgICAvL2NhY2hpbmcgdGhlIHZhbHVlIG9mIGlzUmVzaXppbmcgYXQgdGhlIG1vbW1lbnQgdGhlIGZ1bmN0aW9uIGlzIGNhbGxlZFxuICAgICAgICAvL2JlY2F1c2UgaXQgd2lsbCBiZSBjaGVja2VkIGxhdGVyIGluc2lkZSBhIHNldFRpbWVvdXQgYW5kIHRoZSB2YWx1ZSBtaWdodCBjaGFuZ2VcbiAgICAgICAgXCJsb2NhbElzUmVzaXppbmdcIjogc3RhdGUuaXNSZXNpemluZyxcbiAgICAgICAgXCJpdGVtc1wiOiB7XG4gICAgICAgICAgXCJvcmlnaW5cIjogZ2V0U3RhdGUoKS5hY3RpdmVTZWN0aW9uLFxuICAgICAgICAgIFwiZGVzdGluYXRpb25cIjogc2VjdGlvblxuICAgICAgICB9LFxuICAgICAgICBcImRpcmVjdGlvblwiOiBudWxsXG4gICAgICB9OyAvL3F1aXRpbmcgd2hlbiBkZXN0aW5hdGlvbiBzY3JvbGwgaXMgdGhlIHNhbWUgYXMgdGhlIGN1cnJlbnQgb25lXG5cbiAgICAgIGlmIChnZXRTdGF0ZSgpLmFjdGl2ZVNlY3Rpb24uaXRlbSA9PSBlbGVtZW50ICYmICFzdGF0ZS5pc1Jlc2l6aW5nIHx8IGdldE9wdGlvbnMoKS5zY3JvbGxCYXIgJiYgZ2V0U2Nyb2xsVG9wKCkgPT09IHYuZHRvcCAmJiAhaGFzQ2xhc3MoZWxlbWVudCwgQVVUT19IRUlHSFQpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHYuYWN0aXZlU2xpZGUgIT0gbnVsbCkge1xuICAgICAgICBzbGlkZUFuY2hvckxpbmsgPSBnZXRBdHRyKHYuYWN0aXZlU2xpZGUsICdkYXRhLWFuY2hvcicpO1xuICAgICAgICBzbGlkZUluZGV4ID0gaW5kZXgodi5hY3RpdmVTbGlkZSwgbnVsbCk7XG4gICAgICB9IC8vY2FsbGJhY2sgKG9uTGVhdmUpIGlmIHRoZSBzaXRlIGlzIG5vdCBqdXN0IHJlc2l6aW5nIGFuZCByZWFkanVzdGluZyB0aGUgc2xpZGVzXG5cblxuICAgICAgaWYgKCF2LmxvY2FsSXNSZXNpemluZykge1xuICAgICAgICB2YXIgZGlyZWN0aW9uID0gdi55TW92ZW1lbnQ7IC8vcmVxdWlyZWQgZm9yIGNvbnRpbm91c1ZlcnRpY2FsXG5cbiAgICAgICAgaWYgKHR5cGVvZiBpc01vdmVtZW50VXAgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgZGlyZWN0aW9uID0gaXNNb3ZlbWVudFVwID8gJ3VwJyA6ICdkb3duJztcbiAgICAgICAgfSAvL2ZvciB0aGUgY2FsbGJhY2tcblxuXG4gICAgICAgIHYuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKGdldE9wdGlvbnMoKS5iZWZvcmVMZWF2ZSkpIHtcbiAgICAgICAgICBpZiAoZmlyZUNhbGxiYWNrT25jZVBlclNjcm9sbCgnYmVmb3JlTGVhdmUnLCB2KSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGdW5jdGlvbihnZXRPcHRpb25zKCkub25MZWF2ZSkpIHtcbiAgICAgICAgICBpZiAoIWZpcmVDYWxsYmFjaygnb25MZWF2ZScsIHYpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IC8vIElmIGNvbnRpbnVvdXNWZXJ0aWNhbCAmJiB3ZSBuZWVkIHRvIHdyYXAgYXJvdW5kXG5cblxuICAgICAgaWYgKGdldE9wdGlvbnMoKS5hdXRvU2Nyb2xsaW5nICYmIGdldE9wdGlvbnMoKS5jb250aW51b3VzVmVydGljYWwgJiYgdHlwZW9mIHYuaXNNb3ZlbWVudFVwICE9PSBcInVuZGVmaW5lZFwiICYmICghdi5pc01vdmVtZW50VXAgJiYgdi55TW92ZW1lbnQgPT0gJ3VwJyB8fCAvLyBJbnRlbmRpbmcgdG8gc2Nyb2xsIGRvd24gYnV0IGFib3V0IHRvIGdvIHVwIG9yXG4gICAgICB2LmlzTW92ZW1lbnRVcCAmJiB2LnlNb3ZlbWVudCA9PSAnZG93bicpKSB7XG4gICAgICAgIC8vIGludGVuZGluZyB0byBzY3JvbGwgdXAgYnV0IGFib3V0IHRvIGdvIGRvd25cbiAgICAgICAgdiA9IGNyZWF0ZUluZmluaXRlU2VjdGlvbnModik7XG4gICAgICB9IC8vcGF1c2luZyBtZWRpYSBvZiB0aGUgbGVhdmluZyBzZWN0aW9uIChpZiB3ZSBhcmUgbm90IGp1c3QgcmVzaXppbmcsIGFzIGRlc3RpbmF0aW5vIHdpbGwgYmUgdGhlIHNhbWUgb25lKVxuXG5cbiAgICAgIGlmICghdi5sb2NhbElzUmVzaXppbmcpIHtcbiAgICAgICAgc3RvcE1lZGlhKGdldFN0YXRlKCkuYWN0aXZlU2VjdGlvbi5pdGVtKTtcbiAgICAgIH1cblxuICAgICAgYWRkQ2xhc3MoZWxlbWVudCwgQUNUSVZFKTtcbiAgICAgIHJlbW92ZUNsYXNzKHNpYmxpbmdzKGVsZW1lbnQpLCBBQ1RJVkUpO1xuICAgICAgdXBkYXRlU3RhdGUoKTtcbiAgICAgIGxhenlMb2FkKGVsZW1lbnQpOyAvL3ByZXZlbnRpbmcgZnJvbSBhY3RpdmF0aW5nIHRoZSBNb3VzZVdoZWVsSGFuZGxlciBldmVudFxuICAgICAgLy9tb3JlIHRoYW4gb25jZSBpZiB0aGUgcGFnZSBpcyBzY3JvbGxpbmdcblxuICAgICAgc2V0U3RhdGUoe1xuICAgICAgICBjYW5TY3JvbGw6IEZQLnRlc3QuaXNUZXN0aW5nXG4gICAgICB9KTtcbiAgICAgIHNldFBhZ2VTdGF0dXMoc2xpZGVJbmRleCwgc2xpZGVBbmNob3JMaW5rLCB2LmFuY2hvckxpbmspO1xuICAgICAgcGVyZm9ybU1vdmVtZW50KHYpOyAvL2ZsYWcgdG8gYXZvaWQgY2FsbGluZ24gYHNjcm9sbFBhZ2UoKWAgdHdpY2UgaW4gY2FzZSBvZiB1c2luZyBhbmNob3IgbGlua3NcblxuICAgICAgc2V0U3RhdGUoe1xuICAgICAgICBsYXN0U2Nyb2xsZWREZXN0aW55OiB2LmFuY2hvckxpbmtcbiAgICAgIH0pOyAvL2F2b2lkIGZpcmluZyBpdCB0d2ljZSAoYXMgaXQgZG9lcyBhbHNvIG9uIHNjcm9sbClcblxuICAgICAgYWN0aXZhdGVNZW51QW5kTmF2KHYuYW5jaG9yTGluaywgdi5zZWN0aW9uSW5kZXgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRGVzdHJveSQ2KCkge1xuICAgICAgY2xlYXJUaW1lb3V0KGdfYWZ0ZXJTZWN0aW9uTG9hZHNJZCk7XG4gICAgICBjbGVhclRpbWVvdXQoZ190cmFuc2l0aW9uTGFwc2VJZCk7XG4gICAgfVxuICAgIC8qKlxuICAgICogUmV0dXJucyB0aGUgZGVzdGluYXRpb24gWSBwb3NpdGlvbiBiYXNlZCBvbiB0aGUgc2Nyb2xsaW5nIGRpcmVjdGlvbiBhbmRcbiAgICAqIHRoZSBoZWlnaHQgb2YgdGhlIHNlY3Rpb24uXG4gICAgKi9cblxuXG4gICAgZnVuY3Rpb24gZ2V0RGVzdGluYXRpb25Qb3NpdGlvbihlbGVtZW50KSB7XG4gICAgICB2YXIgZWxlbWVudEhlaWdodCA9IGVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgICAgdmFyIGVsZW1lbnRUb3AgPSBlbGVtZW50Lm9mZnNldFRvcDsgLy90b3Agb2YgdGhlIGRlc2luYXRpb24gd2lsbCBiZSBhdCB0aGUgdG9wIG9mIHRoZSB2aWV3cG9ydFxuXG4gICAgICB2YXIgcG9zaXRpb24gPSBlbGVtZW50VG9wO1xuICAgICAgdmFyIGlzU2Nyb2xsaW5nRG93biA9IGVsZW1lbnRUb3AgPiBzdGF0ZS5wcmV2aW91c0Rlc3RUb3A7XG4gICAgICB2YXIgc2VjdGlvbkJvdHRvbSA9IHBvc2l0aW9uIC0gZ2V0V2luZG93SGVpZ2h0KCkgKyBlbGVtZW50SGVpZ2h0O1xuICAgICAgdmFyIGJpZ1NlY3Rpb25zRGVzdGluYXRpb24gPSBnZXRPcHRpb25zKCkuYmlnU2VjdGlvbnNEZXN0aW5hdGlvbjsgLy9pcyB0aGUgZGVzdGluYXRpb24gZWxlbWVudCBiaWdnZXIgdGhhbiB0aGUgdmlld3BvcnQ/XG5cbiAgICAgIGlmIChlbGVtZW50SGVpZ2h0ID4gZ2V0V2luZG93SGVpZ2h0KCkpIHtcbiAgICAgICAgLy9zY3JvbGxpbmcgdXA/XG4gICAgICAgIGlmICghaXNTY3JvbGxpbmdEb3duICYmICFiaWdTZWN0aW9uc0Rlc3RpbmF0aW9uIHx8IGJpZ1NlY3Rpb25zRGVzdGluYXRpb24gPT09ICdib3R0b20nKSB7XG4gICAgICAgICAgcG9zaXRpb24gPSBzZWN0aW9uQm90dG9tO1xuICAgICAgICB9XG4gICAgICB9IC8vc2VjdGlvbnMgZXF1YWwgb3Igc21hbGxlciB0aGFuIHRoZSB2aWV3cG9ydCBoZWlnaHQgJiYgc2Nyb2xsaW5nIGRvd24/IHx8ICBpcyByZXNpemluZyBhbmQgaXRzIGluIHRoZSBsYXN0IHNlY3Rpb25cbiAgICAgIGVsc2UgaWYgKGlzU2Nyb2xsaW5nRG93biB8fCBzdGF0ZS5pc1Jlc2l6aW5nICYmIG5leHQoZWxlbWVudCkgPT0gbnVsbCkge1xuICAgICAgICAvL1RoZSBib3R0b20gb2YgdGhlIGRlc3RpbmF0aW9uIHdpbGwgYmUgYXQgdGhlIGJvdHRvbSBvZiB0aGUgdmlld3BvcnRcbiAgICAgICAgcG9zaXRpb24gPSBzZWN0aW9uQm90dG9tO1xuICAgICAgfVxuICAgICAgLypcbiAgICAgIEtlZXBpbmcgcmVjb3JkIG9mIHRoZSBsYXN0IHNjcm9sbGVkIHBvc2l0aW9uIHRvIGRldGVybWluZSB0aGUgc2Nyb2xsaW5nIGRpcmVjdGlvbi5cbiAgICAgIE5vIGNvbnZlbnRpb25hbCBtZXRob2RzIGNhbiBiZSB1c2VkIGFzIHRoZSBzY3JvbGwgYmFyIG1pZ2h0IG5vdCBiZSBwcmVzZW50XG4gICAgICBBTkQgdGhlIHNlY3Rpb24gbWlnaHQgbm90IGJlIGFjdGl2ZSBpZiBpdCBpcyBhdXRvLWhlaWdodCBhbmQgZGlkbnQgcmVhY2ggdGhlIG1pZGRsZVxuICAgICAgb2YgdGhlIHZpZXdwb3J0LlxuICAgICAgKi9cblxuXG4gICAgICBzZXRTdGF0ZSh7XG4gICAgICAgIHByZXZpb3VzRGVzdFRvcDogcG9zaXRpb25cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHBvc2l0aW9uO1xuICAgIH1cbiAgICAvKipcbiAgICAqIFBlcmZvcm1zIHRoZSB2ZXJ0aWNhbCBtb3ZlbWVudCAoYnkgQ1NTMyBvciBieSBqUXVlcnkpXG4gICAgKi9cblxuXG4gICAgZnVuY3Rpb24gcGVyZm9ybU1vdmVtZW50KHYpIHtcbiAgICAgIHZhciBpc0Zhc3RTcGVlZCA9IGdldE9wdGlvbnMoKS5zY3JvbGxpbmdTcGVlZCA8IDcwMDtcbiAgICAgIHZhciB0cmFuc2l0aW9uTGFwc2UgPSBpc0Zhc3RTcGVlZCA/IDcwMCA6IGdldE9wdGlvbnMoKS5zY3JvbGxpbmdTcGVlZDtcbiAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgdG91Y2hEaXJlY3Rpb246ICdub25lJyxcbiAgICAgICAgc2Nyb2xsWTogTWF0aC5yb3VuZCh2LmR0b3ApXG4gICAgICB9KTtcbiAgICAgIEV2ZW50RW1pdHRlci5lbWl0KGV2ZW50cy5vblBlcmZvcm1Nb3ZlbWVudCk7IC8vIHVzaW5nIENTUzMgdHJhbnNsYXRlIGZ1bmN0aW9uYWxpdHlcblxuICAgICAgaWYgKGdldE9wdGlvbnMoKS5jc3MzICYmIGdldE9wdGlvbnMoKS5hdXRvU2Nyb2xsaW5nICYmICFnZXRPcHRpb25zKCkuc2Nyb2xsQmFyKSB7XG4gICAgICAgIC8vIFRoZSBmaXJzdCBzZWN0aW9uIGNhbiBoYXZlIGEgbmVnYXRpdmUgdmFsdWUgaW4gaU9TIDEwLiBOb3QgcXVpdGUgc3VyZSB3aHk6IC0wLjAxNDI4MjIyNjU2MjVcbiAgICAgICAgLy8gdGhhdCdzIHdoeSB3ZSByb3VuZCBpdCB0byAwLlxuICAgICAgICB2YXIgdHJhbnNsYXRlM2QgPSAndHJhbnNsYXRlM2QoMHB4LCAtJyArIE1hdGgucm91bmQodi5kdG9wKSArICdweCwgMHB4KSc7XG4gICAgICAgIHRyYW5zZm9ybUNvbnRhaW5lcih0cmFuc2xhdGUzZCwgdHJ1ZSk7IC8vZXZlbiB3aGVuIHRoZSBzY3JvbGxpbmdTcGVlZCBpcyAwIHRoZXJlJ3MgYSBsaXR0bGUgZGVsYXksIHdoaWNoIG1pZ2h0IGNhdXNlIHRoZVxuICAgICAgICAvL3Njcm9sbGluZ1NwZWVkIHRvIGNoYW5nZSBpbiBjYXNlIG9mIHVzaW5nIHNpbGVudE1vdmVUbygpO8OnXG5cbiAgICAgICAgaWYgKGdldE9wdGlvbnMoKS5zY3JvbGxpbmdTcGVlZCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dChnX2FmdGVyU2VjdGlvbkxvYWRzSWQpO1xuICAgICAgICAgIGdfYWZ0ZXJTZWN0aW9uTG9hZHNJZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgYWZ0ZXJTZWN0aW9uTG9hZHMkMSh2KTsgLy9kaXNhYmxpbmcgY2FuU2Nyb2xsIHdoZW4gdXNpbmcgZmFzdFNwZWVkXG5cbiAgICAgICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICAgICAgY2FuU2Nyb2xsOiAhaXNGYXN0U3BlZWQgfHwgRlAudGVzdC5pc1Rlc3RpbmdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sIGdldE9wdGlvbnMoKS5zY3JvbGxpbmdTcGVlZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWZ0ZXJTZWN0aW9uTG9hZHMkMSh2KTtcbiAgICAgICAgfVxuICAgICAgfSAvLyB1c2luZyBKUyB0byBhbmltYXRlXG4gICAgICBlbHNlIHtcbiAgICAgICAgdmFyIHNjcm9sbFNldHRpbmdzID0gZ2V0U2Nyb2xsU2V0dGluZ3Modi5kdG9wKTtcbiAgICAgICAgRlAudGVzdC50b3AgPSAtdi5kdG9wICsgJ3B4JztcbiAgICAgICAgY2xlYXJUaW1lb3V0KGdfYWZ0ZXJTZWN0aW9uTG9hZHNJZCk7XG4gICAgICAgIHNjcm9sbFRvKHNjcm9sbFNldHRpbmdzLmVsZW1lbnQsIHNjcm9sbFNldHRpbmdzLm9wdGlvbnMsIGdldE9wdGlvbnMoKS5zY3JvbGxpbmdTcGVlZCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChnZXRPcHRpb25zKCkuc2Nyb2xsQmFyKSB7XG4gICAgICAgICAgICAvKiBIYWNrIVxuICAgICAgICAgICAgVGhlIHRpbWVvdXQgcHJldmVudHMgc2V0dGluZyB0aGUgbW9zdCBkb21pbmFudCBzZWN0aW9uIGluIHRoZSB2aWV3cG9ydCBhcyBcImFjdGl2ZVwiIHdoZW4gdGhlIHVzZXJcbiAgICAgICAgICAgIHNjcm9sbGVkIHRvIGEgc21hbGxlciBzZWN0aW9uIGJ5IHVzaW5nIHRoZSBtb3VzZXdoZWVsIChhdXRvIHNjcm9sbGluZykgcmF0aGVyIHRoYW4gZHJhZ2luZyB0aGUgc2Nyb2xsIGJhci5cbiAgICAgICAgICAgICBXaGVuIHVzaW5nIHNjcm9sbEJhcjp0cnVlIEl0IHNlZW1zIGxpa2UgdGhlIHNjcm9sbCBldmVudHMgc3RpbGwgZ2V0dGluZyBwcm9wYWdhdGVkIGV2ZW4gYWZ0ZXIgdGhlIHNjcm9sbGluZyBhbmltYXRpb24gaGFzIGZpbmlzaGVkLlxuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGdfYWZ0ZXJTZWN0aW9uTG9hZHNJZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBhZnRlclNlY3Rpb25Mb2FkcyQxKHYpO1xuICAgICAgICAgICAgfSwgMzApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhZnRlclNlY3Rpb25Mb2FkcyQxKHYpOyAvL2Rpc2FibGluZyBjYW5TY3JvbGwgd2hlbiB1c2luZyBmYXN0U3BlZWRcblxuICAgICAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgICAgICBjYW5TY3JvbGw6ICFpc0Zhc3RTcGVlZCB8fCBGUC50ZXN0LmlzVGVzdGluZ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gLy8gZW5hYmxpbmcgY2FuU2Nyb2xsIGFmdGVyIHRoZSBtaW5pbXVtIHRyYW5zaXRpb24gbGFwc1xuXG5cbiAgICAgIGlmIChpc0Zhc3RTcGVlZCkge1xuICAgICAgICBjbGVhclRpbWVvdXQoZ190cmFuc2l0aW9uTGFwc2VJZCk7XG4gICAgICAgIGdfdHJhbnNpdGlvbkxhcHNlSWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgICBjYW5TY3JvbGw6IHRydWVcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSwgdHJhbnNpdGlvbkxhcHNlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgKiBBY3Rpb25zIHRvIGRvIG9uY2UgdGhlIHNlY3Rpb24gaXMgbG9hZGVkLlxuICAgICovXG5cblxuICAgIGZ1bmN0aW9uIGFmdGVyU2VjdGlvbkxvYWRzJDEodikge1xuICAgICAgc2V0U3RhdGUoe1xuICAgICAgICBpc0JleW9uZEZ1bGxwYWdlOiBmYWxzZVxuICAgICAgfSk7XG4gICAgICBjb250aW51b3VzVmVydGljYWxGaXhTZWN0aW9uT3JkZXIodik7IC8vY2FsbGJhY2sgKGFmdGVyTG9hZCkgaWYgdGhlIHNpdGUgaXMgbm90IGp1c3QgcmVzaXppbmcgYW5kIHJlYWRqdXN0aW5nIHRoZSBzbGlkZXNcblxuICAgICAgaWYgKGlzRnVuY3Rpb24oZ2V0T3B0aW9ucygpLmFmdGVyTG9hZCkgJiYgIXYubG9jYWxJc1Jlc2l6aW5nKSB7XG4gICAgICAgIGZpcmVDYWxsYmFjaygnYWZ0ZXJMb2FkJywgdik7XG4gICAgICB9XG5cbiAgICAgIHVwZGF0ZVN0YXRlKCk7XG5cbiAgICAgIGlmICghdi5sb2NhbElzUmVzaXppbmcpIHtcbiAgICAgICAgcGxheU1lZGlhKHYuZWxlbWVudCk7XG4gICAgICB9XG5cbiAgICAgIGFkZENsYXNzKHYuZWxlbWVudCwgQ09NUExFVEVMWSk7XG4gICAgICByZW1vdmVDbGFzcyhzaWJsaW5ncyh2LmVsZW1lbnQpLCBDT01QTEVURUxZKTtcbiAgICAgIGxhenlMb2FkT3RoZXJzKCk7XG4gICAgICBzY3JvbGxPdmVyZmxvd0hhbmRsZXIuYWZ0ZXJTZWN0aW9uTG9hZHMoKTtcbiAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgY2FuU2Nyb2xsOiB0cnVlXG4gICAgICB9KTtcbiAgICAgIEV2ZW50RW1pdHRlci5lbWl0KGV2ZW50cy5hZnRlclNlY3Rpb25Mb2Fkcywgdik7XG5cbiAgICAgIGlmIChpc0Z1bmN0aW9uKHYuY2FsbGJhY2spKSB7XG4gICAgICAgIHYuY2FsbGJhY2soKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBGUC5zZXRGaXRUb1NlY3Rpb24gPSBzZXRGaXRUb1NlY3Rpb247XG4gICAgRlAuZml0VG9TZWN0aW9uID0gZml0VG9TZWN0aW9uO1xuICAgIC8qKlxuICAgICogU2V0cyBmaXRUb1NlY3Rpb25cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gc2V0Rml0VG9TZWN0aW9uKHZhbHVlLCB0eXBlKSB7XG4gICAgICBzZXRWYXJpYWJsZVN0YXRlKCdmaXRUb1NlY3Rpb24nLCB2YWx1ZSwgdHlwZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICogRml0cyB0aGUgc2l0ZSB0byB0aGUgbmVhcmVzdCBhY3RpdmUgc2VjdGlvblxuICAgICovXG5cbiAgICBmdW5jdGlvbiBmaXRUb1NlY3Rpb24oKSB7XG4gICAgICAvL2NoZWNraW5nIGZpdFRvU2VjdGlvbiBhZ2FpbiBpbiBjYXNlIGl0IHdhcyBzZXQgdG8gZmFsc2UgYmVmb3JlIHRoZSB0aW1lb3V0IGRlbGF5XG4gICAgICBpZiAoc3RhdGUuY2FuU2Nyb2xsKSB7XG4gICAgICAgIC8vYWxsb3dzIHRvIHNjcm9sbCB0byBhbiBhY3RpdmUgc2VjdGlvbiBhbmRcbiAgICAgICAgLy9pZiB0aGUgc2VjdGlvbiBpcyBhbHJlYWR5IGFjdGl2ZSwgd2UgcHJldmVudCBmaXJpbmcgY2FsbGJhY2tzXG4gICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICBpc1Jlc2l6aW5nOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBzY3JvbGxQYWdlKHN0YXRlLmFjdGl2ZVNlY3Rpb24pO1xuICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgaXNSZXNpemluZzogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgRlAuc2V0UmVzcG9uc2l2ZSA9IHNldFJlc3BvbnNpdmU7XG4gICAgLyoqXG4gICAgKiBDaGVja3MgaWYgdGhlIHNpdGUgbmVlZHMgdG8gZ2V0IHJlc3BvbnNpdmUgYW5kIGRpc2FibGVzIGF1dG9TY3JvbGxpbmcgaWYgc28uXG4gICAgKiBBIGNsYXNzIGBmcC1yZXNwb25zaXZlYCBpcyBhZGRlZCB0byB0aGUgcGx1Z2luJ3MgY29udGFpbmVyIGluIGNhc2UgdGhlIHVzZXIgd2FudHMgdG8gdXNlIGl0IGZvciBoaXMgb3duIHJlc3BvbnNpdmUgQ1NTLlxuICAgICovXG5cbiAgICBmdW5jdGlvbiByZXNwb25zaXZlKCkge1xuICAgICAgdmFyIHdpZHRoTGltaXQgPSBnZXRPcHRpb25zKCkucmVzcG9uc2l2ZSB8fCBnZXRPcHRpb25zKCkucmVzcG9uc2l2ZVdpZHRoOyAvL2JhY2t3YXJkcyBjb21wYXRpYmxpdHlcblxuICAgICAgdmFyIGhlaWdodExpbWl0ID0gZ2V0T3B0aW9ucygpLnJlc3BvbnNpdmVIZWlnaHQ7IC8vb25seSBjYWxjdWxhdGluZyB3aGF0IHdlIG5lZWQuIFJlbWVtYmVyIGl0cyBjYWxsZWQgb24gdGhlIHJlc2l6ZSBldmVudC5cblxuICAgICAgdmFyIGlzQnJlYWtpbmdQb2ludFdpZHRoID0gd2lkdGhMaW1pdCAmJiB3aW4uaW5uZXJXaWR0aCA8IHdpZHRoTGltaXQ7XG4gICAgICB2YXIgaXNCcmVha2luZ1BvaW50SGVpZ2h0ID0gaGVpZ2h0TGltaXQgJiYgd2luLmlubmVySGVpZ2h0IDwgaGVpZ2h0TGltaXQ7XG5cbiAgICAgIGlmICh3aWR0aExpbWl0ICYmIGhlaWdodExpbWl0KSB7XG4gICAgICAgIHNldFJlc3BvbnNpdmUoaXNCcmVha2luZ1BvaW50V2lkdGggfHwgaXNCcmVha2luZ1BvaW50SGVpZ2h0KTtcbiAgICAgIH0gZWxzZSBpZiAod2lkdGhMaW1pdCkge1xuICAgICAgICBzZXRSZXNwb25zaXZlKGlzQnJlYWtpbmdQb2ludFdpZHRoKTtcbiAgICAgIH0gZWxzZSBpZiAoaGVpZ2h0TGltaXQpIHtcbiAgICAgICAgc2V0UmVzcG9uc2l2ZShpc0JyZWFraW5nUG9pbnRIZWlnaHQpO1xuICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAqIFR1cm5zIGZ1bGxQYWdlLmpzIHRvIG5vcm1hbCBzY3JvbGxpbmcgbW9kZSB3aGVuIHRoZSB2aWV3cG9ydCBgd2lkdGhgIG9yIGBoZWlnaHRgXG4gICAgKiBhcmUgc21hbGxlciB0aGFuIHRoZSBzZXQgbGltaXQgdmFsdWVzLlxuICAgICovXG5cbiAgICBmdW5jdGlvbiBzZXRSZXNwb25zaXZlKGFjdGl2ZSkge1xuICAgICAgdmFyIGlzUmVzcG9uc2l2ZSA9IGlzUmVzcG9uc2l2ZU1vZGUoKTtcblxuICAgICAgaWYgKGFjdGl2ZSkge1xuICAgICAgICBpZiAoIWlzUmVzcG9uc2l2ZSkge1xuICAgICAgICAgIHNldEF1dG9TY3JvbGxpbmcoZmFsc2UsICdpbnRlcm5hbCcpO1xuICAgICAgICAgIHNldEZpdFRvU2VjdGlvbihmYWxzZSwgJ2ludGVybmFsJyk7XG4gICAgICAgICAgaGlkZSgkKFNFQ1RJT05fTkFWX1NFTCkpO1xuICAgICAgICAgIGFkZENsYXNzKCRib2R5LCBSRVNQT05TSVZFKTtcblxuICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKGdldE9wdGlvbnMoKS5hZnRlclJlc3BvbnNpdmUpKSB7XG4gICAgICAgICAgICBnZXRPcHRpb25zKCkuYWZ0ZXJSZXNwb25zaXZlLmNhbGwoZ2V0Q29udGFpbmVyKCksIGFjdGl2ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGlzUmVzcG9uc2l2ZSkge1xuICAgICAgICBzZXRBdXRvU2Nyb2xsaW5nKGdldE9yaWdpbmFscygpLmF1dG9TY3JvbGxpbmcsICdpbnRlcm5hbCcpO1xuICAgICAgICBzZXRGaXRUb1NlY3Rpb24oZ2V0T3JpZ2luYWxzKCkuYXV0b1Njcm9sbGluZywgJ2ludGVybmFsJyk7XG4gICAgICAgIHNob3coJChTRUNUSU9OX05BVl9TRUwpKTtcbiAgICAgICAgcmVtb3ZlQ2xhc3MoJGJvZHksIFJFU1BPTlNJVkUpO1xuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKGdldE9wdGlvbnMoKS5hZnRlclJlc3BvbnNpdmUpKSB7XG4gICAgICAgICAgZ2V0T3B0aW9ucygpLmFmdGVyUmVzcG9uc2l2ZS5jYWxsKGdldENvbnRhaW5lcigpLCBhY3RpdmUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICogRGV0ZXJtaW5lcyB3aGV0aGVyIGZ1bGxwYWdlLmpzIGlzIGluIHJlc3BvbnNpdmUgbW9kZSBvciBub3QuXG4gICAgKi9cblxuXG4gICAgZnVuY3Rpb24gaXNSZXNwb25zaXZlTW9kZSgpIHtcbiAgICAgIHJldHVybiBoYXNDbGFzcygkYm9keSwgUkVTUE9OU0lWRSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkVGFibGVDbGFzcyhlbGVtZW50KSB7XG4gICAgICBpZiAoIWdldE9wdGlvbnMoKS52ZXJ0aWNhbENlbnRlcmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gLy8gT3ZlcmZsb3dpbmcgc2VjdGlvbnMgd2hlbiBzY3JvbGxPdmVyZmxvdyBpcyBkaXNhYmxlZCB3aWxsIGJlIGF1dG9IZWlnaHRcbiAgICAgIC8vIGFuZCB3b24ndCByZXF1aXJlIHZlcnRpY2FsIGFsaWdtZW50XG5cblxuICAgICAgaWYgKCFnZXRPcHRpb25zKCkuc2Nyb2xsT3ZlcmZsb3cgJiYgc2Nyb2xsT3ZlcmZsb3dIYW5kbGVyLnNob3VsZEJlU2Nyb2xsYWJsZShlbGVtZW50Lml0ZW0pKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKCFzY3JvbGxPdmVyZmxvd0hhbmRsZXIuaXNTY3JvbGxhYmxlKGVsZW1lbnQpKSB7XG4gICAgICAgIC8vSW4gY2FzZSB3ZSBhcmUgc3R5bGluZyBmb3IgdGhlIDJuZCB0aW1lIGFzIGluIHdpdGggcmVwb25zaXZlU2xpZGVzXG4gICAgICAgIGlmICghaGFzQ2xhc3MoZWxlbWVudC5pdGVtLCBUQUJMRSkpIHtcbiAgICAgICAgICBhZGRDbGFzcyhlbGVtZW50Lml0ZW0sIFRBQkxFKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBzdGFydGluZ1NlY3Rpb24gPSBudWxsO1xuICAgIEZQLmdldEFjdGl2ZVNlY3Rpb24gPSBnZXRBY3RpdmVTZWN0aW9uO1xuICAgIGZ1bmN0aW9uIGdldFN0YXJ0aW5nU2VjdGlvbigpIHtcbiAgICAgIHJldHVybiBzdGFydGluZ1NlY3Rpb247XG4gICAgfVxuICAgIC8qKlxuICAgICogU3R5bGluZyB2ZXJ0aWNhbCBzZWN0aW9uc1xuICAgICovXG5cbiAgICBmdW5jdGlvbiBzdHlsZVNlY3Rpb24oc2VjdGlvbikge1xuICAgICAgdmFyIHNlY3Rpb25FbGVtID0gc2VjdGlvbi5pdGVtO1xuICAgICAgdmFyIGhhc1NsaWRlcyA9IHNlY3Rpb24uYWxsU2xpZGVzSXRlbXMubGVuZ3RoO1xuICAgICAgdmFyIGluZGV4ID0gc2VjdGlvbi5pbmRleCgpOyAvL2lmIG5vIGFjdGl2ZSBzZWN0aW9uIGlzIGRlZmluZWQsIHRoZSAxc3Qgb25lIHdpbGwgYmUgdGhlIGRlZmF1bHQgb25lXG5cbiAgICAgIGlmICghZ2V0U3RhdGUoKS5hY3RpdmVTZWN0aW9uICYmIHNlY3Rpb24uaXNWaXNpYmxlKSB7XG4gICAgICAgIGFkZENsYXNzKHNlY3Rpb25FbGVtLCBBQ1RJVkUpO1xuICAgICAgICB1cGRhdGVTdGF0ZSgpO1xuICAgICAgfVxuXG4gICAgICBzdGFydGluZ1NlY3Rpb24gPSBnZXRTdGF0ZSgpLmFjdGl2ZVNlY3Rpb24uaXRlbTtcblxuICAgICAgaWYgKGdldE9wdGlvbnMoKS5wYWRkaW5nVG9wKSB7XG4gICAgICAgIGNzcyhzZWN0aW9uRWxlbSwge1xuICAgICAgICAgICdwYWRkaW5nLXRvcCc6IGdldE9wdGlvbnMoKS5wYWRkaW5nVG9wXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoZ2V0T3B0aW9ucygpLnBhZGRpbmdCb3R0b20pIHtcbiAgICAgICAgY3NzKHNlY3Rpb25FbGVtLCB7XG4gICAgICAgICAgJ3BhZGRpbmctYm90dG9tJzogZ2V0T3B0aW9ucygpLnBhZGRpbmdCb3R0b21cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgZ2V0T3B0aW9ucygpLnNlY3Rpb25zQ29sb3JbaW5kZXhdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjc3Moc2VjdGlvbkVsZW0sIHtcbiAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IGdldE9wdGlvbnMoKS5zZWN0aW9uc0NvbG9yW2luZGV4XVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBnZXRPcHRpb25zKCkuYW5jaG9yc1tpbmRleF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHNlY3Rpb25FbGVtLnNldEF0dHJpYnV0ZSgnZGF0YS1hbmNob3InLCBzZWN0aW9uLmFuY2hvcik7XG4gICAgICB9XG5cbiAgICAgIGlmICghaGFzU2xpZGVzKSB7XG4gICAgICAgIGFkZFRhYmxlQ2xhc3Moc2VjdGlvbik7XG4gICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICogR2V0cyB0aGUgYWN0aXZlIHNlY3Rpb24uXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIGdldEFjdGl2ZVNlY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZ2V0U3RhdGUoKS5hY3RpdmVTZWN0aW9uO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFNlY3Rpb25Gcm9tUGFuZWwocGFuZWwpIHtcbiAgICAgIHJldHVybiBwYW5lbC5pc1NlY3Rpb24gPyBwYW5lbCA6IHBhbmVsLnBhcmVudDtcbiAgICB9XG5cbiAgICBFdmVudEVtaXR0ZXIub24oZXZlbnRzLmJpbmRFdmVudHMsIGJpbmRFdmVudHMkYSk7XG5cbiAgICBmdW5jdGlvbiBiaW5kRXZlbnRzJGEoKSB7XG4gICAgICAvLyBXZSBjYW4ndCBmb2N1cyBzY3JvbGxPdmVyZmxvdyBiZWZvcmUgc2Nyb2xsaW5nXG4gICAgICAvLyB0byB0aGUgYW5jaG9yIChpZiB3ZSBuZWVkIHRvKVxuICAgICAgRXZlbnRFbWl0dGVyLm9uKGV2ZW50cy5vbkFmdGVyUmVuZGVyTm9BbmNob3IsIGFmdGVyUmVuZGVyKTtcbiAgICAgIEV2ZW50RW1pdHRlci5vbihldmVudHMuYWZ0ZXJTbGlkZUxvYWRzLCBzY3JvbGxPdmVyZmxvd0hhbmRsZXIuYWZ0ZXJTZWN0aW9uTG9hZHMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFmdGVyUmVuZGVyKCkge1xuICAgICAgaWYgKGdldE9wdGlvbnMoKS5zY3JvbGxPdmVyZmxvdyAmJiAhZ2V0T3B0aW9ucygpLnNjcm9sbEJhcikge1xuICAgICAgICBzY3JvbGxPdmVyZmxvd0hhbmRsZXIubWFrZVNjcm9sbGFibGUoKTtcbiAgICAgICAgc2Nyb2xsT3ZlcmZsb3dIYW5kbGVyLmFmdGVyU2VjdGlvbkxvYWRzKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHNjcm9sbE92ZXJmbG93SGFuZGxlciA9IHtcbiAgICAgIGZvY3VzZWRFbGVtOiBudWxsLFxuICAgICAgdGltZUJlZm9yZVJlYWNoaW5nTGltaXQ6IG51bGwsXG4gICAgICB0aW1lTGFzdFNjcm9sbDogbnVsbCxcbiAgICAgIHByZXZlbnRTY3JvbGxXaGlsZU1vdmluZzogZnVuY3Rpb24gcHJldmVudFNjcm9sbFdoaWxlTW92aW5nKGUpIHtcbiAgICAgICAgaWYgKCFzdGF0ZS5jYW5TY3JvbGwpIHtcbiAgICAgICAgICBwcmV2ZW50RGVmYXVsdChlKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBhZnRlclNlY3Rpb25Mb2FkczogZnVuY3Rpb24gYWZ0ZXJTZWN0aW9uTG9hZHMoKSB7XG4gICAgICAgIGlmICghZ2V0T3B0aW9ucygpLnNjcm9sbE92ZXJmbG93KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IC8vIFVuZm9jdXNpbmcgdGhlIHNjcm9sbGFibGUgZWxlbWVudCBmcm9tIHRoZSBvcmdpbiBzZWN0aW9uL3NsaWRlXG5cblxuICAgICAgICBpZiAoZG9jLmFjdGl2ZUVsZW1lbnQgPT09IHRoaXMuZm9jdXNlZEVsZW0pIHtcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgdGhpcy5mb2N1c2VkRWxlbS5ibHVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc2Nyb2xsYWJsZUl0ZW0gPSBzY3JvbGxPdmVyZmxvd0hhbmRsZXIuZ2V0U2Nyb2xsYWJsZUl0ZW0oZ2V0U3RhdGUoKS5hY3RpdmVTZWN0aW9uLml0ZW0pOyAvLyBPbiBkZXNrdG9wIHdlIGZvY3VzIHRoZSBzY3JvbGxhYmxlIHRvIGJlIGFibGUgdG8gdXNlIHRoZSBtb3VzZSB3aGVlbFxuICAgICAgICAvLyBXZSBhdm9pZCBpdCBvbiBtb2JpbGUgZHVlIHRvIGEgYnVnIGluIGlPUyBTYWZhcmlcblxuICAgICAgICBpZiAoc2Nyb2xsYWJsZUl0ZW0gJiYgIWlzVG91Y2hEZXZpY2UgJiYgIWlzVG91Y2gpIHtcbiAgICAgICAgICB0aGlzLmZvY3VzZWRFbGVtID0gc2Nyb2xsYWJsZUl0ZW07XG4gICAgICAgICAgdGhpcy5mb2N1c2VkRWxlbS5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbWFrZVNjcm9sbGFibGU6IGZ1bmN0aW9uIG1ha2VTY3JvbGxhYmxlKCkge1xuICAgICAgICBpZiAoZ2V0T3B0aW9ucygpLnNjcm9sbE92ZXJmbG93TWFjU3R5bGUgJiYgIWlzTWFjRGV2aWNlKSB7XG4gICAgICAgICAgYWRkQ2xhc3MoJGJvZHksICdmcC1zY3JvbGwtbWFjJyk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRTdGF0ZSgpLnBhbmVscy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgICAgICAgIGlmIChlbC5zbGlkZXMgJiYgZWwuc2xpZGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChoYXNDbGFzcyhlbC5pdGVtLCBBVVRPX0hFSUdIVF9SRVNQT05TSVZFKSAmJiBpc1Jlc3BvbnNpdmVNb2RlKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGl0ZW0gPSBnZXRTbGlkZU9yU2VjdGlvbihlbC5pdGVtKTtcbiAgICAgICAgICAgIHZhciBzaG91bGRCZVNjcm9sbGFibGUgPSBzY3JvbGxPdmVyZmxvd0hhbmRsZXIuc2hvdWxkQmVTY3JvbGxhYmxlKGVsLml0ZW0pO1xuICAgICAgICAgICAgdmFyIHNlY3Rpb24gPSBnZXRTZWN0aW9uRnJvbVBhbmVsKGVsKTtcblxuICAgICAgICAgICAgaWYgKGlzSUUxMSkge1xuICAgICAgICAgICAgICB2YXIgdG9nZ2xlQWN0aW9uID0gc2hvdWxkQmVTY3JvbGxhYmxlID8gJ2FkZENsYXNzJyA6ICdyZW1vdmVDbGFzcyc7XG4gICAgICAgICAgICAgIHV0aWxzW3RvZ2dsZUFjdGlvbl0oc2VjdGlvbi5pdGVtLCBJU19PVkVSRkxPVyk7XG4gICAgICAgICAgICAgIHV0aWxzW3RvZ2dsZUFjdGlvbl0oZWwuaXRlbSwgSVNfT1ZFUkZMT1cpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgYWRkQ2xhc3Moc2VjdGlvbi5pdGVtLCBJU19PVkVSRkxPVyk7XG4gICAgICAgICAgICAgIGFkZENsYXNzKGVsLml0ZW0sIElTX09WRVJGTE9XKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFlbC5oYXNTY3JvbGwpIHtcbiAgICAgICAgICAgICAgc2Nyb2xsT3ZlcmZsb3dIYW5kbGVyLmNyZWF0ZVdyYXBwZXIoaXRlbSk7XG4gICAgICAgICAgICAgIHNjcm9sbE92ZXJmbG93SGFuZGxlci5iaW5kRXZlbnRzKGl0ZW0pO1xuICAgICAgICAgICAgfSAvLyB1cGRhdGluZyB0aGUgc3RhdGUgbm93IGluIGNhc2UgXG4gICAgICAgICAgICAvLyB0aGlzIGlzIGV4ZWN1dGVkIG9uIHBhZ2UgbG9hZCAoYWZ0ZXIgaW1hZ2VzIGxvYWQpXG5cblxuICAgICAgICAgICAgZWwuaGFzU2Nyb2xsID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGJpbmRFdmVudHM6IGZ1bmN0aW9uIGJpbmRFdmVudHMoaXRlbSkge1xuICAgICAgICBzY3JvbGxPdmVyZmxvd0hhbmRsZXIuZ2V0U2Nyb2xsYWJsZUl0ZW0oaXRlbSkuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgc2Nyb2xsT3ZlcmZsb3dIYW5kbGVyLm9uUGFuZWxTY3JvbGwpO1xuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgc2Nyb2xsT3ZlcmZsb3dIYW5kbGVyLnByZXZlbnRTY3JvbGxXaGlsZU1vdmluZywge1xuICAgICAgICAgIHBhc3NpdmU6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBzY3JvbGxPdmVyZmxvd0hhbmRsZXIucHJldmVudFNjcm9sbFdoaWxlTW92aW5nLCB7XG4gICAgICAgICAgcGFzc2l2ZTogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgY3JlYXRlV3JhcHBlcjogZnVuY3Rpb24gY3JlYXRlV3JhcHBlcihpdGVtKSB7XG4gICAgICAgIHZhciBvdmVyZmxvd1dyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgb3ZlcmZsb3dXcmFwcGVyLmNsYXNzTmFtZSA9IE9WRVJGTE9XO1xuICAgICAgICB3cmFwSW5uZXIoaXRlbSwgb3ZlcmZsb3dXcmFwcGVyKTtcbiAgICAgICAgb3ZlcmZsb3dXcmFwcGVyLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnLTEnKTtcbiAgICAgIH0sXG4gICAgICBkZXN0cm95V3JhcHBlcjogZnVuY3Rpb24gZGVzdHJveVdyYXBwZXIoaXRlbSkge1xuICAgICAgICB2YXIgb3ZlcmZsb3dXcmFwcGVyID0gJChPVkVSRkxPV19TRUwsIGl0ZW0pWzBdO1xuXG4gICAgICAgIGlmIChvdmVyZmxvd1dyYXBwZXIpIHtcbiAgICAgICAgICB1bndyYXAob3ZlcmZsb3dXcmFwcGVyKTtcbiAgICAgICAgICBpdGVtLnJlbW92ZUF0dHJpYnV0ZSgndGFiaW5kZXgnKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdldFNjcm9sbGFibGVJdGVtOiBmdW5jdGlvbiBnZXRTY3JvbGxhYmxlSXRlbShzZWN0aW9uSXRlbSkge1xuICAgICAgICB2YXIgcGFuZWwgPSBnZXRTbGlkZU9yU2VjdGlvbihzZWN0aW9uSXRlbSk7XG4gICAgICAgIHJldHVybiAkKE9WRVJGTE9XX1NFTCwgcGFuZWwpWzBdIHx8IHBhbmVsO1xuICAgICAgfSxcbiAgICAgIGhhc1Njcm9sbDogZnVuY3Rpb24gaGFzU2Nyb2xsKHBhbmVsSXRlbSkge1xuICAgICAgICByZXR1cm4gaGFzQ2xhc3MocGFuZWxJdGVtLCBPVkVSRkxPVykgfHwgJChPVkVSRkxPV19TRUwsIHBhbmVsSXRlbSlbMF0gIT0gbnVsbDtcbiAgICAgIH0sXG4gICAgICBpc1Njcm9sbGFibGU6IGZ1bmN0aW9uIGlzU2Nyb2xsYWJsZShwYW5lbCkge1xuICAgICAgICByZXR1cm4gcGFuZWwuaXNTZWN0aW9uICYmIHBhbmVsLmFjdGl2ZVNsaWRlID8gcGFuZWwuYWN0aXZlU2xpZGUuaGFzU2Nyb2xsIDogcGFuZWwuaGFzU2Nyb2xsO1xuICAgICAgfSxcbiAgICAgIHNob3VsZEJlU2Nyb2xsYWJsZTogZnVuY3Rpb24gc2hvdWxkQmVTY3JvbGxhYmxlKGl0ZW0pIHtcbiAgICAgICAgdmFyIHNjcm9sbGFibGUgPSBzY3JvbGxPdmVyZmxvd0hhbmRsZXIuZ2V0U2Nyb2xsYWJsZUl0ZW0oaXRlbSk7XG4gICAgICAgIHJldHVybiBzY3JvbGxhYmxlLnNjcm9sbEhlaWdodCA+IHdpbi5pbm5lckhlaWdodDtcbiAgICAgIH0sXG4gICAgICBpc1Njcm9sbGVkOiBmdW5jdGlvbiBpc1Njcm9sbGVkKGRpcmVjdGlvbiwgZWwpIHtcbiAgICAgICAgaWYgKCFzdGF0ZS5jYW5TY3JvbGwpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc2Nyb2xsYWJsZUl0ZW0gPSBzY3JvbGxPdmVyZmxvd0hhbmRsZXIuZ2V0U2Nyb2xsYWJsZUl0ZW0oZWwpO1xuXG4gICAgICAgIGlmICghZ2V0T3B0aW9ucygpLnNjcm9sbE92ZXJmbG93IHx8ICFoYXNDbGFzcyhzY3JvbGxhYmxlSXRlbSwgT1ZFUkZMT1cpIHx8IGhhc0NsYXNzKGdldFNsaWRlT3JTZWN0aW9uKGVsKSwgJ2ZwLW5vc2Nyb2xsJykpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSAvLyBpZTExIHdyb25nbHkgY2FsY3VsYXRlcyBzY3JvbGxIZWlnaHQgd2hlbiB1c2luZyB0aGUgQ1NTIHN0eWxlXG4gICAgICAgIC8vIG92ZXJmbG93OiBhdXRvICAgSXQgYWRkcyAxIG1vcmUgcGl4ZWwgY29tcGFyZWQgdG8gb2Zmc2V0SGVpZ2h0XG5cblxuICAgICAgICB2YXIgaWUxMW9mZnNldCA9IGlzSUUxMSA/IDEgOiAwO1xuICAgICAgICB2YXIgcG9zaXRpb25ZID0gc2Nyb2xsYWJsZUl0ZW0uc2Nyb2xsVG9wO1xuICAgICAgICB2YXIgaXNUb3BSZWFjaGVkID0gZGlyZWN0aW9uID09PSAndXAnICYmIHBvc2l0aW9uWSA8PSAwO1xuICAgICAgICB2YXIgaXNCb3R0b21SZWFjaGVkID0gZGlyZWN0aW9uID09PSAnZG93bicgJiYgc2Nyb2xsYWJsZUl0ZW0uc2Nyb2xsSGVpZ2h0IDw9IE1hdGguY2VpbChzY3JvbGxhYmxlSXRlbS5vZmZzZXRIZWlnaHQgKyBwb3NpdGlvblkpICsgaWUxMW9mZnNldDtcbiAgICAgICAgdmFyIGlzU2Nyb2xsZWQgPSBpc1RvcFJlYWNoZWQgfHwgaXNCb3R0b21SZWFjaGVkO1xuXG4gICAgICAgIGlmICghaXNTY3JvbGxlZCkge1xuICAgICAgICAgIHRoaXMudGltZUJlZm9yZVJlYWNoaW5nTGltaXQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpc1Njcm9sbGVkO1xuICAgICAgfSxcbiAgICAgIHNob3VsZE1vdmVQYWdlOiBmdW5jdGlvbiBzaG91bGRNb3ZlUGFnZSgpIHtcbiAgICAgICAgdGhpcy50aW1lTGFzdFNjcm9sbCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICB2YXIgdGltZURpZmYgPSB0aGlzLnRpbWVMYXN0U2Nyb2xsIC0gc2Nyb2xsT3ZlcmZsb3dIYW5kbGVyLnRpbWVCZWZvcmVSZWFjaGluZ0xpbWl0O1xuICAgICAgICB2YXIgaXNVc2luZ1RvdWNoID0gaXNUb3VjaERldmljZSB8fCBpc1RvdWNoO1xuICAgICAgICB2YXIgaXNHcmFiYmluZyA9IGlzVXNpbmdUb3VjaCAmJiBzdGF0ZS5pc0dyYWJiaW5nO1xuICAgICAgICB2YXIgaXNOb3RGaXJzdFRpbWVSZWFjaGluZ0xpbWl0ID0gc3RhdGUuaXNVc2luZ1doZWVsICYmIHRpbWVEaWZmID4gNjAwO1xuICAgICAgICByZXR1cm4gaXNHcmFiYmluZyAmJiB0aW1lRGlmZiA+IDQwMCB8fCBpc05vdEZpcnN0VGltZVJlYWNoaW5nTGltaXQ7XG4gICAgICB9LFxuICAgICAgb25QYW5lbFNjcm9sbDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcHJldlBvc2l0aW9uID0gMDtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgdmFyIGN1cnJlbnRQb3NpdGlvbiA9IGUudGFyZ2V0LnNjcm9sbFRvcDtcbiAgICAgICAgICB2YXIgZGlyZWN0aW9uID0gc3RhdGUudG91Y2hEaXJlY3Rpb24gIT09ICdub25lJyA/IHN0YXRlLnRvdWNoRGlyZWN0aW9uIDogcHJldlBvc2l0aW9uIDwgY3VycmVudFBvc2l0aW9uID8gJ2Rvd24nIDogJ3VwJztcbiAgICAgICAgICBwcmV2UG9zaXRpb24gPSBjdXJyZW50UG9zaXRpb247XG5cbiAgICAgICAgICBpZiAoaXNGdW5jdGlvbihnZXRPcHRpb25zKCkub25TY3JvbGxPdmVyZmxvdykpIHtcbiAgICAgICAgICAgIGZpcmVDYWxsYmFjaygnb25TY3JvbGxPdmVyZmxvdycsIHtcbiAgICAgICAgICAgICAgcG9zaXRpb246IGN1cnJlbnRQb3NpdGlvbixcbiAgICAgICAgICAgICAgZGlyZWN0aW9uOiBkaXJlY3Rpb25cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChoYXNDbGFzcyhlLnRhcmdldCwgT1ZFUkZMT1cpICYmIHN0YXRlLmNhblNjcm9sbCkge1xuICAgICAgICAgICAgaWYgKHNjcm9sbE92ZXJmbG93SGFuZGxlci5pc1Njcm9sbGVkKGRpcmVjdGlvbiwgZS50YXJnZXQpICYmIHNjcm9sbE92ZXJmbG93SGFuZGxlci5zaG91bGRNb3ZlUGFnZSgpKSB7XG4gICAgICAgICAgICAgIEV2ZW50RW1pdHRlci5lbWl0KGV2ZW50cy5vblNjcm9sbE92ZXJmbG93U2Nyb2xsZWQsIHtcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb246IGRpcmVjdGlvblxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9KClcbiAgICB9O1xuXG4gICAgdmFyIGdfcHJldkFjdGl2ZVNlY3Rpb25JbmRleCA9IG51bGw7XG4gICAgdmFyIGdfcHJldkFjdGl2ZVNsaWRlSW5kZXggPSBudWxsO1xuICAgIC8qKiBcbiAgICAgKiBVcGRhdGVzIHRoZSBzdGF0ZSBvZiB0aGUgYXBwLlxuICAgICAqL1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlU3RhdGUoKSB7XG4gICAgICBzdGF0ZS5hY3RpdmVTZWN0aW9uID0gbnVsbDtcbiAgICAgIHN0YXRlLnNlY3Rpb25zLm1hcChmdW5jdGlvbiAoc2VjdGlvbikge1xuICAgICAgICB2YXIgaXNBY3RpdmUgPSBoYXNDbGFzcyhzZWN0aW9uLml0ZW0sIEFDVElWRSk7XG4gICAgICAgIHNlY3Rpb24uaXNBY3RpdmUgPSBpc0FjdGl2ZTtcbiAgICAgICAgc2VjdGlvbi5oYXNTY3JvbGwgPSBzY3JvbGxPdmVyZmxvd0hhbmRsZXIuaGFzU2Nyb2xsKHNlY3Rpb24uaXRlbSk7XG5cbiAgICAgICAgaWYgKGlzQWN0aXZlKSB7XG4gICAgICAgICAgc3RhdGUuYWN0aXZlU2VjdGlvbiA9IHNlY3Rpb247XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VjdGlvbi5zbGlkZXMubGVuZ3RoKSB7XG4gICAgICAgICAgc2VjdGlvbi5hY3RpdmVTbGlkZSA9IG51bGw7XG4gICAgICAgICAgc2VjdGlvbi5zbGlkZXMubWFwKGZ1bmN0aW9uIChzbGlkZSkge1xuICAgICAgICAgICAgdmFyIGlzQWN0aXZlU2xpZGUgPSBoYXNDbGFzcyhzbGlkZS5pdGVtLCBBQ1RJVkUpO1xuICAgICAgICAgICAgc2xpZGUuaGFzU2Nyb2xsID0gc2Nyb2xsT3ZlcmZsb3dIYW5kbGVyLmhhc1Njcm9sbChzZWN0aW9uLml0ZW0pO1xuICAgICAgICAgICAgc2xpZGUuaXNBY3RpdmUgPSBpc0FjdGl2ZVNsaWRlO1xuXG4gICAgICAgICAgICBpZiAoaXNBY3RpdmVTbGlkZSkge1xuICAgICAgICAgICAgICBzZWN0aW9uLmFjdGl2ZVNsaWRlID0gc2xpZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgc2Nyb2xsVG9OZXdBY3RpdmVQYW5lbCgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiB1cGRhdGVTdHJ1Y3R1cmFsU3RhdGUoKSB7XG4gICAgICB2YXIgYWxsU2VjdGlvbkl0ZW1zID0gJChnZXRPcHRpb25zKCkuc2VjdGlvblNlbGVjdG9yLCBnZXRDb250YWluZXIoKSk7XG4gICAgICB2YXIgc2VjdGlvbnNJdGVtcyA9IGdldFZpc2libGUoYWxsU2VjdGlvbkl0ZW1zKTtcbiAgICAgIHZhciBhbGxTZWN0aW9ucyA9IEFycmF5LmZyb20oYWxsU2VjdGlvbkl0ZW1zKS5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZWN0aW9uUGFuZWwoaXRlbSk7XG4gICAgICB9KTtcbiAgICAgIHZhciBzZWN0aW9ucyA9IGFsbFNlY3Rpb25zLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICByZXR1cm4gaXRlbS5pc1Zpc2libGU7XG4gICAgICB9KTtcbiAgICAgIHZhciBzbGlkZXMgPSBzZWN0aW9ucy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgc2VjdGlvbikge1xuICAgICAgICByZXR1cm4gYWNjLmNvbmNhdChzZWN0aW9uLnNsaWRlcyk7XG4gICAgICB9LCBbXSk7IC8vIGtlZXBpbmcgdHJhY2sgb2YgdGhlIHByZXZpb3VzbHkgYWN0aXZlIHNlY3Rpb25cblxuICAgICAgZ19wcmV2QWN0aXZlU2VjdGlvbkluZGV4ID0gZ2V0UHJldkFjdGl2ZVBhbmVsSW5kZXgoc3RhdGUuYWN0aXZlU2VjdGlvbik7XG4gICAgICBnX3ByZXZBY3RpdmVTbGlkZUluZGV4ID0gZ2V0UHJldkFjdGl2ZVBhbmVsSW5kZXgoc3RhdGUuYWN0aXZlU2VjdGlvbiA/IHN0YXRlLmFjdGl2ZVNlY3Rpb24uYWN0aXZlU2xpZGUgOiBudWxsKTtcbiAgICAgIHN0YXRlLm51bVNlY3Rpb25zID0gc2VjdGlvbnNJdGVtcy5sZW5ndGg7XG4gICAgICBzdGF0ZS5udW1TbGlkZXMgPSBzZWN0aW9ucy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgc2VjdGlvbikge1xuICAgICAgICByZXR1cm4gYWNjICsgc2VjdGlvbi5zbGlkZXMubGVuZ3RoO1xuICAgICAgfSwgMCk7XG4gICAgICBzdGF0ZS5zZWN0aW9ucyA9IHNlY3Rpb25zO1xuICAgICAgc3RhdGUuc2VjdGlvbnNJbmNsdWRpbmdIaWRkZW4gPSBhbGxTZWN0aW9ucztcbiAgICAgIHN0YXRlLnNsaWRlcyA9IHNsaWRlcztcbiAgICAgIHN0YXRlLnBhbmVscyA9IHN0YXRlLnNlY3Rpb25zLmNvbmNhdChzdGF0ZS5zbGlkZXMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFByZXZBY3RpdmVQYW5lbEluZGV4KGFjdGl2ZVBhbmVsKSB7XG4gICAgICBpZiAoIWFjdGl2ZVBhbmVsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcHJldkFjdGl2ZVBhbmVsSXRlbSA9IGFjdGl2ZVBhbmVsID8gYWN0aXZlUGFuZWwuaXRlbSA6IG51bGw7XG4gICAgICB2YXIgaGlkZGVuUGFuZWxzID0gYWN0aXZlUGFuZWwuaXNTZWN0aW9uID8gc3RhdGUuc2VjdGlvbnNJbmNsdWRpbmdIaWRkZW4gOiBzdGF0ZS5hY3RpdmVTZWN0aW9uLnNsaWRlc0luY2x1ZGluZ0hpZGRlbjtcblxuICAgICAgaWYgKHByZXZBY3RpdmVQYW5lbEl0ZW0pIHtcbiAgICAgICAgdmFyIHBhbmVsID0gZ2V0UGFuZWxCeUVsZW1lbnQoaGlkZGVuUGFuZWxzLCBwcmV2QWN0aXZlUGFuZWxJdGVtKTtcbiAgICAgICAgcmV0dXJuIHBhbmVsID8gcGFuZWwuaW5kZXgoKSA6IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBXaGVuIGNoYW5nZXMgaW4gdGhlIERPTSB0YWtlIHBsYWNlIHRoZXJlJ3MgYSBjaGFuZ2UgXG4gICAgICogdGhlIGFjdGl2ZSBzZWN0aW9uIGlzIG5vdyBoaWRkZW4gb3IgcmVtb3ZlZC4gXG4gICAgICogZnVsbFBhZ2UuanMgd2lsbCBzY3JvbGwgdG8gdGhlIGNsb3Nlc3Qgc2VjdGlvbiBuZWFyYnkuXG4gICAgICovXG5cblxuICAgIGZ1bmN0aW9uIHNjcm9sbFRvTmV3QWN0aXZlUGFuZWwoKSB7XG4gICAgICB2YXIgYWN0aXZlU2VjdGlvbiA9IHN0YXRlLmFjdGl2ZVNlY3Rpb247XG4gICAgICB2YXIgYWN0aXZlU2VjdGlvbkhhc1NsaWRlcyA9IHN0YXRlLmFjdGl2ZVNlY3Rpb24gPyBzdGF0ZS5hY3RpdmVTZWN0aW9uLnNsaWRlcy5sZW5ndGggOiBmYWxzZTtcbiAgICAgIHZhciBhY3RpdmVTbGlkZSA9IHN0YXRlLmFjdGl2ZVNlY3Rpb24gPyBzdGF0ZS5hY3RpdmVTZWN0aW9uLmFjdGl2ZVNsaWRlIDogbnVsbDsgLy8gSGlkZGluZyAvIHJlbW92aW5nIHRoZSBhY3RpdmUgc2VjdGlvbiA/XG5cbiAgICAgIGlmICghYWN0aXZlU2VjdGlvbiAmJiBzdGF0ZS5zZWN0aW9ucy5sZW5ndGggJiYgIWdldFN0YXRlKCkuaXNCZXlvbmRGdWxscGFnZSAmJiBnX3ByZXZBY3RpdmVTZWN0aW9uSW5kZXgpIHtcbiAgICAgICAgdmFyIG5ld0FjdGl2ZVNlY3Rpb24gPSBnZXROZXdBY3RpdmVQYW5lbChnX3ByZXZBY3RpdmVTZWN0aW9uSW5kZXgsIHN0YXRlLnNlY3Rpb25zKTtcblxuICAgICAgICBpZiAobmV3QWN0aXZlU2VjdGlvbikge1xuICAgICAgICAgIHN0YXRlLmFjdGl2ZVNlY3Rpb24gPSBuZXdBY3RpdmVTZWN0aW9uO1xuICAgICAgICAgIHN0YXRlLmFjdGl2ZVNlY3Rpb24uaXNBY3RpdmUgPSB0cnVlO1xuICAgICAgICAgIGFkZENsYXNzKHN0YXRlLmFjdGl2ZVNlY3Rpb24uaXRlbSwgQUNUSVZFKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGF0ZS5hY3RpdmVTZWN0aW9uKSB7XG4gICAgICAgICAgc2lsZW50U2Nyb2xsKHN0YXRlLmFjdGl2ZVNlY3Rpb24uaXRlbS5vZmZzZXRUb3ApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChhY3RpdmVTZWN0aW9uSGFzU2xpZGVzICYmICFhY3RpdmVTbGlkZSAmJiBnX3ByZXZBY3RpdmVTbGlkZUluZGV4KSB7XG4gICAgICAgIHZhciBuZXdBY3RpdmVTbGlkZSA9IGdldE5ld0FjdGl2ZVBhbmVsKGdfcHJldkFjdGl2ZVNsaWRlSW5kZXgsIHN0YXRlLmFjdGl2ZVNlY3Rpb24uc2xpZGVzKTtcblxuICAgICAgICBpZiAobmV3QWN0aXZlU2xpZGUpIHtcbiAgICAgICAgICBzdGF0ZS5hY3RpdmVTZWN0aW9uLmFjdGl2ZVNsaWRlID0gbmV3QWN0aXZlU2xpZGU7XG4gICAgICAgICAgc3RhdGUuYWN0aXZlU2VjdGlvbi5hY3RpdmVTbGlkZS5pc0FjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgYWRkQ2xhc3Moc3RhdGUuYWN0aXZlU2VjdGlvbi5hY3RpdmVTbGlkZS5pdGVtLCBBQ1RJVkUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0YXRlLmFjdGl2ZVNlY3Rpb24uYWN0aXZlU2xpZGUpIHtcbiAgICAgICAgICBzaWxlbnRMYW5kc2NhcGVTY3JvbGwoc3RhdGUuYWN0aXZlU2VjdGlvbi5hY3RpdmVTbGlkZS5pdGVtLCAnaW50ZXJuYWwnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldE5ld0FjdGl2ZVBhbmVsKHByZXZBY3RpdmVQYW5lbEluZGV4LCBzaWJsaW5ncykge1xuICAgICAgdmFyIG5ld0FjdGl2ZVNlY3Rpb247XG4gICAgICB2YXIgcHJldkluZGV4ID0gcHJldkFjdGl2ZVBhbmVsSW5kZXggLSAxO1xuICAgICAgdmFyIG5leHRJbmRleCA9IHByZXZBY3RpdmVQYW5lbEluZGV4O1xuXG4gICAgICBkbyB7XG4gICAgICAgIG5ld0FjdGl2ZVNlY3Rpb24gPSBzaWJsaW5nc1twcmV2SW5kZXhdIHx8IHNpYmxpbmdzW25leHRJbmRleF07XG5cbiAgICAgICAgaWYgKG5ld0FjdGl2ZVNlY3Rpb24pIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHByZXZJbmRleCA9IHByZXZJbmRleCAtIDE7XG4gICAgICAgIG5leHRJbmRleCA9IG5leHRJbmRleCArIDE7XG4gICAgICB9IHdoaWxlIChwcmV2SW5kZXggPj0gMCB8fCBuZXh0SW5kZXggPCBzaWJsaW5ncy5sZW5ndGgpO1xuXG4gICAgICByZXR1cm4gbmV3QWN0aXZlU2VjdGlvbjtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBTZWN0aW9uIG9iamVjdFxuICAgICovXG5cblxuICAgIHZhciBTZWN0aW9uUGFuZWwgPSBmdW5jdGlvbiBTZWN0aW9uUGFuZWwoZWwpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIFtdLnB1c2guY2FsbChhcmd1bWVudHMsIGdldE9wdGlvbnMoKS5zZWN0aW9uU2VsZWN0b3IpO1xuICAgICAgSXRlbS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgdGhpcy5hbGxTbGlkZXNJdGVtcyA9ICQoZ2V0T3B0aW9ucygpLnNsaWRlU2VsZWN0b3IsIGVsKTtcbiAgICAgIHRoaXMuc2xpZGVzSW5jbHVkaW5nSGlkZGVuID0gQXJyYXkuZnJvbSh0aGlzLmFsbFNsaWRlc0l0ZW1zKS5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTbGlkZVBhbmVsKGl0ZW0sIF90aGlzKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5zbGlkZXMgPSB0aGlzLnNsaWRlc0luY2x1ZGluZ0hpZGRlbi5maWx0ZXIoZnVuY3Rpb24gKHNsaWRlUGFuZWwpIHtcbiAgICAgICAgcmV0dXJuIHNsaWRlUGFuZWwuaXNWaXNpYmxlO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmFjdGl2ZVNsaWRlID0gdGhpcy5zbGlkZXMubGVuZ3RoID8gdGhpcy5zbGlkZXMuZmlsdGVyKGZ1bmN0aW9uIChzbGlkZSkge1xuICAgICAgICByZXR1cm4gc2xpZGUuaXNBY3RpdmU7XG4gICAgICB9KVswXSB8fCB0aGlzLnNsaWRlc1swXSA6IG51bGw7XG4gICAgfTtcbiAgICBTZWN0aW9uUGFuZWwucHJvdG90eXBlID0gSXRlbS5wcm90b3R5cGU7XG4gICAgU2VjdGlvblBhbmVsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFNlY3Rpb25QYW5lbDtcbiAgICAvKipcbiAgICAqIFNsaWRlIG9iamVjdFxuICAgICovXG5cbiAgICB2YXIgU2xpZGVQYW5lbCA9IGZ1bmN0aW9uIFNsaWRlUGFuZWwoZWwsIHNlY3Rpb24pIHtcbiAgICAgIHRoaXMucGFyZW50ID0gc2VjdGlvbjtcbiAgICAgIEl0ZW0uY2FsbCh0aGlzLCBlbCwgZ2V0T3B0aW9ucygpLnNsaWRlU2VsZWN0b3IpO1xuICAgIH07XG5cbiAgICBTbGlkZVBhbmVsLnByb3RvdHlwZSA9IEl0ZW0ucHJvdG90eXBlO1xuICAgIFNsaWRlUGFuZWwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU2VjdGlvblBhbmVsO1xuXG4gICAgLyoqXG4gICAgKiBBZGRzIGludGVybmFsIGNsYXNzZXMgdG8gYmUgYWJsZSB0byBwcm92aWRlIGN1c3RvbWl6YWJsZSBzZWxlY3RvcnNcbiAgICAqIGtlZXBpbmcgdGhlIGxpbmsgd2l0aCB0aGUgc3R5bGUgc2hlZXQuXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIGFkZEludGVybmFsU2VsZWN0b3JzKCkge1xuICAgICAgYWRkQ2xhc3MoJChnZXRPcHRpb25zKCkuc2VjdGlvblNlbGVjdG9yLCBnZXRDb250YWluZXIoKSksIFNFQ1RJT04pO1xuICAgICAgYWRkQ2xhc3MoJChnZXRPcHRpb25zKCkuc2xpZGVTZWxlY3RvciwgZ2V0Q29udGFpbmVyKCkpLCBTTElERSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBTdHlsZXMgdGhlIGhvcml6b250YWwgc2xpZGVzIGZvciBhIHNlY3Rpb24uXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIHN0eWxlU2xpZGVzKHNlY3Rpb24pIHtcbiAgICAgIHZhciBudW1TbGlkZXMgPSBzZWN0aW9uLnNsaWRlcy5sZW5ndGg7XG4gICAgICB2YXIgc2xpZGVzRWxlbXMgPSBzZWN0aW9uLmFsbFNsaWRlc0l0ZW1zO1xuICAgICAgdmFyIHNsaWRlcyA9IHNlY3Rpb24uc2xpZGVzO1xuICAgICAgdmFyIHNsaWRlcldpZHRoID0gbnVtU2xpZGVzICogMTAwO1xuICAgICAgdmFyIHNsaWRlV2lkdGggPSAxMDAgLyBudW1TbGlkZXM7XG5cbiAgICAgIGlmICghJChTTElERVNfV1JBUFBFUl9TRUwsIHNlY3Rpb24uaXRlbSlbMF0pIHtcbiAgICAgICAgdmFyIHNsaWRlc1dyYXBwZXIgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHNsaWRlc1dyYXBwZXIuY2xhc3NOYW1lID0gU0xJREVTX1dSQVBQRVI7IC8vZnAtc2xpZGVzXG5cbiAgICAgICAgd3JhcEFsbChzbGlkZXNFbGVtcywgc2xpZGVzV3JhcHBlcik7XG4gICAgICAgIHZhciBzbGlkZXNDb250YWluZXIgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHNsaWRlc0NvbnRhaW5lci5jbGFzc05hbWUgPSBTTElERVNfQ09OVEFJTkVSOyAvL2ZwLXNsaWRlc0NvbnRhaW5lclxuXG4gICAgICAgIHdyYXBBbGwoc2xpZGVzRWxlbXMsIHNsaWRlc0NvbnRhaW5lcik7XG4gICAgICB9XG5cbiAgICAgIGNzcygkKFNMSURFU19DT05UQUlORVJfU0VMLCBzZWN0aW9uLml0ZW0pLCB7XG4gICAgICAgICd3aWR0aCc6IHNsaWRlcldpZHRoICsgJyUnXG4gICAgICB9KTtcblxuICAgICAgaWYgKG51bVNsaWRlcyA+IDEpIHtcbiAgICAgICAgaWYgKGdldE9wdGlvbnMoKS5jb250cm9sQXJyb3dzKSB7XG4gICAgICAgICAgY3JlYXRlU2xpZGVBcnJvd3Moc2VjdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZ2V0T3B0aW9ucygpLnNsaWRlc05hdmlnYXRpb24pIHtcbiAgICAgICAgICBhZGRTbGlkZXNOYXZpZ2F0aW9uKHNlY3Rpb24pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHNsaWRlcy5mb3JFYWNoKGZ1bmN0aW9uIChzbGlkZSkge1xuICAgICAgICBjc3Moc2xpZGUuaXRlbSwge1xuICAgICAgICAgICd3aWR0aCc6IHNsaWRlV2lkdGggKyAnJSdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGdldE9wdGlvbnMoKS52ZXJ0aWNhbENlbnRlcmVkKSB7XG4gICAgICAgICAgYWRkVGFibGVDbGFzcyhzbGlkZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdmFyIHN0YXJ0aW5nU2xpZGUgPSBzZWN0aW9uLmFjdGl2ZVNsaWRlIHx8IG51bGw7IC8vaWYgdGhlIHNsaWRlIHdvbid0IGJlIGFuIHN0YXJ0aW5nIHBvaW50LCB0aGUgZGVmYXVsdCB3aWxsIGJlIHRoZSBmaXJzdCBvbmVcbiAgICAgIC8vdGhlIGFjdGl2ZSBzZWN0aW9uIGlzbid0IHRoZSBmaXJzdCBvbmU/IElzIG5vdCB0aGUgZmlyc3Qgc2xpZGUgb2YgdGhlIGZpcnN0IHNlY3Rpb24/IFRoZW4gd2UgbG9hZCB0aGF0IHNlY3Rpb24vc2xpZGUgYnkgZGVmYXVsdC5cblxuICAgICAgaWYgKHN0YXJ0aW5nU2xpZGUgIT0gbnVsbCAmJiBzdGF0ZS5hY3RpdmVTZWN0aW9uICYmIChzdGF0ZS5hY3RpdmVTZWN0aW9uLmluZGV4KCkgIT09IDAgfHwgc3RhdGUuYWN0aXZlU2VjdGlvbi5pbmRleCgpID09PSAwICYmIHN0YXJ0aW5nU2xpZGUuaW5kZXgoKSAhPT0gMCkpIHtcbiAgICAgICAgc2lsZW50TGFuZHNjYXBlU2Nyb2xsKHN0YXJ0aW5nU2xpZGUuaXRlbSwgJ2ludGVybmFsJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhZGRDbGFzcyhzbGlkZXNFbGVtc1swXSwgQUNUSVZFKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgZ193cmFwcGVyT2JzZXJ2ZXI7XG4gICAgdmFyIGdfd3JhcHBlck9ic2VydmVDb25maWcgPSB7XG4gICAgICBhdHRyaWJ1dGVzOiBmYWxzZSxcbiAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICBjaGFyYWN0ZXJEYXRhOiB0cnVlXG4gICAgfTtcbiAgICBFdmVudEVtaXR0ZXIub24oZXZlbnRzLmJpbmRFdmVudHMsIGJpbmRFdmVudHMkOSk7XG4gICAgRlAucmVuZGVyID0gb25Db250ZW50Q2hhbmdlO1xuXG4gICAgZnVuY3Rpb24gYmluZEV2ZW50cyQ5KCkge1xuICAgICAgaWYgKGdldE9wdGlvbnMoKS5vYnNlcnZlciAmJiBcIk11dGF0aW9uT2JzZXJ2ZXJcIiBpbiB3aW5kb3cgJiYgJChXUkFQUEVSX1NFTClbMF0pIHtcbiAgICAgICAgZ193cmFwcGVyT2JzZXJ2ZXIgPSBjcmVhdGVPYnNlcnZlcigkKFdSQVBQRVJfU0VMKVswXSwgb25Db250ZW50Q2hhbmdlLCBnX3dyYXBwZXJPYnNlcnZlQ29uZmlnKTtcbiAgICAgIH1cblxuICAgICAgRXZlbnRFbWl0dGVyLm9uKGV2ZW50cy5jb250ZW50Q2hhbmdlZCwgb25Db250ZW50Q2hhbmdlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIE11dGF0aW9uIG9ic2VydmVyLlxuICAgICAqL1xuXG5cbiAgICBmdW5jdGlvbiBjcmVhdGVPYnNlcnZlcih0YXJnZXQsIGNhbGxiYWNrLCBjb25maWcpIHtcbiAgICAgIHZhciBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGNhbGxiYWNrKTtcbiAgICAgIG9ic2VydmVyLm9ic2VydmUodGFyZ2V0LCBjb25maWcpO1xuICAgICAgcmV0dXJuIG9ic2VydmVyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRpZFNsaWRlc0NoYW5nZSgpIHtcbiAgICAgIHJldHVybiBnZXRWaXNpYmxlKCQoZ2V0T3B0aW9ucygpLnNsaWRlU2VsZWN0b3IsIGdldENvbnRhaW5lcigpKSkubGVuZ3RoICE9PSBnZXRTdGF0ZSgpLm51bVNsaWRlcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkaWRTZWN0aW9uc0NoYW5nZSgpIHtcbiAgICAgIHJldHVybiBnZXRWaXNpYmxlKCQoZ2V0T3B0aW9ucygpLnNlY3Rpb25TZWxlY3RvciwgZ2V0Q29udGFpbmVyKCkpKS5sZW5ndGggIT09IGdldFN0YXRlKCkubnVtU2VjdGlvbnM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGlkU2VjdGlvbnNPclNsaWRlc0NoYW5nZSgpIHtcbiAgICAgIHJldHVybiBkaWRTbGlkZXNDaGFuZ2UoKSB8fCBkaWRTZWN0aW9uc0NoYW5nZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBMaXN0ZW4gdG8gY2hhbmdlcyBvbiBzZWN0aW9ucyBhbmQgZmlyZXMgcmVCdWlsZFxuICAgICAqIHdoZW4gdGhvc2UgY2hhbmdlcyBhZmZlY3QgdGhlIHNlY3Rpb24gaGVpZ2h0LlxuICAgICAqL1xuXG5cbiAgICBmdW5jdGlvbiBvbkNvbnRlbnRDaGFuZ2UobXV0YXRpb25zKSB7XG4gICAgICB2YXIgX2RpZFNsaWRlc0NoYW5nZSA9IGRpZFNsaWRlc0NoYW5nZSgpO1xuXG4gICAgICBpZiAoZGlkU2VjdGlvbnNPclNsaWRlc0NoYW5nZSgpICYmICFzdGF0ZS5pc0RvaW5nQ29udGlub3VzVmVydGljYWwpIHtcbiAgICAgICAgaWYgKGdldE9wdGlvbnMoKS5vYnNlcnZlciAmJiBnX3dyYXBwZXJPYnNlcnZlcikge1xuICAgICAgICAgIC8vIFRlbXBvcmFsbHkgZGlzYWJsaW5nIHRoZSBvYnNlcnZlciB3aGlsZSBcbiAgICAgICAgICAvLyB3ZSBtb2RpZHkgdGhlIERPTSBhZ2FpblxuICAgICAgICAgIGdfd3JhcHBlck9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZVN0cnVjdHVyYWxTdGF0ZSgpO1xuICAgICAgICB1cGRhdGVTdGF0ZSgpOyAvLyBSZW1vdmluZyBuYXZzIGFuZCBhbmNob3JzIG9wdGlvbnNcblxuICAgICAgICBnZXRPcHRpb25zKCkuYW5jaG9ycyA9IFtdO1xuICAgICAgICByZW1vdmUoJChTRUNUSU9OX05BVl9TRUwpKTtcbiAgICAgICAgYWRkSW50ZXJuYWxTZWxlY3RvcnMoKTtcbiAgICAgICAgc2V0T3B0aW9uc0Zyb21ET00oKTtcblxuICAgICAgICBpZiAoZ2V0T3B0aW9ucygpLm5hdmlnYXRpb24pIHtcbiAgICAgICAgICBhZGRWZXJ0aWNhbE5hdmlnYXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfZGlkU2xpZGVzQ2hhbmdlKSB7XG4gICAgICAgICAgcmVtb3ZlKCQoU0xJREVTX05BVl9TRUwpKTtcbiAgICAgICAgICByZW1vdmUoJChTTElERVNfQVJST1dfU0VMKSk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRTdGF0ZSgpLnNlY3Rpb25zLmZvckVhY2goZnVuY3Rpb24gKHNlY3Rpb24pIHtcbiAgICAgICAgICBpZiAoc2VjdGlvbi5zbGlkZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoX2RpZFNsaWRlc0NoYW5nZSkge1xuICAgICAgICAgICAgICBzdHlsZVNsaWRlcyhzZWN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3R5bGVTZWN0aW9uKHNlY3Rpb24pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChnZXRPcHRpb25zKCkub2JzZXJ2ZXIgJiYgZ193cmFwcGVyT2JzZXJ2ZXIgJiYgJChXUkFQUEVSX1NFTClbMF0pIHtcbiAgICAgICAgZ193cmFwcGVyT2JzZXJ2ZXIub2JzZXJ2ZSgkKFdSQVBQRVJfU0VMKVswXSwgZ193cmFwcGVyT2JzZXJ2ZUNvbmZpZyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHN1cHBvcnRzUGFzc2l2ZUV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vY2hla3MgZm9yIHBhc3NpdmUgZXZlbnQgc3VwcG9ydFxuICAgICAgdmFyIGdfc3VwcG9ydHNQYXNzaXZlID0gZmFsc2U7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciBvcHRzID0gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAncGFzc2l2ZScsIHtcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICAgIGdfc3VwcG9ydHNQYXNzaXZlID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB3aW5kb3dBZGRFdmVudChcInRlc3RQYXNzaXZlXCIsIG51bGwsIG9wdHMpO1xuICAgICAgICB3aW5kb3dSZW1vdmVFdmVudChcInRlc3RQYXNzaXZlXCIsIG51bGwsIG9wdHMpO1xuICAgICAgfSBjYXRjaCAoZSkge31cblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGdfc3VwcG9ydHNQYXNzaXZlO1xuICAgICAgfTtcbiAgICB9KCk7XG5cbiAgICBmdW5jdGlvbiBnZXRQYXNzaXZlT3B0aW9uc0lmUG9zc2libGUoKSB7XG4gICAgICByZXR1cm4gc3VwcG9ydHNQYXNzaXZlRXZlbnRzKCkgPyB7XG4gICAgICAgIHBhc3NpdmU6IGZhbHNlXG4gICAgICB9IDogZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIHdoZWVsRGF0YUhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX3ByZXZUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgICAgIHZhciBfc2Nyb2xsaW5ncyA9IFtdO1xuICAgICAgdmFyIGlzU2Nyb2xsaW5nVmVydGljYWxseTtcbiAgICAgIHZhciBkaXJlY3Rpb247XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZWdpc3RlckV2ZW50OiBmdW5jdGlvbiByZWdpc3RlckV2ZW50KGUpIHtcbiAgICAgICAgICBlID0gZSB8fCB3aW4uZXZlbnQ7XG4gICAgICAgICAgdmFyIHZhbHVlID0gZS53aGVlbERlbHRhIHx8IC1lLmRlbHRhWSB8fCAtZS5kZXRhaWw7XG4gICAgICAgICAgdmFyIGRlbHRhID0gTWF0aC5tYXgoLTEsIE1hdGgubWluKDEsIHZhbHVlKSk7XG4gICAgICAgICAgdmFyIGhvcml6b250YWxEZXRlY3Rpb24gPSB0eXBlb2YgZS53aGVlbERlbHRhWCAhPT0gJ3VuZGVmaW5lZCcgfHwgdHlwZW9mIGUuZGVsdGFYICE9PSAndW5kZWZpbmVkJztcbiAgICAgICAgICBpc1Njcm9sbGluZ1ZlcnRpY2FsbHkgPSBNYXRoLmFicyhlLndoZWVsRGVsdGFYKSA8IE1hdGguYWJzKGUud2hlZWxEZWx0YSkgfHwgTWF0aC5hYnMoZS5kZWx0YVgpIDwgTWF0aC5hYnMoZS5kZWx0YVkpIHx8ICFob3Jpem9udGFsRGV0ZWN0aW9uO1xuICAgICAgICAgIHZhciBjdXJUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgZGlyZWN0aW9uID0gZGVsdGEgPCAwID8gJ2Rvd24nIDogJ3VwJzsgLy9MaW1pdGluZyB0aGUgYXJyYXkgdG8gMTUwIChsZXRzIG5vdCB3YXN0ZSBtZW1vcnkhKVxuXG4gICAgICAgICAgaWYgKF9zY3JvbGxpbmdzLmxlbmd0aCA+IDE0OSkge1xuICAgICAgICAgICAgX3Njcm9sbGluZ3Muc2hpZnQoKTtcbiAgICAgICAgICB9IC8va2VlcGluZyByZWNvcmQgb2YgdGhlIHByZXZpb3VzIHNjcm9sbGluZ3NcblxuXG4gICAgICAgICAgX3Njcm9sbGluZ3MucHVzaChNYXRoLmFicyh2YWx1ZSkpOyAvL3RpbWUgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZSBsYXN0IHNjcm9sbCBhbmQgdGhlIGN1cnJlbnQgb25lXG5cblxuICAgICAgICAgIHZhciB0aW1lRGlmZiA9IGN1clRpbWUgLSBfcHJldlRpbWU7XG4gICAgICAgICAgX3ByZXZUaW1lID0gY3VyVGltZTsgLy9oYXZlbid0IHRoZXkgc2Nyb2xsZWQgaW4gYSB3aGlsZT9cbiAgICAgICAgICAvLyhlbm91Z2ggdG8gYmUgY29uc2lkZXIgYSBkaWZmZXJlbnQgc2Nyb2xsaW5nIGFjdGlvbiB0byBzY3JvbGwgYW5vdGhlciBzZWN0aW9uKVxuXG4gICAgICAgICAgaWYgKHRpbWVEaWZmID4gMjAwKSB7XG4gICAgICAgICAgICAvL2VtcHR5aW5nIHRoZSBhcnJheSwgd2UgZG9udCBjYXJlIGFib3V0IG9sZCBzY3JvbGxpbmdzIGZvciBvdXIgYXZlcmFnZXNcbiAgICAgICAgICAgIF9zY3JvbGxpbmdzID0gW107XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpc0FjY2VsZXJhdGluZzogZnVuY3Rpb24gaXNBY2NlbGVyYXRpbmcoKSB7XG4gICAgICAgICAgdmFyIGF2ZXJhZ2VFbmQgPSBnZXRBdmVyYWdlKF9zY3JvbGxpbmdzLCAxMCk7XG4gICAgICAgICAgdmFyIGF2ZXJhZ2VNaWRkbGUgPSBnZXRBdmVyYWdlKF9zY3JvbGxpbmdzLCA3MCk7XG4gICAgICAgICAgdmFyIGlzQWNjZWxlcmF0aW5nID0gYXZlcmFnZUVuZCA+PSBhdmVyYWdlTWlkZGxlO1xuICAgICAgICAgIHJldHVybiBfc2Nyb2xsaW5ncy5sZW5ndGggPyBpc0FjY2VsZXJhdGluZyAmJiBpc1Njcm9sbGluZ1ZlcnRpY2FsbHkgOiBmYWxzZTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0RGlyZWN0aW9uOiBmdW5jdGlvbiBnZXREaXJlY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGRpcmVjdGlvbjtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KCk7XG5cbiAgICBmdW5jdGlvbiBzY3JvbGxCZXlvbmRGdWxsUGFnZSgpIHtcbiAgICAgIHZhciBkdG9wID0gZ2V0RGVzdGluYXRpb25PZmZzZXQoKTtcbiAgICAgIHZhciBzY3JvbGxTZXR0aW5ncyA9IGdldFNjcm9sbFNldHRpbmdzKGR0b3ApO1xuICAgICAgRlAudGVzdC50b3AgPSAtZHRvcCArICdweCc7XG4gICAgICBzZXRTdGF0ZSh7XG4gICAgICAgIGNhblNjcm9sbDogZmFsc2VcbiAgICAgIH0pO1xuICAgICAgc2Nyb2xsVG8oc2Nyb2xsU2V0dGluZ3MuZWxlbWVudCwgc2Nyb2xsU2V0dGluZ3Mub3B0aW9ucywgZ2V0T3B0aW9ucygpLnNjcm9sbGluZ1NwZWVkLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICAgIGlzQmV5b25kRnVsbHBhZ2U6IHRydWVcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgICBjYW5TY3JvbGw6IHRydWVcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSwgMzApO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9uS2V5RG93bigpIHtcbiAgICAgIGlmICghaXNGdWxsUGFnZUFib3ZlKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2Nyb2xsVXBUb0Z1bGxwYWdlKCk7XG4gICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNjcm9sbFVwVG9GdWxscGFnZSgpIHtcbiAgICAgIHZhciBzY3JvbGxTZXR0aW5ncyA9IGdldFNjcm9sbFNldHRpbmdzKGdldExhc3QoZ2V0U3RhdGUoKS5zZWN0aW9ucykuaXRlbS5vZmZzZXRUb3ApO1xuICAgICAgc2V0U3RhdGUoe1xuICAgICAgICBjYW5TY3JvbGw6IGZhbHNlXG4gICAgICB9KTtcbiAgICAgIHNjcm9sbFRvKHNjcm9sbFNldHRpbmdzLmVsZW1lbnQsIHNjcm9sbFNldHRpbmdzLm9wdGlvbnMsIGdldE9wdGlvbnMoKS5zY3JvbGxpbmdTcGVlZCwgZnVuY3Rpb24gKCkge1xuICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgY2FuU2Nyb2xsOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgaXNCZXlvbmRGdWxscGFnZTogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICBpc0Fib3V0VG9TY3JvbGxUb0Z1bGxQYWdlOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldERlc3RpbmF0aW9uT2Zmc2V0KCkge1xuICAgICAgaWYgKCFnZXRPcHRpb25zKCkuY3NzMykge1xuICAgICAgICByZXR1cm4gZ2V0TGFzdChnZXRTdGF0ZSgpLnNlY3Rpb25zKS5pdGVtLm9mZnNldFRvcCArIGdldExhc3QoZ2V0U3RhdGUoKS5zZWN0aW9ucykuaXRlbS5vZmZzZXRIZWlnaHQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBnZXRTY3JvbGxUb3AoKSArIGdldFdpbmRvd0hlaWdodCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJleW9uZEZ1bGxQYWdlSGFuZGxlcihjb250YWluZXIsIGUpIHtcbiAgICAgIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgdmFyIHBhdXNlU2Nyb2xsID0gZ2V0U3RhdGUoKS5pc0JleW9uZEZ1bGxwYWdlICYmIGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5ib3R0b20gPj0gMCAmJiB3aGVlbERhdGFIYW5kbGVyLmdldERpcmVjdGlvbigpID09PSAndXAnO1xuICAgICAgdmFyIGdfaXNBYm91dFRvU2Nyb2xsVG9GdWxsUGFnZSA9IGdldFN0YXRlKCkuaXNBYm91dFRvU2Nyb2xsVG9GdWxsUGFnZTtcblxuICAgICAgaWYgKGdfaXNBYm91dFRvU2Nyb2xsVG9GdWxsUGFnZSkge1xuICAgICAgICBwcmV2ZW50RGVmYXVsdChlKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoZ2V0U3RhdGUoKS5pc0JleW9uZEZ1bGxwYWdlKSB7XG4gICAgICAgIGlmICghcGF1c2VTY3JvbGwpIHtcbiAgICAgICAgICBrZXlmcmFtZVRpbWUoJ3NldCcsICdiZXlvbmRGdWxscGFnZScsIDEwMDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBzaG91bGRTZXRGaXhlZFBvc2l0aW9uID0gIWdfaXNBYm91dFRvU2Nyb2xsVG9GdWxsUGFnZSAmJiAoIWtleWZyYW1lVGltZSgnaXNOZXdLZXlmcmFtZScsICdiZXlvbmRGdWxscGFnZScpIHx8ICF3aGVlbERhdGFIYW5kbGVyLmlzQWNjZWxlcmF0aW5nKCkpO1xuICAgICAgICAgIHZhciBzY3JvbGxTZXR0aW5ncztcblxuICAgICAgICAgIGlmIChzaG91bGRTZXRGaXhlZFBvc2l0aW9uKSB7XG4gICAgICAgICAgICBzY3JvbGxTZXR0aW5ncyA9IGdldFNjcm9sbFNldHRpbmdzKGdldExhc3QoZ2V0U3RhdGUoKS5zZWN0aW9ucykuaXRlbS5vZmZzZXRUb3AgKyBnZXRMYXN0KGdldFN0YXRlKCkuc2VjdGlvbnMpLml0ZW0ub2Zmc2V0SGVpZ2h0KTtcbiAgICAgICAgICAgIHNjcm9sbFNldHRpbmdzLmVsZW1lbnQuc2Nyb2xsVG8oMCwgc2Nyb2xsU2V0dGluZ3Mub3B0aW9ucyk7XG4gICAgICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgICAgIGlzQWJvdXRUb1Njcm9sbFRvRnVsbFBhZ2U6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHByZXZlbnREZWZhdWx0KGUpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0gZWxzZSBpZiAod2hlZWxEYXRhSGFuZGxlci5pc0FjY2VsZXJhdGluZygpKSB7XG4gICAgICAgICAgICBwYXVzZVNjcm9sbCA9IGZhbHNlO1xuICAgICAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgICAgICBpc0Fib3V0VG9TY3JvbGxUb0Z1bGxQYWdlOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICAgICAgc2Nyb2xsVHJpZ2dlcjogJ3doZWVsJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzY3JvbGxVcFRvRnVsbHBhZ2UoKTtcbiAgICAgICAgICAgIHByZXZlbnREZWZhdWx0KGUpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZ19pc0Fib3V0VG9TY3JvbGxUb0Z1bGxQYWdlKSB7XG4gICAgICAgICAgLy8gYWxsb3cgbm9ybWFsIHNjcm9sbGluZywgYnV0IHF1aXR0aW5nXG4gICAgICAgICAgaWYgKCFwYXVzZVNjcm9sbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGtleWZyYW1lVGltZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBpc05ldyA9IGZhbHNlO1xuICAgICAgdmFyIGZyYW1lcyA9IHt9O1xuICAgICAgdmFyIHRpbWVmcmFtZXMgPSB7fTtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYWN0aW9uLCBuYW1lLCB0aW1lZnJhbWUpIHtcbiAgICAgICAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICAgICAgICBjYXNlICdzZXQnOlxuICAgICAgICAgICAgZnJhbWVzW25hbWVdID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICB0aW1lZnJhbWVzW25hbWVdID0gdGltZWZyYW1lO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICdpc05ld0tleWZyYW1lJzpcbiAgICAgICAgICAgIHZhciBjdXJyZW50ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICBpc05ldyA9IGN1cnJlbnQgLSBmcmFtZXNbbmFtZV0gPiB0aW1lZnJhbWVzW25hbWVdO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaXNOZXc7XG4gICAgICB9O1xuICAgIH0oKTtcblxuICAgIEZQLm1vdmVTZWN0aW9uRG93biA9IG1vdmVTZWN0aW9uRG93bjtcbiAgICAvKipcbiAgICAqIE1vdmVzIHRoZSBwYWdlIGRvd24gb25lIHNlY3Rpb24uXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIG1vdmVTZWN0aW9uRG93bigpIHtcbiAgICAgIHZhciBuZXh0ID0gZ2V0U3RhdGUoKS5hY3RpdmVTZWN0aW9uLm5leHQoKTsgLy9sb29waW5nIHRvIHRoZSB0b3AgaWYgdGhlcmUncyBubyBtb3JlIHNlY3Rpb25zIGJlbG93XG5cbiAgICAgIGlmICghbmV4dCAmJiAoZ2V0T3B0aW9ucygpLmxvb3BCb3R0b20gfHwgZ2V0T3B0aW9ucygpLmNvbnRpbnVvdXNWZXJ0aWNhbCkpIHtcbiAgICAgICAgbmV4dCA9IGdldFN0YXRlKCkuc2VjdGlvbnNbMF07XG4gICAgICB9XG5cbiAgICAgIGlmIChuZXh0ICE9IG51bGwpIHtcbiAgICAgICAgc2Nyb2xsUGFnZShuZXh0LCBudWxsLCBmYWxzZSk7XG4gICAgICB9IGVsc2UgaWYgKGhhc0NvbnRlbnRCZXlvbmRGdWxsUGFnZSgpKSB7XG4gICAgICAgIEV2ZW50RW1pdHRlci5lbWl0KGV2ZW50cy5zY3JvbGxCZXlvbmRGdWxscGFnZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFzQ29udGVudEJleW9uZEZ1bGxQYWdlKCkge1xuICAgICAgcmV0dXJuIGdldENvbnRhaW5lcigpLnNjcm9sbEhlaWdodCA8ICRib2R5LnNjcm9sbEhlaWdodDtcbiAgICB9XG5cbiAgICBGUC5tb3ZlU2VjdGlvblVwID0gbW92ZVNlY3Rpb25VcDtcbiAgICAvKipcbiAgICAqIE1vdmVzIHRoZSBwYWdlIHVwIG9uZSBzZWN0aW9uLlxuICAgICovXG5cbiAgICBmdW5jdGlvbiBtb3ZlU2VjdGlvblVwKCkge1xuICAgICAgdmFyIHByZXYgPSBnZXRTdGF0ZSgpLmFjdGl2ZVNlY3Rpb24ucHJldigpOyAvL2xvb3BpbmcgdG8gdGhlIGJvdHRvbSBpZiB0aGVyZSdzIG5vIG1vcmUgc2VjdGlvbnMgYWJvdmVcblxuICAgICAgaWYgKCFwcmV2ICYmIChnZXRPcHRpb25zKCkubG9vcFRvcCB8fCBnZXRPcHRpb25zKCkuY29udGludW91c1ZlcnRpY2FsKSkge1xuICAgICAgICBwcmV2ID0gZ2V0TGFzdChnZXRTdGF0ZSgpLnNlY3Rpb25zKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHByZXYgIT0gbnVsbCkge1xuICAgICAgICBzY3JvbGxQYWdlKHByZXYsIG51bGwsIHRydWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBvbGRQYWdlWSA9IDA7XG4gICAgLyoqXG4gICAgKiBEZXRlY3RpbmcgdGhlIGRpcmVjdGlvbiBvZiB0aGUgbW91c2UgbW92ZW1lbnQuXG4gICAgKiBVc2VkIG9ubHkgZm9yIHRoZSBtaWRkbGUgYnV0dG9uIG9mIHRoZSBtb3VzZS5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gbW91c2VNb3ZlSGFuZGxlcihlKSB7XG4gICAgICBpZiAoIWdldE9wdGlvbnMoKS5hdXRvU2Nyb2xsaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlLmNhblNjcm9sbCkge1xuICAgICAgICAvLyBtb3ZpbmcgdXBcbiAgICAgICAgaWYgKGUucGFnZVkgPCBvbGRQYWdlWSAmJiBnZXRJc1Njcm9sbEFsbG93ZWQoKS5tLnVwKSB7XG4gICAgICAgICAgbW92ZVNlY3Rpb25VcCgpO1xuICAgICAgICB9IC8vIG1vdmluZyBkb3duXG4gICAgICAgIGVsc2UgaWYgKGUucGFnZVkgPiBvbGRQYWdlWSAmJiBnZXRJc1Njcm9sbEFsbG93ZWQoKS5tLmRvd24pIHtcbiAgICAgICAgICBtb3ZlU2VjdGlvbkRvd24oKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBvbGRQYWdlWSA9IGUucGFnZVk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNldE9sZFBhZ2VZKHZhbHVlKSB7XG4gICAgICBvbGRQYWdlWSA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICogRGV0ZXJtaW5lcyB0aGUgd2F5IG9mIHNjcm9sbGluZyB1cCBvciBkb3duOlxuICAgICogYnkgJ2F1dG9tYXRpY2FsbHknIHNjcm9sbGluZyBhIHNlY3Rpb24gb3IgYnkgdXNpbmcgdGhlIGRlZmF1bHQgYW5kIG5vcm1hbCBzY3JvbGxpbmcuXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIHNjcm9sbGluZyh0eXBlKSB7XG4gICAgICBpZiAoIWdldElzU2Nyb2xsQWxsb3dlZCgpLm1bdHlwZV0pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgc2Nyb2xsU2VjdGlvbiA9IHR5cGUgPT09ICdkb3duJyA/IG1vdmVTZWN0aW9uRG93biA6IG1vdmVTZWN0aW9uVXA7XG5cbiAgICAgIGlmIChnZXRPcHRpb25zKCkuc2Nyb2xsT3ZlcmZsb3cgJiYgc2Nyb2xsT3ZlcmZsb3dIYW5kbGVyLmlzU2Nyb2xsYWJsZShnZXRTdGF0ZSgpLmFjdGl2ZVNlY3Rpb24pKSB7XG4gICAgICAgIC8vaXMgdGhlIHNjcm9sbGJhciBhdCB0aGUgc3RhcnQvZW5kIG9mIHRoZSBzY3JvbGw/XG4gICAgICAgIGlmIChzY3JvbGxPdmVyZmxvd0hhbmRsZXIuaXNTY3JvbGxlZCh0eXBlLCBnZXRTdGF0ZSgpLmFjdGl2ZVNlY3Rpb24uaXRlbSkgJiYgc2Nyb2xsT3ZlcmZsb3dIYW5kbGVyLnNob3VsZE1vdmVQYWdlKCkpIHtcbiAgICAgICAgICBzY3JvbGxTZWN0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNjcm9sbFNlY3Rpb24oKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgdG91Y2hTdGFydFkgPSAwO1xuICAgIHZhciB0b3VjaFN0YXJ0WCA9IDA7XG4gICAgdmFyIHRvdWNoRW5kWSA9IDA7XG4gICAgdmFyIHRvdWNoRW5kWCA9IDA7XG4gICAgdmFyIE1TUG9pbnRlciA9IGdldE1TUG9pbnRlcigpO1xuICAgIHZhciBwb2ludGVycyA9IHtcbiAgICAgIHRvdWNobW92ZTogJ29udG91Y2htb3ZlJyBpbiB3aW5kb3cgPyAndG91Y2htb3ZlJyA6IE1TUG9pbnRlciA/IE1TUG9pbnRlci5tb3ZlIDogbnVsbCxcbiAgICAgIHRvdWNoc3RhcnQ6ICdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyA/ICd0b3VjaHN0YXJ0JyA6IE1TUG9pbnRlciA/IE1TUG9pbnRlci5kb3duIDogbnVsbFxuICAgIH07XG4gICAgLyoqXG4gICAgKiBBZGRzIHRoZSBwb3NzaWJpbGl0eSB0byBhdXRvIHNjcm9sbCB0aHJvdWdoIHNlY3Rpb25zIG9uIHRvdWNoIGRldmljZXMuXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIGFkZFRvdWNoSGFuZGxlcigpIHtcbiAgICAgIGlmICghcG9pbnRlcnMudG91Y2htb3ZlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzVG91Y2hEZXZpY2UgfHwgaXNUb3VjaCkge1xuICAgICAgICBpZiAoZ2V0T3B0aW9ucygpLmF1dG9TY3JvbGxpbmcpIHtcbiAgICAgICAgICAkYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKHBvaW50ZXJzLnRvdWNobW92ZSwgcHJldmVudEJvdW5jaW5nLCB7XG4gICAgICAgICAgICBwYXNzaXZlOiBmYWxzZVxuICAgICAgICAgIH0pO1xuICAgICAgICAgICRib2R5LmFkZEV2ZW50TGlzdGVuZXIocG9pbnRlcnMudG91Y2htb3ZlLCBwcmV2ZW50Qm91bmNpbmcsIHtcbiAgICAgICAgICAgIHBhc3NpdmU6IGZhbHNlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdG91Y2hXcmFwcGVyID0gZ2V0T3B0aW9ucygpLnRvdWNoV3JhcHBlcjtcbiAgICAgICAgdG91Y2hXcmFwcGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIocG9pbnRlcnMudG91Y2hzdGFydCwgdG91Y2hTdGFydEhhbmRsZXIpO1xuICAgICAgICB0b3VjaFdyYXBwZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihwb2ludGVycy50b3VjaG1vdmUsIHRvdWNoTW92ZUhhbmRsZXIsIHtcbiAgICAgICAgICBwYXNzaXZlOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgICAgdG91Y2hXcmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIocG9pbnRlcnMudG91Y2hzdGFydCwgdG91Y2hTdGFydEhhbmRsZXIpO1xuICAgICAgICB0b3VjaFdyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcihwb2ludGVycy50b3VjaG1vdmUsIHRvdWNoTW92ZUhhbmRsZXIsIHtcbiAgICAgICAgICBwYXNzaXZlOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgKiBSZW1vdmVzIHRoZSBhdXRvIHNjcm9sbGluZyBmb3IgdG91Y2ggZGV2aWNlcy5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gcmVtb3ZlVG91Y2hIYW5kbGVyKCkge1xuICAgICAgaWYgKCFwb2ludGVycy50b3VjaG1vdmUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNUb3VjaERldmljZSB8fCBpc1RvdWNoKSB7XG4gICAgICAgIC8vIG5vcm1hbFNjcm9sbEVsZW1lbnRzIHJlcXVpcmVzIGl0IG9mZiAjMjY5MVxuICAgICAgICBpZiAoZ2V0T3B0aW9ucygpLmF1dG9TY3JvbGxpbmcpIHtcbiAgICAgICAgICAkYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKHBvaW50ZXJzLnRvdWNobW92ZSwgdG91Y2hNb3ZlSGFuZGxlciwge1xuICAgICAgICAgICAgcGFzc2l2ZTogZmFsc2VcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAkYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKHBvaW50ZXJzLnRvdWNobW92ZSwgcHJldmVudEJvdW5jaW5nLCB7XG4gICAgICAgICAgICBwYXNzaXZlOiBmYWxzZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRvdWNoV3JhcHBlciA9IGdldE9wdGlvbnMoKS50b3VjaFdyYXBwZXI7XG4gICAgICAgIHRvdWNoV3JhcHBlci5yZW1vdmVFdmVudExpc3RlbmVyKHBvaW50ZXJzLnRvdWNoc3RhcnQsIHRvdWNoU3RhcnRIYW5kbGVyKTtcbiAgICAgICAgdG91Y2hXcmFwcGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIocG9pbnRlcnMudG91Y2htb3ZlLCB0b3VjaE1vdmVIYW5kbGVyLCB7XG4gICAgICAgICAgcGFzc2l2ZTogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8qIERldGVjdGluZyB0b3VjaCBldmVudHNcblxuICAgICogQXMgd2UgYXJlIGNoYW5naW5nIHRoZSB0b3AgcHJvcGVydHkgb2YgdGhlIHBhZ2Ugb24gc2Nyb2xsaW5nLCB3ZSBjYW4gbm90IHVzZSB0aGUgdHJhZGl0aW9uYWwgd2F5IHRvIGRldGVjdCBpdC5cbiAgICAqIFRoaXMgd2F5LCB0aGUgdG91Y2hzdGFydCBhbmQgdGhlIHRvdWNoIG1vdmVzIHNob3dzIGFuIHNtYWxsIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGVtIHdoaWNoIGlzIHRoZVxuICAgICogdXNlZCBvbmUgdG8gZGV0ZXJtaW5lIHRoZSBkaXJlY3Rpb24uXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIHRvdWNoTW92ZUhhbmRsZXIoZSkge1xuICAgICAgdmFyIGFjdGl2ZVNlY3Rpb24gPSBjbG9zZXN0KGUudGFyZ2V0LCBTRUNUSU9OX1NFTCkgfHwgZ2V0U3RhdGUoKS5hY3RpdmVTZWN0aW9uLml0ZW07XG4gICAgICB2YXIgaGFzQWN0aXZlU2VjdGlvbk92ZXJmbG93ID0gc2Nyb2xsT3ZlcmZsb3dIYW5kbGVyLmlzU2Nyb2xsYWJsZShnZXRTdGF0ZSgpLmFjdGl2ZVNlY3Rpb24pO1xuXG4gICAgICBpZiAoaXNSZWFsbHlUb3VjaChlKSkge1xuICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgaXNHcmFiYmluZzogdHJ1ZSxcbiAgICAgICAgICBpc1VzaW5nV2hlZWw6IGZhbHNlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChnZXRPcHRpb25zKCkuYXV0b1Njcm9sbGluZykge1xuICAgICAgICAgIGlmIChoYXNBY3RpdmVTZWN0aW9uT3ZlcmZsb3cgJiYgIXN0YXRlLmNhblNjcm9sbCkge1xuICAgICAgICAgICAgLy9wcmV2ZW50aW5nIHRoZSBlYXNpbmcgb24gaU9TIGRldmljZXNcbiAgICAgICAgICAgIHByZXZlbnREZWZhdWx0KGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0b3VjaEV2ZW50cyA9IGdldEV2ZW50c1BhZ2UoZSk7XG4gICAgICAgIHRvdWNoRW5kWSA9IHRvdWNoRXZlbnRzLnk7XG4gICAgICAgIHRvdWNoRW5kWCA9IHRvdWNoRXZlbnRzLng7XG4gICAgICAgIHZhciBpc1ZlcnRpY2FsTW92ZW1lbnRFbm91Z2ggPSBNYXRoLmFicyh0b3VjaFN0YXJ0WSAtIHRvdWNoRW5kWSkgPiB3aW4uaW5uZXJIZWlnaHQgLyAxMDAgKiBnZXRPcHRpb25zKCkudG91Y2hTZW5zaXRpdml0eTtcbiAgICAgICAgdmFyIGlzSG9yaXpvbnRhbE1vdmVtZW50RW5vdWdoID0gTWF0aC5hYnModG91Y2hTdGFydFggLSB0b3VjaEVuZFgpID4gZ2V0V2luZG93V2lkdGgoKSAvIDEwMCAqIGdldE9wdGlvbnMoKS50b3VjaFNlbnNpdGl2aXR5O1xuICAgICAgICB2YXIgaXNIb3Jpem9udGFsUHJlZG9taW5hbnRNb3ZlID0gJChTTElERVNfV1JBUFBFUl9TRUwsIGFjdGl2ZVNlY3Rpb24pLmxlbmd0aCAmJiBNYXRoLmFicyh0b3VjaFN0YXJ0WCAtIHRvdWNoRW5kWCkgPiBNYXRoLmFicyh0b3VjaFN0YXJ0WSAtIHRvdWNoRW5kWSk7XG4gICAgICAgIHZhciBkaXJlY3Rpb25IID0gdG91Y2hTdGFydFggPiB0b3VjaEVuZFggPyAncmlnaHQnIDogJ2xlZnQnO1xuICAgICAgICB2YXIgZGlyZWN0aW9uViA9IHRvdWNoU3RhcnRZID4gdG91Y2hFbmRZID8gJ2Rvd24nIDogJ3VwJztcbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IGlzSG9yaXpvbnRhbFByZWRvbWluYW50TW92ZSA/IGRpcmVjdGlvbkggOiBkaXJlY3Rpb25WO1xuICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgdG91Y2hEaXJlY3Rpb246IGRpcmVjdGlvblxuICAgICAgICB9KTsgLy9pZiBtb3ZlbWVudCBpbiB0aGUgWCBheHlzIGlzIGdyZWF0ZXIgdGhhbiBpbiB0aGUgWSBhbmQgdGhlIGN1cnJlY3Qgc2VjdGlvbiBoYXMgc2xpZGVzLi4uXG5cbiAgICAgICAgaWYgKGlzSG9yaXpvbnRhbFByZWRvbWluYW50TW92ZSkge1xuICAgICAgICAgIC8vaXMgdGhlIG1vdmVtZW50IGdyZWF0ZXIgdGhhbiB0aGUgbWluaW11bSByZXNpc3RhbmNlIHRvIHNjcm9sbD9cbiAgICAgICAgICBpZiAoIXN0YXRlLnNsaWRlTW92aW5nICYmIGlzSG9yaXpvbnRhbE1vdmVtZW50RW5vdWdoKSB7XG4gICAgICAgICAgICBpZiAodG91Y2hTdGFydFggPiB0b3VjaEVuZFgpIHtcbiAgICAgICAgICAgICAgaWYgKGdldElzU2Nyb2xsQWxsb3dlZCgpLm0ucmlnaHQpIHtcbiAgICAgICAgICAgICAgICBFdmVudEVtaXR0ZXIuZW1pdChldmVudHMubW92ZVNsaWRlUmlnaHQsIHtcbiAgICAgICAgICAgICAgICAgIHNlY3Rpb246IGFjdGl2ZVNlY3Rpb25cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKGdldElzU2Nyb2xsQWxsb3dlZCgpLm0ubGVmdCkge1xuICAgICAgICAgICAgICAgIEV2ZW50RW1pdHRlci5lbWl0KGV2ZW50cy5tb3ZlU2xpZGVMZWZ0LCB7XG4gICAgICAgICAgICAgICAgICBzZWN0aW9uOiBhY3RpdmVTZWN0aW9uXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gLy92ZXJ0aWNhbCBzY3JvbGxpbmcgKG9ubHkgd2hlbiBhdXRvU2Nyb2xsaW5nIGlzIGVuYWJsZWQpXG4gICAgICAgIGVsc2UgaWYgKGdldE9wdGlvbnMoKS5hdXRvU2Nyb2xsaW5nICYmIHN0YXRlLmNhblNjcm9sbCkge1xuICAgICAgICAgIC8vaXMgdGhlIG1vdmVtZW50IGdyZWF0ZXIgdGhhbiB0aGUgbWluaW11bSByZXNpc3RhbmNlIHRvIHNjcm9sbD9cbiAgICAgICAgICBpZiAoaXNWZXJ0aWNhbE1vdmVtZW50RW5vdWdoKSB7XG4gICAgICAgICAgICBzY3JvbGxpbmcoZGlyZWN0aW9uVik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICogQXMgSUUgPj0gMTAgZmlyZXMgYm90aCB0b3VjaCBhbmQgbW91c2UgZXZlbnRzIHdoZW4gdXNpbmcgYSBtb3VzZSBpbiBhIHRvdWNoc2NyZWVuXG4gICAgKiB0aGlzIHdheSB3ZSBtYWtlIHN1cmUgdGhhdCBpcyByZWFsbHkgYSB0b3VjaCBldmVudCB3aGF0IElFIGlzIGRldGVjdGluZy5cbiAgICAqL1xuXG5cbiAgICBmdW5jdGlvbiBpc1JlYWxseVRvdWNoKGUpIHtcbiAgICAgIC8vaWYgaXMgbm90IElFICAgfHwgIElFIGlzIGRldGVjdGluZyBgdG91Y2hgIG9yIGBwZW5gXG4gICAgICByZXR1cm4gdHlwZW9mIGUucG9pbnRlclR5cGUgPT09ICd1bmRlZmluZWQnIHx8IGUucG9pbnRlclR5cGUgIT0gJ21vdXNlJztcbiAgICB9XG4gICAgLyoqXG4gICAgKiBIYW5kbGVyIGZvciB0aGUgdG91Y2ggc3RhcnQgZXZlbnQuXG4gICAgKi9cblxuXG4gICAgZnVuY3Rpb24gdG91Y2hTdGFydEhhbmRsZXIoZSkge1xuICAgICAgLy9zdG9wcGluZyB0aGUgYXV0byBzY3JvbGwgdG8gYWRqdXN0IHRvIGEgc2VjdGlvblxuICAgICAgaWYgKGdldE9wdGlvbnMoKS5maXRUb1NlY3Rpb24pIHtcbiAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgIGFjdGl2ZUFuaW1hdGlvbjogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc1JlYWxseVRvdWNoKGUpKSB7XG4gICAgICAgIHZhciB0b3VjaEV2ZW50cyA9IGdldEV2ZW50c1BhZ2UoZSk7XG4gICAgICAgIHRvdWNoU3RhcnRZID0gdG91Y2hFdmVudHMueTtcbiAgICAgICAgdG91Y2hTdGFydFggPSB0b3VjaEV2ZW50cy54O1xuICAgICAgfVxuXG4gICAgICB3aW5kb3dBZGRFdmVudCgndG91Y2hlbmQnLCB0b3VjaEVuZEhhbmRsZXIpO1xuICAgIH1cbiAgICAvKipcbiAgICAqIEhhbmRsZXIgZm9yIHRoZSB0b3VjaCBlbmQgZXZlbnQuXG4gICAgKi9cblxuXG4gICAgZnVuY3Rpb24gdG91Y2hFbmRIYW5kbGVyKCkge1xuICAgICAgd2luZG93UmVtb3ZlRXZlbnQoJ3RvdWNoZW5kJywgdG91Y2hFbmRIYW5kbGVyKTtcbiAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgaXNHcmFiYmluZzogZmFsc2VcbiAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAqIEdldHMgdGhlIHBhZ2VYIGFuZCBwYWdlWSBwcm9wZXJ0aWVzIGRlcGVuZGluZyBvbiB0aGUgYnJvd3Nlci5cbiAgICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hbHZhcm90cmlnby9mdWxsUGFnZS5qcy9pc3N1ZXMvMTk0I2lzc3VlY29tbWVudC0zNDA2OTg1NFxuICAgICovXG5cblxuICAgIGZ1bmN0aW9uIGdldEV2ZW50c1BhZ2UoZSkge1xuICAgICAgdmFyIGV2ZW50cyA9IHt9O1xuICAgICAgZXZlbnRzLnkgPSB0eXBlb2YgZS5wYWdlWSAhPT0gJ3VuZGVmaW5lZCcgJiYgKGUucGFnZVkgfHwgZS5wYWdlWCkgPyBlLnBhZ2VZIDogZS50b3VjaGVzWzBdLnBhZ2VZO1xuICAgICAgZXZlbnRzLnggPSB0eXBlb2YgZS5wYWdlWCAhPT0gJ3VuZGVmaW5lZCcgJiYgKGUucGFnZVkgfHwgZS5wYWdlWCkgPyBlLnBhZ2VYIDogZS50b3VjaGVzWzBdLnBhZ2VYOyAvL2luIHRvdWNoIGRldmljZXMgd2l0aCBzY3JvbGxCYXI6dHJ1ZSwgZS5wYWdlWSBpcyBkZXRlY3RlZCwgYnV0IHdlIGhhdmUgdG8gZGVhbCB3aXRoIHRvdWNoIGV2ZW50cy4gIzEwMDhcblxuICAgICAgaWYgKGlzVG91Y2ggJiYgaXNSZWFsbHlUb3VjaChlKSAmJiBnZXRPcHRpb25zKCkuc2Nyb2xsQmFyICYmIHR5cGVvZiBlLnRvdWNoZXMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGV2ZW50cy55ID0gZS50b3VjaGVzWzBdLnBhZ2VZO1xuICAgICAgICBldmVudHMueCA9IGUudG91Y2hlc1swXS5wYWdlWDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGV2ZW50cztcbiAgICB9XG4gICAgLypcbiAgICAqIFJldHVybnMgYW5kIG9iamVjdCB3aXRoIE1pY3Jvc29mdCBwb2ludGVycyAoZm9yIElFPDExIGFuZCBmb3IgSUUgPj0gMTEpXG4gICAgKiBodHRwOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvaWUvZG4zMDQ4ODYodj12cy44NSkuYXNweFxuICAgICovXG5cblxuICAgIGZ1bmN0aW9uIGdldE1TUG9pbnRlcigpIHtcbiAgICAgIHZhciBwb2ludGVyOyAvL0lFID49IDExICYgcmVzdCBvZiBicm93c2Vyc1xuXG4gICAgICBpZiAod2luLlBvaW50ZXJFdmVudCkge1xuICAgICAgICBwb2ludGVyID0ge1xuICAgICAgICAgIGRvd246ICdwb2ludGVyZG93bicsXG4gICAgICAgICAgbW92ZTogJ3BvaW50ZXJtb3ZlJ1xuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcG9pbnRlcjtcbiAgICB9XG4gICAgLypcbiAgICAqIFByZXZlbnRpbmcgYm91bmNpbmcgaW4gaU9TICMyMjg1XG4gICAgKi9cblxuXG4gICAgZnVuY3Rpb24gcHJldmVudEJvdW5jaW5nKGUpIHtcbiAgICAgIGlmIChnZXRPcHRpb25zKCkuYXV0b1Njcm9sbGluZyAmJiBpc1JlYWxseVRvdWNoKGUpICYmIGdldElzU2Nyb2xsQWxsb3dlZCgpLm0udXApIHtcbiAgICAgICAgLy9wcmV2ZW50aW5nIHRoZSBlYXNpbmcgb24gaU9TIGRldmljZXNcbiAgICAgICAgaWYgKCFzdGF0ZS5jYW5TY3JvbGwpIHtcbiAgICAgICAgICBwcmV2ZW50RGVmYXVsdChlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIEZQLm1vdmVTbGlkZUxlZnQgPSBtb3ZlU2xpZGVMZWZ0O1xuICAgIEZQLm1vdmVTbGlkZVJpZ2h0ID0gbW92ZVNsaWRlUmlnaHQ7XG4gICAgLyoqXG4gICAgKiBTbGlkZXMgYSBzbGlkZXIgdG8gdGhlIGdpdmVuIGRpcmVjdGlvbi5cbiAgICAqIE9wdGlvbmFsIGBzZWN0aW9uYCBwYXJhbS5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gbW92ZVNsaWRlKGRpcmVjdGlvbiwgc2VjdGlvbikge1xuICAgICAgdmFyIGFjdGl2ZVNlY3Rpb25JdGVtID0gc2VjdGlvbiA9PSBudWxsID8gZ2V0U3RhdGUoKS5hY3RpdmVTZWN0aW9uLml0ZW0gOiBzZWN0aW9uO1xuICAgICAgdmFyIGFjdGl2ZVNlY3Rpb24gPSBnZXRQYW5lbEJ5RWxlbWVudChzdGF0ZS5zZWN0aW9ucywgYWN0aXZlU2VjdGlvbkl0ZW0pO1xuICAgICAgdmFyIHNsaWRlcyA9ICQoU0xJREVTX1dSQVBQRVJfU0VMLCBhY3RpdmVTZWN0aW9uSXRlbSlbMF07IC8vIG1vcmUgdGhhbiBvbmUgc2xpZGUgbmVlZGVkIGFuZCBub3RoaW5nIHNob3VsZCBiZSBzbGlkaW5nXG5cbiAgICAgIGlmIChzbGlkZXMgPT0gbnVsbCB8fCBzdGF0ZS5zbGlkZU1vdmluZyB8fCBhY3RpdmVTZWN0aW9uLnNsaWRlcy5sZW5ndGggPCAyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIGN1cnJlbnRTbGlkZSA9IGFjdGl2ZVNlY3Rpb24uYWN0aXZlU2xpZGU7XG4gICAgICB2YXIgZGVzdGlueSA9IGRpcmVjdGlvbiA9PT0gJ2xlZnQnID8gY3VycmVudFNsaWRlLnByZXYoKSA6IGN1cnJlbnRTbGlkZS5uZXh0KCk7IC8vaXNuJ3QgdGhlcmUgYSBuZXh0IHNsaWRlIGluIHRoZSBzZWN1ZW5jZT9cblxuICAgICAgaWYgKCFkZXN0aW55KSB7XG4gICAgICAgIC8vcmVzcGVjdCBsb29wSG9yaXpvbnRhbCBzZXR0aW5nXG4gICAgICAgIGlmICghZ2V0T3B0aW9ucygpLmxvb3BIb3Jpem9udGFsKSByZXR1cm47XG4gICAgICAgIGRlc3RpbnkgPSBkaXJlY3Rpb24gPT09ICdsZWZ0JyA/IGdldExhc3QoYWN0aXZlU2VjdGlvbi5zbGlkZXMpIDogYWN0aXZlU2VjdGlvbi5zbGlkZXNbMF07XG4gICAgICB9XG5cbiAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgc2xpZGVNb3Zpbmc6ICFGUC50ZXN0LmlzVGVzdGluZ1xuICAgICAgfSk7XG4gICAgICBsYW5kc2NhcGVTY3JvbGwoc2xpZGVzLCBkZXN0aW55Lml0ZW0sIGRpcmVjdGlvbik7XG4gICAgfVxuICAgIC8qKlxuICAgICogU2xpZGVzIGxlZnQgdGhlIHNsaWRlciBvZiB0aGUgYWN0aXZlIHNlY3Rpb24uXG4gICAgKiBPcHRpb25hbCBgc2VjdGlvbmAgcGFyYW0uXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIG1vdmVTbGlkZUxlZnQoc2VjdGlvbikge1xuICAgICAgbW92ZVNsaWRlKCdsZWZ0Jywgc2VjdGlvbik7XG4gICAgfVxuICAgIC8qKlxuICAgICogU2xpZGVzIHJpZ2h0IHRoZSBzbGlkZXIgb2YgdGhlIGFjdGl2ZSBzZWN0aW9uLlxuICAgICogT3B0aW9uYWwgYHNlY3Rpb25gIHBhcmFtLlxuICAgICovXG5cbiAgICBmdW5jdGlvbiBtb3ZlU2xpZGVSaWdodChzZWN0aW9uKSB7XG4gICAgICBtb3ZlU2xpZGUoJ3JpZ2h0Jywgc2VjdGlvbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBHZXRzIGEgc2VjdGlvbiBieSBpdHMgYW5jaG9yIC8gaW5kZXhcbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gZ2V0U2VjdGlvbkJ5QW5jaG9yKHNlY3Rpb25BbmNob3IpIHtcbiAgICAgIHZhciBzZWN0aW9uID0gZ2V0U3RhdGUoKS5zZWN0aW9ucy5maWx0ZXIoZnVuY3Rpb24gKHNlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIHNlY3Rpb24uYW5jaG9yID09PSBzZWN0aW9uQW5jaG9yO1xuICAgICAgfSlbMF07XG5cbiAgICAgIGlmICghc2VjdGlvbikge1xuICAgICAgICB2YXIgc2VjdGlvbkluZGV4ID0gdHlwZW9mIHNlY3Rpb25BbmNob3IgIT09ICd1bmRlZmluZWQnID8gc2VjdGlvbkFuY2hvciAtIDEgOiAwO1xuICAgICAgICBzZWN0aW9uID0gZ2V0U3RhdGUoKS5zZWN0aW9uc1tzZWN0aW9uSW5kZXhdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2VjdGlvbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIFNjcm9sbHMgdGhlIHNsaWRlciB0byB0aGUgZ2l2ZW4gc2xpZGUgZGVzdGluYXRpb24gZm9yIHRoZSBnaXZlbiBzZWN0aW9uXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIHNjcm9sbFNsaWRlcihzbGlkZUVsZW0pIHtcbiAgICAgIGlmIChzbGlkZUVsZW0gIT0gbnVsbCkge1xuICAgICAgICBsYW5kc2NhcGVTY3JvbGwoY2xvc2VzdChzbGlkZUVsZW0sIFNMSURFU19XUkFQUEVSX1NFTCksIHNsaWRlRWxlbSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBTY3JvbGxzIHRvIHRoZSBnaXZlbiBzZWN0aW9uIGFuZCBzbGlkZSBhbmNob3JzXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIHNjcm9sbFBhZ2VBbmRTbGlkZShzZWN0aW9uQW5jaG9yLCBzbGlkZUFuY2hvcikge1xuICAgICAgdmFyIHNlY3Rpb24gPSBnZXRTZWN0aW9uQnlBbmNob3Ioc2VjdGlvbkFuY2hvcik7IC8vZG8gbm90aGluZyBpZiB0aGVyZSdzIG5vIHNlY3Rpb24gd2l0aCB0aGUgZ2l2ZW4gYW5jaG9yIG5hbWVcblxuICAgICAgaWYgKHNlY3Rpb24gPT0gbnVsbCkgcmV0dXJuO1xuICAgICAgdmFyIHNsaWRlRWxlbSA9IGdldFNsaWRlQnlBbmNob3Ioc2xpZGVBbmNob3IsIHNlY3Rpb24pOyAvL3dlIG5lZWQgdG8gc2Nyb2xsIHRvIHRoZSBzZWN0aW9uIGFuZCB0aGVuIHRvIHRoZSBzbGlkZVxuXG4gICAgICBpZiAoc2VjdGlvbi5hbmNob3IgIT09IHN0YXRlLmxhc3RTY3JvbGxlZERlc3RpbnkgJiYgIWhhc0NsYXNzKHNlY3Rpb24uaXRlbSwgQUNUSVZFKSkge1xuICAgICAgICBzY3JvbGxQYWdlKHNlY3Rpb24sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBzY3JvbGxTbGlkZXIoc2xpZGVFbGVtKTtcbiAgICAgICAgfSk7XG4gICAgICB9IC8vaWYgd2Ugd2VyZSBhbHJlYWR5IGluIHRoZSBzZWN0aW9uXG4gICAgICBlbHNlIHtcbiAgICAgICAgc2Nyb2xsU2xpZGVyKHNsaWRlRWxlbSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICogR2V0cyBhIHNsaWRlIGluc2lkZSBhIGdpdmVuIHNlY3Rpb24gYnkgaXRzIGFuY2hvciAvIGluZGV4XG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIGdldFNsaWRlQnlBbmNob3Ioc2xpZGVBbmNob3IsIHNlY3Rpb24pIHtcbiAgICAgIHZhciBzbGlkZSA9IHNlY3Rpb24uc2xpZGVzLmZpbHRlcihmdW5jdGlvbiAoc2xpZGUpIHtcbiAgICAgICAgcmV0dXJuIHNsaWRlLmFuY2hvciA9PT0gc2xpZGVBbmNob3I7XG4gICAgICB9KVswXTtcblxuICAgICAgaWYgKHNsaWRlID09IG51bGwpIHtcbiAgICAgICAgc2xpZGVBbmNob3IgPSB0eXBlb2Ygc2xpZGVBbmNob3IgIT09ICd1bmRlZmluZWQnID8gc2xpZGVBbmNob3IgOiAwO1xuICAgICAgICBzbGlkZSA9IHNlY3Rpb24uc2xpZGVzW3NsaWRlQW5jaG9yXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNsaWRlID8gc2xpZGUuaXRlbSA6IG51bGw7XG4gICAgfVxuXG4gICAgRlAubW92ZVRvID0gbW92ZVRvJDE7XG4gICAgLyoqXG4gICAgKiBNb3ZlcyB0aGUgcGFnZSB0byB0aGUgZ2l2ZW4gc2VjdGlvbiBhbmQgc2xpZGUuXG4gICAgKiBBbmNob3JzIG9yIGluZGV4IHBvc2l0aW9ucyBjYW4gYmUgdXNlZCBhcyBwYXJhbXMuXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIG1vdmVUbyQxKHNlY3Rpb25BbmNob3IsIHNsaWRlQW5jaG9yKSB7XG4gICAgICB2YXIgZGVzdGlueSA9IGdldFNlY3Rpb25CeUFuY2hvcihzZWN0aW9uQW5jaG9yKTtcblxuICAgICAgaWYgKHR5cGVvZiBzbGlkZUFuY2hvciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgc2Nyb2xsUGFnZUFuZFNsaWRlKHNlY3Rpb25BbmNob3IsIHNsaWRlQW5jaG9yKTtcbiAgICAgIH0gZWxzZSBpZiAoZGVzdGlueSAhPSBudWxsKSB7XG4gICAgICAgIHNjcm9sbFBhZ2UoZGVzdGlueSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy9AdHMtY2hlY2tcbiAgICB2YXIgZ19jb250cm9sUHJlc3NlZDtcbiAgICB2YXIgZ19rZXlkb3duSWQ7XG4gICAgdmFyIGdfZWxUb0ZvY3VzO1xuICAgIEV2ZW50RW1pdHRlci5vbihldmVudHMuYmluZEV2ZW50cywgYmluZEV2ZW50cyQ4KTtcblxuICAgIGZ1bmN0aW9uIGJpbmRFdmVudHMkOCgpIHtcbiAgICAgIC8vd2hlbiBvcGVuaW5nIGEgbmV3IHRhYiAoY3RybCArIHQpLCBgY29udHJvbGAgd29uJ3QgYmUgcHJlc3NlZCB3aGVuIGNvbWluZyBiYWNrLlxuICAgICAgd2luZG93QWRkRXZlbnQoJ2JsdXInLCBibHVySGFuZGxlcik7IC8vU2xpZGluZyB3aXRoIGFycm93IGtleXMsIGJvdGgsIHZlcnRpY2FsIGFuZCBob3Jpem9udGFsXG5cbiAgICAgIGRvY0FkZEV2ZW50KCdrZXlkb3duJywga2V5ZG93bkhhbmRsZXIpOyAvL3RvIHByZXZlbnQgc2Nyb2xsaW5nIHdoaWxlIHpvb21pbmdcblxuICAgICAgZG9jQWRkRXZlbnQoJ2tleXVwJywga2V5VXBIYW5kbGVyKTtcbiAgICAgIEV2ZW50RW1pdHRlci5vbihldmVudHMub25EZXN0cm95LCBvbkRlc3Ryb3kkNSk7XG4gICAgICBFdmVudEVtaXR0ZXIub24oZXZlbnRzLmFmdGVyU2xpZGVMb2Fkcywgb25BZnRlclNsaWRlTG9hZHMpO1xuICAgICAgRXZlbnRFbWl0dGVyLm9uKGV2ZW50cy5hZnRlclNlY3Rpb25Mb2FkcywgYWZ0ZXJTZWN0aW9uTG9hZHMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRGVzdHJveSQ1KCkge1xuICAgICAgY2xlYXJUaW1lb3V0KGdfa2V5ZG93bklkKTtcbiAgICAgIGRvY1JlbW92ZUV2ZW50KCdrZXlkb3duJywga2V5ZG93bkhhbmRsZXIpO1xuICAgICAgZG9jUmVtb3ZlRXZlbnQoJ2tleXVwJywga2V5VXBIYW5kbGVyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0luc2lkZUlucHV0KCkge1xuICAgICAgdmFyIGFjdGl2ZUVsZW1lbnQgPSBkb2MuYWN0aXZlRWxlbWVudDtcbiAgICAgIHJldHVybiBtYXRjaGVzKGFjdGl2ZUVsZW1lbnQsICd0ZXh0YXJlYScpIHx8IG1hdGNoZXMoYWN0aXZlRWxlbWVudCwgJ2lucHV0JykgfHwgbWF0Y2hlcyhhY3RpdmVFbGVtZW50LCAnc2VsZWN0JykgfHwgZ2V0QXR0cihhY3RpdmVFbGVtZW50LCAnY29udGVudEVkaXRhYmxlJykgPT0gXCJ0cnVlXCIgfHwgZ2V0QXR0cihhY3RpdmVFbGVtZW50LCAnY29udGVudEVkaXRhYmxlJykgPT0gJyc7XG4gICAgfSAvL1NsaWRpbmcgd2l0aCBhcnJvdyBrZXlzLCBib3RoLCB2ZXJ0aWNhbCBhbmQgaG9yaXpvbnRhbFxuXG5cbiAgICBmdW5jdGlvbiBrZXlkb3duSGFuZGxlcihlKSB7XG4gICAgICBjbGVhclRpbWVvdXQoZ19rZXlkb3duSWQpO1xuICAgICAgdmFyIGtleUNvZGUgPSBlLmtleUNvZGU7XG4gICAgICB2YXIgaXNQcmVzc2luZ0hvcml6b250YWxBcnJvd3MgPSBbMzcsIDM5XS5pbmRleE9mKGtleUNvZGUpID4gLTE7XG4gICAgICB2YXIgY2FuU2Nyb2xsV2l0aEtleWJvYXJkID0gZ2V0T3B0aW9ucygpLmF1dG9TY3JvbGxpbmcgfHwgZ2V0T3B0aW9ucygpLmZpdFRvU2VjdGlvbiB8fCBpc1ByZXNzaW5nSG9yaXpvbnRhbEFycm93czsgLy90YWI/XG5cbiAgICAgIGlmIChrZXlDb2RlID09PSA5KSB7XG4gICAgICAgIG9uVGFiKGUpO1xuICAgICAgfSBlbHNlIGlmICghaXNJbnNpZGVJbnB1dCgpICYmIGdldE9wdGlvbnMoKS5rZXlib2FyZFNjcm9sbGluZyAmJiBjYW5TY3JvbGxXaXRoS2V5Ym9hcmQpIHtcbiAgICAgICAgZ19jb250cm9sUHJlc3NlZCA9IGUuY3RybEtleTtcbiAgICAgICAgZ19rZXlkb3duSWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBvbmtleWRvd24oZSk7XG4gICAgICAgIH0sIDApO1xuICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAqIEtleWRvd24gZXZlbnRcbiAgICAqL1xuXG5cbiAgICBmdW5jdGlvbiBvbmtleWRvd24oZSkge1xuICAgICAgdmFyIHNoaWZ0UHJlc3NlZCA9IGUuc2hpZnRLZXk7XG4gICAgICB2YXIgYWN0aXZlRWxlbWVudCA9IGRvYy5hY3RpdmVFbGVtZW50O1xuICAgICAgdmFyIGlzTWVkaWFGb2N1c2VkID0gbWF0Y2hlcyhhY3RpdmVFbGVtZW50LCAndmlkZW8nKSB8fCBtYXRjaGVzKGFjdGl2ZUVsZW1lbnQsICdhdWRpbycpO1xuICAgICAgdmFyIGlzU2Nyb2xsZWQgPSB7XG4gICAgICAgIHVwOiBzY3JvbGxPdmVyZmxvd0hhbmRsZXIuaXNTY3JvbGxlZCgndXAnLCBnZXRTdGF0ZSgpLmFjdGl2ZVNlY3Rpb24uaXRlbSksXG4gICAgICAgIGRvd246IHNjcm9sbE92ZXJmbG93SGFuZGxlci5pc1Njcm9sbGVkKCdkb3duJywgZ2V0U3RhdGUoKS5hY3RpdmVTZWN0aW9uLml0ZW0pXG4gICAgICB9O1xuICAgICAgdmFyIGlzVXNpbmdIb3Jpem9udGFsQXJyb3dLZXlzID0gWzM3LCAzOV0uaW5kZXhPZihlLmtleUNvZGUpID4gLTE7XG4gICAgICBjYW5jZWxEaXJlY3Rpb25LZXlFdmVudHMoZSk7IC8vZG8gbm90aGluZyBpZiB3ZSBjYW4gbm90IHNjcm9sbCBvciB3ZSBhcmUgbm90IHVzaW5nIGhvcml6b3RuYWwga2V5IGFycm93cy5cblxuICAgICAgaWYgKCFzdGF0ZS5jYW5TY3JvbGwgJiYgIWlzVXNpbmdIb3Jpem9udGFsQXJyb3dLZXlzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2V0U3RhdGUoe1xuICAgICAgICBzY3JvbGxUcmlnZ2VyOiAna2V5ZG93bidcbiAgICAgIH0pO1xuXG4gICAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuICAgICAgICAvL3VwXG4gICAgICAgIGNhc2UgMzg6XG4gICAgICAgIGNhc2UgMzM6XG4gICAgICAgICAgaWYgKGdldElzU2Nyb2xsQWxsb3dlZCgpLmsudXAgJiYgaXNTY3JvbGxlZC51cCkge1xuICAgICAgICAgICAgaWYgKHN0YXRlLmlzQmV5b25kRnVsbHBhZ2UpIHtcbiAgICAgICAgICAgICAgRXZlbnRFbWl0dGVyLmVtaXQoZXZlbnRzLm9uS2V5RG93biwge1xuICAgICAgICAgICAgICAgIGU6IGVcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBtb3ZlU2VjdGlvblVwKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vZG93blxuXG4gICAgICAgIGNhc2UgMzI6XG4gICAgICAgICAgLy9zcGFjZWJhclxuICAgICAgICAgIGlmIChzaGlmdFByZXNzZWQgJiYgZ2V0SXNTY3JvbGxBbGxvd2VkKCkuay51cCAmJiAhaXNNZWRpYUZvY3VzZWQgJiYgaXNTY3JvbGxlZC51cCkge1xuICAgICAgICAgICAgbW92ZVNlY3Rpb25VcCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cblxuICAgICAgICBjYXNlIDQwOlxuICAgICAgICBjYXNlIDM0OlxuICAgICAgICAgIGlmIChnZXRJc1Njcm9sbEFsbG93ZWQoKS5rLmRvd24gJiYgaXNTY3JvbGxlZC5kb3duKSB7XG4gICAgICAgICAgICBpZiAoc3RhdGUuaXNCZXlvbmRGdWxscGFnZSkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IC8vIHNwYWNlIGJhcj9cblxuXG4gICAgICAgICAgICBpZiAoZS5rZXlDb2RlICE9PSAzMiB8fCAhaXNNZWRpYUZvY3VzZWQpIHtcbiAgICAgICAgICAgICAgbW92ZVNlY3Rpb25Eb3duKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vSG9tZVxuXG4gICAgICAgIGNhc2UgMzY6XG4gICAgICAgICAgaWYgKGdldElzU2Nyb2xsQWxsb3dlZCgpLmsudXApIHtcbiAgICAgICAgICAgIG1vdmVUbyQxKDEpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICAvL0VuZFxuXG4gICAgICAgIGNhc2UgMzU6XG4gICAgICAgICAgaWYgKGdldElzU2Nyb2xsQWxsb3dlZCgpLmsuZG93bikge1xuICAgICAgICAgICAgbW92ZVRvJDEoZ2V0U3RhdGUoKS5zZWN0aW9ucy5sZW5ndGgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICAvL2xlZnRcblxuICAgICAgICBjYXNlIDM3OlxuICAgICAgICAgIGlmIChnZXRJc1Njcm9sbEFsbG93ZWQoKS5rLmxlZnQpIHtcbiAgICAgICAgICAgIG1vdmVTbGlkZUxlZnQoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgLy9yaWdodFxuXG4gICAgICAgIGNhc2UgMzk6XG4gICAgICAgICAgaWYgKGdldElzU2Nyb2xsQWxsb3dlZCgpLmsucmlnaHQpIHtcbiAgICAgICAgICAgIG1vdmVTbGlkZVJpZ2h0KCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIC8vIGV4aXQgdGhpcyBoYW5kbGVyIGZvciBvdGhlciBrZXlzXG4gICAgICB9XG4gICAgfSAvL3RvIHByZXZlbnQgc2Nyb2xsaW5nIHdoaWxlIHpvb21pbmdcblxuXG4gICAgZnVuY3Rpb24ga2V5VXBIYW5kbGVyKGUpIHtcbiAgICAgIGlmIChzdGF0ZS5pc1dpbmRvd0ZvY3VzZWQpIHtcbiAgICAgICAgLy90aGUga2V5dXAgZ2V0cyBmaXJlZCBvbiBuZXcgdGFiIGN0cmwgKyB0IGluIEZpcmVmb3hcbiAgICAgICAgZ19jb250cm9sUHJlc3NlZCA9IGUuY3RybEtleTtcbiAgICAgIH1cbiAgICB9IC8vd2hlbiBvcGVuaW5nIGEgbmV3IHRhYiAoY3RybCArIHQpLCBgY29udHJvbGAgd29uJ3QgYmUgcHJlc3NlZCB3aGVuIGNvbWluZyBiYWNrLlxuXG5cbiAgICBmdW5jdGlvbiBibHVySGFuZGxlcigpIHtcbiAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgaXNXaW5kb3dGb2N1c2VkOiBmYWxzZVxuICAgICAgfSk7XG4gICAgICBnX2NvbnRyb2xQcmVzc2VkID0gZmFsc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICogTWFrZXMgc3VyZSB0aGUgdGFiIGtleSB3aWxsIG9ubHkgZm9jdXMgZWxlbWVudHMgd2l0aGluIHRoZSBjdXJyZW50IHNlY3Rpb24vc2xpZGVcbiAgICAqIHByZXZlbnRpbmcgdGhpcyB3YXkgZnJvbSBicmVha2luZyB0aGUgcGFnZS5cbiAgICAqIEJhc2VkIG9uIFwiTW9kYWxzIGFuZCBrZXlib2FyZCB0cmFwc1wiXG4gICAgKiBmcm9tIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL3dlYi9mdW5kYW1lbnRhbHMvYWNjZXNzaWJpbGl0eS9mb2N1cy91c2luZy10YWJpbmRleFxuICAgICovXG5cblxuICAgIGZ1bmN0aW9uIG9uVGFiKGUpIHtcbiAgICAgIHZhciBpc1NoaWZ0UHJlc3NlZCA9IGUuc2hpZnRLZXk7XG4gICAgICB2YXIgYWN0aXZlRWxlbWVudCA9IGRvYy5hY3RpdmVFbGVtZW50O1xuICAgICAgdmFyIGZvY3VzYWJsZUVsZW1lbnRzID0gZ2V0Rm9jdXNhYmxlcyhnZXRTbGlkZU9yU2VjdGlvbihnZXRTdGF0ZSgpLmFjdGl2ZVNlY3Rpb24uaXRlbSkpO1xuXG4gICAgICBmdW5jdGlvbiBwcmV2ZW50QW5kRm9jdXNGaXJzdChlKSB7XG4gICAgICAgIHByZXZlbnREZWZhdWx0KGUpO1xuICAgICAgICByZXR1cm4gZm9jdXNhYmxlRWxlbWVudHNbMF0gPyBmb2N1c2FibGVFbGVtZW50c1swXS5mb2N1cygpIDogbnVsbDtcbiAgICAgIH0gLy9vdXRzaWRlIGFueSBzZWN0aW9uIG9yIHNsaWRlPyBMZXQncyBub3QgaGlqYWNrIHRoZSB0YWIhXG5cblxuICAgICAgaWYgKGlzRm9jdXNPdXRzaWRlKGUpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gLy9pcyB0aGVyZSBhbiBlbGVtZW50IHdpdGggZm9jdXM/XG5cblxuICAgICAgaWYgKGFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgaWYgKGNsb3Nlc3QoYWN0aXZlRWxlbWVudCwgU0VDVElPTl9BQ1RJVkVfU0VMICsgJywnICsgU0VDVElPTl9BQ1RJVkVfU0VMICsgJyAnICsgU0xJREVfQUNUSVZFX1NFTCkgPT0gbnVsbCkge1xuICAgICAgICAgIGFjdGl2ZUVsZW1lbnQgPSBwcmV2ZW50QW5kRm9jdXNGaXJzdChlKTtcbiAgICAgICAgfVxuICAgICAgfSAvL25vIGVsZW1lbnQgaWYgZm9jdXNlZD8gTGV0J3MgZm9jdXMgdGhlIGZpcnN0IG9uZSBvZiB0aGUgc2VjdGlvbi9zbGlkZVxuICAgICAgZWxzZSB7XG4gICAgICAgIHByZXZlbnRBbmRGb2N1c0ZpcnN0KGUpO1xuICAgICAgfSAvL3doZW4gcmVhY2hlZCB0aGUgZmlyc3Qgb3IgbGFzdCBmb2N1c2FibGUgZWxlbWVudCBvZiB0aGUgc2VjdGlvbi9zbGlkZVxuICAgICAgLy93ZSBwcmV2ZW50IHRoZSB0YWIgYWN0aW9uIHRvIGtlZXAgaXQgaW4gdGhlIGxhc3QgZm9jdXNhYmxlIGVsZW1lbnRcblxuXG4gICAgICB2YXIgaXNGaXJzdEZvY3VzYWJsZUluU2VjdGlvbiA9IGFjdGl2ZUVsZW1lbnQgPT0gZm9jdXNhYmxlRWxlbWVudHNbMF07XG4gICAgICB2YXIgaXNMYXN0Rm9jdXNhYmxlSW5TZWN0aW9uID0gYWN0aXZlRWxlbWVudCA9PSBmb2N1c2FibGVFbGVtZW50c1tmb2N1c2FibGVFbGVtZW50cy5sZW5ndGggLSAxXTtcbiAgICAgIHZhciBpc05leHRJdGVtID0gIWlzU2hpZnRQcmVzc2VkICYmIGlzTGFzdEZvY3VzYWJsZUluU2VjdGlvbjtcbiAgICAgIHZhciBpc1ByZXZJdGVtID0gaXNTaGlmdFByZXNzZWQgJiYgaXNGaXJzdEZvY3VzYWJsZUluU2VjdGlvbjtcblxuICAgICAgaWYgKGlzUHJldkl0ZW0gfHwgaXNOZXh0SXRlbSkge1xuICAgICAgICBwcmV2ZW50RGVmYXVsdChlKTtcbiAgICAgICAgdmFyIGZvY3VzSW5mbyA9IGdldFBhbmVsV2l0aEZvY3VzYWJsZShpc1ByZXZJdGVtKTtcbiAgICAgICAgdmFyIGRlc3RpbmF0aW9uUGFuZWwgPSBmb2N1c0luZm8gPyBmb2N1c0luZm8ucGFuZWwgOiBudWxsO1xuXG4gICAgICAgIGlmIChkZXN0aW5hdGlvblBhbmVsKSB7XG4gICAgICAgICAgdmFyIGRlc3RpbmF0aW9uU2VjdGlvbiA9IGRlc3RpbmF0aW9uUGFuZWwuaXNTZWN0aW9uID8gZGVzdGluYXRpb25QYW5lbCA6IGRlc3RpbmF0aW9uUGFuZWwucGFyZW50O1xuICAgICAgICAgIEV2ZW50RW1pdHRlci5lbWl0KGV2ZW50cy5vblNjcm9sbFBhZ2VBbmRTbGlkZSwge1xuICAgICAgICAgICAgc2VjdGlvbkFuY2hvcjogZGVzdGluYXRpb25TZWN0aW9uLmluZGV4KCkgKyAxLFxuICAgICAgICAgICAgc2xpZGVBbmNob3I6IGRlc3RpbmF0aW9uUGFuZWwuaXNTZWN0aW9uID8gMCA6IGRlc3RpbmF0aW9uUGFuZWwuaW5kZXgoKVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGdfZWxUb0ZvY3VzID0gZm9jdXNJbmZvLml0ZW1Ub0ZvY3VzO1xuICAgICAgICAgIHByZXZlbnREZWZhdWx0KGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25BZnRlclNsaWRlTG9hZHModikge1xuICAgICAgZm9jdXNJdGVtKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWZ0ZXJTZWN0aW9uTG9hZHModikge1xuICAgICAgaWYgKCFjbG9zZXN0KGdfZWxUb0ZvY3VzLCBTTElERV9TRUwpIHx8IGNsb3Nlc3QoZ19lbFRvRm9jdXMsIFNMSURFX0FDVElWRV9TRUwpKSB7XG4gICAgICAgIGZvY3VzSXRlbSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvY3VzSXRlbSgpIHtcbiAgICAgIGlmIChnX2VsVG9Gb2N1cykge1xuICAgICAgICBnX2VsVG9Gb2N1cy5mb2N1cygpO1xuICAgICAgICBnX2VsVG9Gb2N1cyA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCdzIHRoZSBwYW5lbCBjb250YWluaW5nIHRoZSBlbGVtZW50IHRvIGZvY3VzLlxuICAgICAqXG4gICAgICovXG5cblxuICAgIGZ1bmN0aW9uIGdldFBhbmVsV2l0aEZvY3VzYWJsZShpc1ByZXZJdGVtKSB7XG4gICAgICB2YXIgYWN0aW9uID0gaXNQcmV2SXRlbSA/ICdwcmV2UGFuZWwnIDogJ25leHRQYW5lbCc7XG4gICAgICB2YXIgZm9jdXNhYmxlRWxlbWVudHMgPSBbXTtcbiAgICAgIHZhciBwYW5lbFdpdGhGb2N1c2FibGVzO1xuICAgICAgdmFyIGN1cnJlbnRQYW5lbCA9IGdldFNsaWRlT3JTZWN0aW9uUGFuZWwoZ2V0QWN0aXZlUGFuZWwoKVthY3Rpb25dKCkpO1xuXG4gICAgICBkbyB7XG4gICAgICAgIGZvY3VzYWJsZUVsZW1lbnRzID0gZ2V0Rm9jdXNhYmxlcyhjdXJyZW50UGFuZWwuaXRlbSk7XG5cbiAgICAgICAgaWYgKGZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgIHBhbmVsV2l0aEZvY3VzYWJsZXMgPSB7XG4gICAgICAgICAgICBwYW5lbDogY3VycmVudFBhbmVsLFxuICAgICAgICAgICAgaXRlbVRvRm9jdXM6IGZvY3VzYWJsZUVsZW1lbnRzW2lzUHJldkl0ZW0gPyBmb2N1c2FibGVFbGVtZW50cy5sZW5ndGggLSAxIDogMF1cbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY3VycmVudFBhbmVsID0gZ2V0U2xpZGVPclNlY3Rpb25QYW5lbChjdXJyZW50UGFuZWxbYWN0aW9uXSgpKTtcbiAgICAgIH0gd2hpbGUgKGN1cnJlbnRQYW5lbCAmJiBmb2N1c2FibGVFbGVtZW50cy5sZW5ndGggPT09IDApO1xuXG4gICAgICByZXR1cm4gcGFuZWxXaXRoRm9jdXNhYmxlcztcbiAgICB9XG4gICAgLyoqXG4gICAgKiBHZXRzIGFsbCB0aGUgZm9jdXNhYmxlIGVsZW1lbnRzIGluc2lkZSB0aGUgcGFzc2VkIGVsZW1lbnQuXG4gICAgKi9cblxuXG4gICAgZnVuY3Rpb24gZ2V0Rm9jdXNhYmxlcyhlbCkge1xuICAgICAgcmV0dXJuIFtdLnNsaWNlLmNhbGwoJChmb2N1c2FibGVFbGVtZW50c1N0cmluZywgZWwpKS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIGdldEF0dHIoaXRlbSwgJ3RhYmluZGV4JykgIT09ICctMScgJiYgLy9hcmUgYWxzbyBub3QgaGlkZGVuIGVsZW1lbnRzIChvciB3aXRoIGhpZGRlbiBwYXJlbnRzKVxuICAgICAgICBpdGVtLm9mZnNldFBhcmVudCAhPT0gbnVsbDtcbiAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAqIERldGVybWluZXMgd2hldGhlciB0aGUgZm9jdXMgaXMgb3V0c2lkZSBmdWxscGFnZS5qcyBzZWN0aW9ucy9zbGlkZXMgb3Igbm90LlxuICAgICovXG5cblxuICAgIGZ1bmN0aW9uIGlzRm9jdXNPdXRzaWRlKGUpIHtcbiAgICAgIHZhciBhbGxGb2N1c2FibGVzID0gZ2V0Rm9jdXNhYmxlcyhkb2MpO1xuICAgICAgdmFyIGN1cnJlbnRGb2N1c0luZGV4ID0gYWxsRm9jdXNhYmxlcy5pbmRleE9mKGRvYy5hY3RpdmVFbGVtZW50KTtcbiAgICAgIHZhciBmb2N1c0Rlc3RpbmF0aW9uSW5kZXggPSBlLnNoaWZ0S2V5ID8gY3VycmVudEZvY3VzSW5kZXggLSAxIDogY3VycmVudEZvY3VzSW5kZXggKyAxO1xuICAgICAgdmFyIGZvY3VzRGVzdGluYXRpb24gPSBhbGxGb2N1c2FibGVzW2ZvY3VzRGVzdGluYXRpb25JbmRleF07XG4gICAgICB2YXIgZGVzdGluYXRpb25JdGVtU2xpZGUgPSBjbG9zZXN0KGZvY3VzRGVzdGluYXRpb24sIFNMSURFX1NFTCk7XG4gICAgICB2YXIgZGVzdGluYXRpb25JdGVtU2VjdGlvbiA9IGNsb3Nlc3QoZm9jdXNEZXN0aW5hdGlvbiwgU0VDVElPTl9TRUwpO1xuICAgICAgcmV0dXJuICFkZXN0aW5hdGlvbkl0ZW1TbGlkZSAmJiAhZGVzdGluYXRpb25JdGVtU2VjdGlvbjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzaG91bGRDYW5jZWxLZXlib2FyZE5hdmlnYXRpb24oZSkge1xuICAgICAgLy8gaHR0cHM6Ly9rZXljb2RlLmluZm8vZm9yLzM0XG4gICAgICAvLyA0MCA9IGFycm93IGRvd25cbiAgICAgIC8vIDM4ID0gYXJyb3cgdXBcbiAgICAgIC8vIDMyID0gc3BhY2ViYXJcbiAgICAgIC8vIDMzICA9IFBhZ2VVcFxuICAgICAgLy8gMzQgPSBQYWdlRG93blxuICAgICAgdmFyIGtleUNvbnRyb2xzID0gWzQwLCAzOCwgMzIsIDMzLCAzNF07XG4gICAgICByZXR1cm4ga2V5Q29udHJvbHMuaW5kZXhPZihlLmtleUNvZGUpID4gLTEgJiYgIXN0YXRlLmlzQmV5b25kRnVsbHBhZ2U7XG4gICAgfSAvL3ByZXZlbnRpbmcgdGhlIHNjcm9sbCB3aXRoIGFycm93IGtleXMgJiBzcGFjZWJhciAmIFBhZ2UgVXAgJiBEb3duIGtleXNcblxuXG4gICAgZnVuY3Rpb24gY2FuY2VsRGlyZWN0aW9uS2V5RXZlbnRzKGUpIHtcbiAgICAgIGlmIChzaG91bGRDYW5jZWxLZXlib2FyZE5hdmlnYXRpb24oZSkgJiYgIWNsb3Nlc3QoZS50YXJnZXQsIE9WRVJGTE9XX1NFTCkpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldENvbnRyb2xQcmVzc2VkKCkge1xuICAgICAgcmV0dXJuIGdfY29udHJvbFByZXNzZWQ7XG4gICAgfVxuXG4gICAgdmFyIHByZXZUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgdmFyIHNjcm9sbGluZ3MgPSBbXTtcbiAgICBGUC5zZXRNb3VzZVdoZWVsU2Nyb2xsaW5nID0gc2V0TW91c2VXaGVlbFNjcm9sbGluZztcbiAgICAvKipcbiAgICAqIEFkZHMgb3IgcmVtb3ZlIHRoZSBwb3NzaWJpbGl0eSBvZiBzY3JvbGxpbmcgdGhyb3VnaCBzZWN0aW9ucyBieSB1c2luZyB0aGUgbW91c2Ugd2hlZWwgb3IgdGhlIHRyYWNrcGFkLlxuICAgICovXG5cbiAgICBmdW5jdGlvbiBzZXRNb3VzZVdoZWVsU2Nyb2xsaW5nKHZhbHVlKSB7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgYWRkTW91c2VXaGVlbEhhbmRsZXIoKTtcbiAgICAgICAgYWRkTWlkZGxlV2hlZWxIYW5kbGVyKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZW1vdmVNb3VzZVdoZWVsSGFuZGxlcigpO1xuICAgICAgICByZW1vdmVNaWRkbGVXaGVlbEhhbmRsZXIoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgKiBBZGRzIHRoZSBhdXRvIHNjcm9sbGluZyBhY3Rpb24gZm9yIHRoZSBtb3VzZSB3aGVlbCBhbmQgdHJhY2twYWQuXG4gICAgKiBBZnRlciB0aGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCwgdGhlIG1vdXNld2hlZWwgYW5kIHRyYWNrcGFkIG1vdmVtZW50cyB3aWxsIHNjcm9sbCB0aHJvdWdoIHNlY3Rpb25zXG4gICAgKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9FdmVudHMvd2hlZWxcbiAgICAqL1xuXG5cbiAgICBmdW5jdGlvbiBhZGRNb3VzZVdoZWVsSGFuZGxlcigpIHtcbiAgICAgIHZhciBwcmVmaXggPSAnJztcblxuICAgICAgdmFyIF9hZGRFdmVudExpc3RlbmVyO1xuXG4gICAgICBpZiAod2luLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgX2FkZEV2ZW50TGlzdGVuZXIgPSBcImFkZEV2ZW50TGlzdGVuZXJcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF9hZGRFdmVudExpc3RlbmVyID0gXCJhdHRhY2hFdmVudFwiO1xuICAgICAgICBwcmVmaXggPSAnb24nO1xuICAgICAgfSAvLyBkZXRlY3QgYXZhaWxhYmxlIHdoZWVsIGV2ZW50XG5cblxuICAgICAgdmFyIHN1cHBvcnQgPSAnb253aGVlbCcgaW4gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpID8gJ3doZWVsJyA6IC8vIE1vZGVybiBicm93c2VycyBzdXBwb3J0IFwid2hlZWxcIlxuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgZG9jLm9ubW91c2V3aGVlbCAhPT0gdW5kZWZpbmVkID8gJ21vdXNld2hlZWwnIDogLy8gV2Via2l0IGFuZCBJRSBzdXBwb3J0IGF0IGxlYXN0IFwibW91c2V3aGVlbFwiXG4gICAgICAnRE9NTW91c2VTY3JvbGwnOyAvLyBsZXQncyBhc3N1bWUgdGhhdCByZW1haW5pbmcgYnJvd3NlcnMgYXJlIG9sZGVyIEZpcmVmb3hcblxuICAgICAgdmFyIHBhc3NpdmVFdmVudCA9IGdldFBhc3NpdmVPcHRpb25zSWZQb3NzaWJsZSgpO1xuXG4gICAgICBpZiAoc3VwcG9ydCA9PSAnRE9NTW91c2VTY3JvbGwnKSB7XG4gICAgICAgIGRvY1tfYWRkRXZlbnRMaXN0ZW5lcl0ocHJlZml4ICsgJ01vek1vdXNlUGl4ZWxTY3JvbGwnLCBNb3VzZVdoZWVsSGFuZGxlciwgcGFzc2l2ZUV2ZW50KTtcbiAgICAgIH0gLy9oYW5kbGUgTW96TW91c2VQaXhlbFNjcm9sbCBpbiBvbGRlciBGaXJlZm94XG4gICAgICBlbHNlIHtcbiAgICAgICAgZG9jW19hZGRFdmVudExpc3RlbmVyXShwcmVmaXggKyBzdXBwb3J0LCBNb3VzZVdoZWVsSGFuZGxlciwgcGFzc2l2ZUV2ZW50KTtcbiAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgKiBCaW5kaW5nIHRoZSBtb3VzZW1vdmUgd2hlbiB0aGUgbW91c2UncyBtaWRkbGUgYnV0dG9uIGlzIHByZXNzZWRcbiAgICAqL1xuXG5cbiAgICBmdW5jdGlvbiBhZGRNaWRkbGVXaGVlbEhhbmRsZXIoKSB7XG4gICAgICBnZXRDb250YWluZXIoKS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBtb3VzZURvd25IYW5kbGVyKTtcbiAgICAgIGdldENvbnRhaW5lcigpLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZVVwSGFuZGxlcik7XG4gICAgfVxuICAgIC8qKlxuICAgICogUmVtb3ZlcyB0aGUgYXV0byBzY3JvbGxpbmcgYWN0aW9uIGZpcmVkIGJ5IHRoZSBtb3VzZSB3aGVlbCBhbmQgdHJhY2twYWQuXG4gICAgKiBBZnRlciB0aGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCwgdGhlIG1vdXNld2hlZWwgYW5kIHRyYWNrcGFkIG1vdmVtZW50cyB3b24ndCBzY3JvbGwgdGhyb3VnaCBzZWN0aW9ucy5cbiAgICAqL1xuXG5cbiAgICBmdW5jdGlvbiByZW1vdmVNb3VzZVdoZWVsSGFuZGxlcigpIHtcbiAgICAgIGlmIChkb2MuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICBkb2NSZW1vdmVFdmVudCgnbW91c2V3aGVlbCcsIE1vdXNlV2hlZWxIYW5kbGVyLCBmYWxzZSk7IC8vSUU5LCBDaHJvbWUsIFNhZmFyaSwgT3BlclxuXG4gICAgICAgIGRvY1JlbW92ZUV2ZW50KCd3aGVlbCcsIE1vdXNlV2hlZWxIYW5kbGVyLCBmYWxzZSk7IC8vRmlyZWZveFxuXG4gICAgICAgIGRvY1JlbW92ZUV2ZW50KCdNb3pNb3VzZVBpeGVsU2Nyb2xsJywgTW91c2VXaGVlbEhhbmRsZXIsIGZhbHNlKTsgLy9vbGQgRmlyZWZveFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBkb2MuZGV0YWNoRXZlbnQoJ29ubW91c2V3aGVlbCcsIE1vdXNlV2hlZWxIYW5kbGVyKTsgLy9JRSA2LzcvOFxuICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAqIFVuYmluZGluZyB0aGUgbW91c2Vtb3ZlIHdoZW4gdGhlIG1vdXNlJ3MgbWlkZGxlIGJ1dHRvbiBpcyByZWxlYXNlZFxuICAgICovXG5cblxuICAgIGZ1bmN0aW9uIHJlbW92ZU1pZGRsZVdoZWVsSGFuZGxlcigpIHtcbiAgICAgIGdldENvbnRhaW5lcigpLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIG1vdXNlRG93bkhhbmRsZXIpO1xuICAgICAgZ2V0Q29udGFpbmVyKCkucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG1vdXNlVXBIYW5kbGVyKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGV0ZWN0aW5nIG1vdXNld2hlZWwgc2Nyb2xsaW5nXG4gICAgICpcbiAgICAgKiBodHRwOi8vYmxvZ3Muc2l0ZXBvaW50c3RhdGljLmNvbS9leGFtcGxlcy90ZWNoL21vdXNlLXdoZWVsL2luZGV4Lmh0bWxcbiAgICAgKiBodHRwOi8vd3d3LnNpdGVwb2ludC5jb20vaHRtbDUtamF2YXNjcmlwdC1tb3VzZS13aGVlbC9cbiAgICAgKi9cblxuXG4gICAgZnVuY3Rpb24gTW91c2VXaGVlbEhhbmRsZXIoZSkge1xuICAgICAgdmFyIGN1clRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgIHZhciBpc05vcm1hbFNjcm9sbCA9IGhhc0NsYXNzKCQoQ09NUExFVEVMWV9TRUwpWzBdLCBOT1JNQUxfU0NST0xMKTtcbiAgICAgIHZhciBpc1Njcm9sbEFsbG93ZWRCZXlvbmRGdWxsUGFnZSA9IGJleW9uZEZ1bGxQYWdlSGFuZGxlcihnZXRDb250YWluZXIoKSwgZSk7XG5cbiAgICAgIGlmICghc3RhdGUuaXNVc2luZ1doZWVsKSB7XG4gICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICBpc0dyYWJiaW5nOiBmYWxzZSxcbiAgICAgICAgICBpc1VzaW5nV2hlZWw6IHRydWUsXG4gICAgICAgICAgdG91Y2hEaXJlY3Rpb246ICdub25lJ1xuICAgICAgICB9KTtcbiAgICAgIH0gLy9pcyBzY3JvbGwgYWxsb3dlZD9cblxuXG4gICAgICBpZiAoIWdldElzU2Nyb2xsQWxsb3dlZCgpLm0uZG93biAmJiAhZ2V0SXNTY3JvbGxBbGxvd2VkKCkubS51cCkge1xuICAgICAgICBwcmV2ZW50RGVmYXVsdChlKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNTY3JvbGxBbGxvd2VkQmV5b25kRnVsbFBhZ2UpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2UgaWYgKGlzU2Nyb2xsQWxsb3dlZEJleW9uZEZ1bGxQYWdlID09PSBmYWxzZSkge1xuICAgICAgICBwcmV2ZW50RGVmYXVsdChlKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSAvL2F1dG9zY3JvbGxpbmcgYW5kIG5vdCB6b29taW5nP1xuXG5cbiAgICAgIGlmIChnZXRPcHRpb25zKCkuYXV0b1Njcm9sbGluZyAmJiAhZ2V0Q29udHJvbFByZXNzZWQoKSAmJiAhaXNOb3JtYWxTY3JvbGwpIHtcbiAgICAgICAgLy8gY3Jvc3MtYnJvd3NlciB3aGVlbCBkZWx0YVxuICAgICAgICBlID0gZSB8fCB3aW4uZXZlbnQ7XG4gICAgICAgIHZhciB2YWx1ZSA9IGUud2hlZWxEZWx0YSB8fCAtZS5kZWx0YVkgfHwgLWUuZGV0YWlsO1xuICAgICAgICB2YXIgZGVsdGEgPSBNYXRoLm1heCgtMSwgTWF0aC5taW4oMSwgdmFsdWUpKTtcbiAgICAgICAgdmFyIGhvcml6b250YWxEZXRlY3Rpb24gPSB0eXBlb2YgZS53aGVlbERlbHRhWCAhPT0gJ3VuZGVmaW5lZCcgfHwgdHlwZW9mIGUuZGVsdGFYICE9PSAndW5kZWZpbmVkJztcbiAgICAgICAgdmFyIGlzU2Nyb2xsaW5nVmVydGljYWxseSA9IE1hdGguYWJzKGUud2hlZWxEZWx0YVgpIDwgTWF0aC5hYnMoZS53aGVlbERlbHRhKSB8fCBNYXRoLmFicyhlLmRlbHRhWCkgPCBNYXRoLmFicyhlLmRlbHRhWSkgfHwgIWhvcml6b250YWxEZXRlY3Rpb247XG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSBkZWx0YSA8IDAgPyAnZG93bicgOiBkZWx0YSA+IDAgPyAndXAnIDogJ25vbmUnOyAvL0xpbWl0aW5nIHRoZSBhcnJheSB0byAxNTAgKGxldHMgbm90IHdhc3RlIG1lbW9yeSEpXG5cbiAgICAgICAgaWYgKHNjcm9sbGluZ3MubGVuZ3RoID4gMTQ5KSB7XG4gICAgICAgICAgc2Nyb2xsaW5ncy5zaGlmdCgpO1xuICAgICAgICB9IC8va2VlcGluZyByZWNvcmQgb2YgdGhlIHByZXZpb3VzIHNjcm9sbGluZ3NcblxuXG4gICAgICAgIHNjcm9sbGluZ3MucHVzaChNYXRoLmFicyh2YWx1ZSkpOyAvL3ByZXZlbnRpbmcgdG8gc2Nyb2xsIHRoZSBzaXRlIG9uIG1vdXNlIHdoZWVsIHdoZW4gc2Nyb2xsYmFyIGlzIHByZXNlbnRcblxuICAgICAgICBpZiAoZ2V0T3B0aW9ucygpLnNjcm9sbEJhcikge1xuICAgICAgICAgIHByZXZlbnREZWZhdWx0KGUpO1xuICAgICAgICB9IC8vdGltZSBkaWZmZXJlbmNlIGJldHdlZW4gdGhlIGxhc3Qgc2Nyb2xsIGFuZCB0aGUgY3VycmVudCBvbmVcblxuXG4gICAgICAgIHZhciB0aW1lRGlmZiA9IGN1clRpbWUgLSBwcmV2VGltZTtcbiAgICAgICAgcHJldlRpbWUgPSBjdXJUaW1lOyAvL2hhdmVuJ3QgdGhleSBzY3JvbGxlZCBpbiBhIHdoaWxlP1xuICAgICAgICAvLyhlbm91Z2ggdG8gYmUgY29uc2lkZXIgYSBkaWZmZXJlbnQgc2Nyb2xsaW5nIGFjdGlvbiB0byBzY3JvbGwgYW5vdGhlciBzZWN0aW9uKVxuXG4gICAgICAgIGlmICh0aW1lRGlmZiA+IDIwMCkge1xuICAgICAgICAgIC8vZW1wdHlpbmcgdGhlIGFycmF5LCB3ZSBkb250IGNhcmUgYWJvdXQgb2xkIHNjcm9sbGluZ3MgZm9yIG91ciBhdmVyYWdlc1xuICAgICAgICAgIHNjcm9sbGluZ3MgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICB3aGVlbERpcmVjdGlvbjogZGlyZWN0aW9uXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChzdGF0ZS5jYW5TY3JvbGwpIHtcbiAgICAgICAgICB2YXIgYXZlcmFnZUVuZCA9IGdldEF2ZXJhZ2Uoc2Nyb2xsaW5ncywgMTApO1xuICAgICAgICAgIHZhciBhdmVyYWdlTWlkZGxlID0gZ2V0QXZlcmFnZShzY3JvbGxpbmdzLCA3MCk7XG4gICAgICAgICAgdmFyIGlzQWNjZWxlcmF0aW5nID0gYXZlcmFnZUVuZCA+PSBhdmVyYWdlTWlkZGxlOyAvL3RvIGF2b2lkIGRvdWJsZSBzd2lwZXMuLi5cblxuICAgICAgICAgIGlmIChpc0FjY2VsZXJhdGluZyAmJiBpc1Njcm9sbGluZ1ZlcnRpY2FsbHkpIHtcbiAgICAgICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICAgICAgc2Nyb2xsVHJpZ2dlcjogJ3doZWVsJ1xuICAgICAgICAgICAgfSk7IC8vc2Nyb2xsaW5nIGRvd24/XG5cbiAgICAgICAgICAgIGlmIChkZWx0YSA8IDApIHtcbiAgICAgICAgICAgICAgc2Nyb2xsaW5nKCdkb3duJyk7XG4gICAgICAgICAgICB9IC8vc2Nyb2xsaW5nIHVwP1xuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIHNjcm9sbGluZygndXAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChnZXRPcHRpb25zKCkuZml0VG9TZWN0aW9uKSB7XG4gICAgICAgIC8vc3RvcHBpbmcgdGhlIGF1dG8gc2Nyb2xsIHRvIGFkanVzdCB0byBhIHNlY3Rpb25cbiAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgIGFjdGl2ZUFuaW1hdGlvbjogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSAvL2JpbmRpbmcgdGhlIG1vdXNlbW92ZSB3aGVuIHRoZSBtb3VzZSdzIG1pZGRsZSBidXR0b24gaXMgcmVsZWFzZWRcblxuXG4gICAgZnVuY3Rpb24gbW91c2VEb3duSGFuZGxlcihlKSB7XG4gICAgICAvL21pZGRsZSBidXR0b25cbiAgICAgIGlmIChlLndoaWNoID09IDIpIHtcbiAgICAgICAgc2V0T2xkUGFnZVkoZS5wYWdlWSk7XG4gICAgICAgIGdldENvbnRhaW5lcigpLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdXNlTW92ZUhhbmRsZXIpO1xuICAgICAgfVxuICAgIH0gLy91bmJpbmRpbmcgdGhlIG1vdXNlbW92ZSB3aGVuIHRoZSBtb3VzZSdzIG1pZGRsZSBidXR0b24gaXMgcmVsZWFzZWRcblxuXG4gICAgZnVuY3Rpb24gbW91c2VVcEhhbmRsZXIoZSkge1xuICAgICAgLy9taWRkbGUgYnV0dG9uXG4gICAgICBpZiAoZS53aGljaCA9PSAyKSB7XG4gICAgICAgIGdldENvbnRhaW5lcigpLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdXNlTW92ZUhhbmRsZXIpO1xuICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAqIEFkZHMgb3IgcmVtb3ZlIHRoZSBtb3VzZSB3aGVlbCBoaWphY2tpbmdcbiAgICAqL1xuXG5cbiAgICBmdW5jdGlvbiBzZXRNb3VzZUhpamFjayh2YWx1ZSkge1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIHNldE1vdXNlV2hlZWxTY3JvbGxpbmcodHJ1ZSk7XG4gICAgICAgIGFkZFRvdWNoSGFuZGxlcigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0TW91c2VXaGVlbFNjcm9sbGluZyhmYWxzZSk7XG4gICAgICAgIHJlbW92ZVRvdWNoSGFuZGxlcigpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBnX2NhbkZpcmVNb3VzZUVudGVyTm9ybWFsU2Nyb2xsID0gdHJ1ZTtcbiAgICBFdmVudEVtaXR0ZXIub24oZXZlbnRzLmJpbmRFdmVudHMsIGJpbmRFdmVudHMkNyk7XG5cbiAgICBmdW5jdGlvbiBiaW5kRXZlbnRzJDcoKSB7XG4gICAgICAvKipcbiAgICAgICogQXBwbHlpbmcgbm9ybWFsU2Nyb2xsIGVsZW1lbnRzLlxuICAgICAgKiBJZ25vcmluZyB0aGUgc2Nyb2xscyBvdmVyIHRoZSBzcGVjaWZpZWQgc2VsZWN0b3JzLlxuICAgICAgKi9cbiAgICAgIGlmIChnZXRPcHRpb25zKCkubm9ybWFsU2Nyb2xsRWxlbWVudHMpIHtcbiAgICAgICAgWydtb3VzZWVudGVyJywgJ3RvdWNoc3RhcnQnXS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudE5hbWUpIHtcbiAgICAgICAgICBmb3JNb3VzZUxlYXZlT3JUb3VjaChldmVudE5hbWUsIGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFsnbW91c2VsZWF2ZScsICd0b3VjaGVuZCddLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50TmFtZSkge1xuICAgICAgICAgIGZvck1vdXNlTGVhdmVPclRvdWNoKGV2ZW50TmFtZSwgdHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBFdmVudEVtaXR0ZXIub24oZXZlbnRzLm9uRGVzdHJveSwgb25EZXN0cm95JDQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRGVzdHJveSQ0KCkge1xuICAgICAgWydtb3VzZWVudGVyJywgJ3RvdWNoc3RhcnQnLCAnbW91c2VsZWF2ZScsICd0b3VjaGVuZCddLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50TmFtZSkge1xuICAgICAgICBkb2NSZW1vdmVFdmVudChldmVudE5hbWUsIG9uTW91c2VFbnRlck9yTGVhdmUsIHRydWUpOyAvL3RydWUgaXMgcmVxdWlyZWQhXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JNb3VzZUxlYXZlT3JUb3VjaChldmVudE5hbWUsIGFsbG93U2Nyb2xsaW5nKSB7XG4gICAgICAvL2Egd2F5IHRvIHBhc3MgYXJndW1lbnRzIHRvIHRoZSBvbk1vdXNlRW50ZXJPckxlYXZlIGZ1bmN0aW9uXG4gICAgICBkb2N1bWVudFsnZnBfJyArIGV2ZW50TmFtZV0gPSBhbGxvd1Njcm9sbGluZztcbiAgICAgIGRvY0FkZEV2ZW50KGV2ZW50TmFtZSwgb25Nb3VzZUVudGVyT3JMZWF2ZSwgdHJ1ZSk7IC8vY2FwdHVyaW5nIHBoYXNlXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Nb3VzZUVudGVyT3JMZWF2ZShlKSB7XG4gICAgICB2YXIgdHlwZSA9IGUudHlwZTtcbiAgICAgIHZhciBpc0luc2lkZU9uZU5vcm1hbFNjcm9sbCA9IGZhbHNlOyAvL29uTW91c2VMZWF2ZSB3aWxsIHVzZSB0aGUgZGVzdGluYXRpb24gdGFyZ2V0LCBub3QgdGhlIG9uZSB3ZSBhcmUgbW92aW5nIGF3YXkgZnJvbVxuXG4gICAgICB2YXIgdGFyZ2V0ID0gdHlwZSA9PT0gJ21vdXNlbGVhdmUnID8gZS50b0VsZW1lbnQgfHwgZS5yZWxhdGVkVGFyZ2V0IDogZS50YXJnZXQ7IC8vY29taW5nIGZyb20gY2xvc2luZyBhIG5vcm1hbFNjcm9sbEVsZW1lbnRzIG1vZGFsIG9yIG1vdmluZyBvdXRzaWRlIHZpZXdwb3J0P1xuXG4gICAgICBpZiAodGFyZ2V0ID09IGRvY3VtZW50IHx8ICF0YXJnZXQpIHtcbiAgICAgICAgc2V0TW91c2VIaWphY2sodHJ1ZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGUgPT09ICd0b3VjaGVuZCcpIHtcbiAgICAgICAgZ19jYW5GaXJlTW91c2VFbnRlck5vcm1hbFNjcm9sbCA9IGZhbHNlO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBnX2NhbkZpcmVNb3VzZUVudGVyTm9ybWFsU2Nyb2xsID0gdHJ1ZTtcbiAgICAgICAgfSwgODAwKTtcbiAgICAgIH0gLy9wcmV2ZW50aW5nIG1vdXNlZW50ZXIgZXZlbnQgdG8gZG8gYW55dGhpbmcgd2hlbiBjb21pbmcgZnJvbSBhIHRvdWNoRW5kIGV2ZW50XG4gICAgICAvL2ZpeGluZyBpc3N1ZSAjMzU3NlxuXG5cbiAgICAgIGlmICh0eXBlID09PSAnbW91c2VlbnRlcicgJiYgIWdfY2FuRmlyZU1vdXNlRW50ZXJOb3JtYWxTY3JvbGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgbm9ybWFsU2VsZWN0b3JzID0gZ2V0T3B0aW9ucygpLm5vcm1hbFNjcm9sbEVsZW1lbnRzLnNwbGl0KCcsJyk7XG4gICAgICBub3JtYWxTZWxlY3RvcnMuZm9yRWFjaChmdW5jdGlvbiAobm9ybWFsU2VsZWN0b3IpIHtcbiAgICAgICAgaWYgKCFpc0luc2lkZU9uZU5vcm1hbFNjcm9sbCkge1xuICAgICAgICAgIHZhciBpc05vcm1hbFNjcm9sbFRhcmdldCA9IG1hdGNoZXModGFyZ2V0LCBub3JtYWxTZWxlY3Rvcik7IC8vbGVhdmluZyBhIGNoaWxkIGluc2lkZSB0aGUgbm9ybWFsU2NvbGwgZWxlbWVudCBpcyBub3QgbGVhdmluZyB0aGUgbm9ybWFsU2Nyb2xsICMzNjYxXG5cbiAgICAgICAgICB2YXIgaXNOb3JtYWxTY3JvbGxDaGlsZEZvY3VzZWQgPSBjbG9zZXN0KHRhcmdldCwgbm9ybWFsU2VsZWN0b3IpO1xuXG4gICAgICAgICAgaWYgKGlzTm9ybWFsU2Nyb2xsVGFyZ2V0IHx8IGlzTm9ybWFsU2Nyb2xsQ2hpbGRGb2N1c2VkKSB7XG4gICAgICAgICAgICBpZiAoIUZQLnNoYXJlZC5pc05vcm1hbFNjcm9sbEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgc2V0TW91c2VIaWphY2soZmFsc2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBGUC5zaGFyZWQuaXNOb3JtYWxTY3JvbGxFbGVtZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgIGlzSW5zaWRlT25lTm9ybWFsU2Nyb2xsID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pOyAvL25vdCBpbnNpZGUgYSBzaW5nbGUgbm9ybWFsIHNjcm9sbCBlbGVtZW50IGFueW1vcmU/XG5cbiAgICAgIGlmICghaXNJbnNpZGVPbmVOb3JtYWxTY3JvbGwgJiYgRlAuc2hhcmVkLmlzTm9ybWFsU2Nyb2xsRWxlbWVudCkge1xuICAgICAgICBzZXRNb3VzZUhpamFjayh0cnVlKTtcbiAgICAgICAgRlAuc2hhcmVkLmlzTm9ybWFsU2Nyb2xsRWxlbWVudCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIEZQLnNpbGVudE1vdmVUbyA9IHNpbGVudE1vdmVUbztcbiAgICAvKipcbiAgICAqIE1vdmVzIHRoZSBwYWdlIHRvIHRoZSBnaXZlbiBzZWN0aW9uIGFuZCBzbGlkZSB3aXRoIG5vIGFuaW1hdGlvbi5cbiAgICAqIEFuY2hvcnMgb3IgaW5kZXggcG9zaXRpb25zIGNhbiBiZSB1c2VkIGFzIHBhcmFtcy5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gc2lsZW50TW92ZVRvKHNlY3Rpb25BbmNob3IsIHNsaWRlQW5jaG9yKSB7XG4gICAgICBzZXRTY3JvbGxpbmdTcGVlZCgwLCAnaW50ZXJuYWwnKTtcbiAgICAgIG1vdmVUbyQxKHNlY3Rpb25BbmNob3IsIHNsaWRlQW5jaG9yKTtcbiAgICAgIHNldFNjcm9sbGluZ1NwZWVkKGdldE9yaWdpbmFscygpLnNjcm9sbGluZ1NwZWVkLCAnaW50ZXJuYWwnKTtcbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNIZWlnaHQgPSBnZXRXaW5kb3dIZWlnaHQoKTtcbiAgICB2YXIgd2luZG93c1dpZHRoID0gZ2V0V2luZG93V2lkdGgoKTtcbiAgICB2YXIgZ19yZXNpemVJZDtcbiAgICB2YXIgZ19pc0NvbnNlY3V0aXZlUmVzaXplID0gZmFsc2U7XG4gICAgdmFyIGdfcmVzaXplTW9iaWxlSGFuZGxlcklkO1xuICAgIEZQLnJlQnVpbGQgPSByZUJ1aWxkO1xuICAgIEV2ZW50RW1pdHRlci5vbihldmVudHMuYmluZEV2ZW50cywgYmluZEV2ZW50cyQ2KTtcblxuICAgIGZ1bmN0aW9uIGJpbmRFdmVudHMkNigpIHtcbiAgICAgIC8vIFNldHRpbmcgVkggY29ycmVjdGx5IGluIG1vYmlsZSBkZXZpY2VzXG4gICAgICByZXNpemVIYW5kbGVyKCk7IC8vd2hlbiByZXNpemluZyB0aGUgc2l0ZSwgd2UgYWRqdXN0IHRoZSBoZWlnaHRzIG9mIHRoZSBzZWN0aW9ucywgc2xpbVNjcm9sbC4uLlxuXG4gICAgICB3aW5kb3dBZGRFdmVudCgncmVzaXplJywgcmVzaXplSGFuZGxlcik7XG4gICAgICBFdmVudEVtaXR0ZXIub24oZXZlbnRzLm9uRGVzdHJveSwgb25EZXN0cm95JDMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRGVzdHJveSQzKCkge1xuICAgICAgY2xlYXJUaW1lb3V0KGdfcmVzaXplSWQpO1xuICAgICAgY2xlYXJUaW1lb3V0KGdfcmVzaXplTW9iaWxlSGFuZGxlcklkKTtcbiAgICAgIHdpbmRvd1JlbW92ZUV2ZW50KCdyZXNpemUnLCByZXNpemVIYW5kbGVyKTtcbiAgICB9XG4gICAgLypcbiAgICAqIFJlc2l6ZSBldmVudCBoYW5kbGVyLlxuICAgICovXG5cblxuICAgIGZ1bmN0aW9uIHJlc2l6ZUhhbmRsZXIoKSB7XG4gICAgICBpZiAoIWdfaXNDb25zZWN1dGl2ZVJlc2l6ZSkge1xuICAgICAgICBpZiAoZ2V0T3B0aW9ucygpLmF1dG9TY3JvbGxpbmcgJiYgIWdldE9wdGlvbnMoKS5zY3JvbGxCYXIgfHwgIWdldE9wdGlvbnMoKS5maXRUb1NlY3Rpb24pIHtcbiAgICAgICAgICBzZXRTZWN0aW9uc0hlaWdodChnZXRXaW5kb3dIZWlnaHQoKSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZml0VG9BY3RpdmVTZWN0aW9uKCk7XG4gICAgICBnX2lzQ29uc2VjdXRpdmVSZXNpemUgPSB0cnVlOyAvL2luIG9yZGVyIHRvIGNhbGwgdGhlIGZ1bmN0aW9ucyBvbmx5IHdoZW4gdGhlIHJlc2l6ZSBpcyBmaW5pc2hlZFxuICAgICAgLy9odHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQyOTg2MTIvanF1ZXJ5LWhvdy10by1jYWxsLXJlc2l6ZS1ldmVudC1vbmx5LW9uY2UtaXRzLWZpbmlzaGVkLXJlc2l6aW5nICAgIFxuXG4gICAgICBjbGVhclRpbWVvdXQoZ19yZXNpemVJZCk7XG4gICAgICBnX3Jlc2l6ZUlkID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vaXNzdWUgIzMzMzYgXG4gICAgICAgIC8vKHNvbWUgYXBwcyBvciBicm93c2VycywgbGlrZSBDaHJvbWUvRmlyZWZveCBmb3IgTW9iaWxlIHRha2UgdGltZSB0byByZXBvcnQgdGhlIHJlYWwgaGVpZ2h0KVxuICAgICAgICAvL3NvIHdlIGNoZWNrIGl0IDMgdGltZXMgd2l0aCBpbnRlcnZhbHMgaW4gdGhhdCBjYXNlXG4gICAgICAgIC8vIGZvcih2YXIgaSA9IDA7IGk8IDQ7IGkrKyl7XG4gICAgICAgIHJlc2l6ZUFjdGlvbnMoKTtcbiAgICAgICAgZ19pc0NvbnNlY3V0aXZlUmVzaXplID0gZmFsc2U7IC8vIH1cbiAgICAgIH0sIDQwMCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZml0VG9BY3RpdmVTZWN0aW9uKCkge1xuICAgICAgaWYgKGlzVG91Y2hEZXZpY2UpIHtcbiAgICAgICAgLy8gSXNzdWUgIzQzOTMgYW5kIHByZXZpb3VzbHkgaW4gdjMsICMzMzM2XG4gICAgICAgIC8vIChzb21lIGFwcHMgb3IgYnJvd3NlcnMsIGxpa2UgQ2hyb21lL0ZpcmVmb3ggd2lsbCBkZWxheSBhIGJpdCB0byBzY3JvbGwgXG4gICAgICAgIC8vIHRvIHRoZSBmb2N1c2VkIGlucHV0XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgICAgZ19yZXNpemVNb2JpbGVIYW5kbGVySWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAvLyBvbiBBbmRyb2lkIGRldmljZXMgdGhlIGJyb3dzZXIgc2Nyb2xscyB0byB0aGUgZm9jdXNlZCBlbGVtZW50XG4gICAgICAgICAgICAgIC8vIG1lc3NpbmcgdXAgdGhlIHdob2xlIHBhZ2Ugc3RydWN0dXJlLiBTbyB3ZSBuZWVkIHRvIHVwZGF0ZSB0aGVcbiAgICAgICAgICAgICAgLy8gdHJhbnNsYXRlM2QgdmFsdWUgd2hlbiB0aGUga2V5Ym9hcmQgc2hvd3MvaGlkZXNcbiAgICAgICAgICAgICAgaWYgKGdldE9wdGlvbnMoKS5hdXRvU2Nyb2xsaW5nICYmICFnZXRPcHRpb25zKCkuc2Nyb2xsQmFyKSB7XG4gICAgICAgICAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgaXNSZXNpemluZzogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHNpbGVudE1vdmVUbyhzdGF0ZS5hY3RpdmVTZWN0aW9uLmluZGV4KCkgKyAxKTtcbiAgICAgICAgICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICBpc1Jlc2l6aW5nOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LCAyMDAgKiBpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAqIFdoZW4gcmVzaXppbmcgdGhlIHNpdGUsIHdlIGFkanVzdCB0aGUgaGVpZ2h0cyBvZiB0aGUgc2VjdGlvbnMsIHNsaW1TY3JvbGwuLi5cbiAgICAqL1xuXG5cbiAgICBmdW5jdGlvbiByZXNpemVBY3Rpb25zKCkge1xuICAgICAgc2V0U3RhdGUoe1xuICAgICAgICBpc1Jlc2l6aW5nOiB0cnVlXG4gICAgICB9KTtcbiAgICAgIHNldFNlY3Rpb25zSGVpZ2h0KCcnKTtcblxuICAgICAgaWYgKCFnZXRPcHRpb25zKCkuYXV0b1Njcm9sbGluZyAmJiAhc3RhdGUuaXNCZXlvbmRGdWxscGFnZSkge1xuICAgICAgICBzZXRWaFVuaXRzKCk7XG4gICAgICB9XG5cbiAgICAgIEV2ZW50RW1pdHRlci5lbWl0KGV2ZW50cy5jb250ZW50Q2hhbmdlZCk7XG4gICAgICB1cGRhdGVTdGF0ZSgpOyAvL2NoZWNraW5nIGlmIGl0IG5lZWRzIHRvIGdldCByZXNwb25zaXZlXG5cbiAgICAgIHJlc3BvbnNpdmUoKTsgLy8gcmVidWlsZCBpbW1lZGlhdGVseSBvbiB0b3VjaCBkZXZpY2VzXG5cbiAgICAgIGlmIChpc1RvdWNoRGV2aWNlKSB7XG4gICAgICAgIHZhciBhY3RpdmVFbGVtZW50ID0gZG9jLmFjdGl2ZUVsZW1lbnQ7IC8vaWYgdGhlIGtleWJvYXJkIGlzIE5PVCB2aXNpYmxlXG5cbiAgICAgICAgaWYgKCFtYXRjaGVzKGFjdGl2ZUVsZW1lbnQsICd0ZXh0YXJlYScpICYmICFtYXRjaGVzKGFjdGl2ZUVsZW1lbnQsICdpbnB1dCcpICYmICFtYXRjaGVzKGFjdGl2ZUVsZW1lbnQsICdzZWxlY3QnKSkge1xuICAgICAgICAgIHZhciBjdXJyZW50SGVpZ2h0ID0gZ2V0V2luZG93SGVpZ2h0KCk7IC8vbWFraW5nIHN1cmUgdGhlIGNoYW5nZSBpbiB0aGUgdmlld3BvcnQgc2l6ZSBpcyBlbm91Z2ggdG8gZm9yY2UgYSByZWJ1aWxkLiAoMjAgJSBvZiB0aGUgd2luZG93IHRvIGF2b2lkIHByb2JsZW1zIHdoZW4gaGlkZGluZyBzY3JvbGwgYmFycylcblxuICAgICAgICAgIGlmIChNYXRoLmFicyhjdXJyZW50SGVpZ2h0IC0gcHJldmlvdXNIZWlnaHQpID4gMjAgKiBNYXRoLm1heChwcmV2aW91c0hlaWdodCwgY3VycmVudEhlaWdodCkgLyAxMDApIHtcbiAgICAgICAgICAgIHJlQnVpbGQodHJ1ZSk7XG4gICAgICAgICAgICBwcmV2aW91c0hlaWdodCA9IGN1cnJlbnRIZWlnaHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhZGp1c3RUb05ld1ZpZXdwb3J0KCk7XG4gICAgICB9XG5cbiAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgaXNSZXNpemluZzogZmFsc2VcbiAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBXaGVuIHJlc2l6aW5nIGlzIGZpbmlzaGVkLCB3ZSBhZGp1c3QgdGhlIHNsaWRlcyBzaXplcyBhbmQgcG9zaXRpb25zXG4gICAgICovXG5cblxuICAgIGZ1bmN0aW9uIHJlQnVpbGQocmVzaXppbmcpIHtcbiAgICAgIGlmIChoYXNDbGFzcyhnZXRDb250YWluZXIoKSwgREVTVFJPWUVEKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IC8vbm90aGluZyB0byBkbyBpZiB0aGUgcGx1Z2luIHdhcyBkZXN0cm95ZWRcbiAgICAgIC8vdXBkYXRpbmcgZ2xvYmFsIHZhcnNcblxuXG4gICAgICBzZXRTdGF0ZSh7XG4gICAgICAgIGlzUmVzaXppbmc6IHRydWUsXG4gICAgICAgIHdpbmRvd3NIZWlnaHQ6IGdldFdpbmRvd0hlaWdodCgpLFxuICAgICAgICB3aW5kb3dzV2lkdGg6IGdldFdpbmRvd1dpZHRoKClcbiAgICAgIH0pO1xuICAgICAgdmFyIHNlY3Rpb25zID0gZ2V0U3RhdGUoKS5zZWN0aW9ucztcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWN0aW9ucy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgc2VjdGlvbiA9IHNlY3Rpb25zW2ldO1xuICAgICAgICB2YXIgc2xpZGVzV3JhcCA9ICQoU0xJREVTX1dSQVBQRVJfU0VMLCBzZWN0aW9uLml0ZW0pWzBdO1xuICAgICAgICB2YXIgc2xpZGVzID0gc2VjdGlvbi5zbGlkZXM7IC8vYWRqdXN0aW5nIHRoZSBwb3NpdGlvbiBmbyB0aGUgRlVMTCBXSURUSCBzbGlkZXMuLi5cblxuICAgICAgICBpZiAoc2xpZGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICBsYW5kc2NhcGVTY3JvbGwoc2xpZGVzV3JhcCwgc2VjdGlvbi5hY3RpdmVTbGlkZS5pdGVtKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZ2V0T3B0aW9ucygpLnNjcm9sbE92ZXJmbG93KSB7XG4gICAgICAgIHNjcm9sbE92ZXJmbG93SGFuZGxlci5tYWtlU2Nyb2xsYWJsZSgpO1xuICAgICAgfVxuXG4gICAgICB2YXIgc2VjdGlvbkluZGV4ID0gZ2V0U3RhdGUoKS5hY3RpdmVTZWN0aW9uLmluZGV4KCk7XG5cbiAgICAgIGlmICghc3RhdGUuaXNCZXlvbmRGdWxscGFnZSkge1xuICAgICAgICAvL2lzbid0IGl0IHRoZSBmaXJzdCBzZWN0aW9uP1xuICAgICAgICBpZiAoc2VjdGlvbkluZGV4KSB7XG4gICAgICAgICAgLy9hZGp1c3RpbmcgdGhlIHBvc2l0aW9uIGZvciB0aGUgY3VycmVudCBzZWN0aW9uXG4gICAgICAgICAgc2lsZW50TW92ZVRvKHNlY3Rpb25JbmRleCArIDEpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgaXNSZXNpemluZzogZmFsc2VcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoaXNGdW5jdGlvbihnZXRPcHRpb25zKCkuYWZ0ZXJSZXNpemUpICYmIHJlc2l6aW5nKSB7XG4gICAgICAgIGdldE9wdGlvbnMoKS5hZnRlclJlc2l6ZS5jYWxsKGdldENvbnRhaW5lcigpLCB3aW4uaW5uZXJXaWR0aCwgd2luLmlubmVySGVpZ2h0KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzRnVuY3Rpb24oZ2V0T3B0aW9ucygpLmFmdGVyUmVCdWlsZCkgJiYgIXJlc2l6aW5nKSB7XG4gICAgICAgIGdldE9wdGlvbnMoKS5hZnRlclJlQnVpbGQuY2FsbChnZXRDb250YWluZXIoKSk7XG4gICAgICB9XG5cbiAgICAgIHRyaWdnZXIoZ2V0Q29udGFpbmVyKCksICdhZnRlclJlYnVpbGQnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBBZGp1c3RzIGEgc2VjdGlvbiB0byB0aGUgdmlld3BvcnQgaWYgaXQgaGFzIGNoYW5nZWQuXG4gICAgKi9cblxuXG4gICAgZnVuY3Rpb24gYWRqdXN0VG9OZXdWaWV3cG9ydCgpIHtcbiAgICAgIHZhciBuZXdXaW5kb3dIZWlnaHQgPSBnZXRXaW5kb3dIZWlnaHQoKTtcbiAgICAgIHZhciBuZXdXaW5kb3dXaWR0aCA9IGdldFdpbmRvd1dpZHRoKCk7XG5cbiAgICAgIGlmIChzdGF0ZS53aW5kb3dzSGVpZ2h0ICE9PSBuZXdXaW5kb3dIZWlnaHQgfHwgd2luZG93c1dpZHRoICE9PSBuZXdXaW5kb3dXaWR0aCkge1xuICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgd2luZG93c0hlaWdodDogbmV3V2luZG93SGVpZ2h0XG4gICAgICAgIH0pO1xuICAgICAgICB3aW5kb3dzV2lkdGggPSBuZXdXaW5kb3dXaWR0aDtcbiAgICAgICAgcmVCdWlsZCh0cnVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRTZWN0aW9uc0hlaWdodCh2YWx1ZSkge1xuICAgICAgdmFyIHByb3BlcnR5VmFsdWUgPSB2YWx1ZSA9PT0gJycgPyAnJyA6IHZhbHVlICsgJ3B4JztcbiAgICAgIGdldFN0YXRlKCkuc2VjdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoc2VjdGlvbikge1xuICAgICAgICBjc3Moc2VjdGlvbi5pdGVtLCB7XG4gICAgICAgICAgJ2hlaWdodCc6IHByb3BlcnR5VmFsdWVcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVmaW5pbmcgdGhlIHZhbHVlIGluIHB4IG9mIGEgVkggdW5pdC4gKFVzZWQgZm9yIGF1dG9TY3JvbGxpbmc6IGZhbHNlKVxuICAgICAqIFRvIGZpeCB0aGUgaGVpZ2h0IGlzc3VlIG9uIG1vYmlsZSBkZXZpY2VzIHdoZW4gdXNpbmcgVkggdW5pdHMuXG4gICAgICogaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS90aGUtdHJpY2stdG8tdmlld3BvcnQtdW5pdHMtb24tbW9iaWxlL1xuICAgICAqL1xuXG5cbiAgICBmdW5jdGlvbiBzZXRWaFVuaXRzKCkge1xuICAgICAgaWYgKCFnZXRPcHRpb25zKCkuYXV0b1Njcm9sbGluZyB8fCBnZXRPcHRpb25zKCkuc2Nyb2xsQmFyKSB7XG4gICAgICAgIC8vIEZpcnN0IHdlIGdldCB0aGUgdmlld3BvcnQgaGVpZ2h0IGFuZCB3ZSBtdWx0aXBsZSBpdCBieSAxJSB0byBnZXQgYSB2YWx1ZSBmb3IgYSB2aCB1bml0XG4gICAgICAgIHZhciB2aCA9IHdpbi5pbm5lckhlaWdodCAqIDAuMDE7IC8vIFRoZW4gd2Ugc2V0IHRoZSB2YWx1ZSBpbiB0aGUgLS12aCBjdXN0b20gcHJvcGVydHkgdG8gdGhlIHJvb3Qgb2YgdGhlIGRvY3VtZW50XG5cbiAgICAgICAgZG9jLmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS12aCcsIFwiXCIuY29uY2F0KHZoLCBcInB4XCIpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRBbmNob3JzVVJMKCkge1xuICAgICAgdmFyIHNlY3Rpb247XG4gICAgICB2YXIgc2xpZGU7XG4gICAgICB2YXIgaGFzaCA9IHdpbi5sb2NhdGlvbi5oYXNoO1xuXG4gICAgICBpZiAoaGFzaC5sZW5ndGgpIHtcbiAgICAgICAgLy9nZXR0aW5nIHRoZSBhbmNob3IgbGluayBpbiB0aGUgVVJMIGFuZCBkZWxldGluZyB0aGUgYCNgXG4gICAgICAgIHZhciBhbmNob3JzUGFydHMgPSBoYXNoLnJlcGxhY2UoJyMnLCAnJykuc3BsaXQoJy8nKTsgLy91c2luZyAvIGZvciB2aXN1YWwgcmVhc29ucyBhbmQgbm90IGFzIGEgc2VjdGlvbi9zbGlkZSBzZXBhcmF0b3IgIzI4MDNcblxuICAgICAgICB2YXIgaXNGdW5reUFuY2hvciA9IGhhc2guaW5kZXhPZignIy8nKSA+IC0xO1xuICAgICAgICBzZWN0aW9uID0gaXNGdW5reUFuY2hvciA/ICcvJyArIGFuY2hvcnNQYXJ0c1sxXSA6IGRlY29kZVVSSUNvbXBvbmVudChhbmNob3JzUGFydHNbMF0pO1xuICAgICAgICB2YXIgc2xpZGVBbmNob3IgPSBpc0Z1bmt5QW5jaG9yID8gYW5jaG9yc1BhcnRzWzJdIDogYW5jaG9yc1BhcnRzWzFdO1xuXG4gICAgICAgIGlmIChzbGlkZUFuY2hvciAmJiBzbGlkZUFuY2hvci5sZW5ndGgpIHtcbiAgICAgICAgICBzbGlkZSA9IGRlY29kZVVSSUNvbXBvbmVudChzbGlkZUFuY2hvcik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc2VjdGlvbjogc2VjdGlvbixcbiAgICAgICAgc2xpZGU6IHNsaWRlXG4gICAgICB9O1xuICAgIH1cblxuICAgIEZQLnNldExvY2tBbmNob3JzID0gc2V0TG9ja0FuY2hvcnM7XG4gICAgRXZlbnRFbWl0dGVyLm9uKGV2ZW50cy5iaW5kRXZlbnRzLCBiaW5kRXZlbnRzJDUpO1xuXG4gICAgZnVuY3Rpb24gYmluZEV2ZW50cyQ1KCkge1xuICAgICAgLy9kZXRlY3RpbmcgYW55IGNoYW5nZSBvbiB0aGUgVVJMIHRvIHNjcm9sbCB0byB0aGUgZ2l2ZW4gYW5jaG9yIGxpbmtcbiAgICAgIC8vKGEgd2F5IHRvIGRldGVjdCBiYWNrIGhpc3RvcnkgYnV0dG9uIGFzIHdlIHBsYXkgd2l0aCB0aGUgaGFzaGVzIG9uIHRoZSBVUkwpXG4gICAgICB3aW5kb3dBZGRFdmVudCgnaGFzaGNoYW5nZScsIGhhc2hDaGFuZ2VIYW5kbGVyKTtcbiAgICAgIEV2ZW50RW1pdHRlci5vbihldmVudHMub25EZXN0cm95LCBvbkRlc3Ryb3kkMik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25EZXN0cm95JDIoKSB7XG4gICAgICB3aW5kb3dSZW1vdmVFdmVudCgnaGFzaGNoYW5nZScsIGhhc2hDaGFuZ2VIYW5kbGVyKTtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBTZXRzIGxvY2tBbmNob3JzXG4gICAgKi9cblxuXG4gICAgZnVuY3Rpb24gc2V0TG9ja0FuY2hvcnModmFsdWUpIHtcbiAgICAgIGdldE9wdGlvbnMoKS5sb2NrQW5jaG9ycyA9IHZhbHVlO1xuICAgIH1cbiAgICAvKipcbiAgICAqIERldGVjdGluZyBhbnkgY2hhbmdlIG9uIHRoZSBVUkwgdG8gc2Nyb2xsIHRvIHRoZSBnaXZlbiBhbmNob3IgbGlua1xuICAgICogKGEgd2F5IHRvIGRldGVjdCBiYWNrIGhpc3RvcnkgYnV0dG9uIGFzIHdlIHBsYXkgd2l0aCB0aGUgaGFzaGVzIG9uIHRoZSBVUkwpXG4gICAgKi9cblxuXG4gICAgZnVuY3Rpb24gaGFzaENoYW5nZUhhbmRsZXIoKSB7XG4gICAgICBpZiAoIXN0YXRlLmlzU2Nyb2xsaW5nICYmICFnZXRPcHRpb25zKCkubG9ja0FuY2hvcnMpIHtcbiAgICAgICAgdmFyIGFuY2hvcnMgPSBnZXRBbmNob3JzVVJMKCk7XG4gICAgICAgIHZhciBzZWN0aW9uQW5jaG9yID0gYW5jaG9ycy5zZWN0aW9uO1xuICAgICAgICB2YXIgc2xpZGVBbmNob3IgPSBhbmNob3JzLnNsaWRlOyAvL3doZW4gbW92aW5nIHRvIGEgc2xpZGUgaW4gdGhlIGZpcnN0IHNlY3Rpb24gZm9yIHRoZSBmaXJzdCB0aW1lIChmaXJzdCB0aW1lIHRvIGFkZCBhbiBhbmNob3IgdG8gdGhlIFVSTClcblxuICAgICAgICB2YXIgaXNGaXJzdFNsaWRlTW92ZSA9IHR5cGVvZiBzdGF0ZS5sYXN0U2Nyb2xsZWREZXN0aW55ID09PSAndW5kZWZpbmVkJztcbiAgICAgICAgdmFyIGlzRmlyc3RTY3JvbGxNb3ZlID0gdHlwZW9mIHN0YXRlLmxhc3RTY3JvbGxlZERlc3RpbnkgPT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBzbGlkZUFuY2hvciA9PT0gJ3VuZGVmaW5lZCcgJiYgIXN0YXRlLnNsaWRlTW92aW5nO1xuXG4gICAgICAgIGlmIChzZWN0aW9uQW5jaG9yICYmIHNlY3Rpb25BbmNob3IubGVuZ3RoKSB7XG4gICAgICAgICAgLyppbiBvcmRlciB0byBjYWxsIHNjcm9sbHBhZ2UoKSBvbmx5IG9uY2UgZm9yIGVhY2ggZGVzdGluYXRpb24gYXQgYSB0aW1lXG4gICAgICAgICAgSXQgaXMgY2FsbGVkIHR3aWNlIGZvciBlYWNoIHNjcm9sbCBvdGhlcndpc2UsIGFzIGluIGNhc2Ugb2YgdXNpbmcgYW5jaG9ybGlua3MgYGhhc2hDaGFuZ2VgXG4gICAgICAgICAgZXZlbnQgaXMgZmlyZWQgb24gZXZlcnkgc2Nyb2xsIHRvby4qL1xuICAgICAgICAgIGlmIChzZWN0aW9uQW5jaG9yICYmIHNlY3Rpb25BbmNob3IgIT09IHN0YXRlLmxhc3RTY3JvbGxlZERlc3RpbnkgJiYgIWlzRmlyc3RTbGlkZU1vdmUgfHwgaXNGaXJzdFNjcm9sbE1vdmUgfHwgIXN0YXRlLnNsaWRlTW92aW5nICYmIHN0YXRlLmxhc3RTY3JvbGxlZFNsaWRlICE9IHNsaWRlQW5jaG9yKSB7XG4gICAgICAgICAgICBFdmVudEVtaXR0ZXIuZW1pdChldmVudHMub25TY3JvbGxQYWdlQW5kU2xpZGUsIHtcbiAgICAgICAgICAgICAgc2VjdGlvbkFuY2hvcjogc2VjdGlvbkFuY2hvcixcbiAgICAgICAgICAgICAgc2xpZGVBbmNob3I6IHNsaWRlQW5jaG9yXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBFdmVudEVtaXR0ZXIub24oZXZlbnRzLmJpbmRFdmVudHMsIGJpbmRFdmVudHMkNCk7XG5cbiAgICBmdW5jdGlvbiBiaW5kRXZlbnRzJDQoKSB7XG4gICAgICBkb2NBZGRFdmVudCgnd2hlZWwnLCB3aGVlbERhdGFIYW5kbGVyLnJlZ2lzdGVyRXZlbnQsIGdldFBhc3NpdmVPcHRpb25zSWZQb3NzaWJsZSgpKTtcbiAgICAgIEV2ZW50RW1pdHRlci5vbihldmVudHMuc2Nyb2xsQmV5b25kRnVsbHBhZ2UsIHNjcm9sbEJleW9uZEZ1bGxQYWdlKTtcbiAgICAgIEV2ZW50RW1pdHRlci5vbihldmVudHMub25LZXlEb3duLCBvbktleURvd24pO1xuICAgIH1cblxuICAgIEV2ZW50RW1pdHRlci5vbihldmVudHMuYmluZEV2ZW50cywgYmluZEV2ZW50cyQzKTtcblxuICAgIGZ1bmN0aW9uIGJpbmRFdmVudHMkMygpIHtcbiAgICAgIEV2ZW50RW1pdHRlci5vbihldmVudHMub25DbGlja09yVG91Y2gsIG9uQ2xpY2tPclRvdWNoJDEpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQ2xpY2tPclRvdWNoJDEocGFyYW1zKSB7XG4gICAgICB2YXIgdGFyZ2V0ID0gcGFyYW1zLnRhcmdldDtcblxuICAgICAgaWYgKGNsb3Nlc3QodGFyZ2V0LCBnZXRPcHRpb25zKCkubWVudSArICcgW2RhdGEtbWVudWFuY2hvcl0nKSkge1xuICAgICAgICBtZW51SXRlbXNIYW5kbGVyLmNhbGwodGFyZ2V0LCBwYXJhbXMpO1xuICAgICAgfVxuICAgIH0gLy9NZW51IGl0ZW0gaGFuZGxlciB3aGVuIG5vdCB1c2luZyBhbmNob3JzIG9yIHVzaW5nIGxvY2tBbmNob3JzOnRydWVcblxuXG4gICAgZnVuY3Rpb24gbWVudUl0ZW1zSGFuZGxlcihlKSB7XG4gICAgICBzZXRTdGF0ZSh7XG4gICAgICAgIHNjcm9sbFRyaWdnZXI6ICdtZW51J1xuICAgICAgfSk7XG5cbiAgICAgIGlmICgkKGdldE9wdGlvbnMoKS5tZW51KVswXSAmJiAoZ2V0T3B0aW9ucygpLmxvY2tBbmNob3JzIHx8ICFnZXRPcHRpb25zKCkuYW5jaG9ycy5sZW5ndGgpKSB7XG4gICAgICAgIHByZXZlbnREZWZhdWx0KGUpO1xuICAgICAgICAvKmpzaGludCB2YWxpZHRoaXM6dHJ1ZSAqL1xuXG4gICAgICAgIEV2ZW50RW1pdHRlci5lbWl0KGV2ZW50cy5vbk1lbnVDbGljaywge1xuICAgICAgICAgIGFuY2hvcjogZ2V0QXR0cih0aGlzLCAnZGF0YS1tZW51YW5jaG9yJylcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgRXZlbnRFbWl0dGVyLm9uKGV2ZW50cy5iaW5kRXZlbnRzLCBiaW5kRXZlbnRzJDIpO1xuXG4gICAgZnVuY3Rpb24gYmluZEV2ZW50cyQyKCkge1xuICAgICAgRXZlbnRFbWl0dGVyLm9uKGV2ZW50cy5vbkNsaWNrT3JUb3VjaCwgb25DbGlja09yVG91Y2gpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQ2xpY2tPclRvdWNoKHBhcmFtcykge1xuICAgICAgdmFyIHRhcmdldCA9IHBhcmFtcy50YXJnZXQ7XG5cbiAgICAgIGlmICh0YXJnZXQgJiYgY2xvc2VzdCh0YXJnZXQsIFNFQ1RJT05fTkFWX1NFTCArICcgYScpKSB7XG4gICAgICAgIHNlY3Rpb25CdWxsZXRIYW5kbGVyLmNhbGwodGFyZ2V0LCBwYXJhbXMuZSk7XG4gICAgICB9IGVsc2UgaWYgKG1hdGNoZXModGFyZ2V0LCBTRUNUSU9OX05BVl9UT09MVElQX1NFTCkpIHtcbiAgICAgICAgdG9vbHRpcFRleHRIYW5kbGVyLmNhbGwodGFyZ2V0KTtcbiAgICAgIH0gZWxzZSBpZiAobWF0Y2hlcyh0YXJnZXQsIFNMSURFU19OQVZfTElOS19TRUwpIHx8IGNsb3Nlc3QodGFyZ2V0LCBTTElERVNfTkFWX0xJTktfU0VMKSAhPSBudWxsKSB7XG4gICAgICAgIHNsaWRlQnVsbGV0SGFuZGxlci5jYWxsKHRhcmdldCwgcGFyYW1zLmUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBsYXN0U2Nyb2xsID0gMDtcbiAgICB2YXIgZ19zY3JvbGxJZDtcbiAgICB2YXIgZ19zY3JvbGxJZDI7XG4gICAgRXZlbnRFbWl0dGVyLm9uKGV2ZW50cy5vbkRlc3Ryb3ksIG9uRGVzdHJveSQxKTsgLy93aGVuIHNjcm9sbGluZy4uLlxuXG4gICAgZnVuY3Rpb24gc2Nyb2xsSGFuZGxlcihlKSB7XG4gICAgICB2YXIgY3VycmVudFNlY3Rpb247XG4gICAgICB2YXIgY3VycmVudFNlY3Rpb25FbGVtO1xuXG4gICAgICBpZiAoc3RhdGUuaXNSZXNpemluZyB8fCAhZ2V0U3RhdGUoKS5hY3RpdmVTZWN0aW9uKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZ2V0TGFzdChnZXRTdGF0ZSgpLnNlY3Rpb25zKTtcblxuICAgICAgaWYgKGdldFN0YXRlKCkuaXNCZXlvbmRGdWxscGFnZSB8fCBnZXRTdGF0ZSgpLmlzQWJvdXRUb1Njcm9sbFRvRnVsbFBhZ2UpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWdldE9wdGlvbnMoKS5hdXRvU2Nyb2xsaW5nIHx8IGdldE9wdGlvbnMoKS5zY3JvbGxCYXIpIHtcbiAgICAgICAgdmFyIGN1cnJlbnRTY3JvbGwgPSBnZXRTY3JvbGxUb3AoKTtcbiAgICAgICAgdmFyIHNjcm9sbERpcmVjdGlvbiA9IGdldFNjcm9sbERpcmVjdGlvbihjdXJyZW50U2Nyb2xsKTtcbiAgICAgICAgdmFyIHZpc2libGVTZWN0aW9uSW5kZXggPSAwO1xuICAgICAgICB2YXIgc2NyZWVuX21pZCA9IGN1cnJlbnRTY3JvbGwgKyBnZXRXaW5kb3dIZWlnaHQoKSAvIDIuMDtcbiAgICAgICAgdmFyIGlzQXRCb3R0b20gPSAkYm9keS5zY3JvbGxIZWlnaHQgLSBnZXRXaW5kb3dIZWlnaHQoKSA9PT0gY3VycmVudFNjcm9sbDtcbiAgICAgICAgdmFyIHNlY3Rpb25zID0gZ2V0U3RhdGUoKS5zZWN0aW9ucztcbiAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgIHNjcm9sbFk6IGN1cnJlbnRTY3JvbGxcbiAgICAgICAgfSk7IC8vd2hlbiB1c2luZyBgYXV0by1oZWlnaHRgIGZvciBhIHNtYWxsIGxhc3Qgc2VjdGlvbiBpdCB3b24ndCBiZSBjZW50ZXJlZCBpbiB0aGUgdmlld3BvcnRcblxuICAgICAgICBpZiAoaXNBdEJvdHRvbSkge1xuICAgICAgICAgIHZpc2libGVTZWN0aW9uSW5kZXggPSBzZWN0aW9ucy5sZW5ndGggLSAxO1xuICAgICAgICB9IC8vaXMgYXQgdG9wPyB3aGVuIHVzaW5nIGBhdXRvLWhlaWdodGAgZm9yIGEgc21hbGwgZmlyc3Qgc2VjdGlvbiBpdCB3b24ndCBiZSBjZW50ZXJlZCBpbiB0aGUgdmlld3BvcnRcbiAgICAgICAgZWxzZSBpZiAoIWN1cnJlbnRTY3JvbGwpIHtcbiAgICAgICAgICB2aXNpYmxlU2VjdGlvbkluZGV4ID0gMDtcbiAgICAgICAgfSAvL3Rha2luZyB0aGUgc2VjdGlvbiB3aGljaCBpcyBzaG93aW5nIG1vcmUgY29udGVudCBpbiB0aGUgdmlld3BvcnRcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWN0aW9ucy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgdmFyIHNlY3Rpb24gPSBzZWN0aW9uc1tpXS5pdGVtOyAvLyBQaWNrIHRoZSB0aGUgbGFzdCBzZWN0aW9uIHdoaWNoIHBhc3NlcyB0aGUgbWlkZGxlIGxpbmUgb2YgdGhlIHNjcmVlbi5cblxuICAgICAgICAgICAgaWYgKHNlY3Rpb24ub2Zmc2V0VG9wIDw9IHNjcmVlbl9taWQpIHtcbiAgICAgICAgICAgICAgdmlzaWJsZVNlY3Rpb25JbmRleCA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzQ29tcGxldGVseUluVmlld1BvcnQoc2Nyb2xsRGlyZWN0aW9uKSkge1xuICAgICAgICAgIGlmICghaGFzQ2xhc3MoZ2V0U3RhdGUoKS5hY3RpdmVTZWN0aW9uLml0ZW0sIENPTVBMRVRFTFkpKSB7XG4gICAgICAgICAgICBhZGRDbGFzcyhnZXRTdGF0ZSgpLmFjdGl2ZVNlY3Rpb24uaXRlbSwgQ09NUExFVEVMWSk7XG4gICAgICAgICAgICByZW1vdmVDbGFzcyhzaWJsaW5ncyhnZXRTdGF0ZSgpLmFjdGl2ZVNlY3Rpb24uaXRlbSksIENPTVBMRVRFTFkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSAvL2dldGluZyB0aGUgbGFzdCBvbmUsIHRoZSBjdXJyZW50IG9uZSBvbiB0aGUgc2NyZWVuXG5cblxuICAgICAgICBjdXJyZW50U2VjdGlvbiA9IHNlY3Rpb25zW3Zpc2libGVTZWN0aW9uSW5kZXhdO1xuICAgICAgICBjdXJyZW50U2VjdGlvbkVsZW0gPSBjdXJyZW50U2VjdGlvbi5pdGVtOyAvL3NldHRpbmcgdGhlIHZpc2libGUgc2VjdGlvbiBhcyBhY3RpdmUgd2hlbiBtYW51YWxseSBzY3JvbGxpbmdcbiAgICAgICAgLy9leGVjdXRpbmcgb25seSBvbmNlIHRoZSBmaXJzdCB0aW1lIHdlIHJlYWNoIHRoZSBzZWN0aW9uXG5cbiAgICAgICAgaWYgKCFjdXJyZW50U2VjdGlvbi5pc0FjdGl2ZSkge1xuICAgICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICAgIGlzU2Nyb2xsaW5nOiB0cnVlXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdmFyIGxlYXZpbmdTZWN0aW9uID0gZ2V0U3RhdGUoKS5hY3RpdmVTZWN0aW9uLml0ZW07XG4gICAgICAgICAgdmFyIGxlYXZpbmdTZWN0aW9uSW5kZXggPSBnZXRTdGF0ZSgpLmFjdGl2ZVNlY3Rpb24uaW5kZXgoKSArIDE7XG4gICAgICAgICAgdmFyIHlNb3ZlbWVudCA9IGdldFltb3ZlbWVudChnZXRTdGF0ZSgpLmFjdGl2ZVNlY3Rpb24sIGN1cnJlbnRTZWN0aW9uRWxlbSk7XG4gICAgICAgICAgdmFyIGFuY2hvckxpbmsgPSBjdXJyZW50U2VjdGlvbi5hbmNob3I7XG4gICAgICAgICAgdmFyIHNlY3Rpb25JbmRleCA9IGN1cnJlbnRTZWN0aW9uLmluZGV4KCkgKyAxO1xuICAgICAgICAgIHZhciBhY3RpdmVTbGlkZSA9IGN1cnJlbnRTZWN0aW9uLmFjdGl2ZVNsaWRlO1xuICAgICAgICAgIHZhciBzbGlkZUluZGV4O1xuICAgICAgICAgIHZhciBzbGlkZUFuY2hvckxpbms7XG4gICAgICAgICAgdmFyIGNhbGxiYWNrc1BhcmFtcyA9IHtcbiAgICAgICAgICAgIGFjdGl2ZVNlY3Rpb246IGxlYXZpbmdTZWN0aW9uLFxuICAgICAgICAgICAgc2VjdGlvbkluZGV4OiBzZWN0aW9uSW5kZXggLSAxLFxuICAgICAgICAgICAgYW5jaG9yTGluazogYW5jaG9yTGluayxcbiAgICAgICAgICAgIGVsZW1lbnQ6IGN1cnJlbnRTZWN0aW9uRWxlbSxcbiAgICAgICAgICAgIGxlYXZpbmdTZWN0aW9uOiBsZWF2aW5nU2VjdGlvbkluZGV4LFxuICAgICAgICAgICAgZGlyZWN0aW9uOiB5TW92ZW1lbnQsXG4gICAgICAgICAgICBpdGVtczoge1xuICAgICAgICAgICAgICBvcmlnaW46IGdldFN0YXRlKCkuYWN0aXZlU2VjdGlvbixcbiAgICAgICAgICAgICAgZGVzdGluYXRpb246IGN1cnJlbnRTZWN0aW9uXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGlmIChhY3RpdmVTbGlkZSkge1xuICAgICAgICAgICAgc2xpZGVBbmNob3JMaW5rID0gYWN0aXZlU2xpZGUuYW5jaG9yO1xuICAgICAgICAgICAgc2xpZGVJbmRleCA9IGFjdGl2ZVNsaWRlLmluZGV4KCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHN0YXRlLmNhblNjcm9sbCkge1xuICAgICAgICAgICAgYWRkQ2xhc3MoY3VycmVudFNlY3Rpb25FbGVtLCBBQ1RJVkUpO1xuICAgICAgICAgICAgcmVtb3ZlQ2xhc3Moc2libGluZ3MoY3VycmVudFNlY3Rpb25FbGVtKSwgQUNUSVZFKTtcblxuICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24oZ2V0T3B0aW9ucygpLmJlZm9yZUxlYXZlKSkge1xuICAgICAgICAgICAgICBmaXJlQ2FsbGJhY2tPbmNlUGVyU2Nyb2xsKCdiZWZvcmVMZWF2ZScsIGNhbGxiYWNrc1BhcmFtcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKGdldE9wdGlvbnMoKS5vbkxlYXZlKSkge1xuICAgICAgICAgICAgICBmaXJlQ2FsbGJhY2soJ29uTGVhdmUnLCBjYWxsYmFja3NQYXJhbXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNGdW5jdGlvbihnZXRPcHRpb25zKCkuYWZ0ZXJMb2FkKSkge1xuICAgICAgICAgICAgICBmaXJlQ2FsbGJhY2soJ2FmdGVyTG9hZCcsIGNhbGxiYWNrc1BhcmFtcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN0b3BNZWRpYShsZWF2aW5nU2VjdGlvbik7XG4gICAgICAgICAgICBsYXp5TG9hZChjdXJyZW50U2VjdGlvbkVsZW0pO1xuICAgICAgICAgICAgcGxheU1lZGlhKGN1cnJlbnRTZWN0aW9uRWxlbSk7XG4gICAgICAgICAgICBhY3RpdmF0ZU1lbnVBbmROYXYoYW5jaG9yTGluaywgc2VjdGlvbkluZGV4IC0gMSk7XG5cbiAgICAgICAgICAgIGlmIChnZXRPcHRpb25zKCkuYW5jaG9ycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgLy9uZWVkZWQgdG8gZW50ZXIgaW4gaGFzaENoYW5nZSBldmVudCB3aGVuIHVzaW5nIHRoZSBtZW51IHdpdGggYW5jaG9yIGxpbmtzXG4gICAgICAgICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBsYXN0U2Nyb2xsZWREZXN0aW55OiBhbmNob3JMaW5rXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZXRQYWdlU3RhdHVzKHNsaWRlSW5kZXgsIHNsaWRlQW5jaG9yTGluaywgYW5jaG9yTGluayk7XG4gICAgICAgICAgICB1cGRhdGVTdGF0ZSgpO1xuICAgICAgICAgIH0gLy9zbWFsbCB0aW1lb3V0IGluIG9yZGVyIHRvIGF2b2lkIGVudGVyaW5nIGluIGhhc2hDaGFuZ2UgZXZlbnQgd2hlbiBzY3JvbGxpbmcgaXMgbm90IGZpbmlzaGVkIHlldFxuXG5cbiAgICAgICAgICBjbGVhclRpbWVvdXQoZ19zY3JvbGxJZCk7XG4gICAgICAgICAgZ19zY3JvbGxJZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgICAgICBpc1Njcm9sbGluZzogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZ2V0T3B0aW9ucygpLmZpdFRvU2VjdGlvbiAmJiBzdGF0ZS5jYW5TY3JvbGwpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQoZ19zY3JvbGxJZDIpO1xuICAgICAgICAgIGdfc2Nyb2xsSWQyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZml4ZWRTZWN0aW9ucyA9IHN0YXRlLnNlY3Rpb25zLmZpbHRlcihmdW5jdGlvbiAoc2VjdGlvbikge1xuICAgICAgICAgICAgICB2YXIgc2VjdGlvblZhbHVlcyA9IHNlY3Rpb24uaXRlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoc2VjdGlvblZhbHVlcy5ib3R0b20pID09PSBNYXRoLnJvdW5kKGdldFdpbmRvd0hlaWdodCgpKSB8fCBNYXRoLnJvdW5kKHNlY3Rpb25WYWx1ZXMudG9wKSA9PT0gMDtcbiAgICAgICAgICAgIH0pOyAvLyBObyBzZWN0aW9uIGlzIGZpdHRpbmcgdGhlIHZpZXdwb3J0PyBMZXQncyBmaXggdGhhdCFcblxuICAgICAgICAgICAgaWYgKCFmaXhlZFNlY3Rpb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgICBmaXRUb1NlY3Rpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCBnZXRPcHRpb25zKCkuZml0VG9TZWN0aW9uRGVsYXkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25EZXN0cm95JDEoKSB7XG4gICAgICBjbGVhclRpbWVvdXQoZ19zY3JvbGxJZCk7XG4gICAgICBjbGVhclRpbWVvdXQoZ19zY3JvbGxJZDIpO1xuICAgIH1cbiAgICAvKipcbiAgICAqIEdldHMgdGhlIGRpcmVjdG9uIG9mIHRoZSB0aGUgc2Nyb2xsaW5nIGZpcmVkIGJ5IHRoZSBzY3JvbGwgZXZlbnQuXG4gICAgKi9cblxuXG4gICAgZnVuY3Rpb24gZ2V0U2Nyb2xsRGlyZWN0aW9uKGN1cnJlbnRTY3JvbGwpIHtcbiAgICAgIHZhciBkaXJlY3Rpb24gPSBjdXJyZW50U2Nyb2xsID4gbGFzdFNjcm9sbCA/ICdkb3duJyA6ICd1cCc7XG4gICAgICBsYXN0U2Nyb2xsID0gY3VycmVudFNjcm9sbDsgLy9uZWVkZWQgZm9yIGF1dG8taGVpZ2h0IHNlY3Rpb25zIHRvIGRldGVybWluZSBpZiB3ZSB3YW50IHRvIHNjcm9sbCB0byB0aGUgdG9wIG9yIGJvdHRvbSBvZiB0aGUgZGVzdGluYXRpb25cblxuICAgICAgc2V0U3RhdGUoe1xuICAgICAgICBwcmV2aW91c0Rlc3RUb3A6IGN1cnJlbnRTY3JvbGxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGRpcmVjdGlvbjtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIGFjdGl2ZSBzZWN0aW9uIGhhcyBzZWVuIGluIGl0cyB3aG9sZSBvciBub3QuXG4gICAgKi9cblxuXG4gICAgZnVuY3Rpb24gaXNDb21wbGV0ZWx5SW5WaWV3UG9ydChtb3ZlbWVudCkge1xuICAgICAgdmFyIHRvcCA9IGdldFN0YXRlKCkuYWN0aXZlU2VjdGlvbi5pdGVtLm9mZnNldFRvcDtcbiAgICAgIHZhciBib3R0b20gPSB0b3AgKyBnZXRXaW5kb3dIZWlnaHQoKTtcblxuICAgICAgaWYgKG1vdmVtZW50ID09ICd1cCcpIHtcbiAgICAgICAgcmV0dXJuIGJvdHRvbSA+PSBnZXRTY3JvbGxUb3AoKSArIGdldFdpbmRvd0hlaWdodCgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdG9wIDw9IGdldFNjcm9sbFRvcCgpO1xuICAgIH1cblxuICAgIEV2ZW50RW1pdHRlci5vbihldmVudHMuYmluZEV2ZW50cywgYmluZEV2ZW50cyQxKTtcbiAgICBFdmVudEVtaXR0ZXIub24oZXZlbnRzLm9uRGVzdHJveSwgb25EZXN0cm95KTtcblxuICAgIGZ1bmN0aW9uIG9uRGVzdHJveSgpIHtcbiAgICAgIHdpbmRvd1JlbW92ZUV2ZW50KCdzY3JvbGwnLCBzY3JvbGxIYW5kbGVyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBiaW5kRXZlbnRzJDEoKSB7XG4gICAgICB3aW5kb3dBZGRFdmVudCgnc2Nyb2xsJywgc2Nyb2xsSGFuZGxlcik7XG4gICAgICBkb2MuYm9keS5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBzY3JvbGxIYW5kbGVyKTtcbiAgICAgIEV2ZW50RW1pdHRlci5vbihldmVudHMub25TY3JvbGxQYWdlQW5kU2xpZGUsIGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICAgICAgc2Nyb2xsUGFnZUFuZFNsaWRlKHBhcmFtcy5zZWN0aW9uQW5jaG9yLCBwYXJhbXMuc2xpZGVBbmNob3IpO1xuICAgICAgfSk7XG4gICAgICBFdmVudEVtaXR0ZXIub24oZXZlbnRzLm9uTWVudUNsaWNrLCBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgICAgIG1vdmVUbyQxKHBhcmFtcy5hbmNob3IsIHVuZGVmaW5lZCk7XG4gICAgICB9KTtcbiAgICAgIEV2ZW50RW1pdHRlci5vbihldmVudHMub25TY3JvbGxPdmVyZmxvd1Njcm9sbGVkLCBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgICAgIHZhciBzY3JvbGxTZWN0aW9uID0gcGFyYW1zLmRpcmVjdGlvbiA9PT0gJ2Rvd24nID8gbW92ZVNlY3Rpb25Eb3duIDogbW92ZVNlY3Rpb25VcDtcbiAgICAgICAgc2Nyb2xsU2VjdGlvbigpO1xuICAgICAgfSk7XG4gICAgICBFdmVudEVtaXR0ZXIub24oZXZlbnRzLnNjcm9sbFBhZ2UsIGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICAgICAgc2Nyb2xsUGFnZShwYXJhbXMuZGVzdGluYXRpb24pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgRlAuZ2V0QWN0aXZlU2xpZGUgPSBnZXRBY3RpdmVTbGlkZTtcblxuICAgIEZQLmdldFNjcm9sbFggPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gc3RhdGUuc2Nyb2xsWDtcbiAgICB9O1xuXG4gICAgRXZlbnRFbWl0dGVyLm9uKGV2ZW50cy5iaW5kRXZlbnRzLCBiaW5kRXZlbnRzKTtcblxuICAgIGZ1bmN0aW9uIGJpbmRFdmVudHMoKSB7XG4gICAgICBFdmVudEVtaXR0ZXIub24oZXZlbnRzLm9uRGVzdHJveSwgb25EZXN0cm95JDcpO1xuICAgICAgRXZlbnRFbWl0dGVyLm9uKGV2ZW50cy5sYW5kc2NhcGVTY3JvbGwsIGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICAgICAgbGFuZHNjYXBlU2Nyb2xsKHBhcmFtcy5zbGlkZXMsIHBhcmFtcy5kZXN0aW5hdGlvbik7XG4gICAgICB9KTtcbiAgICAgIEV2ZW50RW1pdHRlci5vbihldmVudHMubW92ZVNsaWRlUmlnaHQsIGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICAgICAgbW92ZVNsaWRlUmlnaHQocGFyYW1zLnNlY3Rpb24pO1xuICAgICAgfSk7XG4gICAgICBFdmVudEVtaXR0ZXIub24oZXZlbnRzLm1vdmVTbGlkZUxlZnQsIGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICAgICAgbW92ZVNsaWRlTGVmdChwYXJhbXMuc2VjdGlvbik7XG4gICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBHZXRzIHRoZSBhY3RpdmUgc2xpZGUuXG4gICAgKi9cblxuXG4gICAgZnVuY3Rpb24gZ2V0QWN0aXZlU2xpZGUoKSB7XG4gICAgICByZXR1cm4gbnVsbE9yU2xpZGUoZ2V0U3RhdGUoKS5hY3RpdmVTZWN0aW9uLmFjdGl2ZVNsaWRlKTtcbiAgICB9XG5cbiAgICBFdmVudEVtaXR0ZXIub24oZXZlbnRzLmJpbmRFdmVudHMsIGluaXQkMSk7XG5cbiAgICBmdW5jdGlvbiBpbml0JDEoKSB7XG4gICAgICB2YXIgcG9zaXRpb24gPSBnZXRPcHRpb25zKCkuY3JlZGl0cy5wb3NpdGlvbjtcbiAgICAgIHZhciBwb3NpdGlvblN0eWxlID0gWydsZWZ0JywgJ3JpZ2h0J10uaW5kZXhPZihwb3NpdGlvbikgPiAtMSA/IFwiXCIuY29uY2F0KHBvc2l0aW9uLCBcIjogMDtcIikgOiAnJztcbiAgICAgIHZhciB3YXRlck1hcmsgPSBcIlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiZnAtd2F0ZXJtYXJrXFxcIiBzdHlsZT1cXFwiXCIuY29uY2F0KHBvc2l0aW9uU3R5bGUsIFwiXFxcIj5cXG4gICAgICAgICAgICA8YSBocmVmPVxcXCJodHRwczovL2FsdmFyb3RyaWdvLmNvbS9mdWxsUGFnZS9cXFwiIFxcbiAgICAgICAgICAgICAgICByZWw9XFxcIm5vZm9sbG93IG5vb3BlbmVyXFxcIiBcXG4gICAgICAgICAgICAgICAgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIFxcbiAgICAgICAgICAgICAgICBzdHlsZT1cXFwidGV4dC1kZWNvcmF0aW9uOm5vbmU7IGNvbG9yOiAjMDAwO1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICBcIikuY29uY2F0KGdldE9wdGlvbnMoKS5jcmVkaXRzLmxhYmVsLCBcIlxcbiAgICAgICAgICAgIDwvYT5cXG4gICAgICAgIDwvZGl2PlxcbiAgICBcIik7XG4gICAgICB2YXIgbGFzdFNlY3Rpb24gPSBnZXRMYXN0KHN0YXRlLnNlY3Rpb25zKTtcbiAgICAgIHZhciBzaG91bGRVc2VXYXRlck1hcmsgPSAhc3RhdGUuaXNWYWxpZCB8fCBnZXRPcHRpb25zKCkuY3JlZGl0cy5lbmFibGVkO1xuXG4gICAgICBpZiAobGFzdFNlY3Rpb24gJiYgbGFzdFNlY3Rpb24uaXRlbSAmJiBzaG91bGRVc2VXYXRlck1hcmspIHtcbiAgICAgICAgbGFzdFNlY3Rpb24uaXRlbS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIHdhdGVyTWFyayk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgIWZ1bmN0aW9uICgpIHtcbiAgICAgIEV2ZW50RW1pdHRlci5vbihldmVudHMub25Jbml0aWFsaXNlLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBuLCBhLCBsO1xuICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgaXNWYWxpZDogKGdldE9wdGlvbnMoKS5saWNlbnNlS2V5LCBuID0gZ2V0T3B0aW9ucygpLmxpY2Vuc2VLZXksIGEgPSBmdW5jdGlvbiAobikge1xuICAgICAgICAgICAgdmFyIGUgPSBwYXJzZUludChcIlxceDM1XFx4MzFcXHgzNFwiKS50b1N0cmluZygxNik7XG4gICAgICAgICAgICBpZiAoIW4gfHwgbi5sZW5ndGggPCAyOSB8fCA0ID09PSBuLnNwbGl0KHRbMF0pLmxlbmd0aCkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB2YXIgaSA9IFtcIlxceDQ1XFx4NjFcXHg2M1xceDY4XCIsIFwiXFx4NjZcXHg2ZlxceDcyXCJdW3IoKV0oKS5qb2luKFwiXCIpLFxuICAgICAgICAgICAgICAgIGEgPSBuW1tcIlxceDczXFx4NzBcXHg2Y1xceDY5XFx4NzRcIl1dKFwiLVwiKSxcbiAgICAgICAgICAgICAgICBsID0gW107XG4gICAgICAgICAgICBhW2ldKGZ1bmN0aW9uICh0LCBuKSB7XG4gICAgICAgICAgICAgIGlmIChuIDwgNCkge1xuICAgICAgICAgICAgICAgIHZhciBpID0gZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBuID0gdFt0Lmxlbmd0aCAtIDFdLFxuICAgICAgICAgICAgICAgICAgICAgIGUgPSBbXCJcXHg0ZVxceDYxXFx4NGVcIiwgXCJcXHg2OVxceDczXCJdW3IoKV0oKS5qb2luKFwiXCIpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvd1tlXShuKSA/IG8obikgOiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdCAtIEFDVElWRS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICB9KG4pO1xuICAgICAgICAgICAgICAgIH0odCk7XG5cbiAgICAgICAgICAgICAgICBsLnB1c2goaSk7XG4gICAgICAgICAgICAgICAgdmFyIHMgPSBvKHRbaV0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKDEgPT09IG4pIHtcbiAgICAgICAgICAgICAgICAgIHZhciBhID0gW1wiXFx4NzBcXHg2MVwiLCBcIlxceDY0XFx4NTNcIiwgXCJcXHg3NFwiLCBcIlxceDYxXFx4NzJcXHg3NFwiXS5qb2luKFwiXCIpO1xuICAgICAgICAgICAgICAgICAgcyA9IHMudG9TdHJpbmcoKVthXSgyLCBcIjBcIik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZSArPSBzLCAwICE9PSBuICYmIDEgIT09IG4gfHwgKGUgKz0gXCItXCIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBtID0gMCxcbiAgICAgICAgICAgICAgICBwID0gXCJcIjtcbiAgICAgICAgICAgIHJldHVybiBuLnNwbGl0KFwiLVwiKS5mb3JFYWNoKGZ1bmN0aW9uICh0LCBuKSB7XG4gICAgICAgICAgICAgIGlmIChuIDwgNCkge1xuICAgICAgICAgICAgICAgIHZhciBfciA9IDA7XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBlID0gMDsgZSA8IDQ7IGUrKykge1xuICAgICAgICAgICAgICAgICAgZSAhPT0gbFtuXSAmJiAoX3IgKz0gTWF0aC5hYnMobyh0W2VdKSksIGlzTmFOKHRbZV0pIHx8IG0rKyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIGkgPSBzKF9yKTtcbiAgICAgICAgICAgICAgICBwICs9IGk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLCBwICs9IHMobSksIHtcbiAgICAgICAgICAgICAgdjogbmV3IERhdGUoZSArIFwiVDAwOjAwXCIpLFxuICAgICAgICAgICAgICBvOiBlLnNwbGl0KFwiLVwiKVsyXSA9PT0gOCAqIChBQ1RJVkUubGVuZ3RoIC0gMikgKyBcIlwiLFxuICAgICAgICAgICAgICBsOiBwXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0obiksIGwgPSBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgdmFyIG4gPSBpW3IoKV0oKS5qb2luKFwiXCIpO1xuICAgICAgICAgICAgcmV0dXJuIHQgJiYgMCA9PT0gbi5pbmRleE9mKHQpICYmIHQubGVuZ3RoID09PSBuLmxlbmd0aDtcbiAgICAgICAgICB9KG4pLCAoYSB8fCBsKSAmJiAoZ2V0T3B0aW9ucygpLmNyZWRpdHMgJiYgYSAmJiBlIDw9IGEudiAmJiBhLmwgPT09IG4uc3BsaXQodFswXSlbNF0gfHwgbCB8fCBhLm8pIHx8ICExKVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgdmFyIHQgPSBbXCItXCJdO1xuICAgICAgdmFyIG4gPSBcIjIwMjItOS0yNVwiLnNwbGl0KFwiLVwiKSxcbiAgICAgICAgICBlID0gbmV3IERhdGUoblswXSwgblsxXSwgblsyXSksXG4gICAgICAgICAgaSA9IFtcInNlXCIsIFwibGljZW5cIiwgXCItXCIsIFwidjNcIiwgXCJsXCIsIFwiZ3BcIl07XG5cbiAgICAgIGZ1bmN0aW9uIHIoKSB7XG4gICAgICAgIHJldHVybiBbW1wiXFx4NzJcXHg2NVwiLCBcIlxceDc2XFx4NjVcXHg3MlxceDczXFx4NjVcIl0uam9pbihcIlwiKV1bXCJcIi5sZW5ndGhdO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBvKHQpIHtcbiAgICAgICAgcmV0dXJuIHQgPyBpc05hTih0KSA/IHQuY2hhckNvZGVBdCgwKSAtIDcyIDogdCA6IFwiXCI7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHModCkge1xuICAgICAgICB2YXIgbiA9IDcyICsgdDtcbiAgICAgICAgcmV0dXJuIG4gPiA5MCAmJiBuIDwgOTcgJiYgKG4gKz0gMTUpLCBTdHJpbmcuZnJvbUNoYXJDb2RlKG4pLnRvVXBwZXJDYXNlKCk7XG4gICAgICB9XG4gICAgfSgpO1xuXG4gICAgLy9AdHMtY2hlY2tcbiAgICBGUC5zZXRLZXlib2FyZFNjcm9sbGluZyA9IHNldEtleWJvYXJkU2Nyb2xsaW5nO1xuICAgIC8qKlxuICAgICogQWRkcyBvciByZW1vdmUgdGhlIHBvc3NpYmlsaXR5IG9mIHNjcm9sbGluZyB0aHJvdWdoIHNlY3Rpb25zIGJ5IHVzaW5nIHRoZSBrZXlib2FyZCBhcnJvdyBrZXlzXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIHNldEtleWJvYXJkU2Nyb2xsaW5nKHZhbHVlLCBkaXJlY3Rpb25zKSB7XG4gICAgICBpZiAodHlwZW9mIGRpcmVjdGlvbnMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGRpcmVjdGlvbnMgPSBkaXJlY3Rpb25zLnJlcGxhY2UoLyAvZywgJycpLnNwbGl0KCcsJyk7XG4gICAgICAgIGRpcmVjdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgc2V0SXNTY3JvbGxBbGxvd2VkKHZhbHVlLCBkaXJlY3Rpb24sICdrJyk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0SXNTY3JvbGxBbGxvd2VkKHZhbHVlLCAnYWxsJywgJ2snKTtcbiAgICAgICAgZ2V0T3B0aW9ucygpLmtleWJvYXJkU2Nyb2xsaW5nID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBTZXRzIHRoZSBkYXRhLWFuY2hvciBhdHRyaWJ1dGVzIHRvIHRoZSBtZW51IGVsZW1lbnRzIGFuZCBhY3RpdmF0ZXMgdGhlIGN1cnJlbnQgb25lLlxuICAgICovXG5cbiAgICBmdW5jdGlvbiBzdHlsZU1lbnUoc2VjdGlvbikge1xuICAgICAgdmFyIGluZGV4ID0gc2VjdGlvbi5pbmRleCgpO1xuXG4gICAgICBpZiAodHlwZW9mIGdldE9wdGlvbnMoKS5hbmNob3JzW2luZGV4XSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgLy9hY3RpdmF0aW5nIHRoZSBtZW51IC8gbmF2IGVsZW1lbnQgb24gbG9hZFxuICAgICAgICBpZiAoc2VjdGlvbi5pc0FjdGl2ZSkge1xuICAgICAgICAgIGFjdGl2YXRlTWVudUFuZE5hdihnZXRPcHRpb25zKCkuYW5jaG9yc1tpbmRleF0sIGluZGV4KTtcbiAgICAgICAgfVxuICAgICAgfSAvL21vdmluZyB0aGUgbWVudSBvdXRzaWRlIHRoZSBtYWluIGNvbnRhaW5lciBpZiBpdCBpcyBpbnNpZGUgKGF2b2lkIHByb2JsZW1zIHdpdGggZml4ZWQgcG9zaXRpb25zIHdoZW4gdXNpbmcgQ1NTMyB0cmFuZm9ybXMpXG5cblxuICAgICAgaWYgKGdldE9wdGlvbnMoKS5tZW51ICYmIGdldE9wdGlvbnMoKS5jc3MzICYmIGNsb3Nlc3QoJChnZXRPcHRpb25zKCkubWVudSlbMF0sIFdSQVBQRVJfU0VMKSAhPSBudWxsKSB7XG4gICAgICAgICQoZ2V0T3B0aW9ucygpLm1lbnUpLmZvckVhY2goZnVuY3Rpb24gKG1lbnUpIHtcbiAgICAgICAgICAkYm9keS5hcHBlbmRDaGlsZChtZW51KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBXb3JrcyBvdmVyIHRoZSBET00gc3RydWN0dXJlIHRvIHNldCBpdCB1cCBmb3IgdGhlIGN1cnJlbnQgZnVsbHBhZ2UgZ2V0T3B0aW9ucygpLlxuICAgICovXG5cbiAgICBmdW5jdGlvbiBwcmVwYXJlRG9tKCkge1xuICAgICAgY3NzKGdldFBhcmVudHNVbnRpbChnZXRDb250YWluZXIoKSwgJ2JvZHknKSwge1xuICAgICAgICAnaGVpZ2h0JzogJzEwMCUnLFxuICAgICAgICAncG9zaXRpb24nOiAncmVsYXRpdmUnXG4gICAgICB9KTsgLy9hZGRpbmcgYSBjbGFzcyB0byByZWNvZ25pemUgdGhlIGNvbnRhaW5lciBpbnRlcm5hbGx5IGluIHRoZSBjb2RlXG5cbiAgICAgIGFkZENsYXNzKGdldENvbnRhaW5lcigpLCBXUkFQUEVSKTtcbiAgICAgIGFkZENsYXNzKCRodG1sLCBFTkFCTEVEKTsgLy9kdWUgdG8gaHR0cHM6Ly9naXRodWIuY29tL2FsdmFyb3RyaWdvL2Z1bGxQYWdlLmpzL2lzc3Vlcy8xNTAyXG5cbiAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgd2luZG93c0hlaWdodDogZ2V0V2luZG93SGVpZ2h0KClcbiAgICAgIH0pO1xuICAgICAgcmVtb3ZlQ2xhc3MoZ2V0Q29udGFpbmVyKCksIERFU1RST1lFRCk7IC8vaW4gY2FzZSBpdCB3YXMgZGVzdHJveWVkIGJlZm9yZSBpbml0aWFsaXppbmcgaXQgYWdhaW5cblxuICAgICAgYWRkSW50ZXJuYWxTZWxlY3RvcnMoKTtcbiAgICAgIHZhciBzZWN0aW9ucyA9IGdldFN0YXRlKCkuc2VjdGlvbnNJbmNsdWRpbmdIaWRkZW47IC8vc3R5bGluZyB0aGUgc2VjdGlvbnMgLyBzbGlkZXMgLyBtZW51XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VjdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHNlY3Rpb24gPSBzZWN0aW9uc1tpXTtcbiAgICAgICAgdmFyIHNsaWRlcyA9IHNlY3Rpb24uYWxsU2xpZGVzSXRlbXM7IC8vY2FjaGluZyB0aGUgb3JpZ2luYWwgc3R5bGVzIHRvIGFkZCB0aGVtIGJhY2sgb24gZGVzdHJveSgnYWxsJylcblxuICAgICAgICBzZWN0aW9uLml0ZW0uc2V0QXR0cmlidXRlKCdkYXRhLWZwLXN0eWxlcycsIGdldEF0dHIoc2VjdGlvbi5pdGVtLCAnc3R5bGUnKSk7XG4gICAgICAgIHN0eWxlU2VjdGlvbihzZWN0aW9uKTtcbiAgICAgICAgc3R5bGVNZW51KHNlY3Rpb24pOyAvLyBpZiB0aGVyZSdzIGFueSBzbGlkZVxuXG4gICAgICAgIGlmIChzbGlkZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHN0eWxlU2xpZGVzKHNlY3Rpb24pO1xuICAgICAgICB9XG4gICAgICB9IC8vZml4ZWQgZWxlbWVudHMgbmVlZCB0byBiZSBtb3ZlZCBvdXQgb2YgdGhlIHBsdWdpbiBjb250YWluZXIgZHVlIHRvIHByb2JsZW1zIHdpdGggQ1NTMy5cblxuXG4gICAgICBpZiAoZ2V0T3B0aW9ucygpLmZpeGVkRWxlbWVudHMgJiYgZ2V0T3B0aW9ucygpLmNzczMpIHtcbiAgICAgICAgJChnZXRPcHRpb25zKCkuZml4ZWRFbGVtZW50cykuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICRib2R5LmFwcGVuZENoaWxkKGl0ZW0pO1xuICAgICAgICB9KTtcbiAgICAgIH0gLy92ZXJ0aWNhbCBjZW50ZXJlZCBvZiB0aGUgbmF2aWdhdGlvbiArIGFjdGl2ZSBidWxsZXRcblxuXG4gICAgICBpZiAoZ2V0T3B0aW9ucygpLm5hdmlnYXRpb24pIHtcbiAgICAgICAgYWRkVmVydGljYWxOYXZpZ2F0aW9uKCk7XG4gICAgICB9XG5cbiAgICAgIGVuYWJsZVlvdXR1YmVBUEkoKTtcblxuICAgICAgaWYgKGdldE9wdGlvbnMoKS5zY3JvbGxPdmVyZmxvdykge1xuICAgICAgICBzY3JvbGxPdmVyZmxvd0hhbmRsZXIubWFrZVNjcm9sbGFibGUoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBGUC5zaGFyZWQuYWZ0ZXJSZW5kZXJBY3Rpb25zID0gYWZ0ZXJSZW5kZXJBY3Rpb25zO1xuICAgIC8qKlxuICAgICogQWN0aW9ucyBhbmQgY2FsbGJhY2tzIHRvIGZpcmUgYWZ0ZXJSZW5kZXJcbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gYWZ0ZXJSZW5kZXJBY3Rpb25zKCkge1xuICAgICAgdmFyIHNlY3Rpb24gPSBnZXRTdGF0ZSgpLmFjdGl2ZVNlY3Rpb247XG4gICAgICB2YXIgc2VjdGlvbkVsZW0gPSBnZXRTdGF0ZSgpLmFjdGl2ZVNlY3Rpb24uaXRlbTtcbiAgICAgIGFkZENsYXNzKHNlY3Rpb25FbGVtLCBDT01QTEVURUxZKTtcbiAgICAgIGxhenlMb2FkKHNlY3Rpb25FbGVtKTtcbiAgICAgIGxhenlMb2FkT3RoZXJzKCk7XG4gICAgICBwbGF5TWVkaWEoc2VjdGlvbkVsZW0pO1xuXG4gICAgICBpZiAoaXNEZXN0aW55VGhlU3RhcnRpbmdTZWN0aW9uKCkgJiYgaXNGdW5jdGlvbihnZXRPcHRpb25zKCkuYWZ0ZXJMb2FkKSkge1xuICAgICAgICBmaXJlQ2FsbGJhY2soJ2FmdGVyTG9hZCcsIHtcbiAgICAgICAgICBhY3RpdmVTZWN0aW9uOiBzZWN0aW9uRWxlbSxcbiAgICAgICAgICBlbGVtZW50OiBzZWN0aW9uRWxlbSxcbiAgICAgICAgICBkaXJlY3Rpb246IG51bGwsXG4gICAgICAgICAgLy9mb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkgY2FsbGJhY2sgKHRvIGJlIHJlbW92ZWQgaW4gYSBmdXR1cmUhKVxuICAgICAgICAgIGFuY2hvckxpbms6IHNlY3Rpb24uYW5jaG9yLFxuICAgICAgICAgIHNlY3Rpb25JbmRleDogc2VjdGlvbi5pbmRleCgpLFxuICAgICAgICAgIGl0ZW1zOiB7XG4gICAgICAgICAgICBvcmlnaW46IGdldFN0YXRlKCkuYWN0aXZlU2VjdGlvbixcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uOiBnZXRTdGF0ZSgpLmFjdGl2ZVNlY3Rpb25cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNGdW5jdGlvbihnZXRPcHRpb25zKCkuYWZ0ZXJSZW5kZXIpKSB7XG4gICAgICAgIGZpcmVDYWxsYmFjaygnYWZ0ZXJSZW5kZXInKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgKiBEZXRlcm1pbmVzIGlmIHRoZSBVUkwgYW5jaG9yIGRlc3RpbnkgaXMgdGhlIHN0YXJ0aW5nIHNlY3Rpb24gKHRoZSBvbmUgdXNpbmcgJ2FjdGl2ZScgY2xhc3MgYmVmb3JlIGluaXRpYWxpemF0aW9uKVxuICAgICovXG5cbiAgICBmdW5jdGlvbiBpc0Rlc3RpbnlUaGVTdGFydGluZ1NlY3Rpb24oKSB7XG4gICAgICB2YXIgYW5jaG9yID0gZ2V0QW5jaG9yc1VSTCgpO1xuICAgICAgdmFyIGRlc3RpbmF0aW9uU2VjdGlvbiA9IGdldFNlY3Rpb25CeUFuY2hvcihhbmNob3Iuc2VjdGlvbik7XG4gICAgICByZXR1cm4gIWFuY2hvci5zZWN0aW9uIHx8ICFkZXN0aW5hdGlvblNlY3Rpb24gfHwgdHlwZW9mIGRlc3RpbmF0aW9uU2VjdGlvbiAhPT0gJ3VuZGVmaW5lZCcgJiYgZGVzdGluYXRpb25TZWN0aW9uLmluZGV4KCkgPT09IGluZGV4KGdldFN0YXJ0aW5nU2VjdGlvbigpKTtcbiAgICB9XG5cbiAgICBGUC5zZXRBbGxvd1Njcm9sbGluZyA9IHNldEFsbG93U2Nyb2xsaW5nO1xuICAgIC8qKlxuICAgICogQWRkcyBvciByZW1vdmUgdGhlIHBvc3NpYmlsaXR5IG9mIHNjcm9sbGluZyB0aHJvdWdoIHNlY3Rpb25zIGJ5IHVzaW5nIHRoZSBtb3VzZSB3aGVlbC90cmFja3BhZCBvciB0b3VjaCBnZXN0dXJlcy5cbiAgICAqIE9wdGlvbmFsbHkgYSBzZWNvbmQgcGFyYW1ldGVyIGNhbiBiZSB1c2VkIHRvIHNwZWNpZnkgdGhlIGRpcmVjdGlvbiBmb3Igd2hpY2ggdGhlIGFjdGlvbiB3aWxsIGJlIGFwcGxpZWQuXG4gICAgKlxuICAgICogQHBhcmFtIGRpcmVjdGlvbnMgc3RyaW5nIGNvbnRhaW5pbmcgdGhlIGRpcmVjdGlvbiBvciBkaXJlY3Rpb25zIHNlcGFyYXRlZCBieSBjb21tYS5cbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gc2V0QWxsb3dTY3JvbGxpbmcodmFsdWUsIGRpcmVjdGlvbnMpIHtcbiAgICAgIGlmICh0eXBlb2YgZGlyZWN0aW9ucyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgZGlyZWN0aW9ucyA9IGRpcmVjdGlvbnMucmVwbGFjZSgvIC9nLCAnJykuc3BsaXQoJywnKTtcbiAgICAgICAgZGlyZWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChkaXJlY3Rpb24pIHtcbiAgICAgICAgICBzZXRJc1Njcm9sbEFsbG93ZWQodmFsdWUsIGRpcmVjdGlvbiwgJ20nKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRJc1Njcm9sbEFsbG93ZWQodmFsdWUsICdhbGwnLCAnbScpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICogU2Nyb2xscyB0byB0aGUgYW5jaG9yIGluIHRoZSBVUkwgd2hlbiBsb2FkaW5nIHRoZSBzaXRlXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIHNjcm9sbFRvQW5jaG9yKCkge1xuICAgICAgdmFyIGFuY2hvcnMgPSBnZXRBbmNob3JzVVJMKCk7XG4gICAgICB2YXIgc2VjdGlvbkFuY2hvciA9IGFuY2hvcnMuc2VjdGlvbjtcbiAgICAgIHZhciBzbGlkZUFuY2hvciA9IGFuY2hvcnMuc2xpZGU7XG5cbiAgICAgIGlmIChzZWN0aW9uQW5jaG9yKSB7XG4gICAgICAgIC8vaWYgdGhlcmVzIGFueSAjXG4gICAgICAgIGlmIChnZXRPcHRpb25zKCkuYW5pbWF0ZUFuY2hvcikge1xuICAgICAgICAgIHNjcm9sbFBhZ2VBbmRTbGlkZShzZWN0aW9uQW5jaG9yLCBzbGlkZUFuY2hvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2lsZW50TW92ZVRvKHNlY3Rpb25BbmNob3IsIHNsaWRlQW5jaG9yKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgRXZlbnRFbWl0dGVyLmVtaXQoZXZlbnRzLm9uQWZ0ZXJSZW5kZXJOb0FuY2hvciwgbnVsbCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLypcbiAgICAqIFJlbW92ZXMgaW5saW5lIHN0eWxlcyBhZGRlZCBieSBmdWxscGFnZS5qc1xuICAgICovXG5cbiAgICBmdW5jdGlvbiBkZXN0cm95U3RydWN0dXJlKCkge1xuICAgICAgLy9yZXNldGluZyB0aGUgYHRvcGAgb3IgYHRyYW5zbGF0ZWAgcHJvcGVydGllcyB0byAwXG4gICAgICBzaWxlbnRTY3JvbGwoMCk7IC8vbG9hZGluZyBhbGwgdGhlIGxhenkgbG9hZCBjb250ZW50XG5cbiAgICAgICQoJ2ltZ1tkYXRhLXNyY10sIHNvdXJjZVtkYXRhLXNyY10sIGF1ZGlvW2RhdGEtc3JjXSwgaWZyYW1lW2RhdGEtc3JjXScsIGdldENvbnRhaW5lcigpKS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHNldFNyYyhpdGVtLCAnc3JjJyk7XG4gICAgICB9KTtcbiAgICAgICQoJ2ltZ1tkYXRhLXNyY3NldF0nKS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHNldFNyYyhpdGVtLCAnc3Jjc2V0Jyk7XG4gICAgICB9KTtcbiAgICAgIHJlbW92ZSgkKFNFQ1RJT05fTkFWX1NFTCArICcsICcgKyBTTElERVNfTkFWX1NFTCArICcsICcgKyBTTElERVNfQVJST1dfU0VMKSk7IC8vcmVtb3ZpbmcgaW5saW5lIHN0eWxlc1xuXG4gICAgICBjc3MoZ2V0Tm9kZXMoZ2V0U3RhdGUoKS5zZWN0aW9ucyksIHtcbiAgICAgICAgJ2hlaWdodCc6ICcnLFxuICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6ICcnLFxuICAgICAgICAncGFkZGluZyc6ICcnXG4gICAgICB9KTtcbiAgICAgIGNzcyhnZXROb2RlcyhnZXRTdGF0ZSgpLnNsaWRlcyksIHtcbiAgICAgICAgJ3dpZHRoJzogJydcbiAgICAgIH0pO1xuICAgICAgY3NzKGdldENvbnRhaW5lcigpLCB7XG4gICAgICAgICdoZWlnaHQnOiAnJyxcbiAgICAgICAgJ3Bvc2l0aW9uJzogJycsXG4gICAgICAgICctbXMtdG91Y2gtYWN0aW9uJzogJycsXG4gICAgICAgICd0b3VjaC1hY3Rpb24nOiAnJ1xuICAgICAgfSk7XG4gICAgICBjc3MoJGh0bWxCb2R5LCB7XG4gICAgICAgICdvdmVyZmxvdyc6ICcnLFxuICAgICAgICAnaGVpZ2h0JzogJydcbiAgICAgIH0pOyAvLyByZW1vdmUgLmZwLWVuYWJsZWQgY2xhc3NcblxuICAgICAgcmVtb3ZlQ2xhc3MoJGh0bWwsIEVOQUJMRUQpOyAvLyByZW1vdmUgLmZwLXJlc3BvbnNpdmUgY2xhc3NcblxuICAgICAgcmVtb3ZlQ2xhc3MoJGJvZHksIFJFU1BPTlNJVkUpOyAvLyByZW1vdmUgYWxsIG9mIHRoZSAuZnAtdmlld2luZy0gY2xhc3Nlc1xuXG4gICAgICAkYm9keS5jbGFzc05hbWUuc3BsaXQoL1xccysvKS5mb3JFYWNoKGZ1bmN0aW9uIChjbGFzc05hbWUpIHtcbiAgICAgICAgaWYgKGNsYXNzTmFtZS5pbmRleE9mKFZJRVdJTkdfUFJFRklYKSA9PT0gMCkge1xuICAgICAgICAgIHJlbW92ZUNsYXNzKCRib2R5LCBjbGFzc05hbWUpO1xuICAgICAgICB9XG4gICAgICB9KTsgLy9yZW1vdmluZyBhZGRlZCBjbGFzc2VzXG5cbiAgICAgIGdldE5vZGVzKGdldFN0YXRlKCkucGFuZWxzKS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIGlmIChnZXRPcHRpb25zKCkuc2Nyb2xsT3ZlcmZsb3cpIHtcbiAgICAgICAgICBzY3JvbGxPdmVyZmxvd0hhbmRsZXIuZGVzdHJveVdyYXBwZXIoaXRlbSk7XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDbGFzcyhpdGVtLCBUQUJMRSArICcgJyArIEFDVElWRSArICcgJyArIENPTVBMRVRFTFkpO1xuICAgICAgICB2YXIgcHJldmlvdXNTdHlsZXMgPSBnZXRBdHRyKGl0ZW0sICdkYXRhLWZwLXN0eWxlcycpO1xuXG4gICAgICAgIGlmIChwcmV2aW91c1N0eWxlcykge1xuICAgICAgICAgIGl0ZW0uc2V0QXR0cmlidXRlKCdzdHlsZScsIGdldEF0dHIoaXRlbSwgJ2RhdGEtZnAtc3R5bGVzJykpO1xuICAgICAgICB9IC8vcmVtb3ZpbmcgYW5jaG9ycyBpZiB0aGV5IHdlcmUgbm90IHNldCB1c2luZyB0aGUgSFRNTCBtYXJrdXBcblxuXG4gICAgICAgIGlmIChoYXNDbGFzcyhpdGVtLCBTRUNUSU9OKSAmJiAhZ2V0SW5pdGlhbEFuY2hvcnNJbkRvbSgpKSB7XG4gICAgICAgICAgaXRlbS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtYW5jaG9yJyk7XG4gICAgICAgIH1cbiAgICAgIH0pOyAvL3JlbW92aW5nIHRoZSBhcHBsaWVkIHRyYW5zaXRpb24gZnJvbSB0aGUgZnVsbHBhZ2Ugd3JhcHBlclxuXG4gICAgICByZW1vdmVBbmltYXRpb24oZ2V0Q29udGFpbmVyKCkpOyAvL1Vud3JhcHBpbmcgY29udGVudFxuXG4gICAgICBbVEFCTEVfQ0VMTF9TRUwsIFNMSURFU19DT05UQUlORVJfU0VMLCBTTElERVNfV1JBUFBFUl9TRUxdLmZvckVhY2goZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgICQoc2VsZWN0b3IsIGdldENvbnRhaW5lcigpKS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgLy91bndyYXAgbm90IGJlaW5nIHVzZSBpbiBjYXNlIHRoZXJlJ3Mgbm8gY2hpbGQgZWxlbWVudCBpbnNpZGUgYW5kIGl0cyBqdXN0IHRleHRcbiAgICAgICAgICB1bndyYXAoaXRlbSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7IC8vcmVtb3ZpbmcgdGhlIGFwcGxpZWQgdHJhbnNpdGlvbiBmcm9tIHRoZSBmdWxscGFnZSB3cmFwcGVyXG5cbiAgICAgIGNzcyhnZXRDb250YWluZXIoKSwge1xuICAgICAgICAnLXdlYmtpdC10cmFuc2l0aW9uJzogJ25vbmUnLFxuICAgICAgICAndHJhbnNpdGlvbic6ICdub25lJ1xuICAgICAgfSk7IC8vc2Nyb2xsaW5nIHRoZSBwYWdlIHRvIHRoZSB0b3Agd2l0aCBubyBhbmltYXRpb25cblxuICAgICAgd2luLnNjcm9sbFRvKDAsIDApOyAvL3JlbW92aW5nIHNlbGVjdG9yc1xuXG4gICAgICB2YXIgdXNlZFNlbGVjdG9ycyA9IFtTRUNUSU9OLCBTTElERSwgU0xJREVTX0NPTlRBSU5FUl07XG4gICAgICB1c2VkU2VsZWN0b3JzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgcmVtb3ZlQ2xhc3MoJCgnLicgKyBpdGVtKSwgaXRlbSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBGUC5kZXN0cm95ID0gZGVzdHJveTtcbiAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgdXBkYXRlU3RydWN0dXJhbFN0YXRlKCk7XG4gICAgICB1cGRhdGVTdGF0ZSgpO1xuICAgICAgZ2V0T3B0aW9ucygpLnNjcm9sbEJhciA9IGdldE9wdGlvbnMoKS5zY3JvbGxCYXIgfHwgZ2V0T3B0aW9ucygpLmh5YnJpZDtcbiAgICAgIHNldE9wdGlvbnNGcm9tRE9NKCk7XG4gICAgICBwcmVwYXJlRG9tKCk7XG4gICAgICBzZXRBbGxvd1Njcm9sbGluZyh0cnVlKTtcbiAgICAgIHNldE1vdXNlSGlqYWNrKHRydWUpO1xuICAgICAgc2V0QXV0b1Njcm9sbGluZyhnZXRPcHRpb25zKCkuYXV0b1Njcm9sbGluZywgJ2ludGVybmFsJyk7XG4gICAgICByZXNwb25zaXZlKCk7IC8vc2V0dGluZyB0aGUgY2xhc3MgZm9yIHRoZSBib2R5IGVsZW1lbnRcblxuICAgICAgc2V0Qm9keUNsYXNzKCk7XG5cbiAgICAgIGlmIChkb2MucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xuICAgICAgICBzY3JvbGxUb0FuY2hvcigpO1xuICAgICAgfVxuXG4gICAgICB3aW5kb3dBZGRFdmVudCgnbG9hZCcsIHNjcm9sbFRvQW5jaG9yKTtcbiAgICAgIGFmdGVyUmVuZGVyQWN0aW9ucygpOyAvLyBVcGRhdGluZyB0aGUgc3RhdGUgYWdhaW4gd2l0aCB0aGUgbmV3IERPTVxuXG4gICAgICB1cGRhdGVTdHJ1Y3R1cmFsU3RhdGUoKTtcbiAgICAgIHVwZGF0ZVN0YXRlKCk7XG4gICAgfVxuICAgIC8qXG4gICAgKiBEZXN0cm95cyBmdWxscGFnZS5qcyBwbHVnaW4gZXZlbnRzIGFuZCBvcHRpbmFsbHkgaXRzIGh0bWwgbWFya3VwIGFuZCBzdHlsZXNcbiAgICAqL1xuXG4gICAgZnVuY3Rpb24gZGVzdHJveShhbGwpIHtcbiAgICAgIHNldEF1dG9TY3JvbGxpbmcoZmFsc2UsICdpbnRlcm5hbCcpO1xuICAgICAgc2V0QWxsb3dTY3JvbGxpbmcodHJ1ZSk7XG4gICAgICBzZXRNb3VzZUhpamFjayhmYWxzZSk7XG4gICAgICBzZXRLZXlib2FyZFNjcm9sbGluZyhmYWxzZSk7XG4gICAgICBhZGRDbGFzcyhnZXRDb250YWluZXIoKSwgREVTVFJPWUVEKTtcbiAgICAgIEV2ZW50RW1pdHRlci5lbWl0KGV2ZW50cy5vbkRlc3Ryb3kpOyAvL2xldHMgbWFrZSBhIG1lc3MhXG5cbiAgICAgIGlmIChhbGwpIHtcbiAgICAgICAgZGVzdHJveVN0cnVjdHVyZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBpc09LID0gZnVuY3Rpb24gaXNPSygpIHtcbiAgICAgIHJldHVybiBnZXRPcHRpb25zKCkgJiYgc3RhdGUuaXNWYWxpZCB8fCBkb2MuZG9tYWluLmluZGV4T2YoJ2FsJyArICd2YXJvdHJpJyArICdnbycgKyAnLicgKyAnY29tJykgPiAtMTtcbiAgICB9O1xuICAgIC8qKlxuICAgICogRGlzcGxheXMgd2FybmluZ3NcbiAgICAqL1xuXG5cbiAgICBmdW5jdGlvbiBkaXNwbGF5V2FybmluZ3MoKSB7XG4gICAgICB2YXIgbCA9IGdldE9wdGlvbnMoKVsnbGknICsgJ2MnICsgJ2Vuc2VLJyArICdlJyArICd5J107XG4gICAgICB2YXIgbXNnU3R5bGUgPSAnZm9udC1zaXplOiAxNXB4O2JhY2tncm91bmQ6eWVsbG93Oyc7XG5cbiAgICAgIGlmIChnZXRPcHRpb25zKCkubGljZW5zZUtleS50cmltKCkgPT09ICcnKSB7XG4gICAgICAgIHNob3dFcnJvcignZXJyb3InLCAnRnVsbHBhZ2UuanMgcmVxdWlyZXMgYSBgbGljZW5zZUtleWAgb3B0aW9uLiBSZWFkIGFib3V0IGl0IG9uIHRoZSBmb2xsb3dpbmcgVVJMOicpO1xuICAgICAgICBzaG93RXJyb3IoJ2Vycm9yJywgJ2h0dHBzOi8vZ2l0aHViLmNvbS9hbHZhcm90cmlnby9mdWxsUGFnZS5qcyNvcHRpb25zJyk7XG4gICAgICB9IGVsc2UgaWYgKCFpc09LKCkpIHtcbiAgICAgICAgc2hvd0Vycm9yKCdlcnJvcicsICdJbmNvcnJlY3QgYGxpY2Vuc2VLZXlgLiBHZXQgb25lIGZvciBmdWxsUGFnZS5qcyB2ZXJzaW9uIDQgaGVyZTonKTtcbiAgICAgICAgc2hvd0Vycm9yKCdlcnJvcicsICdodHRwczovL2FsdmFyb3RyaWdvLmNvbS9mdWxsUGFnZS9wcmljaW5nJyk7XG4gICAgICB9IGVsc2UgaWYgKGwgJiYgbC5sZW5ndGggPCAyMCkge1xuICAgICAgICBjb25zb2xlLndhcm4oJyVjIFRoaXMgd2Vic2l0ZSB3YXMgbWFkZSB1c2luZyBmdWxsUGFnZS5qcyBzbGlkZXIuIE1vcmUgaW5mbyBvbiB0aGUgZm9sbG93aW5nIHdlYnNpdGU6JywgbXNnU3R5bGUpO1xuICAgICAgICBjb25zb2xlLndhcm4oJyVjIGh0dHBzOi8vYWx2YXJvdHJpZ28uY29tL2Z1bGxQYWdlLycsIG1zZ1N0eWxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGhhc0NsYXNzKCRodG1sLCBFTkFCTEVEKSkge1xuICAgICAgICBzaG93RXJyb3IoJ2Vycm9yJywgJ0Z1bGxwYWdlLmpzIGNhbiBvbmx5IGJlIGluaXRpYWxpemVkIG9uY2UgYW5kIHlvdSBhcmUgZG9pbmcgaXQgbXVsdGlwbGUgdGltZXMhJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gLy8gRGlzYWJsZSBtdXR1YWxseSBleGNsdXNpdmUgc2V0dGluZ3NcblxuXG4gICAgICBpZiAoZ2V0T3B0aW9ucygpLmNvbnRpbnVvdXNWZXJ0aWNhbCAmJiAoZ2V0T3B0aW9ucygpLmxvb3BUb3AgfHwgZ2V0T3B0aW9ucygpLmxvb3BCb3R0b20pKSB7XG4gICAgICAgIGdldE9wdGlvbnMoKS5jb250aW51b3VzVmVydGljYWwgPSBmYWxzZTtcbiAgICAgICAgc2hvd0Vycm9yKCd3YXJuJywgJ09wdGlvbiBgbG9vcFRvcC9sb29wQm90dG9tYCBpcyBtdXR1YWxseSBleGNsdXNpdmUgd2l0aCBgY29udGludW91c1ZlcnRpY2FsYDsgYGNvbnRpbnVvdXNWZXJ0aWNhbGAgZGlzYWJsZWQnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGdldE9wdGlvbnMoKS5zY3JvbGxPdmVyZmxvdyAmJiAoZ2V0T3B0aW9ucygpLnNjcm9sbEJhciB8fCAhZ2V0T3B0aW9ucygpLmF1dG9TY3JvbGxpbmcpKSB7XG4gICAgICAgIHNob3dFcnJvcignd2FybicsICdPcHRpb25zIHNjcm9sbEJhcjp0cnVlIGFuZCBhdXRvU2Nyb2xsaW5nOmZhbHNlIGFyZSBtdXR1YWxseSBleGNsdXNpdmUgd2l0aCBzY3JvbGxPdmVyZmxvdzp0cnVlLiBTZWN0aW9ucyB3aXRoIHNjcm9sbE92ZXJmbG93IG1pZ2h0IG5vdCB3b3JrIHdlbGwgaW4gRmlyZWZveCcpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZ2V0T3B0aW9ucygpLmNvbnRpbnVvdXNWZXJ0aWNhbCAmJiAoZ2V0T3B0aW9ucygpLnNjcm9sbEJhciB8fCAhZ2V0T3B0aW9ucygpLmF1dG9TY3JvbGxpbmcpKSB7XG4gICAgICAgIGdldE9wdGlvbnMoKS5jb250aW51b3VzVmVydGljYWwgPSBmYWxzZTtcbiAgICAgICAgc2hvd0Vycm9yKCd3YXJuJywgJ1Njcm9sbCBiYXJzIChgc2Nyb2xsQmFyOnRydWVgIG9yIGBhdXRvU2Nyb2xsaW5nOmZhbHNlYCkgYXJlIG11dHVhbGx5IGV4Y2x1c2l2ZSB3aXRoIGBjb250aW51b3VzVmVydGljYWxgOyBgY29udGludW91c1ZlcnRpY2FsYCBkaXNhYmxlZCcpO1xuICAgICAgfSAvL3VzaW5nIGV4dGVuc2lvbnM/IFdyb25nIGZpbGUhXG5cblxuICAgICAgZXh0ZW5zaW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChleHRlbnNpb24pIHtcbiAgICAgICAgLy9pcyB0aGUgb3B0aW9uIHNldCB0byB0cnVlP1xuICAgICAgICBpZiAoZ2V0T3B0aW9ucygpW2V4dGVuc2lvbl0pIHtcbiAgICAgICAgICBzaG93RXJyb3IoJ3dhcm4nLCAnZnVsbHBhZ2UuanMgZXh0ZW5zaW9ucyByZXF1aXJlIGZ1bGxwYWdlLmV4dGVuc2lvbnMubWluLmpzIGZpbGUgaW5zdGVhZCBvZiB0aGUgdXN1YWwgZnVsbHBhZ2UuanMuIFJlcXVlc3RlZDogJyArIGV4dGVuc2lvbik7XG4gICAgICAgIH1cbiAgICAgIH0pOyAvL2FuY2hvcnMgY2FuIG5vdCBoYXZlIHRoZSBzYW1lIHZhbHVlIGFzIGFueSBlbGVtZW50IElEIG9yIE5BTUVcblxuICAgICAgZ2V0T3B0aW9ucygpLmFuY2hvcnMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAvL2Nhc2UgaW5zZW5zaXRpdmUgc2VsZWN0b3JzIChodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xOTQ2NTE4Ny8xMDgxMzk2KVxuICAgICAgICB2YXIgbmFtZUF0dHIgPSBbXS5zbGljZS5jYWxsKCQoJ1tuYW1lXScpKS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICByZXR1cm4gZ2V0QXR0cihpdGVtLCAnbmFtZScpICYmIGdldEF0dHIoaXRlbSwgJ25hbWUnKS50b0xvd2VyQ2FzZSgpID09IG5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBpZEF0dHIgPSBbXS5zbGljZS5jYWxsKCQoJ1tpZF0nKSkuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEF0dHIoaXRlbSwgJ2lkJykgJiYgZ2V0QXR0cihpdGVtLCAnaWQnKS50b0xvd2VyQ2FzZSgpID09IG5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGlkQXR0ci5sZW5ndGggfHwgbmFtZUF0dHIubGVuZ3RoKSB7XG4gICAgICAgICAgc2hvd0Vycm9yKCdlcnJvcicsICdkYXRhLWFuY2hvciB0YWdzIGNhbiBub3QgaGF2ZSB0aGUgc2FtZSB2YWx1ZSBhcyBhbnkgYGlkYCBlbGVtZW50IG9uIHRoZSBzaXRlIChvciBgbmFtZWAgZWxlbWVudCBmb3IgSUUpLicpO1xuICAgICAgICAgIHZhciBwcm9wZXJ0eU5hbWUgPSBpZEF0dHIubGVuZ3RoID8gJ2lkJyA6ICduYW1lJztcblxuICAgICAgICAgIGlmIChpZEF0dHIubGVuZ3RoIHx8IG5hbWVBdHRyLmxlbmd0aCkge1xuICAgICAgICAgICAgc2hvd0Vycm9yKCdlcnJvcicsICdcIicgKyBuYW1lICsgJ1wiIGlzIGlzIGJlaW5nIHVzZWQgYnkgYW5vdGhlciBlbGVtZW50IGAnICsgcHJvcGVydHlOYW1lICsgJ2AgcHJvcGVydHknKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZ1bGxwYWdlKGNvbnRhaW5lclNlbGVjdG9yLCBvcHRpb25zKSB7XG4gICAgICBzZXRDYWNoZSgpOyAvL29ubHkgb25jZSBteSBmcmllbmQhXG5cbiAgICAgIGlmIChoYXNDbGFzcygkaHRtbCwgRU5BQkxFRCkpIHtcbiAgICAgICAgZGlzcGxheVdhcm5pbmdzKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2V0T3B0aW9uKCd0b3VjaFdyYXBwZXInLCB0eXBlb2YgY29udGFpbmVyU2VsZWN0b3IgPT09ICdzdHJpbmcnID8gJChjb250YWluZXJTZWxlY3RvcilbMF0gOiBjb250YWluZXJTZWxlY3Rvcik7IC8vIENyZWF0aW5nIHNvbWUgZGVmYXVsdHMsIGV4dGVuZGluZyB0aGVtIHdpdGggYW55IG9wdGlvbnMgdGhhdCB3ZXJlIHByb3ZpZGVkXG5cbiAgICAgIHNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgICBzZXRDb250YWluZXIodHlwZW9mIGNvbnRhaW5lclNlbGVjdG9yID09PSAnc3RyaW5nJyA/ICQoY29udGFpbmVyU2VsZWN0b3IpWzBdIDogY29udGFpbmVyU2VsZWN0b3IpO1xuICAgICAgRXZlbnRFbWl0dGVyLmVtaXQoZXZlbnRzLm9uSW5pdGlhbGlzZSk7XG4gICAgICBkaXNwbGF5V2FybmluZ3MoKTtcbiAgICAgIHNldEFQSSgpO1xuXG4gICAgICBpZiAoZ2V0Q29udGFpbmVyKCkpIHtcbiAgICAgICAgRXZlbnRFbWl0dGVyLmVtaXQoZXZlbnRzLmJlZm9yZUluaXQpO1xuICAgICAgICBpbml0KCk7XG4gICAgICAgIEV2ZW50RW1pdHRlci5lbWl0KGV2ZW50cy5iaW5kRXZlbnRzKTtcbiAgICAgIH0gLy8gQHRzLWlnbm9yZVxuXG5cbiAgICAgIHJldHVybiB3aW4uZnVsbHBhZ2VfYXBpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldEFQSSgpIHtcbiAgICAgIEZQLmdldEZ1bGxwYWdlRGF0YSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBvcHRpb25zOiBnZXRPcHRpb25zKClcbiAgICAgICAgfTtcbiAgICAgIH07IC8vcHVibGljIGZ1bmN0aW9uc1xuXG5cbiAgICAgIEZQLnZlcnNpb24gPSAnNC4wLjEyJztcbiAgICAgIEZQLnRlc3QgPSBPYmplY3QuYXNzaWduKEZQLnRlc3QsIHtcbiAgICAgICAgdG9wOiAnMHB4JyxcbiAgICAgICAgdHJhbnNsYXRlM2Q6ICd0cmFuc2xhdGUzZCgwcHgsIDBweCwgMHB4KScsXG4gICAgICAgIHRyYW5zbGF0ZTNkSDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBhID0gW107XG5cbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8ICQoZ2V0T3B0aW9ucygpLnNlY3Rpb25TZWxlY3RvciwgZ2V0Q29udGFpbmVyKCkpLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhLnB1c2goJ3RyYW5zbGF0ZTNkKDBweCwgMHB4LCAwcHgpJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGE7XG4gICAgICAgIH0oKSxcbiAgICAgICAgbGVmdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBhID0gW107XG5cbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8ICQoZ2V0T3B0aW9ucygpLnNlY3Rpb25TZWxlY3RvciwgZ2V0Q29udGFpbmVyKCkpLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhLnB1c2goMCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGE7XG4gICAgICAgIH0oKSxcbiAgICAgICAgb3B0aW9uczogZ2V0T3B0aW9ucygpLFxuICAgICAgICBzZXRBdXRvU2Nyb2xsaW5nOiBudWxsXG4gICAgICB9KTsgLy9mdW5jdGlvbnMgd2Ugd2FudCB0byBzaGFyZSBhY3Jvc3MgZmlsZXMgYnV0IHdoaWNoIGFyZSBub3RcbiAgICAgIC8vbWVhbiB0byBiZSB1c2VkIG9uIHRoZWlyIG93biBieSBkZXZlbG9wZXJzXG5cbiAgICAgIEZQLnNoYXJlZCA9IE9iamVjdC5hc3NpZ24oRlAuc2hhcmVkLCB7XG4gICAgICAgIGFmdGVyUmVuZGVyQWN0aW9uczogbnVsbCxcbiAgICAgICAgaXNOb3JtYWxTY3JvbGxFbGVtZW50OiBmYWxzZVxuICAgICAgfSk7IC8vIEB0cy1pZ25vcmVcblxuICAgICAgd2luLmZ1bGxwYWdlX2FwaSA9IEZQO1xuICAgIH1cblxuICAgIC8vIEB0cy1pZ25vcmVcblxuICAgIHdpbi5mcF9lYXNpbmdzID0gZGVlcEV4dGVuZCh3aW4uZnBfZWFzaW5ncywge1xuICAgICAgZWFzZUluT3V0Q3ViaWM6IGZ1bmN0aW9uIGVhc2VJbk91dEN1YmljKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHJldHVybiBjIC8gMiAqIHQgKiB0ICogdCArIGI7XG4gICAgICAgIHJldHVybiBjIC8gMiAqICgodCAtPSAyKSAqIHQgKiB0ICsgMikgKyBiO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IGFkYXB0ZXIgZm9yIGZ1bGxQYWdlLmpzIDMuMC4wXG4gICAgICovXG4gICAgLy8gQHRzLWlnbm9yZVxuXG4gICAgaWYgKHdpbi5qUXVlcnkpIHtcbiAgICAgIChmdW5jdGlvbiAoJCwgZnVsbHBhZ2UpIHtcblxuICAgICAgICBpZiAoISQgfHwgIWZ1bGxwYWdlKSB7XG4gICAgICAgICAgc2hvd0Vycm9yKCdlcnJvcicsICdqUXVlcnkgaXMgcmVxdWlyZWQgdG8gdXNlIHRoZSBqUXVlcnkgZnVsbHBhZ2UgYWRhcHRlciEnKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAkLmZuLmZ1bGxwYWdlID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgICBvcHRpb25zID0gJC5leHRlbmQoe30sIG9wdGlvbnMsIHtcbiAgICAgICAgICAgICckJzogJFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIG5ldyBmdWxscGFnZSh0aGlzWzBdLCBvcHRpb25zKTsgLy8gQ3JlYXRpbmcgdGhlICQuZm4uZnVsbHBhZ2Ugb2JqZWN0XG5cbiAgICAgICAgICBPYmplY3Qua2V5cyhGUCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICBnZXRPcHRpb25zKCkuJC5mbi5mdWxscGFnZVtrZXldID0gRlBba2V5XTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTsgLy8gQHRzLWlnbm9yZVxuXG4gICAgICB9KSh3aW4ualF1ZXJ5LCBmdWxscGFnZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bGxwYWdlO1xuXG59KSk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gaW1wb3J0ICdmdWxscGFnZS5qcyc7XHJcbmNvbnNvbGUubG9nKFwiSGVsbG8sIHdvcmxkIVwiKTtcclxuXHJcbmltcG9ydCBmdWxscGFnZSBmcm9tICdmdWxscGFnZS5qcyc7XHJcblxyXG52YXIgZnVsbFBhZ2VJbnN0YW5jZSA9IG5ldyBmdWxscGFnZSgnI215RnVsbHBhZ2UnLCB7XHJcbiAgICBuYXZpZ2F0aW9uOiB0cnVlLFxyXG4gICAgc2VjdGlvbnNDb2xvcjogWycjZmY1ZjQ1JywgJyMwNzk4ZWMnLCAnI2ZjNmM3YycsICdncmV5J11cclxufSk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9