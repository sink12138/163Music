import axios, { type AxiosRequestConfig } from 'axios'

const baseRequestConfig: AxiosRequestConfig = {
  timeout: 6000,
  baseURL: 'http://localhost:3000',
  withCredentials: true
}

const service = axios.create(baseRequestConfig)

export { service as axios }
