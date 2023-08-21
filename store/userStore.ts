import { User } from '@/utils/types'
import { create } from 'zustand'

export interface UserStore {
  user: null | User
  setUser: (user: UserStore['user']) => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => {
    set(() => ({
      user,
    }))
  },
}))
