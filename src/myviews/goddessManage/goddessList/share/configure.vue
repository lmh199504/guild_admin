<template>
  <div v-loading="loading">
    <el-form ref="jurisdiction" :model="jurisdiction" label-width="90px" class="jurisdiction">
      <el-form-item label="开启推广权限:"><el-switch v-model="jurisdiction.generalize_jurisdiction" /></el-form-item>
      <el-form-item label="VIP购买返佣:">
        <el-input v-model="jurisdiction.vip_brokerage" />
        %
      </el-form-item>

      <el-form-item label="钻石充值返佣:">
        <el-input v-model="jurisdiction.diamond_brokerage" />
        %
      </el-form-item>
      <el-form-item label="聊币充值返佣:">
        <el-input v-model="jurisdiction.chat_brokerage" />
        %
      </el-form-item>
      <el-form-item><el-button size="mini" type="primary" @click="postData">提交</el-button></el-form-item>
    </el-form>
  </div>
</template>

<script>
import { generalizeAdjust } from '@/api/guild.js'
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
        jurisdiction: true
      },
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

      if (this.anchorData != null) {
        generalizeAdjust({
          girl_id: this.anchorData.member_id,
          scene: 'get'
        })
          .then(res => {
            this.jurisdiction = res.data
            this.jurisdiction.generalize_jurisdiction = this.jurisdiction.generalize_jurisdiction !== 0
            this.loading = false
          })
          .catch(() => {
            this.loading = false
          })
      }
    },
    postData() {
      this.loading = true
      const data = {
        girl_id: this.anchorData.member_id,
        scene: 'post'
      }

      const newObj = this.deepClone(this.jurisdiction)
      newObj.generalize_jurisdiction = newObj.generalize_jurisdiction === true ? 1 : 0
      generalizeAdjust(Object.assign(newObj, data))
        .then(res => {
          this.loading = false
          this.$message({
            type: 'success',
            offset: 300,
            message: '提交成功.'
          })
          this.getData()
        })
        .catch(() => {
          this.loading = false
        })
    },
    deepClone(obj) {
      // 先检测是不是数组和Object
      // let isMap = Object.prototype.toString.call(obj) === '[object Map];
      // let isSet = Object.prototype.toString.call(obj) === '[object Set];
      // let isArr = Object.prototype.toString.call(obj) === '[object Array]';
      const isArr = Array.isArray(obj)
      const isJson = Object.prototype.toString.call(obj) === '[object Object]'
      if (isArr) {
        // 克隆数组
        const newObj = []
        for (let i = 0; i < obj.length; i++) {
          newObj[i] = this.deepClone(obj[i])
        }
        return newObj
      } else if (isJson) {
        // 克隆Object
        const newObj = {}
        for (const i in obj) {
          newObj[i] = this.deepClone(obj[i])
        }
        return newObj
      }
      // 不是引用类型直接返回
      return obj
    }
  }
}
</script>

<style scoped></style>
