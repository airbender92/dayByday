<!--
 * @Author: wangyunbo
 * @Date: 2021-06-01 10:56:31
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-12-15 09:25:42
 * @Description: file content
 * @FilePath: \dayByday\npm\index.md
-->

[rewire 单元测试非导出包](https://www.npmjs.com/package/rewire)

------------------------------------

```js
npm install <name>@<version>
// e.g. to install version 4.11.1 of the package lodash
npm install lodash@4.11.1
```
```js
npm install <name>@<version range>
//  e.g. to install a version which matches "version >= 4.10.1" and "version < 4.11.1"
//  of the package lodash
npm install lodash@">=4.10.1 <4.11.1"

// If you want to install the latest version use:
npm install <name>@latest

```
```py
# packages distributed as a tarball
npm install <tarball file>
npm install <tarball url>
# packages available locally
npm install <local path>
# packages available as a git repository
npm install <git remote url>
# packages available on GitHub
npm install <username>/<repository>
# packages available as gist (need a package.json)
npm install gist:<gist-id>
# packages from a specific repository
npm install --registry=http://myreg.mycompany.com <package name
# packages from a related group of packages
# See npm scope
npm install @<scope>/<name>(@<version>)
# Scoping is useful for separating private packages hosted on private registry from
# public ones by setting registry for specific scope
npm config set @mycompany:registry http://myreg.mycompany.com
npm install @mycompany/<package name>
```

```js
// If you want to see a list of all the installed packages and their associated versions in the current workspace, use:
npm list
npm list <name>
// Adding an optional name argument can check the version of a specific package.
```

### NPM Behind A Proxy Server
- If your internet access is through a proxy server, you might need to modify npm install commands that access
remote repositories. npm uses a configuration file which can be updated via command line:
```bash
npm config set
```

You can locate your proxy settings from your browser's settings panel. Once you have obtained the proxy settings
(server URL, port, username and password); you need to configure your npm configurations as follows.
```bash
$ npm config set proxy http://<username>:<password>@<proxy-server-url>:<port>
$ npm config set https-proxy http://<username>:<password>@<proxy-server-url>:<port>
```

###  Uninstalling packages

npm config set registry http://128.196.0.xxx:9000/repository/npm-taobao/