---
title: nginx安装使用
date: 2021-11-21
sidebar: "auto"
tags:
  - nginx
categories:
  - services
---

## nginx

https://nginx.org

## pcre

http://www.pcre.org/

```
tar xvzf pcre2-10.36.tar.gz
```

## openssl

https://www.openssl.org/

```
tar xvzf openssl-1.1.1j.tar.gz
```

## zlib

http://zlib.net/

```
tar zxvf zlib-1.2.11.tar.gz
```

## Compile Nginx

```
sudo ./configure

$ ./configure --with-pcre=../pcre2-10.36 --with-http_ssl_module --with-openssl=../openssl-1.1.1j --with-zlib=../zlib-1.2.11
```

## Install Nginx

```
sudo make && make install
```

## Add the nginx binary to $PATH:

```
export PATH="/usr/local/nginx/sbin:$PATH"
```

## Caddy 2

caddy Traefik


- Caddyfile 配置域名

```
demo1.test.com {
    root * /var/www/html
    file_server
}
```

- Caddyfile reverse_proxy 代理

```
demo2.test.com {
    reverse_proxy 127.0.0.1:8080
}
```

- Caddyfile redir 重定向

```
demo3.test.com {
    redir https://baidu.com
}
```

- Caddyfile 泛域名

```
*.test.com {
    tls {
        on_demand
    }

    redir https://baidu.com
}
```

## nginx结构

```nginx
##定义Nginx运行的用户和用户组用user指令
user nginx;

##定义nginx进程数,建议设置为等于CPU总核心数
worker_processes  8;

##全局错误日志定义类型，[ debug | info | notice | warn | error | crit ]用error_log指令
error_log  /var/log/nginx/error.log info;

##定义进程文件用pid指令
pid /var/run/nginx.pid;

##描述nginx进程打开的最多文件描述符的数目
worker_rlimit_nofile 65535;

##Main段，定义全局属性
events {
  ##定义不同IO模型下的工作机制
  ##参考事件模型指令：use [ kqueue | rtsig | epoll | /dev/poll | select | poll ];
  use epoll;

  ##设置单个进程最大连接数用指令：(最大连接数=连接数*进程数)
  worker_connections 1024;

}
http {
    ##定义作为web服务器的相关属性

    ##设定mime类型,类型由mime.type文件定义 用include指令
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    ##开启gzip压缩指令
    gzip on;
    gzip_disable "MSIE [1-6]\.(?!.*SV1)";

    server {
        ##定义一个虚拟主机的属性，所有web服务必须定义成一个虚拟主机，与httpd不同
        ##侦听80端口
        listen       80;

        ##定义使用www.xx.com访问
        server_name  www.xx.com;

        ##设定本虚拟主机的访问日志
        access_log  logs/www.xx.com.access.log  main;

        ##定义服务器的默认网站根目录位置
        root   /root;

        ##默认请求
        location / {

            index index.php index.html index.htm;   ##定义首页索引文件的名称

            fastcgi_pass  www.xx.com;

            fastcgi_param  SCRIPT_FILENAME $document_root/$fastcgi_script_name;

            include /etc/nginx/fastcgi_params;
        }

        ##定义错误提示页面
        error_page   500 502 503 504 /50x.html;
        location = /50x.html {
          root   /root;
        }

        location / {
          ##反向代理
          ##proxy_pass请求转向指令
          ##proxy_set_header允许重新定义或添加字段传递给代理服务器的请求头
          proxy_set_header Host $host:$server_port;
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Real-PORT $remote_port;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_pass https://www.baidu.com;
        }

    }
    upstream mysvr {
      ##weigth参数表示权值，权值越高被分配到的几率越大
      ##本机上的Squid开启3128端口
        server 192.168.8.1:3128 weight=5;
        server 192.168.8.2:80  weight=1;
        server 192.168.8.3:80  weight=6;
    }
 }
```

## nginx config server

