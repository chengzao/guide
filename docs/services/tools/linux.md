---
title: linux命令参数
date: 2020-07-20
sidebar: "auto"
tags:
  - linux
categories:
  - system
---

- `https://www.kernel.org` 内核发布网址
- `uname -r` 内核版本
- linux 严格区分大小写,扩展名非必须

## 常见命令

- 禁用网卡: `ifdown`
- 启用网卡: `ifup`
- `netstat`
- `nslookup`
- `tcpdump -i eth0 -nnX port 21`
- 链接远程 linux 服务器: `ssh 用户名@服务器ip`
- 下载文件: `scp [-r] 用户名@服务器ip:文件路径 本地路径`
- 上传文件: `scp [-r] 本地文件 用户名@服务器ip:上传路径`
- `export PATH=/bin:/usr/bin:/usr/local/bin`
- `ps -ef | grep nginx`
- 显示磁盘的占用率: `df -hT`



```bash
-a：# 显示所有文件系统的磁盘使用情况
-h：# 方便阅读方式显示
-i：# 显示i节点信息，而不是磁盘块
-t：# 显示各指定类型的文件系统的磁盘空间使用情况
-x：# 列出不是某一指定类型文件系统的磁盘空间使用情况
-T：# 显示文件系统类型
--no-sync：# 忽略 sync 命令
--sync：# 在取得磁盘信息前,先执行sync命令
```



- `du -sh /usr` # 显示`usr`的大小

```bash
-a：# 显示目录中个别文件的大小
-s：# 仅显示总计，只列出最后加总的值
-h：# 提高信息的可读性
```

- `pwd` 显示当前路径
- `tab` 自动补全，连按两次会将所有匹配内容显示出来
- `history` 查看操作历史
- `|` 管道符
- `w / who` 查看用户登录
- `last` 登录信息和登录记录
- `lastlog` 查看所有用户最后一次的登录信息
- `whoami`

## 标准输入输出

- `>` --> `命令 > 文件` 这是将命令内容写入文件中

```bash
 netstat -an > txt.log
```

- `<` --> `命令 < 文件` 这是将文件作为命令输入

```bash
mail -s "test" linux@163.com < aa
# 就是将文件aa作为信件的内容主题为test给收信人发去
```

## 输出重定向

- 标准输入 (stdin) ：代码为 `0` ,使用 `<` 或 `<<`
- 标准输出 (stdout)：代码为 `1` ,使用 `>` 或 `>>`
- 标准错误输出(stderr)：代码为 `2` ,使用 `2>` 或 `2>>`



```bash
>  --> ps: ifconfig > test.log    # 将结果保存在test.log
>  --> ps: ifconfig 2>test.log    # 将结果(包括错误信息)保存在test.log
>> --> ps: ifconfig >> test.log   # 将结果追加保存在test.log
>> --> ps: ifconfig 2>>test.log   # 将结果(包括错误信息)追加保存在test.log

> --> ps: ifconfig > test.log 2>&1  # 将结果(包括错误信息)保存在test.log
>> --> ps: ifconfig >> test.log 2>&1  # 将结果(包括错误信息)追加保存在test.log
>> --> ps: ifconfig &>>test.log  # 将结果(包括错误信息)追加保存在test.log
>> --> ps: ifconfig 1>>success.log 2>>error.log  # 将成功放入success,失败放入error.log
> --> ps: ifconfig &>/dev/null
> --> ps: ifconfig > /dev/null 2>&1
```



## 关机

- `shutdown + 参数 + 时间`

```bash
-c  # 取消
-h  # 关机
-r  # 重启
```

- `runlevel` 运行级别
- `reboot` 重启系统
- `logout` 退出登录
- `init 0` 关机

## 常用快捷键

- `clear` / `ctrl+l` 清屏
- `ctrl + u` 从光标所在位置删除到行首
- `ctrl + a` 从光标移动到命令行首
- `ctrl + e` 从光标移动到命令行尾
- `ctrl + c` 强制终止当前命令
- `ctrl + z` 把命令放入后台
- `ctrl + r` 在历史命令中搜索

## alias 别名



