---
title: angular1.x的使用记录
date: 2020-07-20
sidebar: "auto"
tags:
  - angular.js
---

## ng 指令

- 描述：ng-?指令表示 angular 框架对元素的操作，常见的有如下几种：



```bash
ng-app  # 定义应用程序的根元素,若不为""时需在js脚本中初始化。
ng-bind  # 把应用程序变量绑定到某个元素的 innerHTML。
ng-controller  # 定义应用的控制器对象，可以控制的服务有
# $scope,$rootScope,$location,$http,$timeout,$interval,
# 其中$scope.$watch('lastName', function() {)); # 可以监控变量的变化

$rootScope # 全局作用域，在任一controller之中都能够使用
$scope # $scope都是$rootScope的子作用域
$state # 路由中的一项服务
$stateParams # 处理url的接收参数

ng-init  # 定义应用的初始化值,一般为angular变量值

ng-hide # 隐藏或显示 HTML 元素
ng-show # 显示或隐藏 HTML 元素

ng-href # 为<a>元素指定链接

ng-if # 如果条件为 false 移除 HTML 元素
ng-repeat # 定义集合中每项数据的模板,该参数还常与ng-click、ng-class配合使用
  $index, $first, $middle, $last, $even, $odd

ng-switch # 规定显示或隐藏子元素的条件。常与ng-switch-when配合使用，类似于switch和case

ng-include # 在应用中包含 HTML 文件，如<div ng-include="'myFile.htm'"></div>,但不能执行js代码

ng-non-bindable # 规定元素或子元素不能绑定数据,
# 如<p ng-non-bindable>不使用 AngularJS: {{ 5+5 }}</p>显示的是“5+5”而不是“10”

ng-open # 指定元素的 open 属性,可设值为true|false,常与details等具展开效果的元素配合使用
	<details ng-open=true>
		<summary>学的不仅是技术，更是梦想！</summary>
		<p> - 菜鸟教程</p>
	</details>

ng-src # 指定 <img> 元素的 src 属性
ng-srcset # 指定 <img> 元素的 srcset 属性。H5的新属性，允许输入多张图片地址以匹配不同w像素值宽度的容器
	<img ng-src="source.jpg" width="100%" ng-srcset="source_400.jpg 400w, source_600.jpg 600w, source_1280.jpg 1280w">
```



### [ng-module](https://docs.angularjs.org/guide/module)



```js
var myFilterModule = angular.module("myFilterApp", []);

// configure the module.
// in this example we will create a greeting filter
myFilterModule.filter("greet", function() {
  return function(name) {
    return "Hello, " + name + "!";
  };
});

var myApp = angular.module("myApp", ["myFilterApp"]);
```

```html
<div ng-app="myApp">
  <div>
    {{ 'World' | greet }}
  </div>
</div>
```

```html
<div ng-controller="XmplController">
  {{ greeting }}
</div>

<script>
  angular
    .module("xmpl.service", [])

    .value("greeter", {
      salutation: "Hello",
      localize: function(localization) {
        this.salutation = localization.salutation;
      },
      greet: function(name) {
        return this.salutation + " " + name + "!";
      }
    })

    .value("user", {
      load: function(name) {
        this.name = name;
      }
    });

  angular.module("xmpl.directive", []);

  angular.module("xmpl.filter", []);

  angular
    .module("xmpl", ["xmpl.service", "xmpl.directive", "xmpl.filter"])

    .run(function(greeter, user) {
      // This is effectively part of the main method initialization code
      greeter.localize({
        salutation: "Bonjour"
      });
      user.load("World");
    })

    .controller("XmplController", [
      "$scope",
      "greeter",
      "user",
      function($scope, greeter, user) {
        $scope.greeting = greeter.greet(user.name);
      }
    ]);
</script>
```



### [ng-init](https://docs.angularjs.org/api/ng/directive/ngInit) 用法



```js
<script>
  angular.module('initExample', [])
    .controller('ExampleController', ['$scope', function($scope) {
      $scope.list = [['a', 'b'], ['c', 'd']];
    }]);
</script>

<div ng-controller="ExampleController">
  <div ng-repeat="innerList in list" ng-init="outerIndex = $index">
    <div ng-repeat="value in innerList" ng-init="innerIndex = $index">
       <span class="example-init">list[ {{outerIndex}} ][ {{innerIndex}} ] = {{value}};</span>
    </div>
  </div>
</div>
```



### [ng-repeat](https://docs.angularjs.org/api/ng/directive/ngRepeat) 用法



