---
title: centos7的一些命令参数
date: 2020-07-20
sidebar: "auto"
tags:
  - centos7
categories:
  - system
---

## ip 查看

- `ip addr`

## 网络配置

- `nmtui`

## 修改 hosts

```bash
vi /etc/hosts
# 保存后重启网络
sudo /etc/init.d/networking restart
```

## systemctl 服务



```bash
sudo systemctl start service_name   # 启动服务
sudo systemctl stop service_name    # 停止服务
sudo systemctl status service_name  # 服务状态
sudo systemctl restart service_name # 重启服务
sudo systemctl reload service_name  # 重载服务

# 启用与禁用
sudo systemctl enable service_name   # 开机自启用可以用enable启用
sudo systemctl disable service_name  # 禁用
```



## passwd

- 修改密码: `passwd root`

## curl



```bash
curl https://www.baidu.com
curl -v https://www.baidu.com

# 把地址内容下载到某个文件里
curl -o file_name url
curl -o test.html https://www.baidu.com

# 用远程地址是文件，把文件下载下来，文件名使用远程文件的名字
curl -O file_url
curl -O https://raw.githubusercontent.com/amix/vimrc/master/README.md
```



## rsync 同步



```bash
# 参数
r（recursive）# 递归复制，复制同步的文件不保留文件的权限，创建与修改时间
a（archive）# 存档模式，可以递归复制，保留文件替身，复制同步的文件会保留文件的拥有者，用户名，时间，权限
z（compress）# 压缩传输，传输文件时会压缩文件
n（dry-run）# 假装同步，看看都有什么东西可以同步的，不会真正执行同步
h（human-readable）# 用人类都看懂的方式显示数字
P（progress）# 进度

# 基本用法：rsync 选项 源 目标
# 递归同步：
rsync -r 源 目标   # 递归模式同步不保留文件属性。
# 存档模式：
rsync -a 源 目标   # 保留文件属性
# 显示进度：
rsync -a -P 源 目标
rsync -aP 源 目标
# 删 除：
rsync -a -P --delete 源 目标
# 远 程：
rsync -a -P 用户@主机:源 目标
```



## ssh root 禁用



```bash
# 查找：
/etc/ssh/sshd_config
# 将PermitRootLogin yes
# 修改为：
PermitRootLogin no

# 重新启动 sshd：
systemctl restart sshd.service
```



## 禁止 root 本地登录

```bash
# 修改配置 /etc/pam.d/login ，增加如下一行
auth required pam_succeed_if.so user != root quiet
```

## vmware-tools

- vmware 虚拟机工具



```bash
su root
cd vmware-tools-distrib
ls
./vmware-install.pl
```



## port 修改



```bash
# 查找：/etc/ssh/sshd_config
＃Port 22
# 修改为：
Port 5000

# 重启ssh：
systemctl restart sshd.service
```



## SELINUX

## 关闭 SELINUX



```bash
vi /etc/selinux/config  修改 SELINUX=disabled

# 查看selinux状态sestatus 如果是enabled就是开启状态
sestatus -v

# 重启ssh：
systemctl restart sshd.service
```



## 不关 SELINUX

- 但是需要添加一下 SELINUX 的端口, 使用 semanage 工具
- 安装 semanage



```bash
yum -y install policycoreutils-python

# 使用以下命令查看当前SElinux 允许的ssh端口
semanage port -l | grep ssh

# 添加20000端口到 SELinux
semanage port -a -t ssh_port_t -p tcp 5000

# 然后确认一下是否添加进去
semanage port -l | grep ssh

# 如果成功会输出
ssh_port_t   -->  tcp    5000, 22

# 重启ssh
systemctl restart sshd.service
```



- 防火墙中放行新加入端口

  - 方法 1



  ```bash
  # 启动 systemctl
  systemctl start firewalld.service
  # 开机时启用服务
  systemctl enable firewalld.service

  # 添加允许新端口号
  firewall-cmd --permanent --add-port=5000/tcp

  # 用该命令查询
  firewall-cmd --permanent --query-port=5000/tcp
  # 如果是yes就是添加成功，如果是no就是没成功

  # 成功后重载防火墙
  firewall-cmd --reload

  # 配置iptable

  iptables -A INPUT -p tcp --dport 5000 -j ACCEPT

  # 重启 iptable
  service iptables restart

  ```



  - 方法 2



  ```bash
  # 复制 firewalld 有关 sshd 的设定档案：
  cp /usr/lib/firewalld/services/ssh.xml /etc/firewalld/services/

  # 使用 vim  (或任何文本编辑器) 开启 /etc/firewalld/services/ssh.xml，寻找：
  <port protocol="tcp" port="22"/>
  # 修改为：
  <port protocol="tcp" port="5000"/>

  # 储存后重新加载 firewalld：
  firewall-cmd --reload
  ```



