<template>
  <div v-loading="loading">
    <el-form ref="jurisdiction" :model="jurisdiction" label-width="90px" class="jurisdiction">
      <el-form-item label="支付宝名称:"><el-input v-model="jurisdiction.draw_alipay_name" :readonly="true" placeholder="未填写" /></el-form-item>
      <el-form-item label="支付宝账号:"><el-input v-model="jurisdiction.draw_alipay_sn" :readonly="true" placeholder="未填写" /></el-form-item>
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
          type: 'withdraw'
        })
          .then(res => {
            this.jurisdiction = res.data
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
