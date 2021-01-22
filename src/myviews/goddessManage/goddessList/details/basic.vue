<template>
  <div v-loading="loading">
    <el-form ref="jurisdiction" :model="jurisdiction" label-width="90px" class="jurisdiction">
      <el-form-item label="会员ID:"><el-input v-model="jurisdiction.member_id" :readonly="true" /></el-form-item>
      <el-form-item label="会员账号:"><el-input v-model="jurisdiction.member_name" :readonly="true" /></el-form-item>
      <el-form-item label="会员昵称:"><el-input v-model="jurisdiction.nickname" :readonly="true" /></el-form-item>
      <el-form-item label="会员头像:"><el-image :src="jurisdiction.avatar" style="width: 100px;" :preview-src-list="srcList" /></el-form-item>
      <el-form-item label="会员独白:"><el-input v-model="jurisdiction.soliloquy" :readonly="true" /></el-form-item>
      <el-form-item label="背景照片:"><el-image :src="jurisdiction.bg_photo" style="width: 100px;" :preview-src-list="srcList" /></el-form-item>
      <el-form-item label="背景视频:">
        <video v-if="jurisdiction.bg_video != ''" :src="jurisdiction.bg_video" controls style="width: 150px;" />
        <span v-else>暂无视频</span>
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
      srcList: [],
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
          type: 'base'
        })
          .then(res => {
            this.jurisdiction = res.data
            this.srcList.push(this.jurisdiction.avatar)
            this.srcList.push(this.jurisdiction.bg_photo)
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
