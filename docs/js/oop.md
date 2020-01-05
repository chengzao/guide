# 模式

## 设计模式

- 工厂模式

<CodeBlock>

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

</CodeBlock>

- 构造函数模式

<CodeBlock>

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

</CodeBlock>

- 单例模式

<CodeBlock>

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

</CodeBlock>

- 适配器模式

<CodeBlock>

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

</CodeBlock>

- 代理模式

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

- 装饰者模式

<CodeBlock>

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

</CodeBlock>

- 观察者模式

<CodeBlock>

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

</CodeBlock>

## 面向对象

- 封装 继承 多态 作用：复用
- 继承：就是修改对象中的原型链的层次结构

## 构造函数

<CodeBlock>

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

</CodeBlock>

## 构造函数 new 命令的原理

### js 的 new 操作符做了哪些事情

1. 创建一个空对象,作为将要返回的对象实例
2. 拷贝构造函数中的方法和属性到这个空对象中
3. 生成一个**proto**指针,指向构造函数的原型对象
4. this 指向这个空对象

- 代码1

```js
function Person(name) {
  var obj = new Object();
  obj.name = name;
  obj.__proto__ = Person.prototype;
  return obj;
}
Person.prototype.getName = function() {
  console.log(this.name);
};
var person = new Person("hainan");
person.getName();
```

- 代码2

```js
function _new() {
  // 将 arguments 对象转为数组
  var args = [].slice.call(arguments);
  // 取出构造函数
  var constructor = args.shift();
  // 创建一个空对象,继承构造函数的 prototype 属性
  var context = Object.create(constructor.prototype);
  // 执行构造函数
  var result = constructor.apply(context, args);
  // 如果返回结果是对象,就直接返回,则返回 context 对象
  return typeof result === "object" && result != null ? result : context;
}
function Person(name, age) {
  this.name = name;
  this.age = age;
}
var actor = _new(Person, "张三", 28);
actor; // => {name: "张三", age: 28}
```

- 代码3

```js
function _new(func) {
  let o = Object.create(func.prototype);
  let k = func.call(o);
  return typeof k === "object" ? k : o;
}

function M() {
  this.name = "liwenli";
}

let m = _new(M);
console.log(m instanceof M); // instanceof 检测实例
console.log(m.__proto__.constructor === M);
```

## prototype示意图

