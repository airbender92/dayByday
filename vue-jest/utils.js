/*
 * @Author: wangyunbo
 * @Date: 2021-07-07 11:05:11
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-07-07 11:05:11
 * @Description: file content
 * @FilePath: \dayByday\vue-jest\utils.js
 */
/*
 * @Author: dwb
 * @Date: 2021-02-08 15:43:34
 * @LastEditors: dwb
 * @LastEditTime: 2021-06-07 17:22:01
 * @Description: file content
 */
// 创建一个独立作用域的 Vue 构造函数
import { createLocalVue } from '@vue/test-utils'
// 引用elementui
import ElementUI from 'element-ui'
// 引用自定义的组件
import components from '@/components'
// 引用vuex
import vuex from 'vuex'
import * as common from "@/utils/common.js"

// 引用公司组件
//
import { HatechDialog } from "hatech-web-component-dialog";
import { HatechIcon } from 'hatech-web-component-icon'
import { HatechTablePage } from "hatech-web-component-table-page";
import { HatechTree } from "hatech-web-component-tree";
import { HatechForm } from "hatech-web-component-form";
import { HatechFormDialog } from "hatech-web-component-form-dialog";
import { HatechTable } from "hatech-web-component-table";
import { HatechPagination } from "hatech-web-component-pagination";
import { mixins } from 'hatech-web-component'

import hatechWebUtils from 'hatech-web-utils'

import mockMessage from './mockMessage'


const localVue = createLocalVue()
localVue.use(ElementUI)
localVue.use(components)
localVue.use(vuex)

localVue.use(hatechWebUtils)

localVue.use(HatechTablePage)
localVue.use(HatechDialog)
localVue.use(HatechIcon)
localVue.use(HatechTree)
localVue.use(HatechForm)
localVue.use(HatechFormDialog)
localVue.use(HatechTable)
localVue.use(HatechPagination)

localVue.mixin(mixins)


const createVuex = modules => {
    return new vuex.Store({
        strict: false,
        state: {},
        mutations: {},
        actions: {},
        modules: { ...modules }
    })
}
const createMocks = (routeName = 'defaultName', options = {}) => {
    const defMocks = {
        $route: { name: routeName, params: {}, query: {} },
        $router: { push: jest.fn(), replace: jest.fn() },
        $confirm: jest.fn(() => Promise.resolve()),
        $utils: localVue.prototype.$utils,
        $message: mockMessage(),
        ...common
    }
    return { ...defMocks, ...options }
}


/**
 *
 * @param {*} data
 * {
 * success: true,
 * data:{
 *    code: 200,
 *    msg: "操作成功"
 *    ...
 * },
 * msg:"操作成功"
 * }
 */
const successData = (
    props = {
        code: 200,
        data: '',
        count: 1,
        msg: '操作成功',
        time: '2021-03-11 16:38:05'
    }
) => {
    const { code, count, data, msg, time } = props
    return {
        success: true,
        code,
        count,
        data,
        msg,
        time
    }
}

const failData = (props = {
    code: 203, count: 0, data: null, msg: "请求失败", time: '2021-05-27 16:38:05'
}) => {
    const { code, count, data, msg, time } = props
    return {
        success: false,
        msg: msg || '请求失败',
        code,
        count,
        data,
        time
    }
}

/**
 * @param {*} $confirm mocks.$confirm
 * @returns $confirm msg
 */
const confirmMsg = $confirm => {
    return $confirm.mock.calls[0][0]
}
/**
 * @param {*} $message mocks.$message.warning
 * @returns warning [['消息1','消息2']]
 */
const warningMsg = $message => {
    return $message.mock.calls.flat()
}
/**
 * @param {*} $message mocks.$message.success
 * @returns success [['消息1','消息2']]
 */
const successMsg = $message => {
    return $message.mock.calls.flat()
}

/**
 * 获取message的参数
 * @param {*} $message mocks.$message
 * @returns {*}  调用$message传入的参数
 */
const messageParams = $message => {
    return $message.mock.calls[0][0]
}


export { localVue, createVuex, createMocks, successData, failData, confirmMsg, warningMsg, successMsg, messageParams }
