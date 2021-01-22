<template>
  <div>
    <el-form ref="jurisdiction" :model="jurisdiction" label-width="90px" class="jurisdiction">

      <el-form-item label="开启推广权限:">
        <el-switch v-model="jurisdiction.jurisdiction" />
      </el-form-item>
      <el-form-item label="推荐注册奖励(男会员):">
        <el-input v-model="jurisdiction.name" />（元/个）
      </el-form-item>
      <el-form-item label="VIP购买返佣:">
        <el-input v-model="jurisdiction.name" />（%）
      </el-form-item>
      <el-form-item label="钻石充值返佣:">
        <el-input v-model="jurisdiction.name" />（%）
      </el-form-item>
      <el-form-item label="聊币充值返佣:">
        <el-input v-model="jurisdiction.name" />（%）
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
        jurisdiction: false
      }
    }
  }
}
</script>

<style scoped>

</style>
