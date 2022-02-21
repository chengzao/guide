(window.webpackJsonp=window.webpackJsonp||[]).push([[107],{645:function(s,e,a){"use strict";a.r(e);var t=a(1),n=Object(t.a)({},(function(){var s=this,e=s.$createElement,a=s._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h2",{attrs:{id:"cookie、sessionstorage、localstorage"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cookie、sessionstorage、localstorage"}},[s._v("#")]),s._v(" Cookie、sessionStorage、localStorage")]),s._v(" "),a("ul",[a("li",[s._v("cookie 大小限制 4k, sessionStorage/localStorage 大小限制在 5MB")]),s._v(" "),a("li",[a("code",[s._v("sessionStorage")]),s._v("和"),a("code",[s._v("localStorage")]),s._v("不会自动把数据发给服务器，仅在本地保存")]),s._v(" "),a("li",[a("code",[s._v("sessionStorage")]),s._v("仅在当前浏览器窗口关闭前有效，自然也就不可能持久保持")]),s._v(" "),a("li",[a("code",[s._v("localStorage")]),s._v("始终有效，窗口或浏览器关闭也一直保存，因此用作持久数据；localStorage 在所有同源窗口中都是共享的")])]),s._v(" "),a("h2",{attrs:{id:"xss-和-csrf"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#xss-和-csrf"}},[s._v("#")]),s._v(" XSS 和 CSRF")]),s._v(" "),a("ul",[a("li",[a("p",[s._v("跨站脚本攻击（Cross Site Scripting)")])]),s._v(" "),a("li",[a("p",[s._v("跨站请求伪造（Cross-site request forgery），是伪造请求，冒充用户在站内的正常操作")])]),s._v(" "),a("li",[a("p",[s._v("区别：")]),s._v(" "),a("ul",[a("li",[s._v("CSRF 是利用网站 A 本身的漏洞，去请求网站 A 的 api；XSS 是向目标网站注入 JS 代码，然后执行 JS 里的代码")]),s._v(" "),a("li",[s._v("CSRF 需要用户先登录目标网站获取 cookie，而 XSS 不需要登录")]),s._v(" "),a("li",[s._v("CSRF 的目标是用户，XSS 的目标是服务器")]),s._v(" "),a("li",[s._v("XSS 是利用合法用户获取其信息，而 CSRF 是伪造成合法用户发起请求")])])]),s._v(" "),a("li",[a("p",[s._v("CSRF 防御措施: "),a("a",{attrs:{href:"https://zh.wikipedia.org/wiki/%E8%B7%A8%E7%AB%99%E8%AF%B7%E6%B1%82%E4%BC%AA%E9%80%A0",target:"_blank",rel:"noopener noreferrer"}},[s._v("来源"),a("OutboundLink")],1)]),s._v(" "),a("ul",[a("li",[s._v("检查 Referer 字段")]),s._v(" "),a("li",[s._v("添加校验 token")])])]),s._v(" "),a("li",[a("p",[s._v("XSS 防御措施: "),a("a",{attrs:{href:"https://zh.wikipedia.org/wiki/%E8%B7%A8%E7%B6%B2%E7%AB%99%E6%8C%87%E4%BB%A4%E7%A2%BC",target:"_blank",rel:"noopener noreferrer"}},[s._v("来源"),a("OutboundLink")],1)]),s._v(" "),a("ul",[a("li",[s._v("过滤特殊字符")]),s._v(" "),a("li",[s._v("使用 HTTP 头指定类型,使输出的内容避免被作为 HTML 解析")])])])]),s._v(" "),a("h2",{attrs:{id:"cookie、session、token、jwt"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cookie、session、token、jwt"}},[s._v("#")]),s._v(" Cookie、Session、Token、JWT")]),s._v(" "),a("ul",[a("li",[a("p",[a("a",{attrs:{href:"https://juejin.im/post/5e055d9ef265da33997a42cc",target:"_blank",rel:"noopener noreferrer"}},[s._v("原文：Cookie、Session、Token、JWT"),a("OutboundLink")],1)])]),s._v(" "),a("li",[a("p",[s._v("什么是认证（Authentication）: 验证当前用户的身份 (用户名密码登录/邮箱发送登录链接/手机号接收验证码)")])]),s._v(" "),a("li",[a("p",[s._v("什么是授权（Authorization）: 用户授予第三方应用访问该用户某些资源的权限 (cookie、session、token、OAuth)")])]),s._v(" "),a("li",[a("p",[s._v("什么是凭证（Credentials）: 实现认证和授权的前提是需要一种媒介（证书） 来标记访问者的身份")])])]),s._v(" "),a("h2",{attrs:{id:"cookie"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cookie"}},[s._v("#")]),s._v(" Cookie")]),s._v(" "),a("ul",[a("li",[s._v("HTTP 是无状态的协议")]),s._v(" "),a("li",[s._v("cookie 存储在客户端")]),s._v(" "),a("li",[s._v("cookie 不可跨域, 设置 domain 属性，一级域名和二级域名之间是允许共享使用")]),s._v(" "),a("li",[s._v("属性")])]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("name")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("value\t键值对，设置 Cookie 的名称及相对应的值，都必须是字符串类型\ndomain      指定 cookie 所属域名，默认是当前域名\npath        指定 cookie 在哪个路径下生效，默认是 "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'/'")]),s._v("\nmaxAge      cookie 失效的时间，单位秒. 值为0，表示删除，默认为 -1\nexpires     过期时间，在设置的某个时间点后该 cookie 就会失效\nsecure      该 cookie 是否仅被使用安全协议传输，默认为false\nhttpOnly    设置了 httpOnly 属性，则无法通过JS读取到该cookie信息\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br")])]),a("ul",[a("li",[s._v("注意事项")])]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[s._v("不要存储敏感数据\n使用 httpOnly 在一定程度上提高安全性\n尽量减少 cookie 的体积，能存储的数据量不能超过 4kb\n设置正确的 domain 和 path，减少数据传输\ncookie 无法跨域, 设置domain属性，一级域名和二级域名之间是允许共享使用\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("h2",{attrs:{id:"session"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#session"}},[s._v("#")]),s._v(" Session")]),s._v(" "),a("ul",[a("li",[s._v("session 是另一种记录服务器和客户端会话状态的机制")]),s._v(" "),a("li",[s._v("session 是基于 cookie 实现的，session 存储在服务器端，sessionId 会被存储到客户端的 cookie 中")])]),s._v(" "),a("p",[a("img",{staticClass:"lazy",attrs:{alt:"20200101224144","data-src":"https://cdn.jsdelivr.net/gh/chengzao/imgbed@main/images/20200101224144.png",loading:"lazy"}})]),s._v(" "),a("ul",[a("li",[s._v("浏览器禁止 cookie 或不支持 cookie 怎么办？")])]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[s._v("一般会把 sessionId 跟在 url 参数后面即重写 url\n移动端对 cookie 的支持不是很好，移动端常用的是 token\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("h2",{attrs:{id:"cookie-和-session-的区别"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cookie-和-session-的区别"}},[s._v("#")]),s._v(" Cookie 和 Session 的区别")]),s._v(" "),a("ul",[a("li",[s._v("安全性： Session 比 Cookie 安全，Session 是存储在服务器端的，Cookie 是存储在客户端的")]),s._v(" "),a("li",[s._v("存取值的类型不同：Cookie 只支持存字符串数据，想要设置其他类型的数据，需要将其转换成字符串，Session 可以存任意数据类型")]),s._v(" "),a("li",[s._v("有效期不同： Cookie 可设置为长时间保持，Session 一般失效时间较短，客户端关闭（默认情况下）或者 Session 超时都会失效")]),s._v(" "),a("li",[s._v("存储大小不同： 单个 Cookie 保存的数据不能超过 4K，Session 可存储数据远高于 Cookie，但是当访问量过多，会占用过多的服务器资源")])]),s._v(" "),a("h2",{attrs:{id:"token"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#token"}},[s._v("#")]),s._v(" Token")]),s._v(" "),a("h3",{attrs:{id:"acesss-token"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#acesss-token"}},[s._v("#")]),s._v(" Acesss Token")]),s._v(" "),a("ul",[a("li",[s._v("访问资源接口（API）时所需要的资源凭证")]),s._v(" "),a("li",[s._v("简单 token 的组成： uid(用户唯一的身份标识)、time(时间戳)、sign（签名）")]),s._v(" "),a("li",[s._v("特点: 服务端无状态化、可扩展性好 / 支持移动端设备 / 支持跨程序调用")])]),s._v(" "),a("p",[a("img",{staticClass:"lazy",attrs:{alt:"20200101224829","data-src":"https://cdn.jsdelivr.net/gh/chengzao/imgbed@main/images/20200101224829.png",loading:"lazy"}})]),s._v(" "),a("h3",{attrs:{id:"refresh-token"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#refresh-token"}},[s._v("#")]),s._v(" Refresh Token")]),s._v(" "),a("ul",[a("li",[s._v("refresh token 是用于刷新 access token 的 token")])]),s._v(" "),a("p",[a("img",{staticClass:"lazy",attrs:{alt:"20200101225133","data-src":"https://cdn.jsdelivr.net/gh/chengzao/imgbed@main/images/20200101225133.png",loading:"lazy"}})]),s._v(" "),a("h2",{attrs:{id:"token-和-session-的区别"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#token-和-session-的区别"}},[s._v("#")]),s._v(" Token 和 Session 的区别")]),s._v(" "),a("ul",[a("li",[s._v("Session 是一种记录服务器和客户端会话状态的机制，使服务端有状态化，可以记录会话信息")]),s._v(" "),a("li",[s._v("Token 是令牌，访问资源接口（API）时所需要的资源凭证; 使服务端无状态化，不会存储会话信息")])]),s._v(" "),a("h2",{attrs:{id:"jwt"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#jwt"}},[s._v("#")]),s._v(" JWT")]),s._v(" "),a("ul",[a("li",[s._v("JSON Web Token（JWT）是跨域认证解决方案,是一种认证授权机制")]),s._v(" "),a("li",[a("a",{attrs:{href:"https://jwt.io/",target:"_blank",rel:"noopener noreferrer"}},[s._v("JWT"),a("OutboundLink")],1),s._v(" | "),a("a",{attrs:{href:"https://www.jsonwebtoken.io/",target:"_blank",rel:"noopener noreferrer"}},[s._v("jsonwebtoken"),a("OutboundLink")],1)])]),s._v(" "),a("p",[a("img",{staticClass:"lazy",attrs:{alt:"20200101230305","data-src":"https://cdn.jsdelivr.net/gh/chengzao/imgbed@main/images/20200101230305.png",loading:"lazy"}})]),s._v(" "),a("ul",[a("li",[s._v("HTTP Request Headers")])]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("Authorization: Bearer "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("token"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("ul",[a("li",[s._v("注意事项")])]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[s._v("JWT 不加密的情况下，不能将秘密数据写入 JWT\nJWT 优势：服务器不再需要存储 Session，使得服务器认证鉴权业务可以方便扩展\nJWT 缺点：由于服务器不需要存储 Session 状态，因此使用过程中无法废弃某个 Token 或者更改 Token 的权限。\n    也就是说一旦 JWT 签发了，到期之前就会始终有效，除非服务器部署额外的逻辑\nJWT 本身包含了认证信息，一旦泄露，任何人都可以获得该令牌的所有权限\nJWT 不应该使用 HTTP 协议明码传输，要使用 HTTPS 协议传输\nJWT 适合一次性的命令认证，颁发一个有效期极短的 JWT\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br")])]),a("h2",{attrs:{id:"token-和-jwt-的区别"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#token-和-jwt-的区别"}},[s._v("#")]),s._v(" Token 和 JWT 的区别")]),s._v(" "),a("ul",[a("li",[s._v("相同:\n"),a("ul",[a("li",[s._v("访问资源的令牌")]),s._v(" "),a("li",[s._v("记录用户的信息")]),s._v(" "),a("li",[s._v("使服务端无状态化")]),s._v(" "),a("li",[s._v("只有验证成功后，客户端才能访问服务端上受保护的资源")])])]),s._v(" "),a("li",[s._v("区别\n"),a("ul",[a("li",[s._v("Token：服务端验证客户端发送过来的 Token 时，还需要查询数据库获取用户信息，然后验证 Token 是否有效")]),s._v(" "),a("li",[s._v("JWT：将 Token 和 Payload 加密后存储于客户端，服务端只需要使用密钥解密进行校验，不需要查询或者减少查询数据库")])])])])])}),[],!1,null,null,null);e.default=n.exports}}]);