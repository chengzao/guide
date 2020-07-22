---
title: debounce/throttle
date: 2020-07-22
sidebar: "auto"
tags:
  - debounce
  - throttle
categories:
  - libs
---

::: tip 原文

- [JavaScript 专题之跟着 underscore 学节流](https://github.com/mqyqingfeng/Blog/issues/26)
- [JavaScript 专题之跟着 underscore 学防抖](https://github.com/mqyqingfeng/Blog/issues/22)

:::

## 防抖函数 debounce

事件在被触发 n 秒后，再执行回调；如果在这 n 秒中内再次被触发，则重新计时然后在执行回调

```js
function debounce(callback, wait, ...arr) {
  let timer = null;
  return () => {
    if (timer) {
      // 如果有一个函数在等待执行 清除定时器 下面重新计时
      clearTimeout(timer);
      timer = null; // 清空timer 下次重启定时器
    }
    // 设定时器/重置定时器
    timer = setTimeout(() => {
      callback && callback(...arr);
    }, wait);
  };
}
// 要防抖的函数
let fn = function(a, b) {
  console.log("回调", a, b);
};
setInterval(debounce(fn, 500, "参数1", "参数2"), 1000);
setInterval(debounce(fn, 2000), 1000); // 不会执行
```

- 用途

```js
// 简单的防抖动函数
// 实际想绑定在 scroll 事件上的 handler
function realFunc() {
  console.log("Success");
}

// 采用了防抖动
window.addEventListener("scroll", debounce(realFunc, 500));
// 没采用防抖动
window.addEventListener("scroll", realFunc);
```

- debounce 防抖函数 underscore.js

```js
function debounce(func, wait, immediate) {
  var timer, result;
  var debounced = function() {
    var context = this;
    var args = arguments;
    if (timer) clearTimeout(timer);
    if (immediate) {
      var callNow = !timer;
      timer = setTimeout(function() {
        timer = null;
      }, wait);
      if (callNow) result = func.apply(context, args);
    } else {
      timer = setTimeout(function() {
        func.apply(context, args);
      }, wait);
    }
    return result;
  };
  debounced.cancel = function() {
    clearTimeout(timer);
    timer = null;
  };
  return debounced;
}
```

## 节流函数 throttle

单位时间内有事件被多次触发则，只生效一次

```js
function throttle(callback, time, ...arr) {
  // 上次执行时间 第一次马上执行
  let last = 0;
  return () => {
    // 当前时间
    let cur = Date.now();
    // 当前时间与上次执行的时间，是否超过间隔时间
    if (cur - last > time) {
      // ...arr为callback的参数
      callback(...arr);
      // 重置上次执行时间为当前时间 方便下次执行
      last = cur;
    }
  };
}
let fn = (a, b) => {
  console.log("回调", a, b);
};
// 重复执行函数
setInterval(throttle(fn, 1000, "参数1", "参数2"), 10);
```

- 完整版

```js
function throttle(func, wait, options) {
  var timeout, context, args, result;
  var previous = 0;
  if (!options) options = {};

  var later = function() {
    previous = options.leading === false ? 0 : new Date().getTime();
    timeout = null;
    func.apply(context, args);
    if (!timeout) context = args = null;
  };

  var throttled = function() {
    var now = new Date().getTime();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
  };

  throttled.cancel = function() {
    clearTimeout(timeout);
    previous = 0;
    timeout = null;
  };

  return throttled;
}
```
