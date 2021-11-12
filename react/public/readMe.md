<!--
 * @Author: wangyunbo
 * @Date: 2021-11-05 10:32:51
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-11-05 10:32:51
 * @FilePath: \dayByday\react\public\readMe.md
 * @Description: file content
-->
如果将文件放入 public 文件夹，Webpack 将 不会 处理它。相反，它将被复制到构建文件夹中。要引用 public 文件夹中的资源，需要使用名为 PUBLIC_URL 的特殊变量。

在 index.html 中，你可以像这样使用它：

<link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
只有 %PUBLIC_URL% 前缀才能访问 public 文件夹中的文件。如果你需要使用 src 或 node_modules 中的文件，则必须将其复制到 public 文件夹，以显式指定将该文件作为构建的一部分的意图。