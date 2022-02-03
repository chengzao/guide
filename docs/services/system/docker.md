---
title: docker命令列表
date: 2020-07-21
sidebar: "auto"
tags:
  - docker
categories:
  - services
---

## commands

- `.dockerignore`



```bash
.git
node_modules
npm-debug.log
```



- `Dockerfile`



```bash
FROM, RUN, COPY, ADD, CMD, ENTRYPOINT, ENV, ARG,
VOLUME, EXPOSE, WORKDIR, USER, HEALTHCHECK,

# CMD
shell 格式：CMD <命令>
exec 格式：CMD ["可执行文件", "参数1", "参数2"...]
```



- `编写Dockerfile文件`



```bash
# FROM node:8.4：该 image 文件继承官方的 node image，
# 冒号表示标签，这里标签是8.4，即8.4版本的 node
FROM node:8.4

# COPY . /app：将当前目录下的所有文件（除了.dockerignore排除的路径），
# 都拷贝进入 image 文件的/app目录
COPY . /app

# WORKDIR /app：指定接下来的工作路径为/app
WORKDIR /app

# RUN npm install：在/app目录下，运行npm install命令安装依赖。
# 注意，安装后所有的依赖，都将打包进入 image 文件
RUN npm install --registry=https://registry.npm.taobao.org

# EXPOSE 3000：将容器 3000 端口暴露出来， 允许外部连接这个端口
EXPOSE 3000

# 表示容器启动后自动执行node demos/01.js
CMD node demos/01.js
```



- `RUN命令与CMD命令`



```bash
- RUN命令在 image 文件的构建阶段执行，执行结果都会打包进入 image 文件

- CMD命令则是在容器启动后执行

- 一个 Dockerfile 可以包含多个RUN命令,但是只能有一个CMD命令

- 指定了CMD命令以后，docker run命令就不能附加命令了
（比如前面的/bin/bash），否则它会覆盖CMD命令

- docker run --rm -p 8000:3000 -it koa-demo:0.0.1
```



- `docker image`



```bash
# 列出本机的所有 image 文件。
docker image ls

# 删除 image 文件
docker image rm [imageName]

# -f 表示Dockerfile所在路径
docker image build -f ./Dockerfile

# 创建 image 文件 : docker image build
# -t参数用来指定 image 文件的名字，后面还可以用冒号指定标签，
# 点表示 Dockerfile 文件所在的路径

docker image build -t koa-demo .
docker image build -t koa-demo:0.0.1 .

# 发布 image 文件
docker login  # 登录
# 为本地的 image 标注用户名和版本
docker image tag [imageName] [username]/[repository]:[tag]
docker image tag koa-demos:0.0.1 test/koa-demos:0.0.1
# 也可以不标注用户名，重新构建一下 image 文件
docker image build -t [username]/[repository]:[tag] .
# 发布 image 文件
docker image push [username]/[repository]:[tag]
```



- `Docker Compose工具:管理多个容器的联动`



```bash
# https://yeasy.gitbooks.io/docker_practice/compose/commands.html

docker-compose --version # 查看版本
docker-compose up # 启动所有服务
docker-compose stop # 关闭所有服务
docker-compose rm  # 容器文件删除（容器必须已经停止运行）

# 新建docker-compose.yml
mysql:
    image: mysql:5.7
    environment:
     - MYSQL_ROOT_PASSWORD=123456
     - MYSQL_DATABASE=wordpress
web:
    image: wordpress
    links:
     - mysql
    environment:
     - WORDPRESS_DB_PASSWORD=123456
    ports:
     - "127.0.0.3:8080:80"
    working_dir: /var/www/html
    volumes:
     - wordpress:/var/www/html
```



- `在容器的命令行，按下 Ctrl + c 停止 Node 进程，然后按下 Ctrl + d （或者输入 exit）退出容器`

## 基本命令

- `docker start`与`docker restart`
- `docker logs`
- `docker stop`
- `docker exec`
- `docker ps [-a]`
- `docker attach` 与 `docker exec` 进入容器
- `docker [-f] rm` 删除容器
- `docker inspect`
- `docker history` 具体查看镜像内的历史记录
- `docker save` 和 `docker load`
- `docker pull [选项] [Docker Registry url]<仓库名>:<标签>`



