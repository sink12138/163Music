import { axios } from '@/service'

export function userDetail(id: string) {
  return axios({
    url: '/user/detail',
    method: 'get',
    params: { uid: id }
  })
}
