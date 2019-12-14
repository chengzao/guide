const selectionSort = array => {
  const len = array.length;
  let minIndex, temp;
  for (let i = 0; i < len - 1; i++) {
    minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (array[j] < array[minIndex]) {
        // 寻找最小的数
        minIndex = j; // 将最小数的索引保存
      }
    }
    temp = array[i];
    array[i] = array[minIndex];
    array[minIndex] = temp;
    console.log('array: ', array);
  }
  return array;
};

// 测试
const array = [5, 4, 3, 2, 1];
console.log('原始array:', array);
selectionSort(array);
// 原始 array:  [5, 4, 3, 2, 1]
// array:  		 [1, 4, 3, 2, 5]
// array:  		 [1, 2, 3, 4, 5]
// array: 		 [1, 2, 3, 4, 5]
// array:  		 [1, 2, 3, 4, 5]
