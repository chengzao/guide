---
title: 问题整理（一）
date: 2020-07-20
sidebar: "auto"
categories:
  - frontend
---

## Math.random

- 返回`[0,1)`之间的一个伪随机数

```js
function randomColor() {
  return (
    "#" + ("00000" + ((Math.random() * 0x1000000) << 0).toString(16)).substr(-6)
  );
}
function randomRbga(a) {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return "rgba(" + r + "," + g + "," + b + "," + a + ")";
}
function randomHsla() {
  var colorAngle = Math.floor(Math.random() * 360);
  return "hsla(" + colorAngle + ",100%,50%,1)";
}
```

## JS按位非(~)与(~~)运算符

- [JS按位非(~)运算符与~~运算符的理解分析](https://www.cnblogs.com/moqiutao/p/6275483.html)

```bash
就来看看~1的计算步骤：

- 将1(这里叫：原码)转二进制 ＝ 00000001

- 按位取反 ＝ 11111110

- 发现符号位(即最高位)为1(表示负数)，
  将除符号位之外的其他数字取反 ＝ 10000001

- 末位加1取其补码 ＝ 10000010

- 转换回十进制 ＝ -2

# 总结
负数：补码(x) = -x - 1，正数：补码(x) = x
```

- [JavaScript 的按位操作符](https://segmentfault.com/a/1190000038993814)

```bash
非负数的原码 = 反码 = 补码

负数的反码 = 原码除符号位取反
负数的补码 = 反码 + 1
```

- [ECMAScript 位运算符](https://www.w3school.com.cn/js/pro_js_operators_bitwise.asp)

```bash
负数也存储为二进制代码，不过采用的形式是二进制补码。

计算数字二进制补码的步骤有三步：

1.确定该数字的非负版本的二进制表示（例如，要计算 -18的二进制补码，首先要确定 18 的二进制表示）

0000 0000 0000 0000 0000 0000 0001 0010

2.求得二进制反码，即要把 0 替换为 1，把 1 替换为 0

1111 1111 1111 1111 1111 1111 1110 1101

3.在二进制反码上加 1

1111 1111 1111 1111 1111 1111 1110 1110
```

### 进制转换

- `toString(radix)`

```js
(15).toString(2).padStart(8, "0"); // 00001111
(15).toString(8).padStart(8, "0"); // 00000017
(15).toString(16).padStart(8, "0"); // 0000000f
```

- `Number()`

```js
Number("0x11"); // 17  十六进制
Number("0b11"); // 3   二进制
Number("0o11"); // 9   八进制
```

- baseConverter

```js
function baseConverter(decNumber, base) {
  const remStack = [];
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let number = decNumber;
  let rem;
  let baseString = '';

  if (!(base >= 2 && base <= 36)) {
    return '';
  }

  while (number > 0) {
    rem = Math.floor(number % base);
    remStack.push(rem);
    number = Math.floor(number / base);
  }

  while (remStack.length > 0) {
    baseString += digits[remStack.pop()];
  }
  return baseString;
}
```

## 判断是否包含ua

```js
export const getCurrentUA = () => window.navigator.userAgent.toLowerCase()

/**
 * 返回是否包含ua的布尔值
 * @param {string} ua
 * @returns boolean
 */
export const includesUA = (ua) => {
  if (!ua) throw new Error('includesUA: ua is required')
  const newUA = ua.replace(/(^\s*)|(\s*$)/g, '') // remove space
  const reg = new RegExp('\\b' + newUA + '\\b')
  return reg.test(getCurrentUA())
}
```

## 实现一个 JSON.stringify

```js
function jsonStringify(obj) {
  let type = typeof obj;
  if (type !== "object") {
    if (/string|undefined|function/.test(type)) {
      obj = '"' + obj + '"';
    }
    return String(obj);
  } else {
    let json = [];
    let arr = Array.isArray(obj);
    for (let k in obj) {
      let v = obj[k];
      let type = typeof v;
      if (/string|undefined|function/.test(type)) {
        v = '"' + v + '"';
      } else if (type === "object") {
        v = jsonStringify(v);
      }
      json.push((arr ? "" : '"' + k + '":') + String(v));
    }
    return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
  }
}
console.log(jsonStringify({ x: 5 })); // "{"x":5}"
console.log(jsonStringify([1, "false", false])); // "[1,"false",false]"
console.log(jsonStringify({ b: undefined })); // "{"b":"undefined"}"
```

## 实现一个 JSON.parse

```js
var jsonStr = '{ "age": 20, "name": "jack" }';
var json = new Function("return " + jsonStr)();
console.log(json);
```

## a==1 && a==2 && a==3 问题

```js
// 1.0
if(a == 1 && a ==2 && a == 3){
  console.log('1.0 如何打印我！')
}

var s = 0;
var a = {
    toString(){
          console.log('其次：toString.')
          return s+=1
    },
    valueOf(){
        console.log('优先：valueOf.')
        return ++s
    }
}

// 2.0
if(a === 1 && a ===2 && a === 3){
  console.log('2.0 如何打印我！')
}

// 不建议使用
Object.definePrototype(window, 'a', {
  get(){
    return ++s;
  }
})
```

## new Function

```js
var str = "{'a':'c'}";
var f = new Function("return " + str);
```

## eval

- `eval命令的作用是,将字符串当作语句执行`

```js
var a = 1;
eval("a = 2");

a; // 2
```

- 如果使用严格模式,`eval`内部声明的变量,不会影响到外部作用域

```js
(function f() {
  "use strict";
  eval("var foo = 123");
  console.log(foo); // ReferenceError: foo is not defined
})();
```

## class类与构造函数定义方法的区别

- 类的内部所有定义的方法，都是不可枚举的

```js
class Point1 {
  constructor() {}
  getName() {}
}

Object.keys(Point1.prototype) // []
Object.getOwnPropertyNames(Point1.prototype) // [ 'constructor', 'getName' ]
```

- ES5的构造函数写法，getName方法就是可枚举的

```js
function Point2(params) {}
Point2.prototype.getName = function () {}

Object.keys(Point2.prototype) // [ 'getName' ]
Object.getOwnPropertyNames(Point2.prototype) // [ 'constructor', 'getName' ]
```

## formateTime

```js
module.exports = {
  formatDateTime(time, fmt) {
    var date = new Date(time)
    var o = {
      'Y+': date.getFullYear(), // 年
      'M+': date.getMonth() + 1, // 月份
      'D+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds(), // 毫秒
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          o[k] < 10 ? '0' + o[k] : o[k],
        )
      }
    }
    return fmt
  }
}
```

## formateDate

```js
const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return (
    [year, month, day].map(formatNumber).join("/") +
    " " +
    [hour, minute, second].map(formatNumber).join(":")
  );
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : "0" + n;
};
```

## 水印watermark

```js
function watermark(text) {
	//默认设置
	let defaultSettings = {
		watermark_txt: text,
		watermark_x: 20, //水印起始位置x轴坐标
		watermark_y: 20, //水印起始位置Y轴坐标
		watermark_rows: 20, //水印行数
		watermark_cols: 20, //水印列数
		watermark_x_space: 100, //水印x轴间隔
		watermark_y_space: 50, //水印y轴间隔
		watermark_color: "#aaa", //水印字体颜色
		watermark_alpha: 0.4, //水印透明度
		watermark_fontsize: "15px", //水印字体大小
		watermark_font: "微软雅黑", //水印字体
		watermark_width: 210, //水印宽度
		watermark_height: 80, //水印长度
		watermark_angle: 15, //水印倾斜度数
	}
	//采用配置项替换默认值，作用类似jquery.extend
	if (arguments.length === 1 && typeof arguments[0] === "object") {
		let src = arguments[0] || {}
		for (let key in src) {
			if (
				src[key] &&
				defaultSettings[key] &&
				src[key] === defaultSettings[key]
			)
				continue
			else if (src[key]) defaultSettings[key] = src[key]
		}
	}

	let oTemp = document.createDocumentFragment()

	//获取页面最大宽度
	let page_width = Math.max(
		document.body.scrollWidth,
		document.body.clientWidth,
	)
	let cutWidth = page_width * 0.015
	page_width = page_width - cutWidth
	//获取页面最大高度
	let page_height = Math.max(
		document.body.scrollHeight,
		document.body.clientHeight,
	)
	// var page_height = document.body.scrollHeight+document.body.scrollTop;
	//如果将水印列数设置为0，或水印列数设置过大，超过页面最大宽度，则重新计算水印列数和水印x轴间隔
	if (
		defaultSettings.watermark_cols == 0 ||
		parseInt(
			defaultSettings.watermark_x +
				defaultSettings.watermark_width *
					defaultSettings.watermark_cols +
				defaultSettings.watermark_x_space *
					(defaultSettings.watermark_cols - 1),
		) > page_width
	) {
		defaultSettings.watermark_cols = parseInt(
			(page_width -
				defaultSettings.watermark_x +
				defaultSettings.watermark_x_space) /
				(defaultSettings.watermark_width +
					defaultSettings.watermark_x_space),
		)
		defaultSettings.watermark_x_space = parseInt(
			(page_width -
				defaultSettings.watermark_x -
				defaultSettings.watermark_width *
					defaultSettings.watermark_cols) /
				(defaultSettings.watermark_cols - 1),
		)
	}
	//如果将水印行数设置为0，或水印行数设置过大，超过页面最大长度，则重新计算水印行数和水印y轴间隔
	if (
		defaultSettings.watermark_rows == 0 ||
		parseInt(
			defaultSettings.watermark_y +
				defaultSettings.watermark_height *
					defaultSettings.watermark_rows +
				defaultSettings.watermark_y_space *
					(defaultSettings.watermark_rows - 1),
		) > page_height
	) {
		defaultSettings.watermark_rows = parseInt(
			(defaultSettings.watermark_y_space +
				page_height -
				defaultSettings.watermark_y) /
				(defaultSettings.watermark_height +
					defaultSettings.watermark_y_space),
		)
		defaultSettings.watermark_y_space = parseInt(
			(page_height -
				defaultSettings.watermark_y -
				defaultSettings.watermark_height *
					defaultSettings.watermark_rows) /
				(defaultSettings.watermark_rows - 1),
		)
	}
	let x
	let y
	for (let i = 0; i < defaultSettings.watermark_rows; i++) {
		y =
			defaultSettings.watermark_y +
			(defaultSettings.watermark_y_space +
				defaultSettings.watermark_height) *
				i
		for (let j = 0; j < defaultSettings.watermark_cols; j++) {
			x =
				defaultSettings.watermark_x +
				(defaultSettings.watermark_width +
					defaultSettings.watermark_x_space) *
					j

			let mask_div = document.createElement("div")
			mask_div.id = "mask_div" + i + j
			mask_div.className = "mask_div"
			mask_div.appendChild(
				document.createTextNode(defaultSettings.watermark_txt),
			)
			//设置水印div倾斜显示
			mask_div.style.webkitTransform =
				"rotate(-" + defaultSettings.watermark_angle + "deg)"
			mask_div.style.MozTransform =
				"rotate(-" + defaultSettings.watermark_angle + "deg)"
			mask_div.style.msTransform =
				"rotate(-" + defaultSettings.watermark_angle + "deg)"
			mask_div.style.OTransform =
				"rotate(-" + defaultSettings.watermark_angle + "deg)"
			mask_div.style.transform =
				"rotate(-" + defaultSettings.watermark_angle + "deg)"
			mask_div.style.visibility = ""
			mask_div.style.position = "absolute"
			mask_div.style.left = x + "px"
			mask_div.style.top = y + "px"
			mask_div.style.overflow = "hidden"
			mask_div.style.zIndex = "9999"
			mask_div.style.pointerEvents = "none" //pointer-events:none  让水印不遮挡页面的点击事件
			//mask_div.style.border="solid #eee 1px";
			mask_div.style.opacity = defaultSettings.watermark_alpha
			mask_div.style.fontSize = defaultSettings.watermark_fontsize
			mask_div.style.fontFamily = defaultSettings.watermark_font
			mask_div.style.color = defaultSettings.watermark_color
			mask_div.style.textAlign = "center"
			mask_div.style.width = defaultSettings.watermark_width + "px"
			mask_div.style.height = defaultSettings.watermark_height + "px"
			mask_div.style.display = "block"
			oTemp.appendChild(mask_div)
		}
	}
	document.body.appendChild(oTemp)
}

export default watermark
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
```
