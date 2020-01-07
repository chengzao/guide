# 常用布局

[https://zhuanlan.zhihu.com/p/39453226](https://zhuanlan.zhihu.com/p/39453226)

## px和视口

### 像素

- css像素

	- 定义：在js或者css代码中使用的px单位就是指的是css像素

- 物理像素

	- 定义：物理像素也称设备像素，只与设备或者说硬件有关，同样尺寸的屏幕，设备的密度越高，物理像素也就越多

- Css像素与物理相熟的区别：

	- css像素为web开发者提供，在css中使用的一个抽象单位物理像素只与设备的硬件密度有关，任何设备的物理像素都是固定的

### 视口

- 定义：广义的视口，是指浏览器显示内容的屏幕区域，狭义的视口包括了布局视口、视觉视口和理想视口

- 布局视口（layout viewport）

	- 定义：布局视口定义了pc网页在移动端的默认布局行为

	- 移动端展示：在不设置网页的viewport的情况下，pc端的网页默认会以布局视口为基准，在移动端进行展示

	- 问题：因此我们可以明显看出来，默认为布局视口时，根植于pc端的网页在移动端展示很模糊

- 视觉视口（visual viewport）

	- 定义：视觉视口表示浏览器内看到的网站的显示区域，用户可以通过缩放来查看网页的显示内容，从而改变视觉视口

	- 注：视觉视口不会影响布局视口的宽度和高度

- 理想视口（ideal viewport）

	- 定义：理想视口或者应该全称为“理想的布局视口”，在移动设备中就是指设备的分辨率

	- 理想视口或者说分辨率就是给定设备物理像素的情况下，最佳的“布局视口”

	- dpr：DPR = 物理像素／分辨率

	- 在不缩放的情况下，一个css像素就对应一个dpr：1 CSS像素 = 物理像素／分辨率

	- 实现方式：通过viewport元标签来控制布局，使得移动端在理想视口下布局

		<meta id="viewport" name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1; user-scalable=no;">

		width正整数定义布局视口的宽度，单位为像素
		height正整数定义布局视口的高度，单位为像素
		initial-scale[0,10]初始缩放比例，1表示不缩放
		minimum-scale[0,10]最小缩放比例
		maximum-scale[0,10]最大缩放比例
		user-scalable：yes／no是否允许手动缩放页面，默认值为yes

		其中我们来看width属性，在移动端布局时，在meta标签中我们会将width设置称为device-width，device-width一般是表示分辨率的宽，通过width=device-width的设置我们就将布局视口设置成了理想的视口

		- width正整数定义布局视口的宽度，单位为像素

		- height正整数定义布局视口的高度，单位为像素

		- initial-scale[0,10]初始缩放比例，1表示不缩放

		- minimum-scale[0,10]最小缩放比例

		- maximum-scale[0,10]最大缩放比例

		- user-scalable：yes／no是否允许手动缩放页面，默认值为yes

### px与自适应

- 当通过viewport元标签，设置布局视口为理想视口时，1个css像素可以表示成：1 CSS像素 = 物理像素／分辨率

- 而在iPhone6下：iphone6：1 CSS像素 = 物理像素 ／分辨率 = 750 ／ 375 = 2 px

- 所以iphone6中 一个CSS像素表示了2个物理像素

- 问题：不同的移动设备分辨率不同，也就是1个CSS像素可以表示的物理像素是不同的，因此如果在css中仅仅通过px作为长度和宽度的单位，造成的结果就是无法通过一套样式，实现各端的自适应

## 媒体查询

- 由来：不同端的设备下，在css文件中，1px所表示的物理像素的大小是不同的，因此通过一套样式，是无法实现各端的自适应

- 原理：使用@media媒体查询可以针对不同的媒体类型定义不同的样式，特别是响应式页面，可以针对不同屏幕的大小，编写多套样式，从而达到自适应的效果

- 缺点：如果在浏览器大小改变时，需要改变的样式太多，那么多套样式代码会很繁琐

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

## 自适应场景下的rem解决方案

### rem单位

- rem是一个灵活的、可扩展的单位，由浏览器转化像素并显示

- rem单位无论嵌套层级如何，都只相对于浏览器的根元素（HTML元素）的font-size

- 为了计算方便，通常可以将html的font-size设置成：html{ font-size: 62.5% }

	- 这种情况下：1 rem = 10px

### 通过rem来实现响应式布局

- rem单位都是相对于根元素html的font-size来决定大小的,根元素的font-size相当于提供了一个基准

- 当页面的size发生变化时，只需要改变font-size的值，那么以rem为固定单位的元素的大小也会发生响应的变化

- 如果通过rem来实现响应式的布局，只需要根据视图容器的大小，动态的改变font-size即可

	function refreshRem() {
	    var docEl = doc.documentElement;
	    var width = docEl.getBoundingClientRect().width;
	    var rem = width / 10;
	    docEl.style.fontSize = rem + 'px';
	    flexible.rem = win.rem = rem;
	}
	win.addEventListener('resize', refreshRem);

	上述代码中将视图容器分为10份，font-size用十分之一的宽度来表示，最后在header标签中执行这段代码，就可以动态定义font-size的大小，从而1rem在不同的视觉容器中表示不同的大小，用rem固定单位可以实现不同容器内布局的自适应

### rem2px和px2rem

- webpack loader的形式

	- npm install px2rem-loader

- webpack中使用postcss plugin

	- npm install postcss-loader

### rem 布局的缺点

- 在响应式布局中，必须通过js来动态控制根元素font-size的大小

	- 也就是说css样式和js代码有一定的耦合性。且必须将改变font-size的代码放在css样式之前

## 通过vw/vh来实现自适应

### 什么是vw/vh ?

- css3中引入了一个新的单位vw/vh，与视图窗口有关

- vw：表示相对于视图窗口的宽度

- vh：表示相对于视图窗口高度

### vw单位换算

- 比如对于iphone6/7 375*667的分辨率，那么px可以通过如下方式换算成vw：1px = （1/375）*100 vw

- 也可以通过postcss的相应插件，预处理css做一个自动的转换，postcss-px-to-viewport可以自动将px转化成vw

	var defaults = {
	  viewportWidth: 320,
	  viewportHeight: 568,
	  unitPrecision: 5,
	  viewportUnit: 'vw',
	  selectorBlackList: [],
	  minPixelValue: 1,
	  mediaQuery: false
	};

	通过指定视窗的宽度和高度，以及换算精度，就能将px转化成vw

### vw/vh单位的兼容性

- vw单位在绝大部分高版本浏览器内的支持性很好，但是opera浏览器整体不支持vw单位，如果需要兼容opera浏览器的布局，不推荐使用vw

## Vw跟rem的兼容性

### rem

- ios：4.1+

- 安卓：2.1+

### vw

- ios：6.1+

- 安卓：4.4+

## rem

- rem作用于非根元素时，相对于根元素字体大小；rem作用于根元素字体大小时，相对于其出初始字体大小

/* 作用于根元素，相对于原始大小（16px），所以html的font-size为32px*/
html {font-size: 2rem}

/* 作用于非根元素，相对于根元素字体大小，所以为64px */
p {font-size: 2rem}

### Rem布局原理

- 其实rem布局的本质是等比缩放

- 如果子元素设置rem单位的属性，通过更改html元素的字体大小，就可以让子元素实际大小发生变化

	html {font-size: 16px}
	p {width: 2rem} /* 32px*/

	html {font-size: 32px}
	p {width: 2rem} /*64px*/

- 问题：

	- 首先是字体的问题，字体大小并不能使用rem，字体的大小和字体宽度，并不成线性关系

	- 由于设置了根元素字体的大小，会影响所有没有设置字体大小的元素，因为字体大小是会继承的，难道要每个元素都显示设置字体大小？

### rem布局方案

- 如果要求兼容性，建议rem+js方案，需要解决的问题如下：

	- 修正body字体大小

	- 宽度限制，超大屏幕居中

	- 字体缩放

- 如果兼容性满足，建议使用rem+vw方案，需要解决的问题如下：

	- 修正body字体大小

	- 宽度限制，超大屏幕居中

	- 字体缩放

## em

- em作为font-size的单位时，其代表父元素的字体大小，em作为其他属性单位时，代表自身字体大小

