<!--
 * @Author: wangyunbo
 * @Date: 2021-09-06 17:57:07
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-09-06 17:58:37
 * @FilePath: \dayByday\sass\grid-expand-width.md
 * @Description: file content
-->

![解决grid内存扩展item的尺寸问题](https://stackoverflow.com/questions/52861086/why-does-minmax0-1fr-work-for-long-elements-while-1fr-doesnt)



Because 1fr is equivalent to minmax(auto, 1fr), by default.

When you use minmax(0, 1fr), that's something different than standalone 1fr.

In the first case, the track cannot be smaller than the size of the grid item (min size is auto).

In the second case, the track is free to resize to a 0 width/height.


By default, a grid item cannot be smaller than the size of its content.

Grid items have an initial size of min-width: auto and min-height: auto.

You can override this behavior by setting grid items to min-width: 0, min-height: 0 or overflow with any value other than visible

.card-scroll {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 20px;
    overflow-x: hidden;
  }