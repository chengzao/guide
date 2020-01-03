# 常见算法

- [原文: JavaScript 数据结构与算法之美 - 十大经典排序算法](https://juejin.im/post/5d3ea9a4e51d4561f060cd2d)

## 冒泡排序

- 步骤
  - 冒泡排序只会操作相邻的两个数据;
  - 每次冒泡操作都会对相邻的两个元素进行比较，看是否满足大小关系要求。如果不满足就让它俩互换;
  - 一次冒泡会让至少一个元素移动到它应该在的位置，重复 n 次，就完成了 n 个数据的排序工作.

![bubbleSort](https://gitee.com/cxyz/imgbed/raw/img/img/bubbleSortArray.gif)

- 代码

<CodeBlock>

<<< @/utils/docs/sort/bubbleSort.js

</CodeBlock>

## 快速排序

- 相关资料： [资料1](https://gist.github.com/ideawu/a114679bb8f0a94452d462ae14b7c977) | [资料2](https://www.jianshu.com/p/34209c493a79) | [资料3](http://data.biancheng.net/view/117.html) | [资料4](http://data.biancheng.net/view/117.html)

- 步骤
  - 先找到一个基准点（一般指数组的中部），然后数组被该基准点分为两部分，依次与该基准点数据比较，如果比它小，放左边；反之，放右边。
  - 左右分别用一个空数组去存储比较后的数据。
  - 最后递归执行上述操作，直到`数组长度 <= 1`

![](https://gitee.com/cxyz/imgbed/raw/img/img/quickSort.gif)

- 代码

<CodeBlock>

<<< @/utils/docs/sort/quickSort.js

</CodeBlock>

![](https://gitee.com/cxyz/imgbed/raw/img/img/1566284985210.png)

## 选择排序

- 步骤
  - 首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置
  - 再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾
  - 重复第二步，直到所有元素均排序完毕

![](https://gitee.com/cxyz/imgbed/raw/img/img/selectionSort.gif)

- 代码

<CodeBlock>

<<< @/utils/docs/sort/selectionSort.js

</CodeBlock>

## 归并排序

- 相关资料：[资料1](https://www.jianshu.com/p/33cffa1ce613)

排序一个数组，我们先把数组从中间分成前后两部分，然后对前后两部分分别排序，再将排好序的两部分合并在一起，这样整个数组就都有序

![](https://gitee.com/cxyz/imgbed/raw/img/img/mergeSort.gif)

- 代码

<CodeBlock>

<<< @/utils/docs/sort/mergeSort.js

</CodeBlock>

- 归并排序的流程

![](https://gitee.com/cxyz/imgbed/raw/img/img/mergeSort20190819151306.png)

- 合并两个有序数组的流程

![](https://gitee.com/cxyz/imgbed/raw/img/img/mergeSort20190819151517.png)



## 插入排序

### 直接插入

- 步骤

  - 从第一个元素开始，该元素可以认为已经被排序；
  - 取出下一个元素，在已经排序的元素序列中从后向前扫描；
  - 如果该元素（已排序）大于新元素，将该元素移到下一位置；
  - 重复步骤 3，直到找到已排序的元素小于或者等于新元素的位置；
  - 将新元素插入到该位置后；
  - 重复步骤 2 ~ 5

![](https://gitee.com/cxyz/imgbed/raw/img/img/insertionSort.gif)

- 代码

<CodeBlock>

<<< @/utils/docs/sort/insertionSort.js

</CodeBlock>

### 拆半插入

- 步骤

  - 取`0 ~ i-1` 的中间点 `( m = (i-1) >> 1 )`，`array[i]` 与` array[m]` 进行比较，若 `array[i]  <  array[m]`，则说明待插入的元素 `array[i]`应该处于数组的 `0 ~ m`索引之间；反之，则说明它应该处于数组的 `m ~ i-1` 索引之间。
  - 重复步骤 1，每次缩小一半的查找范围，直至找到插入的位置。
  - 将数组中插入位置之后的元素全部后移一位。
  - 在指定位置插入第 i 个元素。

**注：`x >> 1` 是位运算中的右移运算，表示右移一位，等同于 x 除以 2 再取整，即 `x >> 1 == Math.floor(x/2)`**

- 代码

<CodeBlock>

<<< @/utils/docs/sort/binaryInsertionSort.js

</CodeBlock>

## 希尔排序

- 步骤
  - 先将整个待排序的记录序列分割成为若干子序列。
  - 分别进行直接插入排序。
  - 待整个序列中的记录基本有序时，再对全体记录进行依次直接插入排序。

![](~@assets/image/shellSort.gif)

- 代码

<CodeBlock>

<<< @/utils/docs/sort/shellSort.js

</CodeBlock>

## 堆排序

- 代码

<CodeBlock>

<<< @/utils/docs/sort/heapSort.js

</CodeBlock>

## 桶排序

- 代码

<CodeBlock>

<<< @/utils/docs/sort/bucketSort.js

</CodeBlock>

## 计数排序

- 代码

<CodeBlock>

<<< @/utils/docs/sort/countingSort.js

</CodeBlock>

## 基数排序

- 代码

<CodeBlock>

<<< @/utils/docs/sort/radixSort.js

</CodeBlock>

## 算法可视化工具

- [algorithm-visualizer](https://github.com/algorithm-visualizer/algorithm-visualizer)
- [visualgo.net/en](https://visualgo.net/en)
- [www.ee.ryerson.ca]( www.ee.ryerson.ca)

## 相关链接

- [JavaScript 数据结构与算法之美 - 时间和空间复杂度](https://juejin.im/post/5cf37b6d6fb9a07eb15d3e88)
- [JavaScript 数据结构与算法之美 - 十大经典排序算法汇总](https://juejin.im/post/5d3ea9a4e51d4561f060cd2d)
