<template>
  <div>
    <el-form ref="jurisdiction" :model="jurisdiction" label-width="90px" class="jurisdiction">
      <el-form-item label="结算方式:">
        <el-radio-group v-model="jurisdiction.resource">
          <el-radio label="日结" />
          <el-radio label="周洁" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="结算模式:">
        <el-radio-group v-model="jurisdiction.type">
          <el-radio label="老" />
          <el-radio label="新" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="冻结时长(天):">
        <el-input v-model="jurisdiction.name" placeholder="默认不冻结" />
      </el-form-item>
      <el-form-item label="支付宝姓名:">
        <el-input v-model="jurisdiction.name" placeholder="请再次输入密码" />
      </el-form-item>
      <el-form-item label="支付宝账号:">
        <el-input v-model="jurisdiction.name" placeholder="请再次输入密码" />
      </el-form-item>
      <el-form-item label="提现手续费:">
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
        reason: '',
        resource: '',
        type: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
