<template>
  <div>
    <el-form ref="form" :model="form" :rules="formRules" label-width="80px">
      <el-form-item label="专利标题" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="专利描述" prop="CL">
        <el-input v-model="form.CL" rows="6" type="textarea" />
      </el-form-item>
      <el-form-item label="关键词" prop="keywords">
        <el-input v-model="form.keywords" placeholder="多个关键词请用英文逗号隔开" type="textarea" />
      </el-form-item>
      <el-form-item label="申请人">
        <el-input v-model="form.applicant" />
      </el-form-item>
      <el-form-item label="申请机构">
        <el-input v-model="form.org" />
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button :loading="loading" type="primary" @click="onSubmit">立即生成</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getNoveltyReport } from '@/api/report'
import Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import { saveAs } from 'file-saver'
import PizZipUtils from 'pizzip/utils'

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback)
}

export default {
  name: 'NoveltyReportGenerator',
  data() {
    return {
      loading: false,
      form: {
        title: '使用无人机数据产生用于自主车辆导航的高清地图',
        CL: '1.一种方法，其包括：将供自主车辆用于规划包含第一地理位置的导航路线的数字地图存储在存储器中；通过所述车辆从无人机(UAV)实时接收由所述UAV的传感器在所述第一地理位置处收集的传感器数据；通过至少一个处理装置处理所述接收的传感器数据以产生所述第一地理位置的地图数据；以及使用所述所产生的地图数据更新所述数字地图。',
        keywords: '',
        applicant: '',
        org: ''
      },
      formRules: {
        title: [
          { required: true, message: '请输入专利标题', trigger: 'blur' }
        ],
        CL: [
          { required: true, message: '请输入专利描述', trigger: 'blur' }
        ],
        keywords: [
          { required: true, message: '请输入关键词', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    console.log('mounted')
  },
  methods: {
    replaceErrors(key, value) {
      if (value instanceof Error) {
        return Object.getOwnPropertyNames(value).reduce(function(error, key) {
          error[key] = value[key]
          return error
        }, {})
      }
      return value
    },
    errorHandler(error) {
      console.log(JSON.stringify({ error: error }, this.replaceErrors()))
      if (error.properties && error.properties.errors instanceof Array) {
        const errorMessages = error.properties.errors
          .map(function(error) {
            return error.properties.explanation
          })
          .join('\n')
        console.log('errorMessages', errorMessages)
        // errorMessages is a humanly readable message looking like this :
        // 'The tag beginning with "foobar" is unopened'
      }
      throw error
    },
    renderDoc(data) {
      const self = this
      loadFile('http://10.112.138.178:8000/static/docs/novelty_report_template.docx', function(
        error,
        content
      ) {
        if (error) {
          throw error
        }
        const zip = new PizZip(content)
        const doc = new Docxtemplater().loadZip(zip)
        doc.setData(data)
        try {
          // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
          doc.render()
        } catch (error) {
          // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
          this.errorHandler(error)
        }
        const out = doc.getZip().generate({
          type: 'blob',
          mimeType:
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        })
        saveAs(out, 'output.docx')
        self.$message({
          message: '生成成功',
          type: 'success'
        })
        self.loading = false
      })
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          getNoveltyReport({ ...this.form, keywords: this.form.keywords.split(',') }).then(res => {
            const data = res.data.data
            data.hasKitty = this.form.keywords.length > 15
            data.QUERY_WORD = data.QUERY_WORD.split('\n')
            data.QUERY_EXPRESSION = data.QUERY_EXPRESSION.split('\n')
            data.SEARCH_RESULT = data.SEARCH_RESULT.split('\n')
            data.CONCLUSION = data.CONCLUSION.split('\n')
            console.log(data)
            this.renderDoc(data)
          })
        } else {
          this.$message({
            message: '提交失败',
            type: 'error'
          })
        }
      })
    }
  }
}
</script>
<style scoped>
.container {
  margin: 20px;
}
</style>
