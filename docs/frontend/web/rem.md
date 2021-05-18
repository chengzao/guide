---
title: 使用rem和viewport的注意事项
date: 2020-07-20
sidebar: "auto"
tags:
  - viewport
  - rem
---

## dpr

- dpr: 物理像素数和 css 像素被称为设备像素比
- dpr 的值，js 通过`window.devicePixelRadio`获取
- dpr 的值，css 通过`-webkit-device-pixel-ratio | -webkit-min-device-pixel-ratio | -webkit-max-device-pixel-ratio`获取
- 物理像素（physical pixel）: 手机屏幕上显示的最小单元
- 设备独立像素（density-indenpendent pixel）: 逻辑像素(css 像素数)
- 设备像素比（device pixel ratio）: `设备像素比(dpr) = 物理像素/设备独立像素`

## viewport

- [移动端适配总结@juejin
  ](https://juejin.im/post/5c0dd7ac6fb9a049c43d7edc)
- layoutviewport: 大于实际屏幕,通过 document.documentElement.clientWidth 获取
- visualviewport: 当前显示在屏幕上的页面，即浏览器可视区域的宽度
- idealviewport: 为浏览器定义的可完美适配移动端的理想 viewport，固定不变，可以认为是设备视口宽度。比如 iphone 7 为 375px, iphone 7p 为 414px

## viewport 设置

- `head meta`

```html
<meta
  name="viewport"
  content="width=device-width,initial-scale=1,user-scale=no"
/>
```

- `width` 设置的是 `layoutviewport` 的宽度
- `initial-scale` 设置页面的初始缩放值，并且这个初始缩放值是相对于 idealviewport 缩放的，最终得到的结果不仅会决定 visualviewport，还会影响到 layoutviewport
- `user-scalable` 是否允许用户进行缩放的设置

## rem 示例 1

- js

```js
// 动态计算 页面宽度/一个比例值（比如 10 或者 15）= 1rem

// iphone6: 750; 分成100份 1rem = 750/100 即 html 的宽度为 7.5rem（750 / 100）
// html(font-size) = deviceWidth / 7.5

(function() {
  document.addEventListener(
    "DOMContentLoaded",
    function(e) {
      document.getElementsByTagName("html")[0].style.fontSize =
        window.innerWidth / 7.5 + "px";
    },
    false
  );
})();
```

- scss

```scss
/* 单位px转化为rem */
@function px2rem($px) {
  @return #{$px / 100}rem;
}

/* 设置字体大小，不使用rem单位， 根据dpr值分段调整 */
@mixin font-size($fontSize) {
  font-size: $fontSize / $design-dpr;

  [data-dpr="2"] & {
    font-size: $fontSize / $design-dpr * 2;
  }

  [data-dpr="3"] & {
    font-size: $fontSize / $design-dpr * 3;
  }
}
```

## rem 示例 2

- js

```js
!(function() {
  var docElem = document.documentElement,
    metaElem = document.querySelector('meta[name="viewport"]'),
    dpr = window.devicePixelRatio || 1,
    // 将页面分为10块
    blocks = 10,
    // 需要限制的最小宽度
    defaultMinWidth = 320,
    // 需要限制的最大宽度
    defaultMaxWidth = 540,
    // 计算的基准值
    calcMaxWidth = 9999999;

  if (!metaElem) {
    metaElem = initMetaViewport();
  }

  if (metaElem.getAttribute("data-content-max") !== null) {
    calcMaxWidth = defaultMaxWidth;
  }

  // 确保meta[name="viewport"]存在
  function initMetaViewport() {
    var meta = document.createElement("meta");

    meta.setAttribute("name", "viewport");
    meta.setAttribute(
      "content",
      "width=device-width,initial-scale=1,user-scalable=no"
    );
    document.head.appendChild(meta);

    return meta;
  }

  // 大部分dpr为2以下的安卓机型不识别scale，需设置不缩放
  if (navigator.appVersion.match(/android/gi) && dpr <= 2) {
    dpr = 1;
  }

  setScale(dpr);

  // 企业QQ设置了scale后，不能完全识别scale（此时clientWidth未收到缩放的影响而翻倍），需设置不缩放
  if (navigator.appVersion.match(/qq\//gi) && docElem.clientWidth <= 360) {
    dpr = 1;
    setScale(dpr);
  }

  docElem.setAttribute("data-dpr", dpr);

  // 设置缩放
  function setScale(dpr) {
    metaElem.setAttribute(
      "content",
      "initial-scale=" +
        1 / dpr +
        ",maximum-scale=" +
        1 / dpr +
        ",minimum-scale=" +
        1 / dpr +
        ",user-scalable=no"
    );
  }

  // 设置docElem字体大小
  function setFontSize() {
    var clientWidth = docElem.clientWidth;

    clientWidth = Math.max(clientWidth, defaultMinWidth * dpr);

    // 调整计算基准值
    if (calcMaxWidth === defaultMaxWidth) {
      clientWidth = Math.min(clientWidth, defaultMaxWidth * dpr);
    }

    docElem.style.fontSize = clientWidth / blocks + "px";
  }

  setFontSize();

  window.addEventListener(
    window.orientationchange ? "orientationchange" : "resize",
    setFontSize,
    false
  );
})();
```

- px 和 rem

```scss
/* 移动端页面设计稿宽度 */
$design-width: 750;
/* 将移动端页面分为10块 */
$blocks: 10;

/* 单位px转化为rem */
@function px2rem($px) {
  @return #{$px / $design-width * $blocks}rem;
}

/* 单位rem转化为px，可用于根据rem单位快速计算原px */
@function rem2px($rem) {
  @return #{$rem / $blocks * $design-width}px;
}
```

## 根据 dpr 选择图片

```scss
@mixin bg(url, type) {
  background-image: url(url+"."+type);

  @media only screen and (-webkit-min-device-pixel-ratio: 2) {
    background-image: url(url+"@2x."+type);
  }

  @media only screen and (-webkit-min-device-pixel-ratio: 3) {
    background-image: url(url+"@3x."+type);
  }
}

#test {
  width: 100px;
  height: 100px;
  background-color: yellow;
  @include bg("../assets/test", "jpg");
}
```

## 根据 dpr 设置 font-size

- 设置字体大小，不使用 rem 单位，根据 dpr 值分段调整

```scss
/* 移动端页面设计稿dpr基准值 */
$design-dpr: 2;

@mixin font-size($fontSize) {
  font-size: $fontSize / $design-dpr;

  [data-dpr="2"] & {
    font-size: $fontSize / $design-dpr * 2;
  }

  [data-dpr="3"] & {
    font-size: $fontSize / $design-dpr * 3;
  }
}
```

## dpr 设置容器大小

```scss
/* 缩放所支持的设备最小宽度 */
$min-device-width: 320px;
/* 缩放所支持的设备最大宽度 */
$max-device-width: 540px;

/* 设置容器拉伸的最小宽度 */
@mixin container-min-width() {
  margin-right: auto;
  margin-left: auto;
  min-width: $min-device-width;

  @media (-webkit-device-pixel-ratio: 2) {
    min-width: $min-device-width * 2;
  }

  @media (-webkit-device-pixel-ratio: 3) {
    min-width: $min-device-width * 3;
  }
}

/* 设置容器拉伸的最大宽度 */
@mixin container-max-width() {
  margin-right: auto;
  margin-left: auto;
  max-width: $max-device-width;

  @media (-webkit-device-pixel-ratio: 2) {
    max-width: $max-device-width * 2;
  }

  @media (-webkit-device-pixel-ratio: 3) {
    max-width: $max-device-width * 3;
  }
}
```

## pxtorem

- [postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport)
- [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem)

- 项目目录

```bash
├── gulpfile.js
├── output
├── package-lock.json
├── package.json
└── src
    ├── index.js
    ├── m
    │   └── m.css
    ├── other
    │   ├── m
    │   │   └── other-m.css
    │   └── pc
    │       └── other-pc.css
    └── pc
        └── pc.css
```

- `gulpfile.js`

```js
// 将 `src/xxx/m/xxx.css`转换为rem

const { src, dest } = require('gulp');
var postcss = require('gulp-postcss');
var pxtorem = require('postcss-pxtorem');
exports.default = function() {
    // https://github.com/cuth/postcss-pxtorem 配置
    var processors = [
        pxtorem({
            replace: true,
            propList: ['*'],
            exclude: function(path) {
                const matchPath = /src\/(.+\/)*m\//.test(path)
                return !matchPath
            }
        })
    ];

    return src('src/**/*.css')
        .pipe(postcss(processors))
        .pipe(dest('output/css'));
}
```

## vw 和 vh

- [如何在 Vue 项目中使用 vw 实现移动端适配](https://www.w3cplus.com/mobile/vw-layout-in-vue.html)

## 相关链接

- [移动 web 适配之 rem](https://www.nihaoshijie.com.cn/index.php/archives/593/)
- [使用 Flexible 实现手淘 H5 页面的终端适配](https://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html)
- [响应式布局的常用解决方案对比(媒体查询、百分比、rem 和 vw/vh） #13](https://github.com/forthealllight/blog/issues/13)
- [物理像素 Device-Viewport-and-Pixel-Introduction](https://github.com/hijiangtao/hijiangtao.github.io/blob/master/_posts/2017-07-08-Device-Viewport-and-Pixel-Introduction.md)
- [如何在 Vue 项目中使用 vw 实现移动端适配](https://www.w3cplus.com/mobile/vw-layout-in-vue.html)
- [物理像素与 css 像素](https://github.com/hijiangtao/hijiangtao.github.io/blob/master/_posts/2017-07-08-Device-Viewport-and-Pixel-Introduction.md)
- [CSS 像素、物理像素、逻辑像素、设备像素比、PPI、Viewport #21](https://github.com/jawil/blog/issues/21)