## 通过软件源在线安装

```bash
sudo yum -y install 软件名
# 其中参数-y为所有选项均选则yes，不加-y则要手动确认
```

## 通过本地 rpm 包安装

```bash
sudo rpm -ivh 软件名
# 其中参数-i为安装，-vh为列出安装过程
```

## 安装 nginx



```bash
yum install epel-release -y
yum install nginx -y
nginx -t # 检测nginx的语法
service nginx status # 查看状态
service nginx start / reload
service nginx stop
systemctl enable nginx

# firewall设置：
systemctl start firewalld.service    #启动firewall
systemctl stop firewalld.service     #停止firewall
systemctl disable firewalld.service  #禁止firewall开机启动

# firewalld默认已经安装并启用了，如果需要nginx可以访问需要执行以下命令：
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --zone=trusted --add-port=80/tcp
```



## nvm 安装换源

- [Node Version Manager: nvm](https://github.com/creationix/nvm)



```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash

vim .bashrc
export NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node

source ~/git/nvm/nvm.sh
```



## firewall-cmd

- firewalld

```bash
# 启动：
systemctl start firewalld
# 查状态：
systemctl status firewalld
# 停止：
systemctl disable firewalld
# 禁用：
systemctl stop firewalld
# 在开机时启用一个服务：
systemctl enable firewalld.service
# 在开机时禁用一个服务：
systemctl disable firewalld.service
# 查看服务是否开机启动：
systemctl is-enabled firewalld.service
# 查看已启动的服务列表：
systemctl list-unit-files|grep enabled
# 查看启动失败的服务列表：
systemctl --failed
```

- 配置 firewalld-cmd

```bash
# 查看版本：
firewall-cmd --version
# 查看帮助：
firewall-cmd --help
# 显示状态：
firewall-cmd --state

# 查看所有打开的端口：
firewall-cmd --zone=public --list-ports
firewall-cmd --permanent --zone=public --list-ports
# 查看开启的服务
firewall-cmd --permanent --zone=public --list-services

# 更新防火墙规则：
firewall-cmd --reload
# 查看区域信息:
firewall-cmd --get-active-zones
# 查看指定接口所属区域：
firewall-cmd --get-zone-of-interface=eth0
# 拒绝所有包：
firewall-cmd --panic-on
# 取消拒绝状态：
firewall-cmd --panic-off
# 查看是否拒绝：
firewall-cmd --query-panic
```

- 开启端口

```bash
# /etc/firewalld/zones/public.xml

firewall-cmd --zone=public(作用域) --add-port=80/tcp(端口和访问类型) --permanent(永久生效)

firewall-cmd --zone=public --add-service=http --permanent

firewall-cmd --zone=public --query-port=80/tcp  #查看
firewall-cmd --zone=public --remove-port=80/tcp --permanent  # 删除

firewall-cmd --list-services
firewall-cmd --get-services
firewall-cmd --add-service=<service>
firewall-cmd --delete-service=<service>

# 参数解释
--add-service #添加的服务
--zone #作用域
--add-port=80/tcp #添加端口，格式为：端口/通讯协议
--permanent #永久生效，没有此参数重启后失效

# 开启某个端口
firewall-cmd --permanent --zone=public --add-port=8080-8081/tcp # 永久
firewall-cmd --zone=public --add-port=8080-8081/tcp # 临时

# 启用某个服务
firewall-cmd --zone=public --add-service=https # 临时
firewall-cmd --permanent --zone=public --add-service=https # 永久

# 查看开启的端口和服务
firewall-cmd --permanent --zone=public --list-services # 服务空格隔开 例如 dhcpv6-client https ss
firewall-cmd --permanent --zone=public --list-ports # 端口空格隔开 例如 8080-8081/tcp 8388/tcp 80/tcp

# 重新载入，更新防火墙规则
firewall-cmd --reload
```

- 详细使用

```bash
# 设置某个ip访问某个服务
firewall-cmd --permanent --zone=public --add-rich-rule='rule family="ipv4" source address="192.168.0.4/24" service name="http" accept'
# 删除配置
firewall-cmd --permanent --zone=public --remove-rich-rule='rule family="ipv4" source address="192.168.0.4/24" service name="http" accept'
# 设置某个ip访问某个端口
firewall-cmd --permanent --add-rich-rule 'rule family=ipv4 source address=192.168.0.1/2 port port=80 protocol=tcp accept'
# 删除配置
firewall-cmd --permanent --remove-rich-rule 'rule family=ipv4 source address=192.168.0.1/2 port port=80 protocol=tcp accept'

# 检查是否允许伪装IP
firewall-cmd --query-masquerade
# 允许防火墙伪装IP
firewall-cmd --add-masquerade
# 禁止防火墙伪装IP
firewall-cmd --remove-masquerade

# 将80端口的流量转发至8080
firewall-cmd --add-forward-port=port=80:proto=tcp:toport=8080
# 将80端口的流量转发至192.168.0.1
firewall-cmd --add-forward-port=proto=80:proto=tcp:toaddr=192.168.1.0.1
# 将80端口的流量转发至192.168.0.1的8080端口
firewall-cmd --add-forward-port=proto=80:proto=tcp:toaddr=192.168.0.1:toport=8080
```

## Yum 命令



```bash
yum(选项)(参数)

h  # 显示帮助信息
y  # 对所有的提问都回答"yes"
c  # 指定配置文件
q  # 安静模式
v  # 详细模式
d  # 设置调试等级(0-10)
e  # 设置错误等级(0-10)
R  # 设置yum处理一个命令的最大等待时间
C  # 完全从缓存中运行，而不去下载或者更新任何头文件
```



## 命令行命令失效

- `PATH=/bin:/usr/bin`

## 常用命令



```bash
yum repolist
yum search xxx
yum info xxx
yum install xxx -y
yum -y install vim	# 安装vim
yum remove xxx -y
yum -y update && yum -y upgrade
yum install wget -y
yum install -y epel-release
yum -y install gcc gcc-c++
yum -y install gcc automake autoconf libtool make
yum -y install net-tools
netstat –apn
netstat -ntlp
ps -aux | grep tomcat
netstat -ntulp |grep 80  # 查看80端口
ssh # 远程登录，如ssh root@gitlab.study.com
cat /etc/redhat-release # 查看系统版本
ps -ef | grep nginx
```



## `ss server`



```bash
mac SSR: https://github.com/qinyuhang/ShadowsocksX-NG-R
win SSR : https://github.com/shadowsocksr-backup/shadowsocksr-csharp
android SSR: https://github.com/shadowsocksr-backup/shadowsocksr-android
android SSRR: https://github.com/shadowsocksrr/shadowsocksr-android

win : https://github.com/shadowsocks/shadowsocks-windows
mac : https://github.com/shadowsocks/ShadowsocksX-NG
android : https://github.com/shadowsocks/shadowsocks-android

base: https://github.com/shadowsocks/shadowsocks/tree/master

https://segmentfault.com/a/1190000013242438
https://github.com/Neilpang/acme.sh/wiki/%E8%AF%B4%E6%98%8E
https://segmentfault.com/a/1190000012654072
```



- install



```bash
# 需要安装git
yum install python-setuptools && easy_install pip
pip install git+https://github.com/shadowsocks/shadowsocks.git@master
ssserver -c /etc/shadowsocks.json
vim /etc/rc.d/rc.local
ssserver -c /etc/shadowsocks.json -d start
```



- `config`



```bash
# shadowsocks.json
# server ip : 101.*.*.*

{
    "server":"server ip",
    "server_port":23345,
    "local_address":"127.0.0.1",
    "local_port":1080,
    "password":"password",
    "timeout":300,
    "method":"aes-256-cfb",
    "fast_open":false
}
```



## 相关链接

- [centos7 开机界面出现多个选项](http://www.cnblogs.com/jcblog/p/6431252.html)
- [Centos7 修改 SSH 端口](http://www.cnblogs.com/waslost/p/4459664.html)
- [judasn/Linux-Tutorial](https://github.com/judasn/Linux-Tutorial)
- [amix/vimrc](https://github.com/amix/vimrc)
- [systemctl 命令](http://man.linuxde.net/systemctl)
- [linux 基础命令介绍](https://segmentfault.com/a/1190000007946958)
- [firewall 防火墙](http://www.sa-log.com/282.html)
