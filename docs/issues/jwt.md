# Json Web Token(JWT)

[全面了解Token,JWT,OAuth,SAML,SSO](https://juejin.im/post/5b3b870a5188251ac85826b8)

- Token

![Token](https://gitee.com/cxyz/imgbed/raw/img/img/20190613_Token.png)

通过 code 兑换 access token 的过程中，Google 并不会仅仅返回 access token，
还会返回额外的信息，这其中和之后更新相关的就是 refresh token
一旦 access token 过期，你就可以通过 refresh token 再次请求 access token

- SMAL 2.0

![SMAL2.0](https://gitee.com/cxyz/imgbed/raw/img/img/20190613_SMAL2.0.png)

还未登陆的用户打开浏览器访问你的网站（SP，以下都简称 SP），网站提供服务但是并不负责用户认证。

于是 SP 向 IdP 发送了一个 SAML 认证请求，同时  SP 将用户浏览器重定向到 IdP 。

IdP 在验证完来自 SAML 的请求无误之后，在浏览器中呈现登陆表单让用户进行填写用户名和密码进行登陆

一旦用户登陆成功，IdP 会生成一个包含用户信息（用户名或者密码）的 SAML token （SAML token 又称为 SAML
Assertion，本质上是 XML 节点），IdP 向 SP 返回 token,
并且将用户重定向到 SP (token 的返回是在重定向步骤中实现的，下面会详细说明)

SP 对拿到的 token 进行验证，并从中解析出用户信息，例如他们是谁以及他们的权限有哪些。
此时就能够根据这些信息允许用户访问我们网站的内容了

- OAuth 2.0

![OAuth 2.0](https://gitee.com/cxyz/imgbed/raw/img/img/20190613_OAuth2.0.png)

用户通过客户端（可以是浏览器也可以是手机应用）想要访问 SP 上的资源，
但是 SP 告诉用户需要进行认证，将用户重定向至 IdP

IdP 向用户询问 SP 是否可以访问用户信息，如果用户同意，IdP 向客户端返回 access code

客户端拿 code 向 IdP 换 access token，并拿着 access token 向 SP 请求资源

SP 接受到请求之后拿着附带 token 向 IdP 验证用户的身份

## Authentication VS Authorisation

- 单点登录`SSO (Single sign-on)`
- Authentication: 身份鉴别，以下简称认证
- Authorisation: 授权
- IdP: `Authorization Server/Identity Provider`
- SP: `Service Provider`或 `Resource Server`

## OAuth VS OpenId

- OpenID 只用于身份认证（Authentication）

允许你以同一个账户在多个网站登陆。它仅仅是为你的合法身份背书，当你以 Facebook 账号登陆某个站点之后，
该站点无权访问你的在 Facebook 上的数据

- OAuth 用于授权（Authorisation）

允许被授权方访问授权方的用户数据

## refresh token

- refresh token 负责身份认证
- access token 负责请求资源

![Refresh_Token](https://gitee.com/cxyz/imgbed/raw/img/img/20190613_Refresh_Token.png)

## JWT

[JWT](https://jwt.io/) 顾名思义，它是 JSON 结构的 token，由三部分组成：

### header

- 用于描述元信息，例如产生 signature 的算法

```bash
# alg关键字就指定了使用哪一种哈希算法来创建 signature

{
  "typ": "JWT",
  "alg": "HS256"
}
```

### payload

- 用于携带你希望向服务端传递的信息

```json
{
  "userId": "b08f86af-35da-48f2-8fab-cef3904660bd"
}
```

### signature

- 签名
- 创建签名要分以下几个步骤：

  - 你需要从接口服务端拿到密钥，假设为secret
  - 将header进行 base64 编码，假设结果为headerStr
  - 将payload进行 base64 编码，假设结果为payloadStr
  - 将headerStr和payloadStr用.字符串拼装起来成为字符data
  - 以data和secret作为参数，使用哈希算法计算出签名

```js
// signature algorithm
data = base64urlEncode( header ) + '.' + base64urlEncode( payload )
signature = Hash( data, secret );

// Header
{
  "typ": "JWT",
  "alg": "HS256"
}
// Payload:
{
  "userId": "b08f86af-35da-48f2-8fab-cef3904660bd"
}
```
