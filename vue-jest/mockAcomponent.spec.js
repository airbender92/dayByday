/*
 * @Author: wangyunbo
 * @Date: 2021-06-03 16:45:54
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-03 17:56:29
 * @Description: file content
 * @FilePath: \dayByday\vue-jest\mockAcomponent.spec.js
 */
import user from '@/views/user/index.vue';
import { shallowMount, createLocalVue } from '@vue/test-utils'
import { HatechTablePage } from 'hatech-web-component-table-page'
import uploadDialog from '@/views/user/upload-dialog.vue'
import elementUI from "element-ui";
import Vuex from 'vuex';
import Page from '@/views/user/config'

let localVue;
let wrapper;
let store;
let state;
let mutations;
let actions;

jest.mock('hatech-web-component-table-page')
HatechTablePage.data = function(){
  return {
    selectedRows: []
  }
}
HatechTablePage.methods = {
    queryTableData: jest.fn(),
    queryTreeData: jest.fn(),
    currFormData: jest.fn(),
    getSelectedRows: jest.fn(() => ([{id: 'id'}]))
}

function createWrapper(params = {}) {
  return shallowMount(user, {
    localVue,
    store,
    stubs: {
      'hatech-table-page': HatechTablePage,
      'upload-dialog': uploadDialog,
    },
    data(){
      return {
        currOrg: {},
        page: Page.call(this),
        flag: '',
        orgId: '',
        code: '',
        tag: 1,
        clickType: '',
        isClick: false
      }
    },
    methods: {

    },
    mocks: {
      $confirm: jest.fn(() => {
        return new Promise(jest.fn(() => 
          wrapper.vm.ResetUserPwd()
        ))
      }),
      $refs: {
        page: {
          selectedRows: [],
          queryTableData: jest.fn(),
          queryTreeData: jest.fn(),
        },
        uploadDialog: {
          orgianinforDia: {
            dialogVisible: false
          }
        }
      },
      $message: {
        warning: jest.fn(),
        success: jest.fn(),
        error: jest.fn()
      }
    },
    ...params
  })
}
beforeEach(() => {

  const mockfunc = jest.fn().mockResolvedValue({
    success: true,
    msg: '操作成功',
    code: 200,
    data: [{id: '1'}]
  })

  state = {
    app: {
      token: 'token'
    }
  } 

actions = {
  getRoleGroup: mockfunc,
  getRole: mockfunc,
  ResetUserPwd: mockfunc,
  UpdateUserStatus: mockfunc,
  FetchCode: mockfunc,
  DeleteUser: mockfunc,
  download: mockfunc,
  export: mockfunc,
}
mutations = {
  changeUrl: jest.fn(),
}

localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(elementUI);
store = new Vuex.Store({
  state,
  modules: {
    user: {
      namespaced: true,
      actions,
      mutations
    }
  },

})

wrapper = createWrapper();
});
afterEach(() => {
wrapper.destroy();
});

describe('views/user/index.vue', () => {
  it('测试html', () => {
    expect(wrapper.find('div').exists()).toBe(true)
  })

  it('onEvent', () => {
    const spy = jest.spyOn(user.methods, 'onSearchReset')
    wrapper = createWrapper();
    const args = {
      event: 'onSearchReset',
      params: {}
    }
    wrapper.vm.onEvent(args);
    expect(spy).toBeCalled()
  })

  it('node-click', () => {
    const node = {
      id: '1'
    }
    wrapper.vm['node-click'](node);
  })

  it('updateTree', () => {
    let val = 1
    wrapper.vm.updateTree(val)
    val = 2 
    wrapper.vm.updateTree(val)
  })

  it('onUploadOrgAction', () => {
    wrapper.vm.onUploadOrgAction()
    expect(wrapper.vm.flag).toBe('org')
  })
  it('onUploadUserAction', () => {
    wrapper.vm.onUploadUserAction()
    expect(wrapper.vm.flag).toBe('user')
  })

  it('onResetPWAction', () => {
    const val = {
      scope: {
        row: {
          id: '1'
        }
      }
    }
    wrapper.vm.$confirm = jest.fn(() => Promise.resolve(() => {
      wrapper.vm.ResetUserPwd({query: val.scope.row.id})
    }))
    wrapper.vm.onResetPWAction(val)
  })

  it('onFormDataChange ', async() => {
    const params = {
      item: {
        label: '所属分类'
      }
    }
    const FetchCodeSpy = jest.spyOn(actions, 'FetchCode');
    wrapper.vm.onFormDataChange(params);
    expect(FetchCodeSpy).toBeCalled()
  })

  it('onCellChange', () => {
    const params = {
      value: ''
    }
    wrapper.vm.$confirm = jest.fn(() => Promise.resolve(() => {
       wrapper.vm.UpdateUserStatus();
    }))
    wrapper.vm.onCellChange(params)
  })

  it('onDownloadUserAction ', () => {
    wrapper.vm.onDownloadUserAction()
  })

  it('onDownloadOrgAction ', () => {
    wrapper = createWrapper({
      data(){
        return {
          currOrg: {
            id: 'id'
          }
        }
      }
    })
    wrapper.vm.onDownloadOrgAction()
  })

  it('onDeleteTableAction ', () => {
    wrapper.vm.onDeleteTableAction()
  })

  it('onDeleteTableAction length!=0', async() => {
    wrapper.vm.$refs.page.selectedRows = [{id: 'id'}]
    wrapper.vm.$confirm = jest.fn(() => Promise.resolve(() => {
      wrapper.vm.DeleteUser({
        params: ['id']
      })
    }))
    wrapper.vm.onDeleteTableAction()
  })

  it('onPaginationChange', async() => {
    wrapper.vm.onPaginationChange();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.clickType).toBe('page')
  })
  it('onSearch ', async() => {
    wrapper.vm.onSearch();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.clickType).toBe('click')
  })

  it('debounceBy', async() => {
    jest.useFakeTimers();
    wrapper.vm.debounceBy();
    expect(wrapper.vm.isClick).toBe(true)
    jest.runOnlyPendingTimers();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isClick).toBe(false)
  })

  it('setDisabled', async () => {
    const list = [{
      currOrg: {
        id: '1',
        children: [{id: '2'}]
    }
    }];
    const value = '5'
    wrapper.vm.setDisabled(list, value)
    await wrapper.vm.$nextTick();
  })

  it('findSelf', () => {
    const list = [{id: 'id', disabled: 0}];
    const id = 'id';
    const val = 'val'
    wrapper.vm.findSelf(list, id, val)
  })
  it('findSelf id不等', () => {
    const list = [{id: 'id', disabled: 0}];
    const id = 'id2';
    const val = 'val'
    wrapper.vm.findSelf(list, id, val)
  })

})