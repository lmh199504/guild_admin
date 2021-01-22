<template>
  <div class="app-container">
    <div class="dl_temp_title">我的设置</div>
    <el-form ref="form" class="temp_ul" :model="form" label-width="120px">
      <el-form-item label="公会名称">
        <span>{{ form.guild_name }}</span>
      </el-form-item>
      <el-form-item label="公会账号">
        <span>{{ form.guild_login_name }}</span>
      </el-form-item>
      <!-- <el-form-item label="到账方式">
        <el-radio-group v-model="form.draw_type">
          <el-radio label="1">微信</el-radio>
          <el-radio label="2">支付宝</el-radio>
          <el-radio label="3">银行卡</el-radio>
        </el-radio-group>
      </el-form-item> -->
      <!-- <el-form-item  v-if="form.draw_type == 1" label="微信号">
        <el-input v-model="form.draw_wechat" />
      </el-form-item> -->
      <el-form-item label="支付宝账户名"><el-input v-model="form.draw_alipay_name" /></el-form-item>
      <el-form-item label="支付宝账号"><el-input v-model="form.draw_alipay_sn" /></el-form-item>
      <!-- <el-form-item  v-if="form.draw_type == 3" label="开户银行">
        <el-input v-model="form.draw_bank_name" />
      </el-form-item> -->
      <el-form-item label="备注"><el-input v-model="form.remark" type="textarea" /></el-form-item>
      <el-form-item><el-button type="primary" @click="toSetting">提交</el-button></el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getSetting, setSetting } from '@/api/guild'
export default {
  name: 'Set',
  data: function() {
    return {
      form: {
        guild_name: '',
        guild_login_name: '',
        draw_alipay_name: '',
        draw_alipay_sn: '',
        remark: ''
      } // 传给子组件数据
    }
  },
  created: function() {
    // 页面初始化获取数据
    getSetting().then(response => {
      this.form = response.data
    })
  },
  methods: {
    toSetting: function() {
      const data = this.form
      setSetting(data)
        .then(response => {
          console.log(response.data)
          this.$message({
            message: '信息修改成功',
            type: 'success'
          })
        })
        .catch(error => {
          this.$message.error(error.response.data.msg)
          console.log(error.response.data.msg)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form-item__label {
  width: 98px;
}
.dl_temp_title {
  border-left: 5px solid #409eff;
  padding-left: 15px;
}
.temp_ul {
  padding-top: 15px;
}
.el-col-sm-12 {
  margin: 5px 0;
}
.table_title {
  border-left: 5px solid #409eff;
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
