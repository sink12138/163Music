import { axios } from '@/service'
import type { albumTopReq } from './type'

export function albumContent(id: string) {
  return axios({
    url: '/album',
    method: 'get',
    params: { id: id }
  })
}

export function albumDetail(id: string) {
  return axios({
    url: '/album/detail',
    method: 'get',
    params: { id: id }
  })
}

export function albumDynamicDetail(id: string) {
  return axios({
    url: '/album/detail/dynamic',
    method: 'get',
    params: { id: id }
  })
}

export function albumTop(params: albumTopReq) {
  return axios({
    url: '/top/album',
    method: 'get',
    params: params
  })
}

export function albumNew() {
  return axios({
    url: '/album/newest',
    method: 'get'
  })
}
