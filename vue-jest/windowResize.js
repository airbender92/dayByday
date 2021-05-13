/*
 * @Author: wangyunbo
 * @Date: 2021-05-13 10:21:00
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-05-13 10:21:11
 * @Description: file content
 * @FilePath: \dayByday\windowResize.js
 */
it('window resize 测试', () => {
  expect.assertions(3);
  const testWidth = 420;
  const windowSpy = jest.fn();
  window.addEventListener('resize', windowSpy);
  wrapper = createWrapper();
  expect(windowSpy).not.toBeCalled();
  window.innerWidth = testWidth;
  window.dispatchEvent(new Event('resize'));
  expect(windowSpy).toBeCalled();
  wrapper.vm.$nextTick();
  expect(window.innerWidth).toBe(testWidth);
})