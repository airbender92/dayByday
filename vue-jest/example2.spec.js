/*
 * @Author: wangyunbo
 * @Date: 2021-05-31 15:51:57
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-05-31 15:51:58
 * @Description: file content
 * @FilePath: \dayByday\vue-jest\example2.spec.js
 */
/*
 * @Author: wangyunbo
 * @Date: 2021-05-31 09:38:45
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-05-31 15:49:53
 * @Description: file content
 * @FilePath: \hatech-monitor-micro-main-ui\tests\unit\main\index.spec.js
 */
import Main from '@/views/main/index.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import { HatechBreadcurmb } from "hatech-web-component-breadcurmb";
// 使用布局
import { HatechLayout } from "hatech-web-layout-husmc";
import { start } from "qiankun";
import elementUI from "element-ui";
import DetailInfo from "@/views/main/menu/detailInfo.vue";
import Vuex from 'vuex';
import VueRouter from 'vue-router'

const Pwd = {
  template: '<div/>',
  methods: {
    show: jest.fn(),
    PassConsole: jest.fn()
  }
}

let localVue;
let wrapper;
const router = new VueRouter({
  routes: [
    { name: 'login', path: '/'},
    { name: 'nextPage', path: '/nextPage'},
  ]
});
let store;
let state;
let actions;
let getters;
let mutations;

const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
}

const mockThemeMethods = {
  change: jest.fn()
}
const mockMessage = {
  success: jest.fn()
}

