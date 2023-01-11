<template>
  <div class="app-container" style="display: flex;flex-direction: row">
    <div style="width: 100% ;">
      <div class="filter-container">
        <el-input
          v-model="listQuery.title"
          class="filter-item"
          placeholder="专利名称"
          size="small"
          style="width: 200px;margin-right: 10px"
        />

        <el-button v-waves class="filter-item" icon="el-icon-search" size="small" type="primary">
          搜索
        </el-button>
      </div>

      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;  border-radius: 10px!important;"
      >
        <el-table-column
          align="center"
          label="ID"
          prop="id"
          sortable="custom"
          width="60"
        >
          <template slot-scope="{row}">
            <span>{{ row.queryID }}</span>
          </template>
        </el-table-column>
        <el-table-column label="名称" min-width="150px">
          <template slot-scope="{row}">
            <span class="link-type">{{ row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="表达式" min-width="80">
          <template slot-scope="{row}">
            <span>{{ row.expression }}</span>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="描述" width="200">
          <template slot-scope="{row}">
            <span>{{ row.desc }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" class-name="small-padding fixed-width" label="操作" width="200">
          <template slot-scope="row">
            <el-button size="mini" type="light" @click="queryDetail(row)">
              快速访问
            </el-button>
            <el-button size="mini" type="danger" @click="deleteQuery(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
  </div>
</template>

<script>
import { deleteQuery, getQueryList } from '@/api/search'
import waves from '@/directive/waves' // waves directive

export default {
  name: 'ComplexTable',
  directives: { waves },

  data() {
    return {
      tableKey: 0,
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      }

    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getQueryList().then(response => {
        this.list = response.data.data.list
        console.log(this.list)
        this.listLoading = false
      })
    },
    queryDetail(row) {
      this.$router.push({ path: '/search/results', query: { q: row.row.expression }})
    },
    deleteQuery(row) {
      deleteQuery(row.row.queryID).then(response => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.getList()
      })
    }
  }
}
</script>
<style>

</style>
