---
title: object对象
date: 2020-07-20
sidebar: "auto"
tags:
  - object
categories:
  - frontend
---

:::tip

[MDN/Object](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)

:::

## Object.create

- `Object.create(proto[, propertiesObject])`
- 该方法可以指定原型对象和属性，返回一个新的对象

```js
// 创建一个原型为null的空对象
var o1 = Object.create(null);

// 创建一个可写的,可枚举的,可配置的属性p
var o2 = Object.create(
  {},
  {
    p: {
      value: 42,
      writable: true,
      enumerable: true,
      configurable: true
    }
  }
);

console.log(o1); // {p: 42}
```

- 单体继承

```js
//父类(superclass)
function Shape() {
  this.x = 0;
  this.y = 0;
}

// 父类的方法
Shape.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  console.info("Shape moved.");
};

// 子类(subclass)
function Rectangle() {
  Shape.call(this); // call super constructor.
}

// 子类续承父类
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

var rect = new Rectangle();

console.log(rect instanceof Rectangle); // true
console.log(rect instanceof Shape); // true
console.log(Shape.prototype.isPrototypeOf(rect)); // true
rect.move(1, 1); // 'Shape moved.'
```

- 继承多个对象

```js
function SuperClass() {}
function OtherSuperClass() {}

function MyClass() {
  SuperClass.call(this);
  OtherSuperClass.call(this);
}

// 继承一个类
MyClass.prototype = Object.create(SuperClass.prototype);
// 混合其它
Object.assign(MyClass.prototype, OtherSuperClass.prototype);
// 重新指定constructor
MyClass.prototype.constructor = MyClass;

MyClass.prototype.myMethod = function() {
  // do a thing
};
```

- [MDN: Object.create Polyfill](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)

```js
if (typeof Object.create !== "function") {
  Object.create = function(proto, propertiesObject) {
    if (typeof proto !== "object" && typeof proto !== "function") {
      throw new TypeError("Object prototype may only be an Object: " + proto);
    } else if (proto === null) {
      throw new Error(
        "This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument."
      );
    }

    if (typeof propertiesObject != "undefined")
      throw new Error(
        "This browser's implementation of Object.create is a shim and doesn't support a second argument."
      );

    function F() {}
    F.prototype = proto;

    return new F();
  };
}
```

## Object.assign

- `Object.assign(target, ...sources)`
- 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象
- 不会跳过那些值为 null 或 undefined 的源对象

```js
const target = { a: 1, b: 2, m: null };
const source = { b: 4, c: 5, e: undefined };

const returnedTarget = Object.assign(target, source);

console.log(target);
// {a: 1, b: 4, m: null, c: 5, e: undefined}

console.log(returnedTarget);
// {a: 1, b: 4, m: null, c: 5, e: undefined}
```

## Object.prototype.valueOf

- 返回当前对象对应的值

| 对象     | 返回值                                           |
| :------- | :----------------------------------------------- |
| Array    | 返回数组对象本身                                 |
| Boolean  | 布尔值                                           |
| Date     | 时间是从 1970 年 1 月 1 日午夜开始计的毫秒数 UTC |
| Function | 函数本身                                         |
| Number   | 数字值                                           |
| Object   | 对象本身                                         |
| String   | 字符串值                                         |
|          | Math 和 Error 对象没有 valueOf 方法              |

- 代码

```js
// Array：返回数组对象本身
var array = ["ABC", true, 12, -5];
console.log(array.valueOf() === array); // true

// Date：当前时间距1970年1月1日午夜的毫秒数
var date = new Date(2013, 7, 18, 23, 11, 59, 230);
console.log(date.valueOf()); // 1376838719230

// Number：返回数字值
var num = 15.2654;
console.log(num.valueOf()); // 15.2654

// 布尔：返回布尔值true或false
var bool = true;
console.log(bool.valueOf() === bool); // true

// new一个Boolean对象
var newBool = new Boolean(true);
// valueOf()返回的是true，两者的值相等
console.log(newBool.valueOf() == newBool); // true
// 但是不全等，两者类型不相等，前者是boolean类型，后者是object类型
console.log(newBool.valueOf() === newBool); // false

// Function：返回函数本身
function foo() {}
console.log(foo.valueOf() === foo); // true
var foo2 = new Function("x", "y", "return x + y;");
console.log(foo2.valueOf());
/*
ƒ anonymous(x,y
) {
return x + y;
}
*/

// Object：返回对象本身
var obj = { name: "张三", age: 18 };
console.log(obj.valueOf() === obj); // true

// String：返回字符串值
var str = "http://www.xyz.com";
console.log(str.valueOf() === str); // true

// new一个字符串对象
var str2 = new String("http://www.xyz.com");
// 两者的值相等，但不全等，因为类型不同，前者为string类型，后者为object类型
console.log(str2.valueOf() === str2); // false
```

