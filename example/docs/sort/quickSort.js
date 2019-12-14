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
// 快速排序
const quickSort2 = (arr, left, right) => {
  let len = arr.length,
    partitionIndex;
  left = typeof left != 'number' ? 0 : left;
  right = typeof right != 'number' ? len - 1 : right;

  if (left < right) {
    partitionIndex = partition(arr, left, right);
    quickSort2(arr, left, partitionIndex - 1);
    quickSort2(arr, partitionIndex + 1, right);
  }
  return arr;
};

const partition = (arr, left, right) => {
  //分区操作
  let pivot = left, //设定基准值（pivot）
    index = pivot + 1;
  for (let i = index; i <= right; i++) {
    if (arr[i] < arr[pivot]) {
      swap(arr, i, index);
      index++;
    }
  }
  swap(arr, pivot, index - 1);
  return index - 1;
};

const swap = (arr, i, j) => {
  // let temp = arr[i];
  // arr[i] = arr[j];
  // arr[j] = temp;
  [arr[i], arr[j]] = [arr[j], arr[i]]
};

const array2 = [5, 4, 13, 2, 1];
console.log('quickSort2 ', quickSort2(array2));
