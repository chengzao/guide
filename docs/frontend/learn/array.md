---
title: Array数组
date: 2020-07-20
sidebar: "auto"
tags:
  - array
categories:
  - frontend
---

:::tip

[MDN/Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)

:::

## in 运算符

- `in`运算符用于检查对象是否包含某个属性(注意:检查的是键名,不是键值),
- 如果包含就返回`true`,否则返回`false`



```js
var o = { p: 1 };
"p" in o; // true

// 假设变量x未定义
// 写法一：报错
if (x) {
  return 1;
}
// 写法二：不正确
if (window.x) {
  return 1;
}
// 写法三：正确
if ("x" in window) {
  return 1;
}
```



- `in`它不能识别对象继承的属性



```js
var o = new Object();
o.hasOwnProperty("toString"); // false
"toString" in o; // true
```



## isArray

- `Array.isArray(option)` 返回一个布尔值，表示参数是否为数组



```js
Array.isArray([1, 2, 3]); // true
Array.isArray({ foo: 123 }); // false
Array.isArray("foobar"); // false
Array.isArray(undefined); // false
```



## Array.of

- 创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型
- `Array.of(element0[, element1[, ...[, elementN]]])`



```js
Array.of(7); // [7]
Array.of(1, 2, 3); // [1, 2, 3]

Array(7); // [ , , , , , , ]
Array(1, 2, 3); // [1, 2, 3]
```



## includes

- `arr.includes(valueToFind[, fromIndex])`
- 用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回 false



```js
[1, 2, 3].includes(2); // true
[1, 2, 3].includes(4); // false
[1, 2, 3].includes(3, 3); // false
[1, 2, 3].includes(3, -1); // true
[1, 2, NaN].includes(NaN); // true
```



## Array.from

- 类数组转数组`Array.prototype.slice.call(arguments)`
- 类数组转数组`Array.from(arguments)`



```js
Array.prototype.slice.apply({ 0: 1, length: 1 });
Array.prototype.slice.apply({ 0: 1 });
Array.prototype.slice.apply({ 0: 1, length: 2 });
Array.prototype.slice.apply({ length: 1 });
Array.prototype.slice.call(arguments);
Array.prototype.concat.apply([], arguments);

Array.from("foo"); // ["f", "o", "o"]
Array.from([1, 2, 3], x => x + x); // [2, 4, 6]

var s = new Set(["foo", window]);
Array.from(s); // ["foo", Window]

var m = new Map([
  [1, 2],
  [2, 4],
  [4, 8]
]);
Array.from(m); // [[1, 2], [2, 4], [4, 8]]
```



### 类数组转数组

```js
Array.prototype.slice.call(arguments);
Array.prototype.concat.apply([], arguments);
```

## 会改变原数组

### `pop`

删除数组的最后一个元素, 并返回该元素



```js
var arr = ["a", "b", "c", "d"];
var newArr = arr.pop();
newArr; // "d"
arr; // ["a", "b", "c"]
```



### `push`

向数组最后添加一个或多个元素，返回新数组的长度



```js
var arr = ["a", "b", "c", "d"];
var newArr = arr.push("e");
newArr; // 5
arr; // ["a", "b", "c", "d", "e"]
```



### `shift`

用于删除数组的第一个元素，并返回该元素



```js
var arr = ["a", "b", "c", "d"];
var newArr = arr.shift();
newArr; // "a"
arr; // ["b", "c", "d"]
```



### `unshift`

在数组第一个位置添加元素，返回新数组的长度



```js
var arr = ["a", "b", "c", "d"];
var newArr = arr.unshift("e");
newArr; // 5
arr; // ["e", "a", "b", "c", "d"]
```



### `reverse`

用于颠倒排列数组元素，返回改变后的数组



```js
var arr = ["a", "b", "c", "d"];
var newArr = arr.reverse();
newArr; // ["d", "c", "b", "a"]
arr; // ["d", "c", "b", "a"]
```



### `splice`

删除原数组部分成员, 并可以在删除的位置添加新成员,返回被删除的元素



```js
// start 起始位置
// count 被删除的元素个数
// addEle1 被插入数组的新元素
arr.splice(start, count, addEle1, ...);

var arr = ['a', 'b', 'c', 'd'];
var newArr = arr.splice(1, 2, 'e');
newArr // ["b", "c"]
arr // ["a", "e", "d"]

// 如果插入元素，则splice的第二个参数设为0即可
var arr = ['a', 'b', 'c', 'd'];
var newArr = arr.splice(1, 0, 'e');
newArr // []
arr // ["a", "e", "b", "c", "d"]
```



