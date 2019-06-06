# 事件

## 介绍

- `事件源.事件 = function(){ 事件驱动程序 }`

- [event-type](http://javascript.ruanyifeng.com/dom/event-type.html)

## 模型

- [事件模型](http://javascript.ruanyifeng.com/dom/event.html)
- `addEventListener：绑定事件的监听函数`
- `removeEventListener：移除事件的监听函数`
- `dispatchEvent：在当前节点上触发指定事件,从而触发监听函数的执行`

### addEventListener

- `target.addEventListener(type, listener[, useCapture]);`

<CodeBlock>

```js
// type：事件名称，大小写敏感。
// listener：监听函数。事件发生时，会调用该监听函数。
// useCapture：布尔值，表示监听函数是否在捕获阶段，默认为false

window.addEventListener('load', function () {...}, false);
request.addEventListener('readystatechange', function () {...}, false);
```

</CodeBlock>

### removeEventListener

- `target.removeEventListener(type, listener[, useCapture]);`

### dispatchEvent

- `target.dispatchEvent(event)`

## 事件队列

- 同步任务 synchronous
- 异步任务 asynchronous
- 异步运行机制
  - 所有同步任务都在主线程上执行,形成一个执行栈(execution context stack)
  - 主线程之外,还存在一个"任务队列" (task queue)
     只要异步任务有了运行结果,就在"任务队列"之中放置一个事件.
  - 一旦"执行栈"中的所有同步任务执行完毕,系统就会读取"任务队列",
    查看队列中的事件任务.那些对应的异步任务,于是结束等待状态,
    进入执行栈,开始执行
  - 主线程不断重复上面的第三步

## Job queue中的执行顺序(Event Loop)

- 原地址：[从promise、process.nextTick、setTimeout出发，谈谈Event Loop中的Job queue #5](https://github.com/forthealllight/blog/issues/5)
- `同步代码—>microTask—>macroTask :`
- `macro-task`队列真实包含任务：
  - `script(主程序代码),setTimeout, setInterval, setImmediate(Node.js 环境), I/O, UI rendering`
- `micro-task`队列真实包含任务：
  - `process.nextTick(Node.js 环境), Promises, Object.observe, MutationObserver`
- 执行顺序应该为：
  - `script(主程序代码)—>process.nextTick—>Promises...——>setTimeout——>setInterval——>setImmediate——> I/O——>UI rendering`
- 在ES6中`macro-task`队列又称为`ScriptJobs`，而`micro-task`又称`PromiseJobs`

<CodeBlock>

```bash
假设：
macro-task队列包含任务: a1, a2 , a3
micro-task队列包含任务: b1, b2 , b3

执行顺序为，首先执行marco-task队列开头的任务，也就是 a1 任务，执行完毕后，在执行micro-task队列里的所有任务，也就是依次执行***b1, b2 , b3***，执行完后清空micro-task中的任务，接着执行marco-task中的第二个任务，依次循环。
```

</CodeBlock>

## 事件的传播(事件流)

- 什么是事件流：事件流描述的是从页面中接收事件的顺序,DOM2级事件流包括下面几个阶段的三个阶段:
- 第一阶段：从window对象传导到目标节点,称为"`捕获阶段`"(capture phase)
- 第二阶段：在目标节点上触发,称为"`目标阶段`"(target phase)
- 第三阶段：从目标节点传导回window对象,称为"`冒泡阶段`"(bubbling phase)
- `IE只支持事件冒泡`

## 事件委托

- 利用事件冒泡的原理,将事件绑定在父容器中,让父容器代为触发
- 事件委托指的是，不在事件的发生地（直接dom）上设置监听函数，而是在其父元素上设置监听函数，通过事件冒泡，父元素可以监听到子元素上事件的触发，通过判断事件发生元素DOM的类型，来做出不同的响应
- 好处：比较合适动态元素的绑定，新添加的子元素也会有监听函数，也可以有事件触发机制

<CodeBlock>

```js
var ul = document.querySelector('ul');
ul.addEventListener('click', function(event) {
  if (event.target.tagName.toLowerCase() === 'li') {
    // some code
  }
});

// 阻止当前监听函数的传播
//stopPropagation方法只会阻止当前监听函数的传播，
//不会阻止<p>节点上的其他click事件的监听函数
p.addEventListener('click', function(event) {
  event.stopPropagation();
});

//如果想要不再触发那些监听函数，可以使用stopImmediatePropagation方法
p.addEventListener('click', function(event) {
 event.stopImmediatePropagation();
});

p.addEventListener('click', function(event) {
 // 不会被触发
});
```

</CodeBlock>

## 事件如何先捕获后冒泡

在DOM标准事件模型中，是先捕获后冒泡。但是如果要实现先冒泡后捕获的效果，对于同一个事件，监听捕获和冒泡，分别对应相应的处理函数，监听到捕获事件，先暂缓执行，直到冒泡事件被捕获后再执行捕获事件。

## 哪些事件不支持冒泡事件

- 鼠标事件：`mouserleave  mouseenter`
- 焦点事件：`blur focus`
- UI事件：`scroll resize`

### Event对象

- `event = new Event(typeArg, eventInit);`
- 第一个参数是字符串，表示事件的名称
- 第二个参数是一个对象，表示事件对象的配置
- bubbles：布尔值，可选，默认为false，表示事件对象是否冒泡
- cancelable：布尔值，可选，默认为false，表示事件是否可以被取消

<CodeBlock>

```js
var ev = new Event(
  'look',
  {
    'bubbles': true,
    'cancelable': false
  }
);
document.dispatchEvent(ev);

// 兼容写法
function myEventHandler(event) {
  var actualEvent = event || window.event;
  var actualTarget = actualEvent.target || actualEvent.srcElement;
  // ...
}
```

</CodeBlock>

- `bubbles属性返回一个布尔值，表示当前事件是否会冒泡`

<CodeBlock>

```js
function goInput(e) {
  if (!e.bubbles) {
    passItOn(e);
  } else {
    doOutput(e);
  }
}
```

</CodeBlock>

### 自定义事件

<CodeBlock>

```js
// 新建事件实例
var event = new Event('build');

// 添加监听函数
elem.addEventListener('build', function (e) { ... }, false);

// 触发事件
elem.dispatchEvent(event);
```

</CodeBlock>

## 事件对象Event

- 兼容性写法

<CodeBlock>

```js
event = event || window.event;
//demo
document.onclick=function(event){
	event = event || window.event;
	console.log(event);//event 事件对象
}
```

</CodeBlock>

<img src="../assets/images/event.png?raw=true" alt="">

## 事件监听

- detachEvent() 和 removeEventListener()  //解除事件
- attachEvent()和addEventListener()   //绑定事件

## 事件目标target

- 兼容性写法

<CodeBlock>

```js
targetId = event.target ? event.target.id : event.srcElement.id;
```

</CodeBlock>