```bash
alias # 查看系统已拥有别名
alias 别名='原命令'  # 临时生效,关机重启无效

# alias永久生效需要写入系统环境变量 './bashrc'中
source ./bashrc  # 立即生效

# 删掉别名：
'unalias 别名'  # 然后去系统关系删掉对应的条件
```



## 服务启动与关闭

- `/etc/init.d/服务名 start|stop|status|restart` 启动服务 (推荐)
- `service 服务名 start|stop|status|restart` 启动服务 (不推荐)
- `chkconfig --level 2345 服务名 on` 启用自启动服务 (不推荐)
- `chkconfig --level 2345 服务名 off` 停止自启动服务 (不推荐)
- `ntsysv` 启用自启动服务 (不推荐)
- `/etc/rc.d/rc.local` | `/etc/rc.local` 修改自启动服务 (推荐)
- xinetd 服务的管理
- `yum install xinetd -y` 安装 xinetd
- `/etc/xinetd.d/rsync` vim 修改配置文件
- `service xinetd restart` 启动服务

## 创建文件夹

- `mkdir + 参数 + 文件夹名`

```bash
-p # 递归创建文件夹

mkdir test
mkdir -p test/demo/po
```

## 创建文件

```bash
touch a.txt
vi a.txt   # (没有相应文件)创建编辑
# >表示覆盖, >>表示追加
ps: echo hello world! > README.md ;
echo 'Hello!!' >> a.txt   # 文件追加内容
```

## 查看文件

- `more` `less` 查看文件，如`more /etc/passwd`、`less /etc/passwd`
- `ls + 参数 + 文件`



```bash
ls -a  # a隐藏
ls -l  # 详细
ls -d  # 目录属性
ls -h  # 文件大小
ls -i  # 显示inode

cat a.txt
cat test/a.txt

tail a.txt   # 可以输出文件里的最后一小部分内容
tail test/a.txt

head # 查看文件前几行
head -5 index.html

tail # 查看文件后几行 –n –f
tail index.html、tail -f -n 5 index.html
```



## 编辑文件

```bash
vi a.txt
vi text/a.txt
```

## 复制

- `cp + 参数 + 源文件 + 目标文件`



```bash
cp -r # 复制目录
cp -p # 文件属性
cp -d # 源文件是链接文件则复制链接属性
cp -a # 拷贝源文件后的所有属性一致

- cp test1/a.txt test2/app/   # 复制文件
- cp -R test1 test1-bak       # 复制文件夹test1下所有文件
```



## 重命名与移动

```bash
- mv a.txt home/   # 移动 a.text 到该目录下的home文件夹
- mv test1 test2   # 重命名
```

## 删除

- `rm -rf 文件`



```bash
r # 删除
f # 强制删除

- rm text/a.txt # 删除文件
- rm -rf text   # 删除非空目录
- rmdir (Remove Directory) # 删除文件夹，只能删除空文件夹
```



## 软连接和硬链接 ln

- `ln -s 源文件绝对路径 目标文件` 创建软连接 (删掉源文件,无法使用)
- `ln 源文件 目标文件` 硬链接 相当于把源文件拷贝一份(删掉源文件,也可以正常使用不影响)

## 通配符

- `*` 匹配任意一个或多个内容
- `?` 匹配任意一个内容
- `[]` 匹配中括号中的一个字符

## 逻辑链接符

- `;` 顺序执行,没有逻辑关系
- `&&` 逻辑与
- `||` 逻辑非

## 工作进程

- `运行程序 &` | `ctrl + z` (暂停) 将进程放入到后台
- `jobs -l` 查看
- `fg %工作号` 将后台暂停的工作回复到前台执行
- `bg %工作号` 将后台暂停的工作回复到后台执行
- `/etc/rc.local` 将需要后台执行的命令加入开机启动(脱离终端执行)(推荐)
- `nohup 命令 &` 将进程放入到后台执行(脱离终端执行)

## 系统资源查看

- `vmstat 刷新延迟 刷新次数` ps:vmstat 1 3 监控系统资源
- 缓存 `cache` 用来加速数据从硬盘`读取`的速度
- 缓冲 `buffer` 用来加速数据的`写入`速度
- `dmesg` ps: dmesg | grep CUP 开机时内核检测信息
- `free [-b|-k|-m|g]` 查看内存使用状态
- `cat /proc/cpuinfo` 查看 CPU 信息
- `uptime`
- `uname -a`
- `lsof`

