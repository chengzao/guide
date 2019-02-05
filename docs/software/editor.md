# 编辑器介绍

## vscode

- sync gist `f10963fee0a9957d6b8c709157e70b8a`

- pulgin

  <details>
  <summary>view code</summary>

  ```bash
  # html css
  - HTML CSS Support
  - HTML Snippets
  - Mithril Emmet
  - HTMLHint
  - stylelint
  - Autoprefixer  // css3兼容
  - csscomb  // css书写顺序
  - language-stylus
  - sass
  - px to rem

  # js
  - JavaScript (ES6) code snippets
  - Import Cost  // js import插件包

  # npm
  - npm
  - npm Intellisense

  # 补全
  - Path Autocomplete
  - Path Intellisense
  - Auto Close Tag
  - Auto Rename Tag

  # 类型检测
  - ESLint
  - tslint
  - EditorConfig for Visual Studio Code // 格式化插件

  # vue
  - Vetur
  - Vue 2 Snippets

  # react
  - Reactjs code snippets
  - VS Code ES7 React/Redux/React-Native/JS snippets

  # markdown
  - markdownlint
  - Markdown-TOC

  # git
  - Git History
  - gitlens

  # 其他
  - Bracket Pair Colorizer // 括号颜色
  - Settings Sync // 配置同步
  - Material Icon Theme // 图标
  - Material Theme // 皮肤
  - One Dark Pro // 皮肤
  - Terminal // 命令行
  - Prettier // 格式化
  - Polacode  // 截图
  - minapp // 微信小程序
  - Live Server  // 服务
  - open in Browser // 浏览器打开插件
  - Chinese (Simplifiled) // 汉化包
  - filesize // 显示文件大小
  - bookmarks // 标记书签
  - Codelf // 命名插件
  - dash // dash搜索插件
  - Error Gutters // 错误图标提醒
  - rest client // api请求
  - TODO Highlight // TODO颜色高亮
  ```

  </details>

### vue config

<details>
<summary>view code</summary>

```json
{
  //.vue文件template格式化支持，并使用prettyhtml插件
  "vetur.format.defaultFormatter.html": "prettyhtml",
  //prettyhtml格式化配置，属性强制换行
  "vetur.format.defaultFormatterOptions": {
    "prettyhtml": {
      "printWidth": 100, // No line exceeds 100 characters
      "singleQuote": false // Prefer double quotes over single quotes
    }
  },
  //根据文件后缀名定义vue文件类型
  "files.associations": {
    "*.vue": "vue"
  },
  //配置 ESLint 检查的文件类型
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    {
      "language": "vue",
      "autoFix": true
    }
  ],
  //保存时eslint自动修复错误
  "eslint.autoFixOnSave": true,
  //保存自动格式化
  "editor.formatOnSave": true,
  //开启 eslint 支持
  "prettier.eslintIntegration": true,
  //使用单引号
  "prettier.singleQuote": true,
  //结尾不加分号
  "prettier.semi": false
}
```

</details>

### user config

<details>
<summary>view code</summary>

```json
{
    "workbench.iconTheme": "material-icon-theme",
    "terminal.integrated.shell.windows": "C:\\WINDOWS\\System32\\cmd.exe",
    "liveServer.settings.donotShowInfoMsg": true,
    "javascript.implicitProjectConfig.experimentalDecorators": true,
    "workbench.colorTheme": "One Dark Pro",
    "sync.gist": "f10963fee0a9957d6b8c709157e70b8a",
    "sync.quietSync": false,
    "sync.askGistName": false,
    "sync.removeExtensions": true,
    "sync.syncExtensions": true,
    "sync.autoDownload": false,
    "sync.autoUpload": false,
    "sync.forceDownload": false,
    "files.associations": {
        "*.js": "javascript",
        "*.cjson": "jsonc",
        "*.wxss": "css",
        "*.wxs": "javascript",
        "*.vue": "vue"
    },
    "javascript.updateImportsOnFileMove.enabled": "always",
    "emmet.triggerExpansionOnTab": true,
    "emmet.includeLanguages": {
        "javascript": "javascriptreact",
        "wxml": "html"
    },
    "files.autoSave": "off",
    "editor.tabSize": 2,
    "editor.mouseWheelZoom": true,
    "editor.formatOnPaste": true,
    "editor.formatOnSave": true,
    "autoprefixer.formatOnSave": true,
    "csscomb.formatOnSave": true,
    "javascript.format.insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces": true,
    "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
    "eslint.validate": [
        "javascript",
        "javascriptreact"
    ],
    "editor.fontFamily": "Fira Code",
    "editor.fontLigatures": true,
    "html.format.extraLiners": "",
    "minapp-vscode.disableAutoConfig": true,
    "prettier.requireConfig": true,
    "prettier.semi": false,
    "prettier.singleQuote": true,
    "prettier.eslintIntegration": true
}
```

</details>

## atom

- sync gist `aec52c655ed4abf64bcfd95f473afe88`

- plugins

```bash
- atom-prettify
- prettier-atom
- atom-ternjs
- autocomplete
- autocomplete-js-import
- autocomplete-modules
- autocomplete-paths
- busy-signal
- docblockr
- editorconfig
- emmet
- eslint-format
- file-icons
- highlight-selected
- html-tag-auto-complete
- intentions
- language-babel
- language-javascript-jsx
- language-vue
- react-sinppets
- linter
- linter-ui-default
- livereload
- markdown-preview-plus
- minimap
- open-in-browsers
- platformio-ide-terminal
- sync-settings
- bookmarks
```
