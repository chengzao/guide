## vscode vue

- `vscode-user-setting-vue.json`

```json
{
  // eslint
  "eslint.enable": true,
  // 配置 ESLint 检查的文件类型
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
  // 保存时eslint自动修复错误
  "eslint.autoFixOnSave": true,
  // prettier
  "prettier.requireConfig": true,
  // 开启 eslint 支持
  "prettier.eslintIntegration": true,
  // 使用单引号
  "prettier.singleQuote": true,
  // 结尾不加分号
  "prettier.semi": false,
  // editor
  "editor.formatOnPaste": true,
  // 保存自动格式化
  "editor.formatOnSave": true,
  // 配置文件关联
  "files.associations": {
    "*.vue": "vue"
  }
}
```
