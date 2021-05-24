/*
 * @Author: wangyunbo
 * @Date: 2021-05-24 09:04:39
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-05-24 09:36:23
 * @Description: file content
 * @FilePath: \dayByday\typescript\index.ts
 */
/**
  // 全局安装 typescript
  npm install -g typescript
 */

/**
 * // 生成 tsconfig.json 文件
 * tsc --init
 */

/**
 * // ts文件编译
 * tsc my-code.ts
 */

/**
 * // ts basic types:
 * number
 * string
 * boolean
 * Array
 * Array<T> and T[]
 * // example:
 * number[] - array of strings
 * Array<string> - array of strings
 * Tuples - tuples have a fixed number of elements with specific types.
 * // example: 
 * [boolean, string] - tuple where the first element is a boolean and the second is a string.
 * {} - object,
 * {name: string, age: number} - object with name and age attributes
 * {[key: string]: number} - a dictionary of numbers indexed by string
 * { [key: string]: boolean}
 * // This is a key/value structure. The key is a string and the value is a boolean. For example:
 *  let map : { [key: string]: boolean} = {};
    map["foo"] = true;
    map["bar"] = false;
    map.foo = true;
    map["foobar"] = "foo"; // Throws exception
    map[1] = true; // Curiously doesn't throws exception
 * 
 */