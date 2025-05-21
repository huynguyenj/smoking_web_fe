import axios, { type AxiosInstance } from 'axios'
import { useTokenInfoStorage } from '../store/authStore'

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL

const privateApiClient: AxiosInstance = axios.create({
  baseURL:BASE_API_URL,
  headers:{
    'Content-Type': 'application/json'
  }
})

const publicApiClient: AxiosInstance = axios.create({
  baseURL:BASE_API_URL,
  headers:{
    'Content-Type': 'application/json'
  }
})

privateApiClient.interceptors.request.use((config) => {
  const { token } = useTokenInfoStorage()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
}, (error) => {
  // console.log(error)
  return Promise.reject(error)
})


privateApiClient.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  return Promise.reject(error)
})

publicApiClient.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  return Promise.reject(error)
})

export const apiService = { privateApiClient, publicApiClient }
