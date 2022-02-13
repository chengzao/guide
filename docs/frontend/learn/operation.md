---
title: js运算符
date: 2020-07-20
sidebar: "auto"
categories:
  - frontend
---

:::tip

[MDN：运算符优先级](https://developer.mozilla.org/zh-cn/docs/web/javascript/reference/operators/operator_precedence)

:::

## 运算符i++与++i

- `注意:a++和++a 与 a--和--a 的区别`

  - `++a;` 先自增,后计算 `var a=1; ++a // 2`
  - `a++;` 先运算,后自增 `var b=1; b++ // 1`
  - `--a;` 先自减,后计算 `var c=1; --c // 0`
  - `a--;` 先运算,后自减 `var d=1; d-- // 1`

- js 浮点运算`0.1`

```js
var x = 0.2 - 0.1; // 0.1
var y = 0.3 - 0.2; // 0.09999999999999998不等于0.1
x == y; // false
```

## 位操作符

- `按位与（AND）`

对于每一个比特位，只有两个操作数相应的比特位都是 1 时，结果才为 1，否则为 0

| `a` | `b` | `a & b` |
| :-: | :-: | :-----: |
|  0  |  0  |    0    |
|  0  |  1  |    0    |
|  1  |  0  |    0    |
|  1  |  1  |    1    |

```js
1 & 2; // 0  => 0001 & 0010
```

- `按位或（OR）`

对于每一个比特位，当两个操作数相应的比特位至少有一个 1 时，结果为 1，否则为 0

| `a` | `b` | `a | b` |
| :-: | :-: | :-----: |
|  0  |  0  |    0    |
|  0  |  1  |    1    |
|  1  |  0  |    1    |
|  1  |  1  |    1    |

```js
1 | 2; // 3 => 0001 | 0010
```

- `按位异或（XOR）`

对于每一个比特位，当两个操作数相应的比特位有且只有一个 1 时，结果为 1，否则为 0

| `a` | `b` | `a ^ b` |
| :-: | :-: | :-----: |
|  0  |  0  |    0    |
|  0  |  1  |    1    |
|  1  |  0  |    1    |
|  1  |  1  |    0    |

```js
1 ^ 2; // 3 => 0001 ^ 0010
```

- 使用`^`来完成值交换

```js
// --- before ---
let temp = a;
a = b;
b = temp; // 传统，但需要借助临时变量
b = [a, (a = b)][0]; // 借助数组

// --- after ---
let a = 7;
let b = 1;
a ^= b;
b ^= a;
a ^= b;
console.log(a); // 1
console.log(b)[(a, b)] = [b, a]; // 7 // ES6，解构赋值
```

- `按位非（NOT）`

反转操作数的比特位，即 0 变成 1，1 变成 0

| `a` | `~a` |
| :-: | :--: |
|  0  |  1   |
|  1  |  0   |

```js
// 整数： ~x = -(x+1)
~4; // -5
~-10; // 9
```

- 左移（<<）

`a << b` 将 a 的二进制形式向左移 b (< 32) 比特位，右边用 0 填充

```js
1 << 2; // 4   => 0001 << 000100
5 << 2; // 20  => 0101 << 010100
```

- 有符号右移（>>）

`a >> b` 将 a 的二进制表示向右移 b (< 32) 位，丢弃被移出的位

```js
(4 >>
  (2 - // 1
    4)) >>
  2; // -1
```

- 无符号右移（>>>）

`a >>> b` 将 a 的二进制表示向右移 b (< 32) 位，丢弃被移出的位，并使用 0 在左侧填充

```js
(4 >>>
  (2 - // 1
    4)) >>>
  2; // 1073741823
```

## `void`

`void`对给定的表达式进行求值，然后返回 undefined

```js
var x = 3;
void x++; //undefined
x; // 4
```

## 字符串的比较

- 字符串按照字典顺序进行比较
- 首先比较首字符的 Unicode 码点,如果相等;
- 再比较第二个字符的 Unicode 码点,以此类推

```js
"cat" > "dog"; // false
"cat" > "catalog"; // false
"cat" > "Cat"; // true
"大" > "小"; // false
```

## escape 与 unescape

```js
escape("大"); // "%u5927"
unescape("%u5927"); // "大"

const escapeHTML = str =>
  str.replace(
    /[&<>'"]/g,
    tag =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;"
      }[tag] || tag)
  );

const unescapeHTML = str =>
  str.replace(
    /&amp;|&lt;|&gt;|&#39;|&quot;/g,
    tag =>
      ({
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&#39;": "'",
        "&quot;": '"'
      }[tag] || tag)
  );
```

## NaN

- `NaN是 JavaScript 的特殊值,表示"非数字"(Not a Number)`



```js
typeof NaN; // 'number'
NaN == NaN; // flase
NaN === NaN[NaN].indexOf(NaN); //false // -1
Boolean(NaN); // false
Number.isNaN(NaN); // true
```



- `NaN与任何数(包括它自己)的运算,得到的都是NaN`
- 判断 NaN 的方法



```js
//isNaN方法可以用来判断一个值是否为NaN
//isNaN只对数值有效,如果传入其他值,会被先转成数值
isNaN(NaN); // true
isNaN(123); // false
isNaN({}); // true
isNaN("Hello"); // true
isNaN(["xzy"]); // true

//对于空数组和只有一个数值成员的数组,isNaN返回false
isNaN([]); // false
isNaN([123]); // false
isNaN(["123"]); // false
```

## 循环语句

### while 循环

- 当程序运行到 while 的时候,会判断 while 后面括号中的内容,
- 如果内容为 true,会执行下面的代码,
- 如果为内容为 false,则不执行这段代码,跳过这段代码执行下面的内容.

- 如果在写循环的时候一定要有循环的结束条件,如果没有就是死循环,就是一 Bug.
- 终止循环：break
- 立即结束本次循环,开始下一次循环：continue



```javascript
var a = 1;
while(a <= 100) {
  console.log(a);
  a ++;//a = a + 1;
}
console.log("over");

// el : element dom
function node2Fragment(el) {
  var fragment = document.createDocumentFragment(),
      child;
  // 将原生节点拷贝到fragment
  while (child = el.firstChild) {
      fragment.appendChild(child);
  }
  return fragment;
},
```



### do while

代码从上到下执行的过程中如果遇到了 do
就会先执行一次 do 后面的代码,执行之后再
通过`while`来进行判断,如果判断通过那么再执行一次,
如果判断不通过却结束循环.

- 区别
- `while`先判断再做,
- `do-while`先做再判断；

```js
var k = 0;
do {
  sum += k;
  k++;
} while (k < 101);
console.log(sum);
```

### for 循环


- `for in`循环用来遍历一个对象的全部属性
- `for in`它遍历的是对象所有可遍历(`enumerable`)的属性,会跳过不可遍历的属性
- `for in`它不仅遍历对象自身的属性,还遍历继承的属性

```js
// name 是 Person 本身的属性
function Person(name) {
  this.name = name;
}

// describe是Person.prototype的属性
Person.prototype.describe = function() {
  return "Name: " + this.name;
};

var person = new Person("Jane");

// for...in循环会遍历实例自身的属性(name),
// 以及继承的属性(describe)
for (var key in person) {
  console.log(key);
}
// name
// describe

//只想遍历对象本身的属性
for (var key in person) {
  if (person.hasOwnProperty(key)) {
    console.log(key);
  }
}
// name
```

## for in 和 for of 的区别

- `for in` 循环只遍历可枚举属性（包括它的原型链上的可枚举属性）
- `for of`遍历[可迭代对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols)，不可遍历普通对象

## break 与 continue

- `break 终止循环`

```js
// break
var a = 0;
while (a < 5) {
  a++; //a = a + 1;
  if (a == 3) {
    break; //终止循环
  }
  console.log(a);
}
console.log("break is over");
// 1 2 break is over
```

- `continue 跳出本次循环,进入下一次循环`

```js
// continue
var a = 0;
while (a < 5) {
  a++; //a = a + 1;
  if (a == 2) {
    continue; //跳出本次循环,进入下一次循环
  }
  console.log(a);
}
console.log("continue is over");
// 1 3 4 5 continue is over
```

## 使用 `&` 判断奇偶性

```js
7 & 1; // 1
8 & 1; // 0
```

## 使用 `!!` 将数字转为布尔值

```js
console.log(!!7); // true
console.log(!!0); // false
console.log(!!-1); // true
console.log(!!0.71); // true
```
