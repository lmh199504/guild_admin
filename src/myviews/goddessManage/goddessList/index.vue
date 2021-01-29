<template>
  <div class="app-container generalize">
    <el-form ref="form" :model="getlist" :inline="true">
      <el-form-item label="主播ID">
        <el-col><el-input v-model="getlist.anchor_id" placeholder="请输入主播ID" /></el-col>
      </el-form-item>
      <el-form-item label="主播昵称">
        <el-col><el-input v-model="getlist.anchor_nickname" placeholder="请输入主播昵称" /></el-col>
      </el-form-item>
      <el-form-item label="会员类型">
        <el-col>
          <el-select v-model="getlist.is_nymph" placeholder="请选择">
            <el-option label="全部" value="" />
            <el-option label="女神" value="1" />
            <el-option label="普通用户" value="2" />
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col><el-button class type="primary" @click="onSearch">搜索</el-button></el-col>
      </el-form-item>
    </el-form>
    <el-table v-loading="listLoading" class="table_a" :data="list" style="width: 100%" max-height="650">
      <el-table-column prop="member_id" label="会员ID" width="100" align="center" />
      <el-table-column prop="nickname" label="昵称" min-width="110" align="center" />
      <el-table-column prop="is_cert" label="是否认证" min-width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.is_cert == '1' ? '已认证' : '未认证' }}
        </template>
      </el-table-column>
      <el-table-column prop="is_cert" label="身份" min-width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.is_goddess == '1' ? '女神' : '普通用户' }}
        </template>
      </el-table-column>
      <el-table-column prop="chat_money_fee" label="可提现陪聊余额" min-width="100" align="center" />
      <el-table-column prop="register_type" label="注册方式" min-width="100" align="center" />
      <el-table-column prop="bindtel" label="手机号码" width="110" align="center" />
      <el-table-column prop="login_time" label="最后登录" min-width="160" align="center" />
      <el-table-column prop="create_time" label="注册时间" min-width="160" align="center" />
      <el-table-column prop="is_black" label="状态" width="100" align="center">
        <template slot-scope="scope">

          <span v-if=" scope.row.is_black == '1'" @click="getReason(scope.row)">
            封号<span style="color: red;cursor: pointer;">(点击查看原因)</span>
          </span>
          <span v-else>正常</span>
        </template>
      </el-table-column>
      <el-table-column width="380" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="toDetails(scope.row)">详情</el-button>
          <el-button size="mini" type="primary" @click="toAdjustment(scope.row)">{{ !guild_type ? '推广配置' : '分成调整' }}</el-button>
          <el-button v-if="guild_type && goddess_punishment_jurisdiction === 1" size="mini" type="primary" @click="toReward(scope.row)">惩罚</el-button>
          <el-button v-if="guild_type" size="mini" type="primary" @click="toJurisdiction(scope.row)">限权</el-button>
          <el-button v-if="guild_type" size="mini" type="danger" @click="Unbound(scope.row)">解绑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        :current-page="getlist.page"
        :page-sizes="[10, 15, 20, 40]"
        :page-size="getlist.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 主播详情弹窗 -->
    <el-dialog v-if="anchor_msg_dia" title="主播详情" :visible.sync="anchor_msg_dia" @close="diaLogClose">
      <el-tabs v-model="anchorActive">
        <el-tab-pane label="基本信息" name="basic"><basic :anchor-data="currentAnchor" /></el-tab-pane>
        <el-tab-pane label="联系方式" name="contact" :lazy="true"><contact :anchor-data="currentAnchor" /></el-tab-pane>
        <el-tab-pane label="提现信息" name="withdrawal" :lazy="true"><withdrawal :anchor-data="currentAnchor" /></el-tab-pane>
        <el-tab-pane label="其他信息" name="other" :lazy="true"><other :anchor-data="currentAnchor" /></el-tab-pane>
        <el-tab-pane label="会员相册" name="member_photo" :lazy="true"><member-photo :anchor-data="currentAnchor" /></el-tab-pane>
        <el-tab-pane label="会员视频" name="member_video" :lazy="true"><member-video :anchor-data="currentAnchor" /></el-tab-pane>
        <el-tab-pane label="女神信息" name="god_msg" :lazy="true"><god-msg :anchor-data="currentAnchor" /></el-tab-pane>
      </el-tabs>
    </el-dialog>

    <!-- 分成调整 -->
    <el-dialog v-if="adjustment_dia" :title="adjustmentTitle" :visible.sync="adjustment_dia" @close="diaLogClose">
      <el-tabs v-model="adjustmentActive">
        <el-tab-pane v-if="guild_type" label="分成比例调整" name="adjustment"><adjustment :anchor-data="currentAnchor" /></el-tab-pane>
        <el-tab-pane v-if="generalize_jurisdiction" label="推广配置" name="configure" :lazy="true"><configure :anchor-data="currentAnchor" /></el-tab-pane>
      </el-tabs>
    </el-dialog>

    <!-- 奖惩弹窗 -->
    <el-dialog v-if="reward_dia" title="现金惩罚" :visible.sync="reward_dia"><reward :anchor-data="currentAnchor" /></el-dialog>

    <!-- 权限调整弹窗 -->
    <el-dialog v-if="jurisdiction_dia" title="权限设置" :visible.sync="jurisdiction_dia" @close="diaLogClose">
      <el-tabs v-model="activeName">
        <el-tab-pane label="视频限制" name="jurisdiction_first">
          <jurisdiction-first :anchor-data="currentAnchor" :jurisdict-data="jurisdictData" @success="getJurisdiction" />
        </el-tab-pane>
        <el-tab-pane label="语音限制" name="jurisdiction_second">
          <jurisdiction-second :anchor-data="currentAnchor" :jurisdict-data="jurisdictData" @success="getJurisdiction" />
        </el-tab-pane>
        <el-tab-pane label="私信限制" name="jurisdiction_third">
          <jurisdiction-third :anchor-data="currentAnchor" :jurisdict-data="jurisdictData" @success="getJurisdiction" />
        </el-tab-pane>
        <el-tab-pane label="私信图片限制" name="jurisdiction_fourth">
          <jurisdiction-fourth :anchor-data="currentAnchor" :jurisdict-data="jurisdictData" @success="getJurisdiction" />
        </el-tab-pane>
        <el-tab-pane label="私信短视频限制" name="jurisdiction_five">
          <jurisdiction-five :anchor-data="currentAnchor" :jurisdict-data="jurisdictData" @success="getJurisdiction" />
        </el-tab-pane>
        <el-tab-pane label="提现限制" name="jurisdiction_six">
          <jurisdiction-six :anchor-data="currentAnchor" :jurisdict-data="jurisdictData" @success="getJurisdiction" />
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <el-dialog title="封号原因" :visible.sync="showReason">
      <div v-loading="blackLoading">
        <h3>原因：{{ !blackLoading ? blackmark : '无' }}</h3>
        <el-row :gutter="20" style="display: flex;flex-wrap: wrap;">
          <el-col v-for="(item,index) in blackReason" :key="index" :xs="12" :sm="12" :md="12" :lg="8" :xl="6" class="black_reson_item">
            <div>
              <img v-if="item.is_video ===0" :src="item.src" alt="" width="100%">
              <video v-else :src="item.src" width="100%" controls />
            </div>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="showReason = false">取 消</el-button> -->
        <el-button type="primary" @click="showReason = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { newAnchorList, jurisdict, disengage, evidence } from '@/api/guild'
