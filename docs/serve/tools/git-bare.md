---
title: git裸仓库的使用
date: 2020-07-20
sidebar: "auto"
tags:
  - git
categories:
  - tools
---

- 安装: [INSTALL](https://github.com/git/git/blob/master/INSTALL)
- [git 的源码包下载地址](https://github.com/git/git/releases)



```bash
# 系统环境 centos7  源码安装版git --> prefix=/usr/local/git

yum install autoconf libcurl-devel expat-devel gcc gettext-devel kernel-headers openssl-devel perl-devel zlib-devel -y
curl -O -L https://github.com/git/git/archive/v2.22.0.tar.gz
tar -zxvf v2.22.0.tar.gz

# 安装git
cd git-v2.22.0
make clean
make configure
./configure --prefix=/usr/local/git
make prefix=/usr/local/git
make install prefix=/usr/local/git

# 写入git的环境变量
vim /etc/profile
# 在profile中配置
export PATH=/usr/local/git/bin:$PATH
# 或者写入配置文件
echo 'export PATH=/usr/local/git/bin:$PATH' >> /etc/bashrc

# 使配置文件生效
source /etc/profile

# 检测git是否安装生效
git --version

# 删除下载的git压缩包
cd ~
rm -rf git-v2.22.0 v2.22.0.tar.gz
```



- 配置用户



```bash
# 使用git用户
useradd -m git
passwd git

# 创建文件
mkdir -p /home/git/rep
cd /home/git/rep/ && git init --bare test.git

# 修改权限
chown -R git:git /home/git/rep
chmod 755 /home/git/rep

# 编辑passwd
/etc/passwd
git:x:1001:1001::/home/git:/usr/local/git/bin/git-shell

# 克隆仓库
git clone git@ip:/home/git/rep/test.git
```

```bash
# 使用登录用户
在git用户目录下新建 `project` 用作裸仓库

在git用户目录下新建 `deloy`   用作发布地址仓库

进入`project`目录中运行如下创建一个`demo`的裸仓库:
  `git init --bare demo.git`

然后进入`demo.git`目录中，在centos7中命令行输入运行 `pwd` 查看当前位置.
  例：`/home/git/project/demo.git`

在本地 `git clone 用户名@linux的ip:/home/czh/project/demo.git`

git clone完后，进入`demo`文件夹，第一次拉取成功后是一个空文件(`.git`除外),
需要创建文件,再次上传服务器.然后在别的地方再次clone的时候就是有文件的仓库了

提示：git上传的文件在centos7的git的裸仓库中不可见

自动化发布git上传文件:其实就是在服务器中上传完文件后在
服务器中执行拉取上传的文件到`deloy`文件夹中
```



- 自动部署



```bash
- 进入`demo.git`的`hooks`文件夹中,创建编辑 `post-receive` 文件,
然后在该文件夹命令行中执行： `chmod +x post-receive` 赋予执行权限

#!/bin/sh
unset GIT_DIR
# 发布文件的目录
deployPath='/home/czh/deloy/'

cd $deployPath

echo '进入文件夹'
sleep 2
git pull origin master
echo '拉取文件'
sleep 10
```



- 使用



```bash
# 进入deloy文件夹中执行

# 初始化仓库
git init
# 添加远程链接(直接写绝对路径,完整的 ‘用户名+服务器ip+文件夹地址’ 需要用户密码 )
git remote add origin /home/czh/project/demo.git

#查看添加的origin
git remote -v

# 修改remote的地址可以进入 .git 编辑 config 文件中的url
```



---

相关链接

- [CentOS7 搭建 Git 服务器](https://segmentfault.com/a/1190000008403740)
- [How to install GIT on CentOS](https://blacksaildivision.com/git-latest-version-centos)
