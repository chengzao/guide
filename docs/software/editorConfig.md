# EditorConfig

- [editorconfig](https://editorconfig.org/)
- vscode配合插件[EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)一起使用
- `.editorconfig`文件配置

<CodeBlock>

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

</CodeBlock>

- 通配符模式

| 通配符        | Are           |
| :----------: |:-------------|
| *     | 匹配任意数量string类型的字符，' / ' 除外 |
| **     | 匹配任意数量string类型的字符 |
| ？    | 匹配任意单个字符 |
| [a-z]    | 匹配方括号规定范围内的任意单个字符 |
| [!a-z]    | 匹配不在方括号规定范围内的任意单个字符 |
| {s1,s2,s3}  | 匹配任意一个大括号内部美剧的字符(','分隔) |
| {num1..num2}  | 匹配num1和num2之间的任意一个整数，num1和num2正负都可以 |

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