function createWrapper(params = {}) {
    return shallowMount(Main, {
      localVue,
      router,
      store,
      stubs: {
        'hatech-breadcurmb': HatechBreadcurmb,
        'hatech-layout': HatechLayout,
        'detail-info': DetailInfo,
        "Pwd": Pwd,
      },
      data(){
        return {
          tag: 0,
          headerMenus: [
            {
              show: true,
              type: "table",
              name: "消息",
              icon: "xiaoxi_icon",
              code: "message",
              props: {
                show: false,
                popover: {
                  placement: "bottom",
                  width: 500,
                  visibleArrow: false,
                },
                table: {
                  data: [],
                  config: {
                    table: {
                      maxHeight: "300px",
                    },
                    columns: [
                      {
                        type: "text",
                        prop: "title",
                        label: "标题",
                        width: 100,
                      },
                      {
                        type: "text",
                        prop: "content",
                        label: "内容",
                        props: {
                          "show-overflow-tooltip": true,
                        },
                      },
                      {
                        type: "text",
                        prop: "createTime",
                        label: "发送时间",
                      },
                      {
                        label: "操作",
                        type: "action",
                        prop: "action",
                        props: {
                          options: [
                            {
                              code: "table-inner-detail",
                              event: "onDetailTableAction",
                              label: "查看",
                              type: "primary",
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              },
              badge: {
                max: 1999,
                value: "",
              },
            },
          ],
          currMenu: []
        }
      },
      methods: {

      },
      mocks: {
        $route: {
          params: {
            auths: true
          }
        },
        $router: mockRouter,
        $message: mockMessage,
        $utils: {
          tree: {
            deepGet: jest.fn(() => ({
              path: '/home'
            }))
          }
        },
        $theme: {
          themes: [
            {
              key: 'dark'
            }
          ],
          ...mockThemeMethods
        }
      },
      ...params
    })
}
beforeEach(() => {
  state = {
    showBreadcurmb: true,
    user: {
      id: '1'
    },
    msgBadges: {
      messageCount: 10
    }
  }
  actions = {
    ChangePwd: jest.fn().mockResolvedValue({
      success: true,
      msg: '操作成功',
      code: 0,
      data: {}
    }),
    FetchUserByToken: jest.fn().mockResolvedValue({
      success: true,
      msg: '操作成功',
      code: 0,
      data: {}
    }),
    ConnectMessageWebSocket: jest.fn().mockResolvedValue({
      success: true,
      msg: '操作成功',
      code: 0,
      data: {}
    }),
  }
  mutations = {
    Logout: jest.fn(),
    LoadMicroApp: jest.fn(),
    save: jest.fn((payload) => {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
    })
    })
  }
  getters = {
    CURRPAGE: () => ({
      meta: {
        microPath: ''
      },
      name: 'curPage'
    }),
    MENUS: () => ([]),
    USER: () => ({}),
    LOADING: () => false
  }
  localVue = createLocalVue();
  localVue.use(VueRouter);
  localVue.use(Vuex);
  localVue.use(elementUI);
  store = new Vuex.Store({
    state,
    modules: {
      app: {
        namespaced: true,
        actions,
        getters,
        mutations
      }
    },

  })

  wrapper = createWrapper();
});
afterEach(() => {
  wrapper.destroy();
});

describe('main/index.vue', () => {
  it("测试HTML", async () => {
    await wrapper.vm.$nextTick();
    expect(wrapper.find('#container').element.nodeName).toBe('DIV');
  });

  it('mounted测试', async () => {
    const FetchUserByTokenSpy = jest.spyOn(actions, 'FetchUserByToken');
    expect(FetchUserByTokenSpy).toBeCalled()
  });

  it('onEvent', async () => {
    const onDropdownEventSpy = jest.spyOn(Main.methods, 'onDropdownEvent');
    wrapper = createWrapper()
    const avgs = {
      event: 'onDropdownEvent',
      params: {}
    }
    wrapper.vm.onEvent(avgs);
    expect(onDropdownEventSpy).toBeCalled()
  });

  it('onClickMainMenu 测试', () => {
    const params = {
      menu: [{id: 1, name: '菜单'}],
      collapse: false
    }
    wrapper.vm.onClickMainMenu(params);
    expect(wrapper.vm.currMenu).toEqual([{id: 1, name: '菜单'}])
    expect(wrapper.vm.showSider).toBe(false)
  });

  it('onClickMenu 测试', () => {
    const params = {
      code: '1'
    }
    wrapper.vm.onClickMenu(params);
  });

  it('onDropdownEvent 测试', () => {
    const args = {
      menu: {code: 'theme'},
      event: 'onClickMenu',
      params: 'dark'
    }
    wrapper.vm.onDropdownEvent(args);
    expect(mockThemeMethods.change).toBeCalled();
    expect(mockMessage.success).toBeCalled();
  });

  it('onLogout测试', () => {
    const LogoutSpy = jest.spyOn(mutations, 'Logout');
    wrapper = createWrapper();
    wrapper.vm.onLogout();
    expect(LogoutSpy).toBeCalled()
  });

  it('onClickOption测试', async() => {
    const option = {
      code: 'nextPage',
      children: [
        {
          isShow: false
        }
      ]
    }
    wrapper.vm.onClickOption(option);
  });

  it('onDetailInfo测试', async() => {
    const showSpy = jest.spyOn(DetailInfo.methods, 'show');
    wrapper = createWrapper()
    wrapper.vm.onDetailInfo();
    expect(showSpy).toBeCalled()
  });

  it('onChangePassWord测试', () => {
    const showSpy = jest.spyOn(Pwd.methods, 'show');
    wrapper = createWrapper();
    wrapper.vm.onChangePassWord();
    expect(wrapper.vm.tag).toBe(1);
    expect(showSpy).toBeCalled();
  });

  it('onCloseDialog测试', () => {
    const PassConsoleSpy = jest.spyOn(Pwd.methods, 'PassConsole');
    wrapper = createWrapper();
    wrapper.setData({ tag: 1 })
    wrapper.vm.onCloseDialog();
    expect(PassConsoleSpy).toBeCalled();
  });

  it('onDetailTableAction测试', async() => {
    wrapper = createWrapper()
    wrapper.vm.onDetailTableAction();
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.headerMenus[0].props.show).toBe(false)
  });
})