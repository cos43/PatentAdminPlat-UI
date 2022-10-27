<template>
  <div class="results">
    <div v-for="(item,index) of results" :key="item.NO" class="result-item">
      <div class="result-title row-center">
        <span class="text-primary">{{ index + 1 }} {{ item.TI }}[ZH]</span>
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
      <div class="flex-end">
        <el-button-group>
          <el-button size="mini" type="primary" @click="claim(item)">
            {{ item.isClaimed ? '取消认领' : '认领' }}
          </el-button>
          <el-button size="mini" type="primary" @click="focus(item)">
            {{ item.isFocused ? '取消关注' : '关注' }}
          </el-button>
          <el-button size="mini" type="primary">加入技术包</el-button>
        </el-button-group>
      </div>
    </div>
    <div class="block center">
      <el-pagination
        :total="1000"
        layout="prev, pager, next"
      />
    </div>
  </div>
</template>
<script>
import { claimPatent, focusPatent, unClaimPatent, unFocusPatent } from '@/api/patent'
import { getTagColor } from '@/views/users/utils'

export default {
  name: 'SearchList',
  props: {
    results: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  methods: {
    claim(patent) {
      if (patent.isClaimed) {
        unClaimPatent(patent.patentId).then(res => {
          if (res.data.code === 200) {
            this.$message.success('取消认领成功')
            patent.isClaimed = false
          } else {
            this.$message.error(res.data.msg)
          }
        })
      } else {
        claimPatent(patent).then(res => {
          if (res.data.code === 200) {
            this.$message.success('认领成功')
            patent.isClaimed = true
          } else {
            this.$message.error(res.data.msg)
          }
        })
      }
    },

    focus(patent) {
      if (patent.isFocused) {
        unFocusPatent(patent.patentId).then(res => {
          if (res.data.code === 200) {
            this.$message.success('取消关注成功')
            patent.isFocused = false
          } else {
            this.$message.error(res.data.msg)
          }
        })
      } else {
        focusPatent(patent).then(res => {
          if (res.data.code === 200) {
            this.$message.success('关注成功')
            patent.isFocused = true
          } else {
            this.$message.error(res.data.msg)
          }
        })
      }
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
  padding: 20px 10px;
  cursor: pointer;
  border-radius: 10px;
  margin-bottom: 10px;
  transition: 0.3s;
}

.flex-end {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 10px;
}

.result-item:hover {
  background-color: #e3f8fd;
}

.active {
  background-color: #e3f8fd;
}

.center {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
