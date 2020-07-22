---
title: gitlab
date: 2020-07-21
sidebar: "auto"
tags:
  - gitlab
categories:
  - server
---

- hosts

<CodeBlock>

```bash
127.0.0.1	jenkins.chenio.com
127.0.0.1	gitlab.chenio.com
```

</CodeBlock>

## gitlab-ce

- gitlab-ce for window

<CodeBlock>

```bash
# local hosts add: 127.0.0.1  gitlab.chenio.com
# docker-compose.yml

version: '2'
services:
  web:
    image: 'gitlab/gitlab-ce:latest'
    restart: always
    hostname: 'gitlab.chenio.com'
    environment:
      GITLAB_OMNIBUS_CONFIG: |
        external_url 'http://gitlab.chenio.com:9090'
        gitlab_rails['gitlab_shell_ssh_port'] = 2224
    ports:
      - '9090:9090'
      - '2224:22'
    volumes:
      - 'd:/docker/gitlab/config:/etc/gitlab'
      - 'd:/docker/gitlab/logs:/var/log/gitlab'

# run docker-compose.yml
docker-compose up -d

# windows10
docker run -d --hostname localhost -p 9090:80 -p 10443:443 --name gitlab -v d:/docker/gitlab/config:/etc/gitlab -v d:/docker/gitlab/logs:/var/log/gitlab gitlab/gitlab-ce:latest

http://localhost:10080/
```

</CodeBlock>

- gitlab-ce for Mac

<CodeBlock>

```bash
# https://docs.gitlab.com/omnibus/docker/#run-the-image

# docker run
sudo docker run --detach \
	--hostname 0.0.0.0 \
	--publish 443:443 --publish 9090:80 --publish 22:22 \
	--name gitlab \
	--restart always \
	--volume /Users/pc/srv/gitlab/config:/etc/gitlab \
	--volume /Users/pc/srv/gitlab/logs:/var/log/gitlab \
	--volume /Users/pc/srv/gitlab/data:/var/opt/gitlab \
	gitlab/gitlab-ce:latest

# docker-compose.yml文件
web:
  image: 'gitlab/gitlab-ce:latest'
  restart: always
  hostname: 'gitlab.example.com'
  environment:
    GITLAB_OMNIBUS_CONFIG: |
      external_url 'http://gitlab.example.com:9090'
      gitlab_rails['gitlab_shell_ssh_port'] = 2224
  ports:
    - '9090:9090'
    - '2224:22'
  volumes:
    - '/Users/pc/srv/gitlab/config:/etc/gitlab'
    - '/Users/pc/srv/gitlab/logs:/var/log/gitlab'
    - '/Users/pc/srv/gitlab/data:/var/opt/gitlab'

# run docker-compose.yml
docker-compose up -d
docker-compose down

http://localhost:9090
```

</CodeBlock>

## gitlab-runner

### docker

<CodeBlock>

```bash
# test rep
https://gitlab.com/chengzao/gitlab-test.git

# Windows下使用docker部署gitlab CI服务
https://www.jianshu.com/p/0abe441d5d3c

# docker之CI/CD持续集成—GitLab CI服务器
https://zhuanlan.zhihu.com/p/54064430
https://idig8.com/2018/11/20/987/

# 在docker中执行gitlab-runner
https://segmentfault.com/a/1190000012279248

https://docs.gitlab.com/runner/
https://docs.gitlab.com/runner/install/docker.html
https://docs.gitlab.com/runner/register/

# start
docker run -d --name gitlab-runner --restart always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /etc/gitlab-runner \
  gitlab/gitlab-runner:latest

# register
docker exec -it gitlab-runner gitlab-ci-multi-runner register

sudo docker run --rm -t -i -v /Users/pc/srv/gitlab-runner/config:/etc/gitlab-runner gitlab/gitlab-runner register

# config
docker
alpine:latest

# log
docker logs gitlab-runner
```

</CodeBlock>

### docker-compose

- gitab-runner

<CodeBlock>

```bash
# Dockerfile
FROM gitlab/gitlab-runner:latest

RUN apt-get update -y

# https://github.com/nodesource/distributions/blob/master/README.md
RUN curl -sL https://deb.nodesource.com/setup_11.x | bash -

RUN apt-get install -y nodejs
```

