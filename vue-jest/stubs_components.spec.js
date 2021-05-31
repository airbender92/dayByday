/*
 * @Author: wangyunbo
 * @Date: 2021-05-31 15:46:59
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-05-31 15:47:16
 * @Description: file content
 * @FilePath: \dayByday\vue-jest\stubs_components.spec.js
 */
//Yes, you can create a custom stub and pass it using the stubs mounting option:

const MyStub = {
  template: '<div />',
  methods: {
    someMethod() {}
  }
}

mount(TestComponent, {
  stubs: {
    'my-stub': MyStub
  }
})