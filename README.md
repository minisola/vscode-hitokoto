# hitokoto

> [一言网](https://hitokoto.cn?_blank)(Hitokoto.cn)创立于2016年，隶属于萌创Team，目前网站主要提供一句话服务。

此插件为Hitokoto的**非官方**插件,提供vscode中一言的功能

[github](https://github.com/minisola/vscode-hitokoto)


## 使用

* 启动vscode,以及每间隔一段时间,状态栏会显示一言,点击状态栏可以打开浏览器进入一言网对应的条目
* 间隔时间可在设置中配置
* 通过 `F1` 或 `ctrl+shift+p` 输入 `hitokoto` 也可立即获取一条

### 状态栏显示方式
![sample](doc/sample.jpg)

### 弹窗显示方式

**此方式必须手动关闭,喂一碗强制鸡汤**

![sample](doc/sample2.jpg)

## 配置

* `hitokoto.api`
    hitokoto的接口地址, 可参考此页面:[https://hitokoto.cn/api](https://hitokoto.cn/api?_blank)

* `hitokoto.showType`
    hitokoto的展示方式,可选**状态栏**或**弹窗** (default:**状态栏**)

* `hitokoto.autoStart`
    是否启动时自动展示

* `hitokoto.intervalShow`
    是否间隔展示 (default:**true**)

* `hitokoto.intervalTime`
    间隔展示时间(单位:分钟) (default:**30**)

* `hitokoto.fontColor`
    字体颜色 (default:**#ffffff**)