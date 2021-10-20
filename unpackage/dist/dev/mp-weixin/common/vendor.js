(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 4);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

function getLocale() {
  // 优先使用 $locale
  var app = getApp({
    allowDefault: true });

  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return wx.getSystemInfoSync().language || 'zh-Hans';
}

function setLocale(locale) {
  var app = getApp();
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {return fn({
        locale: locale });});

    return true;
  }
  return false;
}

var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale,
  setLocale: setLocale,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse || !wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options, isComponent) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"写寄语","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var locale;

{
  locale = wx.getSystemInfoSync().language;
}

var i18n = (0, _uniI18n.initVueI18n)(
locale,
{});

var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {var _this2 = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this2.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    } } };


var setLocale$1 = i18n.setLocale;
var getLocale$1 = i18n.getLocale;

function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale() });

  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {return watch(v);});
    } });

}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initAppLocale(_vue.default, vm, wx.getSystemInfoSync().language || 'zh-Hans');

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      appOptions.onShow.apply(vm, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      appOptions.onHide.apply(vm, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(vm, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 11:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 12:
/*!*****************************************************************!*\
  !*** /Users/chengheai/code/private/write-messages/api/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var api = {};

var files = __webpack_require__(13);
var bizs = files.keys().filter(function (it) {return it !== './index.js';});
bizs.forEach(function (it) {
  var name = it.substring(2, it.length - 3);
  api[name] = files(it);
});var _default =

api;exports.default = _default;

/***/ }),

/***/ 125:
/*!************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 29));var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 4);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _createForOfIteratorHelper(o, allowArrayLike) {var it;if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e26) {throw _e26;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = o[Symbol.iterator]();}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e27) {didErr = true;err = _e27;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _createSuper(Derived) {var hasNativeReflectConstruct = _isNativeReflectConstruct();return function _createSuperInternal() {var Super = _getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _wrapNativeSuper(Class) {var _cache = typeof Map === "function" ? new Map() : undefined;_wrapNativeSuper = function _wrapNativeSuper(Class) {if (Class === null || !_isNativeFunction(Class)) return Class;if (typeof Class !== "function") {throw new TypeError("Super expression must either be null or a function");}if (typeof _cache !== "undefined") {if (_cache.has(Class)) return _cache.get(Class);_cache.set(Class, Wrapper);}function Wrapper() {return _construct(Class, arguments, _getPrototypeOf(this).constructor);}Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });return _setPrototypeOf(Wrapper, Class);};return _wrapNativeSuper(Class);}function _construct(Parent, args, Class) {if (_isNativeReflectConstruct()) {_construct = Reflect.construct;} else {_construct = function _construct(Parent, args, Class) {var a = [null];a.push.apply(a, args);var Constructor = Function.bind.apply(Parent, a);var instance = new Constructor();if (Class) _setPrototypeOf(instance, Class.prototype);return instance;};}return _construct.apply(null, arguments);}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _isNativeFunction(fn) {return Function.toString.call(fn).indexOf("[native code]") !== -1;}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}"undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;function t(e) {return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;}function n(e, t, n) {return e(n = { path: t, exports: {}, require: function require(e, t) {return function () {throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");}(null == t && n.path);} }, n.exports), n.exports;}var s = n(function (e, t) {var n;e.exports = (n = n || function (e, t) {var n = Object.create || function () {function e() {}return function (t) {var n;return e.prototype = t, n = new e(), e.prototype = null, n;};}(),s = {},r = s.lib = {},o = r.Base = { extend: function extend(e) {var t = n(this);return e && t.mixIn(e), t.hasOwnProperty("init") && this.init !== t.init || (t.init = function () {t.$super.init.apply(this, arguments);}), t.init.prototype = t, t.$super = this, t;}, create: function create() {var e = this.extend();return e.init.apply(e, arguments), e;}, init: function init() {}, mixIn: function mixIn(e) {for (var t in e) {e.hasOwnProperty(t) && (this[t] = e[t]);}e.hasOwnProperty("toString") && (this.toString = e.toString);}, clone: function clone() {return this.init.prototype.extend(this);} },i = r.WordArray = o.extend({ init: function init(e, n) {e = this.words = e || [], this.sigBytes = n != t ? n : 4 * e.length;}, toString: function toString(e) {return (e || c).stringify(this);}, concat: function concat(e) {var t = this.words,n = e.words,s = this.sigBytes,r = e.sigBytes;if (this.clamp(), s % 4) for (var o = 0; o < r; o++) {var i = n[o >>> 2] >>> 24 - o % 4 * 8 & 255;t[s + o >>> 2] |= i << 24 - (s + o) % 4 * 8;} else for (o = 0; o < r; o += 4) {t[s + o >>> 2] = n[o >>> 2];}return this.sigBytes += r, this;}, clamp: function clamp() {var t = this.words,n = this.sigBytes;t[n >>> 2] &= 4294967295 << 32 - n % 4 * 8, t.length = e.ceil(n / 4);}, clone: function clone() {var e = o.clone.call(this);return e.words = this.words.slice(0), e;}, random: function random(t) {for (var n, s = [], r = function r(t) {t = t;var n = 987654321,s = 4294967295;return function () {var r = ((n = 36969 * (65535 & n) + (n >> 16) & s) << 16) + (t = 18e3 * (65535 & t) + (t >> 16) & s) & s;return r /= 4294967296, (r += .5) * (e.random() > .5 ? 1 : -1);};}, o = 0; o < t; o += 4) {var a = r(4294967296 * (n || e.random()));n = 987654071 * a(), s.push(4294967296 * a() | 0);}return new i.init(s, t);} }),a = s.enc = {},c = a.Hex = { stringify: function stringify(e) {for (var t = e.words, n = e.sigBytes, s = [], r = 0; r < n; r++) {var o = t[r >>> 2] >>> 24 - r % 4 * 8 & 255;s.push((o >>> 4).toString(16)), s.push((15 & o).toString(16));}return s.join("");}, parse: function parse(e) {for (var t = e.length, n = [], s = 0; s < t; s += 2) {n[s >>> 3] |= parseInt(e.substr(s, 2), 16) << 24 - s % 8 * 4;}return new i.init(n, t / 2);} },u = a.Latin1 = { stringify: function stringify(e) {for (var t = e.words, n = e.sigBytes, s = [], r = 0; r < n; r++) {var o = t[r >>> 2] >>> 24 - r % 4 * 8 & 255;s.push(String.fromCharCode(o));}return s.join("");}, parse: function parse(e) {for (var t = e.length, n = [], s = 0; s < t; s++) {n[s >>> 2] |= (255 & e.charCodeAt(s)) << 24 - s % 4 * 8;}return new i.init(n, t);} },h = a.Utf8 = { stringify: function stringify(e) {try {return decodeURIComponent(escape(u.stringify(e)));} catch (e) {throw new Error("Malformed UTF-8 data");}}, parse: function parse(e) {return u.parse(unescape(encodeURIComponent(e)));} },l = r.BufferedBlockAlgorithm = o.extend({ reset: function reset() {this._data = new i.init(), this._nDataBytes = 0;}, _append: function _append(e) {"string" == typeof e && (e = h.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes;}, _process: function _process(t) {var n = this._data,s = n.words,r = n.sigBytes,o = this.blockSize,a = r / (4 * o),c = (a = t ? e.ceil(a) : e.max((0 | a) - this._minBufferSize, 0)) * o,u = e.min(4 * c, r);if (c) {for (var h = 0; h < c; h += o) {this._doProcessBlock(s, h);}var l = s.splice(0, c);n.sigBytes -= u;}return new i.init(l, u);}, clone: function clone() {var e = o.clone.call(this);return e._data = this._data.clone(), e;}, _minBufferSize: 0 }),d = (r.Hasher = l.extend({ cfg: o.extend(), init: function init(e) {this.cfg = this.cfg.extend(e), this.reset();}, reset: function reset() {l.reset.call(this), this._doReset();}, update: function update(e) {return this._append(e), this._process(), this;}, finalize: function finalize(e) {return e && this._append(e), this._doFinalize();}, blockSize: 16, _createHelper: function _createHelper(e) {return function (t, n) {return new e.init(n).finalize(t);};}, _createHmacHelper: function _createHmacHelper(e) {return function (t, n) {return new d.HMAC.init(e, n).finalize(t);};} }), s.algo = {});return s;}(Math), n);}),r = (n(function (e, t) {var n;e.exports = (n = s, function (e) {var t = n,s = t.lib,r = s.WordArray,o = s.Hasher,i = t.algo,a = [];!function () {for (var t = 0; t < 64; t++) {a[t] = 4294967296 * e.abs(e.sin(t + 1)) | 0;}}();var c = i.MD5 = o.extend({ _doReset: function _doReset() {this._hash = new r.init([1732584193, 4023233417, 2562383102, 271733878]);}, _doProcessBlock: function _doProcessBlock(e, t) {for (var n = 0; n < 16; n++) {var s = t + n,r = e[s];e[s] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8);}var o = this._hash.words,i = e[t + 0],c = e[t + 1],f = e[t + 2],p = e[t + 3],g = e[t + 4],m = e[t + 5],y = e[t + 6],_ = e[t + 7],w = e[t + 8],v = e[t + 9],S = e[t + 10],k = e[t + 11],T = e[t + 12],P = e[t + 13],I = e[t + 14],A = e[t + 15],E = o[0],b = o[1],O = o[2],U = o[3];E = u(E, b, O, U, i, 7, a[0]), U = u(U, E, b, O, c, 12, a[1]), O = u(O, U, E, b, f, 17, a[2]), b = u(b, O, U, E, p, 22, a[3]), E = u(E, b, O, U, g, 7, a[4]), U = u(U, E, b, O, m, 12, a[5]), O = u(O, U, E, b, y, 17, a[6]), b = u(b, O, U, E, _, 22, a[7]), E = u(E, b, O, U, w, 7, a[8]), U = u(U, E, b, O, v, 12, a[9]), O = u(O, U, E, b, S, 17, a[10]), b = u(b, O, U, E, k, 22, a[11]), E = u(E, b, O, U, T, 7, a[12]), U = u(U, E, b, O, P, 12, a[13]), O = u(O, U, E, b, I, 17, a[14]), E = h(E, b = u(b, O, U, E, A, 22, a[15]), O, U, c, 5, a[16]), U = h(U, E, b, O, y, 9, a[17]), O = h(O, U, E, b, k, 14, a[18]), b = h(b, O, U, E, i, 20, a[19]), E = h(E, b, O, U, m, 5, a[20]), U = h(U, E, b, O, S, 9, a[21]), O = h(O, U, E, b, A, 14, a[22]), b = h(b, O, U, E, g, 20, a[23]), E = h(E, b, O, U, v, 5, a[24]), U = h(U, E, b, O, I, 9, a[25]), O = h(O, U, E, b, p, 14, a[26]), b = h(b, O, U, E, w, 20, a[27]), E = h(E, b, O, U, P, 5, a[28]), U = h(U, E, b, O, f, 9, a[29]), O = h(O, U, E, b, _, 14, a[30]), E = l(E, b = h(b, O, U, E, T, 20, a[31]), O, U, m, 4, a[32]), U = l(U, E, b, O, w, 11, a[33]), O = l(O, U, E, b, k, 16, a[34]), b = l(b, O, U, E, I, 23, a[35]), E = l(E, b, O, U, c, 4, a[36]), U = l(U, E, b, O, g, 11, a[37]), O = l(O, U, E, b, _, 16, a[38]), b = l(b, O, U, E, S, 23, a[39]), E = l(E, b, O, U, P, 4, a[40]), U = l(U, E, b, O, i, 11, a[41]), O = l(O, U, E, b, p, 16, a[42]), b = l(b, O, U, E, y, 23, a[43]), E = l(E, b, O, U, v, 4, a[44]), U = l(U, E, b, O, T, 11, a[45]), O = l(O, U, E, b, A, 16, a[46]), E = d(E, b = l(b, O, U, E, f, 23, a[47]), O, U, i, 6, a[48]), U = d(U, E, b, O, _, 10, a[49]), O = d(O, U, E, b, I, 15, a[50]), b = d(b, O, U, E, m, 21, a[51]), E = d(E, b, O, U, T, 6, a[52]), U = d(U, E, b, O, p, 10, a[53]), O = d(O, U, E, b, S, 15, a[54]), b = d(b, O, U, E, c, 21, a[55]), E = d(E, b, O, U, w, 6, a[56]), U = d(U, E, b, O, A, 10, a[57]), O = d(O, U, E, b, y, 15, a[58]), b = d(b, O, U, E, P, 21, a[59]), E = d(E, b, O, U, g, 6, a[60]), U = d(U, E, b, O, k, 10, a[61]), O = d(O, U, E, b, f, 15, a[62]), b = d(b, O, U, E, v, 21, a[63]), o[0] = o[0] + E | 0, o[1] = o[1] + b | 0, o[2] = o[2] + O | 0, o[3] = o[3] + U | 0;}, _doFinalize: function _doFinalize() {var t = this._data,n = t.words,s = 8 * this._nDataBytes,r = 8 * t.sigBytes;n[r >>> 5] |= 128 << 24 - r % 32;var o = e.floor(s / 4294967296),i = s;n[15 + (r + 64 >>> 9 << 4)] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8), n[14 + (r + 64 >>> 9 << 4)] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8), t.sigBytes = 4 * (n.length + 1), this._process();for (var a = this._hash, c = a.words, u = 0; u < 4; u++) {var h = c[u];c[u] = 16711935 & (h << 8 | h >>> 24) | 4278255360 & (h << 24 | h >>> 8);}return a;}, clone: function clone() {var e = o.clone.call(this);return e._hash = this._hash.clone(), e;} });function u(e, t, n, s, r, o, i) {var a = e + (t & n | ~t & s) + r + i;return (a << o | a >>> 32 - o) + t;}function h(e, t, n, s, r, o, i) {var a = e + (t & s | n & ~s) + r + i;return (a << o | a >>> 32 - o) + t;}function l(e, t, n, s, r, o, i) {var a = e + (t ^ n ^ s) + r + i;return (a << o | a >>> 32 - o) + t;}function d(e, t, n, s, r, o, i) {var a = e + (n ^ (t | ~s)) + r + i;return (a << o | a >>> 32 - o) + t;}t.MD5 = o._createHelper(c), t.HmacMD5 = o._createHmacHelper(c);}(Math), n.MD5);}), n(function (e, t) {var n, r, o;e.exports = (r = (n = s).lib.Base, o = n.enc.Utf8, void (n.algo.HMAC = r.extend({ init: function init(e, t) {e = this._hasher = new e.init(), "string" == typeof t && (t = o.parse(t));var n = e.blockSize,s = 4 * n;t.sigBytes > s && (t = e.finalize(t)), t.clamp();for (var r = this._oKey = t.clone(), i = this._iKey = t.clone(), a = r.words, c = i.words, u = 0; u < n; u++) {a[u] ^= 1549556828, c[u] ^= 909522486;}r.sigBytes = i.sigBytes = s, this.reset();}, reset: function reset() {var e = this._hasher;e.reset(), e.update(this._iKey);}, update: function update(e) {return this._hasher.update(e), this;}, finalize: function finalize(e) {var t = this._hasher,n = t.finalize(e);return t.reset(), t.finalize(this._oKey.clone().concat(n));} })));}), n(function (e, t) {e.exports = s.HmacMD5;}));function o(e) {return Object.prototype.toString.call(e).slice(8, -1).toLowerCase();}function i(e) {return "object" === o(e);}var a = /*#__PURE__*/function (_Error) {_inherits(a, _Error);var _super = _createSuper(a);function a(e, t) {var _this;_classCallCheck(this, a);_this = _super.call(this, e), _this.code = t;return _this;}return a;}( /*#__PURE__*/_wrapNativeSuper(Error));function c(e) {return e && "string" == typeof e ? JSON.parse(e) : e;}var u = "development" === "development",h = "mp-weixin",l = c(undefined),d = c([]),f = true;var p = "";try {{var _e2 = __webpack_require__(/*! uni-stat-config */ 126).default || __webpack_require__(/*! uni-stat-config */ 126);p = _e2.appid;}} catch (e) {}var g = {};function m(e) {var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var n, s;return n = g, s = e, Object.prototype.hasOwnProperty.call(n, s) || (g[e] = t), g[e];}"app-plus" === h && (g = uni._globalUniCloudObj ? uni._globalUniCloudObj : uni._globalUniCloudObj = {});var y = ["invoke", "success", "fail", "complete"],_ = m("_globalUniCloudInterceptor");function w(e, t) {_[e] || (_[e] = {}), i(t) && Object.keys(t).forEach(function (n) {y.indexOf(n) > -1 && function (e, t, n) {var s = _[e][t];s || (s = _[e][t] = []), -1 === s.indexOf(n) && "function" == typeof n && s.push(n);}(e, n, t[n]);});}function v(e, t) {_[e] || (_[e] = {}), i(t) ? Object.keys(t).forEach(function (n) {y.indexOf(n) > -1 && function (e, t, n) {var s = _[e][t];if (!s) return;var r = s.indexOf(n);r > -1 && s.splice(r, 1);}(e, n, t[n]);}) : delete _[e];}function S(e, t) {return e && 0 !== e.length ? e.reduce(function (e, n) {return e.then(function () {return n(t);});}, Promise.resolve()) : Promise.resolve();}function k(e, t) {return _[e] && _[e][t] || [];}function T(e, t) {return t ? function (n) {var _this2 = this;var s = "callFunction" === t && "DCloud-clientDB" === (n && n.name);var r;r = this.isReady ? Promise.resolve() : this.initUniCloud, n = n || {};var o = r.then(function () {return s ? Promise.resolve() : S(k(t, "invoke"), n);}).then(function () {return e.call(_this2, n);}).then(function (e) {return s ? Promise.resolve(e) : S(k(t, "success"), e).then(function () {return S(k(t, "complete"), e);}).then(function () {return Promise.resolve(e);});}, function (e) {return s ? Promise.reject(e) : S(k(t, "fail"), e).then(function () {return S(k(t, "complete"), e);}).then(function () {return Promise.reject(e);});});if (!(n.success || n.fail || n.complete)) return o;o.then(function (e) {n.success && n.success(e), n.complete && n.complete(e);}).catch(function (e) {n.fail && n.fail(e), n.complete && n.complete(e);});} : function (t) {if (!((t = t || {}).success || t.fail || t.complete)) return e.call(this, t);e.call(this, t).then(function (e) {t.success && t.success(e), t.complete && t.complete(e);}, function (e) {t.fail && t.fail(e), t.complete && t.complete(e);});};}var P = /*#__PURE__*/function (_Error2) {_inherits(P, _Error2);var _super2 = _createSuper(P);function P(e) {var _this3;_classCallCheck(this, P);_this3 = _super2.call(this, e.message), _this3.errMsg = e.message || "", Object.defineProperties(_assertThisInitialized(_this3), { code: { get: function get() {return e.code;} }, requestId: { get: function get() {return e.requestId;} }, message: { get: function get() {return this.errMsg;}, set: function set(e) {this.errMsg = e;} } });return _this3;}return P;}( /*#__PURE__*/_wrapNativeSuper(Error));var _e3 = (0, _uniI18n.initVueI18n)({ "zh-Hans": { "uniCloud.init.paramRequired": "缺少参数：{param}", "uniCloud.uploadFile.fileError": "filePath应为File对象" }, "zh-Hant": { "uniCloud.init.paramRequired": "缺少参数：{param}", "uniCloud.uploadFile.fileError": "filePath应为File对象" }, en: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, fr: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, es: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" } }, "zh-Hans"),I = _e3.t,A = _e3.setLocale,E = _e3.getLocale;var b, O;function U() {var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;var t = "";for (; t.length < e;) {t += Math.random().toString(32).substring(2);}return t.substring(0, e);}function C() {var _uni$getSystemInfoSyn = uni.getSystemInfoSync(),e = _uni$getSystemInfoSyn.deviceId;return { PLATFORM: h, OS: O, APPID: p, LOCALE: E(), DEVICEID: e, CLIENT_SDK_VERSION: "1.0.9" };}function D() {if ("n" === x()) {try {b = plus.runtime.getDCloudId();} catch (e) {b = "";}return b;}return b || (b = U(32), uni.setStorage({ key: "__DC_CLOUD_UUID", data: b })), b;}function x() {var _appPlus$h5$mpWeixi;return (_appPlus$h5$mpWeixi = { "app-plus": "n", h5: "h5", "mp-weixin": "wx" }, _defineProperty(_appPlus$h5$mpWeixi, ["y", "a", "p", "mp-ali"].reverse().join(""), "ali"), _defineProperty(_appPlus$h5$mpWeixi, "mp-baidu", "bd"), _defineProperty(_appPlus$h5$mpWeixi, "mp-toutiao", "tt"), _defineProperty(_appPlus$h5$mpWeixi, "mp-qq", "qq"), _defineProperty(_appPlus$h5$mpWeixi, "quickapp-native", "qn"), _appPlus$h5$mpWeixi)[h];}var R = { sign: function sign(e, t) {var n = "";return Object.keys(e).sort().forEach(function (t) {e[t] && (n = n + "&" + t + "=" + e[t]);}), n = n.slice(1), r(n, t).toString();}, wrappedRequest: function wrappedRequest(e, t) {return new Promise(function (n, s) {t(Object.assign(e, { complete: function complete(e) {e || (e = {}), u && "h5" === h && e.errMsg && 0 === e.errMsg.indexOf("request:fail") && console.warn("发布H5，需要在uniCloud后台操作，绑定安全域名，否则会因为跨域问题而无法访问。教程参考：https://uniapp.dcloud.io/uniCloud/quickstart?id=useinh5");var t = e.data && e.data.header && e.data.header["x-serverless-request-id"] || e.header && e.header["request-id"];if (!e.statusCode || e.statusCode >= 400) return s(new P({ code: "SYS_ERR", message: e.errMsg || "request:fail", requestId: t }));var r = e.data;if (r.error) return s(new P({ code: r.error.code, message: r.error.message, requestId: t }));r.result = r.data, r.requestId = t, delete r.data, n(r);} }));});} };var q = { request: function request(e) {return uni.request(e);}, uploadFile: function uploadFile(e) {return uni.uploadFile(e);}, setStorageSync: function setStorageSync(e, t) {return uni.setStorageSync(e, t);}, getStorageSync: function getStorageSync(e) {return uni.getStorageSync(e);}, removeStorageSync: function removeStorageSync(e) {return uni.removeStorageSync(e);}, clearStorageSync: function clearStorageSync() {return uni.clearStorageSync();} };var F = /*#__PURE__*/function () {function F(e) {_classCallCheck(this, F);["spaceId", "clientSecret"].forEach(function (t) {if (!Object.prototype.hasOwnProperty.call(e, t)) throw new Error(I("uniCloud.init.paramRequired", { param: t }));}), this.config = Object.assign({}, { endpoint: "https://api.bspapp.com" }, e), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId, this.adapter = q, this._getAccessTokenPromise = null, this._getAccessTokenPromiseStatus = null;}_createClass(F, [{ key: "setAccessToken", value: function setAccessToken(e) {this.accessToken = e;} }, { key: "requestWrapped", value: function requestWrapped(e) {return R.wrappedRequest(e, this.adapter.request);} }, { key: "requestAuth", value: function requestAuth(e) {return this.requestWrapped(e);} }, { key: "request", value: function request(e, t) {var _this4 = this;return Promise.resolve().then(function () {return _this4.hasAccessToken ? t ? _this4.requestWrapped(e) : _this4.requestWrapped(e).catch(function (t) {return new Promise(function (e, n) {!t || "GATEWAY_INVALID_TOKEN" !== t.code && "InvalidParameter.InvalidToken" !== t.code ? n(t) : e();}).then(function () {return _this4.getAccessToken();}).then(function () {var t = _this4.rebuildRequest(e);return _this4.request(t, !0);});}) : _this4.getAccessToken().then(function () {var t = _this4.rebuildRequest(e);return _this4.request(t, !0);});});} }, { key: "rebuildRequest", value: function rebuildRequest(e) {var t = Object.assign({}, e);return t.data.token = this.accessToken, t.header["x-basement-token"] = this.accessToken, t.header["x-serverless-sign"] = R.sign(t.data, this.config.clientSecret), t;} }, { key: "setupRequest", value: function setupRequest(e, t) {var n = Object.assign({}, e, { spaceId: this.config.spaceId, timestamp: Date.now() }),s = { "Content-Type": "application/json" };return "auth" !== t && (n.token = this.accessToken, s["x-basement-token"] = this.accessToken), s["x-serverless-sign"] = R.sign(n, this.config.clientSecret), { url: this.config.requestUrl, method: "POST", data: n, dataType: "json", header: s };} }, { key: "getAccessToken", value: function getAccessToken() {var _this5 = this;if ("pending" === this._getAccessTokenPromiseStatus) return this._getAccessTokenPromise;this._getAccessTokenPromiseStatus = "pending";return this._getAccessTokenPromise = this.requestAuth(this.setupRequest({ method: "serverless.auth.user.anonymousAuthorize", params: "{}" }, "auth")).then(function (e) {return new Promise(function (t, n) {e.result && e.result.accessToken ? (_this5.setAccessToken(e.result.accessToken), _this5._getAccessTokenPromiseStatus = "fulfilled", t(_this5.accessToken)) : (_this5._getAccessTokenPromiseStatus = "rejected", n(new P({ code: "AUTH_FAILED", message: "获取accessToken失败" })));});}, function (e) {return _this5._getAccessTokenPromiseStatus = "rejected", Promise.reject(e);}), this._getAccessTokenPromise;} }, { key: "authorize", value: function authorize() {this.getAccessToken();} }, { key: "callFunction", value: function callFunction(e) {var t = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e.name, functionArgs: e.data || {} }) };return this.request(this.setupRequest(t));} }, { key: "getOSSUploadOptionsFromPath", value: function getOSSUploadOptionsFromPath(e) {var t = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e) };return this.request(this.setupRequest(t));} }, { key: "uploadFileToOSS", value: function uploadFileToOSS(_ref) {var _this6 = this;var e = _ref.url,t = _ref.formData,n = _ref.name,s = _ref.filePath,r = _ref.fileType,o = _ref.onUploadProgress;return new Promise(function (i, a) {var c = _this6.adapter.uploadFile({ url: e, formData: t, name: n, filePath: s, fileType: r, header: { "X-OSS-server-side-encrpytion": "AES256" }, success: function success(e) {e && e.statusCode < 400 ? i(e) : a(new P({ code: "UPLOAD_FAILED", message: "文件上传失败" }));}, fail: function fail(e) {a(new P({ code: e.code || "UPLOAD_FAILED", message: e.message || e.errMsg || "文件上传失败" }));} });"function" == typeof o && c && "function" == typeof c.onProgressUpdate && c.onProgressUpdate(function (e) {o({ loaded: e.totalBytesSent, total: e.totalBytesExpectedToSend });});});} }, { key: "reportOSSUpload", value: function reportOSSUpload(e) {var t = { method: "serverless.file.resource.report", params: JSON.stringify(e) };return this.request(this.setupRequest(t));} }, { key: "uploadFile", value: function uploadFile(_ref2) {var _this7 = this;var e = _ref2.filePath,t = _ref2.cloudPath,_ref2$fileType = _ref2.fileType,n = _ref2$fileType === void 0 ? "image" : _ref2$fileType,s = _ref2.onUploadProgress,r = _ref2.config;if ("string" !== o(t)) throw new P({ code: "INVALID_PARAM", message: "cloudPath必须为字符串类型" });if (!(t = t.trim())) throw new P({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });if (/:\/\//.test(t)) throw new P({ code: "INVALID_PARAM", message: "cloudPath不合法" });var i = r && r.envType || this.config.envType;var a, c;return this.getOSSUploadOptionsFromPath({ env: i, filename: t }).then(function (t) {var r = t.result;a = r.id, c = "https://" + r.cdnDomain + "/" + r.ossPath;var o = { url: "https://" + r.host, formData: { "Cache-Control": "max-age=2592000", "Content-Disposition": "attachment", OSSAccessKeyId: r.accessKeyId, Signature: r.signature, host: r.host, id: a, key: r.ossPath, policy: r.policy, success_action_status: 200 }, fileName: "file", name: "file", filePath: e, fileType: n };return _this7.uploadFileToOSS(Object.assign({}, o, { onUploadProgress: s }));}).then(function () {return _this7.reportOSSUpload({ id: a });}).then(function (t) {return new Promise(function (n, s) {t.success ? n({ success: !0, filePath: e, fileID: c }) : s(new P({ code: "UPLOAD_FAILED", message: "文件上传失败" }));});});} }, { key: "deleteFile", value: function deleteFile(_ref3) {var e = _ref3.fileList;var t = { method: "serverless.file.resource.delete", params: JSON.stringify({ id: e[0] }) };return this.request(this.setupRequest(t));} }, { key: "getTempFileURL", value: function getTempFileURL() {var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref4.fileList;return new Promise(function (t, n) {Array.isArray(e) && 0 !== e.length || n(new P({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" })), t({ fileList: e.map(function (e) {return { fileID: e, tempFileURL: e };}) });});} }, { key: "hasAccessToken", get: function get() {return !!this.accessToken;} }]);return F;}();var L = { init: function init(e) {var t = new F(e),n = { signInAnonymously: function signInAnonymously() {return t.authorize();}, getLoginState: function getLoginState() {return Promise.resolve(!1);} };return t.auth = function () {return n;}, t.customAuth = t.auth, t;} },N = "undefined" != typeof location && "http:" === location.protocol ? "http:" : "https:";var M;!function (e) {e.local = "local", e.none = "none", e.session = "session";}(M || (M = {}));var $ = function $() {};var j = function j() {var e;if (!Promise) {e = function e() {}, e.promise = {};var _t = function _t() {throw new Error('Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.');};return Object.defineProperty(e.promise, "then", { get: _t }), Object.defineProperty(e.promise, "catch", { get: _t }), e;}var t = new Promise(function (t, n) {e = function e(_e4, s) {return _e4 ? n(_e4) : t(s);};});return e.promise = t, e;};function K(e) {return void 0 === e;}function B(e) {return "[object Null]" === Object.prototype.toString.call(e);}var H;function W(e) {var t = (n = e, "[object Array]" === Object.prototype.toString.call(n) ? e : [e]);var n;var _iterator = _createForOfIteratorHelper(t),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var _e5 = _step.value;var _t2 = _e5.isMatch,_n = _e5.genAdapter,_s = _e5.runtime;if (_t2()) return { adapter: _n(), runtime: _s };}} catch (err) {_iterator.e(err);} finally {_iterator.f();}}!function (e) {e.WEB = "web", e.WX_MP = "wx_mp";}(H || (H = {}));var z = { adapter: null, runtime: void 0 },V = ["anonymousUuidKey"];var J = /*#__PURE__*/function (_$) {_inherits(J, _$);var _super3 = _createSuper(J);function J() {var _this8;_classCallCheck(this, J);_this8 = _super3.call(this), z.adapter.root.tcbObject || (z.adapter.root.tcbObject = {});return _this8;}_createClass(J, [{ key: "setItem", value: function setItem(e, t) {z.adapter.root.tcbObject[e] = t;} }, { key: "getItem", value: function getItem(e) {return z.adapter.root.tcbObject[e];} }, { key: "removeItem", value: function removeItem(e) {delete z.adapter.root.tcbObject[e];} }, { key: "clear", value: function clear() {delete z.adapter.root.tcbObject;} }]);return J;}($);function Y(e, t) {switch (e) {case "local":return t.localStorage || new J();case "none":return new J();default:return t.sessionStorage || new J();}}var X = /*#__PURE__*/function () {function X(e) {_classCallCheck(this, X);if (!this._storage) {this._persistence = z.adapter.primaryStorage || e.persistence, this._storage = Y(this._persistence, z.adapter);var _t3 = "access_token_".concat(e.env),_n2 = "access_token_expire_".concat(e.env),_s2 = "refresh_token_".concat(e.env),_r = "anonymous_uuid_".concat(e.env),_o = "login_type_".concat(e.env),_i = "user_info_".concat(e.env);this.keys = { accessTokenKey: _t3, accessTokenExpireKey: _n2, refreshTokenKey: _s2, anonymousUuidKey: _r, loginTypeKey: _o, userInfoKey: _i };}}_createClass(X, [{ key: "updatePersistence", value: function updatePersistence(e) {if (e === this._persistence) return;var t = "local" === this._persistence;this._persistence = e;var n = Y(e, z.adapter);for (var _e6 in this.keys) {var _s3 = this.keys[_e6];if (t && V.includes(_e6)) continue;var _r2 = this._storage.getItem(_s3);K(_r2) || B(_r2) || (n.setItem(_s3, _r2), this._storage.removeItem(_s3));}this._storage = n;} }, { key: "setStore", value: function setStore(e, t, n) {if (!this._storage) return;var s = { version: n || "localCachev1", content: t },r = JSON.stringify(s);try {this._storage.setItem(e, r);} catch (e) {throw e;}} }, { key: "getStore", value: function getStore(e, t) {try {if (!this._storage) return;} catch (e) {return "";}t = t || "localCachev1";var n = this._storage.getItem(e);if (!n) return "";if (n.indexOf(t) >= 0) {return JSON.parse(n).content;}return "";} }, { key: "removeStore", value: function removeStore(e) {this._storage.removeItem(e);} }]);return X;}();var G = {},Q = {};function Z(e) {return G[e];}var ee = function ee(e, t) {_classCallCheck(this, ee);this.data = t || null, this.name = e;};var te = /*#__PURE__*/function (_ee) {_inherits(te, _ee);var _super4 = _createSuper(te);function te(e, t) {var _this9;_classCallCheck(this, te);_this9 = _super4.call(this, "error", { error: e, data: t }), _this9.error = e;return _this9;}return te;}(ee);var ne = new ( /*#__PURE__*/function () {function _class() {_classCallCheck(this, _class);this._listeners = {};}_createClass(_class, [{ key: "on", value: function on(e, t) {return function (e, t, n) {n[e] = n[e] || [], n[e].push(t);}(e, t, this._listeners), this;} }, { key: "off", value: function off(e, t) {return function (e, t, n) {if (n && n[e]) {var _s4 = n[e].indexOf(t);-1 !== _s4 && n[e].splice(_s4, 1);}}(e, t, this._listeners), this;} }, { key: "fire", value: function fire(e, t) {if (e instanceof te) return console.error(e.error), this;var n = "string" == typeof e ? new ee(e, t || {}) : e;var s = n.name;if (this._listens(s)) {n.target = this;var _e7 = this._listeners[s] ? _toConsumableArray(this._listeners[s]) : [];var _iterator2 = _createForOfIteratorHelper(_e7),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var _t4 = _step2.value;_t4.call(this, n);}} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}}return this;} }, { key: "_listens", value: function _listens(e) {return this._listeners[e] && this._listeners[e].length > 0;} }]);return _class;}())();function se(e, t) {ne.on(e, t);}function re(e) {var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};ne.fire(e, t);}function oe(e, t) {ne.off(e, t);}var ie = "loginStateChanged",ae = "loginStateExpire",ce = "loginTypeChanged",ue = "anonymousConverted",he = "refreshAccessToken";var le;!function (e) {e.ANONYMOUS = "ANONYMOUS", e.WECHAT = "WECHAT", e.WECHAT_PUBLIC = "WECHAT-PUBLIC", e.WECHAT_OPEN = "WECHAT-OPEN", e.CUSTOM = "CUSTOM", e.EMAIL = "EMAIL", e.USERNAME = "USERNAME", e.NULL = "NULL";}(le || (le = {}));var de = ["auth.getJwt", "auth.logout", "auth.signInWithTicket", "auth.signInAnonymously", "auth.signIn", "auth.fetchAccessTokenWithRefreshToken", "auth.signUpWithEmailAndPassword", "auth.activateEndUserMail", "auth.sendPasswordResetEmail", "auth.resetPasswordWithToken", "auth.isUsernameRegistered"],fe = { "X-SDK-Version": "1.3.5" };function pe(e, t, n) {var s = e[t];e[t] = function (t) {var r = {},o = {};n.forEach(function (n) {var _n$call = n.call(e, t),s = _n$call.data,i = _n$call.headers;Object.assign(r, s), Object.assign(o, i);});var i = t.data;return i && function () {var e;if (e = i, "[object FormData]" !== Object.prototype.toString.call(e)) t.data = _objectSpread(_objectSpread({}, i), r);else for (var _e8 in r) {i.append(_e8, r[_e8]);}}(), t.headers = _objectSpread(_objectSpread({}, t.headers || {}), o), s.call(e, t);};}function ge() {var e = Math.random().toString(16).slice(2);return { data: { seqId: e }, headers: _objectSpread(_objectSpread({}, fe), {}, { "x-seqid": e }) };}var me = /*#__PURE__*/function () {function me() {var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};_classCallCheck(this, me);var t;this.config = e, this._reqClass = new z.adapter.reqClass({ timeout: this.config.timeout, timeoutMsg: "\u8BF7\u6C42\u5728".concat(this.config.timeout / 1e3, "s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD"), restrictedMethods: ["post"] }), this._cache = Z(this.config.env), this._localCache = (t = this.config.env, Q[t]), pe(this._reqClass, "post", [ge]), pe(this._reqClass, "upload", [ge]), pe(this._reqClass, "download", [ge]);}_createClass(me, [{ key: "post", value: function () {var _post = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(e) {return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return this._reqClass.post(e);case 2:return _context.abrupt("return", _context.sent);case 3:case "end":return _context.stop();}}}, _callee, this);}));function post(_x) {return _post.apply(this, arguments);}return post;}() }, { key: "upload", value: function () {var _upload = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(e) {return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return this._reqClass.upload(e);case 2:return _context2.abrupt("return", _context2.sent);case 3:case "end":return _context2.stop();}}}, _callee2, this);}));function upload(_x2) {return _upload.apply(this, arguments);}return upload;}() }, { key: "download", value: function () {var _download = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(e) {return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return this._reqClass.download(e);case 2:return _context3.abrupt("return", _context3.sent);case 3:case "end":return _context3.stop();}}}, _callee3, this);}));function download(_x3) {return _download.apply(this, arguments);}return download;}() }, { key: "refreshAccessToken", value: function () {var _refreshAccessToken2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4() {var e, t;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:this._refreshAccessTokenPromise || (this._refreshAccessTokenPromise = this._refreshAccessToken());_context4.prev = 1;_context4.next = 4;return this._refreshAccessTokenPromise;case 4:e = _context4.sent;_context4.next = 10;break;case 7:_context4.prev = 7;_context4.t0 = _context4["catch"](1);t = _context4.t0;case 10:if (!(this._refreshAccessTokenPromise = null, this._shouldRefreshAccessTokenHook = null, t)) {_context4.next = 12;break;}throw t;case 12:return _context4.abrupt("return", e);case 13:case "end":return _context4.stop();}}}, _callee4, this, [[1, 7]]);}));function refreshAccessToken() {return _refreshAccessToken2.apply(this, arguments);}return refreshAccessToken;}() }, { key: "_refreshAccessToken", value: function () {var _refreshAccessToken3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5() {var _this$_cache$keys, e, t, n, s, r, o, i, a, _e9, _e10, _t5, _s5;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_this$_cache$keys = this._cache.keys, e = _this$_cache$keys.accessTokenKey, t = _this$_cache$keys.accessTokenExpireKey, n = _this$_cache$keys.refreshTokenKey, s = _this$_cache$keys.loginTypeKey, r = _this$_cache$keys.anonymousUuidKey;this._cache.removeStore(e), this._cache.removeStore(t);o = this._cache.getStore(n);if (o) {_context5.next = 5;break;}throw new Error("未登录CloudBase");case 5:i = { refresh_token: o };_context5.next = 8;return this.request("auth.fetchAccessTokenWithRefreshToken", i);case 8:a = _context5.sent;if (!a.data.code) {_context5.next = 21;break;}_e9 = a.data.code;if (!("SIGN_PARAM_INVALID" === _e9 || "REFRESH_TOKEN_EXPIRED" === _e9 || "INVALID_REFRESH_TOKEN" === _e9)) {_context5.next = 20;break;}if (!(this._cache.getStore(s) === le.ANONYMOUS && "INVALID_REFRESH_TOKEN" === _e9)) {_context5.next = 19;break;}_e10 = this._cache.getStore(r);_t5 = this._cache.getStore(n);_context5.next = 17;return this.send("auth.signInAnonymously", { anonymous_uuid: _e10, refresh_token: _t5 });case 17:_s5 = _context5.sent;return _context5.abrupt("return", (this.setRefreshToken(_s5.refresh_token), this._refreshAccessToken()));case 19:re(ae), this._cache.removeStore(n);case 20:throw new Error("\u5237\u65B0access token\u5931\u8D25\uFF1A".concat(a.data.code));case 21:if (!a.data.access_token) {_context5.next = 23;break;}return _context5.abrupt("return", (re(he), this._cache.setStore(e, a.data.access_token), this._cache.setStore(t, a.data.access_token_expire + Date.now()), { accessToken: a.data.access_token, accessTokenExpire: a.data.access_token_expire }));case 23:a.data.refresh_token && (this._cache.removeStore(n), this._cache.setStore(n, a.data.refresh_token), this._refreshAccessToken());case 24:case "end":return _context5.stop();}}}, _callee5, this);}));function _refreshAccessToken() {return _refreshAccessToken3.apply(this, arguments);}return _refreshAccessToken;}() }, { key: "getAccessToken", value: function () {var _getAccessToken = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6() {var _this$_cache$keys2, e, t, n, s, r, o;return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:_this$_cache$keys2 = this._cache.keys, e = _this$_cache$keys2.accessTokenKey, t = _this$_cache$keys2.accessTokenExpireKey, n = _this$_cache$keys2.refreshTokenKey;if (this._cache.getStore(n)) {_context6.next = 3;break;}throw new Error("refresh token不存在，登录状态异常");case 3:s = this._cache.getStore(e), r = this._cache.getStore(t), o = !0;_context6.t0 = this._shouldRefreshAccessTokenHook;if (!_context6.t0) {_context6.next = 9;break;}_context6.next = 8;return this._shouldRefreshAccessTokenHook(s, r);case 8:_context6.t0 = !_context6.sent;case 9:_context6.t1 = _context6.t0;if (!_context6.t1) {_context6.next = 12;break;}o = !1;case 12:return _context6.abrupt("return", (!s || !r || r < Date.now()) && o ? this.refreshAccessToken() : { accessToken: s, accessTokenExpire: r });case 13:case "end":return _context6.stop();}}}, _callee6, this);}));function getAccessToken() {return _getAccessToken.apply(this, arguments);}return getAccessToken;}() }, { key: "request", value: function () {var _request = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee7(e, t, n) {var s, r, o, _e11, i, _e12, _e13, a, c, u, h, l, d, f, p, g;return _regenerator.default.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:s = "x-tcb-trace_".concat(this.config.env);r = "application/x-www-form-urlencoded";o = _objectSpread({ action: e, env: this.config.env, dataVersion: "2019-08-16" }, t);if (!(-1 === de.indexOf(e))) {_context7.next = 10;break;}_e11 = this._cache.keys.refreshTokenKey;_context7.t0 = this._cache.getStore(_e11);if (!_context7.t0) {_context7.next = 10;break;}_context7.next = 9;return this.getAccessToken();case 9:o.access_token = _context7.sent.accessToken;case 10:if ("storage.uploadFile" === e) {i = new FormData();for (_e12 in i) {i.hasOwnProperty(_e12) && void 0 !== i[_e12] && i.append(_e12, o[_e12]);}r = "multipart/form-data";} else {r = "application/json;charset=UTF-8", i = {};for (_e13 in o) {void 0 !== o[_e13] && (i[_e13] = o[_e13]);}}a = { headers: { "content-type": r } };n && n.onUploadProgress && (a.onUploadProgress = n.onUploadProgress);c = this._localCache.getStore(s);c && (a.headers["X-TCB-Trace"] = c);u = t.parse, h = t.inQuery, l = t.search;d = { env: this.config.env };u && (d.parse = !0), h && (d = _objectSpread(_objectSpread({}, h), d));f = function (e, t) {var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var s = /\?/.test(t);var r = "";for (var _e14 in n) {"" === r ? !s && (t += "?") : r += "&", r += "".concat(_e14, "=").concat(encodeURIComponent(n[_e14]));}return /^http(s)?\:\/\//.test(t += r) ? t : "".concat(e).concat(t);}(N, "//tcb-api.tencentcloudapi.com/web", d);l && (f += l);_context7.next = 22;return this.post(_objectSpread({ url: f, data: i }, a));case 22:p = _context7.sent;g = p.header && p.header["x-tcb-trace"];if (!(g && this._localCache.setStore(s, g), 200 !== Number(p.status) && 200 !== Number(p.statusCode) || !p.data)) {_context7.next = 26;break;}throw new Error("network request error");case 26:return _context7.abrupt("return", p);case 27:case "end":return _context7.stop();}}}, _callee7, this);}));function request(_x4, _x5, _x6) {return _request.apply(this, arguments);}return request;}() }, { key: "send", value: function () {var _send = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee8(e) {var t,n,_n3,_args8 = arguments;return _regenerator.default.wrap(function _callee8$(_context8) {while (1) {switch (_context8.prev = _context8.next) {case 0:t = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : {};_context8.next = 3;return this.request(e, t, { onUploadProgress: t.onUploadProgress });case 3:n = _context8.sent;if (!("ACCESS_TOKEN_EXPIRED" === n.data.code && -1 === de.indexOf(e))) {_context8.next = 13;break;}_context8.next = 7;return this.refreshAccessToken();case 7:_context8.next = 9;return this.request(e, t, { onUploadProgress: t.onUploadProgress });case 9:_n3 = _context8.sent;if (!_n3.data.code) {_context8.next = 12;break;}throw new Error("[".concat(_n3.data.code, "] ").concat(_n3.data.message));case 12:return _context8.abrupt("return", _n3.data);case 13:if (!n.data.code) {_context8.next = 15;break;}throw new Error("[".concat(n.data.code, "] ").concat(n.data.message));case 15:return _context8.abrupt("return", n.data);case 16:case "end":return _context8.stop();}}}, _callee8, this);}));function send(_x7) {return _send.apply(this, arguments);}return send;}() }, { key: "setRefreshToken", value: function setRefreshToken(e) {var _this$_cache$keys3 = this._cache.keys,t = _this$_cache$keys3.accessTokenKey,n = _this$_cache$keys3.accessTokenExpireKey,s = _this$_cache$keys3.refreshTokenKey;this._cache.removeStore(t), this._cache.removeStore(n), this._cache.setStore(s, e);} }]);return me;}();var ye = {};function _e(e) {return ye[e];}var we = /*#__PURE__*/function () {function we(e) {_classCallCheck(this, we);this.config = e, this._cache = Z(e.env), this._request = _e(e.env);}_createClass(we, [{ key: "setRefreshToken", value: function setRefreshToken(e) {var _this$_cache$keys4 = this._cache.keys,t = _this$_cache$keys4.accessTokenKey,n = _this$_cache$keys4.accessTokenExpireKey,s = _this$_cache$keys4.refreshTokenKey;this._cache.removeStore(t), this._cache.removeStore(n), this._cache.setStore(s, e);} }, { key: "setAccessToken", value: function setAccessToken(e, t) {var _this$_cache$keys5 = this._cache.keys,n = _this$_cache$keys5.accessTokenKey,s = _this$_cache$keys5.accessTokenExpireKey;this._cache.setStore(n, e), this._cache.setStore(s, t);} }, { key: "refreshUserInfo", value: function () {var _refreshUserInfo = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee9() {var _yield$this$_request$, e;return _regenerator.default.wrap(function _callee9$(_context9) {while (1) {switch (_context9.prev = _context9.next) {case 0:_context9.next = 2;return this._request.send("auth.getUserInfo", {});case 2:_yield$this$_request$ = _context9.sent;e = _yield$this$_request$.data;return _context9.abrupt("return", (this.setLocalUserInfo(e), e));case 5:case "end":return _context9.stop();}}}, _callee9, this);}));function refreshUserInfo() {return _refreshUserInfo.apply(this, arguments);}return refreshUserInfo;}() }, { key: "setLocalUserInfo", value: function setLocalUserInfo(e) {var t = this._cache.keys.userInfoKey;this._cache.setStore(t, e);} }]);return we;}();var ve = /*#__PURE__*/function () {function ve(e) {_classCallCheck(this, ve);if (!e) throw new Error("envId is not defined");this._envId = e, this._cache = Z(this._envId), this._request = _e(this._envId), this.setUserInfo();}_createClass(ve, [{ key: "linkWithTicket", value: function linkWithTicket(e) {if ("string" != typeof e) throw new Error("ticket must be string");return this._request.send("auth.linkWithTicket", { ticket: e });} }, { key: "linkWithRedirect", value: function linkWithRedirect(e) {e.signInWithRedirect();} }, { key: "updatePassword", value: function updatePassword(e, t) {return this._request.send("auth.updatePassword", { oldPassword: t, newPassword: e });} }, { key: "updateEmail", value: function updateEmail(e) {return this._request.send("auth.updateEmail", { newEmail: e });} }, { key: "updateUsername", value: function updateUsername(e) {if ("string" != typeof e) throw new Error("username must be a string");return this._request.send("auth.updateUsername", { username: e });} }, { key: "getLinkedUidList", value: function () {var _getLinkedUidList = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee10() {var _yield$this$_request$2, e, t, n;return _regenerator.default.wrap(function _callee10$(_context10) {while (1) {switch (_context10.prev = _context10.next) {case 0:_context10.next = 2;return this._request.send("auth.getLinkedUidList", {});case 2:_yield$this$_request$2 = _context10.sent;e = _yield$this$_request$2.data;t = !1;n = e.users;return _context10.abrupt("return", (n.forEach(function (e) {e.wxOpenId && e.wxPublicId && (t = !0);}), { users: n, hasPrimaryUid: t }));case 7:case "end":return _context10.stop();}}}, _callee10, this);}));function getLinkedUidList() {return _getLinkedUidList.apply(this, arguments);}return getLinkedUidList;}() }, { key: "setPrimaryUid", value: function setPrimaryUid(e) {return this._request.send("auth.setPrimaryUid", { uid: e });} }, { key: "unlink", value: function unlink(e) {return this._request.send("auth.unlink", { platform: e });} }, { key: "update", value: function () {var _update = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee11(e) {var t, n, s, r, o, i, _yield$this$_request$3, a;return _regenerator.default.wrap(function _callee11$(_context11) {while (1) {switch (_context11.prev = _context11.next) {case 0:t = e.nickName;n = e.gender;s = e.avatarUrl;r = e.province;o = e.country;i = e.city;_context11.next = 8;return this._request.send("auth.updateUserInfo", { nickName: t, gender: n, avatarUrl: s, province: r, country: o, city: i });case 8:_yield$this$_request$3 = _context11.sent;a = _yield$this$_request$3.data;this.setLocalUserInfo(a);case 11:case "end":return _context11.stop();}}}, _callee11, this);}));function update(_x8) {return _update.apply(this, arguments);}return update;}() }, { key: "refresh", value: function () {var _refresh = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee12() {var _yield$this$_request$4, e;return _regenerator.default.wrap(function _callee12$(_context12) {while (1) {switch (_context12.prev = _context12.next) {case 0:_context12.next = 2;return this._request.send("auth.getUserInfo", {});case 2:_yield$this$_request$4 = _context12.sent;e = _yield$this$_request$4.data;return _context12.abrupt("return", (this.setLocalUserInfo(e), e));case 5:case "end":return _context12.stop();}}}, _callee12, this);}));function refresh() {return _refresh.apply(this, arguments);}return refresh;}() }, { key: "setUserInfo", value: function setUserInfo() {var _this10 = this;var e = this._cache.keys.userInfoKey,t = this._cache.getStore(e);["uid", "loginType", "openid", "wxOpenId", "wxPublicId", "unionId", "qqMiniOpenId", "email", "hasPassword", "customUserId", "nickName", "gender", "avatarUrl"].forEach(function (e) {_this10[e] = t[e];}), this.location = { country: t.country, province: t.province, city: t.city };} }, { key: "setLocalUserInfo", value: function setLocalUserInfo(e) {var t = this._cache.keys.userInfoKey;this._cache.setStore(t, e), this.setUserInfo();} }]);return ve;}();var Se = /*#__PURE__*/function () {function Se(e) {_classCallCheck(this, Se);if (!e) throw new Error("envId is not defined");this._cache = Z(e);var _this$_cache$keys6 = this._cache.keys,t = _this$_cache$keys6.refreshTokenKey,n = _this$_cache$keys6.accessTokenKey,s = _this$_cache$keys6.accessTokenExpireKey,r = this._cache.getStore(t),o = this._cache.getStore(n),i = this._cache.getStore(s);this.credential = { refreshToken: r, accessToken: o, accessTokenExpire: i }, this.user = new ve(e);}_createClass(Se, [{ key: "isAnonymousAuth", get: function get() {return this.loginType === le.ANONYMOUS;} }, { key: "isCustomAuth", get: function get() {return this.loginType === le.CUSTOM;} }, { key: "isWeixinAuth", get: function get() {return this.loginType === le.WECHAT || this.loginType === le.WECHAT_OPEN || this.loginType === le.WECHAT_PUBLIC;} }, { key: "loginType", get: function get() {return this._cache.getStore(this._cache.keys.loginTypeKey);} }]);return Se;}();var ke = /*#__PURE__*/function (_we) {_inherits(ke, _we);var _super5 = _createSuper(ke);function ke() {_classCallCheck(this, ke);return _super5.apply(this, arguments);}_createClass(ke, [{ key: "signIn", value: function () {var _signIn = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee13() {var _this$_cache$keys7, e, t, n, s, r, _e15;return _regenerator.default.wrap(function _callee13$(_context13) {while (1) {switch (_context13.prev = _context13.next) {case 0:this._cache.updatePersistence("local");_this$_cache$keys7 = this._cache.keys;e = _this$_cache$keys7.anonymousUuidKey;t = _this$_cache$keys7.refreshTokenKey;n = this._cache.getStore(e) || void 0;s = this._cache.getStore(t) || void 0;_context13.next = 8;return this._request.send("auth.signInAnonymously", { anonymous_uuid: n, refresh_token: s });case 8:r = _context13.sent;if (!(r.uuid && r.refresh_token)) {_context13.next = 20;break;}this._setAnonymousUUID(r.uuid);this.setRefreshToken(r.refresh_token);_context13.next = 14;return this._request.refreshAccessToken();case 14:re(ie);re(ce, { env: this.config.env, loginType: le.ANONYMOUS, persistence: "local" });_e15 = new Se(this.config.env);_context13.next = 19;return _e15.user.refresh();case 19:return _context13.abrupt("return", _e15);case 20:throw new Error("匿名登录失败");case 21:case "end":return _context13.stop();}}}, _callee13, this);}));function signIn() {return _signIn.apply(this, arguments);}return signIn;}() }, { key: "linkAndRetrieveDataWithTicket", value: function () {var _linkAndRetrieveDataWithTicket = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee14(e) {var _this$_cache$keys8, t, n, s, r, o;return _regenerator.default.wrap(function _callee14$(_context14) {while (1) {switch (_context14.prev = _context14.next) {case 0:_this$_cache$keys8 = this._cache.keys;t = _this$_cache$keys8.anonymousUuidKey;n = _this$_cache$keys8.refreshTokenKey;s = this._cache.getStore(t);r = this._cache.getStore(n);_context14.next = 7;return this._request.send("auth.linkAndRetrieveDataWithTicket", { anonymous_uuid: s, refresh_token: r, ticket: e });case 7:o = _context14.sent;if (!o.refresh_token) {_context14.next = 16;break;}this._clearAnonymousUUID();this.setRefreshToken(o.refresh_token);_context14.next = 13;return this._request.refreshAccessToken();case 13:re(ue, { env: this.config.env });re(ce, { loginType: le.CUSTOM, persistence: "local" });return _context14.abrupt("return", { credential: { refreshToken: o.refresh_token } });case 16:throw new Error("匿名转化失败");case 17:case "end":return _context14.stop();}}}, _callee14, this);}));function linkAndRetrieveDataWithTicket(_x9) {return _linkAndRetrieveDataWithTicket.apply(this, arguments);}return linkAndRetrieveDataWithTicket;}() }, { key: "_setAnonymousUUID", value: function _setAnonymousUUID(e) {var _this$_cache$keys9 = this._cache.keys,t = _this$_cache$keys9.anonymousUuidKey,n = _this$_cache$keys9.loginTypeKey;this._cache.removeStore(t), this._cache.setStore(t, e), this._cache.setStore(n, le.ANONYMOUS);} }, { key: "_clearAnonymousUUID", value: function _clearAnonymousUUID() {this._cache.removeStore(this._cache.keys.anonymousUuidKey);} }]);return ke;}(we);var Te = /*#__PURE__*/function (_we2) {_inherits(Te, _we2);var _super6 = _createSuper(Te);function Te() {_classCallCheck(this, Te);return _super6.apply(this, arguments);}_createClass(Te, [{ key: "signIn", value: function () {var _signIn2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee15(e) {var t, n;return _regenerator.default.wrap(function _callee15$(_context15) {while (1) {switch (_context15.prev = _context15.next) {case 0:if (!("string" != typeof e)) {_context15.next = 2;break;}throw new Error("ticket must be a string");case 2:t = this._cache.keys.refreshTokenKey;_context15.next = 5;return this._request.send("auth.signInWithTicket", { ticket: e, refresh_token: this._cache.getStore(t) || "" });case 5:n = _context15.sent;if (!n.refresh_token) {_context15.next = 15;break;}this.setRefreshToken(n.refresh_token);_context15.next = 10;return this._request.refreshAccessToken();case 10:re(ie);re(ce, { env: this.config.env, loginType: le.CUSTOM, persistence: this.config.persistence });_context15.next = 14;return this.refreshUserInfo();case 14:return _context15.abrupt("return", new Se(this.config.env));case 15:throw new Error("自定义登录失败");case 16:case "end":return _context15.stop();}}}, _callee15, this);}));function signIn(_x10) {return _signIn2.apply(this, arguments);}return signIn;}() }]);return Te;}(we);var Pe = /*#__PURE__*/function (_we3) {_inherits(Pe, _we3);var _super7 = _createSuper(Pe);function Pe() {_classCallCheck(this, Pe);return _super7.apply(this, arguments);}_createClass(Pe, [{ key: "signIn", value: function () {var _signIn3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee16(e, t) {var n, s, r, o, i;return _regenerator.default.wrap(function _callee16$(_context16) {while (1) {switch (_context16.prev = _context16.next) {case 0:if (!("string" != typeof e)) {_context16.next = 2;break;}throw new Error("email must be a string");case 2:n = this._cache.keys.refreshTokenKey;_context16.next = 5;return this._request.send("auth.signIn", { loginType: "EMAIL", email: e, password: t, refresh_token: this._cache.getStore(n) || "" });case 5:s = _context16.sent;r = s.refresh_token;o = s.access_token;i = s.access_token_expire;if (!r) {_context16.next = 22;break;}this.setRefreshToken(r);if (!(o && i)) {_context16.next = 15;break;}this.setAccessToken(o, i);_context16.next = 17;break;case 15:_context16.next = 17;return this._request.refreshAccessToken();case 17:_context16.next = 19;return this.refreshUserInfo();case 19:re(ie);re(ce, { env: this.config.env, loginType: le.EMAIL, persistence: this.config.persistence });return _context16.abrupt("return", new Se(this.config.env));case 22:throw s.code ? new Error("\u90AE\u7BB1\u767B\u5F55\u5931\u8D25: [".concat(s.code, "] ").concat(s.message)) : new Error("邮箱登录失败");case 23:case "end":return _context16.stop();}}}, _callee16, this);}));function signIn(_x11, _x12) {return _signIn3.apply(this, arguments);}return signIn;}() }, { key: "activate", value: function () {var _activate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee17(e) {return _regenerator.default.wrap(function _callee17$(_context17) {while (1) {switch (_context17.prev = _context17.next) {case 0:return _context17.abrupt("return", this._request.send("auth.activateEndUserMail", { token: e }));case 1:case "end":return _context17.stop();}}}, _callee17, this);}));function activate(_x13) {return _activate.apply(this, arguments);}return activate;}() }, { key: "resetPasswordWithToken", value: function () {var _resetPasswordWithToken = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee18(e, t) {return _regenerator.default.wrap(function _callee18$(_context18) {while (1) {switch (_context18.prev = _context18.next) {case 0:return _context18.abrupt("return", this._request.send("auth.resetPasswordWithToken", { token: e, newPassword: t }));case 1:case "end":return _context18.stop();}}}, _callee18, this);}));function resetPasswordWithToken(_x14, _x15) {return _resetPasswordWithToken.apply(this, arguments);}return resetPasswordWithToken;}() }]);return Pe;}(we);var Ie = /*#__PURE__*/function (_we4) {_inherits(Ie, _we4);var _super8 = _createSuper(Ie);function Ie() {_classCallCheck(this, Ie);return _super8.apply(this, arguments);}_createClass(Ie, [{ key: "signIn", value: function () {var _signIn4 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee19(e, t) {var n, s, r, o, i;return _regenerator.default.wrap(function _callee19$(_context19) {while (1) {switch (_context19.prev = _context19.next) {case 0:if (!("string" != typeof e)) {_context19.next = 2;break;}throw new Error("username must be a string");case 2:"string" != typeof t && (t = "", console.warn("password is empty"));n = this._cache.keys.refreshTokenKey;_context19.next = 6;return this._request.send("auth.signIn", { loginType: le.USERNAME, username: e, password: t, refresh_token: this._cache.getStore(n) || "" });case 6:s = _context19.sent;r = s.refresh_token;o = s.access_token_expire;i = s.access_token;if (!r) {_context19.next = 23;break;}this.setRefreshToken(r);if (!(i && o)) {_context19.next = 16;break;}this.setAccessToken(i, o);_context19.next = 18;break;case 16:_context19.next = 18;return this._request.refreshAccessToken();case 18:_context19.next = 20;return this.refreshUserInfo();case 20:re(ie);re(ce, { env: this.config.env, loginType: le.USERNAME, persistence: this.config.persistence });return _context19.abrupt("return", new Se(this.config.env));case 23:throw s.code ? new Error("\u7528\u6237\u540D\u5BC6\u7801\u767B\u5F55\u5931\u8D25: [".concat(s.code, "] ").concat(s.message)) : new Error("用户名密码登录失败");case 24:case "end":return _context19.stop();}}}, _callee19, this);}));function signIn(_x16, _x17) {return _signIn4.apply(this, arguments);}return signIn;}() }]);return Ie;}(we);var Ae = /*#__PURE__*/function () {function Ae(e) {_classCallCheck(this, Ae);this.config = e, this._cache = Z(e.env), this._request = _e(e.env), this._onAnonymousConverted = this._onAnonymousConverted.bind(this), this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this), se(ce, this._onLoginTypeChanged);}_createClass(Ae, [{ key: "anonymousAuthProvider", value: function anonymousAuthProvider() {return new ke(this.config);} }, { key: "customAuthProvider", value: function customAuthProvider() {return new Te(this.config);} }, { key: "emailAuthProvider", value: function emailAuthProvider() {return new Pe(this.config);} }, { key: "usernameAuthProvider", value: function usernameAuthProvider() {return new Ie(this.config);} }, { key: "signInAnonymously", value: function () {var _signInAnonymously = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee20() {return _regenerator.default.wrap(function _callee20$(_context20) {while (1) {switch (_context20.prev = _context20.next) {case 0:return _context20.abrupt("return", new ke(this.config).signIn());case 1:case "end":return _context20.stop();}}}, _callee20, this);}));function signInAnonymously() {return _signInAnonymously.apply(this, arguments);}return signInAnonymously;}() }, { key: "signInWithEmailAndPassword", value: function () {var _signInWithEmailAndPassword = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee21(e, t) {return _regenerator.default.wrap(function _callee21$(_context21) {while (1) {switch (_context21.prev = _context21.next) {case 0:return _context21.abrupt("return", new Pe(this.config).signIn(e, t));case 1:case "end":return _context21.stop();}}}, _callee21, this);}));function signInWithEmailAndPassword(_x18, _x19) {return _signInWithEmailAndPassword.apply(this, arguments);}return signInWithEmailAndPassword;}() }, { key: "signInWithUsernameAndPassword", value: function signInWithUsernameAndPassword(e, t) {return new Ie(this.config).signIn(e, t);} }, { key: "linkAndRetrieveDataWithTicket", value: function () {var _linkAndRetrieveDataWithTicket2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee22(e) {return _regenerator.default.wrap(function _callee22$(_context22) {while (1) {switch (_context22.prev = _context22.next) {case 0:this._anonymousAuthProvider || (this._anonymousAuthProvider = new ke(this.config)), se(ue, this._onAnonymousConverted);_context22.next = 3;return this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(e);case 3:return _context22.abrupt("return", _context22.sent);case 4:case "end":return _context22.stop();}}}, _callee22, this);}));function linkAndRetrieveDataWithTicket(_x20) {return _linkAndRetrieveDataWithTicket2.apply(this, arguments);}return linkAndRetrieveDataWithTicket;}() }, { key: "signOut", value: function () {var _signOut = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee23() {var _this$_cache$keys10, e, t, n, s, r;return _regenerator.default.wrap(function _callee23$(_context23) {while (1) {switch (_context23.prev = _context23.next) {case 0:if (!(this.loginType === le.ANONYMOUS)) {_context23.next = 2;break;}throw new Error("匿名用户不支持登出操作");case 2:_this$_cache$keys10 = this._cache.keys, e = _this$_cache$keys10.refreshTokenKey, t = _this$_cache$keys10.accessTokenKey, n = _this$_cache$keys10.accessTokenExpireKey, s = this._cache.getStore(e);if (s) {_context23.next = 5;break;}return _context23.abrupt("return");case 5:_context23.next = 7;return this._request.send("auth.logout", { refresh_token: s });case 7:r = _context23.sent;return _context23.abrupt("return", (this._cache.removeStore(e), this._cache.removeStore(t), this._cache.removeStore(n), re(ie), re(ce, { env: this.config.env, loginType: le.NULL, persistence: this.config.persistence }), r));case 9:case "end":return _context23.stop();}}}, _callee23, this);}));function signOut() {return _signOut.apply(this, arguments);}return signOut;}() }, { key: "signUpWithEmailAndPassword", value: function () {var _signUpWithEmailAndPassword = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee24(e, t) {return _regenerator.default.wrap(function _callee24$(_context24) {while (1) {switch (_context24.prev = _context24.next) {case 0:return _context24.abrupt("return", this._request.send("auth.signUpWithEmailAndPassword", { email: e, password: t }));case 1:case "end":return _context24.stop();}}}, _callee24, this);}));function signUpWithEmailAndPassword(_x21, _x22) {return _signUpWithEmailAndPassword.apply(this, arguments);}return signUpWithEmailAndPassword;}() }, { key: "sendPasswordResetEmail", value: function () {var _sendPasswordResetEmail = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee25(e) {return _regenerator.default.wrap(function _callee25$(_context25) {while (1) {switch (_context25.prev = _context25.next) {case 0:return _context25.abrupt("return", this._request.send("auth.sendPasswordResetEmail", { email: e }));case 1:case "end":return _context25.stop();}}}, _callee25, this);}));function sendPasswordResetEmail(_x23) {return _sendPasswordResetEmail.apply(this, arguments);}return sendPasswordResetEmail;}() }, { key: "onLoginStateChanged", value: function onLoginStateChanged(e) {var _this11 = this;se(ie, function () {var t = _this11.hasLoginState();e.call(_this11, t);});var t = this.hasLoginState();e.call(this, t);} }, { key: "onLoginStateExpired", value: function onLoginStateExpired(e) {se(ae, e.bind(this));} }, { key: "onAccessTokenRefreshed", value: function onAccessTokenRefreshed(e) {se(he, e.bind(this));} }, { key: "onAnonymousConverted", value: function onAnonymousConverted(e) {se(ue, e.bind(this));} }, { key: "onLoginTypeChanged", value: function onLoginTypeChanged(e) {var _this12 = this;se(ce, function () {var t = _this12.hasLoginState();e.call(_this12, t);});} }, { key: "getAccessToken", value: function () {var _getAccessToken2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee26() {return _regenerator.default.wrap(function _callee26$(_context26) {while (1) {switch (_context26.prev = _context26.next) {case 0:_context26.next = 2;return this._request.getAccessToken();case 2:_context26.t0 = _context26.sent.accessToken;_context26.t1 = this.config.env;return _context26.abrupt("return", { accessToken: _context26.t0, env: _context26.t1 });case 5:case "end":return _context26.stop();}}}, _callee26, this);}));function getAccessToken() {return _getAccessToken2.apply(this, arguments);}return getAccessToken;}() }, { key: "hasLoginState", value: function hasLoginState() {var e = this._cache.keys.refreshTokenKey;return this._cache.getStore(e) ? new Se(this.config.env) : null;} }, { key: "isUsernameRegistered", value: function () {var _isUsernameRegistered = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee27(e) {var _yield$this$_request$5, t;return _regenerator.default.wrap(function _callee27$(_context27) {while (1) {switch (_context27.prev = _context27.next) {case 0:if (!("string" != typeof e)) {_context27.next = 2;break;}throw new Error("username must be a string");case 2:_context27.next = 4;return this._request.send("auth.isUsernameRegistered", { username: e });case 4:_yield$this$_request$5 = _context27.sent;t = _yield$this$_request$5.data;return _context27.abrupt("return", t && t.isRegistered);case 7:case "end":return _context27.stop();}}}, _callee27, this);}));function isUsernameRegistered(_x24) {return _isUsernameRegistered.apply(this, arguments);}return isUsernameRegistered;}() }, { key: "getLoginState", value: function getLoginState() {return Promise.resolve(this.hasLoginState());} }, { key: "signInWithTicket", value: function () {var _signInWithTicket = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee28(e) {return _regenerator.default.wrap(function _callee28$(_context28) {while (1) {switch (_context28.prev = _context28.next) {case 0:return _context28.abrupt("return", new Te(this.config).signIn(e));case 1:case "end":return _context28.stop();}}}, _callee28, this);}));function signInWithTicket(_x25) {return _signInWithTicket.apply(this, arguments);}return signInWithTicket;}() }, { key: "shouldRefreshAccessToken", value: function shouldRefreshAccessToken(e) {this._request._shouldRefreshAccessTokenHook = e.bind(this);} }, { key: "getUserInfo", value: function getUserInfo() {return this._request.send("auth.getUserInfo", {}).then(function (e) {return e.code ? e : _objectSpread(_objectSpread({}, e.data), {}, { requestId: e.seqId });});} }, { key: "getAuthHeader", value: function getAuthHeader() {var _this$_cache$keys11 = this._cache.keys,e = _this$_cache$keys11.refreshTokenKey,t = _this$_cache$keys11.accessTokenKey,n = this._cache.getStore(e);return { "x-cloudbase-credentials": this._cache.getStore(t) + "/@@/" + n };} }, { key: "_onAnonymousConverted", value: function _onAnonymousConverted(e) {var t = e.data.env;t === this.config.env && this._cache.updatePersistence(this.config.persistence);} }, { key: "_onLoginTypeChanged", value: function _onLoginTypeChanged(e) {var _e$data = e.data,t = _e$data.loginType,n = _e$data.persistence,s = _e$data.env;s === this.config.env && (this._cache.updatePersistence(n), this._cache.setStore(this._cache.keys.loginTypeKey, t));} }, { key: "currentUser", get: function get() {var e = this.hasLoginState();return e && e.user || null;} }, { key: "loginType", get: function get() {return this._cache.getStore(this._cache.keys.loginTypeKey);} }]);return Ae;}();var Ee = function Ee(e, t) {t = t || j();var n = _e(this.config.env),s = e.cloudPath,r = e.filePath,o = e.onUploadProgress,_e$fileType = e.fileType,i = _e$fileType === void 0 ? "image" : _e$fileType;return n.send("storage.getUploadMetadata", { path: s }).then(function (e) {var _e$data2 = e.data,a = _e$data2.url,c = _e$data2.authorization,u = _e$data2.token,h = _e$data2.fileId,l = _e$data2.cosFileId,d = e.requestId,f = { key: s, signature: c, "x-cos-meta-fileid": l, success_action_status: "201", "x-cos-security-token": u };n.upload({ url: a, data: f, file: r, name: s, fileType: i, onUploadProgress: o }).then(function (e) {201 === e.statusCode ? t(null, { fileID: h, requestId: d }) : t(new Error("STORAGE_REQUEST_FAIL: ".concat(e.data)));}).catch(function (e) {t(e);});}).catch(function (e) {t(e);}), t.promise;},be = function be(e, t) {t = t || j();var n = _e(this.config.env),s = e.cloudPath;return n.send("storage.getUploadMetadata", { path: s }).then(function (e) {t(null, e);}).catch(function (e) {t(e);}), t.promise;},Oe = function Oe(_ref5, t) {var e = _ref5.fileList;if (t = t || j(), !e || !Array.isArray(e)) return { code: "INVALID_PARAM", message: "fileList必须是非空的数组" };var _iterator3 = _createForOfIteratorHelper(e),_step3;try {for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {var _t6 = _step3.value;if (!_t6 || "string" != typeof _t6) return { code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" };}} catch (err) {_iterator3.e(err);} finally {_iterator3.f();}var n = { fileid_list: e };return _e(this.config.env).send("storage.batchDeleteFile", n).then(function (e) {e.code ? t(null, e) : t(null, { fileList: e.data.delete_list, requestId: e.requestId });}).catch(function (e) {t(e);}), t.promise;},Ue = function Ue(_ref6, t) {var e = _ref6.fileList;t = t || j(), e && Array.isArray(e) || t(null, { code: "INVALID_PARAM", message: "fileList必须是非空的数组" });var n = [];var _iterator4 = _createForOfIteratorHelper(e),_step4;try {for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {var _s6 = _step4.value;"object" == typeof _s6 ? (_s6.hasOwnProperty("fileID") && _s6.hasOwnProperty("maxAge") || t(null, { code: "INVALID_PARAM", message: "fileList的元素必须是包含fileID和maxAge的对象" }), n.push({ fileid: _s6.fileID, max_age: _s6.maxAge })) : "string" == typeof _s6 ? n.push({ fileid: _s6 }) : t(null, { code: "INVALID_PARAM", message: "fileList的元素必须是字符串" });}} catch (err) {_iterator4.e(err);} finally {_iterator4.f();}var s = { file_list: n };return _e(this.config.env).send("storage.batchGetDownloadUrl", s).then(function (e) {e.code ? t(null, e) : t(null, { fileList: e.data.download_list, requestId: e.requestId });}).catch(function (e) {t(e);}), t.promise;},Ce = /*#__PURE__*/function () {var _ref8 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee29(_ref7, t) {var e, n, s, r;return _regenerator.default.wrap(function _callee29$(_context29) {while (1) {switch (_context29.prev = _context29.next) {case 0:e = _ref7.fileID;_context29.next = 3;return Ue.call(this, { fileList: [{ fileID: e, maxAge: 600 }] });case 3:n = _context29.sent.fileList[0];if (!("SUCCESS" !== n.code)) {_context29.next = 6;break;}return _context29.abrupt("return", t ? t(n) : new Promise(function (e) {e(n);}));case 6:s = _e(this.config.env);r = n.download_url;if (!(r = encodeURI(r), !t)) {_context29.next = 10;break;}return _context29.abrupt("return", s.download({ url: r }));case 10:_context29.t0 = t;_context29.next = 13;return s.download({ url: r });case 13:_context29.t1 = _context29.sent;(0, _context29.t0)(_context29.t1);case 15:case "end":return _context29.stop();}}}, _callee29, this);}));return function Ce(_x26, _x27) {return _ref8.apply(this, arguments);};}(),De = function De(_ref9, o) {var e = _ref9.name,t = _ref9.data,n = _ref9.query,s = _ref9.parse,r = _ref9.search;var i = o || j();var a;try {a = t ? JSON.stringify(t) : "";} catch (e) {return Promise.reject(e);}if (!e) return Promise.reject(new Error("函数名不能为空"));var c = { inQuery: n, parse: s, search: r, function_name: e, request_data: a };return _e(this.config.env).send("functions.invokeFunction", c).then(function (e) {if (e.code) i(null, e);else {var _t7 = e.data.response_data;if (s) i(null, { result: _t7, requestId: e.requestId });else try {_t7 = JSON.parse(e.data.response_data), i(null, { result: _t7, requestId: e.requestId });} catch (e) {i(new Error("response data must be json"));}}return i.promise;}).catch(function (e) {i(e);}), i.promise;},xe = { timeout: 15e3, persistence: "session" },Re = {};var qe = /*#__PURE__*/function () {function qe(e) {_classCallCheck(this, qe);this.config = e || this.config, this.authObj = void 0;}_createClass(qe, [{ key: "init", value: function init(e) {switch (z.adapter || (this.requestClient = new z.adapter.reqClass({ timeout: e.timeout || 5e3, timeoutMsg: "\u8BF7\u6C42\u5728".concat((e.timeout || 5e3) / 1e3, "s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD") })), this.config = _objectSpread(_objectSpread({}, xe), e), !0) {case this.config.timeout > 6e5:console.warn("timeout大于可配置上限[10分钟]，已重置为上限数值"), this.config.timeout = 6e5;break;case this.config.timeout < 100:console.warn("timeout小于可配置下限[100ms]，已重置为下限数值"), this.config.timeout = 100;}return new qe(this.config);} }, { key: "auth", value: function auth() {var _ref10 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref10.persistence;if (this.authObj) return this.authObj;var t = e || z.adapter.primaryStorage || xe.persistence;var n;return t !== this.config.persistence && (this.config.persistence = t), function (e) {var t = e.env;G[t] = new X(e), Q[t] = new X(_objectSpread(_objectSpread({}, e), {}, { persistence: "local" }));}(this.config), n = this.config, ye[n.env] = new me(n), this.authObj = new Ae(this.config), this.authObj;} }, { key: "on", value: function on(e, t) {return se.apply(this, [e, t]);} }, { key: "off", value: function off(e, t) {return oe.apply(this, [e, t]);} }, { key: "callFunction", value: function callFunction(e, t) {return De.apply(this, [e, t]);} }, { key: "deleteFile", value: function deleteFile(e, t) {return Oe.apply(this, [e, t]);} }, { key: "getTempFileURL", value: function getTempFileURL(e, t) {return Ue.apply(this, [e, t]);} }, { key: "downloadFile", value: function downloadFile(e, t) {return Ce.apply(this, [e, t]);} }, { key: "uploadFile", value: function uploadFile(e, t) {return Ee.apply(this, [e, t]);} }, { key: "getUploadMetadata", value: function getUploadMetadata(e, t) {return be.apply(this, [e, t]);} }, { key: "registerExtension", value: function registerExtension(e) {Re[e.name] = e;} }, { key: "invokeExtension", value: function () {var _invokeExtension = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee30(e, t) {var n;return _regenerator.default.wrap(function _callee30$(_context30) {while (1) {switch (_context30.prev = _context30.next) {case 0:n = Re[e];if (n) {_context30.next = 3;break;}throw Error("\u6269\u5C55".concat(e, " \u5FC5\u987B\u5148\u6CE8\u518C"));case 3:_context30.next = 5;return n.invoke(t, this);case 5:return _context30.abrupt("return", _context30.sent);case 6:case "end":return _context30.stop();}}}, _callee30, this);}));function invokeExtension(_x28, _x29) {return _invokeExtension.apply(this, arguments);}return invokeExtension;}() }, { key: "useAdapters", value: function useAdapters(e) {var _ref11 = W(e) || {},t = _ref11.adapter,n = _ref11.runtime;t && (z.adapter = t), n && (z.runtime = n);} }]);return qe;}();var Fe = new qe();function Le(e, t, n) {void 0 === n && (n = {});var s = /\?/.test(t),r = "";for (var o in n) {"" === r ? !s && (t += "?") : r += "&", r += o + "=" + encodeURIComponent(n[o]);}return /^http(s)?:\/\//.test(t += r) ? t : "" + e + t;}var Ne = /*#__PURE__*/function () {function Ne() {_classCallCheck(this, Ne);}_createClass(Ne, [{ key: "post", value: function post(e) {var t = e.url,n = e.data,s = e.headers;return new Promise(function (e, r) {q.request({ url: Le("https:", t), data: n, method: "POST", header: s, success: function success(t) {e(t);}, fail: function fail(e) {r(e);} });});} }, { key: "upload", value: function upload(e) {return new Promise(function (t, n) {var s = e.url,r = e.file,o = e.data,i = e.headers,a = e.fileType,c = q.uploadFile({ url: Le("https:", s), name: "file", formData: Object.assign({}, o), filePath: r, fileType: a, header: i, success: function success(e) {var n = { statusCode: e.statusCode, data: e.data || {} };200 === e.statusCode && o.success_action_status && (n.statusCode = parseInt(o.success_action_status, 10)), t(n);}, fail: function fail(e) {u && "mp-alipay" === h && console.warn("支付宝小程序开发工具上传腾讯云时无法准确判断是否上传成功，请使用真机测试"), n(new Error(e.errMsg || "uploadFile:fail"));} });"function" == typeof e.onUploadProgress && c && "function" == typeof c.onProgressUpdate && c.onProgressUpdate(function (t) {e.onUploadProgress({ loaded: t.totalBytesSent, total: t.totalBytesExpectedToSend });});});} }]);return Ne;}();var Me = { setItem: function setItem(e, t) {q.setStorageSync(e, t);}, getItem: function getItem(e) {return q.getStorageSync(e);}, removeItem: function removeItem(e) {q.removeStorageSync(e);}, clear: function clear() {q.clearStorageSync();} };var $e = { genAdapter: function genAdapter() {return { root: {}, reqClass: Ne, localStorage: Me, primaryStorage: "local" };}, isMatch: function isMatch() {return !0;}, runtime: "uni_app" };Fe.useAdapters($e);var je = Fe,Ke = je.init;je.init = function (e) {e.env = e.spaceId;var t = Ke.call(this, e);t.config.provider = "tencent", t.config.spaceId = e.spaceId;var n = t.auth;return t.auth = function (e) {var t = n.call(this, e);return ["linkAndRetrieveDataWithTicket", "signInAnonymously", "signOut", "getAccessToken", "getLoginState", "signInWithTicket", "getUserInfo"].forEach(function (e) {t[e] = T(t[e]).bind(t);}), t;}, t.customAuth = t.auth, t;};var Be = /*#__PURE__*/function (_F) {_inherits(Be, _F);var _super9 = _createSuper(Be);function Be() {_classCallCheck(this, Be);return _super9.apply(this, arguments);}_createClass(Be, [{ key: "getAccessToken", value: function getAccessToken() {var _this13 = this;return new Promise(function (e, t) {var n = "Anonymous_Access_token";_this13.setAccessToken(n), e(n);});} }, { key: "setupRequest", value: function setupRequest(e, t) {var n = Object.assign({}, e, { spaceId: this.config.spaceId, timestamp: Date.now() }),s = { "Content-Type": "application/json" };"auth" !== t && (n.token = this.accessToken, s["x-basement-token"] = this.accessToken), s["x-serverless-sign"] = R.sign(n, this.config.clientSecret);var r = C(),o = r.APPID,i = r.PLATFORM,a = r.DEVICEID,c = r.CLIENT_SDK_VERSION;return s["x-client-platform"] = i, s["x-client-appid"] = o, s["x-client-device-id"] = a, s["x-client-version"] = c, s["x-client-token"] = q.getStorageSync("uni_id_token"), { url: this.config.requestUrl, method: "POST", data: n, dataType: "json", header: JSON.parse(JSON.stringify(s)) };} }, { key: "uploadFileToOSS", value: function uploadFileToOSS(_ref12) {var _this14 = this;var e = _ref12.url,t = _ref12.formData,n = _ref12.name,s = _ref12.filePath,r = _ref12.fileType,o = _ref12.onUploadProgress;return new Promise(function (i, a) {var c = _this14.adapter.uploadFile({ url: e, formData: t, name: n, filePath: s, fileType: r, success: function success(e) {e && e.statusCode < 400 ? i(e) : a(new P({ code: "UPLOAD_FAILED", message: "文件上传失败" }));}, fail: function fail(e) {a(new P({ code: e.code || "UPLOAD_FAILED", message: e.message || e.errMsg || "文件上传失败" }));} });"function" == typeof o && c && "function" == typeof c.onProgressUpdate && c.onProgressUpdate(function (e) {o({ loaded: e.totalBytesSent, total: e.totalBytesExpectedToSend });});});} }, { key: "uploadFile", value: function uploadFile(_ref13) {var _this15 = this;var e = _ref13.filePath,t = _ref13.cloudPath,_ref13$fileType = _ref13.fileType,n = _ref13$fileType === void 0 ? "image" : _ref13$fileType,s = _ref13.onUploadProgress;if (!t) throw new P({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });var r;return this.getOSSUploadOptionsFromPath({ cloudPath: t }).then(function (t) {var _t$result = t.result,o = _t$result.url,i = _t$result.formData,a = _t$result.name,c = _t$result.fileUrl;r = c;var u = { url: o, formData: i, name: a, filePath: e, fileType: n };return _this15.uploadFileToOSS(Object.assign({}, u, { onUploadProgress: s }));}).then(function () {return _this15.reportOSSUpload({ cloudPath: t });}).then(function (t) {return new Promise(function (n, s) {t.success ? n({ success: !0, filePath: e, fileID: r }) : s(new P({ code: "UPLOAD_FAILED", message: "文件上传失败" }));});});} }]);return Be;}(F);var He = { init: function init(e) {var t = new Be(e),n = { signInAnonymously: function signInAnonymously() {return t.authorize();}, getLoginState: function getLoginState() {return Promise.resolve(!1);} };return t.auth = function () {return n;}, t.customAuth = t.auth, t;} };var We, ze;function Ve(_ref14) {var e = _ref14.name,t = _ref14.data,n = _ref14.spaceId,s = _ref14.provider;We || (We = C(), ze = { ak: p, p: "android" === O ? "a" : "i", ut: x(), uuid: D() });var r = JSON.parse(JSON.stringify(t || {})),o = e,i = n,a = { tencent: "t", aliyun: "a" }[s];{var _e16 = Object.assign({}, ze, { fn: o, sid: i, pvd: a });Object.assign(r, { clientInfo: We, uniCloudClientInfo: encodeURIComponent(JSON.stringify(_e16)) });var _uni$getSystemInfoSyn2 = uni.getSystemInfoSync(),_t8 = _uni$getSystemInfoSyn2.deviceId;r.uniCloudDeviceId = _t8;}if (!r.uniIdToken) {var _e17 = q.getStorageSync("uni_id_token") || q.getStorageSync("uniIdToken");_e17 && (r.uniIdToken = _e17);}return r;}function Je(_ref15) {var _this16 = this;var e = _ref15.name,t = _ref15.data;var n = this.localAddress,s = this.localPort,r = { aliyun: "aliyun", tencent: "tcb" }[this.config.provider],o = this.config.spaceId,i = "http://".concat(n, ":").concat(s, "/system/check-function"),a = "http://".concat(n, ":").concat(s, "/cloudfunctions/").concat(e);return new Promise(function (t, n) {q.request({ method: "POST", url: i, data: { name: e, platform: h, provider: r, spaceId: o }, timeout: 3e3, success: function success(e) {t(e);}, fail: function fail() {t({ data: { code: "NETWORK_ERROR", message: "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下，自动切换为已部署的云函数。" } });} });}).then(function () {var _ref16 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref16.data;var _ref17 = e || {},t = _ref17.code,n = _ref17.message;return { code: 0 === t ? 0 : t || "SYS_ERR", message: n || "SYS_ERR" };}).then(function (_ref18) {var n = _ref18.code,s = _ref18.message;if (0 !== n) {switch (n) {case "MODULE_ENCRYPTED":console.error("\u6B64\u4E91\u51FD\u6570\uFF08".concat(e, "\uFF09\u4F9D\u8D56\u52A0\u5BC6\u516C\u5171\u6A21\u5757\u4E0D\u53EF\u672C\u5730\u8C03\u8BD5\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570"));break;case "FUNCTION_ENCRYPTED":console.error("\u6B64\u4E91\u51FD\u6570\uFF08".concat(e, "\uFF09\u5DF2\u52A0\u5BC6\u4E0D\u53EF\u672C\u5730\u8C03\u8BD5\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570"));break;case "ACTION_ENCRYPTED":console.error(s || "需要访问加密的uni-clientDB-action，自动切换为云端环境");break;case "NETWORK_ERROR":{var _e18 = "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下";throw console.error(_e18), new Error(_e18);}case "SWITCH_TO_CLOUD":break;default:{var _e19 = "\u68C0\u6D4B\u672C\u5730\u8C03\u8BD5\u670D\u52A1\u51FA\u73B0\u9519\u8BEF\uFF1A".concat(s, "\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u73AF\u5883\u6216\u91CD\u542F\u5BA2\u6237\u7AEF\u518D\u8BD5");throw console.error(_e19), new Error(_e19);}}return _this16._originCallFunction({ name: e, data: t });}return new Promise(function (n, s) {var i = Ve({ name: e, data: t, provider: _this16.config.provider, spaceId: o });q.request({ method: "POST", url: a, data: { provider: r, platform: h, param: i }, success: function success() {var _ref19 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref19.statusCode,t = _ref19.data;return !e || e >= 400 ? s(new P({ code: t.code || "SYS_ERR", message: t.message || "request:fail" })) : n({ result: t });}, fail: function fail(e) {s(new P({ code: e.code || e.errCode || "SYS_ERR", message: e.message || e.errMsg || "request:fail" }));} });});});}var Ye = [{ rule: /fc_function_not_found|FUNCTION_NOT_FOUND/, content: "，云函数[{functionName}]在云端不存在，请检查此云函数名称是否正确以及该云函数是否已上传到服务空间", mode: "append" }];var Xe = /[\\^$.*+?()[\]{}|]/g,Ge = RegExp(Xe.source);function Qe(e, t, n) {return e.replace(new RegExp((s = t) && Ge.test(s) ? s.replace(Xe, "\\$&") : s, "g"), n);var s;}function Ze(_ref20) {var e = _ref20.functionName,t = _ref20.result,n = _ref20.logPvd;if (this.config.useDebugFunction && t && t.requestId) {var _s7 = JSON.stringify({ spaceId: this.config.spaceId, functionName: e, requestId: t.requestId });console.log("[".concat(n, "-request]").concat(_s7, "[/").concat(n, "-request]"));}}function et(e) {var t = e.callFunction,n = function n(e) {var _this17 = this;var n = e.name;e.data = Ve({ name: n, data: e.data, provider: this.config.provider, spaceId: this.config.spaceId });var s = { aliyun: "aliyun", tencent: "tcb" }[this.config.provider];return t.call(this, e).then(function (e) {return Ze.call(_this17, { functionName: n, result: e, logPvd: s }), Promise.resolve(e);}, function (t) {return Ze.call(_this17, { functionName: n, result: t, logPvd: s }), t && t.message && (t.message = function () {var _ref21 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref21$message = _ref21.message,e = _ref21$message === void 0 ? "" : _ref21$message,_ref21$extraInfo = _ref21.extraInfo,t = _ref21$extraInfo === void 0 ? {} : _ref21$extraInfo,_ref21$formatter = _ref21.formatter,n = _ref21$formatter === void 0 ? [] : _ref21$formatter;for (var _s8 = 0; _s8 < n.length; _s8++) {var _n$_s = n[_s8],_r3 = _n$_s.rule,_o2 = _n$_s.content,i = _n$_s.mode,_a = e.match(_r3);if (!_a) continue;var _c = _o2;for (var _e20 = 1; _e20 < _a.length; _e20++) {_c = Qe(_c, "{$".concat(_e20, "}"), _a[_e20]);}for (var _e21 in t) {_c = Qe(_c, "{".concat(_e21, "}"), t[_e21]);}switch (i) {case "replace":return _c;case "append":default:return e + _c;}}return e;}({ message: "[".concat(e.name, "]: ").concat(t.message), formatter: Ye, extraInfo: { functionName: n } })), Promise.reject(t);});};e.callFunction = function (t) {var s;return u && e.debugInfo && !e.debugInfo.forceRemote && d ? (e._originCallFunction || (e._originCallFunction = n), s = Je.call(this, t)) : s = n.call(this, t), Object.defineProperty(s, "result", { get: function get() {return console.warn("当前返回结果为Promise类型，不可直接访问其result属性，详情请参考：https://uniapp.dcloud.net.cn/uniCloud/faq?id=promise"), {};} }), s;};}var tt = Symbol("CLIENT_DB_INTERNAL");function nt(e, t) {return e.then = "DoNotReturnProxyWithAFunctionNamedThen", e._internalType = tt, e.__ob__ = void 0, new Proxy(e, { get: function get(e, n, s) {return n in e || "string" != typeof n ? e[n] : t.get(e, n, s);} });}function st(e) {switch (o(e)) {case "array":return e.map(function (e) {return st(e);});case "object":return e._internalType === tt || Object.keys(e).forEach(function (t) {e[t] = st(e[t]);}), e;case "regexp":return { $regexp: { source: e.source, flags: e.flags } };case "date":return { $date: e.toISOString() };default:return e;}}function rt() {var e = q.getStorageSync("uni_id_token") || "",t = e.split(".");if (!e || 3 !== t.length) return { uid: null, role: [], permission: [], tokenExpired: 0 };var n;try {n = JSON.parse((s = t[1], decodeURIComponent(atob(s).split("").map(function (e) {return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2);}).join(""))));} catch (e) {throw new Error("获取当前用户信息出错，详细错误信息为：" + e.message);}var s;return n.tokenExpired = 1e3 * n.exp, delete n.exp, delete n.iat, n;}var ot = t(n(function (e, t) {Object.defineProperty(t, "__esModule", { value: !0 });var n = "chooseAndUploadFile:ok",s = "chooseAndUploadFile:fail";function r(e, t) {return e.tempFiles.forEach(function (e, n) {e.name || (e.name = e.path.substring(e.path.lastIndexOf("/") + 1)), t && (e.fileType = t), e.cloudPath = Date.now() + "_" + n + e.name.substring(e.name.lastIndexOf("."));}), e.tempFilePaths || (e.tempFilePaths = e.tempFiles.map(function (e) {return e.path;})), e;}function o(e, t, _ref22) {var s = _ref22.onChooseFile,r = _ref22.onUploadProgress;return t.then(function (e) {if (s) {var _t9 = s(e);if (void 0 !== _t9) return Promise.resolve(_t9).then(function (t) {return void 0 === t ? e : t;});}return e;}).then(function (t) {return !1 === t ? { errMsg: n, tempFilePaths: [], tempFiles: [] } : function (e, t) {var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;var r = arguments.length > 3 ? arguments[3] : undefined;(t = Object.assign({}, t)).errMsg = n;var o = t.tempFiles,i = o.length;var a = 0;return new Promise(function (n) {for (; a < s;) {c();}function c() {var s = a++;if (s >= i) return void (!o.find(function (e) {return !e.url && !e.errMsg;}) && n(t));var u = o[s];e.uploadFile({ filePath: u.path, cloudPath: u.cloudPath, fileType: u.fileType, onUploadProgress: function onUploadProgress(e) {e.index = s, e.tempFile = u, e.tempFilePath = u.path, r && r(e);} }).then(function (e) {u.url = e.fileID, s < i && c();}).catch(function (e) {u.errMsg = e.errMsg || e.message, s < i && c();});}});}(e, t, 5, r);});}t.initChooseAndUploadFile = function (e) {return function () {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { type: "all" };return "image" === t.type ? o(e, function (e) {var t = e.count,n = e.sizeType,_e$sourceType = e.sourceType,o = _e$sourceType === void 0 ? ["album", "camera"] : _e$sourceType,i = e.extension;return new Promise(function (e, a) {uni.chooseImage({ count: t, sizeType: n, sourceType: o, extension: i, success: function success(t) {e(r(t, "image"));}, fail: function fail(e) {a({ errMsg: e.errMsg.replace("chooseImage:fail", s) });} });});}(t), t) : "video" === t.type ? o(e, function (e) {var t = e.camera,n = e.compressed,o = e.maxDuration,_e$sourceType2 = e.sourceType,i = _e$sourceType2 === void 0 ? ["album", "camera"] : _e$sourceType2,a = e.extension;return new Promise(function (e, c) {uni.chooseVideo({ camera: t, compressed: n, maxDuration: o, sourceType: i, extension: a, success: function success(t) {var n = t.tempFilePath,s = t.duration,o = t.size,i = t.height,a = t.width;e(r({ errMsg: "chooseVideo:ok", tempFilePaths: [n], tempFiles: [{ name: t.tempFile && t.tempFile.name || "", path: n, size: o, type: t.tempFile && t.tempFile.type || "", width: a, height: i, duration: s, fileType: "video", cloudPath: "" }] }, "video"));}, fail: function fail(e) {c({ errMsg: e.errMsg.replace("chooseVideo:fail", s) });} });});}(t), t) : o(e, function (e) {var t = e.count,n = e.extension;return new Promise(function (e, o) {var i = uni.chooseFile;if ("undefined" != typeof wx && "function" == typeof wx.chooseMessageFile && (i = wx.chooseMessageFile), "function" != typeof i) return o({ errMsg: s + " 请指定 type 类型，该平台仅支持选择 image 或 video。" });i({ type: "all", count: t, extension: n, success: function success(t) {e(r(t));}, fail: function fail(e) {o({ errMsg: e.errMsg.replace("chooseFile:fail", s) });} });});}(t), t);};};}));var it = "manual";function at(e) {return { props: { localdata: { type: Array, default: function _default() {return [];} }, options: { type: [Object, Array], default: function _default() {return {};} }, collection: { type: [String, Array], default: "" }, action: { type: String, default: "" }, field: { type: String, default: "" }, orderby: { type: String, default: "" }, where: { type: [String, Object], default: "" }, pageData: { type: String, default: "add" }, pageCurrent: { type: Number, default: 1 }, pageSize: { type: Number, default: 20 }, getcount: { type: [Boolean, String], default: !1 }, gettree: { type: [Boolean, String], default: !1 }, gettreepath: { type: [Boolean, String], default: !1 }, startwith: { type: String, default: "" }, limitlevel: { type: Number, default: 10 }, groupby: { type: String, default: "" }, groupField: { type: String, default: "" }, distinct: { type: [Boolean, String], default: !1 }, foreignKey: { type: String, default: "" }, loadtime: { type: String, default: "auto" }, manual: { type: Boolean, default: !1 } }, data: function data() {return { mixinDatacomLoading: !1, mixinDatacomHasMore: !1, mixinDatacomResData: [], mixinDatacomErrorMessage: "", mixinDatacomPage: {} };}, created: function created() {var _this18 = this;this.mixinDatacomPage = { current: this.pageCurrent, size: this.pageSize, count: 0 }, this.$watch(function () {var e = [];return ["pageCurrent", "pageSize", "localdata", "collection", "action", "field", "orderby", "where", "getont", "getcount", "gettree", "groupby", "groupField", "distinct"].forEach(function (t) {e.push(_this18[t]);}), e;}, function (e, t) {if (_this18.loadtime === it) return;var n = !1;var s = [];for (var _r4 = 2; _r4 < e.length; _r4++) {e[_r4] !== t[_r4] && (s.push(e[_r4]), n = !0);}e[0] !== t[0] && (_this18.mixinDatacomPage.current = _this18.pageCurrent), _this18.mixinDatacomPage.size = _this18.pageSize, _this18.onMixinDatacomPropsChange(n, s);});}, methods: { onMixinDatacomPropsChange: function onMixinDatacomPropsChange(e, t) {}, mixinDatacomEasyGet: function mixinDatacomEasyGet() {var _this19 = this;var _ref23 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref23$getone = _ref23.getone,e = _ref23$getone === void 0 ? !1 : _ref23$getone,t = _ref23.success,n = _ref23.fail;this.mixinDatacomLoading || (this.mixinDatacomLoading = !0, this.mixinDatacomErrorMessage = "", this.mixinDatacomGet().then(function (n) {_this19.mixinDatacomLoading = !1;var _n$result = n.result,s = _n$result.data,r = _n$result.count;_this19.getcount && (_this19.mixinDatacomPage.count = r), _this19.mixinDatacomHasMore = s.length < _this19.pageSize;var o = e ? s.length ? s[0] : void 0 : s;_this19.mixinDatacomResData = o, t && t(o);}).catch(function (e) {_this19.mixinDatacomLoading = !1, _this19.mixinDatacomErrorMessage = e, n && n(e);}));}, mixinDatacomGet: function mixinDatacomGet() {var _n4;var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var n = e.database();var s = t.action || this.action;s && (n = n.action(s));var r = t.collection || this.collection;n = Array.isArray(r) ? (_n4 = n).collection.apply(_n4, _toConsumableArray(r)) : n.collection(r);var o = t.where || this.where;o && Object.keys(o).length && (n = n.where(o));var i = t.field || this.field;i && (n = n.field(i));var a = t.foreignKey || this.foreignKey;a && (n = n.foreignKey(a));var c = t.groupby || this.groupby;c && (n = n.groupBy(c));var u = t.groupField || this.groupField;u && (n = n.groupField(u));!0 === (void 0 !== t.distinct ? t.distinct : this.distinct) && (n = n.distinct());var h = t.orderby || this.orderby;h && (n = n.orderBy(h));var l = void 0 !== t.pageCurrent ? t.pageCurrent : this.mixinDatacomPage.current,d = void 0 !== t.pageSize ? t.pageSize : this.mixinDatacomPage.size,f = void 0 !== t.getcount ? t.getcount : this.getcount,p = void 0 !== t.gettree ? t.gettree : this.gettree,g = void 0 !== t.gettreepath ? t.gettreepath : this.gettreepath,m = { getCount: f },y = { limitLevel: void 0 !== t.limitlevel ? t.limitlevel : this.limitlevel, startWith: void 0 !== t.startwith ? t.startwith : this.startwith };return p && (m.getTree = y), g && (m.getTreePath = y), n = n.skip(d * (l - 1)).limit(d).get(m), n;} } };}function ct(_x30, _x31) {return _ct.apply(this, arguments);}function _ct() {_ct = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee32(e, t) {var n, _e28, s;return _regenerator.default.wrap(function _callee32$(_context32) {while (1) {switch (_context32.prev = _context32.next) {case 0:n = "http://".concat(e, ":").concat(t, "/system/ping");_context32.prev = 1;_context32.next = 4;return s = { url: n, timeout: 500 }, new Promise(function (e, t) {q.request(_objectSpread(_objectSpread({}, s), {}, { success: function success(t) {e(t);}, fail: function fail(e) {t(e);} }));});case 4:_e28 = _context32.sent;return _context32.abrupt("return", !(!_e28.data || 0 !== _e28.data.code));case 8:_context32.prev = 8;_context32.t0 = _context32["catch"](1);return _context32.abrupt("return", !1);case 11:case "end":return _context32.stop();}}}, _callee32, null, [[1, 8]]);}));return _ct.apply(this, arguments);}var ut = new ( /*#__PURE__*/function () {function _class2() {_classCallCheck(this, _class2);}_createClass(_class2, [{ key: "init", value: function init(e) {var t = {};var n = !1 !== e.debugFunction && u && ("h5" === h && navigator.userAgent.indexOf("HBuilderX") > 0 || "app-plus" === h);switch (e.provider) {case "tencent":t = je.init(Object.assign(e, { useDebugFunction: n }));break;case "aliyun":t = L.init(Object.assign(e, { useDebugFunction: n }));break;case "private":t = He.init(Object.assign(e, { useDebugFunction: n }));break;default:throw new Error("未提供正确的provider参数");}var s = l;u && s && !s.code && (t.debugInfo = s);var r = Promise.resolve();var o;o = 1, r = new Promise(function (e, t) {setTimeout(function () {e();}, o);}), t.isReady = !1, t.isDefault = !1;var i = t.auth();t.initUniCloud = r.then(function () {return i.getLoginState();}).then(function (e) {return e ? Promise.resolve() : i.signInAnonymously();}).then(function () {if (u && t.debugInfo) {var _t$debugInfo = t.debugInfo,_e22 = _t$debugInfo.address,_n5 = _t$debugInfo.servePort;return function () {var _ref24 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee31(e, t) {var n, _s9, _r5;return _regenerator.default.wrap(function _callee31$(_context31) {while (1) {switch (_context31.prev = _context31.next) {case 0:_s9 = 0;case 1:if (!(_s9 < e.length)) {_context31.next = 11;break;}_r5 = e[_s9];_context31.next = 5;return ct(_r5, t);case 5:if (!_context31.sent) {_context31.next = 8;break;}n = _r5;return _context31.abrupt("break", 11);case 8:_s9++;_context31.next = 1;break;case 11:return _context31.abrupt("return", { address: n, port: t });case 12:case "end":return _context31.stop();}}}, _callee31);}));return function (_x32, _x33) {return _ref24.apply(this, arguments);};}()(_e22, _n5);}return Promise.resolve();}).then(function () {var _ref25 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref25.address,n = _ref25.port;if (!u) return Promise.resolve();if (e) t.localAddress = e, t.localPort = n;else if (t.debugInfo) {var _e23 = console["app-plus" === h ? "error" : "warn"];"remote" === t.debugInfo.initialLaunchType ? (t.debugInfo.forceRemote = !0, _e23("当前客户端和HBuilderX不在同一局域网下（或其他网络原因无法连接HBuilderX），uniCloud本地调试服务不对当前客户端生效。\n- 如果不使用uniCloud本地调试服务，请直接忽略此信息。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试\n- 检查系统防火墙是否拦截了HBuilderX自带的nodejs")) : _e23("无法连接uniCloud本地调试服务，请检查当前客户端是否与主机在同一局域网下。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试\n- 检查系统防火墙是否拦截了HBuilderX自带的nodejs");}}).then(function () {return function () {if (!u || "h5" !== h) return;if (uni.getStorageSync("__LAST_DCLOUD_APPID") === p) return;uni.setStorageSync("__LAST_DCLOUD_APPID", p), uni.removeStorageSync("uni_id_token") && (console.warn("检测到当前项目与上次运行到此端口的项目不一致，自动清理uni-id保存的token信息（仅开发调试时生效）"), uni.removeStorageSync("uni_id_token"), uni.removeStorageSync("uni_id_token_expired"));}(), new Promise(function (e) {"quickapp-native" === h ? (O = "android", uni.getStorage({ key: "__DC_CLOUD_UUID", success: function success(t) {b = t.data ? t.data : U(32), e();} })) : setTimeout(function () {O = uni.getSystemInfoSync().platform, b = uni.getStorageSync("__DC_CLOUD_UUID") || U(32), e();}, 0);});}).then(function () {t.isReady = !0;}), et(t), function (e) {var t = e.uploadFile;e.uploadFile = function (e) {var _this20 = this;var n;return n = this.isReady ? Promise.resolve() : this.initUniCloud, n.then(function () {return t.call(_this20, e);});};}(t), function (e) {e.database = function () {if (this._database) return this._database;var t = {};var n = {};function s(_ref26) {var s = _ref26.action,r = _ref26.command,o = _ref26.multiCommand;return S(k("database", "invoke")).then(function () {return e.callFunction({ name: "DCloud-clientDB", data: { action: s, command: r, multiCommand: o } });}).then(function (e) {var _e$result = e.result,s = _e$result.code,r = _e$result.message,o = _e$result.token,i = _e$result.tokenExpired,_e$result$systemInfo = _e$result.systemInfo,c = _e$result$systemInfo === void 0 ? [] : _e$result$systemInfo;if (c) for (var _e24 = 0; _e24 < c.length; _e24++) {var _c$_e = c[_e24],_t10 = _c$_e.level,_n6 = _c$_e.message,_s10 = _c$_e.detail,_r6 = console["app-plus" === h && "warn" === _t10 ? "error" : _t10] || console.log;var _o3 = "[System Info]" + _n6;_s10 && (_o3 = "".concat(_o3, "\n\u8BE6\u7EC6\u4FE1\u606F\uFF1A").concat(_s10)), _r6(_o3);}if (s) {var _e25 = new a(r, s);return n.error && n.error.forEach(function (t) {t(_e25);}), Promise.reject(_e25);}o && i && (t.refreshToken && t.refreshToken.forEach(function (e) {e({ token: o, tokenExpired: i });}), n.refreshToken && n.refreshToken.forEach(function (e) {e({ token: o, tokenExpired: i });}));var u = e.result.affectedDocs;return "number" == typeof u && Object.defineProperty(e.result, "affectedDocs", { get: function get() {return console.warn("affectedDocs不再推荐使用，请使用inserted/deleted/updated/data.length替代"), u;} }), S(k("database", "success"), e).then(function () {return S(k("database", "complete"), e);}).then(function () {return Promise.resolve(e);});}, function (e) {var t = new a(e.message, e.code || "SYSTEM_ERROR");return n.error && n.error.forEach(function (e) {e(t);}), /fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e.message) && console.warn("clientDB未初始化，请在web控制台保存一次schema以开启clientDB"), S(k("database", "fail"), e).then(function () {return S(k("database", "complete"), e);}).then(function () {return Promise.reject(e);});});}this.isDefault && (n = m("_globalUniCloudDatabaseCallback"));var r = /*#__PURE__*/function () {function r(e, t) {_classCallCheck(this, r);this.content = e, this.prevStage = t, this.udb = null;}_createClass(r, [{ key: "toJSON", value: function toJSON() {var e = this;var t = [e.content];for (; e.prevStage;) {e = e.prevStage, t.push(e.content);}return { $db: t.reverse().map(function (e) {return { $method: e.$method, $param: st(e.$param) };}) };} }, { key: "getAction", value: function getAction() {var e = this.toJSON().$db.find(function (e) {return "action" === e.$method;});return e && e.$param && e.$param[0];} }, { key: "getCommand", value: function getCommand() {return { $db: this.toJSON().$db.filter(function (e) {return "action" !== e.$method;}) };} }, { key: "get", value: function get() {return this._send("get", Array.from(arguments));} }, { key: "add", value: function add() {return this._send("add", Array.from(arguments));} }, { key: "remove", value: function remove() {return this._send("remove", Array.from(arguments));} }, { key: "update", value: function update() {return this._send("update", Array.from(arguments));} }, { key: "end", value: function end() {return this._send("end", Array.from(arguments));} }, { key: "set", value: function set() {throw new Error("clientDB禁止使用set方法");} }, { key: "_send", value: function _send(e, t) {var n = this.getAction(),r = this.getCommand();return r.$db.push({ $method: e, $param: st(t) }), s({ action: n, command: r });} }, { key: "useAggregate", get: function get() {var e = this,t = !1;for (; e.prevStage;) {e = e.prevStage;var _n7 = e.content.$method;if ("aggregate" === _n7 || "pipeline" === _n7) {t = !0;break;}}return t;} }, { key: "count", get: function get() {if (!this.useAggregate) return function () {return this._send("count", Array.from(arguments));};var e = this;return function () {return c({ $method: "count", $param: st(Array.from(arguments)) }, e);};} }, { key: "multiSend", get: function get() {} }]);return r;}();var o = ["db.Geo", "db.command", "command.aggregate"];function i(e, t) {return o.indexOf("".concat(e, ".").concat(t)) > -1;}function c(e, t) {return nt(new r(e, t), { get: function get(e, t) {var n = "db";return e && e.content && (n = e.content.$method), i(n, t) ? c({ $method: t }, e) : function () {return c({ $method: t, $param: st(Array.from(arguments)) }, e);};} });}function u(_ref27) {var e = _ref27.path,t = _ref27.method;return /*#__PURE__*/function () {function _class3() {_classCallCheck(this, _class3);this.param = Array.from(arguments);}_createClass(_class3, [{ key: "toJSON", value: function toJSON() {return { $newDb: [].concat(_toConsumableArray(e.map(function (e) {return { $method: e };})), [{ $method: t, $param: this.param }]) };} }]);return _class3;}();}var l = { auth: { on: function on(e, n) {t[e] = t[e] || [], t[e].indexOf(n) > -1 || t[e].push(n);}, off: function off(e, n) {t[e] = t[e] || [];var s = t[e].indexOf(n);-1 !== s && t[e].splice(s, 1);} }, on: function on(e, t) {n[e] = n[e] || [], n[e].indexOf(t) > -1 || n[e].push(t);}, off: function off(e, t) {n[e] = n[e] || [];var s = n[e].indexOf(t);-1 !== s && n[e].splice(s, 1);}, env: nt({}, { get: function get(e, t) {return { $env: t };} }), Geo: nt({}, { get: function get(e, t) {return u({ path: ["Geo"], method: t });} }), getCloudEnv: function getCloudEnv(e) {if ("string" != typeof e || !e.trim()) throw new Error("getCloudEnv参数错误");return { $env: e.replace("$cloudEnv_", "") };}, multiSend: function multiSend() {var e = Array.from(arguments);return s({ multiCommand: e.map(function (e) {var t = e.getAction(),n = e.getCommand();if ("getTemp" !== n.$db[n.$db.length - 1].$method) throw new Error("multiSend只支持子命令内使用getTemp");return { action: t, command: n };}) }).then(function (t) {for (var _n8 = 0; _n8 < e.length; _n8++) {var _s11 = e[_n8];_s11.udb && "function" == typeof _s11.udb.setResult && _s11.udb.setResult(t.result.dataList[_n8]);}return Promise.resolve(t);}, function (t) {for (var _n9 = 0; _n9 < e.length; _n9++) {var _s12 = e[_n9];_s12.udb && "function" == typeof _s12.udb.setResult && _s12.udb.setResult(t);}return Promise.reject(t);});}, get serverDate() {return u({ path: [], method: "serverDate" });}, get RegExp() {return u({ path: [], method: "RegExp" });} },d = nt(l, { get: function get(e, t) {return i("db", t) ? c({ $method: t }) : function () {return c({ $method: t, $param: st(Array.from(arguments)) });};} });return this._database = d, d;};}(t), function (e) {e.getCurrentUserInfo = rt, e.chooseAndUploadFile = ot.initChooseAndUploadFile(e), Object.assign(e, { get mixinDatacom() {return at(e);} });}(t);return ["callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "chooseAndUploadFile"].forEach(function (e) {t[e] && (t[e] = T(t[e], e));}), t.init = this.init, t;} }]);return _class2;}())();(function () {{var e = d;var t = {};if (1 === e.length) t = e[0], ut = ut.init(t), ut.isDefault = !0;else {var _t11 = ["auth", "callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "database", "getCurrentUSerInfo"];var _n10;_n10 = e && e.length > 0 ? "应用有多个服务空间，请通过uniCloud.init方法指定要使用的服务空间" : f ? "应用未关联服务空间，请在uniCloud目录右键关联服务空间" : "uni-app cli项目内使用uniCloud需要使用HBuilderX的运行菜单运行项目，且需要在uniCloud目录关联服务空间", _t11.forEach(function (e) {ut[e] = function () {return console.error(_n10), Promise.reject(new P({ code: "SYS_ERR", message: _n10 }));};});}Object.assign(ut, { get mixinDatacom() {return at(ut);} }), ut.addInterceptor = w, ut.removeInterceptor = v, u && "h5" === h && (window.uniCloud = ut);}})();var ht = ut;var _default2 = ht;exports.default = _default2;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3), __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 126:
/*!*******************************************************************************!*\
  !*** /Users/chengheai/code/private/write-messages/pages.json?{"type":"stat"} ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "__UNI__EF8075A" };exports.default = _default;

/***/ }),

/***/ 13:
/*!*******************************************************************!*\
  !*** /Users/chengheai/code/private/write-messages/api sync \.js$ ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./article.js": 14,
	"./index.js": 12,
	"./like.js": 16,
	"./user.js": 17,
	"./wall.js": 18
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 13;

/***/ }),

