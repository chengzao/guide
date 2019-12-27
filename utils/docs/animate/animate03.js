//fn为回调函数
//{attr:target,attr:target}
function animate(obj, json, fn) {
  clearInterval(obj.timer);
  obj.timer = setInterval(function () {
    var flag = true;
    for (var attr in json) {
      //step = (target-leader)/10
      //leader = leader + step
      if (attr == "opacity") {
        var target = json[attr] * 100;
        var leader = Math.round(parseInt(getStyle(obj, attr || "filter") * 100)) || 100;
      } else {
        var target = json[attr];
        var leader = parseInt(getStyle(obj, attr));
      }
      var step = (target - leader) / 10;
      step = step > 0 ? Math.ceil(step) : Math.floor(step);
      leader = leader + step;
      //obj.style.left = leader + "px";
      //obj.style["left"] = leader + "px";
      if (attr == "opacity") {
        obj.style.opacity = leader / 100;
        obj.style.filter = "alpha(opacity=" + leader + ")";
        //filter:alpha(opacity=x);
      } else if (attr == "zIndex") {
        obj.style.zIndex = attr;
      } else {
        obj.style[attr] = leader + "px";
      }
      /*if (leader == target) {
       clearInterval(obj.timer);
       }*/
      if (leader != target) {
        flag = false;
      }
    }
    if (flag) {
      clearInterval(obj.timer);
      //alert(fn);
      if (fn) {
        fn();
      }
    }
  }, 30)
}
