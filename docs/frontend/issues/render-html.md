---
title: URL到页面加载过程
date: 2020-07-20
sidebar: "auto"
tags:
  - html渲染
categories:
  - frontend
---

:::tip

原文: [URL 到页面加载过程](https://zhuanlan.zhihu.com/p/34453198?group_id=957277540147056640)

:::

## OIS 七层模型模型

> 原文：https://www.liwenzhou.com/posts/Go/15_socket/

![OIS-20210111160033](https://cdn.jsdelivr.net/gh/chengzao/imgbed@main/images/OIS-20210111160033.png)

## 五层模型

> 原文：https://www.liwenzhou.com/posts/Go/15_socket/

![protocol-20210111160334](https://cdn.jsdelivr.net/gh/chengzao/imgbed@main/images/protocol-20210111160334.png)

## socket图解

> 原文：https://www.liwenzhou.com/posts/Go/15_socket/

![Socket-20210111161754](https://cdn.jsdelivr.net/gh/chengzao/imgbed@main/images/Socket-20210111161754.png)

## TCP

:::tip

- 原文：https://www.cnblogs.com/xiaolincoding/p/12638546.html
- TCP 是面向连接的、可靠的、基于字节流的传输层通信协议

:::

![TCP-20210111162547](https://cdn.jsdelivr.net/gh/chengzao/imgbed@main/images/TCP-20210111162547.png)

- 为什么挥手需要四次？
  - 关闭连接时，客户端向服务端发送 FIN 时，仅仅表示客户端不再发送数据了但是还能接收数据；
  - 服务器收到客户端的 FIN 报文时，先回一个 ACK 应答报文，而服务端可能还有数据需要处理和发送，等服务端不再发送数据时，才发送 FIN 报文给客户端来表示同意现在关闭连接。

## 从输入 URL 到页面加载的过程

- `1.` 从浏览器接收 url 到开启网络请求线程 (浏览器的机制以及进程与线程之间的关系)
- `2.` 开启网络线程到发出一个完整的 http 请求 (涉及到 dns 查询，tcp/ip 请求，五层因特网协议栈等知识，tcp三次握手，四次挥手)
- `3.` 从服务器接收到请求到对应后台接收到请求 (涉及到负载均衡，安全拦截以及后台内部的处理等)
- `4.` 后台和前台的 http 交互 （这一部分包括 http 头部、响应码、报文结构、cookie 等知识，可以提下静态资源的 cookie 优化，以及编码解码，如 gzip 压缩等）
- `5.` 单独拎出来的缓存问题，http 的缓存 （这部分包括 http 缓存头部，etag，catch-control 等）
- `6.` 浏览器接收到 http 数据包后的解析流程 （解析 html-词法分析然后解析成 dom 树、解析 css 生成 css 规则树、合并成 render 树，然后 layout、painting 渲染、复合-`图层的合成、GPU 绘制、外链资源的处理、loaded 和 domcontentloaded 等）
- `7.` CSS 的可视化格式模型（元素的渲染规则，如包含块，控制框，BFC，IFC 等概念）
- `8.` JS 引擎解析过程（JS 的解释阶段，预处理阶段，执行阶段生成执行上下文，VO，作用域链、回收机制等等）
- `9.` 其它（可以拓展不同的知识模块，如跨域，web 安全，hybrid 模式等等内容）

## 解析页面流程

- `1.` 解析 HTML，构建 DOM 树
- `2.` 解析 CSS，生成 CSS 规则树
- `3.` 合并 DOM 树和 CSS 规则，生成 render 树
- `4.` 布局 render 树(Layout/reflow), 负责各元素尺寸、位置的计算
- `5.` 绘制 render 树（paint），绘制页面像素信息
- `6.` 浏览器会将各层的信息发送给 GPU，GPU 会将各层合成（composite），显示在屏幕上

## 渲染

- 计算 CSS 样式
- 构建渲染树
- 布局，主要定位坐标和大小，是否换行，各种 position overflow z-index 属性
- 绘制，将图像绘制出来

## Reflow 回流

当渲染树中的一部分(或全部)因为元素的规模尺寸，布局，隐藏等改变而需要重新构建, 这就称为回流(reflow)

- 页面渲染初始化
- DOM 结构改变，比如删除了某个节点
- render 树变化，比如减少了 padding
- 窗口 resize
- 获取某些属性，引发回流
  - `offset(Top/Left/Width/Height)`
  - `scroll(Top/Left/Width/Height)`
  - `cilent(Top/Left/Width/Height)`
  - `width, height`
  - 调用了`getComputedStyle()`或者 IE 的`currentStyle`
- 改变字体大小会引发回流
- 元素尺寸的改变——大小，外边距，边框

## 重绘（repaint 或 redraw）

重绘发生在元素的可见的外观被改变，但并没有影响到布局的时候。
例，仅修改 DOM 元素的字体颜色（只有 Repaint，因为不需要调整布局）

## 回流一定伴随着重绘，重绘却可以单独出现

## 回流重绘的优化方案

- 减少逐项更改样式，最好一次性更改 style，或者将样式定义为 class 并一次性更新
- 避免循环操作 dom，创建一个 documentFragment 或 div，在它上面应用所有 DOM 操作，最后再把它添加到 window.document
- 避免多次读取 offset 等属性。无法避免则将它们缓存到变量
- 将复杂的元素绝对定位或固定定位，使得它脱离文档流，否则回流代价会很高

## 引擎对 JS 的处理过程

- `1.` 读取代码，进行词法分析（Lexical analysis），然后将代码分解成词元（token）
- `2.` 对词元进行语法分析（parsing），然后将代码整理成语法树（syntax tree）
- `3.` 使用翻译器（translator），将代码转为字节码（bytecode）
- `4.` 使用字节码解释器（bytecode interpreter），将字节码转为机器码

## 缓存

[juejin/浅谈 HTTP 缓存](https://juejin.im/post/5bdeabbbe51d4505466cd741)

- 强缓存

```
Expires: 值是服务器告诉浏览器的缓存过期时间
cache-control: 值是相对时间内直接使用浏览器缓存
```

- 协商缓存

```
Last-Modified 和 If-Modified-Since : 文件在服务器上最近的修改时间
Etag 和 If-None-Match : 只有当文件内容改变时，ETag才改变
```

- 缓存的优先级

```
Cache-Control > Expires > ETag > Last-Modified
```
