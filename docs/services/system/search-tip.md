---
title: 搜索小技巧
date: 2021-8-01
sidebar: "auto"
tags:
  - search
  - github
categories:
  - system
---

## github搜索

- searching-on-github： https://docs.github.com/cn/github/searching-for-information-on-github/searching-on-github

### 1、根据star，fork数筛选


- 1、 大于等于

```
语法： 关键字 stars:>= 数量 forks:>=数量

例子：

//搜索springboot有关star数>=5000的内容
springboot stars:>=5000

//搜索springboot 的star>=5000，且fork数>=5000的内容
springboot stars:>=5000 forks:>=5000

可单独搜索，也可组合搜索，中间用空格隔开，是&（且）的关系。
```


- 2、范围查询



```
语法： 关键字 stars:范围1..范围2

例子：

//搜索star数在 4000到500的springboot相关内容
springboot stars:4000..5000
```


### 2、 关键字 in


> 搜索关键字在github上发布的位置 ，主要以下3个位置



- name: 发布的仓库名称
- description: 指的是文章的摘要部分
- Readme: 说明文档
- USERNAME: 表示在USERNAME中搜索 TSP 关键字
- ORGNAME: 表示在组织或机构名中搜索 TSP 关键字



```
语法：关键字 in

例子：

//查找名称中包含netty的内容
netty in:name

//逗号分隔，是 || (或)的关系，指的是查询名称，或者描述中包含netty的内容
netty in:name,description
```


### 3、awesome + 关键字


```
语法：awesome 关键字

例子：

awesome springboot
```


### 4、搜索某个语言，某个地区


```
例子：

// 表示在TSP项目中筛选编程语言为MATLAB的项目
TSP language:MATLAB

// 表示在TSP项目中筛选开发者为中国人的项目
TSP location:china

// 表示在TSP项目中筛选开发者粉丝大于1000的项目
TSP followers:>1000

// 表示搜索用户命为UCAS的开发者的项目
UCAS in:fullname

// 表示筛选TSP项目中是中国人写的而且是MATLAB语言的的项目
TSP language:MATLAB&location:china
```


### 5、查看源码利器 t


> 用 t ，该框架所有的类以列表形式平铺展开，方便查看



### 6、实现某行，某块代码高亮


- 某行高亮: `#L23`



```
https://github.com/xxx/xxx.js#L23
```


- 某个代码块: `#L23-35`



```
https://github.com/xxx/xxx.js#L23-L35
```


### 7、查询某位用户


```
语法：user:名称

例子：user:fullname
```

## google搜索

### 1、关键词包含在标题中


- `intitle:（关键词）`



```
intitle:github
```


- allintitle



```
// 相当于intitle:zabbix intitle:docker
allintitle:zabbix docker
```


### 2、关键词包含在正文中


- `intext:（关键词）`



```
intext:github
```


### 3、限定搜索网站


- `（关键词）inurl:（网站类型）`



```
网站类型:

〔.com〕商业组织和公司
〔.net〕网络服务商
〔.gov〕政府部门
〔.org〕非营利性组织
〔.int〕国际组织
〔.edu〕教育部门

示例：
baidu inurl:.org
```


- allinurl



```
// 相当于 inurl:zabbix inurl:docker
allinurl:zabbix hadoop
```


### 4、限定在两个数值之间进行搜索


- `开始时间.. 结束时间`： 关键词 2018.. 2021



```
xxx 1920.. 1950
```


### 5、指定网站内搜索


- `site:域名 关键词`



### 6、限定文件类型


- `（关键词）filetype:文件类型`



```
常见文件类型

〔pdf〕PDF文件
〔xls〕:excle文件
〔ppt〕:powerpoint文件
〔doc〕:word文件
〔txt〕:文本文档
```


### 7、精确搜索(给关键词加引号)


- `"关键词"`



```
// 搜索 小苹果 关键词
"小苹果"
```


- 排除关键词：`关键词 -排除关键词`



```
足球 -篮球
```


- 包含某个关键词：`关键词 +附加关键词`



```
足球 +篮球
```


### 8、星号（*）


- 常用的案例:搜索报错中的特定路径 , 有个词忘记了或者不会打



```
git push remote error does not match * user account
```


- 搜索词模糊



```
architect*

返回是所有包含 architect、architectural、以及其他所有以「architect」作为开头的词汇的条目
```
