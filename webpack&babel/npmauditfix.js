/*
 * @Author: wangyunbo
 * @Date: 2021-05-14 16:02:19
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-05-14 16:02:38
 * @Description: file content
 * @FilePath: \dayByday\webpack&babel\npmauditfix.js
 */
/*
From NPM's site on their audit command:

npm audit fix runs a full-fledged npm install under the hood

And it seems that an audit fix only does semvar-compatible upgrades by default. Listed earlier in the document:

Have audit fix install semver-major updates to toplevel dependencies, not just semver-compatible ones:

$ npm audit fix --force
As for the lock file, it is regenerated each time you run a command that changes package.json.
 There is more information about that in an answer here as well as in the official documentation.

*/