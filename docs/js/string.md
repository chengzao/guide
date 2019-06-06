# 字符串

## `fromCharCode`

- `String.fromCharCode(num1, ..., numN)`
- 一组序列数字，表示 Unicode 值
- 返回值是这些码点组成的字符串

<CodeBlock>

```js
String.fromCharCode(65,66,67) // "ABC"
```

</CodeBlock>

## `charAt`

- `String.prototype.charAt()`
- 一个介于0 和字符串长度减1之间的整数, 如果没有提供索引，`charAt()` 将使用0
- 从0开始编号的位置, 返回指定位置的字符
- 参数为负数，或大于等于字符串的长度，charAt返回空字符串

<CodeBlock>

```js
var anyString = "Brave new world";
anyString.charAt() // "B"
anyString.charAt(0) // "B"
```

</CodeBlock>

## `charCodeAt`

- `String.prototype.charCodeAt`
- 返回字符串指定位置的 Unicode 码点（十进制表示）

<CodeBlock>

```js
"ABC".charCodeAt(0) // 65
"ABC".charCodeAt(1) // 66
"ABC".charCodeAt(2) // 67
"ABC".charCodeAt(3) // NaN
```

</CodeBlock>

## `concat`

- `str.concat(string2, string3[, ..., stringN])`
- 连接两个字符串，返回一个新字符串，不改变原字符串
- 参数不是字符串，concat方法会将其先转为字符串，然后再连接

<CodeBlock>

```js
var hello = "Hello, ";
hello.concat("Kevin", " have a nice day.")
// "Hello, Kevin have a nice day."

var hello = "Hello, ";
hello.concat("Kevin", " have a nice day.", ['A', 'C'])
// "Hello, Kevin have a nice day.A,C"
```

</CodeBlock>

## `slice`

- `String.prototype.slice(start, end)`
- 截取字符串, 不改变原字符串
- 省略第二个参数，则表示子字符串一直到原字符串结束
- 参数是负值，表示从结尾开始倒数计算的位置
- 第一个参数大于第二个参数，slice方法返回一个空字符串

<CodeBlock>

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

</CodeBlock>

## `trim`

- `String.prototype.trim()`
- 除字符串两端的空格，返回一个新字符串，不改变原字符串

<CodeBlock>

```js
var orig = '   foo  ';
orig.trim() // 'foo'
```

</CodeBlock>

## `match`

- `String.prototype.match()`
- 确定原字符串是否匹配某个字符串，返回一个数组
- 没有, 则返回`null`

<CodeBlock>

```js
var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
var regexp = /[A-E]/gi;
var matches_array = str.match(regexp);
// ["A", "B", "C", "D", "E", "a", "b", "c", "d", "e"]

var str = "Hello, world!"
var res = str.match('!')
// ["!", index: 12, input: "Hello, world!", groups: undefined]
```

</CodeBlock>

## `search`

- `str.search(regexp)`
- 返回值为匹配的第一个位置
- 没有, 则返回-1

<CodeBlock>

```js
var str = "Hello, world!"
var res = str.search('!')
res // 12
```

</CodeBlock>

## `replace`

- `str.replace(regexp|substr, newSubStr|function)`
- 匹配替换匹配到的第一个字符串

<CodeBlock>

```js
var p = 'Hello, world!';
var regex = /Hello/gi;

p.replace(regex, 'Hi') // "Hi, world!"
```

</CodeBlock>

## `split`

- `str.split([separator[, limit]])`
- 分割字符串，返回数组
- 第二个参数，决定了返回数组的成员数

<CodeBlock>

```js
var p = 'Hello, world!';
var res = p.split(' ')
res // ["Hello,", "world!"]

var myString = "Hello World. How are you doing?";
var splits = myString.split(" ", 3);
splits // ["Hello", "World.", "How"]
```

</CodeBlock>

## `toLowerCase`

- `str.toLowerCase()`
- 字符串全部转为小写，不改变原字符串

<CodeBlock>

```js
'中文简体 zh-CN || zh-Hans'.toLowerCase() // "中文简体 zh-cn || zh-hans"
```

</CodeBlock>

## `toUpperCase`

- `String.prototype.toUpperCase()`
- 字符串全部转为大写，不改变原字符串

<CodeBlock>

```js
'中文简体 zh-CN || zh-Hans'.toUpperCase() // "中文简体 ZH-CN || ZH-HANS"
```

</CodeBlock>

## `indexOf`

- `String.prototype.indexOf()`
- 返回字符第一次出现的位置，返回-1表示不匹配

<CodeBlock>

```js
"Blue Whale".indexOf("Blue"); // 0
"Hello, world!".indexOf("o"); // 4
```

</CodeBlock>

## `lastIndexOf`

- `String.prototype.lastIndexOf()`
- 返回字符最后一次出现的位置，返回-1表示不匹配

<CodeBlock>

```js
"Blue Whale".lastIndexOf("Blue"); // 0
"Hello, world!".lastIndexOf("o"); // 8
```

</CodeBlock>

## `length`

- `String.prototype.length`
- 返回字符串的长度

<CodeBlock>

```js
("Blue Whale").length; // 10
```

</CodeBlock>

## `[Symbol.iterator]()`

- `[@@iterator]()` 方法返回一个新的Iterator对象

<CodeBlock>

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

</CodeBlock>

## 字符串的扩展

- 字符的 Unicode 表示法 (将码点放入大括号)

<CodeBlock>

```js
"\u0061" // "a"
"\u20BB7" // "₻7"
"\u{20BB7}" // "𠮷"
```

</CodeBlock>

## substr

- `str.substr(start[, length])`
- 返回一个字符串中从指定位置开始到指定字符数的字符

<CodeBlock>

```js
var str = "abcdefghij";
str.substr(1,2) // "bc"

var str = "abcdefghij";
str.substr(-3) // "hij"
```

</CodeBlock>

## padStart

- `str.padStart(targetLength [, padString])`
- 另一个字符串填充当前字符串

<CodeBlock>

```js
'abc'.padStart(10);         // "       abc"
'abc'.padStart(10, "foo");  // "foofoofabc"
'abc'.padStart(6,"123465"); // "123abc"
'abc'.padStart(8, "0");     // "00000abc"
'abc'.padStart(1);          // "abc"
```

</CodeBlock>

## padEnd

- `str.padEnd(targetLength [, padString])`
- 用一个字符串填充当前字符串

<CodeBlock>

```js
'abc'.padEnd(10);          // "abc       "
'abc'.padEnd(10, "foo");   // "abcfoofoof"
'abc'.padEnd(6, "123456"); // "abc123"
'abc'.padEnd(1);           // "abc"
```

</CodeBlock>

## startsWith

- `str.startsWith(searchString [, position]);`
- 用来判断当前字符串是否是以另外一个给定的子字符串“开头”的，根据判断结果返回 true 或 false。

<CodeBlock>

```js
var str = "To be, or not to be, that is the question.";

str.startsWith("To be")        // true
str.startsWith("not to be")    // false
str.startsWith("not to be", 10) // true
```

</CodeBlock>

## endsWith

- `str.endsWith(searchString [, position]);`
- `用来判断当前字符串是否是以另外一个给定的子字符串“结尾”的，根据判断结果返回 true 或 false。`

<CodeBlock>

```js
var str = "To be, or not to be, that is the question.";

str.endsWith("question.")  // true
str.endsWith("to be")      // false
str.endsWith("to be", 19)  // true
```

</CodeBlock>
