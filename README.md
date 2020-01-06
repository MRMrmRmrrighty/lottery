## lottery年会抽奖程序

很简单的一套抽奖程序，公司设计师在设计时用的更多的是国风的元素，还是比较美观的

调用库： js:jquery css:animation

文件结构：

\index.html 抽奖主界面

\js\index.js JS主程序

\js\lib\jquery-1.12.4.min.js jQuery文件

\js\lib\common.js 一些公用函数

\css\animate.css css3 animation库

\css\style.less 样式Less文件

\css\widget*.less style.less引用的less文件

\css\img\ 页面上所用到的图标文件

## 建议
建议开启webstorm的file watcher 监听下less文件，直接修改style.less即可

## 相关链接
lottery是基于gavinjzx的 https://github.com/gavinjzx/luckyDraw 改造而来
抽奖逻辑基本不变，更多的改变了UI

## 适配
目前没去做更多的适配:PC端web 1920*1080体验最佳
