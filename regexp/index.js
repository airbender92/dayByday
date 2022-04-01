/*
 * @Author: wangyunbo
 * @Date: 2021-05-31 10:18:58
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-08-31 11:08:04
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

//////////////////////////////////////////////////////////////////////////////////
/^([1-9]\d*(\.\d*[1-9][0-9])?)|(0\.\d*[1-9][0-9])|(0\.\d*[1-9])$/
解析： 
/
^ //匹配开头
[1-9] //表示第一个数为1~9中的任意一个（不能为0开头，0开头的在后半部分）：匹配1~9
\d*  //表示0-9的任意一个数字，可以为多位数 ：匹配除开头数字外的整数部分
(\.\d*)? //表示跟小数点，以及任意数字：匹配小数点，以及小数点后面可以为任意数
| //表示选择，即“或”，第二种可能
0\.\d*[1-9][0-9] //表示以0开头，后面接小数点，小数点后面第一位数在1~9之间，第二位数可以在0~9之间
| //表示选择，即“或”，第三种可能
0\.\d*[1-9] 表示以0开头，后面接小数点，小数点后面只有一位不为0的数
$ //匹配结尾
/
////////////////////////////////////////////////////////////////////////////////////////////

正则表达式[\w]+,\w+,[\w+] 三者有何区别：
[\w]+和\w+没有区别，都是匹配数字和字母下划线的多个字符；
[\w+]表示匹配数字、字母、下划线和加号本身字符；

[]

表示数组而非排列，即不按固定次序位置排列；
在[]内的字符可以任意次序出现。

[ABC]+ 
可以匹配"AAABBBCCC,BBBAAACCC,BACCBACAACBAC,..."，不是一定按固定A....B....C...的次序排列。

[\w./-+]+
是匹配\w [0-9a-zA-Z_] 或 . 或 / 或 - 或 + 字符；

在[./-+]内均表示字符本身；

在[]+外表示{1,}至少1次或多次；

在[.]内点，不是任意字符的意思，就是匹配点.字符本身，点.可以不需要加反斜杠\.。

在[]内特殊字符，表示匹配特殊字符本身，不需要加反斜杠，

在[]外特殊字符，表示匹配特殊字符本身，必须要加反斜杠。