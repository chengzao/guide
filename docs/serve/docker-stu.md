---
title: docker使用示例
date: 2020-07-22
sidebar: "auto"
tags:
  - docker
categories:
  - server
---

## centos ssh

### 方式一

- Dockerfile

<CodeBlock>

```bash
# Dockerfile
# 生成的新镜像以centos镜像为基础
FROM centos

# 安装openssh-server
RUN yum install passwd openssl openssh-server openssh-clients -y

RUN ssh-keygen -q -t rsa -b 2048 -f /etc/ssh/ssh_host_rsa_key -N ''
RUN ssh-keygen -q -t ecdsa -f /etc/ssh/ssh_host_ecdsa_key -N ''
RUN ssh-keygen -t dsa -f /etc/ssh/ssh_host_ed25519_key  -N ''

RUN sed -i "s/#UsePrivilegeSeparation.*/UsePrivilegeSeparation no/g" /etc/ssh/sshd_config
RUN sed -i "s/UsePAM.*/UsePAM no/g" /etc/ssh/sshd_config
# 指定root密码
RUN /bin/echo 'root:admin'|chpasswd

EXPOSE 22

# CMD /usr/sbin/sshd -D
CMD ["/usr/sbin/sshd", "-D"]
```

</CodeBlock>

- docker - run

<CodeBlock>

```bash
# 进入Dockerfile所在文件夹运行如下

# 构建Dockerfile
docker build -t ssh-centos .

# 运行查看构建成功的image信息
docker images

# 运行生成的image, containername为运行容器的名字, imageid为image的id
docker run -itd --name containername -p 10020:20  imageid

# ssh连接centos
ssh root@127.0.0.1 -p 10020
```

</CodeBlock>

- docker-compose.yml

<CodeBlock>

```bash
version: '2'
services:
  centos-ssh:
    build: .
    image: 'czh/centos-ssh'
    restart: always
    container_name: centos-ssh
    ports:
      - '10020:22'
```

</CodeBlock>

- ssh 连接 centos: `ssh root@127.0.0.1 -p 10020`

### 方式二

- Dockerfile

<CodeBlock>

```bash
# Dockerfile
# 生成的新镜像以centos镜像为基础
FROM centos

# 安装openssh-server
RUN yum install passwd openssl openssh-server openssh-clients -y

RUN ssh-keygen -q -t rsa -b 2048 -f /etc/ssh/ssh_host_rsa_key -N ''
RUN ssh-keygen -q -t ecdsa -f /etc/ssh/ssh_host_ecdsa_key -N ''
RUN ssh-keygen -t dsa -f /etc/ssh/ssh_host_ed25519_key  -N ''

RUN sed -i "s/#UsePrivilegeSeparation.*/UsePrivilegeSeparation no/g" /etc/ssh/sshd_config
RUN sed -i "s/UsePAM.*/UsePAM no/g" /etc/ssh/sshd_config

# 指定root密码
ARG ROOTPWD
RUN /bin/echo "${ROOTPWD}" |chpasswd

EXPOSE 22

CMD /usr/sbin/sshd -D
# CMD ["/usr/sbin/sshd", "-D"]
```

</CodeBlock>

- docker-compose.yml

<CodeBlock>

```bash
version: '3'
services:
  centos-ssh:
    build:
      context: .
      dockerfile: ./Dockerfile
      args:
        ROOTPWD: root:admin
    image: czh/centos-ssh
    restart: always
    container_name: centos-ssh
    ports:
      - '10010:22'
```

</CodeBlock>

- docker-compose -f "docker-compose.yml" up -d --build
- ssh root@127.0.0.1 -p 10020

## YApi

- YApi for Mac

<CodeBlock>

```bash
- docker run -d -p 27017:27017 --name mymongo -v /Users/pc/srv/mongodb/db:/data/db  mongo:latest

- npm install -g yapi-cli --registry https://registry.npm.taobao.org

- yapi server

- http://0.0.0.0:9090/

- node vendors/server/app.js

- http://127.0.0.1:3000

- 账号名："admin@admin.com"，密码："ymfe.org"
```

</CodeBlock>

## nginx

<CodeBlock>

