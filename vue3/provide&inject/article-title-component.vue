<!--
 * @Author: wangyunbo
 * @Date: 2021-06-22 09:04:51
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-22 09:26:13
 * @Description: file content
 * @FilePath: \dayByday\vue3\provide&inject\article-title-component.vue
-->
<template>
  <div>
    <div>child component</div>
  </div>
</template>

<script>
import { ref, inject } from 'vue'
export default {
  setup() {
    const title = inject(title);
    const updateTitle = inject('updateTitle');
    // 更新父组件的title
    updateTitle(`Draft: ${title}`);
    return{
      title
    }
  }
}
</script>

<style>

</style>