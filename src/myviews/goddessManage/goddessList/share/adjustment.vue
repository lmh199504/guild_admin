<template>
  <div v-loading="loading">

    <el-form ref="jurisdiction" :model="jurisdiction" label-width="90px" class="jurisdiction">
      <el-form-item label="音频分成调整比例:">
        <el-input v-model="jurisdiction.voice_ratio_adjustment" />
        %
      </el-form-item>

      <el-form-item label="视频分成调整比例:">
        <el-input v-model="jurisdiction.video_ratio_adjustment" />
        %
      </el-form-item>
      <el-form-item label="联系方式分成调整比例:">
        <el-input v-model="jurisdiction.link_ratio_adjustment" />
        %
      </el-form-item>

      <el-form-item label="礼物分成调整比例:">
        <el-input v-model="jurisdiction.gift_ratio_adjustment" />
        %
      </el-form-item>
      <el-form-item><el-button size="mini" type="primary" @click="submitData">提交</el-button></el-form-item>
    </el-form>
  </div>
</template>

<script>
import { brokerageAdjust } from '@/api/guild.js'
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
        brokerageAdjust({
          girl_id: this.anchorData.member_id,
          scene: 'get'
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
    },
    postData() {
      const data = {
        scene: 'post',
        girl_id: this.anchorData.member_id
      }
      brokerageAdjust(Object.assign(data, this.jurisdiction)).then(res => {
        this.loading = false
        this.$message({
          type: 'success',
          message: '提交成功',
          offset: 300,
          duration: 1000
        })
        this.getData()
      }).catch(() => {
        this.loading = false
      })
    },
    submitData() {
      this.loading = true
      this.postData()
    }
  }
}
</script>

<style scoped></style>
