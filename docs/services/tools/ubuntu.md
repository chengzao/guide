---
title: ubuntu常见命名
date: 2020-07-20
sidebar: "auto"
tags:
  - ubuntu
categories:
  - system
---

## 常用命令

- sudo apt-get -f install
- sudo apt-get vim\*
- sudo apt-get install net-tools
- sudo apt-get update
- sudo apt-get upgrade
- sudo apt-get install unity-tweak-tool
- sudo dpkg --install atom-amd64.deb
- sudo apt autoremove //删除为了满足其他软件包的依赖而安装的，但现在不再需要的软件包
- apt-get clean // 删除包缓存中的所有包
- apt-get autoclean //将已经删除了的软件包的 deb 安装文件从硬盘中删除掉
- apt-get remove 软件包名称 //删除已安装的软件包(保留配置文件)
- apt-get --purge remove 软件包名称 //删除已安装包(不保留配置文件)
- sudo passwd //ubuntu 默认安装后修改 root 密码

## 连接工具

- sudo apt-get install openssh-server
- xshell -- putty -- winscp

## 删除基本不用的自带软件

- `sudo apt-get remove thunderbird totem rhythmbox empathy brasero simple-scan gnome-mahjongg aisleriot gnome-mines cheese transmission-common gnome-orca webbrowser-app gnome-sudoku landscape-client-ui-install onboard deja-dup libreoffice-common unity-webapps-common gnomine printer-driver*`

## 安装 chrome

```bash
- https://askubuntu.com/questions/510056/how-to-install-google-chrome
- wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
- sudo sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list
- sudo apt-get update
- sudo apt-get install google-chrome-stable
```

## ubuntu server 20.04 设置开机启动

> https://www.jianshu.com/p/0f0c71f7f715

- 编辑`rc-local.service`

```bash
# vi /lib/systemd/system/rc-local.service
[Unit]
Description=/etc/rc.local Compatibility
Documentation=man:systemd-rc-local-generator(8)
ConditionFileIsExecutable=/etc/rc.local
After=network.target

[Service]
Type=forking
ExecStart=/etc/rc.local start
TimeoutSec=0
RemainAfterExit=yes
GuessMainPID=no

[Install]
WantedBy=multi-user.target
Alias=rc-local.service
```

- 保存的文件链接到 `/etc/systemd/system/` 目录下

```bash
ln -s /lib/systemd/system/rc-local.service /etc/systemd/system/rc-local.service
```

- 打开 `/etc/rc.local` 输入

```bash
vi /etc/rc.local
#!/bin/bash
autossh -M 8888 -NR 1234:localhost:22 root@101.201.235.247 -p 22 &
exit 0
```

- 保存，退出，赋权限，重启

```bash
chmod 755 /etc/rc.local
# 重启
reboot
```

## 相关链接

- [apt-get 指令的 autoclean,clean,autoremove 的区别](http://blog.csdn.net/flydream0/article/details/8620396)
- [ubuntu12.04destdrop 删除不必要的软件](http://www.cnblogs.com/YangJieCheng/p/5931175.html)
