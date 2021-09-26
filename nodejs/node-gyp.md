<!--
 * @Author: wangyunbo
 * @Date: 2021-09-26 11:04:14
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-09-26 11:04:51
 * @FilePath: \dayByday\nodejs\node-gyp.md
 * @Description: file content
-->
Node.js: Python not found exception due to node-sass and node-gyp ?????

so this happened to me on windows recently. I fix it by following the following steps using a PowerShell with admin privileges:

delete node_modulesfolder
running npm install --global windows-build-tools with administrative privilege. (in my case need restart - and restart without ask!!!)
reinstalling node modules or node-sass with npm install