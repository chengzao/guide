---
title: Cookie、JWT、Token
date: 2020-07-20
sidebar: "auto"
tags:
  - Cookie
  - jwt
  - token
categories:
  - faq
---

## Cookie、sessionStorage、localStorage

- cookie 大小限制 4k, sessionStorage/localStorage 大小限制在 5MB
- `sessionStorage`和`localStorage`不会自动把数据发给服务器，仅在本地保存
- `sessionStorage`仅在当前浏览器窗口关闭前有效，自然也就不可能持久保持
- `localStorage`始终有效，窗口或浏览器关闭也一直保存，因此用作持久数据；localStorage 在所有同源窗口中都是共享的

## XSS 和 CSRF

- 跨站脚本攻击（Cross Site Scripting)
- 跨站请求伪造（Cross-site request forgery），是伪造请求，冒充用户在站内的正常操作
- 区别：

  - CSRF 是利用网站 A 本身的漏洞，去请求网站 A 的 api；XSS 是向目标网站注入 JS 代码，然后执行 JS 里的代码
  - CSRF 需要用户先登录目标网站获取 cookie，而 XSS 不需要登录
  - CSRF 的目标是用户，XSS 的目标是服务器
  - XSS 是利用合法用户获取其信息，而 CSRF 是伪造成合法用户发起请求

- CSRF 防御措施: [来源](https://zh.wikipedia.org/wiki/%E8%B7%A8%E7%AB%99%E8%AF%B7%E6%B1%82%E4%BC%AA%E9%80%A0)

  - 检查 Referer 字段
  - 添加校验 token

- XSS 防御措施: [来源](https://zh.wikipedia.org/wiki/%E8%B7%A8%E7%B6%B2%E7%AB%99%E6%8C%87%E4%BB%A4%E7%A2%BC)
  - 过滤特殊字符
  - 使用 HTTP 头指定类型,使输出的内容避免被作为 HTML 解析

## Cookie、Session、Token、JWT

- [原文：Cookie、Session、Token、JWT](https://juejin.im/post/5e055d9ef265da33997a42cc)

- 什么是认证（Authentication）: 验证当前用户的身份 (用户名密码登录/邮箱发送登录链接/手机号接收验证码)
- 什么是授权（Authorization）: 用户授予第三方应用访问该用户某些资源的权限 (cookie、session、token、OAuth)
- 什么是凭证（Credentials）: 实现认证和授权的前提是需要一种媒介（证书） 来标记访问者的身份

## Cookie

- HTTP 是无状态的协议
- cookie 存储在客户端
- cookie 不可跨域, 设置 domain 属性，一级域名和二级域名之间是允许共享使用
- 属性

```bash
name=value	键值对，设置 Cookie 的名称及相对应的值，都必须是字符串类型
domain      指定 cookie 所属域名，默认是当前域名
path        指定 cookie 在哪个路径下生效，默认是 '/'
maxAge      cookie 失效的时间，单位秒. 值为0，表示删除，默认为 -1
expires     过期时间，在设置的某个时间点后该 cookie 就会失效
secure      该 cookie 是否仅被使用安全协议传输，默认为false
httpOnly    设置了 httpOnly 属性，则无法通过JS读取到该cookie信息
```

- 注意事项

```plain
不要存储敏感数据
使用 httpOnly 在一定程度上提高安全性
尽量减少 cookie 的体积，能存储的数据量不能超过 4kb
设置正确的 domain 和 path，减少数据传输
cookie 无法跨域, 设置domain属性，一级域名和二级域名之间是允许共享使用
```

## Session

- session 是另一种记录服务器和客户端会话状态的机制
- session 是基于 cookie 实现的，session 存储在服务器端，sessionId 会被存储到客户端的 cookie 中

![session](https://gitee.com/cxyz/imgbed/raw/img/img/20200101224144.png)

- 浏览器禁止 cookie 或不支持 cookie 怎么办？

```plain
一般会把 sessionId 跟在 url 参数后面即重写 url
移动端对 cookie 的支持不是很好，移动端常用的是 token
```

## Cookie 和 Session 的区别

- 安全性： Session 比 Cookie 安全，Session 是存储在服务器端的，Cookie 是存储在客户端的
- 存取值的类型不同：Cookie 只支持存字符串数据，想要设置其他类型的数据，需要将其转换成字符串，Session 可以存任意数据类型
- 有效期不同： Cookie 可设置为长时间保持，Session 一般失效时间较短，客户端关闭（默认情况下）或者 Session 超时都会失效
- 存储大小不同： 单个 Cookie 保存的数据不能超过 4K，Session 可存储数据远高于 Cookie，但是当访问量过多，会占用过多的服务器资源

## Token

### Acesss Token

- 访问资源接口（API）时所需要的资源凭证
- 简单 token 的组成： uid(用户唯一的身份标识)、time(时间戳)、sign（签名）
- 特点: 服务端无状态化、可扩展性好 / 支持移动端设备 / 支持跨程序调用

![Acesss Token](https://gitee.com/cxyz/imgbed/raw/img/img/20200101224829.png)

### Refresh Token

- refresh token 是用于刷新 access token 的 token

![refresh token](https://gitee.com/cxyz/imgbed/raw/img/img/20200101225133.png)

## Token 和 Session 的区别

- Session 是一种记录服务器和客户端会话状态的机制，使服务端有状态化，可以记录会话信息
- Token 是令牌，访问资源接口（API）时所需要的资源凭证; 使服务端无状态化，不会存储会话信息

## JWT

- JSON Web Token（JWT）是跨域认证解决方案,是一种认证授权机制
- [JWT](https://jwt.io/) | [jsonwebtoken](https://www.jsonwebtoken.io/)

![JWT](https://gitee.com/cxyz/imgbed/raw/img/img/20200101230305.png)

- HTTP Request Headers

```bash
Authorization: Bearer <token>
```

- 注意事项

```plain
JWT 不加密的情况下，不能将秘密数据写入 JWT
JWT 优势：服务器不再需要存储 Session，使得服务器认证鉴权业务可以方便扩展
JWT 缺点：由于服务器不需要存储 Session 状态，因此使用过程中无法废弃某个 Token 或者更改 Token 的权限。
    也就是说一旦 JWT 签发了，到期之前就会始终有效，除非服务器部署额外的逻辑
JWT 本身包含了认证信息，一旦泄露，任何人都可以获得该令牌的所有权限
JWT 不应该使用 HTTP 协议明码传输，要使用 HTTPS 协议传输
JWT 适合一次性的命令认证，颁发一个有效期极短的 JWT
```

## Token 和 JWT 的区别

- 相同:
  - 访问资源的令牌
  - 记录用户的信息
  - 使服务端无状态化
  - 只有验证成功后，客户端才能访问服务端上受保护的资源
- 区别
  - Token：服务端验证客户端发送过来的 Token 时，还需要查询数据库获取用户信息，然后验证 Token 是否有效
  - JWT：将 Token 和 Payload 加密后存储于客户端，服务端只需要使用密钥解密进行校验，不需要查询或者减少查询数据库
