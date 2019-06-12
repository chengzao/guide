// 判断类型
var arr = [];
console.log(Object.prototype.toString.call(arr)); //"[object Array]"
console.log(Object.prototype.toString.apply(arr)); //"[object Array]"

function fn() { }
// 判断
Object.prototype.toString.call(obj).slice(8, -1);

// obj != null || obj != undefined 除外
obj.constructor.name.toString().toLowerCase();
