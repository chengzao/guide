# URL到页面加载过程

- `https://zhuanlan.zhihu.com/p/34453198?group_id=957277540147056640`

## 从输入URL到页面加载的过程

- `1.` 从浏览器接收url到开启网络请求线程 (浏览器的机制以及进程与线程之间的关系)
- `2.` 开启网络线程到发出一个完整的http请求 (涉及到dns查询，tcp/ip请求，五层因特网协议栈等知识)
- `3.` 从服务器接收到请求到对应后台接收到请求 (涉及到负载均衡，安全拦截以及后台内部的处理等)
- `4.` 后台和前台的http交互 （这一部分包括http头部、响应码、报文结构、cookie等知识，可以提下静态资源的cookie优化，以及编码解码，如gzip压缩等）
- `5.` 单独拎出来的缓存问题，http的缓存 （这部分包括http缓存头部，etag，catch-control等）
- `6.` 浏览器接收到http数据包后的解析流程 （解析html-词法分析然后解析成dom树、解析css生成css规则树、合并成render树，然后layout、painting渲染、复合-`图层的合成、GPU绘制、外链资源的处理、loaded和domcontentloaded等）
- `7.` CSS的可视化格式模型（元素的渲染规则，如包含块，控制框，BFC，IFC等概念）
- `8.` JS引擎解析过程（JS的解释阶段，预处理阶段，执行阶段生成执行上下文，VO，作用域链、回收机制等等）
- `9.` 其它（可以拓展不同的知识模块，如跨域，web安全，hybrid模式等等内容）

## 解析页面流程

- `1.` 解析HTML，构建DOM树
- `2.` 解析CSS，生成CSS规则树
- `3.` 合并DOM树和CSS规则，生成render树
- `4.` 布局render树(Layout/reflow),  负责各元素尺寸、位置的计算
- `5.` 绘制render树（paint），绘制页面像素信息
- `6.` 浏览器会将各层的信息发送给GPU，GPU会将各层合成（composite），显示在屏幕上

## 渲染

- `1.` 计算CSS样式
- `2.` 构建渲染树
- `3.` 布局，主要定位坐标和大小，是否换行，各种position overflow z-index属性
- `4.` 绘制，将图像绘制出来

## Reflow 回流

- `1.`页面渲染初始化
- `2.`DOM结构改变，比如删除了某个节点
- `3.`render树变化，比如减少了padding
- `4.`窗口resize
- `5.`获取某些属性，引发回流
  - `(1)` offset(Top/Left/Width/Height)
  - `(2)` scroll(Top/Left/Width/Height)
  - `(3)` cilent(Top/Left/Width/Height)
  - `(4)` width,height
  - `(5)` 调用了getComputedStyle()或者IE的currentStyle
- `6.`改变字体大小会引发回流

## Repaint 重绘

## 回流一定伴随着重绘，重绘却可以单独出现

## 回流重绘的优化方案

- 减少逐项更改样式，最好一次性更改style，或者将样式定义为class并一次性更新
- 避免循环操作dom，创建一个documentFragment或div，在它上面应用所有DOM操作，最后再把它添加到window.document
- 避免多次读取offset等属性。无法避免则将它们缓存到变量
- 将复杂的元素绝对定位或固定定位，使得它脱离文档流，否则回流代价会很高

## 引擎对JS的处理过程

- `1.` 读取代码，进行词法分析（Lexical analysis），然后将代码分解成词元（token）
- `2.` 对词元进行语法分析（parsing），然后将代码整理成语法树（syntax tree）
- `3.` 使用翻译器（translator），将代码转为字节码（bytecode）
- `4.` 使用字节码解释器（bytecode interpreter），将字节码转为机器码
