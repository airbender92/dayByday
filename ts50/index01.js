/*
 * @Author: wangyunbo
 * @Date: 2021-07-19 08:55:56
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-07-19 09:04:20
 * @FilePath: \dayByday\ts50\index01.js
 * @Description: file content
 */

// @ts-check
const storage = {
  max: undefined,
  items: []
}

Object.defineProperty(storage, 'max', { readonly: true, val: 5000 })

let currentStorage = 'undefined'

function storageUsed() {
  if (currentStorage) {
    return currentStorage
  }
  currentStorage = 0
  for (const i = 0; i < storage.length(); i++) {
    currentStorage += storage.items[i].weight
  }
  return currentStorage
}

function add(item) {
  if (storage.max - item.weight >= storageUsed) {
    storage.items.add(item)
    currentStorage += item.weight
  }
}