## Object.prototype.toString

- 返回对象的类型字符串，因此可以用来判断一个值的类型

```js
Object.prototype.toString.call(arg);
```

## Object.prototype.hasOwnProperty

- 判断某个属性是否为当前对象自身的属性,`true`为自身属性，`false`为继承属性

```js
const object1 = new Object();
object1.property1 = 42;

console.log(object1.hasOwnProperty("property1")); //true
console.log(object1.hasOwnProperty("toString")); //false
console.log(object1.hasOwnProperty("hasOwnProperty")); //false
```

- isIncludeKey

```js
function isIncludeKey(obj, key){
  return Object.prototype.hasOwnProperty.call(obj, key)
}
```

## Object.prototype.isPrototypeOf

- 判断当前对象是否为另一个对象的原型

- 代码 1

```js
function Foo() {}
function Bar() {}
function Baz() {}

Bar.prototype = Object.create(Foo.prototype);
Baz.prototype = Object.create(Bar.prototype);

var baz = new Baz();

console.log(Baz.prototype.isPrototypeOf(baz)); // true
console.log(Bar.prototype.isPrototypeOf(baz)); // true
console.log(Foo.prototype.isPrototypeOf(baz)); // true
console.log(Object.prototype.isPrototypeOf(baz)); // true
```

- 代码 2

```js
var human = { mortal: true };
var socrates = Object.create(human);
human.isPrototypeOf(socrates); //=> true
socrates instanceof human; //=> ER
```

## Object.prototype.propertyIsEnumerable

- `Object.prototype.propertyIsEnumerable()`
- 判断某个属性是否可枚举, 此方法可以确定对象中指定的属性是否可以被 `for...in` 循环枚举
- 基本用法

```js
var o = {};
var a = [];
o.prop = "is enumerable";
a[0] = "is enumerable";

o.propertyIsEnumerable("prop"); // 返回 true
a.propertyIsEnumerable(0); // 返回 true
```

- 用户自定义对象和内置对象

```js
var a = ["is enumerable"];

a.propertyIsEnumerable(0); // 返回 true
a.propertyIsEnumerable("length"); // 返回 false

Math.propertyIsEnumerable("random"); // 返回 false
this.propertyIsEnumerable("Math"); // 返回 false
```

## __proto__

- `Object.prototype.__proto__`
- 返回该对象的原型。该属性可读写
- `__proto__`兼容

```js
// __proto__ 兼容
function getProto(attr) {
  if (attr.__proto__) {
    return attr.__proto__;
  } else {
    return attr.constructor.prototype;
  }
}

/*example:
    function Hello(){}
    var hello = new Hello();
    getProto(hello).sayHello=function(){
      console.log('hello');
    }
    hello.sayHello();

 */
```

## Object.preventExtensions

- 防止对象扩展

```js
// Object.preventExtensions将原对象变的不可扩展,并且返回原对象.
var obj = {};
var obj2 = Object.preventExtensions(obj);
obj === obj2; // true
obj2.name = "js";
console.log(obj2, obj); // {} {}

// 字面量方式定义的对象默认是可扩展的.
var empty = {};
Object.isExtensible(empty); //=== true
```

## Object.seal

- 禁止对象配置

```js
const object1 = {
  property1: 42
};

Object.seal(object1);
object1.property1 = 33;
console.log(object1.property1); // 33

delete object1.property1;
console.log(object1.property1); // 33
```

## Object.freeze

