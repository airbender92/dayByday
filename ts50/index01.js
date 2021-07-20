/*
 * @Author: wangyunbo
 * @Date: 2021-07-19 08:55:56
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-07-20 18:01:08
 * @FilePath: \dayByday\ts50\index01.js
 * @Description: file content
 */

// @ts-check
/**
 * @typedef { import('./@types/types').ShipStorage } ShipStorage
 */
/** @typedef { import('./@types/types').StorageItem } StorageItem */

// Object.defineProperty(storage, 'max', {})

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
/**
 * 
 * @param {StorageItem} item 
 */
function add(item) {
  if (storage.max - item.weight >= storageUsed()) {
    storage.items.push(item)
    currentStorage += item.weight
  }
  $('#numberOfItems').text(storage.items.length)
}

/**@type ShipStorage */
const storage = {
  max: undefined,
  items: []
}