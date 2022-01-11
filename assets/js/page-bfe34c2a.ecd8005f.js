(window.webpackJsonp=window.webpackJsonp||[]).push([[97],{623:function(t,e,a){"use strict";a.r(e);var s=a(11),i=Object(s.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"title"}),a("p",[t._v("原文: "),a("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/34453198?group_id=957277540147056640",target:"_blank",rel:"noopener noreferrer"}},[t._v("URL 到页面加载过程"),a("OutboundLink")],1)])]),a("h2",{attrs:{id:"ois-七层模型模型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ois-七层模型模型"}},[t._v("#")]),t._v(" OIS 七层模型模型")]),t._v(" "),a("blockquote",[a("p",[t._v("原文：https://www.liwenzhou.com/posts/Go/15_socket/")])]),t._v(" "),a("p",[a("img",{staticClass:"lazy",attrs:{alt:"OIS-20210111160033","data-src":"https://cdn.jsdelivr.net/gh/chengzao/imgbed@main/images/OIS-20210111160033.png",loading:"lazy"}})]),t._v(" "),a("h2",{attrs:{id:"五层模型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#五层模型"}},[t._v("#")]),t._v(" 五层模型")]),t._v(" "),a("blockquote",[a("p",[t._v("原文：https://www.liwenzhou.com/posts/Go/15_socket/")])]),t._v(" "),a("p",[a("img",{staticClass:"lazy",attrs:{alt:"protocol-20210111160334","data-src":"https://cdn.jsdelivr.net/gh/chengzao/imgbed@main/images/protocol-20210111160334.png",loading:"lazy"}})]),t._v(" "),a("h2",{attrs:{id:"socket图解"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#socket图解"}},[t._v("#")]),t._v(" socket图解")]),t._v(" "),a("blockquote",[a("p",[t._v("原文：https://www.liwenzhou.com/posts/Go/15_socket/")])]),t._v(" "),a("p",[a("img",{staticClass:"lazy",attrs:{alt:"Socket-20210111161754","data-src":"https://cdn.jsdelivr.net/gh/chengzao/imgbed@main/images/Socket-20210111161754.png",loading:"lazy"}})]),t._v(" "),a("h2",{attrs:{id:"tcp"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tcp"}},[t._v("#")]),t._v(" TCP")]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"title"}),a("ul",[a("li",[t._v("原文：https://www.cnblogs.com/xiaolincoding/p/12638546.html")]),t._v(" "),a("li",[t._v("TCP 是面向连接的、可靠的、基于字节流的传输层通信协议")])])]),a("p",[a("img",{staticClass:"lazy",attrs:{alt:"TCP-20210111162547","data-src":"https://cdn.jsdelivr.net/gh/chengzao/imgbed@main/images/TCP-20210111162547.png",loading:"lazy"}})]),t._v(" "),a("ul",[a("li",[t._v("为什么挥手需要四次？\n"),a("ul",[a("li",[t._v("关闭连接时，客户端向服务端发送 FIN 时，仅仅表示客户端不再发送数据了但是还能接收数据；")]),t._v(" "),a("li",[t._v("服务器收到客户端的 FIN 报文时，先回一个 ACK 应答报文，而服务端可能还有数据需要处理和发送，等服务端不再发送数据时，才发送 FIN 报文给客户端来表示同意现在关闭连接。")])])])]),t._v(" "),a("h2",{attrs:{id:"从输入-url-到页面加载的过程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#从输入-url-到页面加载的过程"}},[t._v("#")]),t._v(" 从输入 URL 到页面加载的过程")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("1.")]),t._v(" 从浏览器接收 url 到开启网络请求线程 (浏览器的机制以及进程与线程之间的关系)")]),t._v(" "),a("li",[a("code",[t._v("2.")]),t._v(" 开启网络线程到发出一个完整的 http 请求 (涉及到 dns 查询，tcp/ip 请求，五层因特网协议栈等知识，tcp三次握手，四次挥手)")]),t._v(" "),a("li",[a("code",[t._v("3.")]),t._v(" 从服务器接收到请求到对应后台接收到请求 (涉及到负载均衡，安全拦截以及后台内部的处理等)")]),t._v(" "),a("li",[a("code",[t._v("4.")]),t._v(" 后台和前台的 http 交互 （这一部分包括 http 头部、响应码、报文结构、cookie 等知识，可以提下静态资源的 cookie 优化，以及编码解码，如 gzip 压缩等）")]),t._v(" "),a("li",[a("code",[t._v("5.")]),t._v(" 单独拎出来的缓存问题，http 的缓存 （这部分包括 http 缓存头部，etag，catch-control 等）")]),t._v(" "),a("li",[a("code",[t._v("6.")]),t._v(" 浏览器接收到 http 数据包后的解析流程 （解析 html-词法分析然后解析成 dom 树、解析 css 生成 css 规则树、合并成 render 树，然后 layout、painting 渲染、复合-`图层的合成、GPU 绘制、外链资源的处理、loaded 和 domcontentloaded 等）")]),t._v(" "),a("li",[a("code",[t._v("7.")]),t._v(" CSS 的可视化格式模型（元素的渲染规则，如包含块，控制框，BFC，IFC 等概念）")]),t._v(" "),a("li",[a("code",[t._v("8.")]),t._v(" JS 引擎解析过程（JS 的解释阶段，预处理阶段，执行阶段生成执行上下文，VO，作用域链、回收机制等等）")]),t._v(" "),a("li",[a("code",[t._v("9.")]),t._v(" 其它（可以拓展不同的知识模块，如跨域，web 安全，hybrid 模式等等内容）")])]),t._v(" "),a("h2",{attrs:{id:"解析页面流程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#解析页面流程"}},[t._v("#")]),t._v(" 解析页面流程")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("1.")]),t._v(" 解析 HTML，构建 DOM 树")]),t._v(" "),a("li",[a("code",[t._v("2.")]),t._v(" 解析 CSS，生成 CSS 规则树")]),t._v(" "),a("li",[a("code",[t._v("3.")]),t._v(" 合并 DOM 树和 CSS 规则，生成 render 树")]),t._v(" "),a("li",[a("code",[t._v("4.")]),t._v(" 布局 render 树(Layout/reflow), 负责各元素尺寸、位置的计算")]),t._v(" "),a("li",[a("code",[t._v("5.")]),t._v(" 绘制 render 树（paint），绘制页面像素信息")]),t._v(" "),a("li",[a("code",[t._v("6.")]),t._v(" 浏览器会将各层的信息发送给 GPU，GPU 会将各层合成（composite），显示在屏幕上")])]),t._v(" "),a("h2",{attrs:{id:"渲染"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#渲染"}},[t._v("#")]),t._v(" 渲染")]),t._v(" "),a("ul",[a("li",[t._v("计算 CSS 样式")]),t._v(" "),a("li",[t._v("构建渲染树")]),t._v(" "),a("li",[t._v("布局，主要定位坐标和大小，是否换行，各种 position overflow z-index 属性")]),t._v(" "),a("li",[t._v("绘制，将图像绘制出来")])]),t._v(" "),a("h2",{attrs:{id:"reflow-回流"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#reflow-回流"}},[t._v("#")]),t._v(" Reflow 回流")]),t._v(" "),a("p",[t._v("当渲染树中的一部分(或全部)因为元素的规模尺寸，布局，隐藏等改变而需要重新构建, 这就称为回流(reflow)")]),t._v(" "),a("ul",[a("li",[t._v("页面渲染初始化")]),t._v(" "),a("li",[t._v("DOM 结构改变，比如删除了某个节点")]),t._v(" "),a("li",[t._v("render 树变化，比如减少了 padding")]),t._v(" "),a("li",[t._v("窗口 resize")]),t._v(" "),a("li",[t._v("获取某些属性，引发回流\n"),a("ul",[a("li",[a("code",[t._v("offset(Top/Left/Width/Height)")])]),t._v(" "),a("li",[a("code",[t._v("scroll(Top/Left/Width/Height)")])]),t._v(" "),a("li",[a("code",[t._v("cilent(Top/Left/Width/Height)")])]),t._v(" "),a("li",[a("code",[t._v("width, height")])]),t._v(" "),a("li",[t._v("调用了"),a("code",[t._v("getComputedStyle()")]),t._v("或者 IE 的"),a("code",[t._v("currentStyle")])])])]),t._v(" "),a("li",[t._v("改变字体大小会引发回流")]),t._v(" "),a("li",[t._v("元素尺寸的改变——大小，外边距，边框")])]),t._v(" "),a("h2",{attrs:{id:"重绘-repaint-或-redraw"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#重绘-repaint-或-redraw"}},[t._v("#")]),t._v(" 重绘（repaint 或 redraw）")]),t._v(" "),a("p",[t._v("重绘发生在元素的可见的外观被改变，但并没有影响到布局的时候。\n例，仅修改 DOM 元素的字体颜色（只有 Repaint，因为不需要调整布局）")]),t._v(" "),a("h2",{attrs:{id:"回流一定伴随着重绘-重绘却可以单独出现"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#回流一定伴随着重绘-重绘却可以单独出现"}},[t._v("#")]),t._v(" 回流一定伴随着重绘，重绘却可以单独出现")]),t._v(" "),a("h2",{attrs:{id:"回流重绘的优化方案"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#回流重绘的优化方案"}},[t._v("#")]),t._v(" 回流重绘的优化方案")]),t._v(" "),a("ul",[a("li",[t._v("减少逐项更改样式，最好一次性更改 style，或者将样式定义为 class 并一次性更新")]),t._v(" "),a("li",[t._v("避免循环操作 dom，创建一个 documentFragment 或 div，在它上面应用所有 DOM 操作，最后再把它添加到 window.document")]),t._v(" "),a("li",[t._v("避免多次读取 offset 等属性。无法避免则将它们缓存到变量")]),t._v(" "),a("li",[t._v("将复杂的元素绝对定位或固定定位，使得它脱离文档流，否则回流代价会很高")])]),t._v(" "),a("h2",{attrs:{id:"引擎对-js-的处理过程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#引擎对-js-的处理过程"}},[t._v("#")]),t._v(" 引擎对 JS 的处理过程")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("1.")]),t._v(" 读取代码，进行词法分析（Lexical analysis），然后将代码分解成词元（token）")]),t._v(" "),a("li",[a("code",[t._v("2.")]),t._v(" 对词元进行语法分析（parsing），然后将代码整理成语法树（syntax tree）")]),t._v(" "),a("li",[a("code",[t._v("3.")]),t._v(" 使用翻译器（translator），将代码转为字节码（bytecode）")]),t._v(" "),a("li",[a("code",[t._v("4.")]),t._v(" 使用字节码解释器（bytecode interpreter），将字节码转为机器码")])]),t._v(" "),a("h2",{attrs:{id:"缓存"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#缓存"}},[t._v("#")]),t._v(" 缓存")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://juejin.im/post/5bdeabbbe51d4505466cd741",target:"_blank",rel:"noopener noreferrer"}},[t._v("juejin/浅谈 HTTP 缓存"),a("OutboundLink")],1)]),t._v(" "),a("ul",[a("li",[t._v("强缓存")])]),t._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("Expires: 值是服务器告诉浏览器的缓存过期时间\ncache-control: 值是相对时间内直接使用浏览器缓存\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br")])]),a("ul",[a("li",[t._v("协商缓存")])]),t._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("Last-Modified 和 If-Modified-Since : 文件在服务器上最近的修改时间\nEtag 和 If-None-Match : 只有当文件内容改变时，ETag才改变\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br")])]),a("ul",[a("li",[t._v("缓存的优先级")])]),t._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("Cache-Control > Expires > ETag > Last-Modified\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])])])}),[],!1,null,null,null);e.default=i.exports}}]);