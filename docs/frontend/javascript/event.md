---
title: 浏览器事件event
date: 2020-07-20
sidebar: "auto"
tags:
  - event
---

## addEventListener

- `target.addEventListener(type, listener[, useCapture]);`



```js
// type：事件名称，大小写敏感。
// listener：监听函数。事件发生时，会调用该监听函数。
// useCapture：布尔值，表示监听函数是否在捕获阶段，默认为false

window.addEventListener('load', function () {...}, false);
request.addEventListener('readystatechange', function () {...}, false);
```



## removeEventListener

- `target.removeEventListener(type, listener[, useCapture]);`

## 事件兼容

```js
/**
 * 事件的监听与移除
 *
  var textbox = document.getElementById('input');
  EventUtil.addHandler(textbox, 'textInput', function (e) {
    e.target.value = e.target.value.replace(/[^0-9\.]/g, '')
  })
 */
var EventUtil = {
  addHandler: function (element, type, handler) {
    if (element.addEventListener) { //DOM2级
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) { //DOM1级
      element.attachEvent("on" + type, handler);
    } else {
      element["on" + type] = handler; //DOM0级
    }
  },
  removeHandler: function (element, type, handler) { //类似addHandler
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent("on" + type, handler);
    } else {
      element["on" + type] = null;
    }
  }
}
// carry
var addEvent = (function () {
  if (window.addEventListener) {
    return function (el, sType, fn, capture) {
      el.addEventListener(sType, function (e) {
        fn.call(el, e);
      }, (capture));
    };
  } else if (window.attachEvent) {
    return function (el, sType, fn, capture) {
      el.attachEvent("on" + sType, function (e) {
        fn.call(el, e);
      });
    };
  }
})();
```

## 事件循环(Event Loop)

