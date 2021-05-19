---
title: Date日期
date: 2020-07-20
sidebar: "auto"
tags:
  - Date
categories:
  - frontend
---

:::tip

[MDN/Date](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date)

:::

## 静态方法

- 零点 `(1970年1月1日 00:00:00 UTC）`

### Date.now

- 返回当前时间距离时间零点的毫秒数
- 相当于`Unix` 时间戳乘以`1000`
- `Date.now()`

### Date.parse

- `string: YYYY-MM-DDTHH:mm:ss.sssZ`
- `Z`表示时区
- 解析日期字符串，返回该时间距离时间零点
- 果解析失败，返回`NaN`
- `Date.parse(string)`

### Date.UTC

- `Date.UTC(year, month[, date[, hrs[, min[, sec[, ms]]]]])`
- 接受参数，返回该时间距离时间零点的毫秒数

## get 类方法

### getTime

- 返回实例距离 1970 年 1 月 1 日 00:00:00 的毫秒数

### getDay

- 返回星期几，星期日为 0，星期一为 1

### getFullYear

- 返回四位的年份

### getMonth

- 返回月份（0 表示 1 月，11 表示 12 月）

### getDate

- 返回实例对象对应每个月的几号（从 1 开始）

### getHours

- 返回小时（0-23）

### getMilliseconds

- 返回毫秒（0-999）

### getMinutes

- 返回分钟（0-59）

### getSeconds

- 返回秒（0-59）

## set 类方法

### setFullYear

- `setFullYear(year [, month, date])`
- 设置四位年份

### setMonth

- `setMonth(month [, date])`
- 设置月份（0-11）

### setDate

- `setDate(date)`
- 设置每个月的几号(1-31), 返回改变后毫秒时间戳

### setHours

- `setHours(hour [, min, sec, ms])`
- 设置小时（0-23）

### setMinutes

- `setMinutes(min [, sec, ms])`
- 设置分钟（0-59）

### setSeconds

- `setSeconds(sec [, ms])`
- 设置秒（0-59）

### setYear

- `setYear(year)`
- 设置距离 1900 年的年数

### setTime

- `setTime(milliseconds)`
- 设置毫秒时间戳

### setMilliseconds

- `setMilliseconds()`
- 设置毫秒（0-999）

## to 类方法

### valueOf

- `Date.prototype.valueOf()`
- 返回实例对象距离时间零点的毫秒数
- 该方法等同于 getTime 方法

### toString

- `Date.prototype.toString()`
- 返回一个完整的日期字符串

### toUTCString

- `Date.prototype.toUTCString()`
- 返回对应的 UTC 时间，也就是比北京时间晚 8 个小时

### toLocaleDateString

- `Date.prototype.toLocaleDateString()`
- 返回一个字符串，代表日期的当地写法（不含小时、分和秒）

### toLocaleTimeString

- `Date.prototype.toLocaleTimeString()`

- 返回一个字符串，代表时间的当地写法（不含年月日）

## setInterval

- `window.setInterval( 函数名,毫秒值 )`(通常省略`window`)

```js
setInterval(fn,1000);
setInterval("fn()",1000);
self.setInterval();  //兼容性强一些.
setInterval(functong fn(){},1000);

var num = 1;
function fn(){
   console.log("setInterval"+num);
   num++;
}
```

```js
//第一种
window.setInterval(fn, 1000);

//第二种
setInterval("fn()", 1000); //兼容问题. self.setInterval("fn()",1000)
setInterval(fn, 1000); // 错误：setInterval(fn(),1000); //兼容问题. self.setInterval("fn()",1000)

//第三种
window.setInterval(function() {
  console.log("setInterval" + num);
  num++;
}, 1000);
```

## setTimeout

### 设置定时器名称

```js
var timer = setInterval(fn, 1000);
var timer = setTimeout(fn, 1000);
```

### 清除定时器

- `clearTimeout()`
- `clearInterval()`
- 要用定时器,先清定时器！

```js
clearInterval(定时器名);
clearTimeout(定时器名);
```

### 用 setTimeout 来实现 setInterval

```js
function callback() {
  //doSomething
  setTimeout(callback, 200);
}
setTimeout(callback, 200);
```

### 递归与 arguments.callee

- 递归 : 函数自己调用自己.
- 要设置跳出循环的条件,如果不设置,容易发生死循环.

```js
var num = 0;
fn1();
function fn1() {
  num++;
  console.log(num);
  //递归：函数自己调用自己.
  if (num < 5) {
    setTimeout(fn1, 1000);
    //setTimeout(arguments.callee,1000);
  }
}
```

- 返回正被执行的`Function`对调用时推荐使用函数递归`arguments.callee`代替函数名本身.
- `this`: 触动或调用函数的调用者.
- `arguments:callee` : 所在的函数体(等于直接调用函数名)

```js
function User(login) {
  this.login = login;
  this.sayHi = function() {
    console.log(this.login);
  };
}

var user = new User("John");
setTimeout(user.sayHi, 1000); //undefined

// 1.0
setTimeout(function() {
  user.sayHi(); // John
}, 1000);

//1.1
setTimeout(user.sayHi.bind(user), 1000); // John
```

## formateTime

```js
module.exports = {
  formatDateTime(time, fmt) {
    var date = new Date(time)
    var o = {
      'Y+': date.getFullYear(), // 年
      'M+': date.getMonth() + 1, // 月份
      'D+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds(), // 毫秒
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          o[k] < 10 ? '0' + o[k] : o[k],
        )
      }
    }
    return fmt
  }
}
```

## formateDate

```js
const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return (
    [year, month, day].map(formatNumber).join("/") +
    " " +
    [hour, minute, second].map(formatNumber).join(":")
  );
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : "0" + n;
};
```
