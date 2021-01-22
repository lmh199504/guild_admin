<template>
  <div v-loading="loading">
    <el-form ref="jurisdiction" :model="jurisdiction" label-width="90px" class="jurisdiction">
      <h3>基本信息:</h3>
      <el-form-item label="公会名称:"><el-input v-model="jurisdiction.guild_name" placeholder="请输入公会昵称" /></el-form-item>
      <el-form-item label="公会账号:"><el-input v-model="jurisdiction.guild_login_name" placeholder="请输入公会账号" :disabled="!isNew" /></el-form-item>
      <el-form-item label="公会密码:"><el-input v-model="jurisdiction.guild_login_password" placeholder="请输入公会密码" type="password" /></el-form-item>
      <el-form-item label="确认密码:"><el-input v-model="jurisdiction.guild_login_password_re" placeholder="请再次输入密码" type="password" /></el-form-item>
      <el-form-item label="备注:"><el-input v-model="jurisdiction.remark" placeholder="请再次输入备注" /></el-form-item>

      <h3>女神配置:</h3>
      <el-form-item v-if="config.goddess_punishment_jurisdiction === 1 && config.guild_type === 1" label="女神惩罚权限:">
        <el-switch v-model="jurisdiction.goddess_punishment_jurisdiction" />
      </el-form-item>
      <el-form-item v-if="config.guild_type === 1" label="视频分成(%):"><el-input v-model="jurisdiction.video_ratio_adjustment" /></el-form-item>
      <el-form-item v-if="config.guild_type === 1" label="语音分成(%):"><el-input v-model="jurisdiction.voice_ratio_adjustment" /></el-form-item>
      <el-form-item v-if="config.guild_type === 1" label="礼物分成(%):"><el-input v-model="jurisdiction.gift_ratio_adjustment" /></el-form-item>
      <el-form-item v-if="config.guild_type === 1" label="联系方式分成(%):"><el-input v-model="jurisdiction.link_ratio_adjustment" /></el-form-item>

      <el-form-item v-if="config.guild_type === 0" label="女神提现分成(%):"><el-input v-model="jurisdiction.draw_percent" /></el-form-item>

      <el-form-item v-if="config.guild_type === 1" label="文字分成(%):"><el-input v-model="jurisdiction.chat_ratio_adjustment" /></el-form-item>

      <h3>结算配置:</h3>
      <!-- <el-form-item label="冻结时长(天):" v-if="config.guild_type===1">
        <el-input v-model="jurisdiction.frozen_money_fee_day" placeholder="默认不冻结"></el-input>
      </el-form-item> -->
      <el-form-item label="支付宝姓名:"><el-input v-model="jurisdiction.draw_alipay_name" placeholder="支付宝姓名" /></el-form-item>
      <el-form-item label="支付宝账号:"><el-input v-model="jurisdiction.draw_alipay_sn" placeholder="支付宝账号" /></el-form-item>
      <!--   <el-form-item label="提现手续费:" v-if="config.guild_type===1">
        <el-input v-model="jurisdiction.withdraw_charge	" placeholder="请输入提现手续费"></el-input>
      </el-form-item> -->

      <h3>推广配置</h3>
      <el-form-item v-if="config.generalize_jurisdiction === 1" label="开启推广权限:"><el-switch v-model="jurisdiction.generalize_jurisdiction" /></el-form-item>
      <!--      <el-form-item label="推荐注册奖励(男会员):">
        <el-input v-model="jurisdiction.name" ></el-input>（元/个）
      </el-form-item> -->
      <el-form-item v-if="config.generalize_jurisdiction === 1" label="VIP购买返佣:">
        <el-input v-model="jurisdiction.vip_brokerage" />
        （%）
      </el-form-item>
      <el-form-item v-if="config.generalize_jurisdiction === 1" label="钻石充值返佣:">
        <el-input v-model="jurisdiction.diamond_brokerage" />
        （%）
      </el-form-item>
      <el-form-item v-if="config.generalize_jurisdiction === 1" label="聊币充值返佣:">
        <el-input v-model="jurisdiction.chat_brokerage" />
        （%）
      </el-form-item>

      <el-form-item>
        <el-button size="mini" type="primary" @click="postData">提交</el-button>
        <!-- <el-button size="mini" @click="reward_dia = false">取消</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getSecondGuild, changeSecondGuild } from '@/api/guild'
export default {
  props: {
    currentData: {
      type: Object,
      default: () => {
        return null
      }
    },
    isNew: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    config: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  data() {
    return {
      jurisdiction: {
        guild_id: '',
        guild_name: '',
        guild_login_name: '',
        guild_login_password: '',
        guild_login_password_re: '',
        draw_alipay_name: '',
        draw_alipay_sn: '',
        remark: '',
        video_ratio_adjustment: '',
        voice_ratio_adjustment: '',
        link_ratio_adjustment: '',
        gift_ratio_adjustment: '',
        // frozen_money_fee_day:'',
        goddess_punishment_jurisdiction: false,
        generalize_jurisdiction: false,
        // withdraw_charge:'',
        diamond_brokerage: '',
        vip_brokerage: '',
        chat_brokerage: '',
        draw_percent: '',
        chat_ratio_adjustment: ''
      },
      loading: false
    }
  },
  created() {
    if (this.isNew === true) {
      // console.log("新增公会")
    } else {
      // console.log("编辑公会")

      this.getData()
    }
  },
  methods: {
    getData() {
      this.loading = true
      getSecondGuild({
        guild_id: this.currentData.guild_id
      })
        .then(res => {
          this.jurisdiction = res.data
          this.jurisdiction.goddess_punishment_jurisdiction = this.jurisdiction.goddess_punishment_jurisdiction === 1
          this.jurisdiction.generalize_jurisdiction = this.jurisdiction.generalize_jurisdiction === 1
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    postData() {
      this.loading = true
      if (this.isNew === true) {
        // 新增公会

        this.jurisdiction.guild_id = ''
      } else {
        // 编辑公会

        this.jurisdiction.guild_id = this.currentData.guild_id
      }
      this.jurisdiction.goddess_punishment_jurisdiction = this.jurisdiction.goddess_punishment_jurisdiction === true ? 1 : 0
      this.jurisdiction.generalize_jurisdiction = this.jurisdiction.generalize_jurisdiction === true ? 1 : 0

      changeSecondGuild(this.jurisdiction)
        .then(res => {
          if (this.isNew === true) {
            // 新增公会
            this.$emit('close')
            this.$message({
              type: 'success',
              message: '公会创建成功.',
              offset: 300,
              duration: 1500
            })
          } else {
            this.getData()
            this.$message({
              type: 'success',
              message: '公会编辑成功.',
              offset: 300,
              duration: 1500
            })
          }
          this.$emit('success')
          this.loading = false
        })
        .catch(() => {
          // this.getData()
          this.loading = false
          this.jurisdiction.goddess_punishment_jurisdiction = this.jurisdiction.goddess_punishment_jurisdiction === 1
          this.jurisdiction.generalize_jurisdiction = this.jurisdiction.generalize_jurisdiction === 1
        })
    }
  }
}
</script>

<style scoped></style>