/***/ 14:
/*!*******************************************************************!*\
  !*** /Users/chengheai/code/private/write-messages/api/article.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.fetchList = fetchList;exports.fetchDel = fetchDel;exports.fetchArticle = fetchArticle;exports.editArticle = editArticle;exports.addArticle = addArticle;var _http = __webpack_require__(/*! @/utils/http */ 15);



// 列表
function fetchList(data) {
  return (0, _http.request)({
    method: 'GET',
    url: '/api/article/list',
    data: data });

}
// 删除
function fetchDel(data) {
  return (0, _http.request)({
    method: 'DELETE',
    url: "/api/article/delete/".concat(data._id),
    data: data });

}

// 详情
function fetchArticle(data) {
  return (0, _http.request)({
    method: 'GET',
    url: "/api/article/detail/".concat(data._id),
    data: data });

}
// 更新
function editArticle(data) {
  return (0, _http.request)({
    method: 'PUT',
    url: "/api/article/update/".concat(data._id),
    data: data });

}
// 创建
function addArticle(data) {
  return (0, _http.request)({
    method: 'POST',
    url: "/api/article/add",
    data: data });

}

/***/ }),

/***/ 141:
/*!********************************************************************************************************!*\
  !*** /Users/chengheai/code/private/write-messages/uni_modules/uni-popup/components/uni-popup/popup.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default =
{
  data: function data() {
    return {};


  },
  created: function created() {
    this.popup = this.getParent();
  },
  methods: {
    /**
              * 获取父元素实例
              */
    getParent: function getParent() {var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'uniPopup';
      var parent = this.$parent;
      var parentName = parent.$options.name;
      while (parentName !== name) {
        parent = parent.$parent;
        if (!parent) return false;
        parentName = parent.$options.name;
      }
      return parent;
    } } };exports.default = _default;