</CodeBlock>

- docker-compose.yml

<CodeBlock>

```bash
version: '2'
services:
  web:
    build: .
    image: 'czh/gitlab-runner'
    restart: always
    container_name: gitlab-runner
    extra_hosts:
      - "gitlab.chenio.com:192.168.137.138"
      - "jenkins.chenio.com:192.168.137.138"
    volumes:
      - '/var/run/docker.sock:/var/run/docker.sock'
      - '/Users/pc/srv/gitlab-runner/config:/etc/gitlab-runner'
```

</CodeBlock>

- `docker-compose -f "docker-compose.yml" up -d --build`

- `docker exec -it gitlab-runner gitlab-ci-multi-runner register`

<CodeBlock>

```bash
# step1: Please enter the gitlab-ci coordinator URL (e.g. https://gitlab.com/):
http://gitlab.chenio.com:9090/
# step2: Please enter the gitlab-ci token for this runner:
raQ5xxxxxxxxxxxxWQ
# step3: Please enter the gitlab-ci description for this runner:
runner-name
# step4: Please enter the gitlab-ci tags for this runner (comma separated):
test, build, deploy
# step5: Please enter the executor: parallels, shell, ssh, virtualbox, docker+machine, docker-ssh+machine, docker, docker-ssh, kubernetes:
shell
```

</CodeBlock>

- gitlab-ci.yml

<CodeBlock>

```bash
# This file is a template, and might need editing before it works on your project.
# see https://docs.gitlab.com/ce/ci/yaml/README.html for all available options
# react simple demo
# you can delete this line if you're not using Docker
image: node:latest

before_script:
  - echo "Before script installing package"
  - node -v
  - npm -v
  - npm install

after_script:
  - echo "After script section"

build:
  stage: build
  script:
    - npm run build

test:
  stage: test
  script:
    - npm run test

deploy:
  stage: deploy
  script:
    - echo "Do your deploy here"

cache:
  paths:
  - node_modules/
```

</CodeBlock>

### windows

<CodeBlock>

```bash
# runner安装下载
https://docs.gitlab.com/runner/install/windows.html
- C盘新建GitLab-Runner文件夹
- 将下载好的文件exe文件放进GitLab-Runner， 重命名为gitlab-runner.exe
- Windows PowerShell Run as administrator

# 注册
https://docs.gitlab.com/runner/register/index.html
- ./gitlab-runner.exe register

# Install the Runner as a service and start it
- gitlab-runner install
- gitlab-runner start

# stop
- cd C:\GitLab-Runner
- gitlab-runner stop

# update
- cd C:\GitLab-Runner
- gitlab-runner stop
- 重复runner安装下载
- gitlab-runner start

# Uninstall
- cd C:\GitLab-Runner
- gitlab-runner stop
- gitlab-runner uninstall
- cd ..
- rmdir /s GitLab-Runner
```

</CodeBlock>

## jenkins docker

- jenkins for mac

<CodeBlock>

```bash
# https://github.com/jenkinsci/docker/blob/master/README.md

# step1
docker pull jenkins/jenkins:latest

# step2
docker run -d -p 8080:8080 -p 50000:50000 --name devops-jenkins -v /Users/pc/srv/jenkins_home:/var/jenkins_home jenkins/jenkins:latest

# 查看log
docker logs devops-jenkins
```

</CodeBlock>

- jenkins for windows

<CodeBlock>

```bash
# https://github.com/jenkinsci/docker/blob/master/README.md

# step1
docker pull jenkins/jenkins:latest

# step2
docker run -d -p 8080:8080 -p 50000:50000 --name devops-jenkins -v d:/docker/jenkins_home:/var/jenkins_home jenkins/jenkins:latest

# 初始密码位置
D:/docker/jenkins_home/secrets/initialAdminPassword

# local hosts add: 127.0.0.1  jenkins.chenio.com
```

</CodeBlock>

## jenkins docker-compose

### jenkins for mac

- docker-compose.yml

<CodeBlock>

