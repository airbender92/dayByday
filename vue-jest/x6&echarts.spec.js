/*
 * @Author: wangyunbo
 * @Date: 2021-05-27 13:33:49
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-05-27 13:34:37
 * @Description: file content
 * @FilePath: \dayByday\vue-jest\x6&echarts.spec.js
 */

/*
 * @Author: wangyunbo
 * @Date: 2021-05-27 09:23:09
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-05-27 13:25:17
 * @Description: file content
 * @FilePath: \hatech-warning-realtime-micro-main-ui\tests\unit\alarmAnalysis\alarmAnalysis.spec.js
 */
// Mock canvas when run unit test cases with jest. For more browser environment, you can use jest-electron for real browser runtime.
import "jest-canvas-mock";
import { shallowMount, createLocalVue } from '@vue/test-utils';
import elementUI from "element-ui";
import VueRouter from 'vue-router';
import {Graph} from '@antv/x6'
import * as echarts from 'echarts';
import alarmAnalysis from '@/views/alarmAnalysis/index.vue';
import { graphData } from '@/views/alarmAnalysis/config/primeData.js'


let localVue;
let wrapper;
const router = new VueRouter();

const container = document.createElement('div');
container.id = 'os_graph';
const chartDiv = document.createElement('div');
chartDiv.id = 'alarmLine';
document.body.appendChild(container);
document.body.appendChild(chartDiv);

jest.genMockFromModule('hatech-web-component-table', () => ({
  render(h) {
    return h();
  }
}))
jest.mock('@/views/alarmAnalysis/compnents/tailoringDialog.vue', () => ({
  render(h) {
    return h();
  }
}))

function createWrapper(params = {}) {
  const globalGraph = new Graph({
    container,
    width: 500,
    height: 500,
  })
    return shallowMount(alarmAnalysis, {
      localVue,
      router,
      stubs: ['hatech-table', 'tailoringDialog'],
      data(){
        return {
          page: {
            alarmLine: {
              option: {}
            }
          },
          graphData,
          graph: globalGraph
        }
      },
      methods: {
        initGraph: jest.fn()
      },
      mocks: {
        $route: {
          params: {
            auths: true
          }
        },
        $router: {
          push: jest.fn()
        }
      },
      ...params
    })
}

beforeEach(() => {
  localVue = createLocalVue();
  localVue.use(VueRouter);
  localVue.use(elementUI);
  localVue.use(echarts);
  wrapper = createWrapper();
});
afterEach(() => {
  wrapper.destroy();
});

describe("alarmAnalysis.vue", () => {
 
  it("测试HTML", () => {
    console.log('wrapper: ', wrapper)
    expect(wrapper.find(".page_alarm_analysis").element.nodeName).toBe("DIV");
  });

  // it("mounted 测试", () => {
  //   expect.assertions(1);
  //   const fetchDataSpy = jest.spyOn(capacityTopo.methods, 'fetchData');
  //   wrapper = createWrapper();
  //   expect(fetchDataSpy).toBeCalled();
  // });

  // it("onEvent 测试", () => {
  //   expect.assertions(1);
  //   const mockMethod = jest.fn();
  //   wrapper = createWrapper();
  //   const args = {
  //     params: {},
  //     event: mockMethod
  //   }
  //   wrapper.vm.onEvent(args);
  //   expect(mockMethod).not.toBeCalled()
  // });
})
