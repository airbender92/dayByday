/*
 * @Author: wangyunbo
 * @Date: 2021-07-28 17:13:52
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-07-28 17:16:17
 * @FilePath: \dayByday\utils\colorTransform.js
 * @Description: file content
 */

 const hexToRgba = (hex, opacity) => {
    let rgbaColor = "";
    let reg = /^#[\da-f]{6}$/i;
    if (reg.test(hex)) {
        rgbaColor = `rgba(${parseInt("0x" + hex.slice(1, 3))},${parseInt(
            "0x" + hex.slice(3, 5)
        )},${parseInt("0x" + hex.slice(5, 7))},${opacity})`;
    }
    return rgbaColor;
}
 let color = [
    "#36CE9E",
    "#FFC005",
    "#FF515A",
    "#8B5CFF",
    "#00CA69"
 ];

const colors = color.map(c => {
   return hexToRgba(c, 1)
})
 
console.log(colors)