```bash
# docker-compose.yml
version: '2'
services:
  web:
    image: 'jenkins/jenkins:latest'
    restart: always
    hostname: 'jenkins.chenio.com'
    pid: "host"
    ports:
      - '8080:8080'
      - '50000:50000'
    volumes:
      - '/Users/pc/srv/jenkins_home:/var/jenkins_home'
```

</CodeBlock>

- 运行：docker-compose up -d

### jenkins for windows

- `docker-compose.yml`

<CodeBlock>

```bash
# local hosts add: 127.0.0.1  jenkins.chenio.com
version: '3'
services:
  web:
    image: 'jenkins/jenkins:latest'
    restart: always
    hostname: 'jenkins.chenio.com'
    pid: "host"
    ports:
      - '8080:8080'
      - '50000:50000'
    volumes:
      - 'd:/docker/jenkins_home:/var/jenkins_home'
```

</CodeBlock>

- 运行：docker-compose up -d

## GitLab-CI

- [Configuration of your jobs with .gitlab-ci.yml](https://docs.gitlab.com/ee/ci/yaml/)
- [原文：Gitlab-CI job 配置文件 .gitlab-ci.yml 配置方式(翻译)](https://blog.csdn.net/kunyus/article/details/81390330)
- gitlab-ci 使用 YAML 文件管理配置 job
- Job: YAML 文件定义了一系列带有约束说明的 job, job **至少**需要要包含 script
  - script 可以直接执行系统命令(如：./configure;make;make install)或者直接执行脚本(test.sh)
  - 任务是由 CI 接管并且在服务器执行, 并且**每一个任务的执行都是独立的**
- job 的名称具有**唯一性**在文件中只能出现一次; 下列词汇是**保留字段，不能被使用**命名为 job 名称
- 关键字: 不可以被用于 Job 名 的保留字

| 关键字        | 是否必须 | 描述                                 |
| ------------- | :------: | ------------------------------------ |
| image         |    no    | 用于 docker 镜像                     |
| services      |    no    | 用于 docker 服务                     |
| stages        |    no    | 定义构建阶段                         |
| types         |    no    | stages 的别名(已废除)                |
| before_script |    no    | 定义在每个 job 之前运行的命令        |
| after_script  |    no    | 定义在每个 job 之后运行的命令        |
| variables     |    no    | 定义构建变量                         |
| cache         |    no    | 定义一组文件列表，可在后续运行中使用 |

- only and except 保留字

| 关键字    | 描述                                                                                           |
| --------- | ---------------------------------------------------------------------------------------------- |
| branches  | 当一个分支被 push 上来                                                                         |
| tags      | 当一个打了 tag 的分支被 push 上来                                                              |
| api       | 当一个 pipline 被 piplines api 所触发调起                                                      |
| external  | 当使用了 GitLab 以外的 CI 服务                                                                 |
| pipelines | 针对多项目触发器而言，当使用 CI_JOB_TOKEN 并使用 gitlab 所提供的 api 创建多个 pipelines 的时候 |
| pushes    | 当 pipeline 被用户的 git push 操作所触发的时候                                                 |
| schedules | 针对预定好的 pipline 而言（每日构建一类）                                                      |
| triggers  | 用 token 创建 piplines 的时候                                                                  |
| web       | 在 GitLab 页面上 Pipelines 标签页下，你按了 run pipline 的时候                                 |

- job 可以配置的参数列表

| 参数名称      | 是否必须 | 参数说明                                                                      |
| :------------ | :------: | :---------------------------------------------------------------------------- |
| script        |   yes    | 需要在 docker 容器中运行的脚本                                                |
| image         |    no    | 所使用的 docker 镜像                                                          |
| services      |    no    | 需要关联的 docker 服务                                                        |
| stage         |    no    | 定义当前 job 运行在那个阶段 (默认: test)                                      |
| variables     |    no    | 定义 job 级别的变量                                                           |
| only          |    no    | 定义一列 git 分支，并为其创建 job                                             |
| except        |    no    | 定义一列 git 分支，不创建 job                                                 |
| tags          |    no    | 通过 tags 确定使用指定还是使用通用部署程序                                    |
| allow_failure |    no    | 允许 job 失败， job 失败不会影响最终结果                                      |
| when          |    no    | 定义 job 在什么时候运行， 支持参数 on_success, on_failure, always 或者 manual |
| dependencies  |    no    | 定义 job 依赖关系，这样他们就可以互相传递 artifacts                           |
| artifacts     |    no    | Define list of job artifacts                                                  |
| cache         |    no    | 定义应在后续运行之间缓存的文件列表                                            |
| before_script |    no    | 覆盖 job 执行前需要执行的脚本设置                                             |
| after_script  |    no    | 覆盖 job 执行后需要执行的脚本设置                                             |
| environment   |    no    | 定义此作业完成部署的环境名称                                                  |
| coverage      |    no    | 定义给定作业的代码覆盖率设置                                                  |
| retry         |    no    | job 执行发生故障时自动重试次数                                                |

<CodeBlock>

```bash
# job示例

image: ruby:2.1
services:
  - postgres

before_script:
  - bundle install

after_script:
  - rm secrets

stages:
  - build
  - test
  - deploy

job1:
  stage: build
  script:
    - execute-script-for-job1
  only:
    - master
  tags:
    - docker
```

</CodeBlock>

- image and services: 这两个关键字允许使用一个自定义的 Docker 镜像和一系列的服务，并且可以用于整个 job 周期
- before_script:
  - 必须是数组或多行字符串
  - 支持定义为 global 和 job 类型， job 类型会覆盖掉 global 类型的值
  - 定义在所有 job（包括 deploy job）之前运行的命令。（在 _artifacts_ 运行之后）
- after_script
  - 必须是数组或多行字符串
  - 支持定义为 global 和 job 类型， job 类型会覆盖掉 global 类型的值
  - 定义在所有 job（包括失败的 job）之后运行的命令

<CodeBlock>

```bash
# script示例

before_script:
  - global before script

job:
  before_script:
    - execute this instead of global before script
  script:
    - my command
  after_script:
    - execute this after my script
```

</CodeBlock>

- stages
  - 只支持 global 类型
  - 定义了 job 支持的执行阶段和顺序
  - stages 中的元素顺序决定了对应 job 的执行顺序
  - 下一个 阶段 的 job 只会在前一个 阶段 的 job 执行成功后开始执行

<CodeBlock>

```bash
# stages示例
stages:
  - build
  - test
  - deploy

# 运行顺序：
1. 运行所有的 build
2. 如果所有作业都 build 运行成功，那么开始运行所有的 test
3. 如果所有作业都 test 运行成功，那么开始运行所有的 deploy
4. 如果所有作业都 deploy 成功，则标记 job 为 passed
5. 如果在之前动作中有任何失败，则标记 job 为 failed 并终止 job 执行

# 没有定义stages时的默认动作
如果 .gitlab-ci.yml 文件中没有定义 stages , stages 将会被设置成 build -> test -> deploy.
如果 job 没有定义 stage, 则 job 的 stage 将会被设置成 test
```

</CodeBlock>

- stage
  - 相同 stage 的 job 会并行执行
  - stage 的值必须定义在 stages 中，可以通过设置 stage 来对 job 进行分组，相同分组的 job 将会并行执行.

<CodeBlock>

```bash
# stage示例
stages:
  - build
  - test
  - deploy

job 1:
  stage: build
  script: make build dependencies

job 2:
  stage: build
  script: make build artifacts

job 3:
  stage: test
  script: make test

job 4:
  stage: deploy
  script: make deploy
```

</CodeBlock>

- script
  - script 是 job 运行需要的唯一一个必须字段, 通过 script 来指定应该如何执行 job
  - script 可以设置为 string 和 array 类型

<CodeBlock>

```bash
# script 设置为 string 来设置 job 执行什么命令
job:
  script: "bundle exec rspec"

# script 设置为 array 来指定运行多个命令
job:
  script:
    - uname -a
    - bundle exec rspec

# 如果命令中包含有特殊字符, 则需要用双引号将 script 括起来
job:
script:
  - make
  - "ps -aux | grep gcc"
```

</CodeBlock>

- YAML 中的特殊字符:
  `:` 、 `{` 、 `}` 、 `[` 、 `]` 、`,` 、 `&` 、 `*` 、 `#` 、 `?` 、 `|` 、 `-` 、 `<` 、 `>` 、 `=` 、 `!` 、 `%` 、`@` 、`` ` 。
- only and except

  - 只有满足 only 条件的 branches 和 tags 才会被运行
  - except 和 only 相反, 满足 except 条件的 branches 和 tags 将 不会 被运行

- refs 策略的使用规则:
  - only 和 except 支持使用正则表达式.
  - only 和 except 支持使用特殊的关键字.
  - only 和 except 支持同时设置, 当同时设置时 only 和 except 将会同时起作用.
  - only 和 except 也可以用来指定 forks 作业的存储库路径

<CodeBlock>

```bash
# job 会跳过所有分支, 只在以 issue- 开头的 ref 时运行

job:
  # use regexp
  only:
    - /^issue-.*$/
  # use special keyword
  except:
    - branches

# job 只会执行有 tags 或者通过API触发器构建的 refs

job:
  # use special keywords
  only:
    - tags
    - triggers
    - schedules

# 只会在除 gitlab-org/gitlab-ce 的 master 分支外的其他分支时才会运行

job:
  only:
    - branches@gitlab-org/gitlab-ce
  except:
    - master@gitlab-org/gitlab-ce
```

</CodeBlock>

- artifacts:
  - 用于指定成功后应附加到 job 的文件和目录的列表
  - 只能使用项目工作间内的文件或目录路径
  - 定义一个空的 dependencies 数组可以禁用 artifact 传递

<CodeBlock>

```bash
# artifacts示例
job:
  stage: build
  script: make build
  dependencies: []
```

</CodeBlock>

- variables: GitLab CI 允许你为.gitlab-ci.yml 增加变量，该变量将会被设置入任务环境

<CodeBlock>

```bash
# 变量

variables:
    DATABASE_URL: "postgres://postgres@postgres/my_database"
# 注意:整数和字符串一样，对于设置变量名和变量值来说都是合法的。但浮点数是非法的。
```

</CodeBlock>

- tags：用来确定使用哪个 runner 运行当前任务，如果不设置的话将使用通用 runner 运行

<CodeBlock>

```bash
# 只有同时定义了 ruby 和 postgres 的 runner 才能运行这个 job

job:
  tags:
    - ruby
    - postgres
```

</CodeBlock>

- allow_failure: 允许 job 失败. job 失败不会影响最终结果

<CodeBlock>

```bash
#  当 job1 运行失败, 也不会打断 CI 执行，CI 会继续运行下一阶段

job1:
  stage: test
  script:
    - execute_script_that_will_fail
  allow_failure: true

job2:
  stage: test
  script:
    - execute_script_that_will_succeed

job3:
  stage: deploy
  script:
    - deploy_to_staging
```

</CodeBlock>

- when 用来指示 job 应该在什么时候开始运行
  - on_success - 只有之前的阶段全部成功时才会执行.(默认值)
  - on_failure - 当之前的阶段执行过程中出现过任何错误时执行
  - always - 无论之前的阶段是否执行成功都执行
  - manual - 手动执行

<CodeBlock>

```bash
stages:
  - build
  - cleanup_build
  - test
  - deploy
  - cleanup

build_job:
  stage: build
  script:
    - make build

cleanup_build_job:
  stage: cleanup_build
  script:
    - cleanup build when failed
  when: on_failure

test_job:
  stage: test
  script:
    - make test

deploy_job:
  stage: deploy
  script:
    - make deploy
  when: manual

cleanup_job:
  stage: cleanup
  script:
    - cleanup after jobs
  when: always

# 1 cleanup_build_job 只有在 build_job 失败时才会执行
# 2 不论其他 job 是否执行成功, cleanup_job 总会在最后一个被执行
# 3 可以通过 Gitlab 控制台手动执行 deploy_job
```

</CodeBlock>

- [GitLab-CI 中的 artifacts 使用研究](https://zacksleo.github.io/2017/04/18/GitLab-CI%E4%B8%AD%E7%9A%84artifacts%E4%BD%BF%E7%94%A8%E7%A0%94%E7%A9%B6/)
