---
title: 工具方法集合
date: 2020-07-20
sidebar: "auto"
tags:
  - currying
  - 水印
categories:
  - frontend
---


## currying 柯里化

- 逐步接收参数，并缓存供后期计算使用
- 不立即计算，延后执行
- 符合计算的条件，将缓存的参数，统一传递给执行方法

```js
let log = console.log.bind(console);
function currying(fn) {
  var allArgs = []; // 用来接收参数

  return function next() {
    var args = [].slice.call(arguments);

    // 判断是否执行计算
    if (args.length > 0) {
      // 收集传入的参数，进行缓存
      allArgs = allArgs.concat(args);
      return next;
    } else {
      // 符合执行条件，执行计算
      return fn.apply(null, allArgs);
    }
  };
}

var add = currying(function() {
  var sum = 0;
  for (var i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  log(sum);
  return sum;
});

add(1, 2, 3)(4)();
```

## currying 扩展

```js
function currying(fn) {
  var allArgs = [];

  function next() {
    var args = [].slice.call(arguments);
    allArgs = allArgs.concat(args);
    return next;
  }
  // 隐式调用valueOf和toString方法
  // 字符类型
  next.toString = function() {
    return fn.apply(null, allArgs);
  };
  // 数值类型
  next.valueOf = function() {
    return fn.apply(null, allArgs);
  };

  return next;
}
var add = currying(function() {
  var sum = 0;
  for (var i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
});

add(1, 2, 3)(4)(5);
```

- es6

```js
const curry = (fn, arr = []) => (...args) =>
  (arg => (arg.length === fn.length ? fn(...arg) : curry(fn, arg)))([
    ...arr,
    ...args
  ]);

let curryTest = curry((a, b, c, d) => a + b + c + d);
curryTest(1, 2, 3)(4); //返回10
curryTest(1, 2)(4)(3); //返回10
curryTest(1, 2)(3, 4); //返回10
```

## 判断是否包含ua

```js
export const getCurrentUA = () => window.navigator.userAgent.toLowerCase()

/**
 * 返回是否包含ua的布尔值
 * @param {string} ua
 * @returns boolean
 */
export const includesUA = (ua) => {
  if (!ua) throw new Error('includesUA: ua is required')
  const newUA = ua.replace(/(^\s*)|(\s*$)/g, '') // remove space
  const reg = new RegExp('\\b' + newUA + '\\b')
  return reg.test(getCurrentUA())
}
```

## 水印watermark

