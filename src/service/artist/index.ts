import { axios } from '@/service'

export function artistDetail(id: string) {
  return axios({
    url: '/artist/detail',
    method: 'get',
    params: { id: id }
  })
}