```html
<div ng-controller="repeatController">
  I have {{friends.length}} friends. They are:
  <input
    type="search"
    ng-model="q"
    placeholder="filter friends..."
    aria-label="filter friends"
  />
  <ul class="example-animate-container">
    <li
      class="animate-repeat"
      ng-repeat="friend in friends | filter:q as results track by friend.name"
    >
      [{{$index + 1}}] {{friend.name}} who is {{friend.age}} years old.
    </li>
    <li class="animate-repeat" ng-if="results.length === 0">
      <strong>No results found...</strong>
    </li>
  </ul>
</div>

<style media="screen">
  .example-animate-container {
    background: white;
    border: 1px solid black;
    list-style: none;
    margin: 0;
    padding: 0 10px;
  }

  .animate-repeat {
    line-height: 30px;
    list-style: none;
    box-sizing: border-box;
  }

  .animate-repeat.ng-move,
  .animate-repeat.ng-enter,
  .animate-repeat.ng-leave {
    transition: all linear 0.5s;
  }

  .animate-repeat.ng-leave.ng-leave-active,
  .animate-repeat.ng-move,
  .animate-repeat.ng-enter {
    opacity: 0;
    max-height: 0;
  }

  .animate-repeat.ng-leave,
  .animate-repeat.ng-move.ng-move-active,
  .animate-repeat.ng-enter.ng-enter-active {
    opacity: 1;
    max-height: 30px;
  }
</style>

<script>
  angular
    .module("ngRepeat", ["ngAnimate"])
    .controller("repeatController", function($scope) {
      $scope.friends = [
        { name: "John", age: 25, gender: "boy" },
        { name: "Jessie", age: 30, gender: "girl" },
        { name: "Johanna", age: 28, gender: "girl" },
        { name: "Joy", age: 15, gender: "girl" },
        { name: "Mary", age: 28, gender: "girl" },
        { name: "Peter", age: 95, gender: "boy" },
        { name: "Sebastian", age: 50, gender: "boy" },
        { name: "Erika", age: 27, gender: "girl" },
        { name: "Patrick", age: 40, gender: "boy" },
        { name: "Samantha", age: 60, gender: "girl" }
      ];
    });
</script>
```



### [ng-switch](https://docs.angularjs.org/api/ng/directive/ngSwitch) 用法



```html
<div ng-controller="ExampleController">
  <select ng-model="selection" ng-options="item for item in items"> </select>
  <code>selection={{selection}}</code>
  <hr />
  <div class="animate-switch-container" ng-switch on="selection">
    <div
      class="animate-switch"
      ng-switch-when="settings|options"
      ng-switch-when-separator="|"
    >
      Settings Div
    </div>
    <div class="animate-switch" ng-switch-when="home">Home Span</div>
    <div class="animate-switch" ng-switch-default>default</div>
  </div>
</div>

<style media="screen">
  .animate-switch-container {
    position: relative;
    background: white;
    border: 1px solid black;
    height: 40px;
    overflow: hidden;
  }

  .animate-switch {
    padding: 10px;
  }

  .animate-switch.ng-animate {
    transition: all cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s;

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .animate-switch.ng-leave.ng-leave-active,
  .animate-switch.ng-enter {
    top: -50px;
  }
  .animate-switch.ng-leave,
  .animate-switch.ng-enter.ng-enter-active {
    top: 0;
  }
</style>

<script>
  angular
    .module("switchExample", ["ngAnimate"])
    .controller("ExampleController", [
      "$scope",
      function($scope) {
        $scope.items = ["settings", "home", "options", "other"];
        $scope.selection = $scope.items[0];
      }
    ]);
</script>
```



## 指令



```bash
ng-app # 相当于一个入，告诉angular来管理ng-app指令所在的元素及其子元素。
ng-controller # 指定了一个控制来管理页面的数据模型/行为模型。
ng-model # 主要是用来进行双向数据绑定。
ng-click # 类似于onclick,指定一个方法就能运行。

ng-repeat # 渲染数组中的元素。
ng-bind # 为了解决表达式闪烁问题；只能使用在有双标签的元素上。
ng-cloak # 利用了anuglar加载后会移动类样式名为ng-cloak的特性。
ng-bind-html

ng-show/ng-hide # 控制页面元素的显示与否,需要提供一个布尔值。
ng-if # 类似于ng-show,区别是ng-if会彻底删除元素。
ng-switch:ng-switch-when

ng-class:
   多选一：<div ng-class="{'A':'classA','B':classB}["A"]"></div>
   多选多：<div ng-class="{'classA':布尔值,'classB':布尔值}"></div>
```



