---
title: 代码片段(一)
date: 2021-10-22
sidebar: "auto"
tags:
  - array
  - tree
categories:
  - frontend
---

## 升序算法

```js
function AscOrder(arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length - i; j++) {
      if (arr[j] > arr[j + 1]) {
        var c = arr[j]; //交换两个变量的位置
        arr[j] = arr[j + 1];
        arr[j + 1] = c;
      }
    };
  };
  return arr.toString();
}
console.log(AscOrder([23, 45, 18, 37, 92, 13, 24]));
```

## 降序排列

```js
function DesOrder(arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length - i; j++) {
      if (arr[j] < arr[j + 1]) {
        var c = arr[j]; //交换两个变量的位置
        arr[j] = arr[j + 1];
        arr[j + 1] = c;
      }
    };
  };
  return arr.toString();
}
console.log(DesOrder([13, 45, 18, 37, 9, 13, 24]));
```

## 数组去重

```js
function unique(arr) {
  var result = [];
  for (var i = 0, len = arr.length; i < len; i++) {
    var arri = arr[i];
    if (result.indexOf(arri) < 0) {
      result.push(arri);
    }

  }
  return result;
}

function unique(arr) {
  for (let i = 0, len = arr.length; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[i] == arr[j]) {
        arr.splice(j, 1)
        len--;
        j--
      }
    }
  }
  return arr
}

function unique(arr) {
  return arr.filter((item, index) => {
    return arr.indexOf(item) === index
  })
}

function unique(arr) {
  return [...new Set(arr)]
}

function unique(arr) {
  var obj = []
  return arr.filter(item => {
    console.log(obj);
    return obj.hasOwnProperty(typeof item + item) ?
      false : (obj[typeof item + item] = true)
  })
}

function unique(array) {
  // res用来存储结果
  var res = [];
  for (var i = 0, arrayLen = array.length; i < arrayLen; i++) {
    for (var j = 0, resLen = res.length; j < resLen; j++) {
      if (array[i] === res[j]) {
        break;
      }
    }
    // 如果array[i]是唯一的，那么执行完循环，j等于resLen
    if (j === resLen) {
      res.push(array[i])
    }
  }
  return res;
}
```

## 最大值 / 最小值

- 最小值

```js
function MinNum(arr) {
  var min = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (min > arr[i]) {
      min = arr[i]
    }
  }
  return min;
}
console.log(MinNum([2, 3, -44, 555, 222]))

// 最小值
Math.min.apply(Math, [32, 18, 38, 12, 43, 31, 17])
```

- 最大值

```js
function MaxNum(arr) {
  var max = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (max < arr[i]) {
      max = arr[i];
    }
  }
  return max;
}

console.log(MaxNum([2, 3, 3, 42, 1123]))

var a = [1, 2, 3, [5, 6],
  [1, 4, 8]
];
var ta = a.join(",").split(","); //转化为一维数组
console.log(Math.max.apply(null, ta)); //最大值
console.log(Math.min.apply(null, ta)); //最小值
```

## 找出字符串中重复次数最多

```js
function deduplication(str) {

  var json = {};
  //将存在字符的加入到json中；
  for (var i = 0; i < str.length; i++) {
    if (!json[str.charAt(i)]) {
      json[str.charAt(i)] = 1;
    } else {
      json[str.charAt(i)]++;
    }
  }

  //遍历json对象。比较json[key]的value值大小
  var iMax = 0;
  var iIndex = "";
  var str = '';
  for (var j in json) {
    str += j
    if (json[j] > iMax) {
      iMax = json[j];
      iIndex = j;
    }
  }
  console.log('去重后的为: ' + str);
  console.log('出现次数最多的是: ' + iIndex + " 出现了: " + iMax);
}
var str = 'asdfssmmmaaasasasasaa';
deduplication(str);
```

## 随机生成范围内不重复数字

```js
// 随机生成范围内不重复数字
// aArray空数组 len数组个数  min最小值  max最大值
function randomNumber(aArray, len, min, max) {
  if (len >= (max - min)) {
    console.log('超过' + min + '-' + max + '之间的个数范围' + (max - min - 1) + '个的总数');
    return;
  }
  if (aArray.length >= len) {
    aArray.sort(function (a, b) {
      return a - b
    });
    return aArray;
  }
  var nowNub = parseInt(Math.random() * (max - min - 1)) + (min + 1);
  //判断数组内是否有重复
  for (var j = 0; j < aArray.length; j++) {
    if (nowNub == aArray[j]) {
      // 再次执行函数
      randomNumber(aArray, len, min, max);
      return;
    }
  }
  // 添加到数组
  aArray.push(nowNub);
  //再次执行函数
  randomNumber(aArray, len, min, max);
  return aArray;
}

//定义一个空数组接收
var arr2 = [];
randomNumber(arr2, 8, 1, 10);
console.log(arr2);
```

## toRMB 形式

