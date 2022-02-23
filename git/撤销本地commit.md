<!--
 * @Author: wangyunbo
 * @Date: 2022-02-23 08:56:56
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-02-23 08:59:27
 * @FilePath: \dayByday\git\撤销本地commit.md
 * @Description: file content
-->
## Undo a commit & redo
```js
$ git commit -m "Something terribly misguided" # (0: Your Accident)
$ git reset HEAD~                              # (1)
[ edit files as necessary ]                    # (2)
$ git add .                                    # (3)
$ git commit -c ORIG_HEAD                      # (4)
```
This command is responsible for the undo. It will undo your last commit while leaving your working tree (the state of your files on disk) untouched. You'll need to add them again before you can commit them again).

Make corrections to working tree files.

git add anything that you want to include in your new commit.

Commit the changes, reusing the old commit message. reset copied the old head to .git/ORIG_HEAD; commit with -c ORIG_HEAD will open an editor, which initially contains the log message from the old commit and allows you to edit it. If you do not need to edit the message, you could use the -C option.

Alternatively, to edit the previous commit (or just its commit message), `commit --amend` will add changes within the current index to the previous commit.

To remove (not revert) a commit that has been pushed to the server, rewriting history with git push origin master --force is necessary.