Function.prototype.call2 = function (content = window) {
  content.fn = this;
  let args = [...arguments].slice(1);
  let result = content.fn(...args);
  delete content.fn;
  return result;
}
var foo = {
  value: 1
}
function bar(name, age) {
  console.log(name)
  console.log(age)
  console.log(this.value);
}
bar.call2(foo, 'black', '18') // black 18 1