/***/ }),

/***/ 149:
/*!*******************************************************************!*\
  !*** /Users/chengheai/code/private/write-messages/utils/lunar.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.calendar = void 0; /**
                                                                                                      * @1900-2100区间内的公历、农历互转
                                                                                                      * @charset UTF-8
                                                                                                      * @Author  Jea杨(JJonline@JJonline.Cn)
                                                                                                      * @Time    2014-7-21
                                                                                                      * @Time    2016-8-13 Fixed 2033hex、Attribution Annals
                                                                                                      * @Time    2016-9-25 Fixed lunar LeapMonth Param Bug
                                                                                                      * @Time    2017-7-24 Fixed use getTerm Func Param Error.use solar year,NOT lunar year
                                                                                                      * @Version 1.0.3
                                                                                                      * @公历转农历：calendar.solar2lunar(1987,11,01); //[you can ignore params of prefix 0]
                                                                                                      * @农历转公历：calendar.lunar2solar(1987,09,10); //[you can ignore params of prefix 0]
                                                                                                      */
var calendar = {

  /**
                   * 农历1900-2100的润大小信息表
                   * @Array Of Property
                   * @return Hex
                   */
  lunarInfo: [0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, //1900-1909
  0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, //1910-1919
  0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, //1920-1929
  0x06566, 0x0d4a0, 0x0ea50, 0x16a95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, //1930-1939
  0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, //1940-1949
  0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, //1950-1959
  0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, //1960-1969
  0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, //1970-1979
  0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, //1980-1989
  0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x05ac0, 0x0ab60, 0x096d5, 0x092e0, //1990-1999
  0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, //2000-2009
  0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, //2010-2019
  0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, //2020-2029
  0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, //2030-2039
  0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, //2040-2049
  /**Add By JJonline@JJonline.Cn**/
  0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, //2050-2059
  0x092e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, //2060-2069
  0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, //2070-2079
  0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, //2080-2089
  0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252, //2090-2099
  0x0d520], //2100

  /**
    * 公历每个月份的天数普通表
    * @Array Of Property
    * @return Number
    */
  solarMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],

  /**
                                                                  * 天干地支之天干速查表
                                                                  * @Array Of Property trans["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
                                                                  * @return Cn string
                                                                  */
  Gan: ["\u7532", "\u4E59", "\u4E19", "\u4E01", "\u620A", "\u5DF1", "\u5E9A", "\u8F9B", "\u58EC", "\u7678"],

  /**
                                                                                                               * 天干地支之地支速查表
                                                                                                               * @Array Of Property
                                                                                                               * @trans["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
                                                                                                               * @return Cn string
                                                                                                               */
  Zhi: ["\u5B50", "\u4E11", "\u5BC5", "\u536F", "\u8FB0", "\u5DF3", "\u5348", "\u672A", "\u7533", "\u9149", "\u620C", "\u4EA5"],

  /**
                                                                                                                                   * 天干地支之地支速查表<=>生肖
                                                                                                                                   * @Array Of Property
                                                                                                                                   * @trans["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
                                                                                                                                   * @return Cn string
                                                                                                                                   */
  Animals: ["\u9F20", "\u725B", "\u864E", "\u5154", "\u9F99", "\u86C7", "\u9A6C", "\u7F8A", "\u7334", "\u9E21", "\u72D7", "\u732A"],

  /**
                                                                                                                                      * 阳历节日
                                                                                                                                      */
  festival: {
    '1-1': { title: '元旦节' },
    '2-14': { title: '情人节' },
    '5-1': { title: '劳动节' },
    '5-4': { title: '青年节' },
    '6-1': { title: '儿童节' },
    '9-10': { title: '教师节' },
    '10-1': { title: '国庆节' },
    '12-25': { title: '圣诞节' },

    '3-8': { title: '妇女节' },
    '3-12': { title: '植树节' },
    '4-1': { title: '愚人节' },
    '5-12': { title: '护士节' },
    '7-1': { title: '建党节' },
    '8-1': { title: '建军节' },
    '12-24': { title: '平安夜' } },


  /**
                                  * 农历节日
                                  */
  lfestival: {
    '12-30': { title: '除夕' },
    '1-1': { title: '春节' },
    '1-15': { title: '元宵节' },
    '2-2': { title: '龙抬头' },
    '5-5': { title: '端午节' },
    '7-7': { title: '七夕节' },
    '7-15': { title: '中元节' },
    '8-15': { title: '中秋节' },
    '9-9': { title: '重阳节' },
    '10-1': { title: '寒衣节' },
    '10-15': { title: '下元节' },
    '12-8': { title: '腊八节' },
    '12-23': { title: '北方小年' },
    '12-24': { title: '南方小年' } },


  /**
                                   * 返回默认定义的阳历节日
                                   */
  getFestival: function getFestival() {
    return this.festival;
  },

  /**
      * 返回默认定义的内容里节日
      */
  getLunarFestival: function getLunarFestival() {
    return this.lfestival;
  },

  /**
      * 
      * @param {Object} 按照festival的格式输入数据，设置阳历节日
      */
  setFestival: function setFestival() {var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.festival = param;
  },

  /**
      * 
      * @param {Object} 按照lfestival的格式输入数据，设置农历节日
      */
  setLunarFestival: function setLunarFestival() {var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.lfestival = param;
  },

  /**
       * 24节气速查表
       * @Array Of Property
       * @trans["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]
       * @return Cn string
       */
  solarTerm: ["\u5C0F\u5BD2", "\u5927\u5BD2", "\u7ACB\u6625", "\u96E8\u6C34", "\u60CA\u86F0", "\u6625\u5206", "\u6E05\u660E", "\u8C37\u96E8", "\u7ACB\u590F", "\u5C0F\u6EE1", "\u8292\u79CD", "\u590F\u81F3", "\u5C0F\u6691", "\u5927\u6691", "\u7ACB\u79CB", "\u5904\u6691", "\u767D\u9732", "\u79CB\u5206", "\u5BD2\u9732", "\u971C\u964D", "\u7ACB\u51AC", "\u5C0F\u96EA", "\u5927\u96EA", "\u51AC\u81F3"],

  /**
                                                                                                                                                                                                                                                                                                                                                                                                                 * 1900-2100各年的24节气日期速查表
                                                                                                                                                                                                                                                                                                                                                                                                                 * @Array Of Property
                                                                                                                                                                                                                                                                                                                                                                                                                 * @return 0x string For splice
                                                                                                                                                                                                                                                                                                                                                                                                                 */
  sTermInfo: ['9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f',
  '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
  '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f',
  'b027097bd097c36b0b6fc9274c91aa', '9778397bd19801ec9210c965cc920e', '97b6b97bd19801ec95f8c965cc920f',
  '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd197c36c9210c9274c91aa',
  '97b6b97bd19801ec95f8c965cc920e', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2',
  '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bcf97c3598082c95f8e1cfcc920f',
  '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e',
  '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f',
  '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
  '97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd07f595b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9210c8dc2', '9778397bd19801ec9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f',
  '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',
  '97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
  '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bd07f1487f595b0b0bc920fb0722',
  '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
  '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
  '97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
  '9778397bd097c36b0b6fc9210c91aa', '97b6b97bd197c36c9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',
  '97b6b7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
  '9778397bd097c36b0b70c9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
  '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
  '97b6b7f0e47f531b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
  '9778397bd097c36b0b6fc9210c91aa', '97b6b7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '977837f0e37f149b0723b0787b0721',
  '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c35b0b6fc9210c8dc2',
  '977837f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd',
  '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
  '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd',
  '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
  '977837f0e37f14998082b0723b06bd', '7f07e7f0e37f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721',
  '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5',
  '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f531b0b0bb0b6fb0722',
  '7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
  '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35',
  '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
  '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721',
  '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd',
  '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35',
  '7ec967f0e37f14998082b0723b06bd', '7f07e7f0e37f14998083b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
  '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14898082b0723b02d5', '7f07e7f0e37f14998082b0787b0721',
  '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66aa89801e9808297c35', '665f67f0e37f14898082b0723b02d5',
  '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66a449801e9808297c35',
  '665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
  '7f07e7f0e47f531b0723b0b6fb0721', '7f0e26665b66a449801e9808297c35', '665f67f0e37f1489801eb072297c35',
  '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722'],

  /**
                                                                                                           * 数字转中文速查表
                                                                                                           * @Array Of Property
                                                                                                           * @trans ['日','一','二','三','四','五','六','七','八','九','十']
                                                                                                           * @return Cn string
                                                                                                           */
  nStr1: ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u4E03", "\u516B", "\u4E5D", "\u5341"],

  /**
                                                                                                                           * 日期转农历称呼速查表
                                                                                                                           * @Array Of Property
                                                                                                                           * @trans ['初','十','廿','卅']
                                                                                                                           * @return Cn string
                                                                                                                           */
  nStr2: ["\u521D", "\u5341", "\u5EFF", "\u5345"],

  /**
                                                     * 月份转农历称呼速查表
                                                     * @Array Of Property
                                                     * @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']
                                                     * @return Cn string
                                                     */
  nStr3: ["\u6B63", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u4E03", "\u516B", "\u4E5D", "\u5341", "\u51AC", "\u814A"],

  /**
                                                                                                                                     * 返回农历y年一整年的总天数
                                                                                                                                     * @param lunar Year
                                                                                                                                     * @return Number
                                                                                                                                     * @eg:var count = calendar.lYearDays(1987) ;//count=387
                                                                                                                                     */
  lYearDays: function lYearDays(y) {
    var i,sum = 348;
    for (i = 0x8000; i > 0x8; i >>= 1) {sum += this.lunarInfo[y - 1900] & i ? 1 : 0;}
    return sum + this.leapDays(y);
  },

  /**
       * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
       * @param lunar Year
       * @return Number (0-12)
       * @eg:var leapMonth = calendar.leapMonth(1987) ;//leapMonth=6
       */
  leapMonth: function leapMonth(y) {//闰字编码 \u95f0
    return this.lunarInfo[y - 1900] & 0xf;
  },

  /**
       * 返回农历y年闰月的天数 若该年没有闰月则返回0
       * @param lunar Year
       * @return Number (0、29、30)
       * @eg:var leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29
       */
  leapDays: function leapDays(y) {
    if (this.leapMonth(y)) {
      return this.lunarInfo[y - 1900] & 0x10000 ? 30 : 29;
    }
    return 0;
  },

  /**
       * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
       * @param lunar Year
       * @return Number (-1、29、30)
       * @eg:var MonthDay = calendar.monthDays(1987,9) ;//MonthDay=29
       */
  monthDays: function monthDays(y, m) {
    if (m > 12 || m < 1) {return -1;} //月份参数从1至12，参数错误返回-1
    return this.lunarInfo[y - 1900] & 0x10000 >> m ? 30 : 29;
  },

  /**
       * 返回公历(!)y年m月的天数
       * @param solar Year
       * @return Number (-1、28、29、30、31)
       * @eg:var solarMonthDay = calendar.leapDays(1987) ;//solarMonthDay=30
       */
  solarDays: function solarDays(y, m) {
    if (m > 12 || m < 1) {return -1;} //若参数错误 返回-1
    var ms = m - 1;
    if (ms == 1) {//2月份的闰平规律测算后确认返回28或29
      return y % 4 == 0 && y % 100 != 0 || y % 400 == 0 ? 29 : 28;
    } else {
      return this.solarMonth[ms];
    }
  },

  /**
      * 农历年份转换为干支纪年
      * @param  lYear 农历年的年份数
      * @return Cn string
      */
  toGanZhiYear: function toGanZhiYear(lYear) {
    var ganKey = (lYear - 3) % 10;
    var zhiKey = (lYear - 3) % 12;
    if (ganKey == 0) ganKey = 10; //如果余数为0则为最后一个天干
    if (zhiKey == 0) zhiKey = 12; //如果余数为0则为最后一个地支
    return this.Gan[ganKey - 1] + this.Zhi[zhiKey - 1];

  },

  /**
      * 公历月、日判断所属星座
      * @param  cMonth [description]
      * @param  cDay [description]
      * @return Cn string
      */
  toAstro: function toAstro(cMonth, cDay) {
    var s = "\u9B54\u7FAF\u6C34\u74F6\u53CC\u9C7C\u767D\u7F8A\u91D1\u725B\u53CC\u5B50\u5DE8\u87F9\u72EE\u5B50\u5904\u5973\u5929\u79E4\u5929\u874E\u5C04\u624B\u9B54\u7FAF";
    var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
    return s.substr(cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0), 2) + "\u5EA7"; //座
  },

  /**
       * 传入offset偏移量返回干支
       * @param offset 相对甲子的偏移量
       * @return Cn string
       */
  toGanZhi: function toGanZhi(offset) {
    return this.Gan[offset % 10] + this.Zhi[offset % 12];
  },

  /**
       * 传入公历(!)y年获得该年第n个节气的公历日期
       * @param y公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起
       * @return day Number
       * @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
       */
  getTerm: function getTerm(y, n) {
    if (y < 1900 || y > 2100) {return -1;}
    if (n < 1 || n > 24) {return -1;}
    var _table = this.sTermInfo[y - 1900];
    var _info = [
    parseInt('0x' + _table.substr(0, 5)).toString(),
    parseInt('0x' + _table.substr(5, 5)).toString(),
    parseInt('0x' + _table.substr(10, 5)).toString(),
    parseInt('0x' + _table.substr(15, 5)).toString(),
    parseInt('0x' + _table.substr(20, 5)).toString(),
    parseInt('0x' + _table.substr(25, 5)).toString()];

    var _calday = [
    _info[0].substr(0, 1),
    _info[0].substr(1, 2),
    _info[0].substr(3, 1),
    _info[0].substr(4, 2),

    _info[1].substr(0, 1),
    _info[1].substr(1, 2),
    _info[1].substr(3, 1),
    _info[1].substr(4, 2),

    _info[2].substr(0, 1),
    _info[2].substr(1, 2),
    _info[2].substr(3, 1),
    _info[2].substr(4, 2),

    _info[3].substr(0, 1),
    _info[3].substr(1, 2),
    _info[3].substr(3, 1),
    _info[3].substr(4, 2),

    _info[4].substr(0, 1),
    _info[4].substr(1, 2),
    _info[4].substr(3, 1),
    _info[4].substr(4, 2),

    _info[5].substr(0, 1),
    _info[5].substr(1, 2),
    _info[5].substr(3, 1),
    _info[5].substr(4, 2)];

    return parseInt(_calday[n - 1]);
  },

  /**
       * 传入农历数字月份返回汉语通俗表示法
       * @param lunar month
       * @return Cn string
       * @eg:var cnMonth = calendar.toChinaMonth(12) ;//cnMonth='腊月'
       */
  toChinaMonth: function toChinaMonth(m) {// 月 => \u6708
    if (m > 12 || m < 1) {return -1;} //若参数错误 返回-1
    var s = this.nStr3[m - 1];
    s += "\u6708"; //加上月字
    return s;
  },

  /**
       * 传入农历日期数字返回汉字表示法
       * @param lunar day
       * @return Cn string
       * @eg:var cnDay = calendar.toChinaDay(21) ;//cnMonth='廿一'
       */
  toChinaDay: function toChinaDay(d) {//日 => \u65e5
    var s;
    switch (d) {
      case 10:
        s = "\u521D\u5341";break;
      case 20:
        s = "\u4E8C\u5341";break;
        break;
      case 30:
        s = "\u4E09\u5341";break;
        break;
      default:
        s = this.nStr2[Math.floor(d / 10)];
        s += this.nStr1[d % 10];}

    return s;
  },

  /**
       * 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”
       * @param y year
       * @return Cn string
       * @eg:var animal = calendar.getAnimal(1987) ;//animal='兔'
       */
  getAnimal: function getAnimal(y) {
    return this.Animals[(y - 4) % 12];
  },

  /**
       * 传入阳历年月日获得详细的公历、农历object信息 <=>JSON
       * @param y  solar year
       * @param m  solar month
       * @param d  solar day
       * @return JSON object
       * @eg:console.log(calendar.solar2lunar(1987,11,01));
       */
  solar2lunar: function solar2lunar(y, m, d) {//参数区间1900.1.31~2100.12.31
    y = parseInt(y);
    m = parseInt(m);
    d = parseInt(d);
    //年份限定、上限
    if (y < 1900 || y > 2100) {
      return -1; // undefined转换为数字变为NaN
    }
    //公历传参最下限
    if (y == 1900 && m == 1 && d < 31) {
      return -1;
    }
    //未传参  获得当天
    if (!y) {
      var objDate = new Date();
    } else {
      var objDate = new Date(y, parseInt(m) - 1, d);
    }
    var i,leap = 0,temp = 0;
    //修正ymd参数
    var y = objDate.getFullYear(),
    m = objDate.getMonth() + 1,
    d = objDate.getDate();
    var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;
    for (i = 1900; i < 2101 && offset > 0; i++) {
      temp = this.lYearDays(i);
      offset -= temp;
    }
    if (offset < 0) {
      offset += temp;i--;
    }

    //是否今天
    var isTodayObj = new Date(),
    isToday = false;
    if (isTodayObj.getFullYear() == y && isTodayObj.getMonth() + 1 == m && isTodayObj.getDate() == d) {
      isToday = true;
    }
    //星期几
    var nWeek = objDate.getDay(),
    cWeek = this.nStr1[nWeek];
    //数字表示周几顺应天朝周一开始的惯例
    if (nWeek == 0) {
      nWeek = 7;
    }
    //农历年
    var year = i;
    var leap = this.leapMonth(i); //闰哪个月
    var isLeap = false;

    //效验闰月
    for (i = 1; i < 13 && offset > 0; i++) {
      //闰月
      if (leap > 0 && i == leap + 1 && isLeap == false) {
        --i;
        isLeap = true;temp = this.leapDays(year); //计算农历闰月天数
      } else
      {
        temp = this.monthDays(year, i); //计算农历普通月天数
      }
      //解除闰月
      if (isLeap == true && i == leap + 1) {isLeap = false;}
      offset -= temp;
    }
    // 闰月导致数组下标重叠取反
    if (offset == 0 && leap > 0 && i == leap + 1)
    {
      if (isLeap) {
        isLeap = false;
      } else {
        isLeap = true;--i;
      }
    }
    if (offset < 0)
    {
      offset += temp;--i;
    }
    //农历月
    var month = i;
    //农历日
    var day = offset + 1;
    //天干地支处理
    var sm = m - 1;
    var gzY = this.toGanZhiYear(year);

    // 当月的两个节气
    // bugfix-2017-7-24 11:03:38 use lunar Year Param `y` Not `year`
    var firstNode = this.getTerm(y, m * 2 - 1); //返回当月「节」为几日开始
    var secondNode = this.getTerm(y, m * 2); //返回当月「节」为几日开始

    // 依据12节气修正干支月
    var gzM = this.toGanZhi((y - 1900) * 12 + m + 11);
    if (d >= firstNode) {
      gzM = this.toGanZhi((y - 1900) * 12 + m + 12);
    }

    //传入的日期的节气与否
    var isTerm = false;
    var Term = null;
    if (firstNode == d) {
      isTerm = true;
      Term = this.solarTerm[m * 2 - 2];
    }
    if (secondNode == d) {
      isTerm = true;
      Term = this.solarTerm[m * 2 - 1];
    }
    //日柱 当月一日与 1900/1/1 相差天数
    var dayCyclical = Date.UTC(y, sm, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
    var gzD = this.toGanZhi(dayCyclical + d - 1);
    //该日期所属的星座
    var astro = this.toAstro(m, d);

    var solarDate = y + '-' + m + '-' + d;
    var lunarDate = year + '-' + month + '-' + day;

    var festival = this.festival;
    var lfestival = this.lfestival;

    var festivalDate = m + '-' + d;
    var lunarFestivalDate = month + '-' + day;

    return {
      date: solarDate,
      lunarDate: lunarDate,
      festival: festival[festivalDate] ? festival[festivalDate].title : null,
      lunarFestival: lfestival[lunarFestivalDate] ? lfestival[lunarFestivalDate].title : null,
      'lYear': year,
      'lMonth': month,
      'lDay': day,
      'Animal': this.getAnimal(year),
      'IMonthCn': (isLeap ? "\u95F0" : '') + this.toChinaMonth(month),
      'IDayCn': this.toChinaDay(day),
      'cYear': y,
      'cMonth': m,
      'cDay': d,
      'gzYear': gzY,
      'gzMonth': gzM,
      'gzDay': gzD,
      'isToday': isToday,
      'isLeap': isLeap,
      'nWeek': nWeek,
      'ncWeek': "\u661F\u671F" + cWeek,
      'isTerm': isTerm,
      'Term': Term,
      'astro': astro };

  },

  /**
       * 传入农历年月日以及传入的月份是否闰月获得详细的公历、农历object信息 <=>JSON
       * @param y  lunar year
       * @param m  lunar month
       * @param d  lunar day
       * @param isLeapMonth  lunar month is leap or not.[如果是农历闰月第四个参数赋值true即可]
       * @return JSON object
       * @eg:console.log(calendar.lunar2solar(1987,9,10));
       */
  lunar2solar: function lunar2solar(y, m, d, isLeapMonth) {//参数区间1900.1.31~2100.12.1
    y = parseInt(y);
    m = parseInt(m);
    d = parseInt(d);
    var isLeapMonth = !!isLeapMonth;
    var leapOffset = 0;
    var leapMonth = this.leapMonth(y);
    var leapDay = this.leapDays(y);
    if (isLeapMonth && leapMonth != m) {return -1;} //传参要求计算该闰月公历 但该年得出的闰月与传参的月份并不同
    if (y == 2100 && m == 12 && d > 1 || y == 1900 && m == 1 && d < 31) {return -1;} //超出了最大极限值
    var day = this.monthDays(y, m);
    var _day = day;
    //bugFix 2016-9-25
    //if month is leap, _day use leapDays method
    if (isLeapMonth) {
      _day = this.leapDays(y, m);
    }
    if (y < 1900 || y > 2100 || d > _day) {return -1;} //参数合法性效验

    //计算农历的时间差
    var offset = 0;
    for (var i = 1900; i < y; i++) {
      offset += this.lYearDays(i);
    }
    var leap = 0,isAdd = false;
    for (var i = 1; i < m; i++) {
      leap = this.leapMonth(y);
      if (!isAdd) {//处理闰月
        if (leap <= i && leap > 0) {
          offset += this.leapDays(y);isAdd = true;
        }
      }
      offset += this.monthDays(y, i);
    }
    //转换闰月农历 需补充该年闰月的前一个月的时差
    if (isLeapMonth) {offset += day;}
    //1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)
    var stmap = Date.UTC(1900, 1, 30, 0, 0, 0);
    var calObj = new Date((offset + d - 31) * 86400000 + stmap);
    var cY = calObj.getUTCFullYear();
    var cM = calObj.getUTCMonth() + 1;
    var cD = calObj.getUTCDate();

    return this.solar2lunar(cY, cM, cD);
  } };exports.calendar = calendar;

