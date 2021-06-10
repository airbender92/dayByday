/*
 * @Author: wangyunbo
 * @Date: 2021-06-09 18:58:01
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-10 13:30:13
 * @Description: file content
 * @FilePath: \dayByday\typescript\interfaces.ts
 */

// Classes implement interfaces. Classes extend classes. Interfaces extend interfaces.
/**
 Think of "extends" as inheritance syntax. Class Employee extends Person {}; You're gaining the properties and methods of the Parent class as long as they're not private.

"implements" is like.. class Person adheres to the structure of interface IPerson.
 */

/**
 An interfaces specifies a list of fields and functions that
 may be expected on any class implementing the interface.
 */
/**
 Conversely, a class cannot implement an interface 
 unless it has every field and function specified on the interface.
 */

 // =============Extending Interface=================
 interface IPerson {
   name: string;
   age: number;
   breath(): void;
 }

 // And we want to create more specific interface that has the same properties of the person, 
 // we can do it using the extends keyword:
 interface IManager extends IPerson {
   managerId: number;
   managePeople(people: IPerson[]): void;
 }
 // In addition it is possible to extend multiple interfaces.

 // ==================Class Interface ===========================
 // Declare public variables and methods type in the interface to define
 // how other typescript code can interact with it.
 interface ISampleClassInterface {
   sampleVariable: string;
   sampleMethod(): void;
   optionalVariable?: string;
 }

 class SamleClass implements ISampleClassInterface {
   public sampleVariable: string;
   private answerToLifeTheUniverseAndEverything: number;

   constructor() {
     this.sampleVariable = 'string value';
     this.answerToLifeTheUniverseAndEverything = 42
   }

   public sampleMethod(): void {
     // do something
   }

   private answer(q: any):number {
     return this.answerToLifeTheUniverseAndEverything;
   }
 }
 // The example shows how to create an interface ISampleClassInterface and 
 // a class SampleClass that implements the interface.
// **********多态************
 interface Connector {
   doConnect(): boolean;
 }
// Here we have developed our concrete class named WifiConnector that
// has its own implementation. This is now type Connector.
 export class WifiConnector implements Connector {
   public doConnect(): boolean {
    console.log("Connecting via wifi");
    console.log("Get password");
    console.log("Lease an IP for 24 hours");
    console.log("Connected");   
     return true
   }
 }

 // Now we are creating our System that has a component Connector. This is called dependency injection
 export class System {
   constructor(private connector: Connector) { // inject Connector type
    connector.doConnect()
   }
 }

 export class BluetoothConnector implements Connector {
   public doConnect(): boolean {
    console.log("Connecting via Bluetooth");
    console.log("Pair with PIN");
    console.log("Connected");
     return true
   }
 }
/**
  (polymorphism多态： 多个实体公用同一个接口)
 See that Wifi and Bluetooth have its own implementation. Their own different way to connect. However, hence both
have implemented Type Connector the are now Type Connector. So that we can pass any of those to System class
as the constructor parameter. This is called polymorphism. The class System is now not aware of whether it is
Bluetooth / Wifi even we can add another Communication module like Infrared, Bluetooth5 and whatsoever by just
implementing Connector interface.

This is called Duck typing. Connector type is now dynamic as doConnect() is just a placeholder and developer
implement this as his/her own.

 */
/**
 if at constructor(private connector: WifiConnector) where WifiConnector is a concrete class what will
happen? Then System class will tightly couple only with WifiConnector nothing else. Here interface solved our
problem by polymorphism.
 */

// ============================ Generic interfaces ===========================
// Like classes, interfaces can receive polymorphic parameters (aka Generics) too
// declaring Generic Parmeters on interfaces

interface Code {
  message: string,
  status: number
}
interface IStatus<U> {
  code: U;
}
interface IEvents<T> {
  list: T[];
  emit(event: T):void;
  getAll(): T[];
}
// Implementing Generic Interfaces
class State<T> implements IEvents<T> {
  list: T[];
  constructor() {
    this.list = []
  }
  emit(event: T): void {
    this.list.push(event)
  }
  getAll(): T[] {
    return this.list
  }
}

const s = new State<IStatus<number>>();

s.emit({ code: 200 }); // works
s.emit({ code: '500' }); // type error

s.getAll().forEach(event => console.log(event.code))

// ***********************
const s2 = new State<IStatus<Code>>();
s2.emit({ code: { message: 'OK', status: 200 } });
s2.getAll().map(event => event.code).forEach(event => {
  console.log(event.message)
  console.log(event.status)
})

// ================Add functions or properties to an existing interface ======================================
/*
Let's suppose we have a reference to the JQuery type definition and we want to extend it to have additional
functions from a plugin we included and which doesn't have an official type definition. We can easily extend it by
declaring functions added by plugin in a separate interface declaration with the same JQuery name:
*/
// The compiler will merge all declarations with the same name into one -
interface JQuery {
  pluginFunctionThatDoesNothing(): void;
  // create chainable function
  manipulateDOM(HTMLElement): JQuery;
}

// ================Implicit Implementation And Object Shape=======================
/**
 * TypeScript supports interfaces, but the compiler outputs JavaScript, which doesn't. Therefore, interfaces are
effectively lost in the compile step. This is why type checking on interfaces relies on the shape of the object -
meaning whether the object supports the fields and functions on the interface - and not on whether the interface is
actually implemented or not.
 */
interface IKickable {
  kick(distance: number): void;
}
class Ball {
  kick(distance: number): void {
    console.log('Kicked', distance, "meters")
  }
}
/*
So even if Ball doesn't explicitly implement IKickable, a Ball instance may be assigned to (and manipulated as) an
IKickable, even when the type is specified*/
let kickable: IKickable = new Ball();
kickable.kick(40)

// ================Using Interfaces to Enforce Types=======================
interface Pet {
  species: string;
  age: number;
  // we can add more properties if we choose
}
// TypeScript will make sure that the parameters passed to our function contain 
// the properties specified in the Pet interface!
function checkCompatiable(petOne: Pet, petTwo: Pet) {
  if(petOne.species === petTwo.species &&
    Math.abs(petOne.age - petTwo.age) <= 5) {
      return true;
    }
}