# centos7

## ip查看

- `ip addr`

## 网络配置

- `nmtui`

## 修改hosts

```bash
- vi /etc/hosts
- 保存后重启网络
- sudo /etc/init.d/networking restart
```

## systemctl服务

```bash
- sudo systemctl start 服务   //启动服务
- sudo systemctl stop 服务    //停止服务
- sudo systemctl status 服务  //服务状态
- sudo systemctl restart 服务 //重启服务
- sudo systemctl reload 服务  //重载服务

> 启用与禁用
- sudo systemctl enable 服务   // 开机自启用可以用enable启用
- sudo systemctl disable 服务  // 禁用
```

## passwd

- `passwd root` 修改密码

## curl

```bash
- curl https://www.baidu.com
- curl -v https://www.baidu.com

> 把地址内容下载到某个文件里
- curl -o 文件名 地址
- curl -o test.html https://www.baidu.com

> 用远程地址是文件，把文件下载下来，文件名使用远程文件的名字
- curl -O 文件地址
- curl -O https://raw.githubusercontent.com/amix/vimrc/master/README.md
```

## rsync同步

```bash
> 参数
- r（recursive），递归复制，复制同步的文件不保留文件的权限，创建与修改时间
- a（archive），存档模式，可以递归复制，保留文件替身，复制同步的文件会保留文件的拥有者，用户名，时间，权限
- z（compress），压缩传输，传输文件时会压缩文件
- n（dry-run），假装同步，看看都有什么东西可以同步的，不会真正执行同步
- h（human-readable），用人类都看懂的方式显示数字
- P（progress），进度。

> 基本用法：rsync 选项 源 目标
- 递归同步：rsync -r 源 目标   //递归模式同步不保留文件属性。
- 存档模式：rsync -a 源 目标   // 保留文件属性
- 显示进度：rsync -a -P 源 目标  / rsync -aP 源 目标
- 删 除：rsync -a -P --delete 源 目标
- 远 程：rsync -a -P 用户@主机:源 目标
```

## ssh root禁用

```bash
查找：/etc/ssh/sshd_config
- #PermitRootLogin yes

修改为：
- PermitRootLogin no

重新启动 sshd：
- systemctl restart sshd.service
```

## 禁止root本地登录

```bash
- 修改配置/etc/pam.d/login，增加如下一行
- auth required pam_succeed_if.so user != root quiet
```

## vmware-tools

- vmware虚拟机工具

```bash
- su root
- cd vmware-tools-distrib
- ls
- ./vmware-install.pl
```

## port修改

```bash
查找：/etc/ssh/sshd_config
＃Port 22

修改为：

Port 5000

关闭SELINUX.
vi /etc/selinux/config  修改 SELINUX=disabled

查看selinux状态sestatus 如果是enabled就是开启状态
sestatus -v

重启ssh：
systemctl restart sshd.service
```

- 不关SELINUX,但是需要添加一下SELINUX的端口, 使用semanage工具

- 2.1安装 semanage

```bash
- yum -y install policycoreutils-python

- 使用以下命令查看当前SElinux 允许的ssh端口：
- semanage port -l | grep ssh

- 添加20000端口到 SELinux
- semanage port -a -t ssh_port_t -p tcp 5000

- 然后确认一下是否添加进去
- semanage port -l | grep ssh

- 如果成功会输出
- ssh_port_t   -->  tcp    5000, 22

- 重启ssh：
- systemctl restart sshd.service
```

- 2.2防火墙中放行新加入端口

- 2.2.1方法1

```bash
- firewall-cmd --permanent --add-port=5000/tcp

- 用该命令查询--> firewall-cmd --permanent --query-port=5000/tcp
- 如果是yes就是添加成功，如果是no就是没成功

- 成功后重载防火墙--> firewall-cmd --reload
```

- 2.2.2方法2

```bash
- 复制 firewalld 有关 sshd 的设定档案：
- cp /usr/lib/firewalld/services/ssh.xml /etc/firewalld/services/

- 使用 vim  (或任何文本编辑器) 开启 /etc/firewalld/services/ssh.xml，寻找：
- <port protocol="tcp" port="22"/>
- 修改为：
- <port protocol="tcp" port="5000"/>

- 储存后重新加载 firewalld：
- firewall-cmd --reload

```

## 通过软件源在线安装：

```bash
- sudo yum -y install 软件名
- 其中参数-y为所有选项均选则yes，不加-y则要手动确认
```

## 通过本地rpm包安装：

```bash
- sudo rpm -ivh 软件名
- 其中参数-i为安装，-vh为列出安装过程
```

## 安装nginx

```bash
- yum install epel-release -y
- yum install nginx -y
- nginx -t
- service nginx status // 查看状态
- service nginx start / reload
- service nginx stop
- systemctl enable nginx

> firewall设置：
- systemctl start firewalld.service    #启动firewall
- systemctl stop firewalld.service     #停止firewall
- systemctl disable firewalld.service  #禁止firewall开机启动

> firewalld默认已经安装并启用了，如果需要nginx可以访问需要执行以下命令：
- firewall-cmd --permanent --add-service=http
- firewall-cmd --permanent --zone=trusted --add-port=80/tcp
```

## nvm 安装换源

```bash
- https://github.com/creationix/nvm
- curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
- vim .bashrc
- export NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node
- source ~/git/nvm/nvm.sh
```

## Yum命令

```bash
yum(选项)(参数)

-h：显示帮助信息
-y：对所有的提问都回答"yes"
-c：指定配置文件
-q：安静模式
-v：详细模式
-d：设置调试等级(0-10)
-e：设置错误等级(0-10)
-R：设置yum处理一个命令的最大等待时间
-C：完全从缓存中运行，而不去下载或者更新任何头文件
```

## 命令行命令失效

- `PATH=/bin:/usr/bin`

## 常用命令

```bash
- yum repolist
- yum search xxx
- yum info xxx
- yum install xxx -y
- yum -y install vim*	//安装vim
- yum remove xxx -y
- yum -y update && yum -y upgrade
- yum install wget -y
- yum install -y epel-release
- yum -y install gcc gcc-c++
- yum -y install gcc automake autoconf libtool make
- yum -y install net-tools
- netstat –apn
- netstat -ntlp
- ps -aux | grep tomcat
- netstat -ntulp |grep 80  // 查看80端口
- ssh 远程登录，如ssh root@gitlab.study.com
- cat /etc/redhat-release //查看系统版本
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
需要安装git

yum install python-setuptools && easy_install pip
pip install git+https://github.com/shadowsocks/shadowsocks.git@master
ssserver -c /etc/shadowsocks.json
vim /etc/rc.d/rc.local
ssserver -c /etc/shadowsocks.json -d start
```

- `shadowsocks.json`

```bash
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

## 参考链接

- [centos7开机界面出现多个选项](http://www.cnblogs.com/jcblog/p/6431252.html)
- [Centos7 修改SSH 端口](http://www.cnblogs.com/waslost/p/4459664.html)
- [judasn/Linux-Tutorial](https://github.com/judasn/Linux-Tutorial)
- [amix/vimrc](https://github.com/amix/vimrc)
- [systemctl命令](http://man.linuxde.net/systemctl)
- [linux基础命令介绍](https://segmentfault.com/a/1190000007946958)
- [firewall防火墙](http://www.sa-log.com/282.html)
