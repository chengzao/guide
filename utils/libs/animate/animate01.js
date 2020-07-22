//动画animate
function animateOne(ele, target) {
  //清理定时器
  clearInterval(ele.timer);
  ele.timer = setInterval(function () {
    var step = 9;
    //如果对象的位置在目标的左边 往右走 step是正数
    //如果对象的位置在目标的右边 往左走 step是负数
    //对象的位置在目标的左边 ele.offsetLeft<target
    step = ele.offsetLeft < target ? step : -step;
    //终点检测 对象到目标的距离 > step的距离 就要继续走
    if (Math.abs(ele.offsetLeft - target) > Math.abs(step)) {
      ele.style.left = ele.offsetLeft + step + "px";
    } else {
      //距有可能 离终点还有一点点距离 我们手动把他放置到终点位置
      ele.style.left = target + "px";
      clearInterval(ele.timer);
    }
  }, 30)
}

// animate 缓动动画
function animate(obj, target) {
  clearInterval(obj.timer);
  obj.timer = setInterval(function () {
    var leader = obj.offsetLeft;
    var step = (target - leader) / 10;
    step = step > 0 ? Math.ceil(step) : Math.floor(step);
    obj.style.left = obj.offsetLeft + step + "px";
    if (leader == target) {
      clearInterval(obj.timer);
    }
  }, 25)
}
