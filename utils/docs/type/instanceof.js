console.log(2 instanceof Number);                    // false
console.log(true instanceof Boolean);                // false
console.log('str' instanceof String);                // false
console.log([] instanceof Array);                    // true
console.log(function () { } instanceof Function);       // true
console.log({} instanceof Object);                   // true
// 优点：能够区分Array、Object和Function
// 缺点：Number，Boolean，String基本数据类型不能判断

//object instanceof constructor
function C() { }
function D() { }

var o = new C();
// true，因为 Object.getPrototypeOf(o) === C.prototype
o instanceof C;

// false，因为 D.prototype不在o的原型链上
o instanceof D;

// instanceof
var o = {};
var a = [];
console.log("o typeof is : ", typeof (o))//object
console.log("a typeof is : ", typeof (a))//object
console.log("o instanceof Array is : ", o instanceof Array); // false
console.log("a instanceof Array is : ", a instanceof Array); // true

// custom
function instanceOf2(l, r) {
  let proto = l.__proto__;
  let prototype = r.prototype
  while (true) {
    if (proto == null) {
      return false
    }
    if (proto == prototype) {
      return true
    }
    proto = proto.__proto__
  }
}

function Car() { }
function Dog() { }
var car = new Car();
var dog = new Dog()

console.log(instanceOf2(dog, Car))
// expected output: false
console.log(instanceOf2(car, Car));
// expected output: true
console.log(instanceOf2(car, Object));
// expected output: true
