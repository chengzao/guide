# Json Web Token(JWT)

https://juejin.im/post/5b3b870a5188251ac85826b8

一旦 access token 过期，你就可以通过 refresh token 再次请求 access token。

- Token

![](https://raw.githubusercontent.com/chengzao/imgbed/img/img/20190613_Token.png)

注意在第三步通过 code 兑换 access token 的过程中，Google 并不会仅仅返回 access token，
还会返回额外的信息，这其中和之后更新相关的就是 refresh token
一旦 access token 过期，你就可以通过 refresh token 再次请求 access token


- SMAL 2.0

![](https://raw.githubusercontent.com/chengzao/imgbed/img/img/20190613_SMAL2.0.png)

还未登陆的用户打开浏览器访问你的网站（SP，以下都简称 SP），网站提供服务但是并不负责用户认证。

于是 SP 向 IdP 发送了一个 SAML 认证请求，同时  SP 将用户浏览器重定向到 IdP 。

IdP 在验证完来自 SAML 的请求无误之后，在浏览器中呈现登陆表单让用户进行填写用户名和密码进行登陆

一旦用户登陆成功，IdP 会生成一个包含用户信息（用户名或者密码）的 SAML token （SAML token 又称为 SAML
Assertion，本质上是 XML 节点），IdP 向 SP 返回 token,
并且将用户重定向到 SP (token 的返回是在重定向步骤中实现的，下面会详细说明)

SP 对拿到的 token 进行验证，并从中解析出用户信息，例如他们是谁以及他们的权限有哪些。
此时就能够根据这些信息允许用户访问我们网站的内容了

- OAuth 2.0

![](https://raw.githubusercontent.com/chengzao/imgbed/img/img/20190613_OAuth2.0.png)

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

![](https://raw.githubusercontent.com/chengzao/imgbed/img/img/20190613_Refresh_Token.png)

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
data = base64urlEncode( header ) + “.” + base64urlEncode( payload )
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

## redis

- `npm install cookie-parser express-session redis connect-redis --save`

```js
// express 模块
var express = require('express');
// session 模块
var cookieParser = require('cookie-parser');
var session = require('express-session');
// redis 模块
var redis   = require('redis');
var client  = redis.createClient('6379', '127.0.0.1');// 默认监听6379端口,'127.0.0.1'为你本地ip(默认不需要修改)
var RedisStore = require('connect-redis')(session);

// 执行express
var app = express();
// 运行cookieParser 方法
app.use(cookieParser());

// redis 链接错误
client.on("error", function(error) {
    console.log(error);
});


//配置 session
var identityKey = 'skey';
app.use(session({
    name: identityKey,
    secret: 'sessiontest',  // 用来对session id相关的cookie进行签名
    store: new RedisStore(),  // (使用redis的存储session)
    saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
    resave: false,  // 是否每次都重新保存会话，建议false
    cookie: {
        maxAge: 10*60 * 1000  // 有效期，单位是毫秒, 这里设置的是10分钟
    }
}));

// 检测 session是否正常
app.use(function (req, res, next) {
    if (!req.session) {
        return next(new Error('session错误'))
    }else {
        console.log(req.session)//正常打印当前session
    }
    next() // 正常 载入下一个中间件
})
```

- express cors

```js
/**
 *  处理跨域请求，有点重要喔
 *  如果不涉及跨域，请忽略
 **/
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-with, X_Requested_With');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header('X-Powered-By', '3.2.1');
    res.header('Content-Type', 'application/json; charset=utf-8');

    if (req.method === 'OPTIONS') {
        res.end('options ok');
    } else {
        next();
    }
});
```

## express-session API

- session( options )

```bash
1.  cookie：
      # 存储 session ID，
      # 默认值 { path: ‘/‘, httpOnly: true,secure: false, maxAge: null }）
2.  genid：
      # 一个函数，返回一个字符串用来作为新的 session ID，传入 req 可以按需在 req 上添加一些值。
3.  name：
      # 存储 session ID 的 cookie 的名字，默认是'connect.sid'，
      # 但是如果有多个使用 express-session 的 app 运行在同一个服务器主机上，
      # 需要用不同的名字命名  express-session 的 cookie。
4.  proxy ：
      #  当设置了secure cookies（通过”x-forwarded-proto” header ）时信任反向代理。
5.  resave：
      #  强制保存会话，即使会话在请求期间从未被修改过
6.  rolling：
      #  强制在每次响应时，都设置保存会话标识符的cookie。cookie 到期时间会被重置为原始时间 maxAge。
      # 默认值为`false`。
7.  saveUninitialized：
      #  默认 `true`, 强制存储未初始化的 session。
8.  secret ( 必需 ）:
      #  用来对session ID cookie签名，可以提供一个单独的字符串作为 secret，
      # 也可以提供一个字符串数组，此时只有第一个字符串才被用于签名，
      # 但是在 express-session 验证 session ID   的时候会考虑全部字符串。
9.  store:
      #  存储 session 的实例。
10. unset：
      #  控制 req.session 是否取消。默认是 `keep`，如果是  `destroy`,那么 session 就会在响应结束后被终止。
```

- connect-redis

```bash
1. store.all( callback (error, sessions) )
  # 返回一个存储store的数组；
2. store.destroy(sid, callback(error))
  # 用session ID 来销毁 session；
3. store.clear(callback(error))
  # 删除所有 session
4. store.length(callback(error, len))
  # 获取 store 中所有的 session 的数目
5. store.get(sid, callbackcallback(error, session))
  # 根据所给的 ID 获取一个 session
6. store.set(sid, session, callback(error))
  # 设置一个 session。
7. store.touch(sid, session, callback(error))
  #  更新一个 session
```
