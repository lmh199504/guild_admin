<template>
  <div class="app-container generalize">
    <el-form ref="form" :model="getlist" :inline="true">
      <el-form-item label="主播ID">
        <el-col><el-input v-model="getlist.girl_id" placeholder="请输入公会ID" /></el-col>
      </el-form-item>
      <el-form-item label="主播昵称">
        <el-col><el-input v-model="getlist.girl_name" placeholder="请输入公会昵称" /></el-col>
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
      <el-form-item label="状态">
        <el-col>
          <el-select v-model="getlist.status" placeholder="请选择">
            <el-option label="全部" value="" />
            <el-option label="待打款" value="1" />
            <el-option label="已打款" value="2" />
            <el-option label="拒绝" value="3" />
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col><el-button class type="primary" @click="onSearch">搜索</el-button></el-col>
      </el-form-item>
    </el-form>
    <el-table class="table_a" :data="list" style="width: 100%" max-height="650">
      <el-table-column prop="create_day" label="日期" width="100" align="center" />
      <el-table-column prop="nickname" label="主播昵称（ID）" min-width="150" align="center">
        <template slot-scope="scope">
          <span>{{ `${scope.row.nickname}(${scope.row.member_id})` }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="draw_alipay_name" label="支付宝姓名" min-width="100" align="center" />
      <el-table-column prop="draw_alipay_sn" label="支付宝账号" min-width="100" align="center" />
      <el-table-column prop="status" label="状态" min-width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.status === 1 ? '待打款' : scope.row.status === 2 ? '已打款' : '拒绝' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="total" label="总金额" min-width="100" align="center" />
      <el-table-column label="操作" min-width="280" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.status === 1">
            <el-button size="mini" type="primary" @click="dealWith(scope.row, '2')">打款</el-button>
            <el-button size="mini" type="danger" @click="dealWith(scope.row, '3')">异常</el-button>
            <el-button v-clipboard:copy="scope.row.draw_alipay_sn" v-clipboard:success="onCopy" v-clipboard:error="onError" size="mini" type="primary">复制账号</el-button>
          </div>
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
import { girlPayList, girlChangePayStatus } from '@/api/guild'
import clipboard from '@/directive/clipboard/index.js' // use clipboard by v-directive
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
  directives: {
    clipboard
  },
  data() {
    return {
      list: [{
        status: 1
      }],
      count: 0, // 列表数据总条数
      getlist: {
        limit: 10, // 每页条数
        page: 1, // 当前页
        girl_id: '', // 搜索主播ID
        girl_name: '', // 搜索主播昵称
        start_time: '',
        end_time: '',
        status: '' // 会员类型
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
      var data = this.getlist
      girlPayList(data)
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
    },
    dealWith(row, type) {
      girlChangePayStatus({
        id: row.id,
        status: type
      }).then(res => {
        this.$message({
          type: 'success',
          message: '操作成功.',
          offset: 300,
          duration: 1000
        })
        this.fetchData()
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
</style>
