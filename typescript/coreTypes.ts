/*
 * @Author: wangyunbo
 * @Date: 2021-05-26 16:15:09
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-05-26 17:57:41
 * @Description: file content
 * @FilePath: \dayByday\typescript\coreTypes.ts
 */
// String literal types allow you to specify the exact value a string can have
let myFavoritePet: 'dog';
myFavoritePet = 'dog';

// Error: Type '"rock"' is not assignable to type '"dog"'.
// myFavoritePet = "rock";


// Together with Type Aliases and Union Types you get a enum-like behavior.
type Species = "cat" | 'dog' | 'bird';

interface Pet {
  species: Species;
  name: string;
  eat();
  walk();
  sleep();
}

interface Cat extends Pet {
  species: 'cat';
}

interface Dog extends Pet {
  species: 'dog';
}

interface Bird extends Pet {
  species: 'bird';
  sing();
}

interface Rock extends Pet {
  type: 'rock'
}

function petIsCat(pet: Pet): pet is Cat {
  return pet.species === 'cat';
}

function petIsDog(pet: Pet): pet is Dog {
  return pet.species === 'dog';
}

function petIsBird(pet: Pet): pet is Bird {
  return pet.species === 'bird';
}

function playWithPet(pet: Pet) {
  if(petIsCat(pet)) {
    // pet is now from type Cat (pet: Cat)
    pet.eat();
    pet.sleep();
    // Error: Type 'bird' is not assignable to type 'cat'
    // pet.type = 'bird';
  }else if(petIsDog(pet)) {
    // pet is now from type Dog (pet: Dog)
    pet.eat();
    pet.walk();
    pet.sleep();
  } else if(petIsBird(pet)) {
    // pet is now from type Bird (pet: Bird)
    pet.eat();
    pet.sing();
    pet.sleep();
  }
}

function buyPet(pet: Species, name: string): Pet;
function buyPet(pet: 'cat', name: string): Cat;
function buyPet(pet: 'dog', name: string): Dog;
function buyPet(pet: 'bird', name: string): Bird;
function buyPet(pet: Species, name: string): Pet {
  if(pet === 'cat') {
    return {
      species: 'cat',
      name: name,
      eat: function() {
        console.log(`${this.name} eats`);
      }, walk: function() {
        console.log(`${this.name} walks`);
      }, sleep: function() {
        console.log(`${this.name} sleeps`);
      }
    } as Cat;
  } else if(pet === 'dog') {
    return {
      species: 'dog',
      name: name,
      eat: function() {
        console.log(`${this.name} eats`);
      }, walk: function() {
        console.log(`${this.name} walks`);
      }, sleep: function() {
        console.log(`${this.name} sleeps`);
      }
    } as Dog;
  } else if(pet === 'bird') {
    return {
      species: 'bird',
      name: name,
      eat: function() {
        console.log(`${this.name} eats`);
      }, walk: function() {
        console.log(`${this.name} walks`);
      }, sleep: function() {
        console.log(`${this.name} sleeps`);
      }, sing: function() {
        console.log(`${this.name} sings`);
      }
    } as Bird;
  } else {
    throw `Sorry we do not have a ${pet}. Would u like to buy a dog?`
  }
};
buyPet(myFavoritePet, "Rockey");

let dog = buyPet(myFavoritePet, 'Rocky');

// =======================Tuple========================
let day: [number, string];
day = [0, 'Monday'];    // valid
day = ['zero', 'Monday']; // invalid: 'zero' is not numeric
console.log(day[0]); // 0
console.log(day[1]); // Monday

day[1] = 'Saturday'; // valid: [0, 'Saturday']

// ====================Boolean=========================
// set with initial value (either true or false)
let isTrue: boolean = true;

// defaults to 'undefined', when not explicitly set
let unsetBool: boolean;

// ==================intersection types ========================

interface Knife {
  cut();
}

interface BottleOpener {
  openBottle();
}

interface Screwdriver {
  turnScrew();
}

type SwissArmyKnife = Knife & BottleOpener & Screwdriver;

function use(tool: SwissArmyKnife) {
  console.log('I can do anything');
  tool.cut();
  tool.openBottle();
  tool.turnScrew();
}

// ============= types in function arguments and return value ==========================
function sum(x: number, y: number): number {
  return x + y;
}

sum(86, 74)

// ============ types in function arguments and return value. string =======================
function hello(name: string): string {
  return `Hello ${name}`;
}
hello('StackOverflow')

// ================== const Enum ============================
/**
 A const Enum is the same as a normal Enum. Except that no Object is generated at compile time. Instead, the literal
values are substituted where the const Enum is used.
 */
const enum NinjaActivity {
  Espionage,
  Sabotage,
  Assassonation
}

let myFavoriteNinjaActivity = NinjaActivity.Espionage;
console.log(myFavoriteNinjaActivity); // 0
console.log(NinjaActivity["Sabotage"]); // 1
// Error: A const enum member can only be accessed using a string literal.
// console.log(NinjaActivity[myFavoriteNinjaActivity]);

// 普通的enum
enum PirateActivity {
  Boarding,
  Drinking,
  Fencing
}
let myF = PirateActivity.Boarding;
console.log(myF); // 0
console.log(PirateActivity["Drinking"]); // 1
console.log(PirateActivity[myF]); // 'Boarding'

// =========== Number =============================
let pi: number = 3.14;
let hexadecimal: number = 0xFF;

// =============String=================
let singleQutoes: string = 'string';

// ========= Array ==============
let threePigs: number[] = [1, 2, 3];
let genericStringArray: Array<string> = ['first', '2nd']

// ============== Enum =============

// A type to name a set of numeric values:
// Number values default to 0:
enum Day { Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday }
let bestDay: Day = Day.Saturday;

// Set a default starting number:
enum TenPlus { Ten = 10, Eleven, Twelve }
// or assign values:
enum MyOddSet { Three = 3, Five = 5, Seven = 7, Nine = 9 }

// ================ Any =========================
// When unsure of a type, any is available
let anything: any = 'I am a string';
anything = 5; // but now I am the number 5

// ===================== Void =============================
// If you have no type at all, commonly used for functions that do not return anything
function log(): void {
  console.log('I return nothing');
 }
 // void types Can only be assigned null or undefined.