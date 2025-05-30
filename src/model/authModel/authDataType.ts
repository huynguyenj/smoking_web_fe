export interface LoginType {
      email: string,
      password: string
}
interface ProfileType {
      address: string,
      birthdate: Date,
      age: number
}
export interface LoginResponse extends LoginType {
      _id: string,
      full_name: string,
      user_name: string,
      created_date: Date,
      update_date: Date,
      isActive: boolean,
      isDelete: boolean,
      role: string,
      gender: boolean | null,
      profile: ProfileType
      accessToken: string
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