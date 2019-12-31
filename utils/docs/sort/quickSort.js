const quickSort0 = arr => {
  if (arr.length <= 1) {
    return arr;
  }
  //取基准点
  const midIndex = Math.floor(arr.length / 2);
  //取基准点的值，splice(index,1) 则返回的是含有被删除的元素的数组。
  const valArr = arr.splice(midIndex, 1);
  const midIndexVal = valArr[0];
  const left = []; //存放比基准点小的数组
  const right = []; //存放比基准点大的数组
  //遍历数组，进行判断分配
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < midIndexVal) {
      left.push(arr[i]); //比基准点小的放在左边数组
    } else {
      right.push(arr[i]); //比基准点大的放在右边数组
    }
  }
  //递归执行以上操作，对左右两个数组进行操作，直到数组长度为 <= 1
  return quickSort0(left).concat(midIndexVal, quickSort0(right));
};
const array0 = [5, 4, 3, 2, 1];
console.log('quickSort0 ', quickSort0(array0));

const quickSort1 = arr => {
  if (arr.length <= 1) {
    return arr;
  }
  // 基准值取数组第一个
  const pivot = arr.pop();
  // const left = []; //存放比基准点小的数组
  // const right = []; //存放比基准点大的数组
  //遍历数组，进行判断分配
  // for (let i = 1; i < arr.length; i++) {
  //   if (arr[i] <= midVal) {
  //     left.push(arr[i]); //比基准点小的放在左边数组
  //   } else {
  //     right.push(arr[i]); //比基准点大的放在右边数组
  //   }
  // }
  let left = arr.filter(item => item < pivot);
  let right = arr.filter(item => item >= pivot);
  //递归执行以上操作，对左右两个数组进行操作，直到数组长度为 <= 1
  return quickSort1(left).concat(pivot, quickSort1(right));
};
const array1 = [5, 4, 3, 2, 1];
console.log('quickSort1 ', quickSort1(array1));

// 原地分区版快速排序实现
const quickSort2 = (arr, left, right) => {
  let len = arr.length,
    partitionIndex;
  left = typeof left != 'number' ? 0 : left;
  right = typeof right != 'number' ? len - 1 : right;

  if (left < right) {
    // 返回基准值的所在位置， 即索引
    partitionIndex = partition(arr, left, right);
    // 可理解为：把数组拆分为 左边的数组值都比基准值小，右边的数组都比基准值大

    // 比对基准值左边的数组
    quickSort2(arr, left, partitionIndex - 1);
    // 比对基准值右边的数组
    quickSort2(arr, partitionIndex + 1, right);
  }
  return arr;
};

const swap = (arr, i, j) => {
  // let temp = arr[i];
  // arr[i] = arr[j];
  // arr[j] = temp;
  [arr[i], arr[j]] = [arr[j], arr[i]]
};

const partition = (arr, left, right) => {
  //分区操作
  let pivotIdx = left, //基准值（pivot）的索引
    pivot = arr[pivotIdx], // 基准值（pivot）
    index = pivotIdx + 1; // 初始index的位置

  // index: 最终记录着数组中首次比基准值（pivot）大的最后索引位置

  // i 取 index 的下一个数与之对比
  for (let i = index; i <= right; i++) {
    // 判断基准值与当前项的大小
    if (arr[i] < pivot) {
      // 如果比基准值小，将arr[i] 与 arr[index]交换
      // 即 小于基准值的 与 大于基准值的 互相交换
      swap(arr, i, index);
      // index 下移一位
      index++;
    }
  }
  // 将基准值与最后一次小于它的值交换
  swap(arr, pivotIdx, index - 1);

  // 返回最后一次比基准值小的索引位置： index-1
  return index - 1;
};

const array2 = [8, 5, 1, 13, 2, 6, 9, 21];

// partitionIndex = partition(arr, left, right);
// 执行 部分 结果
// ...
// 8, 5, 1, 13, 2, 6, 9, 21
// 8, 5, 1, 2, 13, 6, 9, 21
// 8, 5, 1, 2, 6, 13, 9, 21
// 8, 5, 1, 2, 6, 13, 9, 21
// ...
// 6, 5, 1, 2, 8, 13, 9, 21 => swap(arr, pivotIdx, index - 1);

console.log('quickSort2 ', quickSort2(array2));
// => [ 1, 2, 5, 6, 8, 9, 13, 21 ]
