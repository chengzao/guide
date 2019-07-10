# sentry

[sentry](https://sentry.io/welcome/)

[docs/docker](https://docs.sentry.io/server/installation/docker/)

## 安装

- Step1

```bash
git clone git@github.com:getsentry/onpremise.git
```

- Step2: `cd onpremise`


- Step3: 创建 name volume，持久化

```bash
docker volume create --name=sentry-data && docker volume create --name=sentry-postgres
```

- Step4: `cp -n .env.example .env`

- Step5

```bash
# onpremise下 创建目录
mkdir -p data/{sentry,postgres}
# 一定执行，不然报错，然后再生成key
docker-compose build
```

- Step6: 生成 key 放到 `.env` 文件中

```bash
# 获取项目的key
docker-compose run --rm web config generate-secret-key
```

- Step7: 生成数据库，并在这一步设置超级用户

```bash
docker-compose run --rm web upgrade
```

- Step8: 开启sentry服务

```bash
docker-compose up -d
```

- Step9: `http:://localhost:9000 即可进入sentry`

- DSN

```bash
# DSN位置：项目 - 选择目标项目 - 设置 - 客户端密钥 (DSN) - 配置
{PROTOCOL}://{PUBLIC_KEY}:{SECRET_KEY}@{HOST}/{PATH}{PROJECT_ID}

PROTOCOL 使用的协议: http或https
PUBLIC_KEY 验证sdk的公钥
SECRET_KEY 验证sdk的密钥
HOST 目标sentry服务器
PATH 通常为空
PROJECT_ID 验证用户绑定的项目id
```

- 客户端中使用

```js
import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: "http://PUBLIC_KEY:SECRET_KEY@localhost:9000/PROJECT_ID" ,
  release: 'sentry_app@20190710'
});
```

## 相关链接

- [异常监控服务 Sentry 的部署](https://juejin.im/post/5d12b99cf265da1bb77677c5)
- [前端异常监控之 Sentry的部署和使用](https://juejin.im/post/5b55c33ae51d45198f5c7a91)
- [给你的项目装个探头 — Sentry](https://juejin.im/post/5d1461e1f265da1bbb03ecc2)
