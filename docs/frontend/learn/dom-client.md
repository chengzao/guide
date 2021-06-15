---
title: dom.client
date: 2020-07-20
sidebar: "auto"
tags:
  - dom
categories:
  - frontend
---

## clientHeight/clientWidth

- `clientHeight`：表示的是可视区域的高度，`不包含border和滚动条`
- `clientTop`：表示边框 border 的厚度，在未指定的情况下一般为 0

![client](https://cdn.jsdelivr.net/gh/chengzao/imgbed@main/images/client.png)

- element example

```html
<!-- css -->
.client{ width: 200px; height: 150px; border: 10px solid #cccccc; margin: 50px;
padding: 30px; background-color: aqua; }
<!-- dom -->
<div class="client"></div>
<!-- js -->
let dom = document.querySelector(".client"); let {clientHeight, clientWidth,
clientLeft, clientTop} = dom;
console.table({clientHeight,clientWidth,clientLeft,clientTop});
```

| dom client   | value | expr                 |
| ------------ | ----- | -------------------- |
| clientWidth  | 260   | width + 2\* padding  |
| clientHeight | 210   | height + 2\* padding |
| clientLeft   | 10    | border               |
| clientTop    | 10    | boder                |

- document 兼容写法

```js
// 正常浏览器（包括IE9+）
window.innerWidth
// 标准模式
document.documentElement.clientWidth
// 怪异模式
document.body.clientWidth

// client 兼容写法
function client() {
  if (window.innerWidth != null) {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
    // document.compatMode 用来判断当前浏览器采用的渲染方式
  } else if (document.compatMode == "CSS1Compat") {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    }
  } else {
    return {
      width: document.body.clientWidth,
      height: document.body.clientHeight
    }
  }
}
```

- document example

```js
let doc = document.documentElement || document.body;
let { clientHeight, clientWidth } = doc;
console.table({ clientHeight, clientWidth, clientLeft, clientTop });
```
