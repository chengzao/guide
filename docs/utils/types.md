# 判断类型标识

[[toc]]

## typeof 类型判断

- `typeof undefined` --> `return undefined`
- `typeof 1` --> `return number`
- `typeof ' ni '` --> `return string`
- `typeof Function` --> `return function`
- `typeof Symbol` --> `return function`
- `typeof []` --> `return object`
- `typeof null` --> `return object`
- `typeof {}` --> `return object`
- `typeof RegExp` --> `return function`
- `typeof new RegExp()` --> `return object`
- `typeof Math` --> `return object`
- `typeof Date` --> `return function`
- `typeof new Date()` --> `return object`
- `typeof JSON` --> `return object`

## eqeqeq

- `null` == `undefined` --> `return true`
- `{}` == `{}` --> `return false`

## 判断类型

- `typeof` 判断类型
- `Object.prototype.toString.call(obj).slice(8,-1);` 判断类型
- `(obj).constructor.name.toString().toLowerCase()` `obj != null || obj != undefined`除外
- `Array.isArray()` 确定传递的值是否是一个 `Array`
- `isNaN(testValue)` 用来确定一个值是否为`NaN`
- `Object.is(value1, value2);` 判断两个值是否是相同的值
- `object instanceof constructor` 检测 `constructor.prototype` 是否存在于参数 `object` 的原型链
- `obj.hasOwnProperty(prop)` 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性

<CodeBlock>

```js
// 判断类型
var arr = [];
console.log(Object.prototype.toString.call(arr)); //"[object Array]"
console.log(Object.prototype.toString.apply(arr)); //"[object Array]"

function fn() {}
// 判断
Object.prototype.toString.call(obj).slice(8, -1);

// obj != null || obj != undefined
obj.constructor.name.toString().toLowerCase();
```

</CodeBlock>

## toRawType

- Object.prototype.toString.call(arg) 和 String(arg) 的区别？

<CodeBlock>

```js
  const _toString = Object.prototype.toString

  var obj = {}

  obj.toString()  // [object Object]
  _toString.call(obj) // [object Object]

  obj.toString = () => '111'

  obj.toString()  // 111
  _toString.call(obj) // [object Object]

  /hello/.toString() // /hello/
  _toString.call(/hello/) // [object RegExp]
```

</CodeBlock>

- toRawType

<CodeBlock>

```js
function toRawType(value) {
  return Object.prototype.toString.call(value).slice(8, -1);
}

toRawType(null); // "Null"
toRawType(/sdfsd/); //"RegExp"
```

</CodeBlock>

## 浏览器标识

<CodeBlock>

```js
// 判断浏览器标识
(function getMobileDevice(window) {
  var ua = navigator.userAgent;
  var mobile = /AppleWebKit.*Mobile.*/.test(ua) || /AppleWebKit/.test(ua); // 是否为移动终端
  var ios = /\(i[^;]+;( U;)? CPU.+Mac OS X/.test(ua); // ios终端
  var android = /(Android);?[\s\/]+([\d.]+)?/.test(ua); // android终端或者uc浏览器
  var iphone = /iphone/i.test(ua); // iphone
  var iPad = /iPad/i.test(ua); // ipad
  var weixin = /micromessenger/i.test(ua); // weixin
  var chrome = /Chrome\/([\d.]+)/.test(ua) || /CriOS\/([\d.]+)/.test(ua); // Chrome
  var mozilla = ua.indexOf("Gecko") > -1 && ua.indexOf("KHTML") == -1; // 火狐内核
  var webkit = /AppleWebKit/i.test(ua); // 苹果、谷歌内核
  var opera = /Presto/i.test(ua); // opera内核
  var safari = /safari/i.test(ua) && !/Chrome/i.test(ua); // 苹果浏览器
  var msie = /msie/i.test(ua); // 微软
  window.device = {
    isMobile: mobile,
    isIos: ios,
    isAndroid: android,
    isIPhone: iphone,
    isIPad: iPad,
    isWeiXin: weixin,
    isChrome: chrome,
    isMozilla: mozilla,
    isWebkit: webkit,
    isOpera: opera,
    isSafari: safari,
    isMsie: msie
  };
})(window);

let url = navigator.userAgent.toLowerCase();
//使用toLowerCase将字符串全部转为小写 方便我们判断使用
if (url.indexOf("15b202 qq") > -1) {
  //单独判断QQ内置浏览器
  alert("QQ APP 内置浏览器，做你想做的操作");
}
if (url.indexOf("micromessenger") > -1) {
  //单独判断微信内置浏览器
  alert("微信内置浏览器，做你想做的操作");
}
if (url.indexOf("15b202") > -1) {
  //判断微信内置浏览器，QQ内置浏览器
  alert("QQ和微信内置浏览器，做你想做的操作");
}
```

</CodeBlock>

## 判断浏览器平台

<CodeBlock>

```js
isMobile() {
  var isMobile = false
  // 判断是pc还是移动端
  var system = {
    win: false,
    mac: false,
    x11: false,
  }
  // 检测平台
  var p = navigator.platform
  system.win = p.indexOf('Win') === 0
  system.mac = p.indexOf('Mac') === 0
  system.x11 = p === 'X11'

  system.ipad = p === 'iPad'

  // 跳转语句
  if (!system.win && !system.mac && !system.x11 && !system.ipad) {
    isMobile = true
  }
  return isMobile
},
// 判断是否是移动端
checkPlatform() {
  var utils = {}
  var isBudge = (function() {
    // 手持设备：ipad、iphone、android、ipod
    return /mobile/i.test(navigator.userAgent)
  })()
  var isMac = (function() {
    return /macintosh/i.test(navigator.userAgent)
  })()
  var isWindows = (function() {
    return /windows nt/i.test(navigator.userAgent)
  })()
  var isLinux = (function() {
    return /linux/i.test(navigator.userAgent)
  })()
  var isIpad = (function() {
    return /ipad/i.test(navigator.userAgent)
  })()
  utils.isMobile = !(isWindows || isMac || (isLinux && !isBudge) || isIpad)
  return utils
},
```

</CodeBlock>

## BrowserInfo

<CodeBlock>

```js
var BrowserInfo = function() {
  var json = {
    userAgent: navigator.userAgent.toLowerCase(),
    isAndroid: Boolean(navigator.userAgent.match(/android/gi)),
    isIphone: Boolean(navigator.userAgent.match(/iphone|ipod/gi)),
    isIpad: Boolean(navigator.userAgent.match(/ipad/gi)),
    isWeixin: Boolean(navigator.userAgent.match(/MicroMessenger/gi))
  };
  return json;
};

// other
const inBrowser = typeof window !== "undefined";

const inWeex = typeof WXEnvironment !== "undefined" && !!WXEnvironment.platform;
const weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();

const UA = inBrowser && window.navigator.userAgent.toLowerCase();

const isIE = UA && /msie|trident/.test(UA);
const isIE9 = UA && UA.indexOf("msie 9.0") > 0;
const isEdge = UA && UA.indexOf("edge/") > 0;
const isAndroid =
  (UA && UA.indexOf("android") > 0) || weexPlatform === "android";
const isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || weexPlatform === "ios";
const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
const isPhantomJS = UA && /phantomjs/.test(UA);
const isFF = UA && UA.match(/firefox\/(\d+)/);

window.location.href = /Android|webOS|iPhone|iPod|BlackBerry/i.test(
  navigator.userAgent
)
  ? "https://www.baidu.com/"
  : "http://news.baidu.com/";
```

</CodeBlock>
