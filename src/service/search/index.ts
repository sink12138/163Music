import { axios } from '@/service'

import type { searchReq } from './type'

export function keywordSearch(params: searchReq) {
  return axios({
    url: '/search',
    method: 'get',
    params: params
  })
}

export function keywordCloudSearch(params: searchReq) {
  return axios({
    url: '/cloudsearch',
    method: 'get',
    params: params
  })
}

export function suggestSearch(keyword: string) {
  return axios({
    url: '/search/suggest',
    method: 'get',
    params: { keywords: keyword }
  })
}

export function defaultSearch() {
  return axios({
    url: '/search/default',
    method: 'get'
  })
}
