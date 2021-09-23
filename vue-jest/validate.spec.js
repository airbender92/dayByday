/*
 * @Author: wangyunbo
 * @Date: 2021-09-23 18:00:20
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-09-23 18:00:21
 * @FilePath: \dayByday\vue-jest\validate.spec.js
 * @Description: file content
 */
wrapper.vm.$refs = {
      eventResponse: {
        validate: jest.fn(cb => {
          const valid = true
          cb(valid)
        }),
        resetFields: jest.fn()
      }
    }