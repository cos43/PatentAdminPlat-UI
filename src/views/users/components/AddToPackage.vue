<template>
  <el-popover
    placement="left-end"
    width="350"
  >
    <create-pack ref="createPack" />
    <el-form
      :model="packageAddForm"
      label-position="left"
      label-width="60px"
      size="small"
      style="margin: 10px"
    >
      <el-form-item label="专利" size="small">
        <el-input v-model="packageAddForm.patentName" size="small" />
      </el-form-item>
      <el-form-item label="工艺包" size="small">
        <el-select
          v-model="packageAddForm.packageId"
          v-loading="loadingPackageList"
          placeholder="请选择工艺包"
          size="small"
          style="width: 100%"
        >
          <el-option
            v-for="p in packageList"
            :key="'p'+p.packageName"
            :label="p.packageName"
            :value="p.packageId"
          />
        </el-select>
      </el-form-item>
      <div style="display: flex;flex-direction: row;align-items: center;justify-content: space-between">
        <el-button size="mini" type="primary" @click="showCreatePack">新增工艺包</el-button>
        <div style="text-align: right; margin: 0">

          <el-button
            v-loading="loadingRelation"
            :disabled="patentPackageExist"
            size="mini"
            type="primary"
            @click="handleAddPatentToPackage()"
          >
            {{ patentPackageExist ? '已添加' : '添加' }}
          </el-button>
        </div>
      </div>
    </el-form>
    <el-button slot="reference" size="mini" style="margin-left: 5px" type="primary" @click="showPopover()">加入工艺包
    </el-button>
  </el-popover>
</template>
<script>
import { addPatentToPackage, checkPatentToPackage, getPackageList } from '@/api/package'
import CreatePack from '@/views/users/components/createPack'

export default {
  components: { CreatePack },
  props: {
    patent: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      packageAddForm: { packageId: '', patentName: '', patentId: '' },
      patentPackageExist: false,
      loadingRelation: false,
      loadingPackageList: false,
      packageList: []
    }
  },
  watch: {
    'packageAddForm.packageId': function(val) {
      if (val) {
        this.loadingRelation = true
        const { patentId } = this.packageAddForm
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
    showPopover() {
      this.loadPackageList()
      this.packageAddForm.patentId = this.patent.PNM
      this.packageAddForm.patentName = this.patent.TI
      this.packageAddForm.packageId = ''
    },
    loadPackageList() {
      getPackageList().then(res => {
        this.packageList = res.data.data
        this.loadingPackageList = false
      })
    },
    showCreatePack() {
      this.$refs.createPack.show()
    },
    handleAddPatentToPackage() {
      const { packageId, patentId } = this.packageAddForm
      addPatentToPackage(packageId, patentId, this.patent).then(res => {
        if (res.data.code === 200) {
          this.$message.success('添加成功')
          this.dialogVisible = false
          this.patentPackageExist = true
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }
  }
}
</script>