### [ng-controller as](https://docs.angularjs.org/api/ng/directive/ngController) 用法



```html
<div id="ctrl-as-exmpl" ng-controller="SettingsController1 as settings">
  <label>Name: <input type="text" ng-model="settings.name"/></label>
  <button ng-click="settings.greet()">greet</button><br />
  Contact:
  <ul>
    <li ng-repeat="contact in settings.contacts">
      <select
        ng-model="contact.type"
        aria-label="Contact method"
        id="select_{{$index}}"
      >
        <option>phone</option>
        <option>email</option>
      </select>
      <input
        type="text"
        ng-model="contact.value"
        aria-labelledby="select_{{$index}}"
      />
      <button ng-click="settings.clearContact(contact)">clear</button>
      <button ng-click="settings.removeContact(contact)" aria-label="Remove">
        X
      </button>
    </li>
    <li><button ng-click="settings.addContact()">add</button></li>
  </ul>
</div>

<script>
  angular
    .module("controllerAsExample", [])
    .controller("SettingsController1", SettingsController1);

  function SettingsController1() {
    this.name = "John Smith";
    this.contacts = [
      { type: "phone", value: "408 555 1212" },
      { type: "email", value: "john.smith@example.org" }
    ];
  }

  SettingsController1.prototype.greet = function() {
    alert(this.name);
  };

  SettingsController1.prototype.addContact = function() {
    this.contacts.push({ type: "email", value: "yourname@example.org" });
  };

  SettingsController1.prototype.removeContact = function(contactToRemove) {
    var index = this.contacts.indexOf(contactToRemove);
    this.contacts.splice(index, 1);
  };

  SettingsController1.prototype.clearContact = function(contact) {
    contact.type = "phone";
    contact.value = "";
  };
</script>
```



## 事件



```bash
ng-copy # 用户触发拷贝事件时，规定拷贝事件的行为
ng-cut # 用户触发剪切事件时，规定剪切事件的行为
ng-paste # 用户触发粘贴事件时，规定粘贴事件的行为

ng-click # 规定click 事件的行为
ng-dblclick # 用户触发双击事件时，规定双击事件的行为

ng-blur # 规定 blur 事件的行为
ng-focus # 规定focus焦点事件的行为

ng-keydown # 规定按下按键事件的行为
ng-keypress # 规定按下按键事件的行为,通常情况下会用ng-keydown
ng-keyup # 规定松开按键事件的行为

ng-mousedown # 规定按下鼠标按键时的行为
ng-mouseenter # 规定鼠标指针穿过元素时的行为
ng-mouseleave # 规定鼠标指针离开元素时的行为
ng-mousemove # 规定鼠标指针在指定的元素中移动时的行为
ng-mouseover # 规定鼠标指针位于元素上方时的行为
ng-mouseup # 规定当在元素上松开鼠标按钮时的行为
```



## 样式



```bash
ng-class # 指定 HTML 元素使用的 CSS 类
ng-class-even # 类似 ng-class，但只在偶数行起作用,常用table/tr/td、ul/li等元素配合使用
ng-class-odd # 类似 ng-class，但只在奇数行起作用

ng-style # 指定元素的 style 属性,可在控制器中为ng-style所在变量赋值

*ng-cloak # 在应用正要加载时防止其闪烁。如<p ng-cloak>{{ 5 + 5 }}</p>
```



## from 表单



```bash
ng-submit # 规定submit 事件的行为
ng-value # 规定 input 元素的值
ng-model # 绑定 HTML 控制器的值到应用数据,即angular变量值,变量值可以是字符串、对象甚至是对象属性

ng-selected # 指定元素的 selected 属性,表示当前选择项,常需与select元素配合使用，类似于ng-checked
ng-readonly # 指定元素的 readonly 属性

ng-disabled # 可设为true|false时，规定一个元素是否被禁用,但不会隐藏

ng-change # 规定在内容改变时要执行的表达式
ng-checked # 用于设置复选框(checkbox)或单选按钮(radio)的 checked 属性

ng-list # 输出时将文本转换为列表 (数组)，输入文本时用逗号隔开
	<input ng-model="customers" ng-list/>
	<pre>{{customers}}</pre>

ng-model-options # 规定如何更新模型,option	指定了绑定数据的规则，规则如下:
	{updateOn: 'event'} # 规则指定事件发生后绑定数据,如ng-model-options="{updateOn: 'blur'}"
	{debounce : 1000} # 规定等待多少毫秒后绑定数据
	{allowInvalid : true|false} # 规定是否需要验证后绑定数据
	{getterSetter : true|false} # 规定是否作为 getters/setters 绑定到模型
	{timezone : '0100'} # 规则是否使用时区

ng-options:
在 <select> 下拉列中指定 <options>,
如<select ng-model="selectedName" ng-options="item for item in names"></select>
	数据格式为字符串数组["",""] 使用x for x in names
	数据格式为单独的对象{"a":1,"b":2} 使用x for (x,y) in names
	数据格式为对象数组[{},{}] 使用x.attr for x in names

<option ng-repeat="x in address">{{x}}</option>
```



