/*
 * @Author: wangyunbo
 * @Date: 2021-06-15 08:52:48
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-16 08:50:34
 * @Description: file content
 * @FilePath: \dayByday\typescript\user-defined-type.ts
 */

function functionName(variableName: any): variableName is DesiredType {
  // body that returns boolean
}

function isString(test: any): test is string {
  return typeof test === 'string';
}

function example(foo: any) {
  if(isString(foo)) {
    // foo is type as a string in this block
    console.log("it's a string: ", foo);
  } else {
    // foo is type any in this block
    console.log("dont know what this is !", foo)
  }
}

example("Hello world"); // // prints "it's a string: hello world"

example({ something: 'else' }) // prints "don't know what this is! [[object Object]]"

/**
 A guard's function type predicate (the `foo is Bar` in the function return type position) is used at compile time to
narrow types, the function body is used at runtime. The type predicate and function must agree, or your code won't
work.
 */

function isJQuery(foo): foo is JQuery {
  // test for jQuery's version string
  return foo.jquery !== undefined
}
// Type guard functions don't have to use typeof or instanceof, they can use more complicated logic.
// For example, this code determines if you've got a jQuery object by checking for its version string.

function example1(foo) {
  if(isJQuery(foo)) {
    // foo is typed JQuery here
    foo.eq(0);
  }
}

// ==============using instanceof=====================
// instanceof requires that the variable is of type any.
class Pet{}
class Dog extends Pet {
  bark() {
    console.log('woof')
  }
}
class Cat extends Pet {
  purr() {
    console.log('meow')
  }
}

function example2(foo: any) {
  if(foo instanceof Dog) {
    // foo is type Dog in this block
    foo.bark()
  }
  if(foo instanceof Cat) {
    // foo is type Cat in this block
    foo.purr()
  }
}

example2(new Dog());
example2(new Cat())

// =============using typeof ======================
/**
 typeof is used when you need to distinguish between types number, string, boolean, and symbol. Other string
constants will not error, but won't be used to narrow types either.
 */
/**
 Unlike instanceof, typeof will work with a variable of any type.
  In the example below, foo could be typed as number | string without issue
 */
function example3(foo: any) {
  if(typeof foo === 'number') {
    // foo is type number in this block
    console.log(foo + 100)
  }
  if(typeof foo === 'string') {
    // foo is type string in this block
    console.log("not a number: " + foo)
  }
}

example3(23)
example3('12')