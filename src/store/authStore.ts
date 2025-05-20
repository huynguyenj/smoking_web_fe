/*eslint-disable */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
interface InfoStore {
  token: string | null,
  setToken: (token: string) => void
}

export const useTokenInfoStorage = create<InfoStore>()(
  persist((set) => (
    {
      token:null,
      setToken: (token) => set({ token })
    }),
  { name: 'token' })
)