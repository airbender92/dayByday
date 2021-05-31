/*
 * @Author: wangyunbo
 * @Date: 2021-05-31 18:26:26
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-05-31 18:26:27
 * @Description: file content
 * @FilePath: \dayByday\vue-jest\el-form.spec.js
 */
/*
 * @Author: wangyunbo
 * @Date: 2021-05-31 16:09:47
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-05-31 18:24:30
 * @Description: file content
 * @FilePath: \hatech-monitor-micro-main-ui\tests\unit\main\menu\pwd.spec.js
 */

import Pwd from '@/views/main/menu/pwd.vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import elementUI, { Form, FormItem, Input, Button} from "element-ui";
import Vuex from 'vuex';


let localVue;
let wrapper;
let store;
let state;
let actions;

function createWrapper(params = {}) {
    return shallowMount(Pwd, {
      localVue,
      store,
      data(){
        return {
          passwordDialog: {
            title: "修改密码",
            name: "passwordDialog",
            formWidth: "500px", // form表单宽度
            formDialog: true, // 弹出层的显示隐藏
            formLabelWidth: "90px", // 文本域标题宽度
            formBqWidth: "calc(100% - 150px)", // 文本域宽度
            data: {
              oldPwd: '',//密码
              newPwd: '',//在次数据密码
            },
            rules: {
              oldPwd: [
                { required: true, message: '密码不能为空！', trigger: 'blur' },
                { validator: this.validatePass, trigger: 'blur' }
              ],
              newPwd: [
                { required: true, message: '新密码不能为空！', trigger: 'blur' },
                { validator: this.validatePass, trigger: 'blur' },
                { validator: this.validatePass2, trigger: 'blur' }
              ],
              rePwd: [
                { required: true, message: '新密码不能为空！', trigger: 'blur' },
                { validator: this.validatePass, trigger: 'blur' },
                { validator: this.validatePass3, trigger: 'blur' }
              ]
            }
          },
          pass: 'password',
          checkPass: 'password',
          rePass: 'password'
        }
      },
      stubs: {
        'el-form': Form,
        'el-form-item': FormItem,
        'el-input': Input,
        'el-button': Button,
      },
      methods: {

      },
      ...params
    })
}
beforeEach(() => {
  actions = {
    ChangePwd: jest.fn().mockResolvedValue({
      success: true,
      msg: '操作成功',
      code: 0,
      data: {}
    }),
  }
  localVue = createLocalVue();
  localVue.use(Vuex);
  localVue.use(elementUI);
  store = new Vuex.Store({
    state,
    modules: {
      app: {
        namespaced: true,
        actions,
      }
    },

  })

  wrapper = createWrapper();
});
afterEach(() => {
  wrapper.destroy();
});

describe('pwd.vue', () => {
  it("测试HTML", async () => {
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.dialog-footer').element.nodeName).toBe('DIV');
  });

  it('validatePass 测试 oldPwd', async () => {
    const validatePassSpy = jest.spyOn(Pwd.methods, 'validatePass')

    wrapper = createWrapper();
    const inputDom = wrapper.find('[placeholder="旧密码"]');
    await inputDom.setValue('123');
    await inputDom.trigger('blur');
    expect(validatePassSpy).toHaveBeenCalled()
  })

  it('validatePass 测试 oldPwd 通过', async () => {
    const validatePassSpy = jest.spyOn(Pwd.methods, 'validatePass')

    wrapper = createWrapper();
    const inputDom = wrapper.find('[placeholder="旧密码"]');
    await inputDom.setValue('123456');
    await inputDom.trigger('blur');
    expect(validatePassSpy).toHaveBeenCalled()
  })

  it('validatePass2 测试 不是新密码', async () => {
    const validatePass2Spy = jest.spyOn(Pwd.methods, 'validatePass2')
    wrapper = createWrapper({
      data() {
        return {
          passwordDialog: {
            data: {
              oldPwd: "123456",
            }
          }
        }
      }
    });
    const inputDom = wrapper.find('[placeholder="新密码"]');
    await inputDom.setValue('123456');
    await inputDom.trigger('blur');
    expect(validatePass2Spy).toHaveBeenCalled()
  })

  it('validatePass3 测试', async () => {
    const validatePass3Spy = jest.spyOn(Pwd.methods, 'validatePass3')
    wrapper = createWrapper({
      data() {
        return {
          passwordDialog: {
            data: {
              oldPwd: "123456",
              newPwd: "234567"
            }
          }
        }
      }
    });
    const inputDom = wrapper.findAll('[placeholder="新密码"]').at(1);
    await inputDom.setValue('234567');
    await inputDom.trigger('blur');
    expect(validatePass3Spy).toHaveBeenCalled()
  })

  it('PassSubmit 测试', async () => {
    const PassSubmitSpy = jest.spyOn(Pwd.methods, 'PassSubmit');
    const ChangePwdSpy = jest.spyOn(actions, 'ChangePwd');
    wrapper = createWrapper({
      data() {
        return {
          passwordDialog: {
            data: {
              oldPwd: "Ha123456",
              newPwd: "Ha234567",
              rePwd: 'Ha234567'
            }
          }
        }
      }
    });
    const button = wrapper.findAll('button').at(1);
    await button.trigger('click');
    expect(PassSubmitSpy).toHaveBeenCalled()
    expect(ChangePwdSpy).toHaveBeenCalled()
  })

  it('PassConsole 测试', async () => {
   wrapper.vm.PassConsole();
   await wrapper.vm.$nextTick();
   expect(wrapper.vm.passwordDialog.formDialog).toBe(false)
  })

  it('showPwd 测试', async () => {
    wrapper = createWrapper({
      data(){
        return {
          pass: 'text'
        }
      }
    })
    wrapper.vm.showPwd(1);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.pass).toBe('password')
   })

   it('show 测试', async () => {
    wrapper = createWrapper({
      data(){
        return {
          passwordDialog: {
            formDialog: false
          }
        }
      }
    })
    wrapper.vm.show();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.passwordDialog.formDialog).toBe(true)
   })
})