## 帮助命令

- man



```bash
man ls  # 查看ls的帮助信息
-f -> ps: man -f passwd   # 查看命令拥有的什么级别的帮助
man -f + 命令 # 相当于 whatis + 命令
-k -> ps: man -k passwd   # 查看和命令相关的所有帮助
man -k + 命令 # 相当于 apropos + 命令
```



- `命令 + --help` 查看该命令的帮助信息

## 压缩/解压



```bash
tar 参数
-c：打包
-v：显示过程
-f：指定打包后的文件名
-x：解压
-t：查看内容
-r：向压缩归档文件末尾追加文件
-u：更新原压缩包中的文件
-z：有gzip属性的
-j：有bz2属性的

tar -zcvf 压缩包名.tar.gz 源文件  # 压缩
tar -zxvf 压缩包名.tar.gz         # 解压缩
tar -jcvf 压缩包名.tar.bz2 源文件 # 压缩
tar -jxvf 压缩包名.tar.bz2        # 解压缩

tar -jtvf 压缩包名.tar.bz2        # 查看压缩文件
tar -ztvf 压缩包名.tar.gz         # 查看压缩文件
```



## wc 统计

- `wc` 统计用来计算数字,并将统计结果显示输出



```bash
-c # 统计字节数
-l # 统计行数
-m # 统计字符数。这个标志不能与 -c 标志一起使用
-w # 统计字数。一个字被定义为由空白、跳格或换行字符分隔的字符串
-L # 打印最长行的长度

wc -l test.txt > test.log`
wc < test.log
```



## 挂载命令

- 挂载命令`mount`

```bash
'mount'     # 查看当前已挂载设备
'mount -a'  # 挂载 "/etc/fstab" 里写入数据的设备
'mount [-t文件系统][-o特殊选项] + 设备文件名 + 挂载点'
```

- 挂载光盘`mount`

```bash
mkdir /mnt/cdrom
mount -t iso9660 /dev/sr0 /mnt/cdrom/
```

- 卸载光盘`umount /mnt/cdrom/`
- `fdisk -l` 查看设备名
- 挂载 u 盘：`mount -t vfat /dev/sdb1/mnt/usb/`

## 运行级别

- 运行系统级别 `init 3`
- 查看运行级别 `runlevel`
- 修改默认运行级别 `/etc/inittab`



```bash
0 # 关机
1 # 单用户模式,主要用户系统修复
2 # 不完全的命令模式,不含NFS服务
3 # 完全的命令模式,就是标准的字符界面
4 # 系统保留
5 # 图形模式
6 # 重启
```



## 查询已安装的服务

- RPM 包安装的服务

```bash
# 查看服务自启动服务状态,可以看到所有RPM安装包的服务
chkconfig --list   # 自启动服务
```

- 源码包安装的服务: 查看服务安装位置,一般是在 `/usr/local/`

## 服务与端口号

- `etc/services`
- 查看服务 `ps aux`
- 查看系统开启端口号 netstat



```bash
# 安装 net-tools 服务

netstat -tlunp   # 启动服务(监听的服务)
-t # 列出tcp数据
-u # 列出udp数据
-l # 列出正在监听的网络服务(不包含已经连接的网络服务)
-n # 用端口号来显示服务,而不是用服务名
-p # 列出该服务的进程ID(PID)

netstat -an  # 已经启动的服务
```



## RPM 包服务

- rpm 常用命令组合



```bash
－ivh：# 安装显示安装进度--install--verbose--hash
－Uvh：# 升级软件包--Update
－qpl：# 列出RPM软件包内的文件信息[Query Package list]
－qpi：# 列出RPM软件包的描述信息[Query Package install package(s)]
－qf：# 查找指定文件属于哪个RPM软件包[Query File]
－Va：# 校验所有的 RPM软件包，查找丢失的文件[View Lost]
－e：# 删除包

rpm -q samba # 查询程序是否安装

rpm -ivh  /media/cdrom/RedHat/RPMS/samba-3.0.10-1.4E.i386.rpm # 按路径安装并显示进度
rpm -ivh --relocate /=/opt/gaim gaim-1.3.0-1.fc4.i386.rpm    # 指定安装目录

