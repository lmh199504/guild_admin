<template>
  <div class="app-container">
    <div>
      <div class="table_title">基本数据</div>
      <el-row :gutter="12" class="el-row-4 mb-15" style="padding: 10px 0">
        <el-col :xl="6" :lg="12" :md="12" :sm="12" :xs="24">
          <el-card shadow="hover">
            <div class="card-default">
              <h1>
                {{ homemsg.cash }}
                <button type="button" class="el-button el-button--primary" style="padding: 7px;" @click="dialogFormVisible = true"><span>提现</span></button>
              </h1>
              <p>余额（元）</p>
            </div>
          </el-card>
        </el-col>

        <el-col v-if="guild_type === 1" :xl="6" :lg="12" :sm="12" :md="12" :xs="24">
          <el-card shadow="hover">
            <div class="card-default" style="position: relative;">
              <h1>{{ homemsg.frozen_money }}</h1>
              <p>冻结资金（元）</p>

              <div class="ab_right_box">
                <h1>最近冻结日:</h1>
                <p>{{ homemsg.frozen_day === 0 ? '-' : homemsg.frozen_day }}</p>
              </div>
            </div>
          </el-card>
        </el-col>

        <el-col :xl="6" :lg="12" :sm="12" :md="12" :xs="12">
          <el-card shadow="hover">
            <div class="card-default">
              <h1>{{ homemsg.member_number }}</h1>
              <p>工会会员</p>
            </div>
          </el-card>
        </el-col>
        <el-col :xl="6" :lg="12" :sm="12" :md="12" :xs="12">
          <el-card shadow="hover">
            <div class="card-default">
              <h1>
                {{ homemsg.generalize_id }}
                <button
                  v-clipboard:copy="homemsg.generalize_id"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                  type="button"
                  class="el-button el-button--primary"
                  style="padding: 7px;"
                >
                  <span>一键复制</span>
                </button>
              </h1>

              <p>通用邀请码</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- 提现弹窗 start-->
    <el-dialog class="a_dialog" title="提示" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <div class="popup_cash">请输入提现金额</div>
        <el-form-item label="" :label-width="formLabelWidth"><el-input v-model="form.cash" auto-complete="off" /></el-form-item>
        <div class="popup_cash" style="color: red">注：最低不能少于{{ homemsg.withdrawal_min }}</div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="toWithdrawal">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 提现弹窗 end-->
    <!-- 提现弹窗 start-->
    <el-dialog class="a_dialog" title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>{{ noticeText }}</span>
      <span slot="footer" class="dialog-footer"><el-button type="primary" @click="dialogVisible = false">确 定</el-button></span>
    </el-dialog>
    <!-- 提现弹窗 end-->
    <div class="table_title">提现信息</div>
    <el-row :gutter="12" class="el-row-4 mb-15" style="padding: 10px 0">
      <el-col :lg="6" :sm="12" :xs="12">
        <el-card shadow="hover">
          <div class="card-default">
            <h1>{{ homemsg.withdrawal_type }}</h1>
            <p>提现方式</p>
          </div>
        </el-card>
      </el-col>
      <el-col :lg="6" :sm="12" :xs="12">
        <el-card shadow="hover">
          <div class="card-default">
            <h1>{{ homemsg.draw_alipay_name }}</h1>
            <p>支付宝名称</p>
          </div>
        </el-card>
      </el-col>
      <el-col :lg="6" :sm="12" :xs="12">
        <el-card shadow="hover">
          <div class="card-default">
            <h1>{{ homemsg.draw_alipay_sn }}</h1>
            <p>支付宝账号</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="table_title">近期公告</div>
    <div class="noticeList">
      <el-card class="box-card">
        <ul class="text item">
          <li v-for="item in noticeList" :key="item.notice_id" class="noticel_li" @click="toNoticel($event, item.notice_id)">
            <div class="notice_text">
              <span class="noticel_span">▪</span>
              {{ item.title }}
            </div>
            <div>{{ item.addtime }}</div>
          </li>
        </ul>
      </el-card>
    </div>
  </div>
</template>

<script>
import clipboard from '@/directive/clipboard/index.js' // use clipboard by v-directive
export default {
  name: 'Home',
  directives: {
    clipboard
  },
  data() {
    return {
      dialogVisible: false, // 公告弹窗是否弹出
      formLabelWidth: '0', // 提现弹窗label宽度
      dialogFormVisible: false, // 提现弹窗是否弹出
      form: {
        // 提现表单数据
        cash: ''
      },
      noticeText: '嘿嘿嘿', // 公告详情
      noticeList: [
        {
          addtime: '2020-04-29',
          notice_id: 4,
          title: '我是一个公告'
        }
      ], // 公告列表数据
      noticeData: {
        // 公告参数
        limit: 10,
        page: 1
      },
      homemsg: {
        // 页面数据
        cash: '100',
        draw_alipay_name: '支付宝名称',
        draw_alipay_sn: '13600000000',
        member_number: '50',
        withdrawal_min: '',
        withdrawal_type: '支付宝提现',
        generalize_id: 'G10086'
      },
      guild_type: 0
    }
  },
  created: function() {

  },
  methods: {
    // 提现
    toWithdrawal() {
      var formCash = this.form.cash // 提现金额
      var homemsgCash = this.homemsg.cash // 总余额
      if (formCash < this.homemsg.withdrawal_min) {
        this.$message.error('最小提现金额' + this.homemsg.withdrawal_min)
        return
      }

      if (formCash > homemsgCash) {
        this.$message.error('提现金额不能大于余额')
        return
      }
      this.dialogFormVisible = false
    },
    // 公告详情
    toNoticel(e, num) {
      this.dialogVisible = true
    },
    // 关闭公告详情
    handleClose() {
      this.dialogVisible = false
    },
    onCopy() {
      this.$message({
        message: '复制成功',
        type: 'success',
        offset: 300
      })
    },
    onError() {
      this.$message({
        message: '复制失败',
        type: 'error',
        offset: 300
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.noticel_li {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  font-size: 15px;
  cursor: pointer;
}
.noticel_li:hover {
  background: #c9dcf1;
  text-decoration: underline;
}
.noticel_span {
  margin-right: 10px;
}
.noticeList {
  margin-top: 10px;
}
.el-dialog {
  width: 40%;
}
.popup_cash {
  margin-bottom: 15px;
}
.el-col-sm-12 {
  margin: 5px 0;
}
.table_title {
  border-left: 5px solid #409eff;
  padding-left: 15px;
}
.flex_card {
  display: flex;
  justify-content: space-between;
}
h1 {
  font-size: 22px;
}
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.card-default {
  height: 64px;
  position: relative;
}
.ab_right_box {
  position: absolute;
  right: 0px;
  top: -14px;
}
.ab_right_box p {
  text-align: right;
}
@media screen and (max-width: 600px) {
  .notice_text {
    max-width: 140px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  h1 {
    font-size: 16px !important;
  }
  p {
    font-size: 14px !important;
  }
  .card-default {
    height: 60px;
  }
  .ab_right_box {
    top: -10px;
  }
}
</style>
