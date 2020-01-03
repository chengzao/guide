# 常用方法

[[toc]]

## 简易克隆对象

<CodeBlock>

<<< @/utils/docs/object/cloneObject.js

</CodeBlock>

## formatNumber

```js
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
```

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

## 横竖屏

<CodeBlock>

<<< @/utils/docs/client/changeOrientation.js

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

## 将hello-world风格的转化为helloWorld风格

<CodeBlock>

```js
const camelizeRE = /-(\w)/g
const camelize = (str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
}

camelize('hello-world')
// "helloWorld"
```

</CodeBlock>

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

<CodeBlock title="点击展开" show="false">

<<< @/utils/docs/issue/fib.js

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
