# nodejs

## CMD

- `window常用DOS命令`

```bash
(1)cd..                         cd..       退到次一级目录
   cd\                          cd\        退到根目录下的意思
   cd 文件夹名字                cd windows 进入WINDOWS目录
(2)md 文件夹名字     md win     建立名为win的文件夹
(3)rd 文件夹名字     rd win     删除名为win的文件夹
(4)copy 路径下文件 目标路径     拷贝文件
(5)del 目标路径下文件           删除文件
(6)dir 文件夹名字或盘符         dir c:\windows  查看C盘windows里目录文件

dir/W：宽屏显示，一排显示5个文件名，而不会显示修改时间，文件大小等信息；
dir/S：显示当前目录及其子目录下所有的文件
dir/a 查看所有文件包括隐藏文件
dir/p 分页查看

(7)format 盘符   格式化硬盘
(8)ren 文件名 文件名  改名   ren 1.bat 2.bat
(9)type 文件名  查看文件内容（一般用来看bat或txt文件）
(10)cls  清屏
```

- `常用网络DOS命令`

```bash
(1)fport                         查看系统端口和端口上运行的程序
(2)netstat -an                    查看所有连接本机IP
(3)ipconfig /all                  查看所有连接本机IP
(4)telnet IP 端口                 连接对方机器某个端口
(5)net user                       查看本机用户
    net user 用户名 密码 /add      建立一个用户
    net user 用户名 /del          删除一个用户
(6)net localgroup administrators 用户名 /add   把用户添加到管理员
   net localgroup administrators 用户名 /del   把用户从管理员组删除
```

- 查找所有运行的端口`netstat -ano`
- 查看被占用的端口对应的PID `netstat -ano | findstr "8081"`
- 查看指定PID进程 `tasklist | findstr "9088"`
- 结束进程 `taskkill /T /F /PID 9088` `强制(/F)杀死pid为9088的所有进程包括子进程(/T)`

## guide

- `Node.js是一个在浏览器之外可以解析和执行JavaScript代码的运行时环境`

```bash
a) Node.js基于哪个JavaScript引擎？
   Chrome 的 V8引擎
b) 谁创建了Node.js？
   Ryan Dahl
c) Node.js的特性是什么？
   事件驱动、非阻塞IO模型
```

- `https://github.com/nodejs/node`
- `https://nodejs.org/en/`
- 调试：`console.log()`
- 启动调试：`node debug foo.js`
- `node-inspector调试`
- `vscode调试`
- `time 和 timeEnd 测试程序执行时间`

## nvm

