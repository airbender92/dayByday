<!--
 * @Author: wangyunbo
 * @Date: 2021-08-30 19:51:57
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-08-30 19:51:58
 * @FilePath: \dayByday\vue\tableform2.vue
 * @Description: file content
-->
element的el-form和el-table嵌套使用
一、element的el-form和el-table嵌套使用
要点：

:model="addJsonForm" 给表单绑定数据，addJsonForm 是传入表单的数据对象
注意表单数据对象 addJsonForm 的定义：属性 params （可按需求命名）为表单内嵌套的表格的显示数据，数组类型； 属性 addJsonRules ，为表单绑定的验证规则。
el-table： 采用自定义列模板，可自定义表头， el-form： 表单项绑定对应的字段名和校验规则
:prop="'params.' + scope.$index + '.name'" 绑定传入Form 组件的 model 中对应的字段 name
:rules="addJsonForm.addJsonRules.name" 绑定表单验证规则
<template>
  <div>
    <el-form
      :model="addJsonForm"
      ref="addJsonForm"
      :rules="addJsonForm.addJsonRules"
      :inline="true"
      label-width="108px"
    >
      <el-table :data="addJsonForm.params" style="width: 100%" border>
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>

        <el-table-column align="center">
          <template slot="header" slot-scope="scope">
            <span style="color:#2d65dc;">成员名称</span>
            <i style="color:#F56C6C;">*</i>
          </template>
          <template slot-scope="scope">
            <el-form-item
              :prop="'params.' + scope.$index + '.name'"
              :rules="addJsonForm.addJsonRules.name"
            >
              <el-input
                type="text"
                v-model="scope.row.name"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template slot="header" slot-scope="scope">
            <span style="color:#2d65dc;">成员值</span>
            <i style="color:#F56C6C;">*</i>
          </template>
          <template slot-scope="scope">
            <el-form-item
              :prop="'params.' + scope.$index + '.value'"
              :rules="addJsonForm.addJsonRules.value"
            >
              <el-input
                type="text"
                v-model="scope.row.value"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      addJsonForm: {
        params: [
          {
            name: "",
            value: ""
          }
        ],
        addJsonRules: {
          name: [
            { required: true, message: "请输入成员名称", trigger: "blur" }
          ],
          value: [
            { required: true, message: "成员值不能为空", trigger: "blur" }
          ]
        }
      }
    };
  }
};
</script>
复制代码
在这里插入图片描述

二、应用实例
点击添加的时候，动态增加表格的行数，点击删除的时候，删除表格的行数据。

在这里插入图片描述

<template>
  <div>
    <el-button @click="showPopup">点击显示弹框</el-button>
    <h3>
      dataSourceJson： <span>{{ FormInAddPopup.dataSourceJson }}</span>
    </h3>
    <el-dialog
      class="comn_dialog"
      title="添加数据"
      :visible.sync="addJsonVisible"
      width="415px"
      top="23vh"
    >
      <el-button @click="addTableItem">添加</el-button>
      <el-button @click="delTableItem">删除</el-button>
      <el-form
        :model="addJsonForm"
        ref="addJsonForm"
        :rules="addJsonForm.addJsonRules"
        :inline="true"
        label-width="108px"
      >
        <el-table
          :data="addJsonForm.params"
          style="width: 100%"
          border
          @selection-change="addJsonSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center">
          </el-table-column>

          <el-table-column align="center">
            <template slot="header" slot-scope="scope">
              <span style="color:#2d65dc;">成员名称</span>
              <i style="color:#F56C6C;">*</i>
            </template>
            <template slot-scope="scope">
              <el-form-item
                :prop="'params.' + scope.$index + '.name'"
                :rules="addJsonForm.addJsonRules.name"
              >
                <el-input
                  type="text"
                  v-model="scope.row.name"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column align="center">
            <template slot="header" slot-scope="scope">
              <span style="color:#2d65dc;">成员值</span>
              <i style="color:#F56C6C;">*</i>
            </template>
            <template slot-scope="scope">
              <el-form-item
                :prop="'params.' + scope.$index + '.value'"
                :rules="addJsonForm.addJsonRules.value"
              >
                <el-input
                  type="text"
                  v-model="scope.row.value"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetAddJsonPopup">取 消</el-button>
        <el-button type="primary" @click="submitAddJsonPopup">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      addJsonVisible: false,
      addJsonMultiple: [],
      FormInAddPopup: {
        dataSourceJson: "" // 获取到的dataJson,显示为 [{name:"",value:""},{name:"",value:""}] 的格式
      },
      tabItemId: 1, // 表格数据的 id
      addJsonForm: {
        params: [
          {
            name: "",
            value: "",
            tabItemId: 1 // 弹框中，删除空行的唯一标志，默认从1开始
          }
        ],
        addJsonRules: {
          name: [
            { required: true, message: "请输入成员名称", trigger: "blur" }
          ],
          value: [
            { required: true, message: "成员值不能为空", trigger: "blur" }
          ]
        }
      }
    };
  },
  methods: {
    RndNum(n) {
      // 生成随机数
      let rdmNum = "";
      for (let i = 0; i < n; i++) {
        rdmNum += Math.floor(Math.random() * 10); // [0,10)的整数
      }
      return rdmNum;
    },
    showPopup() {
      
      this.addJsonVisible = true;
    },
    addJsonSelectionChange(val) {
      this.addJsonMultiple = val;
    },
    resetAddJsonPopup() {
      //关闭 固定值弹窗
      this.$set(this.addJsonForm, "params", []);
      this.addJsonVisible = false;
    },
    submitAddJsonPopup() {
      //保存 固定值
      if (this.addJsonMultiple.length > 0) {
        this.$refs["addJsonForm"].validate(valid => {
          if (valid) {
            let result = [];
            this.addJsonMultiple.map(val => {
              this.$delete(val, "tabItemId"); // 删除tabItemId属性
              result.push(val);
            });
            result.length ? (result = JSON.stringify(result)) : (result = "");
            this.FormInAddPopup.dataSourceJson = result;
            this.addJsonVisible = false;
          } else {
            return false;
          }
        });
      } else {
        this.$message.warning("请选择要保存的数据");
      }
    },
    addTableItem() {
      this.tabItemId = "T" + this.RndNum(6); //生成以T开头的七位随机数
      this.addJsonForm.params.push({
        name: "",
        value: "",
        tabItemId: this.tabItemId
      });
    },

    delTableItem() {
      // 确认删除
      if (this.addJsonMultiple.length > 0) {
        let arrs = [];
        let ids = this.addJsonMultiple.map(val => val.tabItemId); //拿到选中的数据id,
        this.addJsonForm.params.forEach(item => {
          if (!ids.includes(item.tabItemId)) {
            // 当id在params中，表示数据被选中，该将其删除，即将不被选中的保留
            arrs.push(item);
          }
        });
        this.addJsonForm.params = arrs;
      } else {
        this.$message.warning("请选择要删除的数据");
      }
    }
  }
};
</script>

复制代码
在这里插入图片描述 在这里插入图片描述 在这里插入图片描述