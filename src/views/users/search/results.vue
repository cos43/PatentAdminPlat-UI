<template>
  <div class="container">
    <div style="margin-top: 5px">
      <el-input v-model="searchForm.Query" class="input-with-select" placeholder="请输入内容">
        <el-button slot="append" icon="el-icon-search" plain type="primary" @click="search" />
      </el-input>
      <div class="advancedFilter">
        <span>高级搜索</span>
        <span>表单搜索</span>
      </div>
    </div>
    <el-tabs style="margin-top: 10px" type="border-card">
      <el-tab-pane v-loading="searchLoading">
        <span slot="label">搜索列表</span>
        <div class="d-flex flex-row filters">
          <span class="filter-active">概况</span>
          <span>按时间</span>
          <span>按产业分类</span>
          <span>按机构</span>
          <span>按发明人</span>
          <span>法律状态</span>
        </div>
        <div class="results">
          <div v-for="(item,index) of results.list" :key="item.NO" class="result-item">
            <div class="result-title row-center">
              <span class="text-primary">{{ index + 1 }} {{ item.TI }}[ZH]</span>
              <el-tag effect="dark" size="mini" style="margin: 0 5px" type="warning">审中</el-tag>
              中国发明申请
            </div>
            <div class="desc">
              申请号：{{ item.AN }}
              <el-divider direction="vertical" />
              申请日：{{ item.AD }}
              <el-divider direction="vertical" />
              公开(公告）号：{{ item.PNM }}
              <el-divider direction="vertical" />
              公开（公告）日：{{ item.PD }}
            </div>
            <div class="desc">
              申请（专利权）人：{{ item.PA }}
              <el-divider direction="vertical" />
              发明(设计）人：{{ item.PINN }}
            </div>
            <div class="desc">
              {{ item.CL }}
            </div>
            <div class="flex-end">
              <el-button-group>
                <el-button icon="el-icon-plus" size="mini" type="primary">认领</el-button>
                <el-button icon="el-icon-share" size="mini" type="primary">关注</el-button>
                <el-button icon="el-icon-plus" size="mini" type="primary">加入技术包</el-button>
              </el-button-group>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="搜索分析">
        <table-analysis />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>

import tableAnalysis from '@/views/users/search/components/tableAnalysis'
import { searchSimple } from '@/api/search'

export default {
  components: { tableAnalysis },
  data() {
    return {
      searchForm: {
        Query: ''
      },
      results: [],
      searchLoading: false
    }
  },
  mounted() {
    const { q } = this.$route.query
    if (q) {
      this.searchForm.Query = q
      this.search()
    } else {
      this.$route.query
    }
  },
  methods: {
    search() {
      const self = this
      self.searchLoading = true
      searchSimple(this.searchForm).then(res => {
        self.results = res.data.data
        self.searchLoading = false
      })
    }
  }
}
</script>
<style scoped>
.container {
  padding: 0 15px;
}

.results {
}

.row-center {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.result-title {
  font-size: 0.9rem;
}

.text-primary {
  color: #00a9ed;
}

.desc {
  font-size: 0.8rem;
  line-height: 1.7;
  margin-top: 3px;
}

.result-item {
  padding: 20px 10px;
  cursor: pointer;
  border-radius: 10px;
  margin-bottom: 10px;
  transition: 0.3s;
}

.flex-end {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 10px;
}

.result-item:hover {
  background-color: #e3f8fd;
}

.active {
  background-color: #e3f8fd;
}

.filters {
  font-size: 0.8rem;
  padding: 0 10px;
  margin-bottom: 5px;
}

.filters span {
  margin-right: 10px;
  color: gray;
  transition: 0.3s;

}

.filters span:hover {
  cursor: pointer;
  color: #00a9ed !important;
}

.filter-active {
  color: #00a9ed !important;
}

.advancedFilter {
  font-size: 13px;
  margin: 5px 0;
  color: gray;
}

.advancedFilter span {
  margin-right: 10px;
}
</style>
