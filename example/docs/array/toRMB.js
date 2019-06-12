// 将数字12345678转化成 RMB形式
function re(str) {
  str += '';
  return str.split("").reverse().join("");
}

function toRMB(num) {
  var tmp = '';
  for (var i = 1; i <= re(num).length; i++) {
    tmp += re(num)[i - 1];
    // console.log(tmp)
    if (i % 3 == 0 && i != re(num).length) {
      tmp += ',';
    }
  }
  return re(tmp);
}

var num1 = 12345789;
console.log(toRMB(num1));
