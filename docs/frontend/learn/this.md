---
title: js中的this使用
date: 2022-02-05
sidebar: "auto"
tags:
  - this
categories:
  - frontend
---

- `this 指向最后调用它的那个对象`

## 全局环境

- `函数在全局环境中运行,那么this就是指顶层对象`



```js
this === window; // true

function f() {
  console.log(this === window); // true
}
```



## 箭头函数中的 this

箭头函数的 this 始终指向函数定义时的 this，而非执行时

箭头函数中没有 this 绑定，必须通过查找作用域链来决定其值，
如果箭头函数被非箭头函数包含，则 this 绑定的是最近一层非箭头函数的 this，
否则，this 为 undefined

- 代码 1

```js
var name = "windows";

var a = {
  name: "Cherry",

  func1: function() {
    console.log(this.name);
  },

  func2: function() {
    setTimeout(() => {
      this.func1();
    }, 100);
  }
};

a.func2(); // Cherry
```

- 代码 2

```js
var name = "aaa";

var a = {
  name: "Cherry",
  func1: () => {
    console.log(this.name); // aaa
  },
  func2: () => {
    console.log(this); // widnow
    this.func1(); // this.func1 is not a function
  }
};

a.func1();
a.func2();
```

## 构造函数

- `构造函数中的this,指的是实例对象`



```js
var Obj = function(p) {
  this.p = p;
};

Obj.prototype.m = function() {
  console.log(this.constructor === Obj); // true
  console.log(this instanceof Obj); // true
  console.log(Obj.prototype.isPrototypeOf(this));
  return this.p;
};
var o = new Obj("Hello World!");

o.p; // "Hello World!"
o.m(); // "Hello World!"
```



## 使用

- 函数调用,`this就代表全局对象`



```js
var x = 1;
function test() {
  console.log(this.x);
}
test(); // 1
```



- 作为对象方法的调用,`this 永远指向最后调用它的那个对象`



```js
function test() {
  console.log(this.x);
}

var obj = {};
obj.x = 1;
obj.m = test;

obj.m(); //
```



- 作为构造函数调用, `this就指这个新对象`



```js
function test() {
  this.x = 1;
}

var obj = new test();
obj.x; // 1
```



- `apply`调用, 改变`this`指向



```js
var x = 0;
function test() {
  console.log(this.x);
}

var obj = {};
obj.x = 1;
obj.m = test;
obj.m.apply(); // 0

obj.m.apply(obj); //1
```



## 绑定 this 的方法

```js
function Fn(name) {
  this.name = name;
}

Fn.prototype.say = function() {
  console.log("Fn,", this.name);
};

Sub.prototype = Object.create(Fn.prototype);
Sub.prototype.constructor = Sub;

function Sub(name) {
  console.log(this);
  Fn.call(this, name);
}

// Sub.prototype.say = function(){
//   console.log('sub,', this.name)
// }

var sub = new Sub("js");
sub.say(); // Fn,js
```

### 参数为空、`null`和 `undefined`

- call `参数为空、null和undefined,则默认传入全局对象`

```js
var n = 123;
var obj = { n: 456 };
function a() {
  console.log(Object.prototype.toString.call(this).slice(8, -1), this.n);
}

a.call(); // Window , 123
a.call(null); // Window , 123
a.call(undefined); // Window , 123
a.call(window); // Window , 123
a.call(obj); // Object , 456
```

- apply `参数为空、null和undefined,则默认传入全局对象`

```js
var n = 123;
var obj = { n: 456 };
function a() {
  console.log(Object.prototype.toString.call(this).slice(8, -1), this.n);
}

a.apply(); // Window , 123
a.apply(null); // Window , 123
a.apply(undefined); // Window , 123
a.apply(window); // Window , 123
a.apply(obj); // Object , 456
```

- bind `参数为空、null和undefined,则默认传入全局对象`

```js
var n = 123;
var obj = { n: 456 };
function a() {
  console.log(Object.prototype.toString.call(this).slice(8, -1), this.n);
}

a.bind()(); // Window , 123
a.bind(null)(); // Window , 123
a.bind(undefined)(); // Window , 123
a.bind(window)(); // Window , 123
a.bind(obj)(); // Object , 456
```

### call、apply

- `func.call(thisValue, arg1, arg2, ...)`
- `func.apply(thisValue, [arg1, arg2, ...])`
- `apply/call方法: 不仅会绑定函数执行时所在的对象,还会立即执行函数`

