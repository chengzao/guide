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
