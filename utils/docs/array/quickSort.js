function quickSort(arr) {
  //如果数组长度<=1,则直接返回
  if (arr.length <= 1) {
    return arr;
  }
  // 中间位(基准)取长度的一半向下取整
  var pivotIndex = Math.floor(arr.length / 2);
  //把中间位从原数组切割出来, splice 会改变原数组!!!!
  var pivot = arr.splice(pivotIndex, 1)[0];

  //定义两个空数组来存放比对后的值
  var left = [];
  var right = [];

  //比基准小的放在left，比基准大的放在right
  for (var i = 0, j = arr.length; i < j; i++) {
    if (arr[i] <= pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([pivot], quickSort(right));
}

var _arr = quickSort([1, 34, 5, 6, 7, 23, 1, 33])
console.log('_arr', _arr);