- form 表单的系统检验指令



```bash
$error.required # 唯一值验证
$error.email # 文本输入内置电子邮件验证。
$error.number # 带有数量验证的文本输入。也可以有最小和最大值的附加属性。
$error.date # 带有输入日期文本输入。
$error.url # 带有输入验证的URL文本输入。
$error.minlength # 参数范围需从input中ng-minlength设置
$error.maxlength # 参数范围需从input中ng-maxlength设置
$error.pattern # 正则表达式需从input中ng-pattern设置
$dirty # 表单有填写记录
$pristine # 表单没有填写记录
$valid # 字段内容合法的,如formname.$valid
$invalid # 字段内容是非法的
```



### [ng-form](https://docs.angularjs.org/api/ng/directive/form) 用法



```html
<form name="myForm" ng-controller="FormController" class="my-form">
  userType: <input name="input" ng-model="userType" required />
  <span class="error" ng-show="myForm.input.$error.required">Required!</span
  ><br />
  <code>userType = {{userType}}</code><br />
  <code>myForm.input.$valid = {{myForm.input.$valid}}</code><br />
  <code>myForm.input.$error = {{myForm.input.$error}}</code><br />
  <code>myForm.$valid = {{myForm.$valid}}</code><br />
  <code>myForm.$error.required = {{!!myForm.$error.required}}</code><br />
</form>

<style>
  .my-form {
    transition: all linear 0.5s;
    background: transparent;
  }
  .my-form.ng-invalid {
    background: red;
  }
</style>

<script>
  angular.module("formExample", []).controller("FormController", [
    "$scope",
    function($scope) {
      $scope.userType = "guest";
    }
  ]);
</script>
```



### [ng-model-options](https://docs.angularjs.org/api/ng/directive/ngModelOptions) 用法



```html
<div ng-controller="ExampleController">
  <form name="userForm">
    <label>
      Name:
      <input
        type="text"
        name="userName"
        ng-model="user.name"
        ng-model-options="{ updateOn: 'blur' }"
        ng-keyup="cancel($event)"
      /> </label
    ><br />
    <label>
      Other data:
      <input type="text" ng-model="user.data" /> </label
    ><br />
  </form>
  <pre>user.name = <span ng-bind="user.name"></span></pre>
</div>

<script>
  angular.module("optionsExample", []).controller("ExampleController", [
    "$scope",
    function($scope) {
      $scope.user = { name: "say", data: "" };

      $scope.cancel = function(e) {
        if (e.keyCode === 27) {
          $scope.userForm.userName.$rollbackViewValue();
        }
      };
    }
  ]);
</script>
```



## angualr 方法



```bash
angular.isArray()	# 如果引用的是数组返回 true
angular.isDate()	# 如果引用的是日期返回 true
angular.isDefined()	# 如果引用的已定义返回 true
angular.isElement()	# 如果引用的是 DOM 元素返回 true
angular.isFunction()	# 如果引用的是函数返回 true
angular.isNumber()	# 如果引用的是数字返回 true,如果输入框是input标签，要检测输入框内容是否为数字，则使用!isNaN($scope.myInput);
angular.isObject()	# 如果引用的是对象返回 true
angular.isString()	# 如果引用的是字符串返回 true
angular.isUndefined()	# 如果引用的未定义返回 true
angular.equals(a,b)	# 如果两个对象相等返回 true

*angular.fromJson()	# 反序列化 JSON 字符串
*angular.toJson()	# 序列化 JSON 字符串

angular.lowercase()	# 将字符串转换为小写
angular.uppercase()	# 将字符串转换为大写

angular.copy()	# 数组或对象深度拷贝

*angular.forEach()	# 对象或数组的迭代函数

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
```



## 自定义指令



