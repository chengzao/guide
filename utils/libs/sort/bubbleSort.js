function bubbleSort(arr) {
  const length = arr.length;
  if (length <= 1) return;
  // 是否有序
  let isSort = true;
  // 记录最后交换索引
  let lastChangeIndex = 0;
  let sortBorder = arr.length - 1;
  for (let i = 0; i < length - 1; i++) {
    for (let j = 0; j < sortBorder; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        isSort = false;
        lastChangeIndex = j;
      }
    }
    sortBorder = lastChangeIndex;
    if (isSort) {
      break;
    }
  }
  return arr;
}

var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(bubbleSort(arr));