import jurisdictionFirst from './jurisdiction/jurisdiction_first'
import jurisdictionSecond from './jurisdiction/jurisdiction_second'
import jurisdictionThird from './jurisdiction/jurisdiction_third'
import jurisdictionFourth from './jurisdiction/jurisdiction_fourth'
import jurisdictionFive from './jurisdiction/jurisdiction_five'
import jurisdictionSix from './jurisdiction/jurisdiction_six'

import basic from './details/basic.vue'
import contact from './details/contact.vue'
import withdrawal from './details/withdrawal.vue'
import other from './details/other.vue'
import memberPhoto from './details/member_photo.vue'
import memberVideo from './details/member_video.vue'
import godMsg from './details/god_msg.vue'

import adjustment from './share/adjustment.vue'
import configure from './share/configure.vue'

import reward from './reward/reward.vue'

import { getGuildConfig } from '@/api/user.js'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  components: {
    jurisdictionFirst,
    jurisdictionSecond,
    jurisdictionThird,
    jurisdictionFourth,
    jurisdictionFive,
    jurisdictionSix,

    // 详情
    basic,
    contact,
    withdrawal,
    other,
    memberPhoto,
    memberVideo,
    godMsg,

    configure,
    adjustment,

    reward

  },
  data() {
    return {
      list: [{}],
      count: 0, // 列表数据总条数
      form: {
        member_id: '', // 用户ID
        nickname: '', // 昵称
        is_cert: '', // 是否认证 0： 否 1： 是
        register_type: '', // 注册类型
        bindtel: '', // 手机号
        create_time: false, // 注册时间
        is_black: [], // 当前状态 0： 正常 1： 黑名单
        login_time: '', // 上次登录时间
        money_fee: '', // 当前账户余额
        history_money_fee: '' // 历史总赚钱金额
      },
      getlist: {
        limit: 10, // 每页条数
        page: 1, // 当前页
        anchor_id: '', // 搜索主播ID
        anchor_nickname: '', // 搜索主播昵称
        is_nymph: '' // 会员类型
      },
      listLoading: false,
      anchor_msg_dia: false, // 主播详情弹窗
      adjustment_dia: false, // 分成调整
      form_adjust: {
        name: 0
      },
      reward_dia: false, // 奖惩

      jurisdiction_dia: false, // 权限
      jurisdictData: {},
      activeName: 'jurisdiction_first',
      anchorActive: 'basic',
      currentAnchor: null,
      adjustmentActive: 'adjustment',
      adjustmentTitle: '分成调整',
      generalize_jurisdiction: true, // 推广权限
      guild_type: false,
      parent_id: 0, // 0:一级公会 非0:二级公会
      goddess_punishment_jurisdiction: 0, // 女神奖惩权限 1:开启 0:关闭
      /*
        封号原因
      */
      showReason: false,
      blackReason: [],
      blackmark: '',
      blackLoading: false
    }
  },
  async created() {
    // 获取分成调整的权限
    const res = await getGuildConfig()
    // console.log(res)
    if (res.status === 0) {
      this.generalize_jurisdiction = res.data.generalize_jurisdiction === 1
      this.guild_type = res.data.guild_type === 1
      this.parent_id = res.data.parent_id
      this.goddess_punishment_jurisdiction = res.data.goddess_punishment_jurisdiction

      if (!this.guild_type) {
        this.adjustmentActive = 'configure'
        this.adjustmentTitle = '推广配置'
      } else {
        this.adjustmentActive = 'adjustment'
        this.adjustmentTitle = '分成调整'
      }
    }
    this.fetchData()
  },
  methods: {
    // 主播列表
    fetchData() {
      this.listLoading = true
      var data = this.getlist

      newAnchorList(data).then(response => {
        this.list = response.data.data
        this.count = response.data.count
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    onSearch() {
      // 搜索
      this.getlist.page = 1
      this.fetchData()
    },
    handleSizeChange(val) {
      // 切换每页多少条
      this.getlist.page = 1
      this.getlist.limit = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      // 当前是第几页

      this.getlist.page = val
      this.fetchData()
    },
    toDetails(row) {
      this.currentAnchor = row

      this.anchor_msg_dia = true
    },
    toAdjustment(row) {
      this.currentAnchor = row
      this.adjustment_dia = true
    },
    toReward(row) {
      this.currentAnchor = row
      this.reward_dia = true
    },
    toJurisdiction(row) {
      this.currentAnchor = row
      this.jurisdiction_dia = true
      this.getJurisdiction()
    },
    // 获取权限数据
    getJurisdiction() {
      jurisdict({
        girl_id: this.currentAnchor.member_id,
        scene: 'get'
      }).then(res => {
        this.jurisdictData = res.data
      })
    },
    diaLogClose() {
      // 窗口关闭回调
      this.activeName = 'jurisdiction_first'
      // this.adjustmentActive = 'adjustment';
      if (!this.guild_type) {
        this.adjustmentActive = 'configure'
        this.adjustmentTitle = '推广配置'
      } else {
        this.adjustmentActive = 'adjustment'
        this.adjustmentTitle = '分成调整'
      }
      this.anchorActive = 'basic'
    },
    Unbound(row) {
      var number = row.chat_money_fee

      if (number > 0) {
        this.$confirm(`该主播目前还有${number}金额未提现，完成提现后才可解绑`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          center: true
        })
          .then(() => {

          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消解绑',
              offset: 300
            })
          })
      } else {
        this.$confirm('确认是否与该主播解除关系？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          center: true
        })
          .then(() => {
            disengage({ girl_id: row.member_id }).then(res => {
              if (res.status === 0) {
                this.$message({
                  type: 'success',
                  message: '解绑成功!',
                  offset: 300
                })
                this.fetchData()
              }
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消解绑',
              offset: 300
            })
          })
      }
    },
    getReason(row) {
      this.showReason = true
      this.reasonData = row
      const { member_id } = row
      this.blackLoading = true
      evidence({
        member_id
      }).then(res => {
        this.blackReason = res.data.evidence
        this.blackmark = res.data.mark
        this.blackLoading = false
      }).catch(() => {
        this.blackLoading = false
      })
    }
  }
}
</script>
<style scoped>
.pagination {
  margin: 15px 0;
  text-align: right;
}
.table_a {
  border: 1px solid #ededed;
}
.line {
  text-align: center;
}
.form_adjust .el-input {
  width: 100px;
  margin-right: 5px;
}
.form_adjust .el-form-item__label,
.form_reward .el-form-item__label {
  line-height: 20px;
}
.form_reward .el-input {
  margin-right: 5px;
  width: 220px;
}
.black_reson_item{
  padding: 0px;
  margin-bottom: 10px;
}
.black_reson_item div{
  width: 100%;
  height: 100%;
  padding: 5px;
  background-color: rgb(74, 90, 108);
}
</style>
