<!--
 * @Author: wangyunbo
 * @Date: 2021-07-07 13:09:42
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-07-07 13:12:33
 * @Description: file content
 * @FilePath: \dayByday\vue-jest\watch.spec.md
-->
[vue-test-watch](https://vuedose.tips/testing-logic-inside-a-vue-js-watcher/)
### Testing logic inside a Vue.js watcher

Even though the most of the time we use computed properties to react to data changes, sometimes we have to use a watcher in order to perform an expensive operation or an asynchronous call to our API. Let's keep it simple for this example.

Imagine that you have a component that emits an input event when an internal value changes:
```js
<template>
  <input v-model="internalValue" />
</template>
<script>
  export default {
    data() {
      return {
        internalValue: ""
      };
    },
    watch: {
      internalValue(value) {
        this.$emit("input", value);
      }
    }
  };
</script>
```

When its time to test this feature, the first thing that comes to our minds is that we have to mount the component, change the internalValue data and expect that the watcher has been fired.

But you know what? That feature is already tested by Vue core members. Don't do it again. Evan You is pretty confident that a watcher is fired when its associated value changes.

You can do a test like this instead:

```js
test("emits input event when interalValue changes", () => {
  const wrapper = shallowMount(YourComponent);

  wrapper.vm.$options.watch.internalValue.call(wrapper.vm, 15);

  expect(wrapper.emitted("input")[0][0]).toBe(15);
});
```

Vue attaches to the $options.watch object each watcher that we define in our component so what we are doing here is invoking the watcher directly using call().

First parameter of call is the context of this inside the function (the component instance). Then we can pass more parameters (the value).

So wrapping up: "Don't test the framework"

Sometimes is hard to identify the code that you own from the features that have already been tested thousands of times by the library you are using. I guarantee you that a watcher is going to be fired when the data is changed.

Test the logic inside of it, don't waste your precious time trying to re-create the scenario and the conditions that would fire the watcher up.