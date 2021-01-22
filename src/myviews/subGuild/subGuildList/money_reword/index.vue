<template>
  <div v-loading="loading">
    <el-form ref="form_reward" :model="form_reward" label-width="80px" class="form_reward">
      <el-form-item label="现金惩罚:"><el-input v-model="form_reward.money" width="200" placeholder="惩罚金额" /></el-form-item>
      <el-form-item label="当前:">{{ currentMoney }}元</el-form-item>

      <el-form-item label="惩罚理由:"><el-input v-model="form_reward.why" placeholder="惩罚理由至少4个字符" /></el-form-item>
      <el-form-item><el-button size="mini" type="primary" @click="postData">提交</el-button></el-form-item>
    </el-form>
  </div>
</template>

<script>
import { guildReward } from '@/api/guild.js'
export default {
  props: {
    currentData: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  data() {
    return {
      form_reward: {
        guild_id: '',
        scene: '',
        money: '',
        why: ''
      },
      currentMoney: '',
      loading: false
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.form_reward.guild_id = this.currentData.guild_id
      this.form_reward.scene = 'get'
      this.loading = true
      guildReward(this.form_reward)
        .then(res => {
          if (res.status === 0) {
            this.currentMoney = res.data.money
          }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    postData() {
      if (this.form_reward.why.length < 4) {
        this.$message({
          type: 'error',
          message: '理由至少为4个字.',
          offset: 300
        })
        return
      }
      this.form_reward.guild_id = this.currentData.guild_id
      this.form_reward.scene = 'post'
      this.loading = true
      guildReward(this.form_reward)
        .then(res => {
          if (res.status === 0) {
            this.$message({
              type: 'success',
              message: '提交成功.',
              offset: 300
            })
            this.getData()

            this.$emit('success')
          }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style></style>
