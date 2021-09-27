<!--
 * @Author: wangyunbo
 * @Date: 2021-05-17 09:26:50
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-09-27 09:30:41
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

-------------------------------------------------------------------------------------------------------------------

1.git clone 不指定分支

 git clone  http://10.1.1.11/service/tmall-service.git

 
2.git clone 指定分支

 git clone -b dev_jk http://10.1.1.11/service/tmall-service.git
命令中：多了一个  -b dev-jk,这个dev_jk就是分支，http://10.1.1.11/service/tmall
-service.git为源码的仓库地址

--------------------------------------------------------------------------------------------------------------------

```

```bat
git rm -r --cached --ignore-unmatch folder_name
--ignore-unmatch is important here, without that option git will exit with error on the first file not in the index.
```

```js
远程分支版本回退的方法
如果你的错误提交已经推送到自己的远程分支了，那么就需要回滚远程分支了。
1.首先要回退本地分支：
git reflog
git reset --hard Obfafd

2.紧接着强制推送到远程分支：

git push -f origin master ## 这里假设只有一个master分支
注意：本地分支回滚后，版本将落后远程分支，必须使用强制推送覆盖远程分支，否则无法推送到远程分支
```


```js
// The -d option will delete the branch only if it has already been pushed and merged with the remote branch. 
// Use -D instead if you want to force the branch to be deleted, even if it hasn't been pushed or merged yet.
// delete branch locally
git branch -d localBranchName

// delete branch remotely
git push origin --delete remoteBranchName
```

- 查看git关联的文件路径
Whether dirName is a directory managed by git. you can use command `git ls-files`

```js
// First check whether you have fetched all branches or not by executing following command (检查拉取所有分支)
git fetch --all

//Check for existence of branch name in local
git branch -a

//Execute command to track remote branch and create one in local
git checkout -t origin/<Branch Name>

```