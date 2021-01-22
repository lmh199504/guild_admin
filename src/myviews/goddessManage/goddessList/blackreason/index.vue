<template>
  <el-dialog title="提示" :visible.sync="showReason" :before-close="close">
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
      <!-- <el-button @click="showReason = false">取 消</el-button> -->
      <el-button type="primary" @click="close()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: ['showReason', 'reasonData'],
  data() {
    return {

    }
  },
  created() {
    console.log(this.showReason)
    console.log(this.reasonData)
  },
  methods: {
    close() {
      this.$emit('closeReason')
    }
  }
}
</script>

<style></style>
