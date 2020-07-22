---
title: win/wsl
date: 2020-07-22
sidebar: "auto"
---

## windows dos

- `window常用DOS命令`

```bash
(1)cd..                         cd..       退到次一级目录
   cd\                          cd\        退到根目录下的意思
   cd 文件夹名字                cd windows 进入WINDOWS目录

(2)md 文件夹名字     md win     建立名为win的文件夹

(3)rd 文件夹名字     rd win     删除名为win的文件夹

(4)copy 路径下文件 目标路径     拷贝文件

(5)del 目标路径下文件           删除文件

(6)dir 文件夹名字或盘符         dir c:\windows  查看C盘windows里目录文件

dir/W：宽屏显示，一排显示5个文件名，而不会显示修改时间，文件大小等信息；
dir/S：显示当前目录及其子目录下所有的文件
dir/a 查看所有文件包括隐藏文件
dir/p 分页查看

(7)format 盘符   格式化硬盘

(8)ren 文件名 文件名  改名   ren 1.bat 2.bat

(9)type 文件名  查看文件内容（一般用来看bat或txt文件）

(10)cls  清屏
```

- `常用网络DOS命令`

```bash
(1)fport                         查看系统端口和端口上运行的程序
(2)netstat -an                    查看所有连接本机IP
(3)ipconfig /all                  查看所有连接本机IP
(4)telnet IP 端口                 连接对方机器某个端口
(5)net user                       查看本机用户
    net user 用户名 密码 /add      建立一个用户
    net user 用户名 /del          删除一个用户
(6)net localgroup administrators 用户名 /add   把用户添加到管理员
   net localgroup administrators 用户名 /del   把用户从管理员组删除
```

- 查找所有运行的端口`netstat -ano`
- 查看被占用的端口对应的 PID `netstat -ano | findstr "8081"`
- 查看指定 PID 进程 `tasklist | findstr "9088"`
- 结束进程 `taskkill /T /F /PID 9088` `强制(/F)杀死pid为9088的所有进程包括子进程(/T)`

## windows wsl

- [wsl/install-win10](https://docs.microsoft.com/zh-cn/windows/wsl/install-win10)

```bash

 bcdedit /set hypervisorlaunchtype auto ；

 bcdedit /set hypervisorlaunchtype off ；

# 管理员运行：
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
```

- wslconfig 命令进行管理

```bash
# wslconfig 查看安装的linux子系统
wslconfig /list

# 设置默认运行的linux系统
wslconfig /setdefault <DistributionName>

# 卸载linux系统
wslconfig /unregister <DistributionName>
```

- 设置默认 linux 登陆用户

```bash
ubuntu config --default-user root

ubuntu1804 config --default-user root


ubuntu config --default-user username

hostname local-dev

```

WSL 中访问本地文件

```bash
在“/mnt”目录下有“c”、“d”、“e”等文件夹，
分别表示本地的C盘、D盘、E盘，直接cd到相应路径下即可
```

- 修改 linux 密码

```bash
# 在root用户下修改root密码
passwd root

# 切换用户
su root
```

- use node.js

```bash
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs


apt install nodejs
apt install npm

wget https://npm.taobao.org/mirrors/node/v10.8.0/node-v10.8.0-linux-x64.tar.xz

xz -d /node-v10.8.0-linux-x64.tar.xz
tar -xvf /node-v10.8.0-linux-x64.tar

sudo ln -s /node-v10.8.0-linux-x64/bin/node /usr/bin/node
sudo ln -s /node-v10.8.0-linux-x64/bin/npm /usr/bin/npm
```

- `.bashrc`

```bash
export PATH=$HOME/bin:/usr/local/bin:/usr/bin:$PATH
```

- proxy dev terminal

```bash
https://gist.github.com/moenn/2db47589724cf6c06ad9316ac57e2144

https://gist.github.com/laispace/666dd7b27e9116faece6

https://github.com/haad/proxychains

git config --global http.proxy 'socks5://127.0.0.1:1080'

git config --global https.proxy 'socks5://127.0.0.1:1080'

git config --global http.https://github.com.proxy socks5://127.0.0.1:1086

git config --global --unset http.proxy

git config --global --unset https.proxy


export http_proxy="socks5://127.0.0.1:1080"

export https_proxy="socks5://127.0.0.1:1080"

export http_proxy="http://localhost:port"

export https_proxy="http://localhost:port"

apt-get install proxychains
vim /etc/proxychains.conf
```

- mirrors

```bash
sed -i "s@http://deb.debian.org@https://mirrors.xxx.com@g" /etc/apt/sources.list

https://www.debian.org/mirror/list

https://mirrors.tuna.tsinghua.edu.cn
https://mirrors.huaweicloud.com
http://mirrors.aliyun.com
https://mirrors.ustc.edu.cn
http://mirrors.163.com

apt-get install apt-transport-https && apt-get update
```
