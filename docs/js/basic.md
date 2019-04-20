# 基本结构

## 基本类型

- `number`
- `string`
- `boolean`
- `null`
- `undefined`
- `Symbol`

## 引用类型

- `Object`
- `Array`
- `Function`
- `Date`
- `Math`
- `Regexp`
- `JSON`

## Boolean布尔

- 类型转换：`!!undefined --> false`
- 布尔转换

```bash
undefined, null, false, 0, NaN , "" , ''  --> false

typeof null # 返回object

null是一个表示“空”的对象，转为数值时为0；

undefined是一个表示”此处无定义”的原始值，转为数值时为NaN。
```

## 文档基本结构

```js
document.head //文档的头标签
typeof document.head  //object
document.title //文档标题
typeof document.title //string
document.body  //文档的body标签
typeof document.body  //object
document.documentElement//文档的根节点 注意：没有document.html这个东西
typeof document.documentElement //object
document.html//这个是错的!!!
document.defaultView === window // true
document.activeElement // 属性返回当前文档中获得焦点的那个元素
document.defaultView
```

## 文档兼容模式

- `document type`声明文档类型 DTD：`<!DOCTYPE html>`
- `BackCompat`   未声明DTD(怪异模式)firefox
- `CSS1Compat`  已经声明DTD(标准模式)chrome ,ie
- `document.compatMode` 获取文档类型

```js
document.compatMode;
```

## document节点

### 节点获取

- 对于正常的网页,直接使用`document`或`window.document`
- 对于iframe载入的网页,使用iframe节点的`contentDocument`属性
- 对Ajax操作返回的文档,使用`XMLHttpRequest`对象的`responseXML`属性

### 节点集合属性

- `document.links`属性返回当前文档所有设定了href属性的a及area元素
- `document.images`属性返回页面所有图片元素(即img标签)
- `document.scripts`属性返回当前文档的所有脚本(即script标签)
- `document.styleSheets`属性返回一个类似数组的对象,代表当前网页的所有样式表

### 文档信息属性

- `document.documentURI`属性和`document.URL`属性都返回一个字符串,表示当前文档的网址
- `documentURI`属性可用于所有文档(包括 XML 文档),URL属性只能用于 HTML 文档
- `document.domain`属性返回当前文档的域名
- `document.lastModified`属性返回当前文档最后修改的时间戳,格式为字符串
- `document.title`属性返回当前文档的标题,该属性是可写的
- `document.referrer`

- `document.characterSet`属性返回渲染当前文档的字符集 //UTF-8
- `document.readyState`属性返回当前文档的状态

- **三种可能的值:**
  - `loading`：加载HTML代码阶段(尚未完成解析)
  - `interactive`：加载外部资源阶段时
  - `complete`：加载完成时

- `document.designMode`属性控制当前文档是否可编辑
- `document.implementation`属性返回一个对象,用来甄别当前环境部署了哪些DOM相关接口
- `implementation`属性的`hasFeature`方法,可以判断当前环境是否部署了特定版本的特定接口

```js
document.implementation.hasFeature('HTML', '2.0')// true

document.implementation.hasFeature('MutationEvents','2.0')// true
```

- `document.cookie`属性用来操作浏览器Cookie

## Element

### 属性相关的方法

- `Element.getAttribute()`：读取指定属性
- `Element.setAttribute()`：设置指定属性
- `Element.hasAttribute()`：返回一个布尔值;表示当前元素节点是否有指定的属性
- `Element.removeAttribute()`：移除指定属性

### 查找相关的方法

- `Element.querySelector()`
- `Element.querySelectorAll()`
- `Element.getElementsByTagName()`
- `Element.getElementsByClassName()`

### 事件相关的方法

- `Element.addEventListener()`：添加事件的回调函数
- `Element.removeEventListener()`：移除事件监听函数
- `Element.dispatchEvent()`：触发事件

### 其他方法

- `Element.scrollIntoView`方法滚动当前元素;进入浏览器的可见区域;类似于设置`window.location.hash`的效果
- `Element.getBoundingClientRect()`方法返回元素的大小及其相对于视口的位置,是一个`DOMRect`
- `Element.getClientRects()`获取元素占据页面的所有矩形区域;里面是当前元素在页面上形成的所有矩形
  - 每个矩形都有`bottom、height、left、right、top、width`六个属性

```html
  <style media="screen">
    #box{
      width: 100px;
      height: 150px;
      background-color: pink;
    }
  </style>
  <div id="box"></div>
  <script type="text/javascript">
    var el = document.getElementById('box');
    console.log(el.getClientRects());
    console.log(el.getBoundingClientRect());
  </script>
```

