---
title: 两数/三数/四数之和
date: 2021-02-05
sidebar: "auto"
tags:
  - leetcode
categories:
  - frontend
---

## 1.两数之和

- leetcode 题目地址: https://leetcode-cn.com/problems/two-sum/

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    for(var i=0; i<nums.length; i++){
      var j = target - nums[i]
      var index = nums.lastIndexOf(j)
      if(index > -1 && i<index){
          return [i, index]
      }
    }
};


var twoSum = function(nums, target) {
    map = new Map()
    for(let i = 0; i < nums.length; i++) {
        x = target - nums[i]
        if(map.has(x)) {
            return [map.get(x),i]
        }
        map.set(nums[i],i)
    }
};

function twoSum(nums, start, target) {
    let left = start, right = nums.length - 1;
    const res = [];
    while (left < right) {
        let lo = nums[left], hi = nums[right];
        const sum = lo + hi;
        if (sum < target) {
            while(left < right && nums[left] === lo) left++;
        } else if (sum > target){
            while(left < right && nums[right] === hi) right--;
        } else {
            res.push([lo, hi]);
            while (left < right && nums[left] === lo) left++;
            while(left < right && nums[right] === hi) right--;
        }
    }
    return res;
};
```

## 2.三数之和

- leetcode 题目地址: https://leetcode-cn.com/problems/3sum/

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */

var threeSum = function(nums) {
  if (nums.length < 3) {
    return [];
  }
  // 从小到大排序
  const arr = nums.sort((a,b) => a-b);
  // 最小值大于 0 或者 最大值小于 0，说明没有无效答案
  if (arr[0] > 0 || arr[arr.length - 1] < 0) {
    return [];
  }
  const n = arr.length;
  const res = [];
  for (let i = 0; i < n; i ++) {
    // 如果当前值大于 0，和右侧的值再怎么加也不会等于 0，所以直接退出
    if (nums[i] > 0) {
      return res;
    }
    // 当前循环的值和上次循环的一样，就跳过，避免重复值
    if (i > 0 && arr[i] === arr[i - 1]) {
      continue;
    }
    // 双指针
    let l = i + 1;
    let r = n - 1;
    while(l < r) {
      const temp = arr[i] + arr[l] + arr[r];
      if (temp > 0) {
        r --;
      }
      if (temp < 0) {
        l ++;
      }
      if (temp === 0) {
        res.push([nums[i], nums[l], nums[r]]);
        // 跳过重复值
        while(l < r && nums[l] === nums[l + 1]) {
          l ++;
        }
        // 同上
        while(l < r && nums[r] === nums[r - 1]) {
          r --;
        }

        l ++;
        r --;
      }
    }
  }
  return res;
};
```

## 3.四数之和

- leetcode 题目地址: https://leetcode-cn.com/problems/4sum/

```js
// 求两数之和
function twoSum(nums, start, target) {
    let left = start, right = nums.length - 1;
    const res = [];
    while (left < right) {
        let lo = nums[left], hi = nums[right];
        const sum = lo + hi;
        if (sum < target) {
            while(left < right && nums[left] === lo) left++;
        } else if (sum > target){
            while(left < right && nums[right] === hi) right--;
        } else {
            res.push([lo, hi]);
            while (left < right && nums[left] === lo) left++;
            while(left < right && nums[right] === hi) right--;
        }
    }
    return res;
};

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums, start, target) {
    const res = [];
    let size = nums.length;
    for (let i = start; i < size; i++) {
        const tuples = twoSum(nums, i + 1, target - nums[i]);
        // 如果找到，则会进入下列循环
        for (const tuple of tuples) {
            tuple.push(nums[i]);
            res.push(tuple);
        }
        // 跳过重复项
        while (i < size - 1 && nums[i] === nums[i + 1]) i++;
    }
    return res;
};
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
    nums.sort((a, b) => a - b);
    const size = nums.length;
    const res = [];
    for (let i = 0; i < size; i++) {
        const triples = threeSum(nums, i + 1, target - nums[i]);
        for (const triple of triples) {
            triple.push(nums[i]);
            res.push(triple);
        }
        // 跳过重复项
        while (i < size - 1 && nums[i] === nums[i + 1]) i++;
    }
    return res;
};
```

- 解法2

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
    const result = []
    if(nums.length < 4) return result

    // 从小到大排序
    nums.sort((a,b) => a-b)

    const size = nums.length;
    for(let i=0; i< size-3; i++){
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }
        // 如果前四个值的和大于目标值 ，无效
        if (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) {
            break;
        }
        // 判断 最小值与倒数三个数， 是否大于目标值
        if (nums[i] + nums[size - 3] + nums[size - 2] + nums[size - 1] < target) {
            continue;
        }

        for (let j = i + 1; j < size - 2; j++) {
            if (j > i + 1 && nums[j] === nums[j - 1]) {
                continue;
            }
            // 如果前四个值的和大于目标值 ，无效
            if (nums[i] + nums[j] + nums[j + 1] + nums[j + 2] > target) {
                break;
            }
            // 判断前两个值 与 末尾2个值的和 ， 是否大于目标值
            if (nums[i] + nums[j] + nums[size - 2] + nums[size - 1] < target) {
                continue;
            }
            let left = j+1, right=size-1;
            while(left<right){
                const sum = nums[i] + nums[j] + nums[left] + nums[right]; // 求和
                if (sum === target) {
                    result.push([nums[i], nums[j], nums[left], nums[right]]);
                    // 跳过重复
                    while (left < right && nums[left] === nums[left + 1]) {
                        left++;
                    }
                    // 跳过重复
                    while (left < right && nums[right] === nums[right - 1]) {
                        right--;
                    }
                    // 继续
                    left++;
                    right--;
                } else if (sum < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }
    }
    return result
};
```

## 5.两个大数相加

```js
let a = "9007199254740991";
let b = "1234567899999999999";

function add(a ,b){
   //取两个数字的最大长度
   let maxLength = Math.max(a.length, b.length);
   //用0去补齐长度
   a = a.padStart(maxLength , 0);//"0009007199254740991"
   b = b.padStart(maxLength , 0);//"1234567899999999999"

   let t = 0;   //定义加法过程中需要用到的变量
   let f = 0;   //"进位"
   let sum = "";
   // 从右往左遍历
   for(let i=maxLength-1 ; i>=0 ; i--){
      t = parseInt(a[i]) + parseInt(b[i]) + f;
      f = Math.floor(t/10); // 取进位
      sum = t%10 + sum;
   }
   // 最后还有进位
   if(f == 1){
      sum = "1" + sum;
   }
   return sum;
}

console.log(add(a,b))
```
