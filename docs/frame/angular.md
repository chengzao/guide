# angular1.x

## ng

- 描述：ng-?指令表示angular框架对元素的操作，常见的有如下几种：

```js
ng-app:定义应用程序的根元素,若不为""时需在js脚本中初始化。
ng-bind:把应用程序变量绑定到某个元素的 innerHTML。
ng-controller:定义应用的控制器对象，可以控制的服务有$scope,$rootScope,$location,$http,$timeout,$interval,其中$scope.$watch('lastName', function() {)); 可以监控变量的变化

ng-init:定义应用的初始化值,一般为angular变量值

ng-hide:隐藏或显示 HTML 元素
ng-show:显示或隐藏 HTML 元素

ng-href:为<a>元素指定链接

ng-if:如果条件为 false 移除 HTML 元素
ng-repeat:定义集合中每项数据的模板,该参数还常与ng-click、ng-class配合使用
ng-switch:规定显示或隐藏子元素的条件。常与ng-switch-when配合使用，类似于switch和case

ng-include:在应用中包含 HTML 文件，如<div ng-include="'myFile.htm'"></div>,但不能执行js代码

*ng-non-bindable:规定元素或子元素不能绑定数据,如<p ng-non-bindable>不使用 AngularJS: {{ 5+5 }}</p>显示的是“5+5”而不是“10”

*ng-open:指定元素的 open 属性,可设值为true|false,常与details等具展开效果的元素配合使用
	<details ng-open=true>
		<summary>学的不仅是技术，更是梦想！</summary>
		<p> - 菜鸟教程</p>
	</details>

ng-src:指定 <img> 元素的 src 属性
*ng-srcset:指定 <img> 元素的 srcset 属性。H5的新属性，允许输入多张图片地址以匹配不同w像素值宽度的容器
	<img ng-src="source.jpg" width="100%" ng-srcset="source_400.jpg 400w, source_600.jpg 600w, source_1280.jpg 1280w">
```

## 指令

```js
- ng-app:相当于一个入，告诉angular来管理ng-app指令所在的元素及其子元素。
- ng-controller：指定了一个控制来管理页面的数据模型/行为模型。
- ng-model:主要是用来进行双向数据绑定。
- ng-click:类似于onclick,指定一个方法就能运行。
- ng-init:
- ng-repeat:渲染数组中的元素。
- ng-bind:为了解决表达式闪烁问题；只能使用在有双标签的元素上。
- ng-cloak:利用了anuglar加载后会移动类样式名为ng-cloak的特性。
- ng-bind-html:
- ng-class:
    + 多选一：<div ng-class="{'A':'classA','B':classB}["A"]"></div>
    + 多选多：<div ng-class="{'classA':布尔值,'classB':布尔值}></div>
- ng-show/ng-hide：控制页面元素的显示与否,需要提供一个布尔值。
- ng-if:类似于ng-show,区别是ng-if会彻底删除元素。
- ng-switch:ng-siwtch-when
```

## 事件

```js
ng-copy:用户触发拷贝事件时，规定拷贝事件的行为
ng-cut:用户触发剪切事件时，规定剪切事件的行为
ng-paste:用户触发粘贴事件时，规定粘贴事件的行为

ng-click:规定click 事件的行为
ng-dblclick:用户触发双击事件时，规定双击事件的行为

ng-blur:规定 blur 事件的行为
ng-focus:规定focus焦点事件的行为

ng-keydown:规定按下按键事件的行为
ng-keypress:规定按下按键事件的行为,通常情况下会用ng-keydown
ng-keyup:规定松开按键事件的行为

ng-mousedown:规定按下鼠标按键时的行为
ng-mouseenter:规定鼠标指针穿过元素时的行为
ng-mouseleave:规定鼠标指针离开元素时的行为
ng-mousemove:规定鼠标指针在指定的元素中移动时的行为
ng-mouseover:规定鼠标指针位于元素上方时的行为
ng-mouseup:规定当在元素上松开鼠标按钮时的行为
```

## 样式

