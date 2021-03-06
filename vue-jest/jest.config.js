/*
 * @Author: wangyunbo
 * @Date: 2021-04-08 10:42:14
 * @LastEditTime: 2021-06-01 13:05:21
 * @LastEditors: wangyunbo
 * @Description: In User Settings Edit
 * @FilePath: \dayByday\vue-jest\jest.config.js
 */

const path = require("path");

module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testEnvironment: "jsdom",
  collectCoverage: true,
  rootDir: path.resolve(__dirname, "./"),
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/components/**',
    '!src/assets/**',
    '!src/config/**'
  ],
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue'
  ],
  //https://jestjs.io/docs/webpack
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/tests/unit/__mocks__/fileMock.js", // 模拟加载静态文件
      "\\.(css|less)$": "<rootDir>/tests/unit/__mocks__/styleMock.js"
  },
  testMatch: [
    // 匹配测试用例的文件
    "<rootDir>/tests/unit/**/*.spec.js",
  ],
  transform: {
    "^.+\\.(js|jsx)?$": "<rootDir>/node_modules/babel-jest",
    ".*\\.(vue)$": "vue-jest",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!(lodash-es|other-es-lib|hatech-*))"],
  testPathIgnorePatterns: [
    "<rootDir>/tests/e2e",
    "<rootDir>/node_modules" +
    "(?!(vue-awesome|veui|resize-detector|froala-editor|echarts|html2canvas|jspdf))",
    "<rootDir>/node_modules/jsencrypt",
    "<rootDir>/src/utils",
  ],
  snapshotSerializers: ["<rootDir>/node_modules/jest-serializer-vue"],
  setupFiles: ["jest-canvas-mock"],
  globals: {
    CONFIG: '/'
  }
}

