<!--
 * @Author: wangyunbo
 * @Date: 2021-07-20 14:43:42
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-07-20 14:44:43
 * @FilePath: \dayByday\git\readme.md
 * @Description: file content
-->
1. git config
Git config command is super helpful. Especially when you are using Git for the first time, or you have a new Git installation. This command will set up your identity - Name and Email address. And this information will be used with every commit.

Usage

$ git config --global user.name "Your name"  

$ git config --global user.email "Your email"

2. git version
As its name implies, it's just to check which version of Git you are using. At the moment, writing this guide, the latest version of Git for Windows is 2.31.1. It was released on 27th March 2021.

Usage  

$ git version


3. git init
This is probably the first command you use to start a new project in Git. This command will create a blank new repository, and then you can store your source code inside this repo.

Usage  

$ git init 

Or you can use the repository name with your git init command.

$ git init <your repository name>