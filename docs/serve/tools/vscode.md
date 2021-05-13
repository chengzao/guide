---
title: vscode
date: 2020-07-20
sidebar: "auto"
tags:
  - editor
categories:
  - tools
---

- [vscode-generator-code](https://github.com/Microsoft/vscode-generator-code)

## plugins

```bash
- Bookmarks
- Bracket Pair Colorizer
- Debugger for Chrome
- EditorConfig for VS Code
- Error Gutters
- ESLint
- TSLint
- filesize
- Add jsdoc comments

- open in browser
- browser preview
- PicGo

- Live Server
- Material Theme
- Material Icon Theme
- One Dark Pro

- WakaTime
- Terminal

- Docker
- Settings Sync

- Git History
- GitLens — Git supercharged



- Auto Close Tag
- Auto Rename Tag
- Mithril Emmet
- HTML CSS Support
- HTML Snippets
- HTMLHint

- Import Cost
- markdownlint

- Path Autocomplete
- Path Intellisense

- Prettier - Code formatter
- stylelint

- TODO Highlight

- Autoprefixer
- CSScomb
- language-stylus
- Sass

- REST Client

- Angular 1 JavaScript and TypeScript Snippets

- Vetur
- Vue 2 Snippets

- JavaScript (ES6) code snippets
- ES7 React/Redux/GraphQL/React-Native snippets
- Reactjs code snippets

- minapp

- npm
- npm Intellisense

- any-rule
- code spell checker
```

## vscode setting

- vscode-user-setting.json

```json
...
{
  "workbench.iconTheme": "material-icon-theme",
  "terminal.integrated.shell.osx": "/bin/zsh",
  "workbench.settings.useSplitJSON": true,
  "editor.tabSize": 4,
  "files.associations": {
    "*.js": "javascript",
    "*.cjson": "jsonc",
    "*.wxss": "css",
    "*.wxs": "javascript",
    "*.vue": "vue",
    "*.tpl": "html"
  },
  "emmet.triggerExpansionOnTab": true,
  "emmet.includeLanguages": {
    "javascript": "javascriptreact",
    "wxml": "html"
  },
  "eslint.enable": true,
  "eslint.validate": [
    "vue",
    "vue-html",
    "javascript",
    "typescript",
    "javascriptreact",
    "typescriptreact"
  ],
  "editor.formatOnPaste": true,
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.codeActionsOnSave.mode": "all",
  "html.format.extraLiners": "",
  "javascript.updateImportsOnFileMove.enabled": "always",
  "javascript.format.insertSpaceBeforeFunctionParenthesis": false,
  "javascript.format.insertSpaceAfterFunctionKeywordForAnonymousFunctions": false,
  "[html]": {
    "editor.defaultFormatter": "vscode.html-language-features"
  }
  // "[javascript]": {
  //   "editor.defaultFormatter": "vscode.typescript-language-features"
  // },
}
```


## vscode vue

- `vscode-user-setting-vue.json`

```json
{
  "eslint.enable": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    {
      "language": "html",
      "autoFix": true
    },
    {
      "language": "vue",
      "autoFix": true
    },
    "typescript",
    "typescriptreact"
  ],
  "files.associations": {
    "*.vue": "vue"
  },

  "eslint.autoFixOnSave": true,
  // prettier
  "prettier.singleQuote": true,
  "prettier.semi": false,
  "prettier.requireConfig": true,

  // editor
  "editor.formatOnPaste": true,
  "editor.formatOnSave": false,

  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

- workspace config vue

```json
{
  "editor.formatOnPaste": true,
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.enable": true,
  "eslint.validate": ["javascript", "javascriptreact", "vue-html", "vue"],
  "files.autoSave": "off",
  "eslint.codeActionsOnSave.mode": "all",
  //"vetur.format.defaultFormatter.js": "vscode-typescript",
  // "vetur.format.defaultFormatter.html": "prettier",
  // "vetur.format.defaultFormatter.js": "prettier-eslint",
  "javascript.format.insertSpaceBeforeFunctionParenthesis": false,
  "javascript.format.insertSpaceAfterFunctionKeywordForAnonymousFunctions": false
}
```

## vscode config

```json
"workbench.activityBar.visible": false // 隐藏控制工作台中的活动栏

"breadcrumbs.enabled": true,  // 启用导航路径
"workbench.settings.useSplitJSON": true  // 打开默认设置配置JSON

// 自定义tab栏样式
"workbench.colorCustomizations": {
  "[One Dark Pro]": {
    // "tab.activeBackground": "#504141",
    "tab.activeBorder": "#ff0000"
  },
},
"window.titleBarStyle": "custom"
```

