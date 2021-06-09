/*
 * @Author: wangyunbo
 * @Date: 2021-06-09 18:58:01
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-09 19:19:35
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