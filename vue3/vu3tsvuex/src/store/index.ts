/*
 * @Author: wangyunbo
 * @Date: 2021-06-22 13:49:04
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-22 15:27:05
 * @Description: file content
 * @FilePath: \dayByday\vue3\vu3tsvuex\src\store\index.ts
 */
import { createStore } from 'vuex'
import { IRootState } from '../store/interfaces'
import { CounterStoreModuleTypes } from './modules/counter/types'
import { RootStoreModuleTypes } from './modules/root/types'

import root from './modules/root'

export const store = createStore<IRootState>(root);

type StoreModules = {
  counter: CounterStoreModuleTypes,
  root: RootStoreModuleTypes
}
export type Store = CounterStoreModuleTypes<Pick<StoreModules, 'counter'>> &
  Counter1StoreModuleTypes<Pick<StoreModules, 'counter1'>> &
  RootStoreModuleTypes<Pick<StoreModules, 'root'>>;