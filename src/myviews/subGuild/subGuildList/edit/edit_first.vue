<template>
  <div>
    <el-form ref="jurisdiction" :model="jurisdiction" label-width="90px" class="jurisdiction">
      <h3>基本信息:</h3>
      <el-form-item label="公会名称:">
        <el-input v-model="jurisdiction.name" placeholder="请输入公会昵称" />
      </el-form-item>
      <el-form-item label="公会账号:">
        <el-input v-model="jurisdiction.name" placeholder="请输入公会账号" />
      </el-form-item>
      <el-form-item label="公会密码:">
        <el-input v-model="jurisdiction.name" placeholder="请输入公会密码" />
      </el-form-item>
      <el-form-item label="确认密码:">
        <el-input v-model="jurisdiction.name" placeholder="请再次输入密码" />
      </el-form-item>
      <el-form-item label="备注:">
        <el-input v-model="jurisdiction.name" placeholder="请再次输入密码" />
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
        reason: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
