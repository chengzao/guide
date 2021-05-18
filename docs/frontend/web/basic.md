---
title: 基本数据类型
date: 2020-07-20
sidebar: "auto"
---

## 基本数据类型

- `number`: 最大数字是 2<sup>25</sup>-1
- `string`
- `boolean`
- `null`
- `undefined`
- `Symbol`
- `BigInt`: 大于等于 2<sup>25</sup>的所有数字

## 引用类型

- `Object 、Array 、Function 、Date 、Math 、Regexp 、JSON`

## Boolean 布尔

- 类型转换：`!!undefined --> false`
- 布尔转换

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

## 栈和队列(LIFO/FIFO)

- `栈`数据结构的访问规则是`LIFO(Last-in-First-Out,后进先出)`
- `队列`数据结构的访问规则是`FIFO(First-In-First-Out, 先进先出)`

## javascript tag async & defer

- [原文：彻底搞懂 async & defer](https://github.com/xiaoyu2er/blog/issues/8)
- 两者都不会阻止 document 的解析
- defer 会在 DOMContentLoaded 前依次执行
- async 则是 onload 下载完立即执行，不一定是在 DOMContentLoaded 前

## javascript tag module

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
