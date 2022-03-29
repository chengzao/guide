---
title: leetcode题目(一)
date: 2022-03-29
sidebar: "auto"
tags:
  - array
  - tree
categories:
  - frontend
---

## fib斐波那契(leetcode509)

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

## 两数之和(leetcode1)

> <https://leetcode-cn.com/problems/two-sum/>

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

## 三数之和(leetcode15)

> <https://leetcode-cn.com/problems/3sum/>

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

## 四数之和(leetcode18)

> <https://leetcode-cn.com/problems/4sum/>

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

## 两个大数相加

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

## 爬楼梯(leetcode70)

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

## 跳跃游戏(leetcode55)

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

## 不同路径(leetcode62)

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

## 搜索插入位置(leetcode35)

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

## 最长递增子序列(leetcode300)

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

## LRU缓存(leetcode146)

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

## 二叉树的层序遍历(leetcode102)

> https://leetcode-cn.com/problems/binary-tree-level-order-traversal/

```js
var levelOrder = function(root) {
    // 初始化结果数组
    const res = []  
    // 处理边界条件
    if(!root) {
        return res
    }  
    // 初始化队列
    const queue = []   
    // 队列第一个元素是根结点
    queue.push(root)  
    // 当队列不为空时，反复执行以下逻辑
    while(queue.length) {
        // level 用来存储当前层的结点
        const level = []  
        // 缓存刚进入循环时的队列长度，这一步很关键，因为队列长度后面会发生改变
        const len = queue.length  
        // 循环遍历当前层级的结点
        for(let i=0;i<len;i++) {
            // 取出队列的头部元素
            const top = queue.shift()  
            // 将头部元素的值推入 level 数组
            level.push(top.val)
            // 如果当前结点有左孩子，则推入下一层级
            if(top.left) {
                queue.push(top.left)
            }
            if(top.right) {
                queue.push(top.right)
            }
        }
        // 将 level 推入结果数组
        res.push(level)
    }
    // 返回结果数组
    return res
};
```

- 面试题，将treeNode使用层序遍历输出

```js
const ExampleTreeRoot = {
  name: "Top",
  children: [
    {
      name: "Level 1",
      children: [
        {
          name: "Level 1-1",
          children: [],
        },
        {
          name: "Level 1-2",
          children: [],
        },
      ],
    },
    {
      name: "Level 2",
      children: [
        {
          name: "Level 2-1",
          children: [],
        },
        {
          name: "Level 2-2",
          children: [],
        },
      ],
    },
  ],
};

function bfs(root) {
  const queue = []; // 初始化队列queue
  const ans = [];
  // 根结点首先入队
  queue.push(root);
  // 队列不为空，说明没有遍历完全
  while (queue.length) {
    const top = queue[0]; // 取出队头元素
    // 访问 top
    ans.push(top.name);
    if (top.children) {
      top.children.forEach((chid) => {
        queue.push(chid);
      });
    }
    queue.shift(); // 访问完毕，队头元素出队
  }
  console.log(ans);
}

bfs(ExampleTreeRoot);
```

## 有效的括号(leetcode20)

> https://leetcode-cn.com/problems/valid-parentheses/
> 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效

```js
var isValid = function(s) {
    let map = {
        "(": ")",
        "[": "]",
        "{": "}"
    }
    if(!s){return true}
    if(s.length % 2) return false;  // 如果s.length为奇数
    
    const stack = []
    let len = s.length;
    for(let i=0; i<len; i++){
        let ch = s[i]
        if (ch === "(" || ch === "{" || ch === "["){
            stack.push(map[ch])
        }else{
            if (!stack.length || stack.pop() !== ch) {
                return false;
            }
        }
    }
    return !stack.length
};
```
