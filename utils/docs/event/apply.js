Function.prototype.apply2 = function (context = {}) {
  context.fn = this
  let result;
  // 判断是否有第二个参数
  if (arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    console
    result = context.fn()
  }
  delete context.fn
  return result
}

var foo = {
  value: 1
}
function bar(name, age) {
  console.log(name)
  console.log(age)
  console.log(this.value);
}
bar.apply2(foo, ['black', '18']) // black 18 1
