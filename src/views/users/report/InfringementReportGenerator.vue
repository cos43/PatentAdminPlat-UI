<template>
  <div>
    <el-form>
      <el-form-item label="选择专利">
        <el-select v-model="patent" placeholder="仅能选择已经认领的专利" style="width: 80%">
          <el-option
            v-for="option in patents"
            :key="option.PNM"
            :label="option.patentProperties.TI"
            :value="option.patentProperties.TI"
          />
        </el-select>
      </el-form-item>
      <div style="text-align: center">
        <el-button type="primary">立即生成</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import { getClaimedPatents } from '@/api/patent'

export default {
  data() {
    return { patents: [], patent: '' }
  },
  mounted() {
    getClaimedPatents().then(res => {
      res.data.data.map(item => {
        item.patentProperties = JSON.parse(item.patentProperties)
        return item
      })
      this.patents = res.data.data
    })
  }
}
</script>