- [最后一次搞懂 Event Loop](https://juejin.im/post/5cbc0a9cf265da03b11f3505)
- 原地址：[从 promise、process.nextTick、setTimeout 出发，谈谈 Event Loop 中的 Job queue #5](https://github.com/forthealllight/blog/issues/5)
- 执行顺序`同步代码—>microTask—>macroTask :`
- macrotask 宏任务：
  - `script(主程序代码),setTimeout, setInterval, setImmediate(Node.js 环境), I/O, UI rendering`
- microtask 微任务：
  - `process.nextTick(Node.js 环境), Promises, Object.observe, MutationObserver`
- 执行顺序应该为：
  - `script(主程序代码)—>process.nextTick—>Promises...——>setTimeout——>setInterval——>setImmediate——> I/O——>UI rendering`
- 在 ES6 中`macro-task`队列又称为`ScriptJobs`，而`micro-task`又称`PromiseJobs`



```bash
假设
macro-task队列包含任务: a1, a2 , a3
micro-task队列包含任务: b1, b2 , b3

执行顺序为,首先执行marco-task队列开头的任务,也就是 a1 任务,执行完毕后
在执行micro-task队列里的所有任务,也就是依次执行***b1, b2 , b3***,
执行完后清空micro-task中的任务,接着执行marco-task中的第二个任务,依次循环.
```



- 示例



```js
async function async1() {
  console.log('async1 start') // 2
  await async2();
  console.log('async1 end'); // 6
}
/* async/await 等同于
function async1() {
  console.log('async1 start'); // 2
  Promise.resolve(async2()).then(() => {
    console.log('async1 end'); // 7
  });
}
*/

async function async2() {
  console.log('async2'); // 3
}

console.log('script start'); // 1

setTimeout(function () {
  console.log('setTimeout'); // 8
}, 0)

async1()

new Promise(function (resolve) {
  console.log('promise1'); // 4
  resolve()
}).then(function () {
  console.log('promise2'); // 7
})

console.log('script end'); // 5
```



- 示例 2



```js
const p1 = new Promise((resolve, reject) => {
  console.log('1'); // 1
  resolve();
})
  .then(() => {
    console.log('2'); // 3
    new Promise((resolve, reject) => {
      console.log('3'); // 4
      resolve();
    })
      .then(() => {
        console.log('4'); // 6
      })
      .then(() => {
        console.log('5'); // 8
      });
  })
  .then(() => {
    console.log('6'); // 7
  });

const p2 = new Promise((resolve, reject) => {
  console.log('7'); // 2
  resolve();
}).then(() => {
  console.log('8'); // 5
});
// 1 7 2 3 8 4 6 5
```



- 示例 2



```js
const p1 = new Promise((resolve, reject) => {
  console.log('1'); // 1
  resolve();
})
  .then(() => {
    console.log('2'); // 2
    return new Promise((resolve, reject) => {
      console.log('3'); // 3
      resolve();
    })
      .then(() => {
        console.log('4'); // 4
      })
      .then(() => {
        console.log('5'); // 5
      });
  })
  .then(() => {
    console.log('6'); //6
  });
// 1 2 3 4 5 6
```



## 事件的传播(事件流)

- 什么是事件流：事件流描述的是从页面中接收事件的顺序,DOM2 级事件流包括下面几个阶段的三个阶段:
- 第一阶段：从 window 对象传导到目标节点,称为"`捕获阶段`"(capture phase)
- 第二阶段：在目标节点上触发,称为"`目标阶段`"(target phase)
- 第三阶段：从目标节点传导回 window 对象,称为"`冒泡阶段`"(bubbling phase)
- `IE只支持事件冒泡`

## 事件委托

- 利用事件冒泡的原理,将事件绑定在父容器中,让父容器代为触发
- 事件委托指的是，不在事件的发生地（直接 dom）上设置监听函数，而是在其父元素上设置监听函数，通过事件冒泡，父元素可以监听到子元素上事件的触发，通过判断事件发生元素 DOM 的类型，来做出不同的响应
- 好处：比较合适动态元素的绑定，新添加的子元素也会有监听函数，也可以有事件触发机制



```js
var ul = document.querySelector("ul");
ul.addEventListener("click", function(event) {
  if (event.target.tagName.toLowerCase() === "li") {
    // some code
  }
});

// 阻止当前监听函数的传播
//stopPropagation方法只会阻止当前监听函数的传播，
//不会阻止<p>节点上的其他click事件的监听函数
p.addEventListener("click", function(event) {
  event.stopPropagation();
});

//如果想要不再触发那些监听函数，可以使用stopImmediatePropagation方法
p.addEventListener("click", function(event) {
  event.stopImmediatePropagation();
});

p.addEventListener("click", function(event) {
  // 不会被触发
});
```



## 哪些事件不支持冒泡事件

- 鼠标事件：`mouserleave mouseenter`
- 焦点事件：`blur focus`
- UI 事件：`scroll resize`

## 什么是作用域

JavaScript 中的作用域是我们可以有效访问变量或函数的区域。JS 有三种类型的作用域：全局作用域、函数作用域和块作用域(ES6)

### Event 对象

- `event = new Event(typeArg, eventInit);`
- 第一个参数是字符串，表示事件的名称
- 第二个参数是一个对象，表示事件对象的配置
- bubbles：布尔值，可选，默认为 false，表示事件对象是否冒泡
- cancelable：布尔值，可选，默认为 false，表示事件是否可以被取消



```js
var ev = new Event("look", {
  bubbles: true,
  cancelable: false
});
document.dispatchEvent(ev);

// 兼容写法
function myEventHandler(event) {
  var actualEvent = event || window.event;
  var actualTarget = actualEvent.target || actualEvent.srcElement;
  // ...
}
```



- `bubbles属性返回一个布尔值，表示当前事件是否会冒泡`



```js
function goInput(e) {
  if (!e.bubbles) {
    passItOn(e);
  } else {
    doOutput(e);
  }
}
```



### 自定义事件



```js
// 新建事件实例
var event = new Event('build');

// 添加监听函数
elem.addEventListener('build', function (e) { ... }, false);

// 触发事件
elem.dispatchEvent(event);
```



## 事件对象 Event

- 兼容性写法



```js
event = event || window.event;
//demo
document.onclick = function(event) {
  event = event || window.event;
  console.log(event); //event 事件对象
};
```



## 事件目标 target

- 兼容性写法



```js
targetId = event.target ? event.target.id : event.srcElement.id;
```



## EventEmitter

```js
class EventEmitter {
  constructor() {
        this.events = Object.create(null);
    }
    on(name, fn) {
      if (!this.events[name]) {
          this.events[name] = []
        }
        this.events[name].push(fn);
        return this;
    }
    emit(name, ...args) {
      if (!this.events[name]) {
          return this;
      }
      const fns = this.events[name]
      fns.forEach(fn => fn.call(this, ...args))
      return this;
    }
    off(name,fn) {
      if (!this.events[name]) {
          return this;
      }
        if (!fn) {
          this.events[name] = null
          return this
        }
        const index = this.events[name].indexOf(fn);
        this.events[name].splice(index, 1);
      return this;
    }
    once(name,fn) {
      const only = () => {
        fn.apply(this, arguments);
        this.off(name, only);
      };
      this.on(name, only);
      return this;
    }
}
```