```js
ng-class:指定 HTML 元素使用的 CSS 类
ng-class-even:类似 ng-class，但只在偶数行起作用,常用table/tr/td、ul/li等元素配合使用
ng-class-odd:类似 ng-class，但只在奇数行起作用

ng-style:指定元素的 style 属性,可在控制器中为ng-style所在变量赋值

*ng-cloak:在应用正要加载时防止其闪烁。如<p ng-cloak>{{ 5 + 5 }}</p>
```

## from表单

```js
ng-submit:规定submit 事件的行为
ng-value:规定 input 元素的值
ng-model:绑定 HTML 控制器的值到应用数据,即angular变量值,变量值可以是字符串、对象甚至是对象属性

ng-selected:指定元素的 selected 属性,表示当前选择项,常需与select元素配合使用，类似于ng-checked
ng-readonly:指定元素的 readonly 属性

ng-disabled:可设为true|false时，规定一个元素是否被禁用,但不会隐藏

ng-change:规定在内容改变时要执行的表达式
ng-checked:用于设置复选框(checkbox)或单选按钮(radio)的 checked 属性

*ng-list:输出时将文本转换为列表 (数组)，输入文本时用逗号隔开
	<input ng-model="customers" ng-list/>
	<pre>{{customers}}</pre>

*ng-model-options:规定如何更新模型,option	指定了绑定数据的规则，规则如下:
	{updateOn: 'event'}规则指定事件发生后绑定数据,如ng-model-options="{updateOn: 'blur'}"
	{debounce : 1000} 规定等待多少毫秒后绑定数据
	{allowInvalid : true|false} 规定是否需要验证后绑定数据
	{getterSetter : true|false} 规定是否作为 getters/setters 绑定到模型
	{timezone : '0100'} 规则是否使用时区

ng-options:在 <select> 下拉列中指定 <options>,如<select ng-model="selectedName" ng-options="item for item in names"></select>
	数据格式为字符串数组["",""] 使用x for x in names
	数据格式为单独的对象{"a":1,"b":2} 使用x for (x,y) in names
	数据格式为对象数组[{},{}] 使用x.attr for x in names

<option ng-repeat="x in address">{{x}}</option>
```

## angualr方法

```js
angular.isArray()	如果引用的是数组返回 true
angular.isDate()	如果引用的是日期返回 true
angular.isDefined()	如果引用的已定义返回 true
angular.isElement()	如果引用的是 DOM 元素返回 true
angular.isFunction()	如果引用的是函数返回 true
angular.isNumber()	如果引用的是数字返回 true,如果输入框是input标签，要检测输入框内容是否为数字，则使用!isNaN($scope.myInput);
angular.isObject()	如果引用的是对象返回 true
angular.isString()	如果引用的是字符串返回 true
angular.isUndefined()	如果引用的未定义返回 true
angular.equals(a,b)	如果两个对象相等返回 true

*angular.fromJson()	反序列化 JSON 字符串
*angular.toJson()	序列化 JSON 字符串

angular.lowercase()	将字符串转换为小写
angular.uppercase()	将字符串转换为大写

angular.copy()	数组或对象深度拷贝

*angular.forEach()	对象或数组的迭代函数
/*
var objs = [{a: 1}, {a: 2}];
angular.forEach(objs, function(data, index, array) {
	//data等价于array[index]
	console.log(data.a + '=' + array[index].a);
});

var objs = {"a":1,"b":2}
angular.forEach(objs, function(data, index, array) {
	//1 "a" {a: 1, b: 2}
	console.log(data,index,array);
});
*/
```

## 自定义指令

