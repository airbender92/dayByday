/*
 * @Author: wangyunbo
 * @Date: 2021-06-16 16:22:25
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-16 16:23:17
 * @Description: file content
 * @FilePath: \dayByday\eslint\.eslintrc.js
 */
// Expected linebreaks to be 'LF' but found 'CRLF' linebreak-style
rules: {
        'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
 }
module.exports = {
  "rules": {
    "no-unused-vars": "off"
  }
}