```nginx
server {
    listen 80;
    server_name www.domain.cn;
    rewrite ^(.*) https://$http_host$request_uri? permanent;
}


server {
    listen  443 ssl;
    server_name  www.domain.cn;
    root  /usr/local/nginx/wwwroot;

    ssl on;

    ssl_certificate /usr/local/nginx/ssl/fullchain.cer;
    ssl_certificate_key /usr/local/nginx/ssl/domain_cn.key;

    keepalive_timeout   70;
    fastcgi_param   HTTPS               on;
    fastcgi_param   HTTP_SCHEME         https;
    server_tokens off;


    location / {
        index  index.html index.htm;
    }
    # 开启文件夹访问
    location /note {
        autoindex on;
        autoindex_exact_size off;
        autoindex_localtime on;
    }
}
```

- 静态文件下载

```bash
location /test {
   add_header Content-Disposition "attachment;";
}
```

- server

```bash
server {
    listen  80;
    server_name  api.domain.cn;
    root  /usr/local/nginx/wwwroot/api;
    location / {
        index  index.html index.htm;
    }
    location /note {
        autoindex on;
        autoindex_exact_size off;
        autoindex_localtime on;
    }
}
```

- upstream

```bash
upstream getImg {
    server 127.0.0.1:3000;
}

map $http_origin $corsHost {
    default 0;
    "~http://www.domain.cn" http://www.domain.cn;
    "~http://blog.domain.cn" http://blog.domain.cn;
    "~http://www.domain.top" http://www.domain.top;
}

server {
    listen  80;
    server_name  api.domain.cn;
    location / {
        if ($request_method = "OPTIONS") {
            add_header 'Access-Control-Max-Age' 86400;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, DELETE';
            add_header 'Access-Control-Allow-Headers' 'reqid, nid, host, x-real-ip, x-forwarded-ip, event-type, event-id, accept, content-type';
            add_header 'Content-Length' 0;
            add_header 'Content-Type' 'text/plain, charset=utf-8';
            return 204;
        }
        add_header 'Access-Control-Allow-Origin' $corsHost;
        add_header 'Access-Control-Allow-Credentials' 'true';
        add_header 'Access-Control-Allow-Headers' 'Authorization,Content-Type,Accept,Origin,User-Agent,DNT,Cache-Control,X-Mx-ReqToken,X-Requested-With';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, OPTIONS, DELETE';


        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-Nginx-Proxy true;
        proxy_pass http://getImg;
        proxy_redirect off;
    }

}
```

## nginx配置ssl

- https://github.com/jc21/nginx-proxy-manager
- https://freessl.org
- https://certbot.eff.org/
- [Neilpang/acme.sh](https://github.com/Neilpang/acme.sh)

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

## nginx配置转发

- 前端页面转发，www.domain.com/page/mall/about,根据page转发到前端upstream，upstream由mall决定，转发到mall.example.com，前端处理路由about

```bash
# www.domain.com/page/mall/about -> mall.example.com/about

location ~ ^/page/([a-z]*)/(.*)$ {
  set $a $1;
  set $b $2;
  set $upstream $a.domain.com;
  proxy_pass http://$upstream/$b$is_args$args;
}
```

- 后端接口转发，www.domain.com/api/mall/app/home/xx,根据api转发到后端upstream，upstream由mall决定，转发到mall.example.com，后端处理路由/app/home/xx

```bash
# www.domain.com/api/mall/app/home/sift -> mall.example.com/app/home/sift

location ~ ^/api/([a-z]*)/(.*)$ {
    set $a $1;
    set $b $2;
    set $upstream $a.domain.com;
    proxy_pass http://$upstream/$b$is_args$args;
}
```

- 主站首页转发，mall.domain.com

```bash
location = / {
  set $upstream mall.domain.com;
  proxy_pass http://$upstream;
}
```

- 404页面, mall.domain.com/notfound

```bash
location / {
    set $upstream mall.domain.com;
    proxy_pass http://$upstream/notfound;
}
```

## fileBrowser

- [fileBrowser](https://github.com/filebrowser/filebrowser)

## OneDrive Directory Index

- [olaindex](https://github.com/WangNingkai/OLAINDEX)
