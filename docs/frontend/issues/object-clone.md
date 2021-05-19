---
title: 对象工具函数
date: 2020-07-30
sidebar: "auto"
tags:
  - 工具函数
categories:
  - frontend
---

## 简易克隆对象



```js
//简易克隆对象
function extend2(tag, source) {
  for (var item in source) {
    tag[item] = source[item];
  }
  return tag;
}
//
JSON.parse(JSON.stringify(obj))
//
Object.create({}, obj)
```



## formateMoney

```js
const formatMoney = function(num) {
  if (num == "0") {
    return "0.00";
  }
  if (num == undefined || num == "" || num == null) {
    return "-";
  }
  return parseFloat(num)
    .toFixed(2)
    .replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, "$&,");
};

//
Number(num).toLocalString()
```

## formateNumber

```js
function formatNumber(num) {
  let numStr = num + "";
  let arr = num < 0 ? numStr.slice(1).split(".") : numStr.split(".");
  let a = arr[0].split("");
  for (let i = a.length - 3; i > 0; i = i - 3) {
    a.splice(i, 0, ",");
  }
  let res = arr[1] ? a.join("") + "." + arr[1] : a.join("");
  return num < 0 ? "-" + res : res;
}
```

## 二分查找

```js
// 二分查找，前提是数组为有序数组, 返回索引值, O(㏒n)复杂度
function binarySearch(target, arr) {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    let mid = parseInt(start + (end - start) / 2);
    if (target == arr[mid]) {
      return mid;
    } else if (target > arr[mid]) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return -1;
}
let arr = [1, 4, 6, 8, 9, 21, 45, 67, 98];
console.log(binarySearch(67, arr));
```

## 获取类名 ClassName

```js
//获取类名ClassName
function getClassName(str) {
  //为了火狐和谷歌及IE9-11
  if (document.getElementsByClassName) {
    return document.getElementsByClassName(str);
  }
  //获取所有标签节点(数组)
  var allNodes = document.getElementsByTagName("*");
  //定义数组(哪个标签满足我的需求，就把他push到arr中，最后返回)
  var arr = [];
  //遍历数组（所有标签的数组）
  for (var i = 0; i < allNodes.length; i++) {
    //把类名变成数组
    var arrClassName = allNodes[i].className.split(" ");
    //遍历数组中所有的元素（遍历数组中所有的元素用的）
    for (var j = 0; j < arrClassName.length; j++) {
      //在判断，如果Class属性值是传过来的值。放进数组。
      if (arrClassName[j] == str) {
        arr.push(aarrClassName[j]);
      }
    }
  }
  return arr;
}
```



## 动画 animate

- 简易版



```js
//动画animate
function animateOne(ele, target) {
  //清理定时器
  clearInterval(ele.timer);
  ele.timer = setInterval(function () {
    var step = 9;
    //如果对象的位置在目标的左边 往右走 step是正数
    //如果对象的位置在目标的右边 往左走 step是负数
    //对象的位置在目标的左边 ele.offsetLeft<target
    step = ele.offsetLeft < target ? step : -step;
    //终点检测 对象到目标的距离 > step的距离 就要继续走
    if (Math.abs(ele.offsetLeft - target) > Math.abs(step)) {
      ele.style.left = ele.offsetLeft + step + "px";
    } else {
      //距有可能 离终点还有一点点距离 我们手动把他放置到终点位置
      ele.style.left = target + "px";
      clearInterval(ele.timer);
    }
  }, 30)
}

// animate 缓动动画
function animate(obj, target) {
  clearInterval(obj.timer);
  obj.timer = setInterval(function () {
    var leader = obj.offsetLeft;
    var step = (target - leader) / 10;
    step = step > 0 ? Math.ceil(step) : Math.floor(step);
    obj.style.left = obj.offsetLeft + step + "px";
    if (leader == target) {
      clearInterval(obj.timer);
    }
  }, 25)
}
```



- animate



