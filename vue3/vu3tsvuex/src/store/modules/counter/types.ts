/*
 * @Author: wangyunbo
 * @Date: 2021-06-22 15:02:26
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-22 15:14:26
 * @Description: file content
 * @FilePath: \dayByday\vue3\vu3tsvuex\src\store\modules\counter\types.ts
 */
import {
  CounterStateTypes,
  CounterMutationsTypes,
  CounterGettersTypes,
  CounterActionsTypes
} from '../../interfaces'

import { Store as VuexStore, CommitOptions, DispatchOptions } from 'vuex'

export type CounterStoreModuleTypes<S = CounterStateTypes> = Omit<
  VuexStore<S>, 'commit' | 'getters' | 'dispatch'> & {
  commit<
    K extends keyof CounterMutationsTypes,
    P extends Parameters<CounterMutationsTypes[K]>[1]
      >(
        key: K,
        payload?: P,
        options?: CommitOptions
  ): ReturnType<CounterMutationsTypes[K]>
} & {
  gettters: {
    [K in keyof CounterGettersTypes]: ReturnType<CounterGettersTypes[K]>;
  }
} & {
  dispatch<K extends keyof CounterActionsTypes>(
    key: K,
    payload?: Parameters<CounterActionsTypes[K]>[1],
    options?: DispatchOptions
  ): ReturnType<CounterActionsTypes[K]>
}