![oop](https://gitee.com/cxyz/imgbed/raw/img/img/oop.jpg)

## 构造函数的继承

- 拷贝继承

<CodeBlock>

```js
function extend2(Child, Parent) {
    var p = Parent.prototype;
    var c = Child.prototype;
    for (var i in p) {
        c[i] = p[i];
    }
    c.uber = p;
}

function Animal(){}
Animal.prototype.eat = function(){ console.log('animal eat') }

extend2(Cat, Animal);
var cat1 = new Cat('po' 'orange');
console.log(cat1.eat()); // animal eat
```

</CodeBlock>

- 寄生组合式继承

<CodeBlock>

```js
function Father(name) {
  this.name = name;
  this.num = ["12"];
}
Father.prototype.sayname = function() {
  console.log(this.name);
};

function Child(age, name) {
  Father.call(this, name); //继承属性
  this.age = age;
}

// 用一个 F 空的构造函数去取代执行了 Parent 这个构造函数
function create(proto) {
  function F() {}
  F.prototype = proto;
  return new F();
}

Child.prototype = create(Parent.prototype); //继承方法
Child.prototype.constructor = Child;

// Child原型方法
Child.prototype.sayage = function() {
  console.log(this.age);
};

var c1 = new Child(16, "小花");
c1.sayage(); //16
c1.sayname(); //小花
c1.num.push(13);
console.log(c1.num); //12,13

var c2 = new Child(18, "小明");
c2.sayage(); //18
c2.sayname(); //小明
console.log(c2.num); //12
```

</CodeBlock>

- 原型式继承`Object.create`

<CodeBlock>

```js
function Super() {
  this.type = "super";
  this.colors = ["red", "blue", "black"];
}
function Child(name) {
  Super.call(this);
  this.type = "child";
  this.name = "name";
}
Child.prototype = Object.create(Super.prototype);
//或 Object.setPrototypeOf(Child.prototype, Super.prototype)
//或 Child.prototype.__proto__ = Super.prototype

Child.prototype.constructor = Child;
var child = new Child("cat");
```

</CodeBlock>

- 继承

<CodeBlock>

```js
// 链接：https://juejin.im/post/5a96d78ef265da4e9311b4d8

function fancyShadowMerge(target, source) {
  for (const key of Reflect.ownKeys(source)) {
    Reflect.defineProperty(
      target,
      key,
      Reflect.getOwnPropertyDescriptor(source, key)
    );
  }
  return target;
}

// Core
function inherit(child, parent) {
  const objectPrototype = Object.prototype;
  // 继承父类的原型
  const parentPrototype = Object.create(parent.prototype);
  let childPrototype = child.prototype;
  // 若子类没有继承任何类，直接合并子类原型和父类原型上的所有方法
  // 包含可枚举/不可枚举的方法
  if (Reflect.getPrototypeOf(childPrototype) === objectPrototype) {
    child.prototype = fancyShadowMerge(parentPrototype, childPrototype);
  } else {
    // 若子类已经继承子某个类
    // 父类的原型将在子类原型链的尽头补全
    while (Reflect.getPrototypeOf(childPrototype) !== objectPrototype) {
      childPrototype = Reflect.getPrototypeOf(childPrototype);
    }
    Reflect.setPrototypeOf(childPrototype, parent.prototype);
  }
  // 重写被污染的子类的constructor
  parentPrototype.constructor = child;
}
```

</CodeBlock>

## define module

- [原文](http://houdunren.gitee.io/note/js/13%20%E6%A8%A1%E5%9D%97%E8%AE%BE%E8%AE%A1.html#%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86)

```js
let module = (function() {
  //模块列表集合
  const moduleLists = {};
  function define(name, modules, action) {
    modules.map((m, i) => {
      modules[i] = moduleLists[m];
    });
    //执行并保存模块
    moduleLists[name] = action.apply(null, modules);
  }

  return { define };
})();

//声明模块不依赖其它模块
module.define("a", [], function() {
  return {
    show() {
      console.log("A module func");
    }
  };
});

//声明模块时依赖其它模块
module.define("b", ["a"], function(f) {
  f.show();
});
```

## amd-requirejs

- 异步加载模块,依赖前置,提前执行
- define 定义模块`define(['require','foo'],function(){return foo;})`;
- require 加载模块(依赖前置) require(['foo','bar'],function(foo,bar){});

```js
// a.js
define(function() {
  return {
    a: "hello world"
  };
});
// b.js
require(["./a.js"], function(moduleA) {
  console.log(moduleA.a); // 打印出：hello world
});
```

## cmd-seajs

- define 定义 exports 导出 `define(function(require,exports,module){})`;moduel 上存储了当前模块上的一些对象。
- requre(./a)直接导入。require.async 异步导入。
- 同步加载,依赖就近,延迟执行。

```js
// a.js
define(function(require, exports, module) {
  exports.a = "hello world";
});
// b.js
define(function(require, exports, module) {
  var moduleA = require("./a.js");
  console.log(moduleA.a); // 打印出：hello world
});
```

## UMD

- 兼容 AMD 和 commonJS 规范的同时

```js
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    //AMD
    define(["jquery"], factory);
  } else if (typeof exports === "object") {
    //Node, CommonJS之类的
    module.exports = factory(require("jquery"));
  } else {
    //浏览器全局变量(root 即 window)
    root.returnExports = factory(root.jQuery);
  }
})(this, function($) {
  //方法
  function myFunc() {}
  //暴露公共方法
  return myFunc;
});
```

## ES6 module

```js
// a.js
export var m = 1;
export {};
export { n as m };
export default n;

// b.js
import "./a.js";
import * as m from "./a.js";
import { n as v } from "./a.js";
import { n } from "./a.js";
```

## commonJS

```js
module.export = {};

let fn = reqiure("");
```

## 原型链示意图

![oop](https://gitee.com/cxyz/imgbed/raw/img/img/oop.jpg)

## 相关链接

- [JavaScript 设计模式 es6](https://juejin.im/post/5e021eb96fb9a01628014095)