### `sort`

对数组成员进行排序 (`默认是按照字典顺序排序`)



```js
// 可以传入一个函数作为参数
//小-大：
function (a, b) {return a - b;}

var arr = ['4', '2', '1', '3'];
var newArr = arr.sort(function(a,b){return a-b;});
newArr // ["1", "2", "3", "4"]
arr // ["1", "2", "3", "4"]

// 大-小：
function (a, b) {return b - a;}

var arr = [{id: 4}, {id: 2}, {id: 1}, {id: 3}];
var newArr = arr.sort(function(a,b){return b.id-a.id;});
newArr // [{id: 4}, {id: 3}, {id: 2}, {id: 1}]
arr // [[{id: 4}, {id: 3}, {id: 2}, {id: 1}]
```



### fill

- `arr.fill(value[, start[, end]])`
- 方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素
- 不包括终止索引



```js
var arr = ["a", "b", 1, 2];
var newArr = arr.fill(2);
newArr; // [2, 2, 2, 2]
arr; // [2, 2, 2, 2]

var arr = ["a", "b", 1, 2];
var newArr = arr.fill("m", 0, 2);
newArr; // ["m", "m", 1, 2]
arr; // ["m", "m", 1, 2]

Array(3).fill("Ab"); // ["Ab", "Ab", "Ab"]
```



## 原数组不变

### `concat`

- 用于多个数组的合并,返回一个新数组
- 如果数组成员包括对象，`concat`方法返回当前数组的一个浅拷贝
- `“浅拷贝”`，指的是新数组拷贝的是对象的引用



```js
var arr1 = ["a", 2],
  arr2 = [2, "c"],
  arr3 = [{ name: "a" }, { name: "d" }];

var newArr = arr1.concat(arr2, arr3);
newArr; //  ["a", 2, 2, "c", {"name": "a"}, {"name": "d"}]
arr1; // ["a", 2]

// 浅拷贝
var newArr2 = arr3;
newArr2[0].name = "Hello";
newArr2; // [{"name": "hello"}, {"name": "d"}];
arr3; // [{"name": "hello"}, {"name": "d"}];

// 浅拷贝
var arr = [{ name: "a" }, { name: "d" }];
var copy = [].concat(arr);
copy[0].name = "world";
copy; // [{"name": "word"}, {"name": "d"}]
arr; // [{"name": "word"}, {"name": "d"}]

// concat 深拷贝
var arr1 = ["1", "2", "3"];
var arr2 = arr1.concat();
arr2[1] = "9";
arr1; // ["1", "2", "3"]
arr2; // ["1", "9", "3"]

// slice 深拷贝
var arr1 = ["1", "2", "3"];
var arr2 = arr1.slice();
arr2[1] = "9";
arr1; // ["1", "2", "3"]
arr2; // ["1", "9", "3"]
```



### slice

- `slice(start, end)`用于提取目标数组的一部分，返回一个新数组



```js
var arr = ["a", "b", "c", "d"];
var newArr = arr.slice(1, 12);
newArr; // ["b"]
arr; // ["a", "b", "c", "d"]

var arr = ["a", "b", "c", "d"];
var newArr = arr.slice(1, 12);
newArr; // ["b", "c", "d"]
arr; // ["a", "b", "c", "d"]

var arr = ["a", "b", "c", "d"];
var newArr = arr.slice(-1, 4);
newArr; // ["d"]
arr; // ["a", "b", "c", "d"]

var arr = ["a", "b", "c", "d"];
var newArr = arr.slice(-2, 3);
newArr; // ["c"]
arr; // ["a", "b", "c", "d"]

// 使用 Array.slice(0) 实现数组浅拷贝
var arr = [1, 2, 3, 4];
var arr2 = arr.slice(0);
```



### join

- 以指定参数作为分隔符，连接所有数组成员, 返回字符串



```js
var arr = ["a", "b", "c", "d"];
var newArr = arr.join("#");
newArr; // "a#b#c#d"
arr; // ["a", "b", "c", "d"]
```



- 如果不提供参数，默认用逗号分隔



