/*
 * @Author: wangyunbo
 * @Date: 2021-06-22 13:49:14
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-22 14:48:03
 * @Description: file content
 * @FilePath: \dayByday\vue3\vu3tsvuex\src\store\interfaces.ts
 */
// we will also have interfaces.ts file which will have all interfaces for our store.
import { ActionContext } from "vuex"
import { MutationTypes as CounterMTypes } from './modules/counter/mutation-types'
import { ActionTypes as CounterATypes } from './modules/counter/action-types'

export interface IRootState {
  root: boolean;
  version: string;
}

export interface CounterStateTypes {
  counter?: number;
  rootDispatch?: boolean
}

export interface CounterGettersTypes {
  doubledCounter(state: CounterStateTypes): number;
  counterValue(state: CounterStateTypes): number;
}

export type CounterMutationsTypes<S = CounterStateTypes> = {
  [CounterMTypes.SET_COUNTER](state: S, payload: number): void;
  [CounterMTypes.RESET_COUNTER](state: S): void;
}

export type AugmentedActionContext = {
  commit<K extends keyof CounterMutationsTypes>(
    key: K,
    payload: Parameters<CounterMutationsTypes[K]>[1]
  ): ReturnType<CounterMutationsTypes[K]>
} & Omit<ActionContext<CounterStateTypes, IRootState>, "commit">;

export interface CounterActionsTypes {
  [CounterATypes.GET_COUNTER](
    { commit }: AugmentedActionContext,
    payload: number
  ): void;
}