```js
//animate fn回调
function animateTwo(obj, json, fn) {
  clearInterval(obj.timer);
  obj.timer = setInterval(function () {
    var flag = true;
    for (var k in json) {
      var target = json[k];
      var leader = parseInt(getStyle(obj, k));
      var step = (target - leader) / 10;
      step = step > 0 ? Math.ceil(step) : Math.floor(step);
      leader = leader + step;
      obj.style[k] = leader + "px";
      if (leader != target) {
        flag = false;
      }
    }
    if (flag) {
      clearInterval(obj.timer);
      if (fn) {
        //alert(fn);
        fn();
      }
    }
  }, 30)
}
```



- animate 多属性动画



```js
//fn为回调函数
//{attr:target,attr:target}
function animate(obj, json, fn) {
  clearInterval(obj.timer);
  obj.timer = setInterval(function () {
    var flag = true;
    for (var attr in json) {
      //step = (target-leader)/10
      //leader = leader + step
      if (attr == "opacity") {
        var target = json[attr] * 100;
        var leader = Math.round(parseInt(getStyle(obj, attr || "filter") * 100)) || 100;
      } else {
        var target = json[attr];
        var leader = parseInt(getStyle(obj, attr));
      }
      var step = (target - leader) / 10;
      step = step > 0 ? Math.ceil(step) : Math.floor(step);
      leader = leader + step;
      //obj.style.left = leader + "px";
      //obj.style["left"] = leader + "px";
      if (attr == "opacity") {
        obj.style.opacity = leader / 100;
        obj.style.filter = "alpha(opacity=" + leader + ")";
        //filter:alpha(opacity=x);
      } else if (attr == "zIndex") {
        obj.style.zIndex = attr;
      } else {
        obj.style[attr] = leader + "px";
      }
      /*if (leader == target) {
       clearInterval(obj.timer);
       }*/
      if (leader != target) {
        flag = false;
      }
    }
    if (flag) {
      clearInterval(obj.timer);
      //alert(fn);
      if (fn) {
        fn();
      }
    }
  }, 30)
}
```



## 根据属性得到具体元素



```js
// 根据属性得到具体元素
function atrGetEle(ele, attr, value) {
  var aElements = document.getElementsByTagName(ele);
  var aEle = [];
  for (var i = 0; i < aElements.length; i++) {
    if (aElements[i].getAttribute(attr) == value)
      aEle.push(aElements[i]);
  }
  return aEle;
}
```



## deepCLone



```js
// 对象数组的深拷贝
var objDeepCopy = function(source) {
  var sourceCopy = source instanceof Array ? [] : {};
  for (var item in source) {
    sourceCopy[item] =
      typeof source[item] === "object"
        ? objDeepCopy(source[item])
        : source[item];
  }
  return sourceCopy;
};

function isObject(obj) {
  return Object.prototype.toString.call(obj) == "[object Object]";
}

var objDeepCopy = function(obj) {
  if (!isObject(obj)) return obj;
  if (typeof window !== "undefined" && window.JSON) {
    // 浏览器环境下 并支持window.JSON 则使用 JSON
    return JSON.parse(JSON.stringify(obj));
  } else {
    var newObj = obj.constructor === Array ? [] : {};
    for (var key in obj) {
      newObj[key] =
        typeof obj[key] === "object" ? deepCopy(obj[key]) : obj[key];
    }
    return newObj;
  }
};
function deepClone(obj, map = new WeakMap()) {
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Date) return new Date(obj);
  // 判断是否是一个非对象
  if (obj == null || typeof obj != "object") return obj;

  if (map.has(obj)) {
    return map.get(obj);
  }
  let t = {};
  map.set(obj, t);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      t[key] = deepClone(obj[key], map);
    }
  }
  return t;
}
```



## other