```js
function watermark(text) {
	//默认设置
	let defaultSettings = {
		watermark_txt: text,
		watermark_x: 20, //水印起始位置x轴坐标
		watermark_y: 20, //水印起始位置Y轴坐标
		watermark_rows: 20, //水印行数
		watermark_cols: 20, //水印列数
		watermark_x_space: 100, //水印x轴间隔
		watermark_y_space: 50, //水印y轴间隔
		watermark_color: "#aaa", //水印字体颜色
		watermark_alpha: 0.4, //水印透明度
		watermark_fontsize: "15px", //水印字体大小
		watermark_font: "微软雅黑", //水印字体
		watermark_width: 210, //水印宽度
		watermark_height: 80, //水印长度
		watermark_angle: 15, //水印倾斜度数
	}
	//采用配置项替换默认值，作用类似jquery.extend
	if (arguments.length === 1 && typeof arguments[0] === "object") {
		let src = arguments[0] || {}
		for (let key in src) {
			if (
				src[key] &&
				defaultSettings[key] &&
				src[key] === defaultSettings[key]
			)
				continue
			else if (src[key]) defaultSettings[key] = src[key]
		}
	}

	let oTemp = document.createDocumentFragment()

	//获取页面最大宽度
	let page_width = Math.max(
		document.body.scrollWidth,
		document.body.clientWidth,
	)
	let cutWidth = page_width * 0.015
	page_width = page_width - cutWidth
	//获取页面最大高度
	let page_height = Math.max(
		document.body.scrollHeight,
		document.body.clientHeight,
	)
	// var page_height = document.body.scrollHeight+document.body.scrollTop;
	//如果将水印列数设置为0，或水印列数设置过大，超过页面最大宽度，则重新计算水印列数和水印x轴间隔
	if (
		defaultSettings.watermark_cols == 0 ||
		parseInt(
			defaultSettings.watermark_x +
				defaultSettings.watermark_width *
					defaultSettings.watermark_cols +
				defaultSettings.watermark_x_space *
					(defaultSettings.watermark_cols - 1),
		) > page_width
	) {
		defaultSettings.watermark_cols = parseInt(
			(page_width -
				defaultSettings.watermark_x +
				defaultSettings.watermark_x_space) /
				(defaultSettings.watermark_width +
					defaultSettings.watermark_x_space),
		)
		defaultSettings.watermark_x_space = parseInt(
			(page_width -
				defaultSettings.watermark_x -
				defaultSettings.watermark_width *
					defaultSettings.watermark_cols) /
				(defaultSettings.watermark_cols - 1),
		)
	}
	//如果将水印行数设置为0，或水印行数设置过大，超过页面最大长度，则重新计算水印行数和水印y轴间隔
	if (
		defaultSettings.watermark_rows == 0 ||
		parseInt(
			defaultSettings.watermark_y +
				defaultSettings.watermark_height *
					defaultSettings.watermark_rows +
				defaultSettings.watermark_y_space *
					(defaultSettings.watermark_rows - 1),
		) > page_height
	) {
		defaultSettings.watermark_rows = parseInt(
			(defaultSettings.watermark_y_space +
				page_height -
				defaultSettings.watermark_y) /
				(defaultSettings.watermark_height +
					defaultSettings.watermark_y_space),
		)
		defaultSettings.watermark_y_space = parseInt(
			(page_height -
				defaultSettings.watermark_y -
				defaultSettings.watermark_height *
					defaultSettings.watermark_rows) /
				(defaultSettings.watermark_rows - 1),
		)
	}
	let x
	let y
	for (let i = 0; i < defaultSettings.watermark_rows; i++) {
		y =
			defaultSettings.watermark_y +
			(defaultSettings.watermark_y_space +
				defaultSettings.watermark_height) *
				i
		for (let j = 0; j < defaultSettings.watermark_cols; j++) {
			x =
				defaultSettings.watermark_x +
				(defaultSettings.watermark_width +
					defaultSettings.watermark_x_space) *
					j

			let mask_div = document.createElement("div")
			mask_div.id = "mask_div" + i + j
			mask_div.className = "mask_div"
			mask_div.appendChild(
				document.createTextNode(defaultSettings.watermark_txt),
			)
			//设置水印div倾斜显示
			mask_div.style.webkitTransform =
				"rotate(-" + defaultSettings.watermark_angle + "deg)"
			mask_div.style.MozTransform =
				"rotate(-" + defaultSettings.watermark_angle + "deg)"
			mask_div.style.msTransform =
				"rotate(-" + defaultSettings.watermark_angle + "deg)"
			mask_div.style.OTransform =
				"rotate(-" + defaultSettings.watermark_angle + "deg)"
			mask_div.style.transform =
				"rotate(-" + defaultSettings.watermark_angle + "deg)"
			mask_div.style.visibility = ""
			mask_div.style.position = "absolute"
			mask_div.style.left = x + "px"
			mask_div.style.top = y + "px"
			mask_div.style.overflow = "hidden"
			mask_div.style.zIndex = "9999"
			mask_div.style.pointerEvents = "none" //pointer-events:none  让水印不遮挡页面的点击事件
			//mask_div.style.border="solid #eee 1px";
			mask_div.style.opacity = defaultSettings.watermark_alpha
			mask_div.style.fontSize = defaultSettings.watermark_fontsize
			mask_div.style.fontFamily = defaultSettings.watermark_font
			mask_div.style.color = defaultSettings.watermark_color
			mask_div.style.textAlign = "center"
			mask_div.style.width = defaultSettings.watermark_width + "px"
			mask_div.style.height = defaultSettings.watermark_height + "px"
			mask_div.style.display = "block"
			oTemp.appendChild(mask_div)
		}
	}
	document.body.appendChild(oTemp)
}

export default watermark
```