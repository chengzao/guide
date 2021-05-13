---
title: css预处理器sass使用
date: 2020-07-20
sidebar: "auto"
categories:
  - web
tags:
  - sass
---

- [sass-lang 官方文档](http://sass-lang.com/guide)
- [sass 中文](https://www.sass.hk/)
- [RubyGems 镜像](https://gems.ruby-china.com/)
- [sass 转 css](https://www.sassmeister.com/)

## 安装

- 首先安装`ruby`
- 安装 sass

<CodeBlock>

```bash
# 1.删除原gem源
gem sources --remove https://rubygems.org/

# 2.添加国内淘宝源
gem sources -a hhttps://gems.ruby-china.com

# 3.打印是否替换成功
gem sources -l

# 4.更换成功后打印如下
*** CURRENT SOURCES ***
hhttps://gems.ruby-china.com

#
sudo gem install sass
sudo gem install compass

# 安装node-sass
npm install node-sass -g
# 监听单个文件
node-sass -w src/base.scss dist/base.css --output-style expanded
# 监听文件夹
node-sass -w src --output dist --output-style expanded
# 生成source-map
node-sass -w src --output dist --output-style expanded --source-map=true
# 指定source-map路径为map
node-sass -w src --output dist --output-style expanded --source-map=map
```

</CodeBlock>

## 基本使用

- `命令行编译`

<CodeBlock>

```bash
# 单文件转换命令
sass input.scss output.css

# 单文件监听命令
sass --watch input.scss:output.css

# 如果你有很多的sass文件的目录，你也可以告诉sass监听整个目录：
sass --watch app/sass:public/stylesheets

# 例: sass --watch src:dist --style expanded
```

</CodeBlock>

- `命令行编译配置选项`

<CodeBlock>

```bash
# 编译格式
sass --watch input.scss:output.css --style compact

# 编译添加调试map
sass --watch input.scss:output.css --sourcemap

# 选择编译格式并添加调试map
sass --watch input.scss:output.css --style expanded --sourcemap

# 开启debug信息
sass --watch input.scss:output.css --debug-info

# sass内置有四种编译格式option: nested expanded compact compressed
sass --style [option] # 表示解析后的css是什么排版格式

# 开启sourcemap调试后，会生成一个后缀名为.css.map文件
sass --sourcemap # 表示开启sourcemap调试。
```

</CodeBlock>

## 注释

```scss
// 这种注释内容不会出现在生成的css文件中

/* 这种注释内容会出现在生成的css文件中 */
```

## 使用 `$` 声明变量

```scss
/* 1. 使用变量$ */
// 变量定义在css规则块内，那么该变量只能在此规则块内使用
$highlight-color: #f90;
$plain-font: "Myriad Pro", Myriad, "Helvetica Neue", Helvetica,
  "Liberation Sans", Arial, sans-serif;

html {
  font-family: $plain-font;
  color: $highlight-color;
}

// $变量引用, 将局部变量转换为全局变量可以添加 !global 声明
.warp {
  background: #ccc;
  .selected {
    border: 1px solid $highlight-color;
  }
}

/* 变量名用中划线,下划线分隔都可以， 建议使用中划线 */

$highlight-border: 1px solid $highlight-color;
.selected {
  border: $highlight-border;
}
```

<CodeBlock title="scss编译后">

```scss
// 编译后
html {
  font-family: "Myriad Pro", Myriad, "Helvetica Neue", Helvetica,
    "Liberation Sans", Arial, sans-serif;
  color: #f90;
}

.selected {
  border: 1px solid #f90;
}
```

</CodeBlock>

## 嵌套 CSS 规则

```scss
#content {
  // 默认为子代选择器
  article {
    h1 {
      color: #333;
    }
    p {
      margin-bottom: 1.4em;
    }
  }
  aside {
    background-color: #eee;
  }
}
```

<CodeBlock title="scss编译后">

```scss
// 编译后
#content article h1 {
  color: #333;
}

#content article p {
  margin-bottom: 1.4em;
}

#content aside {
  background-color: #eee;
}
```

</CodeBlock>

## 父选择器的标识符&

```scss
article a {
  color: blue; // 链接符
  &:hover {
    color: red;
  }
}

#content aside {
  color: red; // 在父级加上一层范围标识
  body.ie & {
    color: green;
  }
}
```

<CodeBlock title="scss编译后">

```scss
// 编译后
article a {
  color: blue;
}

article a:hover {
  color: red;
}

#content aside {
  color: red;
}

body.ie #content aside {
  color: green;
}
```

</CodeBlock>

## 群组选择器的嵌套

```scss
.container {
  h1,
  h2,
  h3 {
    margin-bottom: 0.8em;
  }
}

nav,
aside {
  a {
    color: blue;
  }
}
```

<CodeBlock title="scss编译后">

```scss
// 编译后
.container h1,
.container h2,
.container h3 {
  margin-bottom: 0.8em;
}

nav a,
aside a {
  color: blue;
}
```

</CodeBlock>

## 子组合选择器和同层组合选择器：`>、+ 和 ~`

```scss
article {
  ~ article {
    border-top: 1px dashed #ccc;
  }
  > section {
    background: #eee;
  }
  dl > {
    dt {
      color: #333;
    }
    dd {
      color: #555;
    }
  }
  nav + & {
    margin-top: 0;
  }
}
```

<CodeBlock title="scss编译后">

```scss
// 编译后
article ~ article {
  border-top: 1px dashed #ccc;
}

article > section {
  background: #eee;
}

article dl > dt {
  color: #333;
}

article dl > dd {
  color: #555;
}

nav + article {
  margin-top: 0;
}
```

</CodeBlock>

## 嵌套属性

```scss
nav {
  border: {
    style: solid;
    width: 1px;
    color: #ccc;
  }
}
```

<CodeBlock title="scss编译后">

```scss
// 编译后
nav {
  border-style: solid;
  border-width: 1px;
  border-color: #ccc;
}
```

</CodeBlock>

## 导入局部的 SASS 文件

sass 局部文件的文件名以`下划线(_)`开头，sass 就不会在编译时单独编译这个文件输出 css

```scss
// _blue-theme.scss
aside {
  background: blue;
  color: white;
}
```

```scss
// _tmp.scss
/* 默认变量值
   如果导入前没有设置变量的值则取默认值，否则取设置的值 */
$fancybox-width: 400px !default;
.fancybox {
  width: $fancybox-width;
}
```

```scss
/* 导入前设置变量的值 */
$fancybox-width: 500px;
@import "./_tmp";

/* 嵌套导入sass :局部文件会被直接插入到css规则内导入它的地方 */
.blue-theme {
  @import "./_blue-theme";
}

$family: unquote("Droid+Sans");
@import url("http://fonts.googleapis.com/css?family=#{$family}");
```

<CodeBlock title="scss编译后">

```scss
// 编译后
.fancybox {
  width: 500px;
}

// 编译后
.blue-theme aside {
  background: blue;
  color: white;
}

// 编译后
@import url("http://fonts.googleapis.com/css?family=Droid+Sans");
```

</CodeBlock>

## 混合器 mixin

```scss
@mixin rounded-corners {
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}

.notice {
  background-color: green;
  border: 2px solid #00aa00; // 使用混合器
  @include rounded-corners;
}
```

<CodeBlock title="scss编译后">

```scss
// 编译后
.notice {
  background-color: green;
  border: 2px solid #00aa00;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
```

</CodeBlock>

- 混合器中的 CSS 规则

```scss
@mixin no-bullets {
  list-style: none;
  li {
    list-style-image: none;
    list-style-type: none;
    margin-left: 0px;
  }
}

ul.plain {
  color: #444;
  @include no-bullets;
}
```

<CodeBlock title="scss编译后">

```scss
// 编译后
ul.plain {
  color: #444;
  list-style: none;
}

ul.plain li {
  list-style-image: none;
  list-style-type: none;
  margin-left: 0px;
}
```

</CodeBlock>

- 给混合器传参

```scss
@mixin link-colors($normal, $hover, $visited) {
  color: $normal;
  &:hover {
    color: $hover;
  }
  &:visited {
    color: $visited;
  }
}

a {
  @include link-colors(blue, red, green);
}
```

<CodeBlock title="scss编译后">

```scss
// 编译后
a {
  color: blue;
}

a:hover {
  color: red;
}

a:visited {
  color: green;
}
```

</CodeBlock>

- 混合器传参: sass 允许通过语法\$name: value 的形式指定每个参数的值

```scss
@mixin link-colors($normal, $hover, $visited) {
  color: $normal;
  &:hover {
    color: $hover;
  }
  &:visited {
    color: $visited;
  }
}
a {
  @include link-colors($normal: blue, $visited: green, $hover: red);
}
```

<CodeBlock title="scss编译后">

```scss
// 编译后
a {
  color: blue;
}

a:hover {
  color: red;
}

a:visited {
  color: green;
}
```

</CodeBlock>

- 混合器传参:默认参数值 默认值使用`$name: default-value`的声明形式

```scss
@mixin link-colors($normal, $hover: $normal, $visited: $normal) {
  color: $normal;
  &:hover {
    color: $hover;
  }
  &:visited {
    color: $visited;
  }
}

a {
  @include link-colors($normal: blue);
}
```

<CodeBlock title="scss编译后">

```scss
// 编译后
a {
  color: blue;
}

a:hover {
  color: blue;
}

a:visited {
  color: blue;
}
```

</CodeBlock>

- mixin 向混合样式中导入内容 : `@content`

```scss
$color: green;
@mixin button($color: #fff) {
  color: $color;
  @content;
  border: 1px solid $color;
}

.button-green {
  @include button($color: red) {
    background: $color;
  }
}
```

<CodeBlock title="scss编译后">

```scss
// 编译后
.button-green {
  color: red;
  background: green;
  border: 1px solid #fff;
}
```

</CodeBlock>

## 使用选择器继承来精简`CSS Extend`

```scss
//通过选择器继承继承样式
.error {
  border: 1px solid red;
  background-color: #fdd;
}

.seriousError {
  @extend .error;
  border-width: 3px;
}
```

<CodeBlock title="scss编译后">

```scss
// 编译后
.error,
.seriousError {
  border: 1px solid red;
  background-color: #fdd;
}
.seriousError {
  border-width: 3px;
}
```

</CodeBlock>

## mixin and extend 不同

```scss
/* extend */
.button {
  background: green;
}

.button-1 {
  @extend .button;
}

.button-2 {
  @extend .button;
}

/*  mixin  */
@mixin button {
  background-color: green;
}

.button-1 {
  @include button;
}

.button-2 {
  @include button;
}
```

<CodeBlock title="scss编译后">

```scss
// 编译后

/* extend */
.button,
.button-1,
.button-2 {
  background: green;
}

/*  mixin  */
.button-1 {
  background-color: green;
}
.button-2 {
  background-color: green;
}
```

</CodeBlock>

## function 函数指令

```scss
$grid-width: 40px;
$gutter-width: 10px;

@function grid-width($n) {
  @return $n * $grid-width + ($n - 1) * $gutter-width;
}

#sidebar {
  width: grid-width(5);
}

@function px2rem($n) {
  @return ($n)/32;
}
.test {
  height: px2rem(64rem);
}

$a: 16;
$base: 32;
@function p2r($n, $base: $a) {
  @return $n/$base + rem;
}

#box {
  width: p2r(160);
}
```

<CodeBlock title="scss编译后">

```scss
// 编译后
#sidebar {
  width: 240px;
}

.test {
  height: 2rem;
}

#box {
  width: 10rem;
}
```

</CodeBlock>

## 控制指令 (Control Directives)

- `@if`

```scss
p {
  @if 1+1==2 {
    border: 1px solid;
  }
  @if 5 < 3 {
    border: 2px dotted;
  }
  @if null {
    border: 3px double;
  }
}

$type: monster;
p {
  @if $type==ocean {
    color: blue;
  } @else if $type==matador {
    color: red;
  } @else if $type==monster {
    color: green;
  } @else {
    color: black;
  }
}
```

<CodeBlock title="scss编译后">

```scss
// 编译后
p {
  border: 1px solid;
}

p {
  color: green;
}
```

</CodeBlock>

- `@for`

```scss
@for $i from 1 through 3 {
  .item-#{$i} {
    width: 2em * $i;
  }
}
```

<CodeBlock title="scss编译后">

```scss
// 编译后
.item-1 {
  width: 2em;
}

.item-2 {
  width: 4em;
}

.item-3 {
  width: 6em;
}
```

</CodeBlock>

- `@each`

```scss
@each $animal in puma, sea-slug, egret, salamander {
  .#{$animal}-icon {
    background-image: url("/images/#{$animal}.png");
  }
}
```

<CodeBlock title="scss编译后">

```scss
// 编译后
.puma-icon {
  background-image: url("/images/puma.png");
}

.sea-slug-icon {
  background-image: url("/images/sea-slug.png");
}

.egret-icon {
  background-image: url("/images/egret.png");
}

.salamander-icon {
  background-image: url("/images/salamander.png");
}
```

</CodeBlock>

- `@while`

```scss
$i: 6;
@while $i>0 {
  .item-#{$i} {
    width: 2em * $i;
  }
  $i: $i - 2;
}
```

<CodeBlock title="scss编译后">

```scss
// 编译后
.item-6 {
  width: 12em;
}

.item-4 {
  width: 8em;
}

.item-2 {
  width: 4em;
}
```

</CodeBlock>

- `@media`

```scss
.sidebar {
  width: 300px;
  @media screen and (orientation: landscape) {
    width: 500px;
  }
}

@media screen {
  .sidebar {
    @media (orientation: landscape) {
      width: 500px;
    }
  }
}

// 2
$media: screen;
$feature: -webkit-min-device-pixel-ratio;
$value: 1.5;
@media #{$media} and ($feature: $value) {
  .sidebar {
    width: 500px;
  }
}
```

<CodeBlock title="scss编译后">

```scss
// 编译后
.sidebar {
  width: 300px;
}

@media screen and (orientation: landscape) {
  .sidebar {
    width: 500px;
  }
}

@media screen and (orientation: landscape) {
  .sidebar {
    width: 500px;
  }
}

// 2
@media screen and (-webkit-min-device-pixel-ratio: 1.5) {
  .sidebar {
    width: 500px;
  }
}
```

</CodeBlock>

## 插值语句

可以在选择器或属性名中使用变量

```scss
$name: foo;
$attr: border;
p.#{$name} {
  #{$attr}-color: blue;
}

p {
  $font-size: 12px;
  $line-height: 30px;
  font: #{$font-size}/#{$line-height};
}
```

<CodeBlock title="scss编译后">

```scss
// 编译后
p.foo {
  border-color: blue;
}

p {
  font: 12px/30px;
}
```

</CodeBlock>

- 运算: 数字运算

```scss
/* 数字运算: 支持数字的加减乘除、取整等运算 (+, -, *, /, %)，如果必要会在不同单位间转换值 */

p {
  font: 10px/8px; /* 纯 CSS，不是除法运算 */
  $width: 1000px;
  width: $width/2; /* 使用了变量，是除法运算 */
  width: round(1.5) / 2; /* 使用了函数，是除法运算 */
  height: (500px/2); /* 使用了圆括号，是除法运算 */
  margin-left: 5px + 8px/2px; /* 使用了加（+）号，是除法运算 */
}
// 在纯 CSS 中使用变量和 /， 你可以用 #{} 包住变量
p {
  $font-size: 12px;
  $line-height: 30px;
  font: #{$font-size}/#{$line-height};
}
```

<CodeBlock title="scss编译后">

```scss
// 编译后
/* 数字运算: 支持数字的加减乘除、取整等运算 (+, -, *, /, %)，如果必要会在不同单位间转换值 */
p {
  font: 10px/8px;
  /* 纯 CSS，不是除法运算 */
  width: 500px;
  /* 使用了变量，是除法运算 */
  width: 1;
  /* 使用了函数，是除法运算 */
  height: 250px;
  /* 使用了圆括号，是除法运算 */
  margin-left: 9px;
  /* 使用了加（+）号，是除法运算 */
}

// 在纯 CSS 中使用变量和 /， 你可以用 #{} 包住变量
p {
  font: 12px/30px;
}
```

</CodeBlock>

- 运算: 颜色值运算

```scss
p {
  color: #010203 + #040506;
}
//
p {
  color: rgba(255, 0, 0, 0.75) + rgba(0, 255, 0, 0.75);
}

/* 颜色值的 alpha channel 可以通过 opacify 或 transparentize 两个函数进行调整*/
$translucent-red: rgba(255, 0, 0, 0.5);
p {
  color: opacify($translucent-red, 0.3);
  background-color: transparentize($translucent-red, 0.25);
}

$translucent-red: rgba(255, 0, 0, 0.5);
$green: #00ff00;
div {
  filter: progid:DXImageTransform.Microsoft.gradient(enabled='false', startColorstr='#{ie-hex-str($green)}', endColorstr='#{ie-hex-str($translucent-red)}');
}
```

<CodeBlock title="scss编译后">

```scss
// 编译后
/* 颜色值运算  */
p {
  color: #050709;
}

p {
  color: rgba(255, 255, 0, 0.75);
}
/* 颜色值的 alpha channel 可以通过 opacify 或 transparentize 两个函数进行调整*/
p {
  color: rgba(255, 0, 0, 0.8);
  background-color: rgba(255, 0, 0, 0.25);
}

div {
  filter: progid:DXImageTransform.Microsoft.gradient(enabled='false', startColorstr='#FF00FF00', endColorstr='#80FF0000');
}
```

</CodeBlock>

- 字符串运算

```scss
p {
  cursor: e + -resize;
}

p:before {
  content: "Foo " + Bar;
  font-family: sans- + "serif";
}

p:before {
  content: "I ate #{5 + 10} pies!";
}
```

<CodeBlock title="scss编译后">

```scss
// 编译后
/* 字符串运算 */
p {
  cursor: e-resize;
}

p:before {
  content: "Foo Bar";
  font-family: sans-serif;
}

p:before {
  content: "I ate 15 pies!";
}
```

</CodeBlock>

- `@at-root`

```scss
@media print {
  .page {
    width: 8in;
    @at-root (without: media) {
      color: red;
    }
  }
}
```

<CodeBlock title="scss编译后">

```scss
// 编译后
/* @at-root */
@media print {
  .page {
    width: 8in;
  }
}

.page {
  color: red;
}
```

</CodeBlock>
