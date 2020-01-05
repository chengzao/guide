# 函数


## 定义函数的方法

- 函数声明

```js
//ES5
function getSum(){}
(function (){})()//匿名函数
//ES6
()=>{}
```

- 函数表达式

```js
//ES5
var getSum=function(){}
//ES6
let getSum=()=>{}
```

- 构造函数

```js
const getSum = new Function('a', 'b' , 'return a + b')
// 等同于es5
function getSum(a,b) {
  return a+b;
}
```

## 函数的重复声明

<CodeBlock>

```js
//如果同一个函数被多次声明,后面的声明就会覆盖前面的声明
function f() {
  console.log(1);
}
f() // 2

function f() {
  console.log(2);
}
f() // 2
```

</CodeBlock>

## 函数不调用,不执行

<CodeBlock>

```js
function fn(){}
fn() // 调用
```

</CodeBlock>

## 作用域与变量声明提升

<CodeBlock>

```js
function fn(){
    console.log(b); //b is not defined
	console.log(a); //undefined
	var a=10;
}
fn();

// 注：函数声明优先于变量声明
var a;
function a(){}
typeof a // function

function a(){}
var a;
typeof a // function

function a(){}
var a='xyf';
console.log(typeof a); //string

// -----------------
var a,b
function fn(a){
  a = 123
  b = 555
}
fn('aaa', 666)
console.log(a, b) // undefined, 555
```

</CodeBlock>

## arguments

- `函数名.length`: 他代表的是形参的个数.
- `Arguments`: 伪数组.而且必须在函数内部使用.
- `伪转换为真数组`

<CodeBlock>

```js
Array.prototype.slice.call(arguments);
Array.prototype.concat.apply([], arguments);
// ------------------------------------------
function fn(x,y){return x+y};
fn.length; //2
fn(1,2);   //3
fn(1);     //NaN
fn(1,2,3)  //3
```

</CodeBlock>

## return

在函数内部用return来设置返回值,一个函数只能有一个返回值.
同时,终止代码的执行.

所有的自定义函数默认没有返回值

return语句不是必需的,如果没有的话;
该函数就不返回任何值,或者说返回undefined

## 函数自调用

-函数可以调用自身,这就是递归`(recursion)`

<CodeBlock>

```js
function fib(num) {
  if (num === 0) return 0;
  if (num === 1) return 1;
  return fib(num - 2) + fib(num - 1);
}
fib(6) // 8
```

</CodeBlock>

## 函数的属性和方法

- `name属性`属性返回紧跟在`function`关键字之后的那个函数名

<CodeBlock>

```js
function f1() {}
f1.name // 'f1'

var f2 = function () {};
f2.name // ''

var f3 = function myName() {};
f3.name // 'myName'
```

</CodeBlock>

- `length属性`返回函数预期传入的参数个数,即函数定义之中的参数个数

<CodeBlock>

```js
function f(a, b) {}
f.length // 2
```

</CodeBlock>

- `toString()`方法返回函数的源码

<CodeBlock>

```js
function f() {
  a();
  b();
  c();
}
f.toString()
```

</CodeBlock>

- 函数内部的注释也可以返回

<CodeBlock>

```js
function f() {/*
  这是一个
  多行注释
*/}
f.toString()
// "function f(){/*
//   这是一个
//   多行注释
// */}"
```

</CodeBlock>

- `函数本身的作用域`

函数本身也是一个值,也有自己的作用域.
它的作用域与变量一样,就是其声明时所在的作用域,
与其运行时所在的作用域无关.

<CodeBlock>

```js
var a = 1;
var x = function () {
  console.log(a);
};

function f() {
  var a = 2;
  x();
}

f() // 1
```

</CodeBlock>

- `参数的省略`

<CodeBlock>

```js
function f(a, b) {
  return a;
}

f(1, 2, 3) // 1
f(1) // 1
f() // undefined

f.length // 2
```

</CodeBlock>

## callee属性

- `arguments对象带有一个callee属性,返回它所对应的原函数`

<CodeBlock>

```js
var f = function() {
  console.log(arguments.callee === f);
}

f() // true
```

</CodeBlock>

