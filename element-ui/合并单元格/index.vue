<template>
  <div class="dispatchGroupPage copyPlanPage page">
    <hatech-table-page ref="page"
                       :page="page"
                       @onEvent="onEvent"
    />
    <!-- 新增、修改调度组 -->
    <hatech-drawer
      ref="dispatchGroupDrawer"
      :drawer-config="page.dispatchGroupDrawer"
      @onEvent="onEvent"
    >
      <template v-for="(slotName, index) in slots"
                #[slotName]
      >
        <div :key="index" class="cascader-slot-wrapper">
          <el-cascader
            :value="getVal(slotName)"
            :clearable="true"
            :filterable="true"
            :multiple="false"
            :options="dbcaOptions"
            placeholder="请选择应用"
            @change="(val) => onExtralAppControlChange(slotName, val)"
          />
          <el-button size="small" @click="() => delControl(slotName)">
            删除
          </el-button>
        </div>
      </template>
    </hatech-drawer>
    <!-- 新增、修改复制计划 -->
    <hatech-drawer
      ref="copyPlanDrawer"
      :drawer-config="page.drawer"
      @onEvent="onEvent"
    />
    <!-- 设置自动伸缩策略 -->
    <hatech-drawer
      ref="autoScaleDrawer"
      :drawer-config="page.autoScaleDrawer"
      @onEvent="onEvent"
    >
      <set-auto-scale
        ref="autoScale"
        slot="hatech-drawer-content"
        :scale-policy="scalePolicy"
        :app-config="appConfig"
      />
      <div slot="hatech-drawer-footer" class="drawer-footer">
        <el-button type="primary" @click="closeAutoScaleDrawer('submit')">
          提交
        </el-button>
        <el-button type="default" @click="closeAutoScaleDrawer('cancel')">
          取消
        </el-button>
      </div>
    </hatech-drawer>
    <!-- 设置手动伸缩 -->
    <hatech-drawer
      ref="handleScaleDrawer"
      :drawer-config="page.HandleScaleDrawer"
      @onEvent="onEvent"
    >
      <set-handle-scale
        ref="handleScale"
        slot="hatech-drawer-content"
        :scale-policy="handleScale"
        :app-config="appConfig"
      />
      <div
        slot="hatech-drawer-footer"
        class="drawer-footer"
      >
        <el-button
          type="primary"
          @click="closeHandleScaleDrawer('submit')"
        >
          提交
        </el-button>
        <el-button
          type="default"
          @click="closeHandleScaleDrawer('cancel')"
        >
          取消
        </el-button>
      </div>
    </hatech-drawer>
    <!-- 伸缩履历 -->
    <hatech-drawer
      ref="flexibleResumeDrawer"
      :drawer-config="page.FlexibleResumeDrawer"
      @onEvent="onEvent"
    >
      <flexible-resume
        ref="flexibleResume"
        slot="hatech-drawer-content"
        :deploy-ments="deployMents"
        :cluster-data="clusterData"
      />
    </hatech-drawer>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
import { mapActions } from 'vuex';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import { fakeDatas } from './config/table.config';
import { fakeCascaderOptions } from './config/dispatchGroup.drawer.config';
import HatechDrawer from '@/components/hatech-web-component-drawer';
import setAutoScale from './components/setAutoscale';
import setHandleScale from './components/setHandlescale';
import flexibleResume from './components/flexibleResume';
import PageConfig from './config';
import spanRow from './utils/spanRow';

