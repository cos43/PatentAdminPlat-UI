<template>
  <div class="results">
    <create-pack ref="createPack" />
    <div v-if="searchLoading">
      <el-skeleton v-for="i of 6" :key="i" :rows="6" animated />
    </div>
    <div v-else>
      <div class="d-flex flex-row " style="justify-content: space-between;margin-bottom: 5px">
        <div class="filters">
          <span class="filter-active">概况</span>
          <span>按时间</span>
          <span>按产业分类</span>
          <span>按机构</span>
          <span>按发明人</span>
          <span>法律状态</span>
        </div>
        <div>
          <el-button
            :disabled="searchResults.list.filter(item=>item.select).length===0"
            size="mini"
            type="primary"
            @click="exportTxt"
          >导出本页
          </el-button>
        </div>
      </div>
      <div style="padding: 2px 10px;display: flex;flex-direction: row;align-items: center;font-size: 0.9rem">
        <el-checkbox v-model="isSelectAll" />
        <span style="margin-left: 5px">全选</span>
      </div>
      <div v-for="(item,index) of searchResults.list" :key="item.PNM" class="result-item">
        <el-checkbox v-model="item.select" style="margin-right: 5px;padding-top: 2px" />
        <div style="display: flex;flex-direction: column;width: 100%">
          <Link :to="`detail/${item.PNM}`" target="_blank">
            <div class="result-title row-center">
              <span class="text-primary">{{ (page - 1) * pageSize + index + 1 }} {{ item.TI }}[ZH]</span>
              <el-tag
                :style="{backgroundColor:getTagColor(item.CLS),border:'none'}"
                effect="dark"
                size="mini"
                style="margin: 0 5px"
              >{{ item.CLS }}
              </el-tag>
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
          </Link>
          <div class="flex-end">
            <patent-claim-popover :patent="item" style="margin-right: 5px" />
            <patent-focus-popover :patent="item" style="margin-right: 5px" />

            <addToPackage :patent="item">
              <el-button size="mini" type="primary">
                加入工艺包
              </el-button>
            </addToPackage>
          </div>

        </div>
      </div>

      <div class="block center">
        <div>
          <el-button :disabled="page===1" icon="el-icon-arrow-left" size="mini" type="primary" @click="prevPage">
            上一页
          </el-button>
          <el-button size="mini" style="width: 50px;color: #2b2f3a" type="text">{{ page }}</el-button>
          <el-button :disabled="!hasNext" size="mini" type="primary" @click="nextPage">下一页
            <i
              class="el-icon-arrow-right el-icon--right"
            /></el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { addPatentToPackage, checkPatentToPackage, getPackageList } from '@/api/package'
import { searchSimple } from '@/api/search'
import { getTagColor, saveFile } from '@/views/users/utils'
import createPack from '@/views/users/components/createPack'
import Link from '@/layout/components/Sidebar/Link'
import AddToPackage from '@/views/users/components/AddToPackage'
import PatentClaimPopover from '@/views/users/components/PatentClaimPopover'
import PatentFocusPopover from '@/views/users/components/PatentFocusPopover'

export default {
  name: 'SearchList',
  components: {
    PatentFocusPopover,
    AddToPackage,
    Link,
    PatentClaimPopover,
    createPack
  },
  props: {
    query: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      page: 1,
      searchLoading: false,
      pageSize: 10,
      hasNext: false,
      searchResults: { list: [] },
      addPackForm: {
        patentName: '',
        patentId: '',
        packageId: ''
      },
      isSelectAll: false,
      dialogVisible: false,
      popoverVisible: true,
      loadingPackageList: true,
      loadingRelation: false,
      packageList: [],
      patentPackageExist: false
    }
  },
  watch: {
    isSelectAll: function(val) {
      this.searchResults.list.forEach(item => {
        item.select = val
      })
    },
    'addPackForm.packageId': function(val) {
      if (val) {
        this.loadingRelation = true
        const { patentId } = this.addPackForm
        console.log(this.addPackForm)
        checkPatentToPackage(val, patentId).then(res => {
          this.loadingRelation = false
          this.patentPackageExist = res.data.data.existed
        })
      } else {
        this.patentPackageExist = false
      }
    }
  },
  methods: {
    exportTxt() {
      const exportArray = []
      for (const item of this.searchResults.list.filter(item => item.select)) {
        exportArray.push(`标题：${item.TI}\n申请号：${item.AN}\n`)
      }
      const exportString = exportArray.join('\n')
      const fileName = `${this.query.query}.txt`
      saveFile(exportString, fileName)
    },
    loadPackageList() {
      getPackageList().then(res => {
        this.packageList = res.data.data
        this.loadingPackageList = false
      })
    },
    search() {
      const self = this
      self.searchLoading = true
      searchSimple({ ...this.query, pageIndex: this.page, pageSize: this.pageSize }).then(res => {
        self.hasNext = res.data.data.list.length === self.pageSize
        res.data.data.list.forEach(item => {
          item.select = false
        })
        self.searchResults = res.data.data
        self.searchLoading = false
      })
    },
    nextPage() {
      this.page++
      this.search()
    },
    prevPage() {
      this.page--
      this.search()
    },
    showPopover(patent) {
      this.loadPackageList()
      console.log(patent)
      this.addPackForm.patentId = patent.PNM
      this.addPackForm.patentName = patent.TI
      this.addPackForm.packageId = ''
    },

    handleAddPatentToPackage(patent) {
      const { packageId, patentId } = this.addPackForm
      addPatentToPackage(packageId, patentId, patent).then(res => {
        if (res.data.code === 200) {
          this.$message.success('添加成功')
          this.dialogVisible = false
          this.patentPackageExist = true
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    getTagColor: getTagColor
  }
}
</script>
<style>

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
  padding: 10px 10px;
  cursor: pointer;
  display: flex;
  flex-direction: row;

  border-radius: 10px;
  margin-bottom: 10px;
  transition: 0.3s;
}

.flex-end {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  font-size: 0.9rem;
  align-items: center;
  margin-top: 10px;
}

.result-item:hover {
  background-color: #e3f8fd;
}

.center {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.action-item {
  cursor: pointer;
  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 70px;
  border-radius: 2px;
}

.action-item:hover {
  background-color: #e8e8e8;
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
</style>
