/**
 * 事件的监听与移除
 *
  var textbox = document.getElementById('input');
  EventUtil.addHandler(textbox, 'textInput', function (e) {
    e.target.value = e.target.value.replace(/[^0-9\.]/g, '')
  })
 */
var EventUtil = {
  addHandler: function (element, type, handler) {
    if (element.addEventListener) { //DOM2级
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) { //DOM1级
      element.attachEvent("on" + type, handler);
    } else {
      element["on" + type] = handler; //DOM0级
    }
  },
  removeHandler: function (element, type, handler) { //类似addHandler
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent("on" + type, handler);
    } else {
      element["on" + type] = null;
    }
  }
}
// carry
var addEvent = (function () {
  if (window.addEventListener) {
    return function (el, sType, fn, capture) {
      el.addEventListener(sType, function (e) {
        fn.call(el, e);
      }, (capture));
    };
  } else if (window.attachEvent) {
    return function (el, sType, fn, capture) {
      el.attachEvent("on" + sType, function (e) {
        fn.call(el, e);
      });
    };
  }
})();
