/**
	* name: 基数排序
	* @param  array 待排序数组
	* @param  max 最大位数
	*/
const radixSort = (array, max) => {
  console.time('计数排序耗时');
  const buckets = [];
  let unit = 10,
    base = 1;
  for (let i = 0; i < max; i++ , base *= 10, unit *= 10) {
    for (let j = 0; j < array.length; j++) {
      let index = ~~((array[j] % unit) / base); //依次过滤出个位，十位等等数字
      if (buckets[index] == null) {
        buckets[index] = []; //初始化桶
      }
      buckets[index].push(array[j]); //往不同桶里添加数据
    }
    let pos = 0,
      value;
    for (let j = 0, length = buckets.length; j < length; j++) {
      if (buckets[j] != null) {
        while ((value = buckets[j].shift()) != null) {
          array[pos++] = value; //将不同桶里数据挨个捞出来，为下一轮高位排序做准备，由于靠近桶底的元素排名靠前，因此从桶底先捞
        }
      }
    }
  }
  console.timeEnd('计数排序耗时');
  return array;
};

// 测试
const array = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log('原始array:', array);
const newArr = radixSort(array, 2);
console.log('newArr:', newArr);
// 原始 array:  [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]
// 堆排序耗时:   0.064208984375ms
// newArr:  	 [2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
