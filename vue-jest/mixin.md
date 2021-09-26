<!--
 * @Author: wangyunbo
 * @Date: 2021-09-26 13:29:52
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-09-26 13:29:53
 * @FilePath: \dayByday\vue-jest\mixin.md
 * @Description: file content
-->
Listing 11.2. Testing a mixin
```js
test('logHelloOnCreateMixin logs hello', () => {
  jest.spyOn(console, 'log')
  const Component = {
    render() {},
    mixins: [logHelloOnCreateMixin]
  }
  shallowMount(Component)
  expect(console.log).toHaveBeenCalledWith('hello')
})
```