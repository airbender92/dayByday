/*
 * @Author: wangyunbo
 * @Date: 2021-06-04 09:27:13
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-09 18:57:23
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

// =================== Passing arguments to a class decorator =====================
// We can wrap a class decorator with another function to allow customization
function addMetadata2(metadata: any) {
  return function log(target: any) {
    // add metadata
    target.__customMetadata = metadata;

    // return target
    return target
  }
}
/**
 * The addMetadata takes some arguments used as configuration and then returns an unnamed function which is the
actual decorator. In the decorator we can access the arguments because there is a closure in place.
 */
@addMetadata2({guid: '427c6ec7'})
class Person3 {
  private _name: string;
  public constructor(name: string) {
    this._name = name;
  }
  public greet() {
    return this._name
  }
}

// We can use the following function to access the generated metadata:
function getMetadataFromClass2(target: any) {
  return target.__customMetadata;
}
console.log(getMetadataFromClass2(Person3))

// ======================Basic class decorator============================
// A class decorator is just a function that takes the class as its only argument and returns it after doing something
// with it:

function log2<T>(target: T) {
  // do something with target
  console.log(target)

  // return target
  return target;
}
// We can then apply the class decorator to a class
@log2
class Person4 {
  private _name: string;
  public constructor(name: string) {
    this._name = name;
  }
  public greet() {
    return this._name;
  }
}
