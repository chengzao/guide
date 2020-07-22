---
title: dev-proxy
date: 2020-07-20
sidebar: "auto"
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

- [lightproxy](https://lightproxy.org/zh-CN/doc/getting-started)

- [whistle](https://github.com/avwo/whistle)
