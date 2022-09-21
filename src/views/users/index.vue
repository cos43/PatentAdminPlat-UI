<template>
  <div>

    <div class="header">
      <div class="searchBox">
        <div class="searchHeader">
          <div class="searchBoxInput">
            <input placeholder="可输入申请人、发明(设计）人、技术关键词、分类号、申请号、公开(公告)号等或直接输入检索式">
            <div class="searchBtn">检索</div>
          </div>
          <div class="searchAction">
            <router-link to="/search/advanced"><span>表单检索</span></router-link>
          </div>
        </div>
        <div v-show="visible" class="filter">
          1212
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Link from '@/layout/components/Sidebar/Link'
export default {
  name: 'Users',
  components: { Link },
  data() {
    return {
      currentRole: 'adminDashboard',
      visible: false
    }
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  },
  methods: {

  }
}
</script>
<style>
.header{
  padding: 10px 20px;
  border-bottom: 1px solid #ebeef5;
  height: 300px;
  display: flex;
  flex-direction: column;

  align-items: center;
  background-image: linear-gradient(to top, #ace0f9 0%,#ffffff  100%);
}
.searchBox{
  width: 70%;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  background: transparent;
}
.searchBoxInput{
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
}
.searchBoxInput input{
  width: 100%;
  height: 50px;
  position: relative;
  box-sizing: border-box;
  border-radius: 4px;
  padding-right: 180px;
  padding-left: 22px;
  font-size: 14px;
  background-color: rgba(255,255,255,0.85);
  color: rgba(0,0,0,0.65);
  outline: none;
  border: 0;
  line-height: 50px;
}
.searchBoxInput input:focus{
  outline: none;
}
.searchBtn{
  position: absolute;
  display: block;
  width: 108px;
  border-radius: 4px;
  box-sizing: border-box;
  height: 42px;
  line-height: 42px;
  right: 5px;
  text-align: center;
  color: #fff;
  background-color: #17A1FF;
  cursor: pointer;
  transition: 0.2s;
}
.searchBtn:hover{
  opacity: 0.7;
}
.searchHeader{
  width: 100%;
  display: flex;
  flex-direction: row;
}
.searchAction{
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #17233d;
  font-weight: bold;
  text-shadow:3px 3px 3px #ccc;
  margin-left: 10px;
  cursor: pointer;

}

</style>