/***/ }),

/***/ 15:
/*!******************************************************************!*\
  !*** /Users/chengheai/code/private/write-messages/utils/http.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.request = request;exports.abortTask = abortTask;exports.RES_ROOT = exports.BASE_URL = void 0;var _str = __webpack_require__(/*! ./str.js */ 96);


// env: testing
var envVersion = __wxConfig.envVersion;
console.log('envVersion:', envVersion);
// export const BASE_URL = envVersion === 'release' ? 'https://api.stack021.cn' : 'http://localhost:8899'
// export const BASE_URL = 'http://47.101.210.181:8899'

var BASE_URL = 'https://api.stack021.cn';
// export const BASE_URL = 'http://localhost:8899'

// 回显图片
exports.BASE_URL = BASE_URL;var RES_ROOT = "https://static.stack021.cn";exports.RES_ROOT = RES_ROOT;

var lastRequestTask;
var islogin = true;
/**
                     * 网络请求
                     */
function request(params) {var isToken = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var showLoading = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return new Promise(function (resolve, reject) {
    var url = "".concat(BASE_URL).concat(params.url);
    var data = params.data || {};
    var header = params.header || {};
    var method = params.method || 'POST';
    var loadingTitle = params.loadingTitle || '加载数据...';
    var tabIndex = uni.getStorageSync('tabIndex');
    if (isToken) {
      header.token = uni.getStorageSync('token');
    }
    if (showLoading) {
      uni.showLoading({
        title: loadingTitle,
        mask: false });

    }
    lastRequestTask = uni.request({
      url: url,
      data: data,
      header: header,
      method: method,
      success: function success(res) {
        setTimeout(function () {
          uni.hideLoading();
        }, 500);
        console.log('[' + url + '] [' + method + '] :', res.data);
        var pages = getCurrentPages();
        var page = pages[pages.length - 1].route;
        // console.log('page:',page)
        if (res.statusCode === 200) {
          if (res.data.code === 200) {
            resolve(res.data);
          } else if (res.data.code === 401) {// 需要登录
            (0, _str.clearStorage)();
            if (tabIndex != 2) {
              uni.showModal({
                title: '提示',
                content: '登录已过期，请重新登录',
                showCancel: false,
                success: function success(res) {
                  if (res.confirm) {
                    console.log('confirm');
                    console.log('tabIndex:', tabIndex);
                    uni.setStorageSync('tabIndex', 2);
                    uni.setStorageSync('hasLogin', -1);
                    uni.redirectTo({
                      url: '../index/index' });

                  }
                } });

            }
            reject(res.data);
          } else {
            uni.showToast({
              icon: 'none',
              title: res.data.info || '请求失败' });

            reject(res.data);
          }
        } else {
          reject(res.data);
        }
      },
      fail: function fail(e) {
        uni.hideLoading();
        console.error('[' + url + '] [' + method + '] :', e);
        reject(e);
      } });

  });
}

