var util = {
  // target兼容
  targetEl: function (e) {
    // event兼容
    var event = e || window.event;
    var targetEl = event.target || event.srcElement;
    return targetEl;
  }
}
