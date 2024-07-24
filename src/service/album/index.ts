import { axios } from '@/service'

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
