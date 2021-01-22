<template>
  <div v-loading="loading">
    <el-table class="table_a" :data="listData" style="width: 100%" max-height="650">
      <el-table-column prop="money_fee" label="金额" align="center" />
      <el-table-column prop="unfrozen_day" label="解冻日期" align="center" />
      <el-table-column prop="create_day" label="冻结日期" align="center" />
      <el-table-column prop="create_day" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="frozenMoney(scope.row)">冻结</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination bigwidthShow">
      <el-pagination
        background
        :current-page="detail.page"
        :page-sizes="[10, 15, 20, 40]"
        :page-size="detail.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="countDetail"
        @size-change="detailSizeChange"
        @current-change="deatilCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { childFrozenMoneyLog, rewardFrozenMoney } from '@/api/guild'
export default {
  props: {
    currentData: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  data() {
    return {
      detail: {
        limit: 10,
        page: 1,
        guild_id: ''
      },
      countDetail: 0,
      listData: [],
      loading: false
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      this.detail.guild_id = this.currentData.guild_id
      childFrozenMoneyLog(this.detail)
        .then(res => {
          this.listData = res.data.data
          this.countDetail = res.data.count
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    detailSizeChange(val) {
      this.detail.page = 1
      this.detail.limit = val
      this.getData()
    },
    deatilCurrentChange(val) {
      this.detail.page = val
      this.getData()
    },
    frozenMoney(row) {
      this.$confirm('是否冻结?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          rewardFrozenMoney({
            log_id: row.id
          })
            .then(() => {
              this.$message({
                type: 'success',
                message: '冻结成功.',
                offset: 300
              })
            })
            .catch(() => {})
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消冻结.',
            offset: 300
          })
        })
    }
  }
}
</script>

<style scoped></style>
