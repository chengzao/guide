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
