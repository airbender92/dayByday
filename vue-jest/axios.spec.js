/*
 * @Author: wangyunbo
 * @Date: 2021-06-02 20:23:25
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-02 20:23:26
 * @Description: file content
 * @FilePath: \dayByday\vue-jest\axios.spec.js
 */
jest.mock('axios', () => ({
  get: Promise.resolve({
    data: '',
    headers: {
      'content-disposition': ''
    }
  }),
  post: Promise.resolve({
    data: "",
    headers: {
      'content-disposition': ''
    }
  })
}))