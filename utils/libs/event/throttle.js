function throttle(callback, time, ...arr) {
  // 上次执行时间 第一次马上执行
  let last = 0;
  return () => {
    // 当前时间
    let cur = Date.now();
    // 当前时间与上次执行的时间，是否超过间隔时间
    if (cur - last > time) {
      // ...arr为callback的参数
      callback(...arr);
      // 重置上次执行时间为当前时间 方便下次执行
      last = cur;
    }
  };
}

// 完整版
function throttle(func, wait, options) {
  var timeout, context, args, result;
  var previous = 0;
  if (!options) options = {};

  var later = function() {
    previous = options.leading === false ? 0 : new Date().getTime();
    timeout = null;
    func.apply(context, args);
    if (!timeout) context = args = null;
  };

  var throttled = function() {
    var now = new Date().getTime();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
  };

  throttled.cancel = function() {
    clearTimeout(timeout);
    previous = 0;
    timeout = null;
  };

  return throttled;
}