rpm -ivh --test gaim-1.3.0-1.fc4.i386.rpm　　　 # 用来检查依赖关系；并不是真正的安装；
rpm -Uvh --oldpackage gaim-1.3.0-1.fc4.i386.rpm # 新版本降级为旧版本

rpm -qa | grep httpd　# [搜索指定rpm包是否安装]--all搜索*httpd*
rpm -ql httpd　　　# [搜索rpm包]--list所有文件安装目录

rpm -qpi Linux-1.4-6.i368.rpm　# [查看rpm包]--query--package--install package信息
rpm -qpf Linux-1.4-6.i368.rpm　# [查看rpm包]--file
rpm -qpR file.rpm　　　　　　　# [查看包]依赖关系
rpm2cpio file.rpm |cpio -div    # [抽出文件]

rpm -ivh file.rpm 　# [安装新的rpm]--install--verbose--hash
rpm -ivh

rpm -Uvh file.rpm    # [升级一个rpm]--upgrade
rpm -e file.rpm      # [删除一个rpm包]--erase

# .src.rpm 结尾的文件，这些文件是由软件的源代码包装而成的，用户要安装这类RPM软件包
rpm　--recompile　vim-4.6-4.src.rpm  # 这个命令会把源代码解包并编译、安装它
rpm　--rebuild　vim-4.6-4.src.rpm　# 在安装完成后，还会把编译生成的可执行文件重新包装成i386.rpm的RPM软件包
```



- 独立服务安装位置(一般)

```bash
/etc/init.d/  # 启动脚本位置
/etc/sysconfig/ # 初始化环境配置文件位置
/etc/ # 配置文件位置
/etc/xinetd.conf # xinetd配置文件
/etc/xinetd.d/ # 基于xinetd服务的启动脚本
/var/lib/ # 服务产生的数据放在这里
/var/log/ # 日志文件
```

## 源码包服务

- `/usr/local/` 一般安装目录
- `源码包安装绝对路径 start|stop|restart|status` 开启服务 (推荐)
- `/etc/rc.local` | `/etc/rc.d/rc.local` 开启自启动 (推荐)

```bash
/usr/local/apache2/bin/apachectl start
```

- `ln -s 源码包安装绝对路径 /etc/init.d/服务名` 软连接使该服务支持 service 服务方式启动 (不推荐)

```bash
ln -s /usr/local/apache2/bin/apachectl /etc/init.d/apache3
service apache3 restart  启动apache3服务
```

- 让源码包的 apache3 服务能被 chkconfig 与 ntsysv 命令管理自启动 (不推荐)



```bash
# chkconfig:运行级别　启动顺序　关闭顺序
# 启动顺序、关闭顺序:可以去"/etc/rc3.d/"查看,找没有的数字填写
vi /etc/init.d/appache3
  #chkconfig:35 86 76
  #description:source package apache3
chkconfig --add apche3
```



## 进程

- `ps aux` 查看系统所有进程
- `ps -le` 查看系统所有进程

```bash
-a # 显示一个终端的所有进程,处理会话引线
-u # 显示进程的归属用户及内存的使用情况
-x # 显示没有控制终端的进程
-l # 长格式显示 显示更加详细的信息
-e # 显示所有进程,和-A作用一致
```

- `pstree [选项]` 进程树

```bash
# 选项
-p # 显示进程的PID
-u # 显示进程的所属用户
```

- `top` 查看进程健康状态

```bash
- P # 以CPU使用率排序
- M # 以内存的使用率排序
- N # 以PID排序
- Q # 退出top
```

- `kill(选项) 进程或作业识别号` 杀死单一进程



```bash
-l：# 列出所有信号名称
-a：# 当处理当前进程时，不限制命令名和进程号的对应关系
-p：# 指定kill 命令只打印相关进程的进程号，而不发送任何信号；
-s <信息名称或编号>：# 指定要送出的信息
-u：# 指定用户

-HUP    1     # 终端断线
-INT    2     # 中断（同 Ctrl + C）
-QUIT   3     # 退出（同 Ctrl + \）
-TERM   15    # 终止
-KILL   9     # 强制终止
-CONT   18    # 继续（与STOP相反， fg/bg命令）
-STOP   19    # 暂停（同 Ctrl + Z）

