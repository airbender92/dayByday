<!--
 * @Author: wangyunbo
 * @Date: 2021-11-01 13:17:45
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-11-01 13:20:06
 * @FilePath: \dayByday\git\changeCommit.md
 * @Description: file content
-->
How to Change a Git Commit Message

When working with Git, you might encounter a situation where you need to edit a commit message. There are many reasons you would want to make the change, such as fixing a typo, removing sensitive information, or adding additional information.

This guide explains how to change the message of the most recent or older Git commits.

Changing the Most Recent Commit
The git commit --amend command allows you to change the most recent commit message.

Not pushed commit
To change the message of the most recent commit that has not been pushed to the remote repository, commit it again using the --amend flag.

Navigate to the repository directory in your terminal.

Run the following command to amend (change) the message of the latest commit:
```js
git commit --amend -m "New commit message."
```
Copy
What the command does is overwriting the most recent commit with the new one.

The -m option allows you to write the new message on the command line without opening an editor session.

Before changing the commit message, you can also add other changes you previously forgot:
```js
git add .
git commit --amend -m "New commit message."
```
CopyCopy
Pushed commit
The amended (changed) commit is a new entity with a different SHA-1. The previous commit will no longer exist in the current branch.

Generally, you should avoid amending a commit that is already pushed as it may cause issues to people who based their work on this commit. It is a good idea to consult your fellow developers before changing a pushed commit.

If you changed the message of the most recently pushed commit, you would have to force push it.

Navigate to the repository.

Amend the message of the latest pushed commit:
```js
git commit --amend -m "New commit message."
```
Copy
Force push to update the history of the remote repository:
```js
git push --force <remoteName> <branchName>
```
Copy
Changing an Older or Multiple Commits
If you need to change the message of an older or multiple commits, you can use an interactive git rebase to change one or more older commits.

The rebase command rewrites the commit history, and it is strongly discouraged to rebase commits that are already pushed to the remote Git repository .

Navigate to the repository containing the commit message you want to change.

Type git rebase -i HEAD~N, where N is the number of commits to perform a rebase on. For example, if you want to change the 4th and the 5th latest commits, you would type:
```js
git rebase -i HEAD~5
```
Copy
The command will display the latest X commits in your default text editor :

pick 43f8707f9 fix: update dependency json5 to ^2.1.1
pick cea1fb88a fix: update dependency verdaccio to ^4.3.3
pick aa540c364 fix: update dependency webpack-dev-server to ^3.8.2
pick c5e078656 chore: update dependency flow-bin to ^0.109.0
pick 11ce0ab34 fix: Fix spelling.

# Rebase 7e59e8ead..11ce0ab34 onto 7e59e8ead (5 commands)
Copy
Move to the lines of the commit message you want to change and replace pick with reword:

reword 43f8707f9 fix: update dependency json5 to ^2.1.1
reword cea1fb88a fix: update dependency verdaccio to ^4.3.3
pick aa540c364 fix: update dependency webpack-dev-server to ^3.8.2
pick c5e078656 chore: update dependency flow-bin to ^0.109.0
pick 11ce0ab34 fix: Fix spelling.

# Rebase 7e59e8ead..11ce0ab34 onto 7e59e8ead (5 commands)
Copy
Save the changes and close the editor.

For each chosen commit, a new text editor window will open. Change the commit message, save the file, and close the editor.

fix: update dependency json5 to ^2.1.1
Copy
Force push the changes to the remote repository:
```js
git push --force <remoteName> <branchName>
```
Copy
Conclusion
To change the most recent commit message, use the git commit --amend command. To change older or multiple commit messages, use git rebase -i HEAD~N.

Don’t amend pushed commits as it may potentially cause a lot of problems to your colleagues.