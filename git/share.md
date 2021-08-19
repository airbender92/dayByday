<!--
 * @Author: wangyunbo
 * @Date: 2021-07-12 17:23:43
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-08-19 09:13:47
 * @Description: file content
 * @FilePath: \dayByday\git\share.md
-->
1。项目在test分支上改了以后，没有及时同步到develop分支上来，并且又在development分支上做了许多修改。导致后期代码合并出现大面积冲突。
建议及时将test分支的修改，同步到development分支上或者自己的分支上。
此处建议使用git rebase命令，或者cherrypick commit命令进行同步。
 

2。大家在merge线上分支时，一定要记得带上origin 如： mergre origin/development into myBranch。
   这样能有效避免代码被冲掉的问题

3。远程分支建议不要太多，太多了分支很不好管理。不要改一次就推一个分支到远端去

4。使用vscode的可发安装Git Graph插件，可视化分支线[图片] [图片] 

5. Vscode建议安装插件koroFileHeader，并进行配置。插件的说明页有介绍
在配置文件中添加内容
"fileheader.customMade": {        
        "Author": "lichen", // 原作者，使用你的名字
        "Date": "Do not edit", // 使用Do not edit会自动生成时间
        "LastEditors": "lichen", // 最后的修改者，也使用自己的名字
        "LastEditTime": "Do not edit", // 同上，不做修改
        "FilePath": "Do not edit", // 同上，不做修改，会自动生成当前文件所在目录
        "Description": "file content" // 不修改，生成以后，需要自己在注释里写一下文件的描述
},
 

使用文件头注释的好处在于
1. 修改别人的代码时，方便找到作者询问（zhao guo）

2. 方便查看修改时间，比git去翻阅history要方便得多

3. 文件的作用一目了然，接手者能够快速上手。前提是写了文件头的descripiton。
 
 

6. 强烈建议大家使用document this规范注释。

学习地址：https://www.html.cn/doc/jsdoc/

好处如下：

A.使用document this的注释可以在vscode的代码提示工具中显示api，就像typescript一样的提示效果[图片] 

B.可以自动生成api文档   参考：https://blog.csdn.net/u010065726/article/details/105051203

-------------------------------------------------
Git全局或者项目中将CRLF转为LF
作者：广树 | 时间：2019-4-12 15:14:32 | 分类 : Git

之前因为WINDOWS电脑和MAC电脑交互代码发生了CRLF和LF的问题。

于是就想办法在GIT中统一。


全局：

git config --global core.autocrlf false


项目中：

进入项目输入

git config --local core.autocrlf false
重新拉取下项目就会自动转为LF。

-------------------------------------------