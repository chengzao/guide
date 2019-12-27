var util = {
  // 取消默认行为
  stopDefault: function (e) {
    e = e || window.event;
    if (document.all) {
      window.event.returnValue = false;
    } else {
      event.preventDefault();
    }
  },
}
