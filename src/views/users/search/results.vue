<template>
  <div class="container">
    <div style="margin-top: 5px">
      <el-input v-model="searchForm.query" class="input-with-select" placeholder="请输入内容">
        <el-button slot="append" icon="el-icon-search" plain type="primary" @click="doSearch" />
      </el-input>
      <div class="advancedFilter">
        <div>
          <span>高级搜索</span>
          <span>表单搜索</span>
        </div>
        <el-popover
          placement="right-start"
          trigger="click"
          width="400"
        >
          <div>
            <el-form
              ref="queryForm"
              :model="queryFrom"
              :rules="queryFromRules"
              label-position="left"
              label-width="60px"
              size="small"
              style="margin: 10px"
            >
              <el-form-item label="名称" prop="name" size="small">
                <el-input v-model="queryFrom.name" size="small" />
              </el-form-item>
              <el-form-item label="表达式" size="small">
                <el-input v-model="queryFrom.expression" disabled size="small" />
              </el-form-item>
              <el-form-item label="描述" size="small">
                <el-input v-model="queryFrom.desc" size="small" />
              </el-form-item>
              <el-button
                size="mini"
                type="primary"
                @click="submitForm('queryForm')"
              >
                保存
              </el-button>
            </el-form>
          </div>
          <el-button slot="reference" size="mini" type="primary">保存搜索结果</el-button>
        </el-popover>
      </div>
    </div>
    <el-tabs style="margin-top: 10px" type="border-card">
      <el-tab-pane>
        <span slot="label">搜索列表</span>
        <div class="d-flex flex-row filters">
          <span class="filter-active">概况</span>
          <span>按时间</span>
          <span>按产业分类</span>
          <span>按机构</span>
          <span>按发明人</span>
          <span>法律状态</span>
        </div>
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
import { addQuery } from '@/api/search'

export default {
  components: { tableAnalysis, SearchList },
  data() {
    return {
      // 用户搜索表达式
      queryFrom: {
        expression: '',
        name: '',
        desc: ''
      },
      queryFromRules: {
        name: [
          { required: true, message: '请输入搜索名称', trigger: 'blur' }
        ]
      },
      searchForm: {
        query: ''
      },
      searchLoading: false
    }
  },
  mounted() {
    const { q } = this.$route.query
    if (q) {
      this.queryFrom.expression = q
      this.searchForm.query = q
      this.doSearch()
    }
  },
  methods: {
    doSearch() {
      this.queryFrom.expression = this.searchForm.query
      this.$refs.search.search()
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addQuery(this.queryFrom).then(res => {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style scoped>
.container {
  padding: 0 15px;
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
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.advancedFilter span {
  margin-right: 10px;
}
</style>
