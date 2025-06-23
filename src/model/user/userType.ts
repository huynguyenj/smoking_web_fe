import type { LoginResponse } from '../authModel/authDataType'
import type { Feedback } from '../feedback/feedbackType'
import type { MemberShip } from './memberShipType'

export type UserInfo = LoginResponse
export type MessageHistoryInfo = {
  sender_id: string,
  receiver_id: string,
  content: string,
  message_date: Date
}

type Profile = {
  address: string,
  brzirthdate: Date,
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

export interface UserPaginationInfo {
    _id: string,
   full_name: string,
   user_name: string,
   email: string,
   created_date: Date,
   update_date: Date,
   isActive: boolean,
   isDeleted: boolean,
   role: boolean,
   gender: boolean | null,
}

export interface UserDetail extends UserPaginationInfo{
  feedback: Feedback,
  membership: MemberShip
  profile: Profile
}