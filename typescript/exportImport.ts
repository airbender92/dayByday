/*
 * @Author: wangyunbo
 * @Date: 2021-06-18 09:33:04
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-18 17:43:00
 * @Description: file content
 * @FilePath: \dayByday\typescript\exportImport.ts
 */
// hello.ts
export function hello(name: string) {
  console.log(`hello ${name}!`)
}
function helloES(name: string) {
  console.log(`hola ${name}`)
}
export { helloES };
export default hello;

// Load using directory index
/*
If directory contains file named index.ts it can be loaded using only directory name (for index.ts filename is
optional)
*/
// welcome/index.ts
export function welcome(name: string){
  console.log(`welcome ${name}`)
}

// =============Example usage of defined modules============
import {hello, helloES} from "./hello"; // load specified elements
import defaultHello from "./hello"; // load default export into name defaultHello
import * as Bundle from "./hello"; // load all exports as Bundle
import {welcome} from "./welcome"; // note index.ts is omitted
hello("World"); // Hello World!
helloES("Mundo"); // Hola Mundo!
defaultHello("World"); // Hello World!
Bundle.hello("World"); // Hello World!
Bundle.helloES("Mundo"); // Hola Mundo!
welcome("Human"); // Welcome Human!


// ===================Re-export==============================
// ts allow to re-export declarations
// Operator.ts
interface Operator {
  eval(a: number, b: number): number;
}
export default Operator;

// Add.ts
import Operator from Operator;
export class Add implements Operator {
  eval(a: number, b: number): number {
    return a + b;
  }
}

// Mul.ts
import Operator from './Operator';
export class Mul implements Operator {
  eval(a: number, b:number):number {
    return a * b;
  }
}

// You can bundle all operations in single library
//Operators.ts
import {Add} from "./Add";
import {Mul} from "./Mul";
export {Add, Mul};

// Named declarations can be re-exported using shorter syntax
//NamedOperators.ts
export {Add} from "./Add";
export {Mul} from "./Mul";

// Default exports can also be exported, but no short syntax is available.
// Remember, only one default export per module is possible
//Calculator.ts
export {Add} from "./Add";
export {Mul} from "./Mul";
import Operator from "./Operator";
export default Operator;

// Possible is re-export of bundled import
//RepackedCalculator.ts
export * from "./Operators";

// =============Exporting/Importing declarations====================
//Any declaration (variable, const, function, class, etc.) can be exported from module to be imported in other module.
//TypeScript offer two export types: named and default.

// =======Named export
// adams.ts
export function hello4(name: string) {
  console.log(`Hello ${name}`)
}
export const answerToLifeTheUniverseAndEverything = 42;
export const unused = 0;
// When importing named exports, you can specify which elements you want to import.
import {hello, answerToLifeTheUniverseAndEverything} from "./adams";
hello4(answerToLifeTheUniverseAndEverything); // Hello 42!

// ====== Default export
// Each module can have one default export
// dent.ts
const defaultValue = 54;
export default defaultValue;
// which can be imported using
import dentValue from "./dent";
console.log(dentValue); // 54

// ==========Bundled import
// TypeScript offers method to import whole module into variable
// adams.ts
export function hello(name: string){
  console.log(`Hello ${name}!`);
 }
 export const answerToLifeTheUniverseAndEverything = 42;
 import * as Bundle from "./adams";
 Bundle.hello(Bundle.answerToLifeTheUniverseAndEverything); // Hello 42!
 console.log(Bundle.unused); // 0


