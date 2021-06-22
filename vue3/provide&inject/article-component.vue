<!--
 * @Author: wangyunbo
 * @Date: 2021-06-22 08:54:03
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-22 09:24:25
 * @Description: file content
 * @FilePath: \dayByday\vue3\provide&inject\article-component.vue
-->
<template>
  <div>
    <div>ancestor component</div>
    <div> the parent component provides the title prop and the child component utilizes the title prop by simply injecting it.</div>
    <div>
      <p>setup:</p>
      <p>The first argument in the setup function is the props argument. Just as you would expect in a standard component, props inside of a setup function are reactive and will be updated when new props are passed in</p>
      <p>If you need to destructure your props, you can do this by utilizing the toRefs inside of the setup function:</p>
      <code>
        import { toRefs } from 'vue'
        setup(props) {
          const { title } = toRefs(props)

          console.log(title.value)
        }
      </code>
    </div>

      <div>
        <p>ref:</p>
        <p>Takes an inner value and returns a reactive and mutable ref object. The ref object has a single property .value that points to the inner value.</p>
        <code>
          const count = ref(0)
          console.log(count.value) // 0

          count.value++
          console.log(count.value) // 1
        </code>
      </div>
      <articleTitleComponent />
  </div>
</template>

<script>
import { ref, provide } from 'vue'
import articleTitleComponent from './article-title-component.vue'
export default {
  props: {
    title: string
  },
  setup(props) {
    console.log(props.title)
    const title = ref('Article Title');
    provide('title', title);
    // And what if the child component wants to update the injected prop? Let's provide the update callback as well
    provide('updateTitle', (newTitle) => title.value = newTitle);
  }
}
</script>

<style>

</style>