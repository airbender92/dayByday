/*
 * @Author: wangyunbo
 * @Date: 2021-06-23 15:15:15
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-23 15:16:09
 * @Description: file content
 * @FilePath: \dayByday\npm\example\test-repos-library-node\index.js
 */
const { getRepos } = require('github-repos-search-test')
getRepos().then((repositories) => console.log(repositories))