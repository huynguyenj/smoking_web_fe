// Giai đoạn thực hiện kế hoạch
export type SpecificInStage = {
  start_time: number,
  end_time: number,
  expected_result: number,
  isCompleted: false
}
export type ProcessStage = SpecificInStage[]

// Tình trạng sức khỏe
export type HealthStatus = 'good' | 'average' | 'bad'

// Kế hoạch đầy đủ (được backend trả về)
export type Plan = {
  _id: string
  user_id: string
  process_stage: ProcessStage
  health_status: HealthStatus
  content: string
  start_date: number
  expected_result_date: number
  create_by: string
  isDeleted: boolean,
  initial_cigarette_id?: string
}

// Payload gửi khi tạo mới kế hoạch
export type CreatePlanPayload = {
  user_id?: string
  process_stage: ProcessStage
  health_status: HealthStatus
  content: string
  start_date: number
  expected_result_date: number
}

// Thông tin phân trang
export type PageInfo = {
  limit: number
  page: number
  totalPage: number
}

// Dữ liệu trả về khi lấy danh sách kế hoạch có phân trang
export type PlanListResponse = {
  success: number
  message: string
  data: {
    listData: Plan[]
    pageInfo: PageInfo
  }
}
