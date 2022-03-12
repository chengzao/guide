---
title: node.js的记录
date: 2020-07-21
sidebar: "auto"
tags:
  - node.js
categories:
  - frontend
---

## nodejs

- `Node.js是一个在浏览器之外可以解析和执行JavaScript代码的运行时环境`

```bash
a) Node.js基于哪个JavaScript引擎？
   Chrome 的 V8引擎
b) 谁创建了Node.js？
   Ryan Dahl
c) Node.js的特性是什么？
   事件驱动、非阻塞IO模型
```

## Node Package Manager

- pnpm : https://pnpm.io/zh/
- yarn : https://yarnpkg.com/
- npm: https://docs.npmjs.com/
- npm.io: https://npm.io/
- leran: https://github.com/lerna/lerna

## nvm

- `Node version Manager 这是一个Node.js的版本管理工具`
- [creationix@nvm](https://github.com/creationix/nvm)
- [coreybutler@nvm-windows](https://github.com/coreybutler/nvm-windows)
- 安装一个指定版本 `nvm install node_version`
- 使用一个指定版本 `nvm use node_version`
- 指定默认版本 `nvm alias default node_version`
- 卸载一个已安装的指定版本 `nvm uninstall version`
- 查看 npm 全局安装包 `npm list -g --depth=0`
- `nvm（Node.js version manage）`

### mac中nvm自动切换node版本

> zsh安装：https://ohmyz.sh/ ;
> nvm安装：https://github.com/nvm-sh/nvm

- step1: 进入项目根目录：运行 `node -v > .nvmrc`

- step2: 编辑`.zshrc`最后加入(前提是安装zsh)

```sh
# place this after nvm initialization!
autoload -U add-zsh-hook
load-nvmrc() {
  local node_version="$(nvm version)"
  local nvmrc_path="$(nvm_find_nvmrc)"
​
  if [ -n "$nvmrc_path" ]; then
    local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")
​
    if [ "$nvmrc_node_version" = "N/A" ]; then
      nvm install
    elif [ "$nvmrc_node_version" != "$node_version" ]; then
      nvm use
    fi
  elif [ "$node_version" != "$(nvm version default)" ]; then
    echo "Reverting to nvm default version"
    nvm use default
  fi
}
add-zsh-hook chpwd load-nvmrc
load-nvmrc
```

- step3: 命令行运行

```sh
source ~/.zshrc  # 不报错即可
```

## nrm

- 全局安装 `npm install nrm -g`
- 查看 mirror 源 `nrm ls`
- 使用 mirror 源 `nrm use mirror_name`
- 添加源 `nrm add mirror_name http://npm-registry.example.me`

## npm

- [npmjs](https://www.npmjs.com/)
- [npm 淘宝国内镜像](http://npm.taobao.org/)
- [mac 上管理不同 node 版本](http://blog.csdn.net/zly9923218/article/details/53420065)
- [shields.io 徽章](https://shields.io/#/)
- [packagephobia](https://packagephobia.now.sh/)

- config

```bash
npm config set prefix "C:\dev\nvm\npm"
npm config set python python2.7
npm config set registry " https://registry.npm.taobao.org "
npm install phantomjs-prebuilt@2.1.14 --save-dev  --ignore-scripts
```

- publish

```bash
npm login / npm adduser  # 登录npm账号
npm publish --access=public # 发布一个公开的package
```

## yarn

- [yarn](https://yarnpkg.com)
- [yarn bootcss](https://yarn.bootcss.com/docs/usage.html)

## 私有的 npm 仓库

- cnpmjs.org
- verdaccio


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

## express

- express cors

```js
/**
 *  处理跨域请求，有点重要喔
 *  如果不涉及跨域，请忽略
 **/
app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-with, X_Requested_With"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  res.header("X-Powered-By", "3.2.1");
  res.header("Content-Type", "application/json; charset=utf-8");

  if (req.method === "OPTIONS") {
    res.end("options ok");
  } else {
    next();
  }
});
```

## Set Nodejs Process Env

- mac： `export VUE_APP_USE_MOCK=true`
- window: `set VUE_APP_USE_MOCK=true`

## nodejs requre.resolve

> https://juejin.cn/post/7020607552190677000

- 获取 package 的绝对路径

```js
new ModuleFederationPlugin({
  name: 'app1'
  exposes: {
    './react': require.resolve('react'),
    './react-dom': require.resolve('react-dom'),
  },
})
```

- enhanced-resolve

```js
import { CachedInputFileSystem, ResolverFactory } from 'enhanced-resolve';
import * as fs from 'fs';

const myResolver = ResolverFactory.createResolver({
  fileSystem: new CachedInputFileSystem(fs, 4000),
  conditionNames: ['node'],
  extensions: ['.js', '.json', '.node'],
  useSyncFileSystemCalls: true,
  mainFields: ['esm', 'module', 'main'],
});

// 获取 antd 包入口路径，优先 esm，兜底 cjs
myResolver.resolveSync({}, process.cwd(), "antd")
```

## npm package

- shelljs https://github.com/shelljs/shelljs
- rimraf https://github.com/isaacs/rimraf
- nodemon  https://github.com/remy/nodemon
- chokidar https://github.com/paulmillr/chokidar
- zx https://github.com/google/zx
- cross-env https://github.com/kentcdodds/cross-env
- wait-on https://github.com/jeffbski/wait-on
- concurrently https://github.com/open-cli-tools/concurrently
- npm run all https://www.npmjs.com/package/npm-run-all
- rollup esbuild swc webpack parcel vite microbundle
- api-extractor https://www.npmjs.com/package/@microsoft/api-extractor
- rrweb https://github.com/rrweb-io/rrweb
- web-vitals https://github.com/GoogleChrome/web-vitals
- path-to-regexp https://github.com/pillarjs/path-to-regexp
- localforage https://github.com/localForage/localForage
- file-type https://github.com/sindresorhus/file-type
- uppy https://github.com/transloadit/uppy
- async-validator https://github.com/yiminghe/async-validator
- ncc https://github.com/vercel/ncc


## ORM : Object Relational Mapping

- sqlite3: https://github.com/sqlite/sqlite
- bookshelf: https://github.com/bookshelf/bookshelf
- sequelize: https://github.com/sequelize/sequelize
- prisma: https://github.com/prisma/prisma

## version版本号说明

- Alpha：第一个测试版本，还不稳定
- Beta：特性稳定了，但还有bug
- RC(Release Candidate)：除非有重大bug，否则这就是会成为正式版的Beta
- Release：正式发布版本

## 管理package版本

### 发布说明

- 1.使用[standard-version](https://github.com/conventional-changelog/standard-version)控制发布版本

```json
// package.json
"scripts": {
  "publish:release": "standard-version",
  "publish:minor": "standard-version --release-as minor",
  "publish:major": "standard-version --release-as major",
  "publish:beta": "standard-version --prerelease beta"
}
```

- 2.推送`tag`与`commit`到远程仓库

```bash
git push --follow-tags origin master
```

- 3.npm发布包

```bash
# 使用nvm切换源
https://npm.xesv5.com/

# 登录
npm login

# 发布对应的版本: https://docs.npmjs.com/cli/v8/commands/npm-publish
npm publish [--tag <beta|latest|...>]
```

### 本地调试

- 方式一：<推荐> 使用 `yalc`: https://github.com/wclr/yalc

- 方式二：`npm link`

## npm version

- npm version[https://docs.npmjs.com/cli/v8/configuring-npm/package-json#dependencies]
- [使用 npm 的语义版本控制](http://nodejs.cn/learn/semantic-versioning-using-npm)
- [node-semver](https://github.com/npm/node-semver#tilde-ranges-123-12-1)


## 相关链接

- [开源许可证](http://www.ruanyifeng.com/blog/2017/10/open-source-license-tutorial.html)
- [Sequelize mysql](https://demopark.github.io/sequelize-docs-Zh-CN/)
