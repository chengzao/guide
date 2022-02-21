---
title: web安全防范
date: 2022-01-20
sidebar: "auto"
tags:
  - web安全
categories:
  - frontend
---

> 原文：[常见六大Web安全攻防解析](https://juejin.cn/post/6844903772930441230)

## XSS

XSS (Cross-Site Scripting)，跨站脚本攻击，因为缩写和 CSS 重叠，所以只能叫 XSS。跨站脚本攻击是指通过存在安全漏洞的 Web 网站注册用户的浏览器内运行非法的 HTML 标签或 JavaScript 进行的一种攻击。

跨站脚本攻击有可能造成以下影响:

- 利用虚假输入表单骗取用户个人信息。
- 利用脚本窃取用户的 Cookie 值，被害者在不知情的情况下，帮助攻击者发送恶意请求。
- 显示伪造的文章或图片。

**XSS 的原理是恶意攻击者往 Web 页面里插入恶意可执行网页脚本代码，当用户浏览该页之时，嵌入其中 Web 里面的脚本代码会被执行，从而可以达到攻击者盗取用户信息或其他侵犯用户安全隐私的目的**。

XSS 的攻击方式千变万化，但还是可以大致细分为几种类型。

### 1. 非持久型XSS（反射型XSS）

非持久型 XSS（反射型 XSS ）：一般是通过给别人发送带有恶意脚本代码参数的 URL，当 URL 地址被打开时，特有的恶意代码参数被 HTML 解析、执行。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/1/23/1687b4d45f6b2d74~tplv-t2oaga2asx-watermark.awebp)

- 防御

```bash
1. 即时性，不经过服务器存储，直接通过 HTTP 的 GET 和 POST 请求就能完成一次攻击，拿到用户隐私数据。
2. 攻击者需要诱骗点击,必须要通过用户点击链接才能发起
3. 反馈率低，所以较难发现和响应修复
4. 盗取用户敏感保密信息
```

### 2. 持久型 XSS（存储型 XSS）

持久型 XSS（存储型 XSS）：持久型 XSS 漏洞，一般存在于 Form 表单提交等交互功能，如文章留言，提交文本信息等，黑客利用的 XSS 漏洞，将内容经正常功能提交进入数据库持久保存，当前端页面获得后端从数据库中读出的注入代码时，将其渲染执行

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/1/23/1687b4608eba9124~tplv-t2oaga2asx-watermark.awebp)

举个例子，对于评论功能来说，就得防范持久型 XSS 攻击，因为我可以在评论中输入以下内容

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/1/20/1686b708796e98aa~tplv-t2oaga2asx-watermark.awebp)

- 持久型 XSS 有以下几个特点：

```bash
1.持久性，植入在数据库中
2.盗取用户敏感私密信息
3.危害面广
```

- 如何防御

```bash
1. csp 建立白名单
2. 转义字符
3. HttpOnly Cookie
```

## CSRF 跨站点伪造

原理： 诱导用户打开黑客的网站，在黑客的网站中，利用用户登录状态发起跨站点请求。

- CSRF 攻击的原理：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/1/24/1688030a24702301~tplv-t2oaga2asx-watermark.awebp)

完成 CSRF 攻击必须要有三个条件：

- 用户已经登录了站点 A，并在本地记录了 cookie
- 在用户没有登出站点 A 的情况下（也就是 cookie 生效的情况下），访问了恶意攻击者提供的引诱危险站点 B (B 站点要求访问站点 A)。
- 站点 A 没有做任何 CSRF 防御

我们来看一个例子： 当我们登入转账页面后，突然眼前一亮**惊现 "XXX 隐私照片，不看后悔一辈子" 的链接**，耐不住内心躁动，立马点击了该危险的网站（页面代码如下图所示），但当这页面一加载，便会执行`submitForm`这个方法来提交转账请求，从而将 10 块转给黑客。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/1/24/1688041fb7fbcda3~tplv-t2oaga2asx-watermark.awebp)

- 如何防御

```bash
1. 对 Cookie 设置 SameSite 属性
2. Referer Check: HTTP Referer是header的一部分,对来源进行校验
3. Anti CSRF Token： 生成token， 接口带上nonce和timesTamp
4. 验证码
```

### SameSite

- `Strict` 最为严格，完全禁止第三方 Cookie，只有当前网页 URL 与请求目标 URL 完全一致才会带上Cookie。
- `Lax` 允许部分第三方请求携带 Cookie
- `None` 无论是否跨站都会发送 Cookie

![](https://cdn.jsdelivr.net/gh/chengzao/imgbed@main/images/samesite-20220112.6timy7ewowg0.webp)

## 点击劫持

​原理：用户在登陆 A 网站的系统后，被攻击者诱惑打开第三方网站，而第三方网站通过 iframe 引入了 A 网站的页面内容，用户在第三方网站中点击某个按钮（被装饰的按钮），实际上是点击了 A 网站的按钮。  d

- 特点

  - 隐蔽性较高，骗取用户操作
  - "UI - 覆盖攻击"
  - 利用 iframe 或者其它标签的属性

- 点击劫持的原理

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/1/26/16885dc33080f0b1~tplv-t2oaga2asx-watermark.awebp)

从上图可知，攻击者通过图片作为页面背景，隐藏了用户操作的真实界面，当你按耐不住好奇点击按钮以后，真正的点击的其实是隐藏的那个页面的订阅按钮，然后就会在你不知情的情况下订阅了。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/1/26/16885dca835b64d4~tplv-t2oaga2asx-watermark.awebp)

