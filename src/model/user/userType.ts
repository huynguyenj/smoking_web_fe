import type { Feedback } from '../feedback/feedbackType'

type Membership = {
  membership_id: string,
  create_date: string,
  expired_date: string
}

export type Profile = {
  address: string,
  birthdate: Date,
  age: number,
  experience: string,
  image_url: string
}
export type UserInfo = {
      _id: string,
      full_name: string,
      user_name: string,
      email: string,
      created_date: number,
      updated_date: number,
      isActive: boolean,
      isDeleted: boolean,
      role: string,
      gender: boolean | null,
      profile: Profile,
      accessToken: string,
      friends?: string[],
      membership?: Membership,
      rank?: string,
      image_url?: string

}
export type MessageHistory = {
  sender_id: string,
  receiver_id: string,
  content: string,
  message_date: Date
}

type UserMessageType = {
  _id: string
  user_name: string,
  image_url: string
}

export type MessageHistoryInfo = {
  result: MessageHistory[],
  user_info: UserMessageType,
  friend_info: UserMessageType
}

export interface SearchUserType {
   _id: string,
   full_name: string,
   user_name: string,
   profile: Profile,
   role: string,
   image_url?: string
}

export type Friend = {
  _id: string,
  full_name: string,
  user_name: string,
  role: string,
  image_url: string
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
  membership: Membership
  profile: Profile
}

export interface UserProfile extends UserInfo {
  password: string
}

export interface UserCommonTypeInfo {
  full_name: string | null,
  user_name: string | null,
  email?: string,
  gender: boolean
}

export type UpdateProfile = {
  address: string,
  birthdate: number | null,
  age: number,
  experience: string,
}

export type PasswordData = {
  current_password: string,
  new_password: string
}

export type AvatarUpdate = {
  profile_image: File
}