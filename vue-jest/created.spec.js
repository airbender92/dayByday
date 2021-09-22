/*
 * @Author: wangyunbo
 * @Date: 2021-09-22 18:13:10
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-09-22 18:13:11
 * @FilePath: \dayByday\vue-jest\created.spec.js
 * @Description: file content
 */
it('test created', () => {
    wrapper.vm.$options.created.forEach(hook => {
      hook.call(wrapper.vm);
    })
  })