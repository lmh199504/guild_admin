/* eslint-disable */
import request from '@/utils/request'
// 首页基础数据
export function homePage(data) {
  console.log(data)
  return request({
    url: '/guild/guild/homePage',
    method: 'post',
    data
  })
}
// 首页提现
export function withdrawal(data) {
  return request({
    url: '/guild/guild/withdrawal',
    method: 'post',
    data
  })
}
// 首页公告列表
export function noticeList(data) {
  console.log(data)
  return request({
    url: '/guild/guild/noticeList',
    method: 'post',
    data
  })
}
// 首页公告详情
export function noticeDetails(data) {
  console.log(data)
  return request({
    url: '/guild/guild/noticeDetails',
    method: 'post',
    data
  })
}
// 设置页-获取公会信息
export function getSetting() {
  return request({
    url: '/guild/guild/getSetting',
    method: 'post'
  })
}
// 设置页-设置（修改）公会信息
export function setSetting(data) {
  return request({
    url: '/guild/guild/setSetting',
    method: 'post',
    data
  })
}
// 主播列表
export function anchorList(data) {
  return request({
    url: '/guild/guild/anchorList',
    method: 'post',
    data
  })
}

///guild/girls/anchorList  //升级公会获取主播列表
export const newAnchorList = (data) => {
  return request({
    url: '/guild/girls/anchorList',
    method: 'post',
    data
  })
}

// 视频记录列表
export function callList(data) {
  return request({
    url: '/guild/guild/callList',
    method: 'post',
    data
  })
}
// 修改密码
export function resetPassword(data) {
  return request({
    url: '/guild/guild/resetPassword',
    method: 'post',
    data
  })
}
// 推广-获取推广域名和二维码
export function generalize(data) {
  return request({
    url: '/guild/guild/generalize',
    method: 'post',
    data
  })
}
// 推广-获取推广域名和二维码
export function generalizeUrl(data) {
  return request({
    url: '/guild/guild/generalizeUrl',
    method: 'post',
    data
  })
}
// 举报列表
export function reportList(data) {
  return request({
    url: '/guild/guild/reportList',
    method: 'post',
    data
  })
}
// 举报图片
export function LookImg(data) {
  return request({
    url: '/guild/guild/LookImg',
    method: 'post',
    data
  })
}

//提现记录
///guild/guild/withdrawalLogList

export function withdrawalLogList(data) {
  return request({
    url: '/guild/guild/withdrawalLogList',
    method: 'post',
    data
  })
}

//主播详情
export const getGirlDetails = (data) => {
  return request({
    url: '/guild/girls/getGirlDetails',
    method: 'post',
    data
  })
}


//获取主播分成比例及修改分成比例
export const brokerageAdjust = (data) => {
  return request({
    url: '/guild/girls/brokerageAdjust',
    method: 'post',
    data
  })
}


//获取推广配置及修改推广配置
export const generalizeAdjust = (data) => {
  return request({
    url: '/guild/girls/generalizeAdjust',
    method: 'post',
    data
  })
}


//会员现金奖惩
export const reward = (data) => {
  return request({
    url: '/guild/girls/reward',
    method: 'post',
    data
  })
}

//会员限权

export const jurisdict = (data) => {
  return request({
    url: '/guild/girls/jurisdiction',
    method: 'post',
    data
  })
}
//解除公会与女神绑定


export const disengage = (data) => {
  return request({
    url: '/guild/girls/disengage',
    method: 'post',
    data
  })
}

//主播审核列表
export const goddessApplyIndex = (data) => {
  return request({
    url: '/guild/girls/goddessApplyIndex',
    method: 'post',
    data
  })
}

//主播审核操作
export const goddessApply = (data) => {
  return request({
    url: '/guild/girls/goddessApply',
    method: 'post',
    data
  })
}


//申请提现列表

export const goddessWithdrawIndex = (data) => {
  return request({
    url: '/guild/girls/goddessWithdrawIndex',
    method: 'post',
    data
  })
}

//处理女神提现
export const goddessWithdraw = (data) => {
  return request({
    url: '/guild/girls/goddessWithdraw',
    method: 'post',
    data
  })
}

//主播流水
export const goddessAccount = (data) => {
  return request({
    url: '/guild/girls/goddessAccount',
    method: 'post',
    data
  })
}

//主播推广结算表
export const girlPayList = (data) => {
  return request({
    url: '/guild/girls/girlPayList',
    method: 'post',
    data
  })
}

//女神推广结算标记打款或拒绝

export const girlChangePayStatus = (data) => {
  return request({
    url: '/guild/girls/girlChangePayStatus',
    method: 'post',
    data
  })
}

