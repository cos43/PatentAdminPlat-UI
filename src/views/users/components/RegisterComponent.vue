<template>
  <div class="container">
    <login-component ref="loginRef" />
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" class="form">

      <div style="margin-left: 15px;font-size: 35px;font-weight: bold;margin-bottom: 15px;margin-top: 50px;">欢迎注册</div>
      <div style="font-size: 14px;color:gray;margin: 20px 0 20px 18px">
        已有账号？<span style="color:#0093fa;cursor: pointer" @click="login">登录</span>
      </div>
      <el-form-item class="form-item" label="用户名" prop="name">
        <el-input v-model="ruleForm.name" class="form-input" />
      </el-form-item>
      <el-form-item class="form-item" label="手机号" prop="region">
        <el-input v-model="ruleForm.name" class="form-input" />
      </el-form-item>
      <el-form-item label="密码" class="form-item" prop="region">
        <el-input v-model="ruleForm.name" class="form-input" />
      </el-form-item>
      <el-form-item label="验证码" class="form-item" prop="region">
        <el-input v-model="ruleForm.name" class="form-input" />
      </el-form-item>
      <div style="margin-top: 40px">
        <el-button style="width: 100%;height: 50px;border-radius: 20px;font-size: 16px;font-weight: bold" type="primary" @click="submitForm('ruleForm')">注册</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import LoginComponent from '@/views/users/components/LoginComponent'
export default {
  components: {
    LoginComponent
  },
  data() {
    return {
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    login() {
      this.$refs.loginRef.show()
    }
  }
}
</script>
<style scoped>
.container{
  height: 100vh;
  background: url('https://passport.baidu.com/static/passpc-account/img/reg_bg_min.jpg') no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.form{
  width: 450px;
  background-color: rgba(255,255,255,.8);
  padding: 30px 25px;
  border-radius: 10px;
}
.form-item{
  margin: 30px 0;
}
.form-item >>> .el-input__inner{
  height: 40px;

}

</style>
