<template>
  <el-dialog class="diag" title="用户名密码登录" :visible.sync="formVisible" center>
    <el-form ref="form" :rules="rules" :model="form">
      <el-form-item prop="username">
        <el-input v-model="form.username" placeholder="用户名" name="username" autocomplete="off" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" placeholder="密码" name="password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item prop="captcha">
        <el-row type="flex" align="middle">
          <el-col :span="15">
            <el-input v-model="form.code" placeholder="验证码" name="code" type="text" autocomplete="off" />
          </el-col>
          <el-col :span="8" :offset="1">
            <img style="width: 100%;" :src="captchaBase64" alt="cap" @click="changeCaptcha">
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item style="margin-top: 20px">
        <el-button style="width: 100%;height: 40px" type="primary" @click="submitForm('form')">登录</el-button>
      </el-form-item>

      <el-form-item>
        <router-link target="_blank" to="/register">
          <span style="color: #0085fa;font-size: 14px;cursor: pointer">注册账号</span>
        </router-link>
      </el-form-item>
    </el-form>

  </el-dialog>
</template>
<script>
import { getCaptcha, login } from '@/api/user'

export default {
  name: 'LoginComponent',
  data() {
    const notEmptyValidator = (rule, value, callback) => {
      console.log(rule)
      if (value === '') {
        callback(new Error(`${rule.fullField}不能为空`))
      } else {
        callback()
      }
    }
    return {
      formVisible: false,
      loginLoading: false,
      captchaBase64: '',
      rules: {
        username: [
          {
            validator: notEmptyValidator, trigger: 'blur', fullField: '账号'
          }
        ],
        password: [
          {
            validator: notEmptyValidator, trigger: 'blur', fullField: '密码'
          }
        ],
        code: [
          {
            validator: notEmptyValidator, trigger: 'blur', fullField: '验证码'
          }
        ]
      },
      form: {
        username: '',
        password: '',
        code: ''
      }
    }
  },
  mounted() {
  },
  methods: {
    show() {
      this.initCaptcha()
    },
    initCaptcha() {
      const self = this
      getCaptcha().then(res => {
        self.captchaBase64 = res.data.data
        self.formVisible = true
        self.form.uuid = res.data.requestId
      })
    },
    changeCaptcha() {
      this.initCaptcha()
    },
    submitForm(formName) {
      const self = this
      this.loginLoading = true
      this.$refs[formName].validate((valid) => {
        self.loginLoading = false
        if (valid) {
          login(self.form).then(res => {
            if (res.data.code === 200) {
              self.$message({
                message: '登录成功',
                type: 'success'
              })
            } else {
              self.$message({
                message: res.data.msg,
                type: 'error'
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.diag {
  width: 100%;
}

.diag >>> .el-dialog {
  width: 350px;
  margin-top: 25vh!important;
}
</style>
