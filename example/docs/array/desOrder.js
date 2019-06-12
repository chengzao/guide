function DesOrder(arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length - i; j++) {
      if (arr[j] < arr[j + 1]) {
        var c = arr[j]; //交换两个变量的位置
        arr[j] = arr[j + 1];
        arr[j + 1] = c;
      }
    };
  };
  return arr.toString();
}
console.log(DesOrder([13, 45, 18, 37, 9, 13, 24]));
