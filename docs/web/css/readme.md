# CSS

## 层叠样式表

- cascading style sheets,重复的对同一个选择器进行样式重复编写，会发生后面的样式覆盖前面的样式

- 浏览器 CSS 兼容前缀

```bash
-o-transform:rotate(7deg); // Opera

-ms-transform:rotate(7deg); // IE

-moz-transform:rotate(7deg); // Firefox

-webkit-transform:rotate(7deg); // Chrome

transform:rotate(7deg); // 统一标识语句
```

## style属性

### Style对象

```js
var divStyle = document.querySelector('div').style;
divStyle.backgroundColor = 'red';
divStyle.backgroundColor // red
```

### cssText属性

```js
var divStyle = document.querySelector('div').style;
divStyle.cssText = 'background-color: red;'
  + 'border: 1px solid black;'
  + 'height: 100px;'
  + 'width: 100px;';
```

### css属性

- `setProperty(propertyName,value)`：设置某个CSS属性
- `getPropertyValue(propertyName)`：读取某个CSS属性
- `removeProperty(propertyName)`：删除某个CSS属性

```js
var divStyle = document.querySelector('div').style;
divStyle.setProperty('background-color','red');
divStyle.getPropertyValue('background-color');
divStyle.removeProperty('background-color');
```

### StyleSheet对象

#### 获取样式表

- `document.styleSheets`返回当前页面的所有StyleSheet对象

```js
// 等同于document.styleSheets[0]
document.querySelector('#linkElement').sheet
```

#### 属性

- `href`属性是只读属性，返回StyleSheet对象连接的样式表地址
- `type`属性返回StyleSheet对象的type值，通常是`text/css`
- `title`属性返回StyleSheet对象的title值
- css的`@import`命令允许在样式表中加载其他样式表`
- `media属性表示这个样式表是用于屏幕（screen），还是用于打印（print），或两者都适用（all）。该属性只读，默认值是screen`

```js
document.querySelector('#linkElement').disabled = true;
// 或者
document.querySelector('#linkElement').disabled = 'disabled';
```

## 选择器

- 通配符 : `*{}`
- 标签选择器 : `p{} div{}`
- `class`类名选择器(可重复) :  `.demo{}`
- `id`选择器 (同一页面不可重复):  `#demo{}`
- 后代选择器  ： `#demo p{}`
- 子元素选择器 :  `#demo>p{}`
- 并集选择器 ：`.demo,#demo{}`
- 交集选择器 ：`div.demo{}`   `两选择器之间没有空格`

## 优先级从大到小

- `!important > 行内样式 > Id > 类 > 标签 > 通配符 > 继承 > 浏览器默认`

## css的三种存在方式

- 行内样式（存在于标签之中，用style属性设置）

```html
<p style="color: red">内容</p>
```

- 嵌入样式（内联样式）（存在于title标签之下的style标签之中）

```html
<style>
 	p {
      color: red;
	}
</style>
```

- 外部样式（外联样式）：（存在于一个外部文件中） 在需要的页面head标签中引入这个文件引用：

```html
<link rel="stylesheet" href="a.css" />
```

## BEM

- `Block块, Element元素, Modifier修饰符`

## 变形与动画

### transition（过渡）

