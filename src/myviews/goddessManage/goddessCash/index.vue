<template>
  <div class="app-container generalize">
    <el-form ref="form" :model="getlist" :inline="true">
      <!-- <el-form-item label="主播ID">
        <el-col>
          <el-input v-model="getlist.anchor_id" placeholder="请输入主播ID" />
        </el-col>
      </el-form-item>
      <el-form-item label="主播昵称">
        <el-col>
          <el-input v-model="getlist.anchor_nickname" placeholder="请输入主播昵称" />
        </el-col>
      </el-form-item> -->
      <el-form-item label="提现状态">
        <el-col>
          <el-select v-model="getlist.type" placeholder="请选择">
            <el-option label="全部" value="" />
            <!-- <el-option label="待打款" value="1" /> -->
            <el-option label="已打款" value="4" />
            <el-option label="已拒绝" value="5" />
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col>
          <el-button class type="primary" @click="onSearch">查询</el-button>
        </el-col>
      </el-form-item>
    </el-form>
    <el-table v-loading="tableLoding" class="table_a" :data="list" style="width: 100%" max-height="650">
      <el-table-column
        prop="create_time"
        label="会员昵称（ID）"
        width="200"
        align="center"
      >
        <template slot-scope="scope">
          {{ `${scope.row.nickname}(${scope.row.member_id})` }}
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        width="150"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type == 4" type="success">已打款</el-tag>
          <el-tag v-if="scope.row.type == 5" type="danger">已拒绝</el-tag>

        </template>
      </el-table-column>
      <el-table-column
        prop="chat_money"
        label="提现金额"
        min-width="100"
        align="center"
      />
      <el-table-column
        prop="mark"
        label="原因"
        min-width="100"
        align="center"
      />

      <el-table-column
        prop="create_time"
        label="操作时间"
        min-width="150"
        align="center"
      />

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

  </div>
</template>

<script>
import { auditWithdrawList } from '@/api/guild'

export default {

  data() {
    return {
      list: null,
      count: 0, // 列表数据总条数
      getlist: {
        limit: 10, // 每页条数
        page: 1, // 当前页
        type: '' //  提现状态 1：待打款 4：已打款 5：已拒绝
      },
      tableLoding: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 主播列表
    fetchData() {
      var data = this.getlist
      this.tableLoding = true
      auditWithdrawList(data).then(response => {
        this.list = response.data.data
        this.count = response.data.count
        this.tableLoding = false
      }).catch(() => {
        this.tableLoding = false
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
    }
  }
}
</script>
<style>
.report{
    padding: 30px;
}
.report .el-dialog{
    margin-top: 0!important;
}
</style>
<style  scoped>
.report_popup{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.pagination{
  margin: 15px 0;
  text-align: right;
}
.table_a{
  border: 1px solid #ededed;
}
.line{
  text-align: center;
}
</style>
