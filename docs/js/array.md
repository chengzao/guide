# 数组

## in运算符

- `in`运算符用于检查对象是否包含某个属性(注意:检查的是键名,不是键值),
- 如果包含就返回`true`,否则返回`false`

```js
var o = { p: 1 };
'p' in o // true

// 假设变量x未定义
// 写法一：报错
if (x) { return 1; }
// 写法二：不正确
if (window.x) { return 1; }
// 写法三：正确
if ('x' in window) { return 1; }
```

- `in`它不能识别对象继承的属性

```js
var o = new Object();
o.hasOwnProperty('toString') // false
'toString' in o // true
```

## isArray

- `Array.isArray(option)` 返回一个布尔值，表示参数是否为数组

## 类数组转数组

- `Array.prototype.slice.call(arguments)`
- `Array.from(arguments)`

``` js
Array.prototype.slice.apply({0:1,length:1})
Array.prototype.slice.apply({0:1})
Array.prototype.slice.apply({0:1,length:2})
Array.prototype.slice.apply({length:1})
Array.prototype.slice.call(arguments)
Array.prototype.concat.apply([], arguments)
```

## 会改变原数组

### `pop()`

删除数组的最后一个元素, 并返回该元素

### `push()`

向数组最后添加一个或多个元素，返回新数组的长度

### `shift()`

用于删除数组的第一个元素，并返回该元素

### `unshift()`

在数组第一个位置添加元素，返回新数组的长度

### `reverse()`

用于颠倒排列数组元素，返回改变后的数组

### `splice()`

删除原数组部分成员, 并可以在删除的位置添加新成员,返回被删除的元素

```js
// start 起始位置
// count 被删除的元素个数
// addEle1 被插入数组的新元素
arr.splice(start, count, addEle1, ...);

// 如果插入元素，则splice的第二个参数设为0即可
var a = [1, 1, 1]; a.splice(1, 0, 2)
```

### `sort()`

对数组成员进行排序 (`默认是按照字典顺序排序`)

```js
// 可以传入一个函数作为参数
//小-大：
function (a, b) {return a - b;}

// 大-小：
function (a, b) {return b - a;}
```

## 原数组不变

### `concat()`

- 用于多个数组的合并,返回一个新数组
- 如果数组成员包括对象，`concat`方法返回当前数组的一个浅拷贝
- `“浅拷贝”`，指的是新数组拷贝的是对象的引用

### `slice(start, end)`

- 用于提取目标数组的一部分，返回一个新数组

### `join()`

- 以指定参数作为分隔符，连接所有数组成员, 返回字符串
- 如果不提供参数，默认用逗号分隔
- 如果数组成员是undefined或null或空位，会被转成空字符串
- 通过call方法，该方法可用于分隔字符串或类似数组的对象 `Array.prototype.join.call('hello', '-')`

## reduce

- `reduce(callback(options)[, initialValue])`
  - `options`
    - `accumulator` 累加器累加回调的返回值
    - `currentValue` 数组中正在处理的元素
    - `currentIndex` 数组中正在处理的当前元素的索引(可选参数)
    - `array`  调用`reduce()`的数组(可选参数)
  - `initialValue`
    - 用作第一次调用 callback函数时的第一个参数的值
    - 如果没有提供初始值，则将使用数组中的第一个元素

## valueOf与toString

- `toString()`方法返回数组的字符串形式
- `valueOf()`方法返回数组本身

## map

- `map(callback(options)[,thisArg])` 返回新数组
- `options: (elem, index)`

## indexOf与lastIndexOf

- `indexOf()`返回元素第一次出现的位置，没有则返回`-1`
- `indexOf()`方法接受第二个参数，表示搜索的开始位置
- `lastIndexOf()`返回元素最后一次出现的位置，没有则返回`-1`
- 两个方法不能用来搜索NaN的位置

## filter

- `filter(callback(element[, index[, array]])[, thisArg])`
- 过滤数组成员，满足条件的成员组成一个新数组返回

## forEach

- `forEach(callback(options)[,thisArg])` 不返回值，只用来操作数据
- `options: (elem, index)`

## every

- `every(callback[, thisArg])`
- 所有成员的返回值都是`true`，整个`every`方法才返回`true`，否则返回`false`

## some

- `some(callback[, thisArg])`
- 只要一个成员的返回值是`true`，则整个some方法的返回值就是`true`，否则返回`false`

## 创建数组

```js
var arr = new Array();//创建好了一个数组
var arr = [];
//(1)
var arr = new Array([1,2,3]);
//(2)
var arr = [1,2,3];
//(3)
var arr = new Array();
arr = [1,2,3];
```

### 添加成员

```js
var arr = [1,2,3];
arr[3]=4;
```

### 访问成员

- `arr[index]` index从`0`开始计算

```js
var arr = [1,2,3];
arr[0];  //1

var arr = new Array([1,2,3]);
arr[0][3]=4  //添加成员
arr[0][1]    //2   访问成员
```

### 属性绑定

```js
var arr = [1,2,3];
arr.aaa = "hello world";
console.log(arr.aaa);
```

### for循环数组

```js
var arr = [1,2,3];
// 不推荐
for(var i = 0 ;i < arr.length ; i++){
  console.log(arr[i]);
}
// 推荐
for(var i = 0 arrL=arr.length;i < arrL ; i++){
  console.log(arr[i]);
}
```

### while

```js
// while循环
var i = 0;
while (i < a.length) {
  console.log(a[i]);
  i++;
}

var l = a.length;
while (l--) {
  console.log(a[l]);
}
```