```js
var arr = ["a", "b", "c", "d"];
var newArr = arr.join();
newArr; // "a,b,c,d"
arr; // ["a", "b", "c", "d"]
```



- 如果数组成员是 undefined 或 null 或空位，会被转成空字符串



```js
var arr = ["a", "b", null, "c", undefined, "d", , "e"];
var newArr = arr.join("@");
newArr; // "a@b@@c@@d@@e"
arr; // ["a", "b", "c", "d"]
```



- 通过 call 方法，该方法可用于分隔字符串或类似数组的对象



```js
Array.prototype.join.call("hello", "-"); // "h-e-l-l-o"
```



### flat

- `arr.flat(depth)`
- 会递归到指定深度将所有子数组连接，并返回一个新数组
- 方法会移除数组中的空项



```js
var arr = [1, 2, [3, 4]];
var newArr = arr.flat();
newArr; // [1, 2, 3, 4]
arr; // [1, 2, [3, 4]]

var arr = [1, 2, [3, 4, [5, 6]]];
var newArr = arr.flat(2);
newArr; // [1, 2, 3, 4, 5, 6]
arr; // [1, 2, [3, 4, [5, 6]]]
```



### flatMap

- `arr.flatMap(function callback(currentValue[, index[, array]])`



```js
var arr = [1, 2, 3, 4];
arr.map(x => [x * 2]); // [[2], [4], [6], [8]]

var arr = [1, 2, 3, 4];
arr.flatMap(x => [x * 2]); // [2, 4, 6, 8]

var arr = ["今天天气不错", "", "早上好"];
arr.map(s => s.split(""));
// [["今", "天", "天", "气", "不", "错"],[""],["早", "上", "好"]]

var arr = ["今天天气不错", "", "早上好"];
arr.flatMap(s => s.split(""));
// ["今", "天", "天", "气", "不", "错", "早", "上", "好"]
```



## reduce

- `reduce(callback(options)[, initialValue])`
  - `options`
    - `accumulator` 累加器累加回调的返回值
    - `currentValue` 数组中正在处理的元素
    - `currentIndex` 数组中正在处理的当前元素的索引(可选参数)
    - `array` 调用`reduce()`的数组(可选参数)
  - `initialValue`
    - 用作第一次调用 callback 函数时的第一个参数的值
    - 如果没有提供初始值，则将使用数组中的第一个元素



```js
var arr = [1, 2, 3, 4];
var newArr = arr.reduce(function(pre, cur) {
  return pre + cur;
}, 10);
newArr; // 20
```



- 实现

```js
function reduce(arr, reduceCallback, initialValue) {
  if (!Array.isArray(arr) || !arr.length || typeof reduceCallback !== 'function'){
    return [];
  } else {
    let hasInitialValue = initialValue !== undefined;
    let value = hasInitialValue ? initialValue : arr[0];
    // 如果有传递 initialValue，则索引从 1 开始，否则从 0 开始
    for (let i = hasInitialValue ? 0 : 1, len = arr.length; i < len; i++) {
      value = reduceCallback(value, arr[i], i, arr);
    }
    return value;
  }
}

Array.prototype.mReduce = function(fn, initial){
  let result = initial;
  let index = 0;
  if(initial == undefined){
    result = this[index]
    index++
  }
  while(index<this.length){
    result = fn(result, this[i])
  }
}
```

## valueOf 与 toString

- `toString()`方法返回数组的字符串形式
- `valueOf()`方法返回数组本身



```js
var arr = ["a", "b", 3, 4];
arr.toString(); // "a,b,3,4"
arr.valueOf(); // ['a', 'b', 3, 4]
```



## map

- `map(callback(options)[,thisArg])` 返回新数组
- `options: (elem, index)`



```js
var arr = ["a", "b", 3, 4];
arr.map(function(item, index) {
  console.log(item, index);
});

// a 0
// b 1
// 3 2
// 4 3

var arr = [1, 2, 3, 4];
var newArr = arr.map(function(item, index) {
  return item + 1;
});
newArr; // [2, 3, 4, 5]
arr; // [1, 2, 3, 4]
```



- 实现map

```js
function map(arr, mapCallback) {
  if (!Array.isArray(arr) || !arr.length || typeof mapCallback !== 'function') {
    return [];
  } else {
    let result = [];
    for (let i = 0, len = arr.length; i < len; i++) {
      result.push(mapCallback(arr[i], i, arr));
    }
    return result;
  }
}
```

