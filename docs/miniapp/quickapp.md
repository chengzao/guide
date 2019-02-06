# 快应用

- [快应用官方文档](https://doc.quickapp.cn/tutorial/getting-started/hello-world.html)
- [awesome-quickapp](https://github.com/hjl19911127/awesome-quickapp)
- [支持快应用的http网络库-flyio](https://segmentfault.com/a/1190000013984402)
- [浏览器跨域方法与基于Fetch的Web请求最佳实践](https://segmentfault.com/a/1190000006095018)
- [fetch-jsonp](https://github.com/camsong/fetch-jsonp)

## start

```bash
Url  ： https://doc.quickapp.cn/tutorial/
Node ：  > 6.0
Install : npm install -g hap-toolkit   --> hap -V 版本号

Create:  hap init <ProjectName>  --> 如hap init demo

进入初始化的文件夹目录中使用npm install安装依赖关系
注意：如果开发者在后续操作中遇到报错Cannot find module '.../node_modules/hap-tools/webpack.config.js'，
请运行一次hap update --force（执行完毕后不需要按照提示再次运行npm install）

编译 ： npm run build  --> 生成 build 、dist 文件夹
build：临时产出，包含编译后的页面js，图片等
dist：最终产出，包含rpk文件

自动编译项目: npm run watch

启动HTTP服务器 :  npm run server
自定义端口：npm run server -- --port 8080

调试器： https://www.quickapp.cn/docCenter/post/69
```

## 基本结构

```bash
// 源地址：https://doc.quickapp.cn/
hap init 初始化后的文件目录:

├── sign                      rpk包签名模块
│   └── debug                 调试环境
│       ├── certificate.pem   证书文件
│       └── private.pem       私钥文件
├── src
│   ├── Common                公用的资源和组件文件
│   │   └── logo.png          应用图标
│   ├── Demo                  页面目录
│   |   └── index.ux          页面文件，可自定义页面名称
│   ├── app.ux                APP文件，可引入公共脚本，暴露公共数据和方法等
│   └── manifest.json         项目配置文件，配置应用图标、页面路由等
└── package.json              定义项目需要的各种模块及配置信息

目录的简要说明如下：
• src：项目源文件夹
sign：签名模块，当前仅有debug签名，如果内测上线，请添加release文件夹，增加线上签名
```
