export interface LoginType {
      email?: string,
      password?: string
}
export interface ProfileType {
      address: string,
      birthdate: Date,
      age: number
}
export interface LoginResponse {
      _id: string,
      full_name: string,
      user_name: string,
      email: string,
      created_date: Date,
      update_date: Date,
      isActive: boolean,
      isDeleted: boolean,
      role: string,
      gender: boolean | null,
      profile: ProfileType
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