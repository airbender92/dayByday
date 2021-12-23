<!--
 * @Author: wangyunbo
 * @Date: 2021-12-23 11:09:52
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-12-23 11:09:53
 * @FilePath: \dayByday\vue\table\table.vue
 * @Description: file content
-->
<!--
    Table表格插件封装
-->

<template>
  <div class="hatech-plugin-table">
    <!-- 按条件查询模块 -->
    <slot name="hatech-search"></slot>
    <div class="hatech-table">
      <!-- 表格头部布局 -->
      <div class="hatech-table-header">
        <div class="hatech-table-header-left">
          <ul>
            <li>{{table.title}}</li>
          </ul>
        </div>
        <div class="hatech-table-header-content"
             v-if='table.totalContent'>
          <ul>
            <li>{{table.totalContent}}</li>
            <li>{{table.signCount}}</li>
            <li>{{table.noSign}}</li>
          </ul>
        </div>
        <div class="hatech-table-header-right"
             v-if="table.showHeaderOption">
          <!--表格头部操作项-->
          <!-- 表格头部操作按钮集合 -->
          <ul>
            <li v-for="(option, key) of newHeaderOption"
                :key="key"
                :title="option.name"
                @click="_hatechTableOptionBtn({key:key, type:option.type, option: option})">
              <svg-icon :icon-class="option.icon"></svg-icon>
            </li>
            <li title="显隐列"
                v-show="!table.columnShow">
              <el-popover placement="bottom"
                          width="200"
                          popper-class="header-popper"
                          trigger="click">
                <el-checkbox v-for="(column,key) in newColumn"
                             :key="key"
                             :title="column.label"
                             :checked="column.isHide"
                             :name="column.prop"
                             @change="_onIsCellHide(column)">{{column.label}}
                </el-checkbox>
                <i class="el-icon-menu"
                   slot="reference"></i>
              </el-popover>
            </li>
          </ul>
        </div>
      </div>
      <template v-if="table.tabShow">

        <el-col :span="24">
          <el-tabs v-model="table.active"
                   type="card"
                   @tab-click="handleTabClick">
            <el-tab-pane v-for="(item,index) of table.tabs"
                         :key="index"
                         :label="item.planName"
                         :name="item.id">
              <!-- 表格主体布局 -->
              <div class="hatech-table-body">
                <el-table v-loading="isLoading || table.loading"
                          :max-height="table.maxHeight"
                          element-loading-text="加载中，请稍后..."
                          :class="(isLoading || table.loading) ? 'is-loading':''"
                          stripe
                          :border="!table.border"
                          resizable
                          size="small"
                          :highlight-current-row="table.isRowClick"
                          :data="table.data"
                          :ref="table.id"
                          :style="'width: ' + table.tableWidth"
                          :row-class-name="table.rowClassName?table.rowClassName:''"
                          :default-sort="table.sort.defaultSort"
                          @row-click="_rowClick"
                          @selection-change="_tableChangeRows"
                          @header-dragend="_tableCellDragend"
                          @sort-change="_sortChange">
                  <!-- 表格多选设置 -->
                  <el-table-column type="selection"
                                   align="center"
                                   width="40"
                                   v-if="table.selectMore"></el-table-column>
                  <!-- 表格编号设置 -->
                  <el-table-column label="编号"
                                   v-if="table.isIndexShow"
                                   type="index"
                                   align="center"
                                   :min-width="table.numberWidth?table.numberWidth:50"
                                   fixed="left"
                                   :index="_tableIndex"></el-table-column>

                  <!-- 表格列循环设置 -->
                  <el-table-column header-align="center"
                                   :align="column.alignLeft ? 'left' : 'center'"
                                   show-overflow-tooltip
                                   v-for="(column, key) in newColumnByIshide"
                                   :key="key"
                                   :prop="column.prop"
                                   :label="column.label"
                                   :min-width="column.minWidth"
                                   :width="column.width"
                                   :sortable="column.sortable"
                                   :sort-orders="column.sortOrders">
                    <template slot-scope="scope">
                      <div v-if="column.type==='slot'">
                        <slot :name="column.prop"
                              :scope="scope.row[column.prop]"></slot>
                      </div>
                      <div v-else>
                        <!--如果当前列存在格式化、点击参数则走第一个div-->
                        <div v-if="column.formatter && column.click"
                             @click.stop="_onTableFmtClick({event:column.click,row: scope.row})"
                             v-html="column.formatter[scope.row[column.prop]] ?
                           column.formatter[scope.row[column.prop]].replace('${value}', scope.row[column.prop]) :
                           scope.row[column.prop]"></div>
                        <div v-else-if="column.formatter&&column.otherProp"
                             v-html="column.formatter[scope.row[column.otherProp]] ?
                           column.formatter[scope.row[column.otherProp]].replace('value', scope.row[column.prop]) :
                           scope.row[column.prop]"></div>
                        <!-- 当replaceProp属性存在时,如果原属性内容为空,则用替代属性展示 -->
                        <div v-else-if="column.replaceProp"
                             v-html="scope.row[column.prop] == '' ?
                           scope.row[column.replaceProp].replace('${value}', scope.row[column.prop]) :
                           scope.row[column.prop]"></div>
                        <!--如果当前列存在格式化则走第二个div-->
                        <div v-else-if="column.formatter"
                             v-html="column.formatter[scope.row[column.prop]] ||
                           column.formatter.replace && column.formatter.replace('${value}',scope.row[column.prop]) ||
                           scope.row[column.prop]"></div>
                        <!--否则则走第三个div-->
                        <div v-else>{{ scope.row[column.prop] }}</div>
                      </div>
                    </template>

                  </el-table-column>
                  <!-- 表格操作列设置 -->
                  <el-table-column prop="option"
                                   v-if="table.showTableOption"
                                   :min-width="table.operationWidth?table.operationWidth:'auto'"
                                   header-align="center"
                                   align="center"
                                   label="操作"
                                   fixed="right"
                                   :resizable="false">
                    <template slot-scope="scope">
                      <span v-for="(option,key) in newCellOption(scope)"
                            :key="key"
                            :title="option.titleDesc?'':option.name">
                        <el-button type="text"
                                   v-no-more-click
                                   @click.stop="_hatechTableOptionBtn({key: key, type: option.type, index: scope.$index, row: scope.row, option: option})">
                          <svg-icon v-if="option.type"
                                    :iconClass="option.icon">
                          </svg-icon>
                        </el-button>
                        <svg-icon v-if="!option.type&&option.titleDesc"
                                  :key="key"
                                  v-tip="table.option(scope.row)"
                                  :iconClass="option.icon">
                        </svg-icon>
                        <span v-if="!option.type&&option.textOperation"
                              style="color: #409EFF">{{option.name}}</span>
                      </span>
                      <!--  显示图标  -->
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <!--&& (option.createUser ? (!option.createUser||scope.row[option.createUser]==option.createUser) : true )-->
              <!--表格底部布局，表格分页设置-->
              <div class="hatech-table-footer"
                   v-if="!table.noPage">
                <el-pagination background
                               layout="total, sizes, prev, pager, next, jumper"
                               :current-page="table.page"
                               :page-sizes="table.pageSize"
                               :page-size="table.limit"
                               :total="table.count"
                               @size-change="_tableSizeChange"
                               @current-change="_tableCurrentChange"></el-pagination>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-col>

      </template>
      <template v-else>
        <!-- 表格主体布局 -->
        <div class="hatech-table-body">
          <el-table v-loading="isLoading || table.loading"
                    :max-height="table.maxHeight"
                    element-loading-text="加载中，请稍后..."
                    :class="(isLoading || table.loading) ? 'is-loading':''"
                    stripe
                    :border="!table.border"
                    resizable
                    size="small"
                    :highlight-current-row="table.isRowClick"
                    :data="table.data"
                    :ref="table.id"
                    :style="'width: ' + table.tableWidth"
                    :row-class-name="table.rowClassName?table.rowClassName:''"
                    :default-sort="table.sort.defaultSort"
                    @row-click="_rowClick"
                    @selection-change="_tableChangeRows"
                    @header-dragend="_tableCellDragend"
                    @sort-change="_sortChange">
            <!-- 表格多选设置 -->
            <el-table-column type="selection"
                             align="center"
                             width="40"
                             :selectable="table.selectable"
                             v-if="table.selectMore"></el-table-column>
            <!-- 表格编号设置 -->
            <el-table-column :label="table.isIndexLable?table.isIndexLable:'编号'"
                             v-if="table.isIndexShow"
                             type="index"
                             align="center"
                             :min-width="table.numberWidth?table.numberWidth:50"
                             fixed="left"
                             :index="_tableIndex"></el-table-column>

            <!-- 表格列循环设置 -->
            <template v-for="(column, key) in newColumnByIshide">
                 <hatech-table-rescursion
                    v-if="column.children && column.children.length > 0"
                    :column="column"
                    @cellClick="_onTableFmtClick"
                  />
              <el-table-column v-else
                              :key="key"
                              header-align="center"
                              :align="column.alignLeft ? 'left' : 'center'"
                              show-overflow-tooltip
                              :prop="column.prop"
                              :label="column.label"
                              :min-width="column.minWidth"
                              :width="column.width"
                              :sortable="column.sortable"
                              :sort-orders="column.sortOrders">
                <template slot-scope="scope">
                  <div v-if="column.type==='slot'">
                    <slot :name="column.prop"
                          :scope="scope.row[column.prop]"></slot>
                    <slot :name="'table-column-' + column.prop"
                          :scope="scope"></slot>
                  </div>
                  <div v-else>
                    <!--如果当前列存在格式化、点击参数则走第一个div-->
                    <div v-if="column.formatter && column.click"
                        @click.stop="_onTableFmtClick({event:column.click,row: scope.row})"
                        v-html="column.formatter[scope.row[column.prop]] ?
                            column.formatter[scope.row[column.prop]].replace('${value}', scope.row[column.prop]) :
                            scope.row[column.prop]"></div>
                    <div v-else-if="column.formatter&&column.otherProp"
                        v-html="column.formatter[scope.row[column.otherProp]] ?
                            column.formatter[scope.row[column.otherProp]].replace('value', scope.row[column.prop]) :
                            scope.row[column.prop]"></div>
                    <!-- 当replaceProp属性存在时,如果原属性内容为空,则用替代属性展示 -->
                    <div v-else-if="column.replaceProp"
                        v-html="scope.row[column.prop] == '' ?
                            scope.row[column.replaceProp].replace('${value}', scope.row[column.prop]) :
                            scope.row[column.prop]"></div>
                    <!--如果当前列存在格式化则走第二个div-->
                    <div v-else-if="column.formatter"
                        v-html="column.formatter[scope.row[column.prop]] ||
                            column.formatter.replace && column.formatter.replace('${value}',scope.row[column.prop]) ||
                            scope.row[column.prop]"></div>
                    <!--否则则走第三个div-->
                    <div v-else>{{ scope.row[column.prop] }}</div>
                  </div>
                </template>

              </el-table-column>
            </template>
            <!-- 表格操作列设置 -->
            <el-table-column prop="option"
                             v-if="table.showTableOption"
                             :min-width="table.operationWidth?table.operationWidth:'auto'"
                             header-align="center"
                             align="center"
                             label="操作"
                             fixed="right"
                             :resizable="false">
              <template slot-scope="scope">
                <span v-for="(option,key) in newCellOption(scope)"
                      :key="key"
                      :title="option.titleDesc?'':option.name">
                  <template v-if="option.type==='slot'">
                    <slot :name="option.prop"
                          :scope="scope.row"></slot>
                  </template>
                  <template v-else>
                    <el-button type="text"
                               v-no-more-click
                               @click.stop="_hatechTableOptionBtn({key: key, type: option.type, index: scope.$index, row: scope.row, option: option})">
                      <svg-icon v-if="option.type"
                                :iconClass="option.icon">
                      </svg-icon>
                    </el-button>
                    <svg-icon v-if="!option.type&&option.titleDesc"
                              :key="key"
                              v-tip="table.option(scope.row)"
                              :iconClass="option.icon">
                    </svg-icon>
                    <span v-if="!option.type&&option.textOperation"
                          style="color: #409EFF">{{option.name}}</span>
                  </template>
                </span>
                <!--  显示图标  -->
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!--&& (option.createUser ? (!option.createUser||scope.row[option.createUser]==option.createUser) : true )-->
        <!--表格底部布局，表格分页设置-->
        <div class="hatech-table-footer"
             v-if="!table.noPage">
          <el-pagination background
                         layout="total, sizes, prev, pager, next, jumper"
                         :current-page="table.page"
                         :page-sizes="table.pageSize"
                         :page-size="table.limit"
                         :total="table.count"
                         @size-change="_tableSizeChange"
                         @current-change="_tableCurrentChange"></el-pagination>
        </div>
      </template>

    </div>

  </div>
