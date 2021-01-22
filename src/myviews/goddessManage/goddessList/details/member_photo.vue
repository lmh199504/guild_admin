<template>
  <div v-loading="loading">
    <el-row :gutter="20">
      <el-col v-for="(item, index) in albumData" :key="index" :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
        <div>
          <el-image style="width: 100%;height: 250px;" :src="item.attachment_id" :preview-src-list="srcList" />
          <div>
            <p>点赞数：{{ item.like_num }}</p>
            <!-- //只对VIP显示 0:否 1:是 -->
            <p>仅VIP可见：{{ item.is_vip_show == 1 ? '是' : '否' }}</p>
            <div class="footer_p">
              <p>2020-04-22</p>
              <!-- //状态 1:通过 2:待审 3:拒绝 -->
              <p>{{ item.status == 1 ? '通过' : item.status == 2 ? '待审' : '拒绝' }}</p>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getGirlDetails } from '@/api/guild.js'
export default {
  props: {
    anchorData: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  data() {
    return {
      albumData: [],
      srcList: [],
      loading: false
    }
  },
  watch: {
    anchorData() {
      this.getData()
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      this.srcList = []
      if (this.anchorData != null) {
        getGirlDetails({
          girl_id: this.anchorData.member_id,
          type: 'photos'
        })
          .then(res => {
            this.albumData = res.data
            for (let i = 0; i < this.albumData.length; i++) {
              this.srcList.push(this.albumData[i].attachment_id)
            }
            this.loading = false
          })
          .catch(() => {
            this.loading = false
          })
      }
    }
  }
}
</script>

<style scoped>
.footer_p {
  display: flex;
  justify-content: space-between;
  margin-top: -8px;
}
.footer_p p:last-child {
  color: #ff8c00;
}
</style>
