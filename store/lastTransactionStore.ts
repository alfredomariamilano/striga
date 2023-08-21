import { Transaction } from '@/utils/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface LastTransactionStore {
  lastTransaction: null | Transaction
  setLastTransaction: (
    lastTransaction: LastTransactionStore['lastTransaction'],
  ) => void
}

export const useLastTransactionStore = create<LastTransactionStore>()(
  persist(
    (set) => ({
      lastTransaction: null,
      setLastTransaction: (lastTransaction) => {
        set(() => ({
          lastTransaction,
        }))
      },
    }),
    {
      name: 'lastTransactionStorage',
    },
  ),
)
