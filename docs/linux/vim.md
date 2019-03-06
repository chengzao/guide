# vim

## vim模式

- 使用vi编辑器:vi编辑器提供了3种模式: 分别是命令模式、插入模式、底行模式

## 命令模式

```bash
vi 文件路径
- vim +  /home/xyz/test.txt  //打开文件后定位到最后一行
- vim +5 /home/xyz/test.txt //打开文件后定位到第5行

```

## 底行模式

```bash
- :w      --> 保存，:w filenme另存为
- :q      --> 退出
- :wq     --> 保存并退出
- :e!     --> 撤销更改，返回到上一次保存的状态
- :q!     --> 不保存强制退出
- :set nu --> 设置行号
- /aaa    --> 在该文件中查找aaa
- :noh    --> 去掉高亮
- :3      --> 定位到第3行
```

## 命令

```bash
- i进入编辑模式，当前光标处插入
- ZZ（大写）保存并退出
- u辙销操作，可多次使用
- dd删除当前行
- yy复制当前行
- p 粘贴内容
- n
- N
- I，在当前 行首 插入
- A，在当前 行尾 插入
- i，在当前字符的 左边 插入
- a，在当前字符的 右边 插入
- o，在当前行 下面 插入一个新行
- O，在当前行 上面 插入一个新行
- j，下
- k，上
- h，左
- l，右
- v，按 v 之后按方向键可以选中你要选中的文字
- gg，跳到第 1 行
- G，跳到第最后行
- 16G 或 :16，跳到第 16 行
- $，到本行 行尾
- 0，到本行 行头
- w，到下一个单词的 开头
- e，到下一个单词的 结尾
- Ctrl + u，向文件 首翻 半屏
- Ctrl + d，向文件 尾翻 半屏
- Ctrl + f，向文件 尾翻 一屏
- Ctrl + b，向文件 首翻 一屏
```

## vim 安装与配置

```bash
- cd ~
- touch .vimrc
- vim .vimrc

- set nu         // 这是设置显示行号
- set showmode   //设置在命令行界面最下面显示当前模式等。
- set ruler     // 在右下角显示光标所在的行数等信息
- //设置每次单击Enter键后，光标移动到下一行时与上一行的起始字符对齐
- set autoindent
- // 即设置语法检测，当编辑C或者Shell脚本时，关键字会用特殊颜色显示
- syntax on
- hi MatchParen ctermbg=blue ctermfg=white   // 匹配的括号颜色修改
```

## vim plugin

- [vundle插件管理工具](https://github.com/VundleVim/Vundle.vim)
- [vim-plug插件管理工具](https://github.com/junegunn/vim-plug)
- [vim-scripts](http://vim-scripts.org/vim/scripts.html)

## 参考链接

- [vim](https://github.com/judasn/Linux-Tutorial/)
- [Vim YouCompleteMe](https://www.jianshu.com/p/d908ce81017a)
- [利用vundle工具来管理vim插件](https://www.cnblogs.com/aaronLinux/p/6798898.html)
- [spaceVim](https://github.com/SpaceVim/SpaceVim)
