import type { ApiResponse } from '../model/apiType/apiType'
import type { Friend, MessageHistoryInfo, UserInfo } from '../model/user/userType'
import { apiService } from './ApiServiceConfig'

const privateApiService = {
  getUserInfo: (): Promise<ApiResponse<UserInfo>> => apiService.privateApiClient.get('/v1/users/info'),
  getMessageHistory: (receiverId: string): Promise<ApiResponse<MessageHistoryInfo[]>> => apiService.privateApiClient.post('/v1/users/message-history', { receiverId: receiverId } ),
  getFriendsList: (): Promise<ApiResponse<Friend[]>> => apiService.privateApiClient.get('/v1/users/friend')

}

export default privateApiService