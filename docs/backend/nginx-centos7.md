---
autoGroup-2: nginx
title: nginx在centos7中的使用
date: 2020-07-21
sidebar: "auto"
tags:
  - centos7
  - nginx
categories:
  - backend
---

- centos7

```bash
sudo yum update -y
sudo yum install wget -y
sudo yum install epel-release -y
sudo yum install gcc gcc-c++ make libtool zlib zlib-devel openssl openssl-devel pcre pcre-devel -y
sudo yum install vim -y
sudo yum install net-tools -y
sudo yum upgrade -y
```

## nginx 安装

- 当前 nginx 版本: `nginx -V`

```bash
nginx version: nginx/1.15.12
```

- step1: [nginx](http://nginx.org/en/linux_packages.html#RHEL-CentOS)

```bash
sudo yum install yum-utils
```

- step2: 编辑`vim /etc/yum.repos.d/nginx.repo`

```bash
[nginx-stable]
name=nginx stable repo
baseurl=http://nginx.org/packages/centos/7/$basearch/
gpgcheck=1
enabled=1
gpgkey=https://nginx.org/keys/nginx_signing.key

[nginx-mainline]
name=nginx mainline repo
baseurl=http://nginx.org/packages/mainline/centos/7/$basearch/
gpgcheck=1
enabled=0
gpgkey=https://nginx.org/keys/nginx_signing.key
```

- step3: `sudo yum-config-manager --enable nginx-mainline`
- step4: `sudo yum install nginx`
- 查看安装 nginx 信息: `rpm -ql nginx`
- step5: `systemctl enable nginx.service`
- nginx service: `servce nginx start|stop|restart`
- yum 安装的 nginx 目录位置: `/etc/nginx/`
- yum 安装的 nginx 后 html 文件位置: `/usr/share/nginx/html`
- nginx 配置 conf: `/etc/nginx/nginx.conf`和`/etc/nginx/conf/`

### nginx

- `vim /etc/nginx/nginx.conf`



```bash
user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    include /etc/nginx/conf.d/*.conf;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
        '$status $body_bytes_sent "$http_referer" '
        '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    server_tokens   off;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    fastcgi_intercept_errors on;

    #开启gzip压缩
    gzip  on;
    #IE6的某些版本对gzip的压缩支持很不好,故关闭
    gzip_disable "MSIE [1-6]\.(?!.*SV1)";
    #HTTP1.0以上的版本都启动gzip
    gzip_http_version 1.0;
    #指定哪些类型的相应才启用gzip压缩，多个用空格分隔
    gzip_types
    application/javascript
    application/json
    text/css
    text/plain;

    gzip_comp_level 5;

    server {
        listen 80 default;
        server_name _;
        return 500;
    }
}
```



- `vim /etc/nginx/conf.d/default.conf`



```bash
server {
    listen       80;
    server_name  www.domain.cn domain.cn;

    #charset koi8-r;
    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }
    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}
```



- 检查 nginx 配置文件: `nginx -t`
- 重启 nginx 服务: `service nginx restart`
- 购买域名, 配置 dns 后， 访问域名网址

## 配置 ssl

- [Neilpang/acme.sh](https://github.com/Neilpang/acme.sh)
- 安装 acme.sh

```bash
curl  https://get.acme.sh | sh

# 安装到你的 home 目录
~/.acme.sh/

# 创建 一个 bash 的 alias
alias acme.sh=~/.acme.sh/acme.sh
```

- 生成证书

```bash
# 方式1
acme.sh  --issue  -d domain.cn -d www.domain.cn  --webroot  /usr/share/nginx/html/
# 方式2
acme.sh --issue  -d domain.cn   --nginx
```

- 安装证书

```bash
mkdir /etc/nginx/ssl

acme.sh  --installcert  -d  domain.cn   \
        --key-file   /etc/nginx/ssl/domain.cn.key \
        --fullchain-file /etc/nginx/ssl/fullchain.cer \
        --reloadcmd  "service nginx force-reload"
```

- 更新 acme.sh

```bash
# 开启自动升级
acme.sh  --upgrade  --auto-upgrade
```

## 配置 nginx

- step1: `cp default.conf chenio_cn.conf` 和 `mv default.conf default.conf.bak`
- step2: `vim /etc/nginx/conf.d/chenio_cn.conf`



```bash
server {
    listen 80;
    server_name  www.domain.cn domain.cn;
    rewrite ^(.*) https://$http_host$request_uri? permanent;
}

server {
    listen  443 ssl;
    server_name  www.domain.cn domain.cn;

    root  /usr/share/nginx/html;

    error_page 404 /404/404.html;

    # ssl on;
    ssl_certificate /etc/nginx/ssl/fullchain.cer;
    ssl_certificate_key /etc/nginx/ssl/domain.cn.key;

    keepalive_timeout   70;
    fastcgi_param   HTTPS               on;
    fastcgi_param   HTTP_SCHEME         https;

    server_tokens off;

    location / {
        index  index.html index.htm;
    }

    location /xxx {
        autoindex on;
        autoindex_exact_size off;
        autoindex_localtime on;
    }

    location = /50x.html {
        root /usr/share/nginx/html;
    }
}
```



- step3: `nginx -t`
- step4: `service nginx restart`
- step5: 访问域名网址
