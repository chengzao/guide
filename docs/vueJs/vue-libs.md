---
title: vue libs
date: 2020-07-21
sidebar: "auto"
tags:
  - vue
categories:
  - libs
---

[原文：「从源码中学习」Vue 源码中的 JS 骚操作](https://juejin.im/post/5c73554cf265da2de33f2a32)

## inBrowser: 检测当前宿主环境是否是浏览器

```js
// 通过判断 `window` 对象是否存在即可
export const inBrowser = typeof window !== "undefined";
```

## hasProto:检查当前环境是否可以使用对象的 `__proto__` 属性

```js
// 一个对象的 __proto__ 属性指向了其构造函数的原型
// 从一个空的对象字面量开始沿着原型链逐级检查。
export const hasProto = "__proto__" in {};
```

## 获取当浏览器的 `user Agent`

```js
// toLowerCase目的是 为了后续的各种环境检测
export const UA = inBrowser && window.navigator.userAgent.toLowerCase();
```

## IE 浏览器判断

```js
export const isIE = UA && /msie|trident/.test(UA);
```

## IE9| Edge | Chrome 判断

```js
export const isIE9 = UA && UA.indexOf("msie 9.0") > 0;
export const isEdge = UA && UA.indexOf("edge/") > 0;
export const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
```

## isReserved：检测字符串是否以 `$` 或者 `_` 开头

```js
// charCodeAt() 方法可返回指定位置的字符的 Unicode 编码
export function isReserved(str: string): boolean {
  const c = (str + "").charCodeAt(0);
  return c === 0x24 || c === 0x5f;
}
```

## Javascript 中级算法之 charCodeAt

```js
// 从传递进来的字母序列中找到缺失的字母并返回它
function fearNotLetter(str) {
  //将字符串转为ASCII码，并存入数组
  let arr = [];
  for (let i = 0; i < str.length; i++) {
    arr.push(str.charCodeAt(i));
  }
  for (let j = 1; j < arr.length; j++) {
    let num = arr[j] - arr[j - 1];
    //判断后一项减前一项是否为1，若不为1，则缺失该字符的前一项
    if (num != 1) {
      //将缺失字符ASCII转为字符并返回
      return String.fromCharCode(arr[j] - 1);
    }
  }
  return undefined;
}
fearNotLetter("abce"); // "d"
```

## camelize: 连字符转驼峰

```js
const camelizeRE = /-(\w)/g;
export const camelize = cached(str => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ""));
});

camelize("aa-bb"); // aaBb
```

## hyphenate:驼峰转连字符

```js
const hyphenateRE = /\B([A-Z])/g;
export const hyphenate = cached((str: string): string => {
  return str.replace(hyphenateRE, "-$1").toLowerCase();
});
```

## toString: 将给定变量的值转换为 string 类型并返回

```js
function toString(val) {
  return val == null
    ? ""
    : typeof val === "object"
    ? JSON.stringify(val, null, 2)
    : String(val);
}
```

## capitalize:首字符大写

```js
export const capitalize = cached((str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
```

## isPrimitive: 判断变量是否为原型类型

```js
export function isPrimitive(value) {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "symbol" ||
    typeof value === "boolean"
  );
}
```

## isRegExp: 判断变量是否为正则对象

```js
const _toString = Object.prototype.toString;
export function isRegExp(v) {
  return _toString.call(v) === "[object RegExp]";
}
```

## isObject: 区分对象和原始值

```js
export function isObject(obj) {
  return obj !== null && typeof obj === "object";
}
```

## makeMap：判断一个变量是否包含在传入字符串里

```js
function makeMap(str, expectsLowerCase) {
  const map = Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? val => map[val.toLowerCase()] : val => map[val];
}

let isMyName = makeMap("abc,hello", true);
console.log(isMyName("hello")); // true
console.log(isMyName("abc")); // true
console.log(isMyName("bcd")); // undefined
```

## once:只调用一次的函数

```js
export function once(fn) {
  let called = false;
  return function() {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  };
}
```

## cache:创建一个缓存函数

```js
/**
 * Create a cached version of a pure function.
 */
function cached(fn) {
  const cache = Object.create(null);
  return function cachedFn(str) {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

let ca = cached(function(str) {
  return `ca: ${str}`;
});
console.log(ca("ac-ae"));
console.log(ca("ac-ae"));
```

## dispatch and broadcast

```js
// 派发事件
vue.prototype.$dispatch = function(eventName, value) {
  let parent = this.$parent;
  while (parent) {
    parent.$emit(eventName, value);
    parent = parent.$parent;
  }
};

// 广播事件
Vue.prototype.$broadcast = function(eventName, value) {
  let broadcast = children => {
    children.forEach(child => {
      child.$emit(eventName, value);
      if (child.$children) {
        broadcast(child.$children);
      }
    });
  };
  broadcast(this.$children);
};

/*
inheritAttrs: false // 绑定的属性不在dom上显示 ：<div name="xxx"></div> 不显示
v-bind="$attrs"  // 将 $attrs 上所有属性绑定到dom上传递给子组件
v-on="$listeners" // 表示将方法绑定到dom上传递给子组件
*/
```
