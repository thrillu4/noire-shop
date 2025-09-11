import { WishListState } from '@/lib/types'
import { ROUTES } from '@/routes'
import { create } from 'zustand'

export const useWishListState = create<WishListState>((set, get) => ({
  items: [],
  isLoading: false,
  isAuthenticated: null,
  setAuthenticated: userId => {
    const prevAuth = get().isAuthenticated
    set({ isAuthenticated: userId })

    if (!prevAuth && userId) {
      get().migrateLocalWishList()
    }
  },
  addWishItem: async productId => {
    set({ isLoading: true })
    try {
      const { isAuthenticated } = get()
      if (isAuthenticated) {
        const response = await fetch(ROUTES.POST_WISHLIST_ADD, {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({ productId }),
        })
        if (!response.ok) throw new Error('Failed to add product to wish list')

        const data = await response.json()
        set({ items: data.items })
      } else {
      }
    } catch (error) {
      console.log('Failed to add product to wish list', error)
    } finally {
      set({ isLoading: false })
    }
  },
  removeWishItem: async productId => {},
  loadWishList: async () => {
    set({ isLoading: true })
    try {
      const { isAuthenticated } = get()
      if (isAuthenticated) {
        const response = await fetch(ROUTES.GET_WISHLIST)
        if (!response.ok) throw new Error('Failed to load wish list')

        const data = await response.json()
        set({ items: data.items })
      } else {
      }
    } catch (error) {
      console.log('Failed to load wish list', error)
    } finally {
      set({ isLoading: false })
    }
  },
  migrateLocalWishList: async () => {},
  totalItems: () => get().items.length,
}))
