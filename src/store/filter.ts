import { FilterState } from '@/lib/types'
import { create } from 'zustand'

export const useFilterState = create<FilterState>(set => ({
  filter: {
    gender: 'all',
    types: [],
    sizes: [],
    priceRange: [0, 100],
    collections: [],
    available: 'all',
  },
  totalProducts: 0,
  setFilterSettings: values => {
    set({ filter: values })
  },
  setTotalProducts: total => {
    set({ totalProducts: total })
  },
  clearFilter: () => {
    set({
      filter: {
        gender: 'all',
        types: [],
        sizes: [],
        priceRange: [0, 100],
        collections: [],
        available: 'all',
      },
    })
  },
}))