```bash
-  template:
指定了一个字符，最终会被加入自定义指令所有标签的innerHTML位置；
-  templateUrl:
    + 指定了一个文件路径，最终angular会发一个异步请求
      把文件内容加入到自定义指令所在标签的innerHTML位置。
    + 也可以指定一个script标签的id,`templateUrl:'id值'` ,
      会将这个script标签中的内容以字符串的形式加入到页面，
      需要更改script标签中的type属性：type="text/ng-template"

- replace:告诉angular,用template对应的字符串替换自定义指令所在的标签。
- restrict:限制自定义指令的使用方式：
    +'A':attribue :需要以属性的形式书写自定义指令。'<div my-zhiling></div>'
    +'C':class :以类样式名的形式来书指令。   '<div class="my-zhiling"></div>'
    +'E':element:以自定义标签的形式来书写指令 '<my-zhiling></my-zhiling>'
    +'M':comment:以注释的形式来书写指令  <!-- directive: my-zhiling -->
- transclude:需要提供一个布尔，为true会把自定义指令
    所在标签的innerHTML插入到模板中拥有ng-transclude指令的元素的innerHTML位置。
    *注意：不能够与replace共用(指的是transclude为true时，replace不能为true)*
- scope:属性
    + 第一种写法：`scope:{aaa:'@myclass'}` 可以获得自定义指令所在标签中名为myclass的属性值
    + 第二种写法：`scope:{myclass:'@'}` //第一种的简写方式;

- link：这个属性指向的是function(scope,element,attributes),
有三个参数
    +这三个参数名是随便起
    + scope参数，类似于控制器的$scope，
    *注意：只不过这里的scope下的属性值只能用在模板中，
    一定要与控制器中$scope的使用范围区分*
    + element:自定义指令所在标签的jqLite对象
    + attributes:是一个object对象，通过它可以获取所有自定义指令所在标签的指令。
```

## 过滤器(filter)

- date : 格式化显示数据

```html
    <!-- 需要传递参数告诉它，要按照我们想要的格式去显示
        yyyy 表示年
        MM 表示月
        dd 表示日
        HH 表示小时
        mm 表示分钟,
        ss 表示秒数
    -->
    <p>{{9838232323 | date :'yyyy年MM月dd日 HH:mm:ss'}}</p>
```

- orderBy: 对我们数据进行排序
- 一般和ng-repeat一起使用，第一个参数，是个字符串：
  字符串前加+或什么都不写时，会按照所对应的数据的属性正向排序，加上-就是逆向排序;
`<li  ng-repeat="item in data |orderBy:'+id'"></li>`

- filter : 也需要一个参数
  - 可以传递一个布尔值，或者字符串，angular进根据它对数据进行全局查找
  - 也可以传递一个对象，angular会按照对象的属性到数据中精确查找对应的属性。

## 扩展小知识

- track by $index 解决ng-repeat 遍历数组时有重复问题

- 使用$scope.$apply()通过anuglar监视数据模型的变化。
  - setInterval()
  - setTimeout()
- $route ,提供一个方法，用于更新路由参数
  - $route.updateParams({page:2})//需要传入一个对象：就路由中的参数名及新的参数值;

## 参考链接

- [AngularJS1.x快速入门](https://blog.csdn.net/qq_14992199/article/details/70828866)
- [docs angularjs](http://docs.angularjs.org)
- [angularjs1.6.x实例教程](https://blog.csdn.net/zeping891103/article/details/77446544?locationNum=9&fps=1)
- [AngularJS学习笔记](https://www.zouyesheng.com/angular.html)
- [AngularStrap](http://mgcrea.github.io/angular-strap/#/getting-started)
- [angularjs.net doc](http://www.angularjs.net.cn/phonecat/7.html)
- [learning_angular doc](https://hairui219.gitbooks.io/learning_angular/content/zh/chapter01.html)
- [AngularJs 父子级Controller传递数据](https://www.cnblogs.com/zhujiabin/p/5090808.html)
- [dolymood/learning-angular](https://github.com/dolymood/learning-angular/blob/translation/00-1-spin.html)
- [UI-Router for AngularJS (1.x)](https://ui-router.github.io/ng1/tutorial/hellogalaxy)
- [让Directive动起来link()](https://hairui219.gitbooks.io/learning_angular/content/zh/chapter05_5.html)
- [使用CSS3 BACKFACE-VISIBILITY属性制作翻转动画效果](https://www.cnblogs.com/zhangxiaopeng/p/5724832.html)
- [UI-Router for AngularJS (1.x)](https://ui-router.github.io/ng1/tutorial/hellosolarsystem)
- [创建你自己的AngularJS -- 第一部分 Scopes（一）](http://www.html-js.com/article/1863)