ps: kill -HUP 进程号 | kill -1 进程号  # 重启进程
ps: kill -9 进程号  # 强制杀死进程
```



- `killall [选项I/i] [信号] 进程号`



```bash
-e：# 对长名称进行精确匹配
-l：# 忽略大小写的不同
-p：# 杀死进程所属的进程组
-i：# 交互式杀死进程，杀死进程前需要进行确认
-l：# 打印所有已知信号列表
-q：# 如果没有进程被杀死。则不输出任何信息
-r：# 使用正规表达式匹配要杀死的进程名称
-s：# 用指定的进程号代替默认信号“SIGTERM”
-u：# 杀死指定用户的进程

i ：# 交互式,询问是否要杀死进程
I ：# 忽略进程名的大小写
```



- `pkill (选项) 进程名称`



```bash
-o：# 仅向找到的最小（起始）进程号发送信号
-n：# 仅向找到的最大（结束）进程号发送信号
-P：# 指定父进程号发送信号
-g：# 指定进程组
-t：# 指定开启进程的终端

pkill -9 -t pts/1
```



## 系统定时任务

- `at`
- `cron`
- `anacron`
- `crontab`



```bash
yum install vixie-cron -y
yum install crontab -y
crontab -l
"no crontab for root -> crontab -e   -> wq "
service crond status

`vim /etc/cron.deny`  # 系统定时循环任务
`ls /etc/cron*`  # 系统定时任务

crontab [选项]
- e # 编辑crontab定时任务
- l # 查询crontab定时任务
- r # 删除当前用户所有的crontab定时任务

crontab -e # 默认绑定当前用户权限的命令；
# 即普通用户不能执行root用户权限，命令无效

* * * * *
m h D M W

# 没有精确到秒,最小单位为分钟
m -> 0-59  # 每小时的第几分钟
h -> 0-23  # 每天的第几小时
D -> 1-31  # 每月的第几天
M -> 1-12  # 每年的第几月
W -> 0,7-6 # 一周当中的星期几 (0,7 表示星期日)

- * # 表示任何时候都匹配
- A,B,C,D # 表示A或B或C或D时执行任务
- 1-8 # 表示1到8连续时间段执行命令任务
- */A # 表示每A分钟(小时|周|月)执行一次命令


"crontab -e"   # 命令行执行
"0 */2 * * *  执行命令(绝对路径)"  # vim编辑内容

ps: */5 * 1-5 * 2,3 date
# D和W同时存在是 "或" 的关系
ps: 1-20/2 * * * * date
ps: 0 */2 * * * echo 'hello...'


# contab通过编辑配置文件添加定时任务
vim /etc/crontab  # vim手动编辑配置文件添加定时循环任务
ls /etc/cron.*   # 将需要定时执行的脚本复制到任意一个目录下

"0 */2 * * *  用户名  执行命令(绝对路径)"  # vim编辑内容
ps: 0 */2 * * * user1 echo 'hello...'
```



## 基本权限

- 文件类型( `-` 普通文件 | `d` 目录 | `l` 软连接文件 )
- `u` 所有者 | `g` 所属组 | `o` 其他人
- `r`-`4` 读 | `w`-`2` 写 | `x`-`1` 执行

```bash
r : 读   # 对文件的查看.例：cat、more等;对目录下文件名的查看.例：ls

w : 写  # 对文件的编辑,新增,修改数据的功能;但不能删除该文件本身.
        # 修改目录结构的权限.例：删除该目录及目录下所有文件(rm、touch、mv、cp)