- 冻结一个对象

```js
const obj = {
  prop: 42
};

Object.freeze(obj);

obj.prop = 33;

console.log(obj.prop); // 42
```

## Object.getOwnPropertyNames

- 返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括 Symbol 值作为名称的属性）组成的数组

```js
var arr = ["a", "b", "c"];
console.log(Object.getOwnPropertyNames(arr).sort()); // ["0", "1", "2", "length"]

// 类数组对象
var obj = { 0: "a", 1: "b", 2: "c" };
console.log(Object.getOwnPropertyNames(obj).sort()); // ["0", "1", "2"]

// 使用Array.forEach输出属性名和属性值
Object.getOwnPropertyNames(obj).forEach(function(val, idx, array) {
  console.log(val + " -> " + obj[val]);
});
// 输出
// 0 -> a
// 1 -> b
// 2 -> c

//不可枚举属性
var my_obj = Object.create(
  {},
  {
    getFoo: {
      value: function() {
        return this.foo;
      },
      enumerable: false
    }
  }
);
my_obj.foo = 1;

console.log(Object.getOwnPropertyNames(my_obj).sort()); // ["foo", "getFoo"]
```

## Object.keys

- 参数是一个对象，返回一个数组;
- 只返回可枚举的属性

```js
// simple array
var arr = ["a", "b", "c"];
console.log(Object.keys(arr)); // console: ['0', '1', '2']

// array like object
var obj = { 0: "a", 1: "b", 2: "c" };
console.log(Object.keys(obj)); // console: ['0', '1', '2']

// array like object with random key ordering
var anObj = { 100: "a", 2: "b", 7: "c" };
console.log(Object.keys(anObj)); // console: ['2', '7', '100']

// getFoo is a property which isn't enumerable
var myObj = Object.create(
  {},
  {
    getFoo: {
      value: function() {
        return this.foo;
      }
    }
  }
);
myObj.foo = 1;
console.log(Object.keys(myObj)); // console: ['foo']
```

## Object.fromEntries

- 把键值对列表转换为一个对象
- `Object.fromEntries(iterable)` 可迭代对象，类似 Array 、 Map 或者其它实现了可迭代协议的对象
- 返回一个由该迭代对象条目提供对应属性的新对象

```js
const entries = new Map([
  ["foo", "bar"],
  ["baz", 42]
]);

const obj = Object.fromEntries(entries);

console.log(obj);
// { foo: "bar", baz: 42 }
```

## Object.entries

- 返回一个给定对象自身可枚举属性的键值对数组
- 其排列与使用 `for...in` 循环遍历该对象时返回的顺序一致

```js
const object1 = {
  a: "somestring",
  b: 42
};

for (let [key, value] of Object.entries(object1)) {
  console.log(`${key}: ${value}`);
}
```

## Object.values

- 返回一个给定对象自身的所有可枚举属性值的数组

```js
var obj = { foo: "bar", baz: 42 };
console.log(Object.values(obj)); // ['bar', 42]

// array like object
var obj = { 0: "a", 1: "b", 2: "c" };
console.log(Object.values(obj)); // ['a', 'b', 'c']

// array like object with random key ordering
// when we use numeric keys, the value returned in a numerical order according to the keys
var an_obj = { 100: "a", 2: "b", 7: "c" };
console.log(Object.values(an_obj)); // ['b', 'c', 'a']

// getFoo is property which isn't enumerable
var my_obj = Object.create(
  {},
  {
    getFoo: {
      value: function() {
        return this.foo;
      }
    }
  }
);
my_obj.foo = "bar";
console.log(Object.values(my_obj)); // ['bar']

// non-object argument will be coerced to an object
console.log(Object.values("foo")); // ['f', 'o', 'o']
```

## Object.is

- 判断两个值是否是相同的值

```js
Object.is("foo", "foo"); // true
Object.is(window, window); // true

Object.is("foo", "bar"); // false
Object.is([], []); // false

var foo = { a: 1 };
var bar = { a: 1 };
Object.is(foo, foo); // true
Object.is(foo, bar); // false

Object.is(null, null); // true

// 特例
Object.is(0, -0); // false
Object.is(0, +0); // true
Object.is(-0, -0); // true
Object.is(NaN, 0 / 0); // true
```

