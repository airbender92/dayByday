<!--
 * @Author: wangyunbo
 * @Date: 2021-06-22 17:02:16
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-22 17:05:54
 * @Description: file content
 * @FilePath: \dayByday\vue3\reactive.vue
-->
<template>
  
</template>

<script>
import { reactive, toRefs } from 'vue'

/**
 * we can use the reactive function exported from vue - 
 * this will save us the trouble of calling .value on each property when passing it to the post function.
 *  When passing these to the component,
 *  we can turn them back into reactive properties using the toRefs function
 */

export default defineComponent({
  setup() {
    const payload = reactive({
      email: undefined,
      password: undefined,
      dateOfBirth: undefined,
      firstName: undefined
    });
    // ....
    return {
      ...toRefs(payload), // email, password, dateOfBirth, firstName
    }
  }
})
</script>

<style>

</style>