function abortTask() {
  if (lastRequestTask) {
    lastRequestTask.abort();
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 157:
/*!****************************************************************************************************************************!*\
  !*** /Users/chengheai/code/private/write-messages/uni_modules/uni-transition/components/uni-transition/createAnimation.js ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.createAnimation = createAnimation;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} // const defaultOption = {
// 	duration: 300,
// 	timingFunction: 'linear',
// 	delay: 0,
// 	transformOrigin: '50% 50% 0'
// }
var


MPAnimation = /*#__PURE__*/function () {
  function MPAnimation(options, _this) {_classCallCheck(this, MPAnimation);
    this.options = options;
    this.animation = uni.createAnimation(options);
    this.currentStepAnimates = {};
    this.next = 0;
    this.$ = _this;

  }_createClass(MPAnimation, [{ key: "_nvuePushAnimates", value: function _nvuePushAnimates(

    type, args) {
      var aniObj = this.currentStepAnimates[this.next];
      var styles = {};
      if (!aniObj) {
        styles = {
          styles: {},
          config: {} };

      } else {
        styles = aniObj;
      }
      if (animateTypes1.includes(type)) {
        if (!styles.styles.transform) {
          styles.styles.transform = '';
        }
        var unit = '';
        if (type === 'rotate') {
          unit = 'deg';
        }
        styles.styles.transform += "".concat(type, "(").concat(args + unit, ") ");
      } else {
        styles.styles[type] = "".concat(args);
      }
      this.currentStepAnimates[this.next] = styles;
    } }, { key: "_animateRun", value: function _animateRun()
    {var styles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var ref = this.$.$refs['ani'].ref;
      if (!ref) return;
      return new Promise(function (resolve, reject) {
        nvueAnimation.transition(ref, _objectSpread({
          styles: styles },
        config),
        function (res) {
          resolve();
        });
      });
    } }, { key: "_nvueNextAnimate", value: function _nvueNextAnimate(

    animates) {var _this2 = this;var step = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var fn = arguments.length > 2 ? arguments[2] : undefined;
      var obj = animates[step];
      if (obj) {var

        styles =

        obj.styles,config = obj.config;
        this._animateRun(styles, config).then(function () {
          step += 1;
          _this2._nvueNextAnimate(animates, step, fn);
        });
      } else {
        this.currentStepAnimates = {};
        typeof fn === 'function' && fn();
        this.isEnd = true;
      }
    } }, { key: "step", value: function step()

    {var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.animation.step(config);






      return this;
    } }, { key: "run", value: function run(

    fn) {

      this.$.animationData = this.animation.export();
      this.$.timer = setTimeout(function () {
        typeof fn === 'function' && fn();
      }, this.$.durationTime);








    } }]);return MPAnimation;}();



var animateTypes1 = ['matrix', 'matrix3d', 'rotate', 'rotate3d', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scale3d',
'scaleX', 'scaleY', 'scaleZ', 'skew', 'skewX', 'skewY', 'translate', 'translate3d', 'translateX', 'translateY',
'translateZ'];

var animateTypes2 = ['opacity', 'backgroundColor'];
var animateTypes3 = ['width', 'height', 'left', 'right', 'top', 'bottom'];
animateTypes1.concat(animateTypes2, animateTypes3).forEach(function (type) {
  MPAnimation.prototype[type] = function () {var _this$animation;

    (_this$animation = this.animation)[type].apply(_this$animation, arguments);




    return this;
  };
});

function createAnimation(option, _this) {
  if (!_this) return;
  clearTimeout(_this.timer);
  return new MPAnimation(option, _this);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 16:
/*!****************************************************************!*\
  !*** /Users/chengheai/code/private/write-messages/api/like.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.fetchList = fetchList;exports.fetchLike = fetchLike;exports.fetchReport = fetchReport;var _http = __webpack_require__(/*! @/utils/http */ 15);


// list
function fetchList(data) {
  return (0, _http.request)({
    method: 'GET',
    url: '/api/article/like/list',
    data: data });

}
// like
function fetchLike(data) {
  return (0, _http.request)({
    method: 'POST',
    url: '/api/article/like',
    data: data });

}
// report
function fetchReport(data) {
  return (0, _http.request)({
    method: 'POST',
    url: '/api/article/report',
    data: data });

}

/***/ }),

