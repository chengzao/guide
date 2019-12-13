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

## 画一条0.5px的线

- 采用meta viewport的方式

- 采用 border-image的方式

- 采用transform: scale()的方式

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

## 解决 IE9 以下浏览器不能使用 opacity

<CodeBlock>

```css
opacity: 0.5;
filter: alpha(opacity = 50);
filter: progid:DXImageTransform.Microsoft.Alpha(style = 0, opacity = 50);
```

</CodeBlock>

## 清除浮动的方式

- 额外标签法

<CodeBlock>

```css
.clear{ clear:both; }
```

</CodeBlock>

- 伪元素

<CodeBlock>

```css
.clearfix:after{
	display: block;
	overflow: hidden;
	visibility: hidden;
	height: 0;
	content: '';
	clear: both;
}
.clearfix{
	zoom:1;
}
```

</CodeBlock>

- 双伪元素

<CodeBlock>

```css
.clearfix:after,
.clearfix:before{
	display: table;
	overflow: hidden;
	height: 0;
	content: '';
	clear: both;
}
.clearfix{
	zoom:1;
}
```

</CodeBlock>

- BFC清除内部浮动:父级触发块级格式化上下文,形成独立渲染区域

<CodeBlock>

```css
/* fu */
.box{
    width: 300px;
    border: 1px solid #000;
    overflow: hidden;
}
/* zi */
.one{
    width: 150px;
    height: 200px;
    background-color: pink;
    float: left;
}
/* zi */
.two{
    width: 150px;
    height: 200px;
    background-color: blue;
    float: left;
}
```

</CodeBlock>

## a伪类的顺序

- `link visited hover active`
  - `link`:平常的状态
  - `visited`:被访问过之后
  - `hover`:鼠标放到链接上的时候
  - `active`:链接被按下的时候

<CodeBlock>

```css
a:link {
	background-color: blue;
}
a:visited {
	background-color: pink;
}
a:hover {
	background-color: purple;
}
a:active {
	background-color: yellow;
}
```

</CodeBlock>

## 1pxborder(1像素问题)

<CodeBlock>

```html
<style type="text/css">
  body{
    background-color: #dfdfdf;
  }
  .box {
    width: 100px;
    height: 100px;
    text-align: center;
    margin-bottom: 10px;
    background-color: #fff;
  }

  .scale {
    position: relative;
    border: none;
  }

  .scale:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid #000;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 200%;
    height: 200%;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    -webkit-transform-origin: left top;
    transform-origin: left top;
  }

  .box-shadow-1px {
    box-shadow: inset 0px -1px 1px -1px #000;
  }

  .scale－single{
    position: relative;
    border: none;
  }

  .scale－single:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    background: #000;
    width: 100%;
    height: 1px;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
  }
</style>

<div class="box scale">scale all</div>
<div class="box box-shadow-1px">box shadow</div>
<div class="box scale－single">scale single</div>
```

</CodeBlock>

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

```js
'use strict'

var accAdd = function(num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    var dec1, dec2, times;
    try { dec1 = countDecimals(num1)+1; } catch (e) { dec1 = 0; }
    try { dec2 = countDecimals(num2)+1; } catch (e) { dec2 = 0; }
    times = Math.pow(10, Math.max(dec1, dec2));
    // var result = (num1 * times + num2 * times) / times;
    var result = (accMul(num1, times) + accMul(num2, times)) / times;
    return getCorrectResult("add", num1, num2, result);
    // return result;
};

var accSub = function(num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    var dec1, dec2, times;
    try { dec1 = countDecimals(num1)+1; } catch (e) { dec1 = 0; }
    try { dec2 = countDecimals(num2)+1; } catch (e) { dec2 = 0; }
    times = Math.pow(10, Math.max(dec1, dec2));
    // var result = Number(((num1 * times - num2 * times) / times);
    var result = Number((accMul(num1, times) - accMul(num2, times)) / times);
    return getCorrectResult("sub", num1, num2, result);
    // return result;
};

var accDiv = function(num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    var t1 = 0, t2 = 0, dec1, dec2;
    try { t1 = countDecimals(num1); } catch (e) { }
    try { t2 = countDecimals(num2); } catch (e) { }
    dec1 = convertToInt(num1);
    dec2 = convertToInt(num2);
    var result = accMul((dec1 / dec2), Math.pow(10, t2 - t1));
    return getCorrectResult("div", num1, num2, result);
    // return result;
};

var accMul = function(num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    var times = 0, s1 = num1.toString(), s2 = num2.toString();
    try { times += countDecimals(s1); } catch (e) { }
    try { times += countDecimals(s2); } catch (e) { }
    var result = convertToInt(s1) * convertToInt(s2) / Math.pow(10, times);
    return getCorrectResult("mul", num1, num2, result);
    // return result;
};

var countDecimals = function(num) {
    var len = 0;
    try {
        num = Number(num);
        var str = num.toString().toUpperCase();
        if (str.split('E').length === 2) { // scientific notation
            var isDecimal = false;
            if (str.split('.').length === 2) {
                str = str.split('.')[1];
                if (parseInt(str.split('E')[0]) !== 0) {
                    isDecimal = true;
                }
            }
            let x = str.split('E');
            if (isDecimal) {
                len = x[0].length;
            }
            len -= parseInt(x[1]);
        } else if (str.split('.').length === 2) { // decimal
            if (parseInt(str.split('.')[1]) !== 0) {
                len = str.split('.')[1].length;
            }
        }
    } catch(e) {
        throw e;
    } finally {
        if (isNaN(len) || len < 0) {
            len = 0;
        }
        return len;
    }
};

var convertToInt = function(num) {
    num = Number(num);
    var newNum = num;
    var times = countDecimals(num);
    var temp_num = num.toString().toUpperCase();
    if (temp_num.split('E').length === 2) {
        newNum = Math.round(num * Math.pow(10, times));
    } else {
        newNum = Number(temp_num.replace(".", ""));
    }
    return newNum;
};

var getCorrectResult = function(type, num1, num2, result) {
    var temp_result = 0;
    switch (type) {
        case "add":
            temp_result = num1 + num2;
            break;
        case "sub":
            temp_result = num1 - num2;
            break;
        case "div":
            temp_result = num1 / num2;
            break;
        case "mul":
            temp_result = num1 * num2;
            break;
    }
    if (Math.abs(result - temp_result) > 1) {
        return temp_result;
    }
    return result;
};
// 用法
加法： accAdd(0.1, 0.2)  // 得到结果：0.3
减法： accSub(1, 0.9)    // 得到结果：0.1
除法： accDiv(2.2, 100)  // 得到结果：0.022
乘法： accMul(7, 0.8)    // 得到结果：5.6

// 工具函数
countDecimals()方法：计算小数位的长度

convertToInt()方法：将小数转成整数

getCorrectResult()方法：确认我们的计算结果无误，以防万一
```
