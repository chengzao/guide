---
title: 网络协议记录
date: 2020-07-21
sidebar: "auto"
tags:
  - 网络协议
categories:
  - frontend
---

## OSI 模型

- `物理层: 实现计算机系统与网络间的物理连接`
- `数据链路层: 进行数据打包与解包，形成信息帧`
- `网络层: 提供数据通过的路由: IP / ICMP / RIP ...`
- `传输层: 提供传输顺序信息与响应: TCP / UDP`
- `会话层: 建立和中止连接`
- `表示层: 数据转换、确认数据格式`
- `应用层: 提供用户程序接口 : HTTP / DNS ...`

## 网络中常用协议以及层次关系

- 网络层 `IP / ICMP / ARP`
- 主机-主机层 `TCP / UDP`
- 进程/应用层 `Telnet / FTP / SMTP / HTTP / DNS`

## `TCP / IP` 概念层模型

- 应用层: `应用层 表示层 会话层`
- 传输层: `传输层`
- 网络层: `网络层`
- 链路层: `数据链路层 物理层`

## 五层因特尔协议栈

- `1.`应用层(dns,http) DNS 解析成 IP 并发送 http 请求
- `2.`传输层(tcp,udp) 建立 tcp 连接（三次握手）
- `3.`网络层(IP,ARP) IP 寻址
- `4.`数据链路层(PPP) 封装成帧
- `5.`物理层(利用物理介质传输比特流) 物理传输（然后传输的时候通过双绞线，电磁波等各种介质）

## HTTP 状态码

- `1xx消息`: 请求已被服务器接收，继续处理
- `2xx成功`: 请求已成功被服务器接收、理解、并接受
- `3xx重定向`: 需要后续操作才能完成这一请求
- `4xx请求错误`: 请求含有词法错误或者无法被执行
- `5xx服务器错误`: 服务器在处理某个正确请求时发生错误

## HTTP 常见状态码

### 200

- `200` :表明该请求被成功地完成，所请求的资源发送回客户端
- `201` :表示请求成功且服务器创建了新的资源
- `202` :表示服务器已经接受了请求，但还未处理

### 300

- `301` :表示永久重定向，请求的网页已经永久移动到新位置
- `302` :表示临时重定向
- `304` :自从上次请求后，请求的网页未修改过，请客户端使用本地缓存

### 400

- `400` :客户端请求有错（譬如可以是安全模块拦截）
- `401` :服务器无法理解请求的格式
- `402` :请求未授权
- `403` :禁止访问
- `404` :资源未找到

### 500

- `500` :服务器内部错误
- `503` :服务不可用
