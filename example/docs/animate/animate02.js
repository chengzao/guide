//animate fn回调
function animateTwo(obj, json, fn) {
  clearInterval(obj.timer);
  obj.timer = setInterval(function () {
    var flag = true;
    for (var k in json) {
      var target = json[k];
      var leader = parseInt(getStyle(obj, k));
      var step = (target - leader) / 10;
      step = step > 0 ? Math.ceil(step) : Math.floor(step);
      leader = leader + step;
      obj.style[k] = leader + "px";
      if (leader != target) {
        flag = false;
      }
    }
    if (flag) {
      clearInterval(obj.timer);
      if (fn) {
        //alert(fn);
        fn();
      }
    }
  }, 30)
}
