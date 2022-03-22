(window.webpackJsonp=window.webpackJsonp||[]).push([[77],{698:function(s,t,a){"use strict";a.r(t);var n=a(1),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("ul",[a("li",[a("a",{attrs:{href:"https://travis-ci.org/",target:"_blank",rel:"noopener noreferrer"}},[s._v("travis-ci 社区版"),a("OutboundLink")],1)]),s._v(" "),a("li",[a("a",{attrs:{href:"https://docs.travis-ci.com/user/languages/javascript-with-nodejs/",target:"_blank",rel:"noopener noreferrer"}},[s._v("travis-ci: javascript-with-nodejs"),a("OutboundLink")],1)]),s._v(" "),a("li",[a("a",{attrs:{href:"https://www.cnblogs.com/dmego/p/7664877.html",target:"_blank",rel:"noopener noreferrer"}},[s._v("使用 Travis CI 自动部署 Hexo 到 GitHub"),a("OutboundLink")],1)]),s._v(" "),a("li",[a("a",{attrs:{href:"http://hacktech.cn/2018/09/07/use-travis-ci-update-hexo-to-github-and-coding.html",target:"_blank",rel:"noopener noreferrer"}},[s._v("使用 Travis CI 自动部署博客到 github pages 和 coding pages"),a("OutboundLink")],1)]),s._v(" "),a("li",[a("a",{attrs:{href:"https://segmentfault.com/a/1190000009054888",target:"_blank",rel:"noopener noreferrer"}},[s._v("使用 Travis 自动部署 Hexo 到 Github 与 自己的服务器"),a("OutboundLink")],1)]),s._v(" "),a("li",[a("a",{attrs:{href:"http://www.ruanyifeng.com/blog/2017/12/travis_ci_tutorial.html",target:"_blank",rel:"noopener noreferrer"}},[s._v("持续集成服务 Travis CI 教程"),a("OutboundLink")],1)]),s._v(" "),a("li",[a("a",{attrs:{href:"https://www.jianshu.com/p/f9aa74d3066d",target:"_blank",rel:"noopener noreferrer"}},[s._v("前端持续集成解决方案"),a("OutboundLink")],1)]),s._v(" "),a("li",[a("a",{attrs:{href:"http://onetracy.com/2017/01/01/travis/",target:"_blank",rel:"noopener noreferrer"}},[s._v("在 github 中使用 travis CI"),a("OutboundLink")],1)])]),s._v(" "),a("h2",{attrs:{id:"travis配置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#travis配置"}},[s._v("#")]),s._v(" travis配置")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# https://docs.travis-ci.com/user/job-lifecycle/")]),s._v("\n\nsudo: "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("false")]),s._v("\nlanguage: node_js\nnode_js:\n  - "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"lts/*"')]),s._v("\n\naddons\ncache "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# https://docs.travis-ci.com/user/caching/#arbitrary-directories")]),s._v("\nbefore_install "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# install 阶段之前执行")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 字段用来指定安装脚本")]),s._v("\nbefore_script "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# script 阶段之前执行")]),s._v("\nscript "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 字段用来指定构建或测试脚本")]),s._v("\nbefore_cache "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 用于清除cache https://docs.travis-ci.com/user/caching#before_cache-phase")]),s._v("\nafter_success "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# script 阶段成功时执行")]),s._v("\nafter_failure "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# script 阶段失败时执行")]),s._v("\nbefore_deploy "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# deploy 部署之前执行")]),s._v("\ndeploy "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 部署 https://docs.travis-ci.com/user/deployment/pages/")]),s._v("\nafter_deploy "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# deploy 部署之后执行")]),s._v("\nafter_script "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# script 阶段之后执行")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("env")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# https://docs.travis-ci.com/user/environment-variables/")]),s._v("\nbranches "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# https://docs.travis-ci.com/user/customizing-the-build/#safelisting-or-blocklisting-branches")]),s._v("\nnotifications "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# https://docs.travis-ci.com/user/notifications/")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br")])]),a("h2",{attrs:{id:"参考示例"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参考示例"}},[s._v("#")]),s._v(" 参考示例")]),s._v(" "),a("ul",[a("li",[s._v("项目根目录下创建："),a("code",[s._v(".travis.yml")])])]),s._v(" "),a("div",{staticClass:"language-yml line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-yml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("sudo")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean important"}},[s._v("false")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("language")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" node_js\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("node_js")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" stable\n\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("cache")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("directories")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" node_modules\n\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("install")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" npm install\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" npm run build "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 项目打包命令")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("after_success")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" cd ./guide "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 项目打包后的目录")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" git init\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(' git config user.name "your name "\n  '),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(' git config user.email "your xxx@email.com"\n  '),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" git add .\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" git commit "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v('m "Travis CI Auto Builder"\n  '),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" git push "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("force "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v('quiet "https'),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("//$"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("GH_TOKEN"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("@$"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("GH_REF"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v('" master'),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("gh"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("pages "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v('# Config Github "Personal access tokens"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("branches")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("only")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" master "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 打包的分支")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("env")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("global")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("GH_REF")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" github.com/chengzao/guide.git "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# Your github repo url")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br")])])])}),[],!1,null,null,null);t.default=e.exports}}]);