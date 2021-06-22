/*
 * @Author: wangyunbo
 * @Date: 2021-06-22 15:21:22
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-22 15:21:23
 * @Description: file content
 * @FilePath: \dayByday\vue3\vu3tsvuex\src\store\action-types.ts
 */
/**
 * I have also created an action-types.ts and mutation-types.ts inside store folder so that we can have all actions and mutation at one place.
 */
import { ActionTypes as counterTypes } from "./modules/counter/action-types";
import { ActionTypes as rootATypes } from "./modules/root/action-types";

export const AllActionTypes = { ...counterTypes, ...rootATypes };
