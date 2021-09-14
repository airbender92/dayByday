<!--
 * @Author: wangyunbo
 * @Date: 2021-09-10 19:01:16
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-09-10 19:01:17
 * @FilePath: \dayByday\git\ignore.md
 * @Description: file content
-->
#注释           .gitignore的注释
*.txt           忽略所有 .txt 后缀的文件
!src.a          忽略除 src.a 外的其他文件
/todo           仅忽略项目根目录下的 todo 文件，不包括 src/todo
build/          忽略 build/目录下的所有文件，过滤整个build文件夹；
doc/*.txt       忽略doc目录下所有 .txt 后缀的文件，但不包括doc子目录的 .txt 的文件
 
bin/:           忽略当前路径下的 bin 文件夹，该文件夹下的所有内容都会被忽略，不忽略 bin 文件
/bin:           忽略根目录下的 bin 文件
/*.c:           忽略 cat.c，不忽略 build/cat.c
debug/*.obj:    忽略debug/io.obj，不忽略 debug/common/io.obj和tools/debug/io.obj
**/foo:         忽略/foo, a/foo, a/b/foo等
a/**/b:         忽略a/b, a/x/b, a/x/y/b等
!/bin/run.sh    不忽略bin目录下的run.sh文件
*.log:          忽略所有 .log 文件
config.js:      忽略当前路径的 config.js 文件
 
/mtk/           忽略整个文件夹
*.zip           忽略所有.zip文件
/mtk/do.c       忽略某个具体文件