// 折半插入排序
const binaryInsertionSort = array => {
  const len = array.length;
  if (len <= 1) return;

  let current, i, j, low, high, m;
  for (i = 1; i < len; i++) {
    low = 0;
    high = i - 1;
    current = array[i];

    while (low <= high) {
      //步骤 1 & 2 : 折半查找
      m = (low + high) >> 1; // 注: x>>1 是位运算中的右移运算, 表示右移一位, 等同于 x 除以 2 再取整, 即 x>>1 == Math.floor(x/2) .
      if (array[i] >= array[m]) {
        //值相同时, 切换到高半区，保证稳定性
        low = m + 1; //插入点在高半区
      } else {
        high = m - 1; //插入点在低半区
      }
    }
    for (j = i; j > low; j--) {
      //步骤 3: 插入位置之后的元素全部后移一位
      array[j] = array[j - 1];
      console.log('array2 :', JSON.parse(JSON.stringify(array)));
    }
    array[low] = current; //步骤 4: 插入该元素
  }
  console.log('array2 :', JSON.parse(JSON.stringify(array)));
  return array;
};

const array2 = [5, 4, 3, 2, 1];
console.log('原始 array2:', array2);
binaryInsertionSort(array2);
// 原始 array2:  [5, 4, 3, 2, 1]
// array2 :     [5, 5, 3, 2, 1]
// array2 :     [4, 5, 5, 2, 1]
// array2 :     [4, 4, 5, 2, 1]
// array2 :     [3, 4, 5, 5, 1]
// array2 :     [3, 4, 4, 5, 1]
// array2 :     [3, 3, 4, 5, 1]
// array2 :     [2, 3, 4, 5, 5]
// array2 :     [2, 3, 4, 4, 5]
// array2 :     [2, 3, 3, 4, 5]
// array2 :     [2, 2, 3, 4, 5]
// array2 :     [1, 2, 3, 4, 5]
