---
title: 使用eslint和prettier代码校验
date: 2020-07-20
sidebar: "auto"
tags:
  - eslint
  - vue
categories:
  - frontend
---

## eslint

- [eslint 中文网](http://eslint.cn/docs/user-guide/configuring)
- [Eslint 从入门到放弃](https://www.jianshu.com/p/22e6197e5cff)
- [ESLint 里的规则教会我，无规矩 不编程](https://juejin.im/post/5afede99f265da0b82630af8)
- [【AST 篇】教你如何编写 Eslint 插件](https://juejin.im/post/5d91be23f265da5ba532a07e)

- install `npm install -g eslint`

- 查看帮助 `eslint -h`

- 初始化 `eslint --init`

- 运行 eslint

```bash
eslint [options] [file|dir|glob]*
  # file : eslint file1.js file2.js
  # dir :  eslint lib/**
  # glob : eslint "lib/**"
```

- 修复会保存到文件系统中 `eslnt *.js --fix`

- 修复不会保存到文件系统中 `eslint *.js --fix-dry-run`

- 文件后缀 `eslint . --ext .js and .js2`

- 配置文件 `eslint -c ~/my-eslint.json file.js`

- 禁用`.eslintrc.*`和`package.json`文件中的配置 `eslint --no-eslintrc file.js`

### rules

- 开启规则和发生错误时报告的等级

- 规则的错误等级有三种：`0 1 2 | off warn error`

- `"off" 或 0` 关闭规则

- `"warn" 或 1` 开启规则，使用警告级别的错误：warn (不会导致程序退出)

- `"error" 或 2` 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)

### 代码注释

```bash
# 例：忽略 no-undef 检查 在js文件中写入如下
/* eslint-disable no-undef */

# 例：设置 ===检查 在js文件中写入如下
/* eslint eqeqeq: off */
/* eslint eqeqeq: 0 */

# 例：用注释指定全局变量 在js文件中写入如下
/* global var 1, var2 */
/* globael var1:false, var2:false */

# 行内禁用
console.log // eslint-disable-line

# 代码块禁用
/* eslint-disable */
export function func(a,b) {
  return a+b
}
/* eslint-enable */
```

### eslintignore

- `.eslintignore`文件来避免检测处理
- .eslintignore

```bash
.vscode
.git
node_modules
```

- `webpack.config.js`

```js
const path = require('path')
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.join(__dirname, 'src')],
        options: {
            fix: true
        }
      }
    ]
}
```

## prettier

- [prettier/prettier](https://github.com/prettier/prettier)
- [prettier.io/playground](https://prettier.io/playground)

- 安装

```bash
npm i -D prettier
npm i -D eslint-plugin-prettier
npm i -D eslint-config-prettier
```

- `.eslintrc.js`

```js
module.exports = {
  root: true,
  extends: ["standard", "prettier"],
  env: {
    es6: true,
    browser: true,
    node: true
  },
  plugins: ["prettier"],
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    },
    parser: "babel-eslint"
  },
  rules: {
    "prettier/prettier": "error"
  }
};
```

- `webpack.config.js`

```js
const path = require('path')
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
    	loader: 'eslint-loader',
    	enforce: 'pre',
    	include: [path.join(__dirname, 'src')],
    	options: {
          fix: true
    	}
      }
    ]
}
```

- `prettier.config.js`

```js
module.exports = {
  trailingComma: "all",
  tabWidth: 2,
  semi: false,
  bracketSpacing: true,
  singleQuote: true,
  jsxBracketSameLine: true,
  useTabs: true
};
```

- 配置说明

```js
module.exports = {
  printWidth: 80, // 一行的字符数，如果超过会进行换行，默认为80
  tabWidth: 2, // 一个tab代表几个空格数，默认为80
  useTabs: false, // 是否使用tab进行缩进，默认为false，表示用空格进行缩减
  singleQuote: false, // 字符串是否使用单引号，默认为false，使用双引号
  semi: true, // 行位是否使用分号，默认为true
  trailingComma: "none", // 是否使用尾逗号，有三个可选值"<none|es5|all>"
  bracketSpacing: true, // 对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
  parser: "babylon", // 代码的解析引擎，默认为babylon，与babel相同。
  jsxBracketSameLinte: "false", // 在多行JSX元素最后一行的末尾添加 > 而使 > 单独一行
  alwaysParens: "always" // 为单行箭头函数的参数添加圆括号, 默认值"avoid"; 可选值"< avoid | always >", 示例： (x) => x
};
```

- `.prettierignore`

```bash
package-lock.json
.next
node_modules/
dist
build
```

## editorconfig

- [editorconfig](https://editorconfig.org/)
- vscode 配合插件[EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)一起使用
- `.editorconfig`文件配置

```bash
# 最顶层的配置文件
root = true
# 指定作用文件格式
[*]
# 缩进的类型 [space | tab]
indent_style = tab
# 缩进的大小
indent_size = 2
# 定义换行符 [lf | cr | crlf]
end_of_line = lf
# 编码格式
charset = utf-8
# 是否除去换行行首的任意空白字符
trim_trailing_whitespace = true
# 文件是否以一个空白行结尾 [true | false]
insert_final_newline = true

# Matches the exact files
[{.*rc,*.yml,*.md,package.json,lerna.json,*.svg}]
indent_style = space

[*.md]
trim_trailing_whitespace = false
```

- 通配符模式

|    通配符    | Are                                                           |
| :----------: | :------------------------------------------------------------ |
|      \*      | 匹配任意数量 string 类型的字符，' / ' 除外                    |
|     \*\*     | 匹配任意数量 string 类型的字符                                |
|      ？      | 匹配任意单个字符                                              |
|    [a-z]     | 匹配方括号规定范围内的任意单个字符                            |
|    [!a-z]    | 匹配不在方括号规定范围内的任意单个字符                        |
|  {s1,s2,s3}  | 匹配任意一个大括号内部美剧的字符(','分隔)                     |
| {num1..num2} | 匹配 num1 和 num2 之间的任意一个整数，num1 和 num2 正负都可以 |

- example

```bash
root = true

[*]
indent_style = tab
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.{json,yml}]
indent_size = 2

[*.md]
trim_trailing_whitespace = false
```
