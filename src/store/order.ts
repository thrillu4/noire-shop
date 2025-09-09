import { OrderState } from '@/lib/types'
import { create } from 'zustand'

export const useOrderStore = create<OrderState>(set => ({
  orders: [],
  isLoading: false,
  currentOrder: null,
  setCurrentOrder: data => {
    set({ currentOrder: data })
  },
}))
