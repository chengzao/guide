---
title: guide
date: 2020-07-20
sidebar: "auto"
---

## 基本类型

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
undefined,
  null,
  false,
  0,
  NaN,
  "",
  ""[ // false
    // 过滤数组中的这些值
    (undefined, null, false, 0, NaN, "", "", "hello")
  ]
    .filter(item => item); // ['hello']

typeof null; // 返回object
```

- `null`是一个表示“空”的对象，转为数值时为 0
- `undefined`是一个表示”此处无定义”的原始值，转为数值时为`NaN`
- `void 0`

## BigInt

- [bigint@caniuse](https://caniuse.com/#search=bigint)
- [jsbi@github](https://github.com/GoogleChromeLabs/jsbi)
- 使用

```js
BigInt(10); // 10n
```

- typeof

```js
console.log(10n === 10); // → false
console.log(10n == 10); // → true

console.log(typeof 10n); // → bigint
console.log(typeof 10); // → number
```

- 运算

```js
10n + 20n; // → 30n
10n - 20n; // → -10n
+10n; // → TypeError: Cannot convert a BigInt value to a number
-10n; // → -10n
10n * 20n; // → 200n
20n / 10n; // → 2n
23n % 10n; // → 3n
10n ** 3n; // → 1000n

const x = 10n;
++x; // → 11n
--x; // → 9n

// 注意区别：
25 / 10; // → 2.5
25n / 10n; // → 2n
```

- 隐式类型转换

```js
10 + 10n; // → TypeError
Math.max(2n, 4n, 6n); // → TypeError

BigInt(10) + 10n; // → 20n
10 + Number(10n); // → 20

// 请注意，关系运算符不遵循此规则
10n > 5; // → true

!0n; // true
!1n; // false

// 排序BigInts和Numbers数组时，不会发生隐式类型转换
const arr = [3n, 4, 2, 1n, 0, -1n, 2n];
arr.sort(); // → [-1n, 0, 1n, 2, 2n, 3n, 4]
```

- 位操作符

```js
// |、&、<<、>>和^对Bigint的操作方式与Number类似
90 | 115; // → 123
90n | 115n; // → 123n
90n | 115; // → TypeError
```

- BigInt 构造函数

```js
BigInt("10"); // → 10n
BigInt(10); // → 10n
BigInt(true); // → 1n

BigInt(10) * 10n; // → 100n
BigInt(true) === 1n; // → true

// 无法转换的数据类型和值会引发异常:
BigInt(10.2); // → RangeError
BigInt(null); // → TypeError
BigInt("abc"); // → SyntaxError
```

## 文档基本结构

<CodeBlock>

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

</CodeBlock>

## 文档兼容模式

- `document type`声明文档类型 DTD：`<!DOCTYPE html>`
- `BackCompat` 未声明 DTD(怪异模式)firefox
- `CSS1Compat` 已经声明 DTD(标准模式)chrome ,ie
- `document.compatMode` 获取文档类型

## document

### 节点获取

- 对于正常的网页,直接使用`document`或`window.document`
- 对于 iframe 载入的网页,使用 iframe 节点的`contentDocument`属性
- 对 Ajax 操作返回的文档,使用`XMLHttpRequest`对象的`responseXML`属性

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

<CodeBlock>

```js
document.implementation.hasFeature("HTML", "2.0"); // true

document.implementation.hasFeature("MutationEvents", "2.0"); // true
```

</CodeBlock>

- `document.cookie`属性用来操作浏览器 Cookie

## Number

```js
Number("123"); // 123
Number("12.3"); // 12.3
Number("12.00"); // 12
Number("123e-1"); // 12.3
Number(""); // 0
Number(null); // 0
Number("foo"); // NaN
Number("100a"); // NaN
Number("-Infinity"); //-Infinity
```

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
- `Number.MIN_VALUE` 最小的正数,最接近 0 的负数为`-Number.MIN_VALUE`
- `Number.MAX_SAFE_INTEGER` 能够精确表示的最大整数，即`9007199254740991`
- `Number.MIN_SAFE_INTEGER` 能够精确表示的最小整数，即`-9007199254740991`

### 进制转换

- `toString(radix)`

```js
(15).toString(2).padStart(8, "0"); // 00001111
(15).toString(8).padStart(8, "0"); // 00000017
(15).toString(16).padStart(8, "0"); // 0000000f
```

- `Number()`

```js
Number("0x11"); // 17  十六进制
Number("0b11"); // 3   二进制
Number("0o11"); // 9   八进制
```

## Math

### `Math.abs()`

- 返回参数值的绝对值

### 比较大小

- `Math.max()` 返回最大值

```js
Math.max(1, 3, "12ab"); //NaN
Math.max(1, 2, NaN); //NaN
Math.max(1, 2, undefined); //NaN
Math.max(1, 3, "12");
Math.max(1, 3, null);
```

- `Math.min()` 返回最小值

### 取整

- `Math.floor()` 返回小于参数值的最大整数 (向下取整)

  ```js
  Math.floor(1.9); // 1
  Math.floor(1.1); // 1
  Math.floor(-1.9); // -2
  Math.floor(-1.1); // -2
  ```

- 使用`~、>>、<<、|`来取整

```js
console.log(~~11.71); // 11
console.log(11.71 >> 0); // 11
console.log(11.71 << 0); // 11
console.log(11.71 | 0); // 11
```

- `Math.ceil()` 返回大于参数值的最小整数 (向上取整)

```js
Math.ceil(1.1); // 2
Math.ceil(1.9); // 2
Math.ceil(-1.1); // -1
Math.ceil(-1.9); // -1
```

### `Math.random()`

- 返回`[0,1)`之间的一个伪随机数

```js
function randomColor() {
  return (
    "#" + ("00000" + ((Math.random() * 0x1000000) << 0).toString(16)).substr(-6)
  );
}
function randomRbga(a) {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return "rgba(" + r + "," + g + "," + b + "," + a + ")";
}
function randomHsla() {
  var colorAngle = Math.floor(Math.random() * 360);
  return "hsla(" + colorAngle + ",100%,50%,1)";
}
```

### `Math.round()`

- 四舍五入

```js
Math.round(21.7); // 22
Math.round(21.1); // 21
Math.round(-21.7); // -22
Math.round(-21.1); // -21
```

- 使用 `A +/- 0.5 | 0` 来替代 `Math.round()`

```js
var a = 21.7;
(a + 0.5) | 0; // 22

