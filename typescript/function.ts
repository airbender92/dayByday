/*
 * @Author: wangyunbo
 * @Date: 2021-06-01 08:50:32
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-01 09:04:42
 * @Description: file content
 * @FilePath: \dayByday\typescript\function.ts
 */
/**
 * In TypeScript, every parameter is assumed to be required by the function. 
 * You can add a ? at the end of a parameter name to set it as optional.
 */
 function buildName(firstName: string, lastName?: string) {
  // ...
 }
 // Optional parameters must come after all non-optional parameters:
 function buildName(firstName?: string, lastName: string) // Invalid

 // ============ Function as a parameter========================
 // Suppose we want to receive a function as a parameter, we can do it like this:
 function foo(otherFunc: Function): void {
  ...
 }

 // If we want to receive a constructor as a parameter:
 function foo(constructorFunc: { new() }) {
   new constructorFunc();
 }

 function foo2(constructorWithParamsFunc: { new(num: number) }) {
   new constructorWithParamsFunc(1);
 }

 // Or to make it easier to read we can define an interface describing the constructor:

 interface IConstructor {
   new();
 }

 function foo3(constructorFunc: IConstructor) {
   new constructorFunc();
 }

 // Or with parameters:
 interface INumberConstructor {
  new(num: number);
 }
 function foo(contructorFunc: INumberConstructor) {
  new contructorFunc(1);
 }

 // Even with generics:
 interface ITConstructor<T, U> {
   new(item: T): U;
 }

 function foo4<T, U>(constructorFunc: ITConstructor<T, U>, item: T): U {
   return new constructorFunc(item);
 }

  // If we want to receive a simple function and not a constructor it's almost the same:
function foo5(func: { (): void }) {
  func();
}

function foo6(constructorWithParamsFunc: { (num: number): void }) {
  new constructorWithParamsFunc(1);
 }

 // Or to make it easier to read we can define an interface describing the function:
 interface IFunction {
  (): void;
 }
function foo7(func: IFunction) {
  func();
} 
// Or with parameters:
interface INumberFunction {
  (num: number): string;
 }
 function foo8(func: INumberFunction ) {
  func(1);
 }
 // Even with generics:
 interface ITFunc<T, U>{
   (item: T): U;
 }
 function foo9<T, U>(constructorFunc: ITFunc<T, U>, item: T): U {
  return func(item)
 }

 // ==============Functions with Union Types===============

 function whatTime(hour: number|string, minute: number|string):string {
  return hour + ':' + minute
 }

 whatTime(1, 30)   // '1:30'
 whatTime('1', 30) // '1:30'
 //TypeScript treats these parameters as a single type that is a union of the other types, so your function must be able
// to handle parameters of any type that is in the union

function addTen(start: number|string):number {
  if(typeof start === 'string') {
    return parseInt(start) + 10;
  } else {
    return start + 10
  }
}

// ================== Types of Functions ==========================
// named funcitons
function multiply(a, b) { return a + b }

// anonymous functions
let multiply = function(a, b) { return a * b }
