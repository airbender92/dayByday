<!--
 * @Author: wangyunbo
 * @Date: 2021-05-18 16:40:10
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-05-18 16:41:51
 * @Description: file content
 * @FilePath: \dayByday\element-ui\分页索引.vue
-->
/*
 * @Author: wangyunbo
 * @Date: 2021-05-18 16:40:10
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-05-18 16:40:11
 * @Description: file content
 * @FilePath: \dayByday\element-ui\分页索引.js
 */
 <template>
  <el-table-column type="index" 
  :index="indexMethod" 
  width="50" >
  </el-table-column>
 </template>
 <script>
 export default {
   
     data() {
       return {

       }
     },
   methods: {
      indexMethod(index) {
        return (this.pageNo-1)*this.pageSize+index+1;
      }
   }
 }
 </script>
 