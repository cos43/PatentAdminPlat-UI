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
        <el-table-column align="center" label="报告" width="80">
          <template slot-scope="{row}">
            <el-button class="detail" size="mini" type="light" @click="showDialog(row)">
              生成
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" class-name="small-padding fixed-width" label="操作" width="180">
          <template slot-scope="row">
            <el-button size="mini" type="danger" @click="unClaimClick(row)">
              取消认领
            </el-button>
            <addToPackage :patent="row.row.patentProperties">
              <el-button size="mini" type="primary">
                加入工艺包
              </el-button>
            </addToPackage>
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
      <el-dialog :visible.sync="reportDialogFormVisible" center title="申请生成报告" width="30%">
        <el-form :model="form">
          <el-form-item :label-width="formLabelWidth" label="报告类型">
            <el-select v-model="form.type" placeholder="请选择报告类型">
              <el-option label="侵权报告" value="infringement" />
              <el-option label="估值报告" value="valuation" />
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="reportDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="InsertReport(form)">确 定</el-button>
        </div>
      </el-dialog>

    </div>

  </div>
</template>

<script>
import addToPackage from '@/views/users/components/AddToPackage'
import { getClaimedPatents, unClaimPatent, updateClaimPatentDescription } from '@/api/patent'
import { ApplyReport, userGetReportListByPaId } from '@/api/report'

export default {
  name: 'ComplexTable',
  components: { addToPackage },
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
    },
    unClaimClick(row) {
      unClaimPatent(row.row.patentProperties.PNM).then(response => {
        this.$message({
          message: '取消认领成功',
          type: 'success',
          duration: 1000
        })
        this.getList()
      })
    },
    handleUpdateDesc() {
      updateClaimPatentDescription(this.currentPatent.patentProperties.PNM, this.description).then(res => {
        this.$message({
          message: '修改成功',
          type: 'success',
          duration: 1000
        })
        this.editDescFromVisible = false
        this.getList()
      })
    },
    showDialog(row) {
      this.reportDialogFormVisible = true
      this.patentId = row.patentId
    },
    showDescDialog(row) {
      this.editDescFromVisible = true
      this.currentPatent = row
      this.description = row.desc
    },

    InsertReport(form) {
      this.flag = 0
      this.reportDialogFormVisible = false
      this.form.patentId = this.patentId
      console.log(this.form)
      userGetReportListByPaId(this.form.patentId).then(response => {
        this.reportList = response.data.data
        this.listLoading = false
        if (this.reportList !== null) {
          for (let i = 0; i < this.reportList.length && this.flag === 0; i++) {
            if (this.reportList[i].Type === this.form.type) {
              this.$message({
                message: '您已申请该类型报告，点击详情查看',
                type: 'error',
                duration: 1000
              })
              this.flag = 1
              break
            }
          }
        }
        if (this.flag === 0) {
          ApplyReport(form).then(response => {
            if (response.data.code === 200) {
              this.$message({
                message: '申请成功',
                type: 'success',
                duration: 1000
              })
            }
          })
        }
      })
    }
  }
}
</script>
<style>

</style>
