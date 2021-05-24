---
autoGroup-2: nginx
title: nginx安装
date: 2020-07-21
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
