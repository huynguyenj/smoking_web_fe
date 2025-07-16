import type { ApiResponse } from '../model/apiType/apiType'
import type { Friend, MessageHistoryInfo, PasswordData, SearchUserType, UpdateProfile, UserCommonTypeInfo, UserInfo } from '../model/user/userType'
import { apiService } from './ApiServiceConfig'
import type { CreatePlanPayload, PlanListResponse, Plan } from '../model/user/planType'
import type { BlogListResponse, Blog } from '../model/user/blogType'
import type { Comment, CreateCommentInput, CommentListResponse, DeleteCommentResponse } from '../model/user/commentType'
import type { PaymentURLResponse, PaymentRequestPayload } from '../model/user/paymentType'
import type { RankingResponse } from '../model/user/rankingType'
import type { Membership, MembershipInfo } from '../model/user/membershipType'
import type { CigarettePaginationResponse, CreateCigarettePayload, CigaretteRecord, UpdateCigarettePayload } from '../model/user/cigarettesType'
import type { FeedbackSend } from '../model/feedback/feedbackType'
import type { RankData } from '../model/user/rankType'

const privateApiService = {
  logout: (): Promise<ApiResponse<null>> => apiService.privateApiClient.post('v1/users/logout'),
  getUserInfo: (): Promise<ApiResponse<UserInfo>> => apiService.privateApiClient.get('/v1/users/info'),
  getMessageHistory: (receiverId: string): Promise<ApiResponse<MessageHistoryInfo>> => apiService.privateApiClient.post('/v1/users/message-history', { receiverId: receiverId } ),
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

  getMyBlogs: (page = 1, limit = 6): Promise<BlogListResponse> => apiService.privateApiClient.post('/v1/users/blog/private', {
    page,
    limit
  }),

  updateBlog: (id: string, formData: FormData): Promise<ApiResponse<Blog>> => apiService.privateApiClient.put(`/v1/users/blog/private/edit/${id}`, formData),

  deleteBlog: (id: string): Promise<ApiResponse<null>> => apiService.privateApiClient.delete(`/v1/users/blog/private/edit/${id}`),

  getBlogDetail: (id: string): Promise<ApiResponse<Blog>> => apiService.privateApiClient.get(`/v1/users/blog/public/${id}`),

  createComment: (blogId: string, payload: CreateCommentInput): Promise<ApiResponse<Comment>> =>
    apiService.privateApiClient.post(`/v1/users/comment/${blogId}`, payload),

  getCommentsByBlogId: (
    blogId: string,
    page = 1,
    limit = 5,
    sort: 'newest' | 'oldest' = 'newest'
  ): Promise<ApiResponse<CommentListResponse>> =>
    apiService.privateApiClient.post(`/v1/users/blog/public/${blogId}`, {
      page,
      limit,
      sort: sort === 'oldest' ? 1 : -1
    }),
  deleteComment: (
    blogId: string,
    commentId: string
  ): Promise<ApiResponse<DeleteCommentResponse>> =>
    apiService.privateApiClient.delete(`/v1/users/comment/${blogId}/${commentId}`),

  getPaymentUrl: (data: PaymentRequestPayload): Promise<ApiResponse<PaymentURLResponse>> => apiService.privateApiClient.post('/v1/users/payment', data),

  getRankingList: (page:number, limit:number, sort: number): Promise<RankingResponse> =>
    apiService.privateApiClient.post('/v1/users/rank', {
      page,
      limit,
      sort
    }),
  getMemberShipInfo: (membershipId: string): Promise<ApiResponse<MembershipInfo>> => apiService.privateApiClient.get(`/v1/users/membership/detail/${membershipId}`),
  updateInformationCommon: (updateInfo: UserCommonTypeInfo): Promise<ApiResponse<null>> => apiService.privateApiClient.put('/v1/users/info', updateInfo),
  updateProfile: (updateInfo: UpdateProfile): Promise<ApiResponse<null>> => apiService.privateApiClient.put('/v1/users/profile', updateInfo),
  changePassword: (passwordData: PasswordData): Promise<ApiResponse<null>> => apiService.privateApiClient.post('v1/users/profile', passwordData),
  changeAvatar: (avatar: FormData ): Promise<ApiResponse<null>> => apiService.privateApiClient.put('v1/users/profile/avatar', avatar),

  getCigarettesPagination: (page = 1, limit = 5): Promise<CigarettePaginationResponse> => apiService.privateApiClient.post('/v1/users/cigarettes/pagination', {
    page,
    limit
  }),
  createCigarette: (
    payload: CreateCigarettePayload
  ): Promise<ApiResponse<CigaretteRecord>> =>
    apiService.privateApiClient.post('/v1/users/cigarette', payload),
  deleteCigaretteById: (id: string): Promise<ApiResponse<null>> => apiService.privateApiClient.delete(`/v1/users/cigarette/${id}`),
  updateCigaretteById: (
    id: string,
    payload: UpdateCigarettePayload
  ): Promise<ApiResponse<CigaretteRecord>> =>
    apiService.privateApiClient.put(`/v1/users/cigarette/${id}`, payload),
  getCigaretteDetailById: (id: string): Promise<ApiResponse<CigaretteRecord>> => apiService.privateApiClient.get(`/v1/users/cigarette/${id}`),
  getRecommendPlan: (id: string): Promise<ApiResponse<Plan>> => apiService.privateApiClient(`/v1/users/plan/recommend/${id}`),
  getAdviceFromAI: (cigaretteId: string): Promise<ApiResponse<string>> => apiService.privateApiClient.get(`/v1/users/get-advice/${cigaretteId}`),
  feedback: (feedbackData: FeedbackSend): Promise<ApiResponse<string>> => apiService.privateApiClient.post('/v1/users/feedback', feedbackData),
  // getAchievement: ():Promise<ApiResponse<null>> => apiService.privateApiClient.get('/v1/users/achievement'),
  getUserCurrentRank: (): Promise<ApiResponse<RankData>> => apiService.privateApiClient.get('/v1/users/rank')
}


export default privateApiService