/*
 * @Author: wangyunbo
 * @Date: 2021-06-22 15:21:41
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-22 15:28:29
 * @Description: file content
 * @FilePath: \dayByday\vue3\vu3tsvuex\src\store\mutation-types.ts
 */
/**
 * Note: since i am spreading types, in case of same action/mutation types might override. we can prevent this by using namespace or completely avoiding this.
 */
import { MutationTypes as counterTypes } from "./modules/counter/mutation-types";
import { MutationTypes as rootMTypes } from "./modules/root/mutation-types";

export const AllMutationTypes = { ...counterTypes, ...rootMTypes };
