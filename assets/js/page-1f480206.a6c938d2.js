(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{689:function(a,s,n){"use strict";n.r(s);var t=n(3),e=Object(t.a)({},(function(){var a=this,s=a.$createElement,n=a._self._c||s;return n("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[n("ul",[n("li",[n("a",{attrs:{href:"https://manjaro.org/",target:"_blank",rel:"noopener noreferrer"}},[a._v("manjaro 官网"),n("OutboundLink")],1)]),a._v(" "),n("li",[n("a",{attrs:{href:"https://mirrors.ustc.edu.cn/",target:"_blank",rel:"noopener noreferrer"}},[a._v("中科大镜像"),n("OutboundLink")],1)]),a._v(" "),n("li",[n("a",{attrs:{href:"https://mirrors.tuna.tsinghua.edu.cn/",target:"_blank",rel:"noopener noreferrer"}},[a._v("清华大学开源软件镜像站"),n("OutboundLink")],1)])]),a._v(" "),n("h2",{attrs:{id:"manjaro-命令"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#manjaro-命令"}},[a._v("#")]),a._v(" manjaro 命令")]),a._v(" "),n("CodeBlock",[n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[a._v("pacman -S   "),n("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 安装")]),a._v("\npacman -R   "),n("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 删除")]),a._v("\npacman -Rs  "),n("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 移除已安装不需要软件包")]),a._v("\npacman -Rsc "),n("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 删除一个包,所有依赖")]),a._v("\npacman -Syu "),n("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 升级包")]),a._v("\npacman -Ss  "),n("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 查询包数据库")]),a._v("\npacman -Qs  "),n("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 搜索以安装的包")]),a._v("\npacman -Si  "),n("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 显示包大量信息")]),a._v("\npacman -Qi  "),n("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 本地安装包")]),a._v("\npacman -Sc  "),n("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 清理包缓存")]),a._v("\npacman -Syyu  "),n("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 更新系统")]),a._v("\n")])]),a._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[a._v("1")]),n("br"),n("span",{staticClass:"line-number"},[a._v("2")]),n("br"),n("span",{staticClass:"line-number"},[a._v("3")]),n("br"),n("span",{staticClass:"line-number"},[a._v("4")]),n("br"),n("span",{staticClass:"line-number"},[a._v("5")]),n("br"),n("span",{staticClass:"line-number"},[a._v("6")]),n("br"),n("span",{staticClass:"line-number"},[a._v("7")]),n("br"),n("span",{staticClass:"line-number"},[a._v("8")]),n("br"),n("span",{staticClass:"line-number"},[a._v("9")]),n("br"),n("span",{staticClass:"line-number"},[a._v("10")]),n("br"),n("span",{staticClass:"line-number"},[a._v("11")]),n("br")])])]),a._v(" "),n("h2",{attrs:{id:"manjaro-配置"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#manjaro-配置"}},[a._v("#")]),a._v(" Manjaro 配置")]),a._v(" "),n("ul",[n("li",[a._v("配置中国的 mirrors "),n("code",[a._v("sudo pacman-mirrors -i -c China -m rank")])]),a._v(" "),n("li",[a._v("安装 gedit"),n("code",[a._v("sudo pacman -S gedit")])]),a._v(" "),n("li",[a._v("在 "),n("code",[a._v("/etc/pacman.conf")]),a._v("中添加"),n("code",[a._v("archlinuxcn")]),a._v("源 "),n("code",[a._v("sudo gedit /etc/pacman.conf")])])]),a._v(" "),n("CodeBlock",[n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("archlinuxcn"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\nSigLevel "),n("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" Optional TrustedOnly\nServer "),n("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" https://mirrors.ustc.edu.cn/archlinuxcn/"),n("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$arch")]),a._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("arch4edu"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\nSigLevel "),n("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" Never\nServer "),n("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" http://mirrors.tuna.tsinghua.edu.cn/arch4edu/"),n("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$arch")]),a._v("\n")])]),a._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[a._v("1")]),n("br"),n("span",{staticClass:"line-number"},[a._v("2")]),n("br"),n("span",{staticClass:"line-number"},[a._v("3")]),n("br"),n("span",{staticClass:"line-number"},[a._v("4")]),n("br"),n("span",{staticClass:"line-number"},[a._v("5")]),n("br"),n("span",{staticClass:"line-number"},[a._v("6")]),n("br")])])]),a._v(" "),n("ul",[n("li",[a._v("更新源列表 "),n("code",[a._v("sudo pacman -Syyu")])]),a._v(" "),n("li",[a._v("安装 yaourt,使用 AUR 源里的软件 "),n("code",[a._v("sudo pacman -S yaourt pacaur")])]),a._v(" "),n("li",[a._v("修改配置文件后，执行命令"),n("code",[a._v("sudo pacman -Syy && sudo pacman -S archlinuxcn-keyring")])]),a._v(" "),n("li",[a._v("将本地数据包与远程数据包同步 "),n("code",[a._v("sudo pacman -Syy")])]),a._v(" "),n("li",[a._v("安装 vim "),n("code",[a._v("sudo pacman -S vim")])]),a._v(" "),n("li",[a._v("安装 git"),n("code",[a._v("sudo pacman -S git")])]),a._v(" "),n("li",[a._v("安装 ZSH "),n("code",[a._v("sudo pacman -S zsh")])]),a._v(" "),n("li",[a._v("配置 oh-my-zsh "),n("code",[a._v('sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"')])]),a._v(" "),n("li",[a._v("更换默认的 shell "),n("code",[a._v("chsh -s /bin/zsh")])]),a._v(" "),n("li",[a._v("安装搜狗输入法")])]),a._v(" "),n("CodeBlock",[n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" pacman -S fcitx-sogoupinyin\n"),n("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" pacman -S fcitx-im         "),n("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 全部安装")]),a._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" pacman -S fcitx-configtool "),n("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 图形化配置工具")]),a._v("\n")])]),a._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[a._v("1")]),n("br"),n("span",{staticClass:"line-number"},[a._v("2")]),n("br"),n("span",{staticClass:"line-number"},[a._v("3")]),n("br")])])]),a._v(" "),n("ul",[n("li",[a._v("设置中文输入法环境变量，编辑"),n("code",[a._v("~/.xprofile")]),a._v("文件，增加下面几行(如果文件不存在，则新建)")])]),a._v(" "),n("CodeBlock",[n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("export")]),a._v(" "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("GTK_IM_MODULE")]),n("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("fcitx\n"),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("export")]),a._v(" "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("QT_IM_MODULE")]),n("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("fcitx\n"),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("export")]),a._v(" "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[n("span",{pre:!0,attrs:{class:"token environment constant"}},[a._v("XMODIFIERS")])]),n("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),n("span",{pre:!0,attrs:{class:"token string"}},[a._v('"@im=fcitx"')]),a._v("\n")])]),a._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[a._v("1")]),n("br"),n("span",{staticClass:"line-number"},[a._v("2")]),n("br"),n("span",{staticClass:"line-number"},[a._v("3")]),n("br")])])]),a._v(" "),n("h2",{attrs:{id:"常用软件安装"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#常用软件安装"}},[a._v("#")]),a._v(" 常用软件安装")]),a._v(" "),n("ul",[n("li",[a._v("谷歌浏览器 ("),n("code",[a._v("sudo pacman -S chromium")]),a._v(")")]),a._v(" "),n("li",[a._v("网易云音乐 ("),n("code",[a._v("sudo pacman -S netease-cloud-music")]),a._v(")")]),a._v(" "),n("li",[a._v("wine ("),n("code",[a._v("pacman -S wine")]),a._v(")")])]),a._v(" "),n("h2",{attrs:{id:"相关链接"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#相关链接"}},[a._v("#")]),a._v(" 相关链接")]),a._v(" "),n("ul",[n("li",[n("a",{attrs:{href:"https://juejin.im/post/5a6b1b3651882573443cea61",target:"_blank",rel:"noopener noreferrer"}},[a._v("Manjaro 安装以及美化教程"),n("OutboundLink")],1)])])],1)}),[],!1,null,null,null);s.default=e.exports}}]);