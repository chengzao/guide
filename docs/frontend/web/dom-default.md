---
title: dom.default
date: 2020-07-20
sidebar: "auto"
tags:
  - dom
---

## getComputedStyle

- 访问属性的两种方式: `div.style.width`, 只能得到行内样式
- 另外一种写法: `div.style["width"]` 引号内写属性的名字
- 计算后样式的获取:

```js
// IE678:
// element.currentStyle.属性名 或 element.currentStyle["属性名"]
demo.currentStyle.left;
demo.currentStyle["left"];
```

- 兼容写法

```js
//window.getComputedStyle(element,伪元素)["属性名"]
// 第二个参数：
//    表示指定节点的伪元素（比如:before、:after、:first-line、:first-letter等）
var result = window.getComputedStyle(div, ':before');
// 一般情况下没有伪元素,我们用 null 来替代.
window.getComputedStyle(demo, null)["left"]

function getStyle(obj, attr) {
  if (obj.currentStyle) {
    return obj.currentStyle[attr]; //ie678
  } else {
    return getComputedStyle(obj, null)[attr]; //正常浏览器
  }
}
```

## pageX/pageY

- `以当前文档的左上角为基准点`

```js
var pageY = event.pageY || event.clientY + document.documentElement.scrollTop;

var pageX = event.pageX || event.clientX + document.documentElement.scrollLeft;
```

- example

```js
let doc = document.documentElement || document.body;
doc.addEventListener("click", function(event) {
  var pageY = event.pageY || event.clientY + document.documentElement.scrollTop;
  var pageX =
    event.pageX || event.clientX + document.documentElement.scrollLeft;
  console.log({ pageX, pageY });
});
```

## screenX/screenY

- `当前屏幕的左上角为基准点`

```js
let doc = document.documentElement || document.body;
doc.addEventListener("click", function(event) {
  console.log(event.screenX, event.screenY);
});
```

## screen

```js
// screen object
console.log(screen);
```

## IntersectionObserver

- [IntersectionObserver](http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html)

```js
const options = {
  threshold: 1.0
};
const target = document.querySelector(".target");
const callback = function(entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
  });
};

const observer = new IntersectionObserver(callback, options);
observer.observe(target);
```

## getBoundingClientRect

- example

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
    padding: 10px;
  }
</style>
<div class="client"></div>
<script>
  let client = document.querySelector(".client");
  console.dir(JSON.stringify(client.getBoundingClientRect(), null, 2));
  /*
    {
      "x": 100,
      "y": 100,
      "width": 220,
      "height": 170,
      "top": 100,
      "right": 320,
      "bottom": 270,
      "left": 100
    }
  */
</script>
```

```js
// 网页元素左上角的视口横坐标
Element.getBoundingClientRect().left
// Element.offsetLeft

// 网页元素左上角的视口纵坐标
Element.getBoundingClientRect().top
// Element.offsetTop

// 网页元素左上角的网页横坐标
Element.getBoundingClientRect().left + document.documentElement.scrollLeft
// Element.offsetLeft + document.documentElement.scrollLeft

// 网页元素左上角的网页纵坐标
Element.getBoundingClientRect().top + document.documentElement.scrollTop
// Element.offsetTop + document.documentElement.scrollTop

// 视口高度
window.innerHeight // 包括滚动条
document.documentElement.clientHeight // 不包括滚动条

// 视口宽度
window.innerWidth // 包括滚动条
document.documentElement.clientWidth // 不包括滚动条

window.outerHeight
window.outerWidth
```
