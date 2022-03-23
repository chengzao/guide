---
title: leetcode代码片段(三)
date: 2022-03-16
sidebar: "auto"
tags:
  - array
  - tree
categories:
  - frontend
---

## fib斐波那契数列(509)

> <https://leetcode-cn.com/problems/fibonacci-number/>

斐波那契数 （通常用 F(n) 表示）形成的序列称为 斐波那契数列 。该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和

- 递归版

```js
// fn1
var fib = function (N) {
  if (N == 0) return 0;
  if (N == 1) return 1;
  return fib(N - 1) + fib(N - 2)
};
```

- 方法1

```js
var fib = function(n) {
    if (n == 0) return 0;
    if (n == 1) return 1;
    var dp = [];
    dp[0]=0, dp[1]=1;
    for (let i = 2; i <= n; i++) {
      dp[i] = dp[i-1] + dp[i-2]
    }
    return dp[n];
};
```

- 方法2

```js
let fib = n => {
  if (n == 0) return 0;
  let a1 = 0, a2 = 1;
  for (let i = 1; i < n; i++) {
    [a1, a2] = [a2, a1 + a2];
  }
  return a2;
}
```

- 方法3

```js
let fib = n => Math.round(
  (Math.pow((1 + Math.sqrt(5)) / 2, n) -
    Math.pow((1 - Math.sqrt(5)) / 2, n)) /
  Math.sqrt(5)
);
```

## 爬楼梯(70)

> <https://leetcode-cn.com/problems/climbing-stairs/>

- 方法1

```js
var climbStairs = function(n) {
  if(n<2) return 1
  let dp = [];
  dp[0] = 1, dp[1] = 1;
  for(let i=2;i<=n;i++){
    dp[i] = dp[i-1]+dp[i-2]
  }
  return dp[n]
}
```

- 方法2

```js
var climbStairs = function(n) {
    if(n < 2) return 1
    let a1 = 1, a2 = 1;
    for(let i=2;i<=n; i++){
        let temp = a1+a2;
        a1 = a2
        a2 = temp
    }
    return a2
}
```

## 跳跃游戏(55)

> <https://leetcode-cn.com/problems/jump-game/>

```js
var canJump = function(nums) {
    let len = nums.length;
    let k = 0
    for(let i=0; i<len; i++){
        // 索引 与 能移动的最大距离 比较
        if(i > k) return false
        // 记录能走的最大距离
        k = Math.max(k, nums[i]+i)
    }
    return true
};
```

## 不同路径(62)

> <https://leetcode-cn.com/problems/unique-paths/>

```js
var uniquePaths = function(m, n) {
    // 初始化 dp
    const dp = new Array(m).fill(0).map(() => new Array(n).fill(0));
    for (let i = 0; i < m; i++) {
        dp[i][0] = 1;
    }
    for (let j = 0; j < n; j++) {
        dp[0][j] = 1;
    }

    for(let i=1; i< m; i++){
        for(let j=1; j<n; j++){
            dp[i][j] = dp[i-1][j] + dp[i][j-1]
        }
    }

    return dp[m-1][n-1]
};
```

## 搜索插入位置(35)

> <https://leetcode-cn.com/problems/search-insert-position/>

```js
var searchInsert = function(nums, target) {
    let len = nums.length;
    let left = 0, right = len-1

    while(left <= right){
        let mid = ~~(left + (right-left)/2)
        if(nums[mid] >= target){
            right = mid -1
        }else{
            left = mid + 1
        }
    }
    return left
}
```

## 最长递增子序列(300)

> <https://leetcode-cn.com/problems/longest-increasing-subsequence/>

- 方法1

```js
var lengthOfLIS = function(nums) {
    let len = nums.length;
    let dp = Array.from({length:len}).fill(1)
    let max = 1

    for(let i=0; i<len; i++){
        for(let j=0; j<i; j++){
            if(nums[i] > nums[j]){
                dp[i] = Math.max(dp[i], dp[j]+1)
            }
        }
        max = Math.max(max, dp[i])
    }
    return max
}
```

- 方法2

```js
var lengthOfLIS = function(nums) {
    let len = nums.length;
    let arr = [nums[0]]

    for(let i=0; i<len;i++){
        if(nums[i] > arr[arr.length-1]){
            arr.push(nums[i])
        }else{
            let pos = searchInsert(arr, nums[i])
            arr[pos] = nums[i]
        }
    }
    return arr.length
}

function searchInsert(nums, target){
    let len = nums.length;
    let left = 0, right = len-1

    while(left <= right){
        let mid = ~~(left + (right-left)/2)
        if(nums[mid] >= target){
            right = mid -1
        }else{
            left = mid + 1
        }
    }

    return left
}
```

## LRU 缓存

> LRU（Least recently used，最近最少使用）算法。最近被访问的数据那么它将来访问的概率就大，缓存满的时候，优先淘汰最无人问津者

- 实现逻辑 Map : [原文：146. LRU 缓存机制](https://leetcode-cn.com/problems/lru-cache/solution/146-lruhuan-cun-ji-zhi-by-alexer-660/)

```js
Map 中的键值是有序的，而添加到对象中的键则不是。因此，当对它进行遍历时，Map 对象是按插入的顺序返回键值
Map.prototype.keys()
  返回一个新的 Iterator对象， 它按插入顺序包含了Map对象中每个元素的键 。

1、尾部元素一直是最新set的，对应于LRU的最近使用原则
  Map.set()
2、头部元素是最远使用的，用于LRU容量满载时删除最远使用的元素，可获取其key
  Map.keys().next().value

解题步骤
get
  元素存在 delete、set
  元素不存在 return -1
put
  元素存在  delete、set
  元素不存在
  容量超载 delete map头部元素(map.keys().next().value)、set
  不超载   set
```

- 实现代码 [leetcode 146](https://leetcode-cn.com/problems/lru-cache/)

```js
/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
  this.cap = capacity;
  this.cache = new Map();
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
  let cache = this.cache;
  if (cache.has(key)) {
    let val = cache.get(key);
    // 删除元素
    cache.delete(key);
    // 重新插入到map结构最后
    cache.set(key, val);
    return val;
  } else {
    return -1;
  }
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
  let cache = this.cache;
  if (cache.has(key)) {
    // 删除元素
    cache.delete(key);
  } else {
    if (cache.size == this.cap) {
      // 删除map中第一个元素
      cache.delete(cache.keys().next().value);
    }
  }
  // 重新赋值插入
  cache.set(key, value);
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
```
