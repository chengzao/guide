---
title: 移动端的touch事件
date: 2020-07-20
sidebar: "auto"
tags:
  - mobile
categories:
  - libs
---

## 点击事件



```js
var touch = {
  /* 点击事件 */
  tap: function (dom, callback) {
    if (dom && typeof dom == 'object') {
      var isMove = false;
      var startTime = 0;
      dom.addEventListener('touchstart', function (e) {
        startTime = Date.now();
      }, false);
      dom.addEventListener('touchmove', function (e) {
        e.preventDefault();
        isMove = true;
      }, false);
      dom.addEventListener('touchend', function (e) {
        e.preventDefault();
        /*是否满足tap 的要求*/
        if (!isMove && (Date.now() - startTime) < 150) {
          /*调用 callback*/
          callback && callback(e);
        }
        /*重置*/
        isMove = false;
        startTime = 0;
      }, false);
    }
  }
}
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


