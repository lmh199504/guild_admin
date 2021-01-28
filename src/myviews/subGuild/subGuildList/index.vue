<template>
  <div class="app-container generalize">
    <el-form ref="form" :model="getlist" :inline="true">
      <el-form-item label="公会ID">
        <el-col><el-input v-model="getlist.guild_id" placeholder="请输入公会ID" /></el-col>
      </el-form-item>
      <el-form-item label="公会昵称">
        <el-col><el-input v-model="getlist.guild_name" placeholder="公会昵称" /></el-col>
      </el-form-item>
      <el-form-item>
        <el-col><el-button class type="primary" @click="onSearch">搜索</el-button></el-col>
      </el-form-item>
      <el-form-item v-if="GuildConfig.create_guild === 1">
        <el-col><el-button class type="primary" @click="toNewEdit">添加新公会</el-button></el-col>
      </el-form-item>
    </el-form>
    <el-table v-loading="listLoading" class="table_a" :data="list" style="width: 100%" max-height="650">
      <el-table-column prop="guild_id" label="公会ID" width="100" align="center" />
      <el-table-column prop="guild_name" label="公会昵称" min-width="110" align="center" />
      <el-table-column prop="cash" label="可提现余额" min-width="100" align="center" />
      <el-table-column prop="addtime" label="开通时间" min-width="100" align="center" />
      <el-table-column prop="last_login_time" label="上次登录时间" min-width="100" align="center" />
      <el-table-column width="380" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="toEidt(scope.row)">编辑</el-button>
          <el-button v-if="GuildConfig.guild_type === 1" size="mini" type="primary" @click="moneyReword(scope.row)">现金惩罚</el-button>
          <el-button v-if="GuildConfig.guild_type === 1" size="mini" type="primary" @click="frozenReword(scope.row)">冻结详情</el-button>
          <el-button size="mini" type="danger" @click="del(scope.row)">删除</el-button>
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

    <!-- 奖惩弹窗 -->
    <el-dialog v-if="reward_dia" title="现金惩罚" :visible.sync="reward_dia"><mReword :current-data="currentData" @success="fetchData" /></el-dialog>

    <!-- 权限调整弹窗 -->
    <el-dialog v-if="edit_dia" :title="isNew === true ? '新增公会' : '公会编辑'" :visible.sync="edit_dia" @closed="closeDialog">
      <Edit :current-data="currentData" :is-new="isNew" :config="GuildConfig" @success="fetchData" @close="edit_dia = false" />
    </el-dialog>
    <!-- 冻结惩罚弹窗 -->
    <el-dialog v-if="fronzen_dia" title="冻结惩罚" :visible.sync="fronzen_dia" @closed="closeDialog"><fReword :current-data="currentData" @success="fetchData" /></el-dialog>
  </div>
</template>

<script>
import { secondGuildList, delGuild } from '@/api/guild'
import { getGuildConfig } from '@/api/user'

import Edit from './edit/index.vue'
import mReword from './money_reword/index.vue'
import fReword from './frozen_detail/index.vue'
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
    Edit,
    mReword,
    fReword
  },
  data() {
    return {
      list: [
        {}
      ],
      count: 0, // 列表数据总条数
      getlist: {
        limit: 10, // 每页条数
        page: 1, // 当前页
        guild_id: '', // 搜索主播ID
        guild_name: '' // 搜索主播昵称
      },
      listLoading: false,
      reward_dia: false, // 奖惩
      form_reward: {
        name: ''
      },
      edit_dia: false, // 权限
      activeName: 'edit_first',
      currentData: null,
      isNew: false, // 是否新增公会,
      GuildConfig: {
        guild_type: 1,
        create_guild: 1
      },
      fronzen_dia: false // 冻结弹窗
    }
  },
  created() {
    this.fetchData()
    getGuildConfig().then(res => {
      this.GuildConfig = res.data
    })
  },
  methods: {
    // 主播列表
    fetchData() {
      this.listLoading = true
      var data = this.getlist
      secondGuildList(data)
        .then(response => {
          this.list = response.data.data
          this.count = response.data.count
          this.listLoading = false
        })
        .catch(() => {
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
    closeDialog() {
      this.currentData = null
      this.isNew = false
    },
    toNewEdit() {
      // 打开新增
      this.isNew = true
      this.edit_dia = true
    },
    toEidt(row) {
      // 打开编辑
      this.isNew = false
      this.currentData = row
      this.edit_dia = true
    },
    // 删除
    del(row) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delGuild({
            guild_id: row.guild_id
          }).then(res => {
            if (res.status === 0) {
              this.$message({
                type: 'success',
                message: '删除成功!',
                offset: 300
              })
              this.fetchData()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
            offset: 300
          })
        })
    },

    // 现金惩罚
    moneyReword(row) {
      this.currentData = row
      this.reward_dia = true
    },
    // 冻结资金惩罚
    frozenReword(row) {
      this.currentData = row
      this.fronzen_dia = true
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
.form_reward .el-input {
  margin-right: 5px;
  width: 220px;
}
</style>
