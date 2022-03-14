---
title: git常见命令列表
date: 2021-06-20
sidebar: "auto"
tags:
  - git
categories:
  - frontend
---

## config

- 配置生效优先级：`local > global > system`

```bash
# 配置
git config --global user.name "用户名"          # 配置用户名
git config --global user.email "用户邮箱"       # 配置邮箱
git config --global core.editor 编辑器          # 配置编辑器，模式使用vi或者vim

# 查看配置
git config --global user.name       # 查看配置的用户名
git config --global user.email      # 查看配置的邮箱

# 查看所有配置列表
git config --global --list      # 查看全局设置相关参数列表
git config --local --list       # 查看本地设置相关参数列表
git config --system --list      # 查看系统配置参数列表
git config --list               # 查看所有Git的配置(全局+本地+系统)

git config --global https.proxy http://127.0.0.1:1080
git config --global https.proxy https://127.0.0.1:1080
git config --global --unset http.proxy
git config --global --unset https.proxy
```

- ssh-keygen

```bash
# 存放密钥的文件夹
~/.ssh

# 创建一个 SSH key
ssh-keygen -t rsa -C "your_email@example.com"
# -t 指定密钥类型，默认是 rsa ，可以省略
# -C 设置注释文字，比如邮箱
# -f 指定密钥文件存储文件名

# ~/.ssh中，默认情况下生成的文件
id_dsa  # 私钥文件
id_dsa.pub # 公钥文件

# 添加公钥到指定服务器
~/.ssh/id_rsa.pub

# 测试一下该SSH key
ssh -T git@github.com
```

