<template>
  <div class="app-container">
    <div style="width: 100%">
      <el-form>
        <el-form-item label="报告类型">
          <el-select v-model="reportType" placeholder="选择报告类型" style="width: 80%">
            <el-option label="查新报告" value="novelty" />
            <el-option label="侵权报告" value="infringement" />
          </el-select>
        </el-form-item>
      </el-form>

    </div>
    <el-divider />
    <novelty-report-generator v-if="reportType==='novelty'" />
    <infringement-report-generator v-if="reportType==='infringement'" />
  </div>
</template>
<script>
import NoveltyReportGenerator from '@/views/users/report/NoveltyReportGenerator.vue'
import InfringementReportGenerator from '@/views/users/report/InfringementReportGenerator.vue'

export default {
  components: { NoveltyReportGenerator, InfringementReportGenerator },
  data() {
    return { reportType: this.$route.query.type || 'novelty' }
  }
}
</script>
