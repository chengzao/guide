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
