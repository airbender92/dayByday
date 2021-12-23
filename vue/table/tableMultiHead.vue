<!--
 * @Author: wangyunbo
 * @Date: 2021-12-23 11:10:20
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-12-23 11:10:21
 * @FilePath: \dayByday\vue\table\tableMultiHead.vue
 * @Description: file content
-->
<!--
 * @Author: wangyunbo
 * @Date: 2021-12-22 19:02:16
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-12-23 10:59:57
 * @FilePath: \hatech-bcms-ui-1.0\src\components\table\Hatech-Table-Rescursion.vue
 * @Description: Hatech-table 多级表头
-->
<template>
<el-table-column
  :key="column.prop"
  :label="column.label"
  :prop="column.prop"
  :align="column.alignLeft ? 'left' : 'center'"
  show-overflow-tooltip
>
  <template v-for="(item, index) in column.children">
    <hatech-table-rescursion
      v-if="item.children && item.children.length > 0"
      :key="index"
      :column="item"
    ></hatech-table-rescursion>
    <el-table-column v-else
      :key="index"
      :label="item.label"
      :prop="item.prop"
       header-align="center"
      :align="item.alignLeft ? 'left' : 'center'"
       show-overflow-tooltip
      :min-width="item.minWidth"
      :width="item.width"
      :sortable="item.sortable"
      :sort-orders="item.sortOrders"
    >
    <template slot-scope="scope">
      <div v-if="item.type==='slot'">
        <slot :name="item.prop"
              :scope="scope.row[item.prop]"
        ></slot>
        <slot :name="'table-column-' + coloumn.prop"
              :scope="scope"
        ></slot>
      </div>
      <div v-else>
        <!--如果当前列存在格式化、点击参数则走第一个div-->
        <div v-if="item.formatter && item.click"
            @click.stop="onTableFmtClick({event:item.click,row: scope.row})"
            v-html="item.formatter[scope.row[item.prop]] ?
                item.formatter[scope.row[item.prop]].replace('${value}', scope.row[item.prop]) :
                scope.row[item.prop]"></div>
        <div v-else-if="item.formatter&&item.otherProp"
            v-html="item.formatter[scope.row[item.otherProp]] ?
                item.formatter[scope.row[item.otherProp]].replace('value', scope.row[item.prop]) :
                scope.row[item.prop]"></div>
        <!-- 当replaceProp属性存在时,如果原属性内容为空,则用替代属性展示 -->
        <div v-else-if="item.replaceProp"
            v-html="scope.row[item.prop] == '' ?
                scope.row[item.replaceProp].replace('${value}', scope.row[item.prop]) :
                scope.row[item.prop]"></div>
        <!--如果当前列存在格式化则走第二个div-->
        <div v-else-if="item.formatter"
            v-html="item.formatter[scope.row[item.prop]] ||
                item.formatter.replace && item.formatter.replace('${value}',scope.row[item.prop]) ||
                scope.row[item.prop]"></div>
        <!--否则则走第三个div-->
        <div v-else>{{ scope.row[item.prop] }}</div>
      </div>
    </template>
    </el-table-column>
  </template>
</el-table-column>
</template>

<script>
export default {
  name: 'hatech-table-rescursion',
  props: {
    column: {
      type: Array,
      default: () => ([])
    },
    cellClick: {
      type: Function
    }
  },
  methods: {
    /**
     * 表格数据格式化点击操作
     * 格式化点击事件
     * @Method onTableFmtClick
     */
    onTableFmtClick (param) {
      if(this.cellClick) {
        this.cellClick(param)
      }
    }
  }
};
</script>