```js
var calendarLink = {
  // 插入script标签
  createSrc: function (url) {
    var scrEle = document.createElement("script");
    scrEle.src = url;
    document.body.appendChild(scrEle);
  },
  // 插入样式表
  createStyle: function (url) {
    var scrEle = document.createElement("link");
    scrEle.rel = "stylesheet";
    scrEle.href = url;
    document.head.appendChild(scrEle);
  },
  on: function (url) {
    if (!url) {
      return false;
    }
    if (window.addEventListener)
      window.addEventListener("load", this.createSrc.bind(this, url), false);
    else if (window.attachEvent)
      window.attachEvent("onload", this.createSrc.bind(this, url));
    else window.onload = this.createSrc.bind(this, url);
  },
  removeDom: function () {
    var reSrc = document.querySelector('#appendEle');
    reSrc.parentNode.removeChild(reSrc);
  },
}


//
Function.prototype.before = function (beforefn) {
  let _self = this; // 缓存原函数的引用
  return function () { // 代理函数
    beforefn.apply(this, arguments); // 执行前置函数
    return _self.apply(this, arguments); // 执行原函数
  }
}

Function.prototype.after = function (afterfn) {
  let _self = this;
  return function () {
    let set = _self.apply(this, arguments);
    afterfn.apply(this, arguments);
    return set;
  }
}

let func = () => console.log('func');
func = func.before(() => {
  console.log('===before===');
}).after(() => {
  console.log('===after===');
});

func();
// ===before===
// func
// ===after===
```



## console.log

```js
const log = (type) => console.log.bind(console, type);
```

## cached



```js
function cached(fn) {
  const cache = Object.create(null)
  return function cachedFn(str) {
    if (!cache[str]) {
      cache[str] = fn(str)
    }
    return cache[str]
  }
}
// test
var cachedComputed = cached(computed)
cachedComputed('ss')
// 打印2000s have passed
cachedComputed('ss')
// 不再打印
```



## UrlToObject



```js
function serilizeUrl(url) {
  var urlObject = {}
  if (/\?/.test(url)) {
    var urlString = url.substring(url.indexOf('?') + 1)
    console.log(urlString)
    var urlArray = urlString.split('&')
    for (var i = 0, len = urlArray.length; i < len; i++) {
      var urlItem = urlArray[i]
      console.log(urlItem)
      var item = urlItem.split('=')
      if (
        item.length == 2 &&
        item[0] != '' &&
        item[0] != '""' &&
        item[0] != '"'
      ) {
        urlObject[item[0]] = encodeURIComponent(item[1])
      }
    }
    return urlObject
  }
  return {}
}
```



## hexToRGB

- 16 进制颜色值转 RGB 值

```js
const hexToRGB = (hex) => {
  if (!/(^\#([a-fA-F0-9]{3})$)|(^\#([a-fA-F0-9]{6})$)/g.test(hex)) return null
  let allNumberStr = '0123456789abcdef' // 十六进制的所有数字
  let len = hex.slice(1).length;
  let str = len === 6 ? hex.slice(1) : hex.slice(1)[0].repeat(2) + hex.slice(1)[1].repeat(2) + hex.slice(1)[2].repeat(2);
  let arrStr = str.split('');
  let newArrStr = arrStr.map((item, index) => {
    return allNumberStr.indexOf((item + '').toLowerCase())
  })
  let num1 = newArrStr[0] * 16 + newArrStr[1];
  let num2 = newArrStr[2] * 16 + newArrStr[3];
  let num3 = newArrStr[4] * 16 + newArrStr[5];
  return `rgb(${num1}, ${num2}, ${num3})`
}
// console.log(hexToRGB('#fffaaa'))
```

## toCamelCaseVar

- 转换驼峰命名

```js
const toCamelCaseVar = (variable) => {
  variable = variable.replace(/[\_|-](\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
  return variable.slice(0, 1).toLowerCase() + variable.slice(1)
}

// console.log(toCamelCaseVar('Foo_style_css')) // fooStyleCss
```

## toChineseNum

```js
function toChineseNum(num) {
  num += ''
  let numLength = num.length
  let numStr = '零一二三四五六七八九十'
  let unitArr = ['', '十', '百', '千', '万']
  function getResult(str) {
    let res = '';
    if (str.length > 5) {
      let first = str.slice(-5);
      let second = str.slice(0, str.length - 5);
      for (let i in second) {
        res = res + numStr[second[i]] + unitArr[second.length - i];
      }
      for (let i in first) {
        res = res + numStr[first[i]] + unitArr[first.length - i - 1];
      }
    } else {
      let first = str.slice(-5);
      for (let i in first) {
        res = res + numStr[first[i]] + unitArr[first.length - i - 1];
      }
    }
    res = res.replace(/零[零十百千]+/g, '零').replace(/零+$/g, '').replace(/零万/g, '万')
    return res;
  }

  if (numLength > 8) {
    return getResult(num.slice(0, numLength - 8)) + '亿' + getResult(num.slice(-8))
  }
  return getResult(num)
}
```

