# css实践

## CSS画圆半圆扇形三角梯形

```css
/* 半圆 */
.half-circle{
    height: 50px;
    border-radius: 50px 50px 0 0;
}
/* 扇形 */
.sector{
    border-radius: 100px 0 0;
}
/* 三角 */
.triangle{
    width: 0px;
    height: 0px;
    background: none;
    border: 50px solid red;
    border-color: red transparent transparent transparent;
}
/* 梯形 */
.ladder{
    width: 50px;
    height: 0px;
    background: none;
    border: 50px solid red;
    border-color: red transparent transparent transparent;
}
```


## a伪类的顺序

- `link visited hover active`
  - `link`:平常的状态
  - `visited`:被访问过之后
  - `hover`:鼠标放到链接上的时候
  - `active`:链接被按下的时候

<CodeBlock>

```css
a:link {
	background-color: blue;
}
a:visited {
	background-color: pink;
}
a:hover {
	background-color: purple;
}
a:active {
	background-color: yellow;
}
```

</CodeBlock>

## 1border(1像素问题)

<CodeBlock>

```html
<style type="text/css">
  body{
    background-color: #dfdfdf;
  }
  .box {
    width: 100px;
    height: 100px;
    text-align: center;
    margin-bottom: 10px;
    background-color: #fff;
  }

  .scale {
    position: relative;
    border: none;
  }

  .scale:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid #000;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 200%;
    height: 200%;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    -webkit-transform-origin: left top;
    transform-origin: left top;
  }

  .box-shadow-1px {
    box-shadow: inset 0px -1px 1px -1px #000;
  }

  .scale－single{
    position: relative;
    border: none;
  }

  .scale－single:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    background: #000;
    width: 100%;
    height: 1px;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
  }
</style>

<div class="box scale">scale all</div>
<div class="box box-shadow-1px">box shadow</div>
<div class="box scale－single">scale single</div>
```

</CodeBlock>


## 解决 IE9 以下浏览器不能使用 opacity

<CodeBlock>

```css
opacity: 0.5;
filter: alpha(opacity = 50);
filter: progid:DXImageTransform.Microsoft.Alpha(style = 0, opacity = 50);
```

</CodeBlock>

## 清除浮动的方式

- 额外标签法

<CodeBlock>

```css
.clear{ clear:both; }
```

</CodeBlock>

- 伪元素

<CodeBlock>

```css
.clearfix:after{
	display: block;
	overflow: hidden;
	visibility: hidden;
	height: 0;
	content: '';
	clear: both;
}
.clearfix{
	zoom:1;
}
```

</CodeBlock>

- 双伪元素

<CodeBlock>

```css
.clearfix:after,
.clearfix:before{
	display: table;
	overflow: hidden;
	height: 0;
	content: '';
	clear: both;
}
.clearfix{
	zoom:1;
}
```

</CodeBlock>

- BFC清除内部浮动:父级触发块级格式化上下文,形成独立渲染区域

<CodeBlock>

```css
/* fu */
.box{
    width: 300px;
    border: 1px solid #000;
    overflow: hidden;
}
/* zi */
.one{
    width: 150px;
    height: 200px;
    background-color: pink;
    float: left;
}
/* zi */
.two{
    width: 150px;
    height: 200px;
    background-color: blue;
    float: left;
}
```

</CodeBlock>
