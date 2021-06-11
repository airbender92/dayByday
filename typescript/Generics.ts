/*
 * @Author: wangyunbo
 * @Date: 2021-06-10 13:30:28
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-11 17:04:33
 * @Description: file content
 * @FilePath: \dayByday\typescript\Generics.ts
 */
// Generic interfaces
// ======Declaring a generic interface================================
interface IResult<T> {
  wasSuccessful: boolean;
  error: T;
}

var result: IResult<string> = {wasSuccessful: true, error: ''}

// =====Generic interface with multiple type parameters=======
interface IRunnable<T, U> {
  run(input: T): U;
}
var runnable: IRunnable<string, number> = ...
var input: string;
var result2: number = runnable.run(input);

// ======Implementing a generic interface===========
interface IResult<T> {
  wasSuccessful: boolean;
  error: T;
  clone(): IResult<T>;
}

// implement it with generic class;
class Res<T> implements IResult<T> {
  wasSuccessful: boolean
  constructor(public result: boolean, public error: T) {
    this.wasSuccessful = result
  }
  public clone(): IResult<T> {
    return new Res<T>(this.result, this.error);
  }
}

// implement it with non generic class:
class StringResult implements IResult<string> {
  wasSuccessful: boolean
  constructor(public result: boolean, public error: string) {
    this.wasSuccessful = result
  }
  public clone(): IResult<string>{
    return new StringResult(this.result, this.error);
  }
}

// ======Generic Class==========
class Result<T> {
  constructor(public wasSuccessful: boolean, public error: T) {

  }
  public clone(): Result<T>{
    ...
  }
}

let r1 = new Result(false, 'error: 42'); // Compiler infers T to string

let r2 = new Result(false, 42); // Compiler infers T to number

let r3 = new Result<string>(true, null); // Explicitly set T to string


let r4 = new Result<string>(true, 4); //Compilation error because 4 is not a string


// ==================Type parameters as constraints====================
function assign<T extends U, U>(target: T, source: U): T {
  for(let id in source) {
    target[id] = source[id];
  }
  return target;
}

let x = { a: 1, b: 2, c: 3 };
assign(x, {b: 20, c: 30})

// ===============Generics Constraints==========================
interface IRunnable2 {
  run(): void;
}

interface IRunner2<T extends IRunnable2> {
  runSafe(runnable: T): void;
}

// =======================
interface IRunnable3<U, V> {
  run(parameter: U): V;
}

interface IRunner3<T extends IRunnable3<UIEvent, V>, U, V> {
  runSafe(runnable: T, parameter: U): V
}

// ====================
interface IRunnable4<T extends { run(): void }> {
  runSafe(runnable: T): void;
}

// =============Generic Functions ===============
interface IRunner4 {
  runSafe<T extends IRunnable4>(runnable: T): void;
}

class Runner4 implements IRunner4 {
  public runSafe<T extends IRunnable4>(runnable: T): void {
    try {
      runnable.run();
    } catch(e) {
      
    }
  }
}

// ===========Using generic Classes and Functions:==================
const stringRunnable = new Runnable<string>();
// run generic function:
function runSafe2<T extends Runnable<U>, U>(runnable: T);

// Specify the generic types:
runSafe2<Runnable<string>, string>(stringRunnable)