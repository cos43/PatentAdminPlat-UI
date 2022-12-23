<template>
  <div>
    <h3>工艺包: {{ packageDetail.packageName }}</h3>
    <!--    <div style="margin-bottom: 5px">-->
    <!--      <h3>工艺包: {{ packageDetail.packageName }}</h3>-->
    <!--      <div class="text">Element-->
    <!--        为了避免视觉传达差异，使用一套特定的调色板来规定颜色，为你所搭建的产品提供一致的外观视觉感受。-->
    <!--      </div>-->
    <!--    </div>-->
    <div>
      <input id="showname" type="button" value="姓名开关" @click="showInventorName">
    </div>
    <div style="display: flex;flex-direction: row;align-items: center;height: 100vh">

      <div id="myChart" style="height: 80%;width:100%" />
    </div>
    <div class="table">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
      >
        <el-table-column
          align="center"
          label="排名"
          prop="date"
          width="100"
        />
        <el-table-column
          align="center"
          label="发明人"
          prop="name"
        />
        <el-table-column
          align="center"
          label="关联指数"
          prop="number"
        />
      </el-table>
    </div>

  </div>
</template>
<script>
import echarts from 'echarts'

import { getGraphByPackageId3, getPackage } from '@/api/package'
const data = {
  'categories': [
    {
      'name': 'No.1'
    },
    {
      'name': 'No.2'
    },
    {
      'name': 'No.3'
    },
    {
      'name': 'No.4'
    },
    {
      'name': 'No.5'
    },
    {
      'name': 'No.6'
    },
    {
      'name': 'No.7'
    },
    {
      'name': 'No.8'
    },
    {
      'name': 'No.9'
    },
    {
      'name': 'No.10'
    }
  ]
}
const option = {
  title: {
    text: '关联图谱',
    textAlign: 'auto',
    left: '10%', // '5' | '5%'，title 组件离容器左侧的距离
    right: 'auto', // 'title 组件离容器右侧的距离
    top: 'auto', // title 组件离容器上侧的距离
    bottom: 'auto'
  },
  tooltip: {},
  legend: [
    {
      data: data.categories.map(function(a) {
        return a.name
      })
    }
  ],
  series: [
    // {
    //   name: 'Les Miserables',
    //   type: 'graph',
    //   layout: 'none',
    //   data: null,
    //   links: null,
    //   categories: data.categories,
    //   roam: true,
    //   focusNodeAdjacency: true,
    //   legendHoverLink: true,
    //   // lineStyle: {
    //   //   color: "source",
    //   //   opacity: 0.2,
    //   //   curveness: 0.3,
    //   // },
    //   // force: {
    //   //   initLayout: "",
    //   //   repulsion: 5,
    //   //   layoutAnimation: false,
    //   // },
    //   label: {
    //     position: 'right',
    //     formatter: '{b}'
    //   },
    //   lineStyle: {
    //     color: 'source',
    //     curveness: 0.3
    //   },
    //   emphasis: {
    //     focus: 'adjacency',
    //     lineStyle: {
    //       width: 10
    //     }
    //   }
    //
    // }
    {
      name: '专利发明人',
      type: 'graph',
      layout: 'force',
      data: null,
      links: null,
      categories: data.categories,
      roam: true,
      label: {
        show: true,
        formatter: '{b}',
        position: 'right'
      },
      focusNodeAdjacency: true,
      legendHoverLink: true,
      animation: false,
      force: {
        initLayout: 'circular',
        layoutAnimation: false,
        repulsion: 100
      },
      lineStyle: {
        color: 'source',
        opacity: 0.2,
        curveness: 0.3
      },
      emphasis: {
        focus: 'adjacency',
        itemStyle: {
          shadowColor: 'rgba(0, 0, 0, 0.4)',
          shadowBlur: 15
        },
        lineStyle: {
          width: 3
        },
        label: {
          textBorderColor: 'rgba(255, 255, 255, 0.8)',
          textBorderWidth: 2
        }
      }
    }
  ]
}
export default {
  name: 'FocusAssociationGraph',
  data() {
    return {
      tableData: [{
        date: '1',
        name: '暂无',
        number: 0
      }],
      packageDetail: { packageName: '' },
      packageId: {}
    }
  },
  mounted() {
    this.loadPackageInventor()
    const myChart = echarts.init(document.getElementById('myChart'))
    myChart.setOption(option)
    this.getlist()
  },
  methods: {
    getlist() {
      console.log('进入')
      this.listloading = true
      getGraphByPackageId3(this.packageId).then(response => {
        const results = response.data.data
        console.log(results)
        if (results == null) {
          option.series[0].data = null
          option.series[0].links = null
        } else {
          option.series[0].data = results.nodes
          option.series[0].links = results.links
          this.tableData = this.dealTheRank(option)
        }
        console.log(results)
        // option.series[0].data.forEach(function(node) {
        //   // node.label = {
        //   //   show: node.symbolSize > 30
        //   // }
        // })
      }).then(() => {
        // console.log(data1)
        // console.log(option)
        // console.log('输出')
        const myChart = echarts.init(document.getElementById('myChart'))
        myChart.setOption(option)
      }
      )
      // return null
    },
    dealTheRank(option) {
      const tableData1 = []
      for (let i = 0; i < option.series[0].data.length && i < 10; i++) {
        const now = { date: i + 1, name: option.series[0].data[i].name, number: option.series[0].data[i].value }
        tableData1.push(now)
      }
      console.log(tableData1)
      return tableData1
    },
    showInventorName() {
      console.log(option.series[0].label.show)
      if (option.series[0].label.show) { option.series[0].label.show = false } else { option.series[0].label.show = true }
      const myChart = echarts.init(document.getElementById('myChart'))
      myChart.setOption(option)
    },
    loadPackageInventor() {
      this.packageId = this.$route.params.id
      getPackage(this.packageId).then(res => {
        this.packageDetail = res.data.data
      })
    }
  }
}
</script>
<style>
.table {
  position: absolute;
  z-index: 99;
  top: 10px;
  right: 10px;
  overflow-y: auto;
  width: 300px;
  border: 1px solid #ccc;
}
</style>
