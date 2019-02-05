# manjaro

## 安装

- [manjaro官网](https://manjaro.org/)
- [中科大镜像](https://mirrors.ustc.edu.cn/)
- [清华大学开源软件镜像站](https://mirrors.tuna.tsinghua.edu.cn/)

## manjaro命令

```bash
pacman -S   # 安装
pacman -R   # 删除
pacman -Rs  # 移除已安装不需要软件包
pacman -Rsc # 删除一个包,所有依赖
pacman -Syu # 升级包
pacman -Ss  # 查询包数据库
pacman -Qs  # 搜索以安装的包
pacman -Si  # 显示包大量信息
pacman -Qi  # 本地安装包
pacman -Sc  # 清理包缓存
pacman -Syyu  # 更新系统
```

## Manjaro 配置

- 配置中国的mirrors `sudo pacman-mirrors -i -c China -m rank`
- 安装gedit`sudo pacman -S gedit`
- 在 `/etc/pacman.conf`中添加`archlinuxcn`源 `sudo gedit /etc/pacman.conf`

```bash
[archlinuxcn]
SigLevel = Optional TrustedOnly
Server = https://mirrors.ustc.edu.cn/archlinuxcn/$arch
[arch4edu]
SigLevel = Never
Server = http://mirrors.tuna.tsinghua.edu.cn/arch4edu/$arch
```

- 更新源列表 `sudo pacman -Syyu`
- 安装yaourt,使用AUR源里的软件 `sudo pacman -S yaourt pacaur`
- 修改配置文件后，执行命令`sudo pacman -Syy && sudo pacman -S archlinuxcn-keyring`
- 将本地数据包与远程数据包同步 `sudo pacman -Syy`
- 安装vim `sudo pacman -S vim`
- 安装git`sudo pacman -S git`
- 安装ZSH `sudo pacman -S zsh`
- 配置oh-my-zsh `sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"`
- 更换默认的shell `chsh -s /bin/zsh`
- 安装搜狗输入法

```bash
sudo pacman -S fcitx-sogoupinyin
sudo pacman -S fcitx-im         # 全部安装
sudo pacman -S fcitx-configtool # 图形化配置工具
```

- 设置中文输入法环境变量，编辑`~/.xprofile`文件，增加下面几行(如果文件不存在，则新建)

```bash
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS="@im=fcitx"
```

## 常用软件安装

- 谷歌浏览器 (`sudo pacman -S chromium`)
- 网易云音乐 (`sudo pacman -S netease-cloud-music`)
- wine (`pacman -S wine`)

## 参考源

- [Manjaro安装以及美化教程](https://juejin.im/post/5a6b1b3651882573443cea61)
