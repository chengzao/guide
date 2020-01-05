# 字符串

[MDN/String](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)

## fromCharCode

- `String.fromCharCode(num1, ..., numN)`
- 一组序列数字，表示 Unicode 值
- 返回值是这些码点组成的字符串

```js
String.fromCharCode(65,66,67) // "ABC"
```

## charAt

- `String.prototype.charAt()`
- 一个介于0 和字符串长度减1之间的整数, 如果没有提供索引，`charAt()` 将使用0
- 从0开始编号的位置, 返回指定位置的字符
- 参数为负数，或大于等于字符串的长度，charAt返回空字符串

```js
var anyString = "Brave new world";
anyString.charAt() // "B"
anyString.charAt(0) // "B"
```

## charCodeAt

- `String.prototype.charCodeAt`
- 返回字符串指定位置的 Unicode 码点（十进制表示）

```js
"ABC".charCodeAt(0) // 65
"ABC".charCodeAt(1) // 66
"ABC".charCodeAt(2) // 67
"ABC".charCodeAt(3) // NaN
```

## concat

- `str.concat(string2, string3[, ..., stringN])`
- 连接两个字符串，返回一个新字符串，不改变原字符串
- 参数不是字符串，concat方法会将其先转为字符串，然后再连接

```js
var hello = "Hello, ";
hello.concat("Kevin", " have a nice day.")
// "Hello, Kevin have a nice day."

var hello = "Hello, ";
hello.concat("Kevin", " have a nice day.", ['A', 'C'])
// "Hello, Kevin have a nice day.A,C"
```

## slice

- `String.prototype.slice(start, end)`
- 截取字符串, 不改变原字符串
- 省略第二个参数，则表示子字符串一直到原字符串结束
- 参数是负值，表示从结尾开始倒数计算的位置
- 第一个参数大于第二个参数，slice方法返回一个空字符串

```js
var str1 = 'The morning is upon us.';
var str2 = str1.slice(4, -2);
str2 // "morning is upon u"
str1 // "The morning is upon us."

var str = 'The morning is upon us.';
str.slice(-3);     //'us.'
str.slice(-3, -1); //'us'
str.slice(0, -1);  //'The morning is upon us'
```

## trim

- `String.prototype.trim()`
- 除字符串两端的空格，返回一个新字符串，不改变原字符串

```js
var orig = '   foo  ';
orig.trim() // 'foo'
```

- `trimEnd()` 方法从一个字符串的末端移除空白字符, `trimRight()` 是这个方法的别名

```js
var greeting = '   Hello world!   ';

console.log(greeting);
//"   Hello world!   ";

console.log(greeting.trimEnd());
//"   Hello world!";
```

- `trimStart()` 方法从字符串的开头删除空格。`trimLeft()`是此方法的别名

```js
var greeting = '   Hello world!   ';

console.log(greeting);
//"   Hello world!   ";

console.log(greeting.trimStart());
//"Hello world!   ";
```

## match

- `String.prototype.match()`
- 确定原字符串是否匹配某个字符串，返回一个数组
- 没有, 则返回`null`

```js
var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
var regexp = /[A-E]/gi;
var matches_array = str.match(regexp);
// ["A", "B", "C", "D", "E", "a", "b", "c", "d", "e"]

var str = "Hello, world!"
var res = str.match('!')
// ["!", index: 12, input: "Hello, world!", groups: undefined]
```

## search

- `str.search(regexp)`
- 返回值为匹配的第一个位置
- 没有, 则返回-1

```js
var str = "Hello, world!"
var res = str.search('!')
res // 12
```

## replace

- `str.replace(regexp|substr, newSubStr|function)`
- 匹配替换匹配到的第一个字符串

```js
var p = 'Hello, world!';
var regex = /Hello/gi;

p.replace(regex, 'Hi') // "Hi, world!"
```

## split

- `str.split([separator[, limit]])`
- 分割字符串，返回数组
- 第二个参数，决定了返回数组的成员数

```js
var p = 'Hello, world!';
var res = p.split(' ')
res // ["Hello,", "world!"]

var myString = "Hello World. How are you doing?";
var splits = myString.split(" ", 3);
splits // ["Hello", "World.", "How"]
```

## toLowerCase

- `str.toLowerCase()`
- 字符串全部转为小写，不改变原字符串

```js
'中文简体 zh-CN || zh-Hans'.toLowerCase() // "中文简体 zh-cn || zh-hans"
```

## toUpperCase

- `String.prototype.toUpperCase()`
- 字符串全部转为大写，不改变原字符串

```js
'中文简体 zh-CN || zh-Hans'.toUpperCase() // "中文简体 ZH-CN || ZH-HANS"
```

## indexOf

- `String.prototype.indexOf()`
- 返回字符第一次出现的位置，返回-1表示不匹配

```js
"Blue Whale".indexOf("Blue"); // 0
"Hello, world!".indexOf("o"); // 4
```

## lastIndexOf

