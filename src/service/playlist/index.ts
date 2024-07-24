import { axios } from '@/service'

export function playlistDetail(id: string) {
  return axios({
    url: '/playlist/detail',
    method: 'get',
    params: { id: id }
  })
}
