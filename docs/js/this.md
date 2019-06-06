# this

## 全局环境

- `函数在全局环境中运行,那么this就是指顶层对象`

<CodeBlock>

```js
this === window // true

function f() {
  console.log(this === window); // true
}
```

</CodeBlock>

## 构造函数

- `构造函数中的this,指的是实例对象`

<CodeBlock>

```js
var Obj = function (p) {
  this.p = p;
};

Obj.prototype.m = function() {
  return this.p;
};
var o = new Obj('Hello World!');

o.p // "Hello World!"
o.m() // "Hello World!"
```

</CodeBlock>

## 使用

- 纯粹的函数调用,`this就代表全局对象`

<CodeBlock>

```js
var x = 1;
function test() {
   console.log(this.x);
}
test();  // 1
```

</CodeBlock>

- 作为对象方法的调用,`this 永远指向最后调用它的那个对象`

<CodeBlock>

```js
function test() {
  console.log(this.x);
}

var obj = {};
obj.x = 1;
obj.m = test;

obj.m(); //
```

</CodeBlock>

- 作为构造函数调用, 所谓构造函数，就是通过这个函数，可以生成一个新对象。这时，`this就指这个新对象`

<CodeBlock>

```js
function test() {
　this.x = 1;
}

var obj = new test();
obj.x // 1
```

</CodeBlock>

- `apply`调用, 改变`this`指向

<CodeBlock>

```js
var x = 0;
function test() {
　console.log(this.x);
}

var obj = {};
obj.x = 1;
obj.m = test;
obj.m.apply() // 0

obj.m.apply(obj) //1
```

</CodeBlock>

## 绑定this的方法

- `function.prototype.call()`
- `call() 参数为空、null和undefined,则默认传入全局对象`

<CodeBlock>

```js
var n = 123;
var obj = { n: 456 };
function a() {
  console.log(this.n);
}

a.call() // 123
a.call(null) // 123
a.call(undefined) // 123
a.call(window) // 123
a.call(obj) // 456
```

</CodeBlock>

- `func.call(thisValue, arg1, arg2, ...)`
- `func.apply(thisValue, [arg1, arg2, ...])`
- `apply方法(call方法)不仅会绑定函数执行时所在的对象,还会立即执行函数`

<CodeBlock>

```js
function add(a, b) {
	console.log(a + b)
}
function sub(a, b) {
	console.log(a - b)
}
add(5, 3) //8
add.call(this, 5, 3) //8
add.call(sub, 5, 3) //8
add.apply(sub, [5, 3]) //8

sub(5, 3); //2
sub.apply(this, [5, 3]) //2
sub.apply(null, [5, 3]) //2
sub.call(add, 5, 3); //2
sub.apply(add, [5, 3]); //2

//找出数组最大元素
var a = [10, 2, 4, 15, 9];
Math.max.apply(null, a)  //15
```

</CodeBlock>

- `function.prototype.bind()`
- `bind将函数体内的this绑定到某个对象,然后返回一个新函数`
- `bind方法的第一个参数是null或undefined,等于将this绑定到全局对象`
- `bind`这个函数`不会马上执行`

<CodeBlock>

```js
var d = new Date();
d.getTime()
var print = d.getTime;
print() // Uncaught TypeError: this is not a Date object.

var print = d.getTime.bind(d);
print()
```

</CodeBlock>

## call,apply,bind

- `obj.call(thisObj, arg1, arg2, ...);`
- `obj.apply(thisObj, [arg1, arg2, ...]);`
- `obj.bind(thisObj, arg1, arg2, ...);` 通过`bind`改变this作用域会返回一个新的函数，这个函数`不会马上执行`
- `call,apply`和`bind`如果第一个参数是指定为 `null` 或 `undefined` 时会自动指向`全局对象`

## 参考链接

- [Javascript 的 this 用法](http://www.ruanyifeng.com/blog/2010/04/using_this_keyword_in_javascript.html)
- [this、apply、call、bind](https://juejin.im/post/59bfe84351882531b730bac2)
