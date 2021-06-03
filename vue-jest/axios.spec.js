/*
 * @Author: wangyunbo
 * @Date: 2021-06-02 20:23:25
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-03 09:46:07
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


// 或者

const mockAxios = jest.genMockFromModule('axios');
mockAxios.create = jest.fn(() => mockAxios)

mockAxios.get.mockResolvedValue({
  data: '',
  headers: {
    'content-disposition': ''
  }
})
mockAxios.post.mockResolvedValue({
  data: '',
  headers: {
    'content-disposition': ''
  }
})