<template>
  <div v-loading="loading">
    <el-form ref="jurisdiction" :model="jurisdiction" label-width="90px" class="jurisdiction">
      <el-form-item label="是否认证:"><el-input v-model="jurisdiction.is_cert" :readonly="true" placeholder="未填写" /></el-form-item>
      <el-form-item label="是否黑名单:"><el-input v-model="jurisdiction.is_black" :readonly="true" placeholder="未填写" /></el-form-item>
      <el-form-item label="会员IP:"><el-input v-model="jurisdiction.login_ip" :readonly="true" placeholder="未填写" /></el-form-item>
      <el-form-item label="游客登入设备标识:"><el-input v-model="jurisdiction.device_mark" :readonly="true" placeholder="未填写" /></el-form-item>
      <el-form-item label="注册方式:"><el-input v-model="jurisdiction.register_type" :readonly="true" placeholder="未填写" /></el-form-item>
      <el-form-item label="注册设备:"><el-input v-model="jurisdiction.device" :readonly="true" placeholder="未填写" /></el-form-item>
      <el-form-item label="注册时间:"><el-input v-model="jurisdiction.create_time" :readonly="true" placeholder="未填写" /></el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getGirlDetails } from '@/api/guild.js'
export default {
  props: {
    anchorData: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  data() {
    return {
      jurisdiction: {},
      loading: false
    }
  },
  watch: {
    anchorData() {
      this.getData()
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.srcList = []
      this.loading = true
      if (this.anchorData != null) {
        getGirlDetails({
          girl_id: this.anchorData.member_id,
          type: 'other'
        })
          .then(res => {
            this.jurisdiction = res.data
            if (this.jurisdiction.is_cert === 0) {
              // "is_cert": 1//实名认证 0:否 1:是
              this.jurisdiction.is_cert = '否'
            } else {
              this.jurisdiction.is_cert = '是'
            }

            if (this.jurisdiction.is_black === 0) {
              // "is_black": 0,//是否黑名单 0:否 1:是
              this.jurisdiction.is_black = '否'
            } else {
              this.jurisdiction.is_black = '是'
            }
            this.loading = false
          })
          .catch(() => {
            this.loading = false
          })
      }
    }
  }
}
</script>

<style scoped></style>
