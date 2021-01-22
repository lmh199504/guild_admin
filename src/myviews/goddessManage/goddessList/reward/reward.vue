<template>
  <div v-loading="loading">
    <el-form ref="jurisdiction" :model="jurisdiction" label-width="80px" class="jurisdiction">
      <el-form-item label="现金惩罚:"><el-input v-model="jurisdiction.money_reward" width="200" placeholder="输入惩罚金额." /></el-form-item>
      <el-form-item label="当前:">{{ money }}元</el-form-item>
      <el-form-item label="奖惩理由:"><el-input v-model="jurisdiction.why" /></el-form-item>
      <el-form-item><el-button size="mini" type="primary" @click="postData">提交</el-button></el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reward } from '@/api/guild.js'
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
      jurisdiction: {
        money_reward: '',
        why: ''
      },
      money: 0,
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
  destroyed() {

  },
  methods: {
    getData() {
      this.loading = true

      if (this.anchorData != null) {
        reward({
          girl_id: this.anchorData.member_id,
          scene: 'get'
        })
          .then(res => {
            // this.jurisdiction = res.data;
            this.money = res.data.money
            this.loading = false
          })
          .catch(() => {
            this.loading = false
          })
      }
    },
    postData() {
      if (this.jurisdiction.why.length < 4) {
        this.$message({
          type: 'warning',
          message: '请输入理由，至少4个字符.',
          offset: 300,
          duration: 1500
        })
        return
      }

      this.loading = true
      const data = {
        girl_id: this.anchorData.member_id,
        scene: 'post'
      }
      reward(Object.assign(data, this.jurisdiction))
        .then(() => {
          this.loading = false
          this.$message({
            type: 'success',
            message: '提交成功.',
            offset: 300,
            duration: 1500
          })
          this.getData()
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style scoped></style>
