<template>
  <div class="app-container generalize">
    <el-form ref="form" :model="getlist" :inline="true">
      <el-form-item label="收益类型">
        <el-col>
          <el-select v-model="getlist.type" placeholder="请选择">
            <el-option label="全部" value="" />
            <el-option label="提现" value="1" />
            <el-option label="提现手续费" value="2" />
            <el-option label="女主播提现返佣" value="3" />
            <el-option label="后台拒绝提现" value="4" />
            <el-option label="女主播提现" value="5" />
            <el-option label="后台奖惩" value="6" />
            <el-option label="上级公会惩罚" value="7" />
            <el-option label="资金解冻转入" value="8" />
            <el-option label="拒绝女主播提现" value="9" />
            <el-option label="子公会女主播提现返佣" value="10" />
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col><el-button class type="primary" @click="onSearch">查询</el-button></el-col>
      </el-form-item>
    </el-form>
    <el-table v-loading="listLoading" class="table_a" :data="list" style="width: 100%" max-height="650">
      <el-table-column prop="create_time" label="时间" width="200" align="center" />
      <el-table-column prop="type" label="收益类型" min-width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.type | getType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="会员id">
        <template slot-scope="scope">
          <span>{{ scope.row.member_id===0 ? '' : scope.row.member_id }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="op_type" label="变动类型" min-width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.op_type == '1' ? '减少' : '增加' }}
        </template>
      </el-table-column>
      <el-table-column prop="change_money_fee" label="变动金额" min-width="100" align="center" />
      <el-table-column prop="remark" label="备注" width="150" align="center" />
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
import { guildAccount } from '@/api/guild'

export default {
  filters: {
    getType(type) {
      let text = ''
      switch (type) {
        case 1:
          text = '提现'
          break
        case 2:
          text = '提现手续费'
          break
        case 3:
          text = '女主播提现返佣'
          break
        case 4:
          text = '后台拒绝提现'
          break
        case 5:
          text = '女主播提现'
          break
        case 6:
          text = '后台奖惩'
          break
        case 7:
          text = '上级公会惩罚'
          break
        case 8:
          text = '资金解冻转入'
          break
        case 9:
          text = '拒绝女主播提现'
          break
        case 10:
          text = '子公会女主播提现返佣'
          break
        default:
          break
      }

      return text

      /*
      'WITHDRAW' => 1,                     //1-提现
      'WITHDRAW_COMMISSION' => 2,          //2-提现手续费
      'SHARE_MEMBER_WITHDRAW' => 3,        //3-女主播提现返佣
      'REFUSE_WITHDRAW' => 4,              //4-后台拒绝提现
      'SHARE_MEMBER_WITHDRAW_ADD' => 5,    //5-女主播提现
      'ADMIN_REWARD' => 6,                 //6-后台奖惩
      'PARENT_REWARD' => 7,                //7-上级公会惩罚
      'UNFROZEN_MONEY' => 8,               //8-资金解冻转入

      */
    }
  },
  data() {
    return {
      list: null,
      count: 0, // 列表数据总条数
      getlist: {
        limit: 10, // 每页条数
        page: 1, // 当前页
        type: ''
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
      guildAccount(data)
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
