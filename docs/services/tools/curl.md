---
title: curl的GET和POST使用
date: 2023-03-11
sidebar: "auto"
tags:
  - curl
categories:
  - system
---

> 原文 [curl POST examples - gists · GitHub](https://gist.github.com/subfuzion/08c5d85437d5d4f00e58)

## POST application/x-www-form-urlencoded

```bash
# application/x-www-form-urlencoded is the default:
curl -d "param1=value1&param2=value2" -X POST http://localhost:3000/data

# explicit:
curl -d "param1=value1&param2=value2" -H "Content-Type: application/x-www-form-urlencoded" -X POST http://localhost:3000/data

# with a data file
curl -d "@data.txt" -X POST http://localhost:3000/data
```

## POST application/json

```bash
curl -d '{"key1":"value1", "key2":"value2"}' -H "Content-Type: application/json" -X POST http://localhost:3000/data

# with a data file
curl -d "@data.json" -X POST http://localhost:3000/data
```

## GET with JSON

```bash
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://hostname/resource
```

## GET with XML

```bash
curl -H "Accept: application/xml" -H "Content-Type: application/xml" -X GET http://hostname/resource
```
