/*
 * @Author: wangyunbo
 * @Date: 2021-06-22 15:29:01
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-22 15:31:10
 * @Description: file content
 * @FilePath: \dayByday\vue3\vu3tsvuex\src\use\useStore.ts
 */
import { Store } from "@/store";

import { useStore as VuexStore } from 'vuex'
/**
 * returns whole store object
 */
export function useStore(): Store {
  return VuexStore() as Store
}
// Now we can import useStore directly in our views and components.