import { axios } from '@/service'

export function playlistComment(id: string, before?: string) {
  return axios({
    url: '/comment/playlist',
    method: 'get',
    params: { id: id, before: before }
  })
}

export function getComment(params: any) {
  return axios({
    url: '/comment/new',
    method: 'get',
    params: params
  })
}

export function commentFloor(params: any) {
  return axios({
    url: '/comment/floor',
    method: 'get',
    params: params
  })
}
