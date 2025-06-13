import type { ApiResponse } from '../model/apiType/apiType'
import type { LoginResponse, LoginType, RegisterType, TokenResponse } from '../model/authModel/authDataType'
import { apiService } from './ApiServiceConfig'

const publicApiService = {
  login: (loginInfo:LoginType): Promise<ApiResponse<LoginResponse>> =>
    apiService.publicApiClient.post('/v1/users/login', loginInfo),
  register: (registerInfo: RegisterType): Promise<ApiResponse<RegisterType>> =>
    apiService.publicApiClient.post('/v1/users/register', registerInfo),
  getNewToken: (): Promise<ApiResponse<TokenResponse>> => apiService.publicApiClient.get('/v1/users/token')
}


export default publicApiService