x : 执行 # 对文件的可执行权限;可进入目录的权限.例：cd
```

## 新建用户

- `adduser xyz` 创建用户
- `passwd xyz` 修改密码
- `chown 用户:群组 文件/目录` 对文件或目录赋予用户和用户组
- `usermod -c +用户备注+用户名` 给用户名添加备注
- `usermod -l newUsr oldUsr` 更改用户名
- `gpasswd -a 用户名 群组` 将用户加入到用户组

- `useradd 用户名` 创建用户
- `chown 用户名 文件名` 修改所有者(u)

- `umask` 查看 mask 权限
- `/etc/profile` 修改使命令永久生效
- `useradd -g test1 yxz1` 创建 yxz1 用户加入到 test1 用户组
- `useradd -d /home/ddd xyz` 创建 xyz 用户并指定创建的 ddd 为 xyz 用户目录
- `usermod -g newGroup oldGroup` 更改用户组
- `userdel 用户名` 删除用户名
- `userdel -r 用户名` 删除用户的同时用户目录也一并删除
- `touch /etc/nologin` 禁用其他账户登录系统(root 除外)
- `passwd -l 用户名` 锁定用户名
- `passwd -u 用户名` 解决用户名锁定
- `passwd -d 用户名` 清除用户名密码
- `gpasswd -a 用户名 用户组` 添加用户名的副所属组
- `gpasswd -d 用户名 用户组` 删除用户名的副所属组



```bash
# 加入相应用户组群拥有权限
sudo gpasswd -a xyz wheel  # 将xyz用户加入到wheel组

# 查看用户群组
groups xyz  # 查看用户所属的群组

# 用户群组
sudo groupadd test # 创建test用户群组
/etc/group

sudo usermod -a -G test xyz  # 把xyz这个用户放到test这个群组里
groups xyz
xyz test wheel

sudo usermod -g test xyz   # 把 xyz 用户的主群组修改成 test组
groups xyz
test wheel

# 移除用户组
sudo gpasswd -d xyz wheel  # 把xyz用户移除wheel组

# 删除用户：
userdel -r xyz  # 用于删除用户帐号及相关档案
userdel xyz
groupdel xyz
usermod –G xyz xyz # 强制删除该用户的主目录和目录下的所有文件和子目录
```



## 用户组

- `chgrp 群组 文件名` 修改群组
- `groupadd 群组` 创建用户组
- `groups + 用户名` 用户名的所属组
- `gpasswd 用户组` 设置用户组密码
- `newgrp 副所属组` 切换副所属组
- `chown 用户:群组 文件/目录` 对文件或目录赋予用户和用户组
- `useradd -g Mgroup -G group1,group2 abc` Mgroup 主 -- group1 副
- `su + 用户名` 切换用户
- `whoami` 显示当期用户
- `id + 用户名` 用户名资料
- `chfn + 用户名` 设置用户名详细资料
- `finger + 用户名` 显示用户名详细资料
- 更改用户组名 `groupmod -n + 新组名 + 组名` ps: groupmod -n test2 test1
- 组编号 `groupmod -g + 编号 + 组名` ps: groupmod -g 666 test2
- `groupadd -g 888 test3` 创建组号 888 组名 test3
- `groupdel test1` 删除用户组
- `/etc/shadow` 存储当前系统中所有用户的密码信息
- `/etc/group` 存储当前系统中所有用户组信息

```bash
  Group :       X         :  123   :  abc,def,xyz
# 组名称:   组密码占位符      : 组编号  : 组中用户名列表
```

- `/etc/gshadow` 存储当前系统中用户组的密码信息

```bash
  Group :   *    :          :  abc,def,xyz
# 组名称: 组密码   : 组管理者   : 组中用户名列表
```

- `/etc/passwd` 存储当前系统中用户的信息

```bash
  user  :  x       :   123  :    456   :    xxxx    :/home/user:/bin/bash
# 用户名 :密码占位符  :用户编号  :用户组编号  :用户注释信息  :用户组目录:shell类型
```

## chown 修改文件与目录的所有权

```bash
# chown 用户:群组 文件/目录
chown xyz:czh test
ls -l

# 修改某个目录以及它里面包含的所有的子目录的所有权
chown -R 用户:群组 目录
```

## 文件权限(rwx)



```bash
# 字母
r:read（读取）
w：write（写入）
x：excute（执行）

# 第一位：
-(常规文件)、d(目录)、l(符号链接)、c(字符特殊设备)、b(模块特殊设备)、p(FIFO)、s(套接字)

# 用户列表：
# 拥有者（owner），用户组（group），其它人（others）

touch a.txt
ls -l
-rw-rw-r--

# 数字表示的权限：
r：4  # 读
w：2  # 写
x：1  # 执行


# 例如：
7：r + w + x # 表示所有权限
6：r + w # 表示读取与写入权限
4：r # 表示读取权限

