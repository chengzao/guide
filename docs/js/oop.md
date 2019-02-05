# 模式

## 设计模式

### 创建型

- 工厂模式

```js
function createPerson(name, age) {
    var obj = {};
    obj.name = name;
    obj.age = age;
    obj.writeJs = function () {
        console.log(this.name + 'write js');
    }
    return obj;
}

var p1 = createPerson('mengzhe' , 26);
p1.writeJs();

var p2 = createPerson('iceman' , 25);
p2.writeJs();
```

- 构造函数模式

```js
function CreateJsPerson(name, age) {
    this.name = name;
    this.age = age;
    this.writeJs = function () {
        console.log(this.name + 'write js');
    }
    // 浏览器再把创建的实例默认的进行返回
}
var p1 = new CreateJsPerson('iceman' , 25);
p1.writeJs();
var p2 = new CreateJsPerson('mengzhe' , 26);
p2.writeJs();
```

- 单例模式,保证一个类仅有一个实例，并提供一个访问它的全局访问点

```js
class CreateUser {
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
        if(!instance) {
            instance = new CreateUser(name);
        }
        return instance;
    }
})();
// 测试单体模式的实例
var a = new ProxyMode("aaa");
var b = new ProxyMode("bbb");
// 因为单体模式是只实例化一次，所以下面的实例是相等的
console.log(a === b);    //true
```

### 结构型

- `适配器模式 装饰器模式 代理模式 外观模式 桥接模式 组合模式 享元模式`

- 代理模式, 为一个对象提供一个代用品或占位符，以便控制对它的访问或`(es6 Proxy)`

```js
var imgFunc = (function() {
    var imgNode = document.createElement('img');
    document.body.appendChild(imgNode);
    return {
        setSrc: function(src) {
            imgNode.src = src;
        }
    }
})();
var proxyImage = (function() {
    var img = new Image();
    img.onload = function() {
        imgFunc.setSrc(this.src);
    }
    return {
        setSrc: function(src) {
            imgFunc.setSrc('./loading,gif');
            img.src = src;
        }
    }
})();
proxyImage.setSrc('./pic.png');
```

- 装饰者模式, 在不改变对象自身的基础上，在程序运行期间给对象动态地添加方法或`(es7 Decorator)`

```js
Function.prototype.before = function(beforefn) {
    var self = this;    //保存原函数引用
    return function(){  //返回包含了原函数和新函数的 '代理函数'
        beforefn.apply(this, arguments);    //执行新函数，修正this
        return self.apply(this,arguments);  //执行原函数
    }
}
Function.prototype.after = function(afterfn) {
    var self = this;
    return function(){
        var ret = self.apply(this,arguments);
        afterfn.apply(this, arguments);
        return ret;
    }
}
var func = function() {
    console.log('2');
}
//func1和func3为挂载函数
var func1 = function() {
    console.log('1');
}
var func3 = function() {
    console.log('3');
}
func = func.before(func1).after(func3);
func();
```

### 行为型

```bash
策略模式 模板方法模式 观察者模式 迭代模式 状态模式
命令模式 备忘录模式 职责连模式 访问者模式 中介者模式 解释器模式
```

- 策略模式,定义一系列的算法，把他们一个个封装起来，并且使他们可以相互替换

```js
var levelOBJ = {
    "A": function(money) {
        return money * 4;
    },
    "B" : function(money) {
        return money * 3;
    },
    "C" : function(money) {
        return money * 2;
    }
};
/*环境类*/
var calculateBouns =function(level,money) {
    return levelOBJ[level](money);
};
console.log(calculateBouns('A',10000)); // 40000
```

- 中介者模式, 通过一个中介者对象，其他所有的相关对象都通过该中介者对象来通信,通过中介者模式可以解除对象与对象之间的紧耦合关系

```js
var goods = {   //手机库存
    'red|32G': 3,
    'red|64G': 1,
    'blue|32G': 7,
    'blue|32G': 6,
};
//中介者
var mediator = (function() {
    var colorSelect = document.getElementById('colorSelect');
    var memorySelect = document.getElementById('memorySelect');
    var numSelect = document.getElementById('numSelect');
    return {
        changed: function(obj) {
            switch(obj){
                case colorSelect:
                    //TODO
                    break;
                case memorySelect:
                    //TODO
                    break;
                case numSelect:
                    //TODO
                    break;
            }
        }
    }
})();
colorSelect.onchange = function() {
    mediator.changed(this);
};
memorySelect.onchange = function() {
    mediator.changed(this);
};
numSelect.onchange = function() {
    mediator.changed(this);
};
```

## 面向对象

- 封装 继承 多态  作用：复用
- 继承：就是修改对象中的原型链的层次结构,

## 构造函数

```js
function CreateObj(uName) {
    this.userName = uName;
}
CreateObj.prototype.showUserName = function(){
    return this.userName;
}
var obj1 = new CreateObj('ghostwu');
var obj2 = new CreateObj('卫庄');
console.log( obj1.showUserName === obj2.showUserName ); //true
```

## 构造函数new命令的原理

- 当我们实例化的时候系统到底做了哪几件事情
- 第一：创建一个空对象,作为将要返回的对象实例
- 第二：拷贝构造函数中的方法和属性到这个空对象中
- 第三：生成一个__proto__指针,指向构造函数的原型对象
- 第四：this指向这个空对象

