/*
 * @Author: wangyunbo
 * @Date: 2021-06-22 15:15:44
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-22 15:18:51
 * @Description: file content
 * @FilePath: \dayByday\vue3\vu3tsvuex\src\store\modules\root\index.ts
 */
import { Module, ModuleTree } from 'vuex'
import { IRootState } from "../..//interfaces";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { state } from "./state";
import counterModule from "../counter";

// Modules
const modules: ModuleTree<IRootState> = {
  counterModule,
}

const root: Module<IRootState, IRootState> = {
  state,
  getters,
  mutations,
  actions,
  modules
}

export default root;