- [Connecting to GitHub with SSH](https://help.github.com/en/articles/connecting-to-github-with-ssh)

## init

```bash
git init rep_name     # 创建一个新的带Git仓库的项目
git init            # 为已存在的项目生成一个Git仓库
git init --bare     # 初始化裸仓库
```

## clone

```bash
git clone [-b branchName] [--depth=number] url [filedirname]
git clone -b [branch] origin_url # 克隆远程分支
```

## add

- 添加文件到暂存区

```bash
git add fileName  # 将工作区的某个文件添加到暂存区。
git add -u     # 添加所有被tracked文件中被修改或删除的文件信息到暂存区，不处理untracked的文件
git add -A     # 添加所有被tracked文件中被修改或删除的文件信息到暂存区，包括untracked的文件
git add .      # 将当前工作区的所有文件都加入暂存区
git add -i     # 进入交互界面模式，按需添加文件到缓存区 (不常用)

# 示例
git add A
git add B
# 配置不跟踪A和B
git add .gitignore

# 配置跟踪A和B, 先清除标记状态，然后先添加.gitignore
git rm -r --cached .    # 清除版本控制标记，.代表所有文件，也可指定具体文件
```

## .gitignore

```bash
*      # 匹配零个或多个任意字符
[abc]  # 只匹配括号内中的任意一个字符
[0-9]  # - 代表范围，匹配0-9之间的任何字符
?      # 匹配任意一个字符
**     # 匹配任意的中间目录，例如a/*/z可以匹配:a/z,a/b/z,a/b/c/z等
```

```bash
# 忽略所有以 .c结尾的文件
*.c

# 但是 stream.c 会被git追踪
!stream.c

# 只忽略当前文件夹下的TODO文件, 不包括其他文件夹下的TODO例如: subdir/TODO
/TODO

# 忽略所有在build文件夹下的文件
build/

# 忽略 doc/notes.txt, 但不包括多层下.txt例如: doc/server/arch.txt
doc/*.txt

# 忽略所有在doc目录下的.pdf文件
doc/**/*.pdf
```

## `.gitkeep`

git 默认会忽略空的文件夹, 使用.gitkeep 来追踪空的文件夹

## commit

```bash
git commit -m "提交说明"    # 将暂存区内容提交到本地仓库
git commit -a -m "提交说明" # 跳过缓存区操作，直接把工作区内容提交到本地仓库

# 合并暂存区和最近的一次commit，生成新的commit并替换掉老的。如果缓存区没内容，
# 利用amend可以修改上次commit的提交说明。
#
# 注：因为amend后生成的commit是一个全新的commit，旧的会被删除，所以别在公共的
# commit上使用amend！切记！！！

# 提交时显示所有diff信息
git commit -v

git commit --amend
git commit --amend --no-edit # 沿用上次commit的提交说明

# 使用一次新的commit，替代上一次提交
git commit --amend -m [message]

# 重做上一次commit，并包括指定文件的新变化
git commit --amend [file1] [file2] ...
```

## status

```bash
git status      # 查看工作区与暂存区的当前情况
git status -s   # 让结果以更简短的形式输出
```

## diff

```bash
git diff                     # 比较工作区与暂存区的区别
git diff --cached           # 比较暂存区与HEAD的区别
git diff branch_name              # 工作区与某分支的差异，远程分支这样写：remotes/origin/分支名
git diff HEAD               # 工作区与HEAD指针指向的内容差异
git diff <commit-id> filename-path     # 工作区某文件当前版本与历史版本的差异
git diff --stage           # 工作区文件与上次提交的差异(1.6 版本前用 --cached)
git diff 版本TAG           # 查看从某个版本后都改动内容
git diff 分支A 分支B       # 比较从分支A和分支B的差异(也支持比较两个TAG)
git diff 分支A...分支B    # 比较两分支在分开后各自的改动
git diff <commit-id> <commit-id>

# 注：如果只想统计哪些文件被改动，多少行被改动，可以添加--stat参数
```

## log

- [Git-Basics-Viewing-the-Commit-History](https://git-scm.com/book/en/v2/Git-Basics-Viewing-the-Commit-History)

```bash
git log                 # 查看所有commit记录(SHA-A校验和，作者名称，邮箱，提交时间，提交说明)
git log -p -次数                # 查看最近多少次的提交记录
git log --stat                  # 简略显示每次提交的内容更改
git log --oneline               # 让提交记录以精简的一行输出
git log –graph –all --online    # 图形展示分支的合并历史
git log --author=作者           # 查询作者的提交记录(和grep同时使用要加一个--all--match参数)
git log --grep=过滤信息         # 列出提交信息中包含过滤信息的提交记录
git log fileName              # 查看某文件的修改记录，找背锅专用
git reflog      #用来记录你的每一次命令,显示当前分支的最近几次提交
git log -p filename #查看文件的详细变更
git log --no-merges master..  #查看尚未合并的变更
git log -p --no-merges master.. #查看尚未合并的文件变更

–pretty # 可以通过 –pretty 对提交信息进行定制
```

## blame

- 查看某个文件是谁改动的

```bash
git blame filename # 查看某文件的每一行内容的作者，最新commit和提交时间
```

## alias

```bash
# status改为st
git config --global alias.st status

# git l 代替 git log –oneline –graph
git config --global alias.l "log --oneline --graph"
```

## tag

```bash
git tag           				 # 查看标签列表
git tag <tagname>                    # 轻量级标签
git tag -a <tagname> -m "附加信息"   # 带注释的标签

git tag -a <tagname> 版本id      # 某次commit打TAG. 比如：git tag -a v1.1 bcfed96

git show tagName   				 # 查看具体标签
git checkout tagName			     # 切换到标签
git fetch origin tag <tagname>  # 获取远程tag

git push [remote] [tag]    # 推送某标签到远程仓库
git push origin --tags	    # 推送全部标签

git checkout -b <branch> <tagname>          # 新建分支的时候打上TAG
git show <tagname>                     # 查看标签对应的信息
git tag -d <tagname>                   # 删除本地TAG

git push origin --delete tag <tagname>  # 删除远程分支
git push origin :refs/tags/<tagname>  # 从远程删除命令tag

git checkout -b [branch] [tag]  # 新建一个分支，指向某个tag
```

## 文件恢复

- `文件恢复（未commit）git checkout`

```bash
# 删除暂存区中的文件：
git rm 文件名
git commit -m "提交说明"

# 删除工作区文件，并且将这次删除放入暂存区
git rm [file1] [file2] ...

# 停止追踪指定文件，但该文件会保留在工作区
git rm --cached [file]

git clean -f #把未跟踪的文件清理掉

# 改名文件，并且将这个改名放入暂存区
git mv [file-original] [file-renamed]

# 误删恢复文件（用暂存区的文件覆盖工作区的文件）
git checkout -- 文件名

# Tip：git rm 等价于 git rm --cached 文件名 + rm 文件名
# 务必注意：git checkout会抛弃当前工作区的更改!!!不可恢复！！！务必小心！！！
```

- 文件恢复（已 add 未 commit）git reset HEAD

```bash
git reset HEAD -- filename # 暂存区恢复成HEAD
git checkout -- filename # 工作区恢复成暂存区
```

- 版本回退（已 commit）git reset –hard

```bash
git reset HEAD^             # 恢复成上次提交的版本
git reset HEAD^^            # 恢复成上上次提交的版本，就是多个^，以此类推或用
git reset HEAD~3            # 也可以直接~次数
git reset --hard commitid      # git log查看到的Hash值，取前七位即可，根据版本号回退

# reset提供了三个可选参数：
# - soft：只是改变HEAD指针指向，缓存区和工作区不变
# - mixed：修改HEAD指针指向，暂存区内容丢失，工作区不变
# - hard：修改HEAD指针指向，暂存区内容丢失，工作区恢复以前状态
```

- git reset

```bash
# 在本地环境
git reset —soft 撤销commit
git reset —mixed 撤销commit和add动作


# 已提交远程仓库
git reset  —hard 撤销不保留记录
git reset —revert 撤销，保留提交记录
```

## reflog

- 查看输入过的指令记录

```bash
git reflog
```

## revert

- 撤销某次提交: 撤销的只是文件变化，提交记录依旧存在

```bash
git revert HEAD          # 撤销最近的一个提交
git revert commitid     # 撤销某次commit
```

## show

- 查看某次提交的修改内容

```bash
git show commitid     # 查看某次commit的修改内容
git show --no-merges master..  #查看尚未合并的文件变更
git show some-branch:some-file.js  #查看其他分支中的文件
```

## branch

```bash
git branch [branch-name]   # 创建分支
git branch          # 查看本地分支

git branch -a   #查看分支
git branch -r   #查看远程分支

git branch -d 分支名    # 删除分支，分支上有未提交更改是不能删除的
git branch -D 分支名    # 强行删除分支，尽管这个分支上有未提交的更改

git log --branches="被删除的分支名"     # 找到被删分支最新的commit版本号
git branch 分支名 版本号(前七位即可)    # 恢复被删分支
git branch -m 老分支名 新分支名     # 分支重命名

git push origin --delete [branch-name]  #删除远程分支

git branch --track [branch] [remote-branch] #新建一个分支，与指定的远程分支建立追踪关系
git branch --set-upstream-to [branch] [remote-branch] #建立追踪关系，在现有分支和指定的远程分支之间
```

## checkout

```bash
git checkout branch_name         # 切换分支
git checkout -b branch_name      # 创建分支同时切换到这个分支
git checkout -              # 切换到上一分支

git checkout -b local_branch remote_branch # 拉去远程分支到本地
git checkout -b dev origin/dev

git checkout remote_branch_name  # 拉取远程分支到本地并自动新建分支切换到origin_branch_name

git checkout -b [branch] [tag]  #新建一个分支，指向某个tag

# 分离头指针，即HEAD不会指向任何branch，此时切换分支git不会自动保存所做的任何修改和提交的commit。
# 如果需要保存修改需要保存到一个分支中，git branch newbranch commitid
git checkout commitid
```

## merge

```bash
git merge [branch]      # 合并指定分支到当前分支
git cherry-pick [commit]    #选择一个commit，合并进当前分支
git merge -ff           # 快速合并，默认参数
git merge -ff-only      # 只有快速合并的情况才合并
git merge --no-ff       # 不使用快速合并
git merge -n 分支名     # 合并分支，不会在合并后显示合并前后的不同状态
git merge -stat 分支名  # 合并分支，合并结束后显示合并前后的不同状态
git merge -e 分支名     # 合并分支，合并前调用编辑器，可自行编写commit

git checkout master # 切换到master
git merge [branch_name] --no-ff #合并指定分支到当前分支master
```

## stash

- 切换分支时暂存未 commit 的更改

```bash
git stash   # 保存当前的改动
git stash apply     # 恢复保存改动, 不删除stash@{1}
git stash list      # 查看stash列表
git stash apply stash@{1}
git stash pop # 恢复并删除stash@{1}
```

## remote

```bash
git remote update   # 更新远程仓储
git remote -v   # 显示所有远程仓库
git remote show [remote]    # 显示某个远程仓库信息
git remote add [shortname] [url]    # 增加一个新的远程仓库，并命名
# 修改remote的地址可以进入 .git 编辑 config 文件中的url

# 删除不存在对应远程分支的本地分支
git remote prune origin
```

## pull 和 push

```bash
git pull [remote] [branch]  # 取回远程仓库的变化，并与本地分支合并

git fetch remote branch
git merge | git rebase

git push [remote] [branch]    # 上传本地分支到远程仓库
git push [remote] --force   # 强行推送当前分支到远程仓库
git push [remote] --all    # 推送所有分支到远程仓库
```

## archive

```bash
git archive     # 生成一个可供发布的压缩包
```

## rebase

- 注意：不可用于多人线上操作，适用于自己开发的分支使用

```bash
# 合并多个commit为一个完整commit

git rebase -i  [startpoint]  [endpoint]
git rebase -i 36224db
git rebase -i HEAD~3

git rebase --continue | --skip | --abort | --quit | --edit-todo | --show-current-patch

# pick：保留该commit（缩写:p）
# reword：保留该commit，但我需要修改该commit的注释（缩写:r）
# edit：保留该commit, 但我要停下来修改该提交(不仅仅修改注释)（缩写:e）
# squash：将该commit和前一个commit合并（缩写:s）
# fixup：将该commit和前一个commit合并，但我不要保留该提交的注释信息（缩写:f）
# exec：执行shell命令（缩写:x）
# drop：我要丢弃该commit（缩写:d）

# git rebase 内的commit可以手动添加commit和调整commit顺序
```

## cat-file

- 显示版本库对象的内容、类型及大小信息

```bash
git cat-file -t commitid # 显示对象的类型
git cat-file -p commitid # 根据对象的类型显示其内容
```

## git worktree

- [Git基本原理介绍(35)——git worktree](https://www.bilibili.com/video/BV1ry4y1x7Le)

## 快速clone

- `git clone --depth=1 origin_branch_url`
- git使用depth=1后的一些问题：[git-shallow-clone-clone-depth-misses-remote-branches](https://stackoverflow.com/questions/23708231/git-shallow-clone-clone-depth-misses-remote-branches)

```bash
# 拉取全部
$ git remote set-branches origin '*'
$ git fetch -v
$ git checkout your-branch-name

----

# 拉取指定分支
$ git clone --depth=1 origin_branch_url
$ git remote set-branches origin 'remote_branch_name'
$ git fetch --depth=1 origin remote_branch_name
$ git checkout remote_branch_name
```

## 如何使用分支

```bash
git checkout -b [branch]       # 新建一个分支，并切换到该分支
git branch           # 命令会列出所有分支，当前分支前面会标一个*号。
git add .
git commit -m "提交分支branch"
git checkout master        # 切换回master分支
git merge [branch]         # 把branch分支合并到master分支
git branch -d branch       # 合并完成后删除branch分支

git branch -r   # 查看远程分支
git checkout -b a origin/a  # 拉去远程分支到本地
```

## 分支管理策略

```bash
git checkout -b dev                                 # 首先，仍然创建并切换dev分支：
git add readme.txt                                  # 修改readme.txt文件，并提交一个新的commit
git checkout master                                 # 现在，我们切换回master分支
git merge --no-ff -m "merge with no-ff" dev         # 准备合并dev分支，请注意--no-ff参数，表示禁用Fast forward
git log --graph --pretty=oneline --abbrev-commit    # 合并后，我们用git log看看分支历史：

# 合并分支时，加上--no-ff参数就可以用普通模式合并，合并后的历史有分支，
# 能看出来曾经做过合并，而fast forward合并就看不出来曾经做过合并。
```

## Bug 分支

```bash
------------                        # 我们在dev分支上，发现master分支上有代号101号bug
git stash                           # 冷冻现在在dev分支上的工作状态 冻结吧！
git checkout master            # 这个bug发生在master主分支上,我们切回master分支
git checkout -b issue-101       # 创建代号101的修复bug分支

# 修改你的bug
git add readme.txt              # 提交到暂存区
git commit -m "fix bug 101"     # 注意填写信息，以免日后查证
git checkout master             # 切换回master分支
git merge --no-ff -m "merged bug fix 101" issue-101     # 合并分支，注意不使用fast forward模式
git branch -d issue-101         # 删除issue-101分支
git checkout dev                 # bug 改完了，是时候回到dev继续写bug了
git stash list                   # 查看刚刚的冻结现场
git stash pop                    # git stash pop，恢复的同时把stash内容也删了：
# 一是用git stash apply恢复，但是恢复后，stash内容并不删除，你需要用git stash drop来删除
```

## 合并分支上特定文件

```bash
git checkout source_branch <path>...

# 将a分支中的test文件合并到主分支b
------------------------
# 使用git checkout 将根据b分支创建一个b_tmp分支，避免影响b分支
git checkout -b b_tmp  # 新建b_tmp分支并切换
git checkout a test # 将a分支中的test文件覆盖到b_tmp中
git commit -am "merge branch a"
git checkout b  # 切换到b分支
git merge --no-ff b_tmp  # 合并b_tmp到b分支
git branch -d b_tmp # 删除b_tmp分支
```

## rebase 合并多个 commit

```bash
git log --oneline
-----------
972c774 (HEAD -> master) mod readme.md content
64b9edd add index.js
7d7d42b add index.css
7a5e790 add index.html
ba3849c add readme.md
-----------

step1: git rebase -i ba3849c
# 进入编辑界面如下，修改 pick  -> s
-----------
pick 7a5e790 add index.html
s 7d7d42b add index.css
s b9edd add index.js
pick 972c774 mod readme.md content
-----------

step1保存退出后，自动跳转到这里修改
-----------
# This is a combination of 3 commits.
# 自己加的commit
add index static objects

# This is the 1st commit message:

add index.html

# This is the commit message #2:

add index.css

# This is the commit message #3:

add index.js
-----------

step2: git log --oneline # 查看日志
-----------
1e59df0 (HEAD -> master) mod readme.md content
ba3958e add index static objects
ba3849c add readme.md
-----------
```

## rebase 修改 commit

```bash
-----------
1c08687 (HEAD -> master) mod readme.md content
30fa507 add index
0aa75f0 add readme.md
-----------

git rebase -i 0aa75f0
-----------
pick 30fa507 add index
r 1c08687 mod readme.md content
-----------

-----------
# mod readme.md content
修改 readme.md 内容
-----------

git log --oneline
-----------
26d1338 (HEAD -> master) 修改 readme.md 内容
30fa507 add index
0aa75f0 add readme.md
-----------
```

## rebase 合并非连续 commit

```bash
git log --oneline
-----------
26d1338 (HEAD -> master) 修改 readme.md 内容
30fa507 add index
0aa75f0 add readme.md
-----------

git rebase -i 0aa75f0
-----------
pick 0aa75f0 add readme.md
# pick 30fa507 add index
s 26d1338 修改 readme.md 内容
pick 30fa507 add index
-----------

git rebase --continue
-----------
# This is a combination of 2 commits.
合并非连续的commit
# This is the 1st commit message:

add readme.md

# This is the commit message #2:

修改 readme.md 内容
-----------

git log --oneline # 查看日志
-----------
de9b2eb (HEAD -> master) add index
c5a0c7a 合并非连续的commit
-----------
```

## 使用 cherry-pick 合并 dev 分支的 commit 到 master 中

```bash
git log --oneline --all
-----------
c4570cf (dev) mod index.html content
479e26c (HEAD -> master) mod readme.md content
599b625 add index.js
432febf add index.css
8702882 add index.html
cf5c910 add readme.md
-----------

step1: git checkout master
step2: git cherry-pick c4570cf

git log --oneline --all
-----------
88ae02b (HEAD -> master) mod index.html content
c4570cf (dev) mod index.html content
479e26c mod readme.md content
599b625 add index.js
432febf add index.css
8702882 add index.html
cf5c910 add readme.md
-----------
```

## 本地使用多个git存储库

Forked from：<https://docs.github.com/en/developers/overview/managing-deploy-keys#using-multiple-repositories-on-one-server>

- 配置：~/.ssh/config

```bash
Host github.com-repo-0
        Hostname github.com
        IdentityFile=/home/user/.ssh/repo-0_deploy_key

Host github.com-repo-1
        Hostname github.com
        IdentityFile=/home/user/.ssh/repo-1_deploy_key
```

- Host github.com-repo-0 - 存储库的别名
- Hostname github.com - 配置与别名一起使用的主机名
- IdentityFile=/home/user/.ssh/repo-0_deploy_key - 为别名分配私钥
- 使用

```bash
git clone git@github.com-repo-1:OWNER/repo-1.git
```

## git快速获取特定tag分支

```bash
git -c protocol.version=2 fetch origin v15.0.1 --depth=1
git fetch origin tag v15.0.1
```

## git-commit语义化

```bash
build	主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交
ci	主要目的是修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle等)的提交
docs	文档更新
feat	新增功能
fix	bug 修复
perf	性能, 体验优化
refactor	重构代码(既没有新增功能，也没有修复 bug)
style	不影响程序逻辑的代码修改(修改空白字符，格式缩进，补全缺失的分号等，没有改变代码逻辑)
test	新增测试用例或是更新现有测试
revert	回滚某个更早之前的提交
chore	不属于以上类型的其他类型
```

## 管理工具

- fossil: <https://www.fossil-scm.org>
- github: <https://github.com/>
- gitee: <https://gitee.com/>
- gitlab: <https://gitlab.com/explore>
- gitea: <https://github.com/go-gitea/gitea>
- gogs: <https://gogs.io/>

## 其他

- [git web版: isomorphic-git/isomorphic-git](https://github.com/isomorphic-git/isomorphic-git)
- git 官网: <https://git-scm.com/>
