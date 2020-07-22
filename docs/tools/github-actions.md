---
title: github actions
date: 2020-07-19
sidebar: "auto"
tags:
  - github/actions
categories:
  - tools
---

- [ruanyifeng: getting-started-with-github-actions](http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)

- [workflow-syntax-for-github-actions](https://docs.github.com/cn/actions/reference/workflow-syntax-for-github-actions)

- `.github/workflows/publish.yml`

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
          BASE_BRANCH: master
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          BRANCH: gh-pages # The branch the action should deploy to.
          FOLDER: build # The folder the action should deploy.
```