```bash
docker run --name some-nginx -v E:\huashu\api911\gaiban\nginx.conf:/etc/nginx/nginx.conf:ro -v E:\huashu\api911\gaiban:/usr/share/nginx/html:ro -p 80:80 -d  4610
```

</CodeBlock>

## mongo

<CodeBlock>

```bash
# https://brickyang.github.io/2017/03/15/%E5%88%A9%E7%94%A8-Docker-%E8%BF%90%E8%A1%8C-MongoDB/

docker pull mongo

# docker run --name some-mongo -p 27017:27017  -d mongo:tag

# docker run --name <YOUR-NAME> -p 27017:27017 -v /data/db:/data/db -d mongo:3.4 --auth

# docker run -d -p 27017:27017 -v mongo_configdb:/data/configdb -v mongo_db:/data/db --name mongo mongo:latest

# docker run -d -p 27017:27017 -v ${PWD}/data:/data/db --name mongo mongo:latest

docker volume create my-mongo-db
docker volume create my-mongo-configdb

docker run -d -p 27017:27017 --name mymongo -v my-mongo-db:/data/db  -v my-mongo-configdb:/data/configdb mongo:latest

docker exec -it mymongo mongo

use admin
db.createUser({user: "root", pwd: "root", roles: [{role: "userAdminAnyDatabase", db: "admin"}]})
db.auth('root','root') // 1

use todos
db.createUser({user: "czh", pwd: "czh", roles: [{role: "readWrite", db: "todos"}]})
db.auth('czh', 'czh') // 1

use admin
# 删除czh用户
db.dropUser('czh') // true
```

</CodeBlock>

## mysql

<CodeBlock>

```bash
# mysql版本
mysql: 8

# 下载
docker pull mysql

# 启动容器
# docker run -p 3306:3306 --name mymysql -v $PWD/conf:/etc/mysql/conf.d -v $PWD/logs:/logs -v $PWD/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql:latest

# docker run -p 3306:3306 --name mymysql -v $PWD/logs:/logs -v $PWD/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=admin -d mysql:latest

# docker run -p 3306:3306 --name mymysql -v E:/mysql/logs:/logs -v E:mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=admin -d mysql:latest

docker volume create my-vol-mysql

docker run -p 3306:3306 --name mymysql -v my-vol-mysql:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=admin -d mysql:latest

# 进入容器
docker exec -it mymysql bash

# 登录mysql
mysql -u root -p

ALTER USER 'root'@'localhost' IDENTIFIED BY 'admin';

# 添加远程登录用户
CREATE USER 'czh'@'%' IDENTIFIED WITH mysql_native_password BY 'admin@!123';

GRANT ALL PRIVILEGES ON *.* TO 'czh'@'%';

# 编码
https://blog.csdn.net/m0_37639542/article/details/72852875
https://www.cnblogs.com/jiangxiaobo/p/6110647.html

```

</CodeBlock>

## redis

<CodeBlock>

```bash
docker pull redis

docker volume create my-vol-redis

# docker run -p 6379:6379 -v $PWD/data:/data  -d redis redis-server --appendonly yes
docker run -p 6379:6379 --name myredis  -v my-vol-redis:/data  -d redis redis-server --appendonly yes

docker exec -it myredis redis-cli

info
```

</CodeBlock>

## registry

<CodeBlock>

```bash

docker run -d -p 5000:5000 --restart always -v /Users/pc/srv/registry:/var/lib/registry --name registry registry:2

# 用 curl 查看仓库中的镜像
curl 127.0.0.1:5000/v2/_catalog

# pull
docker pull ubuntu

# tag
docker tag ubuntu localhost:5000/ubuntu

# push
docker push localhost:5000/ubuntu

# rm image
docker image rm localhost:5000/ubuntu

# pull
docker pull localhost:5000/ubuntu

# ip 推送
{
  "registry-mirror": [
    "https://registry.docker-cn.com"
  ],
  "insecure-registries": [
    "192.168.199.100:5000"
  ]
}

# webui
https://github.com/mkuchin/docker-registry-web
https://github.com/kwk/docker-registry-frontend
```

</CodeBlock>
