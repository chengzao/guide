// 随机生成范围内不重复数字
// aArray空数组 len数组个数  min最小值  max最大值
function randomNumber(aArray, len, min, max) {
  if (len >= (max - min)) {
    console.log('超过' + min + '-' + max + '之间的个数范围' + (max - min - 1) + '个的总数');
    return;
  }
  if (aArray.length >= len) {
    aArray.sort(function (a, b) {
      return a - b
    });
    return aArray;
  }
  var nowNub = parseInt(Math.random() * (max - min - 1)) + (min + 1);
  //判断数组内是否有重复
  for (var j = 0; j < aArray.length; j++) {
    if (nowNub == aArray[j]) {
      // 再次执行函数
      randomNumber(aArray, len, min, max);
      return;
    }
  }
  // 添加到数组
  aArray.push(nowNub);
  //再次执行函数
  randomNumber(aArray, len, min, max);
  return aArray;
}

//定义一个空数组接收
var arr2 = [];
randomNumber(arr2, 8, 1, 10);
console.log(arr2);
