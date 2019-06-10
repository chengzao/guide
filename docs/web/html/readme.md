# HTML

## html和xhtml

HTML是一种基本的WEB网页设计语言，XHTML是一个基于XML的置标语言

## 页面三层结构

- `结构层`HTML
- `表现层`CSS
- `行为层`JavaScript

## 文档声明

- `<!DOCTYPE>` 声明对大小写不敏感
- `<!DOCTYPE>` 声明必须是 `HTML` 文档的第一行，位于 `<html>` 标签之前
- `<!DOCTYPE>` 声明不是 `HTML` 标签；告诉浏览器以何种方式来渲染页面
  - 这里有两种模式，`严格模式`和`混杂模式`。
  - 严格模式的排版和 JS 运作模式是 以该浏览器支持的最高标准运行
  - 混杂模式，向后兼容，模拟老式浏览器，防止浏览器无法兼容页面

### 文档类型定义（DTD）

- `HTML 5`

```html
<!DOCTYPE html>
```

- `HTML 4.01 Strict`

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
```

- `HTML 4.01 Transitional`

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
```

- `HTML 4.01 Frameset`

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN"
"http://www.w3.org/TR/html4/frameset.dtd">
```

## 页面基本组成

<CodeBlock>

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="./base.css">
  <title>Home</title>
</head>
<body>
  <h1>Html Page!</h1>
  <script src="./common.js"></script>
</body>
</html>
```

</CodeBlock>

## 页面加载事件

- `DOMContentLoaded` dom内容加载完毕
- `onload` 页面上所有的资源（图片，音频，视频等）被加载以后才会触发`load`事件
- `$(document).ready()` 监听`DOMContentLoaded`事件
- `$(document).load()` 监听的是 `load` 事件

!!! include(docs/web/html/html5.md) !!!
