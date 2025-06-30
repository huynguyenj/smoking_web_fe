/*eslint-disable */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserInfo } from '../model/user/userType'
import type { MembershipInfo } from '../model/user/membershipType'
interface InfoStore {
  token: string | null,
  userInfo: UserInfo | null,
  setToken: (token: string) => void,
  setUser: (userInfo: UserInfo) => void,
  setClear: () => void
}

interface MembershipStore {
  membershipInfo: MembershipInfo | null
  setMembershipInfoStore: (membership: MembershipInfo) => void
}

export const useMembershipStorage = create<MembershipStore>()(
  persist((set) => (
    {
      membershipInfo: null,
      setMembershipInfoStore: (membership) => set((state) => ({...state, membershipInfo: membership}))
    }),
  {name: 'membership-information'}
  )
)
export const useTokenInfoStorage = create<InfoStore>()(
  persist((set) => (
    {
      token:null,
      userInfo: null,
      setToken: (token) => set({ token }),
      setUser: (userInfo) => set({ userInfo: userInfo }),
      setClear: () => set(({token: null, userInfo: null}))
    }),
  { name: 'token' })
)