## randomString

```js
const randomString = function(boolean, min, max=0) {
  var str = "",
    range = min,
    arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  // 随机产生
  if (boolean) {
    range = Math.round(Math.random() * (max - min)) + min;
  }
  for (var i = 0; i < range; i++) {
    pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
};
// demo
console.log(randomString(true, 1, 4));
```

## 如何避开 JavaScript 浮点数计算精度问题

- 如`0.1+0.2!==0.3`
- 简单的进制转换：`5..toString(2) //0101`
- 解决相关此问题的类库：[bignumber.js](https://github.com/MikeMcl/bignumber.js)
- 简单解决方案：将小数转成整数来运算，之后再转回小数



```js
'use strict'

var accAdd = function (num1, num2) {
  num1 = Number(num1);
  num2 = Number(num2);
  var dec1, dec2, times;
  try { dec1 = countDecimals(num1) + 1; } catch (e) { dec1 = 0; }
  try { dec2 = countDecimals(num2) + 1; } catch (e) { dec2 = 0; }
  times = Math.pow(10, Math.max(dec1, dec2));
  // var result = (num1 * times + num2 * times) / times;
  var result = (accMul(num1, times) + accMul(num2, times)) / times;
  return getCorrectResult("add", num1, num2, result);
  // return result;
};

var accSub = function (num1, num2) {
  num1 = Number(num1);
  num2 = Number(num2);
  var dec1, dec2, times;
  try { dec1 = countDecimals(num1) + 1; } catch (e) { dec1 = 0; }
  try { dec2 = countDecimals(num2) + 1; } catch (e) { dec2 = 0; }
  times = Math.pow(10, Math.max(dec1, dec2));
  // var result = Number(((num1 * times - num2 * times) / times);
  var result = Number((accMul(num1, times) - accMul(num2, times)) / times);
  return getCorrectResult("sub", num1, num2, result);
  // return result;
};

var accDiv = function (num1, num2) {
  num1 = Number(num1);
  num2 = Number(num2);
  var t1 = 0, t2 = 0, dec1, dec2;
  try { t1 = countDecimals(num1); } catch (e) { }
  try { t2 = countDecimals(num2); } catch (e) { }
  dec1 = convertToInt(num1);
  dec2 = convertToInt(num2);
  var result = accMul((dec1 / dec2), Math.pow(10, t2 - t1));
  return getCorrectResult("div", num1, num2, result);
  // return result;
};

var accMul = function (num1, num2) {
  num1 = Number(num1);
  num2 = Number(num2);
  var times = 0, s1 = num1.toString(), s2 = num2.toString();
  try { times += countDecimals(s1); } catch (e) { }
  try { times += countDecimals(s2); } catch (e) { }
  var result = convertToInt(s1) * convertToInt(s2) / Math.pow(10, times);
  return getCorrectResult("mul", num1, num2, result);
  // return result;
};

var countDecimals = function (num) {
  var len = 0;
  try {
    num = Number(num);
    var str = num.toString().toUpperCase();
    if (str.split('E').length === 2) { // scientific notation
      var isDecimal = false;
      if (str.split('.').length === 2) {
        str = str.split('.')[1];
        if (parseInt(str.split('E')[0]) !== 0) {
          isDecimal = true;
        }
      }
      let x = str.split('E');
      if (isDecimal) {
        len = x[0].length;
      }
      len -= parseInt(x[1]);
    } else if (str.split('.').length === 2) { // decimal
      if (parseInt(str.split('.')[1]) !== 0) {
        len = str.split('.')[1].length;
      }
    }
  } catch (e) {
    throw e;
  } finally {
    if (isNaN(len) || len < 0) {
      len = 0;
    }
    return len;
  }
};

var convertToInt = function (num) {
  num = Number(num);
  var newNum = num;
  var times = countDecimals(num);
  var temp_num = num.toString().toUpperCase();
  if (temp_num.split('E').length === 2) {
    newNum = Math.round(num * Math.pow(10, times));
  } else {
    newNum = Number(temp_num.replace(".", ""));
  }
  return newNum;
};

var getCorrectResult = function (type, num1, num2, result) {
  var temp_result = 0;
  switch (type) {
    case "add":
      temp_result = num1 + num2;
      break;
    case "sub":
      temp_result = num1 - num2;
      break;
    case "div":
      temp_result = num1 / num2;
      break;
    case "mul":
      temp_result = num1 * num2;
      break;
  }
  if (Math.abs(result - temp_result) > 1) {
    return temp_result;
  }
  return result;
};
// 用法
// 加法： accAdd(0.1, 0.2)  // 得到结果：0.3
// 减法： accSub(1, 0.9)    // 得到结果：0.1
// 除法： accDiv(2.2, 100)  // 得到结果：0.022
// 乘法： accMul(7, 0.8)    // 得到结果：5.6

// 工具函数
countDecimals() //方法：计算小数位的长度

convertToInt() //方法：将小数转成整数

getCorrectResult() //方法：确认我们的计算结果无误，以防万一
```



## 斐波那契数

```js
// fn1
var fib = function (N) {
  if (N == 0) return 0;
  if (N == 1) return 1;
  return fib(N - 1) + fib(N - 2)
};

// fn2
let fib = n => {
  if (n == 0) return 0;
  let a1 = 0;
  a2 = 1;
  for (let i = 1; i < n; i++) {
    [a1, a2] = [a2, a1 + a2];
  }
  return a2;
}

// fn3
let fib = n => Math.round(
  (Math.pow((1 + Math.sqrt(5)) / 2, n) -
    Math.pow((1 - Math.sqrt(5)) / 2, n)) /
  Math.sqrt(5)
);
```

## Promise

- [原文：从零一步一步实现一个完整版的 Promise](https://juejin.im/post/5d59757f6fb9a06ae76405c6)

- 简易版

```js
function myPromise(constructor) {
  let self = this;
  self.status = "pending"; //定义状态改变前的初始状态
  self.value = undefined; //定义状态为fulfilled的时候的状态
  self.reason = undefined; //定义状态为rejected的时候的状态
  self.resolveCb = [];
  self.rejectCb = [];
  function resolve(value) {
    if (self.status === "pending") {
      self.value = value;
      self.status = "fulfilled";
      self.resolveCb.forEach(cb => cb(data));
    }
  }
  function reject(reason) {
    if (self.status === "pending") {
      self.reason = reason;
      self.status = "rejected";
      self.rejectCb.forEach(cb => cb(reason))
    }
  }
  //捕获构造异常
  try {
    constructor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}
myPromise.prototype.then = function(onResolved, onRejected) {
   if (this.status == "fulfilled") {
      onResolved(this.value);
    }
    if (this.status == "rejected") {
      onRejected(this.reason);
    }
    if (this.status == "pending") {
      this.resolveCb.push(() => onResolved(this.value));
      this.rejectCb.push(() => onRejected(this.reason));
    }
};
// demo
var p = new myPromise(function(resolve, reject) {
  resolve(1);
});
p.then(function(x) {
  console.log(x);
});
```

- 完整版



```js
function Promise(executor) {
  var self = this;
  // Promise 状态
  self.status = 'pending'
  // Promise 值
  self.data = undefined
  // Promise resolve 时的回调函数集
  self.onResolvedCallback = []
  // Promise reject 时的回调函数集
  self.onRejectedCallback = []

  // reslove
  function resolve(value) {
    if (value instanceof Promise) {
      value.then(resolve, reject)
      return
    }
    setTimeout(function () {
      if (self.status === 'pending') {
        self.status = 'fulfilled'
        self.data = value
        // 执行resolve的回调函数，将value传递到callback中
        self.onResolvedCallback.forEach(cb => cb(value))
      }
    })
  }

  // reject
  function reject(reason) {
    setTimeout(function () {
      if (self.status === 'pending') {
        self.status = 'rejected'
        self.data = reason
        // 执行reject的回调函数，将reason传递到callback中
        self.onRejectedCallback.forEach(cb => cb(reason))
      }
    })
  }

  // 执行executor并传入相应的参数
  try {
    executor(resolve, reject)
  } catch (error) {
    reject(error)
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  let then
  let thenCalledOrThrow = false
  if (promise2 === x) {
    reject(new TypeError('Chaining cycle detected for promise!'))
    return
  }

  if (x instanceof Promise) {
    if (x.status === 'pending') {
      x.then(value => {
        resolvePromise(promise2, value, resolve, reject)
      }, err => {
        reject(err)
      })
    } else {
      x.then(resolve, reject)
    }
    return
  }

  if ((x !== null) && ((typeof x === 'function') || (typeof x === 'object'))) {
    try {
      then = x.then
      if (typeof then === 'function') {
        then.call(x, value => {
          if (thenCalledOrThrow) return
          thenCalledOrThrow = true
          resolvePromise(promise2, value, resolve, reject)
          return
        }, err => {
          if (thenCalledOrThrow) return
          thenCalledOrThrow = true
          reject(err)
          return
        })
      } else {
        resolve(x)
      }
    } catch (error) {
      if (thenCalledOrThrow) return
      thenCalledOrThrow = true
      reject(error)
    }
  } else {
    resolve(x)
  }
}

Promise.prototype.then = function (onResolve, onReject) {
  let self = this
  let promise2
  // 处理参数默认值
  onResolve = typeof onResolve === 'function' ? onResolve : function (value) { return value }
  onReject = typeof onReject === 'function' ? onReject : function (reason) { throw reason }
  // 等待
  if (self.status === 'pending') {
    return promise2 = new Promise(function (resolve, reject) {
      self.onResolvedCallback.push(function (value) {
        try {
          var x = onResolve(value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (error) {
          reject(error)
        }
      })

      self.onRejectedCallback.push(function (reason) {
        try {
          var x = onReject(reason)
          resolvePromise(promise2, x, resolve, reject)
        } catch (error) {
          reject(error)
        }
      })

    })
  }
  // 成功
  if (self.status === 'fulfilled') {
    return promise2 = new Promise(function (resolve, reject) {
      setTimeout(function () {
        try {
          var x = onResolve(self.data)
          resolvePromise(promise2, x, resolve, reject)
        } catch (error) {
          // 如果出错，以捕获到的错误做为promise2的结果
          reject(error)
        }
      }, 0)
    })
  }
  // 失败
  if (self.status === 'rejected') {
    return promise2 = new Promise(function (resolve, reject) {
      setTimeout(function () {
        try {
          var x = onReject(self.data)
          resolvePromise(promise2, x, resolve, reject)
        } catch (error) {
          reject(error)
        }
      }, 0)
    })
  }
}

Promise.prototype.catch = function (onReject) {
  return this.then(null, onReject)
}

Promise.resolve = function (value) {
  return new Promise(function (resolve, reject) { resolve(value) })
}

Promise.reject = function (reason) {
  return new Promise(function (resolve, reject) { reject(reason) })
}

Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    let values = []
    let count = 0
    promises.forEach((promise, index) => {
      promise.then(value => {
        values[index] = value
        count++
        if (count === promises.length) {
          resolve(values)
        }
      }, reject)
    })
  })
}

Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach(promise => {
      promise.then(resolve, reject)
    })
  })
}

Promise.deferred = function () {
  var defer = {}
  defer.promise = new Promise((resolve, reject) => {
    defer.resolve = resolve
    defer.reject = reject
  })
  return defer
}

try {
  module.exports = Promise
} catch (error) {
}

const xFetch = function(url, config) {
  let timeout = config.timeout || 5000;
  let timeoutFn = () => Promise.resolve(setTimeout(() => {}, timeout));
  return Promise.race([fetch(url), timeoutFn]);
};
```



## 监听数组变化

```js
function ObserverableArray() {
  return new Proxy([], {
    get(target, propKey) {
      const matArr = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
      matArr.indexOf(propKey) > -1 && console.log(propKey);
      return target[propKey]
    }
  })
}
const arr = new ObserverableArray()

arr.push('Good')
arr.unshift('Good2')
console.log(arr)
```

## 最大公约数&最小公倍数

```js
// 最大公约数: 能同时被两数整除的最大数字
function maxDivisor(num1, num2) {
  let max = num1 > num2 ? num1 : num2,
    min = num1 > num2 ? num2 : num1;
  for (var i = min; i >= 1; i--) {
    if (max % i == 0 && min % i == 0) {
      return i;
    }
  }
}

console.log(maxDivisor(60, 30)); // 30

// 最小公倍数: 能同时整除两数的最小数字
function minDivisor(num1, num2) {
  let max = num1 > num2 ? num1 : num2,
    min = num1 > num2 ? num2 : num1,
    result = 0;
  // 这个循环，当两数同为质数时，终止的最大条件值为 i = min
  for (var i = 1; i <= min; i++) {
    result = i * max;
    if (result % max == 0 && result % min == 0) {
      return result;
    }
  }
}
console.log(minDivisor(6, 8)); // 24
```

## 验证是否为回文

```js
// 数组方法生成倒装的新字符串与原字符串对比
function isPalindrome(str) {
  str = '' + str;
  if (!str || str.length < 2) {
    return false;
  }
  return (
    Array.from(str)
      .reverse()
      .join('') === str
  );
}

// 倒序循环生成新字符串与原字符串对比
function isPalindrome(str) {
  str = '' + str;
  if (!str || str.length < 2) {
    return false;
  }
  var newStr = '';
  for (var i = str.length - 1; i >= 0; i--) {
    newStr += str[i];
  }
  return str1 === str;
}

// 以中间点为基点，从头至中与从尾至中逐一字符串进行对比，若有一个不同，则 return false
function isPalindrome(str) {
  str = '' + str;
  if (!str || str.length < 2) {
    return false;
  }
  for (let i = 0; i < str.length / 2; i++) {
    if (str[i] !== str[str.length - 1 - i]) {
      return false;
    }
  }
  return true;
}
```

## FIFO

- 一种缓存算法，设置缓存上限，当达到了缓存上限的时候，按照先进先出的策略进行淘汰，再增加进新的 k-v

```js
class FIFOCache {
  constructor(limit) {
    this.limit = limit || 10;
    this.map = {};
    this.keys = [];
  }
  set(key, value) {
    let map = this.map;
    let keys = this.keys;
    if (!Object.prototype.hasOwnProperty.call(map, key)) {
      if (keys.length === this.limit) {
        delete map[keys.shift()]; //先进先出，删除队列第一个元素
      }
      keys.push(key);
    }
    map[key] = value; //无论存在与否都对map中的key赋值
  }
  get(key) {
    return this.map[key];
  }
}

let fifo = new FIFOCache(10);

for (let i = 0; i < 10; i++) {
  fifo.set(`name-${i}`, i);
}
fifo.set("name-10", 10);
console.log(fifo);
```

## 判断一个数是否为质数

```js
function isPrime(num) {
  if (num === 1) {
    return "1 不是质数，请输入大于1的数字";
  } else if (num <= 3) {
    return num > 1;
  } else {
    let sq = Math.sqrt(num);
    for (let i = 2; i <= sq; i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  }
}
```

## 实现类 vue 的 filter 函数

```js
// {{ message | fn1 | fn2 }}
function filterMap() {
  var args = [].slice.call(arguments);
  if (args.length == 0) {
    throw Error("处理函数不能为空");
  }
  return function next(val) {
    return args.length == 1
      ? args.shift()(val)
      : args.reduce((pre, cur) => {
          let value = typeof pre == "function" ? pre(val) : pre;
          return cur(value);
        }, args.shift());
  };
}

function fn1(val) {
  return "fn1" + val;
}
function fn2(val) {
  return "fn2" + val;
}
function fn3(val) {
  return "fn3" + val;
}

var s = filterMap(fn1, fn2)("123");
console.log(s);
```

## LRU

- LRU（Least recently used，最近最少使用）算法。最近被访问的数据那么它将来访问的概率就大，缓存满的时候，优先淘汰最无人问津者

- 实现逻辑 Map : [原文：146. LRU 缓存机制](https://leetcode-cn.com/problems/lru-cache/solution/146-lruhuan-cun-ji-zhi-by-alexer-660/)

```bash
Map 中的键值是有序的，而添加到对象中的键则不是。因此，当对它进行遍历时，Map 对象是按插入的顺序返回键值
Map.prototype.keys()
  返回一个新的 Iterator对象， 它按插入顺序包含了Map对象中每个元素的键 。

1、尾部元素一直是最新set的，对应于LRU的最近使用原则
  Map.set()
2、头部元素是最远使用的，用于LRU容量满载时删除最远使用的元素，可获取其key
  Map.keys().next().value

解题步骤
get
  元素存在 delete、set
  元素不存在 return -1
put
  元素存在  delete、set
  元素不存在
  容量超载 delete map头部元素(map.keys().next().value)、set
  不超载   set
```

```js
let myMap = new Map();

// 添加键
myMap.set("1", "a");
myMap.set("2", "b");
myMap.set("3", "c");
myMap.set("4", "d");

console.log(myMap.get("2")); // b

console.log(myMap.delete("4")); // true

console.log(myMap);

let val = myMap.keys();
console.log(val.next());
console.log(val.next());
```

- 代码

```js
/**
 * @param {number} capacity 容量
 */
var LRUCache = function(capacity) {
  this.cap = capacity;
  this.cache = new Map();
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
  let cache = this.cache;
  if (cache.has(key)) {
    let val = cache.get(key);
    // 删除元素
    cache.delete(key);
    // 重新插入到map结构最后
    cache.set(key, val);
    return val;
  } else {
    return -1;
  }
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
  let cache = this.cache;
  if (cache.has(key)) {
    // 删除元素
    cache.delete(key);
  } else {
    if (cache.size == this.cap) {
      // 删除map中第一个元素
      cache.delete(cache.keys().next().value);
    }
  }
  // 重新赋值插入
  cache.set(key, value);
};

//  Your LRUCache object will be instantiated and called as such:
var cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
cache.get(1); // 返回  1
cache.put(3, 3); // 该操作会使得密钥 2 作废
cache.get(2); // 返回 -1 (未找到)
cache.put(4, 4); // 该操作会使得密钥 1 作废
cache.get(1); // 返回 -1 (未找到)
cache.get(3); // 返回  3
cache.get(4); // 返回  4

console.log(cache);
```

## 字符串正则去重

```js
var str = "adaaasfjjjbkk";

var res = str.replace(/(.).*(\1)/g, function($1, $2, $3) {
  $1 = $2 + $1.substring(1).replace(new RegExp($2, "g"), "");
  return $1;
});
```

## 使用 Array 来重复字符

```js
for (let a = "", i = 7; i--; ) a += 0;

let b = Array(7).join(0); // "0000000"
let c = Array(7).join("La"); // "LaLaLaLaLaLa"

let d = "0".repeat(7); // "0000000"
let e = Array(7)
  .fill("Ab")
  .join(""); // AbAbAbAbAbAbAb
```

## 使用 toString(16)取随机字符串

```js
Math.random()
  .toString(16)
  .substring(2, 15);
```

## 使用setTimeout代替setInterval进行间歇调用

```js
var executeTimes = 0;
var intervalTime = 500;
var intervalId = null;

// setInterval的Demo
intervalId = setInterval(intervalFun,intervalTime);

function intervalFun(){
    executeTimes++;
    console.log("doIntervalFun——"+executeTimes);
    if(executeTimes==5){
        clearInterval(intervalId);
    }
}

// setTimeout的Demo
setTimeout(timeOutFun,intervalTime);

function timeOutFun(){
    executeTimes++;
    console.log("doTimeOutFun——"+executeTimes);
    if(executeTimes<5){
        setTimeout(arguments.callee,intervalTime);
    }
}
```