## Object.getOwnPropertyDescriptor

- `Object.getOwnPropertyDescriptor(obj, prop)`返回指定对象上一个自有属性对应的属性描述符

```js
var o, d;

o = {
  get foo() {
    return 17;
  }
};
d = Object.getOwnPropertyDescriptor(o, "foo");
console.log(d);
// {
//   configurable: true,
//   enumerable: true,
//   get: /*the getter function*/,
//   set: undefined
// }

o = { bar: 42 };
d = Object.getOwnPropertyDescriptor(o, "bar");
console.log(d);
// {
//   configurable: true,
//   enumerable: true,
//   value: 42,
//   writable: true
// }

o = {};
Object.defineProperty(o, "baz", {
  value: 8675309,
  writable: false,
  enumerable: false
});
d = Object.getOwnPropertyDescriptor(o, "baz");
console.log(d);
// {
//   value: 8675309,
//   writable: false,
//   enumerable: false,
//   configurable: false
// }
```

## Object.defineProperty

- 通过描述对象，定义某个属性
- `Object.defineProperty(object, propertyName, attributesObject)`
- `object`: 属性所在的对象
- `propertyName`: 属性名（它应该是一个字符串）
- `attributesObject`: 属性描述对象
- 注意，一旦定义了取值函数`get`（或存值函数`set`），就不能将`writable`属性设为`true`，或者同时定义`value`属性，否则会报错

- 描述符可同时具有的键值

|            | configurable | enumerable | value | writable | get | set |
| ---------- | ------------ | ---------- | ----- | -------- | --- | --- |
| 数据描述符 | Yes          | Yes        | Yes   | Yes      | No  | No  |
| 存取描述符 | Yes          | Yes        | No    | No       | Yes | Yes |

- 添加多个属性和默认值

```js
var o = {};

o.a = 1;
// 等同于 :
Object.defineProperty(o, "a", {
  value: 1,
  writable: true,
  configurable: true,
  enumerable: true
});

// 另一方面，
Object.defineProperty(o, "a", { value: 1 });
// 等同于 :
Object.defineProperty(o, "a", {
  value: 1,
  writable: false,
  configurable: false,
  enumerable: false
});
```

- 思考扩展

```js
// 1.0
if(a == 1 && a ==2 && a == 3){
  console.log('1.0 如何打印我！')
}

var s = 0;
var a = {
    toString(){
          console.log('其次：toString.')
          return s+=1
    },
    valueOf(){
        console.log('优先：valueOf.')
        return ++s
    }
}

// 2.0
if(a === 1 && a ===2 && a === 3){
  console.log('2.0 如何打印我！')
}

// 不建议使用
Object.definePrototype(window, 'a', {
  get(){
    return ++s;
  }
})
```

### attributesObject

#### `value`

- 该属性的属性值，默认为`undefined`

```js
var o = {}; // 创建一个新对象

// 在对象中添加一个属性与数据描述符的示例
Object.defineProperty(o, "a", {
  value: 37,
  writable: true,
  enumerable: true,
  configurable: true
});
console.log(o);
// 对象o拥有了属性a，值为37
```

#### `writable`

- 布尔值，表示属性值（`value`）是否可改变（即是否可写）. 默认为`true`

```js
var o = {}; // Creates a new object

Object.defineProperty(o, "a", {
  value: 37,
  writable: false
});

console.log(o.a); // 37
o.a = 25; // No error thrown
console.log(o.a); // 37

// strict mode
(function() {
  "use strict";
  var o = {};
  Object.defineProperty(o, "b", {
    value: 2,
    writable: false
  });
  o.b = 3; // throws TypeError
  console.log(o);
})();
```

#### `enumerable`

- 布尔值，表示该属性是否可遍历
- 默认为`true`
- 设为`false`，`for...in`循环、`Object.keys()`会跳过该属性

