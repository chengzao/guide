function Foo() {
  this.name = "张三";
}
Foo.prototype = {
  constructor: Foo,
  age: 19,
  gender: "男"
};

var f = new Foo();
var isTrue = f.hasOwnProperty("name");
console.log("name -> " + isTrue); // true

isTrue = f.hasOwnProperty("age");
console.log("age -> " + isTrue); // false

isTrue = f.hasOwnProperty("gender");
console.log("gender -> " + isTrue); // false

isTrue = f.hasOwnProperty("web");
console.log("web -> " + isTrue); // false
