import type { LoginResponse } from '../authModel/authDataType'

export type UserInfo = LoginResponse
export type MessageHistoryInfo = {
  sender_id: string,
  receiver_id: string,
  content: string,
  message_date: Date
}

export type Friend = {
  _id: string,
  full_name: string,
  user_name: string
}