![](https://raw.githubusercontent.com/chengzao/imgbed/img/img/css-transition.png)

- `transition: property duration timing-function delay;`
- `transition-property` 过渡效果的 CSS 属性的名称 width...
- `transition-duration` 完成过渡效果需要多少秒或毫秒 time
- `transition-timing-function` 速度效果的速度曲线 linear...
- `transition-delay` 过渡效果何时开始 time

### transform（变换）

#### 2d

- `translate(x,y)`
- `rotate(angle)`
- `scale(x,y)`
- `skew(x-angle,y-angle)`

#### 3d

- `transform-style`
  - 规定如何在 3D 空间中呈现被嵌套的元素
  - `transform-style: flat|preserve-3d;`
- `perspective`
  - 3D 元素的透视效果
  - `perspective: number|none;`
- `perspective-origin`
  - 3D 元素的底部位置
  - `perspective-origin: x-axis y-axis;`
- `backface-visibility`
  - 定义元素在不面对屏幕时是否可见
  - `backface-visibility: visible|hidden;`

## 动画

### keyframes

- `@keyframes animationname {keyframes-selector {css-styles;}}`
- `animationname` 定义动画的名称
- `keyframes-selector` 动画时长的百分比 `0-100%; from（与 0% 相同）;to（与 100% 相同）`
- `css-styles` 一个或多个合法的 CSS 样式属性

### animation

![](https://raw.githubusercontent.com/chengzao/imgbed/img/img/css-animation.png)

- `animation: name duration timing-function delay iteration-count direction;`
- `animation-name` 需要绑定到选择器的 keyframe 名称
- `animation-duration` 完成动画所花费的时间，以秒或毫秒计
- `animation-timing-function` 动画的速度曲线
- `animation-delay` 在动画开始之前的延迟
- `animation-iteration-count` 动画应该播放的次数
- `animation-direction` 是否应该轮流反向播放动画. `normal(默认) | alternate`
- `animation-fill-mode: none | forwards | backwards | both`
  - `forwards` 当动画完成后，保持最后一个属性值
  - `backwards` 在 `animation-delay` 所指定的一段时间内，在动画显示之前，应用开始属性值
  - `both` 向前和向后填充模式都被应用

## 媒体查询media

- `@media mediatype and|not|only (media feature) { CSS-Code; }`
- `mediatype` : `print | screen | speech | all`

## 盒子模型

### 盒模型元素

- `内容(content), 填充(padding), 边框(border), 外边距(margin)`

### 盒子模型分类

- IE 盒子模型: `IE的content部分包含了 border 和 padding;`

  ![](https://raw.githubusercontent.com/chengzao/imgbed/img/img/ie_boxModel.jpg)

- 标准 W3C 盒子模型
  - `width：border-left + padding-left + width + padding-right + border-right`
  - `height: border-top + padding-top + height + padding-bottom + border-bottom`

  ![](https://raw.githubusercontent.com/chengzao/imgbed/img/img/_boxModel.jpg)

### css3盒模型属性

- `box-sizing: border-box`: 计算方式为 `width = border + padding + content`
- `box-sizing: content-box`: 计算方式为 `width = content`

  ![](https://raw.githubusercontent.com/chengzao/imgbed/img/img/boxModel.png)

### content内容

### padding

- 设置内容和盒子之间的距离
- 连写：`padding-top/padding-right/padding-bottom/padding-left`

```css
/*padding :top right bottom left*/
padding:10px 5px 15px 20px;

/*padding :top  right/left  bottom*/
padding:10px 5px 15px;

/*padding :top/bottom  right/left  */
padding:10px 5px;

/*padding: top/right/bottom/left*/
padding:10px;

```

- 由于padding是盒子内的一部分，在给盒子设置背景颜色的时候padding中也会有背景颜色，但是margin中是没有的

### border盒子的边框

- border-width: 边框的宽度(上 - 右 - 下 - 左 的顺序) `border-width:thin medium thick 10px;`

- border-style: 边框的样式 `border-style:dotted solid double dashed;`

- border-color: 边框的颜色。`border-color:red green blue pink;`

- 连写模式

```css
border: border-width border-style border-color;
```

- [border实现三角形](http://www.cnblogs.com/blosaa/p/3823695.html)

```css
border-width:1px;
border-style:solod;
border-color:#ccc;

border:1px solid #ccc;
```

### margin

- 盒子与盒子之间的距离
- 单独赋值：

```css
margin-top:10px;
margin-right:12px;
margin-bottom:13px;
margin-left:14px;
```

- 连写赋值

```css
/* 上 右 下 左 */
margin: 20px;
/* 上下 左右 */
margin: 20px 40px;
/* 上 左右 下 */
margin:20px 30px 40px;
/* 上 右 下 左 */
margin:20px 30px 40px 50px;
```

- margin的边框合并现象

## GPU加速

- `transform` 3D属性强制开启GPU加速
  - `transform: translateZ(0);`
  - `transform: rotateZ(360deg);`
- `will-change` 即将发生变化，进行优化的属性
- `opacity`
- `filter`

## BFC

- `Block Formatting Context` 块级格式化上下文,形成独立渲染区域
- [前端精选文摘：BFC 神奇背后的原理](http://www.cnblogs.com/lhb25/p/inside-block-formatting-ontext.html)

### 如何触发BFC

- `根元素 : 在块格式化上下文中`
- `float的值不为none`
- `position为absolute或fixed`
- `display的值为 inline-block, flex, inline-flex，table，table-cell，table-caption中的其中一个`
- `overflow的值不为visible`

## css继承

- 可继承的样式
- 不可继承的样式: `margin / padding / border ; a标签的color无法从父级继承`

## 页面元素的显示和隐藏

- `overflow: hidden;` 将超出的部分隐藏。
- `dispaly :none;` 将元素直接隐藏，并且不会在页面上占据位置
- `visibility:hidden;` 将元素直接隐藏，但是会保留元素所在的位置
- `width,height`为`0`
- `raga(0,0,0,0)`; `opacity:0`
- `z-inidex:-1000;`
- `transform:translateX(-10000px)/translateY(-10000px)`
- `text-index:-10000px`

## RGBA与HSLA

- Red、Green、Blue、Alpha即RGBA
- Hue、Saturation、Lightness、Alpha即HSLA

```bash
R、G、B 取值范围0~255
H 色调 取值范围0~360，0/360表示红色、120表示绿色、240表示蓝色
S 饱和度 取值范围0%~100%
L 亮度 取值范围0%~100%
A 透明度 取值范围0~1
```

- `opacity`只能针对整个盒子设置透明度，子盒子及内容会继承父盒子的透明度
- `transparent` 不可调节透明度，始终完全透明

```bash
rgba(0,0,0,0.5);
opacity:0.6；/*盒子半透明,里面的内容也跟着半透明*/
filter:Alpha(opacity=50);/*滤镜*/
```

## link引入css和@import的区别

- `link`属于`html`标签，而`@import`是`css`提供的
- 页面被加载时，link会同时被加载，而`@import`引用的css会等到页面加载结束后加载
- link是html标签，因此没有兼容性，而`@import`只有IE5以上才能识别

```html
<style>
 	@import url('reset.css');
</style>
```

## css3选择器

### 属性选择器

- `E[attr]` 表示存在attr属性即可
- `E[attr=val]` 表示属性值完全等于val
- `E[attr*=val]` 表示的属性值里包含val字符并且在“任意”位置
- `E[attr^=val]` 表示的属性值里包含val字符并且在“开始”位置
- `E[attr$=val]` 表示的属性值里包含val字符并且在“结束”位置

### 伪类选择器

- a伪类顺序 `:link、:visited、:hover、:active、`

- 以某元素相对于其父元素或兄弟元素的位置来获取无素的结构伪类
  - `E:first-child` 第一个子元素
  - `E:last-child` 最后一个子元素
  - `E:nth-child(n)` 第n个子元素，计算方法是E元素的全部兄弟元素
  - `E:nth-last-child(n)` 同E:nth-child(n) 相似，只是倒着计算
- n遵循线性变化，其取值`0、1、2、3、4、...` 但是当`n<=0`时，选取无效
- n可是多种形式：`nth-child(2n)、nth-child(2n+1)、nth-child(-1n+5)...`
- `E:empty` 选中没有任何子节点的E元素
- 目标伪类 `E:target` 结合锚点进行使用，处于当前锚点的元素会被选中

### 伪元素选择器

- `E::first-letter`文本的第一个单词或字
- `E::first-line` 文本第一行
- `E::selection` 可改变选中文本的样式
- `E::before`、`E::after` 是一个行内元素，需要转换成块元素
- 在旧版本`E:after`、`E:before` 是伪类，在新版本里是伪元素
- 在新版本`E:after`、`E:before` 会被自动识别为 `E::after`、`E::before`
- **"`:`" 与 "`::`" 区别在于区分伪类和伪元素**

## css3私有前缀

```bash
-webkit- 指的是chrome的内核 : webkit
-moz- 指的是火狐浏览器  :gecko
-o- 指的欧朋浏览器 : presto
-ms- 指的IE浏览器 : trident
```

## font字体

```bash
font-style: normal(默认值) / italic / oblique / inherit

font-weight: normal / bold / bolder / lighter / 100~900

font-size/line-height：px/px

font-family：字体系列
```

- 连写格式： `font: font-style font-weight font-size/line-height font-family`

- [特殊字符](http://www.w3school.com.cn/tags/html_ref_entities.html)

  | 结果        | 实体名称  | 结果  | 实体名称  |
  | ----------|:-----:|:-----:|:-----:|
  | 空格      | `&nbsp;` | &       |  `&amp;` |
  | ®      |  `&reg;` | ©       |  `&copy;` |
  | <       |  `&lt;` | > | `&gt;`|
  | ¥       |  `&yen;` | ² | `&sup2;` |

## display

- 行内元素: `display:inline;`可以多个标签放在同一行，但是给标签设置宽高没有作用。

```html
a,span,b,u,i,s,ins,del,strong,em
```

- 行内块级元素: `display:inline-block;`可以多个标签放在同一行，并且可以标签设置宽高。
- 块级元素： `display:block;`单独占一行，可以给这个元素设置宽高。

```html
div,p,h1,ul,li,ol,dl
```

- 标签可以通过修改 `display` 的值来改变显示方式

```css
/* 此时为块级元素 */
a{display:block}
```

## position

-	静态定位(标准流) : `position:static`

- 绝对定位 ：`position：absolute`
  - 绝对定位的盒子不占页面上的位置（脱离标准流）
  - 绝对定位以后会影响元素的显示方式：display：inline-block

- 相对定位 ：`position:relative.`相对定位是占据标准流的位置

- 固定定位 ： `position:fixed;`
  - 使用盒子显示浏览器的固定位置
  - 固定定位会脱离标准流
  - 固定定位会改变元素的显示方式
- z-index：用来设置当前盒子所在的层次 `z-index：12；`

## 参考资源

!!! include(docs/web/css/urls.md) !!!

## ie兼容

!!! include(docs/web/css/ie.md) !!!
