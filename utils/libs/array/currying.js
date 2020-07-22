let log = console.log.bind(console);
function currying(fn) {
  var allArgs = []; // 用来接收参数

  return function next() {
    var args = [].slice.call(arguments);

    // 判断是否执行计算
    if (args.length > 0) {
      // 收集传入的参数，进行缓存
      allArgs = allArgs.concat(args);
      return next;
    } else {
      // 符合执行条件，执行计算
      return fn.apply(null, allArgs);
    }
  };
}

var add = currying(function() {
  var sum = 0;
  for (var i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  log(sum);
  return sum;
});

add(1, 2, 3)(4)();

