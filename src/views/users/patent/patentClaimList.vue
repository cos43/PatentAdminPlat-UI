<template>
  <div class="app-container" style="display: flex;flex-direction: row">
    <div style="width: 100% ;">
      <div class="filter-container">
        <el-input
          v-if="!ifreport"
          v-model="listQuery.title"
          class="filter-item"
          placeholder="专利名称"
          size="small"
          style="width: 200px;margin-right: 10px"
        />

        <el-button v-if="!ifreport" v-waves class="filter-item" icon="el-icon-search" size="small" type="primary">
          搜索
        </el-button>
        <el-button
          v-if="ifreport"
          v-waves
          class="filter-item"
          icon="el-icon-d-arrow-left"
          size="small"
          type="primary"
          @click="back"
        >
          返回
        </el-button>
      </div>

      <el-table
        v-if="!ifreport"
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;  border-radius: 10px!important;"
      >
        <el-table-column align="center" label="专利ID" prop="id" sortable="custom" width="90">
          <template slot-scope="{row}">
            <span>{{ row.patentId }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="专利名称" min-width="150px">
          <template slot-scope="{row}">
            <span class="link-type">{{ row.patentProperties.TI }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="申请日期" sortable="custom" width="190px">
          <template slot-scope="{row}">
            <span>{{ row.patentProperties.AD }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="通过日期" sortable="custom" width="190px">
          <template slot-scope="{row}">
            <span>{{ row.patentProperties.PD }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="主分类号" width="130px">
          <template slot-scope="{row}">
            <span>{{ row.PNM }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" class-name="small-padding fixed-width" label="操作" width="180">
          <template slot-scope="row">
            <el-button size="mini" type="danger" @click="unClaimClick(row)">
              取消认领
            </el-button>
            <el-button size="mini" type="primary">
              加入工艺包
            </el-button>
          </template>
        </el-table-column>

        <el-table-column align="center" label="报告" width="150">
          <template slot-scope="{row}">
            <el-button class="detail" size="mini" type="warning" @click="showReports(row.patentId)">
              详情
            </el-button>
            <el-button class="detail" size="mini" type="primary" @click="showDialog(row)">
              生成
            </el-button>

          </template>
        </el-table-column>
      </el-table>

      <el-table
        v-if="ifreport"
        :key="tableKey"
        v-loading="listLoading"
        :data="reportlist"
        border
        fit
        style="width: 100%;  border-radius: 10px!important;"
      >

        <el-table-column align="center" label="ID" prop="id" sortable="custom" width="80">
          <template slot-scope="{row}">
            <span>{{ row.reportId }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="报告名称" min-width="150px">
          <template slot-scope="{row}">
            <span class="link-type">{{ row.reportName }}</span>
          </template>

        </el-table-column>
        <el-table-column align="center" label="报告类型" min-width="130px">
          <template slot-scope="{row}">
            <span class="link-type">{{ row.Type }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="申请时间" sortable="custom" width="180px">
          <template slot-scope="{row}">
            <span>{{ row.CreatedAt }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="最后更新时间" sortable="custom" width="180px">
          <template slot-scope="{row}">
            <span>{{ row.UpdatedAt }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="状态" width="110px">
          <template slot-scope="{row}">
            <span>{{ row.rejectTag }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" class-name="small-padding fixed-width" label="操作" width="180">
          <template slot-scope="{row}">
            <el-button
              v-if="row.rejectTag === '已上传'"
              size="mini"
              type="primary"
              icon="el-icon-download"
              @click="download(row)"
            >
              下载
            </el-button>
            <el-button v-if="row.rejectTag === '未审核'" size="mini" type="danger" round @click="cancelReport(row)"> 撤销
            </el-button>
            <el-button v-if="row.rejectTag === '已撤销'" size="mini" type="primary" @click="reReport(row)"> 重新申请
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="申请生成报告" :visible.sync="dialogFormVisible" width="30%" center>
        <el-form :model="form">
          <el-form-item label="报告类型" :label-width="formLabelWidth">
            <el-select v-model="form.type" placeholder="请选择报告类型">
              <el-option label="侵权报告" value="infringement" />
              <el-option label="估值报告" value="valuation" />
              <el-option label="查新报告" value="none" />
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="InsertReport(form)">确 定</el-button>
        </div>
      </el-dialog>

    </div>

  </div>
</template>

<script>
import { getClaimedPatents, unClaimPatent } from '@/api/patent'
import { ApplyReport, userGetReportListByPaId, cancelReport, reAppReport } from '@/api/report'
import waves from '@/directive/waves'

export default {
  name: 'ComplexTable',
  directives: { waves },

  data() {
    return {
      tableKey: 0,
      patents: null,
      ifpatent: false,
      ifcancel: false,
      ifreport: false,
      ifshow1: false,
      patentitems: null,
      reportlist: null,
      patentlist: [],
      isreject: false,
      patentid: 0,
      dialogFormVisible: false,
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
        // CreatedAt: this.getNowTime()
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
        this.list = results
        for (var i = 0; i < this.list.length; i++) {
          this.claim[i] = this.list[i].patentId
        }
        this.listLoading = false
      })
    },
    unClaimClick(row) {
      unClaimPatent(row.row.patentId).then(response => {
        this.$message({
          message: '取消认领成功',
          type: 'success',
          duration: 1000
        })
        this.getList()
      })
    },
    showReports(id) {
      this.ifreport = true
      this.listLoading = true
      this.patentid = id
      userGetReportListByPaId(id).then(response => {
        this.reportlist = response.data.data
        this.listLoading = false
        for (var i = 0; i < this.reportlist.length; i++) {
          if (this.reportlist[i].files !== '' && this.reportlist[i].files !== null && this.reportlist[i].files !== '[]' && this.reportlist[i].files !== 'undefined') {
            this.reportlist[i].files = JSON.parse(this.reportlist[i].files)
          }
          if (this.reportlist[i].UpdatedAt === null) { this.reportlist[i].UpdatedAt = '无' }
          if (this.reportlist[i].Type === 'infringement') { this.reportlist[i].Type = '侵权报告' }
          if (this.reportlist[i].Type === 'valuation') { this.reportlist[i].Type = '估值报告' }
        }
        // console.log(this.claim)  证明 用this依然可以访问 其他函数 修改的元素
        console.log(this.reportlist)
      })
    },
    back() {
      this.ifreport = false
      this.queryid = ''
      this.getList()
    },
    // 无法直接下载浏览器可直接预览的文件类型（txt、png、pdf会直接预览）
    download(row) {
      const path = row.files[0].FilePath
      this.url = 'http://localhost:8000' + path
      window.open(this.url, '_self')
    },

    showDialog(row) {
      this.dialogFormVisible = true
      this.patentid = row.patentId
    },

    InsertReport(form) {
      this.flag = 0
      this.dialogFormVisible = false
      console.log(this.patentid)
      this.form.patentId = this.patentid
      console.log(this.form)
      userGetReportListByPaId(this.form.patentId).then(response => {
        this.reportlist = response.data.data
        this.listLoading = false
        if (this.reportList !== null) {
          for (var i = 0; i < this.reportlist.length && this.flag === 0; i++) {
            if (this.reportlist[i].Type === this.form.type) {
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
    },
    cancelReport(row) {
      cancelReport(row.reportId).then(response => {
        if (response.data.code === 200) {
          this.$message({
            message: '撤销报告申请成功',
            type: 'success',
            duration: 5 * 1000
          })
        }
        this.showReports(this.patentid)
      })
    },
    reReport(row) {
      reAppReport(row.reportId).then(response => {
        if (response.data.code === 200) {
          this.$message({
            message: '重新申请成功',
            type: 'success',
            duration: 1000
          })
        }
        this.showReports(this.patentid)
      })
    }
  }
}
</script>
<style>

</style>
