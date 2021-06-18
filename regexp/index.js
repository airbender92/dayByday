/*
 * @Author: wangyunbo
 * @Date: 2021-05-31 10:18:58
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-17 13:53:36
 * @Description: file content
 * @FilePath: \dayByday\regexp\index.js
 */

// ====================正则可视化================================
https://regexper.com/
// ====================正则可视化================================

/**
 The difference between ?= and ?! is that 
 the former requires the given expression to match and the latter requires it to not match.
  For example a(?=b) will match the "a" in "ab", 
  but not the "a" in "ac". Whereas a(?!b) will match the "a" in "ac", 
  but not the "a" in "ab".

The difference between ?: and ?= is that ?= excludes the expression from the entire match 
while ?: just doesn't create a capturing group. So for example a(?:b) will match the "ab" in "abc", 
while a(?=b) will only match the "a" in "abc". a(b) would match the "ab" in "abc" and create a capture containing the "b".
 */

/**
?:  is for non capturing group
?=  is for positive look ahead
?!  is for negative look ahead
?<= is for positive look behind
?<! is for negative look behind
 */

var str = '中国`你好`'
// \1是指代的第一个捕获的符号: `;
// [^] 匹配所有非
// *? 非贪婪的匹配
// '$2' 把匹配到的正则内容替换为第二个捕获的值
var b = str.replace(/(`)([^]*?)\1/g, '$2')
// output: b => '中国你好'