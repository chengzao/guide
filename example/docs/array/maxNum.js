function MaxNum(arr) {
  var max = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (max < arr[i]) {
      max = arr[i];
    }
  }
  return max;
}

console.log(MaxNum([2, 3, 3, 42, 1123]))

var a = [1, 2, 3, [5, 6],
  [1, 4, 8]
];
var ta = a.join(",").split(","); //转化为一维数组
console.log(Math.max.apply(null, ta)); //最大值
console.log(Math.min.apply(null, ta)); //最小值