```bash
-  template:
指定了一个字符，最终会被加入自定义指令所有标签的innerHTML位置

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

- controller：控制器里的数据在多个实例中公用

- transclude:需要提供一个布尔，为true会把自定义指令
    所在标签的innerHTML插入到模板中拥有ng-transclude指令的元素的innerHTML位置。
    *注意：不能够与replace共用(指的是transclude为true时，replace不能为true)*

- scope:属性
    第一种写法：`scope:{aaa:'@myclass'}` 可以获得自定义指令所在标签中名为myclass的属性值
    第二种写法：`scope:{myclass:'@'}` //第一种的简写方式;

    `@` : 接收外部传入的字符串
    `=` : 接收外部传入的变量
    `&` : 将内部的信息通过function函数传递给外部使用

- link：这个属性指向的是function(scope,element,attributes,controllers),
有三个参数
    scope: 这里的scope下的属性值只能用在模板中, 一定要与控制器中$scope的使用范围区分
    element: 自定义指令所在标签的jqLite对象
    attributes: 是一个object对象，通过它可以获取所有自定义指令所在标签
    controllers: 控制器，与require一起使用

angular.module('docsTabsExample', [])
.directive('myPane', function() {
  return {
    require: ['^^myTabs', 'ngModel'],
    restrict: 'E',
    transclude: true,
    scope: {
      title: '@'
    },
    link: function(scope, element, attrs, controllers) {
      var tabsCtrl = controllers[0],
          modelCtrl = controllers[1];

      tabsCtrl.addPane(scope);
    },
    templateUrl: 'my-pane.html'
  };
});
```



### [ng-transclude](https://docs.angularjs.org/api/ng/directive/ngTransclude) 用法



```html
<script>
  angular
    .module("transcludeExample", [])
    .directive("pane", function() {
      return {
        restrict: "E",
        transclude: true,
        scope: { title: "@" },
        template:
          '<div style="border: 1px solid black;">' +
          '<div style="background-color: gray">{{title}}</div>' +
          "<ng-transclude></ng-transclude>" +
          "</div>"
      };
    })
    .controller("ExampleController", [
      "$scope",
      function($scope) {
        $scope.title = "Lorem Ipsum";
        $scope.text =
          "Neque porro quisquam est qui dolorem ipsum quia dolor...";
      }
    ]);
</script>

<div ng-controller="ExampleController">
  <input ng-model="title" aria-label="title" /> <br />
  <textarea ng-model="text" aria-label="text"></textarea> <br />
  <pane title="{{title}}"><span>{{text}}</span></pane>
</div>
```



### Transclude fallback content



```html
<script>
  angular
    .module("transcludeFallbackContentExample", [])
    .directive("myButton", function() {
      return {
        restrict: "E",
        transclude: true,
        scope: true,
        template:
          '<button style="cursor: pointer;">' +
          "<ng-transclude>" +
          '<b style="color: red;">Button1</b>' +
          "</ng-transclude>" +
          "</button>"
      };
    });
</script>

<!-- fallback button content -->
<my-button id="fallback"></my-button>
<!-- modified button content -->
<my-button id="modified">
  <i style="color: green;">Button2</i>
</my-button>
```



- Multi-slot transclusion



```html
<style>
  .title,
  .footer {
    background-color: gray;
  }
</style>
<div ng-controller="ExampleController">
  <input ng-model="title" aria-label="title" /> <br />
  <textarea ng-model="text" aria-label="text"></textarea> <br />
  <pane>
    <pane-title><a ng-href="{{link}}">{{title}}</a></pane-title>
    <pane-body><p>{{text}}</p></pane-body>
  </pane>
</div>

<script>
  angular
    .module("multiSlotTranscludeExample", [])
    .directive("pane", function() {
      return {
        restrict: "E",
        transclude: {
          title: "?paneTitle",
          body: "paneBody",
          footer: "?paneFooter"
        },
        template:
          '<div style="border: 1px solid black;">' +
          '<div class="title" ng-transclude="title">Fallback Title</div>' +
          '<div ng-transclude="body"></div>' +
          '<div class="footer" ng-transclude="footer">Fallback Footer</div>' +
          "</div>"
      };
    })
    .controller("ExampleController", [
      "$scope",
      function($scope) {
        $scope.title = "Lorem Ipsum";
        $scope.link = "https://google.com";
        $scope.text =
          "Neque porro quisquam est qui dolorem ipsum quia dolor...";
      }
    ]);
</script>
```



### directives controller 用法



