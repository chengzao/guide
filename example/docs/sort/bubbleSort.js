// 冒泡排序（未优化）
var bubbleSort = arr => {
  console.time('改进前冒泡排序耗时');
  const length = arr.length;
  if (length <= 1) return;
  // i < length - 1 是因为外层只需要 length-1 次就排好了，第 length 次比较是多余的。
  for (let i = 0; i < length - 1; i++) {
    // j < length - i - 1 是因为内层的 length-i-1 到 length-1 的位置已经排好了，不需要再比较一次。
    for (let j = 0; j < length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // 设置临时变量交换相邻数字
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  console.log('改进前 arr :', arr);
  console.timeEnd('改进前冒泡排序耗时');
};

var arr = [10, 3, 7, 1, 23, 4, 3]
bubbleSort(arr)

// 冒泡排序（已优化）
const bubbleSort2 = arr => {
  console.time('改进后冒泡排序耗时');
  const length = arr.length;
  if (length <= 1) return;
  // i < length - 1 是因为外层只需要 length-1 次就排好了，第 length 次比较是多余的。
  for (let i = 0; i < length - 1; i++) {
    let hasChange = false; // 提前退出冒泡循环的标志位
    // j < length - i - 1 是因为内层的 length-i-1 到 length-1 的位置已经排好了，不需要再比较一次。
    for (let j = 0; j < length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        hasChange = true; // 表示有数据交换
      }
    }

    if (!hasChange) break; // 如果 false 说明所有元素已经到位，没有数据交换，提前退出
  }
  console.log('改进后 arr :', arr);
  console.timeEnd('改进后冒泡排序耗时');
};

var arr = [10, 3, 7, 1, 23, 4, 3]
bubbleSort2(arr)

// 冒泡排序（优化3）
function bubbleSort(arr) {
  //记录最后一次交换的位置
  var pos = 0;
  for (var i = 0; i < arr.length; i++) {
    //有序标记，每一轮的初始是true
    var hasChange = false;
    for (var j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        //有元素交换，所以不是有序，标记变为false
        hasChange = true;
        //把无序数列的边界更新为最后一次交换元素的位置
        pos = j
      }
    }
    i = pos
    if (!hasChange) break;
  }
  return arr
}

var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(bubbleSort(arr));
