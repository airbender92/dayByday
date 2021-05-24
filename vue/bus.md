<!--
 * @Author: wangyunbo
 * @Date: 2021-05-24 12:23:34
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-05-24 12:26:58
 * @Description: file content
 * @FilePath: \dayByday\vue\bus.md
-->
/*
 * @Author: wangyunbo
 * @Date: 2021-05-24 12:23:34
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-05-24 12:23:34
 * @Description: file content
 * @FilePath: \dayByday\vue\bus.js
 */
 ```javascript
Vues documentation on $emit is not very comprehensive, however, there are a few ways to do this. Firstly you have to $emit on the vue model you want to send the message to if you want to use this.$on(), so if you are sending from a component you can emit to the direct parent using:

this.$parent.$emit('myEvent',true);
However, this can become problematic if you have a long chain of parents because you have to $emit up the child chain, so in that case you can use a Vue instance as a bus:

// In the root as a global variable so all components have access
var bus = new Vue({});
Or if you are using single file components.

window.bus = new Vue({});
Then in the receiver:

bus.$on('myEvent',() => {
   // Do stuff
});
And in the emitter:

bus.$emit('myEvent',true);
Finally, if you find you app getting too complex for a simple bus then you can use vuex:

https://vuex.vuejs.org/en/index.html
```