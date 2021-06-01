/*
 * @Author: zhoujingrong
 * @Date: 2021-02-05 09:37:02
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-01 19:26:32
 * @description: 
 */
import { StoreModule } from 'hatech-web-core'

import services from './service'
export default new StoreModule({
    namespace: true,
    state: {
    },
    mutations: {
    },
    services
})


jest.mock('hatech-web-core')

import indexStore from '@/store/menu/index.js'

import { StoreModule } from 'hatech-web-core';

describe('store/menu/index.js', () => {
  it('index.js', () => {
    expect(typeof indexStore.inject).toBe('function')
    expect(indexStore).toBeInstanceOf(StoreModule)
  })
})