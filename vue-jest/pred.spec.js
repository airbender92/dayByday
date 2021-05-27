/*
 * @Author: your name
 * @Date: 2021-04-19 15:18:33
 * @LastEditTime: 2021-05-08 16:18:35
 * @LastEditors: wangyunbo
 * @Description: In User Settings Edit
 * @FilePath: \istorm-cm-ui\tests\unit\main\dataAnalysis\predictValAndActualValAnalysis\predictValAndActualValAnalysis.spec.js
 */
import predictValAndActualValAnalysis from '@/views/main/dataAnalysis/predictValAndActualValAnalysis/index.vue';
import { shallowMount, createLocalVue, config } from '@vue/test-utils'
import HaMainTablePage from "@/components/HaPage/HaMainTablePage/HAMainTablePage";
import Utils from 'hatech-web-utils'
import HatechIcon from 'hatech-web-component-icon'

import HatechUI from 'hatech-ui'
import HatechCanvas from 'hatech-web-component-draw-canvas'
import HatechProperty from 'hatech-web-component-draw-property'
import Vuex from 'vuex';
import elementUI from 'element-ui';
import CommoneUtils from '@/utils';
config.mocks['$utils'] = CommoneUtils;

let wrapper;
let store;
let actions;
let getters;
let state;
const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(elementUI);

// // 绑定工具集
localVue.use(Utils)
// // 使用图标组件
localVue.use(HatechIcon)
localVue.use(HatechUI)
localVue.use(HatechCanvas)
localVue.use(HatechProperty)

/**
 *
 * @param {*} params
 * @returns 返回shallowMount参数
 */
function generateOptions(params = {}) {
  return {
    store,
    localVue,
    stubs: {
      'ha-main-table-page': HaMainTablePage
    },
    mocks: {
      $route: {
        params: {
          auths: []
        }
      }
    },
    ...params
  }
}

// 模拟依赖
jest.mock("@/components/HaPage/HaMainTablePage/HAMainTablePage", () => ({
  render(h) {
    h()
  }
}));

beforeEach(() => {
  actions = {
    GetPredictValAndActualValAnalysisList: jest.fn().mockImplementation(() =>
      Promise.resolve({
        success: true,
        msg: '操作成功',
        data: { key: 'value' }
      })
    ),
    QuerySystemList: jest.fn().mockImplementation(() =>
      Promise.resolve({
        success: true,
        msg: '操作成功',
        data: [
          {
            systemCode: 'code',
            systemName: 'name',
            systemId: 'id'
          }
        ]
      })
    ),
    GetSceneList: jest.fn().mockImplementation(() =>
      Promise.resolve({
        success: true,
        msg: '操作成功',
        data: [
          {sceneName: 'name', sceneId: 'id'}
        ]
      })
    ),
    GetIndicatorList: jest.fn().mockImplementation(() =>
      Promise.resolve({
        success: true,
        msg: '操作成功',
        data: [
          {
            capacityIndicatorCode: 'code',
            capacityIndicatorName: 'name',
            capacityIndicatorId: 'id'
          }
        ]
      })
    ),
  };
  state = {
    clientInfo: {
      windowSize: 'lg'
    }
  };
  getters = {
    MENUS: function () {
      return []
    }
  };
  store = new Vuex.Store({
    state,
    modules: {
      dataAnalysis_predictValAndActualValAnalysis: {
        namespaced: true,
        actions
      },
      app: {
        namespaced: true,
        getters
      }
    }
  });
  wrapper = shallowMount(predictValAndActualValAnalysis, generateOptions())
});


