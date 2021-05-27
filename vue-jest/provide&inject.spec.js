/*
 * @Author: wangyunbo
 * @Date: 2021-05-27 17:24:09
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-05-27 17:24:36
 * @Description: file content
 * @FilePath: \dayByday\vue-jest\provide&inject.spec.js
 */
provide
type: Object
Pass properties for components to use in injection. See provide/inject.

Example:

const Component = {
  inject: ['foo'],
  template: '<div>{{this.foo()}}</div>'
}

const wrapper = shallowMount(Component, {
  provide: {
    foo() {
      return 'fooValue'
    },
    getGraph: jest.fn(),
    getNode: jest.fn()
  }
})

expect(wrapper.text()).toBe('fooValue')