```js
angular
  .module("docsTabsExample", [])
  .directive("myTabs", function() {
    return {
      restrict: "E",
      transclude: true,
      scope: {},
      controller: [
        "$scope",
        function MyTabsController($scope) {
          var panes = ($scope.panes = []);
          // title在多个实例中公用
          $scope.title = "controller tab panel";
          $scope.select = function(pane) {
            angular.forEach(panes, function(pane) {
              pane.selected = false;
            });
            pane.selected = true;
          };

          this.addPane = function(pane) {
            if (panes.length === 0) {
              $scope.select(pane);
            }
            panes.push(pane);
          };
        }
      ],
      templateUrl: "my-tabs.html"
    };
  })
  .directive("myPane", function() {
    return {
      require: "^^myTabs",
      restrict: "E",
      transclude: true,
      scope: {
        title: "@"
      },
      link: function(scope, element, attrs, tabsCtrl) {
        tabsCtrl.addPane(scope);
      },
      templateUrl: "my-pane.html"
    };
  });
```

```html
<!-- index.html -->
<my-tabs>
  <my-pane title="Hello">
    <p>Lorem ipsum dolor sit amet</p>
  </my-pane>
  <my-pane title="World">
    <em>Mauris elementum elementum enim at suscipit.</em>
    <p><a href ng-click="i = i + 1">counter: {{i || 0}}</a></p>
  </my-pane>
</my-tabs>
<p>-------------------------</p>
<my-tabs>
  <my-pane title="Angular">
    <p>Lorem ipsum</p>
  </my-pane>
  <my-pane title="Well">
    <em>Mauris elementum .</em>
    <p><a href ng-click="i = i + 1">counter: {{i || 0}}</a></p>
  </my-pane>
</my-tabs>

<!-- my-tab.html -->
<div class="tabbable">
  <div>{{title}}</div>
  <ul class="nav nav-tabs">
    <li ng-repeat="pane in panes" ng-class="{active:pane.selected}">
      <a href="" ng-click="select(pane)">{{pane.title}}</a>
    </li>
  </ul>
  <div class="tab-content" ng-transclude></div>
</div>

<!-- my-pane.html -->
<div class="tab-pane" ng-show="selected">
  <h4>{{title}}</h4>
  <div ng-transclude></div>
</div>
```



### directive scope `&`



```js
angular
  .module("docsIsoFnBindExample", [])
  .controller("Controller", [
    "$scope",
    "$timeout",
    function($scope, $timeout) {
      $scope.name = "Tobias";
      $scope.message = "";
      $scope.hideDialog = function(message) {
        $scope.message = message;
        $scope.dialogIsHidden = true;
        $timeout(function() {
          $scope.message = "";
          $scope.dialogIsHidden = false;
        }, 2000);
      };
    }
  ])
  .directive("myDialog", function() {
    return {
      restrict: "E",
      transclude: true,
      scope: { close: "&onClose" },
      templateUrl: "my-dialog-close.html"
    };
  });
```

```html
# index.html
<div ng-controller="Controller">
  {{message}}
  <my-dialog ng-hide="dialogIsHidden" on-close="hideDialog(message)">
    Check out the contents, {{name}}!
  </my-dialog>
</div>

# my-dialog-close.html
<div class="alert">
  <a href class="close" ng-click="close({message: 'closing for now'})"
    >&times;</a
  >
  <div ng-transclude></div>
</div>
```



### directive scope `@ =`



```js
// script.js
(function(angular) {
  "use strict";
  angular
    .module("docsIsolationExample", [])
    .controller("Controller", [
      "$scope",
      function($scope) {
        $scope.naomi = { name: "Naomi", address: "1600 Amphitheatre" };
        $scope.vojta = { name: "Vojta", address: "3456 Somewhere Else" };
      }
    ])
    .directive("myCustomer", function() {
      return {
        restrict: "E",
        scope: {
          customerInfo: "=info",
          customVajta: "@info"
        },
        templateUrl: "my-customer-plus-vojta.html"
      };
    });
})(window.angular);
```

