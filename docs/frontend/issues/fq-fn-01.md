---
title: 常见手写函数整理（一）
date: 2022-02-16
sidebar: "auto"
tags:
  - function
categories:
  - frontend
---

## 手写typof

```js
function typeOf(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}
typeOf([])        // 'array'
typeOf({})        // 'object'
typeOf(new Date)  // 'date'
```

## 手写instanceof

```js
function instanceOf(l, r) {
  // let proto = l.__proto__;
  let proto = Object.getPrototypeOf(l);
  let prototype = r.prototype
  while (true) {
    if (proto == null) {
      return false
    }
    if (proto == prototype) {
      return true
    }
    proto = Object.getPrototypeOf(proto)
  }
}
```

## 手写Object.create

- [MDN: Object.create Polyfill](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create#polyfill)

```js
if (typeof Object.create !== "function") {
  Object.create = function(proto, propertiesObject) {
    if (typeof proto !== "object" && typeof proto !== "function") {
      throw new TypeError("Object prototype may only be an Object: " + proto);
    } else if (proto === null) {
      throw new Error(
        "This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument."
      );
    }

    if (typeof propertiesObject != "undefined")
      throw new Error(
        "This browser's implementation of Object.create is a shim and doesn't support a second argument."
      );

    function F() {}
    F.prototype = proto;

    return new F();
  };
}
```

## 防抖函数debounce

> [JavaScript 专题之跟着 underscore 学防抖](https://github.com/mqyqingfeng/Blog/issues/22)

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

::: details

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
```

:::

## 节流函数throttle

> [JavaScript 专题之跟着 underscore 学节流](https://github.com/mqyqingfeng/Blog/issues/26)

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

::: details

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

:::

## 手写new函数

> [「2021」高频前端面试题汇总之手写代码篇](https://juejin.cn/post/6946136940164939813#heading-4)

- 首先创建了一个新的空对象
- 设置原型，将对象的原型设置为函数的 prototype 对象。
- 让函数的 this 指向这个对象，执行构造函数的代码
- 判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。

```js
function new() {
  // 1.将 arguments 对象转为数组
  var args = [].slice.call(arguments);
  var result = null
  // 2.取出构造函数
  var constructor = args.shift();
  // 3.判断参数是否是一个函数
  if (typeof constructor !== "function") {
    console.error("type error");
    return;
  }
  // 4.创建一个空对象,继承构造函数的 prototype 属性
  // var context.__proto__ = constructor.prototype;
  var context = Object.create(constructor.prototype);
  // 5.执行构造函数
  var result = constructor.apply(context, args);
  var isObject = (typeof result === "object") && result != null
  // 6.如果返回结果是对象,就直接返回,则返回 context 对象
  return isObject ? result : context;
}
```

## 实现call

- es6写法

```js
Function.prototype._call = function (context) {
  // 判断 context 是否传入，如果未传入则设置为 window
  let context = context || window;
  context.fn = this; // 将调用函数设为对象的方法
  let args = [...arguments].slice(1);
  let result = context.fn(...args);
  delete context.fn;
  return result;
}
```

::: details

- es5写法

```js
Function.prototype.call2 = function (context) {
    var context = context || window;
    context.fn = this;

    var args = [];
    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }

    var result = eval('context.fn(' + args +')');
    delete context.fn
    return result;
}
```

:::

## 实现apply

```js
Function.prototype._apply = function (context) {
  var context = context || window;
  context.fn = this
  let result;
  // 判断是否有第二个参数
  if (arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }
  delete context.fn
  return result
}
```

::: details

- [36个手写题](https://juejin.cn/post/6946022649768181774#heading-28)

```js
Function.prototype.apply2 = function (context, arr) {
    var context = context || window;
    context.fn = this;

    var result;
    if (!arr) {
        result = context.fn();
    } else {
        var args = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')')
    }

    delete context.fn
    return result;
}
```

:::

## 实现bind

```js
Function.prototype._bind = function(context) {
  // 保存原函数
  let func = this;
  // 获取参数
  let params = [].slice.call(arguments, 1);

  let Nop = function() {};

  let bound = function() {
    params = params.concat([].slice.call(arguments, 0));

    return func.apply(this instanceof Nop
           ? this : context, params);
  }

  Nop.prototype = func.prototype;
  bound.prototype = new Nop();

  return bound;
}
```

## 实现浅拷贝shallowCopy

- `Object.assign`
- 扩展运算符(`...`)
- 数组方法实现数组浅拷贝
  - Array.prototype.slice
  - Array.prototype.concat
- 实现浅拷贝shallowCopy

```js
function shallowCopy(obj) {
    if (typeof obj !== 'object') return

    let newObj = obj instanceof Array ? [] : {}
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key]
        }
    }
    return newObj
}
```

## 实现深拷贝deepClone

- `JSON.parse(JSON.stringify(obj))`
- 函数库[lodash](https://lodash.com/)的`_.cloneDeep`方法
- 不考虑内置函数与引用问题

```js
// 深拷贝的实现
function deepCopy(object) {
  if (!object || typeof object !== "object") return;

  let newObject = Array.isArray(object) ? [] : {};

  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      newObject[key] =
        typeof object[key] === "object" ? deepCopy(object[key]) : object[key];
    }
  }

  return newObject;
}
```

- deepClone

```js
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

