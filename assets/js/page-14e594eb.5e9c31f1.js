(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{655:function(s,t,e){"use strict";e.r(t);var a=e(4),n=Object(a.a)({},(function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h3",{attrs:{id:"基本流程"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#基本流程"}},[s._v("#")]),s._v(" 基本流程")]),s._v(" "),e("ul",[e("li",[e("p",[s._v("对于简单请求，浏览器直接发出 CORS 请求。具体来说，就是在头信息之中，增加一个 Origin 字段")]),s._v(" "),e("p",[s._v("Origin: "),e("code",[s._v("http://api.bob.com")])]),s._v(" "),e("p",[s._v("Origin 字段用来说明，本次请求来自哪个源（协议 + 域名 + 端口）。服务器根据这个值，决定是否同意这次请求")]),s._v(" "),e("p",[s._v("如果 Origin 指定的源，不在许可范围内，服务器会返回一个正常的 HTTP 回应。浏览器发现，这个回应的头信息没有包含"),e("code",[s._v("Access-Control-Allow-Origin")]),s._v("字段，就知道出错了，从而抛出一个错误，被 XMLHttpRequest 的 onerror 回调函数捕获。注意，这种错误无法通过状态码识别，因为 HTTP 回应的状态码有可能是 200")])]),s._v(" "),e("li",[e("p",[s._v("如果 Origin 指定的域名在许可范围内，服务器返回的响应，会多出几个头信息字段")])])]),s._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[s._v("Access-Control-Allow-Origin: http://api.bob.com\nAccess-Control-Allow-Credentials: "),e("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),s._v("\nAccess-Control-Expose-Headers: FooBar\nContent-Type: text/html"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("charset")]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("utf-8\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br")])]),e("p",[s._v("上面的头信息之中，有三个与 CORS 请求相关的字段，都以 Access-Control-开头")]),s._v(" "),e("ul",[e("li",[e("p",[e("code",[s._v("Access-Control-Allow-Origin")])]),s._v(" "),e("ul",[e("li",[s._v("该字段是必须的。它的值要么是请求时 Origin 字段的值，要么是一个*，表示接受任意域名的请求")])])]),s._v(" "),e("li",[e("p",[e("code",[s._v("Access-Control-Allow-Credentials")])]),s._v(" "),e("ul",[e("li",[s._v("该字段可选。它的值是一个布尔值，表示是否允许发送 Cookie。默认情况下，Cookie 不包括在 CORS 请求之中。设为 true，即表示服务器明确许可，Cookie 可以包含在请求中，一起发给服务器。这个值也只能设为 true，如果服务器不要浏览器发送 Cookie，删除该字段即可")])])]),s._v(" "),e("li",[e("p",[e("code",[s._v("Access-Control-Expose-Headers")])]),s._v(" "),e("ul",[e("li",[s._v("该字段可选。CORS 请求时，"),e("code",[s._v("XMLHttpRequest")]),s._v("对象的"),e("code",[s._v("getResponseHeader()")]),s._v("方法只能拿到 6 个基本字段："),e("code",[s._v("Cache-Control")]),s._v("、"),e("code",[s._v("Content-Language")]),s._v("、"),e("code",[s._v("Content-Type")]),s._v("、"),e("code",[s._v("Expire")]),s._v("s、"),e("code",[s._v("Last-Modified")]),s._v("、"),e("code",[s._v("Pragma")]),s._v("。如果想拿到其他字段，就必须在"),e("code",[s._v("Access-Control-Expose-Headers")]),s._v("里面指定")])])])]),s._v(" "),e("h3",{attrs:{id:"withcredentials-属性"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#withcredentials-属性"}},[s._v("#")]),s._v(" withCredentials 属性")]),s._v(" "),e("ul",[e("li",[e("p",[s._v("CORS 请求默认不发送 Cookie 和 HTTP 认证信息。如果要把 Cookie 发到服务器，一方面要服务器同意，指定"),e("code",[s._v("Access-Control-Allow-Credentials")]),s._v("字段")]),s._v(" "),e("p",[e("code",[s._v("Access-Control-Allow-Credentials: true")])])]),s._v(" "),e("li",[e("p",[s._v("另一方面，开发者必须在 AJAX 请求中打开"),e("code",[s._v("withCredentials")]),s._v("属性")])])]),s._v(" "),e("div",{staticClass:"language-js line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" xhr "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("XMLHttpRequest")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nxhr"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("withCredentials "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br")])]),e("ul",[e("li",[e("p",[s._v("否则，即使服务器同意发送 Cookie，浏览器也不会发送。或者，服务器要求设置 Cookie，浏览器也不会处理")])]),s._v(" "),e("li",[e("p",[s._v("需要注意的是，如果要发送 Cookie，"),e("code",[s._v("Access-Control-Allow-Origin")]),s._v("就不能设为星号，必须指定明确的、与请求网页一致的域名")])]),s._v(" "),e("li",[e("p",[s._v("同时，Cookie 依然遵循同源政策，只有用服务器域名设置的 Cookie 才会上传，其他域名的 Cookie 并不会上传，且（跨源）原网页代码中的 document.cookie 也无法读取服务器域名下的 Cookie")])])]),s._v(" "),e("h2",{attrs:{id:"非简单请求"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#非简单请求"}},[s._v("#")]),s._v(" 非简单请求")]),s._v(" "),e("h3",{attrs:{id:"预检请求"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#预检请求"}},[s._v("#")]),s._v(" 预检请求")]),s._v(" "),e("div",{staticClass:"language-js line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" url "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"http://api.alice.com/cors"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" xhr "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("XMLHttpRequest")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nxhr"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("open")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"PUT"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" url"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nxhr"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("setRequestHeader")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"X-Custom-Header"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"value"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nxhr"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("send")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br")])]),e("p",[s._v("上面代码中，HTTP 请求的方法是 PUT，并且发送一个自定义头信息"),e("code",[s._v("X-Custom-Header")]),s._v("。")]),s._v(" "),e("p",[s._v('浏览器发现，这是一个非简单请求，就自动发出一个"预检"请求，要求服务器确认可以这样请求。下面是这个"预检"请求的 HTTP 头信息')]),s._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[s._v("OPTIONS /cors HTTP/1.1\nOrigin: http://api.bob.com\nAccess-Control-Request-Method: PUT\nAccess-Control-Request-Headers: X-Custom-Header\nHost: api.alice.com\nAccept-Language: en-US\nConnection: keep-alive\nUser-Agent: Mozilla/5.0"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v(".\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br")])]),e("p",[s._v('"预检"请求用的请求方法是 OPTIONS，表示这个请求是用来询问的。头信息里面，关键字段是 Origin，表示请求来自哪个源')]),s._v(" "),e("ul",[e("li",[e("p",[s._v("非简单请求是那种对服务器有特殊要求的请求，比如请求方法是 PUT 或 DELETE，或者"),e("code",[s._v("Content-Type")]),s._v("字段的类型是"),e("code",[s._v("application/json")])])]),s._v(" "),e("li",[e("p",[s._v('非简单请求的 CORS 请求，会在正式通信之前，增加一次 HTTP 查询请求，称为"预检"请求')])]),s._v(" "),e("li",[e("p",[s._v("浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些 HTTP 动词和头信息字段。只有得到肯定答复，浏览器才会发出正式的"),e("code",[s._v("XMLHttpRequest")]),s._v("请求，否则就报错")])]),s._v(" "),e("li",[e("p",[s._v('除了 Origin 字段，"预检"请求的头信息包括两个特殊字段')]),s._v(" "),e("ul",[e("li",[e("p",[e("code",[s._v("Access-Control-Request-Method")])]),s._v(" "),e("ul",[e("li",[s._v("该字段是必须的，用来列出浏览器的 CORS 请求会用到哪些 HTTP 方法")])])]),s._v(" "),e("li",[e("p",[e("code",[s._v("Access-Control-Request-Headers")])]),s._v(" "),e("ul",[e("li",[s._v("该字段是一个逗号分隔的字符串，指定浏览器 CORS 请求会额外发送的头信息字段")])])])])])]),s._v(" "),e("h3",{attrs:{id:"预检请求的回应"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#预检请求的回应"}},[s._v("#")]),s._v(" 预检请求的回应")]),s._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[s._v("HTTP/1.1 "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("200")]),s._v(" OK\nDate: Mon, 01 Dec "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("2008")]),s._v(" 01:15:39 GMT\nServer: Apache/2.0.61 "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("Unix"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\nAccess-Control-Allow-Origin: http://api.bob.com\nAccess-Control-Allow-Methods: GET, POST, PUT\nAccess-Control-Allow-Headers: X-Custom-Header\nContent-Type: text/html"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("charset")]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("utf-8\nContent-Encoding: "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("gzip")]),s._v("\nContent-Length: "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("\nKeep-Alive: "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("timeout")]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v(", "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("max")]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("100")]),s._v("\nConnection: Keep-Alive\nContent-Type: text/plain\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br"),e("span",{staticClass:"line-number"},[s._v("12")]),e("br")])]),e("p",[s._v("上面的 HTTP 回应中，关键的是"),e("code",[s._v("Access-Control-Allow-Origin")]),s._v("字段，表示"),e("code",[s._v("http://api.bob.com")]),s._v("可以请求数据。该字段也可以设为星号，表示同意任意跨源请求")]),s._v(" "),e("ul",[e("li",[e("p",[s._v('服务器收到"预检"请求以后，检查了'),e("code",[s._v("Origin")]),s._v("、"),e("code",[s._v("Access-Control-Request-Method")]),s._v("和"),e("code",[s._v("Access-Control-Request-Headers")]),s._v("字段以后，确认允许跨源请求，就可以做出回应")])]),s._v(" "),e("li",[e("p",[s._v('果浏览器否定了"预检"请求，会返回一个正常的 HTTP 回应，但是没有任何 CORS 相关的头信息字段')])]),s._v(" "),e("li",[e("p",[s._v("这时，浏览器就会认定，服务器不同意预检请求，因此触发一个错误，被"),e("code",[s._v("XMLHttpRequest")]),s._v("对象的"),e("code",[s._v("onerror")]),s._v("回调函数捕获, 控制台会打印出如下的报错信息。")])])]),s._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[s._v("\tXMLHttpRequest cannot load http://api.alice.com.\n\tOrigin http://api.bob.com is not allowed by Access-Control-Allow-Origin.\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br")])]),e("ul",[e("li",[e("p",[s._v("服务器回应的其他 CORS 相关字段")]),s._v(" "),e("ul",[e("li",[e("p",[e("code",[s._v("Access-Control-Allow-Methods")])]),s._v(" "),e("ul",[e("li",[s._v('该字段必需，它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。注意，返回的是所有支持的方法，而不单是浏览器请求的那个方法。这是为了避免多次"预检"请求')])])]),s._v(" "),e("li",[e("p",[e("code",[s._v("Access-Control-Allow-Headers")])]),s._v(" "),e("ul",[e("li",[s._v("如果浏览器请求包括"),e("code",[s._v("Access-Control-Request-Headers")]),s._v("字段，则"),e("code",[s._v("Access-Control-Allow-Headers")]),s._v('字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在"预检"中请求的字段')])])]),s._v(" "),e("li",[e("p",[e("code",[s._v("Access-Control-Allow-Credentials")])]),s._v(" "),e("ul",[e("li",[s._v("该字段与简单请求时的含义相同")])])]),s._v(" "),e("li",[e("p",[e("code",[s._v("Access-Control-Max-Age")])]),s._v(" "),e("ul",[e("li",[s._v("该字段可选，用来指定本次预检请求的有效期，单位为秒。上面结果中，有效期是 20 天（1728000 秒），即允许缓存该条回应 1728000 秒（即 20 天），在此期间，不用发出另一条预检请求")])])])])])]),s._v(" "),e("h3",{attrs:{id:"浏览器的正常请求和回应"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#浏览器的正常请求和回应"}},[s._v("#")]),s._v(" 浏览器的正常请求和回应")]),s._v(" "),e("ul",[e("li",[s._v('一旦服务器通过了"预检"请求，以后每次浏览器正常的 CORS 请求，就都跟简单请求一样，会有一个 Origin 头信息字段。服务器的回应，也都会有一个'),e("code",[s._v("Access-Control-Allow-Origin")]),s._v("头信息字段")])])])}),[],!1,null,null,null);t.default=n.exports}}]);