```html
<!-- my-customer-plus-vojta.html -->
Name: {{customerInfo.name}} Address: {{customerInfo.address}}
<hr />
Name: {{vojta.name}} Address: {{vojta.address}}
<hr />
Name: {{customerInfo}}

<hr />
Name: {{customVajta}}
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Example - example-directive-isolate-2-production</title>
    <script src="//code.angularjs.org/1.7.7/angular.min.js"></script>
    <script src="script.js"></script>
  </head>
  <body ng-app="docsIsolationExample">
    <div ng-controller="Controller">
      <p>--------------naomi---------------</p>
      <my-customer info="naomi"></my-customer>
      <p>--------------vojta---------------</p>
      <my-customer info="aaaa"></my-customer>
    </div>
  </body>
</html>
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
- 一般和 ng-repeat 一起使用，第一个参数，是个字符串：
  字符串前加+或什么都不写时，会按照所对应的数据的属性正向排序，加上-就是逆向排序;
  `<li ng-repeat="item in data |orderBy:'+id'"></li>`

- filter : 也需要一个参数
  - 可以传递一个布尔值，或者字符串，angular 进根据它对数据进行全局查找
  - 也可以传递一个对象，angular 会按照对象的属性到数据中精确查找对应的属性。



```bash
描述：过滤器
uppercase:格式化字符串为大写
lowercase:格式化字符串为小写
currency:格式化为货币符号
limitTo　: 正数，表示从头开始截取；负数表示从尾巴开始截取
number : 格式化为保留小数点
date : 格式化为时间
orderBy:"?":某属性按从小到大排序 ( orderBy:'-id' , id 降序排列   )  ( orderBy:'id',  id 升序排列   )
filter:"?":按条件过滤，如filter:{'name':'iphone'}为查找属性name值为iphone的对象
```



### filter demo



```html
<div ng-app="myApp" ng-controller="myCtrl">
  <input type="text" ng-model="name" />
  <span>大写：{{name | uppercase}}</span>
  <span>小写：{{name | lowercase}}</span>
  <br />
  <p>货币符号：{{ 250 | currency:"RMB" }}</p>
  <p>正数截取4位：{{"1234567890" | limitTo :4}}</p>
  <p>负数截取4位：{{"1234567890" | limitTo:-4}}</p>
  <p>保留2位小数点：{{149016.1945000 | number:2}}</p>
  <p>time转化为时间：{{1490161945000 | date:"yyyy-MM-dd HH:mm:ss"}}</p>
  <p>排序及按条件筛选：</p>
  <input type="text" ng-model="inData" />
  <ul>
    <li ng-repeat="x in names | orderBy:'-country' | filter : inData">
      {{ x.name + ', ' + x.country }}
    </li>
  </ul>
  <p>自定义过滤器，输入一个数值，得到该值+1结果：</p>
  <input type="text" ng-model="inDIY" />
  <p>{{inDIY|addOne}}</p>
  <p>{{inDIY|addOneFilter}}</p>
</div>
```

```js
var app = angular.module("myApp", []);
app.controller("myCtrl", function($scope) {
  $scope.names = [
    {
      name: "Jani",
      country: "Norway"
    },
    {
      name: "Hege",
      country: "Sweden"
    },
    {
      name: "Kai",
      country: "Denmark"
    }
  ];
});
//自定义过滤器
app.filter("addOne", function() {
  return function(i) {
    var result = 0;
    if (!isNaN(i)) {
      result = 1 + parseInt(i);
    }
    return result;
  };
});
//自定义过滤器带参数
app.service("addOneService", function() {
  this.add = function(i) {
    var result = 0;
    if (!isNaN(i)) {
      result = 1 + parseInt(i);
    }
    return result;
  };
});
app.filter("addOneFilter", [
  "addOneService",
  function(addOneService) {
    return function(i) {
      return addOneService.add(i);
    };
  }
]);
```



## angular 服务

- config `允许注入的是provider和constance(常量)`

- run `允许注入的是provider和constant,还可以是factory，service，value`

- angular.run 和 angular.config 有什么不同？`config-->run-->compile/link`

### constant

- constant: `用于定义常量，一旦定义就不能被改变。可以被注入到任何地方，但是不能被装饰器(decorator)装饰`



```js
app.constant("APP_KEY", "a1s2d3f4");
```



### value

- value： `用来定义值。但与 constant 的区别是：可以被修改，可以被 decorator 装饰，不能被注入到 config 中`



```js
app.value("version", "1.0");
```



### decorator

- decorator: `用来装饰其他 provider 的，不过 constant 除外`



```js
var app = angular.module("myApp", []);
app.value("version", "1.0");
app.decorator("version", function($delegate) {
  return $delegate + ".1";
});

app.service("myService", function() {
  this.setA = function() {};
  this.getA = function() {};
  this.foo = function() {};
});
// 装饰myService
app.decorator("myService", function($delegate) {
  // $delegate 代表实际上的 service 实例
  $delegate.greet = function() {
    return "Hello, I am a new function of 'myService'";
  };
});
```



### factory

- factory: 需要返回一个包含数据，方法的对象



```js
// 创建
angular.module("myApp.services").factory("User", function($http) {
  // factory的名字和注入的方法
  var url = "http://localhost:3000";
  //把我们定义的方法和数据都放到一个对象中，并且返回这个对象，这就是factory
  var service = {
    user: {},
    setName: function(newName) {
      service.user["name"] = newName;
    },
    save: function() {
      return $http.post(url + "/users", {
        user: service.user
      });
    }
  };
  return service;
});

