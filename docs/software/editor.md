# 编辑器插件

## vscode

- sync gist `f10963fee0a9957d6b8c709157e70b8a`

- pulgin

<CodeBlock>

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
  ```

</CodeBlock>

### vue config

<CodeBlock>

```js
{
  // eslint
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
  "eslint.autoFixOnSave": true,
  // vetur
  "vetur.format.defaultFormatter.html": "prettyhtml",
  "vetur.format.defaultFormatter.css": "prettier",
  "vetur.format.defaultFormatter.postcss": "prettier",
  "vetur.format.defaultFormatter.scss": "prettier",
  "vetur.format.defaultFormatter.less": "prettier",
  "vetur.format.defaultFormatter.stylus": "stylus-supremacy",
  "vetur.format.defaultFormatter.js": "prettier",
  "vetur.format.defaultFormatter.ts": "prettier",
  // prettier
  "prettier.requireConfig": true,
  "prettier.eslintIntegration": true,
  // editor
  "editor.formatOnPaste": true,
  "editor.formatOnSave": true,
  // 配置文件关联
  "files.associations": {
    "*.vue": "vue"
  }
}
```

</CodeBlock>

### user config

<CodeBlock>

```js
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

</CodeBlock>

## atom

- sync gist `aec52c655ed4abf64bcfd95f473afe88`

- plugins

<CodeBlock>

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

</CodeBlock>
