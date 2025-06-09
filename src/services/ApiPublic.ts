import type { ApiResponse } from '../model/apiType/apiType'
import type { LoginType, RegisterType } from '../model/authModel/authDataType'
import { apiService } from './ApiServiceConfig'
const BASE_API_URL = import.meta.env.BASE_API_URL

const publicApiService = {
  login: (loginInfo:LoginType): Promise<ApiResponse<LoginType>> =>
    apiService.publicApiClient.post(BASE_API_URL+'/login', loginInfo),
  register: (registerInfo: RegisterType): Promise<ApiResponse<RegisterType>> =>
    apiService.publicApiClient.post(BASE_API_URL+'/register', registerInfo)
}


export default publicApiService