---
title: 基本数据类型-Math
date: 2020-07-20
sidebar: "auto"
---

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
