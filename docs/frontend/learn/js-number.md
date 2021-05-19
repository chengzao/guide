---
title: 基本数据类型-Number
date: 2020-07-20
sidebar: "auto"
categories:
  - frontend
---

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

- baseConverter

```js
function baseConverter(decNumber, base) {
  const remStack = [];
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let number = decNumber;
  let rem;
  let baseString = '';

  if (!(base >= 2 && base <= 36)) {
    return '';
  }

  while (number > 0) {
    rem = Math.floor(number % base);
    remStack.push(rem);
    number = Math.floor(number / base);
  }

  while (remStack.length > 0) {
    baseString += digits[remStack.pop()];
  }
  return baseString;
}
```

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
