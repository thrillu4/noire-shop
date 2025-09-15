import { FilterState } from '@/lib/types'
import { create } from 'zustand'

export const useFilterState = create<FilterState>(set => ({
  filter: {
    gender: null,
    type: null,
    size: null,
    minPrice: null,
    maxPrice: null,
    collection: null,
    available: false,
  },
  totalProducts: 0,
  setFilterSettings: values => {
    set({ filter: values })
  },
  setTotalProducts: total => {
    set({ totalProducts: total })
  },
}))
