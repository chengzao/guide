---
title: javascript的module属性
date: 2020-07-20
sidebar: "auto"
tags:
  - 性能优化
  - async&defer
categories:
  - faq
---

## transition 和 animation 的区别

- transition 需要触发一个事件才能改变属性,transition 为 2 帧，从`from .... to`;
- animation 不需要触发任何事件的情况下才会随时间改变属性值,animation 可以一帧一帧的

## mouseover 和 mouseenter 的区别

- mouseover：当鼠标移入元素或其子元素都会触发事件，所以有一个重复触发，冒泡的过程。对应的移除事件是 mouseout
- mouseenter：当鼠标移除元素本身（不包含元素的子元素）会触发事件，也就是不会冒泡，对应的移除事件是 mouseleave

## 图片的懒加载和预加载

- 预加载：提前加载图片，当用户需要查看时可直接从本地缓存中渲染, 会增加服务器前端压力
- 懒加载：懒加载的主要目的是作为服务器前端的优化，减少请求数或延迟请求数, 对服务器前端有一定的缓解压力作用

## get 和 post

- HTTP 协议 未规定 GET 和 POST 的长度限制
- GET 的最大长度显示是因为 浏览器和 web 服务器限制了 URI 的长度
- 不同的浏览器和 WEB 服务器，限制的最大长度不一样
- get 要支持 IE，则最大长度为 2083byte，若只支持 Chrome，则最大长度 8182byte
- get 请求类似于查找的过程，用户获取数据，可以不用每次都与数据库连接，所以可以使用缓存
- post 不同，post 做的一般是修改和删除的工作，所以必须与数据库交互，所以不能使用缓存。因此 get 请求适合于请求缓存

## 性能优化

- 使用 CDN
- gzip 压缩
- 文本压缩
- 合并请求
- 雪碧图
- 图片懒加载
- 缓存资源
- 减少 DOM 操作