::: details

- [36 个 JS 手写题](https://juejin.cn/post/6946022649768181774#heading-9)

```js
const isObject = (target) => (typeof target === "object" || typeof target === "function") && target !== null;

function deepClone(target, map = new WeakMap()) {
    if (map.get(target)) {
        return target;
    }
    // 获取当前值的构造函数：获取它的类型
    let constructor = target.constructor;
    // 检测当前对象target是否与正则、日期格式对象匹配
    if (/^(RegExp|Date)$/i.test(constructor.name)) {
        // 创建一个新的特殊对象(正则类/日期类)的实例
        return new constructor(target);
    }
    if (isObject(target)) {
        map.set(target, true);  // 为循环引用的对象做标记
        const cloneTarget = Array.isArray(target) ? [] : {};
        for (let prop in target) {
            if (target.hasOwnProperty(prop)) {
                cloneTarget[prop] = deepClone(target[prop], map);
            }
        }
        return cloneTarget;
    } else {
        return target;
    }
}
```

:::

## 数组flat

- reduce

```js
function flat(arr, depth) {
  if(!Array.isArray(arr) || depth <= 0) {
    return arr;
  }
  return arr.reduce((prev, cur) => {
    if (Array.isArray(cur)) {
      return prev.concat(_flat(cur, depth - 1))
    } else {
      return prev.concat(cur);
    }
  }, []);
}

```

::: details

- es5

```js
function flatten(arr) {
    var result = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        if (Array.isArray(arr[i])) {
            result = result.concat(flatten(arr[i]))
        } else {
            result.push(arr[i])
        }
    }
    return result;
}
```

- [mdn#flat](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat#foreachisarraypushrecursivity)

```js
const eachFlat = (arr = [], depth = 1) => {
  const result = []; // 缓存递归结果
  // 开始递归
  (function flat(arr, depth) {
    // forEach 会自动去除数组空位
    arr.forEach((item) => {
      // 控制递归深度
      if (Array.isArray(item) && depth > 0) {
        // 递归数组
        flat(item, depth - 1)
      } else {
        // 缓存元素
        result.push(item)
      }
    })
  })(arr, depth)
  // 返回递归结果
  return result;
}
```

:::

## 使用setTimeout实现setInterval

- [使用 setTimeout 实现 setInterval](https://juejin.cn/post/6946136940164939813#heading-66)

```js
function mySetInterval(fn, timeout) {
  // 控制器，控制定时器是否继续执行
  var timer = {
    flag: true
  };
  // 设置递归函数，模拟定时器执行
  function interval() {
    if (timer.flag) {
      fn();
      setTimeout(interval, timeout);
    }
  }
  // 启动定时器
  setTimeout(interval, timeout);
  // 返回控制器
  return timer;
}
```

## 实现数组forEach

- forEach

```js
Array.prototype._forEach = function(fn, thisArg) {
    if (typeof fn !== 'function') throw "参数必须为函数";
    if(!Array.isArray(this)) throw "只能对数组使用forEach方法";
    let arr = this;
    for(let i=0; i<arr.length; i++) {
        fn.call(thisArg, arr[i], i, arr)
    }
}
```

::: details

- [MDN array#polyfill](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#polyfill)

```js
Array.prototype._forEach = function(callback, thisArg) {
    if (this == null) {
        throw new TypeError('this is null or not defined')
    }
    if (typeof callback !== "function") {
        throw new TypeError(callback + ' is not a function')
    }
    const O = Object(this)
    const len = O.length >>> 0

    let k = 0, res = []
    while (k < len) {
        if (k in O) {
          res[k] = callback.call(thisArg, O[k], k, O);
        }
        k++;
    }
    return res
}
```

:::

## 实现数组map

- map

```js
Array.prototype.map = function(fn) {
   if (typeof fn !== "function") {
        throw Error('参数必须是一个函数');
    }
    const res = [];
    for (let i = 0, len = this.length; i < len; i++) {
        res.push(fn(this[i]));
    }
    return res;
}
```

::: details

- [MDN array map#polyfill](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map#polyfill)

```js
Array.prototype.map = function(callback, thisArg) {
    if (this == null) {
        throw new TypeError('this is null or not defined')
    }
    if (typeof callback !== "function") {
        throw new TypeError(callback + ' is not a function')
    }
    const O = Object(this)  // this 就是当前的数组
    const len = O.length >>> 0  // 后面有解释
    let k = 0, res = []
    while (k < len) {
        if (k in O) {
          res[k] = callback.call(thisArg, O[k], k, O);
        }
        k++;
    }
    return res
}
```

:::

## 实现数组filter

- filter

```js
Array.prototype._filter = function(fn) {
    if (typeof fn !== "function") {
        throw Error('参数必须是一个函数');
    }
    const res = [];
    for (let i = 0, len = this.length; i < len; i++) {
        fn(this[i]) && res.push(this[i]);
    }
    return res;
}
```

::: details

- [MDN array filter#polyfill](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter#polyfill)

```js
if (!Array.prototype.filter){
  Array.prototype.filter = function(func, thisArg) {
    'use strict';
    if ( ! ((typeof func === 'Function' || typeof func === 'function') && this) )
        throw new TypeError();

    var len = this.length >>> 0,
        res = new Array(len), // preallocate array
        t = this, c = 0, i = -1;
    if (thisArg === undefined){
      while (++i !== len){
        // checks to see if the key was set
        if (i in this){
          if (func(t[i], i, t)){
            res[c++] = t[i];
          }
        }
      }
    }
    else{
      while (++i !== len){
        // checks to see if the key was set
        if (i in this){
          if (func.call(thisArg, t[i], i, t)){
            res[c++] = t[i];
          }
        }
      }
    }

    res.length = c; // shrink down array to proper size
    return res;
  };
}
```

:::

## 实现数组reduce

```js
function mReduce(arr, reduceCallback, initialValue) {
  if (!Array.isArray(arr) || !arr.length || typeof reduceCallback !== 'function'){
    return [];
  } else {
    let hasInitialValue = initialValue !== undefined;
    let value = hasInitialValue ? initialValue : arr[0];
    // 如果有传递 initialValue，则索引从 1 开始，否则从 0 开始
    for (let i = hasInitialValue ? 0 : 1, len = arr.length; i < len; i++) {
      value = reduceCallback(value, arr[i], i, arr);
    }
    return value;
  }
}
```

::: details

- [MDN array reduce#polyfill](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce#polyfill)

```js
Array.prototype.reduce = function(callback, initialValue) {
    if (this == null) {
        throw new TypeError('this is null or not defined')
    }
    if (typeof callback !== "function") {
        throw new TypeError(callback + ' is not a function')
    }
    const O = Object(this)
    const len = O.length >>> 0
    let k = 0, acc

    if (arguments.length > 1) {
        acc = initialValue
    } else {
        // 没传入初始值的时候，取数组中第一个非 empty 的值为初始值
        while (k < len && !(k in O)) {
            k++
        }
        if (k > len) {
            throw new TypeError( 'Reduce of empty array with no initial value' );
        }
        acc = O[k++]
    }
    while (k < len) {
        if (k in O) {
            acc = callback(acc, O[k], k, O)
        }
        k++
    }
    return acc
}
```

:::

## 实现Object.assign

> [36 个 JS 手写题](https://juejin.cn/post/6946022649768181774#heading-33)

```js
Object.assign2 = function(target, ...source) {
    if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object')
    }
    let ret = Object(target)
    source.forEach(function(obj) {
        if (obj != null) {
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    ret[key] = obj[key]
                }
            }
        }
    })
    return ret
}
```

## 柯里化curry

- 逐步接收参数，并缓存供后期计算使用
- 不立即计算，延后执行
- 符合计算的条件，将缓存的参数，统一传递给执行方法
- curry1：判断参数是否满足条件，满足条件执行方法，不满足则缓存参数

```js
function curry(fn) {
  var allArgs = []; // 用来接收参数

  return function next() {
    var args = [].slice.call(arguments);

    // 判断是否执行计算，即最后一个执行函数参数是否为空
    if (args.length > 0) {
      // 收集传入的参数，进行缓存
      allArgs = allArgs.concat(args);
      return next;
    } else {
      // 符合执行条件，执行计算
      return fn.apply(null, allArgs);
    }
  };
}

var add = currying(function() {
  var sum = 0;
  for (var i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
});

console.log(add(10, 2, 3)(4)());
```

- curry2: 判断最后的参数是否与函数需要的参数数量相同，如果相同，则执行计算

```js
function curry(fn) {
    var _args = [];
    return function next() {
      // 将参数收集起来
      [].push.apply(_args, [].slice.call(arguments));
      // 判断是否执行计算
      if (_args.length === fn.length) {
        const args = _args
        _args = []
        return fn.apply(this, args);
      }
      return next;
    }
}
var abc = function(a, b, c) {
  return a + b + c;
};

var curried = curry(abc)
console.log(curried(1)(2)(3))
```

- curry3: 使用toString调用函数

```js
function curry2(fn) {
    var _args = [];

    function next() {
        var args = [].slice.call(arguments);
        _args = _args.concat(args)
        return next;
    }
    // 字符类型
    next.toString = function() {
        return fn.apply(null, _args);
    }
    // 数值类型
    next.valueOf = function() {
        return fn.apply(null, _args);
    }
    return next;

}
var add = curry2(function() {
    var sum = 0;
    for (var i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    return sum;
});

alert(add(1, 2, 3)(4))
```

## 偏函数partial

```js
function partial(fn, ...args) {
  return (...arg) => {
    // 收集参数
    return fn(...args, ...arg)
  }
}
// demo
function add(...args) {
  return args.reduce((a, b) => a + b)
}
let partial_add = partial(add, 1, 2);
console.log(partial_add(3, 4, 5));
```

## 实现字符串的repeat方法

```js
function repeat(s, n) {
  return (new Array(n + 1)).join(s);
}

function repeat(s, n) {
  return (n > 0) ? s.concat(repeat(s, --n)) : "";
}
```

## compose and pipe

- compose

```js
function compose(fns){
  return function(arg){
    return fns.reduceRight((acc, fn) => fn(acc), arg);
  }
}
```

- pipe

```js
function pipe(fns){
  return function(...args){
    return fns.reduce((acc, fn) => {
      return fn(acc)
    })
  }
}
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

## 实现一个 JSON.stringify

- 简单版：支持 obect/array/string/number

```js
function jsonStringify(data) {
  let dataType = typeof data;
  if (dataType !== 'object') { // 判断类型是否为普通类型
    return String(data);
  } else if (dataType === 'object') {
    if (Array.isArray(data)) { // 判断是否是数组
      let result = [];
      data.forEach((item, index) => {
        result[index] = jsonStringify(item);
      });
      result = "[" + result + "]";
      return result.replace(/'/g, '"');
    } else { // 判断是否是对象
      let result = [];
      Object.keys(data).forEach((item, index) => {
        result.push('"' + item + '"' + ":" + jsonStringify(data[item]));
      });
      return ("{" + result + "}").replace(/'/g, '"');
    }
  }
}
```

- 完整请参考[实现 JSON.stringify](https://juejin.cn/post/6946022649768181774#heading-34)

```js
function jsonStringify(data) {
    let dataType = typeof data;
    
    if (dataType !== 'object') {
        let result = data;
        //data 可能是 string/number/null/undefined/boolean
        if (Number.isNaN(data) || data === Infinity) {
            //NaN 和 Infinity 序列化返回 "null"
            result = "null";
        } else if (dataType === 'function' || dataType === 'undefined' || dataType === 'symbol') {
            //function 、undefined 、symbol 序列化返回 undefined
            return undefined;
        } else if (dataType === 'string') {
            result = '"' + data + '"';
        }
        //boolean 返回 String()
        return String(result);
    } else if (dataType === 'object') {
        if (data === null) {
            return "null"
        } else if (data.toJSON && typeof data.toJSON === 'function') {
            return jsonStringify(data.toJSON());
        } else if (data instanceof Array) {
            let result = [];
            //如果是数组
            //toJSON 方法可以存在于原型链中
            data.forEach((item, index) => {
                if (typeof item === 'undefined' || typeof item === 'function' || typeof item === 'symbol') {
                    result[index] = "null";
                } else {
                    result[index] = jsonStringify(item);
                }
            });
            result = "[" + result + "]";
            return result.replace(/'/g, '"');
            
        } else {
            //普通对象
            /**
             * 循环引用抛错(暂未检测，循环引用时，堆栈溢出)
             * symbol key 忽略
             * undefined、函数、symbol 为属性值，被忽略
             */
            let result = [];
            Object.keys(data).forEach((item, index) => {
                if (typeof item !== 'symbol') {
                    //key 如果是symbol对象，忽略
                    if (data[item] !== undefined && typeof data[item] !== 'function'
                        && typeof data[item] !== 'symbol') {
                        //键值如果是 undefined、函数、symbol 为属性值，忽略
                        result.push('"' + item + '"' + ":" + jsonStringify(data[item]));
                    }
                }
            });
            return ("{" + result + "}").replace(/'/g, '"');
        }
    }
}
```

## 实现一个 JSON.parse

- 完整参考[实现 JSON.parse](https://juejin.cn/post/6946022649768181774#heading-35)

```js
// new Function
var jsonStr = '{ "age": 20, "name": "jack" }';
var json = new Function("return " + jsonStr)();
console.log(json);

// eval
var json = '{"a":"1", "b":2}';
var obj = eval("(" + json + ")");  // obj 就是 json 反序列化之后得到的对象
```

