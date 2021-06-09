/*
 * @Author: wangyunbo
 * @Date: 2021-06-04 09:27:13
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-09 09:05:46
 * @Description: file content
 * @FilePath: \dayByday\typescript\classDecorator.ts
 */
// ================== : Generating metadata using a class decorator ==========================
// This time we are going to declare a class decorator that will add some metadata to a class when we applied to it:
function addMetadata(target: any) {
  // add some metadata
  target.__customMetadata = {
    someKey: 'someValue'
  };
  // return target
  return target;
}

@addMetadata
class Person {
  private _name: string;
  public constructor(name: string) {
    this._name = name;
  }
  public greet() {
    return this._name;
  }
}

function getMetadataFromClass(target: any) {
  return target.__customMetadata;
}

console.log(getMetadataFromClass(Person))
/*
重要
The decorator is applied when the class is declared not when we create instances of the class. This means that the
metadata is shared across all the instances of a class:
*/

function getMetadataFromInstance(target: any) {
  return target.constructor.__customMetadata;
}

let person1 = new Person('John')
let person2 = new Person('Lisa')

console.log(getMetadataFromInstance(person1))
console.log(getMetadataFromInstance(person2))