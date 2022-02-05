---
title: 节流和防抖函数(debounce/throttle)
date: 2020-07-22
sidebar: "auto"
tags:
  - debounce
  - throttle
categories:
  - frontend
---

::: tip 原文

- [JavaScript 专题之跟着 underscore 学节流](https://github.com/mqyqingfeng/Blog/issues/26)
- [JavaScript 专题之跟着 underscore 学防抖](https://github.com/mqyqingfeng/Blog/issues/22)

:::

## 防抖函数 debounce

事件在被触发 n 秒后，再执行回调；如果在这 n 秒中内再次被触发，则重新计时然后在执行回调

- 简化版

```js
// 函数防抖的实现
function debounce(fn, wait) {
  let timer = null;

  return function() {
    let context = this,
        args = arguments;

    // 如果此时存在定时器的话，则取消之前的定时器重新记时
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    // 设置定时器，使事件间隔指定事件后执行
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}
```

- 其他

```js
// underscore.js
function debounce2(func, wait, immediate) {
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


// 要防抖的函数
let fn = function (a, b) {
  console.log('回调', a, b);
};
setInterval(debounce(fn, 500, '参数1', '参数2'), 1000);
setInterval(debounce(fn, 2000), 1000); // 不会执行fn回调函数
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

## 节流函数 throttle

单位时间内有事件被多次触发则，只生效一次

- 简化版

```js
// 函数节流的实现;
function throttle(fn, delay) {
  let curTime = Date.now();

  return function() {
    let context = this,
        args = arguments,
        nowTime = Date.now();

    // 如果两次时间间隔超过了指定时间，则执行函数。
    if (nowTime - curTime >= delay) {
      curTime = Date.now();
      return fn.apply(context, args);
    }
  };
}
```

- 其他

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
  console.log('回调', a, b);
};
// 重复执行函数
setInterval(throttle(fn, 1000, '参数1', '参数2'), 10);

```
