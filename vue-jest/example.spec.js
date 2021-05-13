/*
 * @Author: wangyunbo
 * @Date: 2021-05-13 09:30:14
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-05-13 11:22:01
 * @Description: file content
 * @FilePath: \dayByday\vue-jest\example.spec.js
 */

import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import elementUI from "element-ui";

import Vuex from 'vuex';

import capacityTopo from  '@/views/main/visualization/capacityTopo';

let localVue;
let store;
let actions;
let router;
let wrapper;

// 模拟依赖
jest.mock("@/components/HaPage/HaMainTablePage/HAMainTablePage", () => ({
  render(h) {
    return h();
  }
}))

function createWrapper(params = {}, needMount = false) {
  if (needMount) {
    return mount(capacityTopo, {
      localVue,
      store,
      router,
      stubs: ["ha-main-table-page"],
      mocks: {
        $route: {
          params: {
            auths: true
          }
        }
      },
      ...params
    })
  } else {
    return shallowMount(capacityTopo, {
      localVue,
      store,
      router,
      stubs: ["ha-main-table-page"],
      mocks: {
        $route: {
          params: {
            auths: true
          }
        }
      },
      ...params
    })
  }

}

beforeEach(() => {
  localVue = createLocalVue();
  localVue.use(Vuex);
  localVue.use(elementUI);
  actions = {
    GetCapacityTopoDatas: jest.fn().mockImplementation(() =>
      Promise.resolve({
        success: true,
        code: 200,
        data: {
          combos: [],
          edges: [{source: 1, target: 2}],
          nodes: [{id: 1, name: 'name'}, {id: 2, name: 'name2'}]
        }
      })
    ),
    GetFrameworkNodeDetail: jest.fn().mockImplementation(() =>
    Promise.resolve({
      success: true,
      code: 200,
      data: {}
    })
  ),

  },
    store = new Vuex.Store({
      state: {},
      modules: {
        capacityTopoModule: {
          namespaced: true,
          actions
        },
        frameworkTopoModule: {
          namespaced: true,
          actions
        },
      }
    }),
    wrapper = createWrapper()
});
afterEach(() => {
  wrapper.destroy();
});

describe("capacityTopo.vue", () => {
  it("测试HTML", () => {
    expect(wrapper.find(".capacity-topo").element.nodeName).toBe("DIV");
  });

  it("mounted 测试", () => {
    expect.assertions(1);
    const fetchDataSpy = jest.spyOn(capacityTopo.methods, 'fetchData');
    wrapper = createWrapper();
    expect(fetchDataSpy).toBeCalled();
  });

  it('window resize 测试', () => {
    expect.assertions(3);
    const testWidth = 420;
    const windowSpy = jest.fn();
    window.addEventListener('resize', windowSpy);
    wrapper = createWrapper();
    expect(windowSpy).not.toBeCalled();
    window.innerWidth = testWidth;
    window.dispatchEvent(new Event('resize'));
    expect(windowSpy).toBeCalled();
    wrapper.vm.$nextTick();
    expect(window.innerWidth).toBe(testWidth);
  });

  it("onEvent 测试", () => {
    expect.assertions(1);
    const mockMethod = jest.fn();
    wrapper = createWrapper();
    const args = {
      params: {},
      event: mockMethod
    }
    wrapper.vm.onEvent(args);
    expect(mockMethod).not.toBeCalled()
  });

  it("fetchData 测试", async () => {
    expect.assertions(3);
    const initSyp = jest.spyOn(capacityTopo.methods, 'init');
    wrapper = createWrapper();
    const createTreeData = jest.fn();
    const uniqueKey = jest.fn();
    const getMaxFloor = jest.fn();
    wrapper.vm.fetchData();
    expect(actions.GetCapacityTopoDatas).toBeCalled();
    await wrapper.vm.$nextTick();
    createTreeData();
    uniqueKey();
    getMaxFloor();
    expect(wrapper.vm.totalLevel).toBe(2);
    expect(initSyp).toBeCalled();
  })
})
