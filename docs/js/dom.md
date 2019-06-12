# 节点

## 类型

- `Document`：整个文档树的顶层节点
- `DocumentType`：doctype标签(比如`<!DOCTYPE html>`)
- `Element`：网页的各种HTML标签(比如`<body>、<a>`等)
- `Attribute`：网页元素的属性(比如`class="right"`)
- `Text`：标签之间或标签包含的文本
- `Comment`：注释
- `DocumentFragment`：文档的片段

## 节点树

- 父节点关系(`parentNode`)：直接的那个上级节点
- 子节点关系(`childNodes`)：直接的下级节点
- 同级节点关系(`sibling`)：拥有同一个父节点的节点

## 获取DOM元素

<CodeBlock>

```js
document.getElementById('demo'); // 返回单个标签dom
document.getElementsByClassName('test'); //返回多个dom 在 IE 5,6,7,8 中无效
document.getElementsByTagName('div');   // 返回多个dom
document.querySelector('#demo');   //只返回匹配的第一个元素dom  html5
document.querySelectorAll('.test'); // html5
```

</CodeBlock>

## 节点对象属性

### Node.nodeName与Node.nodeType

- `nodeName属性返回节点的名称`
- `nodeType属性返回节点类型的常数值`

| 类型 | nodeName | nodeType |
| ------ | ------ | :------: |
| ELEMENT_NODE | 大写的HTML元素名 | 1 |
| ATTRIBUTE_NODE |`Attr.name` | 2 |
| TEXT_NODE | `#text` | 3 |
| COMMENT_NODE | `#comment` | 8 |
| DOCUMENT_NODE | `#document` | 9 |
| DOCUMENT_TYPE_NODE | `DocumentType.name` | 10 |
| DOCUMENT_FRAGMENT_NODE | `#document-fragment` | 11 |

<CodeBlock>

```js
document.nodeName // "#document"
document.nodeType // 9
document.querySelector('a').nodeType === 1// true
document.querySelector('a').nodeType === Node.ELEMENT_NODE// true
```

</CodeBlock>

### Node.nodeValue

- `返回一个字符串,表示当前节点本身的文本值,该属性可读写`

### Node.textContent

- `返回当前节点和它的所有后代节点的文本内容`
- `自动忽略当前节点内部的HTML标签,返回所有文本内容`

### Node.baseURI

- `返回一个字符串,表示当前网页的绝对路径`
- `如果无法取到这个值(则返回null`
- `浏览器根据这个属性(计算网页上的相对路径的URL.该属性为只读.`
- `document.baseURI或element.baseURI`

### Node.ownerDocument

- `返回当前节点所在的顶层文档对象(即document对象`

<CodeBlock>

```js
var d = document.querySelector('p').ownerDocument;
d === document // true
//document对象本身的ownerDocument属性,返回null
document.ownerDocument //null
```

</CodeBlock>

### Node.sibling与Node.previousSibling

- `Node.nextSibling属性返回紧跟在当前节点后面的第一个同级节点`
- `Node.previousSibling属性返回当前节点前面的、距离最近的一个同级节点`
- `nextSibling` ：IE678  (下一个兄弟节点)
- 在谷歌火狐中也有这个方法,只不过是得到换行.
- `nextElementSibling` ：火狐谷歌 IE9-11  (下一个兄弟节点)
- 兼容写法：`b.nextElementSibling || b.nextSibling`

<CodeBlock>

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

</CodeBlock>

- `previousSibling` ：IE678  (上一个兄弟节点)
- 在谷歌火狐中也有这个方法,只不过是得到换行.
- `previousElementSibling` ：火狐谷歌 IE9-11 (上一个兄弟节点)
- 兼容写法：`b.previousElementSibling || b.previousSibling`

<CodeBlock>

```js
//1.获取id名为box的盒子.
var b = document.getElementById("box");
//2.兄弟节点的方式获得上盒子
var m = b.previousElementSibling || b.previousSibling;
//3.更改背景色
m.style.backgroundColor = "purple";

// 获取所有的兄弟节点
function siblings(elm){
  var a=[];
  var p= elm.parentNode.children;
  for (var i=0,pl=p.length;i<pl;i++){
    if(p[i] !== elm){
      a.push(p[i]);
    }
    return a;
  }
}
```

</CodeBlock>

### Node.parentNode

- `返回当前节点的父节点`
- 只可能是三种类型：`element、 document和documentfragment`

<CodeBlock>

```js
//从父节点移除指定节点
if (node.parentNode) {
  node.parentNode.removeChild(node);
}
```

</CodeBlock>

### Node.parentElement

- 返回当前节点的父Element节点
- 如果当前节点没有父节点,或者父节点类型不是Element节点,则返回`null`

<CodeBlock>

```js
//设置指定节点的父Element节点的CSS属性
if (node.parentElement) {
  node.parentElement.style.color = "red";
}
```

</CodeBlock>

### Node.childNodes

- `火狐谷歌 IE9-11  (所有子节点)`
- `nodeType`  每一个标签都一个这个属性(有个三个值)
- `nodeType  ==  1`  表示的是元素节点
- `nodeType  ==  2`  表示是属性节点
- `nodeType  ==  3`  是文本节点

