function fliterMap() {
  var args = [].slice.call(arguments)
  if (args.length == 0) { throw Error('处理函数不能为空') }
  return function next(val) {
    return args.length == 1 ? args.shift()(val) : args.reduce((pre, cur) => {
      let value = typeof pre == 'function' ? pre(val) : pre
      return cur(value)
    }, args.shift())
  }
}

function fn1(val) {
  return 'fn1' + val
}
function fn2(val) {
  return 'fn2' + val
}
function fn3(val) {
  return 'fn3' + val
}

var s = fliterMap(fn1, fn2)('123')
console.log(s);

