<template>
  <div class="container">
    <div style="margin-top: 5px">
      <el-input v-model="searchForm.query" class="input-with-select" placeholder="请输入内容">
        <el-button slot="append" icon="el-icon-search" plain type="primary" @click="doSearch" />
      </el-input>
      <div class="advancedFilter">
        <div>
          <span style="margin-right: 10px">高级搜索</span>
          <span>表单搜索</span>
        </div>
      </div>
    </div>
    <el-tabs style="margin-top: 10px" type="border-card">
      <el-tab-pane>
        <span slot="label">搜索列表</span>
        <search-list ref="search" :query="searchForm" />
      </el-tab-pane>
      <el-tab-pane label="搜索分析">
        <table-analysis />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>

import tableAnalysis from '@/views/users/search/components/tableAnalysis'
import SearchList from '@/views/users/components/SearchList'

export default {
  components: { tableAnalysis, SearchList },
  data() {
    return {

      searchForm: {
        query: ''
      },
      searchLoading: false
    }
  },
  mounted() {
    const { q } = this.$route.query
    if (q) {
      this.searchForm.query = q
      this.doSearch()
    }
  },
  methods: {
    doSearch() {
      this.$refs.search.search()
    }
  }
}
</script>
<style scoped>
.container {
  padding: 0 15px;
}

.advancedFilter {
  font-size: 13px;
  margin: 5px 0;
  color: gray;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

</style>
