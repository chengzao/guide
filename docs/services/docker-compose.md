---
autoGroup-1: docker
title: docker-compose命令
date: 2020-07-23
sidebar: "auto"
tags:
  - docker
categories:
  - services
---

## Compose 命令说明



```bash
# https://docs.docker.com/compose/reference/overview/
# https://yeasy.gitbooks.io/docker_practice/compose/commands.html

docker-compose [-f=<arg>...] [options] [COMMAND] [ARGS...]
选项：
    -f, --file FILE 指定使用的 Compose 模板文件，默认为 docker-compose.yml，可以多次指定
    -p, --project-name NAME 指定项目名称，默认将使用所在目录名称作为项目名
    --x-networking 使用 Docker 的可拔插网络后端特性
    --x-network-driver DRIVER 指定网络后端的驱动，默认为 bridge
    --verbose 输出更多调试信息
    -v, --version 打印版本并退出

# 列出 Compose 文件中包含的镜像
docker-compose images

# 进入指定的容器
docker-compose exec

# 此命令将会停止 up 命令所启动的容器，并移除网络
docker-compose down

# 验证 Compose 文件格式是否正确，若正确则显示配置，若格式错误显示错误原因
docker-compose config

# 自动完成包括构建镜像，（重新）创建服务，启动服务
docker-compose up [options] [SERVICE...]
选项：
  -d 在后台运行服务容器
  --no-color 不使用颜色来区分不同的服务的控制台输出
  --no-deps 不启动服务所链接的容器
  --force-recreate 强制重新创建容器，不能与 --no-recreate 同时使用
  --no-recreate 如果容器已经存在了，则不重新创建，不能与 --force-recreate 同时使用
  --no-build 不自动构建缺失的服务镜像
  -t, --timeout TIMEOUT 停止容器时候的超时（默认为 10 秒）

# 启动已经存在的服务容器
docker-compose start [SERVICE...]

# 停止已经处于运行状态的容器，但不删除它。
# 通过 docker-compose start 可以再次启动这些容器
docker-compose stop [options] [SERVICE...]

# 通过发送 SIGKILL 信号来强制停止服务容器
docker-compose kill [options] [SERVICE...]
# 例如: docker-compose kill -s SIGINT

# 查看服务容器的输出
docker-compose logs [options] [SERVICE...]

# 暂停一个服务容器
docker-compose pause [SERVICE...]

# 恢复处于暂停状态中的服务
docker-compose unpause [SERVICE...]

# 重启项目中的服务
docker-compose restart [options] [SERVICE...]
选项：
    -t, --timeout TIMEOUT 指定重启前停止容器的超时（默认为 10 秒）

# 删除所有（停止状态的）服务容器。推荐先执行 docker-compose stop 命令来停止容器
docker-compose rm [options] [SERVICE...]
选项：
    -f, --force 强制直接删除，包括非停止状态的容器。一般尽量不要使用该选项
    -v 删除容器所挂载的数据卷

# 拉取服务依赖的镜像
docker-compose pull [options] [SERVICE...]
选项：
    --ignore-pull-failures 忽略拉取镜像过程中的错误

# 推送服务依赖的镜像到 Docker 镜像仓库
docker-compose push

# 打印某个容器端口所映射的公共端口
docker-compose port [options] SERVICE PRIVATE_PORT
选项：
    --protocol=proto 指定端口协议，tcp（默认值）或者 udp。
    --index=index 如果同一服务存在多个容器，指定命令对象容器的序号（默认为 1）

# 列出项目中目前的所有容器
docker-compose ps [options] [SERVICE...]
选项：
    -q 只打印容器的 ID 信息

# 在指定服务上执行一个命令
docker-compose run [options] [-p PORT...] [-e KEY=VAL...] SERVICE [COMMAND] [ARGS...]
# 例如: docker-compose run ubuntu ping www.baidu.com

# 构建（重新构建）项目中的服务容器
docker-compose build [options] [SERVICE...]
选项包括：
    --force-rm 删除构建过程中的临时容器
    --no-cache 构建镜像过程中不使用 cache（这将加长构建过程）
    --pull 始终尝试通过 pull 来获取更新版本的镜像

# 查看各个服务容器内运行的进程
docker-compose top
```



## Compose 模板文件

- 默认的模板文件名称为 `docker-compose.yml`，格式为 YAML 格式



```bash
# https://docs.docker.com/compose/compose-file/
# https://yeasy.gitbooks.io/docker_practice/compose/compose_file.html

version
services
build
capadd, capdrop
command
configs
cgroup_parent
container_name
deploy
devices
depends_on
dns
dns_search
tmpfs
env_file
environment
expose
external_links
extra_hosts
healthcheck
image
labels
links # v3不建议使用
logging
network_mode
networks
pid
ports
secrets
security_opt
stop_signal
sysctls
ulimits
volumes

# 其它指令
domainname, entrypoint, hostname, ipc, mac_address, privileged,
read_only, shm_size, restart, stdin_open, tty, user, working_dir

# 读取变量
Compose 模板文件支持动态读取主机的系统环境变量和当前目录下的 .env 文件中的变量
```



## 参考示例



```bash
version: '2'

services:
  redis:
    image: redis:latest
    ports:
      - "6379:6379"
    networks:
      - lognet

  app:
    container_name: web-app
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    volumes:
      - ".:/webapp"
    depends_on:
      - redis
    networks:
      - lognet

networks:
  lognet:
    driver: bridge
```


