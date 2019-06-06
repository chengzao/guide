# travis-ci

- [travis-ci 社区版](https://travis-ci.org/)
- [travis-ci: javascript-with-nodejs](https://docs.travis-ci.com/user/languages/javascript-with-nodejs/)
- [使用Travis CI自动部署Hexo到GitHub](https://www.cnblogs.com/dmego/p/7664877.html)
- [使用Travis CI自动部署博客到github pages和coding pages](http://hacktech.cn/2018/09/07/use-travis-ci-update-hexo-to-github-and-coding.html)
- [使用 Travis 自动部署 Hexo 到 Github 与 自己的服务器](https://segmentfault.com/a/1190000009054888)
- [持续集成服务 Travis CI 教程](http://www.ruanyifeng.com/blog/2017/12/travis_ci_tutorial.html)
- [前端持续集成解决方案](https://www.jianshu.com/p/f9aa74d3066d)
- [在github中使用travis CI](http://onetracy.com/2017/01/01/travis/)

## 配置

<CodeBlock>

```bash
# https://docs.travis-ci.com/user/job-lifecycle/

sudo: false
language: node_js
node_js:
  - "lts/*"

addons
cache # https://docs.travis-ci.com/user/caching/#arbitrary-directories
before_install # install 阶段之前执行
install # 字段用来指定安装脚本
before_script # script 阶段之前执行
script # 字段用来指定构建或测试脚本
before_cache # 用于清除cache https://docs.travis-ci.com/user/caching#before_cache-phase
after_success # script 阶段成功时执行
after_failure # script 阶段失败时执行
before_deploy # deploy 部署之前执行
deploy # 部署 https://docs.travis-ci.com/user/deployment/pages/
after_deploy # deploy 部署之后执行
after_script # script 阶段之后执行

env # https://docs.travis-ci.com/user/environment-variables/
branches # https://docs.travis-ci.com/user/customizing-the-build/#safelisting-or-blocklisting-branches
notifications # https://docs.travis-ci.com/user/notifications/
```

</CodeBlock>

## 参考示例

<CodeBlock>

```bash
sudo: false
language: node_js
node_js: stable

cache:
  directories:
    - node_modules

install:
    - npm install
script:
    - npm run build
after_success:
    - cd ./guide
    - git init
    - git config user.name "chengzao"
    - git config user.email "test@test.com"
    - git add .
    - git commit -m "Travis CI Auto Builder"
    - git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages
branches:
    only:
        - master
env:
    global:
        - GH_REF: github.com/chengzao/guide.git
```

</CodeBlock>
