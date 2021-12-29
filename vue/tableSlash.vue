<!--
 * @Author: wangyunbo
 * @Date: 2021-12-29 16:44:01
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-12-29 16:44:03
 * @FilePath: \dayByday\vue\tableSlash.vue
 * @Description: file content
-->
<!--
 * @Author: wangyunbo
 * @Date: 2021-12-27 10:49:09
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-12-27 15:37:12
 * @FilePath: \hatech-bcms-ui-1.0\src\views\main\ra\modelManagement\computeManagement\cellLine.vue
 * @Description: file content
-->
<template>
<canvas ref="tableLine" id='table-cell-line' class="table-cell-line"></canvas>
</template>

<script>
export default {
  name: 'cell-line',
  mounted(){
    this.$nextTick(() => {
      // 需要有个定时来执行，否则获取的尺寸不准
      setTimeout(() => {
        this.drawSlash();
      }, 500)
    })
  },
  methods: {
    drawSlash(){
      const riskDom = this.$parent.$el;
      if(riskDom) {
        const containerRetc = riskDom.getClientRects();
        const {x: containerX, y: containerY} = containerRetc[0];
        const slashCells = riskDom.querySelectorAll('.riskMatrix-tableSlash');
        slashCells.forEach(cell => {
          const domRect = cell.getClientRects();
          const {x: domX, y: domY, width: domWidth, height: domHeight} = domRect[0];
          const startPoint = { x: domX - containerX, y: domY - containerY };
          const endPoint = {x: domX - containerX + domWidth, y: domY - containerY + domHeight};
          this.line(startPoint, endPoint);
        })
      }
    },
    line(startPoint, endPoint, lineWidth=1, lineColor='#999'){
      const canvas = this.$refs.tableLine;
      canvas.width = endPoint.x;
      canvas.height = endPoint.y;
      if(canvas.getContext) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, endPoint.x, endPoint.y);
        ctx.fill();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = lineColor;
        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(endPoint.x, endPoint.y);
        ctx.stroke();
        ctx.closePath();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.table-cell-line{
  z-index: 100;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
