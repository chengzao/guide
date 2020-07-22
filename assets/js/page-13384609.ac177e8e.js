(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{698:function(s,n,a){"use strict";a.r(n);var t=a(4),e=Object(t.a)({},(function(){var s=this,n=s.$createElement,a=s._self._c||n;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h2",{attrs:{id:"centos-ssh"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#centos-ssh"}},[s._v("#")]),s._v(" centos ssh")]),s._v(" "),a("h3",{attrs:{id:"方式一"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#方式一"}},[s._v("#")]),s._v(" 方式一")]),s._v(" "),a("ul",[a("li",[s._v("Dockerfile")])]),s._v(" "),a("CodeBlock",[a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# Dockerfile")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 生成的新镜像以centos镜像为基础")]),s._v("\nFROM centos\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 安装openssh-server")]),s._v("\nRUN yum "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("passwd")]),s._v(" openssl openssh-server openssh-clients -y\n\nRUN ssh-keygen -q -t rsa -b "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2048")]),s._v(" -f /etc/ssh/ssh_host_rsa_key -N "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("''")]),s._v("\nRUN ssh-keygen -q -t ecdsa -f /etc/ssh/ssh_host_ecdsa_key -N "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("''")]),s._v("\nRUN ssh-keygen -t dsa -f /etc/ssh/ssh_host_ed25519_key  -N "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("''")]),s._v("\n\nRUN "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sed")]),s._v(" -i "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"s/#UsePrivilegeSeparation.*/UsePrivilegeSeparation no/g"')]),s._v(" /etc/ssh/sshd_config\nRUN "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sed")]),s._v(" -i "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"s/UsePAM.*/UsePAM no/g"')]),s._v(" /etc/ssh/sshd_config\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 指定root密码")]),s._v("\nRUN /bin/echo "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'root:admin'")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("chpasswd\n\nEXPOSE "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("22")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# CMD /usr/sbin/sshd -D")]),s._v("\nCMD "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"/usr/sbin/sshd"')]),s._v(", "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"-D"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br")])])]),s._v(" "),a("ul",[a("li",[s._v("docker - run")])]),s._v(" "),a("CodeBlock",[a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 进入Dockerfile所在文件夹运行如下")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 构建Dockerfile")]),s._v("\ndocker build -t ssh-centos "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(".")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 运行查看构建成功的image信息")]),s._v("\ndocker images\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 运行生成的image, containername为运行容器的名字, imageid为image的id")]),s._v("\ndocker run -itd --name containername -p "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10020")]),s._v(":20  imageid\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# ssh连接centos")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("ssh")]),s._v(" root@127.0.0.1 -p "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10020")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br")])])]),s._v(" "),a("ul",[a("li",[s._v("docker-compose.yml")])]),s._v(" "),a("CodeBlock",[a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("version: "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'2'")]),s._v("\nservices:\n  centos-ssh:\n    build: "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(".")]),s._v("\n    image: "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'czh/centos-ssh'")]),s._v("\n    restart: always\n    container_name: centos-ssh\n    ports:\n      - "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'10020:22'")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br")])])]),s._v(" "),a("ul",[a("li",[s._v("ssh 连接 centos: "),a("code",[s._v("ssh root@127.0.0.1 -p 10020")])])]),s._v(" "),a("h3",{attrs:{id:"方式二"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#方式二"}},[s._v("#")]),s._v(" 方式二")]),s._v(" "),a("ul",[a("li",[s._v("Dockerfile")])]),s._v(" "),a("CodeBlock",[a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# Dockerfile")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 生成的新镜像以centos镜像为基础")]),s._v("\nFROM centos\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 安装openssh-server")]),s._v("\nRUN yum "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("passwd")]),s._v(" openssl openssh-server openssh-clients -y\n\nRUN ssh-keygen -q -t rsa -b "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2048")]),s._v(" -f /etc/ssh/ssh_host_rsa_key -N "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("''")]),s._v("\nRUN ssh-keygen -q -t ecdsa -f /etc/ssh/ssh_host_ecdsa_key -N "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("''")]),s._v("\nRUN ssh-keygen -t dsa -f /etc/ssh/ssh_host_ed25519_key  -N "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("''")]),s._v("\n\nRUN "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sed")]),s._v(" -i "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"s/#UsePrivilegeSeparation.*/UsePrivilegeSeparation no/g"')]),s._v(" /etc/ssh/sshd_config\nRUN "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sed")]),s._v(" -i "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"s/UsePAM.*/UsePAM no/g"')]),s._v(" /etc/ssh/sshd_config\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 指定root密码")]),s._v("\nARG ROOTPWD\nRUN /bin/echo "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"'),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("${ROOTPWD}")]),s._v('"')]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("chpasswd\n\nEXPOSE "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("22")]),s._v("\n\nCMD /usr/sbin/sshd -D\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v('# CMD ["/usr/sbin/sshd", "-D"]')]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br")])])]),s._v(" "),a("ul",[a("li",[s._v("docker-compose.yml")])]),s._v(" "),a("CodeBlock",[a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("version: "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'3'")]),s._v("\nservices:\n  centos-ssh:\n    build:\n      context: "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(".")]),s._v("\n      dockerfile: ./Dockerfile\n      args:\n        ROOTPWD: root:admin\n    image: czh/centos-ssh\n    restart: always\n    container_name: centos-ssh\n    ports:\n      - "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'10010:22'")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br")])])]),s._v(" "),a("ul",[a("li",[s._v('docker-compose -f "docker-compose.yml" up -d --build')]),s._v(" "),a("li",[s._v("ssh root@127.0.0.1 -p 10020")])]),s._v(" "),a("h2",{attrs:{id:"yapi"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#yapi"}},[s._v("#")]),s._v(" YApi")]),s._v(" "),a("ul",[a("li",[s._v("YApi for Mac")])]),s._v(" "),a("CodeBlock",[a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("- docker run -d -p "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("27017")]),s._v(":27017 --name mymongo -v /Users/pc/srv/mongodb/db:/data/db  mongo:latest\n\n- "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" -g yapi-cli --registry https://registry.npm.taobao.org\n\n- yapi server\n\n- http://0.0.0.0:9090/\n\n- node vendors/server/app.js\n\n- http://127.0.0.1:3000\n\n- 账号名："),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"admin@admin.com"')]),s._v("，密码："),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"ymfe.org"')]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br")])])]),s._v(" "),a("h2",{attrs:{id:"nginx"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#nginx"}},[s._v("#")]),s._v(" nginx")]),s._v(" "),a("CodeBlock",[a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("docker run --name some-nginx -v E:"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("huashu"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("api911"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("gaiban"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("nginx.conf:/etc/nginx/nginx.conf:ro -v E:"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("huashu"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("api911"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("gaiban:/usr/share/nginx/html:ro -p "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("80")]),s._v(":80 -d  "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("4610")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])])]),s._v(" "),a("h2",{attrs:{id:"mongo"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#mongo"}},[s._v("#")]),s._v(" mongo")]),s._v(" "),a("CodeBlock",[a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# https://brickyang.github.io/2017/03/15/%E5%88%A9%E7%94%A8-Docker-%E8%BF%90%E8%A1%8C-MongoDB/")]),s._v("\n\ndocker pull mongo\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# docker run --name some-mongo -p 27017:27017  -d mongo:tag")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# docker run --name <YOUR-NAME> -p 27017:27017 -v /data/db:/data/db -d mongo:3.4 --auth")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# docker run -d -p 27017:27017 -v mongo_configdb:/data/configdb -v mongo_db:/data/db --name mongo mongo:latest")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# docker run -d -p 27017:27017 -v ${PWD}/data:/data/db --name mongo mongo:latest")]),s._v("\n\ndocker volume create my-mongo-db\ndocker volume create my-mongo-configdb\n\ndocker run -d -p "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("27017")]),s._v(":27017 --name mymongo -v my-mongo-db:/data/db  -v my-mongo-configdb:/data/configdb mongo:latest\n\ndocker "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("exec")]),s._v(" -it mymongo mongo\n\nuse admin\ndb.createUser"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("user: "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"root"')]),s._v(", pwd: "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"root"')]),s._v(", roles: "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("role: "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"userAdminAnyDatabase"')]),s._v(", db: "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"admin"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\ndb.auth"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'root'")]),s._v(","),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'root'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" // "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\n\nuse todos\ndb.createUser"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("user: "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"czh"')]),s._v(", pwd: "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"czh"')]),s._v(", roles: "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("role: "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"readWrite"')]),s._v(", db: "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"todos"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\ndb.auth"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'czh'")]),s._v(", "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'czh'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" // "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\n\nuse admin\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 删除czh用户")]),s._v("\ndb.dropUser"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'czh'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" // "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br")])])]),s._v(" "),a("h2",{attrs:{id:"mysql"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#mysql"}},[s._v("#")]),s._v(" mysql")]),s._v(" "),a("CodeBlock",[a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# mysql版本")]),s._v("\nmysql: "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 下载")]),s._v("\ndocker pull mysql\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 启动容器")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# docker run -p 3306:3306 --name mymysql -v $PWD/conf:/etc/mysql/conf.d -v $PWD/logs:/logs -v $PWD/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql:latest")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# docker run -p 3306:3306 --name mymysql -v $PWD/logs:/logs -v $PWD/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=admin -d mysql:latest")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# docker run -p 3306:3306 --name mymysql -v E:/mysql/logs:/logs -v E:mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=admin -d mysql:latest")]),s._v("\n\ndocker volume create my-vol-mysql\n\ndocker run -p "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("3306")]),s._v(":3306 --name mymysql -v my-vol-mysql:/var/lib/mysql -e "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("MYSQL_ROOT_PASSWORD")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("admin -d mysql:latest\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 进入容器")]),s._v("\ndocker "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("exec")]),s._v(" -it mymysql "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("bash")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 登录mysql")]),s._v("\nmysql -u root -p\n\nALTER "),a("span",{pre:!0,attrs:{class:"token environment constant"}},[s._v("USER")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'root'")]),s._v("@"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'localhost'")]),s._v(" IDENTIFIED BY "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'admin'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 添加远程登录用户")]),s._v("\nCREATE "),a("span",{pre:!0,attrs:{class:"token environment constant"}},[s._v("USER")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'czh'")]),s._v("@"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'%'")]),s._v(" IDENTIFIED WITH mysql_native_password BY "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'admin@!123'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\nGRANT ALL PRIVILEGES ON *.* TO "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'czh'")]),s._v("@"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'%'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 编码")]),s._v("\nhttps://blog.csdn.net/m0_37639542/article/details/72852875\nhttps://www.cnblogs.com/jiangxiaobo/p/6110647.html\n\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br"),a("span",{staticClass:"line-number"},[s._v("31")]),a("br"),a("span",{staticClass:"line-number"},[s._v("32")]),a("br"),a("span",{staticClass:"line-number"},[s._v("33")]),a("br"),a("span",{staticClass:"line-number"},[s._v("34")]),a("br")])])]),s._v(" "),a("h2",{attrs:{id:"redis"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#redis"}},[s._v("#")]),s._v(" redis")]),s._v(" "),a("CodeBlock",[a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("docker pull redis\n\ndocker volume create my-vol-redis\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# docker run -p 6379:6379 -v $PWD/data:/data  -d redis redis-server --appendonly yes")]),s._v("\ndocker run -p "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("6379")]),s._v(":6379 --name myredis  -v my-vol-redis:/data  -d redis redis-server --appendonly "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("yes")]),s._v("\n\ndocker "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("exec")]),s._v(" -it myredis redis-cli\n\ninfo\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br")])])]),s._v(" "),a("h2",{attrs:{id:"registry"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#registry"}},[s._v("#")]),s._v(" registry")]),s._v(" "),a("CodeBlock",[a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("\ndocker run -d -p "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("5000")]),s._v(":5000 --restart always -v /Users/pc/srv/registry:/var/lib/registry --name registry registry:2\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 用 curl 查看仓库中的镜像")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("curl")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("127.0")]),s._v(".0.1:5000/v2/_catalog\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# pull")]),s._v("\ndocker pull ubuntu\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# tag")]),s._v("\ndocker tag ubuntu localhost:5000/ubuntu\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# push")]),s._v("\ndocker push localhost:5000/ubuntu\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# rm image")]),s._v("\ndocker image "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("rm")]),s._v(" localhost:5000/ubuntu\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# pull")]),s._v("\ndocker pull localhost:5000/ubuntu\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# ip 推送")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"registry-mirror"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"https://registry.docker-cn.com"')]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(",\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"insecure-registries"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"192.168.199.100:5000"')]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# webui")]),s._v("\nhttps://github.com/mkuchin/docker-registry-web\nhttps://github.com/kwk/docker-registry-frontend\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br"),a("span",{staticClass:"line-number"},[s._v("31")]),a("br"),a("span",{staticClass:"line-number"},[s._v("32")]),a("br"),a("span",{staticClass:"line-number"},[s._v("33")]),a("br"),a("span",{staticClass:"line-number"},[s._v("34")]),a("br")])])])],1)}),[],!1,null,null,null);n.default=e.exports}}]);