/*
 * @Author: wangyunbo
 * @Date: 2021-06-22 14:59:29
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-22 15:02:05
 * @Description: file content
 * @FilePath: \dayByday\vue3\vu3tsvuex\src\store\modules\counter\index.ts
 */
import { Module } from 'vuex'
import { CounterStateTypes, IRootState } from '../../interfaces'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { state } from './state'

// Module
const counter: Module<CounterStateTypes, IRootState> = {
  state,
  getters,
  mutations,
  actions
}

export default counter;