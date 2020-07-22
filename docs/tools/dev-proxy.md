---
title: dev-proxy
date: 2020-07-22
tags:
  - proxy
categories:
  - tools
---

- fiddler: `http://www.telerik.com/fiddler`
- fiddler/add-ons: `http://www.telerik.com/fiddler/add-ons`

- fiddler 显示 server 的 ip

```bash
- 首先 我们打开 `fiddler`
- 点击 `Rules` -> `Customize Rules`
- 然后会出现一个 `CustomRules.js` 文本,
- `ctrl + f` 搜索 “`static function Main()`”
- 将以下代码 替换掉原来的 `function`

  static function Main() {
      var today: Date = new Date();
      FiddlerObject.StatusText = " CustomRules.js was loaded at: " + today;
      // Uncomment to add a "Server" column containing the response "Server" header, if present
      FiddlerObject.UI.lvSessions.AddBoundColumn("Server IP", 120, "X-HostIP");
  }
```

- fiddler 使用 mac

```bash
mac fiddler :
mono --arch=32  Downloads/fiddler-mac/Fiddler.exe
```

- charlesproxy

  - [Web 调试工具 Charles 使用心得](https://juejin.im/post/5a3b6ab06fb9a0452405fffa)

```bash
https://www.charlesproxy.com/download/
```

- ngrok

```bash
ngrok.cc
ngrok.com
```

- [lightproxy: 代理开发接口](https://lightproxy.org/zh-CN/doc/getting-started)

- [whistle: 代理开发接口](https://github.com/avwo/whistle)

- proxy dev terminal

```bash
https://gist.github.com/moenn/2db47589724cf6c06ad9316ac57e2144

https://gist.github.com/laispace/666dd7b27e9116faece6

https://github.com/haad/proxychains

# git config proxy
git config --global http.proxy 'socks5://127.0.0.1:1080'

git config --global https.proxy 'socks5://127.0.0.1:1080'

git config --global http.https://github.com.proxy socks5://127.0.0.1:1086

git config --global --unset http.proxy

git config --global --unset https.proxy

# socks5
export http_proxy="socks5://127.0.0.1:1080"

export https_proxy="socks5://127.0.0.1:1080"

# http/https
export http_proxy="http://127.0.0.1:1080"

export https_proxy="http://127.0.0.1:1080"

# proxychains
apt-get install proxychains
vim /etc/proxychains.conf
```
