---
title: client/offset/scroll
date: 2020-07-20
sidebar: "auto"
tags:
  - client
  - offset
  - scroll
---

## clientHeight/clientWidth

- `clientHeight`：表示的是可视区域的高度，`不包含border和滚动条`
- `clientTop`：表示边框 border 的厚度，在未指定的情况下一般为 0

![client](https://gitee.com/cxyz/imgbed/raw/img/img/client.png)

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

<<< @/utils/libs/client/clientWidthAndHeight.js

- document example

```js
let doc = document.documentElement || document.body;
let { clientHeight, clientWidth } = doc;
console.table({ clientHeight, clientWidth, clientLeft, clientTop });
```

## offsetHeight/offsetWidth

- offsetHeight 和 style.height 的区别: `style.height是字符串,offsetHeight是数值`
- `demo.style.height`是用来获取和设置行内样式的,`offsetHeight`是只读属性
- `demo.style.height`只能获取和设置行内样式,如果样式写到了其他地方,甚至根本就没写,便无法获取.因此,工作中一般用`demo.offsetHeight`来获取某元素的真实宽度/高度,用`style.height`来设置宽度/高度
- `offsetHeight`的构成`offsetHeight = height+padding+border`,`包括 自身高度 内边距 边框 不包括 外边距`
- element example

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

<<< @/utils/libs/client/offsetWidthAndHeight.js

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

<<< @/utils/libs/client/scrollHeight.js

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

<<< @/utils/libs/client/scrollTop.js

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

<<< @/utils/libs/client/getStyle.js

## pageX/pageY

- `以当前文档的左上角为基准点`

<<< @/utils/libs/client/pageXY.js

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

<<< @/utils/libs/client/default.js
