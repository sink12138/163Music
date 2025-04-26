import { axios } from '@/service'
import type { playlistTop } from './type'

export function playlistDetail(id: string) {
  return axios({
    url: '/playlist/detail',
    method: 'get',
    params: { id: id }
  })
}

export function playlistTop(params: playlistTop) {
  return axios({
    url: '/top/playlist',
    method: 'get',
    params: params
  })
}

export function playlistTopHighquality(cat?: string, limit?: number) {
  return axios({
    url: '/top/playlist/highquality',
    method: 'get',
    params: { cat: cat, limit: limit }
  })
}

export function playlistPersonalized(limit?: number) {
  return axios({
    url: '/personalized',
    method: 'get',
    params: { limit: limit }
  })
}

export function playlistRecommend() {
  return axios({
    url: '/recommend/resource',
    method: 'get'
  })
}
