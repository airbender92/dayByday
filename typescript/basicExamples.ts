/*
 * @Author: wangyunbo
 * @Date: 2021-06-16 08:50:59
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-17 08:53:12
 * @Description: file content
 * @FilePath: \dayByday\typescript\basicExamples.ts
 */
//  basic class inheritance example using extends and super keyword
// A generic Car class has some car property and a description method
class Car5 {
  name: string;
  engineCapacity: string;

  constructor(name: string, engineCapacity: string) {
    this.name = name;
    this.engineCapacity = engineCapacity;
  }

  describeCar() {
    console.log(`${this.name} car comes with ${this.engineCapacity} displacement`)
  }

}

new Car5("maruti ciaz", '1500cc').describeCar();
// HondaCar extends the existing generic car class and adds new property
class HondaCar extends Car5 {
  seatingCapacity: number;

  constructor(name: string, engineCapacity: string, seatingCapacity: number) {
    super(name, engineCapacity);
    this.seatingCapacity = seatingCapacity;
  }

  describeHondaCar() {
    super.describeCar();
    console.log(`this cars comes with seating capacity of ${this.seatingCapacity}`)
  }
}

new HondaCar('honda jazz', "1200cc", 4).describeHondaCar()

// ===================static class variable example====================
class StaticTest {
  static countInstance: number = 0;
  constructor() {
    StaticTest.countInstance++;
  }
}
new StaticTest();
new StaticTest();
console.log(StaticTest.countInstance)