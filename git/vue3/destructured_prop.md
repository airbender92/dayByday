<!--
 * @Author: wangyunbo
 * @Date: 2021-09-24 14:07:04
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-09-24 14:07:04
 * @FilePath: \dayByday\git\vue3\destructured_prop.md
 * @Description: file content
-->
Vue 3 watch doesn’t work if I watch a destructured prop ?

props passed into setup is reactive object and all reactivity is tight to the proxy around the object itself.

If you take a value of the property of such object, you get either:

Object (if the value is object), which is also reactive
Value (integer for example) which cannot be reactive by itself
And destructuring is just value assigment:
```js
const  { modelValue } = props
...is same as:

const modelValue = props.modelValue 
You can use toRefs as described in docs

export default {
    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
    },

    setup(props, context)
    {
        let { modelValue } = toRefs(props)

        watch(modelValue, (newValue, oldValue) => {
            console.log(newValue)
        })
    },
}
```
Now modelValue is ref so it can be passed as first argument of watch (no need to for a function) and in most places you must use modelValue.Value to get it's value