# 例：drwxrwxr-x
# 第一位d表示目录
# 从左到右每三个一组，依次表示所有者权限、组权限、其他用户权限
d     # dir
rwx   # 所有者拥有读、写、执行
rwx   # 组权拥有读、写、执行
rwx   # 其他拥有读、执行  (-表示没有)
```



## chmod 修改文件与目录的权限

- `chmod 选项 模式 文件名` 修改文件权限



```bash
# 选项 ：
-R  # 递归

# 模式 ：
u+x | u-x | 755 | a=wrx
```

```bash
# chmod 权限 目录/文件

# 数字：
# 4 是读取，2 是写入，1 是执行
chmod 755 目录
chmod 644 文件

# 字母：
r 是读取，w 是写入，x 是执行

u 表示拥有者，g 表示所属用户组，o 表示其它人，a 表示所有人

# 配合使用 + 与 - 号，去添加或去掉权限
chmod u+x 文件
chmod g+w 目录
```



- `ACL` 权限

## sudo 权限命令

- `sudo -l` 查看可用的 sudo 命令
- `vim /etc/sudoers` 赋予用户权限命令



```bash
  root      ALL         =   (ALL)       ALL
# 用户名  被管理主机的地址 = (可使用的身份)  授权命令(绝对路径)
user1       ALL         = (ALL)         /sbin/shutdown -r now

user2 ALL=/usr/sbin/useradd
user2 ALL=/usr/bin/passwd [A-Za-z]*, !/usr/bin/passwd "", !/usr/bin/passwd root

%wheel        ALL       =   (ALL)       ALL
# %组名  被管理主机的地址 = (可使用的身份)  授权命令(绝对路径)
```



- `sudo /sbin/shutdown -r now` 普通用户自行 sudo 赋予的命令

## IP 常用网段

```bash
# 网络类别 |            IP范围            | 主机数  | 私有内网IP范围
    A     | 1.0.0.0 - 126.255.255.255   | 2^24-2 | 10.0.0.0 - 10.255.255.255
    B     | 128.0.0.0 - 191.255.255.255 | 2^16-2 | 172.16.0.0 - 172.31.255.255
    C     | 192.0.0.0 - 223.255.255.255 | 2^8-2  | 192.168.0.0- 192.168.255.255
```

- `ip address` 查看 ip 地址
- `TCP/UDP`
- `netstat -an` 查看端口
- `常见端口号`

  - FTP ： 文件传输 ： 20 21
  - SSH ： 安全 shell 协议 ： 22
  - telnet ： 远程登录协议 ： 23
  - DNS ： 域名系统 ： 53
  - http ： 超文本传输协议 ： 80
  - SMTP ： 简单邮件传输协议 ： 25
  - POP3 ： 邮局协议 3 代 ： 110

- `DNS` 域名与服务器 IP 进行转换
- `默认网关` 在内网中进行通信以及使内网 IP 与公网 IP 进行互相转换通信
- 配置 linux 的 ip



```bash
# virtualBox (桥接模式):

vim /etc/sysconfig/network-scripts/ifcfg-eth0
ifcfg-eth0  # 对应的网卡名

# 配置说明
  DEVICE = "eth0"   # 对应网卡设备名
  BOOTPROTO = "none"  # 是否自动获取ip (none/static/dhcp)
  HWADDR = XXXX    # 对应的MAC地址
  USERCTL = "no"  # 不允许非root用户控制此网卡
  ONBOOT = "yes"    #  是否随网络服务启动
  IPADDR = 192.168.1.102  # 本机的IP (勿于pc机冲突)
  NETMASK = 255.255.255.0  # 子网掩码
  GATEWAY = 192.168.1.1   # 网关 (与pc机默认网关一致)
  DNS1 = 114.114.114.114  # DNS
service network restart  # 重启网络服务
```



## 新建.sh 脚本

- `demo.sh`

```bash
#!/bin/bash;
#上一句话不可省略!!!
#This is a Test Program
echo 'Hello';
```

## bash 变量

- 变量可以是数字,下划线和字母; 但是不能以数字开头
- 变量默认都是字符串类型

## bash 执行方法

```bash
# 执行方式1：
bash demo.sh

# 执行方式2：
chmod +x demo.sh   # 附加执行权限
./demo.bash        # 运行脚本
```

## shell

- `$?` 上一行命令是否正确
- `$#` 输入参数有多少个
- `$*` 输出所有输入的参数
- `$n` $1 $2... 输入的参数