</template>

<script>
import HatechTableRescursion from './Hatech-Table-Rescursion.vue'
export default {
  components: { HatechTableRescursion }
  , props: {
    hatechTable: { type: Object }
    , table: { type: Object }
  }
  , data () {
    return {
      isLoading: false,
    }
  },
  computed: {
    /**
     * @Description:过滤表头的操作
     * @author liuzhihao
     * @method newCellOption
     */
    newHeaderOption () {
      return this.table.headerOption.filter((v, i) => {
        return v.isShow;
      })
    },
    newColumnByIshide () {
      return this.newColumn.filter(item => {
        return item.isHide === true
      })
    },
    /**
     * @Description:过滤列表中每条数据的操作
     * @author liuzhihao
     * @method newCellOption
     */
    newCellOption () {
      return function (scope) {
        return this.table.cellOption.filter((v) => {
          return v.isShow && (!v.formatterKey || (this._controllOperationShow(v, scope)))
        })
      }
    },
    /**
     * @Description:过滤table通过用户类型需要展示的列  userType=0为运营端 1为租户端
     * @author liuzhihao
     * @method newColumn
     */
    newColumn () {
      if (this.$store.getters.userInfoGetter.userType === 0 && this.$store.getters.userInfoGetter.ifSaasVersion) {
        return this.table.column;
      } else {
        return this.table.column.filter(v => {
          return v.prop !== 'tenantName';
        })
      }
    }
  }
  , mounted () {
    this._initCellIsHide();
    if (!this.table.handInit) { //handInit表示手动加载列表
      // 通过数据库查询用户保存的表格显隐列显示方式
      if (this.dealInit) {
        this.$emit("init-table", {});
      } else {
        // 初始化加载后台表格数据
        this._initTable();
      }
    }
  }
  , methods: {
    /**
     * @Description:根据条件显示右边操作列 option为每一项操作 scope为table的每一条数据,formatterKey 为Array value为Array
     * @author liuzhihao
     * @date 19-6-5
     */
    _controllOperationShow (option, scope) {
      let flag = true;
      option.formatterKey.forEach((v, i) => {
        if (typeof scope.row[v] === 'boolean') {
          if (option.value[i]) { // 添加判断,针对原来取用布尔值但是没有赋值的formatterKey判断,没赋值则直接取对应
            flag = flag && (scope.row[v] === option.value[i][0]); // 根据对应项布尔值所填的值(数组)的第一项比对,一样则表示条件相同
          } else {  // 没赋值则直接取对应字段的布尔值
            flag = flag && scope.row[v];
          }
        } else {
          //flag=flag&&(option.value.indexOf(scope.row[v])===i)
          option.value.forEach((a, b) => {
            if (Array.isArray(a)) {
              if (i === b) {
                flag = flag && a.includes(scope.row[v])
              }

            } else {
              flag = flag && (a == scope.row[v]) && (i == b)
            }
          })
        }
      })
      return flag
    },
    /**
     * 初始化数据
     * 初始化读取数据库隐藏列,每列的宽度
     * @Method initCellIsHide
     */
    _initCellIsHide () {
      let that = this;
      this.$http_t.get(this.table.showCellUrl, {
        params: {
          name: this.table.id
        }
      }).then(response => {
        //判断显隐列数据是否存在，存在再向下执行
        if (response.data.data) {
          // 将后台读取字符串JSON数据，转换成JSON数据
          let cell = JSON.parse(response.data.data.content);
          if (cell.length > 0) {
            let newColumn = [];
            // 比对两个集合修改列显示状态
            that.table.column.forEach(clm => {
              cell.forEach(cel => {
                if (clm.prop === cel.prop) {
                  clm.isHide = cel.isHide;
                  clm.width = cel.width;
                  newColumn.push(clm);
                }
              });
            });
            that.table.column = [];   // 清空列显示数据，后续紧跟着渲染使之vue执行树双向绑定
            that.$nextTick(() => {    // 数据DOM元素重新渲染之前，加载数据
              that.table.column = newColumn;
            });
          }
        }
      }).catch(error => {
        console.log(error);
        that.isLoading = false;
      });
    },

    /**
     * 表格数据格式化点击操作
     * 格式化点击事件
     * @Method onTableFmtClick
     */
    _onTableFmtClick (param) {
      this.hatechTable[param.event] && this.hatechTable[param.event].call(this, param);
    }

    /**
     * 自定义表格按钮统一操作
     *  判断父组件函数是否存在，如果存在则执行，否则不执行
     * @Method formSubmit
     */
    , _hatechTableOptionBtn (param) {
      // 判断如果param.row有数据说明是点击列表右侧按钮，否则是列表头部右侧按钮
      if (param.row !== undefined) {
        param.select = [];
        param.select.push(param.row);
      } else {
        param.select = this.table.select;
      }
      this.hatechTable[param.type] && this.hatechTable[param.type].call(this, param);
    }

    /**
     * 表格头部排序操作
     * @Method _sortChange
     */
    , _sortChange (column) {
      if (column !== null && this.table.sort.custom) {
        // column.order == ascending 表示升序，descending 表示降序，否则为空
        this.table.sort.sortName = column.prop;
        this.table.sort.sortType = "descending" === column.order ? "DESC" : "ASC";
        this._initTable(1);
      }
    }

    /**
     * 表格操作
     * 表格行选中操作
     * @Method _rowClick
     */
    , _rowClick (row) {
      this.$emit("row-click", row);
    }

    /**
     * 表格处理操作
     * 勾选表格列数据显示隐藏
     * type说明：
     * 【1: table列的显示隐藏，2：table列的拖拽】
     * @Method excuteTable
     */
    , _excuteTable (column, type) {
      let cellString = '';
      // 遍历表头，更改表头数据模型，并拼接表头数据
      this.table.column.forEach(cell => {
        if (cell.prop === column.prop) {
          if (type === 1) { // 隐藏处理
            cell.isHide = !column.isHide;
          } else {          // 拖拽宽度处理
            cell.width = column.width;
          }
        }
        cellString += ',' + '{"prop":\"' + cell.prop + '\", \"width\":\"' + cell.width + '\" , \"isHide\": ' + cell.isHide + '}';
      });
      // 将操作列数据保存到后台
      this.$http_t.post(this.table.dropCellUrl, {
        name: this.table.id,
        content: "[" + cellString.substr(1) + "]"
      }).then(response => {
      }).catch(error => {
        console.log(error);
      });
    }

    /**
     * 表格头部按钮操作
     * 勾选表格列数据显示隐藏
     * @Method onIsCellHide
     */
    , _onIsCellHide (column) {
      this._excuteTable(column, 1);
    }

    /**
     * 表格头部列拖拽操作
     * 选中列边框进行左右拖拽，改变列的宽度，并更改模型数据，将其保存到数据库中
     * @Method tableCellDragend
     */
    , _tableCellDragend (newWidth, oldWidth, column, event) {
      this._excuteTable({ prop: column.property, width: column.width }, 2);
    }

    /**
     * 表格列序号计算
     * 重新计算数据下标
     * @Method tableIndex
     */
    , _tableIndex (index) {
      return ((this.table.page - 1) * this.table.limit) + index + 1;
    }
    /**
     * 初始化数据
     * 初始化加载列表数据
     * @Method _initTable
     */
    , _initTable (type, callback) {
      let that = this, params = {};
      if (that.table.page) {
        params = {
          page: that.table.page
          , limit: that.table.limit
          , sortName: that.table.sort.sortName
          , sortType: that.table.sort.sortType,
          ...that.table.search
        };
      } else {
        params = {
          sortName: that.table.sort.sortName
          , sortType: that.table.sort.sortType,
          ...that.table.search
        };
      }

      for (let key in params) {
        if (typeof params[key] === 'object') {
          if (params[key] === null) {
            params[key] = '';
          } else {
            params[key] = params[key][0] + ',' + params[key][1];
          }
        }
      }
      if (!that.table.statusScroll) {
        that.isLoading = true;
      }
      this.$http_t.get(this.table.url, { params: params }).then(response => {
        if (response.data.code === 200) {
          if (response.data.count >= 0 && response.data.data.length == 0 && that.table.page > 1) {
            that.$nextTick(() => {
              that.table.page = 1;
              that._initTable();
            })
          } else {
            that.table.count = response.data.count;
            that.table.data = response.data.data;
            that.isLoading = false;
          }
          if (callback) {//消息模板反选表格回传方法。
            callback();
          }
        } else {
          this.$message.error(response.data.msg)
        }
      }).catch(error => {
        console.log(error);
        that.isLoading = false;
      });
    }
    /**
     * 表格分页
     * 点击每页条数下拉列表进行选择数据进行查询
     * @Method tableSizeChange
     */
    , _tableSizeChange (limit) {
      this.table.limit = limit;
      this._initTable();
    }

    /**
     * 表格分页
     * 首先数据选择渲染this.table.page数据
     * 其次调用初始化table数据
     * @Method tableCurrentChange
     */
    , _tableCurrentChange (page) {
      this.table.page = page;
      this._initTable();
    }
    /**
     * 取消表格所有高亮的方法
     * @Method cancelTableHighLight
     */
    , cancelTableHighLight () {
      this.$refs[this.table.id].setCurrentRow();
    }
    /**
     * 表格操作
     * 表格数据多选操作
     * @Method tableChangeRows
     */
    , _tableChangeRows (row) {
      this.table.select = row;
    }
    /**
     * 表格操作
     * 表格选中反选中
     * @Method _toggleRowSelection
     */
    , _toggleRowSelection (rows) {
      rows.forEach(row => {
        this.table.data.forEach(item => {
          if (item.id === row.id) {//如果当前页中有被选中的列
            this.$nextTick(() => {    // 数据DOM元素重新渲染之前，加载数据
              this.$refs[this.table.id].toggleRowSelection(item, true);
            });
          }
        })
      })
    }
    /**
     * 表格多选操作-检查
     * 检查表格数据多选操作,选中则返回ids字符串，未选择则返回false
     * @Method tableSelectMore
     */
    , _tableSelectMore () {
      if (this.table.select.length < 1) {
        this.$message.warning('请勾选需要操作的项')
        return false;
      } else {
        let str = '';
        this.table.select.map((v, i, arr) => {
          str += ',' + v.id;
        })
        str = str.substr(1);
        return str;
      }
    }
    /**
     * tab点击
     * @param value
     */
    , handleTabClick (value) {
      this.table.active = value.name;
      this.$emit('tabClick', this.table.active)
    }
  }
}
</script>


<style scoped lang="scss">
@import '../../assets/css/table.scss';
</style>