- `Node version Manager  这是一个Node.js的版本管理工具`
- [creationix@nvm](https://github.com/creationix/nvm)
- [coreybutler@nvm-windows](https://github.com/coreybutler/nvm-windows)
- 安装一个指定版本 `nvm install node_version`
- 使用一个指定版本 `nvm use node_version`
- 指定默认版本 `nvm alias default node_version`
- 卸载一个已安装的指定版本 `nvm uninstall version`
- 查看npm全局安装包 `npm list -g --depth=0`
- `nvm（Node.js version manage）`

## nrm

- 全局安装 `npm install nrm -g`
- 查看mirror源 `nrm ls`
- 使用mirror源 `nrm use mirror_name`
- 添加源 `nrm add mirror_name http://npm-registry.example.me`

## `package介绍`

- [package.json介绍](https://yarnpkg.com/zh-Hans/docs/package-json)

```bash
package.json   包描述文件，说明文件
bin 		   存放可执行二进制文件的目录
lib			   存放JavaScript代码的目录
doc            存放文档的目录
test		   存放单元测试用例的代码

# package.json:
name		包的名称
description	包的简介
version		包的版本号
keywords	关键词数组，用于在npm中分类搜索
author		包的作者
main 		配置包的入口，默认是模块根目录下的index.js
dependencies 包的依赖项，npm会通过该属性自动加载依赖包
scripts		指定了运行脚本命令的npmm命令行缩写，例如start

# dependencies的package版本
~ 会匹配最近的小版本依赖包，比如~1.2.3会匹配所有1.2.x版本，但是不包括1.3.0
^ 会匹配最新的大版本依赖包，比如^1.2.3会匹配所有1.x.x的包，包括1.3.0，但是不包括2.0.0
```

## npm

- [npm淘宝国内镜像](http://npm.taobao.org/)
- [npm scripts 使用指南](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)
- [mac上管理不同node版本](http://blog.csdn.net/zly9923218/article/details/53420065)

- `npm config`

```bash
npm config set prefix "C:\dev\nvm\npm"
npm config set python python2.7
npm config set registry " https://registry.npm.taobao.org "
npm install phantomjs-prebuilt@2.1.14 --save-dev  --ignore-scripts
```

- `npm publish`

```bash
npm login / npm adduser  # 登录npm账号

npm publish --access=public # 发布一个公开的package

https://shields.io/#/  # 徽章

https://www.npmjs.com/

https://packagephobia.now.sh/

https://unpkg.com/#/ # 在线查看package包
```

- `npm help`

```bash
npm init [-y] 			 	# 初始化一个package.json文件
npm install package			# 安装一个包
npm install –save package		# 将安装的包添加到package.json的依赖中（dependencies）
npm install –g package			# 安装一个全局命令行工具
npm docs package				# 查看包的文档
npm root -g					# 查看全局包安装路径
npm config set prefix path_url # 修改全局包安装路径
npm list					# 查看当前目录下安装的所有包
npm list -g					# 查看全局包的安装路径下所有的包
npm uninstall package			# 卸载当前目录下某个包
npm uninstall –g package		# 卸载全局安装路径下的某个包
npm update package				# 更新当前目录下某个包
npm update –g package			# 更新某个全局工具包
npm update					# 更新当前目录下安装的所有包
npm update –g				# 更新全局所有的工具包
npm install package –f/—force # 强制重新安装
npm install package@versin		# 安装指定版本
npm help 					# 查看命令列表
npm –l 						# 查看各个命令的简单用法

------------------------------------------------------
** 注意：package.json的 name 不要与npm install的包名一致 **
```

## yarn

- [yarn](https://yarnpkg.com)
- [yarn bootcss](https://yarn.bootcss.com/docs/usage.html)
- `use`

```bash
# 初始化包：
yarn init

# 新增一个依赖包：
yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]

yarn add [package] # 添加到 dependencies
yarn add [package] --dev/-D # 添加到 devDependencies
yarn add [package] --exact/-E # 安装包的精确版本(例如：1.2.1)
yarn add [package] --tilde/-T # 安装包的次要版本里的最新版(例如：1.2.x)

# 升级包：
yarn upgrade [package]
yarn upgrade [package]@[version]
yarn upgrade [package]@[tag]

# 操作系统上全局安装包
yarn global <add/bin/list/remove/upgrade> [package]

# 从当前包里移除包：
yarn remove [package]

# 安装所有依赖：
yarn 或 yarn install

# 安装一个包的单一版本：
yarn install --flat

# 强制重新下载所有包：
yarn install --force

# 只安装生产环境依赖：
yarn install --production
```

## cpm

- [CPM](https://cevio.github.io/cpm/guide/#%E4%BE%9D%E8%B5%96)
- [CPM - 轻量的NPM私有源程序搭建](https://juejin.im/post/5bf62141e51d4509cc6c9b0f)

## 常见许可证

### 宽松式

- BSD 2-Clause Licence `分发软件时，必须保留原始的许可证声明`
- BSD 3-Clause Licence `分发软件时，必须保留原始的许可证声明。不得使用原始作者的名字为软件促销`
- MIT `分发软件时，必须保留原始的许可证声明，与 BSD（二条款版）基本一致`
- Apache 2 `分发软件时，必须保留原始的许可证声明。凡是修改过的文件，必须向用户说明该文件修改过；没有修改过的文件，必须保持许可证不变`

### Copyleft

- Affero GPL (AGPL): `如果云服务（即 SAAS）用到的代码是该许可证，那么云服务的代码也必须开源`
- GPL: `如果项目包含了 GPL 许可证的代码，那么整个项目都必须使用 GPL 许可证`
- LGPL: `如果项目采用动态链接调用该许可证的库，项目可以不用开源`
- Mozilla（MPL）: `只要该许可证的代码在单独的文件中，新增的其他文件可以不用开源`

## 常用包

```bash
crypto-js
child_process  shelljs  spawn-shell
commitizen husky lint-staged prettier eslint commitlint
npm-run-all
better-scripts
quicklink

rirmaf
cross-env dotenv yargs commander
colors chalk
Path-to-RegExp
fs-extra memory-fs
cors http-proxy-middleware
serve

babel
@babel/polyfill
```

## url

- [nodejs api cn](http://nodejs.cn/)
- [koa api cn](http://koa.bootcss.com/#context)
- [express](http://www.expressjs.com.cn/)
- [nodejs tur](http://javascript.ruanyifeng.com/nodejs/basic.html)
- [2018 年了，你还是只会 npm install 吗？](https://juejin.im/post/5ab3f77df265da2392364341)
- [.gitattributes](https://www.jianshu.com/p/ec9564fe1c2b)
- [npm config](http://javascript.ruanyifeng.com/nodejs/npm.html)
- [npm script](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)
- [开源许可证](http://www.ruanyifeng.com/blog/2017/10/open-source-license-tutorial.html)