//公会推广数据
export const guildGeneralizeData = (data) => {
  return request({
    url: '/guild/guild/guildGeneralizeData',
    method: 'post',
    data
  })
}
//当前公会推广注册明细
export const guildShareRegister = (data) => {
  return request({
    url: '/guild/guild/guildShareRegister',
    method: 'post',
    data
  })
}

//当前公会推广充值明细
export const guildSharePay = (data) => {
  return request({
    url: '/guild/guild/guildSharePay',
    method: 'post',
    data
  })
}



//公会明细
export const guildAccount = (data) => {
  return request({
    url: '/guild/guild/guildAccount',
    method: 'post',
    data
  })
}


//二级公会列表

export const secondGuildList = (data) => {
  return request({
    url: '/guild/guild/secondGuildList',
    method: 'post',
    data
  })
}

//二级公会推广数据
export const secondGuildAccount = (data) => {
  return request({
    url: '/guild/guild/secondGuildAccount',
    method: 'post',
    data
  })
}

//二级公会个人推广明细
export const secondGuildSelfAccount = (data) => {
  return request({
    url: '/guild/guild/secondGuildSelfAccount',
    method: 'post',
    data
  })
}
//获取二级公会详情

export const getSecondGuild = (data) => {
  return request({
    url: '/guild/guild/getSecondGuild',
    method: 'post',
    data
  })
}


//创建或修改二级公会
export const changeSecondGuild = (data) => {
  return request({
    url: '/guild/guild/changeSecondGuild',
    method: 'post',
    data
  })
}

//主播推广数据
export const girlAccount = (data) => {
  return request({
    url: '/guild/girls/girlAccount',
    method: 'post',
    data
  })
}

//主播推广数据详情


export const girlSelfAccount = (data) => {
  return request({
    url: '/guild/girls/girlSelfAccount',
    method: 'post',
    data
  })
}


//二级公会推广结算表
export const secondGuildPayList = (data) => {
  return request({
    url: '/guild/guild/secondGuildPayList',
    method: 'post',
    data
  })
}

//二级公会推广结算操作
export const secondGuildChangePayStatus = (data) => {
  return request({
    url: '/guild/guild/secondGuildChangePayStatus',
    method: 'post',
    data
  })
}

//删除二级公会 /guild/guild/disengage


export const delGuild = (data) => {
  return request({
    url: '/guild/guild/disengage',
    method: 'post',
    data
  })
}

//获取冻结记录



export const mySelfFrozenMoneyLog = (data) => {
  return request({
    url: '/guild/guild/mySelfFrozenMoneyLog',
    method: 'post',
    data
  })
}

//资金解冻
export const unfrozenMoney = (data) => {
  return request({
    url: '/guild/guild/unfrozenMoney',
    method: 'post',
    data
  })
}

//公会推广总收益
export const selfGuildShareCount = (data) => {
  return request({
    url: '/guild/guild/selfGuildShareCount',
    method: 'post',
    data
  })
}

//获取指定子公会冻结中资金记录表 (二级公会)
export const childFrozenMoneyLog = (data) => {
  return request({
    url: '/guild/guild/childFrozenMoneyLog',
    method: 'post',
    data
  })
}

//一级公会扣除二级公会余额（二级公会 -- 现金惩罚）
export const guildReward = (data) => {
  return request({
    url: '/guild/guild/reward',
    method: 'post',
    data
  })
}

//扣除二级公会冻结资金 (二级公会 -- 冻结惩罚)
export const rewardFrozenMoney = (data) => {
  return request({
    url: '/guild/guild/rewardFrozenMoney',
    method: 'post',
    data
  })
}

//获取推广类型
export const getGeneralizeType = () => {
  return request({
    url: '/guild/guild/getGeneralizeType',
    method: 'post'
  })
}

//获取推广缓存URL(推广表格)
export const getGeneralizeCache = () => {
  return request({
    url: '/guild/guild/getGeneralizeCache',
    method: 'post'
  })
}


//冻结资金详情
export const frozenMoneyLogDetail = (data) => {
  return request({
    url: '/guild/guild/frozenMoneyLogDetail',
    method: 'post',
    data
  })
}


//主播招募
export const getGeneralizeCacheRecruit = () => {
  return request({
    url: '/guild/guild/getGeneralizeCacheRecruit',
    method: 'post'
  })
}

//主播提现结果

export const auditWithdrawList = (data) => {
  return request({
    url: '/guild/girls/auditWithdrawList',
    method: 'post',
    data
  })
}

//主播审核结果
export const auditGoddessList = (data) => {
  return request({
    url: '/guild/girls/auditGoddessList',
    method: 'post',
    data
  })
}

//拉黑原因
export const evidence = (data) => {
  return request({
    url: '/guild/girls/evidence',
    method: 'post',
    data
  })
}
