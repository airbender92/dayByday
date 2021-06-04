/*
 * @Author: wangyunbo
 * @Date: 2021-06-02 08:49:12
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-04 09:26:56
 * @Description: file content
 * @FilePath: \dayByday\typescript\Classes.ts
 */
// , TypeScript classes may implement interfaces or make use of generics.

// ==================== Abstract Classes ========================

abstract class Machine {
    constructor(public manufacturer: string) {

    }
    // An abstract class can define methods of  its own, or...
    summary(): string {
        return `${this.manufacturer} makes this machine`
    }

    // require inheriting classes to implement methods
    abstract moreInfo(): string;
}

class Car extends Machine {
    constructor(manufacturer: string, public position: number, protected speed: number) {
        super(manufacturer);
    }

    move() {
        this.position += this.speed;
    }
    moreInfo() {
        return `This is a car located at ${this.position} and going ${this.speed}mph`
    }
}

let myCar = new Car('Konda', 10, 70);
myCar.move(); // position is now 80
console.log(myCar.summary()); // prints "Konda makes this machine"
console.log(myCar.moreInfo())
/**
 Abstract classes are base classes from which other classes can extend. 
 They cannot be instantiated themselves (i.e.
you cannot do new Machine("Konda")).
 */
/**
 The two key characteristics of an abstract class in TypeScript are:
1. They can implement methods of their own.
2. They can define methods that inheriting classes must implement.
For this reason, abstract classes can conceptually be considered a combination of an interface and a class.
 */

// ===================Simple class========================
class Car1 {
    public position: number = 0;
    private speed: number = 42;

    move() {
        this.position += this.speed
    }
}

// ====================Basic inheritance==========================
// The SelfDrivingCar class overrides the move() method 
// and uses the base class implementation using super
class SelfDrivingCar extends Car1 {
    move() {
        super.move();
        super.move();
    }
}

// ================= Constructors ========================
// One of the best things in TypeScript, is automatic assignment of constructor parameters to the relevant property.
class Car2 {
    public position: number;
    protected speed: number;

    constructor(position: number, speed: number) {
        this.position = position;
        this.speed = speed;
    }

    move() {
        this.position += this.speed;
    }
}

// All this code can be resumed in one single constructor:
class Car4 {
    constructor(public position: number, protected speed: number) {}

    move() {
        this.position += this.speed
    }
}
// above will be translated to js :
var Car44 = (function(){
    function Car44(position, speed) {
        this.position = position;
        this.speed = speed;
    }
    Car44.prototype.move = function() {
        this.position += this.speed;
    }
    return Car44;
}())

// Constructors of derived classes have to call the base class constructor with super().
class SelfDrivingCar2 extends Car4 {
    constructor(startAutoPilot: boolean) {
        super(0, 42);
        if(startAutoPilot) {
            this.move();
        }
    }
}
let car4 = new SelfDrivingCar2(true);
console.log(car4.position)

// ================ Accessors =======================
// TypeScript accessors allow us to add additional code in getters or setters.
class CarA {
    public position: number = 0;
    private _speed: number = 42;
    private _MAX_SPEED = 100;

    move() {
        this.position += this._speed;
    }

    get speed(): number {
        return this._speed;
    }

    set speed(value:number) {
        this._speed = Math.min(value, this._MAX_SPEED);
    }
}

let carA = new CarA();
carA.speed = 120;
console.log(carA.speed)

// ==========================Transpilation=================================
// ts source
class SomeClass {
    public static SomeStaticValue: string = 'hello';
    public someMemberValue: number = 15;
    private somePrivateValue: boolean = false;

    constructor() {
        SomeClass.SomeStaticValue = SomeClass.getGoodbye();
        this.someMemberValue = this.getFortyTwo();
        this.somePrivateValue = this.getTrue();
    }

    public static getGoodbye(): string {
        return 'goodbye'
    }

    public getFortyTwo():number {
        return 42
    }

    private getTrue(): boolean {
        return true;
    }
}

// js source:(output)
var SomeClassJS = (function(){
    function SomeClassJS() {
        this.someMemberValue = 15;
        this.somePrivateValue = false;
        SomeClassJS.SomeStaticValue = SomeClassJS.getGoodbye();
        this.someMemberValue = this.getFortyTwo();
        this.somePrivateValue = this.getTrue()
    }
    SomeClassJS.getGoodbye = function() {
        return 'goodbye';
    }
    SomeClassJS.prototype.getFortyTwo = function () {
        return 42;
    }
    SomeClassJS.prototype.getTrue = function() {
        return true;
    }
    return SomeClassJS;
}());
SomeClassJS.SomeStaticValue = 'hello'
// Static properties are added directly to the class object, 
//whereas instance properties are added to the prototype.

// ==========================Monkey patch a function into an existing class==================================
/**
 * Sometimes it's useful to be able to extend a class with new functions. 
 * For example let's suppose that a string should
 be converted to a camel case string. So we need to tell TypeScript,
 that String contains a function called toCamelCase, which returns a string.
 */
interface String {
    toCameCase(): string
}
String.prototype.toCameCase = function(): string {
    return this.replace(/[^a-z]/ig, '')
        .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match: any, index: number) => {
            return +match === 0 ? '' : match[index === 0 ? 'toLowerCase' : 'toUpperCase']()
        })
}

"This is an example".toCameCase(); // => "thisIsAnExample"