```js
function add(a, b) {
  console.log("add: ", a + b);
}

function fn() {}

add(5, 3); //8

add.call(this, 5, 3); //8
add.call(null, 5, 3); //8

add.call(fn, 5, 3); //8
add.apply(fn, [5, 3]); //8

add.bind(fn, 5, 3)(); //8

//找出数组最大元素
var a = [10, 2, 4, 15, 9];
Math.max.apply(null, a); //15
```

### bind

- `function.prototype.bind()`
- `将函数体内的this绑定到某个对象,然后返回一个新函数`
- `第一个参数是null或undefined,等于将this绑定到全局对象`
- `bind这个函数不会马上执行`

```js
var d = new Date();
d.getTime();
var print = d.getTime;
print(); // Uncaught TypeError: this is not a Date object.

var print = d.getTime.bind(d);
print();
```

## call&apply&bind

### 实现call

- es6写法

```js
Function.prototype._call = function (context) {
  // 判断 context 是否传入，如果未传入则设置为 window
  let context = context || window;
  context.fn = this; // 将调用函数设为对象的方法
  let args = [...arguments].slice(1);
  let result = context.fn(...args);
  delete context.fn;
  return result;
}

var foo = {
  value: 1
}
function bar(name, age) {
  console.log(name)
  console.log(age)
  console.log(this.value);
}
bar._call(foo, 'xxx', '18') // xxx 18 1
```

- es5写法

```js
Function.prototype.call2 = function (context) {
    var context = context || window;

    context.fn = this;

    var args = [];
    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }

    var result = eval('context.fn(' + args +')');

    delete context.fn
    return result;
}
```

### 实现apply

```js
Function.prototype._apply = function (context) {
  var context = context || window;
  context.fn = this
  let result;
  // 判断是否有第二个参数
  if (arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }
  delete context.fn
  return result
}

var foo = {
  value: 1
}
function bar(name, age) {
  console.log(name)
  console.log(age)
  console.log(this.value);
}
bar._apply(foo, ['xxx', '18']) // xxx 18 1
```

### 实现bind


```js
Function.prototype._bind = function(context) {
  let func = this;
  let params = [].slice.call(arguments, 1);
  let Nop = function() {};
  let bound = function() {
    params = params.concat([].slice.call(arguments, 0));
    return func.apply(this instanceof Nop ?
      this : context, params);
  }
  Nop.prototype = func.prototype;
  bound.prototype = new Nop();
  return bound;
}

function foo() {
  this.b = 100;
  return this.a;
}
let fe = foo._bind({ a: 1 });
console.log(fe()); // 1
console.log(new fe()); // 实例 {b: 100}
```

## 实现instanceof

```js
function instanceOf(left, right) {
    let proto = left.__proto__
    // let proto = Object.getPrototypeOf(left) // 也可以这样获取
    while (true) {
        if (proto === null) return false
        if (proto === right.prototype) {
            return true
        }
        proto = proto.__proto__
    }
}
```

## 实现Object.create

```js
function create(obj) {
  function F(){}
  F.prototype = obj
  return new F()
}
```

## 实现new

```js
function _new(fn, ...args) {
  var constructor = [].shift.call(arguments);
  var obj = {};

  obj.__proto__ = constructor.prototype;
  var ret = constructor.apply(obj, arguments);

  return typeof ret === 'object' ? ret : obj;
}
```

- other

```js
function _new() {
  let newObject = null;
  let constructor = Array.prototype.shift.call(arguments);
  let result = null;
  // 判断参数是否是一个函数
  if (typeof constructor !== "function") {
    console.error("type error");
    return;
  }
  // 新建一个空对象，对象的原型为构造函数的 prototype 对象
  newObject = Object.create(constructor.prototype);
  // 将 this 指向新建对象，并执行函数
  result = constructor.apply(newObject, arguments);
  // 判断返回对象
  let flag = result && (typeof result === "object" || typeof result === "function");
  // 判断返回结果
  return flag ? result : newObject;
}
```

## 相关链接

- [Javascript 的 this 用法](http://www.ruanyifeng.com/blog/2010/04/using_this_keyword_in_javascript.html)
- [this、apply、call、bind](https://juejin.im/post/59bfe84351882531b730bac2)
- [「2021」高频前端面试题汇总之手写代码篇](https://juejin.cn/post/6946136940164939813#heading-0)