// 调用
// 注意：需要使用.config()来配置service的时候不能使用factory的方法
angular.module("myApp").controller("MainCtrl", function($scope, User) {
  //User就是factory的名字
  //我们将User这个factory中的一个叫做save()的function赋给我们controller中的变量
  $scope.saveUser = User.save;
});
```



### service

- service



```js
// 创建
angular.module("myApp.services").service("User", function($http) {
  // 在这里注入我们需要的服务
  var self = this;
  // 由于service()是通过构造函数创建的，
  // 那么service()中的function和data都要以this.data和this.function的方式进行声明
  // service()方法会持有构造函数创建的对象
  this.user = {};
  this.url = "http://localhost:3000";
  this.setName = function(newName) {
    self.user["name"] = newName;
  };
  this.save = function() {
    return $http.post(self.url + "/users", {
      user: self.user
    });
  };
});

// 调用
// 注意：需要使用.config()来配置service的时候不能使用service的方法
angular.module("myApp").controller("MainCtrl", function($scope, User) {
  //注入名字为User的service
  //用User中名字叫做的save的function给本地变量赋值
  $scope.saveUser = User.save;
});
```



### provider

- provider: 创建 provider，与 factory、service 不同的是，provider 需要使用 `this.$get` 来返回方法和数据, 可以在 config 中被调用和配置



```js
var app = angular.module("myApp", []);

// 在.config()中配置provider
app.config(function (myFirstProvider) {
  myFirstProvider.name = "zhangsan";
});

// 创建
app.provider("myFirst", function () {
  this.$get = function () {
    var that = this;
    var service = {};
    service.console = function () {
      return that.name;
    }
    return service;
  }
});

// 调用
// provider 可以在 config 中调用
app.controller("CartController", ["myFirst", "$scope", function (a, b) {
  console.log(a.console());
  b.name = "lisi";
}]);

--------------
// other 1
var myApp = angular.module('app',[]);

myApp.provider('HelloAngular',function(){
	return {
		$get:function(){
			var name = 'xiaowang';
			function getName(){
				return name;
			}
			return {
				getName:getName
			}
		}
	}
})

myApp.controller('myCtrl', ['$scope','HelloAngular', function($scope,HelloAngular){
	$scope.name = HelloAngular.getName();
}])

-------------
// other 2
var myApp = angular.module('app',[],function($provide){
	console.log('1');
	// 自定义服务
	$provide.provider('CustomService',function(){
		this.$get = function(){
			return {
				message : 'CustomService Message'
			}
		}
	})
});

myApp.controller('ctrl',['$scope','CustomService',function($scope,CustomService){
	console.log('2');
	$scope.name = '小明';
	console.log(CustomService.message)
}]);
```



## 扩展小知识

- track by \$index 解决 ng-repeat 遍历数组时有重复问题

- 使用$scope.$apply()通过 anuglar 监视数据模型的变化。
  - setInterval()
  - setTimeout()
- \$route ,提供一个方法，用于更新路由参数

  - \$route.updateParams({page:2})//需要传入一个对象：就路由中的参数名及新的参数值;

- 在一个页面里创建多个 ng-app



```js
<div id="A1" ng-app="app1">
	<input ng-model="name" type="text" placeholder="请输入姓名">
	<p>我的姓名： {{name}}</p>
</div>

<div id="A2" ng-app="app2">
	<input ng-model="age" type="number" placeholder="请输入年龄">
	<p>我的年龄: {{age}}</p>
</div>
<script type="text/javascript">
	var app1 = angular.module("app1", []); //自动加载
	var app2 = angular.module("app2", []); //手动加载
	angular.bootstrap(document.getElementById("A2"), ['app2']); // 手动加载2
</script>
```



## 相关链接

- [docs angularjs](http://docs.angularjs.org)
- [angularjs1.6.x 实例教程](https://blog.csdn.net/zeping891103/article/details/77446544?locationNum=9&fps=1)
- [AngularJS 学习笔记](https://www.zouyesheng.com/angular.html)
- [AngularStrap](http://mgcrea.github.io/angular-strap/#/getting-started)
- [learning_angular doc](https://hairui219.gitbooks.io/learning_angular/content/zh/chapter01.html)
- [AngularJs 父子级 Controller 传递数据](https://www.cnblogs.com/zhujiabin/p/5090808.html)
