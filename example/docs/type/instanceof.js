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
