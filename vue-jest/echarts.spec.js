/*
 * @Author: wangyunbo
 * @Date: 2021-05-27 17:27:36
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-05-27 18:26:05
 * @Description: file content
 * @FilePath: \hatech-warning-realtime-micro-main-ui\tests\unit\dataAnalysis\dataAnalysis.spec.js
 */

import { shallowMount, createLocalVue } from '@vue/test-utils';
import elementUI from "element-ui";
import dataAnalysis from '@/views/dataAnalysis/index.vue';
import * as echarts from 'echarts';

let localVue;
let wrapper;

const chartIds = ['situationLine', 'cpuChart', 'memoryChart', 'pingChart', 'diskChart', 'networkFlowChart', 'webPerfChart']
const fragment = document.createDocumentFragment();
chartIds.forEach(function(id){
  const div = document.createElement('div');
  div.id = id;
  fragment.appendChild(div)
});
document.body.appendChild(fragment);

function createWrapper(params = {}) {

    return shallowMount(dataAnalysis, {
      localVue,
      data() {
        return {
          page: {
            situationLine: {
              option: {}
            },
            cpuBar: {
              option: {}
            },
            memoryBar: {
              option: {}
            },
            pingBar: {
              option: {}
            },
            diskBar: {
              option: {}
            },
            networkLine: {
              option: {}
            },
            webperfLine: {
              option: {}
            },
          },
          dateRange: []
        }
      },
      ...params
    })
}

beforeEach(() => {
  localVue = createLocalVue();
  localVue.use(elementUI);
  localVue.use(echarts);
  wrapper = createWrapper();
});
afterEach(() => {
  wrapper.destroy();
});

describe("dataAnalysis.vue", () => {

  it("测试HTML", () => {
    expect(wrapper.find(".page_data_analysis").element.nodeName).toBe("DIV");
  });

  it('mounted测试', () => {
    expect.assertions(7);
    const initSituationLineSpy = jest.spyOn(dataAnalysis.methods, 'initSituationLine');
    const initCpuBarSpy = jest.spyOn(dataAnalysis.methods, 'initCpuBar');
    const initMemoryChartSpy = jest.spyOn(dataAnalysis.methods, 'initMemoryChart');
    const initPintChartSpy = jest.spyOn(dataAnalysis.methods, 'initPintChart');
    const initDiskChartSpy = jest.spyOn(dataAnalysis.methods, 'initDiskChart');
    const initNetworkChartSpy = jest.spyOn(dataAnalysis.methods, 'initNetworkChart');
    const initWebPerfChartSpy = jest.spyOn(dataAnalysis.methods, 'initWebPerfChart');
    wrapper = createWrapper();
    expect(initSituationLineSpy).toBeCalled();
    expect(initCpuBarSpy).toBeCalled();
    expect(initMemoryChartSpy).toBeCalled();
    expect(initPintChartSpy).toBeCalled();
    expect(initDiskChartSpy).toBeCalled();
    expect(initNetworkChartSpy).toBeCalled();
    expect(initWebPerfChartSpy).toBeCalled();
  });

  it('resize测试', () => {
    const testWidth = 420;
    const mychart = echarts.init(document.getElementById('situationLine'));
    mychart.resize = jest.fn();
    const windowSpy = jest.fn().mockImplementation(() => {
      mychart.resize();
    });
    window.addEventListener('resize', windowSpy);
    window.dispatchEvent(new Event('resize'));
    window.innerWidth = testWidth;
    expect(mychart.resize).toBeCalled()
  })
})
