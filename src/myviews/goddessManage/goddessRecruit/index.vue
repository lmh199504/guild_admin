<template>
  <div class="app-container">
    <div class="table_title">推广</div>
    <el-form ref="form" :model="form" label-width="96px">

      <el-form-item label="推广设备类型">
        <el-radio-group v-model="form.facility">
          <el-radio v-for="item in facilityList" :key="item.name" :label="item.value">{{ item.name }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="推广模板">
        <el-radio-group v-model="form.template" class="template_radio">
          <el-radio v-for="item in templateList" :key="item.name" :label="item.value">{{ item.name }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">生成</el-button>
      </el-form-item>
    </el-form>

    <!-- 生成链接 start-->
    <el-dialog class="a_dialog" title="提示" :visible.sync="dialogVisible">
      <div v-loading="codeLoading" class="a_dialog_div">
        <span class="a_dialog_span">推广二维码：</span>
        <img class="a_dialog_img" :src="shareImg" alt="">
        <span v-if="isShare" class="isShare">二维码、分享链接生成中...</span>
        <button type="button" class="a_dialog_btn el-button el-button--primary el-button--small" @click="download"><span>下载图片</span></button>
      </div>
      <div class="a_dialog_div">
        <span class="a_dialog_span">推广链接：</span>
        <input type="text" :disabled="true" :value="shareUrl">
        <button v-clipboard:copy="shareUrl" v-clipboard:success="onCopy" v-clipboard:error="onError" type="button" class="a_dialog_btn el-button el-button--primary el-button--small"><span>复制链接</span></button>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="toTrue">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 生成链接 end-->

    <el-table class="table_a" :data="list" style="width: 100%" max-height="650">
      <el-table-column
        prop="facility"
        label="推广设备类型"
        width="130"
        align="center"
      />
      <el-table-column
        prop="template"
        label="推广模板"
        min-width="110"
        align="center"
      />
      <el-table-column
        prop="is_cert"
        label="推广二维码"
        min-width="110"
        align="center"
      >
        <template slot-scope="scope">
          <img class="erweima_img_table" :src="scope.row.img_url">
        </template>
      </el-table-column>
      <el-table-column
        prop="money_fee"
        label="推广链接"
        min-width="100"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.url }}</template>
      </el-table-column>
      <el-table-column
        prop="is_black"
        label="操作"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <button v-clipboard:copy="scope.row.url" v-clipboard:success="onCopy" v-clipboard:error="onError" type="button" class="a_dialog_btn el-button el-button--primary el-button--small">复制链接</button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { generalizeUrl, getGeneralizeType, getGeneralizeCache } from '@/api/guild'
import { base64ToBlob } from '@/utils/download'
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
      isShare: false,
      shareImg: '',
      shareUrl: '',
      facilityList: [
        { name: '微信', value: 'WECHAT' },
        { name: 'QQ', value: 'QQ' },
        { name: '抖音', value: 'DY' },
        { name: '连信', value: 'LX' },
        { name: '通用', value: 'WEB' },
        { name: '长链接', value: 'LONG' }
      ],
      templateList: [
        { name: '女神招募', value: 'QYRECRUIT' },
        { name: '默认推广', value: 'QYDEFAULT' },
        { name: '性感推广一', value: 'QYSEXY1' },
        { name: '性感推广二', value: 'QYSEXY2' },
        { name: '性感推广三', value: 'QYSEXY3' },
        { name: '性感推广四', value: 'QYSEXY4' },
        { name: '性感推广五', value: 'QYSEXY5' },
        { name: '性感推广六', value: 'QYSEXY6' }
      ],
      dialogVisible: false,
      form: {
        facility: '', // 推广设备类型
        template: '',
        reset: 'YES' // 跳过缓存重新生成二维码（不传默认为否）/ 是：YES / 否：NO
      },
      list: null,
      codeLoading: false
    }
  },
  created() {
    getGeneralizeType().then(res => {
      this.facilityList = res.data.facilityType
      this.templateList = res.data.templateType
      this.form.facility = this.facilityList[0].value
      this.form.template = this.templateList[0].value
    })

    this.getTableData()
  },
  methods: {
    // 生成
    onSubmit() {
      this.dialogVisible = true
      this.isShare = true
      this.getGeneralize()
    },
    // 关闭弹窗
    toTrue() {
      this.dialogVisible = false
    },
    // 关闭弹窗
    handleClose() {
      this.dialogVisible = false
    },
    // 获取推广域名
    getGeneralize() {
      var data = this.form
      this.codeLoading = true
      generalizeUrl(data).then(response => {
        this.shareImg = response.data.img_url
        this.shareUrl = response.data.url
        this.isShare = false
        this.codeLoading = false
        this.getTableData()
      }).catch(() => {
        this.codeLoading = false
      })
    },
    // 下载图片
    download() {
      const imgData = this.shareImg
      this.downloadFile('分享二维码.png', imgData)
    },
    // 下载
    downloadFile(fileName, content) {
      const aLink = document.createElement('a')
      const blob = base64ToBlob(content) // new Blob([content]);

      const evt = document.createEvent('HTMLEvents')
      evt.initEvent('click', true, true)// initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
      aLink.download = fileName
      aLink.href = URL.createObjectURL(blob)

      // aLink.dispatchEvent(evt);
      // aLink.click()
      aLink.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }))// 兼容火狐
    },
    onCopy(e) {
      this.$message.success('链接已复制到剪切板！')
    },
    onError(e) {
      this.$message.error('抱歉，复制失败！')
    },
    getTableData() {
      getGeneralizeCache().then(res => {
        this.list = res.data.cache
      })
    }
  }
}
</script>
<style>
@media screen and (max-width: 600px) {
  .a_dialog_div input{
    display: block;
    width: 100%!important;
    margin: 15px auto;
  }
  .a_dialog_img{
    display: block;
    width: 50%;
    margin: 15px auto 0;
  }
}
</style>
<style  scoped>
.isShare{
  display: inline-block;
  width: 50%;
}
.template_radio .el-radio{
  line-height: 40px;
}
.erweima_img_table{
  width: 80px;
}
.a_dialog_img{
  width: 50%;
  vertical-align: top;
}
.a_dialog_btn{
  width: 80px;
}
.a_dialog_div{
  margin-bottom: 15px;
}
.a_dialog_div .a_dialog_span{
  display: inline-block;
  width: 90px;
}
.a_dialog_div input{
  height: 30px;
  width: 50%
}
.table_title{
  border-left: 5px solid #409EFF;
  padding-left: 15px;
  margin-bottom: 20px;
}
.table_a{
  border: 1px solid #ededed;
}
.line{
  text-align: center;
}
</style>
