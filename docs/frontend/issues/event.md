---
title: 常见的浏览器事件封装
date: 2020-07-20
sidebar: "auto"
tags:
  - event
categories:
  - frontend
---

## 获取键盘事件的键值



```js
function getKeyCode(e) {
  e = e ? e : (window.event ? window.event : "")
  return e.keyCode ? e.keyCode : e.which
}
```



## onmousewheel 兼容



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



## 禁止选中



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



## requestAnimationFrame



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



## DOMContentLoaded



```js
// Javascript封装DOMContentLoaded事件
function ready(callback) {
  // 目前Mozilla、Opera和webkit 525+内核支持DOMContentLoaded事件
  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', function () {
      document.removeEventListener('DOMContentLoaded', arguments.callee, false);
      callback && callback();
    }, false);
  }

  // 如果IE
  else if (document.attachEvent) {
    // 确保当页面是在iframe中加载时，事件依旧会被安全触发
    document.attachEvent('onreadystatechange', function () {
      if (document.readyState == 'complete') {
        document.detachEvent('onreadystatechange', arguments.callee);
        callback && callback();
      }
    });

    // 如果是IE且页面不在iframe中时，轮询调用doScroll 方法检测DOM是否加载完毕
    if (document.documentElement.doScroll && typeof window.frameElement === "undefined") {
      try {
        document.documentElement.doScroll('left');
      }
      catch (error) {
        return setTimeout(arguments.callee, 20);
      };
      callback && callback();
    }
  }
};

```



## 阻止冒泡



```js
var util = {
  // 阻止事件冒泡
  stopPro: function (e) {
    e = e || window.event;
    if (document.all) { //只有ie识别
      e.cancelBubble = true;
    } else {
      e.stopPropagation();
    }
  }
}

```



## 阻止默认事件



```js
var util = {
  // 取消默认行为
  stopDefault: function (e) {
    e = e || window.event;
    if (document.all) {
      window.event.returnValue = false;
    } else {
      event.preventDefault();
    }
  },
}
```



## targetElement



```js
var util = {
  // target兼容
  targetEl: function (e) {
    // event兼容
    var event = e || window.event;
    var targetEl = event.target || event.srcElement;
    return targetEl;
  }
}
```



## dispatchDOMEvent

