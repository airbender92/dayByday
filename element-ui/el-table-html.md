<!--
 * @Author: wangyunbo
 * @Date: 2021-10-08 11:18:33
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-10-08 11:18:34
 * @FilePath: \dayByday\element-ui\el-table-html.md
 * @Description: file content
-->
vue.js - Vue element-ui <el-table-column> 格式化程序 – 如何显示 html？
原文 标签 vue.js vuejs2 element-ui

如何返回html格式的单元格值？

我想使用 <el-table-column> formatter 获取自定义格式的值(带有 html 或其他组件)。

<el-table :data="data">
  <el-table-column v-for="(column, index) in columns" 
                   :key="index" :label="column.label" 
                   :formatter="column.formatter">
  </el-table-column>
</el-table>

data() {
  return {
    columns: [
      {
        label: 'Created at',
        formatter: (row, col, value, index) => {
          return `<span class="date">${value}</span>`
        }
      },
      // edit:
      {
        label: 'Address',
        formatter: (row, col, value, index) => {
          return `<mini-map :data="${row}"></mini-map>`
        }
      }
      // other dynamic columns...
    ]
  }
}

但是单元格内容显示为转义的 html 字符串。有没有可能强制使用html？

EPIC 编辑: 我添加了一个解决方案的答案。
最佳答案

好的，经过几个小时的头脑 Storm ，我找到了非常好的解决方案。我把它放在这里给其他人 - 我希望这对某人有所帮助。
自定义列中显示的值可以是:

简单字符串( Prop )
格式化字符串(安全，没有任何 html 或组件，通过原始格式化程序)
自定义值(html，组件，也安全!)

为了实现这一点，我必须创建自定义格式化程序组件，我将其放在文件夹中，即/TableFormatters/
为此，有一个简单的功能组件 DatetimeFormatter 用图标显示日期时间。
TableFormatters/DatetimeFormatter.vue
<template functional>
  <span>
    <i class="icon-date"></i> {{ props.row[props.column] }}
  </span>
</template>

<script>
  export default {
    name: 'DatetimeFormatter',
  }
</script>
这是列配置:
import DatetimeFormatter from './TableFormatters/DatetimeFormatter'
// ...
data() {
  return {
    data: [/*...*/],
    columns: [
      name: {
        label: 'Name',
      },
      state: {
        label: 'State',
        formatter: row => {
            return 'State: '+row.state__label
        }
      },
      created_at: {
        label: 'Created at',
        formatter: DatetimeFormatter
      }
    ]
  }
}
现在是时候定义 <el-table> 了:
<el-table :data="data">
  <el-table-column 
    v-for="(column, index) in columns" 
    :key="index" 
    :label="columns[column] ? columns[column].label : column"
    :prop="column"
    :formatter="typeof columns[column].formatter === 'function' ? columns[column].formatter : null">
    <template #default="{row}" v-if="typeof columns[column].formatter !== 'function'">
      <div v-if="columns[column].formatter"
        :is="columns[column].formatter" 
        :row="row" 
        :column="column">
      </div>
      <template v-else>
        {{ row[column] }}
      </template>
    </template>
  </el-table-column>
</el-table>
这就像一个魅力。格式化程序在这里发生了什么？
首先，我们检查格式化程序是否设置为 function 。如果是这样，原生 <el-table-column> 格式化程序将获得控制权，因为 <template #default={row}> 不会被创建。否则将创建格式化程序组件(通过 :is 属性)。但是，如果没有格式化程序，将显示一行的纯值。
关于vue.js - Vue element-ui <el-table-column> 格式化程序 – 如何显示 html？，我们在Stack Overflow上找到一个类似的问题： https://stackoverflow.com/questions/58292179/

上一篇：apache - Mod_rewrite已启用但不起作用