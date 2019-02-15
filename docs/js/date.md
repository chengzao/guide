# 日期

## 静态方法

- 零点 `(1970年1月1日 00:00:00 UTC）`

### `Date.now()`

- 返回当前时间距离时间零点的毫秒数
- 相当于`Unix` 时间戳乘以`1000`

### `Date.parse(string)`

- `string: YYYY-MM-DDTHH:mm:ss.sssZ`
- `Z`表示时区
- 解析日期字符串，返回该时间距离时间零点
- 果解析失败，返回`NaN`

### `Date.UTC()`

- `Date.UTC(year, month[, date[, hrs[, min[, sec[, ms]]]]])`
- 接受参数，返回该时间距离时间零点的毫秒数

## get类方法

### `getTime()`

- 返回实例距离1970年1月1日00:00:00的毫秒数

### `getDay()`

- 返回星期几，星期日为0，星期一为1

### `getFullYear()`

- 返回四位的年份

### `getMonth()`

- 返回月份（0表示1月，11表示12月）

### `getDate()`

- 返回实例对象对应每个月的几号（从1开始）

### `getHours()`

- 返回小时（0-23）

### `getMilliseconds()`

- 返回毫秒（0-999）

### `getMinutes()`

- 返回分钟（0-59）

### `getSeconds()`

- 返回秒（0-59）

## set类方法

### `setFullYear(year [, month, date])`

- 设置四位年份

### `setMonth(month [, date])`

- 设置月份（0-11）

### `setDate(date)`

- 设置每个月的几号(1-31), 返回改变后毫秒时间戳

### `setHours(hour [, min, sec, ms])`

- 设置小时（0-23）

### `setMinutes(min [, sec, ms])`

- 设置分钟（0-59）

### `setSeconds(sec [, ms])`

- 设置秒（0-59）

### `setYear(year)`

- 设置距离1900年的年数

### `setTime(milliseconds)`

- 设置毫秒时间戳

### `setMilliseconds()`

- 设置毫秒（0-999）

## to类方法

### `Date.prototype.valueOf()`

- 返回实例对象距离时间零点的毫秒数
-	该方法等同于getTime方法

### `Date.prototype.toString()`

- 返回一个完整的日期字符串

### `Date.prototype.toUTCString()`

- 返回对应的 UTC 时间，也就是比北京时间晚8个小时

### `Date.prototype.toLocaleDateString()`

- 返回一个字符串，代表日期的当地写法（不含小时、分和秒）

### `Date.prototype.toLocaleTimeString()`

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
//第一种
window.setInterval(fn,1000);

//第二种
setInterval("fn()",1000); //兼容问题. self.setInterval("fn()",1000)
setInterval(fn,1000);
// 错误：setInterval(fn(),1000); //兼容问题. self.setInterval("fn()",1000)

//第三种
window.setInterval(function () {
  console.log("setInterval"+num);
  num++;
},1000);
```

## setTimeout

### 设置定时器名称

```js
 var  timer =  setInterval(fn,1000);
 var  timer =  setTimeout(fn,1000);
```

### 清除定时器

- `clearTimeout()`
- `clearInterval()`
- 要用定时器,先清定时器！

```js
clearInterval(定时器名)
clearTimeout(定时器名)
```

### 递归与arguments.callee

- 递归 : 函数自己调用自己.
- 要设置跳出循环的条件,如果不设置,容易发生死循环.

```js
var num = 0;
fn1();
function fn1(){
  num++;
  console.log(num);
  //递归：函数自己调用自己.
  if(num<5){
      setTimeout(fn1,1000);
      //setTimeout(arguments.callee,1000);
  }
}
```

- 返回正被执行的`Function`对调用时推荐使用函数递归`arguments.callee`代替函数名本身.
- `this`: 触动或调用函数的调用者.
- `arguments:callee` : 所在的函数体(等于直接调用函数名)

### 参考示例

```js
function User(login) {
  this.login = login;
  this.sayHi = function() {
    console.log(this.login);
  }
}

var user = new User('John');
setTimeout(user.sayHi, 1000);  //undefined

// 1.0
setTimeout(function() {
  user.sayHi(); // John
}, 1000);

//1.1
setTimeout(user.sayHi.bind(user), 1000); // John
```
