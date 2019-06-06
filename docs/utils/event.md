# 事件兼容

[[toc]]

## 获取键盘事件的键值

<CodeBlock>

```js
function getKeyCode(e) {
  e = e ? e : (window.event ? window.event : "")
  return e.keyCode ? e.keyCode : e.which
}
```

</CodeBlock>

## 兼容onmousewheel

<CodeBlock>

```js
// 兼容onmousewheel
function addMouseWheelEvent(element, func) {
    if (typeof element.onmousewheel == "object") {
        element.onmousewheel = function (ev) {
            ev = ev || window.event;
            //console.log(ev.wheelDelta);
            func();
        };
    } else {
        // 兼容 firefox
        element.addEventListener("DOMMouseScroll", function (ev) {
            ev = ev || window.event;
            //console.log('ev.detail : '+ev.detail);
            func();
        }, false);
    }
}

```

</CodeBlock>

## 禁止选中

<CodeBlock>

```js
// 禁止选中
function disabledSel() {
    if (document.all) {
        document.onselectstart = function () { return false; }; //for ie
    } else {
        document.onmousedown = function () { return false; };
        document.onmouseup = function () { return true; };
    }
    document.onselectstart = new Function('event.returnValue=false;');
    if (window.getSelector) {
        var selection = window.getSelection();
        selection.removeAllRanges();
    } else if (document.selection && document.selection.empty) {
        document.selection.empty();
        // document.selection.clear();
    }
}
```

</CodeBlock>

## 事件的监听与移除

<CodeBlock>

```js

/**
 * 事件的监听与移除
 * 例：
    var textbox = document.getElementById('input');
    EventUtil.addHandler(textbox, 'textInput', function (e) {
        // 将除了（小数和小数点）的其他字符替换为空
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
var addEvent = (function(){
    if (window.addEventListener) {
        return function(el, sType, fn, capture) {
            el.addEventListener(sType, function(e) {
                fn.call(el, e);
            }, (capture));
        };
    } else if (window.attachEvent) {
        return function(el, sType, fn, capture) {
            el.attachEvent("on" + sType, function(e) {
                fn.call(el, e);
            });
        };
    }
})();
```

</CodeBlock>

## requestAnimationFrame兼容

<CodeBlock>

```js
(function () {
    var lastTime = 0;
    var vendors = ['webkit', 'moz', 'o', 'ms'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
            // name has changed in Webkit
            window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
    }
}());
```

</CodeBlock>

## 封装DOMContentLoaded事件

<CodeBlock>

```js
// Javascript封装DOMContentLoaded事件
function ready(callback){
    // 目前Mozilla、Opera和webkit 525+内核支持DOMContentLoaded事件
    if(document.addEventListener) {
        document.addEventListener('DOMContentLoaded', function() {
            document.removeEventListener('DOMContentLoaded',arguments.callee, false);
            callback&& callback();
        }, false);
    }

    // 如果IE
    else if(document.attachEvent) {
        // 确保当页面是在iframe中加载时，事件依旧会被安全触发
        document.attachEvent('onreadystatechange', function() {
            if(document.readyState == 'complete') {
                document.detachEvent('onreadystatechange', arguments.callee);
                callback&& callback();
            }
        });

        // 如果是IE且页面不在iframe中时，轮询调用doScroll 方法检测DOM是否加载完毕
        if(document.documentElement.doScroll && typeof window.frameElement === "undefined") {
            try{
                document.documentElement.doScroll('left');
            }
            catch(error){
                return setTimeout(arguments.callee, 20);
            };
            callback&& callback();
        }
    }
};

```

</CodeBlock>

## 冒泡和阻止默认事件封装

<CodeBlock>

```js
var util = {
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
    },
    // 阻止事件冒泡
    stopPro: function (e) {
        e = e || window.event;
        if (document.all) { //只有ie识别
            e.cancelBubble = true;
        } else {
            e.stopPropagation();
        }
    },
    // 取消默认行为
    stopDefault: function (e) {
        e = e || window.event;
        if (document.all) {
            window.event.returnValue = false;
        } else {
            event.preventDefault();
        }
    },
    // target兼容
    targetEl: function (e) {
        // event兼容
        var event = e || window.event;
        var targetEl = event.target || event.srcElement;
        return targetEl;
    }
}

```

</CodeBlock>

## bind兼容

<CodeBlock>

```js
if(!('bind' in Function.prototype)){
  Function.prototype.bind = function(){
    var fn = this;
    var context = arguments[0];
    var args = Array.prototype.slice.call(arguments, 1);
    return function(){
      return fn.apply(context, args);
    }
  }
}

// 原型链
Function.prototype.bind=function(obj,arg){
  var arg=Array.prototype.slice.call(arguments,1);
  var context=this;
  var bound=function(newArg){
    arg=arg.concat(Array.prototype.slice.call(newArg));
    return context.apply(obj,arg);
  }
  var F=function(){}
  //这里需要一个寄生组合继承
  F.prototype=context.prototype;
  bound.prototype=new F();
  return bound;
}
```

</CodeBlock>

## 用setTimeout来实现setInterval

<CodeBlock>

```js
function callback(){
  //doSomething
  setTimeout(callback,200);
}
setTimeout(callback,200)
```

</CodeBlock>

## new关键字演示

<CodeBlock>

```js
/**
 * new2 new关键字的代码实现演示
 * @param {function} func 被new的类 (构造函数)
 */
function new2(func) {
    // 创建了一个实例对象 o，并且这个对象__proto__指向func这个类的原型对象
    let o = Object.create(func.prototype);
    // (在构造函数中this指向当前实例)让这个类作为普通函数值行 并且里面this为实例对象
    let k = func.call(o);
    // 最后再将实例对象返回 如果你在类中显示指定返回值k，
    // 注意如果返回的是引用类型则将默认返回的实例对象o替代掉
    return typeof k === 'object' ? k : o;
}

// 实验
function M() { // 即将被new的类
    this.name = 'liwenli';
}

let m = new2(M); // 等价于 new M 这里只是模拟
console.log(m instanceof M); // instanceof 检测实例
console.log(m instanceof Object);
console.log(m.__proto__.constructor === M);
```

</CodeBlock>

## `Object.create兼容`

<CodeBlock>

```js
Object._create = function(o){
    if(!Object.create){
        Object.prototype.create =function(o){
           var F =  function() {};
            F.prototype = o;
            return new F();
        }
    }
}
```

</CodeBlock>
