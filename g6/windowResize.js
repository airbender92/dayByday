/*
 * @Author: wangyunbo
 * @Date: 2021-05-15 10:42:29
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-05-15 10:42:50
 * @Description: file content
 * @FilePath: \dayByday\g6\windowResize.js
 */
window.addEventListener("resize", () => {
  if (this.graph) {
    setTimeout(() => {
      const container = document.getElementById('capacityTopo');
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      this.graph.changeSize(width, height);
      this.graph.layout();
      this.graph.fitView();
    }, 500);
  }
});