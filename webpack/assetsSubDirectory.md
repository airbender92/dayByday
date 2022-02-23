<!--
 * @Author: wangyunbo
 * @Date: 2022-02-23 08:46:37
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-02-23 08:50:45
 * @FilePath: \dayByday\webpack\assetsSubDirectory.md
 * @Description: file content
-->
```js
vue-cli中理不清的assetsSubDirectory 和 assetsPublicPath

尤小左 lv-2
2018年10月31日 18:28 ·  阅读 18160
关注
背景
一般情况下，我们借用 vue-cli之力安装好所有依赖后，我们就可以愉快的板砖了。但是也经常会遇到一写问题，比如assetsSubDirectory 和 assetsPublicPath两个兄弟有时候把我搞得死去活来的，下午刚好有点空，我就去好好修理了他俩一会儿（其实是被修理）。经过无数次的，config/index.js 里面的 build配置，然后无数次的 npm run build ，鄙人得出了以下之间，如有异议，还请多多指教。

基本的意义
index: path.resolve(__dirname, '../dist/index.html'),
assetsRoot: path.resolve(__dirname, '../dist'),
assetsSubDirectory: 'static',
assetsPublicPath: './',
复制代码
index: 模板
assetRoot: 打包后文件要存放的路径
assetsSubDirectory: 除了 index.html 之外的静态资源要存放的路径，
assetsPublicPath: 代表打包后，index.html里面引用资源的的相对地址
经过无数次修改配置 和 build后的 见解
index: path.resolve(__dirname, '../dist/index.html'),// Paths
assetsRoot: path.resolve(__dirname, '../dist'),
assetsSubDirectory: './assets/',
assetsPublicPath: './hello/',

打包后为
<script type="text/javascript" src="./hello/assets/js/manifest.js"></script>
<script type="text/javascript" src="./hello/assets/js/vendor.js"></script>
<script type="text/javascript" src="./hello/assets/js/app.js"></script>
复制代码
以上的意义是

assetsRoot : 在当前目录的上一级 的 dist目录下输出资源文件
assetsSubDirectory: 把所有的静态资源打包到 dist下的 assets文件夹下
assetsPublicPath :代表生成的index.html文件，里面引入资源时，路径前面要加上 ./hello/,也就是assetsPublicPath的值 ``
由此可见 ，我们可以直接 设置 assetsPublicPath为绝对路径，比如自己的线上路径前缀， https://www.yourdomain.com/,则打包后的路径，全部会加上这个 前缀，如果配置package.json的一些参数，就可以放心的把自己html里面的内容复制出来，放在任何地方都可以用了（前提是资源要先上线哦）
```