- `String.prototype.lastIndexOf()`
- 返回字符最后一次出现的位置，返回-1表示不匹配

```js
"Blue Whale".lastIndexOf("Blue"); // 0
"Hello, world!".lastIndexOf("o"); // 8
```

## length

- `String.prototype.length`
- 返回字符串的长度

```js
("Blue Whale").length; // 10
```

## Symbol.iterator

- `[@@iterator]()` 方法返回一个新的Iterator对象

```js
var string = 'A\uD835\uDC68';
var strIter = string[Symbol.iterator]();
strIter.next() // {value: "A", done: false}
strIter.next() // {value: "𝑨", done: false}
strIter.next() // {value: undefined, done: true}

var string = 'A\uD835\uDC68B\uD835\uDC69C\uD835\uDC6A';
for (var v of string) {
  console.log(v); // A, 𝑨, B, 𝑩, C, 𝑪
}
```

## 字符串的扩展

- 字符的 Unicode 表示法 (将码点放入大括号)

```js
"\u0061" // "a"
"\u20BB7" // "₻7"
"\u{20BB7}" // "𠮷"
```

## substr

- `str.substr(start[, length])`
- 返回一个字符串中从指定位置开始到指定字符数的字符

```js
var str = "abcdefghij";

console.log("(1,2): "    + str.substr(1,2));   // (1,2): bc
console.log("(-3,2): "   + str.substr(-3,2));  // (-3,2): hi
console.log("(-3): "     + str.substr(-3));    // (-3): hij
console.log("(1): "      + str.substr(1));     // (1): bcdefghij
console.log("(-20, 2): " + str.substr(-20,2)); // (-20, 2): ab
console.log("(20, 2): "  + str.substr(20,2));  // (20, 2):
```

## substring

- 如果 indexStart 等于 indexEnd，substring 返回一个空字符串
- 如果省略 indexEnd，substring 提取字符一直到字符串末尾
- 如果任一参数小于 0 或为 NaN，则被当作 0
- 如果任一参数大于 stringName.length，则被当作 stringName.length
- 如果 indexStart 大于 indexEnd，则 substring 的执行效果就像两个参数调换了一样

```js
var anyString = "Mozilla";

// 输出 "Moz"
console.log(anyString.substring(0,3));
console.log(anyString.substring(3,0));
console.log(anyString.substring(3,-3));
console.log(anyString.substring(3,NaN));
console.log(anyString.substring(-2,3));
console.log(anyString.substring(NaN,3));

// 输出 "lla"
console.log(anyString.substring(4,7));
console.log(anyString.substring(7,4));

// 输出 ""
console.log(anyString.substring(4,4));

// 输出 "Mozill"
console.log(anyString.substring(0,6));

// 输出 "Mozilla"
console.log(anyString.substring(0,7));
console.log(anyString.substring(0,10));
```

## padStart

- `str.padStart(targetLength [, padString])`
- 另一个字符串填充当前字符串

```js
'abc'.padStart(10);         // "       abc"
'abc'.padStart(10, "foo");  // "foofoofabc"
'abc'.padStart(6,"123465"); // "123abc"
'abc'.padStart(8, "0");     // "00000abc"
'abc'.padStart(1);          // "abc"
```

## padEnd

- `str.padEnd(targetLength [, padString])`
- 用一个字符串填充当前字符串

```js
'abc'.padEnd(10);          // "abc       "
'abc'.padEnd(10, "foo");   // "abcfoofoof"
'abc'.padEnd(6, "123456"); // "abc123"
'abc'.padEnd(1);           // "abc"
```

## startsWith

- `str.startsWith(searchString [, position]);`
- 用来判断当前字符串是否是以另外一个给定的子字符串“开头”的，根据判断结果返回 true 或 false。

```js
var str = "To be, or not to be, that is the question.";

str.startsWith("To be")        // true
str.startsWith("not to be")    // false
str.startsWith("not to be", 10) // true
```

## endsWith

- `str.endsWith(searchString [, position]);`
- `用来判断当前字符串是否是以另外一个给定的子字符串“结尾”的，根据判断结果返回 true 或 false。`

```js
var str = "To be, or not to be, that is the question.";

str.endsWith("question.")  // true
str.endsWith("to be")      // false
str.endsWith("to be", 19)  // true
```

## repeat

- `str.repeat(count)`返回一个新字符串

```js
"abc".repeat(0)      // ""
"abc".repeat(1)      // "abc"
"abc".repeat(2)      // "abcabc"
"abc".repeat(3.5)    // "abcabcabc" 参数count将会被自动转换成整数.
```

## includes

- 判断一个字符串是否包含另外一个字符串
- 区分大小写

```js
var str = 'To be, or not to be, that is the question.';

console.log(str.includes('To be'));       // true
console.log(str.includes('question'));    // true
console.log(str.includes('nonexistent')); // false
console.log(str.includes('To be', 1));    // false
console.log(str.includes('TO BE'));       // false
```

## normalize

- 返回字符串的指定Unicode规范化形式

```js

```
