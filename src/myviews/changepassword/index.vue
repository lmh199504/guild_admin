<template>
  <div class="app-container">
    <div class="dl_temp_title">修改密码</div>
    <el-form ref="form" class="temp_ul" :model="form" label-width="120px">
      <el-form-item label="旧密码">
        <el-input v-model="form.old_password" type="password" />
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="form.new_password" type="password" />
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="form.new_password_re" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="SetPassword">提交</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import { resetPassword } from '@/api/guild'
export default {
  name: 'Set',
  data: function() {
    return {
      form: {
        old_password: '', // 旧密码
        new_password: '', // 新密码
        new_password_re: '' // 确认密码
      }
    }
  },
  methods: {
    SetPassword: function() {
      const _this = this
      const data = this.form
      const old_password = this.form.old_password
      const new_password = this.form.new_password
      const new_password_re = this.form.new_password_re
      if (new_password !== new_password_re) {
        this.$message.error('两次输入的密码不一致')
        return
      }
      if (new_password.length < 6) {
        this.$message.error('密码不能少于6位')
        return
      }
      if (old_password === new_password) {
        this.$message.error('新密码不能与旧密码一致')
        return
      }
      resetPassword(data).then(response => {
        console.log(response.data)
        _this.form.old_password = '' // 旧密码
        _this.form.new_password = '' // 新密码
        _this.form.new_password_re = '' // 确认密码
        this.$message({
          message: '密码修改成功',
          type: 'success'
        })
      }).catch((error) => {
        this.$message.error(error.response.data.msg)
        console.log(error.response.data.msg)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form-item__label{
  width: 98px;
}
.dl_temp_title{
    border-left: 5px solid #409EFF;
    padding-left: 15px;
}
.temp_ul{
  padding-top: 15px;
}
.el-col-sm-12{
  margin: 5px 0;
}
.table_title{
  border-left: 5px solid #409EFF;
  padding-left: 15px;

}
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
