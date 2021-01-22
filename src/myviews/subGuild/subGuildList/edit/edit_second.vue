<template>
  <div>
    <el-form ref="jurisdiction" :model="jurisdiction" label-width="90px" class="jurisdiction">
      <el-form-item label="女神惩罚权限:">
        <el-switch v-model="jurisdiction.jurisdiction" />
      </el-form-item>
      <el-form-item label="视频分成(%):">
        <el-input v-model="jurisdiction.name" />
      </el-form-item>
      <el-form-item label="语音分成(%):">
        <el-input v-model="jurisdiction.name" />
      </el-form-item>
      <el-form-item label="礼物分成(%):">
        <el-input v-model="jurisdiction.name" />
      </el-form-item>
      <el-form-item label="联系方式分成(%):">
        <el-input v-model="jurisdiction.name" />
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="primary">提交</el-button>
        <!-- <el-button size="mini" @click="reward_dia = false">取消</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jurisdiction: {
        name: '',
        reason: '',
        jurisdiction: true
      }
    }
  }
}
</script>

<style scoped>

</style>
