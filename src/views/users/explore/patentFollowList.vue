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
        <el-table-column align="center" label="备注" sortable="custom" width="400">
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

        <el-table-column align="center" class-name="small-padding fixed-width" label="操作" width="100">
          <template slot-scope="row">
            <el-button size="mini" type="danger" @click="unFocusPatentClick(row)">
              取消关注
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :visible.sync="editDescFromVisible" center title="修改备注" width="30%">
        <el-form>
          <el-form-item label="备注">
            <el-input v-model="description" placeholder="修改备注" type="textarea" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editDescFromVisible = false">取消</el-button>
          <el-button type="primary" @click="handleUpdateDesc">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getFocusedPatents, unFocusPatent, updateFocusPatentDescription } from '@/api/patent'

export default {
  data() {
    return {
      editDescFromVisible: false,
      currentPatent: null,
      description: '',
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
    showDescDialog(row) {
      this.editDescFromVisible = true
      this.currentPatent = row
      this.description = row.desc
    },
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
    },
    handleUpdateDesc() {
      updateFocusPatentDescription(this.currentPatent.patentProperties.PNM, this.description).then(res => {
        this.$message({
          message: '修改成功',
          type: 'success',
          duration: 1000
        })
        this.editDescFromVisible = false
        this.getList()
      })
    }
  }
}
</script>
<style>

</style>
