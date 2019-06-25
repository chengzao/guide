# 使用nginx

## windows

- windows下安装nginx的目录结构如下：

![nginx-windows](../assets/images/nginx-windows.png?raw=true)

- 在nginx-1.12.1目录下`conf/nginx.conf` 内容

<CodeBlock>

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

</CodeBlock>

- vhost 目录下 `a_com.conf` 内容：

<CodeBlock>

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

</CodeBlock>

- vhost 目录下 `b_com.conf` 内容：

<CodeBlock>

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

</CodeBlock>

- 在本地磁盘D盘下 新建 test 和 test2目录，并新建 index.html文件

- 在本地磁盘C盘中 `C:\Windows\System32\drivers\etc` 下修改 `hosts` 如下

<CodeBlock>

```bash
127.0.0.1       www.a.com
127.0.0.1       www.b.com
```

</CodeBlock>

- 用cmd进入nginx安装目录下执行

<CodeBlock>

```bash
nginx.exe  # 开始
nginx -t  # 检测语法
nginx -s reload  # 重新启动
nginx -s stop  # 停止
```

</CodeBlock>

- 打开浏览器输入网址

## mac

### nginx for mac

- `brew install nginx`

### nginx install

- hosts

<CodeBlock>

```bash
127.0.0.1       jenkins.chenio.com
127.0.0.1       gitlab.chenio.com
127.0.0.1       www.chenio.com
```

</CodeBlock>

- `brew install wget`

<CodeBlock>

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

</CodeBlock>

- start nginx

<CodeBlock>

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

</CodeBlock>

- nginx config

<CodeBlock>

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

</CodeBlock>
