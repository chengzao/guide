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

- 共同点：都是保存在浏览器端，并且是同源的
- `sessionStorage`和`localStorage`不会自动把数据发给服务器，仅在本地保存
- `Cookie`

```bash
cookie数据始终在同源的http请求中携带（即使不需要），即cookie在浏览器和服务器间来回传递

cookie数据还有路径（path）的概念，可以限制cookie只属于某个路径下,存储的大小很小只有4K左右

key：可以在浏览器和服务器端来回传递，存储容量小，只有大约4K左右

cookie只在设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭

cookie也是在所有同源窗口中都是共享的
```

- `sessionStorage`仅在当前浏览器窗口关闭前有效，自然也就不可能持久保持

- `localStorage`始终有效，窗口或浏览器关闭也一直保存，因此用作持久数据；localStorage 在所有同源窗口中都是共享的

## transition和animation的区别

- transition需要触发一个事件才能改变属性,transition为2帧，从`from .... to`;
- animation不需要触发任何事件的情况下才会随时间改变属性值,animation可以一帧一帧的

## Cookie和session的区别

- HTTP是一个无状态协议，因此Cookie的最大的作用就是存储sessionId用来唯一标识用户
- Cookie如何防范XSS攻击
  - XSS（跨站脚本攻击）是指攻击者在返回的HTML中嵌入javascript脚本，为了减轻这些攻击，需要在HTTP头部配上`，set-cookie：`
  - `httponly`这个属性可以防止XSS,它会禁止javascript脚本来访问cookie
  - `secure`这个属性告诉浏览器仅在请求为https的时候发送cookie

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

## 解决 IE9 以下浏览器不能使用 opacity

```css
opacity: 0.5;
filter: alpha(opacity = 50);
filter: progid:DXImageTransform.Microsoft.Alpha(style = 0, opacity = 50);
```

## 清除浮动的方式

- 额外标签法

```css
.clear{ clear:both; }
```

- 伪元素

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

- 双伪元素

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

- BFC清除内部浮动:父级触发块级格式化上下文,形成独立渲染区域

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

## a伪类的顺序

- `link visited hover active`
  - `link`:平常的状态
  - `visited`:被访问过之后
  - `hover`:鼠标放到链接上的时候
  - `active`:链接被按下的时候

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

## 1pxborder(1像素问题)

<details>
<summary>view code</summary>

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

</details>

## 将hello-world风格的转化为helloWorld风格

```js
const camelizeRE = /-(\w)/g
const camelize = (str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
}

camelize('hello-world')
// "helloWorld"
```


docker run -p 3306:3306 --name mymysql -v /Users/chenzhaohong/srv/mysql/logs:/logs -v /Users/chenzhaohong/srv/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=admin -d mysql:latest
