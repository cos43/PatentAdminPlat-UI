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

        <el-button class="filter-item" icon="el-icon-search" size="small" type="primary">
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
          label="PNM"
          prop="id"
          sortable="custom"
          width="140"
        >
          <template slot-scope="{row}">
            <span>{{ row.patentProperties.PNM }}</span>
          </template>
        </el-table-column>
        <el-table-column label="专利名称" min-width="150px">
          <template slot-scope="{row}">
            <span class="link-type">{{ row.patentProperties.TI }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="备注" sortable="custom" width="300">
          <template slot-scope="{row}">
            <span>{{ row.patentProperties.desc || "" }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" class-name="small-padding fixed-width" label="操作" width="100">
          <template slot-scope="row">
            <el-button size="mini" type="danger" @click="unFocusPatentClick(row)">
              取消关注
            </el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
  </div>
</template>

<script>
import { getFocusedPatents, unFocusPatent } from '@/api/patent'

export default {
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
      getFocusedPatents(this.listQuery).then(response => {
        const results = response.data.data
        results.map(item => {
          item.patentProperties = JSON.parse(item.patentProperties)
        })
        this.list = results
        console.log(this.list)
        this.listLoading = false
      })
    },
    unFocusPatentClick(row) {
      unFocusPatent(row.row.patentProperties.PNM).then(response => {
        this.$message({
          message: '取消关注成功',
          type: 'success',
          duration: 5 * 1000
        })
        this.getList()
      })
    }
  }
}
</script>
<style>

</style>
