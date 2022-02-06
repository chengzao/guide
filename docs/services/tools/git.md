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

## 管理工具

- Git: https://git-scm.com/
- fossil: https://www.fossil-scm.org
- github: https://github.com/
- gitee: https://gitee.com/
- gitlab: https://gitlab.com/explore
- gitea: https://github.com/go-gitea/gitea
- gogs: https://gogs.io/

## 其他

- git web版： https://github.com/isomorphic-git/isomorphic-git