/***/ 17:
/*!****************************************************************!*\
  !*** /Users/chengheai/code/private/write-messages/api/user.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.login = login;exports.fetchUser = fetchUser;exports.fetchUpload = fetchUpload;var _http = __webpack_require__(/*! @/utils/http */ 15);


/**
                                                                                                                                                                                                       * 登录接口
                                                                                                                                                                                                       * @param {object} data
                                                                                                                                                                                                       */
function login(data) {
  return (0, _http.request)({
    method: 'POST',
    url: '/api/login',
    data: data },
  false);
}
// 个人信息
function fetchUser(data) {
  return (0, _http.request)({
    method: 'POST',
    url: '/api/user/detail',
    data: data });

}

// 上传图片
function fetchUpload(data) {
  return (0, _http.request)({
    method: 'POST',
    url: '/api/file/upload',
    data: data });

}

/***/ }),

/***/ 18:
/*!****************************************************************!*\
  !*** /Users/chengheai/code/private/write-messages/api/wall.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.fetchList = fetchList;exports.editWall = editWall;exports.fetchTheme = fetchTheme;var _http = __webpack_require__(/*! @/utils/http */ 15);



// 列表
function fetchList(data) {
  return (0, _http.request)({
    method: 'GET',
    url: '/api/wall/list',
    data: data });

}

