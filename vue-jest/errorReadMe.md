<!--
 * @Author: wangyunbo
 * @Date: 2021-06-03 09:37:41
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-03 09:38:40
 * @Description: file content
 * @FilePath: \dayByday\typescript\errorReadMe.md
-->
```js
Q: 
TypeError: (0 , _axios.default) is not a function when use jest.mock('axios') inside a *.test.js file

A:
If you want to mock the default and named exports of a module (axios in this case), the property __esModule must be enabled in the return value:
jest.mock('axios', () => ({
    __esModule: true,
    get: jest.fn(() => Promise.resolve({ data: 'data' })),
    default: jest.fn(() => Promise.resolve({ data: 'data' })),
}));
```