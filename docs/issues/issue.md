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

## transition和animation的区别

- transition需要触发一个事件才能改变属性,transition为2帧，从`from .... to`;
- animation不需要触发任何事件的情况下才会随时间改变属性值,animation可以一帧一帧的

## mouseover和mouseenter的区别

- mouseover：当鼠标移入元素或其子元素都会触发事件，所以有一个重复触发，冒泡的过程。对应的移除事件是mouseout
- mouseenter：当鼠标移除元素本身（不包含元素的子元素）会触发事件，也就是不会冒泡，对应的移除事件是mouseleave

## 图片的懒加载和预加载

- 预加载：提前加载图片，当用户需要查看时可直接从本地缓存中渲染, 会增加服务器前端压力
- 懒加载：懒加载的主要目的是作为服务器前端的优化，减少请求数或延迟请求数, 对服务器前端有一定的缓解压力作用

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

## javscript标签的 async & defer

- [原文：彻底搞懂 async & defer](https://github.com/xiaoyu2er/blog/issues/8)
- 两者都不会阻止 document 的解析
- defer 会在 DOMContentLoaded 前依次执行
- async 则是下载完立即执行，不一定是在 DOMContentLoaded 前

## javscript标签 `type="module"`

- [原文](http://houdunren.gitee.io/note/js/13%20%E6%A8%A1%E5%9D%97%E8%AE%BE%E8%AE%A1.html#%E6%A0%87%E7%AD%BE%E4%BD%BF%E7%94%A8)
- 标签使用`<script type="module"></script>`
- 模块路径

```html
<!-- hd.js -->
export let hd = {
  name: "后盾人"
};
<!-- html -->
<script type="module">
  import { hd } from "./hd.js";
</script>
```

- 延迟解析

```html
<body>
  <script type="module">
    console.log(document.querySelector("button")); //Button
  </script>
  <script>
    console.log(document.querySelector("button")); //undefined
  </script>
  <button>后盾人</button>
</body>
```

- 严格模式

```html
<!-- 模块默认运行在严格模式，以下代码没有使用声明语句将报错 -->
<script type="module">
	hd = "houdunren"; // Error
</script>

<script>
  console.log(this); //Window
</script>
<script type="module">
  console.log(this); //undefiend
</script>
```

- 作用域

```html
<!-- 模块都有独立的顶级作用域，下面的模块不能互相访问 -->
<script type="module">
  let hd = "houdunren.com";
</script>

<script type="module">
  alert(hd); // Error
</script>

<!-- 单独文件作用域也是独立的 -->
<script type="module" src="1.1.js"></script>
<script type="module" src="1.2.js"></script>

<!-- # 1.1.js -->
let hd = "houdunren";

<!-- # 1.2.js -->
console.log(hd)
```

- 预解析

```html
<!-- 引入多入hd.js 脚本时只执行一次 -->
<script type="module" src="hd.js"></script>
<script type="module" src="hd.js"></script>

<!-- #hd.js内容如下 -->
console.log("houdunren.com");

<!-- 导入多次 hd.js 时只解析一次 -->
<script type="module">
  import "./hd.js";
  import "./hd.js";
</script>

<!-- # hd.js内容如下 -->
console.log("houdunren.com");
```
