---
title: js运算符
date: 2020-07-20
sidebar: "auto"
---

:::tip

[MDN：运算符优先级](https://developer.mozilla.org/zh-cn/docs/web/javascript/reference/operators/operator_precedence)

:::

- `一元操作符` `++, -- + -`
- `逻辑操作符` `! && ||`
- `基本运算符` `+, -, *, /, %(取余)`
- `关系操作符` `>, <, >=, <=, ===, ==, !=, !==`
- `条件操作符` `(三元运算符) ? :`
- `赋值运算符` `+=, -=, *=, /=, %= ,=`
- `逗号运算符` `,`
- `圆括号运算符` `()`
- `%` 运算结果的正负号由第一个运算值的正负号决定

  ```js
  true +1 //2
  false +1 //1

  12%5  //2
  -1 % 2 // -1
  1 % -2 // 1
  6%5； //1
  3%5;  //3
  ```

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

## 逻辑运算符

- `&& (并且) , || (或者) , ! (取反)`
- 逻辑运算符的优先级

```bash
! > && > ||

()>*,/ > +,-
```

## 比较运算符

- `> >= < <= == ===`
- `注意： === 与 == 的区别.`
  - `== 值 相等`
  - `=== 值 和类型都相等`

```js
var a = 1;
var b = "1";
a == b; // true
a === b; // false
```

- 在代码中没有这样的形式：`110>pj>100`; 如果一定要表达这种形式：使用`110 > pj && pj> 100`

## 赋值运算符

```js
x += y; // 等同于 x = x + y
x -= y; // 等同于 x = x - y
x *= y; // 等同于 x = x * y
x /= y; // 等同于 x = x / y
x %= y; // 等同于 x = x % y
x >>= y; // 等同于 x = x >> y
x <<= y; // 等同于 x = x << y
x >>>= y; // 等同于 x = x >>> y
x &= y; // 等同于 x = x & y
x |= y; // 等同于 x = x | y
x ^= y; // 等同于 x = x ^ y
```

## 逗号操作符

- 对它的每个操作数求值（从左到右），并返回最后一个操作数的值

```js
"a", "b"; // "b"

var x = 10;
var y = (++x, 20);
console.log(y, x); // 20 11
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



## if else



```js
if (condition) {
} else {
}

if (条件 / boolean) {
  代码块1;
} else if (条件 / boolean) {
  代码块2;
}
```



## switch case



```js
switch (变量){
	case 变量的值1:
		// 代码块1;
		break;
	case 变量的值2:
		// 代码块2;
		break;
	.....
	default:
		// 默认代码块;
		break;
}
```



## 三元运算符/三目运算符

- `boolean表达式 ? 操作一:操作二;`
- `(condition) ? expr1 : expr2`
- 如果 condition 为`true`,则返回 expr1 的值,否则返回 expr2 的值



```js
var a = 16;
var b = 15;
var c = 24;
//让a和b进行比较,找出大的,再用大的跟c比较
(a > b ? a : b) > c ? alert(a > b ? a : b) : alert(c);
```



## 循环语句

### while 循环

- 当程序运行到 while 的时候,会判断 while 后面括号中的内容,
- 如果内容为 true,会执行下面的代码,
- 如果为内容为 false,则不执行这段代码,跳过这段代码执行下面的内容.

```js
while(条件语句/boolean)｛
		//重复执行的代码块
｝
```

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



```js
do {
  //要循环执行的代码块
} while (条件语句 / boolean);
```



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



```js
for (initialize; test; increment) {
  statement
}

// 循环数组
for( var i=0 ,len=arr.lenth; i<len; i++ ){
// 执行语句
}

-------------------------------------
//从1加到100 计数器思想
var sum = 0;
for(var i=0; i < 101 ; i++ ){
    sum += i;
}
alert(sum);
```



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



## break 与 continue

- `break 终止循环`
- `continue 跳出本次循环,进入下一次循环`



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

## for in 和 for of 的区别

- 使用`for in`会遍历数组所有的可枚举属性，包括原型, 更适合遍历对象
- `for of`遍历数组元素值
