import request from '@/utils/request'

// 更新关注的专利描述
export function updateClaimPatentDescription(PNM, desc) {
  return request({
    url: `/user-agent/patent/claim/${PNM}/desc`, method: 'put', data: { desc }
  })
}

// 认领专利
export function claimPatent(patent) {
  return request({
    url: '/user-agent/patent/claim', method: 'post', data: patent
  })
}

// 取消认领专利
export function unClaimPatent(PNM) {
  return request({
    url: `/user-agent/patent/claim/${PNM}`, method: 'delete'
  })
}

// 获取认领专利列表
export function getClaimedPatents() {
  return request({
    url: '/user-agent/patent/claim', method: 'get'
  })
}

// 更新关注的专利描述
export function updateFocusPatentDescription(PNM, desc) {
  return request({
    url: `/user-agent/patent/focus/${PNM}/desc`, method: 'put', data: { desc }
  })
}

// 关注专利
export function focusPatent(patent) {
  return request({
    url: '/user-agent/patent/focus', method: 'post', data: patent
  })
}

// 取消关注专利
export function unFocusPatent(PNM) {
  return request({
    url: `/user-agent/patent/focus/${PNM}`, method: 'delete'
  })
}

// 获取关注专利列表
export function getFocusedPatents() {
  return request({
    url: '/user-agent/patent/focus', method: 'get'
  })
}

// 通过userid获得用户关注专利的关系图谱1
export function getGraphByUserId() {
  return request({
    url: `/user-agent/patent/relationship`,
    method: 'get'
  })
}

// 通过userid获得用户关注专利的关系图谱2
export function getGraphByUserId2() {
  return request({
    url: `/user-agent/patent/relationship2`,
    method: 'get'
  })
}

// 专利详情
export function getPatentDetail(PNM) {
  return request({
    url: `/user-agent/auth-search/full`,
    method: 'post',
    data: { query: `PNM=${PNM}` }
  })
}
