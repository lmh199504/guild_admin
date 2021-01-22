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
    <el-table class="table_a" :data="list" style="width: 100%" max-height="650">
      <el-table-column label="举报人" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.from_nickname }}({{ scope.row.from_member_id }})
        </template>
      </el-table-column>
      <el-table-column label="被举报人" min-width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.nickname }}({{ scope.row.to_member_id }})
        </template>
      </el-table-column>
      <el-table-column prop="content" label="内容" min-width="100" align="center" />
      <el-table-column prop="status" label="举报状态" min-width="100" align="center" />
      <el-table-column prop="create_time" label="举报时间" min-width="150" align="center" />
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="toReportDetail(scope.row.id)">查看图片</el-button>
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
    <div>
      <el-dialog class="report" :visible.sync="reportVisible" width="40%">
        <el-carousel trigger="click" :autoplay="autoplay" height="640px">
          <el-carousel-item v-for="item in imgItem" :key="item">
            <div class="report_popup"><img class="report_img" :src="item"></div>
          </el-carousel-item>
        </el-carousel>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { reportList, LookImg } from '@/api/guild'
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
      imgItem: [], // 举报图片
      autoplay: false,
      reportVisible: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 主播列表
    fetchData() {
      var data = this.getlist
      reportList(data).then(response => {
        this.list = response.data.data
        this.count = response.data.count
      })
    },
    onSearch() {
      // 搜索
      console.log(this.getlist)
      this.fetchData()
    },
    // 查看举报图片
    toReportDetail(id) {
      var data = {
        report_id: id
      }
      LookImg(data).then(response => {
        this.reportVisible = true
        this.imgItem = response.data
        console.log(response.data)
      })
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
.report {
  padding: 30px;
}
.report .el-dialog {
  margin-top: 0 !important;
}
</style>
<style scoped>
.report_popup {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
