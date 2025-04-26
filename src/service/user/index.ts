import { axios } from '@/service'

export function userDetail(id: string) {
  return axios({
    url: '/user/detail',
    method: 'get',
    params: { uid: id }
  })
}

export function personalFM() {
  return axios({
    url: '/personal_fm',
    method: 'get',
    params: { timestamp: new Date().getTime() }
  })
}
