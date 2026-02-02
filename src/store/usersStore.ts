import type { User } from '@/types/user'
import { create } from 'zustand'

interface UsersState {
  apiUsers: User[]
  localUsers: User[]
  hiddenApiIds: number[]

  setApiUsers: (users: User[]) => void
  addLocalUser: (user: Omit<User, 'id' | 'source'>) => void
  removeLocalUser: (userId: number) => void

  isApiHidden: (apiId: number) => boolean
  hideApiUser: (apiId: number) => void
}

export const useUsersStore = create<UsersState>((set, get) => ({
  apiUsers: [],
  localUsers: [],
  hiddenApiIds: [],

  setApiUsers: (users) => set({ apiUsers: users }),
  addLocalUser: (user) =>
    set((s) => {
      const maxApiId = s.apiUsers.reduce((max, u) => Math.max(max, u.id), 0)
      const maxLocalId = s.localUsers.reduce((max, u) => Math.max(max, u.id), 0)
      //jest potencjalny problem z tym podejściem, jeśli wejdziemy bezpośrednio przez url users/add i dodamy usera lokalnie to będzie miał id 1, gdy wrócimy na /user pobiorą nam się userzy z API i będzie kolidacja id - pierwszy user z api tez będzie miał id 1
      //produkcyjnie nie powinniśmy mieć takiego problemu, ponieważ wszyscy userzy by byli przechowywani na backendzie 
      //potencjalne rozwiązanie to id dla local user robić w strone -1,-2 itd
      //Date.now() + Math.floor(Math.random() * 1000) na ten moment już nie będę zmieniał

      
      const nextId = Math.max(maxApiId, maxLocalId) + 1

      return {
        localUsers: [{ ...user, id: nextId, source: 'local' }, ...s.localUsers],
      }
    }),
  removeLocalUser: (userId) =>
    set((s) => ({
      localUsers: s.localUsers.filter((u) => u.id !== userId),
    })),

  isApiHidden: (apiId) => get().hiddenApiIds.includes(apiId),
  hideApiUser: (apiId) => {
    if (get().hiddenApiIds.includes(apiId)) return
    set((s) => ({ hiddenApiIds: [...s.hiddenApiIds, apiId] }))
  },
}))
