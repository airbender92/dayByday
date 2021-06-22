/*
 * @Author: wangyunbo
 * @Date: 2021-06-22 14:55:59
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-22 14:55:59
 * @Description: file content
 * @FilePath: \dayByday\vue3\vu3tsvuex\src\store\modules\counter\actions.ts
 */
import { ActionTree } from 'vuex'
import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import {
  CounterActionsTypes,
  CounterStateTypes,
  IRootState
} from '../../interfaces'

export const actions: ActionTree<CounterStateTypes, IRootState> &
  CounterActionsTypes = {
  [ActionTypes.GET_COUNTER]({ commit }, payload: number) {
      commit(MutationTypes.SET_COUNTER, payload);
    }
  }