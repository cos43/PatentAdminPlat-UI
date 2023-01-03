<template>
  <el-card class="box-card" style="min-height: 500px!important;">
    <div slot="header" class="clearfix">
      <span>{{ title }}</span>
      <el-button style="float: right; padding: 3px 0" type="text" />
    </div>
    <div ref="chart" style="height: 400px;width: 100%" />
  </el-card>

</template>
<script>
import echarts from 'echarts'
import resize from './mixins/resize'

const fakeData = {
  'tooltip': {
    'trigger': 'axis',
    'axisPointer': {
      'type': 'shadow'
    }
  },
  'grid': {
    'left': '3%',
    'right': '4%',
    'bottom': '3%',
    'containLabel': true
  },
  'xAxis': [
    {
      'type': 'value'
    }
  ],
  'yAxis': [
    {
      'type': 'category',
      'data': ['安徽', '北京', '广东', '江苏', '浙江', '山东', '河南', '湖北', '上海', '四川', '福建', '天津', '河北', '湖南', '辽宁', '陕西', '江西', '云南', '广西', '黑龙江', '山西', '贵州', '重庆', '吉林', '甘肃', '新疆', '内蒙古', '宁夏', '中国台湾', '青海', '中国香港', '西藏', '海南', '中国澳门']

    }
  ],
  'series': [
    {
      'type': 'bar',
      'stack': 'total',
      'label': {
        'show': true
      },
      'emphasis': {
        'focus': 'series'
      },
      'data': [9805, 5885, 4665, 3851, 2506, 2122, 1150, 1120, 1055, 980, 916, 901, 723, 682, 585, 522, 451, 353, 345, 297, 277, 269, 247, 179, 165, 165, 134, 110, 53, 47, 14, 12, 7, 1]
    }
  ]
}
require('echarts/theme/macarons') // echarts theme
export default {
  mixins: [resize],
  props: {
    title: {
      type: String,
      default: '图谱'
    }
  },
  data() {
    return {}
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.chart, 'macarons')
      this.chart.setOption(fakeData)
      // getChartOption(1316, { Query: '网安' }).then(({ data }) => {
      //   console.log(data)
      //   const { option } = data.data
      //   this.chart.setOption(JSON.parse(option))
      // })
    }
  }
}
</script>

<style scoped>
/deep/ .el-progress-bar__innerText {
  color: black;
}
</style>
