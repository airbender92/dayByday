/*
 * @Author: wangyunbo
 * @Date: 2021-06-18 08:47:42
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-18 09:31:46
 * @Description: file content
 * @FilePath: \dayByday\typescript\extralLib.ts
 */
// definitions from DefinitelyTyped are available via @types npm package
// example:
// npm i --save lodash
// npm i --save-dev @types/lodash

// ==========Importing a module from npm====================
//If you don't have a definition file for the module, 
// TypeScript will throw an error on compilation because it cannot find the module you are trying to import.
// In this case, you can import the module with the normal runtime require function. This returns it as the any type,
// The _ variable is of type any, so TypeScript will not perform any type checking.
const _: any = require('lodash');
// =====================ts2.0============================
/**
 As of TypeScript 2.0, you can also use a shorthand ambient module declaration in order to tell TypeScript that a
module exists when you don't have a type definition file for the module. TypeScript won't be able to provide any
meaningful typechecking in this case though.
 */
declare module 'lodash';

//  you can now import from lodash in any way you wish:
import { flatten } from 'lodash';
import * as _ from 'lodash'

// : Using global external libraries without typings
/*
Although modules are ideal, if the library you are using is referenced by a global variable (like $ or _), because it was
loaded by a script tag, you can create an ambient declaration in order to refer to it:
*/
declare const _: any;