- [dispatchDOMEvent](https://juejin.im/post/5e5f326af265da576c24d2cc#heading-10)

```js
function dispatchDOMEvent(el, payload, eventInit) {
  let event;
  if (void 0 !== Event) {
    event = new Event(type, eventInit);
  } else {
    event = document.createEvent("HTMLEvents");
    event.initEvent(type, eventInit?.bubbles, eventInit?.cancelable);
  }
  return el.dispatchEvent(event);
}
```

## EventEmitter（发布订阅模式）

> [36个手写题](https://juejin.cn/post/6946022649768181774#heading-10)

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

### 自定义事件event

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

## 事件的传播(事件流)

- 什么是事件流：事件流描述的是从页面中接收事件的顺序,DOM2 级事件流包括下面几个阶段的三个阶段:
- 第一阶段：从 window 对象传导到目标节点,称为"`捕获阶段`"(capture phase)
- 第二阶段：在目标节点上触发,称为"`目标阶段`"(target phase)
- 第三阶段：从目标节点传导回 window 对象,称为"`冒泡阶段`"(bubbling phase)
- `IE只支持事件冒泡`

## 事件委托

- 利用事件冒泡的原理,将事件绑定在父容器中,让父容器代为触发

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

## EventListener事件兼容

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

## 长按事件

```js
var touch = {
  /* 长按事件 */
  longTap: function (dom, callback) {
    if (dom && typeof dom == 'object') {
      var startX, startY, startTime, isLongTime = false;
      dom.addEventListener('touchstart', function (e) {
        startTime = Date.now();
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      }, false);
      dom.addEventListener('touchend', function (e) {
        e.stopPropagation();
        e.preventDefault();
        var endX = e.changedTouches[0].clientX;
        var endY = e.changedTouches[0].clientY;
        if (Math.abs(endX - startX) < 6 && Math.abs(endY - startY) < 6) {
          isLongTime = true;
        } else {
          isLongTime = false;
        }

        if ((+new Date()) - startTime > 200 && isLongTime) {
          callback && callback(e);
        }
      }, false);
    }
  }
}
```

## 双击事件

```js
var touch = {
  /* 双击事件 */
  doubleTap: function (dom, callback) {
    if (!dom) {
      return false;
    }
    var isTouchEnd = false,
      lastTime = 0,
      lastTx = null,
      lastTy = null,
      firstTouchEnd = true,
      body = document.body,
      dTapTimer, startTx, startTy, startTime;
    dom.addEventListener('touchstart', function (e) {
      if (dTapTimer) {
        clearTimeout(dTapTimer);
        dTapTimer = null;
      }
      var touches = e.touches[0];
      startTx = touches.clientX;
      startTy = touches.clientY;
    }, false);
    dom.addEventListener('touchend', function (e) {
      var touches = e.changedTouches[0],
        endTx = touches.clientX,
        endTy = touches.clientY,
        now = Date.now(),
        duration = now - lastTime;
      // 首先要确保能触发单次的 tap 事件
      if (Math.abs(startTx - endTx) < 6 && Math.abs(startTx - endTx) < 6) {
        // 两次 tap 的间隔确保在 500 毫秒以内
        if (duration < 301) {
          // 本次的 tap 位置和上一次的 tap 的位置允许一定范围内的误差
          if (lastTx !== null &&
            Math.abs(lastTx - endTx) < 45 &&
            Math.abs(lastTy - endTy) < 45) {
            firstTouchEnd = true;
            lastTx = lastTy = null;
            callback && callback(e);
          }
        } else {
          lastTx = endTx;
          lastTy = endTy;
        }
      } else {
        firstTouchEnd = true;
        lastTx = lastTy = null;
      }
      lastTime = now;
    }, false);
    // 在 iOS 的 safari 上手指敲击屏幕的速度过快，
    // 有一定的几率会导致第二次不会响应 touchstart 和 touchend 事件
    // 同时手指长时间的touch不会触发click
    if (~navigator.userAgent.toLowerCase().indexOf('iphone os')) {
      body.addEventListener('touchstart', function (e) {
        startTime = Date.now();
      }, true);
      body.addEventListener('touchend', function (e) {
        var noLongTap = Date.now() - startTime < 501;
        if (firstTouchEnd) {
          firstTouchEnd = false;
          if (noLongTap && e.target === dom) {
            dTapTimer = setTimeout(function () {
              firstTouchEnd = true;
              lastTx = lastTy = null;
              callback && callback(e);
            }, 400);
          }
        } else {
          firstTouchEnd = true;
        }
      }, true);
      // iOS 上手指多次敲击屏幕时的速度过快不会触发 click 事件
      dom.addEventListener('click', function (e) {
        if (dTapTimer) {
          clearTimeout(dTapTimer);
          dTapTimer = null;
          firstTouchEnd = true;
        }
      }, false);
    }
  }
}
```

## 向上滑动事件

```js
var touch = {
  /*向上滑动事件*/
  swipeUp: function (dom, callback) {
    if (!dom) {
      return false;
    }
    var isTouchMove, startTx, startTy;
    dom.addEventListener('touchstart', function (e) {
      var touches = e.touches[0];
      startTx = touches.clientX;
      startTy = touches.clientY;
      isTouchMove = false;
    }, false);
    dom.addEventListener('touchmove', function (e) {
      isTouchMove = true;
      e.preventDefault();
    }, false);
    dom.addEventListener('touchend', function (e) {
      if (!isTouchMove) {
        return;
      }
      var touches = e.changedTouches[0],
        endTx = touches.clientX,
        endTy = touches.clientY,
        distanceX = startTx - endTx
      distanceY = startTy - endTy,
        isSwipe = false;
      if (Math.abs(distanceX) < Math.abs(distanceY)) {
        if (distanceY > 20) {
          callback();
          isSwipe = true;
        }
      }
    }, false);
  }
}
```

## 向下滑动事件

```js
var touch = {
  /*向下滑动事件*/
  swipeDown: function (dom, callback) {
    if (!dom) {
      return false;
    }
    var isTouchMove, startTx, startTy;
    dom.addEventListener('touchstart', function (e) {
      var touches = e.touches[0];
      startTx = touches.clientX;
      startTy = touches.clientY;
      isTouchMove = false;
    }, false);
    dom.addEventListener('touchmove', function (e) {
      isTouchMove = true;
      e.preventDefault();
    }, false);
    dom.addEventListener('touchend', function (e) {
      if (!isTouchMove) {
        return;
      }
      var touches = e.changedTouches[0],
        endTx = touches.clientX,
        endTy = touches.clientY,
        distanceX = startTx - endTx
      distanceY = startTy - endTy,
        isSwipe = false;
      if (Math.abs(distanceX) < Math.abs(distanceY)) {
        if (distanceY < -20) {
          callback();
          isSwipe = true;
        }
      }
    }, false);
  }
}
```

## 向左滑动事件

```js
var touch = {
  /*向左滑动事件*/
  swipeLeft: function (dom, callback) {
    if (!dom) {
      return false;
    }
    var isTouchMove, startTx, startTy;
    dom.addEventListener('touchstart', function (e) {
      var touches = e.touches[0];
      startTx = touches.clientX;
      startTy = touches.clientY;
      isTouchMove = false;
    }, false);
    dom.addEventListener('touchmove', function (e) {
      isTouchMove = true;
      e.preventDefault();
    }, false);
    dom.addEventListener('touchend', function (e) {
      if (!isTouchMove) {
        return;
      }
      var touches = e.changedTouches[0],
        endTx = touches.clientX,
        endTy = touches.clientY,
        distanceX = startTx - endTx
      distanceY = startTy - endTy,
        isSwipe = false;
      if (Math.abs(distanceX) >= Math.abs(distanceY)) {
        if (distanceX > 20) {
          callback();
          isSwipe = true;
        }
      }
    }, false);
  }
}
```

## 向右滑动事件

```js
var touch = {
  /*向右滑动事件*/
  swipeRight: function (dom, callback) {
    if (!dom) {
      return false;
    }
    var isTouchMove, startTx, startTy;
    dom.addEventListener('touchstart', function (e) {
      var touches = e.touches[0];
      startTx = touches.clientX;
      startTy = touches.clientY;
      isTouchMove = false;
    }, false);
    dom.addEventListener('touchmove', function (e) {
      isTouchMove = true;
      e.preventDefault();
    }, false);
    dom.addEventListener('touchend', function (e) {
      if (!isTouchMove) {
        return;
      }
      var touches = e.changedTouches[0],
        endTx = touches.clientX,
        endTy = touches.clientY,
        distanceX = startTx - endTx
      distanceY = startTy - endTy,
        isSwipe = false;
      if (Math.abs(distanceX) >= Math.abs(distanceY)) {
        if (distanceX < -20) {
          callback();
          isSwipe = true;
        }
      }
    }, false);
  }
}
```
