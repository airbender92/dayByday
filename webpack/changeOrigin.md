<!--
 * @Author: wangyunbo
 * @Date: 2022-02-23 09:04:51
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-02-23 09:06:08
 * @FilePath: \dayByday\webpack\changeOrigin.md
 * @Description: file content
-->
vue-cli3跨域配置之changeOrigin的默认值

Elina
发布于 2019-09-07
```js
    devServer:{
        contentBase: path.join(__dirname, 'dist'),
        hot: true,
        host: 'localhost',
        port: 8000,
        open: true, // 自动打开浏览器
        proxy: {
          '/api': {
            target: 'http://11.111.1.22:9711', // 接口的域名
            // secure: false,  // 如果是https接口，需要配置这个参数
            // changeOrigin: false,
            pathRewrite: {
              '^/api': ''
            }
          },
```
devServer中，proxy的changeOrigin是false：请求头中host仍然是浏览器发送过来的host；如果设置成true：发送请求头中host会设置成target。

在vue-cli3中，默认changeOrigin的值是true,意味着host设置成target，这与cue-cli2不一致，vue-cli2这个默认值是false。
如果是以上的配置，changeOrigin的值是true,target是host, request URL是http://11.111.1.22:9711

如果我们把// changeOrigin: false，这句注释去掉，host就是浏览器发送过来的host，也就是localhost:8000。