## indexOf 与 lastIndexOf

- `indexOf()`返回元素第一次出现的位置，没有则返回`-1`



```js
var arr = ["a", "b", 3, 4];
arr.indexOf("b"); // 1
arr.indexOf("c"); // -1
```



- `indexOf()`方法接受第二个参数，表示搜索的开始位置



```js
var arr = ["a", "b", 3, 4];
arr.indexOf("b", 1); // 1
arr.indexOf("b", 2); // -1
```



- `lastIndexOf()`返回元素最后一次出现的位置，没有则返回`-1`



```js
var arr = ["a", 3, "b", 3, 4];
arr.lastIndexOf(3); // 3
arr.lastIndexOf(3, 1); // 1
```



- 两个方法不能用来搜索 NaN 的位置



```js
var arr = ["a", NaN, "b", null, "c", undefined, "d"];
arr.indexOf(NaN); // -1 不能正确搜索到结果
arr.indexOf(null); // 3
arr.indexOf(undefined); // 5
```



## filter

- `filter(callback(element[, index[, array]])[, thisArg])`
- 过滤数组成员，满足条件的成员组成一个新数组返回



```js
var arr = [1, 3, 9, 4, 2, 6];
var newArr = arr.filter((element, index) => {
  return element > 4;
});
newArr; // [9, 6]
arr; // [1, 3, 9, 4, 2, 6]
```



- 实现

```js
function filter(arr, filterCallback) {
  if (!Array.isArray(arr) || !arr.length || typeof filterCallback !== 'function')
  {
    return [];
  } else {
    let result = [];
    for (let i = 0, len = arr.length; i < len; i++) {
      if (filterCallback(arr[i], i, arr)) {
        result.push(arr[i]);
      }
    }
    return result;
  }
}
```

## forEach

- `forEach(callback(elem, index)[,thisArg])` 不返回值，只用来操作数据



```js
var array1 = ["a", "b", "c"];

array1.forEach(function(element, index) {
  console.log(element, index);
});

// a 0
// b 1
// c 2
```



## every

- `every(callback[, thisArg])`
- 所有成员的返回值都是`true`，整个`every`方法才返回`true`，否则返回`false`



```js
var arr = [1, 30, 39, 29, 10, 13];
var res = arr.every(function(ele) {
  return ele < 40;
});

res; // true
```



## some

- `some(callback[, thisArg])`
- 只要一个成员的返回值是`true`，则整个 some 方法的返回值就是`true`，否则返回`false`



```js
var array = [1, 2, 3, 4, 5];
var res = array.some(function(ele) {
  return ele % 2 === 0;
});

res; // true
```



## `[Symbol.iterator]()`



```js
var arr = ["w", "y", "k"];
var eArr = arr[Symbol.iterator]();
for (let letter of eArr) {
  console.log(letter); // w , y , k
}

var arr = ["w", "y", "k"];
var eArr = arr[Symbol.iterator]();
eArr.next(); // {value: "w", done: false}
eArr.next(); // {value: "y", done: false}
eArr.next(); // {value: "k", done: false}
eArr.next(); // {value: undefined, done: false}
```



## 创建数组



```js
var arr = new Array(); //创建好了一个数组
var arr = [];
//(1)
var arr = new Array([1, 2, 3]);
//(2)
var arr = [1, 2, 3];
//(3)
var arr = new Array();
arr = [1, 2, 3];
```



### 添加成员



```js
var arr = [1, 2, 3];
arr[3] = 4;
```



### 访问成员

- `arr[index]` index 从`0`开始计算



```js
var arr = [1, 2, 3];
arr[0]; //1

var arr = new Array([1, 2, 3]);
arr[0][3] = 4; //添加成员
arr[0][1]; //2   访问成员
```



### 属性绑定



```js
var arr = [1, 2, 3];
arr.aaa = "hello world";
console.log(arr.aaa);
```



### for 循环数组



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
// func1
var arr = ["a", "b", "c", "d"];
var i = 0;
while (i < arr.length) {
  console.log(arr[i]); // a,b,c,d
  i++;
}

// func2
var arr = ["a", "b", "c", "d"];
var l = arr.length;
while (l--) {
  console.log(arr[l]); // d,c,b,a
}
```



## 相关链接

- [JavaScript 专题之深浅拷贝](https://github.com/mqyqingfeng/Blog/issues/32)
