---
title: dom.scroll
date: 2020-07-20
sidebar: "auto"
tags:
  - dom
---

## scrollHeight/scrollWidth

- event `window.onscroll = function () { //code }`

- dom 对象内部实际内容的高度/宽度

```html
<style>
  html,
  body {
    padding: 0;
    margin: 0;
  }
  .client {
    width: 200px;
    height: 150px;
    margin: 100px;
    background-color: pink;
    overflow: auto;
    padding: 10px;
  }
  .box {
    background-color: red;
    width: 300px;
    height: 1000px;
    padding: 50px;
    border: 40px;
  }
</style>
<!-- html -->
<div class="client">
  <div class="box"></div>
</div>
<!-- js -->
<script>
  let dom = document.querySelector(".box");
  let { scrollWidth, scrollHeight } = dom;
  console.table({ scrollWidth, scrollHeight });
  // => 400 , 1100
</script>
```

| scroll       | value | expr                 |
| ------------ | ----- | -------------------- |
| scrollWidth  | 400   | width + padding \* 2 |
| scrollHeight | 1100  | width + padding \*2  |

- document

```js
// 网页内容实际宽高（包括工具栏和滚动条等边线）
var scrollWidth = document.documentElement.scrollWidth || document.body.scrollWidth;
var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
```

```js
// css
html{height: 5000px;width: 2000px;}
// js
let doc = document.documentElement || document.body
let {scrollHeight, scrollWidth} = doc;
console.table({scrollHeight, scrollWidth});
// 5000 , 2000
```

## scrollTop/scrollLeft

- `scrollTop`和`scrollLeft` 被卷去部分的 `顶部/左侧` 到可视区域 `顶部/左侧` 的距离

```js
// 正常浏览器（除了ie678之外的浏览器）
window.pageYOffset
// 已经声明DTD（标准模式）
document.documentElement.scrollTop
// 未声明 DTD（怪异模式）
document.body.scrollTop

//页面滚动座标onscroll
//scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
function scroll() {
  if (window.pageYOffset != null) {
    //正常浏览器
    return {
      top: window.pageYOffset,
      left: window.pageXOffset
    }
  } else if (document.compatMode == "CSS1Compat") {
    //有DTD的网页
    return {
      top: document.documentElement.scrollTop,
      left: document.documentElement.scrollLeft
    }
  } else {
    //没有DTD的
    return {
      top: document.body.scrollTop,
      left: document.body.scrollLeft
    }
  }
}
```

![](https://gitee.com/cxyz/imgbed/raw/img/img/dom-scroll.png)

- document example

```js
let doc = document.documentElement || document.body;
window.addEventListener("scroll", function() {
  let { scrollTop, scrollLeft } = doc;
  console.table({ scrollTop, scrollLeft });
});
```

- dom example

```html
<style>
  html,
  body {
    padding: 0;
    margin: 0;
  }
  .client {
    width: 200px;
    height: 150px;
    margin: 100px;
    background-color: pink;
    overflow: auto;
    padding: 10px;
  }
  .box {
    background-color: red;
    width: 300px;
    height: 1000px;
    padding: 50px;
    border: 40px;
  }
</style>
<div class="client">
  <div class="box"></div>
</div>
<script>
  let client = document.querySelector(".client");
  client.addEventListener("scroll", function() {
    let { scrollWidth, scrollHeight, scrollTop, scrollLeft } = client;
    console.table({
      scrollWidth,
      scrollHeight,
      scrollTop,
      scrollLeft
    });
  });
</script>
```

- 页面滚动座标: `window.scrollTo(xpos,ypos)`窗体（左上角）滚动到页面这个座标`position`
