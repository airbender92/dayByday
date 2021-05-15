/*
 * @Author: wangyunbo
 * @Date: 2021-05-15 13:25:37
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-05-15 13:26:00
 * @Description: file content
 * @FilePath: \dayByday\g6\截取label长度.js
 */
/**
     * @description 截取字符串长度
     * @param {string} str 字符串
     * @param {number} maxWidth 最大长度
     * @param {number} fontSize 字体大小
     */
 fittingString(str, maxWidth, fontSize) {
  const ellipsis = '...';
  const ellipsisLength = G6.Util.getTextSize(ellipsis, fontSize)[0];
  let currentWidth = 0;
  let res = str;
  const pattern = new RegExp('[\u4E00-\u9FA5]+'); // distinguish the Chinese charactors and letters
  str.split('').forEach((letter, i) => {
    if (currentWidth > maxWidth - ellipsisLength) return;
    if (pattern.test(letter)) {
      // Chinese charactors
      currentWidth += fontSize;
    } else {
      // get the width of single letter according to the fontSize
      currentWidth += G6.Util.getLetterWidth(letter, fontSize);
    }
    if (currentWidth > maxWidth - ellipsisLength) {
      res = `${str.substr(0, i)}${ellipsis}`;
    }
  });
  return res;
}