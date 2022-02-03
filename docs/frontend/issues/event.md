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
