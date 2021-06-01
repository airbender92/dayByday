<!--
 * @Author: wangyunbo
 * @Date: 2021-05-17 09:26:50
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-01 16:30:10
 * @Description: file content
 * @FilePath: \dayByday\git\index.md
-->
/*
 * @Author: wangyunbo
 * @Date: 2021-05-17 09:26:50
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-05-17 09:27:40
 * @Description: file content
 * @FilePath: \dayByday\git\index.js
 */

```javascript
 git pull --force  <远程主机名> <远程分支名>:<本地分支名>
 // git:pull --force 强制覆盖本地的分支
```

```javascript
// 从远端拉取指定分支
git checkout -b 本地分支名称 origin/远程分支名称
// 推送到指定分支
git push origin 本地分支:远端希望创建的分支
```
```javascript
Git克隆指定分支、指定目录
git clone -b 分之名 http的git地址

git clone -b 分之名 http的git地址 c:/User/zp/dev指定目录
```

```bat
git rm -r --cached --ignore-unmatch folder_name
--ignore-unmatch is important here, without that option git will exit with error on the first file not in the index.
```