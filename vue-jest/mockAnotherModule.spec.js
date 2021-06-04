/*
 * @Author: wangyunbo
 * @Date: 2021-06-04 11:11:00
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-04 11:11:00
 * @Description: file content
 * @FilePath: \dayByday\vue-jest\mockAnotherModule.spec.js
 */
import config from '@/views/autoDiscoveryRules/add/config/index.js';
jest.mock('@/views/autoDiscoveryRules/add/config/api.config', () => {
  return {
    __esModule: true,
    default: jest.fn(() => () => {}),
    $route: {
      query: jest.fn()
    }
  }
})

const obj = {

}
const page = config.call(obj);

describe('views/autoDiscoveryRules/add/config/index.js', () => {
  it('type',() => {
    expect(typeof config).toBe('function')
  })

  it('type',() => {
    expect(typeof page).toBe('object')
  })
})