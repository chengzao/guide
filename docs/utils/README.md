# 目录

- [Array常见算法](./array.md)

- [Type类型判断](./types.md)

- [Mobile Touch](./mobile.md)

- [Event兼容封装](./event.md)

- [常见工具](./tools.md)

- [JavaScript 数据结构与算法之美 - 十大经典排序算法](https://juejin.im/post/5d3ea9a4e51d4561f060cd2d)

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

<CodeBlock title="浮点数计算精度" show="false">

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
