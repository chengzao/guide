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
