(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{748:function(s,n,a){"use strict";a.r(n);var t=a(5),e=Object(t.a)({},(function(){var s=this,n=s.$createElement,a=s._self._c||n;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h2",{attrs:{id:"如何使用分支"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#如何使用分支"}},[s._v("#")]),s._v(" 如何使用分支")]),s._v(" "),a("CodeBlock",[a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" checkout -b "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("branch"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("       "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 新建一个分支，并切换到该分支")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" branch           "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 命令会列出所有分支，当前分支前面会标一个*号。")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(".")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" commit -m "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"提交分支branch"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" checkout master        "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 切换回master分支")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" merge "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("branch"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("         "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 把branch分支合并到master分支")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" branch -d branch       "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 合并完成后删除branch分支")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" branch -r   "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看远程分支")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" checkout -b a origin/a  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 拉去远程分支到本地")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br")])])]),s._v(" "),a("h2",{attrs:{id:"分支管理策略"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#分支管理策略"}},[s._v("#")]),s._v(" 分支管理策略")]),s._v(" "),a("CodeBlock",[a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" checkout -b dev                                 "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 首先，仍然创建并切换dev分支：")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" readme.txt                                  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 修改readme.txt文件，并提交一个新的commit")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" checkout master                                 "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 现在，我们切换回master分支")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" merge --no-ff -m "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"merge with no-ff"')]),s._v(" dev         "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 准备合并dev分支，请注意--no-ff参数，表示禁用Fast forward")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" log --graph --pretty"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("oneline --abbrev-commit    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 合并后，我们用git log看看分支历史：")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 合并分支时，加上--no-ff参数就可以用普通模式合并，合并后的历史有分支，")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 能看出来曾经做过合并，而fast forward合并就看不出来曾经做过合并。")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br")])])]),s._v(" "),a("h2",{attrs:{id:"bug-分支"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#bug-分支"}},[s._v("#")]),s._v(" Bug 分支")]),s._v(" "),a("CodeBlock",[a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("------------                        "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 我们在dev分支上，发现master分支上有代号101号bug")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" stash                           "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 冷冻现在在dev分支上的工作状态 冻结吧！")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" checkout master            "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 这个bug发生在master主分支上,我们切回master分支")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" checkout -b issue-101       "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 创建代号101的修复bug分支")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 修改你的bug")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" readme.txt              "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 提交到暂存区")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" commit -m "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"fix bug 101"')]),s._v("     "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 注意填写信息，以免日后查证")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" checkout master             "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 切换回master分支")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" merge --no-ff -m "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"merged bug fix 101"')]),s._v(" issue-101     "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 合并分支，注意不使用fast forward模式")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" branch -d issue-101         "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 删除issue-101分支")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" checkout dev                 "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# bug 改完了，是时候回到dev继续写bug了")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" stash list                   "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看刚刚的冻结现场")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" stash pop                    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# git stash pop，恢复的同时把stash内容也删了：")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 一是用git stash apply恢复，但是恢复后，stash内容并不删除，你需要用git stash drop来删除")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br")])])]),s._v(" "),a("h2",{attrs:{id:"合并分支上特定文件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#合并分支上特定文件"}},[s._v("#")]),s._v(" 合并分支上特定文件")]),s._v(" "),a("CodeBlock",[a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" checkout source_branch "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("path"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v(".\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 将a分支中的test文件合并到主分支b")]),s._v("\n------------------------\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 使用git checkout 将根据b分支创建一个b_tmp分支，避免影响b分支")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" checkout -b b_tmp  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 新建b_tmp分支并切换")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" checkout a "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("test")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 将a分支中的test文件覆盖到b_tmp中")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" commit -am "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"merge branch a"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" checkout b  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 切换到b分支")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" merge --no-ff b_tmp  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 合并b_tmp到b分支")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" branch -d b_tmp "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 删除b_tmp分支")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br")])])]),s._v(" "),a("h2",{attrs:{id:"rebase-合并多个-commit"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#rebase-合并多个-commit"}},[s._v("#")]),s._v(" rebase 合并多个 commit")]),s._v(" "),a("CodeBlock",[a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" log --oneline\n-----------\n972c774 "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("HEAD -"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" master"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" mod readme.md content\n64b9edd "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" index.js\n7d7d42b "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" index.css\n7a5e790 "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" index.html\nba3849c "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" readme.md\n-----------\n\nstep1: "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" rebase -i ba3849c\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 进入编辑界面如下，修改 pick  -> s")]),s._v("\n-----------\npick 7a5e790 "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" index.html\ns 7d7d42b "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" index.css\ns b9edd "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" index.js\npick 972c774 mod readme.md content\n-----------\n\nstep1保存退出后，自动跳转到这里修改\n-----------\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# This is a combination of 3 commits.")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 自己加的commit")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" index static objects\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# This is the 1st commit message:")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" index.html\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# This is the commit message #2:")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" index.css\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# This is the commit message #3:")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" index.js\n-----------\n\nstep2: "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" log --oneline "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看日志")]),s._v("\n-----------\n1e59df0 "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("HEAD -"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" master"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" mod readme.md content\nba3958e "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" index static objects\nba3849c "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" readme.md\n-----------\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br"),a("span",{staticClass:"line-number"},[s._v("31")]),a("br"),a("span",{staticClass:"line-number"},[s._v("32")]),a("br"),a("span",{staticClass:"line-number"},[s._v("33")]),a("br"),a("span",{staticClass:"line-number"},[s._v("34")]),a("br"),a("span",{staticClass:"line-number"},[s._v("35")]),a("br"),a("span",{staticClass:"line-number"},[s._v("36")]),a("br"),a("span",{staticClass:"line-number"},[s._v("37")]),a("br"),a("span",{staticClass:"line-number"},[s._v("38")]),a("br"),a("span",{staticClass:"line-number"},[s._v("39")]),a("br"),a("span",{staticClass:"line-number"},[s._v("40")]),a("br"),a("span",{staticClass:"line-number"},[s._v("41")]),a("br"),a("span",{staticClass:"line-number"},[s._v("42")]),a("br"),a("span",{staticClass:"line-number"},[s._v("43")]),a("br")])])]),s._v(" "),a("h2",{attrs:{id:"rebase-修改-commit"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#rebase-修改-commit"}},[s._v("#")]),s._v(" rebase 修改 commit")]),s._v(" "),a("CodeBlock",[a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("-----------\n1c08687 "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("HEAD -"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" master"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" mod readme.md content\n30fa507 "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" index\n0aa75f0 "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" readme.md\n-----------\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" rebase -i 0aa75f0\n-----------\npick 30fa507 "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" index\nr 1c08687 mod readme.md content\n-----------\n\n-----------\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# mod readme.md content")]),s._v("\n修改 readme.md 内容\n-----------\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" log --oneline\n-----------\n26d1338 "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("HEAD -"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" master"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" 修改 readme.md 内容\n30fa507 "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" index\n0aa75f0 "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" readme.md\n-----------\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br")])])]),s._v(" "),a("h2",{attrs:{id:"rebase-合并非连续-commit"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#rebase-合并非连续-commit"}},[s._v("#")]),s._v(" rebase 合并非连续 commit")]),s._v(" "),a("CodeBlock",[a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" log --oneline\n-----------\n26d1338 "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("HEAD -"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" master"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" 修改 readme.md 内容\n30fa507 "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" index\n0aa75f0 "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" readme.md\n-----------\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" rebase -i 0aa75f0\n-----------\npick 0aa75f0 "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" readme.md\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# pick 30fa507 add index")]),s._v("\ns 26d1338 修改 readme.md 内容\npick 30fa507 "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" index\n-----------\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" rebase --continue\n-----------\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# This is a combination of 2 commits.")]),s._v("\n合并非连续的commit\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# This is the 1st commit message:")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" readme.md\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# This is the commit message #2:")]),s._v("\n\n修改 readme.md 内容\n-----------\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" log --oneline "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看日志")]),s._v("\n-----------\nde9b2eb "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("HEAD -"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" master"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" index\nc5a0c7a 合并非连续的commit\n-----------\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br"),a("span",{staticClass:"line-number"},[s._v("31")]),a("br"),a("span",{staticClass:"line-number"},[s._v("32")]),a("br"),a("span",{staticClass:"line-number"},[s._v("33")]),a("br")])])]),s._v(" "),a("h2",{attrs:{id:"使用-cherry-pick-合并-dev-分支的-commit-到-master-中"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#使用-cherry-pick-合并-dev-分支的-commit-到-master-中"}},[s._v("#")]),s._v(" 使用 cherry-pick 合并 dev 分支的 commit 到 master 中")]),s._v(" "),a("CodeBlock",[a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" log --oneline --all\n-----------\nc4570cf "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("dev"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" mod index.html content\n479e26c "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("HEAD -"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" master"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" mod readme.md content\n599b625 "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" index.js\n432febf "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" index.css\n"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8702882")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" index.html\ncf5c910 "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" readme.md\n-----------\n\nstep1: "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" checkout master\nstep2: "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" cherry-pick c4570cf\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" log --oneline --all\n-----------\n88ae02b "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("HEAD -"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" master"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" mod index.html content\nc4570cf "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("dev"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" mod index.html content\n479e26c mod readme.md content\n599b625 "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" index.js\n432febf "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" index.css\n"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8702882")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" index.html\ncf5c910 "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" readme.md\n-----------\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br")])])]),s._v(" "),a("h2",{attrs:{id:"example"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#example"}},[s._v("#")]),s._v(" example")]),s._v(" "),a("CodeBlock",[a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 如果git pull提示“no tracking information”，")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 则说明本地分支和远程分支的链接关系没有创建，用命令")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" branch --set-upstream branch-name origin/branch-name\n\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# git add一个错误文件,执行撤销命令:")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" reset "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("file"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 撤销指定的文件")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" reset "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 撤销所有的文件")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# git rm删除指定文件:")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("rm")]),s._v(" --cached "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(".")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 删除文件")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("rm")]),s._v(" -r --cached "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(".")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 删除文件和目录")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# git提交指定文件到gh-pages分支")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" dist\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" subtree push --prefix"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("dist orgin gh-pages\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# git commit一个错误文件,执行命令:")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 只撤销commit操作，保留文件")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" reset HEAD~1\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 撤销commit操作，删除变化")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" reset --hard HEAD~1\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br")])])]),s._v(" "),a("h2",{attrs:{id:"快速下载-github"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#快速下载-github"}},[s._v("#")]),s._v(" 快速下载 github")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" clone  https://github.com.cnpmjs.org/reactjs/zh-hans.reactjs.org.git\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])])],1)}),[],!1,null,null,null);n.default=e.exports}}]);