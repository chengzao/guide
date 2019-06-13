# nginx

## nginx结构

- 主要结构

<CodeBlock>

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

</CodeBlock>

## upstream

<CodeBlock>

```nginx
# nginx的upstream目前支持4种方式的分配

# 轮询（默认） 每个请求按时间顺序逐一分配到不同的后端服务器，如果后端服务器down掉，能自动剔除
# weight  指定轮询几率，weight和访问比率成正比，用于后端服务器性能不均的情况
# ip_hash  每个请求按访问ip的hash结果分配，这样每个访客固定访问一个后端服务器，可以解决session的问题
# fair（第三方  按后端服务器的响应时间来分配请求，响应时间短的优先分配

# down  表示单前的server暂时不参与负载
# weight  默认为1.weight越大，负载的权重就越大
# max_fails  允许请求失败的次数默认为1.当超过最大次数时，返回proxy_next_upstream 模块定义的错误
# fail_timeout  max_fails次失败后，暂停的时间
# backup  其它所有的非backup机器down或者忙的时候，请求backup机器。所以这台机器压力会最轻

upstream mysvr{
    ip_hash;
    server 192.168.12.133:80;
    server 192.168.12.134:80  down;
    server 192.168.12.135:8009  max_fails=3  fail_timeout=20s;
    server 192.168.12.136:8080;
}
```

</CodeBlock>

## location配置

<CodeBlock>

```nginx
# 语法规则： location [=|~|~*|^~] /uri/ { … }

# 首先匹配 =，其次匹配^~, 其次是按文件中顺序的正则匹配，最后是交给 / 通用匹配。
# 当有匹配成功时候，停止匹配，按当前匹配规则处理请求

# =	  开头表示精确匹配
# ^~	开头表示uri以某个常规字符串开头，理解为匹配 url路径即可
# ~	  开头表示区分大小写的正则匹配
# !~	区分大小写不匹配
# !~*	不区分大小写不匹配
# ~*	开头表示不区分大小写的正则匹配
# / 	通用匹配，任何请求都会匹配到

location = / {
   #规则A
}
location = /login {
   #规则B
}
location ^~ /static/ {
   #规则C
}
location ~ \.(gif|jpg|png|js|css)$ {
   #规则D
}
# 访问根目录/ 比如http://localhost/ 将匹配规则A;
# 访问 http://localhost/login 将匹配规则B;
# 访问 http://localhost/static/a.html 将匹配规则C;
# 访问 http://localhost/a.gif, http://localhost/b.jpg 将匹配规则D
```

</CodeBlock>

## Nginx Rewrite

- 规则相关指令有if,rewrite,set,return,break
- 全局变量

<CodeBlock>

```bash
$args ： 这个变量等于请求行中的参数，同$query_string
$content_length ： 请求头中的Content-length字段
$content_type ： 请求头中的Content-Type字段
$document_root ： 当前请求在root指令中指定的值
$host ： 请求主机头字段，否则为服务器名称
$http_user_agent ： 客户端agent信息
$http_cookie ： 客户端cookie信
$limit_rate ： 这个变量可以限制连接速率
$request_method ： 客户端请求的动作，通常为GET或POST
$remote_addr ： 客户端的IP地址
$remote_port ： 客户端的端口
$remote_user ： 已经经过Auth Basic Module验证的用户名
$request_filename ： 当前请求的文件路径，由root或alias指令与URI请求生成
$scheme ： HTTP方法（如http，https）
$server_protocol ： 请求使用的协议，通常是HTTP/1.0或HTTP/1.1
$server_addr ： 服务器地址，在完成一次系统调用后可以确定这个值
$server_name ： 服务器名称
$server_port ： 请求到达服务器的端口号
$request_uri ： 包含请求参数的原始URI，不包含主机名，如："/foo/bar.php?arg=baz"
$uri ： 不带请求参数的当前URI，$uri不包含主机名，如"/foo/bar.html"
$document_uri ： 与$uri相同
```

</CodeBlock>

- 常用正则

<CodeBlock>

```bash
. ： 匹配除换行符以外的任意字符
? ： 重复0次或1次
+ ： 重复1次或更多次
* ： 重复0次或更多次
\d ：匹配数字
^ ： 匹配字符串的开始
$ ： 匹配字符串的介绍
{n} ： 重复n次
{n,} ： 重复n次或更多次
[c] ： 匹配单个字符c
[a-z] ： 匹配a-z小写字母的任意一个
小括号()之间匹配的内容，可以在后面通过$1来引用，$2表示的是前面第二个()里的内容

正则表达式匹配
~ 为区分大小写匹配
~* 为不区分大小写匹配
!~和!~*分别为区分大小写不匹配及不区分大小写不匹配

文件及目录匹配：
-f和!-f用来判断是否存在文件
-d和!-d用来判断是否存在目录
-e和!-e用来判断是否存在文件或目录
-x和!-x用来判断文件是否可执行
```

</CodeBlock>

