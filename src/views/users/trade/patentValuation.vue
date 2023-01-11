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
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;  border-radius: 10px!important;"
      >
        <el-table-column align="center" label="PNM" prop="id" sortable="custom" width="140">
          <template slot-scope="{row}">
            <span>{{ row.patentProperties.PNM }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="专利名称" min-width="120">
          <template slot-scope="{row}">
            <router-link :to="`/search/detail/${ row.patentProperties.PNM}`" target="_blank">
              <span class="link-type">{{ row.patentProperties.TI }}</span>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column align="center" label="备注" width="400">
          <template slot-scope="{row}">
            <div style="display: flex;flex-direction: row;justify-content: space-between">
              <span style="width: calc(100% - 40px)">{{ row.desc || "" }}</span>
              <div style="width: 40px;">
                <el-button
                  circle
                  icon="el-icon-edit"
                  size="mini"
                  style="margin-left: 10px"
                  type="primary"
                  @click="showDescDialog(row)"
                />
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="估价">
          <template slot-scope="{row}">
            {{ row.price }}
          </template>
        </el-table-column>
      </el-table>

    </div>

  </div>
</template>

<script>
import { getClaimedPatents } from '@/api/patent'

export default {
  name: 'ComplexTable',
  data() {
    return {
      tableKey: 0,
      patents: null,
      reportList: null,
      patentId: 0,
      editDescFromVisible: false,
      currentPatent: null,
      description: '',
      reportDialogFormVisible: false,
      a: 0,
      list: null,
      claim: [],
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      flag: 0,
      form: {
        patentId: '',
        type: ''
      },
      formLabelWidth: '120px'

    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getClaimedPatents(this.listQuery).then(response => {
        const results = response.data.data
        results.map(item => {
          item.patentProperties = JSON.parse(item.patentProperties)
        })
        console.log(results)
        this.list = results
        for (let i = 0; i < this.list.length; i++) {
          this.claim[i] = this.list[i].patentId
        }
        this.listLoading = false
      })
    }

  }
}
</script>
<style>

</style>
