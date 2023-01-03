<template>
  <div class="container">
    <create-pack ref="createPack" />
    <div style="margin: 20px 0 0 10px;display: flex;flex-direction: row;align-items: center">
      <el-input
        class="filter-item"
        placeholder="工艺包名称名称"
        size="small"
        style="width: 200px;margin-right: 10px"
      />

      <el-button class="filter-item" icon="el-icon-search" size="small" type="primary">
        搜索
      </el-button>
      <el-button icon="el-icon-folder-add" size="small" type="primary" @click="showCreatePack">
        创建工艺包
      </el-button>

    </div>
    <div class="cards">
      <el-card v-for="o in packageList" :key="o.packageId" :style="{ padding: '0px',margin:'10px' }" class="my-card">
        <svg aria-hidden="true" class="image">
          <use xlink:href="#icon-files" />
        </svg>
        <div style="padding-top: 16px;">
          <div style="font-size:1rem;margin-bottom: 5px">
            {{ o.packageName }}
          </div>
          <el-row justify="space-between" type="flex">
            <router-link :to="{path:`package/${o.packageId}`,params:'1212'}" style="margin-right: 5px">
              <el-button icon="el-icon-view" size="mini" type="primary">查看</el-button>
            </router-link>
            <el-button icon="el-icon-download" size="mini" type="primary">打包下载</el-button>
          </el-row>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import createPack from '@/views/users/components/createPack'
import { mapGetters } from 'vuex'

export default {
  name: 'TechPack',
  components: {
    createPack
  },
  computed: {
    ...mapGetters([
      'packageList'
    ])
  },
  mounted() {
    this.$store.dispatch('package/getPackageList', this.form).then(() => {
      console.log('yes')
    })
  },
  methods: {
    showCreatePack() {
      this.$refs.createPack.show()
    }
  }
}
</script>
<style scoped>
.cards {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 auto;
  flex-wrap: wrap;
}

.my-card {
  width: 220px;
  height: 280px;
}

.image {
  width: 100%;
  display: block;
}
</style>
