<template>
  <div v-loading="loading">
    <el-form ref="jurisdiction" :model="jurisdiction" label-width="90px" class="jurisdiction">
      <el-form-item label="出生年份:"><el-input v-model="jurisdiction.year" :readonly="true" placeholder="未填写" /></el-form-item>
      <el-form-item label="所在地:"><el-input v-model="jurisdiction.province" :readonly="true" placeholder="未填写" /></el-form-item>
      <el-form-item label="身高:"><el-input v-model="jurisdiction.height" :readonly="true" placeholder="未填写" /></el-form-item>
      <el-form-item label="体重:"><el-input v-model="jurisdiction.weight" :readonly="true" placeholder="未填写" /></el-form-item>
      <el-form-item label="情感:"><el-input v-model="jurisdiction.emotion" :readonly="true" placeholder="未填写" /></el-form-item>
      <el-form-item label="职业:"><el-input v-model="jurisdiction.occupation" :readonly="true" placeholder="未填写" /></el-form-item>
      <el-form-item label="标签:"><el-input v-model="jurisdiction.tag" :readonly="true" placeholder="未填写" /></el-form-item>
      <el-form-item label="认证状态:"><el-input v-model="jurisdiction.status" :readonly="true" placeholder="未填写" /></el-form-item>
      <el-form-item label="真实姓名:"><el-input v-model="jurisdiction.true_name" :readonly="true" placeholder="未填写" /></el-form-item>
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
          type: 'goddess'
        })
          .then(res => {
            this.loading = false
            this.jurisdiction = res.data

            if (this.jurisdiction.province == null) {
              this.jurisdiction.province = ''
            } else if (this.jurisdiction.area == null && this.jurisdiction.province != null) {
              // this.jurisdiction.province = this.jurisdiction.province
            } else {
              this.jurisdiction.province = this.jurisdiction.province + '/' + this.jurisdiction.area
            }
            this.jurisdiction.status = this.jurisdiction.status === 1 ? '通过' : this.jurisdiction.status === 2 ? '待审' : '拒绝' // 认证状态 1:通过 2:待审 3:拒绝
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