// 更新
function editWall(data) {
  return (0, _http.request)({
    method: 'PUT',
    url: "/api/wall/update/".concat(data._id),
    data: data });

}

// theme
function fetchTheme(data) {
  return (0, _http.request)({
    method: 'GET',
    url: '/api/theme/pick',
    data: data },
  true, false);
}

/***/ }),

/***/ 19:
/*!************************************************************************************!*\
  !*** /Users/chengheai/code/private/write-messages/node_modules/dayjs/dayjs.min.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function (t, e) { true ? module.exports = e() : undefined;}(this, function () {"use strict";var t = 1e3,e = 6e4,n = 36e5,r = "millisecond",i = "second",s = "minute",u = "hour",a = "day",o = "week",f = "month",h = "quarter",c = "year",d = "date",$ = "Invalid Date",l = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_") },m = function m(t, e, n) {var r = String(t);return !r || r.length >= e ? t : "" + Array(e + 1 - r.length).join(n) + t;},g = { s: m, z: function z(t) {var e = -t.utcOffset(),n = Math.abs(e),r = Math.floor(n / 60),i = n % 60;return (e <= 0 ? "+" : "-") + m(r, 2, "0") + ":" + m(i, 2, "0");}, m: function t(e, n) {if (e.date() < n.date()) return -t(n, e);var r = 12 * (n.year() - e.year()) + (n.month() - e.month()),i = e.clone().add(r, f),s = n - i < 0,u = e.clone().add(r + (s ? -1 : 1), f);return +(-(r + (n - i) / (s ? i - u : u - i)) || 0);}, a: function a(t) {return t < 0 ? Math.ceil(t) || 0 : Math.floor(t);}, p: function p(t) {return { M: f, y: c, w: o, d: a, D: d, h: u, m: s, s: i, ms: r, Q: h }[t] || String(t || "").toLowerCase().replace(/s$/, "");}, u: function u(t) {return void 0 === t;} },D = "en",v = {};v[D] = M;var p = function p(t) {return t instanceof _;},S = function S(t, e, n) {var r;if (!t) return D;if ("string" == typeof t) v[t] && (r = t), e && (v[t] = e, r = t);else {var i = t.name;v[i] = t, r = i;}return !n && r && (D = r), r || !n && D;},w = function w(t, e) {if (p(t)) return t.clone();var n = "object" == typeof e ? e : {};return n.date = t, n.args = arguments, new _(n);},O = g;O.l = S, O.i = p, O.w = function (t, e) {return w(t, { locale: e.$L, utc: e.$u, x: e.$x, $offset: e.$offset });};var _ = function () {function M(t) {this.$L = S(t.locale, null, !0), this.parse(t);}var m = M.prototype;return m.parse = function (t) {this.$d = function (t) {var e = t.date,n = t.utc;if (null === e) return new Date(NaN);if (O.u(e)) return new Date();if (e instanceof Date) return new Date(e);if ("string" == typeof e && !/Z$/i.test(e)) {var r = e.match(l);if (r) {var i = r[2] - 1 || 0,s = (r[7] || "0").substring(0, 3);return n ? new Date(Date.UTC(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, s)) : new Date(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, s);}}return new Date(e);}(t), this.$x = t.x || {}, this.init();}, m.init = function () {var t = this.$d;this.$y = t.getFullYear(), this.$M = t.getMonth(), this.$D = t.getDate(), this.$W = t.getDay(), this.$H = t.getHours(), this.$m = t.getMinutes(), this.$s = t.getSeconds(), this.$ms = t.getMilliseconds();}, m.$utils = function () {return O;}, m.isValid = function () {return !(this.$d.toString() === $);}, m.isSame = function (t, e) {var n = w(t);return this.startOf(e) <= n && n <= this.endOf(e);}, m.isAfter = function (t, e) {return w(t) < this.startOf(e);}, m.isBefore = function (t, e) {return this.endOf(e) < w(t);}, m.$g = function (t, e, n) {return O.u(t) ? this[e] : this.set(n, t);}, m.unix = function () {return Math.floor(this.valueOf() / 1e3);}, m.valueOf = function () {return this.$d.getTime();}, m.startOf = function (t, e) {var n = this,r = !!O.u(e) || e,h = O.p(t),$ = function $(t, e) {var i = O.w(n.$u ? Date.UTC(n.$y, e, t) : new Date(n.$y, e, t), n);return r ? i : i.endOf(a);},l = function l(t, e) {return O.w(n.toDate()[t].apply(n.toDate("s"), (r ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e)), n);},y = this.$W,M = this.$M,m = this.$D,g = "set" + (this.$u ? "UTC" : "");switch (h) {case c:return r ? $(1, 0) : $(31, 11);case f:return r ? $(1, M) : $(0, M + 1);case o:var D = this.$locale().weekStart || 0,v = (y < D ? y + 7 : y) - D;return $(r ? m - v : m + (6 - v), M);case a:case d:return l(g + "Hours", 0);case u:return l(g + "Minutes", 1);case s:return l(g + "Seconds", 2);case i:return l(g + "Milliseconds", 3);default:return this.clone();}}, m.endOf = function (t) {return this.startOf(t, !1);}, m.$set = function (t, e) {var n,o = O.p(t),h = "set" + (this.$u ? "UTC" : ""),$ = (n = {}, n[a] = h + "Date", n[d] = h + "Date", n[f] = h + "Month", n[c] = h + "FullYear", n[u] = h + "Hours", n[s] = h + "Minutes", n[i] = h + "Seconds", n[r] = h + "Milliseconds", n)[o],l = o === a ? this.$D + (e - this.$W) : e;if (o === f || o === c) {var y = this.clone().set(d, 1);y.$d[$](l), y.init(), this.$d = y.set(d, Math.min(this.$D, y.daysInMonth())).$d;} else $ && this.$d[$](l);return this.init(), this;}, m.set = function (t, e) {return this.clone().$set(t, e);}, m.get = function (t) {return this[O.p(t)]();}, m.add = function (r, h) {var d,$ = this;r = Number(r);var l = O.p(h),y = function y(t) {var e = w($);return O.w(e.date(e.date() + Math.round(t * r)), $);};if (l === f) return this.set(f, this.$M + r);if (l === c) return this.set(c, this.$y + r);if (l === a) return y(1);if (l === o) return y(7);var M = (d = {}, d[s] = e, d[u] = n, d[i] = t, d)[l] || 1,m = this.$d.getTime() + r * M;return O.w(m, this);}, m.subtract = function (t, e) {return this.add(-1 * t, e);}, m.format = function (t) {var e = this,n = this.$locale();if (!this.isValid()) return n.invalidDate || $;var r = t || "YYYY-MM-DDTHH:mm:ssZ",i = O.z(this),s = this.$H,u = this.$m,a = this.$M,o = n.weekdays,f = n.months,h = function h(t, n, i, s) {return t && (t[n] || t(e, r)) || i[n].substr(0, s);},c = function c(t) {return O.s(s % 12 || 12, t, "0");},d = n.meridiem || function (t, e, n) {var r = t < 12 ? "AM" : "PM";return n ? r.toLowerCase() : r;},l = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: a + 1, MM: O.s(a + 1, 2, "0"), MMM: h(n.monthsShort, a, f, 3), MMMM: h(f, a), D: this.$D, DD: O.s(this.$D, 2, "0"), d: String(this.$W), dd: h(n.weekdaysMin, this.$W, o, 2), ddd: h(n.weekdaysShort, this.$W, o, 3), dddd: o[this.$W], H: String(s), HH: O.s(s, 2, "0"), h: c(1), hh: c(2), a: d(s, u, !0), A: d(s, u, !1), m: String(u), mm: O.s(u, 2, "0"), s: String(this.$s), ss: O.s(this.$s, 2, "0"), SSS: O.s(this.$ms, 3, "0"), Z: i };return r.replace(y, function (t, e) {return e || l[t] || i.replace(":", "");});}, m.utcOffset = function () {return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);}, m.diff = function (r, d, $) {var l,y = O.p(d),M = w(r),m = (M.utcOffset() - this.utcOffset()) * e,g = this - M,D = O.m(this, M);return D = (l = {}, l[c] = D / 12, l[f] = D, l[h] = D / 3, l[o] = (g - m) / 6048e5, l[a] = (g - m) / 864e5, l[u] = g / n, l[s] = g / e, l[i] = g / t, l)[y] || g, $ ? D : O.a(D);}, m.daysInMonth = function () {return this.endOf(f).$D;}, m.$locale = function () {return v[this.$L];}, m.locale = function (t, e) {if (!t) return this.$L;var n = this.clone(),r = S(t, e, !0);return r && (n.$L = r), n;}, m.clone = function () {return O.w(this.$d, this);}, m.toDate = function () {return new Date(this.valueOf());}, m.toJSON = function () {return this.isValid() ? this.toISOString() : null;}, m.toISOString = function () {return this.$d.toISOString();}, m.toString = function () {return this.$d.toUTCString();}, M;}(),b = _.prototype;return w.prototype = b, [["$ms", r], ["$s", i], ["$m", s], ["$H", u], ["$W", a], ["$M", f], ["$y", c], ["$D", d]].forEach(function (t) {b[t[1]] = function (e) {return this.$g(e, t[0], t[1]);};}), w.extend = function (t, e) {return t.$i || (t(e, _, w), t.$i = !0), w;}, w.locale = S, w.isDayjs = p, w.unix = function (t) {return w(1e3 * t);}, w.en = v[D], w.Ls = v, w.p = {}, w;});

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou'){//百度、快手 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    // NOTE 此处将 != 修改为 !==。涉及地方太多恐怕测试不到，如果出现数据对比问题，将其修改回来。
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"写寄语","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"写寄语","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"写寄语","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"写寄语","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!***************************************************************************************!*\
  !*** /Users/chengheai/code/private/write-messages/node_modules/dayjs/locale/zh-cn.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function (e, _) { true ? module.exports = _(__webpack_require__(/*! dayjs */ 19)) : undefined;}(this, function (e) {"use strict";function _(e) {return e && "object" == typeof e && "default" in e ? e : { default: e };}var t = _(e),d = { name: "zh-cn", weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"), weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"), weekdaysMin: "日_一_二_三_四_五_六".split("_"), months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), ordinal: function ordinal(e, _) {switch (_) {case "W":return e + "周";default:return e + "日";}}, weekStart: 1, yearStart: 4, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY年M月D日", LLL: "YYYY年M月D日Ah点mm分", LLLL: "YYYY年M月D日ddddAh点mm分", l: "YYYY/M/D", ll: "YYYY年M月D日", lll: "YYYY年M月D日 HH:mm", llll: "YYYY年M月D日dddd HH:mm" }, relativeTime: { future: "%s内", past: "%s前", s: "几秒", m: "1 分钟", mm: "%d 分钟", h: "1 小时", hh: "%d 小时", d: "1 天", dd: "%d 天", M: "1 个月", MM: "%d 个月", y: "1 年", yy: "%d 年" }, meridiem: function meridiem(e, _) {var t = 100 * e + _;return t < 600 ? "凌晨" : t < 900 ? "早上" : t < 1100 ? "上午" : t < 1300 ? "中午" : t < 1800 ? "下午" : "晚上";} };return t.default.locale(d, null, !0), d;});

/***/ }),

/***/ 21:
/*!**********************************************************************************************!*\
  !*** /Users/chengheai/code/private/write-messages/node_modules/dayjs/plugin/relativeTime.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function (r, e) { true ? module.exports = e() : undefined;}(this, function () {"use strict";return function (r, e, t) {r = r || {};var n = e.prototype,o = { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" };function i(r, e, t, o) {return n.fromToBase(r, e, t, o);}t.en.relativeTime = o, n.fromToBase = function (e, n, i, d, u) {for (var f, a, s, l = i.$locale().relativeTime || o, h = r.thresholds || [{ l: "s", r: 44, d: "second" }, { l: "m", r: 89 }, { l: "mm", r: 44, d: "minute" }, { l: "h", r: 89 }, { l: "hh", r: 21, d: "hour" }, { l: "d", r: 35 }, { l: "dd", r: 25, d: "day" }, { l: "M", r: 45 }, { l: "MM", r: 10, d: "month" }, { l: "y", r: 17 }, { l: "yy", d: "year" }], m = h.length, c = 0; c < m; c += 1) {var y = h[c];y.d && (f = d ? t(e).diff(i, y.d, !0) : i.diff(e, y.d, !0));var p = (r.rounding || Math.round)(Math.abs(f));if (s = f > 0, p <= y.r || !y.r) {p <= 1 && c > 0 && (y = h[c - 1]);var v = l[y.l];u && (p = u("" + p)), a = "string" == typeof v ? v.replace("%d", p) : v(p, n, y.l, s);break;}}if (n) return a;var M = s ? l.future : l.past;return "function" == typeof M ? M(a) : M.replace("%s", a);}, n.to = function (r, e) {return i(r, e, this, !0);}, n.from = function (r, e) {return i(r, e, this);};var d = function d(r) {return r.$u ? t.utc() : t();};n.toNow = function (r) {return this.to(d(this), r);}, n.fromNow = function (r) {return this.from(d(this), r);};};});

/***/ }),

/***/ 22:
/*!**********************************************************************!*\
  !*** /Users/chengheai/code/private/write-messages/common/index.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 29:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 30);

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 30:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 31);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 31:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 37:
/*!****************************************************************************!*\
  !*** /Users/chengheai/code/private/write-messages/static/images/share.jpg ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),

/***/ 4:
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.compileI18nJsonStr = compileI18nJsonStr;exports.hasI18nJson = hasI18nJson;exports.initVueI18n = initVueI18n;exports.isI18nStr = isI18nStr;exports.normalizeLocale = normalizeLocale;exports.parseI18nJson = parseI18nJson;exports.isString = exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var isArray = Array.isArray;
var isObject = function isObject(val) {return val !== null && typeof val === 'object';};
var defaultDelimiters = ['{', '}'];var
BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {_classCallCheck(this, BaseFormatter);
    this._caches = Object.create(null);
  }_createClass(BaseFormatter, [{ key: "interpolate", value: function interpolate(
    message, values) {var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    } }]);return BaseFormatter;}();exports.Formatter = BaseFormatter;

var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {var _ref2 = _slicedToArray(_ref, 2),startDelimiter = _ref2[0],endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ?
      'list' :
      isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ?
      'named' :
      'unknown';
      tokens.push({ value: sub, type: type });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
        text += char;
      }
  }
  text && tokens.push({ type: 'text', value: text });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = isArray(values) ?
  'list' :
  isObject(values) ?
  'named' :
  'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else
        {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;}

    index++;
  }
  return compiled;
}

var LOCALE_ZH_HANS = 'zh-Hans';exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {return hasOwnProperty.call(val, key);};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}
function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') !== -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') !== -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}var
I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {var locale = _ref3.locale,fallbackLocale = _ref3.fallbackLocale,messages = _ref3.messages,watcher = _ref3.watcher,formater = _ref3.formater;_classCallCheck(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }_createClass(I18n, [{ key: "setLocale", value: function setLocale(
    locale) {var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    } }, { key: "getLocale", value: function getLocale()
    {
      return this.locale;
    } }, { key: "watchLocale", value: function watchLocale(
    fn) {var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    } }, { key: "add", value: function add(
    locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else
        {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else
      {
        this.messages[locale] = message;
      }
    } }, { key: "f", value: function f(
    message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    } }, { key: "t", value: function t(
    key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else
      {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    } }]);return I18n;}();exports.I18n = I18n;


var ignoreVueI18n = true;
function watchAppLocale(appVm, i18n) {
  appVm.$watch(function () {return appVm.$locale;}, function (newLocale) {
    i18n.setLocale(newLocale);
  });
}
function initVueI18n(locale) {var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {var _ref4 =
    [
    messages,
    locale];locale = _ref4[0];messages = _ref4[1];

  }
  if (typeof locale !== 'string') {
    locale =
    typeof uni !== 'undefined' && uni.getLocale && uni.getLocale() ||
    LOCALE_EN;
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale =
    typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale ||
    LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher });

  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else
    {
      var appVm = getApp().$vm;
      watchAppLocale(appVm, i18n);
      if (!appVm.$t || !appVm.$i18n || ignoreVueI18n) {
        // if (!locale) {
        //   i18n.setLocale(getDefaultLocale())
        // }
        /* eslint-disable no-func-assign */
        _t = function t(key, values) {
          // 触发响应式
          appVm.$locale;
          return i18n.t(key, values);
        };
      } else
      {
        /* eslint-disable no-func-assign */
        _t = function t(key, values) {
          var $i18n = appVm.$i18n;
          var silentTranslationWarn = $i18n.silentTranslationWarn;
          $i18n.silentTranslationWarn = true;
          var msg = appVm.$t(key, values);
          $i18n.silentTranslationWarn = silentTranslationWarn;
          if (msg !== key) {
            return msg;
          }
          return i18n.t(key, $i18n.locale, values);
        };
      }
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    } };

}

