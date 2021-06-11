/*
 * @Author: wangyunbo
 * @Date: 2021-06-11 17:42:10
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-11 17:42:36
 * @Description: file content
 * @FilePath: \dayByday\vue-jest\vue-router.spec.js
 */
import VueRouter from 'vue-router'

jest.mock('vue-router');
VueRouter.prototype.route = {
  query: {},
  params: {
    auths: true
  }
}