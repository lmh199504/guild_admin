<template>
  <div v-loading="loading">
    <el-form ref="jurisdiction" :model="jurisdiction" label-width="90px" class="jurisdiction">
      <el-form-item label="手机号码:"><el-input v-model="jurisdiction.contact_tel" :readonly="true" placeholder="未填写" /></el-form-item>
      <el-form-item label="查询手机号:">
        <el-input v-model="jurisdiction.contact_tel_diamond" :readonly="true" />
        钻石
      </el-form-item>
      <el-form-item label="QQ:"><el-input v-model="jurisdiction.contact_qq" :readonly="true" placeholder="未填写" /></el-form-item>
      <el-form-item label="查询QQ:">
        <el-input v-model="jurisdiction.contact_qq_diamond" :readonly="true" />
        钻石
      </el-form-item>
      <el-form-item label="微信:"><el-input v-model="jurisdiction.contact_wechat" :readonly="true" placeholder="未填写" /></el-form-item>
      <el-form-item label="查询微信:">
        <el-input v-model="jurisdiction.contact_wechat_diamond" :readonly="true" />
        钻石
      </el-form-item>
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
      this.loading = true
      this.srcList = []
      if (this.anchorData != null) {
        getGirlDetails({
          girl_id: this.anchorData.member_id,
          type: 'contact'
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
