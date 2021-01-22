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
          <el-select v-model="getlist.status" placeholder="请选择">
            <el-option label="全部" value="" />
            <el-option label="待打款" value="1" />
            <el-option label="已打款" value="2" />
            <el-option label="已拒绝" value="3" />
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col>
          <el-button class type="primary" @click="onSearch">查询</el-button>
        </el-col>
      </el-form-item>
    </el-form>
    <el-table class="table_a" :data="list" style="width: 100%" max-height="650">
      <el-table-column
        prop="create_time"
        label="提交时间"
        width="200"
        align="center"
      />
      <el-table-column
        prop="update_time"
        label="更新时间"
        min-width="110"
        align="center"
      />
      <el-table-column
        prop="money"
        label="提现金额"
        min-width="100"
        align="center"
      />
      <el-table-column
        prop="draw_alipay_name"
        label="支付宝名"
        min-width="100"
        align="center"
      />

      <el-table-column
        prop="draw_alipay_sn"
        label="支付宝账号"
        min-width="150"
        align="center"
      />
      <el-table-column
        label="状态"
        width="150"
        align="center"
      >
        <template slot-scope="scope">
          <span> {{ scope.row.status == 1 ? '待打款': scope.row.status == 2? '已打款':'已拒绝' }}</span>
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

  </div>
</template>

<script>
import { withdrawalLogList } from '@/api/guild'

export default {

  data() {
    return {
      list: null,
      count: 0, // 列表数据总条数
      getlist: {
        limit: 10, // 每页条数
        page: 1, // 当前页
        status: '' //  提现状态 1：待打款 2：已打款 3：已拒绝
      }

    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 主播列表
    fetchData() {
      var data = this.getlist
      withdrawalLogList(data).then(response => {
        this.list = response.data.data
        this.count = response.data.count
      })
    },
    onSearch() {
      // 搜索
      console.log(this.getlist)
      this.fetchData()
    },

    handleSizeChange(val) {
      // 切换每页多少条
      console.log(`每页 ${val} 条`)
      this.getlist.limit = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      // 当前是第几页
      console.log(`当前页: ${val}`)
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
