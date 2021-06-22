/*
 * @Author: wangyunbo
 * @Date: 2021-06-22 14:12:08
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-22 14:12:08
 * @Description: file content
 * @FilePath: \dayByday\typescript\type.ts
 */
interface Animal {
  legs: number;
}

const cat: Animal = { legs: 4 };

export type feline = typeof cat;
feline will be the type Animal, and you can use it as a type wherever you like.

const someFunc = (cat: feline) => {
  doSomething();
};
export simply exports it from the file.It's the same as doing this:

type feline = typeof cat;

export {
  feline
};