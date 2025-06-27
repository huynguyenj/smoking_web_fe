import type { Profile } from '../user/userType'

export interface LoginType {
      email?: string,
      password?: string
}
export interface LoginResponse {
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
      profile: Profile
      accessToken: string
      friends?: string[]
}

export interface TokenResponse{
      accessToken: string
}

export interface RegisterType {
      full_name?: string,
      user_name?: string,
      email:string,
      password: string,

}