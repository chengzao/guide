---
title: gulp
date: 2020-07-20
sidebar: "auto"
tags:
  - gulp
categories:
  - tools
---

## 安装

- `npm install --global gulp`
- `npm install --save-dev gulp`
- `npm install gulp-cli -g`

## 使用

- `git init`
- `touch gulpfile.js`
- `gulp 任务名 (默认为default): gulp default`

## api

- `gulp.dest(path[, options])`：指明处理后的文件输出路径 path：路径（一个任务可以有多个输出路径）； options：可选参数
- `gulp.task(name[, deps], fn)`：注册任务 name：任务名称（通过 gulp name 来执行这个任务）； deps：可选的数组，在本任务运行中所需要所依赖的其他任务（当前任务在依赖任务执行完毕后才会执行）； fn：任务函数（function 方法）
- `gulp.watch(glob [, opts], tasks)`：监视文件的变化并运行相应的任务 glob：路径模式匹配； opts：可以选配置对象； taks：执行的任务
- `gulp.src(globs[, options])`：指明源文件路径 globs：路径模式匹配； options：可选参数

- `src/*` 匹配 src 中 `*.html`
- `src/*/*.*` 匹配 src 中一级子目录中的文件
- `src/**/*.*` 匹配 src 中所有文件夹中的文件
- `src/*.{jpg,png}`
- 多个 `['src/*.{jgp,png}','public/*.html']`
- 排除某个 `['src/*.{jgp,png}','public/*.html','!public/b.html']`
- `gulp.pipe()`

## plugin

- `npm install gulp-uglify -D` 脚本压缩&重命名
- `npm install gulp-sass --save-dev` CSS 预处理/Sass 编译
- `npm install gulp-less --save-dev` CSS 预处理/Less 编译
- `npm install gulp-imagemin imagemin-pngquant --save-dev` 图片处理
- `npm install gulp-livereload gulp-webserver --save-dev` 自动刷新
- `npm install gulp-rename --save-dev` 文件重命名
- `npm install gulp-sourcemaps --save-dev` 来源地图
- `npm install gulp-changed --save-dev` 只操作有过修改的文件
- `npm install gulp-concat --save-dev` 文件合并
- `npm install gulp-clean --save-dev` 文件清理
- `npm install gulp-minify-css --save-dev` CSS 压缩
- `npm install gulp-autoprefixer --save-dev` 自动添加 CSS3 浏览器前缀

## 匹配规则

```bash
*   # 能匹配 a.js , x.y , abc , abc/，但不能匹配 a/b.js
*.* # 能匹配 a.js , style.css , a.b , x.y
*/*/*.js  # 能匹配 a/b/c.js , x/y/z.js，不能匹配 a/b.js , a/b/c/d.js
**  # 能匹配 abc , a/b.js , a/b/c.js , x/y/z , x/y/z/a.b，能用来匹配所有的目录和文件
**/*.js   # 能匹配 foo.js , a/foo.js , a/b/foo.js , a/b/c/foo.js
a/**/z  # 能匹配 a/z , a/b/z , a/b/c/z , a/d/g/h/j/k/z
a/**b/z   # 能匹配 a/b/z , a/sb/z，但不能匹配 a/x/sb/z，因为只有单**单独出现才能匹配多级目录
?.js  # 能匹配 a.js , b.js , c.js
a??   # 能匹配 a.b , abc，但不能匹配 ab/，因为它不会匹配路径分隔符
[xyz].js  # 只能匹配 x.js , y.js , z.js，不会匹配 xy.js , xyz.js 等，整个中括号只代表一个字符
[^xyz].js # 能匹配 a.js , b.js , c.js等，不能匹配 x.js , y.js , z.js
```

## 相关链接

- [gulpjs](https://gulpjs.com/)
- [gulp doc](https://github.com/gulpjs/gulp/tree/master/docs)
- [gulpjs cn](https://www.gulpjs.com.cn/docs/getting-started/)
- [gulpjs glugins](http://gulpjs.com/plugins/)
- [zhonglimh/Gulp](https://github.com/zhonglimh/Gulp/)
