import request from '@/utils/request'

export function searchSimple(searchForm) {
  return request({
    url: '/search',
    method: 'post',
    data: searchForm
  })
}
