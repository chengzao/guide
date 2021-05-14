---
title: 浏览器Element标签
date: 2020-07-20
sidebar: "auto"
tags:
  - element
---

:::tip

[MDN/Element](https://developer.mozilla.org/zh-CN/docs/Web/API/Element)

:::

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

### Node.normalize

- `Node.normalize()`用于清理当前节点内部的所有`Text`节点
- 它会去除空的文本节点(并且将毗邻的文本节点合并成一个

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

### 属性的操作

- `Element.attributes` 返回一个类似数组的动态对象
- 属性节点对象有`name`和`value`属性;对应该属性的属性名和属性值;等同于`nodeName`属性和`nodeValue`属性

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

### ParentNode

- `HTMLCollection`节点的集合(返回一个类似数组的对象
- `children`属性返回一个动态的`HTMLCollection`集合,由当前节点的所有 Element 子节点组成
- `firstElementChild`属性返回当前节点的第一个 Element 子节点,如果不存在任何 Element 子节点,则返回`null`
- `lastElementChild`属性返回当前节点的最后一个 Element 子节点,如果不存在任何 Element 子节点,则返回`null`
- `childElementCount`属性返回当前节点的所有 Element 子节点的数目

### ChildNode

- `remove`方法用于移除当前节点
- `before`方法用于在当前节点的前面,插入一个同级节点
- `after`方法用于在当前节点的后面,插入一个同级节点
- `replaceWith`方法使用参数指定的节点,替换当前节点

## DOM 事件

- `Element.addEventListener()`：添加事件的回调函数
- `Element.removeEventListener()`：移除事件监听函数
- `Element.dispatchEvent()`：触发事件

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



## 兼容节点


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
