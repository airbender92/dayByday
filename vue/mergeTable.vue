<!--
 * @Author: wangyunbo
 * @Date: 2021-12-28 14:00:54
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-12-29 10:47:28
 * @FilePath: \dayByday\vue\mergeTable.vue
 * @Description: file content
-->
<template>
  <div class="effectDepth-table">
    <table-merge
      ref="hatechTable"
      mergeFields="id"
      :cell-style="getCellStyle"
      :tableConfig="table"
      :span-method="objectSpanMethod"
      @onEvent="onEvent"
      :tableMergeThis="this"
    >
      <div slot="resourceRecoverHour-header" slot-scope="{ scope }">
        <div>{{ scope.label.split("|")[0] }}</div>
        <div style="color: red">{{ scope.label.split("|")[1] }}</div>
      </div>
      <div slot="effectDepth-header" slot-scope="{ scope }">
        <div>{{ scope.label.split("|")[0] }}</div>
        <div style="color: red">{{ scope.label.split("|")[1] }}</div>
      </div>
    </table-merge>
    <div class="operation">
      <el-button type="primary" v-if="table.isSee" @click="handleEdit"
        >编辑</el-button
      >
      <template v-else>
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
        <el-button type="primary" @click="handleSubmit">提交结果</el-button>
      </template>
    </div>
  </div>
</template>

<script>
import Config from "./poundScoreTableConfig.js";
import TableMerge from "@/components/tableMerge";
export default {
  name: "poundScoreTable",
  components: {
    TableMerge,
  },
  data() {
    return {
      // 表格信息设置
      table: Config(this.$store.state.userInfo).table,
      // 编辑前数据
      prevData: [],
      // 行合并数据
      spanArr: [],
      spanPos: [],
    };
  },
  mounted() {
    this.rowspan(this.table.data, "people", "poundMax");
  },
  methods: {
    /**
     * 获取单元格样式
     */
    getCellStyle({ column, row, columnIndex }) {
      // 编辑状态不改变背景色
      if (!this.table.isSee) {
        return null;
      }
      // 背景色枚举
      const backgroundColorEnum = {
        1: "rgb(1, 176, 80)",
        2: "rgb(146, 208, 80)",
        3: "rgb(255, 255, 2)",
        4: "rgb(255, 192, 1)",
        5: "rgb(255, 0, 0)",
      };
      const colorColumns = ["code", "type", "name", "resource", "people"];
      if (column.property === "poundScore") {
        return {
          backgroundColor: backgroundColorEnum[row.poundScore] || "",
        };
      } else if (colorColumns.includes(column.property)) {
        return {
          backgroundColor: "#DAFE87",
        };
      }
      return null;
    },

    /**
     * 获取表单ref实例
     */
    getFormRef() {
      try {
        return this.$refs.hatechTable.getFormRef();
      } catch (e) {
        return false;
      }
    },

    /**
     * 校验需要保存的数据
     */
    validateData() {
      return new Promise((resolve) => {
        const formRefs = this.getFormRef();
        if (!formRefs) {
          return resolve(false);
        }
        formRefs.validate((valid) => {
          if (!valid) {
            return resolve(false);
          }
          this.table.isSee = true;
          return resolve(this.table.data);
        });
      });
    },

    /**
     * 编辑
     */
    handleEdit() {
      this.prevData = JSON.parse(JSON.stringify(this.table.data));
      this.table.isSee = false;
    },

    /**
     * 取消保存
     */
    handleCancel() {
      this.table.data = this.prevData;
      this.table.isSee = true;
    },

    /**
     * 保存
     */
    async handleSave() {
      const data = await this.validateData();
      console.log(data);
    },

    /**
     * 提交
     */
    handleSubmit() {
      this.$message.warning("开发中");
    },
    /**
     * @param data - 数据源
     * @param {string?} dependProp - 跨行时依赖的字段
     * @param {string?} expecProp - 需要依赖于dependProp的属性
     * @returns undefined
     */
    rowspan(data, dependProp, expecProp) {
      const keys = Object.keys(data[0]);
      data.forEach((_, index) => {
        let rowArr = [];
        keys.forEach((key, colIndex) => {
          if (index === 0) {
            rowArr.push(1); //第一行先占一行
            this.spanPos.push(0); //给第一行的索引为0
          } else {
            // 有字段依赖项的处理
            if (dependProp && expecProp && expecProp === key) {
              if (
                data[index][dependProp] === data[index - 1][dependProp] &&
                data[index][expecProp] === data[index - 1][expecProp]
              ) {
                this.spanArr[this.spanPos[colIndex]][colIndex] += 1;
                rowArr.push(0);
              } else {
                rowArr.push(1);
                this.spanPos[colIndex] = index;
              }
            } else {
              // 没有字段依赖项的处理
              if (data[index][key] === data[index - 1][key]) {
                this.spanArr[this.spanPos[colIndex]][colIndex] += 1; //如果下一行与上一行相同，那么spanArr(要合并的)增加一行
                rowArr.push(0); //当前行不显示
              } else {
                rowArr.push(1); //如果第二行与第一行不相等，那么当前行自己占一行
                this.spanPos[colIndex] = index;
              }
            }
          }
        });
        this.spanArr.push(rowArr);
      });
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      //表格合并行
      // row是当前行，column是当前列，rowIndex是当前行的索引，columnIndex是当前列的索引
        const _row = this.spanArr[rowIndex][columnIndex]; //合并行的行数，1代表独占一行，比1大代表合并若干行，0代表不显示
        const _col = _row > 0 ? 1 : 0; //行如果存在那么列就存在，行不存在那么列也就不存在
        return {
          rowspan: _row,
          colspan: _col,
        };
    },
  },
};
</script>

<style lang="scss" scoped>
.effectDepth-table {
  .operation {
    text-align: center;
    padding: 20px;
  }
}
</style>
