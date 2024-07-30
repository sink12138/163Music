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

export function songPersonalized(limit?: number) {
  return axios({
    url: '/personalized/newsong',
    method: 'get',
    params: { limit: limit }
  })
}

export function songsRecommend() {
  return axios({
    url: '/recommend/songs',
    method: 'get'
  })
}

export function songsTop(type: number = 0) {
  return axios({
    url: '/top/song',
    method: 'get',
    params: { type: type }
  })
}

export function getLyric(id: string) {
  return axios({
    url: '/lyric',
    method: 'get',
    params: { id: id }
  })
}
