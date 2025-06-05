export interface ApiResponse<T> {
      code: number,
      message: string,
      data: T
}

export interface ApiErrorResponse {
  status: number,
  message: string
}

export type ApiError = {
    status: number,
    message: string
  }