var isString = function isString(val) {return typeof val === 'string';};exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else
    {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else
    {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {var locale = _ref5.locale,locales = _ref5.locales,delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name] });

    }
  });
  localeValues.unshift({ locale: locale, values: locales[locale] });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  }
  catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else
  {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else
  if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 47:
/*!***********************************************************************************!*\
  !*** /Users/chengheai/code/private/write-messages/static/images/tabs/nav_1_s.png ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 48:
/*!***********************************************************************************!*\
  !*** /Users/chengheai/code/private/write-messages/static/images/tabs/nav_1_n.png ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 49:
/*!***********************************************************************************!*\
  !*** /Users/chengheai/code/private/write-messages/static/images/tabs/nav_2_s.png ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 5:
/*!***************************************************************!*\
  !*** /Users/chengheai/code/private/write-messages/pages.json ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 50:
/*!***********************************************************************************!*\
  !*** /Users/chengheai/code/private/write-messages/static/images/tabs/nav_2_n.png ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAAXNSR0IArs4c6QAAErpJREFUeF7tXV9SHDcTl4YKM29JThD7BB+cwPgExicInMDwsqt5sv20ghfjE4ScIOsTBJ8gcILgEwTeiKu8+qqJNl4TYNUaSaOWeqq2yi70t9U/9V9JUvDHFGAKPEgBybRhCjAFHqYAA4S5gynwCAUYIMweTAEGCPMAU8CPAixB/OjGtSqhAAOkkoXmafpRgAHiRzeuVQkFGCCVLDRP048CDBA/unGtSijAAKlkoXmafhRggPjRjWtVQgEGSCULzdP0owADxI9uXKsSCjBAKllonqYfBRggfnTjWpVQgAFSyULzNP0owADxo5t3rdls9mRjY+OnxWKxJaX8YdmQMQb+vWX/fy6lvFr521XTNOdfvnz51Pf9pXfnXBFNAQYImmTuFY6Pj58ZY3aMMcD4T1YA4N7I/SXPhRCXUkoA0tlkMvk4tEGufz8FGCABOeP4+HjLGPMCQCGEgF/K7wzAIqX8MJlMAED8BaAAA2QgEUFlklK+EkLsWikxsMUg1UENmxtj3rNKNoyeDBAP+r179+6Hv//++2chxF5AtcljJE5VQJqctm376+Hh4b92jVNNLiQYIAgmAGB8/vz5lTHmQAjxr4GNaGLMoldSypPNzc33DBT3ZWCAONBqRY0CiUENGHdneAuUxWLxK6tf6xefAbKGRkdHR6+JSox1q38LlOl0+nZdwZr/zgB5YPVns9mOlPKXjAzvWHx6aYzZ7/v+LFYHlNtlgNxZPatOvbNeKcprix07eL0OWe36lmwMkBV6HB0d7RpjQGpQtzOw4FiWB7Vrfzqdzn0bKK0eA8SuqNYapAZ4p5J8xphl9BtiFg+lj0D0HeIsANj/JRnYP52cKKUOE/aXbVfVAwSi34vFAqTGMg8q+GJZMICOD79LXzUG1D9rE91G6qWUz4IP9muD58aYl75jjTiupE1XDRALjt9Dq1TGmE9SStDp57GNX+tMANVwV0r5U2DugSTJ5zWnrlQLkNlstme9VKF46hoAsbGxcTIWQwFYILovpYS0l+8DTezKGu+ngdoj1UyVAAkJDpAWkMrRdd1JLhFqiPjf3NyAPQVgCSJVrCu4OpBUB5BQxrgFxpu+77NmGtgMhBBvQgBFSnk4nU5PSImAgYOtCiChJIcx5m1OEmMdDywlipTy9bqy6/5emySpBiAhwGG9UXtUPTvWC3Y61PtVE0iqAEgAcIABfpC7OrVu91/+3dIDVCVvQ15K+bKGgGLxAAngyr1ommZvLM+UK9Njy1m6gP3kG4CswgVcNEDswaY/fBMOjTG/dl13kIt3CguCdeWtbXIipYTDXz7fZdu226XSBwhSNEC01hAE9DobDoZ43/dvfLiGWp3ZbAZeLl8Dfq6Uekltzq7jLRYgQxa9JiP0jl0CKTfor2T3b5EAsekXID3QX43gCAGSpmm2S7PTilWxtNZ/+tgdNYMjAEgulVJP0TtS5hWKkyC+qhWD4yun+rrFS7TbigKIPQ0I0gP1gbeq73tIyeDPUmA2m0FAEevdgsTGbaqB1PsWvyiA+HitIDre972Xp6t0NM1mM7ipEXvm5Ewp9bwU2hQDEHtc9jfkwly3bfukZD8+kh7fFLdxJDjtiIq4G2Oexz4HM2RemLrFAMRTehSzkJhFx5T19AgWI0WKAIjnIr5XSiU7g45hytzKaq0hbwvuH3b+SpEiRQDEQ3qwauXM6kJ4qlpFSBHyAPGRHrVkoiIwsLaoj41XghQhDxCtNdzh9GLtCtsC7LVypdR/y3l4tT4opeB8PNmPNEB84h4l7GpjcZuPtG7b9kfKXkLSADk6OjowxsCFb04fSw8nMj1aCCtFqCcykgaI1hrOejhf+MbSIwhA4MI6TCLouVJqe3jP47RAFiD2RBwAxPW7UEo5g8m10RrLaa3h1Srnk4iUM33JAgTrm+dkxHBQxiYzUk5ipAwQlHpF3VgMx97DW7Jxkb9cW6Js+5EEiMcCcbauKzc7lsNm+1LdoEgCBBu04sCgI9cjitWyBiQBgrU/lFIk54ng1+RFsVJcCEEy940k42Dcu5T13+Rcj+wQExOhug5UAWJc15KyB8V1jmOVwx5vpijJyQEEm17CwcF48MGmnhhjnlI7jksRIKhILsVdKx5Lh20Za4dQ3KwoAgRzC+C1UqrWF2vDouGB1rTWV65Hcimqu+QAgvFgUTUMk3B2oE4whjpFTxY5gJS+IIH4NlkzmIAhxQ2raIBQFOnJODtQRxhPFgMkENEfawYjQRgg8ReEARKfxqgeMEFC6od1UIQZqTDm0BpLkASLpLXGBAn53qvIa4KNhVBzu5OzQRggkTke2TwDBEmw2MUZILEpjGufAYKjV/TSmOOefIow+nIItkHi0xjVA3uxUOSKXpi9WNFJjOuAAYKjV+zSDJDYFEa2jwEIxdQGJDlGL1566g9FL5bzVaMU/e6jczxyAKVvWOQAghHpQogiH5ZE8nDU4pgHUylmNpADCPayAGqBqajcHKFxjNud4uUZ5ACCvVGR4iGdCHwcpUlsDIRPFEZZhv82ity1DqfTKbyQxF9gCmBiINA1RWlOToIAoTHBQiEE+TcqAvN1sOYwb7NQdZhQBYizJ0sIcaWU+jEYV3BD/1IAI8mpvkVPEiAelydzVm9gYHvYH/t9358GHkb05qgC5ImU8k9X6lDdvVznN0Y5zFFbGB9FAx3GTRIgHnYIq1mBUaS1htvdXW+MIfs2C2WAoN7upuiDD8zTwZrDqriUU37IAgSrA7M3Kxg+wIuIcZIIfmEqHO1RLWEuLaOsB6OIErkw9upXIQTpy/vIShBrh6DULDbWh6PHwzgn/XgRaYB47GZkvSnDWXt4CzXSmzRAYMmR6dYAENI72nA292/BQ3p87Pt+x7/H8WuWAJA9KeUvGFJyAiOGWv+U9XCKiBI8h+QBYm0R5xvGLWuQftwez97Da2Au7LMOkU993z8Z3vO4LRQBEOQhqluK862L7oyHzdotib5FAMSqAJdSyp/cl11cGWO2qb14hJhfkKL2/M3viKg52Hmfuq7bOjw8BMlO+isJIGhbRAhx3rbt8xIWMgYX2hekABxbmPZLuo+sGIB4ShGodqqU2scwQC1ltdbg/NjDzJfquY+H5lgaQFDvFy6JUtKOh2Hmx8p65FvdNleah7AogFiPFipPaAUkfGbEEsPHpWvBUVyMqTiAWL350vVhyZVd9KppmueTyeQ81C5MsR0fo9zO89oYs1Wa06M4gMBiYa8GYpD8Q4EB4CgiKHjfhlYkQKzBfiql/NljF69SkgwBB+XzHuv4o1iAgKp1c3NzjoyNLOl1JaXcn06nYM8U/1mJCx4r1xOCqzS5aNt2p1RXebEAWVEZzjzskaVHhuRFAxhE+3qrlnZH0zQ7JdttRQPEqlo+AcRVHjtt2/awtB3SOjPeYeMcq4SpwT1ePEACgeS8aZr9UnZKa2+ASoWKkNcGDphvFQAZaLSv2iUn0+n0LUaFya3s0dHRa2PMm4Hjeq+UOhjYBonq1QAkEEigmUurWoBtQ+azwT+QGoNS0Gs7cFYVQAKCBJqaG2MOcw+M2WOyYGvsDkVzbeCoSsVaZQ7s0dE1jHVmH4bJSqJYifFaCBHkyGuN4KgWIDBxzNt6jjvvmZTydHNz88NYHi/wTH3+/PmFMQYycIMA45ZJpKz2CYnqVKw7kmSoC/gh7MAlzXOl1AdHcA0qprV+YVUoVGq6S6c1uHIfo0O1ALGuTtDNg+20DxAaJMvtbzKZfHRhynVljo+PnxljduAXcfzXpQcB19G5ShUrRIDMhbCPlIFMY/hBGsztkVQAz33lLQDgjAWkgEDMAn4+6SCoIcOhJwgg5u6AQE3Ks3BVEkRr/UoIATGA6EzmuR5jV7uWUr7hJ+u+LkMVALGuTogBxFanxmZw7/5ZatxPuuIBwlLjcczADSRN0xxgM5fBhvvuu+8ux/LYee8EyIrFAsTaGr+x1HiQI+AE4EnXdScuTG5dyK+sC3k1Gg9HA042Nzffu7SD5M/RixcJEBskA3CEsjWurWH9v9FXLMwAPhhjDlyNcMfrf4o8aFYcQKxKFeRddFA/wKjvum4OuyOoFV++fDnwPKkYhrWHtQLAOOn7HhX111rD3VhO9ltpcZOiAOJzj9MD/HZhvTn3nii0pxV3pZSQ0Zq1VLEgh8DlqavEWKWJz5MHQogDpdT7YVjOo3YRAHFUAdZSfCkxMM8VAwPZQ0cQlcdcfbp2PAMLgLSYY+ZyX3++VwCVciEfeYCEOPwDz4SF8P8DWJqm2bUBPkj/SPmB0T1vmma+ubl5FspgHgAQmPu8bdv9UGNJScxlX6QBMvAmjiUNPrRtuxdjEYG5rO4ONz5CFPz7gIt8Yc+mnG9sbMxjnnbEvgV5Z46k7z8mC5Ch4LDqFKRToAzWIQxubZetpmm2FovFDwAam0Zy26yU8hlIM2PMN5fXSSnPjTHgJYL0lMuYYLhvfgEyn8mChCRAhoIDnoSOJTWGACjXutbGg41kiEOCJEjIAWQgOGB3Bv8/eHX4Q1AgEEjI3aRPCiB2kf70DABeNE2zl1o9QfBg9kWtingyMA5ECiRkADLElQuJeF3X7cYwxLPn6ggD9HmS7c4wyICEBEAGgqO4K/kj8Dy6Sev+hUCql2fOnuMfev0QetzYCiQA4hshr/ksNZYRfMrbKDuAxMt4p/DYTvYA8RXnpeUE+TBwijoDjfertm2f5qz6Zg0Q3ygugyMFNL72MRAkZ0qp52lH7N5btgDx9VgxONwXP2TJISDJ2R7JFiCYFOuVha7mztiQzB2qrYEgyfKNyCwB4mN31HrzXyjmDtXOAJBkaY9kBxDrGfkDEwws7W3uUMw6Vjt2DSGfDOUCznGTyw4gWmsAh/O7FZB02HXdVs6ekLEYdcx+fR9Szc31mxVAfFSrpmm2OX1kTCg83LdnFvC5Umo7lxllAxAfrxV7rHJho4fHMZvN4NpVSON3/nIK8GYDEI8nCT4opQa/eeG8alzQiwJ244OrVjH2SDYGexYA8QgIXrdt+4TtDi+eTV7J5yXdXAz2LACCjXlIKV9ibwJMzhXc4TcU8FG1cjDYRweIh/Rg1Yog+OxBN/BQOn85SJHRAYKUHqxaObNXfgU97Ex4+uGpz31eoWY/KkCwumnOOTuhFqTkdnwM9rGlyKgAwUgPCAj2fT/oCeOSmY/K3Gaz2RspJTwu6vyNKUVGAwjW9uCYhzM/ZV3QU4q87ft+lNOHowFEaw0n0ZxuH2TpkTXPowfnYYuMFhcZBSDYC5FZeqB5MOsK2PWHyYwVXR8FIJgcHZYeWfO69+A8pMgoOVpjAQTutnIyuFl6ePNg1hWxNihMZgxjPTlAkGnQ10qpUK9EZc0wNQ5uNptdYp6MGMPNnxwgGNE6BkFqZNSx5oxRte0YL5VST1OONylArIvvL9cJjiFSXcfG5YZTwCf9JPX5n6QAQapXnHM1nAezbwGrZgkhkl7MkRQgSPVqn29hz56/Bw8wdzUrKUC01qBeORndbdv+yOc9BvNf9g34qFkpVe9kAEESgtWr7Fk73ACxT7yldP0nAwgmSS0lAcItM7fkSwFM2pGNhyS7sT8lQJwP77N65ctqNOthNk87w2RR9WQA0Vobx+W7UEo534vl2CYXy5gCPlH1VJtoEoAg7Y+kbryM+aaaoWHjY0CYVPcSJAEI5kK4VBOvhvuITFRrDVeVOj/EkyrLIglAML7uVKKTCN9UM0xMjMwa6h/7vt+JTaAkAHG98oVT22Mvd77texjqSfKykgDENUDIt7Tny8CxR+ZjqCulovNv9A4wBlgqvTL2YnP7eAr4ACRFRD06QDATZwMdz1gl1UCEAm6nneLmxegAwWTwpphwSQxV2lw8ABI9oTU6QDDGF3uwSmN53HxcnTnLVlOo5FkBJIXRhVsyLp2SAliApDgbEh0grolo7OJNyYp59oWJl6WKhUQHiOuuwC7ePJk25agw6rgdV/RjEdkAJIW4TLnY3BeeApiUJCtBol9JGh0gCBUr+mTxS8Y1UlIAe+NiigscogPE9YmDFJNNudjclx8FXO2QVCp5dIAAmRwyNTnF3Y+fiqtlMy/O1mT2XrRtu5PizoIkAIFJ39zczO97DnjsB1KK47BCJmQN9oO7r+MCv3Rdd5ACHEDKJABZrhlE1ReLBZwWhDTls42NjflkMoFzAPwxBe6lAKQqLf/Qdd15KmAs+0wKEOYBpgA1CjBAqK0YjzcpBRggScnNnVGjAAOE2orxeJNSgAGSlNzcGTUKMECorRiPNykFGCBJyc2dUaMAA4TaivF4k1KAAZKU3NwZNQowQKitGI83KQUYIEnJzZ1RowADhNqK8XiTUoABkpTc3Bk1CjBAqK0YjzcpBRggScnNnVGjAAOE2orxeJNSgAGSlNzcGTUK/B/X4CpfN9XUSwAAAABJRU5ErkJggg=="

/***/ }),

/***/ 51:
/*!***********************************************************************************!*\
  !*** /Users/chengheai/code/private/write-messages/static/images/tabs/nav_3_s.png ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 52:
/*!***********************************************************************************!*\
  !*** /Users/chengheai/code/private/write-messages/static/images/tabs/nav_3_n.png ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 62:
/*!*********************************************************************************************************************!*\
  !*** /Users/chengheai/code/private/write-messages/uni_modules/uni-load-more/components/uni-load-more/i18n/index.js ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _en = _interopRequireDefault(__webpack_require__(/*! ./en.json */ 63));
var _zhHans = _interopRequireDefault(__webpack_require__(/*! ./zh-Hans.json */ 64));
var _zhHant = _interopRequireDefault(__webpack_require__(/*! ./zh-Hant.json */ 65));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =
{
  en: _en.default,
  'zh-Hans': _zhHans.default,
  'zh-Hant': _zhHant.default };exports.default = _default;

/***/ }),

/***/ 63:
/*!********************************************************************************************************************!*\
  !*** /Users/chengheai/code/private/write-messages/uni_modules/uni-load-more/components/uni-load-more/i18n/en.json ***!
  \********************************************************************************************************************/
/*! exports provided: uni-load-more.contentdown, uni-load-more.contentrefresh, uni-load-more.contentnomore, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-load-more.contentdown\":\"Pull up to show more\",\"uni-load-more.contentrefresh\":\"loading...\",\"uni-load-more.contentnomore\":\"No more data\"}");

/***/ }),

/***/ 64:
/*!*************************************************************************************************************************!*\
  !*** /Users/chengheai/code/private/write-messages/uni_modules/uni-load-more/components/uni-load-more/i18n/zh-Hans.json ***!
  \*************************************************************************************************************************/
/*! exports provided: uni-load-more.contentdown, uni-load-more.contentrefresh, uni-load-more.contentnomore, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-load-more.contentdown\":\"上拉显示更多\",\"uni-load-more.contentrefresh\":\"正在加载...\",\"uni-load-more.contentnomore\":\"没有更多数据了\"}");

/***/ }),

/***/ 65:
/*!*************************************************************************************************************************!*\
  !*** /Users/chengheai/code/private/write-messages/uni_modules/uni-load-more/components/uni-load-more/i18n/zh-Hant.json ***!
  \*************************************************************************************************************************/
/*! exports provided: uni-load-more.contentdown, uni-load-more.contentrefresh, uni-load-more.contentnomore, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-load-more.contentdown\":\"上拉顯示更多\",\"uni-load-more.contentrefresh\":\"正在加載...\",\"uni-load-more.contentnomore\":\"沒有更多數據了\"}");

/***/ }),

/***/ 73:
/*!********************************************************************!*\
  !*** /Users/chengheai/code/private/write-messages/static/logo.png ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 88:
/*!********************************************************************************************************!*\
  !*** /Users/chengheai/code/private/write-messages/uni_modules/uni-icons/components/uni-icons/icons.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "pulldown": "\uE588",
  "refreshempty": "\uE461",
  "back": "\uE471",
  "forward": "\uE470",
  "more": "\uE507",
  "more-filled": "\uE537",
  "scan": "\uE612",
  "qq": "\uE264",
  "weibo": "\uE260",
  "weixin": "\uE261",
  "pengyouquan": "\uE262",
  "loop": "\uE565",
  "refresh": "\uE407",
  "refresh-filled": "\uE437",
  "arrowthindown": "\uE585",
  "arrowthinleft": "\uE586",
  "arrowthinright": "\uE587",
  "arrowthinup": "\uE584",
  "undo-filled": "\uE7D6",
  "undo": "\uE406",
  "redo": "\uE405",
  "redo-filled": "\uE7D9",
  "bars": "\uE563",
  "chatboxes": "\uE203",
  "camera": "\uE301",
  "chatboxes-filled": "\uE233",
  "camera-filled": "\uE7EF",
  "cart-filled": "\uE7F4",
  "cart": "\uE7F5",
  "checkbox-filled": "\uE442",
  "checkbox": "\uE7FA",
  "arrowleft": "\uE582",
  "arrowdown": "\uE581",
  "arrowright": "\uE583",
  "smallcircle-filled": "\uE801",
  "arrowup": "\uE580",
  "circle": "\uE411",
  "eye-filled": "\uE568",
  "eye-slash-filled": "\uE822",
  "eye-slash": "\uE823",
  "eye": "\uE824",
  "flag-filled": "\uE825",
  "flag": "\uE508",
  "gear-filled": "\uE532",
  "reload": "\uE462",
  "gear": "\uE502",
  "hand-thumbsdown-filled": "\uE83B",
  "hand-thumbsdown": "\uE83C",
  "hand-thumbsup-filled": "\uE83D",
  "heart-filled": "\uE83E",
  "hand-thumbsup": "\uE83F",
  "heart": "\uE840",
  "home": "\uE500",
  "info": "\uE504",
  "home-filled": "\uE530",
  "info-filled": "\uE534",
  "circle-filled": "\uE441",
  "chat-filled": "\uE847",
  "chat": "\uE263",
  "mail-open-filled": "\uE84D",
  "email-filled": "\uE231",
  "mail-open": "\uE84E",
  "email": "\uE201",
  "checkmarkempty": "\uE472",
  "list": "\uE562",
  "locked-filled": "\uE856",
  "locked": "\uE506",
  "map-filled": "\uE85C",
  "map-pin": "\uE85E",
  "map-pin-ellipse": "\uE864",
  "map": "\uE364",
  "minus-filled": "\uE440",
  "mic-filled": "\uE332",
  "minus": "\uE410",
  "micoff": "\uE360",
  "mic": "\uE302",
  "clear": "\uE434",
  "smallcircle": "\uE868",
  "close": "\uE404",
  "closeempty": "\uE460",
  "paperclip": "\uE567",
  "paperplane": "\uE503",
  "paperplane-filled": "\uE86E",
  "person-filled": "\uE131",
  "contact-filled": "\uE130",
  "person": "\uE101",
  "contact": "\uE100",
  "images-filled": "\uE87A",
  "phone": "\uE200",
  "images": "\uE87B",
  "image": "\uE363",
  "image-filled": "\uE877",
  "location-filled": "\uE333",
  "location": "\uE303",
  "plus-filled": "\uE439",
  "plus": "\uE409",
  "plusempty": "\uE468",
  "help-filled": "\uE535",
  "help": "\uE505",
  "navigate-filled": "\uE884",
  "navigate": "\uE501",
  "mic-slash-filled": "\uE892",
  "search": "\uE466",
  "settings": "\uE560",
  "sound": "\uE590",
  "sound-filled": "\uE8A1",
  "spinner-cycle": "\uE465",
  "download-filled": "\uE8A4",
  "personadd-filled": "\uE132",
  "videocam-filled": "\uE8AF",
  "personadd": "\uE102",
  "upload": "\uE402",
  "upload-filled": "\uE8B1",
  "starhalf": "\uE463",
  "star-filled": "\uE438",
  "star": "\uE408",
  "trash": "\uE401",
  "phone-filled": "\uE230",
  "compose": "\uE400",
  "videocam": "\uE300",
  "trash-filled": "\uE8DC",
  "download": "\uE403",
  "chatbubble-filled": "\uE232",
  "chatbubble": "\uE202",
  "cloud-download": "\uE8E4",
  "cloud-upload-filled": "\uE8E5",
  "cloud-upload": "\uE8E6",
  "cloud-download-filled": "\uE8E9",
  "headphones": "\uE8BF",
  "shop": "\uE609" };exports.default = _default;

/***/ }),

/***/ 96:
/*!*****************************************************************!*\
  !*** /Users/chengheai/code/private/write-messages/utils/str.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.timestampFormat = timestampFormat;exports.clearStorage = clearStorage;exports.requestLogin = requestLogin; // 时间处理
/**
 * dateTimeStamp是评论的发送时间   2020-01-12 20:10:15 这样的形式
 * @param dateTimeStamp
 * @returns {string}
 */
// export function timestampFormat(dateTimeStamp) {
// 	console.log('====',dateTimeStamp)
// 	let result = "";
// 	let minute = 1000 * 60; //把分，时，天，周，半个月，一个月用毫秒表示
// 	let hour = minute * 60;
// 	let day = hour * 24;
// 	let week = day * 7;
// 	let halfamonth = day * 15;
// 	let month = day * 30;
// 	let now = new Date().getTime(); //获取当前时间毫秒

// 	dateTimeStamp = dateTimeStamp.substring(0, 18);
// 	//必须把日期'-'转为'/'
// 	dateTimeStamp = dateTimeStamp.replace(/-/g, '/');
// 	let timestamp = new Date(dateTimeStamp).getTime();

// 	let diffValue = now - timestamp; //时间差

// 	if (diffValue < 0) {
// 		return result;
// 	}
// 	let minC = diffValue / minute; //计算时间差的分，时，天，周，月
// 	let hourC = diffValue / hour;
// 	let dayC = diffValue / day;
// 	let weekC = diffValue / week;
// 	let monthC = diffValue / month;
// 	// if (monthC >= 1 && monthC <= 3) {
// 	// 	result = " " + parseInt(monthC) + "月前"
// 	// } else if (weekC >= 1 && weekC <= 3) {
// 	// 	result = " " + parseInt(weekC) + "周前"
// 	// } else 
// 	if (dayC >= 1 && dayC <= 6) {
// 		result = " " + parseInt(dayC) + "天前"
// 	} else if (hourC >= 1 && hourC <= 23) {
// 		result = " " + parseInt(hourC) + "小时前"
// 	} else if (minC >= 1 && minC <= 59) {
// 		result = " " + parseInt(minC) + "分钟前"
// 	} else if (diffValue >= 0 && diffValue <= minute) {
// 		result = "刚刚"
// 	} else {
// 		let datetime = new Date();
// 		datetime.setTime(dateTimeStamp);
// 		let Nyear = datetime.getFullYear();
// 		console.log(1111111111)
// 		let Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
// 		let Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
// 		let Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
// 		let Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
// 		let Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
// 		result = Nyear + "-" + Nmonth + "-" + Ndate
// 	}
// 	return result;


// }
function timestampFormat(timestamp) {

  function autoZero(num) {
    return (String(num).length == 1 ? '0' : '') + num;
  }
  //js函数代码：字符串转换为时间戳
  function getDateTimeStamp(dateStr) {
    return Date.parse(dateStr.replace(/-/gi, "/"));
  }
  timestamp = getDateTimeStamp(timestamp) / 1000;
  var curTimestamp = parseInt(new Date().getTime() / 1000); //当前时间戳
  var timestampDiff = curTimestamp - timestamp; // 参数时间戳与当前时间戳相差秒数

  var curDate = new Date(curTimestamp * 1000); // 当前时间日期对象
  var tmDate = new Date(timestamp * 1000); // 参数时间戳转换成的日期对象

  var Y = tmDate.getFullYear(),
  m = tmDate.getMonth() + 1,
  d = tmDate.getDate();
  var H = tmDate.getHours(),
  i = tmDate.getMinutes(),
  s = tmDate.getSeconds();

  if (timestampDiff < 60) {
    // 一分钟以内
    return '刚刚';
  } else if (timestampDiff < 3600) {
    // 一小时前之内
    return Math.floor(timestampDiff / 60) + '分钟前';
  } else if (
  curDate.getFullYear() == Y &&
  curDate.getMonth() + 1 == m &&
  curDate.getDate() == d)
  {
    return '今天' + autoZero(H) + ':' + autoZero(i);
  } else {
    var newDate = new Date((curTimestamp - 86400) * 1000); // 参数中的时间戳加一天转换成的日期对象
    if (newDate.getFullYear() == Y && newDate.getMonth() + 1 == m && newDate.getDate() == d) {
      return '昨天' + autoZero(H) + ':' + autoZero(i);
    } else if (curDate.getFullYear() == Y) {
      return Y + '年' + autoZero(m) + '月' + autoZero(d) + '日';
    } else {
      return (
        Y +
        '年' +
        autoZero(m) +
        '月' +
        autoZero(d) +
        '日');

    }
  }
}
function clearStorage() {
  uni.removeStorageSync('userId');
  uni.removeStorageSync('userInfo');
  uni.removeStorageSync('token');
  uni.setStorageSync('hasLogin', -1);
}
function requestLogin() {
  return new Promise(function (resolve, reject) {
    uni.login({
      provider: 'weixin',
      success: function success(data) {
        console.log('data:', data);
        resolve(data);
      },
      fail: function fail(err) {
        resolve(err);
      } });

  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map