/*
 * @Author: wangyunbo
 * @Date: 2022-02-17 16:40:49
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-02-17 16:40:52
 * @FilePath: \dayByday\javascript\doubleClick.js
 * @Description: file content
 */


In order to fix this, I removed the dblclick handler completely and began checking for double clicks within the click handler.


let numClicks = 0;
const handleClick = () => {
  numClicks++;
  if (numClicks === 1) {
    singleClickTimer = setTimeout(() => {
      numClicks = 0;
      console.log("single click!");
    }, 400);
  } else if (numClicks === 2) {
    clearTimeout(singleClickTimer);
    numClicks = 0;
    console.log("double click!");
  }
};
document.addEventListener("click", handleClick);
numClicks is a global count variable for the number of clicks that have occurred so far.

The first click will always trigger the timer singleClickTimer, which runs for 400ms. If a second click happens within that 400ms, then a double click will be registered, and the timer (as well as the callback) will be cleared.