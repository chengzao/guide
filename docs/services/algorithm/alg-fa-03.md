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
