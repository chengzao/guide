---
title: 基本数据类型
date: 2020-05-20
sidebar: "auto"
categories:
  - frontend
---

## 基本数据类型

- [Number](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/Number): 最大数字是 2<sup>53</sup>-1
- [String](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)
- [Boolean](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
- [null](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/null)
- [undefined](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)
- [Symbol](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
- [BigInt](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt): 大于 2<sup>53</sup>的所有数字

## 引用类型

- `Object 、Array 、Function 、Date 、Math 、Regexp 、JSON`

## Boolean布尔

- 类型转换：`!!undefined --> false`
- 布尔类型的值的转换规则

```js
undefined,null,false,0,NaN,""  // 返回 false

// 过滤数组中的这些值
[ (undefined, null, false, 0, NaN, "", "", "hello")].filter(item => item); // ['hello']

typeof null; // 返回 object
type undefined // 返回 undefined
```

- `null`是一个表示“空”的对象，转为数值时为 0
- `undefined`是一个表示”此处无定义”的原始值，转为数值时为`NaN`
- `void 0`

## JavaScript 中的包装类型

```js
typeof new String('abc')  // object
typeof new Object('xxx')  // object
typeof new Boolean(false) // object
```

## 数据类型检测的方式有哪些

- typeof, 可用于基本数据类型判断

```js
typeof [];     // object
typeof {};     // object
typeof null;   // object
```

- instanceof, 只能正确判断引用数据类型，而不能判断基本数据类型

```js
2 instanceof Number;     // false
true instanceof Boolean; // false
'str' instanceof String; // false
```

- constructor, 不能判断 null与undefined, 也不能判断修改原型链后的数据类型

```js
function Fn(){};
// 修改原型链
Fn.prototype = new Array();
var f = new Fn();

f.constructor===Fn;    // false
f.constructor===Array; // true
```

- Object.prototype.toString.call, 使用对象的原型方法 toString 来判断数据类型

## 栈和队列(LIFO/FIFO)

- `栈`数据结构的访问规则是`LIFO(Last-in-First-Out,后进先出)`
- `队列`数据结构的访问规则是`FIFO(First-In-First-Out, 先进先出)`

## script标签async与defer的区别

- [原文：彻底搞懂 async & defer](https://github.com/xiaoyu2er/blog/issues/8)
- 两者都不会阻止 document 的解析
- defer 会在 DOMContentLoaded 前依次执行
- async 则是 onload 下载完立即执行，不一定是在 DOMContentLoaded 前

## script标签module

- [原文](http://houdunren.gitee.io/note/js/13%20%E6%A8%A1%E5%9D%97%E8%AE%BE%E8%AE%A1.html#%E6%A0%87%E7%AD%BE%E4%BD%BF%E7%94%A8)
- 标签使用`<script type="module"></script>`
- 模块路径

```html
<!-- hd.js -->
export let hd = { name: "后盾人" };
<!-- html -->
<script type="module">
  import { hd } from "./hd.js";
</script>
```

- 延迟解析

```html
<body>
  <script type="module">
    console.log(document.querySelector("button")); //Button
  </script>
  <script>
    console.log(document.querySelector("button")); //undefined
  </script>
  <button>后盾人</button>
</body>
```

- 严格模式

```html
<!-- 模块默认运行在严格模式，以下代码没有使用声明语句将报错 -->
<script type="module">
  hd = "houdunren"; // Error
</script>

<script>
  console.log(this); //Window
</script>
<script type="module">
  console.log(this); //undefiend
</script>
```

- 作用域

```html
<!-- 模块都有独立的顶级作用域，下面的模块不能互相访问 -->
<script type="module">
  let hd = "houdunren.com";
</script>

<script type="module">
  alert(hd); // Error
</script>

<!-- 单独文件作用域也是独立的 -->
<script type="module" src="1.1.js"></script>
<script type="module" src="1.2.js"></script>

<!-- # 1.1.js -->
let hd = "houdunren";

<!-- # 1.2.js -->
console.log(hd)
```

- 预解析

```html
<!-- 引入多入hd.js 脚本时只执行一次 -->
<script type="module" src="hd.js"></script>
<script type="module" src="hd.js"></script>

<!-- #hd.js内容如下 -->
console.log("houdunren.com");

<!-- 导入多次 hd.js 时只解析一次 -->
<script type="module">
  import "./hd.js";
  import "./hd.js";
</script>

<!-- # hd.js内容如下 -->
console.log("houdunren.com");
```

## define module

- [原文](http://houdunren.gitee.io/note/js/13%20%E6%A8%A1%E5%9D%97%E8%AE%BE%E8%AE%A1.html#%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86)

```js
let module = (function() {
  //模块列表集合
  const moduleLists = {};
  function define(name, modules, action) {
    modules.map((m, i) => {
      modules[i] = moduleLists[m];
    });
    //执行并保存模块
    moduleLists[name] = action.apply(null, modules);
  }

  return { define };
})();

//声明模块不依赖其它模块
module.define("a", [], function() {
  return {
    show() {
      console.log("A module func");
    }
  };
});

//声明模块时依赖其它模块
module.define("b", ["a"], function(f) {
  f.show();
});
```

## amd-requirejs

- 异步加载模块,依赖前置,提前执行
- define 定义模块`define(['require','foo'],function(){return foo;})`;
- require 加载模块(依赖前置) require(['foo','bar'],function(foo,bar){});

```js
// a.js
define(function() {
  return {
    a: "hello world"
  };
});
// b.js
require(["./a.js"], function(moduleA) {
  console.log(moduleA.a); // 打印出：hello world
});
```

## cmd-seajs

- define 定义 exports 导出 `define(function(require,exports,module){})`;moduel 上存储了当前模块上的一些对象。
- requre(./a)直接导入。require.async 异步导入。
- 同步加载,依赖就近,延迟执行。

```js
// a.js
define(function(require, exports, module) {
  exports.a = "hello world";
});
// b.js
define(function(require, exports, module) {
  var moduleA = require("./a.js");
  console.log(moduleA.a); // 打印出：hello world
});
```

## UMD

- 兼容 AMD 和 commonJS 规范的同时

```js
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    //AMD
    define(["jquery"], factory);
  } else if (typeof exports === "object") {
    //Node, CommonJS之类的
    module.exports = factory(require("jquery"));
  } else {
    //浏览器全局变量(root 即 window)
    root.returnExports = factory(root.jQuery);
  }
})(this, function($) {
  //方法
  function myFunc() {}
  //暴露公共方法
  return myFunc;
});
```

## ES6 module

```js
// a.js
export var m = 1;
export {};
export { n as m };
export default n;

// b.js
import "./a.js";
import * as m from "./a.js";
import { n as v } from "./a.js";
import { n } from "./a.js";
```

## commonJS

```js
module.export = {};

let fn = reqiure("");
```