```js
function Person(name){
   var  obj = new Object();//新建对象
   obj.name = name;//赋值属性
   obj.__proto__ = Person.prototype;//指定对象中的指针
   return obj;//返回对象
}
Person.prototype.getName = function(){
   console.log(this.name);
}
var person = new Person("hainan");
person.getName();

//2.0
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
  return (typeof result === 'object' && result != null) ? result : context;
}
function Person(name,age){
	this.name = name;
	this.age = age;
}
var actor = _new(Person, '张三', 28);
actor  // {name: "张三", age: 28}
```

<img src="../assets/images/oop/oop.jpg?raw=true" width='70%' alt="">
<img src="../assets/images/oop/oop2.png?raw=true" width='70%' alt="">
<img src="../assets/images/oop/oop-1.png?raw=true" alt="">

## 构造函数的继承

- 拷贝继承

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

- 寄生式组合继承

```js
function Father(name){
  this.name  = name;
  this.num = ['12'];
}
Father.prototype.sayname = function(){
  console.log(this.name);
}

function Child(age,name){
  Father.call(this,name);//继承属性
  this.age = age;
}
Child.prototype = new Father();//继承方法
Child.prototype.constructor = Child;

// Child原型方法
Child.prototype.sayage = function(){
  console.log(this.age);
}

var c1 = new Child(16,"小花");
c1.sayage();//16
c1.sayname();//小花
c1.num.push(13);
console.log(c1.num)//12,13

var c2 = new Child(18,"小明");
c2.sayage();//18
c2.sayname();//小明
console.log(c2.num)//12
```

- 原型式继承Object.create()

```js
function Super () {
  this.type = 'super'
  this.colors = ['red', 'blue', 'black']
}
function Child (name) {
  Super.call(this)
  this.type = 'child'
  this.name = 'name'
}
Child.prototype = Object.create(Super.prototype)
//或 Object.setPrototypeOf(Child.prototype, Super.prototype)
//或 Child.prototype.__proto__ = Super.prototype

Child.prototype.constructor = Child
var child = new Child('cat')
```

- 继承

```js
// 链接：https://juejin.im/post/5a96d78ef265da4e9311b4d8

function fancyShadowMerge(target, source) {
    for (const key of Reflect.ownKeys(source)) {
        Reflect.defineProperty(target, key, Reflect.getOwnPropertyDescriptor(source, key))
    }
    return target
}

// Core
function inherit(child, parent) {
    const objectPrototype = Object.prototype
    // 继承父类的原型
    const parentPrototype = Object.create(parent.prototype)
    let childPrototype = child.prototype
    // 若子类没有继承任何类，直接合并子类原型和父类原型上的所有方法
    // 包含可枚举/不可枚举的方法
    if (Reflect.getPrototypeOf(childPrototype) === objectPrototype) {
        child.prototype = fancyShadowMerge(parentPrototype, childPrototype)
    } else {
        // 若子类已经继承子某个类
        // 父类的原型将在子类原型链的尽头补全
        while (Reflect.getPrototypeOf(childPrototype) !== objectPrototype) {
			childPrototype = Reflect.getPrototypeOf(childPrototype)
        }
		Reflect.setPrototypeOf(childPrototype, parent.prototype)
    }
    // 重写被污染的子类的constructor
    parentPrototype.constructor = child
}
```

## amd-requirejs

- 异步加载模块,依赖前置,提前执行
- define定义模块define(['require','foo'],function(){return foo;});
- require加载模块(依赖前置) require(['foo','bar'],function(foo,bar){});

## cmd-seajs

- define定义exports导出 define(function(require,exports,module){});moduel上存储了当前模块上的一些对象。
- requre(./a)直接导入。require.async异步导入。
- 同步加载,依赖就近,延迟执行。

## MVC模式

![mvc][mvc]

- 将应用程序的组成划分为三个部分：Model View Controller
- 控制器(Controller):初始化模型用的,处理业务逻辑
- 模型(Model):用于存储数据的
- 视图(View):用于展现数据

## MVP

![mvp][mvp]

- MVP: Model-View-Presenter
- 各部分之间的通信是双向的
- View 与 Model 不发生联系,通过Presenter传递
- View非常薄,不部署任何业务逻辑；
- Presenter非常厚,所有逻辑部署在这里

## MVVM模式

![mvvm][mvvm]

- MVVM模式将Presenter变为ViewModel,基本与MVP一致.区别是,它是双向绑定(data-binding),view的变动,自动反映在ViewModel,反之亦然

- MVVM模式是Model-View-ViewMode(模型-视图-视图模型)模式的简称

<!-- url -->
[call-apply-url]:http://a.chenio.top/note/javascript/this/
[mvc]:../assets/images/o_mvc.png?raw=true
[mvp]:../assets/images/o_mvp.png?raw=true
[mvvm]:../assets/images/o_mvvm.png?raw=true

## URL

- [JS模块规范：AMD、UMD、CMD、commonJS、ES6 module](https://segmentfault.com/a/1190000012419990)
- [JavaScript设计模式](https://juejin.im/post/59df4f74f265da430f311909)
