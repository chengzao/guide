---
title: BOM与DOM事件
date: 2021-07-20
sidebar: "auto"
tags:
  - element
categories:
  - frontend
---

:::tip

[MDN/Element](https://developer.mozilla.org/zh-CN/docs/Web/API/Element)

:::

## 浏览器内核

```bash
safari    Webkit
chrome    Blink (current) / Webkit (pre)   -webkit-
chromium  Blink
firefox   Gecko   -moz-
ie        Trident -ms-
edge      EdgeHTML
Opera12.17及更早版本曾经采用的内核  Presto  -o-
```

## 文档基本结构

```js
document.head; // 文档的头标签
typeof document.head; // object

document.title; // 文档标题
typeof document.title; // string

document.body; // 文档的body标签
typeof document.body; // object

document.documentElement; // 文档的根节点 注意：没有document.html这个东西
typeof document.documentElement; // object

document.html; // 这个是错的!!!

document.defaultView === window; // true
document.activeElement; // 属性返回当前文档中获得焦点的那个元素
document.defaultView;
```

## 文档兼容模式

- `document type`声明文档类型 DTD：`<!DOCTYPE html>`
- `BackCompat` 未声明 DTD(怪异模式)firefox
- `CSS1Compat` 已经声明 DTD(标准模式)chrome ,ie
- `document.compatMode` 获取文档类型

## document

### 节点集合属性

- `document.links`属性返回当前文档所有设定了 href 属性的 a 及 area 元素
- `document.images`属性返回页面所有图片元素(即 img 标签)
- `document.scripts`属性返回当前文档的所有脚本(即 script 标签)
- `document.styleSheets`属性返回一个类似数组的对象,代表当前网页的所有样式表

### 文档信息属性

- `document.documentURI`属性和`document.URL`属性都返回一个字符串,表示当前文档的网址
- `documentURI`属性可用于所有文档(包括 XML 文档),URL 属性只能用于 HTML 文档
- `document.domain`属性返回当前文档的域名
- `document.lastModified`属性返回当前文档最后修改的时间戳,格式为字符串
- `document.title`属性返回当前文档的标题,该属性是可写的
- `document.referrer`

- `document.characterSet`属性返回渲染当前文档的字符集 //UTF-8
- `document.readyState`属性返回当前文档的状态

- **三种可能的值:**

  - `loading`：加载 HTML 代码阶段(尚未完成解析)
  - `interactive`：加载外部资源阶段时
  - `complete`：加载完成时

- `document.designMode`属性控制当前文档是否可编辑
- `document.implementation`属性返回一个对象,用来甄别当前环境部署了哪些 DOM 相关接口
- `implementation`属性的`hasFeature`方法,可以判断当前环境是否部署了特定版本的特定接口

```js
document.implementation.hasFeature("HTML", "2.0"); // true

document.implementation.hasFeature("MutationEvents", "2.0"); // true
```

- `document.cookie`属性用来操作浏览器 Cookie

## 类型

- `Document`：整个文档树的顶层节点
- `DocumentType`：doctype 标签(比如`<!DOCTYPE html>`)
- `Element`：网页的各种 HTML 标签(比如`<body>、<a>`等)
- `Attribute`：网页元素的属性(比如`class="right"`)
- `Text`：标签之间或标签包含的文本
- `Comment`：注释
- `DocumentFragment`：文档的片段

## 获取 DOM 元素

- 获取节点

```js
document.querySelector("#demo"); //只返回匹配的第一个元素dom  html5

document.querySelectorAll(".test"); // html5

// 通过id号来获取元素，返回一个元素对象
document.getElementById(idName)

// 通过name属性获取id号，返回元素对象数组
document.getElementsByName(name)

// 通过class来获取元素，返回元素对象数组
document.getElementsByClassName(className)

// 通过标签名获取元素，返回元素对象数组
document.getElementsByTagName(tagName)
```

- 获取/设置元素的属性值

```js
// 括号传入属性名，返回对应属性的属性值
element.getAttribute(attributeName)

// 传入属性名及设置的值
element.setAttribute(attributeName,attributeValue)
```

- 创建节点Node

```js
// 创建一个html元素，这里以创建h3元素为例
document.createElement("h3")

// 创建一个文本节点；
document.createTextNode(String);

// 创建一个属性节点，这里以创建class属性为例
document.createAttribute("class");
```

- 增添节点

```js
// 往element内部最后面添加一个节点，参数是节点类型
element.appendChild(Node);

// 在element内部的中在existingNode前面插入newNode
elelment.insertBefore(newNode,existingNode);

// insertAdjacentHTML: (beforebegin | afterbegin | beforeend | afterend)
element.insertAdjacentHTML(position, text)
```

- 删除节点

```js
//删除当前节点下指定的子节点，删除成功返回该被删除的节点，否则返回null
element.removeChild(Node)

```

## DOM常用属性

- 获取当前元素的父节点

```js
// 返回当前元素的父节点对象
element.parentNode
```

- 获取当前元素的子节点

```js
// 返回当前元素所有子元素节点对象，只返回HTML节点
element.chlidren

// 返回当前元素多有子节点，包括文本，HTML，属性节点。（回车也会当做一个节点）
element.chilidNodes

// 返回当前元素的第一个子节点对象
element.firstChild

// 返回当前元素的最后一个子节点对象
element.lastChild
```

- 获取当前元素的同级元素

```js
// 返回当前元素的下一个同级元素 没有就返回null
element.nextSibling

// 返回当前元素上一个同级元素 没有就返回 null
element.previousSibling
```

- 获取当前元素的文本

```js
// 返回元素的所有文本，包括html代码
element.innerHTML

// 返回当前元素的自身及子代所有文本值，只是文本内容，不包括html代码
element.innerText
```

- 获取当前节点的节点类型

| 类型                   | nodeName             | nodeType |
| ---------------------- | -------------------- | :------: |
| ELEMENT_NODE           | 大写的 HTML 元素名   |    1     |
| ATTRIBUTE_NODE         | `Attr.name`          |    2     |
| TEXT_NODE              | `#text`              |    3     |
| COMMENT_NODE           | `#comment`           |    8     |
| DOCUMENT_NODE          | `#document`          |    9     |
| DOCUMENT_TYPE_NODE     | `DocumentType.name`  |    10    |
| DOCUMENT_FRAGMENT_NODE | `#document-fragment` |    11    |

```js
document.nodeName; // "#document"
document.nodeType; // 9
document.querySelector("a").nodeType === 1; // true
document.querySelector("a").nodeType === Node.ELEMENT_NODE; // true
```

- 设置样式

```js
// 设置元素的样式时使用style
element.style.color="#eea";
```

## 节点对象属性

### Node.nodeValue

- `返回一个字符串,表示当前节点本身的文本值,该属性可读写`

### Node.textContent

- `返回当前节点和它的所有后代节点的文本内容`
- `自动忽略当前节点内部的HTML标签,返回所有文本内容`

### Node.sibling 与 Node.previousSibling

- `Node.nextSibling属性返回紧跟在当前节点后面的第一个同级节点`
- `Node.previousSibling属性返回当前节点前面的、距离最近的一个同级节点`
- `nextSibling` ：IE678 (下一个兄弟节点)
- 在谷歌火狐中也有这个方法,只不过是得到换行.
- `nextElementSibling` ：火狐谷歌 IE9-11 (下一个兄弟节点)
- 兼容写法：`b.nextElementSibling || b.nextSibling`



```js
<div class="box"></div>
<div class="box" id="box"></div>
<div class="box"></div>
//1.获取id名为box的盒子.
var b = document.getElementById("box");
//2.通过兄弟节点的方式获得下盒子
var n = b.nextElementSibling || b.nextSibling;
//3.更改背景色
n.style.backgroundColor = "purple";
```



- `previousSibling` ：IE678 (上一个兄弟节点)
- 在谷歌火狐中也有这个方法,只不过是得到换行.
- `previousElementSibling` ：火狐谷歌 IE9-11 (上一个兄弟节点)
- 兼容写法：`b.previousElementSibling || b.previousSibling`



```js
//1.获取id名为box的盒子.
var b = document.getElementById("box");
//2.兄弟节点的方式获得上盒子
var m = b.previousElementSibling || b.previousSibling;
//3.更改背景色
m.style.backgroundColor = "purple";

// 获取所有的兄弟节点
function siblings(elm) {
  var a = [];
  var p = elm.parentNode.children;
  for (var i = 0, pl = p.length; i < pl; i++) {
    if (p[i] !== elm) {
      a.push(p[i]);
    }
    return a;
  }
}
```

### Node.parentNode

- `返回当前节点的父节点`
- 只可能是三种类型：`element、 document和documentfragment`

```js
//从父节点移除指定节点
if (node.parentNode) {
  node.parentNode.removeChild(node);
}
```

### Node.parentElement

- 返回当前节点的父 Element 节点
- 如果当前节点没有父节点,或者父节点类型不是 Element 节点,则返回`null`

```js
//设置指定节点的父Element节点的CSS属性
if (node.parentElement) {
  node.parentElement.style.color = "red";
}
```

### Node.childNodes

- `火狐谷歌 IE9-11 (所有子节点)`
- `nodeType` 每一个标签都一个这个属性(有个三个值)
- `nodeType == 1` 表示的是元素节点
- `nodeType == 2` 表示是属性节点
- `nodeType == 3` 是文本节点

```html
<div id="box">
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
</div>
<script>
  //1.获取父盒子
  var b = document.getElementById("box");
  //2.通过父盒子获取所有子盒子
  var bcArr = b.childNodes;
  var arr = [];
  //for循环遍历得到的所有自盒子数组
  for (var i = 0; i < bcArr.length; i++) {
    //如果自盒子的nodeType的值 == 1 ,说明他的是元素节点(标签)
    if (bcArr[i].nodeType == 1) {
      //把这个标签放入arr 这个数组.
      arr.push(bcArr[i]);
    }
  }
  //3.打印长度.()
  console.log(bcArr);
  console.log(bcArr.length);
  console.log(arr);
  console.log(arr.length);
</script>
```

### Node.firstChild 与 Node.lastChild

- `firstChild属性返回当前节点的第一个子节点,如果当前节点没有子节点,则返回null`
- `Node.lastChild属性返回当前节点的最后一个子节点,如果当前节点没有子节点,则返回null`
- `firstChild` ：IE678 (第一个子节点)
- 在谷歌火狐中也有这个方法,只不过是得到第一个换行.
- `firstElementChild` ：火狐谷歌 IE9-11 (第一个子节点)
- 兼容写法：`b.firstElementChild || b.firstChild`

```html
<div id="box">
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
</div>
<script>
  //1.获取父盒子
  var b = document.getElementById("box");
  //2.通过父盒子获取第一个子盒子
  var fc = b.firstElementChild || b.firstChild;
  //3.更改背景色.
  fc.style.backgroundColor = "purple";
</script>
```

- `lastChild` ：IE678 (最后一个子节点)
- 在谷歌火狐中也有这个方法,只不过是得到最后一个换行.
- `lastElementChild` ：火狐谷歌 IE9-11 (最后一个子节点)
- 兼容写法：`b.lastElementChild || b.lastChild`

```js
//1.获取父盒子
var b = document.getElementById("box");
//2.通过父盒子获取最后一个子盒子
var lc = b.lastElementChild || b.lastChild;
//3.更改背景色.
lc.style.backgroundColor = "purple";
```

### children

- 在 IE678 中注释会被当做节点.解决方法：`注释写到父节点外部`

```html
<div id="box">
  <div class="box"></div>
  <div class="box"></div>
  <!--这个是第三个盒子-->
  <div class="box"></div>
</div>
<script>
  //1.获取父盒子
  var b = document.getElementById("box");
  //2.通过父盒子获取所有子盒子
  var bcArr = b.children;
  //3.打印长度
  console.log(bcArr);
  console.log(bcArr.length);
</script>
```

## DOM 节点对象的方法

### createElement

- `newNode = document.createElement(“标签名”)`

```js
// 创建一个html元素，这里以创建h3元素为例
document.createElement("h3")

// 创建一个文本节点；
document.createTextNode(String);

// 创建一个属性节点，这里以创建class属性为例
document.createAttribute("class");

//demo
newel = document.createElement("h1");
newel.innerHTML = "<p>hello</p>"; //innerText不能转换HTML标签
document.body.appendChild(newel);
//demo2
newtext = document.createTextNode("hello world");
document.body.appendChild(newtext);
```

## 节点的添加

### appendChild

- `Node.appendChild()`:接受一个节点对象作为参数,将其作为`最后一个子节点`,插入当前节点

```js
// 往element内部最后面添加一个节点，参数是节点类型
element.appendChild(Node);

// 在element内部的中在existingNode前面插入newNode
elelment.insertBefore(newNode,existingNode);

```

### hasChildNodes

- `Node.hasChildNodes()`:返回一个布尔值,表示当前节点是否有子节点

```js
function DOMComb(parent, callback) {
  if (parent.hasChildNodes()) {
    for (var node = parent.firstChild; node; node = node.nextSibling) {
      DOMComb(node, callback);
    }
  }
  callback.call(parent);
}
```



### insertBefore

- `insertBefore(a,b)`用于将某个节点插入当前节点的指定位置
- 该方法接受 2 个参数,第一个是`要插入的节点`,第二个是`参照节点`
- `parentNode.insertBefore(newNode,targetNode)；`

```js
// 往element内部最后面添加一个节点，参数是节点类型
element.appendChild(Node);

// 在element内部的中在existingNode前面插入newNode
elelment.insertBefore(newNode,existingNode);

```

### insertAdjacentHTML

- `Element.insertAdjacentHTML方法解析HTML字符串;然后将生成的节点插入DOM树的指定位置`
  - `element.insertAdjacentHTML(position, text);`第一个是指定位置;第二个是待解析的字符串
  - `beforebegin`：插入到指定元素前面

  ```js
  // <div id="parent"></div>
  let parent = document.getElementById('parent');
  let node = document.createElement('span');
  // 等价于 $(parent).after(node);
  parent.insertAdjacentElement('beforebegin', node);
  ```

  - `afterbegin`：插入到指定元素内部的头部

  ```js
  // <div id="parent"></div>
  let parent = document.getElementById('parent');
  let node = document.createElement('span');
  // 等价于 $(parent).prepend(node);
  parent.insertAdjacentElement('afterbegin', node);
  ```

  - `beforeend`：插入到指定元素内部的尾部

  ```js
  // <div id="parent"></div>
  let parent = document.getElementById('parent');
  let node = document.createElement('span');
  // 等价于 $(parent).append(node);
  parent.insertAdjacentElement('beforeend', node);
  ```

  - `afterend`：插入到指定元素后面

  ```js
  // <div id="parent"></div>
  let parent = document.getElementById('parent');
  let node = document.createElement('span');
  // 等价于 $(parent).after(node);
  parent.insertAdjacentElement('afterend', node);
  ```

- `Element.remove方法用于将当前元素节点从DOM树删除`
- `Element.focus方法用于将当前页面的焦点`

### cloneNode

- `cloneNode(参数) ；booblean类型的参数.`
- `newNode = oldNode.cloneNode(boolean) ;`用于复制节点, 接受一个布尔值参数
  - `true` 表示深复制(复制节点及其所有子节点),
  - `false` 表示浅复制(复制节点本身,不复制子节点

```html
<div id="box">
  <div id="box1">
    <div>1</div>
    <div>2</div>
  </div>
</div>
<script>
  var box = document.getElementById("box");
  var box1 = document.getElementById("box1");
  var newBox = box1.cloneNode(true);
  // var newBox = box1.cloneNode(false);
  box.appendChild(newBox);
</script>
```

### removeChild

- `parentNode.removeChild(childNode)`
- `currentNode.parentNode.removeChild(currentNode)` 不知道父级的情况下移除自身 Node

```html
<div id="box">
  <div id="box1"></div>
  <div id="box2"></div>
</div>
<script>
  var box = document.getElementById("box");
  var box1 = document.getElementById("box1");
  var box2 = document.getElementById("box2");
  box.removeChild(box2);
  box1.parentNode.removeChild(box1);
</script>
```

### replaceChild

- 用于将一个新的节点(替换当前节点的某一个子节点
- `replacedNode = parentNode.replaceChild(newChild, oldChild);`

### Node.contains

- 一个节点作为参数(返回一个布尔值(表示参数节点是否为当前节点的后代节点
- `nodeA.contains(nodeB)`

```js
// 判断元素是否body元素且是否是body的子孙元素.
function isInPage(node) {
  return (node === document.body) ? false : document.body.contains(node);
}
```

### isEqualNode

- 返回一个布尔值,用于检查两个节点是否相等
- 所谓相等的节点,指的是两个节点的类型相同、属性相同、子节点相同
- `nodeA.isEqualNode(nodeB)`

### 节点的属性

- `Element.getAttribute` 返回当前元素节点的指定属性.如果指定属性不存在;则返回`null`
- `Element.setAttribute` 用于为当前元素节点新增属性.如果同名属性已存在;则相当于编辑已存在的属性
- `Element.hasAttribute` 返回一个布尔值;表示当前元素节点是否包含指定属性
- `Element.removeAttribute` 用于从当前元素节点移除属性

```js
<img id="pic" width="100px" height="100px" />;
//1.获取节点.
var pic = document.getElementById("pic");
//2.修改属性.
pic.setAttribute("width", "500px");
var a = pic.getAttribute("height");
//3.删除属性
pic.removeAttribute("height");
```

### dataset 属性

- `data-`后面的属性名有限制;`只能包含字母、数字、连词线(-)、点(.)、冒号(:)和下划线(_)`
- 属性名不应该使用 A 到 Z 的大写字母;比如不能有`data-helloWorld`这样的属性名;而要写成`data-hello-world`

```js
// html
<div id="mydiv" foo="bar"></div>
// js
var n = document.getElementById('mydiv');
n.getAttribute('foo') // bar
n.setAttribute('foo', 'baz')
n.removeAttribute('baz')

// html
<div id="mydiv2" data-foo="bar"></div>
// js
var n2 = document.getElementById('mydiv2');
n2.dataset.foo // bar
n2.dataset.foo = 'baz'
delete n2.dataset.foo;
```

## DocumentFragment

DocumentFragment 节点代表一个文档的片段，本身就是一个完整的 DOM 树形结构。
它没有父节点，parentNode 返回 null，但是可以插入任意数量的子节点。
它不属于当前文档，操作 DocumentFragment 节点，要比直接操作 DOM 树快得多

```js
//var docFrag = document.createDocumentFragment();
// or
var docFrag = new DocumentFragment();

var li = document.createElement("li");
li.textContent = "Hello World";
docFrag.appendChild(li);
console.log(docFrag.textContent); //Hello World
document.querySelector("ul").appendChild(docFrag);
console.log(docFrag.textContent); // ''
```

## Element.Node兼容

- 获取下一个紧邻的兄弟元素

```js
// 获取下一个紧邻的兄弟元素
function getNextElement(element) {
  var ele = element;
  if (ele.nextElementSibling) return ele.nextElementSibling;
  do {
    ele = ele.nextSibling;
  } while (ele && ele.nodeType !== 1);
  return ele;
}
```

- 获取上一个紧邻的兄弟元素

```js
// 获取上一个紧邻的兄弟元素
function getPreviousElement(element) {
  var ele = element;
  if (ele.perviousElementSibling) return ele.perviousElementSibling;
  do {
    ele = ele.perviousSibling;
  } while (ele && ele.nodeType !== 1);
  return ele;
}
```

- 获取第一个子元素

```js
// 获取第一个子元素
function getFirstElement(parent) {
  if (parent.firstElementChild) return parent.firstElementChild;
  var ele = parent.firstChild;
  while (ele && ele.nodeType !== 1) ele = ele.nextSibling;
  return ele;
}
```

- 获取最后一个子元素

```js
// 获取最后一个子元素
function getLastElement(parent) {
  if (parent.LastElementChild) return parent.LastElementChild;
  var ele = parent.lastChild;
  while (ele && ele.nodeType !== 1) ele = ele.perviousSibling;
  return ele;
}
```

- 取所有兄弟元素

```js
// 获取所有兄弟元素
function getAllSibling(ele) {
  if (!ele) return null;
  var elements = [];
  var el = ele.previousSibling;
  while (el) {
    if (el.nodeType === 1)
      elements.push(el);
    el = el.previousSibling;
  }
  el = element.nextSibling;
  while (el) {
    if (el.nodeType === 1)
      elements.push(el);
    el = el.nextSibling;
  }
  return elements;
}

// 查找所有兄弟节点
function siblings(elm) {
  var a = [];
  var p = elm.parentNode.children;
  for (var i = 0, pl = p.length; i < pl; i++) {
    if (p[i] !== elm) {
      a.push(p[i]);
    }
    return a;
  }
}
```

## BFC

- Block Formatting Context 块级格式化上下文,形成独立渲染区域
- [前端精选文摘：BFC 神奇背后的原理](http://www.cnblogs.com/lhb25/p/inside-block-formatting-ontext.html)

### 如何触发 BFC

- 根元素 : 在块格式化上下文中
- float的值不为none
- position为absolute或fixed
- display的值为 inline-block, flex, inline-flex，table，table-cell，table-caption中的其中一个
- overflow的值不为visible

## Flex

> <https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html>

- flex-direction: row | row-reverse | column | column-reverse; 属性决定主轴的方向, 默认row
- flex-wrap: nowrap | wrap | wrap-reverse;
- flex-flow: flex-direction || flex-wrap;
- justify-content: flex-start | flex-end | center | space-between | space-around; 属性定义了项目在主轴上的对齐方式
- align-items: flex-start | flex-end | center | baseline | stretch; 属性定义项目在交叉轴上如何对齐
- flex :flex-grow flex-shrink flex-basis

```
flex: auto (1 1 auto) 和 none (0 0 auto)

flex-grow 属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大
flex-shrink 属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小
flex-basis 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）
```

## position 定位

- [MDN/position](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position)
- 静态定位(标准流) : `position:static`

- 绝对定位 ：`position：absolute`
  - 绝对定位的盒子不占页面上的位置（脱离标准流）
  - 绝对定位以后会影响元素的显示方式：display：inline-block

- 相对定位 ：`position:relative`
  - 相对定位是占据标准流的位置
  - 相对自身的位置进行定位

- 固定定位 ： `position:fixed;`
  - 使用盒子显示浏览器的固定位置
  - 固定定位会脱离标准流
  - 固定定位会改变元素的显示方式

- 粘性定位元素 ：`position:stickily`
- z-index：用来设置当前盒子所在的层次 `z-index：12；`


### 盒子模型分类

- IE 盒子模型: `IE的content部分包含了 border 和 padding;`

  ![ie_boxModel](https://cdn.jsdelivr.net/gh/chengzao/imgbed@main/images/ie_boxModel.jpg)

- 标准 W3C 盒子模型

  - `width：border-left + padding-left + width + padding-right + border-right`
  - `height: border-top + padding-top + height + padding-bottom + border-bottom`

  ![_boxModel](https://cdn.jsdelivr.net/gh/chengzao/imgbed@main/images/_boxModel.jpg)

### css3 盒模型属性

- `box-sizing: border-box`: 计算方式为 `width = border + padding + content`
- `box-sizing: content-box`: 计算方式为 `width = content`

  ![boxModel](https://cdn.jsdelivr.net/gh/chengzao/imgbed@main/images/boxModel.png)
