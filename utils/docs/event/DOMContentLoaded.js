// Javascript封装DOMContentLoaded事件
function ready(callback) {
  // 目前Mozilla、Opera和webkit 525+内核支持DOMContentLoaded事件
  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', function () {
      document.removeEventListener('DOMContentLoaded', arguments.callee, false);
      callback && callback();
    }, false);
  }

  // 如果IE
  else if (document.attachEvent) {
    // 确保当页面是在iframe中加载时，事件依旧会被安全触发
    document.attachEvent('onreadystatechange', function () {
      if (document.readyState == 'complete') {
        document.detachEvent('onreadystatechange', arguments.callee);
        callback && callback();
      }
    });

    // 如果是IE且页面不在iframe中时，轮询调用doScroll 方法检测DOM是否加载完毕
    if (document.documentElement.doScroll && typeof window.frameElement === "undefined") {
      try {
        document.documentElement.doScroll('left');
      }
      catch (error) {
        return setTimeout(arguments.callee, 20);
      };
      callback && callback();
    }
  }
};