- `Element.insertAdjacentHTML方法解析HTML字符串;然后将生成的节点插入DOM树的指定位置`
  - `element.insertAdjacentHTML(position, text);`第一个是指定位置;第二个是待解析的字符串
  - `beforebegin`：在当前元素节点的前面
  - `afterbegin`：在当前元素节点的里面;插在它的第一个子元素之前
  - `beforeend`：在当前元素节点的里面;插在它的最后一个子元素之后
  - `afterend`：在当前元素节点的后面

```js

var d1 = document.getElementById('one');
d1.insertAdjacentHTML('afterend', '<div id="two">two</div>');
```

- `Element.remove方法用于将当前元素节点从DOM树删除`
- `Element.focus方法用于将当前页面的焦点;转移到指定元素上`

### 属性的操作

- `Element.attributes` 返回一个类似数组的动态对象
- 属性节点对象有`name`和`value`属性;对应该属性的属性名和属性值;等同于`nodeName`属性和`nodeValue`属性

### 属性操作的标准方法

- `Element.getAttribute`方法返回当前元素节点的指定属性.如果指定属性不存在;则返回`null`
- `Element.setAttribute`方法用于为当前元素节点新增属性.如果同名属性已存在;则相当于编辑已存在的属性
- `Element.hasAttribute`方法返回一个布尔值;表示当前元素节点是否包含指定属性
- `Element.removeAttribute`方法用于从当前元素节点移除属性

### dataset属性

- `data-`后面的属性名有限制;`只能包含字母、数字、连词线(-)、点(.)、冒号(:)和下划线(_)`
- 属性名不应该使用A到Z的大写字母;比如不能有`data-helloWorld`这样的属性名;而要写成`data-hello-world`

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

DocumentFragment节点代表一个文档的片段，本身就是一个完整的DOM树形结构。
它没有父节点，parentNode返回null，但是可以插入任意数量的子节点。
它不属于当前文档，操作DocumentFragment节点，要比直接操作DOM树快得多

```js
//var docFrag = document.createDocumentFragment();
// or
var docFrag = new DocumentFragment();

var li = document.createElement('li');
li.textContent = 'Hello World';
docFrag.appendChild(li);
console.log(docFrag.textContent); //Hello World
document.querySelector('ul').appendChild(docFrag);
console.log(docFrag.textContent); // ''
```

## Number

### `toString()`

- `Number.prototype.toString()`
- 将一个数值转为字符串形式

### `toFixed()`

- `Number.prototype.toFixed()`
- 先将一个数转为指定位数的小数，返回字符串

### `toExponential()`

- `Number.prototype.toExponential()`
- 将一个数转为科学计数法形式

### `toPrecision()`

- `Number.prototype.toPrecision()`
- 将一个数转为指定位数的有效数字

### 属性

- `Number.POSITIVE_INFINITY` 正的无限，指向`Infinity`
- `Number.NEGATIVE_INFINITY` 负的无限，指向`-Infinity`
- `Number.NaN` 表示非数值，指向`NaN`
- `Number.MAX_VALUE` 最大的正数, 最小的负数为`-Number.MAX_VALUE`
- `Number.MIN_VALUE` 最小的正数,最接近0的负数为`-Number.MIN_VALUE`
- `Number.MAX_SAFE_INTEGER` 能够精确表示的最大整数，即`9007199254740991`
- `Number.MIN_SAFE_INTEGER` 能够精确表示的最小整数，即`-9007199254740991`

## Math

### `Math.abs()`

- 返回参数值的绝对值

### 比较大小

- `Math.max()` 返回最大值
- `Math.min()` 返回最小值

### 取整

- `Math.floor()` 返回小于参数值的最大整数 (向下取整)
- `Math.ceil()` 返回大于参数值的最小整数 (向上取整)

### `Math.random()`

- 返回`[0,1)`之间的一个伪随机数

### `Math.round()`

- 四舍五入

### `Math.sqrt()`

- 返回参数值的平方根。如果参数是一个负值，则返回`NaN`

### 三角函数方法

- `Math.PI` 返回圆周率（约等于`3.14159`）
- `Math.sin()` 返回参数的正弦（参数为弧度值）
- `Math.cos()` 返回参数的余弦（参数为弧度值）
- `Math.tan()` 返回参数的正切（参数为弧度值）
- `Math.asin()`  返回参数的反正弦（弧度值）
- `Math.acos()`  返回参数的反余弦（弧度值）
- `Math.atan()` 返回参数的反正切（弧度值）

### other

