// 插入排序
const insertionSort = array => {
  const len = array.length;
  if (len <= 1) return

  let preIndex, current;
  for (let i = 1; i < len; i++) {
    preIndex = i - 1; //待比较元素的下标
    current = array[i]; //当前元素
    while (preIndex >= 0 && array[preIndex] > current) {
      //前置条件之一: 待比较元素比当前元素大
      array[preIndex + 1] = array[preIndex]; //将待比较元素后移一位
      preIndex--; //游标前移一位
    }
    if (preIndex + 1 != i) {
      //避免同一个元素赋值给自身
      array[preIndex + 1] = current; //将当前元素插入预留空位
      console.log('array :', array);
    }
  }
  return array;
};

// 测试
const array = [5, 4, 3, 2, 1];
console.log("原始 array :", array);
insertionSort(array);
// 原始 array:    [5, 4, 3, 2, 1]
// array:  		 [4, 5, 3, 2, 1]
// array:  		 [3, 4, 5, 2, 1]
// array: 		 [2, 3, 4, 5, 1]
// array:  		 [1, 2, 3, 4, 5]