```js
// 将数字12345678转化成 RMB形式
function re(str) {
  str += '';
  return str.split("").reverse().join("");
}

function toRMB(num) {
  var tmp = '';
  for (var i = 1; i <= re(num).length; i++) {
    tmp += re(num)[i - 1];
    // console.log(tmp)
    if (i % 3 == 0 && i != re(num).length) {
      tmp += ',';
    }
  }
  return re(tmp);
}

var num1 = 12345789;
console.log(toRMB(num1));
```

## 字符串反转

```js
// 字符串反转，如将 '12345678' 变成 '87654321'
// split : 将字符串分割成字符串数组,反序,在将数组转换为字符串
var str = '123456789';
str = str.split('').reverse().join('');
console.log(str);
```

## 有序数组合并为一个数组

```js
function mergeArray (left, right) {
  let result = [],
       il = 0,
       ir = 0;
  while(il < left.length && ir < right.length) {
    if (left[il] < right[ir]) {
      result.push(left[il++]);
    } else {
      result.push(right[ir++]);
    }
  }
  return result.concat(left[il] ? left.slice(il) : right.slice(ir));
}

mergeArray([2,4,5], [1,3,6])
```

- [leetcode 88](https://leetcode-cn.com/problems/merge-sorted-array/)

```js
var merge = function(nums1, m, nums2, n) {
    // 初始化两个指针的指向，初始化 nums1 尾部索引k
    let i = m - 1, j = n - 1, k = m + n - 1
    // 当两个数组都没遍历完时，指针同步移动
    while(i >= 0 && j >= 0) {
        // 取较大的值，从末尾往前填补
        if(nums1[i] >= nums2[j]) {
            nums1[k] = nums1[i] // <-
            i--
            k--
        } else {
            nums1[k] = nums2[j]
            j--
            k--
        }
    }
    // nums2 留下的情况，特殊处理一下
    while(j>=0) {
        nums1[k] = nums2[j]
        k--
        j--
    }
};
```

## 二分查找

```js
// 二分查找，前提是数组为有序数组, 返回索引值, O(㏒n)复杂度
function binarySearch(target, arr) {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    let mid = parseInt(start + (end - start) / 2);
    if (target == arr[mid]) {
      return mid;
    } else if (target > arr[mid]) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return -1;
}
let arr = [1, 4, 6, 8, 9, 21, 45, 67, 98];
console.log(binarySearch(67, arr));
```

## 最大公约数&最小公倍数

```js
// 最大公约数: 能同时被两数整除的最大数字
function maxDivisor(num1, num2) {
  let max = num1 > num2 ? num1 : num2,
    min = num1 > num2 ? num2 : num1;
  for (var i = min; i >= 1; i--) {
    if (max % i == 0 && min % i == 0) {
      return i;
    }
  }
}

console.log(maxDivisor(60, 30)); // 30

// 最小公倍数: 能同时整除两数的最小数字
function minDivisor(num1, num2) {
  let max = num1 > num2 ? num1 : num2,
    min = num1 > num2 ? num2 : num1,
    result = 0;
  // 这个循环，当两数同为质数时，终止的最大条件值为 i = min
  for (var i = 1; i <= min; i++) {
    result = i * max;
    if (result % max == 0 && result % min == 0) {
      return result;
    }
  }
}
console.log(minDivisor(6, 8)); // 24
```

## 验证是否为回文

```js
// 数组方法生成倒装的新字符串与原字符串对比
function isPalindrome(str) {
  str = '' + str;
  if (!str || str.length < 2) {
    return false;
  }
  return (
    Array.from(str)
      .reverse()
      .join('') === str
  );
}

// 倒序循环生成新字符串与原字符串对比
function isPalindrome(str) {
  str = '' + str;
  if (!str || str.length < 2) {
    return false;
  }
  var newStr = '';
  for (var i = str.length - 1; i >= 0; i--) {
    newStr += str[i];
  }
  return str1 === str;
}

// 以中间点为基点，从头至中与从尾至中逐一字符串进行对比，若有一个不同，则 return false
function isPalindrome(str) {
  str = '' + str;
  if (!str || str.length < 2) {
    return false;
  }
  for (let i = 0; i < str.length / 2; i++) {
    if (str[i] !== str[str.length - 1 - i]) {
      return false;
    }
  }
  return true;
}
```

## 斐波那契数

- 递归版

```js
// fn1
var fib = function (N) {
  if (N == 0) return 0;
  if (N == 1) return 1;
  return fib(N - 1) + fib(N - 2)
};
```

- 动态规划(1)

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

- 动态规划(2)

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

- 公式版

```js
let fib = n => Math.round(
  (Math.pow((1 + Math.sqrt(5)) / 2, n) -
    Math.pow((1 - Math.sqrt(5)) / 2, n)) /
  Math.sqrt(5)
);
```

## 判断一个数是否为质数

```js
function isPrime(num) {
  if (num === 1) {
    return "1 不是质数，请输入大于1的数字";
  } else if (num <= 3) {
    return num > 1;
  } else {
    let sq = Math.sqrt(num);
    for (let i = 2; i <= sq; i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  }
}
```
