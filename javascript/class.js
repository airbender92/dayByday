/*
 * @Author: wangyunbo
 * @Date: 2022-01-17 18:13:26
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-01-17 18:40:45
 * @FilePath: \dayByday\javascript\class.js
 * @Description: file content
 */
class Parent {
  name = 'wong'
  hello() {
    this.sayHello(this.name)
  }
}

class Child extends Parent {
  age=30
  sayHello(name) {
    console.log('你好', name)
  }
}

module.exports = Child;