## 双引号和单引号

- 在字符串中使用字符串:用外双内单(单引号)的方法.
- 在字符串中使用变量：用外双内双外加+变量名+(单引号)的方法.

<CodeBlock>

```js
 var str="this is +'hello'+demo"; //this is +'hello'+demo
 var num=2;
 var str2="my age is "+num+".";	//my age is 2.
```

</CodeBlock>

## fn与`fn()`的区别

<CodeBlock>

```js
<div id="demo">点击</div>
	var demo=document.getElementById('demo');
	function fn(){
		alert(1)
	}
  demo.onclick=fn;   // 点击执行
  demo.onclick=fn();  // 直接执行
```

</CodeBlock>

## 传递方式

- `传值传递(passes by value)`

<CodeBlock>

```js
var p = 2;

function f(p) {
  p = 3;
}
f(p);

p // 2
```

</CodeBlock>

- `传址传递(pass by reference)`

<CodeBlock>

```js
var obj = {p: 1};

function f(o) {
  o.p = 2;
}
f(obj);

obj.p // 2

//如果函数内部修改的,不是参数对象的某个属性,
//而是替换掉整个参数,这时不会影响到原始值.
var obj = [1, 2, 3];

function f(o){
  o = [2, 3, 4];
}
f(obj);

obj // [1, 2, 3]
```

</CodeBlock>

- `如果需要对某个原始类型的变量,获取传址传递的效果`

<CodeBlock>

```js
var a = 1;

function f(p) {
  window[p] = 2;
}
f('a');

a // 2
```

</CodeBlock>

- `如果有同名的参数,则取最后出现的那个值`
- `函数内部可以直接读取全局变量`
- `函数外部无法读取函数内部声明的变量`

## 闭包

- 闭包的最大用处有两个,
- 一个是可以读取函数内部的变量
- 另一个就是让这些变量始终保持在内存中,即闭包可以使得它诞生环境一直存在

<CodeBlock>

```js
function createIncrementor(start) {
  return function () {
    return start++;
  };
}
var inc = createIncrementor(5);
inc() // 5
inc() // 6
inc() // 7
```

</CodeBlock>

- 闭包的另一个用处,是封装对象的私有属性和私有方法

<CodeBlock>

```js
function Person(name) {
  var _age;
  function setAge(n) {
    _age = n;
  }
  function getAge() {
    return _age;
  }
  return {
    name: name,
    getAge: getAge,
    setAge: setAge
  };
}
var p1 = Person('张三');
p1.setAge(25);
p1.getAge() // 25
```

</CodeBlock>

## 立即调用的函数表达式(IIFE)

- `在定义函数之后,立即调用该函数`
- `不能在函数的定义之后加上圆括号,会产生语法错误`

<CodeBlock>

```js
function(){ /* code */ }();  //error
```

</CodeBlock>

- `最后的分号都是必须的.如果省略分号,遇到连着两个IIFE,可能就会报错`

<CodeBlock>

```js
(function(){ /* code */ }());
// 或者
(function(){ /* code */ })();
```

</CodeBlock>

- `任何让解释器以表达式来处理函数定义的方法`

<CodeBlock>

```js
var i = function(){ return 10; }();
true && function(){ /* code */ }();
0, function(){ /* code */ }();
!function(){ /* code */ }();
~function(){ /* code */ }();
-function(){ /* code */ }();
+function(){ /* code */ }();

new function(){ /* code */ }
// 只有传递参数时,才需要最后那个圆括号
new function(){ /* code */ }()
```

</CodeBlock>

## new Function

<CodeBlock>

```js
var str = "{'a':'c'}";
var f = new Function("return "+str);
```

</CodeBlock>

## eval

- `eval命令的作用是,将字符串当作语句执行`

<CodeBlock>

```js
var a = 1;
eval('a = 2');

a // 2
```

</CodeBlock>

- 如果使用严格模式,`eval`内部声明的变量,不会影响到外部作用域

<CodeBlock>

```js
(function f() {
  'use strict';
  eval('var foo = 123');
  console.log(foo);  // ReferenceError: foo is not defined
})()
```

</CodeBlock>
