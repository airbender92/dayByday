<!--
 * @Author: wangyunbo
 * @Date: 2022-01-13 08:55:16
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-01-13 08:55:18
 * @FilePath: \dayByday\git\vscode.md
 * @Description: file content
-->
vscode git"当前没有活动的源代码控制提供程序"

苏怡仙-Hart 2019-06-30 20:26:11  3637  收藏 7
版权
从git上新弄了代码，想改个分支发现左下角没有master，到source Control里提示“当前没有活动的源代码控制提供程序”。

网上查到解决办法：

在扩展中搜索“@builtin”，找到git，禁用再重新启用（注意禁用之后要重启vscode）



启用之后还是提示“找不到git”

file->preferences->settings->输入git.path->点击"edit in settings.json"





在json文件中添加以下代码：（后边为你的git.exe路径）
// where git 查找git地址
"git.path":"D:/install/Git/bin/git.exe"



重启vscode，成功。
————————————————
版权声明：本文为CSDN博主「苏怡仙-Hart」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/syx8821/article/details/94355947