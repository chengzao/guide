---
title: 常见问题整理（三）
date: 2023-03-10
sidebar: "auto"
categories:
  - frontend
---

## for循环对象方式

```js
// 1. 使用 for in
for (let e in someObject) {
  console.log(e);
}

// 2. Object.keys
for (var key of Object.keys(someObject)) {
  console.log(key + ': ' + someObject[key]);
}

// 3. 使用 Generator 函数将对象重新包装一下
const obj = { a: 1, b: 2, c: 3 }

function* entries(obj) {
  for (let key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
}

for (let [key, value] of entries(obj)) {
  console.log(key, '->', value);
}
```

## Event Loop经典题目

```js
Promise.resolve()
  .then(function() {
    console.log("promise0");
  })
  .then(function() {
    console.log("promise5");
  });
setTimeout(() => {
  console.log("timer1");
  Promise.resolve().then(function() {
    console.log("promise2");
  });
  Promise.resolve().then(function() {
    console.log("promise4");
  });
}, 0);
setTimeout(() => {
  console.log("timer2");
  Promise.resolve().then(function() {
    console.log("promise3");
  });
}, 0);
Promise.resolve().then(function() {
  console.log("promise1");
});
console.log("start");

// 打印结果：
// start promise0 promise1 promise5 timer1 promise2 promise4 timer2 promise3

// ------------------------------------------------------------------------

console.log("script start");
async function async1() {
  await async2(); // await 隐式返回promise
  console.log("async1 end"); // 这里的执行时机：在执行微任务时执行
}
async function async2() {
  console.log("async2 end"); // 这里是同步代码
}
async1();
setTimeout(function() {
  console.log("setTimeout");
}, 0);
new Promise(resolve => {
  console.log("Promise"); // 这里是同步代码
  resolve();
})
  .then(function() {
    console.log("promise1");
  })
  .then(function() {
    console.log("promise2");
  });
console.log("script end");

// 打印结果:
// script start => async2 end => Promise => script end => async1 end => promise1 => promise2 => setTimeout
```

## Node中的process.nextTick

```js
console.log("start");
setTimeout(() => {
  console.log("timeout");
}, 0);
Promise.resolve().then(() => {
  console.log("promise");
});
process.nextTick(() => {
  console.log("nextTick");
  Promise.resolve().then(() => {
    console.log("promise1");
  });
});
console.log("end");
// 执行结果 start end nextTick  promise promise1 timeout
```

## 判断数组的方式有哪些

- 通过Object.prototype.toString.call

```js
Object.prototype.toString.call([]).slice(8,-1) === 'Array';
```

- 通过原型链做判断

```js
[].__proto__ === Array.prototype
Object.getPrototypeOf([]) === Array.prototype
```

- 通过ES6的Array.isArray做判断

```js
Array.isArrray([]);
```

- 通过instanceof做判断

```js
[] instanceof Array
```

- 通过Array.prototype.isPrototypeOf

```js
Array.prototype.isPrototypeOf([])
```

## 为什么0.1+0.2 ! == 0.3，如何让其相等

- 实现遵循[IEEE 754](https://zh.wikipedia.org/wiki/%E9%9B%99%E7%B2%BE%E5%BA%A6%E6%B5%AE%E9%BB%9E%E6%95%B8)标准，使用64位固定长度来表示，也就是标准的double双精度浮点数
- 0.1 与 0.2 在转换为二进制时，出现了无限循环，导致相加时出现精度问题
- ES6中，提供了[Number.EPSILON](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/EPSILON)属性，而它的值就是2<sup>-52</sup>

```js
function numberepsilon(arg1,arg2){
  return Math.abs(arg1 - arg2) < Number.EPSILON;
}
console.log(numberepsilon(0.1 + 0.2, 0.3)); // true
```

- 将小数转换为整数相加，最后在转换为小数
- 将数字类型转换为字符串，然后在依次相加，最后在转换为数字类型

## 箭头函数与普通函数的区别

- 箭头函数没有自己的this
- 不能改变箭头函数种的this指向
- 不能作为构造函数使用
- 没有自己的arguments
- 没有prototype属性
- 不能用作[Generator](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator)函数，不能使用[yield](https://developer.mozilla.org/zh-CN/docs/web/javascript/reference/operators/yield)关键字

## 模拟一个中间件流程

```js
const m1 = async next => {
  console.log("m1 run");
  await next();
  console.log("result1");
};

const m2 = async next => {
  console.log("m2 run");
  await next();
  console.log("result2");
};
const m3 = async next => {
  console.log("m3 run");
  await next();
  console.log("result3");
};

const middlewares = [m1, m2, m3];

function useApp() {
  const next = () => {
    const middleware = middlewares.shift();
    if (middleware) {
      // 递归调用栈
      return Promise.resolve(middleware(next));
    } else {
      return Promise.resolve("end");
    }
  };
  next();
}

// 启动中间件
useApp();

// 依次打印：
// m1 run
// m2 run
// m3 run
// result3
// result2
// result1
```

## node 创建子进程

> 进程间通信：使用fork方法创建的子进程，可通过send、on（message）方法来发送和接收进程间的数据

```js
// parent.js
const cp = require("child_process");
// 通过child_process中的fork方法来生成子进程
let child = cp.fork("child.js");
child.send({ message: "from_parent" }); // send方法发送数据
child.on("message", res => console.log(res)); // on方法接收数据

// child.js
process.on("message", res => console.log(res));
process.send({ message: "from_child" });
```

## 为什么type null是object

> 原文: [The history of “typeof null”](https://2ality.com/2013/10/typeof-null.html)

在 javascript 的最初版本中，使用的 32位系统，js为了性能优化，使用低位来存储变量的类型信息;
在判断数据类型时，是根据机器码低位标识来判断的，而null的机器码标识为全0，而对象的机器码低位标识为000。
所以typeof null的结果被误判为Object
