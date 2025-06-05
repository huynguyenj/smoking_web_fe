/*eslint-disable */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserInfo } from '../model/user/userType'
interface InfoStore {
  token: string | null,
  userInfo: UserInfo | null,
  setToken: (token: string) => void,
  setLogin: (userInfo: UserInfo) => void,
  setClear: () => void
}

export const useTokenInfoStorage = create<InfoStore>()(
  persist((set) => (
    {
      token:null,
      userInfo: null,
      setToken: (token) => set({ token }),
      setLogin: (userInfo) => set({ userInfo: userInfo }),
      setClear: () => set(({token: null, userInfo: null}))
    }),
  { name: 'token' })
)