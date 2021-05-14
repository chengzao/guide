---
title: 数据类型判断
date: 2020-07-20
sidebar: "auto"
tags:
  - typeOf
  - instanceof
  - _hasOwnProperty
  - 工具函数
---

## typeOf 类型判断

```js
typeof undefined   //return undefined
typeof 1   //return number
typeof ' ni '   //return string
typeof Function   //return function
typeof Symbol   //return function
typeof []   //return object
typeof null   //return object
typeof {}   //return object
typeof RegExp   //return function
typeof new RegExp()   //return object
typeof Math   //return object
typeof Date   //return function
typeof new Date()   //return object
typeof JSON   //return object

function isType(data, type) {
  const typeObj = {
    '[object String]': 'string',
    '[object Number]': 'number',
    '[object Boolean]': 'boolean',
    '[object Null]': 'null',
    '[object Undefined]': 'undefined',
    '[object Object]': 'object',
    '[object Array]': 'array',
    '[object Function]': 'function',
    '[object Date]': 'date', // Object.prototype.toString.call(new Date())
    '[object RegExp]': 'regExp',
    '[object Map]': 'map',
    '[object Set]': 'set',
    '[object HTMLDivElement]': 'dom', // document.querySelector('#app')
    '[object WeakMap]': 'weakMap',
    '[object Window]': 'window',  // Object.prototype.toString.call(window)
    '[object Error]': 'error', // new Error('1')
    '[object Arguments]': 'arguments',
    '[object BigInt]': 'BigInt',
    '[object Symbol]': 'Symbol'
  }
  let name = Object.prototype.toString.call(data) // 借用Object.prototype.toString()获取数据类型
  let typeName = typeObj[name] || '未知类型' // 匹配数据类型
  return typeName === type // 判断该数据类型是否为传入的类型
}
console.log(
  isType({}, 'object'), // true
  isType([], 'array'), // true
  isType(new Date(), 'object'), // false
  isType(new Date(), 'date'), // true
)
```

## eqeqeq

```js
console.log(null == undefined); // return true
console.log({} == {}); // return false
```

## 判断类型

- `typeof` 判断类型
- `Object.prototype.toString.call(obj).slice(8,-1);` 判断类型
- `(obj).constructor.name.toString().toLowerCase()` `obj != null || obj != undefined`除外
- `Array.isArray()` 确定传递的值是否是一个 `Array`
- `isNaN(testValue)` 用来确定一个值是否为`NaN`
- `Object.is(value1, value2);` 判断两个值是否是相同的值
- `object instanceof constructor` 检测 `constructor.prototype` 是否存在于参数 `object` 的原型链

## instanceof



```js
console.log(2 instanceof Number);                    // false
console.log(true instanceof Boolean);                // false
console.log('str' instanceof String);                // false
console.log([] instanceof Array);                    // true
console.log(function () { } instanceof Function);       // true
console.log({} instanceof Object);                   // true
// 优点：能够区分Array、Object和Function
// 缺点：Number，Boolean，String基本数据类型不能判断

//object instanceof constructor
function C() { }
function D() { }

var o = new C();
// true，因为 Object.getPrototypeOf(o) === C.prototype
o instanceof C;

// false，因为 D.prototype不在o的原型链上
o instanceof D;

// instanceof
var o = {};
var a = [];
console.log("o typeof is : ", typeof (o))//object
console.log("a typeof is : ", typeof (a))//object
console.log("o instanceof Array is : ", o instanceof Array); // false
console.log("a instanceof Array is : ", a instanceof Array); // true

// custom
function instanceOf2(l, r) {
  let proto = l.__proto__;
  let prototype = r.prototype
  while (true) {
    if (proto == null) {
      return false
    }
    if (proto == prototype) {
      return true
    }
    proto = proto.__proto__
  }
}

function Car() { }
function Dog() { }
var car = new Car();
var dog = new Dog()

console.log(instanceOf2(dog, Car))
// expected output: false
console.log(instanceOf2(car, Car));
// expected output: true
console.log(instanceOf2(car, Object));
// expected output: true
```



## hasOwnProperty

- `obj.hasOwnProperty(prop)` 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性



```js
function Foo() {
  this.name = "张三";
}
Foo.prototype = {
  constructor: Foo,
  age: 19,
  gender: "男"
};

var f = new Foo();
var isTrue = f.hasOwnProperty("name");
console.log("name -> " + isTrue); // true

isTrue = f.hasOwnProperty("age");
console.log("age -> " + isTrue); // false

isTrue = f.hasOwnProperty("gender");
console.log("gender -> " + isTrue); // false

isTrue = f.hasOwnProperty("web");
console.log("web -> " + isTrue); // false
```



- Object.prototype.toString.call



```js
// 判断类型
var arr = [];
console.log(Object.prototype.toString.call(arr)); //"[object Array]"
console.log(Object.prototype.toString.apply(arr)); //"[object Array]"

function fn() { }
// 判断
Object.prototype.toString.call(obj).slice(8, -1);

// obj != null || obj != undefined 除外
obj.constructor.name.toString().toLowerCase();
```



## toRawType

- Object.prototype.toString.call(arg) 和 String(arg) 的区别？



```js
const _toString = Object.prototype.toString

var obj = {}

obj.toString()  // [object Object]
_toString.call(obj) // [object Object]

obj.toString = () => '111'

obj.toString()  // 111
_toString.call(obj) // [object Object]

  (/hello/).toString() // /hello/
_toString.call(/hello/) // [object RegExp]
```



- toRawType



```js
function toRawType(value) {
  return Object.prototype.toString.call(value).slice(8, -1);
}

toRawType(null); // "Null"
toRawType(/sdfsd/); //"RegExp"
```



## 浏览器标识



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



## 判断浏览器平台



```js
var tools = {
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
    var isBudge = (function () {
      // 手持设备：ipad、iphone、android、ipod
      return /mobile/i.test(navigator.userAgent)
    })()
    var isMac = (function () {
      return /macintosh/i.test(navigator.userAgent)
    })()
    var isWindows = (function () {
      return /windows nt/i.test(navigator.userAgent)
    })()
    var isLinux = (function () {
      return /linux/i.test(navigator.userAgent)
    })()
    var isIpad = (function () {
      return /ipad/i.test(navigator.userAgent)
    })()
    utils.isMobile = !(isWindows || isMac || (isLinux && !isBudge) || isIpad)
    return utils
  },
}
```



## BrowserInfo



```js
var BrowserInfo = function () {
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


