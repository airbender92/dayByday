/*
 * @Author: wangyunbo
 * @Date: 2021-05-27 15:25:05
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-05-27 16:21:55
 * @Description: file content
 * @FilePath: \dayByday\vue-jest\info.spec.js
 */

import { shallowMount, createLocalVue } from '@vue/test-utils';
import elementUI from "element-ui";
import {HatechIcon} from 'hatech-web-component-icon'
import { HatechDialog } from 'hatech-web-component-dialog'
import {HatechTable} from 'hatech-web-component-table'
import infoShowDialog from '@/views/alarmAnalysis/compnents/infoShowDialog.vue';


let localVue;
let wrapper;

jest.genMockFromModule('hatech-web-component-dialog', () => ({
  render(h) {
    return h();
  }
}));

jest.genMockFromModule('hatech-web-component-table', () => ({
  render(h) {
    return h();
  }
}))

function createWrapper(params = {}) {

    return shallowMount(infoShowDialog, {
      localVue,
      data(){
        return {
          page: {
            table: {
              config: {},
              data: []
            }
          },
          config: {
            dialog: {
              title: '监控信息查询',
              width: '1000px',
              modal: false
            },
            footer: {
              row: {
                type: 'flex',
                gutter: 20,
                justify: 'center'
              }
            }
          },
        }
      },
      stubs: {
        "hatech-icon": HatechIcon,
        "hatech-dialog": HatechDialog,
        "hatech-table": HatechTable,
      },
      ...params
    })
}

beforeEach(() => {
  localVue = createLocalVue();
  localVue.use(elementUI);
  wrapper = createWrapper();
});
afterEach(() => {
  wrapper.destroy();
});

describe("infoShowDialog.vue", () => {

  it("测试HTML", () => {
    expect(wrapper.find(".system").element.nodeName).toBe("DIV");
  });

  it("onEvent 测试", () => {
    expect.assertions(1);
    const showDialogSpy = jest.spyOn(infoShowDialog.methods, 'showDialog')
    wrapper = createWrapper();
    const args = {
      params: {},
      event: "showDialog"
    }
    wrapper.vm.onEvent(args);
    expect(showDialogSpy).toBeCalled()
  });
  it("showDialog 测试", () => {
    // spy $refs.dialog.show(); 因为在stubs中已经挂载了HatechDialog组件， show方法是他自带的，不需要模拟，直接监听即可
    const mockShow = jest.spyOn(HatechDialog.methods, 'show');
    wrapper = createWrapper()
    wrapper.vm.showDialog();
    expect(mockShow).toBeCalled()
  });

})