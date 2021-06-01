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