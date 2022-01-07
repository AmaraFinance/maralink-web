import axios from '@/plugins/axios'

export function getList (url, params) {
  return axios.post(url, params)
}

export function getTransaction (params) {
  return axios.post('/api/tx/getTransaction', params)
}
