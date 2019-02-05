# ubuntu

## 常用命令

- sudo apt-get -f install
- sudo apt-get vim*
- sudo apt-get install net-tools
- sudo apt-get update
- sudo apt-get upgrade
- sudo apt-get install unity-tweak-tool
- sudo dpkg --install atom-amd64.deb
- sudo apt autoremove     //删除为了满足其他软件包的依赖而安装的，但现在不再需要的软件包
- apt-get clean           // 删除包缓存中的所有包
- apt-get autoclean       //将已经删除了的软件包的deb安装文件从硬盘中删除掉
- apt-get remove 软件包名称    //删除已安装的软件包(保留配置文件)
- apt-get --purge remove 软件包名称		//删除已安装包(不保留配置文件)
- sudo passwd  //ubuntu默认安装后修改root密码

## 连接工具

- sudo apt-get install openssh-server
- xshell  --  putty -- winscp

## 删除基本不用的自带软件

- `sudo apt-get remove thunderbird totem rhythmbox empathy brasero simple-scan gnome-mahjongg aisleriot gnome-mines cheese transmission-common gnome-orca webbrowser-app gnome-sudoku  landscape-client-ui-install onboard deja-dup libreoffice-common unity-webapps-common gnomine printer-driver*`

## 安装chrome

```bash
- https://askubuntu.com/questions/510056/how-to-install-google-chrome
- wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
- sudo sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list
- sudo apt-get update
- sudo apt-get install google-chrome-stable
```

## 参考地址

- [apt-get指令的autoclean,clean,autoremove的区别](http://blog.csdn.net/flydream0/article/details/8620396)
- [ubuntu12.04destdrop删除不必要的软件](http://www.cnblogs.com/YangJieCheng/p/5931175.html)