- flag标记有

<CodeBlock>

```bash
last    相当于Apache里的[L]标记，表示完成rewrite
break   终止匹配, 不再匹配后面的规则
redirect    返回302临时重定向 地址栏会显示跳转后的地址
permanent   返回301永久重定向 地址栏会显示跳转后的地址
```

```nginx
location /baidu {
    ##rewrite    <regex>   <replacement>   [flag];
    rewrite (.*) http://www.baidu.com;
}
```

</CodeBlock>

## demo

<CodeBlock>

```nginx
# 直接匹配网站根，通过域名访问网站首页比较频繁，使用这个会加速处理
# 这里是直接转发给后端应用服务器了，也可以是一个静态首页
# 第一个必选规则

location = / {
    proxy_pass http://tomcat:8080/index
}

# 第二个必选规则是处理静态文件请求，这是nginx作为http服务器的强项
# 有两种配置模式，目录匹配或后缀匹配,任选其一或搭配使用

location ^~ /static/ {
    root /webroot/static/;
}
location ~* \.(gif|jpg|jpeg|png|css|js|ico)$ {
    root /webroot/res/;
}

# 第三个规则就是通用规则，用来转发动态请求到后端应用服务器
# 非静态文件请求就默认是动态请求，自己根据实际把握
# 毕竟目前的一些框架的流行，带.php,.jsp后缀的情况很少了

location / {
    proxy_pass http://tomcat:8080/
}
```

</CodeBlock>

## nginx安装

<CodeBlock title="yum安装 >>">

```bash
# cd /etc/yum.repos.d
# touch nginx.repo
# vim nginx.repo

# 写入如下：

[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/centos/7/$basearch/
gpgcheck=0
enabled=1

# yum makecache
# yum install nginx
# service nginx start|stop
# systemctl enable nginx

```

</CodeBlock>

<CodeBlock title="安装包安装 >>">

```bash
yum -y install gcc gcc-c++ make libtool zlib zlib-devel openssl openssl-devel pcre pcre-devel
nginx url: http://nginx.org/en/download.html
wget http://nginx.org/download/nginx-1.10.1.tar.gz
tar -zxvf nginx-1.10.1.tar.gz
cd nginx-1.10.1
./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module --with-pcre
make
make install
cd /usr/local/nginx/sbin
./nginx -V # 查看版本
vim /etc/profile
export PATH=/usr/local/nginx/sbin:$PATH
source /etc/profile
nginx -V #查看版本

# server nginx: https://github.com/chengzao/note/blob/master/others/linux/nginx.txt
```

</CodeBlock>

[nginx server lib](/libs/nginx.txt)

## ssl

- `https://freessl.org`
- `https://certbot.eff.org/`
- `https://github.com/Neilpang/acme.sh`

<CodeBlock>

```bash
安装： curl  https://get.acme.sh | sh

起别名：alias acme.sh=~/.acme.sh/acme.sh

生成证书：acme.sh --issue -d www.domain.cn -d api.domain.cn -d blog.domain.cn  -d www.domain.top -w /usr/local/nginx/wwwroot

拷贝证书： acme.sh  --installcert  -d  www.domain.cn --key-file   /usr/local/nginx/ssl/domain_cn.key  --fullchain-file /usr/local/nginx/ssl/fullchain.cer  --reloadcmd  "service nginx force-reload"

自动更新 acme.sh： acme.sh  --upgrade  --auto-upgrade
```

</CodeBlock>

## DEMO

- nginx.conf

<CodeBlock>

```nginx
#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;
    include 	  /usr/local/nginx/vhost/*.conf;
    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    server {
        listen       80;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   html;
            index  index.html index.htm;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
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

    server {
      listen 80 default;
      server_name _;
      return 500;
    }

    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}

}
```

</CodeBlock>

- server

<CodeBlock>

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

</CodeBlock>

## 相关链接

- [Nginx proxy_set_header 理解](http://www.jianshu.com/p/cc5167032525)
- [Nginx配置upstream实现负载均衡](http://www.linuxidc.com/Linux/2015-03/115207.htm)
- [nginx配置location总结及rewrite规则写法](https://segmentfault.com/a/1190000002797606#articleHeader5)
- [tengine](http://tengine.taobao.org/book/chapter_02.html)
- [nginx服务器详细安装过程](https://segmentfault.com/a/1190000007116797)
- [Mac OS下安装及配置nginx](https://gist.github.com/Mioke/ae35fa333dee3b2ac137)
- [acme.sh](https://github.com/Neilpang/acme.sh)
- [Nginx通过CORS实现跨域](https://mp.weixin.qq.com/s?__biz=MzI3MTI2NzkxMA==&mid=2247484408&idx=1&sn=5c64dd43ff2060e1c4a22d93e4e887c9&scene=1&srcid=0901vPdwJR0crm8vJmjboYzI#rd)
- [Nginx基本配置备忘](https://zhuanlan.zhihu.com/p/24524057)