describe("predictValAndActualValAnalysis.vue", () => {
  it("测试HTML", async () => {
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.predictVal-actualVal-analysis').element.nodeName).toBe('DIV');
  });

  it("onEvent 方法测试", () => {
    const onSearchResetSpy = jest.spyOn(predictValAndActualValAnalysis.methods, 'onSearchReset')
    wrapper = shallowMount(predictValAndActualValAnalysis, generateOptions({
      data() {
        return {
          page: {
            search: {
              data: {},
              config: [
                {
                  key: 'system',
                  props: {
                    options: []
                  }
                }, {
                  key: 'scene',
                  props: {
                    options: []
                  }
                }, {
                  key: 'indicator',
                  props: {
                    options: []
                  }
                }, {
                  key: 'times',
                  props: {
                    options: []
                  }
                }
              ]
            }
          }
        }
      },
      mocks: {
        $route: {
          params: {
            auths: true
          }
        },
      }
    }));

    const args = {
      params: {},
      event: "onSearchReset"
    }
    wrapper.vm.onEvent(args);
    expect(onSearchResetSpy).toBeCalled();
  });
  it("search 方法测试-page.search.data无值分支", async () => {
    expect.assertions(1);
    wrapper = shallowMount(predictValAndActualValAnalysis, generateOptions({
      data() {
        return {
          page: {
            search: {
              data: {},
              config: [
                {
                  key: 'system',
                  props: {
                    options: []
                  }
                }, {
                  key: 'scene',
                  props: {
                    options: []
                  }
                }, {
                  key: 'indicator',
                  props: {
                    options: []
                  }
                }, {
                  key: 'times',
                  props: {
                    options: []
                  }
                }
              ]
            }
          }
        }
      },
      mocks: {
        $route: {
          params: {
            auths: true
          }
        },
        $message: {
          warning: jest.fn()
        }
      },
    }));
    const param = {}
    wrapper.vm.search(param);
    expect(wrapper.vm.$message.warning).toBeCalledWith("系统、预测场景、指标及时间范围均有值才能查询！");
  });
  it('测试search方法', async () => {
    const assembleChartsOption = jest.spyOn(predictValAndActualValAnalysis.methods, 'assembleChartsOption')
    jest.spyOn(predictValAndActualValAnalysis.methods, 'search');
    wrapper = shallowMount(predictValAndActualValAnalysis, generateOptions({
      data() {
        return {
          systemList: [{ systemId: "33601627cd624d71a2a71b8c0be34b4c" }],
          sceneList: [{ sceneId: "ccc" }],
          indicatorList: [{ capacityIndicatorId: "app_trans_hour_count_t" }],
          system: '33601627cd624d71a2a71b8c0be34b4c',
          scene: 'ccc',
          indicator: 'app_trans_hour_count_t',
          times: ['2021-03-27 16:52:10', '2021-04-26 16:52:10'],
          page: {
            search: {
              data: {
                system: '33601627cd624d71a2a71b8c0be34b4c',
                scene: 'ccc',
                indicator: 'app_trans_hour_count_t',
                times: ['2021-03-27 16:52:10', '2021-04-26 16:52:10'],
              }
            },
            table: {
              data: null
            }
          },
          assembleChartsOption: ()=> {},
          loading: false
        }
      },
      mocks: {
        $route: {
          params: {
            auths: true
          }
        },
        $message: {
          warning: jest.fn()
        }
      },
    }));
    const param = {
      "system": "33601627cd624d71a2a71b8c0be34b4c",
      "scene": 'ccc',
      "indicator": "app_trans_hour_count_t",
      "times": ["2021-03-27 16:52:10", "2021-04-26 16:52:10"],
    };
    wrapper.vm.search(param);
    expect(wrapper.vm.$message.warning).not.toBeCalled();
    expect(actions.GetPredictValAndActualValAnalysisList).toBeCalled();
    await wrapper.vm.$nextTick()
    // expect(assembleChartsOption).toBeCalled()
  });

  it('测试onSearchReset方法', () => {
    expect.assertions(2);
    wrapper = shallowMount(predictValAndActualValAnalysis, generateOptions({
      data() {
        return {
          scene: "aaaaa",
          system: "aaa",
          indicator: "aaa",
          times: ['sss', 'sss'],
        }
      }
    }));
    const result = {
      scene: "",
      system: "",
      indicator: "",
      times: null,
    };
    wrapper.vm.onSearchReset();
    wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.page.search.data).toEqual(result);
    expect(wrapper.vm.$data.page.table.data).toEqual([]);
  });

  it('测试assembleChartsOption方法', () => {
    expect.assertions(2);
    wrapper = shallowMount(predictValAndActualValAnalysis, generateOptions({
      data(){
        return {
          xAxisLabelInterval: 2
        }
      }
    }))
    const data = [
      {
        forecastDate: '2021-10-10 12:13',
        forecastValue: 'value',
        realValue: 'realValue'
      }
    ];
    wrapper.vm.assembleChartsOption(data);
    expect(wrapper.vm.page.chart.chartList[0].config.option.dataZoom[0].endValue).toBe(data.length);
    expect(wrapper.vm.page.chart.chartList[0].config.option.xAxis.axisLabel.interval).toBe(0);
  });

  it('测试querySystemList方法', async () => {
    expect.assertions(2);
    wrapper = shallowMount(predictValAndActualValAnalysis, generateOptions({
      data() {
        return {
          systemList: [{ systemId: "33601627cd624d71a2a71b8c0be34b4c" }],
          sceneList: [{ sceneId: "ccc" }],
          indicatorList: [{ capacityIndicatorId: "app_trans_hour_count_t" }],
          system: '33601627cd624d71a2a71b8c0be34b4c',
          scene: 'ccc',
          indicator: 'app_trans_hour_count_t',
          times: ['2021-03-27 16:52:10', '2021-04-26 16:52:10'],
          page: {
            search: {
              data: {
                system: '33601627cd624d71a2a71b8c0be34b4c',
                scene: 'ccc',
                indicator: 'app_trans_hour_count_t',
                times: ['2021-03-27 16:52:10', '2021-04-26 16:52:10'],
              },
              config: [
                {key: 'system', props: {options: null}}
              ]
            },
          }
        }
      },
      mocks: {
        $route: {
          params: {
            auths: true
          }
        },
      },
    }));
    wrapper.vm.querySystemList();
    expect(actions.QuerySystemList).toBeCalled();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.page.search.config.find(item => item.key === 'system').props.options).toEqual([{name: 'name-code',value: 'id'}])
  });

  it('测试systemChange方法', async () => {
    expect.assertions(5);
    const param = '33601627cd624d71a2a71b8c0be34b4c';
    wrapper.vm.systemChange(param);
    const res = await actions.GetSceneList({
      query: {
        systemId: param,
      }
    });
    expect(res && res.success).toBe(true);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.sceneList).toEqual([{sceneName: 'name', sceneId: 'id'}])
    expect(wrapper.vm.$data.page.search.data.scene).toBe('');
    expect(wrapper.vm.$data.page.search.data.indicator).toBe('');
    expect(wrapper.vm.$data.page.search.config.find(item => item.key === 'scene').props.options).toEqual([{name: 'name', value: 'id'}]);
  });

  it('测试sceneChange方法', async () => {
    expect.assertions(4);
    const param = {
      sceneId: 'd968c8237e593c135a4f77a13c470bfe',
      indicatorType: 1
    };
    await wrapper.vm.sceneChange(param);
    const res = await actions.GetIndicatorList({
      query: param
    });
    expect(res && res.success).toBe(true);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.page.search.data.indicator).toBe('');
    expect(wrapper.vm.indicatorList).toEqual([{capacityIndicatorCode: 'code', capacityIndicatorName: 'name', capacityIndicatorId: 'id'}]);
    expect(wrapper.vm.$data.page.search.config.find(item => item.key === 'indicator').props.options).toEqual([{name: 'name-code', value: 'id'}]);

  });

  it('测试created()', () => {
    expect.assertions(1);
    const querySystemList = jest.spyOn(predictValAndActualValAnalysis.methods, 'querySystemList');
    wrapper = shallowMount(predictValAndActualValAnalysis, generateOptions());
    expect(querySystemList).toHaveBeenCalled();
  })

})

