/*
 * @Author: wangyunbo
 * @Date: 2021-06-22 14:32:48
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-22 14:33:09
 * @Description: file content
 * @FilePath: \dayByday\typescript\keyof.ts
 */
// For any type T, keyof T is the union of known, public property names of T.
// example.
interface Person {
  age: number;
  name: string;
}

type PersonKeys = keyof Person; // "age" | "name"