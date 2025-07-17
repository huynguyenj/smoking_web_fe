export type InitialState = {
  _id: string
  amount_cigarettes: number
  smoking_frequency_per_day: number
  money_each_cigarette: number
  nicotine_evaluation: number
  create_date: number
  user_id: string
}

export type CreateInitialState = {
    amount_cigarettes: number
    smoking_frequency_per_day: number
    money_each_cigarette: number
    nicotine_evaluation: number
}

export interface PageInfo{
    limit: number
    page: number
    totalPage: number
}

export interface InitialStateResponse {
  listData: InitialState[]
  pageInfo: PageInfo
}

export interface InitialStatePaginationData {
    success: boolean
    message: string
    data: InitialStateResponse;
}