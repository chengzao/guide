/**
 * 横竖屏
 * @param {Object}
 */
function changeOrientation($print) {
  var width = document.documentElement.clientWidth;
  var height = document.documentElement.clientHeight;
  if (width < height) {
    $print.width(height);
    $print.height(width);
    $print.css('top', (height - width) / 2);
    $print.css('left', 0 - (height - width) / 2);
    $print.css('transform', 'rotate(90deg)');
    $print.css('transform-origin', '50% 50%');
  }

  var evt = "onorientationchange" in window ? "orientationchange" : "resize";

  window.addEventListener(evt, function () {

    setTimeout(function () {
      var width = document.documentElement.clientWidth;
      var height = document.documentElement.clientHeight;
      // 刷新城市的宽度
      initCityWidth();
      // 初始化每个气泡和自行车碰撞的距离
      cityCrashDistanceArr = initCityCrashDistance();

      if (width > height) {
        $print.width(width);
        $print.height(height);
        $print.css('top', 0);
        $print.css('left', 0);
        $print.css('transform', 'none');
        $print.css('transform-origin', '50% 50%');
      }
      else {
        $print.width(height);
        $print.height(width);
        $print.css('top', (height - width) / 2);
        $print.css('left', 0 - (height - width) / 2);
        $print.css('transform', 'rotate(90deg)');
        $print.css('transform-origin', '50% 50%');
      }
    }, 300);
  }, false);
}
