/*
 * @Author: wangyunbo
 * @Date: 2021-06-22 13:56:14
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-22 14:52:28
 * @Description: file content
 * @FilePath: \dayByday\vue3\vu3tsvuex\src\store\modules\counter\getters.ts
 */
import { GetterTree } from 'vuex'
import {
  CounterGettersTypes,
  CounterStateTypes,
  IRootState
} from './../../interfaces'
export const getters: GetterTree<CounterStateTypes, IRootState> &
  CounterGettersTypes = {
  counterValue: (state: CounterStateTypes) => {
    return state.counter || 0;
  },
  doubledCounter: (state: CounterStateTypes) => {
    return state.counter || 0 * 2;
  }
};