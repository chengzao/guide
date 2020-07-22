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
