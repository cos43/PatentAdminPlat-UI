<template>
  <div>
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
import { getGraphByUserId } from '@/api/patent'
const data = {
  'categories': [
    {
      'name': 'A'
    },
    {
      'name': 'B'
    },
    {
      'name': 'C'
    },
    {
      'name': 'D'
    },
    {
      'name': 'E'
    },
    {
      'name': 'F'
    },
    {
      'name': 'G'
    },
    {
      'name': 'H'
    },
    {
      'name': 'I'
    },
    {
      'name': 'J'
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
      name: 'FocusAssociationGraph',
      type: 'graph',
      layout: 'force',
      data: null,
      links: null,
      categories: data.categories,
      roam: true,
      label: {
        // show: true,
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
        name: '张三',
        number: 12
      }, {
        date: '2',
        name: '李四',
        number: 11
      }, {
        date: '3',
        name: '张三',
        number: 8
      }, {
        date: '4',
        name: '张三',
        number: 2
      },
      {
        date: '1',
        name: '张三',
        number: 12
      }, {
        date: '2',
        name: '张三',
        number: 11
      }, {
        date: '3',
        name: '张三',
        number: 8
      }, {
        date: '4',
        name: '张三',
        number: 2
      }]
    }
  },
  mounted() {
    const myChart = echarts.init(document.getElementById('myChart'))
    myChart.setOption(option)
    this.getlist()
  },
  methods: {
    getlist() {
      console.log('进入')
      this.listloading = true
      getGraphByUserId().then(response => {
        const results = response.data.data
        option.series[0].data = results.nodes
        option.series[0].links = results.links
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
