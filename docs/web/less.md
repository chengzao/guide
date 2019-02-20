# less

- [koala-app编译器](http://koala-app.com/index-zh.html)
- `npm install -g less`
- `npm i less --save-dev`

## 基本使用

```bash
lessc styles.less > styles.css
lessc -x styles.less styles.css
```

## 常用语法

- import

```less
// less 文件
@charset 'utf-8';
//导入less文件
@import "m";
//导入css文件:
//注意导入的css文件位置与编译后css的位置是一致的
@import (less) "b.css";

//m.less
.cless{
    @red:red;
    color:@red;
}

//b.css
 .bcss{
   color:#ccc;
 }

 //编译后的css文件
@charset 'utf-8';
.cless {
  color: #ff0000;
}
.bcss {
  color: #ccc;
}
```

- 变量

```less
//less文件：
@charset 'utf-8';
/* 这是一个编译后看见的注释*/
//这是一个编译后看不见的注释
@_width:300px;
@red:red;

.col{
  //可重复声明使用不影响外调用
  @red:#ccc;
  color: @red;
}
.col2{
  color: @red;
}

//less编译后的对应css文件：
@charset 'utf-8';
/* 这是一个编译后看见的注释*/
.col {
  color: #cccccc;
}
.col2 {
  color: #ff0000;
}
```

- 混合

```less
.bord{
  border: 1px solid #000;
}
//例：
.box{
    width: @_width;
    height: @_width;
    background-color: @red;
    .bord;//混合
}

//less编译后的对应css文件：
.bord {
  border: 1px solid #000;
}
.box {
  width: 300px;
  height: 300px;
  background-color: #ff0000;
  border: 1px solid #000;
}
```

- 混合-带参数

```less
.border_02(@border_width){
    border: solid yellow @border_width;
}
//例：
.border_hunhe{
    width: @_width;
    height: @_width;
    .border_02(20px);
}

//less编译后的对应css文件：
.border_hunhe {
  width: 300px;
  height: 300px;
  border: solid #ffff00 20px;
}
```

- 混合-默认值

```less
.border_03(@border_width:10px){
    border: @border_width solid green;
}
//例： 混合 不传值
.border_hunhe2{
    .border_03();
}
//例： 混合 传值
.border_hunhe21{
    .border_03(12px);
}

//less编译后的对应css文件：
.border_hunhe2 {
  border: 10px solid #008000;
}
.border_hunhe21 {
  border: 12px solid #008000;
}
```

- 混合用法:默认值为变量

```less
@bdr:10px;
.border_04(@border_width:@bdr){
    border: @border_width solid @red;
}
//例： 混合 不传值
.border_hunhe3{
    .border_04();
}
//例： 混合 传值
.border_hunhe31{
    .border_04(13px);
}

//less编译后的对应css文件：
.border_hunhe3 {
  border: 10px solid #ff0000;
}
.border_hunhe31 {
  border: 13px solid #ff0000;
}
```

- 匹配模式

```less
/* 三角形 border */
// 原文url:http://www.cnblogs.com/blosaa/p/3823695.html
//上
.trangle(top,@w:5px,@c:#ccc){
    border-width: @w;
    border-color: transparent transparent @c transparent ;
    border-style: dashed dashed solid dashed ;
}
//右
.trangle(right,@w:5px,@c:#ccc){
    border-width: @w;
    border-color: transparent transparent transparent @c;
    border-style: dashed dashed dashed solid;
}
//下
.trangle(bottom,@w:5px,@c:#ccc){
    border-width: @w;
    border-color:@c transparent transparent transparent;
    border-style:solid dashed dashed dashed;
}
//左
.trangle(left,@w:5px,@c:#ccc){
    border-width: @w;
    border-color: transparent @c transparent transparent;
    border-style: dashed solid dashed dashed ;
}
//匹配通用格式
.trangle(@_,@w:5px,@c:#ccc){
    width: 0;
    height: 0;
    overflow: hidden;
}
//例：
.sanjiao{
  .trangle(right,50px);
}

//例：传入错误值
.sanjiao1{
    .trangle(dsa,20px);
}

//less编译后的对应css文件：
/* 三角形 border */
.sanjiao {
  border-width: 50px;
  border-color: transparent transparent transparent #cccccc;
  border-style: dashed dashed dashed solid;
  width: 0;
  height: 0;
  overflow: hidden;
}
.sanjiao1 {
  width: 0;
  height: 0;
  overflow: hidden;
}
```

- 运算: 其中一个带单位即可.**注意:减法之间的格式;命名变量在运算中不可添加单位**

```less
@w10:100px;
@h10:120;
.add{
  width: @w10 + 10;
  height:@h10 - 10px;
  color: #666 / 2;  //可用,不建议
}
.add2{
  width: @w10 + 12/2;
  height:(@h10 - 10)*2px;
}

.add3{
  width: @w10 + 10px;
  height: @h10/3*3px - 6+4;
}


//less编译后的对应css文件：
.add {
  width: 110px;
  height: 110px;
  color: #333333;
}
.add2 {
  width: 106px;
  height: 220px;
}
.add3 {
  width: 110px;
  height: 118px;
}
```

- 嵌套用法

```less
ul{
  width: 100px;
  //margin: 10px auto;
  li{
    width: 100px;
    float: left;
    border-bottom: 1px solid #ccc /2;
  }
  a{
    width: 100px;
    color: red;
    display: block;
    //& 上一层选择器的名
    &:hover{
      color: blue;
    }
    span{
      font-weight: bold;
      font-size: 18px;
      float: right;
      color: #85ada7;
    }
  }
}
 // $的用法
.tit{
  width: 100px;
  &_n{
  width: 100px;
 }
}

//less编译后的对应css文件：
ul {
  width: 100px;
}
ul li {
  width: 100px;
  float: left;
  border-bottom: 1px solid #666666;
}
ul a {
  width: 100px;
  color: red;
  display: block;
}
ul a:hover {
  color: blue;
}
ul a span {
  font-weight: bold;
  font-size: 18px;
  float: right;
  color: #85ada7;
}
.tit {
  width: 100px;
}
.tit_n {
  width: 100px;
}
```

- argument用法

```less
.brd2(@c:#ccc,@w:10px,@solid:solid){
  border:@arguments;
}
.bor2{
  .brd2();
}
//注意参数对应
.bor21{
  .brd2(red);
}

//less编译后的对应css文件：
.bor2 {
  border: #cccccc 10px solid;
}
.bor21 {
  border: #ff0000 10px solid;
}
```

- 避免编译

```less
 .wid{
   width:~'calc(100px - 20px)';
 }

//less编译后的对应css文件：
.wid {
  width: calc(100px - 20px);
}
```

- important用法

```less
.impor(@w:10px,@h:10px){
  width:@w;
  height:@h;
}
.im_a{
  .impor()!important;
}

//less编译后的对应css文件：
.im_a {
  width: 10px !important;
  height: 10px !important;
}
```
