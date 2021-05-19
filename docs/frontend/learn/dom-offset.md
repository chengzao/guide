---
title: dom.offset
date: 2020-07-20
sidebar: "auto"
tags:
  - dom
categories:
  - frontend
---

## offsetHeight/offsetWidth

- offsetHeight 和 style.height 的区别: `style.height是字符串,offsetHeight是数值`
- `demo.style.height`是用来获取和设置行内样式的,`offsetHeight`是只读属性
- `demo.style.height`只能获取和设置行内样式
- `offsetHeight = height+padding+border`,`包括 自身高度 内边距 边框 不包括 外边距`
- example

```html
<!-- css -->
html,body{padding:0;margin:0} .client{ width: 200px; height: 150px; border: 10px
solid #cccccc; margin: 50px; padding: 30px; background-color: aqua; }
<!-- dom -->
<div class="client"></div>
<!-- js -->
let dom = document.querySelector(".client"); let {offsetWidth, offsetHeight,
offsetLeft, offsetTop} = dom; console.table({offsetWidth, offsetHeight,
offsetLeft, offsetTop});
```

| offset       | value | expr                            |
| ------------ | ----- | ------------------------------- |
| offsetWidth  | 280   | width + 2* padding + 2* border  |
| offsetHeight | 230   | height + 2* padding + 2* border |
| offsetLeft   | 50    | margin                          |
| offsetTop    | 50    | margin                          |

- 兼容写法

```js
// 网页内容实际宽高 (不包括工具栏和滚动条等边线）
var offsetWidth = document.documentElement.offsetWidth || document.body.offsetWidth;
var offsetHeight = document.documentElement.offsetHeight || document.body.offsetHeight;
```

- document example

```js
// css
html{height: 500px;width: 1000px;border: 1px solid red;}
// js
let doc = document.documentElement || document.body
let {offsetWidth , offsetHeight} = doc;
console.table({offsetWidth, offsetHeight}); // 1002 502
```

## offsetLeft/offsetTop

- `offsetLeft`和`style.left`的区别:
  - 最大区别在于`offsetLeft`可以计算没有定位的盒子到左侧的距离,而`style.left`可能会出问题
  - 如果没有给 HTML 元素指定 left 样式,则`style.left`返回的是空字符串.
  - `offsetLeft`只读,而`style.left`可读写.
  - `offsetLeft`返回的是数字,而`style.left`返回的是字符串,除了数字外还带有单位：`px`.
- `offsetLeft`的构成:

  - 到最近的（带有定位的）父元素的 左侧/顶部 的距离
  - 如果所有父级都没有定位则以 body 为准
  - `offsetLeft` 是到父亲的`padding`左侧的距离（不是`border`更不是`margin`）

- example

```html
<!-- css -->
html,body{padding:0;margin:0} .client { width: 200px; height: 150px; margin:
100px; background-color: pink; /* position: relative; */ } .box{
background-color: red; width: 100px; height: 100px; }
<!-- html -->
<div class="client">
  <div class="box"></div>
</div>
<!-- js -->
let dom = document.querySelector(".box"); let {offsetLeft, offsetTop} = dom;
console.table({ offsetLeft, offsetTop });
```

- 父级无定位

| offset     | value | expr   |
| ---------- | ----- | ------ |
| offsetLeft | 100   | margin |
| offsetTop  | 100   | margin |

![](https://gitee.com/cxyz/imgbed/raw/img/img/dom-offsetLeft.png)

- 父级有定位

| offset     | value | expr   |
| ---------- | ----- | ------ |
| offsetLeft | 100   | margin |
| offsetTop  | 100   | margin |

![](https://gitee.com/cxyz/imgbed/raw/img/img/dom-offsetleft2.png)

- offset img

![](https://gitee.com/cxyz/imgbed/raw/img/img/dom-offset.png)
