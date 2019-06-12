var util = {
  // 阻止事件冒泡
  stopPro: function (e) {
    e = e || window.event;
    if (document.all) { //只有ie识别
      e.cancelBubble = true;
    } else {
      e.stopPropagation();
    }
  }
}
