function MinNum(arr) {
  var min = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (min > arr[i]) {
      min = arr[i]
    }
  }
  return min;
}
console.log(MinNum([2, 3, -44, 555, 222]))

// 最小值
Math.min.apply(Math, [32, 18, 38, 12, 43, 31, 17])
