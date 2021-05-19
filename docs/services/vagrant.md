---
title: vagrant虚拟机的使用
date: 2020-07-21
sidebar: "auto"
tags:
  - vagrant
categories:
  - services
---

- [vagrant](https://www.vagrantup.com/)
- [app.vagrantup](https://app.vagrantup.com/boxes/search)
- [rubygems](https://rubygems.org/)
- [virtualbox](https://www.virtualbox.org/)

## command

| Tables                | Are                                                      |
| --------------------- | :------------------------------------------------------- |
| vagrant init          | 初始化 box 的操作，会生成 vagrant 的配置文件 Vagrantfile |
| vagrant up            | 启动本地环境                                             |
| vagrant ssh           | 通过 ssh 登录本地环境所在虚拟机                          |
| vagrant halt          | 关闭本地环境                                             |
| vagrant suspend       | 暂停本地环境                                             |
| vagrant resume        | 恢复本地环境                                             |
| vagrant reload        | 修改了 Vagrantfile 后，使之生效（相当于先 halt，再 up）  |
| vagrant destroy       | 彻底移除本地环境                                         |
| vagrant box list      | 显示当前已经添加的 box 列表                              |
| vagrant box add       | 添加 box 到列表                                          |
| vagrant box remove    | 删除相应的 box                                           |
| vagrant package       | 打包命令，可以把当前的运行的虚拟机环境进行打包           |
| vagrant plugin        | 用于安装卸载插件                                         |
| vagrant status        | 获取当前虚拟机的状态                                     |
| vagrant global-status | 显示当前用户 Vagrant 的所有环境状态                      |

## vagrant 添加无版本号的 box

- `vagrant box add centos/7`

```bash
centos/7 # 表示 centos系统 和 centos的版本号7
```

- `vagrant box add boxName ./downloadBoxName.box`

```bash
boxName # 添加之后的box 名称
./downloadBoxName.box # 下载到本地的box
```

## [vagrant 添加带版本号的 box](https://segmentfault.com/a/1190000016657185)

- 创建：`metadata.json`

  - `name`：添加的 box 名字
  - `version`：版本号
  - `providers.name`：虚拟主机类型
  - `providers.url`：box 地址

```json
{
  "name": "centos/7",
  "versions": [
    {
      "version": "1809.01",
      "providers": [
        {
          "name": "virtualbox",
          "url": "./virtualbox.box"
        }
      ]
    }
  ]
}
```

- 运行创建: `vagrant box add metadata.json`

## SSH 登录 linux

```bash
ssh: 127.0.0.1
端口: 2222
用户名: vagrant
密码: vagrant
```

## vagrant init

- 初始化项目：`vagrant init centos/7`



```ruby
# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://vagrantcloud.com/search.
  config.vm.box = "centos/7"

  # Disable automatic box update checking. If you disable this, then
  # boxes will only be checked for updates when the user runs
  # `vagrant box outdated`. This is not recommended.
  config.vm.box_check_update = false
  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  # NOTE: This will enable public access to the opened port
  # config.vm.network "forwarded_port", guest: 80, host: 8080

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine and only allow access
  # via 127.0.0.1 to disable public access
  # config.vm.network "forwarded_port", guest: 80, host: 8080, host_ip: "127.0.0.1"

  # set auto_update to false, if you do NOT want to check the correct
  # additions version when booting this machine
  # cmd: vagrant vbguest --status
  config.vbguest.auto_update = false
  # do NOT download the iso file from a webserver
  config.vbguest.no_remote = true

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  config.vm.network "private_network", ip: "192.168.33.10"

  # Create a public network, which generally matched to bridged network.
  # Bridged networks make the machine appear as another physical device on
  # your network.
  # config.vm.network "public_network"

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  config.vm.synced_folder "E:/boxs/centos7/data", "/vagrant_data",
    create: true, owner: "root", group: "root"
  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:
  #
  # config.vm.provider "virtualbox" do |vb|
  #   # Display the VirtualBox GUI when booting the machine
  #   vb.gui = true
  #
  #   # Customize the amount of memory on the VM:
  #   vb.memory = "1024"
  # end
  #
  # View the documentation for the provider you are using for more
  # information on available options.

  # Enable provisioning with a shell script. Additional provisioners such as
  # Puppet, Chef, Ansible, Salt, and Docker are also available. Please see the
  # documentation for more information about their specific syntax and use.
  # config.vm.provision "shell", inline: <<-SHELL
  #   apt-get update
  #   apt-get install -y apache2
  # SHELL
end
```



## plugin

- 列出插件: `vagrant plugin list`
- 安装: `vagrant plugin install`

```bash
# Installing a plugin from a known gem source
  vagrant plugin install my-plugin

# Installing a plugin from a local file source
  vagrant plugin install /path/to/my-plugin.gem
```

- 更新: `vagrant plugin update [my-plugin]`

- 卸载: `vagrant plugin uninstall my-plugin`

- Vagrantfile

```ruby
Vagrant.config(2) do |config|
    config.vm.box = "centos/7"

    config.vm.define "node1" do |node1|
        node1.vm.network "private_network", ip: "192.168.33.11"
        node1.vm.hostname = "node1"
    end

    config.vm.define "node2" do |node2|
        node2.vm.network "private_network", ip: "192.168.33.22"
        node2.vm.hostname = "node2"
    end

    config.vm.define "node3" do |node3|
        node3.vm.network "private_network", ip: "192.168.33.33"
        node3.vm.hostname = "node3"
    end

end
```

### [vagrant-vbguest](https://rubygems.org/search?utf8=%E2%9C%93&query=vbguest)

- `vagrant plugin install vagrant-vbguest`
- `vagrant vbguest --status`
- `vagrant vbguest --do install node1`

```ruby
Vagrant.config(2) do |config|
    config.vm.box = "centos/7"

    # 不想自动更新
    config.vbguest.auto_update = false

    config.vm.define "node1" do |node1|
        node1.vm.network "private_network", ip: "192.168.33.11"
        node1.vm.hostname = "node1"
    end

    config.vm.define "node2" do |node2|
        node2.vm.network "private_network", ip: "192.168.33.22"
        node2.vm.hostname = "node2"
    end

    config.vm.define "node3" do |node3|
        node3.vm.network "private_network", ip: "192.168.33.33"
        node3.vm.hostname = "node3"
    end

end
```

### [vagrant-hostmanager](https://rubygems.org/gems/vagrant-hostmanager)

- `vagrant plugin install vagrant-hostmanager`
- `vagrant hostmanager`

```ruby
Vagrant.config(2) do |config|
    config.vm.box = "centos/7"

    config.hostmanager.enabled = true
    config.hostmanager.manage_guest = true
    config.hostmanager.manage_host = true

    # 不想自动更新
    config.vbguest.auto_update = false

    config.vm.define "node1" do |node1|
        node1.vm.network "private_network", ip: "192.168.33.11"
        node1.vm.hostname = "node1"
    end

    config.vm.define "node2" do |node2|
        node2.vm.network "private_network", ip: "192.168.33.22"
        node2.vm.hostname = "node2"
    end

    config.vm.define "node3" do |node3|
        node3.vm.network "private_network", ip: "192.168.33.33"
        node3.vm.hostname = "node3"
    end

end
```

### [vagrant-bindfs](https://rubygems.org/gems/vagrant-bindfs)

- `vagrant plugin install vagrant-bindfs`



```ruby
Vagrant.config(2) do |config|
    config.vm.box = "centos/7"

    config.hostmanager.enabled = true
    config.hostmanager.manage_guest = true
    config.hostmanager.manage_host = true

    # 不想自动更新
    config.vbguest.auto_update = false

    config.vm.define "node1" do |node1|
        # set linux private network
        node1.vm.network "private_network", ip: "192.168.33.11"
        # set linux hostname
        node1.vm.hostname="node1"
        # set sync folder
        node1.vm.synced_folder "./app", "/mnt/app-data", type: "nfs"
        # use bindfs
        node1.bindfs.bind_folder "/mnt/app-data", "/app",
            # add roles
            force_user: 'root', force_group: 'root', o: "nonempty"
    end

    config.vm.define "node2" do |node2|
        node2.vm.network "private_network", ip: "192.168.33.22"
        node2.vm.hostname = "node2"
    end

    config.vm.define "node3" do |node3|
        node3.vm.network "private_network", ip: "192.168.33.33"
        node3.vm.hostname = "node3"
    end

end
```



## packge

```ruby
# nginx： sudo rm -rf /etc/udev/rules.d/70-persistent-net.rules

# 打包
vagrant package
```

## multi Machine

- 初始化: `vagrant init centos/7`

- Vagrantfile



```ruby
Vagrant.configure("2") do |config|
  # use centos/7 box
  config.vm.box = "centos/7"

  config.vm.box_check_update = false

  config.vbguest.auto_update = false
  config.vbguest.no_remote = true

  config.vm.provision "shell", inline: "echo Hello"



  # define: host is web , params is web
  config.vm.define "web" do |web|
    # config
    web.vm.network "private_network", ip: "192.168.33.10"
    web.vm.hostname = "nginx"
    web.vm.synced_folder "./web", "/web"
  end

  config.vm.define "db" do |db|
    # config
    db.vm.network "private_network", ip: "192.168.33.11"
    db.vm.hostname = "mysql"
    db.vm.synced_folder "./db", "/db"
  end

end
```



- ssh

```bash
vagrant up # 启动主机
vagrant status # 查看状态
vagrant ssh web # ssh连接web主机
```

## 参考资料

- [使用 Vagrant 打造跨平台开发环境](https://segmentfault.com/a/1190000000264347)
