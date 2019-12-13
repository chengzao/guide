// 原型链
Function.prototype.bind2 = function (obj) {
  if (typeof this !== "function") {
    throw new Error("context is not function");
  }
  var arg = Array.prototype.slice.call(arguments, 1);
  var context = this;
  var bound = function () {
    context.apply(this instanceof context ? this : obj,
      arg.concat(Array.prototype.slice.call(arguments)));
  }
  //这里需要一个寄生组合继承
  var F = function () { }
  F.prototype = context.prototype;
  bound.prototype = new F();
  return bound;
}

var foo = {
  value: 1
}
function bar(name, age) {
  console.log(name)
  console.log(age)
  console.log(this.value);
}

bar.bind2(foo, 'black', '18')() // black 18 1