<CodeBlock>

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
for(var i = 0; i<bcArr.length ;i++){
    //如果自盒子的nodeType的值 == 1 ,说明他的是元素节点(标签)
    if(bcArr[i].nodeType == 1){
        //把这个标签放入arr 这个数组.
        arr.push(bcArr[i]);
    }
}
//3.打印长度.()
console.log(bcArr)
console.log(bcArr.length)
console.log(arr)
console.log(arr.length)
</script>
```

</CodeBlock>

### Node.firstChild与Node.lastChild

- `firstChild属性返回当前节点的第一个子节点,如果当前节点没有子节点,则返回null`
- `Node.lastChild属性返回当前节点的最后一个子节点,如果当前节点没有子节点,则返回null`
- `firstChild` ：IE678  (第一个子节点)
- 在谷歌火狐中也有这个方法,只不过是得到第一个换行.
- `firstElementChild` ：火狐谷歌 IE9-11  (第一个子节点)
- 兼容写法：`b.firstElementChild || b.firstChild`

<CodeBlock>

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

</CodeBlock>

- `lastChild` ：IE678   (最后一个子节点)
- 在谷歌火狐中也有这个方法,只不过是得到最后一个换行.
- `lastElementChild`  ：火狐谷歌 IE9-11  (最后一个子节点)
- 兼容写法：`b.lastElementChild || b.lastChild`

<CodeBlock>

```js
//1.获取父盒子
var b = document.getElementById("box");
//2.通过父盒子获取最后一个子盒子
var lc = b.lastElementChild || b.lastChild;
//3.更改背景色.
lc.style.backgroundColor = "purple";
```

</CodeBlock>

### children

- 在IE678中注释会被当做节点.解决方法：`注释写到父节点外部`

<CodeBlock>

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
console.log(bcArr)
console.log(bcArr.length)
</script>
```

</CodeBlock>

### 获取兄弟节点中的某一个

- `someNode = node.parentNode.children[index]`,`index`是索引值

## DOM节点对象的方法

### createElement

- `newNode = document.createElement(“标签名”)`

<CodeBlock>

```js
//demo
newel=document.createElement('h1');
newel.innerHTML='<p>hello</p>';  //innerText不能转换HTML标签
document.body.appendChild(newel);
//demo2
newtext=document.createTextNode('hello world');
document.body.appendChild(newtext);
```

</CodeBlock>

## 节点的添加

### 插入当前节点

- `Node.appendChild()`:接受一个节点对象作为参数,将其作为`最后一个子节点`,插入当前节点

### 是否有子节点

- `Node.hasChildNodes()`:返回一个布尔值,表示当前节点是否有子节点

<CodeBlock>

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

</CodeBlock>

### 将节点插入指定位置

- `insertBefore(a,b)`用于将某个节点插入当前节点的指定位置
- 该方法接受2个参数,第一个是`要插入的节点`,第二个是`参照节点`
- `parentNode.insertBefore(newNode,targetNode)；`

### 复制节点

- `cloneNode(参数) ；booblean类型的参数.`
- `newNode = oldNode.cloneNode(boolean) ;`用于复制节点, 接受一个布尔值参数
  - `true` 表示深复制(复制节点及其所有子节点),
  - `false` 表示浅复制(复制节点本身,不复制子节点

<CodeBlock>

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

</CodeBlock>

### 移除节点

- `父节点.removeChild(子节点)`
- `自己节点.parentNode.removeChild(自己节点)` 不知道父级的情况下移除自身Node

<CodeBlock>

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

</CodeBlock>

### 替换节点

- 用于将一个新的节点(替换当前节点的某一个子节点
- `replacedNode = parentNode.replaceChild(newChild, oldChild);`

### Node.contains

- 一个节点作为参数(返回一个布尔值(表示参数节点是否为当前节点的后代节点
- `nodeA.contains(nodeB)`

### 节点是否相等

- 返回一个布尔值,用于检查两个节点是否相等
- 所谓相等的节点,指的是两个节点的类型相同、属性相同、子节点相同
- `nodeA.isEqualNode(nodeB)`

### Node.normalize

- `Node.normalize()`用于清理当前节点内部的所有`Text`节点
- 它会去除空的文本节点(并且将毗邻的文本节点合并成一个

### 节点的属性

- 获取：`getAttribute(名称)`
- 设置：`setAttribute(名称, 值)`
- 删除：`removeAttribute(名称)`

<CodeBlock>

```js
<img id="pic" width="100px" height="100px"/>
//1.获取节点.
var pic = document.getElementById("pic");
//2.修改属性.
pic.setAttribute("width","500px");
var a = pic.getAttribute("height");
//3.删除属性
pic.removeAttribute("height");
```

</CodeBlock>

### ParentNode

- `HTMLCollection`节点的集合(返回一个类似数组的对象
- `children`属性返回一个动态的`HTMLCollection`集合,由当前节点的所有Element子节点组成
- `firstElementChild`属性返回当前节点的第一个Element子节点,如果不存在任何Element子节点,则返回`null`
- `lastElementChild`属性返回当前节点的最后一个Element子节点,如果不存在任何Element子节点,则返回`null`
- `childElementCount`属性返回当前节点的所有Element子节点的数目

### ChildNode

- `remove`方法用于移除当前节点
- `before`方法用于在当前节点的前面,插入一个同级节点
- `after`方法用于在当前节点的后面,插入一个同级节点
- `replaceWith`方法使用参数指定的节点,替换当前节点

## 兼容节点

<CodeBlock>

<<< @/example/docs/dom/getNextElement.js

<<< @/example/docs/dom/getPreviousElement.js

<<< @/example/docs/dom/getFirstElement.js

<<< @/example/docs/dom/getLastElement.js

<<< @/example/docs/dom/getAllSibling.js

</CodeBlock>
