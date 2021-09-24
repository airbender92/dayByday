<!--
 * @Author: wangyunbo
 * @Date: 2021-09-24 14:13:06
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-09-24 14:13:06
 * @FilePath: \dayByday\vue3\emit.md
 * @Description: file content
-->
How to `emit` event out of `setup` method in vue3?

setup function takes two arguments, First one is props. And the second one is context which exposes three component properties, attrs, slots and emit.

You can access emit from context like:
```js
export default {
    setup(props, context) {
        context.emit('event');
    },
};
```
or
```js
export default {
    setup(props, { emit }) {
        emit('event');
    },
};
```