# 常用方法

[[toc]]

## 简易克隆对象

<CodeBlock>

<<< @/utils/docs/object/cloneObject.js

</CodeBlock>

## formateMoney

```js
const formatMoney = function (num) {
  if (num == '0') {
    return "0.00";
  }
  if (num == undefined || num == '' || num == null) {
    return '-';
  }
  return parseFloat(num).toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
}
```

## formateNumber

```js
function formatNumber (num) {
    let numStr = num + '';
    let arr = num < 0 ? numStr.slice(1).split('.') : numStr.split('.');
    let a = arr[0].split('');
    for(let i = a.length - 3; i > 0; i=i-3) {
      a.splice(i, 0, ',')
    }
    let res = arr[1] ? a.join('') + '.' + arr[1] : a.join('')
    return num < 0 ? '-' + res : res;
}
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

## 获取类名ClassName

<CodeBlock>

<<< @/utils/docs/dom/getClassName.js

</CodeBlock>

## 动画animate

- 简易版

<CodeBlock>

<<< @/utils/docs/animate/animate01.js

</CodeBlock>

- animate

<CodeBlock>

<<< @/utils/docs/animate/animate02.js

</CodeBlock>

- animate多属性动画

<CodeBlock>

<<< @/utils/docs/animate/animate03.js

</CodeBlock>

## 根据属性得到具体元素

<CodeBlock>

<<< @/utils/docs/dom/atrGetEle.js

</CodeBlock>

## 对象深度克隆

<CodeBlock>

<<< @/utils/docs/object/cloneDeep.js

</CodeBlock>

## other

<CodeBlock>

<<< @/utils/docs/js/createScript.js

</CodeBlock>

## log

<<< @/utils/docs/js/log.js

## cached

<CodeBlock>

<<< @/utils/docs/js/cached.js

</CodeBlock>

## UrlToObject

<CodeBlock>

<<< @/utils/docs/js/urlToObject.js

</CodeBlock>

## hexToRGB

- 16进制颜色值转RGB值

<<< @/utils/docs/issue/hexToRGB.js

## toCamelCaseVar

- 转换驼峰命名

<<< @/utils/docs/issue/toCamelCaseVar.js

## toChineseNum

<<< @/utils/docs/issue/toChineseNum.js

## randomString

```js
const randomString = function (boolean, min, max) {
  var str = "",
    range = min,
    arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
      'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
      'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F',
      'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
      'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  // 随机产生
  if (boolean) {
    range = Math.round(Math.random() * (max - min)) + min;
  }
  for (var i = 0; i < range; i++) {
    pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
}
// demo
console.log(randomString(true, 1, 4));
```

## 如何避开JavaScript浮点数计算精度问题

- 如`0.1+0.2!==0.3`
- 简单的进制转换：`5..toString(2) //0101`
- 解决相关此问题的类库：[bignumber.js](https://github.com/MikeMcl/bignumber.js)
- 简单解决方案：将小数转成整数来运算，之后再转回小数

<CodeBlock title="点击展开代码" show="false">

<<< @/utils/docs/issue/numberfixed.js

</CodeBlock>

## 斐波那契数

<<< @/utils/docs/issue/fib.js

## Promise

- [原文：从零一步一步实现一个完整版的Promise](https://juejin.im/post/5d59757f6fb9a06ae76405c6)

- 简易版

```js
function myPromise(constructor){
    let self=this;
    self.status="pending" //定义状态改变前的初始状态
    self.value=undefined;//定义状态为resolved的时候的状态
    self.reason=undefined;//定义状态为rejected的时候的状态
    function resolve(value){
       if(self.status==="pending"){
          self.value=value;
          self.status="resolved";
       }
    }
    function reject(reason){
       if(self.status==="pending"){
          self.reason=reason;
          self.status="rejected";
       }
    }
    //捕获构造异常
    try{
       constructor(resolve,reject);
    }catch(e){
       reject(e);
    }
}
myPromise.prototype.then=function(onFullfilled,onRejected){
   let self=this;
   switch(self.status){
      case "resolved":
        onFullfilled(self.value);
        break;
      case "rejected":
        onRejected(self.reason);
        break;
      default:
   }
}
// demo
var p=new myPromise(function(resolve,reject){resolve(1)});
p.then(function(x){console.log(x)})
```

- 完整版

<CodeBlock title="点击展开" show="false">

<<< @/utils/docs/issue/promise.js

</CodeBlock>

## 验证一个数是否是素数

```js
function isPrime(num){
  if (typeof num !== 'number') {
    throw new TypeError('num should be number')
  }
	if (num === 2 || num === 3) {
		return true;
	};
	if (num % 2 === 0) {
		return false;
	};
	let divisor = 3, limit = Math.sqrt(num);
	while(limit >= divisor){
		if (num % divisor === 0) {
			return false;
		}
		else {
			divisor += 2;
		}
	}
	return true;
}
console.log(isPrime(30));  // false
console.log(isPrime(31));  // true
```

## 监听数组变化

<<< @/utils/docs/issue/observerableArray.js

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

<<< @/utils/docs/issue/isPalindrome.js

## FIFO

- 一种缓存算法，设置缓存上限，当达到了缓存上限的时候，按照先进先出的策略进行淘汰，再增加进新的 k-v

```js
class FIFOCache {
  constructor(limit) {
    this.limit = limit || 10
    this.map = {}
    this.keys = []
  }
  set(key, value) {
    let map = this.map
    let keys = this.keys
    if (!Object.prototype.hasOwnProperty.call(map, key)) {
      if (keys.length === this.limit) {
        delete map[keys.shift()]//先进先出，删除队列第一个元素
      }
      keys.push(key)
    }
    map[key] = value//无论存在与否都对map中的key赋值
  }
  get(key) {
    return this.map[key]
  }
}

let fifo = new FIFOCache(10)

for (let i = 0; i < 10; i++) {
  fifo.set(`name-${i}`, i)
}
fifo.set('name-10', 10)
console.log(fifo);
```

## LRU

- LRU（Least recently used，最近最少使用）算法。最近被访问的数据那么它将来访问的概率就大，缓存满的时候，优先淘汰最无人问津者

- 实现逻辑 Map : [原文：146. LRU缓存机制](https://leetcode-cn.com/problems/lru-cache/solution/146-lruhuan-cun-ji-zhi-by-alexer-660/)

```bash
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

```js
let myMap = new Map();

// 添加键
myMap.set('1', "a");
myMap.set('2', "b");
myMap.set('3', "c");
myMap.set('4', "d");

console.log(myMap.get('2')); // b

console.log(myMap.delete('4')); // true

console.log(myMap);

let val = myMap.keys();
console.log(val.next());
console.log(val.next());
```

- 代码

```js
/**
 * @param {number} capacity 容量
 */
var LRUCache = function (capacity) {
  this.cap = capacity;
  this.cache = new Map();
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
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
LRUCache.prototype.put = function (key, value) {
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

//  Your LRUCache object will be instantiated and called as such:
var cache = new LRUCache(2)
cache.put(1, 1);
cache.put(2, 2);
cache.get(1);       // 返回  1
cache.put(3, 3);    // 该操作会使得密钥 2 作废
cache.get(2);       // 返回 -1 (未找到)
cache.put(4, 4);    // 该操作会使得密钥 1 作废
cache.get(1);       // 返回 -1 (未找到)
cache.get(3);       // 返回  3
cache.get(4);       // 返回  4

console.log(cache);
```

## 字符串正则去重

```js
var str = "adaaasfjjjbkk";

var res = str.replace(/(.).*(\1)/g, function ($1, $2, $3) {
  $1 = $2 + $1.substring(1).replace(new RegExp($2, 'g'), '');
  return $1;
})
```

## 使用 Array 来重复字符

```js
for (let a = "", i = 7; i--;) a+= 0;

let b = Array(7).join(0); // "0000000"
let c = Array(7).join('La') // "LaLaLaLaLaLa"

let d = "0".repeat(7); // "0000000"
let e = Array(7).fill('Ab').join('') // AbAbAbAbAbAbAb
```

## 使用toString(16)取随机字符串

```js
Math.random().toString(16).substring(2, 15);
```
