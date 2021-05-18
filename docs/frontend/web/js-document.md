---
title: 数据类型-document
date: 2020-07-20
sidebar: "auto"
---

## 文档基本结构

```js
document.head; // 文档的头标签
typeof document.head; // object

document.title; // 文档标题
typeof document.title; // string

document.body; // 文档的body标签
typeof document.body; // object

document.documentElement; // 文档的根节点 注意：没有document.html这个东西
typeof document.documentElement; // object

document.html; // 这个是错的!!!

document.defaultView === window; // true
document.activeElement; // 属性返回当前文档中获得焦点的那个元素
document.defaultView;
```

## 文档兼容模式

- `document type`声明文档类型 DTD：`<!DOCTYPE html>`
- `BackCompat` 未声明 DTD(怪异模式)firefox
- `CSS1Compat` 已经声明 DTD(标准模式)chrome ,ie
- `document.compatMode` 获取文档类型

## document

### 节点获取

- 对于正常的网页,直接使用`document`或`window.document`
- 对于 iframe 载入的网页,使用 iframe 节点的`contentDocument`属性
- 对 Ajax 操作返回的文档,使用`XMLHttpRequest`对象的`responseXML`属性

### 节点集合属性

- `document.links`属性返回当前文档所有设定了 href 属性的 a 及 area 元素
- `document.images`属性返回页面所有图片元素(即 img 标签)
- `document.scripts`属性返回当前文档的所有脚本(即 script 标签)
- `document.styleSheets`属性返回一个类似数组的对象,代表当前网页的所有样式表

### 文档信息属性

- `document.documentURI`属性和`document.URL`属性都返回一个字符串,表示当前文档的网址
- `documentURI`属性可用于所有文档(包括 XML 文档),URL 属性只能用于 HTML 文档
- `document.domain`属性返回当前文档的域名
- `document.lastModified`属性返回当前文档最后修改的时间戳,格式为字符串
- `document.title`属性返回当前文档的标题,该属性是可写的
- `document.referrer`

- `document.characterSet`属性返回渲染当前文档的字符集 //UTF-8
- `document.readyState`属性返回当前文档的状态

- **三种可能的值:**

  - `loading`：加载 HTML 代码阶段(尚未完成解析)
  - `interactive`：加载外部资源阶段时
  - `complete`：加载完成时

- `document.designMode`属性控制当前文档是否可编辑
- `document.implementation`属性返回一个对象,用来甄别当前环境部署了哪些 DOM 相关接口
- `implementation`属性的`hasFeature`方法,可以判断当前环境是否部署了特定版本的特定接口


```js
document.implementation.hasFeature("HTML", "2.0"); // true

document.implementation.hasFeature("MutationEvents", "2.0"); // true
```

- `document.cookie`属性用来操作浏览器 Cookie
