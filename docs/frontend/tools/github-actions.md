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

- [JamesIves/github-pages-deploy-action](https://github.com/JamesIves/github-pages-deploy-action)

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
