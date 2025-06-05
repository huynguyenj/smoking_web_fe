import type { ApiResponse } from '../model/apiType/apiType'
import type { Friend, MessageHistoryInfo, SearchUserType, UserInfo } from '../model/user/userType'
import { apiService } from './ApiServiceConfig'

const privateApiService = {
  getUserInfo: (): Promise<ApiResponse<UserInfo>> => apiService.privateApiClient.get('/v1/users/info'),
  getMessageHistory: (receiverId: string): Promise<ApiResponse<MessageHistoryInfo[]>> => apiService.privateApiClient.post('/v1/users/message-history', { receiverId: receiverId } ),
  getFriendsList: (): Promise<ApiResponse<Friend[]>> => apiService.privateApiClient.get('/v1/users/friend'),
  addFriend: (friendId: string): Promise<ApiResponse<null>> => apiService.privateApiClient.post('/v1/users/friend', { friend_id: friendId }),
  searchFriend: (searchTerm?: string): Promise<ApiResponse<SearchUserType[]>> => apiService.privateApiClient.post('/v1/users/info', { search: searchTerm })

}

export default privateApiService