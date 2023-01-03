<template>
  <div>
    <div class="header">
      <div class="searchBox">
        <div class="searchHeader">
          <h1 style="color: black;text-shadow: 3px 3px 3px #ccc;">专利咨询平台</h1>
          <div class="searchBoxInput">
            <input
              v-model="query"
              placeholder="可输入申请人、发明(设计）人、技术关键词、分类号、申请号、公开(公告)号等或直接输入检索式"
            >
            <div class="searchBtn" @click="search">检索</div>
          </div>
          <div style="display: flex;flex-direction: row;justify-content: flex-start;width: 80%">
            <div class="searchAction">
              <router-link to="/search/advanced"><span>高级检索</span></router-link>
              <router-link to="/search/form"><span>表格检索</span></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="recommend" style="margin: 30px 100px">
      <div class="d-flex flex-row align-items-center">
        <span class="title title-active">知产教室</span>
      </div>
      <div style="margin-top: 5px">
        <div class="d-flex flex-row">
          <video controls height="270" width="400">
            <source src="http://www.daweisoft.com//upload/file/gaoxiaodisijiang.mp4" type="video/mp4">
          </video>
          <div style="margin-left: 30px">
            <h3>第四讲：高校优势学科的专利特色库建设</h3>
            <p>培训大纲：

              1、什么是优势学科专利专题特色库；

              2、优势学科专利专题特色库的形式与功能展示

              3、优势学科专利专题特色库的重要价值；

              4、如何构建优势学科的全球专利特色库</p>
          </div>
        </div>
        <div class="d-flex flex-row">
          <video controls height="270" width="400">
            <source src="http://www.daweisoft.com//upload/file/gaoxiaodisijiang.mp4" type="video/mp4">
          </video>
          <div style="margin-left: 30px">
            <h3>第三讲：高校优势学科的专利特色库建设</h3>
            <p>培训大纲：

              1、什么是优势学科专利专题特色库；

              2、优势学科专利专题特色库的形式与功能展示

              3、优势学科专利专题特色库的重要价值；

              4、如何构建优势学科的全球专利特色库</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Users',
  data() {
    return {
      query: ''
    }
  },
  created() {

  },
  methods: {
    search() {
      const query = this.query
      if (query) {
        this.$router.push({ path: '/search/results', query: { q: query }})
      }
    }
  }
}
</script>
<style scoped>
.header {
  padding: 10px 20px;
  border-bottom: 1px solid #ebeef5;
  height: 300px;
  display: flex;
  flex-direction: column;

  align-items: center;
  background-image: linear-gradient(to top, #ace0f9 0%, #ffffff 100%);
}

.searchBox {
  width: 70%;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  background: transparent;
}

.searchBoxInput {
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
}

.searchBoxInput input {
  width: 100%;
  height: 50px;
  position: relative;
  box-sizing: border-box;
  border-radius: 4px;
  padding-right: 180px;
  padding-left: 22px;
  font-size: 14px;
  background-color: rgba(255, 255, 255, 0.85);
  color: rgba(0, 0, 0, 0.65);
  outline: none;
  border: 0;
  line-height: 50px;
}

.searchBoxInput input:focus {
  outline: none;
}

.searchBtn {
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

.searchBtn:hover {
  opacity: 0.7;
}

.searchHeader {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.searchAction {
  display: flex;
  flex-direction: row;
  color: #17233d;
  font-weight: bold;
  font-size: 13px;
  text-shadow: 3px 3px 3px #ccc;
  justify-content: space-around;
  margin-top: 7px;
  cursor: pointer;

}

.searchAction span {
  margin-right: 10px;
}

.recommend {
  margin: 20px 10px 0 10px;
}

.title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #17233d;

}

.title:hover {
  cursor: pointer;
  color: #bfe2f7;
  transition: 0.3s;
}

.title-active:hover {
  color: inherit;
  transition: 0.3s;
}

.title-active {
  text-decoration: none;
  border-bottom: 10px solid #bfe2f7;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  line-height: 10px;
  display: inline-block;
  margin-bottom: -10px !important;
}

</style>
