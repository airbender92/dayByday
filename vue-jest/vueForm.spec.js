/*
 * @Author: wangyunbo
 * @Date: 2021-05-31 16:40:27
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-05-31 16:41:37
 * @Description: file content
 * @FilePath: \dayByday\vue-jest\vueForm.spec.js
 */
const value = wrapper.find('input').element.value
const value2 = wrapper.vm.$refs.emailField.currentValue
const inputField: HTMLInputElement = wrapper.find('input').element as HTMLInputElement
const value3 = inputField.value