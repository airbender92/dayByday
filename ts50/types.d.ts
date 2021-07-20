/*
 * @Author: wangyunbo
 * @Date: 2021-07-20 16:50:01
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-07-20 16:51:02
 * @FilePath: \dayByday\ts50\types.d.ts
 * @Description: file content
 */

export type StorageItem = {
  weight: number
}

export type ShipStorage = {
  max: number,
  items: StorageItem[]
}