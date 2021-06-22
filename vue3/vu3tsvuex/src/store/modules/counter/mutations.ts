/*
 * @Author: wangyunbo
 * @Date: 2021-06-22 14:52:42
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-22 14:52:43
 * @Description: file content
 * @FilePath: \dayByday\vue3\vu3tsvuex\src\store\modules\counter\mutations.ts
 */
import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { CounterMutationsTypes, CounterStateTypes } from './../../interfaces'

export const mutations: MutationTree<CounterStateTypes> &
  CounterMutationsTypes = {
  [MutationTypes.SET_COUNTER](state: CounterStateTypes, payload: number) {
      state.counter = payload;
  },
  [MutationTypes.RESET_COUNTER](state: CounterStateTypes) {
      state.counter = 0
    }
  }