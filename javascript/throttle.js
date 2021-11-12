/*
 * @Author: wangyunbo
 * @Date: 2021-11-12 14:38:32
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-11-12 14:38:33
 * @FilePath: \dayByday\javascript\throttle.js
 * @Description: file content
 */
function throttle(func, timeFrame) {
  var lastTime = 0;
  return function () {
      var now = new Date();
      if (now - lastTime >= timeFrame) {
          func();
          lastTime = now;
      }
  };
}