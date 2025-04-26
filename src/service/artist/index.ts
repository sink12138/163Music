import { axios } from '@/service'
import type { artistTopReq } from './type'

export function artistDetail(id: string) {
  return axios({
    url: '/artist/detail',
    method: 'get',
    params: { id: id }
  })
}

export function artistTop(params: artistTopReq) {
  return axios({
    url: '/top/artists',
    method: 'get',
    params: params
  })
}