export default {
  name: 'DispatchGroup',
  components: {
    HatechDrawer,
    setAutoScale,
    setHandleScale,
    flexibleResume,
  },
  data() {
    return {
      page: PageConfig.call(this),
      copyPlanId: '',
      clusterData: [],
      scalePolicy: {},
      appConfig: {},
      handleScale: {},
      deployMents: [],
      // dataBaseClusterAppCascader options
      dbcaOptions: [],
      slots: [],
    };
  },
  watch: {
    dbcaOptions: {
      deep: true,
      immediate: true,
      handler(options) {
        const applicationsCol = this.page.dispatchGroupDrawer.form.config.columns.find((col) => col.prop === 'applications');
        applicationsCol.props.options = options;
      },
    },
  },
  computed: {
    // 新增调度组（应用的column模板）
    appControlObj() {
      return {
        type: 'slot',
        show: true,
        prop: 'applications',
        label: '',
        labelWidth: '95px',
        props: {
          clearable: true,
          filterable: true,
          multiple: false,
          options: this.dbcaOptions || [],
          placeholder: '请选择应用',
          type: 'optionGroup',
          event: 'appCascaderChange',
        },
      };
    },
  },
  mounted() {
    this.GetDispatchGroups();
    this.assembleDBCAOptions();
  },
  beforeCreate() {
    document.getElementsByTagName('body')[0].className = 'copyPlanPage';
  },
  beforeDestroy() {
    document.body.removeAttribute('class', 'copyPlanPage');
  },
  methods: {
    ...mapActions('home', ['FetchClusterList']),
    ...mapActions('autoScale', [
      'FetchNamespaces',
      'FetchWorkloadLabel',
      'OpenPrediction',
    ]),
    // 事件分发中心
    onEvent(avgs) {
      const { params, event } = avgs;
      if (this[event]) this[event](params);
    },
    // 表单分发中心
    onFormEvent(avgs) {
      const { params, event } = avgs;
      if (this[event]) this[event](params);
    },
    // 组合数据中心-集群-应用的级联选项
    assembleDBCAOptions() {
      this.dbcaOptions = fakeCascaderOptions;
    },
    async GetDispatchGroups() {
      // const res = await this.FetchClusterList();
      // this.clusterData = res.data;
      this.page.table.data = fakeDatas;
    },
    // 分页
    pageInfoChanged(params) {
      this.$refs.page.queryTableData(params);
    },
    // 查询
    onSearch() {
      this.GetDispatchGroups();
    },
    // 清空
    onSearchReset() {
      this.page.search.data = {};
    },
    // 集群改变动态更新命名空间
    async ClustersChange({ newValue }) {
      this.page.drawer.form.data.Namespace = '';
      this.page.drawer.form.data.labels = [];
      if (newValue.length >= 2) {
        const res = await this.FetchNamespaces({
          params: { clusterIds: newValue },
        });
        this.page.drawer.form.config.columns.map((item) => {
          if (['Namespace'].includes(item.prop)) {
            item.props.options = res.data.map((item) => ({
              value: item,
              label: item,
            }));
          }
        });
      } else {
        this.page.drawer.form.config.columns.map((item) => {
          if (['Namespace'].includes(item.prop)) {
            item.props.options = [];
          }
        });
      }
      this.page.drawer.form.config.columns.map((item) => {
        if (['labels'].includes(item.prop)) {
          item.props.options = [];
        }
      });
    },
    // 命名空间改变动态改变标签
    async NamespaceChange({ newValue }) {
      this.page.drawer.form.data.labels = [];
      const res = await this.FetchWorkloadLabel({
        params: {
          clusterIds: this.page.drawer.form.data.Clusters,
          namespace: newValue,
        },
      });
      this.page.drawer.form.config.columns.map((item) => {
        if (['labels'].includes(item.prop)) {
          item.props.options = res.data.map((item) => ({
            value: item,
            label: item,
          }));
        }
      });
    },
    // 新增调度组
    async onAddDispatchGroup() {
      this.page.dispatchGroupDrawer.form.data = {
        Name: '',
        Clusters: [],
        Namespace: '',
        labels: [],
        Description: '',
      };
      // const res = await this.FetchClusterList();
      // this.formateOptionsData(res.data);
      this.page.dispatchGroupDrawer.title = '新增调度组';
      this.page.dispatchGroupDrawer.form.mode = 'add';
      this.page.dispatchGroupDrawer.visible = true;
    },
    // 编辑调度组
    onEditTableAction(params) {
      console.log('row:', params);
      this.page.dispatchGroupDrawer.title = '编辑调度组';
      this.page.dispatchGroupDrawer.form.mode = 'edit';
      this.page.dispatchGroupDrawer.visible = true;
    },
    // 获取当前的cascader值
    getVal(controlName) {
      const val = this.page.dispatchGroupDrawer.form.data[controlName];
      if (val) return val;
      return [];
    },
    // 应用cascader切换
    appCascaderChange(params) {
      const { newValue, item } = params;
      const { prop } = item;
      this.page.dispatchGroupDrawer.form.data[prop] = newValue;
    },
    // 临时新增的应用cascader切换
    onExtralAppControlChange(prop, newValue) {
      this.page.dispatchGroupDrawer.form.data[prop] = newValue;
    },
    // 删除临时新增的控件
    delControl(prop) {
      delete this.page.dispatchGroupDrawer.form.data[prop];
      this.page.dispatchGroupDrawer.form.config.columns = this.page.dispatchGroupDrawer.form.config.columns.filter((col) => col.prop !== prop);
    },
    // 继续添加应用按钮点击
    addAppControl() {
      const btnPosition = this.page.dispatchGroupDrawer.form.config.columns.findIndex((col) => col.prop === 'addAppButton');
      const obj = cloneDeep(this.appControlObj);
      obj.prop = `applications${(new Date()).valueOf()}`;
      this.slots.push(obj.prop);
      this.page.dispatchGroupDrawer.form.config.columns.splice(btnPosition, 0, obj);
      let index = 0;
      this.page.dispatchGroupDrawer.form.config.columns.forEach((col) => {
        if (col.prop.indexOf('applications') === 0) {
          index += 1;
          col.props.index = index;
        }
      });
    },
    formateOptionsData(data) {
      const m = new Map();
      data.forEach((item) => {
        const value = {
          value: item.clusterId,
          label: item.clusterName,
          dataCenterId: item.dataCenterId,
          platformName: item.platformName,
        };
        if (!m.has(item.dataCenterId)) {
          const options = [value];
          m.set(item.dataCenterId, options);
        } else {
          const options = m.get(item.dataCenterId);
          options.push(value);
          m.set(item.dataCenterId, options);
        }
      });
      const formateData = [];
      m.forEach((value) => {
        formateData.push({
          label: value[0].platformName,
          options: value,
        });
      });
      return formateData;
    },
    // 按钮设置loading，防止重复点击
    setLoading(param, bur) {
      param.drawerConfig.form.buttons.forEach((item) => {
        if (item.loading === !bur) {
          this.$set(item, 'loading', bur);
        }
      });
    },
    // 确认
    async onCreate(param) {
      if (param.mode === 'add') {
        await param.refForm.validate();
        this.setLoading(param, true);
        const data = {
          ...param.data,
          Clusters: param.data.Clusters.map((item) => {
            const { dataCenterId, clusterId } = this.clusterData.find(
              (cluster) => cluster.clusterId === item,
            );
            return {
              dataCenterId,
              clusterId,
            };
          }),
        };
        axios.post('autoScale/v1/sysapp', data).then((res) => {
          if (res.status === 200) {
            this.setLoading(param, false);
            param.refs.drawer.closeDrawer();
            this.GetDispatchGroups();
          }
        });
      }
    },
    // 取消
    onCancel(param) {
      // closeDrawer方法会自己clear校检规则，不用手动调clearValidate
      param.refs.drawer.closeDrawer();
    },
    // 修改
    async onEditTableAction(param) {
      this.copyPlanId = param.scope.row.id;
      const res = await this.ViewPlanDetail({
        query: { id: param.scope.row.id },
      });
      if (res && res.success) {
        // 获取已选应用
        res.data.applicationIdList = res.data
          && res.data.clusterApplicationIds
          && res.data.clusterApplicationIds.length
          ? res.data.clusterApplicationIds.split(',')
          : [];
        this.page.drawer.form.data = res.data;
        this.page.drawer.title = '编辑应用';
        this.page.drawer.form.mode = 'edit';
        this.page.drawer.visible = true;
      }
    },
    onFlexibleResumeAction(param) {
      this.deployMents = [];
      axios
        .get(`autoScale/v1/scale/policy/${param.scope.row.ID}`)
        .then((res) => {
          if (res.data) {
            this.deployMents = res.data.Policies;
          }
        });
      this.page.FlexibleResumeDrawer.visible = true;
    },
    // 点击调度策略按钮
    onClickDispatchStrategy(param) {
      // TODO: 调度策略
    },
    async closeAutoScaleDrawer(type) {
      if (type === 'submit' && this.$refs.autoScale.validateForm()) {
        const params = this.$refs.autoScale.getPolicyData();
        if (this.page.autoScaleDrawer.mode === 'update') {
          const res = await axios.post('autoScale/v1/scale/policy', params);
          if (res.status === 200) {
            this.Prediction(params);
          }
        } else {
          const res = await axios.put('autoScale/v1/scale/policy', params);
          if (res.status === 200) {
            this.Prediction(params);
          }
        }
      } else if (type !== 'submit') {
        this.$refs.autoScaleDrawer.closeDrawer();
      }
    },
    async closeHandleScaleDrawer(type) {
      if (type === 'submit' && this.$refs.handleScale.validateForm()) {
        const params = this.$refs.handleScale.getPolicyData();
        await axios.post('autoScale/v1/scale/task', params);
        this.$refs.handleScaleDrawer.closeDrawer();
      } else if (type !== 'submit') {
        this.$refs.handleScaleDrawer.closeDrawer();
      }
    },
    async Prediction(params) {
      const result = await this.OpenPrediction({
        params: { id: params.AppID },
      });
      if (result.success) {
        this.$refs.autoScaleDrawer.closeDrawer();
      }
    },
    // 合并单元格
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      return spanRow({ row, column, rowIndex, columnIndex },
        this.page.table.data,
        this.page.table.option,
        this.page.table.depOption);
    },
  },
};
</script>

<style lang="scss">
.copyPlanPage {
  .el-select-dropdown__item > span {
    max-width: 370px;
  }
    .cascader-slot-wrapper{
      display: grid;
    grid-template-columns: calc(98% - 60px) 60px;
    column-gap: 2%;
}
}
</style>

<style lang="scss" scoped>
/deep/ .table_page {
  .table_page_main {
    .table_page_search {
      .el-col:nth-child(1) {
        margin-right: 10px;
      }
      .table_page_search__buttons {
        padding-left: 10px;
      }
    }
  }
}
</style>
