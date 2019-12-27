const shellSort = arr => {
  let len = arr.length,
    temp,
    gap = 1;
  console.time('希尔排序耗时');
  while (gap < len / 3) {
    //动态定义间隔序列
    gap = gap * 3 + 1;
  }
  for (gap; gap > 0; gap = Math.floor(gap / 3)) {
    for (let i = gap; i < len; i++) {
      temp = arr[i];
      let j = i - gap;
      for (; j >= 0 && arr[j] > temp; j -= gap) {
        arr[j + gap] = arr[j];
      }
      arr[j + gap] = temp;
      console.log('arr  :', arr);
    }
  }
  console.timeEnd('希尔排序耗时');
  return arr;
};

// 测试
const array = [35, 33, 42, 10, 14, 19, 27, 44];
console.log('原始array:', array);
const newArr = shellSort(array);
console.log('newArr:', newArr);
// 原始 array:   [35, 33, 42, 10, 14, 19, 27, 44]
// arr      :   [14, 33, 42, 10, 35, 19, 27, 44]
// arr      :   [14, 19, 42, 10, 35, 33, 27, 44]
// arr      :   [14, 19, 27, 10, 35, 33, 42, 44]
// arr      :   [14, 19, 27, 10, 35, 33, 42, 44]
// arr      :   [14, 19, 27, 10, 35, 33, 42, 44]
// arr      :   [14, 19, 27, 10, 35, 33, 42, 44]
// arr      :   [10, 14, 19, 27, 35, 33, 42, 44]
// arr      :   [10, 14, 19, 27, 35, 33, 42, 44]
// arr      :   [10, 14, 19, 27, 33, 35, 42, 44]
// arr      :   [10, 14, 19, 27, 33, 35, 42, 44]
// arr      :   [10, 14, 19, 27, 33, 35, 42, 44]
// 希尔排序耗时: 3.592041015625ms
// newArr:     [10, 14, 19, 27, 33, 35, 42, 44]
