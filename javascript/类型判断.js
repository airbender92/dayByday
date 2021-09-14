/*
 * @Author: wangyunbo
 * @Date: 2021-09-14 14:13:58
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-09-14 14:14:18
 * @FilePath: \dayByday\javascript\类型判断.js
 * @Description: file content
 */
var types = {
   'get': function(prop) {
      return Object.prototype.toString.call(prop);
   },
   'null': '[object Null]',
   'object': '[object Object]',
   'array': '[object Array]',
   'string': '[object String]',
   'boolean': '[object Boolean]',
   'number': '[object Number]',
   'date': '[object Date]',
}

if(types.get(prop) == types.number) {

}