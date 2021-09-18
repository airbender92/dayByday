<!--
 * @Author: wangyunbo
 * @Date: 2021-09-18 13:32:16
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-09-18 13:32:20
 * @FilePath: \dayByday\vue\echarts.vue
 * @Description: file content
-->
<!--
 * @Author: wangyunbo
 * @Date: 2021-09-13 15:30:16
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-09-18 13:30:13
 * @FilePath: \istorm-draas-tenant-ui\src\views\screen\monitorScreen\component\echartView\echartView.vue
 * @Description: file content
-->

<template>
  <div class="chart-wrapper">
    <div v-if="config.showTitle" class="chart-title">
      <div class="title">{{ config.title }}</div>
      <slot name="restTitle" :restTitle="config.restTitle"></slot>
    </div>
    <div class="canvasBox"></div>
  </div>
</template>

<script>
import { mixins } from 'hatech-web-component'
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入线图组件
require('echarts/lib/chart/line')
require('echarts/lib/component/legend')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

export default {
  name: 'echartView',
  mixins: [mixins],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    }
  },
  data() {
    return {
      chart: null,
      chartOptions: null,
      screenWidth: document.body.clientWidth,
      // 默认字体尺寸使得每次屏幕缩放都会在默认字体大小上换算
      defaultLineOptions: ({
        legendItemGap = 10,
        legendItemWidth = 12,
        legendItemHeight = 4,
        legendTextFontSize = 14,
        xAxisFontSize = 16,
        yAxisNameFontSize = 18,
        yAxisLabelFontSize = 16,
        yAxisNamePadTop = 0,
        yAxisNamePadRight = 0,
        yAxisNamePadBottom = 10,
        yAxisNamePadLeft = -35
      } = {}) => ({
        // echarts标题配置
        color: ['#06B58A', '#4568F4', '#C736FF', '#41C2E8'],
        title: {
          show: false,
          text: ''
        },
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            let html = ''
            if (Array.isArray(params)) {
              let date = ''
              const arr = params.map((param) => {
                const { axisValue, marker, seriesName, value } = param
                date = this.$utils.date.format(Number(axisValue), 'YYYY-MM-DD HH:mm')
                return `${marker}${seriesName}: ${value}`
              })
              arr.unshift(date)
              html = arr.join('<br />')
            } else {
              const { axisValue, marker, seriesName, value } = params
              const date = this.$utils.date.format(Number(axisValue), 'YYYY-MM-DD HH:mm')
              html = `${date}<br/>${marker}${seriesName}: ${value}`
            }
            return html
          }
        },
        legend: {
          icon: 'rect',
          right: 0,
          itemGap: this.getPxVw(legendItemGap),
          itemWidth: this.getPxVw(legendItemWidth),
          itemHeight: this.getPxVw(legendItemHeight),
          textStyle: {
            color: '#fff',
            fontFamily: 'PingFang SC',
            fontSize: this.getPxVw(legendTextFontSize)
          },
          data: []
        },
        grid: {
          left: '5%',
          right: '10%',
          top: '25%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [],
          axisLabel: {
            color: '#fff',
            fontSize: this.getPxVw(xAxisFontSize),
            fontFamily: 'PingFang SC'
          },
          axisLine: {
            lineStyle: {
              color: '#646D87'
            }
          }
        },
        yAxis: {
          type: 'value',
          name: '',
          nameTextStyle: {
            color: '#fff',
            padding: [this.getPxVw(yAxisNamePadTop), this.getPxVw(yAxisNamePadRight), this.getPxVw(yAxisNamePadBottom), this.getPxVw(yAxisNamePadLeft)], // 四个数字分别为上右下左与原位置距离
            fontFamily: 'PingFang SC',
            fontSize: this.getPxVw(yAxisNameFontSize),
            align: 'left'
          },
          min: 'dataMin',
          max: 'dataMax',
          axisLabel: {
            color: '#fff',
            fontSize: this.getPxVw(yAxisLabelFontSize),
            fontFamily: 'PingFang SC'
          },
          axisLine: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: '#029FE9',
              type: 'dashed'
            }
          }
        },
        series: [],
        seriesObj: {
          name: '',
          type: 'line',
          smooth: false,
          data: []
        }
      })
    }
  },
  mounted() {
    this.initChart()
    window.addEventListener('resize', this.resizeChart)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.resizeChart)
    this.chart.dispose()
    this.chart = null
  },
  watch: {
    'config.lineChartOptions': {
      deep: true,
      handler(val) {
        if (this.chart) {
          this.chart.clear()
        }
        this.setOptions(val)
      }
    },
    // 屏幕尺寸改变后再次初始化echarts
    screenWidth(val) {
      if (this.chart) {
        this.chart.resize();
        this.initChart();
      }
    }
  },
  methods: {
    // 根据默认值计算字体大小 相对1080p设计图，取对应宽度vw值
    getPxVw(width) {
      const nowClientWidth = document.documentElement.clientWidth;
      const initialWidth = 1920
      return parseFloat(width) * (nowClientWidth / initialWidth)
    },
    setOptions(options) {
      const { seriesObj, ...restOptions } = this.$utils.deepCopy(this.defaultLineOptions({}))
      this.chartOptions = restOptions
      this.assembelOptions(options, seriesObj)
      this.chart.setOption(this.chartOptions)
    },
    /**
     * @description 合并配置项
     * @param options: {'xAxis.data': value}, key是用'.'拼接的键，value是所要覆盖的值，可以是任何类型值。
     * @param seriesObj - series数组里对象的模板
     */
    assembelOptions(options, seriesObj) {
      for (const [keyStr, value] of Object.entries(options)) {
        let obj = this.chartOptions
        const keyArr = keyStr.split('.')
        // 如果keyArr的最后一个是series 就直接合并seriesObj
        if (keyArr[keyArr.length - 1] === 'series') {
          this.mergeSeries(value, seriesObj, obj)
          continue
        }
        keyArr.forEach((key, index) => {
          if (index === keyArr.length - 1) {
            // 最终要赋值的地方是最后一个键
            this.handleLastOptionKey(value, obj, key)
          } else {
            if (!(key in obj)) {
              // 如果默认配置中不存在传入键就先赋值空对象
              obj[key] = {}
            }
            obj = obj[key]
          }
        })
      }
    },
    // 合并配置项-series
    mergeSeries(value, seriesObj, obj) {
      const seriesVal = value.map((v) => {
        return { ...seriesObj, ...v }
      })
      this.$set(obj, 'series', seriesVal)
    },
    // 合并配置项-处理最后一个字段的值
    handleLastOptionKey(value, obj, key) {
      let mergedVal = value
      if (Array.isArray(value)) {
        mergedVal = value
      } else if (Object.prototype.toString.call(value) === '[object Object]') {
        mergedVal = { ...(obj[key] || {}), ...value }
      }
      this.$set(obj, key, mergedVal)
    },
    initChart() {
      this.$nextTick(() => {
        const canvasBox = this.$el.getElementsByClassName('canvasBox')[0]
        this.chart = echarts.init(canvasBox, 'macarons')
        this.setOptions(this.config.lineChartOptions)
      })
    },
    resizeChart() {
      this.screenWidth = document.body.clientWidth
      if (this.chart) {
        this.chart.resize();
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/css/hatech';
.chart-wrapper {
  &,
  & * {
    box-sizing: border-box;
  }
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 100%;
  .chart-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ha-px-vh(5px);
    .title {
      display: inline-block;
      text-align: center;
      font-family: PingFang SC;
      font-size: ha-px-vh(20px);
      width: ha-px-vw(158px);
      line-height: ha-px-vh(34px);
      background: url('./../../../../../assets/img/monitorScreen/subTitle.svg') no-repeat;
      background-size: cover;
    }
  }
}
.canvasBox {
  box-sizing: border-box;
  width: 100%;
  height: auto;
  min-height: ha-px-vh(250px);
  padding: ha-px-vh(20px) 0;
  background-color: #2f3d55;
}
</style>
