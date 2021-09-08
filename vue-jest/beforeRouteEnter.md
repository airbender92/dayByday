<!--
 * @Author: wangyunbo
 * @Date: 2021-09-08 14:04:20
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-09-08 14:05:11
 * @FilePath: \dayByday\vue-jest\beforeRouteEnter.md
 * @Description: file content
-->
/*
 * @Author: wangyunbo
 * @Date: 2021-09-08 14:04:20
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-09-08 14:04:21
 * @FilePath: \dayByday\vue-jest\beforeRouteEnter.spec.js
 * @Description: file content
 */


A common pattern with beforeRouteEnter is to call methods directly at the instantiated vm instance. The documentation states:

The beforeRouteEnter guard does NOT have access to this, because the guard is called before the navigation is confirmed, thus the new entering component has not even been created yet.

However, you can access the instance by passing a callback to next. The callback will be called when the navigation is confirmed, and the component instance will be passed to the callback as the argument:
```js
beforeRouteEnter (to, from, next) {
 next(vm => {
   // access to component instance via `vm`
 })
}
```
This is why simply creating a stub or mock callback of next does not work in this case. I solved the problem by using the following parameter for next:
```js
// mount the component
const wrapper = mount(Component, {});

// call the navigation guard manually
Component.beforeRouteEnter.call(wrapper.vm, undefined, undefined, (c) => c(wrapper.vm));

// await 
await wrapper.vm.$nextTick();
```