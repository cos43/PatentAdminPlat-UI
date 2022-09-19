<template>
  <div>
    <h1 style="text-align: center;margin-top: 100px">专利检索</h1>
    <img style="width: 80%;margin: 0 10%" src="https://www.helloimg.com/images/2022/09/16/Z6LLbt.png">
  </div>
</template>
<script>
export default {
  name: 'Users',
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  }
}
</script>
