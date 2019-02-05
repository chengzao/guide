# 使用nginx

## centos7

### 配置

- nginx在本地centos7下多域名的简单配置(安装版)
- 提示： 避免出错提示权限不够 ，可以在root 用户中执行以下内容

- centos7下安装nginx

```bash
yum install epel-release -y
yum install nginx -y
nginx -t              # 检测.conf语法配置
service nginx status  # 查看状态
service nginx start   # 启动服务
service nginx stop    #停止服务
systemctl enable nginx #开机启动
systemctl stop firewalld.service #关闭firewalld防火墙
systemctl disable firewalld.service #禁止firewalld开机启动
```

- 进入/etc/nginx/找到nginx.conf ，编辑nginx.conf文件在其中找到 http模块，添加你需要额外配置文件`例如：include /etc/nginx/vhost/*.conf`

- 这里本地测试情况可忽略第2步骤.因为在`nginx.conf`文件中已经为一般情况做好了配置.如下图36行处在这里可以进行多域名的配置的文件夹

![image](../assets/images/nginx-centos7.png?raw=true)

#### 新建conf

- 进入`/etc/nginx/default.d/` 文件中， 新建文件以`.conf` 结尾

```bash
# 例： 这里新建两个配置文件
touch a_com.conf
touch b_com.conf
```

#### 编辑conf

- `a_com.conf`配置文件内容如下：

```nginx
server {
        listen       80;
        server_name  www.a.com;
        root   /usr/share/nginx/demo1;
        location / {
            index  index.html index.htm;
        }
}
```

- `b_com.conf`配置文件内容如下：

```nginx
server {
        listen       80;
        server_name  www.b.com;
        root   /usr/share/nginx/demo2;
        location / {
            index  index.html index.htm;
        }
}
```

#### 新建目录

- 进入 `/usr/share/nginx/`  目录中新建 demo1 和 demo2 两个文件夹

　分别在这两个文件夹中，放入两个不同内容的 index.html 文件即可

#### 修改centos7的hosts

- 进入 `/etc/` 中编辑 centos7 的hosts 。或直接  `vim  /etc/hosts` 打开编辑 在其中添加

```bash
127.0.0.1    www.a.com
127.0.0.1    www.b.com
```

添加完毕后,需要重新启动network服务: `systenctl restart network.service`

然后通过在命令行cmd中输入 ：`ping www.a.com` 看返回的ip地址是否为 127.0.0.1 。

### windows配置

#### 修改hosts

- 在本地windows电脑中修改`host`文件： `c:\windows\system32\drivers\etc\hosts`

- 在其中添加 添加  centos7的ip地址 （在centos7命令行中输入：  `ip addr show` 查看ip）

```bash
# 例如：在其中输入如下  192.168.241.20  是我本地centos7的地址 ，替换成你的centos7的ip即可
192.168.241.20  www.a.com
192.168.241.20  www.b.com
```

#### 访问浏览器

打开本地浏览器 输入网址 访问即可。

打开 www.a.com  www.b.com  192.168.241.20  看看是否内容不同

## windows

- windows下安装nginx的目录结构如下：

![nginx-windows](../assets/images/nginx-windows.png?raw=true)

- 在nginx-1.12.1目录下`conf/nginx.conf` 内容

```nginx
#user  nobody;
worker_processes  1;
events {
    worker_connections  1024;
}
http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;
    server {
        listen       80 default_server;
        server_name  localhost default_server;
        root   html;
        location / {
            index  index.html index.htm;
        }
}
    include ../vhost/*.conf;
}
```

- vhost 目录下 `a_com.conf` 内容：

```nginx
server {
        listen       80;
        server_name  www.a.com;
        root   D:/test/;
        location / {
            index  index.html index.htm;
        }
}
```

- vhost 目录下 `b_com.conf` 内容：

```nginx
server {
        listen       80;
        server_name  www.b.com;
        root   D:/test2/;
        location / {
            index  index.html index.htm;
        }
}
```

- 在本地磁盘D盘下 新建 test 和 test2目录，并新建 index.html文件

- 在本地磁盘C盘中 `C:\Windows\System32\drivers\etc` 下修改 `hosts` 如下

```bash
127.0.0.1       www.a.com
127.0.0.1       www.b.com
```

- 用cmd进入nginx安装目录下执行

```bash
nginx.exe  # 开始
nginx -t  # 检测语法
nginx -s reload  # 重新启动
nginx -s stop  # 停止
```

- 打开浏览器输入网址

## nginx

### nginx for mac

- `brew install nginx`

### nginx install

- hosts

```bash
127.0.0.1       jenkins.chenio.com
127.0.0.1       gitlab.chenio.com
127.0.0.1       www.chenio.com
```

- `brew install wget`

```bash
# nginx下载页: http://nginx.org/en/download.html
wget http://nginx.org/download/nginx-1.14.2.tar.gz
# zlib下载页: http://zlib.net/
wget http://zlib.net/zlib-1.2.11.tar.gz
# pcre下载页: http://www.pcre.org/
wget ftp://ftp.csx.cam.ac.uk/pub/software/programming/pcre/pcre-8.42.tar.gz

tar zxvf zlib-1.2.11.tar.gz
tar zxvf pcre-8.42.tar.gz
tar zxvf nginx-1.14.2.tar.gz
./configure --prefix=/usr/local/nginx --with-zlib=../zlib-1.2.11 --with-pcre=../pcre2-10.21
make
sudo make install
```

- start nginx

```bash
# 进入nginx文件夹
cd /usr/local/nginx

#启动
sudo sbin/nginx     #浏览器访问 127.0.0.1 测试是否成功启动

#重启
sudo sbin/nginx -s reload

#停止
sudo sbin/nginx -s stop

# 检测语法
sudo sbin/nginx -t
```

- nginx config

```bash
# nginx.conf, http里添加
include ../vhost/*.conf;

# nginx.conf, 禁用ip访问
server {
    listen 80 default_server;
    server_name _;
    return 403;
}

# nginx.conf, 隐藏nginx版本显示
server_tokens off;

mkdir vhost && cd vhost

# gitlab_chenio_com.conf
upstream gitlab {
    server 127.0.0.1:9090;
}

server {
    listen  80;
    index index index.htm index.py index.html;

    server_name gitlab.chenio.com;

    location / {
        proxy_pass_header Server;
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Scheme $scheme;
        proxy_pass http://gitlab;
    }
}

# jenkins_chenio_com.conf
upstream jenkins {
    server 127.0.0.1:8080;
}

server {
    listen  80;
    index index index.htm index.py index.html;

    server_name jenkins.chenio.com;

    location / {
        proxy_pass_header Server;
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Scheme $scheme;
        proxy_pass http://jenkins;
    }
}
```
