import { axios } from '@/service'
import type { likeReq } from './type'

export function songDetail(ids: string) {
  return axios({
    url: '/song/detail',
    method: 'get',
    params: { ids: ids }
  })
}

export function songLike(params: likeReq) {
  return axios({
    url: '/like',
    method: 'get',
    params: params
  })
}
