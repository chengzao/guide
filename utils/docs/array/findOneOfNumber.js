var str = '236489';
if (str.indexOf('1') != -1) {
  findOneOfNumber(str);
} else {
  findOneOfNumber(str);
  console.log('1');
}

function findOneOfNumber(str) {
  str = str.split('').sort(function (a, b) {
    return a - b;
  }).reverse();
  console.log(str);
  for (var i = 0; i < (str.length - 1); i++) {
    var s = str[i] - str[i + 1];
    //console.log(s)
    if (s == 1) {

    } else {
      console.log(str[i] + "***" + str[i + 1]);
    }
  }
}
