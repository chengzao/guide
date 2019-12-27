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
