---
title: git常见使用场景
date: 2020-07-20
sidebar: "auto"
tags:
  - git
categories:
  - tools
---

## 如何使用分支

<CodeBlock>

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

</CodeBlock>

## 分支管理策略

<CodeBlock>

```bash
git checkout -b dev                                 # 首先，仍然创建并切换dev分支：
git add readme.txt                                  # 修改readme.txt文件，并提交一个新的commit
git checkout master                                 # 现在，我们切换回master分支
git merge --no-ff -m "merge with no-ff" dev         # 准备合并dev分支，请注意--no-ff参数，表示禁用Fast forward
git log --graph --pretty=oneline --abbrev-commit    # 合并后，我们用git log看看分支历史：

# 合并分支时，加上--no-ff参数就可以用普通模式合并，合并后的历史有分支，
# 能看出来曾经做过合并，而fast forward合并就看不出来曾经做过合并。
```

</CodeBlock>

## Bug 分支

<CodeBlock>

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

</CodeBlock>

## 合并分支上特定文件

<CodeBlock>

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

</CodeBlock>

## rebase 合并多个 commit

<CodeBlock>

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

</CodeBlock>

## rebase 修改 commit

<CodeBlock>

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

</CodeBlock>

## rebase 合并非连续 commit

<CodeBlock>

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

</CodeBlock>

## 使用 cherry-pick 合并 dev 分支的 commit 到 master 中

<CodeBlock>

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

</CodeBlock>

## example

<CodeBlock>

```bash
# 如果git pull提示“no tracking information”，
# 则说明本地分支和远程分支的链接关系没有创建，用命令
git branch --set-upstream branch-name origin/branch-name


# git add一个错误文件,执行撤销命令:
git reset <file> # 撤销指定的文件
git reset # 撤销所有的文件

# git rm删除指定文件:
git rm --cached .   # 删除文件
git rm -r --cached . # 删除文件和目录

# git提交指定文件到gh-pages分支
git add dist
git subtree push --prefix=dist orgin gh-pages

# git commit一个错误文件,执行命令:
# 只撤销commit操作，保留文件
git reset HEAD~1

# 撤销commit操作，删除变化
git reset --hard HEAD~1
```

</CodeBlock>

## 快速下载 github

```bash
git clone  https://github.com.cnpmjs.org/reactjs/zh-hans.reactjs.org.git
```
