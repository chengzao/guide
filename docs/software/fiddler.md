# fiddler

- fiddler: `http://www.telerik.com/fiddler`
- fiddler/add-ons: `http://www.telerik.com/fiddler/add-ons`

- fiddler显示server的ip

<CodeBlock>

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

</CodeBlock>

- fiddler使用 mac

```bash
mac fiddler :
mono --arch=32  Downloads/fiddler-mac/Fiddler.exe
```

- charlesproxy

```bash
https://www.charlesproxy.com/download/
```

- ngrok

```bash
ngrok.cc
ngrok.com
```
