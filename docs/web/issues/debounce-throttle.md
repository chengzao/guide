---
title: 节流和防抖函数(debounce/throttle)
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

<<< @/utils/libs/event/debounce.js

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

<<< @/utils/libs/event/throttle.js
