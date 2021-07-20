/*
 * @Author: wangyunbo
 * @Date: 2021-07-19 08:55:56
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-07-20 14:34:13
 * @FilePath: \dayByday\ts50\index01.js
 * @Description: file content
 */

// @ts-check
const storage = {
  max: undefined,
  items: []
}

Object.defineProperty(storage, 'max', {})

let currentStorage = undefined

function storageUsed() {
  if (currentStorage) {
    return currentStorage
  }
  currentStorage = 0
  for (let i = 0; i < storage.length(); i++) {
    currentStorage += storage.items[i].weight
  }
  return currentStorage
}

function add(item) {
  if (storage.max - item.weight >= storageUsed()) {
    storage.items.push(item)
    currentStorage += item.weight
  }
}