- `Math.pow()` 第一个参数为底数、第二个参数为幂的指数值
- `Math.log()` 返回以`e`为底的自然对数值
- `Math.exp()` 返回常数`e`的参数次方

### 参考示例

```js
Math.ceil(1.1)// 2
Math.ceil(1.9)// 2
Math.ceil(-1.1)// -1
Math.ceil(-1.9)// -1
Math.floor(1.9)// 1
Math.floor(1.1)// 1
Math.floor(-1.9)// -2
Math.floor(-1.1)// -2
Math.round(1.1) // 1
Math.round(1.9)  // 2
Math.round(-1.1) // -1
Math.round(-1.9) // -2
Math.max(1,3,"12ab");//NaN
Math.max(1,2,NaN);//NaN
Math.max(1,2,undefined);//NaN
Math.max(1,3,"12")
Math.max(1,3,null);
```

## JSON

- `JSON.stringify({  }, null, 2)`
- `JSON.stringify(string)` JSON对象转为 JSON 字符串
- `JSON.parse(obj)` JSON 字符串转换为JSON对象

### json格式

### JSON.stringify

- `用于将一个值转为字符串`
- `一个成员的值是undefined、函数或 XML 对象，这个成员会被过滤`

```js
var obj = {
  a: undefined,
  b: function () {}
};

JSON.stringify(obj) // "{}"

```

- `数组的成员是undefined、函数或 XML 对象,则这些值被转成null`
- `JSON.stringify方法会忽略对象的不可遍历属性`
- `第二个参数`

```js
接受一个数组,作为第二个参数,指定需要转成字符串的属性
var obj = {
  'prop1': 'value1',
  'prop2': 'value2',
  'prop3': 'value3'
};

var selectedProperties = ['prop1', 'prop2'];
JSON.stringify(obj, selectedProperties)
// "{"prop1":"value1","prop2":"value2"}"

只对对象的属性有效,对数组无效
JSON.stringify(['a', 'b'], ['0'])
// "["a","b"]"

JSON.stringify({0: 'a', 1: 'b'}, ['0'])
// "{"0":"a"}"

接受一个函数,用来更改JSON.stringify的默认行为
function f(key, value) {
  if (typeof value === "number") {
    value = 2 * value;
  }
  return value;
}

JSON.stringify({ a: 1, b: 2 }, f)
// '{"a": 2,"b": 4}'
```

- `第三个参数,用于增加返回的JSON字符串的可读性`

```js
 JSON.stringify({ p1: 1, p2: 2 }, null, 2);
 JSON.stringify({ p1:1, p2:2 }, null, '|-');
```

### JSON.parse

- `用于将JSON字符串转化成对象`

```js
JSON.parse('{}') // {}
JSON.parse('true') // true
JSON.parse('"foo"') // "foo"
JSON.parse('[1, 5, "false"]') // [1, 5, "false"]
JSON.parse('null') // null

var o = JSON.parse('{"name": "张三"}');
o.name // 张三
```

## console

```js
console.log()
console.info()
console.debug()

console.warn()
console.error()

console.time() //用于计时开始
console.timeEnd() //用于计时结束

console.table() //某些复合类型的数据,可以将其转为表格显示
console.count() //用于计数,输出它被调用了多少次

console.trace() //显示当前执行的代码在堆栈中的调用路径
console.clear() //清除当前控制台的所有输出

console.dir()，console.dirxml()
console.group()，console.groupEnd()，console.groupCollapsed()
```

- `占位符`

```js
%s 字符串
%d 整数
%i 整数
%f 浮点数
%o 对象的链接
%c CSS格式字符串

var number = 11 * 9;
var color = 'red';
console.log('%d %s balloons', number, color);
// 99 red balloons
```

```js
debugger
// table
var languages = [
  { name: "JavaScript", fileExtension: ".js" },
  { name: "TypeScript", fileExtension: ".ts" },
  { name: "CoffeeScript", fileExtension: ".coffee" }
];
console.table(languages);
// count
function greet(user) {
  console.count();
  return 'hi ' + user;
}
greet('bob')
//  : 1
// "hi bob"

greet('alice')
//  : 2
// "hi alice"

console.count //可以接受一个字符串作为参数,作为标签,对执行次数进行分类
greet('bob')
// bob: 1
// "hi bob"
greet('alice')
// alice: 1
// "hi alice"
greet('bob')
// bob: 2
// "hi bob"
```

## 栈和队列

- `栈`数据结构的访问规则是`LIFO(Last-in-First-Out,后进先出)`
- `队列`数据结构的访问规则是`FIFO(First-In-First-Out, 先进先出)`
