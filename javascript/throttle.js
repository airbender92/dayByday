/*
 * @Author: wangyunbo
 * @Date: 2021-11-12 14:38:32
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-11-17 15:47:44
 * @FilePath: \dayByday\javascript\throttle.js
 * @Description: file content
 */
function throttle(func, timeFrame) {
  var lastTime = 0;
  return function (...args) {
      var now = new Date();
      if (now - lastTime >= timeFrame) {
          func.apply(this, args);
          lastTime = now;
      }
  };
}