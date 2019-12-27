# issue

## iframe是什么？有什么缺点？

- 定义：iframe元素会创建包含另一个文档的内联框架
- 缺点
  - 会阻塞主页面的onload事件
  - 搜索引擎无法解读这种页面，不利于SEO
  - iframe和主页面共享连接池，而浏览器对相同区域有限制所以会影响性能

## `click在ios上有300ms延迟，原因及如何解决？`

- 粗暴型，禁用缩放`<meta name="viewport" content="width=device-width, user-scalable=no">`
- 利用`FastClick`, 检测到touchend事件后，立刻出发模拟click事件，并且把浏览器300毫秒之后真正出发的事件给阻断掉

## `Cookie、sessionStorage、localStorage的区别`

- cookie大小限制4k, sessionStorage/localStorage大小限制在5MB
- `sessionStorage`和`localStorage`不会自动把数据发给服务器，仅在本地保存
- `Cookie`
  - cookie数据始终在同源的http请求中携带（即使不需要），即cookie在浏览器和服务器间来回传递
  - cookie数据还有路径（path）的概念，可以限制cookie只属于某个路径下,存储的大小很小只有4K左右
  - key：可以在浏览器和服务器端来回传递，存储容量小，只有大约4K左右
  - cookie只在设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭
  - cookie也是在所有同源中都是共享的

- `sessionStorage`仅在当前浏览器窗口关闭前有效，自然也就不可能持久保持
- `localStorage`始终有效，窗口或浏览器关闭也一直保存，因此用作持久数据；localStorage 在所有同源窗口中都是共享的
- Cookie如何防范XSS攻击
  - XSS（跨站脚本攻击）是指攻击者在返回的HTML中嵌入javascript脚本，为了减轻这些攻击，需要在HTTP头部配上`，set-cookie：`
  - `httponly`这个属性可以防止XSS,它会禁止javascript脚本来访问cookie
  - `secure`这个属性告诉浏览器仅在请求为https的时候发送cookie

## XSS和CSRF

- 跨站脚本攻击（Cross Site Scripting)
- 跨站请求伪造（Cross-site request forgery），是伪造请求，冒充用户在站内的正常操作
- 区别：
  - CSRF是利用网站A本身的漏洞，去请求网站A的api；XSS是向目标网站注入JS代码，然后执行JS里的代码
  - CSRF需要用户先登录目标网站获取cookie，而XSS不需要登录
  - CSRF的目标是用户，XSS的目标是服务器
  - XSS是利用合法用户获取其信息，而CSRF是伪造成合法用户发起请求


## transition和animation的区别

- transition需要触发一个事件才能改变属性,transition为2帧，从`from .... to`;
- animation不需要触发任何事件的情况下才会随时间改变属性值,animation可以一帧一帧的

## mouseover和mouseenter的区别

- mouseover：当鼠标移入元素或其子元素都会触发事件，所以有一个重复触发，冒泡的过程。对应的移除事件是mouseout
- mouseenter：当鼠标移除元素本身（不包含元素的子元素）会触发事件，也就是不会冒泡，对应的移除事件是mouseleave

## 图片的懒加载和预加载

- 预加载：提前加载图片，当用户需要查看时可直接从本地缓存中渲染, 会增加服务器前端压力
- 懒加载：懒加载的主要目的是作为服务器前端的优化，减少请求数或延迟请求数, 对服务器前端有一定的缓解压力作用

## js的new操作符做了哪些事情

- new 操作符新建了一个空对象
- 这个对象原型指向构造函数的prototype
- 执行构造函数后返回这个对象

## get和post

- HTTP 协议 未规定 GET 和POST的长度限制
- GET的最大长度显示是因为 浏览器和 web服务器限制了 URI的长度
- 不同的浏览器和WEB服务器，限制的最大长度不一样
- get要支持IE，则最大长度为2083byte，若只支持Chrome，则最大长度 8182byte
- get请求类似于查找的过程，用户获取数据，可以不用每次都与数据库连接，所以可以使用缓存
- post不同，post做的一般是修改和删除的工作，所以必须与数据库交互，所以不能使用缓存。因此get请求适合于请求缓存

## 性能优化

- 使用CDN
- gzip压缩
- 文本压缩
- 合并请求
- 雪碧图
- 图片懒加载
- 缓存资源
- 减少DOM操作

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
