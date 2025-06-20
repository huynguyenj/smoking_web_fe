import type { ApiResponse } from '../model/apiType/apiType'
import type { Pagination } from '../model/searchType/SearchType'
import type { UserDetail, UserPaginationInfo } from '../model/user/userType'
import { apiService } from './ApiServiceConfig'
import type { FeedbackPaginationInfo } from '../model/feedback/feedbackType'
import type { MemberShipInfo } from '../model/user/memberShipType'

const ApiAdminPrivate = {
  getTotalUsers: (): Promise<ApiResponse<number>> => apiService.privateApiClient.get('v1/admin/user'),
  getTotalPayments: (): Promise<ApiResponse<number>> => apiService.privateApiClient.get('v1/admin/payment'),
  getTotalRevenue: (): Promise<ApiResponse<number>> => apiService.privateApiClient.get('v1/admin/revenue'),
  getUserChart: ({ month, year }: { month: number; year: number }): Promise<ApiResponse<number>> => apiService.privateApiClient.post('v1/admin/user', { month, year }),
  getUserPagiantion: ({ page, limit, sort }: { page: number; limit: number; sort: number }): Promise<ApiResponse<Pagination<UserPaginationInfo>>> => apiService.privateApiClient.post('v1/admin/user/pagination', { page, limit, sort }),
  getFeedbackPagination: ({ page, limit, sort }: { page: number; limit: number; sort: number }): Promise<ApiResponse<Pagination<FeedbackPaginationInfo>>> => apiService.privateApiClient.post('v1/admin/feedback', { page, limit, sort }),
  deleteFeedback: ({ id } : { id: string }): Promise<ApiResponse<null>> => apiService.privateApiClient.delete(`v1/admin/feedback/edit/${id}`),
  changeUserStatus: ({ isActive, id } : { isActive: boolean, id: string}): Promise<ApiResponse<null>> => apiService.privateApiClient.put(`v1/admin/user/detail/${id}`, { isActive }),
  getUserDetail: ({ id } : { id: string }): Promise<ApiResponse<UserDetail>> => apiService.privateApiClient.get(`v1/admin/user/detail/${id}`),
  getMemberShipById: ({ id } : { id: string }): Promise<ApiResponse<MemberShipInfo>> => apiService.privateApiClient.get(`v1/admin/membership/edit/${id}`),
  getMemberPackage: (): Promise<ApiResponse<MemberShipInfo[]>> => apiService.privateApiClient.get('v1/admin/membership'),
  createMemberPackage: ( { membership_title, price, feature } : { membership_title: string, price: number, feature: string[] }): Promise<ApiResponse<null>> => apiService.privateApiClient.post('v1/admin/membership', { membership_title, price, feature }),
  deleteMemberPackage: ( { id } : { id: string }): Promise<ApiResponse<null>> => apiService.privateApiClient.delete(`v1/admin/membership/edit/${id}`),
  updateMemberPackage: ( { id, membership_title, price, feature } : { id: string, membership_title: string, price: number, feature: string[] }): Promise<ApiResponse<null>> => apiService.privateApiClient.put(`v1/admin/membership/edit/${id}`, { membership_title, price, feature })
}

export default ApiAdminPrivate