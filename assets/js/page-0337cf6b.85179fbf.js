(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{682:function(s,n,a){"use strict";a.r(n);var t=a(11),e=Object(t.a)({},(function(){var s=this,n=s.$createElement,a=s._self._c||n;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h2",{attrs:{id:"compose-命令说明"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#compose-命令说明"}},[s._v("#")]),s._v(" Compose 命令说明")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# https://docs.docker.com/compose/reference/overview/")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# https://yeasy.gitbooks.io/docker_practice/compose/commands.html")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker-compose")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("-f"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("arg"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v("."),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("options"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("COMMAND"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("ARGS"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v("."),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n选项：\n    -f, --file FILE 指定使用的 Compose 模板文件，默认为 docker-compose.yml，可以多次指定\n    -p, --project-name NAME 指定项目名称，默认将使用所在目录名称作为项目名\n    --x-networking 使用 Docker 的可拔插网络后端特性\n    --x-network-driver DRIVER 指定网络后端的驱动，默认为 bridge\n    --verbose 输出更多调试信息\n    -v, --version 打印版本并退出\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 列出 Compose 文件中包含的镜像")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker-compose")]),s._v(" images\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 进入指定的容器")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker-compose")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("exec")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 此命令将会停止 up 命令所启动的容器，并移除网络")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker-compose")]),s._v(" down\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 验证 Compose 文件格式是否正确，若正确则显示配置，若格式错误显示错误原因")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker-compose")]),s._v(" config\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 自动完成包括构建镜像，（重新）创建服务，启动服务")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker-compose")]),s._v(" up "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("options"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("SERVICE"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v("."),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n选项：\n  -d 在后台运行服务容器\n  --no-color 不使用颜色来区分不同的服务的控制台输出\n  --no-deps 不启动服务所链接的容器\n  --force-recreate 强制重新创建容器，不能与 --no-recreate 同时使用\n  --no-recreate 如果容器已经存在了，则不重新创建，不能与 --force-recreate 同时使用\n  --no-build 不自动构建缺失的服务镜像\n  -t, --timeout TIMEOUT 停止容器时候的超时（默认为 "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v(" 秒）\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 启动已经存在的服务容器")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker-compose")]),s._v(" start "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("SERVICE"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v("."),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 停止已经处于运行状态的容器，但不删除它。")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 通过 docker-compose start 可以再次启动这些容器")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker-compose")]),s._v(" stop "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("options"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("SERVICE"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v("."),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 通过发送 SIGKILL 信号来强制停止服务容器")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker-compose")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("kill")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("options"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("SERVICE"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v("."),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 例如: docker-compose kill -s SIGINT")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看服务容器的输出")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker-compose")]),s._v(" logs "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("options"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("SERVICE"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v("."),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 暂停一个服务容器")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker-compose")]),s._v(" pause "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("SERVICE"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v("."),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 恢复处于暂停状态中的服务")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker-compose")]),s._v(" unpause "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("SERVICE"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v("."),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 重启项目中的服务")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker-compose")]),s._v(" restart "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("options"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("SERVICE"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v("."),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n选项：\n    -t, --timeout TIMEOUT 指定重启前停止容器的超时（默认为 "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v(" 秒）\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 删除所有（停止状态的）服务容器。推荐先执行 docker-compose stop 命令来停止容器")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker-compose")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("rm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("options"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("SERVICE"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v("."),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n选项：\n    -f, --force 强制直接删除，包括非停止状态的容器。一般尽量不要使用该选项\n    -v 删除容器所挂载的数据卷\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 拉取服务依赖的镜像")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker-compose")]),s._v(" pull "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("options"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("SERVICE"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v("."),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n选项：\n    --ignore-pull-failures 忽略拉取镜像过程中的错误\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 推送服务依赖的镜像到 Docker 镜像仓库")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker-compose")]),s._v(" push\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 打印某个容器端口所映射的公共端口")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker-compose")]),s._v(" port "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("options"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" SERVICE PRIVATE_PORT\n选项：\n    --protocol"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("proto 指定端口协议，tcp（默认值）或者 udp。\n    --index"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("index 如果同一服务存在多个容器，指定命令对象容器的序号（默认为 "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("）\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 列出项目中目前的所有容器")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker-compose")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("ps")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("options"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("SERVICE"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v("."),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n选项：\n    -q 只打印容器的 ID 信息\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 在指定服务上执行一个命令")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker-compose")]),s._v(" run "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("options"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("-p PORT"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v("."),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("-e "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("KEY")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("VAL"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v("."),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" SERVICE "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("COMMAND"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("ARGS"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v("."),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 例如: docker-compose run ubuntu ping www.baidu.com")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 构建（重新构建）项目中的服务容器")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker-compose")]),s._v(" build "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("options"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("SERVICE"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v("."),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n选项包括：\n    --force-rm 删除构建过程中的临时容器\n    --no-cache 构建镜像过程中不使用 cache（这将加长构建过程）\n    --pull 始终尝试通过 pull 来获取更新版本的镜像\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看各个服务容器内运行的进程")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker-compose")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("top")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br"),a("span",{staticClass:"line-number"},[s._v("31")]),a("br"),a("span",{staticClass:"line-number"},[s._v("32")]),a("br"),a("span",{staticClass:"line-number"},[s._v("33")]),a("br"),a("span",{staticClass:"line-number"},[s._v("34")]),a("br"),a("span",{staticClass:"line-number"},[s._v("35")]),a("br"),a("span",{staticClass:"line-number"},[s._v("36")]),a("br"),a("span",{staticClass:"line-number"},[s._v("37")]),a("br"),a("span",{staticClass:"line-number"},[s._v("38")]),a("br"),a("span",{staticClass:"line-number"},[s._v("39")]),a("br"),a("span",{staticClass:"line-number"},[s._v("40")]),a("br"),a("span",{staticClass:"line-number"},[s._v("41")]),a("br"),a("span",{staticClass:"line-number"},[s._v("42")]),a("br"),a("span",{staticClass:"line-number"},[s._v("43")]),a("br"),a("span",{staticClass:"line-number"},[s._v("44")]),a("br"),a("span",{staticClass:"line-number"},[s._v("45")]),a("br"),a("span",{staticClass:"line-number"},[s._v("46")]),a("br"),a("span",{staticClass:"line-number"},[s._v("47")]),a("br"),a("span",{staticClass:"line-number"},[s._v("48")]),a("br"),a("span",{staticClass:"line-number"},[s._v("49")]),a("br"),a("span",{staticClass:"line-number"},[s._v("50")]),a("br"),a("span",{staticClass:"line-number"},[s._v("51")]),a("br"),a("span",{staticClass:"line-number"},[s._v("52")]),a("br"),a("span",{staticClass:"line-number"},[s._v("53")]),a("br"),a("span",{staticClass:"line-number"},[s._v("54")]),a("br"),a("span",{staticClass:"line-number"},[s._v("55")]),a("br"),a("span",{staticClass:"line-number"},[s._v("56")]),a("br"),a("span",{staticClass:"line-number"},[s._v("57")]),a("br"),a("span",{staticClass:"line-number"},[s._v("58")]),a("br"),a("span",{staticClass:"line-number"},[s._v("59")]),a("br"),a("span",{staticClass:"line-number"},[s._v("60")]),a("br"),a("span",{staticClass:"line-number"},[s._v("61")]),a("br"),a("span",{staticClass:"line-number"},[s._v("62")]),a("br"),a("span",{staticClass:"line-number"},[s._v("63")]),a("br"),a("span",{staticClass:"line-number"},[s._v("64")]),a("br"),a("span",{staticClass:"line-number"},[s._v("65")]),a("br"),a("span",{staticClass:"line-number"},[s._v("66")]),a("br"),a("span",{staticClass:"line-number"},[s._v("67")]),a("br"),a("span",{staticClass:"line-number"},[s._v("68")]),a("br"),a("span",{staticClass:"line-number"},[s._v("69")]),a("br"),a("span",{staticClass:"line-number"},[s._v("70")]),a("br"),a("span",{staticClass:"line-number"},[s._v("71")]),a("br"),a("span",{staticClass:"line-number"},[s._v("72")]),a("br"),a("span",{staticClass:"line-number"},[s._v("73")]),a("br"),a("span",{staticClass:"line-number"},[s._v("74")]),a("br"),a("span",{staticClass:"line-number"},[s._v("75")]),a("br"),a("span",{staticClass:"line-number"},[s._v("76")]),a("br"),a("span",{staticClass:"line-number"},[s._v("77")]),a("br"),a("span",{staticClass:"line-number"},[s._v("78")]),a("br"),a("span",{staticClass:"line-number"},[s._v("79")]),a("br"),a("span",{staticClass:"line-number"},[s._v("80")]),a("br"),a("span",{staticClass:"line-number"},[s._v("81")]),a("br"),a("span",{staticClass:"line-number"},[s._v("82")]),a("br"),a("span",{staticClass:"line-number"},[s._v("83")]),a("br"),a("span",{staticClass:"line-number"},[s._v("84")]),a("br"),a("span",{staticClass:"line-number"},[s._v("85")]),a("br"),a("span",{staticClass:"line-number"},[s._v("86")]),a("br"),a("span",{staticClass:"line-number"},[s._v("87")]),a("br"),a("span",{staticClass:"line-number"},[s._v("88")]),a("br"),a("span",{staticClass:"line-number"},[s._v("89")]),a("br"),a("span",{staticClass:"line-number"},[s._v("90")]),a("br"),a("span",{staticClass:"line-number"},[s._v("91")]),a("br"),a("span",{staticClass:"line-number"},[s._v("92")]),a("br"),a("span",{staticClass:"line-number"},[s._v("93")]),a("br"),a("span",{staticClass:"line-number"},[s._v("94")]),a("br"),a("span",{staticClass:"line-number"},[s._v("95")]),a("br"),a("span",{staticClass:"line-number"},[s._v("96")]),a("br"),a("span",{staticClass:"line-number"},[s._v("97")]),a("br"),a("span",{staticClass:"line-number"},[s._v("98")]),a("br")])]),a("h2",{attrs:{id:"compose-模板文件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#compose-模板文件"}},[s._v("#")]),s._v(" Compose 模板文件")]),s._v(" "),a("ul",[a("li",[s._v("默认的模板文件名称为 "),a("code",[s._v("docker-compose.yml")]),s._v("，格式为 YAML 格式")])]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# https://docs.docker.com/compose/compose-file/")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# https://yeasy.gitbooks.io/docker_practice/compose/compose_file.html")]),s._v("\n\nversion\nservices\nbuild\ncapadd, capdrop\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("command")]),s._v("\nconfigs\ncgroup_parent\ncontainer_name\ndeploy\ndevices\ndepends_on\ndns\ndns_search\ntmpfs\nenv_file\nenvironment\nexpose\nexternal_links\nextra_hosts\nhealthcheck\nimage\nlabels\nlinks "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# v3不建议使用")]),s._v("\nlogging\nnetwork_mode\nnetworks\npid\nports\nsecrets\nsecurity_opt\nstop_signal\nsysctls\nulimits\nvolumes\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 其它指令")]),s._v("\ndomainname, entrypoint, hostname, ipc, mac_address, privileged,\nread_only, shm_size, restart, stdin_open, tty, user, working_dir\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 读取变量")]),s._v("\nCompose 模板文件支持动态读取主机的系统环境变量和当前目录下的 .env 文件中的变量\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br"),a("span",{staticClass:"line-number"},[s._v("31")]),a("br"),a("span",{staticClass:"line-number"},[s._v("32")]),a("br"),a("span",{staticClass:"line-number"},[s._v("33")]),a("br"),a("span",{staticClass:"line-number"},[s._v("34")]),a("br"),a("span",{staticClass:"line-number"},[s._v("35")]),a("br"),a("span",{staticClass:"line-number"},[s._v("36")]),a("br"),a("span",{staticClass:"line-number"},[s._v("37")]),a("br"),a("span",{staticClass:"line-number"},[s._v("38")]),a("br"),a("span",{staticClass:"line-number"},[s._v("39")]),a("br"),a("span",{staticClass:"line-number"},[s._v("40")]),a("br"),a("span",{staticClass:"line-number"},[s._v("41")]),a("br"),a("span",{staticClass:"line-number"},[s._v("42")]),a("br"),a("span",{staticClass:"line-number"},[s._v("43")]),a("br"),a("span",{staticClass:"line-number"},[s._v("44")]),a("br")])]),a("h2",{attrs:{id:"参考示例"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参考示例"}},[s._v("#")]),s._v(" 参考示例")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("version: "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'2'")]),s._v("\n\nservices:\n  redis:\n    image: redis:latest\n    ports:\n      - "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"6379:6379"')]),s._v("\n    networks:\n      - lognet\n\n  app:\n    container_name: web-app\n    build:\n      context: "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(".")]),s._v("\n      dockerfile: Dockerfile\n    ports:\n      - "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"3000:3000"')]),s._v("\n    volumes:\n      - "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('".:/webapp"')]),s._v("\n    depends_on:\n      - redis\n    networks:\n      - lognet\n\nnetworks:\n  lognet:\n    driver: bridge\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br")])])])}),[],!1,null,null,null);n.default=e.exports}}]);