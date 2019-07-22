let log = console.log.bind(console);
function currying(fn) {
  var allArgs = [];

  return function next() {
    var args = [].slice.call(arguments);
    log(args)
    if (args.length > 0) {
      allArgs = allArgs.concat(args);
      return next;
    } else {
      return fn.apply(null, allArgs);
    }
  }
}
var add = currying(function () {
  var sum = 0;
  for (var i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  log(sum);
  return sum;
});
add(1, 2, 3)(4)()


//
Function.prototype.curry = function () {
  if (!arguments.length) return this;
  var _this = this,
    args = [].slice.call(arguments, 0);
  return function () {
    return _this.apply(this, [].concat(
      [].slice.call(args, 0), [].slice.call(arguments, 0)));
  }
}

add4 = function (x) {
  return (function (x, y) {
    return x + y
  }).curry(x)
}

// console.log(add4(2)(3))

//
const curry = (fn, arr = []) => (...args) => (
  arg => arg.length === fn.length
    ? fn(...arg)
    : curry(fn, ...arg)
)([...arr, ...args])

function multiFun(x, y) {
  return x * y
}
var multi = curry(multiFun)
console.log(multi(2, 4));

//
function multi() {
  var args = Array.prototype.slice.call(arguments);
  var fn = function () {
    var newArgs = args.concat(Array.prototype.slice.call(arguments));
    return multi.apply(this, newArgs);
  }
  fn.toString = function () {
    return args.reduce(function (a, b) {
      return a * b;
    })
  }
  return fn;
}
var res = multi(2, 3)(2)(9);
console.log(res);
