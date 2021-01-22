<template>
  <div class="app-container generalize">
    <!-- <el-form ref="form" :model="form" label-width="120px">
    </el-form> -->
    <el-form ref="form" :model="getlist" :inline="true">
      <el-form-item label="主播ID">
        <el-col><el-input v-model="getlist.anchor_id" placeholder="请输入主播ID" /></el-col>
      </el-form-item>
      <el-form-item label="主播昵称">
        <el-col><el-input v-model="getlist.anchor_nickname" placeholder="请输入主播昵称" /></el-col>
      </el-form-item>
      <el-form-item label="时间选择" class="data_form">
        <el-col :xs="24" :sm="11" :md="11" :lg="11" :xl="11">
          <el-date-picker v-model="getlist.start_time" class="data_form_picker" type="date" placeholder="开始日期" value-format="yyyy-MM-dd" style="width: 100%;" />
        </el-col>
        <el-col :xs="0" :sm="1" :md="1" :lg="1" :xl="1" class="line">-</el-col>
        <el-col :xs="24" :sm="11" :md="11" :lg="11" :xl="11">
          <el-date-picker v-model="getlist.end_time" type="date" placeholder="结束日期" value-format="yyyy-MM-dd" style="width: 100%;" />
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col><el-button class type="primary" @click="onSearch">搜索</el-button></el-col>
      </el-form-item>
    </el-form>
    <el-table class="table_a" :data="list" style="width: 100%" max-height="650">
      <el-table-column prop="id" label="ID" width="80" align="center" />

      <el-table-column prop="anchor_id" label="主播ID" min-width="110" align="center" />

      <el-table-column prop="anchor_nickname" label="主播昵称" min-width="150" align="center" />
      <el-table-column prop="hanger_id" label="挂断人ID" min-width="110" align="center" />
      <el-table-column prop="type" label="通话类型" min-width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.type == '1' ? '女神' : '普通用户' }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" min-width="110" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.status == 1">待接听</div>
          <div v-else-if="scope.row.status == 2">通话中</div>
          <div v-else-if="scope.row.status == 3">拒接</div>
          <div v-else-if="scope.row.status == 4">通话结束</div>
          <div v-else-if="scope.row.status == 5">超时未接</div>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="创建时间" min-width="160" align="center" />
      <el-table-column prop="call_time" label="通话时间" width="110" align="center" />
      <el-table-column prop="diamond_fee" label="消耗钻石金额" min-width="160" align="center" />
      <el-table-column prop="gift_fee" label="礼物收入" min-width="140" align="center" />
      <el-table-column prop="call_fee" label="视频收入" min-width="140" align="center" />
      <el-table-column prop="total_fee" label="收入小计" min-width="150" align="center" />
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
import { callList } from '@/api/guild'
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
  data() {
    return {
      list: null,
      count: 0, // 列表数据总条数
      // form: {
      //   "id": '',//记录ID
      //   "type": '',//通话类型 1：视频 2：音频
      //   "status": '',//状态 1-待接听 2-通话中 3-拒接 4-通话结束 5-超时未接
      //   "call_time": '',//通话时间
      //   "diamond_fee": '',//消耗钻石金额
      //   "gift_fee": '',//礼物收入
      //   "call_fee": '',//视频收入
      //   "anchor_id": '',//主播ID
      //   "anchor_nickname": '',//主播昵称
      //   "total_fee": '' //收入小计
      // },
      getlist: {
        limit: 10, // 每页条数
        page: 1, // 当前页
        anchor_id: '', // 搜索主播ID
        anchor_nickname: '', // 搜索主播昵称
        start_time: '', // 开始时间
        end_time: '' // 结束时间
      },
      listLoading: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 主播列表
    fetchData() {
      this.listLoading = true
      const data = this.getlist
      callList(data)
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
<style scoped>
@media screen and (max-width: 600px) {
  .el-form--inline .el-form-item {
    margin-right: 0;
  }
  .el-form--inline .el-form-item__content {
    width: 72% !important;
    margin: 10px;
  }
}
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
</style>
