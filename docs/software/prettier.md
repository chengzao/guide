# prettier

- [prettier/prettier](https://github.com/prettier/prettier)

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
	extends: ['standard', 'prettier'],
	env: {
		es6: true,
		browser: true,
		node: true,
	},
	plugins: ['prettier'],
	parserOptions: {
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
    parser: 'babel-eslint'
	},
	rules: {
		'prettier/prettier': 'error',
	},
}
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
	trailingComma: 'all',
	tabWidth: 2,
	semi: false,
	bracketSpacing: true,
	singleQuote: true,
	jsxBracketSameLine: true,
	useTabs: true,
}
```

- 配置说明

```js
module.exports = {
  "printWidth": 80, // 一行的字符数，如果超过会进行换行，默认为80
  "tabWidth": 2, // 一个tab代表几个空格数，默认为80
  "useTabs": false, // 是否使用tab进行缩进，默认为false，表示用空格进行缩减
  "singleQuote": false, // 字符串是否使用单引号，默认为false，使用双引号
  "semi": true, // 行位是否使用分号，默认为true
  "trailingComma": "none", // 是否使用尾逗号，有三个可选值"<none|es5|all>"
  "bracketSpacing": true, // 对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
  "parser": "babylon", // 代码的解析引擎，默认为babylon，与babel相同。
  "jsxBracketSameLinte": "false", // 在多行JSX元素最后一行的末尾添加 > 而使 > 单独一行
  "alwaysParens": "always", // 为单行箭头函数的参数添加圆括号, 默认值"avoid"; 可选值"< avoid | always >", 示例： (x) => x
}
```

- `.prettierignore`

```bash
package-lock.json
.next
node_modules/
dist
build
```
