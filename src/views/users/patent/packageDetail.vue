<template>
  <div class="container">

    <div style="margin-bottom: 5px">
      <h3>工艺包: {{ packageDetail.packageName }}</h3>
      <div class="text">Element
        为了避免视觉传达差异，使用一套特定的调色板来规定颜色，为你所搭建的产品提供一致的外观视觉感受。
      </div>
    </div>
    <div style="display: flex;flex-direction: row;align-items: center;justify-content: space-between">
      <div style="display: flex;flex-direction: row;align-items: center">
        <el-button icon="el-icon-upload" size="small" type="primary" @click="handleUploadFile">
          上传文件
          <input v-show="false" ref="uploadInput" type="file">
        </el-button>
        <el-button icon="el-icon-download" size="small" type="primary">打包下载</el-button>
        <el-button icon="el-icon-edit" size="small" type="primary">编辑</el-button>
        <el-button icon="el-icon-delete" size="small" type="danger" @click="handleDeletePackage()">删除专利包
        </el-button>
      </div>
      <div>
        <el-input
          class="filter-item"
          placeholder="搜索"
          size="small"
          style="width: 200px;margin-right: 10px"
        />

        <el-button class="filter-item" icon="el-icon-search" size="small" type="primary">
          搜索
        </el-button>
      </div>
    </div>
    <div class="cards">
      <el-card
        v-for="(file,index) in files"
        :key="`file-${index}`"
        :body-style="{padding: 0}"
        :style="{ padding: '0px',margin:'10px 10px 10px 0'}"
        class="my-card"
        shadow="hover"
      >
        <div class="card-actions">
          <div style="display: flex;flex-direction: row;align-items: center;justify-content: center">
            <el-button-group>
              <el-button size="mini" type="primary" @click="handleDeleteFile(file.FilePath)">删除
              </el-button>
              <el-button size="mini" type="primary">下载</el-button>
            </el-button-group>
          </div>
        </div>
        <!--        <svg aria-hidden="true" class="image">-->
        <!--          <use :xlink:href="`#icon-files_image`" />-->
        <!--        </svg>-->
        <div class="imageField">
          <img :src="`http://${file.FilePath}`" alt="" class="image">
        </div>
        <!--        <div style="padding: 10px">-->
        <!--          {{ file.FilePath }}-->
        <!--        </div>-->
        <div style="font-size: 0.8rem;text-align: center">
          {{ (file.FileName || '未命名') | textCut }}
          <div style="margin-top: 5px">10-23 15:37</div>
        </div>
      </el-card>
    </div>
    <div class="cards">
      <el-card
        v-for="(patent) in patentList.list"
        :key="patent.patentId"
        :body-style="{padding: 0}"
        :style="{ padding: '0px',margin:'10px 10px 10px 0'}"
        class="my-card"
        shadow="hover"
      >
        <svg aria-hidden="true" class="image">
          <use xlink:href="#icon-patentF" />
        </svg>
        <div style="font-size: 0.8rem;text-align: center">
          {{ JSON.parse(patent.patentProperties).TI | textCut }}<br>
          <div style="margin-top: 5px">10-23 15:37</div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import { deletePackage, getPackage, getPatentListByPackageId, updatePackage } from '@/api/package'
import { uploadFile } from '@/api/upload'

export default {
  name: 'TechPack',
  data() {
    return {
      packageDetail: { packageName: '' },
      patentList: [],
      files: []
    }
  },

  mounted() {
    this.loadPackageDetail()
  },
  methods: {
    loadPackageDetail() {
      const packageId = this.$route.params.id
      getPackage(packageId).then(res => {
        this.packageDetail = res.data.data
        this.files = JSON.parse(this.packageDetail.files)
        getPatentListByPackageId(packageId).then(res => {
          this.patentList = res.data.data
        })
      })
    },
    handleDeletePackage() {
      deletePackage(this.packageDetail.packageId).then(res => {
        console.log(res)
        this.$message.success('删除成功')
        this.$router.push('/patent/package')
      })
    },
    handleUploadFile() {
      this.$refs.uploadInput.click()
      this.$refs.uploadInput.onchange = e => {
        const formData = new FormData()
        formData.append('file', e.target.files[0])
        uploadFile(formData).then(res => {
          const path = res.data.data.path
          updatePackage(this.packageDetail.packageId, {
            filesOpt: 'add',
            files: [path]
          }).then(res => {
            this.loadPackageDetail()
            this.$message.success('上传成功')
          })
        })
      }
    },
    handleDeleteFile(filePath) {
      updatePackage(this.packageDetail.packageId, {
        filesOpt: 'del',
        files: [filePath]
      }).then(res => {
        this.loadPackageDetail()
        this.$message.success('删除成功')
      })
    }
  }
}
</script>
<style scoped>
.container {
  padding: 10px 15px;
}

.cards {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 auto;
  flex-wrap: wrap;
}

.my-card {
  width: 180px;
  height: 200px;
}

.imageField {
  height: 150px;
  padding: 10px;
}

.imageField img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.my-card {
  position: relative;
}

.my-card:hover .card-actions {
  display: flex;
}

.card-actions {
  display: none;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

</style>