var a = 21.1;
(a + 0.5) | 0; // 21

var a = -21.7;
(a - 0.5) | 0; // -22

var a = -21.1;
(a - 0.5) | 0; // -21
```

### `Math.sqrt()`

- 返回参数值的平方根。如果参数是一个负值，则返回`NaN`

### 三角函数方法

- `Math.PI` 返回圆周率（约等于`3.14159`）
- `Math.sin()` 返回参数的正弦（参数为弧度值）
- `Math.cos()` 返回参数的余弦（参数为弧度值）
- `Math.tan()` 返回参数的正切（参数为弧度值）
- `Math.asin()` 返回参数的反正弦（弧度值）
- `Math.acos()` 返回参数的反余弦（弧度值）
- `Math.atan()` 返回参数的反正切（弧度值）

### 其他

- `Math.pow()` 第一个参数为底数、第二个参数为幂的指数值
- `Math.log()` 返回以`e`为底的自然对数值
- `Math.exp()` 返回常数`e`的参数次方

## JSON

### JSON.stringify

- `用于将一个值转为字符串`
- `一个成员的值是undefined、函数或 XML 对象，这个成员会被过滤`

<CodeBlock>

```js
var obj = {
  a: undefined,
  b: function() {}
};

JSON.stringify(obj); // "{}"
```

</CodeBlock>

- `数组的成员是undefined、函数或 XML 对象,则这些值被转成null`
- `JSON.stringify方法会忽略对象的不可遍历属性`
- `第二个参数`

<CodeBlock>

```js
// 接受一个数组,作为第二个参数,指定需要转成字符串的属性
var obj = {
  prop1: "value1",
  prop2: "value2",
  prop3: "value3"
};

var selectedProperties = ["prop1", "prop2"];
JSON.stringify(obj, selectedProperties);
// "{"prop1":"value1","prop2":"value2"}"

// 只对对象的属性有效,对数组无效
JSON.stringify(["a", "b"], ["0"]);
// "["a","b"]"

JSON.stringify({ 0: "a", 1: "b" }, ["0"]);
// "{"0":"a"}"
```

```js
// 接受一个函数,用来更改JSON.stringify的默认行为
function f(key, value) {
  if (typeof value === "number") {
    value = 2 * value;
  }
  return value;
}

JSON.stringify({ a: 1, b: 2 }, f);
// '{"a": 2,"b": 4}'
```

</CodeBlock>

- `第三个参数,用于增加返回的JSON字符串的可读性`

<CodeBlock>

```js
JSON.stringify({ p1: 1, p2: 2 }, null, 2);
JSON.stringify({ p1: 1, p2: 2 }, null, "|-");
```

</CodeBlock>

### JSON.parse

- `用于将JSON字符串转化成对象`

<CodeBlock>

```js
JSON.parse("{}"); // {}
JSON.parse("true"); // true
JSON.parse('"foo"'); // "foo"
JSON.parse('[1, 5, "false"]'); // [1, 5, "false"]
JSON.parse("null"); // null

var o = JSON.parse('{"name": "张三"}');
o.name; // 张三
```

</CodeBlock>

- 实现一个 JSON.stringify

```js
function jsonStringify(obj) {
  let type = typeof obj;
  if (type !== "object") {
    if (/string|undefined|function/.test(type)) {
      obj = '"' + obj + '"';
    }
    return String(obj);
  } else {
    let json = [];
    let arr = Array.isArray(obj);
    for (let k in obj) {
      let v = obj[k];
      let type = typeof v;
      if (/string|undefined|function/.test(type)) {
        v = '"' + v + '"';
      } else if (type === "object") {
        v = jsonStringify(v);
      }
      json.push((arr ? "" : '"' + k + '":') + String(v));
    }
    return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
  }
}
console.log(jsonStringify({ x: 5 })); // "{"x":5}"
console.log(jsonStringify([1, "false", false])); // "[1,"false",false]"
console.log(jsonStringify({ b: undefined })); // "{"b":"undefined"}"
```

- 实现一个 JSON.parse

```js
var jsonStr = '{ "age": 20, "name": "jack" }';
var json = new Function("return " + jsonStr)();
console.log(json);
```

## 栈和队列(LIFO/FIFO)

- `栈`数据结构的访问规则是`LIFO(Last-in-First-Out,后进先出)`
- `队列`数据结构的访问规则是`FIFO(First-In-First-Out, 先进先出)`
