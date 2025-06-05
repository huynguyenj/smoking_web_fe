import type { LoginResponse } from '../authModel/authDataType'

export type UserInfo = LoginResponse
export type MessageHistoryInfo = {
  sender_id: string,
  receiver_id: string,
  content: string,
  message_date: Date
}

type Profile = {
  address: string,
  brirthdate: Date,
  age: number,
  experience: string
}
export interface SearchUserType {
   _id: string,
   full_name: string,
   user_name: string,
   profile: Profile
}

export type Friend = {
  _id: string,
  full_name: string,
  user_name: string
}