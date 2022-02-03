---
title: github的actions使用
date: 2020-07-19
sidebar: "auto"
tags:
  - github
categories:
  - frontend
---

- [ruanyifeng: getting-started-with-github-actions](http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)

- [workflow-syntax-for-github-actions](https://docs.github.com/cn/actions/reference/workflow-syntax-for-github-actions)

## github-pages-deploy-action

[JamesIves/github-pages-deploy-action](https://github.com/JamesIves/github-pages-deploy-action)

  项目根目录创建：`.github/workflows/publish.yml`

  ```yml
  name: Build and Deploy
  on:
    push:
      branches:
        - master
  jobs:
    build-and-deploy:
      runs-on: ubuntu-latest

      strategy:
        matrix:
          node-version: [12.x]

      steps:
        - name: Checkout 🛎️
          uses: actions/checkout@v2.3.1 # If you're using actions/checkout@v2 you must set persist-credentials to false in most cases for the deployment to work correctly.
          with:
            persist-credentials: false
            fetch-depth: 0

        - name: Use Node.js ${{ matrix.node-version }}
          uses: actions/setup-node@v1
          with:
            node-version: ${{ matrix.node-version }}

        - name: Install and Build 🔧 # This example project is built using npm and outputs the result to the 'build' folder. Replace with the commands required to build your project, or remove this step entirely if your site is pre-built.
          run: |
            npm install
            npm run build

        - name: Deploy 🚀
          uses: JamesIves/github-pages-deploy-action@3.5.7
          with:
            GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} #
            BRANCH: gh-pages # The branch the action should deploy to.
            FOLDER: build # The folder the action should deploy.
  ```

- [caching-dependencies-to-speed-up-workflows](https://docs.github.com/cn/actions/configuring-and-managing-workflows/caching-dependencies-to-speed-up-workflows) - [actions/cache](https://github.com/actions/cache)

  ```yml
  name: Caching with npm

  on: push

  jobs:
    build:
      runs-on: ubuntu-latest

      steps:
        - uses: actions/checkout@v2

        - name: Cache node modules
          uses: actions/cache@v2
          env:
            cache-name: cache-node-modules
          with:
            # npm cache files are stored in `~/.npm` on Linux/macOS
            path: ~/.npm
            key: ${{ runner.os }}-build-${{ env.cache-name }}-${{ hashFiles('**/package-lock.json') }}
            restore-keys: |
              ${{ runner.os }}-build-${{ env.cache-name }}-
              ${{ runner.os }}-build-
              ${{ runner.os }}-

        - name: Install Dependencies
          run: npm install

        - name: Build
          run: npm build

        - name: Test
          run: npm tests
  ```

## actions schedule

- [schedule: events-that-trigger-workflows](https://docs.github.com/cn/actions/reference/events-that-trigger-workflows#)

```yml
# example
on:
  schedule:
    # * is a special character in YAML so you have to quote this string
    - cron:  '*/15 * * * *'


┌───────────── minute (0 - 59)
│ ┌───────────── hour (0 - 23)
│ │ ┌───────────── day of the month (1 - 31)
│ │ │ ┌───────────── month (1 - 12 or JAN-DEC)
│ │ │ │ ┌───────────── day of the week (0 - 6 or SUN-SAT)
│ │ │ │ │
│ │ │ │ │
│ │ │ │ │
* * * * *

# online website generate cron
https://crontab.guru/
```

## git-mirror-action

https://github.com/wearerequired/git-mirror-action

## gitee-pages-action

> https://github.com/marketplace/actions/gitee-pages-action

- https://github.com/yanglbme/gitee-pages-action

```yml
name: Sync

on: page_build

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Sync to Gitee
        uses: wearerequired/git-mirror-action@master
        env:
          # 注意在 Settings->Secrets 配置 GITEE_RSA_PRIVATE_KEY
          SSH_PRIVATE_KEY: ${{ secrets.GITEE_RSA_PRIVATE_KEY }}
        with:
          # 注意替换为你的 GitHub 源仓库地址
          source-repo: git@github.com:doocs/advanced-java.git
          # 注意替换为你的 Gitee 目标仓库地址
          destination-repo: git@gitee.com:Doocs/advanced-java.git

      - name: Build Gitee Pages
        uses: yanglbme/gitee-pages-action@main
        with:
          # 注意替换为你的 Gitee 用户名
          gitee-username: yanglbme
          # 注意在 Settings->Secrets 配置 GITEE_PASSWORD
          gitee-password: ${{ secrets.GITEE_PASSWORD }}
          # 注意替换为你的 Gitee 仓库，仓库名严格区分大小写，请准确填写，否则会出错
          gitee-repo: doocs/advanced-java
          # 要部署的分支，默认是 master，若是其他分支，则需要指定（指定的分支必须存在）
          branch: main
```

## 自动更新readme

```yml
# This is a basic workflow to help you get started with Actions

name: build readme

# Controls when the action will run. Triggers the workflow on push or pull request
# events but only for the master branch
on:   # 触发时机
  push:
    branches: [ master ]  # master有更新
  schedule:
    - cron:  '0 */6 * * *'  # 每6小时运行一次
# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest   # 使用最新版ubuntu镜像

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
    # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
    - uses: actions/checkout@v2

    - name: Setup Python  # 安装python环境
      uses: actions/setup-python@v2.1.1

    - name: Install Python dependencies  # 安装python爬虫依赖包
      run: python -m pip install urllib3 lxml

    - name: Run python   # 生成新的README.md文件
      run: python generateReadme.py

    - name: Record time
      run: echo `date` > date.log

    - name: Commit and push if changed   # 将README.md更新到仓库
      run: |
        git diff
        git config --global user.email "xindoo@zxs.io"
        git config --global user.name "zxs"
        git add -A
        git commit -m "Updated Readme" || exit
        git push
```


## push to gitee

> https://juejin.cn/post/6844904003353083918

```yml
name: Push to gitee

on:
  push:
    branches:
      - master
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v1

    - name: Set SSH Key
      env:
        SSH_KEY: ${{ secrets.GITEE_SSH_KEY }}
        SSH_KEY_PUB: ${{ secrets.GITEE_SSH_PUB }}
      run: |
        mkdir -p ~/.ssh
        ssh-keyscan -H gitee.com >> ~/.ssh/known_hosts
        echo ${SSH_KEY} > ~/.ssh/id_rsa
        sed -i -e "s#\\\\n#\n#g" ~/.ssh/id_rsa
        chmod 600 ~/.ssh/id_rsa
        echo ${SSH_KEY_PUB} > ~/.ssh/id_rsa.pub
        chmod 600 ~/.ssh/id_rsa.pub

    - name: Push to gitee
      run: |
        git switch -c master
        git remote add gitee git@gitee.com:befovy/images.git
        git push --set-upstream gitee master -f
```

## automerge-action

- https://github.com/pascalgn/automerge-action

```yml
name: Merge Imgbot

on:
  pull_request:
    types:
      - opened
      - ready_for_review
  pull_request_review:
    types:
      - submitted
  status: {}

jobs:
  automerge:
    runs-on: ubuntu-latest
    steps:
      - name: automerge
        uses: "pascalgn/automerge-action@v0.6.1"
        env:
          GITHUB_TOKEN: "${{ secrets.GIT_MERGE_TOKEN }}"
          MERGE_LABELS: ""
          MERGE_METHOD: "squash"
          MERGE_COMMIT_MESSAGE: "pull-request-description"
          MERGE_FORKS: "false"
          MERGE_RETRIES: "2"
          MERGE_RETRY_SLEEP: "10000"
          UPDATE_METHOD: "rebase"
```

## creating-a-javascript-action

https://docs.github.com/cn/actions/creating-actions/creating-a-javascript-action

## github to jsdelivr

- 访问仓库文件：https://cdn.jsdelivr.net/gh/user/repo/file
- 访问最新文件：https://cdn.jsdelivr.net/gh/user/repo@latest/file
- 按版本号访问：https://cdn.jsdelivr.net/gh/user/repo@1.2/file

## Awesome-PicGo

https://github.com/PicGo/Awesome-PicGo

## github api

- octokit graphql: https://github.com/octokit/graphql.js
- octokit rest api: https://github.com/octokit/octokit.js
