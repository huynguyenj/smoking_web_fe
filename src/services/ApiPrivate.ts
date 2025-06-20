import type { ApiResponse } from '../model/apiType/apiType'
import type { Friend, MessageHistoryInfo, SearchUserType, UserInfo } from '../model/user/userType'
import { apiService } from './ApiServiceConfig'
import type { CreatePlanPayload, PlanListResponse, Plan } from '../model/user/planType'
import type { Membership } from '../model/user/membershipType'
import type { BlogListResponse, Blog } from '../model/user/blogType'
const privateApiService = {
  getUserInfo: (): Promise<ApiResponse<UserInfo>> => apiService.privateApiClient.get('/v1/users/info'),
  getMessageHistory: (receiverId: string): Promise<ApiResponse<MessageHistoryInfo[]>> => apiService.privateApiClient.post('/v1/users/message-history', { receiverId: receiverId } ),
  getFriendsList: (): Promise<ApiResponse<Friend[]>> => apiService.privateApiClient.get('/v1/users/friend'),
  addFriend: (friendId: string): Promise<ApiResponse<null>> => apiService.privateApiClient.post('/v1/users/friend', { friend_id: friendId }),
  searchFriend: (searchTerm?: string): Promise<ApiResponse<SearchUserType[]>> => apiService.privateApiClient.post('/v1/users/info', { search: searchTerm }),
  createPlan: (payload: CreatePlanPayload): Promise<ApiResponse<null>> => apiService.privateApiClient.post('/v1/users/plan', payload),
  getAllPlans: (page = 1, limit = 5): Promise<PlanListResponse> => apiService.privateApiClient.post('/v1/users/plan/pagination', {
    page,
    limit
  }),
  getPlanDetail: (id: string): Promise<ApiResponse<Plan>> => apiService.privateApiClient.get(`/v1/users/plan/edit/${id}`),
  deletePlanById: (id: string): Promise<ApiResponse<null>> => apiService.privateApiClient.delete(`/v1/users/plan/edit/${id}`),
  updatePlanById: (id: string, payload: CreatePlanPayload) => apiService.privateApiClient.put(`/v1/users/plan/edit/${id}`, payload),
  getMemberships: (): Promise<ApiResponse<Membership[]>> => apiService.privateApiClient.get('/v1/users/membership'),

  createBlog: (formData: FormData) => apiService.privateApiClient.post('/v1/users/blog', formData),

  getAllBlogs: (page = 1, limit = 6): Promise<BlogListResponse> => apiService.privateApiClient.post('/v1/users/blog/public', {
    page,
    limit
  }),
  getBlogDetail: (id: string): Promise<ApiResponse<Blog>> => apiService.privateApiClient.get(`/v1/users/blog/public/${id}`)
}

export default privateApiService