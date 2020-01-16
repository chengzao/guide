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


## 解决 IE9 不能使用 opacity

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

## 百分比

- 原理：当浏览器的宽度或者高度发生变化时，通过百分比单位，通过百分比单位可以使得浏览器中的组件的宽和高随着浏览器的变化而变化，从而实现响应式的效果

- css中的子元素中的百分比（%）到底是谁的百分比？

- 百分比的具体分析

	- 子元素height和width的百分比

		- 子元素的height或width中使用百分比，是相对于子元素的直接父元素，width相对于父元素的width，height相对于父元素的height

	-  top和bottom 、left和right

		- 子元素的top和bottom如果设置百分比，则相对于直接非static定位(默认定位)的父元素的高度

		- 子元素的left和right如果设置百分比，则相对于直接非static定位(默认定位的)父元素的宽度

	- padding

		- 子元素的padding如果设置百分比，不论是垂直方向或者是水平方向，都相对于`直接父亲元素的width`，而与父元素的height无关

	- margin

		- 子元素的margin如果设置成百分比，不论是垂直方向还是水平方向，都相对于`直接父元素的width`

	- border-radius

		- border-radius不一样，如果设置border-radius为百分比，则是相对于自身的宽度

	- translate

		- 相对于自身

	- background-size

		- 相对于自身

- 百分比单位布局应用

	- 实现一个固定长宽比的长方形

		<div class="trangle"></div>

		.trangle{
		  height:0;
		  width:100%;
		  padding-top:75%;
		}

		通过设置padding-top：75%,相对比宽度的75%，因此这样就设置了一个长宽高恒定比例的长方形

- 百分比单位缺点

	- 计算困难，如果我们要定义一个元素的宽度和高度，按照设计稿，必须换算成百分比单位

	- 各个属性中如果使用百分比，相对父元素的属性并不是唯一的

		- width和height相对于父元素的width和height

		- margin、padding不管垂直还是水平方向都相对比父元素的宽度

		- border-radius则是相对于元素自身

	- 造成我们使用百分比单位容易使布局问题变得复杂
