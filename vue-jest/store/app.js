/*
 * @Author: wangyunbo
 * @Date: 2021-06-02 17:33:10
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-02 17:39:58
 * @Description: file content
 * @FilePath: \hatech-warning-realtime-micro-main-ui\tests\unit\store\app.spec.js
 */

import appStore from '@/store/app/index.js'
import { StoreModule } from 'hatech-web-core'

describe('store/app/index.js', () => {
  it('index.js', () => {
    expect(appStore).toBeInstanceOf(StoreModule)
  })

  it('mutations/save', () => {
    const state = {
      user: 'user'
    }
    const payload = {
      user: 'user'
    }
    appStore.mutations.save(state, payload)
  })

  it('mutations/setGlobalStateChange', () => {
    const state = {
      user: 'user'
    }
    const onGlobalStateChange = jest.fn((callBack) => {
      const type = "RouterChanged"
      const payload = {}
      callBack({type, payload})
    })
    appStore.mutations.setGlobalStateChange(state, onGlobalStateChange)
  })

  it('mutations/setGlobalState', () => {
    const state = {
      setGlobalState: jest.fn()
    }
    const payload = {
      user: 'user'
    }
    appStore.mutations.setGlobalState(state, payload)
  })
})
