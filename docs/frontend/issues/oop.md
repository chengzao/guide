---
title: 设计模式/构造函数
date: 2021-06-20
sidebar: "auto"
categories:
  - frontend
---

## 工厂模式

:::tip

原地址： [JavaScript 设计模式 es6](https://juejin.im/post/5e021eb96fb9a01628014095)

:::

```js
function Persion(name) {
  var obj = {};
  obj.name = name;
  obj.say = function() {
    console.log("Hello,", this.name);
  };
  return obj;
}

var p1 = Persion("js");
p1.say(); // => Hello, js

var p2 = Persion("css");
p2.say(); // => Hello, css
```

## 构造函数模式

```js
function Persion(name, age) {
  this.name = name;
  this.age = age;
  this.say = function() {
    console.log("hello ", this.name);
  };
}
var p1 = new Persion("js", 12);
p1.say();
var p2 = new Persion("node", 16);
p2.say();
```

## 单例模式

```js
class User {
  constructor(name) {
    this.name = name;
    this.getName();
  }
  getName() {
    return this.name;
  }
}
// 代理实现单例模式
var ProxyMode = (function() {
  var instance = null;
  return function(name) {
    if (!instance) {
      instance = new User(name);
    }
    return instance;
  };
})();

var a = new ProxyMode("aaa");
var b = new ProxyMode("bbb");
console.log(a === b); // true
```

## 适配器模式

```js
class Plug {
  getName() {
    return "html";
  }
}

class Target {
  constructor() {
    this.plug = new Plug();
  }
  getName() {
    return this.plug.getName() + " css";
  }
}

let target = new Target();
target.getName(); // html css
```

## 代理模式

```js
let M = {
  send: function(target, gif) {
    target.receive(gif);
  }
};
let B = {
  receive: function(gif) {
    A.obs(function() {
      A.receive(gif);
    });
  }
};
let A = {
  receive: function(gif) {
    console.log("get " + gif);
  },
  obs: function(fn) {
    setTimeout(function() {
      fn();
    }, 1000);
  }
};

M.send(B, "flower"); // => get flower
```

## 装饰者模式

```js
class Cellphone {
  create() {
    console.log("生成一个手机");
  }
}
class Decorator {
  constructor(cellphone) {
    this.cellphone = cellphone;
  }
  create() {
    this.cellphone.create();
    this.createShell();
  }
  createShell() {
    console.log("生成手机壳");
  }
}

let cellphone = new Cellphone();
cellphone.create(); // 生成一个手机
console.log("------------");
let dec = new Decorator(cellphone);
dec.create(); // 生成一个手机 生成手机壳
```

## 观察者模式

```js
class Sub {
  constructor() {
    this.state = 0;
    this.observers = [];
  }
  getState() {
    return this.state;
  }
  setState(state) {
    this.state = state;
    this.notify();
  }
  notify() {
    this.observers.forEach(observer => {
      observer.update();
    });
  }
  add(observer) {
    this.observers.push(observer);
  }
}

class Observer {
  constructor(name, subject) {
    this.name = name;
    this.subject = subject;
    this.subject.add(this);
  }
  update() {
    console.log(`${this.name} update, state: ${this.subject.getState()}`);
  }
}
// add obs
let sub = new Sub();
let o1 = new Observer("o1", sub);
let o2 = new Observer("02", sub);
// update state
sub.setState(12);
// => o1 update, state: 12
// => 02 update, state: 12
```

- defineProperty

```js
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width,initial-scale=1,maximum-scale=1,viewport-fit=cover"
    />
    <title></title>
  </head>
  <body>
    <div id="app">
      <div id="dom-one"></div>
      <br />
      <div id="dom-two"></div>
      <br />
      <button id="btn">改变</button>
    </div>
    <script>
      /**
       * 观察监听一个对象成员的变化
       * @param {Object} obj 观察的对象
       * @param {String} targetVariable 观察的对象成员
       * @param {Function} callback 目标变化触发的回调
       */
      function observer(obj, targetVariable, callback) {
        if (!obj.data) {
          obj.data = {}
        }
        Object.defineProperty(obj, targetVariable, {
          get() {
            return this.data[targetVariable]
          },
          set(val) {
            this.data[targetVariable] = val
            // 目标主动通知观察者
            callback && callback(val)
          },
        })
        if (obj.data[targetVariable]) {
          callback && callback(obj.data[targetVariable])
        }
      }

      const obj = {
        data: { description: '原始值' },
      }

      observer(obj, 'description', value => {
        document.querySelector('#dom-one').innerHTML = value
        document.querySelector('#dom-two').innerHTML = value
      })

      btn.onclick = () => {
        obj.description = '改变了'
      }
    </script>
  </body>
</html>
```

## 发布订阅模式

> 发布者 -> 事件中心 <=> 订阅者

```js
class EventEmitter {
    constructor() {
        this.cache = {}
    }
    on(name, fn) {
        if (this.cache[name]) {
            this.cache[name].push(fn)
        } else {
            this.cache[name] = [fn]
        }
    }
    off(name, fn) {
        let tasks = this.cache[name]
        if (tasks) {
            const index = tasks.findIndex(f => f === fn || f.callback === fn)
            if (index >= 0) {
                tasks.splice(index, 1)
            }
        }
    }
    emit(name, once = false, ...args) {
        if (this.cache[name]) {
            // 创建副本，如果回调函数内继续注册相同事件，会造成死循环
            let tasks = this.cache[name].slice()
            for (let fn of tasks) {
                fn(...args)
            }
            if (once) {
                delete this.cache[name]
            }
        }
    }
}
```

## 面向对象

- 封装 继承 多态 作用：复用
- 继承：就是修改对象中的原型链的层次结构

## 构造函数

```js
function Func(uName) {
  this.userName = uName;
}
Func.prototype.showUserName = function() {
  return this.userName;
};
var obj1 = new Func("hello");
var obj2 = new Func("xiao ming");
console.log(obj1.showUserName === obj2.showUserName); //true
```

## 原型链示意图

![oop](https://cdn.jsdelivr.net/gh/chengzao/imgbed@main/images/oop.jpg)