## 环境变量

- export 变量=赋值
- set 显示系统中已经存在的 shell 变量
- unset 删除变量
- env
- PATH
- locale 语系变量
- source `source 配置文件 | . 配置文件` 使配置文件直接生效
- 登录系统时执行的命令文件

```bash
/etc/profile
/etc/profile.d/*.sh
~/.bash_profile
~/.bashrc
/etc/bashrc
```

- 退出系统时执行的命令文件

```bash
~/.bash_logout
```

- `/etc/issue` 本地显示登录信息
- `/etc/issue.net` 远程终端显示登录信息

```bash
# 加入 "Banner /etc/issue.net" 行,重启ssh服务
/etc/ssh/sshd_config
```

- `/etc/motd` 登录后欢迎信息(支持本地和远程)

## 其他

- 释放网页缓存，目录项和索引

```bash
sync; echo 3 > /proc/sys/vm/drop_caches
```

## 文件搜索

- `locate`

```bash
`locate + 文件名` # 查找`/var/lib/mlocate`中的数据,默认一天一更新

updatedb  # 用户更新/var/lib/mlocate数据
yum install mlocate # 安装
```

- whereis / which

```bash
whereis + 参数 + 查找系统命令
-b  # 只查找可执行文件位置
-m  # 只查找帮助文件
whereis ls
```

- `find`



```bash
`find + 搜索范围 + 搜索条件 + 搜索内容` # 搜索符合条件的文件

# 搜索条件
-i   # 不区分大小写
-user # 用户
-name # 名称
-nouser
-size  # 文件大小
find . -size +20k # 当前文件夹大于20k文件
find . -size -20K # 当前文件夹小于20k文件
-atime  # 文件访问事件
find . -atime +10 # 10天前修改文件
find . -atime -10 # 10天内修改文件
find . -atime 10  # 10天当天内修改文件
-ctime  # 改变文件属性
-mtime  # 修改文件内容
-inum   # i节点
-a  # 逻辑与
-o  # 逻辑或
-exec # 对搜索结果进行处理

find /home -name "test.txt*"
find /home -size +20k -a -100k
find /home -size +20k -a -100k -exec ls -lh {} \;
```



- `grep`

```bash
`grep + 参数 + 字符串 + 文件名` # 搜索文件中的符合内容的字符串

-i # 忽略大小写
-v # 排除指定字符串

grep -i 'size' text.txt  # 查找text.txt中包含size的行
```

## Linux日期时间显示输出

> https://www.cnblogs.com/xzlive/p/13368079.html

- 1、输出当前年月日

```bash
echo $(date +%F)
2014-02-21
```

- 2、输出当前时间 (时分)

```bash
echo $(date +%R)
12:45
```

- 3、输出当前时间 (时分秒)

```bash
echo $(date +%T)
12:52:51
```

- 4、输出星期

```bash
echo $(date +%A)
星期五
```

- 5.1输出年月日

```bash
echo $(date +%Y/%m/%d)
2014/02/21
%Y参数: 年
%m参数: 月
%d参数: 日
```

- 5.2输出时分秒

```bash
echo $(date +%H:%M:%S)
12:50:44
%H参数: 时
%M参数: 分
%S参数: 秒
```

- 5.3输出年月日时分秒

```bash
echo $(date +%F%n%T)
2014-02-21 12:56:46
%n参数: 空格
%F参数: 年月日
%T参数: 时分秒
```

## 相关链接

- [Linux 命令大全](http://man.linuxde.net/)
- [Linux rpm 命令参数使用详解［介绍和应用］](http://www.cnblogs.com/xiaochaohuashengmi/archive/2011/10/08/2203153.html)
- [linux kill 命令详解](http://www.cnblogs.com/wangcp-2014/p/5146343.html)
- [Linux 软件安装管理](https://segmentfault.com/a/1190000007109304)
- [iptables 命令](http://man.linuxde.net/iptables)
- [iptables INPUT 链使用实例说明](https://www.centos.bz/2017/07/iptables-input/)
- [judasn/Linux-Tutorial](https://github.com/judasn/Linux-Tutorial)
- [ping.pe](http://ping.pe/)
