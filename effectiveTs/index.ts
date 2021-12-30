/*
 * @Author: wangyunbo
 * @Date: 2021-12-30 16:49:22
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-12-30 17:10:10
 * @FilePath: \dayByday\effectiveTs\index.ts
 * @Description: file content
 */
let person = { first: 'F', last: 'L' };
let person2: any = { first: 'F', last: 'L' };

let age: number;
age = '12' as any;

age += 1;
console.log(age);

export type PP = {
  name233: string
}

export interface Person {
  firstName: string;
  last: string;
}
const formatName = (p: Person) => `${p.firstName} ${p.last}`;
const formatNameAny = (p: any) => `${p.first} ${p.last}`;