```js
var o = {};
Object.defineProperty(o, "a", { value: 1, enumerable: true });
Object.defineProperty(o, "b", { value: 2, enumerable: false });
Object.defineProperty(o, "c", { value: 3 }); // enumerable defaults to false
o.d = 4; // 如果使用直接赋值的方式创建对象的属性，则这个属性的enumerable为true

for (var i in o) {
  console.log(i);
}
// 打印 'a' 和 'd' (in undefined order)

Object.keys(o); // ["a", "d"]

o.propertyIsEnumerable("a"); // true
o.propertyIsEnumerable("b"); // false
o.propertyIsEnumerable("c"); // false
```

#### `configurable`

- 布尔值，表示可配置性
- 默认为`true`
- 设为`false`,无法删除该属性，不能改变该描述对象（`value`属性除外）

```js
var o = {};
Object.defineProperty(o, "a", {
  get: function() {
    return 1;
  },
  configurable: false
});

// throws a TypeError
Object.defineProperty(o, "a", { configurable: true });
// throws a TypeError
Object.defineProperty(o, "a", { enumerable: true });
// throws a TypeError
Object.defineProperty(o, "a", { set: function() {} });
// throws a TypeError
Object.defineProperty(o, "a", {
  get: function() {
    return 1;
  }
});
// throws a TypeError
Object.defineProperty(o, "a", { value: 12 });

console.log(o.a); //1
delete o.a; // Nothing happens
console.log(o.a); // 1
```

#### `set/get`

- get 函数，表示该属性的取值函数（`getter`），默认为`undefined`
- set 函数，表示该属性的存值函数（`setter`），默认为`undefined`

```js
function Archiver() {
  var temperature = null;
  var archive = [];

  Object.defineProperty(this, "temperature", {
    get: function() {
      console.log("get!");
      return temperature;
    },
    set: function(value) {
      temperature = value;
      archive.push({ val: temperature });
    }
  });

  this.getArchive = function() {
    return archive;
  };
}

var arc = new Archiver();
arc.temperature; // 'get!'
arc.temperature = 11;
arc.temperature = 13;
arc.getArchive(); // [{ val: 11 }, { val: 13 }]
```

## `in`运算符和`for in`循环

### `in`

- `prop in object`运算符常用于检查一个属性是否存在
- in 右操作数必须是一个对象值

```js
// 数组
var trees = new Array("redwood", "bay", "cedar", "oak", "maple");
console.log(0 in trees); // 返回true
console.log(3 in trees); // 返回true
console.log(6 in trees); // 返回false
console.log("bay" in trees); // 返回false (必须使用索引号,而不是数组元素的值)

console.log("length" in trees); // 返回true (length是一个数组属性)

console.log(Symbol.iterator in trees); // 返回true

// 内置对象
console.log("PI" in Math); // 返回true

// 自定义对象
var mycar = { make: "Honda", model: "Accord", year: 1998 };
console.log("make" in mycar); // 返回true
console.log("model" in mycar); // 返回true

var mycar = { make: "Honda", model: "Accord", year: 1998 };
delete mycar.make;
console.log("make" in mycar); // 返回false

// 值赋值为undefined
var mycar = { make: "Honda", model: "Accord", year: 1998 };
mycar.make = undefined;
console.log("make" in mycar); // 返回true
```

### `for..in`

- 以任意顺序遍历一个对象的除`Symbol`以外的可枚举属性

```js
var obj = { a: 1, b: 2, c: 3 };

for (var prop in obj) {
  console.log("obj." + prop + " = " + obj[prop]);
}

// Output:
// "obj.a = 1"
// "obj.b = 2"
// "obj.c = 3"
```

### `for...of`

- 遍历可迭代对象定义要迭代的数据
- 在可迭代对象（包括 `Array，Map，Set，String，TypedArray，arguments` 对象等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句

```js
Object.prototype.objCustom = function() {};
Array.prototype.arrCustom = function() {};

let iterable = [3, 5, 7];
iterable.foo = "hello";

for (let i in iterable) {
  console.log(i); // logs 0, 1, 2, "foo", "arrCustom", "objCustom"
}

for (let i in iterable) {
  if (iterable.hasOwnProperty(i)) {
    console.log(i); // logs 0, 1, 2, "foo"
  }
}

for (let i of iterable) {
  console.log(i); // logs 3, 5, 7
}
```