```bash
docker pull ubuntu:14.04

Docker Registry url：<域名/IP>[:端口号]。默认 Docker Hub
仓库名： <用户名>/<软件名>。默认为 library，也就是官方镜像
```



- `docker run [选项]`



```bash
docker run -it --rm ubuntu:14.04 bash

# 参数说明
-it：这是两个参数，一个是 -i：交互式操作，一个是 -t 终端
--rm：这个参数是说容器退出后随之将其删除
ubuntu:14.04：这是指用 ubuntu:14.04 镜像为基础来启动容器。
bash：放在镜像名后的是命令，这里我们希望有个交互式 Shell，因此用的是 bash
--name：给容器起了一个名字
-d: 容器运行在后台
-p: 8080:80 表示端口映射，将宿主机的8080端口转发到容器内的80端口
-v：表示需要将本地哪个目录挂载到容器中
```



- `docker images` 列出镜像



```bash
docker images -f dangling=true  #显示虚悬镜像
docker rmi $(docker images -q -f dangling=true) #删除虚悬镜像
docker images -a  #显示中间层镜像
docker images ubuntu #列出部分镜像
docker images ubuntu:16.04
docker images -f since=mongo:3.2
docker images -f before=mongo:3.2
docker images -f label=com.example.version=0.1
docker images -q
docker images --format "{{.ID}}: {{.Repository}}"
docker images --format "table {{.ID}}\t{{.Repository}}\t{{.Tag}}"
```



- `docker commit [选项] <容器ID或容器名> [<仓库名>[:<标签>]]`



```bash
# 这条命令会用 nginx 镜像启动一个容器，命名为 webserver，并且映射了 80 端口，
# 这样我们可以用浏览器去访问这个 nginx 服务器
docker run --name webserver -d -p 80:80 nginx

# 修改内容
docker exec -it webserver bash
echo '<h1>Hello, Docker!</h1>' > /usr/share/nginx/html/index.html

# 显示容器文件系统的前后变化
docker diff webserver

docker commit \
    --author "Author <Author@gmail.com>" \
    --message "修改了默认网页" \
    webserver \
    nginx:v2
```



- `docker rmi [选项] <镜像1> [<镜像2> ...]` 删除本地镜像



```bash
docker rmi $(docker images -q -f dangling=true)
docker rmi $(docker images -q redis)
```



- `docker volume`



```bash
docker volume help

# 创建一个数据卷
docker volume create my-vol

# 查看所有的 数据卷
docker volume ls

# 删除数据卷
docker rm my-vol

# 如果需要在删除容器的同时移除数据卷
可以在删除容器的时候使用 docker rm -v 这个命令

# 无主的数据卷可能会占据很多空间，要清理请使用以下命令
docker volume prune

# 查看指定 数据卷 的信息
docker volume inspect my-vol

# 启动一个挂载数据卷的容器
docker run -d -P \
    --name web \
    # -v my-vol:/wepapp \
    --mount source=my-vol,target=/webapp \
    training/webapp \
    python app.py
```



## 参考示例

- [Docker —— 从入门到实践](https://www.gitbook.com/book/yeasy/docker_practice/details)
- [judasn/Linux-Tutorial](https://github.com/judasn/Linux-Tutorial/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Get Docker CE for CentOS](https://docs.docker.com/engine/installation/linux/centos/)
- [daocloud/Docker 入门](http://guide.daocloud.io/dcs/docker-9152673.html)
- [基于 Docker 打造前端持续集成开发环境](https://juejin.im/post/5a142d7b6fb9a0451170c2c7)
- [Windows 下使用 docker 部署 gitlab CI 服务](https://www.jianshu.com/p/0abe441d5d3c)
- [Centos7 创建支持 ssh 服务器的 docker 容器](https://blog.csdn.net/xizaihui/article/details/52960604)
- [cr.console.aliyun](https://cr.console.aliyun.com/#/accelerator)
- [mirrors.aliyun](http://mirrors.aliyun.com/docker-toolbox/)
- [Play with Docker](https://labs.play-with-docker.com/)