如何防御

- 1.`X-FRAME-OPTIONS`

```bash
X-FRAME-OPTIONS是一个 HTTP 响应头，在现代浏览器有一个很好的支持。这个 HTTP 响应头 就是为了防御用 iframe 嵌套的点击劫持攻击

该响应头有三个值可选，分别是

	DENY，表示页面不允许通过 iframe 的方式展示
  SAMEORIGIN，表示页面可以在相同域名下通过 iframe 的方式展示
  ALLOW-FROM，表示页面可以在指定来源的 iframe 中展示
```

- 2. js防御：通过 iframe 的方式加载页面时，攻击者的网页直接不显示所有内容

```js
<head>
  <style id="click-jack">
    html {
      display: none !important;
    }
  </style>
</head>
<body>
  <script>
    if (self == top) {
      var style = document.getElementById('click-jack')
      document.body.removeChild(style)
    } else {
      top.location = self.location
    }
  </script>
</body>

```

## URL 跳转漏洞

- 定义：借助未验证的 URL 跳转，将应用程序引导到不安全的第三方区域，从而导致的安全问题。
- URL 跳转漏洞原理

黑客利用 URL 跳转漏洞来诱导安全意识低的用户点击，导致用户信息泄露或者资金的流失。其原理是黑客构建恶意链接 (链接需要进行伪装, 尽可能迷惑), 发在 QQ 群或者是浏览量多的贴吧 / 论坛中。 安全意识低的用户点击后, 经过服务器或者浏览器解析后，跳到恶意的网站中。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/1/27/1688e946b82fbd84~tplv-t2oaga2asx-watermark.awebp)

恶意链接需要进行伪装, 经常的做法是熟悉的链接后面加上一个恶意的网址，这样才迷惑用户。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/1/27/1688e93de9fc96a7~tplv-t2oaga2asx-watermark.awebp)

诸如伪装成像如下的网址，你是否能够识别出来是恶意网址呢？

```
http://gate.baidu.com/index?act=go&url=http://t.cn/RVTatrd
http://qt.qq.com/safecheck.html?flag=1&url=http://t.cn/RVTatrd
http://tieba.baidu.com/f/user/passport?jumpUrl=http://t.cn/RVTatrd
复制代码
```

如何防御

- referer的限制：如果确定传递URL参数进入的来源，我们可以通过该方式实现安全限制，保证该URL的有效性，避免恶意用户自己生成跳转链接
- 加入有效性验证Token

## SQL 注入

SQL 注入是一种常见的 Web 安全漏洞，攻击者利用这个漏洞，可以访问或修改数据，或者利用潜在的数据库漏洞进行攻击。

- SQL 注入的原理

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/1/27/1688ef052bea3c5f~tplv-t2oaga2asx-watermark.awebp)

一次 SQL 注入的过程包括以下几个过程：

- 获取用户请求参数
- 拼接到代码当中
- SQL 语句按照我们构造参数的语义执行成功

**SQL 注入的必备条件： 1. 可以控制输入的数据 2. 服务器要执行的代码拼接了控制的数据**。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/1/27/1688ee787da295af~tplv-t2oaga2asx-watermark.awebp)

我们会发现 SQL 注入流程中与正常请求服务器类似，只是黑客控制了数据，构造了 SQL 查询，而正常的请求不会 SQL 查询这一步，

**SQL 注入的本质: 数据和代码未分离，即数据当做了代码来执行。**

如何防御

- **严格限制Web应用的数据库的操作权限**，给此用户提供仅仅能够满足其工作的最低权限，从而最大限度的减少注入攻击对数据库的危害
- **后端代码检查输入的数据是否符合预期**，严格限制变量的类型，例如使用正则表达式进行一些匹配处理。
- **对进入数据库的特殊字符（'，"，\，<，>，&，*，; 等）进行转义处理，或编码转换**。基本上所有的后端语言都有对字符串进行转义处理的方法，比如 lodash 的 lodash._escapehtmlchar 库。
- **所有的查询语句建议使用数据库提供的参数化查询接口**，参数化的语句使用参数而不是将用户输入变量嵌入到 SQL 语句中，即不要直接拼接 SQL 语句。例如 Node.js 中的 mysqljs 库的 query 方法中的 ? 占位参数。


## OS命令注入攻击

OS命令注入是针对操作系统

- 原理

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/1/27/1688f285cb8da6c7~tplv-t2oaga2asx-watermark.awebp)

```js
// 以 Node.js 为例，假如在接口中需要从 github 下载用户指定的 repo
const exec = require('mz/child_process').exec;
let params = {/* 用户输入的参数 */};
exec(`git clone ${params.repo} /some/path`);
```

如果 `params.repo` 传入的是 `https://github.com/admin/admin.github.io.git` 确实能从指定的 git repo 上下载到想要的代码。 但是如果 `params.repo` 传入的是 `https://github.com/xx/xx.git && rm -rf /* &&` 恰好你的服务是用 root 权限起的就糟糕了。

如何防御

- 后端对前端提交内容进行规则限制（比如正则表达式）。
- 在调用系统命令前对所有传入参数进行命令行参数转义过滤。
- 不要直接拼接命令语句，借助一些工具做拼接、转义预处理，例如 Node.js 的 shell-escape 包

## 参考资料

- [常见 Web 安全攻防总结](https://zoumiaojiang.com/article/common-web-security/)
- [常见六大 Web 安全攻防解析](https://juejin.cn/post/6844903772930441230G)
