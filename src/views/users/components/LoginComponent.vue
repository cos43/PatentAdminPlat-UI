<template>
  <el-dialog width="25%" title="用户名密码登录" :visible.sync="formVisible" center>
    <el-form ref="form" :rules="rules" :model="form">
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username" name="username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" name="password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item style="margin-top: 40px">
        <el-button style="width: 100%;height: 40px" type="primary">登录</el-button>
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
        ]
      },
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    show() {
      this.formVisible = true
    },

    submitForm(formName) {
      const self = this
      this.loginLoading = true
      this.$refs[formName].validate((valid) => {
        self.loginLoading = false
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
