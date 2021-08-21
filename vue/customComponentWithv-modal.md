<!--
 * @Author: wangyunbo
 * @Date: 2021-08-21 09:33:45
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-08-21 09:34:22
 * @FilePath: \dayByday\vue\customComponentWithv-modal.md
 * @Description: file content
-->
/*
 * @Author: wangyunbo
 * @Date: 2021-08-21 09:33:45
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-08-21 09:33:48
 * @FilePath: \dayByday\vue\customComponentWithv-modal.js
 * @Description: file content
 */

https://sodocumentation.net/vue-js/topic/9353/custom-components-with-v-model

Custom Components with v-model
ads via CarbonLimited time offer: Get 10 free Adobe Stock images.
ads via Carbon
Introduction
#
Often times we have to create some components which perform some actions/operations on data and we require that in the parent component. Most of the times vuex would be a better solution, but in cases where the child component's behavior has nothing to do with application state, for instance: A range-slider, date/time picker, file reader

Having individual stores for each component each time they get used gets complicated.

Remarks
#
To have v-model on a component you need to fulfil two conditions.

It should have a prop named 'value'
It should emit an input event with the value expected by the parent components.
<component v-model='something'></component>
is just syntactic sugar for

<component
    :value="something"
    @input="something = $event.target.value"
>
</component>
v-model on a counter component
#
Here counter is a child component accessed by demo which is a parent component using v-model.

// child component
Vue.component('counter', {
  template: `<div><button @click='add'>+1</button>
  <button @click='sub'>-1</button>
  <div>this is inside the child component: {{ result }}</div></div>`,
  data () {
    return {
      result: 0
    }
  },
  props: ['value'],
  methods: {
    emitResult () {
      this.$emit('input', this.result)
    },
    add () {
      this.result += 1
      this.emitResult()
    },
    sub () {
      this.result -= 1
      this.emitResult()
    }
  }  
})
This child component will be emitting result each time sub() or add() methods are called.

// parent component
new Vue({
  el: '#demo',
  data () {
    return {
      resultFromChild: null
    }
  }
})

// parent template
<div id='demo'>
  <counter v-model='resultFromChild'></counter>
  This is in parent component {{ resultFromChild }}
</div>
Since v-model is present on the child component, a prop with name value was sent at the same time, there is an input event on the counter which will in turn provide the value from the child component.

