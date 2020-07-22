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
