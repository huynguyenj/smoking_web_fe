import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { useTokenInfoStorage } from '../store/authStore'
import publicApiService from './ApiPublic'
import type { ApiError } from '../model/apiType/apiType'
import { PublicRoute } from '../const/pathList'

const API_URL = import.meta.env.VITE_BASE_API_URL
const privateApiClient: AxiosInstance = axios.create({
  baseURL:API_URL,
  headers:{
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

const publicApiClient: AxiosInstance = axios.create({
  baseURL:API_URL,
  headers:{
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

privateApiClient.interceptors.request.use((config) => {
  const { token } = useTokenInfoStorage.getState()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
}, (error) => {
  return Promise.reject(error)
})


privateApiClient.interceptors.response.use((response) => {
  return response.data
}, async (error:AxiosError) => {
  const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }
  type responseError = {
    status: number,
    message: string
  }
  const errorData = error.response?.data as responseError
  const isTokenExpiredError = errorData.message === 'TOKEN_EXPIRED'
  if (error.response?.status === 401 && !originalRequest._retry && isTokenExpiredError) {
    originalRequest._retry = true
    try {
      const tokenResponse = await publicApiService.getNewToken()
      const newAccessToken = tokenResponse.data.accessToken
      const { setToken } = useTokenInfoStorage.getState()
      setToken(newAccessToken)
      // Update Authorization header for the original request
      originalRequest.headers = {
        ...originalRequest.headers,
        Authorization: `Bearer ${newAccessToken}`
      }

      // Retry the original request with new token
      return privateApiClient(originalRequest)
    } catch (refreshError) {
      // If refresh token fails, clear state and redirect to login
      const { setClear } = useTokenInfoStorage.getState()
      setClear()
      window.location.href = PublicRoute.LOGIN_PATH
      return Promise.reject(refreshError)
    }
  }
  const errorResMessage = error.response?.data as ApiError
  return Promise.reject(errorResMessage.message)
})

publicApiClient.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  const errorResMessage = error.response?.data as ApiError
  return Promise.reject(errorResMessage.message)
})

export const apiService = { privateApiClient, publicApiClient }
