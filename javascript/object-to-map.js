/*
 * @Author: wangyunbo
 * @Date: 2021-11-17 15:49:20
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-11-17 15:49:20
 * @FilePath: \dayByday\javascript\object-to-map.js
 * @Description: file content
 */
//Object.entries is a new Object static method available in ES2017 (19.1.2.5).

const map = new Map(Object.entries({foo: 'bar'}));

map.get('foo'); // 'bar'