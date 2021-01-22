<template>
  <div v-loading="loading">
    <el-form ref="jurisdiction" :model="jurisdiction" label-width="90px" class="jurisdiction">
      <el-form-item label="视频限制:"><el-input v-model="jurisdiction.day" placeholder="限制请输入天数，输0设为正常" /></el-form-item>

      <el-form-item label="当前:">{{ jurisdictData.system_video_limit }}</el-form-item>
      <el-form-item label="理由:">
        <el-select v-model="jurisdiction.reason" placeholder="请选择理由">
          <el-option label="非法用户" value="0" />
          <el-option label="引导第三方" value="1" />
          <el-option label="涉黄" value="2" />
          <el-option label="诈骗" value="3" />
          <el-option label="小号" value="4" />
        </el-select>
      </el-form-item>

      <el-form-item label="理由自定义:"><el-input v-model="jurisdiction.why" placeholder="请务必选择理由或填写" /></el-form-item>

      <el-form-item>
        <el-button size="mini" type="primary" @click="postData">提交</el-button>
        <!-- <el-button size="mini" @click="reward_dia = false">取消</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { jurisdict } from '@/api/guild.js'

export default {
  props: {
    anchorData: {
      type: Object,
      default: () => {
        return null
      }
    },
    jurisdictData: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  data() {
    return {
      jurisdiction: {
        day: '',
        why: '',
        reason: ''
      },
      loading: false
    }
  },
  watch: {
    anchorData() {
      // this.getData();
    }
  },
  methods: {
    postData() {
      this.loading = true
      jurisdict({
        girl_id: this.anchorData.member_id,
        scene: 'post',
        filed: 'system_video_limit',
        why: this.getWhy(),
        day: this.jurisdiction.day
      }).then(res => {
        this.loading = false
        this.$message({
          message: '提交成功.',
          offset: 300,
          type: 'success',
          duration: 1000
        })

        this.$emit('success')
      }).catch(() => {
        this.loading = false
      })
    },
    getWhy() {
      let why = ''
      if (this.jurisdiction.why === '') {
        switch (parseInt(this.jurisdiction.reason)) {
          case 0:
            why = '非法用户'
            break
          case 1:
            why = '引导第三方'
            break
          case 2:
            why = '涉黄'
            break
          case 3:
            why = '诈骗'
            break
          case 4:
            why = '小号'
            break
          default:
            why = ''
        }
        return why
      } else {
        return this.jurisdiction.why
      }
    }
  }
}
</script>

<style scoped></style>
