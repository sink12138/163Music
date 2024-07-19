import { axios } from '@/service'

export function songDetail(ids: string) {
  return axios({
    url: '/song/detail',
    method: 'get',
    params: { ids: ids }
  })
}
