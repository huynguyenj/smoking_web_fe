type UserInfoComment = {
  email: string,
  user_name: string,
  image_url: string
}
export interface Comment {
  _id: string
  content: string
  user_id: string
  blog_id: string
  created_date: number
  isDeleted: boolean
  userInfo?: UserInfoComment
}

export interface PageInfo {
  limit: number
  page: number
  totalPage: number
}

export interface CommentListResponse {
  listData: Comment[]
  pageInfo: PageInfo
}

export interface GetCommentResponse {
  success: boolean
  message: string
  data: CommentListResponse
}

export interface GetCommentRequestBody {
  page: number
  limit: number
  sort?: number
}

export interface CreateCommentInput {
  content: string
}

// ✅ NEW: Tạm dùng khi comment mới được tạo nhưng chưa lấy từ API
export interface TemporaryComment extends Comment {
  isTemporary?: boolean
}

// ✅ NEW: Kết quả trả về khi xoá comment
export interface DeleteCommentResponse {
  success: boolean
  message: string
}
