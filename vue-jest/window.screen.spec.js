/*
 * @Author: wangyunbo
 * @Date: 2021-09-23 18:06:53
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-09-23 18:06:55
 * @FilePath: \dayByday\vue-jest\window.screen.spec.js
 * @Description: file content
 */
You can use spyOn on window.secreen.width and return the value you need for you test:

jest.spyOn(window.screen, "width", "get").mockReturnValue(WIDTH);
Your tests will then look like:


it("Should NOT render WebFeatures in small screen", () => {
  jest.spyOn(window.screen, "width", "get").mockReturnValue(1000);
  const wrapper = mount(<YourComponent />);
  expect(wrapper.find("WebFeatures").exists()).toBe(false);
});

it("Should render WebFeatures in large screen", () => {
  jest.spyOn(window.screen, "width", "get").mockReturnValue(1001);
  const wrapper = mount(<YourComponent />);
  expect(wrapper.find("WebFeatures").exists()).toBe(true);
});